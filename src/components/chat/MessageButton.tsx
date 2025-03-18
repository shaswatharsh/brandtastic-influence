
import { Button, ButtonProps } from "@/components/ui/button";
import { MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMessages } from '@/contexts/MessageContext';
import { Contact } from '@/contexts/MessageContext';

interface MessageButtonProps extends ButtonProps {
  contact?: Contact;
  username?: string;
  children?: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

const MessageButton = ({ 
  contact, 
  username, 
  children, 
  variant = "outline",
  ...props 
}: MessageButtonProps) => {
  const { setActiveContact, contacts } = useMessages();

  const handleClick = () => {
    // If contact is provided, set it as active
    if (contact) {
      setActiveContact(contact);
    }
    // If username is provided, try to find matching contact or create new one
    else if (username) {
      const existingContact = contacts.find(c => 
        c.name.toLowerCase() === username.toLowerCase() || 
        c.name.includes(username)
      );
      
      if (existingContact) {
        setActiveContact(existingContact);
      }
      // Note: Creating new contacts would typically happen through a proper API
      // This is just a simple demo implementation
    }
  };

  return (
    <Button 
      variant={variant} 
      size="sm" 
      asChild
      className="flex items-center gap-1"
      {...props}
    >
      <Link to="/messages" onClick={handleClick}>
        <MessageSquare className="h-4 w-4" />
        {children || "Message"}
      </Link>
    </Button>
  );
};

export default MessageButton;
