import { useEffect, useState } from "react";

import { Application } from "@/modules/applicationsManagement/domain";
import { ApplicationDetails } from "@/modules/applicationsManagement/ui/components/ApplicationDetails";

type ApplicationFragmentProps = {
  applicationId: string;
};

const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchApplications = async () => {
      const applications = await fetch(
        "https://jsonplaceholder.typicode.com/comments?_limit=10",
      ).then((res) => res.json());
      setApplications(applications);
      setIsLoading(false);
    };

    fetchApplications();

    return () => {
      setApplications([]);
    };
  }, []);

  return { applications, isLoading };
};

export const ApplicationFragment = ({ applicationId }: ApplicationFragmentProps) => {
  const { applications, isLoading } = useApplications();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const application = applications.find((application) => application.id === applicationId);

  if (!application) {
    return <div>Application not found</div>;
  }

  return <ApplicationDetails application={application} />;
};
