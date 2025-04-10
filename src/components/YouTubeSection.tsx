
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Clock, List, BookOpen } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface YouTubeSectionProps {
  onSubmit: (data: YouTubeFormData) => void;
}

export interface YouTubeFormData {
  query: string;
  maxDuration: string;
  summarize: boolean;
  createFlashcards: boolean;
}

const YouTubeSection: React.FC<YouTubeSectionProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<YouTubeFormData>({
    query: '',
    maxDuration: '20',
    summarize: true,
    createFlashcards: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      maxDuration: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="bg-youtube-light rounded-t-lg">
        <CardTitle className="text-youtube flex items-center gap-2">
          <Search className="h-5 w-5" /> YouTube Learning Assistant
        </CardTitle>
        <CardDescription>
          Find and summarize educational videos on any topic
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="query">What would you like to learn?</Label>
            <Input 
              id="query"
              name="query"
              placeholder="E.g., 'Find me a short video on Gauss Elimination'"
              value={formData.query}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Preferred video length</Label>
            <RadioGroup 
              defaultValue={formData.maxDuration}
              onValueChange={handleRadioChange}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="10" id="under10" />
                <Label htmlFor="under10" className="font-normal cursor-pointer flex items-center gap-1">
                  <Clock className="h-4 w-4" /> Under 10 mins
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="20" id="under20" />
                <Label htmlFor="under20" className="font-normal cursor-pointer flex items-center gap-1">
                  <Clock className="h-4 w-4" /> Under 20 mins
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="any" id="anyLength" />
                <Label htmlFor="anyLength" className="font-normal cursor-pointer flex items-center gap-1">
                  <Clock className="h-4 w-4" /> Any length
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="summarize" 
                name="summarize"
                checked={formData.summarize}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, summarize: checked as boolean }))
                }
              />
              <Label htmlFor="summarize" className="font-normal cursor-pointer flex items-center gap-1">
                <List className="h-4 w-4" /> Summarize key points
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="createFlashcards" 
                name="createFlashcards"
                checked={formData.createFlashcards}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, createFlashcards: checked as boolean }))
                }
              />
              <Label htmlFor="createFlashcards" className="font-normal cursor-pointer flex items-center gap-1">
                <BookOpen className="h-4 w-4" /> Create flashcards
              </Label>
            </div>
          </div>

          <Button type="submit" className="w-full bg-youtube hover:bg-youtube/90">
            Search Videos
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default YouTubeSection;
