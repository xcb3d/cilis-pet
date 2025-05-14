import React, { useState, useEffect } from 'react';

// Import các component riêng lẻ
import SectionDots from '../components/about/SectionDots';
import AboutPageHero from '../components/about/AboutPageHero';
import MissionSection from '../components/about/MissionSection';
import OurStorySection from '../components/about/OurStorySection';
import TeamSection from '../components/about/TeamSection';
import CoreValuesSection from '../components/about/CoreValuesSection';
import ValueInActionSection from '../components/about/ValueInActionSection';
import ContactSection from '../components/about/ContactSection';
import AboutCTA from '../components/about/AboutCTA';

// Main component
const AboutPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sections = ["hero", "mission", "story", "team", "values", "contact", "cta"];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: "-10% 0px -10% 0px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setActiveSection(index);
        }
      });
    }, observerOptions);

    // Set up observers
    document.querySelectorAll('[data-section]').forEach((section, index) => {
      section.dataset.index = index;
      sectionObserver.observe(section);
    });

    return () => {
      document.querySelectorAll('[data-section]').forEach(section => {
        sectionObserver.unobserve(section);
      });
    };
  }, []);

  const scrollToSection = (index) => {
    document.querySelectorAll('[data-section]')[index].scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen relative overflow-hidden">
      {/* Navigation Dots */}
      <SectionDots 
        activeSection={activeSection} 
        sections={sections} 
        onDotClick={scrollToSection} 
      />

      {/* Hero Section */}
      <AboutPageHero />

      {/* Mission Section */}
      <MissionSection />

      {/* Our Story Section */}
      <OurStorySection />

      {/* Team Section */}
      <TeamSection />

      {/* Core Values Section */}
      <div className="relative">
        <CoreValuesSection />
        <div className="max-w-6xl mx-auto px-4">
          <ValueInActionSection />
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />

      {/* CTA Section */}
      <AboutCTA />
    </div>
  );
};

export default AboutPage; 