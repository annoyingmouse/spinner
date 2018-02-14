'use strict';

var eles = document.querySelectorAll(".spinner-android");

var _loop = function _loop(ele) {
    var svgEle = ele.querySelector('g');
    var circleEle = ele.querySelector('circle');
    var setSvgAttribute = function setSvgAttribute(ele, k, v) {
        ele.setAttribute(k || k, v);
    };
    var easeInOutCubic = function easeInOutCubic(t, c) {
        t /= c / 2;
        if (t < 1) return 1 / 2 * t * t * t;
        t -= 2;
        return 1 / 2 * (t * t * t + 2);
    };

    var startTime = Date.now();
    var rotateCircle = 0;
    var rIndex = 0;
    var step = function step() {
        var v = easeInOutCubic(Date.now() - startTime, 650);
        var scaleX = rIndex % 2 ? -1 : 1;
        var translateX = rIndex % 2 ? -64 : 0;
        var dasharray = rIndex % 2 ? 128 - -58 * v : 188 - 58 * v;
        var dashoffset = rIndex % 2 ? 182 * v : 182 - 182 * v;
        var rotateLine = [0, -101, -90, -11, -180, 79, -270, -191][rIndex];
        rotateCircle += 4.1;
        if (rotateCircle > 359) rotateCircle = 0;
        setSvgAttribute(svgEle, 'transform', 'rotate(' + rotateCircle + ', 32, 32)');
        setSvgAttribute(circleEle, 'stroke-dasharray', Math.max(Math.min(dasharray, 188), 128));
        setSvgAttribute(circleEle, 'stroke-dashoffset', Math.max(Math.min(dashoffset, 182), 0));
        setSvgAttribute(circleEle, 'transform', 'scale(' + scaleX + ',1) translate(' + translateX + ',0) rotate(' + rotateLine + ',32,32)');
        if (v >= 1) {
            rIndex++;
            if (rIndex > 7) rIndex = 0;
            startTime = Date.now();
        }
        window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
};

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = eles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var ele = _step.value;

        _loop(ele);
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}
//# sourceMappingURL=main.js.map