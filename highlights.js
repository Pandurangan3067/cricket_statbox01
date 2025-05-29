
const matchHighlights = document.getElementById("matchHighlights");

// Show latest matches (sorted by date descending)
function showHighlights() {
  const sortedMatches = matches.sort((a, b) => new Date(b.date) - new Date(a.date));

  sortedMatches.forEach(match => {
    const card = document.createElement("div");
    card.className = "match-card";

    card.innerHTML = `
      <h3>${match.team1} vs ${match.team2}</h3>
      <p><strong>Date:</strong> ${match.date}</p>
      <p><strong>Score:</strong> ${match.team1}: ${match.score1} | ${match.team2}: ${match.score2}</p>
      <p><strong>Winner:</strong> ${match.winner}</p>
      <p><strong>Man of the Match:</strong> ${match.manOfTheMatch}</p>
      <a href="match-details.html?id=${match.id}">View Full Match</a>
    `;

    matchHighlights.appendChild(card);
  });
}

showHighlights();
