import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Vehicle } from "@/lib/vehicles-data";

interface Props {
  formData: Partial<Vehicle>;
  updateFeature: (key: keyof Vehicle["features"], checked: boolean | "indeterminate") => void;
}

const featureList: { key: keyof Vehicle["features"]; label: string }[] = [
  { key: "airConditioning", label: "Ar Condicionado" },
  { key: "airbag", label: "Airbag" },
  { key: "alarm", label: "Alarme" },
  { key: "parkingSensor", label: "Sensor de Ré" },
  { key: "electricLocks", label: "Trava Elétrica" },
  { key: "electricWindows", label: "Vidros Elétricos" },
  { key: "abs", label: "Freios ABS" },
];

export const VehicleFeaturesCard: React.FC<Props> = ({
  formData,
  updateFeature,
}) => {
  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
      {featureList.map((feature) => (
        <div key={feature.key} className="flex items-center space-x-3">
          <Checkbox
            id={feature.key}
            checked={!!formData.features?.[feature.key]}
            onCheckedChange={(checked) => updateFeature(feature.key, checked)}
          />
          <Label
            htmlFor={feature.key}
            className="cursor-pointer text-sm font-medium"
          >
            {feature.label}
          </Label>
        </div>
      ))}
    </div>
  );
};
