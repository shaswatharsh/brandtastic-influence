
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Phone, Video, Info, MoreVertical } from 'lucide-react';
import { Contact } from '@/contexts/MessageContext';

interface ChatHeaderProps {
  contact: Contact;
}

const ChatHeader = ({ contact }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={contact.avatar} alt={contact.name} />
          <AvatarFallback>{contact.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{contact.name}</h3>
          <p className="text-xs text-muted-foreground">Online</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Phone className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Video className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Info className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
