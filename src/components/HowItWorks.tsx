import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Fotoğraf Yükleyin",
    description: "Mülkünüzün fotoğraflarını kategorilere göre yükleyin"
  },
  {
    number: "02",
    title: "Bilgileri Doldurun",
    description: "Kısa bir anket ile mülk özelliklerini belirtin"
  },
  {
    number: "03",
    title: "AI Oluşturuyor",
    description: "Yapay zeka videounuzu profesyonelce hazırlıyor"
  },
  {
    number: "04",
    title: "Paylaşın",
    description: "Sosyal medya formatlarını seçin ve anında paylaşın"
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nasıl Çalışır?
          </h2>
          <p className="text-xl text-muted-foreground">
            4 basit adımda profesyonel emlak videolarınız hazır
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full border-border/50 hover:shadow-soft transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="text-6xl font-bold text-primary/20">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-primary z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
