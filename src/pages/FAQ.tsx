import { useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { Section, SectionHeader, useScrollReveal } from '../components/ui';
import { getWhatsAppUrl, getPhoneUrl } from '../data';
import { usePublicStore } from '../data/publicStore';
import SEO from '../components/SEO';

const categories = ['All', 'Products', 'Brands', 'Orders', 'Store', 'Delivery', 'Warranty', 'Returns', 'Services'];

export default function FAQ() {
  const { faqs } = usePublicStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const revealRef = useScrollReveal<HTMLDivElement>();

  const filteredFaqs = activeCategory === 'All'
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFaq = (id: string) => {
    setOpenFaqId(prev => (prev === id ? null : id));
  };

  // Build Generative Engine Optimization (GEO) FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-dark-0 text-white">
      <SEO 
        title="Electrical Products FAQ | Sai Enterprises Rourkela"
        description="Find answers to common questions about electrical products, brands, availability, wholesale pricing, and delivery at Sai Enterprises."
        jsonLd={faqSchema}
      />
      <Section id="faq-header" className="pt-12 pb-8">
        <SectionHeader 
          label="Help Center" 
          title="Frequently Asked Questions" 
          subtitle="Find answers to common questions about our products, services, and policies." 
        />
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8 animate-stagger" ref={revealRef}>
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-volt text-dark-0 shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                  : 'bg-dark-2 text-gray-300 hover:bg-dark-3 hover:text-white border border-dark-3'
              }`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {cat}
            </button>
          ))}
        </div>
      </Section>

      <Section id="faq-content" className="py-8">
        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className={`scout-faq-item ${isOpen ? 'active' : ''}`}
                >
                  <div 
                    className="faq-header"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <span className="faq-num">{idx + 1}</span>
                    <span className="text-base sm:text-lg font-bold text-white flex-1">{faq.question}</span>
                    <span className="faq-toggle-icon flex-shrink-0 text-xl font-light">
                      {isOpen ? '×' : '+'}
                    </span>
                  </div>
                  {isOpen && (
                    <div className="faq-body">
                      <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-slate-300 glass-card rounded-3xl">
              No FAQs found for this category.
            </div>
          )}
        </div>
      </Section>

      <Section id="faq-cta" className="py-12">
        <div className="max-w-2xl mx-auto liquid-glass rounded-3xl p-10 text-center relative overflow-hidden border border-white/15 shadow-2xl">
          <div className="orb orb-volt top-0 right-0 opacity-20"></div>
          <div className="orb orb-blue bottom-0 left-0 opacity-20"></div>
          
          <h3 className="text-2xl font-extrabold text-white mb-4 relative z-10">Still have questions?</h3>
          <p className="text-slate-300 mb-8 relative z-10 font-normal">
            Can't find the answer you're looking for? Our team is ready to help you with any inquiries.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <a 
              href={getWhatsAppUrl("Hi, I have a question not answered in the FAQ.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full sm:w-auto py-3.5 px-8 rounded-full font-bold shadow-xl flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
            <a 
              href={getPhoneUrl()}
              className="btn-secondary w-full sm:w-auto py-3.5 px-8 rounded-full font-bold text-white border border-white/10 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5 text-volt" />
              Call Us
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}
