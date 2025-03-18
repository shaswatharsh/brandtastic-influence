
import { FadeUp } from '@/components/ui/motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="relative py-24 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-brand/10" />
      </div>

      <FadeUp className="container max-w-5xl mx-auto text-center">
        <div className="glass-dark rounded-3xl py-16 px-8 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 max-w-2xl mx-auto">
            Ready to transform your influencer marketing strategy?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of brands and influencers creating authentic partnerships that drive real results.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="group">
              <span>Get started for free</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Schedule a demo
            </Button>
          </div>
        </div>
      </FadeUp>
    </section>
  );
};

export default CallToAction;
