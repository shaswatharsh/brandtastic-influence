
import { FadeUp } from '@/components/ui/motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    content:
      "BrandSync transformed our influencer marketing strategy. We've been able to discover creators who perfectly align with our brand values and track ROI like never before.",
    author: 'Sarah Johnson',
    role: 'Marketing Director at Fashion Brand',
    rating: 5,
    image: '/placeholder.svg',
  },
  {
    content:
      "As an influencer, BrandSync has become my go-to platform for finding genuine collaborations. The workfolio feature helps me showcase my best work and connect with brands I truly believe in.",
    author: 'Michael Rodriguez',
    role: 'Lifestyle Content Creator',
    rating: 5,
    image: '/placeholder.svg',
  },
  {
    content:
      "The streamlined contract and payment system has eliminated so many headaches. We can focus on creating great campaigns instead of getting bogged down in paperwork and follow-ups.",
    author: 'Alex Chen',
    role: 'Brand Partnerships Lead at Tech Company',
    rating: 5,
    image: '/placeholder.svg',
  },
  {
    content:
      "I've tripled my collaboration rate since joining BrandSync. The platform makes it easy for brands to find me and see the value I can bring to their campaigns.",
    author: 'Emma Porter',
    role: 'Beauty & Wellness Creator',
    rating: 5,
    image: '/placeholder.svg',
  },
];

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-24 px-6 md:px-10">
      <div className="container mx-auto max-w-7xl">
        <FadeUp className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Trusted by creators and brands
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our users are saying about their experience with BrandSync.
          </p>
        </FadeUp>

        <div className="relative">
          <div className="overflow-hidden px-4 sm:px-6">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-4 md:px-8"
                >
                  <div className="bg-card border border-border p-8 rounded-2xl max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-secondary flex-shrink-0">
                        <img
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex mb-4">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-brand text-brand" />
                          ))}
                        </div>
                        <blockquote className="text-lg md:text-xl font-medium italic mb-6">
                          "{testimonial.content}"
                        </blockquote>
                        <div>
                          <p className="font-semibold">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    currentTestimonial === index ? 'bg-brand' : 'bg-muted'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
