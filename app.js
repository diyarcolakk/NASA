const containerShow = document.querySelector(".card-container-for-nasa");
const nesneArr = [];

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
      <div class="text-div mt-3 p-3">${temp[i].explanation}</div>
      <span class="bottom-span mt-4 p-3 font-weight-bold">${temp[i].date}</span>
  </div>`;
    }
    containerShow.insertAdjacentHTML("beforeend", card);
  }
  createNasaCard(nasaApiJson);
  //Favorilere ekliyorum best practice sanırım . ÇOK İYİYİM.
  const addToFavorites = document.querySelectorAll(".giveAttribute");
  const favoritesBtn = document.querySelector(".show-my-favorites");
  const loadMoreBtn = document.querySelector(".show-more-pictures");
  const nasaContainer = document.querySelector(".card-container-for-nasa");
  // const cardContainer = document.querySelector(".little-container");
  addToFavorites.forEach((data) => {
    data.addEventListener("click", () => {
      nesneArr.push(nasaApiJson[data.id]);
      /*İlgili add to favorites'e tıklandığında.ID ye karşılık gelen api verisini
      bir ArrayNesnesinde tutuyorum. Bunu local storage atıp.
      Yeni sayfada ekrana vereceğim.Ardından, RemoveFavorites dediğim an ,
      display="block yapıp" arrayden çıkartacağım.Ve local storage'ı güncelleyeceğim.
      */
      localStorage.setItem(
        String(data.id),
        JSON.stringify(nasaApiJson[data.id])
      );
    });
  });

  // console.log(cardContainer);
  //Favorites butonu
  favoritesBtn.addEventListener("click", function () {
    nasaContainer.classList.add("hidden");
  });

  // Load More Butonu
  loadMoreBtn.addEventListener("click", function () {
    window.location.reload();
  });
}
getNasaApi();
// Local storage kullanımı.

// localStorage.clear();
