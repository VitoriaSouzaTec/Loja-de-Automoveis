import { Link } from "react-router-dom";
import { Car, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-card/30 backdrop-blur">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold">Auto Carros</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Catálogo completo de veículos premium com as melhores condições de financiamento.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/catalog" className="text-muted-foreground hover:text-primary transition-colors">
                  Carros
                </Link>
              </li>
              <li>
                <Link to="/motorcycles" className="text-muted-foreground hover:text-primary transition-colors">
                  Motos
                </Link>
              </li>
              <li>
                <Link to="/promotions" className="text-muted-foreground hover:text-primary transition-colors">
                  Promoções
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contato@premiumauto.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Fortaleza, CE</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Horário</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Segunda - Sexta: 9h - 18h</li>
              <li>Sábado: 9h - 13h</li>
              <li>Domingo: Fechado</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 Auto Carros. Todos os direitos reservados.</p>
          <Link 
            to="/admin" 
            className="hover:text-primary transition-colors"
          >
            Acesso Administrativo
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
