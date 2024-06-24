let globalTimezones = [
    "America/New_York",
    "America/Los_Angeles",
    "America/Chicago",
    "America/Toronto",
    "Europe/London",
    "Europe/Paris",
    "Europe/Berlin",
    "Europe/Moscow",
    "Asia/Dubai",
    "Asia/Singapore",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Australia/Sydney",
    "Pacific/Auckland",
];

let selectedCity = null;
let userTimezone = moment.tz.guess();

document.addEventListener('DOMContentLoaded', () => {
    populateSelect();
    updateTime();
    setInterval(updateTime, 1000);

    let select = document.getElementById('city');
    select.addEventListener('change', updateCity);

    let returnToZuluBtn = document.getElementById('return-to-zulu');
    returnToZuluBtn.addEventListener('click', () => {
        selectedCity = null;
        updateTime();
    });
});

function populateSelect() {
    let select = document.getElementById('city');
    globalTimezones.forEach(timezone => {
        let option = document.createElement('option');
        option.value = timezone;
        option.textContent = timezone.replace('_', ' ').split('/')[1];
        select.appendChild(option);
    });
}

function updateCity(event) {
    selectedCity = event.target.value === "current" ? userTimezone : event.target.value;
    updateTime(userTimezone);
}

function updateTime() {
    let zuluTime = moment().utc();
    updateTimeDisplay("zulu", "Zulu Time (UTC+00:00)", zuluTime);

    if (selectedCity) {
        let cityTime = moment().tz(selectedCity);
        let cityName = selectedCity === userTimezone ? "Current Location" : selectedCity.replace('_', ' ').split('/')[1];
        let utcOffset = cityTime.format("Z");
        updateTimeDisplay("opposite", `${cityName} (UTC${utcOffset})`, cityTime);
    } else {
        document.getElementById('opposite').innerHTML = '';
    }
}

function updateTimeDisplay(elementId, title, time) {
    let element = document.getElementById(elementId);
    element.innerHTML = `
        <div class="city">
            <div>
                <h2>${title}</h2>
                <div class="date">${time.format("dddd, MMMM Do YYYY")}</div>
            </div>
            <div class="time">
                ${time.format("h:mm:ss")}
                <small>${time.format("A")}</small>
            </div>
        </div>
    `;
}
