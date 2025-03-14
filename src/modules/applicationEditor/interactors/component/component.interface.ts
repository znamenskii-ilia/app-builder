import { ActorRefFromLogic, AnyActorLogic } from "xstate";
import { Component } from "../../domain";
import { BaseComponent } from "../../domain/Component/components/BaseComponent";

export type ComponentActor = ActorRefFromLogic<AnyActorLogic>;

export type ComponentContext = BaseComponent;

export type ComponentEvents =
  | { type: "HOVER_ENTER" }
  | { type: "HOVER_LEAVE" }
  | { type: "SELECT" }
  | { type: "UNSELECT" }
  | { type: "UPDATE"; component: Component }
  | { type: "ADD_COMPONENT"; componentId: string };
