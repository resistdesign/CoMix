# pLayoutUpdater

### A helper factory method to manage the lifecycle events for an element and it's children.

> This method will be responsible for the following:
> <br>
> 1. Notifying the caller when child elements should be laid out.
> <br>
> 2. Notifying child elements that they have been laid out by dispatching the `psvgEventTypes.LAYOUT_CHANGED` event on each child.


#### Settings



#### Externally Accessible Values



#### Externally Accessible Functions

1. `pLayoutUpdater(scope,element,layoutFunction,dispatcher)` (Function) - Setup a scope and element for handling various layout events and requests.
Returns a reference to a function for invalidating the layout of the supplied element.

 - `scope` (Scope) - The scope to listen to for the "$destroy" event for the purpose of tearing down all listeners/watchers.
 - `element` (elementReference) - The element reference that contains children and that will be watched/listened to for layout events.
 - `layoutFunction` (function) - A function that will be called when the container's children should be laid out. IMPORTANT: `layoutFunction` **MUST** return `true` if the container's children are to be notified of layout changes.
 - `dispatcher` (object) - A unique dispatcher object to accompany the `psvgEventTypes.LAYOUT_CHANGED` event. (Important to avoid event triggered layout recursion.)



#### Internally Accessible Values



#### Internally Accessible Functions


