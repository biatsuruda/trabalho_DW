      async function getWeather() {
        const cityName = document.getElementById("city_name").value;
        const apiKey = "8a60b2de14f7a17c7a11706b2cfcd87c";
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        try {
          const response = await fetch(apiUrl);
          const data = await response.json();

          // Atualizar os elementos com as informações da temperatura
          document.getElementById("title").innerText = `${data.name}, ${data.sys.country}`;
          document.getElementById("temp_value").innerText = `${Math.round(data.main.temp)}°C`;
          document.getElementById("temp_description").innerText = data.weather[0].description;
          document.getElementById("temp_max").innerText = `${Math.round(data.main.temp_max)}°C`;
          document.getElementById("temp_min").innerText = `${Math.round(data.main.temp_min)}°C`;
          document.getElementById("humidity").innerText = `${data.main.humidity}%`;
          document.getElementById("wind").innerText = `${data.wind.speed} km/h`;
          document.getElementById("temp_img").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        } catch (error) {
          console.error("Erro ao buscar a temperatura:", error);
          // Mostrar mensagem de erro ao usuário
          document.getElementById("alert").innerText = "Erro ao buscar a temperatura. Por favor, tente novamente.";
        }
      }