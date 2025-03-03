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
import { FirmClassification } from "@/types/classification";
import { format } from "date-fns";
import { ArrowUpDown, CalendarIcon, DownloadIcon, Trash } from "lucide-react";
import { useState } from "react";
import { DeleteConfirmationDialog } from "../common/DeleteConfirmationDialog";

interface ClassificationsTableProps {
  firms: FirmClassification[];
  onClassificationChange: (
    id: string,
    value: "Pay" | "Do Not Pay" | "Select"
  ) => void;
  onDeleteClassification: (id: string) => void;
}

export function ClassificationsTable({
  firms,
  onClassificationChange,
  onDeleteClassification,
}: ClassificationsTableProps) {
  const [nameFilter, setNameFilter] = useState("");
  const [addressFilter, setAddressFilter] = useState("");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [sortField, setSortField] = useState<keyof FirmClassification | null>(
    null
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [firmToDelete, setFirmToDelete] = useState<FirmClassification | null>(
    null
  );

  const handleSort = (field: keyof FirmClassification) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  const handleDeleteClick = (e: React.MouseEvent, firm: FirmClassification) => {
    e.stopPropagation();
    setFirmToDelete(firm);
    setDeleteDialogOpen(true);
  };
  const filteredFirms = firms.filter((firm) => {
    return (
      firm.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      firm.address.toLowerCase().includes(addressFilter.toLowerCase()) &&
      (!dateFilter ||
        firm.date.includes(format(dateFilter, "M/d/yyyy")) ||
        firm.date === "N/A")
    );
  });

  const sortedFirms = [...filteredFirms].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField] ?? "";
    const bValue = b[sortField] ?? "";

    if (aValue < bValue) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleConfirmDelete = () => {
    if (firmToDelete && onDeleteClassification) {
      onDeleteClassification(firmToDelete.id);
    }
    setDeleteDialogOpen(false);
    setFirmToDelete(null);
  };

  const deleteMessage = firmToDelete
    ? `This action will remove the classification for ${firmToDelete?.name}. This
  action cannot be undone`
    : "";

  return (
    <div>
      <h2 className="text-xl leading-normal font-semibold tracking-normal mb-6">
        Classifications
      </h2>

      <div className="flex flex-wrap items-end gap-4 mb-4">
        <div className="flex-1">
          <p className="text-sm mb-1.5">Filter: by name</p>
          <Input
            placeholder=""
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="h-9"
          />
        </div>
        <div className="flex-1">
          <p className="text-sm mb-1.5">Filter: by address</p>
          <Input
            placeholder=""
            value={addressFilter}
            onChange={(e) => setAddressFilter(e.target.value)}
            className="h-9"
          />
        </div>
        <div className="flex-1">
          <p className="text-sm mb-1.5">Classification</p>
          <Select defaultValue="All">
            <SelectTrigger className="h-9 flex justify-start data-[placeholder]:text-foreground">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Pay">Pay</SelectItem>
              <SelectItem value="Do Not Pay">Do Not Pay</SelectItem>
              <SelectItem value="Select">Select</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-sm mb-1.5">New</p>
          <Select defaultValue="All">
            <SelectTrigger className="h-9 w-[180px] flex justify-start data-[placeholder]:text-foreground">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Old">Old</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-sm mb-1.5">Filter: by date</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-9 w-[180px] justify-start text-left font-normal",
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
        </div>
        <Select defaultValue="columns">
          <SelectTrigger className="h-9 w-[110px]">
            <SelectValue>Columns</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="columns">All Columns</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="address">Address</SelectItem>
            <SelectItem value="classification">Classification</SelectItem>
            <SelectItem value="date">Date</SelectItem>
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

      <div>
        <Table>
          <TableHeader>
            <TableRow className="">
              <TableHead
                className="w-[25%] cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="table-heading">
                  Firm Name
                  <ArrowUpDown className="ml-2 h-4 w-4 text-sort-gray" />
                </div>
              </TableHead>
              <TableHead
                className="w-[30%] cursor-pointer"
                onClick={() => handleSort("address")}
              >
                <div className="table-heading">
                  Address
                  <ArrowUpDown className="ml-2 h-4 w-4 text-sort-gray" />
                </div>
              </TableHead>
              <TableHead
                className="w-[20%] cursor-pointer"
                onClick={() => handleSort("classification")}
              >
                <div className="table-heading">
                  Classification
                  <ArrowUpDown className="ml-2 h-4 w-4 text-sort-gray" />
                </div>
              </TableHead>
              <TableHead
                className="w-[15%] cursor-pointer"
                onClick={() => handleSort("date")}
              >
                <div className="table-heading">
                  Classification Date
                  <ArrowUpDown className="ml-2 h-4 w-4 text-sort-gray" />
                </div>
              </TableHead>
              <TableHead className="w-[5%]"></TableHead>
              <TableHead className="w-[5%]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedFirms.map((firm) => (
              <TableRow
                key={firm.id}
                className="hover:bg-gray-50 border-t border-gray-200"
              >
                <TableCell className="table-cell">{firm.name}</TableCell>
                <TableCell className="table-cell">{firm.address}</TableCell>
                <TableCell className="table-cell">
                  <Select
                    value={firm.classification}
                    onValueChange={(value) =>
                      onClassificationChange(
                        firm.id,
                        value as "Pay" | "Do Not Pay" | "Select"
                      )
                    }
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pay">Pay</SelectItem>
                      <SelectItem value="Do Not Pay">Do Not Pay</SelectItem>
                      <SelectItem value="Select">Select</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="table-cell">{firm.date}</TableCell>
                <TableCell className="table-cell">
                  {firm.isNew && (
                    <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800">
                      NEW
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleDeleteClick(e, firm)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {sortedFirms.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        message={deleteMessage || ""}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
