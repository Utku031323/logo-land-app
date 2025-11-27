import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";
import {
  Plus,
  Video,
  Eye,
  Share2,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Toplam Video",
      value: "24",
      change: "+3 bu ay",
      icon: Video,
      color: "text-primary"
    },
    {
      title: "Toplam Görüntülenme",
      value: "12.5K",
      change: "+18% bu ay",
      icon: Eye,
      color: "text-accent"
    },
    {
      title: "Paylaşımlar",
      value: "156",
      change: "+24% bu ay",
      icon: Share2,
      color: "text-blue-600"
    },
    {
      title: "Ortalama İzlenme",
      value: "520",
      change: "+12% bu ay",
      icon: TrendingUp,
      color: "text-green-600"
    }
  ];

  const recentVideos = [
    {
      id: 1,
      title: "Lüks 3+1 Daire - Çankaya",
      status: "completed",
      views: 1240,
      date: "2 saat önce",
      thumbnail: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Villa - Belek Antalya",
      status: "processing",
      views: 0,
      date: "5 dakika önce",
      thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Residence Daire - Kadıköy",
      status: "completed",
      views: 856,
      date: "1 gün önce",
      thumbnail: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Portföylerinizi yönetin ve istatistiklerinizi görüntüleyin</p>
          </div>
          <Link to="/upload">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-elevated transition-all"
            >
              <Plus className="mr-2 h-5 w-5" />
              Yeni Video Oluştur
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-soft transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Videos */}
        <Card>
          <CardHeader>
            <CardTitle>Son Videolar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentVideos.map((video) => (
                <div 
                  key={video.id}
                  className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg hover:shadow-soft transition-all"
                >
                  <img 
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full md:w-48 h-32 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-lg">{video.title}</h3>
                      {video.status === "completed" ? (
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{video.views.toLocaleString('tr-TR')} görüntülenme</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{video.date}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm">
                        Görüntüle
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        Paylaş
                      </Button>
                      {video.status === "completed" && (
                        <Button variant="outline" size="sm">
                          İstatistikler
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-6">
              Tüm Videoları Görüntüle
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Link to="/upload">
            <Card className="hover:shadow-soft transition-all cursor-pointer h-full">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Yeni Video Oluştur</h3>
                <p className="text-sm text-muted-foreground">Fotoğraf yükleyin ve video oluşturun</p>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:shadow-soft transition-all cursor-pointer">
            <CardContent className="p-6 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold">Analitik</h3>
              <p className="text-sm text-muted-foreground">Detaylı performans raporları</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-soft transition-all cursor-pointer">
            <CardContent className="p-6 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-blue-500/10 flex items-center justify-center">
                <Video className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold">Şablonlar</h3>
              <p className="text-sm text-muted-foreground">Hazır video şablonları</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
