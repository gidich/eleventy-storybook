import rendered from "./_site/index.html?raw";
import b2c from "./_site/index-b2c/index.html?raw";
import { withRunScript } from "storybook-addon-run-script/html";
import * as cheerio from "cheerio";

const getLocalScripts = async () => {
  // parse html document string into a dom object in order to get script tags
  const $ = cheerio.load(rendered);
  // get all script tags from dom object
  const scriptTags = $("script");
  // for each of the scripts, determine which are referenced locally, add them to an array and remove them from the dom

  const localScripts: cheerio.Element[] = [];
  scriptTags.each((index, element) => {
    const src = $(element).attr("src");
    if (src && src.startsWith("./")) {
      localScripts.push(element);
      $(element).remove();
    }
  });

  const localScriptPromises = localScripts.map(async (script) => {
    const path = script.attribs.src
      .replace(".js", "")
      .replace("./scripts/", "");
    console.log(`./scripts/${path}.js`);
    const scriptString = await import(`./scripts/${path}.js?raw`);
    return scriptString;
  });

  const results = await Promise.all(localScriptPromises);
  return results
    .map((result) => {
      console.log(result.default);
      return result.default;
    })
    .join("\n");
};


const runScript = `
var app = document.getElementById('app');
app.innerHTML = decodeURI('${encodeURI(b2c)}');
console.log("app", app);
`;

console.log(runScript);

export default {
  title: "Index",
  decorators: [
    (Story, context) =>
      withRunScript(runScript + "\n" + context.loaded.scripts)(Story),
  ],
  loaders: [
    async () => ({
      scripts: await getLocalScripts(),
    }),
  ],
};

const Template = () => rendered;

export const Index = Template.bind({});