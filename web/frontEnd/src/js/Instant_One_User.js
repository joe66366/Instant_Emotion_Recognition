var synth = window.speechSynthesis;
var videoElement = document.querySelector('video');
var voices=[];
var track = {};
var Sound_Language="en-US";
var Sound_Language2="zh-TW";
var $demo = $('#demo');
var Modeselect=false;
var Camera_select=false;
var Speake_On=true;
var Text_On=true;
var Language=true;
var Backgroud_Color='black';
var Text_Color='white';
var Text_Size=20;
var intervalID="";
var Camera_Id=[];
var Camara_Count=0;
var Mood_data=["anger","contempt","disgust","fear","happiness","neutral","sadness","surprise"];
var Situation_data=["Turn off the sound","Turn on the sound","Turn off the text","Turn on the text",
"Manual click mode","Automatic recognition mode","I have identified a total of ",
"people,The emoticons from right to left are ","try again","Please enter the file name"];
var utterThis = new SpeechSynthesisUtterance("");
var subscriptionKey = "";
var uriBase = "";
synth.speak(utterThis);
//下面change_camera 和 change_mode要移到前面  function要多加window
window.change_Camera=function change_Camera(){
	var constraints;
	if (window.stream){
		window.stream.getTracks().forEach(track => {
		track.stop();
		});
	}
	if(Camera_select===true){
		constraints = {
		//audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
			video:{facingMode:  "environment"}
		};
		Camera_select=false;
	}
	else if(Camera_select===false){
		constraints = {
			video: {facingMode: { exact: "user"} }
		};
		Camera_select=true;
	}
	return navigator.mediaDevices.getUserMedia(constraints).then(setStream);
}

window.change_Mode=function change_Mode(){
if(Modeselect==false){
	Output_Data(Situation_data[4],1500);
	Modeselect=true;
	changemode.src="../src/image/mode_click.png";
	clearInterval(intervalID);
	 $('#demo div').remove();
	dofindface();
}
else if(Modeselect==true){
	Output_Data(Situation_data[5],1500);
	Modeselect=false;
	changemode.src="../src/image/mode_auto.png";
	 $('#demo div').remove();
	setTimeout(function(){do_cutfull();},1500);
	intervalID = setInterval(function(){do_cutfull();},20000);
}
}
getPageData();
//StartProgram();
//取得網頁資料
function getPageData(){
	var url=location.href;
	var temp =url.split("?");
	var vars =temp[1].split("&");
	if(vars[0]==='false'){
		Language=false;
	}
	else{
		Language=true;
	}
	document.getElementById("show-out").style.backgroundColor=vars[1];
	Backgroud_Color=vars[1];
	document.getElementById("show-out").style.color=vars[2];
	Text_Color=vars[2];
	if(vars[3]==='false'){
		Camera_select=false;
	}
	else{
		Camera_select=true;
	}
	document.getElementById("show-out").style.fontSize=vars[4]+'px';
	Text_Size=vars[4];
	document.body.style.backgroundColor =Backgroud_Color ;
	StartProgram();
	//Camera_select=getCookie("Camera");
}

//初始設定
function StartProgram(){
	change_Camera();
	Check_language();
	change_Mode();
}

function Check_language(){
	if(Language===false){	
		Sound_Language="zh-TW";
		Mood_data=["生氣","鄙視","厭惡","害怕","開心","中性","傷心","驚訝"];
		Situation_data=["關閉聲音","開啟聲音","關閉文字","開啟文字","手動點選模式","自動辨識模式",
		"總共辨識到:","個人，從右到左的表情分別是:","請再試一次","請輸入檔案名稱"];
	}
}

function HideText() {
    document.getElementById("show-out").hidden = true;
}

function OpenText(Text_data,time){
	getText.innerHTML=Text_data;
	document.getElementById("show-out").hidden = false;
	setTimeout(function(){HideText();},time);
}

