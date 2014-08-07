# PSVG

### The `PSVG` module declaration. (Includes `ngCompanions`, a collection of directives that integrate **AngularJS** and **PSVG**.)


#### Settings



#### Externally Accessible Values

1. `psvgEventTypes` (object) - A factory object containing event type constants for the layout system as follows:
<pre>
	- `LAYOUT_CHANGED` - The event dispatched whenever the size and/or position of a layout element changes.
</pre>


#### Externally Accessible Functions

1. `isArray(object)` (true/false) - Check to see if an object is an array.

 - `object` (MISC) - The object to check.

1. `isSet(value,any)` (true/false) - Check to see is the value of an attribute is set.

 - `value` (MIXED) - Any value or list of values.
 - `any` (true/false) - A value designating that `value` is considered to be set if **any** items in the list are set. Default: `false`

1. `watchAttrSet(scope,attrs,attrSet,callback)` (nothing) - Watch all attributes in the given set.

 - `scope` (Scope) - The scope to listen to for the "$destroy" event for the purpose of tearing down all watchers.
 - `attrs` (attributesObject) - The AngularJS attributes object from a directive's link function.
 - `attrSet` (list) - The list of attributes to watch.
 - `callback` (function) - The function to be called when an attribute changes. This function will receive the **attribute name** and **new value**.

1. `watchScopeValueSet(scope,valueSet,callback,attrs)` (nothing) - Watch all scope values in the given set.

 - `scope` (Scope) - The scope to watch for values changes and to listen to for the "$destroy" event for the purpose of tearing down all watchers.
 - `valueSet` (list) - The list of values to watch.
 - `callback` (function) - The function to be called when a value changes. This function will receive the **value name**, **new value** and **old value**.
 - `attrs` (attributesObject) - (Optional) The AngularJS attributes object from a directive's link function. **If supplied**, the values of attributes will be watched instead of the names of the values in the `valueSet`.

1. `lastAttrValue(element,attr,newValue,assign)` (true/false) - Check to see if the given attribute of an element has changed **while also** assigning the supplied value as the last set value.

 - `element` (elementReference) - The element reference containing the attribute to check.
 - `attr` (text) - The attribute to check and assign the last value for.
 - `newValue` (text/number) - The new value to check against and assign.
 - `assign` (true/false) - A value designating whether or not to assign the newValue as the last value. Default: `true`



#### Internally Accessible Values



#### Internally Accessible Functions


