//* eslint-disable no-irregular-whitespace */

import { useState } from "react"
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Vehicle } from "@/lib/vehicles-data";

import { VehicleBasicInfoCard } from "./VehicleBasicInfoCard";
import { VehicleSpecsCard } from "./VehicleSpecsCard";
import { VehicleImageUploadCard } from "./VehicleImagesCard";
import { VehicleFeaturesCard } from "./VehicleFeaturesCard";
import { VehicleDescriptionCard } from "./VehicleDescriptionCard";
import { VehicleActionsCard } from "./VehicleActions";

interface AdminFormProps {
  formData: Partial<Vehicle>;
  editingVehicle: Vehicle | null;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Vehicle>>>;
  handleSaveVehicle: (e: React.FormEvent) => void;
  handleCancel: () => void;
}

export const AdminForm: React.FC<AdminFormProps> = ({
  formData,
  editingVehicle,
  setFormData,
  handleSaveVehicle,
  handleCancel,
}) => {
  const [tempImageUrl, setTempImageUrl] = useState("");
  // FUNÇÃO CORRIGIDA: Usa o tipo Vehicle[K] para garantir que o valor passado é compatível
  const updateFormData = <K extends keyof Vehicle>(
    key: K,
    value: Vehicle[K]
  ) => {
    // Aqui, o TypeScript sabe exatamente qual é o tipo de 'value' baseado em 'key'
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const updateFeature = (
    key: keyof Vehicle["features"],
    checked: boolean | "indeterminate"
  ) => {
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features!,
        [key]: checked as boolean, // Assumimos que a feature é sempre um booleano
      },
    }));
  };

  //funcao para add imagem pela url
  const addImageToForm = (imageUrl: string) => {
    const currentImages = formData.images || [];

    if (currentImages.length >= 3) {
      alert("Você só pode adicionar até 3 imagens.");
      return;
    }
    // Usa updateFormData para o array 'images'
    updateFormData("images", [...currentImages, imageUrl] as Vehicle["images"]);
    setTempImageUrl(""); // Limpa o campo de URL após adicionar
  };

  //funcao pra add imagem por uploud
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentImages = formData.images || [];
    if (currentImages.length >= 3) {
      alert("Limite de 3 imagens atingido.");
      e.target.value = ""; // limpa o input
      return;
    }
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        addImageToForm(reader.result as string);
      };
      reader.readAsDataURL(file);
    } // Limpa o input de arquivo após o upload
    e.target.value = "";
  };
  const handleImageUrlAdd = () => {
    if (tempImageUrl.trim()) {
      addImageToForm(tempImageUrl.trim());
    }
  };

  const removeImage = (indexToRemove: number) => {
    const currentImages = formData.images || [];
    const newImages = currentImages.filter(
      (_, index) => index !== indexToRemove
    ); // Atualiza o array 'images'
    updateFormData("images", newImages as Vehicle["images"]);
  };

  // Esta função lê o string e converte para number, garantindo que o tipo final é correto
  const handleNumberChange = (
    key: "price" | "year" | "mileage",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(e.target.value);
    // Chamamos a função genérica que agora aceita 'number' para estas chaves
    updateFormData(key, value);
  };

  // Opções para Selects
  type CategoryType = Vehicle["category"];
  type FuelType = Vehicle["fuel"];
  type TransmissionType = Vehicle["transmission"];
  type SteeringType = Vehicle["steering"];

  const categoryOptions: { value: CategoryType; label: string }[] = [
    { value: "car", label: "Carro" },
    { value: "motorcycle", label: "Moto" },
    { value: "promotion", label: "Promoção" },
  ];
  // ... (definições de outras opções omitidas para brevidade, mas devem estar aqui)
  const fuelOptions: { value: FuelType; label: string }[] = [
    { value: "gasoline", label: "Gasolina" },
    { value: "alcohol", label: "Álcool" },
    { value: "flex", label: "Flex" },
    { value: "diesel", label: "Diesel" },
    { value: "electric", label: "Elétrico" },
  ];
  const transmissionOptions: { value: TransmissionType; label: string }[] = [
    { value: "manual", label: "Manual" },
    { value: "automatic", label: "Automático" },
  ];
  const steeringOptions: { value: SteeringType; label: string }[] = [
    { value: "hydraulic", label: "Hidráulica" },
    { value: "electric", label: "Elétrica" },
    { value: "mechanical", label: "Mecânica" },
  ];

  const featureList: { key: keyof Vehicle["features"]; label: string }[] = [
    { key: "airConditioning", label: "Ar Condicionado" },
    { key: "airbag", label: "Airbag" },
    { key: "alarm", label: "Alarme" },
    { key: "parkingSensor", label: "Sensor de Ré" },
    { key: "electricLocks", label: "Trava Elétrica" },
    { key: "electricWindows", label: "Vidros Elétricos" },
    { key: "abs", label: "Freios ABS" },
  ];

  return (
  <Card className="p-6 bg-gradient-to-b from-card to-card/80 rounded-xl shadow-2xl">
    <h2 className="text-3xl font-extrabold mb-6 text-primary">
      {editingVehicle ? "Editar Veículo" : "Novo Veículo"}
    </h2>

    <form onSubmit={handleSaveVehicle} className="space-y-8">

      {/* INFORMAÇÕES BÁSICAS */}
      <VehicleBasicInfoCard
        formData={formData}
        updateFormData={updateFormData}
        handleNumberChange={handleNumberChange}
      />

      {/* ESPECIFICAÇÕES TÉCNICAS */}
      <h3 className="text-xl font-semibold border-b pb-2 text-primary/80">
        Especificações Técnicas
      </h3>
      <VehicleSpecsCard
        formData={formData}
        updateFormData={updateFormData}
      />

      {/* DESCRIÇÃO */}
      <VehicleDescriptionCard
      formData={formData}
      updateFormData={updateFormData} 
      />


      {/* IMAGENS */}
      <h3 className="text-xl font-semibold border-b pb-2 text-primary/80">
        Imagens do Veículo
      </h3>
      <VehicleImageUploadCard
        formData={formData}
        tempImageUrl={tempImageUrl}
        setTempImageUrl={setTempImageUrl}
        handleImageUpload={handleImageUpload}
        handleImageUrlAdd={handleImageUrlAdd}
        removeImage={removeImage}
      />
      

      {/* OPCIONAIS */}
      <h3 className="text-xl font-semibold border-b pb-2 text-primary/80">
        Opcionais (Features)
      </h3>
      <VehicleFeaturesCard
        formData={formData}
        updateFeature={updateFeature}
      />

      {/* BOTÕES DE AÇÃO */}
      <VehicleActionsCard
      editingVehicle={!!editingVehicle}
      handleCancel={handleCancel}
/>
    </form>
  </Card>
);
};
