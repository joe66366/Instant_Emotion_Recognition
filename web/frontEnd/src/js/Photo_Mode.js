var S_btn = document.getElementById("StartButton");
var C_btn = document.getElementById("ChangeButton");
var Sound_Language="zh-TW";
var Mood_data=["生氣","鄙視","厭惡","害怕","開心","中性","傷心","驚訝"];
var Situation_data=["關閉聲音","開啟聲音","關閉文字","開啟文字","手動點選模式","自動辨識模式",
"總共辨識到:","個人，從右到左的表情分別是:","請再試一次","請輸入檔案名稱"];
var subscriptionKey="";
var uriBase = "";

// subscriptionKey =readTxt("../src/keyCode.txt");
// uriBase = readTxt("../src/endPoint.txt");
var synth = window.speechSynthesis;
var videoElement = document.querySelector('video');
var voices=[];
var track = {};
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

OpenText("歡迎使用照片辨識系統，請上傳照片");


window.displayImages=function displayIm(event){
  let files=event.target.files;
  let info=document.getElementById('info');
  console.log(files);
  
  info.src=window.URL.createObjectURL(files[0]);
  console.log(info.src);
}

S_btn.onclick = function() {
	do_cutfull();
}

function readTxt(file) {
  fetch(file).then(function(response) {
  response.text().then(function(text) {
		return text;
  });
});
}

function do_cutfull(){
	const photo = document.getElementById("info");
	const canvas = document.getElementById("myCanvas");
	canvas.height = photo.height;
	canvas.width = photo.width;
	canvas.getContext('2d').drawImage(photo,0,0,canvas.width,canvas.height);
	canvas.src = canvas.toDataURL("image/jpeg");
	do_recognize();
	
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

		// Request parameters
		subscriptionKey ="3dfd4badf7564183af6f177016126e1a";
		uriBase ="https://test.cognitiveservices.azure.com/face/v1.0/detect"
		var params = 
			{
				"detectionModel": "detection_01",
				"returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
				"returnFaceId": "true"
			};


			// Display the image.
			
			//var sourceImageUrl="";
			//var sourceImageUrl="https://cdn2-digiphoto.techbang.com/system/excerpt_images/9479/front/943a4a17f8e228ed214410440515de87.jpg?1497518222";
		
			/*var blobBin = window.atob(qq.split(',')[1]);
			var buf = new ArrayBuffer(blobBin.length);
			alert(byteArr)*/
			//var sourceImageUrls=dataURItoBlob(qq);
			//var reader = new FileReader();
			//var tt="";
			//reader.readAsBinaryString(sourceImageUrls);//讀取blob內容
			//reader.onloadend=function(){	
				//tt=reader.result;
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
			  Output_Data(alldata);
			})
    
			.fail(function(jqXHR, textStatus, errorThrown){
				// Display error message.
				var errorString = (errorThrown === "") ?
					"Error. " : errorThrown + " (" + jqXHR.status + "): ";
				errorString += (jqXHR.responseText === "") ?
					"" : (jQuery.parseJSON(jqXHR.responseText).message) ?
						jQuery.parseJSON(jqXHR.responseText).message :
						jQuery.parseJSON(jqXHR.responseText).error.message;
				alert("key與endPoint設定錯誤，無法連接後台");
			});
  
			// Perform the REST API call.
	};

function Create_frame(data,i,mood){
	const photo = document.getElementById('info');
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
			'left':(data.faceRectangle.left)*(out_w_data/photo.width),
			'top':(data.faceRectangle.top)*(out_h_data/photo.height),
			'width':data.faceRectangle.width*(out_w_data/photo.width),
			'height': data.faceRectangle.height*(out_h_data/photo.height),
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

function Output_Data(emoton_data){
	if(Speake_On===true){
		var utterThis = new SpeechSynthesisUtterance(emoton_data); //data
		utterThis.lang=Sound_Language; // 發音方式
		synth.cancel();
		synth.speak(utterThis);
	}
	if(Text_On===true){
		OpenText(emoton_data);
	}
	//utterThis.pitch = pitch.value;
    //utterThis.rate = rate.value;
	// var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
	// utterThis.voice = voices[14];
}	
function HideText() {
    document.getElementById("show-out").hidden = true;
}

function OpenText(Text_data){
	getText.innerHTML=Text_data;
	document.getElementById("show-out").hidden = false;
	setTimeout(function(){HideText();},1500);
}
