const apiKey = "rVQFFCankywibrPQbhYO2g==Z0WFgsTrqVbabiUi";

document.addEventListener("DOMContentLoaded", () => {
    const prepareBtn = document.getElementById("build-plan");

    prepareBtn.addEventListener("click", async () => {
        const planSelect = document.getElementById("plan-select").value;
        const levelSelect = document.getElementById("level-select").value;
        const resultsDisplay = document.getElementById("results");
        const messageDisplay = document.getElementById("displayR");

        if (planSelect && levelSelect) {
            messageDisplay.textContent = "Preparing your Plan...";
            messageDisplay.style.color = "green";

            const muscles = getMusclesByRegion(planSelect);
            const allExercises = [];

            for (const muscle of muscles) {
                const url = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}&difficulty=${levelSelect}`;

                try {
                    const response = await fetch(url, {
                        headers: { 'X-Api-Key': apiKey }
                    });

                    if (!response.ok) {
                        throw new Error(`Failed to fetch for ${muscle}`);
                    }

                    const data = await response.json();
                    allExercises.push(...data);

                } catch (error) {
                    console.error("Error fetching:", error);
                }
            }

            displayResults(allExercises);
            messageDisplay.textContent = "";

        } else {
            messageDisplay.textContent = "Please select all required fields.";
            messageDisplay.style.color = "#810000";
        }
    });
});

function getMusclesByRegion(region) {
    const upper = ["biceps", "triceps", "chest", "shoulders", "lats", "traps"];
    const lower = ["quadriceps", "hamstrings", "calves", "glutes", "lower_back"];
    const full = [...upper, ...lower, "abdominals"];
    if (region === "upper") return upper;
    if (region === "lower") return lower;
    return full;
}

function displayResults(exercises, level) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (exercises.length === 0) {
        resultsDiv.innerHTML = "<p>No exercises found.</p>";
        return;
    }

    // Determine reps and sets
    let repsSets = "";
    if (level === "beginner") repsSets = "3 sets × 10–12 reps";
    else if (level === "intermediate") repsSets = "4 sets × 8–10 reps";
    else if (level === "expert") repsSets = "5 sets × 6–8 reps";

    exercises.forEach((ex) => {
        const card = document.createElement("div");
        card.className = "exercise-card";
        card.innerHTML = `
            <h3>${ex.name}</h3>
            <p><strong>Muscle:</strong> ${ex.muscle}</p>
            <p><strong>Difficulty:</strong> ${ex.difficulty}</p>
            <p><strong>Sets & Reps:</strong> ${repsSets}</p>
            <p><strong>Instructions:</strong> ${ex.instructions}</p>
            <hr>
        `;
        resultsDiv.appendChild(card);
    });
}