//功能切換 change_text和change_sound 前面要多加window.
window.change_Text=function change_Text(){
	if(Text_On===true){
		HideText();
		Output_Data(Situation_data[2],1500);
		changetext.src="../src/image/text_close.png";
		Text_On=false;
	}
	else if(Text_On===false){
		Text_On=true;
		Output_Data(Situation_data[3],1500);
		changetext.src="../src/image/text_open.png";
	}
}

window.change_Sound=function change_Sound(){
	if(Speake_On===true){
		Output_Data(Situation_data[0],1500);
		Speake_On=false;
		changesound.src="../src/image/sound_close.png";
	}
	else if(Speake_On===false){
		Speake_On=true;
		Output_Data(Situation_data[1],1500);
		changesound.src="../src/image/sound_open.png";
	}
}


function setStream(stream) {
  window.stream = stream; // make stream available to console
   $('#demo div').remove();
  videoElement.srcObject = stream;
}

//新加的下載檔案
window.download_file=function download_file(){
	const video = document.getElementById('demo-video');
	const canvas = document.getElementById('myCanvas');
	var h_data=video.videoHeight;
	var w_data=video.videoWidth;
	canvas.height = h_data;
	canvas.width =w_data;
	canvas.getContext('2d').drawImage(video,0,0,w_data,h_data,0,0,w_data,h_data);
	canvas.src = canvas.toDataURL('image/jpeg');
	let src=canvas.src;
	var filename = prompt(Situation_data[9]);
	if(filename===null){
		return;
	}
	else{
	
		savefile(src,filename);
	}
	
}

function do_cutfull(){
	const video = document.getElementById('demo-video');
	const canvas = document.getElementById('myCanvas');
	var h_data=video.videoHeight;
	var w_data=video.videoWidth;
	canvas.height = h_data;
	canvas.width =w_data;
	canvas.getContext('2d').drawImage(video,0,0,w_data,h_data,0,0,w_data,h_data);
	canvas.src = canvas.toDataURL('image/jpeg');
	do_recognize();
	
}

window.do_cutclick=function do_cutclick(face) {
  
 const video = document.getElementById('demo-video');
  var canvas = document.getElementById('myCanvas');
  //const out = document.getElementById('demo');
  
  var out_w_data=parseInt($('#demo').css('width'), 10);
  var out_h_data=parseInt($('#demo').css('height'), 10);
  var video_h_data=parseInt($('#demo-video').css('height'), 10);
  
  var x_data=parseInt($('#demo .div'+face).css('left'), 10);
  var y_data=parseInt($('#demo .div'+face).css('top'), 10);
  var w_data=parseInt($('#demo .div'+face).css('width'), 10);
  var h_data=parseInt($('#demo .div'+face).css('height'), 10);
  
  x_data=x_data*(video.videoWidth/out_w_data);
  y_data=y_data*(video.videoHeight/out_h_data);
  
  h_data=h_data*(video.videoWidth/out_w_data);
  w_data=w_data*(video.videoWidth/out_w_data);
  
  canvas.height = h_data;
  canvas.width = w_data;
  //canvas.style.display="none";
  //var e = event || window.event;

  canvas.getContext('2d').drawImage(video,x_data,y_data,w_data,h_data,0,0,w_data,h_data);
  // Other browsers will fall back to image/png	
  //change_test=canvas.toDataURL('image/jpeg');

  canvas.src = canvas.toDataURL('image/jpeg');
  do_recognize();
}

