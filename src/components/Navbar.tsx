import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/reelestate-logo.png";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="ReelEstate" className="h-12 w-auto hover:scale-105 transition-transform" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/features" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Özellikler
          </Link>
          <Link to="/pricing" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Fiyatlandırma
          </Link>
          <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Hakkımızda
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/upload">
            <Button className="bg-gradient-to-r from-primary to-primary-glow">
              Başlayın
            </Button>
          </Link>
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
          <Link to="/features" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
            Özellikler
          </Link>
          <Link to="/pricing" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
            Fiyatlandırma
          </Link>
          <Link to="/about" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
            Hakkımızda
          </Link>
          <div className="flex flex-col gap-2 pt-2">
            <Link to="/dashboard">
              <Button variant="outline" className="w-full">
                <User className="mr-2 h-4 w-4" />
                Giriş Yap
              </Button>
            </Link>
            <Link to="/upload" className="w-full">
              <Button className="w-full bg-gradient-to-r from-primary to-primary-glow">
                Başlayın
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
