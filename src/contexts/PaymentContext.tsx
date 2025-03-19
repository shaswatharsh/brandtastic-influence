
import React, { createContext, useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useMessages } from './MessageContext';
import { toast } from 'sonner';

// Replace with your actual publishable key when in production
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

type EscrowTransaction = {
  id: string;
  dealId: string;
  amount: number;
  status: 'pending' | 'released' | 'refunded';
  createdAt: string;
};

type PaymentContextType = {
  processPayment: (amount: number, dealId: string) => Promise<boolean>;
  createEscrowPayment: (amount: number, dealId: string) => Promise<string | null>;
  releaseEscrowPayment: (transactionId: string) => Promise<boolean>;
  refundEscrowPayment: (transactionId: string) => Promise<boolean>;
  redeemCoins: (amount: number) => Promise<boolean>;
  paymentStatus: PaymentStatus;
  transactions: EscrowTransaction[];
};

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [transactions, setTransactions] = useState<EscrowTransaction[]>([]);
  const { spendCoins, earnCoins, updateDealStatus } = useMessages();

  const processPayment = async (amount: number, dealId: string): Promise<boolean> => {
    try {
      setPaymentStatus('processing');
      
      // This would typically call a backend API that processes the payment
      // For demo purposes, we're simulating a successful payment after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setPaymentStatus('success');
      toast.success('Payment processed successfully');
      return true;
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      toast.error('Payment failed. Please try again.');
      return false;
    }
  };

  const createEscrowPayment = async (amount: number, dealId: string): Promise<string | null> => {
    try {
      setPaymentStatus('processing');
      
      // Simulate backend API call to create escrow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const transactionId = Date.now().toString();
      const newTransaction: EscrowTransaction = {
        id: transactionId,
        dealId,
        amount,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      
      setTransactions(prev => [...prev, newTransaction]);
      setPaymentStatus('success');
      toast.success('Funds securely held in escrow until deliverables are approved');
      return transactionId;
    } catch (error) {
      console.error('Escrow creation error:', error);
      setPaymentStatus('error');
      toast.error('Failed to create escrow payment. Please try again.');
      return null;
    }
  };

  const releaseEscrowPayment = async (transactionId: string): Promise<boolean> => {
    try {
      setPaymentStatus('processing');
      
      const transaction = transactions.find(t => t.id === transactionId);
      if (!transaction) {
        toast.error('Transaction not found');
        setPaymentStatus('error');
        return false;
      }
      
      // Simulate backend API call to release funds
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTransactions(prev => 
        prev.map(t => t.id === transactionId ? {...t, status: 'released'} : t)
      );
      
      // Mark the associated deal as completed
      updateDealStatus(transaction.dealId, 'completed');
      
      setPaymentStatus('success');
      toast.success('Funds released to influencer');
      return true;
    } catch (error) {
      console.error('Release escrow error:', error);
      setPaymentStatus('error');
      toast.error('Failed to release funds. Please try again.');
      return false;
    }
  };

  const refundEscrowPayment = async (transactionId: string): Promise<boolean> => {
    try {
      setPaymentStatus('processing');
      
      // Simulate backend API call to refund
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTransactions(prev => 
        prev.map(t => t.id === transactionId ? {...t, status: 'refunded'} : t)
      );
      
      setPaymentStatus('success');
      toast.success('Funds refunded to brand');
      return true;
    } catch (error) {
      console.error('Refund escrow error:', error);
      setPaymentStatus('error');
      toast.error('Failed to process refund. Please try again.');
      return false;
    }
  };

  const redeemCoins = async (amount: number): Promise<boolean> => {
    if (spendCoins(amount)) {
      toast.success(`Redeemed ${amount} coins`);
      return true;
    }
    return false;
  };

  return (
    <PaymentContext.Provider
      value={{
        processPayment,
        createEscrowPayment,
        releaseEscrowPayment,
        refundEscrowPayment,
        redeemCoins,
        paymentStatus,
        transactions,
      }}
    >
      <Elements stripe={stripePromise}>
        {children}
      </Elements>
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};