//這是顯示開啟檔案圖片的部分
window.displayImages=function displayImages(event){
  let files=event.target.files;
  let info=document.getElementById('info');
  console.log(files);
  
  info.src=window.URL.createObjectURL(files[0]);
  console.log(info.src);
 
}
//存檔的部分
async function savefile(src,name){  
	const blob= await dataURItoBlob(src);
	let fname=await name;
    try {
		fileSave(blob, {
			fileName: fname+'.jpg',
			extensions: ['.jpg'],
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          return console.error(err);
        }
        console.log('The user aborted a request.');
      }
  
  }

function readTxt(file) {
  fetch(file).then(function(response) {
  response.text().then(function(text) {
		return text;
  });
});
}

function do_cutcloth(data){
	const video = document.getElementById('demo-video');
	var canvas2 = document.getElementById('myCanvas2');

	//var out_w_data=parseInt($('#demo-video').css('width'), 10);
	//var out_h_data=parseInt($('#demo-video').css('height'), 10);
	//var h_data=h_data*(video.videoWidth/out_h_data);
	//var w_data=w_data*(video.videoWidth/out_w_data);
	var x_data=data.faceRectangle.left;
	var y_data=data.faceRectangle.top;
	var w_data=data.faceRectangle.width;
	var h_data=data.faceRectangle.height;
	var y_change;
	
	if(y_data+h_data*1.5>video.videoHeight){
		y_data=y_data+h_data;
	}
	else{
		y_data=y_data+h_data*1.5;
	}
	
	if(y_data+h_data*2>video.videoHeight){
		h_data=video.videoHeight-y_data;
	}
	else{
		h_data*=2;
	}
	
	if(x_data-w_data/2>0){
		x_data=x_data-w_data/2;
		if(x_data+w_data*2>video.videoWidth){
			w_data=video.videoWidth-x_data;
		}
		else{
			w_data*=2;
		}
	}
	else{
		if(x_data+w_data*1.5>video.videoWidth){
			w_data=video.videoWidth-x_data;
		}
		else{
			w_data*=1.5;
		}
	}
	
	canvas2.width=w_data;
	canvas2.height=h_data;
	canvas2.getContext('2d').drawImage(video,x_data,y_data,w_data,h_data,0,0,w_data,h_data);
	//canvas2.getContext('2d').drawImage(video,x_data-w_data/2,y_data+h_data*1.5,w_data,mloss,0,0,w_data,mloss);
	canvas2.src = canvas2.toDataURL('image/jpeg');
	//do_selectcolor();
	return do_selectcolor();
}

function dofindface(){
  track.myTracker = new tracking.ObjectTracker("face");
  track.myTracker.setInitialScale(4);
  track.myTracker.setStepSize(0.5);
  track.myTracker.setEdgesDensity(0.1);
	
  track.trackerTask = tracking.track("#demo-video", track.myTracker, {
    camera: false
  });
  track.myTracker.on("track", function(event) {
	if(Modeselect==false){
		$('#demo div').remove();
		track.myTracker.stop();
	}
    if (event.data.length === 0) {
		$('#demo div').remove(); //如果沒偵測到人臉，移除所有自動產生的追蹤方框
    } 
	else{
     // $('#demo div').remove();  //一開始搜尋到人臉時，先清空對應的追蹤方框
	  //$('#demo div').hide();
		var divLength = event.data.length; //獲取人臉數量
        event.data.forEach(function(e,i){
        if($('#demo .div'+i).length === 0){
        $('#demo').append('<div class="div'+i+'" onclick="do_cutclick('+i+')"></div>');  //產生對應的追蹤方框
		
        }
        //設定追蹤方框樣式
        $('#demo .div'+i).css({
           'border-width':'3px',
           'border-style':'solid', 
           'border-color':Text_Color,
           'left':e.x,
           'top':e.y,
           'width':e.width,
           'height':e.height,
         });
		
      });
    }
  });
}

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
    
}

