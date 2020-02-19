var can = document.getElementById('canvas');
var ctx = can.getContext("2d");
var teclas = {};
var bola = {
  x: can.width/2 -15,
  y:can.height/2 -15,
  altura: 30,
  largura: 30,
  dirx: -1,
  diry: 1,
  mod: 0,
  speed: 1
};
var esquerda = {
  x: 10,
  y: can.height/2-80,
  altura: 160,
  largura: 30,
  score: 0,
  speed: 5
};

var direita = {
  x: 560,
  y: can.height/2-80,
  altura: 160,
  largura: 30,
  score: 0,
  speed: 10
};
document.addEventListener("keydown", function(e){
  teclas[e.keyCode] = true;
  //alert(e.keyCode);
}, false)

document.addEventListener("keyup", function(e){
  delete teclas[e.keyCode];
}, false)

function move(){
  if(87 in teclas && esquerda.y > 0){
    esquerda.y -= esquerda.speed;
  }else if(83 in teclas && esquerda.y + esquerda.altura < can.height){
    esquerda.y += esquerda.speed;
  }
  /*if(38 in teclas && direita.y > 0){
    direita.y -= direita.speed;
  } else if(40 in teclas && direita.y + direita.altura < can.height){
    direita.y += direita.speed;
  }*/
}

function ball(){
  if(bola.y + bola.altura >= esquerda.y && bola.y <= esquerda.y + esquerda.altura && bola.x <= esquerda.x + esquerda.largura){
       bola.dirx = 1;
       bola.mod += 0.2
     } else if(bola.y + bola.altura >= direita.y && bola.y <= direita.y + direita.altura && bola.x + bola.largura >= direita.x){
       bola.dirx = -1;
       bola.mod += 0.2;
     }
     if(bola.y <= 0){
       bola.diry = 1;
     } else if(bola.y + bola.altura >= can.height){
       bola.diry = -1;
     }

     bola.x += (bola.speed + bola.mod) * bola.dirx;
     bola.y += (bola.speed + bola.mod) * bola.diry;

     if(bola.x < esquerda.x + esquerda.largura - 15){
       ganha("player 2");
     } else if(bola.x + bola.largura > direita.x + 15){
       ganha("player 1");
     }
}

function ganha(winner){
  if(winner == "player 1"){
    esquerda.score++;
  } else{
    direita.score++;
  }
  esquerda.y = can.height/2 - esquerda.altura / 2;
  direita.y = esquerda.y;
  bola.y = can.height / 2 - bola.altura / 2;
  bola.x = can.width / 2 - bola.largura / 2;
  bola.mod = 0;
}

function draw(){
  ia();
  atualiza();
  ctx.fillStyle = "white";
  ctx.fillRect(esquerda.x, esquerda.y, esquerda.largura, esquerda.altura);
  ctx.fillRect(direita.x, direita.y, direita.largura, direita.altura);
  ctx.fillRect(bola.x, bola.y, bola.largura, bola.altura)
  ctx.font = "20px Impact";
  ctx.fillText("Player 1:    " + esquerda.score, 50, 20);
  ctx.fillText("Player 2:    " + direita.score, can.width - 140, 20);
}

function atualiza(){
  ctx.clearRect(0,0,can.width, can.height);
  move();
  ball();
}

function ia(){
  if(bola.y + Math.random(0, 500)> direita.y && direita.y + direita.altura < can.height){
    direita.y += direita.speed;
  } else if(bola.y - Math.random(0, 500) < direita.y && direita.y > 0){
    direita.y -= direita.speed;
  }
}

setInterval(draw, 5);
