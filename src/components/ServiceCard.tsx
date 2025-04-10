
import React from 'react';
import { cn } from "@/lib/utils";
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  variant: 'youtube' | 'notion' | 'discord';
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon: Icon,
  variant,
  onClick
}) => {
  const cardClasses = {
    youtube: 'youtube-card',
    notion: 'notion-card',
    discord: 'discord-card'
  };

  const iconColors = {
    youtube: 'text-youtube',
    notion: 'text-notion',
    discord: 'text-discord'
  };

  return (
    <div 
      className={cn(cardClasses[variant], "cursor-pointer")}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className={cn("p-3 rounded-full", variant === 'youtube' ? 'bg-youtube-light' : variant === 'notion' ? 'bg-notion-light' : 'bg-discord-light')}>
          <Icon className={cn("h-8 w-8", iconColors[variant])} />
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
