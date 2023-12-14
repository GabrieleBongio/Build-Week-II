import { Key, casualLibrary } from "../token.js";

const Host = "deezerdevs-deezer.p.rapidapi.com";
const URL = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";

const searchInput = document.getElementById("searchInput");
const searchInputMobile = document.getElementById("searchInputMobile");
const resultsContainer = document.getElementById("searchResults");

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value;
  if (searchTerm.trim() !== "") {
    searchFunction(searchTerm);
  } else {
    clearResults();
  }
});

searchInputMobile.addEventListener("input", function () {
  const searchTerm = searchInputMobile.value;
  console.log("ciao");
  if (searchTerm.trim() !== "") {
    searchFunction(searchTerm);
  } else {
    clearResults();
  }
});

function searchFunction(searchTerm) {
  fetchResultsFromAPI(searchTerm)
    .then(displayResults)
    .catch((error) => console.error("Si è verificato un errore durante la ricerca:", error));
}

function fetchResultsFromAPI(searchTerm) {
  const apiUrl = URL + searchTerm;
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
    <a class="text-decoration-none" href="#">
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
}

function clearResults() {
  resultsContainer.innerHTML = "";
}

// Funzione per il popolamento dinamico della barra laterale sinistra
/*
casualLibrary.forEach((elem) => {
  const URL = "https://deezerdevs-deezer.p.rapidapi.com/" + elem.type + "/" + elem.id;
  fetch(URL, { headers: { "X-RapidAPI-Key": Key, "X-RapidAPI-Host": Host } })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore");
      }
    })
    .then((array) => {
      if (array.type === "artist") {
        document.querySelector("#laMiaLibreria").innerHTML += `<div class="row align-items-center g-2 mb-3">
            <div class="col-3">
              <img src=${array.picture} class="img-fluid rounded-pill" />
            </div>
            <div class="col-9">
              <p class="text-white m-0" style="display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;">${array.name}</p>
              <p class="fw-normal text-white m-0" style="display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;">Artista</p>
            </div>
          </div>`;
      } else if (array.type === "album") {
        document.querySelector("#laMiaLibreria").innerHTML += `<div class="row align-items-center g-2 mb-3">
              <div class="col-3">
                <img src=${array.cover} class="img-fluid" />
              </div>
              <div class="col-9">
                <p class="text-white m-0" style="display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;">${array.title}</p>
                <p class="fw-normal text-white m-0" style="display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;">Album - ${array.artist.name}</p>
              </div>
            </div>`;
      } else if (array.type === "playlist") {
        document.querySelector("#laMiaLibreria").innerHTML += `<div class="row align-items-center g-2 mb-3">
              <div class="col-3">
                <img src=${array.picture} class="img-fluid" />
              </div>
              <div class="col-9">
                <p class="text-white m-0" style="display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;">${array.title}</p>
                <p class="fw-normal text-white m-0" style="display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;">Playlist - ${array.nb_tracks} brani</p>
              </div>
            </div>`;
      }
    });
});
*/
