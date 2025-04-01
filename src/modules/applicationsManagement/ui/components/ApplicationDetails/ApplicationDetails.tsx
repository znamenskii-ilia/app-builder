import { Application } from "@/modules/applicationsManagement/domain";

type ApplicationDetailsProps = {
  application: Application;
};

export const ApplicationDetails = ({ application }: ApplicationDetailsProps) => {
  return (
    <div>
      <div>
        <h1>{application.name}</h1>
        <p>{application.description}</p>
      </div>
    </div>
  );
};
