export interface VisitorLogRequest {
    visitor: VisitorRequest;
    badgeId: string;
    reasonId: string;
    otherReason?: string;
    signature: string;
    attendeeName: string;
}


export interface VisitorRequest {
    firstName: string;
    lastName: string;
    contactNumber: string;
    company: CompanyRequest;
}

export interface CompanyRequest {
    companyId: string;
    companyName: string;
}

export interface ReasonRequest {
    reasonId: string;
    reason: string;
}