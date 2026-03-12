'use client';

import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Lead, LEAD_SOURCES, LEAD_STATUSES, LeadStatus, STATUS_LABELS } from "@/types/crm";
import { useState } from "react";
import { Search } from "lucide-react";
import { format } from "date-fns";


type ListLeadsProps = {
  leads: Lead[],
}

export function ListLeads({ leads }: ListLeadsProps) {

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return leads!.filter(lead => {
      const matchesSearch = !search ||
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone.includes(search);
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [leads, search, statusFilter, sourceFilter]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {LEAD_STATUSES.map(s => (
              <SelectItem key={s} value={s}>{STATUS_LABELS[s as LeadStatus]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            {LEAD_SOURCES.map(s => (
              <SelectItem key={s} value={s}>{s.replace('_', ' ')}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Phone</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">City</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden sm:table-cell">Source</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden lg:table-cell">Created</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(lead => (
                <tr key={lead.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{lead.name}</td>
                  <td className="px-4 py-3 font-mono text-sm text-muted-foreground">{lead.phone}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{lead.city || '—'}</td>
                  <td className="px-4 py-3 text-muted-foreground capitalize hidden sm:table-cell">{lead.source.replace('_', ' ')}</td>
                  <td className="px-4 py-3"><StatusBadge status={lead.status} /></td>
                  <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{format(new Date(lead.created_at), 'MMM d, yyyy')}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/leads/${lead.id}`}>
                      <Button variant="ghost" size="sm" className="gap-1.5">
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                    No leads found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
