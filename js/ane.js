// 海葵对象
var aneObj = function() {
  // start point, control point, end point(sin)
  this.rootx = [];
  this.headx = [];
  this.heady = [];
  this.amp = [];
  this.alpha = 0;
}
// 海葵的数量
aneObj.prototype.num = 50;
aneObj.prototype.init = function() {
  for (var i = 0; i < this.num; i++)
  {
    this.rootx[i] = i * 16 + Math.random() * 20;
    this.headx[i] = this.rootx[i];
    this.heady[i] = canHeight - 250 + Math.random() * 50;
    this.amp[i] = Math.random() * 50 + 50;
  }
}
aneObj.prototype.draw = function() {
  this.alpha += deltaTime * 0.0008;
  var l = Math.sin(this.alpha);
  ctx2.save(); // 保存当前环境的状态
  ctx2.globalAlpha = 0.6; // 透明度
  ctx2.lineWidth = 20; // 线条长度
  ctx2.lineCap = "round"; // 设置线条结束端点样式 - 圆形线帽
  ctx2.strokeStyle = "#3b154e"; // 设置笔触颜色、渐变或模式 - 紫色
  for (var i = 0; i < this.num; i++) {
    // beginPath, moveTo, lineTo, stroke, strokeStyle, lineWidth, lineCap, globalAlpha
    ctx2.beginPath(); // 起始/重置一条路径
    ctx2.moveTo(this.rootx[i], canHeight); // 将路径移动到画布中的指定点，不创建线条
    this.headx[i] = this.rootx[i] + l * this.amp[i];
    ctx2.quadraticCurveTo(this.rootx[i], canHeight - 100, this.headx[i], this.heady[i]);
    ctx2.stroke(); // 绘制已定义的路径
  }
  ctx2.restore(); // 返回之前保存过的路径状态和属性
}
