// Handle "Create Game" button click
document.getElementById("createGameBtn").addEventListener("click", () => {
  // Generate a unique room code (e.g., AN1234)
  const roomCode = `AN${Math.floor(Math.random() * 9000) + 1000}`;

  // Store room code in localStorage
  localStorage.setItem("roomCode", roomCode);

  // Redirect the Game Master to the generated room (GM will be able to see all players)
  window.location.href = `room.html?code=${roomCode}&role=gm`;
});

// Handle "Join Game" button click
document.getElementById("joinGameBtn").addEventListener("click", () => {
  // Ask the player to enter the room code
  const roomCode = prompt("Enter the room code:");

  if (roomCode) {
    // Redirect the player to the game room page with the entered room code
    window.location.href = `room.html?code=${roomCode}&role=player`;
  } else {
    alert("Please enter a valid room code!");
  }
});
