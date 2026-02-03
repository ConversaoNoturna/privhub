import { useState, useRef, useEffect } from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import TabNavigation from '@/components/TabNavigation';
import ContentCard from '@/components/ContentCard';

// Mock data
  const mockVideos = [
  {
    id: '1',
    type: 'video' as const,
    thumbnail: '/images/content-placeholder-orange.jpg',
    title: 'Meu primeiro vídeo no PrivHub',
    description: 'Confira este conteúdo incrível que preparei especialmente para vocês',
    likes: 1234,
    comments: 89,
    views: 45678,
  },
  {
    id: '2',
    type: 'video' as const,
    thumbnail: '/images/hero-gradient-orange.jpg',
    title: 'Dicas de produção de conteúdo',
    description: 'Aprenda as melhores práticas para criar vídeos de qualidade',
    likes: 5678,
    comments: 234,
    views: 123456,
  },
  {
    id: '3',
    type: 'video' as const,
    thumbnail: '/images/profile-banner-orange.jpg',
    title: 'Dia na minha vida',
    description: 'Acompanhe meu dia a dia e rotina de criador de conteúdo',
    likes: 3456,
    comments: 156,
    views: 87654,
  },
];

const mockImages = [
  {
    id: '1',
    type: 'image' as const,
    thumbnail: '/images/hero-gradient-orange.jpg',
    title: 'Foto incrível do pôr do sol',
    description: 'Capturada no melhor momento do dia',
    likes: 2345,
    comments: 123,
    views: 56789,
  },
  {
    id: '2',
    type: 'image' as const,
    thumbnail: '/images/profile-banner-orange.jpg',
    title: 'Retrato minimalista',
    description: 'Explorando a beleza da simplicidade',
    likes: 4567,
    comments: 234,
    views: 98765,
  },
  {
    id: '3',
    type: 'image' as const,
    thumbnail: '/images/content-placeholder-orange.jpg',
    title: 'Paisagem urbana',
    description: 'A cidade nunca dorme, e nem eu',
    likes: 3210,
    comments: 145,
    views: 67890,
  },
];

const mockPrivHub = [
  {
    id: '1',
    type: 'video' as const,
    thumbnail: '/images/profile-banner-orange.jpg',
    title: 'PrivHub Exclusive: Bastidores',
    description: 'Conteúdo exclusivo para membros PrivHub',
    likes: 8901,
    comments: 567,
    views: 234567,
  },
  {
    id: '2',
    type: 'image' as const,
    thumbnail: '/images/hero-gradient-orange.jpg',
    title: 'Galeria Premium',
    description: 'Fotos em alta resolução exclusivas',
    likes: 6789,
    comments: 345,
    views: 145678,
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<'videos' | 'images' | 'privhub'>('videos');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Get content based on active tab
  const getContent = () => {
    switch (activeTab) {
      case 'videos':
        return mockVideos;
      case 'images':
        return mockImages;
      case 'privhub':
        return mockPrivHub;
      default:
        return mockVideos;
    }
  };

  const content = getContent();

  // Handle smooth scroll snapping
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;
    let lastScrollTime = 0;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      
      // Prevent rapid scrolling
      if (now - lastScrollTime < 800) {
        e.preventDefault();
        return;
      }

      if (Math.abs(e.deltaY) > 50) {
        e.preventDefault();
        lastScrollTime = now;
        setIsScrolling(true);

        const scrollAmount = window.innerHeight;
        const newScrollTop = container.scrollTop + (e.deltaY > 0 ? scrollAmount : -scrollAmount);

        container.scrollTo({
          top: newScrollTop,
          behavior: 'smooth',
        });

        scrollTimeout = setTimeout(() => setIsScrolling(false), 600);
      }
    };

    // Handle touch swipe for mobile
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;

      if (Math.abs(diff) > 50 && !isScrolling) {
        setIsScrolling(true);
        const scrollAmount = window.innerHeight;
        const newScrollTop = container.scrollTop + (diff > 0 ? scrollAmount : -scrollAmount);

        container.scrollTo({
          top: newScrollTop,
          behavior: 'smooth',
        });

        scrollTimeout = setTimeout(() => setIsScrolling(false), 600);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      clearTimeout(scrollTimeout);
    };
  }, [isScrolling]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Profile Header */}
      <ProfileHeader
        userName="João Silva"
        userHandle="joaosilva"
        bio="Criador de conteúdo | Fotógrafo | Videógrafo. Compartilhando momentos especiais com você 📸"
        followers={15234}
        following={892}
        profileImage="/images/content-placeholder-orange.jpg"
        bannerImage="/images/profile-banner-orange.jpg"
      />

      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content Feed - TikTok Style Scroll */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-scroll snap-y snap-mandatory scroll-smooth"
        style={{
          scrollBehavior: 'smooth',
          scrollSnapType: 'y mandatory',
        }}
      >
        {content.map((item) => (
          <ContentCard
            key={item.id}
            id={item.id}
            type={item.type}
            thumbnail={item.thumbnail}
            title={item.title}
            description={item.description}
            likes={item.likes}
            comments={item.comments}
            views={item.views}
          />
        ))}

        {/* End of Content */}
        <div className="snap-start h-screen w-full flex items-center justify-center bg-secondary">
          <div className="text-center px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
              Fim do conteúdo
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Volte em breve para mais conteúdo incrível!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
