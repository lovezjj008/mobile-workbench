/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @license MIT
 */


(function (factory) {
	"use strict";

	if (typeof define === "function" && define.amd) {
		define(factory);
	}
	else if (typeof module != "undefined" && typeof module.exports != "undefined") {
		module.exports = factory();
	}
	else if (typeof Package !== "undefined") {
		Sortable = factory();  // export for Meteor.js
	}
	else {
		/* jshint sub:true */
		window["Sortable"] = factory();
	}
})(function () {
	"use strict";

	var dragEl,
		startIndex,
		ghostEl,
		cloneEl,
		rootEl,
		scrollEl,
		nextEl,

		lastEl,
		lastCSS,

		activeGroup,
		autoScroll = {},

		tapEvt,
		touchEvt,

		expando = 'Sortable' + (new Date).getTime(),

		win = window,
		document = win.document,
		parseInt = win.parseInt,
		supportIEdnd = !!document.createElement('div').dragDrop,

		_silent = false,

		_dispatchEvent = function (rootEl, name, targetEl, fromEl, startIndex, newIndex) {
			var evt = document.createEvent('Event');

			evt.initEvent(name, true, true);

			evt.item = targetEl || rootEl;
			evt.from = fromEl || rootEl;

			evt.oldIndex = startIndex;
			evt.newIndex = newIndex;

			//rootEl.dispatchEvent(evt);
		},

		_customEvents = 'onAdd onUpdate onRemove onStart onEnd onFilter onSort'.split(' '),

		noop = function () {},

		abs = Math.abs,
		slice = [].slice,

		touchDragOverListeners = []
	;



	/**
	 * @class  Sortable
	 * @param  {HTMLElement}  el
	 * @param  {Object}       [options]
	 */
	function Sortable(el, options) {
		this.el = el; // root element
		this.options = options = (options || {});


		// Default options
		var defaults = {
			group: Math.random(),
			sort: true,
			disabled: false,
			store: null,
			handle: null,
			scroll: true,
			scrollSensitivity: 30,
			scrollSpeed: 10,
			draggable: /[uo]l/i.test(el.nodeName) ? 'li' : '>*',
			ghostClass: 'sortable-ghost',
			ignore: 'a, img',
			filter: null,
			animation: 150,
			delay : 600,
			startTime : 0,
			endTime : 0,
			startX : 0,
			startY : 0,
			endX : 0,
			endY : 0,
			setData: function (dataTransfer, dragEl) {
				dataTransfer.setData('Text', dragEl.textContent);
			}
		};


		// Set default options
		for (var name in defaults) {
			!(name in options) && (options[name] = defaults[name]);
		}


		var group = options.group;

		if (!group || typeof group != 'object') {
			group = options.group = { name: group };
		}


		['pull', 'put'].forEach(function (key) {
			if (!(key in group)) {
				group[key] = true;
			}
		});


		// Define events
		_customEvents.forEach(function (name) {
			options[name] = _bind(this, options[name] || noop);
			_on(el, name.substr(2).toLowerCase(), options[name]);
		}, this);


		// Export group name
		el[expando] = group.name + ' ' + (group.put.join ? group.put.join(' ') : '');


		// Bind all private methods
		for (var fn in this) {
			if (fn.charAt(0) === '_') {
				this[fn] = _bind(this, this[fn]);
			}
		}


		// Bind events
		_on(el, 'mousedown', this._onTapStart);
		_on(el, 'touchstart', this._onTapStart);
		supportIEdnd && _on(el, 'selectstart', this._onTapStart);

		_on(el, 'dragover', this._onDragOver);
		_on(el, 'dragenter', this._onDragOver);

		touchDragOverListeners.push(this._onDragOver);

		// Restore sorting
		options.store && this.sort(options.store.get(this));
	}


	Sortable.prototype = /** @lends Sortable.prototype */ {
		constructor: Sortable,


		_dragStarted: function () {
			// Apply effect
			_toggleClass(dragEl, this.options.ghostClass, true);

			Sortable.active = this;

			// Drag start event
			_dispatchEvent(rootEl, 'start', dragEl, rootEl, startIndex);
		},


		_onTapStart: function (/**Event|TouchEvent*/evt) {

			var type = evt.type,
				touch = evt.touches && evt.touches[0],
				target = (touch || evt).target,
				originalTarget = target,
				options =  this.options,
				el = this.el,
				that = this,
				filter = options.filter;

			options.startTime = new Date().getTime();
			options.startX = touch ? touch.pageX:null;
			options.startY = touch?touch.pageY:null;
			if (type === 'mousedown' && evt.button !== 0 || options.disabled) {
				return; // only left button or enabled
			}

			if (options.handle) {
				target = _closest(target, options.handle, el);
			}

			target = _closest(target, options.draggable, el);

			// get the index of the dragged element within its parent
			startIndex = _index(target);

			// Check filter
			if (typeof filter === 'function') {
				if (filter.call(this, evt, target, this)) {
					_dispatchEvent(originalTarget, 'filter', target, el, startIndex);
					evt.preventDefault();
					return; // cancel dnd
				}
			}
			else if (filter) {
				filter = filter.split(',').some(function (criteria) {
					criteria = _closest(originalTarget, criteria.trim(), el);

					if (criteria) {
						_dispatchEvent(criteria, 'filter', target, el, startIndex);
						return true;
					}
				});

				if (filter) {
					evt.preventDefault();
					return; // cancel dnd
				}
			}

			// Prepare `dragstart`
			if (target && !dragEl && (target.parentNode === el)) {
				// IE 9 Support
				(type === 'selectstart') && target.dragDrop();

				tapEvt = evt;

				rootEl = this.el;
				dragEl = target;
				nextEl = dragEl.nextSibling;
				activeGroup = this.options.group;

				dragEl.draggable = true;

				// Disable "draggable"
				options.ignore.split(',').forEach(function (criteria) {
					_find(target, criteria.trim(), _disableDraggable);
				});

				if (touch) {
					// Touch device support
					tapEvt = {
						target: target,
						clientX: touch.clientX,
						clientY: touch.clientY + $(document).scrollTop()
					};

					this._onDragStart(tapEvt, true);
					//evt.preventDefault();
				}

				_on(document, 'mouseup', this._onDrop);
				_on(document, 'touchend', this._onDrop);
				_on(document, 'touchcancel', this._onDrop);

				_on(dragEl, 'dragend', this);
				_on(rootEl, 'dragstart', this._onDragStart);

				_on(document, 'dragover', this);


				try {
					if (document.selection) {
						document.selection.empty();
					} else {
						window.getSelection().removeAllRanges();
					}
				} catch (err) {
				}


				if (activeGroup.pull == 'clone') {
					cloneEl = dragEl.cloneNode(true);
					_css(cloneEl, 'display', 'none');
					rootEl.insertBefore(cloneEl, dragEl);
				}
			}
		},

		_emulateDragOver: function () {
			if (touchEvt) {
				_css(ghostEl, 'display', 'none');

				var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY),
					parent = target,
					groupName = this.options.group.name,
					i = touchDragOverListeners.length;

				if (parent) {
					do {
						if ((' ' + parent[expando] + ' ').indexOf(groupName) > -1) {
							while (i--) {
								touchDragOverListeners[i]({
									clientX: touchEvt.clientX,
									clientY: touchEvt.clientY + $(document).scrollTop(),
									target: target,
									rootEl: parent
								});
							}

							break;
						}

						target = parent; // store last element
					}
					/* jshint boss:true */
					while (parent = parent.parentNode);
				}

				_css(ghostEl, 'display', '');
			}
		},


		_onTouchMove: function (/**TouchEvent*/evt) {
			if (tapEvt) {
				var touch = evt.touches[0],
					dx = touch.clientX - tapEvt.clientX,
					dy = touch.clientY - tapEvt.clientY + $(document).scrollTop(),
					translate3d = 'translate3d(' + dx + 'px,' + dy + 'px,0)';

				touchEvt = touch;

				_css(ghostEl, 'webkitTransform', translate3d);
				_css(ghostEl, 'mozTransform', translate3d);
				_css(ghostEl, 'msTransform', translate3d);
				_css(ghostEl, 'transform', translate3d);

				this._onDrag(touch);
				evt.preventDefault();
			}
		},


		_onDragStart: function (/**Event*/evt, /**boolean*/isTouch) {
			var dataTransfer = evt.dataTransfer,
				options = this.options;

			this._offUpEvents();
			var _this = this;
			if (isTouch) {
				var rect = dragEl.getBoundingClientRect(),
					css = _css(dragEl),
					ghostRect;

				ghostEl = dragEl.cloneNode(true);

				_css(ghostEl, 'top', rect.top +　$(document).scrollTop() - parseInt(css.marginTop, 10));
				_css(ghostEl, 'left', rect.left - parseInt(css.marginLeft, 10));
				_css(ghostEl, 'width', rect.width);
				_css(ghostEl, 'height', rect.height);
				_css(ghostEl, 'opacity', '0.5');
				_css(ghostEl, 'position', 'fixed');
				_css(ghostEl, 'zIndex', '100000');

				rootEl.appendChild(ghostEl);

				// Fixing dimensions.
				ghostRect = ghostEl.getBoundingClientRect();
				_css(ghostEl, 'width', rect.width * 2 - ghostRect.width);
				_css(ghostEl, 'height', rect.height * 2 - ghostRect.height);

				// Bind touch events
				this.delayTime = setTimeout(function(){
					$(".um-small").addClass("um-dragli")
					_on(document, 'touchmove', _this._onTouchMove);
					_on(document, 'touchend', _this._onDrop);
					_on(document, 'touchcancel', _this._onDrop);

				},options.delay)

				this._loopId = setInterval(this._emulateDragOver, 150);
			}
			else {
				dataTransfer.effectAllowed = 'move';
				options.setData && options.setData.call(this, dataTransfer, dragEl);

				_on(document, 'drop', this);
			}

			scrollEl = options.scroll;

			if (scrollEl === true) {
				scrollEl = rootEl;

				do {
					if ((scrollEl.offsetWidth < scrollEl.scrollWidth) ||
						(scrollEl.offsetHeight < scrollEl.scrollHeight)
					) {
						break;
					}
				/* jshint boss:true */
				} while (scrollEl = scrollEl.parentNode);
			}

			setTimeout(this._dragStarted, 0);
		},

		_onDrag: _throttle(function (/**Event*/evt) {
			// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
			if (rootEl && this.options.scroll) {
				var el,
					rect,
					options = this.options,
					sens = options.scrollSensitivity,
					speed = options.scrollSpeed,

					x = evt.clientX,
					y = evt.clientY + $(document).scrollTop(),

					winWidth = window.innerWidth,
					winHeight = window.innerHeight,

					vx = (winWidth - x <= sens) - (x <= sens),
					vy = (winHeight - y <= sens) - (y <= sens)
				;

				if (vx || vy) {
					el = win;
				}
				else if (scrollEl) {
					el = scrollEl;
					rect = scrollEl.getBoundingClientRect();
					vx = (abs(rect.right - x) <= sens) - (abs(rect.left - x) <= sens);
					vy = (abs(rect.bottom - y) <= sens) - (abs(rect.top - y) <= sens);
				}

				if (autoScroll.vx !== vx || autoScroll.vy !== vy || autoScroll.el !== el) {
					autoScroll.el = el;
					autoScroll.vx = vx;
					autoScroll.vy = vy;

					clearInterval(autoScroll.pid);

					if (el) {
						autoScroll.pid = setInterval(function () {
							if (el === win) {
								win.scrollTo(win.scrollX + vx * speed, win.scrollY + vy * speed);
							} else {
								vy && (el.scrollTop += vy * speed);
								vx && (el.scrollLeft += vx * speed);
							}
						}, 24);
					}
				}
			}
		}, 30),


		_onDragOver: function (/**Event*/evt) {
			var el = this.el,
				target,
				dragRect,
				revert,
				options = this.options,
				group = options.group,
				groupPut = group.put,
				isOwner = (activeGroup === group),
				canSort = options.sort;

			if (evt.preventDefault !== void 0) {
				evt.preventDefault();
				evt.stopPropagation();
			}

			if (!_silent && activeGroup &&
				(isOwner
					? canSort || (revert = !rootEl.contains(dragEl))
					: activeGroup.pull && groupPut && (
						(activeGroup.name === group.name) || // by Name
						(groupPut.indexOf && ~groupPut.indexOf(activeGroup.name)) // by Array
					)
				) &&
				(evt.rootEl === void 0 || evt.rootEl === this.el)
			) {
				target = _closest(evt.target, options.draggable, el);
				dragRect = dragEl.getBoundingClientRect();


				if (revert) {
					_cloneHide(true);

					if (cloneEl || nextEl) {
						rootEl.insertBefore(dragEl, cloneEl || nextEl);
					}
					else if (!canSort) {
						rootEl.appendChild(dragEl);
					}

					return;
				}


				if ((el.children.length === 0) || (el.children[0] === ghostEl) ||
					(el === evt.target) && (target = _ghostInBottom(el, evt))
				) {
					if (target) {
						if (target.animated) {
							return;
						}
						targetRect = target.getBoundingClientRect();
					}

					_cloneHide(isOwner);

					el.appendChild(dragEl);
					this._animate(dragRect, dragEl);
					target && this._animate(targetRect, target);
				}
				else if (target && !target.animated && target !== dragEl && (target.parentNode[expando] !== void 0)) {
					if (lastEl !== target) {
						lastEl = target;
						lastCSS = _css(target);
					}


					var targetRect = target.getBoundingClientRect(),
						width = targetRect.right - targetRect.left,
						height = targetRect.bottom - targetRect.top,
						floating = /left|right|inline/.test(lastCSS.cssFloat + lastCSS.display),
						isWide = (target.offsetWidth > dragEl.offsetWidth),
						isLong = (target.offsetHeight > dragEl.offsetHeight),
						halfway = (floating ? (evt.clientX - targetRect.left) / width : (evt.clientY - targetRect.top) / height) > 0.5,
						nextSibling = target.nextElementSibling,
						after
					;

					_silent = true;
					setTimeout(_unsilent, 30);

					_cloneHide(isOwner);

					if (floating) {
						after = (target.previousElementSibling === dragEl) && !isWide || halfway && isWide;
					} else {
						after = (nextSibling !== dragEl) && !isLong || halfway && isLong;
					}

					if (after && !nextSibling) {
						el.appendChild(dragEl);
					} else {
						target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
					}

					this._animate(dragRect, dragEl);
					this._animate(targetRect, target);
				}
			}
		},

		_animate: function (prevRect, target) {
			var ms = this.options.animation;

			if (ms) {
				var currentRect = target.getBoundingClientRect();

				_css(target, 'transition', 'none');
				_css(target, 'transform', 'translate3d('
					+ (prevRect.left - currentRect.left) + 'px,'
					+ (prevRect.top - currentRect.top) + 'px,0)'
				);

				target.offsetWidth; // repaint

				_css(target, 'transition', 'all ' + ms + 'ms');
				_css(target, 'transform', 'translate3d(0,0,0)');

				clearTimeout(target.animated);
				target.animated = setTimeout(function () {
					_css(target, 'transition', '');
					target.animated = false;
				}, ms);
			}
		},

		_offUpEvents: function () {
			_off(document, 'mouseup', this._onDrop);
			_off(document, 'touchmove', this._onTouchMove);
			_off(document, 'touchend', this._onDrop);
			_off(document, 'touchcancel', this._onDrop);
		},

		_onDrop: function (/**Event*/evt) {
			this.options.endTime = new Date().getTime();
			var target = evt.target.parentNode;
			var url  = target.getAttribute("data-url");
			var t = target.parentNode;
			this.options.endX = evt.changedTouches ? Number(evt.changedTouches[0].pageX) : null;
			this.options.endY = evt.changedTouches ? Number(evt.changedTouches[0].pageY) : null;
			if (target.className == "um-black" && this.options.endTime - this.options.startTime < 500 && this.options.endTime - this.options.startTime > 80 && !t.classList.contains("um-dragli") && this.options.endY - this.options.startY < 20&& this.options.endX - this.options.startX < 20){

				window.location = url;
			}
			var el = this.el;
			clearTimeout(this.delayTime)
			clearInterval(this._loopId);
			clearInterval(autoScroll.pid);

			// Unbind events
			_off(document, 'drop', this);
			_off(document, 'dragover', this);

			_off(el, 'dragstart', this._onDragStart);

			this._offUpEvents();

			if (evt) {
				evt.preventDefault();
				evt.stopPropagation();

				ghostEl && ghostEl.parentNode.removeChild(ghostEl);

				if (dragEl) {
					_off(dragEl, 'dragend', this);

					// get the index of the dragged element within its parent
					var newIndex = _index(dragEl);

					_disableDraggable(dragEl);
					_toggleClass(dragEl, this.options.ghostClass, false);

					if (rootEl !== dragEl.parentNode) {
						// drag from one list and drop into another
						_dispatchEvent(dragEl.parentNode, 'sort', dragEl, rootEl, startIndex, newIndex);
						_dispatchEvent(rootEl, 'sort', dragEl, rootEl, startIndex, newIndex);

						// Add event
						_dispatchEvent(dragEl, 'add', dragEl, rootEl, startIndex, newIndex);

						// Remove event
						_dispatchEvent(rootEl, 'remove', dragEl, rootEl, startIndex, newIndex);
					}
					else if (dragEl.nextSibling !== nextEl) {
						// drag & drop within the same list
						_dispatchEvent(rootEl, 'update', dragEl, rootEl, startIndex, newIndex);
						_dispatchEvent(rootEl, 'sort', dragEl, rootEl, startIndex, newIndex);

						cloneEl && cloneEl.parentNode.removeChild(cloneEl);
					}

					// Drag end event
					Sortable.active && _dispatchEvent(rootEl, 'end', dragEl, rootEl, startIndex, newIndex);
				}

				// Set NULL
				rootEl =
				dragEl =
				ghostEl =
				nextEl =
				cloneEl =

				tapEvt =
				touchEvt =

				lastEl =
				lastCSS =

				activeGroup =
				Sortable.active = null;

				// Save sorting
				this.save();
			}
		},


		handleEvent: function (/**Event*/evt) {
			var type = evt.type;

			if (type === 'dragover') {
				this._onDrag(evt);
				_globalDragOver(evt);
			}
			else if (type === 'drop' || type === 'dragend') {
				this._onDrop(evt);
			}
		},


		/**
		 * Serializes the item into an array of string.
		 * @returns {String[]}
		 */
		toArray: function () {
			var order = [],
				el,
				children = this.el.children,
				i = 0,
				n = children.length;

			for (; i < n; i++) {
				el = children[i];
				if (_closest(el, this.options.draggable, this.el)) {
					order.push(el.getAttribute('data-id') || _generateId(el));
				}
			}

			return order;
		},


		/**
		 * Sorts the elements according to the array.
		 * @param  {String[]}  order  order of the items
		 */
		sort: function (order) {
			var items = {}, rootEl = this.el;

			this.toArray().forEach(function (id, i) {
				var el = rootEl.children[i];

				if (_closest(el, this.options.draggable, rootEl)) {
					items[id] = el;
				}
			}, this);

			order.forEach(function (id) {
				if (items[id]) {
					rootEl.removeChild(items[id]);
					rootEl.appendChild(items[id]);
				}
			});
		},


		/**
		 * Save the current sorting
		 */
		save: function () {
			var store = this.options.store;
			store && store.set(this);
		},


		/**
		 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
		 * @param   {HTMLElement}  el
		 * @param   {String}       [selector]  default: `options.draggable`
		 * @returns {HTMLElement|null}
		 */
		closest: function (el, selector) {
			return _closest(el, selector || this.options.draggable, this.el);
		},


		/**
		 * Set/get option
		 * @param   {string} name
		 * @param   {*}      [value]
		 * @returns {*}
		 */
		option: function (name, value) {
			var options = this.options;

			if (value === void 0) {
				return options[name];
			} else {
				options[name] = value;
			}
		},


		/**
		 * Destroy
		 */
		destroy: function () {
			var el = this.el, options = this.options;

			_customEvents.forEach(function (name) {
				_off(el, name.substr(2).toLowerCase(), options[name]);
			});

			_off(el, 'mousedown', this._onTapStart);
			_off(el, 'touchstart', this._onTapStart);
			_off(el, 'selectstart', this._onTapStart);

			_off(el, 'dragover', this._onDragOver);
			_off(el, 'dragenter', this._onDragOver);

			//remove draggable attributes
			Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
				el.removeAttribute('draggable');
			});

			touchDragOverListeners.splice(touchDragOverListeners.indexOf(this._onDragOver), 1);

			this._onDrop();

			this.el = null;
		}
	};


	function _cloneHide(state) {
		if (cloneEl && (cloneEl.state !== state)) {
			_css(cloneEl, 'display', state ? 'none' : '');
			!state && cloneEl.state && rootEl.insertBefore(cloneEl, dragEl);
			cloneEl.state = state;
		}
	}


	function _bind(ctx, fn) {
		var args = slice.call(arguments, 2);
		return	fn.bind ? fn.bind.apply(fn, [ctx].concat(args)) : function () {
			return fn.apply(ctx, args.concat(slice.call(arguments)));
		};
	}


	function _closest(/**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx) {
		if (el) {
			ctx = ctx || document;
			selector = selector.split('.');

			var tag = selector.shift().toUpperCase(),
				re = new RegExp('\\s(' + selector.join('|') + ')\\s', 'g');

			do {
				if (
					(tag === '>*' && el.parentNode === ctx) || (
						(tag === '' || el.nodeName.toUpperCase() == tag) &&
						(!selector.length || ((' ' + el.className + ' ').match(re) || []).length == selector.length)
					)
				) {
					return el;
				}
			}
			while (el !== ctx && (el = el.parentNode));
		}

		return null;
	}


	function _globalDragOver(/**Event*/evt) {
		evt.dataTransfer.dropEffect = 'move';
		evt.preventDefault();
	}


	function _on(el, event, fn) {
		el.addEventListener(event, fn, false);
	}


	function _off(el, event, fn) {
		el.removeEventListener(event, fn, false);
	}


	function _toggleClass(el, name, state) {
		if (el) {
			if (el.classList) {
				el.classList[state ? 'add' : 'remove'](name);
			}
			else {
				var className = (' ' + el.className + ' ').replace(/\s+/g, ' ').replace(' ' + name + ' ', '');
				el.className = className + (state ? ' ' + name : '');
			}
		}
	}


	function _css(el, prop, val) {
		var style = el && el.style;

		if (style) {
			if (val === void 0) {
				if (document.defaultView && document.defaultView.getComputedStyle) {
					val = document.defaultView.getComputedStyle(el, '');
				}
				else if (el.currentStyle) {
					val = el.currentStyle;
				}

				return prop === void 0 ? val : val[prop];
			}
			else {
				if (!(prop in style)) {
					prop = '-webkit-' + prop;
				}

				style[prop] = val + (typeof val === 'string' ? '' : 'px');
			}
		}
	}


	function _find(ctx, tagName, iterator) {
		if (ctx) {
			var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;

			if (iterator) {
				for (; i < n; i++) {
					iterator(list[i], i);
				}
			}

			return list;
		}

		return [];
	}


	function _disableDraggable(el) {
		el.draggable = false;
	}


	function _unsilent() {
		_silent = false;
	}


	/** @returns {HTMLElement|false} */
	function _ghostInBottom(el, evt) {
		var lastEl = el.lastElementChild, rect = lastEl.getBoundingClientRect();
		return (evt.clientY - (rect.top + rect.height) > 5) && lastEl; // min delta
	}


	/**
	 * Generate id
	 * @param   {HTMLElement} el
	 * @returns {String}
	 * @private
	 */
	function _generateId(el) {
		var str = el.tagName + el.className + el.src + el.href + el.textContent,
			i = str.length,
			sum = 0;

		while (i--) {
			sum += str.charCodeAt(i);
		}

		return sum.toString(36);
	}

	/**
	 * Returns the index of an element within its parent
	 * @param el
	 * @returns {number}
	 * @private
	 */
	function _index(/**HTMLElement*/el) {
		var index = 0;
		while (el && (el = el.previousElementSibling) && (el.nodeName.toUpperCase() !== 'TEMPLATE')) {
			index++;
		}
		return index;
	}

	function _throttle(callback, ms) {
		var args, _this;

		return function () {
			if (args === void 0) {
				args = arguments;
				_this = this;

				setTimeout(function () {
					if (args.length === 1) {
						callback.call(_this, args[0]);
					} else {
						callback.apply(_this, args);
					}

					args = void 0;
				}, ms);
			}
		};
	}


	// Export utils
	Sortable.utils = {
		on: _on,
		off: _off,
		css: _css,
		find: _find,
		bind: _bind,
		is: function (el, selector) {
			return !!_closest(el, selector, el);
		},
		throttle: _throttle,
		closest: _closest,
		toggleClass: _toggleClass,
		dispatchEvent: _dispatchEvent,
		index: _index
	};


	Sortable.version = '1.0.0';


	/**
	 * Create sortable instance
	 * @param {HTMLElement}  el
	 * @param {Object}      [options]
	 */
	Sortable.create = function (el, options) {
		return new Sortable(el, options);
	};

	// Export
	return Sortable;
});
/* 调用插件  */
;(function($, window, document, undefined){
	function APPManager(id,options){
		this.id = id;
		this.options = options = ( options || {} );
		this.arr = options.data || this.arr;
		this.colum = options.colum || 4;
		this.moreType = false;
		this.scroller = null;
		this.height = {};
		this.init();
	}
	APPManager.prototype = {
		init : function(){
			this.create();
			this.setCss();
		},
		create : function(){
			var sortableTxtL = "<ul class='clearfix' id='um-sortable'>";
			var more = "<div class='um-more'><div style='height:40px'><img src='./img/more.png' width=40 class='mt10'></div><div class='f12 mt5'>更多应用</div></div>";
			var sortableTxtR = "</ul>";
			var lis = "";
			var data = this.arr;
			for (var i = 0; i < data.length; i++){
				lis += "<li class='um-small'><a class='um-black' data-url = '"+data[i].url+"'><div class='um-delete'></div><img src='"+data[i].img+"' width=40 /><div class='f12 mt5'>"+data[i].label+"</div></a></li>"
			}
			var sortableTemp = sortableTxtL + lis + more + sortableTxtR;
			$(this.id).append(sortableTemp);

			this.runn();
			this.close();
			this.remove();
			this.openApp();
		},
		runn : function(){
			var el = document.getElementById("um-sortable");
			Sortable.create(el,{handle:".um-black"});
		},
		close : function(){
			$(document).on("click",function(){
				$(".um-small").removeClass("um-dragli");
			});
		},
		remove : function(){
			$(".um-delete").on("touchstart",function(){

				$(this).parents(".um-small").remove();
				return false;
			});
		},
		setCss : function(){
			var w = $(this.id).width() / this.colum;
			$(".um-small").css("width",w);
		},
		openApp : function(){
			$(".um-more").on("click",function(){
				UM.page.changePage({
		            target: "#application",
		            isReverse: 0,
		            transition: "um"
		        });
			});
			$('#asdf').onePageNav();
			//this.provinceLoaded();
			//this.scroll();
		},
		nav : function(){

		},
		provinceLoaded : function (){
			var _this = this;
			this.Scroller = new iScroll("applist",{
				hScroll:false,
				vScroll:true,
				vScrollbar:false,
				bounce:true,
				momentum:true,
				onScrollMove : function(){
					//console.log(_this.height["b"])
					if( -this.y >= _this.height["b"]){
						$("#b").addClass("active")
					}
				}
			});
		},
		scroll: function(){
			var _this = this;
			this.getHeight();
			$("#appclassify").on("click","li",function(){
				if($(this).hasClass("active")){
					return false;
				}
				var dataId = $(this).attr("data-id");
				$(this).addClass("active").siblings().removeClass("active");
				var height = -_this.height[dataId];
				_this.Scroller.scrollTo(0,height,200);

			})
		}

	}

	$.fn.vvv = function(options) {
		return this.each(function() {
			new APPManager(this,options);
		});
	};
})( jQuery, window , document );
/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 3.0.0
 *
 * Example usage:
 * $('#nav').onePageNav({
 *   currentClass: 'current',
 *   changeHash: false,
 *   scrollSpeed: 750
 * });
 */

