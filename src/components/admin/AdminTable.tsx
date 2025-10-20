// src/components/AdminTable.tsx

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Vehicle } from "@/lib/vehicles-data";

interface AdminTableProps {
  vehicles: Vehicle[];
  handleEdit: (vehicle: Vehicle) => void;
  handleDelete: (id: string) => void;
  handleNewVehicle: () => void;
}

export const AdminTable: React.FC<AdminTableProps> = ({ vehicles, handleEdit, handleDelete, handleNewVehicle }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Veículos Cadastrados</h2>
          <p className="text-muted-foreground">{vehicles.length} veículos no total</p>
        </div>
        <Button
          onClick={handleNewVehicle}
          className="gap-2 bg-gradient-to-r from-primary to-primary/80"
        >
          <Plus className="h-4 w-4" />
          Novo Veículo
        </Button>
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            {/* TableHead com as colunas... */}
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell className="font-medium">{vehicle.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {vehicle.category === "car" ? "Carro" : vehicle.category === "motorcycle" ? "Moto" : "Promoção"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(vehicle.price)}
                </TableCell>
                <TableCell>{vehicle.year}</TableCell>
                <TableCell>
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                    Ativo
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(vehicle)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(vehicle.id)} className="text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};