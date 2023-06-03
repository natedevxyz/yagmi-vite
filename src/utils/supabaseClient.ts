import { createClient } from '@supabase/supabase-js';

const publicKey = import.meta.env.VITE_SUPABASE_KEY;

const supabaseClient = createClient(
	'https://uezouarwtqiugutkmlaa.supabase.co',
	publicKey
);

export default supabaseClient;
