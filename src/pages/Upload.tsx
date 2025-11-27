import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { Upload as UploadIcon, Image, X, ArrowRight, Play, Share2, BarChart3, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState<string[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("tr");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const { toast } = useToast();

  const categories = [
    { id: "salon", label: "Salon", photos: [] as string[] },
    { id: "mutfak", label: "Mutfak", photos: [] as string[] },
    { id: "yatak-odasi", label: "Yatak Odası", photos: [] as string[] },
    { id: "banyo", label: "Banyo", photos: [] as string[] },
    { id: "dis-cephe", label: "Dış Cephe", photos: [] as string[] },
  ];

  const socialTemplates = [
    { id: "instagram", label: "Instagram Reels", format: "9:16", duration: "15-30s" },
    { id: "tiktok", label: "TikTok", format: "9:16", duration: "15-60s" },
    { id: "youtube", label: "YouTube Shorts", format: "9:16", duration: "15-60s" },
    { id: "facebook", label: "Facebook", format: "1:1", duration: "30-60s" },
    { id: "linkedin", label: "LinkedIn", format: "16:9", duration: "30-60s" },
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
        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4">
          {[
            { num: 1, label: "Giriş" },
            { num: 2, label: "Fotoğraflar" },
            { num: 3, label: "Anket" },
            { num: 4, label: "Önizleme" },
            { num: 5, label: "Seslendirme" },
            { num: 6, label: "Şablon" },
            { num: 7, label: "Paylaşım" },
            { num: 8, label: "İstatistik" }
          ].map((s, idx) => (
            <div key={s.num} className="flex items-center flex-1 min-w-max">
              <div className={`flex flex-col items-center ${idx < 7 ? 'flex-1' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                  step >= s.num
                    ? 'bg-gradient-to-r from-primary to-primary-glow text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {s.num}
                </div>
                <span className={`text-xs mt-2 whitespace-nowrap ${step >= s.num ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  {s.label}
                </span>
              </div>
              {idx < 7 && (
                <div className={`h-1 flex-1 mx-2 ${
                  step > s.num ? 'bg-gradient-to-r from-primary to-primary-glow' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Introduction */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Emlak Videonuzu Oluşturmaya Başlayın</CardTitle>
              <CardDescription className="text-lg">
                Basit adımlarla profesyonel emlak videosu oluşturun
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Neler Yapabilirsiniz?</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold text-sm">✓</span>
                      </div>
                      <div>
                        <p className="font-medium">Fotoğrafları Kategorilere Göre Yükleyin</p>
                        <p className="text-sm text-muted-foreground">Salon, mutfak, yatak odası vb.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold text-sm">✓</span>
                      </div>
                      <div>
                        <p className="font-medium">Mülk Bilgilerini Girin</p>
                        <p className="text-sm text-muted-foreground">Fiyat, metrekare, konum vb.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold text-sm">✓</span>
                      </div>
                      <div>
                        <p className="font-medium">AI Video Oluştur</p>
                        <p className="text-sm text-muted-foreground">Dakikalar içinde profesyonel video</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold text-sm">✓</span>
                      </div>
                      <div>
                        <p className="font-medium">Sosyal Medyada Paylaş</p>
                        <p className="text-sm text-muted-foreground">Instagram, TikTok, YouTube vb.</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Hızlı İstatistikler</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-primary/5">
                      <CardContent className="p-4 text-center">
                        <p className="text-3xl font-bold text-primary">2 dk</p>
                        <p className="text-sm text-muted-foreground">Video Üretim</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-accent/5">
                      <CardContent className="p-4 text-center">
                        <p className="text-3xl font-bold text-accent">12+</p>
                        <p className="text-sm text-muted-foreground">Dil Desteği</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-blue-500/5">
                      <CardContent className="p-4 text-center">
                        <p className="text-3xl font-bold text-blue-600">5</p>
                        <p className="text-sm text-muted-foreground">Sosyal Platform</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-green-500/5">
                      <CardContent className="p-4 text-center">
                        <p className="text-3xl font-bold text-green-600">∞</p>
                        <p className="text-sm text-muted-foreground">Sınırsız Video</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  size="lg"
                  onClick={() => setStep(2)}
                  className="bg-gradient-to-r from-primary to-primary-glow"
                >
                  Başlayın
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Photo Upload */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Fotoğrafları Kategorilere Göre Yükleyin</CardTitle>
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
                <Button variant="outline" onClick={() => setStep(1)}>
                  Geri
                </Button>
                <Button
                  onClick={() => setStep(3)}
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

        {/* Step 3: Property Details */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Mülk Bilgilerini Doldurun</CardTitle>
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

        {/* Step 4: Video Preview */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Video Önizlemesi</CardTitle>
              <CardDescription>
                AI tarafından oluşturulan video önizlemesini görüntüleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Play className="h-16 w-16 text-white mx-auto opacity-50" />
                  <p className="text-white text-lg">Video Önizlemesi</p>
                  <p className="text-gray-400 text-sm">Seslendirme ve şablon seçiminden sonra görüntülenecek</p>
                </div>
              </div>

              <div className="bg-secondary/50 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold">Video Özellikleri</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Fotoğraf Sayısı</p>
                    <p className="font-medium">{photos.length} fotoğraf</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tahmini Süre</p>
                    <p className="font-medium">45-60 saniye</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Kalite</p>
                    <p className="font-medium">4K (3840x2160)</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(3)}>
                  Geri
                </Button>
                <Button
                  onClick={() => setStep(5)}
                  className="bg-gradient-to-r from-primary to-primary-glow"
                >
                  Sonraki Adım
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Voice Selection */}
        {step === 5 && (
          <Card>
            <CardHeader>
              <CardTitle>Seslendirme Dili ve Sesini Seçin</CardTitle>
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
                <Button variant="outline" onClick={() => setStep(4)}>
                  Geri
                </Button>
                <Button
                  onClick={() => setStep(6)}
                  disabled={!selectedVoice}
                  className="bg-gradient-to-r from-primary to-primary-glow"
                >
                  Sonraki Adım
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 6: Social Media Template Selection */}
        {step === 6 && (
          <Card>
            <CardHeader>
              <CardTitle>Sosyal Medya Şablonunu Seçin</CardTitle>
              <CardDescription>
                Videonuzu hangi platformda paylaşmak istiyorsunuz?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {socialTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all ${
                      selectedTemplate === template.id
                        ? 'border-primary border-2 bg-primary/5'
                        : 'hover:border-primary'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">{template.label}</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Format: {template.format}</p>
                        <p>Süre: {template.duration}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(5)}>
                  Geri
                </Button>
                <Button
                  onClick={() => setStep(7)}
                  disabled={!selectedTemplate}
                  className="bg-gradient-to-r from-primary to-primary-glow"
                >
                  Sonraki Adım
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 7: Share & Generate */}
        {step === 7 && (
          <Card>
            <CardHeader>
              <CardTitle>Videonuzu Oluşturun ve Paylaşın</CardTitle>
              <CardDescription>
                Tüm ayarlarınız hazır. Videonuzu oluşturmaya başlayın!
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
                    <p className="font-medium">{selectedLanguage === 'tr' ? 'Türkçe' : 'İngilizce'} - {selectedVoice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Platform</p>
                    <p className="font-medium">{selectedTemplate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tahmini Süre</p>
                    <p className="font-medium">45-60 saniye</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Paylaşım Seçenekleri</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-secondary/50">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <span>Video oluşturulduktan sonra otomatik olarak paylaş</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-secondary/50">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Paylaşım sonrası istatistikleri göster</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(6)}>
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
                    setStep(8);
                  }}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Video Oluştur ve Paylaş
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 8: Statistics & Dashboard */}
        {step === 8 && (
          <Card>
            <CardHeader>
              <CardTitle>Video İstatistikleri</CardTitle>
              <CardDescription>
                Videonuzun performansını izleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <p className="text-green-700 font-medium">✓ Video başarıyla oluşturuldu ve paylaşıldı!</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-2">Görüntülenme</p>
                    <p className="text-2xl font-bold">1,240</p>
                    <p className="text-xs text-green-600 mt-2">↑ 18% bu gün</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-2">Beğeni</p>
                    <p className="text-2xl font-bold">156</p>
                    <p className="text-xs text-green-600 mt-2">↑ 24% bu gün</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-2">Yorum</p>
                    <p className="text-2xl font-bold">42</p>
                    <p className="text-xs text-green-600 mt-2">↑ 12% bu gün</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-2">Paylaşım</p>
                    <p className="text-2xl font-bold">28</p>
                    <p className="text-xs text-green-600 mt-2">↑ 8% bu gün</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Platform Performansı</h3>
                <div className="space-y-3">
                  {socialTemplates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium capitalize">{template.label}</span>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">2.5K</p>
                          <p className="text-xs text-muted-foreground">görüntülenme</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => {
                  setStep(1);
                  setPhotos([]);
                  setSelectedVoice("");
                  setSelectedTemplate("");
                }}>
                  <Home className="mr-2 h-4 w-4" />
                  Yeni Video Oluştur
                </Button>
                <Button
                  onClick={() => {
                    toast({
                      title: "Dashboard'a yönlendiriliyorsunuz",
                      description: "Tüm videolarınızı görmek için dashboard'a gidin"
                    });
                  }}
                  className="bg-gradient-to-r from-primary to-primary-glow"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Dashboard'a Git
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
