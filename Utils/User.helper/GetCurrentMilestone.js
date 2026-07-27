import { getactiveRoadmap } from "./GetActiveRoadmap.js"


const getCurrentMilestone = async (activeRoadmap) => {
  return activeRoadmap.currentMilestone;
};


export {getCurrentMilestone}