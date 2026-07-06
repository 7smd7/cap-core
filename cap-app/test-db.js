const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
async function run() {
  const { data, error } = await supabase.from('leases').select('*');
  console.log('leases:', error?.message || data?.length);
  const { data: b, error: e2 } = await supabase.from('bookings').select('*');
  console.log('bookings:', e2?.message || b?.length);
  const { data: s, error: e3 } = await supabase.from('service_requests').select('*');
  console.log('service_requests:', e3?.message || s?.length);
}
run();
