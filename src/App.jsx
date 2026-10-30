import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import DiffusionSection from './components/diffusionSection';
import MoratoriumSection from './components/MoratoriumSection';
import ForeclosureSection from './components/ForeclosureSection';
import AchievementSection from './components/AchievementSection';
import Quiz from './components/Quiz';
import ReferencesSection from './components/ReferencesSection';

const sectionIds = ['hero', 'diffusion', 'moratorium', 'foreclosure', 'achievement', 'quiz'];
const statusIds = ['diffusion', 'moratorium', 'foreclosure', 'achievement'];

const POSITION_PRESETS = {
  'top-left': 'top-5 left-5',
  'top-right': 'top-5 right-20', // Offset from right-5 so it never overlaps the Dark Mode button
  'bottom-left': 'bottom-5 left-5',
  'bottom-right': 'bottom-5 right-5',
};

const SCALE_PRESETS = {
  sm: {
    boxSize: 'w-25 h-25',
    gridGap: 'gap-5',
    containerPad: 'p-3',
    topOffset: 'pl-7',
    axisFontSize: 'text-[15px]',
    axisLabelFont: 'text-[9px]',
  },
  md: {
    boxSize: 'w-10 h-10',
    gridGap: 'gap-2',
    containerPad: 'p-4',
    topOffset: 'pl-8',
    axisFontSize: 'text-[12px]',
    axisLabelFont: 'text-[10px]',
  },
  lg: {
    boxSize: 'w-12 h-12',
    gridGap: 'gap-2.5',
    containerPad: 'p-5',
    topOffset: 'pl-9',
    axisFontSize: 'text-[14px]',
    axisLabelFont: 'text-[12px]',
  },
};

const NAV_CONFIG = {
  position: 'bottom-left',
  scale: 'sm',
  behavior: {
    onlyShowInStatuses: true,
    showAxisTitles: true,
    showHighLowLabels: true,
  },
  theme: {
    outerContainer:
      'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 shadow-xl select-none',
    innerGrid:
      'grid grid-cols-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700',
  },
  axes: {
    explorationTitle: 'Exploration',
    commitmentTitle: 'Commitment',
    lowText: 'Low',
    highText: 'High',
  },
  quadrants: [
    {
      id: 'foreclosure',
      label: 'Identity Foreclosure (High Commitment, Low Exploration)',
      activeClass:
        'bg-green-500 ring-2 ring-white dark:ring-slate-900 shadow-lg shadow-green-500/50 scale-105 z-10',
      inactiveClass: 'bg-green-500/25 hover:bg-green-500/60',
    },
    {
      id: 'achievement',
      label: 'Identity Achievement (High Commitment, High Exploration)',
      activeClass:
        'bg-sky-500 ring-2 ring-white dark:ring-slate-900 shadow-lg shadow-sky-500/50 scale-105 z-10',
      inactiveClass: 'bg-sky-500/25 hover:bg-sky-500/60',
    },
    {
      id: 'diffusion',
      label: 'Identity Diffusion (Low Commitment, Low Exploration)',
      activeClass:
        'bg-red-500 ring-2 ring-white dark:ring-slate-900 shadow-lg shadow-red-500/50 scale-105 z-10',
      inactiveClass: 'bg-red-500/25 hover:bg-red-500/60',
    },
    {
      id: 'moratorium',
      label: 'Identity Moratorium (Low Commitment, High Exploration)',
      activeClass:
        'bg-yellow-400 ring-2 ring-white dark:ring-slate-900 shadow-lg shadow-yellow-400/50 scale-105 z-10',
      inactiveClass: 'bg-yellow-400/25 hover:bg-yellow-400/60',
    },
  ],
};

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const showQuadrantNav = NAV_CONFIG.behavior.onlyShowInStatuses
    ? statusIds.includes(activeSection)
    : true;

  // Fallback guards prevent crashes if NAV_CONFIG keys are mistyped
  const scaleProps = SCALE_PRESETS[NAV_CONFIG.scale] ?? SCALE_PRESETS.sm;
  const positionClass =
    POSITION_PRESETS[NAV_CONFIG.position] ?? POSITION_PRESETS['bottom-left'];

  const hasAxisContent =
    NAV_CONFIG.behavior.showAxisTitles || NAV_CONFIG.behavior.showHighLowLabels;

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-slate-100 transition-colors">
      {/* Dark/Light Mode Icon Button */}
      <div className="fixed top-5 right-5 z-50">
        <button
          type="button"
          onClick={() => setDarkMode((prev) => !prev)}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-700 dark:text-amber-300 hover:scale-105 border border-slate-200/80 dark:border-slate-700/80 shadow-lg transition-all cursor-pointer"
        >
          {darkMode ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Floating 2x2 Quadrant Matrix Navigation */}
      <aside
        aria-label="Identity Matrix Compass"
        className={`fixed ${positionClass} z-50 transition-all duration-500 ease-out ${
          showQuadrantNav
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className={`${scaleProps.containerPad} rounded-2xl ${NAV_CONFIG.theme.outerContainer}`}>
          {/* Top Axis: Exploration */}
          {hasAxisContent && (
            <div className={`${scaleProps.topOffset} text-center mb-0.5`}>
              {NAV_CONFIG.behavior.showAxisTitles && (
                <span
                  className={`block ${scaleProps.axisFontSize} font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-100`}
                >
                  {NAV_CONFIG.axes.explorationTitle}
                </span>
              )}
              {NAV_CONFIG.behavior.showHighLowLabels && (
                <div
                  className={`grid grid-cols-2 ${scaleProps.axisLabelFont} font-semibold text-slate-500 dark:text-slate-400 mt-0.5`}
                >
                  <span>{NAV_CONFIG.axes.lowText}</span>
                  <span>{NAV_CONFIG.axes.highText}</span>
                </div>
              )}
            </div>
          )}

          <div className="flex items-stretch">
            {/* Left Axis: Commitment */}
            {hasAxisContent && (
              <div className="flex items-center pr-1.5">
                {NAV_CONFIG.behavior.showAxisTitles && (
                  <span
                    className={`${scaleProps.axisFontSize} font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-100 [writing-mode:vertical-lr] rotate-180 mr-1`}
                  >
                    {NAV_CONFIG.axes.commitmentTitle}
                  </span>
                )}
                {NAV_CONFIG.behavior.showHighLowLabels && (
                  <div
                    className={`flex flex-col justify-between h-full py-1 ${scaleProps.axisLabelFont} font-semibold text-slate-500 dark:text-slate-400`}
                  >
                    <span className="[writing-mode:vertical-lr] rotate-180">
                      {NAV_CONFIG.axes.highText}
                    </span>
                    <span className="[writing-mode:vertical-lr] rotate-180">
                      {NAV_CONFIG.axes.lowText}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* 2x2 Quadrant Grid */}
            <div className={`${scaleProps.gridGap} p-1.5 ${NAV_CONFIG.theme.innerGrid}`}>
              {NAV_CONFIG.quadrants.map((q) => {
                const isActive = activeSection === q.id;
                return (
                  <a
                    key={q.id}
                    href={`#${q.id}`}
                    aria-label={q.label}
                    title={q.label}
                    className={`${scaleProps.boxSize} rounded-lg transition-all duration-300 ${
                      isActive ? q.activeClass : q.inactiveClass
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Single-Page Journey */}
      <main>
        <Hero />
        <DiffusionSection />
        <MoratoriumSection />
        <ForeclosureSection />
        <AchievementSection />
        <Quiz />
        <ReferencesSection />
      </main>
    </div>
  );
}