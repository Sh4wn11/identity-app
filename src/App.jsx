import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import DiffusionSection from './components/DiffusionSection';
import MoratoriumSection from './components/MoratoriumSection';
import ForeclosureSection from './components/ForeclosureSection';
import AchievementSection from './components/AchievementSection';
import Quiz from './components/Quiz';
import ReferencesSection from './components/ReferencesSection';

const sectionIds = ['hero', 'diffusion', 'moratorium', 'foreclosure', 'achievement', 'quiz'];
const statusIds = ['diffusion', 'moratorium', 'foreclosure', 'achievement'];

const POSITION_PRESETS = {
  'top-left': 'top-4 left-4 sm:top-5 sm:left-5',
  'top-right': 'top-4 right-16 sm:top-5 sm:right-20',
  'bottom-left': 'bottom-4 left-4 sm:bottom-5 sm:left-5',
  'bottom-right': 'bottom-4 right-4 sm:bottom-5 sm:right-5',
};

const SCALE_PRESETS = {
  sm: {
    boxSize: 'w-8 h-8 sm:w-9 sm:h-9',
    gridGap: 'gap-1 sm:gap-1.5',
    containerPad: 'p-2.5 sm:p-3',
    topOffset: 'pl-6 sm:pl-7 pr-6',
    axisFontSize: 'text-[9px] sm:text-[10px]',
    axisLabelFont: 'text-[8px] sm:text-[9px]',
  },
  md: {
    boxSize: 'w-9 h-9 sm:w-10 sm:h-10',
    gridGap: 'gap-1.5 sm:gap-2',
    containerPad: 'p-3 sm:p-4',
    topOffset: 'pl-7 sm:pl-8 pr-6',
    axisFontSize: 'text-[10px] sm:text-[12px]',
    axisLabelFont: 'text-[9px] sm:text-[10px]',
  },
  lg: {
    boxSize: 'w-12 h-12 sm:w-25 sm:h-25',
    gridGap: 'gap-2 sm:gap-2.5',
    containerPad: 'p-4 sm:p-5',
    topOffset: 'pl-8 sm:pl-9 pr-7',
    axisFontSize: 'text-[12px] sm:text-[14px]',
    axisLabelFont: 'text-[10px] sm:text-[12px]',
  },
};

