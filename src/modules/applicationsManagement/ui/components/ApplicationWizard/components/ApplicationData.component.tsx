import { Button } from "@/common/ui/components/button";
import { Input } from "@/common/ui/components/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

type ApplicationDataProps = {
  value: string | undefined;
  onSave: (name: string, description: string) => void;
};

export const ApplicationData = ({ value, onSave }: ApplicationDataProps) => {
  const [name, setName] = useState(value);
  const [description, setDescription] = useState(value);

  return (
    <div data-testid="application-data-step">
      <Label htmlFor="name">Name</Label>
      <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      <Label htmlFor="description">Description</Label>
      <Input
        id="description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button onClick={() => onSave(name!, description!)} disabled={!name || !description}>
        Save
      </Button>
    </div>
  );
};
