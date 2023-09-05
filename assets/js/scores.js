const highscoresList = document.getElementById("highscores");
const highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

highscoresList.innerHTML = highscores
    .map(score => {
        return `<li class="high-score">${score.initials} - ${score.score}</li>`;
    })
    .join("");

document.getElementById("clear").addEventListener("click", function() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
});
