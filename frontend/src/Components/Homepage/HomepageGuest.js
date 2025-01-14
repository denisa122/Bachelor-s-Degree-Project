import React from "react";
import { Link } from "react-router-dom";

import "./HomepageGuest.css";

import NavigationGuest from "../Navigation/NavigationGuest";
import Footer from "../Footer/Footer";

import Avatar1 from "../../assets/avatar1.png";
import Avatar2 from "../../assets/avatar2.png";
import Avatar3 from "../../assets/avatar3.png";
import Avatar4 from "../../assets/avatar4.png";
import Avatar5 from "../../assets/avatar5.png";
import Stars from "../../assets/stars.png";


import HeroImg from "../../assets/hero-img.png";
import JournalEntry from "../../assets/journal-entry-with-text.png";
import MoodTrendsGraph from "../../assets/mood-trends-graph.png";
import SentimentAnalysisPieChart from "../../assets/sentiment-alaysis-pie-chart.png";

const HomepageGuest = () => {
  return (
    <div>
      <NavigationGuest />
      <div className="headerSection" id="header">
        <div className="flex justify-center">
          <div className="max-w-[480px] text-left">
            <h1 className="headerTitle">
              MindScribe: Your Space for Reflection and Growth
            </h1>
            <h2 className="headerSubtitle">
              A platform designed to guide your emotional journey through safe
              and meaningful expression.
            </h2>

            <input type="email" placeholder="Email" className="inputHeader" />
            <button
              type="submit"
              className="buttonHeader w-[160px] hover:bg-primary-accent-300 font-medium text-medium"
            >
              Sign up - it's free!
            </button>
          </div>
        </div>

        <div className="hidden lg:block mt-[320px] z-[3] pt-5">
          <img src={HeroImg} alt="hero image" className="heroImg"></img>
        </div>

        <div class="custom-shape-divider-bottom-1736776159">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
      </div>

      <div className="featuresSection mt-[40px]" id="features">
        <div className="featuresSectionHeader">
          <p className="text-sm mb-1">Our features</p>
          <h1 className="text-2xl font-medium mb-4">
            Tools to Support Your Emotional Journey
          </h1>
          <p className="text-base">
            MindScribe combines modern technology with compassionate design to
            provide tools that help you understand and nurture your mental
            well-being. Here’s how our features make a difference:
          </p>
        </div>

        <div className="flex flex-col mt-[60px]">
          <div className="feature">
            <img
              src={JournalEntry}
              alt="feature image"
              className="featureImg"
            ></img>
            <div>
              <h4 className="text-3xl font-medium mb-4">
                Unfold your mind through journaling
              </h4>
              <p className="featuresDescription">
                Express your thoughts freely in a secure and private space
                designed to encourage honest self-reflection. Journaling serves
                as a powerful tool to process complex emotions, unravel the
                intricacies of your thoughts, and gain clarity amidst life’s
                uncertainties. By dedicating time to write about your daily
                experiences, challenges, and triumphs, you can foster a deeper
                understanding of your inner world, improve emotional resilience,
                and build a meaningful narrative around your personal growth
                journey.
              </p>
            </div>
          </div>

          <div className="feature">
            <div>
              <h4 className="text-3xl font-medium mb-4">
                Navigate your emotions
              </h4>
              <p className="featuresDescription">
                Leveraging the power of advanced sentiment analysis, our
                platform transforms your journal entries and mood tracking data
                into actionable, personalized insights. By analyzing the
                emotions, keywords, and patterns in your inputs, we help you
                uncover the deeper story behind your emotional journey. Whether
                you're looking to gain clarity, track your growth, or simply
                stay attuned to your emotions, these tailored insights provide
                the tools to navigate life’s ups and downs with greater
                confidence and self-awareness.
              </p>
            </div>
            <img
              src={SentimentAnalysisPieChart}
              alt="feature image"
              className="featureImg xl:mr-[80px]"
            ></img>
          </div>

          <div className="feature">
            <img
              src={MoodTrendsGraph}
              alt="feature image"
              className="h-[280px]"
            ></img>
            <div>
              <h4 className="text-3xl font-medium mb-4">
                Transform reflections into meaningful insights
              </h4>
              <p className="featuresDescription">
                Take charge of your emotional well-being with our intuitive mood
                tracking feature. By answering daily mood tracker
                questionnaires, you can monitor your mood score, stress levels,
                and energy fluctuations over time. Gain valuable insights into
                patterns and triggers affecting your emotional state, empowering
                you to make informed decisions about your mental health.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="shareSection" id="shareWithTherapist">
        <div className="max-w-[800px]">
          <h1 className="text-2xl font-medium pb-[30px]">
            Share with Your Therapist
          </h1>

          <p className="text-lg mb-4">
            Sharing your mental wellness journey with your therapist has never
            been easier. With just a few clicks, you can{" "}
            <strong>
              export your journal entries, mood analysis, and personalized
              insights
            </strong>{" "}
            as comprehensive PDFs. Whether it's tracking your emotional growth,
            identifying patterns in your mood, or reviewing your reflections,
            our platform ensures that all your data is{" "}
            <strong>ready to share</strong>, simplifying your therapy sessions.
          </p>

          <p className="text-lg mb-4">
            <strong>Empower your therapist</strong> with{" "}
            <strong>clear and detailed insights</strong>, so they can better
            support you on your path to mental well-being.{" "}
            <span className="text-white font-semibold">No more guesswork!</span>{" "}
            Everything you need to share is right at your fingertips, in a{" "}
            <strong>simple, streamlined format</strong>.
          </p>

          <div className="mb-6"></div>

          <p className="text-lg mb-4">
            With seamless PDF export options,{" "}
            <strong>sharing your progress is quick, simple, and secure</strong>.
            No more scrambling for notes or summarizing your emotional journey –
            everything is <strong>organized and easily accessible</strong>.
            Whether you're in therapy or simply want to share your experiences
            with others who support your mental health, this feature ensures
            that your insights are always at your fingertips.
          </p>

          <p className="text-lg mb-4">
            Make your therapy sessions more <strong>productive</strong> and{" "}
            <strong>focused</strong> with just one click.
          </p>

          <a
            href="/register"
            data-twe-ripple-init
            data-twe-ripple-color="light"
            className="buttonGetStarted me-3 inline-block bg-[#5A77AC] rounded px-6 pb-2 pt-2.5 text-medium font-medium leading-normal text-[#ffe5d9] shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          >
            Get started now
          </a>
        </div>
      </div>

      <div className="reviewsSection" id="testimonials">
        <h1 className="text-2xl font-medium mb-[60px]">
          See what our members say about MindScribe
        </h1>

        <div className="flex-container">
          <div className="firstRow">
            <div className="flex flex-row items-center mb-3">
              <img
                src={Avatar1}
                alt="profile icon"
                className="profileIcon"
              ></img>
              <div>
                <p className="reviewName">Christian</p>
                <img src={Stars} alt="review stars"></img>
              </div>
            </div>
            <p>
              MindScribe has truly been a game-changer for me. The daily mood
              tracking allows me to gain insights into my emotional patterns,
              which has been incredibly helpful in therapy. It's easy to use,
              and I feel more in control of my mental well-being. I never
              realized how much my mood fluctuates day-to-day, but now I can
              clearly see those shifts. It’s an invaluable tool that helps me
              stay focused and grounded.
            </p>

            <div className="flex flex-row mt-10 items-center mb-3">
              <img
                src={Avatar2}
                alt="profile icon"
                className="profileIcon"
              ></img>
              <div>
                <p className="reviewName">Janine</p>
                <img src={Stars} alt="review stars"></img>
              </div>
            </div>
            <p>
              I’ve been using MindScribe for a few months now, and the insights
              I’ve gained have helped me understand my emotions better. The
              ability to track my stress and energy levels, alongside my mood,
              has made me more aware of the things that trigger certain
              feelings.
            </p>
          </div>

          <div className="secondRow">
            <div className="flex flex-row items-center mb-3">
              <img
                src={Avatar4}
                alt="profile icon"
                className="profileIcon"
              ></img>
              <div>
                <p className="reviewName">Josephine</p>
                <img src={Stars} alt="review stars"></img>
              </div>
            </div>
            <p>
              MindScribe has been a game-changer for my mental health journey. I
              love how it tracks my mood and emotional fluctuations so easily.
              The mood insights have helped me better understand my emotional
              triggers and patterns, giving me a clearer picture of what affects
              my well-being. With the daily mood tracker, I can see how my
              stress levels change throughout the day and identify areas where I
              can improve. What I find especially helpful is the ability to
              export my data and share it with my therapist. It has made therapy
              sessions more productive and focused. The platform's layout is
              simple and user-friendly, which makes it easy to use every day.
              I’ve noticed a positive change in how I approach my mental health,
              and I feel more in control of my emotions. I’m grateful for
              MindScribe’s support on this journey.
            </p>
          </div>

          <div className="thirdRow">
            <div className="flex flex-row items-center mb-3">
              <img
                src={Avatar3}
                alt="profile icon"
                className="profileIcon"
              ></img>
              <div>
                <p className="reviewName">Paul</p>
                <img src={Stars} alt="review stars"></img>
              </div>
            </div>
            <p>
              MindScribe has been incredibly helpful in tracking my mood and
              mental health over time. With the mood charts and sentiment
              analysis, it’s like having a roadmap to guide me through my
              emotional ups and downs.
            </p>

            <div className="flex flex-row mt-10 items-center mb-3">
              <img
                src={Avatar5}
                alt="profile icon"
                className="profileIcon"
              ></img>
              <div>
                <p className="reviewName">Marie-Anne</p>
                <img src={Stars} alt="review stars"></img>
              </div>
            </div>
            <p>
              As someone who has struggled with stress and anxiety for years, I
              found MindScribe to be an incredible resource. Being able to see
              my mood trends and how stress and energy levels impact my
              day-to-day life has been a real eye-opener. Plus, being able to
              share all of this with my therapist in an organized format makes
              therapy sessions much more effective. I can’t imagine my mental
              wellness journey without it!
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomepageGuest;
