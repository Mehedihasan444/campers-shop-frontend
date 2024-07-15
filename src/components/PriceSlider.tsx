import { cn } from "@/lib/utils";
import { Slider } from "./ui/slider";
import { useEffect, useState, useRef } from "react";

type PriceSliderProps = {
  value: number[];
  onChange: (value: number[]) => void;
};
const PriceSlider = ({ value, onChange }: PriceSliderProps) => {
  const [thumbPosition, setThumbPosition] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null); // Adjust type based on your actual DOM element type

  const handleValueChange = (value: number[]) => {
    onChange(value);
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const percentage = ((value[0] - 1) / (1000000 - 1)) * 100;
      const thumbPos = (percentage / 100) * slider.offsetWidth;
      setThumbPosition(thumbPos);
    }
  };

  useEffect(() => {
    handleValueChange(value);
  }, [value]);

  return (
    <div className="relative w-full" ref={sliderRef}>
      <div
        className="absolute top-1 left-0 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2"
        style={{ left: thumbPosition }}
      >
        {value[0]}
      </div>
      <Slider
        value={value}
        onValueChange={handleValueChange}
        defaultValue={[50]}
        min={1}
        max={10000}
        step={10}
        className={cn("w-[100%] border-2 rounded-2xl border-primary")}
      />
    </div>
  );
};

export default PriceSlider;
