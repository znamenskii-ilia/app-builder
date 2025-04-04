import { Button } from "@/common/ui/components/button";
import { Input } from "@/common/ui/components/input";
import { useState } from "react";

type ApplicationDataProps = {
  value: string | undefined;
  onSave: (name: string, description: string) => void;
};

export const ApplicationData = ({ value, onSave }: ApplicationDataProps) => {
  const [name, setName] = useState(value);
  const [description, setDescription] = useState(value);

  return (
    <div>
      <Input name="name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input
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
