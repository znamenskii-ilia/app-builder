import { useSelector } from "@xstate/react";
import { useCallback, useMemo } from "react";
import { ActorRefFrom } from "xstate";
import { applicationEditorLogic } from "../../application/interactors/applicationEditor/applicationEditor.logic";
import type { ApplicationEntity } from "../../domain";
import { AppExplorer, AppExplorerItem, AppExplorerSection } from "../components/AppExplorer";

export type AppExplorerFragmentProps = {
  selectedEntityId: string;
  applicationEditorActor: ActorRefFrom<typeof applicationEditorLogic>;
};

export const AppExplorerFragment = ({
  selectedEntityId,
  applicationEditorActor,
}: AppExplorerFragmentProps) => {
  const application = useSelector(applicationEditorActor, (state) => state.context.application);

  const isEntitySelected = useCallback(
    (entities: ApplicationEntity[] | undefined) => {
      return entities?.some(({ id }) => id === selectedEntityId);
    },
    [selectedEntityId],
  );

  const isPageSelected = useMemo(
    () => isEntitySelected(application?.pages),
    [isEntitySelected, application?.pages],
  );
  const isJsFunctionSelected = useMemo(
    () => isEntitySelected(application?.functions),
    [isEntitySelected, application?.functions],
  );
  const isDataSourceSelected = useMemo(
    () => isEntitySelected(application?.dataSources),
    [isEntitySelected, application?.dataSources],
  );

  if (!application) {
    return null;
  }

  return (
    <AppExplorer>
      <AppExplorerSection title="Pages" isOpenDefault={isPageSelected}>
        {application.pages.map((page) => (
          <AppExplorerItem
            title={page.name}
            to={`/applications/${application.id}/pages/${page.id}`}
            isSelected={selectedEntityId === page.id}
            key={page.id}
          />
        ))}
      </AppExplorerSection>
      <AppExplorerSection title="JS Functions" isOpenDefault={isJsFunctionSelected}>
        <AppExplorer>
          {application.functions.map((jsFunction) => (
            <AppExplorerItem
              title={jsFunction.name}
              to={`/applications/${application.id}/functions/${jsFunction.id}`}
              isSelected={selectedEntityId === jsFunction.id}
              key={jsFunction.id}
            />
          ))}
        </AppExplorer>
      </AppExplorerSection>
      <AppExplorerSection title="Data Sources" isOpenDefault={isDataSourceSelected}>
        {application.dataSources.map((dataSource) => (
          <AppExplorerItem
            title={dataSource.name}
            to={`/applications/${application.id}/data-sources/${dataSource.id}`}
            isSelected={selectedEntityId === dataSource.id}
            key={dataSource.id}
          />
        ))}
      </AppExplorerSection>
    </AppExplorer>
  );
};
