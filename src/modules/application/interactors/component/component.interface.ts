import { ActorRefFromLogic } from "xstate";
import { Component } from "../../domain/entities";
import { componentLogic } from "./component.logic";

export type ComponentActor = ActorRefFromLogic<typeof componentLogic>;

export type ComponentContext = Component;

export type ComponentEvents =
  | { type: "HOVER_ENTER" }
  | { type: "HOVER_LEAVE" }
  | { type: "SELECT" }
  | { type: "UNSELECT" }
  | { type: "RENAME"; name: string }
  | { type: "UPDATE"; component: Component }
  | { type: "DELETE" }
  | {
      type: "ADD_CHILD";
      componentId: string;
      targetComponentId?: string;
      position?: "before" | "after";
    }
  | { type: "DELETE_CHILD"; componentId: string };
