export interface WorkItemUpdate {
  WorkItemUpdateID: string;
  WorkItemID?: string;
  WorkItemUpdateCodeID: number;
  LastUpdated: Date;
  Comment: string;
  PersonID?: number;
  UserID: string;
}
