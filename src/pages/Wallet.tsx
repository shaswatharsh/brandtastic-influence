
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FadeUp } from "@/components/ui/motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useMessages } from "@/contexts/MessageContext";
import { usePayment } from "@/contexts/PaymentContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins, CreditCard, ArrowUpRight, Banknote, Gift } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Wallet = () => {
  const { userCoins, earnCoins, spendCoins } = useMessages();
  const { processPayment, redeemCoins } = usePayment();
  
  const [purchaseAmount, setPurchaseAmount] = useState(100);
  const [redeemAmount, setRedeemAmount] = useState(500);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  const handlePurchaseCoins = async () => {
    setIsLoading(true);
    const success = await processPayment(purchaseAmount * 0.01, "coin-purchase");
    if (success) {
      // Calculate coins to add (100 coins per $1)
      const coinsToAdd = purchaseAmount;
      earnCoins(coinsToAdd);
      toast.success(`Successfully purchased ${coinsToAdd} coins!`);
      setIsPurchaseModalOpen(false);
    }
    setIsLoading(false);
  };

  const handleRedeemCoins = async () => {
    setIsLoading(true);
    if (redeemAmount > userCoins) {
      toast.error("You don't have enough coins");
      setIsLoading(false);
      return;
    }
    
    const success = await redeemCoins(redeemAmount);
    if (success) {
      toast.success(`Successfully redeemed ${redeemAmount} coins!`);
      setIsRedeemModalOpen(false);
    }
    setIsLoading(false);
  };

  const transactionHistory = [
    { id: 1, type: 'Purchase', amount: 500, date: '2023-06-15', status: 'Completed' },
    { id: 2, type: 'Reward', amount: 200, date: '2023-06-20', status: 'Completed' },
    { id: 3, type: 'Redemption', amount: -300, date: '2023-06-25', status: 'Completed' },
    { id: 4, type: 'Deal Bonus', amount: 100, date: '2023-07-01', status: 'Completed' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-20 px-6 md:px-10">
        <div className="container max-w-7xl mx-auto">
          <FadeUp>
            <div className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight mb-2">Your Wallet</h1>
              <p className="text-lg text-muted-foreground">
                Manage your coins, payments, and transactions
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <FadeUp delay={100}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-amber-500" />
                    Coin Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{userCoins}</div>
                  <p className="text-muted-foreground text-sm">Available coins</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setIsPurchaseModalOpen(true)}>
                    <CreditCard className="h-4 w-4 mr-2" /> Buy Coins
                  </Button>
                  <Button onClick={() => setIsRedeemModalOpen(true)}>
                    <ArrowUpRight className="h-4 w-4 mr-2" /> Redeem
                  </Button>
                </CardFooter>
              </Card>
            </FadeUp>

            <FadeUp delay={150}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Banknote className="h-5 w-5 text-green-500" />
                    Earnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$1,240.50</div>
                  <p className="text-muted-foreground text-sm">Total earnings</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </FadeUp>

            <FadeUp delay={200}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-purple-500" />
                    Rewards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">5 Available</div>
                  <p className="text-muted-foreground text-sm">Special perks & discounts</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Claim Rewards
                  </Button>
                </CardFooter>
              </Card>
            </FadeUp>
          </div>

          <FadeUp delay={250}>
            <Tabs defaultValue="transactions" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="transactions">Transaction History</TabsTrigger>
                <TabsTrigger value="payments">Payment Methods</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="transactions">
                <Card>
                  <CardHeader>
                    <CardTitle>Transactions</CardTitle>
                    <CardDescription>Your recent coin transactions and payments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-5 bg-muted/50 p-3">
                        <div className="font-medium">Type</div>
                        <div className="font-medium">Amount</div>
                        <div className="font-medium">Date</div>
                        <div className="font-medium">Status</div>
                        <div className="font-medium text-right">Actions</div>
                      </div>
                      {transactionHistory.map((transaction) => (
                        <div key={transaction.id} className="grid grid-cols-5 border-t p-3">
                          <div>{transaction.type}</div>
                          <div className={transaction.amount > 0 ? "text-green-600" : "text-red-600"}>
                            {transaction.amount > 0 ? "+" : ""}{transaction.amount} coins
                          </div>
                          <div>{transaction.date}</div>
                          <div>{transaction.status}</div>
                          <div className="text-right">
                            <Button variant="ghost" size="sm">View</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="payments">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your payment cards and accounts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 rounded-lg border p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            <span className="font-medium">•••• •••• •••• 4242</span>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">Expires 12/25</div>
                        </div>
                        <Badge>Default</Badge>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      <CreditCard className="h-4 w-4 mr-2" /> Add Payment Method
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Wallet Settings</CardTitle>
                    <CardDescription>Configure your payment preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="defaultCurrency">Default Currency</Label>
                      <select
                        id="defaultCurrency"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="payoutThreshold">Automatic Payout Threshold</Label>
                      <Input id="payoutThreshold" type="number" defaultValue={50} min={0} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Save Settings</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </FadeUp>
        </div>
      </main>
      <Footer />

      {/* Purchase Coins Modal */}
      <Dialog open={isPurchaseModalOpen} onOpenChange={setIsPurchaseModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Purchase Coins</DialogTitle>
            <DialogDescription>
              Add coins to your account to use for premium features and rewards.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Label htmlFor="coinAmount" className="mb-2 block">Select amount</Label>
            <div className="flex gap-2 mb-4">
              {[100, 500, 1000, 5000].map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant={purchaseAmount === amount ? "default" : "outline"}
                  onClick={() => setPurchaseAmount(amount)}
                  className="flex-1"
                >
                  {amount}
                </Button>
              ))}
            </div>
            <div className="flex justify-between mb-4">
              <span>Amount:</span>
              <span className="font-semibold">${(purchaseAmount * 0.01).toFixed(2)}</span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPurchaseModalOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handlePurchaseCoins} disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Purchase Coins'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Redeem Coins Modal */}
      <Dialog open={isRedeemModalOpen} onOpenChange={setIsRedeemModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Redeem Coins</DialogTitle>
            <DialogDescription>
              Convert your coins to credit or withdraw as cash.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Label htmlFor="redeemAmount" className="mb-2 block">Coins to redeem</Label>
            <Input
              id="redeemAmount"
              type="number"
              value={redeemAmount}
              onChange={(e) => setRedeemAmount(parseInt(e.target.value) || 0)}
              className="mb-4"
              min={100}
              max={userCoins}
            />
            <div className="flex justify-between mb-4">
              <span>Value:</span>
              <span className="font-semibold">${(redeemAmount * 0.009).toFixed(2)}</span>
            </div>
            <div className="text-sm text-muted-foreground mb-4">
              You currently have {userCoins} coins available to redeem.
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRedeemModalOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleRedeemCoins} disabled={isLoading || redeemAmount > userCoins}>
              {isLoading ? 'Processing...' : 'Redeem Now'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Wallet;
