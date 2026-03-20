import { useEffect, useState } from "react";
import starIcon from "@/assets/images/Star.png";
import DoctorsAbout from "./DoctorsAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";
import axios from "axios";
import { BASE_URL } from "../../config.js";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loader/Loading.jsx";
import Error from "../../components/Error/Error.jsx";
import {
  Award,
  BookOpen,
  CalendarCheck,
  Clock,
  IndianRupee,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  Star,
} from "lucide-react";
const DoctorDetails = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const { id } = useParams();
  const reviews = [];

  const navigate = useNavigate();

  const handleAddReview = () => {};

  const handleBookAppointment = () => {
    navigate("/appointment", {
      state: { doctor },
    });
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/doctors/search/${id}`);
        const { data } = await res?.data;

        setDoctor(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <section>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error errorMessage={"Error"} />
      ) : (
        <div className="min-h-screen bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 py-6 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* MAIN CONTENT COLUMN */}
              <div className="lg:col-span-8 space-y-8">
                {/* Header / Basic Info */}
                <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm">
                  <div className="p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="relative">
                      <img
                        src={doctor?.photo || "/photo1.jpg"}
                        alt={doctor.name}
                        className="w-40 h-40 md:w-48 md:h-48 rounded-[2rem] object-cover border-4 border-slate-50 shadow-lg shadow-slate-200"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-green-500 border-4 border-white w-8 h-8 rounded-full" />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2 justify-center md:justify-start">
                        <h1 className="text-3xl font-black text-slate-900">
                          {doctor.name}
                        </h1>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                          <ShieldCheck size={12} /> Verified
                        </span>
                      </div>

                      <p className="text-blue-600 font-bold text-lg mb-3">
                        {doctor.specialization}
                      </p>

                      <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                        <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1 rounded-lg border border-yellow-100">
                          <Star
                            size={16}
                            className="fill-yellow-400 text-yellow-400"
                          />
                          <span className="font-black text-slate-800">
                            {doctor.averageRating}
                          </span>
                        </div>
                        <span className="text-slate-400 text-sm font-medium">
                          ({doctor.totalRating} Patients Reviewed)
                        </span>
                      </div>

                      <p className="text-slate-500 font-medium leading-relaxed italic max-w-lg">
                        "{doctor.bio}"
                      </p>

                      <div className="text__para text-xs font-[poppins] font-semibold">
                        <p className="">
                          Available on{" "}
                          {doctor.timeSlots[0].days.map((day) => (
                            <span className="px-1">{day},</span>
                          ))}
                        </p>
                        <p className="">{`From ${doctor.timeSlots[0].start} to ${doctor.timeSlots[0].end}`}</p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Tabs */}
                  <div className="px-6 md:px-10 border-t border-slate-50 flex overflow-x-auto no-scrollbar">
                    {["about", "reviews"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-5 px-6 text-sm font-black transition-all relative whitespace-nowrap ${
                          activeTab === tab
                            ? "text-blue-600"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        {tab === "about"
                          ? "About & Background"
                          : `Patient Feedback (${reviews.length})`}
                        {activeTab === tab && (
                          <div className="absolute bottom-0 left-6 right-6 h-1 bg-blue-600 rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content Area */}
                <div className="space-y-6">
                  {activeTab === "about" ? (
                    <DoctorsAbout doctor={doctor} />
                  ) : (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      {/* Reviews List */}
                      {reviews.length > 0 ? (
                        <div className="space-y-4">
                          {reviews.map((rev) => (
                            <div
                              key={rev._id}
                              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm transition-hover hover:shadow-md"
                            >
                              <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                  <img
                                    src={rev.user.photo}
                                    className="w-12 h-12 rounded-2xl border-2 border-slate-50"
                                    alt=""
                                  />
                                  <div>
                                    <h4 className="font-bold text-slate-800">
                                      {rev.user.name}
                                    </h4>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                      {new Date(
                                        rev.createdAt,
                                      ).toLocaleDateString(undefined, {
                                        month: "long",
                                        year: "numeric",
                                      })}
                                    </p>
                                  </div>
                                </div>
                                <StarRating rating={rev.rating} />
                              </div>
                              <p className="text-sm text-slate-600 italic font-medium">
                                "{rev.reviewText}"
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
                          <MessageSquare
                            size={48}
                            className="mx-auto text-slate-200 mb-4"
                          />
                          <h3 className="font-bold text-slate-800">
                            No reviews yet
                          </h3>
                          <p className="text-sm text-slate-400">
                            Be the first to share your experience!
                          </p>
                        </div>
                      )}

                      <FeedbackForm onSubmit={handleAddReview} />
                    </div>
                  )}
                </div>
              </div>

              {/* SIDEBAR: Booking Card */}
              <div className="lg:col-span-4 sticky top-12 space-y-6">
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl shadow-slate-200/40">
                  <div className="flex justify-between items-center mb-8">
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
                      Consultation Fee
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl flex items-center font-bold text-slate-900">
                        <IndianRupee />
                        {doctor.ticketPrice}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        RS
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6 mb-8">
                    <div className="flex items-center justify-between text-sm font-black text-slate-800">
                      <span className="flex items-center gap-2">
                        <CalendarCheck size={18} className="text-blue-500" />{" "}
                        Available Slots
                      </span>
                      <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-[10px] uppercase">
                        Weekly
                      </span>
                    </div>

                    <div className="space-y-3">
                      {doctor.timeSlots?.map((slot, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-100 transition-colors"
                        >
                          <span className="text-xs font-bold text-slate-500">
                            {slot.day}
                          </span>
                          <span className="text-sm font-black text-slate-700">
                            {slot.start} - {slot.end}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleBookAppointment}
                    className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-100 hover:scale-[1.02] active:scale-95 transition-all mb-4"
                  >
                    Book Appointment
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-green-500" /> Secure
                    Payment Protected
                  </div>
                </div>

                {/* Quick Contact Info */}
                <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Phone size={80} />
                  </div>
                  <h4 className="font-bold text-lg mb-4 relative z-10">
                    Clinic Contact
                  </h4>
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-3 text-slate-300">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Phone size={14} />
                      </div>
                      <span className="text-sm font-medium">
                        {doctor.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Mail size={14} />
                      </div>
                      <span className="text-sm font-medium">
                        {doctor.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <MapPin size={14} />
                      </div>
                      <span className="text-sm font-medium">
                        Saint Jude Medical Center
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const StarRating = ({
  rating,
  size = 16,
  interactive = false,
  onRatingChange,
}) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && onRatingChange && onRatingChange(star)}
          className={`transition-colors ${interactive ? "cursor-pointer" : ""} ${
            star <= (hover || rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-slate-200"
          }`}
        />
      ))}
    </div>
  );
};

const FeedbackForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return;
    onSubmit({ rating, reviewText: text });
    setRating(0);
    setText("");
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mt-8">
      <h3 className="text-lg font-black text-slate-800 mb-4">
        How was your experience?
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">
            Your Rating
          </p>
          <StarRating
            rating={rating}
            size={24}
            interactive
            onRatingChange={setRating}
          />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">
            Share your thoughts
          </p>
          <textarea
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all resize-none h-32"
            placeholder="Write your review here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
        >
          <Send size={18} /> Submit Review
        </button>
      </form>
    </div>
  );
};

export default DoctorDetails;
