import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://wffzfzrjvpqivlkoiyqi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmZnpmenJqdnBxaXZsa29peXFpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzkxMzM5OCwiZXhwIjoyMDc5NDg5Mzk4fQ.I2hUtJqxaNj_0r752v8VopV0WXX1eSfjz0PlR7rik9I';
export const supabase = createClient(supabaseUrl, supabaseKey);