import moratoriumAskImg from '../assets/MoratoriumAsk.png';
import moratoriumMainImg from '../assets/MoratoriumMain.png';
import Sandbox from './Sandbox';

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
  },
};

// ==========================================
// MASTER MORATORIUM SECTION CONFIGURATION
// ==========================================
const MORATORIUM_CONFIG = {
  scale: 'md', // 'sm' | 'md' | 'lg'
  theme: {
    sectionBg: 'bg-white dark:bg-slate-950 transition-colors',
    titleColor: 'text-yellow-500 dark:text-yellow-400',
    badge:
      'inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-yellow-100 text-yellow-800 dark:bg-yellow-950/80 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-800/60 mb-3',
    speechBubble:
      'relative bg-yellow-50 dark:bg-yellow-950/40 text-slate-800 dark:text-slate-100 border border-yellow-300 dark:border-yellow-800/70 rounded-2xl rounded-bl-xs shadow-xs font-medium italic',
    speechBubbleTail:
      'hidden sm:block absolute -left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-yellow-50 dark:bg-slate-900 border-l border-b border-yellow-300 dark:border-yellow-800/70 rotate-45',
    descriptionColor: 'text-slate-600 dark:text-slate-300 font-medium',
    threeColContainer:
      'grid grid-cols-1 md:grid-cols-3 rounded-3xl border-2 border-yellow-500/40 dark:border-yellow-500/40 bg-white dark:bg-slate-900/60 shadow-xl overflow-hidden',
    leftColBorder:
      'border-b-2 md:border-b-0 md:border-r-2 border-yellow-500 dark:border-yellow-500/80',
    headingColor: 'text-yellow-600 dark:text-yellow-400',
    dotColor: 'bg-yellow-500',
  },
  content: {
    badgeText: 'HIGH EXPLORATION & LOW COMMITMENT',
    title: 'Identity Moratorium',
    askImageSrc: moratoriumAskImg,
    askImageAlt: 'Character illustration asking about Identity Moratorium',
    monologueLabel: 'Internal Monologue',
    monologueQuote: '"I\'m thinking about what I should do."',
    description:
      'You are actively questioning your moral compass and exploring different alternatives, but you have not yet settled on a definitive path.',
    problemHeading: 'The Core Problem',
    problemBody:
      "Every choice feels like a permanent trap. The overwhelming pressure to pick the 'right' life path creates high anxiety and exhaustion.",
    solutionHeading: 'The Solution',
    solutionBody:
      'Validate your anxiety regarding this overwhelming process. Navigate your options by reframing any new commitments as merely a "draft" rather than a permanent, high-stakes decision.',
    mainImageSrc: moratoriumMainImg,
    mainImageAlt: 'Identity Moratorium visual illustration',
  },
};

export default function MoratoriumSection() {
  const scaleProps = SCALE_PRESETS[MORATORIUM_CONFIG.scale] ?? SCALE_PRESETS.md;
  const { theme, content } = MORATORIUM_CONFIG;

  return (
    <section
      id="moratorium"
      aria-labelledby="moratorium-title"
      className={`min-h-screen w-full flex items-center justify-center ${theme.sectionBg}`}
    >
      <div className={`mx-auto w-full ${scaleProps.sectionPad} flex flex-col items-center`}>
        {/* 1. Top Center Header */}
        <div className="text-center mb-6">
          <span className={theme.badge}>{content.badgeText}</span>
          <h2
            id="moratorium-title"
            className={`${scaleProps.mainTitle} ${theme.titleColor}`}
          >
            {content.title}
          </h2>
        </div>

        {/* 2. Compact 2-Column Monologue Row (Constrained to Title Height) */}
        <div
          className={`w-full max-w-2xl ${scaleProps.monologueRowHeight} grid grid-cols-[auto_1fr] items-center gap-4 sm:gap-5 px-4 mb-6`}
        >
          {/* Left: Small Picture (MoratoriumAsk.png) */}
          <div
            className={`${scaleProps.askAvatarSize} shrink-0 rounded-2xl overflow-hidden border-2 border-yellow-500/50 bg-yellow-50 dark:bg-slate-900 shadow-sm flex items-center justify-center`}
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
            <span className="block text-[10px] font-extrabold uppercase tracking-wider text-yellow-700 dark:text-yellow-400 not-italic mb-0.5">
              {content.monologueLabel}
            </span>
            <p className="leading-snug line-clamp-2">{content.monologueQuote}</p>
          </div>
        </div>

        {/* 3. Centered Description */}
        <p
          className={`text-center ${scaleProps.descriptionText} ${theme.descriptionColor} mb-10`}
        >
          {content.description}
        </p>

        {/* 4. 3-Column Card (Border between Left & Middle; NO border between Middle & Right) */}
        <div className={`w-full ${theme.threeColContainer} mb-14`}>
          {/* Left Column: Core Problem (Separated by Yellow Border) */}
          <div className={`${scaleProps.columnPad} ${theme.leftColBorder} flex flex-col justify-start space-y-3`}>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${theme.dotColor} shrink-0`} />
              <h3 className={`${scaleProps.columnTitle} ${theme.headingColor}`}>
                {content.problemHeading}
              </h3>
            </div>
            <p className={`${scaleProps.bodyText} text-slate-700 dark:text-slate-200 font-medium`}>
              {content.problemBody}
            </p>
          </div>

          {/* Middle Column: Solution (No border separating it from Right Column) */}
          <div className={`${scaleProps.columnPad} flex flex-col justify-start space-y-3`}>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${theme.dotColor} shrink-0`} />
              <h3 className={`${scaleProps.columnTitle} ${theme.headingColor}`}>
                {content.solutionHeading}
              </h3>
            </div>
            <p className={`${scaleProps.bodyText} text-slate-700 dark:text-slate-200 font-medium`}>
              {content.solutionBody}
            </p>
          </div>

          {/* Right Column: MoratoriumMain.png (No border between Middle & Right) */}
          <div className={`${scaleProps.columnPad} pt-0 md:pt-6 flex items-center justify-center`}>
            <div
              className={`${scaleProps.mainImageSize} shrink-0 rounded-2xl overflow-hidden bg-yellow-50/60 dark:bg-slate-800/60 border border-yellow-300/70 dark:border-yellow-900/50 p-3 flex items-center justify-center shadow-inner`}
            >
              <img
                src={content.mainImageSrc}
                alt={content.mainImageAlt}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* 5. Interactive Feature: The Commitment Sandbox */}
        <div className="w-full">
          <Sandbox />
        </div>
      </div>
    </section>
  );
}