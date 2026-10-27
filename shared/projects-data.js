// Single source of truth for all projects.
// Add a project here and it appears on the projects page, the header
// dropdown, and (if featured) the main page. Set codeUrl to a repo
// link to activate the View Code button. Leave out url for projects
// with no live demo and the card shows View Code only.
const PROJECTS = [
    {
        name: 'Calculator',
        tag: 'Web App',
        description: 'A working calculator with exponent support and a simple, clean interface. Focused on smooth interactions and real-time results.',
        url: '../projects/Calculator/calculator.html',
        codeUrl: 'https://github.com/lucasovbetts-tech/portfolio/tree/main/projects/Calculator',
    },
    {
        name: 'To do list',
        tag: 'Web App',
        description: 'A task manager for adding, selecting, and clearing tasks, built around a simple layout that keeps everyday lists quick to manage.',
        url: '../projects/To-do-list/list.html',
        codeUrl: 'https://github.com/lucasovbetts-tech/portfolio/tree/main/projects/To-do-list',
    },
    {
        name: 'Guessing game',
        tag: 'Game',
        description: 'A number guessing game with three difficulty levels. Pick one and try to find the randomly generated number in as few attempts as possible.',
        url: '../projects/Number-guessing-game/guess.html',
        codeUrl: 'https://github.com/lucasovbetts-tech/portfolio/tree/main/projects/Number-guessing-game',
    },
    {
        name: 'Tax calculator',
        tag: 'Web App',
        description: 'Calculates UK income tax and National Insurance from an annual salary, with a band-by-band breakdown and annual, monthly, and weekly take-home figures.',
        url: '../projects/income-tax-calc/tax.html',
        codeUrl: 'https://github.com/lucasovbetts-tech/portfolio/tree/main/projects/income-tax-calc',
        featured: true,
    },
    {
        name: 'Investment calculator',
        tag: 'Web App',
        description: 'Projects investment growth from a starting balance, yearly return, and time horizon, with selectable compounding frequency and monthly or yearly contributions.',
        url: '../projects/investment-calc/invest.html',
        codeUrl: 'https://github.com/lucasovbetts-tech/portfolio/tree/main/projects/investment-calc',
    },
    {
        name: 'Dice roller',
        tag: 'Game',
        description: 'Roll any number of dice at once and get the total, with every die drawn on screen so you can see each result.',
        url: '../projects/dice-roller/dice.html',
        codeUrl: 'https://github.com/lucasovbetts-tech/portfolio/tree/main/projects/dice-roller',
    },
    {
        name: 'Macro tracker',
        tag: 'Web App',
        description: 'A macro tracking app for logging daily meals, with entries saved to local storage so you can switch between days and pick up right where you left off.',
        url: 'https://lucasovbetts-tech.github.io/Macro-tracker/Tracker-app/',
        codeUrl: 'https://github.com/lucasovbetts-tech/Macro-tracker/tree/main',
        external: true,
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
    {
        name: 'No Fullscreen',
        tag: 'Python',
        description: 'A Windows utility that stops browsers from going fullscreen. Uses Win32 event hooks to react instantly with no polling, and supports Chrome, Edge, Firefox, Brave, Opera, and Vivaldi.',
        codeUrl: 'https://github.com/lucasovbetts-tech/No-Fullscreen',
        featured: true,
    },
];
