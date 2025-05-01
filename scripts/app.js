document.addEventListener("DOMContentLoaded", () => {
    searchBtn = document.getElementById("search-button");
    searchBtn.addEventListener("click", () => {
        const apiKey = "rVQFFCankywibrPQbhYO2g==Z0WFgsTrqVbabiUi";


    })
})

function searchExercises() {
    const query = document.getElementById("search-input").value.trim();
    const url = `https://api.api-ninjas.com/v1/exercises?name=${encodeURIComponent(query)}`;

}