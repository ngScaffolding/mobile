export interface WorkItemStatusReport {
    EngineerID: number;
    WorkItemID: string;
    LastUpdated: Date;
    latestCommentDate: Date;
    latestAttachmentDate: Date;
}