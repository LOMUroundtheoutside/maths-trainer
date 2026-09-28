# Maths Trainer

Practice site for school maths, Year 1 to Year 13 (UK curriculum: KS1, KS2, KS3,
GCSE, A-level). 131 topics, every question generated on the fly so they never
run out.

- **Practice**: pick a topic, instant feedback with a one-line explanation
- **Test**: 10 / 20 / 30 mixed questions across the year, then a breakdown
- **My weaknesses**: per-topic accuracy (all time and last 10), rated Weak /
  Getting there / Strong, with a "Practise" button straight into the weak spot

Progress is stored in the browser (localStorage) on that device only.

## Files

- `index.html` — the page
- `engine.js` — question generators and the answer checker (also loads in Node
  for testing: `node -e 'require("./engine.js")'`)

No build step, no dependencies.
