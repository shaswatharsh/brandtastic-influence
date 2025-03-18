
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Clock, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useMessages, Deal } from '@/contexts/MessageContext';
import { useToast } from '@/hooks/use-toast';

interface DealCardProps {
  deal: Deal;
}

const DealCard = ({ deal }: DealCardProps) => {
  const { updateDealStatus, earnCoins } = useMessages();
  const { toast } = useToast();

  const handleUpdateStatus = (status: Deal['status']) => {
    updateDealStatus(deal.id, status);
    
    if (status === 'accepted') {
      toast({
        title: "Deal Accepted",
        description: "You've accepted the deal. Get started on the deliverables!",
      });
    } else if (status === 'rejected') {
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

  const getStatusBadge = () => {
    switch (deal.status) {
      case 'pending':
        return <Badge variant="outline" className="border-amber-500 text-amber-500"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="border-blue-500 text-blue-500"><Clock className="h-3 w-3 mr-1" /> In Progress</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="border-red-500 text-red-500"><X className="h-3 w-3 mr-1" /> Declined</Badge>;
      case 'completed':
        return <Badge variant="outline" className="border-green-500 text-green-500"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>;
      default:
        return null;
    }
  };

  return (
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
          <Button size="sm" onClick={() => handleUpdateStatus('completed')}>
            <CheckCircle className="h-4 w-4 mr-1" /> Mark as Completed
          </Button>
        )}
        {deal.status === 'rejected' && (
          <Button variant="outline" size="sm" onClick={() => handleUpdateStatus('pending')}>
            Reconsider
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default DealCard;
