import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oquynbqnsutyoafxikxb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xdXluYnFuc3V0eW9hZnhpa3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU0NjYwMDUsImV4cCI6MjAwMTA0MjAwNX0.gOLPY1RctXJTgKBTa0_Z7kw0ZP2oiqF8Kk7FnoZg3xE';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;