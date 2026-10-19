
export type JobMatchResult = {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
};

function normalizeSkill(skill: string): string {
  return skill.trim().toLowerCase();
}

export function calculateJobMatch(
  userSkills: string[],
  jobDescription: string
): JobMatchResult {
  const description = jobDescription.toLowerCase();

  const skills = [...new Set(
    userSkills.map(normalizeSkill).filter(Boolean)
  )];

  const matchedSkills = skills.filter((skill) =>
    description.includes(skill)
  );

  const missingSkills = skills.filter(
    (skill) => !description.includes(skill)
  );

  const score =
    skills.length === 0
      ? 0
      : Math.round((matchedSkills.length / skills.length) * 100);

  return {
    score,
    matchedSkills,
    missingSkills,
  };
}
