const songs = [
  {
    id: 1,
    name: "Shape of You",
    artist: "Ed Sheeran",
    img: "Images/shape-of-you.jpg",
    genre: "Pop",
    source: "Songs/Shape of You.mp3",
  },
  {
    id: 2,
    name: "Blinding Lights",
    artist: "The Weeknd",
    img: "Images/Blinding Lights.jpg",
    genre: "Pop",
    source: "Songs/Blinding Lights.mp3",
  },
  {
    id: 3,
    name: "Levitating",
    artist: "Dua Lipa",
    img: "Images/Levitating.jpg",
    genre: "Disco-pop",
    source: "Songs/Levitating.mp3",
  },
  {
    id: 4,
    name: "Stay",
    artist: "The Kid LAROI, Justin Bieber",
    img: "Images/Stay.jpg",
    genre: "Pop",
    source: "Songs/Stay.mp3",
  },
  {
    id: 5,
    name: "Peaches",
    artist: "Justin Bieber",
    img: "Images/Peaches.jpg",
    genre: "R&B",
    source: "Songs/Peaches.mp3",
  },
  {
    id: 6,
    name: "SICKO MODE",
    artist: "Travis Scott",
    img: "Images/SICKO MODE.jpg",
    genre: "Hip-Hop",
    source: "Songs/SICKO MODE.mp3",
  },
  {
    id: 7,
    name: "Closer",
    artist: "The Chainsmokers",
    img: "Images/Closer.jpg",
    genre: "Hip-Hop",
    source: "Songs/Closer.mp3",
  },
  {
    id: 8,
    name: "HUMBLE.",
    artist: "Kendrick Lamar",
    img: "Images/HUMBLE.jpg",
    genre: "Hip-Hop",
    source: "Songs/HUMBLE..mp3",
  },
  {
    id: 9,
    name: "Old Town Road",
    artist: "Lil Nas X",
    img: "Images/Old Town Road.jpg",
    genre: "Hip-Hop",
    source: "Songs/Old Town Road.mp3",
  },
  {
    id: 10,
    name: "ROCKSTAR",
    artist: "DaBaby ft. Roddy Ricch",
    img: "Images/ROCKSTAR.jpg",
    genre: "Hip-Hop",
    source: "Songs/ROCKSTAR.mp3",
  },
];

const genreDropDown = document.getElementById("filter-song-byGenre");
const filteredSongs = document.querySelector(".filtered-songs-list");
const currPlayingSong = document.getElementById("song-name");
const currPlayingArtist = document.querySelector(".artist-name");
const selectedSong = document.querySelector(".filterd-songs");
const currPlayingSongImg = document.querySelector(".current-song-img img");
const audioPlayer = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPauseBtn");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");
const progressBar = document.getElementById("progressBar");
const prevSong = document.getElementById("prev-song");
const nextSong = document.getElementById("next-song");
const addToPlaylistBtn = document.getElementById("add-to-playlist");
const currentPlaylist = document.querySelector(".current-playlist");
const newPlaylistInput = document.getElementById("new-playlist-name");
const createPlaylistBtn = document.getElementById("create-playlist");
const allPlaylists = document.querySelector(".all-playlists");
const allPlaylistsHeader = document.querySelector(".all-playlists h2");
const searchInput = document.querySelector("#searchSong");
const searchButton = document.getElementById("search-song-btn");
const displaySearchedSong = document.getElementById("display-searched-song");

// toggle theme properties
const toggleThemeBtn = document.getElementById("toggle-theme");
const body = document.body;
const head = document.getElementById("header");
const containers = document.querySelectorAll(".inner-div");
const buttons = document.querySelectorAll("button");
const songCard = document.querySelector(".current-song-details");

let currSelectedPlaylist;
let currentSong = null;
let currentSongIndex = 0; // keeping track of current song.
let playlistParent = [];
// let currentPlaylistSongs = [];
let currentPlaylistSongs;

