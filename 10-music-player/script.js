const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');


// Song titles
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Next song
function nextSong() {
  if(songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex++;
  }
  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress (e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;

  console.log(audio.currentTime);
  console.log(audio.duration);

}

// Song ended
audio.addEventListener('ended', nextSong);


// Previous song
function prevSong() {
  if(songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex--;
  }
  loadSong(songs[songIndex]);

  playSong();
}

// Play song
function playSong () {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  audio.pause();
}

// Event listeners
playBtn.addEventListener('click', () => {
  if(musicContainer.classList.contains('play')) {
    pauseSong();
  } else {
    playSong();
  }
});
nextBtn.addEventListener('click', () => {nextSong()});
prevBtn.addEventListener('click', () => {prevSong()});

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

