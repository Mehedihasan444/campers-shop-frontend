// import { Button } from "@/components/ui/button";

// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { TProduct } from "@/interface/TProduct";
// import {
//   useAddProductMutation,
//   useUpdateProductMutation,
// } from "@/redux/api/api";
// import { ChangeEvent, FormEvent, useState } from "react";
// import { toast } from "sonner";
// import axios from "axios"
// // imagebb auth credentials
// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

// const AddProductForm = ({ initialData }: { initialData: TProduct | null }) => {
//   const [addProduct] = useAddProductMutation();
//   const [updateProduct] = useUpdateProductMutation();
//   const [product, setProduct] = useState(
//     initialData || {
//       name: "",
//       price: 0,
//       quantity: 0,
//       description: "",
//       category: "",
//       image: "",
//       rating: 0,
//       brand: "",
//       inStock: true,
//       isFeatured: false,
//       reviews: 0,
//       isBestseller: false,
//       isPopular: false,
//       isSoldOut: false,
//       isDiscounted: false,
//       isOutofstock: false,
//       isComingSoon: false,
//     }
//   );
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { id, value, type, checked } = e.target as HTMLInputElement;
//     setProduct({
//       ...product,
//       [id]:
//         type === "checkbox" ? checked : type === "number" ? Number(value) : value,
//     });
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//     }
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     let imageUrl = product.image;
//     if (selectedFile) {
//       const res = await axios.post(image_hosting_api,  { image:selectedFile }, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (res.data.success) {
//         imageUrl = res.data.data.display_url;
//       } else {
//         toast.error("Image upload failed");
//         return;
//       }
//     }

//     const formData = {
//       ...product,
//       image: imageUrl,
//     };

//     try {
//       let res;
//       if (initialData && "_id" in initialData) {
//         res = await updateProduct({ id: initialData._id, data: formData });
//       } else {
//         res = await addProduct(formData);
//       }

//       if (res.data.success) {
//         toast.success(`Product ${initialData ? "updated" : "added"} successfully`);
//       } else {
//         toast.error("Something went wrong");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("An error occurred while uploading the product");
//     }
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button
//           variant="outline"
//           className={`${
//             initialData
//               ? "border-primary text-primary"
//               : "bg-primary text-white"
//           }`}
//         >
//           {initialData ? "Edit Product" : "Create New Product"}
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="">
//         <DialogHeader>
//           <DialogTitle>
//             {initialData ? "Edit Product" : "Add Product"}
//           </DialogTitle>
//           <DialogDescription>
//             {initialData
//               ? "Edit the product details and click save."
//               : "Fill in the product details and click save."}
//           </DialogDescription>
//         </DialogHeader>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-2 py-4">
//             <div className="">
//               <Label htmlFor="name" className="text-right">
//                 Name
//               </Label>
//               <Input
//                 id="name"
//                 value={product.name}
//                 onChange={handleChange}
//                 className="col-span-3"
//                 required
//               />
//             </div>

//             <div className="flex gap-5 justify-between">
//               <div className="">
//                 <Label htmlFor="price" className="text-right">
//                   Price
//                 </Label>
//                 <Input
//                   id="price"
//                   type="number"
//                   value={product.price}
//                   onChange={handleChange}
//                   className="col-span-3"
//                   required
//                 />
//               </div>
//               <div className="">
//                 <Label htmlFor="quantity" className="text-right">
//                   Quantity
//                 </Label>
//                 <Input
//                   id="quantity"
//                   type="number"
//                   value={product.quantity}
//                   onChange={handleChange}
//                   className="col-span-3"
//                   required
//                 />
//               </div>
//               <div className="">
//                 <Label htmlFor="image" className="text-right">
//                   Image
//                 </Label>
//                 {!initialData && (
//                   <Input
//                     id="image"
//                     type="file"

//                     onChange={handleFileChange}
//                     className="col-span-3"
//                   />
//                 )}
//                 {initialData && (
//                   <Input
//                     id="image"
//                     value={product.image}
//                     onChange={handleChange}
//                     className="col-span-3"
//                     required
//                   />
//                 )}
//               </div>
//             </div>

//             <div className="flex justify-between gap-5">
//               <div className="">
//                 <Label htmlFor="category" className="text-right">
//                   Category
//                 </Label>
//                 <Input
//                   id="category"
//                   value={product.category}
//                   onChange={handleChange}
//                   className="col-span-3"
//                   required
//                 />
//               </div>
//               <div className="">
//                 <Label htmlFor="brand" className="text-right">
//                   Brand
//                 </Label>
//                 <Input
//                   id="brand"
//                   value={product.brand}
//                   onChange={handleChange}
//                   className="col-span-3"
//                   required
//                 />
//               </div>
//             </div>

