  // Get the modal
var modal = document.getElementById("PrivacyModal");

var Ranger_st=document.getElementById("myRange");

var Language_bt_C=document.getElementById("CLang");
var Language_bt_E=document.getElementById("ELang");

var Background_bt_A=document.getElementById("Bcolor_a");
var Background_bt_B=document.getElementById("Bcolor_b");

var Text_bt_A=document.getElementById("Fcolor_a");
var Text_bt_B=document.getElementById("Fcolor_b");

var Camera_bt_F =document.getElementById("FCamera");
var Camera_bt_B =document.getElementById("BCamera");

var Device_bt_O=document.getElementById("Dvc1");
var Device_bt_T=document.getElementById("Dvc2");

var Language_data=["Find your Dr.Mood","Introduction:","Swipe up to Setup","Output Text Size","Language",
"Background Color","Text Color","Camera","Front Camera","Back Camera","Use with how many devices?","1 Device","1 on 1 Devices",
"Are you READY?","Start","Privacy Policy","Content"];
var Camera_select_data=false;
var Language_select_data=false;
var Background_select_data="black";
var Text_select_data="white";
var Device_select_data=false;	
var Range_select_data="20px";
// Get the button that opens the modal
var btn = document.getElementById("StartButton");

/*
function the_same_language(){
	if(Language_select_data===false){
		alert("字體顏色與背景顏色不可相同!!");
	}
	else
		alert("Background Color and Text Color can not the same!!");
}
*/

function setLanguage(){
	document.getElementById("t1").innerHTML=Language_data[0];
	document.getElementById("t2").innerHTML=Language_data[1];
	document.getElementById("t3").innerHTML=Language_data[2];
	document.getElementById("t4").innerHTML=Language_data[3];
	document.getElementById("t5").innerHTML=Language_data[4];
	document.getElementById("t6").innerHTML=Language_data[5];
	document.getElementById("t7").innerHTML=Language_data[6];
	document.getElementById("t8").innerHTML=Language_data[7];
	document.getElementById("FCamera").innerHTML=Language_data[8];
	document.getElementById("BCamera").innerHTML=Language_data[9];
	document.getElementById("t9").innerHTML=Language_data[10];
	document.getElementById("Dvc1").innerHTML=Language_data[11];
	document.getElementById("Dvc2").innerHTML=Language_data[12];
	document.getElementById("t10").innerHTML=Language_data[13];
	document.getElementById("StartButton").innerHTML=Language_data[14];
	document.getElementById("t11").innerHTML=Language_data[15];
	document.getElementById("t12").innerHTML=Language_data[16];
	document.getElementById("t13").innerHTML=Language_data[17];
	document.getElementById("t14").innerHTML=Language_data[18];
	document.getElementById("t15").innerHTML=Language_data[19];
}
function change_background(color_change){
	document.getElementById("body").style.backgroundColor=color_change;
	document.getElementById("fullpage").style.backgroundColor=color_change;
	document.getElementById("Title").style.backgroundColor=color_change;
	document.getElementById("Intro").style.backgroundColor=color_change;
	document.getElementById("Next").style.backgroundColor=color_change;
	document.getElementById("FontSize").style.backgroundColor=color_change;
	document.getElementById("slidecontainer").style.backgroundColor=color_change;
	document.getElementById("Language").style.backgroundColor=color_change;
	document.getElementById("ELang").style.backgroundColor=color_change;
	document.getElementById("CLang").style.backgroundColor=color_change;
	document.getElementById("BackgroundColor").style.backgroundColor=color_change;
	document.getElementById("FontColor").style.backgroundColor=color_change;
	document.getElementById("Camera").style.backgroundColor=color_change;
	document.getElementById("Device").style.backgroundColor=color_change;
	document.getElementById("Start").style.backgroundColor=color_change;
	document.getElementById("PrivacyModal").style.backgroundColor=color_change;
	document.getElementById("modalHeader").style.backgroundColor=color_change;
	document.getElementById("modalFooter").style.backgroundColor=color_change;
	document.getElementById("t13").style.color=color_change;
  document.getElementById("t14").style.color=color_change;
  document.getElementById("t15").style.color=color_change;
}

