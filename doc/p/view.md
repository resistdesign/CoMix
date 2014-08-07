# p-view

### A version of `ng-view` that offers the ability to use nested views via a `directives` map object bound to a path using the standard `$routeProvider` methods.
<br>
IMPORTANT: `p-view` loads views via **directives** and **contexts**, NOT templates.
<br>
For example, `$routeProvider.when( "/dashboard/account", { directives: { "main": "dashboard", "panel": "account" }, refresh: { "panel": true } } )`
<br>
Meaning that changing the path to `/dashboard/account` would load a view via a directive called `dashboard` into the element in the main application with `p-view` set to "main".
Once the "dashboard" view was loaded, the "account" view would be loaded, via the `account` directive, into an element in the dashboard view with `p-view` set to "panel",
if the element exists.
<br>
ADDITIONALLY: If there is no value set for the property with the same name as the current **context** on the route directives object, `p-view` checks the `$routeParams` for a property with its context name.
<br>
The `refresh` object on a route allows a context to **reload the current view** if it is being requested again while already loaded.
<br>
ADDITIONALLY: Views may also be loaded using the `p-load-view` setting which will **override the current context**.

### This tag includes all of the functionality from the [p-layout-container](layout/container.md) tag.

### IMPORTANT: If the `p-view` is a group containing an object, that object will be used as a template to initialize the tags for all loaded views. NOTE: Layout and style related tags `(x,y,r,b,width,height,style)` are ignored by default. (See: `p-init-layout-tags`)


#### Settings

1. `p-view` (text) - The name of the **context** of this view placeholder object.
<br>
Usage: `p-view="main"`, `p-view`
1. `p-load-view` (text) - The directive to load as a view.
<br>
Usage: `p-load-view="views-tools-calc"`, `p-load-view="{{currentView}}"`
1. `p-init-layout-tags` (text) - A comma separated list of layout tags to allow as initial loaded view tags.
<br>
Usage: `p-init-layout-tags="x,style,b"`
1. `p-refresh` (true/false) - Set to `true` to always reload this context when the route changes.
1. `p-fit` (nothing) - Apply this tag to constrain the width and height of the target view to that of this view placeholder object.
<br>
Usage: `p-fit`
1. `p-min-fit` (nothing) - Apply this tag to constrain the minimum width and minimum height of the target view to that of this view placeholder object.
<br>
Usage: `p-min-fit`


#### Externally Accessible Values



#### Externally Accessible Functions



#### Internally Accessible Values



#### Internally Accessible Functions


