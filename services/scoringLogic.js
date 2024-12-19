const Sentiment = require("sentiment");
const sentiment = new Sentiment();

const calculateScores = (responses) => {
  let moodScore = 0;
  let energyLevel = 0;
  let stressLevel = 0;

  responses.forEach(({ questionID, answer }) => {
    switch (questionID) {
      // Morning questionnaire
      case "33":
        if (answer === "Excited") moodScore += 1;
        if (answer === "Neutral") moodScore += 0;
        if (answer === "Anxious") moodScore -= 1;
        break;
      case "34":
        if (answer === "Yes") energyLevel += 3;
        if (answer === "No") energyLevel -= 3;
        break;
      case "35":
      case "36":
      case "37":
        if (answer === "Yes") moodScore -= 1;
        if (answer === "No") moodScore += 1;
        break;
      case "38":
        energyLevel += parseInt(answer) || 0;
        break;
      case "39":
        moodScore += parseInt(answer) || 0;
        break;
      case "40":
        if (answer === "Yes") moodScore += 1;
        if (answer === "Somewhat prepared") moodScore += 0;
        if (answer === "No") moodScore -= 1;
        break;
      case "41":
      case "42":
        if (answer === "Yes") moodScore -= 1;
        if (answer === "No") moodScore += 1;
        break;
      case "43":
        if (answer === "Yes") moodScore += 1;
        if (answer === "No") moodScore -= 1;
        break;
      default:
        break;
    }
  });

  return { moodScore, energyLevel, stressLevel };
};

module.exports = {
    calculateScores,
};