// Theme toggling
toggleThemeBtn.addEventListener("click", () => {
  if (
    toggleThemeBtn.innerHTML ===
    `<i class="toggle-theme-button fa-solid fa-toggle-off fa-2xl"></i>`
  ) {
    // dark theme
    toggleThemeBtn.innerHTML = `<i class="toggle-theme-button fa-solid fa-toggle-on fa-2xl"></i>`;
    body.style.backgroundColor = `#01123d`;
    body.style.color = `#F0F0F0`;
    head.style.backgroundColor = `#2C74B3`;
    containers.forEach((container) => {
      container.style.backgroundColor = `#2C74B3`;
    });
  } else {
    //light theme
    toggleThemeBtn.innerHTML = `<i class="toggle-theme-button fa-solid fa-toggle-off fa-2xl"></i>`;
    body.style.backgroundColor = `#F5F5F5`;
    body.style.color = `#333333`;
    head.style.backgroundColor = `rgb(150 186 249)`;
    containers.forEach((container) => {
      container.style.backgroundColor = `rgb(150 186 249)`;
    });
    songCard.style.backgroundColor;
    // buttons.style.backgroundColor = `#B3E5FC`;
    // buttons.forEach((btn) => {
    //   btn.style.backgroundColor = `#B3E5FC`;
    // });
  }
});

// creating genre array for all type of genres.
const genreList = ["All Songs"];

songs.forEach((song) => {
  if (!genreList.includes(song.genre)) {
    genreList.push(song.genre);
  }
});
console.log(genreList);

// showing genre list on dropsown
genreList.forEach((genre) => {
  let option = document.createElement("option");
  option.text = genre;
  option.value = genre;
  option.className = "genreOptions";
  genreDropDown.appendChild(option);
});

// rendering list of songs depending on selected dropwdown
genreDropDown.addEventListener("change", function () {
  // find slected genre song in songs array
  const selectedGenre = genreDropDown.value;
  showSongs(selectedGenre);
});

function showSongs(songGenre) {
  filteredSongs.innerHTML = "";
  if (songGenre === "All Songs") {
    songs.forEach((song) => {
      const p = document.createElement("p");
      p.textContent = `${song.name} - ${song.artist}`;
      p.className = "filterd-songs";
      p.id = song.id;
      p.classList.add("text-white");
      filteredSongs.appendChild(p);
      p.addEventListener("click", () => {
        // console.log(event.value);
        renderCurrentSong(song.id);
        playSong(song);
      });
    });
  } else {
    songs.forEach((song) => {
      if (song.genre === songGenre) {
        const p = document.createElement("p");
        p.textContent = `${song.name} - ${song.artist}`;
        p.className = "filterd-songs";
        p.id = song.id;
        p.classList.add("text-white");
        filteredSongs.appendChild(p);
        p.addEventListener("click", () => {
          // console.log(event.value);
          renderCurrentSong(song.id);
          playSong(song);
        });
      }
    });
  }
}

// fetching selected songs id

function renderCurrentSong(songId) {
  // get the song from songs[]
  songs.forEach((song) => {
    if (song.id == songId) {
      currPlayingSong.textContent = song.name;
      currPlayingArtist.textContent = song.artist;
      currPlayingSongImg.src = song.img;
      currPlayingSongImg.alt = song.name;
    }
  });
}

// Playing selected song
function playSong(song) {
  currentSong = song;
  audioPlayer.src = song.source;

  audioPlayer.play();
  playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

// toggle play pause button.
playPauseBtn.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  } else {
    audioPlayer.pause();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
});

// update progress bar and time displays
audioPlayer.addEventListener("timeupdate", () => {
  const currTime = audioPlayer.currentTime;
  const duration = audioPlayer.duration;
  progressBar.value = (currTime / duration) * 100;
  currentTimeDisplay.textContent = formatTime(currTime);
  durationDisplay.textContent = formatTime(duration);
});

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, 0);
  return `${minutes}:${seconds}`;
}

// seek audio to clicked position on the progress bar
progressBar.addEventListener("input", () => {
  audioPlayer.currTime = (progressBar.value / 100) * audioPlayer.duration;
});

// previous next button functionality
// prevSong.addEventListener("click", () => {
//   songs.forEach((song) => {
//     if (currentSong.source === song.source) {
//       changeSong(currentSong.id - 1);
//     }
//   });
// });

// nextSong.addEventListener("click", () => {
//   songs.forEach((song) => {
//     if (currentSong.source === song.source) {
//       changeSong(currentSong.id + 1);
//     }
//   });
// });

// function changeSong(songId) {
//   songs.forEach((song) => {
//     if (song.id === songId) {
//       renderCurrentSong(song.id);
//       playSong(song);
//     }
//   });
// }

