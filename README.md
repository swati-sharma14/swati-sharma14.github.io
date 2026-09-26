# Swati Sharma — Interactive Research & Engineering Portfolio

Personal academic & engineering portfolio for **Swati Sharma** (Software Engineer II at Google Play · Researcher 20% Time at Google DeepMind · B.Tech CS & AI, IIIT-Delhi '25).

Built with zero external build dependencies (pure HTML5, CSS3, and Vanilla ES6+ JavaScript) so it deploys directly to **GitHub Pages** without any bundler step.

---

## Directory Structure

```text
portfolio/
├── index.html                      # Semantic structure, interactive labs, publications, projects & modals
├── style.css                       # Editorial design system (Light Ivory & Dark Obsidian themes)
├── script.js                       # Interactive simulations, REPL terminal, Command Palette (⌘K), filters
├── assets/
│   ├── profile.jpg                 # Portrait photo
│   └── Swati_Sharma_Resume.pdf     # 1-page compiled LaTeX CV / Resume
└── README.md                       # Deployment & customization guide
```

---

## Interactive Features Included

1. **Global Era Switcher (`Before Google` vs. `During Google` vs. `All Eras`)**:
   - Dynamically filters the entire website—experience timeline, interactive research labs, publications, and project cards—between your IIIT-Delhi & NatWest years (`2021–2025`) and your Google & Google DeepMind work (`2025–Present`).
2. **Hero Interactive Terminal (`swati@portfolio:~`)**:
   - Supports commands: `help`, `era [all|google|before]`, `research`, `cress`, `speech`, `adhd`, `latex`, `play`, `pubs`, `awards`, `cp`, `resume`, `theme`, `clear`.
3. **Interactive Research & Systems Lab (5 Live Simulations)**:
   - **CRESS Super-Resolution Auditor (Google DeepMind · ICLR 2026 TCCML)**: Real-time HTML5 Canvas rendering of LR input, SR reconstruction, and pixel-level spatial artifact heatmaps across 4 corruptions (Hallucinated Texture, Over-Sharpening, Color Shift, Clean Reconstruction) with an intensity slider showing how CRESS-C & CRESS-R respond while PSNR fails.
   - **Task-Lens Speech Utility Matrix (LREC 2026)**: Interactive 26-language, 50-dataset, 9-task transferability explorer comparing Whisper-large-v3, XLS-R, MMS-1B, and HuBERT across ASR, Intent, Emotion, Speaker ID, LID, Dialect, SER, QA, and Paralinguistics.
   - **ADHD Pupillometry & SHAP Clinical Explorer (Computers in Biology and Medicine 2025)**: Live physiological pupillometry trace canvas across 5 cognitive-load phases (`Baseline` → `Stimulus` → `Peak Load` → `Recovery`) paired with real-time SHAP feature attribution bars across patient cohorts.
   - **`LaTeXOCREvaluator` Live Formula Sandbox (IIIT-Delhi CV)**: Live tokenizer and structural delimiter auditor computing the 4-component composite score (`0.40 Sequence + 0.20 Structure + 0.25 Symbol + 0.15 Length`) in real time as you type or test presets.
   - **Google Play Promotions & Gross-Spend Engine Simulator (Google Play)**: Interactive architecture toggle (`Legacy Hardcoded Pipeline` vs. `Config-Driven Unified Engine`) and live checkout spend progression simulator (`$0`–`$100`).
4. **Publications & BibTeX Drawer**:
   - Filterable by venue type (`All`, `Workshop`, `Conference`, `Journal`, `Poster`) with expandable BibTeX citations and one-click copy.
5. **Deep-Dive Case Study Modals & Interactive Skill Graph**:
   - Clicking any of the 8 project cards opens a structured architectural case study modal.
   - Clicking any technical skill pill in the Technical Stack section highlights every role, paper, and system where you used that technology.
6. **Command Palette (`⌘K` / `Ctrl+K`) & In-Page Resume Viewer**:
   - Instant keyboard navigation, theme toggling (`Light` / `Dark`), era switching, and an embedded PDF + structured resume modal.

---

## Deploying to GitHub Pages

### Option A: User Site (`https://swati-sharma14.github.io`)

1. Create a public repository named **`swati-sharma14.github.io`** on your GitHub account (`swati-sharma14`).
2. Push this directory directly to the `main` branch:

```bash
cd ~/portfolio
git init
git checkout -b main
git add index.html style.css script.js assets/ README.md
git commit -m "Initial commit: interactive research & engineering portfolio"
git remote add origin git@github.com:swati-sharma14/swati-sharma14.github.io.git
git push -u origin main
```

3. In your GitHub repository, navigate to **Settings → Pages**, ensure **Source** is set to **Deploy from a branch** (`main` / `/ (root)`), and your site will be live at **`https://swati-sharma14.github.io`**.

### Option B: Project Site (`https://swati-sharma14.github.io/portfolio`)

If you push to a repository named `portfolio` instead, follow the exact same commands above with `git@github.com:swati-sharma14/portfolio.git`. Relative asset paths (`assets/profile.jpg`, `assets/Swati_Sharma_Resume.pdf`, `style.css`, `script.js`) are already configured to work under both root domains and subpath repositories.
