// components/VehicleActionsCard.tsx

import { Button } from "@/components/ui/button";

interface Props {
  editingVehicle: boolean;
  handleCancel: () => void;
}

export const VehicleActionsCard: React.FC<Props> = ({
  editingVehicle,
  handleCancel,
}) => {
  return (
    <div className="flex gap-4 pt-4 border-t border-border/50">
      <Button
        type="submit"
        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
        size="lg"
      >
        {editingVehicle ? "Atualizar Veículo" : "Salvar Novo Veículo"}
      </Button>

      <Button
        type="button"
        variant="outline"
        onClick={handleCancel}
        size="lg"
      >
        Cancelar
      </Button>
    </div>
  );
};
