
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Clock, CheckCircle, Coins as CoinsIcon, BanknoteIcon, LockIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useMessages, Deal } from '@/contexts/MessageContext';
import { usePayment } from '@/contexts/PaymentContext';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface DealCardProps {
  deal: Deal;
}

const DealCard = ({ deal }: DealCardProps) => {
  const { updateDealStatus } = useMessages();
  const { createEscrowPayment, releaseEscrowPayment, redeemCoins } = usePayment();
  const { toast } = useToast();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpdateStatus = async (status: Deal['status']) => {
    if (status === 'accepted') {
      setIsPaymentModalOpen(true);
      return;
    }
    
    updateDealStatus(deal.id, status);
    
    if (status === 'rejected') {
      toast({
        title: "Deal Declined",
        description: "You've declined the deal. The brand has been notified.",
        variant: "destructive",
      });
    } else if (status === 'completed') {
      toast({
        title: "Deal Completed",
        description: "Congratulations! Deal marked as completed.",
      });
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    const transactionId = await createEscrowPayment(deal.amount, deal.id);
    setIsProcessing(false);
    
    if (transactionId) {
      updateDealStatus(deal.id, 'accepted');
      setIsPaymentModalOpen(false);
      toast({
        title: "Deal Accepted",
        description: "Payment is held in escrow until the deliverables are completed.",
      });
    }
  };

  const handleReleaseFunds = async () => {
    setIsProcessing(true);
    // In a real app, you would get the transactionId from the database
    // Here we're simulating by using the dealId as the transactionId
    const success = await releaseEscrowPayment(deal.id);
    setIsProcessing(false);
    
    if (success) {
      // The updateDealStatus is handled inside releaseEscrowPayment
      toast({
        title: "Payment Released",
        description: "The influencer has been paid and the deal is now completed.",
      });
    }
  };

  const getStatusBadge = () => {
    switch (deal.status) {
      case 'pending':
        return <Badge variant="outline" className="border-amber-500 text-amber-500"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="border-blue-500 text-blue-500"><LockIcon className="h-3 w-3 mr-1" /> In Escrow</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="border-red-500 text-red-500"><X className="h-3 w-3 mr-1" /> Declined</Badge>;
      case 'completed':
        return <Badge variant="outline" className="border-green-500 text-green-500"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>;
      default:
        return null;
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{deal.title}</CardTitle>
            {getStatusBadge()}
          </div>
          <p className="text-xs text-muted-foreground">
            Created {formatDistanceToNow(new Date(deal.createdAt), { addSuffix: true })}
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{deal.description}</p>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs text-muted-foreground">Budget</span>
              <p className="text-xl font-semibold">${deal.amount}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Reward</span>
              <p className="text-sm font-medium flex items-center">
                <span className="text-amber-500 mr-1">+200</span> coins on completion
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 justify-end border-t pt-4">
          {deal.status === 'pending' && (
            <>
              <Button variant="outline" size="sm" onClick={() => handleUpdateStatus('rejected')}>
                <X className="h-4 w-4 mr-1" /> Decline
              </Button>
              <Button size="sm" onClick={() => handleUpdateStatus('accepted')}>
                <Check className="h-4 w-4 mr-1" /> Accept
              </Button>
            </>
          )}
          {deal.status === 'accepted' && (
            <Button size="sm" onClick={handleReleaseFunds} disabled={isProcessing}>
              <BanknoteIcon className="h-4 w-4 mr-1" /> {isProcessing ? 'Processing...' : 'Release Payment'}
            </Button>
          )}
          {deal.status === 'rejected' && (
            <Button variant="outline" size="sm" onClick={() => handleUpdateStatus('pending')}>
              Reconsider
            </Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Accept Deal & Pay Escrow</DialogTitle>
            <DialogDescription>
              Your payment will be held securely in escrow until you approve the influencer's deliverables.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex justify-between mb-4">
              <span>Deal Amount:</span>
              <span className="font-semibold">${deal.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Platform Fee (5%):</span>
              <span>${(deal.amount * 0.05).toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total:</span>
              <span>${(deal.amount * 1.05).toFixed(2)}</span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentModalOpen(false)} disabled={isProcessing}>
              Cancel
            </Button>
            <Button onClick={handlePayment} disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'Pay Securely'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DealCard;
