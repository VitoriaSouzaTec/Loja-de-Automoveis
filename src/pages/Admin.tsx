import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockVehicles, Vehicle } from "@/lib/vehicles-data";
import { Plus, Edit, Trash2, LogOut, Car } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Partial<Vehicle>>({
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
  });
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === "admin" && loginData.password === "admin") {
      setIsAuthenticated(true);
      toast({
        title: "Login realizado",
        description: "Bem-vindo ao painel administrativo",
      });
    } else {
      toast({
        title: "Erro",
        description: "Credenciais inválidas",
        variant: "destructive",
      });
    }
  };
  
  const handleSaveVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.color) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }
    
    if (editingVehicle) {
      setVehicles(vehicles.map(v => v.id === editingVehicle.id ? { ...formData, id: editingVehicle.id } as Vehicle : v));
      toast({
        title: "Sucesso",
        description: "Veículo atualizado com sucesso",
      });
    } else {
      const newVehicle = {
        ...formData,
        id: String(vehicles.length + 1),
      } as Vehicle;
      setVehicles([...vehicles, newVehicle]);
      toast({
        title: "Sucesso",
        description: "Veículo criado com sucesso",
      });
    }
    
    setShowForm(false);
    setEditingVehicle(null);
    resetForm();
  };
  
  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData(vehicle);
    setShowForm(true);
  };
  
  const handleDelete = (id: string) => {
    setVehicles(vehicles.filter(v => v.id !== id));
    toast({
      title: "Sucesso",
      description: "Veículo removido com sucesso",
    });
  };
  
  const resetForm = () => {
    setFormData({
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
    });
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 bg-gradient-to-b from-card to-card/80">
          <div className="flex items-center justify-center mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <Car className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-6">Painel Administrativo</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                placeholder="Digite seu usuário"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
            </div>
            
            <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary/80">
              Entrar
            </Button>
          </form>
          
          <p className="text-sm text-muted-foreground text-center mt-4">
            Usuário de teste: admin / admin
          </p>
        </Card>
      </div>
    );
  }
  
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
        {!showForm ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Veículos Cadastrados</h2>
                <p className="text-muted-foreground">{vehicles.length} veículos no total</p>
              </div>
              <Button
                onClick={() => {
                  setShowForm(true);
                  setEditingVehicle(null);
                  resetForm();
                }}
                className="gap-2 bg-gradient-to-r from-primary to-primary/80"
              >
                <Plus className="h-4 w-4" />
                Novo Veículo
              </Button>
            </div>
            
            <Card className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Ano</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
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
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(vehicle.price)}
                      </TableCell>
                      <TableCell>{vehicle.year}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                          Ativo
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(vehicle)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(vehicle.id)}
                            className="text-destructive hover:bg-destructive/10"
                          >
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
        ) : (
          <Card className="p-6 bg-gradient-to-b from-card to-card/80">
            <h2 className="text-2xl font-bold mb-6">
              {editingVehicle ? "Editar Veículo" : "Novo Veículo"}
            </h2>
            
            <form onSubmit={handleSaveVehicle} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome/Modelo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Preço *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="year">Ano *</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value: "car" | "motorcycle" | "promotion") =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car">Carro</SelectItem>
                      <SelectItem value="motorcycle">Moto</SelectItem>
                      <SelectItem value="promotion">Promoção</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fuel">Combustível *</Label>
                  <Select
                    value={formData.fuel}
                    onValueChange={(value: any) => setFormData({ ...formData, fuel: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gasoline">Gasolina</SelectItem>
                      <SelectItem value="alcohol">Álcool</SelectItem>
                      <SelectItem value="flex">Flex</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="electric">Elétrico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="transmission">Câmbio *</Label>
                  <Select
                    value={formData.transmission}
                    onValueChange={(value: "manual" | "automatic") =>
                      setFormData({ ...formData, transmission: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="automatic">Automático</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="color">Cor *</Label>
                  <Input
                    id="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="steering">Direção *</Label>
                  <Select
                    value={formData.steering}
                    onValueChange={(value: any) => setFormData({ ...formData, steering: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hydraulic">Hidráulica</SelectItem>
                      <SelectItem value="electric">Elétrica</SelectItem>
                      <SelectItem value="mechanical">Mecânica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="mileage">KM Rodado *</Label>
                  <Input
                    id="mileage"
                    type="number"
                    value={formData.mileage}
                    onChange={(e) => setFormData({ ...formData, mileage: Number(e.target.value) })}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              
              <div className="space-y-3">
                <Label>Opcionais</Label>
                <div className="grid md:grid-cols-3 gap-3">
                  {[
                    { key: "airConditioning", label: "Ar Condicionado" },
                    { key: "airbag", label: "Airbag" },
                    { key: "alarm", label: "Alarme" },
                    { key: "parkingSensor", label: "Sensor de Ré" },
                    { key: "electricLocks", label: "Trava Elétrica" },
                    { key: "electricWindows", label: "Vidros Elétricos" },
                    { key: "abs", label: "Freios ABS" },
                  ].map((feature) => (
                    <div key={feature.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature.key}
                        checked={formData.features?.[feature.key as keyof typeof formData.features]}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            features: {
                              ...formData.features!,
                              [feature.key]: checked,
                            },
                          })
                        }
                      />
                      <Label htmlFor={feature.key} className="cursor-pointer">
                        {feature.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-primary to-primary/80"
                >
                  Salvar Veículo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingVehicle(null);
                    resetForm();
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Admin;
