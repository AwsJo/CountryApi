let colorMode = document.getElementById("colorMode");
const BASE_URL = "https://restcountries.com/v3.1";
let backButton = document.getElementById("back");
let detailSection = document.getElementById("detail");
let cca3 = new URLSearchParams(window.location.search);
cca3 = cca3.get("cca3");

// Build Details
let countriy = fetch(`${BASE_URL}/alpha/${cca3}`).then((Response) =>
  Response.json()
);
countriy
  .then((Response) => {
    Response = Response[0];
    let img = document.createElement("img");
    img.src = Response.flags.svg;
    img.alt = Response.name.common;
    let name = document.createElement("h2");
    name.append(document.createTextNode(Response.name.common));
    detailSection.append(
      name,
      img,
      pBuilder(
        "Native Name",
        Response.name.nativeName[Object.keys(Response.name.nativeName)[0]]
          .official
      ),
      pBuilder("Population", Response.population),
      pBuilder("Region", Response.region),
      pBuilder("Sub Region", Response.subregion),
      pBuilder("Capital", Response.capital),
      pBuilder("Top Level Domain", Response.tld),
      pBuilder(
        "Currencies",
        Response.currencies[Object.keys(Response.currencies)[0]].name
      ),
      pBuilder("Languages", Object.values(Response.languages))
    );
    let borderCountries = Response.borders.map((element) => {
      return fetch(`${BASE_URL}/alpha/${element}`).then((Response) =>
        Response.json()
      );
    });
    return borderCountries;
  })
  .then((borderCountries) => {
    Promise.allSettled(borderCountries)
      .then((Responses) => {
        return Responses.map((ele) => ele.value);
      })
      .then((Responses) => {
        let wraper = document.createElement("div");
        wraper.id = "borderCountres";
        wraper.classList.add("border-countres");
        let res = Responses.map((ele) => {
          let borderCountry = document.createElement("button");
          borderCountry.append(document.createTextNode(ele[0].name.common));
          borderCountry.id = ele[0].cca3;
          return borderCountry;
        });
        let bc = document.createElement("h3");
        bc.append("Border Countries :");
        wraper.append(bc);
        wraper.append(...res);
        wraper.addEventListener("click", (event) => {
          if (event.target.id != "borderCountres" && event.target.id != "") {
            location.href = `./detail.html?cca3=${event.target.id}`;
          }
        });
        detailSection.append(wraper);
      });
    //   .then((Responses) => {
    //     let wraper = document.createElement("div");
    //     wraper.id = "borderCountres";
    //     wraper.classList.add("border-countres");
    //     let res = Responses.map((element) => {
    //       let borderCountry = document.createElement("button");
    //       borderCountry.append(document.createTextNode(element.name));
    //       borderCountry.id = element.cca3;
    //       return borderCountry;
    //     });
    //     wraper.append(...res);
    //     detailSection.append(wraper);
    //   });
  });

function pBuilder(title, data) {
  let p = document.createElement("p");
  let span = document.createElement("span");
  span.append(document.createTextNode(title + ": "));
  p.append(span, data);
  return p;
}
// Back to index.html EventListner
backButton.addEventListener("click", () => {
  location.href = "./index.html";
});

//Color mode
colorMode.addEventListener("click", () => {
  if (colorMode.lastChild.nodeValue === "Dark Mode") {
    colorMode.lastChild.remove();
    colorMode.append(document.createTextNode("Light Mode"));
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
