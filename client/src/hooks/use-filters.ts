import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";

export interface FilterState {
  search: string;
  consultationType: string;
  specialties: string[];
  sortBy: string;
}

export function useFilters() {
  const [location, setLocation] = useLocation();
  const search = useSearch();
  const [filters, setFiltersState] = useState<FilterState>({
    search: "",
    consultationType: "",
    specialties: [],
    sortBy: "",
  });

  // Load filters from URL on initial render
  useEffect(() => {
    const params = new URLSearchParams(search);
    
    const initialFilters: FilterState = {
      search: params.get("search") || "",
      consultationType: params.get("type") || "",
      specialties: params.get("specialties") ? params.get("specialties")!.split(",") : [],
      sortBy: params.get("sort") || "",
    };
    
    setFiltersState(initialFilters);
  }, [search]);

  // Update URL when filters change
  const setFilters = (newFilters: FilterState) => {
    setFiltersState(newFilters);
    
    const params = new URLSearchParams();
    
    if (newFilters.search) {
      params.set("search", newFilters.search);
    }
    
    if (newFilters.consultationType) {
      params.set("type", newFilters.consultationType);
    }
    
    if (newFilters.specialties.length > 0) {
      params.set("specialties", newFilters.specialties.join(","));
    }
    
    if (newFilters.sortBy) {
      params.set("sort", newFilters.sortBy);
    }
    
    const queryString = params.toString();
    const newLocation = queryString ? `/?${queryString}` : "/";
    
    if (newLocation !== location) {
      setLocation(newLocation);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    // Set filters back to initial values
    setFilters({
      search: "",
      consultationType: "",
      specialties: [],
      sortBy: "",
    });
    
    // Also reset any UI state that might be related to filters
    // For example, any autocomplete or dropdown that might be open
    console.log("All filters have been reset");
    
    // Force a re-render by setting state again after a short delay
    setTimeout(() => {
      setFilters({
        search: "",
        consultationType: "",
        specialties: [],
        sortBy: "",
      });
    }, 50);
  };

  // Remove a specific filter
  const removeFilter = (key: keyof FilterState, value?: string) => {
    if (key === "specialties" && value) {
      // Remove specific specialty
      setFilters({
        ...filters,
        specialties: filters.specialties.filter(s => s !== value)
      });
    } else {
      // Remove entire filter category
      setFilters({
        ...filters,
        [key]: key === "specialties" ? [] : ""
      });
    }
  };

  return {
    filters,
    setFilters,
    resetFilters,
    removeFilter,
  };
}
