import { useParams, useNavigate } from "react-router-dom";
import { mockVehicles } from "@/lib/vehicles-data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Car, Fuel, Gauge, Calendar, Palette, 
  Settings, MapPin, Phone, ArrowLeft, Check
} from "lucide-react";

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = mockVehicles.find((v) => v.id === id);
  
  if (!vehicle) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Veículo não encontrado</h1>
          <Button onClick={() => navigate("/catalog")}>Voltar ao Catálogo</Button>
        </div>
      </div>
    );
  }
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(price);
  };
  
  const features = [
    { key: "airConditioning", label: "Ar Condicionado" },
    { key: "airbag", label: "Airbag" },
    { key: "alarm", label: "Alarme" },
    { key: "parkingSensor", label: "Sensor de Ré" },
    { key: "electricLocks", label: "Trava Elétrica" },
    { key: "electricWindows", label: "Vidros Elétricos" },
    { key: "abs", label: "Freios ABS" },
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-secondary shadow-card">
              {vehicle.images.length > 0 ? (
                <img 
                  src={vehicle.images[0]} 
                  alt={vehicle.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Car className="h-24 w-24 text-muted-foreground/30" />
                </div>
              )}
            </div>
          </div>
          
          {/* Details */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-3 capitalize">{vehicle.category === "car" ? "Carro" : "Moto"}</Badge>
              <h1 className="text-3xl font-bold mb-2">{vehicle.name}</h1>
              <p className="text-4xl font-bold text-primary">{formatPrice(vehicle.price)}</p>
            </div>
            
            <Card className="p-6 bg-gradient-to-b from-card to-card/80">
              <h3 className="font-semibold mb-4">Especificações</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Ano</p>
                    <p className="font-medium">{vehicle.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Gauge className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Km</p>
                    <p className="font-medium">{vehicle.mileage.toLocaleString("pt-BR")} km</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Fuel className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Combustível</p>
                    <p className="font-medium capitalize">{vehicle.fuel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Câmbio</p>
                    <p className="font-medium capitalize">
                      {vehicle.transmission === "automatic" ? "Automático" : "Manual"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Palette className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Cor</p>
                    <p className="font-medium">{vehicle.color}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Direção</p>
                    <p className="font-medium capitalize">{vehicle.steering}</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-to-b from-card to-card/80">
              <h3 className="font-semibold mb-4">Opcionais</h3>
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature) => {
                  const isAvailable = vehicle.features[feature.key as keyof typeof vehicle.features];
                  return (
                    <div 
                      key={feature.key}
                      className={`flex items-center gap-2 ${
                        isAvailable ? "text-foreground" : "text-muted-foreground/50"
                      }`}
                    >
                      <Check className={`h-4 w-4 ${isAvailable ? "text-primary" : ""}`} />
                      <span className="text-sm">{feature.label}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-to-b from-card to-card/80">
              <h3 className="font-semibold mb-2">Descrição</h3>
              <p className="text-muted-foreground">{vehicle.description}</p>
            </Card>
            
            <div className="flex gap-3 pt-4">
              <Button 
                size="lg"
                className="flex-1 bg-gradient-to-r from-primary to-primary/80 shadow-premium hover:shadow-glow"
                onClick={() => navigate(`/quote/${vehicle.id}`)}
              >
                Solicitar Orçamento
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="gap-2 border-primary/30"
                onClick={() => {
                  const message = `Olá! Gostaria de saber mais sobre o veículo: ${vehicle.name}`;
                  window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(message)}`, "_blank");
                }}
              >
                <Phone className="h-5 w-5" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default VehicleDetails;
