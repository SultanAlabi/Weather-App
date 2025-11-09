const SUPABASE_URL = 'https://xvdvaarxjpfehjdktidd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2ZHZhYXJ4anBmZWhqZGt0aWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2Nzg3NDgsImV4cCI6MjA3ODI1NDc0OH0.iOgMxO4kSopYG1AVvniWOfKts8awZamWH3iDF6vMTTc';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function getSessionId() {
    let sessionId = localStorage.getItem('weatherAppSessionId');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('weatherAppSessionId', sessionId);
    }
    return sessionId;
}
