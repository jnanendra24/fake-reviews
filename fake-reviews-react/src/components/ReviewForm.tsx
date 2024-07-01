import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BeatLoader } from "react-spinners";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "./ui/textarea";
import { formSchema } from "@/types";
import { useState } from "react";
const ProductCategories = [
  "Electronics_5",
  "Clothing_Shoes_and_Jewelry_5",
  "Home_and_Kitchen_5",
  "Sports_and_Outdoors_5",
  "Tools_and_Home_Improvement_5",
  "Toys_and_Games_5",
  "Books_5",
  "Pet_Supplies_5",
  "Kindle_Store_5",
  "Movies_and_TV_5",
  "Baby",
  "Office Products",
  "Beauty",
  "Health & Personal Care",
  "Grocery",
  "Luggage",
  "Lawn and Garden",
  "Musical Instruments",
  "Automotive",
];
function ReviewForm() {
  const [prediction, setPrediction] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_category: undefined,
      review_text: "",
      rating: "",
      model: "kaggle",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    const res = await fetch(`http://127.0.0.1:5000/predict`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setPrediction(data.prediction);
  }

  return (
    <Card className="w-[50vw] mx-auto my-2">
      <CardHeader>
        <CardTitle>Review Assessment</CardTitle>
        <CardDescription>
          Know Genuinity of a review in one-click.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {form.formState.isSubmitting && (
          <BeatLoader className="m-auto w-fit" color="#0f172a" />
        )}
        {prediction && (
          <div className="p-4 bg-gray-100 rounded-md">
            <p className="text-lg font-semibold">{prediction}</p>
          </div>
        )}
        {!form.formState.isSubmitting && !prediction && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="product_category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Category</FormLabel>
                    <Select onValueChange={(value) => field.onChange(value)}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Product Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ProductCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category.split("_").join(" ").replace("5", "")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Rating 0 to 5"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="review_text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Review</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type Review Here..."
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="kaggle" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Model trained on Kaggle dataset
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="combined" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Model trained on Kaggle + amazon dataset
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Submit
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}

export default ReviewForm;
