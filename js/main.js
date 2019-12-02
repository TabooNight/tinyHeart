document.body.onload = game;

// canvas画布
var can1;
var can2;

// 画布宽高
var canWidth;
var canHeight;

// canvas画笔
var ctx1;
var ctx2;

// 背景图片
var bgPic = new Image();

// 海葵
var ane;

// 开始游戏
function game()
{
  init();
  gameloop();
}

function init()
{
  // 获得canvas context
  can1 = document.getElementById("canvas1"); // finshes, dust, UI, circle
  ctx1 = can1.getContext("2d");
  can2 = document.getElementById("canvas2"); // background, ane, fruits
  ctx2 = can2.getContext("2d");

  // 背景图片路径
  bgPic.src = "./src/background.jpg";

  // 获取宽高
  canWidth = can1.width;
  canHeight = can1.height;

  // 创建海葵对象
  ane = new aneObj();
}

function gameloop()
{
  window.requestAnimationFrame(gameloop); // setInterval, setTimeout, frame per second(fps)
  var now = Date.now();

  drawBackground();
}