import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavBar({
  title = "Reimbursement Portal",
  onLogout,
  onViewProfile,
  profileImgSrc = "https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg",
  profileHref = "/profile",
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Hide links only on Home page "/"
  const showNavLinks = location.pathname !== "/";

  useEffect(() => {
    function handleClickOutside(e) {
      if (!open) return;
      if (
        menuRef.current && !menuRef.current.contains(e.target) &&
        btnRef.current && !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    function handleEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  useEffect(() => {
    if (open && menuRef.current) {
      const first = menuRef.current.querySelector("[data-menu-item]");
      first && first.focus();
    }
  }, [open]);

  return (
    <header className={`w-full bg-blue-950 backdrop-blur shadow-sm ${className}`}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Title + (conditional) links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/")}
              className="text-xl font-semibold tracking-tight text-white select-none"
            >
              {title}
            </button>

            {showNavLinks && (
              <>
                <button onClick={() => navigate("/")} className="text-white hover:text-gray-300">
                  Home
                </button>
                <button onClick={() => navigate("/create-claim")} className="text-white hover:text-gray-300">
                  New Claim
                </button>
                <button onClick={() => navigate("/pending-claims")} className="text-white hover:text-gray-300">
                  Pending Claims
                </button>
                <button onClick={() => navigate("/closed-claims")} className="text-white hover:text-gray-300">
                  Closed Claims
                </button>
              </>
            )}
          </div>

          {/* Right: Profile */}
          <div className="relative">
            <button
              ref={btnRef}
              aria-haspopup="menu"
              aria-expanded={open}
              onClick={() => setOpen(o => !o)}
              className="flex items-center gap-2 rounded-full border border-blue-950 p-1.5 shadow-sm transition hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <img src={profileImgSrc} alt="User avatar" className="h-9 w-9 rounded-full object-cover" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                   className={`h-4 w-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden>
                <path fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                      clipRule="evenodd" />
              </svg>
            </button>

            {open && (
              <div
                ref={menuRef}
                role="menu"
                aria-label="User menu"
                className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-xl bg-white p-1.5 shadow-lg"
              >
                <button
                  data-menu-item
                  role="menuitem"
                  onClick={() => {
                    setOpen(false);
                    if (onViewProfile) onViewProfile();
                    else window.location.assign(profileHref);
                  }}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                >
                  View Profile
                </button>
                <button
                  role="menuitem"
                  onClick={() => {
                    setOpen(false);
                    onLogout && onLogout();
                  }}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-rose-50 focus:bg-rose-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
