import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const ServiceCard = ({ service, i }) => {
  const { name, desc, bgColor, textColor } = service;

  return (
    <>
      <div className="py-[30px] px-3 lg:px-5 ">
        <h2 className="text-[26px] leading-9 text-headingColor font-bold">
          {name}
        </h2>
        <p className="text-base leading-7 font-normal text-textColor mt-4">
          {desc}
        </p>

        <div className="flex items-center justify-between mt-[30px]">
          <Link
            to="/doctors"
            className="w-11 h-11 rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none
                "
          >
            <BsArrowRight className="group-hover:text-white w-6 h-5" />
          </Link>

          <span
            className="w-11 h-11 flex items-center justify-center text-[18px] leading-[30px] font-semibold"
            style={{
              background: `${bgColor}`,
              color: textColor,
              borderRadius: `6px 0 0 6px`,
            }}
          >
            {i + 1}
          </span>
        </div>
      </div>
    </>
  );
};

export default ServiceCard;
