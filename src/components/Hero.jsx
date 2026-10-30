import { useState, useEffect } from 'react';
import heroIllustration from '../assets/hero1.jpg';

// ==========================================
// 1. HERO PRESETS
// ==========================================
const LAYOUT_PRESETS = {
  'split-left': {
    container: 'grid grid-cols-1 lg:grid-cols-12 items-center lg:items-end gap-10 lg:gap-8',
    textCol: 'lg:col-span-6 text-left flex flex-col items-start',
    imageCol: 'lg:col-span-4  flex justify-center lg:justify-end lg:col-start-8',
  },
  'split-right': {
    container: 'grid grid-cols-1 lg:grid-cols-12 items-center lg:items-end gap-10 lg:gap-8',
    textCol: 'lg:col-span-6 lg:order-2 text-left flex flex-col items-start',
    imageCol: 'lg:col-span-6 lg:order-1 flex justify-center lg:justify-start',
  },
  centered: {
    container: 'flex flex-col items-center text-center gap-10',
    textCol: 'max-w-3xl flex flex-col items-center text-center',
    imageCol: 'w-full flex justify-center',
  },
};

const HERO_SCALE_PRESETS = {
  sm: {
    sectionPad: 'py-16 md:py-24 px-6 max-w-5xl',
    title: 'text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08] mb-4',
    subtitle: 'text-base sm:text-lg leading-relaxed max-w-md mb-6',
    buttonSize: 'px-4 py-2 text-sm rounded-md',
    imageWidth: 'w-full max-w-sm lg:max-w-md',
  },
  md: {
    sectionPad: 'py-20 md:py-28 px-6 sm:px-10 max-w-6xl',
    title: 'text-5xl sm:text-6xl lg:text-[64px] font-bold tracking-tight leading-[1.05] mb-5',
    subtitle: 'text-base sm:text-lg md:text-xl leading-relaxed max-w-lg mb-7',
    buttonSize: 'px-5 py-2.5 text-sm sm:text-base rounded-md',
    imageWidth: 'w-full max-w-md lg:max-w-xl',
  },
  lg: {
    sectionPad: 'py-24 md:py-32 px-6 sm:px-12 max-w-7xl',
    title: 'text-5xl sm:text-7xl lg:text-[72px] font-extrabold tracking-tight leading-[1.04] mb-6',
    subtitle: 'text-lg sm:text-xl md:text-2xl leading-relaxed max-w-xl mb-8',
    buttonSize: 'px-6 py-3 text-base sm:text-lg rounded-lg',
    imageWidth: 'w-full max-w-lg lg:max-w-2xl',
  },
};

const CTA_PRESETS = {
  'notion-blue':
    'bg-[#0075de] hover:bg-[#005bab] text-white font-semibold shadow-xs transition-colors cursor-pointer',
  'high-contrast':
    'bg-slate-900 hover:bg-slate-700 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 font-semibold shadow-sm transition-colors cursor-pointer',
  outline:
    'border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition-colors cursor-pointer',
};

// ==========================================
// 2. CHAT MODAL CONTAINER & FONT PRESETS
// ==========================================
const MODAL_CONTAINER_PRESETS = {
  sm: {
    dialogWidth: 'max-w-md',
    chatBodyHeight: 'max-h-[55vh]',
    headerPad: 'px-4 py-3',
    bodyPad: 'p-4 space-y-3',
    footerPad: 'px-4 py-3',
    bubblePad: 'px-3.5 py-2.5 rounded-2xl',
    bubbleMaxWidth: 'max-w-[85%]',
  },
  md: {
    dialogWidth: 'max-w-xl',
    chatBodyHeight: 'max-h-[65vh]',
    headerPad: 'px-6 py-4',
    bodyPad: 'p-6 space-y-4',
    footerPad: 'px-6 py-4',
    bubblePad: 'px-4 py-3 rounded-2xl',
    bubbleMaxWidth: 'max-w-[82%]',
  },
  lg: {
    dialogWidth: 'max-w-2xl',
    chatBodyHeight: 'max-h-[72vh]',
    headerPad: 'px-7 py-5',
    bodyPad: 'p-7 space-y-5',
    footerPad: 'px-7 py-5',
    bubblePad: 'px-5 py-3.5 rounded-3xl',
    bubbleMaxWidth: 'max-w-[80%]',
  },
  xl: {
    dialogWidth: 'max-w-3xl',
    chatBodyHeight: 'max-h-[78vh]',
    headerPad: 'px-8 py-5',
    bodyPad: 'p-8 space-y-6',
    footerPad: 'px-8 py-5',
    bubblePad: 'px-6 py-4 rounded-3xl',
    bubbleMaxWidth: 'max-w-[78%]',
  },
};

