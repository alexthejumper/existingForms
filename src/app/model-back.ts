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


export interface GetReasonResponse {
  content: ReasonRequest[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  offset: number;
  pages: boolean;
  unpaged: boolean;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
}

export interface BadgeValidityResponse {
  valid: boolean;
  message?: string;
}
