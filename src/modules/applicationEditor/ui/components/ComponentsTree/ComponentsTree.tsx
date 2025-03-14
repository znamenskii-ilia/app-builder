export type ComponentsTreeProps = {
  children: React.ReactNode;
};

export const ComponentsTree = ({ children }: ComponentsTreeProps) => {
  return (
    <div className="flex flex-col" data-component="ComponentsTree">
      {children}
    </div>
  );
};
