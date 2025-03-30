export interface Job {
    id: string;
    title: string;
    companyName: string;
    companyLogo: string;
    minSalary?: string;
    maxSalary?: string;
  }

  interface JobFinderPageProps {
    savedJobs: Job[];
    appliedJobs: string[];
    onSaveJob: (job: Job) => Promise<void>;
    onRemoveJob: (jobId: string) => Promise<void>;
    onApplyJob: (jobId: string) => Promise<void>; 
    onLogout: () => void;
  }