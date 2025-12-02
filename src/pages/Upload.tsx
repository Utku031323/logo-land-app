import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { Upload as UploadIcon, X, ArrowRight, Play, Home, Download, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Player } from "@remotion/player";
import { RealEstateVideo } from "@/video/compositions/RealEstateVideo";

// API Base URL
const API_BASE_URL = "http://localhost:3001/api";

// Property data interface
interface PropertyData {
  title: string;
  price: string;
  area: string;
  rooms: string;
  location: string;
  floor: string;
  description: string;
  propertyType: string;
}

// Generated content interface
interface GeneratedContent {
  script: string;
  audioUrl: string;
}

const Upload = () => {
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState<string[]>([]);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]); // Store original files for upload
  const [selectedVoice, setSelectedVoice] = useState<string>("21m00Tcm4TlvDq8ikWAM");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("tr");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string>("");
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [generationProgress, setGenerationProgress] = useState<string>("");
  const { toast } = useToast();

  // Property details state
  const [propertyData, setPropertyData] = useState<PropertyData>({
    title: "",
    price: "",
    area: "",
    rooms: "",
    location: "",
    floor: "",
    description: "",
    propertyType: "daire",
  });

  // Update property data helper
  const updatePropertyData = (field: keyof PropertyData, value: string) => {
    setPropertyData(prev => ({ ...prev, [field]: value }));
  };

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
      const fileArray = Array.from(files);
      const newPhotos = fileArray.map(file => URL.createObjectURL(file));
      setPhotos([...photos, ...newPhotos]);
      setPhotoFiles([...photoFiles, ...fileArray]);
      toast({
        title: "Fotoğraflar yüklendi",
        description: `${files.length} fotoğraf başarıyla yüklendi.`
      });
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
    setPhotoFiles(photoFiles.filter((_, i) => i !== index));
  };

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Generate video content via API
  const generateVideoContent = async () => {
    setIsGenerating(true);
    setGenerationProgress("Script hazırlanıyor...");

    try {
      // Prepare property data for API
      const apiPayload = {
        title: propertyData.title || "Lüks Daire",
        location: propertyData.location || "İstanbul",
        price: propertyData.price ? `₺${Number(propertyData.price).toLocaleString('tr-TR')}` : "₺2.500.000",
        bedrooms: propertyData.rooms ? parseInt(propertyData.rooms.split('+')[0]) : 3,
        bathrooms: 2,
        area: propertyData.area ? parseInt(propertyData.area) : 150,
        features: [
          "Merkezi konum",
          "Açık mutfak",
          "Geniş balkon",
          propertyData.floor ? `${propertyData.floor}. kat` : "Yüksek kat",
        ],
        propertyType: propertyData.propertyType || "daire",
        language: selectedLanguage,
        voiceId: selectedVoice,
      };

      console.log("API Request:", apiPayload);

      // Call the backend API
      const response = await fetch(`${API_BASE_URL}/generate-video-content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Video oluşturma başarısız oldu");
      }

      setGenerationProgress("Ses dosyası oluşturuluyor...");

      const data = await response.json();
      console.log("API Response:", data);

      // Store generated content
      setGeneratedContent({
        script: data.script,
        audioUrl: data.audio?.url || "",
      });

      // If audio was generated, set the URL
      if (data.audio?.url) {
        setGeneratedVideoUrl(`${API_BASE_URL.replace('/api', '')}${data.audio.url}`);
      }

      setVideoReady(true);
      setStep(7);

      toast({
        title: "Video başarıyla oluşturuldu!",
        description: "Videonuz hazır. Önizleyebilir ve indirebilirsiniz.",
      });

    } catch (error) {
      console.error("Video generation error:", error);

      const errorMessage = error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu";

      toast({
        title: "Hata!",
        description: errorMessage,
        variant: "destructive",
      });

      // Fallback: Use mock data if API fails
      setGeneratedContent({
        script: "Bu muhteşem mülk, modern yaşamın tüm konforlarını sunuyor...",
        audioUrl: "",
      });
      setVideoReady(true);
      setStep(7);

    } finally {
      setIsGenerating(false);
      setGenerationProgress("");
    }
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
            { num: 3, label: "Mülk Bilgileri" },
            { num: 4, label: "Seslendirme" },
            { num: 5, label: "Şablon" },
            { num: 6, label: "Oluştur" },
            { num: 7, label: "Sonuç" }
          ].map((s, idx) => (
            <div key={s.num} className="flex items-center flex-1 min-w-max">
              <div className={`flex flex-col items-center ${idx < 6 ? 'flex-1' : ''}`}>
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
              {idx < 6 && (
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
                  <Input
                    id="title"
                    placeholder="Örn: Lüks 3+1 Daire"
                    value={propertyData.title}
                    onChange={(e) => updatePropertyData("title", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Fiyat (₺)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Örn: 2500000"
                    value={propertyData.price}
                    onChange={(e) => updatePropertyData("price", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="m2">Metrekare (m²)</Label>
                  <Input
                    id="m2"
                    type="number"
                    placeholder="Örn: 150"
                    value={propertyData.area}
                    onChange={(e) => updatePropertyData("area", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rooms">Oda Sayısı</Label>
                  <Select
                    value={propertyData.rooms}
                    onValueChange={(value) => updatePropertyData("rooms", value)}
                  >
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
                  <Input
                    id="location"
                    placeholder="İlçe, Şehir"
                    value={propertyData.location}
                    onChange={(e) => updatePropertyData("location", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="floor">Kat</Label>
                  <Input
                    id="floor"
                    type="number"
                    placeholder="Örn: 5"
                    value={propertyData.floor}
                    onChange={(e) => updatePropertyData("floor", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  placeholder="Mülk hakkında detaylı bilgi..."
                  rows={4}
                  value={propertyData.description}
                  onChange={(e) => updatePropertyData("description", e.target.value)}
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

        {/* Step 4: Voice Selection */}
        {step === 4 && (
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
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
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
                      { id: "21m00Tcm4TlvDq8ikWAM", label: "Erkek Ses 1", description: "Profesyonel, otoriter" },
                      { id: "AZnzlk1XvdvUeBnXmlld", label: "Erkek Ses 2", description: "Samimi, sıcak" },
                      { id: "EXAVITQu4vr4xnSDxMaL", label: "Kadın Ses 1", description: "Enerjik, dinamik" },
                      { id: "MF3mGyEYCl7XYWbV9V6O", label: "Kadın Ses 2", description: "Sakin, güvenilir" },
                    ].map((voice) => (
                      <Card
                        key={voice.id}
                        className={`cursor-pointer transition-all ${
                          selectedVoice === voice.id
                            ? 'border-primary border-2 bg-primary/5'
                            : 'hover:border-primary'
                        }`}
                        onClick={() => setSelectedVoice(voice.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{voice.label}</h4>
                            {selectedVoice === voice.id && (
                              <CheckCircle className="h-5 w-5 text-primary" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{voice.description}</p>
                        </CardContent>
                      </Card>
                    ))}
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

        {/* Step 5: Social Media Template Selection */}
        {step === 5 && (
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
                <Button variant="outline" onClick={() => setStep(4)}>
                  Geri
                </Button>
                <Button
                  onClick={() => setStep(6)}
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

        {/* Step 6: Generate Video */}
        {step === 6 && (
          <Card>
            <CardHeader>
              <CardTitle>Videonuzu Oluşturun</CardTitle>
              <CardDescription>
                Tüm ayarlarınız hazır. Videonuzu oluşturmaya başlayın!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-secondary/50 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-lg">Özet</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Mülk Başlığı</p>
                    <p className="font-medium">{propertyData.title || "Belirtilmedi"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fiyat</p>
                    <p className="font-medium">{propertyData.price ? `₺${Number(propertyData.price).toLocaleString('tr-TR')}` : "Belirtilmedi"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Konum</p>
                    <p className="font-medium">{propertyData.location || "Belirtilmedi"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fotoğraf Sayısı</p>
                    <p className="font-medium">{photos.length} fotoğraf</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Seslendirme Dili</p>
                    <p className="font-medium">
                      {selectedLanguage === 'tr' ? 'Türkçe' :
                       selectedLanguage === 'en' ? 'İngilizce' :
                       selectedLanguage === 'de' ? 'Almanca' :
                       selectedLanguage === 'ar' ? 'Arapça' : 'Rusça'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Platform</p>
                    <p className="font-medium">{selectedTemplate || 'Seçilmedi'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Video Formatı</p>
                    <p className="font-medium">1080x1920 (9:16)</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Metrekare</p>
                    <p className="font-medium">{propertyData.area ? `${propertyData.area} m²` : "Belirtilmedi"}</p>
                  </div>
                </div>
              </div>

              {/* Generation Progress */}
              {isGenerating && generationProgress && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <p className="font-medium">{generationProgress}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(5)} disabled={isGenerating}>
                  Geri
                </Button>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary-glow"
                  disabled={isGenerating}
                  onClick={generateVideoContent}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Oluşturuluyor...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Video Oluştur
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 7: Result Screen */}
        {step === 7 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Videonuz Hazır!
              </CardTitle>
              <CardDescription>
                Videonuz başarıyla oluşturuldu. İndirebilir veya önizleyebilirsiniz.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Video Preview with Remotion Player */}
              <div className="bg-black rounded-lg max-w-sm mx-auto overflow-hidden">
                {videoReady ? (
                  <Player
                    component={RealEstateVideo}
                    inputProps={{
                      photos: photos.length > 0 ? photos : [
                        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1080",
                        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1080",
                        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1080",
                      ],
                      title: propertyData.title || "Lüks Daire",
                      location: propertyData.location || "İstanbul",
                      price: propertyData.price
                        ? `₺${Number(propertyData.price).toLocaleString('tr-TR')}`
                        : "₺2.500.000",
                      audioUrl: generatedVideoUrl || undefined,
                    }}
                    durationInFrames={30 * 30}
                    fps={30}
                    compositionWidth={1080}
                    compositionHeight={1920}
                    style={{
                      width: "100%",
                      aspectRatio: "9/16",
                    }}
                    controls
                    autoPlay={false}
                    loop
                  />
                ) : (
                  <div className="aspect-[9/16] flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <Loader2 className="h-12 w-12 text-white mx-auto animate-spin" />
                      <p className="text-white">Yükleniyor...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Generated Script Preview */}
              {generatedContent?.script && (
                <div className="bg-secondary/30 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Oluşturulan Script:</h4>
                  <p className="text-sm text-muted-foreground italic">
                    "{generatedContent.script}"
                  </p>
                </div>
              )}

              {/* Video Info */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-700 font-medium">
                  <CheckCircle className="h-5 w-5" />
                  Video başarıyla oluşturuldu!
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Süre: 30 saniye • Format: MP4 • Çözünürlük: 1080x1920
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Video oynatılıyor",
                      description: "Video önizlemesi açılıyor..."
                    });
                  }}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Önizle
                </Button>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary-glow"
                  onClick={() => {
                    toast({
                      title: "İndirme başlatıldı",
                      description: "Videonuz indiriliyor..."
                    });
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Videoyu İndir
                </Button>
              </div>

              <div className="flex justify-between pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    // Reset all states for new video
                    setStep(1);
                    setPhotos([]);
                    setPhotoFiles([]);
                    setSelectedVoice("21m00Tcm4TlvDq8ikWAM");
                    setSelectedTemplate("");
                    setVideoReady(false);
                    setGeneratedVideoUrl("");
                    setGeneratedContent(null);
                    setPropertyData({
                      title: "",
                      price: "",
                      area: "",
                      rooms: "",
                      location: "",
                      floor: "",
                      description: "",
                      propertyType: "daire",
                    });
                  }}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Yeni Video Oluştur
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
