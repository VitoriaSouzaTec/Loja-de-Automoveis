// src/pages/Admin.tsx

import { Button } from "@/components/ui/button";
import { LogOut, Car } from "lucide-react";
import { useAdminLogic } from "@/hooks/useAdminLogic";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminForm } from "@/components/admin/AdminForm";

const Admin = () => {
  // Usa o hook customizado para pegar TODA a lógica
  const {
    isAuthenticated,
    setIsAuthenticated,
    loginData,
    setLoginData,
    handleLogin,
    vehicles,
    showForm,
    setShowForm,
    editingVehicle,
    formData,
    setFormData,
    handleSaveVehicle,
    handleEdit,
    handleDelete,
    resetForm,
  } = useAdminLogic();
  
  // Função para lidar com o Cancelar no formulário
  const handleCancelForm = () => {
    setShowForm(false);
    resetForm();
  };

  // 1. Tela de Login
  if (!isAuthenticated) {
    return <AdminLogin loginData={loginData} setLoginData={setLoginData} handleLogin={handleLogin} />;
  }

  // 2. Painel Principal (Tabela ou Formulário)
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Car className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">Painel Administrativo</h1>
          </div>
          
          <Button
            variant="outline"
            onClick={() => setIsAuthenticated(false)}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        {showForm ? (
          <AdminForm
            formData={formData}
            editingVehicle={editingVehicle}
            setFormData={setFormData}
            handleSaveVehicle={handleSaveVehicle}
            handleCancel={handleCancelForm}
          />
        ) : (
          <AdminTable
            vehicles={vehicles}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleNewVehicle={() => {
              setShowForm(true);
              resetForm();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;