
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Youtube, BookType, MessageCircle } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import QueryForm from '@/components/QueryForm';
import ResponseArea from '@/components/ResponseArea';
import { YouTubeFormData } from '@/components/YouTubeSection';
import { NotionFormData } from '@/components/NotionSection';
import { DiscordFormData } from '@/components/DiscordSection';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState<any>(null);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleServiceSelect = (service: string) => {
    setActiveService(service);
  };

  // Mock function to simulate API calls
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
    
    // Mock response data
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
    
    // Mock response - this would typically confirm successful storage
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
    
    // Mock response - this would typically confirm the reminder was set
    setResponseData({
      summary: `Your reminder "${data.reminderText}" has been set for ${data.frequency} at ${data.time}.`,
      videoTitle: "Discord Reminder Configured",
    });
  };

  return (
    <div className={`min-h-screen flex flex-col bg-background ${isDarkMode ? 'dark' : ''}`}>
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple to-purple-dark bg-clip-text text-transparent">
            StudyBuddy AI Assistant
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Your AI-powered learning companion that helps you discover educational content, 
            organize your notes, and stay on track with your studies.
          </p>
        </section>
        
        {!activeService ? (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in">
            <ServiceCard 
              title="YouTube Learning"
              description="Find and summarize educational videos on any topic"
              icon={Youtube}
              variant="youtube"
              onClick={() => handleServiceSelect('youtube')}
            />
            <ServiceCard 
              title="Notion Storage"
              description="Save summaries, flashcards, and study plans to Notion"
              icon={BookType}
              variant="notion"
              onClick={() => handleServiceSelect('notion')}
            />
            <ServiceCard 
              title="Discord Reminders"
              description="Set up study reminders and motivational messages"
              icon={MessageCircle}
              variant="discord"
              onClick={() => handleServiceSelect('discord')}
            />
          </section>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <QueryForm 
              onYouTubeSubmit={handleYouTubeSubmit}
              onNotionSubmit={handleNotionSubmit}
              onDiscordSubmit={handleDiscordSubmit}
            />
            <ResponseArea loading={isLoading} data={responseData} />
          </div>
        )}
        
        {activeService && (
          <div className="text-center">
            <button 
              onClick={() => setActiveService(null)} 
              className="text-sm text-muted-foreground hover:text-purple transition-colors"
            >
              &larr; Back to all services
            </button>
          </div>
        )}
      </main>
      
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p>© 2025 StudyBuddy AI Assistant. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
