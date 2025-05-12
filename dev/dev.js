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

// When the Game Master enters the room page
window.onload = function() {
  // Retrieve room code and role from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const roomCode = urlParams.get('code');
  const role = urlParams.get('role');

  // If role is GM, proceed to display the room info
  if (role === 'gm') {
    // Show the room code and GM role info
    document.getElementById('roomCode').innerText = `Room Code: ${roomCode}`;
    document.getElementById('roleInfo').innerText = "You are the Game Master!";
    
    // Generate the QR code
    const qrCodeData = `${window.location.origin}/dev/${roomCode}`; // QR code that players will scan
    QRCode.toCanvas(document.getElementById('qrCode'), qrCodeData, function(error) {
      if (error) console.error(error);
      console.log("QR code generated successfully!");
    });
  }
};
