'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { LEAD_SOURCES, LEAD_STATUSES, LeadStatus, STATUS_LABELS } from "@/types/crm";
import { useState } from "react";
import { Search } from "lucide-react";

export function SearchLeads() {

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  return (
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
  );
}
