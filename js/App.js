// @flow
import { h, render } from "../web_modules/preact.js";
import htm from "../web_modules/htm.js";
import { createStyles } from "../web_modules/simplestyle-js.js";
import Router from "../web_modules/preact-router.js";
import { createHashHistory } from "../web_modules/history.js";
import { createBrowserHistory } from "../web_modules/history.js";
import Lines1 from "./Lines1.js";
import Lines2 from "./Lines2.js";
import Lines3 from "./Lines3.js";

// Flow
/*::
import typeof { createHashHistory as CreateHashHistoryType } from '../web_modules/history.js';
import typeof { createBrowserHistory as CreateBrowserHistoryType } from '../web_modules/history.js';
import typeof { createStyles as CreateStylesType } from "../web_modules/simplestyle-js.js";
import typeof RouterType from "../web_modules/preact-router.js";
import typeof HtmType from "../web_modules/htm.js";
import typeof Lines1Type from "./Lines1.js";
import typeof Lines2Type from "./Lines2.js";
import typeof {
  h as HType,
  render as RenderType,
} from "../web_modules/preact.js";
*/

const html /*: HtmType */ = htm.bind(h);

/*::
type Props = {
  url?: string
};
*/
const App /*: function */ = (props /*: Props */) /*: HtmType */ => {
  return html`
    <${Router} url="${props.url}">
      <${Lines1} path="/" />
      <${Lines1} path="/lines1" />
      <${Lines2} path="/lines2" />
      <${Lines3} path="/lines3" />
    </${Router}>
  `;
};

export default App;
