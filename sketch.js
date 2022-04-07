var trex, trex_running, edges;
var groundImage;
var chao;
var nuvem, nuvemImg;
var grupocacto
var gruponuvem
var estado = 1
var score = 0
var fimdojogo
var fimdojogo1
var som
var somfim
var trexfim
var restarte
var obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6

var obstaculo

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  nuvemImg = loadImage("cloud.png");
  obstaculo1= loadImage("obstacle1.png")
  obstaculo2= loadImage("obstacle2.png")
  obstaculo3= loadImage("obstacle3.png")
  obstaculo5= loadImage("obstacle5.png")
  obstaculo6= loadImage("obstacle6.png")
  restarte= loadImage("restart.png")
  fimdojogo= loadImage("gameOver.png")
  trexfim= loadAnimation("trex_collided.png")
  som= loadSound("checkpoint.mp3")
  somfim= loadSound("die.mp3")
  
}


function setup(){
  createCanvas(windowWidth,windowHeight);
  
  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collide", trexfim)
  edges = createEdgeSprites();
  chao = createSprite(300,windowHeight-20,600,10);
  chao.addImage("solo",groundImage)
  chao.velocityX = -2
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  
  gruponuvem = createGroup()
  
  
  grupocacto = createGroup()
  
  fimdojogo1 = createSprite(290,100)
  fimdojogo1.addImage(fimdojogo)
  restarte1 = createSprite(50,22)
  restarte1.addImage(restarte)
  restarte1.scale = 0.7
  
}


function draw(){
  //definir a cor do plano de fundo 
  background("white");
   text(round(score/10),550,20)
  
  if(estado==1){
    score=score+1
    
    restarte1.visible = false
    fimdojogo1.visible = false
    
    if(touches.length>0 ||keyDown("space") && trex.y > windowHeight-50){
    trex.velocityY = -13;
      som.play()
  }
    if(frameCount % 50 == 0){
    gerarNuvens();
  }
  
   if(frameCount % 100 == 0){
    gerarCacto();
  }
   
    if(trex.isTouching(grupocacto)){
      somfim.play()
  estado = 2
    }
    
  } 
  
  if(estado==2){
    restarte1.visible = true
    fimdojogo1.visible = true
    
    chao.velocityX = 0
    gruponuvem.setVelocityXEach(0)
    gruponuvem.setLifetimeEach(-1)
    grupocacto.setVelocityXEach(0)
    grupocacto.setLifetimeEach(-1)
    grupocacto.scale = 0.6
    trex.changeAnimation("collide")
    
    
    if(mousePressedOver(restarte1)){
      grupocacto.destroyEach()
      gruponuvem.destroyEach()
      chao.velocityX = -2
      trex.changeAnimation("running")
      score=0
      estado = 1
    }
  }
  //registrando a posição y do trex
 // console.log(trex.y)
  
  //pular quando tecla de espaço for pressionada
  
  
 console.log(estado)
  
  trex.velocityY = trex.velocityY + 0.5;
  
  if(chao.x < 0){
    chao.x = chao.width/2
  }
 //impedir que o trex caia
  trex.collide(edges[3])
  drawSprites();
}


function gerarNuvens(){
  var y = random(windowHeight/10,windowHeight-100);
  nuvem = createSprite(600, y);
  nuvem.addImage(nuvemImg);
  nuvem.velocityX = -3;
  var s = random(0.5, 1);
  nuvem.scale = s;
  nuvem.lifetime = 205
  gruponuvem.add(nuvem)
  nuvem.depth = trex.depth; trex.depth = trex.depth + 1;

  
}

function gerarCacto(){
  obstaculo = createSprite(windowWidth,windowHeight-20)
  obstaculo.velocityX = -4
  obstaculo.lifetime = 205
  obstaculo.scale = 0.7
  grupocacto.add(obstaculo)
  
  var aleatorio = round(random(1,5))
  
  switch(aleatorio){
    
    case 1:obstaculo.addImage(obstaculo1)
    break;
    
    case 2:obstaculo.addImage(obstaculo2)
    break;
    
    case 3:obstaculo.addImage(obstaculo3)
    break;
    
    case 4:obstaculo.addImage(obstaculo5)
    break;
    
    case 5:obstaculo.addImage(obstaculo6)
    break;
    
    default: break;
  }
}