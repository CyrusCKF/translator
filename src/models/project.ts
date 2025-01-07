export default interface Project {
  name: string;
  version: string;
  sourceLang: string;
  languages: string[];
  filePath?: string;
  lastModified?: Date;
  context?: string;
  sections: Section[];
}

export interface Section {
  name: string;
  context?: string;
  records: Record[];
}

export interface Record {
  key: string;
  context?: string;
  source: string;
  translations: Map<string, string>;
}
