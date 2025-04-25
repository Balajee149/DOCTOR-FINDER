import { useState, useEffect } from "react";
import { Doctor } from "@/types/doctor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, X } from "lucide-react";

interface BookedAppointmentsProps {
  onClose: () => void;
}

interface Appointment {
  doctor: Doctor;
  date: string;
  time: string;
}

export function BookedAppointments({ onClose }: BookedAppointmentsProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  // Listen for booking events globally
  useEffect(() => {
    const handleStorageChange = () => {
      const storedAppointments = localStorage.getItem('doctorAppointments');
      if (storedAppointments) {
        setAppointments(JSON.parse(storedAppointments));
      }
    };
    
    // Initial load
    handleStorageChange();
    
    // Set up event listener for when appointments are added
    window.addEventListener('storage-updated', handleStorageChange);
    
    // Clean up
    return () => {
      window.removeEventListener('storage-updated', handleStorageChange);
    };
  }, []);
  
  const cancelAppointment = (index: number) => {
    const newAppointments = [...appointments];
    newAppointments.splice(index, 1);
    setAppointments(newAppointments);
    localStorage.setItem('doctorAppointments', JSON.stringify(newAppointments));
    window.dispatchEvent(new Event('storage-updated'));
  };

  if (appointments.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-3 top-3"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
          
          <h2 className="text-xl font-bold mb-4 text-neutral-800">Your Appointments</h2>
          
          <div className="bg-neutral-50 rounded-lg p-8 text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <p className="text-neutral-600 mb-2">No appointments booked yet</p>
            <p className="text-sm text-neutral-500">Your booked appointments will appear here</p>
          </div>
          
          <Button className="w-full mt-6" onClick={onClose}>Close</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative max-h-[80vh] overflow-auto">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-3 top-3"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        
        <h2 className="text-xl font-bold mb-4 text-neutral-800">Your Appointments</h2>
        
        <div className="space-y-3">
          {appointments.map((appointment, index) => (
            <div key={index} className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-neutral-800">Dr. {appointment.doctor.name}</h3>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-100">Confirmed</Badge>
              </div>
              
              <div className="text-sm text-neutral-600 mb-2">
                {appointment.doctor.specialties && appointment.doctor.specialties.length > 0 
                  ? appointment.doctor.specialties.join(', ') 
                  : 'General Practitioner'}
              </div>
              
              <div className="flex items-center gap-5 mt-3">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm">{appointment.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm">{appointment.time}</span>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                  onClick={() => cancelAppointment(index)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <Button className="w-full mt-6" onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}