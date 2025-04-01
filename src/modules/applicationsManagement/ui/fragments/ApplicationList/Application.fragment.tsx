import { Application } from "@/modules/applicationsManagement/domain";
import { ApplicationDetails } from "@/modules/applicationsManagement/ui/components/ApplicationDetails";

type ApplicationFragmentProps = {
  applicationId: string;
};

export const ApplicationFragment = ({ applicationId }: ApplicationFragmentProps) => {
  const applications: Application[] = [
    {
      id: "1",
      name: "Application 12",
      description: "Description 1",
      lastModified: 1717171717171,
      pages: [
        {
          id: "page-1",
          name: "Page 1",
        },
        {
          id: "page-2",
          name: "Page 2",
        },
      ],
      functions: [],
      dataSources: [],
    },
    {
      id: "2",
      name: "Application 2",
      description: "Description 2",
      lastModified: 1717171717171,
      pages: [],
      functions: [],
      dataSources: [],
    },
  ];

  const application = applications.find((application) => application.id === applicationId);

  if (!application) {
    return <div>Application not found</div>;
  }

  return <ApplicationDetails application={application} />;
};
