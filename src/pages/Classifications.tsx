import { AuditTrailTable } from "@/components/classifications/AuditTrailTable";
import { ClassificationsTable } from "@/components/classifications/ClassificationsTable";
import TabsHeader from "@/components/common/TabsHeader";
import {
  AuditTrailEntry,
  ClassificationType,
  FirmClassification,
} from "@/types/classification";
import { format } from "date-fns";
import { useState } from "react";

export default function Classifications() {
  const initialFirms: FirmClassification[] = [
    {
      id: "1",
      name: "Acme Corp",
      address: "123 Main St, Anytown, USA",
      classification: "Pay",
      date: "2/20/2023",
      isNew: true,
    },
    {
      id: "2",
      name: "Globex Corporation",
      address: "456 Tech Blvd, Silicon Valley, CA",
      classification: "Select",
      date: "N/A",
    },
    {
      id: "3",
      name: "Soylent Corp",
      address: "789 Green Ave, Eco City, OR",
      classification: "Select",
      date: "N/A",
      isNew: true,
    },
    {
      id: "4",
      name: "Initech",
      address: "101 Office Park, Cubicle City, TX",
      classification: "Pay",
      date: "3/10/2023",
    },
    {
      id: "5",
      name: "Umbrella Corporation",
      address: "202 Biotech Lane, Raccoon City, MI",
      classification: "Pay",
      date: "1/15/2023",
    },
  ];

  const initialAuditEntries: AuditTrailEntry[] = [
    {
      id: "1",
      timestamp: "6/1/2023, 10:30:00 AM",
      userName: "John Doe",
      firmName: "Acme Corp",
      action: "Classification set to Pay",
    },
    {
      id: "2",
      timestamp: "6/2/2023, 2:15:00 PM",
      userName: "Jane Smith",
      firmName: "Globex Corporation",
      action: "Classification set to Do Not Pay",
    },
    {
      id: "3",
      timestamp: "6/3/2023, 9:00:00 AM",
      userName: "Bob Johnson",
      firmName: "Soylent Corp",
      action: "Added as new firm",
    },
  ];

  const [firms, setFirms] = useState<FirmClassification[]>(initialFirms);
  const [auditEntries, setAuditEntries] =
    useState<AuditTrailEntry[]>(initialAuditEntries);
  const [activeTab, setActiveTab] = useState<string>("classifications");

  const handleClassificationChange = (
    id: string,
    value: "Pay" | "Do Not Pay" | "Select"
  ) => {
    // Update firm classification
    const updatedFirms = firms.map((firm) =>
      firm.id === id
        ? {
            ...firm,
            classification: value,
            date: value === "Select" ? "N/A" : format(new Date(), "M/d/yyyy"),
          }
        : firm
    );
    setFirms(updatedFirms);

    // Add audit entry
    const firm = firms.find((f) => f.id === id);
    if (firm) {
      const newEntry: AuditTrailEntry = {
        id: Date.now().toString(),
        timestamp: format(new Date(), "M/d/yyyy, h:mm:ss a"),
        userName: "Current User",
        firmName: firm.name,
        action: `Classification set to ${value}`,
      };
      setAuditEntries([newEntry, ...auditEntries]);
    }
  };
  const handleDeleteClassification = (id: string) => {
    const firm = firms.find((f) => f.id === id);
    const updatedFirms = firms.map((firm) =>
      firm.id === id
        ? {
            ...firm,
            classification: "Select" as ClassificationType,
            date: "N/A",
          }
        : firm
    );
    setFirms(updatedFirms);
    if (firm) {
      const newEntry: AuditTrailEntry = {
        id: Date.now().toString(),
        timestamp: format(new Date(), "M/d/yyyy, h:mm:ss a"),
        userName: "Current User",
        firmName: firm.name,
        action: "Classification removed",
      };
      setAuditEntries([newEntry, ...auditEntries]);
    }
  };

  return (
    <div className="space-y-6">
      <TabsHeader
        title="Firm Classifications"
        firstTabLabel="Classifications"
        firstTabValue="classifications"
        secondTabLabel="Audit Trail"
        secondTabValue="audit"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {activeTab === "classifications" ? (
          <ClassificationsTable
            firms={firms}
            onClassificationChange={handleClassificationChange}
            onDeleteClassification={handleDeleteClassification}
          />
        ) : (
          <AuditTrailTable entries={auditEntries} />
        )}
      </div>
    </div>
  );
}