function do_recognize(){
		subscriptionKey =readTxt("../src/keyCode.txt");
		uriBase = readTxt("../src/endPoint.txt");
		// Request parameters
		var params = 
			{
				"detectionModel": "detection_01",
				"returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
				"returnFaceId": "true"
			};
		var getsrc = document.getElementById("myCanvas").src;
		$.ajax({
			url: uriBase + "?" + $.param(params),
    
				// Request headers.
			beforeSend: function(xhrObj)
			{
				xhrObj.setRequestHeader("Content-Type","application/octet-stream");
				xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
			},
    
			type: "POST",
    
				// Request body.
			data:dataURItoBlob(getsrc),
			processData: false
			
		})
			.done(function(data){
				// Show formatted JSON on webpage.
				//$("#responseTextArea").val(JSON.stringify(data, null, 2));
				var len=data.length; 
				var mood =[];
				var location_x=[len-1];
				var alldata='';
				var tempmood='';
				if(len===0){
					alldata = Situation_data[8];
					$('#demo div').remove();
				}
				else if(Modeselect==false){
					$('#demo div').remove();
					for(var i = 0; i < data.length; i++){
						mood[i]=Mood_data[getFaceData(data[i])];
						Create_frame(data[i],i,mood[i]);
						mood[i]=do_cutcloth(data[i])+Mood_data[getFaceData(data[i])];
						location_x[i]=data[i].faceRectangle.left;
	
					}
			//取得陣列長度
					for(var i=0;i<len-1;i++){
						for(var k=i+1;k<len;k++){
							if(location_x[i]<location_x[k]){ //遞增遞減判斷
								var buffer_x=location_x[i];
								location_x[i]=location_x[k];
								location_x[k]=buffer_x;
								var buffer_e=mood[i];
								mood[i]=mood[k];
								mood[k]=buffer_e;
							}
						}
					}
					if(len>1){
					alldata=Situation_data[6]+len+Situation_data[7];
					}
					for(var t=0;t<len;t++){
						alldata+=mood[t]+" ";
					}
					
				}
				else if(len===1)
				{
					alldata=Mood_data[getFaceData(data[0])];
					//alldata=mood[];
				}
			
			//	document.getElementById('fileContent').value += mood + "\n";
			  Output_Data(alldata,2500);
			})
    
			.fail(function(jqXHR, textStatus, errorThrown){
				// Display error message.
				var errorString = (errorThrown === "") ?
					"Error. " : errorThrown + " (" + jqXHR.status + "): ";
				errorString += (jqXHR.responseText === "") ?
					"" : (jQuery.parseJSON(jqXHR.responseText).message) ?
						jQuery.parseJSON(jqXHR.responseText).message :
						jQuery.parseJSON(jqXHR.responseText).error.message;
				alert("key與EndPoint設定錯誤，無法連接後台");
			});
  
			// Perform the REST API call.
	};

function getFaceData(data){
	var moodkind='';
	var value = 0;
	if( data.faceAttributes.emotion.anger > value){
		value = data.faceAttributes.emotion.anger;
		moodkind = 0;
	}
	if( data.faceAttributes.emotion.contempt > value){
		value = data.faceAttributes.emotion.contempt;
		moodkind = 1;
	}
	if( data.faceAttributes.emotion.disgust > value){
		value = data.faceAttributes.emotion.disgust;
		moodkind = 2;
		}
	if( data.faceAttributes.emotion.fear > value){
		value = data.faceAttributes.emotion.fear;
		moodkind = 3;
	}
	if( data.faceAttributes.emotion.happiness > value){
		value = data.faceAttributes.emotion.happiness;
		moodkind = 4;
	}
	if( data.faceAttributes.emotion.neutral > value){
		value = data.faceAttributes.emotion.neutral;
		moodkind = 5;
	}
	if( data.faceAttributes.emotion.sadness > value)
	{
		value = data.faceAttributes.emotion.sadness;
		moodkind = 6;
	}
	if( data.faceAttributes.emotion.surprise > value)
	{
		value = data.faceAttributes.emotion.surprise;
		moodkind= 7;
	}	
	return moodkind;
	}

