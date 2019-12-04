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
// 大鱼尾巴序列帧
var momTail = [];
// 大鱼眼睛序列帧
var momEye = [];
// 大鱼橙色身体序列帧
var momBodyOra = [];
// 大鱼蓝色身体序列帧
var momBodyBlue = [];


// 小鱼
var baby;
// 小鱼尾巴序列帧
var babyTail = [];
// 小鱼眼睛序列帧
var babyEye = [];
// 小鱼身体序列帧
var babyBody = [];

// 鼠标
var mx;
var my;

// 数据
var data;

// 大鱼吃果实特效
var wave;

// 大鱼喂小鱼特效
var halo;

// 漂浮物
var dust;
var dustPic = [];

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

  // 创建小鱼对象并初始化
  baby = new babyObj();
  baby.init();

  // 鼠标位置初始化
  mx = canWidth * 0.5;
  my = canHeight * 0.5;

  for (var i = 0; i < 8; i++) {
    // 小鱼尾巴序列帧初始化
    babyTail[i] = new Image();
    babyTail[i].src = "./src/babyTail" + i + ".png";

    // 大鱼尾巴序列帧初始化
    momTail[i] = new Image();
    momTail[i].src = "./src/bigTail" + i + ".png";
  }
  for (var i = 0; i < 2; i++) {
    // 小鱼眼睛序列帧初始化
    babyEye[i] = new Image();
    babyEye[i].src = "./src/babyEye" + i + ".png";

    // 大鱼眼睛序列帧初始化
    momEye[i] = new Image();
    momEye[i].src = "./src/bigEye" + i + ".png";
  }
  // 小鱼身体序列帧初始化
  for (var i = 0; i < 20; i++) {
    babyBody[i] = new Image();
    babyBody[i].src = "./src/babyFade" + i + ".png";
  }
  // 大鱼身体序列帧初始化
  for (var i = 0; i < 8; i++) {
    momBodyOra[i] = new Image();
    momBodyOra[i].src = "./src/bigSwim" + i + ".png";
    momBodyBlue[i] = new Image();
    momBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";
  }

  // 数据
  data = new dataObj();

  // 文本样式
  ctx1.font = "30px Verdana";
  ctx1.textAlign = "center";

  // 大鱼吃果实特效初始化
  wave = new waveObj();
  wave.init();

  // 大鱼喂小鱼特效初始化
  halo = new haloObj();
  halo.init();

  dust = new dustObj();
  dust.init();
  for (var i = 0; i < 7; i++) {
    dustPic[i] = new Image();
    dustPic[i].src = "./src/dust" + i + ".png";
  }
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
  // 大鱼、小鱼碰撞检测
  momBabyCollision();
  // 绘制数据
  data.draw();
  // 绘制吃果实圆圈特效
  wave.draw();
  // 绘制喂食特效
  halo.draw();
  // 绘制漂浮物
  dust.draw();
}

function onMouseMove(e) {
  if (!data.gameOver) {
    if (e.offSetX || e.layerX) {
      mx = e.offSetX == undefined ? e.layerX : e.offSetX;
      my = e.offSetY == undefined ? e.layerY : e.offSetY;
    }
  }
}
