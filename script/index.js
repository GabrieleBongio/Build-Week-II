import { Key } from "../token.js";
import { casualLibrary, arrayEstate2023 } from "./libreria.js";
const Host = "deezerdevs-deezer.p.rapidapi.com";
const URL = "https://deezerdevs-deezer.p.rapidapi.com/";

const functionGrigliaSuperiore = (library) => {
  const buongiorno = library.slice(0, 6);
  const grigliaSuperiore = document.querySelector("#grigliaSuperiore");
  grigliaSuperiore.innerHTML = "";
  buongiorno.forEach((element) => {
    if (element.type == "artist") {
      grigliaSuperiore.innerHTML += ` 
          <div class="col-12 col-sm-6 col-lg-4 p-1">
            <a class="text-decoration-none " href="artist.html?artistId=${element.id}">
              <div class="rounded-2 bg-secondary overflow-hidden gSup">
                <div class="row align-items-center">
                  <div class="col-3">
                    <img src="${element.picture}" class="img-fluid rounded-circle" />
                  </div>
                  <div class="col-9">
                    <p class="fw-bold text-white m-0 limite-righe-1 underline-hover">${element.name}</p>
                  </div>
                </div>
              </div>
            </a>
          </div>`;
    } else if (element.type == "playlist") {
      grigliaSuperiore.innerHTML += `
          <div class="col-12 col-sm-6 col-lg-4 p-1">
            <a class="text-decoration-none" href="#">
              <div class="rounded-2 bg-secondary overflow-hidden gSup">
                <div class="row align-items-center">
                  <div class="col-3">
                    <img src="${element.picture}" class="img-fluid" />
                  </div>
                  <div class="col-9">
                    <p class="fw-bold text-white m-0 limite-righe-1 underline-hover">${element.title}</p>
                  </div>
                </div>
              </div>
            </a>
          </div>`;
    } else if (element.type == "album") {
      grigliaSuperiore.innerHTML += `
          <div class="col-12 col-sm-6 col-lg-4 p-1">
            <a class="text-decoration-none" href="album.html?albumId=${element.id}">
              <div class="rounded-2 bg-secondary overflow-hidden">
                <div class="row align-items-center">
                  <div class="col-3">
                    <img src="${element.cover}" class="img-fluid" />
                  </div>
                  <div class="col-9">
                    <p class="fw-bold text-white m-0 limite-righe-1 underline-hover">${element.title}</p>
                  </div>
                </div>
              </div>
            </a>
          </div>`;
    }
  });
};

const functionAscoltateDiRecente = (library) => {
  const arrayAscoltateDiRecente = library.slice(7, 13);
  console.log(arrayAscoltateDiRecente);
  const ascoltateDiRecente = document.querySelectorAll(".ascoltateDiRecente");
  for (let i = 0; i < arrayAscoltateDiRecente.length; i++) {
    ascoltateDiRecente[i].innerHTML = "";
    if (arrayAscoltateDiRecente[i].type == "artist") {
      ascoltateDiRecente[i].innerHTML += `
          <a class="text-decoration-none" href="artist.html?artistId=${arrayAscoltateDiRecente[i].id}">
            <img src="${arrayAscoltateDiRecente[i].picture}" class="img-fluid rounded-pill mb-3 text-center" />
            <p class="fw-bold text-white m-0 limite-righe-1 underline-hover">${arrayAscoltateDiRecente[i].name}</p>
            <p class="text-white m-0 limite-righe-1">Artista</p>
          </a>`;
    } else if (arrayAscoltateDiRecente[i].type == "playlist") {
      ascoltateDiRecente[i].innerHTML += `
          <a class="text-decoration-none" href="#">
            <img src="${arrayAscoltateDiRecente[i].picture}" class="img-fluid rounded-2 mb-3" />
            <p class="fw-bold text-white m-0 limite-righe-1 underline-hover">${arrayAscoltateDiRecente[i].title}</p>
            <p class="text-white m-0 limite-righe-1 ">${arrayAscoltateDiRecente[i].nb_tracks} brani</p>
          </a>`;
    } else if (arrayAscoltateDiRecente[i].type == "album") {
      ascoltateDiRecente[i].innerHTML += `
          <a class="text-decoration-none" href="album.html?albumId=${arrayAscoltateDiRecente[i].id}">
            <img src="${arrayAscoltateDiRecente[i].cover}" class="img-fluid rounded-2 mb-3" />
            <p class="fw-bold text-white m-0 limite-righe-1 underline-hover">${arrayAscoltateDiRecente[i].title}</p>
            <p class="text-white m-0 limite-righe-1 underline-hover">${arrayAscoltateDiRecente[i].artist.name}</p>
          </a>`;
    }
  }
};

