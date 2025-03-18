
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Discover', path: '/discover' },
    { name: 'Workfolio', path: '/workfolio' },
    { name: 'Messages', path: '/messages' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-10 transition-all-300',
        isScrolled ? 'glass-dark bg-opacity-80 backdrop-blur-md py-3' : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-brand flex items-center justify-center">
            <span className="text-white font-semibold">B</span>
          </div>
          <span className="font-semibold text-lg hidden sm:block">BrandSync</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all-200',
                isActive(link.path)
                  ? 'text-primary-foreground bg-primary'
                  : 'text-foreground/80 hover:text-foreground hover:bg-secondary'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
          <Button size="sm" className="group">
            Get Started
            <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border py-4 px-6 flex flex-col gap-2 md:hidden animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'px-4 py-3 rounded-md text-sm font-medium transition-all-200',
                isActive(link.path)
                  ? 'text-primary-foreground bg-primary'
                  : 'text-foreground/80 hover:text-foreground hover:bg-secondary'
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-4">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm">Get Started</Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
