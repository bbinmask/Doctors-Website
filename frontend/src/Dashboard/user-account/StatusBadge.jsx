import { Clock4, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    approved: "bg-green-100 text-green-800 border-green-200",
    confirmed: "bg-blue-100 text-blue-800 border-blue-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
    delayed: "bg-orange-100 text-orange-800 border-orange-200",
  };

  const icons = {
    pending: <Clock4 className="w-3 h-3" />,
    approved: <CheckCircle2 className="w-3 h-3" />,
    confirmed: <CheckCircle2 className="w-3 h-3" />,
    cancelled: <XCircle className="w-3 h-3" />,
    delayed: <AlertCircle className="w-3 h-3" />,
  };

  return (
    <span
      className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.pending}`}
    >
      {icons[status] || icons.pending}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
