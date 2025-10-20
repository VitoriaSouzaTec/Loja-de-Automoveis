/* eslint-disable no-irregular-whitespace */
import { Link, useLocation } from "react-router-dom";
import { Car, Phone, Heart } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

    const handleWhatsApp = () => {
    const message = `Olá! Gostaria de saber mais sobre os veículos`;
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(message)}`, "_blank");
  };
  
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-2 sm:px-4">
        <Link to="/" className="flex items-center gap-2">
          
          <span className="text-xl font-bold">Auto Carros</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/catalog" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/catalog") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Carros
          </Link>
          <Link 
            to="/motorcycles" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/motorcycles") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Motos
          </Link>
          <Link 
            to="/promotions" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/promotions") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Promoções
          </Link>
        </nav>
        
    <div className="flex items-center gap-3">
    <Button
    className="gap-2 w-10 sm:w-40 bg-gradient-to-r from-primary to-primary/80 shadow-premium text-white"         
    onClick={handleWhatsApp}
    >
    <Phone className="h-4 w-4" />
    <span className="hidden sm:inline">Contato</span> 
    </Button>
        
        </div>
      </div>
    </header>
  );
};

export default Header;
