import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAddBecomeASellerMutation } from "@/redux/features/becomeASeller/becomeASellerApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

// Define the validation schema
const becomeSellerValidationSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().nonempty("Phone number is required"),
  address: z.string().nonempty("Address is required"),
  description: z.string().nonempty("Description is required"),
});

type BecomeSellerFormData = z.infer<typeof becomeSellerValidationSchema>;

const Become_A_Seller = () => {
  const navigate = useNavigate();
const [addBecomeASeller]=useAddBecomeASellerMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BecomeSellerFormData>({
    resolver: zodResolver(becomeSellerValidationSchema),
  });

  const onSubmit:SubmitHandler<FieldValues>  = async (data) => {
    // Handle form submission
    const res = await addBecomeASeller(data);
    if (res?.data?.success) {
      // Show success message
      toast.success(res?.data?.message);
    }else{
      // Show error message
      toast.error(res?.data?.message);
    }
    // Navigate or show success message
    navigate("/");
  };

  return (
    <div className="h-screen bg-primary/10 flex items-center justify-center ">

    <div className="max-w-3xl mx-auto p-5 bg-white  rounded-lg ">
      <h1 className="text-4xl font-bold mb-5 text-center text-green-600">Become a Seller</h1>
      <p className="mb-5 text-gray-600 text-center">
        Fill out the form below to apply to become a seller. We will review your application and get back to you soon.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label className="block mb-1 font-semibold text-gray-700">Name</Label>
            <Input
              type="text"
              placeholder="Enter your name"
              {...register("name")}
              className="w-full border p-2 rounded "
            
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label className="block mb-1 font-semibold text-gray-700">Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full border p-2 rounded "
              
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Label className="block mb-1 font-semibold text-gray-700">Phone Number</Label>
            <Input
              type="tel"
              placeholder="Enter your phone number"
              {...register("phone")}
              className="w-full border p-2 rounded "
              
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <Label className="block mb-1 font-semibold text-gray-700">Address</Label>
            <Input
              type="text"
              placeholder="Enter your address"
              {...register("address")}
              className="w-full border p-2 rounded "
              
              required
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
          <div>
            <Label className="block mb-1 font-semibold text-gray-700">Description</Label>
            <Textarea
        placeholder="Tell us about your store, the products you sell, and why you want to become a seller on our platform."
              {...register("description")}
              className="w-full border p-2 rounded "
              
              rows={5}
              required
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition duration-300"
          >
            Submit Application
          </Button>
        </form>
    </div>
    </div>
  );
};

export default Become_A_Seller;
