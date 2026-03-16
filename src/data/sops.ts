export interface SOPStep {
  title: string;
  description: string;
  substeps?: string[];
  notes?: string[];
  warning?: string;
  codeExample?: string;
  richContent?: string;
}

export interface SOP {
  id: string;
  title: string;
  category: string;
  description: string;
  lastUpdated: string;
  version: string;
  tags: string[];
  steps: SOPStep[];
}

export const categories = [
  "Getting Started",
  "Development Process",
  "CMS Platforms",
  "Quality Assurance",
  "Resources",
];

export const defaultSOPs: SOP[] = [
  // ─────────────────────────────────────────────────────────────
  // CATEGORY: Getting Started
  // ─────────────────────────────────────────────────────────────
  {
    id: "introduction",
    title: "Introduction",
    category: "Getting Started",
    description:
      "Welcome to the A3 Brands Developer Documentation. This portal contains the standard operating procedures (SOPs) for building Model Landing Pages (MLPs) and City Pages for automotive dealerships. Every developer on the team should read this section first.",
    lastUpdated: "2026-03-16",
    version: "3.0",
    tags: ["introduction", "overview", "onboarding", "A3 Brands"],
    steps: [
      {
        title: "What We Build",
        description:
          "A3 Brands is an automotive SEO agency. Our development team builds Model Landing Pages (MLPs) and City Pages for car dealerships. These pages are deployed on dealer websites via four different CMS platforms.",
        substeps: [
          "Model Landing Pages (MLPs): Custom pages for specific vehicle models (e.g., '2025 Subaru Outback') designed to rank in search and convert visitors into leads.",
          "City Pages: Location-specific pages targeting geographic keywords (e.g., 'Toyota Dealer in Miami') for local SEO.",
          "Each page is hand-built using HTML, CSS, and JavaScript following designs provided by our Design Team.",
          "Pages are deployed through the dealership's CMS platform — not on our own servers.",
          "All content is written by our Content Team and approved by our SEO Team before development begins.",
        ],
      },
      {
        title: "How This Documentation Is Organized",
        description:
          "This portal is divided into five sections. Read them in order if you're onboarding, or jump to the section you need.",
        substeps: [
          "Getting Started — You are here. Overview of the team, tools, and workflow.",
          "Development Process — Step-by-step instructions for building pages, from handoff through code review.",
          "CMS Platforms — Platform-specific deployment guides for each of the four CMS systems we use.",
          "Quality Assurance — Pre-QA checklists and the QA handoff process.",
          "Resources — Quick-reference links for CMS logins, common issues, and troubleshooting.",
        ],
      },
      {
        title: "Team Structure",
        description:
          "Understanding how the teams interact helps you know who to contact and what dependencies exist.",
        substeps: [
          "Content Team — Writes the page copy, CTAs, meta titles, and meta descriptions.",
          "SEO Team — Reviews and approves content for search optimization.",
          "Design Team — Creates Figma mockups for desktop and mobile layouts.",
          "Development Team (You) — Builds the pages from approved content + Figma designs, deploys to CMS.",
          "QA Team — Reviews deployed pages for accuracy, responsiveness, and SEO compliance.",
          "Project Manager — Manages deadlines, assignments, and coordinates between all teams via Monday.com.",
        ],
      },
    ],
  },
  {
    id: "workflow-overview",
    title: "Workflow Overview",
    category: "Getting Started",
    description:
      "A high-level overview of the end-to-end MLP development lifecycle. This is the 30,000-foot view of how a page goes from assignment to live deployment.",
    lastUpdated: "2026-03-16",
    version: "3.0",
    tags: ["workflow", "lifecycle", "process", "overview"],
    steps: [
      {
        title: "The MLP Development Lifecycle",
        description:
          "Every page follows this lifecycle. The entire process from handoff to QA approval typically takes 2-4 hours per page, depending on complexity.",
        substeps: [
          "1. ASSIGNMENT — You receive a task in Monday.com with a deadline, CMS platform, and dealership details.",
          "2. HANDOFF REVIEW — Verify all prerequisites: approved content, Figma design, CTA requirements.",
          "3. DESIGN PROCESSING — Run the Figma design through Claude + MCP to generate initial code.",
          "4. TEMPLATE & COMPONENTS — Build or reuse the dealership template. Extract reusable components.",
          "5. CODE DEVELOPMENT — Build the page(s) with approved content, brand styles, and responsive layouts.",
          "6. CODE REVIEW — Manual review against Figma. Verify CSS scoping and responsive breakpoints.",
          "7. CMS DEPLOYMENT — Upload assets, paste code, configure SEO fields (platform-specific rules apply).",
          "8. PRE-QA CHECK — Run through the full Pre-QA Checklist before handoff.",
          "9. QA HANDOFF — Update Monday.com status to 'Ready for QA' and tag the QA tester.",
          "10. REVISIONS (if needed) — Address QA feedback and resubmit.",
        ],
      },
      {
        title: "Time Estimates",
        description:
          "Use these estimates for planning your day and communicating deadlines.",
        substeps: [
          "First page for a new dealership: 3-4 hours (includes template creation).",
          "Additional pages for the same dealership: 1-2 hours each (template reuse).",
          "Batch of 5+ model pages (same dealership): ~8 hours total.",
          "Simple city page: 1-1.5 hours.",
          "QA revision cycle: 15-30 minutes per round.",
        ],
        notes: [
          "These estimates assume all prerequisites (content, design) are already approved.",
          "Cox Auto deployments may take longer due to platform restrictions and support ticket wait times.",
        ],
      },
      {
        title: "Critical Rules",
        description:
          "These rules apply to every single page you build. Violating any of them leads to QA failures or rework.",
        substeps: [
          "NEVER start development on unapproved content or missing designs — follow the Blocker Protocol.",
          "ALL CSS must be scoped under a wrapper class (e.g., .a3-brands-main) to prevent style leakage.",
          "NEVER use local file paths for images — all images must be hosted on the CMS Media Library.",
          "ALWAYS include descriptive alt text on every image — empty alt is an automatic QA failure.",
          "NEVER write your own meta titles/descriptions — always use the Content Team's approved text.",
          "ALWAYS test at desktop (1440px), tablet (768px), and mobile (375px) before QA handoff.",
        ],
        warning:
          "Skipping the handoff review is the #1 cause of wasted development time. Always verify prerequisites first.",
      },
    ],
  },
  {
    id: "tools-and-access",
    title: "Tools & Access",
    category: "Getting Started",
    description:
      "All the tools, accounts, and access credentials you need for MLP development. Set up everything here before starting your first project.",
    lastUpdated: "2026-03-16",
    version: "3.0",
    tags: ["tools", "access", "setup", "accounts", "onboarding"],
    steps: [
      {
        title: "Required Tools",
        description:
          "These are the tools every developer needs installed and configured before beginning any work.",
        substeps: [
          "Monday.com — Project management and task tracking. You'll receive an invite to the A3 Brands workspace.",
          "Figma — Design review and asset export. Free viewer account is sufficient. Get invited to the A3 Brands team.",
          "Claude + Figma MCP Server — AI-assisted code generation from Figma designs. Set up the MCP server locally.",
          "VS Code (or preferred editor) — For code editing and local preview.",
          "Chrome DevTools — For responsive testing and debugging. Essential for mobile viewport testing.",
          "A modern browser — Chrome recommended for consistent DevTools experience.",
        ],
      },
      {
        title: "CMS Platform Access",
        description:
          "You'll need login credentials for each CMS platform. Credentials are managed through the team credentials vault.",
        substeps: [
          "Dealer Inspire (WordPress): Login at https://[domain]/wp-admin — credentials per dealership.",
          "DealerOn: Login at https://account.dealeron.com/Login/ — single account with dealership selector.",
          "Apollo: Login at https://getapollo.com/ — credentials per dealership.",
          "Cox Auto (Dealer.com): Login at https://dealer.signin.coxautoinc.com/ — SSO authentication.",
          "If you don't have credentials for a specific dealership, request them from your project manager.",
        ],
        notes: [
          "Bookmark all four CMS login URLs — you'll use them daily.",
          "Some dealerships may require VPN access — check with your project manager.",
        ],
      },
      {
        title: "Communication Channels",
        description:
          "Where to communicate depending on the type of message.",
        substeps: [
          "Monday.com Comments — Primary channel for all task-related communication. Creates a searchable record.",
          "Slack — Quick questions, urgent issues, and team announcements. Don't use for task-specific discussions.",
          "Email — External communication only (client-facing). Internal communication should stay on Monday.com/Slack.",
        ],
        warning:
          "Never discuss task details over Slack or email — always use Monday.com comments so there's a permanent record attached to the task.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CATEGORY: Development Process
  // ─────────────────────────────────────────────────────────────
  {
    id: "project-initiation-handoff",
    title: "Project Initiation & Handoff",
    category: "Development Process",
    description:
      "All project management, communication, and asset delivery occur within Monday.com. Before any development begins, the assigned developer must verify that the handoff is complete and all prerequisites are met.",
    lastUpdated: "2026-03-16",
    version: "3.0",
    tags: ["handoff", "Monday.com", "initiation", "blocker", "assets"],
    steps: [
      {
        title: "Verify Monday.com Board Assignment",
        description:
          "Open Monday.com and locate your assigned task. This is the source of truth for every project.",
        substeps: [
          "Navigate to the Monday.com board and find the task assigned to you.",
          "Check the deadline column — note the due date and calculate available working days.",
          "Read the brief thoroughly — identify the dealership name, brand (e.g., Subaru, Toyota), page type (MLP or City Page), and any specific CTA requirements.",
          "Identify the CMS platform listed (Dealer Inspire, DealerOn, Apollo, or Cox Auto) — this determines your deployment workflow.",
          "Check for any special instructions or notes left by the project manager.",
        ],
        notes: [
          "If the deadline is less than 2 business days away, flag it immediately with your project manager.",
          "Some tasks may have multiple pages (e.g., 5 MLPs for the same dealership) — check for grouped subtasks.",
        ],
      },
      {
        title: "Asset Verification — Content & Copy",
        description:
          "Confirm the Content Team has provided approved copy and the SEO Team has signed off on it.",
        substeps: [
          "Locate the content attachment in the Monday.com task — usually a Google Doc or PDF link.",
          "Verify the content status shows 'Approved' — check the Content and SEO team columns.",
          "Read through the copy to understand page structure: headings, body paragraphs, CTAs, and inventory links.",
          "Check that meta titles and meta descriptions are included in the content document.",
          "If any content is missing or marked as 'Draft', do NOT proceed — follow the Blocker Protocol.",
        ],
        warning:
          "Never develop against draft or unapproved content. This leads to rework when the SEO team requests changes after development is complete.",
      },
      {
        title: "Asset Verification — Figma Design",
        description:
          "Confirm the Design Team has attached the completed Figma design file with both desktop and mobile viewports.",
        substeps: [
          "Locate the Figma link in the Monday.com task attachments.",
          "Open the Figma file and verify it contains both Desktop and Mobile viewport designs.",
          "Check that all visual assets (hero images, icons, background patterns) are present.",
          "Note the color palette, font sizes, and spacing values for development reference.",
          "If the Figma design is missing or incomplete, do NOT proceed — follow the Blocker Protocol.",
        ],
      },
      {
        title: "Blocker Protocol",
        description:
          "If any prerequisite is missing, you must block the task and escalate immediately. Do not begin development on incomplete handoffs.",
        substeps: [
          "Check that the previous Content task status is 'Approved' (not 'In Progress' or 'In Review').",
          "Check that the previous Design task status is 'Approved' with a Figma link attached.",
          "If either is NOT approved: change your Development task status to 'Blocked' in Monday.com.",
          "Leave a comment tagging the responsible team member explaining what's missing.",
          "Notify your project manager via Monday.com or Slack that the task is blocked.",
          "Move on to the next available task while waiting for the blocker to be resolved.",
        ],
        warning:
          "Do NOT start development hoping the missing assets will 'come later.' This is the #1 cause of missed deadlines and wasted development hours.",
      },
    ],
  },
  {
    id: "design-processing",
    title: "Design Processing",
    category: "Development Process",
    description:
      "How to process Figma designs into development-ready references. This step covers analyzing the design, extracting specifications, and preparing assets before writing any code.",
    lastUpdated: "2026-03-16",
    version: "3.0",
    tags: ["Figma", "design", "assets", "specifications", "preparation"],
    steps: [
      {
        title: "Analyze the Figma Design",
        description:
          "Before writing any code, spend time understanding the design's structure, patterns, and specifications.",
        substeps: [
          "Open the Figma file and switch to the desktop viewport first.",
          "Identify the major sections: hero, content blocks, CTA sections, feature grids, footer elements.",
          "Note the visual hierarchy: which elements are most prominent, what draws the eye.",
          "Check the mobile viewport — identify what stacks, what hides, and what reorders.",
          "Look for interactive elements: accordions, tabs, hover states, carousels.",
        ],
      },
      {
        title: "Extract Design Specifications",
        description:
          "Use Figma's inspect panel to extract exact values for colors, fonts, spacing, and sizing.",
        substeps: [
          "Click on text elements to capture: font family, font size, font weight, line height, letter spacing, and color.",
          "Click on containers to capture: width, height, padding, margin, border radius, and background colors.",
          "Identify the color palette: primary brand color, secondary color, text colors, background shades.",
          "Note spacing patterns: consistent gaps between sections, card padding, button padding.",
          "Check for shadows, gradients, borders, and other decorative properties.",
        ],
        codeExample: `/* Example: Extracted specifications from Figma */
:root {
  /* Brand Colors */
  --dealer-primary: #1a3c6e;
  --dealer-secondary: #e8b130;
  --dealer-text: #333333;
  --dealer-bg: #f5f5f5;

  /* Typography */
  --font-heading: 'Montserrat', sans-serif;
  --font-body: 'Open Sans', sans-serif;

  /* Spacing (from Figma measurements) */
  --section-gap: 60px;
  --card-padding: 24px;
  --btn-padding: 12px 32px;
}`,
      },
      {
        title: "Export & Prepare Assets",
        description:
          "Export images and icons from Figma for use in development.",
        substeps: [
          "Select each image asset in Figma → right-click → 'Export' → choose format (JPG for photos, PNG for transparency, SVG for icons).",
          "Export hero images at 2x resolution for retina displays, then compress.",
          "Compress JPEGs to 80% quality — aim for under 300KB for hero images, under 100KB for other images.",
          "Use descriptive filenames: '2025-subaru-outback-hero.jpg', not 'image1.jpg'.",
          "Create a local folder with all assets organized before uploading to the CMS.",
        ],
        notes: [
          "WebP format provides better compression but check CMS compatibility first.",
          "SVG is preferred for icons and logos — they scale without quality loss.",
        ],
      },
    ],
  },
  {
    id: "ai-assisted-development",
    title: "AI-Assisted Development",
    category: "Development Process",
    description:
      "All pages are built using a component-based approach via Claude and the Figma MCP server. This SOP covers processing designs with AI, establishing templates, and performing code review before CMS deployment.",
    lastUpdated: "2026-03-16",
    version: "3.0",
    tags: ["Claude", "Figma", "MCP", "AI", "code generation"],
    steps: [
      {
        title: "Process the Design with Claude & Figma MCP",
        description:
          "Run the provided Figma designs through the MCP server using Claude to generate the initial HTML/CSS/JS code.",
        substeps: [
          "Copy the Figma file URL from the Monday.com task.",
          "Open Claude with the Figma MCP server connected.",
          "Paste the Figma URL and instruct Claude to generate the page code based on the design.",
          "Specify the target CMS platform so Claude can structure the output accordingly (single file for DealerOn/Cox, modular for DI/Apollo).",
          "Review the generated output — Claude will produce HTML structure, CSS styles, and any necessary JavaScript.",
        ],
        notes: [
          "The Figma MCP server reads the design layers directly — the more organized the Figma file, the better the output.",
          "Always specify responsive requirements: 'Generate desktop and mobile-responsive code.'",
        ],
      },
      {
        title: "Build or Reuse the Dealership Template",
        description:
          "Before building individual model pages, create the master template for the specific dealership. All pages for a dealership share the same design language.",
        substeps: [
          "Identify the overarching design language for the brand (e.g., Subaru's blue/white palette, Toyota's red accents).",
          "Create the base HTML structure with the dealership's layout pattern.",
          "Define CSS custom properties (variables) for brand colors, font families, and spacing.",
          "Build the template with placeholder sections that will be swapped per model page.",
          "Test the base template at desktop (1440px), tablet (768px), and mobile (375px) breakpoints.",
        ],
        codeExample: `/* Dealership Template Variables */
.a3-brands-main {
  --dealer-primary: #1a3c6e;
  --dealer-secondary: #e8b130;
  --dealer-font: 'Montserrat', sans-serif;
  font-family: var(--dealer-font);
  max-width: 1440px;
  margin: 0 auto;
}`,
        notes: [
          "If working on a Subaru dealership with 8 model pages, build ONE template first, then duplicate for each model.",
          "This saves 70-80% of development time — most code is shared across model pages.",
        ],
      },
      {
        title: "Code Review & Quality Check",
        description:
          "Manually review the AI-generated code to ensure it matches the Figma design before CMS deployment.",
        substeps: [
          "Open the generated HTML in a local browser and compare side-by-side with the Figma design.",
          "Check all heading sizes, font weights, and text colors match the design specifications.",
          "Verify spacing and padding values match the Figma measurements (use browser DevTools).",
          "Test responsive behavior at 1440px (desktop), 768px (tablet), and 375px (mobile) viewports.",
          "Ensure ALL code is wrapped inside a custom scoping class to prevent CSS leakage.",
          "Fix any discrepancies found — adjust CSS values, restructure HTML if needed.",
        ],
        warning:
          "All code MUST be wrapped inside a custom scoping class (e.g., '.a3-brands-main') to avoid styling leakage across the CMS. Without this wrapper, your styles will bleed into the dealership's existing site.",
        codeExample: `/* CORRECT — Scoped styles */
.a3-brands-main h2 { font-size: 2rem; color: var(--dealer-primary); }
.a3-brands-main .hero-section { background: linear-gradient(...); }

/* WRONG — Unscoped styles will leak */
h2 { font-size: 2rem; }  /* Breaks every h2 on the dealer's site! */`,
      },
    ],
  },
  {
    id: "component-architecture",
    title: "Component Architecture",
    category: "Development Process",
    description:
      "How to structure reusable HTML components for efficient multi-page development. Extract repeating UI elements into modular blocks that can be deployed across all of a dealership's model pages.",
    lastUpdated: "2026-03-16",
    version: "3.0",
    tags: ["components", "reusable", "architecture", "templates", "HTML"],
    steps: [
      {
        title: "Identify Reusable Patterns",
        description:
          "Before coding, identify which UI patterns repeat across the Figma design. These become your reusable components.",
        substeps: [
          "Hero Section — Full-width banner with background image, headline, subheadline, and CTA buttons.",
          "CTA Block — Call-to-action section with heading, description text, and 1-2 action buttons.",
          "Feature Grid — Grid of 3-4 cards highlighting vehicle features with icons.",
          "Specs Table — Responsive table showing vehicle specifications (engine, MPG, dimensions, etc.).",
          "Inventory Link — Dynamic link or widget connecting to the dealership's live vehicle inventory.",
          "Testimonial Block — Customer review section with quote, name, and rating.",
        ],
      },
      {
        title: "Build Component Blocks",
        description:
          "Extract each repeating pattern into a self-contained HTML block with scoped CSS classes.",
        substeps: [
          "Give each component a descriptive class prefix: .a3-hero, .a3-cta-block, .a3-specs-table, .a3-inventory-grid.",
          "Make each component fully self-contained — it should work when pasted into any page.",
          "Parameterize content areas — model name, image URLs, CTA text, inventory links — so they can be swapped per page.",
          "Document each component with a brief HTML comment explaining its purpose.",
          "Test each component in isolation before integrating into the full page.",
        ],
        codeExample: `<!-- Reusable CTA Component -->
<section class="a3-cta-block">
  <h2>Explore the 2025 [MODEL NAME]</h2>
  <p>[DESCRIPTION FROM CONTENT TEAM]</p>
  <div class="a3-cta-buttons">
    <a href="[INVENTORY_URL]" class="a3-btn-primary">View Inventory</a>
    <a href="[SCHEDULE_URL]" class="a3-btn-secondary">Schedule Test Drive</a>
  </div>
</section>

<!-- Reusable Specs Table Component -->
<section class="a3-specs-table">
  <h2>[MODEL] Specifications</h2>
  <table>
    <tr><th>Engine</th><td>[ENGINE_SPEC]</td></tr>
    <tr><th>Horsepower</th><td>[HP_SPEC]</td></tr>
    <tr><th>MPG (City/Highway)</th><td>[MPG_SPEC]</td></tr>
  </table>
</section>`,
      },
      {
        title: "Build Individual Pages from Components",
        description:
          "Using the template and components, assemble each model or city page by swapping in specific content.",
        substeps: [
          "Duplicate the master template for each model page (e.g., Outback, Forester, Crosstrek).",
          "Replace placeholder content with the approved copy from the Content Team's document.",
          "Swap placeholder image URLs with the design assets from the Figma file.",
          "Update all CTA links with the specific inventory URLs and scheduling links.",
          "Adjust any model-specific design variations (different hero images, unique color accents).",
          "Test each individual page at all three breakpoints before proceeding to CMS deployment.",
        ],
        notes: [
          "Keep a checklist for each model page to track completion status.",
          "If a page requires unique layout sections not in the template, build them as new reusable components for future use.",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CATEGORY: CMS Platforms
  // ─────────────────────────────────────────────────────────────
  {
    id: "platform-overview",
    title: "Platform Overview",
    category: "CMS Platforms",
    description:
      "A3 Brands deploys pages across four different CMS platforms. Each has unique requirements for how code is structured and deployed. This overview summarizes the key differences to help you prepare code for the correct platform.",
    lastUpdated: "2026-03-16",
    version: "3.0",
    tags: ["CMS", "platforms", "overview", "comparison", "deployment"],
    steps: [
      {
        title: "Platform Comparison",
        description:
          "Quick reference for the key differences between each CMS platform.",
        substeps: [
          "Dealer Inspire (WordPress) — Most flexible. HTML, CSS, and JS can be pasted directly. Uses the DI Page Composer.",
          "DealerOn — Straightforward page builder. All code must be consolidated into a single file. No external stylesheets.",
          "Apollo — Unique requirement: CSS must be wrapped inside a <script> tag with JavaScript injection. Standard <style> tags are stripped.",
          "Cox Auto (Dealer.com) — Most restrictive. Single file, limited customization. May require support tickets for certain features.",
        ],
      },
      {
        title: "Universal Pre-Requisite: Media Upload",
        description:
          "Before deploying code on ANY platform, all media assets must be uploaded to the CMS Media Library first.",
        substeps: [
          "Export all images from the Figma design — hero images, product photos, icons, backgrounds.",
          "Optimize images for web: compress JPEGs to 80% quality, keep file sizes under 500KB.",
          "Log into the target CMS platform and navigate to the Media Library / Asset Manager.",
          "Upload all images with descriptive file names (e.g., '2025-subaru-outback-hero.jpg').",
          "Copy the generated live image URLs from the CMS Media Library.",
          "Replace ALL placeholder/local image URLs in your code with the CMS-hosted URLs.",
        ],
        warning:
          "Never use local file paths or placeholder URLs in production code. All image src attributes must point to CMS-hosted URLs.",
        codeExample: `<!-- BEFORE: Local placeholder -->
<img src="./images/hero-outback.jpg" alt="2025 Subaru Outback">

<!-- AFTER: CMS-hosted live URL -->
<img src="https://di-uploads.dealerinspire.com/dealership/hero-outback.jpg"
     alt="2025 Subaru Outback">`,
      },
      {
        title: "Universal Final Step: SEO Configuration",
        description:
          "After deploying page code on any platform, input the SEO meta data provided by the Content Team.",
        substeps: [
          "Locate the meta title and meta description in the Content Team's approved document.",
          "Find the SEO fields in the CMS page editor (location varies by platform).",
          "Paste the meta title — ensure it's under 60 characters.",
          "Paste the meta description — ensure it's under 160 characters.",
          "Link any live inventory widgets or feed URLs specified in the Monday.com brief.",
          "Set the page URL slug to match the SEO team's specification (if provided).",
        ],
        warning:
          "Do not write your own meta titles or descriptions. Always use the exact text provided by the Content/SEO team — they're optimized for search rankings.",
      },
    ],
  },
  {
    id: "cms-dealer-inspire",
    title: "Dealer Inspire",
    category: "CMS Platforms",
    description:
      "Dealer Inspire is built on WordPress with a proprietary DI Page Composer. It offers the most flexible code integration — HTML, CSS, and JavaScript can be pasted directly into the page builder.",
    lastUpdated: "2026-03-16",
    version: "3.0",
    tags: ["Dealer Inspire", "WordPress", "DI", "Page Composer"],
    steps: [
      {
        title: "Accessing Dealer Inspire",
        description:
          "Log into the dealership's WordPress admin panel.",
        substeps: [
          "Navigate to: https://[dealership-domain]/wp-admin",
          "Enter your Dealer Inspire login credentials (stored in the team credentials vault).",
          "Navigate to Pages → find the page you need to edit, or create a new page.",
        ],
        notes: [
          "Login URL pattern: https://domain/wp-admin",
          "If you don't have credentials, request them from your project manager.",
        ],
      },
      {
        title: "Using the DI Page Composer",
        description:
          "Dealer Inspire uses a proprietary Page Composer. Code can be pasted directly into HTML blocks.",
        substeps: [
          "Open the page in the DI Page Composer (not the default WordPress editor).",
          "Add a new 'Custom HTML' or 'Code Block' section to the page.",
          "Paste your complete HTML code directly into the code block.",
          "CSS can be included within <style> tags in the same block, or in the custom CSS field.",
          "JavaScript can be included within <script> tags at the bottom of your HTML block.",
          "Preview the page using the Composer's built-in preview before publishing.",
        ],
        codeExample: `<!-- Dealer Inspire: Direct paste structure -->
<style>
  .a3-brands-main * { box-sizing: border-box; }
  .a3-brands-main h2 { font-size: 2rem; color: #1a3c6e; }
  /* All styles scoped under .a3-brands-main */
</style>

<div class="a3-brands-main">
  <section class="hero">
    <h1>2025 Subaru Outback</h1>
    <!-- Page content -->
  </section>
</div>

<script>
  // JavaScript interactions
</script>`,
      },
      {
        title: "Media & SEO",
        description:
          "Upload assets and configure SEO settings.",
        substeps: [
          "Navigate to Media → Add New in WordPress sidebar to upload images.",
          "Click each uploaded image to copy its 'File URL' — use these in your code.",
          "Scroll to the SEO section at the bottom of the page editor (Yoast SEO or RankMath).",
          "Enter the meta title and description from the Content Team's document.",
          "Click 'Publish' (new) or 'Update' (existing), then verify the live page in an incognito window.",
        ],
      },
    ],
  },
  {
    id: "cms-dealeron",
    title: "DealerOn",
    category: "CMS Platforms",
    description:
      "DealerOn provides a straightforward page builder with one critical requirement: all code (HTML, CSS, and JavaScript) must be consolidated into a single file.",
    lastUpdated: "2026-03-16",
    version: "3.0",
    tags: ["DealerOn", "single file", "page builder"],
    steps: [
      {
        title: "Accessing DealerOn",
        description:
          "Log into the DealerOn account management portal.",
        substeps: [
          "Navigate to: https://account.dealeron.com/Login/",
          "Enter your DealerOn login credentials.",
          "Select the dealership from your account dashboard.",
          "Navigate to the page editor / page builder section.",
        ],
      },
      {
        title: "Single-File Code Consolidation",
        description:
          "DealerOn requires ALL code in a single file. Combine HTML, CSS, and JS into one block.",
        substeps: [
          "Place all CSS within <style> tags at the top of the file.",
          "Place HTML structure in the middle.",
          "Place all JavaScript within <script> tags at the bottom.",
          "Remove any external <link> or <script src='...'> references — inline everything.",
          "Verify the file renders correctly when opened directly in a browser.",
        ],
        warning:
          "DealerOn will NOT load external CSS or JS files. If you paste code with <link> or <script src> references, those styles/scripts will be completely ignored.",
        codeExample: `<!-- DealerOn: Single-file structure -->
<style>
  .a3-brands-main { font-family: 'Montserrat', sans-serif; }
  .a3-brands-main .hero { /* styles */ }
  /* ALL CSS here — no external stylesheets */
</style>

<div class="a3-brands-main">
  <section class="hero"><!-- HTML content --></section>
</div>

<script>
  // ALL JavaScript here — no external scripts
  (function() { /* your code */ })();
</script>`,
      },
      {
        title: "Deploying & Testing",
        description:
          "Paste code into DealerOn and verify the deployment.",
        substeps: [
          "Upload media assets through DealerOn's media manager and copy live URLs.",
          "Replace all image paths with DealerOn-hosted URLs.",
          "Paste the entire single-file code block into the HTML editor.",
          "Preview the page — check styles and JavaScript interactions work.",
          "Input SEO meta title and description in DealerOn's SEO fields.",
          "Publish and verify the live URL in an incognito browser.",
        ],
      },
    ],
  },
  {
    id: "cms-apollo",
    title: "Apollo",
    category: "CMS Platforms",
    description:
      "Apollo has a unique and crucial requirement: CSS must be wrapped inside a <script> tag using a custom JavaScript injection pattern. The Apollo page builder does not parse standard <style> tags correctly.",
    lastUpdated: "2026-03-16",
    version: "3.0",
    tags: ["Apollo", "CSS injection", "script tag", "workaround"],
    steps: [
      {
        title: "Accessing Apollo",
        description:
          "Log into the Apollo platform.",
        substeps: [
          "Navigate to: https://getapollo.com/",
          "Enter your Apollo login credentials.",
          "Select the dealership and navigate to the page editor.",
        ],
      },
      {
        title: "CSS-in-Script Injection (CRITICAL)",
        description:
          "Apollo does NOT parse standard <style> tags. All CSS must be injected via JavaScript. This is the most important rule for Apollo deployments.",
        substeps: [
          "Remove all standard <style>...</style> blocks from your code.",
          "Create a <script> tag that programmatically creates a <style> element.",
          "Use document.createElement('style') and set its innerHTML to your CSS string.",
          "Append the style element to document.head.",
          "Wrap everything in an IIFE to avoid polluting the global scope.",
          "Test that styles apply correctly when loaded via this injection method.",
        ],
        warning:
          "If you paste standard <style> tags into Apollo, the CSS will be silently stripped. Your page will appear completely unstyled. This is the #1 deployment issue on Apollo.",
        codeExample: `<!-- WRONG — Apollo will strip this -->
<style>.a3-brands-main { color: red; }</style>

<!-- CORRECT — CSS injected via JavaScript -->
<script>
  (function() {
    var style = document.createElement('style');
    style.innerHTML = \`
      .a3-brands-main {
        font-family: 'Montserrat', sans-serif;
        max-width: 1440px;
        margin: 0 auto;
      }
      .a3-brands-main h1 {
        font-size: 2.5rem;
        font-weight: 700;
      }
      .a3-brands-main .cta-button {
        background-color: #e8b130;
        padding: 12px 32px;
        border-radius: 4px;
      }
    \`;
    document.head.appendChild(style);
  })();
</script>

<!-- HTML goes after the script -->
<div class="a3-brands-main">
  <h1>2025 Model Name</h1>
  <a href="#" class="cta-button">View Inventory</a>
</div>`,
        notes: [
          "Use template literals (backticks) for the CSS string to preserve multi-line formatting.",
          "If your page appears completely unstyled after deployment, check the browser console for JS errors in the injection script.",
        ],
      },
      {
        title: "Deploying & Testing",
        description:
          "Deploy the code to Apollo and verify the CSS injection renders correctly.",
        substeps: [
          "Upload media assets through Apollo's media manager and copy live URLs.",
          "Paste the script-injection block FIRST (CSS injection code).",
          "Paste the HTML structure AFTER the script block.",
          "Add any additional JavaScript in a separate <script> tag at the bottom.",
          "Preview — confirm CSS injection loads correctly and styles are applied.",
          "Publish and verify the live URL.",
          "Input SEO meta data in Apollo's configuration fields.",
        ],
      },
    ],
  },
  {
    id: "cms-cox-auto",
    title: "Cox Automotive (Dealer.com)",
    category: "CMS Platforms",
    description:
      "Cox Auto (Dealer.com) is the most restrictive CMS platform. It has highly limited customizability and permission restrictions. If a design requires a feature you don't have permissions for, submit a support request immediately.",
    lastUpdated: "2026-03-16",
    version: "3.0",
    tags: ["Cox Auto", "Dealer.com", "restricted", "support tickets"],
    steps: [
      {
        title: "Accessing Cox Auto",
        description:
          "Log into the Cox Automotive / Dealer.com platform using SSO.",
        substeps: [
          "Navigate to: https://dealer.signin.coxautoinc.com/",
          "Enter your Cox Automotive SSO credentials.",
          "Select the dealership from the account selector.",
          "Navigate to the website editor / content management section.",
        ],
      },
      {
        title: "Understanding Restrictions",
        description:
          "Cox Auto has significant platform restrictions. Understanding them before coding prevents wasted time.",
        substeps: [
          "All HTML, CSS, and JS must be in a single file (like DealerOn).",
          "Custom JavaScript may be restricted — some accounts don't allow inline <script> tags.",
          "Advanced CSS features (animations, complex transforms) may be stripped.",
          "Custom fonts via @import or @font-face may not be supported.",
          "Certain HTML elements or attributes may be sanitized by Cox Auto's content filter.",
          "Check the dealership's permission level before starting development.",
        ],
        warning:
          "If a design requires a feature you don't have permissions for, submit a CMS Support request IMMEDIATELY. Cox Auto support requests take 3-5 business days. Delaying will bottleneck the entire project.",
      },
      {
        title: "Submitting CMS Support Requests",
        description:
          "When you encounter a feature restriction, submit a support request immediately.",
        substeps: [
          "Navigate to the Support/Help section within the Dealer.com platform.",
          "Create a new support ticket: 'Enable [feature] for [dealership name] - A3 Brands Development'.",
          "Clearly explain what feature you need and why. Attach a screenshot of the design.",
          "Set priority to 'High' if the project deadline is within 5 business days.",
          "Note the ticket number in Monday.com task comments for tracking.",
          "Inform your project manager immediately — the deadline may need adjustment.",
          "Follow up on the ticket daily until resolved.",
        ],
        notes: [
          "Common requests: enabling JavaScript, unlocking custom CSS, adding media upload permissions.",
        ],
      },
      {
        title: "Deploying & Testing",
        description:
          "Deploy single-file code to the Cox Auto page editor.",
        substeps: [
          "Consolidate all code into a single file: <style> + HTML + <script> (if JS is permitted).",
          "Upload media assets through Cox Auto's media manager.",
          "Paste code into the page editor's HTML section.",
          "Preview — check for stripped elements or broken styles.",
          "If elements are stripped, simplify the code to work within Cox Auto's limitations.",
          "Input SEO meta data, publish, and verify the live URL.",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CATEGORY: Quality Assurance
  // ─────────────────────────────────────────────────────────────
  {
    id: "pre-qa-checklist",
    title: "Pre-QA Checklist",
    category: "Quality Assurance",
    description:
      "Before handing any page to the QA team, run through every item on this checklist. This catches common issues before they're flagged, reducing revision cycles and speeding up delivery.",
    lastUpdated: "2026-03-16",
    version: "3.0",
    tags: ["QA", "checklist", "testing", "responsive", "verification"],
    steps: [
      {
        title: "Desktop View Verification",
        description:
          "Open the live CMS page at 1440px and compare against the Figma design. Every element must match.",
        substeps: [
          "Open the deployed page in Chrome at 1440px viewport width.",
          "Place Figma and the live page side-by-side.",
          "Check hero section: image, headline, subheadline, CTA button placement.",
          "Verify all body sections: content blocks, feature grids, image galleries, spec tables.",
          "Confirm all font sizes, colors, weights, and spacing match Figma specifications.",
        ],
      },
      {
        title: "Mobile View Verification",
        description:
          "Test at 375px mobile viewport and 768px tablet. All content must be readable and tappable.",
        substeps: [
          "Open Chrome DevTools and switch to mobile view (375px width).",
          "Scroll through the entire page — check for horizontal overflow or content clipping.",
          "Verify text is readable without zooming (minimum 14px font size on mobile).",
          "Check that all buttons and CTAs are tappable (minimum 44px touch target).",
          "Test at tablet viewport (768px) for medium-screen layouts.",
          "Verify images scale correctly and don't stretch or pixelate.",
        ],
      },
      {
        title: "Visual & Layout Bugs",
        description:
          "Scan for visual defects that would fail QA review.",
        substeps: [
          "Check for overlapping text — especially at mobile breakpoints.",
          "Look for broken layouts — sections that collapse, stack incorrectly, or have unexpected gaps.",
          "Verify consistent padding and margins across all sections.",
          "Check for orphaned text — single words on their own line.",
          "Verify all background images and gradients render correctly.",
        ],
      },
      {
        title: "SEO & Accessibility",
        description:
          "Verify heading hierarchy, alt texts, links, and SEO content.",
        substeps: [
          "Heading Hierarchy: H1 → H2 → H3 in logical order. Exactly ONE H1 per page.",
          "Alt Texts: Every <img> has a descriptive alt attribute. No empty alt='' or missing alt.",
          "Links & CTAs: Click every link and CTA — verify they route to correct inventory pages.",
          "SEO Content: Verify meta title and description are populated in the page source <head>.",
          "URL Slug: Matches the SEO team's specification (if provided).",
        ],
        warning:
          "An empty or missing alt text on any image is an automatic QA failure.",
      },
    ],
  },
  {
    id: "qa-handoff-process",
    title: "QA Handoff Process",
    category: "Quality Assurance",
    description:
      "How to formally hand off pages to the QA team, what QA testers check, common failure reasons, and how to handle revision requests efficiently.",
    lastUpdated: "2026-03-16",
    version: "3.0",
    tags: ["QA", "handoff", "revisions", "review", "process"],
    steps: [
      {
        title: "Handoff to QA Team",
        description:
          "Once all Pre-QA Checklist items pass, formally hand off to QA.",
        substeps: [
          "Open the Monday.com task for this page.",
          "Change task status from 'In Development' to 'Ready for QA'.",
          "Leave a comment with the live page URL.",
          "Tag the assigned QA tester in the comment.",
          "For batch pages (same dealership), hand them off together with all URLs listed.",
        ],
      },
      {
        title: "What QA Checks",
        description:
          "Understanding what QA reviews helps you catch issues before they're flagged.",
        substeps: [
          "Desktop pixel accuracy vs. Figma design at 1440px.",
          "Mobile responsiveness at 375px — no horizontal scroll, no clipped content.",
          "Visual integrity — no overlapping text, broken layouts, inconsistent spacing.",
          "Heading hierarchy — H1 → H2 → H3, one H1 per page, no skipped levels.",
          "Image alt texts — every <img> has a descriptive alt attribute.",
          "Link functionality — all CTAs and navigation links route correctly.",
          "SEO verification — meta title and description match Content Team's spec.",
          "Page speed — images optimized, no massive uncompressed files.",
        ],
      },
      {
        title: "Common QA Failures",
        description:
          "Avoid these to reduce revision cycles. These are the most frequently flagged issues.",
        substeps: [
          "Missing alt texts — automatic failure, every time.",
          "Broken CTA links — buttons that go to '#' or placeholder URLs.",
          "Mobile overflow — content extends beyond the viewport causing horizontal scroll.",
          "Inconsistent spacing — padding/margins off by more than 5px from Figma.",
          "Wrong heading levels — multiple H1 tags or skipped heading levels.",
          "Unscoped CSS — styles leaking outside .a3-brands-main wrapper.",
          "Missing meta descriptions — SEO fields left empty in the CMS.",
        ],
        warning:
          "Pages with more than 3 QA failures may be sent back for a full re-review. Aim for zero failures on first submission.",
      },
      {
        title: "Handling Revision Requests",
        description:
          "When QA sends a page back, follow this process.",
        substeps: [
          "Check Monday.com for tasks with 'Needs Revision' status.",
          "Open the QA notes/comments to read the specific issues flagged.",
          "Fix each issue listed — do not address only some items.",
          "Re-run the full Pre-QA Checklist before resubmitting.",
          "Update the page on the CMS with fixes.",
          "Change status back to 'Ready for QA' and comment listing each fix made.",
          "Tag the QA tester to notify them revisions are deployed.",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CATEGORY: Resources
  // ─────────────────────────────────────────────────────────────
  {
    id: "cms-logins",
    title: "CMS Logins",
    category: "Resources",
    description:
      "Quick reference for all CMS platform login URLs and access instructions. Bookmark these for daily use.",
    lastUpdated: "2026-03-16",
    version: "3.0",
    tags: ["logins", "URLs", "access", "credentials", "reference"],
    steps: [
      {
        title: "Dealer Inspire (WordPress)",
        description:
          "WordPress-based CMS with the DI Page Composer.",
        substeps: [
          "Login URL: https://[dealership-domain]/wp-admin",
          "Each dealership has its own WordPress instance with unique credentials.",
          "Credentials are stored in the team credentials vault — request access from your PM.",
          "After login, you'll be in the WordPress admin dashboard.",
        ],
        notes: [
          "Replace [dealership-domain] with the actual dealership's website domain.",
        ],
      },
      {
        title: "DealerOn",
        description:
          "Centralized account portal with a dealership selector.",
        substeps: [
          "Login URL: https://account.dealeron.com/Login/",
          "Single login account with access to multiple dealerships.",
          "After login, select the specific dealership from the dashboard.",
          "Navigate to the page builder to edit or create pages.",
        ],
      },
      {
        title: "Apollo",
        description:
          "Web-based CMS platform for automotive dealers.",
        substeps: [
          "Login URL: https://getapollo.com/",
          "Credentials are per-dealership — check the team vault.",
          "After login, select the dealership and navigate to page editor.",
          "Remember: CSS must use the script injection pattern on this platform.",
        ],
        warning:
          "Apollo's interface is significantly different from WordPress-based platforms. See the Apollo CMS guide for detailed deployment instructions.",
      },
      {
        title: "Cox Automotive (Dealer.com)",
        description:
          "Enterprise-grade CMS with Single Sign-On (SSO).",
        substeps: [
          "Login URL: https://dealer.signin.coxautoinc.com/",
          "Uses SSO authentication — your credentials may differ from other platforms.",
          "After login, select the dealership from the account selector.",
          "Check feature permissions before starting development — submit support requests early.",
        ],
        notes: [
          "Cox Auto SSO credentials are separate from other CMS platform credentials.",
          "If your SSO account doesn't have access to a dealership, contact your project manager.",
        ],
      },
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    category: "Resources",
    description:
      "Common issues encountered during MLP development and their solutions. Check here before asking for help — your issue is likely covered.",
    lastUpdated: "2026-03-16",
    version: "3.0",
    tags: ["troubleshooting", "issues", "fixes", "debugging", "FAQ"],
    steps: [
      {
        title: "Styles Not Appearing on CMS",
        description:
          "Your page looks unstyled or partially styled after deploying to the CMS.",
        substeps: [
          "Apollo: You probably used standard <style> tags. Apollo strips them. Use the CSS-in-script injection pattern instead.",
          "DealerOn/Cox Auto: Check that you didn't use external <link> stylesheet references. All CSS must be inline.",
          "All Platforms: Open browser DevTools → Console tab. Check for JavaScript errors that might block CSS injection.",
          "All Platforms: Verify your CSS isn't being overridden by the CMS's default styles. Increase specificity by using .a3-brands-main prefix.",
        ],
        codeExample: `/* If CMS styles override yours, increase specificity */
/* Instead of: */
.a3-brands-main h2 { color: #1a3c6e; }

/* Use: */
.a3-brands-main h2.a3-heading { color: #1a3c6e !important; }`,
      },
      {
        title: "Images Not Loading",
        description:
          "Images show as broken links or placeholders on the live page.",
        substeps: [
          "Check that you replaced ALL local file paths with CMS-hosted URLs.",
          "Search your code for: 'file://', './images/', '../assets/' — these are local paths that won't work.",
          "Verify images were uploaded to the CMS Media Library and the URLs were copied correctly.",
          "Check for typos in the image URLs — a missing character will break the link.",
          "Try opening the image URL directly in the browser to verify it loads.",
        ],
      },
      {
        title: "CSS Leaking into Dealer's Site",
        description:
          "Your styles are affecting elements outside your page — the dealer's header, footer, or other pages look broken.",
        substeps: [
          "You have unscoped CSS selectors. Every rule must be prefixed with .a3-brands-main.",
          "Search for CSS rules without the .a3-brands-main prefix — these are the leaking styles.",
          "Common culprits: global resets (*, body, html), unscoped heading styles (h1, h2), link styles (a).",
          "Fix: Add the .a3-brands-main prefix to every CSS rule in your code.",
          "Verify: After fixing, refresh the dealer's site and check the header/footer are unaffected.",
        ],
        warning:
          "CSS leakage is a critical issue — it can break the dealer's entire website. Always scope your styles.",
      },
      {
        title: "Mobile Layout Breaking",
        description:
          "Page looks fine on desktop but breaks at mobile viewport widths.",
        substeps: [
          "Check for fixed-width elements: elements with 'width: 500px' won't shrink on mobile. Use 'max-width: 100%' instead.",
          "Check for horizontal overflow: open DevTools, switch to 375px width, and scroll right. Find the overflowing element.",
          "Images: Add 'max-width: 100%; height: auto;' to all images inside .a3-brands-main.",
          "Flex/Grid: Ensure containers use 'flex-wrap: wrap' or switch to single-column layout on mobile.",
          "Text overflow: Long words or URLs can cause overflow. Add 'overflow-wrap: break-word' to text containers.",
        ],
        codeExample: `/* Mobile-safe defaults */
.a3-brands-main img {
  max-width: 100%;
  height: auto;
}

.a3-brands-main {
  overflow-x: hidden;
  overflow-wrap: break-word;
}

@media (max-width: 768px) {
  .a3-brands-main .feature-grid {
    grid-template-columns: 1fr;  /* Stack on mobile */
  }
}`,
      },
      {
        title: "Cox Auto Feature Restrictions",
        description:
          "A feature in the design isn't working on Cox Auto (Dealer.com).",
        substeps: [
          "Identify which feature is blocked: JavaScript, custom fonts, CSS animations, etc.",
          "Submit a support request IMMEDIATELY — do not wait (see Cox Auto CMS guide).",
          "Inform your project manager that the deadline may be affected.",
          "While waiting for the support request, build what you can without the blocked feature.",
          "If the request is denied, work with the Designer to create an alternative design within Cox Auto's limitations.",
        ],
      },
      {
        title: "Monday.com Task Issues",
        description:
          "Common task management problems and how to resolve them.",
        substeps: [
          "Missing content/design: Follow the Blocker Protocol — don't start development. Set status to 'Blocked' and tag the responsible person.",
          "Deadline conflict: If you can't meet the deadline, notify your PM immediately with an estimated delivery time.",
          "Unclear requirements: Comment on the task and tag the PM. Don't guess — ask for clarification.",
          "Task assigned to wrong person: Comment on the task and tag the PM. Don't reassign yourself.",
          "QA revisions unclear: Comment on the task and tag the QA tester asking for specific details.",
        ],
      },
    ],
  },
];
