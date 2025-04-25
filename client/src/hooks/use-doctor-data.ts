import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Doctor } from "@/types/doctor";
import { useFilters, FilterState } from "./use-filters";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

export function useDoctorData() {
  const { filters } = useFilters();
  const [specialties, setSpecialties] = useState<string[]>([]);

  // Fetch doctor data
  const { data: doctors = [], isLoading } = useQuery<Doctor[]>({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error("Failed to fetch doctors");
      }
      
      const rawData = await res.json();
      
      // Transform API data to match our app's expected format
      return rawData.map((doctor: any, index: number) => {
        // Extract numeric experience from string like "13 Years of experience"
        const expMatch = doctor.experience ? doctor.experience.match(/(\d+)/) : null;
        const experience = expMatch ? parseInt(expMatch[1], 10) : 0;
        
        // Extract fee from string like "₹ 500"
        const feeMatch = doctor.fees ? doctor.fees.match(/(\d+)/) : null;
        const fee = feeMatch ? parseInt(feeMatch[1], 10) : 0;
        
        // Extract specialties from specialities array of objects
        const specialties = doctor.specialities?.map((s: any) => s.name) || [];
        
        // Determine consultation type (defaulting to "clinic" if video_consult is false or not present)
        const consultationType = doctor.video_consult ? "video" : "clinic";
        
        return {
          id: Number(doctor.id) || index + 1,
          name: doctor.name || "",
          specialties,
          experience,
          fee,
          consultationType
        };
      });
    }
  });

  // Extract all unique specialties
  useEffect(() => {
    if (doctors.length > 0) {
      const allSpecialties = new Set<string>();
      
      doctors.forEach(doctor => {
        if (doctor.specialties && Array.isArray(doctor.specialties)) {
          doctor.specialties.forEach(specialty => {
            allSpecialties.add(specialty);
          });
        }
      });
      
      setSpecialties(Array.from(allSpecialties).sort());
    }
  }, [doctors]);

  // Apply filters to doctors
  const filteredDoctors = useMemo(() => {
    return applyFilters(doctors, filters);
  }, [doctors, filters]);

  return {
    doctors,
    isLoading,
    filteredDoctors,
    specialties,
  };
}

// Helper function to apply filters
function applyFilters(doctors: Doctor[], filters: FilterState): Doctor[] {
  // If doctors array is empty or filters are invalid, return empty array
  if (!doctors || !Array.isArray(doctors) || doctors.length === 0) {
    return [];
  }

  // Create a deep copy of the doctors array to avoid mutation issues
  let filtered = JSON.parse(JSON.stringify(doctors));
  
  // Check if all filters are empty/default values (this is the "all filters cleared" state)
  const areAllFiltersEmpty = 
    !filters.search && 
    !filters.consultationType && 
    filters.specialties.length === 0 && 
    !filters.sortBy;
    
  // If all filters are empty, return all doctors
  if (areAllFiltersEmpty) {
    console.log("All filters are empty, returning all doctors:", filtered.length);
    
    // Still apply default sorting if no filters are active
    return filtered.sort((a: Doctor, b: Doctor) => {
      // Sort by name as default
      const nameA = a.name ? a.name.toLowerCase() : '';
      const nameB = b.name ? b.name.toLowerCase() : '';
      return nameA.localeCompare(nameB);
    });
  }
  
  // Apply search filter
  if (filters.search) {
    filtered = filtered.filter((doctor: Doctor) => 
      doctor.name && doctor.name.toLowerCase().includes(filters.search.toLowerCase())
    );
  }
  
  // Apply consultation type filter
  if (filters.consultationType) {
    filtered = filtered.filter((doctor: Doctor) => 
      doctor.consultationType === filters.consultationType
    );
  }
  
  // Apply specialty filters
  if (filters.specialties.length > 0) {
    filtered = filtered.filter((doctor: Doctor) => 
      doctor.specialties && Array.isArray(doctor.specialties) && 
      filters.specialties.some((specialty: string) => 
        doctor.specialties.includes(specialty)
      )
    );
  }
  
  // Apply sorting
  if (filters.sortBy) {
    if (filters.sortBy === 'fee') {
      filtered.sort((a: Doctor, b: Doctor) => {
        // Handle cases where fee might be undefined
        const feeA = typeof a.fee === 'number' ? a.fee : Infinity;
        const feeB = typeof b.fee === 'number' ? b.fee : Infinity;
        return feeA - feeB;
      });
    } else if (filters.sortBy === 'experience') {
      filtered.sort((a: Doctor, b: Doctor) => {
        // Handle cases where experience might be undefined
        const expA = typeof a.experience === 'number' ? a.experience : -1;
        const expB = typeof b.experience === 'number' ? b.experience : -1;
        return expB - expA;
      });
    }
  }
  
  console.log("Filtered doctors:", filtered.length);
  return filtered;
}
