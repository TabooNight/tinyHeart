/*window.requestAnimFrame = (function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function (callback, element) {
      // 画面每秒闪动60次以上，人眼才会看不出闪烁感
      return window.setTimeout(callback, 1000 / 60);
    }
})();*/

(function() {
  var lastTime = 0;
  var vendors = ['webkit', 'moz']
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      var currentTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currentTime - lastTime));
      var id = window.setTimeout(function() {callback(currentTime + timeToCall);}, timeToCall);
      lastTime = currentTime + timeToCall;
      return id;
    }
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    }
  }
})();

function lerpAngle(a, b, t) {
  var d = b - a;
  if (d > Math.PI) d = d - 2 * Math.PI;
  if (d < -Math.PI) d = d + 2 * Math.PI;
  return a + d * t;
}

/*
 * 函数说明：将当前值以一定的比例趋近于目标值
 * 参数说明: aim-目标值 cur-当前值 ratio-比例
 */
function lerpDistance(aim, cur, ratio) {
  var delta = cur - aim;
  return aim + delta * ratio;
}

function calLength2(x1, y1, x2, y2) {
  return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
}
