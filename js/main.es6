const eles = document.querySelectorAll(".spinner-android");
for (const ele of eles){
    const svgEle = ele.querySelector('g');
    const circleEle = ele.querySelector('circle');
    const setSvgAttribute = (ele, k, v) => {
        ele.setAttribute(k || k, v);
    };
    const easeInOutCubic = (t, c) => {
        t /= c / 2;
        if (t < 1) return 1 / 2 * t * t * t;
        t -= 2;
        return 1 / 2 * (t * t * t + 2);
    };

    let startTime = Date.now();
    let rotateCircle = 0;
    let rIndex = 0;
    const step = () => {
        const v = easeInOutCubic(Date.now() - startTime, 650);
        const scaleX = (rIndex % 2) ? -1 : 1;
        const translateX = (rIndex % 2) ? -64 : 0;
        const dasharray = (rIndex % 2) ? (128 - (-58 * v)) : (188 - (58 * v));
        const dashoffset = (rIndex % 2) ? (182 * v) : (182 - (182 * v));
        const rotateLine = [0, -101, -90, -11, -180, 79, -270, -191][rIndex];
        rotateCircle += 4.1;
        if (rotateCircle > 359) rotateCircle = 0;
        setSvgAttribute(svgEle, 'transform', `rotate(${rotateCircle}, 32, 32)`);
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
}


