document.getElementById("createRoomBtn").addEventListener("click", () => {
  const roomCode = generateRoomCode();
  document.getElementById("roomDisplay").innerHTML = `Room Code: <strong>${roomCode}</strong>`;
});

function generateRoomCode() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  let code = "AN";
  for (let i = 0; i < 4; i++) {
    code += Math.random() < 0.5
      ? letters[Math.floor(Math.random() * letters.length)]
      : numbers[Math.floor(Math.random() * numbers.length)];
  }
  return code;
}
