var dataObj = function() {
  this.fruitNum = 0;
  this.double = 1;
  this.score = 0;
  this.alpha = 0;
  this.gameOver = false;
}
dataObj.prototype.reset = function() {
  this.fruitNum = 0;
  this.double = 1;
}
dataObj.prototype.draw = function() {
  var w = can1.width;
  var h = can1.height;

  ctx1.save();
  ctx1.fillStyle = "white";
  ctx1.shadowBlur = 10;
  ctx1.shadowColor = "white";
  ctx1.fillText("SCORE " + this.score, w * 0.5, h - 20);

  if (this.gameOver) {
    this.alpha += deltaTime * 0.0004;
    if (this.alpha > 1) this.alpha = 1;
    ctx1.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")";
    ctx1.fillText("Game Over", w * 0.5, h * 0.5);
  }
  ctx1.restore();
}
dataObj.prototype.addScore = function() {
  this.score = this.score + this.fruitNum * 100 + (this.double - 1) * 200;
  this.fruitNum = 0;
  this.double = 1;
}
