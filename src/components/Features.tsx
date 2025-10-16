import { Card, CardContent } from "@/components/ui/card";
import { 
  Upload, 
  Wand2, 
  Mic, 
  Share2, 
  BarChart3, 
  Clock 
} from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Kolay Fotoğraf Yükleme",
    description: "Mülk fotoğraflarınızı kategorilere ayırarak yükleyin. Salon, mutfak, yatak odası ve dış cephe."
  },
  {
    icon: Wand2,
    title: "AI Video Üretimi",
    description: "Yapay zeka fotoğraflarınızı analiz eder ve profesyonel geçişler, efektler ile video oluşturur."
  },
  {
    icon: Mic,
    title: "Çoklu Dil Seslendirme",
    description: "Türkçe, İngilizce, Almanca ve 9+ dilde profesyonel seslendirme seçenekleri."
  },
  {
    icon: Share2,
    title: "Sosyal Medya Formatları",
    description: "Instagram Reels, Facebook, WhatsApp için optimize edilmiş video formatları."
  },
  {
    icon: BarChart3,
    title: "Detaylı Analitik",
    description: "Videolarınızın performansını takip edin. İzlenme, paylaşım ve etkileşim istatistikleri."
  },
  {
    icon: Clock,
    title: "Zamandan Tasarruf",
    description: "Manuel video prodüksiyonu yerine dakikalar içinde profesyonel sonuçlar alın."
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-secondary/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Güçlü Özellikler
          </h2>
          <p className="text-xl text-muted-foreground">
            Emlak videolarınızı profesyonel seviyeye taşıyacak tüm araçlar tek platformda
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="border-border/50 hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
