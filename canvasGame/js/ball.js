// 图片参数
let file = {
    again_btn_png: { h: 69, offX: 0, offY: 0, sourceH: 69, sourceW: 194, w: 193, x: 761, y: 221 },
    arrow_png: { h: 112, offX: 0, offY: 0, sourceH: 112, sourceW: 139, w: 139, x: 618, y: 221 },
    balance_base_bg_png: { h: 381, offX: 15, offY: 0, sourceH: 387, sourceW: 640, w: 612, x: 2, y: 2 },
    share_btn_png: { h: 68, offX: 2, offY: 3, sourceH: 73, sourceW: 195, w: 193, x: 761, y: 294 },
    share_guide_png: { h: 215, offX: 2, offY: 0, sourceH: 216, sourceW: 357, w: 355, x: 618, y: 2 },
    start_btn_png: { h: 51, offX: 0, offY: 0, sourceH: 51, sourceW: 411, w: 411, x: 2, y: 387 },
    white_line_png: { h: 8, offX: 9, offY: 0, sourceH: 8, sourceW: 621, w: 612, x: 2, y: 442 }
};

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
let img = new Image();
img.src = './img/bg.png';

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

/** @type {HTMLCanvasElement} */
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

// 获取屏幕尺寸
let windowWidth = window.screen.width;
let windowHeight = window.screen.height;

// 调整字体大小
function setFont() {
    if (windowWidth > 480) {
        ctx.font = "2rem Arial";
    } else if (windowWidth > 360) {
        ctx.font = "1.5rem Arial";
    } else {
        ctx.font = "1rem Arial";
    }
}

// 游戏场景类
class Game {
    stageW = windowWidth < 640 ? windowWidth : 640; // 场景宽度
    stageH = windowWidth < 640 ? windowHeight : (windowHeight < 736 ? windowHeight : 736); // 场景高度
    // 游戏状态: 0-游戏可开始， 1-游戏进行中， 2-游戏结束
    status = 0;
    score = 0; //得分
    center = {
        x: this.stageW / 2,
        y: this.stageH / 2
    };
    // 0表示未开始，1表示已开始，2表示重开
    start = 0;


    // 刷新背景
    refreshBg() {
        ctx.clearRect(0, 0, this.w, this.h);
        ctx.fillStyle = "#eaeaea";
        ctx.fillRect(0, 0, this.stageW, this.stageH);
    }

    // 准备场景
    readyStage(a, b) {
        let ready = setInterval(() => {
            // 清空画布
            stage.refreshBg();
            // 绘制两个小球
            a.drawSelf();
            b.drawSelf();
            // 绘制开始按钮
            startBtn.drawSelf();
        }, 30);
        id.push(ready);
    }

    // 游戏场景
    playStage() {
        let play = setInterval(() => {
            // 产生新球球
            if (++count % phase == 0) {
                let newball = new Ball(randomNum(myball.r - 5, myball.r + 15));
                newball.init();
                balls.push(newball);
                count = 0;
                // 减慢球球产生的速度
                if (myball.r % 30 == 0) {
                    phase += 1;
                }
            }
            // 清空画布
            stage.refreshBg();
            // 画出自己的小球
            myball.drawSelf();
            // 删除数组里面已经超出和死亡的球球
            for (let i = 0; i < balls.length; i++) {
                balls[i].checkover();
                balls[i].move();
                balls[i].drawSelf();
                if (!myball.eat(balls[i])) {
                    break;
                }
                // 删除数组里越界和死亡的球球
                if (balls[i].over || balls[i].die) {
                    balls.splice(i, 1);
                }
            }

            // 更新得分
            ctx.fillStyle = "#333333";
            ctx.fillText(this.score, 50, 50);
        }, 20);
        id.push(play);
    }

