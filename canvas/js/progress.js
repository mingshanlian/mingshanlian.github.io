// 参数
let Selector = '.progress';
let width = 700;
let height = 300;

// 颜色数组
let colorArr = [
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

// 画出泡泡
function drawC(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// 获取画布，并设置大小尺寸
function getCanvas(Selector, w, h) {
    let canvas = document.querySelector(Selector);
    let ctx = canvas.getContext('2d');

    canvas.width = w;
    canvas.height = h;
    canvas.style.border = '1px solid red';

    return ctx;
}

// 泡泡类
class Ball {
    color = randomColor();
    scale = 0;
    die = false;

    constructor(x, y, r, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.speedX = speedX;
        this.speedY = speedY;

    }

    moveY() {
        this.y += this.speedY++;
        if (this.y > height) {
            this.die = true;
        }
    }
    moveX() {
        this.x += this.speedX;
    }
    scaleSelf() {
        this.scale++;
        if (this.scale > 20) {
            this.r++;
            this.scale = 0;
        }
    }
}

/** @type {HTMLCanvasElement} */
let ctx = getCanvas(Selector, width, height);
let balls = [];
let progress = 0.1 * width;

// 动画函数
function progressBar() {
    // 清空画布
    ctx.clearRect(0, 0, width, height);

    // 重绘
    // 空条
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineWidth = 16;
    ctx.moveTo((0.1 * width), (0.5 * height));
    ctx.lineTo((0.9 * width), (0.5 * height));
    ctx.strokeStyle = 'rgba(200,200,200,.3)';
    ctx.stroke();
    ctx.closePath();

    // 进度
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineWidth = 16;
    ctx.moveTo((0.1 * width), (0.5 * height));
    ctx.lineTo(progress, (0.5 * height));
    ctx.strokeStyle = 'lightgreen';
    ctx.stroke();
    ctx.closePath();

    // 产生新泡泡
    let ball = new Ball(progress, (0.5 * height), randomNum(3, 6), -randomNum(1, 3), -randomNum(10, 15));
    balls.push(ball);

    // 画出泡泡
    for (const item of balls) {
        if (item.die) {
            balls.splice(item.index, 1);
        } else {
            drawC(item);
            item.scaleSelf();
            item.moveY();
            // if (Boolean(randomNum(0, 1))) {
            item.moveX();
            // }
        }
    }

    // 重置进度条
    progress = progress >= (0.9 * width) ? (0.1 * width) : progress + 1;

    requestAnimationFrame(progressBar);
}
progressBar();