;(function($, window, document, undefined){

	// our plugin constructor
	var OnePageNav = function(elem, options){
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data('plugin-options');
		this.$win = $("#applist");
		this.sections = {};
		this.didScroll = false;
		this.$doc = $(document);
		this.height = {};
		this.docHeight = this.$doc.height();
	};

	// the plugin prototype
	OnePageNav.prototype = {
		defaults: {
			navItems: 'a',
			currentClass: 'active',
			changeHash: false,
			easing: 'swing',
			filter: '',
			scrollSpeed: 750,
			scrollThreshold: 0.5,
			begin: false,
			end: false,
			scrollChange: false
		},

		init: function() {
			// Introduce defaults that can be extended either
			// globally or using an object literal.
			this.config = $.extend({}, this.defaults, this.options, this.metadata);

			this.$nav = this.$elem.find(this.config.navItems);

			//Filter any links out of the nav
			if(this.config.filter !== '') {
				this.$nav = this.$nav.filter(this.config.filter);
			}

			//Handle clicks on the nav
			this.$nav.on('click.onePageNav', $.proxy(this.handleClick, this));

			//Get the section positions
			this.getPositions();

			//Handle scroll changes
			this.bindInterval();

			//Update the positions on resize too
			this.$win.on('resize.onePageNav', $.proxy(this.getPositions, this));
			//
			this.getHeight();
			return this;
		},

		adjustNav: function(self, $parent) {
			self.$elem.find('.' + self.config.currentClass).removeClass(self.config.currentClass);
			$parent.addClass(self.config.currentClass);
		},

		bindInterval: function() {
			var self = this;
			var docHeight;

			self.$win.on('scroll.onePageNav', function() {
				self.didScroll = true;
			});

			self.t = setInterval(function() {
				docHeight = self.$doc.height();

				//If it was scrolled
				if(self.didScroll) {
					self.didScroll = false;
					self.scrollChange();
				}

				//If the document height changes
				if(docHeight !== self.docHeight) {
					self.docHeight = docHeight;
					self.getPositions();
				}
			}, 250);
		},

		getHash: function($link) {
			return $link.attr('attr-href').split('#')[1];
		},

		getPositions: function() {
			var self = this;
			var linkHref;
			var topPos;
			var $target;

			self.$nav.each(function() {
				linkHref = self.getHash($(this));
				$target = $('#' + linkHref);

				if($target.length) {
					topPos = $target.offset().top;
					self.sections[linkHref] = Math.round(topPos);
				}
			});
		},

		getSection: function(windowPos) {
			var returnValue = null;
			var windowHeight = Math.round(this.$win.height() * this.config.scrollThreshold);

			for(var section in this.sections) {
				if((this.sections[section] - windowHeight) < windowPos) {
					returnValue = section;
				}
			}

			return returnValue;
		},

		handleClick: function(e) {
			var self = this;
			var $link = $(e.currentTarget);
			var $parent = $link.parent();
			var hv = self.getHash($link);
			var newLoc = '#' + hv;

			if(!$parent.hasClass(self.config.currentClass)) {
				//Start callback
				if(self.config.begin) {
					self.config.begin();
				}

				//Change the highlighted nav item
				self.adjustNav(self, $parent);

				//Removing the auto-adjust on scroll
				self.unbindInterval();

				//Scroll to the correct position
				self.scrollTo(hv, function() {
					//Do we need to change the hash?
					if(self.config.changeHash) {
						window.location.hash = newLoc;
					}

					//Add the auto-adjust on scroll back in
					self.bindInterval();

					//End callback
					if(self.config.end) {
						self.config.end();
					}
				});
			}

			e.preventDefault();
		},

		scrollChange: function() {
			var windowTop = this.$win.scrollTop();
			var position = this.getSection(windowTop);
			var $parent;

			//If the position is set
			if(position !== null) {
				$parent = this.$elem.find('a[attr-href$="#' + position + '"]').parent();

				//If it's not already the current section
				if(!$parent.hasClass(this.config.currentClass)) {
					//Change the highlighted nav item
					this.adjustNav(this, $parent);

					//If there is a scrollChange callback
					if(this.config.scrollChange) {
						this.config.scrollChange($parent);
					}
				}
			}
		},

		scrollTo: function(target, callback) {
			var offset = this.height[target];

			$('#applist').animate({
				scrollTop: offset
			}, this.config.scrollSpeed, this.config.easing, callback);
		},

		unbindInterval: function() {
			clearInterval(this.t);
			this.$win.unbind('scroll.onePageNav');
		},
		getHeight : function(){
			var _this = this;
			$(".um-appitem").each(function(i){
				_this.height[$(this).attr("data-v")] = $(this).offset().top - 44;
			});
		}
	};

	OnePageNav.defaults = OnePageNav.prototype.defaults;

	$.fn.onePageNav = function(options) {
		return this.each(function() {
			new OnePageNav(this, options).init();
		});
	};

})( jQuery, window , document );
