import React, { useRef } from 'react';
import Navbar from './Navbar';
import { FaArrowUp } from 'react-icons/fa';
import Footer from './Footer';
import CreateAt from './CreateAt';

const About = () => {
  const nav = useRef();
  const scrollTop = () => {
    nav.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
      <Navbar nav={nav} />

      <section class="about">
        <h1>About Us</h1>
        <p>
          Discover Nepal's Treasures, Unveiling Beauty, Culture and Adventure!
        </p>
        <div class="about-info">
          <div class="about-img">
            <img src="http://localhost:3000/Image/logo.png" />
          </div>
          <div>
            <p>
              Travel has merged seamlessly into our lives in today's fast-paced
              society. People are increasingly traveling more than ever before,
              seeing many cultures, thanks to globalization and technological
              improvements. However, with so many options for destinations and
              activities, planning and making travel decisions have grown
              increasingly difficult. To solve this issue, NepalVista will
              assist individuals in making more educated travel choices. This
              website will serve as a forum for travelers from all over the
              world to exchange travel advice, suggestions, and experiences. It
              will function as a virtual community where individuals may
              interact, exchange stories, and motivate others to go out on new
              journeys.
            </p>
          </div>
        </div>
      </section>
      <Footer />
      <CreateAt />
      <div onClick={scrollTop} id="scroll">
        <button className="scroll-btn">
          <span>
            <FaArrowUp />
          </span>
        </button>
      </div>
    </>
  );
};

export default About;
