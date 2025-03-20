import { Component } from "../Component/Component";

export type Page = {
  id: string;
  applicationId: string;
  name: string;
  metadata: {
    title: string;
  };
  children: Record<string, Component>;
  childrenOrder: string[];
};
