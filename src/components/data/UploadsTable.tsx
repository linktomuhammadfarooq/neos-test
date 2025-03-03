import { HeadingH2 } from "@/components/common/HeadingH2";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowUpDown, CalendarIcon, Undo2, UploadIcon } from "lucide-react";
import { useState } from "react";

interface UploadRecord {
  id: string;
  fileName: string;
  uploadedBy: string;
  uploadDate: string;
  recordCount: number;
  note: string;
}
export const UploadsTable = () => {
  const [, setFileName] = useState<string>("No file chosen");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [nameFilter, setNameFilter] = useState("");
  const [uploadedByFilter, setUploadedByFilter] = useState("");
  const [recordCountFilter, setRecordCountFilter] = useState("");
  const [noteFilter, setNoteFilter] = useState("");
  const [note, setNote] = useState<string>("");
  const [sortField, setSortField] = useState<keyof UploadRecord | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [uploadRecords, setUploadRecords] = useState<UploadRecord[]>([
    {
      id: "1",
      fileName: "intermediary_data_2024_01.csv",
      uploadedBy: "John Doe",
      uploadDate: "1/15/2024, 12:00:00 AM",
      recordCount: 150,
      note: "Mid-month Western region review. XYZ was excluded for this quarter because ABC",
    },
    {
      id: "2",
      fileName: "intermediary_data_2024_02.csv",
      uploadedBy: "Jane Smith",
      uploadDate: "2/1/2024, 12:00:00 AM",
      recordCount: 200,
      note: "NUSI is being excluded from this quarter's calculation due to the fact that it was acquired in Nov of 2024 and had no creates through",
    },
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("No file chosen");
    }
  };

  const handleUndoUpload = (id: string) => {
    setUploadRecords(uploadRecords.filter((record) => record.id !== id));
  };

  const filteredRecords = uploadRecords.filter((record) => {
    return (
      record.fileName.toLowerCase().includes(nameFilter.toLowerCase()) &&
      record.uploadedBy
        .toLowerCase()
        .includes(uploadedByFilter.toLowerCase()) &&
      record.recordCount.toString().includes(recordCountFilter) &&
      record.note.toLowerCase().includes(noteFilter.toLowerCase()) &&
      (!dateFilter ||
        record.uploadDate.includes(format(dateFilter, "M/d/yyyy")))
    );
  });
  const handleSort = (field: keyof UploadRecord) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <HeadingH2 title="Upload Data" className="mb-4" />
        <div className="flex flex-col gap-4 justify-items-start mb-8">
          <Input
            type="file"
            onChange={handleFileChange}
            className="w-[373px]"
          />
          <div>
            <Label htmlFor="note" className="text-sm mb-1.5">
              Note
            </Label>
            <Textarea
              placeholder="(Optional) Add a note about this report"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="resize-none h-24 max-w-md w-[373px]"
            />
          </div>
          <Button className="bg-deep-blue hover:bg-blue-800 px-4 flex w-[104px] h-9 rounded-md p-2">
            <UploadIcon className="sieze-4 text-white" />
            Upload
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <div className="space-y-6">
          <HeadingH2 title="Uploads" />
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Filter name..."
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="h-9 w-[180px] flex-1"
            />
            <Input
              placeholder="Filter upload..."
              value={uploadedByFilter}
              onChange={(e) => setUploadedByFilter(e.target.value)}
              className="h-9 w-[180px] flex-1"
            />
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
                  {dateFilter
                    ? format(dateFilter, "MM/dd/yyyy")
                    : "Pick a date"}
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
              placeholder="Filter record..."
              value={recordCountFilter}
              onChange={(e) => setRecordCountFilter(e.target.value)}
              className="h-9 w-[180px]"
            />
            <Input
              placeholder="Filter note..."
              value={noteFilter}
              onChange={(e) => setNoteFilter(e.target.value)}
              className="h-9 w-[180px]"
            />
            <div className="ml-auto flex items-center gap-2">
              <Select defaultValue="columns">
                <SelectTrigger className="h-9 w-[110px]">
                  <SelectValue>Columns</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="columns">All Columns</SelectItem>
                  <SelectItem value="fileName">File Name</SelectItem>
                  <SelectItem value="uploadedBy">Uploaded By</SelectItem>
                  <SelectItem value="uploadDate">Upload Date</SelectItem>
                  <SelectItem value="recordCount">Record Count</SelectItem>
                  <SelectItem value="note">Note</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="h-9 bg-black text-white hover:bg-gray-800"
              >
                Export to CVS
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <Table>
          <TableHeader>
            <TableRow className="">
              <TableHead
                className="w-[20%] pr-0"
                onClick={() => handleSort("fileName")}
              >
                <div className="table-heading flex justify-between">
                  File name
                  <ArrowUpDown className="size-4 text-sort-gray" />
                </div>
              </TableHead>
              <TableHead
                className="w-[20%] pr-0"
                onClick={() => handleSort("uploadedBy")}
              >
                <div className="table-heading  flex justify-between">
                  Uploaded by
                  <ArrowUpDown className="size-4 text-sort-gray" />
                </div>
              </TableHead>
              <TableHead
                className="w-[15%] pr-0"
                onClick={() => handleSort("uploadDate")}
              >
                <div className="table-heading  flex justify-between">
                  Upload Date
                  <ArrowUpDown className="size-4 text-sort-gray" />
                </div>
              </TableHead>
              <TableHead
                className="w-[20%] pr-0"
                onClick={() => handleSort("recordCount")}
              >
                <div className="table-heading  flex justify-between">
                  Record Count
                  <ArrowUpDown className="size-4 text-sort-gray" />
                </div>
              </TableHead>
              <TableHead
                className="w-[30%] pr-0"
                onClick={() => handleSort("note")}
              >
                <div className="table-heading  flex justify-between">
                  Note <ArrowUpDown className="size-4 text-sort-gray" />
                </div>
              </TableHead>
              <TableHead className="w-[10%] pr-0"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.map((record) => (
              <TableRow
                key={record.id}
                className="hover:bg-gray-50 border-t border-gray-200"
              >
                <TableCell className="table-data">{record.fileName}</TableCell>
                <TableCell className="table-data">
                  {record.uploadedBy}
                </TableCell>
                <TableCell className="table-data">
                  {record.uploadDate}
                </TableCell>
                <TableCell className="table-data">
                  {record.recordCount}
                </TableCell>
                <TableCell className="break-words table-data">
                  {record.note}
                </TableCell>
                <TableCell className="table-data">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUndoUpload(record.id)}
                    className="text-foreground cursor-pointer hover:bg-gray-100"
                  >
                    <Undo2 />
                    Undo upload
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredRecords.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No uploads found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
