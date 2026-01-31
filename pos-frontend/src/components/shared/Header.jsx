import React from "react";
import { FaSearch, FaUserCircle, FaBell } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { IoLogOut } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../https";
import { removeUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      dispatch(removeUser());
      navigate("/auth");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="flex justify-between items-center py-4 px-8 bg-[var(--bg-primary)] border-b border-[var(--border-subtle)] transition-colors duration-300">
      {/* LOGO */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="relative">
          <img
            src={logo}
            className="w-10 h-10 transition-opacity duration-300"
            alt="restro logo"
          />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent tracking-wide">
          Restro
        </h1>
      </div>

      {/* SEARCH */}
      <div className="flex items-center gap-4 bg-[var(--bg-secondary)] rounded-xl px-5 py-2.5 w-[500px] border border-[var(--border-default)] focus-within:border-[var(--color-primary)]/50 transition-all duration-300 group">
        <FaSearch className="text-[var(--text-dim)] group-focus-within:text-[var(--color-primary)] transition-colors duration-300" />
        <input
          type="text"
          placeholder="Search items..."
          className="bg-transparent outline-none text-[var(--text-primary)] w-full placeholder:text-[var(--text-dim)]"
        />
      </div>

      {/* ACTION AREA */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        {userData.role === "Admin" && (
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--color-primary)]/50 transition-all duration-300"
          >
            <MdDashboard className="text-[var(--text-muted)] text-xl hover:text-[var(--color-primary)]" />
          </button>
        )}

        <button className="relative p-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--color-accent)]/50 transition-all duration-300">
          <FaBell className="text-[var(--text-muted)] text-xl hover:text-[var(--color-accent)]" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full text-[10px] font-bold text-white flex items-center justify-center shadow-lg">
            3
          </span>
        </button>

        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-[var(--border-default)]">
          <div className="relative">
            <FaUserCircle className="text-[var(--text-dim)] text-4xl" />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-[var(--color-success)] rounded-full border-2 border-[var(--bg-primary)]" />
          </div>
          <div className="hidden md:flex flex-col items-start min-w-[80px]">
            <h1 className="text-sm text-[var(--text-primary)] font-semibold tracking-wide truncate max-w-[120px]">
              {userData.name || "Guest"}
            </h1>
            <p className="text-xs font-medium text-[var(--color-primary)]">
              {userData.role || "Role"}
            </p>
          </div>
          <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-red-500/10 transition-all" title="Logout">
            <IoLogOut className="text-[var(--text-dim)] hover:text-red-500" size={22} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

