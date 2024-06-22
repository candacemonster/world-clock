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
  
  function updateTime() {
    // Zulu Time
    let zuluTime = moment().utc();
    updateTimeDisplay("zulu", "Zulu Time (UTC+00:00)", zuluTime);
  
    // Selected City or Opposite of Zulu Time
    if (selectedCity) {
      let cityTime = moment().tz(selectedCity);
      let cityName = selectedCity.split("/")[1].replace("_", " ");
      let utcOffset = cityTime.format("Z");
      updateTimeDisplay("opposite", `${cityName} (UTC${utcOffset})`, cityTime);
    } else {
      // Opposite of Zulu Time (UTC-12:00)
      let oppositeTime = moment().tz("Etc/GMT+12");
      updateTimeDisplay("opposite", "Opposite Zulu (UTC-12:00)", oppositeTime);
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
      option.textContent = timezone.split('/')[1].replace('_', ' ');
      select.appendChild(option);
    });
  }
  
  function updateCity(event) {
    selectedCity = event.target.value;
    if (!selectedCity) {
      selectedCity = null; 
    }
    updateTime(); 
  
  document.addEventListener('DOMContentLoaded', (event) => {
    populateSelect();
    
    const select = document.getElementById('city');
    select.addEventListener('change', updateCity);
  
    updateTime();
    setInterval(updateTime, 1000);
  });