const NAV_CONFIG = {
  position: 'bottom-left',
  scale: 'lg',
  behavior: {
    onlyShowInStatuses: true,
    showAxisTitles: true,
    showHighLowLabels: true,
    allowMinimize: true,
    defaultMinimizedOnMobile: true, // Automatically starts minimized on screens < 640px
  },
  theme: {
    outerContainer:
      'relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 shadow-xl select-none',
    innerGrid:
      'grid grid-cols-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700',
    minimizeBtn:
      'absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-700 transition-colors cursor-pointer',
    minimizedPill:
      'flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 shadow-xl text-slate-800 dark:text-slate-100 hover:scale-105 transition-all cursor-pointer select-none',
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
      shortTitle: 'Foreclosure',
      label: 'Identity Foreclosure (High Commitment, Low Exploration)',
      dotColor: 'bg-green-500',
      activeClass:
        'bg-green-500 ring-2 ring-white dark:ring-slate-900 shadow-lg shadow-green-500/50 scale-105 z-10',
      inactiveClass: 'bg-green-500/25 hover:bg-green-500/60',
    },
    {
      id: 'achievement',
      shortTitle: 'Achievement',
      label: 'Identity Achievement (High Commitment, High Exploration)',
      dotColor: 'bg-sky-500',
      activeClass:
        'bg-sky-500 ring-2 ring-white dark:ring-slate-900 shadow-lg shadow-sky-500/50 scale-105 z-10',
      inactiveClass: 'bg-sky-500/25 hover:bg-sky-500/60',
    },
    {
      id: 'diffusion',
      shortTitle: 'Diffusion',
      label: 'Identity Diffusion (Low Commitment, Low Exploration)',
      dotColor: 'bg-red-500',
      activeClass:
        'bg-red-500 ring-2 ring-white dark:ring-slate-900 shadow-lg shadow-red-500/50 scale-105 z-10',
      inactiveClass: 'bg-red-500/25 hover:bg-red-500/60',
    },
    {
      id: 'moratorium',
      shortTitle: 'Moratorium',
      label: 'Identity Moratorium (Low Commitment, High Exploration)',
      dotColor: 'bg-yellow-400',
      activeClass:
        'bg-yellow-400 ring-2 ring-white dark:ring-slate-900 shadow-lg shadow-yellow-400/50 scale-105 z-10',
      inactiveClass: 'bg-yellow-400/25 hover:bg-yellow-400/60',
    },
  ],
};

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isNavMinimized, setIsNavMinimized] = useState(() => {
    if (!NAV_CONFIG.behavior.defaultMinimizedOnMobile || typeof window === 'undefined') {
      return false;
    }
    return window.innerWidth < 640;
  });

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

  const scaleProps = SCALE_PRESETS[NAV_CONFIG.scale] ?? SCALE_PRESETS.sm;
  const positionClass =
    POSITION_PRESETS[NAV_CONFIG.position] ?? POSITION_PRESETS['bottom-left'];

  const hasAxisContent =
    NAV_CONFIG.behavior.showAxisTitles || NAV_CONFIG.behavior.showHighLowLabels;

  const currentQuadrant =
    NAV_CONFIG.quadrants.find((q) => q.id === activeSection) ?? NAV_CONFIG.quadrants[2];

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-slate-100 transition-colors">
      {/* Dark/Light Mode Icon Button */}
      <div className="fixed top-4 right-4 sm:top-5 sm:right-5 z-50">
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

      {/* Floating 2x2 Quadrant Matrix Navigation (Minimizable & Mobile Responsive) */}
      <aside
        aria-label="Identity Matrix Compass"
        className={`fixed ${positionClass} z-50 max-w-[calc(100vw-2rem)] transition-all duration-500 ease-out ${
          showQuadrantNav
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {isNavMinimized ? (
          /* Minimized Pill Button */
          <button
            type="button"
            onClick={() => setIsNavMinimized(false)}
            aria-expanded="false"
            aria-label="Expand 2x2 identity compass"
            title="Expand Identity Compass"
            className={NAV_CONFIG.theme.minimizedPill}
          >
            {/* Mini 2x2 Status Icon */}
            <span className="grid grid-cols-2 gap-0.5 p-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
              {NAV_CONFIG.quadrants.map((q) => (
                <span
                  key={q.id}
                  className={`w-2 h-2 rounded-[2px] ${q.dotColor} ${
                    activeSection === q.id ? 'opacity-100 scale-110' : 'opacity-30'
                  }`}
                />
              ))}
            </span>

            <span className="text-xs font-bold tracking-tight">
              {currentQuadrant.shortTitle}
            </span>

            {/* Plus (+) Icon */}
            <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v14m-7-7h14" />
              </svg>
            </span>
          </button>
        ) : (
          /* Expanded 2x2 Quadrant HUD */
          <div className={`${scaleProps.containerPad} rounded-2xl ${NAV_CONFIG.theme.outerContainer}`}>
            {/* Minus (-) Minimize Button */}
            {NAV_CONFIG.behavior.allowMinimize && (
              <button
                type="button"
                onClick={() => setIsNavMinimized(true)}
                aria-expanded="true"
                aria-label="Minimize navigation compass"
                title="Minimize"
                className={NAV_CONFIG.theme.minimizeBtn}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14" />
                </svg>
              </button>
            )}

            {/* Top Axis: Exploration */}
            {hasAxisContent && (
              <div className={`${scaleProps.topOffset} text-center mb-1`}>
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
        )}
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