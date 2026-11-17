import React, { useState } from 'react';
import { 
  BarChart3, 
  FileText, 
  Flame, 
  ShieldAlert, 
  Users, 
  Menu, 
  X,
  Target,
  GitCompare,
  UserCheck
} from 'lucide-react';
import type { ActiveSection } from '../types/cricket';

interface NavbarProps {
  activeSection: ActiveSection;
  onSelectSection: (section: ActiveSection) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onSelectSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: Array<{ id: ActiveSection; label: string; icon: React.ReactNode }> = [
    { id: 'overview', label: 'Executive Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'batters', label: 'Top 10 Batters', icon: <Flame className="w-4 h-4" /> },
    { id: 'bowlers', label: 'Top 10 Bowlers', icon: <Target className="w-4 h-4" /> },
    { id: 'explorer', label: 'Candidate Explorer', icon: <Users className="w-4 h-4" /> },
    { id: 'comparison', label: 'V1 vs V2 Comparison', icon: <GitCompare className="w-4 h-4" /> },
    { id: 'kohli', label: 'Virat Kohli Audit', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'methodology', label: 'Methodology', icon: <FileText className="w-4 h-4" /> },
    { id: 'limitations', label: 'Limitations & Validation', icon: <ShieldAlert className="w-4 h-4" /> },
  ];

  const handleNavClick = (id: ActiveSection) => {
    onSelectSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-lg">
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
                  V1 &amp; V2 ANALYTICS
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                IPL Pressure Performance Analytics | Seasons 2022–2026 (367 Matches, 87,673 Deliveries)
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-xs font-medium text-slate-400 bg-slate-800/70 py-1.5 px-3 rounded-lg border border-slate-700/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Model V2 Primary (Exploratory)</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300">V1 Baseline Preserved</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex space-x-1 py-2 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-900 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center space-x-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
