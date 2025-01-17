const Sentiment = require("sentiment");
const sentiment = new Sentiment();

const calculateScores = (responses) => {
  let moodScore = 0;
  let energyLevel = 0;
  let stressLevel = 0;

  responses.forEach(({ questionID, answer }) => {
    switch (questionID) {
      // Morning questionnaire
      case 5569:
        if (answer === "Excited") moodScore += 1;
        else if (answer === "Neutral") moodScore += 0;
        else if (answer === "Anxious") moodScore -= 1;
        break;
      case 5570:
        if (answer === "Yes") energyLevel += 3;
        else if (answer === "No") energyLevel -= 3;
        break;
      case 5571:
      case 5572:
      case 5573:
        if (answer === "Yes") moodScore -= 1;
        else if (answer === "No") moodScore += 1;
        break;
      case 5574:
        energyLevel += parseInt(answer) || 0;
        break;
      case 5575:
        moodScore += parseInt(answer) || 0;
        break;
      case 5576:
        if (answer === "Yes") moodScore += 1;
        else if (answer === "Somewhat prepared") moodScore += 0;
        else if (answer === "No") moodScore -= 1;
        break;
      case 5577:
      case 5578:
        if (answer === "Yes") moodScore -= 1;
        else if (answer === "No") moodScore += 1;
        break;
      case 5579:
        if (answer === "Yes") moodScore += 1;
        else if (answer === "No") moodScore -= 1;
        break;
      // Midday questionnaire
      case 5580:
        moodScore = 0;
        energyLevel = 0;
        stressLevel = 0;
        moodScore += parseInt(answer) || 0;
        break;
      case 5581:
        if (answer === "Yes") moodScore -= 1;
        else if (answer === "No") moodScore += 1;
        break;
      case 5582:
      case 5583:
      case 5584:
      case 5585:
        if (answer === "Yes") moodScore -= 1;
        else if (answer === "No") moodScore += 1;
        break;
      case 5586:
      case 5587:
      case 5588:
        energyLevel += parseInt(answer) || 0;
        break;
      case 5589:
        if (answer === "Yes") stressLevel -= 1;
        else if (answer === "No") stressLevel += 1;
        break;
      case 5590:
        if (answer === "Work") stressLevel -= 1;
        else if (answer === "Studies") stressLevel -= 1;
        else if (answer === "Family") stressLevel -= 1;
        else if (answer === "Friends") stressLevel -= 1;
        break;
      case 5591:
        if (answer === "Excited") moodScore += 1;
        else if (answer === "Neutral") moodScore += 0;
        else if (answer === "Anxious") moodScore -= 1;
        break;
      // Evening questionnaire
      case 5592:
        moodScore = 0;
        energyLevel = 0;
        stressLevel = 0;
        moodScore += parseInt(answer) || 0;
        break;
      case 5593:
        energyLevel += parseInt(answer) || 0;
        break;
      case 5594:
        if (answer === "Yes") stressLevel += 1;
        else if (answer === "No") stressLevel += 0;
        break;
      case 5595:
        if (answer === "Yes") moodScore -= 1;
        else if (answer === "No") moodScore += 0;
        break;
      case 5596:
        if (answer === "Yes") moodScore += 1;
        else if (answer === "No") moodScore -= 1;
        break;
      case 5597:
      case 5598:
      case 5599:
      case 5600:
      default:
        console.log(`No scoring logic for questionID: ${questionID}`);
        break;
    }
  });

  console.log("Responses inside calculateScores: ", responses);
  console.log("Calculated moodScore: ", moodScore);
  console.log("Calculated energyLevel: ", energyLevel);
  console.log("Calculated stressLevel: ", stressLevel);

  return { moodScore, energyLevel, stressLevel };
};

module.exports = {
  calculateScores,
};
