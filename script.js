const apiKey = "0e2660a9397d174815a919c6987f9fb6";
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const weatherIcons = {
        "Clouds": "img/clouds.png",
        "Clear": "img/clear.png",
        "Rain": "img/rain.png",
        "Drizzle": "img/drizzle.png",
        "Snow": "img/snow.png"

    };
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
        document.querySelector("#iconsContainer").style.display = "none"
    }
    else {
        let data = await response.json();

        let dayIndex = 8;
        let eveningIndex = 11;
        let dayNumber = 1;
        for (let index = 0; index < data.list.length; index++) {
            if (index == 0) {
                const element = data.list[index];
                document.querySelector(".city").innerHTML = data.city.name;
                document.querySelector(".temp").innerHTML = Math.round(element.main.temp) + "°C";
                document.querySelector(".humidity").innerHTML = element.main.humidity + "%";
                document.querySelector(".wind").innerHTML = element.wind.speed + " km/h";

                const weatherStatus = element.weather[0].main;
                if (weatherIcons.hasOwnProperty(weatherStatus)) {
                    weatherIcon.src = weatherIcons[weatherStatus];
                }
            }

            const dayForecast = data.list[dayIndex];
            const eveningForecast = data.list[eveningIndex];
            const dayMinTemp = document.querySelector(`#day${dayNumber}Min`);
            const dayMaxTemp = document.querySelector(`#day${dayNumber}Max`);
            const dayImg = document.querySelector(`#img${dayNumber}`);

            dayMinTemp.innerHTML = "Day " + Math.round(dayForecast.main.temp) + "°C";
            dayMaxTemp.innerHTML = "Evening " + Math.round(eveningForecast.main.temp) + "°C";

            let weatherStatus = dayForecast.weather[0].main;
            if (weatherIcons.hasOwnProperty(weatherStatus)) {
                dayImg.src = weatherIcons[weatherStatus];
            }

            dayIndex = dayIndex + 8;
            eveningIndex = eveningIndex + 8;
            dayNumber++;

            if (dayNumber >= 5) {
                break;
            }
        }



        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

}


searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})

