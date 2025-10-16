import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import logo from "@/assets/reelestate-logo.png";

export const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img src={logo} alt="ReelEstate" className="h-10 w-auto" />
            <p className="text-sm text-muted-foreground">
              AI destekli emlak video üretim platformu. Dakikalar içinde profesyonel sonuçlar.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Ürün</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Özellikler</a></li>
              <li><a href="#pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Fiyatlandırma</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Demo</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Güncellemeler</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Şirket</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">Hakkımızda</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Kariyer</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">İletişim</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Yasal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Gizlilik Politikası</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Kullanım Koşulları</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Çerez Politikası</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 ReelEstate by Reclights Media. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};
