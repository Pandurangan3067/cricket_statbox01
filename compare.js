const player1Select = document.getElementById("player1");
const player2Select = document.getElementById("player2");
const comparisonResult = document.getElementById("comparisonResult");

// Populate player selects
function populatePlayerSelects() {
  players.forEach(player => {
    const option1 = document.createElement("option");
    option1.value = player.name;
    option1.textContent = player.name;
    player1Select.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = player.name;
    option2.textContent = player.name;
    player2Select.appendChild(option2);
  });
}

// Compare players based on strikeRate, average, and wickets
function comparePlayers() {
  const p1Name = player1Select.value;
  const p2Name = player2Select.value;

  if (!p1Name || !p2Name) {
    comparisonResult.innerHTML = "<p>Please select both players.</p>";
    return;
  }
  if (p1Name === p2Name) {
    comparisonResult.innerHTML = "<p>Please select two different players.</p>";
    return;
  }

  const p1 = players.find(p => p.name === p1Name);
  const p2 = players.find(p => p.name === p2Name);

  // Helper to highlight the better value (higher is better)
  function highlight(val1, val2) {
    if (val1 > val2) return ["best", ""];
    if (val2 > val1) return ["", "best"];
    return ["", ""];
  }

  const [srClass1, srClass2] = highlight(p1.strikeRate, p2.strikeRate);
  const [avgClass1, avgClass2] = highlight(p1.average, p2.average);
  const [wktClass1, wktClass2] = highlight(p1.wickets, p2.wickets);

  // Count points per player (1 point per better stat)
  let p1Points = 0;
  let p2Points = 0;
  if (srClass1 === "best") p1Points++; else if (srClass2 === "best") p2Points++;
  if (avgClass1 === "best") p1Points++; else if (avgClass2 === "best") p2Points++;
  if (wktClass1 === "best") p1Points++; else if (wktClass2 === "best") p2Points++;

  const bestPlayer = p1Points > p2Points ? p1.name : (p2Points > p1Points ? p2.name : "Tie");

  comparisonResult.innerHTML = `
    <h2>Comparison Result</h2>
    <table>
      <thead>
        <tr>
          <th>Stat</th>
          <th>${p1.name}</th>
          <th>${p2.name}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Strike Rate</td>
          <td class="${srClass1}">${p1.strikeRate.toFixed(2)}</td>
          <td class="${srClass2}">${p2.strikeRate.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Average</td>
          <td class="${avgClass1}">${p1.average.toFixed(2)}</td>
          <td class="${avgClass2}">${p2.average.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Wickets</td>
          <td class="${wktClass1}">${p1.wickets}</td>
          <td class="${wktClass2}">${p2.wickets}</td>
        </tr>
      </tbody>
    </table>
    <h3>Best Player: ${bestPlayer}</h3>
  `;
}

player1Select.addEventListener("change", comparePlayers);
player2Select.addEventListener("change", comparePlayers);

populatePlayerSelects();
