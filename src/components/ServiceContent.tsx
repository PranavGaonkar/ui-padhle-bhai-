import React, { useState } from 'react';
import QueryForm from '@/components/QueryForm';
import ResponseArea from '@/components/ResponseArea';
import { YouTubeFormData } from '@/components/YouTubeSection';
import { NotionFormData } from '@/components/NotionSection';
import { DiscordFormData } from '@/components/DiscordSection';
import { sendMessageToLyzr } from '@/utils/lyzrApi';
import { useToast } from "@/hooks/use-toast";

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
  const [lyzrLoading, setLyzrLoading] = useState(false);
  const { toast } = useToast();

  const handleYouTubeSubmit = async (data: YouTubeFormData) => {
    setLyzrLoading(true);
    
    try {
      toast({
        title: "Processing with Lyzr AI",
        description: `Analyzing YouTube query: ${data.query}`,
      });
      
      // Process the query through Lyzr API
      const lyzrResponse = await sendMessageToLyzr(`Find YouTube videos about: ${data.query}`);
      
      // Pass the enriched data to the parent handler
      const enrichedData: YouTubeFormData = {
        ...data,
        lyzrResponse: lyzrResponse.response
      };
      
      onYouTubeSubmit(enrichedData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process with Lyzr AI. Falling back to standard processing.",
        variant: "destructive",
      });
      
      // Fall back to standard processing
      onYouTubeSubmit(data);
    } finally {
      setLyzrLoading(false);
    }
  };

  const handleNotionSubmit = async (data: NotionFormData) => {
    setLyzrLoading(true);
    
    try {
      toast({
        title: "Processing with Lyzr AI",
        description: `Enhancing ${data.contentType} for ${data.subject}`,
      });
      
      const lyzrResponse = await sendMessageToLyzr(`Generate ${data.contentType} about ${data.subject}: ${data.content}`);
      
      // Pass the enriched data to the parent handler
      onNotionSubmit({
        ...data,
        content: data.content + "\n\nEnhanced by Lyzr AI:\n" + lyzrResponse.response
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process with Lyzr AI. Using original content.",
        variant: "destructive",
      });
      
      onNotionSubmit(data);
    } finally {
      setLyzrLoading(false);
    }
  };

  const handleDiscordSubmit = async (data: DiscordFormData) => {
    setLyzrLoading(true);
    
    try {
      toast({
        title: "Processing with Lyzr AI",
        description: `Optimizing your reminder: ${data.reminderText}`,
      });
      
      const lyzrResponse = await sendMessageToLyzr(`Improve this study reminder and add tips: ${data.reminderText}`);
      
      // Pass the enriched data to the parent handler
      onDiscordSubmit({
        ...data,
        reminderText: data.reminderText + "\n\nLyzr AI Tips: " + lyzrResponse.response
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process with Lyzr AI. Using original reminder.",
        variant: "destructive",
      });
      
      onDiscordSubmit(data);
    } finally {
      setLyzrLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <QueryForm 
          onYouTubeSubmit={handleYouTubeSubmit}
          onNotionSubmit={handleNotionSubmit}
          onDiscordSubmit={handleDiscordSubmit}
        />
        <ResponseArea loading={isLoading || lyzrLoading} data={responseData} />
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
