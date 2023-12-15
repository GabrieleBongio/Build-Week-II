import { Key } from "../token.js";
import { casualLibrary } from "./libreria.js";

const Host = "deezerdevs-deezer.p.rapidapi.com";
const URL = "https://deezerdevs-deezer.p.rapidapi.com/";

const params = new URLSearchParams(window.location.search);
const artistId = params.get("artistId");

fetch(URL + "artist/" + artistId, {
  headers: { "X-RapidAPI-Key": Key, "X-RapidAPI-Host": Host },
})
  .then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error("Errore");
    }
  })
  .then((obj) => {
    const copertinaArtista = document.getElementById("copertinaArtista");
    copertinaArtista.setAttribute(
      "style",
      ` background-image: url(${obj.picture_xl});
    height: 400px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;`
    );
    console.log(obj);
    const nomeArtista = document.getElementById("nomeArtista");
    const ascoltatoriMensili = document.getElementById("ascoltatoriMensili");
    nomeArtista.innerHTML = obj.name;
    ascoltatoriMensili.innerHTML = "Ascoltatori mensili: " + obj.nb_fan;

    fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistId + "/top?limit=16")
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Errore");
        }
      })
      .then((resp) => {
        const listaCanzoni = document.getElementById("listaCanzoni");
        listaCanzoni.innerHTML = "";
        let i = 1;
        resp.data.forEach((element) => {
          listaCanzoni.innerHTML += ` 

          <div class="col-12">
          <div class="row gSup4 p-1 rounded-3">
          <div class="col-8 d-flex gap-3 align-items-center justify-content-between   rounded-3">
           <div class="d-flex gap-3 align-items-center">
            <p class="text-dark-emphasis m-0">${i}</p>
            <a id="${element.id}" class="text-decoration-none canzone" href= "#"><img src="${
            element.album.cover
          }" alt="" style="width: 45px"/></a>
            <a id="${
              element.id
            }" class="text-decoration-none canzone" href="#"><p class="m-0 text-white limite-righe-1 underline-hover">${
            element.title
          }</p></a>
          </div>
          <div class="d-flex">
            <p class="m-0 ">${element.rank}</p>
          </div>
        </div>
        <div class="col-4 d-flex justify-content-end align-items-center gap-4 pe-5 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="#ffffff"
            class="bi bi-heart m-0"
            viewBox="0 0 16 16"
            style="margin-top: -3px"
          >
            <path
              d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
            />
          </svg>
          <p class="text-white-50 m-0">${Math.floor(element.duration / 60)}:${
            element.duration % 60 < 10 ? "0" + (element.duration % 60) : element.duration % 60
          }</p>
        </div>
        </div>
        </div>`;
          i++;
        });
        console.log(resp.data);
        const canzoni = document.querySelectorAll(".canzone");
        const arrayCanzoni = Array.from(canzoni);
        arrayCanzoni.forEach((a) => {
          a.addEventListener("click", (event) => {
            event.preventDefault();
            functionSong(event.target.parentElement.id);
          });
        });
      });
  });

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
          <div class="col-3">
            <img src="${song.album.cover}" class="img-fluid" />
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
      songDuration.innerHTML = `${Math.floor(song.duration / 60)}:${song.duration % 60}`;
      const songDetailsSm = document.querySelector("#songDetailsSm");
      songDetailsSm.innerHTML = `
          <div class="col-3">
            <img src="${song.album.cover}" class="img-fluid rounded-2" />
          </div>
          <div class="col-5">
            <div>
              <p class="fw-bold m-0 limite-righe-1 text-white">${song.title}</p>
              <p class="text-white opacity-75 m-0 limite-righe-1">${song.artist.name}</p>
              <audio src="${song.preview}"></audio>
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
          </div>
          `;
      const audio = document.querySelector("#audio");
      audio.play();
      document.querySelector("#playButton").classList.add("d-none");
      document.querySelector("#pauseButton").classList.remove("d-none");
    });
};

document.querySelector("#playButton").addEventListener("click", (event) => {
  document.querySelector("#playButton").classList.add("d-none");
  document.querySelector("#pauseButton").classList.remove("d-none");
  const audio = document.querySelector("#audio");
  console.log(audio);
  if (audio.classList == "play") {
    audio.classList = "pause";
    audio.pause();
  } else {
    audio.classList = "play";
    audio.play();
  }
});

document.querySelector("#pauseButton").addEventListener("click", (event) => {
  document.querySelector("#pauseButton").classList.add("d-none");
  document.querySelector("#playButton").classList.remove("d-none");
  const audio = document.querySelector("#audio");
  console.log(audio);
  if (audio.classList == "play") {
    audio.classList = "pause";
    audio.pause();
  } else {
    audio.classList = "play";
    audio.play();
  }
});

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
