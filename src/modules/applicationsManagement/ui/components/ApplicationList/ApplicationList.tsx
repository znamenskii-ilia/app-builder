import { Link } from "@tanstack/react-router";
import { Application } from "../../../domain";

type ApplicationListProps = {
  applications: Application[];
};

export const ApplicationList = ({ applications }: ApplicationListProps) => {
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {applications.map((application) => (
        <li key={application.id}>
          <Link
            to="/applications/$applicationId"
            params={{ applicationId: application.id }}
            className="block overflow-hidden rounded-lg border border-gray-200 bg-white"
            aria-label={`Application: ${application.name}`}
          >
            <div className="p-6">
              <div>
                <h2 className="text-lg font-semibold">{application.name}</h2>
              </div>

              <p className="mb-4 line-clamp-2 text-gray-700">{application.description}</p>

              <div className="flex items-center">
                <span className="text-sm text-gray-500">
                  Last modified: {formatDate(application.lastModified)}
                </span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
