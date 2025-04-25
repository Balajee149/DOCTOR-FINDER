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
  let filtered = [...doctors];
  
  // Apply search filter
  if (filters.search) {
    filtered = filtered.filter(doctor => 
      doctor.name.toLowerCase().includes(filters.search.toLowerCase())
    );
  }
  
  // Apply consultation type filter
  if (filters.consultationType) {
    filtered = filtered.filter(doctor => 
      doctor.consultationType === filters.consultationType
    );
  }
  
  // Apply specialty filters
  if (filters.specialties.length > 0) {
    filtered = filtered.filter(doctor => 
      doctor.specialties && Array.isArray(doctor.specialties) && 
      filters.specialties.some(specialty => 
        doctor.specialties.includes(specialty)
      )
    );
  }
  
  // Apply sorting
  if (filters.sortBy) {
    if (filters.sortBy === 'fee') {
      filtered.sort((a, b) => {
        // Handle cases where fee might be undefined
        const feeA = typeof a.fee === 'number' ? a.fee : Infinity;
        const feeB = typeof b.fee === 'number' ? b.fee : Infinity;
        return feeA - feeB;
      });
    } else if (filters.sortBy === 'experience') {
      filtered.sort((a, b) => {
        // Handle cases where experience might be undefined
        const expA = typeof a.experience === 'number' ? a.experience : -1;
        const expB = typeof b.experience === 'number' ? b.experience : -1;
        return expB - expA;
      });
    }
  }
  
  return filtered;
}
