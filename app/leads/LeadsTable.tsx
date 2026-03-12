// import { createClient } from "@/lib/supabase/server";
// import { ListLeads } from "./ListLeads";
//
// export default async function LeadsTable() {
//   const supabase = await createClient();
//
//   const { data: leads } = await supabase
//     .from("leads")
//     .select("*")
//     .order("created_at", { ascending: false });
//
//   return <ListLeads leads={leads ?? []} />;
// }
