import { Label } from "@/common/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@/common/ui/components/radio-group";

type ApplicationTypeProps = {
  value: string | undefined;
  onValueChange: (value: string) => void;
};

export const ApplicationType = ({ value, onValueChange }: ApplicationTypeProps) => {
  return (
    <div data-testid="application-type-step">
      <RadioGroup value={value} onValueChange={onValueChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="web" id="r1" />
          <Label htmlFor="r1">Web</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="mobile" id="r2" />
          <Label htmlFor="r2">Mobile</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="email" id="r3" />
          <Label htmlFor="r3">Email</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
