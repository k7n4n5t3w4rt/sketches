// @flow
import { h } from "../web_modules/preact.js";
import htm from "../web_modules/htm.js";
import Router from "../web_modules/preact-router.js";
import { AppProvider } from "./AppContext.js";
import Lines1 from "./Lines1.js";
import Lines2 from "./Lines2.js";
import Moon from "./Moon.js";
import Map from "./Map.js";
import Coal from "./Coal.js";
const html = htm.bind(h);

/*::
type Props = {
};
*/
const App /*: function */ = (props /*: Props */) => {
  return html`
    	<${AppProvider} >
    		<${Router} >
				<${Coal} path="/" />
				<${Lines1} path="/lines1" />
				<${Lines2} path="/lines2" />
				<${Moon} path="/moon" />
				<${Map} path="/map" />
				<${Coal} path="/coal" />
    		</${Router}>
    	</${AppProvider} >
  `;
};

export default App;
