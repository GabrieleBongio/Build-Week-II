import { Key } from "../token.js";
const Host = "deezerdevs-deezer.p.rapidapi.com";
const URL = "https://deezerdevs-deezer.p.rapidapi.com/album/";

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
// const id = params.get("id");
const id = 97140952;

fetch(URL + id, {
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
                <p class="text-light m-0"><b>${albumInfo.artist.name}</b></p>
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
    getColorFromImage(coverImg.src, 50, 50, function (color) {
      
      const cssColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
      const cssColor2 = `rgba(${color.r} , ${color.g-20}, ${color.b}, ${color.a})`;
      console.log("cssColor:", cssColor)
      const gradient = `linear-gradient(176deg, ${cssColor} 0% ,${cssColor2} 50%, #191919 100% )`
      console.log("cssColor2:", cssColor2)

      albumHeader.style.background = gradient;
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
          <p class="m-0 opacity-75 indexNum">${index + 1}</p>
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
        </div>
        <div class="col-8 col-md-8">
          <div>
            <p class="m-0">${song.title}</p>
            <p class="m-0 opacity-75">${song.artist.name}</p>
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

    singleSong.forEach((song) => {
      const trackPlayBtn = song.querySelector(".trackPlayBtn");
      const indexNum = song.querySelector(".indexNum");

      song.addEventListener("mouseover", () => {
        song.classList.add("bg-secondary", "bg-opacity-25");
        trackPlayBtn.classList.remove("d-none");
        indexNum.classList.add("d-none");
      });
      song.addEventListener("mouseout", () => {
        song.classList.remove("bg-secondary");
        trackPlayBtn.classList.add("d-none");
        indexNum.classList.remove("d-none");
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
