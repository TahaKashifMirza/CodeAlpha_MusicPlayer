// List of songs with title, artist, file path, and image
const songs = [
  {
    name: "Broken Angel",
    artist: "Arash",
    path: "Songs/Broken Angel Song.mp3",
    image: "Images/Img1.PNG"
  },
  {
    name: "Shape of You",
    artist: "Ed Sheeran",
    path: "Songs/Shape Of You Song.mp3",
    image: "Images/Img2.PNG"
  },
  {
    name: "Titanic",
    artist: "Celine Dion",
    path: "Songs/taitanic Song.mp3",
    image: "Images/Img4.PNG"
  },
  {
    name: "Smack That",
    artist: "Akon",
    path: "Songs/Smack That Song.mp3",
    image: "Images/Img3.PNG"
  }
];

// DOM elements
const songSelect = document.getElementById('song-select');
const songImg = document.getElementById('song-img');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationTimeEl = document.getElementById('duration-time');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const volumeControl = document.getElementById('volume');

// Initialize variables
let currentSongIndex = 0;
let isPlaying = false;
let audio = new Audio(songs[currentSongIndex].path);

// Load the song into the player
function loadSong(song) {
  audio.src = song.path;
  songTitle.textContent = song.name;
  songArtist.textContent = song.artist;
  songImg.src = song.image;
  updateProgressBar();
}

// Populate song options in dropdown
function populateSongOptions() {
  songs.forEach((song, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${song.name} - ${song.artist}`;
    songSelect.appendChild(option);
  });
}

// Play or pause the song
function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = '▶️'; // Change to play icon
  } else {
    audio.play();
    playBtn.textContent = '⏸️'; // Change to pause icon
  }
  isPlaying = !isPlaying;
}

// Update the progress bar based on the current song time
function updateProgressBar() {
  setInterval(() => {
    progressBar.max = audio.duration;
    progressBar.value = audio.currentTime;

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationTimeEl.textContent = formatTime(audio.duration);
  }, 500);
}

// Format the time in minutes and seconds
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Update the song when the progress bar is changed
progressBar.addEventListener('input', () => {
  audio.currentTime = progressBar.value;
});

// Play the next song in the playlist
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(songs[currentSongIndex]);
  audio.play();
  isPlaying = true;
  playBtn.textContent = '⏸️'; // Set play button to pause icon
}

// Play the previous song in the playlist
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  audio.play();
  isPlaying = true;
  playBtn.textContent = '⏸️';
}

// Update volume control
volumeControl.addEventListener('input', (e) => {
  audio.volume = e.target.value;
});

// Play selected song from dropdown
songSelect.addEventListener('change', (e) => {
  currentSongIndex = e.target.value;
  loadSong(songs[currentSongIndex]);
  audio.play();
  isPlaying = true;
  playBtn.textContent = '⏸️'; // Change to pause icon
});

// Event listeners for play/pause, next, and previous buttons
playBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// Load the first song and populate the dropdown on page load
window.onload = () => {
  populateSongOptions();
  loadSong(songs[currentSongIndex]);
};