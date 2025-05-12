function generateRoomCode() {
  const prefix = "AN";
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${randomDigits}`;
}

document.getElementById("createGameBtn").addEventListener("click", () => {
  const roomCode = generateRoomCode();
  localStorage.setItem("roomCode", roomCode);
  window.location.href = `room.html?code=${roomCode}`;
});