    // 结束场景
    gameOver() {
        ctx.clearRect(0, 0, this.w, this.h);
        ctx.fillStyle = "#aaaaaa";
        ctx.fillRect(0, 0, this.stageW, this.stageH);
        finishImg.drawSelf();
        whiteLine.drawSelf();
        againBtn.drawSelf();
        ctx.fillStyle = "white";
        ctx.fillText(this.score, stage.stageW / 100 * 47, stage.center.y - ((file["balance_base_bg_png"].h / file["balance_base_bg_png"].w) * (stage.stageW * 2)) / 55);
        // 统计总人数及超过的人数
        let sum = 0;
        let win = 0;
        if (localStorage.score) {
            let oldArr = JSON.parse(localStorage.score);

            // 新分数标志
            let flag = true;
            // 循环数组
            for (let i = 0; i < oldArr.length; i++) {
                // 检查每一个得分数组对象
                for (let key in oldArr[i]) {
                    sum += oldArr[i][key];
                    // 同分加次数
                    if (key < this.score) {
                        win += oldArr[i][key];
                    }
                    if (key == this.score) {
                        flag = false;
                        oldArr[i][key]++;
                        localStorage.score = JSON.stringify(oldArr);
                    }
                }
            }

            // 新的分数将创建新分数数组并进行数组排序
            if (flag) {
                let newScore = {};
                newScore[this.score] = 1;
                oldArr.push(newScore);
                // 数据按照对象键名排序
                oldArr.sort(function(a, b) {
                    for (let keya in a) {
                        for (let keyb in b) {
                            return Number(keya) - Number(keyb);
                        }
                    }
                });
                // 新数组写入本地存储
                localStorage.score = JSON.stringify(oldArr);
            }
        } else {
            let newScore = {};
            newScore[this.score] = 1;
            localStorage.score = JSON.stringify([newScore]);
        }
        // 计算超过百分比
        var people = !isNaN(win / sum) ? Math.floor(win / sum * 100) : 0;
        ctx.fillText(people, stage.stageW * 52 / 100, stage.center.y + ((file["balance_base_bg_png"].h / file["balance_base_bg_png"].w) * (stage.stageW * 2)) / 9);

    }
}
// 游戏场景
let stage = new Game();
// 设置画布大小
canvas.width = stage.stageW;
canvas.height = stage.stageH;

// 准备场景的球球
class ReadyBall {
    color = randomColor();
    flag = true;
    constructor(x, y, r, maxR, minR) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.maxR = maxR;
        this.minR = minR;
    }

    // 绘制自身
    drawSelf() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();

        if (this.r >= this.maxR) {
            this.flag = false;
        }
        if (this.r <= this.minR) {
            this.flag = true;
        }

        if (this.flag) {
            this.r++;
        } else {
            this.r--;
        }
    }
}

// 球球类 
class Ball {
    color = randomColor(); //随机产生颜色
    die = false; //死亡标志
    over = false; //越界标记
    speedX = 0; //X轴速度
    speedY = 0; //Y轴速度
    speed = 3; //速度基准
    x = 0; //坐标x
    y = 0; //坐标y
    constructor(r) {
        this.r = r; //球球半径
    }

    // 绘制自己
    drawSelf() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // 生成初始位置
    init() {
        // 随机数代表方向
        let num = randomNum(0, 3);
        switch (num) {
            case 0:
                // 从上面
                this.x = randomNum(-this.r, stage.stageW + this.r);
                this.y = -this.r;
                break;
            case 1:
                // 从右面
                this.x = stage.stageW + this.r;
                this.y = randomNum(-this.r, stage.stageH + this.r);
                break;
            case 2:
                // 从下面
                this.x = randomNum(-this.r, stage.stageW + this.r);
                this.y = stage.stageH + this.r;
                break;
            default:
                // 左边
                this.x = -this.r;
                this.y = randomNum(-this.r, stage.stageH + this.r);
        }
        this.ballspeed();
    }

    // 球球速度生成
    ballspeed() {
        if (this.x > stage.stageW) {
            this.speedX = -randomNum(0, this.speed);
            this.speedY = randomNum(-this.speed, this.speed);
        }
        if (this.x < 0) {
            this.speedX = randomNum(0, this.speed);
            this.speedY = randomNum(-this.speed, this.speed);
        }
        if (this.y > stage.stageH) {
            this.speedX = randomNum(-this.speed, this.speed);
            this.speedY = -randomNum(0, this.speed);
        }
        if (this.y < 0) {
            this.speedX = randomNum(-this.speed, this.speed);
            this.speedY = randomNum(0, this.speed);
        }
    };

    // 球球移动
    move() {
        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;
    };

    // 越界检测
    checkover() {
        let rightOver = this.x > stage.stageW + this.r;
        let leftOver = this.x < -this.r;
        let bottomOver = this.y > stage.stageH + this.r;
        let topOver = this.y < -this.r;
        this.over = rightOver || leftOver || topOver || bottomOver;
    };
}

// 我方的球球类
class MyBall {
    x = stage.center.x; //生成在场景中心
    y = stage.center.y;
    r = 10; //初始半径为10
    color = "#333333"; //颜色

    // 判定输赢
    eat(ball) {
        // 勾股定理 毕达哥拉斯定理 计算两者距离
        let s = Math.sqrt((ball.x - this.x) * (ball.x - this.x) + (ball.y - this.y) * (ball.y - this.y));
        // 碰撞检测
        if (s < ball.r + this.r && !ball.over) {
            if (ball.r >= this.r) {
                // 游戏结束
                clearInterval(id[0]);
                id.pop();
                stage.status = 2;
                init();
                return false;
            } else {
                // 吃掉小球
                this.r++;
                ball.die = true;
                stage.score++;
            }
        }
        return true;
    }

