import { Heart, MessageCircle, Share2, Eye } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  id: string;
  type: 'video' | 'image';
  thumbnail: string;
  title: string;
  description: string;
  likes: number;
  comments: number;
  views: number;
  isLiked?: boolean;
}

export default function ContentCard({
  id,
  type,
  thumbnail,
  title,
  description,
  likes,
  comments,
  views,
  isLiked: initialIsLiked = false,
}: ContentCardProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [currentLikes, setCurrentLikes] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
  };

  const formatNumber = (num: number) => {
    if (num > 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num > 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div
      className="snap-start h-screen w-full flex items-center justify-center bg-background relative group"
      key={id}
    >
      {/* Content Container */}
      <div className="relative w-full h-full max-w-sm md:max-w-lg lg:max-w-2xl mx-auto flex flex-col items-center justify-center px-2 sm:px-0">
        {/* Media */}
        <div className="relative w-full h-full bg-secondary rounded-lg overflow-hidden shadow-lg">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />

          {/* Play Button Overlay for Videos */}
          {type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm group-hover:bg-primary transition-colors duration-300 transform group-hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-l-6 sm:border-l-8 border-l-primary-foreground border-t-4 sm:border-t-5 border-t-transparent border-b-4 sm:border-b-5 border-b-transparent ml-1" />
              </div>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Content Info */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-primary-foreground">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 line-clamp-2">{title}</h3>
            <p className="text-xs sm:text-sm text-white/90 line-clamp-2">{description}</p>
          </div>
        </div>

        {/* Action Buttons - Right Side */}
        <div className="absolute right-2 sm:right-4 bottom-20 sm:bottom-24 flex flex-col gap-3 sm:gap-4">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className="flex flex-col items-center gap-1 group/btn transition-transform duration-200 hover:scale-110"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover/btn:bg-white/20 transition-colors duration-300">
              <Heart
                className={cn(
                  'w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300',
                  isLiked
                    ? 'fill-red-500 text-red-500'
                    : 'text-white group-hover/btn:scale-110'
                )}
              />
            </div>
            <span className="text-white font-medium text-xs">{formatNumber(currentLikes)}</span>
          </button>

          {/* Comment Button */}
          <button className="flex flex-col items-center gap-1 group/btn transition-transform duration-200 hover:scale-110">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover/btn:bg-white/20 transition-colors duration-300">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover/btn:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-white font-medium text-xs">{formatNumber(comments)}</span>
          </button>

          {/* Share Button */}
          <button className="flex flex-col items-center gap-1 group/btn transition-transform duration-200 hover:scale-110">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover/btn:bg-white/20 transition-colors duration-300">
              <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover/btn:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-white font-medium text-xs">Compartilhar</span>
          </button>

          {/* Views */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-white font-medium text-xs">{formatNumber(views)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
