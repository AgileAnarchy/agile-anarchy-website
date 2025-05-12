import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Initialize Supabase
const supabaseUrl = 'https://uyqogqhwxqvjsjgywplp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5cW9ncWh3eHF2anNqZ3l3cGxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNjU5NDksImV4cCI6MjA2MjY0MTk0OX0.Dj-aauw8eQbtoNtxkmY9xXmWwJlwjwZZ3eRS28RxHCg';
const supabase = createClient(supabaseUrl, supabaseKey);

// Elements
const createRoomBtn = document.getElementById('createRoomBtn');

createRoomBtn.addEventListener('click', async () => {
  const roomCode = generateRoomCode();

  // Save the room to Supabase
  const { data, error } = await supabase
    .from('rooms')
    .insert([{ code: roomCode, created_at: new Date().toISOString() }]);

  if (error) {
    console.error('Failed to create room:', error);
    alert('Error creating room.');
    return;
  }

  // Redirect to gm_room.html with the room code as a query parameter
  window.location.href = `gm_room.html?room=${roomCode}`;
});

// Utility: Generate a 4-character alphanumeric room code
function generateRoomCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
