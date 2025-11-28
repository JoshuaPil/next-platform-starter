import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gizymmdrzncwkeyenjvt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpenltbWRyem5jd2tleWVuanZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNDI5MzIsImV4cCI6MjA3OTkxODkzMn0.9VgeylTO-IaiDYXJKd33GjlvTbm9FGOFgWE3zf4l6Y8'

export const supabase = createClient(supabaseUrl, supabaseKey)
