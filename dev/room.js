const urlParams = new URLSearchParams(window.location.search);
const roomCode = urlParams.get("code");

document.getElementById("roomCodeDisplay").textContent = roomCode;

const qr = new QRious({
  element: document.getElementById("qrCode"),
  value: window.location.href,
  size: 200
});
