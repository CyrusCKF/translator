import { TranslationRequest } from "./models";

const translatePromptTemplate = `Context: {context}

Examples
{examples}

Translate the following text from {sourceLang} to {targetLang}. Reply only the translated text.

{text}`;

const estimatePromptTemplate = `You are an annotator for the quality of machine translation. Your task is to identify errors and assess the quality of the translation.

Example: 
Based on the source segment and machine translation, identify error types in the translation and classify them. 
The categories of errors are: accuracy (addition, mistranslation, omission, untranslated text), fluency (character encoding, grammar, inconsistency, punctuation, register, spelling), 
locale convention (currency, date, name, telephone, or time format) style (awkward), terminology (inappropriate for context, inconsistent use), non-translation, other, or no-error.\n
Each error is classified as one of three categories: critical, major, and minor. 
Critical errors inhibit comprehension of the text. Major errors disrupt the flow, but what the text is trying to say is still understandable. 
Minor errors are technically errors, but do not disrupt the flow or hinder comprehension.

Example1:
Chinese source: 大众点评乌鲁木齐家居商场频道为您提供居然之家地址，电话，营业时间等最新商户信息， 找装修公司，就上大众点评
English translation: Urumqi Home Furnishing Store Channel provides you with the latest business information such as the address, telephone number, business hours, etc., of high-speed rail, and find a decoration company, and go to the reviews.

MQM annotations:
critical: accuracy/addition - "of high-speed rail"
major: accuracy/mistranslation - "go to the reviews"
minor: style/awkward - "etc.,"

Example2:
English source: I do apologise about this, we must gain permission from the account holder to discuss an order with another person, I apologise if this was done previously, however, I would not be able to discuss this with yourself without the account holders permission.
German translation: Ich entschuldige mich dafür, wir müssen die Erlaubnis einholen, um eine Bestellung mit einer anderen Person zu besprechen. Ich entschuldige mich, falls dies zuvor geschehen wäre, aber ohne die Erlaubnis des Kontoinhabers wäre ich nicht in der Lage, dies mit dir involvement.

MQM annotations:
critical: no-error
major: accuracy/mistranslation - "involvement" 
        accuracy/omission - "the account holder"
minor: fluency/grammar - "wäre"
        fluency/register - "dir"

Example3:
English source: Talks have resumed in Vienna to try to revive the nuclear pact, with both sides trying to gauge the prospects of success after the latest exchanges in the stop-start negotiations.
Czech transation: Ve Vídni se ve Vídni obnovily rozhovory o oživení jaderného paktu, přičemže obě partaje se snaží posoudit vyhlídky na úspěch po posledních výměnách v jednáních.

MQM annotations:
critical: no-error
major: accuracy/addition - "ve Vídni" 
        accuracy/omission - "the stop-start"
minor: terminology/inappropriate for context - "partaje"

----------------------------
Learn from these examples, and based on the source segment and machine translation, identify error types in the translation and classify them.
The categories of errors are: accuracy (addition, mistranslation, omission, untranslated text), fluency (character encoding, grammar, inconsistency, punctuation, register, spelling), 
locale convention (currency, date, name, telephone, or time format) style (awkward), terminology (inappropriate for context, inconsistent use), non-translation, other, or no-error.\n
Each error is classified as one of three categories: critical, major, and minor. 
Critical errors inhibit comprehension of the text. Major errors disrupt the flow, but what the text is trying to say is still understandable. 
Minor errors are technically errors, but do not disrupt the flow or hinder comprehension.
{sourceLang} source: {source} 
{targetLang} translation: {translation}
MQM annotations:`;

const refinePromptTemplate = `Consider the following translation pair from {sourceLang} to {targetLang}

Context: {context}

Examples
{examples}

Source: {source}
Raw translation: {rawTranslation}

I'm not satisfied with the this, becauese some defects exist:
{mqmAnnotations}
Critical errors inhibit comprehension of the text. Major errors disrupt the flow, but what the text is trying to say is still understandable. 
Minor errors are technically errors, but do not disrupt the flow or hinder comprehension.

Upon reviewing the translation examples and error information, please proceed to compose the final {targetLang} translation to the sentence:{source} 
First, based on the defects information to locate the error span in the target segement, comprehend its nature, and rectify it.
Then, imagine yourself as a native {targetLang} speaker, ensuring that the rectified target segement is not only precise but also faithful to the source segment. 

Reply only the translation results with no explanation.`;

function formatString(str: string, args: { [key: string]: string }): string {
  return str.replace(/\{(\w+)\}/g, (match, key) => args[key]);
}

function buildExampleStrings(examples: [string, string][]): string | undefined {
  if (examples.length == 0) return undefined;
  const exampleStrings = examples
    .map(([source, target]) => `Source: ${source}\nTarget: ${target}`)
    .join("\n");
  return exampleStrings;
}

export function buildTranslatePrompt(request: TranslationRequest): string {
  const placeholders = <{ [key: string]: string }>{
    ...request,
    context: request.context ?? "",
    examples: buildExampleStrings(request.examples) ?? "",
  };
  return formatString(translatePromptTemplate, placeholders);
}

export function buildEstimatePrompt(
  request: TranslationRequest,
  translation: string,
): string {
  const placeholders = <{ [key: string]: string }>{
    sourceLang: request.sourceLang,
    targetLang: request.targetLang,
    source: request.text,
    translation: translation,
  };
  return formatString(estimatePromptTemplate, placeholders);
}

export function buildRefinePrompt(
  request: TranslationRequest,
  rawTranslation: string,
  mqmAnnotations: string,
) {
  const placeholders = <{ [key: string]: string }>{
    sourceLang: request.sourceLang,
    targetLang: request.targetLang,
    source: request.text,
    context: request.context ?? "",
    examples: buildExampleStrings(request.examples) ?? "",
    rawTranslation: rawTranslation,
    mqmAnnotations: mqmAnnotations,
  };
  return formatString(refinePromptTemplate, placeholders);
}

if (require.main === module) {
  let formatted = formatString("123{abc}{abc}", { abc: "456" });
  console.log(formatted);

  const request: TranslationRequest = {
    text: "Text to be translated",
    sourceLang: "English",
    targetLang: "Spanish",
    context: "Some context about the translation text",
    examples: [["Hello", "Hola"]],
  };
  formatted = buildTranslatePrompt(request);
  console.log("----- translate -----");
  console.log(formatted);

  formatted = buildEstimatePrompt(request, "Raw tranduccion");
  console.log("----- estimate -----");
  console.log(formatted);

  formatted = buildRefinePrompt(request, "Raw tranduccion", "No minor flaws");
  console.log("----- refine -----");
  console.log(formatted);
}
