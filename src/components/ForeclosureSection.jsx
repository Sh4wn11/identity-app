import { useState } from 'react';
import foreclosureAskImg from '../assets/ForeclosureAsk.png';
import foreclosureMainImg from '../assets/ForeclosureMain.png';

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
    mainImageSize: 'w-44 h-44 sm:w-52 sm:h-52',
    featureTitle: 'text-xl sm:text-2xl font-extrabold',
    featureSub: 'text-xs sm:text-sm',
    beliefCardPad: 'p-4',
    beliefText: 'text-xs sm:text-sm font-semibold',
    questionText: 'text-xs sm:text-sm font-medium',
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
    mainImageSize: 'w-52 h-52 sm:w-60 sm:h-60',
    featureTitle: 'text-2xl sm:text-3xl font-extrabold',
    featureSub: 'text-sm sm:text-base',
    beliefCardPad: 'p-4 sm:p-5',
    beliefText: 'text-sm sm:text-base font-bold',
    questionText: 'text-sm sm:text-base font-medium',
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
    mainImageSize: 'w-60 h-60 sm:w-68 sm:h-68',
    featureTitle: 'text-3xl sm:text-4xl font-extrabold',
    featureSub: 'text-base sm:text-lg',
    beliefCardPad: 'p-5 sm:p-6',
    beliefText: 'text-base sm:text-lg font-bold',
    questionText: 'text-base sm:text-lg font-medium',
  },
};

// ==========================================
// MASTER FORECLOSURE SECTION CONFIGURATION
// ==========================================
const FORECLOSURE_CONFIG = {
  scale: 'md', // 'sm' | 'md' | 'lg'
  behavior: {
    allowMultipleBeliefsOpen: true,
    defaultOpenBeliefIds: [1], // Array of belief IDs open by default (e.g., [1] or [])
  },
  theme: {
    sectionBg: 'bg-white dark:bg-slate-950 transition-colors',
    titleColor: 'text-green-600 dark:text-green-500',
    badge:
      'inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-green-100 text-green-800 dark:bg-green-950/80 dark:text-green-300 border border-green-300 dark:border-green-800/60 mb-3',
    speechBubble:
      'relative bg-green-50 dark:bg-green-950/40 text-slate-800 dark:text-slate-100 border border-green-300 dark:border-green-800/70 rounded-2xl rounded-bl-xs shadow-xs font-medium italic',
    speechBubbleTail:
      'hidden sm:block absolute -left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-green-50 dark:bg-slate-900 border-l border-b border-green-300 dark:border-green-800/70 rotate-45',
    descriptionColor: 'text-slate-600 dark:text-slate-300 font-medium',
    threeColContainer:
      'grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-green-500 dark:divide-green-500/80 rounded-3xl border-2 border-green-500/40 dark:border-green-500/40 bg-white dark:bg-slate-900/60 shadow-xl overflow-hidden',
    headingColor: 'text-green-600 dark:text-green-400',
    dotColor: 'bg-green-500',
    featureShell:
      'rounded-3xl border-2 border-green-500/30 dark:border-green-500/40 bg-green-50/30 dark:bg-slate-900/70 shadow-xl',
    beliefButton:
      'w-full flex items-center justify-between gap-4 text-left rounded-2xl border-2 bg-white dark:bg-slate-900 transition-all cursor-pointer',
    beliefButtonIdle:
      'border-green-300 dark:border-green-800/80 hover:border-green-500 dark:hover:border-green-500 shadow-sm',
    beliefButtonActive:
      'border-green-600 dark:border-green-500 ring-2 ring-green-500/20 shadow-md',
    questionPanel:
      'rounded-2xl border-2 border-green-500/60 dark:border-green-500/60 bg-green-100/70 dark:bg-green-950/50 text-slate-900 dark:text-slate-100 shadow-md',
  },
  content: {
    badgeText: 'HIGH COMMITMENT & LOW EXPLORATION',
    title: 'Identity Foreclosure',
    askImageSrc: foreclosureAskImg,
    askImageAlt: 'Character illustration asking about Identity Foreclosure',
    monologueLabel: 'Internal Monologue',
    monologueQuote: '"I\'ve made a choice without thinking."',
    description:
      'You blindly accept the values provided by your parents or your community without ever questioning them.',
    problemHeading: 'The Core Problem',
    problemBody:
      'You feel intense pressure to perform a specific moral identity for your peers or on social media, leading you to adopt values you do not genuinely believe in.',
    mainImageSrc: foreclosureMainImg,
    mainImageAlt: 'Identity Foreclosure visual illustration',
    solutionHeading: 'The Solution',
    solutionBody:
      'Challenge your inherited beliefs to jumpstart your exploration phase and encourage independent reasoning.',
    interactiveTitle: 'Make room for a different view:',
    interactiveSub:
      'Notice the beliefs you inherited and examine them with curiosity.',
    beliefs: [
      {
        id: 1,
        belief: 'I must follow the stable career my family chose for me.',
        question:
          'What problem in the world do I actually enjoy solving when no one is watching?',
      },
      {
        id: 2,
        belief: 'Success means hitting the exact milestones my peers expect.',
        question:
          "If I couldn't tell anyone about my achievements, what would I still pursue?",
      },
      {
        id: 3,
        belief:
          'Questioning what I was taught growing up is a sign of disloyalty.',
        question:
          'How does examining a belief from multiple angles actually make my convictions stronger?',
      },
    ],
  },
};

