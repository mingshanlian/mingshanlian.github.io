// 播放列表
var playlist = [{
        file: "songs/01.mp3",
        thumb: "songs/01.jpg",
        trackName: "Dusk",
        trackArtist: "Tobu & Syndec",
        trackAlbum: "Single"
    },
    {
        file: "songs/02.mp3",
        thumb: "songs/02.jpg",
        trackName: "Blank",
        trackArtist: "Disfigure",
        trackAlbum: "Single"
    },
    {
        file: "songs/03.mp3",
        thumb: "songs/03.jpg",
        trackName: "Fade",
        trackArtist: "Alan Walker",
        trackAlbum: "Single"
    }
];

// 获取元素对象
var player = document.querySelector("#playing");
var play = document.querySelector(".btn-play");
var prev = document.querySelector(".btn-prev");
var next = document.querySelector(".btn-next");
var volplus = document.querySelector(".volplus");
var volminus = document.querySelector(".volminus");
var volume = player.volume;

var playingPic = document.querySelector('.playing-pic');
var playingName = document.querySelector('.playing-name');
var playingSinger = document.querySelector('.playing-singer');
var index = 0;

var rangebar = document.querySelector('.rangebar');
var progress = document.querySelector('.progress');
var start = document.querySelector('.start');
var end = document.querySelector('.end');
var range = document.querySelector('.range');

var list = document.querySelector('.playlist');

// 绑定事件
play.onclick = playbtn;
prev.onclick = prevsong;
next.onclick = nextsong;

// 音量控制
// 音量加
volplus.onclick = function() {
    if (volume < 1) {
        volume = Math.fround((volume + 0.1) * 10) / 10;
        player.volume = volume;
        console.log(volume);
    }
}

// 音量减
volminus.onclick = function() {
    if (volume > 0) {
        volume = Math.fround((volume - 0.1) * 10) / 10;
        player.volume = volume;
        console.log(volume);
    }
}

// 播放按钮
function playbtn() {
    if (player.paused) {
        player.play();
        this.innerHTML = '<i class="fa fa-pause"></i>';
    } else {
        player.pause();
        this.innerHTML = '<i class="fa fa-play"></i>';
    }
}

// 切歌(正常)
function songs() {
    init();
    player.play();
    play.innerHTML = '<i class="fa fa-pause"></i>';
    change();
}

// 下一首
function nextsong() {
    if (++index == playlist.length) {
        index = 0;
    }
    songs();
}

// 上一首
function prevsong() {
    if (--index < 0) {
        index = playlist.length - 1;
    }
    songs();
}

//  自动下一首
player.onended = function() {
    nextsong();
    change();
}

// 计算时长
function calcTime(player) {
    var time = player;
    time = toTime(Math.floor(time / 60)) + ':' + toTime(Math.floor(time % 60))

    return time;
}

// 转化成mm:ss格式
function toTime(num) {
    if (num < 10) {
        num = '0' + num;
    } else {
        num.toString();
    }
    return num;
}

// 监听进度
player.ontimeupdate = function() {
    // console.log(player.currentTime / player.duration * 100 + '%');
    start.innerHTML = player.currentTime;
    progress.style.width = player.currentTime / player.duration * 100 + '%';
    start.innerHTML = calcTime(player.currentTime);
    range.value = player.currentTime / player.duration * 100;
}

// 进度条控制
range.oninput = function(e) {
    e.preventDefault();
    // console.log(this.value);
    progress.style.width = this.value + "%";
    player.currentTime = this.value / 100 * player.duration;
}

// 切歌(绑定给列表)
function changeSongs() {
    index = this.dataset.index;
    change();
    this.className = 'focus';
}

// 改变播放
function change() {
    document.querySelector('.focus').className = '';
    document.querySelector('[data-index = "' + index + '"]').className = 'focus';
    init();
    player.play();
    play.innerHTML = '<i class="fa fa-pause"></i>';
    range.value = 0;
}

// 初始化播放器
function init() {
    player.src = playlist[index].file;
    playingPic.src = playlist[index].thumb;
    playingName.innerHTML = playlist[index].trackName;
    playingSinger.innerHTML = playlist[index].trackArtist;
    end.innerHTML = '--:--';
    setTimeout(function() {
        console.log(player.duration);
        start.innerHTML = '00:00';
        end.innerHTML = calcTime(player.duration);
    }, 100);
    document.querySelector('body').style.backgroundImage = 'url(' + playlist[index].thumb + ')';
}

// 初始化列表
function initList() {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < playlist.length; i++) {
        var li = document.createElement('li');
        li.innerHTML = '<img class="song-pic" src="' +
            playlist[i].thumb + '" alt="歌曲图片"><h5 class="song-name">' +
            playlist[i].trackName + '</h5><p class="song-singer">' +
            playlist[i].trackArtist + '</p>';
        li.dataset.index = i;
        // li.className = "focus";
        li.onclick = changeSongs;
        fragment.appendChild(li);
    }
    list.appendChild(fragment);
    console.log(playlist.length);
    document.querySelectorAll('.playlist li')[0].className = "focus";
}

// 初始化
window.onload = function() {
    init();
    initList();
}