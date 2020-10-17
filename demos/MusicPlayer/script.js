const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

const songs = ['hey', 'summer', 'ukulele'];

let songIndex = 0;
console.log(songIndex);

loadSong(songs[songIndex]);

function loadSong(song){
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}
function playSong() {
    console.log(musicContainer.classList);
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
  }
  
  
  function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
  
    audio.pause();
  }
  
function nextSong(){
    // console.log(songIndex);
    // console.log(songs[songIndex]);
    // console.log('>>>>',songIndex);
    songIndex++;
    // console.log('xxxx',songIndex);
    // console.log('songs.length',songs.length);

    // if(songIndex>2){
    //     songIndex=songIndex%2;
    // }

    if(songIndex > songs.length-1){
        songIndex=0;
    }
    loadSong(songs[songIndex]);
    playSong();

}

function prevSong(){
    songIndex--;

    if(songIndex < 0){
        songIndex=2;
    }

    loadSong(songs[songIndex]);
    playSong();

}

function updateProgress(e){
    // console.log(e);
    // console.log(e.srcElement);
    // console.log(audio);
const{duration,currentTime}=e.srcElement;
const progressPercent=(currentTime/duration)*100;
progress.style.width=`${progressPercent}%`;
}

function setProgress(e){
const width=this.clientWidth;
console.log(this);
const clickX=e.offsetX;
const duration=audio.duration;
audio.currentTime=(clickX/width)*duration;
}

playBtn.addEventListener('click',()=>{
    console.log(musicContainer.classList);
    const isPlaying = musicContainer.classList.contains('play');
    // console.log(isPlaying);
    if(isPlaying){
        pauseSong();

    }else{
        playSong();
    }
});

nextBtn.addEventListener('click',nextSong);
prevBtn.addEventListener('click',prevSong);

audio.addEventListener('timeupdate',updateProgress);
progressContainer.addEventListener('click',setProgress);
audio.addEventListener('ended',nextSong);