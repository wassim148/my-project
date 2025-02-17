export interface LeaveRequest {
    id: number;
    startAt: string;
    endAt: string;
    statut: 'en attente' | 'accepté' | 'refusé';
    userId: number;
    createdAt: string;
    updatedAt: string;
}