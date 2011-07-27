# Raphaël Line Charts Plugin #

This plugin is a result of frustration from current client-side charting solutions.	 
I needed something simple that would draw a line chart in SVG based on a table in a page, be customizable enough and allow me to change the data set on demand. I couldn't find one.	
So here goes. 

This plugin relies heavily on the wonderful [Raphaël][1] JavaScript SVG library.	
It is also a (quite extensive) fork of [we's Beautiful Analytics Chart][2] project. 

To download and contribute (please do!), check out the [project on GitHub][3]. 

## Features ##

The concept for the code is dervied from the Raphael [Analytics example][4].

*		Draws a line chart with custom design for a given set of data.
*		Framework agnostic (only requirement is Raphael).
*		Semantic use of the document: data is loaded from a table element.
*		Ability to change data source (updating the chart).
*		Custom display of X & Y axis labels.

## Requirements ##

*		Raphael - [http://raphaeljs.com]

## Usage ##

### Include it. ###

```html
<script type="text/javascript" src="http://ajax.cdnjs.com/ajax/libs/raphael/1.5.2/raphael-min.js"></script>
<script type="text/javascript" src="js/raphael_linechart.js"></script>
```

### Give it data. ###

Provide the plugin with either:

*   A table element (the DOM element or just its id) using a specific structure:

```html
<div id="line-chart-holder"></div>
<table id=&quot;d1&quot; style="display: none;">
	<tfoot>
		<tr>
			<th>3/02</th>
			<th>3/03</th>
			<th>3/09</th>
			<th>3/16</th>
		</tr>
	</tfoot>
	<tbody class="data">
		<tr>
			<td>70</td>
			<td>70</td>
			<td>210</td>
			<td>490</td>
		</tr>
	</tbody>
	<tbody class="line1">
		<tr>
			<td>70 Views</td>
			<td>70 Views</td>
			<td>210 Views</td>
			<td>490 Views</td>
		</tr>
	</tbody>
	<tbody class="line2">
		<tr>
			<td>Mar 2nd 2011</td>
			<td>Mar 3rd 2011</td>
			<td>Mar 9th 2011</td>
			<td>Mar 16th 2011</td>
		</tr>
	</tbody>
</table>
```

*   A data object with four arrays: labels, values and info lines 1 & 2:

```javascript
data = {
	labels: ['3/02', '3/03', '3/09', '3/16'],
	data: [70, 70, 210, 490],
	lines1: ['70 Views', '70 Views', '210 Views', '490 Views'],
	lines2: ['Mar 2nd 2011', 'Mar 3rd 2011', 'Mar 9th 2011', 'Mar 16th 2011']
}
```

*   A data object with the same structure, but with __array lists__ for the values and info lines.
The first list would be immediately used, and you can then switch data object to display by passing the array index
(see Dance).

```javascript
data = {
	labels: ['3/02', '3/03', '3/09', '3/16'],
	data: [[70, 70, 210, 490], [690, 320, 440, 415]],
	lines1: [['70 Clicks', '70 Clicks', '210 Clicks', '490 Clicks'], ['690 Views', '320 Views', '440 Views', '415 Views']],
	lines2: [['Mar 2nd 2011', 'Mar 3rd 2011', 'Mar 9th 2011', 'Mar 16th 2011'], ['Mar 2nd 2011', 'Mar 3rd 2011', 'Mar 9th 2011', 'Mar 16th 2011']]
}
```

### Call it. ###

```html
<script type="text/javascript">
   window.onload = function(){
      var w = 840; // you can make this dynamic so it fits as you would like
      var paper = Raphael('line-chart-holder', w, 250); // init the raphael obj and give it a width plus height
      paper.lineChart({
         data_holder: 'd2', // find the table data source by id
         width: w, // pass in the same width
         show_area: true, // show the area
         x_labels_step: 3, // X axis labels step
         y_labels_count: 5, // Y axis labels count
         mouse_coords: 'rect', // rect (uses blanket mode) | circle (pinpoints the points)
         colors: {
           master: '#01A8F0' // set the line color
         }
      });
   };
</script>
```

### Dance. ###

If you'd like, you can tell the plugin to change the dataset it's displaying.
You can either pass a new table element, a new data object or an index (if you used the objects array method).
The chart would magically move to the new spot, using a configurable Raphaël animation.

```javascript
// switch to the table with id = table1
paper.lineChart('setDataHolder', 'table1');

// switch to a DOM element
var elm = $('table1');
paper.lineChart('setDataHolder', elm);

// switch to a new data object
paper.lineChart('setData', data);

// switch to second item in previously given data array object.
paper.lineChart('setDataIndex', 1);
```

## Documentation ##

The ```lineChart()``` plugin will accept a list of arguments in a json style format.

```javascript
var opts = {
		data_holder: null, // table element holding the data to display
		data: null,        // or the data object itself
		width: 500,
		height: 250,
		// chart gutter dimension
		gutter: {
			top: 20,
			right: 0,
			bottom: 50,
			left: 30
	},
	// whether to fill the area below the line
	show_area: false,
	// way to capture mouse events
	mouse_coords: "rect",
	// whether to display background grid
	no_grid: false,
	// X axis: either false or a step integer
	x_labels_step: false,
	// Y axis: either false or a labels count
	y_labels_count: false,
	// animation (on data source change) settings
	animation: {
		speed: 600,
		easing: "backOut"
	},
	// color settings
	colors: {
		master: "#01A8F0",
		line1: "#000000",
		line2: "#01A8F0",
	},
	// text style settings
	text: {
		axis_labels: {
			font: "10px Helvetica, Arial",
			fill: "#000000"
		},
		popup_line1: {
			font: "bold 11px Helvetica, Arial",
			fill: "#000000"
		},
		popup_line2: {
			font: "bold 10px Helvetica, Arial",
			fill: "#000000"
		}
	}
};

r.lineChart(opts); // draw the line chart in an initiated Raphael object
```

## License ##

The plugin is dual-licensed under the [GNU General Public License][5] and the [MIT License][6].

## Enjoy. ##

[1]: http://raphaeljs.com/
[2]: https://github.com/wes/Beautiful-Analytics-Chart
[3]: https://github.com/n0nick/raphael-linechart
[4]: http://raphaeljs.com/analytics.html
[5]: http://www.opensource.org/licenses/gpl-3.0
[6]: http://www.opensource.org/licenses/mit-license
