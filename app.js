const containerShow = document.querySelector(".main-container");

async function getNasaApi() {
  const counter = 10;
  const nasaKey = "S765qBh4X5m2oYxN8zQZgtNj6gXqHGEGWbB8ba6r";
  const nasaApi = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${nasaKey}&count=${counter}`
  );

  const nasaApiJson = await nasaApi.json();
  console.log(nasaApiJson);

  function createNasaCard(temp) {
    let card = "";
    for (let i = 0; i < temp.length; i++) {
      card += `
    <div class="little-container mb-4">
      <div class="img-div">
      <img class="img-position" src="${temp[i].url}" alt="" /> 
      </div>
      <h1 class="py-3">${temp[i].title}</h1>
      <a href="" class="my-3">Add To Favorites</a>
      <div class="text-div mt-5">${temp[i].explanation}</div>
      <span class="bottom-span mt-4">${temp[i].date}</span>
  </div>`;
    }
    containerShow.insertAdjacentHTML("beforeend", card);
  }
  createNasaCard(nasaApiJson);
}
getNasaApi();

//API request  exceeded for day lets continue later.
