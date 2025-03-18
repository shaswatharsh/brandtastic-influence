
import { Link } from 'react-router-dom';
import { FadeUp } from '../ui/motion';
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  ArrowRight,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border pt-16 pb-8 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-full bg-brand flex items-center justify-center">
                  <span className="text-white font-semibold">B</span>
                </div>
                <span className="font-semibold text-lg">BrandSync</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Connecting brands and influencers for authentic collaborations that drive real results.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-base mb-6">Marketplace</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/discover" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Find Influencers
                  </Link>
                </li>
                <li>
                  <Link to="/workfolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Create Workfolio
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Brand Deals
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-base mb-6">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Press
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-medium text-base mb-4">Subscribe to our Newsletter</h4>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Your email"
                    className="pl-10 h-10"
                  />
                </div>
                <Button size="sm" className="h-10">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </div>
        </FadeUp>

        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} BrandSync. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
