import achievementAskImg from '../assets/AchievementAsk.png';
import achievementMainImg from '../assets/AchievementMain.png';

const SCALE_PRESETS = {
  sm: {
    sectionPad: 'py-16 px-5 max-w-4xl',
    mainTitle: 'text-3xl sm:text-4xl font-extrabold tracking-tight',
    monologueRowHeight: 'h-14 sm:h-16',
    askAvatarSize: 'w-12 h-12 sm:w-14 sm:h-14',
    bubbleText: 'text-xs sm:text-sm px-3.5 py-2',
    descriptionText: 'text-sm sm:text-base max-w-2xl',
    mainImageSize: 'w-full max-w-md max-h-72',
    rowGap: 'space-y-8',
    blockTitle: 'text-lg sm:text-xl font-bold',
    bodyText: 'text-xs sm:text-sm leading-relaxed',
  },
  md: {
    sectionPad: 'py-20 px-6 sm:px-10 max-w-5xl',
    mainTitle: 'text-4xl sm:text-5xl font-black tracking-tight',
    monologueRowHeight: 'h-16 sm:h-20',
    askAvatarSize: 'w-14 h-14 sm:w-16 sm:h-16',
    bubbleText: 'text-sm sm:text-base px-4 py-2.5',
    descriptionText: 'text-base sm:text-lg max-w-3xl',
    mainImageSize: 'w-full max-w-xl max-h-96',
    rowGap: 'space-y-12',
    blockTitle: 'text-xl sm:text-2xl font-extrabold',
    bodyText: 'text-sm sm:text-base leading-relaxed',
  },
  lg: {
    sectionPad: 'py-24 px-6 sm:px-12 max-w-6xl',
    mainTitle: 'text-5xl sm:text-6xl font-black tracking-tight',
    monologueRowHeight: 'h-20 sm:h-24',
    askAvatarSize: 'w-16 h-16 sm:w-20 sm:h-20',
    bubbleText: 'text-base sm:text-lg px-5 py-3',
    descriptionText: 'text-lg sm:text-xl max-w-3xl',
    mainImageSize: 'w-full max-w-2xl max-h-[440px]',
    rowGap: 'space-y-14',
    blockTitle: 'text-2xl sm:text-3xl font-extrabold',
    bodyText: 'text-base sm:text-lg leading-relaxed',
  },
};

const SECOND_ROW_LAYOUT_PRESETS = {
  'two-col': 'grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start',
  stacked: 'flex flex-col space-y-8 max-w-3xl mx-auto',
};

// ==========================================
// MASTER ACHIEVEMENT SECTION CONFIGURATION
// ==========================================
const ACHIEVEMENT_CONFIG = {
  scale: 'md',               // 'sm' | 'md' | 'lg'
  secondRowLayout: 'two-col', // 'two-col' | 'stacked'
  theme: {
    sectionBg: 'bg-white dark:bg-slate-950 transition-colors',
    titleColor: 'text-sky-600 dark:text-sky-400',
    badge:
      'inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300 border border-sky-300 dark:border-sky-800/60 mb-3',
    speechBubble:
      'relative bg-sky-50 dark:bg-sky-950/40 text-slate-800 dark:text-slate-100 border border-sky-200 dark:border-sky-800/70 rounded-2xl rounded-bl-xs shadow-xs font-medium italic',
    speechBubbleTail:
      'hidden sm:block absolute -left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-sky-50 dark:bg-slate-900 border-l border-b border-sky-200 dark:border-sky-800/70 rotate-45',
    descriptionColor: 'text-slate-600 dark:text-slate-300 font-medium',
    headingColor: 'text-sky-600 dark:text-sky-400',
    dotColor: 'bg-sky-500',
  },
  content: {
    badgeText: 'HIGH COMMITMENT & HIGH EXPLORATION',
    title: 'Identity Achievement',
    askImageSrc: achievementAskImg,
    askImageAlt: 'Character illustration representing Identity Achievement',
    monologueLabel: 'Internal Monologue',
    monologueQuote:
      '"I thought about it and I now know what I should do with my life."',
    description:
      'After surviving a period of crisis and questioning, you finally commit to a moral framework that you have chosen for yourself.',
    mainImageSrc: achievementMainImg,
    mainImageAlt: 'Identity Achievement celebration illustration',
    challengeHeading: 'The Challenge Conquered',
    challengeBody:
      'Overcoming a fractured sense of self to build a stable self-concept.',
    outcomeHeading: 'The Outcome',
    outcomeBody:
      'You develop a deep, authentic understanding of who you are, resulting in a strong, resilient self-concept. This stage is characterized by a noticeable increase in self-confidence, the ability to be decisive, and the capacity to clearly explain why they believe a certain view.',
  },
};

