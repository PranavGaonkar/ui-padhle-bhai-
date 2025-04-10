import React from 'react';
import { Button } from "@/components/ui/button";
import { BookOpen, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode }) => {
  return (
    <header className="w-full py-4 px-6 border-b flex items-center justify-between bg-background">
      <div className="flex items-center space-x-2">
        <BookOpen className="h-6 w-6 text-purple" />
        <h1 className="text-xl font-semibold">Padhle AI</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="text-sm font-medium hover:text-purple">Home</a></li>
            <li><a href="#" className="text-sm font-medium hover:text-purple">Features</a></li>
            <li><a href="#" className="text-sm font-medium hover:text-purple">Help</a></li>
          </ul>
        </nav>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  );
};

export default Header;