prevSong.addEventListener("click", () => {
  if (currentSongIndex > 0) {
    currentSongIndex--;
    changeSong(currentSongIndex);
  } else {
    alert(`This is the first song.`);
  }
});

nextSong.addEventListener("click", playNextSong);
function playNextSong() {
  if (currentSongIndex < songs.length - 1) {
    currentSongIndex++;
    changeSong(currentSongIndex);
  } else {
    alert(`This is the last song.`);
  }
}

function changeSong(index) {
  const song = songs[index];
  if (song) {
    currentSongIndex = index;
    renderCurrentSong(song.id);
    playSong(song);
  }
}

// creating new playlist
createPlaylistBtn.addEventListener("click", () => {
  createPlaylist(newPlaylistInput.value);
});

function createPlaylist(playlistName) {
  // Parent div for playlist header and songs.
  const newPLDivParentDiv = document.createElement("div");
  newPLDivParentDiv.classList.add("playlist-parent");
  newPLDivParentDiv.id = `${playlistName}-container`;
  // create playlist header
  const newPLDiv = document.createElement("div");
  newPLDiv.classList.add("newly-created-playlist", "text-white");
  newPLDiv.id = playlistName;
  newPLDiv.textContent = playlistName;
  //create container for songs
  const songContainer = document.createElement("div");
  songContainer.classList.add("song-container");
  songContainer.id = `${playlistName}-songs`;
  // Appending header and song container to parent div
  newPLDivParentDiv.appendChild(newPLDiv);
  newPLDivParentDiv.appendChild(songContainer);

  allPlaylists.appendChild(newPLDivParentDiv);
  currentPlaylistSongs = [];

  newPLDiv.addEventListener("click", () => {
    currSelectedPlaylist = newPLDivParentDiv.id;
    appendToCurrentPlaylist();
  });
  playlistParent.push(newPLDivParentDiv);
}

// current playlist - adding songs to the current playlist
addToPlaylistBtn.addEventListener("click", () => {
  addtoPlaylist(currentSong, currSelectedPlaylist);
});

function addtoPlaylist(song, selectedPlaylistId) {
  if (!selectedPlaylistId) {
    alert("Please select a playlist first.");
    return;
  }
  const selectedPlaylist = document.getElementById(selectedPlaylistId);
  const newAddedSong = document.createElement("div");
  newAddedSong.textContent = `${song.name} - ${song.artist}`;
  newAddedSong.classList.add("playlist-added-songs", "text-white");
  selectedPlaylist.appendChild(newAddedSong);

  // Create a duplicate element for the current playlist
  const currentSongElement = document.createElement("div");
  currentSongElement.textContent = `${song.name} - ${song.artist}`;
  currentSongElement.classList.add("playlist-added-songs", "text-white");

  currentPlaylistSongs.push(currentSongElement);
  // Append the duplicate element to the current playlist
  appendToCurrentPlaylist();

  appendToCurrentPlaylist();
  newAddedSong.addEventListener("click", () => {
    renderCurrentSong(song.id);
    playSong(song);
  });
}

function appendToCurrentPlaylist() {
  currentPlaylistSongs.forEach((song) => {
    currentPlaylist.appendChild(song);
    song.addEventListener("click", () => {
      renderCurrentSong(song.id);
      playSong(song);
    });
  });
}

allPlaylistsHeader.addEventListener("click", () => {
  playlistParent.forEach((parentDiv) => {
    if (parentDiv.style.display === "block" || parentDiv.style.display === "") {
      parentDiv.style.display = "none";
    } else {
      parentDiv.style.display = "block";
    }
  });
});

// search song functionality
let found = false;
searchButton.addEventListener("click", () => {
  const inputValue = searchInput.value.toLowerCase();
  displaySearchedSong.innerHTML = "";
  songs.forEach((song) => {
    if (song.name.toLowerCase() === inputValue) {
      found = true;
      const p = document.createElement("p");
      p.classList.add("filterd-songs", "text-white");
      p.textContent = `${song.name} - ${song.artist}`;
      displaySearchedSong.appendChild(p);
      p.addEventListener("click", () => {
        renderCurrentSong(song.id);
        playSong(song);
      });
      return;
    }
  });
  if (!found) {
    displaySearchedSong.innerHTML = `<p class="filterd-songs text-white">No Match Found for ${searchInput.value}!</p>`;
    searchInput.value = "";
  }
});