export default function AchievementSection() {
  const scaleProps = SCALE_PRESETS[ACHIEVEMENT_CONFIG.scale] ?? SCALE_PRESETS.md;
  const secondRowLayoutClass =
    SECOND_ROW_LAYOUT_PRESETS[ACHIEVEMENT_CONFIG.secondRowLayout] ??
    SECOND_ROW_LAYOUT_PRESETS['two-col'];
  const { theme, content } = ACHIEVEMENT_CONFIG;

  return (
    <section
      id="achievement"
      aria-labelledby="achievement-title"
      className={`min-h-screen w-full flex items-center justify-center ${theme.sectionBg}`}
    >
      <div
        className={`mx-auto w-full ${scaleProps.sectionPad} flex flex-col items-center`}
      >
        {/* 1. Top Center Header */}
        <div className="text-center mb-6">
          <span className={theme.badge}>{content.badgeText}</span>
          <h2
            id="achievement-title"
            className={`${scaleProps.mainTitle} ${theme.titleColor}`}
          >
            {content.title}
          </h2>
        </div>

        {/* 2. Compact 2-Column Monologue Row (Constrained to Title Height) */}
        <div
          className={`w-full max-w-2xl ${scaleProps.monologueRowHeight} grid grid-cols-[auto_1fr] items-center gap-4 sm:gap-5 px-4 mb-6`}
        >
          {/* Left: Small Picture (AchievementAsk.png) */}
          <div
            className={`${scaleProps.askAvatarSize} shrink-0 rounded-2xl overflow-hidden bg-sky-50 dark:bg-slate-900 shadow-sm flex items-center justify-center`}
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
            <span className="block text-[10px] font-extrabold uppercase tracking-wider text-sky-700 dark:text-sky-400 not-italic mb-0.5">
              {content.monologueLabel}
            </span>
            <p className="leading-snug line-clamp-2">
              {content.monologueQuote}
            </p>
          </div>
        </div>

        {/* 3. Centered Description */}
        <p
          className={`text-center ${scaleProps.descriptionText} ${theme.descriptionColor} mb-12`}
        >
          {content.description}
        </p>

        {/* 4. Borderless 2-Row Content Layout */}
        <div className={`w-full ${scaleProps.rowGap}`}>
          {/* 1st Row: Large AchievementMain.png (No Borders) */}
          <div className="w-full flex justify-center">
            <img
              src={content.mainImageSrc}
              alt={content.mainImageAlt}
              className={`${scaleProps.mainImageSize} h-auto object-contain`}
            />
          </div>

          {/* 2nd Row: The Challenge Conquered & The Outcome (No Borders) */}
          <div className={`w-full ${secondRowLayoutClass}`}>
            {/* The Challenge Conquered */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${theme.dotColor} shrink-0`}
                />
                <h3 className={`${scaleProps.blockTitle} ${theme.headingColor}`}>
                  {content.challengeHeading}
                </h3>
              </div>
              <p
                className={`${scaleProps.bodyText} text-slate-700 dark:text-slate-200 font-medium`}
              >
                {content.challengeBody}
              </p>
            </div>

            {/* The Outcome */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${theme.dotColor} shrink-0`}
                />
                <h3 className={`${scaleProps.blockTitle} ${theme.headingColor}`}>
                  {content.outcomeHeading}
                </h3>
              </div>
              <p
                className={`${scaleProps.bodyText} text-slate-700 dark:text-slate-200 font-medium`}
              >
                {content.outcomeBody}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}