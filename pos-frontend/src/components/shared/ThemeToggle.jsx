import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] 
                       hover:border-[var(--color-primary)] transition-all duration-300 group overflow-hidden"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
        >
            <div className="relative w-5 h-5">
                {/* Sun Icon */}
                <FiSun
                    className={`absolute inset-0 w-5 h-5 text-amber-500 transition-all duration-300 
                        ${isDark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}
                />
                {/* Moon Icon */}
                <FiMoon
                    className={`absolute inset-0 w-5 h-5 text-indigo-400 transition-all duration-300 
                        ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}
                />
            </div>
        </button>
    );
}
