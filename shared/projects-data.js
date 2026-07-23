// Single source of truth for all projects.
// Add a project here and it appears on the projects page, the header
// dropdown, and (if featured) the main page. Set codeUrl to a repo
// link to activate the View Code button.
const PROJECTS = [
    {
        name: 'Calculator',
        tag: 'Web App',
        description: 'A working calculator with exponent support and a simple, clean interface. Focused on smooth interactions and real-time results.',
        url: '../Calculator/calculator.html',
        codeUrl: 'https://github.com/lucasovbetts-tech/portfolio/tree/main/Calculator',
    },
    {
        name: 'To do list',
        tag: 'Web App',
        description: 'A task manager for adding, selecting, and clearing tasks, built around a simple layout that keeps everyday lists quick to manage.',
        url: '../To-do-list/list.html',
        codeUrl: 'https://github.com/lucasovbetts-tech/portfolio/tree/main/To-do-list',
    },
    {
        name: 'Guessing game',
        tag: 'Game',
        description: 'A number guessing game with three difficulty levels. Pick one and try to find the randomly generated number in as few attempts as possible.',
        url: '../Number-guessing-game/guess.html',
        codeUrl: 'https://github.com/lucasovbetts-tech/portfolio/tree/main/Number-guessing-game',
    },
    {
        name: 'Tax calculator',
        tag: 'Web App',
        description: 'Calculates UK income tax and National Insurance from an annual salary, with a band-by-band breakdown and annual, monthly, and weekly take-home figures.',
        url: '../income-tax-calc/tax.html',
        codeUrl: 'https://github.com/lucasovbetts-tech/portfolio/tree/main/income-tax-calc',
        featured: true,
    },
    {
        name: 'Dice roller',
        tag: 'Game',
        description: 'Roll any number of dice at once and get the total, with every die drawn on screen so you can see each result.',
        url: '../dice-roller/dice.html',
        codeUrl: 'https://github.com/lucasovbetts-tech/portfolio/tree/main/dice-roller',
    },
    {
        name: 'Macro tracker',
        tag: 'Web App',
        description: 'A macro tracking app for logging daily meals, with entries saved to local storage so you can switch between days and pick up right where you left off.',
        url: 'https://lucasovbetts-tech.github.io/Macro-tracker/Tracker-app/',
        codeUrl: 'https://github.com/lucasovbetts-tech/Macro-tracker/tree/main',
        external: true,
        featured: true,
    },
    {
        name: 'SkinLab',
        tag: 'Website',
        description: 'A Counter-Strike 2 skin site with a searchable skin explorer, case opening simulator, and trade-up tools, with support for multiple languages and currencies.',
        url: 'https://lucasovbetts-tech.github.io/CS2-searching-website/',
        codeUrl: 'https://github.com/lucasovbetts-tech/CS2-searching-website',
        external: true,
        featured: true,
    },
];
