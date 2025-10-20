// src/hooks/useAdminLogic.ts

import { useState } from "react";
import { mockVehicles, Vehicle } from "@/lib/vehicles-data";
import { useToast } from "@/hooks/use-toast"; // Assumindo que você usa este hook

// Tipo para as funcionalidades do hook (o que ele irá retornar)
interface AdminLogic {
  isAuthenticated: boolean;
  loginData: { username: string; password: string };
  vehicles: Vehicle[];
  showForm: boolean;
  editingVehicle: Vehicle | null;
  formData: Partial<Vehicle>;
  setLoginData: React.Dispatch<React.SetStateAction<{ username: string; password: string }>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Vehicle>>>;
  handleLogin: (e: React.FormEvent) => void;
  handleSaveVehicle: (e: React.FormEvent) => void;
  handleEdit: (vehicle: Vehicle) => void;
  handleDelete: (id: string) => void;
  resetForm: () => void;
}

const initialFormState: Partial<Vehicle> = {
  name: "",
  price: 0,
  year: new Date().getFullYear(),
  category: "car",
  fuel: "gasoline",
  transmission: "automatic",
  color: "",
  steering: "electric",
  mileage: 0,
  description: "",
  images: [],
  features: {
    airConditioning: false,
    airbag: false,
    alarm: false,
    parkingSensor: false,
    electricLocks: false,
    electricWindows: false,
    abs: false,
  },
};

export const useAdminLogic = (): AdminLogic => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState<Partial<Vehicle>>(initialFormState);
  const { toast } = useToast();

  const resetForm = () => {
    setFormData(initialFormState);
    setEditingVehicle(null);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === "admin" && loginData.password === "admin") {
      setIsAuthenticated(true);
      toast({ title: "Login realizado", description: "Bem-vindo ao painel administrativo" });
    } else {
      toast({ title: "Erro", description: "Credenciais inválidas", variant: "destructive" });
    }
  };

  const handleSaveVehicle = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.color) {
      toast({ title: "Erro", description: "Preencha todos os campos obrigatórios", variant: "destructive" });
      return;
    }

    if (editingVehicle) {
      setVehicles(vehicles.map(v => v.id === editingVehicle.id ? { ...formData, id: editingVehicle.id } as Vehicle : v));
      toast({ title: "Sucesso", description: "Veículo atualizado com sucesso" });
    } else {
      // É crucial garantir que o novo veículo tenha todas as propriedades da interface Vehicle
      const newVehicle = {
        ...initialFormState, // Usa o estado inicial para garantir todas as propriedades
        ...formData,
        id: String(vehicles.length + 1),
        // Garante que 'features' está presente, se não estiver no formData
        features: formData.features || initialFormState.features!, 
      } as Vehicle;
      setVehicles([...vehicles, newVehicle]);
      toast({ title: "Sucesso", description: "Veículo criado com sucesso" });
    }

    setShowForm(false);
    resetForm();
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData(vehicle); // Pré-preenche o formulário com os dados do veículo
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setVehicles(vehicles.filter(v => v.id !== id));
    toast({ title: "Sucesso", description: "Veículo removido com sucesso" });
  };

  return {
    isAuthenticated,
    loginData,
    vehicles,
    showForm,
    editingVehicle,
    formData,
    setLoginData,
    setIsAuthenticated,
    setShowForm,
    setFormData,
    handleLogin,
    handleSaveVehicle,
    handleEdit,
    handleDelete,
    resetForm,
  };
};