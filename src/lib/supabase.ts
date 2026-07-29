const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://dzsvcxtxsxtmtrbcmstw.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "";

export const supabase = {
    functions: {
        async invoke(functionName: string, options: { body?: any }) {
            try {
                const response = await fetch(`${supabaseUrl}/functions/v1/${functionName}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${supabaseAnonKey}`,
                        'apikey': supabaseAnonKey
                    },
                    body: JSON.stringify(options?.body || {})
                });
                const data = await response.json();
                if (!response.ok) {
                    return { data: null, error: data };
                }
                return { data, error: null };
            } catch (error) {
                return { data: null, error };
            }
        }
    }
};

export default supabase;
