# What is this?
An attempt to create an open platform for simulating personal finance scenarios.

Most existing solutions, while easy to use and great for getting a quick estimate, are proprietary and generally support a few fixed scenarios with little room for customisation. Spreadsheets, on the other hand, almost always have to be built from scratch, and though powerful, are tedious to compose.

The long-term goal would be a tool where users can select from a library of "simulator" modules (e.g. purchasing a flat, putting funds into government retirement schemes), or create their own with a low-code solution. Each simulator will be able to ask users for input via forms or a wizard, then the tool would run the calculations and generate visualisations.

Anyone or any company can contribute new simulators; and while they can build a set of input forms / wizards to allow users to tweak the simulation, a user could also locally modify the simulator to meet their specific needs.

In the short-term, this will be targeted at other devs, since it's a lot more work to build a no-code solution. Currently this is more Proof of Concept, an attempt to discover the boundaries of a future framework.

# Principles
1. **Platform**: the tool should be focused on providing a framework - while we can have a batteries-included approach with default components, users should have the power to create, modify and share their own components.
2. **Data Ownership**: users should maintain full control over their data. Ideally we never need to actually store the data in the cloud (or at most, do E2E encryption).
3. **Open Source**: not a must-have but I feel would be aligned well with points 1 and 2.
4. **Intuitive (Eventually)**: at some point I'd love for this to be intuitive enough for _anyone_ to use, but the initial target audience will probably be other devs.

# Other Solutions
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

# FAQ
Q: Why is this called VisiPlan?

A: Somewhat ironically, an ode to the first popular spreadsheet software, VisiCalc. I think the feeling of power and flexibility is something important to recreate. This is a working title, seeing as other software has already taken the name :D