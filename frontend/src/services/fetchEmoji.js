import axios from "axios";
import sentimentToEmojiMapping from "./sentimentToEmojiMapping";

const fetchEmoji = async (searchTerm) => {
  const mappedTerm = sentimentToEmojiMapping[searchTerm.toLowerCase()];
  if (mappedTerm) {
    return mappedTerm;
  }

  try {
    const response = await axios.get(
      `https://emoji-api.com/emojis?search=${searchTerm}&access_key=94c5fb159b5c2a42004ce7822750bec5054e1205`
    );
    const emoji = response.data[0]?.character;
    return emoji || "🤔";
  } catch (error) {
    console.error("Error fetching emoji: ", error);
    return "🤔";
  }
};

export default fetchEmoji;
