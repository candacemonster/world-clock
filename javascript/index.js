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
let userTimezone = moment.tz.guess();

function updateTime() {
    // Zulu Time
    let zuluTime = moment().utc();
    updateTimeDisplay("zulu", "Zulu Time (UTC+00:00)", zuluTime);

    // Selected City or Current Location
    if (selectedCity) {
        let cityTime = moment().tz(selectedCity);
        let cityName = selectedCity.replace("_", " ").split("/")[1];
        let utcOffset = cityTime.format("Z");
        updateTimeDisplay("opposite", `${cityName} (UTC${utcOffset})`, cityTime);
    } else if (userTimezone) {
        let cityTime = moment().tz(userTimezone);
        let cityName = "Current Location";
        let utcOffset = cityTime.format("Z");
        updateTimeDisplay("opposite", `${cityName} (UTC${utcOffset})`, cityTime);
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

function populateSelect() {
    const select = document.getElementById('city');
    globalTimezones.forEach(timezone => {
        const option = document.createElement('option');
        option.value = timezone;
        option.textContent = timezone.replace('_', ' ').split('/')[1];
        select.appendChild(option);
    });
}

function updateCity(event) {
    const selectedValue = event.target.value;
    if (selectedValue === "current") {
        selectedValue = moment.tz.guess();
    } else {
        selectedCity = selectedValue;
        updateTime();
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    populateSelect();
    
    const select = document.getElementById('city');
    select.addEventListener('change', updateCity);

    updateTime();
    setInterval(updateTime, 1000);
});
