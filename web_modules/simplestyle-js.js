import { c as createCommonjsModule, u as unwrapExports, a as commonjsGlobal } from './common/commonjshelpers-6a48b99e.js';

var numToAlpha_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var alphas = 'abcdefghijklmnopqrstuvwxyz'.split('');
function numToAlpha(num) {
    return alphas[num];
}
exports.default = numToAlpha;
});

unwrapExports(numToAlpha_1);

var generateClassName_1 = createCommonjsModule(function (module, exports) {
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var numToAlpha_1$1 = __importDefault(numToAlpha_1);
var inc = Date.now();
var numPairsRegex = /(\d{1,2})/g;
function getUniqueSuffix(uid) {
    if (uid === void 0) { uid = null; }
    var numPairs = [];
    var incStr = inc.toString();
    var out = '_';
    if (uid !== null) {
        out += uid;
    }
    else {
        var result = numPairsRegex.exec(incStr);
        while (result) {
            numPairs.push(result[0]);
            result = numPairsRegex.exec(incStr);
        }
        numPairs.forEach(function (pair) {
            var val = +pair;
            if (val > 25) {
                var _a = pair.split(''), first = _a[0], second = _a[1];
                out += "" + numToAlpha_1$1.default(+first) + numToAlpha_1$1.default(+second);
            }
            else
                out += numToAlpha_1$1.default(val);
        });
        inc += 1;
    }
    return out;
}
exports.getUniqueSuffix = getUniqueSuffix;
function generateClassName(c) {
    return "" + c[0] + getUniqueSuffix(c[1]);
}
exports.default = generateClassName;
});

unwrapExports(generateClassName_1);
var generateClassName_2 = generateClassName_1.getUniqueSuffix;

var plugins = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var posthooks = [];
function getPosthooks() {
    return posthooks;
}
exports.getPosthooks = getPosthooks;
function registerPosthook(posthook) {
    posthooks.push(posthook);
}
exports.registerPosthook = registerPosthook;
});

unwrapExports(plugins);
var plugins_1 = plugins.getPosthooks;
var plugins_2 = plugins.registerPosthook;

