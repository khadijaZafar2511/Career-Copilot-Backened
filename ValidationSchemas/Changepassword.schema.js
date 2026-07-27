import {z} from "zod";

const changePasswordSchema = z.object({
    currentPassword : z
        .string()
        .trim()
        .min(5, " Current password must be at least 5 characters")
        .max(30, "current password is too long"),
    newPassword :z.string()
        .trim()
        .min(5, "new password must be at least 5 characters")
        .max(30, "new password is too long"),
    confirmPassword:z.string()
        .trim()
        .min(5, " confirm password must be at least 5 characters")
        .max(30, "confirm password is too long"),
})

export default changePasswordSchema;
