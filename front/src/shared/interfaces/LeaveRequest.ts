export interface LeaveRequest {
    id: number;
    startAt: string;
    endAt: string;
    status: 'waiting' | 'accepted' | 'refused';
    userId: number;
    createdAt: string;
    updatedAt: string;
}