    drawSelf() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

}

// 按钮
class Button {
    constructor(obj) {
        this.obj = obj;
    }

    // 绘制自身
    drawSelf() {
        ctx.drawImage(
            img,
            file[this.obj.name].x,
            file[this.obj.name].y,
            file[this.obj.name].w,
            file[this.obj.name].h,
            this.obj.x,
            this.obj.y,
            this.obj.w,
            this.obj.h
        );
    }
}

// 开始按钮参数
let start_btn_png = {
    name: "start_btn_png",
    w: (stage.stageW * 2) / 4,
    h: ((file["start_btn_png"].h / file["start_btn_png"].w) * (stage.stageW * 2)) / 4,
    x: (stage.stageW - (stage.stageW * 2) / 4) / 2,
    y: stage.stageH / 2 + 50
};
// 重来按钮参数
let again_btn_png = {
    name: "again_btn_png",
    w: (stage.stageW * 2) / 8,
    h: ((file["again_btn_png"].h / file["again_btn_png"].w) * (stage.stageW * 2)) / 8,
    x: stage.stageW / 10,
    y: stage.center.y + ((file["balance_base_bg_png"].h / file["balance_base_bg_png"].w) * (stage.stageW * 2)) / 5
};
// 结算画面参数
let balance_base_bg_png = {
    name: "balance_base_bg_png",
    w: stage.stageW / 10 * 9,
    h: ((file["balance_base_bg_png"].h / file["balance_base_bg_png"].w) * (stage.stageW * 9)) / 10,
    x: stage.stageW / 20,
    y: stage.center.y - ((file["balance_base_bg_png"].h / file["balance_base_bg_png"].w) * (stage.stageW * 2)) / 3
};
// 白线
let white_line_png = {
    name: "white_line_png",
    w: stage.stageW / 10 * 9,
    h: ((file["white_line_png"].h / file["white_line_png"].w) * (stage.stageW * 9)) / 10,
    x: stage.stageW / 20,
    y: stage.center.y + ((file["balance_base_bg_png"].h / file["balance_base_bg_png"].w) * (stage.stageW * 2)) / 6
};

// 各种按钮的实例
let startBtn = new Button(start_btn_png);
let againBtn = new Button(again_btn_png);
let finishImg = new Button(balance_base_bg_png);
let whiteLine = new Button(white_line_png);


canvas.onclick = function(event) {
    // // 开始按钮
    let startX = event.offsetX >= start_btn_png.x && event.offsetX <= start_btn_png.x + start_btn_png.w;
    let startY = event.offsetY >= start_btn_png.y && event.offsetY <= start_btn_png.y + start_btn_png.h;

    // // 重开按钮
    let againX = event.offsetX >= again_btn_png.x && event.offsetX <= again_btn_png.x + again_btn_png.w;
    let againY = event.offsetY >= again_btn_png.y && event.offsetY <= again_btn_png.y + again_btn_png.h;

    if (startX && startY && stage.status == 0) {
        // 开始游戏
        clearInterval(id[0]);
        id.pop();
        stage.status = 1;
        init();
    }

    if (againX && againY && stage.status == 2) {
        // 重开游戏
        location.reload();
    }

    // 点击小球才开始 监听鼠标移动 PC
    if (Math.abs(event.offsetX - stage.center.x) < myball.r && Math.abs(event.offsetY - stage.center.y) < myball.r && stage.status == 1) {
        canvas.onmousemove = function(event) {
            // 根据鼠标移动位置 更新我方位置
            myball.x = event.offsetX;
            myball.y = event.offsetY;
        };
    }

    // 移动端
    if (navigator.maxTouchPoints) {
        canvas.ontouchmove = function(event) {
            myball.x = event.touches[0].pageX;
            myball.y = event.touches[0].pageY;
        };
    }
};

// 自己的小球
let myball = new MyBall();

// 计时器数组
let id = [];
// 球球数组
let balls = [];
// 控制球球生成的参数
let count = 0;
// 游戏阶段(控制球球生成速度)
let phase = 5;

// 初始化
function init() {
    // 准备场景的两只小球
    let a = new ReadyBall(stage.center.x - 30, stage.center.y - 60, 50, 60, 40);
    let b = new ReadyBall(stage.center.x + 50, stage.center.y - 45, 30, 40, 20);

    setFont();
    // 准备场景
    if (stage.status == 0) {
        stage.readyStage(a, b);
    }

    // 游戏场景
    if (stage.status == 1) {
        stage.playStage();
    }

    // 结束场景
    if (stage.status == 2) {
        stage.gameOver();
    }
}

window.onload = init;