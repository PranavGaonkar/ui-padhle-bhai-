
import React from 'react';
import { Youtube, BookType, MessageCircle } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';

interface ServiceSelectionProps {
  onServiceSelect: (service: string) => void;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ onServiceSelect }) => {
  return (
    <>
      <div className="flex justify-center mb-6">
        <div className="relative">
          <hr className="absolute top-1/2 w-full border-t border-gray-200" />
          <span className="relative bg-background px-4 text-sm text-muted-foreground">
            Or choose a specific service
          </span>
        </div>
      </div>
      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in">
        <ServiceCard 
          title="YouTube Learning"
          description="Find and summarize educational videos on any topic"
          icon={Youtube}
          variant="youtube"
          onClick={() => onServiceSelect('youtube')}
        />
        <ServiceCard 
          title="Notion Storage"
          description="Save summaries, flashcards, and study plans to Notion"
          icon={BookType}
          variant="notion"
          onClick={() => onServiceSelect('notion')}
        />
        <ServiceCard 
          title="Discord Reminders"
          description="Set up study reminders and motivational messages"
          icon={MessageCircle}
          variant="discord"
          onClick={() => onServiceSelect('discord')}
        />
      </section>
    </>
  );
};

export default ServiceSelection;
