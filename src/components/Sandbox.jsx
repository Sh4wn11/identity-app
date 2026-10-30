import { useState, useReducer } from 'react';

const SANDBOX_SCALE_PRESETS = {
  sm: {
    containerPad: 'p-5 sm:p-6',
    title: 'text-xl sm:text-2xl font-extrabold',
    subtitle: 'text-xs sm:text-sm',
    padSquareSize: 'w-48 h-48 sm:w-52 sm:h-52',
    draftSquareSize: 'w-32 h-32 sm:w-36 sm:h-36',
    padFontSize: 'text-xs sm:text-sm',
    draftFontSize: 'text-xs',
    boardMinHeight: 'min-h-[260px]',
  },
  md: {
    containerPad: 'p-6 sm:p-8',
    title: 'text-2xl sm:text-3xl font-extrabold',
    subtitle: 'text-sm sm:text-base',
    padSquareSize: 'w-56 h-56 sm:w-60 sm:h-60',
    draftSquareSize: 'w-36 h-36 sm:w-40 sm:h-40',
    padFontSize: 'text-sm sm:text-base',
    draftFontSize: 'text-xs sm:text-sm',
    boardMinHeight: 'min-h-[300px]',
  },
  lg: {
    containerPad: 'p-8 sm:p-10',
    title: 'text-3xl sm:text-4xl font-extrabold',
    subtitle: 'text-base sm:text-lg',
    padSquareSize: 'w-64 h-64 sm:w-72 sm:h-72',
    draftSquareSize: 'w-40 h-40 sm:w-44 sm:h-44',
    padFontSize: 'text-base sm:text-lg',
    draftFontSize: 'text-sm sm:text-base',
    boardMinHeight: 'min-h-[340px]',
  },
};

// ==========================================
// MASTER SANDBOX CONFIGURATION
// ==========================================
const SANDBOX_CONFIG = {
  scale: 'md', // 'sm' | 'md' | 'lg'
  initialDrafts: [
    { id: 'sample-1', text: 'Try an intro coding class for one semester' },
  ],
  theme: {
    outerShell:
      'rounded-3xl border-2 border-yellow-500/40 dark:border-yellow-500/40 bg-yellow-50/30 dark:bg-slate-900/70 shadow-xl',
    padStickyNote:
      'bg-yellow-200 dark:bg-yellow-300 text-slate-900 border-2 border-yellow-400 shadow-[6px_6px_0px_rgba(234,179,8,0.35)]',
    draftStickyNote:
      'bg-yellow-200 dark:bg-yellow-300 text-slate-900 border border-yellow-400 shadow-md hover:shadow-lg hover:-rotate-1',
    draftBoard:
      'relative rounded-2xl border-2 border-dashed border-yellow-500/50 dark:border-yellow-500/40 bg-white/90 dark:bg-slate-950/70',
    draftBoardActive:
      'border-solid border-yellow-500 bg-yellow-50/60 dark:bg-yellow-950/20 ring-4 ring-yellow-400/20',
  },
  content: {
    badgeText: 'The Commitment Sandbox',
    title: 'Try an Idea before you commit',
    subtitle:
      'Add a thought, then drag it between boards—or use the note button on touch devices. You can erase anything whenever you like.',
    padLabel: 'Sticky Note Pad',
    placeholder: 'Type an idea here...\n(e.g., Major in Psychology, Join debate club)',
    touchAddButton: 'Pin to Drafts →',
    boardLabel: 'Drafts Board (Temporary & Editable)',
    emptyBoardPrompt:
      'Drag your square sticky note here to test it out as a low-pressure rough draft.',
    trashTooltip: 'Drag a draft note here to erase it',
  },
};

