



// Controls

var autoPlay = true;

// fixed variables for data
var N;
var n = [], h =[];
var w;
var d = [];
var names = [];
var row1 =[], row2 = [], row3 = [];

var bell;
var muteIcn, playIcn;
var ribbon;

////
// temp. variables
var today = 0, yesterday = 0;
var namesP;
var vol =0, soundOn = true; 


function preload(){

bell = createAudio('sound/SD.wav');

playIcn = loadImage("icns/play.png");
muteIcn = loadImage("icns/mute.png");
ribbon = loadImage("images/ribbon.png");

}

function setup() {
  
  var myCanvas = createCanvas(0.8*windowWidth, windowHeight/2);
  myCanvas.parent("theCanvas");

  frameRate(1);
  
  rectMode(CORNERS);
  strokeWeight(0.4);
  textAlign(CENTER);
  textSize(15);


  // prepare data

  N = days.length; //console.log(N);
  
  w = width/N;
  baseH = height/1.2;
  
  nMax = 0;
  for (var i = 0; i < N; i++) {
    if( n[i] = days[i]['names'].length > nMax){
      nMax = days[i]['names'].length;
    }
  }

  for (var i = 0; i < N; i++) {
   
   n[i] = days[i]['names'].length; 
   h[i] = map(n[i], 0, nMax, baseH, height/10);
   d[i] = days[i]['date'][0] + " "; 

   if(days[i]['date'][1] == 1){
    d[i] += "Jan";
   }
   else{
     d[i] += "Feb";
   }

   names[i] = "";
   row1[i] = "<ul>";
   row2[i] = "<ul>";
   row3[i] = "<ul>";

    for(var j = 0; j < n[i]; j++){
      
      names[i] += days[i]['names'][j] + " - " +"<img src='images/ribbon.png' >" ;
      
      if(j< n[i]/3) {
        row3[i] += "<li> <img class='personIcon' src='images/ribbon.png' ><br/>" + days[i]['names'][j] +"<br/>";
      } 
      else if(j< 2*n[i]/3) {
        row2[i] += "<li> <img class='personIcon' src='images/ribbon.png' ><br/>" + days[i]['names'][j] +"<br/>";
      } 
      else if(j< n[i]) {
        row1[i] += "<li> <img class='personIcon' src='images/ribbon.png' ><br/>" + days[i]['names'][j] +"<br/>";
      }

    }

   row1[i] += "</ul> <br/><br/> ";
   row2[i] += "</ul> <br/><br/> ";
   row3[i] += "</ul> <br/><br/> ";
  
  }
  
  bell.loop();

  
  divRow1 = select('#row1');
  divRow2 = select('#row2');
  divRow3 = select('#row3');

  //namesP = select('#namesP');
  //console.log(namesP);

  

}



function draw() { 

  if(autoPlay){
    today = (today+1)%N;
  }
  else if(mouseY <baseH) {
    today = floor(map(mouseX, 0, width, 0, N));
  }
  
  // new day
  if( today != yesterday ){
    
    background(0);
    noStroke();
    fill(255);
    for (var i = 0; i < N; i++) {
     rect(i*w, baseH, (i+1)*w, h[i] );
    }
   
    // highlight today 
    fill(255,0,0);
    stroke(255,0,0);
    text( d[today], today*w + 0.5*w, baseH + 20);
    text( n[today], today*w + 0.5*w, h[today] - 20);
    
    rect(today*w, baseH, (today+1)*w , h[today]);
   
    // sound
    vol = map(n[today],0,nMax, 0.5, 1);
    if(!soundOn){vol = 0;}

    bell.volume(vol);
    
    // write names to HTML
    //namesP.html( names[today]); 
    divRow1.html( row1[today] );
    divRow2.html( row2[today] );
    divRow3.html( row3[today] );
  }

  yesterday = today;


  if(soundOn){
    image(playIcn,width - 32, 0, 32,32 );
  }
  else{
    image(muteIcn,width - 32, 0, 32,32 );
  }
  
}

function mouseReleased(){
  autoPlay = !autoPlay;
  if( mouseX > width-32 && mouseY < 32 ){
    soundOn =!soundOn;
  }
}
