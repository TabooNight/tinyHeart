// 海葵对象
var aneObj = function() {
  this.x = [];
  this.len = [];
}
// 海葵的数量
aneObj.prototype.num = 50;
aneObj.prototype.init = function() {
  for (var i = 0; i < this.num; i++)
  {
    this.x[i] = i * 16 + Math.random() * 20;
    this.len[i] = 200 + Math.random() * 50;
  }
}
aneObj.prototype.draw = function() {
  ctx2.save(); // 保存当前环境的状态
  ctx2.globalAlpha = 0.6; // 透明度
  ctx2.lineWidth = 20; // 线条长度
  ctx2.lineCap = "round"; // 设置线条结束端点样式 - 圆形线帽
  ctx2.strokeStyle = "purple"; // 设置笔触颜色、渐变或模式 - 紫色
  for (var i = 0; i < this.num; i++) {
    // beginPath, moveTo, lineTo, stroke, strokeStyle, lineWidth, lineCap, globalAlpha
    ctx2.beginPath(); // 起始/重置一条路径
    ctx2.moveTo(this.x[i], canHeight); // 将路径移动到画布中的指定点，不创建线条
    ctx2.lineTo(this.x[i], canHeight - this.len[i]); // 添加一个新点
    ctx2.stroke(); // 绘制已定义的路径
  }
  ctx2.restore(); // 返回之前保存过的路径状态和属性
}
