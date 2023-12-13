import { Key, casualLibrary } from "../token.js";
const Host = "deezerdevs-deezer.p.rapidapi.com";
const URL = "https://deezerdevs-deezer.p.rapidapi.com/";

const functionGrigliaSuperiore = () => {
  const buongiorno = casualLibrary.slice(0, 6);
  console.log(buongiorno);
  const grigliaSuperiore = document.querySelector("#grigliaSuperiore");
  grigliaSuperiore.innerHTML = "";
  buongiorno.forEach((element) => {
    fetch(URL + element.type + "/" + element.id, {
      headers: { "X-RapidAPI-Key": Key, "X-RapidAPI-Host": Host },
    })
      .then((resp) => {
        if (resp.ok) {
          console.log();
          return resp.json();
        } else {
          throw new Error("Errore");
        }
      })
      .then((obj) => {
        if (obj.type == "artist") {
          grigliaSuperiore.innerHTML += `<div class="col-12 col-sm-6 col-lg-4 p-1">
            <div class="rounded-2 bg-secondary overflow-hidden">
              <div class="row align-items-center">
                <div class="col-3">
                  <img src="${obj.picture}" class="img-fluid rounded-circle" />
                </div>
                <div class="col-9">
                  <p class="fw-bold text-white m-0">${obj.name}</p>
                </div>
              </div>
            </div>
          </div>`;
        } else if (obj.type == "playlist") {
          grigliaSuperiore.innerHTML += `<div class="col-12 col-sm-6 col-lg-4 p-1">
            <div class="rounded-2 bg-secondary overflow-hidden">
              <div class="row align-items-center">
                <div class="col-3">
                  <img src="${obj.picture}" class="img-fluid" />
                </div>
                <div class="col-9">
                  <p class="fw-bold text-white m-0">${obj.title}</p>
                </div>
              </div>
            </div>
          </div>`;
        } else if (obj.type == "album") {
          grigliaSuperiore.innerHTML += `<div class="col-12 col-sm-6 col-lg-4 p-1">

            <div class="rounded-2 bg-secondary overflow-hidden">
              <div class="row align-items-center">
                <div class="col-3">
                  <img src="${obj.cover}" class="img-fluid" />
                </div>
                <div class="col-9">
                  <p class="fw-bold text-white m-0">${obj.title}</p>
                </div>
              </div>
            </div>
          </div>`;
        }
      })
      .catch((error) => console.log(error));
  });
};

const functionAscoltateDiRecente = () => {
  const arrayAscoltateDiRecente = casualLibrary.slice(7, 13);
  console.log(arrayAscoltateDiRecente);
  const ascoltateDiRecente = document.querySelectorAll(".ascoltateDiRecente");
  for (let i = 0; i < arrayAscoltateDiRecente.length; i++) {
    ascoltateDiRecente[i].innerHTML = "";
    fetch(URL + arrayAscoltateDiRecente[i].type + "/" + arrayAscoltateDiRecente[i].id, {
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
        if (obj.type == "artist") {
          ascoltateDiRecente[
            i
          ].innerHTML += `<img src="${obj.picture}" class="img-fluid rounded-pill mb-3" />
            <p class="fw-bold text-white m-0">${obj.name}</p>
            <p class="text-white m-0">Artista</p>
            `;
        } else if (obj.type == "playlist") {
          ascoltateDiRecente[
            i
          ].innerHTML += `<img src="${obj.picture}" class="img-fluid rounded-2 mb-3" />
            <p class="fw-bold text-white m-0">${obj.title}</p>
            <p class="text-white m-0">${obj.nb_tracks} brani</p>
            `;
        } else if (obj.type == "album") {
          ascoltateDiRecente[
            i
          ].innerHTML += `<img src="${obj.cover}" class="img-fluid rounded-2 mb-3" />
            <p class="fw-bold text-white m-0">${obj.title}</p>
            <p class="text-white m-0">${obj.artist.name}</p>
            `;
        }
      });
  }
};

const functionAlbum = () => {
  const arrayAlbum = casualLibrary
    .filter((element) => {
      return element.type == "album";
    })
    .slice(0, 6);
  console.log(arrayAlbum);
  const albumTop = document.querySelectorAll(".albumTop");
  for (let i = 0; i < arrayAlbum.length; i++) {
    albumTop[i].innerHTML = "";
    fetch(URL + arrayAlbum[i].type + "/" + arrayAlbum[i].id, {
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
        albumTop[i].innerHTML += `<img src="${obj.cover}" class="img-fluid rounded-2 mb-3" />
            <p class="fw-bold text-white m-0">${obj.title}</p>
            <p class="text-white m-0">${obj.artist.name}</p>
            `;
      });
  }
};

