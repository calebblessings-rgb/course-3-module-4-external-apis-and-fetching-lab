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
    
    const alertsList = document.getElementById("alerts-display");
    const displayDiv = document.getElementById("alerts-count");
    const summary = document.getElementById("summary");

    const count = data.features.length;
    displayDiv.textContent = `Weather Alerts: ${count}`;
    summary.textContent = `Current watches, warnings, and advisories for ${KE}: ${count}`;

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
    const displayDiv = document.getElementById("alerts-display");
    displayDiv.textContent = "";

    const errorElement = document.getElementById("error-message");
    errorElement.textContent = "";
    errorElement.classList.remove("error");
    errorElement.classList.add("hidden");



function showLoadingSpinner() {
    document.getElementById("spinner").style.display = "block";
}

function hideLoadingSpinner() {
    document.getElementById("spinner").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("fetch-alerts");
    if (button) {
        button.addEventListener("click", () => {
            const stateInput = document.getElementById("state-input").value.trim();
            if (!/^[A-Z]{2}$/.test(stateInput)) {
                displayError("Please enter a valid two-letter state abbreviation.");
                return;
            }
            fetchAlerts(stateInput);
        });
    }
});

module.exports = { fetchAlerts, displayAlerts, displayError, clearUI };
