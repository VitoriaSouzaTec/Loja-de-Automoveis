// components/VehicleDescriptionCard.tsx

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Vehicle } from "@/lib/vehicles-data";

interface Props {
  formData: Partial<Vehicle>;
  updateFormData: <K extends keyof Vehicle>(key: K, value: Vehicle[K]) => void;
}

export const VehicleDescriptionCard: React.FC<Props> = ({
  formData,
  updateFormData,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="description">Descrição</Label>
      <Textarea
        id="description"
        rows={4}
        placeholder="Detalhes importantes sobre o veículo, como motorização, histórico e estado de conservação."
        value={formData.description || ""}
        onChange={(e) => updateFormData("description", e.target.value)}
      />
    </div>
  );
};
