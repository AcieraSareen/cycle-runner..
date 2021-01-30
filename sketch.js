  //naming variables
  var path,mainp,cyclist1,cyclist2,cyclist3;
  //var imgs
  var pathImg,mainpImg1,mainpImg2,
  cyclist1Img1,cyclist2Img1,cyclist3Img1,cyclist1Img2,
  cyclistmg2,cyclist3Img2;
  //sound
  var cycleSound;
  //gamestates
  var END =0;
  var PLAY =1;
  var gameState = PLAY;
  //setting distance to 0
  var distance=0;
  //gameoverimg and cyclistsgroup variable
  var gameOverImg;
  var cyclist1CG,cyclist2CG,cyclist3CG;

  function preload(){
  //loading image for the path
  pathImg = loadImage("Road.png");
  //cyclist1 image1
  mainpImg1=loadAnimation("mainPlayer1.png","mainPlayer2.png");
  //mainpimg2
  mainpImg2=loadAnimation("mainPlayer3.png");
  //cyclist1img1
  cyclist1Img1=loadAnimation("opponent1.png","opponent2.png");
  //cyclist1img2
  cyclist1Img2=loadAnimation("opponent3.png");
  //cyclist2img1
  cyclist2Img1=loadAnimation("opponent4.png","opponent5.png");
  //cyclist2img2
  cyclist2Img2=loadAnimation("opponent6.png");
  //cyclist3img1
  cyclist3Img1=loadAnimation("opponent7.png","opponent8.png");
  //cyclist2img2
  cyclist3Img2=loadAnimation("opponent9.png");
  //loading cycle
  cycleSound=loadSound("sound/bell.mp3");
  //loading gameOver img
  gameOverImg=loadImage("gameOver.png");
  }


  function setup(){
  createCanvas(windowWidth,windowHeight);

  // Moving background
  path=createSprite(width/2,150);
  path.addImage("path",pathImg);
  path.velocityX = -5;

  //creating mainp
  mainp = createSprite(width/2,height-20,20,20);
  mainp.addAnimation("main",mainpImg1);
  mainp.scale=0.07;
  //creating groups
  cyclist1CG=createGroup();
  cyclist2CG=createGroup();
  cyclist3CG=createGroup(); 
  //creating gameover sprite 
  gameOver = createSprite(300,100);
  gameOver.addImage("over",gameOverImg);
  gameOver.scale = 0.5;
  }

  function draw() {
  background(0);



  //if condition for gamestateplay
  if(gameState===PLAY){
  gameOver.visible = false;
  mainp.y = World.mouseY;
  edges= createEdgeSprites();
  mainp.collide(edges);
  //cyclist1.collide(edges);
  //cyclist2.collide(edges);
  //cyclist3.collide(edges);

  //code to reset the background/infinite ground 
  if(path.x < width ){
  path.x = width/2;
  }
  //path and cycle velocity
  path.velocityX=-(6+2*distance/150);

  //ringing sound
  if(keyDown("space")) { 
  cycleSound.play(); 
  }
  var select_oppPlayer=Math.round(random(1,3));
  if(World.frameCount%150==0){
  if(select_oppPlayer==1){
  cyclist1();
  }
  else if(select_oppPlayer==2){
  cyclist2();
  }
  else{
  cyclist3();
  }
  }
  //distance
  distance=distance+Math.round(getFrameRate()/50);

  //when gamestate=end for player 1
  if(cyclist1CG.isTouching(mainp)){
  gameState = END;
  cyclist1.velocityY = 0;
  //cyclist1.addAnimation("player1",cyclist1Img2);
  }
  //when gamestate=end for player 2
  if(cyclist2CG.isTouching(mainp)){
  gameState = END;
  cyclist2.velocityY = 0;
  //cyclist2.addAnimation("player2",cyclist2Img2);
  }
  //when gamestate=end for player 3
  if(cyclist3CG.isTouching(mainp)){
  gameState = END;
  cyclist3.velocityY = 0;
  //cyclist3.addAnimation("player3",cyclist3Img2);
  }
  }


  else if (gameState === END) {
  //gameOver sprite visible for gamestate end
  gameOver.visible = true;
  //setting path velocity and mainp velocity to 0
  path.velocityX=0;
  mainp.velocityX=0;
  //setting velocity of all cyclistCG to 0 
  cyclist1CG.setVelocityXEach(0);
  cyclist2CG.setVelocityXEach(0);
  cyclist3CG.setVelocityXEach(0);
  //setting lifetime of all cyclistCG to -1
  cyclist1CG.setLifetimeEach(-1);
  cyclist2CG.setLifetimeEach(-1);
  cyclist3CG.setLifetimeEach(-1);
  //calling function reset
  if(keyDown(UP_ARROW)) {
  reset();
  }

  }

  drawSprites();

  }

  //function reset
  function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  //cyclist1CG.destroyEach();
  //cyclist2CG.destroyEach();
  //cyclist3CG.detroyEach();
  //mainP.changeAnimation("cycling",mainpImg1,mainpImg2);
  distance=0;
  }

  //functon player1
  function cyclist1(){
  var cyclist1 =  createSprite(1100,Math.round(random(50,250)),10,10);
  cyclist1.scale=0.06;
  cyclist1.addAnimation("player1",cyclist1Img1);
  cyclist1.setLifetime=170;
  cyclist1.velocityX=-(6+2*distance/150);
  cyclist1CG.add(cyclist1);
  }

  //functon player2
  function cyclist2() {
  var cyclist2 =  createSprite(1100,Math.round(random(50,250)),10,10);
  cyclist2.scale=0.06;
  cyclist2.addAnimation("player2",cyclist2Img1);
  cyclist2.setLifetime=170;
  cyclist2.velocityX=-(6+2*distance/150);
  cyclist2CG.add(cyclist2);
  }
  //functon player3
  function cyclist3() {
  var cyclist3 =                   createSprite(1100,Math.round(random(50,250)),10,10);
  cyclist3.scale=0.06;
  cyclist3.addAnimation("player3",cyclist3Img1);
  cyclist3.setLifetime=170;
  cyclist3.velocityX=-(6+2*distance/150);
  cyclist3CG.add(cyclist3);
  }