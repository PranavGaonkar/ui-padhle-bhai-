
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Youtube, BookType, MessageCircle } from 'lucide-react';
import YouTubeSection, { YouTubeFormData } from './YouTubeSection';
import NotionSection, { NotionFormData } from './NotionSection';
import DiscordSection, { DiscordFormData } from './DiscordSection';
import { useToast } from "@/hooks/use-toast";

interface QueryFormProps {
  onYouTubeSubmit: (data: YouTubeFormData) => void;
  onNotionSubmit: (data: NotionFormData) => void;
  onDiscordSubmit: (data: DiscordFormData) => void;
}

const QueryForm: React.FC<QueryFormProps> = ({
  onYouTubeSubmit,
  onNotionSubmit,
  onDiscordSubmit
}) => {
  const [activeTab, setActiveTab] = useState<string>('youtube');
  const { toast } = useToast();

  const handleYouTubeSubmit = (data: YouTubeFormData) => {
    toast({
      title: "YouTube request submitted",
      description: `Searching for: ${data.query}`,
    });
    onYouTubeSubmit(data);
  };

  const handleNotionSubmit = (data: NotionFormData) => {
    toast({
      title: "Notion request submitted",
      description: `Saving ${data.contentType} to ${data.subject}`,
    });
    onNotionSubmit(data);
  };

  const handleDiscordSubmit = (data: DiscordFormData) => {
    toast({
      title: "Discord reminder set up",
      description: `Reminder: ${data.reminderText} (${data.frequency} at ${data.time})`,
    });
    onDiscordSubmit(data);
  };

  return (
    <div className="w-full animate-slide-up">
      <Tabs defaultValue="youtube" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="youtube" className="flex items-center gap-1">
            <Youtube className="h-4 w-4" /> YouTube
          </TabsTrigger>
          <TabsTrigger value="notion" className="flex items-center gap-1">
            <BookType className="h-4 w-4" /> Notion
          </TabsTrigger>
          <TabsTrigger value="discord" className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" /> Discord
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="youtube">
          <YouTubeSection onSubmit={handleYouTubeSubmit} />
        </TabsContent>
        
        <TabsContent value="notion">
          <NotionSection onSubmit={handleNotionSubmit} />
        </TabsContent>
        
        <TabsContent value="discord">
          <DiscordSection onSubmit={handleDiscordSubmit} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QueryForm;