const MODAL_FONT_PRESETS = {
  sm: {
    headerTitle: 'text-sm font-bold',
    headerSubtitle: 'text-xs',
    senderLabel: 'text-[10px] font-semibold uppercase tracking-wider',
    bubbleText: 'text-xs sm:text-sm leading-relaxed',
    chartTitle: 'text-xs font-bold',
    chartBody: 'text-[11px] leading-snug',
    ctaButton: 'text-xs sm:text-sm px-4 py-2.5 rounded-xl font-semibold',
  },
  md: {
    headerTitle: 'text-base sm:text-lg font-bold',
    headerSubtitle: 'text-xs sm:text-sm',
    senderLabel: 'text-[11px] font-semibold uppercase tracking-wider',
    bubbleText: 'text-sm sm:text-base leading-relaxed',
    chartTitle: 'text-xs sm:text-sm font-bold',
    chartBody: 'text-xs leading-snug',
    ctaButton: 'text-sm sm:text-base px-5 py-3 rounded-xl font-semibold',
  },
  lg: {
    headerTitle: 'text-lg sm:text-xl font-bold',
    headerSubtitle: 'text-sm',
    senderLabel: 'text-xs font-semibold uppercase tracking-wider',
    bubbleText: 'text-base sm:text-lg leading-relaxed',
    chartTitle: 'text-sm font-bold',
    chartBody: 'text-xs sm:text-sm leading-snug',
    ctaButton: 'text-base sm:text-lg px-6 py-3.5 rounded-2xl font-bold',
  },
};

// ==========================================
// 3. MASTER HERO & CHAT MODAL CONFIGURATIONS
// ==========================================
const HERO_CONFIG = {
  layout: 'split-left',     // 'split-left' | 'split-right' | 'centered'
  scale: 'md',              // 'sm' | 'md' | 'lg'
  ctaVariant: 'notion-blue', // 'notion-blue' | 'high-contrast' | 'outline'
  behavior: {
    fullViewportHeight: true,
    showBadge: false,
    blendImageOnLight: true,
  },
  theme: {
    sectionBg: 'bg-white dark:bg-slate-950 transition-colors',
    badge:
      'inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 mb-4',
    titleColor: 'text-slate-950 dark:text-white',
    subtitleColor: 'text-slate-700 dark:text-slate-300 font-normal',
    imageWrapper: 'rounded-2xl overflow-hidden',
  },
  content: {
    badgeText: 'Identity Compass',
    title: "Finding Yourself Doesn't Have to Be Overwhelming",
    subtitle:
      'Discover how exploration and commitment shapes identity through four stages of self-discovery—and find a clearer sense of who you are.',
    ctaText: 'Start Exploring',
    imageSrc: heroIllustration,
    imageAlt: 'Illustration of people exploring identity pathways',
  },
};

