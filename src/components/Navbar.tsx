import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/reelestate-logo.png";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="ReelEstate" className="h-10 w-auto" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Özellikler
          </a>
          <a href="#pricing" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Fiyatlandırma
          </a>
          <a href="#about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Hakkımızda
          </a>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button className="bg-gradient-to-r from-primary to-primary-glow">
            Başlayın
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-3">
          <a href="#features" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
            Özellikler
          </a>
          <a href="#pricing" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
            Fiyatlandırma
          </a>
          <a href="#about" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
            Hakkımızda
          </a>
          <div className="flex flex-col gap-2 pt-2">
            <Button variant="outline" className="w-full">
              <User className="mr-2 h-4 w-4" />
              Giriş Yap
            </Button>
            <Button className="w-full bg-gradient-to-r from-primary to-primary-glow">
              Başlayın
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};
