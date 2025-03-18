
import { MessageSquare } from 'lucide-react';
import { useMessages } from '@/contexts/MessageContext';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MessageIndicatorProps {
  className?: string;
}

const MessageIndicator = ({ className }: MessageIndicatorProps) => {
  const { unreadCount } = useMessages();

  return (
    <div className={cn("relative", className)}>
      <MessageSquare className="h-5 w-5" />
      {unreadCount > 0 && (
        <Badge 
          variant="default" 
          className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center rounded-full text-[10px]"
        >
          {unreadCount > 9 ? '9+' : unreadCount}
        </Badge>
      )}
    </div>
  );
};

export default MessageIndicator;