const functionAlbum = (library) => {
  const arrayAlbum = library
    .filter((element) => {
      return element.type == "album";
    })
    .slice(0, 6);
  console.log(arrayAlbum);
  const albumTop = document.querySelectorAll(".albumTop");
  for (let i = 0; i < arrayAlbum.length; i++) {
    albumTop[i].innerHTML = `
        <a class="text-decoration-none" href="album.html?albumId=${arrayAlbum[i].id}">
          <img src="${arrayAlbum[i].cover}" class="img-fluid rounded-2 mb-3" />
          <p class="fw-bold text-white m-0 limite-righe-1 underline-hover">${arrayAlbum[i].title}</p>
          <p class="text-white m-0 limite-righe-1 underline-hover">${arrayAlbum[i].artist.name}</p>
        </a>`;
  }
};

const functionArtist = (library) => {
  const arrayArtist = library
    .filter((element) => {
      return element.type == "artist";
    })
    .slice(0, 6);
  console.log(arrayArtist);
  const artistTop = document.querySelectorAll(".artistTop");
  for (let i = 0; i < arrayArtist.length; i++) {
    artistTop[i].innerHTML = `
        <a class="text-decoration-none" href="artist.html?artistId=${arrayArtist[i].id}">
          <img src="${arrayArtist[i].picture}" class="img-fluid rounded-pill mb-3" />
          <p class="fw-bold text-white m-0 limite-righe-1 underline-hover">${arrayArtist[i].name}</p>
        </a>`;
  }
};

const functionPlaylist = (library) => {
  const arrayPlaylist = library
    .filter((element) => {
      return element.type == "playlist";
    })
    .slice(0, 6);
  console.log(arrayPlaylist);
  const playlistTop = document.querySelectorAll(".playlistTop");
  for (let i = 0; i < arrayPlaylist.length; i++) {
    playlistTop[i].innerHTML = `
        <a class="text-decoration-none" href="#">
          <img src="${arrayPlaylist[i].picture}" class="img-fluid rounded-pill mb-3" />
          <p class="fw-bold text-white m-0 limite-righe-1 underline-hover">${arrayPlaylist[i].title}</p>
          <p class="text-white m-0 limite-righe-1">${arrayPlaylist[i].nb_tracks} brani</p>
        </a>`;
  }
};

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
                <p class="text-white m-0 limite-righe-1 underline-hover ">${elem.name}</p>
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
  functionGrigliaSuperiore(myLibrary);
  functionAscoltateDiRecente(myLibrary);
  functionAlbum(myLibrary);
  functionArtist(myLibrary);
  functionPlaylist(myLibrary);
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
      functionGrigliaSuperiore(resultsArray);
      functionAscoltateDiRecente(resultsArray);
      functionAlbum(resultsArray);
      functionArtist(resultsArray);
      functionPlaylist(resultsArray);
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

const functionEstate2023 = (arrayEstate2023) => {
  const Estate2023Top = document.querySelectorAll(".Estate2023Top");
  for (let i = 0; i < arrayEstate2023.length; i++) {
    Estate2023Top[i].innerHTML = `
        <a class="text-decoration-none" href="#">
          <img src="${arrayEstate2023[i].picture}" class="img-fluid rounded-2 mb-3" />
          <p class="fw-bold text-white m-0 limite-righe-1 underline-hover">${arrayEstate2023[i].title}</p>
          <p class="text-white m-0 limite-righe-1">${arrayEstate2023[i].nb_tracks} brani</p>
        </a>`;
  }
};

