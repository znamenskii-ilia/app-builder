import { Label } from "@/common/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@/common/ui/components/radio-group";

type ApplicationTemplateProps = {
  value: string | undefined;
  onValueChange: (value: string) => void;
};

export const ApplicationTemplate = ({ value, onValueChange }: ApplicationTemplateProps) => {
  return (
    <div data-testid="application-template-step">
      <RadioGroup value={value} onValueChange={onValueChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="blank" id="r1" />
          <Label htmlFor="r1">Blank</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="blog" id="r2" />
          <Label htmlFor="r2">Blog</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
