// Interface for a single tag (e.g., salaryTEL

// Interface for a single tag (e.g., salary, employment type, seniority level)
interface Tag {
  label: string;
  icon: string;
  bgColor: string;
  textColor: string;
}

// Interface for job details (start date, experience, applicants, etc.)
interface JobDetails {
  startDate: string;
  experience: string;
  applicants: string;
  timeLeft?: string; // Optional for active jobs
  status?: string; // Optional for closed jobs
}

// Interface for application progress
interface ApplicationProgress {
  current: number;
  total: number;
  percentage: number;
}

// Interface for an applicant
interface Applicant {
  avatar?: string; // Optional for individual avatars
  additional?: string; // Optional for additional count
}

// Interface for an action (view, edit, search)
interface Action {
  icon: string;
  function: string;
  route?: string; // Optional for specific routes (e.g., edit)
}

// Main interface for a job
export interface JobModel {
  id: number;
  title: string;
  status: string;
  statusColor: string;
  department: string;
  location: string;
  icon: string;
  tags: Tag[];
  details: JobDetails;
  applicationProgress: ApplicationProgress;
  applicants: Applicant[];
}