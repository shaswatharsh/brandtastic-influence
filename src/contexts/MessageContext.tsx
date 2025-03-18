
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
  level?: string;
  coins?: number;
  badges?: string[];
};

export type Message = {
  id: string;
  sender: "me" | "them";
  content: string;
  time: string;
  isRead?: boolean;
  attachments?: string[];
};

export type Deal = {
  id: string;
  contactId: string;
  title: string;
  description: string;
  amount: number;
  status: "pending" | "accepted" | "rejected" | "completed";
  createdAt: string;
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
  deals: Deal[];
  setDeals: React.Dispatch<React.SetStateAction<Deal[]>>;
  createDeal: (deal: Omit<Deal, "id" | "createdAt">) => void;
  updateDealStatus: (dealId: string, status: Deal["status"]) => void;
  userCoins: number;
  earnCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

// Mock data for initial contacts with added level and coins
const initialContacts: Contact[] = [
  {
    id: '1',
    name: 'Fashion Brand',
    avatar: '/placeholder.svg',
    lastMessage: 'Hi there! We loved your previous work and...',
    time: '2m ago',
    unread: 2,
    level: 'Gold',
    coins: 450,
    badges: ['Top Brand', 'Quick Responder'],
  },
  {
    id: '2',
    name: 'Travel Company',
    avatar: '/placeholder.svg',
    lastMessage: 'Thanks for sending over your media kit!',
    time: '1h ago',
    unread: 0,
    level: 'Silver',
    coins: 250,
    badges: ['Trusted Partner'],
  },
  {
    id: '3',
    name: 'Tech Gadgets',
    avatar: '/placeholder.svg',
    lastMessage: 'Would you be interested in reviewing our...',
    time: '3h ago',
    unread: 0,
    level: 'Bronze',
    coins: 120,
  },
  {
    id: '4',
    name: 'Beauty Brand',
    avatar: '/placeholder.svg',
    lastMessage: 'Contract sent! Please review and let me know...',
    time: '1d ago',
    unread: 0,
    level: 'Gold',
    coins: 520,
    badges: ['Top Deals', 'Verified'],
  },
  {
    id: '5',
    name: 'Fitness App',
    avatar: '/placeholder.svg',
    lastMessage: 'Great call today! Looking forward to...',
    time: '2d ago',
    unread: 0,
    level: 'Silver',
    coins: 180,
  },
];

// Mock data for initial messages
const initialMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      sender: "them" as const,
      content: 'Hi there! We loved your previous work and would like to discuss a potential collaboration for our upcoming summer campaign.',
      time: '10:32 AM',
      isRead: true,
    },
    {
      id: '2',
      sender: "them" as const,
      content: 'We\'re looking for lifestyle content creators who can showcase our products in natural, everyday settings.',
      time: '10:33 AM',
      isRead: true,
    },
    {
      id: '3',
      sender: "me" as const,
      content: 'Hello! Thank you for reaching out. I\'d be very interested in learning more about your summer campaign.',
      time: '10:45 AM',
      isRead: true,
    },
    {
      id: '4',
      sender: "me" as const,
      content: 'My content focuses on sustainable living and mindful travel, which might be a great fit for your brand if that aligns with your values.',
      time: '10:46 AM',
      isRead: true,
    },
    {
      id: '5',
      sender: "them" as const,
      content: 'That sounds perfect! Sustainability is a key part of our brand identity. Could you share some examples of similar collaborations you\'ve done in the past?',
      time: '11:02 AM',
      isRead: true,
    },
    {
      id: '6',
      sender: "me" as const,
      content: 'Absolutely! I\'ve worked with several ethical brands. I\'ll send over some examples from my portfolio.',
      time: '11:08 AM',
      isRead: true,
    },
    {
      id: '7',
      sender: "them" as const,
      content: 'Great! Looking forward to seeing them. Also, could you let me know your typical rates for Instagram posts and Stories?',
      time: '11:15 AM',
      isRead: false,
    },
  ]
};

