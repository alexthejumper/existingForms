export interface VisitorLogRequest {
    visitor: VisitorRequest;
    reason: ReasonRequest2;
    badge: BadgeRequest;
    signature: string;
    attendeeName: string;
}


export interface VisitorRequest {
    visitorId: string,
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

export interface ReasonRequest2 {
  reasonId: string;
  reasonName: string;
  archived: boolean;
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

export interface BadgeRequest {
  badgeId: string,
  identification: string,
  badgeName: string
}
