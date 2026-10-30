import { useState } from 'react';
import diffusionAskImg from '../assets/DiffusionAsk.png';
import diffusionMainImg from '../assets/DiffusionMain.png';

const SCALE_PRESETS = {
  sm: {
    sectionPad: 'py-16 px-5 max-w-4xl',
    mainTitle: 'text-3xl sm:text-4xl font-extrabold tracking-tight',
    monologueRowHeight: 'h-14 sm:h-16',
    askAvatarSize: 'w-12 h-12 sm:w-14 sm:h-14',
    bubbleText: 'text-xs sm:text-sm px-3.5 py-2',
    descriptionText: 'text-sm sm:text-base max-w-2xl',
    columnPad: 'p-5 sm:p-6',
    columnTitle: 'text-lg sm:text-xl font-bold',
    bodyText: 'text-xs sm:text-sm leading-relaxed',
    accordionTitle: 'text-xs sm:text-sm font-bold',
    mainImageSize: 'w-48 h-48 sm:w-56 sm:h-56',
  },
  md: {
    sectionPad: 'py-20 px-6 sm:px-10 max-w-5xl',
    mainTitle: 'text-4xl sm:text-5xl font-black tracking-tight',
    monologueRowHeight: 'h-16 sm:h-20',
    askAvatarSize: 'w-14 h-14 sm:w-16 sm:h-16',
    bubbleText: 'text-sm sm:text-base px-4 py-2.5',
    descriptionText: 'text-base sm:text-lg max-w-3xl',
    columnPad: 'p-6 sm:p-8',
    columnTitle: 'text-xl sm:text-2xl font-extrabold',
    bodyText: 'text-sm sm:text-base leading-relaxed',
    accordionTitle: 'text-sm sm:text-base font-bold',
    mainImageSize: 'w-56 h-56 sm:w-64 sm:h-64',
  },
  lg: {
    sectionPad: 'py-24 px-6 sm:px-12 max-w-6xl',
    mainTitle: 'text-5xl sm:text-6xl font-black tracking-tight',
    monologueRowHeight: 'h-20 sm:h-24',
    askAvatarSize: 'w-16 h-16 sm:w-20 sm:h-20',
    bubbleText: 'text-base sm:text-lg px-5 py-3',
    descriptionText: 'text-lg sm:text-xl max-w-3xl',
    columnPad: 'p-8 sm:p-10',
    columnTitle: 'text-2xl sm:text-3xl font-extrabold',
    bodyText: 'text-base sm:text-lg leading-relaxed',
    accordionTitle: 'text-base sm:text-lg font-bold',
    mainImageSize: 'w-64 h-64 sm:w-72 sm:h-72',
  },
};

// ==========================================
// MASTER DIFFUSION SECTION CONFIGURATION
// ==========================================
const DIFFUSION_CONFIG = {
  scale: 'md', // 'sm' | 'md' | 'lg'
  behavior: {
    allowMultipleAccordionsOpen: false,
    defaultOpenAccordionId: 'overwhelm', // 'overwhelm' | 'avoidance' | null
  },
  theme: {
    sectionBg: 'bg-white dark:bg-slate-950 transition-colors',
    titleColor: 'text-red-600 dark:text-red-500',
    badge:
      'inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 border border-red-200 dark:border-red-800/60 mb-3',
    speechBubble:
      'relative bg-red-50 dark:bg-red-950/40 text-slate-800 dark:text-slate-100 border border-red-200 dark:border-red-800/70 rounded-2xl rounded-bl-xs shadow-xs font-medium italic',
    speechBubbleTail:
      'hidden sm:block absolute -left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-red-50 dark:bg-slate-900 border-l border-b border-red-200 dark:border-red-800/70 rotate-45',
    descriptionColor: 'text-slate-600 dark:text-slate-300 font-medium',
    splitContainer:
      'grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-red-500 dark:divide-red-500/80 rounded-3xl border-2 border-red-500/30 dark:border-red-500/40 bg-white dark:bg-slate-900/60 shadow-xl overflow-hidden',
    problemHeadingColor: 'text-red-600 dark:text-red-400',
    solutionHeadingColor: 'text-red-600 dark:text-red-400',
    accordionCard:
      'rounded-2xl border border-red-200/80 dark:border-red-900/60 bg-red-50/40 dark:bg-slate-900/80 overflow-hidden transition-all',
    accordionActiveBorder: 'ring-2 ring-red-500/40 border-red-400 dark:border-red-500',
    accordionButton:
      'w-full flex items-center justify-between gap-3 p-4 text-left text-slate-900 dark:text-white hover:bg-red-100/50 dark:hover:bg-red-950/30 transition-colors cursor-pointer',
  },
  content: {
    badgeText: 'Low Exploration & Low Commitment',
    title: 'Identity Diffusion',
    askImageSrc: diffusionAskImg,
    askImageAlt: 'Character illustration asking about Identity Diffusion',
    monologueLabel: 'Internal Monologue',
    monologueQuote:
      '"I don\'t know and I don\'t care what I\'m supposed to do with my life."',
    description:
      'You are actively avoiding thinking about your personal values. You are making no commitments to any moral framework.',
    problemHeading: 'The Core Problem',
    problemSummary:
      'You lack direction and avoid the tension of decision-making entirely.',
    accordions: [
      {
        id: 'overwhelm',
        title: 'The Overwhelm of Infinite Choice',
        body: 'You are paralyzed by the "infinite spectrum of ideologies, lifestyles and communities via the internet". Instead of sparking curiosity, this "constant digital noise" becomes a barrier, causing you to disengage completely.',
      },
      {
        id: 'avoidance',
        title: 'Avoidance as a Defense Mechanism',
        body: 'Encountering conflicting moral viewpoints causes "immense psychological stress". To protect yourself from this tension, you cope by "avoiding thinking about values altogether" and intentionally making "no commitments".',
      },
    ],
    solutionHeading: 'The Solution',
    solutionBody:
      'Provide yourself with curated, low-stakes exposure to new ideas. The goal is to lower the barrier of exploration and begin building basic competence without feeling overwhelmed.',
    mainImageSrc: diffusionMainImg,
    mainImageAlt: 'Identity Diffusion visual illustration',
  },
};

