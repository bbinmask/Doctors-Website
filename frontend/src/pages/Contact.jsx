import React from "react";

const Contact = () => {
  return (
    <section className="px-4 mx-auto max-w-screen-md">
      <h2 className="heading text-center">Contact us</h2>
      <p className="mb-8 lg:mb-16 font-light text-center text__para">
        Got a technical issue? Want to send feedback about a beta feature? Let
        us know.
      </p>
      <form action="" className="space-y-8">
        <div className="">
          <label htmlFor="email" className="form__label">
            Your email
          </label>
          <input
            type="email"
            className="form__input mt-1"
            id="email"
            placeholder="example@gmail.com"
          />
        </div>
        <div className="">
          <label htmlFor="submit" className="form__label">
            Submit
          </label>
          <input
            type="text"
            className="form__input mt-1"
            id="submit"
            placeholder="Let us know how we can help you."
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="form__label">
            Your Message
          </label>
          <textarea
            rows="6"
            type="text"
            className="form__input mt-1"
            id="message"
            placeholder="Leave a comment..."
          />
          <button className="btn rounded sm:w-fit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default Contact;
