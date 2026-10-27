# Lucas Betts — Portfolio

My personal portfolio site, built with plain HTML, CSS and JavaScript (no frameworks or build step).

**Live site:** https://lucasovbetts-tech.github.io/portfolio/

I'm a sixth-form student aiming for a Software Engineering Degree Apprenticeship, currently focused on learning Python, C++ and machine learning.

## Features

- Light and dark theme toggle, remembered between visits
- Responsive layout for desktop, tablet and mobile
- Every project card is generated from one data file, so adding a project is a single edit

## Projects

Larger projects live in their own repos and are linked from the site. Smaller ones are hosted here in [`projects/`](projects/):

| Project | Description |
|---|---|
| [Tax calculator](projects/income-tax-calc/) | UK income tax and National Insurance with a band-by-band breakdown |
| [Investment calculator](projects/investment-calc/) | Investment growth with compounding and regular contributions |
| [Calculator](projects/Calculator/) | Calculator with exponent support |
| [To-do list](projects/To-do-list/) | Simple task manager |
| [Guessing game](projects/Number-guessing-game/) | Number guessing game with three difficulty levels |
| [Dice roller](projects/dice-roller/) | Roll any number of dice and see each result |

Projects in their own repos:

- [SkinLab](https://github.com/lucasovbetts-tech/CS2-searching-website): Counter-Strike 2 skin explorer with a backend, SQL database and APIs
- [Macro tracker](https://github.com/lucasovbetts-tech/Macro-tracker): Daily meal and macro logging app
- [No Fullscreen](https://github.com/lucasovbetts-tech/No-Fullscreen): Python Windows utility that stops browsers going fullscreen

## Structure

```
├── main-page/       Home page
├── projects-page/   Page listing every project
├── projects/        Smaller projects hosted in this repo
├── shared/          Header, footer, theme toggle and project data used across pages
└── images/
```
