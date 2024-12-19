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
      // Midday questionnaire
      case "44":
        moodScore = 0;
        energyLevel = 0;
        stressLevel = 0;
        moodScore += parseInt(answer) || 0;
        break;
      case "45":
        if (answer === "Yes") moodScore -= 1;
        if (answer === "No") moodScore += 1;
        break;
      case "46":
      case "47":
      case "48":
      case "49":
        if (answer === "Yes") moodScore -= 1;
        if (answer === "No") moodScore += 1;
        break;
      case "50":
      case "51":
      case "52":
        energyLevel += parseInt(answer) || 0;
        break;
      case "53":
        if (answer === "Yes") stressLevel -= 1;
        if (answer === "No") stressLevel += 1;
        break;
      case "54":
        if (answer === "Work") stressLevel -= 1;
        if (answer === "Studies") stressLevel -= 1;
        if (answer === "Family") stressLevel -= 1;
        if (answer === "friends") stressLevel -= 1;
        break;
      case "55":
        if (answer === "Excited") moodScore += 1;
        if (answer === "Neutral") moodScore += 0;
        if (answer === "Anxious") moodScore -= 1;
        break;
      // Evening questionnaire
      case "56":
        moodScore = 0;
        energyLevel = 0;
        stressLevel = 0;
        moodScore += parseInt(answer) || 0;
        break;
      case "57":
        energyLevel += parseInt(answer) || 0;
        break;
      case "58":
        if (answer === "Yes") stressLevel += 1;
        if (answer === "No") stressLevel += 0;
        break;
      case "59":
        if (answer === "Yes") moodScore -= 1;
        if (answer === "No") moodScore += 0;
        break;
      case "60":
        if (answer === "Yes") moodScore += 1;
        if (answer === "No") moodScore -= 1;
        break;
      case "61":
      case "62":
      case "63":
      case "64":
      default:
        break;
    }
  });

  return { moodScore, energyLevel, stressLevel };
};

module.exports = {
  calculateScores,
};
