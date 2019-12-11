// 获取对应的canvas元素
/** @type {HTMLCanvasElement} */
function getCanvas(Selector) {
    let canvas = document.querySelector(Selector);
    let loading = canvas.getContext('2d');
    canvas.width = 160;
    canvas.height = 160;
    loading.translate(80, 80);
    return loading;
}

// 颜色数组
var colorArr = [
    "#FF9966",
    "#FF6666",
    "#99CCFF",
    "#666633",
    "#6699CC",
    "#CCCCFF",
    "#CC3399",
    "#66CCCC",
    "#CC0066",
    "#336697"
];
// 随机颜色
function randomColor() {
    return colorArr[Math.floor(Math.random() * colorArr.length)];
}
// 随机大小
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

// 画球
function drawCircle(ctx, x, y, r, fill, stroke) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    if (stroke) {
        ctx.stroke();
    }
    if (fill) {
        ctx.fill();
    }
    ctx.closePath();
}

// 画矩形
function drawRect(ctx, x, y, w, h, fill, stroke) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    if (stroke) {
        ctx.stroke();
    }
    if (fill) {
        ctx.fill();
    }
    ctx.closePath();
}



let loading9 = getCanvas('.loading9');
let deg9 = 0;
loading9.lineWidth = 5;
loading9.strokeStyle = 'lightblue';
loading9.fillStyle = 'lightgreen';

function Animation9() {
    // 清空画布
    loading9.clearRect(-80, -80, 160, 160);
    loading9.save();

    // 调整旋转
    loading9.rotate(Math.PI / 180 * deg9);
    deg9 += 5;

    // 重绘图形
    loading9.beginPath();
    loading9.rect(-50, -50, 100, 100);
    loading9.stroke();
    loading9.closePath();

    drawCircle(loading9, 0, 0, 30, false, true);
    drawCircle(loading9, 0, 20, 10, true, false);

    loading9.restore();
    requestAnimationFrame(Animation9);
}

Animation9();


// loading10
let loading10 = getCanvas('.loading10');
let deg10 = 0;

loading10.lineJoin = "round";

function Animation10() {
    // 清空画布
    loading10.clearRect(-80, -80, 160, 160);
    loading10.save();

    // 调整旋转与位置
    loading10.rotate(Math.PI / 180 * deg10);
    deg10 += 3;
    loading10.fillStyle = 'lightblue';
    loading10.lineWidth = 10;
    loading10.strokeStyle = 'lightblue';

    // 重绘图形
    loading10.beginPath();
    loading10.rect(-30, -30, 60, 60);
    loading10.rotate(Math.PI / 180 * 45);
    loading10.rect(-30, -30, 60, 60);
    loading10.fill();
    loading10.stroke();
    loading10.closePath();

    loading10.strokeStyle = 'white';
    loading10.lineWidth = 10;
    loading10.fillStyle = 'grey';
    drawCircle(loading10, 0, 0, 15, true, true);

    loading10.lineWidth = 2;
    drawCircle(loading10, 0, 0, 30, false, true);

    loading10.restore();
    requestAnimationFrame(Animation10);
}

Animation10();

// loading11
let loading11 = getCanvas('.loading11');
let progress11 = -50;
let loading11R = 20;
let loading11W = 10;

loading11.lineWidth = 20;
loading11.lineCap = "round";
loading11.fillStyle = 'lightgreen';


function Animation11() {
    // 清空画布
    loading11.clearRect(-80, -80, 160, 160);
    loading11.save();

    // 重绘图形
    loading11.beginPath();
    loading11.moveTo(-50, 0);
    loading11.lineTo(50, 0);
    loading11.strokeStyle = 'white';

    loading11.stroke();
    loading11.closePath();

    loading11.beginPath();
    loading11.moveTo(-50, 0);
    loading11.lineTo(progress11, 0);
    loading11.strokeStyle = 'lightgreen';
    loading11.stroke();
    loading11.closePath();

    progress11++;
    progress11 = progress11 >= 50 ? -50 : progress11 + 1;

    loading11.restore();
    requestAnimationFrame(Animation11);
}

Animation11();


