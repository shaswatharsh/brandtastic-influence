
import { FadeUp } from '@/components/ui/motion';
import { 
  Users, 
  MessageSquare, 
  FileText, 
  CreditCard, 
  Coins, 
  BarChart,
  Search,
  Link as LinkIcon
} from 'lucide-react';

const features = [
  {
    title: 'Influencer Workfolio',
    description:
      'Create a personalized landing page that automatically syncs with your social accounts, showcases your best work, and helps brands discover you.',
    icon: <Users className="h-6 w-6" />,
    color: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
  },
  {
    title: 'Brand Discovery',
    description:
      'Search and filter influencers by niche, followers, engagement rates, and past collaborations to find your perfect match.',
    icon: <Search className="h-6 w-6" />,
    color: 'bg-purple-500/10',
    iconColor: 'text-purple-500',
  },
  {
    title: 'Secure Messaging',
    description:
      'Connect directly with brands or influencers through our secure in-app messaging system to discuss collaborations and opportunities.',
    icon: <MessageSquare className="h-6 w-6" />,
    color: 'bg-green-500/10',
    iconColor: 'text-green-500',
  },
  {
    title: 'Smart Contracts',
    description:
      'Create, send, and sign digital contracts with clear terms, deliverables, and payment schedules all within the platform.',
    icon: <FileText className="h-6 w-6" />,
    color: 'bg-yellow-500/10',
    iconColor: 'text-yellow-500',
  },
  {
    title: 'Campaign Tracking',
    description:
      'Monitor campaign performance in real-time with comprehensive analytics and reporting to measure your ROI.',
    icon: <BarChart className="h-6 w-6" />,
    color: 'bg-rose-500/10',
    iconColor: 'text-rose-500',
  },
  {
    title: 'UTM Link Generation',
    description:
      'Generate unique tracking links for each campaign to accurately measure traffic, conversions, and campaign success.',
    icon: <LinkIcon className="h-6 w-6" />,
    color: 'bg-teal-500/10',
    iconColor: 'text-teal-500',
  },
  {
    title: 'Secure Payments',
    description:
      'Handle all transactions securely through our platform with escrow protection, milestone-based payments, and instant transfers.',
    icon: <CreditCard className="h-6 w-6" />,
    color: 'bg-indigo-500/10',
    iconColor: 'text-indigo-500',
  },
  {
    title: 'Rewards System',
    description:
      'Earn coins for completed deals, referrals, and platform activity that can be redeemed for cashback, perks, and exclusive opportunities.',
    icon: <Coins className="h-6 w-6" />,
    color: 'bg-amber-500/10',
    iconColor: 'text-amber-500',
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-6 md:px-10">
      <div className="container mx-auto max-w-7xl">
        <FadeUp className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Everything you need to create successful collaborations
          </h2>
          <p className="text-lg text-muted-foreground">
            Our platform offers a comprehensive suite of tools designed to streamline the influencer marketing process.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FadeUp key={index} delay={100 * index} className="h-full">
              <div className="h-full border border-border rounded-2xl p-6 hover:border-brand/50 hover:shadow-md transition-all-300 bg-card">
                <div
                  className={`${feature.color} ${feature.iconColor} w-12 h-12 rounded-xl flex items-center justify-center mb-5`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
