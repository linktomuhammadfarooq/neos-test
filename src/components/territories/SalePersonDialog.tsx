import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { FormState } from "@/hooks/useFormState";
import { cn } from "@/lib/utils";
import { SalesPerson } from "@/types/sales-person";
import { format, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface EditSalesPersonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  person: SalesPerson | null;
  onSave: (person: SalesPerson) => void;
  formState: FormState;
}

export function SalesPersonDialog({
  open,
  onOpenChange,
  person,
  onSave,
  formState,
}: EditSalesPersonDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [territory, setTerritory] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (formState === "edit" && person) {
      setName(person.name);
      setEmail(person.email);
      setPhone(person.phone);
      setTerritory(person.territory);
      setTargetAmount(person?.target.toString()?.replace(/[^0-9]/g, ""));

      try {
        const parsedDate = parse(person.targetDate, "M/d/yy", new Date());
        setTargetDate(parsedDate);
      } catch (error) {
        console.log(error);
        setTargetDate(undefined);
      }
    } else if (formState === "create") {
      resetForm();
    }
  }, [person, formState]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setTerritory("");
    setTargetAmount("");
    setTargetDate(undefined);
  };

  const handleSubmit = () => {
    if (
      !name ||
      !email ||
      !phone ||
      !territory ||
      !targetAmount ||
      !targetDate
    ) {
      return;
    }

    if (formState === "edit" && person) {
      const updatedPerson: SalesPerson = {
        ...person,
        name,
        email,
        phone,
        territory,
        target: `$${parseInt(targetAmount).toLocaleString()}`,
        targetDate: format(targetDate, "M/d/yy"),
      };
      onSave(updatedPerson);
    } else {
      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setFullYear(endDate.getFullYear() + 1);

      const newPerson: SalesPerson = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        phone,
        period: `${format(startDate, "M/d/yy")} - ${format(endDate, "M/d/yy")}`,
        target: `$${parseInt(targetAmount).toLocaleString()}`,
        territory,
        targetDate: format(targetDate, "M/d/yy"),
      };
      onSave(newPerson);
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {formState === "create"
              ? "Add new sales person"
              : "Edit sales person details"}
            s
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {formState === "create"
              ? "Enter the details for the new sales person here"
              : "Edit the details for the sales person here"}
          </p>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-name">Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-email">Email address</Label>
            <Input
              id="edit-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-phone">Phone</Label>
            <Input
              id="edit-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-territory">Territory</Label>
            <Select value={territory} onValueChange={setTerritory}>
              <SelectTrigger>
                <SelectValue placeholder="Select Territory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mid-Atlantic">Mid-Atlantic</SelectItem>
                <SelectItem value="Southeast">Southeast</SelectItem>
                <SelectItem value="Mountain">Mountain</SelectItem>
                <SelectItem value="Heartland">Heartland</SelectItem>
                <SelectItem value="Pac Coast">Pac Coast</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-target">Target amount</Label>
            <Input
              id="edit-target"
              value={`$${targetAmount}`}
              onChange={(e) =>
                setTargetAmount(e.target.value.replace(/[^0-9]/g, ""))
              }
              placeholder="Target amount"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-targetDate">Target date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !targetDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {targetDate ? format(targetDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={targetDate}
                  onSelect={setTargetDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            className="bg-deep-blue cursor-pointer hover:bg-[#031d70]"
          >
            {formState === "create" ? "Add person" : "Save changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
