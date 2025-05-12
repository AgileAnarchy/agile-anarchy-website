// gm_room.js

// Get the room code from the URL
const urlParams = new URLSearchParams(window.location.search);
const roomCode = urlParams.get("code");

// References to HTML elements
const roomCodeEl = document.getElementById("room-code");
const playerListEl = document.getElementById("player-list");

async function fetchRoomAndPlayers() {
  // Fetch the game room details
  const { data: rooms, error: roomError } = await supabase
    .from("game_rooms")
    .select("id, code, status")
    .eq("code", roomCode)
    .single();

  if (roomError || !rooms) {
    console.error("Room not found:", roomError);
    alert("Game room not found.");
    return;
  }

  const roomId = rooms.id;
  roomCodeEl.textContent = roomCode;

  // Fetch players in the room
  const { data: players, error: playerError } = await supabase
    .from("players")
    .select("id, name, role, is_eliminated")
    .eq("game_room_id", roomId);

  if (playerError) {
    console.error("Error fetching players:", playerError);
    return;
  }

  updatePlayerList(players);

  // Subscribe to player changes in real-time
  supabase
    .channel("players-room-" + roomId)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "players", filter: `game_room_id=eq.${roomId}` },
      (payload) => {
        console.log("Change in players table:", payload);
        fetchRoomAndPlayers(); // Refresh player list on insert/delete/update
      }
    )
    .subscribe();
}

function updatePlayerList(players) {
  playerListEl.innerHTML = "";

  if (players.length === 0) {
    playerListEl.innerHTML = "<li>No players yet.</li>";
    return;
  }

  players.forEach((player) => {
    const li = document.createElement("li");
    li.textContent = `${player.name || "Unnamed Player"} - ${player.role || "Unassigned"}${player.is_eliminated ? " (Eliminated)" : ""}`;
    playerListEl.appendChild(li);
  });
}

// Run on page load
fetchRoomAndPlayers();
