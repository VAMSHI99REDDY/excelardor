import { createClient } from '@supabase/supabase-js'

export const createServerComponentClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // We use service role on the server for admin tasks and bypassing RLS when creating
  )
}
