import { Key } from "../token.js";
import { casualLibrary } from "./libreria.js";

const Host = "deezerdevs-deezer.p.rapidapi.com";
const URL = "https://deezerdevs-deezer.p.rapidapi.com/";

const searchInput = document.getElementById("searchInput");
const searchInputMobile = document.getElementById("searchInputMobile");
const resultsContainer = document.getElementById("searchResults");

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value;
  if (searchTerm.trim() !== "") {
    searchFunction(searchTerm);
  } else {
    clearResults();
    setTimeout(clearResults, 500);
  }
});

searchInputMobile.addEventListener("input", function () {
  const searchTerm = searchInputMobile.value;
  console.log("ciao");
  if (searchTerm.trim() !== "") {
    searchFunction(searchTerm);
  } else {
    clearResults();
    setTimeout(clearResults, 500);
  }
});

function searchFunction(searchTerm) {
  fetchResultsFromAPI(searchTerm)
    .then(displayResults)
    .catch((error) => console.error("Si è verificato un errore durante la ricerca:", error));
}

function fetchResultsFromAPI(searchTerm) {
  const apiUrl = URL + "search?q=" + searchTerm;
  return fetch(apiUrl, { headers: { "X-RapidAPI-Key": Key, "X-RapidAPI-Host": Host } })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => data.data)
    .catch((error) => {
      console.error("Errore durante la chiamata API:", error);
      throw error;
    });
}

function displayResults(results) {
  resultsContainer.innerHTML = ""; // Pulisce i risultati precedenti

  if (!results || results.length === 0) {
    resultsContainer.innerHTML = "Nessun risultato trovato.";
    return;
  }

  results.forEach((result) => {
    resultsContainer.innerHTML += `
    
    <div class="row align-items-center justify-content-center rounded-2 mt-5 mb-5" >
    <div class="col-3">
    <a class="text-decoration-none canzone" href="#" id="${result.id}">
    <img class="img-fluid rounded-2 shadow-lg" src="${result.album.cover}" alt="img" /></a>
    </div>
    <div class="col-6"><h3>${result.title}</h3>
    <a class="text-decoration-none" href="./artist.html?artistId=${result.artist.id}" >
    <h5 class="text-secondary">${result.artist.name}</h5></a></div>
     <div class="col-1">${Math.floor(result.duration / 60)}:${
      result.duration % 60 < 10 ? "0" + (result.duration % 60) : result.duration % 60
    }</div>
    </div>`;
  });
  const canzoni = document.querySelectorAll(".canzone");
  const arrayCanzoni = Array.from(canzoni);
  arrayCanzoni.forEach((a) => {
    a.addEventListener("click", (event) => {
      event.preventDefault();
      functionSong(event.target.parentElement.id);
    });
  });
}

function clearResults() {
  resultsContainer.innerHTML = "";
}

// Funzione per il popolamento dinamico della barra laterale sinistra
//
//
//
//

const functionLaMiaLibreria = (library) => {
  document.querySelector("#laMiaLibreria").innerHTML = "";
  library.forEach((elem) => {
    if (elem.type === "artist") {
      document.querySelector("#laMiaLibreria").innerHTML += `
          <div class="row align-items-center g-2 mb-3 gSup2">
            <div class="col-3">
              <a class="text-decoration-none" href="artist.html?artistId=${elem.id}">
                <img src=${elem.picture} class="img-fluid rounded-pill" />
              </a>
            </div>
            <div class="col-9">
              <a class="text-decoration-none" href="artist.html?artistId=${elem.id}">
                <p class="text-white m-0 limite-righe-1 underline-hover">${elem.name}</p>
                <p class="fw-normal text-white m-0 limite-righe-1">Artista</p>
              </a>
            </div>
          </div>`;
    } else if (elem.type === "album") {
      document.querySelector("#laMiaLibreria").innerHTML += `
          <div class="row align-items-center g-2 mb-3 gSup2">
            <div class="col-3">
              <a class="text-decoration-none" href="album.html?albumId=${elem.id}">      
                <img src=${elem.cover} class="img-fluid" />
              </a>
            </div>
            <div class="col-9">
              <a class="text-decoration-none" href="album.html?albumId=${elem.id}">      
                <p class="text-white m-0 limite-righe-1 underline-hover">${elem.title}</p>
                <p class="fw-normal text-white m-0 limite-righe-1 underline-hover">Album - ${elem.artist.name}</p>
              </a>
            </div>
          </div>`;
    } else if (elem.type === "playlist") {
      document.querySelector("#laMiaLibreria").innerHTML += `
          <div class="row align-items-center g-2 mb-3 gSup2">
            <div class="col-3">
              <a class="text-decoration-none" href="#">
                <img src=${elem.picture} class="img-fluid" />
              </a>
            </div>
            <div class="col-9">
              <a class="text-decoration-none" href="#">
                <p class="text-white m-0 limite-righe-1 underline-hover">${elem.title}</p>
                <p class="fw-normal text-white m-0 limite-righe-1">Playlist - ${elem.nb_tracks} brani</p>
              </a>
            </div>
          </div>`;
    }
  });
};

