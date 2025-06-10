import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useFetchAllCategories } from "@/queries/admin-queries";

// Update schema untuk semua field menu
const FormSchema = z.object({
  item_name: z
    .string()
    .min(3, "Menu name must be at least 3 characters")
    .max(100, "Menu name must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  price: z.coerce
    .number()
    .min(0, "Price must be positive")
    .max(1000000, "Price is too high"),
  category_id: z.string({
    required_error: "Please select a category",
  }),
  is_available: z.boolean().default(true),
});

export default function CreateMenuModal({ show, onClose }) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      item_name: "",
      description: "",
      price: "",
      category_id: "",
      is_available: true,
    },
  });

  function onSubmit(data) {
    console.log("🚀 ~ onSubmit ~ data:", data);
    // Handle submission, e.g., API call to save menu item
    // You could add createMenu function here
    // After successful submission, close the modal
    // onClose();
  }

  const { data: categories, isLoading: categoriesLoading } =
    useFetchAllCategories({
      enabled: show,
    });

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="bg-white dark:bg-black rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto text-left align-middle transform transition-all p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Create New Menu Item
                </h2>

                <div className="w-full">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="w-full space-y-6"
                    >
                      {/* Menu Name */}
                      <FormField
                        control={form.control}
                        name="item_name"
                        render={({ field }) => (
                          <FormItem className={"w-full"}>
                            <FormLabel>Menu Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter menu name" {...field} />
                            </FormControl>
                            <FormDescription>
                              Enter the name of the menu item
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Description */}
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem className={"w-full"}>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter menu description"
                                className="min-h-24"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Provide a detailed description of the menu item
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Price */}
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem className={"w-full"}>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} />
                            </FormControl>
                            <FormDescription>
                              Set the price in your currency
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Category */}
                      <FormField
                        control={form.control}
                        name="category_id"
                        render={({ field }) => (
                          <FormItem className={"w-full"}>
                            <FormLabel>Category</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={categoriesLoading}
                            >
                              <FormControl className="w-full">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categoriesLoading ? (
                                  <SelectItem value="" disabled>
                                    Loading...
                                  </SelectItem>
                                ) : (
                                  categories?.map((category) => (
                                    <SelectItem
                                      key={category.category_id}
                                      value={String(category.category_id)}
                                    >
                                      {category.category_name}
                                    </SelectItem>
                                  ))
                                )}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Select the category this menu item belongs to
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Availability */}
                      <FormField
                        control={form.control}
                        name="is_available"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Available</FormLabel>
                              <FormDescription>
                                Is this menu item currently available for order?
                              </FormDescription>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Form Actions */}
                      <div className="flex justify-end space-x-4 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={onClose}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">Create Menu Item</Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
