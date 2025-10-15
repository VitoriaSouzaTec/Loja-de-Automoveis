import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import { mockVehicles } from "@/lib/vehicles-data";

const Motorcycles = () => {
  const motorcycles = mockVehicles.filter((v) => v.category === "motorcycle");
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Catálogo de Motos</h1>
          <p className="text-muted-foreground">
            {motorcycles.length} motocicletas disponíveis
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {motorcycles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Motorcycles;
