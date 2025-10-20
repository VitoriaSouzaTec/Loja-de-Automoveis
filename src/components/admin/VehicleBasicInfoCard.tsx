import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Vehicle } from "@/lib/vehicles-data";

interface Props {
  formData: Partial<Vehicle>;
  updateFormData: <K extends keyof Vehicle>(key: K, value: Vehicle[K]) => void;
  handleNumberChange: (
    key: "price" | "year" | "mileage",
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const categoryOptions: { value: Vehicle["category"]; label: string }[] = [
  { value: "car", label: "Carro" },
  { value: "motorcycle", label: "Moto" },
  { value: "promotion", label: "Promoção" },
];

export const VehicleBasicInfoCard: React.FC<Props> = ({
  formData,
  updateFormData,
  handleNumberChange,
}) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nome/Modelo *</Label>
        <Input
          id="name"
          placeholder="Ex: BMW M5 Competition"
          value={formData.name || ""}
          onChange={(e) => updateFormData("name", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Preço (R$) *</Label>
        <Input
          id="price"
          type="number"
          placeholder="Ex: 650000"
          value={formData.price || 0}
          onChange={(e) => handleNumberChange("price", e)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="year">Ano *</Label>
        <Input
          id="year"
          type="number"
          placeholder="Ex: 2023"
          value={formData.year || new Date().getFullYear()}
          onChange={(e) => handleNumberChange("year", e)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Categoria *</Label>
        <Select
          value={formData.category}
          onValueChange={(value) =>
            updateFormData("category", value as Vehicle["category"])
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a Categoria" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="color">Cor *</Label>
        <Input
          id="color"
          placeholder="Ex: Azul Metálico"
          value={formData.color || ""}
          onChange={(e) => updateFormData("color", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="mileage">KM Rodado *</Label>
        <Input
          id="mileage"
          type="number"
          placeholder="Ex: 8000"
          value={formData.mileage || 0}
          onChange={(e) => handleNumberChange("mileage", e)}
          required
        />
      </div>
    </div>
  );
};
