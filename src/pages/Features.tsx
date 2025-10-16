import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Upload, 
  Wand2, 
  Mic, 
  Share2, 
  BarChart3, 
  Clock,
  Globe,
  Palette,
  Film,
  MessageSquare,
  Shield,
  Zap,
  Users,
  Smartphone,
  Cloud,
  Bell
} from "lucide-react";

const mainFeatures = [
  {
    icon: Upload,
    title: "Akıllı Fotoğraf Yükleme",
    description: "Fotoğraflarınızı kategorilere ayırarak yükleyin. Sistem otomatik olarak en iyi açıları ve kompozisyonları tespit eder.",
    details: [
      "Otomatik kategorizasyon (salon, mutfak, yatak odası)",
      "Görsel kalite analizi",
      "Fotoğraf sıralama önerileri",
      "Toplu yükleme desteği"
    ]
  },
  {
    icon: Wand2,
    title: "AI Video Üretimi",
    description: "Yapay zeka teknolojisi ile dakikalar içinde profesyonel emlak videoları oluşturun.",
    details: [
      "Otomatik sahne geçişleri",
      "Profesyonel efektler ve filtreler",
      "Dinamik kamera hareketleri",
      "Müzik ve ritim senkronizasyonu"
    ]
  },
  {
    icon: Mic,
    title: "Çoklu Dil Seslendirme",
    description: "12+ dilde profesyonel seslendirme seçenekleri. Her dil için farklı ses tonları.",
    details: [
      "Türkçe, İngilizce, Almanca, Arapça, Rusça ve daha fazlası",
      "4 farklı ses tonu seçeneği",
      "Doğal ve akıcı seslendirme",
      "Otomatik metin oluşturma"
    ]
  },
  {
    icon: Share2,
    title: "Sosyal Medya Entegrasyonu",
    description: "Tüm popüler sosyal medya platformları için optimize edilmiş formatlar.",
    details: [
      "Instagram Reels (9:16)",
      "Facebook Post (1:1, 16:9)",
      "WhatsApp Status (9:16)",
      "YouTube Shorts (9:16)"
    ]
  },
  {
    icon: BarChart3,
    title: "Detaylı Analitik",
    description: "Videolarınızın performansını takip edin ve stratejinizi optimize edin.",
    details: [
      "Görüntülenme istatistikleri",
      "Etkileşim oranları",
      "En iyi performans gösteren videolar",
      "Zamanlama önerileri"
    ]
  },
  {
    icon: Clock,
    title: "Zamandan Tasarruf",
    description: "Geleneksel video prodüksiyonu yerine dakikalar içinde sonuç alın.",
    details: [
      "2 dakikada video üretimi",
      "Manuel düzenleme gerektirmez",
      "Anında önizleme",
      "Hızlı revizyon imkanı"
    ]
  }
];

const additionalFeatures = [
  {
    icon: Globe,
    title: "Global Erişim",
    description: "Her yerden, her cihazdan erişilebilir platform"
  },
  {
    icon: Palette,
    title: "Özel Branding",
    description: "Logonuz ve marka renklerinizle özelleştirme"
  },
  {
    icon: Film,
    title: "Video Şablonları",
    description: "Hazır profesyonel video şablonları"
  },
  {
    icon: MessageSquare,
    title: "AI Açıklama Oluşturucu",
    description: "Otomatik ilan açıklaması ve başlık üretimi"
  },
  {
    icon: Shield,
    title: "Güvenli Depolama",
    description: "Tüm dosyalarınız güvenli cloud sistemde"
  },
  {
    icon: Zap,
    title: "Hızlı İşlem",
    description: "Optimize edilmiş altyapı ile yüksek hız"
  },
  {
    icon: Users,
    title: "Ekip Yönetimi",
    description: "Ofis içi ekip ve yetki yönetimi"
  },
  {
    icon: Smartphone,
    title: "Mobil Uyumlu",
    description: "Tüm cihazlarda sorunsuz çalışma"
  },
  {
    icon: Cloud,
    title: "Bulut Entegrasyonu",
    description: "Dosyalarınıza her yerden erişim"
  },
  {
    icon: Bell,
    title: "Akıllı Bildirimler",
    description: "Portföy paylaşım hatırlatıcıları"
  }
];

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Güçlü <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Özellikler</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Emlak videolarınızı profesyonel seviyeye taşıyacak tüm araçlar. 
              AI teknolojisi ile dakikalar içinde etkileyici sonuçlar.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16">
        <div className="container">
          <div className="space-y-16">
            {mainFeatures.map((feature, index) => (
              <div 
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
              >
                <div className="flex-1">
                  <Card className="h-full border-none shadow-elevated">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-6">
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                      <p className="text-muted-foreground mb-6">{feature.description}</p>
                      <ul className="space-y-3">
                        {feature.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span className="text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-full h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center">
                    <feature.icon className="h-32 w-32 text-primary/30" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Daha Fazlası</h2>
            <p className="text-muted-foreground">İşinizi kolaylaştıracak ek özellikler</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-soft transition-all hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FeaturesPage;
