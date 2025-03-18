
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  Filter, 
  X, 
  ArrowUpDown, 
  Check 
} from 'lucide-react';

const niches = [
  'Beauty', 'Fashion', 'Fitness', 'Food', 'Gaming', 'Health', 'Lifestyle',
  'Music', 'Photography', 'Technology', 'Travel', 'Finance', 'Education',
  'Entertainment', 'Business', 'Art', 'DIY', 'Parenting', 'Pets', 'Sports'
];

interface FilterState {
  followers: [number, number];
  engagement: [number, number];
  selectedNiches: string[];
  sortBy: string;
}

export function SearchFilter({ onFilter }: { onFilter?: (filters: any) => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  
  const [filters, setFilters] = useState<FilterState>({
    followers: [0, 1000000],
    engagement: [0, 10],
    selectedNiches: [],
    sortBy: 'relevance',
  });
  
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  const toggleNiche = (niche: string) => {
    if (filters.selectedNiches.includes(niche)) {
      handleFilterChange(
        'selectedNiches',
        filters.selectedNiches.filter(n => n !== niche)
      );
    } else {
      handleFilterChange('selectedNiches', [...filters.selectedNiches, niche]);
    }
  };

  const clearFilters = () => {
    setFilters({
      followers: [0, 1000000],
      engagement: [0, 10],
      selectedNiches: [],
      sortBy: 'relevance',
    });
  };

  const applyFilters = () => {
    if (onFilter) {
      onFilter({
        search: debouncedSearchTerm,
        ...filters,
      });
    }
  };

  // Format follower count for display
  const formatFollowers = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toString();
  };

  return (
    <div className="space-y-4 mb-8">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name, username, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button 
          variant="outline" 
          onClick={() => setShowFilters(!showFilters)}
          className="sm:w-auto w-full justify-between"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {filters.selectedNiches.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {filters.selectedNiches.length}
            </Badge>
          )}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="sm:w-auto w-full justify-between">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={filters.sortBy === 'relevance'}
              onCheckedChange={() => handleFilterChange('sortBy', 'relevance')}
            >
              Relevance
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.sortBy === 'followersHigh'}
              onCheckedChange={() => handleFilterChange('sortBy', 'followersHigh')}
            >
              Followers (High to Low)
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.sortBy === 'followersLow'}
              onCheckedChange={() => handleFilterChange('sortBy', 'followersLow')}
            >
              Followers (Low to High)
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.sortBy === 'engagementHigh'}
              onCheckedChange={() => handleFilterChange('sortBy', 'engagementHigh')}
            >
              Engagement (High to Low)
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {showFilters && (
        <div className="bg-card p-6 rounded-xl border border-border animate-fade-in space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Followers</h3>
                <p className="text-sm text-muted-foreground">
                  {formatFollowers(filters.followers[0])} - {formatFollowers(filters.followers[1])}
                </p>
              </div>
              <Slider
                defaultValue={filters.followers}
                min={0}
                max={1000000}
                step={10000}
                value={filters.followers}
                onValueChange={(value) => handleFilterChange('followers', value)}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Engagement Rate</h3>
                <p className="text-sm text-muted-foreground">
                  {filters.engagement[0]}% - {filters.engagement[1]}%
                </p>
              </div>
              <Slider
                defaultValue={filters.engagement}
                min={0}
                max={10}
                step={0.1}
                value={filters.engagement}
                onValueChange={(value) => handleFilterChange('engagement', value)}
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Niches</h3>
            <div className="flex flex-wrap gap-2">
              {niches.map((niche) => (
                <Badge
                  key={niche}
                  variant={filters.selectedNiches.includes(niche) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleNiche(niche)}
                >
                  {filters.selectedNiches.includes(niche) && (
                    <Check className="mr-1 h-3 w-3" />
                  )}
                  {niche}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
            <Button size="sm" onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchFilter;
