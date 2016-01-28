




// fixed variables for data
var N;
var n = [], h =[];
var w;
var d = [];
var row1 =[], row2 = [], row3 = [];
//var names = [];

var bell;
var muteIcn, playIcn;
var animateIcn, pauseIcn;
//var amiriFont;

////
// temp. variables
var today = 0, yesterday = 0;
var namesP;
var vol =0, soundOn = true, animateOn = false;
var divPerson, divOverlay;




   

function preload(){

bell = createAudio('sound/tahrir-metal-1.mp3');

playIcn = loadImage("icns/play.png");
muteIcn = loadImage("icns/mute.png");

animateIcn = loadImage("icns/animate.png");
pauseIcn = loadImage("icns/dontanimate.png");

 //amiriFont= loadFont("css/fonts/Amiri-Regular.ttf");

}

function setup() {
  
  var myCanvas = createCanvas(0.8*windowWidth, windowHeight/2.25);
  myCanvas.parent("theCanvas");

  frameRate(1);
  
  rectMode(CORNERS);
  strokeWeight(0.4);
  textAlign(CENTER);
  textSize(16);
  textFont("Amiri");


  // prepare data

  N = days.length; //console.log(N);
  
  w = width/N;
  baseH = height/1.1;
  
  nMax = 0;
  for (var i = 0; i < N; i++) {
    if( n[i] = days[i]['persons'].length > nMax){
      nMax = days[i]['persons'].length;

    }
  }

  var personid, personLi;

  for (var i = 0; i < N; i++) {
   
   n[i] = days[i]['persons'].length; 
   h[i] = map(n[i], 0, nMax, baseH, height/10);
 

   if(days[i]['date'][1] == 1){
    d[i] =  " يناير " + days[i]['date'][0] ; 
   }
   else {
     d[i] = " فبراير " + days[i]['date'][0];
   }
  
   row1[i] = "<ul>";
   row2[i] = "<ul>";
   row3[i] = "<ul>";

    var k = 0;

    for(var j = 0; j < n[i]; j++){
            
     personid = 'day-' + String(i) + '-person-' +String(j);

     personLi = '<li><div id="'+ personid+'"> <a href="#theModal" rel="modal:open">' 
        + '<img class="personIcon" src="images/ribbon.png" ></a></div></li>'
        + days[i]['persons'][j][0] 
        +'<br/>';

      //mobile
      if( width < 500){
          row2[i] += personLi;
      }
      // not mobile 
      else
      {
        if(k==1 || n[i] < 2) { //center
          row2[i] += personLi;
          k=2;
        } 
        else if(k==0) {        //right
          row3[i] += personLi;
          k=1;
        } 
        else if(k==2) {        //left
          row1[i] += personLi;
          k=0;
        }
      }
    
    }

   row1[i] += "</ul> <br/><br/> ";
   row2[i] += "</ul> <br/><br/> ";
   row3[i] += "</ul> <br/><br/> ";
  
  }
  
  divRow1 = select('#row1');
  divRow2 = select('#row2');
  divRow3 = select('#row3');

  //divOverlay = select('#overlayCard');
  bell.loop();

}



function draw() { 

  if(animateOn){
    today = (today+1)%N;
  }
  else if(mouseY <baseH ) {
    today = floor(map(mouseX, 0, width, 0, N));
  }
  
  // begin on Jan 28
  if(frameCount <3) {
    today = 3;
    soundOn = false;
  }


  // new day
  if( today != yesterday || frameCount < 10){
    
    background(0);
    noStroke();
    fill(255);
    for (var i = 0; i < N; i++) {
     rect(i*w, baseH, (i+1)*w, h[i] );
    }
   
    // highlight today 
    stroke(255);
    text( d[today], today*w + 0.5*w, baseH + 20);
    fill(255,0,0);
    stroke(255,0,0);
    text( n[today], today*w + 0.5*w, h[today] - 10);
    
    rect(today*w, baseH, (today+1)*w , h[today]);
   
    // sound
    vol = map(n[today], 0,nMax, 0.1, 0.7);

   if(!soundOn){ vol = 0; }

    bell.volume(vol);
    
    // write names to HTML
    //namesP.html( names[today]); 
    divRow1.html( row1[today] );
    divRow2.html( row2[today] );
    divRow3.html( row3[today] );

  }

  yesterday = today;


  if(animateOn){
    image(pauseIcn, 0, 32, 32, 32);
    
    if(soundOn){
      image(playIcn, 0, 64, 32, 32);
    }
    else{
      image(muteIcn, 0, 64, 32, 32);
    }
  }
  else{
    image(animateIcn, 0, 32, 32, 32);
    soundOn =false;
  }

  
}

