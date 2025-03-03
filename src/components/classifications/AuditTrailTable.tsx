import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AuditTrailEntry } from "@/types/classification";
import { ArrowUpDown, DownloadIcon } from "lucide-react";
import { useState } from "react";

interface AuditTrailTableProps {
  entries: AuditTrailEntry[];
}

export function AuditTrailTable({ entries }: AuditTrailTableProps) {
  const [timestampFilter, setTimestampFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [firmFilter, setFirmFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [sortField, setSortField] = useState<keyof AuditTrailEntry | null>(
    null
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof AuditTrailEntry) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredEntries = entries.filter((entry) => {
    return (
      entry.timestamp.toLowerCase().includes(timestampFilter.toLowerCase()) &&
      entry.userName.toLowerCase().includes(userFilter.toLowerCase()) &&
      entry.firmName.toLowerCase().includes(firmFilter.toLowerCase()) &&
      entry.action.toLowerCase().includes(actionFilter.toLowerCase())
    );
  });

  const sortedEntries = [...filteredEntries].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue < bValue) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  const renderSortIcon = (column: keyof AuditTrailEntry) => {
    return (
      <Button
        variant="ghost"
        onClick={() => handleSort(column)}
        className="flex items-center"
      >
        <ArrowUpDown className="ml-2 h-4 w-4 text-sort-gray" />
      </Button>
    );
  };

  return (
    <div>
      <h2 className="text-lg font-medium mb-6">Audit Trail</h2>
      <div className="flex items-center space-x-2 mb-4">
        <Input
          placeholder="Filter timestamp..."
          value={timestampFilter}
          onChange={(e) => setTimestampFilter(e.target.value)}
          className="h-9"
        />
        <Input
          placeholder="Filter user..."
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
          className="h-9"
        />
        <Input
          placeholder="Filter name..."
          value={firmFilter}
          onChange={(e) => setFirmFilter(e.target.value)}
          className="h-9"
        />
        <Input
          placeholder="Filter action..."
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="h-9"
        />
        <div className="ml-auto flex items-center space-x-2">
          <Select defaultValue="columns">
            <SelectTrigger className="h-9 w-[110px]">
              <SelectValue>Columns</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="columns">All Columns</SelectItem>
              <SelectItem value="timestamp">Timestamp</SelectItem>
              <SelectItem value="userName">User Name</SelectItem>
              <SelectItem value="firmName">Firm Name</SelectItem>
              <SelectItem value="action">Action</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="h-9 bg-black text-white hover:bg-gray-800"
          >
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export to CVS
          </Button>
        </div>
      </div>

      <div className="">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-50">
              <TableHead
                className="w-1/4 cursor-pointer"
                onClick={() => handleSort("timestamp")}
              >
                <div className="flex items-center text-sm leading-normal font-medium font-inter text-muted-foreground tracking-normal">
                  Timestamp {renderSortIcon("timestamp")}
                </div>
              </TableHead>
              <TableHead
                className="w-1/4 cursor-pointer"
                onClick={() => handleSort("userName")}
              >
                <div className="flex items-center text-sm leading-normal font-medium font-inter text-muted-foreground tracking-normal">
                  User name {renderSortIcon("userName")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer w-1/4"
                onClick={() => handleSort("firmName")}
              >
                <div className="flex items-center text-sm leading-normal font-medium font-inter text-muted-foreground tracking-normal">
                  Firm name {renderSortIcon("firmName")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer w-1/4"
                onClick={() => handleSort("action")}
              >
                <div className="flex items-center text-sm leading-normal font-medium font-inter text-muted-foreground tracking-normal">
                  Action {renderSortIcon("action")}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedEntries.map((entry) => (
              <TableRow key={entry.id} className="py-6">
                <TableCell className="sale-person-text">
                  {entry.timestamp}
                </TableCell>
                <TableCell className="sale-person-text">
                  {entry.userName}
                </TableCell>
                <TableCell className="sale-person-text">
                  {entry.firmName}
                </TableCell>
                <TableCell className="sale-person-text">
                  {entry.action}
                </TableCell>
              </TableRow>
            ))}
            {sortedEntries.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
