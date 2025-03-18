
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'lucide-react';
import MessageButton from '@/components/chat/MessageButton';

interface WorkfolioCardProps {
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  engagement: number;
  niche: string[];
  featured?: boolean;
}

export const WorkfolioCard = ({
  name,
  username,
  avatar,
  bio,
  followers,
  engagement,
  niche,
  featured = false,
}: WorkfolioCardProps) => {
  // Format the followers number (e.g., 10500 -> 10.5K)
  const formatFollowers = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <Card className={`overflow-hidden transition-all hover:shadow-md ${featured ? 'border-brand' : ''}`}>
      {featured && (
        <div className="bg-brand text-white text-xs font-medium py-1 px-4 text-center">
          Featured Creator
        </div>
      )}
      <CardContent className="p-0">
        <div className="relative h-32 bg-gradient-to-r from-secondary to-secondary/50">
          <div className="absolute -bottom-10 left-6">
            <Avatar className="h-20 w-20 border-4 border-background shadow-md">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback className="bg-muted">{name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="pt-12 px-6 pb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              <p className="text-sm text-muted-foreground">@{username}</p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <Badge variant="outline" className="px-2 py-1 h-auto text-xs flex items-center gap-1">
                <span>{formatFollowers(followers)}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                <span>{engagement}% Eng</span>
              </Badge>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{bio}</p>

          <div className="flex flex-wrap gap-1 mb-4">
            {niche.map((tag, index) => (
              <Badge variant="secondary" key={index} className="px-2 py-1 h-auto text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Button variant="default" size="sm" className="flex-1 h-9">
              <Link className="h-4 w-4 mr-1" />
              View Profile
            </Button>
            <MessageButton 
              className="flex-1 h-9" 
              username={name}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
