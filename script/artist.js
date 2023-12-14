import { Key } from "../token.js";
import { casualLibrary } from "./libreria.js";

const Host = "deezerdevs-deezer.p.rapidapi.com";
const URL = "https://deezerdevs-deezer.p.rapidapi.com/";

const params = new URLSearchParams(window.location.search);
//const artistId = params.get("artistId");
const artistId = 13;

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

    fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistId + "/top?limit=10")
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
          listaCanzoni.innerHTML += ` <div class="col-8 d-flex gap-3 align-items-center justify-content-between mb-3">
           <div class="d-flex gap-3 align-items-center">
            <p class="text-dark-emphasis m-0">${i}</p>
            <a href= "#"><img src="${element.album.cover}" alt="" style="width: 45px"/></a>
            <a href= "#" class= "text-decoratione-none"><p class="m-0">${element.title}</p></a>
          </div>
          <div class="d-flex">
            <p class="m-0">${element.rank}</p>
          </div>
        </div>
        <div class="col-4 d-flex justify-content-end align-items-center gap-4 pe-5 mb-3">
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
        </div>`;
          i++;
        });
        console.log(resp.data);
      });
  });

/*const songId = params.get("songId");
fetch(URL + "track/" + songId, {
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
    const songDetails = document.querySelector("#songDetails");
    songDetails.innerHTML = `<div class="col-3">
    <img src="${song.album.cover}" class="img-fluid" />
  </div>
  <div class="col-9">
    <div class="d-flex align-items-center">
      <div>
        <p class="fw-bold m-0 text-white">${song.title}</p>
        <p class="text-white opacity-75 m-0">${song.artist.name}</p>
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
  });

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
}); */
