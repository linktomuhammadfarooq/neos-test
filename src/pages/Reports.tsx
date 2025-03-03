import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";
import { HeadingH1 } from "@/components/common/HeadingH1";
import { ReportForm } from "@/components/report/ReportForm";
import { ReportTable } from "@/components/report/ReportTable";
import { Report } from "@/types/report";
import { useState } from "react";

const Reports = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reportId, setReportId] = useState<string | null>(null);
  const [reports, setReports] = useState<Report[]>([
    {
      id: "1",
      region: "Alex Costa",
      period: "01/01/24 - 01/31/24",
      savedDate: "01/02/24",
      savedBy: "John Doe",
      note: "NUSI is being excluded from this quarter's calculation due to the fact the fund was adopted in Nov of 2024 and had no creates through",
    },
    {
      id: "2",
      region: "West",
      period: "01/01/24 - 01/15/24",
      savedDate: "01/16/24",
      savedBy: "Jane Smith",
      note: "Mid-month Western region review, XYZ was excluded for this quarter because ABC",
    },
  ]);
  const handleSaveReport = (report: Report) => {
    setReports([report, ...reports]);
  };

  const handleDeleteReport = (id: string) => {
    setReportId(id);
    setDeleteDialogOpen(true);
  };
  const handleConfirmDelete = () => {
    setReportId(null);
    setReports(reports.filter((report) => report.id !== reportId));
  };

  const handleViewReport = (id: string) => {
    console.log(`Viewing report ${id}`);
  };

  return (
    <div className="space-y-6">
      <HeadingH1 title="Reports" />
      <div className="bg-white rounded-lg border p-6">
        <ReportForm onSaveReport={handleSaveReport} />
        <ReportTable
          reports={reports}
          onDeleteReport={handleDeleteReport}
          onViewReport={handleViewReport}
        />
      </div>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        message={
          "This action will remove the report from the data. This action cannot be undone."
        }
        onConfirm={() => handleConfirmDelete()}
      />
    </div>
  );
};

export default Reports;
