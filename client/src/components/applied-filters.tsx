import { X } from "lucide-react";
import { FilterState } from "@/hooks/use-filters";

interface AppliedFiltersProps {
  filters: FilterState;
  removeFilter: (key: keyof FilterState, value?: string) => void;
}

export default function AppliedFilters({ filters, removeFilter }: AppliedFiltersProps) {
  const hasFilters = 
    !!filters.search || 
    !!filters.consultationType || 
    filters.specialties.length > 0 || 
    !!filters.sortBy;
  
  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {/* Search filter */}
      {filters.search && (
        <FilterTag 
          label={`Search: ${filters.search}`} 
          onRemove={() => removeFilter('search')} 
        />
      )}

      {/* Consultation type filter */}
      {filters.consultationType && (
        <FilterTag 
          label={filters.consultationType === 'video' ? 'Video Consult' : 'In Clinic'} 
          onRemove={() => removeFilter('consultationType')} 
        />
      )}

      {/* Specialty filters */}
      {filters.specialties.map((specialty) => (
        <FilterTag 
          key={specialty} 
          label={specialty} 
          onRemove={() => removeFilter('specialties', specialty)} 
        />
      ))}

      {/* Sort filter */}
      {filters.sortBy && (
        <FilterTag 
          label={filters.sortBy === 'fee' ? 'Fees: Low to High' : 'Experience: High to Low'} 
          onRemove={() => removeFilter('sortBy')} 
        />
      )}
    </div>
  );
}

interface FilterTagProps {
  label: string;
  onRemove: () => void;
}

function FilterTag({ label, onRemove }: FilterTagProps) {
  return (
    <div className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full text-sm flex items-center">
      {label}
      <button onClick={onRemove} className="ml-1">
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}
