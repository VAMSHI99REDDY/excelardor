import { NextResponse } from 'next/server';
import { createServerComponentClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = createServerComponentClient();
  const email = 'admin@excelardor.com';
  const password = 'AdminPassword123!';

  // Try creating the admin user
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) {
    // If the user already exists, update the password to AdminPassword123!
    const { data: listData } = await supabase.auth.admin.listUsers();
    const existing = listData?.users?.find((u) => u.email === email);
    if (existing) {
      const { error: updateError } = await supabase.auth.admin.updateUserById(existing.id, {
        password,
        email_confirm: true,
      });
      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }
      return NextResponse.json({
        success: true,
        message: 'Existing admin user password reset successfully',
        email,
        password,
      });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: 'Admin user created successfully',
    email,
    password,
  });
}
