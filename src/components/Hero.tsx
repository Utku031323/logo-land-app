import { Button } from "@/components/ui/button";
import { Play, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/reelestate-logo.png";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/50" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-3xl space-y-8">
          <img src={logo} alt="ReelEstate" className="h-20 w-auto mb-4 drop-shadow-lg" />
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">AI Destekli Video Üretimi</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Gayrimenkul Videolarınızı
            <span className="block bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Dakikalar İçinde
            </span>
            Oluşturun
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl">
            Fotoğraflarınızı yükleyin, birkaç soru yanıtlayın ve yapay zeka profesyonel emlak videolarınızı otomatik olarak oluştursun. Seslendirme, efektler ve sosyal medya formatları dahil.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/upload">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary-glow hover:shadow-elevated transition-all"
              >
                Ücretsiz Deneyin
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 group"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Demo İzleyin
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div>
              <p className="text-3xl font-bold">2 dk</p>
              <p className="text-sm text-muted-foreground">Video Üretim Süresi</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <p className="text-3xl font-bold">12+</p>
              <p className="text-sm text-muted-foreground">Dil Desteği</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <p className="text-3xl font-bold">5000+</p>
              <p className="text-sm text-muted-foreground">Mutlu Kullanıcı</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
