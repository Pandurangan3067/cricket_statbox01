const teamFilter = document.getElementById("teamFilter");
const searchPlayer = document.getElementById("searchPlayer");
const playersList = document.getElementById("playersList");

// Populate the team filter dropdown dynamically
function populateTeams() {
  const teams = [...new Set(players.map(p => p.team))];
  teams.forEach(team => {
    const option = document.createElement("option");
    option.value = team;
    option.textContent = team;
    teamFilter.appendChild(option);
  });
}

// Render players to the page
function renderPlayers(filteredPlayers) {
  playersList.innerHTML = "";

  if (filteredPlayers.length === 0) {
    playersList.textContent = "No players found.";
    return;
  }

  filteredPlayers.forEach(player => {
    const card = document.createElement("div");
    card.classList.add("player-card");

    card.innerHTML = `
      <h3>${player.name}</h3>
      <p><strong>Team:</strong> ${player.team}</p>
      <p><strong>Role:</strong> ${player.role}</p>
      <p><strong>Matches:</strong> ${player.matches}</p>
      <p><strong>Runs:</strong> ${player.runs}</p>
      <p><strong>Wickets:</strong> ${player.wickets}</p>
      <p><strong>Average:</strong> ${player.average}</p>
    `;

    playersList.appendChild(card);
  });
}

// Filter players based on team and search input
function filterPlayers() {
  const selectedTeam = teamFilter.value;
  const searchTerm = searchPlayer.value.toLowerCase();

  const filtered = players.filter(player => {
    const matchesTeam = selectedTeam === "All" || player.team === selectedTeam;
    const matchesSearch = player.name.toLowerCase().includes(searchTerm);
    return matchesTeam && matchesSearch;
  });

  renderPlayers(filtered);
}

// Initialize page
populateTeams();
renderPlayers(players);
teamFilter.addEventListener("change", filterPlayers);
searchPlayer.addEventListener("input", filterPlayers);
