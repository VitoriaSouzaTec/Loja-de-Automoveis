import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { Vehicle } from "@/lib/vehicles-data";

interface Props {
  formData: Partial<Vehicle>;
  tempImageUrl: string;
  setTempImageUrl: React.Dispatch<React.SetStateAction<string>>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageUrlAdd: () => void;
  removeImage: (index: number) => void;
}

export const VehicleImageUploadCard: React.FC<Props> = ({
  formData,
  tempImageUrl,
  setTempImageUrl,
  handleImageUpload,
  handleImageUrlAdd,
  removeImage,
}) => {
  return (
    <div className="space-y-4">
      <Label className="block">Adicionar Nova Imagem</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full">
          <Label htmlFor="image-file" className="cursor-pointer block w-full">
            <div className="flex items-center justify-center gap-2 h-10 px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md transition-colors w-full">
              <Upload className="h-4 w-4" />
              Upload Arquivo
            </div>
          </Label>
          <Input
            id="image-file"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        <div className="flex gap-2 w-full">
          <Input
            id="image-url"
            value={tempImageUrl}
            onChange={(e) => setTempImageUrl(e.target.value)}
            placeholder="ou Cole URL da imagem"
            className="flex-grow"
          />
          <Button
            type="button"
            onClick={handleImageUrlAdd}
            disabled={!tempImageUrl.trim()}
          >
            Adicionar
          </Button>
        </div>
      </div>

      <div className="pt-2">
        <Label className="block mb-2 text-sm text-muted-foreground">
          Imagens Atuais ({formData.images?.length || 0})
        </Label>
        <div className="flex flex-wrap gap-4">
          {(formData.images || []).map((image, index) => (
            <div
              key={index}
              className="relative w-24 h-24 border rounded-lg overflow-hidden flex-shrink-0 bg-muted"
            >
              <img
                src={image}
                alt={`Veículo Imagem ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-0 right-0 h-5 w-5 p-0"
                onClick={() => removeImage(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
          {formData.images?.length === 0 && (
            <p className="text-sm text-muted-foreground italic">
              Nenhuma imagem adicionada.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
