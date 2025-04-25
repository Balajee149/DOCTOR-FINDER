import { useEffect } from "react";
import { useMobile } from "@/hooks/use-mobile";
import SearchBar from "@/components/search-bar";
import FilterPanel from "@/components/filter-panel";
import AppliedFilters from "@/components/applied-filters";
import DoctorList from "@/components/doctor-list";
import { useDoctorData } from "@/hooks/use-doctor-data";
import { useFilters } from "@/hooks/use-filters";

export default function Home() {
  const { doctors, isLoading, filteredDoctors, specialties } = useDoctorData();
  const { filters, setFilters, resetFilters, removeFilter } = useFilters();
  const isMobile = useMobile();

  useEffect(() => {
    // Set document title
    document.title = "Find a Doctor";
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">Find a Doctor</h1>
            <p className="text-neutral-600">Search from our network of qualified healthcare professionals</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-white text-primary font-medium rounded-lg border border-primary/20 shadow-sm hover:bg-primary/5 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Home
          </button>
        </div>
      </header>

      <div className="lg:flex lg:gap-6">
        {/* Filter Sidebar */}
        <FilterPanel 
          specialties={specialties} 
          filters={filters} 
          setFilters={setFilters} 
          resetFilters={resetFilters}
          isMobile={isMobile} 
        />

        {/* Main Content */}
        <main className="lg:w-3/4">
          {/* Search Bar */}
          <SearchBar 
            doctors={doctors} 
            filters={filters} 
            setFilters={setFilters} 
          />

          {/* Applied Filters */}
          <AppliedFilters 
            filters={filters} 
            removeFilter={removeFilter} 
          />

          {/* Results Summary */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-neutral-300">
              <span>{filteredDoctors.length}</span> doctors found
            </p>
          </div>

          {/* Doctor List */}
          <DoctorList 
            doctors={filteredDoctors} 
            isLoading={isLoading} 
            resetFilters={resetFilters} 
          />
        </main>
      </div>
    </div>
  );
}