//             <div className=" gap-2">
//               <Label htmlFor="description" className="text-right">
//                 Description
//               </Label>
//               <Textarea
//                 placeholder="Type your message here."
//                 id="description"
//                 value={product.description}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {initialData && (
//               <div className="grid grid-cols-4 justify-between items-center gap-3">
//                 <div className="flex justify-center items-center gap-2">
//                   <Label htmlFor="inStock" className="text-right">
//                     In Stock
//                   </Label>
//                   <input
//                     type="checkbox"
//                     id="inStock"
//                     checked={product.inStock}
//                     onChange={handleChange}
//                     className="col-span-3"
//                   />
//                 </div>
//                 <div className="flex justify-center items-center gap-2">
//                   <Label htmlFor="isFeatured" className="text-right">
//                     Featured
//                   </Label>
//                   <input
//                     type="checkbox"
//                     id="isFeatured"
//                     checked={product.isFeatured}
//                     onChange={handleChange}
//                     className="col-span-3"
//                   />
//                 </div>
//                 <div className="flex justify-center items-center gap-2">
//                   <Label htmlFor="isBestseller" className="text-right">
//                     Bestseller
//                   </Label>
//                   <input
//                     type="checkbox"
//                     id="isBestseller"
//                     checked={product.isBestseller}
//                     onChange={handleChange}
//                     className="col-span-3"
//                   />
//                 </div>
//                 <div className="flex justify-center items-center gap-2">
//                   <Label htmlFor="isPopular" className="text-right">
//                     Popular
//                   </Label>
//                   <input
//                     type="checkbox"
//                     id="isPopular"
//                     checked={product.isPopular}
//                     onChange={handleChange}
//                     className="col-span-3"
//                   />
//                 </div>
//                 <div className="flex justify-center items-center gap-2">
//                   <Label htmlFor="isSoldOut" className="text-right">
//                     Sold Out
//                   </Label>
//                   <input
//                     type="checkbox"
//                     id="isSoldOut"
//                     checked={product.isSoldOut}
//                     onChange={handleChange}
//                     className="col-span-3"
//                   />
//                 </div>
//                 <div className="flex justify-center items-center gap-2">
//                   <Label htmlFor="isDiscounted" className="text-right">
//                     Discounted
//                   </Label>
//                   <input
//                     type="checkbox"
//                     id="isDiscounted"
//                     checked={product.isDiscounted}
//                     onChange={handleChange}
//                     className="col-span-3"
//                   />
//                 </div>
//                 <div className="flex justify-center items-center gap-2">
//                   <Label htmlFor="isOutofstock" className="text-right">
//                     Out of Stock
//                   </Label>
//                   <input
//                     type="checkbox"
//                     id="isOutofstock"
//                     checked={product.isOutofstock}
//                     onChange={handleChange}
//                     className="col-span-3"
//                   />
//                 </div>
//                 <div className="flex justify-center items-center gap-2">
//                   <Label htmlFor="isComingSoon" className="text-right">
//                     Coming Soon
//                   </Label>
//                   <input
//                     type="checkbox"
//                     id="isComingSoon"
//                     checked={product.isComingSoon}
//                     onChange={handleChange}
//                     className="col-span-3"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>
//           <DialogFooter>
//             <Button type="submit">
//               {initialData ? "Save changes" : "Add Product"}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AddProductForm;
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TProduct } from "@/interface/TProduct";
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "@/redux/api/api";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { FaX } from "react-icons/fa6";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const AddProductForm = ({ initialData }: { initialData: TProduct | null }) => {
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [product, setProduct] = useState(
    initialData || {
      name: "",
      price: 0,
      quantity: 0,
      description: "",
      category: "",
      image: [""],
      rating: 0,
      brand: "",
      inStock: true,
      isFeatured: false,
      reviews: 0,
      isBestseller: false,
      isPopular: false,
      isSoldOut: false,
      isDiscounted: false,
      isOutofstock: false,
      isComingSoon: false,
    }
  );
  // const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type, checked } = e.target as HTMLInputElement;
    setProduct({
      ...product,
      [id]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const uploadedImageUrls: string[] = [];
    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.post(imageHostingApi, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.data.success) {
          uploadedImageUrls.push(res.data.data.display_url);
        } else {
          toast.error("Image upload failed");
          return;
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Image upload failed");
        return;
      }
    }

    const formData = {
      ...product,
      image: [...uploadedImageUrls,...product.image],
    };

    try {
      let res;
      if (initialData && "_id" in initialData) {
        res = await updateProduct({ id: initialData._id, data: formData });
      } else {
        res = await addProduct(formData);
      }

      if (res.data.success) {
        toast.success(
          `Product ${initialData ? "updated" : "added"} successfully`
        );
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while uploading the product");
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
          {initialData ? "Edit Product" : "Create New Product"}
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Product" : "Add Product"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Edit the product details and click save."
              : "Fill in the product details and click save."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-2 py-4">
            <div className="">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={product.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            <div className="flex gap-5 justify-between">
              <div className="">
                <div className="flex justify-between gap-5">
                  <div className="">
                    <Label htmlFor="price" className="text-right">
                      Price
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={product.price}
                      onChange={handleChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="quantity" className="text-right">
                      Quantity
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={product.quantity}
                      onChange={handleChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-between gap-5">
                  <div className="">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Input
                      id="category"
                      value={product.category}
                      onChange={handleChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="brand" className="text-right">
                      Brand
                    </Label>
                    <Input
                      id="brand"
                      value={product.brand}
                      onChange={handleChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="">
                <Label htmlFor="image" className="text-right">
                  Images
                </Label>
                {!initialData && (
                  <>
                    <div className="flex gap-1 justify-center items-center mb-3">
                      {selectedFiles?.map((image, idx) => (
                        <div className="relative" key={idx}>
                          <FaX onClick={()=>setSelectedFiles(selectedFiles.filter(item=>image!=item))} className="text-xs cursor-pointer hover:p-[2px] hover:bg-slate-300 absolute top-0 right-0"/>
                          <img
                            src={URL.createObjectURL(image)}
                            alt=""
                            className="h-8 w-8"
                          />
                        </div>
                      ))}
                    </div>

                    <Input
                      id="image"
                      type="file"
                      multiple
               
                      onChange={handleFileChange}
                      className="col-span-3"
                    />
                  </>
                )}
                {initialData && (
                  <>
                    <div className="flex gap-1 justify-center items-center mb-3">
                      {product.image?.map((image) => (
                        <div className="relative" key={image}>
                          <FaX onClick={()=>setProduct({...product,image:product.image.filter(item=>image!=item)})} className="text-xs cursor-pointer hover:p-[2px] hover:bg-slate-300 absolute top-0 right-0"/>
                          <img src={image} alt="" className="h-8 w-8" />
                        </div>
                      ))}
                    </div>
                    <Input
                      id="image"
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="col-span-3"
                    />
                  </>
                )}
              </div>
            </div>

            <div className=" gap-2">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                placeholder="Type your message here."
                id="description"
                value={product.description}
                onChange={handleChange}
                required
              />
            </div>

            {initialData && (
              <div className="grid grid-cols-4 justify-between items-center gap-3">
                <div className="flex justify-center items-center gap-2">
                  <Label htmlFor="inStock" className="text-right">
                    In Stock
                  </Label>
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={product.inStock}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="flex justify-center items-center gap-2">
                  <Label htmlFor="isFeatured" className="text-right">
                    Featured
                  </Label>
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={product.isFeatured}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="flex justify-center items-center gap-2">
                  <Label htmlFor="isBestseller" className="text-right">
                    Bestseller
                  </Label>
                  <input
                    type="checkbox"
                    id="isBestseller"
                    checked={product.isBestseller}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="flex justify-center items-center gap-2">
                  <Label htmlFor="isPopular" className="text-right">
                    Popular
                  </Label>
                  <input
                    type="checkbox"
                    id="isPopular"
                    checked={product.isPopular}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="flex justify-center items-center gap-2">
                  <Label htmlFor="isSoldOut" className="text-right">
                    Sold Out
                  </Label>
                  <input
                    type="checkbox"
                    id="isSoldOut"
                    checked={product.isSoldOut}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="flex justify-center items-center gap-2">
                  <Label htmlFor="isDiscounted" className="text-right">
                    Discounted
                  </Label>
                  <input
                    type="checkbox"
                    id="isDiscounted"
                    checked={product.isDiscounted}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="flex justify-center items-center gap-2">
                  <Label htmlFor="isOutofstock" className="text-right">
                    Out of Stock
                  </Label>
                  <input
                    type="checkbox"
                    id="isOutofstock"
                    checked={product.isOutofstock}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="flex justify-center items-center gap-2">
                  <Label htmlFor="isComingSoon" className="text-right">
                    Coming Soon
                  </Label>
                  <input
                    type="checkbox"
                    id="isComingSoon"
                    checked={product.isComingSoon}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">
              {initialData ? "Save changes" : "Add Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductForm;
