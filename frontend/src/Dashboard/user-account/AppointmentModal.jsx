import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  Loader2,
  Mail,
  Phone,
  Stethoscope,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { StatusBadge } from "./StatusBadge";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../config";
export const AppointmentModal = ({ appointment, onClose }) => {
  if (!appointment) return null;

  const date = new Date(appointment.appointmentDate);
  const [isCancelling, setIsCancelling] = useState(false);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const cancelAppointment = async () => {
    setIsCancelling(true);

    try {
      const { data } = await axios.delete(
        `${BASE_URL}/appointment/${appointment._id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (!data.success) {
        toast.error(data.message);
      } else {
        onClose();
        toast.success(data?.message || "Appointment cancelled!");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong!");
      throw new Error(error);
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-xl font-black text-slate-800">
              Appointment Details
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Doctor Info */}
            <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-600 p-1.5 rounded-lg">
                  <Stethoscope size={16} className="text-white" />
                </div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                  Provider
                </span>
              </div>
              <div className="flex gap-4">
                <img
                  src={
                    appointment.doctor.photo ||
                    "https://via.placeholder.com/150"
                  }
                  className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-sm"
                  alt={appointment.doctor.name}
                />
                <div>
                  <h3 className="font-bold text-slate-800">
                    {appointment.doctor.name}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {appointment.doctor.specialization}
                  </p>
                  <div className="flex flex-col gap-1 mt-2">
                    <span className="text-[11px] flex items-center gap-1.5 text-slate-500">
                      <Mail size={12} /> {appointment.doctor.email || "N/A"}
                    </span>
                    <span className="text-[11px] flex items-center gap-1.5 text-slate-500">
                      <Phone size={12} /> {appointment.doctor.phone || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Info */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-500 p-1.5 rounded-lg">
                  <User size={16} className="text-white" />
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Patient
                </span>
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{appointment.name}</h3>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">
                    Blood Type
                  </p>
                  <p className="text-sm text-slate-700">
                    {appointment.user.bloodType || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Scheduling & Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-slate-100 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Calendar size={14} />
                <span className="text-[10px] font-bold uppercase">Date</span>
              </div>
              <p className="font-bold text-slate-800">
                {date.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="border border-slate-100 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Clock size={14} />
                <span className="text-[10px] font-bold uppercase">Time</span>
              </div>
              <p className="font-bold text-slate-800">
                {date.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="border border-slate-100 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <AlertCircle size={14} />
                <span className="text-[10px] font-bold uppercase">Status</span>
              </div>
              <div className="mt-1">
                <StatusBadge status={appointment.status} />
              </div>
            </div>
          </div>

          {/* Billing */}
          <div className="border-2 border-slate-300 p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <CreditCard size={120} />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
                  Payment Summary
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black">
                    ₹{appointment.ticketPrice}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-[1px] bg-white/20 hidden md:block" />
                <div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">
                    Payment Status
                  </p>
                  {appointment.isPaid ? (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle2 size={16} />
                      <span className="font-bold text-sm">
                        Transaction Successful
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-yellow-400">
                      <Clock size={16} />
                      <span className="font-bold text-sm">Payment Pending</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons*/}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-sm font-bold bg-slate-100 border border-slate-300 hover:bg-slate-200 rounded-xl transition-colors shadow-lg shadow-red-100"
          >
            Back
          </button>
          {appointment.status !== "cancelled" && (
            <button
              onClick={cancelAppointment}
              disabled={isCancelling}
              className="flex-1 flex py-3 text-sm justify-center font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors shadow-lg shadow-red-100"
            >
              {isCancelling ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Cancel Appointment"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
