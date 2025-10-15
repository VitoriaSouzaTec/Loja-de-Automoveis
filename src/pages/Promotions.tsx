import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import { mockVehicles } from "@/lib/vehicles-data";
import { Badge } from "@/components/ui/badge";

const Promotions = () => {
  const promotions = mockVehicles.filter((v) => v.category === "promotion");
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">Promoções</h1>
            <Badge className="bg-gradient-to-r from-primary to-primary/80">
              Ofertas Especiais
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Aproveite nossas melhores ofertas com descontos exclusivos
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Promotions;
