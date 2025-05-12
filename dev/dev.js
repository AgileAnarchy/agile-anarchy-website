// dev.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Initialize Supabase
const supabase = createClient(
  'https://uyqogqhwxqvjsjgywplp.supabase.co',  // Replace with your Supabase URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5cW9ncWh3eHF2anNqZ3l3cGxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNjU5NDksImV4cCI6MjA2MjY0MTk0OX0.Dj-aauw8eQbtoNtxkmY9xXmWwJlwjwZZ3eRS28RxHCg'  // Replace with your Supabase public API key
);

// Handle Create Room Button click
document.getElementById("createRoomBtn").addEventListener("click", async () => {
  const roomCode = generateRoomCode();

  // Insert new game room into Supabase
  const { data, error } = await supabase
    .from("game_rooms")
    .insert([
      {
        room_code: roomCode,
        status: "waiting",
        player_count: 0,
      },
    ])
    .select();  // Include .select() to get the inserted row

  if (error || !data) {
    console.error("Room creation failed:", error);
    return;
  }

  // Save roomCode and roomId in localStorage
  localStorage.setItem("roomCode", roomCode);
  localStorage.setItem("roomId", data[0].room_id);

  // Redirect to GM room page
  window.location.href = "gm_room.html";
});

// Function to generate a random room code (for simplicity)
function generateRoomCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}
