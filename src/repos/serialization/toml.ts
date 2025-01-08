import Project from "../../models/project";
import { JsonMap, parse, stringify } from "@iarna/toml";

function parseProjectTomlFile(contents: string) {
  const jsonMap = parse(contents);
  const project: Project = {
    name: jsonMap.name as string,
    version: jsonMap.version as string,
    sourceLang: jsonMap.sourceLang as string,
    languages: jsonMap.languages as string[],
    ...(jsonMap.filePath != undefined && {
      filePath: jsonMap.filePath as string,
    }),
    ...(jsonMap.lastModified != undefined && {
      lastModified: new Date(jsonMap.lastModified as Date),
    }),
    ...(jsonMap.context != undefined && { context: jsonMap.context as string }),
    sections: (jsonMap.sections as JsonMap[]).map((section) => ({
      name: section.name as string,
      ...(section.context != undefined && {
        context: section.context as string,
      }),
      records: (section.records as JsonMap[]).map((record) => ({
        key: record.key as string,
        ...(record.context != undefined && {
          context: record.context as string,
        }),
        source: record.source as string,
        translations: record.translations as string[],
      })),
    })),
  };
  return project;
}

function convertProjectToToml(project: Project) {
  const projectJsonMap: JsonMap = {
    name: project.name,
    version: project.version,
    sourceLang: project.sourceLang,
    languages: project.languages,
    ...(project.context != undefined && { context: project.context }),
    sections: project.sections.map((section) => ({
      name: section.name,
      ...(section.context != undefined && { context: section.context }),
      records: section.records.map((record) => ({
        key: record.key,
        ...(record.context != undefined && { context: record.context }),
        source: record.source,
        translations: record.translations,
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
    sections: [
      {
        name: "Section 1",
        context: "Some context for this section",
        records: [
          {
            key: "1",
            source: "Hi",
            translations: ["Hola"],
          },
          {
            key: "2",
            source: "How are you",
            translations: [""],
          },
        ],
      },
    ],
  };

  const projectToml = convertProjectToToml(project);
  console.log(projectToml);

  const projectParsed = parseProjectTomlFile(projectToml);
  console.log(projectParsed);
}
