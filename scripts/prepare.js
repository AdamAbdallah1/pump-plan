document.addEventListener("DOMContentLoaded", () => { 
    const prepareBtn = document.getElementById("build-plan");
    prepareBtn.addEventListener("click", () => {
        const planSelect = document.getElementById("plan-select").value;
        const levelSelect = document.getElementById("level-select").value;

        console.log(planSelect, levelSelect);
    })
})
