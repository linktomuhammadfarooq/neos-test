import TabsHeader from "@/components/common/TabsHeader";
import { SourceDataTable } from "@/components/data/SourceDataTable";
import { UploadsTable } from "@/components/data/UploadsTable";
import { SourceData } from "@/types/data";
import { useState } from "react";

const sampleSourceData: SourceData[] = [
  {
    id: "1",
    intermediaryFirmName: "Global Investments LLC",
    intFirmClientNumber: "GI001",
    initiatingFirmName: "First Capital",
    initiatingFirmIndustryID: "FC123",
    addressLine1: "123 Wall Street",
    city: "New York",
    country: "USA",
    postalCode: "10005",
    stateRegion: "NY",
  },
  {
    id: "2",
    intermediaryFirmName: "Pacific Wealth Management",
    intFirmClientNumber: "PWM002",
    initiatingFirmName: "West Coast Securities",
    initiatingFirmIndustryID: "WCS456",
    addressLine1: "456 Market Street",
    city: "San Francisco",
    country: "USA",
    postalCode: "94105",
    stateRegion: "CA",
  },
];
const Data = () => {
  const [activeTab, setActiveTab] = useState<string>("sourceData");
  return (
    <div className="space-y-6">
      <TabsHeader
        title="Data Management"
        firstTabLabel="Source Data"
        firstTabValue="sourceData"
        secondTabLabel="Uploads"
        secondTabValue="uploads"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="bg-white rounded-lg border p-6">
        {activeTab === "sourceData" ? (
          <SourceDataTable sourceData={sampleSourceData} />
        ) : (
          <UploadsTable />
        )}
      </div>
    </div>
  );
};

export default Data;
