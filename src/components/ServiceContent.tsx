
import React, { useState } from 'react';
import QueryForm from '@/components/QueryForm';
import ResponseArea from '@/components/ResponseArea';
import { YouTubeFormData } from '@/components/YouTubeSection';
import { NotionFormData } from '@/components/NotionSection';
import { DiscordFormData } from '@/components/DiscordSection';
import { sendMessageToLyzr } from '@/utils/lyzrApi';
import { useToast } from "@/hooks/use-toast";
import UnifiedStudyForm, { UnifiedStudyData } from '@/components/UnifiedStudyForm';

interface ServiceContentProps {
  isLoading: boolean;
  responseData: any;
  onYouTubeSubmit: (data: YouTubeFormData) => void;
  onNotionSubmit: (data: NotionFormData) => void;
  onDiscordSubmit: (data: DiscordFormData) => void;
  onUnifiedStudySubmit?: (data: UnifiedStudyData) => void;
  onBack: () => void;
  showUnifiedForm?: boolean;
}

const ServiceContent: React.FC<ServiceContentProps> = ({
  isLoading,
  responseData,
  onYouTubeSubmit,
  onNotionSubmit,
  onDiscordSubmit,
  onUnifiedStudySubmit,
  onBack,
  showUnifiedForm = false
}) => {
  const [lyzrLoading, setLyzrLoading] = useState(false);
  const [localResponseData, setLocalResponseData] = useState<any>(null);
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
    } finally {
      setLyzrLoading(false);
    }
  };

  const handleUnifiedStudySubmit = async (data: UnifiedStudyData) => {
    if (!onUnifiedStudySubmit) return;
    
    setLyzrLoading(true);
    
    try {
      toast({
        title: "Processing with Lyzr AI",
        description: `Creating comprehensive study plan for: ${data.topic}`,
      });
      
      const lyzrResponse = await sendMessageToLyzr(
        `Create a comprehensive study plan for: ${data.topic}. Include key concepts, learning resources, and study tips.`
      );
      
      // Process local response for immediate display
      const unifiedResponse = {
        summary: `Study Plan for: ${data.topic}\n\n${lyzrResponse.response}`,
        flashcards: [
          { 
            question: `What is the main concept behind ${data.topic}?`, 
            answer: "Explore the fundamental principles and core ideas." 
          },
          { 
            question: `How can I apply ${data.topic} in real-world scenarios?`, 
            answer: "Look for practical applications and case studies." 
          },
          { 
            question: `What are the key components of ${data.topic}?`, 
            answer: "Break down the subject into its essential elements." 
          }
        ],
        videoTitle: `Padhle AI Study Plan: ${data.topic}`
      };
      
      // Update local state
      setLocalResponseData(unifiedResponse);
      
      // Send to parent
      onUnifiedStudySubmit({
        ...data,
        lyzrEnhanced: true,
        lyzrResponse: lyzrResponse.response
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process with Lyzr AI. Using standard study plan.",
        variant: "destructive",
      });
      
      onUnifiedStudySubmit(data);
    } finally {
      setLyzrLoading(false);
    }
  };

  // Determine which response data to use
  const displayData = localResponseData || responseData;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {showUnifiedForm ? (
          <UnifiedStudyForm onSubmit={handleUnifiedStudySubmit} loading={isLoading || lyzrLoading} />
        ) : (
          <QueryForm 
            onYouTubeSubmit={handleYouTubeSubmit}
            onNotionSubmit={handleNotionSubmit}
            onDiscordSubmit={handleDiscordSubmit}
          />
        )}
        <ResponseArea loading={isLoading || lyzrLoading} data={displayData} />
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
