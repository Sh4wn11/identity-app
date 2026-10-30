export const moratoriumTabs = [
    {
        id: "definition",
        label: "1. The Definition",
        heading: "Active Exploration Without Commitment",
        body: "You are actively questioning who you are and testing different paths, values, and careers—but haven't locked in a final decision yet."
    },
    {
        id: "struggle",
        label: "2. The Struggle (Anxiety)",
        heading: "Analysis Paralysis & Fear of Permanence",
        body: "Every choice feels like a permanent trap. The overwhelming pressure to pick the 'right' life path creates high anxiety and exhaustion."
    },
    {
        id: "solution",
        label: "3. Actionable Solutions",
        heading: "Reframe Commitments as Temporary Drafts",
        body: "Validate the anxiety, organize your options visually, and treat every major life decision as an editable rough draft rather than a tattoo."
    }
];

export const foreclosureBeliefs = [
    {
        id: 1,
        category: "Career Path",
        inherited: "I must follow the stable career my family chose for me.",
        challenge: "What problem in the world do I actually enjoy solving when no one is watching?"
    },
    {
        id: 2,
        category: "Core Values",
        inherited: "Success means hitting the exact milestones my peers expect.",
        challenge: "If I couldn't tell anyone about my achievements, what would I still pursue?"
    },
    {
        id: 3,
        category: "Worldview",
        inherited: "Questioning what I was taught growing up is a sign of disloyalty.",
        challenge: "How does examining a belief from multiple angles actually make my convictions stronger?"
    }
];

export const achievementMilestones = [
    { id: 1, title: "Survived Uncertainty", desc: "Sat with the discomfort of not knowing all the answers without panicking." },
    { id: 2, title: "Questioned Inherited Rules", desc: "Evaluated family and societal expectations and kept only what truly aligns." },
    { id: 3, title: "Tested a 'Draft' Commitment", desc: "Tried a new skill, community, or direction knowing I could pivot later." },
    { id: 4, title: "Autonomous Decision-Making", desc: "Made a meaningful choice based on internal values rather than external pressure." }
];

export const quizQuestions = [
    {
        question: "When someone asks about your 5-year plan, what is your honest internal reaction?",
        options: [
            { text: "I shrug it off—I don't really know or care to stress about it right now.", status: "Identity Diffusion" },
            { text: "My chest tightens; I have five different ideas and I'm terrified of picking the wrong one.", status: "Identity Moratorium" },
            { text: "I state the exact plan my parents or mentors laid out for me years ago.", status: "Identity Foreclosure" },
            { text: "I share a clear direction I chose after testing out a few different interests.", status: "Identity Achievement" }
        ]
    },
    {
        question: "How do you handle a major disagreement with the values you grew up with?",
        options: [
            { text: "I tune out. Deep debates feel exhausting and pointless.", status: "Identity Diffusion" },
            { text: "I spiral into research, reading every perspective until I'm completely overwhelmed.", status: "Identity Moratorium" },
            { text: "I immediately defend the traditional view—there's no need to reinvent the wheel.", status: "Identity Foreclosure" },
            { text: "I respectfully weigh both sides and decide what aligns with my own lived experience.", status: "Identity Achievement" }
        ]
    },
    {
        question: "If you had to pick a new project or major tomorrow, how would you approach it?",
        options: [
            { text: "Pick whatever requires the least effort or delay it as long as possible.", status: "Identity Diffusion" },
            { text: "Make pros-and-cons lists for weeks and still struggle to hit 'submit'.", status: "Identity Moratorium" },
            { text: "Ask the people I respect most what I should do and follow their lead.", status: "Identity Foreclosure" },
            { text: "Commit to the option that excites me most, knowing I have the resilience to adapt.", status: "Identity Achievement" }
        ]
    }
];