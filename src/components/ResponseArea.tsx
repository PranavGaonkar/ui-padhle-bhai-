
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, BookOpen, Clock, Quote, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface ResponseAreaProps {
  loading?: boolean;
  data?: {
    summary?: string;
    flashcards?: Array<{ question: string; answer: string }>;
    videoUrl?: string;
    videoTitle?: string;
    duration?: string;
  };
}

const ResponseArea: React.FC<ResponseAreaProps> = ({ loading, data }) => {
  if (loading) {
    return (
      <Card className="w-full h-full min-h-[400px] animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-purple" /> AI Response
          </CardTitle>
          <CardDescription>
            Generating your personalized learning material...
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple"></div>
            <p className="text-sm text-muted-foreground">This may take a moment...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="w-full h-full min-h-[400px] animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-purple" /> AI Response
          </CardTitle>
          <CardDescription>
            Your learning material will appear here
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">Select a service and submit a request to get started</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full min-h-[400px] animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-purple" /> AI Response
        </CardTitle>
        <CardDescription>
          {data.videoTitle ? `Results for "${data.videoTitle}"` : 'Your personalized learning material'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="summary" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" /> Summary
            </TabsTrigger>
            <TabsTrigger value="flashcards" className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> Flashcards
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-1">
              <ExternalLink className="h-4 w-4" /> Video Info
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="mt-4">
            <ScrollArea className="h-[300px] rounded-md border p-4">
              {data.summary ? (
                <div className="space-y-4">
                  <h3 className="font-medium">Key Points</h3>
                  <div className="text-sm text-muted-foreground whitespace-pre-line">
                    {data.summary}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">No summary available</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="flashcards" className="mt-4">
            <ScrollArea className="h-[300px] rounded-md border">
              {data.flashcards && data.flashcards.length > 0 ? (
                <div className="divide-y">
                  {data.flashcards.map((card, index) => (
                    <div key={index} className="p-4 hover:bg-muted/50">
                      <h4 className="font-medium mb-2">Question {index + 1}</h4>
                      <p className="mb-2 text-sm">{card.question}</p>
                      <details className="text-sm">
                        <summary className="cursor-pointer text-purple font-medium">Show Answer</summary>
                        <div className="mt-2 p-2 bg-muted rounded-md">
                          {card.answer}
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">No flashcards available</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="video" className="mt-4">
            <div className="h-[300px] rounded-md border p-4">
              {data.videoUrl ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Video Title</h3>
                    <p className="text-sm text-muted-foreground">{data.videoTitle}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Duration</h3>
                    <p className="text-sm text-muted-foreground">{data.duration || 'Unknown'}</p>
                  </div>
                  
                  <div className="pt-4">
                    <Button asChild className="w-full bg-youtube hover:bg-youtube/90">
                      <a href={data.videoUrl} target="_blank" rel="noopener noreferrer">
                        Watch on YouTube <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">No video information available</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ResponseArea;
