import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import VehicleCard from "@/components/VehicleCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { mockVehicles } from "@/lib/vehicles-data";
import heroCar from "@/assets/hero-car.jpg";

const Home = () => {
  const featuredVehicles = mockVehicles.slice(0, 3);
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/30">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
                <span className="text-sm font-medium text-primary">Financiamento sem Burocracia</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Catálogo de Veículos{" "}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Premium
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl">
                Encontre seu veículo dos sonhos com as melhores condições de financiamento e atendimento personalizado.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/catalog">
                  <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-premium hover:shadow-glow">
                    Ver Catálogo
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="gap-2 border-primary/30">
                  Falar com Consultor
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-3xl" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-premium">
                <img 
                  src={heroCar} 
                  alt="Luxury BMW sedan in premium showroom"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="container mx-auto px-4 pb-20">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Garantia Completa",
                description: "Todos os veículos com garantia técnica e jurídica",
              },
              {
                icon: Clock,
                title: "Aprovação Rápida",
                description: "Financiamento aprovado em até 60 minutos",
              },
              {
                icon: TrendingUp,
                title: "Melhores Taxas",
                description: "Condições especiais de financiamento",
              },
            ].map((feature, index) => (
              <div 
                key={index}
                className="group flex items-start gap-4 rounded-xl border border-border/40 bg-card/50 p-6 backdrop-blur transition-all hover:border-primary/50 hover:shadow-card"
              >
                <div className="rounded-lg bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Vehicles */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-2">Veículos em Destaque</h2>
          <p className="text-muted-foreground">Confira nossa seleção premium de veículos</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/catalog">
            <Button size="lg" variant="outline" className="gap-2">
              Ver Todos os Veículos
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
