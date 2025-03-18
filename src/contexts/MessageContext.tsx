
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

// Types for our messages and notifications
export type Contact = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
};

export type Message = {
  id: string;
  sender: "me" | "them";
  content: string;
  time: string;
};

type MessageContextType = {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  activeContact: Contact | null;
  setActiveContact: React.Dispatch<React.SetStateAction<Contact | null>>;
  messages: Record<string, Message[]>;
  setMessages: React.Dispatch<React.SetStateAction<Record<string, Message[]>>>;
  sendMessage: (contactId: string, content: string) => void;
  unreadCount: number;
  markAsRead: (contactId: string) => void;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

// Mock data for initial contacts
const initialContacts: Contact[] = [
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

// Mock data for initial messages
const initialMessages: Record<string, Message[]> = {
  '1': [
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
  ]
};

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [activeContact, setActiveContact] = useState<Contact | null>(initialContacts[0]);
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages);
  
  // Calculate total unread messages
  const unreadCount = contacts.reduce((sum, contact) => sum + contact.unread, 0);
  
  // Simulate receiving a message every minute (for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance to receive a message
        const randomContactIndex = Math.floor(Math.random() * contacts.length);
        const contactId = contacts[randomContactIndex].id;
        
        // Only send notifications if not the active contact
        if (!activeContact || activeContact.id !== contactId) {
          const newMessage = {
            id: Date.now().toString(),
            sender: 'them',
            content: `Hey there! Just checking in about our collaboration. This is an automated message for demo purposes.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          
          // Update messages
          setMessages(prev => ({
            ...prev,
            [contactId]: [...(prev[contactId] || []), newMessage],
          }));
          
          // Update contact last message and unread count
          setContacts(prev => prev.map(contact => 
            contact.id === contactId 
              ? { 
                  ...contact, 
                  lastMessage: newMessage.content, 
                  time: 'just now', 
                  unread: contact.unread + 1 
                } 
              : contact
          ));
          
          // Show notification
          toast(`New message from ${contacts[randomContactIndex].name}`, {
            description: newMessage.content.substring(0, 60) + (newMessage.content.length > 60 ? '...' : ''),
            action: {
              label: "View",
              onClick: () => window.location.href = "/messages"
            },
          });
        }
      }
    }, 60000); // Every minute
    
    return () => clearInterval(interval);
  }, [contacts, activeContact]);
  
  const sendMessage = (contactId: string, content: string) => {
    if (!content.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      sender: 'me',
      content,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    // Update messages
    setMessages(prev => ({
      ...prev,
      [contactId]: [...(prev[contactId] || []), newMessage],
    }));
    
    // Update contact last message
    setContacts(prev => prev.map(contact => 
      contact.id === contactId 
        ? { ...contact, lastMessage: content, time: 'just now' } 
        : contact
    ));
  };
  
  const markAsRead = (contactId: string) => {
    setContacts(prev => prev.map(contact => 
      contact.id === contactId 
        ? { ...contact, unread: 0 } 
        : contact
    ));
  };
  
  return (
    <MessageContext.Provider 
      value={{ 
        contacts, 
        setContacts, 
        activeContact, 
        setActiveContact, 
        messages, 
        setMessages, 
        sendMessage,
        unreadCount,
        markAsRead
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};
