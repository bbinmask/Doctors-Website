import { CheckCircle2, XCircle } from "lucide-react";

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

export const Appointments = () => {
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
        <h3 className="font-black text-slate-800 text-xl">All Bookings</h3>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
            Filter
          </button>
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
            Export CSV
          </button>
        </div>
      </div>
      <table className="w-full text-left">
        <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
          <tr>
            <th className="py-4 px-8">Patient</th>
            <th className="py-4 px-4">Appt. Date</th>
            <th className="py-4 px-4">Status</th>
            <th className="py-4 px-4">Payment</th>
            <th className="py-4 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((app) => (
            <AppointmentRow
              key={app._id}
              app={app}
              onStatusChange={handleStatusUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const AppointmentRow = ({ app, onStatusChange }) => (
  <tr className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
    <td className="py-4 px-4">
      <div className="flex items-center gap-3">
        <img
          src={app.user.photo}
          className="w-10 h-10 rounded-xl object-cover"
          alt=""
        />
        <div>
          <p className="font-bold text-slate-800 text-sm">{app.user.name}</p>
          <p className="text-[10px] text-slate-400 font-medium">
            {app.user.email}
          </p>
        </div>
      </div>
    </td>
    <td className="py-4 px-4 text-sm font-bold text-slate-600">
      {new Date(app.appointmentDate).toLocaleDateString()}
    </td>
    <td className="py-4 px-4">
      <span
        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
          app.status === "approved"
            ? "bg-green-100 text-green-700"
            : app.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
        }`}
      >
        {app.status}
      </span>
    </td>
    <td className="py-4 px-4 text-sm font-black text-slate-800">
      ${app.ticketPrice}
    </td>
    <td className="py-4 px-4">
      <div className="flex gap-2">
        {app.status === "pending" && (
          <>
            <button
              onClick={() => onStatusChange(app._id, "approved")}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              <CheckCircle2 size={18} />
            </button>
            <button
              onClick={() => onStatusChange(app._id, "cancelled")}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <XCircle size={18} />
            </button>
          </>
        )}
      </div>
    </td>
  </tr>
);
