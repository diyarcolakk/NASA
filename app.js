const containerShow = document.querySelector(".card-container-for-nasa");
const nesneArr = [];
const tempArr = [];
let myArr = [];
async function getNasaApi() {
  const counter = 10;
  const nasaKey = "S765qBh4X5m2oYxN8zQZgtNj6gXqHGEGWbB8ba6r";
  const nasaApi = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${nasaKey}&count=${counter}`
  );
  const nasaApiJson = await nasaApi.json();
  function createNasaCard(temp) {
    let card = "";
    for (let i = 0; i < temp.length; i++) {
      card += `
    <div class="little-container mb-4">
      <div class="img-div">
     <a href="${temp[i].url}" target="_blank"> <img class="img-position" src="${temp[i].url}" alt="${temp[i].title}" /> </a>
      </div>
      <h1 class="p-3 ">${temp[i].title}</h1>
      <a href="#" class="giveAttribute my-1 p-3" id="${i}">Add To Favorites</a>
      <a href="#" class="deleteAttribute hidden my-1 p-3" id="${i}">Remove</a>
      <div class="text-div mt-3 p-3">${temp[i].explanation}</div>
      <span class="bottom-span mt-4 p-3 font-weight-bold">${temp[i].date}</span>
  </div>`;
    }
    containerShow.insertAdjacentHTML("beforeend", card);
  }
  createNasaCard(nasaApiJson);
  // Cardlar oluştu

  //Favorilere ekliyorum best practice sanırım . ÇOK İYİYİM.
  const addToFavorites = document.querySelectorAll(".giveAttribute");
  const cardContainer = document.querySelectorAll(".little-container");
  const favoritesBtn = document.querySelector(".show-my-favorites");
  const loadMoreBtn = document.querySelector(".show-more-pictures");
  //Add Favorites'e tıklandığında gerçekleşir.
  addToFavorites.forEach((data) => {
    data.addEventListener("click", () => {
      nesneArr.push(nasaApiJson[data.id]);
      localStorage.setItem("nesneArr", JSON.stringify(nesneArr));
    });
  });
  //Atılan favori itemlerin keylerini Array'de tut. Daha sonrası arrayi getItem'e parametre olarak ver.Böylece her biri için işlemi yapmış olursun.

  favoritesBtn.addEventListener("click", function () {
    cardContainer.forEach((x) => {
      x.remove();
    });

    const tempStorage = JSON.parse(localStorage.getItem("nesneArr"));
    //1-)İf koşulu konulmalı içindeki nesne zaten varsa createNasaCard ona göre çalışmalı
    createNasaCard(tempStorage);
    const removeBtn = document.querySelector(".deleteAttribute");
    const removeBtnAll = document.querySelectorAll(".deleteAttribute");
    const addToFav2 = document.querySelectorAll(".giveAttribute");
    addToFav2.forEach((data) => {
      data.remove();
    });
    // removeBtn.classList.remove("hidden");
    removeBtnAll.forEach((data) => {
      //2-) RemoveBtn click eventi verilmeli
      data.classList.remove("hidden");
    });
  });
  // Load More Butonu
  loadMoreBtn.addEventListener("click", function () {
    const mainPage = document.querySelectorAll(".little-container");
    mainPage.forEach((x) => x.remove());
    getNasaApi();
  });
}
getNasaApi();
// Local storage kullanımı.

// localStorage.clear();