var overlayH;

function mouseReleased(){
  
  $('div').click(function(evt){
   var currentID = this.id;
   
   if(currentID.indexOf('info') > -1) {
     
        overlayH = '<div id="infotext"> <br /><h3> عن الصفحة</h3>'
        +' <br /><p> عرض لبيانات شهداء مصر من 25 يناير  - 11 فبراير 2011 المعروف تاريخ وفاتهم <br/ ><br />'
        +'تم توثيق البيانات من خلال مباردة <a href="https://wikithawra.wordpress.com/" target="_blank">ويكي ثورة</a>'
        + ' ونعيد اتاحتها بشكل <a href="./data/18days.js" target="_blank"> ملف JSON </a><br/><br/>'
        + 'وبرنامج الصفحة مفتوح <a href="https://github.com/elteneen/ReViz/tree/gh-pages" target="_blank"> المصدر </a>'
        +'</p><br /></div>'; 

   }
   
   else if(currentID.indexOf('day') > -1){

     var j = parseInt( currentID.split('-')[3]);

     var p = days[today]['persons'][j];

      // p[0] = name
      // p[1] = photo

      // p[2] = loc 
      // p[3] = how 
      // p[4] = job
      // p[5] = age
      // p[6] = social 
      // p[7] = birthday 

      // p[8] = profile 
      // p[9] = video 
      // p[10] = news

      // p[11] = link1 
      // p[12] = link2 
      // p[13] = case number

     overlayH = '';

     overlayH += '<img class="personPic" src="images/person.png" >' 
              +  '<h4>'+ p[0] +'</h4>'  
              + '<h6> استشهد في '+d[today];

     if(p[3]!==0 && p[3]!=null && p[3]!=0){ overlayH +=  ' عن طريق  ' + p[3]; }

     overlayH += '</h6> <div class="modalInfo"> <p>';

     if(p[7]!==0 && p[7]!=null && p[7]!=0)   { overlayH +=  '<br /> تاريخ الميلاد :' + p[7]; }
     if(p[5]!==0 && p[5]!=null && p[5]!=0)   { overlayH +=  '<br /> السن : ' + p[5]; }
     if(p[6]!==0 && p[6]!=null && p[6]!=0)   { overlayH +=  '<br /> الحالة الاجتماعية : ' + p[6]; }
     if(p[4]!==0 && p[4]!=null && p[4]!=0)   { overlayH +=  '<br /> الوظيفة :' + p[4]; }
     if(p[13]!==0 && p[13]!=null && p[13]!=0){ overlayH += '<br /> محضر رقم :' + p[13]; }

     overlayH += '<br /><br /> روابط : ';

     if(p[8]!==0 && p[8]!=null && p[8]!=0)   { overlayH += '<a href="' + p[8]+ '" target="_blank"> بروافيل </a> ' ; }
     if(p[9]!==0 && p[9]!=null && p[9]!=0)   { overlayH += '- <a href="'+ p[9]+ '" target="_blank"> فيديو </a> ' ; }
     if(p[10]!==0 && p[10]!=null && p[10]!=0){ overlayH += '- <a href="' + p[10] + '" target="_blank"> خبر صحفي </a> ' ; }
     if(p[11]!==0 && p[11]!=null && p[11]!=0){ overlayH += '- <a href="' + p[11]+ '" target="_blank">  تقرير توثيقي 1 </a> ' ; }
     if(p[12]!==0 && p[12]!=null && p[12]!=0){ overlayH += '- <a href="' + p[12]+ '" target="_blank"> تقرير توثيقي 2 </a>' ; }
     

     overlayH += '</p> </div>';
     }
     

     document.getElementById("overlayCard").innerHTML = overlayH;
     //console.log(overlayH);

   

    
  });

  if( mouseX < 32 && mouseY > 32 && mouseY < 96){
   if( mouseY < 64 ){
    animateOn =!animateOn;
    soundOn = true;
   }
   if(mouseY > 64 && animateOn){
    soundOn =!soundOn;
   }
 }

}
