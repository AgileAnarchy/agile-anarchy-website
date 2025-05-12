import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Initialize Supabase
const supabase = createClient(
  'https://uyqogqhwxqvjsjgywplp.supabase.co',  // Replace with your Supabase URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5cW9ncWh3eHF2anNqZ3l3cGxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNjU5NDksImV4cCI6MjA2MjY0MTk0OX0.Dj-aauw8eQbtoNtxkmY9xXmWwJlwjwZZ3eRS28RxHCg'                 // Replace with your Supabase public API key
);

// Get room info from localStorage
const roomCode = localStorage.getItem("roomCode");
const roomId = localStorage.getItem("roomId");

// Show the room code
document.getElementById("roomCodeDisplay").textContent = `Room Code: ${roomCode}`;

// Generate QR code for joining
new QRCode(document.getElementById("qrCode"), {
  text: `${window.location.origin}/dev/join.html?room=${roomCode}`,
  width: 160,
  height: 160,
});

// Function to update player list
async function fetchPlayers() {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("room_id", roomId);

  if (error) {
    console.error("Failed to fetch players:", error);
    return;
  }

  const list = document.getElementById("playerList");
  list.innerHTML = ""; // Clear old list

  data.forEach(player => {
    const li = document.createElement("li");
    li.textContent = player.name || `Player ${player.id}`;
    list.appendChild(li);
  });
}

// Real-time listener for new players
supabase
  .channel('room-' + roomId)
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'players', filter: `room_id=eq.${roomId}` },
    fetchPlayers
  )
  .subscribe();

// Initial load
fetchPlayers();
