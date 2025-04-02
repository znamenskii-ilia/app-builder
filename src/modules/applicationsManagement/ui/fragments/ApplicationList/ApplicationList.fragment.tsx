import { useState, useEffect } from "react";

import { Application } from "../../../domain";
import { ApplicationList } from "../../components/ApplicationList";
import { NoApplicationsNotice } from "../../components/NoApplicationsNotice/NoApplicationsNotice.component";

const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setIsLoading(true);

    const fetchApplications = async () => {
      try {
        const applications = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=3")
          .then((res) => res.json())
          .then((data) => {
            if (data.length === 0) {
              return [];
            }

            if (data[0].body) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              return data.map((item: any) => ({
                id: item.id,
                name: item.name,
                description: item.body,
                lastModified: item.lastModified || Date.now(),
                pages: [],
                functions: [],
                dataSources: [],
              }));
            }

            return data;
          });

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
