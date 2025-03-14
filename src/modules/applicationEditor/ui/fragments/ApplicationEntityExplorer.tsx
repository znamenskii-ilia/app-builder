import { useSelector } from "@xstate/react";
import { useCallback, useMemo } from "react";
import { ActorRefFrom } from "xstate";
import { ApplicationEntity } from "../../domain/Application/ApplicationEntity";
import { applicationEditorLogic } from "../../interactors/applicationEditor/applicationEditor.logic";
import { EntityNavList, EntityNavListItem } from "../components/EntityNavList";
import { SidebarSection } from "../components/SidebarSection/SidebarSection";

export type ApplicationEntityExploreFragmentProps = {
  selectedEntityId: string;
  applicationEditorActor: ActorRefFrom<typeof applicationEditorLogic>;
};

export const ApplicationEntityExploreFragment = ({
  selectedEntityId,
  applicationEditorActor,
}: ApplicationEntityExploreFragmentProps) => {
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
    <>
      <SidebarSection title="Pages" isOpenDefault={isPageSelected}>
        <EntityNavList>
          {application.pages.map((page) => (
            <EntityNavListItem
              title={page.name}
              to={`/applications/${application.id}/pages/${page.id}`}
              isSelected={selectedEntityId === page.id}
              key={page.id}
            />
          ))}
        </EntityNavList>
      </SidebarSection>
      <SidebarSection title="JS Functions" isOpenDefault={isJsFunctionSelected}>
        <EntityNavList>
          {application.functions.map((jsFunction) => (
            <EntityNavListItem
              title={jsFunction.name}
              to={`/applications/${application.id}/functions/${jsFunction.id}`}
              isSelected={selectedEntityId === jsFunction.id}
              key={jsFunction.id}
            />
          ))}
        </EntityNavList>
      </SidebarSection>
      <SidebarSection title="Data Sources" isOpenDefault={isDataSourceSelected}>
        <EntityNavList>
          {application.dataSources.map((dataSource) => (
            <EntityNavListItem
              title={dataSource.name}
              to={`/applications/${application.id}/data-sources/${dataSource.id}`}
              isSelected={selectedEntityId === dataSource.id}
              key={dataSource.id}
            />
          ))}
        </EntityNavList>
      </SidebarSection>
      <SidebarSection title="Components">
        <div>Button</div>
        <div>Column</div>
      </SidebarSection>
    </>
  );
};
