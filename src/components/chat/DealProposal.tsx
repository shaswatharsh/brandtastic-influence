
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useMessages } from '@/contexts/MessageContext';
import { toast } from 'sonner';
import { FileText, X } from 'lucide-react';

interface DealProposalProps {
  contactId: string;
  onClose: () => void;
}

const DealProposal = ({ contactId, onClose }: DealProposalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const { createDeal, sendMessage } = useMessages();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || !amount.trim() || isNaN(parseFloat(amount))) {
      toast.error('Please fill all fields correctly');
      return;
    }
    
    // Create the deal
    createDeal({
      contactId,
      title: title.trim(),
      description: description.trim(),
      amount: parseFloat(amount),
      status: 'pending'
    });
    
    // Send a message about the deal
    sendMessage(
      contactId, 
      `I've sent you a deal proposal: "${title}" for $${amount}. Please check your deals tab to accept or decline.`
    );
    
    // Reset form and close
    setTitle('');
    setDescription('');
    setAmount('');
    onClose();
    
    toast.success('Deal proposal sent successfully');
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            New Deal Proposal
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Deal Title</Label>
            <Input
              id="title"
              placeholder="e.g. Instagram Post Campaign"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description & Deliverables</Label>
            <Textarea
              id="description"
              placeholder="Clearly describe what's expected, timeline, and any specific requirements"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Budget (USD)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                className="pl-7"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                step="0.01"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Send Deal Proposal</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default DealProposal;
