import { v4 as uuid } from 'uuid';

export class StatusUpdate {
    constructor() {
        this.NotificationID = uuid();
    }
    NotificationID: string;
    NotificationCodeID: number;
    When: Date;
    UserName: string;

    Longitude: number;
    Latitude: number;
    Accuracy: number;
}
