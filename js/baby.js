var babyObj = function() {
  this.x;
  this.y;
  this.angle;
  this.babyEye = new Image();
  this.babyBody = new Image();
  this.babyTail = new Image();
}
babyObj.prototype.init = function() {
  this.x = canWidth * 0.5 + 70;
  this.y = canHeight * 0.5;
  this.angle = 0;

  this.babyEye.src = "./src/babyEye0.png";
  this.babyBody.src = "./src/babyFade0.png";
  this.babyTail.src = "./src/babyTail0.png";
}
babyObj.prototype.draw = function() {
  // lerp x, y
  this.x = lerpDistance(mom.x, this.x, 0.98);
  this.y = lerpDistance(mom.y, this.y, 0.98);

  // lerp angle
  var deltaX = this.x - mom.x;
  var deltaY = this.y - mom.y;
  var beta = Math.atan2(deltaY, deltaX); // -PI, PI
  this.angle = lerpAngle(beta, this.angle, 0.6);
  console.log(this.angle);

  // translate
  ctx1.save();
  ctx1.translate(this.x, this.y);
  ctx1.rotate(this.angle);
  ctx1.drawImage(this.babyTail, -this.babyTail.width * 0.5 + 25, -this.babyTail.height * 0.5);
  ctx1.drawImage(this.babyBody, -this.babyBody.width * 0.5, -this.babyBody.height * 0.5);
  ctx1.drawImage(this.babyEye, -this.babyEye.width * 0.5 , -this.babyEye.height * 0.5);
  ctx1.restore();
}
