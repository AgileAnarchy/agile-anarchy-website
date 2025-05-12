function generateRoomCode() {
  const prefix = "AN";
  const randomDigits = Math.floor(1000 + Math.random() * 9000); // 4-digit number
  return `${prefix}${randomDigits}`;
}

document.getElementById("createGameBtn").addEventListener("click", () => {
  const roomCode = generateRoomCode();

  // Save room code temporarily in localStorage if needed later
  localStorage.setItem("roomCode", roomCode);

  // Redirect to dynamically generated room page
  window.location.href = `dev/${roomCode}/index.html`;
});
