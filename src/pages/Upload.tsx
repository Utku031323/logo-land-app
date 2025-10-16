import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { Upload as UploadIcon, Image, X, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState<string[]>([]);
  const { toast } = useToast();

  const categories = [
    { id: "salon", label: "Salon", photos: [] as string[] },
    { id: "mutfak", label: "Mutfak", photos: [] as string[] },
    { id: "yatak-odasi", label: "Yatak Odası", photos: [] as string[] },
    { id: "banyo", label: "Banyo", photos: [] as string[] },
    { id: "dis-cephe", label: "Dış Cephe", photos: [] as string[] },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      setPhotos([...photos, ...newPhotos]);
      toast({
        title: "Fotoğraflar yüklendi",
        description: `${files.length} fotoğraf başarıyla yüklendi.`
      });
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-8 max-w-5xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[
            { num: 1, label: "Fotoğraflar" },
            { num: 2, label: "Mülk Bilgileri" },
            { num: 3, label: "Seslendirme" },
            { num: 4, label: "Önizleme" }
          ].map((s, idx) => (
            <div key={s.num} className="flex items-center flex-1">
              <div className={`flex flex-col items-center ${idx < 3 ? 'flex-1' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s.num 
                    ? 'bg-gradient-to-r from-primary to-primary-glow text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {s.num}
                </div>
                <span className={`text-sm mt-2 ${step >= s.num ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  {s.label}
                </span>
              </div>
              {idx < 3 && (
                <div className={`h-1 flex-1 mx-2 ${
                  step > s.num ? 'bg-gradient-to-r from-primary to-primary-glow' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Photo Upload */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Fotoğrafları Yükleyin</CardTitle>
              <CardDescription>
                Mülkünüzün fotoğraflarını kategorilere göre yükleyin. En az 5 fotoğraf önerilir.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Area */}
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <UploadIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="font-medium mb-2">Fotoğrafları sürükleyin veya tıklayın</p>
                  <p className="text-sm text-muted-foreground">PNG, JPG, WEBP (Max. 10MB)</p>
                </label>
              </div>

              {/* Photo Grid */}
              {photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={photo} 
                        alt={`Upload ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute top-2 right-2 bg-destructive text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Kategori seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button variant="outline" disabled>
                  Geri
                </Button>
                <Button 
                  onClick={() => setStep(2)}
                  disabled={photos.length === 0}
                  className="bg-gradient-to-r from-primary to-primary-glow"
                >
                  Sonraki Adım
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Property Details */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Mülk Bilgileri</CardTitle>
              <CardDescription>
                Videonuzda görünecek mülk detaylarını girin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Başlık</Label>
                  <Input id="title" placeholder="Örn: Lüks 3+1 Daire" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Fiyat</Label>
                  <Input id="price" type="number" placeholder="Örn: 2500000" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="m2">Metrekare (m²)</Label>
                  <Input id="m2" type="number" placeholder="Örn: 150" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rooms">Oda Sayısı</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1+0">1+0</SelectItem>
                      <SelectItem value="1+1">1+1</SelectItem>
                      <SelectItem value="2+1">2+1</SelectItem>
                      <SelectItem value="3+1">3+1</SelectItem>
                      <SelectItem value="4+1">4+1</SelectItem>
                      <SelectItem value="5+1">5+1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Konum</Label>
                  <Input id="location" placeholder="İlçe, Şehir" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="floor">Kat</Label>
                  <Input id="floor" type="number" placeholder="Örn: 5" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Açıklama</Label>
                <Textarea 
                  id="description" 
                  placeholder="Mülk hakkında detaylı bilgi..."
                  rows={4}
                />
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Geri
                </Button>
                <Button 
                  onClick={() => setStep(3)}
                  className="bg-gradient-to-r from-primary to-primary-glow"
                >
                  Sonraki Adım
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Voice Selection */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Seslendirme Seçimi</CardTitle>
              <CardDescription>
                Video için seslendirme dili ve ses tonunu seçin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Dil Seçimi</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Dil seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tr">Türkçe</SelectItem>
                      <SelectItem value="en">İngilizce</SelectItem>
                      <SelectItem value="de">Almanca</SelectItem>
                      <SelectItem value="ar">Arapça</SelectItem>
                      <SelectItem value="ru">Rusça</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Ses Tonu</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { id: "male1", label: "Erkek Ses 1", description: "Profesyonel, otoriter" },
                      { id: "male2", label: "Erkek Ses 2", description: "Samimi, sıcak" },
                      { id: "female1", label: "Kadın Ses 1", description: "Enerjik, dinamik" },
                      { id: "female2", label: "Kadın Ses 2", description: "Sakin, güvenilir" },
                    ].map((voice) => (
                      <Card key={voice.id} className="cursor-pointer hover:border-primary transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{voice.label}</h4>
                            <Button size="sm" variant="ghost">
                              Dinle
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground">{voice.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Geri
                </Button>
                <Button 
                  onClick={() => setStep(4)}
                  className="bg-gradient-to-r from-primary to-primary-glow"
                >
                  Sonraki Adım
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Preview & Generate */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Önizleme ve Oluştur</CardTitle>
              <CardDescription>
                Bilgilerinizi kontrol edin ve videonuzu oluşturun
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-secondary/50 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-lg">Özet</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Fotoğraf Sayısı</p>
                    <p className="font-medium">{photos.length} fotoğraf</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Seslendirme</p>
                    <p className="font-medium">Türkçe - Erkek Ses 1</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tahmini Süre</p>
                    <p className="font-medium">45-60 saniye</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Format</p>
                    <p className="font-medium">Tüm sosyal medya</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(3)}>
                  Geri
                </Button>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary-glow"
                  onClick={() => {
                    toast({
                      title: "Video oluşturuluyor!",
                      description: "Videonuz 2-3 dakika içinde hazır olacak."
                    });
                  }}
                >
                  Video Oluştur
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Upload;
