/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/features/category/categoryApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TCategory } from "@/interface/TCategory";
import { Edit, PlusCircle } from "lucide-react";
import { useState } from "react";
const createCategorySchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  image: z.any().refine((file) => file instanceof File, "Image is required"),
});

type CategoryFormData = z.infer<typeof createCategorySchema>;

const CategoryForm = ({ initialData }: { initialData: TCategory | null }) => {
  const [updatedImage, setUpdatedImage] = useState<string | null>(null);
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: initialData
      ? {
          ...initialData,
          image: undefined, // Set image to undefined for initial data
        }
      : {
          name: "",
          description: "",
          image: undefined,
        },
  });

  const onSubmit = async (data: CategoryFormData) => {
    try {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          name: data.name,
          description: data.description,
        })
      );

      if (data.image instanceof File) {
        formData.append("categoryImage", data.image);
      }

      console.log(data);
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      let res;
      if (initialData) {
        const CategoryId = initialData._id as string;
        res = await updateCategory({ CategoryId, formData }).unwrap();
      } else {
        res = await addCategory(formData).unwrap();
      }
      if (res?.success) {
        toast.success(
          `Category ${initialData ? "updated" : "added"} successfully`
        );
      } else {
        toast.error(`Failed to ${initialData ? "update" : "add"} category`);
      }
    } catch (error: any) {
      toast.error(`An error occurred: ${error.message || "Unknown error"}`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`${
            initialData
              ? "border-primary text-primary"
              : "bg-primary text-white"
          }`}
        >
          {initialData ? <Edit /> : <PlusCircle />}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <DialogHeader>
            <DialogTitle>
              {" "}
              {initialData ? "Edit Category" : "Add Category"}
            </DialogTitle>
            <DialogDescription>
              {initialData
                ? "Edit the Category details and click save."
                : "Fill in the Category details and click save."}
            </DialogDescription>
          </DialogHeader>
          <div>
            <Label className="block mb-1 font-semibold">Name</Label>
            <Input
              type="text"
              {...register("name")}
              defaultValue={initialData ? initialData.name : ""}
              className=""
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label className="block mb-1 font-semibold">Image</Label>

            <div className="flex gap-2 items-center justify-between">
              {initialData ? (
                <div className="flex justify-around items-center gap-2">
                  {/* Display Initial Image */}
                  <img
                    src={initialData.image}
                    alt="Current"
                    className="w-14 h-14 rounded-md"
                  />

                  {/* Label for File Input */}
                  <label
                    htmlFor="image"
                    className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md w-14 h-14 flex items-center justify-center"
                  >
                    <PlusCircle className="w-10 h-10" />
                  </label>

                  {/* Hidden File Input */}
                  <Input
                    id="image"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0]; // Get the selected file
                      if (file) {
                        setUpdatedImage(URL.createObjectURL(file)); // Set the preview URL
                        setValue("image", file, { shouldValidate: true });
                      }
                    }}
                    className="hidden"
                  />

                  {/* Preview Updated Image */}
                  {updatedImage && (
                    <div className="flex flex-col items-center">
                      <img
                        src={updatedImage}
                        alt="Preview"
                        className="w-14 h-14 rounded-md"
                      />
                    </div>
                  )}
                </div>
              ) : (
                // For New Image Upload
                <div className="flex gap-2 items-center">
                  <label
                    htmlFor="image"
                    className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md w-14 h-14 flex items-center justify-center"
                  >
                    <PlusCircle className="w-10 h-10" />
                  </label>
                  <Input
                    id="image"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0]; // Get the selected file
                      if (file) {
                        setUpdatedImage(URL.createObjectURL(file)); // Set the preview URL
                        setValue("image", file, { shouldValidate: true });
                      }
                    }}
                    className="hidden"
                  />
                  {updatedImage && (
                    <div className="flex flex-col items-center">
                      <img
                        src={updatedImage}
                        alt="Preview"
                        className="w-14 h-14 rounded-md"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {errors.image && (
              <p className="text-red-500 text-sm">
                {errors.image?.message?.toString()}
              </p>
            )}
          </div>
          <div>
            <Label className="block mb-1 font-semibold">Description</Label>
            <Textarea
              {...register("description")}
              className=""
              rows={5}
              required
              defaultValue={initialData ? initialData.description : ""}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">
                {initialData ? "Save changes" : "Add Category"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryForm;
