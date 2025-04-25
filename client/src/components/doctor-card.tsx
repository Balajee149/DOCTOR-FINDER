import { Doctor } from "@/types/doctor";
import { Button } from "@/components/ui/button";
import { Briefcase, Video, MapPin } from "lucide-react";

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden doctor-card" 
      data-testid="doctor-card"
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 
            className="text-xl font-semibold text-neutral-400" 
            data-testid="doctor-name"
          >
            {doctor.name}
          </h3>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            Available Today
          </span>
        </div>
        
        <div className="mb-3" data-testid="doctor-specialty">
          <span className="text-neutral-300">{doctor.specialties?.join(', ') || 'No specialties listed'}</span>
        </div>
        
        <div className="flex items-center mb-2">
          <Briefcase className="text-primary mr-1 h-4 w-4" />
          <span 
            className="text-sm text-neutral-300" 
            data-testid="doctor-experience"
          >
            {doctor.experience ? `${doctor.experience}+ years experience` : 'Experience not specified'}
          </span>
        </div>
        
        <div className="flex items-center mb-3">
          {doctor.consultationType === 'video' ? (
            <>
              <Video className="text-primary mr-1 h-4 w-4" />
              <span className="text-sm text-neutral-300">Video Consult</span>
            </>
          ) : (
            <>
              <MapPin className="text-primary mr-1 h-4 w-4" />
              <span className="text-sm text-neutral-300">In Clinic</span>
            </>
          )}
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t">
          <div>
            <span className="text-sm text-neutral-300">Consultation Fee</span>
            <p 
              className="font-semibold text-neutral-400" 
              data-testid="doctor-fee"
            >
              {doctor.fee ? `₹${doctor.fee}` : 'Fee not specified'}
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary-dark text-white">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}