const functionArtist = () => {
  const arrayArtist = casualLibrary
    .filter((element) => {
      return element.type == "artist";
    })
    .slice(0, 6);
  console.log(arrayArtist);
  const artistTop = document.querySelectorAll(".artistTop");
  for (let i = 0; i < arrayArtist.length; i++) {
    artistTop[i].innerHTML = "";
    fetch(URL + arrayArtist[i].type + "/" + arrayArtist[i].id, {
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
        artistTop[i].innerHTML += `<img src="${obj.picture}" class="img-fluid rounded-pill mb-3" />
            <p class="fw-bold text-white m-0">${obj.name}</p>
            `;
      });
  }
};

const functionPlaylist = () => {
  const arrayPlaylist = casualLibrary
    .filter((element) => {
      return element.type == "playlist";
    })
    .slice(0, 6);
  console.log(arrayPlaylist);
  const playlistTop = document.querySelectorAll(".playlistTop");
  for (let i = 0; i < arrayPlaylist.length; i++) {
    playlistTop[i].innerHTML = "";
    fetch(URL + arrayPlaylist[i].type + "/" + arrayPlaylist[i].id, {
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
        playlistTop[
          i
        ].innerHTML += `<img src="${obj.picture}" class="img-fluid rounded-pill mb-3" />
            <p class="fw-bold text-white m-0">${obj.title}</p>
            <p class="text-white m-0">${obj.nb_tracks} brani</p>
          
            `;
      });
  }
};

const functionEstate2023 = () => {
  const arrayEstate2023 = [
    {
      id: "579513551",
    },
    {
      id: "11999244241",
    },
    {
      id: "10788809502",
    },
    {
      id: "6045750124",
    },
    {
      id: "4519883822",
    },
    {
      id: "65489479",
    },
  ];
  console.log(arrayEstate2023);
  const Estate2023Top = document.querySelectorAll(".Estate2023Top");
  for (let i = 0; i < arrayEstate2023.length; i++) {
    Estate2023Top[i].innerHTML = "";
    fetch(URL + "playlist/" + arrayEstate2023[i].id, {
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
        Estate2023Top[i].innerHTML += `<img src="${obj.picture}" class="img-fluid rounded-2 mb-3" />
            <p class="fw-bold text-white m-0">${obj.title}</p>
            <p class="text-white m-0">${obj.nb_tracks} brani</p>
            `;
      });
  }
};

const functionSong = () => {
  const params = new URLSearchParams(window.location.search);
  const songId = params.get("songId");
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
};

const functionLaMiaLibreria = () => {
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
          document.querySelector(
            "#laMiaLibreria"
          ).innerHTML += `<div class="row align-items-center g-2 mb-3">
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
          document.querySelector(
            "#laMiaLibreria"
          ).innerHTML += `<div class="row align-items-center g-2 mb-3">
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
          document.querySelector(
            "#laMiaLibreria"
          ).innerHTML += `<div class="row align-items-center g-2 mb-3">
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
};

//setTimeout(functionGrigliaSuperiore, 500);
//setTimeout(functionAscoltateDiRecente, 1000);
//setTimeout(functionAlbum, 1500);
//setTimeout(functionArtist, 2000);
//setTimeout(functionPlaylist, 2500);
//setTimeout(functionSong, 3000);
//setTimeout(functionLaMiaLibreria, 3500);

//functionGrigliaSuperiore();
//functionAscoltateDiRecente();
//functionAlbum();
//functionArtist();
//functionPlaylist();
//functionEstate2023();
//functionSong();
//functionLaMiaLibreria();

//let myPromise = new Promise(function (resolve, rejected) {
//  console.log("ciao");
//  functionGrigliaSuperiore();
//  setTimeout(() => {
//    resolve("OK");
//  }, 500);
//});
//myPromise
//  .then(() => {
//    console.log("ciao");
//    functionAscoltateDiRecente();
//    setTimeout(() => {
//      return "OK";
//    }, 500);
//  })
//  .then((value) => console.log(value));
