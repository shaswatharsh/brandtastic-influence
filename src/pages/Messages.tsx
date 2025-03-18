
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FadeUp } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Send, 
  PaperclipIcon, 
  Image, 
  Smile, 
  MoreVertical,
  Phone,
  Video,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Mock data for chat contacts
const contacts = [
  {
    id: '1',
    name: 'Fashion Brand',
    avatar: '/placeholder.svg',
    lastMessage: 'Hi there! We loved your previous work and...',
    time: '2m ago',
    unread: 2,
  },
  {
    id: '2',
    name: 'Travel Company',
    avatar: '/placeholder.svg',
    lastMessage: 'Thanks for sending over your media kit!',
    time: '1h ago',
    unread: 0,
  },
  {
    id: '3',
    name: 'Tech Gadgets',
    avatar: '/placeholder.svg',
    lastMessage: 'Would you be interested in reviewing our...',
    time: '3h ago',
    unread: 0,
  },
  {
    id: '4',
    name: 'Beauty Brand',
    avatar: '/placeholder.svg',
    lastMessage: 'Contract sent! Please review and let me know...',
    time: '1d ago',
    unread: 0,
  },
  {
    id: '5',
    name: 'Fitness App',
    avatar: '/placeholder.svg',
    lastMessage: 'Great call today! Looking forward to...',
    time: '2d ago',
    unread: 0,
  },
];

// Mock data for messages
const initialMessages = [
  {
    id: '1',
    sender: 'them',
    content: 'Hi there! We loved your previous work and would like to discuss a potential collaboration for our upcoming summer campaign.',
    time: '10:32 AM',
  },
  {
    id: '2',
    sender: 'them',
    content: 'We\'re looking for lifestyle content creators who can showcase our products in natural, everyday settings.',
    time: '10:33 AM',
  },
  {
    id: '3',
    sender: 'me',
    content: 'Hello! Thank you for reaching out. I\'d be very interested in learning more about your summer campaign.',
    time: '10:45 AM',
  },
  {
    id: '4',
    sender: 'me',
    content: 'My content focuses on sustainable living and mindful travel, which might be a great fit for your brand if that aligns with your values.',
    time: '10:46 AM',
  },
  {
    id: '5',
    sender: 'them',
    content: 'That sounds perfect! Sustainability is a key part of our brand identity. Could you share some examples of similar collaborations you\'ve done in the past?',
    time: '11:02 AM',
  },
  {
    id: '6',
    sender: 'me',
    content: 'Absolutely! I\'ve worked with several ethical brands. I\'ll send over some examples from my portfolio.',
    time: '11:08 AM',
  },
  {
    id: '7',
    sender: 'them',
    content: 'Great! Looking forward to seeing them. Also, could you let me know your typical rates for Instagram posts and Stories?',
    time: '11:15 AM',
  },
];

const Messages = () => {
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        sender: 'me',
        content: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 pb-0">
        <div className="h-[calc(100vh-64px)] flex flex-col">
          <FadeUp className="flex flex-col h-full">
            <div className="grid grid-cols-1 md:grid-cols-4 h-full">
              {/* Contact sidebar */}
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
                  {filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={cn(
                        "flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors",
                        activeContact.id === contact.id && "bg-muted"
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
                  ))}
                </div>
              </div>

              {/* Chat area */}
              <div className="md:col-span-3 flex flex-col h-full">
                {/* Chat header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
                      <AvatarFallback>{activeContact.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{activeContact.name}</h3>
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

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex",
                          message.sender === "me" ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[75%] rounded-2xl px-4 py-2",
                            message.sender === "me"
                              ? "bg-brand text-white rounded-tr-none"
                              : "bg-secondary rounded-tl-none"
                          )}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p 
                            className={cn(
                              "text-xs mt-1",
                              message.sender === "me" ? "text-brand-foreground/70" : "text-muted-foreground"
                            )}
                          >
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message input */}
                <div className="p-4 border-t border-border">
                  <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" type="button">
                      <PaperclipIcon className="h-5 w-5 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" type="button">
                      <Image className="h-5 w-5 text-muted-foreground" />
                    </Button>
                    <Input
                      className="flex-1"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button variant="ghost" size="icon" type="button">
                      <Smile className="h-5 w-5 text-muted-foreground" />
                    </Button>
                    <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                      <Send className="h-5 w-5" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </main>
    </div>
  );
};

export default Messages;
