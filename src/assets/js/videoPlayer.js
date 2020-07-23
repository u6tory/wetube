const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("volumeBtn");
const volumeRange = document.getElementById("jsVolume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const progressNow = document.getElementById("progress-now");
const videoControls = document.getElementById("videoControls");

const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, {
    method: "POST",
  });
};

function handlePlayBtn() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolumeBtn() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeRange.value = videoPlayer.volume;
  } else {
    volumeRange.value = 0;
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function handleVolumeRange(e) {
  videoPlayer.volume = e.target.value;
  if (e.target.value >= 0.7) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (e.target.value >= 0.2) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  }
}

function formatDate(seconds) {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
}

function getCurrentTime() {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
}

async function setTotalTime() {
  const duration = videoPlayer.duration;
  const totalTimeString = formatDate(duration);
  const getProgressNow = () => {
    progressNow.style.width = `${(videoPlayer.currentTime * 100) / duration}%`;
  };
  totalTime.innerHTML = totalTimeString;
  // alert(duration);
  setInterval(function () {
    getCurrentTime();
    getProgressNow();
  }, 1000);
}

function handleEnded() {
  videoPlayer.currentTime = 0;
  registerView();
}

let hideTimer;

function handleVideoControl() {
  clearTimeout(hideTimer);
  videoControls.style.opacity = 1;
  videoContainer.style.cursor = "";
  hideTimer = setTimeout(hideControls, 3000);
}

function hideControls() {
  videoControls.style.opacity = 0;
  videoContainer.style.cursor = "none";
}

function handleKeyboard(event) {
  if (event.keyCode === 32) {
    event.preventDefault();
    if (videoPlayer.paused) {
      videoPlayer.play();
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      videoPlayer.pause();
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  }
}

function init() {
  playBtn.addEventListener("click", handlePlayBtn);
  volumeBtn.addEventListener("click", handleVolumeBtn);
  volumeRange.addEventListener("input", handleVolumeRange);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  document.addEventListener("mousemove", handleVideoControl);
  document.addEventListener("mouseup", handleVideoControl);
  document.addEventListener("keydown", handleKeyboard);
}

if (videoPlayer) {
  init();
}
