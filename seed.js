const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://user:pass@cluster.mongodb.net/test';

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    coverImage: { type: String },
    author: { type: String, default: 'Admin' },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Article = mongoose.models.Article || mongoose.model('Article', articleSchema);

const articlesToInsert = [
  {
    title: 'How to Write Meta Tags That Actually Improve Click-Through Rate',
    slug: 'meta-tags-seo-guide',
    excerpt: 'A practical guide to writing title tags and meta descriptions that get more clicks from Google search results — with real examples and common mistakes to avoid.',
    content: `
      <p>Meta tags are the single most visible part of your SEO strategy — they are the first thing a potential visitor sees on a Google search results page. A well-written title tag and meta description can increase your click-through rate by 20-30% without changing your ranking at all. This guide walks through exactly how to write them, with specific character limits, real examples, and the mistakes that quietly cost you clicks.</p>
      <h2>What meta tags actually matter in 2024?</h2>
      <p>There are dozens of meta tags, but only a handful have a real impact on how your page appears in search results:</p>
      <ul>
        <li><strong>Title tag</strong> — the clickable blue link in search results. Google displays 50-60 characters; anything longer gets truncated with an ellipsis.</li>
        <li><strong>Meta description</strong> — the gray text below the title. Google displays about 150-160 characters on desktop and slightly fewer on mobile.</li>
        <li><strong>Open Graph tags</strong> (og:title, og:description, og:image) — control how your page looks when shared on Facebook, LinkedIn, and Slack.</li>
        <li><strong>Twitter Card tags</strong> — control how your page appears when shared on Twitter/X. Twitter falls back to Open Graph tags if these are missing.</li>
      </ul>
      <h2>How to write a title tag that gets clicks</h2>
      <p>Your title tag has two jobs: tell Google what the page is about, and convince a person to click it instead of the nine other results on the page. Here is how to do both:</p>
      <h3>1. Put your primary keyword first</h3>
      <p>Google weighs the first words of your title more heavily. If your page targets "best running shoes," start with those words — not with your brand name.</p>
      <h3>2. Stay under 60 characters</h3>
      <p>Google truncates titles around 50-60 characters on desktop. If your title is longer, Google may rewrite it entirely.</p>
      <h3>3. Make it specific, not generic</h3>
      <p>"SEO Tips" is generic. "12 SEO Tips That Increased Our Traffic 340% in 6 Months" is specific and clickable.</p>
      <h2>How to write a meta description that earns the click</h2>
      <p>Google does not use the meta description as a direct ranking signal, but it does display it in search results — and a better description means more clicks, which means more traffic.</p>
      <h3>Lead with the value</h3>
      <p>The first 120 characters are what show on mobile. Start with the most compelling part of your page.</p>
      <h3>Include a call to action</h3>
      <p>Phrases like "learn how," "get the checklist," or "compare the options" tell the searcher what they will get by clicking.</p>
      <h3>Match the page content</h3>
      <p>If your description promises something the page does not deliver, visitors will bounce — and Google may eventually rewrite your description.</p>
      <h2>Common meta tag mistakes that cost you clicks</h2>
      <ul>
        <li><strong>Duplicate title tags</strong> across pages.</li>
        <li><strong>Stuffing keywords</strong> — "SEO Tips | SEO Guide | SEO Strategies | SEO Help" reads as spam.</li>
        <li><strong>No meta description</strong> — Google will generate one from your page content.</li>
        <li><strong>Missing Open Graph image</strong> — when someone shares your link, there is no image preview.</li>
      </ul>
      <h2>The bottom line</h2>
      <p>Meta tags are the lowest-effort, highest-impact SEO task on your site. Spending 10 minutes per page writing a specific title and a compelling description can increase traffic from existing rankings.</p>
    `,
    published: true,
  },
  {
    title: 'A Practical Guide to Schema Markup for Small Sites',
    slug: 'schema-markup-guide',
    excerpt: 'Schema markup explained for non-developers. Which schema types to use, how to add JSON-LD to your site, and how to test it — without getting lost in the spec.',
    content: `
      <p>Schema markup is structured data you add to your web pages that helps search engines understand what your content is about. It is what enables rich results — those enhanced search listings with star ratings, FAQ accordions, and breadcrumb trails that stand out from regular results. This guide covers exactly which schema types small sites need, how to add them without a developer, and how to test that they work.</p>
      <h2>What schema markup actually does</h2>
      <p>When you add schema markup to a page, you are giving Google a structured, machine-readable description of what is on that page. Without schema, Google has to guess whether a number on your page is a price, a rating, or a quantity. With schema, you tell it explicitly — "this is a product, the price is $29, and 47 people rated it 4.5 stars."</p>
      <p>This does not improve your ranking directly, but it makes your search listing more prominent and informative, which increases click-through rate.</p>
      <h2>Which schema types does a small site actually need?</h2>
      <p>There are hundreds of schema types, but most small sites only need a handful:</p>
      <ul>
        <li><strong>Organization</strong> — tells Google who you are. Add it to your homepage.</li>
        <li><strong>Article</strong> — for blog posts and news content.</li>
        <li><strong>FAQPage</strong> — if your page has a FAQ section. This can earn an expandable FAQ accordion in search results.</li>
        <li><strong>BreadcrumbList</strong> — shows your page's position in your site hierarchy.</li>
        <li><strong>SoftwareApplication</strong> — if you offer a tool or app.</li>
      </ul>
      <h2>How to add schema to your site</h2>
      <p>The easiest and Google-recommended way to add schema is using JSON-LD (JavaScript Object Notation for Linked Data). This is a block of code you paste into the head or body of your HTML page.</p>
      <h3>1. Generate the JSON-LD</h3>
      <p>You don't need to write the code from scratch. Use a generator to select the type of schema you want, fill in the blanks, and copy the resulting code.</p>
      <h3>2. Add it to your page</h3>
      <p>Paste the code block anywhere in the HTML of the specific page it applies to. Do not put Article schema for a specific post on your homepage.</p>
      <h3>3. Test it</h3>
      <p>Before publishing, paste your code into Google's Rich Results Test to ensure there are no syntax errors or missing required fields.</p>
      <h2>Common schema mistakes</h2>
      <ul>
        <li><strong>Marking up hidden content</strong> — only add schema for information that is actually visible to users on the page.</li>
        <li><strong>Using the wrong type</strong> — don't use Recipe schema for a non-food tutorial just to get the rich result.</li>
        <li><strong>Syntax errors</strong> — a single missing comma in JSON-LD breaks the entire block. Always use a validator.</li>
      </ul>
    `,
    published: true,
  },
  {
    title: 'The AI Content Brief Playbook: Stop Getting Generic Output',
    slug: 'ai-content-brief-playbook',
    excerpt: 'How to write a prompt that forces ChatGPT, Claude, or Gemini to write high-quality, specific, and structurally sound articles — instead of generic filler.',
    content: `
      <p>If you ask an AI to "write an article about SEO," you will get a generic, soulless article full of phrases like "In today's digital landscape" and "delving into the intricacies." The secret to getting good content out of an AI is not the model you use — it is the brief you provide. This guide shows you exactly how to write a content brief that forces the AI to produce specific, structured, and high-quality output.</p>
      <h2>Why generic prompts fail</h2>
      <p>Large Language Models are prediction engines. When you give them a vague prompt, they predict the most average, generic sequence of words associated with that topic. A vague prompt tells the AI to guess your target audience, guess your tone, guess the format, and guess what points to cover. It will guess wrong.</p>
      <h2>The anatomy of a perfect AI content brief</h2>
      <p>A good AI brief looks exactly like a good brief for a human freelancer. It leaves nothing to guesswork. Here are the five components you must include:</p>
      <h3>1. The Persona and Role</h3>
      <p>Tell the AI who it is. "You are an expert technical SEO specialist writing for an audience of beginner web developers." This sets the vocabulary and baseline knowledge level.</p>
      <h3>2. The Core Objective</h3>
      <p>What must the reader be able to do after reading this? "The goal of this article is to teach the reader how to compress images using squoosh.app without losing quality."</p>
      <h3>3. The Detailed Outline</h3>
      <p>Do not let the AI structure the article. Provide the exact H2s and H3s you want. If you don't, the AI will default to a 5-paragraph essay structure.</p>
      <h3>4. The "Do Not Use" List</h3>
      <p>The most important part of the prompt. Tell the AI what phrases to avoid. Ban words like "Unlock," "Crucial," "In today's fast-paced," "Dive into," and "Tapestry."</p>
      <h3>5. The Formatting Rules</h3>
      <p>Specify the output format. "Use short paragraphs (max 3 sentences). Use bullet points for lists. Output in Markdown format. Do not write a conclusion paragraph starting with 'In conclusion'."</p>
      <h2>Using the AI Content Brief Generator</h2>
      <p>Writing these prompts manually takes 20-30 minutes. We built the AI Content Brief Generator to automate this. You enter your topic, audience, and keywords, and it outputs a highly structured, battle-tested prompt you can copy directly into ChatGPT or Claude.</p>
      <h2>The two-step generation process</h2>
      <p>For the best results, do not ask the AI to write the whole article at once. Ask it to write section by section. First, feed it the brief and ask for Section 1. Then ask for Section 2. This prevents the AI from losing context or rushing the output to fit within its output limits.</p>
    `,
    published: true,
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    let count = 0;
    for (const article of articlesToInsert) {
      const exists = await Article.findOne({ slug: article.slug });
      if (!exists) {
        await Article.create(article);
        console.log("Inserted " + article.slug);
        count++;
      } else {
        console.log("Skipped " + article.slug + " (already exists)");
      }
    }
    
    console.log("Successfully seeded " + count + " articles");
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();
