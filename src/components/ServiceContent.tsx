
import React from 'react';
import QueryForm from '@/components/QueryForm';
import ResponseArea from '@/components/ResponseArea';
import { YouTubeFormData } from '@/components/YouTubeSection';
import { NotionFormData } from '@/components/NotionSection';
import { DiscordFormData } from '@/components/DiscordSection';

interface ServiceContentProps {
  isLoading: boolean;
  responseData: any;
  onYouTubeSubmit: (data: YouTubeFormData) => void;
  onNotionSubmit: (data: NotionFormData) => void;
  onDiscordSubmit: (data: DiscordFormData) => void;
  onBack: () => void;
}

const ServiceContent: React.FC<ServiceContentProps> = ({
  isLoading,
  responseData,
  onYouTubeSubmit,
  onNotionSubmit,
  onDiscordSubmit,
  onBack
}) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <QueryForm 
          onYouTubeSubmit={onYouTubeSubmit}
          onNotionSubmit={onNotionSubmit}
          onDiscordSubmit={onDiscordSubmit}
        />
        <ResponseArea loading={isLoading} data={responseData} />
      </div>
      
      <div className="text-center">
        <button 
          onClick={onBack} 
          className="text-sm text-muted-foreground hover:text-purple transition-colors"
        >
          &larr; Back to all services
        </button>
      </div>
    </>
  );
};

export default ServiceContent;
