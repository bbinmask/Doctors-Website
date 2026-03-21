import React, { useState, useMemo, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock4,
  Search,
  Filter,
  DollarSign,
  X,
  Phone,
  Mail,
  Award,
  BookOpen,
  ArrowLeft,
  CalendarCheck,
  Star,
  MessageSquare,
  Send,
  ShieldCheck,
  MapPin,
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  TrendingUp,
  ChevronRight,
  Plus,
  Trash2,
} from "lucide-react";
import { useSelector } from "react-redux";
import DoctorsAbout from "../../pages/Doctors/DoctorsAbout";
import { AppointmentRow } from "./Appointments";

/**
 * MOCK DATA based on your latest Mongoose Schemas
 */
const CURRENT_DOCTOR = {
  _id: "doc_101",
  name: "Dr. Alfie Solomons",
  email: "alfie.cardio@mednet.com",
  phone: 9876543210,
  photo:
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=400",
  ticketPrice: 120,
  specialization: "Neurologist",
  bio: "Dedicated to neurological excellence and patient care.",
  about:
    "Dr. Alfie Solomons is a board-certified Neurologist with extensive experience in treating complex brain and spine disorders.",
  specialFields: ["Neuro-oncology", "Multiple Sclerosis"],
  qualifications: [
    "Master of Surgery - Stanford",
    "MD - Johns Hopkins University",
  ],
  experiences: ["Head of Neurology - Saint Jude (2018-2023)"],
  timeSlots: [
    { start: "08:30 AM", end: "10:30 AM", day: "Monday" },
    { start: "09:00 AM", end: "12:00 PM", day: "Friday" },
  ],
  averageRating: 4.9,
  totalRating: 84,
  isApproved: "approved",
};

const MOCK_APPOINTMENTS = [
  {
    _id: "bk_1",
    user: {
      name: "Thomas Shelby",
      photo: "https://i.pravatar.cc/150?u=1",
      email: "t.shelby@peaky.com",
    },
    appointmentDate: new Date().toISOString(),
    status: "pending",
    isPaid: true,
    ticketPrice: 120,
  },
  {
    _id: "bk_2",
    user: {
      name: "Arthur Shelby",
      photo: "https://i.pravatar.cc/150?u=2",
      email: "a.shelby@peaky.com",
    },
    appointmentDate: new Date(Date.now() + 86400000).toISOString(),
    status: "approved",
    isPaid: true,
    ticketPrice: 120,
  },
  {
    _id: "bk_3",
    user: {
      name: "Polly Gray",
      photo: "https://i.pravatar.cc/150?u=3",
      email: "p.gray@peaky.com",
    },
    appointmentDate: new Date(Date.now() - 86400000).toISOString(),
    status: "cancelled",
    isPaid: false,
    ticketPrice: 120,
  },
];

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
    <div className={`p-4 rounded-2xl bg-${color}-50 text-${color}-600`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
        {title}
      </p>
      <p className="text-2xl font-black text-slate-800">{value}</p>
    </div>
  </div>
);

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);

  const profile = useSelector((store) => store.user);

  const stats = useMemo(
    () => ({
      revenue: appointments
        .filter((a) => a.isPaid)
        .reduce((acc, curr) => acc + curr.ticketPrice, 0),
      patients: 1240,
      pending: appointments.filter((a) => a.status === "pending").length,
      rating: profile.user.averageRating,
    }),
    [appointments, profile],
  );

  const handleStatusUpdate = (id, status) => {
    setAppointments((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status } : a)),
    );
  };

  return (
    <div className="min-h-screen font-[poppins] bg-slate-50 flex flex-col md:flex-row">
      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              Welcome, {profile.user.name}
            </h2>
            <p className="text-slate-500 font-medium">
              Here's what's happening with your practice today.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm pr-4">
            <img
              src={profile.user.photo}
              className="w-10 h-10 rounded-xl object-cover"
              alt=""
            />
            <div className="hidden sm:block">
              <p className="text-xs font-black text-slate-800">
                {profile.user.specialization}
              </p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Online
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8 animate-in fade-in duration-500">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Revenue"
              value={`$${stats.revenue}`}
              icon={TrendingUp}
              color="blue"
            />
            <StatCard
              title="Total Patients"
              value={stats.patients}
              icon={Users}
              color="indigo"
            />
            <StatCard
              title="Pending"
              value={stats.pending}
              icon={Clock4}
              color="yellow"
            />
            <StatCard
              title="Avg Rating"
              value={stats.rating}
              icon={Star}
              color="orange"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Recent Appointments */}
            <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                <h3 className="font-black text-slate-800 text-lg">
                  Recent Appointments
                </h3>
                <button
                  className="text-blue-600 font-bold text-xs hover:underline"
                  onClick={() => setActiveTab("appointments")}
                >
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                      <th className="py-4 px-6">Patient</th>
                      <th className="py-4 px-4">Date</th>
                      <th className="py-4 px-4">Status</th>
                      <th className="py-4 px-4">Price</th>
                      <th className="py-4 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.slice(0, 5).map((app) => (
                      <AppointmentRow
                        key={app._id}
                        app={app}
                        onStatusChange={handleStatusUpdate}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Weekly Schedule Preview */}
            <div className="lg:col-span-4 bg-slate-900 rounded-[2.5rem] p-8 text-white">
              <h3 className="font-black text-lg mb-6">Current Schedule</h3>
              <div className="space-y-4">
                {profile.user.timeSlots.map((slot, i) => (
                  <div
                    key={i}
                    className="bg-white/10 p-4 rounded-2xl border border-white/5 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        {slot.day}
                      </p>
                      <p className="font-bold">
                        {slot.start} - {slot.end}
                      </p>
                    </div>
                    <ChevronRight size={16} className="text-white/20" />
                  </div>
                ))}
                <button className="w-full py-4 border-2 border-dashed border-white/20 rounded-2xl text-slate-400 font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/5 transition-all">
                  <Plus size={18} /> Add New Slot
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
