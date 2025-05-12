document.getElementById("createRoomBtn").addEventListener("click", () => {
  const roomCode = generateRoomCode();
  const roomURL = `https://agile-anarchy.com/dev/room/${roomCode}`;

  // Display room code
  document.getElementById("roomDisplay").innerHTML = `Room Code: <strong>${roomCode}</strong>`;

  // Clear any previous QR code
  document.getElementById("qrcode").innerHTML = "";

  // Generate QR code
  new QRCode(document.getElementById("qrcode"), {
    text: roomURL,
    width: 200,
    height: 200,
    colorDark: "#ffffff",
    colorLight: "#111111",
    correctLevel: QRCode.CorrectLevel.H
  });
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
