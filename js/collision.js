// 判断大鱼和果实的距离
function momFrutisCollision() {
  if (!data.gameOver) {
    for (var i = 0; i < fruit.num; i++) {
      if (fruit.alive[i]) {
        // calculate length
        var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
        if (l < 400 && fruit.l[i] > 14) {
          // fruit eaten
          fruit.dead(i);
          data.fruitNum++;
          mom.momBodyCount++;
          if (mom.momBodyCount > 7) {
            mom.momBodyCount = 7;
          }
          if (fruit.fruitType[i] == "blue") {
            data.double = 2
          }
          wave.born(fruit.x[i], fruit.y[i]);
        }
      }
    }
  }
}

// 判断大鱼和小鱼的距离
function momBabyCollision() {
  if (data.fruitNum > 0 && !data.gameOver) {
    var l = calLength2(mom.x, mom.y, baby.x, baby.y);
    if (l < 400 && data.fruitNum > 0) {
      baby.babyBodyCount = 0;
      mom.momBodyCount = 0;
      // score updated
      data.addScore();
      halo.born(baby.x, baby.y);
    }
  }
}