if (localStorage.getItem("library")) {
  const myLibrary = JSON.parse(localStorage.getItem("library"));
  functionLaMiaLibreria(myLibrary);
} else {
  const fetches = [];
  const resultsArray = [];

  for (let i = 0; i < casualLibrary.length; i++) {
    fetches[i] = fetch(URL + casualLibrary[i].type + "/" + casualLibrary[i].id, {
      headers: { "X-RapidAPI-Key": Key, "X-RapidAPI-Host": Host },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore");
      }
    });
  }

  Promise.allSettled(fetches)
    .then((results) => results.forEach((result) => resultsArray.push(result.value)))
    .then(() => console.log(resultsArray))
    .then(() => localStorage.setItem("library", JSON.stringify(resultsArray)))
    .then(() => {
      functionLaMiaLibreria(resultsArray);
    });
}

const functionSong = (id) => {
  fetch(URL + "track/" + id, {
    headers: { "X-RapidAPI-Key": Key, "X-RapidAPI-Host": Host },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore");
      }
    })
    .then((song) => {
      console.log(song);
      const songDetails = document.querySelector("#songDetails");
      songDetails.innerHTML = `
          <div class="col-3 text-center">
            <img src="${song.album.cover}" style="max-height: 60px"/>
          </div>
          <div class="col-9">
            <div class="d-flex align-items-center">
              <div>
                <p class="fw-bold m-0 limite-righe-1 text-white">${song.title}</p>
                <p class="text-white opacity-75 m-0 limite-righe-1">${song.artist.name}</p>
                <audio src="${song.preview}" id="audio" class="play"></audio>
              </div>
              <div class="ms-3">
                <svg
                  data-encore-id="icon"
                  role="img"
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  fill="#ffffff"
                  class="Svg-sc-ytk21e-0 kPpCsU"
                  style="width: 16px"
                >
                  <path
                    d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          `;
      const songDuration = document.querySelector("#songDuration");
      songDuration.innerHTML = `${Math.floor(song.duration / 60)}:${
        song.duration % 60 < 10 ? "0" + (song.duration % 60) : song.duration % 60
      }`;
      const songDetailsSm = document.querySelector("#songDetailsSm");
      songDetailsSm.innerHTML = `
          <div class="col-3">
            <img src="${song.album.cover}" class="img-fluid rounded-2" />
          </div>
          <div class="col-5">
            <div>
              <p class="fw-bold m-0 limite-righe-1 text-white">${song.title}</p>
              <p class="text-white opacity-75 m-0 limite-righe-1">${song.artist.name}</p>
            </div>
          </div>
          <div class="col-2 text-center">
            <svg
              data-encore-id="icon"
              role="img"
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="#ffffff"
              class="Svg-sc-ytk21e-0 kPpCsU"
              style="width: 20px"
            >
              <path
                d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z"
              ></path>
            </svg>
          </div>
          <div class="col-2 text-center">
            <button class="btn btn-dark py-1 px-2 border border-0 rounded-pill playButton">
              <svg
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                fill="#ffffff"
                viewBox="0 0 16 16"
                class="Svg-sc-ytk21e-0 kPpCsU"
                style="width: 20px; margin-top: -4px"
              >
                <path
                  d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"
                ></path>
              </svg>
            </button>
            <button class="btn btn-dark py-1 px-2 border border-0 rounded-pill d-none pauseButton">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#ffffff"
                class="bi bi-pause-fill"
                viewBox="0 0 16 16"
                style="width: 20px; margin-top: -4px"
              >
                <path
                  d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"
                />
              </svg>
            </button>
          </div>
          `;
      const audio = document.querySelector("#audio");
      audio.play();
      console.log(document.querySelectorAll(".pauseButton"));
      console.log(document.querySelectorAll(".playButton"));
      Array.from(document.querySelectorAll(".playButton")).forEach((btn) => btn.classList.add("d-none"));
      Array.from(document.querySelectorAll(".pauseButton")).forEach((btn) => btn.classList.remove("d-none"));
      Array.from(document.querySelectorAll(".playButton")).forEach((btn) => {
        console.log(btn);
        btn.removeEventListener("click", functionPlay);
        btn.addEventListener("click", functionPlay);
      });
      Array.from(document.querySelectorAll(".pauseButton")).forEach((btn) => {
        btn.removeEventListener("click", functionPause);
        btn.addEventListener("click", functionPause);
      });
    });
};

