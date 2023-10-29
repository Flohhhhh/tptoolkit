import { supabase } from "@/utils/supabase/client";

export default async function Notes() {
  const { data: notes } = await supabase.from("geo").select();

  return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}