export default function ForeclosureSection() {
  const [openBeliefIds, setOpenBeliefIds] = useState(
    () => FORECLOSURE_CONFIG.behavior.defaultOpenBeliefIds ?? []
  );

  const scaleProps =
    SCALE_PRESETS[FORECLOSURE_CONFIG.scale] ?? SCALE_PRESETS.md;
  const { theme, content, behavior } = FORECLOSURE_CONFIG;

  function handleToggleBelief(id) {
    setOpenBeliefIds((prev) => {
      const isOpen = prev.includes(id);
      if (behavior.allowMultipleBeliefsOpen) {
        return isOpen ? prev.filter((item) => item !== id) : [...prev, id];
      }
      return isOpen ? [] : [id];
    });
  }

  return (
    <section
      id="foreclosure"
      aria-labelledby="foreclosure-title"
      className={`min-h-screen w-full flex items-center justify-center ${theme.sectionBg}`}
    >
      <div
        className={`mx-auto w-full ${scaleProps.sectionPad} flex flex-col items-center`}
      >
        {/* 1. Top Center Header */}
        <div className="text-center mb-6">
          <span className={theme.badge}>{content.badgeText}</span>
          <h2
            id="foreclosure-title"
            className={`${scaleProps.mainTitle} ${theme.titleColor}`}
          >
            {content.title}
          </h2>
        </div>

        {/* 2. Compact 2-Column Monologue Row (Constrained to Title Height) */}
        <div
          className={`w-full max-w-2xl ${scaleProps.monologueRowHeight} grid grid-cols-[auto_1fr] items-center gap-4 sm:gap-5 px-4 mb-6`}
        >
          {/* Left: Small Picture (ForeclosureAsk.png) */}
          <div
            className={`${scaleProps.askAvatarSize} shrink-0 rounded-2xl overflow-hidden border-2 border-green-500/50 bg-green-50 dark:bg-slate-900 shadow-sm flex items-center justify-center`}
          >
            <img
              src={content.askImageSrc}
              alt={content.askImageAlt}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Right: Speech Bubble Monologue */}
          <div
            className={`${theme.speechBubble} ${scaleProps.bubbleText} flex flex-col justify-center`}
          >
            <span className={theme.speechBubbleTail} aria-hidden="true" />
            <span className="block text-[10px] font-extrabold uppercase tracking-wider text-green-700 dark:text-green-400 not-italic mb-0.5">
              {content.monologueLabel}
            </span>
            <p className="leading-snug line-clamp-2">
              {content.monologueQuote}
            </p>
          </div>
        </div>

        {/* 3. Centered Description */}
        <p
          className={`text-center ${scaleProps.descriptionText} ${theme.descriptionColor} mb-10`}
        >
          {content.description}
        </p>

        {/* 4. 3-Column Card: Left (Core Problem) | Middle (Image) | Right (Solution) */}
        <div className={`w-full ${theme.threeColContainer} mb-14`}>
          {/* Left Column: Core Problem */}
          <div
            className={`${scaleProps.columnPad} flex flex-col justify-start space-y-3`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${theme.dotColor} shrink-0`}
              />
              <h3 className={`${scaleProps.columnTitle} ${theme.headingColor}`}>
                {content.problemHeading}
              </h3>
            </div>
            <p
              className={`${scaleProps.bodyText} text-slate-700 dark:text-slate-200 font-medium`}
            >
              {content.problemBody}
            </p>
          </div>

          {/* Middle Column: Main Illustration */}
          <div
            className={`${scaleProps.columnPad} flex items-center justify-center`}
          >
            <div
              className={`${scaleProps.mainImageSize} shrink-0 rounded-2xl overflow-hidden bg-green-50/60 dark:bg-slate-800/60 border border-green-300/70 dark:border-green-900/50 p-3 flex items-center justify-center shadow-inner`}
            >
              <img
                src={content.mainImageSrc}
                alt={content.mainImageAlt}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Right Column: Solution */}
          <div
            className={`${scaleProps.columnPad} flex flex-col justify-start space-y-3`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${theme.dotColor} shrink-0`}
              />
              <h3 className={`${scaleProps.columnTitle} ${theme.headingColor}`}>
                {content.solutionHeading}
              </h3>
            </div>
            <p
              className={`${scaleProps.bodyText} text-slate-700 dark:text-slate-200 font-medium`}
            >
              {content.solutionBody}
            </p>
          </div>
        </div>

        {/* 5. Interactive Feature: 3 Left-Aligned Beliefs that Expand Rightward */}
        <div className={`w-full ${scaleProps.columnPad} ${theme.featureShell}`}>
          <div className="mb-8">
            <h3
              className={`${scaleProps.featureTitle} text-slate-900 dark:text-white`}
            >
              {content.interactiveTitle}
            </h3>
            <p
              className={`mt-1.5 ${scaleProps.featureSub} text-slate-600 dark:text-slate-300`}
            >
              {content.interactiveSub}
            </p>
          </div>

          {/* 3 Rows: Belief on the Left -> Expands Rightward with Question */}
          <div className="space-y-4">
            {content.beliefs.map((item, index) => {
              const isOpen = openBeliefIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-stretch md:items-center"
                >
                  {/* Left Belief Card */}
                  <button
                    type="button"
                    onClick={() => handleToggleBelief(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`foreclosure-question-${item.id}`}
                    className={`md:w-[46%] shrink-0 ${scaleProps.beliefCardPad} ${
                      theme.beliefButton
                    } ${
                      isOpen
                        ? theme.beliefButtonActive
                        : theme.beliefButtonIdle
                    }`}
                  >
                    <div className="flex items-start gap-3 pr-2">
                      <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <div className="space-y-0.5">
                        <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          Inherited Belief
                        </span>
                        <span
                          className={`block ${scaleProps.beliefText} text-slate-900 dark:text-white leading-snug`}
                        >
                          &ldquo;{item.belief}&rdquo;
                        </span>
                      </div>
                    </div>

                    {/* Right Arrow at the Very End */}
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'bg-green-600 text-white shadow-sm'
                          : 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300'
                      }`}
                    >
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? ' rotate-90 md:rotate-0 md:translate-x-0.5' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </button>

                  {/* Rightward Expanding Question Panel */}
                  <div
                    id={`foreclosure-question-${item.id}`}
                    className={`overflow-hidden transition-all duration-500 ease-out flex items-center ${
                      isOpen
                        ? 'max-h-60 md:max-h-none md:max-w-[54%] flex-1 opacity-100 mt-2 md:mt-0 md:ml-3'
                        : 'max-h-0 md:max-h-none max-w-0 opacity-0 pointer-events-none mt-0 md:ml-0'
                    }`}
                  >
                    <div
                      className={`w-full min-w-[260px] ${scaleProps.beliefCardPad} ${theme.questionPanel} flex items-start gap-3`}
                    >
                      <span className="w-6 h-6 rounded-full bg-green-600 text-white text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                        ?
                      </span>
                      <div className="space-y-0.5">
                        <span className="block text-[10px] font-extrabold uppercase tracking-wider text-green-800 dark:text-green-300">
                          Question to Examine
                        </span>
                        <p className={`${scaleProps.questionText} leading-snug`}>
                          {item.question}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}