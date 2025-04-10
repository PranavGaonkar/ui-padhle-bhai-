
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookType, Table2, FolderTree, Sparkles } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NotionSectionProps {
  onSubmit: (data: NotionFormData) => void;
}

export interface NotionFormData {
  content: string;
  contentType: 'flashcards' | 'notes' | 'summary' | 'tracker';
  subject: string;
  path: string;
}

const NotionSection: React.FC<NotionSectionProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<NotionFormData>({
    content: '',
    contentType: 'notes',
    subject: '',
    path: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="bg-notion-light rounded-t-lg">
        <CardTitle className="text-notion flex items-center gap-2">
          <BookType className="h-5 w-5" /> Notion Storage
        </CardTitle>
        <CardDescription>
          Save and organize your learning materials
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="contentType">What would you like to save?</Label>
            <Select 
              value={formData.contentType}
              onValueChange={(value) => handleSelectChange('contentType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flashcards">Flashcards</SelectItem>
                <SelectItem value="notes">Study Notes</SelectItem>
                <SelectItem value="summary">Video Summary</SelectItem>
                <SelectItem value="tracker">Progress Tracker</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea 
              id="content"
              name="content"
              placeholder="Enter or paste the content you want to save..."
              value={formData.content}
              onChange={handleChange}
              required
              className="min-h-[150px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input 
                id="subject"
                name="subject"
                placeholder="E.g., Physics, Math, Programming"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="path">Path (optional)</Label>
              <Input 
                id="path"
                name="path"
                placeholder="E.g., Module 2 > Chapter 3"
                value={formData.path}
                onChange={handleChange}
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-notion hover:bg-notion/90 text-white">
            Save to Notion
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NotionSection;
