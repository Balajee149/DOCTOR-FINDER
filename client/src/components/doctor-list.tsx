import { Doctor } from "@/types/doctor";
import DoctorCard from "./doctor-card";
import { SearchCode } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DoctorListProps {
  doctors: Doctor[];
  isLoading: boolean;
  resetFilters: () => void;
}

export default function DoctorList({ doctors, isLoading, resetFilters }: DoctorListProps) {
  if (isLoading) {
    return (
      <div className="py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="py-8 text-center">
        <SearchCode className="mx-auto h-12 w-12 text-neutral-200 mb-2" />
        <p className="text-lg text-neutral-300">No doctors found matching your criteria</p>
        <Button
          variant="link"
          onClick={resetFilters}
          className="mt-4 text-primary hover:text-primary-dark font-medium"
        >
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
}
