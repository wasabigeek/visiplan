# Key Requirements:
- Local-first, ideally multi-platform in the future
- Users can select from a pre-made library of Simulators
  - each Simulator represents a "module" e.g. CPF, stock investments over the years
  - Simulators:
    - can be configured
    - generate cash outflows?
    - take cash flows into account (e.g. CPF depends on income, interest depends on investment value), which may or may not be a result of other simulators
- Users can configure the Simulators
- Users can run multiple Simulations, which run all Simulators and calculates a user's assets over time
  - Simulations tell users if they have enough money for retirement
- Users can create their own "simulators"
- Users can share and download simulators created by others

# Discussions & Decisions
## 1. Intra-Simulator Interactions
### 1.1 \[REJECTED\] Isolated
Simulators are not affected by each other. The only inputs to Simulators are the user's configuration.

Cons:
- likely will have to duplicate logic over each Simulator when the inputs are similar (e.g. income data)
- limits composing and the power of the tool (how cells scale)

### 1.2 \[REJECTED\] "Circuit"
Simulators are "wired up" like a circuit, so Simulator outputs can form inputs to other Simulators. E.g. an Income simulator might be an input into the CPF simulator.

Cons:
- Couples simulators to each other. Adding new simulators requires checking which other simulators are affected, and wiring accordingly e.g. investments as a % of income. Might result in a pretty complex graph.

### 1.3 "Event Stream"
Simulators generate periodic events e.g. a monthly salary, a yearly CPF interest payout. Each Simulator has access to this shared pool of events, and can filter according to what they need.

Pros:
- Simulators don't have to know about each other, yet will be able to play off each other (e.g. downstream simulators don't have to know that there are multiple sources of income, they just care about the events).

Cons:
- Individual simulators have to sum up events as necessary, though convenience functions can be provided to allow Simulators and the resulting Simulations to quickly sum up data for a certain time period (kinda like Event Sourcing).
- Added complexity of figuring out how Simulators can filter out the events that are relevant to them. Should we have a pre-defined set of event types for example? Or should users be allowed to add their own event types?

## 2. Event Stream Data Structure
What are the pieces? What should each event hold? How do we think about time periods?

TODO

## 3. Should Income be part of the platform or more free form?
Possible Approaches:
- No: if needed, Users would define per-simulator
  - Cons:
    - multiple sources of income might be trickier to simulate
    - each dev needs to account for multiple configurations of income e.g. which year does it drop off
    - need to be changed en-masse if it is in the configs of many things
- Yes
  - Cons:
    - might limit user's ability to customise, though we could potentially allow users to plugin if we adopt the "Event Stream" approach above
