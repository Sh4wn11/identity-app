const SCALE_PRESETS = {
  sm: {
    sectionPad: 'py-12 px-5 max-w-4xl',
    mainTitle: 'text-xl sm:text-2xl font-bold tracking-tight',
    subtitle: 'text-xs sm:text-sm',
    itemPad: 'py-3.5',
    citationText: 'text-xs sm:text-sm leading-relaxed',
    linkText: 'text-xs',
  },
  md: {
    sectionPad: 'py-16 px-6 sm:px-10 max-w-5xl',
    mainTitle: 'text-2xl sm:text-3xl font-bold tracking-tight',
    subtitle: 'text-sm sm:text-base',
    itemPad: 'py-4 sm:py-5',
    citationText: 'text-sm sm:text-base leading-relaxed',
    linkText: 'text-xs sm:text-sm',
  },
  lg: {
    sectionPad: 'py-20 px-6 sm:px-12 max-w-6xl',
    mainTitle: 'text-3xl sm:text-4xl font-bold tracking-tight',
    subtitle: 'text-base sm:text-lg',
    itemPad: 'py-5 sm:py-6',
    citationText: 'text-base sm:text-lg leading-relaxed',
    linkText: 'text-sm sm:text-base',
  },
};

const LAYOUT_PRESETS = {
  single: 'divide-y divide-slate-200 dark:divide-slate-800',
  'two-col':
    'grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 pt-4',
};

// ==========================================
// MASTER REFERENCES CONFIGURATION
// ==========================================
const REFERENCES_CONFIG = {
  scale: 'md',      // 'sm' | 'md' | 'lg'
  layout: 'single', // 'single' (classic academic list) | 'two-col' (2-column grid)
  theme: {
    sectionBg:
      'bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors',
    titleColor: 'text-slate-900 dark:text-slate-100',
    subtitleColor: 'text-slate-500 dark:text-slate-400',
    authorColor: 'font-semibold text-slate-900 dark:text-slate-100',
    bodyColor: 'text-slate-700 dark:text-slate-300',
    workTitleStyle: 'italic font-medium text-slate-800 dark:text-slate-200',
    linkStyle:
      'inline-flex items-center gap-1 mt-1 text-slate-600 dark:text-slate-400 underline underline-offset-4 decoration-slate-300 dark:decoration-slate-700 hover:text-slate-900 dark:hover:text-white hover:decoration-current transition-colors break-all',
  },
  content: {
    title: 'References',
    subtitle:
      'Research References',
    entries: [
      {
        id: 'marcia-1966',
        authorAndYear: 'James E. Marcia (1966).',
        textBeforeWork:
          'Development and validation of ego-identity status. ',
        workTitle: 'Socio-emotional Development',
        textAfterWork: '.',
        url: 'https://socioemotional.weebly.com/james-marcia.html',
      },
      {
        id: 'festinger-1957',
        authorAndYear: 'Leon Festinger (1957):',
        textBeforeWork:
          'The concept of the stress caused by holding conflicting values comes from his seminal book, ',
        workTitle: 'A Theory of Cognitive Dissonance',
        textAfterWork: '.',
        url: null,
      },
      {
        id: 'schwartz-2004',
        authorAndYear: 'Barry Schwartz (2004):',
        textBeforeWork:
          'The framework regarding "decision paralysis" when faced with too many moral or ideological options is based on his book, ',
        workTitle: 'The Paradox of Choice: Why More Is Less',
        textAfterWork: '.',
        url: null,
      },
      {
        id: 'hart-2009',
        authorAndYear:
          'Hart, W., Albarracín, D., Eagly, A. H., Brechan, I., Lindberg, M. J., & Merrill, L. (2009).',
        textBeforeWork:
          'Feeling validated versus being correct: A meta-analysis of selective exposure to information. ',
        workTitle: 'Psychological Bulletin',
        textAfterWork: ', 135, 555-588.',
        url: 'https://doi.org/10.1037/a0015701',
      },
      {
        id: 'yang-2023',
        authorAndYear: 'Yang, J. (2023).',
        textBeforeWork: 'On the Decision-Relevance of Subjective Beliefs. ',
        workTitle: 'SSRN Electronic Journal',
        textAfterWork: '.',
        url: 'https://doi.org/10.2139/ssrn.4425080',
      },
    ],
  },
};

export default function ReferencesSection() {
  const scaleProps = SCALE_PRESETS[REFERENCES_CONFIG.scale] ?? SCALE_PRESETS.md;
  const layoutClass =
    LAYOUT_PRESETS[REFERENCES_CONFIG.layout] ?? LAYOUT_PRESETS.single;
  const { theme, content } = REFERENCES_CONFIG;

  return (
    <footer
      id="references"
      aria-labelledby="references-title"
      className={`w-full ${theme.sectionBg}`}
    >
      <div className={`mx-auto w-full ${scaleProps.sectionPad}`}>
        {/* Plain Academic Header (No Badges) */}
        <div className="border-b-2 border-slate-900 dark:border-slate-200 pb-4 mb-2">
          <h2
            id="references-title"
            className={`${scaleProps.mainTitle} ${theme.titleColor}`}
          >
            {content.title}
          </h2>
          {content.subtitle && (
            <p className={`mt-1 ${scaleProps.subtitle} ${theme.subtitleColor}`}>
              {content.subtitle}
            </p>
          )}
        </div>

        {/* Bibliographic Entries */}
        <ol className={layoutClass}>
          {content.entries.map((entry) => (
            <li
              key={entry.id}
              className={`${scaleProps.itemPad} ${scaleProps.citationText} ${theme.bodyColor} pl-6 -indent-6`}
            >
              <span className={theme.authorColor}>{entry.authorAndYear}</span>{' '}
              <span>{entry.textBeforeWork}</span>
              <cite className={theme.workTitleStyle}>{entry.workTitle}</cite>
              <span>{entry.textAfterWork}</span>
              {entry.url && (
                <>
                  {' '}
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${scaleProps.linkText} ${theme.linkStyle} indent-0`}
                  >
                    <span>{entry.url}</span>
                    <svg
                      className="w-3.5 h-3.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </footer>
  );
}