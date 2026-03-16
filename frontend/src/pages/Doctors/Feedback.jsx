import { AiFillStar } from "react-icons/ai";
import avatar from "../../images/avatar-icon.png";
import { formateDate } from "../../Utils/formateDate";
import { useEffect, useState } from "react";
import FeedbackForm from "./FeedbackForm";
import { BASE_URL } from "../../config";
import axios from "axios";
import { formateISODate } from "../../Utils/formateISODate";

const Feedback = ({ id, doctor, setDoctor }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/doctors/reviews/${id}`);
        const data = await res.data;
        setReviews(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
          All reviews {doctor?.reviews?.length}
        </h4>
        {doctor.reviews.length == 0 ? (
          <h2 className="text-center leading-5 text-xl">
            Be the first patient to review this doctor😄
          </h2>
        ) : (
          doctor.reviews.map((review, i) => (
            <div key={i} className="flex justify-between gap-10 mb-[30px]">
              <div className="flex gap-3">
                <figure className="w-10 h-10 rounded-full">
                  <img src={avatar} alt="" className="w-full" />
                </figure>
                <div className="">
                  <h5 className="text-base leading-6 text-primaryColor font-bold">
                    {review?.user?.name}
                  </h5>
                  <p className="text-[14px] leading-6 text-textColor">
                    {formateISODate(review.updatedAt)}
                  </p>
                  <p className="text__para mt-3 font-medium text-[15px]">
                    {review?.reviewText}
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(review?.rating).keys()].map((_, i) => (
                  <AiFillStar key={i} color="gold" />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      {!showFeedback && (
        <div className="text-center">
          <button className="btn" onClick={() => setShowFeedback(true)}>
            Give Feedback
          </button>
        </div>
      )}
      {showFeedback && <FeedbackForm doctorId={id} setDoctor={setDoctor} />}
    </>
  );
};

export default Feedback;
