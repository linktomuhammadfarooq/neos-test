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
import { SourceData } from "@/types/data";
import { ArrowUpDown, DownloadIcon, UploadIcon } from "lucide-react";
import { useState } from "react";
import { HeadingH2 } from "../common/HeadingH2";

interface SourceDataTableProps {
  sourceData: SourceData[];
}
export const SourceDataTable: React.FC<SourceDataTableProps> = ({
  sourceData,
}) => {
  const [intermediaryFilter, setIntermediaryFilter] = useState("");
  const [clientNumberFilter, setClientNumberFilter] = useState("");
  const [initiatingNameFilter, setInitiatingNameFilter] = useState("");
  const [industryIDFilter, setIndustryIDFilter] = useState("");
  const [addressFilter, setAddressFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [postalCodeFilter, setPostalCodeFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");

  const [sortField, setSortField] = useState<keyof SourceData | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [, setFileName] = useState<string>("No file chosen");

  const handleSort = (field: keyof SourceData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredData = sourceData.filter((item) => {
    return (
      item.intermediaryFirmName
        .toLowerCase()
        .includes(intermediaryFilter.toLowerCase()) &&
      item.intFirmClientNumber
        .toLowerCase()
        .includes(clientNumberFilter.toLowerCase()) &&
      item.initiatingFirmName
        .toLowerCase()
        .includes(initiatingNameFilter.toLowerCase()) &&
      item.initiatingFirmIndustryID
        .toLowerCase()
        .includes(industryIDFilter.toLowerCase()) &&
      item.addressLine1.toLowerCase().includes(addressFilter.toLowerCase()) &&
      item.city.toLowerCase().includes(cityFilter.toLowerCase()) &&
      item.country.toLowerCase().includes(countryFilter.toLowerCase()) &&
      item.postalCode.toLowerCase().includes(postalCodeFilter.toLowerCase()) &&
      item.stateRegion.toLowerCase().includes(stateFilter.toLowerCase())
    );
  });

  const sortedData = [...filteredData].sort((a, b) => {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("No file chosen");
    }
  };
  const renderSortIcon = (column: keyof SourceData) => {
    return (
      <Button
        variant="ghost"
        onClick={() => handleSort(column)}
        className="flex items-center"
      >
        <ArrowUpDown className="h-4 w-4 text-sort-gray" />
      </Button>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <HeadingH2 title="Upload Data" className="mb-4" />
        <div className="flex gap-2 justify-items-start mb-8">
          <Input
            type="file"
            onChange={handleFileChange}
            className="w-[373px]"
          />
          <Button className="bg-deep-blue hover:bg-blue-800 px-4 flex">
            <UploadIcon className="sieze-4 text-white" />
            Upload
          </Button>
        </div>
      </div>
      <div className="space-y-6">
        <HeadingH2 title="Source Data" />
        <div>
          <div className="flex flex-row gap-2 mb-4">
            <Input
              placeholder="Filter name..."
              value={intermediaryFilter}
              onChange={(e) => setIntermediaryFilter(e.target.value)}
              className="h-9"
            />
            <Input
              placeholder="Filter number..."
              value={clientNumberFilter}
              onChange={(e) => setClientNumberFilter(e.target.value)}
              className="h-9"
            />
            <Input
              placeholder="Filter name..."
              value={initiatingNameFilter}
              onChange={(e) => setInitiatingNameFilter(e.target.value)}
              className="h-9"
            />
            <Input
              placeholder="Filter ID..."
              value={industryIDFilter}
              onChange={(e) => setIndustryIDFilter(e.target.value)}
              className="h-9"
            />
            <Input
              placeholder="Filter address..."
              value={addressFilter}
              onChange={(e) => setAddressFilter(e.target.value)}
              className="h-9"
            />
            <Input
              placeholder="Filter city..."
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="h-9"
            />
            <Input
              placeholder="Filter country..."
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="h-9"
            />
            <Input
              placeholder="Filter code..."
              value={postalCodeFilter}
              onChange={(e) => setPostalCodeFilter(e.target.value)}
              className="h-9"
            />
            <Input
              placeholder="Filter state..."
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="h-9"
            />

            <Select defaultValue="columns">
              <SelectTrigger className="h-9 w-[110px]">
                <SelectValue>Columns</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="columns">All Columns</SelectItem>
                <SelectItem value="intermediary">Intermediary</SelectItem>
                <SelectItem value="clientNumber">Client Number</SelectItem>
                <SelectItem value="initiatingName">Initiating Name</SelectItem>
                <SelectItem value="industryID">Industry ID</SelectItem>
                <SelectItem value="address">Address</SelectItem>
                <SelectItem value="city">City</SelectItem>
                <SelectItem value="country">Country</SelectItem>
                <SelectItem value="postalCode">Postal Code</SelectItem>
                <SelectItem value="state">State/Region</SelectItem>
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

          <div className="w-full table-fixed">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="cursor-pointer w-[11%]"
                    onClick={() => handleSort("intermediaryFirmName")}
                  >
                    <div className="table-heading">
                      Intermediary Firm Name
                      {renderSortIcon("intermediaryFirmName")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer w-[13%]"
                    onClick={() => handleSort("intFirmClientNumber")}
                  >
                    <div className="table-heading">
                      Int. Firm Client Number
                      {renderSortIcon("intFirmClientNumber")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer w-[12%]"
                    onClick={() => handleSort("initiatingFirmName")}
                  >
                    <div className="table-heading">
                      Initiating Firm Name
                      {renderSortIcon("initiatingFirmName")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer w-[12%]"
                    onClick={() => handleSort("initiatingFirmIndustryID")}
                  >
                    <div className="table-heading">
                      Initiating Firm Industry ID
                      {renderSortIcon("initiatingFirmIndustryID")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer w-[13%]"
                    onClick={() => handleSort("addressLine1")}
                  >
                    <div className="table-heading">
                      Address Line 1 {renderSortIcon("addressLine1")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer w-[8%]"
                    onClick={() => handleSort("city")}
                  >
                    <div className="table-heading">
                      City {renderSortIcon("city")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer w-[9%]"
                    onClick={() => handleSort("country")}
                  >
                    <div className="table-heading">
                      Country {renderSortIcon("country")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer w-[12%]"
                    onClick={() => handleSort("postalCode")}
                  >
                    <div className="table-heading">
                      Postal Code {renderSortIcon("postalCode")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer w-[11%]"
                    onClick={() => handleSort("stateRegion")}
                  >
                    <div className="table-heading">
                      State/Region {renderSortIcon("stateRegion")}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-gray-50 border-t border-gray-200"
                  >
                    <TableCell className="table-cell w-[11%] break-words">
                      {item.intermediaryFirmName}
                    </TableCell>
                    <TableCell className="table-cell w-[11%] break-words">
                      {item.intFirmClientNumber}
                    </TableCell>
                    <TableCell className="table-cell w-[11%] break-words">
                      {item.initiatingFirmName}
                    </TableCell>
                    <TableCell className="table-cell w-[11%] break-words">
                      {item.initiatingFirmIndustryID}
                    </TableCell>
                    <TableCell className="table-cell w-[11%] break-words">
                      {item.addressLine1}
                    </TableCell>
                    <TableCell className="table-cell w-[11%] break-words">
                      {item.city}
                    </TableCell>
                    <TableCell className="table-cell w-[11%] break-words">
                      {item.country}
                    </TableCell>
                    <TableCell className="table-cell w-[11%] break-words">
                      {item.postalCode}
                    </TableCell>
                    <TableCell className="table-cell w-[11%] break-words">
                      {item.stateRegion}
                    </TableCell>
                  </TableRow>
                ))}
                {sortedData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
