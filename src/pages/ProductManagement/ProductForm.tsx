import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useAddProductMutation, useUpdateProductMutation } from "@/redux/api/api";
import { useState } from "react";

const AddProductForm = ({ initialData }) => {
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [product, setProduct] = useState(
    initialData || {
      name: "",
      price: 0,
      quantity: 0,
      description: "",
      category: "",
      image: "",
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

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setProduct({
      ...product,
      [id]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData) {
      updateProduct({ id: product._id, data: product });
    } else {
      addProduct(product);
      console.log(product)
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload logic here
      setProduct({ ...product, image: URL.createObjectURL(file) });
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
              <div className="">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                {!initialData&&<Input
                  id="image"
                  type="file"
                  onChange={handleFileChange}
                  className="col-span-3"
                />}
                {initialData&&<Input
                  id="image"
                  value={product.image}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                />}
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
                  <Checkbox
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
                  <Checkbox
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
                  <Checkbox
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
                  <Checkbox
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
                  <Checkbox
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
                  <Checkbox
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
                  <Checkbox
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
                  <Checkbox
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
