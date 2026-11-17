import React, { useState } from 'react';
import { 
  BarChart3, 
  FileText, 
  Flame, 
  ShieldAlert, 
  Sliders, 
  Users, 
  CheckCircle2, 
  Menu, 
  X,
  Target,
  Sparkles
} from 'lucide-react';
import type { ActiveSection } from '../types/cricket';

interface NavbarProps {
  activeSection: ActiveSection;
  onSelectSection: (section: ActiveSection) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onSelectSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: Array<{ id: ActiveSection; label: string; icon: React.ReactNode }> = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'methodology', label: 'Methodology', icon: <FileText className="w-4 h-4" /> },
    { id: 'batters', label: 'Top 10 Batters', icon: <Flame className="w-4 h-4" /> },
    { id: 'bowlers', label: 'Top 10 Bowlers', icon: <Target className="w-4 h-4" /> },
    { id: 'explorer', label: 'Candidate Explorer', icon: <Users className="w-4 h-4" /> },
    { id: 'sensitivity', label: 'Threshold Sensitivity', icon: <Sliders className="w-4 h-4" /> },
    { id: 'limitations', label: 'Limitations', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'conclusion', label: 'Conclusion', icon: <CheckCircle2 className="w-4 h-4" /> },
  ];

  const handleNavClick = (id: ActiveSection) => {
    onSelectSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-navy-900 border-b border-slate-800 text-white shadow-md">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 border-b border-slate-800/80">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-9 h-9 rounded bg-blue-700 text-white font-black text-sm tracking-widest border border-blue-500 shadow-sm">
              RR
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight text-white">SUPER RR</span>
                <span className="text-xs px-2 py-0.5 rounded font-mono font-medium bg-pink-500/10 text-pink-400 border border-pink-500/20">
                  EXPLORATORY ANALYSIS
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Pressure Performance Analysis | IPL 2022–2026
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-3 text-xs text-slate-300">
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700/60 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Dataset: 367 Matches • 87,673 Balls</span>
            </div>
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700/60 font-mono">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Threshold: HP ≥ 65</span>
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 py-2 overflow-x-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded text-xs font-medium tracking-wide transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <span className={isActive ? 'text-pink-300' : 'text-slate-400'}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-950 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded text-sm font-medium ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <span className={isActive ? 'text-pink-300' : 'text-slate-400'}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
