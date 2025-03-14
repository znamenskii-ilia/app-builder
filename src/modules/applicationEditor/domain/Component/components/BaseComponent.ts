export type BaseComponent = {
  id: string;
  component: string;
  props: Record<string, unknown>;
  children: string[];
};
