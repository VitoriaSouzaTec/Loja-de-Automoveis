// src/components/AdminLogin.tsx

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";

interface AdminLoginProps {
  loginData: { username: string; password: string };
  setLoginData: (data: { username: string; password: string }) => void;
  handleLogin: (e: React.FormEvent) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ loginData, setLoginData, handleLogin }) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-gradient-to-b from-card to-card/80">
        <div className="flex items-center justify-center mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
            <Car className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">Painel Administrativo</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Usuário</Label>
            <Input
              id="username"
              placeholder="Digite seu usuário"
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary/80">
            Entrar
          </Button>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-4">
          Usuário de teste: admin / admin
        </p>
      </Card>
    </div>
  );
};