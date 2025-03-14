/* File to populate the db tables with some initial data */
INSERT INTO questionnaires (title, "timeOfDay", description)
SELECT * FROM (SELECT 'Morning Questionnaire', 'Morning', 'Start your day by capturing your initial mood and setting your intentions. Reflect on your goals, expectations, and how prepared you feel for the day ahead.') AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM questionnaires WHERE title = 'Morning Questionnaire'
);

INSERT INTO questionnaires (title, "timeOfDay", description)
SELECT * FROM (SELECT 'Midday Questionnaire', 'Midday', 'Take a moment to process how your day is unfolding. Reflect on key events, challenges, and accomplishments, and see how your mood is evolving.') AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM questionnaires WHERE title = 'Midday Questionnaire'
);

INSERT INTO questionnaires (title, "timeOfDay", description)
SELECT * FROM (SELECT 'Evening Questionnaire', 'Evening', 'End your day by checking in on your emotional and energy shifts. This helps track any fluctuations in mood or stress and gives you a chance to unwind.') AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM questionnaires WHERE title = 'Evening Questionnaire'
);

INSERT INTO questions ("questionnaireID", text, type, options) VALUES
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Morning Questionnaire'), 'How do you feel about the day ahead?', 'Multiple Choice', '["Excited", "Anxious", "Neutral"]'),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Morning Questionnaire'), 'Did you sleep well last night?', 'Multiple Choice', '["Yes", "No"]'),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Morning Questionnaire'), 'What is one thing you are looking forward to today?', 'Text', NULL),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Morning Questionnaire'), 'What is one thing that could make today great', 'Text', NULL),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Morning Questionnaire'), 'Any concerns or worries on your mind as you start the day?', 'Yes/No, Text', '["Yes", "No"]' ),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Morning Questionnaire'), 'How would you rate your energy level right now?', 'Scale', NULL),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Morning Questionnaire'), 'What’s your mood as you start the day? ', 'Scale', NULL),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Morning Questionnaire'), 'Do you feel prepared for the day ahead? ', 'Multiple Choice', '["Yes", "Somewhat prepared", "No"]'),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Morning Questionnaire'), 'What’s a small win you’d like to achieve today?', 'Text', NULL),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Morning Questionnaire'), 'Do you anticipate any challenges today?', 'Yes/No, Text', NULL),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Morning Questionnaire'), 'Is there someone you’d like to connect with today?', 'Yes/No, Text', '["Yes", "No"]'),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Midday Questionnaire'), 'How would you rate your overall mood right now?', 'Scale', NULL),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Midday Questionnaire'), 'Did something specific affect your mood today?', 'Multiple Choice, Text', '["Yes", "No"]'),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Midday Questionnaire'), 'What’s been the biggest challenge of your day so far?', 'Text', NULL),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Midday Questionnaire'), 'What’s one thing you can do to make the rest of your day better?', 'Text', NULL),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Midday Questionnaire'), 'What’s one positive thing that happened today?', 'Text', NULL),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Midday Questionnaire'), 'Did any unexpected events affect your day?', 'Yes/No, Text', '["Yes", "No"]'),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Midday Questionnaire'), 'Are there any challenges you encountered?', 'Text', NULL),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Midday Questionnaire'), 'If you could change one thing about today, what would it be?', 'Text', NULL),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Midday Questionnaire'), 'What’s your current energy level?', 'Scale', NULL),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Midday Questionnaire'), 'Do you feel stressed right now?', 'Multiple Choice', '["Yes", "Somewhat stressed", "No"]'),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Midday Questionnaire'), 'If you’re feeling stressed, what’s the cause?', 'Multiple Choice', '["Work", "Studies", "Family", "Friends", "Other"]'),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Midday Questionnaire'), 'How are you feeling about the rest of your day?', 'Multiple Choice', '["Excited", "Anxious", "Neutral"]'),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Evening Questionnaire'), 'How are you feeling right now?', 'Scale', NULL),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Evening Questionnaire'), 'How is your energy level at this moment?', 'Scale', NULL),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Evening Questionnaire'), 'Do you feel that your energy level is different from the morning?', 'Yes/No, Text', '["Yes", "No"]'),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Evening Questionnaire'), 'Has anything unexpected happened today that significantly affected your mood?', 'Yes/No, Text', '["Yes", "No"]'),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Evening Questionnaire'), 'Did you meet your goals for the day?', 'Multiple Choice', '["Yes", "No", "Partially"]'),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Evening Questionnaire'), 'What’s one thing you’re proud of after today?', 'Text', NULL),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Evening Questionnaire'), 'What’s one thing you’d like to improve tomorrow? ', 'Text', NULL),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Evening Questionnaire'), 'Did you learn something new, about yourself or something else, today?', 'Text', NULL),
((SELECT "questionnaireID" FROM questionnaires WHERE title = 'Evening Questionnaire'), 'What’s one thing you’re looking forward to tomorrow?', 'Text', NULL);

