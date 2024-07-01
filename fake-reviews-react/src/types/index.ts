import { z } from "zod";
export const formSchema = z.object({
  review_text: z.string().min(1, { message: "Review text cannot be empty" }),
  rating: z
    .string()
    .regex(/^[0-5]$/, { message: "Rating should be between 0 and 5" }),
  product_category: z.enum(
    [
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
    ],
    { message: "Product category is required" }
  ),
  model: z.enum(["kaggle", "combined"], { message: "Model is required" }),
});

export type ReviewPayload = {
  review_text: string;
  rating: string;
  product_category: string;
};
