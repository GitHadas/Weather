const url = 'https://api.openweathermap.org/data/2.5/weather';
let options = {
    appid: '8ee633956bad6ae1965b557a94ecfcba',
    units: 'metric',
    lang: `he`,
};

const cities = ["London", "New York", "Alaska", "Eilat"];
const details = ["temp", "feels_like", "humidity"];

const enterDetails = (data, city) => {
    let cityId = city == "New York" ? "NewYork" : city;

    let description = document.querySelector(`#${cityId} .description`);
    description.innerText = data.weather[0].description;

    let icon = document.querySelector(`#${cityId} i`);
    // icon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    //set the icon according to the temperature
    if (data.main.temp <= 20)
        icon.className = "fa fa-bolt fs-1 text-primary";
    else if (data.main.temp < 30)
        icon.className = "fa fa-cloud fs-1 text-secondary";
    else
        icon.className = "fa fa-sun-o fs-1 text-warning";

    //set the other details
    for (let i = 0; i < details.length; i++) {
        let detail = document.querySelector(`#${cityId} .${details[i]}`);
        detail.innerText = i == 2 ? `${data.main[details[i]]}%` : `${data.main[details[i]]}°C`;
    }
}

//fetch with axious library
const fetchApiAxios = async (url, options) => {
    const res = await axios.get(url, {
        headers: {
            "Content-Type": "application/json",
        },
        params: options,
    });
    console.log(res.data);
    return res.data;
};

//fetch the data for every city
for (let i = 0; i < cities.length; i++) {
    options.q = cities[i];
    fetchApiAxios(url, options)
        .then((data) => enterDetails(data, cities[i]))
        .catch((err) => console.log(err));
}