const input = document.querySelector("input");
const apikey = "8a44351380e1e6ea3bdefe59f2dab399";
const card = document.querySelector("div");

addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = input.value;
  if (city) {
    try {
      const data = await getData(city);
      displayData(data);
    } catch (error) {
      displayError(error);
    }
  } else {
    displayError("Please Enter a City");
  }
});

async function getData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("City not found");
  }
  return await res.json();
}
function displayData(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;
  card.textContent = "";
  card.style.display = "block";
  const name = document.createElement("h1");
  const temptxt = document.createElement("p");
  const humiditytxt = document.createElement("p");
  const desc = document.createElement("p");
  const emoji = document.createElement("p");
  const convertedTemp = temp - 273.15;
  name.textContent = city;
  temptxt.textContent = `${convertedTemp.toFixed(1)}°C`;
  humiditytxt.textContent = `Humidity: ${humidity}%`;
  desc.textContent = description;
  emoji.textContent = getEmoji(id);
  name.classList.add("name");
  temptxt.classList.add("temp");
  humiditytxt.classList.add("humidity");
  desc.classList.add("desc");
  emoji.classList.add("emoji");
  card.appendChild(name);
  card.appendChild(temptxt);
  card.appendChild(humiditytxt);
  card.appendChild(desc);
  card.appendChild(emoji);
}
function displayError(msg) {
  const errormsg = document.createElement("p");
  errormsg.textContent = msg;
  errormsg.classList.add("errormsg");
  card.textContent = "";
  card.style.display = "block";
  card.style.height = "max-content";
  card.appendChild(errormsg);
}
function getEmoji(id) {
  switch (true) {
    case id >= 200 && id < 300:
      return "⛈️";
    case id >= 300 && id < 400:
      return "🌧️";
    case id >= 500 && id < 600:
      return "🌧️";
    case id >= 600 && id < 700:
      return "❄️";
    case id >= 700 && id < 800:
      return "🌫️";
    case id === 800:
      return "☀️";
    case id >= 801 && id < 810:
      return "☁️";
    default:
      return "❓";
  }
}
