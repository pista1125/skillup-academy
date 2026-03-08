import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
    console.log("Registering test user...")
    const email = `test${Date.now()}@example.com`
    const { data, error } = await supabase.auth.signUp({
        email,
        password: 'password123',
        options: {
            data: { full_name: 'Teszt Elek' }
        }
    })
    if (error) {
        console.error("SignUp Error:", error)
        return
    }
    console.log("User:", data.user?.id)

    // Wait a sec for trigger
    await new Promise(r => setTimeout(r, 1000))

    console.log("Fetching profile from db...")
    const { data: profile, error: err2 } = await supabase.from('profiles').select('*').eq('id', data.user.id).single()
    console.log("Profile error:", err2)
    console.log("Profile:", profile)
}

test()
