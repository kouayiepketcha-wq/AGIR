// ==========================================================================
// AGIR FinTech - Supabase Client Connection Manager
// ==========================================================================
import { createClient } from '@supabase/supabase-js';
// Retrieve credentials from environment variables (fallback to local mock configs for build tests)
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-anon-key';
// Initialize Client with secure settings
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
    },
    db: {
        schema: 'public'
    }
});
//# sourceMappingURL=supabaseClient.js.map