export interface FirmClassification {
    id: string;
    name: string;
    address: string;
    classification: ClassificationType
    date: string;
    isNew?: boolean;
  }
  export type ClassificationType = "Pay" | "Do Not Pay" | "Select"

  export interface AuditTrailEntry {
    id: string;
    timestamp: string;
    userName: string;
    firmName: string;
    action: string;
  }