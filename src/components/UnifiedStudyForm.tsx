
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Youtube, BookType, MessageCircle, Sparkles } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface UnifiedStudyFormProps {
  onSubmit: (data: UnifiedStudyData) => void;
  loading: boolean;
}

export interface UnifiedStudyData {
  topic: string;
  youtubeEnabled: boolean;
  notionEnabled: boolean;
  discordEnabled: boolean;
  createFlashcards: boolean;
  sendReminders: boolean;
  lyzrEnhanced?: boolean;
  lyzrResponse?: string;
}

const UnifiedStudyForm: React.FC<UnifiedStudyFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<UnifiedStudyData>({
    topic: '',
    youtubeEnabled: true,
    notionEnabled: true,
    discordEnabled: true,
    createFlashcards: true,
    sendReminders: true
  });
  
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.topic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a study topic",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.youtubeEnabled && !formData.notionEnabled && !formData.discordEnabled) {
      toast({
        title: "Service required",
        description: "Please enable at least one service",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-purple to-purple-dark rounded-t-lg">
        <CardTitle className="text-white flex items-center gap-2">
          <Sparkles className="h-5 w-5" /> Padhle AI Study Assistant
        </CardTitle>
        <CardDescription className="text-white/80">
          Enter a topic to create your complete study plan
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="topic" className="text-lg font-medium">What would you like to study?</Label>
            <Input 
              id="topic"
              name="topic"
              placeholder="Enter a topic, concept, or skill you want to learn"
              value={formData.topic}
              onChange={handleChange}
              required
              className="text-lg py-6"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="flex items-center space-x-2 p-3 rounded-lg border">
              <div className="flex items-center space-x-2 flex-1">
                <Youtube className="h-5 w-5 text-youtube" />
                <Label htmlFor="youtubeEnabled" className="cursor-pointer">YouTube Videos</Label>
              </div>
              <Switch 
                id="youtubeEnabled" 
                checked={formData.youtubeEnabled}
                onCheckedChange={(checked) => handleSwitchChange('youtubeEnabled', checked)}
              />
            </div>
            
            <div className="flex items-center space-x-2 p-3 rounded-lg border">
              <div className="flex items-center space-x-2 flex-1">
                <BookType className="h-5 w-5 text-notion" />
                <Label htmlFor="notionEnabled" className="cursor-pointer">Notion Notes</Label>
              </div>
              <Switch 
                id="notionEnabled" 
                checked={formData.notionEnabled}
                onCheckedChange={(checked) => handleSwitchChange('notionEnabled', checked)}
              />
            </div>
            
            <div className="flex items-center space-x-2 p-3 rounded-lg border">
              <div className="flex items-center space-x-2 flex-1">
                <MessageCircle className="h-5 w-5 text-discord" />
                <Label htmlFor="discordEnabled" className="cursor-pointer">Discord Reminders</Label>
              </div>
              <Switch 
                id="discordEnabled" 
                checked={formData.discordEnabled}
                onCheckedChange={(checked) => handleSwitchChange('discordEnabled', checked)}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-3 pt-2">
            <div className="flex items-center space-x-2">
              <Switch 
                id="createFlashcards" 
                checked={formData.createFlashcards}
                onCheckedChange={(checked) => handleSwitchChange('createFlashcards', checked)}
              />
              <Label htmlFor="createFlashcards" className="cursor-pointer">
                Create flashcards from the content
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="sendReminders" 
                checked={formData.sendReminders}
                onCheckedChange={(checked) => handleSwitchChange('sendReminders', checked)}
              />
              <Label htmlFor="sendReminders" className="cursor-pointer">
                Set up study reminders (daily at 7 PM)
              </Label>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple to-purple-dark hover:from-purple-dark hover:to-purple text-white py-6 text-lg"
            disabled={loading}
          >
            {loading ? "Processing..." : "Create My Study Plan"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UnifiedStudyForm;