const CHAT_MODAL_CONFIG = {
  containerSize: 'md', // 'sm' | 'md' | 'lg' | 'xl'
  fontScale: 'md',     // 'sm' | 'md' | 'lg'
  targetSectionId: 'diffusion',
  chartImageSrc: null, // Set to an imported image path if you want a custom PNG/JPG instead of the built-in 2x2 chart
  header: {
    title: 'Information',
    subtitle: 'Understanding the two core dimensions before we begin',
  },
  theme: {
    backdrop: 'bg-slate-950/60 backdrop-blur-sm',
    modalShell:
      'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden',
    userBubble:
      'bg-[#0075de] text-white rounded-br-xs shadow-xs',
    guideBubble:
      'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/70 dark:border-slate-700/70 rounded-bl-xs shadow-2xs',
    ctaButton:
      'w-full bg-[#0075de] hover:bg-[#005bab] text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer',
  },
  ctaText: 'Explore Identity Diffusion',
  messages: [
    {
      id: 'q-exploration',
      sender: 'user',
      text: 'What is Exploration?',
    },
    {
      id: 'a-exploration',
      sender: 'guide',
      text: 'Exploration is the active process of questioning, experimenting, and trying out different beliefs, career paths, and values rather than simply accepting what was handed to you.',
    },
    {
      id: 'q-commitment',
      sender: 'user',
      text: 'What is Commitment?',
    },
    {
      id: 'a-commitment',
      sender: 'guide',
      text: 'Commitment is the degree of personal investment and dedication you make to a specific choice, value system, or direction—and taking ownership of that path.',
    },
    {
      id: 'q-chart',
      sender: 'user',
      text: 'Can you tell me more?',
    },
    {
      id: 'a-chart',
      sender: 'guide',
      hasChart: true,
      text: "Psychologist James Marcia crossed Exploration (Low vs. High) with Commitment (Low vs. High) to map out four distinct identity statuses. You aren't locked into one box forever—you move through them as you grow.",
    },
    {
      id: 'a-ready',
      sender: 'guide',
      text: 'If you\'re ready, let\'s explore the first type of Identity Status, "Identity Diffusion" where the person lacks exploration and commitment.',
    },
  ],
};

