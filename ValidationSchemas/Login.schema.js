import { z } from "zod";


 const LoginSchema = z.object({
   email: z
     .email({ pattern: z.regexes.email }, "enter a valid email")
     .trim()
     .toLowerCase(),
   password: z
     .string()
     .trim()
     .min(5, "Password must be atleast 5 character long")
     .max(50)
   
 });


export default LoginSchema;
