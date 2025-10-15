import bmwM5 from "@/assets/bmw-m5.jpg";
import lexusLC500 from "@/assets/lexus-lc500.jpg";
import ducatiPanigale from "@/assets/ducati-panigale.jpg";


export interface Vehicle {
  id: string;
  name: string;
  price: number;
  year: number;
  category: "car" | "motorcycle" | "promotion";
  fuel: "gasoline" | "alcohol" | "flex" | "diesel" | "electric";
  transmission: "manual" | "automatic";
  color: string;
  steering: "hydraulic" | "electric" | "mechanical";
  mileage: number;
  images: string[];
  description: string;
  features: {
    airConditioning: boolean;
    airbag: boolean;
    alarm: boolean;
    parkingSensor: boolean;
    electricLocks: boolean;
    electricWindows: boolean;
    abs: boolean;
  };
}

export const mockVehicles: Vehicle[] = [
  {
    id: "1",
    name: "BMW M5 Competition",
    price: 650000,
    year: 2023,
    category: "car",
    fuel: "gasoline",
    transmission: "automatic",
    color: "Azul Metálico",
    steering: "electric",
    mileage: 8000,
    images: [bmwM5],
    description: "Sedan esportivo de alto desempenho com motor V8 biturbo de 625cv. Acabamento premium com tecnologia de ponta.",
    features: {
      airConditioning: true,
      airbag: true,
      alarm: true,
      parkingSensor: true,
      electricLocks: true,
      electricWindows: true,
      abs: true,
    },
  },
  {
    id: "2",
    name: "Lexus LC 500",
    price: 720000,
    year: 2023,
    category: "car",
    fuel: "gasoline",
    transmission: "automatic",
    color: "Cinza Nardo",
    steering: "electric",
    mileage: 5000,
    images: [lexusLC500],
    description: "Gran turismo esportivo com design agressivo e motor V8 de 600cv. Luxo e performance em um único veículo.",
    features: {
      airConditioning: true,
      airbag: true,
      alarm: true,
      parkingSensor: true,
      electricLocks: true,
      electricWindows: true,
      abs: true,
    },
  },
  {
    id: "3",
    name: "Lexus LC 500",
    price: 580000,
    year: 2022,
    category: "car",
    fuel: "gasoline",
    transmission: "automatic",
    color: "Preto",
    steering: "electric",
    mileage: 12000,
    images: [lexusLC500],
    description: "Coupé de luxo com design futurista e motor V8 de 477cv. Conforto e sofisticação japonesa.",
    features: {
      airConditioning: true,
      airbag: true,
      alarm: true,
      parkingSensor: true,
      electricLocks: true,
      electricWindows: true,
      abs: true,
    },
  },
  {
    id: "4",
    name: "Lexus LC 500",
    price: 890000,
    year: 2024,
    category: "promotion",
    fuel: "gasoline",
    transmission: "automatic",
    color: "Amarelo",
    steering: "electric",
    mileage: 1500,
    images: [lexusLC500],
    description: "Ícone esportivo com motor boxer de 385cv. Performance incomparável e design atemporal.",
    features: {
      airConditioning: true,
      airbag: true,
      alarm: true,
      parkingSensor: true,
      electricLocks: true,
      electricWindows: true,
      abs: true,
    },
  },
  {
    id: "5",
    name: "Ducati Panigale V4",
    price: 180000,
    year: 2023,
    category: "motorcycle",
    fuel: "gasoline",
    transmission: "manual",
    color: "Vermelho",
    steering: "mechanical",
    mileage: 3000,
    images: [ducatiPanigale],
    description: "Superbike italiana com motor V4 de 214cv. Performance de MotoGP para as ruas.",
    features: {
      airConditioning: false,
      airbag: false,
      alarm: true,
      parkingSensor: false,
      electricLocks: false,
      electricWindows: false,
      abs: true,
    },
  },
  
  
];
