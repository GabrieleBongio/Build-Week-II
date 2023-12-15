import { Key } from "../token.js";
import { casualLibrary } from "./libreria.js";

const Host = "deezerdevs-deezer.p.rapidapi.com";
const URL = "https://deezerdevs-deezer.p.rapidapi.com/";

// code for extracting color from picture
function getColorFromImage(imageUrl, x = 50, y = 50, callback) {
  var img = new Image();

  img.crossOrigin = "Anonymous";

  img.src = imageUrl;

  img.onload = function () {
    var canvas = document.createElement("canvas");

    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0);

    var imageData = ctx.getImageData(x, y, 1, 1).data;

    var color = {
      r: imageData[0],
      g: imageData[1],
      b: imageData[2],
      a: imageData[3] / 255,
    };

    callback(color);
  };
}

const params = new URLSearchParams(window.location.search); // oggetto costruito a partire dai parametri nella URL es. ?resourceId=2938123
// per renderlo dinamico
console.log(params);
const id = params.get("albumId");
// const id = 381445657;

fetch(URL + "album/" + id, {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": Key,
    "X-RapidAPI-Host": Host,
  },
})
  .then((response) => response.json())
  .then((albumInfo) => {
    console.log(albumInfo);
    const albumHeader = document.querySelector("#albumHeader");
    let albumHeaderHTML = "";

    albumHeaderHTML += `<div class="container-fluid">
    <div class="row align-items-end justify-content-center">
      <div class="col-10 mb-4 col-md-4 mb-md-0 text-center">
        <div>
          <img src="${albumInfo.cover_medium}" alt="albumImg" class="img-fluid rounded-2 coverImg" />
        </div>
      </div>
      <div class="col-12 col-md-8">
        <div class="container">
          <div class="row">
            <div class="col p-0">
              <p class="d-none d-md-none- d-lg-flex text-light p-1 mb-1">Album</p>
            </div>
          </div>
          <div class="row">
            <div class="col p-0">
              <h1 class="text-light p-1">${albumInfo.title}</h1>
            </div>
          </div>
          <div class="row">
            <div class="col-md-9 col-lg-12 p-0">
              <div class="d-flex align-items-center">
                <div style="width: 25px" class="m-1 me-2">
                  <img
                    src="${albumInfo.artist.picture_small}"
                    alt="artistImg"
                    class="img-fluid rounded-circle"
                  />
                </div>
                <p class="text-light m-0 underline-hover"><b><a href="./artist.html" class="text-decoration-none text-light  ">${
                  albumInfo.artist.name
                }</a></b></p>
                <p class="text-light m-0 d-none d-md-none d-lg-flex">· ${albumInfo.release_date.slice(0, 4)} · ${
      albumInfo.tracks.data.length
    } canzoni, ${Math.floor(albumInfo.duration / 60)} min ${String(albumInfo.duration % 60).padStart(2, "0")} sec.</p>
              </div>
              <div class="col-md-9 col-lg-12 p-0">
                <p class="text-light m-0 d-lg-none opacity-75">Album · ${albumInfo.release_date.slice(0, 4)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

    albumHeader.innerHTML = albumHeaderHTML;

    // selecting coverimg src
    const coverImg = document.querySelector(".coverImg");
    console.dir(coverImg.src);
    coverImg.crossOrigin = "Anonymous";

    //getting color
    let cssColor;

    getColorFromImage(coverImg.src, 50, 50, function (color) {
      cssColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
      const cssColor2 = `rgba(${color.r} , ${color.g - 20}, ${color.b}, ${color.a})`;

      const gradient = `linear-gradient(176deg, ${cssColor} 0% ,${cssColor2} 50%, #414141 100% )`;

      albumHeader.style.background = gradient;

      window.addEventListener("scroll", function () {
        const topBar = document.querySelector("#topBar");

        if (scrollY < 10) {
          topBar.style.cssText = "background: #000000 !important; transition: background 0.4s ease;";
        } else if (scrollY > 10) {
          topBar.style.cssText = `background: ${cssColor2} !important;
          transition: background 0.4s ease;
          opacity:0.98;`;
        }
      });
    });

    // songs printing
    const songsContainer = document.querySelector("#songsContainer");
    let songsContainerHTML = "";
    const songs = albumInfo.tracks.data;
    console.log(songs);

    songs.forEach((song, index) => {
      songsContainerHTML += `<div class="container-fluid singleSong rounded-3" >
      <div class="row text-light px-3 py-1 mt-2 align-items-center justify-content-around ">
          <div class="col-1 d-none d-md-flex">
            <a class="text-decoration-none canzone" href="#" id="${song.id}">
              <p class="m-0 opacity-75 indexNum text-white">${index + 1}</p>
              <span class="m-0 d-none trackPlayBtn" >
                          <svg
                            data-encore-id="icon"
                            role="img"
                            aria-hidden="true"
                            fill="#ffffff"
                            viewBox="0 0 16 16"
                            class="Svg-sc-ytk21e-0 kPpCsU"
                            style="width: 16px; margin-top: -4px"
                          >
                            <path
                              d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"
                            ></path>
                          </svg>
                        </span>
            </a>
          </div>
        <div class="col-8 col-md-8">
          <div>
            <a class="text-decoration-none canzone" href="#" id="${song.id}">
              <p class="m-0 underline-hover text-white">${song.title}</p>
            </a>
            <p class="m-0 opacity-75 underline-hover"><a href="./artist.html" class="text-decoration-none text-light">${
              albumInfo.artist.name
            }</a></p>
            <audio src="${song.preview}"  class="previewAudio"></audio>
          </div>
        </div>
        <div class="col-md-3 d-none d-md-block">
          <div class="d-flex justify-content-end align-items-center gap-4 text-end">
            <span class="opacity-75 px-2">
              <svg
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                viewBox="0 0 24 24"
                style="width: 15px"
                fill="#ffffff"
                class="Svg-sc-ytk21e-0 iaCPPY"
              >
                <path
                  d="M5.21 1.57a6.757 6.757 0 0 1 6.708 1.545.124.124 0 0 0 .165 0 6.741 6.741 0 0 1 5.715-1.78l.004.001a6.802 6.802 0 0 1 5.571 5.376v.003a6.689 6.689 0 0 1-1.49 5.655l-7.954 9.48a2.518 2.518 0 0 1-3.857 0L2.12 12.37A6.683 6.683 0 0 1 .627 6.714 6.757 6.757 0 0 1 5.21 1.57zm3.12 1.803a4.757 4.757 0 0 0-5.74 3.725l-.001.002a4.684 4.684 0 0 0 1.049 3.969l.009.01 7.958 9.485a.518.518 0 0 0 .79 0l7.968-9.495a4.688 4.688 0 0 0 1.049-3.965 4.803 4.803 0 0 0-3.931-3.794 4.74 4.74 0 0 0-4.023 1.256l-.008.008a2.123 2.123 0 0 1-2.9 0l-.007-.007a4.757 4.757 0 0 0-2.214-1.194z"
                ></path>
              </svg>
            </span>
            <p class="m-0 opacity-75">${Math.floor(song.duration / 60)}:${String(song.duration % 60).padStart(
        2,
        "0"
      )}</p>
          </div>
        </div>
        <div class="col-4 d-md-none p-0">
          <div class="d-flex justify-content-end align-items-center gap-4 text-end">
            <span class="opacity-75 px-2 rotate-45">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-three-dots-vertical"
                viewBox="0 0 16 16"
              >
                <path
                  d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>`;
    });
    songsContainer.innerHTML = songsContainerHTML;

    const singleSong = document.querySelectorAll(".singleSong");

    singleSong.forEach((song1) => {
      const trackPlayBtn = song1.querySelector(".trackPlayBtn");
      const indexNum = song1.querySelector(".indexNum");

      song1.addEventListener("mouseover", () => {
        song1.classList.add("bg-secondary", "bg-opacity-25");
        trackPlayBtn.classList.remove("d-none");
        indexNum.classList.add("d-none");
      });
      song1.addEventListener("mouseout", () => {
        song1.classList.remove("bg-secondary");
        trackPlayBtn.classList.add("d-none");
        indexNum.classList.remove("d-none");
      });

      // playing audio
      //      const previewAudio = document.querySelectorAll(".previewAudio");
      //      const trackPlayBtns = document.querySelectorAll(".trackPlayBtn");
      //      const isPlayingArray = Array.from({ length: previewAudio.length }, () => false);
      //
      //      trackPlayBtns.forEach((trackPlayBtn, index) => {
      //        trackPlayBtn.addEventListener("click", () => {
      //          if (isPlayingArray[index]) {
      //            previewAudio[index].pause();
      //          } else {
      //            previewAudio[index].play();
      //          }
      //
      //          isPlayingArray[index] = !isPlayingArray[index];
      //
      //          for (let i = 0; i < previewAudio.length; i++) {
      //            if (i !== index && isPlayingArray[i]) {
      //              previewAudio[i].pause();
      //              isPlayingArray[i] = false;
      //            }
      //          }
      //        });
      //      });
    });
    const canzoni = document.querySelectorAll(".canzone");
    const arrayCanzoni = Array.from(canzoni);
    arrayCanzoni.forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault();
        console.log(event.target.closest("a"));
        functionSong(event.target.closest("a").id);
      });
    });

    // release date
    const releaseDate = document.querySelector("#releaseDate");
    let releaseDateHTML = "";

    const monthsMapping = {
      "01": "January",
      "02": "February",
      "03": "March",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "August",
      "09": "September",
      10: "October",
      11: "November",
      12: "December",
    };

    const month = monthsMapping[albumInfo.release_date.slice(5, 7)];
    const year = albumInfo.release_date.slice(0, 4);
    const day = albumInfo.release_date.slice(8, 10);

    releaseDateHTML += `<div class="m-4" id="releaseDate">
    <p class="text-light opacity-75">${day + " " + month + " " + year}</p>
  </div>`;
    releaseDate.innerHTML = releaseDateHTML;
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
          <div class="row align-items-center g-2 mb-3">
            <div class="col-3">
              <a class="text-decoration-none" href="artist.html?artistId=${elem.id}">
                <img src=${elem.picture} class="img-fluid rounded-pill" />
              </a>
            </div>
            <div class="col-9">
              <a class="text-decoration-none" href="artist.html?artistId=${elem.id}">
                <p class="text-white m-0 limite-righe-1">${elem.name}</p>
                <p class="fw-normal text-white m-0 limite-righe-1">Artista</p>
              </a>
            </div>
          </div>`;
    } else if (elem.type === "album") {
      document.querySelector("#laMiaLibreria").innerHTML += `
          <div class="row align-items-center g-2 mb-3">
            <div class="col-3">
              <a class="text-decoration-none" href="album.html?albumId=${elem.id}">      
                <img src=${elem.cover} class="img-fluid" />
              </a>
            </div>
            <div class="col-9">
              <a class="text-decoration-none" href="album.html?albumId=${elem.id}">      
                <p class="text-white m-0 limite-righe-1">${elem.title}</p>
                <p class="fw-normal text-white m-0 limite-righe-1">Album - ${elem.artist.name}</p>
              </a>
            </div>
          </div>`;
    } else if (elem.type === "playlist") {
      document.querySelector("#laMiaLibreria").innerHTML += `
          <div class="row align-items-center g-2 mb-3">
            <div class="col-3">
              <a class="text-decoration-none" href="#">
                <img src=${elem.picture} class="img-fluid" />
              </a>
            </div>
            <div class="col-9">
              <a class="text-decoration-none" href="#">
                <p class="text-white m-0 limite-righe-1">${elem.title}</p>
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
