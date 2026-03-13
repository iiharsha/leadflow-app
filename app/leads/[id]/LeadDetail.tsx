'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { LEAD_STATUSES, STATUS_LABELS } from '@/types/crm';
import type { LeadStatus } from '@/types/crm';
import {
  ArrowLeft,
  Phone,
  MapPin,
  Globe,
  Calendar,
  MessageSquarePlus,
  Clock,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import { StatusBadge } from '@/components/status-badge';

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

type Props = {
  lead: Lead;
  initialNotes: Note[];
};

export default function LeadDetail({ lead, initialNotes }: Props) {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [noteText, setNoteText] = useState('');
  const [currentStatus, setCurrentStatus] = useState(lead.status);
  const [isPendingNote, startNoteTransition] = useTransition();
  const [isPendingStatus, startStatusTransition] = useTransition();

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    const text = noteText.trim();
    setNoteText('');

    startNoteTransition(async () => {
      try {
        const res = await fetch(`/api/leads/${lead.id}/notes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ note_text: text }),
        });

        if (!res.ok) throw new Error('Failed to add note');

        const newNote: Note = await res.json();
        setNotes((prev) => [newNote, ...prev]);
        toast.success('Note added');
        router.refresh();
      } catch {
        toast.error('Failed to add note');
        setNoteText(text); // restore if failed
      }
    });
  };

  const handleStatusChange = (newStatus: string) => {
    const prev = currentStatus;
    setCurrentStatus(newStatus);

    startStatusTransition(async () => {
      try {
        const res = await fetch(`/api/leads/${lead.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        });

        if (!res.ok) throw new Error('Failed to update status');

        toast.success(`Status updated to ${STATUS_LABELS[newStatus as LeadStatus]}`);
        router.refresh();
      } catch {
        setCurrentStatus(prev); // rollback optimistic update
        toast.error('Failed to update status');
      }
    });
  };

  const formatNoteTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffHours = (now.getTime() - date.getTime()) / 3600000;
    if (diffHours < 24) return format(date, 'h:mm a');
    if (diffHours < 48) return 'Yesterday';
    return format(date, 'MMM d, yyyy');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {lead.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            Lead details & interaction history
          </p>
        </div>
        <StatusBadge status={currentStatus as LeadStatus} />
      </div>

      {/* Lead Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                <Phone className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Phone</p>
                <p className="font-mono font-medium text-foreground">{lead.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">City</p>
                <p className="font-medium text-foreground">{lead.city || '—'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                <Globe className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Source</p>
                <p className="font-medium capitalize text-foreground">
                  {lead.source?.replace('_', ' ') || '—'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Created</p>
                <p className="font-medium text-foreground">
                  {format(new Date(lead.created_at), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
          </div>

          {/* Status Update */}
          <div className="mt-4 pt-4 border-t flex items-center gap-3">
            <Label className="text-sm text-muted-foreground">Update Status</Label>
            <Select
              value={currentStatus}
              onValueChange={handleStatusChange}
              disabled={isPendingStatus}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LEAD_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Add Note */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquarePlus className="h-5 w-5" />
            Add Note
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddNote} className="space-y-3">
            <Textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="e.g., Customer asked for pricing details..."
              rows={3}
              disabled={isPendingNote}
            />
            <Button
              type="submit"
              disabled={!noteText.trim() || isPendingNote}
              size="sm"
            >
              {isPendingNote ? 'Adding...' : 'Add Note'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Notes Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Interaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {notes.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No notes yet. Add your first interaction above.
            </p>
          ) : (
            <div className="space-y-0">
              {notes.map((note, i) => (
                <div key={note.id} className="relative flex gap-4 pb-6 last:pb-0">
                  {/* Timeline connector line */}
                  {i < notes.length - 1 && (
                    <div className="absolute left-[11px] top-6 bottom-0 w-px bg-border" />
                  )}
                  {/* Timeline dot */}
                  <div className="relative z-10 mt-1.5 h-[9px] w-[9px] shrink-0 rounded-full bg-primary ring-2 ring-background" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{note.note_text}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatNoteTime(note.created_at)} ·{' '}
                      {formatDistanceToNow(new Date(note.created_at), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
