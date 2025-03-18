
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Contact } from '@/contexts/MessageContext';

interface ContactListProps {
  contacts: Contact[];
  activeContact: Contact | null;
  setActiveContact: (contact: Contact) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ContactList = ({ 
  contacts, 
  activeContact, 
  setActiveContact, 
  searchTerm, 
  setSearchTerm 
}: ContactListProps) => {
  return (
    <div className="md:col-span-1 border-r border-border h-full flex flex-col">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className={cn(
                "flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors",
                activeContact?.id === contact.id && "bg-muted"
              )}
              onClick={() => setActiveContact(contact)}
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={contact.avatar} alt={contact.name} />
                <AvatarFallback>{contact.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium truncate">{contact.name}</h3>
                  <span className="text-xs text-muted-foreground">{contact.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate">
                    {contact.lastMessage}
                  </p>
                  {contact.unread > 0 && (
                    <Badge variant="default" className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full text-xs">
                      {contact.unread}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            No contacts found
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;
