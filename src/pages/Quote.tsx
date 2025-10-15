import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockVehicles } from "@/lib/vehicles-data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Quote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const vehicle = mockVehicles.find((v) => v.id === id);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    purchaseMethod: "cash",
  });
  
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }
    
    const purchaseMethodLabels = {
      cash: "À Vista",
      consortium: "Consórcio",
      financing: "Financiamento",
    };
    
    const message = `Olá! Gostaria de saber mais sobre o veículo: ${vehicle.name}.
Minha intenção de compra é: ${purchaseMethodLabels[formData.purchaseMethod as keyof typeof purchaseMethodLabels]}.
Meus dados: ${formData.name} - ${formData.phone}.
Aguardando contato para prosseguir!`;
    
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(message)}`, "_blank");
    
    toast({
      title: "Sucesso!",
      description: "Você será redirecionado para o WhatsApp",
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Vehicle Summary */}
          <Card className="p-6 bg-gradient-to-b from-card to-card/80 h-fit">
            <h2 className="text-xl font-bold mb-4">Resumo do Veículo</h2>
            
            <div className="aspect-video overflow-hidden rounded-lg bg-secondary mb-4">
              {vehicle.images.length > 0 ? (
                <img 
                  src={vehicle.images[0]} 
                  alt={vehicle.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-muted-foreground">Sem imagem</span>
                </div>
              )}
            </div>
            
            <h3 className="font-bold text-lg mb-2">{vehicle.name}</h3>
            <p className="text-2xl font-bold text-primary mb-4">{formatPrice(vehicle.price)}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ano:</span>
                <span className="font-medium">{vehicle.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Km:</span>
                <span className="font-medium">{vehicle.mileage.toLocaleString("pt-BR")} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Combustível:</span>
                <span className="font-medium capitalize">{vehicle.fuel}</span>
              </div>
            </div>
          </Card>
          
          {/* Quote Form */}
          <Card className="p-6 bg-gradient-to-b from-card to-card/80">
            <h2 className="text-xl font-bold mb-4">Solicitar Cotação</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  placeholder="Digite seu nome"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-3">
                <Label>Intenção de Compra</Label>
                <RadioGroup
                  value={formData.purchaseMethod}
                  onValueChange={(value) => setFormData({ ...formData, purchaseMethod: value })}
                >
                  <div className="flex items-center space-x-2 rounded-lg border border-border/40 p-4 hover:border-primary/50 transition-colors">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex-1 cursor-pointer">
                      À Vista
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg border border-border/40 p-4 hover:border-primary/50 transition-colors">
                    <RadioGroupItem value="consortium" id="consortium" />
                    <Label htmlFor="consortium" className="flex-1 cursor-pointer">
                      Consórcio
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg border border-border/40 p-4 hover:border-primary/50 transition-colors">
                    <RadioGroupItem value="financing" id="financing" />
                    <Label htmlFor="financing" className="flex-1 cursor-pointer">
                      Financiamento
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Button 
                type="submit"
                size="lg"
                className="w-full gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-premium hover:shadow-glow"
              >
                <Send className="h-5 w-5" />
                Enviar Cotação e Falar com Consultor
              </Button>
            </form>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Quote;
