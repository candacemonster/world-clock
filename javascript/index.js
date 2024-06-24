const globalTimezones = [
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
const userTimezone = moment.tz.guess();

document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('city');
    const returnToZuluBtn = document.getElementById('return-to-zulu');

    populateSelect(select);
    updateTime();

    setInterval(updateTime, 1000);

    select.addEventListener('change', updateCity);
    returnToZuluBtn.addEventListener('click', () => {
        selectedCity = null;
        select.value = ""; // Reset the selection to "Select a location"
        updateTime();
    });
});

function populateSelect(select) {
    select.innerHTML = `
        <option value="">Select a location</option>
        <option value="current">Current Location (${userTimezone.split('/')[1].replace('_', ' ')})</option>
        ${globalTimezones.map(tz => `<option value="${tz}">${tz.split('/')[1].replace('_', ' ')}</option>`).join('')}
    `;
}

function updateCity(event) {
    selectedCity = event.target.value === "current" ? userTimezone : event.target.value;
    updateTime();
}

function updateTime() {
    const zuluTime = moment().utc();
    updateTimeDisplay("zulu", "Zulu Time (UTC+00:00)", zuluTime);

    if (selectedCity) {
        const cityTime = moment().tz(selectedCity);
        const cityName = selectedCity === userTimezone ? "Current Location" : selectedCity.split('/')[1].replace('_', ' ');
        const utcOffset = cityTime.format("Z");
        updateTimeDisplay("opposite", `${cityName} (UTC${utcOffset})`, cityTime);
    } else {
        document.getElementById('opposite').innerHTML = '';
    }
}

function updateTimeDisplay(elementId, title, time) {
    document.getElementById(elementId).innerHTML = `
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
