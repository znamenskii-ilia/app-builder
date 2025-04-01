import { Braces, Database, PanelsTopLeft } from "lucide-react";
import { useState } from "react";
import { tv } from "tailwind-variants";

import { Application } from "@/modules/applicationEditing/domain";
import { AppEntityExplorer, AppEntityExplorerItem } from "../AppEntityExplorer";
import { NoEntitiesCta } from "../NoEntitiesCta/NoEntitiesCta";

type AppNavProps = {
  application: Application;
  onEntityDelete: (entityId: string, entityType: "page" | "function" | "dataSource") => void;
};

const makeStyles = tv({
  slots: {
    base: "flex",
    navPanel: "flex flex-col items-center",
    navButton: "p-2 hover:bg-gray-200",
    entityPanel: "w-64 bg-gray-300",
  },
  variants: {
    isActive: {
      true: {
        navButton: "bg-gray-300",
      },
    },
  },
});

export const AppNav = ({ application, onEntityDelete }: AppNavProps) => {
  const [openPanel, setOpenPanel] = useState<"pages" | "functions" | "dataSources" | null>(null);
  const styles = makeStyles();
  const handlePanelClick = (panel: "pages" | "functions" | "dataSources") => {
    setOpenPanel(openPanel === panel ? null : panel);
  };

  return (
    <div className={styles.base()}>
      <div className={styles.navPanel()}>
        <button
          className={styles.navButton({ isActive: openPanel === "pages" })}
          onClick={() => handlePanelClick("pages")}
        >
          <PanelsTopLeft width={22} height={22} />
        </button>
        <button
          className={styles.navButton({ isActive: openPanel === "functions" })}
          onClick={() => handlePanelClick("functions")}
        >
          <Braces width={22} height={22} />
        </button>
        <button
          className={styles.navButton({ isActive: openPanel === "dataSources" })}
          onClick={() => handlePanelClick("dataSources")}
        >
          <Database width={22} height={22} />
        </button>
      </div>

      {openPanel && (
        <div className={styles.entityPanel()}>
          {openPanel === "pages" && (
            <AppEntityExplorer>
              {application.pages.length > 0 ? (
                application.pages.map((page) => (
                  <AppEntityExplorerItem
                    key={page.id}
                    title={page.name}
                    to={`/applications/${application.id}/pages/${page.id}`}
                    onDelete={() => {
                      onEntityDelete(page.id, "page");
                    }}
                  />
                ))
              ) : (
                <NoEntitiesCta entityType="page" applicationId={application.id} />
              )}
            </AppEntityExplorer>
          )}
          {openPanel === "functions" && (
            <AppEntityExplorer>
              {application.functions.length > 0 ? (
                application.functions.map((jsFunction) => (
                  <AppEntityExplorerItem
                    key={jsFunction.id}
                    title={jsFunction.name}
                    to={`/applications/${application.id}/functions/${jsFunction.id}`}
                    onDelete={() => {
                      onEntityDelete(jsFunction.id, "function");
                    }}
                  />
                ))
              ) : (
                <NoEntitiesCta entityType="function" applicationId={application.id} />
              )}
            </AppEntityExplorer>
          )}
          {openPanel === "dataSources" && (
            <AppEntityExplorer>
              {application.dataSources.length > 0 ? (
                application.dataSources.map((dataSource) => (
                  <AppEntityExplorerItem
                    key={dataSource.id}
                    title={dataSource.name}
                    to={`/applications/${application.id}/dataSources/${dataSource.id}`}
                    onDelete={() => {
                      onEntityDelete(dataSource.id, "dataSource");
                    }}
                  />
                ))
              ) : (
                <NoEntitiesCta entityType="dataSource" applicationId={application.id} />
              )}
            </AppEntityExplorer>
          )}
        </div>
      )}
    </div>
  );
};
