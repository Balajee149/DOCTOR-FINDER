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
        <h1 className="text-3xl font-bold text-neutral-400 mb-2">Find a Doctor</h1>
        <p className="text-neutral-300">Search from our network of qualified healthcare professionals</p>
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
