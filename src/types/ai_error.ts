export interface AiErrorItem {
  id: string;
  date: string;
  title: string;
  scene: string;
  bad_behavior: string[];
  fact: string[];
  root_cause: string[];
  correct_action: string[];
  teaching_point: string;
  severity: "high" | "medium" | "critical";
  tags: string[];
}

export interface RuleAdvice {
  id: string;
  title: string;
  desc: string;
}

export interface UserAdvice {
  point: string;
}
