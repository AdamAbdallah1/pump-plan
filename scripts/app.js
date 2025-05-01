document.addEventListener("DOMContentLoaded", () => {
    searchBtn = document.getElementById("search-button");
    searchBtn.addEventListener("click", () => {
        searchExercises();
    })
})

async function searchExercises() {
    const query = document.getElementById("search-input").value.trim();
    const url = `https://api.api-ninjas.com/v1/exercises?name=${encodeURIComponent(query)}`;
    const apiKey = "rVQFFCankywibrPQbhYO2g==Z0WFgsTrqVbabiUi";


    try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'X-Api-Key': apiKey
          }
        });
  
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
  
        const data = await response.json();
        displayResults(data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
        document.getElementById('results').innerHTML = `<p>Error fetching exercises.</p>`;
    }

    function displayResults(exercises) {
    const container = document.getElementById('results');
    container.innerHTML = '';
    if (exercises.length === 0) {
        container.innerHTML = "<p>No exercises found.</p>";
        return;
    }

    exercises.forEach((ex) => {
        const card = document.createElement('div');
        card.className = 'exercise-card';
        card.innerHTML = `
            <h3>${ex.name}</h3>
            <p><strong>Type:</strong> ${ex.type}</p>
            <p><strong>Muscle:</strong> ${ex.muscle}</p>
            <p><strong>Difficulty:</strong> ${ex.difficulty}</p>
            <p><strong>Instructions:</strong> ${ex.instructions}</p>
        `;
        container.appendChild(card);
    });
}
}