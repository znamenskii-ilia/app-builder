import { HTMLAttributes } from "react";

type NoApplicationsNoticeProps = HTMLAttributes<HTMLDivElement>;

export const NoApplicationsNotice = ({ ...props }: NoApplicationsNoticeProps) => {
  return (
    <div data-testid="no-applications-notice" {...props}>
      <div>You have no applications yet</div>
      {/* <Link to="/applications/new">Create Application</Link> */}
    </div>
  );
};
