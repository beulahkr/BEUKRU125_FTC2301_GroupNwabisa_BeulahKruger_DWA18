import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://vmgyxrziboecxguxyica.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtZ3l4cnppYm9lY3hndXh5aWNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA2NjUyNjUsImV4cCI6MjAwNjI0MTI2NX0.WnRSJzOLc2tAUfBX_pjPA7LstOsWzNgxe14EtO81WC4';

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);


export default supabase;
