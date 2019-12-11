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
    },
    {
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
    },
    {
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
// audio
var player = document.querySelector('#playing');
// 音量
var volume = player.volume;

// 各种控制按钮
var play = document.querySelector('.btn-play');
var prev = document.querySelector('.btn-prev');
var next = document.querySelector('.btn-next');
var stop = document.querySelector('.btn-stop');
var volplus = document.querySelector('.vol-plus');
var volminus = document.querySelector('.vol-minus');
var model = document.querySelector('.play-model').firstChild;

// 播放中
var playingPic = document.querySelector('.singing-pic img');
var playingName = document.querySelector('.singing-name');
var playingSinger = document.querySelector('.singing-singer');

// 进度条
var rangebar = document.querySelector('.rang-bar');
var progress = document.querySelector('.progress');
var start = document.querySelector('.current');
var end = document.querySelector('.finish');
var range = document.querySelector('.range');

// 歌单
var list = document.querySelector('.list');

// 索引
var index = 0;

// 绑定事件
play.onclick = playbtn;
prev.onclick = prevsong;
next.onclick = nextsong;
stop.onclick = stopplay;
model.onclick = changemodel;

// 切换播放模式
function changemodel() {
    if (model.dataset.mod == '0') {
        model.dataset.mod = '1';
        this.className = 'fa fa-random';
        document.querySelector('.play-model').title = '随机播放';
    } else if (model.dataset.mod == '1') {
        model.dataset.mod = '2';
        this.className = 'fa fa-refresh single';
        document.querySelector('.play-model').title = '单曲循环';
    } else {
        model.dataset.mod = '0';
        this.className = 'fa fa-refresh';
        document.querySelector('.play-model').title = '列表循环';
    }

}

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
        this.innerHTML = '<i class="fa fa-pause" title="暂停"></i>';
        playingPic.className = 'playing';
    } else {
        player.pause();
        this.innerHTML = '<i class="fa fa-play" title="播放"></i>';
        playingPic.className = 'playing pause';
    }
}

// 切歌(正常)
function songs() {
    init();
    player.play();
    play.innerHTML = '<i class="fa fa-pause" title="暂停"></i>';
    change();
}

// 下一首(顺序)
function nextsong() {
    if (++index == playlist.length) {
        index = 0;
    }
    songs();
}

// 随机播放
function randompaly() {
    index = Math.floor(Math.random() * playlist.length);
    console.log(index);
}

// 单曲循环
function singleplay() {
    player.currentTime = 0;
    range.value = 0;
}

// 上一首
function prevsong() {
    if (--index < 0) {
        index = playlist.length - 1;
    }
    songs();
}

// 停止播放
function stopplay() {
    player.pause();
    player.currentTime = 0;
    range.value = 0;
    play.innerHTML = '<i class="fa fa-play" title="播放"></i>';
    playingPic.className = '';
}


//  自动下一首
player.onended = function() {
    if (model.dataset.mod == '0') {
        nextsong();
    } else if (model.dataset.mod == '1') {
        randompaly();
    } else {
        singleplay();
    }

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
}

// 改变播放
function change() {
    document.querySelector('.focus').className = 'songs';
    document.querySelector('[data-index = "' + index + '"]').className = 'songs focus';
    playingPic.className = 'playing';
    init();
    player.play();
    play.innerHTML = '<i class="fa fa-pause" title="暂停"></i>';
    range.value = 0;
}

player.oncanplay = function() {
    console.log(player.duration);
    end.innerHTML = calcTime(player.duration);
}

// 初始化播放器
function init() {
    player.src = playlist[index].file;
    playingPic.src = playlist[index].thumb;
    playingName.innerHTML = playlist[index].trackName;
    playingSinger.innerHTML = playlist[index].trackArtist;
    start.innerHTML = '00:00';
    end.innerHTML = '--:--';
    // document.querySelector('body').style.backgroundImage = 'url('+ playlist[index].thumb + ')';
}

// 初始化列表
function initList() {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < playlist.length; i++) {
        var li = document.createElement('li');
        li.className = 'songs';
        li.innerHTML = '<img src="' +
            playlist[i].thumb + '" alt="歌曲图片"><div class="song-name">' +
            playlist[i].trackName + '</div><div class="singer">' +
            playlist[i].trackArtist + '</div>';
        li.dataset.index = i;
        li.onclick = changeSongs;
        fragment.appendChild(li);
    }
    list.appendChild(fragment);
    console.log(playlist.length);
    document.querySelectorAll('.list li')[0].className = "songs focus";
}

// 初始化
window.onload = function() {
    init();
    initList();
}