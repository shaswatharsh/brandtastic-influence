
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FadeUp } from "@/components/ui/motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMessages } from "@/contexts/MessageContext";
import DealCard from "@/components/deals/DealCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const Deals = () => {
  const { deals } = useMessages();
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredDeals = deals.filter(deal => {
    if (activeTab === "all") return true;
    return deal.status === activeTab;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-20 px-6 md:px-10">
        <div className="container max-w-7xl mx-auto">
          <FadeUp>
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">Deals & Contracts</h1>
                <p className="text-lg text-muted-foreground">
                  Manage all your brand collaborations and contracts in one place
                </p>
              </div>
              <Button className="flex-shrink-0">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Deal
              </Button>
            </div>
          </FadeUp>

          <FadeUp delay={100}>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList>
                <TabsTrigger value="all">All Deals</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="accepted">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="rejected">Declined</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDeals.length > 0 ? (
                filteredDeals.map((deal) => (
                  <DealCard key={deal.id} deal={deal} />
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-medium mb-2">No deals found</h3>
                  <p className="text-muted-foreground mb-4">
                    {activeTab === "all" 
                      ? "You don't have any deals yet" 
                      : `You don't have any ${activeTab} deals`}
                  </p>
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create Your First Deal
                  </Button>
                </div>
              )}
            </div>
          </FadeUp>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Deals;
