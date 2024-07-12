import { cn } from "@/lib/utils";
import { Slider } from "./ui/slider";

type SliderProps = React.ComponentProps<typeof Slider>
const PriceSlider = ({ className, ...props }: SliderProps) => {
  
    return (
        <Slider
        defaultValue={[50]}
        min={1}
        max={1000000}
        step={10}
        className={cn("w-[100%]", className)}
        {...props}
      />
    );
};

export default PriceSlider;