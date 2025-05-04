const apiKey = "rVQFFCankywibrPQbhYO2g==Z0WFgsTrqVbabiUi";

document.addEventListener("DOMContentLoaded", () => {
    const prepareBtn = document.getElementById("build-plan");
    const downloadBtn = document.getElementById("download-plan");
    const messageDisplay = document.getElementById("displayR");

    let currentExercises = [];
    let currentLevel = "";

    prepareBtn.addEventListener("click", async () => {
        const planSelect = document.getElementById("plan-select").value;
        const levelSelect = document.getElementById("level-select").value;
        const resultsDisplay = document.getElementById("results");

        if (planSelect && levelSelect) {
            messageDisplay.textContent = "Preparing your Plan...";
            messageDisplay.style.color = "green";
            downloadBtn.style.display = "none";

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
                    allExercises.push(...data.slice(0, 2));

                } catch (error) {
                    console.error("Error fetching:", error);
                }
            }

            currentExercises = allExercises;
            currentLevel = levelSelect;

            displayResults(allExercises, levelSelect);
            downloadBtn.style.display = "block";
            messageDisplay.textContent = "";

        } else {
            messageDisplay.textContent = "Please select all required fields.";
            messageDisplay.style.color = "#810000";
        }
    });

    downloadBtn.addEventListener("click", () => {
        if (currentExercises.length > 0) {
            downloadPlanAsText(currentExercises, currentLevel);
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

    let repsSets = "";
    if (level === "beginner") repsSets = "3 sets × 10–12 reps";
    else if (level === "intermediate") repsSets = "4 sets × 8–10 reps";
    else if (level === "expert") repsSets = "5 sets × 6–8 reps";

    exercises.forEach((ex, index) => {
        const card = document.createElement("div");
        card.className = "exercise-card";
        card.innerHTML = `
            <h3>${ex.name}</h3>
            <p><strong>Muscle:</strong> ${ex.muscle}</p>
            <p><strong>Difficulty:</strong> ${ex.difficulty}</p>
            <p><strong>Sets & Reps:</strong> ${repsSets}</p>
            <button class="instruction-btn" data-index="${index}">Show Instructions</button>
            <div class="instruction-box" id="instruction-${index}" style="display: none; margin-top: 8px; background: #f9f9f9; padding: 10px; border-radius: 5px;">
                <strong>Instructions:</strong> ${ex.instructions || "No instructions available."}
            </div>
        `;
        resultsDiv.appendChild(card);
    });

    const buttons = document.querySelectorAll(".instruction-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const idx = btn.getAttribute("data-index");
            const box = document.getElementById(`instruction-${idx}`);
            box.style.display = box.style.display === "none" ? "block" : "none";
        });
    });
}

function downloadPlanAsText(exercises, level) {
    let planText = `Your Workout Plan (${level.toUpperCase()} Level)\n\n`;

    let repsSets = "";
    if (level === "beginner") repsSets = "3 sets × 10–12 reps";
    else if (level === "intermediate") repsSets = "4 sets × 8–10 reps";
    else if (level === "expert") repsSets = "5 sets × 6–8 reps";

    exercises.forEach((ex, index) => {
        planText += `${index + 1}. ${ex.name}\n`;
        planText += `   Muscle: ${ex.muscle}\n`;
        planText += `   Difficulty: ${ex.difficulty}\n`;
        planText += `   Sets & Reps: ${repsSets}\n`;
        if (ex.instructions) {
            planText += `   Instructions: ${ex.instructions}\n`;
        }
        planText += `\n`;
    });

    const blob = new Blob([planText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "workout_plan.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