function change_fontcolor(color_change){

	document.getElementById("t1").style.color=color_change;
	document.getElementById("t2").style.color=color_change;
	document.getElementById("t3").style.color=color_change;
	document.getElementById("t4").style.color=color_change;
	document.getElementById("t5").style.color=color_change;
	document.getElementById("t6").style.color=color_change;
	document.getElementById("t7").style.color=color_change;
	document.getElementById("t8").style.color=color_change;
	document.getElementById("t9").style.color=color_change;
	document.getElementById("t10").style.color=color_change;
	document.getElementById("t11").style.color=color_change;
  document.getElementById("t12").style.color=color_change;

	Language_bt_E.style.borderColor=color_change;
	Language_bt_C.style.borderColor=color_change;
	Background_bt_A.style.borderColor=color_change;
	Background_bt_B.style.borderColor=color_change;
	Text_bt_A.style.borderColor=color_change;
	Text_bt_B.style.borderColor=color_change;
	Camera_bt_F.style.borderColor=color_change;
	Camera_bt_B.style.borderColor=color_change;
	Device_bt_O.style.borderColor=color_change;
	Device_bt_T.style.borderColor=color_change;
	btn.style.borderColor=color_change;
	btn.style.color=color_change;

	document.getElementById("modalClose").style.color=color_change;
	document.getElementById("arrUp").style.borderColor=color_change;
	document.getElementById("modalContent").style.background=color_change;
	document.getElementById("myRange").style.background=color_change;
	Language_bt_C.style.color=color_change;
	Language_bt_E.style.color=color_change;
	Camera_bt_F.style.color=color_change
	Camera_bt_B.style.color=color_change;
	Device_bt_O.style.color=color_change;
	Device_bt_T.style.color=color_change;
}

function clear_board_L(){
	Language_bt_C.style.borderColor=Background_select_data;
	Language_bt_C.style.backgroundColor=Background_select_data;
	
	Language_bt_E.style.borderColor=Background_select_data;
	Language_bt_E.style.backgroundColor=Background_select_data;
}

function clear_board_C(){
	Camera_bt_F.style.borderColor=Background_select_data;
	Camera_bt_F.style.backgroundColor=Background_select_data;
	
	Camera_bt_B.style.borderColor=Background_select_data;
	Camera_bt_B.style.backgroundColor=Background_select_data;
}

function clear_board_D(){
	Device_bt_O.style.borderColor=Background_select_data;
	Device_bt_O.style.backgroundColor=Background_select_data;
	
	Device_bt_T.style.borderColor=Background_select_data;
	Device_bt_T.style.backgroundColor=Background_select_data;
}

function clear_board_Start(){
	btn.style.borderColor=Background_select_data;
	btn.style.backgroundColor=Background_select_data;
}

Ranger_st.onchange=function(){
	Range_select_data=Ranger_st.value;
	document.getElementById("t8").style.fontSize=Range_select_data+"px";
	
}

Background_bt_A.onclick=function(){
  Background_select_data="#000000";
  change_background(Background_select_data);
  /*
	if(Text_select_data!="black"){
		Background_select_data="#000000";
		change_background(Background_select_data);
	}
	else{
		the_same_language();
	}
  */
}
Background_bt_A.onkeydown = function(e) {
    if (e.keyCode == 13)
    Background_select_data="#000000";
    change_background(Background_select_data);
};

Background_bt_B.onclick=function(){
  Background_select_data="#000080";
  change_background(Background_select_data);
  /*
	if(Text_select_data!="red"){
		Background_select_data="#000080";
		change_background(Background_select_data);
	}
	else{
		the_same_language();
	}
  */
}
Background_bt_B.onkeydown = function(e) {
    if (e.keyCode == 13)
    Background_select_data="#000080";
    change_background(Background_select_data);
};

