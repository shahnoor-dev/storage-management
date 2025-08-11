import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SettingsInputProps {
  id: string;
  label: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SettingsInput({ id, label, value, type = "text", onChange }: SettingsInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-500">{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="bg-gray-50 border-gray-200 rounded-lg"
      />
    </div>
  );
}