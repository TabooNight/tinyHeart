var babyObj = function() {
  this.x;
  this.y;
  this.angle;

  this.babyTailTimer = 0;
  this.babyTailCount = 0;

  this.babyEyeTimer = 0;
  this.babyEyeCount = 0;
  this.babyEyeInterval = 1000;

  this.babyBodyTimer = 0;
  this.babyBodyCount = 0;
}
babyObj.prototype.init = function() {
  this.x = canWidth * 0.5 + 70;
  this.y = canHeight * 0.5;
  this.angle = 0;
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

  // 小鱼尾巴摇动
  this.babyTailTimer += deltaTime;
  if (this.babyTailTimer > 50) {
    this.babyTailCount = (this.babyTailCount + 1) % 8;
    this.babyTailTimer %= 50;
  }

  // 小鱼眨眼睛
  this.babyEyeTimer += deltaTime;
  if (this.babyEyeTimer > this.babyEyeInterval) {
    this.babyEyeCount = (this.babyEyeCount + 1) % 2;
    this.babyEyeTimer %= this.babyEyeInterval;
    if (this.babyEyeCount == 0) {
      this.babyEyeInterval = Math.random() * 1500 + 1500;
    } else {
      this.babyEyeInterval = 200
    }
  }

  // 小鱼身体变淡
  this.babyBodyTimer += deltaTime;
  if (this.babyBodyTimer > 200) {
    this.babyBodyCount += 1;
    this.babyBodyTimer %= 200;
    if (this.babyBodyCount > 19) {
      this.babyBodyCount = 19;
      data.gameOver = true;
    }
  }

  // translate
  ctx1.save();
  ctx1.translate(this.x, this.y);
  ctx1.rotate(this.angle);
  ctx1.drawImage(babyTail[this.babyTailCount], -babyTail[this.babyTailCount].width * 0.5 + 24, -babyTail[this.babyTailCount].height * 0.5);
  ctx1.drawImage(babyBody[this.babyBodyCount], -babyBody[this.babyBodyCount].width * 0.5, -babyBody[this.babyBodyCount].height * 0.5);
  ctx1.drawImage(babyEye[this.babyEyeCount], -babyEye[this.babyEyeCount].width * 0.5 , -babyEye[this.babyEyeCount].height * 0.5);
  ctx1.restore();
}