function draftsReducer(state, action) {
  switch (action.type) {
    case 'ADD_DRAFT': {
      const trimmed = action.payload.trim();
      if (!trimmed) return state;
      return [
        ...state,
        {
          id: `draft-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          text: trimmed,
        },
      ];
    }
    case 'DELETE_DRAFT':
      return state.filter((note) => note.id !== action.payload);
    default:
      return state;
  }
}

export default function Sandbox() {
  const [drafts, dispatch] = useReducer(draftsReducer, SANDBOX_CONFIG.initialDrafts);
  const [padText, setPadText] = useState('');
  const [padKey, setPadKey] = useState(0); // Increments to trigger fresh sticky-note pop-up animation
  const [isOverBoard, setIsOverBoard] = useState(false);
  const [isOverTrash, setIsOverTrash] = useState(false);

  const scaleProps =
    SANDBOX_SCALE_PRESETS[SANDBOX_CONFIG.scale] ?? SANDBOX_SCALE_PRESETS.md;
  const { theme, content } = SANDBOX_CONFIG;

  // Commit the current pad note to the Draft Board and spawn a fresh pad note
  function commitPadNoteToBoard() {
    if (!padText.trim()) return;
    dispatch({ type: 'ADD_DRAFT', payload: padText });
    setPadText('');
    setPadKey((prev) => prev + 1);
  }

  // Dragging from the Left Sticky Note Pad
  function handlePadDragStart(e) {
    if (!padText.trim()) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('source', 'pad');
    e.dataTransfer.setData('text/plain', padText);
    e.dataTransfer.effectAllowed = 'move';
  }

  // Dragging an existing smaller note inside the Draft Board
  function handleDraftDragStart(e, id) {
    e.dataTransfer.setData('source', 'draft');
    e.dataTransfer.setData('noteId', id);
    e.dataTransfer.effectAllowed = 'move';
  }

  // Dropping onto the Right Draft Board
  function handleBoardDrop(e) {
    e.preventDefault();
    setIsOverBoard(false);
    const source = e.dataTransfer.getData('source');
    if (source === 'pad') {
      commitPadNoteToBoard();
    }
  }

  // Dropping onto the Bottom-Right Trash Icon
  function handleTrashDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsOverTrash(false);
    setIsOverBoard(false);

    const source = e.dataTransfer.getData('source');
    const noteId = e.dataTransfer.getData('noteId');

    if (source === 'draft' && noteId) {
      dispatch({ type: 'DELETE_DRAFT', payload: noteId });
    } else if (source === 'pad') {
      // Allow dragging the active pad note directly to trash to clear it
      setPadText('');
      setPadKey((prev) => prev + 1);
    }
  }

  const canDragPad = padText.trim().length > 0;

  return (
    <div className={`w-full ${scaleProps.containerPad} ${theme.outerShell}`}>
      {/* Sandbox Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-yellow-200/80 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-300 mb-2">
          {content.badgeText}
        </span>
        <h3 className={`${scaleProps.title} text-slate-900 dark:text-white`}>
          {content.title}
        </h3>
        <p className={`mt-1.5 ${scaleProps.subtitle} text-slate-600 dark:text-slate-300`}>
          {content.subtitle}
        </p>
      </div>

      {/* 2-Column Asymmetric Layout: Left Thinner (4 cols), Right Wider (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* LEFT COLUMN (Thinner): Infinite Square Sticky Note Pad */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            {content.padLabel}
          </span>

          {/* Stacked Pad Illusion Behind Active Note */}
          <div className="relative">
            <div
              aria-hidden="true"
              className={`${scaleProps.padSquareSize} aspect-square absolute inset-0 translate-x-2 translate-y-2 rotate-2 bg-yellow-300/70 dark:bg-yellow-400/40 border border-yellow-400/80 rounded-lg pointer-events-none`}
            />

            {/* Active Draggable Square Sticky Note */}
            <div
              key={padKey}
              draggable={canDragPad}
              onDragStart={handlePadDragStart}
              className={`relative z-10 ${scaleProps.padSquareSize} aspect-square p-4 rounded-lg flex flex-col justify-between transition-transform animate-sketch ${
                theme.padStickyNote
              } ${canDragPad ? 'cursor-grab active:cursor-grabbing' : ''}`}
            >
              {/* Top Pin Strip & Drag Hint */}
              <div className="flex items-center justify-between border-b border-yellow-500/30 pb-1.5 mb-2 select-none">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-yellow-900/70">
                  New Rough Draft
                </span>
                <span className="text-[10px] font-semibold text-yellow-900/70">
                  {canDragPad ? '⠿ Drag me' : 'Type below'}
                </span>
              </div>

              {/* Editable Text Box Inside Square Note */}
              <textarea
                value={padText}
                onChange={(e) => setPadText(e.target.value)}
                placeholder={content.placeholder}
                aria-label="Type a potential life commitment"
                className={`w-full flex-1 resize-none bg-transparent border-none focus:outline-none ${scaleProps.padFontSize} font-medium text-slate-900 placeholder:text-yellow-900/45 leading-snug`}
              />

              {/* Footer Touch Button & Character Indicator */}
              <div className="pt-2 border-t border-yellow-500/30 flex items-center justify-between gap-2">
                <span className="text-[10px] font-medium text-yellow-900/60">
                  Temporary & safe
                </span>
                <button
                  type="button"
                  onClick={commitPadNoteToBoard}
                  disabled={!canDragPad}
                  className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-900 text-white hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-opacity cursor-pointer"
                >
                  {content.touchAddButton}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (Wider): Drafts Drop Board + Bottom-Right Trash Zone */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {content.boardLabel}
            </span>
            <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-400">
              {drafts.length} {drafts.length === 1 ? 'Draft' : 'Drafts'}
            </span>
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsOverBoard(true);
            }}
            onDragLeave={() => setIsOverBoard(false)}
            onDrop={handleBoardDrop}
            className={`flex-1 ${scaleProps.boardMinHeight} p-5 pb-20 transition-all ${
              theme.draftBoard
            } ${isOverBoard ? theme.draftBoardActive : ''}`}
          >
            {drafts.length === 0 ? (
              <div className="h-full min-h-[200px] flex flex-col items-center justify-center text-center px-4 pointer-events-none">
                <p className="text-sm font-medium text-slate-400 dark:text-slate-500 max-w-sm">
                  {content.emptyBoardPrompt}
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-4 items-start">
                {drafts.map((note) => (
                  <div
                    key={note.id}
                    draggable
                    onDragStart={(e) => handleDraftDragStart(e, note.id)}
                    className={`${scaleProps.draftSquareSize} aspect-square p-3.5 rounded-lg flex flex-col justify-between cursor-grab active:cursor-grabbing transition-all animate-sketch ${theme.draftStickyNote}`}
                  >
                    <div className="flex items-center justify-between border-b border-yellow-500/30 pb-1">
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-yellow-900/60">
                        Draft
                      </span>
                      {/* Touch / Click Fallback Delete Button */}
                      <button
                        type="button"
                        onClick={() =>
                          dispatch({ type: 'DELETE_DRAFT', payload: note.id })
                        }
                        aria-label="Erase draft note"
                        title="Erase draft"
                        className="w-4 h-4 rounded-full flex items-center justify-center text-yellow-900/60 hover:text-red-600 hover:bg-yellow-300/60 transition-colors cursor-pointer"
                      >
                        &times;
                      </button>
                    </div>

                    <p
                      className={`${scaleProps.draftFontSize} font-semibold text-slate-900 leading-snug overflow-y-auto my-1 break-words`}
                    >
                      {note.text}
                    </p>

                    <span className="text-[9px] font-medium text-yellow-900/50 select-none">
                      ⠿ Drag to trash
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom-Right Trash Drop Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOverTrash(true);
              }}
              onDragLeave={() => setIsOverTrash(false)}
              onDrop={handleTrashDrop}
              title={content.trashTooltip}
              aria-label={content.trashTooltip}
              className={`absolute bottom-4 right-4 flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border-2 transition-all select-none ${
                isOverTrash
                  ? 'bg-red-500 text-white border-red-600 scale-110 shadow-lg shadow-red-500/30'
                  : 'bg-slate-100/90 dark:bg-slate-800/90 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-700 hover:border-red-400 hover:text-red-500'
              }`}
            >
              <svg
                className="w-5 h-5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">
                {isOverTrash ? 'Release to Erase' : 'Trash'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}