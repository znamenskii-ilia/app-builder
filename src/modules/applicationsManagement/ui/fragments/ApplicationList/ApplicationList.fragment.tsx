import { Application } from "../../../domain";
import { ApplicationList } from "../../components/ApplicationList";

export const ApplicationListFragment = () => {
  const applications: Application[] = [
    {
      id: "1",
      name: "Application 1",
      description: "Description 1",
      lastModified: 1717171717171,
      pages: [],
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

  if (applications.length === 0) {
    return (
      <div>
        <div>You have no applications yet</div>
        {/* <Link to="/applications/new">Create Application</Link> */}
      </div>
    );
  }

  return <ApplicationList applications={applications} />;
};
