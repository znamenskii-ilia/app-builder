import { Link } from "@tanstack/react-router";
import type { Application } from "../../../domain";

type ApplicationListProps = {
  applications: Application[];
};

export const ApplicationList = ({ applications = [] }: ApplicationListProps) => {
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {applications.map((application) => (
        <Link
          key={application.id}
          to={`/applications/$application`}
          params={{ application: application.id }}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          aria-label={`Application: ${application.name}`}
        >
          <div className="p-6">
            <div>
              <h2 className="text-lg font-semibold">{application.name}</h2>
            </div>

            <p className="text-gray-700 mb-4 line-clamp-2">{application.description}</p>

            <div className="flex items-center">
              <span className="text-sm text-gray-500">
                Last modified: {formatDate(application.lastModified)}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
