import { useEffect, useRef } from "react";
import logo from "@/assets/images/logo.png";
import { BiMenu } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const docNavLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/appointments",
    display: "Appointments",
  },
  {
    path: "/settings",
    display: "Settings",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const userInfo = useSelector((store) => store.user);

  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between font-[poppins]">
          {/* =========logo============ */}
          <div>
            <img src={logo} alt="logo" />
          </div>

          {/* ====== menu ======  */}

          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {userInfo?.role === "doctor"
                ? docNavLinks.map((link, i) => (
                    <li key={i}>
                      <NavLink
                        to={`${link.path}`}
                        className={(navClass) =>
                          navClass.isActive
                            ? "text-primaryColor text-[16px] leading-7 font-semibold"
                            : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                        }
                      >
                        {link.display}
                      </NavLink>
                    </li>
                  ))
                : navLinks.map((link, i) => (
                    <li key={i}>
                      <NavLink
                        to={link.path}
                        className={(navClass) =>
                          navClass.isActive
                            ? "text-primaryColor text-[16px] leading-7 font-semibold"
                            : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                        }
                      >
                        {link.display}
                      </NavLink>
                    </li>
                  ))}
            </ul>
          </div>

          {/* ========== nav right ========= */}
          <div className="flex items-center gap-4">
            {userInfo.token && userInfo.user ? (
              <div className="">
                <Link
                  to={`${
                    userInfo.role == "doctor"
                      ? "/doctor/profile/me"
                      : "/users/profile/me"
                  }`}
                >
                  {userInfo?.user?.photo ? (
                    <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                      <img
                        src={userInfo?.user?.photo}
                        alt="Photo"
                        className="w-full rounded-full"
                      />
                    </figure>
                  ) : (
                    <h2>{userInfo.user.name}</h2>
                  )}
                </Link>
              </div>
            ) : (
              <Link to={"/login"}>
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
