document.addEventListener("DOMContentLoaded", () => { 
    const prepareBtn = document.getElementById("build-plan");
    prepareBtn.addEventListener("click", () => {
        const planSelect = document.getElementById("plan-select").value;
        const levelSelect = document.getElementById("level-select").value;

        const resultsDisplay = document.getElementById("results");
        if (planSelect && levelSelect) {
            resultsDisplay.textContent = "Preparing your Plan";
            resultsDisplay.style.color = "green";
        } else {
            resultsDisplay.textContent = "Please Select all Required Fields.";
            resultsDisplay.style.color = "#810000";
        }
    })
})
