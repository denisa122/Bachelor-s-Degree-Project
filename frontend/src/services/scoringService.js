const Sentiment = require("sentiment");
const sentiment = new Sentiment();

// Categories of questions
const multipleChoiceQuestions = [
  "How do you feel about the day ahead?",
  "Did you sleep well last night?",
  "Do you feel prepared for the day ahead?",
  "Do you feel stressed right now?",
  "Did something specific affect your mood today?",
  "How are you feeling about the rest of your day?",
];

const scaleQuestions = [
  "How would you rate your energy level right now?",
  "What’s your mood as you start the day?",
  "How would you rate your overall mood right now?",
  "What’s your current energy level?",
  "How are you feeling right now?",
];

const yesNoTextQuestions = [
  "Do you feel that your energy level is different from the morning?",
  "Has anything unexpected happened today that significantly affected your mood?",
  "Did you meet your goals for the day?",
];

const textResponseQuestions = [
  "What’s one thing you are looking forward to today?",
  "What’s one thing that could make today great",
  "Any concerns or worries on your mind as you start the day?",
  "What’s been the biggest challenge of your day so far?",
  "What’s one thing you can do to make the rest of your day better?",
  "What’s one positive thing that happened today?",
  "Are there any challenges you encountered?",
  "If you could change one thing about today, what would it be?",
  "What’s one thing you’re proud of after today?",
  "What’s one thing you’d like to improve tomorrow?",
  "Did you learn something new, about yourself or something else, today?",
  "What’s one thing you’re looking forward to tomorrow?",
];

const stressQuestions = ["If you’re feeling stressed, what’s the cause?"];

// Scoring functions

// Multiple choice -> score based on predefined choices
function scoreMultipleChoice(question, response) {
  if (!response) return 0;

  const scoring = {
    "How do you feel about the day ahead?": {
      Excited: 1,
      Neutral: 0,
      Anxious: -1,
    },
    "Did you sleep well last night?": {
      Yes: 1,
      No: -1,
    },
    "Do you feel prepared for the day ahead?": {
      Yes: 1,
      "Somewhat prepared": 0.5,
      No: -1,
    },
    "Do you feel stressed right now?": {
      Yes: -1,
      "Somewhat stressed": 0.5,
      No: 1,
    },
    "Did something specific affect your mood today?": {
      Yes: 1,
      No: 0,
    },
    "How are you feeling about the rest of your day?": {
      Excited: 1,
      Neutral: 0,
      Anxious: -1,
    },
  };

  return scoring[question]?.[response] || 0;
}

// Scale questions -> score based on numeric answer
function scoreScale(question, response) {
  return response && !isNaN(response) ? parseInt(response) : 0;
}

function analyzeSentiment(text) {
  const result = sentiment.analyze(text);
  return result.score;
}

// Yes/No questions with additional text -> sentiment analysis combined with yes/no score
function scoreYesNoWithText(question, response, textResponse) {
  let score = 0;
  if (response === "Yes") {
    score = 1;
  } else if (response === "No") {
    score = 0;
  }

  if (textResponse && textResponse.trim() !== "") {
    const sentimentScore = analyzeSentiment(textResponse);
    score += sentimentScore;
  }

  return score;
}

// Text response questions -> sentiment analysis
function scoreTextResponse(question, textResponse) {
  if (textResponse && textResponse.trim() !== "") {
    return analyzeSentiment(textResponse);
  }
  return 0;
}

// Main score
const calculateScores = (responses) => {
  let moodScore = 0;
  let energyLevel = 0;
  let stressLevel = 0;
  let numQuestions = 0;

  for (const [question, responseData] of Object.entries(responses)) {
    const { questionText, response, textResponse } = responseData;

    if (multipleChoiceQuestions.includes(questionText)) {
      moodScore += scoreMultipleChoice(questionText, response);
    } else if (scaleQuestions.includes(questionText)) {
      energyLevel += scoreScale(questionText, response);
    } else if (yesNoTextQuestions.includes(questionText)) {
      moodScore += scoreYesNoWithText(questionText, response, textResponse);
    } else if (textResponseQuestions.includes(questionText)) {
      moodScore += scoreTextResponse(questionText, textResponse);
    } else if (stressQuestions.includes(questionText)) {
      stressLevel += scoreYesNoWithText(questionText, response, textResponse);
    }

    numQuestions += 1;
  }

  if (numQuestions > 0) {
    moodScore /= numQuestions;
    energyLevel /= numQuestions;
    stressLevel /= numQuestions;
  }

  return {
    moodScore,
    energyLevel,
    stressLevel,
  };
};

module.exports = {
  calculateScores,
};
