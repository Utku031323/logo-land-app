import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Başlangıç",
    price: "₺499",
    period: "/ay",
    description: "Küçük ofisler ve bireysel emlakçılar için",
    features: [
      "10 video/ay",
      "3 dil desteği",
      "Temel sosyal medya formatları",
      "Portföy yönetimi",
      "Temel analitik"
    ]
  },
  {
    name: "Profesyonel",
    price: "₺999",
    period: "/ay",
    description: "Büyüyen ofisler için",
    popular: true,
    features: [
      "30 video/ay",
      "12+ dil desteği",
      "Tüm sosyal medya formatları",
      "Gelişmiş portföy yönetimi",
      "Detaylı analitik",
      "Öncelikli destek",
      "Özel şablonlar"
    ]
  },
  {
    name: "Kurumsal",
    price: "₺2.499",
    period: "/ay",
    description: "Büyük ofisler ve franchiseler için",
    features: [
      "Sınırsız video",
      "Tüm dil desteği",
      "Özel branding",
      "Ekip yönetimi",
      "API entegrasyonu",
      "Manuel prodüksiyon desteği",
      "7/24 destek",
      "Özel eğitim"
    ]
  }
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-secondary/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Size Uygun Planı Seçin
          </h2>
          <p className="text-xl text-muted-foreground">
            İhtiyacınıza göre esnek fiyatlandırma seçenekleri
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
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
                >
                  Başlayın
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
