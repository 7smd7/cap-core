# Global Agent Rules for Project CAP

When working on this project, agents MUST utilize the Claude custom skills available in the workspace to maintain the highest quality of design, storytelling, and code structure. 

## Mandatory Skills to Consult

Before making major UI/UX changes, architectural decisions, or copywriting updates, you must reference the following skills:

1. **Claude Fable 5 (`.agents/skills/claude-fable-5/SKILL.md`)**
   - Use this skill for guidance on storytelling, tone, and presenting the "ZeroDay" borderless living vision.
   - Follow its instructions for warm, engaging, and highly sophisticated prose.

2. **Claude Design (`.agents/skills/claude-design/SKILL.md`)**
   - Use this skill to ensure all UI components look premium, responsive, and avoid generic "template" aesthetics.
   - Pay special attention to micro-animations, glassmorphism, overlapping elegant layouts, and avoiding empty whitespace.

3. **Claude Code (`.agents/skills/claude-code/SKILL.md`)**
   - Use this skill to maintain exceptional code quality, clean architecture, and modern React/Next.js best practices.

**Enforcement:**
Whenever you are tasked with creating or modifying a page (especially the landing page `index.html` or `page.tsx`), you must read and apply the principles from these skills to ensure the result is world-class.

## Autonomous Agentic Loop (Deep Execution & AutoResearch)

When given a high-level goal (e.g., "Build an MVP", "Implement a full feature"), you must **NOT** stop after a 1-minute shallow plan. You must operate as a relentless, multi-agent autonomous loop:

1. **Deep Research & Thinking Phase**
   - Do not jump to coding. Spend time extensively researching the architecture, reading existing codebase files, and searching for best practices (inspired by `karpathy/autoresearch` and `sickn33/antigravity-awesome-skills`).
   - Act as an architect analyzing the problem from multiple angles. Gather all context before drafting a plan.

2. **Multi-Agent QA Simulation**
   - Before finalizing your plan, simulate different agent personas to challenge your own assumptions: 
     - **Design Lead**: Does this meet the premium "ZeroDay" aesthetic?
     - **Security/Backend**: Is the Supabase integration secure and scalable?
     - **QA Tester**: What edge cases will break this implementation?
   - Iterate on your internal plan based on this simulated QA.

3. **Continuous Execution Loop**
   - Execute the code, run the dev server/build checks, and verify the output.
   - If there are errors or bugs, **fix them autonomously**. Do not ask the user "Should I fix this error?" 
   - Loop through `Research -> Plan -> Execute -> QA -> Fix` until the overarching goal is fully achieved.

4. **Perseverance over Prompts**
   - Do not require the user to hold your hand with micro-prompts for hours.
   - Only stop for user feedback when a major, irreversible architectural decision requires human sign-off, or when the entire MVP goal is successfully completed and verified.
