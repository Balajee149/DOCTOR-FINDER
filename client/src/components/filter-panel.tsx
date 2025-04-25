import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ConsultationTypeFilter from "./consultation-type-filter";
import SpecialtiesFilter from "./specialties-filter";
import SortOptions from "./sort-options";
import { FilterState } from "@/hooks/use-filters";

interface FilterPanelProps {
  specialties: string[];
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  resetFilters: () => void;
  isMobile: boolean;
}

export default function FilterPanel({
  specialties, 
  filters, 
  setFilters, 
  resetFilters,
  isMobile
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(!isMobile);

  return (
    <aside className="lg:w-1/4 mb-6 lg:mb-0" data-testid="filter-panel">
      <div className="bg-white rounded-lg shadow p-4 sticky top-4">
        {isMobile && (
          <div className="mb-4">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-between w-full bg-neutral-100 p-3 rounded-md"
            >
              <span className="font-medium">Filters</span>
              {isOpen ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
          </div>
        )}

        {(!isMobile || isOpen) && (
          <div>
            {/* Consultation Type Filter */}
            <ConsultationTypeFilter 
              consultationType={filters.consultationType} 
              onChange={(value) => setFilters({ ...filters, consultationType: value })} 
            />
            
            {/* Specialties Filter */}
            <SpecialtiesFilter 
              specialties={specialties}
              selectedSpecialties={filters.specialties}
              onChange={(value) => setFilters({ ...filters, specialties: value })}
            />
            
            {/* Sort Options */}
            <SortOptions 
              sortBy={filters.sortBy}
              onChange={(value) => setFilters({ ...filters, sortBy: value })}
            />

            <button 
              onClick={resetFilters}
              className="mt-4 text-primary hover:text-primary-dark font-medium"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
