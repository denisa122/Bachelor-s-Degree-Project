import React from "react";

import "./Journal.css";

// Icons & images
import Logo from "../../assets/logo.png";
import JournalImage from "../../assets/journal.png";
import WriteIcon from "../../assets/write-icon.svg";
import MoreIcon from "../../assets/more-icon.svg";

import Navigation from "../Navigation/Navigation";
import JournalEntry from "./JournalEntry";

const Journal = () => {
  return (
    <div className="flex flex-row">
      <Navigation />
      <div className="journalPage">
        <div className="headerJournalPage">
          <img src={Logo} alt="Logo" className="logoJournal"></img>
          <h1 className="text-3xl mb-1 mt-2">Your Journal</h1>
          <h2 className="italic text-lg">
            A space to express, explore and grow
          </h2>
        </div>

        <div className="mt-[40px] flex flex-row items-center">
          <img src={JournalImage} alt="Journal" className="journalImage"></img>
          <div className="flex flex-col">
            <h2 className="sectionTitle !mb-2.5">Capture Your Thoughts</h2>
            <p className="sectionText">
              Journaling is more than just writing—it’s a powerful way to
              understand your emotions, gain clarity, and embrace personal
              growth. Each word you write becomes part of your journey, helping
              you reflect on the past, focus on the present, and plan for the
              future. Whether it’s a fleeting thought, a big idea, or a simple
              reflection, your journal is a space that’s entirely yours. Take
              the first step and discover the joy of putting your thoughts into
              words
            </p>
            <a
              href="/journal"
              className="flex flex-row items-center buttonWithBorder w-[120px]"
            >
              <img
                src={WriteIcon}
                alt="journal writing icon"
                className="buttonIconJournal"
              ></img>
              <button className="text-sm">Start writing</button>
            </a>
          </div>
        </div>

        <div className="sectionLeft journalEntriesSection mt-10">
          <h1 className="sectionTitle">
            Explore your previous journal entries
          </h1>
          <div className="flex flex-row items-baseline">
            <p className="sectionText mr-1.5">December 2024</p>
            <img src={MoreIcon} alt="more icon"></img>
          </div>

          <div className="entries">
            <JournalEntry
              title="A Rainy Day for the Soul"
              date="December 1, 2024"
              entry="Today was one of those days where I felt like time moved both too quickly and too slowly. I woke up to the sound of rain tapping on the window, which set the tone for a calm but reflective morning. I couldn’t help but think about how far I’ve come over the last few months—navigating challenges I never thought I’d overcome. It’s strange how the hardest moments shape us the most. I spent the afternoon organizing my workspace, and even though it felt mundane, there was something satisfying about finding order in the chaos. I paused for a while, staring out the window, watching the rain slide down the glass. I thought about all the things I’ve been holding onto—old fears, misplaced guilt, unnecessary doubts—and decided it’s time to let go of some of them. It feels like a small step, but I know it’s part of something bigger. Tonight, I’ll light a candle, drink some tea, and remind myself that growth takes time."
            />
            <JournalEntry
              title="Seeking Joy in Simplicity"
              date="December 2, 2024"
              entry="I had an unexpected moment of joy today. While walking through the park, I noticed a group of kids playing with a kite. There was something so carefree and innocent about it can be if we let it. I stood there for a few minutes, watching the kite dip and soar against the bright blue sky. It made me think about my own childhood, the days when I didn’t overthink everything or feel the weight of expectations. I miss that version of myself sometimes.

Afterward, I found a bench and just sat, letting my thoughts wander. It struck me how rare it is to pause like this—to just exist without rushing to the next task. The world felt a little quieter in that moment, and I realized how much I’ve been craving simplicity. Later in the day, I tackled some work, but my mind kept returning to the kite. Maybe it’s a sign to seek out more of those small, joyful moments. Life doesn’t have to be so serious all the time. I ended the day with a short walk, breathing in the cool evening air, feeling a little lighter, and strangely hopeful."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
