import DataroomElement from 'dataroom-js';
import * as d3 from "d3";


class DataroomChart extends DataroomElement {
  async initialize(){

    const svgNamespace = "http://www.w3.org/2000/svg";

    // Create the main SVG container
    const svgElement = document.createElementNS(svgNamespace, "svg");

    // Set attributes for the SVG container
    svgElement.setAttribute("width", "400");
    svgElement.setAttribute("height", "400");
    svgElement.setAttribute("viewBox", "0 0 400 400"); // for responsive scaling

    this.container = svgElement;
    
    // Format content as code block if it contains JSON
    this.formatContent();
    
    this.appendChild(this.container);


    switch(this.attrs.type){
    case "bar":
    case "barchart":
      this.renderBarChart();
      break;
    case "scatter":
    case "scatterchart":
      this.renderScatterPlot();
      break;
    case "donut":
    case "donutchart":
      this.renderDonutChart();
      break;
    default:
      this.renderError("No Chart Type Set");
    }
  }

  /**
   * Renders a bar chart using D3
   * Supports both horizontal and vertical orientations
   * @returns {void}
   */
  renderBarChart(){
    const data = this.getData();
    if (!data || data.length === 0) {
      this.renderError("No data provided for bar chart");
      return;
    }
    const orientation = this.attrs.orientation || 'vertical';
    const width = parseInt(this.attrs.width) || 400;
    const height = parseInt(this.attrs.height) || 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    // Update SVG dimensions
    this.container.setAttribute("width", width);
    this.container.setAttribute("height", height);
    this.container.setAttribute("viewBox", `0 0 ${width} ${height}`);
    
    const svg = d3.select(this.container);
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    if (orientation === 'horizontal') {
      // Horizontal bar chart
      const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([0, chartWidth]);
        
      const yScale = d3.scaleBand()
        .domain(data.map(d => d.label))
        .range([0, chartHeight])
        .padding(0.1);
        
      // Add bars
      const colorPalette = this.getColorPalette();
      g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", d => yScale(d.label))
        .attr("width", d => xScale(d.value))
        .attr("height", yScale.bandwidth())
        .attr("fill", (d, i) => d.color || this.attrs.color || colorPalette[i % colorPalette.length]);
        
      // Add axes
      g.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${chartHeight})`)
        .call(d3.axisBottom(xScale));
        
      g.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale));
    } else {
      // Vertical bar chart
      const xScale = d3.scaleBand()
        .domain(data.map(d => d.label))
        .range([0, chartWidth])
        .padding(0.1);
        
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([chartHeight, 0]);
        
      // Add bars
      const colorPalette = this.getColorPalette();
      g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.label))
        .attr("y", d => yScale(d.value))
        .attr("width", xScale.bandwidth())
        .attr("height", d => chartHeight - yScale(d.value))
        .attr("fill", (d, i) => d.color || this.attrs.color || colorPalette[i % colorPalette.length]);
        
      // Add axes
      g.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${chartHeight})`)
        .call(d3.axisBottom(xScale));
        
