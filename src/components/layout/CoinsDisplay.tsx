
import React from 'react';
import { Coins } from 'lucide-react';
import { useMessages } from '@/contexts/MessageContext';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CoinsDisplayProps {
  className?: string;
}

const CoinsDisplay = ({ className }: CoinsDisplayProps) => {
  const { userCoins } = useMessages();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 text-amber-500 rounded-full", className)}>
            <Coins className="h-4 w-4" />
            <span className="font-medium">{userCoins}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">Your current coin balance</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CoinsDisplay;
