import Project from "../../models/project";
import { JsonMap, parse, stringify } from "@iarna/toml";

function parseProjectFile(contents: string) {
  const jsonMap = parse(contents);
  const project: Project = {
    name: jsonMap.name,
    version: jsonMap.version,
    sourceLang: jsonMap.sourceLang,
    languages: jsonMap.languages, // string[]
    filePath: jsonMap.filePath, // string | undefined
    lastModified: jsonMap.lastModified
      ? new Date(jsonMap.lastModified)
      : undefined, // Convert back to Date
    context: jsonMap.context, // string | undefined
    sections: jsonMap.sections.map((section) => ({
      name: section.name,
      context: section.context, // string | undefined
      records: section.records.map((record) => ({
        key: record.key,
        context: record.context, // string | undefined
        source: record.source,
        translations: new Map(Object.entries(record.translations)), // Convert plain object back to Map
      })),
    })),
  };
  return project;
}

function convertProjectToFile(project: Project) {
  const projectJsonMap: JsonMap = {
    name: project.name,
    version: project.version,
    sourceLang: project.sourceLang,
    languages: project.languages,
    ...(project.filePath != undefined && { filePath: project.filePath }),
    ...(project.lastModified != undefined && {
      lastModified: project.lastModified,
    }),
    ...(project.context != undefined && { context: project.context }),
    sections: project.sections.map((section) => ({
      name: section.name,
      ...(section.context != undefined && { context: section.context }),
      records: section.records.map((record) => ({
        key: record.key,
        ...(record.context != undefined && { context: record.context }),
        source: record.source,
        translations: Object.fromEntries(record.translations),
      })),
    })),
  };
  const toml = stringify(projectJsonMap);
  return toml;
}

if (require.main == module) {
  const project: Project = {
    name: "Project",
    version: "0.1.3",
    sourceLang: "English",
    languages: ["Spanish"],
    sections: [],
  };
  const projectToml = convertProjectToFile(project);
  console.log(projectToml);
}
