
import { useState } from 'react';
import { WorkfolioCard } from '@/components/influencer/WorkfolioCard';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { FadeUp } from '@/components/ui/motion';

// Mock data for demonstration
const mockInfluencers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    username: 'sarahtravels',
    avatar: '/placeholder.svg',
    bio: 'Travel enthusiast sharing adventures from around the world. Specializing in luxury travel and hidden gems.',
    followers: 125000,
    engagement: 4.8,
    niche: ['Travel', 'Lifestyle', 'Photography'],
    featured: true,
  },
  {
    id: '2',
    name: 'Alex Rodriguez',
    username: 'alexfitness',
    avatar: '/placeholder.svg',
    bio: 'Fitness coach and nutritionist helping you achieve your health goals through sustainable habits.',
    followers: 78000,
    engagement: 5.2,
    niche: ['Fitness', 'Health', 'Nutrition'],
    featured: false,
  },
  {
    id: '3',
    name: 'Emily Chen',
    username: 'emilycooks',
    avatar: '/placeholder.svg',
    bio: 'Food blogger and recipe developer specializing in easy weeknight meals and entertaining.',
    followers: 230000,
    engagement: 3.9,
    niche: ['Food', 'Cooking', 'Recipes'],
    featured: false,
  },
  {
    id: '4',
    name: 'Jordan Lee',
    username: 'jordantech',
    avatar: '/placeholder.svg',
    bio: 'Tech reviewer and gadget enthusiast covering the latest innovations in consumer electronics.',
    followers: 186000,
    engagement: 4.2,
    niche: ['Technology', 'Gadgets', 'Reviews'],
    featured: false,
  },
  {
    id: '5',
    name: 'Zoe Bennett',
    username: 'zoebeauty',
    avatar: '/placeholder.svg',
    bio: 'Beauty expert sharing skincare routines, makeup tutorials, and product reviews.',
    followers: 345000,
    engagement: 5.7,
    niche: ['Beauty', 'Skincare', 'Makeup'],
    featured: true,
  },
  {
    id: '6',
    name: 'Marcus Williams',
    username: 'marcusfashion',
    avatar: '/placeholder.svg',
    bio: 'Fashion stylist and trend forecaster helping you elevate your personal style.',
    followers: 92000,
    engagement: 4.5,
    niche: ['Fashion', 'Style', 'Trends'],
    featured: false,
  },
];

const InfluencerGrid = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [influencers, setInfluencers] = useState(mockInfluencers);

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading more data
    setTimeout(() => {
      setInfluencers([...influencers, ...mockInfluencers]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {influencers.map((influencer, index) => (
          <FadeUp key={influencer.id + index} delay={100 * (index % 6)}>
            <WorkfolioCard
              name={influencer.name}
              username={influencer.username}
              avatar={influencer.avatar}
              bio={influencer.bio}
              followers={influencer.followers}
              engagement={influencer.engagement}
              niche={influencer.niche}
              featured={influencer.featured}
            />
          </FadeUp>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Button
          variant="outline"
          size="lg"
          onClick={handleLoadMore}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            'Load More Influencers'
          )}
        </Button>
      </div>
    </div>
  );
};

export default InfluencerGrid;
