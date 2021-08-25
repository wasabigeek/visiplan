# What is this?
A Request for Comment for an idea, also a forcing function for me to think through writing and to test it in public. Very much a work in progress, feel free to dispute.

# The Dream
What if building a personal finance projection was as simple as selecting from a library of components, but offered spreadsheet-level power for tweaking and modifying them?

The idea is to provide something in-between the rigidity of proprietary solutions and the flexibility but tedium of a spreadsheet. The components provide a way for people to build their own formula and share them, while providing a framework that makes it easier to generate the final projection.

## Other Solutions
- [CPF's Retirement Calculator](https://www.cpf.gov.sg/eSvc/Web/Schemes/RetirementCalculator/CoverPage), [DBS Nav Planner](https://www.dbs.com.sg/personal/deposits/digital-services/nav-planner), StashAway's Financial Planning Tool
    - ease of use - generally pretty good, fill up a few forms (the CPF one is super tedious though) and it will spit out a plan
    - rigid - covers the general case well, but harder to account for individual/unique situations (e.g. what if a potential goal is to migrate?)
    - isolated - if I read a good blog article and wanted to incorporate some of the ideas, it's not easy (or sometimes impossible) to do so
- Spreadsheet
    - powerful - I can create my own "algorithms" for estimating and calculating
    - tedious - since planning is done over long periods (e.g. 30 - 60 years), it can be pretty tedious to do the calculations
    - https://www.cflee.com/posts/two-years-3-fund-portfolio/

To investigate:
- https://www.goalsmapper.com/gmplanner/
- https://www.upplan.sg/

# Principles
1. Platform - users and devs should have the tools to build components and extend the platform in ways we couldn’t imagine (e.g. create new blocks, connect blocks, insert and extract data via APIs)
2. Easy to get started, but with just enough power
3. Users have control over their data
4. Open Source - not a must-have but I feel would be aligned well with points 1 and 3

# Architecture
- Local-first app.
- Web platform for finding and listing blocks, which can be copied and modified (like iOS shortcuts).

## Data Model
- “Entries” - month, amount (income/expense), actual vs estimate, categories (e.g. salary)
- "Components" (a more specific term would be preferred)
    - takes inputs (e.g. forms or other entries - for example, CPF saved can be based on salary in that month)
    - outputs Entries, which are used to build the projection visualisations

# FAQ
Q: Why is this called VisiPlan?
A: Somewhat ironically, an ode to the first popular spreadsheet software, VisiCalc. I think the feeling of power and flexibility is something important to recreate. This is a working title, seeing as other software has already taken the name :D