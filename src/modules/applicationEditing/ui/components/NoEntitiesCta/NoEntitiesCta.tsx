import { Link } from "@tanstack/react-router";
import { tv } from "tailwind-variants";

type NoEntitiesCtaProps = {
  applicationId: string;
  entityType: "page" | "function" | "dataSource";
};

const makeStyles = tv({
  slots: {
    base: "flex flex-col items-start gap-2 p-5",
  },
});

export const NoEntitiesCta = ({ entityType, applicationId }: NoEntitiesCtaProps) => {
  const styles = makeStyles();

  const resolvePlural = () => {
    if (entityType === "page") return "pages";
    if (entityType === "function") return "functions";
    if (entityType === "dataSource") return "data sources";
  };

  const resolveEntityPath = () => {
    if (entityType === "page") return "pages";
    if (entityType === "function") return "functions";
    if (entityType === "dataSource") return "data-sources";

    throw new Error(`Unknown entity type: ${entityType}`);
  };

  return (
    <div className={styles.base()}>
      <p>You don't have any {resolvePlural()} yet.</p>
      <Link
        to="/applications/$applicationId/$entityType/$entityId"
        params={{
          applicationId,
          entityType: resolveEntityPath(),
          entityId: "new",
        }}
      >
        Create
      </Link>
    </div>
  );
};
