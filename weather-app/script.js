const url = `https://api.openweathermap.org/data/2.5`;
const apiKey = "caee97f5e279d7477b0b62e6151410e4";

// Hàm gọi API thời tiết hiện tại
const callApiWeather = async () => {
  const city = document.getElementById("city").value;
  if (!city) {
    alert("Please enter a city");
    return;
  }
  try {
    const response = await fetch(`${url}/weather?q=${city}&appid=${apiKey}`);
    const data = await response.json();
    displayWeather(data);
    console.log(data);
  } catch (error) {
    console.error("Error fetching current weather data:", error);
  }
};

// Hàm gọi API dự báo thời tiết
const callApiForecast = async () => {
  const city = document.getElementById("city").value;
  if (!city) {
    alert("Please enter a city");
    return;
  }
  try {
    const response = await fetch(`${url}/forecast?q=${city}&appid=${apiKey}`);
    const data = await response.json();
    displayHourlyForecast(data.list);
    console.log(data);
  } catch (error) {
    console.error("Error fetching forecast data:", error);
  }
};

// Hàm xử lý khi nhấn nút "Search"
const getWeather = () => {
  callApiWeather();
  callApiForecast();
};

// Hàm hiển thị thời tiết hiện tại
const displayWeather = (data) => {
  const tempDivInfo = document.getElementById("temp-div");
  const weatherInfoDiv = document.getElementById("weather-info");
  const weatherIcon = document.getElementById("weather-icon");

  tempDivInfo.innerHTML = ``;
  weatherInfoDiv.innerHTML = ``;

  if (data.cod === "404") {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const desc = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const temperatureHtml = `<p>${temperature}°C</p>`;
    const weatherHtml = `<p>${cityName}</p><p>${desc}</p>`;

    tempDivInfo.innerHTML = temperatureHtml;
    weatherInfoDiv.innerHTML = weatherHtml;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = desc;
    weatherIcon.style.display = "block"; // Hiển thị hình ảnh thời tiết
  }
};

// Hàm hiển thị dự báo thời tiết theo giờ
function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById("hourly-forecast");
  hourlyForecastDiv.innerHTML = ``; // Xóa nội dung cũ

  const next24Hours = hourlyData.slice(0, 8); // Hiển thị 24 giờ tiếp theo (khoảng cách 3 giờ)

  next24Hours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000); // Chuyển đổi timestamp sang milliseconds
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp - 273.15); // Chuyển sang độ C
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHtml = `
      <div class="hourly-item">
        <span>${hour}:00</span>
        <img src="${iconUrl}" alt="Hourly Weather Icon">
        <span>${temperature}°C</span>
      </div>
    `;

    hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}

// Hàm xử lý khi nhấn nút "Search"
const button = document.querySelector("button");
button.addEventListener("click", getWeather);
