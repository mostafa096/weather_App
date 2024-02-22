const searchInput = document.querySelector("[type='search']");

let apiKey = `56e1a10401f54aa28b4150125231304`;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

searchInput.addEventListener("input", async function () {
  try {
    let forcastData = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}%20&q=${this.value}&days=3&aqi=yes&alerts=no`
    );
    if (forcastData.ok && forcastData.status == 200) {
      let result = await forcastData.json();
      console.log(result);
      displayLocation(result);
    }
  } catch (err) {
    console.log(err);
  }
});

function displayLocation(forcast) {
  // to get local time
  let date = new Date(forcast.location.localtime);

  let tempToday = `<div class="col-lg-4 today">
            <div class="forcast-head py-2 d-flex justify-content-between">
              <span>${days[date.getDay()]}</span>
              <span>${date.getDate()}${monthNames[date.getMonth()]}</span>
            </div>
            <div class="forcastbody d-flex flex-column align-items-center align-items-lg-start al p-3">
              <div class="location mt-2 fs-5">${forcast.location.name}</div>
              <!--  -->
              <div class="temperature my-2 d-flex flex-lg-wrap align-items-center">
                <div class="degree fa-5x fw-bolder">${
                  forcast.current.temp_c
                } <sup>o</sup>C</div>
                <div class="logo">
                  <img
                    class="ms-3"
                    src="${forcast.current.condition.icon}"
                    alt="picture"
                  />
                </div>
              </div>
              <!--  -->
              <div class="custom fw-bold text-info mb-4">${
                forcast.current.condition.text
              }</div>
              <div class="details mb-2">
                <span
                  ><img
                    src="images/icon-umberella.png"
                    alt="picture"
                  />
                  20%
                </span>
                <span
                  ><img
                    class="ms-3"
                    src="images/icon-wind.png"
                    alt="picture"
                  />
                  18km/h
                </span>
                <span
                  ><img
                    class="ms-3"
                    src="images/icon-compass.png"
                    alt="picture"
                  />
                  East
                </span>
              </div>
            </div>
          </div>
          
          
          `;
  let tempForcast = `<div class="col-lg-4 middle-col tomorrow text-center">
            <div class="forcast-head py-2">${days[date.getDay() + 1]}</div>
            <div class="forcastbody py-4">
              <div class="temp-logo">
                <img
                  src="${forcast.forecast.forecastday[1].day.condition.icon}"
                  alt="picture"
                />
              </div>
              <div class="temp">
                <div class="high degree fs-4 fw-bolder">${
                  forcast.forecast.forecastday[1].day.maxtemp_c
                } <sup>o</sup>C</div>
                <div class="small degree fs-6 mb-3">${
                  forcast.forecast.forecastday[1].day.mintemp_c
                }<sup>o</sup></div>
              </div>
              <div class="status text-info">${
                forcast.forecast.forecastday[1].day.condition.text
              }</div>
            </div>

          </div>
          
        



          <div class="col-lg-4 tomorrow text-center">

            <div class="forcast-head py-2">${days[date.getDay() + 2]}</div>
            <div class="forcastbody py-4">
              <div class="temp-logo">
                <img
                  src="${forcast.forecast.forecastday[2].day.condition.icon}"
                  alt="picture"
                />
              </div>
              <div class="temp">
                <div class="high degree fs-4 fw-bolder">${
                  forcast.forecast.forecastday[2].day.maxtemp_c
                } <sup>o</sup>C</div>
                <div class="small degree fs-6 mb-3">${
                  forcast.forecast.forecastday[2].day.mintemp_c
                }<sup>o</sup></div>
              </div>
              <div class="status text-info">${
                forcast.forecast.forecastday[2].day.condition.text
              }</div>
            </div>

          </div>
`;

  document.querySelector("#mainRow").innerHTML = tempToday + tempForcast;
}

// to display data on load
(async function onloadDisplay() {
  try {
    let forcastData = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}%20&q=cairo&days=3&aqi=yes&alerts=no`
    );
    if (forcastData.ok && forcastData.status == 200) {
      let result = await forcastData.json();
      displayLocation(result);
    }
  } catch (err) {
    console.log(err);
  }
})();