      g.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale));
    }
  }

  /**
   * Renders a scatter plot using D3
   * @returns {void}
   */
  renderScatterPlot(){
    const data = this.getData();
    if (!data || data.length === 0) {
      this.renderError("No data provided for scatter plot");
      return;
    }
    const width = parseInt(this.attrs.width) || 400;
    const height = parseInt(this.attrs.height) || 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    // Update SVG dimensions
    this.container.setAttribute("width", width);
    this.container.setAttribute("height", height);
    this.container.setAttribute("viewBox", `0 0 ${width} ${height}`);
    
    const svg = d3.select(this.container);
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Scales
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.x))
      .range([0, chartWidth]);
      
    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.y))
      .range([chartHeight, 0]);
    
    // Add dots
    g.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", this.attrs.radius || 5)
      .attr("fill", this.getColor())
      .attr("opacity", 0.7);
    
    // Add axes
    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale));
      
    g.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale));
  }

  /**
   * Renders a donut chart using D3
   * @returns {void}
   */
  renderDonutChart(){
    const data = this.getData();
    if (!data || data.length === 0) {
      this.renderError("No data provided for donut chart");
      return;
    }
    const width = parseInt(this.attrs.width) || 400;
    const height = parseInt(this.attrs.height) || 400;
    const radius = Math.min(width, height) / 2;
    const innerRadius = radius * 0.5; // Creates the donut hole
    
    // Update SVG dimensions
    this.container.setAttribute("width", width);
    this.container.setAttribute("height", height);
    this.container.setAttribute("viewBox", `0 0 ${width} ${height}`);
    
    const svg = d3.select(this.container);
    const g = svg.append("g")
      .attr("transform", `translate(${width/2},${height/2})`);
    
    // Color scale using CSS variables
    const colorPalette = this.getColorPalette();
    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(colorPalette);
    
    // Pie layout
    const pie = d3.pie()
      .value(d => d.value)
      .sort(null);
    
    // Arc generator
    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(radius);
    
    // Create arcs
    const arcs = g.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");
    
    // Add paths
    arcs.append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.label))
      .attr("stroke", "white")
      .attr("stroke-width", 2);
    
    // Add labels if requested
    if (this.attrs.labels !== 'false') {
      arcs.append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "white")
        .text(d => d.data.label);
    }
  }

  /**
   * Formats JSON content in code blocks for better display
   * @returns {void}
   */
  formatContent() {
    if (this.content && this.content.trim()) {
      try {
        // Try to parse as JSON to validate
        const parsedData = JSON.parse(this.content);
        
        // Format the JSON with proper indentation
        const formattedJson = JSON.stringify(parsedData, null, 2);
        this.innerHTML = "";
        
        const preElement = this.create("pre");
        const codeElement = this.create("code", 
          {class: 'language-json', 
           content: formattedJson
          }, 
        preElement);

      } catch (e) {
        // If it's not valid JSON, don't format it
        this.log("Content is not valid JSON, skipping code formatting");
      }
    }
  }

  /**
   * Gets CSS color variables from the document
   * @returns {Array} Array of color values from CSS variables
   */
  getColorPalette() {
    const computedStyle = getComputedStyle(document.documentElement);
    const colors = [];
    
    // Get the numbered color variables
    for (let i = 1; i <= 12; i++) {
      const colorVar = `--color-${i}`;
      const colorValue = computedStyle.getPropertyValue(colorVar).trim();
      if (colorValue) {
        colors.push(colorValue);
      }
    }
    
    // Fallback to default colors if CSS variables aren't available
    if (colors.length === 0) {
      return [
        '#440154', '#482878', '#3e4989', '#31688e', '#26828e', '#1f9e89',
        '#35b779', '#6ece58', '#8fd744', '#b8de29', '#d8e219', '#fde725'
      ];
    }
    
    return colors;
  }

  /**
   * Gets a single color from CSS variables or attributes
   * @param {string} fallback - Fallback color if no CSS variable or attribute found
   * @returns {string} Color value
   */
  getColor(fallback = null) {
    // Check if user specified a color attribute
    if (this.attrs.color) {
      return this.attrs.color;
    }
    
    const computedStyle = getComputedStyle(document.documentElement);
    
    // Try to get the highlight color first
    const hiColor = computedStyle.getPropertyValue('--hi').trim();
    if (hiColor) {
      return hiColor;
    }
    
    // Fallback to first color in palette or provided fallback
    const palette = this.getColorPalette();
    return fallback || palette[0] || '#007bff';
  }

  /**
   * Gets and parses chart data from attributes or content
   * @returns {Array} Parsed chart data
   */
  getData() {
    let data = [];
    
    // Try to get data from data attribute first
    if (this.attrs.data) {
      try {
        data = JSON.parse(this.attrs.data);
      } catch (e) {
        this.log("Error parsing data attribute: " + e.message);
        return [];
      }
    } 
    // Fallback to parsing content as JSON
    else if (this.content && this.content.trim()) {
      try {
        data = JSON.parse(this.content);
      } catch (e) {
        this.log("Error parsing content as JSON: " + e.message);
        return [];
      }
    }
    // Default sample data if no data provided
    else {
      data = [
        { label: "A", value: 30, x: 1, y: 10 },
        { label: "B", value: 80, x: 2, y: 20 },
        { label: "C", value: 45, x: 3, y: 15 },
        { label: "D", value: 60, x: 4, y: 25 },
        { label: "E", value: 20, x: 5, y: 12 }
      ];
    }
    
    return data;
  }

  /**
   * Renders an error message
   * @param {string} text - The error message to display
   * @returns {void}
   */
  renderError(text){
    this.innerHTML = `<div class="chart-error" style="padding: 20px; text-align: center; color: #dc3545; border: 1px solid #dc3545; border-radius: 4px; background-color: #f8d7da;">
      <strong>Chart Error:</strong> ${text}
    </div>`;
  }
}

customElements.define('dataroom-chart', DataroomChart)
