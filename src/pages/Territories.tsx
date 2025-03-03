import TerritoriesTable from "@/components/territories/TerritoriesTable";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTerritoriesForm } from "@/hooks/useFormState";
import { cn } from "@/lib/utils";
import { SalesPerson } from "@/types/sales-person";
import { format } from "date-fns";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { SalesPersonDialog } from "../components/territories/SalePersonDialog";

const initialData: SalesPerson[] = [
  {
    id: "1",
    name: "Alex Costa",
    email: "alexmail@gmail.com",
    phone: "+1 333 888 555",
    period: "1/1/25 - 12/31/25",
    target: "100",
    territory: "Mid-Atlantic",
    targetDate: "2/19/25",
  },
  {
    id: "2",
    name: "Michael Brown",
    email: "brown@hotmail.com",
    phone: "+1 785 713 565",
    period: "1/2/25 - 12/31/25",
    target: "10",
    territory: "Southeast",
    targetDate: "2/17/25",
  },
  {
    id: "3",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 555 123 4567",
    period: "1/1/25 - 12/31/25",
    target: "150",
    territory: "Northwest",
    targetDate: "3/15/25",
  },
  {
    id: "4",
    name: "David Lee",
    email: "david.lee@example.com",
    phone: "+1 444 789 1234",
    period: "2/1/25 - 12/31/25",
    target: "75",
    territory: "Southwest",
    targetDate: "2/28/25",
  },
  {
    id: "5",
    name: "Emily Wilson",
    email: "emily.w@example.com",
    phone: "+1 222 456 7890",
    period: "1/15/25 - 12/31/25",
    target: "120",
    territory: "Northeast",
    targetDate: "3/5/25",
  },
];
const Territories = () => {
  const [sortColumn, setSortColumn] = useState<keyof SalesPerson | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [salesPeople, setSalesPeople] = useState<SalesPerson[]>(initialData);

  const { state, openCreateForm, openEditForm, closeForm } =
    useTerritoriesForm();

  const [filters, setFilters] = useState({
    name: "",
    email: "",
    phone: "",
    period: "",
    target: "",
    territory: "",
  });
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);

  // Sample data

  const handleSort = (column: keyof SalesPerson) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const filteredData = useMemo(() => {
    return salesPeople.filter((person) => {
      return (
        person.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        person.email.toLowerCase().includes(filters.email.toLowerCase()) &&
        person.phone.includes(filters.phone) &&
        person.period.includes(filters.period) &&
        person.target.toString().includes(filters.target) &&
        person.territory.toLowerCase().includes(filters.territory.toLowerCase())
      );
    });
  }, [filters, salesPeople]);

  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);

  const handleSavePerson = (updatedPerson: SalesPerson) => {
    if (state.formState === "edit") {
      setSalesPeople(
        salesPeople.map((person) =>
          person.id === updatedPerson.id ? updatedPerson : person
        )
      );
    } else {
      setSalesPeople([...salesPeople, updatedPerson]);
    }
  };

  // const handleSavePerson = (updatedPerson: SalesPerson) => {
  //   setSalesPeople(
  //     salesPeople.map((person) =>
  //       person.id === updatedPerson.id ? updatedPerson : person
  //     )
  //   );
  // };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold leading-normal text-card-foreground tracking-tight font-inter">
            Territories Management
          </h1>
          <Button
            onClick={openCreateForm}
            className="bg-deep-blue hover:bg-[#031d70] hover:cursor-pointer text-sm leading-normal font-medium tracking-tight text-primary-foreground"
          >
            <PlusIcon className="size-4 mr-2 text-primary-foreground" /> Add
            Sales Person
          </Button>
        </div>

        <div className="bg-white p-6 rounded-xl border space-y-6">
          <div>
            <h2 className="text-card-foreground leading-normal font-inter tracking-normal text-xl font-semibold">
              Sales People
            </h2>
            <p className="text-xs leading-normal font-normal tracking-normal text-slate-gray">
              Manage sales territories and targets
            </p>
          </div>

          <div className="flex items-center space-x-2 ">
            <Input
              placeholder="Filter name..."
              value={filters.name}
              onChange={(e) => handleFilterChange("name", e.target.value)}
              className="h-9"
            />
            <Input
              placeholder="Filter email..."
              value={filters.email}
              onChange={(e) => handleFilterChange("email", e.target.value)}
              className="h-9"
            />
            <Input
              placeholder="Filter phone..."
              value={filters.phone}
              onChange={(e) => handleFilterChange("phone", e.target.value)}
              className="h-9"
            />
            <Input
              placeholder="Filter period..."
              value={filters.period}
              onChange={(e) => handleFilterChange("period", e.target.value)}
              className="h-9"
            />
            <Input
              placeholder="Filter target..."
              value={filters.target}
              onChange={(e) => handleFilterChange("target", e.target.value)}
              className="h-9"
            />
            <Input
              placeholder="Filter territory..."
              value={filters.territory}
              onChange={(e) => handleFilterChange("territory", e.target.value)}
              className="h-9"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "h-9 justify-start text-left font-normal",
                    !dateFilter && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFilter ? format(dateFilter, "MM/dd/yy") : "Pick a date"}
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9">
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Name</DropdownMenuItem>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Phone</DropdownMenuItem>
                <DropdownMenuItem>Period</DropdownMenuItem>
                <DropdownMenuItem>Target</DropdownMenuItem>
                <DropdownMenuItem>Territory</DropdownMenuItem>
                <DropdownMenuItem>Target Date</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              className="px-4 py-2 text-sm rounded-md leading-normal font-medium text-primary-foreground bg-foreground cursor-pointer hover:text-white hover:bg-gray-700"
            >
              Export to CVS
            </Button>
          </div>
          {/* Sales person table */}
          <TerritoriesTable
            personData={sortedData}
            handleSort={handleSort}
            handleEdit={openEditForm}
          />
        </div>
      </div>
      <SalesPersonDialog
        open={state.isDialogOpen}
        onOpenChange={closeForm}
        onSave={handleSavePerson}
        person={state.selectedPerson}
        formState={state.formState}
      />
    </>
  );
};

export default Territories;
