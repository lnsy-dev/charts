# LLM-CONTEXT.md

## DataRoom Charts - Technical Context for Large Language Models

This document provides technical context about the DataRoom Charts library for use by Large Language Models (LLMs) when assisting with code generation, debugging, or modifications.

### Architecture Overview

**Framework**: Custom HTML Elements built on `dataroom-js` 
**Rendering**: D3.js v7 for SVG chart generation
**Build Tool**: Rspack (preferred over webpack)
**Dependencies**: 
- `dataroom-js ^0.6.0` - Base custom element framework
- `d3 ^7.9.0` - Data visualization library

### Core Component: `<dataroom-chart>`

**Location**: `src/dataroom-chart.js`
**Registration**: `customElements.define('dataroom-chart', DataroomChart)`

#### Class Structure
```javascript
class DataroomChart extends DataroomElement {
  // Inherits from dataroom-js framework
  async initialize() { /* Main initialization logic */ }
}
```

### Supported Chart Types

1. **Bar Chart** (`type="bar"` or `type="barchart"`)
   - Method: `renderBarChart()`
   - Orientations: `vertical` (default), `horizontal`
   - Data: `{label: string, value: number, color?: string}[]`

2. **Scatter Plot** (`type="scatter"` or `type="scatterchart"`)
   - Method: `renderScatterPlot()`
   - Data: `{x: number, y: number, r?: number, c?: string}[]`
   - `r`: radius dimension, `c`: category/color dimension

3. **Line Graph** (`type="line"`, `type="line-graph"`, `type="linegraph"`)
   - Method: `renderLineGraph()`
   - Data: Same as scatter plot
   - Features: Groups by `c` property, sorts by `x` value

4. **Donut Chart** (`type="donut"` or `type="donutchart"`)
   - Method: `renderDonutChart()`
   - Data: `{label: string, value: number, color?: string}[]`

### Data Input Methods

1. **Element Content** (Primary):
```html
<dataroom-chart type="bar">
[{"label": "A", "value": 30}]
</dataroom-chart>
```

2. **Data Attribute**:
```html
<dataroom-chart type="bar" data='[{"label":"A","value":30}]'></dataroom-chart>
```

3. **Default Sample Data**: Used when no data provided

### Key Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | string | Required | Chart type identifier |
| `width` | string/number | "400" | SVG width in pixels |
| `height` | string/number | "400" | SVG height in pixels |
| `orientation` | string | "vertical" | Bar chart orientation |
| `monochrome` | boolean/string | false | Enable pattern-based monochrome mode |
| `color` | string | CSS `--hi` or palette | Override default color |
| `line-width` | string/number | "2" | Line graph stroke width |
| `radius` | string/number | "5"/"4" | Point radius (scatter/line) |
| `min-radius` | string/number | "2" | Minimum bubble radius |
| `max-radius` | string/number | "15" | Maximum bubble radius |
| `labels` | string | "true" | Show/hide donut chart labels |

### Monochrome Mode

**Purpose**: Accessibility and print-friendly charts
**Implementation**: SVG patterns instead of colors
**Patterns File**: `src/monochrome-patterns.js`

Available pattern types:
- `diagonal` (default)
- `horizontal-stripes`
- `vertical-stripes`
- `cross-hatch`
- `dots`
- `circles`
- `hounds-tooth`

Pattern variations (12 per type):
- Different `spacing` values (2-10px)
- Different `strokeWidth` values (0.5-1.5px)

### Color System

**CSS Custom Properties**:
```css
:root {
  --color-1 through --color-12: /* 12-color palette */
  --hi: /* Highlight/primary color */
}
```

**Fallback Palette**: Viridis-inspired 12-color scheme
**Color Methods**:
- `getColorPalette()`: Returns array of all palette colors
- `getColor(fallback)`: Returns single color (--hi > palette[0] > fallback)
- `getFillValue(index, customColor)`: Returns color or pattern URL for monochrome

### DataRoom-JS Framework Integration

**Base Class**: `DataroomElement`
**Key Inherited Methods**:
- `create(type, attributes, target_el)`: DOM element creation
- `log(message)`: Conditional logging
- `event(name, detail)`: Custom event emission
- `on(name, callback)`: Event listener attachment

**Lifecycle**:
1. `connectedCallback()` → `preInit()` → `initialize()`
2. `initialize()` is overridden in DataroomChart
3. Chart rendering happens in `initialize()`

### D3.js Implementation Patterns

**SVG Creation**: Native DOM methods (not D3)
**D3 Usage**: Primarily for:
- Scales: `d3.scaleLinear()`, `d3.scaleBand()`, `d3.scaleOrdinal()`
- Layouts: `d3.pie()` for donut charts
- Shapes: `d3.arc()`, `d3.line()`
- Data binding: `selectAll().data().enter().append()`
- Axes: `d3.axisBottom()`, `d3.axisLeft()`

**Margin Convention**: 
```javascript
const margin = { top: 20, right: 30, bottom: 40, left: 40 };
const chartWidth = width - margin.left - margin.right;
const chartHeight = height - margin.top - margin.bottom;
```

### Error Handling

**Error Display**: `renderError(text)` method creates styled error div
**JSON Parsing**: Try-catch blocks with fallback to sample data
**Data Validation**: Checks for empty/null data arrays

### Styling Guidelines

**No Embedded CSS**: Separate CSS files only
**CSS Classes**: 
- `.dataroom-element` (inherited)
- `.bar`, `.dot`, `.line`, `.arc` (chart-specific)
- `.chart-error` (error states)

### Code Style

**Comment Style**: DockBlock format (JSDoc-like)
```javascript
/**
 * Method description
 * @param {type} paramName - Parameter description
 * @returns {type} Return description
 */
```

**No Shadow DOM**: Components render directly in light DOM
**Build Tool**: Rspack (not webpack)

### Common Modification Patterns

1. **Adding New Chart Type**:
   - Add case to switch statement in `initialize()`
   - Create new `render{ChartType}()` method
   - Follow D3 margin convention
   - Support monochrome mode with `getFillValue()`

2. **Adding New Attributes**:
   - Access via `this.attrs.attributeName`
   - Parse numbers with `parseInt()` or `parseFloat()`
   - Provide defaults with `|| defaultValue`

3. **Extending Data Format**:
   - Modify `getData()` method
   - Update data validation
   - Ensure backward compatibility

### Performance Considerations

- Charts recreate completely on data change (no updates)
- SVG patterns are reused across elements
- D3 scales are computed once per render
- Large datasets may need throttling/sampling

### Testing & Development

- Development server: `npm run start` (port 3000)
- Build command: `npm run build`
- No automated tests currently implemented
- Manual testing in browser required