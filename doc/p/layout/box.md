# p-layout-box

### Add advanced layout functionality to an object. IMPORTANT: By default, all objects are given the `p-layout-box` tag by the compiler.

### Special Values:
Layout properties can be bound to values in the current view or component in addition to a few special values:
<pre>
	1. `parentWidth` - The width of the parent group.
	2. `parentHeight` - The height of the parent group.
	3. `parentCenter` - The center of the parent group.
	4. `center`: A position to offset the object to align its center with the center of its parent group.
	5. `thisWidth` - The width of the object.
	6. `thisHeight` - The height of the object.
	7. `thisCenter` - The center of the object.
</pre>
It is also possible to use some basic math, for example: `p-x="(parentWidth*0.75)-50"`


#### Settings

1. `p-x` (number/expression) - The horizontal position of the object.
1. `p-y` (number/expression) - The vertical position of the object.
1. `p-r` (number/expression) - The horizontal position of the **right** side of the object.
1. `p-b` (number/expression) - The vertical position of the **bottom** of the object.
1. `p-width` (number/expression) - The width of the object.
1. `p-height` (number/expression) - The height of the object.


#### Externally Accessible Values



#### Externally Accessible Functions



#### Internally Accessible Values



#### Internally Accessible Functions


