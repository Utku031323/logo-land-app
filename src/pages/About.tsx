import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Lightbulb, Users, Award, Globe, TrendingUp } from "lucide-react";
import logo from "@/assets/reelestate-logo.png";

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: "Misyonumuz",
      description: "Gayrimenkul sektöründe dijital dönüşümü hızlandırmak ve emlakçıların iş yükünü azaltarak, daha fazla satışa odaklanmalarını sağlamak."
    },
    {
      icon: Lightbulb,
      title: "Vizyonumuz",
      description: "Emlak sektörünün global standartlarını yeniden tanımlayan, AI destekli içerik üretiminde dünya lideri olmak."
    },
    {
      icon: Users,
      title: "Değerlerimiz",
      description: "Yenilikçilik, kullanıcı odaklılık, kalite ve sürekli gelişim. Müşterilerimizin başarısı bizim başarımızdır."
    }
  ];

  const stats = [
    { number: "5000+", label: "Aktif Kullanıcı" },
    { number: "50K+", label: "Oluşturulan Video" },
    { number: "12+", label: "Dil Desteği" },
    { number: "%98", label: "Müşteri Memnuniyeti" }
  ];

  const milestones = [
    {
      year: "2024",
      title: "Kuruluş",
      description: "ReelEstate projesi Reclights Media bünyesinde hayata geçti. İlk beta versiyonu yayınlandı."
    },
    {
      year: "2024",
      title: "Türkiye Lansmanı",
      description: "Antalya, İstanbul, Ankara ve İzmir'de pilot uygulamalar başladı. İlk 1000 kullanıcıya ulaşıldı."
    },
    {
      year: "2025",
      title: "Global Açılım",
      description: "12+ dil desteği ile Dubai, ABD ve Avrupa pazarlarına giriş yapıldı."
    },
    {
      year: "2025",
      title: "AI 2.0",
      description: "Gelişmiş yapay zeka algoritmaları ile daha akıllı video üretimi ve tahmin modelleri devreye alındı."
    }
  ];

  const team = [
    {
      role: "Teknoloji",
      description: "Yapay zeka ve video teknolojilerinde uzman mühendis ekibi"
    },
    {
      role: "Tasarım",
      description: "Kullanıcı deneyimi odaklı yaratıcı tasarım ekibi"
    },
    {
      role: "İçerik",
      description: "Gayrimenkul sektörü uzmanları ve içerik stratejistleri"
    },
    {
      role: "Destek",
      description: "7/24 müşteri memnuniyeti için çalışan destek ekibi"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <img src={logo} alt="ReelEstate" className="h-20 w-auto mx-auto mb-8 drop-shadow-lg" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Emlak Sektörünün <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Dijital Geleceği</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              ReelEstate, gayrimenkul profesyonellerinin video üretim süreçlerini yapay zeka ile 
              otomatikleştiren, Reclights Media tarafından geliştirilen yenilikçi bir platformdur.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-elevated transition-all hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-6">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Hikayemiz</h2>
            <p className="text-xl text-muted-foreground">
              Nasıl başladık ve nereye gidiyoruz
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <p>
              ReelEstate projesi, emlak sektöründe faaliyet gösteren profesyonellerin en büyük 
              zorluklarından biri olan <strong className="text-foreground">içerik üretimi sürecini devrim niteliğinde 
              değiştirmek</strong> amacıyla doğdu.
            </p>
            
            <p>
              Geleneksel yöntemlerle bir emlak videosu hazırlamak günler sürerken, maliyetler 
              binlerce lirayı bulabiliyordu. Bu durum, özellikle küçük ve orta ölçekli emlak 
              profesyonellerini dijital pazarlamadan uzak tutuyordu.
            </p>

            <p>
              Reclights Media'nın deneyimli ekibi, <strong className="text-foreground">yapay zeka teknolojilerini</strong> emlak 
              sektörünün ihtiyaçlarıyla birleştirerek ReelEstate'i geliştirdi. Platformumuz, 
              fotoğraftan videoya dönüşüm, otomatik seslendirme ve sosyal medya optimizasyonu 
              gibi özellikleri tek bir çatı altında topluyor.
            </p>

            <p>
              Bugün, <strong className="text-foreground">5000'den fazla emlak profesyoneli</strong> ReelEstate ile videolarını 
              dakikalar içinde oluşturuyor ve müşterilerine daha profesyonel bir hizmet sunuyor.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-secondary/30">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Yolculuğumuz</h2>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-white font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-primary to-primary-glow mt-2" />
                  )}
                </div>
                <Card className="flex-1">
                  <CardContent className="p-6">
                    <div className="text-sm text-primary font-semibold mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Ekibimiz</h2>
            <p className="text-xl text-muted-foreground">
              Farklı alanlarda uzman profesyonellerden oluşan ekibimiz
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-soft transition-all">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{member.role}</h3>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Neden ReelEstate?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="h-12 w-12 mx-auto text-primary mb-4" />
                <h3 className="font-bold mb-2">Kalite</h3>
                <p className="text-sm text-muted-foreground">
                  Profesyonel standartlarda video üretimi
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <TrendingUp className="h-12 w-12 mx-auto text-primary mb-4" />
                <h3 className="font-bold mb-2">Yenilikçilik</h3>
                <p className="text-sm text-muted-foreground">
                  Sürekli geliştirilen AI teknolojileri
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Globe className="h-12 w-12 mx-auto text-primary mb-4" />
                <h3 className="font-bold mb-2">Global</h3>
                <p className="text-sm text-muted-foreground">
                  12+ dilde dünya çapında hizmet
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
