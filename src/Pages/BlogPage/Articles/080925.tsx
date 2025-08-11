import React from "react";

function Article080925() {
  return (
    <article style={{ width: '100%' }}>
      <h1>Day One 08/09/25</h1>

      <p>
        So today my air conditioner broke and without it, I just couldn`t sleep. Tack on the monumental heaps of anxiety due to procrastination and flubbing an assesment test today for a job. Man, that really hit me. I had 15 minutes to solve the problem. It was worded something like:
      </p>

      <blockquote>
        <p>You`re playing whisper down the lane</p>
        <p>You`re given a number and an array of numbers</p>
        <p>Each number in the array is the message they will pass to the next person</p>
        <p>What they didn`t say was</p>
        <blockquote>
          <p>Any number other than the one player 1 starts with will change each number in the array</p>
        </blockquote>
        <p>Then, how many people would give the correct guess</p>
        <p>So, it would look something like this:</p>
      </blockquote>

      <pre><code className="language-javascript">
        {`const array = [1, 1, 3, 1, 1]
let firstWrongAnswer = undefined

// Remove the first player because he's always right
        const firstPlayer = array[0]
const adjustedArrayIDidNotMake = array.slice(1).map(player => {
    const correctSecret = array[0]

        // If the player doesn't have the correct number, save the incorrect number they do have
        if(player !== firstPlayer) {
          firstWrongAnswer = player
        return player
    }

        // Then just fill the array up with the wrong answers unless there is no wrong answer yet,
        // in which case, return the player who guessed right before it was tainted
        return firstWrongAnswer || player
})`}
      </code></pre>

      <blockquote>
        <p>OR, I don`t know, something like that. You gotta get the wrong answer, isolate it, compare each member of the array with the previous one and then create a new array adjusted for the bad apple who gave the wrong answer and then slice off the wrong guess string of players and then provide the length of the remaining array.</p>
      </blockquote>

      <pre><code className="language-javascript">
        {`const soLikeThis = [1, 1, 3, 1, 1]
const adjusted = [1, 1, 3, 3, 3] // Because the bad apple poisoned the bunch
const sliced = [1, 1]
const expected = 2`}
      </code></pre>

      <blockquote>
        <p>I`m not exactly super smart, but nor am I all that dumb. This question just took me so long to wrap my head around. AND THEN, I only had a minute left once I did understand it, but I had NO passing test cases. So I had to real quick provide the wrong answer (where I just filtered out all the numbers that weren`t the first player`s and then provided the length, but that`s assuming an untainted array).</p>
      </blockquote>

      <p>
        So what does this have to do with my air conditioner? Well I`m too hot to sleep and too anxious to play around on a video game. Then, it happened, my buddy told me about Cursor AI Editor. I`ve always been a VS Code fan boy the second I discovered it after a year rocking sublime thinking &quot;how could it get better than this?&quot;.
      </p>

      <p>
        I mean, come on! AI Integration in the terminal, Agents updating your code (not just a single module, the whole app) in realtime, step by step, with explanations?! Then there&apos;s Github integrations in order to run agents based off of issues AND Slack integration where you can get updates on those GH issues you just tried to use the Agent to solve. You can even bark commands to adjust a GH issue right from Slack!
      </p>

      <p>
        Then I spent an hour with the free tier of Claude and my lord! It was actually an iterative discussion in terms of trying to accomplish the rather abstract goal of &quot;let&apos;s make a cool design for me to implement&quot;! If I had the money, I&apos;d 100% purchase a Claude subscription and as I continue to add content and demos to this site, I&apos;ll likely end up with a Cursor Pro subscription since I really want to lean into coding again.
      </p>

      <h2>A little about me</h2>

      <p>
        So yeah, of course you&apos;re likely thinking &quot;Why am I reading this guy ramble on about being sweaty? He&apos;s literally ages behind everyone else. These features are old.&quot; That&apos;s entirely fair. I&apos;m late to the party. But here&apos;s the sparknotes of who I am and maybe it&apos;ll make a little more sense:
      </p>

      <ul>
        <li>Well I wasn&apos;t always into Computer Science. I wasn&apos;t into any science, really</li>
        <li>I&apos;ve always liked solving puzzles, but I&apos;ve always had the effort of a `D` student. My grades were fine, but I barely put effort into anything (not bragging, but it&apos;s important later)</li>
        <li>After I dropped out of high school and started spending all my time at shows, trying to write music, or just literally anything other than plan for my future.</li>
        <li>Then it happened, I fell into a `D` grade life. I made just enough to live. I moved in with a woman, we tried for 11 years, it didn&apos;t work out</li>
        <li><em>Finally something relevant</em>- That last year, I did everything in my power to not have to face the reality that my entire world was about crumble and I`d have to start over at 30 (at the time). So I spent every second I had gobbling up code.</li>
        <li><strong>MIT & Harvard`s</strong> course called CS50 was the single greatest learning experience I`ve ever had!</li>
        <li>We started with C and we had to learn every last little bit as far as designing concise structs, allocating and trashing memory, pointers, function pointers, neon-flux semi-gravitational brain waves, all of it.</li>
        <li>Then, the final project for this portion was to write a spell checker via creating a dictionary look-up without searching the entire dictionary every new letter (so you had to remove parts of the dictionary on each iteration so the next iteration was shorter than the last until you found your word)</li>
        <li>Even with the utils they provided, it was like a 300-line endeavor.</li>
        <li>Then, the <em>single greatest moment in my learning adventures</em> hit me like a ton of bricks.</li>
        <li>&quot;What was it?&quot; you might ask. They taught us Python in a day and then gave us 1 day to implement the SAME spell checker but in python. I was terrified because, I mean, that last one took me like a week if I&apos;m being honest.</li>
        <li>One afternoon, a util library, and 40 lines of code later I finished. I just &quot;discovered&quot; <strong>Abstraction</strong> and its connection to the evolution of technology. From that moment on, I wanted to know absolutely everything I could!</li>
      </ul>

      <p><em>( Now to speed this up a bit because I probably lost most of the readers already )</em></p>

      <ul>
        <li>I entered some random hackathon where I stayed out for a weekend to take part in building a prototype app for medications</li>
        <li>We ended up winning, which felt great, but even better, I made a new friend. A friend who would later become my mentor for a period of time. A friend I still talk to today, almost 7 years later. We spent countless hours at the bar debating functional programming vs. Object-oriented. I <del>was</del> am so naive in how hard I clinged to Haskell and how cool I think it is. Maybe it&apos;s the logo?</li>
        <li>Fast-forward a little bit and after many weekends of working with my mentor learning web development, I ended up landing a job at Comcast.</li>
        <li>I stayed there for 3 years as I worked on a Network Managing tool called Activecore and learned tons about React patterns as I watched the evolution from React Class Components into React Hooks.</li>
        <li>After that I worked for AAA for about a year as a Senior Frontend Dev. I liasoned with the Adobe team and learned all about the Adobe Experience Environment (ie. Data Analytics, A/B Testing, Rules). I also liasoned with the consulting firm teaching my team the new design patterns as we migrated from C#/.NET to Next/React/TS.</li>
        <li>Then I had another year over at another company (I don&apos;t know if I am allowed to mention this?) in charge of a project where we researched the carbon footprint of APIs and how to quantize and eventually minimize it. Automated checks everyday, then alerted the PMs that they need to make some adjustments to their code. I used SonarQ to determine redudant computational loops and stuff like that.</li>
        <li>I then had a health scare in regards to my heart in the beginning of 2025 and since that last contract, I&apos;ve been taking it a little easier.</li>
        <li>I spend my time volunteering in the harm-reduction communities, playing around with Haskell ideas, reading, playing D&D/MTG/Mork Borg/etc. and learning about the history of philosphy.</li>
      </ul>

      <p>That&apos;s enough for today. I already spent my day refacorting the Blog Post layout and cards:</p>

      <ul>
        <li>Converting from inline styles to @emotion/styled components</li>
        <li>Replacing querySelector with proper React useRef hooks</li>
        <li>Setting up a clean types system with TypeScript</li>
        <li>Getting all those path aliases working properly</li>
      </ul>
    </article>
  );
}

export default Article080925;