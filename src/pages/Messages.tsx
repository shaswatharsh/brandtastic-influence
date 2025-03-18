
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FadeUp } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatHeader from "@/components/chat/ChatHeader";
import MessageList from "@/components/chat/MessageList";
import ContactList from "@/components/chat/ContactList";
import { useMessages } from "@/contexts/MessageContext";
import { 
  Send, 
  PaperclipIcon, 
  Image, 
  Smile, 
} from "lucide-react";

const Messages = () => {
  const { 
    activeContact, 
    setActiveContact, 
    messages, 
    sendMessage, 
    contacts,
    markAsRead
  } = useMessages();
  
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeContact]);

  // Mark messages as read when active contact changes
  useEffect(() => {
    if (activeContact) {
      markAsRead(activeContact.id);
    }
  }, [activeContact, markAsRead]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeContact && newMessage.trim()) {
      sendMessage(activeContact.id, newMessage);
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
              <ContactList 
                contacts={filteredContacts}
                activeContact={activeContact}
                setActiveContact={setActiveContact}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              {/* Chat area */}
              <div className="md:col-span-3 flex flex-col h-full">
                {activeContact ? (
                  <>
                    <ChatHeader contact={activeContact} />
                    
                    {/* Messages */}
                    <MessageList 
                      messages={messages[activeContact.id] || []}
                      messagesEndRef={messagesEndRef}
                    />

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
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <h3 className="text-xl font-medium mb-2">Select a conversation</h3>
                      <p className="text-muted-foreground">
                        Choose a contact to start messaging
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </FadeUp>
        </div>
      </main>
    </div>
  );
};

export default Messages;
