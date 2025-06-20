import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are properly configured
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const hasValidConfig = supabaseUrl && 
                      supabaseAnonKey && 
                      supabaseUrl !== 'your_supabase_url_here' &&
                      supabaseAnonKey !== 'your_supabase_anon_key_here' &&
                      isValidUrl(supabaseUrl);

if (!hasValidConfig) {
  console.warn('Supabase configuration is incomplete or invalid. Please set up your environment variables.');
  console.log('VITE_SUPABASE_URL:', supabaseUrl || 'Missing');
  console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Set' : 'Missing');
}

// Use valid placeholder values that won't cause URL construction errors
export const supabase = createClient(
  hasValidConfig ? supabaseUrl : 'https://placeholder.supabase.co',
  hasValidConfig ? supabaseAnonKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder'
);