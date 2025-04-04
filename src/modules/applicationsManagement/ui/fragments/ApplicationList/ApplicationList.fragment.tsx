import { useState, useEffect } from "react";

import { Application } from "../../../domain";
import { ApplicationList } from "../../components/ApplicationList";
import { NoApplicationsNotice } from "../../components/NoApplicationsNotice/NoApplicationsNotice.component";
import { getApplications } from "../../../api/api";
const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const fetchApplications = async () => {
      setIsLoading(true);

      try {
        const applications = await getApplications();

        setApplications(applications);
        setIsLoading(false);
      } catch (error) {
        setError(error as string);
        setIsLoading(false);
      }
    };

    fetchApplications();

    return () => {
      setApplications([]);
    };
  }, []);

  return { applications, isLoading, error };
};

export const ApplicationListFragment = () => {
  const { applications, isLoading, error } = useApplications();

  if (isLoading) {
    return (
      <div data-testid="application-list-fragment">
        <div data-testid="application-list-fragment-loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div data-testid="application-list-fragment">
        <div data-testid="application-list-fragment-error">Failed to load applications</div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div data-testid="application-list-fragment">
        <NoApplicationsNotice />
      </div>
    );
  }

  return (
    <div data-testid="application-list-fragment">
      <ApplicationList applications={applications} />
    </div>
  );
};
