import React, { useRef } from 'react';
import Navbar from './Navbar';
import emailjs from '@emailjs/browser';
const Contact = () => {
  const nav = useRef();
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_lfjjugn',
        'template_59ijdgf',
        form.current,
        'KIGVUASJ1vQYTO5UH'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };
  return (
    <>
      <Navbar nav={nav} />
      <section>
        <h2 className="--text-center">Contact Us</h2>
        <form
          ref={form}
          onSubmit={sendEmail}
          className="--form-control --card --flex-center --dir-column"
        >
          <input
            type="text"
            placeholder="Full Name"
            name="user_name"
            required
          />
          <input type="email" placeholder="Email" name="user_email" required />
          <input type="text" placeholder="subject" name="subject" required />
          <textarea name="message" cols="30" rows="10"></textarea>
          <button type="submit" className="--btn --btn-primary">
            Send Message
          </button>
        </form>
      </section>
    </>
  );
};

export default Contact;
