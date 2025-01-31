import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../config";
import axios from "axios";
const FeedbackForm = ({ doctorId, setDoctor }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);

  const [feedbackData, setFeedbackData] = useState({
    doctor: doctorId || null,
    user: userId || null,
    reviewText: null,
    rating: rating || null,
  });

  const onChangeHandler = (e) => {
    setFeedbackData({ ...feedbackData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!rating || rating == 0) {
      toast.error("Rate the doctor.");
      return alert("Give some rating to go further.");
    }
    if (!feedbackData.reviewText || feedbackData.reviewText.trim() == "") {
      toast.error("Feedback cannot be empty.");
      return alert("Feedback cannot be empty.");
    }

    try {
      const response = await axios.post(`${BASE_URL}/reviews`, feedbackData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = await response?.data;

      setDoctor(data);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form action="" className="" onSubmit={submitHandler}>
      <div>
        <h3 className="text-headingColor text-base leading-6 font-semibold mb-4 mt-0">
          How would you rate the overall experience?
        </h3>
        <div className="">
          {[...Array(5).keys()].map((_, index) => {
            index += 1;
            return (
              <button
                type="button"
                name="rating"
                className={`${
                  index <= ((rating && hover) || hover)
                    ? "text-yellowColor"
                    : "text-gray-400"
                } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                key={index}
                onClick={() => {
                  setRating(index);
                  setFeedbackData({ ...feedbackData, rating: index });
                }}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
                onDoubleClick={() => {
                  setRating(0);
                  setHover(0);
                }}
              >
                <span>
                  <AiFillStar />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-[30px] ">
        <h3 className="text-headingColor text-base leading-6 font-semibold mb-4">
          Share your feedback and suggestions.
        </h3>
        <textarea
          name="reviewText"
          id=""
          className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md "
          rows={5}
          placeholder="Write your message"
          onChange={onChangeHandler}
        ></textarea>
      </div>
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  );
};

export default FeedbackForm;
