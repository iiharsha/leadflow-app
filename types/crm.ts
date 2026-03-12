export interface Lead {
  id: string;
  name: string;
  phone: string;
  city: string;
  source: string;
  status: LeadStatus;
  created_at: string;
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'follow_up' | 'won' | 'lost';

export const LEAD_STATUSES: LeadStatus[] = ['new', 'contacted', 'qualified', 'follow_up', 'won', 'lost'];

export const LEAD_SOURCES = ['website', 'referral', 'social_media', 'cold_call', 'advertisement', 'other'];

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  follow_up: 'Follow Up',
  won: 'Won',
  lost: 'Lost',
};

export interface LeadNote {
  id: string;
  lead_id: string;
  note_text: string;
  created_at: string;
}