// ==========================================
// 4. BUILT-IN 4-STATUS CHART COMPONENT
// ==========================================
function StatusMatrixChart({ fontProps, chartImageSrc }) {
  if (chartImageSrc) {
    return (
      <div className="mb-3 rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700">
        <img
          src={chartImageSrc}
          alt="Four Statuses of Identity Chart"
          className="w-full h-auto object-contain"
        />
      </div>
    );
  }

  return (
    <div className="mb-3 p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 select-none">
      {/* Top Axis: Exploration */}
      <div className="pl-6 text-center mb-1">
        <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-100">
          Exploration
        </span>
        <div className="grid grid-cols-2 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>

      <div className="flex items-stretch">
        {/* Left Axis: Commitment */}
        <div className="flex items-center pr-1.5">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-100 [writing-mode:vertical-lr] rotate-180 mr-1">
            Commitment
          </span>
          <div className="flex flex-col justify-between h-full py-2 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
            <span className="[writing-mode:vertical-lr] rotate-180">High</span>
            <span className="[writing-mode:vertical-lr] rotate-180">Low</span>
          </div>
        </div>

        {/* 2x2 Colored Status Boxes */}
        <div className="grid grid-cols-2 gap-1.5 w-full">
          <div className="p-2.5 rounded-xl bg-green-500/90 text-slate-950">
            <p className={fontProps.chartTitle}>Foreclosure:</p>
            <p className={fontProps.chartBody}>
              &ldquo;I&apos;ve made a choice without thinking&rdquo;
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-sky-400/95 text-slate-950">
            <p className={fontProps.chartTitle}>Identity Achievement:</p>
            <p className={fontProps.chartBody}>
              &ldquo;I thought about it and I now know what I should do with my life.&rdquo;
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-red-500/90 text-white">
            <p className={fontProps.chartTitle}>Identity Diffusion:</p>
            <p className={fontProps.chartBody}>
              &ldquo;I don&apos;t know and I don&apos;t care what I&apos;m supposed to do with my life.&rdquo;
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-yellow-300 text-slate-950">
            <p className={fontProps.chartTitle}>Moratorium:</p>
            <p className={fontProps.chartBody}>
              &ldquo;I&apos;m thinking about what I should do&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. MAIN HERO COMPONENT
// ==========================================
export default function Hero() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Fallback guards for all preset maps
  const layoutProps = LAYOUT_PRESETS[HERO_CONFIG.layout] ?? LAYOUT_PRESETS['split-left'];
  const scaleProps = HERO_SCALE_PRESETS[HERO_CONFIG.scale] ?? HERO_SCALE_PRESETS.md;
  const ctaClass = CTA_PRESETS[HERO_CONFIG.ctaVariant] ?? CTA_PRESETS['notion-blue'];

  const modalSize =
    MODAL_CONTAINER_PRESETS[CHAT_MODAL_CONFIG.containerSize] ?? MODAL_CONTAINER_PRESETS.md;
  const modalFont =
    MODAL_FONT_PRESETS[CHAT_MODAL_CONFIG.fontScale] ?? MODAL_FONT_PRESETS.md;

  // Handle Escape key and lock background page scroll while modal is open
  useEffect(() => {
    if (!isChatOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsChatOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isChatOpen]);

  function handleProceedToDiffusion() {
    setIsChatOpen(false);
    const targetEl = document.getElementById(CHAT_MODAL_CONFIG.targetSectionId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const heightClass = HERO_CONFIG.behavior.fullViewportHeight
    ? 'min-h-screen flex items-center'
    : '';

  const blendClass = HERO_CONFIG.behavior.blendImageOnLight
    ? 'mix-blend-multiply dark:mix-blend-normal dark:rounded-2xl'
    : '';

  return (
    <section
      id="hero"
      className={`w-full ${heightClass} ${HERO_CONFIG.theme.sectionBg}`}
    >
      <div className={`mx-auto w-full ${scaleProps.sectionPad}`}>
        <div className={layoutProps.container}>
          {/* Left Column: Headline, Subtitle & Modal Trigger CTA */}
          <div className={layoutProps.textCol}>
            {HERO_CONFIG.behavior.showBadge && (
              <span className={HERO_CONFIG.theme.badge}>
                {HERO_CONFIG.content.badgeText}
              </span>
            )}

            <h1 className={`${scaleProps.title} ${HERO_CONFIG.theme.titleColor}`}>
              {HERO_CONFIG.content.title}
            </h1>

            <p className={`${scaleProps.subtitle} ${HERO_CONFIG.theme.subtitleColor}`}>
              {HERO_CONFIG.content.subtitle}
            </p>

            <button
              type="button"
              onClick={() => setIsChatOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={isChatOpen}
              className={`inline-flex items-center gap-2 ${scaleProps.buttonSize} ${ctaClass}`}
            >
              <span>{HERO_CONFIG.content.ctaText}</span>
            </button>
          </div>

          {/* Right Column: Hero Illustration */}
          <div className={layoutProps.imageCol}>
            <div className={`${scaleProps.imageWidth} ${HERO_CONFIG.theme.imageWrapper}`}>
              <img
                src={HERO_CONFIG.content.imageSrc}
                alt={HERO_CONFIG.content.imageAlt}
                className={`w-full h-auto object-contain ${blendClass}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Chat UI Onboarding Modal */}
      {isChatOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-modal-title"
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${CHAT_MODAL_CONFIG.theme.backdrop}`}
          onClick={() => setIsChatOpen(false)}
        >
          <div
            className={`w-full ${modalSize.dialogWidth} ${CHAT_MODAL_CONFIG.theme.modalShell} flex flex-col`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className={`${modalSize.headerPad} border-b border-slate-200 dark:border-slate-800 flex items-center justify-between`}
            >
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <h2
                    id="chat-modal-title"
                    className={`${modalFont.headerTitle} text-slate-900 dark:text-white`}
                  >
                    {CHAT_MODAL_CONFIG.header.title}
                  </h2>
                  <p className={`${modalFont.headerSubtitle} text-slate-500 dark:text-slate-400`}>
                    {CHAT_MODAL_CONFIG.header.subtitle}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                aria-label="Close chat popup"
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Chat Conversation Area */}
            <div className={`${modalSize.bodyPad} ${modalSize.chatBodyHeight} overflow-y-auto`}>
              {CHAT_MODAL_CONFIG.messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <span
                      className={`${modalFont.senderLabel} text-slate-400 dark:text-slate-500 mb-1 px-1`}
                    >
                      {isUser ? 'You' : 'Guide'}
                    </span>

                    <div
                      className={`${modalSize.bubbleMaxWidth} ${modalSize.bubblePad} ${
                        isUser
                          ? CHAT_MODAL_CONFIG.theme.userBubble
                          : CHAT_MODAL_CONFIG.theme.guideBubble
                      }`}
                    >
                      {msg.hasChart && (
                        <StatusMatrixChart
                          fontProps={modalFont}
                          chartImageSrc={CHAT_MODAL_CONFIG.chartImageSrc}
                        />
                      )}
                      <p className={modalFont.bubbleText}>{msg.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer CTA */}
            <div
              className={`${modalSize.footerPad} border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50`}
            >
              <button
                type="button"
                onClick={handleProceedToDiffusion}
                className={`${modalFont.ctaButton} ${CHAT_MODAL_CONFIG.theme.ctaButton}`}
              >
                <span>{CHAT_MODAL_CONFIG.ctaText}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}