
import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ServiceSelection from '@/components/ServiceSelection';
import ServiceContent from '@/components/ServiceContent';
import Footer from '@/components/Footer';
import UnifiedStudyForm, { UnifiedStudyData } from '@/components/UnifiedStudyForm';
import { YouTubeFormData } from '@/components/YouTubeSection';
import { NotionFormData } from '@/components/NotionSection';
import { DiscordFormData } from '@/components/DiscordSection';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState<any>(null);
  const [showUnifiedForm, setShowUnifiedForm] = useState(true);
  const { toast } = useToast();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleServiceSelect = (service: string) => {
    setActiveService(service);
    setShowUnifiedForm(false);
  };

  const simulateApiCall = (delay: number = 1500) => {
    setIsLoading(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        resolve();
      }, delay);
    });
  };

  const handleYouTubeSubmit = async (data: YouTubeFormData) => {
    await simulateApiCall();
    
    setResponseData({
      summary: "This video explains the Gaussian Elimination method for solving systems of linear equations.\n\n• Gaussian Elimination transforms a system of linear equations into row echelon form\n• The method uses elementary row operations: scaling, swapping, and adding rows\n• Key steps include: creating a matrix, applying row operations to get upper triangular form, and back-substitution\n• The video demonstrates the process with a 3x3 system of equations\n• Time complexity is O(n³) where n is the number of variables/equations",
      flashcards: [
        {
          question: "What is Gaussian Elimination used for?",
          answer: "Solving systems of linear equations by transforming them into row echelon form."
        },
        {
          question: "What are the elementary row operations used in Gaussian Elimination?",
          answer: "Scaling rows, swapping rows, and adding/subtracting rows from each other."
        },
        {
          question: "What is the time complexity of Gaussian Elimination?",
          answer: "O(n³) where n is the number of variables/equations."
        }
      ],
      videoUrl: "https://www.youtube.com/watch?v=example",
      videoTitle: "Gaussian Elimination Explained Simply",
      duration: "14:22"
    });
  };

  const handleNotionSubmit = async (data: NotionFormData) => {
    await simulateApiCall();
    
    setResponseData({
      summary: data.content,
      flashcards: data.contentType === 'flashcards' ? [
        { question: "Sample Question 1", answer: "Sample Answer 1" },
        { question: "Sample Question 2", answer: "Sample Answer 2" }
      ] : [],
      videoTitle: `${data.contentType} saved to Notion`,
    });
  };

  const handleDiscordSubmit = async (data: DiscordFormData) => {
    await simulateApiCall();
    
    setResponseData({
      summary: `Your reminder "${data.reminderText}" has been set for ${data.frequency} at ${data.time}.`,
      videoTitle: "Discord Reminder Configured",
    });
  };

  const handleUnifiedSubmit = async (data: UnifiedStudyData) => {
    setIsLoading(true);
    toast({
      title: "Processing study plan",
      description: `Creating a comprehensive plan for: ${data.topic}`,
    });
    
    await simulateApiCall(3000);
    
    // Create a response that will be shown immediately
    const unifiedResponse = {
      summary: `Study Plan for: ${data.topic}\n\n`,
      flashcards: [],
      sections: [],
      videoTitle: `Padhle AI Study Plan: ${data.topic}`
    };
    
    if (data.youtubeEnabled) {
      unifiedResponse.summary += `• YouTube: Found 3 educational videos on ${data.topic}\n`;
      unifiedResponse.summary += `• Key concepts extracted and summarized\n`;
      unifiedResponse.sections.push({
        title: "YouTube Learning",
        content: `Top video: "${data.topic} Explained" (15:42)`
      });
    }
    
    if (data.notionEnabled) {
      unifiedResponse.summary += `• Notion: Created comprehensive notes on ${data.topic}\n`;
      unifiedResponse.summary += `• Organized in your ${data.topic} study folder\n`;
      unifiedResponse.sections.push({
        title: "Notion Storage",
        content: `Study notes saved to "Study Materials/${data.topic}"`
      });
    }
    
    if (data.discordEnabled) {
      unifiedResponse.summary += `• Discord: Set up daily reminders to study ${data.topic}\n`;
      unifiedResponse.summary += `• Will send notifications at 7:00 PM\n`;
      unifiedResponse.sections.push({
        title: "Discord Reminders",
        content: `Daily reminder: "Time to study ${data.topic}!" at 7:00 PM`
      });
    }
    
    if (data.createFlashcards) {
      unifiedResponse.summary += `• Created 5 flashcards to test your knowledge\n`;
      unifiedResponse.flashcards = [
        { question: `What is the main concept behind ${data.topic}?`, answer: "This would be filled with real content from an AI response" },
        { question: `How is ${data.topic} applied in real-world scenarios?`, answer: "This would be filled with real content from an AI response" },
        { question: `What are the key components of ${data.topic}?`, answer: "This would be filled with real content from an AI response" }
      ];
    }
    
    // Set response data to display in the UI
    setResponseData(unifiedResponse);
    
    setIsLoading(false);
    
    toast({
      title: "Study plan created!",
      description: `Your comprehensive plan for ${data.topic} is ready`,
    });
  };

  return (
    <div className={`min-h-screen flex flex-col bg-background ${isDarkMode ? 'dark' : ''}`}>
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {!activeService ? (
          <>
            <Hero />
            
            <div className="mb-12 animate-fade-in">
              <UnifiedStudyForm onSubmit={handleUnifiedSubmit} loading={isLoading} />
            </div>
            
            <ServiceSelection onServiceSelect={handleServiceSelect} />
          </>
        ) : (
          <ServiceContent 
            isLoading={isLoading}
            responseData={responseData}
            onYouTubeSubmit={handleYouTubeSubmit}
            onNotionSubmit={handleNotionSubmit}
            onDiscordSubmit={handleDiscordSubmit}
            onUnifiedStudySubmit={handleUnifiedSubmit}
            onBack={() => setActiveService(null)}
            showUnifiedForm={showUnifiedForm}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
