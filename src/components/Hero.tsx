
import React from 'react';

const Hero = () => {
  return (
    <section className="text-center mb-12 animate-fade-in">
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple to-purple-dark bg-clip-text text-transparent">
        Kyu nahi ho rahi padhai?
      </h1>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
        Struggling to study? Can't manage your notes, YouTube content, or Discord messages?
      </p>
      <h2 className="text-2xl font-semibold mb-3">
        📚 Meet your AI Study Buddy
      </h2>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
        Your personalized learning companion that helps you stay focused, 
        organize notes, and find the right content — all in one place.
      </p>
    </section>
  );
};

export default Hero;
