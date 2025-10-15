import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import { mockVehicles } from "@/lib/vehicles-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fuelFilter, setFuelFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  
  const vehicles = mockVehicles.filter((v) => v.category === "car");
  
  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFuel = fuelFilter === "all" || vehicle.fuel === fuelFilter;
    const matchesYear = yearFilter === "all" || vehicle.year.toString() === yearFilter;
    
    return matchesSearch && matchesFuel && matchesYear;
  });
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Catálogo de Carros</h1>
          <p className="text-muted-foreground">
            {filteredVehicles.length} veículos encontrados
          </p>
        </div>
        
        {/* Filters */}
        <div className="mb-8 rounded-xl border border-border/40 bg-card/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Filtros</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar veículo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={fuelFilter} onValueChange={setFuelFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Combustível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="gasoline">Gasolina</SelectItem>
                <SelectItem value="flex">Flex</SelectItem>
                <SelectItem value="diesel">Diesel</SelectItem>
                <SelectItem value="electric">Elétrico</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setFuelFilter("all");
                setYearFilter("all");
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        </div>
        
        {/* Vehicle Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
        
        {filteredVehicles.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              Nenhum veículo encontrado com os filtros selecionados.
            </p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Catalog;
