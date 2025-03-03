import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SalesPerson } from "@/types/sales-person";
import { ArrowUpDown, FilePen } from "lucide-react";

interface TerritoriesTableProps {
  personData: SalesPerson[];
  handleSort: (column: keyof SalesPerson) => void;
  handleEdit: (person: SalesPerson) => void;
}

const TerritoriesTable: React.FC<TerritoriesTableProps> = ({
  personData,
  handleSort,
  handleEdit,
}) => {
  const renderSortIcon = (column: keyof SalesPerson) => {
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">
              <div className="flex items-center text-sm leading-normal font-medium font-inter text-muted-foreground tracking-normal">
                Name {renderSortIcon("name")}
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center text-sm leading-normal font-medium font-inter text-muted-foreground tracking-normal">
                Email {renderSortIcon("email")}
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center text-sm leading-normal font-medium font-inter text-muted-foreground tracking-normal">
                Phone {renderSortIcon("phone")}
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center text-sm leading-normal font-medium font-inter text-muted-foreground tracking-normal">
                Period {renderSortIcon("period")}
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center text-sm leading-normal font-medium font-inter text-muted-foreground tracking-normal">
                Target (mm) {renderSortIcon("target")}
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center text-sm leading-normal font-medium font-inter text-muted-foreground tracking-normal">
                Territory covered {renderSortIcon("territory")}
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center text-sm leading-normal font-medium font-inter text-muted-foreground tracking-normal">
                Target date {renderSortIcon("targetDate")}
              </div>
            </TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {personData.length > 0 ? (
            personData.map((person) => (
              <TableRow key={person.id} className="py-6">
                <TableCell className="sale-person-text">
                  {person.name}
                </TableCell>
                <TableCell className="sale-person-text">
                  {person.email}
                </TableCell>
                <TableCell className="sale-person-text">
                  {person.phone}
                </TableCell>
                <TableCell className="sale-person-text">
                  {person.period}
                </TableCell>
                <TableCell className="sale-person-text">
                  ${person.target}
                </TableCell>
                <TableCell className="sale-person-text">
                  {person.territory}
                </TableCell>
                <TableCell className="sale-person-text">
                  {person.targetDate}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(person)}
                  >
                    <FilePen className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TerritoriesTable;