if (localStorage.getItem("Estate2023")) {
  const arrayEstate2023fetched = JSON.parse(localStorage.getItem("Estate2023"));
  functionEstate2023(arrayEstate2023fetched);
} else {
  const fetchesEstate2023 = [];
  const resultEstate2023 = [];

  for (let i = 0; i < arrayEstate2023.length; i++) {
    fetchesEstate2023[i] = fetch(URL + "playlist/" + arrayEstate2023[i].id, {
      headers: { "X-RapidAPI-Key": Key, "X-RapidAPI-Host": Host },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore");
      }
    });
  }

  Promise.allSettled(fetchesEstate2023)
    .then((results) => results.forEach((result) => resultEstate2023.push(result.value)))
    .then(() => console.log(resultEstate2023))
    .then(() => localStorage.setItem("Estate2023", JSON.stringify(resultEstate2023)))
    .then(() => functionEstate2023(resultEstate2023));
}

//const functionGrigliaSuperiore = () => {
//  const buongiorno = casualLibrary.slice(0, 6);
//  console.log(buongiorno);
//  const grigliaSuperiore = document.querySelector("#grigliaSuperiore");
//  grigliaSuperiore.innerHTML = "";
//  buongiorno.forEach((element) => {
//    fetch(URL + element.type + "/" + element.id, {
//      headers: { "X-RapidAPI-Key": Key, "X-RapidAPI-Host": Host },
//    })
//      .then((resp) => {
//        if (resp.ok) {
//          console.log();
//          return resp.json();
//        } else {
//          throw new Error("Errore");
//        }
//      })
//      .then((obj) => {
//        if (obj.type == "artist") {
//          grigliaSuperiore.innerHTML += `
//          <div class="col-12 col-sm-6 col-lg-4 p-1">
//          <a class="text-decoration-none" href="artist.html?artistId=${obj.id}">
//            <div class="rounded-2 bg-secondary overflow-hidden">
//              <div class="row align-items-center">
//                <div class="col-3">
//                  <img src="${obj.picture}" class="img-fluid rounded-circle" />
//                </div>
//                <div class="col-9">
//                  <p class="fw-bold text-white m-0">${obj.name}</p>
//                </div>
//              </div>
//            </div></a>
//          </div>`;
//        } else if (obj.type == "playlist") {
//          grigliaSuperiore.innerHTML += `<div class="col-12 col-sm-6 col-lg-4 p-1">
//          <a class="text-decoration-none" href="#">
//            <div class="rounded-2 bg-secondary overflow-hidden">
//              <div class="row align-items-center">
//                <div class="col-3">
//                  <img src="${obj.picture}" class="img-fluid" />
//                </div>
//                <div class="col-9">
//                  <p class="fw-bold text-white m-0">${obj.title}</p>
//                </div>
//              </div>
//            </div></a>
//          </div>`;
//        } else if (obj.type == "album") {
//          grigliaSuperiore.innerHTML += `<div class="col-12 col-sm-6 col-lg-4 p-1">
//          <a class="text-decoration-none" href="album.html?albumId=${obj.id}">
//            <div class="rounded-2 bg-secondary overflow-hidden">
//              <div class="row align-items-center">
//                <div class="col-3">
//                  <img src="${obj.cover}" class="img-fluid" />
//                </div>
//                <div class="col-9">
//                  <p class="fw-bold text-white m-0">${obj.title}</p>
//                </div>
//              </div>
//            </div></a>
//          </div>`;
//        }
//      })
//      .catch((error) => console.log(error));
//  });
//};
//
//const functionAscoltateDiRecente = () => {
//  const arrayAscoltateDiRecente = casualLibrary.slice(7, 13);
//  console.log(arrayAscoltateDiRecente);
//  const ascoltateDiRecente = document.querySelectorAll(".ascoltateDiRecente");
//  for (let i = 0; i < arrayAscoltateDiRecente.length; i++) {
//    ascoltateDiRecente[i].innerHTML = "";
//    fetch(URL + arrayAscoltateDiRecente[i].type + "/" + arrayAscoltateDiRecente[i].id, {
//      headers: { "X-RapidAPI-Key": Key, "X-RapidAPI-Host": Host },
//    })
//      .then((resp) => {
//        if (resp.ok) {
//          return resp.json();
//        } else {
//          throw new Error("Errore");
//        }
//      })
//      .then((obj) => {
//        if (obj.type == "artist") {
//          ascoltateDiRecente[i].innerHTML += `<a class="text-decoration-none" href="artist.html?artistId=${obj.id}">
//          <img src="${obj.picture}" class="img-fluid rounded-pill mb-3" />
//            <p class="fw-bold text-white m-0">${obj.name}</p>
//            <p class="text-white m-0">Artista</p>
//            </a>
//            `;
//        } else if (obj.type == "playlist") {
//          ascoltateDiRecente[i].innerHTML += `<a class="text-decoration-none" href="#">
//          <img src="${obj.picture}" class="img-fluid rounded-2 mb-3" />
//            <p class="fw-bold text-white m-0">${obj.title}</p>
//            <p class="text-white m-0">${obj.nb_tracks} brani</p>
//            </a>
//            `;
//        } else if (obj.type == "album") {
//          ascoltateDiRecente[i].innerHTML += `<a class="text-decoration-none" href="album.html?albumId=${obj.id}">
//          <img src="${obj.cover}" class="img-fluid rounded-2 mb-3" />
//            <p class="fw-bold text-white m-0">${obj.title}</p>
//            <p class="text-white m-0">${obj.artist.name}</p>
//            </a>
//            `;
//        }
//      });
//  }
//};
//
//const functionAlbum = () => {
//  const arrayAlbum = casualLibrary
//    .filter((element) => {
//      return element.type == "album";
//    })
//    .slice(0, 6);
//  console.log(arrayAlbum);
//  const albumTop = document.querySelectorAll(".albumTop");
//  for (let i = 0; i < arrayAlbum.length; i++) {
//    albumTop[i].innerHTML = "";
//    fetch(URL + arrayAlbum[i].type + "/" + arrayAlbum[i].id, {
//      headers: { "X-RapidAPI-Key": Key, "X-RapidAPI-Host": Host },
//    })
//      .then((resp) => {
//        if (resp.ok) {
//          return resp.json();
//        } else {
//          throw new Error("Errore");
//        }
//      })
//      .then((obj) => {
//        albumTop[i].innerHTML += `<a class="text-decoration-none" href="album.html?albumId=${obj.id}">
//        <img src="${obj.cover}" class="img-fluid rounded-2 mb-3" />
//            <p class="fw-bold text-white m-0">${obj.title}</p>
//            <p class="text-white m-0">${obj.artist.name}</p>
//            </a>
//            `;
//      });
//  }
//};
//
//const functionArtist = () => {
//  const arrayArtist = casualLibrary
//    .filter((element) => {
//      return element.type == "artist";
//    })
//    .slice(0, 6);
//  console.log(arrayArtist);
//  const artistTop = document.querySelectorAll(".artistTop");
//  for (let i = 0; i < arrayArtist.length; i++) {
//    artistTop[i].innerHTML = "";
//    fetch(URL + arrayArtist[i].type + "/" + arrayArtist[i].id, {
//      headers: { "X-RapidAPI-Key": Key, "X-RapidAPI-Host": Host },
//    })
//      .then((resp) => {
//        if (resp.ok) {
//          return resp.json();
//        } else {
//          throw new Error("Errore");
//        }
//      })
//      .then((obj) => {
//        artistTop[i].innerHTML += `<a class="text-decoration-none" href="artist.html?artistId=${obj.id}">
//        <img src="${obj.picture}" class="img-fluid rounded-pill mb-3" />
//            <p class="fw-bold text-white m-0">${obj.name}</p>
//            </a>
//            `;
//      });
//  }
//};
//
//const functionPlaylist = () => {
//  const arrayPlaylist = casualLibrary
//    .filter((element) => {
//      return element.type == "playlist";
//    })
//    .slice(0, 6);
//  console.log(arrayPlaylist);
//  const playlistTop = document.querySelectorAll(".playlistTop");
//  for (let i = 0; i < arrayPlaylist.length; i++) {
//    playlistTop[i].innerHTML = "";
//    fetch(URL + arrayPlaylist[i].type + "/" + arrayPlaylist[i].id, {
//      headers: { "X-RapidAPI-Key": Key, "X-RapidAPI-Host": Host },
//    })
//      .then((resp) => {
//        if (resp.ok) {
//          return resp.json();
//        } else {
//          throw new Error("Errore");
//        }
//      })
//      .then((obj) => {
//        playlistTop[i].innerHTML += `<a class="text-decoration-none" href="#">
//        <img src="${obj.picture}" class="img-fluid rounded-pill mb-3" />
//            <p class="fw-bold text-white m-0">${obj.title}</p>
//            <p class="text-white m-0">${obj.nb_tracks} brani</p>
//            </a>
//            `;
//      });
//  }
//};
//
//const functionLaMiaLibreria = () => {
//  casualLibrary.forEach((elem) => {
//    const URL = "https://deezerdevs-deezer.p.rapidapi.com/" + elem.type + "/" + elem.id;
//    fetch(URL, { headers: { "X-RapidAPI-Key": Key, "X-RapidAPI-Host": Host } })
//      .then((resp) => {
//        if (resp.ok) {
//          return resp.json();
//        } else {
//          throw new Error("Errore");
//        }
//      })
//      .then((array) => {
//        if (array.type === "artist") {
//          document.querySelector("#laMiaLibreria").innerHTML += `<div class="row align-items-center g-2 mb-3">
//          <div class="col-3">
//            <img src=${array.picture} class="img-fluid rounded-pill" />
//          </div>
//          <div class="col-9">
//            <p class="text-white m-0" style="display: -webkit-box;
//    -webkit-box-orient: vertical;
//    -webkit-line-clamp: 1;
//    overflow: hidden;">${array.name}</p>
//            <p class="fw-normal text-white m-0" style="display: -webkit-box;
//    -webkit-box-orient: vertical;
//    -webkit-line-clamp: 1;
//    overflow: hidden;">Artista</p>
//          </div></a>
//        </div>`;
//        } else if (array.type === "album") {
//          document.querySelector("#laMiaLibreria").innerHTML += `<div class="row align-items-center g-2 mb-3">
//          <a class="text-decoration-none" href="album.html?albumId=${obj.id}">
//            <div class="col-3">
//              <img src=${array.cover} class="img-fluid" />
//            </div>
//            <div class="col-9">
//              <p class="text-white m-0" style="display: -webkit-box;
//    -webkit-box-orient: vertical;
//    -webkit-line-clamp: 1;
//    overflow: hidden;">${array.title}</p>
//              <p class="fw-normal text-white m-0" style="display: -webkit-box;
//    -webkit-box-orient: vertical;
//    -webkit-line-clamp: 1;
//    overflow: hidden;">Album - ${array.artist.name}</p>
//            </div></a>
//          </div>`;
//        } else if (array.type === "playlist") {
//          document.querySelector("#laMiaLibreria").innerHTML += `<div class="row align-items-center g-2 mb-3">
//          <a class="text-decoration-none" href="#">
//            <div class="col-3">
//              <img src=${array.picture} class="img-fluid" />
//            </div>
//            <div class="col-9">
//              <p class="text-white m-0" style="display: -webkit-box;
//    -webkit-box-orient: vertical;
//    -webkit-line-clamp: 1;
//    overflow: hidden;">${array.title}</p>
//              <p class="fw-normal text-white m-0" style="display: -webkit-box;
//    -webkit-box-orient: vertical;
//    -webkit-line-clamp: 1;
//    overflow: hidden;">Playlist - ${array.nb_tracks} brani</p>
//            </div>
//          </div>`;
//        }
//      });
//  });
//};
//

//functionGrigliaSuperiore();
//functionAscoltateDiRecente();
//functionAlbum();
//functionArtist();
//functionPlaylist();
//functionEstate2023();
//functionSong();
//functionLaMiaLibreria();
