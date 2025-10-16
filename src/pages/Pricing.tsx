import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, HelpCircle } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Başlangıç",
    price: "499",
    period: "/ay",
    description: "Küçük ofisler ve bireysel emlakçılar için",
    features: [
      { name: "10 video/ay", included: true },
      { name: "3 dil desteği (TR, EN, DE)", included: true },
      { name: "Temel sosyal medya formatları", included: true },
      { name: "Portföy yönetimi", included: true },
      { name: "Temel analitik", included: true },
      { name: "Email destek", included: true },
      { name: "HD kalite (1080p)", included: true },
      { name: "Özel branding", included: false },
      { name: "Ekip yönetimi", included: false },
      { name: "API entegrasyonu", included: false },
      { name: "Manuel prodüksiyon", included: false },
      { name: "Öncelikli destek", included: false }
    ]
  },
  {
    name: "Profesyonel",
    price: "999",
    period: "/ay",
    description: "Büyüyen ofisler için",
    popular: true,
    features: [
      { name: "30 video/ay", included: true },
      { name: "12+ dil desteği", included: true },
      { name: "Tüm sosyal medya formatları", included: true },
      { name: "Gelişmiş portföy yönetimi", included: true },
      { name: "Detaylı analitik", included: true },
      { name: "Öncelikli email destek", included: true },
      { name: "4K kalite", included: true },
      { name: "Özel branding", included: true },
      { name: "3 kullanıcı ekip yönetimi", included: true },
      { name: "Özel video şablonları", included: true },
      { name: "Manuel prodüksiyon", included: false },
      { name: "API entegrasyonu", included: false }
    ]
  },
  {
    name: "Kurumsal",
    price: "2.499",
    period: "/ay",
    description: "Büyük ofisler ve franchiseler için",
    features: [
      { name: "Sınırsız video", included: true },
      { name: "Tüm dil desteği", included: true },
      { name: "Tüm format seçenekleri", included: true },
      { name: "Kurumsal portföy yönetimi", included: true },
      { name: "Premium analitik ve raporlama", included: true },
      { name: "7/24 destek", included: true },
      { name: "8K kalite", included: true },
      { name: "Tam özel branding", included: true },
      { name: "Sınırsız ekip yönetimi", included: true },
      { name: "Sınırsız özel şablonlar", included: true },
      { name: "Manuel prodüksiyon desteği", included: true },
      { name: "API entegrasyonu", included: true }
    ]
  }
];

const faqs = [
  {
    q: "Video oluşturma süresi ne kadar?",
    a: "Ortalama 2-3 dakika içinde videonuz hazır olur. Fotoğraf sayısına ve seçilen özelliklere göre bu süre değişebilir."
  },
  {
    q: "Aylık video kotam biterse ne olur?",
    a: "Kotanız bittiğinde ek video paketi satın alabilir veya planınızı yükseltebilirsiniz. Kurumsal planda sınırsız video hakkı bulunur."
  },
  {
    q: "İptal politikanız nedir?",
    a: "Aboneliğinizi istediğiniz zaman iptal edebilirsiniz. İptal sonrası mevcut döneminiz sonuna kadar hizmetiniz devam eder."
  },
  {
    q: "Manuel prodüksiyon hizmeti nedir?",
    a: "Profesyonel ekibimiz ile drone çekimi, özel kurgu ve prodüksiyon hizmetleri. Bu hizmet Kurumsal planda yer alır veya ayrıca satın alınabilir."
  },
  {
    q: "Videoları indirip başka yerlerde kullanabilir miyim?",
    a: "Evet, oluşturduğunuz tüm videolar size aittir ve dilediğiniz yerde kullanabilirsiniz."
  },
  {
    q: "Ödeme yöntemleri nelerdir?",
    a: "Kredi kartı, banka kartı ve havale/EFT ile ödeme yapabilirsiniz. Kurumsal müşteriler için fatura seçeneği mevcuttur."
  }
];

const PricingPage = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Size Uygun <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Planı</span> Seçin
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              İhtiyacınıza göre esnek fiyatlandırma. İlk 7 gün ücretsiz deneyin.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 bg-secondary/50 p-1.5 rounded-lg">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  billingPeriod === "monthly" 
                    ? 'bg-background shadow-sm' 
                    : 'text-muted-foreground'
                }`}
              >
                Aylık
              </button>
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  billingPeriod === "yearly" 
                    ? 'bg-background shadow-sm' 
                    : 'text-muted-foreground'
                }`}
              >
                Yıllık
                <span className="ml-2 text-xs bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full">
                  %20 İndirim
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index}
                className={`relative ${
                  plan.popular 
                    ? 'border-primary shadow-elevated scale-105' 
                    : 'border-border/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary to-primary-glow text-white px-4 py-1 rounded-full text-sm font-medium">
                      En Popüler
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription className="mb-4">{plan.description}</CardDescription>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold">
                      ₺{billingPeriod === "yearly" 
                        ? Math.round(parseInt(plan.price) * 0.8) 
                        : plan.price}
                    </span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  {billingPeriod === "yearly" && (
                    <p className="text-sm text-green-600 mt-2">
                      Yıllık ₺{Math.round(parseInt(plan.price) * 0.8 * 12).toLocaleString('tr-TR')} tasarruf edin
                    </p>
                  )}
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${!feature.included && 'text-muted-foreground'}`}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-primary to-primary-glow' 
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                  >
                    7 Gün Ücretsiz Dene
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-secondary/30">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Detaylı Karşılaştırma</h2>
            <p className="text-muted-foreground">Tüm planların özelliklerini karşılaştırın</p>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-left p-4 font-semibold">Özellik</th>
                      <th className="text-center p-4 font-semibold">Başlangıç</th>
                      <th className="text-center p-4 font-semibold bg-primary/5">Profesyonel</th>
                      <th className="text-center p-4 font-semibold">Kurumsal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {plans[0].features.map((_, idx) => (
                      <tr key={idx} className="hover:bg-secondary/20">
                        <td className="p-4">{plans[0].features[idx].name}</td>
                        {plans.map((plan, planIdx) => (
                          <td key={planIdx} className={`text-center p-4 ${planIdx === 1 ? 'bg-primary/5' : ''}`}>
                            {plan.features[idx].included ? (
                              <Check className="h-5 w-5 text-primary mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-muted-foreground mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sık Sorulan Sorular</h2>
            <p className="text-muted-foreground">Merak ettikleriniz</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-soft transition-all">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <HelpCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{faq.q}</h3>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </div>
                  </div>
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

export default PricingPage;
