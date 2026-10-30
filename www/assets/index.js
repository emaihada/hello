(function(){
if(typeof window!=="undefined"){window.__ONGEUL_BOOTED__=true;}
// \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod, mod.exports), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
// \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
// node_modules/react/cjs/react.production.js
/**
* @license React
* react.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
	var REACT_PORTAL_TYPE = Symbol.for("react.portal");
	var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
	var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
	var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
	var REACT_CONTEXT_TYPE = Symbol.for("react.context");
	var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
	var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
	var REACT_MEMO_TYPE = Symbol.for("react.memo");
	var REACT_LAZY_TYPE = Symbol.for("react.lazy");
	var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
	var REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition");
	var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	function getIteratorFn(maybeIterable) {
		if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
		maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
		return "function" === typeof maybeIterable ? maybeIterable : null;
	}
	var ReactNoopUpdateQueue = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	};
	var assign = Object.assign;
	var emptyObject = {};
	function Component(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	Component.prototype.isReactComponent = {};
	Component.prototype.setState = function(partialState, callback) {
		if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, partialState, callback, "setState");
	};
	Component.prototype.forceUpdate = function(callback) {
		this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
	};
	function ComponentDummy() {}
	ComponentDummy.prototype = Component.prototype;
	function PureComponent(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
	pureComponentPrototype.constructor = PureComponent;
	assign(pureComponentPrototype, Component.prototype);
	pureComponentPrototype.isPureReactComponent = !0;
	var isArrayImpl = Array.isArray;
	function noop() {}
	var ReactSharedInternals = {
		H: null,
		A: null,
		T: null,
		S: null
	};
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function ReactElement(type, key, props) {
		var refProp = props.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== refProp ? refProp : null,
			props
		};
	}
	function cloneAndReplaceKey(oldElement, newKey) {
		return ReactElement(oldElement.type, newKey, oldElement.props);
	}
	function isValidElement(object) {
		return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function escape(key) {
		var escaperLookup = {
			"=": "=0",
			":": "=2"
		};
		return "$" + key.replace(/[=:]/g, function(match) {
			return escaperLookup[match];
		});
	}
	var userProvidedKeyEscapeRegex = /\/+/g;
	function getElementKey(element, index) {
		return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
	}
	function resolveThenable(thenable) {
		switch (thenable.status) {
			case "fulfilled": return thenable.value;
			case "rejected": throw thenable.reason;
			default: switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
				"pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
			}, function(error) {
				"pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
			})), thenable.status) {
				case "fulfilled": return thenable.value;
				case "rejected": throw thenable.reason;
			}
		}
		throw thenable;
	}
	function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
		var type = typeof children;
		if ("undefined" === type || "boolean" === type) children = null;
		var invokeCallback = !1;
		if (null === children) invokeCallback = !0;
		else switch (type) {
			case "bigint":
			case "string":
			case "number":
				invokeCallback = !0;
				break;
			case "object": switch (children.$$typeof) {
				case REACT_ELEMENT_TYPE:
				case REACT_PORTAL_TYPE:
					invokeCallback = !0;
					break;
				case REACT_LAZY_TYPE: return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
			}
		}
		if (invokeCallback) return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
			return c;
		})) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + invokeCallback)), array.push(callback)), 1;
		invokeCallback = 0;
		var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
		if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if (i = getIteratorFn(children), "function" === typeof i) for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if ("object" === type) {
			if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
			array = String(children);
			throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
		}
		return invokeCallback;
	}
	function mapChildren(children, func, context) {
		if (null == children) return children;
		var result = [], count = 0;
		mapIntoArray(children, result, "", "", function(child) {
			return func.call(context, child, count++);
		});
		return result;
	}
	function lazyInitializer(payload) {
		if (-1 === payload._status) {
			var ctor = payload._result, thenable = ctor();
			thenable.then(function(moduleObject) {
				if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject, void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
			}, function(error) {
				if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error, void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
			});
			-1 === payload._status && (payload._status = 0, payload._result = thenable);
		}
		if (1 === payload._status) return payload._result.default;
		throw payload._result;
	}
	var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
		if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
			var event = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
				error
			});
			if (!window.dispatchEvent(event)) return;
		} else if ("object" === typeof process && "function" === typeof process.emit) {
			process.emit("uncaughtException", error);
			return;
		}
		console.error(error);
	};
	function startTransition(scope) {
		var prevTransition = ReactSharedInternals.T, currentTransition = {};
		currentTransition.types = null !== prevTransition ? prevTransition.types : null;
		ReactSharedInternals.T = currentTransition;
		try {
			var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
			null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
			"object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
		} catch (error) {
			reportGlobalError(error);
		} finally {
			null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
		}
	}
	function addTransitionType(type) {
		var transition = ReactSharedInternals.T;
		if (null !== transition) {
			var transitionTypes = transition.types;
			null === transitionTypes ? transition.types = [type] : -1 === transitionTypes.indexOf(type) && transitionTypes.push(type);
		} else startTransition(addTransitionType.bind(null, type));
	}
	var Children = {
		map: mapChildren,
		forEach: function(children, forEachFunc, forEachContext) {
			mapChildren(children, function() {
				forEachFunc.apply(this, arguments);
			}, forEachContext);
		},
		count: function(children) {
			var n = 0;
			mapChildren(children, function() {
				n++;
			});
			return n;
		},
		toArray: function(children) {
			return mapChildren(children, function(child) {
				return child;
			}) || [];
		},
		only: function(children) {
			if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
			return children;
		}
	};
	exports.Activity = REACT_ACTIVITY_TYPE;
	exports.Children = Children;
	exports.Component = Component;
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.Profiler = REACT_PROFILER_TYPE;
	exports.PureComponent = PureComponent;
	exports.StrictMode = REACT_STRICT_MODE_TYPE;
	exports.Suspense = REACT_SUSPENSE_TYPE;
	exports.ViewTransition = REACT_VIEW_TRANSITION_TYPE;
	exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
	exports.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(size) {
			return ReactSharedInternals.H.useMemoCache(size);
		}
	};
	exports.addTransitionType = addTransitionType;
	exports.cache = function(fn) {
		return function() {
			return fn.apply(null, arguments);
		};
	};
	exports.cacheSignal = function() {
		return null;
	};
	exports.cloneElement = function(element, config, children) {
		if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
		var props = assign({}, element.props), key = element.key;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
		var propName = arguments.length - 2;
		if (1 === propName) props.children = children;
		else if (1 < propName) {
			for (var childArray = Array(propName), i = 0; i < propName; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		return ReactElement(element.type, key, props);
	};
	exports.createContext = function(defaultValue) {
		defaultValue = {
			$$typeof: REACT_CONTEXT_TYPE,
			_currentValue: defaultValue,
			_currentValue2: defaultValue,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		};
		defaultValue.Provider = defaultValue;
		defaultValue.Consumer = {
			$$typeof: REACT_CONSUMER_TYPE,
			_context: defaultValue
		};
		return defaultValue;
	};
	exports.createElement = function(type, config, children) {
		var propName, props = {}, key = null;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
		var childrenLength = arguments.length - 2;
		if (1 === childrenLength) props.children = children;
		else if (1 < childrenLength) {
			for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === props[propName] && (props[propName] = childrenLength[propName]);
		return ReactElement(type, key, props);
	};
	exports.createRef = function() {
		return { current: null };
	};
	exports.forwardRef = function(render) {
		return {
			$$typeof: REACT_FORWARD_REF_TYPE,
			render
		};
	};
	exports.isValidElement = isValidElement;
	exports.lazy = function(ctor) {
		return {
			$$typeof: REACT_LAZY_TYPE,
			_payload: {
				_status: -1,
				_result: ctor
			},
			_init: lazyInitializer
		};
	};
	exports.memo = function(type, compare) {
		return {
			$$typeof: REACT_MEMO_TYPE,
			type,
			compare: void 0 === compare ? null : compare
		};
	};
	exports.startTransition = startTransition;
	exports.unstable_useCacheRefresh = function() {
		return ReactSharedInternals.H.useCacheRefresh();
	};
	exports.use = function(usable) {
		return ReactSharedInternals.H.use(usable);
	};
	exports.useActionState = function(action, initialState, permalink) {
		return ReactSharedInternals.H.useActionState(action, initialState, permalink);
	};
	exports.useCallback = function(callback, deps) {
		return ReactSharedInternals.H.useCallback(callback, deps);
	};
	exports.useContext = function(Context) {
		return ReactSharedInternals.H.useContext(Context);
	};
	exports.useDebugValue = function() {};
	exports.useDeferredValue = function(value, initialValue) {
		return ReactSharedInternals.H.useDeferredValue(value, initialValue);
	};
	exports.useEffect = function(create, deps) {
		return ReactSharedInternals.H.useEffect(create, deps);
	};
	exports.useEffectEvent = function(callback) {
		return ReactSharedInternals.H.useEffectEvent(callback);
	};
	exports.useId = function() {
		return ReactSharedInternals.H.useId();
	};
	exports.useImperativeHandle = function(ref, create, deps) {
		return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
	};
	exports.useInsertionEffect = function(create, deps) {
		return ReactSharedInternals.H.useInsertionEffect(create, deps);
	};
	exports.useLayoutEffect = function(create, deps) {
		return ReactSharedInternals.H.useLayoutEffect(create, deps);
	};
	exports.useMemo = function(create, deps) {
		return ReactSharedInternals.H.useMemo(create, deps);
	};
	exports.useOptimistic = function(passthrough, reducer) {
		return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
	};
	exports.useReducer = function(reducer, initialArg, init) {
		return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
	};
	exports.useRef = function(initialValue) {
		return ReactSharedInternals.H.useRef(initialValue);
	};
	exports.useState = function(initialState) {
		return ReactSharedInternals.H.useState(initialState);
	};
	exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
		return ReactSharedInternals.H.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	};
	exports.useTransition = function() {
		return ReactSharedInternals.H.useTransition();
	};
	exports.version = "19.3.1";
}));
// node_modules/react/index.js
var require_react = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_production();
}));
// node_modules/scheduler/cjs/scheduler.production.js
/**
* @license React
* scheduler.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_scheduler_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	function push(heap, node) {
		var index = heap.length;
		heap.push(node);
		a: for (; 0 < index;) {
			var parentIndex = index - 1 >>> 1, parent = heap[parentIndex];
			if (0 < compare(parent, node)) heap[parentIndex] = node, heap[index] = parent, index = parentIndex;
			else break a;
		}
	}
	function peek(heap) {
		return 0 === heap.length ? null : heap[0];
	}
	function pop(heap) {
		if (0 === heap.length) return null;
		var first = heap[0], last = heap.pop();
		if (last !== first) {
			heap[0] = last;
			a: for (var index = 0, length = heap.length, halfLength = length >>> 1; index < halfLength;) {
				var leftIndex = 2 * (index + 1) - 1, left = heap[leftIndex], rightIndex = leftIndex + 1, right = heap[rightIndex];
				if (0 > compare(left, last)) rightIndex < length && 0 > compare(right, left) ? (heap[index] = right, heap[rightIndex] = last, index = rightIndex) : (heap[index] = left, heap[leftIndex] = last, index = leftIndex);
				else if (rightIndex < length && 0 > compare(right, last)) heap[index] = right, heap[rightIndex] = last, index = rightIndex;
				else break a;
			}
		}
		return first;
	}
	function compare(a, b) {
		var diff = a.sortIndex - b.sortIndex;
		return 0 !== diff ? diff : a.id - b.id;
	}
	exports.unstable_now = void 0;
	if ("object" === typeof performance && "function" === typeof performance.now) {
		var localPerformance = performance;
		exports.unstable_now = function() {
			return localPerformance.now();
		};
	} else {
		var localDate = Date, initialTime = localDate.now();
		exports.unstable_now = function() {
			return localDate.now() - initialTime;
		};
	}
	var taskQueue = [];
	var timerQueue = [];
	var taskIdCounter = 1;
	var currentTask = null;
	var currentPriorityLevel = 3;
	var isPerformingWork = !1;
	var isHostCallbackScheduled = !1;
	var isHostTimeoutScheduled = !1;
	var needsPaint = !1;
	var localSetTimeout = "function" === typeof setTimeout ? setTimeout : null;
	var localClearTimeout = "function" === typeof clearTimeout ? clearTimeout : null;
	var localSetImmediate = "undefined" !== typeof setImmediate ? setImmediate : null;
	function advanceTimers(currentTime) {
		for (var timer = peek(timerQueue); null !== timer;) {
			if (null === timer.callback) pop(timerQueue);
			else if (timer.startTime <= currentTime) pop(timerQueue), timer.sortIndex = timer.expirationTime, push(taskQueue, timer);
			else break;
			timer = peek(timerQueue);
		}
	}
	function handleTimeout(currentTime) {
		isHostTimeoutScheduled = !1;
		advanceTimers(currentTime);
		if (!isHostCallbackScheduled) if (null !== peek(taskQueue)) isHostCallbackScheduled = !0, isMessageLoopRunning || (isMessageLoopRunning = !0, schedulePerformWorkUntilDeadline());
		else {
			var firstTimer = peek(timerQueue);
			null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
		}
	}
	var isMessageLoopRunning = !1;
	var taskTimeoutID = -1;
	var frameInterval = 5;
	var startTime = -1;
	function shouldYieldToHost() {
		return needsPaint ? !0 : exports.unstable_now() - startTime < frameInterval ? !1 : !0;
	}
	function performWorkUntilDeadline() {
		needsPaint = !1;
		if (isMessageLoopRunning) {
			var currentTime = exports.unstable_now();
			startTime = currentTime;
			var hasMoreWork = !0;
			try {
				a: {
					isHostCallbackScheduled = !1;
					isHostTimeoutScheduled && (isHostTimeoutScheduled = !1, localClearTimeout(taskTimeoutID), taskTimeoutID = -1);
					isPerformingWork = !0;
					var previousPriorityLevel = currentPriorityLevel;
					try {
						b: {
							advanceTimers(currentTime);
							for (currentTask = peek(taskQueue); null !== currentTask && !(currentTask.expirationTime > currentTime && shouldYieldToHost());) {
								var callback = currentTask.callback;
								if ("function" === typeof callback) {
									currentTask.callback = null;
									currentPriorityLevel = currentTask.priorityLevel;
									var continuationCallback = callback(currentTask.expirationTime <= currentTime);
									currentTime = exports.unstable_now();
									if ("function" === typeof continuationCallback) {
										currentTask.callback = continuationCallback;
										advanceTimers(currentTime);
										hasMoreWork = !0;
										break b;
									}
									currentTask === peek(taskQueue) && pop(taskQueue);
									advanceTimers(currentTime);
								} else pop(taskQueue);
								currentTask = peek(taskQueue);
							}
							if (null !== currentTask) hasMoreWork = !0;
							else {
								var firstTimer = peek(timerQueue);
								null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
								hasMoreWork = !1;
							}
						}
						break a;
					} finally {
						currentTask = null, currentPriorityLevel = previousPriorityLevel, isPerformingWork = !1;
					}
					hasMoreWork = void 0;
				}
			} finally {
				hasMoreWork ? schedulePerformWorkUntilDeadline() : isMessageLoopRunning = !1;
			}
		}
	}
	var schedulePerformWorkUntilDeadline;
	if ("function" === typeof localSetImmediate) schedulePerformWorkUntilDeadline = function() {
		localSetImmediate(performWorkUntilDeadline);
	};
	else if ("undefined" !== typeof MessageChannel) {
		var channel = new MessageChannel(), port = channel.port2;
		channel.port1.onmessage = performWorkUntilDeadline;
		schedulePerformWorkUntilDeadline = function() {
			port.postMessage(null);
		};
	} else schedulePerformWorkUntilDeadline = function() {
		localSetTimeout(performWorkUntilDeadline, 0);
	};
	function requestHostTimeout(callback, ms) {
		taskTimeoutID = localSetTimeout(function() {
			callback(exports.unstable_now());
		}, ms);
	}
	exports.unstable_IdlePriority = 5;
	exports.unstable_ImmediatePriority = 1;
	exports.unstable_LowPriority = 4;
	exports.unstable_NormalPriority = 3;
	exports.unstable_Profiling = null;
	exports.unstable_UserBlockingPriority = 2;
	exports.unstable_cancelCallback = function(task) {
		task.callback = null;
	};
	exports.unstable_forceFrameRate = function(fps) {
		0 > fps || 125 < fps ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5;
	};
	exports.unstable_getCurrentPriorityLevel = function() {
		return currentPriorityLevel;
	};
	exports.unstable_next = function(eventHandler) {
		switch (currentPriorityLevel) {
			case 1:
			case 2:
			case 3:
				var priorityLevel = 3;
				break;
			default: priorityLevel = currentPriorityLevel;
		}
		var previousPriorityLevel = currentPriorityLevel;
		currentPriorityLevel = priorityLevel;
		try {
			return eventHandler();
		} finally {
			currentPriorityLevel = previousPriorityLevel;
		}
	};
	exports.unstable_requestPaint = function() {
		needsPaint = !0;
	};
	exports.unstable_runWithPriority = function(priorityLevel, eventHandler) {
		switch (priorityLevel) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: priorityLevel = 3;
		}
		var previousPriorityLevel = currentPriorityLevel;
		currentPriorityLevel = priorityLevel;
		try {
			return eventHandler();
		} finally {
			currentPriorityLevel = previousPriorityLevel;
		}
	};
	exports.unstable_scheduleCallback = function(priorityLevel, callback, options) {
		var currentTime = exports.unstable_now();
		"object" === typeof options && null !== options ? (options = options.delay, options = "number" === typeof options && 0 < options ? currentTime + options : currentTime) : options = currentTime;
		switch (priorityLevel) {
			case 1:
				var timeout = -1;
				break;
			case 2:
				timeout = 250;
				break;
			case 5:
				timeout = 1073741823;
				break;
			case 4:
				timeout = 1e4;
				break;
			default: timeout = 5e3;
		}
		timeout = options + timeout;
		priorityLevel = {
			id: taskIdCounter++,
			callback,
			priorityLevel,
			startTime: options,
			expirationTime: timeout,
			sortIndex: -1
		};
		options > currentTime ? (priorityLevel.sortIndex = options, push(timerQueue, priorityLevel), null === peek(taskQueue) && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? (localClearTimeout(taskTimeoutID), taskTimeoutID = -1) : isHostTimeoutScheduled = !0, requestHostTimeout(handleTimeout, options - currentTime))) : (priorityLevel.sortIndex = timeout, push(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = !0, isMessageLoopRunning || (isMessageLoopRunning = !0, schedulePerformWorkUntilDeadline())));
		return priorityLevel;
	};
	exports.unstable_shouldYield = shouldYieldToHost;
	exports.unstable_wrapCallback = function(callback) {
		var parentPriorityLevel = currentPriorityLevel;
		return function() {
			var previousPriorityLevel = currentPriorityLevel;
			currentPriorityLevel = parentPriorityLevel;
			try {
				return callback.apply(this, arguments);
			} finally {
				currentPriorityLevel = previousPriorityLevel;
			}
		};
	};
}));
// node_modules/scheduler/index.js
var require_scheduler = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_scheduler_production();
}));
// node_modules/react-dom/cjs/react-dom.production.js
/**
* @license React
* react-dom.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_dom_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react();
	function formatProdErrorMessage(code) {
		var url = "https://react.dev/errors/" + code;
		if (1 < arguments.length) {
			url += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var i = 2; i < arguments.length; i++) url += "&args[]=" + encodeURIComponent(arguments[i]);
		}
		return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function noop() {}
	var Internals = {
		d: {
			f: noop,
			r: function() {
				throw Error(formatProdErrorMessage(522));
			},
			D: noop,
			C: noop,
			L: noop,
			m: noop,
			X: noop,
			S: noop,
			M: noop
		},
		p: 0,
		findDOMNode: null
	};
	var REACT_PORTAL_TYPE = Symbol.for("react.portal");
	var REACT_RECOVERABLE_TYPE = Symbol.for("react.recoverable");
	var REACT_OPTIMISTIC_KEY = Symbol.for("react.optimistic_key");
	function createPortal$1(children, containerInfo, implementation) {
		var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
		return {
			$$typeof: REACT_PORTAL_TYPE,
			key: null == key ? null : key === REACT_OPTIMISTIC_KEY ? REACT_OPTIMISTIC_KEY : "" + key,
			children,
			containerInfo,
			implementation
		};
	}
	var ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function getCrossOriginStringAs(as, input) {
		if ("font" === as) return "";
		if ("string" === typeof input) return "use-credentials" === input ? input : "";
	}
	exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
	exports.browser = function(reason) {
		return {
			$$typeof: REACT_RECOVERABLE_TYPE,
			_reason: reason
		};
	};
	exports.createPortal = function(children, container) {
		var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
		if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType) throw Error(formatProdErrorMessage(299));
		return createPortal$1(children, container, null, key);
	};
	exports.flushSync = function(fn) {
		var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
		try {
			if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
		} finally {
			ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
		}
	};
	exports.preconnect = function(href, options) {
		"string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
	};
	exports.prefetchDNS = function(href) {
		"string" === typeof href && Internals.d.D(href);
	};
	exports.preinit = function(href, options) {
		if ("string" === typeof href && options && "string" === typeof options.as) {
			var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
			"style" === as ? Internals.d.S(href, "string" === typeof options.precedence ? options.precedence : void 0, {
				crossOrigin,
				integrity,
				fetchPriority
			}) : "script" === as && Internals.d.X(href, {
				crossOrigin,
				integrity,
				fetchPriority,
				nonce: "string" === typeof options.nonce ? options.nonce : void 0
			});
		}
	};
	exports.preinitModule = function(href, options) {
		if ("string" === typeof href) if ("object" === typeof options && null !== options) {
			if (null == options.as || "script" === options.as) {
				var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
				Internals.d.M(href, {
					crossOrigin,
					integrity: "string" === typeof options.integrity ? options.integrity : void 0,
					nonce: "string" === typeof options.nonce ? options.nonce : void 0,
					fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0
				});
			}
		} else options ?? Internals.d.M(href);
	};
	exports.preload = function(href, options) {
		if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
			var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
			Internals.d.L(href, as, {
				crossOrigin,
				integrity: "string" === typeof options.integrity ? options.integrity : void 0,
				nonce: "string" === typeof options.nonce ? options.nonce : void 0,
				type: "string" === typeof options.type ? options.type : void 0,
				fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
				referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
				imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
				imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
				media: "string" === typeof options.media ? options.media : void 0
			});
		}
	};
	exports.preloadModule = function(href, options) {
		if ("string" === typeof href) if (options) {
			var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
			Internals.d.m(href, {
				as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
				crossOrigin,
				integrity: "string" === typeof options.integrity ? options.integrity : void 0,
				nonce: "string" === typeof options.nonce ? options.nonce : void 0,
				fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0
			});
		} else Internals.d.m(href);
	};
	exports.requestFormReset = function(form) {
		Internals.d.r(form);
	};
	exports.unstable_batchedUpdates = function(fn, a) {
		return fn(a);
	};
	exports.useFormState = function(action, initialState, permalink) {
		return ReactSharedInternals.H.useFormState(action, initialState, permalink);
	};
	exports.useFormStatus = function() {
		return ReactSharedInternals.H.useHostTransitionStatus();
	};
	exports.version = "19.3.1";
}));
// node_modules/react-dom/index.js
var require_react_dom = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function checkDCE() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") return;
		try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
		} catch (err) {
			console.error(err);
		}
	}
	checkDCE();
	module.exports = require_react_dom_production();
}));
// node_modules/react-dom/cjs/react-dom-client.production.js
/**
* @license React
* react-dom-client.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_dom_client_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Scheduler = require_scheduler();
	var React = require_react();
	var ReactDOM = require_react_dom();
	function formatProdErrorMessage(code) {
		var url = "https://react.dev/errors/" + code;
		if (1 < arguments.length) {
			url += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var i = 2; i < arguments.length; i++) url += "&args[]=" + encodeURIComponent(arguments[i]);
		}
		return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function isValidContainer(node) {
		return !(!node || 1 !== node.nodeType && 9 !== node.nodeType && 11 !== node.nodeType);
	}
	function getNearestMountedFiber(fiber) {
		for (var node = fiber, nextNode = node; nextNode && !nextNode.alternate;) node = nextNode, 0 !== (node.flags & 4098) && (fiber = node.return), nextNode = node.return;
		for (; node.return;) node = node.return;
		return 3 === node.tag ? fiber : null;
	}
	function getSuspenseInstanceFromFiber(fiber) {
		if (13 === fiber.tag) {
			var suspenseState = fiber.memoizedState;
			null === suspenseState && (fiber = fiber.alternate, null !== fiber && (suspenseState = fiber.memoizedState));
			if (null !== suspenseState) return suspenseState.dehydrated;
		}
		return null;
	}
	function getActivityInstanceFromFiber(fiber) {
		if (31 === fiber.tag) {
			var activityState = fiber.memoizedState;
			null === activityState && (fiber = fiber.alternate, null !== fiber && (activityState = fiber.memoizedState));
			if (null !== activityState) return activityState.dehydrated;
		}
		return null;
	}
	function assertIsMounted(fiber) {
		if (getNearestMountedFiber(fiber) !== fiber) throw Error(formatProdErrorMessage(188));
	}
	function findCurrentFiberUsingSlowPath(fiber) {
		var alternate = fiber.alternate;
		if (!alternate) {
			alternate = getNearestMountedFiber(fiber);
			if (null === alternate) throw Error(formatProdErrorMessage(188));
			return alternate !== fiber ? null : fiber;
		}
		for (var a = fiber, b = alternate;;) {
			var parentA = a.return;
			if (null === parentA) break;
			var parentB = parentA.alternate;
			if (null === parentB) {
				b = parentA.return;
				if (null !== b) {
					a = b;
					continue;
				}
				break;
			}
			if (parentA.child === parentB.child) {
				for (parentB = parentA.child; parentB;) {
					if (parentB === a) return assertIsMounted(parentA), fiber;
					if (parentB === b) return assertIsMounted(parentA), alternate;
					parentB = parentB.sibling;
				}
				throw Error(formatProdErrorMessage(188));
			}
			if (a.return !== b.return) a = parentA, b = parentB;
			else {
				for (var didFindChild = !1, child$0 = parentA.child; child$0;) {
					if (child$0 === a) {
						didFindChild = !0;
						a = parentA;
						b = parentB;
						break;
					}
					if (child$0 === b) {
						didFindChild = !0;
						b = parentA;
						a = parentB;
						break;
					}
					child$0 = child$0.sibling;
				}
				if (!didFindChild) {
					for (child$0 = parentB.child; child$0;) {
						if (child$0 === a) {
							didFindChild = !0;
							a = parentB;
							b = parentA;
							break;
						}
						if (child$0 === b) {
							didFindChild = !0;
							b = parentB;
							a = parentA;
							break;
						}
						child$0 = child$0.sibling;
					}
					if (!didFindChild) throw Error(formatProdErrorMessage(189));
				}
			}
			if (a.alternate !== b) throw Error(formatProdErrorMessage(190));
		}
		if (3 !== a.tag) throw Error(formatProdErrorMessage(188));
		return a.stateNode.current === a ? fiber : alternate;
	}
	function findCurrentHostFiberImpl(node) {
		var tag = node.tag;
		if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return node;
		for (node = node.child; null !== node;) {
			tag = findCurrentHostFiberImpl(node);
			if (null !== tag) return tag;
			node = node.sibling;
		}
		return null;
	}
	function traverseVisibleInstancesAndTextInstances(child, searchWithinHosts, fn, a, b, c) {
		for (; null !== child;) {
			if ((5 === child.tag || 27 === child.tag || 6 === child.tag) && fn(child, a, b, c) || (22 !== child.tag || null === child.memoizedState) && (searchWithinHosts || 5 !== child.tag && 27 !== child.tag) && traverseVisibleInstancesAndTextInstances(child.child, searchWithinHosts, fn, a, b, c)) return !0;
			child = child.sibling;
		}
		return !1;
	}
	function getFragmentParentInstanceOrContainerFiber(fiber) {
		for (fiber = fiber.return; null !== fiber;) {
			if (3 === fiber.tag || 5 === fiber.tag || 27 === fiber.tag) return fiber;
			fiber = fiber.return;
		}
		return null;
	}
	function fiberIsPortaledIntoHost(fiber) {
		var foundPortalParent = !1;
		for (fiber = fiber.return; null !== fiber;) {
			4 === fiber.tag && (foundPortalParent = !0);
			if (3 === fiber.tag || 5 === fiber.tag || 27 === fiber.tag) break;
			fiber = fiber.return;
		}
		return foundPortalParent;
	}
	function getFragmentInstanceOrTextInstanceSiblings(fiber) {
		var result = [null, null], parentHostFiber = getFragmentParentInstanceOrContainerFiber(fiber);
		if (null === parentHostFiber) return result;
		findFragmentInstanceOrTextInstanceSiblings(result, fiber, parentHostFiber.child, { foundSelf: !1 });
		return result;
	}
	function findFragmentInstanceOrTextInstanceSiblings(result, self, child, state) {
		for (; null !== child;) {
			if (child === self) state.foundSelf = !0;
			else if (5 === child.tag || 27 === child.tag || 6 === child.tag) {
				if (state.foundSelf) return result[1] = child, !0;
				result[0] = child;
			} else if ((22 !== child.tag || null === child.memoizedState) && findFragmentInstanceOrTextInstanceSiblings(result, self, child.child, state)) return !0;
			child = child.sibling;
		}
		return !1;
	}
	function getInstanceFromHostFiber(fiber) {
		switch (fiber.tag) {
			case 5:
			case 27:
			case 6: return fiber.stateNode;
			case 3: return fiber.stateNode.containerInfo;
			default: throw Error(formatProdErrorMessage(559));
		}
	}
	var searchTarget = null;
	var searchBoundary = null;
	function isFiberPrecedingCheck(child, target, boundary) {
		return child === boundary ? !0 : child === target ? (searchTarget = child, !0) : !1;
	}
	function isFiberFollowingCheck(child, target, boundary) {
		return child === boundary ? (searchBoundary = child, !1) : child === target ? (null !== searchBoundary && (searchTarget = child), !0) : !1;
	}
	function getParentForFragmentAncestors(inst) {
		if (null === inst) return null;
		do
			inst = null === inst ? null : inst.return;
		while (inst && 5 !== inst.tag && 27 !== inst.tag && 3 !== inst.tag);
		return inst ? inst : null;
	}
	function getLowestCommonAncestor(instA, instB, getParent) {
		for (var depthA = 0, tempA = instA; tempA; tempA = getParent(tempA)) depthA++;
		tempA = 0;
		for (var tempB = instB; tempB; tempB = getParent(tempB)) tempA++;
		for (; 0 < depthA - tempA;) instA = getParent(instA), depthA--;
		for (; 0 < tempA - depthA;) instB = getParent(instB), tempA--;
		for (; depthA--;) {
			if (instA === instB || null !== instB && instA === instB.alternate) return instA;
			instA = getParent(instA);
			instB = getParent(instB);
		}
		return null;
	}
	var assign = Object.assign;
	var REACT_LEGACY_ELEMENT_TYPE = Symbol.for("react.element");
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
	var REACT_PORTAL_TYPE = Symbol.for("react.portal");
	var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
	var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
	var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
	var REACT_CONTEXT_TYPE = Symbol.for("react.context");
	var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
	var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
	var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
	var REACT_MEMO_TYPE = Symbol.for("react.memo");
	var REACT_LAZY_TYPE = Symbol.for("react.lazy");
	var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
	var REACT_LEGACY_HIDDEN_TYPE = Symbol.for("react.legacy_hidden");
	var REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel");
	var REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition");
	var REACT_RECOVERABLE_TYPE = Symbol.for("react.recoverable");
	var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	function getIteratorFn(maybeIterable) {
		if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
		maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
		return "function" === typeof maybeIterable ? maybeIterable : null;
	}
	var REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");
	function getComponentNameFromType(type) {
		if (null == type) return null;
		if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
		if ("string" === typeof type) return type;
		switch (type) {
			case REACT_FRAGMENT_TYPE: return "Fragment";
			case REACT_PROFILER_TYPE: return "Profiler";
			case REACT_STRICT_MODE_TYPE: return "StrictMode";
			case REACT_SUSPENSE_TYPE: return "Suspense";
			case REACT_SUSPENSE_LIST_TYPE: return "SuspenseList";
			case REACT_ACTIVITY_TYPE: return "Activity";
			case REACT_VIEW_TRANSITION_TYPE: return "ViewTransition";
		}
		if ("object" === typeof type) switch (type.$$typeof) {
			case REACT_PORTAL_TYPE: return "Portal";
			case REACT_CONTEXT_TYPE: return type.displayName || "Context";
			case REACT_CONSUMER_TYPE: return (type._context.displayName || "Context") + ".Consumer";
			case REACT_FORWARD_REF_TYPE:
				var innerType = type.render;
				type = type.displayName;
				type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
				return type;
			case REACT_MEMO_TYPE: return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
			case REACT_LAZY_TYPE:
				innerType = type._payload;
				type = type._init;
				try {
					return getComponentNameFromType(type(innerType));
				} catch (x) {}
		}
		return null;
	}
	var isArrayImpl = Array.isArray;
	var ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	var ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	var sharedNotPendingObject = {
		pending: !1,
		data: null,
		method: null,
		action: null
	};
	var valueStack = [];
	var index = -1;
	function createCursor(defaultValue) {
		return { current: defaultValue };
	}
	function pop(cursor) {
		0 > index || (cursor.current = valueStack[index], valueStack[index] = null, index--);
	}
	function push(cursor, value) {
		index++;
		valueStack[index] = cursor.current;
		cursor.current = value;
	}
	var contextStackCursor = createCursor(null);
	var contextFiberStackCursor = createCursor(null);
	var rootInstanceStackCursor = createCursor(null);
	var hostTransitionProviderCursor = createCursor(null);
	function pushHostContainer(fiber, nextRootInstance) {
		push(rootInstanceStackCursor, nextRootInstance);
		push(contextFiberStackCursor, fiber);
		push(contextStackCursor, null);
		switch (nextRootInstance.nodeType) {
			case 9:
			case 11:
				fiber = (fiber = nextRootInstance.documentElement) ? (fiber = fiber.namespaceURI) ? getOwnHostContext(fiber) : 0 : 0;
				break;
			default: if (fiber = nextRootInstance.tagName, nextRootInstance = nextRootInstance.namespaceURI) nextRootInstance = getOwnHostContext(nextRootInstance), fiber = getChildHostContextProd(nextRootInstance, fiber);
			else switch (fiber) {
				case "svg":
					fiber = 1;
					break;
				case "math":
					fiber = 2;
					break;
				default: fiber = 0;
			}
		}
		pop(contextStackCursor);
		push(contextStackCursor, fiber);
	}
	function popHostContainer() {
		pop(contextStackCursor);
		pop(contextFiberStackCursor);
		pop(rootInstanceStackCursor);
	}
	function pushHostContext(fiber) {
		var stateHook = fiber.memoizedState;
		null !== stateHook && (HostTransitionContext._currentValue = stateHook.memoizedState, push(hostTransitionProviderCursor, fiber));
		stateHook = contextStackCursor.current;
		var JSCompiler_inline_result = getChildHostContextProd(stateHook, fiber.type);
		stateHook !== JSCompiler_inline_result && (push(contextFiberStackCursor, fiber), push(contextStackCursor, JSCompiler_inline_result));
	}
	function popHostContext(fiber) {
		contextFiberStackCursor.current === fiber && (pop(contextStackCursor), pop(contextFiberStackCursor));
		hostTransitionProviderCursor.current === fiber && (pop(hostTransitionProviderCursor), HostTransitionContext._currentValue = sharedNotPendingObject);
	}
	var prefix;
	var suffix;
	function describeBuiltInComponentFrame(name) {
		if (void 0 === prefix) try {
			throw Error();
		} catch (x) {
			var match = x.stack.trim().match(/\n( *(at )?)/);
			prefix = match && match[1] || "";
			suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + prefix + name + suffix;
	}
	var reentry = !1;
	function describeNativeComponentFrame(fn, construct) {
		if (!fn || reentry) return "";
		reentry = !0;
		var previousPrepareStackTrace = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var RunInRootFrame = { DetermineComponentFrameRoot: function() {
				try {
					if (construct) {
						var Fake = function() {
							throw Error();
						};
						Object.defineProperty(Fake.prototype, "props", { set: function() {
							throw Error();
						} });
						if ("object" === typeof Reflect && Reflect.construct) {
							try {
								Reflect.construct(Fake, []);
							} catch (x) {
								var control = x;
							}
							Reflect.construct(fn, [], Fake);
						} else {
							try {
								Fake.call();
							} catch (x$1) {
								control = x$1;
							}
							Fake = !1;
							try {
								var prevProps = Object.getOwnPropertyDescriptor(fn.prototype, "props");
								Object.defineProperty(fn.prototype, "props", {
									configurable: !0,
									set: function() {
										throw Error();
									}
								});
								Fake = !0;
								new fn();
							} finally {
								Fake && (void 0 !== prevProps ? Object.defineProperty(fn.prototype, "props", prevProps) : delete fn.prototype.props);
							}
						}
					} else {
						try {
							throw Error();
						} catch (x$2) {
							control = x$2;
						}
						(Fake = fn()) && "function" === typeof Fake.catch && Fake.catch(function() {});
					}
				} catch (sample) {
					if (sample && control && "string" === typeof sample.stack) return [sample.stack, control.stack];
				}
				return [null, null];
			} };
			RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var namePropDescriptor = Object.getOwnPropertyDescriptor(RunInRootFrame.DetermineComponentFrameRoot, "name");
			namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(RunInRootFrame.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
			if (sampleStack && controlStack) {
				var sampleLines = sampleStack.split("\n"), controlLines = controlStack.split("\n");
				for (namePropDescriptor = RunInRootFrame = 0; RunInRootFrame < sampleLines.length && !sampleLines[RunInRootFrame].includes("DetermineComponentFrameRoot");) RunInRootFrame++;
				for (; namePropDescriptor < controlLines.length && !controlLines[namePropDescriptor].includes("DetermineComponentFrameRoot");) namePropDescriptor++;
				if (RunInRootFrame === sampleLines.length || namePropDescriptor === controlLines.length) for (RunInRootFrame = sampleLines.length - 1, namePropDescriptor = controlLines.length - 1; 1 <= RunInRootFrame && 0 <= namePropDescriptor && sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor];) namePropDescriptor--;
				for (; 1 <= RunInRootFrame && 0 <= namePropDescriptor; RunInRootFrame--, namePropDescriptor--) if (sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
					if (1 !== RunInRootFrame || 1 !== namePropDescriptor) do
						if (RunInRootFrame--, namePropDescriptor--, 0 > namePropDescriptor || sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
							var frame = "\n" + sampleLines[RunInRootFrame].replace(" at new ", " at ");
							fn.displayName && frame.includes("<anonymous>") && (frame = frame.replace("<anonymous>", fn.displayName));
							return frame;
						}
					while (1 <= RunInRootFrame && 0 <= namePropDescriptor);
					break;
				}
			}
		} finally {
			reentry = !1, Error.prepareStackTrace = previousPrepareStackTrace;
		}
		return (previousPrepareStackTrace = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(previousPrepareStackTrace) : "";
	}
	function describeFiber(fiber, childFiber) {
		switch (fiber.tag) {
			case 26:
			case 27:
			case 5: return describeBuiltInComponentFrame(fiber.type);
			case 16: return describeBuiltInComponentFrame("Lazy");
			case 13: return fiber.child !== childFiber && null !== childFiber ? describeBuiltInComponentFrame("Suspense Fallback") : describeBuiltInComponentFrame("Suspense");
			case 19: return describeBuiltInComponentFrame("SuspenseList");
			case 0:
			case 15: return describeNativeComponentFrame(fiber.type, !1);
			case 11: return describeNativeComponentFrame(fiber.type.render, !1);
			case 1: return describeNativeComponentFrame(fiber.type, !0);
			case 31: return describeBuiltInComponentFrame("Activity");
			case 30: return describeBuiltInComponentFrame("ViewTransition");
			default: return "";
		}
	}
	function getStackByFiberInDevAndProd(workInProgress) {
		try {
			var info = "", previous = null;
			do
				info += describeFiber(workInProgress, previous), previous = workInProgress, workInProgress = workInProgress.return;
			while (workInProgress);
			return info;
		} catch (x) {
			return "\nError generating stack: " + x.message + "\n" + x.stack;
		}
	}
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var scheduleCallback$3 = Scheduler.unstable_scheduleCallback;
	var cancelCallback$1 = Scheduler.unstable_cancelCallback;
	var shouldYield = Scheduler.unstable_shouldYield;
	var requestPaint = Scheduler.unstable_requestPaint;
	var now = Scheduler.unstable_now;
	var getCurrentPriorityLevel = Scheduler.unstable_getCurrentPriorityLevel;
	var ImmediatePriority = Scheduler.unstable_ImmediatePriority;
	var UserBlockingPriority = Scheduler.unstable_UserBlockingPriority;
	var NormalPriority$1 = Scheduler.unstable_NormalPriority;
	var LowPriority = Scheduler.unstable_LowPriority;
	var IdlePriority = Scheduler.unstable_IdlePriority;
	var log$1 = Scheduler.log;
	var unstable_setDisableYieldValue = Scheduler.unstable_setDisableYieldValue;
	var rendererID = null;
	var injectedHook = null;
	function setIsStrictModeForDevtools(newIsStrictMode) {
		"function" === typeof log$1 && unstable_setDisableYieldValue(newIsStrictMode);
		if (injectedHook && "function" === typeof injectedHook.setStrictMode) try {
			injectedHook.setStrictMode(rendererID, newIsStrictMode);
		} catch (err) {}
	}
	var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback;
	var log = Math.log;
	var LN2 = Math.LN2;
	function clz32Fallback(x) {
		x >>>= 0;
		return 0 === x ? 32 : 31 - (log(x) / LN2 | 0) | 0;
	}
	var nextTransitionUpdateLane = 256;
	var nextTransitionDeferredLane = 262144;
	var nextRetryLane = 4194304;
	function getHighestPriorityLanes(lanes) {
		var pendingSyncLanes = lanes & 42;
		if (0 !== pendingSyncLanes) return pendingSyncLanes;
		switch (lanes & -lanes) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return lanes & -lanes;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return lanes & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return lanes & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return lanes;
		}
	}
	function getNextLanes(root, wipLanes, rootHasPendingCommit) {
		var pendingLanes = root.pendingLanes;
		if (0 === pendingLanes) return 0;
		var nextLanes = 0, suspendedLanes = root.suspendedLanes, pingedLanes = root.pingedLanes;
		root = root.warmLanes;
		var nonIdlePendingLanes = pendingLanes & 134217727;
		0 !== nonIdlePendingLanes ? (pendingLanes = nonIdlePendingLanes & ~suspendedLanes, 0 !== pendingLanes ? nextLanes = getHighestPriorityLanes(pendingLanes) : (pingedLanes &= nonIdlePendingLanes, 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = nonIdlePendingLanes & ~root, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))))) : (nonIdlePendingLanes = pendingLanes & ~suspendedLanes, 0 !== nonIdlePendingLanes ? nextLanes = getHighestPriorityLanes(nonIdlePendingLanes) : 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = pendingLanes & ~root, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))));
		return 0 === nextLanes ? 0 : 0 !== wipLanes && wipLanes !== nextLanes && 0 === (wipLanes & suspendedLanes) && (suspendedLanes = nextLanes & -nextLanes, rootHasPendingCommit = wipLanes & -wipLanes, suspendedLanes >= rootHasPendingCommit || 32 === suspendedLanes && 0 !== (rootHasPendingCommit & 4194048)) ? wipLanes : nextLanes;
	}
	function checkIfRootIsPrerendering(root, renderLanes) {
		return 0 === (root.pendingLanes & ~(root.suspendedLanes & ~root.pingedLanes) & renderLanes);
	}
	function getEntangledLanes(root, renderLanes) {
		0 !== (renderLanes & 8) && (renderLanes |= renderLanes & 32);
		var allEntangledLanes = root.entangledLanes;
		if (0 !== allEntangledLanes) for (root = root.entanglements, allEntangledLanes &= renderLanes; 0 < allEntangledLanes;) {
			var index$4 = 31 - clz32(allEntangledLanes), lane = 1 << index$4;
			renderLanes |= root[index$4];
			allEntangledLanes &= ~lane;
		}
		return renderLanes;
	}
	function computeExpirationTime(lane, currentTime) {
		switch (lane) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return currentTime + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return currentTime + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function claimNextRetryLane() {
		var lane = nextRetryLane;
		nextRetryLane <<= 1;
		0 === (nextRetryLane & 62914560) && (nextRetryLane = 4194304);
		return lane;
	}
	function createLaneMap(initial) {
		for (var laneMap = [], i = 0; 31 > i; i++) laneMap.push(initial);
		return laneMap;
	}
	function markRootUpdated$1(root, updateLane) {
		root.pendingLanes |= updateLane;
		268435456 !== updateLane && (root.suspendedLanes = 0, root.pingedLanes = 0, root.warmLanes = 0);
	}
	function markRootFinished(root, finishedLanes, remainingLanes, spawnedLane, updatedLanes, suspendedRetryLanes) {
		var previouslyPendingLanes = root.pendingLanes;
		root.pendingLanes = remainingLanes;
		root.suspendedLanes = 0;
		root.pingedLanes = 0;
		root.warmLanes = 0;
		root.expiredLanes &= remainingLanes;
		root.entangledLanes &= remainingLanes;
		root.errorRecoveryDisabledLanes &= remainingLanes;
		root.shellSuspendCounter = 0;
		var entanglements = root.entanglements, expirationTimes = root.expirationTimes, hiddenUpdates = root.hiddenUpdates;
		for (remainingLanes = previouslyPendingLanes & ~remainingLanes; 0 < remainingLanes;) {
			var index$7 = 31 - clz32(remainingLanes), lane = 1 << index$7;
			entanglements[index$7] = 0;
			expirationTimes[index$7] = -1;
			var hiddenUpdatesForLane = hiddenUpdates[index$7];
			if (null !== hiddenUpdatesForLane) for (hiddenUpdates[index$7] = null, index$7 = 0; index$7 < hiddenUpdatesForLane.length; index$7++) {
				var update = hiddenUpdatesForLane[index$7];
				null !== update && (update.lane &= -536870913);
			}
			remainingLanes &= ~lane;
		}
		0 !== spawnedLane && markSpawnedDeferredLane(root, spawnedLane, 0);
		0 !== suspendedRetryLanes && 0 === updatedLanes && 0 !== root.tag && (root.suspendedLanes |= suspendedRetryLanes & ~(previouslyPendingLanes & ~finishedLanes));
	}
	function markSpawnedDeferredLane(root, spawnedLane, entangledLanes) {
		root.pendingLanes |= spawnedLane;
		root.suspendedLanes &= ~spawnedLane;
		var spawnedLaneIndex = 31 - clz32(spawnedLane);
		root.entangledLanes |= spawnedLane;
		root.entanglements[spawnedLaneIndex] = root.entanglements[spawnedLaneIndex] | 1073741824 | entangledLanes & 261930;
	}
	function markRootEntangled(root, entangledLanes) {
		var rootEntangledLanes = root.entangledLanes |= entangledLanes;
		for (root = root.entanglements; rootEntangledLanes;) {
			var index$8 = 31 - clz32(rootEntangledLanes), lane = 1 << index$8;
			lane & entangledLanes | root[index$8] & entangledLanes && (root[index$8] |= entangledLanes);
			rootEntangledLanes &= ~lane;
		}
	}
	function getBumpedLaneForHydration(root, renderLanes) {
		var renderLane = renderLanes & -renderLanes;
		renderLane = 0 !== (renderLane & 42) ? 1 : getBumpedLaneForHydrationByLane(renderLane);
		return 0 !== (renderLane & (root.suspendedLanes | renderLanes)) ? 0 : renderLane;
	}
	function getBumpedLaneForHydrationByLane(lane) {
		switch (lane) {
			case 2:
				lane = 1;
				break;
			case 8:
				lane = 4;
				break;
			case 32:
				lane = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				lane = 128;
				break;
			case 268435456:
				lane = 134217728;
				break;
			default: lane = 0;
		}
		return lane;
	}
	function lanesToEventPriority(lanes) {
		lanes &= -lanes;
		return 2 < lanes ? 8 < lanes ? 0 !== (lanes & 134217727) ? 32 : 268435456 : 8 : 2;
	}
	function resolveUpdatePriority() {
		var updatePriority = ReactDOMSharedInternals.p;
		if (0 !== updatePriority) return updatePriority;
		updatePriority = window.event;
		return void 0 === updatePriority ? 32 : getEventPriority(updatePriority.type);
	}
	function runWithPriority(priority, fn) {
		var previousPriority = ReactDOMSharedInternals.p;
		try {
			return ReactDOMSharedInternals.p = priority, fn();
		} finally {
			ReactDOMSharedInternals.p = previousPriority;
		}
	}
	var randomKey = Math.random().toString(36).slice(2);
	var internalInstanceKey = "__reactFiber$" + randomKey;
	var internalPropsKey = "__reactProps$" + randomKey;
	var internalContainerInstanceKey = "__reactContainer$" + randomKey;
	var internalEventHandlersKey = "__reactEvents$" + randomKey;
	var internalEventHandlerListenersKey = "__reactListeners$" + randomKey;
	var internalEventHandlesSetKey = "__reactHandles$" + randomKey;
	var internalRootNodeResourcesKey = "__reactResources$" + randomKey;
	var internalHoistableMarker = "__reactMarker$" + randomKey;
	var internalLoadPendingKey = "__reactLoad$" + randomKey;
	function detachDeletedInstance(node) {
		delete node[internalInstanceKey];
		delete node[internalPropsKey];
		delete node[internalEventHandlerListenersKey];
		delete node[internalEventHandlesSetKey];
	}
	function getClosestInstanceFromNode(targetNode) {
		var targetInst;
		if (targetInst = targetNode[internalInstanceKey]) return targetInst;
		for (var parentNode = targetNode.parentNode; parentNode;) {
			if (targetInst = parentNode[internalContainerInstanceKey] || parentNode[internalInstanceKey]) {
				parentNode = targetInst.alternate;
				if (null !== targetInst.child || null !== parentNode && null !== parentNode.child) for (targetNode = getParentHydrationBoundary(targetNode); null !== targetNode;) {
					if (parentNode = targetNode[internalInstanceKey]) return parentNode;
					targetNode = getParentHydrationBoundary(targetNode);
				}
				return targetInst;
			}
			targetNode = parentNode;
			parentNode = targetNode.parentNode;
		}
		return null;
	}
	function getInstanceFromNode(node) {
		if (node = node[internalInstanceKey] || node[internalContainerInstanceKey]) {
			var tag = node.tag;
			if (5 === tag || 6 === tag || 13 === tag || 31 === tag || 26 === tag || 27 === tag || 3 === tag) return node;
		}
		return null;
	}
	function getNodeFromInstance(inst) {
		var tag = inst.tag;
		if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return inst.stateNode;
		throw Error(formatProdErrorMessage(33));
	}
	function getResourcesFromRoot(root) {
		var resources = root[internalRootNodeResourcesKey];
		resources || (resources = root[internalRootNodeResourcesKey] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		});
		return resources;
	}
	function markNodeAsHoistable(node) {
		node[internalHoistableMarker] = !0;
	}
	function clearPendingLoadOnNode(node) {
		node[internalLoadPendingKey] = void 0;
	}
	var allNativeEvents = /* @__PURE__ */ new Set();
	var registrationNameDependencies = {};
	function registerTwoPhaseEvent(registrationName, dependencies) {
		registerDirectEvent(registrationName, dependencies);
		registerDirectEvent(registrationName + "Capture", dependencies);
	}
	function registerDirectEvent(registrationName, dependencies) {
		registrationNameDependencies[registrationName] = dependencies;
		for (registrationName = 0; registrationName < dependencies.length; registrationName++) allNativeEvents.add(dependencies[registrationName]);
	}
	var VALID_ATTRIBUTE_NAME_REGEX = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$");
	var illegalAttributeNameCache = {};
	var validatedAttributeNameCache = {};
	function isAttributeNameSafe(attributeName) {
		if (hasOwnProperty.call(validatedAttributeNameCache, attributeName)) return !0;
		if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return !1;
		if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) return validatedAttributeNameCache[attributeName] = !0;
		illegalAttributeNameCache[attributeName] = !0;
		return !1;
	}
	var viewTransitionMutationContext = !1;
	function pushMutationContext() {
		var prev = viewTransitionMutationContext;
		viewTransitionMutationContext = !1;
		return prev;
	}
	function setValueForAttribute(node, name, value) {
		if (isAttributeNameSafe(name)) if (null === value) node.removeAttribute(name);
		else {
			switch (typeof value) {
				case "undefined":
				case "function":
				case "symbol":
					node.removeAttribute(name);
					return;
				case "boolean":
					var prefix$10 = name.toLowerCase().slice(0, 5);
					if ("data-" !== prefix$10 && "aria-" !== prefix$10) {
						node.removeAttribute(name);
						return;
					}
			}
			node.setAttribute(name, value);
		}
	}
	function setValueForKnownAttribute(node, name, value) {
		if (null === value) node.removeAttribute(name);
		else {
			switch (typeof value) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					node.removeAttribute(name);
					return;
			}
			node.setAttribute(name, value);
		}
	}
	function setValueForNamespacedAttribute(node, namespace, name, value) {
		if (null === value) node.removeAttribute(name);
		else {
			switch (typeof value) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					node.removeAttribute(name);
					return;
			}
			node.setAttributeNS(namespace, name, value);
		}
	}
	function getToStringValue(value) {
		switch (typeof value) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return value;
			case "object": return value;
			default: return "";
		}
	}
	function isCheckable(elem) {
		var type = elem.type;
		return (elem = elem.nodeName) && "input" === elem.toLowerCase() && ("checkbox" === type || "radio" === type);
	}
	function trackValueOnNode(node, valueField, currentValue) {
		var descriptor = Object.getOwnPropertyDescriptor(node.constructor.prototype, valueField);
		if (!node.hasOwnProperty(valueField) && "undefined" !== typeof descriptor && "function" === typeof descriptor.get && "function" === typeof descriptor.set) {
			var get = descriptor.get, set = descriptor.set;
			Object.defineProperty(node, valueField, {
				configurable: !0,
				get: function() {
					return get.call(this);
				},
				set: function(value) {
					currentValue = "" + value;
					set.call(this, value);
				}
			});
			Object.defineProperty(node, valueField, { enumerable: descriptor.enumerable });
			return {
				getValue: function() {
					return currentValue;
				},
				setValue: function(value) {
					currentValue = "" + value;
				},
				stopTracking: function() {
					node._valueTracker = null;
					delete node[valueField];
				}
			};
		}
	}
	function track(node) {
		if (!node._valueTracker) {
			var valueField = isCheckable(node) ? "checked" : "value";
			node._valueTracker = trackValueOnNode(node, valueField, "" + node[valueField]);
		}
	}
	function updateValueIfChanged(node) {
		if (!node) return !1;
		var tracker = node._valueTracker;
		if (!tracker) return !0;
		var lastValue = tracker.getValue();
		var value = "";
		node && (value = isCheckable(node) ? node.checked ? "true" : "false" : node.value);
		node = value;
		return node !== lastValue ? (tracker.setValue(node), !0) : !1;
	}
	var escapeSelectorAttributeValueInsideDoubleQuotesRegex = /[\n"\\]/g;
	function escapeSelectorAttributeValueInsideDoubleQuotes(value) {
		return value.replace(escapeSelectorAttributeValueInsideDoubleQuotesRegex, function(ch) {
			return "\\" + ch.charCodeAt(0).toString(16) + " ";
		});
	}
	function updateInput(element, value, defaultValue, lastDefaultValue, checked, defaultChecked, type, name) {
		element.name = "";
		null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type ? element.type = type : element.removeAttribute("type");
		if (null != value) if ("number" === type) {
			if (0 === value && "" === element.value || element.value != value) element.value = "" + getToStringValue(value);
		} else element.value !== "" + getToStringValue(value) && (element.value = "" + getToStringValue(value));
		else "submit" !== type && "reset" !== type || element.removeAttribute("value");
		null != value ? "number" === type && element.value == value ? setDefaultValue(element, getToStringValue(element.value)) : setDefaultValue(element, getToStringValue(value)) : null != defaultValue ? setDefaultValue(element, getToStringValue(defaultValue)) : null != lastDefaultValue && element.removeAttribute("value");
		null == checked && null != defaultChecked && (element.defaultChecked = !!defaultChecked);
		null != checked && (element.checked = checked && "function" !== typeof checked && "symbol" !== typeof checked);
		null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name ? element.name = "" + getToStringValue(name) : element.removeAttribute("name");
	}
	function initInput(element, value, defaultValue, checked, defaultChecked, type, name, isHydrating) {
		null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type && (element.type = type);
		if (null != value || null != defaultValue) {
			if (!("submit" !== type && "reset" !== type || void 0 !== value && null !== value)) {
				track(element);
				return;
			}
			defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
			value = null != value ? "" + getToStringValue(value) : defaultValue;
			isHydrating || value === element.value || (element.value = value);
			element.defaultValue = value;
		}
		checked = null != checked ? checked : defaultChecked;
		checked = "function" !== typeof checked && "symbol" !== typeof checked && !!checked;
		element.checked = isHydrating ? element.checked : !!checked;
		element.defaultChecked = !!checked;
		null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name && (element.name = name);
		track(element);
	}
	function setDefaultValue(node, value) {
		node.defaultValue !== "" + value && (node.defaultValue = "" + value);
	}
	function updateOptions(node, multiple, propValue, setDefaultSelected) {
		node = node.options;
		if (multiple) {
			multiple = {};
			for (var i = 0; i < propValue.length; i++) multiple["$" + propValue[i]] = !0;
			for (propValue = 0; propValue < node.length; propValue++) i = multiple.hasOwnProperty("$" + node[propValue].value), node[propValue].selected !== i && (node[propValue].selected = i), i && setDefaultSelected && (node[propValue].defaultSelected = !0);
		} else {
			propValue = "" + getToStringValue(propValue);
			multiple = null;
			for (i = 0; i < node.length; i++) {
				if (node[i].value === propValue) {
					node[i].selected = !0;
					setDefaultSelected && (node[i].defaultSelected = !0);
					return;
				}
				null !== multiple || node[i].disabled || (multiple = node[i]);
			}
			null !== multiple && (multiple.selected = !0);
		}
	}
	function updateTextarea(element, value, defaultValue) {
		if (null != value && (value = "" + getToStringValue(value), value !== element.value && (element.value = value), null == defaultValue)) {
			element.defaultValue !== value && (element.defaultValue = value);
			return;
		}
		element.defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
	}
	function initTextarea(element, value, defaultValue, children) {
		if (null == value) {
			if (null != children) {
				if (null != defaultValue) throw Error(formatProdErrorMessage(92));
				if (isArrayImpl(children)) {
					if (1 < children.length) throw Error(formatProdErrorMessage(93));
					children = children[0];
				}
				defaultValue = children;
			}
			defaultValue ?? (defaultValue = "");
			value = defaultValue;
		}
		defaultValue = getToStringValue(value);
		element.defaultValue = defaultValue;
		children = element.textContent;
		children === defaultValue && "" !== children && null !== children && (element.value = children);
		track(element);
	}
	function setTextContent(node, text) {
		if (text) {
			var firstChild = node.firstChild;
			if (firstChild && firstChild === node.lastChild && 3 === firstChild.nodeType) {
				firstChild.nodeValue = text;
				return;
			}
		}
		node.textContent = text;
	}
	var unitlessNumbers = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function setValueForStyle(style, styleName, value) {
		var isCustomProperty = 0 === styleName.indexOf("--");
		null == value || "boolean" === typeof value || "" === value ? isCustomProperty ? style.setProperty(styleName, "") : "float" === styleName ? style.cssFloat = "" : style[styleName] = "" : isCustomProperty ? style.setProperty(styleName, value) : "number" !== typeof value || 0 === value || unitlessNumbers.has(styleName) ? "float" === styleName ? style.cssFloat = value : style[styleName] = ("" + value).trim() : style[styleName] = value + "px";
	}
	function setValueForStyles(node, styles, prevStyles) {
		if (null != styles && "object" !== typeof styles) throw Error(formatProdErrorMessage(62));
		node = node.style;
		if (null != prevStyles) {
			for (var styleName in prevStyles) !prevStyles.hasOwnProperty(styleName) || null != styles && styles.hasOwnProperty(styleName) || (0 === styleName.indexOf("--") ? node.setProperty(styleName, "") : "float" === styleName ? node.cssFloat = "" : node[styleName] = "", viewTransitionMutationContext = !0);
			for (var styleName$16 in styles) styleName = styles[styleName$16], styles.hasOwnProperty(styleName$16) && prevStyles[styleName$16] !== styleName && (setValueForStyle(node, styleName$16, styleName), viewTransitionMutationContext = !0);
		} else for (var styleName$17 in styles) styles.hasOwnProperty(styleName$17) && setValueForStyle(node, styleName$17, styles[styleName$17]);
	}
	function isCustomElement(tagName) {
		if (-1 === tagName.indexOf("-")) return !1;
		switch (tagName) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var aliases = /* @__PURE__ */ new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["maskType", "mask-type"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]);
	var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function sanitizeURL(url) {
		return isJavaScriptProtocol.test("" + url) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : url;
	}
	function noop$1() {}
	var currentReplayingEvent = null;
	function getEventTarget(nativeEvent) {
		nativeEvent = nativeEvent.target || nativeEvent.srcElement || window;
		nativeEvent.correspondingUseElement && (nativeEvent = nativeEvent.correspondingUseElement);
		return 3 === nativeEvent.nodeType ? nativeEvent.parentNode : nativeEvent;
	}
	var restoreTarget = null;
	var restoreQueue = null;
	function restoreStateOfTarget(target) {
		var internalInstance = getInstanceFromNode(target);
		if (internalInstance && (target = internalInstance.stateNode)) {
			var props = target[internalPropsKey] || null;
			a: switch (target = internalInstance.stateNode, internalInstance.type) {
				case "input":
					updateInput(target, props.value, props.defaultValue, props.defaultValue, props.checked, props.defaultChecked, props.type, props.name);
					internalInstance = props.name;
					if ("radio" === props.type && null != internalInstance) {
						for (props = target; props.parentNode;) props = props.parentNode;
						props = props.querySelectorAll("input[name=\"" + escapeSelectorAttributeValueInsideDoubleQuotes("" + internalInstance) + "\"][type=\"radio\"]");
						for (internalInstance = 0; internalInstance < props.length; internalInstance++) {
							var otherNode = props[internalInstance];
							if (otherNode !== target && otherNode.form === target.form) {
								var otherProps = otherNode[internalPropsKey] || null;
								if (!otherProps) throw Error(formatProdErrorMessage(90));
								updateInput(otherNode, otherProps.value, otherProps.defaultValue, otherProps.defaultValue, otherProps.checked, otherProps.defaultChecked, otherProps.type, otherProps.name);
							}
						}
						for (internalInstance = 0; internalInstance < props.length; internalInstance++) otherNode = props[internalInstance], otherNode.form === target.form && updateValueIfChanged(otherNode);
					}
					break a;
				case "textarea":
					updateTextarea(target, props.value, props.defaultValue);
					break a;
				case "select": internalInstance = props.value, null != internalInstance && updateOptions(target, !!props.multiple, internalInstance, !1);
			}
		}
	}
	var isInsideEventHandler = !1;
	function batchedUpdates$1(fn, a, b) {
		if (isInsideEventHandler) return fn(a, b);
		isInsideEventHandler = !0;
		try {
			return fn(a);
		} finally {
			if (isInsideEventHandler = !1, null !== restoreTarget || null !== restoreQueue) {
				if (flushSyncWork$1(), restoreTarget && (a = restoreTarget, fn = restoreQueue, restoreQueue = restoreTarget = null, restoreStateOfTarget(a), fn)) for (a = 0; a < fn.length; a++) restoreStateOfTarget(fn[a]);
			}
		}
	}
	function getListener(inst, registrationName) {
		var stateNode = inst.stateNode;
		if (null === stateNode) return null;
		var props = stateNode[internalPropsKey] || null;
		if (null === props) return null;
		stateNode = props[registrationName];
		a: switch (registrationName) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(props = !props.disabled) || (inst = inst.type, props = !("button" === inst || "input" === inst || "select" === inst || "textarea" === inst));
				inst = !props;
				break a;
			default: inst = !1;
		}
		if (inst) return null;
		if (stateNode && "function" !== typeof stateNode) throw Error(formatProdErrorMessage(231, registrationName, typeof stateNode));
		return stateNode;
	}
	var canUseDOM = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement);
	var passiveBrowserEventsSupported = !1;
	if (canUseDOM) try {
		var options = {};
		Object.defineProperty(options, "passive", { get: function() {
			passiveBrowserEventsSupported = !0;
		} });
		window.addEventListener("test", options, options);
		window.removeEventListener("test", options, options);
	} catch (e) {
		passiveBrowserEventsSupported = !1;
	}
	var root = null;
	var startText = null;
	var fallbackText = null;
	function getData() {
		if (fallbackText) return fallbackText;
		var start, startValue = startText, startLength = startValue.length, end, endValue = "value" in root ? root.value : root.textContent, endLength = endValue.length;
		for (start = 0; start < startLength && startValue[start] === endValue[start]; start++);
		var minEnd = startLength - start;
		for (end = 1; end <= minEnd && startValue[startLength - end] === endValue[endLength - end]; end++);
		return fallbackText = endValue.slice(start, 1 < end ? 1 - end : void 0);
	}
	function getEventCharCode(nativeEvent) {
		var keyCode = nativeEvent.keyCode;
		"charCode" in nativeEvent ? (nativeEvent = nativeEvent.charCode, 0 === nativeEvent && 13 === keyCode && (nativeEvent = 13)) : nativeEvent = keyCode;
		10 === nativeEvent && (nativeEvent = 13);
		return 32 <= nativeEvent || 13 === nativeEvent ? nativeEvent : 0;
	}
	function functionThatReturnsTrue() {
		return !0;
	}
	function functionThatReturnsFalse() {
		return !1;
	}
	function createSyntheticEvent(Interface) {
		function SyntheticBaseEvent(reactName, reactEventType, targetInst, nativeEvent, nativeEventTarget) {
			this._reactName = reactName;
			this._targetInst = targetInst;
			this.type = reactEventType;
			this.nativeEvent = nativeEvent;
			this.target = nativeEventTarget;
			this.currentTarget = null;
			for (var propName in Interface) Interface.hasOwnProperty(propName) && (reactName = Interface[propName], this[propName] = reactName ? reactName(nativeEvent) : nativeEvent[propName]);
			this.isDefaultPrevented = (null != nativeEvent.defaultPrevented ? nativeEvent.defaultPrevented : !1 === nativeEvent.returnValue) ? functionThatReturnsTrue : functionThatReturnsFalse;
			this.isPropagationStopped = functionThatReturnsFalse;
			return this;
		}
		assign(SyntheticBaseEvent.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var event = this.nativeEvent;
				event && (event.preventDefault ? event.preventDefault() : "unknown" !== typeof event.returnValue && (event.returnValue = !1), this.isDefaultPrevented = functionThatReturnsTrue);
			},
			stopPropagation: function() {
				var event = this.nativeEvent;
				event && (event.stopPropagation ? event.stopPropagation() : "unknown" !== typeof event.cancelBubble && (event.cancelBubble = !0), this.isPropagationStopped = functionThatReturnsTrue);
			},
			persist: function() {},
			isPersistent: functionThatReturnsTrue
		});
		return SyntheticBaseEvent;
	}
	var EventInterface = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(event) {
			return event.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	};
	var SyntheticEvent = createSyntheticEvent(EventInterface);
	var UIEventInterface = assign({}, EventInterface, {
		view: 0,
		detail: 0
	});
	var SyntheticUIEvent = createSyntheticEvent(UIEventInterface);
	var lastMovementX;
	var lastMovementY;
	var lastMouseEvent;
	var MouseEventInterface = assign({}, UIEventInterface, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: getEventModifierState,
		button: 0,
		buttons: 0,
		relatedTarget: function(event) {
			return void 0 === event.relatedTarget ? event.fromElement === event.srcElement ? event.toElement : event.fromElement : event.relatedTarget;
		},
		movementX: function(event) {
			if ("movementX" in event) return event.movementX;
			event !== lastMouseEvent && (lastMouseEvent && "mousemove" === event.type ? (lastMovementX = event.screenX - lastMouseEvent.screenX, lastMovementY = event.screenY - lastMouseEvent.screenY) : lastMovementY = lastMovementX = 0, lastMouseEvent = event);
			return lastMovementX;
		},
		movementY: function(event) {
			return "movementY" in event ? event.movementY : lastMovementY;
		}
	});
	var SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface);
	var SyntheticDragEvent = createSyntheticEvent(assign({}, MouseEventInterface, { dataTransfer: 0 }));
	var SyntheticFocusEvent = createSyntheticEvent(assign({}, UIEventInterface, { relatedTarget: 0 }));
	var SyntheticAnimationEvent = createSyntheticEvent(assign({}, EventInterface, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	}));
	var SyntheticClipboardEvent = createSyntheticEvent(assign({}, EventInterface, { clipboardData: function(event) {
		return "clipboardData" in event ? event.clipboardData : window.clipboardData;
	} }));
	var SyntheticCompositionEvent = createSyntheticEvent(assign({}, EventInterface, { data: 0 }));
	var normalizeKey = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	};
	var translateToKey = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	};
	var modifierKeyToProp = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function modifierStateGetter(keyArg) {
		var nativeEvent = this.nativeEvent;
		return nativeEvent.getModifierState ? nativeEvent.getModifierState(keyArg) : (keyArg = modifierKeyToProp[keyArg]) ? !!nativeEvent[keyArg] : !1;
	}
	function getEventModifierState() {
		return modifierStateGetter;
	}
	var SyntheticKeyboardEvent = createSyntheticEvent(assign({}, UIEventInterface, {
		key: function(nativeEvent) {
			if (nativeEvent.key) {
				var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
				if ("Unidentified" !== key) return key;
			}
			return "keypress" === nativeEvent.type ? (nativeEvent = getEventCharCode(nativeEvent), 13 === nativeEvent ? "Enter" : String.fromCharCode(nativeEvent)) : "keydown" === nativeEvent.type || "keyup" === nativeEvent.type ? translateToKey[nativeEvent.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: getEventModifierState,
		charCode: function(event) {
			return "keypress" === event.type ? getEventCharCode(event) : 0;
		},
		keyCode: function(event) {
			return "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
		},
		which: function(event) {
			return "keypress" === event.type ? getEventCharCode(event) : "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
		}
	}));
	var SyntheticPointerEvent = createSyntheticEvent(assign({}, MouseEventInterface, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	}));
	var SyntheticSubmitEvent = createSyntheticEvent(assign({}, EventInterface, { submitter: 0 }));
	var SyntheticTouchEvent = createSyntheticEvent(assign({}, UIEventInterface, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: getEventModifierState
	}));
	var SyntheticTransitionEvent = createSyntheticEvent(assign({}, EventInterface, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	}));
	var SyntheticWheelEvent = createSyntheticEvent(assign({}, MouseEventInterface, {
		deltaX: function(event) {
			return "deltaX" in event ? event.deltaX : "wheelDeltaX" in event ? -event.wheelDeltaX : 0;
		},
		deltaY: function(event) {
			return "deltaY" in event ? event.deltaY : "wheelDeltaY" in event ? -event.wheelDeltaY : "wheelDelta" in event ? -event.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	}));
	var SyntheticToggleEvent = createSyntheticEvent(assign({}, EventInterface, {
		newState: 0,
		oldState: 0,
		source: 0
	}));
	var END_KEYCODES = [
		9,
		13,
		27,
		32
	];
	var canUseCompositionEvent = canUseDOM && "CompositionEvent" in window;
	var documentMode = null;
	canUseDOM && "documentMode" in document && (documentMode = document.documentMode);
	var canUseTextInputEvent = canUseDOM && "TextEvent" in window && !documentMode;
	var useFallbackCompositionData = canUseDOM && (!canUseCompositionEvent || documentMode && 8 < documentMode && 11 >= documentMode);
	var SPACEBAR_CHAR = String.fromCharCode(32);
	var hasSpaceKeypress = !1;
	function isFallbackCompositionEnd(domEventName, nativeEvent) {
		switch (domEventName) {
			case "keyup": return -1 !== END_KEYCODES.indexOf(nativeEvent.keyCode);
			case "keydown": return 229 !== nativeEvent.keyCode;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function getDataFromCustomEvent(nativeEvent) {
		nativeEvent = nativeEvent.detail;
		return "object" === typeof nativeEvent && "data" in nativeEvent ? nativeEvent.data : null;
	}
	var isComposing = !1;
	function getNativeBeforeInputChars(domEventName, nativeEvent) {
		switch (domEventName) {
			case "compositionend": return getDataFromCustomEvent(nativeEvent);
			case "keypress":
				if (32 !== nativeEvent.which) return null;
				hasSpaceKeypress = !0;
				return SPACEBAR_CHAR;
			case "textInput": return domEventName = nativeEvent.data, domEventName === SPACEBAR_CHAR && hasSpaceKeypress ? null : domEventName;
			default: return null;
		}
	}
	function getFallbackBeforeInputChars(domEventName, nativeEvent) {
		if (isComposing) return "compositionend" === domEventName || !canUseCompositionEvent && isFallbackCompositionEnd(domEventName, nativeEvent) ? (domEventName = getData(), fallbackText = startText = root = null, isComposing = !1, domEventName) : null;
		switch (domEventName) {
			case "paste": return null;
			case "keypress":
				if (!(nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) || nativeEvent.ctrlKey && nativeEvent.altKey) {
					if (nativeEvent.char && 1 < nativeEvent.char.length) return nativeEvent.char;
					if (nativeEvent.which) return String.fromCharCode(nativeEvent.which);
				}
				return null;
			case "compositionend": return useFallbackCompositionData && "ko" !== nativeEvent.locale ? null : nativeEvent.data;
			default: return null;
		}
	}
	var supportedInputTypes = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function isTextInputElement(elem) {
		var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
		return "input" === nodeName ? !!supportedInputTypes[elem.type] : "textarea" === nodeName ? !0 : !1;
	}
	function createAndAccumulateChangeEvent(dispatchQueue, inst, nativeEvent, target) {
		restoreTarget ? restoreQueue ? restoreQueue.push(target) : restoreQueue = [target] : restoreTarget = target;
		inst = accumulateTwoPhaseListeners(inst, "onChange");
		0 < inst.length && (nativeEvent = new SyntheticEvent("onChange", "change", null, nativeEvent, target), dispatchQueue.push({
			event: nativeEvent,
			listeners: inst
		}));
	}
	var activeElement$1 = null;
	var activeElementInst$1 = null;
	function runEventInBatch(dispatchQueue) {
		processDispatchQueue(dispatchQueue, 0);
	}
	function getInstIfValueChanged(targetInst) {
		if (updateValueIfChanged(getNodeFromInstance(targetInst))) return targetInst;
	}
	function getTargetInstForChangeEvent(domEventName, targetInst) {
		if ("change" === domEventName) return targetInst;
	}
	var isInputEventSupported = !1;
	if (canUseDOM) {
		var JSCompiler_inline_result$jscomp$318;
		if (canUseDOM) {
			var isSupported$jscomp$inline_474 = "oninput" in document;
			if (!isSupported$jscomp$inline_474) {
				var element$jscomp$inline_475 = document.createElement("div");
				element$jscomp$inline_475.setAttribute("oninput", "return;");
				isSupported$jscomp$inline_474 = "function" === typeof element$jscomp$inline_475.oninput;
			}
			JSCompiler_inline_result$jscomp$318 = isSupported$jscomp$inline_474;
		} else JSCompiler_inline_result$jscomp$318 = !1;
		isInputEventSupported = JSCompiler_inline_result$jscomp$318 && (!document.documentMode || 9 < document.documentMode);
	}
	function stopWatchingForValueChange() {
		activeElement$1 && (activeElement$1.detachEvent("onpropertychange", handlePropertyChange), activeElementInst$1 = activeElement$1 = null);
	}
	function handlePropertyChange(nativeEvent) {
		if ("value" === nativeEvent.propertyName && getInstIfValueChanged(activeElementInst$1)) {
			var dispatchQueue = [];
			createAndAccumulateChangeEvent(dispatchQueue, activeElementInst$1, nativeEvent, getEventTarget(nativeEvent));
			batchedUpdates$1(runEventInBatch, dispatchQueue);
		}
	}
	function handleEventsForInputEventPolyfill(domEventName, target, targetInst) {
		"focusin" === domEventName ? (stopWatchingForValueChange(), activeElement$1 = target, activeElementInst$1 = targetInst, activeElement$1.attachEvent("onpropertychange", handlePropertyChange)) : "focusout" === domEventName && stopWatchingForValueChange();
	}
	function getTargetInstForInputEventPolyfill(domEventName) {
		if ("selectionchange" === domEventName || "keyup" === domEventName || "keydown" === domEventName) return getInstIfValueChanged(activeElementInst$1);
	}
	function getTargetInstForClickEvent(domEventName, targetInst) {
		if ("click" === domEventName) return getInstIfValueChanged(targetInst);
	}
	function getTargetInstForInputOrChangeEvent(domEventName, targetInst) {
		if ("input" === domEventName || "change" === domEventName) return getInstIfValueChanged(targetInst);
	}
	function is(x, y) {
		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
	}
	var objectIs = "function" === typeof Object.is ? Object.is : is;
	function shallowEqual(objA, objB) {
		if (objectIs(objA, objB)) return !0;
		if ("object" !== typeof objA || null === objA || "object" !== typeof objB || null === objB) return !1;
		var keysA = Object.keys(objA), keysB = Object.keys(objB);
		if (keysA.length !== keysB.length) return !1;
		for (keysB = 0; keysB < keysA.length; keysB++) {
			var currentKey = keysA[keysB];
			if (!hasOwnProperty.call(objB, currentKey) || !objectIs(objA[currentKey], objB[currentKey])) return !1;
		}
		return !0;
	}
	function getActiveElement(doc) {
		doc = doc || ("undefined" !== typeof document ? document : void 0);
		if ("undefined" === typeof doc) return null;
		try {
			return doc.activeElement || doc.body;
		} catch (e$20) {
			return doc.body;
		}
	}
	function getLeafNode(node) {
		for (; node && node.firstChild;) node = node.firstChild;
		return node;
	}
	function getNodeForCharacterOffset(root, offset) {
		var node = getLeafNode(root);
		root = 0;
		for (var nodeEnd; node;) {
			if (3 === node.nodeType) {
				nodeEnd = root + node.textContent.length;
				if (root <= offset && nodeEnd >= offset) return {
					node,
					offset: offset - root
				};
				root = nodeEnd;
			}
			a: {
				for (; node;) {
					if (node.nextSibling) {
						node = node.nextSibling;
						break a;
					}
					node = node.parentNode;
				}
				node = void 0;
			}
			node = getLeafNode(node);
		}
	}
	function containsNode(outerNode, innerNode) {
		return outerNode && innerNode ? outerNode === innerNode ? !0 : outerNode && 3 === outerNode.nodeType ? !1 : innerNode && 3 === innerNode.nodeType ? containsNode(outerNode, innerNode.parentNode) : "contains" in outerNode ? outerNode.contains(innerNode) : outerNode.compareDocumentPosition ? !!(outerNode.compareDocumentPosition(innerNode) & 16) : !1 : !1;
	}
	function getActiveElementDeep(containerInfo) {
		containerInfo = null != containerInfo && null != containerInfo.ownerDocument && null != containerInfo.ownerDocument.defaultView ? containerInfo.ownerDocument.defaultView : window;
		for (var element = getActiveElement(containerInfo.document); element instanceof containerInfo.HTMLIFrameElement;) {
			try {
				var JSCompiler_inline_result = "string" === typeof element.contentWindow.location.href;
			} catch (err) {
				JSCompiler_inline_result = !1;
			}
			if (JSCompiler_inline_result) containerInfo = element.contentWindow;
			else break;
			element = getActiveElement(containerInfo.document);
		}
		return element;
	}
	function hasSelectionCapabilities(elem) {
		var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
		return nodeName && ("input" === nodeName && ("text" === elem.type || "search" === elem.type || "tel" === elem.type || "url" === elem.type || "password" === elem.type) || "textarea" === nodeName || "true" === elem.contentEditable);
	}
	var skipSelectionChangeEvent = canUseDOM && "documentMode" in document && 11 >= document.documentMode;
	var activeElement = null;
	var activeElementInst = null;
	var lastSelection = null;
	var mouseDown = !1;
	function constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget) {
		var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : 9 === nativeEventTarget.nodeType ? nativeEventTarget : nativeEventTarget.ownerDocument;
		mouseDown || null == activeElement || activeElement !== getActiveElement(doc) || (doc = activeElement, "selectionStart" in doc && hasSelectionCapabilities(doc) ? doc = {
			start: doc.selectionStart,
			end: doc.selectionEnd
		} : (doc = (doc.ownerDocument && doc.ownerDocument.defaultView || window).getSelection(), doc = {
			anchorNode: doc.anchorNode,
			anchorOffset: doc.anchorOffset,
			focusNode: doc.focusNode,
			focusOffset: doc.focusOffset
		}), lastSelection && shallowEqual(lastSelection, doc) || (lastSelection = doc, doc = accumulateTwoPhaseListeners(activeElementInst, "onSelect"), 0 < doc.length && (nativeEvent = new SyntheticEvent("onSelect", "select", null, nativeEvent, nativeEventTarget), dispatchQueue.push({
			event: nativeEvent,
			listeners: doc
		}), nativeEvent.target = activeElement)));
	}
	function makePrefixMap(styleProp, eventName) {
		var prefixes = {};
		prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
		prefixes["Webkit" + styleProp] = "webkit" + eventName;
		prefixes["Moz" + styleProp] = "moz" + eventName;
		return prefixes;
	}
	var vendorPrefixes = {
		animationend: makePrefixMap("Animation", "AnimationEnd"),
		animationiteration: makePrefixMap("Animation", "AnimationIteration"),
		animationstart: makePrefixMap("Animation", "AnimationStart"),
		transitionrun: makePrefixMap("Transition", "TransitionRun"),
		transitionstart: makePrefixMap("Transition", "TransitionStart"),
		transitioncancel: makePrefixMap("Transition", "TransitionCancel"),
		transitionend: makePrefixMap("Transition", "TransitionEnd")
	};
	var prefixedEventNames = {};
	var style = {};
	canUseDOM && (style = document.createElement("div").style, "AnimationEvent" in window || (delete vendorPrefixes.animationend.animation, delete vendorPrefixes.animationiteration.animation, delete vendorPrefixes.animationstart.animation), "TransitionEvent" in window || delete vendorPrefixes.transitionend.transition);
	function getVendorPrefixedEventName(eventName) {
		if (prefixedEventNames[eventName]) return prefixedEventNames[eventName];
		if (!vendorPrefixes[eventName]) return eventName;
		var prefixMap = vendorPrefixes[eventName], styleProp;
		for (styleProp in prefixMap) if (prefixMap.hasOwnProperty(styleProp) && styleProp in style) return prefixedEventNames[eventName] = prefixMap[styleProp];
		return eventName;
	}
	var ANIMATION_END = getVendorPrefixedEventName("animationend");
	var ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration");
	var ANIMATION_START = getVendorPrefixedEventName("animationstart");
	var TRANSITION_RUN = getVendorPrefixedEventName("transitionrun");
	var TRANSITION_START = getVendorPrefixedEventName("transitionstart");
	var TRANSITION_CANCEL = getVendorPrefixedEventName("transitioncancel");
	var TRANSITION_END = getVendorPrefixedEventName("transitionend");
	var topLevelEventsToReactNames = /* @__PURE__ */ new Map();
	var simpleEventPluginEvents = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	simpleEventPluginEvents.push("scrollEnd");
	function registerSimpleEvent(domEventName, reactName) {
		topLevelEventsToReactNames.set(domEventName, reactName);
		registerTwoPhaseEvent(reactName, [domEventName]);
	}
	var globalClientIdCounter$1 = 0;
	function getViewTransitionName(props, instance) {
		if (null != props.name && "auto" !== props.name) return props.name;
		if (null !== instance.autoName) return instance.autoName;
		props = pendingEffectsRoot.identifierPrefix;
		var globalClientId = globalClientIdCounter$1++;
		props = "_" + props + "t_" + globalClientId.toString(32) + "_";
		return instance.autoName = props;
	}
	function getClassNameByType(classByType) {
		if (null == classByType || "string" === typeof classByType) return classByType;
		var className = null, activeTypes = pendingTransitionTypes;
		if (null !== activeTypes) for (var i = 0; i < activeTypes.length; i++) {
			var match = classByType[activeTypes[i]];
			if (null != match) {
				if ("none" === match) return "none";
				className = null == className ? match : className + (" " + match);
			}
		}
		return null == className ? classByType.default : className;
	}
	function getViewTransitionClassName(defaultClass, eventClass) {
		defaultClass = getClassNameByType(defaultClass);
		eventClass = getClassNameByType(eventClass);
		return null == eventClass ? "auto" === defaultClass ? null : defaultClass : "auto" === eventClass ? null : eventClass;
	}
	var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
		if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
			var event = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
				error
			});
			if (!window.dispatchEvent(event)) return;
		} else if ("object" === typeof process && "function" === typeof process.emit) {
			process.emit("uncaughtException", error);
			return;
		}
		console.error(error);
	};
	var concurrentQueues = [];
	var concurrentQueuesIndex = 0;
	var concurrentlyUpdatedLanes = 0;
	function finishQueueingConcurrentUpdates() {
		for (var endIndex = concurrentQueuesIndex, i = concurrentlyUpdatedLanes = concurrentQueuesIndex = 0; i < endIndex;) {
			var fiber = concurrentQueues[i];
			concurrentQueues[i++] = null;
			var queue = concurrentQueues[i];
			concurrentQueues[i++] = null;
			var update = concurrentQueues[i];
			concurrentQueues[i++] = null;
			var lane = concurrentQueues[i];
			concurrentQueues[i++] = null;
			if (null !== queue && null !== update) {
				var pending = queue.pending;
				null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
				queue.pending = update;
			}
			0 !== lane && markUpdateLaneFromFiberToRoot(fiber, update, lane);
		}
	}
	function enqueueUpdate$1(fiber, queue, update, lane) {
		concurrentQueues[concurrentQueuesIndex++] = fiber;
		concurrentQueues[concurrentQueuesIndex++] = queue;
		concurrentQueues[concurrentQueuesIndex++] = update;
		concurrentQueues[concurrentQueuesIndex++] = lane;
		concurrentlyUpdatedLanes |= lane;
		fiber.lanes |= lane;
		fiber = fiber.alternate;
		null !== fiber && (fiber.lanes |= lane);
	}
	function enqueueConcurrentHookUpdate(fiber, queue, update, lane) {
		enqueueUpdate$1(fiber, queue, update, lane);
		return getRootForUpdatedFiber(fiber);
	}
	function enqueueConcurrentRenderForLane(fiber, lane) {
		enqueueUpdate$1(fiber, null, null, lane);
		return getRootForUpdatedFiber(fiber);
	}
	function markUpdateLaneFromFiberToRoot(sourceFiber, update, lane) {
		sourceFiber.lanes |= lane;
		var alternate = sourceFiber.alternate;
		null !== alternate && (alternate.lanes |= lane);
		for (var isHidden = !1, parent = sourceFiber.return; null !== parent;) parent.childLanes |= lane, alternate = parent.alternate, null !== alternate && (alternate.childLanes |= lane), 22 === parent.tag && (sourceFiber = parent.stateNode, null === sourceFiber || sourceFiber._visibility & 1 || (isHidden = !0)), sourceFiber = parent, parent = parent.return;
		return 3 === sourceFiber.tag ? (parent = sourceFiber.stateNode, isHidden && null !== update && (isHidden = 31 - clz32(lane), sourceFiber = parent.hiddenUpdates, alternate = sourceFiber[isHidden], null === alternate ? sourceFiber[isHidden] = [update] : alternate.push(update), update.lane = lane | 536870912), parent) : null;
	}
	function getRootForUpdatedFiber(sourceFiber) {
		if (50 < nestedUpdateCount) throw nestedUpdateCount = 0, rootWithNestedUpdates = null, Error(formatProdErrorMessage(185));
		for (var parent = sourceFiber.return; null !== parent;) sourceFiber = parent, parent = sourceFiber.return;
		return 3 === sourceFiber.tag ? sourceFiber.stateNode : null;
	}
	var emptyContextObject = {};
	function FiberNode(tag, pendingProps, key, mode) {
		this.tag = tag;
		this.key = key;
		this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
		this.index = 0;
		this.refCleanup = this.ref = null;
		this.pendingProps = pendingProps;
		this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
		this.mode = mode;
		this.subtreeFlags = this.flags = 0;
		this.deletions = null;
		this.childLanes = this.lanes = 0;
		this.alternate = null;
	}
	function createFiberImplClass(tag, pendingProps, key, mode) {
		return new FiberNode(tag, pendingProps, key, mode);
	}
	function shouldConstruct(Component) {
		Component = Component.prototype;
		return !(!Component || !Component.isReactComponent);
	}
	function createWorkInProgress(current, pendingProps) {
		var workInProgress = current.alternate;
		null === workInProgress ? (workInProgress = createFiberImplClass(current.tag, pendingProps, current.key, current.mode), workInProgress.elementType = current.elementType, workInProgress.type = current.type, workInProgress.stateNode = current.stateNode, workInProgress.alternate = current, current.alternate = workInProgress) : (workInProgress.pendingProps = pendingProps, workInProgress.type = current.type, workInProgress.flags = 0, workInProgress.subtreeFlags = 0, workInProgress.deletions = null);
		workInProgress.flags = current.flags & 1206910976;
		workInProgress.childLanes = current.childLanes;
		workInProgress.lanes = current.lanes;
		workInProgress.child = current.child;
		workInProgress.memoizedProps = current.memoizedProps;
		workInProgress.memoizedState = current.memoizedState;
		workInProgress.updateQueue = current.updateQueue;
		pendingProps = current.dependencies;
		workInProgress.dependencies = null === pendingProps ? null : {
			lanes: pendingProps.lanes,
			firstContext: pendingProps.firstContext
		};
		workInProgress.sibling = current.sibling;
		workInProgress.index = current.index;
		workInProgress.ref = current.ref;
		workInProgress.refCleanup = current.refCleanup;
		return workInProgress;
	}
	function resetWorkInProgress(workInProgress, renderLanes) {
		workInProgress.flags &= 1206910978;
		var current = workInProgress.alternate;
		null === current ? (workInProgress.childLanes = 0, workInProgress.lanes = renderLanes, workInProgress.child = null, workInProgress.subtreeFlags = 0, workInProgress.memoizedProps = null, workInProgress.memoizedState = null, workInProgress.updateQueue = null, workInProgress.dependencies = null, workInProgress.stateNode = null) : (workInProgress.childLanes = current.childLanes, workInProgress.lanes = current.lanes, workInProgress.child = current.child, workInProgress.subtreeFlags = 0, workInProgress.deletions = null, workInProgress.memoizedProps = current.memoizedProps, workInProgress.memoizedState = current.memoizedState, workInProgress.updateQueue = current.updateQueue, workInProgress.type = current.type, renderLanes = current.dependencies, workInProgress.dependencies = null === renderLanes ? null : {
			lanes: renderLanes.lanes,
			firstContext: renderLanes.firstContext
		});
		return workInProgress;
	}
	function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes) {
		var fiberTag = 0;
		owner = type;
		if ("function" === typeof owner) shouldConstruct(owner) && (fiberTag = 1);
		else if ("string" === typeof owner) fiberTag = isHostHoistableType(type, pendingProps, contextStackCursor.current) ? 26 : "html" === type || "head" === type || "body" === type ? 27 : 5;
		else a: switch (owner) {
			case REACT_ACTIVITY_TYPE: return type = createFiberImplClass(31, pendingProps, key, mode), type.elementType = REACT_ACTIVITY_TYPE, type.lanes = lanes, type;
			case REACT_FRAGMENT_TYPE: return createFiberFromFragment(pendingProps.children, mode, lanes, key);
			case REACT_STRICT_MODE_TYPE:
				fiberTag = 8;
				mode |= 24;
				break;
			case REACT_PROFILER_TYPE: return type = createFiberImplClass(12, pendingProps, key, mode | 2), type.elementType = REACT_PROFILER_TYPE, type.lanes = lanes, type;
			case REACT_SUSPENSE_TYPE: return type = createFiberImplClass(13, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_TYPE, type.lanes = lanes, type;
			case REACT_SUSPENSE_LIST_TYPE: return type = createFiberImplClass(19, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_LIST_TYPE, type.lanes = lanes, type;
			case REACT_LEGACY_HIDDEN_TYPE:
			case REACT_VIEW_TRANSITION_TYPE: return type = mode | 32, type = createFiberImplClass(30, pendingProps, key, type), type.elementType = REACT_VIEW_TRANSITION_TYPE, type.lanes = lanes, type.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}, type;
			default:
				if ("object" === typeof owner && null !== owner) switch (owner.$$typeof) {
					case REACT_CONTEXT_TYPE:
						fiberTag = 10;
						break a;
					case REACT_CONSUMER_TYPE:
						fiberTag = 9;
						break a;
					case REACT_FORWARD_REF_TYPE:
						fiberTag = 11;
						break a;
					case REACT_MEMO_TYPE:
						fiberTag = 14;
						break a;
					case REACT_LAZY_TYPE:
						fiberTag = 16;
						owner = null;
						break a;
				}
				fiberTag = 29;
				pendingProps = Error(formatProdErrorMessage(130, null === type ? "null" : typeof type, ""));
				owner = null;
		}
		key = createFiberImplClass(fiberTag, pendingProps, key, mode);
		key.elementType = type;
		key.type = owner;
		key.lanes = lanes;
		return key;
	}
	function createFiberFromFragment(elements, mode, lanes, key) {
		elements = createFiberImplClass(7, elements, key, mode);
		elements.lanes = lanes;
		return elements;
	}
	function createFiberFromText(content, mode, lanes) {
		content = createFiberImplClass(6, content, null, mode);
		content.lanes = lanes;
		return content;
	}
	function createFiberFromDehydratedFragment(dehydratedNode) {
		var fiber = createFiberImplClass(18, null, null, 0);
		fiber.stateNode = dehydratedNode;
		return fiber;
	}
	function createFiberFromPortal(portal, mode, lanes) {
		mode = createFiberImplClass(4, null !== portal.children ? portal.children : [], portal.key, mode);
		mode.lanes = lanes;
		mode.stateNode = {
			containerInfo: portal.containerInfo,
			pendingChildren: null,
			implementation: portal.implementation
		};
		return mode;
	}
	var CapturedStacks = /* @__PURE__ */ new WeakMap();
	function createCapturedValueAtFiber(value, source) {
		if ("object" === typeof value && null !== value) {
			var existing = CapturedStacks.get(value);
			if (void 0 !== existing) return existing;
			source = {
				value,
				source,
				stack: getStackByFiberInDevAndProd(source)
			};
			CapturedStacks.set(value, source);
			return source;
		}
		return {
			value,
			source,
			stack: getStackByFiberInDevAndProd(source)
		};
	}
	var forkStack = [];
	var forkStackIndex = 0;
	var treeForkProvider = null;
	var treeForkCount = 0;
	var idStack = [];
	var idStackIndex = 0;
	var treeContextProvider = null;
	var treeContextId = 1;
	var treeContextOverflow = "";
	function pushTreeFork(workInProgress, totalChildren) {
		forkStack[forkStackIndex++] = treeForkCount;
		forkStack[forkStackIndex++] = treeForkProvider;
		treeForkProvider = workInProgress;
		treeForkCount = totalChildren;
	}
	function pushTreeId(workInProgress, totalChildren, index) {
		idStack[idStackIndex++] = treeContextId;
		idStack[idStackIndex++] = treeContextOverflow;
		idStack[idStackIndex++] = treeContextProvider;
		treeContextProvider = workInProgress;
		var baseIdWithLeadingBit = treeContextId;
		workInProgress = treeContextOverflow;
		var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
		baseIdWithLeadingBit &= ~(1 << baseLength);
		index += 1;
		var length = 32 - clz32(totalChildren) + baseLength;
		if (30 < length) {
			var numberOfOverflowBits = baseLength - baseLength % 5;
			length = (baseIdWithLeadingBit & (1 << numberOfOverflowBits) - 1).toString(32);
			baseIdWithLeadingBit >>= numberOfOverflowBits;
			baseLength -= numberOfOverflowBits;
			treeContextId = 1 << 32 - clz32(totalChildren) + baseLength | index << baseLength | baseIdWithLeadingBit;
			treeContextOverflow = length + workInProgress;
		} else treeContextId = 1 << length | index << baseLength | baseIdWithLeadingBit, treeContextOverflow = workInProgress;
	}
	function pushMaterializedTreeId(workInProgress) {
		null !== workInProgress.return && (pushTreeFork(workInProgress, 1), pushTreeId(workInProgress, 1, 0));
	}
	function popTreeContext(workInProgress) {
		for (; workInProgress === treeForkProvider;) treeForkProvider = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null, treeForkCount = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null;
		for (; workInProgress === treeContextProvider;) treeContextProvider = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextOverflow = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextId = idStack[--idStackIndex], idStack[idStackIndex] = null;
	}
	function restoreSuspendedTreeContext(workInProgress, suspendedContext) {
		idStack[idStackIndex++] = treeContextId;
		idStack[idStackIndex++] = treeContextOverflow;
		idStack[idStackIndex++] = treeContextProvider;
		treeContextId = suspendedContext.id;
		treeContextOverflow = suspendedContext.overflow;
		treeContextProvider = workInProgress;
	}
	var hydrationParentFiber = null;
	var nextHydratableInstance = null;
	var isHydrating = !1;
	var hydrationErrors = null;
	var rootOrSingletonContext = !1;
	var HydrationMismatchException = Error(formatProdErrorMessage(519));
	function throwOnHydrationMismatch(fiber) {
		queueHydrationError(createCapturedValueAtFiber(Error(formatProdErrorMessage(418, 1 < arguments.length && void 0 !== arguments[1] && arguments[1] ? "text" : "HTML", "")), fiber));
		throw HydrationMismatchException;
	}
	function prepareToHydrateHostInstance(fiber) {
		var instance = fiber.stateNode, type = fiber.type, props = fiber.memoizedProps;
		instance[internalInstanceKey] = fiber;
		instance[internalPropsKey] = props;
		switch (type) {
			case "dialog":
				listenToNonDelegatedEvent("cancel", instance);
				listenToNonDelegatedEvent("close", instance);
				break;
			case "iframe":
			case "object":
			case "embed":
				listenToNonDelegatedEvent("load", instance);
				break;
			case "video":
			case "audio":
				for (type = 0; type < mediaEventTypes.length; type++) listenToNonDelegatedEvent(mediaEventTypes[type], instance);
				break;
			case "source":
				listenToNonDelegatedEvent("error", instance);
				break;
			case "img":
			case "image":
			case "link":
				listenToNonDelegatedEvent("error", instance);
				listenToNonDelegatedEvent("load", instance);
				break;
			case "details":
				listenToNonDelegatedEvent("toggle", instance);
				break;
			case "input":
				listenToNonDelegatedEvent("invalid", instance);
				initInput(instance, props.value, props.defaultValue, props.checked, props.defaultChecked, props.type, props.name, !0);
				break;
			case "select":
				listenToNonDelegatedEvent("invalid", instance);
				break;
			case "textarea": listenToNonDelegatedEvent("invalid", instance), initTextarea(instance, props.value, props.defaultValue, props.children);
		}
		type = props.children;
		"string" !== typeof type && "number" !== typeof type && "bigint" !== typeof type || instance.textContent === "" + type || !0 === props.suppressHydrationWarning || checkForUnmatchedText(instance.textContent, type) ? (null != props.popover && (listenToNonDelegatedEvent("beforetoggle", instance), listenToNonDelegatedEvent("toggle", instance)), null != props.onScroll && listenToNonDelegatedEvent("scroll", instance), null != props.onScrollEnd && listenToNonDelegatedEvent("scrollend", instance), null != props.onClick && (instance.onclick = noop$1), instance = !0) : instance = !1;
		instance || throwOnHydrationMismatch(fiber, !0);
	}
	function popToNextHostParent(fiber) {
		for (hydrationParentFiber = fiber.return; hydrationParentFiber;) switch (hydrationParentFiber.tag) {
			case 5:
			case 31:
			case 13:
				rootOrSingletonContext = !1;
				return;
			case 27:
			case 3:
				rootOrSingletonContext = !0;
				return;
			default: hydrationParentFiber = hydrationParentFiber.return;
		}
	}
	function popHydrationState(fiber) {
		if (fiber !== hydrationParentFiber) return !1;
		if (!isHydrating) return popToNextHostParent(fiber), isHydrating = !0, !1;
		var tag = fiber.tag, JSCompiler_temp;
		if (JSCompiler_temp = 3 !== tag && 27 !== tag) {
			if (JSCompiler_temp = 5 === tag) JSCompiler_temp = fiber.type, JSCompiler_temp = !("form" !== JSCompiler_temp && "button" !== JSCompiler_temp) || shouldSetTextContent(fiber.type, fiber.memoizedProps);
			JSCompiler_temp = !JSCompiler_temp;
		}
		JSCompiler_temp && nextHydratableInstance && throwOnHydrationMismatch(fiber);
		popToNextHostParent(fiber);
		if (13 === tag) {
			fiber = fiber.memoizedState;
			fiber = null !== fiber ? fiber.dehydrated : null;
			if (!fiber) throw Error(formatProdErrorMessage(317));
			nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
		} else if (31 === tag) {
			fiber = fiber.memoizedState;
			fiber = null !== fiber ? fiber.dehydrated : null;
			if (!fiber) throw Error(formatProdErrorMessage(317));
			nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
		} else 27 === tag ? (tag = nextHydratableInstance, isSingletonScope(fiber.type) ? (fiber = previousHydratableOnEnteringScopedSingleton, previousHydratableOnEnteringScopedSingleton = null, nextHydratableInstance = fiber) : nextHydratableInstance = tag) : nextHydratableInstance = hydrationParentFiber ? getNextHydratable(fiber.stateNode.nextSibling) : null;
		return !0;
	}
	function resetHydrationState() {
		nextHydratableInstance = hydrationParentFiber = null;
		isHydrating = !1;
	}
	function upgradeHydrationErrorsToRecoverable() {
		var queuedErrors = hydrationErrors;
		null !== queuedErrors && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = queuedErrors : workInProgressRootRecoverableErrors.push.apply(workInProgressRootRecoverableErrors, queuedErrors), hydrationErrors = null);
		return queuedErrors;
	}
	function queueHydrationError(error) {
		null === hydrationErrors ? hydrationErrors = [error] : hydrationErrors.push(error);
	}
	var valueCursor = createCursor(null);
	var currentlyRenderingFiber$1 = null;
	var lastContextDependency = null;
	function pushProvider(providerFiber, context, nextValue) {
		push(valueCursor, context._currentValue);
		context._currentValue = nextValue;
	}
	function popProvider(context) {
		context._currentValue = valueCursor.current;
		pop(valueCursor);
	}
	function scheduleContextWorkOnParentPath(parent, renderLanes, propagationRoot) {
		for (; null !== parent;) {
			var alternate = parent.alternate;
			(parent.childLanes & renderLanes) !== renderLanes ? (parent.childLanes |= renderLanes, null !== alternate && (alternate.childLanes |= renderLanes)) : null !== alternate && (alternate.childLanes & renderLanes) !== renderLanes && (alternate.childLanes |= renderLanes);
			if (parent === propagationRoot) break;
			parent = parent.return;
		}
	}
	function propagateContextChanges(workInProgress, contexts, renderLanes, forcePropagateEntireTree) {
		var fiber = workInProgress.child;
		null !== fiber && (fiber.return = workInProgress);
		for (; null !== fiber;) {
			var list = fiber.dependencies;
			if (null !== list) {
				var nextFiber = fiber.child;
				list = list.firstContext;
				a: for (; null !== list;) {
					var dependency = list;
					list = fiber;
					for (var i = 0; i < contexts.length; i++) if (dependency.context === contexts[i]) {
						list.lanes |= renderLanes;
						dependency = list.alternate;
						null !== dependency && (dependency.lanes |= renderLanes);
						scheduleContextWorkOnParentPath(list.return, renderLanes, workInProgress);
						forcePropagateEntireTree || (nextFiber = null);
						break a;
					}
					list = dependency.next;
				}
			} else if (18 === fiber.tag) {
				nextFiber = fiber.return;
				if (null === nextFiber) throw Error(formatProdErrorMessage(341));
				nextFiber.lanes |= renderLanes;
				list = nextFiber.alternate;
				null !== list && (list.lanes |= renderLanes);
				scheduleContextWorkOnParentPath(nextFiber, renderLanes, workInProgress);
				nextFiber = null;
			} else 13 === fiber.tag && null !== fiber.memoizedState && null === fiber.memoizedState.dehydrated ? (fiber.lanes |= renderLanes, nextFiber = fiber.alternate, null !== nextFiber && (nextFiber.lanes |= renderLanes), scheduleContextWorkOnParentPath(fiber.return, renderLanes, workInProgress), nextFiber = fiber.child, nextFiber = null !== nextFiber ? nextFiber.sibling : null) : nextFiber = fiber.child;
			if (null !== nextFiber) nextFiber.return = fiber;
			else for (nextFiber = fiber; null !== nextFiber;) {
				if (nextFiber === workInProgress) {
					nextFiber = null;
					break;
				}
				fiber = nextFiber.sibling;
				if (null !== fiber) {
					fiber.return = nextFiber.return;
					nextFiber = fiber;
					break;
				}
				nextFiber = nextFiber.return;
			}
			fiber = nextFiber;
		}
	}
	function propagateParentContextChanges(current, workInProgress, renderLanes, forcePropagateEntireTree) {
		current = null;
		for (var parent = workInProgress, isInsidePropagationBailout = !1; null !== parent;) {
			if (!isInsidePropagationBailout) {
				if (0 !== (parent.flags & 524288)) isInsidePropagationBailout = !0;
				else if (0 !== (parent.flags & 262144)) break;
			}
			if (10 === parent.tag) {
				var currentParent = parent.alternate;
				if (null === currentParent) throw Error(formatProdErrorMessage(387));
				currentParent = currentParent.memoizedProps;
				if (null !== currentParent) {
					var context = parent.type;
					objectIs(parent.pendingProps.value, currentParent.value) || (null !== current ? current.push(context) : current = [context]);
				}
			} else if (parent === hostTransitionProviderCursor.current) {
				currentParent = parent.alternate;
				if (null === currentParent) throw Error(formatProdErrorMessage(387));
				currentParent.memoizedState.memoizedState !== parent.memoizedState.memoizedState && (null !== current ? current.push(HostTransitionContext) : current = [HostTransitionContext]);
			}
			parent = parent.return;
		}
		null !== current && propagateContextChanges(workInProgress, current, renderLanes, forcePropagateEntireTree);
		workInProgress.flags |= 262144;
		return null !== current;
	}
	function checkIfContextChanged(currentDependencies) {
		for (currentDependencies = currentDependencies.firstContext; null !== currentDependencies;) {
			if (!objectIs(currentDependencies.context._currentValue, currentDependencies.memoizedValue)) return !0;
			currentDependencies = currentDependencies.next;
		}
		return !1;
	}
	function prepareToReadContext(workInProgress) {
		currentlyRenderingFiber$1 = workInProgress;
		lastContextDependency = null;
		workInProgress = workInProgress.dependencies;
		null !== workInProgress && (workInProgress.firstContext = null);
	}
	function readContext(context) {
		return readContextForConsumer(currentlyRenderingFiber$1, context);
	}
	function readContextDuringReconciliation(consumer, context) {
		null === currentlyRenderingFiber$1 && prepareToReadContext(consumer);
		return readContextForConsumer(consumer, context);
	}
	function readContextForConsumer(consumer, context) {
		var value = context._currentValue;
		context = {
			context,
			memoizedValue: value,
			next: null
		};
		if (null === lastContextDependency) {
			if (null === consumer) throw Error(formatProdErrorMessage(308));
			lastContextDependency = context;
			consumer.dependencies = {
				lanes: 0,
				firstContext: context
			};
			consumer.flags |= 524288;
		} else lastContextDependency = lastContextDependency.next = context;
		return value;
	}
	var AbortControllerLocal = "undefined" !== typeof AbortController ? AbortController : function() {
		var listeners = [], signal = this.signal = {
			aborted: !1,
			addEventListener: function(type, listener) {
				listeners.push(listener);
			}
		};
		this.abort = function() {
			signal.aborted = !0;
			listeners.forEach(function(listener) {
				return listener();
			});
		};
	};
	var scheduleCallback$2 = Scheduler.unstable_scheduleCallback;
	var NormalPriority = Scheduler.unstable_NormalPriority;
	var CacheContext = {
		$$typeof: REACT_CONTEXT_TYPE,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function createCache() {
		return {
			controller: new AbortControllerLocal(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function releaseCache(cache) {
		cache.refCount--;
		0 === cache.refCount && scheduleCallback$2(NormalPriority, function() {
			cache.controller.abort();
		});
	}
	function queueTransitionTypes(root, transitionTypes) {
		if (0 !== (root.pendingLanes & 4194048)) {
			var queued = root.transitionTypes;
			null === queued && (queued = root.transitionTypes = []);
			for (root = 0; root < transitionTypes.length; root++) {
				var transitionType = transitionTypes[root];
				-1 === queued.indexOf(transitionType) && queued.push(transitionType);
			}
		}
	}
	var entangledTransitionTypes = null;
	function claimQueuedTransitionTypes(root) {
		var claimed = root.transitionTypes;
		root.transitionTypes = null;
		return claimed;
	}
	var currentEntangledListeners = null;
	var currentEntangledPendingCount = 0;
	var currentEntangledLane = 0;
	var currentEntangledActionThenable = null;
	function entangleAsyncAction(transition, thenable) {
		if (null === currentEntangledListeners) {
			var entangledListeners = currentEntangledListeners = [];
			currentEntangledPendingCount = 0;
			currentEntangledLane = requestTransitionLane();
			currentEntangledActionThenable = {
				status: "pending",
				value: void 0,
				then: function(resolve) {
					entangledListeners.push(resolve);
				}
			};
		}
		currentEntangledPendingCount++;
		thenable.then(pingEngtangledActionScope, pingEngtangledActionScope);
		return thenable;
	}
	function pingEngtangledActionScope() {
		if (0 === --currentEntangledPendingCount && (entangledTransitionTypes = null, null !== currentEntangledListeners)) {
			null !== currentEntangledActionThenable && (currentEntangledActionThenable.status = "fulfilled");
			var listeners = currentEntangledListeners;
			currentEntangledListeners = null;
			currentEntangledLane = 0;
			currentEntangledActionThenable = null;
			for (var i = 0; i < listeners.length; i++) (0, listeners[i])();
		}
	}
	function chainThenableValue(thenable, result) {
		var listeners = [], thenableWithOverride = {
			status: "pending",
			value: null,
			reason: null,
			then: function(resolve) {
				listeners.push(resolve);
			}
		};
		thenable.then(function() {
			thenableWithOverride.status = "fulfilled";
			thenableWithOverride.value = result;
			for (var i = 0; i < listeners.length; i++) (0, listeners[i])(result);
		}, function(error) {
			thenableWithOverride.status = "rejected";
			thenableWithOverride.reason = error;
			for (error = 0; error < listeners.length; error++) (0, listeners[error])(void 0);
		});
		return thenableWithOverride;
	}
	var prevOnStartTransitionFinish = ReactSharedInternals.S;
	ReactSharedInternals.S = function(transition, returnValue) {
		globalMostRecentTransitionTime = now();
		"object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && entangleAsyncAction(transition, returnValue);
		if (null !== entangledTransitionTypes) for (var root$28 = firstScheduledRoot; null !== root$28;) queueTransitionTypes(root$28, entangledTransitionTypes), root$28 = root$28.next;
		root$28 = transition.types;
		if (null !== root$28) {
			for (var root$29 = firstScheduledRoot; null !== root$29;) queueTransitionTypes(root$29, root$28), root$29 = root$29.next;
			if (0 !== currentEntangledLane) {
				root$29 = entangledTransitionTypes;
				null === root$29 && (root$29 = entangledTransitionTypes = []);
				for (var i = 0; i < root$28.length; i++) {
					var transitionType = root$28[i];
					-1 === root$29.indexOf(transitionType) && root$29.push(transitionType);
				}
			}
		}
		null !== prevOnStartTransitionFinish && prevOnStartTransitionFinish(transition, returnValue);
	};
	var resumedCache = createCursor(null);
	function peekCacheFromPool() {
		var cacheResumedFromPreviousRender = resumedCache.current;
		return null !== cacheResumedFromPreviousRender ? cacheResumedFromPreviousRender : workInProgressRoot.pooledCache;
	}
	function pushTransition(offscreenWorkInProgress, prevCachePool) {
		null === prevCachePool ? push(resumedCache, resumedCache.current) : push(resumedCache, prevCachePool.pool);
	}
	function getSuspendedCache() {
		var cacheFromPool = peekCacheFromPool();
		return null === cacheFromPool ? null : {
			parent: CacheContext._currentValue,
			pool: cacheFromPool
		};
	}
	var SuspenseException = Error(formatProdErrorMessage(460));
	var SuspenseyCommitException = Error(formatProdErrorMessage(474));
	var SuspenseActionException = Error(formatProdErrorMessage(542));
	var noopSuspenseyCommitThenable = { then: function() {} };
	function isThenableResolved(thenable) {
		thenable = thenable.status;
		return "fulfilled" === thenable || "rejected" === thenable;
	}
	function trackUsedThenable(thenableState, thenable, index) {
		index = thenableState[index];
		void 0 === index ? thenableState.push(thenable) : index !== thenable && (thenable.then(noop$1, noop$1), thenable = index);
		switch (thenable.status) {
			case "fulfilled": return thenable.value;
			case "rejected":
				thenableState = thenable.reason;
				checkIfUseWrappedInAsyncCatch(thenableState);
				if (void 0 === thenableState && !("reason" in thenable)) throw Error(formatProdErrorMessage(600));
				throw thenableState;
			default:
				if ("string" === typeof thenable.status) thenable.then(noop$1, noop$1);
				else {
					thenableState = workInProgressRoot;
					if (null !== thenableState && 100 < thenableState.shellSuspendCounter) throw Error(formatProdErrorMessage(482));
					thenableState = thenable;
					thenableState.status = "pending";
					thenableState.then(function(fulfilledValue) {
						if ("pending" === thenable.status) {
							var fulfilledThenable = thenable;
							fulfilledThenable.status = "fulfilled";
							fulfilledThenable.value = fulfilledValue;
						}
					}, function(error) {
						if ("pending" === thenable.status) {
							var rejectedThenable = thenable;
							rejectedThenable.status = "rejected";
							rejectedThenable.reason = error;
						}
					});
				}
				switch (thenable.status) {
					case "fulfilled": return thenable.value;
					case "rejected": throw thenableState = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState), thenableState;
				}
				suspendedThenable = thenable;
				throw SuspenseException;
		}
	}
	function resolveLazy(lazyType) {
		try {
			var init = lazyType._init;
			return init(lazyType._payload);
		} catch (x) {
			if (null !== x && "object" === typeof x && "function" === typeof x.then) throw suspendedThenable = x, SuspenseException;
			throw x;
		}
	}
	var suspendedThenable = null;
	function getSuspendedThenable() {
		if (null === suspendedThenable) throw Error(formatProdErrorMessage(459));
		var thenable = suspendedThenable;
		suspendedThenable = null;
		return thenable;
	}
	function checkIfUseWrappedInAsyncCatch(rejectedReason) {
		if (rejectedReason === SuspenseException || rejectedReason === SuspenseActionException) throw Error(formatProdErrorMessage(483));
	}
	var thenableState$1 = null;
	var thenableIndexCounter$1 = 0;
	function unwrapThenable(thenable) {
		var index = thenableIndexCounter$1;
		thenableIndexCounter$1 += 1;
		null === thenableState$1 && (thenableState$1 = []);
		return trackUsedThenable(thenableState$1, thenable, index);
	}
	function coerceRef(workInProgress, element) {
		element = element.props.ref;
		workInProgress.ref = void 0 !== element ? element : null;
	}
	function throwOnInvalidObjectTypeImpl(returnFiber, newChild) {
		if (newChild.$$typeof === REACT_LEGACY_ELEMENT_TYPE) throw Error(formatProdErrorMessage(525));
		returnFiber = Object.prototype.toString.call(newChild);
		throw Error(formatProdErrorMessage(31, "[object Object]" === returnFiber ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : returnFiber));
	}
	function createChildReconciler(shouldTrackSideEffects) {
		function deleteChild(returnFiber, childToDelete) {
			if (shouldTrackSideEffects) {
				var deletions = returnFiber.deletions;
				null === deletions ? (returnFiber.deletions = [childToDelete], returnFiber.flags |= 16) : deletions.push(childToDelete);
			}
		}
		function deleteRemainingChildren(returnFiber, currentFirstChild) {
			if (!shouldTrackSideEffects) return null;
			for (; null !== currentFirstChild;) deleteChild(returnFiber, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
			return null;
		}
		function mapRemainingChildren(currentFirstChild) {
			for (var existingChildren = /* @__PURE__ */ new Map(); null !== currentFirstChild;) null === currentFirstChild.key ? existingChildren.set(currentFirstChild.index, currentFirstChild) : existingChildren.set(currentFirstChild.key, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
			return existingChildren;
		}
		function useFiber(fiber, pendingProps) {
			fiber = createWorkInProgress(fiber, pendingProps);
			fiber.index = 0;
			fiber.sibling = null;
			return fiber;
		}
		function placeChild(newFiber, lastPlacedIndex, newIndex) {
			newFiber.index = newIndex;
			if (!shouldTrackSideEffects) return newFiber.flags |= 1048576, lastPlacedIndex;
			newIndex = newFiber.alternate;
			if (null !== newIndex) return newIndex = newIndex.index, newIndex < lastPlacedIndex ? (newFiber.flags |= 2, lastPlacedIndex) : newIndex;
			newFiber.flags |= 134217730;
			return lastPlacedIndex;
		}
		function placeSingleChild(newFiber) {
			shouldTrackSideEffects && null === newFiber.alternate && (newFiber.flags |= 134217730);
			return newFiber;
		}
		function updateTextNode(returnFiber, current, textContent, lanes) {
			if (null === current || 6 !== current.tag) return current = createFiberFromText(textContent, returnFiber.mode, lanes), current.return = returnFiber, current;
			current = useFiber(current, textContent);
			current.return = returnFiber;
			return current;
		}
		function updateElement(returnFiber, current, element, lanes) {
			var elementType = element.type;
			if (elementType === REACT_FRAGMENT_TYPE) return returnFiber = updateFragment(returnFiber, current, element.props.children, lanes, element.key), coerceRef(returnFiber, element), returnFiber;
			if (null !== current && (current.elementType === elementType || "object" === typeof elementType && null !== elementType && elementType.$$typeof === REACT_LAZY_TYPE && resolveLazy(elementType) === current.type)) return current = useFiber(current, element.props), coerceRef(current, element), current.return = returnFiber, current;
			current = createFiberFromTypeAndProps(element.type, element.key, element.props, null, returnFiber.mode, lanes);
			coerceRef(current, element);
			current.return = returnFiber;
			return current;
		}
		function updatePortal(returnFiber, current, portal, lanes) {
			if (null === current || 4 !== current.tag || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation) return current = createFiberFromPortal(portal, returnFiber.mode, lanes), current.return = returnFiber, current;
			current = useFiber(current, portal.children || []);
			current.return = returnFiber;
			return current;
		}
		function updateFragment(returnFiber, current, fragment, lanes, key) {
			if (null === current || 7 !== current.tag) return current = createFiberFromFragment(fragment, returnFiber.mode, lanes, key), current.return = returnFiber, current;
			current = useFiber(current, fragment);
			current.return = returnFiber;
			return current;
		}
		function createChild(returnFiber, newChild, lanes) {
			if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild) return newChild = createFiberFromText("" + newChild, returnFiber.mode, lanes), newChild.return = returnFiber, newChild;
			if ("object" === typeof newChild && null !== newChild) {
				switch (newChild.$$typeof) {
					case REACT_ELEMENT_TYPE: return lanes = createFiberFromTypeAndProps(newChild.type, newChild.key, newChild.props, null, returnFiber.mode, lanes), coerceRef(lanes, newChild), lanes.return = returnFiber, lanes;
					case REACT_PORTAL_TYPE: return newChild = createFiberFromPortal(newChild, returnFiber.mode, lanes), newChild.return = returnFiber, newChild;
					case REACT_LAZY_TYPE: return newChild = resolveLazy(newChild), createChild(returnFiber, newChild, lanes);
				}
				if (isArrayImpl(newChild) || getIteratorFn(newChild)) return newChild = createFiberFromFragment(newChild, returnFiber.mode, lanes, null), newChild.return = returnFiber, newChild;
				if ("function" === typeof newChild.then) return createChild(returnFiber, unwrapThenable(newChild), lanes);
				if (newChild.$$typeof === REACT_CONTEXT_TYPE) return createChild(returnFiber, readContextDuringReconciliation(returnFiber, newChild), lanes);
				throwOnInvalidObjectTypeImpl(returnFiber, newChild);
			}
			return null;
		}
		function updateSlot(returnFiber, oldFiber, newChild, lanes) {
			var key = null !== oldFiber ? oldFiber.key : null;
			if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild) return null !== key ? null : updateTextNode(returnFiber, oldFiber, "" + newChild, lanes);
			if ("object" === typeof newChild && null !== newChild) {
				switch (newChild.$$typeof) {
					case REACT_ELEMENT_TYPE: return newChild.key === key ? updateElement(returnFiber, oldFiber, newChild, lanes) : null;
					case REACT_PORTAL_TYPE: return newChild.key === key ? updatePortal(returnFiber, oldFiber, newChild, lanes) : null;
					case REACT_LAZY_TYPE: return newChild = resolveLazy(newChild), updateSlot(returnFiber, oldFiber, newChild, lanes);
				}
				if (isArrayImpl(newChild) || getIteratorFn(newChild)) return null !== key ? null : updateFragment(returnFiber, oldFiber, newChild, lanes, null);
				if ("function" === typeof newChild.then) return updateSlot(returnFiber, oldFiber, unwrapThenable(newChild), lanes);
				if (newChild.$$typeof === REACT_CONTEXT_TYPE) return updateSlot(returnFiber, oldFiber, readContextDuringReconciliation(returnFiber, newChild), lanes);
				throwOnInvalidObjectTypeImpl(returnFiber, newChild);
			}
			return null;
		}
		function updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes) {
			if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild) return existingChildren = existingChildren.get(newIdx) || null, updateTextNode(returnFiber, existingChildren, "" + newChild, lanes);
			if ("object" === typeof newChild && null !== newChild) {
				switch (newChild.$$typeof) {
					case REACT_ELEMENT_TYPE: return existingChildren = existingChildren.get(null === newChild.key ? newIdx : newChild.key) || null, updateElement(returnFiber, existingChildren, newChild, lanes);
					case REACT_PORTAL_TYPE: return existingChildren = existingChildren.get(null === newChild.key ? newIdx : newChild.key) || null, updatePortal(returnFiber, existingChildren, newChild, lanes);
					case REACT_LAZY_TYPE: return newChild = resolveLazy(newChild), updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes);
				}
				if (isArrayImpl(newChild) || getIteratorFn(newChild)) return existingChildren = existingChildren.get(newIdx) || null, updateFragment(returnFiber, existingChildren, newChild, lanes, null);
				if ("function" === typeof newChild.then) return updateFromMap(existingChildren, returnFiber, newIdx, unwrapThenable(newChild), lanes);
				if (newChild.$$typeof === REACT_CONTEXT_TYPE) return updateFromMap(existingChildren, returnFiber, newIdx, readContextDuringReconciliation(returnFiber, newChild), lanes);
				throwOnInvalidObjectTypeImpl(returnFiber, newChild);
			}
			return null;
		}
		function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
			for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null; null !== oldFiber && newIdx < newChildren.length; newIdx++) {
				oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
				var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], lanes);
				if (null === newFiber) {
					null === oldFiber && (oldFiber = nextOldFiber);
					break;
				}
				shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
				currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
				null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
				previousNewFiber = newFiber;
				oldFiber = nextOldFiber;
			}
			if (newIdx === newChildren.length) return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
			if (null === oldFiber) {
				for (; newIdx < newChildren.length; newIdx++) oldFiber = createChild(returnFiber, newChildren[newIdx], lanes), null !== oldFiber && (currentFirstChild = placeChild(oldFiber, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
				isHydrating && pushTreeFork(returnFiber, newIdx);
				return resultingFirstChild;
			}
			for (oldFiber = mapRemainingChildren(oldFiber); newIdx < newChildren.length; newIdx++) nextOldFiber = updateFromMap(oldFiber, returnFiber, newIdx, newChildren[newIdx], lanes), null !== nextOldFiber && (shouldTrackSideEffects && (newFiber = nextOldFiber.alternate, null !== newFiber && oldFiber.delete(null === newFiber.key ? newIdx : newFiber.key)), currentFirstChild = placeChild(nextOldFiber, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
			shouldTrackSideEffects && oldFiber.forEach(function(child) {
				return deleteChild(returnFiber, child);
			});
			isHydrating && pushTreeFork(returnFiber, newIdx);
			return resultingFirstChild;
		}
		function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildren, lanes) {
			if (null == newChildren) throw Error(formatProdErrorMessage(151));
			for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null, step = newChildren.next(); null !== oldFiber && !step.done; newIdx++, step = newChildren.next()) {
				oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
				var newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
				if (null === newFiber) {
					null === oldFiber && (oldFiber = nextOldFiber);
					break;
				}
				shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
				currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
				null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
				previousNewFiber = newFiber;
				oldFiber = nextOldFiber;
			}
			if (step.done) return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
			if (null === oldFiber) {
				for (; !step.done; newIdx++, step = newChildren.next()) step = createChild(returnFiber, step.value, lanes), null !== step && (currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
				isHydrating && pushTreeFork(returnFiber, newIdx);
				return resultingFirstChild;
			}
			for (oldFiber = mapRemainingChildren(oldFiber); !step.done; newIdx++, step = newChildren.next()) step = updateFromMap(oldFiber, returnFiber, newIdx, step.value, lanes), null !== step && (shouldTrackSideEffects && (nextOldFiber = step.alternate, null !== nextOldFiber && oldFiber.delete(null === nextOldFiber.key ? newIdx : nextOldFiber.key)), currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
			shouldTrackSideEffects && oldFiber.forEach(function(child) {
				return deleteChild(returnFiber, child);
			});
			isHydrating && pushTreeFork(returnFiber, newIdx);
			return resultingFirstChild;
		}
		function reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes) {
			"object" === typeof newChild && null !== newChild && newChild.type === REACT_FRAGMENT_TYPE && null === newChild.key && void 0 === newChild.props.ref && (newChild = newChild.props.children);
			if ("object" === typeof newChild && null !== newChild) {
				switch (newChild.$$typeof) {
					case REACT_ELEMENT_TYPE:
						a: {
							for (var key = newChild.key; null !== currentFirstChild;) {
								if (currentFirstChild.key === key) {
									key = newChild.type;
									if (key === REACT_FRAGMENT_TYPE) {
										if (7 === currentFirstChild.tag) {
											deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
											lanes = useFiber(currentFirstChild, newChild.props.children);
											coerceRef(lanes, newChild);
											lanes.return = returnFiber;
											returnFiber = lanes;
											break a;
										}
									} else if (currentFirstChild.elementType === key || "object" === typeof key && null !== key && key.$$typeof === REACT_LAZY_TYPE && resolveLazy(key) === currentFirstChild.type) {
										deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
										lanes = useFiber(currentFirstChild, newChild.props);
										coerceRef(lanes, newChild);
										lanes.return = returnFiber;
										returnFiber = lanes;
										break a;
									}
									deleteRemainingChildren(returnFiber, currentFirstChild);
									break;
								} else deleteChild(returnFiber, currentFirstChild);
								currentFirstChild = currentFirstChild.sibling;
							}
							newChild.type === REACT_FRAGMENT_TYPE ? (lanes = createFiberFromFragment(newChild.props.children, returnFiber.mode, lanes, newChild.key), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes) : (lanes = createFiberFromTypeAndProps(newChild.type, newChild.key, newChild.props, null, returnFiber.mode, lanes), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes);
						}
						return placeSingleChild(returnFiber);
					case REACT_PORTAL_TYPE:
						a: {
							for (key = newChild.key; null !== currentFirstChild;) {
								if (currentFirstChild.key === key) if (4 === currentFirstChild.tag && currentFirstChild.stateNode.containerInfo === newChild.containerInfo && currentFirstChild.stateNode.implementation === newChild.implementation) {
									deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
									lanes = useFiber(currentFirstChild, newChild.children || []);
									lanes.return = returnFiber;
									returnFiber = lanes;
									break a;
								} else {
									deleteRemainingChildren(returnFiber, currentFirstChild);
									break;
								}
								else deleteChild(returnFiber, currentFirstChild);
								currentFirstChild = currentFirstChild.sibling;
							}
							lanes = createFiberFromPortal(newChild, returnFiber.mode, lanes);
							lanes.return = returnFiber;
							returnFiber = lanes;
						}
						return placeSingleChild(returnFiber);
					case REACT_LAZY_TYPE: return newChild = resolveLazy(newChild), reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes);
				}
				if (isArrayImpl(newChild)) return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, lanes);
				if (getIteratorFn(newChild)) {
					key = getIteratorFn(newChild);
					if ("function" !== typeof key) throw Error(formatProdErrorMessage(150));
					newChild = key.call(newChild);
					return reconcileChildrenIterator(returnFiber, currentFirstChild, newChild, lanes);
				}
				if ("function" === typeof newChild.then) return reconcileChildFibersImpl(returnFiber, currentFirstChild, unwrapThenable(newChild), lanes);
				if (newChild.$$typeof === REACT_CONTEXT_TYPE) return reconcileChildFibersImpl(returnFiber, currentFirstChild, readContextDuringReconciliation(returnFiber, newChild), lanes);
				throwOnInvalidObjectTypeImpl(returnFiber, newChild);
			}
			return "string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild ? (newChild = "" + newChild, null !== currentFirstChild && 6 === currentFirstChild.tag ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling), lanes = useFiber(currentFirstChild, newChild), lanes.return = returnFiber, returnFiber = lanes) : (deleteRemainingChildren(returnFiber, currentFirstChild), lanes = createFiberFromText(newChild, returnFiber.mode, lanes), lanes.return = returnFiber, returnFiber = lanes), placeSingleChild(returnFiber)) : deleteRemainingChildren(returnFiber, currentFirstChild);
		}
		return function(returnFiber, currentFirstChild, newChild, lanes) {
			try {
				thenableIndexCounter$1 = 0;
				var firstChildFiber = reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes);
				thenableState$1 = null;
				return firstChildFiber;
			} catch (x) {
				if (x === SuspenseException || x === SuspenseActionException) throw x;
				var fiber = createFiberImplClass(29, x, null, returnFiber.mode);
				fiber.lanes = lanes;
				fiber.return = returnFiber;
				return fiber;
			}
		};
	}
	var reconcileChildFibers = createChildReconciler(!0);
	var mountChildFibers = createChildReconciler(!1);
	var hasForceUpdate = !1;
	function initializeUpdateQueue(fiber) {
		fiber.updateQueue = {
			baseState: fiber.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function cloneUpdateQueue(current, workInProgress) {
		current = current.updateQueue;
		workInProgress.updateQueue === current && (workInProgress.updateQueue = {
			baseState: current.baseState,
			firstBaseUpdate: current.firstBaseUpdate,
			lastBaseUpdate: current.lastBaseUpdate,
			shared: current.shared,
			callbacks: null
		});
	}
	function createUpdate(lane) {
		return {
			lane,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function enqueueUpdate(fiber, update, lane) {
		var updateQueue = fiber.updateQueue;
		if (null === updateQueue) return null;
		updateQueue = updateQueue.shared;
		if (0 !== (executionContext & 2)) {
			var pending = updateQueue.pending;
			null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
			updateQueue.pending = update;
			update = getRootForUpdatedFiber(fiber);
			markUpdateLaneFromFiberToRoot(fiber, null, lane);
			return update;
		}
		enqueueUpdate$1(fiber, updateQueue, update, lane);
		return getRootForUpdatedFiber(fiber);
	}
	function entangleTransitions(root, fiber, lane) {
		fiber = fiber.updateQueue;
		if (null !== fiber && (fiber = fiber.shared, 0 !== (lane & 4194048))) {
			var queueLanes = fiber.lanes;
			queueLanes &= root.pendingLanes;
			lane |= queueLanes;
			fiber.lanes = lane;
			markRootEntangled(root, lane);
		}
	}
	function enqueueCapturedUpdate(workInProgress, capturedUpdate) {
		var queue = workInProgress.updateQueue, current = workInProgress.alternate;
		if (null !== current && (current = current.updateQueue, queue === current)) {
			var newFirst = null, newLast = null;
			queue = queue.firstBaseUpdate;
			if (null !== queue) {
				do {
					var clone = {
						lane: queue.lane,
						tag: queue.tag,
						payload: queue.payload,
						callback: null,
						next: null
					};
					null === newLast ? newFirst = newLast = clone : newLast = newLast.next = clone;
					queue = queue.next;
				} while (null !== queue);
				null === newLast ? newFirst = newLast = capturedUpdate : newLast = newLast.next = capturedUpdate;
			} else newFirst = newLast = capturedUpdate;
			queue = {
				baseState: current.baseState,
				firstBaseUpdate: newFirst,
				lastBaseUpdate: newLast,
				shared: current.shared,
				callbacks: current.callbacks
			};
			workInProgress.updateQueue = queue;
			return;
		}
		workInProgress = queue.lastBaseUpdate;
		null === workInProgress ? queue.firstBaseUpdate = capturedUpdate : workInProgress.next = capturedUpdate;
		queue.lastBaseUpdate = capturedUpdate;
	}
	var didReadFromEntangledAsyncAction = !1;
	function suspendIfUpdateReadFromEntangledAsyncAction() {
		if (didReadFromEntangledAsyncAction) {
			var entangledActionThenable = currentEntangledActionThenable;
			if (null !== entangledActionThenable) throw entangledActionThenable;
		}
	}
	function processUpdateQueue(workInProgress$jscomp$0, props, instance$jscomp$0, renderLanes) {
		didReadFromEntangledAsyncAction = !1;
		var queue = workInProgress$jscomp$0.updateQueue;
		hasForceUpdate = !1;
		var firstBaseUpdate = queue.firstBaseUpdate, lastBaseUpdate = queue.lastBaseUpdate, pendingQueue = queue.shared.pending;
		if (null !== pendingQueue) {
			queue.shared.pending = null;
			var lastPendingUpdate = pendingQueue, firstPendingUpdate = lastPendingUpdate.next;
			lastPendingUpdate.next = null;
			null === lastBaseUpdate ? firstBaseUpdate = firstPendingUpdate : lastBaseUpdate.next = firstPendingUpdate;
			lastBaseUpdate = lastPendingUpdate;
			var current = workInProgress$jscomp$0.alternate;
			null !== current && (current = current.updateQueue, pendingQueue = current.lastBaseUpdate, pendingQueue !== lastBaseUpdate && (null === pendingQueue ? current.firstBaseUpdate = firstPendingUpdate : pendingQueue.next = firstPendingUpdate, current.lastBaseUpdate = lastPendingUpdate));
		}
		if (null !== firstBaseUpdate) {
			var newState = queue.baseState;
			lastBaseUpdate = 0;
			current = firstPendingUpdate = lastPendingUpdate = null;
			pendingQueue = firstBaseUpdate;
			do {
				var updateLane = pendingQueue.lane & -536870913, isHiddenUpdate = updateLane !== pendingQueue.lane;
				if (isHiddenUpdate ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes & updateLane) === updateLane) {
					0 !== updateLane && updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction = !0);
					null !== current && (current = current.next = {
						lane: 0,
						tag: pendingQueue.tag,
						payload: pendingQueue.payload,
						callback: null,
						next: null
					});
					a: {
						var workInProgress = workInProgress$jscomp$0, update = pendingQueue;
						updateLane = props;
						var instance = instance$jscomp$0;
						switch (update.tag) {
							case 1:
								workInProgress = update.payload;
								if ("function" === typeof workInProgress) {
									newState = workInProgress.call(instance, newState, updateLane);
									break a;
								}
								newState = workInProgress;
								break a;
							case 3: workInProgress.flags = workInProgress.flags & -65537 | 128;
							case 0:
								workInProgress = update.payload;
								updateLane = "function" === typeof workInProgress ? workInProgress.call(instance, newState, updateLane) : workInProgress;
								if (null === updateLane || void 0 === updateLane) break a;
								newState = assign({}, newState, updateLane);
								break a;
							case 2: hasForceUpdate = !0;
						}
					}
					updateLane = pendingQueue.callback;
					null !== updateLane && (workInProgress$jscomp$0.flags |= 64, isHiddenUpdate && (workInProgress$jscomp$0.flags |= 8192), isHiddenUpdate = queue.callbacks, null === isHiddenUpdate ? queue.callbacks = [updateLane] : isHiddenUpdate.push(updateLane));
				} else isHiddenUpdate = {
					lane: updateLane,
					tag: pendingQueue.tag,
					payload: pendingQueue.payload,
					callback: pendingQueue.callback,
					next: null
				}, null === current ? (firstPendingUpdate = current = isHiddenUpdate, lastPendingUpdate = newState) : current = current.next = isHiddenUpdate, lastBaseUpdate |= updateLane;
				pendingQueue = pendingQueue.next;
				if (null === pendingQueue) if (pendingQueue = queue.shared.pending, null === pendingQueue) break;
				else isHiddenUpdate = pendingQueue, pendingQueue = isHiddenUpdate.next, isHiddenUpdate.next = null, queue.lastBaseUpdate = isHiddenUpdate, queue.shared.pending = null;
			} while (1);
			null === current && (lastPendingUpdate = newState);
			queue.baseState = lastPendingUpdate;
			queue.firstBaseUpdate = firstPendingUpdate;
			queue.lastBaseUpdate = current;
			null === firstBaseUpdate && (queue.shared.lanes = 0);
			workInProgressRootSkippedLanes |= lastBaseUpdate;
			workInProgress$jscomp$0.lanes = lastBaseUpdate;
			workInProgress$jscomp$0.memoizedState = newState;
		}
	}
	function callCallback(callback, context) {
		if ("function" !== typeof callback) throw Error(formatProdErrorMessage(191, callback));
		callback.call(context);
	}
	function commitCallbacks(updateQueue, context) {
		var callbacks = updateQueue.callbacks;
		if (null !== callbacks) for (updateQueue.callbacks = null, updateQueue = 0; updateQueue < callbacks.length; updateQueue++) callCallback(callbacks[updateQueue], context);
	}
	var currentTreeHiddenStackCursor = createCursor(null);
	var prevEntangledRenderLanesCursor = createCursor(0);
	function pushHiddenContext(fiber, context) {
		fiber = entangledRenderLanes;
		push(prevEntangledRenderLanesCursor, fiber);
		push(currentTreeHiddenStackCursor, context);
		entangledRenderLanes = fiber | context.baseLanes;
	}
	function reuseHiddenContextOnStack() {
		push(prevEntangledRenderLanesCursor, entangledRenderLanes);
		push(currentTreeHiddenStackCursor, currentTreeHiddenStackCursor.current);
	}
	function popHiddenContext() {
		entangledRenderLanes = prevEntangledRenderLanesCursor.current;
		pop(currentTreeHiddenStackCursor);
		pop(prevEntangledRenderLanesCursor);
	}
	var suspenseHandlerStackCursor = createCursor(null);
	var shellBoundary = null;
	function pushPrimaryTreeSuspenseHandler(handler) {
		var current = handler.alternate;
		push(suspenseStackCursor, suspenseStackCursor.current & 1);
		push(suspenseHandlerStackCursor, handler);
		null === shellBoundary && (null === current || null !== currentTreeHiddenStackCursor.current ? shellBoundary = handler : null !== current.memoizedState && (shellBoundary = handler));
	}
	function pushDehydratedActivitySuspenseHandler(fiber) {
		push(suspenseStackCursor, suspenseStackCursor.current);
		push(suspenseHandlerStackCursor, fiber);
		null === shellBoundary && (shellBoundary = fiber);
	}
	function pushOffscreenSuspenseHandler(fiber) {
		22 === fiber.tag ? (push(suspenseStackCursor, suspenseStackCursor.current), push(suspenseHandlerStackCursor, fiber), null === shellBoundary && (shellBoundary = fiber)) : reuseSuspenseHandlerOnStack();
	}
	function reuseSuspenseHandlerOnStack() {
		push(suspenseStackCursor, suspenseStackCursor.current);
		push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current);
	}
	function popSuspenseHandler(fiber) {
		pop(suspenseHandlerStackCursor);
		shellBoundary === fiber && (shellBoundary = null);
		pop(suspenseStackCursor);
	}
	var suspenseStackCursor = createCursor(0);
	function pushSuspenseListContext(fiber, newContext) {
		push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current);
		push(suspenseStackCursor, newContext);
	}
	function popSuspenseListContext(fiber) {
		pop(suspenseStackCursor);
		pop(suspenseHandlerStackCursor);
		shellBoundary === fiber && (shellBoundary = null);
	}
	function findFirstSuspended(row) {
		for (var node = row; null !== node;) {
			if (13 === node.tag) {
				var state = node.memoizedState;
				if (null !== state && (state = state.dehydrated, null === state || isSuspenseInstancePending(state) || isSuspenseInstanceFallback(state))) return node;
			} else if (19 === node.tag && "independent" !== node.memoizedProps.revealOrder) {
				if (0 !== (node.flags & 128)) return node;
			} else if (null !== node.child) {
				node.child.return = node;
				node = node.child;
				continue;
			}
			if (node === row) break;
			for (; null === node.sibling;) {
				if (null === node.return || node.return === row) return null;
				node = node.return;
			}
			node.sibling.return = node.return;
			node = node.sibling;
		}
		return null;
	}
	var renderLanes = 0;
	var currentlyRenderingFiber = null;
	var currentHook = null;
	var workInProgressHook = null;
	var didScheduleRenderPhaseUpdate = !1;
	var didScheduleRenderPhaseUpdateDuringThisPass = !1;
	var shouldDoubleInvokeUserFnsInHooksDEV = !1;
	var localIdCounter = 0;
	var thenableIndexCounter = 0;
	var thenableState = null;
	var globalClientIdCounter = 0;
	function throwInvalidHookError() {
		throw Error(formatProdErrorMessage(321));
	}
	function areHookInputsEqual(nextDeps, prevDeps) {
		if (null === prevDeps) return !1;
		for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) if (!objectIs(nextDeps[i], prevDeps[i])) return !1;
		return !0;
	}
	function renderWithHooks(current, workInProgress, Component, props, secondArg, nextRenderLanes) {
		renderLanes = nextRenderLanes;
		currentlyRenderingFiber = workInProgress;
		workInProgress.memoizedState = null;
		workInProgress.updateQueue = null;
		workInProgress.lanes = 0;
		ReactSharedInternals.H = null === current || null === current.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
		shouldDoubleInvokeUserFnsInHooksDEV = !1;
		nextRenderLanes = Component(props, secondArg);
		shouldDoubleInvokeUserFnsInHooksDEV = !1;
		didScheduleRenderPhaseUpdateDuringThisPass && (nextRenderLanes = renderWithHooksAgain(workInProgress, Component, props, secondArg));
		finishRenderingHooks(current);
		return nextRenderLanes;
	}
	function finishRenderingHooks(current) {
		ReactSharedInternals.H = ContextOnlyDispatcher;
		var didRenderTooFewHooks = null !== currentHook && null !== currentHook.next;
		renderLanes = 0;
		workInProgressHook = currentHook = currentlyRenderingFiber = null;
		didScheduleRenderPhaseUpdate = !1;
		thenableIndexCounter = 0;
		thenableState = null;
		if (didRenderTooFewHooks) throw Error(formatProdErrorMessage(300));
		null === current || didReceiveUpdate || (current = current.dependencies, null !== current && checkIfContextChanged(current) && (didReceiveUpdate = !0));
	}
	function renderWithHooksAgain(workInProgress, Component, props, secondArg) {
		currentlyRenderingFiber = workInProgress;
		var numberOfReRenders = 0;
		do {
			didScheduleRenderPhaseUpdateDuringThisPass && (thenableState = null);
			thenableIndexCounter = 0;
			didScheduleRenderPhaseUpdateDuringThisPass = !1;
			if (25 <= numberOfReRenders) throw Error(formatProdErrorMessage(301));
			numberOfReRenders += 1;
			workInProgressHook = currentHook = null;
			if (null != workInProgress.updateQueue) {
				var children = workInProgress.updateQueue;
				children.lastEffect = null;
				children.events = null;
				children.stores = null;
				null != children.memoCache && (children.memoCache.index = 0);
			}
			ReactSharedInternals.H = HooksDispatcherOnRerender;
			children = Component(props, secondArg);
		} while (didScheduleRenderPhaseUpdateDuringThisPass);
		return children;
	}
	function TransitionAwareHostComponent() {
		var dispatcher = ReactSharedInternals.H, maybeThenable = dispatcher.useState()[0];
		maybeThenable = "function" === typeof maybeThenable.then ? useThenable(maybeThenable) : maybeThenable;
		dispatcher = dispatcher.useState()[0];
		(null !== currentHook ? currentHook.memoizedState : null) !== dispatcher && (currentlyRenderingFiber.flags |= 1024);
		return maybeThenable;
	}
	function checkDidRenderIdHook() {
		var didRenderIdHook = 0 !== localIdCounter;
		localIdCounter = 0;
		return didRenderIdHook;
	}
	function bailoutHooks(current, workInProgress, lanes) {
		workInProgress.updateQueue = current.updateQueue;
		workInProgress.flags &= -2053;
		current.lanes &= ~lanes;
	}
	function resetHooksOnUnwind(workInProgress) {
		if (didScheduleRenderPhaseUpdate) {
			for (workInProgress = workInProgress.memoizedState; null !== workInProgress;) {
				var queue = workInProgress.queue;
				null !== queue && (queue.pending = null);
				workInProgress = workInProgress.next;
			}
			didScheduleRenderPhaseUpdate = !1;
		}
		renderLanes = 0;
		workInProgressHook = currentHook = currentlyRenderingFiber = null;
		didScheduleRenderPhaseUpdateDuringThisPass = !1;
		thenableIndexCounter = localIdCounter = 0;
		thenableState = null;
	}
	function mountWorkInProgressHook() {
		var hook = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = hook : workInProgressHook = workInProgressHook.next = hook;
		return workInProgressHook;
	}
	function updateWorkInProgressHook() {
		if (null === currentHook) {
			var nextCurrentHook = currentlyRenderingFiber.alternate;
			nextCurrentHook = null !== nextCurrentHook ? nextCurrentHook.memoizedState : null;
		} else nextCurrentHook = currentHook.next;
		var nextWorkInProgressHook = null === workInProgressHook ? currentlyRenderingFiber.memoizedState : workInProgressHook.next;
		if (null !== nextWorkInProgressHook) workInProgressHook = nextWorkInProgressHook, currentHook = nextCurrentHook;
		else {
			if (null === nextCurrentHook) {
				if (null === currentlyRenderingFiber.alternate) throw Error(formatProdErrorMessage(467));
				throw Error(formatProdErrorMessage(310));
			}
			currentHook = nextCurrentHook;
			nextCurrentHook = {
				memoizedState: currentHook.memoizedState,
				baseState: currentHook.baseState,
				baseQueue: currentHook.baseQueue,
				queue: currentHook.queue,
				next: null
			};
			null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = nextCurrentHook : workInProgressHook = workInProgressHook.next = nextCurrentHook;
		}
		return workInProgressHook;
	}
	function createFunctionComponentUpdateQueue() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function useThenable(thenable) {
		var index = thenableIndexCounter;
		thenableIndexCounter += 1;
		null === thenableState && (thenableState = []);
		thenable = trackUsedThenable(thenableState, thenable, index);
		index = currentlyRenderingFiber;
		null === (null === workInProgressHook ? index.memoizedState : workInProgressHook.next) && (index = index.alternate, ReactSharedInternals.H = null === index || null === index.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate);
		return thenable;
	}
	function use(usable) {
		if (null !== usable && "object" === typeof usable) {
			if ("function" === typeof usable.then) return useThenable(usable);
			if (usable.$$typeof === REACT_RECOVERABLE_TYPE) return;
			if (usable.$$typeof === REACT_CONTEXT_TYPE) return readContext(usable);
		}
		throw Error(formatProdErrorMessage(438, String(usable)));
	}
	function useMemoCache(size) {
		var memoCache = null, updateQueue = currentlyRenderingFiber.updateQueue;
		null !== updateQueue && (memoCache = updateQueue.memoCache);
		if (null == memoCache) {
			var current = currentlyRenderingFiber.alternate;
			null !== current && (current = current.updateQueue, null !== current && (current = current.memoCache, null != current && (memoCache = {
				data: current.data.map(function(array) {
					return array.slice();
				}),
				index: 0
			})));
		}
		memoCache ?? (memoCache = {
			data: [],
			index: 0
		});
		null === updateQueue && (updateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = updateQueue);
		updateQueue.memoCache = memoCache;
		updateQueue = memoCache.data[memoCache.index];
		if (void 0 === updateQueue) for (updateQueue = memoCache.data[memoCache.index] = Array(size), current = 0; current < size; current++) updateQueue[current] = REACT_MEMO_CACHE_SENTINEL;
		memoCache.index++;
		return updateQueue;
	}
	function basicStateReducer(state, action) {
		return "function" === typeof action ? action(state) : action;
	}
	function updateReducer(reducer) {
		return updateReducerImpl(updateWorkInProgressHook(), currentHook, reducer);
	}
	function updateReducerImpl(hook, current, reducer) {
		var queue = hook.queue;
		if (null === queue) throw Error(formatProdErrorMessage(311));
		queue.lastRenderedReducer = reducer;
		var baseQueue = hook.baseQueue, pendingQueue = queue.pending;
		if (null !== pendingQueue) {
			if (null !== baseQueue) {
				var baseFirst = baseQueue.next;
				baseQueue.next = pendingQueue.next;
				pendingQueue.next = baseFirst;
			}
			current.baseQueue = baseQueue = pendingQueue;
			queue.pending = null;
		}
		pendingQueue = hook.baseState;
		if (null === baseQueue) hook.memoizedState = pendingQueue;
		else {
			current = baseQueue.next;
			var newBaseQueueFirst = baseFirst = null, newBaseQueueLast = null, update = current, didReadFromEntangledAsyncAction$64 = !1;
			do {
				var updateLane = update.lane & -536870913;
				if (updateLane !== update.lane ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes & updateLane) === updateLane) {
					var revertLane = update.revertLane;
					if (0 === revertLane) null !== newBaseQueueLast && (newBaseQueueLast = newBaseQueueLast.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: update.action,
						hasEagerState: update.hasEagerState,
						eagerState: update.eagerState,
						next: null
					}), updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction$64 = !0);
					else if ((renderLanes & revertLane) === revertLane) {
						update = update.next;
						revertLane === currentEntangledLane && (didReadFromEntangledAsyncAction$64 = !0);
						continue;
					} else updateLane = {
						lane: 0,
						revertLane: update.revertLane,
						gesture: null,
						action: update.action,
						hasEagerState: update.hasEagerState,
						eagerState: update.eagerState,
						next: null
					}, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = updateLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = updateLane, currentlyRenderingFiber.lanes |= revertLane, workInProgressRootSkippedLanes |= revertLane;
					updateLane = update.action;
					shouldDoubleInvokeUserFnsInHooksDEV && reducer(pendingQueue, updateLane);
					pendingQueue = update.hasEagerState ? update.eagerState : reducer(pendingQueue, updateLane);
				} else revertLane = {
					lane: updateLane,
					revertLane: update.revertLane,
					gesture: update.gesture,
					action: update.action,
					hasEagerState: update.hasEagerState,
					eagerState: update.eagerState,
					next: null
				}, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = revertLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = revertLane, currentlyRenderingFiber.lanes |= updateLane, workInProgressRootSkippedLanes |= updateLane;
				update = update.next;
			} while (null !== update && update !== current);
			null === newBaseQueueLast ? baseFirst = pendingQueue : newBaseQueueLast.next = newBaseQueueFirst;
			if (!objectIs(pendingQueue, hook.memoizedState) && (didReceiveUpdate = !0, didReadFromEntangledAsyncAction$64 && (reducer = currentEntangledActionThenable, null !== reducer))) throw reducer;
			hook.memoizedState = pendingQueue;
			hook.baseState = baseFirst;
			hook.baseQueue = newBaseQueueLast;
			queue.lastRenderedState = pendingQueue;
		}
		null === baseQueue && (queue.lanes = 0);
		return [hook.memoizedState, queue.dispatch];
	}
	function rerenderReducer(reducer) {
		var hook = updateWorkInProgressHook(), queue = hook.queue;
		if (null === queue) throw Error(formatProdErrorMessage(311));
		queue.lastRenderedReducer = reducer;
		var dispatch = queue.dispatch, lastRenderPhaseUpdate = queue.pending, newState = hook.memoizedState;
		if (null !== lastRenderPhaseUpdate) {
			queue.pending = null;
			var update = lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
			do
				newState = reducer(newState, update.action), update = update.next;
			while (update !== lastRenderPhaseUpdate);
			objectIs(newState, hook.memoizedState) || (didReceiveUpdate = !0);
			hook.memoizedState = newState;
			null === hook.baseQueue && (hook.baseState = newState);
			queue.lastRenderedState = newState;
		}
		return [newState, dispatch];
	}
	function updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
		var fiber = currentlyRenderingFiber, hook = updateWorkInProgressHook(), isHydrating$jscomp$0 = isHydrating;
		if (isHydrating$jscomp$0) {
			if (void 0 === getServerSnapshot) throw Error(formatProdErrorMessage(407));
			getServerSnapshot = getServerSnapshot();
		} else getServerSnapshot = getSnapshot();
		var snapshotChanged = !objectIs((currentHook || hook).memoizedState, getServerSnapshot);
		snapshotChanged && (hook.memoizedState = getServerSnapshot, didReceiveUpdate = !0);
		hook = hook.queue;
		updateEffect(subscribeToStore.bind(null, fiber, hook, subscribe), [subscribe]);
		subscribe = hook.getSnapshot !== getSnapshot || snapshotChanged || null !== workInProgressHook && 0 !== (workInProgressHook.memoizedState.tag & 1);
		pushSimpleEffect(subscribe ? 9 : 8, { destroy: void 0 }, updateStoreInstance.bind(null, fiber, hook, getServerSnapshot, getSnapshot), null);
		if (subscribe) {
			fiber.flags |= 2048;
			if (null === workInProgressRoot) throw Error(formatProdErrorMessage(349));
			isHydrating$jscomp$0 || 0 !== (renderLanes & 127) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
		}
		return getServerSnapshot;
	}
	function pushStoreConsistencyCheck(fiber, getSnapshot, renderedSnapshot) {
		fiber.flags |= 16384;
		fiber = {
			getSnapshot,
			value: renderedSnapshot
		};
		getSnapshot = currentlyRenderingFiber.updateQueue;
		null === getSnapshot ? (getSnapshot = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = getSnapshot, getSnapshot.stores = [fiber]) : (renderedSnapshot = getSnapshot.stores, null === renderedSnapshot ? getSnapshot.stores = [fiber] : renderedSnapshot.push(fiber));
	}
	function updateStoreInstance(fiber, inst, nextSnapshot, getSnapshot) {
		inst.value = nextSnapshot;
		inst.getSnapshot = getSnapshot;
		checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
	}
	function subscribeToStore(fiber, inst, subscribe) {
		return subscribe(function() {
			checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
		});
	}
	function checkIfSnapshotChanged(inst) {
		var latestGetSnapshot = inst.getSnapshot;
		inst = inst.value;
		try {
			var nextValue = latestGetSnapshot();
			return !objectIs(inst, nextValue);
		} catch (error) {
			return !0;
		}
	}
	function forceStoreRerender(fiber) {
		var root = enqueueConcurrentRenderForLane(fiber, 2);
		null !== root && scheduleUpdateOnFiber(root, fiber, 2);
	}
	function mountStateImpl(initialState) {
		var hook = mountWorkInProgressHook();
		if ("function" === typeof initialState) {
			var initialStateInitializer = initialState;
			initialState = initialStateInitializer();
			if (shouldDoubleInvokeUserFnsInHooksDEV) {
				setIsStrictModeForDevtools(!0);
				try {
					initialStateInitializer();
				} finally {
					setIsStrictModeForDevtools(!1);
				}
			}
		}
		hook.memoizedState = hook.baseState = initialState;
		hook.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: basicStateReducer,
			lastRenderedState: initialState
		};
		return hook;
	}
	function updateOptimisticImpl(hook, current, passthrough, reducer) {
		hook.baseState = passthrough;
		return updateReducerImpl(hook, currentHook, "function" === typeof reducer ? reducer : basicStateReducer);
	}
	function dispatchActionState(fiber, actionQueue, setPendingState, setState, payload) {
		if (isRenderPhaseUpdate(fiber)) throw Error(formatProdErrorMessage(485));
		fiber = actionQueue.action;
		if (null !== fiber) {
			var actionNode = {
				payload,
				action: fiber,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(listener) {
					actionNode.listeners.push(listener);
				}
			};
			null !== ReactSharedInternals.T ? setPendingState(!0) : actionNode.isTransition = !1;
			setState(actionNode);
			setPendingState = actionQueue.pending;
			null === setPendingState ? (actionNode.next = actionQueue.pending = actionNode, runActionStateAction(actionQueue, actionNode)) : (actionNode.next = setPendingState.next, actionQueue.pending = setPendingState.next = actionNode);
		}
	}
	function runActionStateAction(actionQueue, node) {
		var action = node.action, payload = node.payload, prevState = actionQueue.state;
		if (node.isTransition) {
			var prevTransition = ReactSharedInternals.T, currentTransition = {};
			currentTransition.types = null !== prevTransition ? prevTransition.types : null;
			ReactSharedInternals.T = currentTransition;
			try {
				var returnValue = action(prevState, payload), onStartTransitionFinish = ReactSharedInternals.S;
				null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
				handleActionReturnValue(actionQueue, node, returnValue);
			} catch (error) {
				onActionError(actionQueue, node, error);
			} finally {
				null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
			}
		} else try {
			prevTransition = action(prevState, payload), handleActionReturnValue(actionQueue, node, prevTransition);
		} catch (error$70) {
			onActionError(actionQueue, node, error$70);
		}
	}
	function handleActionReturnValue(actionQueue, node, returnValue) {
		null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then ? returnValue.then(function(nextState) {
			onActionSuccess(actionQueue, node, nextState);
		}, function(error) {
			return onActionError(actionQueue, node, error);
		}) : onActionSuccess(actionQueue, node, returnValue);
	}
	function onActionSuccess(actionQueue, actionNode, nextState) {
		actionNode.status = "fulfilled";
		actionNode.value = nextState;
		notifyActionListeners(actionNode);
		actionQueue.state = nextState;
		actionNode = actionQueue.pending;
		null !== actionNode && (nextState = actionNode.next, nextState === actionNode ? actionQueue.pending = null : (nextState = nextState.next, actionNode.next = nextState, runActionStateAction(actionQueue, nextState)));
	}
	function onActionError(actionQueue, actionNode, error) {
		var last = actionQueue.pending;
		actionQueue.pending = null;
		if (null !== last) {
			last = last.next;
			do
				actionNode.status = "rejected", actionNode.reason = error, notifyActionListeners(actionNode), actionNode = actionNode.next;
			while (actionNode !== last);
		}
		actionQueue.action = null;
	}
	function notifyActionListeners(actionNode) {
		actionNode = actionNode.listeners;
		for (var i = 0; i < actionNode.length; i++) (0, actionNode[i])();
	}
	function actionStateReducer(oldState, newState) {
		return newState;
	}
	function mountActionState(action, initialStateProp) {
		if (isHydrating) {
			var ssrFormState = workInProgressRoot.formState;
			if (null !== ssrFormState) {
				a: {
					var JSCompiler_inline_result = currentlyRenderingFiber;
					if (isHydrating) {
						if (nextHydratableInstance) {
							b: {
								var JSCompiler_inline_result$jscomp$0 = nextHydratableInstance;
								for (var inRootOrSingleton = rootOrSingletonContext; 8 !== JSCompiler_inline_result$jscomp$0.nodeType;) {
									if (!inRootOrSingleton) {
										JSCompiler_inline_result$jscomp$0 = null;
										break b;
									}
									JSCompiler_inline_result$jscomp$0 = getNextHydratable(JSCompiler_inline_result$jscomp$0.nextSibling);
									if (null === JSCompiler_inline_result$jscomp$0) {
										JSCompiler_inline_result$jscomp$0 = null;
										break b;
									}
								}
								inRootOrSingleton = JSCompiler_inline_result$jscomp$0.data;
								JSCompiler_inline_result$jscomp$0 = "F!" === inRootOrSingleton || "F" === inRootOrSingleton ? JSCompiler_inline_result$jscomp$0 : null;
							}
							if (JSCompiler_inline_result$jscomp$0) {
								nextHydratableInstance = getNextHydratable(JSCompiler_inline_result$jscomp$0.nextSibling);
								JSCompiler_inline_result = "F!" === JSCompiler_inline_result$jscomp$0.data;
								break a;
							}
						}
						throwOnHydrationMismatch(JSCompiler_inline_result);
					}
					JSCompiler_inline_result = !1;
				}
				JSCompiler_inline_result && (initialStateProp = ssrFormState[0]);
			}
		}
		ssrFormState = mountWorkInProgressHook();
		ssrFormState.memoizedState = ssrFormState.baseState = initialStateProp;
		JSCompiler_inline_result = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: actionStateReducer,
			lastRenderedState: initialStateProp
		};
		ssrFormState.queue = JSCompiler_inline_result;
		ssrFormState = dispatchSetState.bind(null, currentlyRenderingFiber, JSCompiler_inline_result);
		JSCompiler_inline_result.dispatch = ssrFormState;
		JSCompiler_inline_result = mountStateImpl(!1);
		inRootOrSingleton = dispatchOptimisticSetState.bind(null, currentlyRenderingFiber, !1, JSCompiler_inline_result.queue);
		JSCompiler_inline_result = mountWorkInProgressHook();
		JSCompiler_inline_result$jscomp$0 = {
			state: initialStateProp,
			dispatch: null,
			action,
			pending: null
		};
		JSCompiler_inline_result.queue = JSCompiler_inline_result$jscomp$0;
		ssrFormState = dispatchActionState.bind(null, currentlyRenderingFiber, JSCompiler_inline_result$jscomp$0, inRootOrSingleton, ssrFormState);
		JSCompiler_inline_result$jscomp$0.dispatch = ssrFormState;
		JSCompiler_inline_result.memoizedState = action;
		return [
			initialStateProp,
			ssrFormState,
			!1
		];
	}
	function updateActionState(action) {
		return updateActionStateImpl(updateWorkInProgressHook(), currentHook, action);
	}
	function updateActionStateImpl(stateHook, currentStateHook, action) {
		currentStateHook = updateReducerImpl(stateHook, currentStateHook, actionStateReducer)[0];
		stateHook = updateReducer(basicStateReducer)[0];
		if ("object" === typeof currentStateHook && null !== currentStateHook && "function" === typeof currentStateHook.then) try {
			var state = useThenable(currentStateHook);
		} catch (x) {
			if (x === SuspenseException) throw SuspenseActionException;
			throw x;
		}
		else state = currentStateHook;
		currentStateHook = updateWorkInProgressHook();
		var actionQueue = currentStateHook.queue, dispatch = actionQueue.dispatch;
		action !== currentStateHook.memoizedState && (currentlyRenderingFiber.flags |= 2048, pushSimpleEffect(9, { destroy: void 0 }, actionStateActionEffect.bind(null, actionQueue, action), null));
		return [
			state,
			dispatch,
			stateHook
		];
	}
	function actionStateActionEffect(actionQueue, action) {
		actionQueue.action = action;
	}
	function rerenderActionState(action) {
		var stateHook = updateWorkInProgressHook(), currentStateHook = currentHook;
		if (null !== currentStateHook) return updateActionStateImpl(stateHook, currentStateHook, action);
		updateWorkInProgressHook();
		stateHook = stateHook.memoizedState;
		currentStateHook = updateWorkInProgressHook();
		var dispatch = currentStateHook.queue.dispatch;
		currentStateHook.memoizedState = action;
		return [
			stateHook,
			dispatch,
			!1
		];
	}
	function pushSimpleEffect(tag, inst, create, deps) {
		tag = {
			tag,
			create,
			deps,
			inst,
			next: null
		};
		inst = currentlyRenderingFiber.updateQueue;
		null === inst && (inst = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = inst);
		create = inst.lastEffect;
		null === create ? inst.lastEffect = tag.next = tag : (deps = create.next, create.next = tag, tag.next = deps, inst.lastEffect = tag);
		return tag;
	}
	function updateRef() {
		return updateWorkInProgressHook().memoizedState;
	}
	function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
		var hook = mountWorkInProgressHook();
		currentlyRenderingFiber.flags |= fiberFlags;
		hook.memoizedState = pushSimpleEffect(1 | hookFlags, { destroy: void 0 }, create, void 0 === deps ? null : deps);
	}
	function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
		var hook = updateWorkInProgressHook();
		deps = void 0 === deps ? null : deps;
		var inst = hook.memoizedState.inst;
		null !== currentHook && null !== deps && areHookInputsEqual(deps, currentHook.memoizedState.deps) ? hook.memoizedState = pushSimpleEffect(hookFlags, inst, create, deps) : (currentlyRenderingFiber.flags |= fiberFlags, hook.memoizedState = pushSimpleEffect(1 | hookFlags, inst, create, deps));
	}
	function mountEffect(create, deps) {
		mountEffectImpl(8390656, 8, create, deps);
	}
	function updateEffect(create, deps) {
		updateEffectImpl(2048, 8, create, deps);
	}
	function useEffectEventImpl(payload) {
		currentlyRenderingFiber.flags |= 4;
		var componentUpdateQueue = currentlyRenderingFiber.updateQueue;
		if (null === componentUpdateQueue) componentUpdateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = componentUpdateQueue, componentUpdateQueue.events = [payload];
		else {
			var events = componentUpdateQueue.events;
			null === events ? componentUpdateQueue.events = [payload] : events.push(payload);
		}
	}
	function updateEvent(callback) {
		var ref = updateWorkInProgressHook().memoizedState;
		useEffectEventImpl({
			ref,
			nextImpl: callback
		});
		return function() {
			if (0 !== (executionContext & 2)) throw Error(formatProdErrorMessage(440));
			return ref.impl.apply(void 0, arguments);
		};
	}
	function updateInsertionEffect(create, deps) {
		return updateEffectImpl(4, 2, create, deps);
	}
	function updateLayoutEffect(create, deps) {
		return updateEffectImpl(4, 4, create, deps);
	}
	function imperativeHandleEffect(create, ref) {
		if ("function" === typeof ref) {
			create = create();
			var refCleanup = ref(create);
			return function() {
				"function" === typeof refCleanup ? refCleanup() : ref(null);
			};
		}
		if (null !== ref && void 0 !== ref) return create = create(), ref.current = create, function() {
			ref.current = null;
		};
	}
	function updateImperativeHandle(ref, create, deps) {
		deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
		updateEffectImpl(4, 4, imperativeHandleEffect.bind(null, create, ref), deps);
	}
	function mountDebugValue() {}
	function updateCallback(callback, deps) {
		var hook = updateWorkInProgressHook();
		deps = void 0 === deps ? null : deps;
		var prevState = hook.memoizedState;
		if (null !== deps && areHookInputsEqual(deps, prevState[1])) return prevState[0];
		hook.memoizedState = [callback, deps];
		return callback;
	}
	function updateMemo(nextCreate, deps) {
		var hook = updateWorkInProgressHook();
		deps = void 0 === deps ? null : deps;
		var prevState = hook.memoizedState;
		if (null !== deps && areHookInputsEqual(deps, prevState[1])) return prevState[0];
		prevState = nextCreate();
		if (shouldDoubleInvokeUserFnsInHooksDEV) {
			setIsStrictModeForDevtools(!0);
			try {
				nextCreate();
			} finally {
				setIsStrictModeForDevtools(!1);
			}
		}
		hook.memoizedState = [prevState, deps];
		return prevState;
	}
	function mountDeferredValueImpl(hook, value, initialValue) {
		if (void 0 === initialValue || 0 !== (renderLanes & 1073741824) && 0 === (workInProgressRootRenderLanes & 261930)) return hook.memoizedState = value;
		hook.memoizedState = initialValue;
		hook = requestDeferredLane();
		currentlyRenderingFiber.lanes |= hook;
		workInProgressRootSkippedLanes |= hook;
		return initialValue;
	}
	function updateDeferredValueImpl(hook, prevValue, value, initialValue) {
		if (objectIs(value, prevValue)) return value;
		if (null !== currentTreeHiddenStackCursor.current) return hook = mountDeferredValueImpl(hook, value, initialValue), objectIs(hook, prevValue) || (didReceiveUpdate = !0), hook;
		if (0 === (renderLanes & 106) || 0 !== (renderLanes & 1073741824) && 0 === (workInProgressRootRenderLanes & 261930)) return didReceiveUpdate = !0, hook.memoizedState = value;
		hook = requestDeferredLane();
		currentlyRenderingFiber.lanes |= hook;
		workInProgressRootSkippedLanes |= hook;
		return prevValue;
	}
	function startTransition(fiber, queue, pendingState, finishedState, callback) {
		var previousPriority = ReactDOMSharedInternals.p;
		ReactDOMSharedInternals.p = 0 !== previousPriority && 8 > previousPriority ? previousPriority : 8;
		var prevTransition = ReactSharedInternals.T, currentTransition = {};
		currentTransition.types = null !== prevTransition ? prevTransition.types : null;
		ReactSharedInternals.T = currentTransition;
		dispatchOptimisticSetState(fiber, !1, queue, pendingState);
		try {
			var returnValue = callback(), onStartTransitionFinish = ReactSharedInternals.S;
			null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
			if (null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then) dispatchSetStateInternal(fiber, queue, chainThenableValue(returnValue, finishedState), requestUpdateLane(fiber));
			else dispatchSetStateInternal(fiber, queue, finishedState, requestUpdateLane(fiber));
		} catch (error) {
			dispatchSetStateInternal(fiber, queue, {
				then: function() {},
				status: "rejected",
				reason: error
			}, requestUpdateLane());
		} finally {
			ReactDOMSharedInternals.p = previousPriority, null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
		}
	}
	function noop() {}
	function startHostTransition(formFiber, pendingState, action, formData) {
		if (5 !== formFiber.tag) throw Error(formatProdErrorMessage(476));
		var queue = ensureFormComponentIsStateful(formFiber).queue;
		startTransition(formFiber, queue, pendingState, sharedNotPendingObject, null === action ? noop : function() {
			requestFormReset$1(formFiber);
			return action(formData);
		});
	}
	function ensureFormComponentIsStateful(formFiber) {
		var existingStateHook = formFiber.memoizedState;
		if (null !== existingStateHook) return existingStateHook;
		existingStateHook = {
			memoizedState: sharedNotPendingObject,
			baseState: sharedNotPendingObject,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: basicStateReducer,
				lastRenderedState: sharedNotPendingObject
			},
			next: null
		};
		var initialResetState = {};
		existingStateHook.next = {
			memoizedState: initialResetState,
			baseState: initialResetState,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: basicStateReducer,
				lastRenderedState: initialResetState
			},
			next: null
		};
		formFiber.memoizedState = existingStateHook;
		formFiber = formFiber.alternate;
		null !== formFiber && (formFiber.memoizedState = existingStateHook);
		return existingStateHook;
	}
	function requestFormReset$1(formFiber) {
		var stateHook = ensureFormComponentIsStateful(formFiber);
		null === stateHook.next && (stateHook = formFiber.alternate.memoizedState);
		dispatchSetStateInternal(formFiber, stateHook.next.queue, {}, requestUpdateLane());
	}
	function useHostTransitionStatus() {
		return readContext(HostTransitionContext);
	}
	function updateId() {
		return updateWorkInProgressHook().memoizedState;
	}
	function updateRefresh() {
		return updateWorkInProgressHook().memoizedState;
	}
	function refreshCache(fiber) {
		for (var provider = fiber.return; null !== provider;) {
			switch (provider.tag) {
				case 24:
				case 3:
					var lane = requestUpdateLane();
					fiber = createUpdate(lane);
					var root$73 = enqueueUpdate(provider, fiber, lane);
					null !== root$73 && (scheduleUpdateOnFiber(root$73, provider, lane), entangleTransitions(root$73, provider, lane));
					provider = { cache: createCache() };
					fiber.payload = provider;
					return;
			}
			provider = provider.return;
		}
	}
	function dispatchReducerAction(fiber, queue, action) {
		var lane = requestUpdateLane();
		action = {
			lane,
			revertLane: 0,
			gesture: null,
			action,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		isRenderPhaseUpdate(fiber) ? enqueueRenderPhaseUpdate(queue, action) : (action = enqueueConcurrentHookUpdate(fiber, queue, action, lane), null !== action && (scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane)));
	}
	function dispatchSetState(fiber, queue, action) {
		dispatchSetStateInternal(fiber, queue, action, requestUpdateLane());
	}
	function dispatchSetStateInternal(fiber, queue, action, lane) {
		var update = {
			lane,
			revertLane: 0,
			gesture: null,
			action,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (isRenderPhaseUpdate(fiber)) enqueueRenderPhaseUpdate(queue, update);
		else {
			var alternate = fiber.alternate;
			if (0 === fiber.lanes && (null === alternate || 0 === alternate.lanes) && (alternate = queue.lastRenderedReducer, null !== alternate)) try {
				var currentState = queue.lastRenderedState, eagerState = alternate(currentState, action);
				update.hasEagerState = !0;
				update.eagerState = eagerState;
				if (objectIs(eagerState, currentState)) return enqueueUpdate$1(fiber, queue, update, 0), null === workInProgressRoot && finishQueueingConcurrentUpdates(), !1;
			} catch (error) {}
			action = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
			if (null !== action) return scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane), !0;
		}
		return !1;
	}
	function dispatchOptimisticSetState(fiber, throwIfDuringRender, queue, action) {
		action = {
			lane: 2,
			revertLane: requestTransitionLane(),
			gesture: null,
			action,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (isRenderPhaseUpdate(fiber)) {
			if (throwIfDuringRender) throw Error(formatProdErrorMessage(479));
		} else throwIfDuringRender = enqueueConcurrentHookUpdate(fiber, queue, action, 2), null !== throwIfDuringRender && scheduleUpdateOnFiber(throwIfDuringRender, fiber, 2);
	}
	function isRenderPhaseUpdate(fiber) {
		var alternate = fiber.alternate;
		return fiber === currentlyRenderingFiber || null !== alternate && alternate === currentlyRenderingFiber;
	}
	function enqueueRenderPhaseUpdate(queue, update) {
		didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = !0;
		var pending = queue.pending;
		null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
		queue.pending = update;
	}
	function entangleTransitionUpdate(root, queue, lane) {
		if (0 !== (lane & 4194048)) {
			var queueLanes = queue.lanes;
			queueLanes &= root.pendingLanes;
			lane |= queueLanes;
			queue.lanes = lane;
			markRootEntangled(root, lane);
		}
	}
	var ContextOnlyDispatcher = {
		readContext,
		use,
		useCallback: throwInvalidHookError,
		useContext: throwInvalidHookError,
		useEffect: throwInvalidHookError,
		useImperativeHandle: throwInvalidHookError,
		useLayoutEffect: throwInvalidHookError,
		useInsertionEffect: throwInvalidHookError,
		useMemo: throwInvalidHookError,
		useReducer: throwInvalidHookError,
		useRef: throwInvalidHookError,
		useState: throwInvalidHookError,
		useDebugValue: throwInvalidHookError,
		useDeferredValue: throwInvalidHookError,
		useTransition: throwInvalidHookError,
		useSyncExternalStore: throwInvalidHookError,
		useId: throwInvalidHookError,
		useHostTransitionStatus: throwInvalidHookError,
		useFormState: throwInvalidHookError,
		useActionState: throwInvalidHookError,
		useOptimistic: throwInvalidHookError,
		useMemoCache: throwInvalidHookError,
		useCacheRefresh: throwInvalidHookError,
		useEffectEvent: throwInvalidHookError
	};
	var HooksDispatcherOnMount = {
		readContext,
		use,
		useCallback: function(callback, deps) {
			mountWorkInProgressHook().memoizedState = [callback, void 0 === deps ? null : deps];
			return callback;
		},
		useContext: readContext,
		useEffect: mountEffect,
		useImperativeHandle: function(ref, create, deps) {
			deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
			mountEffectImpl(4194308, 4, imperativeHandleEffect.bind(null, create, ref), deps);
		},
		useLayoutEffect: function(create, deps) {
			return mountEffectImpl(4194308, 4, create, deps);
		},
		useInsertionEffect: function(create, deps) {
			mountEffectImpl(4, 2, create, deps);
		},
		useMemo: function(nextCreate, deps) {
			var hook = mountWorkInProgressHook();
			deps = void 0 === deps ? null : deps;
			var nextValue = nextCreate();
			if (shouldDoubleInvokeUserFnsInHooksDEV) {
				setIsStrictModeForDevtools(!0);
				try {
					nextCreate();
				} finally {
					setIsStrictModeForDevtools(!1);
				}
			}
			hook.memoizedState = [nextValue, deps];
			return nextValue;
		},
		useReducer: function(reducer, initialArg, init) {
			var hook = mountWorkInProgressHook();
			if (void 0 !== init) {
				var initialState = init(initialArg);
				if (shouldDoubleInvokeUserFnsInHooksDEV) {
					setIsStrictModeForDevtools(!0);
					try {
						init(initialArg);
					} finally {
						setIsStrictModeForDevtools(!1);
					}
				}
			} else initialState = initialArg;
			hook.memoizedState = hook.baseState = initialState;
			reducer = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: reducer,
				lastRenderedState: initialState
			};
			hook.queue = reducer;
			reducer = reducer.dispatch = dispatchReducerAction.bind(null, currentlyRenderingFiber, reducer);
			return [hook.memoizedState, reducer];
		},
		useRef: function(initialValue) {
			var hook = mountWorkInProgressHook();
			initialValue = { current: initialValue };
			return hook.memoizedState = initialValue;
		},
		useState: function(initialState) {
			initialState = mountStateImpl(initialState);
			var queue = initialState.queue, dispatch = dispatchSetState.bind(null, currentlyRenderingFiber, queue);
			queue.dispatch = dispatch;
			return [initialState.memoizedState, dispatch];
		},
		useDebugValue: mountDebugValue,
		useDeferredValue: function(value, initialValue) {
			return mountDeferredValueImpl(mountWorkInProgressHook(), value, initialValue);
		},
		useTransition: function() {
			var stateHook = mountStateImpl(!1);
			stateHook = startTransition.bind(null, currentlyRenderingFiber, stateHook.queue, !0, !1);
			mountWorkInProgressHook().memoizedState = stateHook;
			return [!1, stateHook];
		},
		useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
			var fiber = currentlyRenderingFiber, hook = mountWorkInProgressHook();
			if (isHydrating) {
				if (void 0 === getServerSnapshot) throw Error(formatProdErrorMessage(407));
				getServerSnapshot = getServerSnapshot();
			} else {
				getServerSnapshot = getSnapshot();
				if (null === workInProgressRoot) throw Error(formatProdErrorMessage(349));
				0 !== (workInProgressRootRenderLanes & 127) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
			}
			hook.memoizedState = getServerSnapshot;
			var inst = {
				value: getServerSnapshot,
				getSnapshot
			};
			hook.queue = inst;
			mountEffect(subscribeToStore.bind(null, fiber, inst, subscribe), [subscribe]);
			fiber.flags |= 2048;
			pushSimpleEffect(9, { destroy: void 0 }, updateStoreInstance.bind(null, fiber, inst, getServerSnapshot, getSnapshot), null);
			return getServerSnapshot;
		},
		useId: function() {
			var hook = mountWorkInProgressHook(), identifierPrefix = workInProgressRoot.identifierPrefix;
			if (isHydrating) {
				var JSCompiler_inline_result = treeContextOverflow;
				var idWithLeadingBit = treeContextId;
				JSCompiler_inline_result = (idWithLeadingBit & ~(1 << 32 - clz32(idWithLeadingBit) - 1)).toString(32) + JSCompiler_inline_result;
				identifierPrefix = "_" + identifierPrefix + "R_" + JSCompiler_inline_result;
				JSCompiler_inline_result = localIdCounter++;
				0 < JSCompiler_inline_result && (identifierPrefix += "H" + JSCompiler_inline_result.toString(32));
				identifierPrefix += "_";
			} else JSCompiler_inline_result = globalClientIdCounter++, identifierPrefix = "_" + identifierPrefix + "r_" + JSCompiler_inline_result.toString(32) + "_";
			return hook.memoizedState = identifierPrefix;
		},
		useHostTransitionStatus,
		useFormState: mountActionState,
		useActionState: mountActionState,
		useOptimistic: function(passthrough) {
			var hook = mountWorkInProgressHook();
			hook.memoizedState = hook.baseState = passthrough;
			var queue = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			hook.queue = queue;
			hook = dispatchOptimisticSetState.bind(null, currentlyRenderingFiber, !0, queue);
			queue.dispatch = hook;
			return [passthrough, hook];
		},
		useMemoCache,
		useCacheRefresh: function() {
			return mountWorkInProgressHook().memoizedState = refreshCache.bind(null, currentlyRenderingFiber);
		},
		useEffectEvent: function(callback) {
			var hook = mountWorkInProgressHook(), ref = { impl: callback };
			hook.memoizedState = ref;
			return function() {
				if (0 !== (executionContext & 2)) throw Error(formatProdErrorMessage(440));
				return ref.impl.apply(void 0, arguments);
			};
		}
	};
	var HooksDispatcherOnUpdate = {
		readContext,
		use,
		useCallback: updateCallback,
		useContext: readContext,
		useEffect: updateEffect,
		useImperativeHandle: updateImperativeHandle,
		useInsertionEffect: updateInsertionEffect,
		useLayoutEffect: updateLayoutEffect,
		useMemo: updateMemo,
		useReducer: updateReducer,
		useRef: updateRef,
		useState: function() {
			return updateReducer(basicStateReducer);
		},
		useDebugValue: mountDebugValue,
		useDeferredValue: function(value, initialValue) {
			return updateDeferredValueImpl(updateWorkInProgressHook(), currentHook.memoizedState, value, initialValue);
		},
		useTransition: function() {
			var booleanOrThenable = updateReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
			return ["boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable), start];
		},
		useSyncExternalStore: updateSyncExternalStore,
		useId: updateId,
		useHostTransitionStatus,
		useFormState: updateActionState,
		useActionState: updateActionState,
		useOptimistic: function(passthrough, reducer) {
			return updateOptimisticImpl(updateWorkInProgressHook(), currentHook, passthrough, reducer);
		},
		useMemoCache,
		useCacheRefresh: updateRefresh,
		useEffectEvent: updateEvent
	};
	var HooksDispatcherOnRerender = {
		readContext,
		use,
		useCallback: updateCallback,
		useContext: readContext,
		useEffect: updateEffect,
		useImperativeHandle: updateImperativeHandle,
		useInsertionEffect: updateInsertionEffect,
		useLayoutEffect: updateLayoutEffect,
		useMemo: updateMemo,
		useReducer: rerenderReducer,
		useRef: updateRef,
		useState: function() {
			return rerenderReducer(basicStateReducer);
		},
		useDebugValue: mountDebugValue,
		useDeferredValue: function(value, initialValue) {
			var hook = updateWorkInProgressHook();
			return null === currentHook ? mountDeferredValueImpl(hook, value, initialValue) : updateDeferredValueImpl(hook, currentHook.memoizedState, value, initialValue);
		},
		useTransition: function() {
			var booleanOrThenable = rerenderReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
			return ["boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable), start];
		},
		useSyncExternalStore: updateSyncExternalStore,
		useId: updateId,
		useHostTransitionStatus,
		useFormState: rerenderActionState,
		useActionState: rerenderActionState,
		useOptimistic: function(passthrough, reducer) {
			var hook = updateWorkInProgressHook();
			if (null !== currentHook) return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
			hook.baseState = passthrough;
			return [passthrough, hook.queue.dispatch];
		},
		useMemoCache,
		useCacheRefresh: updateRefresh,
		useEffectEvent: updateEvent
	};
	function applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, nextProps) {
		ctor = workInProgress.memoizedState;
		getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
		getDerivedStateFromProps = null === getDerivedStateFromProps || void 0 === getDerivedStateFromProps ? ctor : assign({}, ctor, getDerivedStateFromProps);
		workInProgress.memoizedState = getDerivedStateFromProps;
		0 === workInProgress.lanes && (workInProgress.updateQueue.baseState = getDerivedStateFromProps);
	}
	var classComponentUpdater = {
		enqueueSetState: function(inst, payload, callback) {
			inst = inst._reactInternals;
			var lane = requestUpdateLane(), update = createUpdate(lane);
			update.payload = payload;
			void 0 !== callback && null !== callback && (update.callback = callback);
			payload = enqueueUpdate(inst, update, lane);
			null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
		},
		enqueueReplaceState: function(inst, payload, callback) {
			inst = inst._reactInternals;
			var lane = requestUpdateLane(), update = createUpdate(lane);
			update.tag = 1;
			update.payload = payload;
			void 0 !== callback && null !== callback && (update.callback = callback);
			payload = enqueueUpdate(inst, update, lane);
			null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
		},
		enqueueForceUpdate: function(inst, callback) {
			inst = inst._reactInternals;
			var lane = requestUpdateLane(), update = createUpdate(lane);
			update.tag = 2;
			void 0 !== callback && null !== callback && (update.callback = callback);
			callback = enqueueUpdate(inst, update, lane);
			null !== callback && (scheduleUpdateOnFiber(callback, inst, lane), entangleTransitions(callback, inst, lane));
		}
	};
	function checkShouldComponentUpdate(workInProgress, ctor, oldProps, newProps, oldState, newState, nextContext) {
		workInProgress = workInProgress.stateNode;
		return "function" === typeof workInProgress.shouldComponentUpdate ? workInProgress.shouldComponentUpdate(newProps, newState, nextContext) : ctor.prototype && ctor.prototype.isPureReactComponent ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState) : !0;
	}
	function callComponentWillReceiveProps(workInProgress, instance, newProps, nextContext) {
		workInProgress = instance.state;
		"function" === typeof instance.componentWillReceiveProps && instance.componentWillReceiveProps(newProps, nextContext);
		"function" === typeof instance.UNSAFE_componentWillReceiveProps && instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
		instance.state !== workInProgress && classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
	}
	function resolveClassComponentProps(Component, baseProps) {
		var newProps = baseProps;
		if ("ref" in baseProps) {
			newProps = {};
			for (var propName in baseProps) "ref" !== propName && (newProps[propName] = baseProps[propName]);
		}
		if (Component = Component.defaultProps) {
			newProps === baseProps && (newProps = assign({}, newProps));
			for (var propName$77 in Component) void 0 === newProps[propName$77] && (newProps[propName$77] = Component[propName$77]);
		}
		return newProps;
	}
	function defaultOnUncaughtError(error) {
		reportGlobalError(error);
	}
	function defaultOnCaughtError(error) {
		console.error(error);
	}
	function defaultOnRecoverableError(error) {
		reportGlobalError(error);
	}
	function logUncaughtError(root, errorInfo) {
		try {
			var onUncaughtError = root.onUncaughtError;
			onUncaughtError(errorInfo.value, { componentStack: errorInfo.stack });
		} catch (e$78) {
			setTimeout(function() {
				throw e$78;
			});
		}
	}
	function logCaughtError(root, boundary, errorInfo) {
		try {
			var onCaughtError = root.onCaughtError;
			onCaughtError(errorInfo.value, {
				componentStack: errorInfo.stack,
				errorBoundary: 1 === boundary.tag ? boundary.stateNode : null
			});
		} catch (e$79) {
			setTimeout(function() {
				throw e$79;
			});
		}
	}
	function createRootErrorUpdate(root, errorInfo, lane) {
		lane = createUpdate(lane);
		lane.tag = 3;
		lane.payload = { element: null };
		lane.callback = function() {
			logUncaughtError(root, errorInfo);
		};
		return lane;
	}
	function createClassErrorUpdate(lane) {
		lane = createUpdate(lane);
		lane.tag = 3;
		return lane;
	}
	function initializeClassErrorUpdate(update, root, fiber, errorInfo) {
		var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
		if ("function" === typeof getDerivedStateFromError) {
			var error = errorInfo.value;
			update.payload = function() {
				return getDerivedStateFromError(error);
			};
			update.callback = function() {
				logCaughtError(root, fiber, errorInfo);
			};
		}
		var inst = fiber.stateNode;
		null !== inst && "function" === typeof inst.componentDidCatch && (update.callback = function() {
			logCaughtError(root, fiber, errorInfo);
			"function" !== typeof getDerivedStateFromError && (null === legacyErrorBoundariesThatAlreadyFailed ? legacyErrorBoundariesThatAlreadyFailed = /* @__PURE__ */ new Set([this]) : legacyErrorBoundariesThatAlreadyFailed.add(this));
			var stack = errorInfo.stack;
			this.componentDidCatch(errorInfo.value, { componentStack: null !== stack ? stack : "" });
		});
	}
	function throwException(root, returnFiber, sourceFiber, value, rootRenderLanes) {
		sourceFiber.flags |= 32768;
		if (null !== value && "object" === typeof value && "function" === typeof value.then) {
			returnFiber = sourceFiber.alternate;
			null !== returnFiber && propagateParentContextChanges(returnFiber, sourceFiber, rootRenderLanes, !0);
			sourceFiber = suspenseHandlerStackCursor.current;
			if (null !== sourceFiber) {
				switch (sourceFiber.tag) {
					case 31:
					case 13:
					case 19: return null === shellBoundary ? renderDidSuspendDelayIfPossible() : null === sourceFiber.alternate && 0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 3), sourceFiber.flags &= -257, sourceFiber.flags |= 65536, sourceFiber.lanes = rootRenderLanes, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? sourceFiber.updateQueue = /* @__PURE__ */ new Set([value]) : returnFiber.add(value), attachPingListener(root, value, rootRenderLanes)), !1;
					case 22: return sourceFiber.flags |= 65536, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? (returnFiber = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([value])
					}, sourceFiber.updateQueue = returnFiber) : (sourceFiber = returnFiber.retryQueue, null === sourceFiber ? returnFiber.retryQueue = /* @__PURE__ */ new Set([value]) : sourceFiber.add(value)), attachPingListener(root, value, rootRenderLanes)), !1;
				}
				throw Error(formatProdErrorMessage(435, sourceFiber.tag));
			}
			attachPingListener(root, value, rootRenderLanes);
			renderDidSuspendDelayIfPossible();
			return !1;
		}
		if (isHydrating) return returnFiber = suspenseHandlerStackCursor.current, null !== returnFiber ? (0 === (returnFiber.flags & 65536) && (returnFiber.flags |= 256), returnFiber.flags |= 65536, returnFiber.lanes = rootRenderLanes, value !== HydrationMismatchException && (root = Error(formatProdErrorMessage(422), { cause: value }), queueHydrationError(createCapturedValueAtFiber(root, sourceFiber)))) : (value !== HydrationMismatchException && (returnFiber = Error(formatProdErrorMessage(423), { cause: value }), queueHydrationError(createCapturedValueAtFiber(returnFiber, sourceFiber))), root = root.current.alternate, root.flags |= 65536, rootRenderLanes &= -rootRenderLanes, root.lanes |= rootRenderLanes, value = createCapturedValueAtFiber(value, sourceFiber), rootRenderLanes = createRootErrorUpdate(root.stateNode, value, rootRenderLanes), enqueueCapturedUpdate(root, rootRenderLanes), 4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2)), !1;
		var wrapperError = Error(formatProdErrorMessage(520), { cause: value });
		wrapperError = createCapturedValueAtFiber(wrapperError, sourceFiber);
		null === workInProgressRootConcurrentErrors ? workInProgressRootConcurrentErrors = [wrapperError] : workInProgressRootConcurrentErrors.push(wrapperError);
		4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2);
		if (null === returnFiber) return !0;
		value = createCapturedValueAtFiber(value, sourceFiber);
		sourceFiber = returnFiber;
		do {
			switch (sourceFiber.tag) {
				case 3: return sourceFiber.flags |= 65536, root = rootRenderLanes & -rootRenderLanes, sourceFiber.lanes |= root, root = createRootErrorUpdate(sourceFiber.stateNode, value, root), enqueueCapturedUpdate(sourceFiber, root), !1;
				case 1:
					returnFiber = sourceFiber.type;
					wrapperError = sourceFiber.stateNode;
					if (0 === (sourceFiber.flags & 128) && ("function" === typeof returnFiber.getDerivedStateFromError || null !== wrapperError && "function" === typeof wrapperError.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(wrapperError)))) return sourceFiber.flags |= 65536, rootRenderLanes &= -rootRenderLanes, sourceFiber.lanes |= rootRenderLanes, rootRenderLanes = createClassErrorUpdate(rootRenderLanes), initializeClassErrorUpdate(rootRenderLanes, root, sourceFiber, value), enqueueCapturedUpdate(sourceFiber, rootRenderLanes), !1;
					break;
				case 22: if (null !== sourceFiber.memoizedState) return sourceFiber.flags |= 65536, !1;
			}
			sourceFiber = sourceFiber.return;
		} while (null !== sourceFiber);
		return !1;
	}
	var SelectiveHydrationException = Error(formatProdErrorMessage(461));
	var didReceiveUpdate = !1;
	function reconcileChildren(current, workInProgress, nextChildren, renderLanes) {
		workInProgress.child = null === current ? mountChildFibers(workInProgress, null, nextChildren, renderLanes) : reconcileChildFibers(workInProgress, current.child, nextChildren, renderLanes);
	}
	function updateForwardRef(current, workInProgress, Component, nextProps, renderLanes) {
		Component = Component.render;
		var ref = workInProgress.ref;
		if ("ref" in nextProps) {
			var propsWithoutRef = {};
			for (var key in nextProps) "ref" !== key && (propsWithoutRef[key] = nextProps[key]);
		} else propsWithoutRef = nextProps;
		prepareToReadContext(workInProgress);
		nextProps = renderWithHooks(current, workInProgress, Component, propsWithoutRef, ref, renderLanes);
		key = checkDidRenderIdHook();
		if (null !== current && !didReceiveUpdate) return bailoutHooks(current, workInProgress, renderLanes), bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
		isHydrating && key && pushMaterializedTreeId(workInProgress);
		workInProgress.flags |= 1;
		reconcileChildren(current, workInProgress, nextProps, renderLanes);
		return workInProgress.child;
	}
	function updateMemoComponent(current, workInProgress, Component, nextProps, renderLanes) {
		if (null === current) {
			var type = Component.type;
			if ("function" === typeof type && !shouldConstruct(type) && void 0 === type.defaultProps && null === Component.compare) return workInProgress.tag = 15, workInProgress.type = type, updateSimpleMemoComponent(current, workInProgress, type, nextProps, renderLanes);
			current = createFiberFromTypeAndProps(Component.type, null, nextProps, workInProgress, workInProgress.mode, renderLanes);
			current.ref = workInProgress.ref;
			current.return = workInProgress;
			return workInProgress.child = current;
		}
		type = current.child;
		if (!checkScheduledUpdateOrContext(current, renderLanes)) {
			var prevProps = type.memoizedProps;
			Component = Component.compare;
			Component = null !== Component ? Component : shallowEqual;
			if (Component(prevProps, nextProps) && current.ref === workInProgress.ref) return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
		}
		workInProgress.flags |= 1;
		current = createWorkInProgress(type, nextProps);
		current.ref = workInProgress.ref;
		current.return = workInProgress;
		return workInProgress.child = current;
	}
	function updateSimpleMemoComponent(current, workInProgress, Component, nextProps, renderLanes) {
		if (null !== current) {
			var prevProps = current.memoizedProps;
			if (shallowEqual(prevProps, nextProps) && current.ref === workInProgress.ref) if (didReceiveUpdate = !1, workInProgress.pendingProps = nextProps = prevProps, checkScheduledUpdateOrContext(current, renderLanes)) 0 !== (current.flags & 131072) && (didReceiveUpdate = !0);
			else return workInProgress.lanes = current.lanes, bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
		}
		return updateFunctionComponent(current, workInProgress, Component, nextProps, renderLanes);
	}
	function updateOffscreenComponent(current, workInProgress, renderLanes, nextProps) {
		var nextChildren = nextProps.children, prevState = null !== current ? current.memoizedState : null;
		null === current && null === workInProgress.stateNode && (workInProgress.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		});
		if ("hidden" === nextProps.mode) {
			if (0 !== (workInProgress.flags & 128)) {
				prevState = null !== prevState ? prevState.baseLanes | renderLanes : renderLanes;
				if (null !== current) {
					nextProps = workInProgress.child = current.child;
					for (nextChildren = 0; null !== nextProps;) nextChildren = nextChildren | nextProps.lanes | nextProps.childLanes, nextProps = nextProps.sibling;
					nextProps = nextChildren & ~prevState;
				} else nextProps = 0, workInProgress.child = null;
				return deferHiddenOffscreenComponent(current, workInProgress, prevState, renderLanes, nextProps);
			}
			if (0 !== (renderLanes & 536870912)) workInProgress.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, null !== current && pushTransition(workInProgress, null !== prevState ? prevState.cachePool : null), null !== prevState ? pushHiddenContext(workInProgress, prevState) : reuseHiddenContextOnStack(), pushOffscreenSuspenseHandler(workInProgress);
			else return nextProps = workInProgress.lanes = 536870912, deferHiddenOffscreenComponent(current, workInProgress, null !== prevState ? prevState.baseLanes | renderLanes : renderLanes, renderLanes, nextProps);
		} else null !== prevState ? (pushTransition(workInProgress, prevState.cachePool), pushHiddenContext(workInProgress, prevState), reuseSuspenseHandlerOnStack(), workInProgress.memoizedState = null) : (null !== current && pushTransition(workInProgress, null), reuseHiddenContextOnStack(), reuseSuspenseHandlerOnStack());
		reconcileChildren(current, workInProgress, nextChildren, renderLanes);
		return workInProgress.child;
	}
	function bailoutOffscreenComponent(current, workInProgress) {
		null !== current && 22 === current.tag || null !== workInProgress.stateNode || (workInProgress.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		});
		return workInProgress.sibling;
	}
	function deferHiddenOffscreenComponent(current, workInProgress, nextBaseLanes, renderLanes, remainingChildLanes) {
		var JSCompiler_inline_result = peekCacheFromPool();
		JSCompiler_inline_result = null === JSCompiler_inline_result ? null : {
			parent: CacheContext._currentValue,
			pool: JSCompiler_inline_result
		};
		workInProgress.memoizedState = {
			baseLanes: nextBaseLanes,
			cachePool: JSCompiler_inline_result
		};
		null !== current && pushTransition(workInProgress, null);
		reuseHiddenContextOnStack();
		pushOffscreenSuspenseHandler(workInProgress);
		null !== current && propagateParentContextChanges(current, workInProgress, renderLanes, !0);
		workInProgress.childLanes = remainingChildLanes;
		return null;
	}
	function mountActivityChildren(workInProgress, nextProps) {
		nextProps = mountWorkInProgressOffscreenFiber({
			mode: nextProps.mode,
			children: nextProps.children
		}, workInProgress.mode);
		nextProps.ref = workInProgress.ref;
		workInProgress.child = nextProps;
		nextProps.return = workInProgress;
		return nextProps;
	}
	function retryActivityComponentWithoutHydrating(current, workInProgress, renderLanes) {
		reconcileChildFibers(workInProgress, current.child, null, renderLanes);
		current = mountActivityChildren(workInProgress, workInProgress.pendingProps);
		current.flags |= 2;
		popSuspenseHandler(workInProgress);
		workInProgress.memoizedState = null;
		return current;
	}
	function updateActivityComponent(current, workInProgress, renderLanes) {
		var nextProps = workInProgress.pendingProps, didSuspend = 0 !== (workInProgress.flags & 128);
		workInProgress.flags &= -129;
		if (null === current) {
			if (isHydrating) {
				if ("hidden" === nextProps.mode) return current = mountActivityChildren(workInProgress, nextProps), workInProgress.lanes = 536870912, current.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, bailoutOffscreenComponent(null, current);
				pushDehydratedActivitySuspenseHandler(workInProgress);
				(current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(current, rootOrSingletonContext), current = null !== current && "&" === current.data ? current : null, null !== current && (workInProgress.memoizedState = {
					dehydrated: current,
					treeContext: null !== treeContextProvider ? {
						id: treeContextId,
						overflow: treeContextOverflow
					} : null,
					retryLane: 536870912,
					hydrationErrors: null
				}, renderLanes = createFiberFromDehydratedFragment(current), renderLanes.return = workInProgress, workInProgress.child = renderLanes, hydrationParentFiber = workInProgress, nextHydratableInstance = null)) : current = null;
				if (null === current) throw throwOnHydrationMismatch(workInProgress);
				workInProgress.lanes = 536870912;
				return null;
			}
			return mountActivityChildren(workInProgress, nextProps);
		}
		var prevState = current.memoizedState;
		if (null !== prevState) {
			var dehydrated = prevState.dehydrated;
			pushDehydratedActivitySuspenseHandler(workInProgress);
			if (didSuspend) if (workInProgress.flags & 256) workInProgress.flags &= -257, workInProgress = retryActivityComponentWithoutHydrating(current, workInProgress, renderLanes);
			else if (null !== workInProgress.memoizedState) workInProgress.child = current.child, workInProgress.flags |= 128, workInProgress = null;
			else throw Error(formatProdErrorMessage(558));
			else if (didReceiveUpdate || propagateParentContextChanges(current, workInProgress, renderLanes, !1), didSuspend = 0 !== (renderLanes & current.childLanes), didReceiveUpdate || didSuspend) {
				if (null === currentTreeHiddenStackCursor.current) {
					nextProps = workInProgressRoot;
					if (null !== nextProps && (dehydrated = getBumpedLaneForHydration(nextProps, renderLanes), 0 !== dehydrated && dehydrated !== prevState.retryLane)) throw prevState.retryLane = dehydrated, enqueueConcurrentRenderForLane(current, dehydrated), scheduleUpdateOnFiber(nextProps, current, dehydrated), SelectiveHydrationException;
					renderDidSuspendDelayIfPossible();
				}
				workInProgress = retryActivityComponentWithoutHydrating(current, workInProgress, renderLanes);
			} else current = prevState.treeContext, nextHydratableInstance = getNextHydratable(dehydrated.nextSibling), hydrationParentFiber = workInProgress, isHydrating = !0, hydrationErrors = null, rootOrSingletonContext = !1, null !== current && restoreSuspendedTreeContext(workInProgress, current), workInProgress = mountActivityChildren(workInProgress, nextProps), workInProgress.flags |= 134221824;
			return workInProgress;
		}
		current = createWorkInProgress(current.child, {
			mode: nextProps.mode,
			children: nextProps.children
		});
		current.ref = workInProgress.ref;
		workInProgress.child = current;
		current.return = workInProgress;
		return current;
	}
	function markRef(current, workInProgress) {
		var ref = workInProgress.ref;
		if (null === ref) null !== current && null !== current.ref && (workInProgress.flags |= 4194816);
		else {
			if ("function" !== typeof ref && "object" !== typeof ref) throw Error(formatProdErrorMessage(284));
			if (null === current || current.ref !== ref) workInProgress.flags |= 4194816;
		}
	}
	function updateFunctionComponent(current, workInProgress, Component, nextProps, renderLanes) {
		prepareToReadContext(workInProgress);
		Component = renderWithHooks(current, workInProgress, Component, nextProps, void 0, renderLanes);
		nextProps = checkDidRenderIdHook();
		if (null !== current && !didReceiveUpdate) return bailoutHooks(current, workInProgress, renderLanes), bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
		isHydrating && nextProps && pushMaterializedTreeId(workInProgress);
		workInProgress.flags |= 1;
		reconcileChildren(current, workInProgress, Component, renderLanes);
		return workInProgress.child;
	}
	function replayFunctionComponent(current, workInProgress, nextProps, Component, secondArg, renderLanes) {
		prepareToReadContext(workInProgress);
		workInProgress.updateQueue = null;
		nextProps = renderWithHooksAgain(workInProgress, Component, nextProps, secondArg);
		finishRenderingHooks(current);
		Component = checkDidRenderIdHook();
		if (null !== current && !didReceiveUpdate) return bailoutHooks(current, workInProgress, renderLanes), bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
		isHydrating && Component && pushMaterializedTreeId(workInProgress);
		workInProgress.flags |= 1;
		reconcileChildren(current, workInProgress, nextProps, renderLanes);
		return workInProgress.child;
	}
	function updateClassComponent(current, workInProgress, Component, nextProps, renderLanes) {
		prepareToReadContext(workInProgress);
		if (null === workInProgress.stateNode) {
			var context = emptyContextObject, contextType = Component.contextType;
			"object" === typeof contextType && null !== contextType && (context = readContext(contextType));
			context = new Component(nextProps, context);
			workInProgress.memoizedState = null !== context.state && void 0 !== context.state ? context.state : null;
			context.updater = classComponentUpdater;
			workInProgress.stateNode = context;
			context._reactInternals = workInProgress;
			context = workInProgress.stateNode;
			context.props = nextProps;
			context.state = workInProgress.memoizedState;
			context.refs = {};
			initializeUpdateQueue(workInProgress);
			contextType = Component.contextType;
			context.context = "object" === typeof contextType && null !== contextType ? readContext(contextType) : emptyContextObject;
			context.state = workInProgress.memoizedState;
			contextType = Component.getDerivedStateFromProps;
			"function" === typeof contextType && (applyDerivedStateFromProps(workInProgress, Component, contextType, nextProps), context.state = workInProgress.memoizedState);
			"function" === typeof Component.getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || (contextType = context.state, "function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount(), contextType !== context.state && classComponentUpdater.enqueueReplaceState(context, context.state, null), processUpdateQueue(workInProgress, nextProps, context, renderLanes), suspendIfUpdateReadFromEntangledAsyncAction(), context.state = workInProgress.memoizedState);
			"function" === typeof context.componentDidMount && (workInProgress.flags |= 4194308);
			nextProps = !0;
		} else if (null === current) {
			context = workInProgress.stateNode;
			var unresolvedOldProps = workInProgress.memoizedProps, oldProps = resolveClassComponentProps(Component, unresolvedOldProps);
			context.props = oldProps;
			var oldContext = context.context, contextType$jscomp$0 = Component.contextType;
			contextType = emptyContextObject;
			"object" === typeof contextType$jscomp$0 && null !== contextType$jscomp$0 && (contextType = readContext(contextType$jscomp$0));
			var getDerivedStateFromProps = Component.getDerivedStateFromProps;
			contextType$jscomp$0 = "function" === typeof getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate;
			unresolvedOldProps = workInProgress.pendingProps !== unresolvedOldProps;
			contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (unresolvedOldProps || oldContext !== contextType) && callComponentWillReceiveProps(workInProgress, context, nextProps, contextType);
			hasForceUpdate = !1;
			var oldState = workInProgress.memoizedState;
			context.state = oldState;
			processUpdateQueue(workInProgress, nextProps, context, renderLanes);
			suspendIfUpdateReadFromEntangledAsyncAction();
			oldContext = workInProgress.memoizedState;
			unresolvedOldProps || oldState !== oldContext || hasForceUpdate ? ("function" === typeof getDerivedStateFromProps && (applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, nextProps), oldContext = workInProgress.memoizedState), (oldProps = hasForceUpdate || checkShouldComponentUpdate(workInProgress, Component, oldProps, nextProps, oldState, oldContext, contextType)) ? (contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || ("function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount()), "function" === typeof context.componentDidMount && (workInProgress.flags |= 4194308)) : ("function" === typeof context.componentDidMount && (workInProgress.flags |= 4194308), workInProgress.memoizedProps = nextProps, workInProgress.memoizedState = oldContext), context.props = nextProps, context.state = oldContext, context.context = contextType, nextProps = oldProps) : ("function" === typeof context.componentDidMount && (workInProgress.flags |= 4194308), nextProps = !1);
		} else {
			context = workInProgress.stateNode;
			cloneUpdateQueue(current, workInProgress);
			contextType = workInProgress.memoizedProps;
			contextType$jscomp$0 = resolveClassComponentProps(Component, contextType);
			context.props = contextType$jscomp$0;
			getDerivedStateFromProps = workInProgress.pendingProps;
			oldState = context.context;
			oldContext = Component.contextType;
			oldProps = emptyContextObject;
			"object" === typeof oldContext && null !== oldContext && (oldProps = readContext(oldContext));
			unresolvedOldProps = Component.getDerivedStateFromProps;
			(oldContext = "function" === typeof unresolvedOldProps || "function" === typeof context.getSnapshotBeforeUpdate) || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (contextType !== getDerivedStateFromProps || oldState !== oldProps) && callComponentWillReceiveProps(workInProgress, context, nextProps, oldProps);
			hasForceUpdate = !1;
			oldState = workInProgress.memoizedState;
			context.state = oldState;
			processUpdateQueue(workInProgress, nextProps, context, renderLanes);
			suspendIfUpdateReadFromEntangledAsyncAction();
			var newState = workInProgress.memoizedState;
			contextType !== getDerivedStateFromProps || oldState !== newState || hasForceUpdate || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies) ? ("function" === typeof unresolvedOldProps && (applyDerivedStateFromProps(workInProgress, Component, unresolvedOldProps, nextProps), newState = workInProgress.memoizedState), (contextType$jscomp$0 = hasForceUpdate || checkShouldComponentUpdate(workInProgress, Component, contextType$jscomp$0, nextProps, oldState, newState, oldProps) || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies)) ? (oldContext || "function" !== typeof context.UNSAFE_componentWillUpdate && "function" !== typeof context.componentWillUpdate || ("function" === typeof context.componentWillUpdate && context.componentWillUpdate(nextProps, newState, oldProps), "function" === typeof context.UNSAFE_componentWillUpdate && context.UNSAFE_componentWillUpdate(nextProps, newState, oldProps)), "function" === typeof context.componentDidUpdate && (workInProgress.flags |= 4), "function" === typeof context.getSnapshotBeforeUpdate && (workInProgress.flags |= 1024)) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 1024), workInProgress.memoizedProps = nextProps, workInProgress.memoizedState = newState), context.props = nextProps, context.state = newState, context.context = oldProps, nextProps = contextType$jscomp$0) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 1024), nextProps = !1);
		}
		context = nextProps;
		markRef(current, workInProgress);
		nextProps = 0 !== (workInProgress.flags & 128);
		context || nextProps ? (context = workInProgress.stateNode, Component = nextProps && "function" !== typeof Component.getDerivedStateFromError ? null : context.render(), workInProgress.flags |= 1, null !== current && nextProps ? (workInProgress.child = reconcileChildFibers(workInProgress, current.child, null, renderLanes), workInProgress.child = reconcileChildFibers(workInProgress, null, Component, renderLanes)) : reconcileChildren(current, workInProgress, Component, renderLanes), workInProgress.memoizedState = context.state, current = workInProgress.child) : current = bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
		return current;
	}
	function mountHostRootWithoutHydrating(current, workInProgress, nextChildren, renderLanes) {
		resetHydrationState();
		workInProgress.flags |= 256;
		reconcileChildren(current, workInProgress, nextChildren, renderLanes);
		return workInProgress.child;
	}
	var SUSPENDED_MARKER = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function mountSuspenseOffscreenState(renderLanes) {
		return {
			baseLanes: renderLanes,
			cachePool: getSuspendedCache()
		};
	}
	function getRemainingWorkInPrimaryTree(current, primaryTreeDidDefer, renderLanes) {
		current = null !== current ? current.childLanes & ~renderLanes : 0;
		primaryTreeDidDefer && (current |= workInProgressDeferredLane);
		return current;
	}
	function updateSuspenseComponent(current, workInProgress, renderLanes) {
		var nextProps = workInProgress.pendingProps, showFallback = !1, didSuspend = 0 !== (workInProgress.flags & 128), JSCompiler_temp;
		(JSCompiler_temp = didSuspend) || (JSCompiler_temp = null !== current && null === current.memoizedState ? !1 : 0 !== (suspenseStackCursor.current & 2));
		JSCompiler_temp && (showFallback = !0, workInProgress.flags &= -129);
		JSCompiler_temp = 0 !== (workInProgress.flags & 32);
		workInProgress.flags &= -33;
		if (null === current) {
			if (isHydrating) {
				showFallback ? pushPrimaryTreeSuspenseHandler(workInProgress) : reuseSuspenseHandlerOnStack();
				(current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(current, rootOrSingletonContext), current = null !== current && "&" !== current.data ? current : null, null !== current && (workInProgress.memoizedState = {
					dehydrated: current,
					treeContext: null !== treeContextProvider ? {
						id: treeContextId,
						overflow: treeContextOverflow
					} : null,
					retryLane: 536870912,
					hydrationErrors: null
				}, renderLanes = createFiberFromDehydratedFragment(current), renderLanes.return = workInProgress, workInProgress.child = renderLanes, hydrationParentFiber = workInProgress, nextHydratableInstance = null)) : current = null;
				if (null === current) throw throwOnHydrationMismatch(workInProgress);
				isSuspenseInstanceFallback(current) ? workInProgress.lanes = 32 : workInProgress.lanes = 536870912;
				return null;
			}
			didSuspend = nextProps.children;
			nextProps = nextProps.fallback;
			if (showFallback) return reuseSuspenseHandlerOnStack(), showFallback = workInProgress.mode, didSuspend = mountWorkInProgressOffscreenFiber({
				mode: "hidden",
				children: didSuspend
			}, showFallback), nextProps = createFiberFromFragment(nextProps, showFallback, renderLanes, null), didSuspend.return = workInProgress, nextProps.return = workInProgress, didSuspend.sibling = nextProps, workInProgress.child = didSuspend, nextProps = workInProgress.child, nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes), nextProps.childLanes = getRemainingWorkInPrimaryTree(current, JSCompiler_temp, renderLanes), workInProgress.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(null, nextProps);
			pushPrimaryTreeSuspenseHandler(workInProgress);
			return mountSuspensePrimaryChildren(workInProgress, didSuspend);
		}
		var prevState = current.memoizedState;
		if (null !== prevState) {
			var dehydrated$96 = prevState.dehydrated;
			if (null !== dehydrated$96) return updateDehydratedSuspenseComponent(current, workInProgress, didSuspend, JSCompiler_temp, nextProps, dehydrated$96, prevState, renderLanes);
		}
		if (showFallback) return reuseSuspenseHandlerOnStack(), showFallback = nextProps.fallback, didSuspend = workInProgress.mode, prevState = current.child, dehydrated$96 = prevState.sibling, nextProps = createWorkInProgress(prevState, {
			mode: "hidden",
			children: nextProps.children
		}), nextProps.subtreeFlags = prevState.subtreeFlags & 1206910976, null !== dehydrated$96 ? showFallback = createWorkInProgress(dehydrated$96, showFallback) : (showFallback = createFiberFromFragment(showFallback, didSuspend, renderLanes, null), showFallback.flags |= 2), showFallback.return = workInProgress, nextProps.return = workInProgress, nextProps.sibling = showFallback, workInProgress.child = nextProps, bailoutOffscreenComponent(null, nextProps), nextProps = workInProgress.child, showFallback = current.child.memoizedState, null === showFallback ? showFallback = mountSuspenseOffscreenState(renderLanes) : (didSuspend = showFallback.cachePool, null !== didSuspend ? (prevState = CacheContext._currentValue, didSuspend = didSuspend.parent !== prevState ? {
			parent: prevState,
			pool: prevState
		} : didSuspend) : didSuspend = getSuspendedCache(), showFallback = {
			baseLanes: showFallback.baseLanes | renderLanes,
			cachePool: didSuspend
		}), nextProps.memoizedState = showFallback, nextProps.childLanes = getRemainingWorkInPrimaryTree(current, JSCompiler_temp, renderLanes), workInProgress.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(current.child, nextProps);
		pushPrimaryTreeSuspenseHandler(workInProgress);
		renderLanes = current.child;
		current = renderLanes.sibling;
		renderLanes = createWorkInProgress(renderLanes, {
			mode: "visible",
			children: nextProps.children
		});
		renderLanes.return = workInProgress;
		renderLanes.sibling = null;
		null !== current && (JSCompiler_temp = workInProgress.deletions, null === JSCompiler_temp ? (workInProgress.deletions = [current], workInProgress.flags |= 16) : JSCompiler_temp.push(current));
		workInProgress.child = renderLanes;
		workInProgress.memoizedState = null;
		return renderLanes;
	}
	function mountSuspensePrimaryChildren(workInProgress, primaryChildren) {
		primaryChildren = mountWorkInProgressOffscreenFiber({
			mode: "visible",
			children: primaryChildren
		}, workInProgress.mode);
		primaryChildren.return = workInProgress;
		return workInProgress.child = primaryChildren;
	}
	function mountWorkInProgressOffscreenFiber(offscreenProps, mode) {
		offscreenProps = createFiberImplClass(22, offscreenProps, null, mode);
		offscreenProps.lanes = 0;
		return offscreenProps;
	}
	function retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes) {
		reconcileChildFibers(workInProgress, current.child, null, renderLanes);
		current = mountSuspensePrimaryChildren(workInProgress, workInProgress.pendingProps.children);
		current.flags |= 2;
		workInProgress.memoizedState = null;
		return current;
	}
	function updateDehydratedSuspenseComponent(current, workInProgress, didSuspend, didPrimaryChildrenDefer, nextProps, suspenseInstance, suspenseState, renderLanes) {
		if (didSuspend) {
			if (workInProgress.flags & 256) return pushPrimaryTreeSuspenseHandler(workInProgress), workInProgress.flags &= -257, retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes);
			if (null !== workInProgress.memoizedState) return reuseSuspenseHandlerOnStack(), workInProgress.child = current.child, workInProgress.flags |= 128, null;
			reuseSuspenseHandlerOnStack();
			suspenseInstance = nextProps.fallback;
			suspenseState = workInProgress.mode;
			nextProps = mountWorkInProgressOffscreenFiber({
				mode: "visible",
				children: nextProps.children
			}, suspenseState);
			suspenseInstance = createFiberFromFragment(suspenseInstance, suspenseState, renderLanes, null);
			suspenseInstance.flags |= 2;
			nextProps.return = workInProgress;
			suspenseInstance.return = workInProgress;
			nextProps.sibling = suspenseInstance;
			workInProgress.child = nextProps;
			reconcileChildFibers(workInProgress, current.child, null, renderLanes);
			nextProps = workInProgress.child;
			nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes);
			nextProps.childLanes = getRemainingWorkInPrimaryTree(current, didPrimaryChildrenDefer, renderLanes);
			workInProgress.memoizedState = SUSPENDED_MARKER;
			return bailoutOffscreenComponent(null, nextProps);
		}
		pushPrimaryTreeSuspenseHandler(workInProgress);
		if (isSuspenseInstanceFallback(suspenseInstance)) {
			didPrimaryChildrenDefer = suspenseInstance.nextSibling && suspenseInstance.nextSibling.dataset;
			if (didPrimaryChildrenDefer) var digest = didPrimaryChildrenDefer.dgst;
			didPrimaryChildrenDefer = digest;
			"" !== didPrimaryChildrenDefer && (nextProps = Error(formatProdErrorMessage(419)), nextProps.stack = "", nextProps.digest = didPrimaryChildrenDefer, queueHydrationError({
				value: nextProps,
				source: null,
				stack: null
			}));
			return retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes);
		}
		didReceiveUpdate || propagateParentContextChanges(current, workInProgress, renderLanes, !1);
		didPrimaryChildrenDefer = 0 !== (renderLanes & current.childLanes);
		if (didReceiveUpdate || didPrimaryChildrenDefer) {
			if (null !== currentTreeHiddenStackCursor.current) return retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes);
			didPrimaryChildrenDefer = workInProgressRoot;
			if (null !== didPrimaryChildrenDefer && (nextProps = getBumpedLaneForHydration(didPrimaryChildrenDefer, renderLanes), 0 !== nextProps && nextProps !== suspenseState.retryLane)) throw suspenseState.retryLane = nextProps, enqueueConcurrentRenderForLane(current, nextProps), scheduleUpdateOnFiber(didPrimaryChildrenDefer, current, nextProps), SelectiveHydrationException;
			isSuspenseInstancePending(suspenseInstance) || renderDidSuspendDelayIfPossible();
			return retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes);
		}
		if (isSuspenseInstancePending(suspenseInstance)) return workInProgress.flags |= 192, workInProgress.child = current.child, null;
		current = suspenseState.treeContext;
		nextHydratableInstance = getNextHydratable(suspenseInstance.nextSibling);
		hydrationParentFiber = workInProgress;
		isHydrating = !0;
		hydrationErrors = null;
		rootOrSingletonContext = !1;
		null !== current && restoreSuspendedTreeContext(workInProgress, current);
		workInProgress = mountSuspensePrimaryChildren(workInProgress, nextProps.children);
		workInProgress.flags |= 134221824;
		return workInProgress;
	}
	function scheduleSuspenseWorkOnFiber(fiber, renderLanes, propagationRoot) {
		fiber.lanes |= renderLanes;
		var alternate = fiber.alternate;
		null !== alternate && (alternate.lanes |= renderLanes);
		scheduleContextWorkOnParentPath(fiber.return, renderLanes, propagationRoot);
	}
	function findLastContentRow(firstChild) {
		for (var lastContentRow = null; null !== firstChild;) {
			var currentRow = firstChild.alternate;
			null !== currentRow && null === findFirstSuspended(currentRow) && (lastContentRow = firstChild);
			firstChild = firstChild.sibling;
		}
		return lastContentRow;
	}
	function initSuspenseListRenderState(workInProgress, isBackwards, tail, lastContentRow, tailMode, treeForkCount) {
		var renderState = workInProgress.memoizedState;
		null === renderState ? workInProgress.memoizedState = {
			isBackwards,
			rendering: null,
			renderingStartTime: 0,
			last: lastContentRow,
			tail,
			tailMode,
			treeForkCount
		} : (renderState.isBackwards = isBackwards, renderState.rendering = null, renderState.renderingStartTime = 0, renderState.last = lastContentRow, renderState.tail = tail, renderState.tailMode = tailMode, renderState.treeForkCount = treeForkCount);
	}
	function reverseChildren(fiber) {
		var row = fiber.child;
		for (fiber.child = null; null !== row;) {
			var nextRow = row.sibling;
			row.sibling = fiber.child;
			fiber.child = row;
			row = nextRow;
		}
	}
	function updateSuspenseListComponent(current, workInProgress, renderLanes) {
		var nextProps = workInProgress.pendingProps, revealOrder = nextProps.revealOrder, tailMode = nextProps.tail;
		nextProps = nextProps.children;
		var suspenseContext = suspenseStackCursor.current;
		if (workInProgress.flags & 128) return pushSuspenseListContext(workInProgress, suspenseContext), null;
		var shouldForceFallback = 0 !== (suspenseContext & 2);
		shouldForceFallback ? (suspenseContext = suspenseContext & 1 | 2, workInProgress.flags |= 128) : suspenseContext &= 1;
		pushSuspenseListContext(workInProgress, suspenseContext);
		"backwards" === revealOrder && null !== current ? (reverseChildren(current), reconcileChildren(current, workInProgress, nextProps, renderLanes), reverseChildren(current)) : reconcileChildren(current, workInProgress, nextProps, renderLanes);
		nextProps = isHydrating ? treeForkCount : 0;
		if (!shouldForceFallback && null !== current && 0 !== (current.flags & 128)) a: for (current = workInProgress.child; null !== current;) {
			if (13 === current.tag) null !== current.memoizedState && scheduleSuspenseWorkOnFiber(current, renderLanes, workInProgress);
			else if (19 === current.tag) scheduleSuspenseWorkOnFiber(current, renderLanes, workInProgress);
			else if (null !== current.child) {
				current.child.return = current;
				current = current.child;
				continue;
			}
			if (current === workInProgress) break a;
			for (; null === current.sibling;) {
				if (null === current.return || current.return === workInProgress) break a;
				current = current.return;
			}
			current.sibling.return = current.return;
			current = current.sibling;
		}
		switch (revealOrder) {
			case "backwards":
				renderLanes = findLastContentRow(workInProgress.child);
				null === renderLanes ? (revealOrder = workInProgress.child, workInProgress.child = null) : (revealOrder = renderLanes.sibling, renderLanes.sibling = null, reverseChildren(workInProgress));
				initSuspenseListRenderState(workInProgress, !0, revealOrder, null, tailMode, nextProps);
				break;
			case "unstable_legacy-backwards":
				renderLanes = null;
				revealOrder = workInProgress.child;
				for (workInProgress.child = null; null !== revealOrder;) {
					current = revealOrder.alternate;
					if (null !== current && null === findFirstSuspended(current)) {
						workInProgress.child = revealOrder;
						break;
					}
					current = revealOrder.sibling;
					revealOrder.sibling = renderLanes;
					renderLanes = revealOrder;
					revealOrder = current;
				}
				initSuspenseListRenderState(workInProgress, !0, renderLanes, null, tailMode, nextProps);
				break;
			case "together":
				initSuspenseListRenderState(workInProgress, !1, null, null, void 0, nextProps);
				break;
			case "independent":
				workInProgress.memoizedState = null;
				break;
			default: renderLanes = findLastContentRow(workInProgress.child), null === renderLanes ? (revealOrder = workInProgress.child, workInProgress.child = null) : (revealOrder = renderLanes.sibling, renderLanes.sibling = null), initSuspenseListRenderState(workInProgress, !1, revealOrder, renderLanes, tailMode, nextProps);
		}
		return workInProgress.child;
	}
	function updateContextProvider(current, workInProgress, renderLanes) {
		var newProps = workInProgress.pendingProps;
		pushProvider(workInProgress, workInProgress.type, newProps.value);
		reconcileChildren(current, workInProgress, newProps.children, renderLanes);
		return workInProgress.child;
	}
	function bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes) {
		null !== current && (workInProgress.dependencies = current.dependencies);
		workInProgressRootSkippedLanes |= workInProgress.lanes;
		if (0 === (renderLanes & workInProgress.childLanes)) if (null !== current) {
			if (propagateParentContextChanges(current, workInProgress, renderLanes, !1), 0 === (renderLanes & workInProgress.childLanes)) return null;
		} else return null;
		if (null !== current && workInProgress.child !== current.child) throw Error(formatProdErrorMessage(153));
		if (null !== workInProgress.child) {
			current = workInProgress.child;
			renderLanes = createWorkInProgress(current, current.pendingProps);
			workInProgress.child = renderLanes;
			for (renderLanes.return = workInProgress; null !== current.sibling;) current = current.sibling, renderLanes = renderLanes.sibling = createWorkInProgress(current, current.pendingProps), renderLanes.return = workInProgress;
			renderLanes.sibling = null;
		}
		return workInProgress.child;
	}
	function checkScheduledUpdateOrContext(current, renderLanes) {
		if (0 !== (current.lanes & renderLanes)) return !0;
		current = current.dependencies;
		return null !== current && checkIfContextChanged(current) ? !0 : !1;
	}
	function attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress, renderLanes) {
		switch (workInProgress.tag) {
			case 3:
				pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
				pushProvider(workInProgress, CacheContext, current.memoizedState.cache);
				resetHydrationState();
				break;
			case 27:
			case 5:
				pushHostContext(workInProgress);
				break;
			case 4:
				pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
				break;
			case 10:
				pushProvider(workInProgress, workInProgress.type, workInProgress.memoizedProps.value);
				break;
			case 31:
				if (null !== workInProgress.memoizedState) return workInProgress.flags |= 128, pushDehydratedActivitySuspenseHandler(workInProgress), null;
				break;
			case 13:
				var state$108 = workInProgress.memoizedState;
				if (null !== state$108) {
					if (null !== state$108.dehydrated) return pushPrimaryTreeSuspenseHandler(workInProgress), workInProgress.flags |= 128, null;
					state$108 = propagateParentContextChanges(current, workInProgress, renderLanes, !1);
					var primaryChildLanes = workInProgress.child.childLanes;
					if (state$108 || 0 !== (renderLanes & primaryChildLanes)) return updateSuspenseComponent(current, workInProgress, renderLanes);
					pushPrimaryTreeSuspenseHandler(workInProgress);
					current = bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
					return null !== current ? current.sibling : null;
				}
				pushPrimaryTreeSuspenseHandler(workInProgress);
				break;
			case 19:
				if (workInProgress.flags & 128) return updateSuspenseListComponent(current, workInProgress, renderLanes);
				primaryChildLanes = 0 !== (current.flags & 128);
				state$108 = 0 !== (renderLanes & workInProgress.childLanes);
				state$108 || (propagateParentContextChanges(current, workInProgress, renderLanes, !1), state$108 = 0 !== (renderLanes & workInProgress.childLanes));
				if (primaryChildLanes) {
					if (state$108) return updateSuspenseListComponent(current, workInProgress, renderLanes);
					workInProgress.flags |= 128;
				}
				primaryChildLanes = workInProgress.memoizedState;
				null !== primaryChildLanes && (primaryChildLanes.rendering = null, primaryChildLanes.tail = null, primaryChildLanes.lastEffect = null);
				pushSuspenseListContext(workInProgress, suspenseStackCursor.current);
				if (state$108) break;
				else return null;
			case 22: return workInProgress.lanes = 0, updateOffscreenComponent(current, workInProgress, renderLanes, workInProgress.pendingProps);
			case 24: pushProvider(workInProgress, CacheContext, current.memoizedState.cache);
		}
		return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
	}
	function beginWork(current, workInProgress, renderLanes) {
		if (null !== current) if (current.memoizedProps !== workInProgress.pendingProps) didReceiveUpdate = !0;
		else {
			if (!checkScheduledUpdateOrContext(current, renderLanes) && 0 === (workInProgress.flags & 128)) return didReceiveUpdate = !1, attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress, renderLanes);
			didReceiveUpdate = 0 !== (current.flags & 131072) ? !0 : !1;
		}
		else didReceiveUpdate = !1, isHydrating && 0 !== (workInProgress.flags & 1048576) && pushTreeId(workInProgress, treeForkCount, workInProgress.index);
		workInProgress.lanes = 0;
		switch (workInProgress.tag) {
			case 16:
				a: {
					var props = workInProgress.pendingProps;
					current = resolveLazy(workInProgress.elementType);
					workInProgress.type = current;
					if ("function" === typeof current) shouldConstruct(current) ? (props = resolveClassComponentProps(current, props), workInProgress.tag = 1, workInProgress = updateClassComponent(null, workInProgress, current, props, renderLanes)) : (workInProgress.tag = 0, workInProgress = updateFunctionComponent(null, workInProgress, current, props, renderLanes));
					else {
						if (void 0 !== current && null !== current) {
							var $$typeof = current.$$typeof;
							if ($$typeof === REACT_FORWARD_REF_TYPE) {
								workInProgress.tag = 11;
								workInProgress = updateForwardRef(null, workInProgress, current, props, renderLanes);
								break a;
							} else if ($$typeof === REACT_MEMO_TYPE) {
								workInProgress.tag = 14;
								workInProgress = updateMemoComponent(null, workInProgress, current, props, renderLanes);
								break a;
							} else if ($$typeof === REACT_CONTEXT_TYPE) {
								workInProgress.tag = 10;
								workInProgress.type = current;
								workInProgress = updateContextProvider(null, workInProgress, renderLanes);
								break a;
							}
						}
						workInProgress = getComponentNameFromType(current) || current;
						throw Error(formatProdErrorMessage(306, workInProgress, ""));
					}
				}
				return workInProgress;
			case 0: return updateFunctionComponent(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
			case 1: return props = workInProgress.type, $$typeof = resolveClassComponentProps(props, workInProgress.pendingProps), updateClassComponent(current, workInProgress, props, $$typeof, renderLanes);
			case 3:
				a: {
					pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
					if (null === current) throw Error(formatProdErrorMessage(387));
					props = workInProgress.pendingProps;
					var prevState = workInProgress.memoizedState;
					$$typeof = prevState.element;
					cloneUpdateQueue(current, workInProgress);
					processUpdateQueue(workInProgress, props, null, renderLanes);
					var nextState = workInProgress.memoizedState;
					props = nextState.cache;
					pushProvider(workInProgress, CacheContext, props);
					props !== prevState.cache && propagateContextChanges(workInProgress, [CacheContext], renderLanes, !0);
					suspendIfUpdateReadFromEntangledAsyncAction();
					props = nextState.element;
					if (prevState.isDehydrated) if (prevState = {
						element: props,
						isDehydrated: !1,
						cache: nextState.cache
					}, workInProgress.updateQueue.baseState = prevState, workInProgress.memoizedState = prevState, workInProgress.flags & 256) {
						workInProgress = mountHostRootWithoutHydrating(current, workInProgress, props, renderLanes);
						break a;
					} else if (props !== $$typeof) {
						$$typeof = createCapturedValueAtFiber(Error(formatProdErrorMessage(424)), workInProgress);
						queueHydrationError($$typeof);
						workInProgress = mountHostRootWithoutHydrating(current, workInProgress, props, renderLanes);
						break a;
					} else {
						current = workInProgress.stateNode.containerInfo;
						switch (current.nodeType) {
							case 9:
								current = current.body;
								break;
							default: current = "HTML" === current.nodeName ? current.ownerDocument.body : current;
						}
						nextHydratableInstance = getNextHydratable(current.firstChild);
						hydrationParentFiber = workInProgress;
						isHydrating = !0;
						hydrationErrors = null;
						rootOrSingletonContext = !0;
						renderLanes = mountChildFibers(workInProgress, null, props, renderLanes);
						for (workInProgress.child = renderLanes; renderLanes;) renderLanes.flags = renderLanes.flags & -3 | 134221824, renderLanes = renderLanes.sibling;
					}
					else {
						resetHydrationState();
						if (props === $$typeof) {
							workInProgress = bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
							break a;
						}
						reconcileChildren(current, workInProgress, props, renderLanes);
					}
					workInProgress = workInProgress.child;
				}
				return workInProgress;
			case 26: return markRef(current, workInProgress), null === current ? (renderLanes = getResource(workInProgress.type, null, workInProgress.pendingProps, null)) ? workInProgress.memoizedState = renderLanes : isHydrating || (workInProgress.stateNode = createHoistableInstance(workInProgress.type, workInProgress.pendingProps, rootInstanceStackCursor.current, workInProgress)) : workInProgress.memoizedState = getResource(workInProgress.type, current.memoizedProps, workInProgress.pendingProps, current.memoizedState), null;
			case 27: return pushHostContext(workInProgress), null === current && isHydrating && (props = workInProgress.stateNode = resolveSingletonInstance(workInProgress.type, workInProgress.pendingProps, rootInstanceStackCursor.current), hydrationParentFiber = workInProgress, rootOrSingletonContext = !0, $$typeof = nextHydratableInstance, isSingletonScope(workInProgress.type) ? (previousHydratableOnEnteringScopedSingleton = $$typeof, nextHydratableInstance = getNextHydratable(props.firstChild)) : nextHydratableInstance = $$typeof), reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), markRef(current, workInProgress), null === current && (workInProgress.flags |= 4194304), workInProgress.child;
			case 5:
				if (null === current && isHydrating) {
					if ($$typeof = props = nextHydratableInstance) props = canHydrateInstance(props, workInProgress.type, workInProgress.pendingProps, rootOrSingletonContext), null !== props ? (workInProgress.stateNode = props, hydrationParentFiber = workInProgress, nextHydratableInstance = getNextHydratable(props.firstChild), rootOrSingletonContext = !1, $$typeof = !0) : $$typeof = !1;
					$$typeof || throwOnHydrationMismatch(workInProgress);
				}
				pushHostContext(workInProgress);
				$$typeof = workInProgress.type;
				prevState = workInProgress.pendingProps;
				nextState = null !== current ? current.memoizedProps : null;
				props = prevState.children;
				shouldSetTextContent($$typeof, prevState) ? props = null : null !== nextState && shouldSetTextContent($$typeof, nextState) && (workInProgress.flags |= 32);
				null !== workInProgress.memoizedState && ($$typeof = renderWithHooks(current, workInProgress, TransitionAwareHostComponent, null, null, renderLanes), HostTransitionContext._currentValue = $$typeof);
				markRef(current, workInProgress);
				reconcileChildren(current, workInProgress, props, renderLanes);
				return workInProgress.child;
			case 6:
				if (null === current && isHydrating) {
					if (current = renderLanes = nextHydratableInstance) renderLanes = canHydrateTextInstance(renderLanes, workInProgress.pendingProps, rootOrSingletonContext), null !== renderLanes ? (workInProgress.stateNode = renderLanes, hydrationParentFiber = workInProgress, nextHydratableInstance = null, current = !0) : current = !1;
					current || throwOnHydrationMismatch(workInProgress);
				}
				return null;
			case 13: return updateSuspenseComponent(current, workInProgress, renderLanes);
			case 4: return pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo), props = workInProgress.pendingProps, null === current ? workInProgress.child = reconcileChildFibers(workInProgress, null, props, renderLanes) : reconcileChildren(current, workInProgress, props, renderLanes), workInProgress.child;
			case 11: return updateForwardRef(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
			case 7: return props = workInProgress.pendingProps, markRef(current, workInProgress), reconcileChildren(current, workInProgress, props, renderLanes), workInProgress.child;
			case 8: return reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.child;
			case 12: return reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.child;
			case 10: return updateContextProvider(current, workInProgress, renderLanes);
			case 9: return $$typeof = workInProgress.type._context, props = workInProgress.pendingProps.children, prepareToReadContext(workInProgress), $$typeof = readContext($$typeof), props = props($$typeof), workInProgress.flags |= 1, reconcileChildren(current, workInProgress, props, renderLanes), workInProgress.child;
			case 14: return updateMemoComponent(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
			case 15: return updateSimpleMemoComponent(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
			case 19: return updateSuspenseListComponent(current, workInProgress, renderLanes);
			case 31: return updateActivityComponent(current, workInProgress, renderLanes);
			case 22: return updateOffscreenComponent(current, workInProgress, renderLanes, workInProgress.pendingProps);
			case 24: return prepareToReadContext(workInProgress), props = readContext(CacheContext), null === current ? ($$typeof = peekCacheFromPool(), null === $$typeof && ($$typeof = workInProgressRoot, prevState = createCache(), $$typeof.pooledCache = prevState, prevState.refCount++, null !== prevState && ($$typeof.pooledCacheLanes |= renderLanes), $$typeof = prevState), workInProgress.memoizedState = {
				parent: props,
				cache: $$typeof
			}, initializeUpdateQueue(workInProgress), pushProvider(workInProgress, CacheContext, $$typeof)) : (0 !== (current.lanes & renderLanes) && (cloneUpdateQueue(current, workInProgress), processUpdateQueue(workInProgress, null, null, renderLanes), suspendIfUpdateReadFromEntangledAsyncAction()), $$typeof = current.memoizedState, prevState = workInProgress.memoizedState, $$typeof.parent !== props ? ($$typeof = {
				parent: props,
				cache: props
			}, workInProgress.memoizedState = $$typeof, 0 === workInProgress.lanes && (workInProgress.memoizedState = workInProgress.updateQueue.baseState = $$typeof), pushProvider(workInProgress, CacheContext, props)) : (props = prevState.cache, pushProvider(workInProgress, CacheContext, props), props !== $$typeof.cache && propagateContextChanges(workInProgress, [CacheContext], renderLanes, !0))), reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.child;
			case 30: return null === workInProgress.stateNode && (workInProgress.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}), props = workInProgress.pendingProps, null != props.name && "auto" !== props.name ? workInProgress.flags |= null === current ? 18882560 : 18874368 : isHydrating && pushMaterializedTreeId(workInProgress), null !== current && current.memoizedProps.name !== props.name ? workInProgress.flags |= 4194816 : markRef(current, workInProgress), reconcileChildren(current, workInProgress, props.children, renderLanes), workInProgress.child;
			case 29: throw workInProgress.pendingProps;
		}
		throw Error(formatProdErrorMessage(156, workInProgress.tag));
	}
	function markUpdate(workInProgress) {
		workInProgress.flags |= 4;
	}
	function preloadInstanceAndSuspendIfNeeded(workInProgress, type, oldProps, newProps, renderLanes) {
		var JSCompiler_temp;
		if (JSCompiler_temp = 0 !== (workInProgress.mode & 32)) JSCompiler_temp = null === oldProps ? maySuspendCommit(type, newProps) : maySuspendCommit(type, newProps) && (newProps.src !== oldProps.src || newProps.srcSet !== oldProps.srcSet);
		if (JSCompiler_temp) {
			if (workInProgress.flags |= 16777216, (renderLanes & 335544128) === renderLanes) if (workInProgress.stateNode.complete) workInProgress.flags |= 8192;
			else if (shouldRemainOnPreviousScreen()) workInProgress.flags |= 8192;
			else throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
		} else workInProgress.flags &= -16777217;
	}
	function preloadResourceAndSuspendIfNeeded(workInProgress, resource) {
		if ("stylesheet" !== resource.type || 0 !== (resource.state.loading & 4)) workInProgress.flags &= -16777217;
		else if (workInProgress.flags |= 16777216, !preloadResource(resource)) if (shouldRemainOnPreviousScreen()) workInProgress.flags |= 8192;
		else throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
	}
	function scheduleRetryEffect(workInProgress, retryQueue) {
		null !== retryQueue && (workInProgress.flags |= 4);
		workInProgress.flags & 16384 && (retryQueue = 22 !== workInProgress.tag ? claimNextRetryLane() : 536870912, workInProgress.lanes |= retryQueue, workInProgressSuspendedRetryLanes |= retryQueue);
	}
	function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
		if (!isHydrating) switch (renderState.tailMode) {
			case "visible": break;
			case "collapsed":
				for (var tailNode = renderState.tail, lastTailNode = null; null !== tailNode;) null !== tailNode.alternate && (lastTailNode = tailNode), tailNode = tailNode.sibling;
				null === lastTailNode ? hasRenderedATailFallback || null === renderState.tail ? renderState.tail = null : renderState.tail.sibling = null : lastTailNode.sibling = null;
				break;
			default:
				hasRenderedATailFallback = renderState.tail;
				for (tailNode = null; null !== hasRenderedATailFallback;) null !== hasRenderedATailFallback.alternate && (tailNode = hasRenderedATailFallback), hasRenderedATailFallback = hasRenderedATailFallback.sibling;
				null === tailNode ? renderState.tail = null : tailNode.sibling = null;
		}
	}
	function bubbleProperties(completedWork) {
		var didBailout = null !== completedWork.alternate && completedWork.alternate.child === completedWork.child, newChildLanes = 0, subtreeFlags = 0;
		if (didBailout) for (var child$113 = completedWork.child; null !== child$113;) newChildLanes |= child$113.lanes | child$113.childLanes, subtreeFlags |= child$113.subtreeFlags & 1206910976, subtreeFlags |= child$113.flags & 1206910976, child$113.return = completedWork, child$113 = child$113.sibling;
		else for (child$113 = completedWork.child; null !== child$113;) newChildLanes |= child$113.lanes | child$113.childLanes, subtreeFlags |= child$113.subtreeFlags, subtreeFlags |= child$113.flags, child$113.return = completedWork, child$113 = child$113.sibling;
		completedWork.subtreeFlags |= subtreeFlags;
		completedWork.childLanes = newChildLanes;
		return didBailout;
	}
	function completeWork(current, workInProgress, renderLanes) {
		var newProps = workInProgress.pendingProps;
		popTreeContext(workInProgress);
		switch (workInProgress.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return bubbleProperties(workInProgress), null;
			case 1: return bubbleProperties(workInProgress), null;
			case 3:
				renderLanes = workInProgress.stateNode;
				newProps = null;
				null !== current && (newProps = current.memoizedState.cache);
				workInProgress.memoizedState.cache !== newProps && (workInProgress.flags |= 2048);
				popProvider(CacheContext);
				popHostContainer();
				renderLanes.pendingContext && (renderLanes.context = renderLanes.pendingContext, renderLanes.pendingContext = null);
				if (null === current || null === current.child) popHydrationState(workInProgress) ? markUpdate(workInProgress) : null === current || current.memoizedState.isDehydrated && 0 === (workInProgress.flags & 256) || (workInProgress.flags |= 1024, upgradeHydrationErrorsToRecoverable());
				bubbleProperties(workInProgress);
				return null;
			case 26:
				var type = workInProgress.type, nextResource = workInProgress.memoizedState;
				null === current ? (markUpdate(workInProgress), null !== nextResource ? (bubbleProperties(workInProgress), preloadResourceAndSuspendIfNeeded(workInProgress, nextResource)) : (bubbleProperties(workInProgress), preloadInstanceAndSuspendIfNeeded(workInProgress, type, null, newProps, renderLanes))) : nextResource ? nextResource !== current.memoizedState ? (markUpdate(workInProgress), bubbleProperties(workInProgress), preloadResourceAndSuspendIfNeeded(workInProgress, nextResource)) : (bubbleProperties(workInProgress), workInProgress.flags &= -16777217) : (current = current.memoizedProps, current !== newProps && markUpdate(workInProgress), bubbleProperties(workInProgress), preloadInstanceAndSuspendIfNeeded(workInProgress, type, current, newProps, renderLanes));
				return null;
			case 27:
				popHostContext(workInProgress);
				renderLanes = rootInstanceStackCursor.current;
				type = workInProgress.type;
				if (null !== current && null != workInProgress.stateNode) current.memoizedProps !== newProps && markUpdate(workInProgress);
				else {
					if (!newProps) {
						if (null === workInProgress.stateNode) throw Error(formatProdErrorMessage(166));
						bubbleProperties(workInProgress);
						workInProgress.subtreeFlags &= -33554433;
						return null;
					}
					current = contextStackCursor.current;
					popHydrationState(workInProgress) ? prepareToHydrateHostInstance(workInProgress, current) : (current = resolveSingletonInstance(type, newProps, renderLanes), workInProgress.stateNode = current, markUpdate(workInProgress));
				}
				bubbleProperties(workInProgress);
				workInProgress.subtreeFlags &= -33554433;
				return null;
			case 5:
				popHostContext(workInProgress);
				type = workInProgress.type;
				if (null !== current && null != workInProgress.stateNode) current.memoizedProps !== newProps && markUpdate(workInProgress);
				else {
					if (!newProps) {
						if (null === workInProgress.stateNode) throw Error(formatProdErrorMessage(166));
						bubbleProperties(workInProgress);
						workInProgress.subtreeFlags &= -33554433;
						return null;
					}
					nextResource = contextStackCursor.current;
					if (popHydrationState(workInProgress)) prepareToHydrateHostInstance(workInProgress, nextResource);
					else {
						var ownerDocument = getOwnerDocumentFromRootContainer(rootInstanceStackCursor.current);
						switch (nextResource) {
							case 1:
								nextResource = ownerDocument.createElementNS("http://www.w3.org/2000/svg", type);
								break;
							case 2:
								nextResource = ownerDocument.createElementNS("http://www.w3.org/1998/Math/MathML", type);
								break;
							default: switch (type) {
								case "svg":
									nextResource = ownerDocument.createElementNS("http://www.w3.org/2000/svg", type);
									break;
								case "math":
									nextResource = ownerDocument.createElementNS("http://www.w3.org/1998/Math/MathML", type);
									break;
								case "script":
									nextResource = ownerDocument.createElement("div");
									nextResource.innerHTML = "<script><\/script>";
									nextResource = nextResource.removeChild(nextResource.firstChild);
									break;
								case "select":
									nextResource = "string" === typeof newProps.is ? ownerDocument.createElement("select", { is: newProps.is }) : ownerDocument.createElement("select");
									newProps.multiple ? nextResource.multiple = !0 : newProps.size && (nextResource.size = newProps.size);
									break;
								default: nextResource = "string" === typeof newProps.is ? ownerDocument.createElement(type, { is: newProps.is }) : ownerDocument.createElement(type);
							}
						}
						nextResource[internalInstanceKey] = workInProgress;
						nextResource[internalPropsKey] = newProps;
						a: for (ownerDocument = workInProgress.child; null !== ownerDocument;) {
							if (5 === ownerDocument.tag || 6 === ownerDocument.tag) nextResource.appendChild(ownerDocument.stateNode);
							else if (4 !== ownerDocument.tag && 27 !== ownerDocument.tag && null !== ownerDocument.child) {
								ownerDocument.child.return = ownerDocument;
								ownerDocument = ownerDocument.child;
								continue;
							}
							if (ownerDocument === workInProgress) break a;
							for (; null === ownerDocument.sibling;) {
								if (null === ownerDocument.return || ownerDocument.return === workInProgress) break a;
								ownerDocument = ownerDocument.return;
							}
							ownerDocument.sibling.return = ownerDocument.return;
							ownerDocument = ownerDocument.sibling;
						}
						workInProgress.stateNode = nextResource;
						a: switch (setInitialProperties(nextResource, type, newProps), type) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								newProps = !!newProps.autoFocus;
								break a;
							case "img":
								newProps = !0;
								break a;
							default: newProps = !1;
						}
						newProps && markUpdate(workInProgress);
					}
				}
				bubbleProperties(workInProgress);
				workInProgress.subtreeFlags &= -33554433;
				preloadInstanceAndSuspendIfNeeded(workInProgress, workInProgress.type, null === current ? null : current.memoizedProps, workInProgress.pendingProps, renderLanes);
				return null;
			case 6:
				if (current && null != workInProgress.stateNode) current.memoizedProps !== newProps && markUpdate(workInProgress);
				else {
					if ("string" !== typeof newProps && null === workInProgress.stateNode) throw Error(formatProdErrorMessage(166));
					current = rootInstanceStackCursor.current;
					if (popHydrationState(workInProgress)) {
						current = workInProgress.stateNode;
						renderLanes = workInProgress.memoizedProps;
						newProps = null;
						type = hydrationParentFiber;
						if (null !== type) switch (type.tag) {
							case 27:
							case 5: newProps = type.memoizedProps;
						}
						current[internalInstanceKey] = workInProgress;
						current = current.nodeValue === renderLanes || null !== newProps && !0 === newProps.suppressHydrationWarning || checkForUnmatchedText(current.nodeValue, renderLanes) ? !0 : !1;
						current || throwOnHydrationMismatch(workInProgress, !0);
					} else current = getOwnerDocumentFromRootContainer(current).createTextNode(newProps), current[internalInstanceKey] = workInProgress, workInProgress.stateNode = current;
				}
				bubbleProperties(workInProgress);
				return null;
			case 31:
				renderLanes = workInProgress.memoizedState;
				if (null === current || null !== current.memoizedState) {
					newProps = popHydrationState(workInProgress);
					if (null !== renderLanes) {
						if (null === current) {
							if (!newProps) throw Error(formatProdErrorMessage(318));
							current = workInProgress.memoizedState;
							current = null !== current ? current.dehydrated : null;
							if (!current) throw Error(formatProdErrorMessage(557));
							current[internalInstanceKey] = workInProgress;
						} else resetHydrationState(), 0 === (workInProgress.flags & 128) && (workInProgress.memoizedState = null), workInProgress.flags |= 4;
						bubbleProperties(workInProgress);
						current = !1;
					} else renderLanes = upgradeHydrationErrorsToRecoverable(), null !== current && null !== current.memoizedState && (current.memoizedState.hydrationErrors = renderLanes), current = !0;
					if (!current) {
						if (workInProgress.flags & 256) return popSuspenseHandler(workInProgress), workInProgress;
						popSuspenseHandler(workInProgress);
						return null;
					}
					if (0 !== (workInProgress.flags & 128)) throw Error(formatProdErrorMessage(558));
				}
				bubbleProperties(workInProgress);
				return null;
			case 13:
				newProps = workInProgress.memoizedState;
				if (null === current || null !== current.memoizedState && null !== current.memoizedState.dehydrated) {
					type = popHydrationState(workInProgress);
					if (null !== newProps && null !== newProps.dehydrated) {
						if (null === current) {
							if (!type) throw Error(formatProdErrorMessage(318));
							type = workInProgress.memoizedState;
							type = null !== type ? type.dehydrated : null;
							if (!type) throw Error(formatProdErrorMessage(317));
							type[internalInstanceKey] = workInProgress;
						} else resetHydrationState(), 0 === (workInProgress.flags & 128) && (workInProgress.memoizedState = null), workInProgress.flags |= 4;
						bubbleProperties(workInProgress);
						type = !1;
					} else type = upgradeHydrationErrorsToRecoverable(), null !== current && null !== current.memoizedState && (current.memoizedState.hydrationErrors = type), type = !0;
					if (!type) {
						if (workInProgress.flags & 256) return popSuspenseHandler(workInProgress), workInProgress;
						popSuspenseHandler(workInProgress);
						return null;
					}
				}
				popSuspenseHandler(workInProgress);
				if (0 !== (workInProgress.flags & 128)) return workInProgress.lanes = renderLanes, workInProgress;
				renderLanes = null !== newProps;
				current = null !== current && null !== current.memoizedState;
				renderLanes && (newProps = workInProgress.child, type = null, null !== newProps.alternate && null !== newProps.alternate.memoizedState && null !== newProps.alternate.memoizedState.cachePool && (type = newProps.alternate.memoizedState.cachePool.pool), nextResource = null, null !== newProps.memoizedState && null !== newProps.memoizedState.cachePool && (nextResource = newProps.memoizedState.cachePool.pool), nextResource !== type && (newProps.flags |= 2048));
				renderLanes !== current && renderLanes && (workInProgress.child.flags |= 8192);
				scheduleRetryEffect(workInProgress, workInProgress.updateQueue);
				bubbleProperties(workInProgress);
				return null;
			case 4: return popHostContainer(), null === current && listenToAllSupportedEvents(workInProgress.stateNode.containerInfo), workInProgress.flags |= 67108864, bubbleProperties(workInProgress), null;
			case 10: return popProvider(workInProgress.type), bubbleProperties(workInProgress), null;
			case 19:
				popSuspenseListContext(workInProgress);
				newProps = workInProgress.memoizedState;
				if (null === newProps) return bubbleProperties(workInProgress), null;
				type = 0 !== (workInProgress.flags & 128);
				nextResource = newProps.rendering;
				if (null === nextResource) if (type) cutOffTailIfNeeded(newProps, !1);
				else {
					if (0 !== workInProgressRootExitStatus || null !== current && 0 !== (current.flags & 128)) for (current = workInProgress.child; null !== current;) {
						nextResource = findFirstSuspended(current);
						if (null !== nextResource) {
							workInProgress.flags |= 128;
							cutOffTailIfNeeded(newProps, !1);
							current = nextResource.updateQueue;
							workInProgress.updateQueue = current;
							scheduleRetryEffect(workInProgress, current);
							workInProgress.subtreeFlags = 0;
							current = renderLanes;
							for (renderLanes = workInProgress.child; null !== renderLanes;) resetWorkInProgress(renderLanes, current), renderLanes = renderLanes.sibling;
							pushSuspenseListContext(workInProgress, suspenseStackCursor.current & 1 | 2);
							isHydrating && pushTreeFork(workInProgress, newProps.treeForkCount);
							return workInProgress.child;
						}
						current = current.sibling;
					}
					null !== newProps.tail && now() > workInProgressRootRenderTargetTime && (workInProgress.flags |= 128, type = !0, cutOffTailIfNeeded(newProps, !1), workInProgress.lanes = 4194304);
				}
				else {
					if (!type) if (current = findFirstSuspended(nextResource), null !== current) {
						if (workInProgress.flags |= 128, type = !0, current = current.updateQueue, workInProgress.updateQueue = current, scheduleRetryEffect(workInProgress, current), cutOffTailIfNeeded(newProps, !0), null === newProps.tail && "collapsed" !== newProps.tailMode && "visible" !== newProps.tailMode && !nextResource.alternate && !isHydrating) return bubbleProperties(workInProgress), null;
					} else 2 * now() - newProps.renderingStartTime > workInProgressRootRenderTargetTime && 536870912 !== renderLanes && (workInProgress.flags |= 128, type = !0, cutOffTailIfNeeded(newProps, !1), workInProgress.lanes = 4194304);
					newProps.isBackwards ? (nextResource.sibling = workInProgress.child, workInProgress.child = nextResource) : (current = newProps.last, null !== current ? current.sibling = nextResource : workInProgress.child = nextResource, newProps.last = nextResource);
				}
				if (null !== newProps.tail) {
					current = newProps.tail;
					a: {
						for (renderLanes = current; null !== renderLanes;) {
							if (null !== renderLanes.alternate) {
								renderLanes = !1;
								break a;
							}
							renderLanes = renderLanes.sibling;
						}
						renderLanes = !0;
					}
					newProps.rendering = current;
					newProps.tail = current.sibling;
					newProps.renderingStartTime = now();
					current.sibling = null;
					nextResource = suspenseStackCursor.current;
					nextResource = type ? nextResource & 1 | 2 : nextResource & 1;
					"visible" === newProps.tailMode || "collapsed" === newProps.tailMode || !renderLanes || isHydrating ? pushSuspenseListContext(workInProgress, nextResource) : (renderLanes = nextResource, push(suspenseHandlerStackCursor, workInProgress), push(suspenseStackCursor, renderLanes), null === shellBoundary && (shellBoundary = workInProgress));
					isHydrating && pushTreeFork(workInProgress, newProps.treeForkCount);
					return current;
				}
				bubbleProperties(workInProgress);
				return null;
			case 22:
			case 23: return popSuspenseHandler(workInProgress), popHiddenContext(), newProps = null !== workInProgress.memoizedState, null !== current ? null !== current.memoizedState !== newProps && (workInProgress.flags |= 8192) : newProps && (workInProgress.flags |= 8192), newProps ? 0 !== (renderLanes & 536870912) && 0 === (workInProgress.flags & 128) && (bubbleProperties(workInProgress), workInProgress.subtreeFlags & 6 && (workInProgress.flags |= 8192)) : bubbleProperties(workInProgress), renderLanes = workInProgress.updateQueue, null !== renderLanes && scheduleRetryEffect(workInProgress, renderLanes.retryQueue), renderLanes = null, null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (renderLanes = current.memoizedState.cachePool.pool), newProps = null, null !== workInProgress.memoizedState && null !== workInProgress.memoizedState.cachePool && (newProps = workInProgress.memoizedState.cachePool.pool), newProps !== renderLanes && (workInProgress.flags |= 2048), null !== current && pop(resumedCache), null;
			case 24: return renderLanes = null, null !== current && (renderLanes = current.memoizedState.cache), workInProgress.memoizedState.cache !== renderLanes && (workInProgress.flags |= 2048), popProvider(CacheContext), bubbleProperties(workInProgress), null;
			case 25: return null;
			case 30: return workInProgress.flags |= 33554432, bubbleProperties(workInProgress), null;
		}
		throw Error(formatProdErrorMessage(156, workInProgress.tag));
	}
	function unwindWork(current, workInProgress) {
		popTreeContext(workInProgress);
		switch (workInProgress.tag) {
			case 1: return current = workInProgress.flags, current & 65536 ? (workInProgress.flags = current & -65537 | 128, workInProgress) : null;
			case 3: return popProvider(CacheContext), popHostContainer(), current = workInProgress.flags, 0 !== (current & 65536) && 0 === (current & 128) ? (workInProgress.flags = current & -65537 | 128, workInProgress) : null;
			case 26:
			case 27:
			case 5: return popHostContext(workInProgress), null;
			case 31:
				if (null !== workInProgress.memoizedState) {
					popSuspenseHandler(workInProgress);
					if (null === workInProgress.alternate) throw Error(formatProdErrorMessage(340));
					resetHydrationState();
				}
				current = workInProgress.flags;
				return current & 65536 ? (workInProgress.flags = current & -65537 | 128, workInProgress) : null;
			case 13:
				popSuspenseHandler(workInProgress);
				current = workInProgress.memoizedState;
				if (null !== current && null !== current.dehydrated) {
					if (null === workInProgress.alternate) throw Error(formatProdErrorMessage(340));
					resetHydrationState();
				}
				current = workInProgress.flags;
				return current & 65536 ? (workInProgress.flags = current & -65537 | 128, workInProgress) : null;
			case 19: return popSuspenseListContext(workInProgress), current = workInProgress.flags, current & 65536 ? (workInProgress.flags = current & -65537 | 128, current = workInProgress.memoizedState, null !== current && (current.rendering = null, current.tail = null), workInProgress.flags |= 4, workInProgress) : null;
			case 4: return popHostContainer(), null;
			case 10: return popProvider(workInProgress.type), null;
			case 22:
			case 23: return popSuspenseHandler(workInProgress), popHiddenContext(), null !== current && pop(resumedCache), current = workInProgress.flags, current & 65536 ? (workInProgress.flags = current & -65537 | 128, workInProgress) : null;
			case 24: return popProvider(CacheContext), null;
			case 25: return null;
			default: return null;
		}
	}
	function unwindInterruptedWork(current, interruptedWork) {
		popTreeContext(interruptedWork);
		switch (interruptedWork.tag) {
			case 3:
				popProvider(CacheContext);
				popHostContainer();
				break;
			case 26:
			case 27:
			case 5:
				popHostContext(interruptedWork);
				break;
			case 4:
				popHostContainer();
				break;
			case 31:
				null !== interruptedWork.memoizedState && popSuspenseHandler(interruptedWork);
				break;
			case 13:
				popSuspenseHandler(interruptedWork);
				break;
			case 19:
				popSuspenseListContext(interruptedWork);
				break;
			case 10:
				popProvider(interruptedWork.type);
				break;
			case 22:
			case 23:
				popSuspenseHandler(interruptedWork);
				popHiddenContext();
				null !== current && pop(resumedCache);
				break;
			case 24: popProvider(CacheContext);
		}
	}
	function commitHookEffectListMount(flags, finishedWork) {
		try {
			var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
			if (null !== lastEffect) {
				var firstEffect = lastEffect.next;
				updateQueue = firstEffect;
				do {
					if ((updateQueue.tag & flags) === flags) {
						lastEffect = void 0;
						var create = updateQueue.create, inst = updateQueue.inst;
						lastEffect = create();
						inst.destroy = lastEffect;
					}
					updateQueue = updateQueue.next;
				} while (updateQueue !== firstEffect);
			}
		} catch (error) {
			captureCommitPhaseError(finishedWork, finishedWork.return, error);
		}
	}
	function commitHookEffectListUnmount(flags, finishedWork, nearestMountedAncestor$jscomp$0) {
		try {
			var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
			if (null !== lastEffect) {
				var firstEffect = lastEffect.next;
				updateQueue = firstEffect;
				do {
					if ((updateQueue.tag & flags) === flags) {
						var inst = updateQueue.inst, destroy = inst.destroy;
						if (void 0 !== destroy) {
							inst.destroy = void 0;
							lastEffect = finishedWork;
							var nearestMountedAncestor = nearestMountedAncestor$jscomp$0, destroy_ = destroy;
							try {
								destroy_();
							} catch (error) {
								captureCommitPhaseError(lastEffect, nearestMountedAncestor, error);
							}
						}
					}
					updateQueue = updateQueue.next;
				} while (updateQueue !== firstEffect);
			}
		} catch (error) {
			captureCommitPhaseError(finishedWork, finishedWork.return, error);
		}
	}
	function commitClassCallbacks(finishedWork) {
		var updateQueue = finishedWork.updateQueue;
		if (null !== updateQueue) {
			var instance = finishedWork.stateNode;
			try {
				commitCallbacks(updateQueue, instance);
			} catch (error) {
				captureCommitPhaseError(finishedWork, finishedWork.return, error);
			}
		}
	}
	function safelyCallComponentWillUnmount(current, nearestMountedAncestor, instance) {
		instance.props = resolveClassComponentProps(current.type, current.memoizedProps);
		instance.state = current.memoizedState;
		try {
			instance.componentWillUnmount();
		} catch (error) {
			captureCommitPhaseError(current, nearestMountedAncestor, error);
		}
	}
	function safelyAttachRef(current, nearestMountedAncestor) {
		try {
			var ref = current.ref;
			if (null !== ref) {
				switch (current.tag) {
					case 26:
					case 27:
					case 5:
						var instanceToUse = current.stateNode;
						break;
					case 30:
						var instance = current.stateNode, name = getViewTransitionName(current.memoizedProps, instance);
						if (null === instance.ref || instance.ref.name !== name) instance.ref = createViewTransitionInstance(name);
						instanceToUse = instance.ref;
						break;
					case 7:
						if (null === current.stateNode) {
							var fragmentInstance = new FragmentInstance(current);
							traverseVisibleInstancesAndTextInstances(current.child, !1, addFragmentHandleToFiber, fragmentInstance, void 0, void 0);
							current.stateNode = fragmentInstance;
						}
						instanceToUse = current.stateNode;
						break;
					default: instanceToUse = current.stateNode;
				}
				"function" === typeof ref ? current.refCleanup = ref(instanceToUse) : ref.current = instanceToUse;
			}
		} catch (error) {
			captureCommitPhaseError(current, nearestMountedAncestor, error);
		}
	}
	function safelyDetachRef(current, nearestMountedAncestor) {
		var ref = current.ref, refCleanup = current.refCleanup;
		if (null !== ref) if ("function" === typeof refCleanup) try {
			refCleanup();
		} catch (error) {
			captureCommitPhaseError(current, nearestMountedAncestor, error);
		} finally {
			current.refCleanup = null, current = current.alternate, null != current && (current.refCleanup = null);
		}
		else if ("function" === typeof ref) try {
			ref(null);
		} catch (error$148) {
			captureCommitPhaseError(current, nearestMountedAncestor, error$148);
		}
		else ref.current = null;
	}
	function commitNewChildToFragmentInstances(fiber, parentFragmentInstances) {
		if ((5 === fiber.tag || 27 === fiber.tag || 6 === fiber.tag) && null === fiber.alternate && null !== parentFragmentInstances) for (var i = 0; i < parentFragmentInstances.length; i++) commitNewChildToFragmentInstance(fiber.stateNode, parentFragmentInstances[i]);
	}
	function commitFragmentInstanceInsertionEffects(fiber) {
		for (var parent = fiber.return; null !== parent;) {
			isFragmentInstanceParent(parent) && commitNewChildToFragmentInstance(fiber.stateNode, parent.stateNode);
			if (isFragmentInstanceHostBoundary(parent)) break;
			parent = parent.return;
		}
	}
	function commitFragmentInstanceDeletionEffects(fiber) {
		for (var parent = fiber.return; null !== parent;) {
			isFragmentInstanceParent(parent) && deleteChildFromFragmentInstance(fiber.stateNode, parent.stateNode);
			if (isFragmentInstanceHostBoundary(parent)) break;
			parent = parent.return;
		}
	}
	function isFragmentInstanceHostBoundary(fiber) {
		return 5 === fiber.tag || 3 === fiber.tag || 27 === fiber.tag;
	}
	function isFragmentInstanceParent(fiber) {
		return fiber && 7 === fiber.tag && null !== fiber.stateNode;
	}
	function commitHostMount(finishedWork) {
		var type = finishedWork.type, props = finishedWork.memoizedProps, instance = finishedWork.stateNode;
		try {
			a: switch (type) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					props.autoFocus && instance.focus();
					break a;
				case "img": props.src ? instance.src = props.src : props.srcSet && (instance.srcset = props.srcSet);
			}
		} catch (error) {
			captureCommitPhaseError(finishedWork, finishedWork.return, error);
		}
	}
	function commitHostUpdate(finishedWork, newProps, oldProps) {
		try {
			var domElement = finishedWork.stateNode;
			updateProperties(domElement, finishedWork.type, oldProps, newProps);
			domElement[internalPropsKey] = newProps;
		} catch (error) {
			captureCommitPhaseError(finishedWork, finishedWork.return, error);
		}
	}
	function isHostParent(fiber) {
		return 5 === fiber.tag || 3 === fiber.tag || 26 === fiber.tag || 27 === fiber.tag && isSingletonScope(fiber.type) || 4 === fiber.tag;
	}
	function getHostSibling(fiber) {
		a: for (;;) {
			for (; null === fiber.sibling;) {
				if (null === fiber.return || isHostParent(fiber.return)) return null;
				fiber = fiber.return;
			}
			fiber.sibling.return = fiber.return;
			for (fiber = fiber.sibling; 5 !== fiber.tag && 6 !== fiber.tag && 18 !== fiber.tag;) {
				if (27 === fiber.tag && isSingletonScope(fiber.type)) continue a;
				if (fiber.flags & 2) continue a;
				if (null === fiber.child || 4 === fiber.tag) continue a;
				else fiber.child.return = fiber, fiber = fiber.child;
			}
			if (!(fiber.flags & 2)) return fiber.stateNode;
		}
	}
	function insertOrAppendPlacementNodeIntoContainer(node, before, parent, parentFragmentInstances) {
		var tag = node.tag;
		if (5 === tag || 6 === tag) tag = node.stateNode, before ? (9 === parent.nodeType ? parent.body : "HTML" === parent.nodeName ? parent.ownerDocument.body : parent).insertBefore(tag, before) : (before = 9 === parent.nodeType ? parent.body : "HTML" === parent.nodeName ? parent.ownerDocument.body : parent, before.appendChild(tag), parent = parent._reactRootContainer, null !== parent && void 0 !== parent || null !== before.onclick || (before.onclick = noop$1)), commitNewChildToFragmentInstances(node, parentFragmentInstances), viewTransitionMutationContext = !0;
		else if (4 !== tag && (27 === tag && (commitNewChildToFragmentInstances(node, parentFragmentInstances), parentFragmentInstances = null, isSingletonScope(node.type) && (parent = node.stateNode, before = null)), node = node.child, null !== node)) for (insertOrAppendPlacementNodeIntoContainer(node, before, parent, parentFragmentInstances), node = node.sibling; null !== node;) insertOrAppendPlacementNodeIntoContainer(node, before, parent, parentFragmentInstances), node = node.sibling;
	}
	function insertOrAppendPlacementNode(node, before, parent, parentFragmentInstances) {
		var tag = node.tag;
		if (5 === tag || 6 === tag) tag = node.stateNode, before ? parent.insertBefore(tag, before) : parent.appendChild(tag), commitNewChildToFragmentInstances(node, parentFragmentInstances), viewTransitionMutationContext = !0;
		else if (4 !== tag && (27 === tag && (commitNewChildToFragmentInstances(node, parentFragmentInstances), parentFragmentInstances = null, isSingletonScope(node.type) && (parent = node.stateNode)), node = node.child, null !== node)) for (insertOrAppendPlacementNode(node, before, parent, parentFragmentInstances), node = node.sibling; null !== node;) insertOrAppendPlacementNode(node, before, parent, parentFragmentInstances), node = node.sibling;
	}
	function commitHostSingletonAcquisition(finishedWork) {
		var singleton = finishedWork.stateNode, props = finishedWork.memoizedProps;
		try {
			for (var type = finishedWork.type, attributes = singleton.attributes; attributes.length;) singleton.removeAttributeNode(attributes[0]);
			setInitialProperties(singleton, type, props);
			singleton[internalInstanceKey] = finishedWork;
			singleton[internalPropsKey] = props;
		} catch (error) {
			captureCommitPhaseError(finishedWork, finishedWork.return, error);
		}
	}
	var shouldStartViewTransition = !1;
	var appearingViewTransitions = null;
	function trackEnterViewTransitions(placement) {
		if (30 === placement.tag || 0 !== (placement.subtreeFlags & 33554432)) shouldStartViewTransition = !0;
	}
	var viewTransitionCancelableChildren = null;
	function pushViewTransitionCancelableScope() {
		var prevChildren = viewTransitionCancelableChildren;
		viewTransitionCancelableChildren = null;
		return prevChildren;
	}
	var viewTransitionHostInstanceIdx = 0;
	function applyViewTransitionToHostInstances(fiber, name, className, collectMeasurements, stopAtNestedViewTransitions) {
		viewTransitionHostInstanceIdx = 0;
		return applyViewTransitionToHostInstancesRecursive(fiber.child, name, className, collectMeasurements, stopAtNestedViewTransitions);
	}
	function applyViewTransitionToHostInstancesRecursive(child, name, className, collectMeasurements, stopAtNestedViewTransitions) {
		for (var inViewport = !1; null !== child;) {
			if (5 === child.tag) {
				var instance = child.stateNode;
				if (null !== collectMeasurements) {
					var measurement = measureInstance(instance);
					collectMeasurements.push(measurement);
					measurement.view && (inViewport = !0);
				} else inViewport || measureInstance(instance).view && (inViewport = !0);
				shouldStartViewTransition = !0;
				applyViewTransitionName(instance, 0 === viewTransitionHostInstanceIdx ? name : name + "_" + viewTransitionHostInstanceIdx, className);
				viewTransitionHostInstanceIdx++;
			} else if (22 !== child.tag || null === child.memoizedState) 30 === child.tag && stopAtNestedViewTransitions || applyViewTransitionToHostInstancesRecursive(child.child, name, className, collectMeasurements, stopAtNestedViewTransitions) && (inViewport = !0);
			child = child.sibling;
		}
		return inViewport;
	}
	function restoreViewTransitionOnHostInstances(child, stopAtNestedViewTransitions) {
		for (; null !== child;) {
			if (5 === child.tag) restoreViewTransitionName(child.stateNode, child.memoizedProps);
			else if (22 !== child.tag || null === child.memoizedState) 30 === child.tag && stopAtNestedViewTransitions || restoreViewTransitionOnHostInstances(child.child, stopAtNestedViewTransitions);
			child = child.sibling;
		}
	}
	function commitAppearingPairViewTransitions(placement) {
		if (0 !== (placement.subtreeFlags & 18874368)) for (placement = placement.child; null !== placement;) {
			if (22 !== placement.tag || null === placement.memoizedState) {
				if (commitAppearingPairViewTransitions(placement), 30 === placement.tag && 0 !== (placement.flags & 18874368) && placement.stateNode.paired) {
					var props = placement.memoizedProps;
					if (null == props.name || "auto" === props.name) throw Error(formatProdErrorMessage(544));
					var name = props.name;
					props = getViewTransitionClassName(props.default, props.share);
					"none" !== props && (applyViewTransitionToHostInstances(placement, name, props, null, !1) || restoreViewTransitionOnHostInstances(placement.child, !1));
				}
			}
			placement = placement.sibling;
		}
	}
	function commitEnterViewTransitions(placement, gesture) {
		if (30 === placement.tag) {
			var state = placement.stateNode, props = placement.memoizedProps, name = getViewTransitionName(props, state), className = getViewTransitionClassName(props.default, state.paired ? props.share : props.enter);
			"none" !== className ? applyViewTransitionToHostInstances(placement, name, className, null, !1) ? (commitAppearingPairViewTransitions(placement), state.paired || gesture || scheduleViewTransitionEvent(placement, props.onEnter)) : restoreViewTransitionOnHostInstances(placement.child, !1) : commitAppearingPairViewTransitions(placement);
		} else if (0 !== (placement.subtreeFlags & 33554432)) for (placement = placement.child; null !== placement;) commitEnterViewTransitions(placement, gesture), placement = placement.sibling;
		else commitAppearingPairViewTransitions(placement);
	}
	function commitDeletedPairViewTransitions(deletion) {
		if (null !== appearingViewTransitions && 0 !== appearingViewTransitions.size) {
			var pairs = appearingViewTransitions;
			if (0 !== (deletion.subtreeFlags & 18874368)) for (deletion = deletion.child; null !== deletion;) {
				if (22 !== deletion.tag || null === deletion.memoizedState) {
					if (30 === deletion.tag && 0 !== (deletion.flags & 18874368)) {
						var props = deletion.memoizedProps, name = props.name;
						if (null != name && "auto" !== name) {
							var pair = pairs.get(name);
							if (void 0 !== pair) {
								var className = getViewTransitionClassName(props.default, props.share);
								"none" !== className && (applyViewTransitionToHostInstances(deletion, name, className, null, !1) ? (className = deletion.stateNode, pair.paired = className, className.paired = pair, scheduleViewTransitionEvent(deletion, props.onShare)) : restoreViewTransitionOnHostInstances(deletion.child, !1));
								pairs.delete(name);
								if (0 === pairs.size) break;
							}
						}
					}
					commitDeletedPairViewTransitions(deletion);
				}
				deletion = deletion.sibling;
			}
		}
	}
	function commitExitViewTransitions(deletion) {
		if (30 === deletion.tag) {
			var props = deletion.memoizedProps, name = getViewTransitionName(props, deletion.stateNode), pair = null !== appearingViewTransitions ? appearingViewTransitions.get(name) : void 0, className = getViewTransitionClassName(props.default, void 0 !== pair ? props.share : props.exit);
			"none" !== className && (applyViewTransitionToHostInstances(deletion, name, className, null, !1) ? void 0 !== pair ? (className = deletion.stateNode, pair.paired = className, className.paired = pair, appearingViewTransitions.delete(name), scheduleViewTransitionEvent(deletion, props.onShare)) : scheduleViewTransitionEvent(deletion, props.onExit) : restoreViewTransitionOnHostInstances(deletion.child, !1));
			null !== appearingViewTransitions && commitDeletedPairViewTransitions(deletion);
		} else if (0 !== (deletion.subtreeFlags & 33554432)) for (deletion = deletion.child; null !== deletion;) commitExitViewTransitions(deletion), deletion = deletion.sibling;
		else null !== appearingViewTransitions && commitDeletedPairViewTransitions(deletion);
	}
	function commitNestedViewTransitions(changedParent) {
		for (changedParent = changedParent.child; null !== changedParent;) {
			if (30 === changedParent.tag) {
				var props = changedParent.memoizedProps, name = getViewTransitionName(props, changedParent.stateNode);
				props = getViewTransitionClassName(props.default, props.update);
				changedParent.flags &= -5;
				"none" !== props && applyViewTransitionToHostInstances(changedParent, name, props, changedParent.memoizedState = [], !1);
			} else 0 !== (changedParent.subtreeFlags & 33554432) && commitNestedViewTransitions(changedParent);
			changedParent = changedParent.sibling;
		}
	}
	function restorePairedViewTransitions(parent) {
		if (0 !== (parent.subtreeFlags & 18874368)) for (parent = parent.child; null !== parent;) {
			if (22 !== parent.tag || null === parent.memoizedState) {
				if (30 === parent.tag && 0 !== (parent.flags & 18874368)) {
					var instance = parent.stateNode;
					null !== instance.paired && (instance.paired = null, restoreViewTransitionOnHostInstances(parent.child, !1));
				}
				restorePairedViewTransitions(parent);
			}
			parent = parent.sibling;
		}
	}
	function restoreEnterOrExitViewTransitions(fiber) {
		if (30 === fiber.tag) fiber.stateNode.paired = null, restoreViewTransitionOnHostInstances(fiber.child, !1), restorePairedViewTransitions(fiber);
		else if (0 !== (fiber.subtreeFlags & 33554432)) for (fiber = fiber.child; null !== fiber;) restoreEnterOrExitViewTransitions(fiber), fiber = fiber.sibling;
		else restorePairedViewTransitions(fiber);
	}
	function restoreNestedViewTransitions(changedParent) {
		for (changedParent = changedParent.child; null !== changedParent;) 30 === changedParent.tag ? restoreViewTransitionOnHostInstances(changedParent.child, !1) : 0 !== (changedParent.subtreeFlags & 33554432) && restoreNestedViewTransitions(changedParent), changedParent = changedParent.sibling;
	}
	function measureViewTransitionHostInstancesRecursive(parentViewTransition, child, newName, oldName, className, previousMeasurements, stopAtNestedViewTransitions) {
		for (var inViewport = !1; null !== child;) {
			if (5 === child.tag) {
				var instance = child.stateNode;
				if (null !== previousMeasurements && viewTransitionHostInstanceIdx < previousMeasurements.length) {
					var previousMeasurement = previousMeasurements[viewTransitionHostInstanceIdx], nextMeasurement = measureInstance(instance);
					if (previousMeasurement.view || nextMeasurement.view) inViewport = !0;
					var JSCompiler_temp;
					if (JSCompiler_temp = 0 === (parentViewTransition.flags & 4)) if (nextMeasurement.clip) JSCompiler_temp = !0;
					else {
						JSCompiler_temp = previousMeasurement.rect;
						var newRect = nextMeasurement.rect;
						JSCompiler_temp = JSCompiler_temp.y !== newRect.y || JSCompiler_temp.x !== newRect.x || JSCompiler_temp.height !== newRect.height || JSCompiler_temp.width !== newRect.width;
					}
					JSCompiler_temp && (parentViewTransition.flags |= 4);
					nextMeasurement.abs ? nextMeasurement = !previousMeasurement.abs : (previousMeasurement = previousMeasurement.rect, nextMeasurement = nextMeasurement.rect, nextMeasurement = previousMeasurement.height !== nextMeasurement.height || previousMeasurement.width !== nextMeasurement.width);
					nextMeasurement && (parentViewTransition.flags |= 32);
				} else parentViewTransition.flags |= 32;
				0 !== (parentViewTransition.flags & 4) && applyViewTransitionName(instance, 0 === viewTransitionHostInstanceIdx ? newName : newName + "_" + viewTransitionHostInstanceIdx, className);
				inViewport && 0 !== (parentViewTransition.flags & 4) || (null === viewTransitionCancelableChildren && (viewTransitionCancelableChildren = []), viewTransitionCancelableChildren.push(instance, 0 === viewTransitionHostInstanceIdx ? oldName : oldName + "_" + viewTransitionHostInstanceIdx, child.memoizedProps));
				viewTransitionHostInstanceIdx++;
			} else if (22 !== child.tag || null === child.memoizedState) 30 === child.tag && stopAtNestedViewTransitions ? parentViewTransition.flags |= child.flags & 32 : measureViewTransitionHostInstancesRecursive(parentViewTransition, child.child, newName, oldName, className, previousMeasurements, stopAtNestedViewTransitions) && (inViewport = !0);
			child = child.sibling;
		}
		return inViewport;
	}
	function measureNestedViewTransitions(changedParent, gesture) {
		for (changedParent = changedParent.child; null !== changedParent;) {
			if (30 === changedParent.tag) {
				var props = changedParent.memoizedProps, state = changedParent.stateNode, name = getViewTransitionName(props, state), className = getViewTransitionClassName(props.default, props.update);
				if (gesture) {
					state = state.clones;
					var previousMeasurements = null === state ? null : state.map(measureClonedInstance);
				} else previousMeasurements = changedParent.memoizedState, changedParent.memoizedState = null;
				state = changedParent;
				var child = changedParent.child;
				viewTransitionHostInstanceIdx = 0;
				name = measureViewTransitionHostInstancesRecursive(state, child, name, name, className, previousMeasurements, !1);
				0 !== (changedParent.flags & 4) && name && (gesture || scheduleViewTransitionEvent(changedParent, props.onUpdate));
			} else 0 !== (changedParent.subtreeFlags & 33554432) && measureNestedViewTransitions(changedParent, gesture);
			changedParent = changedParent.sibling;
		}
	}
	var offscreenSubtreeIsHidden = !1;
	var offscreenSubtreeWasHidden = !1;
	var offscreenDirectParentIsHidden = !1;
	var needsFormReset = !1;
	var PossiblyWeakSet = "function" === typeof WeakSet ? WeakSet : Set;
	var nextEffect = null;
	var viewTransitionContextChanged = !1;
	var inUpdateViewTransition = !1;
	var rootViewTransitionAffected = !1;
	var rootViewTransitionNameCanceled = !1;
	function commitBeforeMutationEffects(root, firstChild, committedLanes) {
		root = root.containerInfo;
		eventsEnabled = _enabled;
		root = getActiveElementDeep(root);
		if (hasSelectionCapabilities(root)) {
			if ("selectionStart" in root) var JSCompiler_temp = {
				start: root.selectionStart,
				end: root.selectionEnd
			};
			else a: {
				JSCompiler_temp = (JSCompiler_temp = root.ownerDocument) && JSCompiler_temp.defaultView || window;
				var selection = JSCompiler_temp.getSelection && JSCompiler_temp.getSelection();
				if (selection && 0 !== selection.rangeCount) {
					JSCompiler_temp = selection.anchorNode;
					var anchorOffset = selection.anchorOffset, focusNode = selection.focusNode;
					selection = selection.focusOffset;
					try {
						JSCompiler_temp.nodeType, focusNode.nodeType;
					} catch (e$21) {
						JSCompiler_temp = null;
						break a;
					}
					var length = 0, start = -1, end = -1, indexWithinAnchor = 0, indexWithinFocus = 0, node = root, parentNode = null;
					b: for (;;) {
						for (var next;;) {
							node !== JSCompiler_temp || 0 !== anchorOffset && 3 !== node.nodeType || (start = length + anchorOffset);
							node !== focusNode || 0 !== selection && 3 !== node.nodeType || (end = length + selection);
							3 === node.nodeType && (length += node.nodeValue.length);
							if (null === (next = node.firstChild)) break;
							parentNode = node;
							node = next;
						}
						for (;;) {
							if (node === root) break b;
							parentNode === JSCompiler_temp && ++indexWithinAnchor === anchorOffset && (start = length);
							parentNode === focusNode && ++indexWithinFocus === selection && (end = length);
							if (null !== (next = node.nextSibling)) break;
							node = parentNode;
							parentNode = node.parentNode;
						}
						node = next;
					}
					JSCompiler_temp = -1 === start || -1 === end ? null : {
						start,
						end
					};
				} else JSCompiler_temp = null;
			}
			JSCompiler_temp = JSCompiler_temp || {
				start: 0,
				end: 0
			};
		} else JSCompiler_temp = null;
		selectionInformation = {
			focusedElem: root,
			selectionRange: JSCompiler_temp
		};
		_enabled = !1;
		committedLanes = (committedLanes & 335544064) === committedLanes;
		nextEffect = firstChild;
		for (firstChild = committedLanes ? 9270 : 1024; null !== nextEffect;) {
			root = nextEffect;
			if (committedLanes && (JSCompiler_temp = root.deletions, null !== JSCompiler_temp)) for (anchorOffset = 0; anchorOffset < JSCompiler_temp.length; anchorOffset++) committedLanes && commitExitViewTransitions(JSCompiler_temp[anchorOffset]);
			if (null === root.alternate && 0 !== (root.flags & 2)) committedLanes && trackEnterViewTransitions(root), commitBeforeMutationEffects_complete(committedLanes);
			else {
				if (22 === root.tag) {
					if (JSCompiler_temp = root.alternate, null !== root.memoizedState) {
						null !== JSCompiler_temp && null === JSCompiler_temp.memoizedState && committedLanes && commitExitViewTransitions(JSCompiler_temp);
						commitBeforeMutationEffects_complete(committedLanes);
						continue;
					} else if (null !== JSCompiler_temp && null !== JSCompiler_temp.memoizedState) {
						committedLanes && trackEnterViewTransitions(root);
						commitBeforeMutationEffects_complete(committedLanes);
						continue;
					}
				}
				JSCompiler_temp = root.child;
				0 !== (root.subtreeFlags & firstChild) && null !== JSCompiler_temp ? (JSCompiler_temp.return = root, nextEffect = JSCompiler_temp) : (committedLanes && commitNestedViewTransitions(root), commitBeforeMutationEffects_complete(committedLanes));
			}
		}
		appearingViewTransitions = null;
	}
	function commitBeforeMutationEffects_complete(isViewTransitionEligible$jscomp$0) {
		for (; null !== nextEffect;) {
			var fiber = nextEffect, isViewTransitionEligible = isViewTransitionEligible$jscomp$0, current = fiber.alternate, flags = fiber.flags;
			switch (fiber.tag) {
				case 0:
				case 11:
				case 15: break;
				case 1:
					if (0 !== (flags & 1024) && null !== current) {
						isViewTransitionEligible = void 0;
						flags = current.memoizedProps;
						current = current.memoizedState;
						var instance = fiber.stateNode;
						try {
							var resolvedPrevProps = resolveClassComponentProps(fiber.type, flags);
							isViewTransitionEligible = instance.getSnapshotBeforeUpdate(resolvedPrevProps, current);
							instance.__reactInternalSnapshotBeforeUpdate = isViewTransitionEligible;
						} catch (error) {
							captureCommitPhaseError(fiber, fiber.return, error);
						}
					}
					break;
				case 3:
					if (0 !== (flags & 1024)) {
						if (current = fiber.stateNode.containerInfo, isViewTransitionEligible = current.nodeType, 9 === isViewTransitionEligible) clearContainerSparingly(current);
						else if (1 === isViewTransitionEligible) switch (current.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								clearContainerSparingly(current);
								break;
							default: current.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				case 30:
					isViewTransitionEligible && null !== current && (isViewTransitionEligible = getViewTransitionName(current.memoizedProps, current.stateNode), flags = fiber.memoizedProps, flags = getViewTransitionClassName(flags.default, flags.update), "none" !== flags && applyViewTransitionToHostInstances(current, isViewTransitionEligible, flags, current.memoizedState = [], !0));
					break;
				default: if (0 !== (flags & 1024)) throw Error(formatProdErrorMessage(163));
			}
			current = fiber.sibling;
			if (null !== current) {
				current.return = fiber.return;
				nextEffect = current;
				break;
			}
			nextEffect = fiber.return;
		}
	}
	function commitLayoutEffectOnFiber(finishedRoot, current, finishedWork) {
		var flags = finishedWork.flags;
		switch (finishedWork.tag) {
			case 0:
			case 11:
			case 15:
				recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
				flags & 4 && commitHookEffectListMount(5, finishedWork);
				break;
			case 1:
				recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
				if (flags & 4) if (finishedRoot = finishedWork.stateNode, null === current) try {
					finishedRoot.componentDidMount();
				} catch (error) {
					captureCommitPhaseError(finishedWork, finishedWork.return, error);
				}
				else {
					var prevProps = resolveClassComponentProps(finishedWork.type, current.memoizedProps);
					current = current.memoizedState;
					try {
						finishedRoot.componentDidUpdate(prevProps, current, finishedRoot.__reactInternalSnapshotBeforeUpdate);
					} catch (error$146) {
						captureCommitPhaseError(finishedWork, finishedWork.return, error$146);
					}
				}
				flags & 64 && commitClassCallbacks(finishedWork);
				flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
				break;
			case 3:
				recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
				if (flags & 64 && (finishedRoot = finishedWork.updateQueue, null !== finishedRoot)) {
					current = null;
					if (null !== finishedWork.child) switch (finishedWork.child.tag) {
						case 27:
						case 5:
							current = finishedWork.child.stateNode;
							break;
						case 1: current = finishedWork.child.stateNode;
					}
					try {
						commitCallbacks(finishedRoot, current);
					} catch (error) {
						captureCommitPhaseError(finishedWork, finishedWork.return, error);
					}
				}
				break;
			case 27: null === current && flags & 4 && commitHostSingletonAcquisition(finishedWork);
			case 26:
			case 5:
				recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
				null === current && flags & 4 && commitHostMount(finishedWork);
				flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
				break;
			case 12:
				recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
				break;
			case 31:
				recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
				flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
				break;
			case 13:
				recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
				flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
				flags & 64 && (finishedRoot = finishedWork.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot && (finishedWork = retryDehydratedSuspenseBoundary.bind(null, finishedWork), registerSuspenseInstanceRetry(finishedRoot, finishedWork))));
				break;
			case 22:
				flags = null !== finishedWork.memoizedState || offscreenSubtreeIsHidden;
				if (!flags) {
					var newOffscreenSubtreeWasHidden = null !== current && null !== current.memoizedState || offscreenSubtreeWasHidden;
					current = offscreenSubtreeIsHidden;
					prevProps = offscreenSubtreeWasHidden;
					offscreenSubtreeIsHidden = flags;
					(offscreenSubtreeWasHidden = newOffscreenSubtreeWasHidden) && !prevProps ? (flags = 2, 0 !== (finishedWork.subtreeFlags & 8772) && (flags |= 1), recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, flags)) : recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
					offscreenSubtreeIsHidden = current;
					offscreenSubtreeWasHidden = prevProps;
				}
				break;
			case 30:
				recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
				flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
				break;
			case 7: flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
			default: recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
		}
	}
	function hideOrUnhideAllChildren(parentFiber, isHidden) {
		for (parentFiber = parentFiber.child; null !== parentFiber;) hideOrUnhideAllChildrenOnFiber(parentFiber, isHidden), parentFiber = parentFiber.sibling;
	}
	function hideOrUnhideAllChildrenOnFiber(fiber, isHidden) {
		switch (fiber.tag) {
			case 5:
			case 26:
				try {
					var instance = fiber.stateNode;
					if (isHidden) {
						var style = instance.style;
						"function" === typeof style.setProperty ? style.setProperty("display", "none", "important") : style.display = "none";
					} else {
						var instance$jscomp$0 = fiber.stateNode, styleProp = fiber.memoizedProps.style, display = void 0 !== styleProp && null !== styleProp && styleProp.hasOwnProperty("display") ? styleProp.display : null;
						instance$jscomp$0.style.display = null == display || "boolean" === typeof display ? "" : ("" + display).trim();
					}
				} catch (error) {
					captureCommitPhaseError(fiber, fiber.return, error);
				}
				hideOrUnhideNearestPortals(fiber, isHidden);
				break;
			case 6:
				try {
					fiber.stateNode.nodeValue = isHidden ? "" : fiber.memoizedProps, viewTransitionMutationContext = !0;
				} catch (error) {
					captureCommitPhaseError(fiber, fiber.return, error);
				}
				break;
			case 18:
				try {
					var instance$jscomp$1 = fiber.stateNode;
					isHidden ? hideOrUnhideDehydratedBoundary(instance$jscomp$1, !0) : hideOrUnhideDehydratedBoundary(fiber.stateNode, !1);
				} catch (error) {
					captureCommitPhaseError(fiber, fiber.return, error);
				}
				break;
			case 22:
			case 23:
				null === fiber.memoizedState && hideOrUnhideAllChildren(fiber, isHidden);
				break;
			default: hideOrUnhideAllChildren(fiber, isHidden);
		}
	}
	function hideOrUnhideNearestPortals(parentFiber, isHidden$jscomp$0) {
		if (parentFiber.subtreeFlags & 67108864) for (parentFiber = parentFiber.child; null !== parentFiber;) {
			a: {
				var fiber = parentFiber, isHidden = isHidden$jscomp$0;
				switch (fiber.tag) {
					case 4:
						hideOrUnhideAllChildrenOnFiber(fiber, isHidden);
						break a;
					case 22:
						null === fiber.memoizedState && hideOrUnhideNearestPortals(fiber, isHidden);
						break a;
					default: hideOrUnhideNearestPortals(fiber, isHidden);
				}
			}
			parentFiber = parentFiber.sibling;
		}
	}
	function detachFiberAfterEffects(fiber) {
		var alternate = fiber.alternate;
		null !== alternate && (fiber.alternate = null, detachFiberAfterEffects(alternate));
		fiber.child = null;
		fiber.deletions = null;
		fiber.sibling = null;
		5 === fiber.tag && (alternate = fiber.stateNode, null !== alternate && detachDeletedInstance(alternate));
		fiber.stateNode = null;
		fiber.return = null;
		fiber.dependencies = null;
		fiber.memoizedProps = null;
		fiber.memoizedState = null;
		fiber.pendingProps = null;
		fiber.stateNode = null;
		fiber.updateQueue = null;
	}
	var hostParent = null;
	var hostParentIsContainer = !1;
	function recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, parent) {
		for (parent = parent.child; null !== parent;) commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, parent), parent = parent.sibling;
	}
	function commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, deletedFiber) {
		if (injectedHook && "function" === typeof injectedHook.onCommitFiberUnmount) try {
			injectedHook.onCommitFiberUnmount(rendererID, deletedFiber);
		} catch (err) {}
		switch (deletedFiber.tag) {
			case 26:
				offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
				recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
				deletedFiber.memoizedState ? deletedFiber.memoizedState.count-- : deletedFiber.stateNode && !offscreenSubtreeWasHidden && (deletedFiber = deletedFiber.stateNode, deletedFiber.parentNode.removeChild(deletedFiber));
				break;
			case 27:
				offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
				commitFragmentInstanceDeletionEffects(deletedFiber);
				var prevHostParent = hostParent, prevHostParentIsContainer = hostParentIsContainer;
				isSingletonScope(deletedFiber.type) && (hostParent = deletedFiber.stateNode, hostParentIsContainer = !1);
				recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
				releaseSingletonInstance(deletedFiber.stateNode, deletedFiber.type, deletedFiber.memoizedProps);
				hostParent = prevHostParent;
				hostParentIsContainer = prevHostParentIsContainer;
				break;
			case 5: offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor), commitFragmentInstanceDeletionEffects(deletedFiber);
			case 6:
				6 === deletedFiber.tag && commitFragmentInstanceDeletionEffects(deletedFiber);
				prevHostParent = hostParent;
				prevHostParentIsContainer = hostParentIsContainer;
				hostParent = null;
				recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
				hostParent = prevHostParent;
				hostParentIsContainer = prevHostParentIsContainer;
				if (null !== hostParent) if (hostParentIsContainer) try {
					(9 === hostParent.nodeType ? hostParent.body : "HTML" === hostParent.nodeName ? hostParent.ownerDocument.body : hostParent).removeChild(deletedFiber.stateNode), viewTransitionMutationContext = !0;
				} catch (error) {
					captureCommitPhaseError(deletedFiber, nearestMountedAncestor, error);
				}
				else try {
					hostParent.removeChild(deletedFiber.stateNode), viewTransitionMutationContext = !0;
				} catch (error) {
					captureCommitPhaseError(deletedFiber, nearestMountedAncestor, error);
				}
				break;
			case 18:
				null !== hostParent && (hostParentIsContainer ? (finishedRoot = hostParent, clearHydrationBoundary(9 === finishedRoot.nodeType ? finishedRoot.body : "HTML" === finishedRoot.nodeName ? finishedRoot.ownerDocument.body : finishedRoot, deletedFiber.stateNode), retryIfBlockedOn(finishedRoot)) : clearHydrationBoundary(hostParent, deletedFiber.stateNode));
				break;
			case 4:
				prevHostParent = hostParent;
				prevHostParentIsContainer = hostParentIsContainer;
				hostParent = deletedFiber.stateNode.containerInfo;
				hostParentIsContainer = !0;
				recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
				hostParent = prevHostParent;
				hostParentIsContainer = prevHostParentIsContainer;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				commitHookEffectListUnmount(2, deletedFiber, nearestMountedAncestor);
				offscreenSubtreeWasHidden || commitHookEffectListUnmount(4, deletedFiber, nearestMountedAncestor);
				recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
				break;
			case 1:
				offscreenSubtreeWasHidden || (safelyDetachRef(deletedFiber, nearestMountedAncestor), prevHostParent = deletedFiber.stateNode, "function" === typeof prevHostParent.componentWillUnmount && safelyCallComponentWillUnmount(deletedFiber, nearestMountedAncestor, prevHostParent));
				recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
				break;
			case 21:
				recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
				break;
			case 22:
				offscreenSubtreeWasHidden = (prevHostParent = offscreenSubtreeWasHidden) || null !== deletedFiber.memoizedState;
				recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
				offscreenSubtreeWasHidden = prevHostParent;
				break;
			case 30:
				safelyDetachRef(deletedFiber, nearestMountedAncestor);
				recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
				break;
			case 7:
				offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
				recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
				break;
			default: recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
		}
	}
	function commitActivityHydrationCallbacks(finishedRoot, finishedWork) {
		if (null === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, null !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, null !== finishedRoot))) {
			finishedRoot = finishedRoot.dehydrated;
			try {
				retryIfBlockedOn(finishedRoot);
			} catch (error) {
				captureCommitPhaseError(finishedWork, finishedWork.return, error);
			}
		}
	}
	function commitSuspenseHydrationCallbacks(finishedRoot, finishedWork) {
		if (null === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, null !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot)))) try {
			retryIfBlockedOn(finishedRoot);
		} catch (error) {
			captureCommitPhaseError(finishedWork, finishedWork.return, error);
		}
	}
	function getRetryCache(finishedWork) {
		switch (finishedWork.tag) {
			case 31:
			case 13:
			case 19:
				var retryCache = finishedWork.stateNode;
				null === retryCache && (retryCache = finishedWork.stateNode = new PossiblyWeakSet());
				return retryCache;
			case 22: return finishedWork = finishedWork.stateNode, retryCache = finishedWork._retryCache, null === retryCache && (retryCache = finishedWork._retryCache = new PossiblyWeakSet()), retryCache;
			default: throw Error(formatProdErrorMessage(435, finishedWork.tag));
		}
	}
	function attachSuspenseRetryListeners(finishedWork, wakeables) {
		var retryCache = getRetryCache(finishedWork);
		wakeables.forEach(function(wakeable) {
			if (!retryCache.has(wakeable)) {
				retryCache.add(wakeable);
				var retry = resolveRetryWakeable.bind(null, finishedWork, wakeable);
				wakeable.then(retry, retry);
			}
		});
	}
	function recursivelyTraverseMutationEffects(root$jscomp$0, parentFiber, lanes) {
		var deletions = parentFiber.deletions;
		if (null !== deletions) for (var i = 0; i < deletions.length; i++) {
			var childToDelete = deletions[i], root = root$jscomp$0, returnFiber = parentFiber, parent = returnFiber;
			a: for (; null !== parent;) {
				switch (parent.tag) {
					case 27:
						if (isSingletonScope(parent.type)) {
							hostParent = parent.stateNode;
							hostParentIsContainer = !1;
							break a;
						}
						break;
					case 5:
						hostParent = parent.stateNode;
						hostParentIsContainer = !1;
						break a;
					case 3:
					case 4:
						hostParent = parent.stateNode.containerInfo;
						hostParentIsContainer = !0;
						break a;
				}
				parent = parent.return;
			}
			if (null === hostParent) throw Error(formatProdErrorMessage(160));
			commitDeletionEffectsOnFiber(root, returnFiber, childToDelete);
			hostParent = null;
			hostParentIsContainer = !1;
			root = childToDelete.alternate;
			null !== root && (root.return = null);
			childToDelete.return = null;
		}
		if (parentFiber.subtreeFlags & 13886) for (parentFiber = parentFiber.child; null !== parentFiber;) commitMutationEffectsOnFiber(parentFiber, root$jscomp$0, lanes), parentFiber = parentFiber.sibling;
	}
	var currentHoistableRoot = null;
	function commitMutationEffectsOnFiber(finishedWork, root, lanes) {
		var current = finishedWork.alternate, flags = finishedWork.flags;
		switch (finishedWork.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				if (flags & 4 && (current = finishedWork.updateQueue, current = null !== current ? current.events : null, null !== current)) for (var ii = 0; ii < current.length; ii++) {
					var _eventPayloads$ii2 = current[ii];
					_eventPayloads$ii2.ref.impl = _eventPayloads$ii2.nextImpl;
				}
				recursivelyTraverseMutationEffects(root, finishedWork, lanes);
				commitReconciliationEffects(finishedWork);
				flags & 4 && (commitHookEffectListUnmount(3, finishedWork, finishedWork.return), commitHookEffectListMount(3, finishedWork), commitHookEffectListUnmount(5, finishedWork, finishedWork.return));
				break;
			case 1:
				recursivelyTraverseMutationEffects(root, finishedWork, lanes);
				commitReconciliationEffects(finishedWork);
				flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
				flags & 64 && offscreenSubtreeIsHidden && (finishedWork = finishedWork.updateQueue, null !== finishedWork && (root = finishedWork.callbacks, null !== root && (lanes = finishedWork.shared.hiddenCallbacks, finishedWork.shared.hiddenCallbacks = null === lanes ? root : lanes.concat(root))));
				break;
			case 26:
				ii = currentHoistableRoot;
				recursivelyTraverseMutationEffects(root, finishedWork, lanes);
				commitReconciliationEffects(finishedWork);
				flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
				if (flags & 4) if (flags = null !== current ? current.memoizedState : null, lanes = finishedWork.memoizedState, null === current) if (null === lanes) if (null === finishedWork.stateNode) if (offscreenSubtreeIsHidden) finishedWork.stateNode = createHoistableInstance(finishedWork.type, finishedWork.memoizedProps, root.containerInfo, finishedWork);
				else {
					a: {
						root = finishedWork.type;
						lanes = finishedWork.memoizedProps;
						flags = ii.ownerDocument || ii;
						b: switch (root) {
							case "title":
								current = flags.getElementsByTagName("title")[0];
								if (!current || current[internalHoistableMarker] || current[internalInstanceKey] || "http://www.w3.org/2000/svg" === current.namespaceURI || current.hasAttribute("itemprop")) current = flags.createElement(root), flags.head.insertBefore(current, flags.querySelector("head > title"));
								setInitialProperties(current, root, lanes);
								current[internalInstanceKey] = finishedWork;
								markNodeAsHoistable(current);
								root = current;
								break a;
							case "link":
								if (ii = getHydratableHoistableCache("link", "href", flags).get(root + (lanes.href || ""))) {
									for (_eventPayloads$ii2 = 0; _eventPayloads$ii2 < ii.length; _eventPayloads$ii2++) if (current = ii[_eventPayloads$ii2], current.getAttribute("href") === (null == lanes.href || "" === lanes.href ? null : lanes.href) && current.getAttribute("rel") === (null == lanes.rel ? null : lanes.rel) && current.getAttribute("title") === (null == lanes.title ? null : lanes.title) && current.getAttribute("crossorigin") === (null == lanes.crossOrigin ? null : lanes.crossOrigin)) {
										ii.splice(_eventPayloads$ii2, 1);
										break b;
									}
								}
								current = flags.createElement(root);
								setInitialProperties(current, root, lanes);
								flags.head.appendChild(current);
								break;
							case "meta":
								if (ii = getHydratableHoistableCache("meta", "content", flags).get(root + (lanes.content || ""))) {
									for (_eventPayloads$ii2 = 0; _eventPayloads$ii2 < ii.length; _eventPayloads$ii2++) if (current = ii[_eventPayloads$ii2], current.getAttribute("content") === (null == lanes.content ? null : "" + lanes.content) && current.getAttribute("name") === (null == lanes.name ? null : lanes.name) && current.getAttribute("property") === (null == lanes.property ? null : lanes.property) && current.getAttribute("http-equiv") === (null == lanes.httpEquiv ? null : lanes.httpEquiv) && current.getAttribute("charset") === (null == lanes.charSet ? null : lanes.charSet)) {
										ii.splice(_eventPayloads$ii2, 1);
										break b;
									}
								}
								current = flags.createElement(root);
								setInitialProperties(current, root, lanes);
								flags.head.appendChild(current);
								break;
							default: throw Error(formatProdErrorMessage(468, root));
						}
						current[internalInstanceKey] = finishedWork;
						markNodeAsHoistable(current);
						root = current;
					}
					finishedWork.stateNode = root;
				}
				else offscreenSubtreeIsHidden || mountHoistable(ii, finishedWork.type, finishedWork.stateNode);
				else finishedWork.stateNode = acquireResource(ii, lanes, finishedWork.memoizedProps);
				else flags !== lanes ? (null === flags ? (root = current.stateNode, null === root || offscreenSubtreeWasHidden || root.parentNode.removeChild(root)) : flags.count--, null === lanes ? offscreenSubtreeIsHidden || mountHoistable(ii, finishedWork.type, finishedWork.stateNode) : acquireResource(ii, lanes, finishedWork.memoizedProps)) : null === lanes && null !== finishedWork.stateNode && commitHostUpdate(finishedWork, finishedWork.memoizedProps, current.memoizedProps);
				break;
			case 27:
				recursivelyTraverseMutationEffects(root, finishedWork, lanes);
				commitReconciliationEffects(finishedWork);
				flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
				null !== current && flags & 4 && commitHostUpdate(finishedWork, finishedWork.memoizedProps, current.memoizedProps);
				break;
			case 5:
				ii = offscreenDirectParentIsHidden;
				offscreenDirectParentIsHidden = !1;
				recursivelyTraverseMutationEffects(root, finishedWork, lanes);
				offscreenDirectParentIsHidden = ii;
				commitReconciliationEffects(finishedWork);
				flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
				if (finishedWork.flags & 32) {
					root = finishedWork.stateNode;
					try {
						setTextContent(root, ""), viewTransitionMutationContext = !0;
					} catch (error) {
						captureCommitPhaseError(finishedWork, finishedWork.return, error);
					}
				}
				flags & 4 && null != finishedWork.stateNode && (root = finishedWork.memoizedProps, commitHostUpdate(finishedWork, root, null !== current ? current.memoizedProps : root));
				flags & 1024 && (needsFormReset = !0);
				break;
			case 6:
				recursivelyTraverseMutationEffects(root, finishedWork, lanes);
				commitReconciliationEffects(finishedWork);
				if (flags & 4) {
					if (null === finishedWork.stateNode) throw Error(formatProdErrorMessage(162));
					root = finishedWork.memoizedProps;
					lanes = finishedWork.stateNode;
					try {
						lanes.nodeValue = root, viewTransitionMutationContext = !0;
					} catch (error) {
						captureCommitPhaseError(finishedWork, finishedWork.return, error);
					}
				}
				break;
			case 3:
				viewTransitionMutationContext = !1;
				tagCaches = null;
				ii = currentHoistableRoot;
				currentHoistableRoot = getHoistableRoot(root.containerInfo);
				recursivelyTraverseMutationEffects(root, finishedWork, lanes);
				currentHoistableRoot = ii;
				commitReconciliationEffects(finishedWork);
				if (flags & 4 && null !== current && current.memoizedState.isDehydrated) try {
					retryIfBlockedOn(root.containerInfo);
				} catch (error) {
					captureCommitPhaseError(finishedWork, finishedWork.return, error);
				}
				needsFormReset && (needsFormReset = !1, recursivelyResetForms(finishedWork));
				viewTransitionMutationContext = !1;
				break;
			case 4:
				flags = offscreenDirectParentIsHidden;
				offscreenDirectParentIsHidden = offscreenSubtreeIsHidden;
				current = pushMutationContext();
				ii = currentHoistableRoot;
				currentHoistableRoot = getHoistableRoot(finishedWork.stateNode.containerInfo);
				recursivelyTraverseMutationEffects(root, finishedWork, lanes);
				commitReconciliationEffects(finishedWork);
				currentHoistableRoot = ii;
				viewTransitionMutationContext && inUpdateViewTransition && (rootViewTransitionAffected = !0);
				viewTransitionMutationContext = current;
				offscreenDirectParentIsHidden = flags;
				break;
			case 12:
				recursivelyTraverseMutationEffects(root, finishedWork, lanes);
				commitReconciliationEffects(finishedWork);
				break;
			case 31:
				recursivelyTraverseMutationEffects(root, finishedWork, lanes);
				commitReconciliationEffects(finishedWork);
				flags & 4 && (root = finishedWork.updateQueue, null !== root && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, root)));
				break;
			case 13:
				recursivelyTraverseMutationEffects(root, finishedWork, lanes);
				commitReconciliationEffects(finishedWork);
				finishedWork.child.flags & 8192 && null !== finishedWork.memoizedState !== (null !== current && null !== current.memoizedState) && (globalMostRecentFallbackTime = now());
				flags & 4 && (root = finishedWork.updateQueue, null !== root && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, root)));
				break;
			case 22:
				ii = null !== finishedWork.memoizedState;
				_eventPayloads$ii2 = null !== current && null !== current.memoizedState;
				var prevOffscreenSubtreeIsHidden = offscreenSubtreeIsHidden, prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden, prevOffscreenDirectParentIsHidden$166 = offscreenDirectParentIsHidden;
				offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden || ii;
				offscreenDirectParentIsHidden = prevOffscreenDirectParentIsHidden$166 || ii;
				offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden || _eventPayloads$ii2;
				recursivelyTraverseMutationEffects(root, finishedWork, lanes);
				offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
				offscreenDirectParentIsHidden = prevOffscreenDirectParentIsHidden$166;
				offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden;
				commitReconciliationEffects(finishedWork);
				flags & 8192 && (root = finishedWork.stateNode, root._visibility = ii ? root._visibility & -2 : root._visibility | 1, !ii || null === current || _eventPayloads$ii2 || offscreenSubtreeIsHidden || offscreenSubtreeWasHidden || (root = _eventPayloads$ii2 || offscreenSubtreeWasHidden, lanes = offscreenSubtreeIsHidden, current = offscreenSubtreeWasHidden, offscreenSubtreeIsHidden = ii || offscreenSubtreeIsHidden, offscreenSubtreeWasHidden = root, recursivelyTraverseDisappearLayoutEffects(finishedWork, 2), offscreenSubtreeIsHidden = lanes, offscreenSubtreeWasHidden = current), !ii && offscreenDirectParentIsHidden || hideOrUnhideAllChildren(finishedWork, ii));
				flags & 4 && (root = finishedWork.updateQueue, null !== root && (lanes = root.retryQueue, null !== lanes && (root.retryQueue = null, attachSuspenseRetryListeners(finishedWork, lanes))));
				break;
			case 19:
				recursivelyTraverseMutationEffects(root, finishedWork, lanes);
				commitReconciliationEffects(finishedWork);
				flags & 4 && (root = finishedWork.updateQueue, null !== root && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, root)));
				break;
			case 30:
				flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
				flags = pushMutationContext();
				ii = inUpdateViewTransition;
				_eventPayloads$ii2 = (lanes & 335544064) === lanes;
				prevOffscreenSubtreeIsHidden = finishedWork.memoizedProps;
				inUpdateViewTransition = _eventPayloads$ii2 && "none" !== getViewTransitionClassName(prevOffscreenSubtreeIsHidden.default, prevOffscreenSubtreeIsHidden.update);
				recursivelyTraverseMutationEffects(root, finishedWork, lanes);
				commitReconciliationEffects(finishedWork);
				_eventPayloads$ii2 && null !== current && viewTransitionMutationContext && (finishedWork.flags |= 4);
				inUpdateViewTransition = ii;
				viewTransitionMutationContext = flags;
				break;
			case 21: break;
			case 7: flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return)), current && null !== current.stateNode && (current.stateNode._fragmentFiber = finishedWork);
			default: recursivelyTraverseMutationEffects(root, finishedWork, lanes), commitReconciliationEffects(finishedWork);
		}
	}
	function commitReconciliationEffects(finishedWork) {
		var flags = finishedWork.flags;
		if (flags & 2) {
			try {
				for (var hostParentFiber, parentFiber = finishedWork.return; null !== parentFiber;) {
					if (isHostParent(parentFiber)) {
						hostParentFiber = parentFiber;
						break;
					}
					parentFiber = parentFiber.return;
				}
				parentFiber = null;
				for (var parent = finishedWork.return; null !== parent;) {
					if (isFragmentInstanceParent(parent)) {
						var fragmentInstance = parent.stateNode;
						null === parentFiber ? parentFiber = [fragmentInstance] : parentFiber.push(fragmentInstance);
					}
					if (isFragmentInstanceHostBoundary(parent)) break;
					parent = parent.return;
				}
				var JSCompiler_inline_result = parentFiber;
				if (null == hostParentFiber) throw Error(formatProdErrorMessage(160));
				switch (hostParentFiber.tag) {
					case 27:
						var parent$jscomp$0 = hostParentFiber.stateNode;
						insertOrAppendPlacementNode(finishedWork, getHostSibling(finishedWork), parent$jscomp$0, JSCompiler_inline_result);
						break;
					case 5:
						var parent$149 = hostParentFiber.stateNode;
						hostParentFiber.flags & 32 && (setTextContent(parent$149, ""), hostParentFiber.flags &= -33);
						insertOrAppendPlacementNode(finishedWork, getHostSibling(finishedWork), parent$149, JSCompiler_inline_result);
						break;
					case 3:
					case 4:
						var parent$151 = hostParentFiber.stateNode.containerInfo;
						insertOrAppendPlacementNodeIntoContainer(finishedWork, getHostSibling(finishedWork), parent$151, JSCompiler_inline_result);
						break;
					default: throw Error(formatProdErrorMessage(161));
				}
			} catch (error) {
				captureCommitPhaseError(finishedWork, finishedWork.return, error);
			}
			finishedWork.flags &= -3;
		}
		flags & 4096 && (finishedWork.flags &= -4097);
	}
	function recursivelyResetForms(parentFiber) {
		if (parentFiber.subtreeFlags & 1024) for (parentFiber = parentFiber.child; null !== parentFiber;) {
			var fiber = parentFiber;
			recursivelyResetForms(fiber);
			5 === fiber.tag && fiber.flags & 1024 && (fiber = fiber.stateNode, _enabled = !0, fiber.reset(), _enabled = !1);
			parentFiber = parentFiber.sibling;
		}
	}
	function recursivelyTraverseAfterMutationEffects(root, parentFiber) {
		if (parentFiber.subtreeFlags & 9270) for (parentFiber = parentFiber.child; null !== parentFiber;) commitAfterMutationEffectsOnFiber(parentFiber, root), parentFiber = parentFiber.sibling;
		else measureNestedViewTransitions(parentFiber, !1);
	}
	function commitAfterMutationEffectsOnFiber(finishedWork, root) {
		var current = finishedWork.alternate;
		if (null === current) commitEnterViewTransitions(finishedWork, !1);
		else switch (finishedWork.tag) {
			case 3:
				rootViewTransitionNameCanceled = viewTransitionContextChanged = !1;
				pushViewTransitionCancelableScope();
				recursivelyTraverseAfterMutationEffects(root, finishedWork);
				if (!viewTransitionContextChanged && !rootViewTransitionAffected) {
					finishedWork = viewTransitionCancelableChildren;
					if (null !== finishedWork) for (var i = 0; i < finishedWork.length; i += 3) {
						current = finishedWork[i];
						var oldName = finishedWork[i + 1];
						restoreViewTransitionName(current, finishedWork[i + 2]);
						current = current.ownerDocument.documentElement;
						null !== current && current.animate({
							opacity: [0, 0],
							pointerEvents: ["none", "none"]
						}, {
							duration: 0,
							fill: "forwards",
							pseudoElement: "::view-transition-group(" + oldName + ")"
						});
					}
					finishedWork = root.containerInfo;
					finishedWork = 9 === finishedWork.nodeType ? finishedWork.documentElement : finishedWork.ownerDocument.documentElement;
					null !== finishedWork && "" === finishedWork.style.viewTransitionName && (finishedWork.style.viewTransitionName = "none", finishedWork.animate({
						opacity: [0, 0],
						pointerEvents: ["none", "none"]
					}, {
						duration: 0,
						fill: "forwards",
						pseudoElement: "::view-transition-group(root)"
					}), finishedWork.animate({
						width: [0, 0],
						height: [0, 0]
					}, {
						duration: 0,
						fill: "forwards",
						pseudoElement: "::view-transition"
					}));
					rootViewTransitionNameCanceled = !0;
				}
				viewTransitionCancelableChildren = null;
				break;
			case 5:
				recursivelyTraverseAfterMutationEffects(root, finishedWork);
				break;
			case 4:
				i = viewTransitionContextChanged;
				viewTransitionContextChanged = !1;
				recursivelyTraverseAfterMutationEffects(root, finishedWork);
				viewTransitionContextChanged && (rootViewTransitionAffected = !0);
				viewTransitionContextChanged = i;
				break;
			case 22:
				null === finishedWork.memoizedState && (null !== current.memoizedState ? commitEnterViewTransitions(finishedWork, !1) : recursivelyTraverseAfterMutationEffects(root, finishedWork));
				break;
			case 30:
				i = viewTransitionContextChanged;
				oldName = pushViewTransitionCancelableScope();
				viewTransitionContextChanged = !1;
				recursivelyTraverseAfterMutationEffects(root, finishedWork);
				viewTransitionContextChanged && (finishedWork.flags |= 4);
				var props = finishedWork.memoizedProps, state = finishedWork.stateNode;
				root = getViewTransitionName(props, state);
				state = getViewTransitionName(current.memoizedProps, state);
				var className = getViewTransitionClassName(props.default, props.update);
				"none" === className ? root = !1 : (props = current.memoizedState, current.memoizedState = null, current = finishedWork.child, viewTransitionHostInstanceIdx = 0, root = measureViewTransitionHostInstancesRecursive(finishedWork, current, root, state, className, props, !0), viewTransitionHostInstanceIdx !== (null === props ? 0 : props.length) && (finishedWork.flags |= 32));
				0 !== (finishedWork.flags & 4) && root ? (scheduleViewTransitionEvent(finishedWork, finishedWork.memoizedProps.onUpdate), viewTransitionCancelableChildren = oldName) : null !== oldName && (oldName.push.apply(oldName, viewTransitionCancelableChildren), viewTransitionCancelableChildren = oldName);
				viewTransitionContextChanged = 0 !== (finishedWork.flags & 32) ? !0 : i;
				break;
			default: recursivelyTraverseAfterMutationEffects(root, finishedWork);
		}
	}
	function recursivelyTraverseLayoutEffects(root, parentFiber) {
		if (parentFiber.subtreeFlags & 8772) for (parentFiber = parentFiber.child; null !== parentFiber;) commitLayoutEffectOnFiber(root, parentFiber.alternate, parentFiber), parentFiber = parentFiber.sibling;
	}
	function recursivelyTraverseDisappearLayoutEffects(parentFiber, layoutEffectTraversalFlags$jscomp$0) {
		for (parentFiber = parentFiber.child; null !== parentFiber;) {
			var finishedWork = parentFiber, layoutEffectTraversalFlags = layoutEffectTraversalFlags$jscomp$0;
			switch (finishedWork.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					commitHookEffectListUnmount(4, finishedWork, finishedWork.return);
					recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
					break;
				case 1:
					safelyDetachRef(finishedWork, finishedWork.return);
					var instance = finishedWork.stateNode;
					"function" === typeof instance.componentWillUnmount && safelyCallComponentWillUnmount(finishedWork, finishedWork.return, instance);
					recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
					break;
				case 27: 0 !== (layoutEffectTraversalFlags & 2) && releaseSingletonInstance(finishedWork.stateNode, finishedWork.type, finishedWork.memoizedProps);
				case 5:
					safelyDetachRef(finishedWork, finishedWork.return);
					5 !== finishedWork.tag && 27 !== finishedWork.tag || commitFragmentInstanceDeletionEffects(finishedWork);
					recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
					break;
				case 6:
					commitFragmentInstanceDeletionEffects(finishedWork);
					break;
				case 26:
					safelyDetachRef(finishedWork, finishedWork.return);
					instance = finishedWork.stateNode;
					null !== finishedWork.memoizedState || null === instance || offscreenSubtreeWasHidden || instance.parentNode.removeChild(instance);
					recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
					break;
				case 22:
					null === finishedWork.memoizedState && recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
					break;
				case 30:
					safelyDetachRef(finishedWork, finishedWork.return);
					recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
					break;
				case 7: safelyDetachRef(finishedWork, finishedWork.return);
				default: recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
			}
			parentFiber = parentFiber.sibling;
		}
	}
	function recursivelyTraverseReappearLayoutEffects(finishedRoot$jscomp$0, parentFiber, layoutEffectTraversalFlags) {
		layoutEffectTraversalFlags = 0 !== (parentFiber.subtreeFlags & 8772) ? layoutEffectTraversalFlags : layoutEffectTraversalFlags & -2;
		for (parentFiber = parentFiber.child; null !== parentFiber;) {
			var current = parentFiber.alternate, finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags, includeWorkInProgressEffects = 0 !== (layoutEffectTraversalFlags & 1);
			switch (finishedWork.tag) {
				case 0:
				case 11:
				case 15:
					recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
					commitHookEffectListMount(4, finishedWork);
					break;
				case 1:
					recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
					current = finishedWork;
					finishedRoot = current.stateNode;
					if ("function" === typeof finishedRoot.componentDidMount) try {
						finishedRoot.componentDidMount();
					} catch (error) {
						captureCommitPhaseError(current, current.return, error);
					}
					current = finishedWork;
					finishedRoot = current.updateQueue;
					if (null !== finishedRoot) {
						var instance = current.stateNode;
						try {
							var hiddenCallbacks = finishedRoot.shared.hiddenCallbacks;
							if (null !== hiddenCallbacks) for (finishedRoot.shared.hiddenCallbacks = null, finishedRoot = 0; finishedRoot < hiddenCallbacks.length; finishedRoot++) callCallback(hiddenCallbacks[finishedRoot], instance);
						} catch (error) {
							captureCommitPhaseError(current, current.return, error);
						}
					}
					includeWorkInProgressEffects && flags & 64 && commitClassCallbacks(finishedWork);
					safelyAttachRef(finishedWork, finishedWork.return);
					break;
				case 27: 0 !== (layoutEffectTraversalFlags & 2) && commitHostSingletonAcquisition(finishedWork);
				case 5:
					5 !== finishedWork.tag && 27 !== finishedWork.tag || commitFragmentInstanceInsertionEffects(finishedWork);
					recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
					includeWorkInProgressEffects && null === current && flags & 4 && commitHostMount(finishedWork);
					safelyAttachRef(finishedWork, finishedWork.return);
					break;
				case 6:
					commitFragmentInstanceInsertionEffects(finishedWork);
					break;
				case 26:
					instance = finishedWork.stateNode;
					null !== finishedWork.memoizedState || null === instance || offscreenSubtreeIsHidden || mountHoistable(getHoistableRoot(instance.ownerDocument), finishedWork.type, instance);
					recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
					includeWorkInProgressEffects && null === current && flags & 4 && commitHostMount(finishedWork);
					safelyAttachRef(finishedWork, finishedWork.return);
					break;
				case 12:
					recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
					break;
				case 31:
					recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
					includeWorkInProgressEffects && flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
					break;
				case 13:
					recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
					includeWorkInProgressEffects && flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
					break;
				case 22:
					null === finishedWork.memoizedState && recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
					safelyAttachRef(finishedWork, finishedWork.return);
					break;
				case 30:
					recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
					safelyAttachRef(finishedWork, finishedWork.return);
					break;
				case 7: safelyAttachRef(finishedWork, finishedWork.return);
				default: recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
			}
			parentFiber = parentFiber.sibling;
		}
	}
	function commitOffscreenPassiveMountEffects(current, finishedWork) {
		var previousCache = null;
		null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (previousCache = current.memoizedState.cachePool.pool);
		current = null;
		null !== finishedWork.memoizedState && null !== finishedWork.memoizedState.cachePool && (current = finishedWork.memoizedState.cachePool.pool);
		current !== previousCache && (null != current && current.refCount++, null != previousCache && releaseCache(previousCache));
	}
	function commitCachePassiveMountEffect(current, finishedWork) {
		current = null;
		null !== finishedWork.alternate && (current = finishedWork.alternate.memoizedState.cache);
		finishedWork = finishedWork.memoizedState.cache;
		finishedWork !== current && (finishedWork.refCount++, null != current && releaseCache(current));
	}
	function recursivelyTraversePassiveMountEffects(root, parentFiber, committedLanes, committedTransitions) {
		var isViewTransitionEligible = (committedLanes & 335544064) === committedLanes;
		if (parentFiber.subtreeFlags & (isViewTransitionEligible ? 10262 : 10256)) for (parentFiber = parentFiber.child; null !== parentFiber;) commitPassiveMountOnFiber(root, parentFiber, committedLanes, committedTransitions), parentFiber = parentFiber.sibling;
		else isViewTransitionEligible && restoreNestedViewTransitions(parentFiber);
	}
	function commitPassiveMountOnFiber(finishedRoot, finishedWork, committedLanes, committedTransitions) {
		var isViewTransitionEligible = (committedLanes & 335544064) === committedLanes;
		isViewTransitionEligible && null === finishedWork.alternate && null !== finishedWork.return && null !== finishedWork.return.alternate && restoreEnterOrExitViewTransitions(finishedWork);
		var flags = finishedWork.flags;
		switch (finishedWork.tag) {
			case 0:
			case 11:
			case 15:
				recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
				flags & 2048 && commitHookEffectListMount(9, finishedWork);
				break;
			case 1:
				recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
				break;
			case 3:
				recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
				isViewTransitionEligible && rootViewTransitionNameCanceled && (finishedRoot = finishedRoot.containerInfo, finishedRoot = 9 === finishedRoot.nodeType ? finishedRoot.body : "HTML" === finishedRoot.nodeName ? finishedRoot.ownerDocument.body : finishedRoot, "root" === finishedRoot.style.viewTransitionName && (finishedRoot.style.viewTransitionName = ""), finishedRoot = finishedRoot.ownerDocument.documentElement, null !== finishedRoot && "none" === finishedRoot.style.viewTransitionName && (finishedRoot.style.viewTransitionName = ""));
				flags & 2048 && (flags = null, null !== finishedWork.alternate && (flags = finishedWork.alternate.memoizedState.cache), finishedWork = finishedWork.memoizedState.cache, finishedWork !== flags && (finishedWork.refCount++, null != flags && releaseCache(flags)));
				break;
			case 12:
				if (flags & 2048) {
					recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
					flags = finishedWork.stateNode;
					try {
						var _finishedWork$memoize2 = finishedWork.memoizedProps, id = _finishedWork$memoize2.id, onPostCommit = _finishedWork$memoize2.onPostCommit;
						"function" === typeof onPostCommit && onPostCommit(id, null === finishedWork.alternate ? "mount" : "update", flags.passiveEffectDuration, -0);
					} catch (error) {
						captureCommitPhaseError(finishedWork, finishedWork.return, error);
					}
				} else recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
				break;
			case 31:
				recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
				break;
			case 13:
				recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
				break;
			case 23: break;
			case 22:
				_finishedWork$memoize2 = finishedWork.stateNode;
				id = finishedWork.alternate;
				null !== finishedWork.memoizedState ? (isViewTransitionEligible && null !== id && null === id.memoizedState && restoreEnterOrExitViewTransitions(id), _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions) : recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork)) : (isViewTransitionEligible && null !== id && null !== id.memoizedState && restoreEnterOrExitViewTransitions(finishedWork), _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions) : (_finishedWork$memoize2._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, 0 !== (finishedWork.subtreeFlags & 10256) || !1)));
				flags & 2048 && commitOffscreenPassiveMountEffects(id, finishedWork);
				break;
			case 24:
				recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
				flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
				break;
			case 30:
				isViewTransitionEligible && (flags = finishedWork.alternate, null !== flags && (restoreViewTransitionOnHostInstances(flags.child, !0), restoreViewTransitionOnHostInstances(finishedWork.child, !0)));
				recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
				break;
			default: recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
		}
	}
	function recursivelyTraverseReconnectPassiveEffects(finishedRoot$jscomp$0, parentFiber, committedLanes$jscomp$0, committedTransitions$jscomp$0, includeWorkInProgressEffects) {
		includeWorkInProgressEffects = includeWorkInProgressEffects && (0 !== (parentFiber.subtreeFlags & 10256) || !1);
		for (parentFiber = parentFiber.child; null !== parentFiber;) {
			var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, committedLanes = committedLanes$jscomp$0, committedTransitions = committedTransitions$jscomp$0, flags = finishedWork.flags;
			switch (finishedWork.tag) {
				case 0:
				case 11:
				case 15:
					recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects);
					commitHookEffectListMount(8, finishedWork);
					break;
				case 23: break;
				case 22:
					var instance = finishedWork.stateNode;
					null !== finishedWork.memoizedState ? instance._visibility & 2 ? recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects) : recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork) : (instance._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects));
					includeWorkInProgressEffects && flags & 2048 && commitOffscreenPassiveMountEffects(finishedWork.alternate, finishedWork);
					break;
				case 24:
					recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects);
					includeWorkInProgressEffects && flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
					break;
				default: recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects);
			}
			parentFiber = parentFiber.sibling;
		}
	}
	function recursivelyTraverseAtomicPassiveEffects(finishedRoot$jscomp$0, parentFiber) {
		if (parentFiber.subtreeFlags & 10256) for (parentFiber = parentFiber.child; null !== parentFiber;) {
			var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
			switch (finishedWork.tag) {
				case 22:
					recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
					flags & 2048 && commitOffscreenPassiveMountEffects(finishedWork.alternate, finishedWork);
					break;
				case 24:
					recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
					flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
					break;
				default: recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
			}
			parentFiber = parentFiber.sibling;
		}
	}
	var suspenseyCommitFlag = 8192;
	function recursivelyAccumulateSuspenseyCommit(parentFiber, committedLanes, suspendedState) {
		if (parentFiber.subtreeFlags & suspenseyCommitFlag) for (parentFiber = parentFiber.child; null !== parentFiber;) accumulateSuspenseyCommitOnFiber(parentFiber, committedLanes, suspendedState), parentFiber = parentFiber.sibling;
	}
	function accumulateSuspenseyCommitOnFiber(fiber, committedLanes, suspendedState) {
		switch (fiber.tag) {
			case 26:
				recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
				fiber.flags & suspenseyCommitFlag && (null !== fiber.memoizedState ? suspendResource(suspendedState, currentHoistableRoot, fiber.memoizedState, fiber.memoizedProps) : (fiber = fiber.stateNode, (committedLanes & 335544128) === committedLanes && suspendInstance(suspendedState, fiber)));
				break;
			case 5:
				recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
				fiber.flags & suspenseyCommitFlag && (fiber = fiber.stateNode, (committedLanes & 335544128) === committedLanes && suspendInstance(suspendedState, fiber));
				break;
			case 3:
			case 4:
				var previousHoistableRoot = currentHoistableRoot;
				currentHoistableRoot = getHoistableRoot(fiber.stateNode.containerInfo);
				recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
				currentHoistableRoot = previousHoistableRoot;
				break;
			case 22:
				null === fiber.memoizedState && (previousHoistableRoot = fiber.alternate, null !== previousHoistableRoot && null !== previousHoistableRoot.memoizedState ? (previousHoistableRoot = suspenseyCommitFlag, suspenseyCommitFlag = 16777216, recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState), suspenseyCommitFlag = previousHoistableRoot) : recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState));
				break;
			case 30:
				if (0 !== (fiber.flags & suspenseyCommitFlag) && (previousHoistableRoot = fiber.memoizedProps.name, null != previousHoistableRoot && "auto" !== previousHoistableRoot)) {
					var state = fiber.stateNode;
					state.paired = null;
					null === appearingViewTransitions && (appearingViewTransitions = /* @__PURE__ */ new Map());
					appearingViewTransitions.set(previousHoistableRoot, state);
				}
				recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
				break;
			default: recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
		}
	}
	function detachAlternateSiblings(parentFiber) {
		var previousFiber = parentFiber.alternate;
		if (null !== previousFiber && (parentFiber = previousFiber.child, null !== parentFiber)) {
			previousFiber.child = null;
			do
				previousFiber = parentFiber.sibling, parentFiber.sibling = null, parentFiber = previousFiber;
			while (null !== parentFiber);
		}
	}
	function recursivelyTraversePassiveUnmountEffects(parentFiber) {
		var deletions = parentFiber.deletions;
		if (0 !== (parentFiber.flags & 16)) {
			if (null !== deletions) for (var i = 0; i < deletions.length; i++) {
				var childToDelete = deletions[i];
				nextEffect = childToDelete;
				commitPassiveUnmountEffectsInsideOfDeletedTree_begin(childToDelete, parentFiber);
			}
			detachAlternateSiblings(parentFiber);
		}
		if (parentFiber.subtreeFlags & 10256) for (parentFiber = parentFiber.child; null !== parentFiber;) commitPassiveUnmountOnFiber(parentFiber), parentFiber = parentFiber.sibling;
	}
	function commitPassiveUnmountOnFiber(finishedWork) {
		switch (finishedWork.tag) {
			case 0:
			case 11:
			case 15:
				recursivelyTraversePassiveUnmountEffects(finishedWork);
				finishedWork.flags & 2048 && commitHookEffectListUnmount(9, finishedWork, finishedWork.return);
				break;
			case 3:
				recursivelyTraversePassiveUnmountEffects(finishedWork);
				break;
			case 12:
				recursivelyTraversePassiveUnmountEffects(finishedWork);
				break;
			case 22:
				var instance = finishedWork.stateNode;
				null !== finishedWork.memoizedState && instance._visibility & 2 && (null === finishedWork.return || 13 !== finishedWork.return.tag) ? (instance._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(finishedWork)) : recursivelyTraversePassiveUnmountEffects(finishedWork);
				break;
			default: recursivelyTraversePassiveUnmountEffects(finishedWork);
		}
	}
	function recursivelyTraverseDisconnectPassiveEffects(parentFiber) {
		var deletions = parentFiber.deletions;
		if (0 !== (parentFiber.flags & 16)) {
			if (null !== deletions) for (var i = 0; i < deletions.length; i++) {
				var childToDelete = deletions[i];
				nextEffect = childToDelete;
				commitPassiveUnmountEffectsInsideOfDeletedTree_begin(childToDelete, parentFiber);
			}
			detachAlternateSiblings(parentFiber);
		}
		for (parentFiber = parentFiber.child; null !== parentFiber;) {
			deletions = parentFiber;
			switch (deletions.tag) {
				case 0:
				case 11:
				case 15:
					commitHookEffectListUnmount(8, deletions, deletions.return);
					recursivelyTraverseDisconnectPassiveEffects(deletions);
					break;
				case 22:
					i = deletions.stateNode;
					i._visibility & 2 && (i._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(deletions));
					break;
				default: recursivelyTraverseDisconnectPassiveEffects(deletions);
			}
			parentFiber = parentFiber.sibling;
		}
	}
	function commitPassiveUnmountEffectsInsideOfDeletedTree_begin(deletedSubtreeRoot, nearestMountedAncestor) {
		for (; null !== nextEffect;) {
			var fiber = nextEffect;
			switch (fiber.tag) {
				case 0:
				case 11:
				case 15:
					commitHookEffectListUnmount(8, fiber, nearestMountedAncestor);
					break;
				case 23:
				case 22:
					if (null !== fiber.memoizedState && null !== fiber.memoizedState.cachePool) {
						var cache = fiber.memoizedState.cachePool.pool;
						null != cache && cache.refCount++;
					}
					break;
				case 24: releaseCache(fiber.memoizedState.cache);
			}
			cache = fiber.child;
			if (null !== cache) cache.return = fiber, nextEffect = cache;
			else a: for (fiber = deletedSubtreeRoot; null !== nextEffect;) {
				cache = nextEffect;
				var sibling = cache.sibling, returnFiber = cache.return;
				detachFiberAfterEffects(cache);
				if (cache === fiber) {
					nextEffect = null;
					break a;
				}
				if (null !== sibling) {
					sibling.return = returnFiber;
					nextEffect = sibling;
					break a;
				}
				nextEffect = returnFiber;
			}
		}
	}
	var DefaultAsyncDispatcher = {
		getCacheForType: function(resourceType) {
			var cache = readContext(CacheContext), cacheForType = cache.data.get(resourceType);
			void 0 === cacheForType && (cacheForType = resourceType(), cache.data.set(resourceType, cacheForType));
			return cacheForType;
		},
		cacheSignal: function() {
			return readContext(CacheContext).controller.signal;
		}
	};
	var PossiblyWeakMap = "function" === typeof WeakMap ? WeakMap : Map;
	var executionContext = 0;
	var workInProgressRoot = null;
	var workInProgress = null;
	var workInProgressRootRenderLanes = 0;
	var workInProgressSuspendedReason = 0;
	var workInProgressThrownValue = null;
	var workInProgressRootDidSkipSuspendedSiblings = !1;
	var workInProgressRootIsPrerendering = !1;
	var workInProgressRootDidAttachPingListener = !1;
	var entangledRenderLanes = 0;
	var workInProgressRootExitStatus = 0;
	var workInProgressRootSkippedLanes = 0;
	var workInProgressRootInterleavedUpdatedLanes = 0;
	var workInProgressRootPingedLanes = 0;
	var workInProgressDeferredLane = 0;
	var workInProgressSuspendedRetryLanes = 0;
	var workInProgressRootConcurrentErrors = null;
	var workInProgressRootRecoverableErrors = null;
	var workInProgressRootDidIncludeRecursiveRenderUpdate = !1;
	var globalMostRecentFallbackTime = 0;
	var globalMostRecentTransitionTime = 0;
	var workInProgressRootRenderTargetTime = Infinity;
	var workInProgressTransitions = null;
	var legacyErrorBoundariesThatAlreadyFailed = null;
	var pendingEffectsStatus = 0;
	var pendingEffectsRoot = null;
	var pendingFinishedWork = null;
	var pendingEffectsLanes = 0;
	var pendingEffectsRemainingLanes = 0;
	var pendingPassiveTransitions = null;
	var pendingRecoverableErrors = null;
	var pendingViewTransition = null;
	var pendingViewTransitionEvents = null;
	var pendingTransitionTypes = null;
	var nestedUpdateCount = 0;
	var rootWithNestedUpdates = null;
	function requestUpdateLane() {
		return 0 !== (executionContext & 2) && 0 !== workInProgressRootRenderLanes ? workInProgressRootRenderLanes & -workInProgressRootRenderLanes : null !== ReactSharedInternals.T ? requestTransitionLane() : resolveUpdatePriority();
	}
	function requestDeferredLane() {
		if (0 === workInProgressDeferredLane) if (0 === (workInProgressRootRenderLanes & 536870912) || isHydrating) {
			var lane = nextTransitionDeferredLane;
			nextTransitionDeferredLane <<= 1;
			0 === (nextTransitionDeferredLane & 3932160) && (nextTransitionDeferredLane = 262144);
			workInProgressDeferredLane = lane;
		} else workInProgressDeferredLane = 536870912;
		lane = suspenseHandlerStackCursor.current;
		null !== lane && (lane.flags |= 32);
		return workInProgressDeferredLane;
	}
	function scheduleViewTransitionEvent(fiber, callback) {
		if (null != callback) {
			var state = fiber.stateNode, instance = state.ref;
			null === instance && (instance = state.ref = createViewTransitionInstance(getViewTransitionName(fiber.memoizedProps, state)));
			null === pendingViewTransitionEvents && (pendingViewTransitionEvents = []);
			pendingViewTransitionEvents.push(callback.bind(null, instance));
		}
	}
	function scheduleUpdateOnFiber(root, fiber, lane) {
		if (root === workInProgressRoot && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || null !== root.cancelPendingCommit) prepareFreshStack(root, 0), markRootSuspended(root, workInProgressRootRenderLanes, workInProgressDeferredLane, !1);
		markRootUpdated$1(root, lane);
		if (0 === (executionContext & 2) || root !== workInProgressRoot) root === workInProgressRoot && (0 === (executionContext & 2) && (workInProgressRootInterleavedUpdatedLanes |= lane), 4 === workInProgressRootExitStatus && markRootSuspended(root, workInProgressRootRenderLanes, workInProgressDeferredLane, !1)), ensureRootIsScheduled(root);
	}
	function performWorkOnRoot(root$jscomp$0, lanes, forceSync) {
		if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
		var shouldTimeSlice = !forceSync && 0 === (lanes & 127) && 0 === (lanes & root$jscomp$0.expiredLanes) || checkIfRootIsPrerendering(root$jscomp$0, lanes), exitStatus = shouldTimeSlice ? renderRootConcurrent(root$jscomp$0, lanes) : renderRootSync(root$jscomp$0, lanes, !0), renderWasConcurrent = shouldTimeSlice;
		do {
			if (0 === exitStatus) {
				workInProgressRootIsPrerendering && !shouldTimeSlice && markRootSuspended(root$jscomp$0, lanes, 0, !1);
				break;
			} else {
				forceSync = root$jscomp$0.current.alternate;
				if (renderWasConcurrent && !isRenderConsistentWithExternalStores(forceSync)) {
					exitStatus = renderRootSync(root$jscomp$0, lanes, !1);
					renderWasConcurrent = !1;
					continue;
				}
				if (2 === exitStatus) {
					renderWasConcurrent = lanes;
					if (root$jscomp$0.errorRecoveryDisabledLanes & renderWasConcurrent) var JSCompiler_inline_result = 0;
					else JSCompiler_inline_result = root$jscomp$0.pendingLanes & -536870913, JSCompiler_inline_result = 0 !== JSCompiler_inline_result ? JSCompiler_inline_result : JSCompiler_inline_result & 536870912 ? 536870912 : 0;
					if (0 !== JSCompiler_inline_result) {
						lanes = JSCompiler_inline_result;
						a: {
							var root = root$jscomp$0;
							exitStatus = workInProgressRootConcurrentErrors;
							var wasRootDehydrated = root.current.memoizedState.isDehydrated;
							wasRootDehydrated && (prepareFreshStack(root, JSCompiler_inline_result).flags |= 256);
							JSCompiler_inline_result = renderRootSync(root, JSCompiler_inline_result, !1);
							if (2 !== JSCompiler_inline_result && 6 !== JSCompiler_inline_result) {
								if (workInProgressRootDidAttachPingListener && !wasRootDehydrated) {
									root.errorRecoveryDisabledLanes |= renderWasConcurrent;
									workInProgressRootInterleavedUpdatedLanes |= renderWasConcurrent;
									exitStatus = 4;
									break a;
								}
								renderWasConcurrent = workInProgressRootRecoverableErrors;
								workInProgressRootRecoverableErrors = exitStatus;
								null !== renderWasConcurrent && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = renderWasConcurrent : workInProgressRootRecoverableErrors.push.apply(workInProgressRootRecoverableErrors, renderWasConcurrent));
							}
							exitStatus = JSCompiler_inline_result;
						}
						renderWasConcurrent = !1;
						if (2 !== exitStatus) continue;
					}
				}
				if (1 === exitStatus) {
					prepareFreshStack(root$jscomp$0, 0);
					markRootSuspended(root$jscomp$0, lanes, 0, !0);
					break;
				}
				a: {
					shouldTimeSlice = root$jscomp$0;
					renderWasConcurrent = exitStatus;
					switch (renderWasConcurrent) {
						case 0:
						case 1: throw Error(formatProdErrorMessage(345));
						case 4: if ((lanes & 4194048) !== lanes && (lanes & 62914560) !== lanes) break;
						case 6:
							markRootSuspended(shouldTimeSlice, lanes, workInProgressDeferredLane, !workInProgressRootDidSkipSuspendedSiblings);
							break a;
						case 2:
							workInProgressRootRecoverableErrors = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(formatProdErrorMessage(329));
					}
					if ((lanes & 62914560) === lanes && (exitStatus = globalMostRecentFallbackTime + 300 - now(), 10 < exitStatus)) {
						markRootSuspended(shouldTimeSlice, lanes, workInProgressDeferredLane, !workInProgressRootDidSkipSuspendedSiblings);
						if (0 !== getNextLanes(shouldTimeSlice, 0, !0)) break a;
						pendingEffectsLanes = lanes;
						shouldTimeSlice.timeoutHandle = scheduleTimeout(completeRootWhenReady.bind(null, shouldTimeSlice, forceSync, workInProgressRootRecoverableErrors, workInProgressTransitions, workInProgressRootDidIncludeRecursiveRenderUpdate, lanes, workInProgressDeferredLane, workInProgressRootInterleavedUpdatedLanes, workInProgressSuspendedRetryLanes, workInProgressRootDidSkipSuspendedSiblings, renderWasConcurrent, "Throttled", -0, 0), exitStatus);
						break a;
					}
					completeRootWhenReady(shouldTimeSlice, forceSync, workInProgressRootRecoverableErrors, workInProgressTransitions, workInProgressRootDidIncludeRecursiveRenderUpdate, lanes, workInProgressDeferredLane, workInProgressRootInterleavedUpdatedLanes, workInProgressSuspendedRetryLanes, workInProgressRootDidSkipSuspendedSiblings, renderWasConcurrent, null, -0, 0);
				}
			}
			break;
		} while (1);
		ensureRootIsScheduled(root$jscomp$0);
	}
	function completeRootWhenReady(root, finishedWork, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason, completedRenderStartTime, completedRenderEndTime) {
		root.timeoutHandle = -1;
		var subtreeFlags = finishedWork.subtreeFlags, isViewTransitionEligible = (lanes & 335544064) === lanes;
		suspendedCommitReason = null;
		if (isViewTransitionEligible || subtreeFlags & 8192 || 16785408 === (subtreeFlags & 16785408)) {
			if (suspendedCommitReason = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: noop$1
			}, appearingViewTransitions = null, accumulateSuspenseyCommitOnFiber(finishedWork, lanes, suspendedCommitReason), isViewTransitionEligible && (subtreeFlags = suspendedCommitReason, isViewTransitionEligible = root.containerInfo, isViewTransitionEligible = (9 === isViewTransitionEligible.nodeType ? isViewTransitionEligible : isViewTransitionEligible.ownerDocument).__reactViewTransition, null != isViewTransitionEligible && (subtreeFlags.count++, subtreeFlags.waitingForViewTransition = !0, subtreeFlags = onUnsuspend.bind(subtreeFlags), isViewTransitionEligible.finished.then(subtreeFlags, subtreeFlags))), subtreeFlags = (lanes & 62914560) === lanes ? globalMostRecentFallbackTime - now() : (lanes & 4194048) === lanes ? globalMostRecentTransitionTime - now() : 0, subtreeFlags = waitForCommitToBeReady(suspendedCommitReason, subtreeFlags), null !== subtreeFlags) {
				pendingEffectsLanes = lanes;
				root.cancelPendingCommit = subtreeFlags(completeRoot.bind(null, root, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason, null, completedRenderStartTime, completedRenderEndTime));
				markRootSuspended(root, lanes, spawnedLane, !didSkipSuspendedSiblings);
				return;
			}
		}
		completeRoot(root, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason);
	}
	function isRenderConsistentWithExternalStores(finishedWork) {
		for (var node = finishedWork;;) {
			var tag = node.tag;
			if ((0 === tag || 11 === tag || 15 === tag) && node.flags & 16384 && (tag = node.updateQueue, null !== tag && (tag = tag.stores, null !== tag))) for (var i = 0; i < tag.length; i++) {
				var check = tag[i], getSnapshot = check.getSnapshot;
				check = check.value;
				try {
					if (!objectIs(getSnapshot(), check)) return !1;
				} catch (error) {
					return !1;
				}
			}
			tag = node.child;
			if (node.subtreeFlags & 16384 && null !== tag) tag.return = node, node = tag;
			else {
				if (node === finishedWork) break;
				for (; null === node.sibling;) {
					if (null === node.return || node.return === finishedWork) return !0;
					node = node.return;
				}
				node.sibling.return = node.return;
				node = node.sibling;
			}
		}
		return !0;
	}
	function markRootSuspended(root, suspendedLanes, spawnedLane, didAttemptEntireTree) {
		suspendedLanes = getEntangledLanes(root, suspendedLanes);
		suspendedLanes &= ~workInProgressRootPingedLanes;
		suspendedLanes &= ~workInProgressRootInterleavedUpdatedLanes;
		root.suspendedLanes |= suspendedLanes;
		root.pingedLanes &= ~suspendedLanes;
		didAttemptEntireTree && (root.warmLanes |= suspendedLanes);
		didAttemptEntireTree = root.expirationTimes;
		for (var lanes = suspendedLanes; 0 < lanes;) {
			var index$6 = 31 - clz32(lanes), lane = 1 << index$6;
			didAttemptEntireTree[index$6] = -1;
			lanes &= ~lane;
		}
		0 !== spawnedLane && markSpawnedDeferredLane(root, spawnedLane, suspendedLanes);
	}
	function flushSyncWork$1() {
		return 0 === (executionContext & 6) ? (flushSyncWorkAcrossRoots_impl(0, !1), !1) : !0;
	}
	function resetWorkInProgressStack() {
		if (null !== workInProgress) {
			if (0 === workInProgressSuspendedReason) var interruptedWork = workInProgress.return;
			else interruptedWork = workInProgress, lastContextDependency = currentlyRenderingFiber$1 = null, resetHooksOnUnwind(interruptedWork), thenableState$1 = null, thenableIndexCounter$1 = 0, interruptedWork = workInProgress;
			for (; null !== interruptedWork;) unwindInterruptedWork(interruptedWork.alternate, interruptedWork), interruptedWork = interruptedWork.return;
			workInProgress = null;
		}
	}
	function prepareFreshStack(root, lanes) {
		var timeoutHandle = root.timeoutHandle;
		-1 !== timeoutHandle && (root.timeoutHandle = -1, cancelTimeout(timeoutHandle));
		timeoutHandle = root.cancelPendingCommit;
		null !== timeoutHandle && (root.cancelPendingCommit = null, timeoutHandle());
		pendingEffectsLanes = 0;
		resetWorkInProgressStack();
		workInProgressRoot = root;
		workInProgress = timeoutHandle = createWorkInProgress(root.current, null);
		workInProgressRootRenderLanes = lanes;
		workInProgressSuspendedReason = 0;
		workInProgressThrownValue = null;
		workInProgressRootDidSkipSuspendedSiblings = !1;
		workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root, lanes);
		workInProgressRootDidAttachPingListener = !1;
		workInProgressSuspendedRetryLanes = workInProgressDeferredLane = workInProgressRootPingedLanes = workInProgressRootInterleavedUpdatedLanes = workInProgressRootSkippedLanes = workInProgressRootExitStatus = 0;
		workInProgressRootRecoverableErrors = workInProgressRootConcurrentErrors = null;
		workInProgressRootDidIncludeRecursiveRenderUpdate = !1;
		entangledRenderLanes = getEntangledLanes(root, lanes);
		finishQueueingConcurrentUpdates();
		return timeoutHandle;
	}
	function handleThrow(root, thrownValue) {
		currentlyRenderingFiber = null;
		ReactSharedInternals.H = ContextOnlyDispatcher;
		thrownValue === SuspenseException || thrownValue === SuspenseActionException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 3) : thrownValue === SuspenseyCommitException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 4) : workInProgressSuspendedReason = thrownValue === SelectiveHydrationException ? 8 : null !== thrownValue && "object" === typeof thrownValue && "function" === typeof thrownValue.then ? 6 : 1;
		workInProgressThrownValue = thrownValue;
		null === workInProgress && (workInProgressRootExitStatus = 1, logUncaughtError(root, createCapturedValueAtFiber(thrownValue, root.current)));
	}
	function shouldRemainOnPreviousScreen() {
		var handler = suspenseHandlerStackCursor.current;
		return null === handler ? !0 : (workInProgressRootRenderLanes & 4194048) === workInProgressRootRenderLanes ? null === shellBoundary ? !0 : !1 : (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes || 0 !== (workInProgressRootRenderLanes & 536870912) ? handler === shellBoundary : !1;
	}
	function pushDispatcher() {
		var prevDispatcher = ReactSharedInternals.H;
		ReactSharedInternals.H = ContextOnlyDispatcher;
		return null === prevDispatcher ? ContextOnlyDispatcher : prevDispatcher;
	}
	function pushAsyncDispatcher() {
		var prevAsyncDispatcher = ReactSharedInternals.A;
		ReactSharedInternals.A = DefaultAsyncDispatcher;
		return prevAsyncDispatcher;
	}
	function renderDidSuspendDelayIfPossible() {
		workInProgressRootExitStatus = 4;
		workInProgressRootDidSkipSuspendedSiblings || (workInProgressRootRenderLanes & 4194048) !== workInProgressRootRenderLanes && null !== suspenseHandlerStackCursor.current || (workInProgressRootIsPrerendering = !0);
		0 === (workInProgressRootSkippedLanes & 134217727) && 0 === (workInProgressRootInterleavedUpdatedLanes & 134217727) || null === workInProgressRoot || markRootSuspended(workInProgressRoot, workInProgressRootRenderLanes, workInProgressDeferredLane, !1);
	}
	function renderRootSync(root, lanes, shouldYieldForPrerendering) {
		var prevExecutionContext = executionContext;
		executionContext |= 2;
		var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
		if (workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes) workInProgressTransitions = null, prepareFreshStack(root, lanes);
		lanes = !1;
		var exitStatus = workInProgressRootExitStatus;
		a: do
			try {
				if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
					var unitOfWork = workInProgress, thrownValue = workInProgressThrownValue;
					switch (workInProgressSuspendedReason) {
						case 8:
							resetWorkInProgressStack();
							exitStatus = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							null === suspenseHandlerStackCursor.current && (lanes = !0);
							var reason = workInProgressSuspendedReason;
							workInProgressSuspendedReason = 0;
							workInProgressThrownValue = null;
							throwAndUnwindWorkLoop(root, unitOfWork, thrownValue, reason);
							if (shouldYieldForPrerendering && workInProgressRootIsPrerendering) {
								exitStatus = 0;
								break a;
							}
							break;
						default: reason = workInProgressSuspendedReason, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root, unitOfWork, thrownValue, reason);
					}
				}
				workLoopSync();
				exitStatus = workInProgressRootExitStatus;
				break;
			} catch (thrownValue$184) {
				handleThrow(root, thrownValue$184);
			}
		while (1);
		lanes && root.shellSuspendCounter++;
		lastContextDependency = currentlyRenderingFiber$1 = null;
		executionContext = prevExecutionContext;
		ReactSharedInternals.H = prevDispatcher;
		ReactSharedInternals.A = prevAsyncDispatcher;
		null === workInProgress && (workInProgressRoot = null, workInProgressRootRenderLanes = 0, finishQueueingConcurrentUpdates());
		return exitStatus;
	}
	function workLoopSync() {
		for (; null !== workInProgress;) performUnitOfWork(workInProgress);
	}
	function renderRootConcurrent(root, lanes) {
		var prevExecutionContext = executionContext;
		executionContext |= 2;
		var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
		workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes ? (workInProgressTransitions = null, workInProgressRootRenderTargetTime = now() + 500, prepareFreshStack(root, lanes)) : workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root, lanes);
		a: do
			try {
				if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
					lanes = workInProgress;
					var thrownValue = workInProgressThrownValue;
					b: switch (workInProgressSuspendedReason) {
						case 1:
							workInProgressSuspendedReason = 0;
							workInProgressThrownValue = null;
							throwAndUnwindWorkLoop(root, lanes, thrownValue, 1);
							break;
						case 2:
						case 9:
							if (isThenableResolved(thrownValue)) {
								workInProgressSuspendedReason = 0;
								workInProgressThrownValue = null;
								replaySuspendedUnitOfWork(lanes);
								break;
							}
							lanes = function() {
								2 !== workInProgressSuspendedReason && 9 !== workInProgressSuspendedReason || workInProgressRoot !== root || (workInProgressSuspendedReason = 7);
								ensureRootIsScheduled(root);
							};
							thrownValue.then(lanes, lanes);
							break a;
						case 3:
							workInProgressSuspendedReason = 7;
							break a;
						case 4:
							workInProgressSuspendedReason = 5;
							break a;
						case 7:
							isThenableResolved(thrownValue) ? (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, replaySuspendedUnitOfWork(lanes)) : (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root, lanes, thrownValue, 7));
							break;
						case 5:
							var resource = null;
							switch (workInProgress.tag) {
								case 26: resource = workInProgress.memoizedState;
								case 5:
								case 27:
									var hostFiber = workInProgress;
									if (resource ? preloadResource(resource) : hostFiber.stateNode.complete) {
										workInProgressSuspendedReason = 0;
										workInProgressThrownValue = null;
										var sibling = hostFiber.sibling;
										if (null !== sibling) workInProgress = sibling;
										else {
											var returnFiber = hostFiber.return;
											null !== returnFiber ? (workInProgress = returnFiber, completeUnitOfWork(returnFiber)) : workInProgress = null;
										}
										break b;
									}
							}
							workInProgressSuspendedReason = 0;
							workInProgressThrownValue = null;
							throwAndUnwindWorkLoop(root, lanes, thrownValue, 5);
							break;
						case 6:
							workInProgressSuspendedReason = 0;
							workInProgressThrownValue = null;
							throwAndUnwindWorkLoop(root, lanes, thrownValue, 6);
							break;
						case 8:
							resetWorkInProgressStack();
							workInProgressRootExitStatus = 6;
							break a;
						default: throw Error(formatProdErrorMessage(462));
					}
				}
				workLoopConcurrentByScheduler();
				break;
			} catch (thrownValue$186) {
				handleThrow(root, thrownValue$186);
			}
		while (1);
		lastContextDependency = currentlyRenderingFiber$1 = null;
		ReactSharedInternals.H = prevDispatcher;
		ReactSharedInternals.A = prevAsyncDispatcher;
		executionContext = prevExecutionContext;
		if (null !== workInProgress) return 0;
		workInProgressRoot = null;
		workInProgressRootRenderLanes = 0;
		finishQueueingConcurrentUpdates();
		return workInProgressRootExitStatus;
	}
	function workLoopConcurrentByScheduler() {
		for (; null !== workInProgress && !shouldYield();) performUnitOfWork(workInProgress);
	}
	function performUnitOfWork(unitOfWork) {
		var next = beginWork(unitOfWork.alternate, unitOfWork, entangledRenderLanes);
		unitOfWork.memoizedProps = unitOfWork.pendingProps;
		null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
	}
	function replaySuspendedUnitOfWork(unitOfWork) {
		var next = unitOfWork;
		var current = next.alternate;
		switch (next.tag) {
			case 15:
			case 0:
				next = replayFunctionComponent(current, next, next.pendingProps, next.type, void 0, workInProgressRootRenderLanes);
				break;
			case 11:
				next = replayFunctionComponent(current, next, next.pendingProps, next.type.render, next.ref, workInProgressRootRenderLanes);
				break;
			case 5:
				resetHooksOnUnwind(next);
				var fiber = next;
				fiber === hydrationParentFiber && (isHydrating ? (popToNextHostParent(fiber), 5 === fiber.tag && null != fiber.stateNode && (nextHydratableInstance = fiber.stateNode)) : (popToNextHostParent(fiber), isHydrating = !0));
			default: unwindInterruptedWork(current, next), next = workInProgress = resetWorkInProgress(next, entangledRenderLanes), next = beginWork(current, next, entangledRenderLanes);
		}
		unitOfWork.memoizedProps = unitOfWork.pendingProps;
		null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
	}
	function throwAndUnwindWorkLoop(root, unitOfWork, thrownValue, suspendedReason) {
		lastContextDependency = currentlyRenderingFiber$1 = null;
		resetHooksOnUnwind(unitOfWork);
		thenableState$1 = null;
		thenableIndexCounter$1 = 0;
		var returnFiber = unitOfWork.return;
		try {
			if (throwException(root, returnFiber, unitOfWork, thrownValue, workInProgressRootRenderLanes)) {
				workInProgressRootExitStatus = 1;
				logUncaughtError(root, createCapturedValueAtFiber(thrownValue, root.current));
				workInProgress = null;
				return;
			}
		} catch (error) {
			if (null !== returnFiber) throw workInProgress = returnFiber, error;
			workInProgressRootExitStatus = 1;
			logUncaughtError(root, createCapturedValueAtFiber(thrownValue, root.current));
			workInProgress = null;
			return;
		}
		if (unitOfWork.flags & 32768) {
			if (isHydrating || 1 === suspendedReason) root = !0;
			else if (workInProgressRootIsPrerendering || 0 !== (workInProgressRootRenderLanes & 536870912)) root = !1;
			else if (workInProgressRootDidSkipSuspendedSiblings = root = !0, 2 === suspendedReason || 9 === suspendedReason || 3 === suspendedReason || 6 === suspendedReason) suspendedReason = suspenseHandlerStackCursor.current, null !== suspendedReason && 13 === suspendedReason.tag && (suspendedReason.flags |= 16384);
			unwindUnitOfWork(unitOfWork, root);
		} else completeUnitOfWork(unitOfWork);
	}
	function completeUnitOfWork(unitOfWork) {
		var completedWork = unitOfWork;
		do {
			if (0 !== (completedWork.flags & 32768)) {
				unwindUnitOfWork(completedWork, workInProgressRootDidSkipSuspendedSiblings);
				return;
			}
			unitOfWork = completedWork.return;
			var next = completeWork(completedWork.alternate, completedWork, entangledRenderLanes);
			if (null !== next) {
				workInProgress = next;
				return;
			}
			completedWork = completedWork.sibling;
			if (null !== completedWork) {
				workInProgress = completedWork;
				return;
			}
			workInProgress = completedWork = unitOfWork;
		} while (null !== completedWork);
		0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 5);
	}
	function unwindUnitOfWork(unitOfWork, skipSiblings) {
		do {
			var next = unwindWork(unitOfWork.alternate, unitOfWork);
			if (null !== next) {
				next.flags &= 32767;
				workInProgress = next;
				return;
			}
			next = unitOfWork.return;
			null !== next && (next.flags |= 32768, next.subtreeFlags = 0, next.deletions = null);
			if (!skipSiblings && (unitOfWork = unitOfWork.sibling, null !== unitOfWork)) {
				workInProgress = unitOfWork;
				return;
			}
			workInProgress = unitOfWork = next;
		} while (null !== unitOfWork);
		workInProgressRootExitStatus = 6;
		workInProgress = null;
	}
	function completeRoot(root, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedState) {
		root.cancelPendingCommit = null;
		do
			flushPendingEffects();
		while (0 !== pendingEffectsStatus);
		if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
		if (null !== finishedWork) {
			if (finishedWork === root.current) throw Error(formatProdErrorMessage(177));
			root === workInProgressRoot && (workInProgress = workInProgressRoot = null, workInProgressRootRenderLanes = 0);
			pendingFinishedWork = finishedWork;
			pendingEffectsRoot = root;
			pendingEffectsLanes = lanes;
			pendingPassiveTransitions = transitions;
			pendingRecoverableErrors = recoverableErrors;
			commitRoot(root, finishedWork, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, suspendedState);
		}
	}
	function commitRoot(root, finishedWork, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, suspendedState) {
		var remainingLanes = finishedWork.lanes | finishedWork.childLanes;
		pendingEffectsRemainingLanes = remainingLanes;
		remainingLanes |= concurrentlyUpdatedLanes;
		markRootFinished(root, lanes, remainingLanes, spawnedLane, updatedLanes, suspendedRetryLanes);
		pendingViewTransitionEvents = null;
		(lanes & 335544064) === lanes ? (pendingTransitionTypes = claimQueuedTransitionTypes(root), spawnedLane = 10262) : (pendingTransitionTypes = null, spawnedLane = 10256);
		0 !== (finishedWork.subtreeFlags & spawnedLane) || 0 !== (finishedWork.flags & spawnedLane) ? (root.callbackNode = null, root.callbackPriority = 0, scheduleCallback$1(NormalPriority$1, function() {
			flushPassiveEffects();
			return null;
		})) : (root.callbackNode = null, root.callbackPriority = 0);
		shouldStartViewTransition = !1;
		spawnedLane = 0 !== (finishedWork.flags & 13878);
		if (0 !== (finishedWork.subtreeFlags & 13878) || spawnedLane) {
			spawnedLane = ReactSharedInternals.T;
			ReactSharedInternals.T = null;
			updatedLanes = ReactDOMSharedInternals.p;
			ReactDOMSharedInternals.p = 2;
			suspendedRetryLanes = executionContext;
			executionContext |= 4;
			try {
				commitBeforeMutationEffects(root, finishedWork, lanes);
			} finally {
				executionContext = suspendedRetryLanes, ReactDOMSharedInternals.p = updatedLanes, ReactSharedInternals.T = spawnedLane;
			}
		}
		pendingEffectsStatus = 1;
		shouldStartViewTransition ? pendingViewTransition = startViewTransition(suspendedState, root.containerInfo, pendingTransitionTypes, flushMutationEffects, flushLayoutEffects, flushAfterMutationEffects, flushSpawnedWork, flushPassiveEffects, reportViewTransitionError, null, null) : (flushMutationEffects(), flushLayoutEffects(), flushSpawnedWork());
	}
	function reportViewTransitionError(error) {
		if (0 !== pendingEffectsStatus) {
			var onRecoverableError = pendingEffectsRoot.onRecoverableError;
			onRecoverableError(error, { componentStack: null });
		}
	}
	function flushAfterMutationEffects() {
		3 === pendingEffectsStatus && (pendingEffectsStatus = 0, commitAfterMutationEffectsOnFiber(pendingFinishedWork, pendingEffectsRoot), pendingEffectsStatus = 4);
	}
	function flushMutationEffects() {
		if (1 === pendingEffectsStatus) {
			pendingEffectsStatus = 0;
			var root = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, rootMutationHasEffect = 0 !== (finishedWork.flags & 13878);
			if (0 !== (finishedWork.subtreeFlags & 13878) || rootMutationHasEffect) {
				rootMutationHasEffect = ReactSharedInternals.T;
				ReactSharedInternals.T = null;
				var previousPriority = ReactDOMSharedInternals.p;
				ReactDOMSharedInternals.p = 2;
				var prevExecutionContext = executionContext;
				executionContext |= 4;
				try {
					inUpdateViewTransition = rootViewTransitionAffected = !1;
					commitMutationEffectsOnFiber(finishedWork, root, lanes);
					lanes = selectionInformation;
					var curFocusedElem = getActiveElementDeep(root.containerInfo), priorFocusedElem = lanes.focusedElem, priorSelectionRange = lanes.selectionRange;
					if (curFocusedElem !== priorFocusedElem && priorFocusedElem && priorFocusedElem.ownerDocument && containsNode(priorFocusedElem.ownerDocument.documentElement, priorFocusedElem)) {
						if (null !== priorSelectionRange && hasSelectionCapabilities(priorFocusedElem)) {
							var start = priorSelectionRange.start, end = priorSelectionRange.end;
							void 0 === end && (end = start);
							if ("selectionStart" in priorFocusedElem) priorFocusedElem.selectionStart = start, priorFocusedElem.selectionEnd = Math.min(end, priorFocusedElem.value.length);
							else {
								var doc = priorFocusedElem.ownerDocument || document, win = doc && doc.defaultView || window;
								if (win.getSelection) {
									var selection = win.getSelection(), length = priorFocusedElem.textContent.length, start$jscomp$0 = Math.min(priorSelectionRange.start, length), end$jscomp$0 = void 0 === priorSelectionRange.end ? start$jscomp$0 : Math.min(priorSelectionRange.end, length);
									!selection.extend && start$jscomp$0 > end$jscomp$0 && (curFocusedElem = end$jscomp$0, end$jscomp$0 = start$jscomp$0, start$jscomp$0 = curFocusedElem);
									var startMarker = getNodeForCharacterOffset(priorFocusedElem, start$jscomp$0), endMarker = getNodeForCharacterOffset(priorFocusedElem, end$jscomp$0);
									if (startMarker && endMarker && (1 !== selection.rangeCount || selection.anchorNode !== startMarker.node || selection.anchorOffset !== startMarker.offset || selection.focusNode !== endMarker.node || selection.focusOffset !== endMarker.offset)) {
										var range = doc.createRange();
										range.setStart(startMarker.node, startMarker.offset);
										selection.removeAllRanges();
										start$jscomp$0 > end$jscomp$0 ? (selection.addRange(range), selection.extend(endMarker.node, endMarker.offset)) : (range.setEnd(endMarker.node, endMarker.offset), selection.addRange(range));
									}
								}
							}
						}
						doc = [];
						for (selection = priorFocusedElem; selection = selection.parentNode;) 1 === selection.nodeType && doc.push({
							element: selection,
							left: selection.scrollLeft,
							top: selection.scrollTop
						});
						"function" === typeof priorFocusedElem.focus && priorFocusedElem.focus();
						for (priorFocusedElem = 0; priorFocusedElem < doc.length; priorFocusedElem++) {
							var info = doc[priorFocusedElem];
							info.element.scrollLeft = info.left;
							info.element.scrollTop = info.top;
						}
					}
					_enabled = !!eventsEnabled;
					selectionInformation = eventsEnabled = null;
				} finally {
					executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootMutationHasEffect;
				}
			}
			root.current = finishedWork;
			pendingEffectsStatus = 2;
		}
	}
	function flushLayoutEffects() {
		if (2 === pendingEffectsStatus) {
			pendingEffectsStatus = 0;
			var root = pendingEffectsRoot, finishedWork = pendingFinishedWork, rootHasLayoutEffect = 0 !== (finishedWork.flags & 8772);
			if (0 !== (finishedWork.subtreeFlags & 8772) || rootHasLayoutEffect) {
				rootHasLayoutEffect = ReactSharedInternals.T;
				ReactSharedInternals.T = null;
				var previousPriority = ReactDOMSharedInternals.p;
				ReactDOMSharedInternals.p = 2;
				var prevExecutionContext = executionContext;
				executionContext |= 4;
				try {
					commitLayoutEffectOnFiber(root, finishedWork.alternate, finishedWork);
				} finally {
					executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootHasLayoutEffect;
				}
			}
			pendingEffectsStatus = 3;
		}
	}
	function flushSpawnedWork() {
		if (4 === pendingEffectsStatus || 3 === pendingEffectsStatus) {
			pendingEffectsStatus = 0;
			var committedViewTransition = pendingViewTransition;
			pendingViewTransition = null;
			requestPaint();
			var root = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, recoverableErrors = pendingRecoverableErrors, passiveSubtreeMask = (lanes & 335544064) === lanes ? 10262 : 10256;
			0 !== (finishedWork.subtreeFlags & passiveSubtreeMask) || 0 !== (finishedWork.flags & passiveSubtreeMask) ? pendingEffectsStatus = 5 : (pendingEffectsStatus = 0, pendingFinishedWork = pendingEffectsRoot = null, releaseRootPooledCache(root, root.pendingLanes));
			passiveSubtreeMask = root.pendingLanes;
			0 === passiveSubtreeMask && (legacyErrorBoundariesThatAlreadyFailed = null);
			lanesToEventPriority(lanes);
			finishedWork = finishedWork.stateNode;
			if (injectedHook && "function" === typeof injectedHook.onCommitFiberRoot) try {
				injectedHook.onCommitFiberRoot(rendererID, finishedWork, void 0, 128 === (finishedWork.current.flags & 128));
			} catch (err) {}
			if (null !== recoverableErrors) {
				finishedWork = ReactSharedInternals.T;
				passiveSubtreeMask = ReactDOMSharedInternals.p;
				ReactDOMSharedInternals.p = 2;
				ReactSharedInternals.T = null;
				try {
					for (var onRecoverableError = root.onRecoverableError, i = 0; i < recoverableErrors.length; i++) {
						var recoverableError = recoverableErrors[i];
						onRecoverableError(recoverableError.value, { componentStack: recoverableError.stack });
					}
				} finally {
					ReactSharedInternals.T = finishedWork, ReactDOMSharedInternals.p = passiveSubtreeMask;
				}
			}
			recoverableErrors = pendingViewTransitionEvents;
			onRecoverableError = pendingTransitionTypes;
			pendingTransitionTypes = null;
			if (null !== recoverableErrors && (pendingViewTransitionEvents = null, null === onRecoverableError && (onRecoverableError = []), null !== committedViewTransition)) for (recoverableError = 0; recoverableError < recoverableErrors.length; recoverableError++) finishedWork = (0, recoverableErrors[recoverableError])(onRecoverableError), void 0 !== finishedWork && committedViewTransition.finished.finally(finishedWork);
			0 !== (pendingEffectsLanes & 3) && flushPendingEffects();
			ensureRootIsScheduled(root);
			passiveSubtreeMask = root.pendingLanes;
			0 !== (lanes & 261930) && 0 !== (passiveSubtreeMask & 42) ? root === rootWithNestedUpdates ? nestedUpdateCount++ : (nestedUpdateCount = 0, rootWithNestedUpdates = root) : (nestedUpdateCount = 0, rootWithNestedUpdates = null);
			flushSyncWorkAcrossRoots_impl(0, !1);
		}
	}
	function releaseRootPooledCache(root, remainingLanes) {
		0 === (root.pooledCacheLanes &= remainingLanes) && (remainingLanes = root.pooledCache, null != remainingLanes && (root.pooledCache = null, releaseCache(remainingLanes)));
	}
	function flushPendingEffects() {
		null !== pendingViewTransition && (pendingViewTransition.skipTransition(), pendingViewTransition = null);
		flushMutationEffects();
		flushLayoutEffects();
		flushSpawnedWork();
		return flushPassiveEffects();
	}
	function flushPassiveEffects() {
		if (5 !== pendingEffectsStatus) return !1;
		var root = pendingEffectsRoot, remainingLanes = pendingEffectsRemainingLanes;
		pendingEffectsRemainingLanes = 0;
		var renderPriority = lanesToEventPriority(pendingEffectsLanes), prevTransition = ReactSharedInternals.T, previousPriority = ReactDOMSharedInternals.p;
		try {
			ReactDOMSharedInternals.p = 32 > renderPriority ? 32 : renderPriority;
			ReactSharedInternals.T = null;
			renderPriority = pendingPassiveTransitions;
			pendingPassiveTransitions = null;
			var root$jscomp$0 = pendingEffectsRoot, lanes = pendingEffectsLanes;
			pendingEffectsStatus = 0;
			pendingFinishedWork = pendingEffectsRoot = null;
			pendingEffectsLanes = 0;
			if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(331));
			var prevExecutionContext = executionContext;
			executionContext |= 4;
			commitPassiveUnmountOnFiber(root$jscomp$0.current);
			commitPassiveMountOnFiber(root$jscomp$0, root$jscomp$0.current, lanes, renderPriority);
			executionContext = prevExecutionContext;
			flushSyncWorkAcrossRoots_impl(0, !1);
			if (injectedHook && "function" === typeof injectedHook.onPostCommitFiberRoot) try {
				injectedHook.onPostCommitFiberRoot(rendererID, root$jscomp$0);
			} catch (err) {}
			return !0;
		} finally {
			ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition, releaseRootPooledCache(root, remainingLanes);
		}
	}
	function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
		sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
		sourceFiber = createRootErrorUpdate(rootFiber.stateNode, sourceFiber, 2);
		rootFiber = enqueueUpdate(rootFiber, sourceFiber, 2);
		null !== rootFiber && (markRootUpdated$1(rootFiber, 2), ensureRootIsScheduled(rootFiber));
	}
	function captureCommitPhaseError(sourceFiber, nearestMountedAncestor, error) {
		if (3 === sourceFiber.tag) captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
		else for (; null !== nearestMountedAncestor;) {
			if (3 === nearestMountedAncestor.tag) {
				captureCommitPhaseErrorOnRoot(nearestMountedAncestor, sourceFiber, error);
				break;
			} else if (1 === nearestMountedAncestor.tag) {
				var instance = nearestMountedAncestor.stateNode;
				if ("function" === typeof nearestMountedAncestor.type.getDerivedStateFromError || "function" === typeof instance.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(instance))) {
					sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
					error = createClassErrorUpdate(2);
					instance = enqueueUpdate(nearestMountedAncestor, error, 2);
					null !== instance && (initializeClassErrorUpdate(error, instance, nearestMountedAncestor, sourceFiber), markRootUpdated$1(instance, 2), ensureRootIsScheduled(instance));
					break;
				}
			}
			nearestMountedAncestor = nearestMountedAncestor.return;
		}
	}
	function attachPingListener(root, wakeable, lanes) {
		var pingCache = root.pingCache;
		if (null === pingCache) {
			pingCache = root.pingCache = new PossiblyWeakMap();
			var threadIDs = /* @__PURE__ */ new Set();
			pingCache.set(wakeable, threadIDs);
		} else threadIDs = pingCache.get(wakeable), void 0 === threadIDs && (threadIDs = /* @__PURE__ */ new Set(), pingCache.set(wakeable, threadIDs));
		threadIDs.has(lanes) || (workInProgressRootDidAttachPingListener = !0, threadIDs.add(lanes), root = pingSuspendedRoot.bind(null, root, wakeable, lanes), wakeable.then(root, root));
	}
	function pingSuspendedRoot(root, wakeable, pingedLanes) {
		var pingCache = root.pingCache;
		null !== pingCache && pingCache.delete(wakeable);
		root.pingedLanes |= root.suspendedLanes & pingedLanes;
		root.warmLanes &= ~pingedLanes;
		workInProgressRoot === root && (workInProgressRootRenderLanes & pingedLanes) === pingedLanes && (4 === workInProgressRootExitStatus || 3 === workInProgressRootExitStatus && (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes && 300 > now() - globalMostRecentFallbackTime ? 0 === (executionContext & 2) ? prepareFreshStack(root, 0) : workInProgressRootPingedLanes |= pingedLanes : workInProgressRootPingedLanes |= pingedLanes, workInProgressSuspendedRetryLanes === workInProgressRootRenderLanes && (workInProgressSuspendedRetryLanes = 0));
		ensureRootIsScheduled(root);
	}
	function retryTimedOutBoundary(boundaryFiber, retryLane) {
		0 === retryLane && (retryLane = claimNextRetryLane());
		boundaryFiber = enqueueConcurrentRenderForLane(boundaryFiber, retryLane);
		null !== boundaryFiber && (markRootUpdated$1(boundaryFiber, retryLane), ensureRootIsScheduled(boundaryFiber));
	}
	function retryDehydratedSuspenseBoundary(boundaryFiber) {
		var suspenseState = boundaryFiber.memoizedState, retryLane = 0;
		null !== suspenseState && (retryLane = suspenseState.retryLane);
		retryTimedOutBoundary(boundaryFiber, retryLane);
	}
	function resolveRetryWakeable(boundaryFiber, wakeable) {
		var retryLane = 0;
		switch (boundaryFiber.tag) {
			case 31:
			case 13:
				var retryCache = boundaryFiber.stateNode;
				var suspenseState = boundaryFiber.memoizedState;
				null !== suspenseState && (retryLane = suspenseState.retryLane);
				break;
			case 19:
				retryCache = boundaryFiber.stateNode;
				break;
			case 22:
				retryCache = boundaryFiber.stateNode._retryCache;
				break;
			default: throw Error(formatProdErrorMessage(314));
		}
		null !== retryCache && retryCache.delete(wakeable);
		retryTimedOutBoundary(boundaryFiber, retryLane);
	}
	function scheduleCallback$1(priorityLevel, callback) {
		return scheduleCallback$3(priorityLevel, callback);
	}
	var firstScheduledRoot = null;
	var lastScheduledRoot = null;
	var didScheduleMicrotask = !1;
	var mightHavePendingSyncWork = !1;
	var isFlushingWork = !1;
	var currentEventTransitionLane = 0;
	function ensureRootIsScheduled(root) {
		root !== lastScheduledRoot && null === root.next && (null === lastScheduledRoot ? firstScheduledRoot = lastScheduledRoot = root : lastScheduledRoot = lastScheduledRoot.next = root);
		mightHavePendingSyncWork = !0;
		didScheduleMicrotask || (didScheduleMicrotask = !0, scheduleImmediateRootScheduleTask());
	}
	function flushSyncWorkAcrossRoots_impl(syncTransitionLanes, onlyLegacy) {
		if (!isFlushingWork && mightHavePendingSyncWork) {
			isFlushingWork = !0;
			do {
				var didPerformSomeWork = !1;
				for (var root$190 = firstScheduledRoot; null !== root$190;) {
					if (!onlyLegacy) if (0 !== syncTransitionLanes) {
						var pendingLanes = root$190.pendingLanes;
						if (0 === pendingLanes) var JSCompiler_inline_result = 0;
						else {
							var suspendedLanes = root$190.suspendedLanes, pingedLanes = root$190.pingedLanes;
							JSCompiler_inline_result = (1 << 31 - clz32(42 | syncTransitionLanes) + 1) - 1;
							JSCompiler_inline_result &= pendingLanes & ~(suspendedLanes & ~pingedLanes);
							JSCompiler_inline_result = JSCompiler_inline_result & 201326741 ? JSCompiler_inline_result & 201326741 | 1 : JSCompiler_inline_result ? JSCompiler_inline_result | 2 : 0;
						}
						0 !== JSCompiler_inline_result && (didPerformSomeWork = !0, performSyncWorkOnRoot(root$190, JSCompiler_inline_result));
					} else JSCompiler_inline_result = workInProgressRootRenderLanes, JSCompiler_inline_result = getNextLanes(root$190, root$190 === workInProgressRoot ? JSCompiler_inline_result : 0, null !== root$190.cancelPendingCommit || -1 !== root$190.timeoutHandle), 0 === (JSCompiler_inline_result & 3) || checkIfRootIsPrerendering(root$190, JSCompiler_inline_result) || (didPerformSomeWork = !0, performSyncWorkOnRoot(root$190, JSCompiler_inline_result));
					root$190 = root$190.next;
				}
			} while (didPerformSomeWork);
			isFlushingWork = !1;
		}
	}
	function processRootScheduleInImmediateTask() {
		processRootScheduleInMicrotask();
	}
	function processRootScheduleInMicrotask() {
		mightHavePendingSyncWork = didScheduleMicrotask = !1;
		var syncTransitionLanes = 0;
		0 !== currentEventTransitionLane && shouldAttemptEagerTransition() && (syncTransitionLanes = currentEventTransitionLane);
		for (var currentTime = now(), prev = null, root = firstScheduledRoot; null !== root;) {
			var next = root.next, nextLanes = scheduleTaskForRootDuringMicrotask(root, currentTime);
			if (0 === nextLanes) root.next = null, null === prev ? firstScheduledRoot = next : prev.next = next, null === next && (lastScheduledRoot = prev);
			else if (prev = root, 0 !== syncTransitionLanes || 0 !== (nextLanes & 3)) mightHavePendingSyncWork = !0;
			root = next;
		}
		0 !== pendingEffectsStatus && 5 !== pendingEffectsStatus || flushSyncWorkAcrossRoots_impl(syncTransitionLanes, !1);
		0 !== currentEventTransitionLane && (currentEventTransitionLane = 0);
	}
	function scheduleTaskForRootDuringMicrotask(root, currentTime) {
		for (var suspendedLanes = root.suspendedLanes, pingedLanes = root.pingedLanes, expirationTimes = root.expirationTimes, lanes = root.pendingLanes & -62914561; 0 < lanes;) {
			var index$5 = 31 - clz32(lanes), lane = 1 << index$5, expirationTime = expirationTimes[index$5];
			if (-1 === expirationTime) {
				if (0 === (lane & suspendedLanes) || 0 !== (lane & pingedLanes)) expirationTimes[index$5] = computeExpirationTime(lane, currentTime);
			} else expirationTime <= currentTime && (root.expiredLanes |= lane);
			lanes &= ~lane;
		}
		currentTime = workInProgressRoot;
		suspendedLanes = workInProgressRootRenderLanes;
		suspendedLanes = getNextLanes(root, root === currentTime ? suspendedLanes : 0, null !== root.cancelPendingCommit || -1 !== root.timeoutHandle);
		pingedLanes = root.callbackNode;
		if (0 === suspendedLanes || root === currentTime && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || null !== root.cancelPendingCommit) return null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes), root.callbackNode = null, root.callbackPriority = 0;
		if (0 === (suspendedLanes & 3) || checkIfRootIsPrerendering(root, suspendedLanes)) {
			currentTime = suspendedLanes & -suspendedLanes;
			if (currentTime === root.callbackPriority) return currentTime;
			null !== pingedLanes && cancelCallback$1(pingedLanes);
			switch (lanesToEventPriority(suspendedLanes)) {
				case 2:
				case 8:
					suspendedLanes = UserBlockingPriority;
					break;
				case 32:
					suspendedLanes = NormalPriority$1;
					break;
				case 268435456:
					suspendedLanes = IdlePriority;
					break;
				default: suspendedLanes = NormalPriority$1;
			}
			pingedLanes = performWorkOnRootViaSchedulerTask.bind(null, root);
			suspendedLanes = scheduleCallback$3(suspendedLanes, pingedLanes);
			root.callbackPriority = currentTime;
			root.callbackNode = suspendedLanes;
			return currentTime;
		}
		null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes);
		root.callbackPriority = 2;
		root.callbackNode = null;
		return 2;
	}
	function performWorkOnRootViaSchedulerTask(root, didTimeout) {
		if (0 !== pendingEffectsStatus && 5 !== pendingEffectsStatus) return root.callbackNode = null, root.callbackPriority = 0, null;
		var originalCallbackNode = root.callbackNode;
		if (flushPendingEffects() && root.callbackNode !== originalCallbackNode) return null;
		var workInProgressRootRenderLanes$jscomp$0 = workInProgressRootRenderLanes;
		workInProgressRootRenderLanes$jscomp$0 = getNextLanes(root, root === workInProgressRoot ? workInProgressRootRenderLanes$jscomp$0 : 0, null !== root.cancelPendingCommit || -1 !== root.timeoutHandle);
		if (0 === workInProgressRootRenderLanes$jscomp$0) return null;
		performWorkOnRoot(root, workInProgressRootRenderLanes$jscomp$0, didTimeout);
		scheduleTaskForRootDuringMicrotask(root, now());
		return null != root.callbackNode && root.callbackNode === originalCallbackNode ? performWorkOnRootViaSchedulerTask.bind(null, root) : null;
	}
	function performSyncWorkOnRoot(root, lanes) {
		if (flushPendingEffects()) return null;
		performWorkOnRoot(root, lanes, !0);
	}
	function scheduleImmediateRootScheduleTask() {
		scheduleMicrotask(function() {
			0 !== (executionContext & 6) ? scheduleCallback$3(ImmediatePriority, processRootScheduleInImmediateTask) : processRootScheduleInMicrotask();
		});
	}
	function requestTransitionLane() {
		if (0 === currentEventTransitionLane) {
			var actionScopeLane = currentEntangledLane;
			0 === actionScopeLane && (actionScopeLane = nextTransitionUpdateLane, nextTransitionUpdateLane <<= 1, 0 === (nextTransitionUpdateLane & 261888) && (nextTransitionUpdateLane = 256));
			currentEventTransitionLane = actionScopeLane;
		}
		return currentEventTransitionLane;
	}
	function coerceFormActionProp(actionProp) {
		return null == actionProp || "symbol" === typeof actionProp || "boolean" === typeof actionProp ? null : "function" === typeof actionProp ? actionProp : sanitizeURL(actionProp);
	}
	function extractEvents$1(dispatchQueue, domEventName, maybeTargetInst, nativeEvent, nativeEventTarget) {
		if ("submit" === domEventName && maybeTargetInst && maybeTargetInst.stateNode === nativeEventTarget) {
			var action = coerceFormActionProp((nativeEventTarget[internalPropsKey] || null).action), submitter = nativeEvent.submitter;
			submitter && (domEventName = (domEventName = submitter[internalPropsKey] || null) ? coerceFormActionProp(domEventName.formAction) : submitter.getAttribute("formAction"), null !== domEventName && (action = domEventName, submitter = null));
			var event = new SyntheticEvent("action", "action", null, nativeEvent, nativeEventTarget);
			dispatchQueue.push({
				event,
				listeners: [{
					instance: null,
					listener: function() {
						if (nativeEvent.defaultPrevented) {
							if (0 !== currentEventTransitionLane) {
								var formData = new FormData(nativeEventTarget, submitter);
								startHostTransition(maybeTargetInst, {
									pending: !0,
									data: formData,
									method: nativeEventTarget.method,
									action
								}, null, formData);
							}
						} else "function" === typeof action && (event.preventDefault(), formData = new FormData(nativeEventTarget, submitter), startHostTransition(maybeTargetInst, {
							pending: !0,
							data: formData,
							method: nativeEventTarget.method,
							action
						}, action, formData));
					},
					currentTarget: nativeEventTarget
				}]
			});
		}
	}
	for (var i$jscomp$inline_1667 = 0; i$jscomp$inline_1667 < simpleEventPluginEvents.length; i$jscomp$inline_1667++) {
		var eventName$jscomp$inline_1668 = simpleEventPluginEvents[i$jscomp$inline_1667];
		registerSimpleEvent(eventName$jscomp$inline_1668.toLowerCase(), "on" + (eventName$jscomp$inline_1668[0].toUpperCase() + eventName$jscomp$inline_1668.slice(1)));
	}
	registerSimpleEvent(ANIMATION_END, "onAnimationEnd");
	registerSimpleEvent(ANIMATION_ITERATION, "onAnimationIteration");
	registerSimpleEvent(ANIMATION_START, "onAnimationStart");
	registerSimpleEvent("dblclick", "onDoubleClick");
	registerSimpleEvent("focusin", "onFocus");
	registerSimpleEvent("focusout", "onBlur");
	registerSimpleEvent(TRANSITION_RUN, "onTransitionRun");
	registerSimpleEvent(TRANSITION_START, "onTransitionStart");
	registerSimpleEvent(TRANSITION_CANCEL, "onTransitionCancel");
	registerSimpleEvent(TRANSITION_END, "onTransitionEnd");
	registerDirectEvent("onMouseEnter", ["mouseout", "mouseover"]);
	registerDirectEvent("onMouseLeave", ["mouseout", "mouseover"]);
	registerDirectEvent("onPointerEnter", ["pointerout", "pointerover"]);
	registerDirectEvent("onPointerLeave", ["pointerout", "pointerover"]);
	registerTwoPhaseEvent("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
	registerTwoPhaseEvent("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
	registerTwoPhaseEvent("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]);
	registerTwoPhaseEvent("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
	registerTwoPhaseEvent("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
	registerTwoPhaseEvent("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var mediaEventTypes = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
	var nonDelegatedEvents = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(mediaEventTypes));
	function processDispatchQueue(dispatchQueue, eventSystemFlags) {
		eventSystemFlags = 0 !== (eventSystemFlags & 4);
		for (var i = 0; i < dispatchQueue.length; i++) {
			var _dispatchQueue$i = dispatchQueue[i], event = _dispatchQueue$i.event;
			_dispatchQueue$i = _dispatchQueue$i.listeners;
			a: {
				var previousInstance = void 0;
				if (eventSystemFlags) for (var i$jscomp$0 = _dispatchQueue$i.length - 1; 0 <= i$jscomp$0; i$jscomp$0--) {
					var _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0], instance = _dispatchListeners$i.instance, currentTarget = _dispatchListeners$i.currentTarget;
					_dispatchListeners$i = _dispatchListeners$i.listener;
					if (instance !== previousInstance && event.isPropagationStopped()) break a;
					previousInstance = _dispatchListeners$i;
					event.currentTarget = currentTarget;
					try {
						previousInstance(event);
					} catch (error) {
						reportGlobalError(error);
					}
					event.currentTarget = null;
					previousInstance = instance;
				}
				else for (i$jscomp$0 = 0; i$jscomp$0 < _dispatchQueue$i.length; i$jscomp$0++) {
					_dispatchListeners$i = _dispatchQueue$i[i$jscomp$0];
					instance = _dispatchListeners$i.instance;
					currentTarget = _dispatchListeners$i.currentTarget;
					_dispatchListeners$i = _dispatchListeners$i.listener;
					if (instance !== previousInstance && event.isPropagationStopped()) break a;
					previousInstance = _dispatchListeners$i;
					event.currentTarget = currentTarget;
					try {
						previousInstance(event);
					} catch (error) {
						reportGlobalError(error);
					}
					event.currentTarget = null;
					previousInstance = instance;
				}
			}
		}
	}
	function listenToNonDelegatedEvent(domEventName, targetElement) {
		var JSCompiler_inline_result = targetElement[internalEventHandlersKey];
		void 0 === JSCompiler_inline_result && (JSCompiler_inline_result = targetElement[internalEventHandlersKey] = /* @__PURE__ */ new Set());
		var listenerSetKey = domEventName + "__bubble";
		JSCompiler_inline_result.has(listenerSetKey) || (addTrappedEventListener(targetElement, domEventName, 2, !1), JSCompiler_inline_result.add(listenerSetKey));
	}
	function listenToNativeEvent(domEventName, isCapturePhaseListener, target) {
		var eventSystemFlags = 0;
		isCapturePhaseListener && (eventSystemFlags |= 4);
		addTrappedEventListener(target, domEventName, eventSystemFlags, isCapturePhaseListener);
	}
	var listeningMarker = "_reactListening" + Math.random().toString(36).slice(2);
	function listenToAllSupportedEvents(rootContainerElement) {
		if (!rootContainerElement[listeningMarker]) {
			rootContainerElement[listeningMarker] = !0;
			allNativeEvents.forEach(function(domEventName) {
				"selectionchange" !== domEventName && (nonDelegatedEvents.has(domEventName) || listenToNativeEvent(domEventName, !1, rootContainerElement), listenToNativeEvent(domEventName, !0, rootContainerElement));
			});
			var ownerDocument = 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
			null === ownerDocument || ownerDocument[listeningMarker] || (ownerDocument[listeningMarker] = !0, listenToNativeEvent("selectionchange", !1, ownerDocument));
		}
	}
	function addTrappedEventListener(targetContainer, domEventName, eventSystemFlags, isCapturePhaseListener) {
		switch (getEventPriority(domEventName)) {
			case 2:
				var listenerWrapper = dispatchDiscreteEvent;
				break;
			case 8:
				listenerWrapper = dispatchContinuousEvent;
				break;
			default: listenerWrapper = dispatchEvent;
		}
		eventSystemFlags = listenerWrapper.bind(null, domEventName, eventSystemFlags, targetContainer);
		listenerWrapper = void 0;
		!passiveBrowserEventsSupported || "touchstart" !== domEventName && "touchmove" !== domEventName && "wheel" !== domEventName || (listenerWrapper = !0);
		isCapturePhaseListener ? void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
			capture: !0,
			passive: listenerWrapper
		}) : targetContainer.addEventListener(domEventName, eventSystemFlags, !0) : void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, { passive: listenerWrapper }) : targetContainer.addEventListener(domEventName, eventSystemFlags, !1);
	}
	function dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, targetInst$jscomp$0, targetContainer) {
		var ancestorInst = targetInst$jscomp$0;
		if (0 === (eventSystemFlags & 1) && 0 === (eventSystemFlags & 2) && null !== targetInst$jscomp$0) a: for (;;) {
			if (null === targetInst$jscomp$0) return;
			var nodeTag = targetInst$jscomp$0.tag;
			if (3 === nodeTag || 4 === nodeTag) {
				var container = targetInst$jscomp$0.stateNode.containerInfo;
				if (container === targetContainer) break;
				if (4 === nodeTag) for (nodeTag = targetInst$jscomp$0.return; null !== nodeTag;) {
					var grandTag = nodeTag.tag;
					if ((3 === grandTag || 4 === grandTag) && nodeTag.stateNode.containerInfo === targetContainer) return;
					nodeTag = nodeTag.return;
				}
				for (; null !== container;) {
					nodeTag = getClosestInstanceFromNode(container);
					if (null === nodeTag) return;
					grandTag = nodeTag.tag;
					if (5 === grandTag || 6 === grandTag || 26 === grandTag || 27 === grandTag) {
						targetInst$jscomp$0 = ancestorInst = nodeTag;
						continue a;
					}
					container = container.parentNode;
				}
			}
			targetInst$jscomp$0 = targetInst$jscomp$0.return;
		}
		batchedUpdates$1(function() {
			var targetInst = ancestorInst, nativeEventTarget = getEventTarget(nativeEvent), dispatchQueue = [];
			a: {
				var reactName = topLevelEventsToReactNames.get(domEventName);
				if (void 0 !== reactName) {
					var SyntheticEventCtor = SyntheticEvent, reactEventType = domEventName;
					switch (domEventName) {
						case "keypress": if (0 === getEventCharCode(nativeEvent)) break a;
						case "keydown":
						case "keyup":
							SyntheticEventCtor = SyntheticKeyboardEvent;
							break;
						case "focusin":
							reactEventType = "focus";
							SyntheticEventCtor = SyntheticFocusEvent;
							break;
						case "focusout":
							reactEventType = "blur";
							SyntheticEventCtor = SyntheticFocusEvent;
							break;
						case "beforeblur":
						case "afterblur":
							SyntheticEventCtor = SyntheticFocusEvent;
							break;
						case "click": if (2 === nativeEvent.button) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							SyntheticEventCtor = SyntheticMouseEvent;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							SyntheticEventCtor = SyntheticDragEvent;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							SyntheticEventCtor = SyntheticTouchEvent;
							break;
						case ANIMATION_END:
						case ANIMATION_ITERATION:
						case ANIMATION_START:
							SyntheticEventCtor = SyntheticAnimationEvent;
							break;
						case TRANSITION_END:
							SyntheticEventCtor = SyntheticTransitionEvent;
							break;
						case "scroll":
						case "scrollend":
							SyntheticEventCtor = SyntheticUIEvent;
							break;
						case "wheel":
							SyntheticEventCtor = SyntheticWheelEvent;
							break;
						case "copy":
						case "cut":
						case "paste":
							SyntheticEventCtor = SyntheticClipboardEvent;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							SyntheticEventCtor = SyntheticPointerEvent;
							break;
						case "submit":
							SyntheticEventCtor = SyntheticSubmitEvent;
							break;
						case "toggle":
						case "beforetoggle": SyntheticEventCtor = SyntheticToggleEvent;
					}
					var inCapturePhase = 0 !== (eventSystemFlags & 4), accumulateTargetOnly = !inCapturePhase && ("scroll" === domEventName || "scrollend" === domEventName), reactEventName = inCapturePhase ? null !== reactName ? reactName + "Capture" : null : reactName;
					inCapturePhase = [];
					for (var instance = targetInst, lastHostComponent; null !== instance;) {
						var _instance = instance;
						lastHostComponent = _instance.stateNode;
						_instance = _instance.tag;
						5 !== _instance && 26 !== _instance && 27 !== _instance || null === lastHostComponent || null === reactEventName || (_instance = getListener(instance, reactEventName), null != _instance && inCapturePhase.push(createDispatchListener(instance, _instance, lastHostComponent)));
						if (accumulateTargetOnly) break;
						instance = instance.return;
					}
					0 < inCapturePhase.length && (reactName = new SyntheticEventCtor(reactName, reactEventType, null, nativeEvent, nativeEventTarget), dispatchQueue.push({
						event: reactName,
						listeners: inCapturePhase
					}));
				}
			}
			if (0 === (eventSystemFlags & 7)) {
				a: {
					SyntheticEventCtor = "mouseover" === domEventName || "pointerover" === domEventName;
					reactName = "mouseout" === domEventName || "pointerout" === domEventName;
					if (SyntheticEventCtor && nativeEvent !== currentReplayingEvent && (reactEventType = nativeEvent.relatedTarget || nativeEvent.fromElement) && (getClosestInstanceFromNode(reactEventType) || reactEventType[internalContainerInstanceKey])) break a;
					if (reactName || SyntheticEventCtor) {
						reactEventType = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget : (SyntheticEventCtor = nativeEventTarget.ownerDocument) ? SyntheticEventCtor.defaultView || SyntheticEventCtor.parentWindow : window;
						if (reactName) {
							if (SyntheticEventCtor = nativeEvent.relatedTarget || nativeEvent.toElement, reactName = targetInst, SyntheticEventCtor = SyntheticEventCtor ? getClosestInstanceFromNode(SyntheticEventCtor) : null, null !== SyntheticEventCtor && (accumulateTargetOnly = getNearestMountedFiber(SyntheticEventCtor), inCapturePhase = SyntheticEventCtor.tag, SyntheticEventCtor !== accumulateTargetOnly || 5 !== inCapturePhase && 27 !== inCapturePhase && 6 !== inCapturePhase)) SyntheticEventCtor = null;
						} else reactName = null, SyntheticEventCtor = targetInst;
						if (reactName !== SyntheticEventCtor) {
							inCapturePhase = SyntheticMouseEvent;
							_instance = "onMouseLeave";
							reactEventName = "onMouseEnter";
							instance = "mouse";
							if ("pointerout" === domEventName || "pointerover" === domEventName) inCapturePhase = SyntheticPointerEvent, _instance = "onPointerLeave", reactEventName = "onPointerEnter", instance = "pointer";
							accumulateTargetOnly = null == reactName ? reactEventType : getNodeFromInstance(reactName);
							lastHostComponent = null == SyntheticEventCtor ? reactEventType : getNodeFromInstance(SyntheticEventCtor);
							reactEventType = new inCapturePhase(_instance, instance + "leave", reactName, nativeEvent, nativeEventTarget);
							reactEventType.target = accumulateTargetOnly;
							reactEventType.relatedTarget = lastHostComponent;
							_instance = null;
							getClosestInstanceFromNode(nativeEventTarget) === targetInst && (inCapturePhase = new inCapturePhase(reactEventName, instance + "enter", SyntheticEventCtor, nativeEvent, nativeEventTarget), inCapturePhase.target = lastHostComponent, inCapturePhase.relatedTarget = accumulateTargetOnly, _instance = inCapturePhase);
							accumulateTargetOnly = _instance;
							inCapturePhase = reactName && SyntheticEventCtor ? getLowestCommonAncestor(reactName, SyntheticEventCtor, getParent) : null;
							null !== reactName && accumulateEnterLeaveListenersForEvent(dispatchQueue, reactEventType, reactName, inCapturePhase, !1);
							null !== SyntheticEventCtor && null !== accumulateTargetOnly && accumulateEnterLeaveListenersForEvent(dispatchQueue, accumulateTargetOnly, SyntheticEventCtor, inCapturePhase, !0);
						}
					}
				}
				a: {
					reactName = targetInst ? getNodeFromInstance(targetInst) : window;
					SyntheticEventCtor = reactName.nodeName && reactName.nodeName.toLowerCase();
					if ("select" === SyntheticEventCtor || "input" === SyntheticEventCtor && "file" === reactName.type) var getTargetInstFunc = getTargetInstForChangeEvent;
					else if (isTextInputElement(reactName)) if (isInputEventSupported) getTargetInstFunc = getTargetInstForInputOrChangeEvent;
					else {
						getTargetInstFunc = getTargetInstForInputEventPolyfill;
						var handleEventFunc = handleEventsForInputEventPolyfill;
					}
					else SyntheticEventCtor = reactName.nodeName, !SyntheticEventCtor || "input" !== SyntheticEventCtor.toLowerCase() || "checkbox" !== reactName.type && "radio" !== reactName.type ? targetInst && isCustomElement(targetInst.elementType) && (getTargetInstFunc = getTargetInstForChangeEvent) : getTargetInstFunc = getTargetInstForClickEvent;
					if (getTargetInstFunc && (getTargetInstFunc = getTargetInstFunc(domEventName, targetInst))) {
						createAndAccumulateChangeEvent(dispatchQueue, getTargetInstFunc, nativeEvent, nativeEventTarget);
						break a;
					}
					handleEventFunc && handleEventFunc(domEventName, reactName, targetInst);
				}
				handleEventFunc = targetInst ? getNodeFromInstance(targetInst) : window;
				switch (domEventName) {
					case "focusin":
						if (isTextInputElement(handleEventFunc) || "true" === handleEventFunc.contentEditable) activeElement = handleEventFunc, activeElementInst = targetInst, lastSelection = null;
						break;
					case "focusout":
						lastSelection = activeElementInst = activeElement = null;
						break;
					case "mousedown":
						mouseDown = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						mouseDown = !1;
						constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
						break;
					case "selectionchange": if (skipSelectionChangeEvent) break;
					case "keydown":
					case "keyup": constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
				}
				var fallbackData;
				if (canUseCompositionEvent) b: {
					switch (domEventName) {
						case "compositionstart":
							var eventType = "onCompositionStart";
							break b;
						case "compositionend":
							eventType = "onCompositionEnd";
							break b;
						case "compositionupdate":
							eventType = "onCompositionUpdate";
							break b;
					}
					eventType = void 0;
				}
				else isComposing ? isFallbackCompositionEnd(domEventName, nativeEvent) && (eventType = "onCompositionEnd") : "keydown" === domEventName && 229 === nativeEvent.keyCode && (eventType = "onCompositionStart");
				eventType && (useFallbackCompositionData && "ko" !== nativeEvent.locale && (isComposing || "onCompositionStart" !== eventType ? "onCompositionEnd" === eventType && isComposing && (fallbackData = getData()) : (root = nativeEventTarget, startText = "value" in root ? root.value : root.textContent, isComposing = !0)), handleEventFunc = accumulateTwoPhaseListeners(targetInst, eventType), 0 < handleEventFunc.length && (eventType = new SyntheticCompositionEvent(eventType, domEventName, null, nativeEvent, nativeEventTarget), dispatchQueue.push({
					event: eventType,
					listeners: handleEventFunc
				}), fallbackData ? eventType.data = fallbackData : (fallbackData = getDataFromCustomEvent(nativeEvent), null !== fallbackData && (eventType.data = fallbackData))));
				if (fallbackData = canUseTextInputEvent ? getNativeBeforeInputChars(domEventName, nativeEvent) : getFallbackBeforeInputChars(domEventName, nativeEvent)) eventType = accumulateTwoPhaseListeners(targetInst, "onBeforeInput"), 0 < eventType.length && (handleEventFunc = new SyntheticCompositionEvent("onBeforeInput", "beforeinput", null, nativeEvent, nativeEventTarget), dispatchQueue.push({
					event: handleEventFunc,
					listeners: eventType
				}), handleEventFunc.data = fallbackData);
				extractEvents$1(dispatchQueue, domEventName, targetInst, nativeEvent, nativeEventTarget);
			}
			processDispatchQueue(dispatchQueue, eventSystemFlags);
		});
	}
	function createDispatchListener(instance, listener, currentTarget) {
		return {
			instance,
			listener,
			currentTarget
		};
	}
	function accumulateTwoPhaseListeners(targetFiber, reactName) {
		for (var captureName = reactName + "Capture", listeners = []; null !== targetFiber;) {
			var _instance2 = targetFiber, stateNode = _instance2.stateNode;
			_instance2 = _instance2.tag;
			5 !== _instance2 && 26 !== _instance2 && 27 !== _instance2 || null === stateNode || (_instance2 = getListener(targetFiber, captureName), null != _instance2 && listeners.unshift(createDispatchListener(targetFiber, _instance2, stateNode)), _instance2 = getListener(targetFiber, reactName), null != _instance2 && listeners.push(createDispatchListener(targetFiber, _instance2, stateNode)));
			if (3 === targetFiber.tag) return listeners;
			targetFiber = targetFiber.return;
		}
		return [];
	}
	function getParent(inst) {
		if (null === inst) return null;
		do
			inst = inst.return;
		while (inst && 5 !== inst.tag && 27 !== inst.tag);
		return inst ? inst : null;
	}
	function accumulateEnterLeaveListenersForEvent(dispatchQueue, event, target, common, inCapturePhase) {
		for (var registrationName = event._reactName, listeners = []; null !== target && target !== common;) {
			var _instance3 = target, alternate = _instance3.alternate, stateNode = _instance3.stateNode;
			_instance3 = _instance3.tag;
			if (null !== alternate && alternate === common) break;
			5 !== _instance3 && 26 !== _instance3 && 27 !== _instance3 || null === stateNode || (alternate = stateNode, inCapturePhase ? (stateNode = getListener(target, registrationName), null != stateNode && listeners.unshift(createDispatchListener(target, stateNode, alternate))) : inCapturePhase || (stateNode = getListener(target, registrationName), null != stateNode && listeners.push(createDispatchListener(target, stateNode, alternate))));
			target = target.return;
		}
		0 !== listeners.length && dispatchQueue.push({
			event,
			listeners
		});
	}
	var NORMALIZE_NEWLINES_REGEX = /\r\n?/g;
	var NORMALIZE_NULL_AND_REPLACEMENT_REGEX = /\u0000|\uFFFD/g;
	function normalizeMarkupForTextOrAttribute(markup) {
		return ("string" === typeof markup ? markup : "" + markup).replace(NORMALIZE_NEWLINES_REGEX, "\n").replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX, "");
	}
	function checkForUnmatchedText(serverText, clientText) {
		clientText = normalizeMarkupForTextOrAttribute(clientText);
		return normalizeMarkupForTextOrAttribute(serverText) === clientText ? !0 : !1;
	}
	function setProp(domElement, tag, key, value, props, prevValue) {
		switch (key) {
			case "children":
				if ("string" === typeof value) "body" === tag || "textarea" === tag && "" === value || setTextContent(domElement, value);
				else if ("number" === typeof value || "bigint" === typeof value) "body" !== tag && setTextContent(domElement, "" + value);
				else return;
				break;
			case "className":
				setValueForKnownAttribute(domElement, "class", value);
				break;
			case "tabIndex":
				setValueForKnownAttribute(domElement, "tabindex", value);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				setValueForKnownAttribute(domElement, key, value);
				break;
			case "style":
				setValueForStyles(domElement, value, prevValue);
				return;
			case "data": if ("object" !== tag) {
				setValueForKnownAttribute(domElement, "data", value);
				break;
			}
			case "src":
			case "href":
				if ("" === value && ("a" !== tag || "href" !== key)) {
					domElement.removeAttribute(key);
					break;
				}
				if (null == value || "function" === typeof value || "symbol" === typeof value || "boolean" === typeof value) {
					domElement.removeAttribute(key);
					break;
				}
				value = sanitizeURL(value);
				domElement.setAttribute(key, value);
				break;
			case "action":
			case "formAction":
				if ("function" === typeof value) {
					domElement.setAttribute(key, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				} else "function" === typeof prevValue && ("formAction" === key ? ("input" !== tag && setProp(domElement, tag, "name", props.name, props, null), setProp(domElement, tag, "formEncType", props.formEncType, props, null), setProp(domElement, tag, "formMethod", props.formMethod, props, null), setProp(domElement, tag, "formTarget", props.formTarget, props, null)) : (setProp(domElement, tag, "encType", props.encType, props, null), setProp(domElement, tag, "method", props.method, props, null), setProp(domElement, tag, "target", props.target, props, null)));
				if (null == value || "symbol" === typeof value || "boolean" === typeof value) {
					domElement.removeAttribute(key);
					break;
				}
				value = sanitizeURL(value);
				domElement.setAttribute(key, value);
				break;
			case "onClick":
				null != value && (domElement.onclick = noop$1);
				return;
			case "onScroll":
				null != value && listenToNonDelegatedEvent("scroll", domElement);
				return;
			case "onScrollEnd":
				null != value && listenToNonDelegatedEvent("scrollend", domElement);
				return;
			case "dangerouslySetInnerHTML":
				if (null != value) {
					if ("object" !== typeof value || !("__html" in value)) throw Error(formatProdErrorMessage(61));
					key = value.__html;
					if (null != key) {
						if (null != props.children) throw Error(formatProdErrorMessage(60));
						(null != prevValue ? prevValue.__html : void 0) !== key && (domElement.innerHTML = key);
					}
				}
				break;
			case "multiple":
				domElement.multiple = value && "function" !== typeof value && "symbol" !== typeof value;
				break;
			case "muted":
				domElement.muted = value && "function" !== typeof value && "symbol" !== typeof value;
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (null == value || "function" === typeof value || "boolean" === typeof value || "symbol" === typeof value) {
					domElement.removeAttribute("xlink:href");
					break;
				}
				key = sanitizeURL(value);
				domElement.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", key);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				null != value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "credentialless":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, "") : domElement.removeAttribute(key);
				break;
			case "capture":
			case "download":
				!0 === value ? domElement.setAttribute(key, "") : !1 !== value && null != value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				null != value && "function" !== typeof value && "symbol" !== typeof value && !isNaN(value) && 1 <= value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
				break;
			case "rowSpan":
			case "start":
				null == value || "function" === typeof value || "symbol" === typeof value || isNaN(value) ? domElement.removeAttribute(key) : domElement.setAttribute(key, value);
				break;
			case "popover":
				listenToNonDelegatedEvent("beforetoggle", domElement);
				listenToNonDelegatedEvent("toggle", domElement);
				setValueForAttribute(domElement, "popover", value);
				break;
			case "xlinkActuate":
				setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:actuate", value);
				break;
			case "xlinkArcrole":
				setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:arcrole", value);
				break;
			case "xlinkRole":
				setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:role", value);
				break;
			case "xlinkShow":
				setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:show", value);
				break;
			case "xlinkTitle":
				setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:title", value);
				break;
			case "xlinkType":
				setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:type", value);
				break;
			case "xmlBase":
				setValueForNamespacedAttribute(domElement, "http://www.w3.org/XML/1998/namespace", "xml:base", value);
				break;
			case "xmlLang":
				setValueForNamespacedAttribute(domElement, "http://www.w3.org/XML/1998/namespace", "xml:lang", value);
				break;
			case "xmlSpace":
				setValueForNamespacedAttribute(domElement, "http://www.w3.org/XML/1998/namespace", "xml:space", value);
				break;
			case "is":
				setValueForAttribute(domElement, "is", value);
				break;
			case "innerText":
			case "textContent": return;
			default: if (!(2 < key.length) || "o" !== key[0] && "O" !== key[0] || "n" !== key[1] && "N" !== key[1]) key = aliases.get(key) || key, setValueForAttribute(domElement, key, value);
			else return;
		}
		viewTransitionMutationContext = !0;
	}
	function setPropOnCustomElement(domElement, tag, key, value, props, prevValue) {
		switch (key) {
			case "style":
				setValueForStyles(domElement, value, prevValue);
				return;
			case "dangerouslySetInnerHTML":
				if (null != value) {
					if ("object" !== typeof value || !("__html" in value)) throw Error(formatProdErrorMessage(61));
					key = value.__html;
					if (null != key) {
						if (null != props.children) throw Error(formatProdErrorMessage(60));
						(null != prevValue ? prevValue.__html : void 0) !== key && (domElement.innerHTML = key);
					}
				}
				break;
			case "children":
				if ("string" === typeof value) setTextContent(domElement, value);
				else if ("number" === typeof value || "bigint" === typeof value) setTextContent(domElement, "" + value);
				else return;
				break;
			case "onScroll":
				null != value && listenToNonDelegatedEvent("scroll", domElement);
				return;
			case "onScrollEnd":
				null != value && listenToNonDelegatedEvent("scrollend", domElement);
				return;
			case "onClick":
				null != value && (domElement.onclick = noop$1);
				return;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": return;
			case "innerText":
			case "textContent": return;
			default:
				if (!registrationNameDependencies.hasOwnProperty(key)) a: {
					if ("o" === key[0] && "n" === key[1] && (props = key.endsWith("Capture"), prevValue = key.slice(2, props ? key.length - 7 : void 0), tag = domElement[internalPropsKey] || null, tag = null != tag ? tag[key] : null, "function" === typeof tag && domElement.removeEventListener(prevValue, tag, props), "function" === typeof value)) {
						"function" !== typeof tag && null !== tag && (key in domElement ? domElement[key] = null : domElement.hasAttribute(key) && domElement.removeAttribute(key));
						domElement.addEventListener(prevValue, value, props);
						break a;
					}
					viewTransitionMutationContext = !0;
					key in domElement ? domElement[key] = value : !0 === value ? domElement.setAttribute(key, "") : setValueForAttribute(domElement, key, value);
				}
				return;
		}
		viewTransitionMutationContext = !0;
	}
	function setInitialProperties(domElement, tag, props) {
		switch (tag) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				listenToNonDelegatedEvent("error", domElement);
				listenToNonDelegatedEvent("load", domElement);
				var hasSrc = !1, hasSrcSet = !1, propKey;
				for (propKey in props) if (props.hasOwnProperty(propKey)) {
					var propValue = props[propKey];
					if (null != propValue) switch (propKey) {
						case "src":
							hasSrc = !0;
							break;
						case "srcSet":
							hasSrcSet = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(formatProdErrorMessage(137, tag));
						default: setProp(domElement, tag, propKey, propValue, props, null);
					}
				}
				hasSrcSet && setProp(domElement, tag, "srcSet", props.srcSet, props, null);
				hasSrc && setProp(domElement, tag, "src", props.src, props, null);
				return;
			case "input":
				listenToNonDelegatedEvent("invalid", domElement);
				var defaultValue = propKey = propValue = hasSrcSet = null, checked = null, defaultChecked = null;
				for (hasSrc in props) if (props.hasOwnProperty(hasSrc)) {
					var propValue$204 = props[hasSrc];
					if (null != propValue$204) switch (hasSrc) {
						case "name":
							hasSrcSet = propValue$204;
							break;
						case "type":
							propValue = propValue$204;
							break;
						case "checked":
							checked = propValue$204;
							break;
						case "defaultChecked":
							defaultChecked = propValue$204;
							break;
						case "value":
							propKey = propValue$204;
							break;
						case "defaultValue":
							defaultValue = propValue$204;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (null != propValue$204) throw Error(formatProdErrorMessage(137, tag));
							break;
						default: setProp(domElement, tag, hasSrc, propValue$204, props, null);
					}
				}
				initInput(domElement, propKey, defaultValue, checked, defaultChecked, propValue, hasSrcSet, !1);
				return;
			case "select":
				listenToNonDelegatedEvent("invalid", domElement);
				hasSrc = propValue = propKey = null;
				for (hasSrcSet in props) if (props.hasOwnProperty(hasSrcSet) && (defaultValue = props[hasSrcSet], null != defaultValue)) switch (hasSrcSet) {
					case "value":
						propKey = defaultValue;
						break;
					case "defaultValue":
						propValue = defaultValue;
						break;
					case "multiple": hasSrc = defaultValue;
					default: setProp(domElement, tag, hasSrcSet, defaultValue, props, null);
				}
				tag = propKey;
				props = propValue;
				domElement.multiple = !!hasSrc;
				null != tag ? updateOptions(domElement, !!hasSrc, tag, !1) : null != props && updateOptions(domElement, !!hasSrc, props, !0);
				return;
			case "textarea":
				listenToNonDelegatedEvent("invalid", domElement);
				propKey = hasSrcSet = hasSrc = null;
				for (propValue in props) if (props.hasOwnProperty(propValue) && (defaultValue = props[propValue], null != defaultValue)) switch (propValue) {
					case "value":
						hasSrc = defaultValue;
						break;
					case "defaultValue":
						hasSrcSet = defaultValue;
						break;
					case "children":
						propKey = defaultValue;
						break;
					case "dangerouslySetInnerHTML":
						if (null != defaultValue) throw Error(formatProdErrorMessage(91));
						break;
					default: setProp(domElement, tag, propValue, defaultValue, props, null);
				}
				initTextarea(domElement, hasSrc, hasSrcSet, propKey);
				return;
			case "option":
				for (checked in props) if (props.hasOwnProperty(checked) && (hasSrc = props[checked], null != hasSrc)) switch (checked) {
					case "selected":
						domElement.selected = hasSrc && "function" !== typeof hasSrc && "symbol" !== typeof hasSrc;
						break;
					default: setProp(domElement, tag, checked, hasSrc, props, null);
				}
				return;
			case "dialog":
				listenToNonDelegatedEvent("beforetoggle", domElement);
				listenToNonDelegatedEvent("toggle", domElement);
				listenToNonDelegatedEvent("cancel", domElement);
				listenToNonDelegatedEvent("close", domElement);
				break;
			case "iframe":
			case "object":
				listenToNonDelegatedEvent("load", domElement);
				break;
			case "video":
			case "audio":
				for (hasSrc = 0; hasSrc < mediaEventTypes.length; hasSrc++) listenToNonDelegatedEvent(mediaEventTypes[hasSrc], domElement);
				break;
			case "image":
				listenToNonDelegatedEvent("error", domElement);
				listenToNonDelegatedEvent("load", domElement);
				break;
			case "details":
				listenToNonDelegatedEvent("toggle", domElement);
				break;
			case "embed":
			case "source":
			case "link": listenToNonDelegatedEvent("error", domElement), listenToNonDelegatedEvent("load", domElement);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (defaultChecked in props) if (props.hasOwnProperty(defaultChecked) && (hasSrc = props[defaultChecked], null != hasSrc)) switch (defaultChecked) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(formatProdErrorMessage(137, tag));
					default: setProp(domElement, tag, defaultChecked, hasSrc, props, null);
				}
				return;
			default: if (isCustomElement(tag)) {
				for (propValue$204 in props) props.hasOwnProperty(propValue$204) && (hasSrc = props[propValue$204], void 0 !== hasSrc && setPropOnCustomElement(domElement, tag, propValue$204, hasSrc, props, void 0));
				return;
			}
		}
		for (defaultValue in props) props.hasOwnProperty(defaultValue) && (hasSrc = props[defaultValue], null != hasSrc && setProp(domElement, tag, defaultValue, hasSrc, props, null));
	}
	var emptyProps = {};
	function updateProperties(domElement, tag, lastProps, nextProps) {
		switch (tag) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var name = null, type = null, value = null, defaultValue = null, lastDefaultValue = null, checked = null, defaultChecked = null;
				for (propKey in lastProps) {
					var lastProp = lastProps[propKey];
					if (lastProps.hasOwnProperty(propKey) && null != lastProp) switch (propKey) {
						case "checked": break;
						case "value": break;
						case "defaultValue": lastDefaultValue = lastProp;
						default: nextProps.hasOwnProperty(propKey) || setProp(domElement, tag, propKey, null, nextProps, lastProp);
					}
				}
				for (var propKey$221 in nextProps) {
					var propKey = nextProps[propKey$221];
					lastProp = lastProps[propKey$221];
					if (nextProps.hasOwnProperty(propKey$221) && (null != propKey || null != lastProp)) switch (propKey$221) {
						case "type":
							propKey !== lastProp && (viewTransitionMutationContext = !0);
							type = propKey;
							break;
						case "name":
							propKey !== lastProp && (viewTransitionMutationContext = !0);
							name = propKey;
							break;
						case "checked":
							propKey !== lastProp && (viewTransitionMutationContext = !0);
							checked = propKey;
							break;
						case "defaultChecked":
							propKey !== lastProp && (viewTransitionMutationContext = !0);
							defaultChecked = propKey;
							break;
						case "value":
							propKey !== lastProp && (viewTransitionMutationContext = !0);
							value = propKey;
							break;
						case "defaultValue":
							propKey !== lastProp && (viewTransitionMutationContext = !0);
							defaultValue = propKey;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (null != propKey) throw Error(formatProdErrorMessage(137, tag));
							break;
						default: propKey !== lastProp && setProp(domElement, tag, propKey$221, propKey, nextProps, lastProp);
					}
				}
				updateInput(domElement, value, defaultValue, lastDefaultValue, checked, defaultChecked, type, name);
				return;
			case "select":
				propKey = value = defaultValue = propKey$221 = null;
				for (type in lastProps) if (lastDefaultValue = lastProps[type], lastProps.hasOwnProperty(type) && null != lastDefaultValue) switch (type) {
					case "value": break;
					case "multiple": propKey = lastDefaultValue;
					default: nextProps.hasOwnProperty(type) || setProp(domElement, tag, type, null, nextProps, lastDefaultValue);
				}
				for (name in nextProps) if (type = nextProps[name], lastDefaultValue = lastProps[name], nextProps.hasOwnProperty(name) && (null != type || null != lastDefaultValue)) switch (name) {
					case "value":
						type !== lastDefaultValue && (viewTransitionMutationContext = !0);
						propKey$221 = type;
						break;
					case "defaultValue":
						type !== lastDefaultValue && (viewTransitionMutationContext = !0);
						defaultValue = type;
						break;
					case "multiple": type !== lastDefaultValue && (viewTransitionMutationContext = !0), value = type;
					default: type !== lastDefaultValue && setProp(domElement, tag, name, type, nextProps, lastDefaultValue);
				}
				tag = defaultValue;
				lastProps = value;
				nextProps = propKey;
				null != propKey$221 ? updateOptions(domElement, !!lastProps, propKey$221, !1) : !!nextProps !== !!lastProps && (null != tag ? updateOptions(domElement, !!lastProps, tag, !0) : updateOptions(domElement, !!lastProps, lastProps ? [] : "", !1));
				return;
			case "textarea":
				propKey = propKey$221 = null;
				for (defaultValue in lastProps) if (name = lastProps[defaultValue], lastProps.hasOwnProperty(defaultValue) && null != name && !nextProps.hasOwnProperty(defaultValue)) switch (defaultValue) {
					case "value": break;
					case "children": break;
					default: setProp(domElement, tag, defaultValue, null, nextProps, name);
				}
				for (value in nextProps) if (name = nextProps[value], type = lastProps[value], nextProps.hasOwnProperty(value) && (null != name || null != type)) switch (value) {
					case "value":
						name !== type && (viewTransitionMutationContext = !0);
						propKey$221 = name;
						break;
					case "defaultValue":
						name !== type && (viewTransitionMutationContext = !0);
						propKey = name;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (null != name) throw Error(formatProdErrorMessage(91));
						break;
					default: name !== type && setProp(domElement, tag, value, name, nextProps, type);
				}
				updateTextarea(domElement, propKey$221, propKey);
				return;
			case "option":
				for (var propKey$237 in lastProps) if (propKey$221 = lastProps[propKey$237], lastProps.hasOwnProperty(propKey$237) && null != propKey$221 && !nextProps.hasOwnProperty(propKey$237)) switch (propKey$237) {
					case "selected":
						domElement.selected = !1;
						break;
					default: setProp(domElement, tag, propKey$237, null, nextProps, propKey$221);
				}
				for (lastDefaultValue in nextProps) if (propKey$221 = nextProps[lastDefaultValue], propKey = lastProps[lastDefaultValue], nextProps.hasOwnProperty(lastDefaultValue) && propKey$221 !== propKey && (null != propKey$221 || null != propKey)) switch (lastDefaultValue) {
					case "selected":
						propKey$221 !== propKey && (viewTransitionMutationContext = !0);
						domElement.selected = propKey$221 && "function" !== typeof propKey$221 && "symbol" !== typeof propKey$221;
						break;
					default: setProp(domElement, tag, lastDefaultValue, propKey$221, nextProps, propKey);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var propKey$242 in lastProps) propKey$221 = lastProps[propKey$242], lastProps.hasOwnProperty(propKey$242) && null != propKey$221 && !nextProps.hasOwnProperty(propKey$242) && setProp(domElement, tag, propKey$242, null, nextProps, propKey$221);
				for (checked in nextProps) if (propKey$221 = nextProps[checked], propKey = lastProps[checked], nextProps.hasOwnProperty(checked) && propKey$221 !== propKey && (null != propKey$221 || null != propKey)) switch (checked) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (null != propKey$221) throw Error(formatProdErrorMessage(137, tag));
						break;
					default: setProp(domElement, tag, checked, propKey$221, nextProps, propKey);
				}
				return;
			default: if (isCustomElement(tag)) {
				for (var propKey$247 in lastProps) propKey$221 = lastProps[propKey$247], lastProps.hasOwnProperty(propKey$247) && void 0 !== propKey$221 && !nextProps.hasOwnProperty(propKey$247) && setPropOnCustomElement(domElement, tag, propKey$247, void 0, nextProps, propKey$221);
				for (defaultChecked in nextProps) propKey$221 = nextProps[defaultChecked], propKey = lastProps[defaultChecked], !nextProps.hasOwnProperty(defaultChecked) || propKey$221 === propKey || void 0 === propKey$221 && void 0 === propKey || setPropOnCustomElement(domElement, tag, defaultChecked, propKey$221, nextProps, propKey);
				return;
			}
		}
		for (var propKey$252 in lastProps) propKey$221 = lastProps[propKey$252], lastProps.hasOwnProperty(propKey$252) && null != propKey$221 && !nextProps.hasOwnProperty(propKey$252) && setProp(domElement, tag, propKey$252, null, nextProps, propKey$221);
		for (lastProp in nextProps) propKey$221 = nextProps[lastProp], propKey = lastProps[lastProp], !nextProps.hasOwnProperty(lastProp) || propKey$221 === propKey || null == propKey$221 && null == propKey || setProp(domElement, tag, lastProp, propKey$221, nextProps, propKey);
	}
	function isLikelyStaticResource(initiatorType) {
		switch (initiatorType) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function estimateBandwidth() {
		if ("function" === typeof performance.getEntriesByType) {
			for (var count = 0, bits = 0, resourceEntries = performance.getEntriesByType("resource"), i = 0; i < resourceEntries.length; i++) {
				var entry = resourceEntries[i], transferSize = entry.transferSize, initiatorType = entry.initiatorType, duration = entry.duration;
				if (transferSize && duration && isLikelyStaticResource(initiatorType)) {
					initiatorType = 0;
					duration = entry.responseEnd;
					for (i += 1; i < resourceEntries.length; i++) {
						var overlapEntry = resourceEntries[i], overlapStartTime = overlapEntry.startTime;
						if (overlapStartTime > duration) break;
						var overlapTransferSize = overlapEntry.transferSize, overlapInitiatorType = overlapEntry.initiatorType;
						overlapTransferSize && isLikelyStaticResource(overlapInitiatorType) && (overlapEntry = overlapEntry.responseEnd, initiatorType += overlapTransferSize * (overlapEntry < duration ? 1 : (duration - overlapStartTime) / (overlapEntry - overlapStartTime)));
					}
					--i;
					bits += 8 * (transferSize + initiatorType) / (entry.duration / 1e3);
					count++;
					if (10 < count) break;
				}
			}
			if (0 < count) return bits / count / 1e6;
		}
		return navigator.connection && (count = navigator.connection.downlink, "number" === typeof count) ? count : 5;
	}
	var eventsEnabled = null;
	var selectionInformation = null;
	function getOwnerDocumentFromRootContainer(rootContainerElement) {
		return 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
	}
	function getOwnHostContext(namespaceURI) {
		switch (namespaceURI) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function getChildHostContextProd(parentNamespace, type) {
		if (0 === parentNamespace) switch (type) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return 1 === parentNamespace && "foreignObject" === type ? 0 : parentNamespace;
	}
	function createHoistableInstance(type, props, rootContainerInstance, internalInstanceHandle) {
		rootContainerInstance = getOwnerDocumentFromRootContainer(rootContainerInstance).createElement(type);
		rootContainerInstance[internalInstanceKey] = internalInstanceHandle;
		rootContainerInstance[internalPropsKey] = props;
		setInitialProperties(rootContainerInstance, type, props);
		markNodeAsHoistable(rootContainerInstance);
		return rootContainerInstance;
	}
	function shouldSetTextContent(type, props) {
		return "textarea" === type || "noscript" === type || "string" === typeof props.children || "number" === typeof props.children || "bigint" === typeof props.children || "object" === typeof props.dangerouslySetInnerHTML && null !== props.dangerouslySetInnerHTML && null != props.dangerouslySetInnerHTML.__html;
	}
	var currentPopstateTransitionEvent = null;
	function shouldAttemptEagerTransition() {
		var event = window.event;
		if (event && "popstate" === event.type) {
			if (event === currentPopstateTransitionEvent) return !1;
			currentPopstateTransitionEvent = event;
			return !0;
		}
		currentPopstateTransitionEvent = null;
		return !1;
	}
	var scheduleTimeout = "function" === typeof setTimeout ? setTimeout : void 0;
	var cancelTimeout = "function" === typeof clearTimeout ? clearTimeout : void 0;
	var localPromise = "function" === typeof Promise ? Promise : void 0;
	var localRequestAnimationFrame = "function" === typeof requestAnimationFrame ? requestAnimationFrame : scheduleTimeout;
	var scheduleMicrotask = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof localPromise ? function(callback) {
		return localPromise.resolve(null).then(callback).catch(handleErrorInNextTick);
	} : scheduleTimeout;
	function handleErrorInNextTick(error) {
		setTimeout(function() {
			throw error;
		});
	}
	function isSingletonScope(type) {
		return "head" === type;
	}
	function clearHydrationBoundary(parentInstance, hydrationInstance) {
		var node = hydrationInstance, depth = 0;
		do {
			var nextNode = node.nextSibling;
			parentInstance.removeChild(node);
			if (nextNode && 8 === nextNode.nodeType) if (node = nextNode.data, "/$" === node || "/&" === node) {
				if (0 === depth) {
					parentInstance.removeChild(nextNode);
					retryIfBlockedOn(hydrationInstance);
					return;
				}
				depth--;
			} else if ("$" === node || "$?" === node || "$~" === node || "$!" === node || "&" === node) depth++;
			else if ("html" === node) clearSingletonPreambleContribution(parentInstance.ownerDocument.documentElement);
			else if ("head" === node) {
				node = parentInstance.ownerDocument.head;
				clearSingletonPreambleContribution(node);
				for (var node$jscomp$0 = node.firstChild; node$jscomp$0;) {
					var nextNode$jscomp$0 = node$jscomp$0.nextSibling, nodeName = node$jscomp$0.nodeName;
					node$jscomp$0[internalHoistableMarker] || "SCRIPT" === nodeName || "STYLE" === nodeName || "LINK" === nodeName && "stylesheet" === node$jscomp$0.rel.toLowerCase() || node.removeChild(node$jscomp$0);
					node$jscomp$0 = nextNode$jscomp$0;
				}
			} else "body" === node && clearSingletonPreambleContribution(parentInstance.ownerDocument.body);
			node = nextNode;
		} while (node);
		retryIfBlockedOn(hydrationInstance);
	}
	function hideOrUnhideDehydratedBoundary(suspenseInstance, isHidden) {
		var node = suspenseInstance;
		suspenseInstance = 0;
		do {
			var nextNode = node.nextSibling;
			1 === node.nodeType ? isHidden ? (node._stashedDisplay = node.style.display, node.style.display = "none") : (node.style.display = node._stashedDisplay || "", "" === node.getAttribute("style") && node.removeAttribute("style")) : 3 === node.nodeType && (isHidden ? (node._stashedText = node.nodeValue, node.nodeValue = "") : node.nodeValue = node._stashedText || "");
			if (nextNode && 8 === nextNode.nodeType) if (node = nextNode.data, "/$" === node) if (0 === suspenseInstance) break;
			else suspenseInstance--;
			else "$" !== node && "$?" !== node && "$~" !== node && "$!" !== node || suspenseInstance++;
			node = nextNode;
		} while (node);
	}
	function applyViewTransitionName(instance, name, className) {
		name = CSS.escape(name) !== name ? "r-" + btoa(name).replace(/=/g, "") : name;
		instance.style.viewTransitionName = name;
		null != className && (instance.style.viewTransitionClass = className);
		className = getComputedStyle(instance);
		if ("inline" === className.display) {
			name = instance.getClientRects();
			if (1 === name.length) var JSCompiler_inline_result = 1;
			else for (var i = JSCompiler_inline_result = 0; i < name.length; i++) {
				var rect = name[i];
				0 < rect.width && 0 < rect.height && JSCompiler_inline_result++;
			}
			1 === JSCompiler_inline_result && (instance = instance.style, instance.display = 1 === name.length ? "inline-block" : "block", instance.marginTop = "-" + className.paddingTop, instance.marginBottom = "-" + className.paddingBottom);
		}
	}
	function restoreViewTransitionName(instance, props) {
		instance = instance.style;
		props = props.style;
		var viewTransitionName = null != props ? props.hasOwnProperty("viewTransitionName") ? props.viewTransitionName : props.hasOwnProperty("view-transition-name") ? props["view-transition-name"] : null : null;
		instance.viewTransitionName = null == viewTransitionName || "boolean" === typeof viewTransitionName ? "" : ("" + viewTransitionName).trim();
		viewTransitionName = null != props ? props.hasOwnProperty("viewTransitionClass") ? props.viewTransitionClass : props.hasOwnProperty("view-transition-class") ? props["view-transition-class"] : null : null;
		instance.viewTransitionClass = null == viewTransitionName || "boolean" === typeof viewTransitionName ? "" : ("" + viewTransitionName).trim();
		"inline-block" === instance.display && (null == props ? instance.display = instance.margin = "" : (viewTransitionName = props.display, instance.display = null == viewTransitionName || "boolean" === typeof viewTransitionName ? "" : viewTransitionName, viewTransitionName = props.margin, null != viewTransitionName ? instance.margin = viewTransitionName : (viewTransitionName = props.hasOwnProperty("marginTop") ? props.marginTop : props["margin-top"], instance.marginTop = null == viewTransitionName || "boolean" === typeof viewTransitionName ? "" : viewTransitionName, props = props.hasOwnProperty("marginBottom") ? props.marginBottom : props["margin-bottom"], instance.marginBottom = null == props || "boolean" === typeof props ? "" : props)));
	}
	function createMeasurement(rect, computedStyle, element) {
		element = element.ownerDocument.defaultView;
		return {
			rect,
			abs: "absolute" === computedStyle.position || "fixed" === computedStyle.position,
			clip: "none" !== computedStyle.clipPath || "visible" !== computedStyle.overflow || "none" !== computedStyle.filter || "none" !== computedStyle.mask || "none" !== computedStyle.mask || "0px" !== computedStyle.borderRadius,
			view: 0 <= rect.bottom && 0 <= rect.right && rect.top <= element.innerHeight && rect.left <= element.innerWidth
		};
	}
	function measureInstance(instance) {
		return createMeasurement(instance.getBoundingClientRect(), getComputedStyle(instance), instance);
	}
	function measureClonedInstance(instance) {
		var measuredRect = instance.getBoundingClientRect();
		measuredRect = new DOMRect(measuredRect.x + 2e4, measuredRect.y + 2e4, measuredRect.width, measuredRect.height);
		var computedStyle = getComputedStyle(instance);
		return createMeasurement(measuredRect, computedStyle, instance);
	}
	function forceLayout(ownerDocument) {
		return ownerDocument.documentElement.clientHeight;
	}
	function waitForImageToLoad(resolve) {
		this.addEventListener("load", resolve);
		this.addEventListener("error", resolve);
	}
	function startViewTransition(suspendedState, rootContainer, transitionTypes, mutationCallback, layoutCallback, afterMutationCallback, spawnedWorkCallback, passiveCallback, errorCallback) {
		var ownerDocument = 9 === rootContainer.nodeType ? rootContainer : rootContainer.ownerDocument;
		try {
			var transition = ownerDocument.startViewTransition({
				update: function() {
					var ownerWindow = ownerDocument.defaultView, pendingNavigation = ownerWindow.navigation && ownerWindow.navigation.transition, previousFontLoadingStatus = ownerDocument.fonts.status;
					mutationCallback();
					var blockingPromises = [];
					"loaded" === previousFontLoadingStatus && (forceLayout(ownerDocument), "loading" === ownerDocument.fonts.status && blockingPromises.push(ownerDocument.fonts.ready));
					previousFontLoadingStatus = blockingPromises.length;
					if (null !== suspendedState) for (var suspenseyImages = suspendedState.suspenseyImages, imgBytes = 0, i = 0; i < suspenseyImages.length; i++) {
						var suspenseyImage = suspenseyImages[i];
						if (!suspenseyImage.complete) {
							var rect = suspenseyImage.getBoundingClientRect();
							if (0 < rect.bottom && 0 < rect.right && rect.top < ownerWindow.innerHeight && rect.left < ownerWindow.innerWidth) {
								imgBytes += estimateImageBytes(suspenseyImage);
								if (imgBytes > estimatedBytesWithinLimit) {
									blockingPromises.length = previousFontLoadingStatus;
									break;
								}
								suspenseyImage = new Promise(waitForImageToLoad.bind(suspenseyImage));
								blockingPromises.push(suspenseyImage);
							}
						}
					}
					if (0 < blockingPromises.length) return ownerWindow = Promise.race([Promise.all(blockingPromises), new Promise(function(resolve) {
						return setTimeout(resolve, 500);
					})]).then(layoutCallback, layoutCallback), (pendingNavigation ? Promise.allSettled([pendingNavigation.finished, ownerWindow]) : ownerWindow).then(afterMutationCallback, afterMutationCallback);
					layoutCallback();
					if (pendingNavigation) return pendingNavigation.finished.then(afterMutationCallback, afterMutationCallback);
					afterMutationCallback();
				},
				types: transitionTypes
			});
			ownerDocument.__reactViewTransition = transition;
			var viewTransitionAnimations = [];
			transition.ready.then(function() {
				for (var animations = ownerDocument.documentElement.getAnimations({ subtree: !0 }), i = 0; i < animations.length; i++) {
					var animation = animations[i], effect = animation.effect, pseudoElement = effect.pseudoElement;
					if (null != pseudoElement && pseudoElement.startsWith("::view-transition")) {
						viewTransitionAnimations.push(animation);
						animation = effect.getKeyframes();
						for (var height = pseudoElement = void 0, unchangedDimensions = !0, j = 0; j < animation.length; j++) {
							var keyframe = animation[j], w = keyframe.width;
							if (void 0 === pseudoElement) pseudoElement = w;
							else if (pseudoElement !== w) {
								unchangedDimensions = !1;
								break;
							}
							w = keyframe.height;
							if (void 0 === height) height = w;
							else if (height !== w) {
								unchangedDimensions = !1;
								break;
							}
							delete keyframe.width;
							delete keyframe.height;
							"none" === keyframe.transform && delete keyframe.transform;
						}
						unchangedDimensions && void 0 !== pseudoElement && void 0 !== height && (effect.setKeyframes(animation), unchangedDimensions = getComputedStyle(effect.target, effect.pseudoElement), unchangedDimensions.width !== pseudoElement || unchangedDimensions.height !== height) && (unchangedDimensions = animation[0], unchangedDimensions.width = pseudoElement, unchangedDimensions.height = height, unchangedDimensions = animation[animation.length - 1], unchangedDimensions.width = pseudoElement, unchangedDimensions.height = height, effect.setKeyframes(animation));
					}
				}
				spawnedWorkCallback();
			}, function(error) {
				ownerDocument.__reactViewTransition === transition && (ownerDocument.__reactViewTransition = null);
				try {
					if ("object" === typeof error && null !== error) switch (error.name) {
						case "InvalidStateError": if ("View transition was skipped because document visibility state is hidden." === error.message || "Skipping view transition because document visibility state has become hidden." === error.message || "Skipping view transition because viewport size changed." === error.message || "Transition was aborted because of invalid state" === error.message) error = null;
					}
					null !== error && errorCallback(error);
				} finally {
					mutationCallback(), layoutCallback(), spawnedWorkCallback();
				}
			});
			transition.finished.finally(function() {
				for (var i = 0; i < viewTransitionAnimations.length; i++) viewTransitionAnimations[i].cancel();
				ownerDocument.__reactViewTransition === transition && (ownerDocument.__reactViewTransition = null);
				passiveCallback();
			});
			return transition;
		} catch (x) {
			return mutationCallback(), layoutCallback(), spawnedWorkCallback(), null;
		}
	}
	function ViewTransitionPseudoElement(pseudo, name) {
		this._scope = document.documentElement;
		this._selector = "::view-transition-" + pseudo + "(" + name + ")";
	}
	ViewTransitionPseudoElement.prototype.animate = function(keyframes, options) {
		options = "number" === typeof options ? { duration: options } : assign({}, options);
		options.pseudoElement = this._selector;
		return this._scope.animate(keyframes, options);
	};
	ViewTransitionPseudoElement.prototype.getAnimations = function() {
		for (var scope = this._scope, selector = this._selector, animations = scope.getAnimations({ subtree: !0 }), result = [], i = 0; i < animations.length; i++) {
			var effect = animations[i].effect;
			null !== effect && effect.target === scope && effect.pseudoElement === selector && result.push(animations[i]);
		}
		return result;
	};
	ViewTransitionPseudoElement.prototype.getComputedStyle = function() {
		return getComputedStyle(this._scope, this._selector);
	};
	function createViewTransitionInstance(name) {
		return {
			name,
			group: new ViewTransitionPseudoElement("group", name),
			imagePair: new ViewTransitionPseudoElement("image-pair", name),
			old: new ViewTransitionPseudoElement("old", name),
			new: new ViewTransitionPseudoElement("new", name)
		};
	}
	function FragmentInstance(fragmentFiber) {
		this._fragmentFiber = fragmentFiber;
		this._observers = this._eventListeners = null;
	}
	FragmentInstance.prototype.addEventListener = function(type, listener, optionsOrUseCapture) {
		var signal = null, cleanup = null;
		if (null != optionsOrUseCapture && "boolean" !== typeof optionsOrUseCapture && (signal = optionsOrUseCapture.signal || null, null !== signal && signal.aborted)) return;
		null === this._eventListeners && (this._eventListeners = []);
		var listeners = this._eventListeners;
		if (-1 === indexOfEventListener(listeners, type, listener, optionsOrUseCapture)) {
			var fragmentInstance = this, attachedListener = listener;
			null != optionsOrUseCapture && "boolean" !== typeof optionsOrUseCapture && !0 === optionsOrUseCapture.once && (attachedListener = function(event) {
				fragmentInstance.removeEventListener(type, listener, optionsOrUseCapture);
				"function" === typeof listener ? listener.call(this, event) : listener.handleEvent(event);
			});
			null !== signal && (cleanup = fragmentInstance.removeEventListener.bind(fragmentInstance, type, listener, optionsOrUseCapture), signal.addEventListener("abort", cleanup, { once: !0 }), cleanup = signal.removeEventListener.bind(signal, "abort", cleanup));
			signal = getAttachOptions(optionsOrUseCapture);
			listeners.push({
				type,
				listener,
				optionsOrUseCapture,
				attachedListener,
				cleanup
			});
			traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, !1, addEventListenerToChild, type, attachedListener, signal);
		}
		this._eventListeners = listeners;
	};
	function addEventListenerToChild(child, type, listener, optionsOrUseCapture) {
		getInstanceFromHostFiber(child).addEventListener(type, listener, optionsOrUseCapture);
		return !1;
	}
	FragmentInstance.prototype.removeEventListener = function(type, listener, optionsOrUseCapture) {
		var listeners = this._eventListeners;
		if (null !== listeners && (listener = indexOfEventListener(listeners, type, listener, optionsOrUseCapture), -1 !== listener)) {
			var _listeners$index = listeners[listener];
			optionsOrUseCapture = _listeners$index.attachedListener;
			var cleanup = _listeners$index.cleanup;
			_listeners$index = getAttachOptions(_listeners$index.optionsOrUseCapture);
			traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, !1, removeEventListenerFromChild, type, optionsOrUseCapture, _listeners$index);
			listeners.splice(listener, 1);
			null !== cleanup && cleanup();
		}
	};
	function removeEventListenerFromChild(child, type, listener, optionsOrUseCapture) {
		getInstanceFromHostFiber(child).removeEventListener(type, listener, optionsOrUseCapture);
		return !1;
	}
	function getAttachOptions(opts) {
		return null != opts && "boolean" !== typeof opts && (!0 === opts.once || opts.signal instanceof AbortSignal) ? {
			capture: opts.capture,
			passive: opts.passive
		} : opts;
	}
	function normalizeListenerOptions(opts) {
		return null == opts ? "c=0" : "boolean" === typeof opts ? "c=" + (opts ? "1" : "0") : "c=" + (opts.capture ? "1" : "0");
	}
	function indexOfEventListener(eventListeners, type, listener, optionsOrUseCapture) {
		if (0 === eventListeners.length) return -1;
		optionsOrUseCapture = normalizeListenerOptions(optionsOrUseCapture);
		for (var i = 0; i < eventListeners.length; i++) {
			var item = eventListeners[i];
			if (item.type === type && item.listener === listener && normalizeListenerOptions(item.optionsOrUseCapture) === optionsOrUseCapture) return i;
		}
		return -1;
	}
	FragmentInstance.prototype.dispatchEvent = function(event) {
		var parentHostFiber = getFragmentParentInstanceOrContainerFiber(this._fragmentFiber);
		if (null === parentHostFiber) return !0;
		parentHostFiber = getInstanceFromHostFiber(parentHostFiber);
		var eventListeners = this._eventListeners;
		if (null !== eventListeners && 0 < eventListeners.length || !event.bubbles) {
			var temp = 9 === parentHostFiber.nodeType ? parentHostFiber.createComment("") : document.createTextNode("");
			if (eventListeners) for (var i = 0; i < eventListeners.length; i++) {
				var _eventListeners$i = eventListeners[i];
				temp.addEventListener(_eventListeners$i.type, _eventListeners$i.attachedListener, getAttachOptions(_eventListeners$i.optionsOrUseCapture));
			}
			parentHostFiber.appendChild(temp);
			event = temp.dispatchEvent(event);
			if (eventListeners) for (i = 0; i < eventListeners.length; i++) _eventListeners$i = eventListeners[i], temp.removeEventListener(_eventListeners$i.type, _eventListeners$i.attachedListener, getAttachOptions(_eventListeners$i.optionsOrUseCapture));
			parentHostFiber.removeChild(temp);
			return event;
		}
		return parentHostFiber.dispatchEvent(event);
	};
	FragmentInstance.prototype.focus = function(focusOptions) {
		traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, !0, setFocusOnFiberIfFocusable, focusOptions, void 0, void 0);
	};
	function setFocusOnFiberIfFocusable(fiber, focusOptions) {
		if (6 === fiber.tag) return !1;
		fiber = getInstanceFromHostFiber(fiber);
		return setFocusIfFocusable(fiber, focusOptions);
	}
	FragmentInstance.prototype.focusLast = function(focusOptions) {
		var children = [];
		traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, !0, collectChildren, children, void 0, void 0);
		for (var i = children.length - 1; 0 <= i && !setFocusOnFiberIfFocusable(children[i], focusOptions); i--);
	};
	function collectChildren(child, collection) {
		collection.push(child);
		return !1;
	}
	FragmentInstance.prototype.blur = function() {
		var parentHostFiber = getFragmentParentInstanceOrContainerFiber(this._fragmentFiber);
		null !== parentHostFiber && (parentHostFiber = getInstanceFromHostFiber(parentHostFiber), parentHostFiber = getOwnerDocumentFromRootContainer(parentHostFiber).activeElement, null !== parentHostFiber && traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, !1, blurActiveElementWithinFragment, parentHostFiber, void 0, void 0));
	};
	function blurActiveElementWithinFragment(child, activeElement) {
		if (6 === child.tag) return !1;
		child = getInstanceFromHostFiber(child);
		return child === activeElement || child.contains(activeElement) ? (activeElement.blur(), !0) : !1;
	}
	FragmentInstance.prototype.observeUsing = function(observer) {
		null === this._observers && (this._observers = /* @__PURE__ */ new Set());
		this._observers.add(observer);
		traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, !1, observeChild, observer, void 0, void 0);
	};
	function observeChild(child, observer) {
		if (6 === child.tag) return !1;
		child = getInstanceFromHostFiber(child);
		observer.observe(child);
		return !1;
	}
	FragmentInstance.prototype.unobserveUsing = function(observer) {
		var observers = this._observers;
		if (null !== observers && observers.has(observer)) {
			observers.delete(observer);
			traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, !1, unobserveChild, observer, void 0, void 0);
			for (var i = observers = 0; i < pendingIntersectionUnobserves.length; i++) {
				var pending = pendingIntersectionUnobserves[i];
				pending.fragmentInstance === this && pending.observer === observer ? observer.unobserve(pending.instance) : pendingIntersectionUnobserves[observers++] = pending;
			}
			pendingIntersectionUnobserves.length = observers;
		}
	};
	function unobserveChild(child, observer) {
		if (6 === child.tag) return !1;
		child = getInstanceFromHostFiber(child);
		observer.unobserve(child);
		return !1;
	}
	var pendingIntersectionUnobserves = [];
	var intersectionUnobserveScheduled = !1;
	function schedulePendingIntersectionUnobserve(fragmentInstance, observer, instance) {
		pendingIntersectionUnobserves.push({
			fragmentInstance,
			observer,
			instance
		});
		intersectionUnobserveScheduled || (intersectionUnobserveScheduled = !0, requestPostPaintCallback(function() {
			intersectionUnobserveScheduled = !1;
			var pending = pendingIntersectionUnobserves;
			pendingIntersectionUnobserves = [];
			for (var i = 0; i < pending.length; i++) {
				var item = pending[i];
				item.observer.unobserve(item.instance);
			}
		}));
	}
	FragmentInstance.prototype.getClientRects = function() {
		var rects = [];
		traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, !1, collectClientRects, rects, void 0, void 0);
		return rects;
	};
	function collectClientRects(child, rects) {
		if (6 === child.tag) {
			child = child.stateNode;
			var range = child.ownerDocument.createRange();
			range.selectNodeContents(child);
			rects.push.apply(rects, range.getClientRects());
		} else child = getInstanceFromHostFiber(child), rects.push.apply(rects, child.getClientRects());
		return !1;
	}
	FragmentInstance.prototype.getRootNode = function(getRootNodeOptions) {
		var parentHostFiber = getFragmentParentInstanceOrContainerFiber(this._fragmentFiber);
		return null === parentHostFiber ? this : getInstanceFromHostFiber(parentHostFiber).getRootNode(getRootNodeOptions);
	};
	FragmentInstance.prototype.compareDocumentPosition = function(otherNode) {
		var parentHostFiber = getFragmentParentInstanceOrContainerFiber(this._fragmentFiber);
		if (null === parentHostFiber) return Node.DOCUMENT_POSITION_DISCONNECTED;
		var children = [];
		traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, !1, collectChildren, children, void 0, void 0);
		var parentHostInstance = getInstanceFromHostFiber(parentHostFiber);
		if (0 === children.length) {
			children = parentHostInstance;
			if (fiberIsPortaledIntoHost(this._fragmentFiber)) {
				a: {
					for (parentHostFiber = this._fragmentFiber.return; null !== parentHostFiber;) {
						if (4 === parentHostFiber.tag) {
							parentHostFiber = parentHostFiber.stateNode.containerInfo;
							break a;
						}
						if (3 === parentHostFiber.tag || 5 === parentHostFiber.tag || 27 === parentHostFiber.tag) break;
						parentHostFiber = parentHostFiber.return;
					}
					parentHostFiber = null;
				}
				null != parentHostFiber && (children = parentHostFiber);
			}
			parentHostFiber = this._fragmentFiber;
			var result = parentHostInstance = children.compareDocumentPosition(otherNode);
			children === otherNode ? result = Node.DOCUMENT_POSITION_CONTAINS : parentHostInstance & Node.DOCUMENT_POSITION_CONTAINED_BY && (children = getFragmentInstanceOrTextInstanceSiblings(parentHostFiber)[1], null === children ? result = Node.DOCUMENT_POSITION_PRECEDING : (otherNode = getInstanceFromHostFiber(children).compareDocumentPosition(otherNode), result = 0 === otherNode || otherNode & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING));
			return result |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
		}
		parentHostFiber = getInstanceFromHostFiber(children[0]);
		result = getInstanceFromHostFiber(children[children.length - 1]);
		var parentHostInstanceFromDOM = fiberIsPortaledIntoHost(this._fragmentFiber) ? parentHostFiber.parentElement : parentHostInstance;
		if (null == parentHostInstanceFromDOM) return Node.DOCUMENT_POSITION_DISCONNECTED;
		parentHostInstance = parentHostInstanceFromDOM.compareDocumentPosition(parentHostFiber) & Node.DOCUMENT_POSITION_CONTAINED_BY;
		parentHostInstanceFromDOM = parentHostInstanceFromDOM.compareDocumentPosition(result) & Node.DOCUMENT_POSITION_CONTAINED_BY;
		var firstResult = parentHostFiber.compareDocumentPosition(otherNode), lastResult = result.compareDocumentPosition(otherNode), otherNodeIsWithinFirstOrLastChild = firstResult & Node.DOCUMENT_POSITION_CONTAINED_BY || lastResult & Node.DOCUMENT_POSITION_CONTAINED_BY;
		lastResult = parentHostInstance && parentHostInstanceFromDOM && firstResult & Node.DOCUMENT_POSITION_FOLLOWING && lastResult & Node.DOCUMENT_POSITION_PRECEDING;
		parentHostFiber = parentHostInstance && parentHostFiber === otherNode || parentHostInstanceFromDOM && result === otherNode || otherNodeIsWithinFirstOrLastChild || lastResult ? Node.DOCUMENT_POSITION_CONTAINED_BY : !parentHostInstance && parentHostFiber === otherNode || !parentHostInstanceFromDOM && result === otherNode ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : firstResult;
		return parentHostFiber & Node.DOCUMENT_POSITION_DISCONNECTED || parentHostFiber & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || validateDocumentPositionWithFiberTree(parentHostFiber, this._fragmentFiber, children[0], children[children.length - 1], otherNode) ? parentHostFiber : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
	};
	function validateDocumentPositionWithFiberTree(documentPosition, fragmentFiber, precedingBoundaryFiber, followingBoundaryFiber, otherNode) {
		var otherFiber = getClosestInstanceFromNode(otherNode);
		if (documentPosition & Node.DOCUMENT_POSITION_CONTAINED_BY) {
			if (precedingBoundaryFiber = !!otherFiber) a: {
				for (; null !== otherFiber;) {
					if (7 === otherFiber.tag && (otherFiber === fragmentFiber || otherFiber.alternate === fragmentFiber)) {
						precedingBoundaryFiber = !0;
						break a;
					}
					otherFiber = otherFiber.return;
				}
				precedingBoundaryFiber = !1;
			}
			return precedingBoundaryFiber;
		}
		if (documentPosition & Node.DOCUMENT_POSITION_CONTAINS) {
			if (null === otherFiber) return otherFiber = otherNode.ownerDocument, otherNode === otherFiber || otherNode === otherFiber.documentElement || otherNode === otherFiber.body;
			a: {
				otherFiber = fragmentFiber;
				for (fragmentFiber = getFragmentParentInstanceOrContainerFiber(fragmentFiber); null !== otherFiber;) {
					if (!(5 !== otherFiber.tag && 3 !== otherFiber.tag && 27 !== otherFiber.tag || otherFiber !== fragmentFiber && otherFiber.alternate !== fragmentFiber)) {
						otherFiber = !0;
						break a;
					}
					otherFiber = otherFiber.return;
				}
				otherFiber = !1;
			}
			return otherFiber;
		}
		return documentPosition & Node.DOCUMENT_POSITION_PRECEDING ? ((fragmentFiber = !!otherFiber) && !(fragmentFiber = otherFiber === precedingBoundaryFiber) && (fragmentFiber = getLowestCommonAncestor(precedingBoundaryFiber, otherFiber, getParentForFragmentAncestors), null === fragmentFiber ? fragmentFiber = !1 : (traverseVisibleInstancesAndTextInstances(fragmentFiber, !0, isFiberPrecedingCheck, otherFiber, precedingBoundaryFiber), otherFiber = searchTarget, searchTarget = null, fragmentFiber = null !== otherFiber)), fragmentFiber) : documentPosition & Node.DOCUMENT_POSITION_FOLLOWING ? ((fragmentFiber = !!otherFiber) && !(fragmentFiber = otherFiber === followingBoundaryFiber) && (fragmentFiber = getLowestCommonAncestor(followingBoundaryFiber, otherFiber, getParentForFragmentAncestors), null === fragmentFiber ? fragmentFiber = !1 : (traverseVisibleInstancesAndTextInstances(fragmentFiber, !0, isFiberFollowingCheck, otherFiber, followingBoundaryFiber), otherFiber = searchTarget, searchBoundary = searchTarget = null, fragmentFiber = null !== otherFiber)), fragmentFiber) : !1;
	}
	function scrollTextNodeIntoView(textNode, resolvedAlignToTop) {
		var range = textNode.ownerDocument.createRange();
		range.selectNodeContents(textNode);
		textNode = range.getBoundingClientRect();
		window.scrollTo(window.scrollX + textNode.left, resolvedAlignToTop ? window.scrollY + textNode.top : window.scrollY + textNode.bottom - window.innerHeight);
	}
	FragmentInstance.prototype.scrollIntoView = function(alignToTop) {
		if ("object" === typeof alignToTop) throw Error(formatProdErrorMessage(566));
		var children = [];
		traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, !1, collectChildren, children, void 0, void 0);
		var resolvedAlignToTop = !1 !== alignToTop;
		if (0 === children.length) {
			var hostSiblings = getFragmentInstanceOrTextInstanceSiblings(this._fragmentFiber);
			hostSiblings = resolvedAlignToTop ? hostSiblings[1] || hostSiblings[0] || getFragmentParentInstanceOrContainerFiber(this._fragmentFiber) : hostSiblings[0] || hostSiblings[1];
			if (null === hostSiblings) return;
			if (6 === hostSiblings.tag) {
				alignToTop = getInstanceFromHostFiber(hostSiblings);
				scrollTextNodeIntoView(alignToTop, resolvedAlignToTop);
				return;
			}
			hostSiblings = getInstanceFromHostFiber(hostSiblings);
			if (9 !== hostSiblings.nodeType) {
				if (11 === hostSiblings.nodeType) {
					resolvedAlignToTop = "host" in hostSiblings ? hostSiblings.host : null;
					null !== resolvedAlignToTop && resolvedAlignToTop.scrollIntoView(alignToTop);
					return;
				}
				hostSiblings.scrollIntoView(alignToTop);
			}
		}
		for (hostSiblings = resolvedAlignToTop ? children.length - 1 : 0; hostSiblings !== (resolvedAlignToTop ? -1 : children.length);) {
			var child = children[hostSiblings];
			6 === child.tag ? (child = getInstanceFromHostFiber(child), scrollTextNodeIntoView(child, resolvedAlignToTop)) : getInstanceFromHostFiber(child).scrollIntoView(alignToTop);
			hostSiblings += resolvedAlignToTop ? -1 : 1;
		}
	};
	function addFragmentHandleToFiber(child, fragmentInstance) {
		child = getInstanceFromHostFiber(child);
		addFragmentHandleToInstance(child, fragmentInstance);
		return !1;
	}
	function addFragmentHandleToInstance(instance, fragmentInstance) {
		instance.reactFragments ?? (instance.reactFragments = /* @__PURE__ */ new Set());
		instance.reactFragments.add(fragmentInstance);
	}
	function commitNewChildToFragmentInstance(childInstance, fragmentInstance) {
		var eventListeners = fragmentInstance._eventListeners;
		if (null !== eventListeners) for (var i$jscomp$0 = 0; i$jscomp$0 < eventListeners.length; i$jscomp$0++) {
			var _eventListeners$i3 = eventListeners[i$jscomp$0];
			childInstance.addEventListener(_eventListeners$i3.type, _eventListeners$i3.attachedListener, getAttachOptions(_eventListeners$i3.optionsOrUseCapture));
		}
		3 !== childInstance.nodeType && (eventListeners = fragmentInstance._observers, null !== eventListeners && eventListeners.forEach(function(observer) {
			for (var writeIdx = 0, i = 0; i < pendingIntersectionUnobserves.length; i++) {
				var pending = pendingIntersectionUnobserves[i];
				if (pending.fragmentInstance !== fragmentInstance || pending.observer !== observer || pending.instance !== childInstance) pendingIntersectionUnobserves[writeIdx++] = pending;
			}
			pendingIntersectionUnobserves.length = writeIdx;
			observer.observe(childInstance);
		}), addFragmentHandleToInstance(childInstance, fragmentInstance));
	}
	function deleteChildFromFragmentInstance(childInstance, fragmentInstance) {
		var eventListeners = fragmentInstance._eventListeners;
		if (null !== eventListeners) for (var i = 0; i < eventListeners.length; i++) {
			var _eventListeners$i4 = eventListeners[i];
			childInstance.removeEventListener(_eventListeners$i4.type, _eventListeners$i4.attachedListener, getAttachOptions(_eventListeners$i4.optionsOrUseCapture));
		}
		3 !== childInstance.nodeType && (eventListeners = fragmentInstance._observers, null !== eventListeners && eventListeners.forEach(function(observer) {
			"string" === typeof observer.rootMargin ? schedulePendingIntersectionUnobserve(fragmentInstance, observer, childInstance) : observer.unobserve(childInstance);
		}), null != childInstance.reactFragments && childInstance.reactFragments.delete(fragmentInstance));
	}
	function clearContainerSparingly(container) {
		var nextNode = container.firstChild;
		nextNode && 10 === nextNode.nodeType && (nextNode = nextNode.nextSibling);
		for (; nextNode;) {
			var node = nextNode;
			nextNode = nextNode.nextSibling;
			switch (node.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					clearContainerSparingly(node);
					detachDeletedInstance(node);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if ("stylesheet" === node.rel.toLowerCase()) continue;
			}
			container.removeChild(node);
		}
	}
	function canHydrateInstance(instance, type, props, inRootOrSingleton) {
		for (; 1 === instance.nodeType;) {
			var anyProps = props;
			if (instance.nodeName.toLowerCase() !== type.toLowerCase()) {
				if (!inRootOrSingleton && ("INPUT" !== instance.nodeName || "hidden" !== instance.type)) break;
			} else if (!inRootOrSingleton) if ("input" === type && "hidden" === instance.type) {
				var name = null == anyProps.name ? null : "" + anyProps.name;
				if ("hidden" === anyProps.type && instance.getAttribute("name") === name) return instance;
			} else return instance;
			else if (!instance[internalHoistableMarker]) switch (type) {
				case "meta":
					if (!instance.hasAttribute("itemprop")) break;
					return instance;
				case "link":
					name = instance.getAttribute("rel");
					if ("stylesheet" === name && instance.hasAttribute("data-precedence")) break;
					else if (name !== anyProps.rel || instance.getAttribute("href") !== (null == anyProps.href || "" === anyProps.href ? null : anyProps.href) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin) || instance.getAttribute("title") !== (null == anyProps.title ? null : anyProps.title)) break;
					return instance;
				case "style":
					if (instance.hasAttribute("data-precedence")) break;
					return instance;
				case "script":
					name = instance.getAttribute("src");
					if ((name !== (null == anyProps.src ? null : anyProps.src) || instance.getAttribute("type") !== (null == anyProps.type ? null : anyProps.type) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin)) && name && instance.hasAttribute("async") && !instance.hasAttribute("itemprop")) break;
					return instance;
				default: return instance;
			}
			instance = getNextHydratable(instance.nextSibling);
			if (null === instance) break;
		}
		return null;
	}
	function canHydrateTextInstance(instance, text, inRootOrSingleton) {
		if ("" === text) return null;
		for (; 3 !== instance.nodeType;) {
			if ((1 !== instance.nodeType || "INPUT" !== instance.nodeName || "hidden" !== instance.type) && !inRootOrSingleton) return null;
			instance = getNextHydratable(instance.nextSibling);
			if (null === instance) return null;
		}
		return instance;
	}
	function canHydrateHydrationBoundary(instance, inRootOrSingleton) {
		for (; 8 !== instance.nodeType;) {
			if ((1 !== instance.nodeType || "INPUT" !== instance.nodeName || "hidden" !== instance.type) && !inRootOrSingleton) return null;
			instance = getNextHydratable(instance.nextSibling);
			if (null === instance) return null;
		}
		return instance;
	}
	function isSuspenseInstancePending(instance) {
		return "$?" === instance.data || "$~" === instance.data;
	}
	function isSuspenseInstanceFallback(instance) {
		return "$!" === instance.data || "$?" === instance.data && "loading" !== instance.ownerDocument.readyState;
	}
	function registerSuspenseInstanceRetry(instance, callback) {
		var ownerDocument = instance.ownerDocument;
		if ("$~" === instance.data) instance._reactRetry = callback;
		else if ("$?" !== instance.data || "loading" !== ownerDocument.readyState) callback();
		else {
			var listener = function() {
				callback();
				ownerDocument.removeEventListener("DOMContentLoaded", listener);
			};
			ownerDocument.addEventListener("DOMContentLoaded", listener);
			instance._reactRetry = listener;
		}
	}
	function getNextHydratable(node) {
		for (; null != node; node = node.nextSibling) {
			var nodeType = node.nodeType;
			if (1 === nodeType || 3 === nodeType) break;
			if (8 === nodeType) {
				nodeType = node.data;
				if ("$" === nodeType || "$!" === nodeType || "$?" === nodeType || "$~" === nodeType || "&" === nodeType || "F!" === nodeType || "F" === nodeType) break;
				if ("/$" === nodeType || "/&" === nodeType) return null;
			}
		}
		return node;
	}
	var previousHydratableOnEnteringScopedSingleton = null;
	function getNextHydratableInstanceAfterHydrationBoundary(hydrationInstance) {
		hydrationInstance = hydrationInstance.nextSibling;
		for (var depth = 0; hydrationInstance;) {
			if (8 === hydrationInstance.nodeType) {
				var data = hydrationInstance.data;
				if ("/$" === data || "/&" === data) {
					if (0 === depth) return getNextHydratable(hydrationInstance.nextSibling);
					depth--;
				} else "$" !== data && "$!" !== data && "$?" !== data && "$~" !== data && "&" !== data || depth++;
			}
			hydrationInstance = hydrationInstance.nextSibling;
		}
		return null;
	}
	function getParentHydrationBoundary(targetInstance) {
		targetInstance = targetInstance.previousSibling;
		for (var depth = 0; targetInstance;) {
			if (8 === targetInstance.nodeType) {
				var data = targetInstance.data;
				if ("$" === data || "$!" === data || "$?" === data || "$~" === data || "&" === data) {
					if (0 === depth) return targetInstance;
					depth--;
				} else "/$" !== data && "/&" !== data || depth++;
			}
			targetInstance = targetInstance.previousSibling;
		}
		return null;
	}
	function setFocusIfFocusable(node, focusOptions) {
		function handleFocus() {
			didFocus = !0;
		}
		if (node.ownerDocument.activeElement === node) return !0;
		var didFocus = !1;
		try {
			node.ownerDocument.addEventListener("focus", handleFocus, !0), (node.focus || HTMLElement.prototype.focus).call(node, focusOptions);
		} finally {
			node.ownerDocument.removeEventListener("focus", handleFocus, !0);
		}
		return didFocus;
	}
	function requestPostPaintCallback(callback) {
		localRequestAnimationFrame(function() {
			localRequestAnimationFrame(function(time) {
				return callback(time);
			});
		});
	}
	function resolveSingletonInstance(type, props, rootContainerInstance) {
		props = getOwnerDocumentFromRootContainer(rootContainerInstance);
		switch (type) {
			case "html":
				type = props.documentElement;
				if (!type) throw Error(formatProdErrorMessage(452));
				return type;
			case "head":
				type = props.head;
				if (!type) throw Error(formatProdErrorMessage(453));
				return type;
			case "body":
				type = props.body;
				if (!type) throw Error(formatProdErrorMessage(454));
				return type;
			default: throw Error(formatProdErrorMessage(451));
		}
	}
	function releaseSingletonInstance(instance, type, props) {
		for (var propKey in props) {
			var propValue = props[propKey];
			props.hasOwnProperty(propKey) && null != propValue && setProp(instance, type, propKey, null, emptyProps, propValue);
		}
		null != props.dangerouslySetInnerHTML && (instance.textContent = "");
		instance.onclick === noop$1 && (instance.onclick = null);
		detachDeletedInstance(instance);
	}
	function clearSingletonPreambleContribution(instance) {
		for (var attributes = instance.attributes; attributes.length;) instance.removeAttributeNode(attributes[0]);
		detachDeletedInstance(instance);
	}
	var preloadPropsMap = /* @__PURE__ */ new Map();
	var preconnectsSet = /* @__PURE__ */ new Set();
	function getHoistableRoot(container) {
		if ("function" === typeof container.getRootNode) {
			var rootNode = container.getRootNode();
			if (9 === rootNode.nodeType || 11 === rootNode.nodeType) return rootNode;
		}
		return 9 === container.nodeType ? container : container.ownerDocument;
	}
	var previousDispatcher = ReactDOMSharedInternals.d;
	ReactDOMSharedInternals.d = {
		f: flushSyncWork,
		r: requestFormReset,
		D: prefetchDNS,
		C: preconnect,
		L: preload,
		m: preloadModule,
		X: preinitScript,
		S: preinitStyle,
		M: preinitModuleScript
	};
	function flushSyncWork() {
		var previousWasRendering = previousDispatcher.f(), wasRendering = flushSyncWork$1();
		return previousWasRendering || wasRendering;
	}
	function requestFormReset(form) {
		var formInst = getInstanceFromNode(form);
		null !== formInst && 5 === formInst.tag && "form" === formInst.type ? requestFormReset$1(formInst) : previousDispatcher.r(form);
	}
	var globalDocument = "undefined" === typeof document ? null : document;
	function preconnectAs(rel, href, crossOrigin) {
		var ownerDocument = globalDocument;
		if (ownerDocument && "string" === typeof href && href) {
			var limitedEscapedHref = escapeSelectorAttributeValueInsideDoubleQuotes(href);
			limitedEscapedHref = "link[rel=\"" + rel + "\"][href=\"" + limitedEscapedHref + "\"]";
			"string" === typeof crossOrigin && (limitedEscapedHref += "[crossorigin=\"" + crossOrigin + "\"]");
			preconnectsSet.has(limitedEscapedHref) || (preconnectsSet.add(limitedEscapedHref), rel = {
				rel,
				crossOrigin,
				href
			}, null === ownerDocument.querySelector(limitedEscapedHref) && (href = ownerDocument.createElement("link"), setInitialProperties(href, "link", rel), markNodeAsHoistable(href), ownerDocument.head.appendChild(href)));
		}
	}
	function prefetchDNS(href) {
		previousDispatcher.D(href);
		preconnectAs("dns-prefetch", href, null);
	}
	function preconnect(href, crossOrigin) {
		previousDispatcher.C(href, crossOrigin);
		preconnectAs("preconnect", href, crossOrigin);
	}
	function preload(href, as, options) {
		previousDispatcher.L(href, as, options);
		var ownerDocument = globalDocument;
		if (ownerDocument && href && as) {
			var preloadSelector = "link[rel=\"preload\"][as=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(as) + "\"]";
			"image" === as ? options && options.imageSrcSet ? (preloadSelector += "[imagesrcset=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(options.imageSrcSet) + "\"]", "string" === typeof options.imageSizes && (preloadSelector += "[imagesizes=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(options.imageSizes) + "\"]")) : preloadSelector += "[href=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(href) + "\"]" : preloadSelector += "[href=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(href) + "\"]";
			var key = preloadSelector;
			switch (as) {
				case "style":
					key = getStyleKey(href);
					break;
				case "script": key = getScriptKey(href);
			}
			if (!(preloadPropsMap.has(key) || (href = assign({
				rel: "preload",
				href: "image" === as && options && options.imageSrcSet ? void 0 : href,
				as
			}, options), preloadPropsMap.set(key, href), null !== ownerDocument.querySelector(preloadSelector) || "style" === as && ownerDocument.querySelector(getStylesheetSelectorFromKey(key)) || "script" === as && ownerDocument.querySelector(getScriptSelectorFromKey(key))))) {
				var instance = ownerDocument.createElement("link");
				setInitialProperties(instance, "link", href);
				"style" === as && (instance[internalLoadPendingKey] = !0, instance.onload = instance.onerror = function() {
					clearPendingLoadOnNode(instance);
				});
				markNodeAsHoistable(instance);
				ownerDocument.head.appendChild(instance);
			}
		}
	}
	function preloadModule(href, options) {
		previousDispatcher.m(href, options);
		var ownerDocument = globalDocument;
		if (ownerDocument && href) {
			var as = options && "string" === typeof options.as ? options.as : "script", preloadSelector = "link[rel=\"modulepreload\"][as=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(as) + "\"][href=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(href) + "\"]", key = preloadSelector;
			switch (as) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": key = getScriptKey(href);
			}
			if (!preloadPropsMap.has(key) && (href = assign({
				rel: "modulepreload",
				href
			}, options), preloadPropsMap.set(key, href), null === ownerDocument.querySelector(preloadSelector))) {
				switch (as) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (ownerDocument.querySelector(getScriptSelectorFromKey(key))) return;
				}
				as = ownerDocument.createElement("link");
				setInitialProperties(as, "link", href);
				markNodeAsHoistable(as);
				ownerDocument.head.appendChild(as);
			}
		}
	}
	function preinitStyle(href, precedence, options) {
		previousDispatcher.S(href, precedence, options);
		var ownerDocument = globalDocument;
		if (ownerDocument && href) {
			var styles = getResourcesFromRoot(ownerDocument).hoistableStyles, key = getStyleKey(href);
			precedence = precedence || "default";
			var resource = styles.get(key);
			if (!resource) {
				var state = {
					loading: 0,
					preload: null
				};
				if (resource = ownerDocument.querySelector(getStylesheetSelectorFromKey(key))) state.loading = 5;
				else {
					href = assign({
						rel: "stylesheet",
						href,
						"data-precedence": precedence
					}, options);
					(options = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(href, options);
					var link = resource = ownerDocument.createElement("link");
					markNodeAsHoistable(link);
					setInitialProperties(link, "link", href);
					link._p = new Promise(function(resolve, reject) {
						link.onload = resolve;
						link.onerror = reject;
					});
					link.addEventListener("load", function() {
						state.loading |= 1;
					});
					link.addEventListener("error", function() {
						state.loading |= 2;
					});
					state.loading |= 4;
					insertStylesheet(resource, precedence, ownerDocument);
				}
				resource = {
					type: "stylesheet",
					instance: resource,
					count: 1,
					state
				};
				styles.set(key, resource);
			}
		}
	}
	function preinitScript(src, options) {
		previousDispatcher.X(src, options);
		var ownerDocument = globalDocument;
		if (ownerDocument && src) {
			var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
			resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({
				src,
				async: !0
			}, options), (options = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
				type: "script",
				instance: resource,
				count: 1,
				state: null
			}, scripts.set(key, resource));
		}
	}
	function preinitModuleScript(src, options) {
		previousDispatcher.M(src, options);
		var ownerDocument = globalDocument;
		if (ownerDocument && src) {
			var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
			resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({
				src,
				async: !0,
				type: "module"
			}, options), (options = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
				type: "script",
				instance: resource,
				count: 1,
				state: null
			}, scripts.set(key, resource));
		}
	}
	function getResource(type, currentProps, pendingProps, currentResource) {
		var JSCompiler_inline_result = (JSCompiler_inline_result = rootInstanceStackCursor.current) ? getHoistableRoot(JSCompiler_inline_result) : null;
		if (!JSCompiler_inline_result) throw Error(formatProdErrorMessage(446));
		switch (type) {
			case "meta":
			case "title": return null;
			case "style": return "string" === typeof pendingProps.precedence && "string" === typeof pendingProps.href ? (pendingProps = getStyleKey(pendingProps.href), currentProps = getResourcesFromRoot(JSCompiler_inline_result).hoistableStyles, currentResource = currentProps.get(pendingProps), currentResource || (currentResource = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, currentProps.set(pendingProps, currentResource)), currentResource) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if ("stylesheet" === pendingProps.rel && "string" === typeof pendingProps.href && "string" === typeof pendingProps.precedence) {
					type = getStyleKey(pendingProps.href);
					var styles$268 = getResourcesFromRoot(JSCompiler_inline_result).hoistableStyles, resource$269 = styles$268.get(type);
					resource$269 || (JSCompiler_inline_result = JSCompiler_inline_result.ownerDocument || JSCompiler_inline_result, resource$269 = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, styles$268.set(type, resource$269), (styles$268 = JSCompiler_inline_result.querySelector(getStylesheetSelectorFromKey(type))) ? styles$268._p || (resource$269.instance = styles$268, resource$269.state.loading = 5) : (styles$268 = preloadPropsMap.get(type), styles$268 || (styles$268 = {
						rel: "preload",
						as: "style",
						href: pendingProps.href,
						crossOrigin: pendingProps.crossOrigin,
						integrity: pendingProps.integrity,
						media: pendingProps.media,
						hrefLang: pendingProps.hrefLang,
						referrerPolicy: pendingProps.referrerPolicy
					}, preloadPropsMap.set(type, styles$268)), preloadStylesheet(JSCompiler_inline_result, type, styles$268, resource$269.state)));
					if (currentProps && null === currentResource) throw Error(formatProdErrorMessage(528, ""));
					return resource$269;
				}
				if (currentProps && null !== currentResource) throw Error(formatProdErrorMessage(529, ""));
				return null;
			case "script": return currentProps = pendingProps.async, pendingProps = pendingProps.src, "string" === typeof pendingProps && currentProps && "function" !== typeof currentProps && "symbol" !== typeof currentProps ? (pendingProps = getScriptKey(pendingProps), currentProps = getResourcesFromRoot(JSCompiler_inline_result).hoistableScripts, currentResource = currentProps.get(pendingProps), currentResource || (currentResource = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, currentProps.set(pendingProps, currentResource)), currentResource) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(formatProdErrorMessage(444, type));
		}
	}
	function getStyleKey(href) {
		return "href=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(href) + "\"";
	}
	function getStylesheetSelectorFromKey(key) {
		return "link[rel=\"stylesheet\"][" + key + "]";
	}
	function stylesheetPropsFromRawProps(rawProps) {
		return assign({}, rawProps, {
			"data-precedence": rawProps.precedence,
			precedence: null
		});
	}
	function preloadStylesheet(ownerDocument, key, preloadProps, state) {
		if (key = ownerDocument.querySelector("link[rel=\"preload\"][as=\"style\"][" + key + "]")) {
			if (!0 !== key[internalLoadPendingKey]) {
				state.loading = 1;
				return;
			}
		} else key = ownerDocument.createElement("link"), key[internalLoadPendingKey] = !0, key.onload = key.onerror = clearPendingLoadOnNode.bind(null, key), setInitialProperties(key, "link", preloadProps), markNodeAsHoistable(key), ownerDocument.head.appendChild(key);
		state.preload = key;
		key.addEventListener("load", function() {
			return state.loading |= 1;
		});
		key.addEventListener("error", function() {
			return state.loading |= 2;
		});
	}
	function getScriptKey(src) {
		return "[src=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(src) + "\"]";
	}
	function getScriptSelectorFromKey(key) {
		return "script[async]" + key;
	}
	function acquireResource(hoistableRoot, resource, props) {
		resource.count++;
		if (null === resource.instance) switch (resource.type) {
			case "style":
				var instance = hoistableRoot.querySelector("style[data-href~=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(props.href) + "\"]");
				if (instance) return resource.instance = instance, markNodeAsHoistable(instance), instance;
				var styleProps = assign({}, props, {
					"data-href": props.href,
					"data-precedence": props.precedence,
					href: null,
					precedence: null
				});
				instance = (hoistableRoot.ownerDocument || hoistableRoot).createElement("style");
				markNodeAsHoistable(instance);
				setInitialProperties(instance, "style", styleProps);
				insertStylesheet(instance, props.precedence, hoistableRoot);
				return resource.instance = instance;
			case "stylesheet":
				styleProps = getStyleKey(props.href);
				var instance$274 = hoistableRoot.querySelector(getStylesheetSelectorFromKey(styleProps));
				if (instance$274) return resource.state.loading |= 4, resource.instance = instance$274, markNodeAsHoistable(instance$274), instance$274;
				instance = stylesheetPropsFromRawProps(props);
				(styleProps = preloadPropsMap.get(styleProps)) && adoptPreloadPropsForStylesheet(instance, styleProps);
				instance$274 = (hoistableRoot.ownerDocument || hoistableRoot).createElement("link");
				markNodeAsHoistable(instance$274);
				var linkInstance = instance$274;
				linkInstance._p = new Promise(function(resolve, reject) {
					linkInstance.onload = resolve;
					linkInstance.onerror = reject;
				});
				setInitialProperties(instance$274, "link", instance);
				resource.state.loading |= 4;
				insertStylesheet(instance$274, props.precedence, hoistableRoot);
				return resource.instance = instance$274;
			case "script":
				instance$274 = getScriptKey(props.src);
				if (styleProps = hoistableRoot.querySelector(getScriptSelectorFromKey(instance$274))) return resource.instance = styleProps, markNodeAsHoistable(styleProps), styleProps;
				instance = props;
				if (styleProps = preloadPropsMap.get(instance$274)) instance = assign({}, props), adoptPreloadPropsForScript(instance, styleProps);
				hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
				styleProps = hoistableRoot.createElement("script");
				markNodeAsHoistable(styleProps);
				setInitialProperties(styleProps, "link", instance);
				hoistableRoot.head.appendChild(styleProps);
				return resource.instance = styleProps;
			case "void": return null;
			default: throw Error(formatProdErrorMessage(443, resource.type));
		}
		else "stylesheet" === resource.type && 0 === (resource.state.loading & 4) && (instance = resource.instance, resource.state.loading |= 4, insertStylesheet(instance, props.precedence, hoistableRoot));
		return resource.instance;
	}
	function insertStylesheet(instance, precedence, root) {
		for (var nodes = root.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), last = nodes.length ? nodes[nodes.length - 1] : null, prior = last, i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			if (node.dataset.precedence === precedence) prior = node;
			else if (prior !== last) break;
		}
		prior ? prior.parentNode.insertBefore(instance, prior.nextSibling) : (precedence = 9 === root.nodeType ? root.head : root, precedence.insertBefore(instance, precedence.firstChild));
	}
	function adoptPreloadPropsForStylesheet(stylesheetProps, preloadProps) {
		stylesheetProps.crossOrigin ?? (stylesheetProps.crossOrigin = preloadProps.crossOrigin);
		stylesheetProps.referrerPolicy ?? (stylesheetProps.referrerPolicy = preloadProps.referrerPolicy);
		stylesheetProps.title ?? (stylesheetProps.title = preloadProps.title);
	}
	function adoptPreloadPropsForScript(scriptProps, preloadProps) {
		scriptProps.crossOrigin ?? (scriptProps.crossOrigin = preloadProps.crossOrigin);
		scriptProps.referrerPolicy ?? (scriptProps.referrerPolicy = preloadProps.referrerPolicy);
		scriptProps.integrity ?? (scriptProps.integrity = preloadProps.integrity);
	}
	var tagCaches = null;
	function getHydratableHoistableCache(type, keyAttribute, ownerDocument) {
		if (null === tagCaches) {
			var cache = /* @__PURE__ */ new Map();
			var caches = tagCaches = /* @__PURE__ */ new Map();
			caches.set(ownerDocument, cache);
		} else caches = tagCaches, cache = caches.get(ownerDocument), cache || (cache = /* @__PURE__ */ new Map(), caches.set(ownerDocument, cache));
		if (cache.has(type)) return cache;
		cache.set(type, null);
		ownerDocument = ownerDocument.getElementsByTagName(type);
		for (caches = 0; caches < ownerDocument.length; caches++) {
			var node = ownerDocument[caches];
			if (!(node[internalHoistableMarker] || node[internalInstanceKey] || "link" === type && "stylesheet" === node.getAttribute("rel")) && "http://www.w3.org/2000/svg" !== node.namespaceURI) {
				var nodeKey = node.getAttribute(keyAttribute) || "";
				nodeKey = type + nodeKey;
				var existing = cache.get(nodeKey);
				existing ? existing.push(node) : cache.set(nodeKey, [node]);
			}
		}
		return cache;
	}
	function mountHoistable(hoistableRoot, type, instance) {
		hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
		hoistableRoot.head.insertBefore(instance, "title" === type ? hoistableRoot.querySelector("head > title") : null);
	}
	function isHostHoistableType(type, props, hostContext) {
		if (1 === hostContext || null != props.itemProp) return !1;
		switch (type) {
			case "meta":
			case "title": return !0;
			case "style":
				if ("string" !== typeof props.precedence || "string" !== typeof props.href || "" === props.href) break;
				return !0;
			case "link":
				if ("string" !== typeof props.rel || "string" !== typeof props.href || "" === props.href || props.onLoad || props.onError) break;
				switch (props.rel) {
					case "stylesheet": return type = props.disabled, "string" === typeof props.precedence && null == type;
					default: return !0;
				}
			case "script": if (props.async && "function" !== typeof props.async && "symbol" !== typeof props.async && !props.onLoad && !props.onError && props.src && "string" === typeof props.src) return !0;
		}
		return !1;
	}
	function maySuspendCommit(type, props) {
		return "img" === type && null != props.src && "" !== props.src && null == props.onLoad && "lazy" !== props.loading;
	}
	function preloadResource(resource) {
		return "stylesheet" === resource.type && 0 === (resource.state.loading & 3) ? !1 : !0;
	}
	function estimateImageBytes(instance) {
		return (instance.width || 100) * (instance.height || 100) * ("number" === typeof devicePixelRatio ? devicePixelRatio : 1) * .25;
	}
	function suspendInstance(state, instance) {
		"function" === typeof instance.decode && (state.imgCount++, instance.complete || (state.imgBytes += estimateImageBytes(instance), state.suspenseyImages.push(instance)), state = onUnsuspendImg.bind(state), instance.decode().then(state, state));
	}
	function suspendResource(state, hoistableRoot, resource, props) {
		if ("stylesheet" === resource.type && ("string" !== typeof props.media || !1 !== matchMedia(props.media).matches) && 0 === (resource.state.loading & 4)) {
			if (null === resource.instance) {
				var key = getStyleKey(props.href), instance = hoistableRoot.querySelector(getStylesheetSelectorFromKey(key));
				if (instance) {
					hoistableRoot = instance._p;
					null !== hoistableRoot && "object" === typeof hoistableRoot && "function" === typeof hoistableRoot.then && (state.count++, state = onUnsuspend.bind(state), hoistableRoot.then(state, state));
					resource.state.loading |= 4;
					resource.instance = instance;
					markNodeAsHoistable(instance);
					return;
				}
				instance = hoistableRoot.ownerDocument || hoistableRoot;
				props = stylesheetPropsFromRawProps(props);
				(key = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(props, key);
				instance = instance.createElement("link");
				markNodeAsHoistable(instance);
				var linkInstance = instance;
				linkInstance._p = new Promise(function(resolve, reject) {
					linkInstance.onload = resolve;
					linkInstance.onerror = reject;
				});
				setInitialProperties(instance, "link", props);
				resource.instance = instance;
			}
			null === state.stylesheets && (state.stylesheets = /* @__PURE__ */ new Map());
			state.stylesheets.set(resource, hoistableRoot);
			(hoistableRoot = resource.state.preload) && 0 === (resource.state.loading & 3) && (state.count++, resource = onUnsuspend.bind(state), hoistableRoot.addEventListener("load", resource), hoistableRoot.addEventListener("error", resource));
		}
	}
	var estimatedBytesWithinLimit = 0;
	function waitForCommitToBeReady(state, timeoutOffset) {
		state.stylesheets && 0 === state.count && insertSuspendedStylesheets(state, state.stylesheets);
		return 0 < state.count || 0 < state.imgCount ? function(commit) {
			var stylesheetTimer = setTimeout(function() {
				state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets);
				if (state.unsuspend) {
					var unsuspend = state.unsuspend;
					state.unsuspend = null;
					unsuspend();
				}
			}, 6e4 + timeoutOffset);
			0 < state.imgBytes && 0 === estimatedBytesWithinLimit && (estimatedBytesWithinLimit = 62500 * estimateBandwidth());
			var imgTimer = setTimeout(function() {
				state.waitingForImages = !1;
				if (0 === state.count && (state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets), state.unsuspend)) {
					var unsuspend = state.unsuspend;
					state.unsuspend = null;
					unsuspend();
				}
			}, (state.imgBytes > estimatedBytesWithinLimit ? 50 : 800) + timeoutOffset);
			state.unsuspend = commit;
			return function() {
				state.unsuspend = null;
				clearTimeout(stylesheetTimer);
				clearTimeout(imgTimer);
			};
		} : null;
	}
	function checkIfFullyUnsuspended(state) {
		if (0 === state.count && (0 === state.imgCount || !state.waitingForImages)) {
			if (state.stylesheets) insertSuspendedStylesheets(state, state.stylesheets);
			else if (state.unsuspend) {
				var unsuspend = state.unsuspend;
				state.unsuspend = null;
				unsuspend();
			}
		}
	}
	function onUnsuspend() {
		this.count--;
		checkIfFullyUnsuspended(this);
	}
	function onUnsuspendImg() {
		this.imgCount--;
		checkIfFullyUnsuspended(this);
	}
	var precedencesByRoot = null;
	function insertSuspendedStylesheets(state, resources) {
		state.stylesheets = null;
		null !== state.unsuspend && (state.count++, precedencesByRoot = /* @__PURE__ */ new Map(), resources.forEach(insertStylesheetIntoRoot, state), precedencesByRoot = null, onUnsuspend.call(state));
	}
	function insertStylesheetIntoRoot(root, resource) {
		if (!(resource.state.loading & 4)) {
			var precedences = precedencesByRoot.get(root);
			if (precedences) var last = precedences.get(null);
			else {
				precedences = /* @__PURE__ */ new Map();
				precedencesByRoot.set(root, precedences);
				for (var nodes = root.querySelectorAll("link[data-precedence],style[data-precedence]"), i = 0; i < nodes.length; i++) {
					var node = nodes[i];
					if ("LINK" === node.nodeName || "not all" !== node.getAttribute("media")) precedences.set(node.dataset.precedence, node), last = node;
				}
				last && precedences.set(null, last);
			}
			nodes = resource.instance;
			node = nodes.getAttribute("data-precedence");
			i = precedences.get(node) || last;
			i === last && precedences.set(null, nodes);
			precedences.set(node, nodes);
			this.count++;
			last = onUnsuspend.bind(this);
			nodes.addEventListener("load", last);
			nodes.addEventListener("error", last);
			i ? i.parentNode.insertBefore(nodes, i.nextSibling) : (root = 9 === root.nodeType ? root.head : root, root.insertBefore(nodes, root.firstChild));
			resource.state.loading |= 4;
		}
	}
	var HostTransitionContext = {
		$$typeof: REACT_CONTEXT_TYPE,
		Provider: null,
		Consumer: null,
		_currentValue: sharedNotPendingObject,
		_currentValue2: sharedNotPendingObject,
		_threadCount: 0
	};
	function FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, formState) {
		this.tag = 1;
		this.containerInfo = containerInfo;
		this.pingCache = this.current = this.pendingChildren = null;
		this.timeoutHandle = -1;
		this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null;
		this.callbackPriority = 0;
		this.expirationTimes = createLaneMap(-1);
		this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
		this.entanglements = createLaneMap(0);
		this.hiddenUpdates = createLaneMap(null);
		this.identifierPrefix = identifierPrefix;
		this.onUncaughtError = onUncaughtError;
		this.onCaughtError = onCaughtError;
		this.onRecoverableError = onRecoverableError;
		this.pooledCache = null;
		this.pooledCacheLanes = 0;
		this.formState = formState;
		this.transitionTypes = null;
		this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, identifierPrefix, formState, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator) {
		containerInfo = new FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, formState);
		tag = 1;
		!0 === isStrictMode && (tag |= 24);
		isStrictMode = createFiberImplClass(3, null, null, tag);
		containerInfo.current = isStrictMode;
		isStrictMode.stateNode = containerInfo;
		tag = createCache();
		tag.refCount++;
		containerInfo.pooledCache = tag;
		tag.refCount++;
		isStrictMode.memoizedState = {
			element: initialChildren,
			isDehydrated: hydrate,
			cache: tag
		};
		initializeUpdateQueue(isStrictMode);
		return containerInfo;
	}
	function getContextForSubtree(parentComponent) {
		if (!parentComponent) return emptyContextObject;
		parentComponent = emptyContextObject;
		return parentComponent;
	}
	function updateContainerImpl(rootFiber, lane, element, container, parentComponent, callback) {
		parentComponent = getContextForSubtree(parentComponent);
		null === container.context ? container.context = parentComponent : container.pendingContext = parentComponent;
		container = createUpdate(lane);
		container.payload = { element };
		callback = void 0 === callback ? null : callback;
		null !== callback && (container.callback = callback);
		element = enqueueUpdate(rootFiber, container, lane);
		null !== element && (scheduleUpdateOnFiber(element, rootFiber, lane), entangleTransitions(element, rootFiber, lane));
	}
	function markRetryLaneImpl(fiber, retryLane) {
		fiber = fiber.memoizedState;
		if (null !== fiber && null !== fiber.dehydrated) {
			var a = fiber.retryLane;
			fiber.retryLane = 0 !== a && a < retryLane ? a : retryLane;
		}
	}
	function markRetryLaneIfNotHydrated(fiber, retryLane) {
		markRetryLaneImpl(fiber, retryLane);
		(fiber = fiber.alternate) && markRetryLaneImpl(fiber, retryLane);
	}
	function attemptContinuousHydration(fiber) {
		if (13 === fiber.tag || 31 === fiber.tag) {
			var root = enqueueConcurrentRenderForLane(fiber, 67108864);
			null !== root && scheduleUpdateOnFiber(root, fiber, 67108864);
			markRetryLaneIfNotHydrated(fiber, 67108864);
		}
	}
	function attemptHydrationAtCurrentPriority(fiber) {
		if (13 === fiber.tag || 31 === fiber.tag) {
			var lane = requestUpdateLane();
			lane = getBumpedLaneForHydrationByLane(lane);
			var root = enqueueConcurrentRenderForLane(fiber, lane);
			null !== root && scheduleUpdateOnFiber(root, fiber, lane);
			markRetryLaneIfNotHydrated(fiber, lane);
		}
	}
	var _enabled = !0;
	function dispatchDiscreteEvent(domEventName, eventSystemFlags, container, nativeEvent) {
		var prevTransition = ReactSharedInternals.T;
		ReactSharedInternals.T = null;
		var previousPriority = ReactDOMSharedInternals.p;
		try {
			ReactDOMSharedInternals.p = 2, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
		} finally {
			ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
		}
	}
	function dispatchContinuousEvent(domEventName, eventSystemFlags, container, nativeEvent) {
		var prevTransition = ReactSharedInternals.T;
		ReactSharedInternals.T = null;
		var previousPriority = ReactDOMSharedInternals.p;
		try {
			ReactDOMSharedInternals.p = 8, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
		} finally {
			ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
		}
	}
	function dispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent) {
		if (_enabled) {
			var blockedOn = findInstanceBlockingEvent(nativeEvent);
			if (null === blockedOn) dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, return_targetInst, targetContainer), clearIfContinuousEvent(domEventName, nativeEvent);
			else if (queueIfContinuousEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent)) nativeEvent.stopPropagation();
			else if (clearIfContinuousEvent(domEventName, nativeEvent), eventSystemFlags & 4 && -1 < discreteReplayableEvents.indexOf(domEventName)) {
				for (; null !== blockedOn;) {
					var fiber = getInstanceFromNode(blockedOn);
					if (null !== fiber) switch (fiber.tag) {
						case 3:
							fiber = fiber.stateNode;
							if (fiber.current.memoizedState.isDehydrated) {
								var lanes = getHighestPriorityLanes(fiber.pendingLanes);
								if (0 !== lanes) {
									var root = fiber;
									root.pendingLanes |= 2;
									for (root.entangledLanes |= 2; lanes;) {
										var lane = 1 << 31 - clz32(lanes);
										root.entanglements[1] |= lane;
										lanes &= ~lane;
									}
									ensureRootIsScheduled(fiber);
									0 === (executionContext & 6) && (workInProgressRootRenderTargetTime = now() + 500, flushSyncWorkAcrossRoots_impl(0, !1));
								}
							}
							break;
						case 31:
						case 13: root = enqueueConcurrentRenderForLane(fiber, 2), null !== root && scheduleUpdateOnFiber(root, fiber, 2), flushSyncWork$1(), markRetryLaneIfNotHydrated(fiber, 2);
					}
					fiber = findInstanceBlockingEvent(nativeEvent);
					null === fiber && dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, return_targetInst, targetContainer);
					if (fiber === blockedOn) break;
					blockedOn = fiber;
				}
				null !== blockedOn && nativeEvent.stopPropagation();
			} else dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, null, targetContainer);
		}
	}
	function findInstanceBlockingEvent(nativeEvent) {
		nativeEvent = getEventTarget(nativeEvent);
		return findInstanceBlockingTarget(nativeEvent);
	}
	var return_targetInst = null;
	function findInstanceBlockingTarget(targetNode) {
		return_targetInst = null;
		targetNode = getClosestInstanceFromNode(targetNode);
		if (null !== targetNode) {
			var nearestMounted = getNearestMountedFiber(targetNode);
			if (null === nearestMounted) targetNode = null;
			else {
				var tag = nearestMounted.tag;
				if (13 === tag) {
					targetNode = getSuspenseInstanceFromFiber(nearestMounted);
					if (null !== targetNode) return targetNode;
					targetNode = null;
				} else if (31 === tag) {
					targetNode = getActivityInstanceFromFiber(nearestMounted);
					if (null !== targetNode) return targetNode;
					targetNode = null;
				} else if (3 === tag) {
					if (nearestMounted.stateNode.current.memoizedState.isDehydrated) return 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
					targetNode = null;
				} else nearestMounted !== targetNode && (targetNode = null);
			}
		}
		return_targetInst = targetNode;
		return null;
	}
	function getEventPriority(domEventName) {
		switch (domEventName) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "fullscreenerror":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "resize":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (getCurrentPriorityLevel()) {
				case ImmediatePriority: return 2;
				case UserBlockingPriority: return 8;
				case NormalPriority$1:
				case LowPriority: return 32;
				case IdlePriority: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var hasScheduledReplayAttempt = !1;
	var queuedFocus = null;
	var queuedDrag = null;
	var queuedMouse = null;
	var queuedPointers = /* @__PURE__ */ new Map();
	var queuedPointerCaptures = /* @__PURE__ */ new Map();
	var queuedExplicitHydrationTargets = [];
	var discreteReplayableEvents = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function clearIfContinuousEvent(domEventName, nativeEvent) {
		switch (domEventName) {
			case "focusin":
			case "focusout":
				queuedFocus = null;
				break;
			case "dragenter":
			case "dragleave":
				queuedDrag = null;
				break;
			case "mouseover":
			case "mouseout":
				queuedMouse = null;
				break;
			case "pointerover":
			case "pointerout":
				queuedPointers.delete(nativeEvent.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": queuedPointerCaptures.delete(nativeEvent.pointerId);
		}
	}
	function accumulateOrCreateContinuousQueuedReplayableEvent(existingQueuedEvent, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
		if (null === existingQueuedEvent || existingQueuedEvent.nativeEvent !== nativeEvent) return existingQueuedEvent = {
			blockedOn,
			domEventName,
			eventSystemFlags,
			nativeEvent,
			targetContainers: [targetContainer]
		}, null !== blockedOn && (blockedOn = getInstanceFromNode(blockedOn), null !== blockedOn && attemptContinuousHydration(blockedOn)), existingQueuedEvent;
		existingQueuedEvent.eventSystemFlags |= eventSystemFlags;
		blockedOn = existingQueuedEvent.targetContainers;
		null !== targetContainer && -1 === blockedOn.indexOf(targetContainer) && blockedOn.push(targetContainer);
		return existingQueuedEvent;
	}
	function queueIfContinuousEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
		switch (domEventName) {
			case "focusin": return queuedFocus = accumulateOrCreateContinuousQueuedReplayableEvent(queuedFocus, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent), !0;
			case "dragenter": return queuedDrag = accumulateOrCreateContinuousQueuedReplayableEvent(queuedDrag, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent), !0;
			case "mouseover": return queuedMouse = accumulateOrCreateContinuousQueuedReplayableEvent(queuedMouse, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent), !0;
			case "pointerover":
				var pointerId = nativeEvent.pointerId;
				queuedPointers.set(pointerId, accumulateOrCreateContinuousQueuedReplayableEvent(queuedPointers.get(pointerId) || null, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent));
				return !0;
			case "gotpointercapture": return pointerId = nativeEvent.pointerId, queuedPointerCaptures.set(pointerId, accumulateOrCreateContinuousQueuedReplayableEvent(queuedPointerCaptures.get(pointerId) || null, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent)), !0;
		}
		return !1;
	}
	function attemptExplicitHydrationTarget(queuedTarget) {
		var targetInst = getClosestInstanceFromNode(queuedTarget.target);
		if (null !== targetInst) {
			var nearestMounted = getNearestMountedFiber(targetInst);
			if (null !== nearestMounted) {
				if (targetInst = nearestMounted.tag, 13 === targetInst) {
					if (targetInst = getSuspenseInstanceFromFiber(nearestMounted), null !== targetInst) {
						queuedTarget.blockedOn = targetInst;
						runWithPriority(queuedTarget.priority, function() {
							attemptHydrationAtCurrentPriority(nearestMounted);
						});
						return;
					}
				} else if (31 === targetInst) {
					if (targetInst = getActivityInstanceFromFiber(nearestMounted), null !== targetInst) {
						queuedTarget.blockedOn = targetInst;
						runWithPriority(queuedTarget.priority, function() {
							attemptHydrationAtCurrentPriority(nearestMounted);
						});
						return;
					}
				} else if (3 === targetInst && nearestMounted.stateNode.current.memoizedState.isDehydrated) {
					queuedTarget.blockedOn = 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
					return;
				}
			}
		}
		queuedTarget.blockedOn = null;
	}
	function attemptReplayContinuousQueuedEvent(queuedEvent) {
		if (null !== queuedEvent.blockedOn) return !1;
		for (var targetContainers = queuedEvent.targetContainers; 0 < targetContainers.length;) {
			var nextBlockedOn = findInstanceBlockingEvent(queuedEvent.nativeEvent);
			if (null === nextBlockedOn) {
				nextBlockedOn = queuedEvent.nativeEvent;
				var nativeEventClone = new nextBlockedOn.constructor(nextBlockedOn.type, nextBlockedOn);
				currentReplayingEvent = nativeEventClone;
				nextBlockedOn.target.dispatchEvent(nativeEventClone);
				currentReplayingEvent = null;
			} else return targetContainers = getInstanceFromNode(nextBlockedOn), null !== targetContainers && attemptContinuousHydration(targetContainers), queuedEvent.blockedOn = nextBlockedOn, !1;
			targetContainers.shift();
		}
		return !0;
	}
	function attemptReplayContinuousQueuedEventInMap(queuedEvent, key, map) {
		attemptReplayContinuousQueuedEvent(queuedEvent) && map.delete(key);
	}
	function replayUnblockedEvents() {
		hasScheduledReplayAttempt = !1;
		null !== queuedFocus && attemptReplayContinuousQueuedEvent(queuedFocus) && (queuedFocus = null);
		null !== queuedDrag && attemptReplayContinuousQueuedEvent(queuedDrag) && (queuedDrag = null);
		null !== queuedMouse && attemptReplayContinuousQueuedEvent(queuedMouse) && (queuedMouse = null);
		queuedPointers.forEach(attemptReplayContinuousQueuedEventInMap);
		queuedPointerCaptures.forEach(attemptReplayContinuousQueuedEventInMap);
	}
	function scheduleCallbackIfUnblocked(queuedEvent, unblocked) {
		queuedEvent.blockedOn === unblocked && (queuedEvent.blockedOn = null, hasScheduledReplayAttempt || (hasScheduledReplayAttempt = !0, Scheduler.unstable_scheduleCallback(Scheduler.unstable_NormalPriority, replayUnblockedEvents)));
	}
	var lastScheduledReplayQueue = null;
	function scheduleReplayQueueIfNeeded(formReplayingQueue) {
		lastScheduledReplayQueue !== formReplayingQueue && (lastScheduledReplayQueue = formReplayingQueue, Scheduler.unstable_scheduleCallback(Scheduler.unstable_NormalPriority, function() {
			lastScheduledReplayQueue === formReplayingQueue && (lastScheduledReplayQueue = null);
			for (var i = 0; i < formReplayingQueue.length; i += 3) {
				var form = formReplayingQueue[i], submitterOrAction = formReplayingQueue[i + 1], formData = formReplayingQueue[i + 2];
				if ("function" !== typeof submitterOrAction) if (null === findInstanceBlockingTarget(submitterOrAction || form)) continue;
				else break;
				var formInst = getInstanceFromNode(form);
				null !== formInst && (formReplayingQueue.splice(i, 3), i -= 3, startHostTransition(formInst, {
					pending: !0,
					data: formData,
					method: form.method,
					action: submitterOrAction
				}, submitterOrAction, formData));
			}
		}));
	}
	function retryIfBlockedOn(unblocked) {
		function unblock(queuedEvent) {
			return scheduleCallbackIfUnblocked(queuedEvent, unblocked);
		}
		null !== queuedFocus && scheduleCallbackIfUnblocked(queuedFocus, unblocked);
		null !== queuedDrag && scheduleCallbackIfUnblocked(queuedDrag, unblocked);
		null !== queuedMouse && scheduleCallbackIfUnblocked(queuedMouse, unblocked);
		queuedPointers.forEach(unblock);
		queuedPointerCaptures.forEach(unblock);
		for (var i = 0; i < queuedExplicitHydrationTargets.length; i++) {
			var queuedTarget = queuedExplicitHydrationTargets[i];
			queuedTarget.blockedOn === unblocked && (queuedTarget.blockedOn = null);
		}
		for (; 0 < queuedExplicitHydrationTargets.length && (i = queuedExplicitHydrationTargets[0], null === i.blockedOn);) attemptExplicitHydrationTarget(i), null === i.blockedOn && queuedExplicitHydrationTargets.shift();
		i = (unblocked.ownerDocument || unblocked).$$reactFormReplay;
		if (null != i) for (queuedTarget = 0; queuedTarget < i.length; queuedTarget += 3) {
			var form = i[queuedTarget], submitterOrAction = i[queuedTarget + 1], formProps = form[internalPropsKey] || null;
			if ("function" === typeof submitterOrAction) formProps || scheduleReplayQueueIfNeeded(i);
			else if (formProps) {
				var action = null;
				if (submitterOrAction && submitterOrAction.hasAttribute("formAction")) {
					if (form = submitterOrAction, formProps = submitterOrAction[internalPropsKey] || null) action = formProps.formAction;
					else if (null !== findInstanceBlockingTarget(form)) continue;
				} else action = formProps.action;
				"function" === typeof action ? i[queuedTarget + 1] = action : (i.splice(queuedTarget, 3), queuedTarget -= 3);
				scheduleReplayQueueIfNeeded(i);
			}
		}
	}
	function defaultOnDefaultTransitionIndicator() {
		function handleNavigate(event) {
			event.canIntercept && "react-transition" === event.info && event.intercept({
				handler: function() {
					return new Promise(function(resolve) {
						return pendingResolve = resolve;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function handleNavigateComplete() {
			null !== pendingResolve && (pendingResolve(), pendingResolve = null);
			isCancelled || setTimeout(startFakeNavigation, 20);
		}
		function startFakeNavigation() {
			if (!isCancelled && !navigation.transition) {
				var currentEntry = navigation.currentEntry;
				currentEntry && null != currentEntry.url && navigation.navigate(currentEntry.url, {
					state: currentEntry.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if ("object" === typeof navigation) {
			var isCancelled = !1, pendingResolve = null;
			navigation.addEventListener("navigate", handleNavigate);
			navigation.addEventListener("navigatesuccess", handleNavigateComplete);
			navigation.addEventListener("navigateerror", handleNavigateComplete);
			setTimeout(startFakeNavigation, 100);
			return function() {
				isCancelled = !0;
				navigation.removeEventListener("navigate", handleNavigate);
				navigation.removeEventListener("navigatesuccess", handleNavigateComplete);
				navigation.removeEventListener("navigateerror", handleNavigateComplete);
				null !== pendingResolve && (pendingResolve(), pendingResolve = null);
			};
		}
	}
	function ReactDOMRoot(internalRoot) {
		this._internalRoot = internalRoot;
	}
	ReactDOMHydrationRoot.prototype.render = ReactDOMRoot.prototype.render = function(children) {
		var root = this._internalRoot;
		if (null === root) throw Error(formatProdErrorMessage(409));
		var current = root.current;
		updateContainerImpl(current, requestUpdateLane(), children, root, null, null);
	};
	ReactDOMHydrationRoot.prototype.unmount = ReactDOMRoot.prototype.unmount = function() {
		var root = this._internalRoot;
		if (null !== root) {
			this._internalRoot = null;
			var container = root.containerInfo;
			updateContainerImpl(root.current, 2, null, root, null, null);
			flushSyncWork$1();
			container[internalContainerInstanceKey] = null;
		}
	};
	function ReactDOMHydrationRoot(internalRoot) {
		this._internalRoot = internalRoot;
	}
	ReactDOMHydrationRoot.prototype.unstable_scheduleHydration = function(target) {
		if (target) {
			var updatePriority = resolveUpdatePriority();
			target = {
				blockedOn: null,
				target,
				priority: updatePriority
			};
			for (var i = 0; i < queuedExplicitHydrationTargets.length && 0 !== updatePriority && updatePriority < queuedExplicitHydrationTargets[i].priority; i++);
			queuedExplicitHydrationTargets.splice(i, 0, target);
			0 === i && attemptExplicitHydrationTarget(target);
		}
	};
	var isomorphicReactPackageVersion$jscomp$inline_2043 = React.version;
	if ("19.3.1" !== isomorphicReactPackageVersion$jscomp$inline_2043) throw Error(formatProdErrorMessage(527, isomorphicReactPackageVersion$jscomp$inline_2043, "19.3.1"));
	ReactDOMSharedInternals.findDOMNode = function(componentOrElement) {
		var fiber = componentOrElement._reactInternals;
		if (void 0 === fiber) {
			if ("function" === typeof componentOrElement.render) throw Error(formatProdErrorMessage(188));
			componentOrElement = Object.keys(componentOrElement).join(",");
			throw Error(formatProdErrorMessage(268, componentOrElement));
		}
		componentOrElement = findCurrentFiberUsingSlowPath(fiber);
		componentOrElement = null !== componentOrElement ? findCurrentHostFiberImpl(componentOrElement) : null;
		componentOrElement = null === componentOrElement ? null : componentOrElement.stateNode;
		return componentOrElement;
	};
	var internals$jscomp$inline_2586 = {
		bundleType: 0,
		version: "19.3.1",
		rendererPackageName: "react-dom",
		currentDispatcherRef: ReactSharedInternals,
		reconcilerVersion: "19.3.1"
	};
	if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
		var hook$jscomp$inline_2587 = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!hook$jscomp$inline_2587.isDisabled && hook$jscomp$inline_2587.supportsFiber) try {
			rendererID = hook$jscomp$inline_2587.inject(internals$jscomp$inline_2586), injectedHook = hook$jscomp$inline_2587;
		} catch (err) {}
	}
	exports.createRoot = function(container, options) {
		if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
		var isStrictMode = !1, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError;
		null !== options && void 0 !== options && (!0 === options.unstable_strictMode && (isStrictMode = !0), void 0 !== options.identifierPrefix && (identifierPrefix = options.identifierPrefix), void 0 !== options.onUncaughtError && (onUncaughtError = options.onUncaughtError), void 0 !== options.onCaughtError && (onCaughtError = options.onCaughtError), void 0 !== options.onRecoverableError && (onRecoverableError = options.onRecoverableError));
		options = createFiberRoot(container, 1, !1, null, null, isStrictMode, identifierPrefix, null, onUncaughtError, onCaughtError, onRecoverableError, defaultOnDefaultTransitionIndicator);
		container[internalContainerInstanceKey] = options.current;
		listenToAllSupportedEvents(container);
		return new ReactDOMRoot(options);
	};
}));
// node_modules/react-dom/client.js
var require_client = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function checkDCE() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") return;
		try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
		} catch (err) {
			console.error(err);
		}
	}
	checkDCE();
	module.exports = require_react_dom_client_production();
}));
// node_modules/lucide-react/dist/esm/shared/src/utils.js
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
var toCamelCase = (string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
var toPascalCase = (string) => {
	const camelCase = toCamelCase(string);
	return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
	return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
var hasA11yProp = (props) => {
	for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
};
// node_modules/lucide-react/dist/esm/defaultAttributes.js
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
};
// node_modules/lucide-react/dist/esm/Icon.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Icon = (0, import_react.forwardRef)(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref) => (0, import_react.createElement)("svg", {
	ref,
	...defaultAttributes,
	width: size,
	height: size,
	stroke: color,
	strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
	className: mergeClasses("lucide", className),
	...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
	...rest
}, [...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)), ...Array.isArray(children) ? children : [children]]));
// node_modules/lucide-react/dist/esm/createLucideIcon.js
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var createLucideIcon = (iconName, iconNode) => {
	const Component = (0, import_react.forwardRef)(({ className, ...props }, ref) => (0, import_react.createElement)(Icon, {
		ref,
		iconNode,
		className: mergeClasses(`lucide-${toKebabCase(toPascalCase(iconName))}`, `lucide-${iconName}`, className),
		...props
	}));
	Component.displayName = toPascalCase(iconName);
	return Component;
};
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArrowRight = createLucideIcon("arrow-right", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "m12 5 7 7-7 7",
	key: "xquz4c"
}]]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Check = createLucideIcon("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ChevronLeft = createLucideIcon("chevron-left", [["path", {
	d: "m15 18-6-6 6-6",
	key: "1wnfg3"
}]]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ChevronRight = createLucideIcon("chevron-right", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleCheck = createLucideIcon("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleQuestionMark = createLucideIcon("circle-question-mark", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
		key: "1u773s"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Clock = createLucideIcon("clock", [["path", {
	d: "M12 6v6l4 2",
	key: "mmk7yg"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}]]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Coins = createLucideIcon("coins", [
	["circle", {
		cx: "8",
		cy: "8",
		r: "6",
		key: "3yglwk"
	}],
	["path", {
		d: "M18.09 10.37A6 6 0 1 1 10.34 18",
		key: "t5s6rm"
	}],
	["path", {
		d: "M7 6h1v4",
		key: "1obek4"
	}],
	["path", {
		d: "m16.71 13.88.7.71-2.82 2.82",
		key: "1rbuyh"
	}]
]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CornerDownLeft = createLucideIcon("corner-down-left", [["path", {
	d: "M20 4v7a4 4 0 0 1-4 4H4",
	key: "6o5b7l"
}], ["path", {
	d: "m9 10-5 5 5 5",
	key: "1kshq7"
}]]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Delete = createLucideIcon("delete", [
	["path", {
		d: "M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z",
		key: "1yo7s0"
	}],
	["path", {
		d: "m12 9 6 6",
		key: "anjzzh"
	}],
	["path", {
		d: "m18 9-6 6",
		key: "1fp51s"
	}]
]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Eraser = createLucideIcon("eraser", [["path", {
	d: "M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21",
	key: "g5wo59"
}], ["path", {
	d: "m5.082 11.09 8.828 8.828",
	key: "1wx5vj"
}]]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var House = createLucideIcon("house", [["path", {
	d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
	key: "5wwlr5"
}], ["path", {
	d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
	key: "r6nss1"
}]]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Keyboard = createLucideIcon("keyboard", [
	["path", {
		d: "M10 8h.01",
		key: "1r9ogq"
	}],
	["path", {
		d: "M12 12h.01",
		key: "1mp3jc"
	}],
	["path", {
		d: "M14 8h.01",
		key: "1primd"
	}],
	["path", {
		d: "M16 12h.01",
		key: "1l6xoz"
	}],
	["path", {
		d: "M18 8h.01",
		key: "emo2bl"
	}],
	["path", {
		d: "M6 8h.01",
		key: "x9i8wu"
	}],
	["path", {
		d: "M7 16h10",
		key: "wp8him"
	}],
	["path", {
		d: "M8 12h.01",
		key: "czm47f"
	}],
	["rect", {
		width: "20",
		height: "16",
		x: "2",
		y: "4",
		rx: "2",
		key: "18n3k1"
	}]
]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Lightbulb = createLucideIcon("lightbulb", [
	["path", {
		d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
		key: "1gvzjb"
	}],
	["path", {
		d: "M9 18h6",
		key: "x1upvd"
	}],
	["path", {
		d: "M10 22h4",
		key: "ceow96"
	}]
]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var List = createLucideIcon("list", [
	["path", {
		d: "M3 5h.01",
		key: "18ugdj"
	}],
	["path", {
		d: "M3 12h.01",
		key: "nlz23k"
	}],
	["path", {
		d: "M3 19h.01",
		key: "noohij"
	}],
	["path", {
		d: "M8 5h13",
		key: "1pao27"
	}],
	["path", {
		d: "M8 12h13",
		key: "1za7za"
	}],
	["path", {
		d: "M8 19h13",
		key: "m83p4d"
	}]
]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Moon = createLucideIcon("moon", [["path", {
	d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
	key: "kfwtm"
}]]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Music = createLucideIcon("music", [
	["path", {
		d: "M9 18V5l12-2v13",
		key: "1jmyc2"
	}],
	["circle", {
		cx: "6",
		cy: "18",
		r: "3",
		key: "fqmcym"
	}],
	["circle", {
		cx: "18",
		cy: "16",
		r: "3",
		key: "1hluhg"
	}]
]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var PenTool = createLucideIcon("pen-tool", [
	["path", {
		d: "M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z",
		key: "nt11vn"
	}],
	["path", {
		d: "m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18",
		key: "15qc1e"
	}],
	["path", {
		d: "m2.3 2.3 7.286 7.286",
		key: "1wuzzi"
	}],
	["circle", {
		cx: "11",
		cy: "11",
		r: "2",
		key: "xmgehs"
	}]
]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Play = createLucideIcon("play", [["path", {
	d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
	key: "10ikf1"
}]]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Plus = createLucideIcon("plus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "M12 5v14",
	key: "s699le"
}]]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var RotateCcw = createLucideIcon("rotate-ccw", [["path", {
	d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
	key: "1357e3"
}], ["path", {
	d: "M3 3v5h5",
	key: "1xhq8a"
}]]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Settings = createLucideIcon("settings", [["path", {
	d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
	key: "1i5ecw"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Sparkles = createLucideIcon("sparkles", [
	["path", {
		d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
		key: "1s2grr"
	}],
	["path", {
		d: "M20 2v4",
		key: "1rf3ol"
	}],
	["path", {
		d: "M22 4h-4",
		key: "gwowj6"
	}],
	["circle", {
		cx: "4",
		cy: "20",
		r: "2",
		key: "6kqj1y"
	}]
]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Sun = createLucideIcon("sun", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "4",
		key: "4exip2"
	}],
	["path", {
		d: "M12 2v2",
		key: "tus03m"
	}],
	["path", {
		d: "M12 20v2",
		key: "1lh1kg"
	}],
	["path", {
		d: "m4.93 4.93 1.41 1.41",
		key: "149t6j"
	}],
	["path", {
		d: "m17.66 17.66 1.41 1.41",
		key: "ptbguv"
	}],
	["path", {
		d: "M2 12h2",
		key: "1t8f8n"
	}],
	["path", {
		d: "M20 12h2",
		key: "1q8mjw"
	}],
	["path", {
		d: "m6.34 17.66-1.41 1.41",
		key: "1m8zz5"
	}],
	["path", {
		d: "m19.07 4.93-1.41 1.41",
		key: "1shlcs"
	}]
]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Trash2 = createLucideIcon("trash-2", [
	["path", {
		d: "M10 11v6",
		key: "nco0om"
	}],
	["path", {
		d: "M14 11v6",
		key: "outv1u"
	}],
	["path", {
		d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
		key: "miytrc"
	}],
	["path", {
		d: "M3 6h18",
		key: "d0wm0j"
	}],
	["path", {
		d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
		key: "e791ji"
	}]
]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Undo2 = createLucideIcon("undo-2", [["path", {
	d: "M9 14 4 9l5-5",
	key: "102s5s"
}], ["path", {
	d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",
	key: "f3b9sd"
}]]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Volume2 = createLucideIcon("volume-2", [
	["path", {
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
		key: "uqj9uw"
	}],
	["path", {
		d: "M16 9a5 5 0 0 1 0 6",
		key: "1q6k2b"
	}],
	["path", {
		d: "M19.364 18.364a9 9 0 0 0 0-12.728",
		key: "ijwkga"
	}]
]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var VolumeX = createLucideIcon("volume-x", [
	["path", {
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
		key: "uqj9uw"
	}],
	["line", {
		x1: "22",
		x2: "16",
		y1: "9",
		y2: "15",
		key: "1ewh16"
	}],
	["line", {
		x1: "16",
		x2: "22",
		y1: "9",
		y2: "15",
		key: "5ykzw1"
	}]
]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var WifiOff = createLucideIcon("wifi-off", [
	["path", {
		d: "M12 20h.01",
		key: "zekei9"
	}],
	["path", {
		d: "M8.5 16.429a5 5 0 0 1 7 0",
		key: "1bycff"
	}],
	["path", {
		d: "M5 12.859a10 10 0 0 1 5.17-2.69",
		key: "1dl1wf"
	}],
	["path", {
		d: "M19 12.859a10 10 0 0 0-2.007-1.523",
		key: "4k23kn"
	}],
	["path", {
		d: "M2 8.82a15 15 0 0 1 4.177-2.643",
		key: "1grhjp"
	}],
	["path", {
		d: "M22 8.82a15 15 0 0 0-11.288-3.764",
		key: "z3jwby"
	}],
	["path", {
		d: "m2 2 20 20",
		key: "1ooewy"
	}]
]);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var X = createLucideIcon("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]);
// src/game/defaultWordcrossJson.ts
var import_client = require_client();
var RAW_WORDS = [
	{
		word: "가가대소",
		hint: "우스워서 소리를 크게 내어 웃음",
		category: "사자성어",
		level: "고급",
		origin: "呵呵大笑"
	},
	{
		word: "가감승제",
		hint: "더하기, 빼기, 곱하기, 나누기의 사칙연산",
		category: "사자성어",
		level: "중급",
		origin: "加減乘除"
	},
	{
		word: "가계부",
		hint: "집안의 살림살이 수입과 지출을 적는 장부",
		category: "생활",
		level: "초급",
		origin: "家計簿"
	},
	{
		word: "가공식품",
		hint: "원료를 인공적으로 처리하여 맛과 보존성을 높인 식품",
		category: "음식",
		level: "중급",
		origin: "加工食品"
	},
	{
		word: "가까스로",
		hint: "매우 힘들게 애를 써서 겨우",
		category: "일반",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가끔가다",
		hint: "자주 있지 아니하고 어쩌다가 한 번씩",
		category: "일반",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가나다순",
		hint: "한글 자모의 차례에 따라 배열하는 순서",
		category: "언어",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가난뱅이",
		hint: "살림살이가 매우 가난한 사람을 낮추어 이르는 말",
		category: "일반",
		level: "중급",
		origin: "순우리말"
	},
	{
		word: "가늘다",
		hint: "물체의 지름이나 너비가 보통보다 작다",
		category: "일반",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가능성",
		hint: "앞으로 실현될 수 있는 성질이나 정도",
		category: "사회",
		level: "초급",
		origin: "可能性"
	},
	{
		word: "가다랑어",
		hint: "고등어과의 바닷물고기로 참치 통조림이나 국물 재료로 쓰임",
		category: "생물",
		level: "중급",
		origin: "순우리말"
	},
	{
		word: "가동률",
		hint: "기계나 공장 설비가 실제로 움직여 일하는 비율",
		category: "경제",
		level: "중급",
		origin: "稼動率"
	},
	{
		word: "가두행진",
		hint: "여러 사람이 거리로 나와 줄을 지어 행진함",
		category: "사회",
		level: "중급",
		origin: "街頭行進"
	},
	{
		word: "가득하다",
		hint: "분량이나 수효가 한도에 차서 넘칠 듯하다",
		category: "일반",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가랑비",
		hint: "이슬비보다는 조금 굵지만 가늘게 내리는 비",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가랑잎",
		hint: "활엽수의 말라 떨어진 잎사귀",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가래떡",
		hint: "맵쌀가루를 쪄서 둥글고 길게 늘여 뽑은 흰떡",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가로등",
		hint: "밤길을 밝히기 위해 길가에 세워 둔 전등",
		category: "생활",
		level: "초급",
		origin: "街路燈"
	},
	{
		word: "가로수",
		hint: "길가에 줄지어 심어 놓은 나무",
		category: "자연",
		level: "초급",
		origin: "街路樹"
	},
	{
		word: "가로지르다",
		hint: "가로로 건너질러 가다",
		category: "일반",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가루약",
		hint: "가루 형태로 만들어 복용하는 약",
		category: "의학",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가르침",
		hint: "지식이나 깨달음을 일깨워 주는 일",
		category: "교육",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가리비",
		hint: "부채 모양의 껍데기를 가진 조개",
		category: "생물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가마니",
		hint: "짚으로 결어 곡식이나 소금을 담는 자루",
		category: "생활",
		level: "중급",
		origin: "순우리말"
	},
	{
		word: "가마솥",
		hint: "무쇠로 만들어 밥이나 국을 끓이는 크고 무거운 솥",
		category: "주방",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가만히",
		hint: "움직이거나 말하지 않고 조용한 모양",
		category: "일반",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가맹점",
		hint: "프랜차이즈나 본부와 계약을 맺고 영업하는 가게",
		category: "경제",
		level: "중급",
		origin: "加盟店"
	},
	{
		word: "가면극",
		hint: "탈을 쓰고 음악과 춤, 대사로 펼치는 전통 연극",
		category: "예술",
		level: "중급",
		origin: "假面劇"
	},
	{
		word: "가문비",
		hint: "추운 고산지대에서 자라는 소나무과의 상록 침엽수",
		category: "식물",
		level: "고급",
		origin: "순우리말"
	},
	{
		word: "가뭄",
		hint: "오랫동안 비가 오지 않아 메마르는 날씨 현상",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가방끈",
		hint: "가방을 메거나 들 수 있도록 달아 놓은 끈",
		category: "생활",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가벼움",
		hint: "무게가 적거나 마음이 홀가분한 상태",
		category: "일반",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가보",
		hint: "집안에 대대로 물려 내려오는 귀중한 보물",
		category: "문화",
		level: "중급",
		origin: "家寶"
	},
	{
		word: "가사노동",
		hint: "집안 살림을 돌보고 가꾸는 일",
		category: "사회",
		level: "중급",
		origin: "家事勞動"
	},
	{
		word: "가상현실",
		hint: "컴퓨터로 실제와 유사하게 만들어 낸 입체 공간",
		category: "과학",
		level: "중급",
		origin: "假想現實"
	},
	{
		word: "가속도",
		hint: "시간에 따라 속도가 변하는 비율",
		category: "과학",
		level: "중급",
		origin: "加速度"
	},
	{
		word: "가수분해",
		hint: "화합물이 물과 반응하여 다른 물질로 분해되는 현상",
		category: "과학",
		level: "고급",
		origin: "加水分解"
	},
	{
		word: "가슴속",
		hint: "마음이나 생각이 담겨 있는 깊은 내면",
		category: "마음",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가시광선",
		hint: "사람의 눈으로 볼 수 있는 파장 영역의 빛",
		category: "과학",
		level: "중급",
		origin: "可視光線"
	},
	{
		word: "가시나무",
		hint: "가지에 날카로운 가시가 돋아 있는 나무",
		category: "식물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가시밭길",
		hint: "고난과 역경이 가득하여 헤쳐 나가기 힘든 길",
		category: "비유",
		level: "중급",
		origin: "순우리말"
	},
	{
		word: "가식적",
		hint: "말이나 행동을 거짓으로 꾸미는 태도",
		category: "마음",
		level: "중급",
		origin: "假飾的"
	},
	{
		word: "가신",
		hint: "옛날 세도가나 영주의 집안에서 일하던 신하",
		category: "역사",
		level: "고급",
		origin: "家臣"
	},
	{
		word: "가야금",
		hint: "오동나무 판에 열두 줄의 명주실을 얹어 타는 국악기",
		category: "음악",
		level: "초급",
		origin: "伽倻琴"
	},
	{
		word: "가양주",
		hint: "집에서 전통 방식대로 직접 담가 빚은 술",
		category: "문화",
		level: "고급",
		origin: "家釀酒"
	},
	{
		word: "가언적",
		hint: "어떤 조건이나 가정을 전제로 하는 것",
		category: "철학",
		level: "고급",
		origin: "假言的"
	},
	{
		word: "가업",
		hint: "집안에서 대대로 이어받아 경영하는 생업",
		category: "사회",
		level: "중급",
		origin: "家業"
	},
	{
		word: "가오리",
		hint: "몸이 넓적하고 마름모꼴이며 꼬리가 긴 바닷물고기",
		category: "생물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가옥",
		hint: "사람이 살기 위해 지은 집",
		category: "건축",
		level: "중급",
		origin: "家屋"
	},
	{
		word: "가요제",
		hint: "대중가요 경연을 펼치는 음악 축제",
		category: "예술",
		level: "초급",
		origin: "歌謠祭"
	},
	{
		word: "가용성",
		hint: "시스템이나 자원을 정상적으로 사용할 수 있는 정도",
		category: "과학",
		level: "고급",
		origin: "可用性"
	},
	{
		word: "가운데",
		hint: "양 끝에서 거의 같은 거리에 있는 중심 부분",
		category: "일반",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가위바위보",
		hint: "손 모양으로 가위, 바위, 보를 내어 승부를 가리는 놀이",
		category: "놀이",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가을걷이",
		hint: "가을에 다 익은 곡식을 거두어들이는 추수",
		category: "농업",
		level: "중급",
		origin: "순우리말"
	},
	{
		word: "가을바람",
		hint: "가을철에 부는 선선하고 맑은 바람",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가을비",
		hint: "가을철에 내리는 차갑고 고즈넉한 비",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가을빛",
		hint: "가을의 정취가 물씬 풍기는 자연의 빛깔",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가의",
		hint: "옷을 정식으로 입기 전에 임시로 맞추어 입어 봄",
		category: "생활",
		level: "고급",
		origin: "假衣"
	},
	{
		word: "가이없다",
		hint: "끝이 보이지 않을 만큼 매우 넓거나 크다",
		category: "우리말",
		level: "고급",
		origin: "순우리말"
	},
	{
		word: "가입자",
		hint: "단체나 서비스에 정식으로 이름을 올려 등록한 사람",
		category: "사회",
		level: "초급",
		origin: "加入者"
	},
	{
		word: "가장자리",
		hint: "물건이나 공간의 바깥쪽 둘레 부분",
		category: "일반",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가전제품",
		hint: "가정에서 편리하게 사용하는 전기 및 전자 기기",
		category: "생활",
		level: "초급",
		origin: "家電製品"
	},
	{
		word: "가정교사",
		hint: "학생의 집으로 찾아가 개인적으로 가르치는 선생님",
		category: "교육",
		level: "중급",
		origin: "家庭敎師"
	},
	{
		word: "가정식",
		hint: "집에서 가족이 먹는 것처럼 정성껏 차린 식사",
		category: "음식",
		level: "초급",
		origin: "家庭食"
	},
	{
		word: "가정집",
		hint: "일반 살림을 차려 살아가는 집",
		category: "생활",
		level: "초급",
		origin: "家庭집"
	},
	{
		word: "가족사진",
		hint: "온 가족이 함께 모여 찍은 기념사진",
		category: "가족",
		level: "초급",
		origin: "家族寫眞"
	},
	{
		word: "가죽신",
		hint: "동물의 가죽을 다듬어 만든 신발",
		category: "생활",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가중치",
		hint: "중요도에 따라 다르게 매기는 비율 값",
		category: "수학",
		level: "중급",
		origin: "加重値"
	},
	{
		word: "가지각색",
		hint: "종류나 모양이 여러 가지로 서로 다름",
		category: "사자성어",
		level: "초급",
		origin: "各色"
	},
	{
		word: "가지나물",
		hint: "가지를 찌거나 볶아서 양념에 무친 반찬",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가지치기",
		hint: "나무가 잘 자라도록 불필요한 잔가지를 잘라 내는 일",
		category: "농업",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가진자",
		hint: "재산이나 권력을 많이 소유한 사람",
		category: "사회",
		level: "중급",
		origin: "순우리말"
	},
	{
		word: "가차없다",
		hint: "조금도 봐주거나 용서함이 없다",
		category: "일반",
		level: "중급",
		origin: "假借"
	},
	{
		word: "가창력",
		hint: "노래를 정확하고 감동적으로 부르는 능력",
		category: "음악",
		level: "초급",
		origin: "歌唱力"
	},
	{
		word: "가축",
		hint: "사람이 집에서 기르는 소, 돼지, 닭 등의 동물",
		category: "동물",
		level: "초급",
		origin: "家畜"
	},
	{
		word: "가치관",
		hint: "사물이나 삶의 옳고 그름과 중요함을 판단하는 관점",
		category: "철학",
		level: "중급",
		origin: "價値觀"
	},
	{
		word: "가톨릭",
		hint: "로마 교황을 중심으로 하는 그리스도교의 한 교파",
		category: "종교",
		level: "중급",
		origin: "외래어"
	},
	{
		word: "가파르다",
		hint: "산이나 비탈의 경사가 매우 급하다",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "가풍",
		hint: "한 집안에서 대대로 이어져 내려오는 고유한 풍습과 규범",
		category: "가족",
		level: "중급",
		origin: "家風"
	},
	{
		word: "가뭄해갈",
		hint: "오랜 가뭄 끝에 단비가 내려 메마름이 풀림",
		category: "자연",
		level: "중급",
		origin: "解渴"
	},
	{
		word: "소나무",
		hint: "사시사철 푸른 잎을 간직한 우리나라 대표 침엽수",
		category: "식물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "소나기",
		hint: "갑자기 세차게 쏟아지다가 곧 그치는 비",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "소리꾼",
		hint: "판소리나 민요를 전문적으로 부르는 예술가",
		category: "국악",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "소금물",
		hint: "소금을 녹여 짭짤하게 만든 물",
		category: "생활",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "소풍길",
		hint: "기분 전환이나 나들이를 위해 떠나는 길",
		category: "생활",
		level: "초급",
		origin: "小風"
	},
	{
		word: "소화기",
		hint: "불이 났을 때 초기 진화를 위해 뿌리는 소방 기구",
		category: "안전",
		level: "초급",
		origin: "消火器"
	},
	{
		word: "소설가",
		hint: "이야기를 창작하여 소설을 쓰는 작가",
		category: "문학",
		level: "초급",
		origin: "小說家"
	},
	{
		word: "소쩍새",
		hint: "밤마다 소쩍소쩍 구슬프게 우는 올빼미과의 여름 철새",
		category: "동물",
		level: "중급",
		origin: "순우리말"
	},
	{
		word: "소원성취",
		hint: "간절히 바라던 바를 마침내 이룸",
		category: "사자성어",
		level: "초급",
		origin: "所願成就"
	},
	{
		word: "소꿉놀이",
		hint: "아이들이 작은 그릇으로 살림을 흉내 내며 노는 놀이",
		category: "놀이",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "소보로빵",
		hint: "윗면에 고소하고 달콤한 곰보 과자 가루를 얹어 구운 빵",
		category: "음식",
		level: "초급",
		origin: "외래어"
	},
	{
		word: "소고기국",
		hint: "소고기와 무, 파를 넣고 푹 끓여 낸 맑은 국",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "대나무",
		hint: "속이 비고 마디가 있으며 사시사철 곧고 푸른 식물",
		category: "식물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "대기권",
		hint: "지구를 둘러싸고 있는 공기의 층",
		category: "과학",
		level: "중급",
		origin: "大氣圈"
	},
	{
		word: "대보름",
		hint: "음력 정월 보름날로 부럼을 깨고 달맞이를 하는 명절",
		category: "명절",
		level: "초급",
		origin: "大보름"
	},
	{
		word: "대장간",
		hint: "쇠를 달구어 농기구나 연장을 벼리는 작업장",
		category: "전통",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "대청마루",
		hint: "한옥에서 방과 방 사이에 있는 큰 마루",
		category: "건축",
		level: "중급",
		origin: "大廳마루"
	},
	{
		word: "대중교통",
		hint: "버스나 지하철처럼 많은 시민이 함께 이용하는 교통수단",
		category: "사회",
		level: "초급",
		origin: "大衆交通"
	},
	{
		word: "대한민국",
		hint: "한반도에 위치한 우리나라의 공식 국호",
		category: "국가",
		level: "초급",
		origin: "大韓民國"
	},
	{
		word: "대동여지도",
		hint: "조선 후기 김정호가 만든 정밀한 목판 전국 지도",
		category: "역사",
		level: "중급",
		origin: "大東輿地圖"
	},
	{
		word: "대기만성",
		hint: "큰 그릇은 늦게 이루어진다는 뜻으로 크게 될 인물은 오랜 수련 끝에 성공함",
		category: "사자성어",
		level: "중급",
		origin: "大器晩成"
	},
	{
		word: "대동소이",
		hint: "큰 차이 없이 거의 비슷함",
		category: "사자성어",
		level: "중급",
		origin: "大同小異"
	},
	{
		word: "도서관",
		hint: "책과 자료를 모아 두고 시민들이 읽고 빌릴 수 있게 한 시설",
		category: "교육",
		level: "초급",
		origin: "圖書館"
	},
	{
		word: "도시락",
		hint: "밖에서 먹을 수 있도록 밥과 반찬을 담은 통",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "도토리",
		hint: "참나무류에 열리는 동글동글한 열매로 묵을 쑤어 먹음",
		category: "식물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "도토리묵",
		hint: "도토리 녹말을 쑤어 굳힌 탱글탱글한 전통 음식",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "도자기",
		hint: "흙을 빚어 높은 온도에서 구워 만든 그릇",
		category: "예술",
		level: "초급",
		origin: "陶磁器"
	},
	{
		word: "도깨비불",
		hint: "밤중에 들판이나 산에서 저절로 번쩍이는 푸른 불빛",
		category: "전설",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "도마뱀",
		hint: "비늘 덮인 몸에 네 다리와 긴 꼬리를 가진 파충류",
		category: "동물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "도화지",
		hint: "그림을 그리는 데 쓰는 두껍고 흰 종이",
		category: "미술",
		level: "초급",
		origin: "圖畫紙"
	},
	{
		word: "동그라미",
		hint: "모가 나지 않고 둥글게 그린 원 모양",
		category: "일반",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "동아줄",
		hint: "굵고 튼튼하게 꼬아 만든 밧줄",
		category: "전래",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "동화책",
		hint: "어린이를 위한 따뜻한 이야기를 담은 책",
		category: "문학",
		level: "초급",
		origin: "童話冊"
	},
	{
		word: "동물원",
		hint: "여러 가지 동물을 기르며 관람하고 보호하는 곳",
		category: "생활",
		level: "초급",
		origin: "動物園"
	},
	{
		word: "동서남북",
		hint: "동쪽, 서쪽, 남쪽, 북쪽의 네 방위",
		category: "사자성어",
		level: "초급",
		origin: "東西南北"
	},
	{
		word: "동고동락",
		hint: "괴로움과 즐거움을 함께 나눔",
		category: "사자성어",
		level: "중급",
		origin: "同苦同樂"
	},
	{
		word: "동문서답",
		hint: "동쪽을 묻는데 서쪽을 답하듯 질문과 전혀 상관없는 대답을 함",
		category: "사자성어",
		level: "중급",
		origin: "東問西答"
	},
	{
		word: "동병상련",
		hint: "같은 병을 앓는 사람끼리 서로 가엾게 여김",
		category: "사자성어",
		level: "중급",
		origin: "同病相憐"
	},
	{
		word: "나침반",
		hint: "자석 바늘이 남북을 가리켜 방위를 알려 주는 기구",
		category: "과학",
		level: "초급",
		origin: "羅針盤"
	},
	{
		word: "나무꾼",
		hint: "산에서 땔나무를 베어 생계를 잇던 사람",
		category: "전래",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "나뭇잎",
		hint: "나무의 가지에 돋아나는 푸른 잎사귀",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "나팔꽃",
		hint: "여름 아침에 나팔 모양으로 활짝 피는 덩굴꽃",
		category: "식물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "나비효과",
		hint: "작은 나비의 날갯짓이 지구 반대편에 큰 폭풍을 일으킨다는 이론",
		category: "과학",
		level: "중급",
		origin: "效果"
	},
	{
		word: "나들이",
		hint: "집에서 멀지 않은 곳으로 기분 전환 삼아 다녀오는 일",
		category: "생활",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "나물밥",
		hint: "여러 가지 산나물이나 들나물을 넣고 지은 건강한 밥",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "노을빛",
		hint: "해 질 녘 하늘이 붉고 곱게 물드는 빛깔",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "노랫말",
		hint: "노래의 곡조에 맞추어 부르는 가사",
		category: "음악",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "노란색",
		hint: "개나리나 해바라기 꽃잎과 같은 밝은 빛깔",
		category: "미술",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "눈사람",
		hint: "눈을 둥글게 뭉쳐 사람 모양으로 만든 조형물",
		category: "겨울",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "눈보라",
		hint: "세찬 바람과 함께 휘몰아쳐 날리는 눈",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "눈물방울",
		hint: "눈에서 방울져 떨어지는 눈물",
		category: "마음",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "느티나무",
		hint: "마을 어귀에서 넓은 그늘을 만들어 주는 정자나무",
		category: "식물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "마파두부",
		hint: "두부와 다진 고기를 매콤한 두반장 소스로 볶은 요리",
		category: "음식",
		level: "중급",
		origin: "麻婆豆腐"
	},
	{
		word: "마늘종",
		hint: "마늘의 꽃줄기로 아삭하게 볶거나 무쳐 먹는 식재료",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "마중물",
		hint: "펌프에서 물을 끌어 올리기 위해 먼저 한 바가지 붓는 물",
		category: "우리말",
		level: "중급",
		origin: "순우리말"
	},
	{
		word: "마음씨",
		hint: "마음을 쓰는 바탕이나 태도",
		category: "마음",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "마라톤",
		hint: "42.195km를 달리는 장거리 육상 경기",
		category: "운동",
		level: "초급",
		origin: "외래어"
	},
	{
		word: "모래성",
		hint: "바닷가 모래를 쌓아 올려 만든 성",
		category: "놀이",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "모래시계",
		hint: "고운 모래가 구멍으로 떨어지는 양으로 시간을 재는 기구",
		category: "도구",
		level: "초급",
		origin: "時計"
	},
	{
		word: "모닥불",
		hint: "마른 나뭇가지를 모아 피우는 정겨운 불",
		category: "야영",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "모범생",
		hint: "행실과 학업이 바르고 성실하여 본보기가 되는 학생",
		category: "학교",
		level: "초급",
		origin: "模範生"
	},
	{
		word: "무지개",
		hint: "비 온 뒤 햇빛이 물방울에 굴절되어 나타나는 일곱 빛깔 호",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "무궁화",
		hint: "여름부터 가을까지 날마다 새로 피는 대한민국의 국화",
		category: "상징",
		level: "초급",
		origin: "無窮花"
	},
	{
		word: "무용담",
		hint: "용감하게 싸우거나 어려움을 이겨 낸 자랑스러운 이야기",
		category: "이야기",
		level: "중급",
		origin: "武勇談"
	},
	{
		word: "무전유죄",
		hint: "돈이 없으면 죄가 된다는 세태를 꼬집는 말",
		category: "사자성어",
		level: "고급",
		origin: "無錢有罪"
	},
	{
		word: "무위자연",
		hint: "인위적인 손길을 더하지 않고 자연 그대로의 순리에 따름",
		category: "사자성어",
		level: "고급",
		origin: "無爲自然"
	},
	{
		word: "미리내",
		hint: "맑은 밤하늘을 가로지르는 은하수의 순우리말",
		category: "우리말",
		level: "중급",
		origin: "순우리말"
	},
	{
		word: "미끄럼틀",
		hint: "높은 곳에서 매끄러운 판을 타고 내려오는 놀이터 기구",
		category: "놀이",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "미역국",
		hint: "미역을 참기름에 볶아 푹 끓인 생일날 먹는 국",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "미술관",
		hint: "회화나 조각 등 예술 작품을 전시하여 감상하게 하는 곳",
		category: "예술",
		level: "초급",
		origin: "美術館"
	},
	{
		word: "민들레",
		hint: "봄에 노란 꽃이 피고 하얀 갓털 씨앗이 바람에 날리는 풀",
		category: "식물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "민속촌",
		hint: "전통 가옥과 생활 모습을 보존하여 재현해 놓은 마을",
		category: "문화",
		level: "초급",
		origin: "民俗村"
	},
	{
		word: "물레방아",
		hint: "떨어지는 물의 힘으로 바퀴를 돌려 곡식을 찧는 장치",
		category: "전통",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "물안개",
		hint: "강이나 호수 수면 위로 피어오르는 희뿌연 안개",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "물고기",
		hint: "강이나 바다의 물속에서 아가미로 숨 쉬며 사는 동물",
		category: "생물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "물방울",
		hint: "둥글게 맺히거나 떨어지는 작은 물의 방울",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "바람개비",
		hint: "바람을 맞으면 날개가 빙글빙글 돌아가는 장난감",
		category: "놀이",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "바닷가",
		hint: "바다와 육지가 맞닿은 해변 지역",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "바닷물",
		hint: "바다를 이루고 있는 짠맛이 나는 물",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "바느질",
		hint: "바늘에 실을 꿰어 옷이나 천을 꿰매는 일",
		category: "생활",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "바둑판",
		hint: "가로세로 열아홉 줄이 그어져 있어 바둑돌을 놓는 판",
		category: "놀이",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "보름달",
		hint: "음력 십오일 밤하늘에 가장 둥글고 밝게 뜨는 달",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "보물섬",
		hint: "진귀한 보물이 숨겨져 있다고 전해지는 신비한 섬",
		category: "이야기",
		level: "초급",
		origin: "寶物島"
	},
	{
		word: "보리차",
		hint: "겉보리를 노릇하게 볶아 물에 끓여 마시는 구수한 차",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "보금자리",
		hint: "새가 알을 품는 둥지나 포근하고 아늑한 삶의 터전",
		category: "우리말",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "보슬비",
		hint: "바람 없이 조용하고 보슬보슬 내리는 가는 비",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "부채춤",
		hint: "화려한 꽃부채를 들고 물결이나 꽃 모양을 만드는 한국 무용",
		category: "예술",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "부침개",
		hint: "밀가루 반죽에 채소나 해물을 넣어 기름에 지지거나 부친 음식",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "부모님",
		hint: "아버지와 어머니를 높여 부르는 말",
		category: "가족",
		level: "초급",
		origin: "父母님"
	},
	{
		word: "부엉이",
		hint: "밤에 활동하며 머리 위에 귀 모양 깃털이 있는 맹금류",
		category: "동물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "비빔밥",
		hint: "밥에 여러 가지 나물과 고추장, 참기름을 넣고 비벼 먹는 음식",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "비눗방울",
		hint: "비눗물을 빨대로 불면 공중에 둥실 떠오르는 방울",
		category: "놀이",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "비행기",
		hint: "날개와 엔진의 힘으로 하늘을 날아다니는 항공기",
		category: "교통",
		level: "초급",
		origin: "飛行機"
	},
	{
		word: "비상구",
		hint: "화재나 위급한 상황에서 급히 대피할 수 있도록 만든 출입구",
		category: "안전",
		level: "초급",
		origin: "非常口"
	},
	{
		word: "반딧불",
		hint: "여름밤 꽁무니에서 초록빛을 내며 날아다니는 곤충의 불빛",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "반려견",
		hint: "사람과 가족처럼 더불어 살아가는 개",
		category: "동물",
		level: "초급",
		origin: "伴侶犬"
	},
	{
		word: "방앗간",
		hint: "곡식을 찧거나 가루로 빻고 떡을 만드는 곳",
		category: "생활",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "방울토마토",
		hint: "한입 크기로 동글동글하게 열리는 작은 토마토",
		category: "음식",
		level: "초급",
		origin: "외래어"
	},
	{
		word: "백두산",
		hint: "한반도에서 가장 높은 산으로 꼭대기에 천지가 있음",
		category: "지리",
		level: "초급",
		origin: "白頭山"
	},
	{
		word: "백과사전",
		hint: "온갖 분야의 지식을 체계적으로 모아 설명한 사전",
		category: "교육",
		level: "중급",
		origin: "百科事典"
	},
	{
		word: "백발백중",
		hint: "백 번 쏘아 백 번 다 맞춘다는 뜻으로 계획이 모두 들어맞음",
		category: "사자성어",
		level: "중급",
		origin: "百發百中"
	},
	{
		word: "별똥별",
		hint: "우주 공간의 먼지나 암석이 대기권에 들어와 빛을 내며 떨어지는 유성",
		category: "우주",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "별자리",
		hint: "밤하늘의 별들을 이어 동물이나 신화 속 인물로 이름 붙인 것",
		category: "우주",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "봄나물",
		hint: "봄철에 들에서 새로 돋아나는 향긋한 나물",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "봄바람",
		hint: "봄철에 부는 포근하고 살랑거리는 바람",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "불꽃놀이",
		hint: "밤하늘에 화약을 쏘아 올려 화려한 빛과 색을 수놓는 행사",
		category: "축제",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "불사조",
		hint: "죽지 않고 불 속에서 다시 태어난다는 전설 속의 새",
		category: "전설",
		level: "중급",
		origin: "不死鳥"
	},
	{
		word: "빛줄기",
		hint: "구름 사이로 길게 뻗어 내리는 빛의 줄기",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "사자성어",
		hint: "네 글자의 한자로 이루어진 교훈적인 관용구",
		category: "언어",
		level: "초급",
		origin: "四字成語"
	},
	{
		word: "사계절",
		hint: "봄, 여름, 가을, 겨울의 네 계절",
		category: "자연",
		level: "초급",
		origin: "四季節"
	},
	{
		word: "사과나무",
		hint: "가을에 붉고 탐스러운 사과 열매가 열리는 과일나무",
		category: "식물",
		level: "초급",
		origin: "沙果나무"
	},
	{
		word: "사막여우",
		hint: "커다란 귀로 열을 식히며 사막에 사는 작은 여우",
		category: "동물",
		level: "초급",
		origin: "沙漠여우"
	},
	{
		word: "사물놀이",
		hint: "꽹과리, 징, 장구, 북의 네 가지 타악기로 연주하는 전통 음악",
		category: "국악",
		level: "초급",
		origin: "四物놀이"
	},
	{
		word: "사필귀정",
		hint: "모든 일은 결국 반드시 바른길로 돌아감",
		category: "사자성어",
		level: "중급",
		origin: "事必歸正"
	},
	{
		word: "산토끼",
		hint: "산이나 들에 살며 귀가 길고 뒷다리가 튼튼한 토끼",
		category: "동물",
		level: "초급",
		origin: "山토끼"
	},
	{
		word: "산울림",
		hint: "산골짜기에서 소리가 되울려 퍼지는 메아리",
		category: "자연",
		level: "초급",
		origin: "山울림"
	},
	{
		word: "산책로",
		hint: "천천히 걸으며 자연을 즐길 수 있도록 다듬어 놓은 길",
		category: "생활",
		level: "초급",
		origin: "散策路"
	},
	{
		word: "산수화",
		hint: "산과 강 등 자연의 아름다운 경치를 그린 동양화",
		category: "예술",
		level: "중급",
		origin: "山水畫"
	},
	{
		word: "산해진미",
		hint: "산과 바다에서 나는 온갖 귀하고 맛있는 음식",
		category: "사자성어",
		level: "중급",
		origin: "山海珍味"
	},
	{
		word: "서당개",
		hint: "서당에서 기르는 개로 풍월을 읊는다는 속담에 등장함",
		category: "전통",
		level: "초급",
		origin: "書堂개"
	},
	{
		word: "서울역",
		hint: "대한민국 수도 서울의 중심에 있는 대표 기차역",
		category: "교통",
		level: "초급",
		origin: "서울驛"
	},
	{
		word: "선풍기",
		hint: "날개를 회전시켜 시원한 바람을 일으키는 가전제품",
		category: "생활",
		level: "초급",
		origin: "扇風機"
	},
	{
		word: "선인장",
		hint: "사막처럼 건조한 곳에서 줄기에 물을 저장하며 자라는 식물",
		category: "식물",
		level: "초급",
		origin: "仙人掌"
	},
	{
		word: "설렁탕",
		hint: "소머리와 사골을 오랫동안 뽀얗게 고아 낸 국물 요리",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "설악산",
		hint: "강원도에 위치한 기암괴석과 단풍이 아름다운 명산",
		category: "지리",
		level: "초급",
		origin: "雪嶽山"
	},
	{
		word: "성악가",
		hint: "목소리로 클래식 가곡이나 오페라를 노래하는 음악가",
		category: "음악",
		level: "중급",
		origin: "聲樂家"
	},
	{
		word: "세탁기",
		hint: "물과 세제로 옷감을 자동으로 빨아 주는 가전제품",
		category: "생활",
		level: "초급",
		origin: "洗濯機"
	},
	{
		word: "세종대왕",
		hint: "백성을 위해 훈민정음을 창제한 조선 제4대 임금",
		category: "역사",
		level: "초급",
		origin: "世宗大王"
	},
	{
		word: "손수건",
		hint: "손이나 얼굴의 물기와 땀을 닦기 위해 가지고 다니는 작은 수건",
		category: "생활",
		level: "초급",
		origin: "손手巾"
	},
	{
		word: "손목시계",
		hint: "손목에 차고 다니며 시간을 확인하는 시계",
		category: "생활",
		level: "초급",
		origin: "손목時計"
	},
	{
		word: "손가락",
		hint: "손바닥 끝에 갈라져 나온 다섯 개의 부분",
		category: "인체",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "수박화채",
		hint: "수박을 한입 크기로 썰어 시원한 국물에 띄운 여름 간식",
		category: "음식",
		level: "초급",
		origin: "水菊花菜"
	},
	{
		word: "수성펜",
		hint: "물에 잘 녹는 잉크를 사용하여 부드럽게 써지는 펜",
		category: "문구",
		level: "초급",
		origin: "水性펜"
	},
	{
		word: "수묵화",
		hint: "물감 대신 먹물의 농담만으로 그리는 동양 그림",
		category: "예술",
		level: "중급",
		origin: "水墨畫"
	},
	{
		word: "수평선",
		hint: "바다와 하늘이 맞닿아 평평하게 보이는 선",
		category: "자연",
		level: "초급",
		origin: "水平線"
	},
	{
		word: "시소게임",
		hint: "엎치락뒤치락하며 승부를 예측하기 힘든 팽팽한 경기",
		category: "운동",
		level: "중급",
		origin: "외래어"
	},
	{
		word: "시금치",
		hint: "철분과 비타민이 풍부하여 나물이나 국거리로 먹는 초록 채소",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "시계탑",
		hint: "멀리서도 시간을 볼 수 있도록 큰 시계를 달아 세운 탑",
		category: "건축",
		level: "초급",
		origin: "時計塔"
	},
	{
		word: "신기루",
		hint: "빛의 굴절로 공중이나 사막에 실제 없는 풍경이 보이는 현상",
		category: "과학",
		level: "중급",
		origin: "蜃氣樓"
	},
	{
		word: "신호등",
		hint: "빨강, 노랑, 초록 불빛으로 차량과 보행자의 통행을 안내하는 등",
		category: "교통",
		level: "초급",
		origin: "信號燈"
	},
	{
		word: "신문지",
		hint: "신문을 인쇄하는 데 쓰는 종이",
		category: "생활",
		level: "초급",
		origin: "新聞紙"
	},
	{
		word: "심청전",
		hint: "아버지의 눈을 뜨게 하려 인당수에 몸을 던진 효녀 심청의 고전 소설",
		category: "문학",
		level: "초급",
		origin: "沈淸傳"
	},
	{
		word: "아지랑이",
		hint: "봄철 따뜻한 햇볕에 데워진 공기가 아른거리며 피어오르는 현상",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "아침밥",
		hint: "아침에 하루를 시작하며 먹는 식사",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "아침해",
		hint: "새벽을 깨우며 동쪽 하늘에서 솟아오르는 해",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "아름드리",
		hint: "두 팔로 감싸 안아야 할 만큼 매우 굵은 나무의 둘레",
		category: "우리말",
		level: "중급",
		origin: "순우리말"
	},
	{
		word: "어린왕자",
		hint: "생텍쥐페리가 쓴 동화 소설의 주인공으로 작은 별에서 온 소년",
		category: "문학",
		level: "초급",
		origin: "王子"
	},
	{
		word: "어부바",
		hint: "어린아이를 등에 업을 때 정겹게 내는 말",
		category: "우리말",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "여우비",
		hint: "해가 반짝 비치는 날에 잠깐 뿌리다가 그치는 비",
		category: "우리말",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "여행가방",
		hint: "여행할 때 옷가지와 짐을 챙겨 넣는 가방",
		category: "생활",
		level: "초급",
		origin: "旅行가방"
	},
	{
		word: "여름밤",
		hint: "풀벌레 소리가 들리는 무더운 여름철의 밤",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "오케스트라",
		hint: "현악기, 관악기, 타악기가 어우러져 연주하는 관현악단",
		category: "음악",
		level: "중급",
		origin: "외래어"
	},
	{
		word: "오미자차",
		hint: "다섯 가지 맛이 나는 붉은 열매로 우린 전통 차",
		category: "음식",
		level: "중급",
		origin: "五味子茶"
	},
	{
		word: "오징어",
		hint: "열 개의 다리와 먹물 주머니를 가진 연체동물",
		category: "생물",
		level: "초급",
		origin: "烏賊魚"
	},
	{
		word: "오솔길",
		hint: "산이나 들에 나 있는 좁고 호젓한 길",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "우주선",
		hint: "지구의 대기권을 벗어나 우주를 비행하는 비행체",
		category: "과학",
		level: "초급",
		origin: "宇宙船"
	},
	{
		word: "우주인",
		hint: "우주선을 타고 우주 공간에서 임무를 수행하는 사람",
		category: "우주",
		level: "초급",
		origin: "宇宙人"
	},
	{
		word: "우체통",
		hint: "편지나 우편물을 넣을 수 있도록 길가에 설치한 빨간 통",
		category: "생활",
		level: "초급",
		origin: "郵遞"
	},
	{
		word: "우산살",
		hint: "우산의 천을 받쳐 주도록 뼈대를 이루는 가는 대",
		category: "생활",
		level: "초급",
		origin: "雨傘살"
	},
	{
		word: "유리창",
		hint: "유리를 끼워 밖을 내다볼 수 있게 만든 창문",
		category: "건축",
		level: "초급",
		origin: "琉璃窓"
	},
	{
		word: "유리병",
		hint: "유리로 만들어 속이 투명하게 비치는 병",
		category: "생활",
		level: "초급",
		origin: "琉璃甁"
	},
	{
		word: "유비무환",
		hint: "미리 준비가 되어 있으면 근심할 일이 없음",
		category: "사자성어",
		level: "중급",
		origin: "有備無患"
	},
	{
		word: "은하수",
		hint: "맑은 밤하늘에 수많은 별이 강물처럼 빛나는 띠",
		category: "우주",
		level: "초급",
		origin: "銀河水"
	},
	{
		word: "은행나무",
		hint: "가을이면 부채 모양의 잎이 샛노랗게 물드는 가로수",
		category: "식물",
		level: "초급",
		origin: "銀杏나무"
	},
	{
		word: "이슬비",
		hint: "풀잎에 이슬이 맺히듯 아주 가늘게 내리는 비",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "이발소",
		hint: "머리카락을 단정하게 깎고 다듬어 주는 가게",
		category: "생활",
		level: "초급",
		origin: "理髮所"
	},
	{
		word: "이순신",
		hint: "임진왜란 때 거북선과 학익진으로 나라를 구한 조선의 명장",
		category: "역사",
		level: "초급",
		origin: "李舜臣"
	},
	{
		word: "이심전심",
		hint: "말하지 않아도 마음에서 마음으로 뜻이 서로 통함",
		category: "사자성어",
		level: "중급",
		origin: "以心傳心"
	},
	{
		word: "인공지능",
		hint: "컴퓨터가 인간의 학습과 추론 능력을 구현한 기술",
		category: "과학",
		level: "초급",
		origin: "人工知能"
	},
	{
		word: "인절미",
		hint: "찹쌀을 쪄서 절구에 쳐 만든 쫄깃한 떡에 콩고물을 묻힌 음식",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "일기장",
		hint: "날마다 겪은 일과 생각을 기록하는 공책",
		category: "생활",
		level: "초급",
		origin: "日記帳"
	},
	{
		word: "일석이조",
		hint: "돌 한 개를 던져 새 두 마리를 잡듯 한 가지 일로 두 가지 이익을 얻음",
		category: "사자성어",
		level: "초급",
		origin: "一石二鳥"
	},
	{
		word: "일취월장",
		hint: "나날이 다달이 실력이 부쩍부쩍 발전함",
		category: "사자성어",
		level: "중급",
		origin: "日就月將"
	},
	{
		word: "자전거",
		hint: "두 바퀴와 페달이 있어 사람의 힘으로 굴려 타는 탈것",
		category: "교통",
		level: "초급",
		origin: "自轉車"
	},
	{
		word: "자장가",
		hint: "아기를 포근하게 재울 때 나직하고 부드럽게 부르는 노래",
		category: "음악",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "자연보호",
		hint: "산과 강, 동식물 등 자연환경을 아끼고 지키는 일",
		category: "환경",
		level: "초급",
		origin: "自然保護"
	},
	{
		word: "자격증",
		hint: "일정한 분야의 기술이나 능력을 갖추었음을 증명하는 문서",
		category: "사회",
		level: "초급",
		origin: "資格證"
	},
	{
		word: "자화자찬",
		hint: "자기가 그린 그림을 스스로 칭찬하듯 자기가 한 일을 스스로 자랑함",
		category: "사자성어",
		level: "중급",
		origin: "自畫自讚"
	},
	{
		word: "장구춤",
		hint: "어깨에 장구를 비스듬히 메고 장단을 치며 추는 흥겨운 춤",
		category: "국악",
		level: "중급",
		origin: "杖鼓춤"
	},
	{
		word: "장독대",
		hint: "간장, 된장, 고추장을 담은 항아리를 모아 둔 마당의 높은 터",
		category: "전통",
		level: "초급",
		origin: "醬독臺"
	},
	{
		word: "장수풍뎅이",
		hint: "머리에 투구 같은 멋진 뿔이 달린 힘센 곤충",
		category: "곤충",
		level: "초급",
		origin: "將帥풍뎅이"
	},
	{
		word: "전래동화",
		hint: "옛날부터 입에서 입으로 전해 내려오는 교훈적인 동화",
		category: "문학",
		level: "초급",
		origin: "傳來童話"
	},
	{
		word: "전자석",
		hint: "전류가 흐를 때만 자석의 성질을 띠는 자석",
		category: "과학",
		level: "중급",
		origin: "電磁石"
	},
	{
		word: "전망대",
		hint: "주변의 경치를 한눈에 멀리 내려다볼 수 있게 높이 지은 곳",
		category: "건축",
		level: "초급",
		origin: "展望臺"
	},
	{
		word: "정거장",
		hint: "기차나 버스가 승객을 태우고 내리기 위해 멈추어 서는 곳",
		category: "교통",
		level: "초급",
		origin: "停車場"
	},
	{
		word: "정원사",
		hint: "정원의 꽃과 나무를 아름답게 가꾸고 돌보는 전문가",
		category: "직업",
		level: "초급",
		origin: "庭園師"
	},
	{
		word: "종이학",
		hint: "색종이를 정성껏 접어 만든 학 모양의 공예품",
		category: "놀이",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "종달새",
		hint: "봄 하늘 높이 날아올라 맑고 고운 소리로 지저귀는 새",
		category: "동물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "주전자",
		hint: "물이나 차를 끓여 따르기 편하게 부리와 손잡이가 달린 그릇",
		category: "주방",
		level: "초급",
		origin: "酒煎子"
	},
	{
		word: "주먹밥",
		hint: "밥에 참기름과 깨, 김 가루를 섞어 둥글게 뭉친 밥",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "줄다리기",
		hint: "두 편으로 나뉘어 굵은 밧줄을 마주 잡고 당겨 승부를 겨루는 놀이",
		category: "놀이",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "줄넘기",
		hint: "양손으로 줄을 돌리며 발로 깡충깡충 뛰어넘는 운동",
		category: "운동",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "지구본",
		hint: "지구의 대륙과 바다를 둥근 공 모양으로 축소하여 만든 모형",
		category: "지리",
		level: "초급",
		origin: "地球本"
	},
	{
		word: "지하철",
		hint: "도시의 땅속 터널에 선로를 깔아 빠르게 달리는 전철",
		category: "교통",
		level: "초급",
		origin: "地下鐵"
	},
	{
		word: "지우개",
		hint: "연필로 쓴 글씨나 그림을 문질러 지우는 문구",
		category: "문구",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "집현전",
		hint: "세종대왕 때 학자들이 모여 학문을 연구하고 한글 창제를 도운 기관",
		category: "역사",
		level: "중급",
		origin: "集賢殿"
	},
	{
		word: "차표",
		hint: "기차나 버스를 타기 위해 사는 승차권",
		category: "교통",
		level: "초급",
		origin: "車票"
	},
	{
		word: "참나무",
		hint: "도토리가 열리며 단단한 목재를 제공하는 활엽수",
		category: "식물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "참새",
		hint: "처마 밑이나 들판에서 짹짹거리며 무리 지어 사는 작은 새",
		category: "동물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "참기름",
		hint: "참깨를 볶아 짜낸 고소하고 향긋한 전통 기름",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "창경궁",
		hint: "서울에 있는 조선 시대의 아름다운 궁궐 중 하나",
		category: "역사",
		level: "중급",
		origin: "昌慶宮"
	},
	{
		word: "청포도",
		hint: "익어도 껍질이 푸른빛을 띠며 싱그럽고 달콤한 포도",
		category: "음식",
		level: "초급",
		origin: "靑葡萄"
	},
	{
		word: "청개구리",
		hint: "몸빛이 초록색이며 비가 오려 할 때 개골개골 우는 작은 개구리",
		category: "생물",
		level: "초급",
		origin: "靑개구리"
	},
	{
		word: "청사초롱",
		hint: "푸른 비단과 붉은 비단으로 꾸며 불을 밝히는 전통 등불",
		category: "전통",
		level: "중급",
		origin: "靑紗燭籠"
	},
	{
		word: "청출어람",
		hint: "푸른빛이 쪽에서 나왔으나 쪽보다 더 푸르듯 제자가 스승보다 나음",
		category: "사자성어",
		level: "중급",
		origin: "靑出於藍"
	},
	{
		word: "초승달",
		hint: "음력 초사흘 무렵 서쪽 하늘에 눈썹처럼 가늘게 뜨는 달",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "초가집",
		hint: "볏짚으로 이엉을 엮어 지붕을 이은 정겨운 옛집",
		category: "건축",
		level: "초급",
		origin: "草家집"
	},
	{
		word: "촛불",
		hint: "초의 심지에 불을 붙여 타오르는 잔잔한 불빛",
		category: "생활",
		level: "초급",
		origin: "燭불"
	},
	{
		word: "축구공",
		hint: "발로 차며 경기하는 축구에서 사용하는 둥근 공",
		category: "운동",
		level: "초급",
		origin: "蹴球공"
	},
	{
		word: "카메라",
		hint: "풍경이나 인물을 사진이나 영상으로 촬영하는 기기",
		category: "도구",
		level: "초급",
		origin: "외래어"
	},
	{
		word: "코끼리",
		hint: "코가 길고 커다란 귀와 상아를 가진 육상 최대의 초식 동물",
		category: "동물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "콩나물",
		hint: "콩을 그늘에서 물 주어 길러 국이나 무침으로 먹는 식재료",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "타악기",
		hint: "손이나 채로 두드려서 소리를 내는 악기",
		category: "음악",
		level: "초급",
		origin: "打樂器"
	},
	{
		word: "태양계",
		hint: "태양과 그 둘레를 도는 지구, 화성, 목성 등 행성들의 집단",
		category: "우주",
		level: "초급",
		origin: "太陽系"
	},
	{
		word: "태극기",
		hint: "흰 바탕에 태극 문양과 건곤감리 사괘가 그려진 대한민국 국기",
		category: "상징",
		level: "초급",
		origin: "太極旗"
	},
	{
		word: "태권도",
		hint: "손과 발을 사용하여 몸과 마음을 수련하는 대한민국 고유 무술",
		category: "운동",
		level: "초급",
		origin: "跆拳道"
	},
	{
		word: "토끼풀",
		hint: "세 잎 또는 행운의 네 잎이 돋아나는 들풀 클로버",
		category: "식물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "통나무",
		hint: "베어 낸 그대로 쪼개지 않은 둥근 나무",
		category: "목재",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "파란색",
		hint: "맑은 가을 하늘이나 깊은 바다와 같은 푸른 빛깔",
		category: "미술",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "판소리",
		hint: "한 명의 소리꾼이 고수의 북장단에 맞추어 노래와 아니리로 엮는 극음악",
		category: "국악",
		level: "중급",
		origin: "순우리말"
	},
	{
		word: "포도밭",
		hint: "포도나무를 줄지어 심어 가꾸는 과수원",
		category: "농업",
		level: "초급",
		origin: "葡萄밭"
	},
	{
		word: "풍경화",
		hint: "자연이나 도시의 아름다운 풍경을 화폭에 담은 그림",
		category: "예술",
		level: "초급",
		origin: "風景畫"
	},
	{
		word: "풍물놀이",
		hint: "여러 악기를 치고 상모를 돌리며 흥을 돋우는 우리 전통 민속놀이",
		category: "국악",
		level: "중급",
		origin: "風物놀이"
	},
	{
		word: "피아노",
		hint: "건반을 누르면 해머가 줄을 때려 맑은 음을 내는 건반악기",
		category: "음악",
		level: "초급",
		origin: "외래어"
	},
	{
		word: "하늘소",
		hint: "몸보다 훨씬 긴 더듬이를 가진 딱정벌레목 곤충",
		category: "곤충",
		level: "중급",
		origin: "순우리말"
	},
	{
		word: "하모니카",
		hint: "작은 구멍들에 입을 대고 숨을 불거나 들이마셔 연주하는 악기",
		category: "음악",
		level: "초급",
		origin: "외래어"
	},
	{
		word: "한라산",
		hint: "제주도 중앙에 우뚝 솟은 화산으로 정상에 백록담이 있음",
		category: "지리",
		level: "초급",
		origin: "漢拏山"
	},
	{
		word: "한옥마을",
		hint: "고즈넉한 기와집 등 전통 한옥들이 모여 있는 마을",
		category: "문화",
		level: "초급",
		origin: "韓屋마을"
	},
	{
		word: "한가위",
		hint: "음력 팔월 보름으로 햇곡식과 송편을 나누는 우리 큰 명절 추석",
		category: "명절",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "함박눈",
		hint: "겨울날 솜뭉치처럼 굵고 탐스럽게 펄펄 내리는 눈",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "해바라기",
		hint: "여름철 태양을 향해 커다란 노란 꽃을 피우는 식물",
		category: "식물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "해돋이",
		hint: "새벽에 수평선이나 산 너머로 붉은 해가 솟아오르는 광경",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "해수욕장",
		hint: "여름철 바닷가 모래사장에서 수영과 휴양을 즐기는 장소",
		category: "생활",
		level: "초급",
		origin: "海水浴場"
	},
	{
		word: "현미경",
		hint: "눈으로 보기 힘든 아주 작은 세포나 미생물을 확대해 보는 기구",
		category: "과학",
		level: "초급",
		origin: "顯微鏡"
	},
	{
		word: "호랑이",
		hint: "줄무늬 가죽과 용맹한 기상을 지닌 백수의 왕",
		category: "동물",
		level: "초급",
		origin: "虎狼이"
	},
	{
		word: "호박죽",
		hint: "잘 익은 늙은 호박을 푹 삶아 찹쌀 새알심을 넣고 쑨 달콤한 죽",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "호수공원",
		hint: "넓고 잔잔한 호수를 중심으로 산책로와 꽃밭을 꾸민 공원",
		category: "생활",
		level: "초급",
		origin: "湖水公園"
	},
	{
		word: "화선지",
		hint: "붓글씨나 수묵화를 그릴 때 먹물이 은은하게 스며드는 전통 종이",
		category: "예술",
		level: "중급",
		origin: "畫宣紙"
	},
	{
		word: "화승총",
		hint: "불붙인 노끈으로 화약에 불을 당겨 발사하던 옛날 총",
		category: "역사",
		level: "고급",
		origin: "火繩銃"
	},
	{
		word: "화수분",
		hint: "재물이 끝없이 솟아나 아무리 써도 줄지 않는다는 보물 단지",
		category: "전설",
		level: "중급",
		origin: "순우리말"
	},
	{
		word: "황금빛",
		hint: "가을 들판의 익은 벼처럼 눈부시게 반짝이는 노란 빛깔",
		category: "자연",
		level: "초급",
		origin: "黃金빛"
	},
	{
		word: "회오리",
		hint: "바람이나 물결이 나선형으로 세차게 휘돌아 올라가는 현상",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "훈민정음",
		hint: "백성을 가르치는 바른 소리라는 뜻의 한글 창제 당시 이름",
		category: "역사",
		level: "초급",
		origin: "訓民正音"
	},
	{
		word: "흥부전",
		hint: "제비 다리를 고쳐 주고 복을 받은 착한 흥부와 놀부의 이야기",
		category: "문학",
		level: "초급",
		origin: "興夫傳"
	},
	{
		word: "기러기",
		hint: "가을 하늘에 브이 자 대형을 이루며 날아가는 철새",
		category: "동물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "기상청",
		hint: "날씨를 관측하고 일기예보를 발표하는 국가 기관",
		category: "사회",
		level: "초급",
		origin: "氣象廳"
	},
	{
		word: "기차표",
		hint: "기차를 타기 위해 구매하는 승차권",
		category: "교통",
		level: "초급",
		origin: "汽車票"
	},
	{
		word: "기차역",
		hint: "열차가 출발하거나 정차하여 승객이 타고 내리는 역",
		category: "교통",
		level: "초급",
		origin: "汽車驛"
	},
	{
		word: "기압계",
		hint: "대기의 압력을 측정하는 과학 기구",
		category: "과학",
		level: "중급",
		origin: "氣壓計"
	},
	{
		word: "기와집",
		hint: "지붕을 기와로 정갈하게 이어 지은 전통 한옥",
		category: "건축",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "기념품",
		hint: "여행지나 뜻깊은 행사를 오래 기억하기 위해 간직하는 물건",
		category: "생활",
		level: "초급",
		origin: "紀念品"
	},
	{
		word: "거북선",
		hint: "등에 쇠못을 꽂고 용머리에서 포를 쏘던 조선 수군의 돌격 전함",
		category: "역사",
		level: "초급",
		origin: "거북船"
	},
	{
		word: "거미줄",
		hint: "거미가 먹이를 잡거나 이동하기 위해 뽑아내어 친 그물",
		category: "생물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "거문고",
		hint: "오동나무 통에 여섯 줄을 매어 술대로 치며 연주하는 국악기",
		category: "국악",
		level: "중급",
		origin: "순우리말"
	},
	{
		word: "고추장",
		hint: "고춧가루와 찹쌀, 메줏가루로 담근 매콤달콤한 우리 전통 장",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "고구마",
		hint: "땅속 뿌리가 달콤하고 포슬포슬하여 구워 먹거나 쪄 먹는 작물",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "고진감래",
		hint: "쓴 것이 다하면 단 것이 온다는 뜻으로 고생 끝에 낙이 옴",
		category: "사자성어",
		level: "중급",
		origin: "苦盡甘來"
	},
	{
		word: "고슴도치",
		hint: "등에 바늘 같은 가시가 돋아 있어 위험할 때 몸을 둥글게 마는 동물",
		category: "동물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "고래싸움",
		hint: "강한 자들끼리 다투는 사이에 약한 자가 피해를 입는 상황을 비유한 말",
		category: "속담",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "구름다리",
		hint: "골짜기나 도로 위에 공중으로 건너질러 놓은 다리",
		category: "건축",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "구절초",
		hint: "가을 들판에 하얗거나 연분홍빛으로 소담하게 피는 국화과 식물",
		category: "식물",
		level: "중급",
		origin: "九節草"
	},
	{
		word: "구구단",
		hint: "1부터 9까지의 곱셈을 외우기 쉽게 정리한 표",
		category: "수학",
		level: "초급",
		origin: "九九段"
	},
	{
		word: "국립공원",
		hint: "나라를 대표하는 아름다운 자연 생태계를 보존하기 위해 지정한 공원",
		category: "자연",
		level: "초급",
		origin: "國立公園"
	},
	{
		word: "국화차",
		hint: "말린 가을 국화꽃을 따뜻한 물에 우려내어 향기롭게 마시는 차",
		category: "음식",
		level: "초급",
		origin: "菊花茶"
	},
	{
		word: "금강산",
		hint: "계절마다 다른 이름으로 불릴 만큼 경치가 빼어난 한반도의 명산",
		category: "지리",
		level: "초급",
		origin: "金剛山"
	},
	{
		word: "금상첨화",
		hint: "비단 위에 꽃을 더하듯 좋은 일에 더욱 좋은 일이 겹침",
		category: "사자성어",
		level: "중급",
		origin: "錦上添花"
	},
	{
		word: "금수강산",
		hint: "비단에 수를 놓은 것처럼 아름답고 수려한 우리나라의 산천",
		category: "사자성어",
		level: "중급",
		origin: "錦繡江山"
	},
	{
		word: "개나리",
		hint: "이른 봄에 가지마다 노란 꽃을 가득 피우며 봄소식을 전하는 꽃나무",
		category: "식물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "개구리",
		hint: "올챙이에서 자라 물과 땅을 오가며 높이 뛰는 양서류",
		category: "생물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "개미집",
		hint: "개미들이 땅속에 여러 방과 통로를 만들어 모여 사는 집",
		category: "곤충",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "강강술래",
		hint: "밝은 보름달 아래 손을 잡고 둥글게 돌며 노래하고 춤추는 민속놀이",
		category: "전통",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "강아지풀",
		hint: "열매 이삭이 강아지 꼬리처럼 복슬복슬하게 생긴 한해살이 풀",
		category: "식물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "감나무",
		hint: "가을이면 주황빛 단감과 홍시가 주렁주렁 열리는 과일나무",
		category: "식물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "감자전",
		hint: "생감자를 곱게 갈아 팬에 노릇하고 쫀득하게 부쳐 낸 전",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "갈대밭",
		hint: "강가나 바닷가 습지에 갈대가 무성하게 우거진 곳",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "갈매기",
		hint: "바닷가 하늘을 날며 물고기를 잡아먹는 흰 바닷새",
		category: "동물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "계산기",
		hint: "복잡한 숫자의 셈을 빠르고 정확하게 처리하는 전자 기기",
		category: "도구",
		level: "초급",
		origin: "計算器"
	},
	{
		word: "계절풍",
		hint: "계절에 따라 대륙과 해양 사이에서 방향을 바꾸어 부는 바람",
		category: "기상",
		level: "중급",
		origin: "季節風"
	},
	{
		word: "과수원",
		hint: "사과, 배, 복숭아 등 과일나무를 전문적으로 재배하는 농원",
		category: "농업",
		level: "초급",
		origin: "果樹園"
	},
	{
		word: "과학관",
		hint: "과학 원리와 발명품을 직접 보고 체험할 수 있도록 꾸민 전시관",
		category: "교육",
		level: "초급",
		origin: "科學館"
	},
	{
		word: "광합성",
		hint: "식물이 햇빛과 물, 이산화탄소로 스스로 양분을 만드는 작용",
		category: "과학",
		level: "중급",
		origin: "光合成"
	},
	{
		word: "김치찌개",
		hint: "잘 익은 김치에 고기나 두부를 넣고 얼큰하게 끓인 한국 대표 찌개",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "김밥",
		hint: "구운 김 위에 밥과 여러 가지 속재료를 놓고 둘둘 말아 썬 음식",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "까치밥",
		hint: "가을에 감을 딸 때 새들이 먹으라고 나무 꼭대기에 남겨 두는 몇 알의 감",
		category: "우리말",
		level: "중급",
		origin: "순우리말"
	},
	{
		word: "꽃다발",
		hint: "축하할 일에 선물하기 위해 여러 송이의 꽃을 예쁘게 묶은 다발",
		category: "생활",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "꽃밭",
		hint: "아름다운 꽃들이 가득 피어나도록 가꾸어 놓은 밭",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "꽃샘추위",
		hint: "이른 봄에 꽃이 피는 것을 시샘하듯 일시적으로 찾아오는 추위",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "달팽이",
		hint: "등에 나선형 껍데기를 지고 촉촉한 곳을 느릿느릿 기어가는 생물",
		category: "생물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "달맞이꽃",
		hint: "저녁에 달이 뜰 무렵 노란 꽃잎을 활짝 여는 식물",
		category: "식물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "달리기",
		hint: "두 발을 빠르게 움직여 목적지까지 뛰어가는 육상 운동",
		category: "운동",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "단풍나무",
		hint: "가을이면 손바닥 모양의 잎이 붉고 고운 빛깔로 물드는 나무",
		category: "식물",
		level: "초급",
		origin: "丹楓나무"
	},
	{
		word: "단오절",
		hint: "음력 오월 오일로 창포물에 머리를 감고 그네를 뛰는 전통 명절",
		category: "명절",
		level: "중급",
		origin: "端午節"
	},
	{
		word: "다람쥐",
		hint: "등에 줄무늬가 있고 도토리나 밤을 볼주머니에 가득 모으는 동물",
		category: "동물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "다듬이질",
		hint: "다듬잇돌 위에 옷감을 놓고 방망이로 두드려 구김을 펴던 전통 가사일",
		category: "전통",
		level: "중급",
		origin: "순우리말"
	},
	{
		word: "독서실",
		hint: "조용한 분위기에서 책을 읽거나 공부할 수 있도록 마련된 공간",
		category: "교육",
		level: "초급",
		origin: "讀書室"
	},
	{
		word: "두루미",
		hint: "몸이 희고 머리 꼭대기가 붉으며 학이라고도 불리는 우아한 겨울 철새",
		category: "동물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "두부조림",
		hint: "두부를 노릇하게 지져 간장 양념장을 넣고 자작하게 조린 반찬",
		category: "음식",
		level: "초급",
		origin: "豆腐조림"
	},
	{
		word: "들국화",
		hint: "가을철 산과 들에 자연스럽게 피어나는 야생 국화를 통틀어 이르는 말",
		category: "식물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "등산로",
		hint: "산 정상이나 능선을 안전하게 오르내릴 수 있도록 낸 길",
		category: "생활",
		level: "초급",
		origin: "登山路"
	},
	{
		word: "등잔불",
		hint: "기름을 담은 작은 그릇에 심지를 꽂아 불을 밝히던 옛 조명",
		category: "전통",
		level: "중급",
		origin: "燈盞불"
	},
	{
		word: "라디오",
		hint: "전파를 수신하여 뉴스나 음악 방송을 들려주는 음향 기기",
		category: "생활",
		level: "초급",
		origin: "외래어"
	},
	{
		word: "레몬차",
		hint: "상큼한 레몬 과즙이나 절임을 따뜻한 물에 타서 마시는 차",
		category: "음식",
		level: "초급",
		origin: "외래어"
	},
	{
		word: "리듬감",
		hint: "음악의 박자와 흐름을 자연스럽게 느끼고 표현하는 감각",
		category: "음악",
		level: "초급",
		origin: "외래어"
	},
	{
		word: "만화경",
		hint: "거울이 들어 있는 원통을 돌리면 대칭된 색유리 무늬가 변하는 장난감",
		category: "도구",
		level: "중급",
		origin: "萬華鏡"
	},
	{
		word: "망원경",
		hint: "렌즈나 거울을 이용해 멀리 있는 별이나 풍경을 크게 확대해 보는 기구",
		category: "과학",
		level: "초급",
		origin: "望遠鏡"
	},
	{
		word: "매화꽃",
		hint: "추운 겨울 끝자락에 눈 속에서도 향기롭게 피어나는 매실나무의 꽃",
		category: "식물",
		level: "초급",
		origin: "梅花꽃"
	},
	{
		word: "메아리",
		hint: "산이나 절벽에 부딪혀 다시 되돌아 들려오는 소리",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "메밀꽃",
		hint: "가을 들판에 소금을 뿌린 듯 하얗게 피어나는 메밀의 꽃",
		category: "식물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "목걸이",
		hint: "보석이나 줄을 꿰어 목에 아름답게 걸치는 장신구",
		category: "생활",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "목도리",
		hint: "추위를 막기 위해 목에 포근하게 두르는 방한용품",
		category: "생활",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "밀짚모자",
		hint: "밀짚이나 보리짚을 엮어 챙이 넓게 만든 여름 모자",
		category: "생활",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "박물관",
		hint: "역사 유물과 예술품을 수집하여 보존하고 전시하는 문화 시설",
		category: "문화",
		level: "초급",
		origin: "博物館"
	},
	{
		word: "박하사탕",
		hint: "입안이 화하고 시원해지는 박하 향을 넣어 만든 사탕",
		category: "간식",
		level: "초급",
		origin: "薄荷沙糖"
	},
	{
		word: "발걸음",
		hint: "발을 떼어 앞으로 옮겨 딛는 걸음의 모양이나 속도",
		category: "일반",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "발명품",
		hint: "이전에 없던 새로운 물건이나 기술을 처음으로 연구해 만든 것",
		category: "과학",
		level: "초급",
		origin: "發明品"
	},
	{
		word: "밤하늘",
		hint: "달과 별이 반짝이는 어두운 밤의 하늘",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "배나무",
		hint: "봄에 하얀 배꽃이 피고 가을에 시원하고 단 배가 열리는 나무",
		category: "식물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "버드나무",
		hint: "물가에 자라며 가늘고 긴 가지가 바람에 부드럽게 흔들리는 나무",
		category: "식물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "번개불",
		hint: "비구름 속에서 전기 방전이 일어나 하늘에 번쩍이는 강한 불빛",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "벼락치기",
		hint: "평소에 미루어 두었던 공부나 일을 기한이 닥쳐서야 급히 몰아서 함",
		category: "생활",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "별주부전",
		hint: "용왕의 병을 고치려 자라가 토끼의 간을 구하러 육지로 나가는 고전 소설",
		category: "문학",
		level: "중급",
		origin: "鼈主簿傳"
	},
	{
		word: "복숭아",
		hint: "향기가 달콤하고 과즙이 풍부한 여름철 대표 과일",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "봉숭아",
		hint: "여름철 꽃잎과 백반을 찧어 손톱에 붉은 물을 들이는 친숙한 꽃",
		category: "식물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "비단길",
		hint: "고대 중국과 중앙아시아, 유럽을 이어 비단과 문물을 교류하던 실크로드",
		category: "역사",
		level: "중급",
		origin: "緋緞길"
	},
	{
		word: "산나물",
		hint: "산에서 자연적으로 자라나는 향긋하고 건강한 나물",
		category: "음식",
		level: "초급",
		origin: "山나물"
	},
	{
		word: "삼겹살",
		hint: "살코기와 비계가 세 겹으로 어우러진 고소한 돼지고기 부위",
		category: "음식",
		level: "초급",
		origin: "三겹살"
	},
	{
		word: "삼천리",
		hint: "한반도의 남북 끝에서 끝까지의 거리를 상징적으로 이르는 말",
		category: "지리",
		level: "중급",
		origin: "三千里"
	},
	{
		word: "새벽달",
		hint: "날이 밝아 오는 새벽녘 서쪽 하늘에 희미하게 남아 있는 달",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "새벽별",
		hint: "새벽 하늘에서 유난히 맑고 밝게 빛나는 샛별",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "색동저고리",
		hint: "명절이나 돌잔치에 입는 소매에 여러 빛깔 천을 이어 만든 한복 저고리",
		category: "전통",
		level: "초급",
		origin: "色動저고리"
	},
	{
		word: "색연필",
		hint: "여러 가지 색깔의 심을 넣어 그림을 그리고 색칠하는 연필",
		category: "문구",
		level: "초급",
		origin: "色鉛筆"
	},
	{
		word: "선생님",
		hint: "학교나 배움터에서 학생들을 가르치고 이끌어 주는 분",
		category: "교육",
		level: "초급",
		origin: "先生님"
	},
	{
		word: "설날",
		hint: "새해 첫날 온 가족이 모여 차례를 지내고 세배와 떡국을 나누는 명절",
		category: "명절",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "솜사탕",
		hint: "설탕을 녹여 가는 실처럼 뽑아 구름처럼 뭉친 달콤한 간식",
		category: "간식",
		level: "초급",
		origin: "솜沙糖"
	},
	{
		word: "송편",
		hint: "추석에 햅쌀가루 반죽에 깨나 콩 소를 넣고 솔잎을 깔아 찐 반달 모양 떡",
		category: "음식",
		level: "초급",
		origin: "松편"
	},
	{
		word: "수정구슬",
		hint: "맑고 투명한 수정으로 둥글게 깎아 만든 구슬",
		category: "보석",
		level: "초급",
		origin: "水晶구슬"
	},
	{
		word: "수수께끼",
		hint: "비유적인 설명이나 질문을 듣고 정답을 알아맞히는 말놀이",
		category: "놀이",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "식혜",
		hint: "엿기름 물에 밥을 삭혀 생강 향을 더해 차갑게 마시는 전통 음료",
		category: "음식",
		level: "초급",
		origin: "食醯"
	},
	{
		word: "신발장",
		hint: "현관에 두고 신발을 가지런히 정리해 넣는 가구",
		category: "생활",
		level: "초급",
		origin: "신발欌"
	},
	{
		word: "실로폰",
		hint: "길이가 다른 나무나 금속 음판을 채로 두드려 연주하는 타악기",
		category: "음악",
		level: "초급",
		origin: "외래어"
	},
	{
		word: "아기곰",
		hint: "태어난 지 얼마 되지 않아 작고 귀여운 새끼 곰",
		category: "동물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "아카시아",
		hint: "초여름 하얀 꽃송이에서 달콤한 꿀 향기를 풍기는 나무",
		category: "식물",
		level: "초급",
		origin: "외래어"
	},
	{
		word: "안경점",
		hint: "시력을 검사하고 눈에 맞는 안경이나 렌즈를 맞추어 파는 가게",
		category: "생활",
		level: "초급",
		origin: "眼鏡店"
	},
	{
		word: "약수터",
		hint: "산속 바위틈에서 몸에 좋은 맑은 샘물이 솟아나는 곳",
		category: "자연",
		level: "초급",
		origin: "藥水터"
	},
	{
		word: "약과",
		hint: "밀가루에 꿀과 참기름을 넣고 반죽해 국화 모양으로 찍어 기름에 튀긴 한과",
		category: "음식",
		level: "초급",
		origin: "藥果"
	},
	{
		word: "양떼목장",
		hint: "푸른 초원에서 하얀 양들을 방목하여 기르는 목장",
		category: "자연",
		level: "초급",
		origin: "羊떼牧場"
	},
	{
		word: "양탄자",
		hint: "바닥에 깔기 위해 털실로 두껍고 무늬 있게 짠 카펫",
		category: "생활",
		level: "중급",
		origin: "洋毯子"
	},
	{
		word: "어깨동무",
		hint: "친한 친구끼리 서로 어깨에 팔을 둘러 얹고 나란히 걷는 모습",
		category: "우리말",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "얼룩말",
		hint: "온몸에 검은색과 흰색의 선명한 줄무늬가 있는 초식 동물",
		category: "동물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "얼음판",
		hint: "추운 겨울 물이 꽁꽁 얼어붙어 미끄럽게 된 바닥",
		category: "겨울",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "연날리기",
		hint: "종이와 대나무 살로 만든 연을 실에 매달아 바람에 띄우는 민속놀이",
		category: "놀이",
		level: "초급",
		origin: "鳶날리기"
	},
	{
		word: "연필꽂이",
		hint: "책상 위에 연필이나 볼펜을 꽂아 정리하는 통",
		category: "문구",
		level: "초급",
		origin: "鉛筆꽂이"
	},
	{
		word: "열기구",
		hint: "커다란 주머니 속 공기를 데워 하늘 높이 떠오르는 비행 기구",
		category: "교통",
		level: "초급",
		origin: "熱氣球"
	},
	{
		word: "열대야",
		hint: "한여름 밤에도 기온이 내려가지 않아 무더위가 이어지는 밤",
		category: "기상",
		level: "중급",
		origin: "熱帶夜"
	},
	{
		word: "염소자리",
		hint: "겨울철 남쪽 하늘에 보이는 황도 십이궁의 열 번째 별자리",
		category: "우주",
		level: "중급",
		origin: "星座"
	},
	{
		word: "영사기",
		hint: "필름에 담긴 영상을 스크린에 크게 비추어 상영하는 기계",
		category: "도구",
		level: "중급",
		origin: "映寫機"
	},
	{
		word: "온도계",
		hint: "공기나 물, 몸의 차고 더운 정도를 눈금으로 재는 기구",
		category: "도구",
		level: "초급",
		origin: "溫度計"
	},
	{
		word: "온새미로",
		hint: "가르거나 쪼개지 않고 자연 그대로 언제나 변함없이",
		category: "우리말",
		level: "고급",
		origin: "순우리말"
	},
	{
		word: "옹달샘",
		hint: "숲속 나무 그늘 아래 작고 오목하게 고여 솟아나는 맑은 샘",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "왕관",
		hint: "임금이나 여왕이 권위의 상징으로 머리에 쓰는 화려한 관",
		category: "역사",
		level: "초급",
		origin: "王冠"
	},
	{
		word: "외나무다리",
		hint: "개울 위에 통나무 한 개만 걸쳐 놓아 건너기 좁은 다리",
		category: "건축",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "요술봉",
		hint: "동화 속 요정이나 마법사가 신비한 마법을 부릴 때 흔드는 지팡이",
		category: "이야기",
		level: "초급",
		origin: "妖術棒"
	},
	{
		word: "우유빛",
		hint: "신선한 우유처럼 뽀얗고 부드러운 흰빛",
		category: "미술",
		level: "초급",
		origin: "牛乳빛"
	},
	{
		word: "운동장",
		hint: "학교나 체육 시설에서 달리기와 공놀이를 할 수 있는 넓은 마당",
		category: "학교",
		level: "초급",
		origin: "運動場"
	},
	{
		word: "운동화",
		hint: "걷거나 달릴 때 발이 편하도록 만든 활동적인 신발",
		category: "생활",
		level: "초급",
		origin: "運動靴"
	},
	{
		word: "원두막",
		hint: "수박이나 참외밭을 지키기 위해 기둥을 세워 높직하게 지은 막",
		category: "전통",
		level: "중급",
		origin: "園頭幕"
	},
	{
		word: "원숭이",
		hint: "나무를 잘 타고 영리하며 사람과 생김새가 비슷한 동물",
		category: "동물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "유성우",
		hint: "밤하늘에서 수많은 별똥별이 비처럼 쏟아져 내리는 천문 현상",
		category: "우주",
		level: "중급",
		origin: "流星雨"
	},
	{
		word: "유자차",
		hint: "노란 유자를 꿀이나 설탕에 절여 따뜻한 물에 타 마시는 향긋한 차",
		category: "음식",
		level: "초급",
		origin: "柚子茶"
	},
	{
		word: "윤슬",
		hint: "햇빛이나 달빛에 비치어 반짝이는 잔물결을 뜻하는 순우리말",
		category: "우리말",
		level: "중급",
		origin: "순우리말"
	},
	{
		word: "윷놀이",
		hint: "네 개의 나무 가락을 던져 도, 개, 걸, 윷, 모로 말을 쓰는 명절 놀이",
		category: "놀이",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "음악회",
		hint: "연주자나 성악가가 무대에서 청중에게 아름다운 음악을 들려주는 모임",
		category: "예술",
		level: "초급",
		origin: "音樂會"
	},
	{
		word: "작곡가",
		hint: "새로운 노래나 연주곡의 멜로디와 화음을 창작하는 음악가",
		category: "음악",
		level: "초급",
		origin: "作曲家"
	},
	{
		word: "잔디밭",
		hint: "푸른 잔디가 촘촘하고 곱게 깔려 있는 뜰이나 공원",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "잠자리",
		hint: "가을 하늘을 날아다니며 얇고 투명한 날개 네 장을 가진 곤충",
		category: "곤충",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "장갑차",
		hint: "두꺼운 강철 장갑으로 둘러싸여 병력을 안전하게 수송하는 군용 차량",
		category: "군사",
		level: "중급",
		origin: "裝甲車"
	},
	{
		word: "장미꽃",
		hint: "줄기에 가시가 있고 매혹적인 향기와 화려한 꽃잎을 지닌 꽃",
		category: "식물",
		level: "초급",
		origin: "薔薇꽃"
	},
	{
		word: "장화",
		hint: "비가 오거나 눈이 올 때 발이 젖지 않도록 목이 길게 만든 신발",
		category: "생활",
		level: "초급",
		origin: "長靴"
	},
	{
		word: "저금통",
		hint: "동전이나 지폐를 차곡차곡 모아 저축하는 작은 통",
		category: "생활",
		level: "초급",
		origin: "貯金桶"
	},
	{
		word: "전깃줄",
		hint: "전기를 보내기 위해 전봇대 사이에 길게 연결한 전선",
		category: "생활",
		level: "초급",
		origin: "電氣줄"
	},
	{
		word: "제비꽃",
		hint: "강남 갔던 제비가 돌아올 무렵 보랏빛으로 수줍게 피는 봄꽃",
		category: "식물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "조각배",
		hint: "물 위에 떠 있는 작고 아담한 나룻배",
		category: "교통",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "조약돌",
		hint: "강가나 바닷가에서 물결에 깎여 동글동글하고 매끄러워진 작은 돌",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "종이배",
		hint: "종이를 접어 물 위에 띄우며 노는 작은 장난감 배",
		category: "놀이",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "진달래",
		hint: "이른 봄 산기슭을 분홍빛으로 물들이며 화전을 부쳐 먹는 봄꽃",
		category: "식물",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "징검다리",
		hint: "얕은 개울을 건너기 위해 물속에 일정한 간격으로 놓은 돌다리",
		category: "건축",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "짚신",
		hint: "볏짚을 꼬아 정성껏 삼아 신던 우리 옛 신발",
		category: "전통",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "쪽빛",
		hint: "쪽 풀로 물들인 것처럼 티 없이 맑고 깊은 파란 빛깔",
		category: "우리말",
		level: "중급",
		origin: "순우리말"
	},
	{
		word: "참외밭",
		hint: "여름철 노랗고 달콤한 참외가 덩굴마다 주렁주렁 열리는 밭",
		category: "농업",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "책갈피",
		hint: "읽던 책의 페이지를 쉽게 찾도록 책장 사이에 끼워 두는 표지",
		category: "문구",
		level: "초급",
		origin: "冊갈피"
	},
	{
		word: "책가방",
		hint: "학교에 갈 때 교과서와 학용품을 넣어 메는 가방",
		category: "학교",
		level: "초급",
		origin: "冊가방"
	},
	{
		word: "천문대",
		hint: "거대한 망원경으로 별과 행성, 우주 현상을 관측하고 연구하는 곳",
		category: "우주",
		level: "초급",
		origin: "天文臺"
	},
	{
		word: "천리마",
		hint: "하루에 천 리를 달릴 만큼 매우 빠르고 준수한 명마",
		category: "역사",
		level: "중급",
		origin: "千里馬"
	},
	{
		word: "철쭉꽃",
		hint: "봄철 산 능선을 따라 연분홍과 진분홍으로 화려하게 피는 꽃",
		category: "식물",
		level: "초급",
		origin: "躑躅꽃"
	},
	{
		word: "청둥오리",
		hint: "수컷의 머리가 짙은 초록빛으로 빛나는 야생 오리",
		category: "동물",
		level: "초급",
		origin: "靑둥오리"
	},
	{
		word: "청진기",
		hint: "의사가 환자의 심장 소리나 숨소리를 들어 진찰하는 의료 기구",
		category: "의학",
		level: "초급",
		origin: "聽診器"
	},
	{
		word: "초롱불",
		hint: "바람에 꺼지지 않게 사방을 감싼 초롱 안에 켠 등불",
		category: "전통",
		level: "중급",
		origin: "燭籠불"
	},
	{
		word: "초승달빛",
		hint: "초저녁 서쪽 하늘에 걸린 눈썹 모양 초승달의 은은한 빛",
		category: "자연",
		level: "중급",
		origin: "순우리말"
	},
	{
		word: "추석날",
		hint: "가을의 한가운데 달인 음력 팔월 보름 명절날",
		category: "명절",
		level: "초급",
		origin: "秋夕날"
	},
	{
		word: "치자꽃",
		hint: "초여름 맑고 진한 향기를 퍼뜨리며 하얗게 피는 꽃",
		category: "식물",
		level: "중급",
		origin: "梔子꽃"
	},
	{
		word: "칼국수",
		hint: "밀가루 반죽을 얇게 밀어 칼로 가늘게 썰어 장국에 끓인 국수",
		category: "음식",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "코스모스",
		hint: "가을바람에 한들한들 흔들리며 길가에 피어나는 가을꽃",
		category: "식물",
		level: "초급",
		origin: "외래어"
	},
	{
		word: "콩쥐팥쥐",
		hint: "마음씨 착한 콩쥐가 동물들의 도움으로 어려움을 이겨 내는 전래동화",
		category: "문학",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "탁구공",
		hint: "탁구채로 주고받으며 경기하는 작고 가벼운 공",
		category: "운동",
		level: "초급",
		origin: "卓球공"
	},
	{
		word: "태양열",
		hint: "태양에서 지구로 보내오는 따뜻한 열에너지",
		category: "과학",
		level: "초급",
		origin: "太陽熱"
	},
	{
		word: "팽이치기",
		hint: "얼음판이나 마당에서 팽이를 채로 쳐서 오래 돌리는 전통 놀이",
		category: "놀이",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "편지봉투",
		hint: "정성껏 쓴 편지를 접어 넣고 주소를 적어 보내는 종이봉투",
		category: "생활",
		level: "초급",
		origin: "便紙封套"
	},
	{
		word: "폭포수",
		hint: "높은 절벽 위에서 아래로 세차게 쏟아져 내리는 물줄기",
		category: "자연",
		level: "초급",
		origin: "瀑布水"
	},
	{
		word: "풍선껌",
		hint: "씹다가 입으로 불면 둥근 풍선처럼 부풀어 오르는 껌",
		category: "간식",
		level: "초급",
		origin: "風船껌"
	},
	{
		word: "하늘다리",
		hint: "높은 산봉우리와 봉우리 사이를 공중에서 이어 놓은 출렁다리",
		category: "건축",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "학용품",
		hint: "학생이 공부할 때 쓰는 공책, 연필, 지우개 등의 물품",
		category: "학교",
		level: "초급",
		origin: "學用品"
	},
	{
		word: "한지공예",
		hint: "닥나무 껍질로 만든 전통 한지를 오리고 붙여 그릇이나 소품을 만드는 예술",
		category: "예술",
		level: "중급",
		origin: "韓紙工藝"
	},
	{
		word: "함박웃음",
		hint: "함박꽃이 활짝 피듯 입을 크게 벌리고 환하게 웃는 웃음",
		category: "마음",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "해녀",
		hint: "산소 장비 없이 바다 깊이 잠수하여 전복, 소라, 미역을 따는 여성 어부",
		category: "문화",
		level: "초급",
		origin: "海女"
	},
	{
		word: "해시계",
		hint: "해가 비칠 때 바늘 그림자의 위치로 시각을 재던 과학 기구 앙부일구",
		category: "역사",
		level: "중급",
		origin: "해時計"
	},
	{
		word: "향수병",
		hint: "좋은 향기가 나는 액체 향수를 담아 뿌리는 작은 병",
		category: "생활",
		level: "초급",
		origin: "香水甁"
	},
	{
		word: "허수아비",
		hint: "논밭의 곡식을 쪼아 먹는 새를 쫓기 위해 짚으로 사람처럼 만들어 세운 것",
		category: "농업",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "호두과자",
		hint: "밀가루 반죽 속에 달콤한 팥앙금과 고소한 호두 알맹이를 넣어 구운 과자",
		category: "간식",
		level: "초급",
		origin: "胡桃菓子"
	},
	{
		word: "호롱불",
		hint: "사기그릇에 기름을 부어 심지에 불을 켜던 옛날 등불",
		category: "전통",
		level: "중급",
		origin: "순우리말"
	},
	{
		word: "홍길동전",
		hint: "허균이 지은 최초의 한글 소설로 의적 홍길동의 활약을 그린 고전",
		category: "문학",
		level: "초급",
		origin: "洪吉童傳"
	},
	{
		word: "화살표",
		hint: "방향이나 위치를 가리키기 위해 화살 모양으로 그린 기호",
		category: "일반",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "화분",
		hint: "흙을 담아 집 안이나 베란다에서 꽃과 식물을 가꾸는 그릇",
		category: "생활",
		level: "초급",
		origin: "花盆"
	},
	{
		word: "황소바람",
		hint: "문틈이나 벽 틈새로 세차게 들이닥치는 매서운 겨울바람",
		category: "자연",
		level: "중급",
		origin: "순우리말"
	},
	{
		word: "흙냄새",
		hint: "비가 내린 뒤 땅에서 촉촉하고 구수하게 올라오는 자연의 향기",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	},
	{
		word: "흰구름",
		hint: "푸른 하늘에 솜사탕처럼 하얗게 떠가는 구름",
		category: "자연",
		level: "초급",
		origin: "순우리말"
	}
];
var DEFAULT_WORDCROSS_DATABASE = {
	totalCount: RAW_WORDS.length,
	words: RAW_WORDS
};
// src/game/wordcrossGenerator.ts
var _Resources;
/**
* Deterministic Seeded Random matching Unity's Random.InitState(seed) behavior.
* Guarantees that the same integer stageNumber always produces the exact same puzzle board.
*/
var DeterministicRandom = class {
	constructor() {
		this.state = 1;
	}
	InitState(seed) {
		let s = (Math.floor(seed) ^ 1831565813) >>> 0;
		if (s === 0) s = 324508639;
		this.state = s;
	}
	nextFloat() {
		let t = this.state += 1831565813;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		this.state = t >>> 0;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	}
	Range(minInclusive, maxExclusive) {
		if (maxExclusive <= minInclusive) return minInclusive;
		return minInclusive + Math.floor(this.nextFloat() * (maxExclusive - minInclusive));
	}
	shuffleInPlace(arr) {
		for (let i = arr.length - 1; i > 0; i--) {
			const j = this.Range(0, i + 1);
			const tmp = arr[i];
			arr[i] = arr[j];
			arr[j] = tmp;
		}
		return arr;
	}
};
/**
* Unity JsonUtility & Resources.Load offline equivalent for Assets/Resources/wordcross_words-v2.json
*/
var JsonUtility = class {
	static FromJson(jsonText) {
		return JSON.parse(jsonText);
	}
};
var Resources = class Resources {
	static setCustomWordcrossJson(jsonText) {
		Resources.customJsonText = jsonText;
	}
	static hasCustomWordcrossJson() {
		return Resources.customJsonText !== null;
	}
	static Load(path) {
		if (path === "wordcross_words-v2" || path === "Assets/Resources/wordcross_words-v2.json" || path.endsWith("wordcross_words-v2")) {
			if (Resources.customJsonText) return { text: Resources.customJsonText };
			return { text: JSON.stringify(DEFAULT_WORDCROSS_DATABASE) };
		}
		throw new Error(`Resource not found at path: ${path}`);
	}
};
_Resources = Resources;
_Resources.customJsonText = null;
/**
* Offline Crossword Stage Generator
* - Loads Assets/Resources/wordcross_words-v2.json via Resources.Load + JsonUtility.FromJson
* - Pre-builds Dictionary<char, List<WordEntry>> (Map<string, WordEntry[]>) character index
* - Uses Random.InitState(stageNumber) for 100% deterministic generation per stageNumber
* - Places 20~25 intersecting words on a 15x15 grid
*/
var CrosswordStageGenerator = class {
	constructor(customDatabase) {
		this.database = null;
		this.charIndex = /* @__PURE__ */ new Map();
		this.validWords = [];
		this.random = new DeterministicRandom();
		if (customDatabase) this.initializeFromDatabase(customDatabase);
		else this.loadFromResources();
	}
	loadFromResources() {
		if (!Resources.hasCustomWordcrossJson()) {
			this.initializeFromDatabase(DEFAULT_WORDCROSS_DATABASE);
			return;
		}
		const textAsset = Resources.Load("wordcross_words-v2");
		const parsed = JsonUtility.FromJson(textAsset.text);
		this.initializeFromDatabase(parsed);
	}
	initializeFromDatabase(db) {
		this.database = db;
		this.charIndex.clear();
		this.validWords = [];
		const seenWords = /* @__PURE__ */ new Set();
		const rawList = Array.isArray(db?.words) ? db.words : [];
		for (const item of rawList) {
			if (!item || typeof item.word !== "string" || typeof item.hint !== "string") continue;
			const cleanWord = item.word.trim();
			const chars = Array.from(cleanWord);
			if (chars.length < 2 || chars.length > 5) continue;
			if (seenWords.has(cleanWord)) continue;
			seenWords.add(cleanWord);
			const normalizedEntry = {
				word: cleanWord,
				hint: item.hint.trim(),
				category: (item.category || "일반").trim(),
				level: (item.level || "초급").trim(),
				origin: (item.origin || "").trim()
			};
			const uniqueCharsInWord = new Set(chars);
			for (const ch of uniqueCharsInWord) {
				let bucket = this.charIndex.get(ch);
				if (!bucket) {
					bucket = [];
					this.charIndex.set(ch, bucket);
				}
				bucket.push(normalizedEntry);
			}
			this.validWords.push({
				entry: normalizedEntry,
				chars,
				connectivityScore: 0
			});
		}
		for (const vw of this.validWords) {
			let score = 0;
			for (const ch of vw.chars) score += (this.charIndex.get(ch)?.length || 1) - 1;
			vw.connectivityScore = score;
		}
	}
	getCharIndex() {
		return this.charIndex;
	}
	getTotalWordCount() {
		return this.validWords.length;
	}
	/**
	* Generates a crossword board for the given stageNumber with random word selection.
	* Returns List<CrosswordWordData> with intersecting words.
	* Deprioritizes words in previouslyUsedWords so earlier stages' words are avoided whenever possible.
	*/
	generateStage(stageNumber, customGridSize = 15, customTargetWords, previouslyUsedWords, customSeed) {
		const safeStage = Math.max(1, Math.floor(stageNumber));
		const gridSize = Math.max(8, Math.min(25, Math.floor(customGridSize || 15)));
		const excludedSet = new Set(previouslyUsedWords ?? []);
		const baseEntropy = customSeed !== void 0 ? customSeed : typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function" ? crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1))[0] : (Math.floor(Math.random() * 2147483647) ^ Math.floor((typeof performance !== "undefined" ? performance.now() : Date.now()) * 1e3)) >>> 0;
		const targetCount = customTargetWords !== void 0 ? Math.max(5, Math.min(35, Math.floor(customTargetWords))) : 20 + Math.abs(baseEntropy + safeStage * 7) % 6;
		const minTargetAccept = Math.min(targetCount, 12);
		let bestResult = [];
		let bestScore = -Infinity;
		for (let attempt = 0; attempt < 6; attempt++) {
			this.random.InitState((baseEntropy ^ safeStage * 10007 + attempt * 7919 + attempt * 104729) >>> 0);
			const runResult = this.tryBuildGrid(targetCount, gridSize, excludedSet);
			const reusedCount = runResult.words.reduce((acc, w) => acc + (excludedSet.has(w.word) ? 1 : 0), 0);
			const runScore = runResult.words.length * 100 + runResult.totalIntersections * 10 - reusedCount * 500;
			if (runResult.words.length >= minTargetAccept && runScore > bestScore) {
				bestResult = runResult.words;
				bestScore = runScore;
				if (runResult.words.length >= targetCount && reusedCount === 0) break;
			} else if (bestResult.length < minTargetAccept && runResult.words.length > bestResult.length) {
				bestResult = runResult.words;
				bestScore = runScore;
			}
		}
		return bestResult;
	}
	tryBuildGrid(targetCount, size = 15, previouslyUsedSet = /* @__PURE__ */ new Set()) {
		const gridChar = Array.from({ length: size }, () => Array.from({ length: size }, () => null));
		const gridHoriz = Array.from({ length: size }, () => Array.from({ length: size }, () => false));
		const gridVert = Array.from({ length: size }, () => Array.from({ length: size }, () => false));
		const placedWords = [];
		const usedWords = /* @__PURE__ */ new Set();
		let totalIntersections = 0;
		const placeWordOnGrid = (entry, x, y, direction) => {
			const chars = Array.from(entry.word);
			const dx = direction === "Horizontal" ? 1 : 0;
			const dy = direction === "Horizontal" ? 0 : 1;
			for (let i = 0; i < chars.length; i++) {
				const cx = x + i * dx;
				const cy = y + i * dy;
				gridChar[cy][cx] = chars[i];
				if (direction === "Horizontal") gridHoriz[cy][cx] = true;
				else gridVert[cy][cx] = true;
			}
			usedWords.add(entry.word);
			placedWords.push({
				x,
				y,
				direction,
				chars,
				word: entry.word,
				hint: entry.hint,
				category: entry.category,
				level: entry.level,
				origin: entry.origin
			});
		};
		const canPlaceWord = (chars, x, y, direction, requireIntersection) => {
			const len = chars.length;
			const dx = direction === "Horizontal" ? 1 : 0;
			const dy = direction === "Horizontal" ? 0 : 1;
			if (x < 0 || y < 0) return -1;
			if (x + (len - 1) * dx >= size || y + (len - 1) * dy >= size) return -1;
			const beforeX = x - dx;
			const beforeY = y - dy;
			if (beforeX >= 0 && beforeY >= 0 && gridChar[beforeY][beforeX] !== null) return -1;
			const afterX = x + len * dx;
			const afterY = y + len * dy;
			if (afterX < size && afterY < size && gridChar[afterY][afterX] !== null) return -1;
			let intersections = 0;
			for (let i = 0; i < len; i++) {
				const cx = x + i * dx;
				const cy = y + i * dy;
				const existing = gridChar[cy][cx];
				if (existing !== null) {
					if (existing !== chars[i]) return -1;
					if (direction === "Horizontal" && gridHoriz[cy][cx]) return -1;
					if (direction === "Vertical" && gridVert[cy][cx]) return -1;
					intersections++;
				} else if (direction === "Horizontal") {
					if (cy > 0 && gridChar[cy - 1][cx] !== null) return -1;
					if (cy < size - 1 && gridChar[cy + 1][cx] !== null) return -1;
				} else {
					if (cx > 0 && gridChar[cy][cx - 1] !== null) return -1;
					if (cx < size - 1 && gridChar[cy][cx + 1] !== null) return -1;
				}
			}
			if (requireIntersection && intersections === 0) return -1;
			return intersections;
		};
		const seedCandidates = this.validWords.filter((w) => w.chars.length >= 3 && w.chars.length <= 4 && w.connectivityScore >= 6);
		const freshSeedCandidates = seedCandidates.filter((w) => !previouslyUsedSet.has(w.entry.word));
		const freshAllWords = this.validWords.filter((w) => !previouslyUsedSet.has(w.entry.word));
		const seedPool = freshSeedCandidates.length > 0 ? freshSeedCandidates : freshAllWords.length > 0 ? freshAllWords : seedCandidates.length > 0 ? seedCandidates : this.validWords;
		const firstWordObj = seedPool[this.random.Range(0, seedPool.length)];
		if (!firstWordObj) return {
			words: [],
			totalIntersections: 0
		};
		const firstDir = this.random.Range(0, 2) === 0 ? "Horizontal" : "Vertical";
		const jitterA = this.random.Range(-2, 3);
		const jitterB = this.random.Range(-2, 3);
		const startX = firstDir === "Horizontal" ? Math.max(0, Math.min(size - firstWordObj.chars.length, Math.floor((size - firstWordObj.chars.length) / 2) + jitterA)) : Math.max(1, Math.min(size - 2, Math.floor(size / 2) + jitterB));
		const startY = firstDir === "Vertical" ? Math.max(0, Math.min(size - firstWordObj.chars.length, Math.floor((size - firstWordObj.chars.length) / 2) + jitterA)) : Math.max(1, Math.min(size - 2, Math.floor(size / 2) + jitterB));
		placeWordOnGrid(firstWordObj.entry, startX, startY, firstDir);
		let stalledRounds = 0;
		while (placedWords.length < targetCount && stalledRounds < 8) {
			let placedInRound = false;
			const anchorOrder = Array.from({ length: placedWords.length }, (_, idx) => idx);
			this.random.shuffleInPlace(anchorOrder);
			let bestCandidate = null;
			for (const wordIdx of anchorOrder) {
				const pw = placedWords[wordIdx];
				const perpDir = pw.direction === "Horizontal" ? "Vertical" : "Horizontal";
				const dx = pw.direction === "Horizontal" ? 1 : 0;
				const dy = pw.direction === "Horizontal" ? 0 : 1;
				const charIndices = Array.from({ length: pw.chars.length }, (_, i) => i);
				this.random.shuffleInPlace(charIndices);
				for (const i of charIndices) {
					const anchorX = pw.x + i * dx;
					const anchorY = pw.y + i * dy;
					const anchorChar = pw.chars[i];
					const matchingEntries = this.charIndex.get(anchorChar);
					if (!matchingEntries || matchingEntries.length === 0) continue;
					const freshIndices = [];
					const reusedIndices = [];
					for (let k = 0; k < matchingEntries.length; k++) if (!previouslyUsedSet.has(matchingEntries[k].word)) freshIndices.push(k);
					else reusedIndices.push(k);
					this.random.shuffleInPlace(freshIndices);
					this.random.shuffleInPlace(reusedIndices);
					const indices = [...freshIndices, ...reusedIndices];
					const maxChecks = Math.min(indices.length, 36);
					for (let m = 0; m < maxChecks; m++) {
						const candidate = matchingEntries[indices[m]];
						if (usedWords.has(candidate.word)) continue;
						const candChars = Array.from(candidate.word);
						for (let cIdx = 0; cIdx < candChars.length; cIdx++) {
							if (candChars[cIdx] !== anchorChar) continue;
							const candX = perpDir === "Horizontal" ? anchorX - cIdx : anchorX;
							const candY = perpDir === "Vertical" ? anchorY - cIdx : anchorY;
							const intersections = canPlaceWord(candChars, candX, candY, perpDir, true);
							if (intersections > 0) {
								const centerDist = Math.abs(candX + (perpDir === "Horizontal" ? candChars.length / 2 : 0) - 7) + Math.abs(candY + (perpDir === "Vertical" ? candChars.length / 2 : 0) - 7);
								const lengthBonus = candChars.length <= 3 ? 12 : candChars.length === 4 ? 6 : 0;
								const reusePenalty = previouslyUsedSet.has(candidate.word) ? 1e3 : 0;
								const score = intersections * 50 + lengthBonus - centerDist * .8 - reusePenalty + this.random.nextFloat() * 10;
								if (!bestCandidate || score > bestCandidate.score) bestCandidate = {
									entry: candidate,
									x: candX,
									y: candY,
									direction: perpDir,
									intersections,
									score
								};
							}
						}
					}
				}
			}
			if (bestCandidate) {
				placeWordOnGrid(bestCandidate.entry, bestCandidate.x, bestCandidate.y, bestCandidate.direction);
				totalIntersections += bestCandidate.intersections;
				placedInRound = true;
			} else if (this.tryPlaceIslandPair(placedWords, usedWords, previouslyUsedSet, gridChar, gridHoriz, gridVert, canPlaceWord, placeWordOnGrid, size) > 0) {
				totalIntersections += 1;
				placedInRound = true;
			} else stalledRounds++;
			if (!placedInRound) stalledRounds++;
		}
		return {
			words: placedWords,
			totalIntersections
		};
	}
	tryPlaceIslandPair(placedWords, usedWords, previouslyUsedSet, gridChar, gridHoriz, gridVert, canPlaceWord, placeWordOnGrid, size = 15) {
		const coords = [];
		for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) coords.push({
			x,
			y,
			dir: (x + y) % 2 === 0 ? "Horizontal" : "Vertical"
		});
		this.random.shuffleInPlace(coords);
		const allShortWords = this.validWords.filter((w) => !usedWords.has(w.entry.word) && w.chars.length >= 2 && w.chars.length <= 3);
		const freshShort = allShortWords.filter((w) => !previouslyUsedSet.has(w.entry.word));
		const reusedShort = allShortWords.filter((w) => previouslyUsedSet.has(w.entry.word));
		this.random.shuffleInPlace(freshShort);
		this.random.shuffleInPlace(reusedShort);
		const shortWords = [...freshShort, ...reusedShort];
		const maxWordChecks = Math.min(shortWords.length, 45);
		for (let i = 0; i < Math.min(coords.length, 60); i++) {
			const { x, y, dir } = coords[i];
			for (let wIdx = 0; wIdx < maxWordChecks; wIdx++) {
				const w1 = shortWords[wIdx];
				if (usedWords.has(w1.entry.word)) continue;
				if (canPlaceWord(w1.chars, x, y, dir, false) < 0) continue;
				const perpDir = dir === "Horizontal" ? "Vertical" : "Horizontal";
				const dx = dir === "Horizontal" ? 1 : 0;
				const dy = dir === "Horizontal" ? 0 : 1;
				for (let c1 = 0; c1 < w1.chars.length; c1++) {
					const ax = x + c1 * dx;
					const ay = y + c1 * dy;
					const ch = w1.chars[c1];
					const rawBucket = this.charIndex.get(ch) || [];
					const freshBucket = rawBucket.filter((e) => !previouslyUsedSet.has(e.word));
					const reusedBucket = rawBucket.filter((e) => previouslyUsedSet.has(e.word));
					const bucket = [...freshBucket, ...reusedBucket];
					for (const w2Entry of bucket) {
						if (w2Entry.word === w1.entry.word || usedWords.has(w2Entry.word)) continue;
						const w2Chars = Array.from(w2Entry.word);
						if (w2Chars.length > 4) continue;
						for (let c2 = 0; c2 < w2Chars.length; c2++) {
							if (w2Chars[c2] !== ch) continue;
							const x2 = perpDir === "Horizontal" ? ax - c2 : ax;
							const y2 = perpDir === "Vertical" ? ay - c2 : ay;
							placeWordOnGrid(w1.entry, x, y, dir);
							if ((placedWords.length < 25 ? canPlaceWord(w2Chars, x2, y2, perpDir, true) : -1) > 0) {
								placeWordOnGrid(w2Entry, x2, y2, perpDir);
								return 2;
							} else {
								placedWords.pop();
								usedWords.delete(w1.entry.word);
								for (let k = 0; k < w1.chars.length; k++) {
									const rx = x + k * dx;
									const ry = y + k * dy;
									gridChar[ry][rx] = null;
									if (dir === "Horizontal") gridHoriz[ry][rx] = false;
									else gridVert[ry][rx] = false;
								}
							}
						}
					}
				}
			}
		}
		return 0;
	}
};
/**
* Converts a generated List<CrosswordWordData> into our playable CrosswordPuzzle format.
*/
function convertWordDataToPuzzle(stageNumber, wordDataList, gridSize = 15) {
	const sorted = [...wordDataList].sort((a, b) => a.y !== b.y ? a.y - b.y : a.x !== b.x ? a.x - b.x : a.direction === "Horizontal" ? -1 : 1);
	const startCoordToNumber = /* @__PURE__ */ new Map();
	let nextClueNumber = 1;
	let hCount = 1;
	let vCount = 1;
	const words = sorted.map((wd) => {
		const coordKey = `${wd.y},${wd.x}`;
		let num = startCoordToNumber.get(coordKey);
		if (num === void 0) {
			num = nextClueNumber++;
			startCoordToNumber.set(coordKey, num);
		}
		const dir = wd.direction === "Horizontal" ? "across" : "down";
		return {
			id: dir === "across" ? `H${hCount++}` : `V${vCount++}`,
			number: num,
			direction: dir,
			row: wd.y,
			col: wd.x,
			answer: wd.word,
			clue: wd.hint,
			category: wd.category || "일반"
		};
	});
	return {
		id: `stage-${stageNumber}`,
		stageNumber,
		isDaily: false,
		title: `${stageNumber}단계`,
		subtitle: `${gridSize}×${gridSize} 한글 십자말풀이`,
		size: gridSize,
		words,
		clearReward: 100 + Math.min(100, stageNumber * 10),
		wordReward: 5
	};
}
var sharedGenerator = null;
function getSharedCrosswordGenerator() {
	if (!sharedGenerator) sharedGenerator = new CrosswordStageGenerator();
	return sharedGenerator;
}
function generateCrosswordWordDataList(stageNumber, gridSize = 15, targetWordCount, previouslyUsedWords, customSeed) {
	return getSharedCrosswordGenerator().generateStage(stageNumber, gridSize, targetWordCount, previouslyUsedWords, customSeed);
}
function generateOfficialStagePuzzle(stageNumber, gridSize = 15, previouslyUsedWords, customSeed) {
	return convertWordDataToPuzzle(stageNumber, generateCrosswordWordDataList(stageNumber, gridSize, void 0, previouslyUsedWords, customSeed), gridSize);
}
function createFreshStagePuzzles() {
	const puzzles = [];
	const usedWords = /* @__PURE__ */ new Set();
	for (let idx = 0; idx < 8; idx++) {
		const puzzle = generateOfficialStagePuzzle(idx + 1, void 0, usedWords);
		for (const w of puzzle.words) usedWords.add(w.answer);
		puzzles.push(puzzle);
	}
	return puzzles;
}
var STAGE_PUZZLES = createFreshStagePuzzles();
function buildCrosswordGrid(puzzle) {
	const grid = Array.from({ length: puzzle.size }, (_, r) => Array.from({ length: puzzle.size }, (_, c) => ({
		row: r,
		col: c,
		isPlayable: false,
		solution: "",
		userInput: "",
		isSolvedLocked: false,
		isHintRevealed: false,
		isWrongAlert: false
	})));
	for (const word of puzzle.words) {
		const chars = Array.from(word.answer);
		for (let i = 0; i < chars.length; i++) {
			const r = word.direction === "across" ? word.row : word.row + i;
			const c = word.direction === "across" ? word.col + i : word.col;
			if (r < 0 || r >= puzzle.size || c < 0 || c >= puzzle.size) throw new Error(`Word ${word.id} (${word.answer}) out of bounds at (${r}, ${c})`);
			const cell = grid[r][c];
			if (cell.isPlayable && cell.solution !== chars[i]) throw new Error(`Intersection conflict at (${r}, ${c}): "${cell.solution}" vs "${chars[i]}" in puzzle ${puzzle.id}`);
			cell.isPlayable = true;
			cell.solution = chars[i];
			if (i === 0 && cell.clueNumber === void 0) cell.clueNumber = word.number;
			if (word.direction === "across") cell.acrossWordId = word.id;
			else cell.downWordId = word.id;
		}
	}
	return grid;
}
function getWordCells(word) {
	const length = Array.from(word.answer).length;
	return Array.from({ length }, (_, i) => ({
		row: word.direction === "across" ? word.row : word.row + i,
		col: word.direction === "across" ? word.col + i : word.col
	}));
}
function evaluateWordState(grid, word) {
	const coords = getWordCells(word);
	let isFilled = true;
	let isCorrect = true;
	for (const { row, col } of coords) {
		const cell = grid[row]?.[col];
		if (!cell || !cell.userInput) {
			isFilled = false;
			isCorrect = false;
		} else if (cell.userInput !== cell.solution) isCorrect = false;
	}
	return {
		isFilled,
		isCorrect
	};
}
function isPuzzleComplete(grid, puzzle) {
	return puzzle.words.every((w) => evaluateWordState(grid, w).isCorrect);
}
function applyCellInput(grid, puzzle, solvedWordIds, row, col, char) {
	const nextGrid = grid.map((r) => r.map((c) => ({ ...c })));
	const target = nextGrid[row]?.[col];
	if (!target || !target.isPlayable || target.isSolvedLocked) return {
		nextGrid,
		newlySolvedWords: [],
		wrongWordsTriggered: [],
		isCharCorrect: false,
		rewardEarned: 0
	};
	const trimmed = char.trim().slice(0, 1);
	target.userInput = trimmed;
	const isCharCorrect = trimmed.length > 0 && trimmed === target.solution;
	target.isWrongAlert = trimmed.length > 0 && trimmed !== target.solution;
	const newlySolvedWords = [];
	const wrongWordsTriggered = [];
	const relatedWordIds = [target.acrossWordId, target.downWordId].filter((id) => Boolean(id));
	for (const wordId of relatedWordIds) {
		const word = puzzle.words.find((w) => w.id === wordId);
		if (!word) continue;
		const { isFilled, isCorrect } = evaluateWordState(nextGrid, word);
		if (isCorrect && !solvedWordIds.has(word.id)) {
			newlySolvedWords.push(word);
			for (const pos of getWordCells(word)) {
				nextGrid[pos.row][pos.col].isSolvedLocked = true;
				nextGrid[pos.row][pos.col].isWrongAlert = false;
			}
		} else if (isFilled && !isCorrect) {
			wrongWordsTriggered.push(word);
			for (const pos of getWordCells(word)) {
				const cell = nextGrid[pos.row][pos.col];
				if (!cell.isSolvedLocked && cell.userInput !== cell.solution) cell.isWrongAlert = true;
			}
		}
	}
	return {
		nextGrid,
		newlySolvedWords,
		wrongWordsTriggered,
		isCharCorrect,
		rewardEarned: newlySolvedWords.length * puzzle.wordReward
	};
}
function canAffordHint(currency, type) {
	return currency >= (type === "letter" ? 50 : 100);
}
function formatTimerMMSS(totalSeconds) {
	const num = Number(totalSeconds);
	const clamped = Math.max(0, Math.floor(Number.isFinite(num) ? num : 0));
	const mins = Math.floor(clamped / 60);
	const secs = clamped % 60;
	return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}
var GOOGLE_HANDWRITING_ENDPOINT = "https://inputtools.google.com/request?ime=handwriting&app=mobilesearch&cs=1&oe=UTF-8";
/**
* 1순위 (온라인 - 구글 입력기 API):
* 캔버스에 그은 획(stroke) 좌표를 Google Input Tools Handwriting API (language: 'ko')로 POST 요청하여
* 후보 글자들을 받아온다. 반환된 후보 중에 현재 선택된 칸의 정답 글자(expectedChar / solution)가
* 포함되어 있으면 무조건 정답 글자를 1순위로 채택한다.
*/
async function recognizeHandwritingOnline(strokes, options) {
	if (!strokes || strokes.length === 0) return [];
	if (typeof fetch !== "function") {
		options?.onNetworkError?.();
		return null;
	}
	if (typeof window !== "undefined" && typeof navigator !== "undefined" && navigator.onLine === false) {
		options?.onNetworkError?.();
		return null;
	}
	const width = Math.max(60, Math.round(options?.width || 280));
	const height = Math.max(60, Math.round(options?.height || 280));
	const timeoutMs = options?.timeoutMs ?? 1500;
	const ink = strokes.filter((s) => s.length > 0).map((stroke) => [
		stroke.map((pt) => Math.round(pt.x)),
		stroke.map((pt) => Math.round(pt.y)),
		stroke.map((pt, idx) => typeof pt.t === "number" ? Math.round(pt.t) : idx * 16)
	]);
	if (ink.length === 0) return [];
	const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
	const timerId = controller !== null ? setTimeout(() => controller.abort(), timeoutMs) : null;
	try {
		const response = await fetch(GOOGLE_HANDWRITING_ENDPOINT, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				app_version: .4,
				api_level: "537.36",
				device: "5.0",
				input_type: 0,
				options: "enable_pre_space",
				requests: [{
					writing_guide: {
						writing_area_width: width,
						writing_area_height: height
					},
					ink,
					language: "ko"
				}]
			}),
			signal: controller?.signal
		});
		if (!response.ok) {
			options?.onNetworkError?.();
			return null;
		}
		const data = await response.json();
		if (!Array.isArray(data) || data[0] !== "SUCCESS") return null;
		const rawCandidates = data?.[1]?.[0]?.[1];
		if (!Array.isArray(rawCandidates) || rawCandidates.length === 0) return null;
		const parsed = rawCandidates.filter((item) => typeof item === "string" && item.trim().length > 0).map((item) => Array.from(item.trim())[0]).filter((ch) => Boolean(ch));
		const uniqueCandidates = Array.from(new Set(parsed));
		if (uniqueCandidates.length === 0) return null;
		const expected = options?.expectedChar?.trim() ? Array.from(options.expectedChar.trim())[0] : "";
		if (expected && uniqueCandidates.includes(expected)) return [expected, ...uniqueCandidates.filter((c) => c !== expected)].slice(0, 5);
		return uniqueCandidates.slice(0, 5);
	} catch {
		options?.onNetworkError?.();
		return null;
	} finally {
		if (timerId !== null) clearTimeout(timerId);
	}
}
// src/game/audio.ts
/**
* Procedural Web Audio synthesizer for On-Geul Korean Crossword:
* - Warm, bright, unobtrusive pentatonic BGM (#4)
* - Paper pencil/fountain-pen scratching SFX on stroke/write (#13)
* - Snappy wooden tile "탁!" fit SFX for correct character/word (#15)
* - Harmonic chime SFX on full word completion (#14)
* - Soft low buzz/thud SFX on wrong character/word (#15)
* - Stage clear fanfare & red seal stamp thud (#11, #18)
*/
var SoundManager = class {
	constructor() {
		this.ctx = null;
		this.bgmEnabled = true;
		this.sfxEnabled = true;
		this.bgmTimer = null;
		this.isPlayingBgm = false;
		this.isBackgrounded = false;
		this.lifecycleBound = false;
		this.noteIndex = 0;
		this.lastPaperSoundAt = 0;
		this.cachedNoiseBuffer = null;
		this.bindLifecycleListeners();
	}
	bindLifecycleListeners() {
		if (this.lifecycleBound || typeof window === "undefined") return;
		this.lifecycleBound = true;
		const handleBackground = () => {
			this.pauseForBackground();
		};
		const handleForeground = () => {
			if (typeof document !== "undefined" && (document.hidden || document.visibilityState === "hidden")) return;
			this.resumeFromBackground();
		};
		if (typeof document !== "undefined") {
			document.addEventListener("visibilitychange", () => {
				if (document.hidden || document.visibilityState === "hidden") handleBackground();
				else handleForeground();
			});
			document.addEventListener("pause", handleBackground, false);
			document.addEventListener("resume", handleForeground, false);
		}
		window.addEventListener("blur", handleBackground);
		window.addEventListener("focus", handleForeground);
		window.addEventListener("pagehide", handleBackground);
		window.addEventListener("beforeunload", handleBackground);
	}
	pauseForBackground() {
		this.isBackgrounded = true;
		if (this.bgmTimer !== null && typeof window !== "undefined") {
			window.clearInterval(this.bgmTimer);
			this.bgmTimer = null;
		}
		if (this.ctx && this.ctx.state === "running") this.ctx.suspend().catch(() => {});
	}
	resumeFromBackground() {
		this.isBackgrounded = false;
		if (this.isPlayingBgm && this.bgmEnabled) {
			if (this.ctx && this.ctx.state === "suspended") this.ctx.resume().catch(() => {});
			this.startBgm();
		}
	}
	ensureContext() {
		if (typeof window === "undefined") return null;
		if (this.isBackgrounded || typeof document !== "undefined" && (document.hidden || document.visibilityState === "hidden")) return null;
		this.bindLifecycleListeners();
		try {
			if (!this.ctx) {
				const AudioCtx = window.AudioContext || window.webkitAudioContext;
				if (AudioCtx) this.ctx = new AudioCtx();
			}
			if (this.ctx && !this.cachedNoiseBuffer) {
				const bufferSize = Math.floor(this.ctx.sampleRate * .1);
				const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
				const data = buffer.getChannelData(0);
				for (let i = 0; i < bufferSize; i++) {
					const env = Math.sin(i / bufferSize * Math.PI);
					data[i] = (Math.random() * 2 - 1) * env * .45;
				}
				this.cachedNoiseBuffer = buffer;
			}
			if (this.ctx && this.ctx.state === "suspended") this.ctx.resume().catch(() => {});
			return this.ctx;
		} catch {
			return null;
		}
	}
	setConfig(bgm, sfx) {
		this.bgmEnabled = bgm;
		this.sfxEnabled = sfx;
		if (!this.bgmEnabled) {
			if (this.bgmTimer !== null && typeof window !== "undefined") {
				window.clearInterval(this.bgmTimer);
				this.bgmTimer = null;
			}
		} else if (this.isPlayingBgm && !this.bgmTimer && !this.isBackgrounded) this.startBgm();
	}
	/**
	* #4: 밝고 잔잔하며 집중에 방해되지 않는 어쿠스틱 마림바/칼림바 느낌의 오음계 배경음악
	*/
	startBgm() {
		this.isPlayingBgm = true;
		if (!this.bgmEnabled || this.isBackgrounded) return;
		if (typeof document !== "undefined" && (document.hidden || document.visibilityState === "hidden")) return;
		if (this.bgmTimer !== null) return;
		const melody = [
			523.25,
			659.25,
			587.33,
			783.99,
			659.25,
			880,
			783.99,
			523.25,
			587.33,
			659.25,
			523.25,
			440,
			392,
			523.25,
			587.33,
			659.25
		];
		const playNextBgmNote = () => {
			if (!this.bgmEnabled || !this.isPlayingBgm || this.isBackgrounded || typeof document !== "undefined" && (document.hidden || document.visibilityState === "hidden")) {
				this.pauseForBackground();
				return;
			}
			const ctx = this.ensureContext();
			if (ctx && ctx.state === "running") {
				const now = ctx.currentTime;
				const freq = melody[this.noteIndex % melody.length];
				this.noteIndex++;
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();
				osc.type = "sine";
				osc.frequency.setValueAtTime(freq, now);
				gain.gain.setValueAtTime(1e-4, now);
				gain.gain.linearRampToValueAtTime(.032, now + .04);
				gain.gain.exponentialRampToValueAtTime(5e-4, now + .65);
				osc.connect(gain);
				gain.connect(ctx.destination);
				osc.start(now);
				osc.stop(now + .68);
			}
		};
		this.bgmTimer = window.setInterval(playNextBgmNote, 720);
	}
	stopBgm() {
		this.isPlayingBgm = false;
		if (this.bgmTimer !== null && typeof window !== "undefined") {
			window.clearInterval(this.bgmTimer);
			this.bgmTimer = null;
		}
	}
	/**
	* #13: 글자를 쓸 때마다 종이에 글씨를 쓰는 듯한 사각사각 연필/만년필 효과음
	*/
	playPaperScratch(intensity = 1) {
		if (!this.sfxEnabled) return;
		const nowMs = performance.now();
		if (nowMs - this.lastPaperSoundAt < 75) return;
		this.lastPaperSoundAt = nowMs;
		const ctx = this.ensureContext();
		if (!ctx || !this.cachedNoiseBuffer) return;
		const duration = .065;
		const noise = ctx.createBufferSource();
		noise.buffer = this.cachedNoiseBuffer;
		const bandpass = ctx.createBiquadFilter();
		bandpass.type = "bandpass";
		bandpass.frequency.value = 1900 + Math.random() * 500;
		bandpass.Q.value = 2.4;
		const gain = ctx.createGain();
		const now = ctx.currentTime;
		const vol = Math.min(.18, .09 * intensity);
		gain.gain.setValueAtTime(vol, now);
		gain.gain.exponentialRampToValueAtTime(.005, now + duration);
		noise.connect(bandpass);
		bandpass.connect(gain);
		gain.connect(ctx.destination);
		noise.start(now);
	}
	/**
	* #15: 맞는 글자/단어는 '탁!' 하며 맞아떨어지는 듯한 가벼운 나무 블록 결합 효과음
	*/
	playSnapFit() {
		if (!this.sfxEnabled) return;
		const ctx = this.ensureContext();
		if (!ctx) return;
		const now = ctx.currentTime;
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.type = "triangle";
		osc.frequency.setValueAtTime(340, now);
		osc.frequency.exponentialRampToValueAtTime(145, now + .045);
		gain.gain.setValueAtTime(.22, now);
		gain.gain.exponentialRampToValueAtTime(.001, now + .055);
		osc.connect(gain);
		gain.connect(ctx.destination);
		osc.start(now);
		osc.stop(now + .06);
		const clickOsc = ctx.createOscillator();
		const clickGain = ctx.createGain();
		clickOsc.type = "sine";
		clickOsc.frequency.setValueAtTime(1120, now);
		clickOsc.frequency.exponentialRampToValueAtTime(520, now + .025);
		clickGain.gain.setValueAtTime(.12, now);
		clickGain.gain.exponentialRampToValueAtTime(.001, now + .03);
		clickOsc.connect(clickGain);
		clickGain.connect(ctx.destination);
		clickOsc.start(now);
		clickOsc.stop(now + .035);
	}
	/**
	* #14: 한 단어가 완성되면 경쾌한 화음 효과음
	*/
	playWordComplete() {
		if (!this.sfxEnabled) return;
		this.playSnapFit();
		const ctx = this.ensureContext();
		if (!ctx) return;
		[
			523.25,
			659.25,
			783.99,
			1046.5
		].forEach((freq, idx) => {
			const start = ctx.currentTime + .05 + idx * .055;
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.type = "triangle";
			osc.frequency.setValueAtTime(freq, start);
			gain.gain.setValueAtTime(.001, start);
			gain.gain.linearRampToValueAtTime(.14, start + .015);
			gain.gain.exponentialRampToValueAtTime(.001, start + .28);
			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.start(start);
			osc.stop(start + .3);
		});
	}
	/**
	* #15: 틀린 단어/글자는 빨간색으로 표시되며 틀림 효과음
	*/
	playWrongBuzzer() {
		if (!this.sfxEnabled) return;
		const ctx = this.ensureContext();
		if (!ctx) return;
		const now = ctx.currentTime;
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.type = "sawtooth";
		osc.frequency.setValueAtTime(175, now);
		osc.frequency.linearRampToValueAtTime(130, now + .22);
		const filter = ctx.createBiquadFilter();
		filter.type = "lowpass";
		filter.frequency.value = 520;
		gain.gain.setValueAtTime(.14, now);
		gain.gain.exponentialRampToValueAtTime(.002, now + .24);
		osc.connect(filter);
		filter.connect(gain);
		gain.connect(ctx.destination);
		osc.start(now);
		osc.stop(now + .25);
	}
	playWrongAlert() {
		this.playWrongBuzzer();
	}
	/**
	* #11 & #18: 스테이지/오늘의 문제 클리어 축하 팡파르 및 도장 효과음
	*/
	playStageClear() {
		if (!this.sfxEnabled) return;
		const ctx = this.ensureContext();
		if (!ctx) return;
		[
			523.25,
			659.25,
			783.99,
			987.77,
			1046.5
		].forEach((freq, i) => {
			const start = ctx.currentTime + i * .08;
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.type = "triangle";
			osc.frequency.setValueAtTime(freq, start);
			gain.gain.setValueAtTime(.001, start);
			gain.gain.linearRampToValueAtTime(.16, start + .02);
			gain.gain.exponentialRampToValueAtTime(.001, start + .55);
			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.start(start);
			osc.stop(start + .58);
		});
	}
};
var soundManager = new SoundManager();
// node_modules/react/cjs/react-jsx-runtime.production.js
/**
* @license React
* react-jsx-runtime.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_jsx_runtime_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
	var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
		var key = null;
		void 0 !== maybeKey && (key = "" + maybeKey);
		void 0 !== config.key && (key = "" + config.key);
		if ("key" in config) {
			maybeKey = {};
			for (var propName in config) "key" !== propName && (maybeKey[propName] = config[propName]);
		} else maybeKey = config;
		config = maybeKey.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== config ? config : null,
			props: maybeKey
		};
	}
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.jsx = jsxProd;
	exports.jsxs = jsxProd;
}));
// src/components/HandwritingPad.tsx
var import_jsx_runtime = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_jsx_runtime_production();
})))();
var HandwritingPad = ({ selectedCellKey, currentCellInput, expectedChar = "", isDarkMode, autoCommitDelaySec = 1.5, contextSyllables, onOfflineDetected, onSwitchToTyping, onSelectCandidate, onClearCell }) => {
	const canvasRef = (0, import_react.useRef)(null);
	const canvasRectRef = (0, import_react.useRef)(null);
	const isDrawingRef = (0, import_react.useRef)(false);
	const writingStartTimeRef = (0, import_react.useRef)(0);
	const recognitionRequestIdRef = (0, import_react.useRef)(0);
	const currentStrokeRef = (0, import_react.useRef)([]);
	const strokesRef = (0, import_react.useRef)([]);
	const recognitionTimerRef = (0, import_react.useRef)(null);
	const autoCommitTimerRef = (0, import_react.useRef)(null);
	const progressBarRef = (0, import_react.useRef)(null);
	const [strokes, setStrokes] = (0, import_react.useState)([]);
	const [candidates, setCandidates] = (0, import_react.useState)([]);
	const [isAutoCommitting, setIsAutoCommitting] = (0, import_react.useState)(false);
	const [commitKey, setCommitKey] = (0, import_react.useState)(0);
	const onSelectCandidateRef = (0, import_react.useRef)(onSelectCandidate);
	(0, import_react.useEffect)(() => {
		onSelectCandidateRef.current = onSelectCandidate;
	}, [onSelectCandidate]);
	const expectedCharRef = (0, import_react.useRef)(expectedChar);
	(0, import_react.useEffect)(() => {
		expectedCharRef.current = expectedChar;
	}, [expectedChar]);
	const contextSyllablesRef = (0, import_react.useRef)(contextSyllables);
	(0, import_react.useEffect)(() => {
		contextSyllablesRef.current = contextSyllables;
	}, [contextSyllables]);
	const onOfflineDetectedRef = (0, import_react.useRef)(onOfflineDetected);
	(0, import_react.useEffect)(() => {
		onOfflineDetectedRef.current = onOfflineDetected;
	}, [onOfflineDetected]);
	const clearPendingTimersOnly = (0, import_react.useCallback)(() => {
		if (recognitionTimerRef.current !== null) {
			window.clearTimeout(recognitionTimerRef.current);
			recognitionTimerRef.current = null;
		}
		if (autoCommitTimerRef.current !== null) {
			window.clearTimeout(autoCommitTimerRef.current);
			autoCommitTimerRef.current = null;
		}
		if (progressBarRef.current) progressBarRef.current.style.display = "none";
	}, []);
	const cancelAutoCommit = (0, import_react.useCallback)(() => {
		clearPendingTimersOnly();
		setIsAutoCommitting(false);
	}, [clearPendingTimersOnly]);
	const configureInkContext = (0, import_react.useCallback)((ctx) => {
		ctx.setLineDash([]);
		ctx.strokeStyle = isDarkMode ? "#F5F0E6" : "#231F1C";
		ctx.lineWidth = 5.5;
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
	}, [isDarkMode]);
	const renderCanvas = (0, import_react.useCallback)((completedStrokesOverride, activeStrokeOverride) => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const width = canvas.width;
		const height = canvas.height;
		ctx.clearRect(0, 0, width, height);
		ctx.fillStyle = isDarkMode ? "#262220" : "#FCF9F2";
		ctx.fillRect(0, 0, width, height);
		ctx.save();
		ctx.strokeStyle = isDarkMode ? "rgba(214, 199, 178, 0.3)" : "rgba(168, 144, 116, 0.48)";
		ctx.lineWidth = 1.5;
		ctx.setLineDash([5, 5]);
		ctx.beginPath();
		ctx.moveTo(0, height / 2);
		ctx.lineTo(width, height / 2);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(width / 2, 0);
		ctx.lineTo(width / 2, height);
		ctx.stroke();
		ctx.restore();
		const baseStrokes = completedStrokesOverride ?? strokesRef.current;
		const inProgress = activeStrokeOverride ?? currentStrokeRef.current;
		const allStrokes = inProgress.length > 0 ? [...baseStrokes, inProgress] : baseStrokes;
		ctx.save();
		configureInkContext(ctx);
		for (const stroke of allStrokes) {
			if (stroke.length === 0) continue;
			ctx.beginPath();
			ctx.moveTo(stroke[0].x, stroke[0].y);
			for (let i = 1; i < stroke.length; i++) {
				const midX = (stroke[i - 1].x + stroke[i].x) / 2;
				const midY = (stroke[i - 1].y + stroke[i].y) / 2;
				ctx.quadraticCurveTo(stroke[i - 1].x, stroke[i - 1].y, midX, midY);
			}
			if (stroke.length === 1) ctx.lineTo(stroke[0].x + .5, stroke[0].y + .5);
			else {
				const last = stroke[stroke.length - 1];
				ctx.lineTo(last.x, last.y);
			}
			ctx.stroke();
		}
		ctx.restore();
	}, [isDarkMode, configureInkContext]);
	(0, import_react.useEffect)(() => {
		cancelAutoCommit();
		recognitionRequestIdRef.current += 1;
		isDrawingRef.current = false;
		writingStartTimeRef.current = 0;
		currentStrokeRef.current = [];
		strokesRef.current = [];
		setStrokes([]);
		setCandidates([]);
		renderCanvas([], []);
	}, [
		selectedCellKey,
		cancelAutoCommit,
		renderCanvas
	]);
	const topCandidate = candidates[0] || "";
	const topCandidateRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		topCandidateRef.current = topCandidate || null;
	}, [topCandidate]);
	const commitTopCandidate = (0, import_react.useCallback)(() => {
		if (isDrawingRef.current) return;
		const char = topCandidateRef.current;
		if (!char) return;
		clearPendingTimersOnly();
		recognitionRequestIdRef.current += 1;
		setIsAutoCommitting(false);
		writingStartTimeRef.current = 0;
		currentStrokeRef.current = [];
		strokesRef.current = [];
		setStrokes([]);
		setCandidates([]);
		renderCanvas([], []);
		onSelectCandidateRef.current?.(char);
	}, [clearPendingTimersOnly, renderCanvas]);
	(0, import_react.useEffect)(() => {
		if (isDrawingRef.current || strokes.length === 0) {
			cancelAutoCommit();
			return;
		}
		if (!topCandidate) {
			cancelAutoCommit();
			return;
		}
		if (autoCommitTimerRef.current !== null) window.clearTimeout(autoCommitTimerRef.current);
		setIsAutoCommitting(true);
		setCommitKey((k) => k + 1);
		const delayMs = Math.max(300, Math.round(autoCommitDelaySec * 1e3));
		autoCommitTimerRef.current = window.setTimeout(() => {
			autoCommitTimerRef.current = null;
			commitTopCandidate();
		}, delayMs);
		return () => {
			if (autoCommitTimerRef.current !== null) {
				window.clearTimeout(autoCommitTimerRef.current);
				autoCommitTimerRef.current = null;
			}
		};
	}, [
		strokes,
		topCandidate,
		autoCommitDelaySec,
		commitTopCandidate,
		cancelAutoCommit
	]);
	(0, import_react.useEffect)(() => {
		renderCanvas(strokesRef.current, currentStrokeRef.current);
	}, [isDarkMode, renderCanvas]);
	const getPointFromCoords = (clientX, clientY) => {
		const canvas = canvasRef.current;
		if (!canvas) return {
			x: 0,
			y: 0,
			t: 0
		};
		const rect = canvasRectRef.current ?? canvas.getBoundingClientRect();
		const scaleX = canvas.width / Math.max(1, rect.width);
		const scaleY = canvas.height / Math.max(1, rect.height);
		const now = typeof performance !== "undefined" ? performance.now() : Date.now();
		const relTime = writingStartTimeRef.current > 0 ? Math.max(0, Math.round(now - writingStartTimeRef.current)) : 0;
		return {
			x: (clientX - rect.left) * scaleX,
			y: (clientY - rect.top) * scaleY,
			t: relTime
		};
	};
	const handlePointerDown = (e) => {
		e.preventDefault();
		clearPendingTimersOnly();
		recognitionRequestIdRef.current += 1;
		const canvas = canvasRef.current;
		if (!canvas) return;
		canvasRectRef.current = canvas.getBoundingClientRect();
		e.currentTarget.setPointerCapture?.(e.pointerId);
		if (strokesRef.current.length === 0 && currentStrokeRef.current.length === 0) writingStartTimeRef.current = typeof performance !== "undefined" ? performance.now() : Date.now();
		const pt = getPointFromCoords(e.clientX, e.clientY);
		isDrawingRef.current = true;
		currentStrokeRef.current = [pt];
		const ctx = canvas.getContext("2d");
		if (ctx) {
			configureInkContext(ctx);
			ctx.beginPath();
			ctx.moveTo(pt.x, pt.y);
			ctx.lineTo(pt.x + .5, pt.y + .5);
			ctx.stroke();
		}
		soundManager.playPaperScratch(.85);
	};
	const handlePointerMove = (e) => {
		if (!isDrawingRef.current) return;
		e.preventDefault();
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		configureInkContext(ctx);
		const cur = currentStrokeRef.current;
		const nativeEv = e.nativeEvent;
		const coalesced = typeof nativeEv.getCoalescedEvents === "function" ? nativeEv.getCoalescedEvents() : null;
		const eventList = coalesced && coalesced.length > 0 ? coalesced : [nativeEv];
		let hasNewPoints = false;
		ctx.beginPath();
		for (let i = 0; i < eventList.length; i++) {
			const ev = eventList[i];
			const pt = getPointFromCoords(ev.clientX, ev.clientY);
			if (cur.length === 0) {
				cur.push(pt);
				ctx.moveTo(pt.x, pt.y);
				ctx.lineTo(pt.x + .5, pt.y + .5);
				hasNewPoints = true;
				continue;
			}
			const last = cur[cur.length - 1];
			if (Math.hypot(pt.x - last.x, pt.y - last.y) > 1.2) {
				cur.push(pt);
				hasNewPoints = true;
				const n = cur.length;
				if (n === 2) {
					const midX = (cur[0].x + cur[1].x) * .5;
					const midY = (cur[0].y + cur[1].y) * .5;
					ctx.moveTo(cur[0].x, cur[0].y);
					ctx.lineTo(midX, midY);
				} else {
					const p0 = cur[n - 3];
					const p1 = cur[n - 2];
					const p2 = cur[n - 1];
					const prevMidX = (p0.x + p1.x) * .5;
					const prevMidY = (p0.y + p1.y) * .5;
					const newMidX = (p1.x + p2.x) * .5;
					const newMidY = (p1.y + p2.y) * .5;
					ctx.moveTo(prevMidX, prevMidY);
					ctx.quadraticCurveTo(p1.x, p1.y, newMidX, newMidY);
				}
			}
		}
		if (hasNewPoints) ctx.stroke();
	};
	const executeRecognition = (0, import_react.useCallback)((targetStrokes) => {
		const reqId = ++recognitionRequestIdRef.current;
		if (targetStrokes.length === 0) {
			setStrokes([]);
			setCandidates([]);
			return;
		}
		setStrokes(targetStrokes);
		const canvas = canvasRef.current;
		recognizeHandwritingOnline(targetStrokes, {
			expectedChar: expectedCharRef.current,
			contextSyllables: contextSyllablesRef.current,
			width: canvas?.width || 280,
			height: canvas?.height || 280,
			timeoutMs: 1500,
			onNetworkError: () => {
				onOfflineDetectedRef.current?.();
			}
		}).then((onlineCandidates) => {
			if (reqId !== recognitionRequestIdRef.current || isDrawingRef.current || strokesRef.current.length === 0) return;
			if (onlineCandidates && onlineCandidates.length > 0) setCandidates(onlineCandidates);
		});
	}, []);
	const scheduleRecognition = (0, import_react.useCallback)(() => {
		if (recognitionTimerRef.current !== null) window.clearTimeout(recognitionTimerRef.current);
		recognitionTimerRef.current = window.setTimeout(() => {
			recognitionTimerRef.current = null;
			if (isDrawingRef.current) return;
			const latestStrokes = [...strokesRef.current];
			executeRecognition(latestStrokes);
		}, 240);
	}, [executeRecognition]);
	const handlePointerUp = () => {
		if (!isDrawingRef.current) return;
		isDrawingRef.current = false;
		const finished = [...currentStrokeRef.current];
		currentStrokeRef.current = [];
		if (finished.length > 0) {
			const ctx = canvasRef.current?.getContext("2d");
			if (ctx && finished.length >= 2) {
				configureInkContext(ctx);
				const pPrev = finished[finished.length - 2];
				const pLast = finished[finished.length - 1];
				const midX = (pPrev.x + pLast.x) * .5;
				const midY = (pPrev.y + pLast.y) * .5;
				ctx.beginPath();
				ctx.moveTo(midX, midY);
				ctx.lineTo(pLast.x, pLast.y);
				ctx.stroke();
			}
			strokesRef.current = [...strokesRef.current, finished];
			scheduleRecognition();
		} else renderCanvas(strokesRef.current, []);
	};
	const handleUndoStroke = () => {
		cancelAutoCommit();
		soundManager.playPaperScratch(.6);
		currentStrokeRef.current = [];
		const next = strokesRef.current.slice(0, -1);
		strokesRef.current = next;
		if (next.length === 0) writingStartTimeRef.current = 0;
		renderCanvas(next, []);
		executeRecognition(next);
	};
	const handleClearAllStrokes = () => {
		cancelAutoCommit();
		recognitionRequestIdRef.current += 1;
		soundManager.playPaperScratch(.8);
		writingStartTimeRef.current = 0;
		currentStrokeRef.current = [];
		strokesRef.current = [];
		setStrokes([]);
		setCandidates([]);
		renderCanvas([], []);
		if (currentCellInput) onClearCell();
	};
	const handleCandidateClick = (char) => {
		cancelAutoCommit();
		recognitionRequestIdRef.current += 1;
		writingStartTimeRef.current = 0;
		currentStrokeRef.current = [];
		strokesRef.current = [];
		setStrokes([]);
		setCandidates([]);
		renderCanvas([], []);
		onSelectCandidate(char);
	};
	const canvasWrapRef = (0, import_react.useRef)(null);
	const [squareSize, setSquareSize] = (0, import_react.useState)(156);
	(0, import_react.useEffect)(() => {
		const el = canvasWrapRef.current;
		if (!el) return;
		const updateSquareSize = () => {
			canvasRectRef.current = null;
			const rect = el.getBoundingClientRect();
			const side = Math.floor(Math.min(rect.width, rect.height) - 2);
			if (side > 40) setSquareSize(side);
		};
		updateSquareSize();
		const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateSquareSize) : null;
		observer?.observe(el);
		window.addEventListener("resize", updateSquareSize);
		return () => {
			observer?.disconnect();
			window.removeEventListener("resize", updateSquareSize);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `h-full w-full min-w-0 rounded-2xl border p-1.5 md:p-2.5 flex flex-col justify-between gap-1 md:gap-2 transition-colors overflow-hidden ${isDarkMode ? "bg-stone-900 border-stone-700 text-stone-100" : "bg-[#EFE9DA] border-[#D8CEBE] text-[#2C2520]"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-5 gap-1 md:gap-1.5 shrink-0 min-w-0",
				role: "group",
				"aria-label": "손글씨 인식 추천 글자 5개",
				children: [
					0,
					1,
					2,
					3,
					4
				].map((idx) => {
					const char = candidates[idx];
					return char ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => handleCandidateClick(char),
						"aria-label": `추천 글자 ${char} 선택`,
						className: `relative overflow-hidden h-8 sm:h-9 md:h-11 rounded-lg md:rounded-xl font-bold text-base sm:text-lg md:text-xl flex items-center justify-center border transition-all active:scale-95 whitespace-nowrap shrink-0 ${idx === 0 ? isDarkMode ? "bg-[#CE8E54] border-[#E2A872] text-[#FFFDF9] ring-2 ring-[#E2A872]/60" : "bg-[#CC8B52] border-[#B6763E] text-[#FFFDF9] ring-2 ring-[#CC8B52]/35" : isDarkMode ? "bg-stone-800 border-stone-600 text-stone-100 hover:bg-stone-700" : "bg-[#FDFBF7] border-[#D5CBB8] text-[#2C2520] hover:bg-[#F5EFE2]"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: char }), idx === 0 && isAutoCommitting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							ref: progressBarRef,
							onAnimationEnd: commitTopCandidate,
							className: "absolute bottom-0 left-0 h-1 bg-white/90 rounded-full",
							style: { animation: `autoCommitProgress ${Math.max(300, Math.round(autoCommitDelaySec * 1e3))}ms linear forwards` }
						}, commitKey)]
					}, `${char}-${idx}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `h-8 sm:h-9 md:h-11 rounded-lg md:rounded-xl border border-dashed flex items-center justify-center text-xs md:text-sm ${isDarkMode ? "border-stone-700 bg-stone-950/40 text-stone-600" : "border-[#CBBFA8] bg-[#F8F4EA] text-[#B0A392]"}`,
						children: "·"
					}, `empty-${idx}`);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: canvasWrapRef,
				className: "relative flex-1 min-h-0 min-w-0 w-full flex items-center justify-center overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
					ref: canvasRef,
					width: 280,
					height: 280,
					"data-testid": "handwriting-canvas",
					"aria-label": "손글씨 입력 패드",
					onPointerDown: handlePointerDown,
					onPointerMove: handlePointerMove,
					onPointerUp: handlePointerUp,
					onPointerCancel: handlePointerUp,
					style: {
						width: `${squareSize}px`,
						height: `${squareSize}px`
					},
					className: `aspect-square max-w-full max-h-full rounded-xl border-2 touch-none cursor-crosshair shadow-inner shrink-0 ${isDarkMode ? "border-stone-600" : "border-[#C4B69E]"}`
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 md:gap-2 shrink-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleUndoStroke,
						disabled: strokes.length === 0,
						"aria-label": "한 획 지우기",
						className: `flex-1 h-8 sm:h-9 md:h-10 rounded-lg md:rounded-xl border font-bold text-xs md:text-sm flex items-center justify-center gap-1 transition-colors whitespace-nowrap shrink-0 ${strokes.length === 0 ? isDarkMode ? "bg-stone-800/40 border-stone-800 text-stone-600 cursor-not-allowed" : "bg-[#E5DEC9]/60 border-[#D8CEBE] text-[#9E9284] cursor-not-allowed" : isDarkMode ? "bg-stone-800 border-stone-600 text-stone-100 hover:bg-stone-700 active:scale-95" : "bg-[#FDFBF7] border-[#C9BCA6] text-[#2C2520] hover:bg-[#F3ECE0] active:scale-95"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { className: "w-3.5 h-3.5 md:w-4 md:h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "한 획" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleClearAllStrokes,
						"aria-label": "전부 지우기",
						className: `flex-1 h-8 sm:h-9 md:h-10 rounded-lg md:rounded-xl border font-bold text-xs md:text-sm flex items-center justify-center gap-1 transition-colors whitespace-nowrap shrink-0 ${isDarkMode ? "bg-rose-950/60 border-rose-800/80 text-rose-200 hover:bg-rose-900/70 active:scale-95" : "bg-[#FDF2F0] border-[#E2B4AD] text-[#9E2A2B] hover:bg-[#F9E3DF] active:scale-95"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eraser, { className: "w-3.5 h-3.5 md:w-4 md:h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "지우개" })]
					}),
					onSwitchToTyping && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onSwitchToTyping,
						"aria-label": "키보드 모드로 전환",
						title: "키보드 모드로 전환",
						className: `h-8 sm:h-9 md:h-10 px-2 sm:px-2.5 rounded-lg md:rounded-xl border font-bold text-xs md:text-sm flex items-center justify-center gap-1 transition-all active:scale-95 whitespace-nowrap shrink-0 ${isDarkMode ? "bg-stone-800/80 border-stone-700 text-stone-200 hover:bg-stone-700" : "bg-[#FDFBF7] border-[#D5CBB8] text-[#4A3F35] hover:bg-[#F3ECE0]"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, { className: "w-3.5 h-3.5 md:w-4 md:h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] sm:text-xs",
							children: "자판"
						})]
					})
				]
			})
		]
	});
};
// src/components/TypingPad.tsx
var TypingPad = ({ isDarkMode, isOffline = false, onAttemptSwitchToHandwriting, onEnterSingleChar, onEnterFullWord, onClearCell }) => {
	const [typedText, setTypedText] = (0, import_react.useState)("");
	const handleSubmit = (e) => {
		e.preventDefault();
		const cleaned = typedText.trim();
		if (!cleaned) return;
		soundManager.playPaperScratch(1.1);
		const chars = Array.from(cleaned);
		if (chars.length === 1) onEnterSingleChar(chars[0]);
		else onEnterFullWord(cleaned);
		setTypedText("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-testid": "typing-pad",
		className: `h-full w-full min-w-0 rounded-2xl border p-2 flex flex-col justify-center gap-1.5 transition-colors overflow-hidden ${isDarkMode ? "bg-stone-900 border-stone-700 text-stone-100" : "bg-[#EFE9DA] border-[#D8CEBE] text-[#2C2520]"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			autoComplete: "off",
			className: "w-full flex flex-col justify-center gap-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "hangul-typing-input",
					className: "sr-only",
					children: "정답 입력"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "hangul-typing-input",
					name: "hangul_crossword_typing_no_autofill",
					type: "text",
					autoComplete: "off",
					autoCorrect: "off",
					autoCapitalize: "off",
					spellCheck: false,
					"aria-autocomplete": "none",
					value: typedText,
					onChange: (e) => {
						soundManager.playPaperScratch(.7);
						setTypedText(e.target.value);
					},
					placeholder: "글자/단어 입력",
					className: `w-full h-10 sm:h-11 px-2.5 py-1.5 rounded-xl border text-center text-sm sm:text-base font-bold focus:outline-none focus:ring-2 ${isDarkMode ? "bg-stone-950 border-stone-600 text-stone-100 placeholder:text-stone-500 focus:ring-amber-500" : "bg-[#FDFBF7] border-[#C4B69E] text-[#2C2520] placeholder:text-[#8E8173] focus:ring-[#5C4332]"}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-1.5 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						"aria-label": "타이핑 입력 확인",
						className: `h-8 sm:h-9 rounded-lg font-bold text-xs flex items-center justify-center gap-1 whitespace-nowrap shrink-0 transition-transform active:scale-95 ${isDarkMode ? "bg-[#CE8E54] text-[#FFFDF9] hover:bg-[#BF8047]" : "bg-[#CC8B52] text-[#FFFDF9] hover:bg-[#BC7C44]"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerDownLeft, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "입력" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							soundManager.playPaperScratch(.6);
							setTypedText("");
							onClearCell();
						},
						"aria-label": "선택 칸 지우기",
						className: `h-8 sm:h-9 rounded-lg border font-bold text-xs flex items-center justify-center gap-1 whitespace-nowrap shrink-0 ${isDarkMode ? "bg-stone-800 border-stone-600 text-stone-200 hover:bg-stone-700" : "bg-[#FDFBF7] border-[#C9BCA6] text-[#5C4E41] hover:bg-[#F3ECE0]"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Delete, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "지움" })]
					})]
				}),
				onAttemptSwitchToHandwriting && !isOffline && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onAttemptSwitchToHandwriting,
					"aria-label": "손글씨 모드로 전환",
					className: `w-full h-8 sm:h-8.5 px-2 rounded-lg border font-bold text-xs flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition-transform active:scale-95 ${isDarkMode ? "bg-stone-800 border-stone-600 text-stone-200 hover:bg-stone-700" : "bg-[#FDFBF7] border-[#C9BCA6] text-[#4A3F35] hover:bg-[#F3ECE0]"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenTool, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "손글씨 모드로 전환" })]
				})
			]
		})
	});
};
// src/components/SettingsModal.tsx
var SettingsModal = ({ isOpen, inputMode, isOffline = false, bgmEnabled, sfxEnabled, isDarkMode, autoCommitDelaySec, onChangeInputMode, onChangeAutoCommitDelay, onAttemptOfflineHandwriting, onToggleBgm, onToggleSfx, onToggleDarkMode, onClose }) => {
	if (!isOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-hidden",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "settings-modal-title",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `w-full max-w-sm rounded-3xl border p-5 shadow-2xl transition-colors ${isDarkMode ? "bg-stone-900 border-stone-700 text-stone-100" : "bg-[#F8F3E6] border-[#D8CEBE] text-[#2C2520]"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "w-5 h-5 text-[#5C4332] dark:text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "settings-modal-title",
						className: "text-lg font-bold",
						children: "설정"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					"aria-label": "설정 닫기",
					className: `min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center transition-colors ${isDarkMode ? "bg-stone-800 text-stone-300 hover:bg-stone-700" : "bg-[#EAE2D0] text-[#4A3F35] hover:bg-[#DFD5BF]"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-2xl border p-3.5 ${isDarkMode ? "bg-stone-800/70 border-stone-700" : "bg-[#FDFBF7] border-[#DCD2C0]"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs font-bold mb-2 opacity-80 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "입력 방식" }), isOffline && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-normal text-rose-500 dark:text-rose-400",
								children: "오프라인 상태 (손글씨 불가)"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									if (isOffline) {
										onAttemptOfflineHandwriting?.();
										return;
									}
									onChangeInputMode("handwriting");
								},
								"aria-pressed": inputMode === "handwriting",
								className: `min-h-[46px] rounded-xl border font-bold text-sm flex items-center justify-center gap-1.5 transition-all whitespace-nowrap shrink-0 active:scale-95 ${isOffline ? "bg-rose-500/10 border-rose-300 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 hover:bg-rose-500/20" : inputMode === "handwriting" ? isDarkMode ? "bg-[#CE8E54] border-[#E2A872] text-[#FFFDF9]" : "bg-[#CC8B52] border-[#B6763E] text-[#FFFDF9]" : isDarkMode ? "bg-stone-900 border-stone-700 text-stone-300" : "bg-[#F3ECE0] border-[#D5CBB8] text-[#4A3F35]"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenTool, { className: "w-4 h-4" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "손글씨" }),
									isOffline && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-700 dark:text-rose-300 font-bold",
										children: "불가"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => onChangeInputMode("typing"),
								"aria-pressed": inputMode === "typing",
								className: `min-h-[46px] rounded-xl border font-bold text-sm flex items-center justify-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${inputMode === "typing" ? isDarkMode ? "bg-[#CE8E54] border-[#E2A872] text-[#FFFDF9]" : "bg-[#CC8B52] border-[#B6763E] text-[#FFFDF9]" : isDarkMode ? "bg-stone-900 border-stone-700 text-stone-300" : "bg-[#F3ECE0] border-[#D5CBB8] text-[#4A3F35]"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "타이핑" })]
							})]
						})]
					}),
					inputMode === "handwriting" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `rounded-2xl border p-3.5 ${isDarkMode ? "bg-stone-800/70 border-stone-700" : "bg-[#FDFBF7] border-[#DCD2C0]"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-bold opacity-80",
								children: "자동 작성 대기 시간"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] opacity-60",
								children: "글씨 작성 후 입력까지 시간"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => onChangeAutoCommitDelay(Math.max(.5, Math.round((autoCommitDelaySec - .5) * 10) / 10)),
										disabled: autoCommitDelaySec <= .5,
										"aria-label": "자동 작성 대기 시간 0.5초 감소",
										className: `w-9 h-9 rounded-xl border font-black text-lg flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${isDarkMode ? "bg-stone-800 border-stone-600 text-stone-100 hover:bg-stone-700 active:scale-95" : "bg-[#F3ECE0] border-[#D5CBB8] text-[#2C2520] hover:bg-[#EAE2D0] active:scale-95"}`,
										children: "-"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "w-12 text-center font-bold text-sm font-mono tabular-nums",
										children: [autoCommitDelaySec.toFixed(1), "초"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => onChangeAutoCommitDelay(Math.min(5, Math.round((autoCommitDelaySec + .5) * 10) / 10)),
										disabled: autoCommitDelaySec >= 5,
										"aria-label": "자동 작성 대기 시간 0.5초 증가",
										className: `w-9 h-9 rounded-xl border font-black text-lg flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${isDarkMode ? "bg-stone-800 border-stone-600 text-stone-100 hover:bg-stone-700 active:scale-95" : "bg-[#F3ECE0] border-[#D5CBB8] text-[#2C2520] hover:bg-[#EAE2D0] active:scale-95"}`,
										children: "+"
									})
								]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-2xl border p-3.5 space-y-2.5 ${isDarkMode ? "bg-stone-800/70 border-stone-700" : "bg-[#FDFBF7] border-[#DCD2C0]"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 font-bold text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, { className: "w-4 h-4 text-[#5C4332] dark:text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "배경음악" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: onToggleBgm,
								"aria-pressed": bgmEnabled,
								"aria-label": "배경음악 전환",
								className: `min-h-[42px] px-4 rounded-xl font-bold text-xs flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors ${bgmEnabled ? isDarkMode ? "bg-emerald-700 text-emerald-50" : "bg-[#2E6F5E] text-white" : isDarkMode ? "bg-stone-700 text-stone-300" : "bg-[#DFD5BF] text-[#5C4E41]"}`,
								children: [bgmEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: bgmEnabled ? "켜짐" : "꺼짐" })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `border-t pt-2.5 flex items-center justify-between ${isDarkMode ? "border-stone-700" : "border-[#E8DFCE]"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 font-bold text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-4 h-4 text-[#5C4332] dark:text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "효과음" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: onToggleSfx,
								"aria-pressed": sfxEnabled,
								"aria-label": "효과음 전환",
								className: `min-h-[42px] px-4 rounded-xl font-bold text-xs flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors ${sfxEnabled ? isDarkMode ? "bg-emerald-700 text-emerald-50" : "bg-[#2E6F5E] text-white" : isDarkMode ? "bg-stone-700 text-stone-300" : "bg-[#DFD5BF] text-[#5C4E41]"}`,
								children: [sfxEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: sfxEnabled ? "켜짐" : "꺼짐" })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-2xl border p-3.5 flex items-center justify-between ${isDarkMode ? "bg-stone-800/70 border-stone-700" : "bg-[#FDFBF7] border-[#DCD2C0]"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 font-bold text-sm",
							children: [isDarkMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "w-4 h-4 text-amber-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "w-4 h-4 text-[#5C4332]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "다크모드" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onToggleDarkMode,
							"aria-pressed": isDarkMode,
							"aria-label": "다크모드 전환",
							className: `min-h-[42px] px-4 rounded-xl font-bold text-xs flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors ${isDarkMode ? "bg-amber-600 text-stone-950" : "bg-[#2C2520] text-[#F8F3E6]"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isDarkMode ? "켜짐" : "꺼짐" })
						})]
					})
				]
			})]
		})
	});
};
// src/components/StageClearModal.tsx
var StageClearModal = ({ isOpen, isDarkMode, puzzleTitle, elapsedSeconds, wordRewardTotal, clearBonus, letterHintCount = 0, wordHintCount = 0, hasNextStage, onNextStage, onReplay, onGoStageSelect }) => {
	if (!isOpen) return null;
	const totalEarned = wordRewardTotal + clearBonus;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 overflow-hidden",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "stage-clear-title",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `w-full max-w-sm rounded-3xl border p-5 shadow-2xl text-center transition-colors ${isDarkMode ? "bg-stone-900 border-stone-700 text-stone-100" : "bg-[#FAF5E8] border-[#D8CEBE] text-[#2C2520]"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `mx-auto mb-3 w-full h-32 rounded-2xl border flex items-center justify-center relative overflow-hidden ${isDarkMode ? "bg-gradient-to-b from-amber-950/60 to-stone-900 border-amber-800/50" : "bg-gradient-to-b from-[#F4E8CE] to-[#FDFBF7] border-[#DECFA8]"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						viewBox: "0 0 320 130",
						className: "w-full h-full",
						role: "img",
						"aria-label": "클리어 축하 일러스트",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "160",
								cy: "78",
								r: "46",
								fill: "#E89954",
								fillOpacity: "0.24"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "160",
								cy: "78",
								r: "32",
								fill: "#D97736",
								fillOpacity: "0.32"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M0 130 L55 82 L115 112 L180 74 L255 108 L320 80 L320 130 Z",
								fill: isDarkMode ? "#3B332B" : "#DECBB1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M0 130 L85 96 L155 118 L230 88 L320 115 L320 130 Z",
								fill: isDarkMode ? "#29241F" : "#CDB89B"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M15 36 Q65 42 110 28",
								stroke: "#5C4028",
								strokeWidth: "4",
								fill: "none",
								strokeLinecap: "round"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "62",
								cy: "42",
								r: "10",
								fill: "#D9532F"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "95",
								cy: "34",
								r: "9",
								fill: "#E06A3B"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
								transform: "translate(160, 62) rotate(-8)",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										x: "-34",
										y: "-34",
										width: "68",
										height: "68",
										rx: "12",
										fill: "#FDFBF7",
										stroke: "#C92A2A",
										strokeWidth: "3.5"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										x: "-28",
										y: "-28",
										width: "56",
										height: "56",
										rx: "8",
										fill: "rgba(201, 42, 42, 0.1)",
										stroke: "#C92A2A",
										strokeWidth: "1.5",
										strokeDasharray: "6 3"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
										x: "0",
										y: "-4",
										textAnchor: "middle",
										fill: "#C92A2A",
										fontSize: "15",
										fontWeight: "800",
										fontFamily: "IBM Plex Sans KR, sans-serif",
										children: "참잘함"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
										x: "0",
										y: "16",
										textAnchor: "middle",
										fill: "#C92A2A",
										fontSize: "12",
										fontWeight: "700",
										fontFamily: "IBM Plex Sans KR, sans-serif",
										children: "완성함"
									})
								]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "stage-clear-title",
					className: "text-xl font-bold mb-1",
					children: "참 잘하셨습니다!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `text-xs font-semibold mb-3.5 ${isDarkMode ? "text-stone-400" : "text-[#6E6256]"}`,
					children: puzzleTitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2.5 mb-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-2xl border p-2.5 flex flex-col items-center ${isDarkMode ? "bg-stone-800/80 border-stone-700" : "bg-[#F2ECE0] border-[#DCD2C0]"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `text-xs font-semibold flex items-center gap-1 mb-0.5 ${isDarkMode ? "text-stone-400" : "text-[#6E6256]"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "풀이 시간" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-lg font-bold font-mono tabular-nums",
							children: formatTimerMMSS(elapsedSeconds)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-2xl border p-2.5 flex flex-col items-center ${isDarkMode ? "bg-amber-950/50 border-amber-800/70 text-amber-200" : "bg-[#F6EBD6] border-[#DFC99F] text-[#7A3E18]"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs font-semibold flex items-center gap-1 mb-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "획득 재화" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-lg font-bold font-mono tabular-nums",
							children: ["+", totalEarned]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2.5 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-testid": "clear-letter-hint-count",
						className: `rounded-2xl border px-3 py-2 flex items-center justify-between text-xs font-bold ${isDarkMode ? "bg-stone-800/60 border-stone-700 text-stone-200" : "bg-[#F5EFE2] border-[#DCD2C0] text-[#4A3F35]"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "w-3.5 h-3.5 text-amber-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "한 글자 힌트" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono font-extrabold tabular-nums",
							children: [letterHintCount, "번"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-testid": "clear-word-hint-count",
						className: `rounded-2xl border px-3 py-2 flex items-center justify-between text-xs font-bold ${isDarkMode ? "bg-stone-800/60 border-stone-700 text-stone-200" : "bg-[#F5EFE2] border-[#DCD2C0] text-[#4A3F35]"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5 text-[#5C4332] dark:text-amber-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "한 단어 힌트" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono font-extrabold tabular-nums",
							children: [wordHintCount, "번"]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [hasNextStage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"data-start": "true",
						onClick: onNextStage,
						className: `w-full min-h-[48px] rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-transform active:scale-98 whitespace-nowrap shrink-0 ${isDarkMode ? "bg-[#CE8E54] text-[#FFFDF9] hover:bg-[#BF8047]" : "bg-[#CC8B52] text-[#FFFDF9] hover:bg-[#BC7C44]"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "다음 스테이지" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"data-start": !hasNextStage ? "true" : void 0,
							onClick: onReplay,
							className: `min-h-[44px] rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 ${isDarkMode ? "bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700" : "bg-[#EFE9DA] border-[#D5CBB8] text-[#4A3F35] hover:bg-[#E5DEC9]"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "다시 풀기" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"aria-label": "스테이지 선택 화면으로 이동",
							onClick: onGoStageSelect,
							className: `min-h-[44px] rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 ${isDarkMode ? "bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700" : "bg-[#EFE9DA] border-[#D5CBB8] text-[#4A3F35] hover:bg-[#E5DEC9]"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "스테이지 목록" })]
						})]
					})]
				})
			]
		})
	});
};
// src/App.tsx
var STORAGE_KEY = "ongeul_crossword_save_v5";
var STAGES_PER_PAGE = 20;
function loadInitialSave() {
	if (typeof window === "undefined") return null;
	try {
		const storage = window.localStorage;
		if (!storage) return null;
		const raw = storage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		return parsed && typeof parsed === "object" ? parsed : null;
	} catch (e) {
		console.error("Failed to load saved state:", e);
		return null;
	}
}
function saveStateToStorage(updater) {
	if (typeof window === "undefined") return;
	try {
		const storage = window.localStorage;
		if (!storage) return;
		const next = updater(loadInitialSave() || {
			currency: 300,
			highestReachedStage: 0,
			clearedStageIds: [],
			hintClearedStageIds: [],
			startedStageIds: [],
			settings: {
				inputMode: "handwriting",
				bgmEnabled: true,
				sfxEnabled: true,
				isDarkMode: false,
				autoCommitDelaySec: 1.5
			},
			activePuzzle: null
		});
		storage.setItem(STORAGE_KEY, JSON.stringify(next));
	} catch (e) {
		console.error("Failed to save state:", e);
	}
}
function isSavedGridCompatibleWithPuzzle(grid, puzzle, selectedCell) {
	if (!puzzle || typeof puzzle.size !== "number" || !Array.isArray(puzzle.words)) return false;
	if (!Array.isArray(grid) || grid.length !== puzzle.size) return false;
	for (let r = 0; r < puzzle.size; r++) {
		const rowArr = grid[r];
		if (!Array.isArray(rowArr) || rowArr.length !== puzzle.size) return false;
	}
	if (!selectedCell || typeof selectedCell.row !== "number" || typeof selectedCell.col !== "number" || selectedCell.row < 0 || selectedCell.row >= puzzle.size || selectedCell.col < 0 || selectedCell.col >= puzzle.size) return false;
	for (const w of puzzle.words) {
		const chars = Array.from(w.answer);
		for (let i = 0; i < chars.length; i++) {
			const r = w.direction === "across" ? w.row : w.row + i;
			const c = w.direction === "across" ? w.col + i : w.col;
			const cell = grid[r]?.[c];
			if (!cell || !cell.isPlayable || cell.solution !== chars[i]) return false;
		}
	}
	return true;
}
function App() {
	const initialAutoStart = (0, import_react.useMemo)(() => {
		if (typeof window === "undefined") return false;
		return new URLSearchParams(window.location.search).get("autostart") === "1";
	}, []);
	const initialSave = (0, import_react.useMemo)(() => loadInitialSave(), []);
	const [screen, setScreen] = (0, import_react.useState)(initialAutoStart ? "playing" : "title");
	const [isOffline, setIsOffline] = (0, import_react.useState)(() => {
		return typeof navigator !== "undefined" ? !navigator.onLine : false;
	});
	const [isOfflineNoticeOpen, setIsOfflineNoticeOpen] = (0, import_react.useState)(false);
	const [inputMode, setInputMode] = (0, import_react.useState)(() => {
		if (typeof navigator !== "undefined" && !navigator.onLine) return "typing";
		return initialSave?.settings?.inputMode === "typing" ? "typing" : "handwriting";
	});
	const [autoCommitDelaySec, setAutoCommitDelaySec] = (0, import_react.useState)(Number(initialSave?.settings?.autoCommitDelaySec) || 1.5);
	const [bgmEnabled, setBgmEnabled] = (0, import_react.useState)(initialSave?.settings?.bgmEnabled ?? true);
	const [sfxEnabled, setSfxEnabled] = (0, import_react.useState)(initialSave?.settings?.sfxEnabled ?? true);
	const [isDarkMode, setIsDarkMode] = (0, import_react.useState)(initialSave?.settings?.isDarkMode ?? false);
	const [isSettingsOpen, setIsSettingsOpen] = (0, import_react.useState)(false);
	const [isHowToPlayOpen, setIsHowToPlayOpen] = (0, import_react.useState)(false);
	const triggerOfflineMode = (0, import_react.useCallback)((showAlert = true) => {
		setIsOffline(true);
		setInputMode("typing");
		if (showAlert) {
			soundManager.playWrongAlert();
			setIsOfflineNoticeOpen(true);
		}
	}, []);
	const handleAttemptSwitchToHandwriting = (0, import_react.useCallback)(() => {
		const isNavOffline = typeof navigator !== "undefined" && !navigator.onLine;
		if (isOffline || isNavOffline) triggerOfflineMode(true);
		else {
			soundManager.playSnapFit();
			setInputMode("handwriting");
		}
	}, [isOffline, triggerOfflineMode]);
	(0, import_react.useEffect)(() => {
		if (typeof navigator !== "undefined" && !navigator.onLine) triggerOfflineMode(true);
		const handleOnline = () => {
			setIsOffline(false);
		};
		const handleOffline = () => {
			triggerOfflineMode(true);
		};
		if (typeof window !== "undefined") {
			window.addEventListener("online", handleOnline);
			window.addEventListener("offline", handleOffline);
		}
		const intervalId = window.setInterval(() => {
			if (typeof navigator !== "undefined" && !navigator.onLine) triggerOfflineMode(true);
		}, 2e3);
		return () => {
			if (typeof window !== "undefined") {
				window.removeEventListener("online", handleOnline);
				window.removeEventListener("offline", handleOffline);
				window.clearInterval(intervalId);
			}
		};
	}, [triggerOfflineMode]);
	const [activeHintModal, setActiveHintModal] = (0, import_react.useState)(null);
	const [stagePage, setStagePage] = (0, import_react.useState)(0);
	const [isDeleteMode, setIsDeleteMode] = (0, import_react.useState)(false);
	const [selectedDeleteIds, setSelectedDeleteIds] = (0, import_react.useState)([]);
	const [isConfirmBulkDeleteOpen, setIsConfirmBulkDeleteOpen] = (0, import_react.useState)(false);
	const [currency, setCurrency] = (0, import_react.useState)(typeof initialSave?.currency === "number" && !Number.isNaN(initialSave.currency) ? initialSave.currency : 300);
	const [highestReachedStage, setHighestReachedStage] = (0, import_react.useState)(typeof initialSave?.highestReachedStage === "number" && !Number.isNaN(initialSave.highestReachedStage) ? initialSave.highestReachedStage : 0);
	const [clearedStageIds, setClearedStageIds] = (0, import_react.useState)(Array.isArray(initialSave?.clearedStageIds) ? initialSave.clearedStageIds : []);
	const [hintClearedStageIds, setHintClearedStageIds] = (0, import_react.useState)(Array.isArray(initialSave?.hintClearedStageIds) ? initialSave.hintClearedStageIds : []);
	const [startedStageIds, setStartedStageIds] = (0, import_react.useState)(Array.isArray(initialSave?.startedStageIds) ? initialSave.startedStageIds : []);
	const [baseStages] = (0, import_react.useState)(() => Array.isArray(initialSave?.baseStages) && initialSave.baseStages.length > 0 ? initialSave.baseStages : STAGE_PUZZLES);
	const [unlockedStageIds, setUnlockedStageIds] = (0, import_react.useState)(Array.isArray(initialSave?.unlockedStageIds) && initialSave.unlockedStageIds.length > 0 ? initialSave.unlockedStageIds : [(Array.isArray(initialSave?.baseStages) && initialSave.baseStages.length > 0 ? initialSave.baseStages[0] : STAGE_PUZZLES[0]).id]);
	const [customStages, setCustomStages] = (0, import_react.useState)(Array.isArray(initialSave?.customStages) ? initialSave.customStages : []);
	const allStages = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const s of baseStages) map.set(s.id, {
			...s,
			wordReward: 5
		});
		for (const cs of customStages) if (cs && typeof cs.id === "string" && Array.isArray(cs.words)) map.set(cs.id, {
			...cs,
			wordReward: 5
		});
		return Array.from(map.values()).sort((a, b) => (a.stageNumber ?? 0) - (b.stageNumber ?? 0));
	}, [baseStages, customStages]);
	const nextAutoStageNumber = (0, import_react.useMemo)(() => {
		return allStages.reduce((max, s) => Math.max(max, s.stageNumber ?? 0), 0) + 1;
	}, [allStages]);
	const [isCreateStageOpen, setIsCreateStageOpen] = (0, import_react.useState)(false);
	const [createGridSize, setCreateGridSize] = (0, import_react.useState)(15);
	const [createTargetWords, setCreateTargetWords] = (0, import_react.useState)(20);
	const initialPuzzleInfo = (0, import_react.useMemo)(() => {
		const ap = initialSave?.activePuzzle;
		const initialAllStages = [...baseStages, ...Array.isArray(initialSave?.customStages) ? initialSave.customStages : []];
		if (ap) {
			const found = initialAllStages.find((p) => p.id === ap.puzzleId);
			if (found && isSavedGridCompatibleWithPuzzle(ap.grid, found, ap.selectedCell)) return {
				puzzle: {
					...found,
					wordReward: 5
				},
				grid: ap.grid,
				solvedWordIds: new Set(Array.isArray(ap.solvedWordIds) ? ap.solvedWordIds : []),
				selectedCell: ap.selectedCell,
				activeDirection: ap.activeDirection === "down" ? "down" : "across",
				elapsedSeconds: Number(ap.elapsedSeconds) || 0,
				runWordRewardEarned: Number(ap.runWordRewardEarned) || 0,
				letterHintCount: ap.letterHintCount ?? 0,
				wordHintCount: ap.wordHintCount ?? 0,
				hasSavedProgress: true
			};
		}
		const defaultPuzzle = {
			...baseStages[0],
			wordReward: 5
		};
		const firstWord = defaultPuzzle.words[0] ?? {
			row: 0,
			col: 0,
			direction: "across"
		};
		return {
			puzzle: defaultPuzzle,
			grid: buildCrosswordGrid(defaultPuzzle),
			solvedWordIds: /* @__PURE__ */ new Set(),
			selectedCell: {
				row: firstWord.row,
				col: firstWord.col
			},
			activeDirection: firstWord.direction,
			elapsedSeconds: 0,
			runWordRewardEarned: 0,
			letterHintCount: 0,
			wordHintCount: 0,
			hasSavedProgress: false
		};
	}, [initialSave, baseStages]);
	const [currentPuzzle, setCurrentPuzzle] = (0, import_react.useState)(initialPuzzleInfo.puzzle);
	const [grid, setGrid] = (0, import_react.useState)(initialPuzzleInfo.grid);
	const [solvedWordIds, setSolvedWordIds] = (0, import_react.useState)(initialPuzzleInfo.solvedWordIds);
	const [selectedCell, setSelectedCell] = (0, import_react.useState)(initialPuzzleInfo.selectedCell);
	const [activeDirection, setActiveDirection] = (0, import_react.useState)(initialPuzzleInfo.activeDirection);
	const [hasSavedActiveGame, setHasSavedActiveGame] = (0, import_react.useState)(Boolean(initialSave?.activePuzzle));
	const boardContainerRef = (0, import_react.useRef)(null);
	const [boardBoxSize, setBoardBoxSize] = (0, import_react.useState)(300);
	const [zoomScale, setZoomScale] = (0, import_react.useState)(1);
	const [panOffset, setPanOffset] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const hasDraggedRef = (0, import_react.useRef)(false);
	const pinchStateRef = (0, import_react.useRef)({
		initialDistance: null,
		initialScale: 1,
		lastPanPoint: null,
		isMouseDown: false,
		dragDistance: 0
	});
	(0, import_react.useEffect)(() => {
		if (screen !== "playing" && screen !== "gameover") return;
		const el = boardContainerRef.current;
		if (!el) return;
		const updateSize = () => {
			const rect = el.getBoundingClientRect();
			const minDim = Math.min(rect.width, rect.height);
			if (minDim > 0) setBoardBoxSize(Math.max(180, Math.floor(minDim - 14)));
		};
		updateSize();
		const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateSize) : null;
		observer?.observe(el);
		window.addEventListener("resize", updateSize);
		return () => {
			observer?.disconnect();
			window.removeEventListener("resize", updateSize);
		};
	}, [screen, currentPuzzle.size]);
	const [elapsedSeconds, setElapsedSeconds] = (0, import_react.useState)(initialPuzzleInfo.elapsedSeconds);
	const [runWordRewardEarned, setRunWordRewardEarned] = (0, import_react.useState)(initialPuzzleInfo.runWordRewardEarned);
	const [runLetterHintCount, setRunLetterHintCount] = (0, import_react.useState)(initialPuzzleInfo.letterHintCount);
	const [runWordHintCount, setRunWordHintCount] = (0, import_react.useState)(initialPuzzleInfo.wordHintCount);
	const runHintCountsRef = (0, import_react.useRef)({
		letter: initialPuzzleInfo.letterHintCount,
		word: initialPuzzleInfo.wordHintCount
	});
	const timerStartTimestampRef = (0, import_react.useRef)(null);
	const baseElapsedSecondsRef = (0, import_react.useRef)(initialPuzzleInfo.elapsedSeconds);
	const elapsedSecondsRef = (0, import_react.useRef)(initialPuzzleInfo.elapsedSeconds);
	(0, import_react.useEffect)(() => {
		elapsedSecondsRef.current = elapsedSeconds;
	}, [elapsedSeconds]);
	(0, import_react.useEffect)(() => {
		if (!(screen === "playing" && !isSettingsOpen && activeHintModal === null)) {
			if (timerStartTimestampRef.current !== null) {
				const delta = Math.floor((Date.now() - timerStartTimestampRef.current) / 1e3);
				baseElapsedSecondsRef.current = Math.max(0, baseElapsedSecondsRef.current + Math.max(0, delta));
				timerStartTimestampRef.current = null;
			}
			return;
		}
		if (timerStartTimestampRef.current === null) timerStartTimestampRef.current = Date.now();
		const intervalId = window.setInterval(() => {
			if (timerStartTimestampRef.current !== null) {
				const delta = Math.floor((Date.now() - timerStartTimestampRef.current) / 1e3);
				const nextTotal = baseElapsedSecondsRef.current + Math.max(0, delta);
				setElapsedSeconds(nextTotal);
			}
		}, 500);
		return () => {
			window.clearInterval(intervalId);
		};
	}, [
		screen,
		isSettingsOpen,
		activeHintModal
	]);
	(0, import_react.useEffect)(() => {
		document.body.dataset.state = screen === "stage_select" ? "playing" : screen;
		if (screen !== "playing") soundManager.stopBgm();
	}, [screen]);
	(0, import_react.useEffect)(() => {
		soundManager.setConfig(bgmEnabled, sfxEnabled);
	}, [bgmEnabled, sfxEnabled]);
	(0, import_react.useEffect)(() => {
		saveStateToStorage((prev) => ({
			...prev,
			currency,
			highestReachedStage,
			clearedStageIds,
			hintClearedStageIds,
			unlockedStageIds,
			baseStages,
			customStages,
			settings: {
				...prev.settings,
				inputMode,
				bgmEnabled,
				sfxEnabled,
				isDarkMode,
				autoCommitDelaySec
			}
		}));
	}, [
		currency,
		highestReachedStage,
		clearedStageIds,
		hintClearedStageIds,
		unlockedStageIds,
		baseStages,
		customStages,
		inputMode,
		bgmEnabled,
		sfxEnabled,
		isDarkMode,
		autoCommitDelaySec
	]);
	(0, import_react.useEffect)(() => {
		if (screen === "playing") {
			setHasSavedActiveGame(true);
			saveStateToStorage((prev) => ({
				...prev,
				activePuzzle: {
					puzzleId: currentPuzzle.id,
					grid,
					solvedWordIds: Array.from(solvedWordIds),
					selectedCell,
					activeDirection,
					elapsedSeconds: elapsedSecondsRef.current,
					runWordRewardEarned,
					letterHintCount: runLetterHintCount,
					wordHintCount: runWordHintCount
				}
			}));
		} else if (screen === "gameover") {
			setHasSavedActiveGame(false);
			saveStateToStorage((prev) => ({
				...prev,
				activePuzzle: null
			}));
		}
	}, [
		screen,
		currentPuzzle,
		grid,
		solvedWordIds,
		selectedCell,
		activeDirection,
		runWordRewardEarned,
		runLetterHintCount,
		runWordHintCount
	]);
	(0, import_react.useEffect)(() => {
		if (screen !== "playing") return;
		const interval = window.setInterval(() => {
			saveStateToStorage((prev) => {
				if (!prev.activePuzzle) return prev;
				return {
					...prev,
					activePuzzle: {
						...prev.activePuzzle,
						elapsedSeconds: elapsedSecondsRef.current
					}
				};
			});
		}, 5e3);
		return () => window.clearInterval(interval);
	}, [screen]);
	(0, import_react.useEffect)(() => {
		const handleUnloadOrHide = () => {
			if (typeof document !== "undefined" && document.hidden) soundManager.pauseForBackground();
			if (screen === "playing") saveStateToStorage((prev) => ({
				...prev,
				activePuzzle: {
					puzzleId: currentPuzzle.id,
					grid,
					solvedWordIds: Array.from(solvedWordIds),
					selectedCell,
					activeDirection,
					elapsedSeconds: elapsedSecondsRef.current,
					runWordRewardEarned,
					letterHintCount: runHintCountsRef.current.letter,
					wordHintCount: runHintCountsRef.current.word
				}
			}));
		};
		window.addEventListener("beforeunload", handleUnloadOrHide);
		document.addEventListener("visibilitychange", handleUnloadOrHide);
		return () => {
			window.removeEventListener("beforeunload", handleUnloadOrHide);
			document.removeEventListener("visibilitychange", handleUnloadOrHide);
		};
	}, [
		screen,
		currentPuzzle,
		grid,
		solvedWordIds,
		selectedCell,
		activeDirection,
		runWordRewardEarned
	]);
	const screenRef = (0, import_react.useRef)(screen);
	(0, import_react.useEffect)(() => {
		screenRef.current = screen;
	}, [screen]);
	const navigateToTitle = (0, import_react.useCallback)(() => {
		setIsDeleteMode(false);
		setSelectedDeleteIds([]);
		setIsCreateStageOpen(false);
		setIsConfirmBulkDeleteOpen(false);
		setActiveHintModal(null);
		setIsSettingsOpen(false);
		setIsHowToPlayOpen(false);
		screenRef.current = "title";
		setScreen("title");
		if (typeof window !== "undefined" && window.history) try {
			window.history.replaceState({ screen: "title" }, "");
		} catch {}
	}, []);
	const navigateToStageSelect = (0, import_react.useCallback)(() => {
		const prevScreen = screenRef.current;
		setIsDeleteMode(false);
		setSelectedDeleteIds([]);
		setIsCreateStageOpen(false);
		setIsConfirmBulkDeleteOpen(false);
		setActiveHintModal(null);
		setIsSettingsOpen(false);
		setIsHowToPlayOpen(false);
		screenRef.current = "stage_select";
		setScreen("stage_select");
		if (typeof window !== "undefined" && window.history) try {
			if (prevScreen === "title") {
				window.history.replaceState({ screen: "title" }, "");
				window.history.pushState({ screen: "stage_select" }, "");
			} else window.history.replaceState({ screen: "stage_select" }, "");
		} catch {}
	}, []);
	const startPuzzle = (0, import_react.useCallback)((puzzle, forceFresh = false) => {
		const ap = loadInitialSave()?.activePuzzle;
		if (!forceFresh && ap && ap.puzzleId === puzzle.id && isSavedGridCompatibleWithPuzzle(ap.grid, puzzle, ap.selectedCell) && ap) {
			setCurrentPuzzle(puzzle);
			setGrid(ap.grid);
			setSolvedWordIds(new Set(Array.isArray(ap.solvedWordIds) ? ap.solvedWordIds : []));
			setSelectedCell(ap.selectedCell);
			setActiveDirection(ap.activeDirection === "down" ? "down" : "across");
			const restoredSec = Number(ap.elapsedSeconds) || 0;
			baseElapsedSecondsRef.current = restoredSec;
			timerStartTimestampRef.current = Date.now();
			setElapsedSeconds(restoredSec);
			setRunWordRewardEarned(Number(ap.runWordRewardEarned) || 0);
			const restoredLetterHints = ap.letterHintCount ?? 0;
			const restoredWordHints = ap.wordHintCount ?? 0;
			runHintCountsRef.current = {
				letter: restoredLetterHints,
				word: restoredWordHints
			};
			setRunLetterHintCount(restoredLetterHints);
			setRunWordHintCount(restoredWordHints);
		} else {
			const freshGrid = buildCrosswordGrid(puzzle);
			const firstWord = puzzle.words[0] ?? {
				row: 0,
				col: 0,
				direction: "across"
			};
			setCurrentPuzzle(puzzle);
			setGrid(freshGrid);
			setSolvedWordIds(/* @__PURE__ */ new Set());
			setSelectedCell({
				row: firstWord.row,
				col: firstWord.col
			});
			setActiveDirection(firstWord.direction);
			baseElapsedSecondsRef.current = 0;
			timerStartTimestampRef.current = Date.now();
			setElapsedSeconds(0);
			setRunWordRewardEarned(0);
			runHintCountsRef.current = {
				letter: 0,
				word: 0
			};
			setRunLetterHintCount(0);
			setRunWordHintCount(0);
		}
		const prevScreen = screenRef.current;
		setZoomScale(1);
		setPanOffset({
			x: 0,
			y: 0
		});
		setIsSettingsOpen(false);
		setActiveHintModal(null);
		screenRef.current = "playing";
		setScreen("playing");
		if (typeof window !== "undefined" && window.history) try {
			if (prevScreen === "title") {
				window.history.replaceState({ screen: "title" }, "");
				window.history.pushState({ screen: "stage_select" }, "");
				window.history.pushState({ screen: "playing" }, "");
			} else if (prevScreen === "stage_select") window.history.pushState({ screen: "playing" }, "");
			else window.history.replaceState({ screen: "playing" }, "");
		} catch {}
		soundManager.startBgm();
		if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
	}, []);
	const resumeActivePuzzle = (0, import_react.useCallback)(() => {
		const ap = loadInitialSave()?.activePuzzle;
		if (ap) {
			const found = allStages.find((p) => p.id === ap.puzzleId);
			if (found) {
				startPuzzle(found, false);
				return;
			}
		}
		navigateToStageSelect();
	}, [
		allStages,
		startPuzzle,
		navigateToStageSelect
	]);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined" || !window.history) return;
		try {
			if (initialAutoStart) {
				window.history.replaceState({ screen: "title" }, "");
				window.history.pushState({ screen: "stage_select" }, "");
				window.history.pushState({ screen: "playing" }, "");
			} else window.history.replaceState({ screen: "title" }, "");
		} catch {}
		const handleBackAction = () => {
			if (screenRef.current === "playing" || screenRef.current === "gameover") {
				soundManager.playSnapFit();
				setActiveHintModal(null);
				setIsSettingsOpen(false);
				setIsDeleteMode(false);
				setSelectedDeleteIds([]);
				screenRef.current = "stage_select";
				setScreen("stage_select");
				try {
					if (window.history.state?.screen !== "stage_select") {
						window.history.replaceState({ screen: "title" }, "");
						window.history.pushState({ screen: "stage_select" }, "");
					}
				} catch {}
				return true;
			}
			if (screenRef.current === "stage_select") {
				soundManager.playSnapFit();
				setIsDeleteMode(false);
				setSelectedDeleteIds([]);
				setIsCreateStageOpen(false);
				setIsConfirmBulkDeleteOpen(false);
				setIsSettingsOpen(false);
				screenRef.current = "title";
				setScreen("title");
				try {
					window.history.replaceState({ screen: "title" }, "");
				} catch {}
				return true;
			}
			return false;
		};
		const handlePopState = () => {
			handleBackAction();
		};
		window.handleAndroidBack = handleBackAction;
		window.addEventListener("popstate", handlePopState);
		return () => {
			window.removeEventListener("popstate", handlePopState);
		};
	}, [initialAutoStart]);
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (e) => {
			const tag = e.target?.tagName;
			if (tag === "INPUT" || tag === "TEXTAREA") return;
			if (screen === "title" && (e.key === "Enter" || e.key === " ")) {
				e.preventDefault();
				soundManager.playSnapFit();
				navigateToStageSelect();
			} else if (e.key === "Escape") {
				e.preventDefault();
				if (isSettingsOpen) setIsSettingsOpen(false);
				else if (isHowToPlayOpen) setIsHowToPlayOpen(false);
				else if (activeHintModal !== null) setActiveHintModal(null);
				else if (isCreateStageOpen) setIsCreateStageOpen(false);
				else if (isConfirmBulkDeleteOpen) setIsConfirmBulkDeleteOpen(false);
				else if (screen === "playing" || screen === "gameover") {
					soundManager.playSnapFit();
					navigateToStageSelect();
				} else if (screen === "stage_select") {
					soundManager.playSnapFit();
					navigateToTitle();
				}
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [
		screen,
		isSettingsOpen,
		isHowToPlayOpen,
		activeHintModal,
		isCreateStageOpen,
		isConfirmBulkDeleteOpen,
		navigateToStageSelect,
		navigateToTitle
	]);
	const activeWord = (0, import_react.useMemo)(() => {
		const cell = grid[selectedCell.row]?.[selectedCell.col];
		if (!cell || !cell.isPlayable) return currentPuzzle.words[0] || null;
		const preferredId = activeDirection === "across" ? cell.acrossWordId || cell.downWordId : cell.downWordId || cell.acrossWordId;
		return currentPuzzle.words.find((w) => w.id === preferredId) || currentPuzzle.words[0] || null;
	}, [
		grid,
		selectedCell,
		activeDirection,
		currentPuzzle
	]);
	const activeWordCoords = (0, import_react.useMemo)(() => {
		if (!activeWord) return [];
		return getWordCells(activeWord);
	}, [activeWord]);
	const currentPuzzleSyllables = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		for (const w of currentPuzzle.words) for (const ch of Array.from(w.answer)) set.add(ch);
		return Array.from(set);
	}, [currentPuzzle]);
	const markCurrentStageStarted = (0, import_react.useCallback)(() => {
		setStartedStageIds((prev) => {
			if (prev.includes(currentPuzzle.id)) return prev;
			const updated = [...prev, currentPuzzle.id];
			saveStateToStorage((s) => ({
				...s,
				startedStageIds: updated
			}));
			return updated;
		});
	}, [currentPuzzle.id]);
	const advanceSelectionAfterInput = (0, import_react.useCallback)((nextGrid, currentRow, currentCol) => {
		if (activeWord) {
			const coords = getWordCells(activeWord);
			const currentIndex = coords.findIndex((pos) => pos.row === currentRow && pos.col === currentCol);
			for (let i = currentIndex + 1; i < coords.length; i++) {
				const c = nextGrid[coords[i].row][coords[i].col];
				if (!c.isSolvedLocked && c.userInput !== c.solution) {
					setSelectedCell({
						row: coords[i].row,
						col: coords[i].col
					});
					return;
				}
			}
			for (let i = 0; i < currentIndex; i++) {
				const c = nextGrid[coords[i].row][coords[i].col];
				if (!c.isSolvedLocked && c.userInput !== c.solution) {
					setSelectedCell({
						row: coords[i].row,
						col: coords[i].col
					});
					return;
				}
			}
		}
		const sortedWords = [...currentPuzzle.words].sort((a, b) => (a.number ?? 0) - (b.number ?? 0));
		const currentWordIdx = activeWord ? sortedWords.findIndex((w) => w.id === activeWord.id) : -1;
		for (let offset = 1; offset <= sortedWords.length; offset++) {
			const word = sortedWords[(currentWordIdx + offset + sortedWords.length) % sortedWords.length];
			for (const pos of getWordCells(word)) {
				const c = nextGrid[pos.row][pos.col];
				if (!c.isSolvedLocked && c.userInput !== c.solution) {
					setSelectedCell({
						row: pos.row,
						col: pos.col
					});
					setActiveDirection(word.direction);
					return;
				}
			}
		}
	}, [activeWord, currentPuzzle]);
	const handleCheckPuzzleVictory = (0, import_react.useCallback)((nextGrid, newlyEarnedWordCoins) => {
		if (isPuzzleComplete(nextGrid, currentPuzzle)) {
			soundManager.playStageClear();
			const clearBonus = currentPuzzle.clearReward;
			setCurrency((prev) => prev + newlyEarnedWordCoins + clearBonus);
			setRunWordRewardEarned((prev) => prev + newlyEarnedWordCoins);
			const usedHintsInThisRun = runHintCountsRef.current.letter > 0 || runHintCountsRef.current.word > 0;
			if (currentPuzzle.stageNumber !== void 0) {
				const idx = allStages.findIndex((s) => s.id === currentPuzzle.id);
				setClearedStageIds((prev) => prev.includes(currentPuzzle.id) ? prev : [...prev, currentPuzzle.id]);
				setHintClearedStageIds((prev) => {
					if (usedHintsInThisRun) return prev.includes(currentPuzzle.id) ? prev : [...prev, currentPuzzle.id];
					return prev.filter((id) => id !== currentPuzzle.id);
				});
				if (idx >= 0) {
					setHighestReachedStage((prev) => Math.min(allStages.length - 1, Math.max(prev, idx + 1)));
					const nextStage = allStages[idx + 1];
					if (nextStage) setUnlockedStageIds((prev) => prev.includes(nextStage.id) ? prev : [...prev, nextStage.id]);
				}
			}
			if (timerStartTimestampRef.current !== null) {
				const delta = Math.floor((Date.now() - timerStartTimestampRef.current) / 1e3);
				baseElapsedSecondsRef.current += Math.max(0, delta);
				timerStartTimestampRef.current = null;
			}
			setElapsedSeconds(baseElapsedSecondsRef.current);
			setScreen("gameover");
			return true;
		}
		return false;
	}, [currentPuzzle, allStages]);
	const handleEnterCharacter = (0, import_react.useCallback)((char) => {
		if (screen !== "playing") return;
		const cell = grid[selectedCell.row]?.[selectedCell.col];
		if (!cell || !cell.isPlayable) return;
		let targetRow = selectedCell.row;
		let targetCol = selectedCell.col;
		if (cell.isSolvedLocked && activeWord) {
			const unlocked = getWordCells(activeWord).find((pos) => !grid[pos.row][pos.col].isSolvedLocked);
			if (unlocked) {
				targetRow = unlocked.row;
				targetCol = unlocked.col;
			} else return;
		}
		markCurrentStageStarted();
		const result = applyCellInput(grid, currentPuzzle, solvedWordIds, targetRow, targetCol, char);
		setGrid(result.nextGrid);
		if (result.newlySolvedWords.length > 0) {
			soundManager.playWordComplete();
			const nextSolved = new Set(solvedWordIds);
			result.newlySolvedWords.forEach((w) => nextSolved.add(w.id));
			setSolvedWordIds(nextSolved);
			if (!handleCheckPuzzleVictory(result.nextGrid, result.rewardEarned)) {
				setCurrency((prev) => prev + result.rewardEarned);
				setRunWordRewardEarned((prev) => prev + result.rewardEarned);
				advanceSelectionAfterInput(result.nextGrid, targetRow, targetCol);
			}
		} else if (result.wrongWordsTriggered.length > 0 || !result.isCharCorrect) soundManager.playWrongBuzzer();
		else {
			soundManager.playSnapFit();
			advanceSelectionAfterInput(result.nextGrid, targetRow, targetCol);
		}
	}, [
		screen,
		grid,
		selectedCell,
		activeWord,
		currentPuzzle,
		solvedWordIds,
		markCurrentStageStarted,
		handleCheckPuzzleVictory,
		advanceSelectionAfterInput
	]);
	const handleEnterFullWord = (0, import_react.useCallback)((wordStr) => {
		if (screen !== "playing" || !activeWord) return;
		const chars = Array.from(wordStr.trim());
		if (chars.length === 0) return;
		markCurrentStageStarted();
		const coords = getWordCells(activeWord);
		const selectedIdx = coords.findIndex((pos) => pos.row === selectedCell.row && pos.col === selectedCell.col);
		let startIdx = 0;
		if (chars.length === coords.length) startIdx = 0;
		else if (selectedIdx >= 0 && selectedIdx + chars.length <= coords.length) startIdx = selectedIdx;
		else if (selectedIdx >= 0) startIdx = Math.max(0, coords.length - chars.length);
		let workingGrid = grid;
		const workingSolved = new Set(solvedWordIds);
		let totalReward = 0;
		let anyWrong = false;
		const newlySolvedList = [];
		chars.forEach((ch, offset) => {
			const targetIdx = startIdx + offset;
			if (targetIdx >= coords.length) return;
			const pos = coords[targetIdx];
			if (workingGrid[pos.row][pos.col].isSolvedLocked) return;
			const res = applyCellInput(workingGrid, currentPuzzle, workingSolved, pos.row, pos.col, ch);
			workingGrid = res.nextGrid;
			if (!res.isCharCorrect) anyWrong = true;
			if (res.newlySolvedWords.length > 0) res.newlySolvedWords.forEach((w) => {
				if (!workingSolved.has(w.id)) {
					workingSolved.add(w.id);
					newlySolvedList.push(w);
					totalReward += currentPuzzle.wordReward;
				}
			});
		});
		setGrid(workingGrid);
		setSolvedWordIds(workingSolved);
		const lastFilledPos = coords[Math.min(coords.length - 1, startIdx + chars.length - 1)] || coords[coords.length - 1];
		if (newlySolvedList.length > 0) {
			soundManager.playWordComplete();
			if (!handleCheckPuzzleVictory(workingGrid, totalReward)) {
				setCurrency((prev) => prev + totalReward);
				setRunWordRewardEarned((prev) => prev + totalReward);
				advanceSelectionAfterInput(workingGrid, lastFilledPos.row, lastFilledPos.col);
			}
		} else if (anyWrong) soundManager.playWrongBuzzer();
		else {
			soundManager.playSnapFit();
			advanceSelectionAfterInput(workingGrid, lastFilledPos.row, lastFilledPos.col);
		}
	}, [
		screen,
		activeWord,
		selectedCell,
		grid,
		solvedWordIds,
		currentPuzzle,
		markCurrentStageStarted,
		handleCheckPuzzleVictory,
		advanceSelectionAfterInput
	]);
	const handleClearCurrentCell = (0, import_react.useCallback)(() => {
		const cell = grid[selectedCell.row]?.[selectedCell.col];
		if (!cell || !cell.isPlayable || cell.isSolvedLocked) return;
		setGrid((prev) => prev.map((rowArr, r) => rowArr.map((c, colIdx) => r === selectedCell.row && colIdx === selectedCell.col ? {
			...c,
			userInput: "",
			isWrongAlert: false
		} : c)));
	}, [grid, selectedCell]);
	const handleConfirmLetterHint = () => {
		if (!canAffordHint(currency, "letter")) {
			soundManager.playWrongBuzzer();
			return;
		}
		let targetPos = selectedCell;
		const curCell = grid[targetPos.row]?.[targetPos.col];
		if (!curCell || !curCell.isPlayable || curCell.isSolvedLocked) {
			const fallback = activeWordCoords.find((pos) => !grid[pos.row][pos.col].isSolvedLocked);
			if (!fallback) {
				setActiveHintModal(null);
				return;
			}
			targetPos = fallback;
		}
		const answerChar = grid[targetPos.row][targetPos.col].solution;
		const nextLetterCount = runHintCountsRef.current.letter + 1;
		runHintCountsRef.current.letter = nextLetterCount;
		setRunLetterHintCount(nextLetterCount);
		setCurrency((prev) => prev - 50);
		setActiveHintModal(null);
		handleEnterCharacter(answerChar);
	};
	const handleConfirmWordHint = () => {
		if (!activeWord) return;
		if (!canAffordHint(currency, "word")) {
			soundManager.playWrongBuzzer();
			return;
		}
		if (!getWordCells(activeWord).some((pos) => !grid[pos.row][pos.col].isSolvedLocked)) {
			setActiveHintModal(null);
			return;
		}
		const nextWordCount = runHintCountsRef.current.word + 1;
		runHintCountsRef.current.word = nextWordCount;
		setRunWordHintCount(nextWordCount);
		setCurrency((prev) => prev - 100);
		setActiveHintModal(null);
		handleEnterFullWord(activeWord.answer);
	};
	const handleCellClick = (row, col) => {
		if (hasDraggedRef.current) {
			hasDraggedRef.current = false;
			return;
		}
		const cell = grid[row]?.[col];
		if (!cell || !cell.isPlayable) return;
		soundManager.playSnapFit();
		if (selectedCell.row === row && selectedCell.col === col) {
			if (cell.acrossWordId && cell.downWordId) setActiveDirection((prev) => prev === "across" ? "down" : "across");
		} else {
			setSelectedCell({
				row,
				col
			});
			if (activeDirection === "across" && !cell.acrossWordId && cell.downWordId) setActiveDirection("down");
			else if (activeDirection === "down" && !cell.downWordId && cell.acrossWordId) setActiveDirection("across");
		}
	};
	const handleCycleWord = (delta) => {
		const words = currentPuzzle.words;
		if (words.length === 0) return;
		const nextWord = words[((activeWord ? words.findIndex((w) => w.id === activeWord.id) : 0) + delta + words.length) % words.length];
		setSelectedCell({
			row: nextWord.row,
			col: nextWord.col
		});
		setActiveDirection(nextWord.direction);
		soundManager.playSnapFit();
	};
	const handleSelectWord = (word) => {
		const target = getWordCells(word).find((pos) => {
			const c = grid[pos.row]?.[pos.col];
			return c && !c.isSolvedLocked && c.userInput !== c.solution;
		}) ?? {
			row: word.row,
			col: word.col
		};
		setSelectedCell({
			row: target.row,
			col: target.col
		});
		setActiveDirection(word.direction);
		soundManager.playSnapFit();
	};
	const boardGapPx = 2;
	const boardCellPx = (0, import_react.useMemo)(() => Math.max(42, Math.floor((boardBoxSize - boardGapPx * (currentPuzzle.size - 1)) / currentPuzzle.size)), [boardBoxSize, currentPuzzle.size]);
	const maxPanBound = (0, import_react.useMemo)(() => Math.max(320, Math.ceil(currentPuzzle.size * (boardCellPx + boardGapPx) / 2 * zoomScale)), [
		currentPuzzle.size,
		boardCellPx,
		zoomScale
	]);
	const clampPan = (0, import_react.useCallback)((val) => Math.min(maxPanBound, Math.max(-maxPanBound, val)), [maxPanBound]);
	const zoomScaleRef = (0, import_react.useRef)(zoomScale);
	(0, import_react.useEffect)(() => {
		zoomScaleRef.current = zoomScale;
	}, [zoomScale]);
	(0, import_react.useEffect)(() => {
		if (screen !== "playing") return;
		const scale = zoomScaleRef.current;
		const gridMidIndex = (currentPuzzle.size - 1) / 2;
		const stepPx = boardCellPx + boardGapPx;
		const bound = Math.max(320, Math.ceil(currentPuzzle.size * stepPx / 2 * scale));
		let targetRow = selectedCell.row;
		let targetCol = selectedCell.col;
		if (activeWord) {
			const len = Math.max(1, activeWord.answer.length);
			const wordMidRow = activeWord.row + (activeWord.direction === "down" ? (len - 1) / 2 : 0);
			const wordMidCol = activeWord.col + (activeWord.direction === "across" ? (len - 1) / 2 : 0);
			targetRow = wordMidRow * .65 + selectedCell.row * .35;
			targetCol = wordMidCol * .65 + selectedCell.col * .35;
		}
		const nextX = Math.round(-(targetCol - gridMidIndex) * stepPx * scale);
		const nextY = Math.round(-(targetRow - gridMidIndex) * stepPx * scale);
		setPanOffset({
			x: Math.min(bound, Math.max(-bound, nextX)),
			y: Math.min(bound, Math.max(-bound, nextY))
		});
	}, [
		screen,
		currentPuzzle.id,
		currentPuzzle.size,
		activeWord?.id,
		selectedCell.row,
		selectedCell.col,
		boardCellPx
	]);
	const handleBoardTouchStart = (e) => {
		if (e.touches.length === 2) {
			const dx = e.touches[0].clientX - e.touches[1].clientX;
			const dy = e.touches[0].clientY - e.touches[1].clientY;
			pinchStateRef.current.initialDistance = Math.hypot(dx, dy);
			pinchStateRef.current.initialScale = zoomScale;
			pinchStateRef.current.lastPanPoint = {
				x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
				y: (e.touches[0].clientY + e.touches[1].clientY) / 2
			};
			hasDraggedRef.current = true;
		} else if (e.touches.length === 1) {
			pinchStateRef.current.lastPanPoint = {
				x: e.touches[0].clientX,
				y: e.touches[0].clientY
			};
			pinchStateRef.current.dragDistance = 0;
			hasDraggedRef.current = false;
		}
	};
	const handleBoardTouchMove = (e) => {
		if (e.touches.length === 2 && pinchStateRef.current.initialDistance !== null) {
			e.preventDefault();
			const dx = e.touches[0].clientX - e.touches[1].clientX;
			const dy = e.touches[0].clientY - e.touches[1].clientY;
			const ratio = Math.hypot(dx, dy) / Math.max(10, pinchStateRef.current.initialDistance);
			const nextScale = Math.min(2.5, Math.max(.85, pinchStateRef.current.initialScale * ratio));
			setZoomScale(nextScale);
			const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
			const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
			if (pinchStateRef.current.lastPanPoint) {
				const deltaX = midX - pinchStateRef.current.lastPanPoint.x;
				const deltaY = midY - pinchStateRef.current.lastPanPoint.y;
				setPanOffset((prev) => ({
					x: clampPan(prev.x + deltaX),
					y: clampPan(prev.y + deltaY)
				}));
			}
			pinchStateRef.current.lastPanPoint = {
				x: midX,
				y: midY
			};
		} else if (e.touches.length === 1 && pinchStateRef.current.lastPanPoint) {
			const deltaX = e.touches[0].clientX - pinchStateRef.current.lastPanPoint.x;
			const deltaY = e.touches[0].clientY - pinchStateRef.current.lastPanPoint.y;
			const stepDist = Math.hypot(deltaX, deltaY);
			pinchStateRef.current.dragDistance += stepDist;
			if (pinchStateRef.current.dragDistance > 6) {
				hasDraggedRef.current = true;
				setPanOffset((prev) => ({
					x: clampPan(prev.x + deltaX),
					y: clampPan(prev.y + deltaY)
				}));
			}
			pinchStateRef.current.lastPanPoint = {
				x: e.touches[0].clientX,
				y: e.touches[0].clientY
			};
		}
	};
	const handleBoardTouchEnd = () => {
		pinchStateRef.current.initialDistance = null;
		pinchStateRef.current.lastPanPoint = null;
	};
	const handleBoardMouseDown = (e) => {
		if (e.button !== 0) return;
		pinchStateRef.current.isMouseDown = true;
		pinchStateRef.current.lastPanPoint = {
			x: e.clientX,
			y: e.clientY
		};
		pinchStateRef.current.dragDistance = 0;
		hasDraggedRef.current = false;
	};
	const handleBoardMouseMove = (e) => {
		if (!pinchStateRef.current.isMouseDown || !pinchStateRef.current.lastPanPoint) return;
		const deltaX = e.clientX - pinchStateRef.current.lastPanPoint.x;
		const deltaY = e.clientY - pinchStateRef.current.lastPanPoint.y;
		const stepDist = Math.hypot(deltaX, deltaY);
		pinchStateRef.current.dragDistance += stepDist;
		if (pinchStateRef.current.dragDistance > 6) {
			hasDraggedRef.current = true;
			setPanOffset((prev) => ({
				x: clampPan(prev.x + deltaX),
				y: clampPan(prev.y + deltaY)
			}));
		}
		pinchStateRef.current.lastPanPoint = {
			x: e.clientX,
			y: e.clientY
		};
	};
	const handleBoardMouseUp = () => {
		pinchStateRef.current.isMouseDown = false;
		pinchStateRef.current.lastPanPoint = null;
	};
	const handleBoardWheel = (e) => {
		if (e.ctrlKey || e.metaKey) {
			e.preventDefault();
			setZoomScale((prev) => Math.min(2.5, Math.max(.85, prev - e.deltaY * .005)));
		} else setPanOffset((prev) => ({
			x: clampPan(prev.x - e.deltaX * .6),
			y: clampPan(prev.y - e.deltaY * .6)
		}));
	};
	const currentStageIndex = (0, import_react.useMemo)(() => allStages.findIndex((s) => s.id === currentPuzzle.id), [allStages, currentPuzzle.id]);
	const hasNextStage = currentStageIndex >= 0 && currentStageIndex + 1 < allStages.length;
	const previouslyUsedWords = (0, import_react.useMemo)(() => {
		const used = /* @__PURE__ */ new Set();
		for (const stage of allStages) for (const word of stage.words) if (word.answer) used.add(word.answer.trim());
		return used;
	}, [allStages]);
	const totalStagePages = (0, import_react.useMemo)(() => Math.max(1, Math.ceil((allStages.length + 1) / STAGES_PER_PAGE)), [allStages.length]);
	(0, import_react.useEffect)(() => {
		if (stagePage >= totalStagePages) setStagePage(Math.max(0, totalStagePages - 1));
	}, [stagePage, totalStagePages]);
	const currentPageStages = (0, import_react.useMemo)(() => {
		const start = stagePage * STAGES_PER_PAGE;
		return allStages.slice(start, start + STAGES_PER_PAGE);
	}, [allStages, stagePage]);
	const handleOpenCreateStageModal = () => {
		setCreateGridSize(15);
		setCreateTargetWords(20);
		setIsCreateStageOpen(true);
		soundManager.playSnapFit();
	};
	const handleCreateAndRegisterStage = (playImmediately) => {
		const wordDataList = generateCrosswordWordDataList(nextAutoStageNumber, createGridSize, createTargetWords, previouslyUsedWords);
		const generatedPuzzle = convertWordDataToPuzzle(nextAutoStageNumber, wordDataList, createGridSize);
		const newStageIndex = allStages.length;
		setCustomStages((prev) => {
			const updated = [...prev.filter((p) => p.id !== generatedPuzzle.id), generatedPuzzle];
			saveStateToStorage((s) => ({
				...s,
				customStages: updated
			}));
			return updated;
		});
		setUnlockedStageIds((prev) => prev.includes(generatedPuzzle.id) ? prev : [...prev, generatedPuzzle.id]);
		soundManager.playWordComplete();
		setIsCreateStageOpen(false);
		setStagePage(Math.floor(newStageIndex / STAGES_PER_PAGE));
		if (playImmediately) startPuzzle(generatedPuzzle, true);
	};
	const handleToggleSelectDeleteStage = (stageId) => {
		soundManager.playSnapFit();
		setSelectedDeleteIds((prev) => prev.includes(stageId) ? prev.filter((id) => id !== stageId) : [...prev, stageId]);
	};
	const handleConfirmBulkDeleteStages = () => {
		if (selectedDeleteIds.length === 0) return;
		const toDeleteSet = new Set(selectedDeleteIds);
		setCustomStages((prev) => {
			const updated = prev.filter((s) => !toDeleteSet.has(s.id));
			saveStateToStorage((s) => ({
				...s,
				customStages: updated,
				clearedStageIds: s.clearedStageIds.filter((id) => !toDeleteSet.has(id)),
				hintClearedStageIds: (s.hintClearedStageIds || []).filter((id) => !toDeleteSet.has(id)),
				startedStageIds: (s.startedStageIds || []).filter((id) => !toDeleteSet.has(id)),
				unlockedStageIds: (s.unlockedStageIds || []).filter((id) => !toDeleteSet.has(id)),
				activePuzzle: s.activePuzzle && toDeleteSet.has(s.activePuzzle.puzzleId) ? null : s.activePuzzle
			}));
			return updated;
		});
		setClearedStageIds((prev) => prev.filter((id) => !toDeleteSet.has(id)));
		setHintClearedStageIds((prev) => prev.filter((id) => !toDeleteSet.has(id)));
		setStartedStageIds((prev) => prev.filter((id) => !toDeleteSet.has(id)));
		setUnlockedStageIds((prev) => prev.filter((id) => !toDeleteSet.has(id)));
		if (toDeleteSet.has(currentPuzzle.id)) {
			const fallback = {
				...baseStages[0],
				wordReward: 5
			};
			setCurrentPuzzle(fallback);
			setGrid(buildCrosswordGrid(fallback));
			setSolvedWordIds(/* @__PURE__ */ new Set());
			setHasSavedActiveGame(false);
		}
		soundManager.playSnapFit();
		setSelectedDeleteIds([]);
		setIsConfirmBulkDeleteOpen(false);
		setIsDeleteMode(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `app-viewport h-[100dvh] w-full overflow-hidden flex flex-col transition-colors duration-200 ${isDarkMode ? "bg-[#1C1917] text-[#F5F2EB]" : "bg-[#F7F3E9] text-[#2C2520]"}`,
		children: [
			screen === "title" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative h-full w-full flex flex-col items-center justify-between px-6 pt-1 pb-4 overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full max-w-md md:max-w-2xl flex items-center justify-end shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								soundManager.playSnapFit();
								setIsSettingsOpen(true);
							},
							"aria-label": "설정 열기",
							className: `min-h-[44px] min-w-[44px] px-3.5 rounded-2xl border font-bold text-sm flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shadow-sm ${isDarkMode ? "bg-stone-800 border-stone-700 text-stone-100 hover:bg-stone-700" : "bg-[#EFE9DA] border-[#D5CBB8] text-[#2C2520] hover:bg-[#E4DCC8]"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "설정" })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-10 w-full max-w-xs text-center my-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								viewBox: "0 0 64 64",
								className: "w-20 h-20 shadow-md rounded-2xl",
								role: "img",
								"aria-label": "손글씨 십자말풀이 로고",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										x: "0",
										y: "0",
										width: "64",
										height: "64",
										rx: "16",
										fill: isDarkMode ? "#CE8E54" : "#CC8B52"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										x: "3",
										y: "3",
										width: "58",
										height: "58",
										rx: "13",
										fill: "none",
										stroke: "#FFFDF9",
										strokeWidth: "1.4",
										strokeOpacity: "0.55"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: "32",
										y1: "8",
										x2: "32",
										y2: "56",
										stroke: "#FFFDF9",
										strokeWidth: "2",
										strokeDasharray: "4 4",
										strokeOpacity: "0.7"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: "8",
										y1: "32",
										x2: "56",
										y2: "32",
										stroke: "#FFFDF9",
										strokeWidth: "2",
										strokeDasharray: "4 4",
										strokeOpacity: "0.7"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
										x: "20",
										y: "25",
										textAnchor: "middle",
										fill: "#FFFDF9",
										fontSize: "16",
										fontWeight: "800",
										fontFamily: "IBM Plex Sans KR, sans-serif",
										children: "손"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
										x: "44",
										y: "48",
										textAnchor: "middle",
										fill: "#FFFDF9",
										fontSize: "16",
										fontWeight: "800",
										fontFamily: "IBM Plex Sans KR, sans-serif",
										children: "글"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-4xl font-bold tracking-tight whitespace-nowrap",
								children: "손글씨 십자말풀이"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full flex flex-col gap-2.5",
							children: [
								hasSavedActiveGame && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									"data-resume": "true",
									onClick: () => {
										soundManager.playSnapFit();
										resumeActivePuzzle();
									},
									className: `w-full min-h-[58px] rounded-2xl border font-bold text-xl flex items-center justify-center gap-2.5 shadow-md transition-transform active:scale-95 whitespace-nowrap ${isDarkMode ? "bg-[#CE8E54] border-[#E2A872] text-[#FFFDF9] hover:bg-[#BF8047]" : "bg-[#CC8B52] border-[#B6763E] text-[#FFFDF9] hover:bg-[#BC7C44]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-6 h-6 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "이어서 풀기" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"data-start": "true",
									onClick: () => {
										soundManager.playSnapFit();
										navigateToStageSelect();
									},
									className: `w-full min-h-[52px] rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-transform active:scale-95 whitespace-nowrap ${hasSavedActiveGame ? isDarkMode ? "bg-stone-800 border border-stone-700 text-stone-200 hover:bg-stone-700" : "bg-[#EFE9DA] border border-[#D5CBB8] text-[#2C2520] hover:bg-[#E4DCC8]" : isDarkMode ? "bg-[#CE8E54] border border-[#E2A872] text-[#FFFDF9] hover:bg-[#BF8047] shadow-md" : "bg-[#CC8B52] border border-[#B6763E] text-[#FFFDF9] hover:bg-[#BC7C44] shadow-md"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: hasSavedActiveGame ? "스테이지 목록" : "시작하기" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									"data-testid": "how-to-play-btn",
									onClick: () => {
										soundManager.playSnapFit();
										setIsHowToPlayOpen(true);
									},
									className: `w-full min-h-[48px] rounded-2xl border font-bold text-base flex items-center justify-center gap-2 transition-transform active:scale-95 whitespace-nowrap ${isDarkMode ? "bg-stone-800/80 border-stone-700 text-stone-200 hover:bg-stone-700" : "bg-[#EFE9DA] border-[#D5CBB8] text-[#4A3F35] hover:bg-[#E4DCC8]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "w-5 h-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "게임방법" })]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-4 shrink-0",
						"aria-hidden": "true"
					})
				]
			}),
			screen === "stage_select" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "h-full w-full max-w-md md:max-w-2xl mx-auto px-4 pt-1 pb-2 flex flex-col justify-between overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 shrink-0 w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full flex items-center justify-center gap-1.5 sm:gap-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										soundManager.playSnapFit();
										navigateToTitle();
									},
									"aria-label": "메인화면으로 이동",
									className: `min-h-[44px] px-3 sm:px-3.5 rounded-2xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${isDarkMode ? "bg-stone-800 border-stone-700 text-stone-100 hover:bg-stone-700" : "bg-[#EFE9DA] border-[#D5CBB8] text-[#2C2520] hover:bg-[#E4DCC8]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "w-4 h-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "메인화면" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									"data-testid": "stage-delete-mode-btn",
									onClick: () => {
										soundManager.playSnapFit();
										setIsDeleteMode((prev) => !prev);
										setSelectedDeleteIds([]);
									},
									"aria-label": "스테이지 삭제 모드 전환",
									className: `min-h-[44px] px-3 sm:px-3.5 rounded-2xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${isDeleteMode ? "bg-rose-600 border-rose-500 text-white hover:bg-rose-500" : isDarkMode ? "bg-stone-800 border-stone-700 text-rose-300 hover:bg-stone-700" : "bg-[#EFE9DA] border-[#D5CBB8] text-[#9E3B26] hover:bg-[#E4DCC8]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "스테이지 삭제" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"aria-label": `보유 재화 ${currency} 엽전`,
									className: `min-h-[44px] px-3 sm:px-3.5 rounded-2xl border flex items-center justify-center gap-1.5 font-mono font-bold text-xs sm:text-sm tabular-nums whitespace-nowrap shrink-0 ${isDarkMode ? "bg-stone-900 border-stone-700 text-amber-300" : "bg-[#EFE9DA] border-[#D5CBB8] text-[#7A3E18]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, { className: "w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: currency })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setIsSettingsOpen(true),
									"aria-label": "설정 열기",
									className: `min-h-[44px] px-3 sm:px-3.5 rounded-2xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${isDarkMode ? "bg-stone-800 border-stone-700 text-stone-100 hover:bg-stone-700" : "bg-[#EFE9DA] border-[#D5CBB8] text-[#2C2520] hover:bg-[#E4DCC8]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "w-4 h-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "설정" })]
								})
							]
						}), isDeleteMode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-testid": "delete-mode-bar",
							className: `rounded-2xl border px-3.5 py-2.5 flex items-center justify-between gap-2 transition-colors ${isDarkMode ? "bg-rose-950/40 border-rose-800/70 text-rose-100" : "bg-[#FDF2F0] border-[#E6B8B0] text-[#5C241D]"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs sm:text-sm font-bold truncate",
								children: customStages.length === 0 ? "삭제할 수 있는 내가 만든 스테이지가 없습니다." : `삭제할 스테이지 선택 (${selectedDeleteIds.length}개 선택됨)`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 shrink-0",
								children: [
									customStages.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											soundManager.playSnapFit();
											if (selectedDeleteIds.length === customStages.length) setSelectedDeleteIds([]);
											else setSelectedDeleteIds(customStages.map((cs) => cs.id));
										},
										className: `min-h-[34px] px-2.5 rounded-xl border text-xs font-bold whitespace-nowrap ${isDarkMode ? "bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700" : "bg-white border-[#D5CBB8] text-[#4A3F35] hover:bg-[#F3ECE0]"}`,
										children: selectedDeleteIds.length === customStages.length ? "전체 해제" : "전체 선택"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										"data-testid": "confirm-selected-delete-btn",
										disabled: selectedDeleteIds.length === 0,
										onClick: () => {
											soundManager.playSnapFit();
											setIsConfirmBulkDeleteOpen(true);
										},
										className: "min-h-[34px] px-3 rounded-xl font-bold text-xs bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shadow-xs",
										children: [
											"선택 삭제 (",
											selectedDeleteIds.length,
											")"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											soundManager.playSnapFit();
											setIsDeleteMode(false);
											setSelectedDeleteIds([]);
										},
										className: `min-h-[34px] px-2.5 rounded-xl border text-xs font-bold whitespace-nowrap ${isDarkMode ? "bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700" : "bg-[#EFE9DA] border-[#D5CBB8] text-[#4A3F35] hover:bg-[#E4DCC8]"}`,
										children: "취소"
									})
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 min-h-0 flex flex-col justify-center overflow-y-auto py-2 px-1",
						role: "list",
						"aria-label": "스테이지 목록",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full my-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-4 sm:grid-cols-5 gap-3 p-1",
								children: [currentPageStages.map((stage, pageIdx) => {
									const globalIdx = stagePage * STAGES_PER_PAGE + pageIdx;
									const isCleared = clearedStageIds.includes(stage.id);
									const isHintCleared = isCleared && hintClearedStageIds.includes(stage.id);
									const hasActiveInput = hasSavedActiveGame && currentPuzzle.id === stage.id && grid.some((row) => row.some((c) => c.isPlayable && c.userInput.length > 0));
									const isStarted = startedStageIds.includes(stage.id) || hasActiveInput;
									const isCustom = customStages.some((cs) => cs.id === stage.id);
									const isCurrentActive = hasActiveInput && !isCleared;
									const isSelectedForDelete = selectedDeleteIds.includes(stage.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative aspect-square",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											disabled: isDeleteMode && !isCustom,
											onClick: () => {
												if (isDeleteMode) {
													if (isCustom) handleToggleSelectDeleteStage(stage.id);
													return;
												}
												startPuzzle(stage);
											},
											"aria-label": `${stage.stageNumber ?? globalIdx + 1}단계 ${isCleared ? isHintCleared ? "힌트 사용 완료" : "힌트 없이 완료" : isStarted ? "진행 중" : "미진행"}`,
											className: `w-full h-full rounded-2xl border-2 flex flex-col items-center justify-center relative font-bold transition-all shadow-sm active:scale-95 ${isDeleteMode ? !isCustom ? isDarkMode ? "opacity-25 cursor-not-allowed bg-stone-900 border-stone-800 text-stone-500" : "opacity-25 cursor-not-allowed bg-[#EFE9DA] border-[#D5CBB8] text-[#8C7A6B]" : isSelectedForDelete ? isDarkMode ? "bg-rose-950/75 border-rose-500 text-rose-100 ring-2 ring-rose-500" : "bg-[#FDE8E8] border-rose-600 text-[#991B1B] ring-2 ring-rose-500" : isDarkMode ? "bg-stone-800 border-stone-600 text-stone-100 hover:border-rose-400" : "bg-[#FDFBF7] border-[#B8A990] text-[#2C2520] hover:border-rose-500" : isCleared ? isDarkMode ? "bg-emerald-950/60 border-emerald-500 text-emerald-100 hover:bg-emerald-900/60" : "bg-[#EBF5EF] border-[#2E6F5E] text-[#1E4E42] hover:bg-[#DFEFE6]" : isStarted ? isDarkMode ? "bg-amber-950/45 border-amber-600/70 text-amber-200 hover:bg-amber-900/50" : "bg-[#F4E9D8] border-[#C69C6D] text-[#5C3D24] hover:bg-[#EBDDCA]" : isDarkMode ? "opacity-40 hover:opacity-90 transition-opacity bg-stone-900/60 border-stone-800 text-stone-400 hover:bg-stone-800" : "opacity-40 hover:opacity-90 transition-opacity bg-[#EFE9DA]/60 border-[#D5CBB8] text-[#7A6E60] hover:bg-[#EFE9DA]"}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-2xl sm:text-3xl font-extrabold tracking-tight",
													children: stage.stageNumber ?? globalIdx + 1
												}),
												isCleared && !isHintCleared && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													"data-testid": `stage-clear-badge-${stage.stageNumber ?? globalIdx + 1}`,
													"data-clear-type": "no-hint",
													title: "힌트 없이 클리어",
													className: "absolute top-1.5 left-1.5 w-4 h-4 rounded-full bg-[#2E6F5E] dark:bg-emerald-600 text-white flex items-center justify-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5" })
												}),
												isCleared && isHintCleared && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													"data-testid": `stage-clear-badge-${stage.stageNumber ?? globalIdx + 1}`,
													"data-clear-type": "hint-used",
													title: "힌트 사용하여 클리어",
													className: "absolute top-1.5 left-1.5 w-4 h-4 rounded-full border-[1.75px] border-[#2E6F5E] dark:border-emerald-400 bg-transparent text-[#2E6F5E] dark:text-emerald-400 flex items-center justify-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-2.5 h-2.5 stroke-[3]" })
												}),
												isDeleteMode && isCustom && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: `absolute top-1.5 right-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelectedForDelete ? "bg-rose-600 border-rose-600 text-white" : isDarkMode ? "bg-stone-900/80 border-stone-400 text-transparent" : "bg-white/90 border-[#8C7A6B] text-transparent"}`,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3 h-3 stroke-[3]" })
												}),
												isCurrentActive && !isDeleteMode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-1.5 w-2 h-2 rounded-full bg-[#B87D4B] dark:bg-amber-400 animate-pulse" })
											]
										})
									}, stage.id);
								}), currentPageStages.length < STAGES_PER_PAGE && !isDeleteMode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: handleOpenCreateStageModal,
									"aria-label": "새 스테이지 생성",
									className: `aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-0.5 font-bold transition-all active:scale-95 ${isDarkMode ? "bg-stone-900/70 border-amber-500/70 text-amber-300 hover:bg-stone-800" : "bg-[#EFE9DA]/80 border-[#B6763E] text-[#9E622E] hover:bg-[#E5DEC9]"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-7 h-7 stroke-[2.5]" })
								})]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center gap-3 pt-2 pb-1 shrink-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: stagePage === 0,
								onClick: () => {
									soundManager.playSnapFit();
									setStagePage((p) => Math.max(0, p - 1));
								},
								"aria-label": "이전 페이지",
								className: `min-h-[38px] px-3 rounded-xl border font-bold text-xs flex items-center gap-1 transition-colors disabled:opacity-35 disabled:cursor-not-allowed ${isDarkMode ? "bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700" : "bg-[#EFE9DA] border-[#D5CBB8] text-[#2C2520] hover:bg-[#E4DCC8]"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "이전" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-testid": "stage-page-indicator",
								className: "font-mono font-bold text-xs sm:text-sm tabular-nums px-2",
								children: [
									stagePage + 1,
									" / ",
									totalStagePages,
									" 페이지"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: stagePage >= totalStagePages - 1,
								onClick: () => {
									soundManager.playSnapFit();
									setStagePage((p) => Math.min(totalStagePages - 1, p + 1));
								},
								"aria-label": "다음 페이지",
								className: `min-h-[38px] px-3 rounded-xl border font-bold text-xs flex items-center gap-1 transition-colors disabled:opacity-35 disabled:cursor-not-allowed ${isDarkMode ? "bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700" : "bg-[#EFE9DA] border-[#D5CBB8] text-[#2C2520] hover:bg-[#E4DCC8]"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "다음" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4" })]
							})
						]
					})
				]
			}),
			(screen === "playing" || screen === "gameover") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "h-full w-full max-w-xl md:max-w-7xl mx-auto px-2.5 md:px-4 pt-0.5 pb-1.5 md:py-2 flex flex-col justify-between gap-2 md:gap-3 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `rounded-2xl border px-2 md:px-3.5 py-1.5 md:py-2 flex items-center justify-between gap-1 sm:gap-2 shrink-0 ${isDarkMode ? "bg-stone-900 border-stone-700" : "bg-[#EFE9DA] border-[#D8CEBE]"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								soundManager.playSnapFit();
								navigateToStageSelect();
							},
							"aria-label": "스테이지 선택 화면으로 이동",
							title: "스테이지 목록으로 이동",
							className: `min-h-[38px] min-w-[38px] w-[38px] h-[38px] rounded-xl border flex items-center justify-center transition-colors shrink-0 ${isDarkMode ? "bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700" : "bg-[#FDFBF7] border-[#D5CBB8] text-[#4A3F35] hover:bg-[#F3ECE0]"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-5 h-5 stroke-[2.2]" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-center gap-1.5 sm:gap-2 shrink-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"aria-label": `경과 시간 ${formatTimerMMSS(elapsedSeconds)}`,
									className: `min-h-[38px] px-2.5 sm:px-3 rounded-xl border flex items-center justify-center gap-1 font-mono font-bold text-xs sm:text-sm tabular-nums ${isDarkMode ? "bg-stone-950 border-stone-700 text-stone-100" : "bg-[#FDFBF7] border-[#D5CBB8] text-[#2C2520]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5 text-[#5C4332] dark:text-amber-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-testid": "hud-timer",
										children: formatTimerMMSS(elapsedSeconds)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"aria-label": `보유 재화 ${currency} 엽전`,
									className: `min-h-[38px] px-2.5 sm:px-3 rounded-xl border flex items-center justify-center gap-1 font-mono font-bold text-xs sm:text-sm tabular-nums ${isDarkMode ? "bg-amber-950/60 border-amber-700/80 text-amber-300" : "bg-[#F8EED8] border-[#DFC99F] text-[#7A3E18]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, { className: "w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-testid": "hud-currency",
										children: currency
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: isOffline ? handleAttemptSwitchToHandwriting : inputMode === "handwriting" ? () => setInputMode("typing") : handleAttemptSwitchToHandwriting,
									"aria-label": isOffline ? "손글씨 (오프라인 모드에서는 사용 불가)" : inputMode === "handwriting" ? "키보드 모드로 전환" : "손글씨 모드로 전환",
									title: isOffline ? "오프라인 환경에서는 손글씨 모드를 지원하지 않습니다" : inputMode === "handwriting" ? "키보드로 전환" : "손글씨로 전환",
									className: `min-h-[38px] px-2.5 sm:px-3 rounded-xl border flex items-center justify-center gap-1 text-xs font-bold whitespace-nowrap transition-all active:scale-95 shrink-0 ${isOffline ? "bg-stone-200/90 dark:bg-stone-800/80 border-stone-300 dark:border-stone-700 text-stone-400 dark:text-stone-500 shadow-none" : inputMode === "handwriting" ? isDarkMode ? "bg-[#CE8E54] border-[#E2A872] text-[#FFFDF9]" : "bg-[#CC8B52] border-[#B6763E] text-[#FFFDF9]" : isDarkMode ? "bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700" : "bg-[#FDFBF7] border-[#D5CBB8] text-[#4A3F35] hover:bg-[#F3ECE0]"}`,
									children: isOffline ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenTool, { className: "w-3.5 h-3.5 opacity-40 shrink-0" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden sm:inline opacity-70",
											children: "손글씨"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] px-1 py-0.5 rounded bg-stone-300/80 dark:bg-stone-700/80 text-stone-500 dark:text-stone-400 font-normal",
											children: "오프라인"
										})
									] }) : inputMode === "handwriting" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenTool, { className: "w-3.5 h-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline",
										children: "손글씨"
									})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, { className: "w-3.5 h-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline",
										children: "자판"
									})] })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setIsSettingsOpen(true),
							"aria-label": "설정 열기",
							className: `min-h-[38px] min-w-[38px] w-[38px] h-[38px] rounded-xl border flex items-center justify-center shrink-0 ${isDarkMode ? "bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700" : "bg-[#FDFBF7] border-[#D5CBB8] text-[#4A3F35] hover:bg-[#F3ECE0]"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "w-4 h-4" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-testid": "play-workspace",
					className: `flex-1 min-h-0 grid gap-2 md:gap-3 overflow-hidden ${inputMode === "handwriting" ? "grid-cols-[minmax(0,46%)_minmax(0,54%)] sm:grid-cols-[minmax(0,1fr)_224px] grid-rows-[minmax(0,1fr)_248px] sm:grid-rows-[minmax(0,1fr)_276px] md:grid-cols-[240px_minmax(0,1fr)_310px] lg:grid-cols-[280px_minmax(0,1fr)_350px] md:grid-rows-1" : "grid-cols-[minmax(0,1fr)_144px] sm:grid-cols-[minmax(0,1fr)_164px] grid-rows-[minmax(0,1fr)_140px] sm:grid-rows-[minmax(0,1fr)_152px] md:grid-cols-[240px_minmax(0,1fr)_200px] lg:grid-cols-[280px_minmax(0,1fr)_220px] md:grid-rows-1"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-testid": "hint-panel",
							className: `col-span-1 col-start-1 row-start-2 md:col-start-1 md:row-start-1 h-full min-h-0 min-w-0 rounded-2xl border p-2 md:p-3.5 flex flex-col justify-between gap-1.5 md:gap-2 overflow-hidden ${isDarkMode ? "bg-stone-900 border-stone-700" : "bg-[#EFE9DA] border-[#D8CEBE]"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-1 shrink-0 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-xs md:text-sm font-bold truncate min-w-0 ${isDarkMode ? "text-amber-400" : "text-[#5C4332]"}`,
										children: activeWord ? `${activeWord.number}번 ${activeWord.direction === "across" ? "가로" : "세로"}` : ""
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => handleCycleWord(-1),
											"aria-label": "이전 문제",
											className: `w-7 h-7 md:w-8 md:h-8 rounded-lg border flex items-center justify-center shrink-0 ${isDarkMode ? "bg-stone-800 border-stone-600 text-stone-200 hover:bg-stone-700" : "bg-[#FDFBF7] border-[#C9BCA6] text-[#4A3F35] hover:bg-[#F3ECE0]"}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-3.5 h-3.5 md:w-4 md:h-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => handleCycleWord(1),
											"aria-label": "다음 문제",
											className: `w-7 h-7 md:w-8 md:h-8 rounded-lg border flex items-center justify-center shrink-0 ${isDarkMode ? "bg-stone-800 border-stone-600 text-stone-200 hover:bg-stone-700" : "bg-[#FDFBF7] border-[#C9BCA6] text-[#4A3F35] hover:bg-[#F3ECE0]"}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-3.5 h-3.5 md:w-4 md:h-4" })
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `flex-1 md:flex-none min-h-0 min-w-0 flex items-center py-0.5 md:p-3 md:rounded-xl md:border overflow-y-auto ${isDarkMode ? "md:bg-stone-950/70 md:border-stone-800" : "md:bg-[#FDFBF7] md:border-[#DFD5C3]"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs sm:text-sm md:text-base font-bold leading-snug break-words",
										children: activeWord?.clue
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"aria-label": "전체 힌트 목록",
									className: "hidden md:flex md:flex-col flex-1 min-h-0 overflow-y-auto gap-1.5 pr-1",
									children: [...currentPuzzle.words].sort((a, b) => (a.number ?? 0) - (b.number ?? 0)).map((w) => {
										const isCurrent = activeWord?.id === w.id;
										const isSolved = solvedWordIds.has(w.id);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => handleSelectWord(w),
											className: `w-full text-left rounded-xl border px-2.5 py-2 transition-colors flex flex-col gap-0.5 shrink-0 ${isCurrent ? isDarkMode ? "bg-amber-950/70 border-amber-500 text-amber-100" : "bg-[#F6EBD6] border-[#5C4332] text-[#2C2520]" : isSolved ? isDarkMode ? "bg-emerald-950/35 border-emerald-800/60 text-emerald-300/80" : "bg-[#EBF5EF]/80 border-[#B7D7C8] text-[#2E6F5E]" : isDarkMode ? "bg-stone-950/40 border-stone-800 text-stone-300 hover:bg-stone-800/60" : "bg-[#FAF6EC] border-[#E2D9C8] text-[#4A3F35] hover:bg-[#F3ECE0]"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: `text-[11px] font-extrabold ${isCurrent ? isDarkMode ? "text-amber-300" : "text-[#5C4332]" : isSolved ? isDarkMode ? "text-emerald-400" : "text-[#2E6F5E]" : isDarkMode ? "text-stone-400" : "text-[#8C7A6B]"}`,
													children: [
														w.number,
														"번 ",
														w.direction === "across" ? "가로" : "세로",
														" (",
														w.answer.length,
														"글자)"
													]
												}), isSolved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5 text-[#2E6F5E] dark:text-emerald-400 shrink-0" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-semibold leading-snug line-clamp-2 break-keep",
												children: w.clue
											})]
										}, w.id);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 md:gap-2 shrink-0 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											soundManager.playSnapFit();
											setActiveHintModal("letter");
										},
										"aria-label": "한 글자 힌트 설명 보기",
										className: `w-8 h-8 sm:w-9 sm:h-9 md:flex-1 md:h-10 md:px-2.5 rounded-lg md:rounded-xl border flex items-center justify-center gap-1.5 text-xs font-bold transition-transform active:scale-95 shrink-0 ${isDarkMode ? "bg-stone-800 border-amber-700/70 text-amber-300 hover:bg-stone-700" : "bg-[#FDFBF7] border-[#D4B88C] text-[#8C4A27] hover:bg-[#F7EFE0]"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "w-4 h-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden md:inline whitespace-nowrap",
											children: "글자 힌트"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											soundManager.playSnapFit();
											setActiveHintModal("word");
										},
										"aria-label": "한 단어 힌트 설명 보기",
										className: `w-8 h-8 sm:w-9 sm:h-9 md:flex-1 md:h-10 md:px-2.5 rounded-lg md:rounded-xl border flex items-center justify-center gap-1.5 text-xs font-bold transition-transform active:scale-95 shrink-0 ${isDarkMode ? "bg-amber-900/50 border-amber-500/80 text-amber-200 hover:bg-amber-900/70" : "bg-[#F5E6C8] border-[#C99E5A] text-[#7A3E18] hover:bg-[#EDD9B2]"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden md:inline whitespace-nowrap",
											children: "단어 힌트"
										})]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							ref: boardContainerRef,
							"data-testid": "board-panel",
							onTouchStart: handleBoardTouchStart,
							onTouchMove: handleBoardTouchMove,
							onTouchEnd: handleBoardTouchEnd,
							onTouchCancel: handleBoardTouchEnd,
							onMouseDown: handleBoardMouseDown,
							onMouseMove: handleBoardMouseMove,
							onMouseUp: handleBoardMouseUp,
							onMouseLeave: handleBoardMouseUp,
							onWheel: handleBoardWheel,
							className: `col-span-2 col-start-1 row-start-1 md:col-span-1 md:col-start-2 md:row-start-1 h-full min-h-0 rounded-2xl border flex items-center justify-center overflow-hidden touch-none select-none p-1.5 md:p-3 cursor-grab active:cursor-grabbing ${isDarkMode ? "bg-[#151311] border-stone-800" : "bg-[#EAE3D2] border-[#D5CBB8]"}`,
							children: (() => {
								const gapPx = boardGapPx;
								const cellPx = boardCellPx;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-testid": "crossword-grid",
									style: {
										transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})`,
										transformOrigin: "center center"
									},
									className: "transition-transform duration-200 ease-out",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											display: "grid",
											gridTemplateColumns: `repeat(${currentPuzzle.size}, ${cellPx}px)`,
											gridTemplateRows: `repeat(${currentPuzzle.size}, ${cellPx}px)`,
											gap: `${gapPx}px`
										},
										children: grid.map((rowArr, r) => rowArr.map((cell, c) => {
											const isSelected = selectedCell.row === r && selectedCell.col === c;
											const isInActiveWord = activeWordCoords.some((pos) => pos.row === r && pos.col === c);
											if (!cell.isPlayable) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												"aria-hidden": "true",
												className: `w-full h-full rounded-[6px] ${isDarkMode ? "bg-stone-900/25" : "bg-[#DFD7C5]/35"}`
											}, `${r}-${c}`);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => handleCellClick(r, c),
												"aria-label": `${r + 1}행 ${c + 1}열 칸 ${cell.userInput ? cell.userInput : "빈칸"}`,
												className: `relative w-full h-full rounded-[7px] border-2 flex items-center justify-center font-bold leading-none transition-colors shadow-2xs ${isDarkMode ? "hanji-crosshair-dark" : "hanji-crosshair-light"} ${cell.isWrongAlert ? isDarkMode ? "bg-rose-950/95 border-rose-500 text-rose-200 ring-1 ring-rose-500/70" : "bg-[#FDE8E8] border-[#DC2626] text-[#B91C1C] ring-1 ring-[#DC2626]/50" : cell.isSolvedLocked ? isDarkMode ? "bg-emerald-950/85 border-emerald-500 text-emerald-100" : "bg-[#E6F4EE] border-[#2E6F5E] text-[#17493B]" : isSelected ? isDarkMode ? "bg-amber-900/80 border-amber-400 text-amber-50 ring-2 ring-amber-400 z-10" : "bg-[#F8EDD4] border-[#5C4332] text-[#2C2520] ring-2 ring-[#5C4332] z-10" : isInActiveWord ? isDarkMode ? "bg-stone-800 border-amber-500/80 text-stone-100" : "bg-[#FBF1D8] border-[#C99B68] text-[#2C2520]" : isDarkMode ? "bg-[#282421] border-stone-600 text-stone-100" : "bg-[#FDFBF7] border-[#B8A990] text-[#2C2520]"}`,
												children: [cell.clueNumber !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `absolute top-0.5 left-1 text-[8.5px] sm:text-[9px] font-mono font-bold leading-none pointer-events-none select-none z-10 ${cell.isSolvedLocked ? isDarkMode ? "text-emerald-400" : "text-[#2E6F5E]" : isDarkMode ? "text-amber-400" : "text-[#5C4332]"}`,
													children: cell.clueNumber
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-base sm:text-lg font-black leading-none select-none z-10 pointer-events-none",
													children: cell.userInput
												})]
											}, `${r}-${c}`);
										}))
									})
								});
							})()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-testid": "writing-panel",
							className: `col-span-1 col-start-2 row-start-2 md:col-start-3 md:row-start-1 min-h-0 min-w-0 overflow-hidden ${inputMode === "handwriting" ? "h-full" : "h-full md:h-auto md:self-start"}`,
							children: inputMode === "handwriting" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandwritingPad, {
								selectedCellKey: `${currentPuzzle.id}-${selectedCell.row}-${selectedCell.col}`,
								currentCellInput: grid[selectedCell.row]?.[selectedCell.col]?.userInput || "",
								expectedChar: grid[selectedCell.row]?.[selectedCell.col]?.solution || "",
								isDarkMode,
								autoCommitDelaySec,
								contextSyllables: currentPuzzleSyllables,
								onOfflineDetected: () => triggerOfflineMode(true),
								onSwitchToTyping: () => setInputMode("typing"),
								onSelectCandidate: handleEnterCharacter,
								onClearCell: handleClearCurrentCell
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypingPad, {
								isDarkMode,
								isOffline,
								onAttemptSwitchToHandwriting: handleAttemptSwitchToHandwriting,
								onEnterSingleChar: handleEnterCharacter,
								onEnterFullWord: handleEnterFullWord,
								onClearCell: handleClearCurrentCell
							})
						})
					]
				})]
			}),
			activeHintModal !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-hidden",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "hint-modal-title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `w-full max-w-xs rounded-3xl border p-5 shadow-2xl text-center transition-colors ${isDarkMode ? "bg-stone-900 border-stone-700 text-stone-100" : "bg-[#FAF5E8] border-[#D8CEBE] text-[#2C2520]"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 font-bold text-base",
								children: [activeHintModal === "letter" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "w-5 h-5 text-amber-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-5 h-5 text-[#5C4332] dark:text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									id: "hint-modal-title",
									children: activeHintModal === "letter" ? "한 글자 힌트" : "한 단어 힌트"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setActiveHintModal(null),
								"aria-label": "힌트 설명 닫기",
								className: `w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? "bg-stone-800 text-stone-300" : "bg-[#EAE2D0] text-[#4A3F35]"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `text-sm leading-relaxed mb-4 ${isDarkMode ? "text-stone-300" : "text-[#4A3F35]"}`,
							children: activeHintModal === "letter" ? "현재 선택된 칸의 정답 글자 1개를 바로 공개합니다." : "현재 선택된 가로 또는 세로 한 줄(한 단어) 전체를 바로 공개합니다."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setActiveHintModal(null),
								className: `min-h-[44px] rounded-xl border font-bold text-sm ${isDarkMode ? "bg-stone-800 border-stone-700 text-stone-300" : "bg-[#EFE9DA] border-[#D5CBB8] text-[#4A3F35]"}`,
								children: "취소"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: activeHintModal === "letter" ? handleConfirmLetterHint : handleConfirmWordHint,
								className: `min-h-[44px] rounded-xl font-bold text-sm flex items-center justify-center gap-1 ${isDarkMode ? "bg-[#CE8E54] text-[#FFFDF9] hover:bg-[#BF8047]" : "bg-[#CC8B52] text-[#FFFDF9] hover:bg-[#BC7C44]"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [activeHintModal === "letter" ? 50 : 100, " 사용"] })]
							})]
						})
					]
				})
			}),
			isCreateStageOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-hidden",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "create-stage-modal-title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `w-full max-w-sm rounded-3xl border p-5 shadow-2xl transition-colors ${isDarkMode ? "bg-stone-900 border-stone-700 text-stone-100" : "bg-[#FAF5E8] border-[#D8CEBE] text-[#2C2520]"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 font-bold text-base",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-5 h-5 text-[#5C4332] dark:text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									id: "create-stage-modal-title",
									children: "새 스테이지 생성"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setIsCreateStageOpen(false),
								"aria-label": "스테이지 생성 모달 닫기",
								className: `w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? "bg-stone-800 text-stone-300" : "bg-[#EAE2D0] text-[#4A3F35]"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 mb-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `p-3 rounded-2xl border flex items-center justify-between ${isDarkMode ? "bg-stone-950/80 border-stone-800" : "bg-[#FDFBF7] border-[#D5CBB8]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold opacity-80",
										children: "스테이지 번호"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono text-base font-extrabold text-[#5C4332] dark:text-amber-400",
										children: [nextAutoStageNumber, "단계"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `p-3 rounded-2xl border flex items-center justify-between ${isDarkMode ? "bg-stone-950/80 border-stone-800" : "bg-[#FDFBF7] border-[#D5CBB8]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-bold opacity-80",
										children: "격자 크기"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] opacity-60",
										children: "가로 × 세로 칸 수"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setCreateGridSize((s) => Math.max(10, s - 1)),
												disabled: createGridSize <= 10,
												"aria-label": "격자 크기 1 감소",
												className: `w-9 h-9 rounded-xl border font-black text-lg flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${isDarkMode ? "bg-stone-800 border-stone-600 text-stone-100 hover:bg-stone-700 active:scale-95" : "bg-[#F3ECE0] border-[#D5CBB8] text-[#2C2520] hover:bg-[#EAE2D0] active:scale-95"}`,
												children: "-"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "w-14 text-center font-bold text-sm font-mono tabular-nums",
												children: [
													createGridSize,
													" × ",
													createGridSize
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setCreateGridSize((s) => Math.min(15, s + 1)),
												disabled: createGridSize >= 15,
												"aria-label": "격자 크기 1 증가",
												className: `w-9 h-9 rounded-xl border font-black text-lg flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${isDarkMode ? "bg-stone-800 border-stone-600 text-stone-100 hover:bg-stone-700 active:scale-95" : "bg-[#F3ECE0] border-[#D5CBB8] text-[#2C2520] hover:bg-[#EAE2D0] active:scale-95"}`,
												children: "+"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `p-3 rounded-2xl border flex items-center justify-between ${isDarkMode ? "bg-stone-950/80 border-stone-800" : "bg-[#FDFBF7] border-[#D5CBB8]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-bold opacity-80",
										children: "단어 수"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] opacity-60",
										children: "스테이지 당 목표 단어"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setCreateTargetWords((w) => Math.max(10, w - 1)),
												disabled: createTargetWords <= 10,
												"aria-label": "단어 수 1 감소",
												className: `w-9 h-9 rounded-xl border font-black text-lg flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${isDarkMode ? "bg-stone-800 border-stone-600 text-stone-100 hover:bg-stone-700 active:scale-95" : "bg-[#F3ECE0] border-[#D5CBB8] text-[#2C2520] hover:bg-[#EAE2D0] active:scale-95"}`,
												children: "-"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "w-14 text-center font-bold text-sm font-mono tabular-nums",
												children: [createTargetWords, "개"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setCreateTargetWords((w) => Math.min(25, w + 1)),
												disabled: createTargetWords >= 25,
												"aria-label": "단어 수 1 증가",
												className: `w-9 h-9 rounded-xl border font-black text-lg flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${isDarkMode ? "bg-stone-800 border-stone-600 text-stone-100 hover:bg-stone-700 active:scale-95" : "bg-[#F3ECE0] border-[#D5CBB8] text-[#2C2520] hover:bg-[#EAE2D0] active:scale-95"}`,
												children: "+"
											})
										]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => handleCreateAndRegisterStage(false),
								className: `min-h-[44px] rounded-xl border font-bold text-sm ${isDarkMode ? "bg-stone-800 border-stone-700 text-stone-100 hover:bg-stone-700" : "bg-[#EFE9DA] border-[#D5CBB8] text-[#2C2520] hover:bg-[#E4DCC8]"}`,
								children: "목록에 추가"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => handleCreateAndRegisterStage(true),
								className: `min-h-[44px] rounded-xl font-bold text-sm flex items-center justify-center gap-1 ${isDarkMode ? "bg-[#CE8E54] text-[#FFFDF9] hover:bg-[#BF8047]" : "bg-[#CC8B52] text-[#FFFDF9] hover:bg-[#BC7C44]"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "추가 후 시작" })
							})]
						})
					]
				})
			}),
			isConfirmBulkDeleteOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-hidden",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "delete-stage-modal-title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `w-full max-w-xs rounded-3xl border p-5 shadow-2xl text-center transition-colors ${isDarkMode ? "bg-stone-900 border-stone-700 text-stone-100" : "bg-[#F8F3E6] border-[#D8CEBE] text-[#2C2520]"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							id: "delete-stage-modal-title",
							className: "text-base font-bold mb-2",
							children: "선택한 스테이지 삭제"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm opacity-80 mb-5 break-keep",
							children: [
								"선택한",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									className: "text-rose-600 dark:text-rose-400",
									children: [selectedDeleteIds.length, "개"]
								}),
								"의 내가 만든 스테이지를 정말 삭제하시겠습니까? 삭제된 스테이지는 복구할 수 없습니다."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setIsConfirmBulkDeleteOpen(false),
								className: `min-h-[44px] rounded-xl border font-bold text-sm ${isDarkMode ? "bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700" : "bg-[#EFE9DA] border-[#D5CBB8] text-[#2C2520] hover:bg-[#E4DCC8]"}`,
								children: "취소"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleConfirmBulkDeleteStages,
								className: "min-h-[44px] rounded-xl font-bold text-sm bg-rose-600 text-white hover:bg-rose-700 active:scale-95 shadow-md",
								children: "삭제"
							})]
						})
					]
				})
			}),
			isHowToPlayOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 overflow-hidden",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "how-to-play-modal-title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `w-full max-w-md rounded-3xl border p-5 shadow-2xl transition-colors flex flex-col max-h-[85dvh] ${isDarkMode ? "bg-stone-900 border-stone-700 text-stone-100" : "bg-[#FAF5E8] border-[#D8CEBE] text-[#2C2520]"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-3 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 font-bold text-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "w-5 h-5 text-[#5C4332] dark:text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									id: "how-to-play-modal-title",
									children: "게임방법"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setIsHowToPlayOpen(false),
								"aria-label": "게임방법 닫기",
								className: `w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? "bg-stone-800 text-stone-300" : "bg-[#EAE2D0] text-[#4A3F35]"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 overflow-y-auto pr-1 text-left text-xs sm:text-sm leading-relaxed",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `rounded-2xl border p-3.5 ${isDarkMode ? "bg-stone-950/70 border-stone-800" : "bg-[#FDFBF7] border-[#E2D9C8]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-sm mb-1 text-[#5C4332] dark:text-amber-400",
										children: "1. 십자말풀이 규칙"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "opacity-90 break-keep",
										children: [
											"칸을 눌러 가로·세로 문제 설명을 확인하고 정답 단어를 채워 넣으세요. 한 단어를 완성할 때마다 ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "5코인" }),
											"을 획득하고 다음 번호의 단어로 자동 이동합니다."
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `rounded-2xl border p-3.5 ${isDarkMode ? "bg-stone-950/70 border-stone-800" : "bg-[#FDFBF7] border-[#E2D9C8]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-sm mb-1 text-[#5C4332] dark:text-amber-400",
										children: "2. 손글씨 & 키보드 입력"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "opacity-90 break-keep",
										children: [
											"필기 영역에 한글 한 글자를 직접 쓰면 자동으로 인식되어 칸에 입력됩니다. ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "설정" }),
											"에서 손글씨 자동 입력 대기 시간(기본 1.5초)을 조절하거나 ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "키보드 타이핑 모드" }),
											"로 전환할 수 있습니다."
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `rounded-2xl border p-3.5 ${isDarkMode ? "bg-stone-950/70 border-stone-800" : "bg-[#FDFBF7] border-[#E2D9C8]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-sm mb-1 text-[#5C4332] dark:text-amber-400",
										children: "3. 힌트와 클리어 표시"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "opacity-90 break-keep",
										children: [
											"어려운 문제는 코인을 사용해 ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
												"한 글자 힌트(",
												50,
												"코인)"
											] }),
											" 또는 ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
												"한 단어 힌트(",
												100,
												"코인)"
											] }),
											"를 쓸 수 있습니다. 힌트를 쓰지 않고 풀면 스테이지에 ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "색이 채워진 체크 원" }),
											"이, 힌트를 사용해서 풀면 ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "안쪽이 빈 동그라미 체크" }),
											"가 표시됩니다."
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `rounded-2xl border p-3.5 ${isDarkMode ? "bg-stone-950/70 border-stone-800" : "bg-[#FDFBF7] border-[#E2D9C8]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-sm mb-1 text-[#5C4332] dark:text-amber-400",
										children: "4. 나만의 스테이지 생성 & 선택 삭제"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "opacity-90 break-keep",
										children: [
											"스테이지 목록의 ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "+" }),
											" 버튼으로 격자 크기와 단어 수를 정해 새 스테이지를 만들 수 있으며, ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "격자 크기가 클수록 긴 단어가 나올 확률이 높아집니다." }),
											" 상단의 ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "스테이지 삭제" }),
											" 버튼으로 직접 만든 스테이지를 선택하여 삭제할 수 있습니다."
										]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setIsHowToPlayOpen(false),
							className: `mt-4 w-full min-h-[46px] rounded-2xl font-bold text-sm shrink-0 ${isDarkMode ? "bg-[#CE8E54] text-[#FFFDF9] hover:bg-[#BF8047]" : "bg-[#CC8B52] text-[#FFFDF9] hover:bg-[#BC7C44]"}`,
							children: "확인"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageClearModal, {
				isOpen: screen === "gameover",
				isDarkMode,
				puzzleTitle: currentPuzzle.title,
				elapsedSeconds,
				wordRewardTotal: runWordRewardEarned,
				clearBonus: currentPuzzle.clearReward,
				letterHintCount: runLetterHintCount,
				wordHintCount: runWordHintCount,
				hasNextStage,
				onNextStage: () => {
					if (hasNextStage) startPuzzle(allStages[currentStageIndex + 1], true);
				},
				onReplay: () => startPuzzle(currentPuzzle, true),
				onGoStageSelect: () => navigateToStageSelect()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsModal, {
				isOpen: isSettingsOpen,
				inputMode,
				autoCommitDelaySec,
				bgmEnabled,
				sfxEnabled,
				isDarkMode,
				isOffline,
				onAttemptOfflineHandwriting: handleAttemptSwitchToHandwriting,
				onChangeInputMode: (mode) => {
					if (mode === "handwriting") {
						handleAttemptSwitchToHandwriting();
						return;
					}
					setInputMode(mode);
				},
				onChangeAutoCommitDelay: (sec) => {
					setAutoCommitDelaySec(sec);
					saveStateToStorage((prev) => ({
						...prev,
						settings: {
							...prev.settings,
							autoCommitDelaySec: sec
						}
					}));
				},
				onToggleBgm: () => setBgmEnabled((b) => !b),
				onToggleSfx: () => setSfxEnabled((s) => !s),
				onToggleDarkMode: () => setIsDarkMode((d) => !d),
				onClose: () => setIsSettingsOpen(false)
			}),
			isOfflineNoticeOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-testid": "offline-notice-modal",
				className: "fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs select-none",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "offline-notice-title",
				onClick: () => setIsOfflineNoticeOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `w-full max-w-[340px] rounded-3xl border-2 p-5 sm:p-6 shadow-2xl text-center transition-all transform animate-in fade-in zoom-in-95 duration-150 ${isDarkMode ? "bg-[#211E1B] border-stone-700 text-[#F5F2EB]" : "bg-[#FAF5E8] border-[#D8CEBE] text-[#2C2520]"}`,
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mx-auto w-14 h-14 mb-3.5 flex items-center justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-2xl bg-rose-500/15 animate-ping opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-600 dark:text-rose-400 shadow-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "w-7 h-7 stroke-[2.2]" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-tight bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/25 mb-2",
							children: "네트워크 연결 끊김"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							id: "offline-notice-title",
							className: "text-lg font-black tracking-tight mb-2 leading-snug",
							children: [
								"오프라인 환경에서는",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"손글씨 모드를 지원하지 않습니다"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: `text-xs sm:text-sm leading-relaxed mb-5 px-1 font-medium ${isDarkMode ? "text-stone-300" : "text-[#5C4E41]"}`,
							children: [
								"현재 오프라인 상태이므로 손글씨 인식을 사용할 수 없습니다.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-amber-600 dark:text-amber-400",
									children: "키보드(타이핑) 입력 모드"
								}),
								"로 자동 전환되었습니다.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] opacity-75 mt-1 block",
									children: "인터넷에 다시 연결되면 손글씨 모드를 사용하실 수 있습니다."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"data-testid": "offline-notice-confirm-btn",
							onClick: () => {
								soundManager.playSnapFit();
								setIsOfflineNoticeOpen(false);
							},
							className: `w-full min-h-[48px] rounded-2xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md border ${isDarkMode ? "bg-[#CE8E54] border-[#E2A872] text-[#FFFDF9] hover:bg-[#BF8047]" : "bg-[#CC8B52] border-[#B6763E] text-[#FFFDF9] hover:bg-[#BC7C44]"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "확인 (키보드로 계속하기)" })
						})
					]
				})
			})
		]
	});
}
// src/main.tsx
if (typeof window !== "undefined") window.__ONGEUL_BOOTED__ = true;
var RootErrorBoundary = class extends import_react.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			retried: false
		};
	}
	static getDerivedStateFromError() {
		return { hasError: true };
	}
	componentDidCatch(error) {
		console.error("Root render error:", error);
		if (!this.state.retried && typeof window !== "undefined") {
			try {
				const raw = window.localStorage?.getItem("ongeul_crossword_save_v5");
				if (raw) {
					const parsed = JSON.parse(raw);
					if (parsed && typeof parsed === "object") {
						parsed.activePuzzle = null;
						window.localStorage?.setItem("ongeul_crossword_save_v5", JSON.stringify(parsed));
					}
				}
			} catch {
				try {
					window.localStorage?.removeItem("ongeul_crossword_save_v5");
				} catch {}
			}
			this.setState({
				hasError: false,
				retried: true
			});
		}
	}
	render() {
		if (this.state.hasError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {});
		return this.props.children;
	}
};
function mountApplication() {
	if (typeof window === "undefined" || typeof document === "undefined") return;
	if (window.__ONGEUL_ROOT_MOUNTED__) return;
	let rootEl = document.getElementById("root");
	if (!rootEl) {
		if (document.readyState === "loading") {
			window.addEventListener("DOMContentLoaded", mountApplication, { once: true });
			return;
		}
		if (document.body) {
			rootEl = document.createElement("div");
			rootEl.id = "root";
			document.body.appendChild(rootEl);
		} else return;
	}
	window.__ONGEUL_ROOT_MOUNTED__ = true;
	(0, import_client.createRoot)(rootEl).render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RootErrorBoundary, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {}) }));
}
mountApplication();

})();
