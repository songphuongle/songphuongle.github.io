import { LucideIcon } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  problem?: string;
  solution?: string;
  impact?: string;
  tags: string[];
  image: string;
  links: {
    demo?: string;
    github?: string;
    video?: string;
  };
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  period: string;
  details: string;
}

export interface SkillItem {
  name: string;
  iconName: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: SkillItem[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  iconName: string;
  image?: string;
  date?: string;
  score?: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  iconName: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  conference: string;
  doi?: string;
}

export interface NavItem {
  label: string;
  href: string;
}