function do_selectcolor(){
	var bigger_ranger=0;
	var bigger="";
	tracking.ColorTracker.registerColor("white", function(r, g, b) {
		if (r > 160 && g >160 && b > 160) {
			return true;
		}
		return false;
	});
	
	tracking.ColorTracker.registerColor("gray", function(r, g, b) {
		if (r < 160 && r>90 && g <160 && g>90 && b < 160 && b >90) {
			return true;
		}
		return false;
	});
	
	tracking.ColorTracker.registerColor("black", function(r, g, b) {
		if (r<90&& g<90 && b<90) {
			return true;
		}
		return false;
	});
	
	tracking.ColorTracker.registerColor("red", function(r, g, b) {
		if (r > 160 && g < 80 && b < 80) {
			return true;
		}
		return false;
	});
	tracking.ColorTracker.registerColor("orange", function(r, g, b) {
		if (r > 230 && g > 80 && g<180 && b < 80){
			return true;
		}
		return false;
	});
	tracking.ColorTracker.registerColor("green", function(r, g, b) {
		if (r < 80 && g > 160 && b < 80) {
			return true;
		}
		return false;
	});

	tracking.ColorTracker.registerColor("blue", function(r, g, b) {
		if (r < 80 && g < 80 && b > 160) {
			return true;
		}
		return false;
	});
    var tracker = new tracking.ColorTracker(['magenta', 'cyan', 'yellow','red','orange','green','blue','white','gray','black']);
    tracker.on('track', function(event) {
		event.data.forEach(function(rect) {
				if(rect.width*rect.height>bigger_ranger){
					bigger=rect.color;
					bigger_ranger=rect.width*rect.height;
				
				}
				//alert(rect.color+": "+rect.width*rect.height);
			
		
		});
    });
	tracking.track('#myCanvas2', tracker);
	
	if(bigger_ranger<2000){
		bigger="";
	}
	else{
		if(Language===false){
			switch(bigger){
				case'black':
					bigger="黑色";
					break;
				case'gray':
					bigger="灰色";
					break;
				case'magenta':
					bigger="紫色";
					break;
				case'red':
					bigger="紅色";
					break;
				case'orange':
					bigger="橘色";
					break;
				case'white':
					bigger="白色";
					break;
				case'green':
					bigger="綠色";
					break;
				case'yellow':
					bigger="黃色";
					break;
				case'blue':
					bigger="藍色";
					break;
				case'cyan':
					bigger="藍色";
					break;
				default:
					break;
			}
			bigger+="衣服的人";
		}
		else{
			bigger="person in "+bigger+" cloth is ";
		}
	}
	
	 return bigger;
}
//標示人臉位置與表情
function Create_frame(data,i,mood){
	const video = document.getElementById('demo-video');
	//alert(face_location[0][3]);
	var out_w_data=parseInt($('#demo').css('width'), 10);
	var out_h_data=parseInt($('#demo').css('height'), 10);
		$('#demo').append('<div class="div'+i+'"></div>');
		$('#demo .div'+i).append('<div class="Header'+i+'">'+mood+'</div>');		//產生對應的追蹤方框
        //設定追蹤方框樣式
		$('#demo .div'+i).css({
			'border-width':'3px',
			'border-style':'solid',
			'border-color':Text_Color,
			'left':(data.faceRectangle.left)*(out_w_data/video.videoWidth),
			'top':(data.faceRectangle.top)*(out_h_data/video.videoHeight),
			'width':data.faceRectangle.width*(out_w_data/video.videoWidth),
			'height': data.faceRectangle.height*(out_h_data/video.videoHeight),
		});
		$('#demo .div'+i+' .Header'+i).css({
			'margin-top':'-25px',
			'margin-left':'32%',
			'white-space':'nowrap',
			'color':Text_Color,
			'background':Backgroud_Color,
			'border-radius':'10px',	
			'padding':'2px 10px',
			'text-align':'center',
			'font-size':(Text_Size>34 ? Text_Size/1.5:Text_Size)+'px',
		
		});
}	

//輸出聲音與文字
function Output_Data(emoton_data,time){
	if(Speake_On===true){
		var utterThis = new SpeechSynthesisUtterance(emoton_data); //data
		utterThis.lang=Sound_Language; // 發音方式
		synth.cancel();
		synth.speak(utterThis);
	}
	if(Text_On===true){
		OpenText(emoton_data,time);
	}
	//utterThis.pitch = pitch.value;
    //utterThis.rate = rate.value;
	// var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
	// utterThis.voice = voices[14];
}

