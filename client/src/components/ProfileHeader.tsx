import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfileHeaderProps {
  userName: string;
  userHandle: string;
  bio: string;
  followers: number;
  following: number;
  profileImage: string;
  bannerImage: string;
}

export default function ProfileHeader({
  userName,
  userHandle,
  bio,
  followers,
  following,
  profileImage,
  bannerImage,
}: ProfileHeaderProps) {
  return (
    <div className="bg-background gradient-bg">
      {/* Banner */}
      <div className="relative h-40 sm:h-48 md:h-56 bg-secondary overflow-hidden">
        <img
          src={bannerImage}
          alt="Profile banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />
      </div>

      {/* Profile Info */}
      <div className="px-3 sm:px-4 md:px-6 pb-4 sm:pb-6">
        {/* Profile Picture and Header Actions */}
        <div className="flex items-start justify-between -mt-12 sm:-mt-16 mb-3 sm:mb-4 relative z-10">
          <div className="flex items-end gap-4">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl border-4 border-primary/50 bg-secondary overflow-hidden shadow-lg glow-orange hover-glow transition-all duration-300">
              <img
                src={profileImage}
                alt={userName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="mt-2 rounded-full border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300"
          >
            <MoreVertical className="w-5 h-5 text-primary" />
          </Button>
        </div>

        {/* Name and Handle */}
        <div className="mb-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground gradient-text">{userName}</h1>
          <p className="text-sm sm:text-base text-primary/80">@{userHandle}</p>
        </div>

        {/* Bio */}
        <p className="text-sm sm:text-base text-foreground/90 mb-3 sm:mb-4 max-w-2xl line-clamp-3">{bio}</p>

        {/* Stats */}
        <div className="flex gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl md:text-2xl font-bold gradient-text">{followers}</span>
            <span className="text-xs sm:text-sm text-muted-foreground">Seguidores</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl md:text-2xl font-bold gradient-text">{following}</span>
            <span className="text-xs sm:text-sm text-muted-foreground">Seguindo</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 sm:gap-3">
          <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 glow-orange animate-pulse-glow">
            Seguir
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-primary/50 hover:bg-primary/10 text-foreground rounded-lg text-sm sm:text-base font-semibold transition-all duration-300"
          >
            Mensagem
          </Button>
        </div>
      </div>
    </div>
  );
}
