/**
 * @module  one-listener
 * @export requestEvent
 * @export cancelEvent
 * @author  Gregor Adams <greg@pixelass.com> (http://pixelass.com)
 */

/**
 * global collection of listeners
 * This object receives live updates when an enentListener is requested or canceled
 * @const
 * @type {Object}
 */
const eventListeners = {};

/**
 * request an eventListener
 * This function requires an id to store handlers.
 * A handler cannot be overwritten. it has to be canceled before a listener can be assigned to the id
 * An id can be used for multiple events: 
 * e.g. you can have a scroll event and resize event with the same id
 * @param  {String} event - name of the event to request
 * @param  {String} id - unique id 
 * @param  {Function} handler - default eventListener handler
 */
const requestEventListener = (event, id, handler) => {
    let eL = {};
    if (eventListeners.hasOwnProperty(event) && typeof eventListeners[event] === 'object') {
        Object.assign(eL, eventListeners[event]);
    }
    if (!eL.hasOwnProperty(id)) {
        eL[id] = handler;
    }
    eventListeners[event] = eL;
};

/**
 * cancels an eventListener
 * This function requires an id to retrieve handlers.
 * deletes the handler from the `eventListeners` object.
 * deletes the event object if it is empty.
 * @param  {String} event - name of the event to cancel
 * @param  {String} id - unique id 
 */
const cancelEventListener = (event, id) => {
    let eL = Object.assign({}, eventListeners[event]);
    if (eL.hasOwnProperty(id)) {
        delete eL[id];
    }
    let listeners = Object.keys(eL);
    if (listeners.length <= 0) {
        delete eventListeners[event];
    } else {
        eventListeners[event] = eL;
    }
};

/**
 * named scroll handler to use in `addEventListener` and `removeEventListener`
 * calls all handlers wrapped in a `requestAnimationFrame`
 * @param  {Event} e - scroll event
 */
const handleScroll = (e) => {
    if (!eventListeners.hasOwnProperty('scroll')) {
        return;
    }
    let listeners = eventListeners.scroll;
    let handlers = Object.keys(listeners);
    handlers.forEach(handler => requestAnimationFrame(listeners[handler]));
};

/**
 * named resize handler to use in `addEventListener` and `removeEventListener`
 * calls all handlers wrapped in a `requestAnimationFrame`
 * @param  {Event} e - resize event
 */
const handleResize = (e) => {
    if (!eventListeners.hasOwnProperty('resize')) {
        return;
    }
    let listeners = eventListeners.resize;
    let handlers = Object.keys(listeners);
    handlers.forEach(handler => requestAnimationFrame(listeners[handler]));
};

/**
 * named mousewheel handler to use in `addEventListener` and `removeEventListener`
 * calls all handlers wrapped in a `requestAnimationFrame`
 * @param  {Event} e - mousewheel event
 */
const handleMousewheel = (e) => {
    if (!eventListeners.hasOwnProperty('mousewheel')) {
        return;
    }
    let listeners = eventListeners.mousewheel;
    let handlers = Object.keys(listeners);
    handlers.forEach(handler => requestAnimationFrame(listeners[handler]));
};

/**
 * named mousemove handler to use in `addEventListener` and `removeEventListener`
 * calls all handlers wrapped in a `requestAnimationFrame`
 * @param  {Event} e - mousemove event
 */
const handleMousemove = (e) => {
    if (!eventListeners.hasOwnProperty('mousemove')) {
        return;
    }
    let listeners = eventListeners.mousemove;
    let handlers = Object.keys(listeners);
    handlers.forEach(handler => requestAnimationFrame(listeners[handler]));
};

/**
 * named mouseup handler to use in `addEventListener` and `removeEventListener`
 * calls all handlers
 * @param  {Event} e - mouseup event
 */
const handleMouseup = (e) => {
    if (!eventListeners.hasOwnProperty('mouseup')) {
        return;
    }
    let listeners = eventListeners.mouseup;
    let handlers = Object.keys(listeners);
    handlers.forEach(handler => listeners[handler](e));
};

/*
 * add eventListeners for all named handlers
 */
window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleResize);
window.addEventListener('orientationchange', handleResize);
window.addEventListener('mousewheel', handleMousewheel);
window.addEventListener('mousemove', handleMousemove);
window.addEventListener('mouseup', handleMouseup);

exports.requestEventListener = requestEventListener;
exports.cancelEventListener = cancelEventListener;