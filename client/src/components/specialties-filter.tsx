import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SpecialtiesFilterProps {
  specialties: string[];
  selectedSpecialties: string[];
  onChange: (specialties: string[]) => void;
}

export default function SpecialtiesFilter({
  specialties,
  selectedSpecialties,
  onChange
}: SpecialtiesFilterProps) {
  
  const handleChange = (specialty: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedSpecialties, specialty]);
    } else {
      onChange(selectedSpecialties.filter(s => s !== specialty));
    }
  };

  // Function to convert specialty name to data-testid format
  const specialtyToTestId = (specialty: string): string => {
    return `filter-specialty-${specialty.toLowerCase().replace(/\s+/g, '-')}`;
  };
  
  return (
    <div className="mb-6 border-b pb-6">
      <h3 className="font-semibold mb-3 text-neutral-400" data-testid="filter-header-specialty">
        Specialty
      </h3>
      
      <ScrollArea className="h-60 pr-4">
        <div className="space-y-2">
          {specialties.map((specialty) => (
            <div key={specialty} className="flex items-center space-x-2">
              <Checkbox 
                id={specialty} 
                checked={selectedSpecialties.includes(specialty)}
                onCheckedChange={(checked) => handleChange(specialty, !!checked)}
                data-testid={specialtyToTestId(specialty)}
              />
              <Label htmlFor={specialty}>{specialty}</Label>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
