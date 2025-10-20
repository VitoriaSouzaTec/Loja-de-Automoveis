import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Vehicle } from "@/lib/vehicles-data";

interface Props {
  formData: Partial<Vehicle>;
  updateFormData: <K extends keyof Vehicle>(key: K, value: Vehicle[K]) => void;
}

const fuelOptions: { value: Vehicle["fuel"]; label: string }[] = [
  { value: "gasoline", label: "Gasolina" },
  { value: "alcohol", label: "Álcool" },
  { value: "flex", label: "Flex" },
  { value: "diesel", label: "Diesel" },
  { value: "electric", label: "Elétrico" },
];

const transmissionOptions: { value: Vehicle["transmission"]; label: string }[] = [
  { value: "manual", label: "Manual" },
  { value: "automatic", label: "Automático" },
];

const steeringOptions: { value: Vehicle["steering"]; label: string }[] = [
  { value: "hydraulic", label: "Hidráulica" },
  { value: "electric", label: "Elétrica" },
  { value: "mechanical", label: "Mecânica" },
];

export const VehicleSpecsCard: React.FC<Props> = ({
  formData,
  updateFormData,
}) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="space-y-2">
        <Label htmlFor="fuel">Combustível *</Label>
        <Select
          value={formData.fuel}
          onValueChange={(value) =>
            updateFormData("fuel", value as Vehicle["fuel"])
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o Combustível" />
          </SelectTrigger>
          <SelectContent>
            {fuelOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="transmission">Câmbio *</Label>
        <Select
          value={formData.transmission}
          onValueChange={(value) =>
            updateFormData("transmission", value as Vehicle["transmission"])
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o Câmbio" />
          </SelectTrigger>
          <SelectContent>
            {transmissionOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="steering">Direção *</Label>
        <Select
          value={formData.steering}
          onValueChange={(value) =>
            updateFormData("steering", value as Vehicle["steering"])
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a Direção" />
          </SelectTrigger>
          <SelectContent>
            {steeringOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
