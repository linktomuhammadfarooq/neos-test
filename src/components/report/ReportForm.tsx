import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Report } from "@/types/report";
import { format } from "date-fns";
import { CalendarIcon, Eye, Save } from "lucide-react";
import { useState } from "react";
import { HeadingH2 } from "../common/HeadingH2";

interface ReportFormProps {
  onSaveReport: (report: Report) => void;
}

export function ReportForm({ onSaveReport }: ReportFormProps) {
  const [region, setRegion] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [note, setNote] = useState<string>("");

  const handleSaveReport = () => {
    if (!region || !startDate || !endDate) {
      return;
    }

    const newReport: Report = {
      id: Date.now().toString(),
      region,
      period: `${format(startDate, "MM/dd/yy")} - ${format(
        endDate,
        "MM/dd/yy"
      )}`,
      savedDate: format(new Date(), "MM/dd/yy"),
      savedBy: "Current User",
      note,
    };

    onSaveReport(newReport);
    resetForm();
  };

  const resetForm = () => {
    setRegion("");
    setStartDate(undefined);
    setEndDate(undefined);
    setNote("");
  };

  const handlePreviewReport = () => {
    // In a real application, this would generate a preview
    console.log("Previewing report");
  };

  return (
    <div className="mb-10">
      <HeadingH2 title="Generate Report" />
      <p className="text-sm text-muted-foreground mb-6">
        Select a region and date to generate a report
      </p>

      <div className="max-w-[848px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label htmlFor="region" className="block text-sm font-medium mb-2">
              Region
            </label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger
                id="region"
                className="w-full flex justify-start data-[placeholder]:text-foreground"
              >
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mid-Atlantic">Mid-Atlantic</SelectItem>
                <SelectItem value="Southeast">Southeast</SelectItem>
                <SelectItem value="Mountain">Mountain</SelectItem>
                <SelectItem value="Heartland">Heartland</SelectItem>
                <SelectItem value="Pac Coast">Pac Coast</SelectItem>
                <SelectItem value="West">West</SelectItem>
                <SelectItem value="Alex Costa">Alex Costa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label
              htmlFor="start-date"
              className="block text-sm font-medium mb-2"
            >
              Start date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="start-date"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label
              htmlFor="end-date"
              className="block text-sm font-medium mb-2"
            >
              End date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="end-date"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  disabled={(date) => (startDate ? date < startDate : false)}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="note" className="block text-sm font-medium mb-2">
            Note
          </label>
          <Textarea
            id="note"
            placeholder="(Optional) Add a note about this report"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="resize-none h-24"
          />
        </div>

        <div className="flex space-x-4">
          <Button
            onClick={handleSaveReport}
            className="bg-deep-blue hover:bg-blue-800 cursor-pointer"
            // disabled={!region || !startDate || !endDate}
          >
            <Save className="h-4 w-4 mr-2" />
            Save report
          </Button>
          <Button
            variant="outline"
            onClick={handlePreviewReport}
            className="bg-secondary cursor-pointer hover:bg-gray-200"
            // disabled={!region || !startDate || !endDate}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview report
          </Button>
        </div>
      </div>
    </div>
  );
}
