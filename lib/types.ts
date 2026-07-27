import type { Skill, SkillCategory } from "@prisma/client";

export type CategoryWithSkills = SkillCategory & { skills: Skill[] };
export type SkillType = Skill;
