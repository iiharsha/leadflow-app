import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { ListLeads } from "./ListLeads";

async function LeadsTable() {
  const supabase = await createClient();

  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  return <ListLeads leads={leads ?? []} />;
}

export default function LeadsPage() {

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-foreground">Leads</h1>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>
      <Suspense>
        <LeadsTable />
      </Suspense>
    </div>
  );
}
