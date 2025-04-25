import { Doctor } from "@/types/doctor";
import { Button } from "@/components/ui/button";
import { Briefcase, Video, MapPin, Star, CalendarCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  // Create a doctor avatar with initials if no image
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden doctor-card border border-neutral-100 hover:shadow-lg transition-shadow duration-300" 
      data-testid="doctor-card"
    >
      <div className="p-5">
        <div className="flex items-start gap-4 mb-4">
          {/* Doctor avatar */}
          <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center text-primary font-bold text-xl flex-shrink-0">
            {getInitials(doctor.name || "Doctor")}
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start w-full">
              <h3 
                className="text-xl font-semibold text-neutral-800" 
                data-testid="doctor-name"
              >
                {doctor.name || "Doctor"}
              </h3>
              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200 flex items-center gap-1">
                <CalendarCheck className="h-3 w-3" />
                <span>Available Today</span>
              </Badge>
            </div>
            
            <div className="mb-1" data-testid="doctor-specialty">
              <span className="text-neutral-600 font-medium">
                {doctor.specialties && doctor.specialties.length > 0 
                  ? doctor.specialties.join(', ') 
                  : 'General Practitioner'}
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-3 w-3 fill-current" />
                ))}
              </div>
              <span className="text-xs text-neutral-500">(120+ patient reviews)</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center p-2 bg-neutral-50 rounded-md">
            <Briefcase className="text-primary mr-2 h-4 w-4" />
            <div>
              <span className="block text-xs text-neutral-500">Experience</span>
              <span 
                className="font-medium text-neutral-700" 
                data-testid="doctor-experience"
              >
                {doctor.experience ? `${doctor.experience}+ years` : 'New doctor'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center p-2 bg-neutral-50 rounded-md">
            {doctor.consultationType === 'video' ? (
              <>
                <Video className="text-primary mr-2 h-4 w-4" />
                <div>
                  <span className="block text-xs text-neutral-500">Consultation</span>
                  <span className="font-medium text-neutral-700">Video Consult</span>
                </div>
              </>
            ) : (
              <>
                <MapPin className="text-primary mr-2 h-4 w-4" />
                <div>
                  <span className="block text-xs text-neutral-500">Consultation</span>
                  <span className="font-medium text-neutral-700">In Clinic</span>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-neutral-100">
          <div>
            <span className="text-xs text-neutral-500">Consultation Fee</span>
            <p 
              className="text-lg font-bold text-primary" 
              data-testid="doctor-fee"
            >
              {doctor.fee ? `₹${doctor.fee}` : 'Fee not specified'}
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary-dark text-white font-medium shadow-sm">
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
}
