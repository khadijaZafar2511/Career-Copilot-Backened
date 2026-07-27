// Utils/isOnboardingComplete.js

const isOnboardingComplete = (user) => {
  const requiredFields = [
    "careerGoal",
    "skillLevel",
    "weeklyHours",
    "targetPace",
    "timeline",
    "dailyReminder",
  ];

  return requiredFields.every((field) => {
    const value = user[field];

    // Handle strings
    if (typeof value === "string") {
      return value.trim() !== "";
    }

    // Handle null/undefined
    return value !== null && value !== undefined;
  });
};

export default isOnboardingComplete;
