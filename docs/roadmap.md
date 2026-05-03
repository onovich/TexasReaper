# Roadmap

This is the practical next-step list for Texas Reaper from the current project state.

## Near Term

### 1. Visual polish pass

- unify typography rhythm across all screens
- tighten spacing consistency between header, card rows, and action area
- review shadows, borders, and color contrast for a stronger visual system

### 2. Interaction polish pass

- refine card selection feedback and hover/tap states
- review animation timing so reveal, harvest, and transition states feel consistent
- make important status changes more legible during fast play

### 3. Responsive QA matrix

- verify common mobile viewports including shorter devices
- verify desktop frame behavior on 13-inch and 16-inch laptop sizes
- document any known layout exceptions instead of patching ad hoc

## Mid Term

### 4. Gameplay balancing

- tune economy values such as reveal cost, harvest reward, and swap cost
- validate pacing of early, mid, and late rounds
- review whether skill charge gain and payoff feel worth using

### 5. Regression safety

- add tests for hand evaluation and reward calculation
- add a small set of deterministic gameplay scenario tests
- protect the core logic before making larger balancing changes

### 6. Presentation improvements

- add a proper favicon and social preview assets
- capture screenshots or a short GIF for the repository and Pages landing experience
- consider lightweight sound effects if they support feedback without becoming noisy

## Longer Term

### 7. Productization

- add English localization if broader sharing is needed
- add a simple settings panel for motion or audio preferences
- consider save data for best run or local progression metrics

### 8. Engineering cleanup

- remove temporary tooling or one-off migration scripts from the frontend root
- standardize documentation for release and deployment steps
- add linting or formatting if the team wants stronger consistency guarantees

## Suggested Order

If only the highest-value next steps are taken, do them in this order:

1. visual polish pass
2. responsive QA matrix
3. gameplay balancing
4. regression safety