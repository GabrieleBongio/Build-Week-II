const laTuaLibreria = [
  {
    type: "artist",
    id: 13,
  },
  {
    type: "album",
    id: 7090505,
  },
  {
    type: "playlist",
    id: 10335983602,
  },
  {
    type: "playlist",
    id: 10229361082,
  },
  {
    type: "artist",
    id: 1655339,
  },
  {
    type: "album",
    id: 502369701,
  },
  {
    type: "playlist",
    id: 3428639822,
  },
  {
    type: "playlist",
    id: 579513551,
  },
  {
    type: "artist",
    id: 66,
  },
  {
    type: "artist",
    id: 64816,
  },
  {
    type: "artist",
    id: 259,
  },
  {
    type: "artist",
    id: 1155242,
  },
  {
    type: "artist",
    id: 75618,
  },
  {
    type: "artist",
    id: 246791,
  },
  {
    type: "artist",
    id: 3312,
  },
  {
    type: "artist",
    id: 115,
  },
  {
    type: "artist",
    id: 119,
  },
  {
    type: "album",
    id: 122366,
  },
  {
    type: "album",
    id: 315283,
  },
  {
    type: "album",
    id: 423368,
  },
  {
    type: "album",
    id: 76311092,
  },
  {
    type: "album",
    id: 13420001,
  },
  {
    type: "album",
    id: 69319552,
  },
  {
    type: "album",
    id: 271595,
  },
  {
    type: "album",
    id: 9410086,
  },
  {
    type: "album",
    id: 212377,
  },
  {
    type: "playlist",
    id: 1976915302,
  },
  {
    type: "playlist",
    id: 1931998962,
  },
  {
    type: "playlist",
    id: 3672060202,
  },
  {
    type: "playlist",
    id: 3773404202,
  },
  {
    type: "playlist",
    id: 8374111862,
  },
  {
    type: "playlist",
    id: 9026286602,
  },
  {
    type: "playlist",
    id: 1129809761,
  },
  {
    type: "playlist",
    id: 65489479,
  },
  {
    type: "playlist",
    id: 11999244241,
  },
  {
    type: "playlist",
    id: 1996494362,
  },
  {
    type: "playlist",
    id: 4403076402,
  },
  {
    type: "playlist",
    id: 673777175,
  },
  {
    type: "playlist",
    id: 9078807562,
  },
  {
    type: "playlist",
    id: 3126664682,
  },
  {
    type: "playlist",
    id: 1924357302,
  },
  {
    type: "playlist",
    id: 1030833471,
  },
  {
    type: "playlist",
    id: 2558770224,
  },
];

const casualLibrary = laTuaLibreria.sort((a, b) => {
  const stringa = a.id + "";
  const stringb = b.id + "";
  const primA = parseInt(stringa.slice(0, 2));
  const primB = parseInt(stringb.slice(0, 2));
  return primA - primB;
});

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

export { casualLibrary, arrayEstate2023 };
