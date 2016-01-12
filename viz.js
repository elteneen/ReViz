

// Controls

var autoPlay = true;

// fixed variables for data
var N;
var bell;
var n = [], h =[];
var w;
var d = [];
var names = [];

////
// temp. variables
var today = 0, yesterday = 0;

function preload(){
//bell = loadSound('amb.mp3');
}

function setup() {
  

  var myCanvas = createCanvas(0.8*windowWidth, windowHeight/2);
  myCanvas.parent("theCanvas");

  frameRate(2);
  
  rectMode(CORNERS);
  strokeWeight(0.4);
  textAlign(CENTER);
  textSize(15);
  

  //bell =createAudio(select('#belly'));
   bell = createAudio("sound/amb.mp3");

  console.log(bell);

  // prepare data

  N = days.length; //console.log(N);
  
  var nMax = 0;
  for (var i = 0; i < N; i++) {
    if( n[i] = days[i]['names'].length > nMax){
      nMax = days[i]['names'].length;
    }
  }

  for (var i = 0; i < N; i++) {
   
   n[i] = days[i]['names'].length; 
   h[i] = map(n[i], 0, nMax, height/2, height/10);
   d[i] = days[i]['date'][0] + " "; 

   if(days[i]['date'][1] == 1){
    d[i] += "Jan";
   }
   else{
     d[i] += "Feb";
   }

  names[i] = "";
   for(var j = 0; j < n[i]; j++){
      names[i] += days[i]['names'][j] + " " ;
      if(j%100 <2){names[i]+= "/n";}
    }
  }
  
  w = width/N;
  bell.loop();

}


function draw() { 
  
  if(autoPlay){
    today = (today+1)%N;
  }
  else{
    today = floor(map(mouseX, 0, width, 0, N));
  }
  
  // new day
  if( today != yesterday ){
   
    background(0);
    noStroke();
    for (var i = 0; i < N; i++) {
     fill(255);
     rect(i*w, height/2, (i+1)*w, h[i] );
    }
   
    // highlight today

    stroke(255);
    text( names[today], width/2, height/2 + 50); 
    fill(255,0,0);
    stroke(255,0,0);
    text( d[today], today*w + 0.5*w, height/2 + 20);
    text( n[today], today*w + 0.5*w, h[today] - 20);
    
    rect(today*w, height/2, (today+1)*w , h[today]);

  }

  yesterday = today;

}

function mouseReleased(){
  autoPlay = !autoPlay;
}
