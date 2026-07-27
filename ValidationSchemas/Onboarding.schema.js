import { z } from "zod";

const onboardingSchema = z.object({
  career: z.string().trim().min(1, "Career field is required"),

  skillLevel: z.enum(["Beginner", "Intermediate", "Expert"], {
    errorMap: () => ({ message: "Please select a valid skill level" }),
  }),
         
  targetPace: z.enum(["Slow", "Moderate", "Aggressive"], {
    errorMap: () => ({ message: "Please select a target pace" }),
  }),

  timeline: z.string().trim().min(1, "Timeline field is required"),

  dailyReminder: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please enter a valid time (HH:MM)",
  }),

  weeklyHours: z.coerce
    .number({ invalid_type_error: "Weekly hours must be a number" })
    .min(1, "Must study at least 1 hour per week")
    .max(168, "Hours cannot exceed a full week"),
});

export default onboardingSchema;