INSERT INTO mood_entries (date, "timeOfDay", "moodScore", "energyLevel", "stressLevel", "userID")
SELECT new_data.date, new_data."timeOfDay", new_data."moodScore", new_data."energyLevel", new_data."stressLevel", new_data."userID"
FROM (
    SELECT 
        (CURRENT_DATE - INTERVAL '7 days') + INTERVAL '08:00:00' AS date, 'Morning' AS "timeOfDay", 8 AS "moodScore", 7 AS "energyLevel", 2 AS "stressLevel", 3 AS "userID"
    UNION ALL
    SELECT (CURRENT_DATE - INTERVAL '7 days') + INTERVAL '12:00:00', 'Midday', 6, 5, 3, 3
    UNION ALL
    SELECT (CURRENT_DATE - INTERVAL '7 days') + INTERVAL '20:00:00', 'Evening', 7, 6, 1, 3
    UNION ALL
    SELECT (CURRENT_DATE - INTERVAL '6 days') + INTERVAL '08:00:00', 'Morning', 5, 4, 6, 3
    UNION ALL
    SELECT (CURRENT_DATE - INTERVAL '6 days') + INTERVAL '12:00:00', 'Midday', 7, 5, 2, 3
    UNION ALL
    SELECT (CURRENT_DATE - INTERVAL '6 days') + INTERVAL '20:00:00', 'Evening', 6, 5, 3, 3
    UNION ALL
    SELECT (CURRENT_DATE - INTERVAL '5 days') + INTERVAL '08:00:00', 'Morning', 6, 6, 4, 3
    UNION ALL
    SELECT (CURRENT_DATE - INTERVAL '5 days') + INTERVAL '12:00:00', 'Midday', 8, 7, 1, 3
    UNION ALL
    SELECT (CURRENT_DATE - INTERVAL '5 days') + INTERVAL '20:00:00', 'Evening', 5, 4, 5, 3
    UNION ALL
    SELECT (CURRENT_DATE - INTERVAL '4 days') + INTERVAL '08:00:00', 'Morning', 7, 8, 2, 3
    UNION ALL
    SELECT (CURRENT_DATE - INTERVAL '4 days') + INTERVAL '12:00:00', 'Midday', 5, 6, 4, 3
    UNION ALL
    SELECT (CURRENT_DATE - INTERVAL '4 days') + INTERVAL '20:00:00', 'Evening', 6, 5, 3, 3
    UNION ALL
    SELECT (CURRENT_DATE - INTERVAL '3 days') + INTERVAL '08:00:00', 'Morning', 4, 3, 7, 3
    UNION ALL
    SELECT (CURRENT_DATE - INTERVAL '3 days') + INTERVAL '12:00:00', 'Midday', 6, 5, 5, 3
    UNION ALL
    SELECT (CURRENT_DATE - INTERVAL '3 days') + INTERVAL '20:00:00', 'Evening', 8, 7, 2, 3
    UNION ALL
    SELECT (CURRENT_DATE - INTERVAL '2 days') + INTERVAL '08:00:00', 'Morning', 7, 8, 3, 3
    UNION ALL
    SELECT (CURRENT_DATE - INTERVAL '2 days') + INTERVAL '12:00:00', 'Midday', 6, 5, 4, 3
    UNION ALL
    SELECT (CURRENT_DATE - INTERVAL '2 days') + INTERVAL '20:00:00', 'Evening', 5, 4, 6, 3
    UNION ALL
    SELECT (CURRENT_DATE - INTERVAL '1 days') + INTERVAL '08:00:00', 'Morning', 8, 7, 1, 3
    UNION ALL
    SELECT (CURRENT_DATE - INTERVAL '1 days') + INTERVAL '12:00:00', 'Midday', 7, 6, 2, 3
    UNION ALL
    SELECT (CURRENT_DATE - INTERVAL '1 days') + INTERVAL '20:00:00', 'Evening', 6, 5, 3, 3
) AS new_data
WHERE NOT EXISTS (
    SELECT 1 FROM mood_entries 
    WHERE mood_entries.date = new_data.date
    AND mood_entries."timeOfDay" = new_data."timeOfDay"
);



