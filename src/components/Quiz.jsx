import { useState } from 'react';
import { quizQuestions } from './DataFile';

function getOptionStatus(option) {
    if (typeof option === 'string') return option;
    return (
        option.status ??
        option.identityStatus ??
        option.type ??
        option.value ??
        option.label ??
        option.text ??
        ''
    );
}

function getOptionLabel(option) {
    if (typeof option === 'string') return option;
    return option.text ?? option.label ?? option.answer ?? option.status ?? '';
}

function toSectionId(status) {
    return String(status)
        .toLowerCase()
        .replace('identity', '')
        .trim()
        .replace(/[^a-z0-9]+/g, '-');
}

const statusMeta = {
    'Identity Diffusion': {
        badge: 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200',
        border: 'border-diffusion',
        description: 'You may be feeling overwhelmed by choices or disconnected from the pressure to decide right now. Start with low-stakes curiosity.'
    },
    'Identity Moratorium': {
        badge: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200',
        border: 'border-moratorium',
        description: 'You are actively exploring possibilities, though the fear of making a permanent mistake might be causing analysis paralysis.'
    },
    'Identity Foreclosure': {
        badge: 'bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200',
        border: 'border-foreclosure',
        description: 'You have strong commitments, likely shaped by family or tradition. Your next step is gently examining how those fit your authentic self.'
    },
    'Identity Achievement': {
        badge: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200',
        border: 'border-achievement',
        description: 'You have navigated uncertainty, questioned inherited assumptions, and built a resilient, self-authored sense of direction.'
    }
};

export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const result = selectedAnswers.reduce((mostFrequent, status) => {
        if (!status) return mostFrequent;

        const count = selectedAnswers.filter((answer) => answer === status).length;
        const bestCount = mostFrequent
            ? selectedAnswers.filter((answer) => answer === mostFrequent).length
            : 0;

        return count > bestCount ? status : mostFrequent;
    }, '');

    function handleAnswer(option) {
        const answers = [...selectedAnswers];
        answers[currentQuestion] = getOptionStatus(option);
        setSelectedAnswers(answers);

        if (currentQuestion === quizQuestions.length - 1) {
            setShowResult(true);
        } else {
            setCurrentQuestion((index) => index + 1);
        }
    }

    function handleRetake() {
        setCurrentQuestion(0);
        setSelectedAnswers([]);
        setShowResult(false);
    }

    if (!quizQuestions.length) {
        return null;
    }

    const progressPercentage = ((currentQuestion + 1) / quizQuestions.length) * 100;
    const currentMeta = statusMeta[result] || statusMeta['Identity Moratorium'];

    return (
        <section
            id="quiz"
            aria-labelledby="quiz-title"
            className="min-h-screen flex items-center justify-center py-20 px-6 bg-slate-50 dark:bg-slate-900/60 transition-colors"
        >
            <div className="w-full max-w-2xl">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 mb-3">
                        Self-Discovery Assessment
                    </span>
                    <h2
                        id="quiz-title"
                        className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
                    >
                        Which Status Are You?
                    </h2>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                        Answer three quick reflection prompts to locate your current stage on the compass.
                    </p>
                </div>

                {/* Main Interactive Card */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 md:p-10 transition-all">
                    {showResult ? (
                        <div className={`text-center space-y-6 border-t-4 pt-6 ${currentMeta.border}`}>
                            <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${currentMeta.badge}`}>
                                Assessment Complete
                            </span>

                            <div className="space-y-2">
                                <p className="text-sm uppercase tracking-widest text-slate-400 dark:text-slate-500 font-medium">
                                    Your Primary Stage
                                </p>
                                <h3
                                    id="quiz-result-title"
                                    className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white"
                                >
                                    {result}
                                </h3>
                            </div>

                            <p className="text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
                                {currentMeta.description}
                            </p>

                            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a
                                    href={`#${toSectionId(result)}`}
                                    className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold bg-slate-900 text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 transition-colors text-center"
                                >
                                    Explore {result} Section
                                </a>
                                <button
                                    type="button"
                                    onClick={handleRetake}
                                    className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                                >
                                    Retake Quiz
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {/* Progress Header */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                                    <span>{Math.round(progressPercentage)}%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-indigo-600 dark:bg-indigo-400 transition-all duration-300 rounded-full"
                                        style={{ width: `${progressPercentage}%` }}
                                    />
                                </div>
                            </div>

                            {/* Question Prompt */}
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                                {quizQuestions[currentQuestion].question ?? quizQuestions[currentQuestion].text}
                            </h3>

                            {/* Option Stack */}
                            <div className="grid grid-cols-1 gap-3.5">
                                {quizQuestions[currentQuestion].options.map((option, index) => {
                                    const letters = ['A', 'B', 'C', 'D'];
                                    return (
                                        <button
                                            key={`${currentQuestion}-${index}`}
                                            type="button"
                                            onClick={() => handleAnswer(option)}
                                            className="group flex items-start gap-4 w-full text-left p-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 transition-all cursor-pointer"
                                        >
                                            <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                                {letters[index] ?? index + 1}
                                            </span>
                                            <span className="text-slate-700 dark:text-slate-200 font-medium leading-relaxed pt-0.5">
                                                {getOptionLabel(option)}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}