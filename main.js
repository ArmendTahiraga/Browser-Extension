const preloader = document.getElementById("preloader");
setTimeout(() => (preloader.style.display = "none"), 2000);

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
		document.body.style.backgroundImage = `url(${data.urls.full})`;
		document.getElementById("author").textContent = `By: ${data.user.name}`;
	})
	.catch((err) => {
		document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`;
		document.getElementById("author").textContent = `By: Dodi Achmad`;
	});

function getCurrentTime() {
	const date = new Date();
	document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {
		timeStyle: "short",
	});
}
setInterval(getCurrentTime, 1000);

navigator.geolocation.getCurrentPosition((position) => {
	const lat = position.coords.latitude;
	const lon = position.coords.longitude;

	fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`)
		.then((res) => {
			if (!res.ok) {
				throw Error("Weather data not available");
			}
			return res.json();
		})
		.then((data) => {
			const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
			document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}ºC</p>
                <p class="weather-city">${data.name}</p>
            `;
		})
		.catch((err) => console.error(err));
});

fetch("https://api.coingecko.com/api/v3/search/trending")
	.then((res) => {
		if (!res.ok) {
			throw Error("Something went wrong");
		}
		return res.json();
	})
	.then((data) => {
		for (let i = 0; i < 3; i++) {
			getHtmlPerCoin(data.coins[i].item.id);
		}
	});

function getHtmlPerCoin(id) {
	fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
		.then((res) => {
			if (!res.ok) {
				throw Error("Something went wrong");
			}
			return res.json();
		})
		.then((data) => {
			document.getElementById("crypto").innerHTML += `
            <div class="coin-container">
                <img src=${data.image.thumb} class="icon" />
                <p>${data.name}</p>
                <p>$${data.market_data.current_price.usd}</p>
            </div>
        `;
		})
		.catch((err) => console.error(err));
}

document.getElementById("open-todos").addEventListener("click", openTodoList);
const todos = document.getElementById("todos");

function openTodoList() {
	if (todos.classList.contains("opened")) {
		todos.style.display = "none";
	} else {
		todos.style.display = "block";
	}
	todos.classList.toggle("opened");
}

const inputEl = document.getElementById("input-todo");
const todoList = document.getElementById("todo-list");
inputEl.addEventListener("keydown", handleInput);

function handleInput(event) {
	if (event.key === "Enter") {
		todoList.innerHTML += `
            <div class="task">
                <input type="checkbox">
                <p>${inputEl.value}</p>
            </div>`;
		inputEl.value = "";
	}
}
