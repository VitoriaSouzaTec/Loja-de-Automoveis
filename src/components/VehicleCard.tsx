import { Link } from "react-router-dom";
import { Car, Fuel, Gauge, Calendar, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Vehicle } from "@/lib/vehicles-data";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return `${mileage.toLocaleString("pt-BR")} km`;
  };

  const getFuelLabel = (fuel: string) => {
    const labels: Record<string, string> = {
      gasoline: "Gasolina",
      alcohol: "Álcool",
      flex: "Flex",
      diesel: "Diesel",
      electric: "Elétrico",
    };
    return labels[fuel] || fuel;
  };

  const handleWhatsApp = () => {
    const message = `Olá! Gostaria de saber mais sobre o veículo: ${vehicle.name}. Preço: ${formatPrice(vehicle.price)}`;
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <Card className="group overflow-hidden bg-gradient-to-b from-card to-card/80 shadow-card transition-all hover:shadow-premium">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {vehicle.images.length > 0 ? (
          <img 
            src={vehicle.images[0]} 
            alt={vehicle.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Car className="h-16 w-16 text-muted-foreground/30" />
          </div>
        )}
      </div>
      
      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">{vehicle.name}</h3>
          <p className="text-2xl font-bold text-primary">{formatPrice(vehicle.price)}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Gauge className="h-4 w-4" />
            <span>{formatMileage(vehicle.mileage)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{vehicle.year}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Fuel className="h-4 w-4" />
            <span>{getFuelLabel(vehicle.fuel)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Car className="h-4 w-4" />
            <span className="capitalize">{vehicle.transmission === "automatic" ? "Automático" : "Manual"}</span>
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Link to={`/vehicle/${vehicle.id}`} className="flex-1">
            <Button className="w-full bg-gradient-to-r from-primary to-primary/80 shadow-lg hover:shadow-glow">
              Ver Detalhes
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleWhatsApp}
            className="border-primary/30 hover:bg-primary/10"
          >
            <Phone className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default VehicleCard;