// Sample initial deals
const initialDeals: Deal[] = [
  {
    id: '1',
    contactId: '1',
    title: 'Summer Campaign Collaboration',
    description: 'Create 5 lifestyle photos featuring our new sustainable clothing line',
    amount: 1200,
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    contactId: '4',
    title: 'Beauty Product Review',
    description: 'Review our new skincare collection with minimum 3 Instagram posts',
    amount: 800,
    status: 'accepted',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [activeContact, setActiveContact] = useState<Contact | null>(initialContacts[0]);
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages);
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [userCoins, setUserCoins] = useState<number>(1000);
  
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
          const newMessage: Message = {
            id: Date.now().toString(),
            sender: "them" as const,
            content: `Hey there! Just checking in about our collaboration. This is an automated message for demo purposes.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isRead: false,
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
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "me" as const,
      content,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
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

    // Earn coins for sending a message (gamification)
    earnCoins(5);
  };
  
  const markAsRead = (contactId: string) => {
    // Mark all messages from this contact as read
    setMessages(prev => {
      const contactMessages = prev[contactId] || [];
      if (!contactMessages.some(msg => msg.sender === "them" && !msg.isRead)) {
        return prev;
      }
      
      return {
        ...prev,
        [contactId]: contactMessages.map(msg => 
          msg.sender === "them" && !msg.isRead ? { ...msg, isRead: true } : msg
        )
      };
    });

    // Reset unread count for this contact
    setContacts(prev => prev.map(contact => 
      contact.id === contactId && contact.unread > 0
        ? { ...contact, unread: 0 } 
        : contact
    ));
  };

  // Deal management functions
  const createDeal = (deal: Omit<Deal, "id" | "createdAt">) => {
    const newDeal: Deal = {
      ...deal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    setDeals(prev => [...prev, newDeal]);
    
    // Notify the user
    toast.success("New deal created", {
      description: `${newDeal.title} was successfully created.`,
    });

    // Create a system message in the chat
    const systemMessage: Message = {
      id: Date.now().toString() + 1,
      sender: "them" as const,
      content: `💼 New deal proposed: "${newDeal.title}" for $${newDeal.amount}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
    };

    setMessages(prev => ({
      ...prev,
      [deal.contactId]: [...(prev[deal.contactId] || []), systemMessage],
    }));

    // Earn coins for creating a deal
    earnCoins(50);
  };

  const updateDealStatus = (dealId: string, status: Deal["status"]) => {
    setDeals(prev => prev.map(deal => 
      deal.id === dealId ? { ...deal, status } : deal
    ));

    const updatedDeal = deals.find(deal => deal.id === dealId);
    if (!updatedDeal) return;

    // Create a system message in the chat
    const statusMessages = {
      accepted: "✅ Deal accepted! Let's get started.",
      rejected: "❌ Deal declined. Maybe next time!",
      completed: "🎉 Deal completed successfully!",
      pending: "⏳ Deal status updated to pending."
    };

    const systemMessage: Message = {
      id: Date.now().toString(),
      sender: "them" as const,
      content: statusMessages[status],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
    };

    setMessages(prev => ({
      ...prev,
      [updatedDeal.contactId]: [...(prev[updatedDeal.contactId] || []), systemMessage],
    }));

    // Reward with coins for completed deals
    if (status === 'completed') {
      earnCoins(200);
      toast.success("Deal completed", {
        description: `You earned 200 coins for completing the deal!`,
      });
    }
  };

  // Coin management functions
  const earnCoins = (amount: number) => {
    setUserCoins(prev => prev + amount);
  };

  const spendCoins = (amount: number): boolean => {
    if (userCoins >= amount) {
      setUserCoins(prev => prev - amount);
      return true;
    }
    toast.error("Not enough coins", {
      description: `You need ${amount} coins but only have ${userCoins}.`,
    });
    return false;
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
        markAsRead,
        deals,
        setDeals,
        createDeal,
        updateDealStatus,
        userCoins,
        earnCoins,
        spendCoins
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
