
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Clock, Bell, Quote } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DiscordSectionProps {
  onSubmit: (data: DiscordFormData) => void;
}

export interface DiscordFormData {
  reminderText: string;
  frequency: 'daily' | 'weekdays' | 'weekly' | 'custom';
  time: string;
  sendQuote: boolean;
  sendProgress: boolean;
  sendNotifications: boolean;
}

const DiscordSection: React.FC<DiscordSectionProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<DiscordFormData>({
    reminderText: '',
    frequency: 'daily',
    time: '19:00',
    sendQuote: true,
    sendProgress: false,
    sendNotifications: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="bg-discord-light rounded-t-lg">
        <CardTitle className="text-discord flex items-center gap-2">
          <MessageCircle className="h-5 w-5" /> Discord Reminders
        </CardTitle>
        <CardDescription>
          Set up study reminders and motivational messages
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="reminderText">Reminder Message</Label>
            <Input 
              id="reminderText"
              name="reminderText"
              placeholder="E.g., 'Revise Python'"
              value={formData.reminderText}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select 
                value={formData.frequency}
                onValueChange={(value) => handleSelectChange('frequency', value)}
              >
                <SelectTrigger id="frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekdays">Weekdays Only</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input 
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Quote className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="sendQuote" className="cursor-pointer">
                  Send motivational quote
                </Label>
              </div>
              <Switch 
                id="sendQuote" 
                checked={formData.sendQuote}
                onCheckedChange={(checked) => handleSwitchChange('sendQuote', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="sendProgress" className="cursor-pointer">
                  Send weekly progress report
                </Label>
              </div>
              <Switch 
                id="sendProgress" 
                checked={formData.sendProgress}
                onCheckedChange={(checked) => handleSwitchChange('sendProgress', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="sendNotifications" className="cursor-pointer">
                  New study material notifications
                </Label>
              </div>
              <Switch 
                id="sendNotifications" 
                checked={formData.sendNotifications}
                onCheckedChange={(checked) => handleSwitchChange('sendNotifications', checked)}
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-discord hover:bg-discord/90">
            Set Up Reminder
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DiscordSection;
