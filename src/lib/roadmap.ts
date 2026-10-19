export type RoadmapStep = {
  skill: string;
  priority: "High" | "Medium" | "Low";
  reason: string;
  task: string;
  resource: string;
};

const SKILL_GUIDE: Record<
  string,
  { reason: string; task: string; resource: string }
> = {
  html: {
    reason: "Build the structure of web pages.",
    task: "Create a personal portfolio page using semantic HTML.",
    resource: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content"
  },
  css: {
    reason: "Create responsive, polished user interfaces.",
    task: "Style your portfolio for mobile and desktop screens.",
    resource: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics"
  },
  javascript: {
    reason: "Add interactions and dynamic behaviour to websites.",
    task: "Build a searchable list with filtering and form validation.",
    resource: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
  },
  typescript: {
    reason: "Write safer, more maintainable JavaScript applications.",
    task: "Add types and interfaces to a small JavaScript project.",
    resource: "https://www.typescriptlang.org/docs/"
  },
  react: {
    reason: "Build reusable, interactive user interfaces.",
    task: "Create a task tracker using components, props, and state.",
    resource: "https://react.dev/learn"
  },
  "next.js": {
    reason: "Build full-stack React applications.",
    task: "Create a small application with a page and API route.",
    resource: "https://nextjs.org/learn"
  },
  python: {
    reason: "Use a versatile language for scripting, data, and backend work.",
    task: "Build a command-line expense tracker using functions and lists.",
    resource: "https://docs.python.org/3/tutorial/"
  },
  java: {
    reason: "Strengthen object-oriented programming skills.",
    task: "Build a student management program using classes and collections.",
    resource: "https://dev.java/learn/"
  },
  sql: {
    reason: "Retrieve and manage data stored in relational databases.",
    task: "Create tables and practise SELECT, JOIN, and GROUP BY queries.",
    resource: "https://sqlbolt.com/"
  },
  git: {
    reason: "Track changes and collaborate on code.",
    task: "Commit a project and practise branching and merging.",
    resource: "https://git-scm.com/doc"
  },
  github: {
    reason: "Share projects and collaborate with other developers.",
    task: "Publish a repository with a clear README and screenshots.",
    resource: "https://docs.github.com/en/get-started"
  },
  node: {
    reason: "Run JavaScript on the server.",
    task: "Build a small REST API with two endpoints.",
    resource: "https://nodejs.org/en/learn"
  },
  "node.js": {
    reason: "Run JavaScript on the server.",
    task: "Build a small REST API with two endpoints.",
    resource: "https://nodejs.org/en/learn"
  },
  api: {
    reason: "Connect applications to external services and data.",
    task: "Fetch data from a public API and handle loading and errors.",
    resource: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"
  },
  mongodb: {
    reason: "Store and query document-based data.",
    task: "Create a collection and practise CRUD operations.",
    resource: "https://www.mongodb.com/docs/manual/"
  },
  postgresql: {
    reason: "Work with relational data using PostgreSQL.",
    task: "Design a small database and write JOIN queries.",
    resource: "https://www.postgresql.org/docs/"
  },
  docker: {
    reason: "Package applications in consistent environments.",
    task: "Containerize a small application using a Dockerfile.",
    resource: "https://docs.docker.com/get-started/"
  },
  aws: {
    reason: "Understand cloud infrastructure and deployment.",
    task: "Learn core cloud concepts and deploy a small demo application.",
    resource: "https://aws.amazon.com/getting-started/"
  },
  testing: {
    reason: "Catch bugs and improve application reliability.",
    task: "Write tests for a utility function and its edge cases.",
    resource: "https://jestjs.io/docs/getting-started"
  },
  "data structures": {
    reason: "Build problem-solving skills used in technical interviews.",
    task: "Practise arrays, strings, stacks, queues, and hash maps.",
    resource: "https://www.geeksforgeeks.org/data-structures/"
  },
  "machine learning": {
    reason: "Learn how to build and evaluate predictive models.",
    task: "Train a small model and evaluate it on held-out data.",
    resource: "https://scikit-learn.org/stable/getting_started.html"
  },
};

const SKILL_ALIASES: Record<string, string[]> = {
  javascript: ["javascript", "java script", "js"],
  typescript: ["typescript", "type script", "ts"],
  "next.js": ["next.js", "nextjs", "next js"],
  "node.js": ["node.js", "nodejs", "node js"],
  react: ["react", "react.js", "reactjs"],
  python: ["python"],
  java: ["java"],
  html: ["html", "html5"],
  css: ["css", "css3"],
  sql: ["sql"],
  git: ["git"],
  github: ["github"],
  api: ["api", "rest api", "restful api"],
  mongodb: ["mongodb", "mongo db"],
  postgresql: ["postgresql", "postgres"],
  docker: ["docker"],
  aws: ["aws", "amazon web services"],
  testing: ["testing", "unit testing", "jest", "pytest"],
  "data structures": ["data structures", "data structure", "dsa"],
  "machine learning": ["machine learning", "ml"],
};

function containsSkill(text: string, skill: string): boolean {
  const aliases = SKILL_ALIASES[skill] ?? [skill];
  return aliases.some((alias) => {
    const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|[^a-z0-9+#.])${escaped}([^a-z0-9+#.]|$)`, "i").test(text);
  });
}

export function buildLearningRoadmap(
  userSkills: string[],
  jobDescription: string
): RoadmapStep[] {
  const text = jobDescription.toLowerCase();

  const knownSkills = Object.keys(SKILL_GUIDE).filter((skill) =>
    containsSkill(text, skill)
  );

  const normalizedUserSkills = userSkills.map((skill) =>
    skill.trim().toLowerCase()
  );

  const missingSkills = knownSkills.filter(
    (skill) =>
      !normalizedUserSkills.some(
        (userSkill) =>
          userSkill === skill ||
          (SKILL_ALIASES[skill] ?? [skill]).includes(userSkill)
      )
  );

  return missingSkills.slice(0, 5).map((skill, index) => ({
    skill,
    priority: index < 2 ? "High" : index < 4 ? "Medium" : "Low",
    ...SKILL_GUIDE[skill],
  }));
}