var createStyles_1 = createCommonjsModule(function (module, exports) {
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var generateClassName_1$1 = __importDefault(generateClassName_1);

var accumulatedSheetContents = null;
function isNestedSelector(r) {
    return /&/g.test(r);
}
function isMedia(r) {
    return r.toLowerCase().startsWith('@media');
}
function formatCSSRuleName(rule) {
    return rule.replace(/([A-Z])/g, function (p1) { return "-" + p1.toLowerCase(); });
}
function formatCSSRules(cssRules) {
    return Object.entries(cssRules).reduce(function (prev, _a) {
        var cssProp = _a[0], cssVal = _a[1];
        return "" + prev + formatCSSRuleName(cssProp) + ":" + cssVal + ";";
    }, '');
}
function execCreateStyles(rules, options, parentSelector, noGenerateClassName, uid) {
    if (noGenerateClassName === void 0) { noGenerateClassName = false; }
    if (uid === void 0) { uid = null; }
    var out = {};
    var sheetBuffer = '';
    var mediaQueriesbuffer = '';
    var styleEntries = Object.entries(rules);
    var ruleWriteOpen = false;
    var guardCloseRuleWrite = function () {
        if (ruleWriteOpen)
            sheetBuffer += '}';
        ruleWriteOpen = false;
    };
    var _loop_1 = function (classNameOrCSSRule, classNameRules) {
        var _a, _b;
        // if the classNameRules is a string, we are dealing with a display: none; type rule
        if (isMedia(classNameOrCSSRule)) {
            if (typeof classNameRules !== 'object')
                throw new Error('Unable to map @media query because rules / props are an invalid type');
            guardCloseRuleWrite();
            mediaQueriesbuffer += classNameOrCSSRule + "{";
            var _c = execCreateStyles(classNameRules, options, parentSelector, null, uid), regularOutput = _c[1], mediaQueriesOutput = _c[2];
            mediaQueriesbuffer += regularOutput;
            mediaQueriesbuffer += '}';
            mediaQueriesbuffer += mediaQueriesOutput;
        }
        else if (isNestedSelector(classNameOrCSSRule)) {
            if (!parentSelector)
                throw new Error('Unable to generate nested rule because parentSelector is missing');
            guardCloseRuleWrite();
            // format of { '& > span': { display: 'none' } } (or further nesting)
            var replaced = classNameOrCSSRule.replace(/&/g, parentSelector);
            replaced.split(/,\s*/).forEach(function (selector) {
                var _a = execCreateStyles(classNameRules, options, selector, null, uid), regularOutput = _a[1], mediaQueriesOutput = _a[2];
                sheetBuffer += regularOutput;
                mediaQueriesbuffer += mediaQueriesOutput;
            });
        }
        else if (!parentSelector && typeof classNameRules === 'object') {
            guardCloseRuleWrite();
            var generated = generateClassName_1$1.default([classNameOrCSSRule, uid]);
            if (noGenerateClassName) {
                generated = classNameOrCSSRule;
            }
            out[classNameOrCSSRule] = generated;
            var generatedSelector = "" + (noGenerateClassName ? '' : '.') + generated;
            var _d = execCreateStyles(classNameRules, options, generatedSelector, null, uid), regularOutput = _d[1], mediaQueriesOutput = _d[2];
            sheetBuffer += regularOutput;
            mediaQueriesbuffer += mediaQueriesOutput;
        }
        else {
            if (!parentSelector)
                throw new Error('Unable to write css props because parent selector is null');
            if (!ruleWriteOpen) {
                sheetBuffer += parentSelector + "{" + formatCSSRules((_a = {}, _a[classNameOrCSSRule] = classNameRules, _a));
                ruleWriteOpen = true;
            }
            else
                sheetBuffer += formatCSSRules((_b = {}, _b[classNameOrCSSRule] = classNameRules, _b));
        }
    };
    for (var _i = 0, styleEntries_1 = styleEntries; _i < styleEntries_1.length; _i++) {
        var _a = styleEntries_1[_i], classNameOrCSSRule = _a[0], classNameRules = _a[1];
        _loop_1(classNameOrCSSRule, classNameRules);
    }
    guardCloseRuleWrite();
    return [out, sheetBuffer, mediaQueriesbuffer];
}
function replaceBackReferences(out, sheetContents) {
    var outputSheetContents = sheetContents;
    var toReplace = [];
    var toReplaceRegex = /\$\w([a-zA-Z0-9_-]+)?/gm;
    var matches = toReplaceRegex.exec(outputSheetContents);
    while (matches) {
        toReplace.push(matches[0].valueOf());
        matches = toReplaceRegex.exec(outputSheetContents);
    }
    for (var _i = 0, toReplace_1 = toReplace; _i < toReplace_1.length; _i++) {
        var r = toReplace_1[_i];
        outputSheetContents = outputSheetContents.replace(r, "." + out[r.substring(1)]);
    }
    return plugins.getPosthooks().reduce(function (prev, hook) { return hook(prev); }, outputSheetContents);
}
function flushSheetContents(sheetContents) {
    // In case we're in come weird test environment that doesn't support JSDom
    if (typeof document !== 'undefined' && document.head && document.head.appendChild) {
        var styleTag = document.createElement('style');
        styleTag.innerHTML = sheetContents;
        document.head.appendChild(styleTag);
    }
}
function coerceCreateStylesOptions(options) {
    return {
        accumulate: (options === null || options === void 0 ? void 0 : options.accumulate) || false,
        flush: options && typeof options.flush === 'boolean' ? options.flush : true,
    };
}
var accumulatedTimeout;
function accumulateSheetContents(sheetContents, options) {
    if (!accumulatedSheetContents)
        accumulatedSheetContents = [];
    accumulatedSheetContents.push(sheetContents);
    if (accumulatedTimeout)
        accumulatedTimeout = clearTimeout(accumulatedTimeout);
    accumulatedTimeout = setTimeout(function () {
        flushSheetContents(accumulatedSheetContents.reduce(function (prev, contents) { return "" + prev + contents; }, ''));
        accumulatedSheetContents = null;
    }, 0);
}
function rawStyles(rules, options, uid) {
    if (options === void 0) { options = null; }
    if (uid === void 0) { uid = null; }
    var coerced = coerceCreateStylesOptions(options);
    var _a = execCreateStyles(rules, coerced, null, true, uid), sheetContents = _a[1], mediaQueriesContents = _a[2];
    var mergedContents = "" + sheetContents + mediaQueriesContents;
    if (coerced.accumulate)
        accumulateSheetContents(mergedContents);
    else if (coerced.flush)
        flushSheetContents(mergedContents);
    return mergedContents;
}
exports.rawStyles = rawStyles;
function keyframes(frames, options, uid) {
    if (options === void 0) { options = null; }
    if (uid === void 0) { uid = null; }
    var coerced = coerceCreateStylesOptions(options);
    var keyframeName = generateClassName_1$1.default(['keyframes_']);
    var _a = execCreateStyles(frames, coerced, null, true, uid), keyframesContents = _a[1];
    // const keyframesContents = generateSheetContents(out, toRender);
    var sheetContents = "@keyframes " + keyframeName + "{" + keyframesContents + "}";
    if (coerced.accumulate)
        accumulateSheetContents(sheetContents);
    if (coerced.flush)
        flushSheetContents(sheetContents);
    return [keyframeName, sheetContents];
}
exports.keyframes = keyframes;
function createStyles(rules, options, uid) {
    if (options === void 0) { options = null; }
    if (uid === void 0) { uid = null; }
    var coerced = coerceCreateStylesOptions(options);
    var _a = execCreateStyles(rules, coerced, null, null, uid), out = _a[0], sheetContents = _a[1], mediaQueriesContents = _a[2];
    var mergedContents = "" + sheetContents + mediaQueriesContents;
    var replacedSheetContents = replaceBackReferences(out, mergedContents);
    if (coerced.accumulate)
        accumulateSheetContents(replacedSheetContents);
    else if (coerced.flush)
        flushSheetContents(replacedSheetContents);
    return [out, replacedSheetContents];
}
exports.default = createStyles;
});

unwrapExports(createStyles_1);
var createStyles_2 = createStyles_1.rawStyles;
var createStyles_3 = createStyles_1.keyframes;

var dist = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

exports.createStyles = createStyles_1.default;
exports.keyframes = createStyles_1.keyframes;
exports.rawStyles = createStyles_1.rawStyles;

exports.registerPosthook = plugins.registerPosthook;
});

var index = unwrapExports(dist);
var dist_1 = dist.createStyles;
var dist_2 = dist.keyframes;
var dist_3 = dist.rawStyles;
var dist_4 = dist.registerPosthook;

export default index;
export { dist_1 as createStyles, dist_2 as keyframes, dist_3 as rawStyles, dist_4 as registerPosthook };
