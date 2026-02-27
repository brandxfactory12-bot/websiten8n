export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  cta: string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}
