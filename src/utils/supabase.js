import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fdkuwxubdhsszvfebdqr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZka3V3eHViZGhzc3p2ZmViZHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyNDkzNTgsImV4cCI6MjA0MTgyNTM1OH0.lUtQ9vdj6UG8X0MloI-KFqXJbYfM-NHiP-fhI6B3Txc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)