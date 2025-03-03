import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { cn } from "@/lib/utils";
import { Report } from "@/types/report";
import { format, isWithinInterval, parse } from "date-fns";
import {
  ArrowUpDown,
  CalendarDays,
  CalendarIcon,
  FileDown,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { HeadingH2 } from "../common/HeadingH2";

interface ReportTableProps {
  reports: Report[];
  onDeleteReport: (id: string) => void;
  onViewReport: (id: string) => void;
}

export function ReportTable({
  reports,
  onDeleteReport,
  onViewReport,
}: ReportTableProps) {
  const [regionFilter, setRegionFilter] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [savedByFilter, setSavedByFilter] = useState("");
  const [noteFilter, setNoteFilter] = useState("");

  const [sortField, setSortField] = useState<keyof Report | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const isDateInRange = (
    dateString: string,
    range: DateRange | undefined
  ): boolean => {
    if (!range || !range.from) return true;

    try {
      // Parse the period string (e.g., "01/01/24 - 01/31/24")
      const [startStr, endStr] = dateString.split(" - ");
      const startDate = parse(startStr, "MM/dd/yy", new Date());
      const endDate = parse(endStr, "MM/dd/yy", new Date());

      // Check if there's any overlap between the period and the filter range
      if (range.to) {
        // Check if either the start or end date falls within the filter range
        // or if the filter range is completely contained within the period
        return (
          isWithinInterval(startDate, { start: range.from, end: range.to }) ||
          isWithinInterval(endDate, { start: range.from, end: range.to }) ||
          (startDate <= range.from && endDate >= range.to)
        );
      } else {
        // If only from date is specified, check if it falls within the period
        return startDate <= range.from && endDate >= range.from;
      }
    } catch (error) {
      // If parsing fails, don't filter out the item
      console.log(error);
      return true;
    }
  };

  const handleSort = (field: keyof Report) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredReports = reports.filter((report) => {
    return (
      report.region.toLowerCase().includes(regionFilter.toLowerCase()) &&
      report.savedBy.toLowerCase().includes(savedByFilter.toLowerCase()) &&
      report.note.toLowerCase().includes(noteFilter.toLowerCase()) &&
      (!dateFilter ||
        report.savedDate.includes(format(dateFilter, "MM/dd/yy"))) &&
      (!dateRange || isDateInRange(report.period, dateRange))
    );
  });

  const sortedReports = [...filteredReports].sort((a, b) => {
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

  return (
    <div className="space-y-6">
      <HeadingH2 title="Saved Reports" />

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Input
          placeholder="Filter region..."
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="h-9 w-[180px] flex-1"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-9 w-[180px] flex-1 justify-start text-left font-normal",
                !dateRange && "text-muted-foreground"
              )}
            >
              <CalendarDays className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "MM/dd/yy")} -{" "}
                    {format(dateRange.to, "MM/dd/yy")}
                  </>
                ) : (
                  format(dateRange.from, "MM/dd/yy")
                )
              ) : (
                "Pick a period"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-9 w-[180px] flex-1 justify-start text-left font-normal",
                !dateFilter && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateFilter ? format(dateFilter, "MM/dd/yyyy") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateFilter}
              onSelect={setDateFilter}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Input
          placeholder="Filter by saved..."
          value={savedByFilter}
          onChange={(e) => setSavedByFilter(e.target.value)}
          className="h-9 w-[180px] flex-1"
        />
        <Input
          placeholder="Filter notes..."
          value={noteFilter}
          onChange={(e) => setNoteFilter(e.target.value)}
          className="h-9 w-[180px] flex-1"
        />
        <div className="ml-auto flex items-center gap-2">
          <Select defaultValue="columns">
            <SelectTrigger className="h-9 w-[110px]">
              <SelectValue>Columns</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="columns">All Columns</SelectItem>
              <SelectItem value="region">Region</SelectItem>
              <SelectItem value="period">Period</SelectItem>
              <SelectItem value="savedDate">Saved Date</SelectItem>
              <SelectItem value="savedBy">Saved By</SelectItem>
              <SelectItem value="note">Note</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="h-9 bg-foreground text-white hover:bg-gray-800"
          >
            Export to CSV
          </Button>
        </div>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="w-[15%] cursor-pointer"
                onClick={() => handleSort("region")}
              >
                <div className="table-heading">
                  Region <ArrowUpDown className="ml-2 size-4 text-sort-gray" />
                </div>
              </TableHead>
              <TableHead
                className="w-[15%] cursor-pointer"
                onClick={() => handleSort("period")}
              >
                <div className="table-heading">
                  Period <ArrowUpDown className="ml-2 size-4 text-sort-gray" />
                </div>
              </TableHead>
              <TableHead
                className="w-[15%] cursor-pointer"
                onClick={() => handleSort("savedDate")}
              >
                <div className="table-heading">
                  Saved date{" "}
                  <ArrowUpDown className="ml-2 size-4 text-sort-gray" />
                </div>
              </TableHead>
              <TableHead
                className="w-[15%] cursor-pointer"
                onClick={() => handleSort("savedBy")}
              >
                <div className="table-heading">
                  Saved by{" "}
                  <ArrowUpDown className="ml-2 size-4 text-sort-gray" />
                </div>
              </TableHead>
              <TableHead
                className="w-[30%] cursor-pointer"
                onClick={() => handleSort("note")}
              >
                <div className="table-heading">
                  Note <ArrowUpDown className="ml-2 size-4 text-sort-gray" />
                </div>
              </TableHead>
              <TableHead className="w-[10%]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="table-data">{report.region}</TableCell>
                <TableCell className="table-data">{report.period}</TableCell>
                <TableCell className="table-data">{report.savedDate}</TableCell>
                <TableCell className="table-data">{report.savedBy}</TableCell>
                <TableCell className="break-words table-data">
                  {report.note}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewReport(report.id)}
                      className="text-foreground cursor-pointer"
                    >
                      <FileDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteReport(report.id)}
                      className="text-foreground cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {sortedReports.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No reports found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