export default function DiffusionSection() {
  const [openIds, setOpenIds] = useState(() =>
    DIFFUSION_CONFIG.behavior.defaultOpenAccordionId
      ? [DIFFUSION_CONFIG.behavior.defaultOpenAccordionId]
      : []
  );

  const scaleProps = SCALE_PRESETS[DIFFUSION_CONFIG.scale] ?? SCALE_PRESETS.md;
  const { theme, content, behavior } = DIFFUSION_CONFIG;

  function handleToggleAccordion(id) {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id);
      if (behavior.allowMultipleAccordionsOpen) {
        return isOpen ? prev.filter((item) => item !== id) : [...prev, id];
      }
      return isOpen ? [] : [id];
    });
  }

  return (
    <section
      id="diffusion"
      aria-labelledby="diffusion-title"
      className={`min-h-screen w-full flex items-center justify-center ${theme.sectionBg}`}
    >
      <div className={`mx-auto w-full ${scaleProps.sectionPad} flex flex-col items-center`}>
        {/* 1. Top Center Header */}
        <div className="text-center mb-6">
          <span className={theme.badge}>{content.badgeText}</span>
          <h2
            id="diffusion-title"
            className={`${scaleProps.mainTitle} ${theme.titleColor}`}
          >
            {content.title}
          </h2>
        </div>

        {/* 2. Compact 2-Column Monologue Row (Constrained to Title Height) */}
        <div
          className={`w-full max-w-2xl ${scaleProps.monologueRowHeight} grid grid-cols-[auto_1fr] items-center gap-4 sm:gap-5 px-4 mb-6`}
        >
          {/* Left: Small Picture (DiffusionAsk.png) */}
          <div className={`${scaleProps.askAvatarSize} shrink-0 rounded-2xl overflow-hidden border-2 border-red-500/40 bg-red-50 dark:bg-slate-900 shadow-sm flex items-center justify-center`}>
            <img
              src={content.askImageSrc}
              alt={content.askImageAlt}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Right: Speech Bubble Monologue */}
          <div className={`${theme.speechBubble} ${scaleProps.bubbleText} flex flex-col justify-center`}>
            <span className={theme.speechBubbleTail} aria-hidden="true" />
            <span className="block text-[10px] font-extrabold uppercase tracking-wider text-red-600 dark:text-red-400 not-italic mb-0.5">
              {content.monologueLabel}
            </span>
            <p className="leading-snug line-clamp-2">{content.monologueQuote}</p>
          </div>
        </div>

        {/* 3. Centered Description */}
        <p className={`text-center ${scaleProps.descriptionText} ${theme.descriptionColor} mb-10`}>
          {content.description}
        </p>

        {/* 4. Fixed 50/50 2-Column Split Grid with Red Separator Border */}
        <div className={`w-full ${theme.splitContainer}`}>
          {/* Left Half: The Core Problem + 2 Accordions */}
          <div className={`${scaleProps.columnPad} flex flex-col justify-between space-y-6`}>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                <h3 className={`${scaleProps.columnTitle} ${theme.problemHeadingColor}`}>
                  {content.problemHeading}
                </h3>
              </div>
              <p className={`${scaleProps.bodyText} text-slate-700 dark:text-slate-200 font-medium`}>
                {content.problemSummary}
              </p>
            </div>

            {/* Accordion Stack */}
            <div className="space-y-3">
              {content.accordions.map((item) => {
                const isOpen = openIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`${theme.accordionCard} ${
                      isOpen ? theme.accordionActiveBorder : ''
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleToggleAccordion(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`diffusion-panel-${item.id}`}
                      className={theme.accordionButton}
                    >
                      <span className={scaleProps.accordionTitle}>{item.title}</span>
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-300 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      >
                        &#9662;
                      </span>
                    </button>

                    {isOpen && (
                      <div
                        id={`diffusion-panel-${item.id}`}
                        className={`px-4 pb-4 pt-1 ${scaleProps.bodyText} text-slate-600 dark:text-slate-300 border-t border-red-100 dark:border-red-900/40`}
                      >
                        {item.body}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Half: The Solution + Fixed Size DiffusionMain.png */}
          <div className={`${scaleProps.columnPad} flex flex-col items-center justify-between space-y-6`}>
            <div className="w-full space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                <h3 className={`${scaleProps.columnTitle} ${theme.solutionHeadingColor}`}>
                  {content.solutionHeading}
                </h3>
              </div>
              <p className={`${scaleProps.bodyText} text-slate-700 dark:text-slate-200 font-medium`}>
                {content.solutionBody}
              </p>
            </div>

            {/* Fixed-Size Image Container for DiffusionMain.png */}
            <div
              className={`${scaleProps.mainImageSize} shrink-0 rounded-2xl overflow-hidden bg-red-50/50 dark:bg-slate-800/60 border border-red-200/70 dark:border-red-900/50 p-3 flex items-center justify-center shadow-inner`}
            >
              <img
                src={content.mainImageSrc}
                alt={content.mainImageAlt}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}