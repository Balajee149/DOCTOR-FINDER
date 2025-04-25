import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface SortOptionsProps {
  sortBy: string;
  onChange: (value: string) => void;
}

export default function SortOptions({ sortBy, onChange }: SortOptionsProps) {
  return (
    <div className="mb-2">
      <h3 className="font-semibold mb-3 text-neutral-400" data-testid="filter-header-sort">
        Sort By
      </h3>
      
      <RadioGroup value={sortBy} onValueChange={onChange}>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem 
              value="fee" 
              id="sort-fee" 
              data-testid="filter-sort-fee" 
            />
            <Label htmlFor="sort-fee">Fees (Low to High)</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem 
              value="experience" 
              id="sort-experience" 
              data-testid="filter-sort-experience" 
            />
            <Label htmlFor="sort-experience">Experience (High to Low)</Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
}
