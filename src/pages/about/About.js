import React from 'react';
import './About.css'; // <-- Import form styles


// No CSS module import needed since we are using the global App.css

const AboutUsPage = () => (
  // This wrapper div is the key to scoping our styles
  <div className="about-us-theme-container">
    <h1>Welcome to <span className="highlight">IncleClub</span></h1>

    <p><strong>The club no one asked for, but here we are anyway.</strong></p>

    <p>
      Born out of boredom and poor life choices at IIT Gandhinagar, we’re just a bunch of students who decided to call our group a “club” so it sounds like we’re doing something meaningful (we’re not).
    </p>

    <p>
      This is a space where dumb ideas get way too much attention, inside jokes become full-blown projects, and everyone’s ego gets publicly deflated at least once a week.
    </p>

    <p>
      If you came here looking for wisdom, productivity, or emotional stability — buddy, take a U-turn.
    </p>

    <p>
      And <em>you</em> — yeah, <strong>you</strong> — if you’re still reading this, congrats on wasting 15 seconds of your life you’ll never get back. Might as well follow us now. It doesn’t get better, but at least you won’t suffer alone.
    </p>

    <p>
      <strong>IncleClub.</strong> Lower your expectations. Then lower them again.
    </p>

    <div className="founders">
      <h2>Founder Details</h2>
      <p><strong>Name:</strong> The One Who Thought This Was a Good Idea™  maybe it was Anshuuuuuuuuuuuuuuuuuuu....</p>
      <p><strong>Role:</strong> BCMC</p>
      <p><strong>Fun Fact: </strong>There are places in human anatomy where sun doesn't shine</p>
    </div>
  </div>
);

export default AboutUsPage;
