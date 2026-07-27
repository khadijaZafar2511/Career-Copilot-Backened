// import { z } from "zod";

// const signupSchema = z.object({
//   fullname: z
//     .string()
//     .trim()
//     .min(3, "Name must be atleast 3 character ")
//     .nonempty("Name is required"),
//   email: z
//     .email({ pattern: z.regexes.email }, "Enter a valid email")
//      .toLowerCase(),
//     password: z
//     .string()
//     .min(5, "Password must be atleast 5 character long")
//     .max(50)
//     .nonempty("Password is required"),
//   onboardingCompleted: z.boolean().default(false)
// });


// export default signupSchema; 
import { z } from "zod"; // 1. Added quotation marks around zod

const signupSchema = z.object({
  fullname: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters") // 2. Wrapped messages in quotes
    .min(1, "Name is required"), // 3. Replaced .nonempty() with .min(1)

  email: z
    .string() // 4. Fixed email method chain
    .email("Enter a valid email")
    .toLowerCase(),

  password: z
    .string()
    .min(5, "Password must be at least 5 characters long")
    .max(50)
    .min(1, "Password is required"), // 5. Replaced .nonempty() with .min(1)

  onboardingCompleted: z.boolean().default(false),
});

export default signupSchema;