Text_bt_A.onclick=function(){
  Text_select_data="#ffffff";
	change_fontcolor(Text_select_data);
  /*
	if(Background_select_data!="black"){
		Text_select_data="#ffffff";
		change_fontcolor(Text_select_data);
	}
	else{
		the_same_language();
	}
  */
}
Text_bt_A.onkeydown = function(e) {
    if (e.keyCode == 13)
    Text_select_data="#ffffff";
    change_fontcolor(Text_select_data);
};

Text_bt_B.onclick=function(){
  Text_select_data="#ffff00";
	change_fontcolor(Text_select_data);
  /*
	if(Background_select_data!="red"){
		Text_select_data="#ffff00";
		change_fontcolor(Text_select_data);
	}
	else{
		the_same_language();
	}
  */
}
Text_bt_B.onkeydown = function(e) {
    if (e.keyCode == 13)
    Text_select_data="#ffff00";
    change_fontcolor(Text_select_data);
};

Language_bt_C.onclick=function(){
	Language_select_data=false;
	clear_board_L();
  Language_data=[
    "尋找你的 Dr.Mood",
    "為甚麼要使用「尋找你的Dr. Mood」?",
    "「尋找你的Dr. Mood」可以將七種從臉部表情上可偵測的基本情緒轉換成語音及文字輸出。我們的服務可以透過辨識他人表情幫助您了解他人的情緒。",
    "向上滑動設定",
    "背景顏色",
    "文字顏色",
    "語言",
    "輸出文字大小",
    "前鏡頭","後鏡頭","鏡頭方向",
    "一台裝置","一對一連接裝置","使用幾台裝置呢?",
    "開始","都設定好了嗎?",
    "隱私條款","我們的服務會向您要求存取相機並且讀取您所提供的資訊，臉部資訊會被傳輸至Azure並使用其提供的認知服務，Azure及我方皆不會保存您的資訊。",
    "更多有關Azure認知服務隱私權請參考以下連結:","認知服務合規性與隱私權 | Microsoft Azure"
  ];
	setLanguage();
	Language_bt_C.style.borderColor=Text_select_data;

}

Language_bt_C.onkeydown=function(e){
  if(e.keyCode == 13){
	Language_select_data=false;
	clear_board_L();
  Language_data=[
    "尋找你的 Dr.Mood",
    "為甚麼要使用「尋找你的Dr. Mood」?",
    "「尋找你的Dr. Mood」可以將七種從臉部表情上可偵測的基本情緒轉換成語音及文字輸出。我們的服務可以透過辨識他人表情幫助您了解他人的情緒。",
    "向上滑動設定",
    "背景顏色",
    "文字顏色",
    "語言",
    "輸出文字大小",
    "前鏡頭","後鏡頭","鏡頭方向",
    "一台裝置","一對一連接裝置","使用幾台裝置呢?",
    "開始","都設定好了嗎?",
    "隱私條款","我們的服務會向您要求存取相機並且讀取您所提供的資訊，臉部資訊會被傳輸至Azure並使用其提供的認知服務，Azure及我方皆不會保存您的資訊。",
    "更多有關Azure認知服務隱私權請參考以下連結:","認知服務合規性與隱私權 | Microsoft Azure"
  ];
	setLanguage();
	Language_bt_C.style.borderColor=Text_select_data;
}
}

Language_bt_E.onclick=function(){
	Language_select_data=true;
	clear_board_L();
  Language_data=[
    "Find your Dr.Mood",
    "Why using 「Find your Dr. Mood」?",
    "「Find your Dr. Mood 」 translates the seven basic emotions detected on the human face, into sounds and texts. Our service can help you to understand people’s emotions by recognizing expression for you.",
    "Swipe up to Setup",
    "Background Color",
    "Text Color",
    "Language",
    "Output Text Size",
    "Front Camera","Back Camera","Camera",
    "1 Device","1 on 1 Devices","Use with how many devices?",
    "Start","Are you READY?",
    "Privacy Policy","Our service will ask for permission to access your camera and read the information you have offered in addition. The face information will forward to Azure for the Cognitive Services Azure applied. Either Azure or our service won’t save any of your sensitive information.",
    "For more details on Azure Cognitive Services’ privacy, please refer to the link below:",
    "Cognitive Services Compliance and Privacy | Microsoft Azure"];
	setLanguage();
	Language_bt_E.style.borderColor=Text_select_data;
}

