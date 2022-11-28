let colorMode = document.getElementById("colorMode");
let search = document.getElementById("search");
const BASE_URL = "https://restcountries.com/v3.1";
let countriess = document.getElementById("countries");
let regionSelect = document.getElementById("region");
let searchInput = document.getElementById("searchInput");

// Main Page
function getAllCountries() {
  let countries = fetch(`${BASE_URL}/all`).then((Response) => Response.json());
  countries.then((Response) => {
    Response.forEach((element) => {
      let card = createCountry(
        element.flags.svg,
        element.name.common,
        element.population,
        element.region,
        element.capital,
        element.cca3
      );
      countriess.append(card);
    });

    // Response.forEach((element) => {
    //   console.log();
    //   //element.name.common
    // Response[1].flags.svg
    // Response[1].population
    // Response[1].capital[0]
    // Response[1].region
    // });
  });
}
getAllCountries();
// Filter By region
function filterByRegion(region) {
  while (countriess.firstChild) {
    countriess.lastChild.remove();
  }
  let countries = fetch(`${BASE_URL}/region/${region}`).then((Response) =>
    Response.json()
  );
  countries.then((Response) => {
    Response.forEach((element) => {
      let card = createCountry(
        element.flags.svg,
        element.name.common,
        element.population,
        element.region,
        element.capital,
        element.cca3
      );
      countriess.append(card);
    });
  });
}
regionSelect.addEventListener("change", () => {
  filterByRegion(regionSelect.value);
});
// Serach by Name
function serchByName(name) {
  while (countriess.firstChild) {
    countriess.lastChild.remove();
  }
  let countries = fetch(`${BASE_URL}/name/${name}`).then((Response) =>
    Response.json()
  );

  countries.then((Response) => {
    if (!Response.hasOwnProperty("message")) {
      Response.forEach((element) => {
        let card = createCountry(
          element.flags.svg,
          element.name.common,
          element.population,
          element.region,
          element.capital,
          element.cca3
        );
        countriess.append(card);
      });
    } else {
      let text = document.createElement("p");

      text.append(document.createTextNode(Response.message));
      countriess.append(text);
    }
  });
}
// Serach buttonAddEventListner
search.addEventListener("click", () => {
  serchByName(searchInput.value);
});
// Country Event Listner
countriess.addEventListener("click", (event) => {
  if (event.target.id != "countries" && event.target.id != "") {
    location.href = `./detail.html?cca3=${event.target.id}`;
  }
});
// Country Card Creator
function createCountry(flag, name, population, region, capital, id) {
  let card = document.createElement("div");
  card.classList.add("country");
  card.id = id;
  let img = document.createElement("img");
  img.src = flag;
  img.alt = name;
  let namee = document.createElement("h2");
  namee.append(document.createTextNode(name));
  let populationn = document.createElement("p");
  populationn.append(document.createTextNode("population : " + population));
  let regionn = document.createElement("p");
  regionn.append(document.createTextNode("region : " + region));
  let capitall = document.createElement("p");
  capitall.append(document.createTextNode("capital : " + capital));
  card.append(img, namee, populationn, regionn, capitall);
  return card;
}
// Color Mode Changer
colorMode.addEventListener("click", () => {
  if (colorMode.lastChild.nodeValue === "Dark Mode") {
    colorMode.lastChild.remove();
    colorMode.append(document.createTextNode("Light Mode"));
    search.src = "./assets/search-svgrepo-com-dark.svg";
    document.documentElement.style.setProperty(
      "--text-color",
      "hsl(0, 0%, 100%)"
    );
    document.documentElement.style.setProperty(
      "--secondry-background-color",
      "hsl(209, 23%, 22%)"
    );
    document.documentElement.style.setProperty(
      "--main-background-color",
      "hsl(207, 26%, 17%)"
    );
    document.documentElement.style.setProperty(
      "--mode",
      'url("./assets/sun-svgrepo-com.svg")'
    );
  } else {
    colorMode.lastChild.remove();
    colorMode.append(document.createTextNode("Dark Mode"));
    search.src = "./assets/search-svgrepo-com-light.svg";
    document.documentElement.style.setProperty(
      "--text-color",
      "hsl(200, 15%, 8%)"
    );
    document.documentElement.style.setProperty(
      "--main-background-color",
      "hsl(0, 0%, 98%)"
    );
    document.documentElement.style.setProperty(
      "--secondry-background-color",
      "hsl(0, 0%, 100%)"
    );
    document.documentElement.style.setProperty(
      "--mode",
      'url("./assets/moon-svgrepo-com.svg")'
    );
  }
});
