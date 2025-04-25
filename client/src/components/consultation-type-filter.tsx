import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ConsultationTypeFilterProps {
  consultationType: string;
  onChange: (value: string) => void;
}

export default function ConsultationTypeFilter({ 
  consultationType, 
  onChange 
}: ConsultationTypeFilterProps) {
  return (
    <div className="mb-6 border-b pb-6">
      <h3 className="font-semibold mb-3 text-neutral-400" data-testid="filter-header-consult">
        Consultation Type
      </h3>
      
      <RadioGroup 
        value={consultationType} 
        onValueChange={onChange}
      >
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem 
              value="video" 
              id="video-consult" 
              data-testid="filter-video-consult" 
            />
            <Label htmlFor="video-consult">Video Consult</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem 
              value="clinic" 
              id="in-clinic" 
              data-testid="filter-in-clinic" 
            />
            <Label htmlFor="in-clinic">In Clinic</Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
}
