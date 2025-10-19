# DataRoom Charts

A vanilla JS, CSS and HTML library for creating D3-powered chart components using custom HTML elements. Built on the dataroom-js framework with rspack for bundling.

## Installation

Clone the repository:

```bash
git clone <your-repo-url>
cd dataroom-charts
npm install
```

## Usage

The main component is `<dataroom-chart>`, a custom HTML element that renders various chart types using D3.js.

### Basic Example

```html
<dataroom-chart type="bar" width="600" height="400">
[
  { "label": "A", "value": 30 },
  { "label": "B", "value": 80 },
  { "label": "C", "value": 45 },
  { "label": "D", "value": 60 }
]
</dataroom-chart>
```

### Chart Types

#### Bar Chart
- **Type**: `bar` or `barchart`
- **Orientations**: `vertical` (default), `horizontal`
- **Data Format**: Array of objects with `label` and `value` properties

```html
<dataroom-chart type="bar" orientation="horizontal">
[
  { "label": "Category A", "value": 25 },
  { "label": "Category B", "value": 40 },
  { "label": "Category C", "value": 35 }
]
</dataroom-chart>
```

#### Scatter Plot
- **Type**: `scatter` or `scatterchart`
- **Data Format**: Array of objects with `x`, `y`, optional `r` (radius), `c` (category/color)

```html
<dataroom-chart type="scatter" width="500" height="300">
[
  { "x": 1, "y": 10, "r": 5, "c": "Group 1" },
  { "x": 2, "y": 20, "r": 8, "c": "Group 1" },
  { "x": 3, "y": 15, "r": 6, "c": "Group 2" }
]
</dataroom-chart>
```

#### Line Graph
- **Type**: `line`, `line-graph`, or `linegraph`
- **Data Format**: Same as scatter plot
- **Features**: Connects points with lines, grouped by category

```html
<dataroom-chart type="line" line-width="3">
[
  { "x": 1, "y": 10, "c": "Series A" },
  { "x": 2, "y": 15, "c": "Series A" },
  { "x": 3, "y": 12, "c": "Series A" },
  { "x": 1, "y": 5, "c": "Series B" },
  { "x": 2, "y": 8, "c": "Series B" },
  { "x": 3, "y": 11, "c": "Series B" }
]
</dataroom-chart>
```

#### Donut Chart
- **Type**: `donut` or `donutchart`
- **Data Format**: Array of objects with `label` and `value` properties
- **Features**: Labels can be disabled with `labels="false"`

```html
<dataroom-chart type="donut" width="400" height="400">
[
  { "label": "Slice A", "value": 30 },
  { "label": "Slice B", "value": 25 },
  { "label": "Slice C", "value": 45 }
]
</dataroom-chart>
```

### Attributes

| Attribute | Description | Default | Chart Types |
|-----------|-------------|---------|-------------|
| `type` | Chart type (bar, scatter, line, donut) | Required | All |
| `width` | Chart width in pixels | 400 | All |
| `height` | Chart height in pixels | 400 | All |
| `orientation` | Bar chart orientation (vertical, horizontal) | vertical | Bar |
| `monochrome` | Enable monochrome mode with patterns | false | All |
| `color` | Override default color | CSS --hi or palette | All |
| `labels` | Show/hide labels | true | Donut |
| `line-width` | Line thickness | 2 | Line |
| `radius` | Point radius | 5 (scatter), 4 (line) | Scatter, Line |
| `min-radius` | Minimum bubble size | 2 | Scatter, Line |
| `max-radius` | Maximum bubble size | 15 | Scatter, Line |
| `data` | JSON data as attribute | Content | All |
| `src` | URL to an external JSON data file | `null` | All |

### Data Formats

Data can be provided to the chart in three ways. If multiple sources are provided, the priority is as follows: `data` attribute > `src` attribute > element content.

#### Via Element Content (Recommended)
```html
<dataroom-chart type="bar">
[
  { "label": "A", "value": 30 },
  { "label": "B", "value": 80 }
]
</dataroom-chart>
```

#### Via Data Attribute
```html
<dataroom-chart type="bar" data='[{"label":"A","value":30},{"label":"B","value":80}]'></dataroom-chart>
```

#### Via External JSON File (`src`)

You can load data from an external JSON file by providing a URL to the `src` attribute.

```html
<dataroom-chart type="bar" src="path/to/your/data.json"></dataroom-chart>
```

### Monochrome Mode

Enable monochrome mode with patterns for print-friendly or accessible charts:

```html
<dataroom-chart type="bar" monochrome="true">
[
  { "label": "A", "value": 30 },
  { "label": "B", "value": 80 }
]
</dataroom-chart>
```

Monochrome mode uses SVG patterns (diagonal stripes, dots, circles, etc.) instead of colors to differentiate data series.

### Styling

The component uses CSS custom properties for theming:

```css
:root {
  --color-1: #440154;
  --color-2: #482878;
  --color-3: #3e4989;
  /* ... up to --color-12 */
  --hi: #fde725; /* Highlight color */
}
```

## Development

### Running the Project

```bash
npm run start
```

Starts the development server on port 3000.

### Building the Project

```bash
npm run build
```

Creates optimized files in the `dist` folder.

### Build Customization

Create a `.env` file to customize build output:

```env
OUTPUT_FILE_NAME=dataroom-charts.min.js
PORT=8080
```
