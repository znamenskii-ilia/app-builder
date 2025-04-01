export type ConfirmationModalEvents =
  | {
      type: "OPEN";
      id: string;
      onConfirm: () => void;
      onDiscard?: () => void;
    }
  | {
      type: "DISCARD";
      id: string;
    }
  | {
      type: "CONFIRM";
      id: string;
    };
