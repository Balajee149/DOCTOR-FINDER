import { useEffect, useState } from "react";
import { useMobile } from "@/hooks/use-mobile";
import SearchBar from "@/components/search-bar";
import FilterPanel from "@/components/filter-panel";
import AppliedFilters from "@/components/applied-filters";
import DoctorList from "@/components/doctor-list";
import { useDoctorData } from "@/hooks/use-doctor-data";
import { useFilters } from "@/hooks/use-filters";
import { Calendar, HomeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const { doctors, isLoading, filteredDoctors, specialties } = useDoctorData();
  const { filters, setFilters, resetFilters, removeFilter } = useFilters();
  const isMobile = useMobile();
  const [showAppointments, setShowAppointments] = useState(false);
  const [appointmentCount, setAppointmentCount] = useState(0);

  useEffect(() => {
    // Set document title
    document.title = "Find a Doctor";
    
    // Check for appointments count
    const updateAppointmentCount = () => {
      const storedAppointments = localStorage.getItem('doctorAppointments');
      const count = storedAppointments ? JSON.parse(storedAppointments).length : 0;
      setAppointmentCount(count);
    };
    
    // Initial count
    updateAppointmentCount();
    
    // Listen for changes
    window.addEventListener('storage-updated', updateAppointmentCount);
    
    return () => {
      window.removeEventListener('storage-updated', updateAppointmentCount);
    };
  }, []);

  // Display appointments modal when appointments are available
  const AppointmentsModal = () => {
    if (!showAppointments) return null;
    
    const appointments = JSON.parse(localStorage.getItem('doctorAppointments') || '[]');
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative max-h-[80vh] overflow-auto">
          <button 
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700" 
            onClick={() => setShowAppointments(false)}
          >
            ✕
          </button>
          
          <h2 className="text-xl font-bold mb-4 text-neutral-800">Your Appointments</h2>
          
          {appointments.length === 0 ? (
            <div className="bg-neutral-50 rounded-lg p-8 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <p className="text-neutral-600 mb-2">No appointments booked yet</p>
              <p className="text-sm text-neutral-500">Your booked appointments will appear here</p>
            </div>
          ) : (
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
                      <span className="text-sm">{appointment.date} at {appointment.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <button 
                      className="px-3 py-1 text-sm text-red-500 border border-red-200 rounded-md hover:bg-red-50"
                      onClick={() => {
                        const newAppointments = [...appointments];
                        newAppointments.splice(index, 1);
                        localStorage.setItem('doctorAppointments', JSON.stringify(newAppointments));
                        window.dispatchEvent(new Event('storage-updated'));
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <button 
            className="w-full mt-6 py-2 bg-primary text-white rounded-md"
            onClick={() => setShowAppointments(false)}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Appointments Modal */}
      {showAppointments && <AppointmentsModal />}
      
      <div className="container mx-auto px-4 py-6">
        <header className="mb-8">
          <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Find a Doctor
              </h1>
              <p className="text-neutral-600">Search from our network of qualified healthcare professionals</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowAppointments(true)}
                className="px-4 py-2 bg-white text-primary font-medium rounded-lg border border-primary/20 shadow-sm hover:bg-primary/5 transition-colors flex items-center gap-2 relative"
              >
                <Calendar className="h-4 w-4" />
                <span>My Appointments</span>
                {appointmentCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white border-white">
                    {appointmentCount}
                  </Badge>
                )}
              </button>
              
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-white text-primary font-medium rounded-lg border border-primary/20 shadow-sm hover:bg-primary/5 transition-colors flex items-center gap-2"
              >
                <HomeIcon className="h-4 w-4" />
                <span>Home</span>
              </button>
            </div>
          </div>
        </header>

        <div className="lg:flex lg:gap-8">
          {/* Filter Sidebar */}
          <div className="lg:w-1/4">
            <FilterPanel 
              specialties={specialties} 
              filters={filters} 
              setFilters={setFilters} 
              resetFilters={resetFilters}
              isMobile={isMobile} 
            />
          </div>

          {/* Main Content */}
          <main className="lg:w-3/4 bg-white p-6 rounded-xl shadow-sm">
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
            <div className="flex justify-between items-center my-4 px-2">
              <p className="text-neutral-600 font-medium">
                <span className="text-primary font-bold">{filteredDoctors.length}</span> doctors found
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
        
        <footer className="mt-12 text-center text-neutral-500 text-sm py-6 border-t border-neutral-100">
          © {new Date().getFullYear()} Doctor Finder. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
