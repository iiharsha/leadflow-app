import type { LeadStatus } from '@/types/crm';
import { STATUS_LABELS } from '@/types/crm';
import { cn } from '@/lib/utils';

const statusStyles: Record<LeadStatus, string> = {
  new: 'bg-status-new/10 text-status-new border-status-new/20',
  contacted: 'bg-status-contacted/10 text-status-contacted border-status-contacted/20',
  qualified: 'bg-status-qualified/10 text-status-qualified border-status-qualified/20',
  follow_up: 'bg-status-follow-up/10 text-status-follow-up border-status-follow-up/20',
  won: 'bg-status-won/10 text-status-won border-status-won/20',
  lost: 'bg-status-lost/10 text-status-lost border-status-lost/20',
};

export const StatusBadge = ({ status }: { status: LeadStatus }) => (
  <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold', statusStyles[status])}>
    {STATUS_LABELS[status]}
  </span>
);
