import { createClient } from '@supabase/supabase-js'

// Asegurate de tener estas variables de entorno configuradas en un archivo .env o exportadas en tu shell
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testLogin() {
  const email = 'admin@example.com'    // Cambialo por tu email de admin real
  const password = 'admin123'           // Cambialo por tu contraseña real

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Login correcto:', data)
  }
}

testLogin()
