import { Calendar, Clock, IndianRupee, Stethoscope } from "lucide-react";
import { useState } from "react";
import { AppointmentModal } from "./AppointmentModal";
import { StatusBadge } from "./StatusBadge";

export const AppointmentCard = ({ appointment }) => {
  const date = new Date(appointment.appointmentDate);

  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);

  const onClose = () => setIsOpen(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow p-5">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className="w-14 h-14 rounded-full bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
            {appointment.doctor.photo ? (
              <img
                src={appointment.doctor.photo}
                alt={appointment.doctor.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <Stethoscope size={24} />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-slate-800 leading-tight">
              {appointment.doctor.name}
            </h3>
            <p className="text-sm text-slate-500">
              {appointment.doctor.specialization}
            </p>
            <div className="flex items-center gap-1 text-xs text-blue-600 font-medium mt-1">
              <IndianRupee size={12} />
              {appointment.ticketPrice} Appointment Fee
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <StatusBadge status={appointment.status} />
          {appointment.isPaid ? (
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100 uppercase tracking-wider">
              Paid
            </span>
          ) : (
            <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 uppercase tracking-wider">
              Unpaid
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Calendar size={16} className="text-slate-400" />
          <span>
            {date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Clock size={16} className="text-slate-400" />
          <span>
            {date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          className="flex-1 py-2 text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
          onClick={onOpen}
        >
          View Details
        </button>
        {appointment.status === "pending" && (
          <button className="flex-1 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm shadow-blue-200">
            Reschedule
          </button>
        )}
      </div>

      {isOpen && (
        <AppointmentModal onClose={onClose} appointment={appointment} />
      )}
    </div>
  );
};
