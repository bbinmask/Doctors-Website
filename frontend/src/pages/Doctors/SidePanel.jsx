import React from "react";
import { capitalize } from "../../Utils/capitalize";
const SidePanel = ({ doctor }) => {
  const { ticketPrice, timeSlots } = doctor;
  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Ticket price</p>
        <span className="text-base leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          ${ticketPrice}
        </span>
      </div>
      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Available time slots:
        </p>
        <ul className="mt-3">
          {timeSlots.map((slot, i) => (
            <li className="flex items-center justify-between mb-2" key={i}>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {capitalize(slot.day)}
              </p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {slot.time}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <button className="btn px-2 w-full rounded-md">
        Request Appointment
      </button>
    </div>
  );
};

export default SidePanel;
