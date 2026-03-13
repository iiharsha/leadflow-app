import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import LeadDetail from "./LeadDetail";

type Lead = {
  id: string;
  name: string;
  phone: string;
  city: string | null;
  status: string;
  source: string;
  created_at: string;
};

type Note = {
  id: string;
  note_text: string;
  created_at: string;
};

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getLeadAndNotes(id: string) {
  const supabase = await createClient();

  const [leadResult, notesResult] = await Promise.all([
    supabase
      .from("leads")
      .select("*")
      .eq("id", id)
      .single(),

    supabase
      .from("lead_notes")
      .select("id, note_text, created_at")
      .eq("lead_id", id)
      .order("created_at", { ascending: false }),
  ]);

  return {
    lead: leadResult.data,
    leadError: leadResult.error,
    notes: notesResult.data ?? [],
  };
}

export default async function Page({ params }: PageProps) {
  await connection();

  const { id } = await params;

  const { lead, leadError, notes } = await getLeadAndNotes(id);

  if (leadError || !lead) {
    notFound();
  }

  return (
    <LeadDetail
      lead={lead as Lead}
      initialNotes={notes as Note[]}
    />
  );
}