const functionPlay = () => {
  Array.from(document.querySelectorAll(".playButton")).forEach((btn) => btn.classList.add("d-none"));
  Array.from(document.querySelectorAll(".pauseButton")).forEach((btn) => btn.classList.remove("d-none"));
  const audio = document.querySelector("#audio");
  console.log(audio);
  if (audio.classList == "play") {
    audio.classList = "pause";
    audio.pause();
  } else {
    audio.classList = "play";
    audio.play();
  }
};

const functionPause = () => {
  Array.from(document.querySelectorAll(".playButton")).forEach((btn) => btn.classList.remove("d-none"));
  Array.from(document.querySelectorAll(".pauseButton")).forEach((btn) => btn.classList.add("d-none"));
  const audio = document.querySelector("#audio");
  console.log(audio);
  if (audio.classList == "play") {
    audio.classList = "pause";
    audio.pause();
  } else {
    audio.classList = "play";
    audio.play();
  }
};

const params = new URLSearchParams(window.location.search);
const songId = params.get("songId");

if (songId) {
  console.log(songId);
  functionSong(songId);
} else {
  console.log("no-song");
}

const functionFilter = (event) => {
  document.querySelector("#buttonReset").classList.remove("d-none");
  if (localStorage.getItem("library")) {
    const myLibrary = JSON.parse(localStorage.getItem("library"));
    const myLibraryFilter = myLibrary.filter((elem) => elem.type == event.target.innerHTML.toLowerCase());
    functionLaMiaLibreria(myLibraryFilter);
  } else {
    const fetches = [];
    const resultsArray = [];

    for (let i = 0; i < casualLibrary.length; i++) {
      fetches[i] = fetch(URL + casualLibrary[i].type + "/" + casualLibrary[i].id, {
        headers: { "X-RapidAPI-Key": Key, "X-RapidAPI-Host": Host },
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Errore");
        }
      });
    }

    Promise.allSettled(fetches)
      .then((results) => results.forEach((result) => resultsArray.push(result.value)))
      .then(() => console.log(resultsArray))
      .then(() => localStorage.setItem("library", JSON.stringify(resultsArray)))
      .then(() => {
        const myLibraryFilter = resultsArray.filter((elem) => elem.type == event.target.innerHTML.toLowerCase());
        functionLaMiaLibreria(myLibraryFilter);
      });
  }
};

const functionReset = (event) => {
  event.target.classList.add("d-none");

  if (localStorage.getItem("library")) {
    const myLibrary = JSON.parse(localStorage.getItem("library"));
    functionLaMiaLibreria(myLibrary);
  } else {
    const fetches = [];
    const resultsArray = [];

    for (let i = 0; i < casualLibrary.length; i++) {
      fetches[i] = fetch(URL + casualLibrary[i].type + "/" + casualLibrary[i].id, {
        headers: { "X-RapidAPI-Key": Key, "X-RapidAPI-Host": Host },
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Errore");
        }
      });
    }

    Promise.allSettled(fetches)
      .then((results) => results.forEach((result) => resultsArray.push(result.value)))
      .then(() => console.log(resultsArray))
      .then(() => localStorage.setItem("library", JSON.stringify(resultsArray)))
      .then(() => {
        functionLaMiaLibreria(resultsArray);
      });
  }
};

document.querySelector("#buttonAlbum").addEventListener("click", (event) => {
  functionFilter(event);
});
document.querySelector("#buttonArtist").addEventListener("click", (event) => {
  functionFilter(event);
});
document.querySelector("#buttonPlaylist").addEventListener("click", (event) => {
  functionFilter(event);
});
document.querySelector("#buttonReset").addEventListener("click", (event) => {
  functionReset(event);
});
