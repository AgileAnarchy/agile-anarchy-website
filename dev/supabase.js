// supabase.js
const supabaseUrl = 'https://uyqogqhwxqvjsjgywplp.supabase.co';  // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5cW9ncWh3eHF2anNqZ3l3cGxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNjU5NDksImV4cCI6MjA2MjY0MTk0OX0.Dj-aauw8eQbtoNtxkmY9xXmWwJlwjwZZ3eRS28RxHCg';  // Replace with your Supabase public key

// Initialize Supabase client
const supabase = supabase.createClient(supabaseUrl, supabaseKey);