// loading12
let loading12 = getCanvas('.loading12');
let loading12Num = 0;
let loading12Balls = [];

class loading12Ball {
    color = randomColor();
    over = false;

    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    up() {
        this.y -= 3;
        this.r += 0.5;
        if (this.y < -80 - this.r) {
            this.over = true;
        }
    }
}

function Animation12() {
    // 清空画布
    loading12.clearRect(-80, -80, 160, 160);
    loading12.save();

    if (loading12Num++ > randomNum(20, 30)) {
        let newball = new loading12Ball(randomNum(-80, 80), 100, randomNum(10, 20));
        loading12Balls.push(newball);
        loading12Num = 0;
    }

    // 重绘图形
    for (const item of loading12Balls) {
        if (item.over) {
            loading12Balls.splice(item.index, 1);
        }

        loading12.fillStyle = item.color;
        drawCircle(loading12, item.x, item.y, item.r, true, false);
        item.up();
    }

    loading12.restore();
    requestAnimationFrame(Animation12);
}
Animation12();


// loading13
let loading13 = getCanvas('.loading13');
let loading13Num = -10;
let loading13Flag = true;

loading13.lineCap = 'round';
loading13.lineWidth = 10;
loading13.strokeStyle = 'lightblue';

function Animation13() {
    // 清空画布
    loading13.clearRect(-80, -80, 160, 160);
    loading13.save();

    // 重绘图形
    drawCircle(loading13, -30, -30, 10, false, true);
    drawCircle(loading13, 30, -30, 10, false, true);

    loading13.beginPath();
    loading13.moveTo(-45, 30);
    loading13.arcTo(0, loading13Num, 45, 30, 60);
    loading13.lineTo(45, 30);
    loading13.stroke();
    loading13.closePath();

    if (loading13Flag) {
        loading13Num++;
        loading13Flag = loading13Num < 70;
    } else {
        loading13Num--;
        loading13Flag = loading13Num < -10;
    }

    loading13.restore();
    requestAnimationFrame(Animation13);
}

Animation13();


// loading14
let loading14 = getCanvas('.loading14');
let loading14Num = 15;

class loading14Ball {
    color = 'lightblue';
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
    scale() {
        this.r++;
        if (this.r > 60) {
            this.r = 30;
        }
    }
}
let loading14ball = new loading14Ball(0, 0, 30);

function Animation14() {
    // 清空画布
    loading14.clearRect(-80, -80, 160, 160);
    loading14.save();

    loading14.strokeStyle = loading14ball.color;
    loading14.fillStyle = loading14ball.color;
    if (loading14ball.r < 50) {
        drawCircle(loading14, loading14ball.x, loading14ball.y, loading14ball.r, true, false);
    } else {
        loading14.lineWidth = loading14Num;
        loading14Num = loading14Num < 3 ? 15 : loading14Num - 1;
        drawCircle(loading14, loading14ball.x, loading14ball.y, loading14ball.r, false, true);
    }
    loading14ball.scale();

    loading14.restore();
    requestAnimationFrame(Animation14);
}

Animation14();


// loading21
let loading21 = getCanvas('.loading21');
let loading21Num = 0;
let loading21Rects = [];

class loading21Rect {
    color = randomColor();
    over = false;

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    toRight() {
        this.x++;
        if (this.x > 80 + this.w) {
            this.over = true;
        }
    }
}

function Animation21() {
    // 清空画布
    loading21.clearRect(-80, -80, 160, 160);
    loading21.save();

    if (loading21Num++ > randomNum(5, 10)) {
        let newrect = new loading21Rect(-100, randomNum(-70, 70), randomNum(10, 30), 5);
        loading21Rects.push(newrect);
        loading21Num = 0;
    }

    // 重绘图形
    for (const item of loading21Rects) {
        if (item.over) {
            loading21Rects.splice(item.index, 1);
        }

        loading21.fillStyle = item.color;
        loading21.lineCap = 'round';
        drawRect(loading21, item.x, item.y, item.w, item.h, true, false);
        item.toRight();
    }


    loading21.restore();
    requestAnimationFrame(Animation21);
}

Animation21();