import { Link } from "@tanstack/react-router";
import { Page } from "../../../domain/Page/Page";

interface PageListProps {
  pages: Page[];
  applicationId: string;
}

export const PageList = ({ pages = [], applicationId }: PageListProps) => {
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
      {pages.map((page) => (
        <Link
          key={page.id}
          to={`/applications/$applicationId/$pageId`}
          params={{ applicationId, pageId: page.id }}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          aria-label={`Page: ${page.name}`}
        >
          <div className="p-6">
            <div>
              <h2 className="text-lg font-semibold">{page.name}</h2>
            </div>

            <p className="text-gray-700 mb-4 line-clamp-2">{page.description}</p>

            <div className="flex items-center">
              <span className="text-sm text-gray-500">
                Last modified: {formatDate(page.lastModified)}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
