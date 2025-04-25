import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Doctor } from "@/types/doctor";
import { FilterState } from "@/hooks/use-filters";

interface SearchBarProps {
  doctors: Doctor[];
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

export default function SearchBar({ doctors, filters, setFilters }: SearchBarProps) {
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (value.trim().length > 0) {
      const matches = doctors
        .filter(doctor => 
          doctor.name.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 3);
      
      setSuggestions(matches);
      setIsOpen(matches.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleSelectSuggestion = (doctor: Doctor) => {
    setFilters({ ...filters, search: doctor.name });
    setIsOpen(false);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-6" ref={containerRef}>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-300">
          <Search className="h-5 w-5" />
        </span>
        <input 
          type="text" 
          placeholder="Search doctors by name" 
          className="w-full p-3 pl-10 rounded-lg border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary-light focus:outline-none" 
          onChange={handleSearchChange}
          value={filters.search || ''}
          data-testid="autocomplete-input"
        />
      </div>
      
      {isOpen && (
        <div className="relative z-10">
          <ul className="absolute w-full mt-1 bg-white rounded-b-lg shadow-md border border-t-0 border-neutral-200 overflow-hidden">
            {suggestions.map((doctor) => (
              <li 
                key={doctor.id} 
                className="p-3 hover:bg-neutral-100 cursor-pointer"
                onClick={() => handleSelectSuggestion(doctor)}
                data-testid="suggestion-item"
              >
                {doctor.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
