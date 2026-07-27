import Quiz from "../../Models/Quiz.model.js";
import ApiError from "../ApiError.js"
const getQuiz = async (milestoneId) => {
    // console.log(milestoneId);
     const quiz = await Quiz.findOne({ milestoneId });
        if (!quiz) {
            throw new ApiError(404,"Quiz for this  roadmap has not found")
    }
    return quiz;
}

export { getQuiz };