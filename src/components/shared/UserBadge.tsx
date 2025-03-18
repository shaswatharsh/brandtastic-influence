
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type BadgeVariant = 'default' | 'top-brand' | 'top-creator' | 'verified' | 'trusted';

interface UserBadgeProps {
  badge: string;
  className?: string;
}

const UserBadge = ({ badge, className }: UserBadgeProps) => {
  // Map badge names to variants and descriptions
  const getBadgeInfo = (badge: string): { variant: BadgeVariant; description: string } => {
    const badgeMap: Record<string, { variant: BadgeVariant; description: string }> = {
      'Top Brand': { 
        variant: 'top-brand', 
        description: 'Consistently high-rated by creators' 
      },
      'Top Creator': { 
        variant: 'top-creator', 
        description: 'Delivers exceptional content' 
      },
      'Verified': { 
        variant: 'verified', 
        description: 'Identity verified by platform' 
      },
      'Trusted Partner': { 
        variant: 'trusted', 
        description: 'Reliable collaboration partner' 
      },
      'Quick Responder': { 
        variant: 'default', 
        description: 'Responds within 24 hours' 
      },
      'Top Deals': { 
        variant: 'default', 
        description: 'Offers fair and competitive rates' 
      },
    };

    return badgeMap[badge] || { variant: 'default', description: 'Platform achievement' };
  };

  const { variant, description } = getBadgeInfo(badge);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant={variant === 'default' ? 'default' : 'outline'} 
            className={cn(
              "px-2 py-1 h-auto text-xs",
              variant === 'top-brand' && "border-purple-500 text-purple-500",
              variant === 'top-creator' && "border-blue-500 text-blue-500",
              variant === 'verified' && "border-green-500 text-green-500",
              variant === 'trusted' && "border-amber-500 text-amber-500",
              className
            )}
          >
            {badge}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserBadge;
