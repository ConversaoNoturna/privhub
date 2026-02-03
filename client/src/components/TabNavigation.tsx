import { Video, Image as ImageIcon, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TabNavigationProps {
  activeTab: 'videos' | 'images' | 'privhub';
  onTabChange: (tab: 'videos' | 'images' | 'privhub') => void;
}

const tabs = [
  { id: 'videos', label: 'Vídeos', icon: Video },
  { id: 'images', label: 'Imagens', icon: ImageIcon },
  { id: 'privhub', label: 'PrivHub', icon: Zap },
] as const;

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="sticky top-0 z-20 bg-background border-b border-primary/20 shadow-lg glow-orange">
      <div className="flex backdrop-blur-sm bg-background/80">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as 'videos' | 'images' | 'privhub')}
              className={cn(
                'flex-1 py-3 sm:py-4 px-2 sm:px-4 flex items-center justify-center gap-1 sm:gap-2 font-semibold transition-all duration-300 relative group text-sm sm:text-base',
                isActive
                  ? 'text-primary'
                  : 'text-foreground/60 hover:text-foreground'
              )}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">{tab.label}</span>
              
              {/* Animated underline with glow */}
              <div
                className={cn(
                  'absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-primary/50 transition-all duration-300 rounded-full',
                  isActive ? 'opacity-100 glow-orange' : 'opacity-0'
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