Language_bt_E.onkeydown=function(e){
  if(e.keyCode == 13){
	Language_select_data=true;
	clear_board_L();
  Language_data=[
    "Find your Dr.Mood",
    "Why using 「Find your Dr. Mood」?",
    "「Find your Dr. Mood 」 translates the seven basic emotions detected on the human face, into sounds and texts. Our service can help you to understand people’s emotions by recognizing expression for you.",
    "Swipe up to Setup",
    "Background Color",
    "Text Color",
    "Language",
    "Output Text Size",
    "Front Camera","Back Camera","Camera",
    "1 Device","1 on 1 Devices","Use with how many devices?",
    "Start","Are you READY?",
    "Privacy Policy","Our service will ask for permission to access your camera and read the information you have offered in addition. The face information will forward to Azure for the Cognitive Services Azure applied. Either Azure or our service won’t save any of your sensitive information.",
    "For more details on Azure Cognitive Services’ privacy, please refer to the link below:",
    "Cognitive Services Compliance and Privacy | Microsoft Azure"];
	setLanguage();
	Language_bt_E.style.borderColor=Text_select_data;
  }
}

Camera_bt_F.onclick=function(){
	Camera_select_data=false;
	clear_board_C();
	Camera_bt_F.style.borderColor=Text_select_data;
}
Camera_bt_F.onkeydown = function(e){
  if (e.keyCode == 13){
	Camera_select_data=false;
	clear_board_C();
	Camera_bt_F.style.borderColor=Text_select_data;
  }
}

Camera_bt_B.onclick=function(){
	Camera_select_data=true;
	clear_board_C();
	Camera_bt_B.style.borderColor=Text_select_data;
}
Camera_bt_B.onkeydown = function(e){
  if (e.keyCode == 13){
    Camera_select_data=true;
	clear_board_C();
	Camera_bt_B.style.borderColor=Text_select_data;
  }
}

Device_bt_O.onclick=function(){
	Device_select_data=false;
	clear_board_D();
	Device_bt_O.style.borderColor=Text_select_data;
}

Device_bt_O.onkeydown = function(e){
  if (e.keyCode == 13){
    Device_select_data=false;
	clear_board_D();
	Device_bt_O.style.borderColor=Text_select_data;
  }
}


Device_bt_T.onclick=function(){
	Device_select_data=true;
	clear_board_D();
	Device_bt_T.style.borderColor=Text_select_data;
}

Device_bt_T.onkeydown = function(e){
  if (e.keyCode == 13){
    Device_select_data=true;
	clear_board_D();
	Device_bt_T.style.borderColor=Text_select_data;
  }
}



// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal

btn.onclick = function() {
  modal.style.display = "block";
}
btn.onkeydown = function(e) {
  if (e.keyCode == 13){
  modal.style.display = "block";
  }
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  var temp=Language_select_data+"&"+Background_select_data+"&"+Text_select_data+"&"+Camera_select_data+"&"+Range_select_data;
	if(Device_select_data===false){
		url = "Instant_One_User.html?"+temp;//此處拼接內容
		window.location.href = url;
	}
	else if(Device_select_data===true){
		url="Instant_Peer_User.html?"+temp;
		window.location.href = url;
	}
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
/*
  var slider = document.getElementById("myRange");
  //var output = document.getElementById("demo");
  var h1 = document.getElementsByTagName("h1");
  var h2 = document.getElementsByTagName("h2");
  var h3 = document.getElementsByTagName("h3");
  h1.style['font-size'] = slider.value;

slider.oninput = function() {
  h1.style['font-size'] = this.value;
}
*/
