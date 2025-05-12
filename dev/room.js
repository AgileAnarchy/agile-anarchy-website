// Extract room code from URL
const urlParams = new URLSearchParams(window.location.search);
const roomCode = urlParams.get("code");

// Show it on the page
document.getElementById("roomCodeDisplay").textContent = roomCode;

// Generate QR code linking to this same room
const qr = new QRious({
  element: document.getElementById("qrCode"),
  value: window.location.href,
  size: 200
});
