// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

async function fetchAlerts(KE) {
    try {
        showLoadingSpinner();
        const response = await fetch(`https://api.weather.gov/alerts/active?area=${KE}`);
        if (!response.ok) { throw new Error(`invalid state code or network error`); }
        const data = await response.json();
        hideLoadingSpinner();
        displayAlerts(KE, data);
    } catch (error) {
        hideLoadingSpinner();
        displayError(error.message);
    }
}

function displayAlerts(KE, data) {
    clearUI();

    const summary = document.getElementById("alerts-display");
    const alertsList = document.getElementById("alerts-list");

    const count = data.features.length;

    summary.textContent = `Weather Alerts: ${count}`;

    data.features.forEach(alert => {
        const li = document.createElement("li");
        li.textContent = alert.properties.headline;
        alertsList.appendChild(li);
    });
}

function displayError(message) {
    const errorElement = document.getElementById("error-message");
    errorElement.textContent = message;
    errorElement.classList.remove("hidden");
    errorElement.classList.add("error");
}

function clearUI() {
    document.getElementById("state-input").value = "";
    document.getElementById("alerts-display").textContent = "";
    document.getElementById("alerts-list").innerHTML = "";
    const errorElement = document.getElementById("error-message");
    errorElement.textContent = "";
    errorElement.classList.add("hidden");
    errorElement.classList.remove("error");
}

function showLoadingSpinner() {
    document.getElementById("spinner").classList.remove("hidden");
}

function hideLoadingSpinner() {
    document.getElementById("spinner").classList.add("hidden");
}

document.getElementById("fetch-alerts").addEventListener("click", () => {
    const stateInput = document.getElementById("state-input").value.trim();
    if (!/^[A-Z]{2}$/.test(stateInput)) {
        displayError("Please enter a valid two-letter state abbreviation.");
        return;
    }
    fetchAlerts(stateInput);
});