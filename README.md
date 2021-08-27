# What is this?
A Request for Comment for an idea, also a forcing function for me to think through writing and testing in public. Very much a work in progress, feel free to dispute the methodology.

# The Dream
What if building a personal finance projection was as simple as selecting from a library of components (e.g. CPF), but offered spreadsheet-level power for tweaking and modifying them?

The idea is to provide something in-between the rigidity of proprietary solutions and the flexibility but tedium of a spreadsheet. The platform provides a framework that abstracts things like aggregation, so components can be more focused and (hopefully) less tedious to build or tweak.

## Other Solutions
- [CPF's Retirement Calculator](https://www.cpf.gov.sg/eSvc/Web/Schemes/RetirementCalculator/CoverPage), [DBS Nav Planner](https://www.dbs.com.sg/personal/deposits/digital-services/nav-planner), StashAway's Financial Planning Tool
    - ease of use - generally pretty good, fill up a few forms (the CPF one is super tedious though) and it will spit out a plan
    - rigid - covers the general case well, but harder to account for individual/unique situations (e.g. what if a potential goal is to migrate?)
    - isolated - if I read a good blog article and wanted to incorporate some of the ideas, it's not easy (or sometimes impossible) to do so
- [Upplan](https://www.upplan.sg/): this is pretty slick though I found myself uncertain of how certain calculations were made or how data affects each other. Will definitely be drawing inspiration from here!
- Spreadsheet
    - powerful - I can create my own "algorithms" for estimating and calculating
    - tedious - since planning is done over long periods (e.g. 30 - 60 years), it can be pretty tedious to do the calculations
    - https://www.cflee.com/posts/two-years-3-fund-portfolio/

To investigate:
- https://www.goalsmapper.com/gmplanner/

# Principles
1. **Platform**: the tool should be focused on providing a framework - while we can have a batteries-included approach with default components, users should have the power to create, modify and share their own components.
2. **Data Ownership**: users should maintain full control over their data. Ideally we never need to actually store the data in the cloud (or at most, do E2E encryption).
3. **Open Source**: not a must-have but I feel would be aligned well with points 1 and 2.
4. **Accessible**: at some point I'd love for this to be intuitive enough for code and financial beginners to make use of, but the initial target audience will probably be other devs.

# Architecture
- [Local-first](https://blog.acolyer.org/2019/11/20/local-first-software/) app. Ideally also some E2E encrypted syncing platform so it could be accessed on multiple devices. To that end am intending to use JavaScript since that seems the most platform-agnostic (e.g. node, electron, react-native).
- Far-future: Web platform for finding and listing blocks, which can be copied and modified (like iOS shortcuts).


## The Framework (WIP)
What we aim to abstract:
-  Aggregation (e.g. by years). Visualisation is related, but ideally we could also let users code their own visualisations?
- ? (To-be-discovered)

Systems Design:
- “Entries” - month, amount (income/expense), actual vs estimate, categories (e.g. salary)
- "Components" (a more specific term would be preferred)
    - takes inputs (e.g. forms or other entries - for example, CPF saved can be based on salary in that month)
    - outputs Entries, which are used to build the projection visualisations

# FAQ
Q: Why is this called VisiPlan?

A: Somewhat ironically, an ode to the first popular spreadsheet software, VisiCalc. I think the feeling of power and flexibility is something important to recreate. This is a working title, seeing as other software has already taken the name :D