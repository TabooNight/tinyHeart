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

// 时间
var deltaTime; // 两次执行时间间隔
var lastTime = Date.now(); // 最后一次执行时间

// 背景图片
var bgPic = new Image();

// 海葵
var ane;
// 果实
var fruit;

// 大鱼
var mon;

// 鼠标
var mx;
var my;

// 小鱼
var baby;

// 开始游戏
function game() {
  init();
  gameloop();
}

function init() {
  // 获得canvas context
  can1 = document.getElementById("canvas1"); // finshes, dust, UI, circle
  ctx1 = can1.getContext("2d");
  can2 = document.getElementById("canvas2"); // background, ane, fruits
  ctx2 = can2.getContext("2d");

  can1.addEventListener("mousemove", onMouseMove, false);

  // 背景图片路径
  bgPic.src = "./src/background.jpg";

  // 获取宽高
  canWidth = can1.width;
  canHeight = can1.height;

  // 创建海葵对象并初始化
  ane = new aneObj();
  ane.init();

  // 创建果实对象并初始化
  fruit = new fruitObj();
  fruit.init();

  // 创建大鱼对象并初始化
  mom = new momObj();
  mom.init();

  // 鼠标位置初始化
  mx = canWidth * 0.5;
  my = canHeight * 0.5;

  // 创建小鱼对象并初始化
  baby = new babyObj();
  baby.init();
}

function gameloop() {
  window.requestAnimationFrame(gameloop); // setInterval, setTimeout, frame per second(fps)

  // 计算执行间隔
  var now = Date.now();
  deltaTime = now - lastTime;
  lastTime = now;
  if (deltaTime > 40) deltaTime = 40;

  // 绘制背景
  drawBackground();
  // 绘制海葵
  ane.draw();
  // 果实监视器
  fruitMonitor();
  // 绘制果实
  fruit.draw();
  // 绘制大鱼
  ctx1.clearRect(0, 0, canWidth, canHeight);
  mom.draw();
  // 大鱼、果实碰撞检测
  momFrutisCollision();
  // 绘制小鱼
  baby.draw();
}

function onMouseMove(e) {
  if (e.offSetX || e.layerX) {
    mx = e.offSetX == undefined ? e.layerX : e.offSetX;
    my = e.offSetY == undefined ? e.layerY : e.offSetY;
  }
}
