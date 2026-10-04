export interface ChildImage {
  url: string;
  public_id: string;
}

export interface ChildEducation {
  isStudying?: boolean;
  educationStage?: string;
  currentLevel?: string;
  schoolName?: string;
  classGrade?: string;
  currentClass?: string;
  academicYear?: string;
  enrollmentDate?: string;
  courseName?: string;
  courseDurationValue?: number | string;
  courseDurationUnit?: "months" | "years" | string;
  expectedGraduationDate?: string;
  expectedGraduationYear?: string;
  graduationStage?: string;
  estimatedGraduationYear?: string;
  lastTermResult?: string;
  graduationTarget?: string;
  educationNotes?: string;
}

export interface ChildReportCard {
  _id?: string;
  name?: string;
  description?: string;
  url?: string;
  public_id?: string;
  fileType?: string;
  uploadedAt?: string;
}

export interface ChildSponsor {
  _id: string;
  fullName?: string;
  name?: string;
  email?: string;
  phone?: string;
  [key: string]: unknown;
}

/** The raw profile shape returned by GET /api/children/profiles. */
export interface SponsorshipProfile {
  _id: string;
  firstName: string;
  secondName: string;
  givenName: string;
  gender: "Male" | "Female";
  dateOfBirth: string;
  age: number;
  ageGroup: string;
  class: string;
  nationality: string;
  familyStatus: "Total Orphans" | "Single Parent";
  numberOfParents: 0 | 1 | 2;
  guardianName?: string;
  guardianContact?: string;
  guardianRelation?:
    | "caretaker"
    | "mom"
    | "dad"
    | "sibling"
    | "uncle"
    | "aunt"
    | "grandparent";
  image: ChildImage;
  background?: string;
  school?: string;
  location?: string;
  needs?: string;
  monthlyNeed?: number;
  publicPosterApproved?: boolean;
  education?: ChildEducation;
  reportCards?: ChildReportCard[];
  progress?: number;
  sponsorshipStatus: "Sponsored" | "Available";
  sponsor?: ChildSponsor | null;
}

export const CHILDREN_PROFILES_QUERY_KEY = ["children", "profiles"] as const;

export function getChildDisplayName(profile: Pick<SponsorshipProfile, "firstName" | "secondName">) {
  return `${profile.firstName} ${profile.secondName}`.trim();
}
