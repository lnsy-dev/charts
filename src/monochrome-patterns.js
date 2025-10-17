/**
 * Monochrome patterns for cross-hatching chart elements
 * Provides clean SVG pattern definitions for use in D3 charts
 */

/**
 * Creates an SVG pattern definition for cross-hatching
 * @param {string} id - Unique identifier for the pattern
 * @param {string} type - Type of pattern (diagonal, horizontal, vertical, dots, cross)
 * @param {number} spacing - Spacing between pattern elements (default: 4)
 * @param {number} strokeWidth - Width of pattern strokes (default: 1)
 * @param {string} color - Color of the pattern strokes (default: 'black')
 * @param {string} background - Background color (default: 'white')
 * @returns {SVGPatternElement} SVG pattern element
 */
export function createPattern(id, type, spacing = 4, strokeWidth = 1, color = 'black', background = 'white') {
  const svgNS = "http://www.w3.org/2000/svg";
  const pattern = document.createElementNS(svgNS, 'pattern');
  
  pattern.setAttribute('id', id);
  pattern.setAttribute('patternUnits', 'userSpaceOnUse');
  pattern.setAttribute('width', spacing * 2);
  pattern.setAttribute('height', spacing * 2);
  
  // Background rectangle
  const bg = document.createElementNS(svgNS, 'rect');
  bg.setAttribute('width', spacing * 2);
  bg.setAttribute('height', spacing * 2);
  bg.setAttribute('fill', background);
  pattern.appendChild(bg);
  
  // Create pattern elements based on type
  switch (type) {
    case 'diagonal':
      createDiagonalStripes(pattern, spacing, strokeWidth, color, svgNS);
      break;
    case 'horizontal-stripes':
      createHorizontalStripes(pattern, spacing, strokeWidth, color, svgNS);
      break;
    case 'vertical-stripes':
      createVerticalStripes(pattern, spacing, strokeWidth, color, svgNS);
      break;
    case 'cross-hatch':
      createTrueCrossHatch(pattern, spacing, strokeWidth, color, svgNS);
      break;
    case 'dots':
      createDots(pattern, spacing, strokeWidth, color, svgNS);
      break;
    case 'circles':
      createCircles(pattern, spacing, strokeWidth, color, svgNS);
      break;
    case 'hounds-tooth':
      createHoundsTooth(pattern, spacing, strokeWidth, color, background, svgNS);
      break;
    default:
      createDiagonalStripes(pattern, spacing, strokeWidth, color, svgNS);
  }
  
  return pattern;
}

/**
 * Creates diagonal stripe pattern elements
 */
function createDiagonalStripes(pattern, spacing, strokeWidth, color, svgNS) {
  const size = spacing * 2;
  const path = document.createElementNS(svgNS, 'path');
  path.setAttribute('d', `M-1,1 l2,-2 M0,${size} l${size},-${size} M${size-1},${size+1} l2,-2`);
  path.setAttribute('stroke', color);
  path.setAttribute('stroke-width', strokeWidth);
  pattern.appendChild(path);
}

/**
 * Creates horizontal stripe pattern elements
 */
function createHorizontalStripes(pattern, spacing, strokeWidth, color, svgNS) {
  const size = spacing * 2;
  // Create multiple horizontal lines for better coverage
  for (let y = 0; y <= size; y += spacing) {
    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', '0');
    line.setAttribute('y1', y);
    line.setAttribute('x2', size);
    line.setAttribute('y2', y);
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', strokeWidth);
    pattern.appendChild(line);
  }
}

/**
 * Creates vertical stripe pattern elements
 */
function createVerticalStripes(pattern, spacing, strokeWidth, color, svgNS) {
  const size = spacing * 2;
  // Create multiple vertical lines for better coverage
  for (let x = 0; x <= size; x += spacing) {
    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', x);
    line.setAttribute('y1', '0');
    line.setAttribute('x2', x);
    line.setAttribute('y2', size);
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', strokeWidth);
    pattern.appendChild(line);
  }
}

/**
 * Creates cross-hatch pattern elements (simplified diagonal only) 
 * This creates the same as diagonal stripes for cleaner appearance
 */
function createCrossHatch(pattern, spacing, strokeWidth, color, svgNS) {
  // Use the same as diagonal stripes for consistency
  createDiagonalStripes(pattern, spacing, strokeWidth, color, svgNS);
}

/**
 * Creates true cross-hatch pattern elements (both diagonals)
 */
function createTrueCrossHatch(pattern, spacing, strokeWidth, color, svgNS) {
  const size = spacing * 2;
  
  // First diagonal (top-left to bottom-right)
  const path1 = document.createElementNS(svgNS, 'path');
  path1.setAttribute('d', `M-1,1 l2,-2 M0,${size} l${size},-${size} M${size-1},${size+1} l2,-2`);
  path1.setAttribute('stroke', color);
  path1.setAttribute('stroke-width', strokeWidth);
  pattern.appendChild(path1);
  
  // Second diagonal (top-right to bottom-left)
  const path2 = document.createElementNS(svgNS, 'path');
  path2.setAttribute('d', `M${size+1},1 l-2,-2 M${size},${size} l-${size},-${size} M1,${size+1} l-2,-2`);
  path2.setAttribute('stroke', color);
  path2.setAttribute('stroke-width', strokeWidth);
  pattern.appendChild(path2);
}

/**
 * Creates dot pattern elements (small filled circles)
 */
function createDots(pattern, spacing, strokeWidth, color, svgNS) {
  const circle = document.createElementNS(svgNS, 'circle');
  circle.setAttribute('cx', spacing);
  circle.setAttribute('cy', spacing);
  circle.setAttribute('r', strokeWidth);
  circle.setAttribute('fill', color);
  pattern.appendChild(circle);
}

/**
 * Creates circle pattern elements (larger outlined circles)
 */
function createCircles(pattern, spacing, strokeWidth, color, svgNS) {
  const circle = document.createElementNS(svgNS, 'circle');
  circle.setAttribute('cx', spacing);
  circle.setAttribute('cy', spacing);
  circle.setAttribute('r', spacing * 0.4);
  circle.setAttribute('fill', 'none');
  circle.setAttribute('stroke', color);
  circle.setAttribute('stroke-width', strokeWidth);
  pattern.appendChild(circle);
}

/**
 * Creates hounds tooth pattern elements
 */
function createHoundsTooth(pattern, spacing, strokeWidth, color, background, svgNS) {
  const size = spacing * 2;
  
  // Create hounds tooth shape using path
  const path = document.createElementNS(svgNS, 'path');
  const d = `M0,0 L${spacing},0 L${spacing},${spacing} L0,${spacing} Z 
             M${spacing},${spacing} L${size},${spacing} L${size},${size} L${spacing},${size} Z`;
  path.setAttribute('d', d);
  path.setAttribute('fill', color);
  pattern.appendChild(path);
  
  // Add the complementary hounds tooth shapes
  const path2 = document.createElementNS(svgNS, 'path');
  const d2 = `M${spacing},0 L${size},0 L${size},${spacing} L${spacing},${spacing} Z 
              M0,${spacing} L${spacing},${spacing} L${spacing},${size} L0,${size} Z`;
  path2.setAttribute('d', d2);
  path2.setAttribute('fill', background);
  path2.setAttribute('stroke', color);
  path2.setAttribute('stroke-width', strokeWidth * 0.5);
  pattern.appendChild(path2);
}

/**
 * Creates grid pattern elements
 */
function createGrid(pattern, spacing, strokeWidth, color, svgNS) {
  createHorizontalStripes(pattern, spacing, strokeWidth, color, svgNS);
  createVerticalStripes(pattern, spacing, strokeWidth, color, svgNS);
}

/**
 * Predefined pattern configurations for easy use
 */
export const monochromePatterns = {
  // Default is diagonal stripes with varying densities (12 variations)
  default: [
    { type: 'diagonal', spacing: 2, strokeWidth: 0.5 },   // Very dense, thin
    { type: 'diagonal', spacing: 3, strokeWidth: 0.5 },   // Dense, thin
    { type: 'diagonal', spacing: 4, strokeWidth: 0.5 },   // Medium-dense, thin
    { type: 'diagonal', spacing: 5, strokeWidth: 0.5 },   // Medium, thin
    { type: 'diagonal', spacing: 6, strokeWidth: 0.5 },   // Medium-sparse, thin
    { type: 'diagonal', spacing: 8, strokeWidth: 0.5 },   // Sparse, thin
    { type: 'diagonal', spacing: 2, strokeWidth: 1 },     // Very dense, medium
    { type: 'diagonal', spacing: 3, strokeWidth: 1 },     // Dense, medium
    { type: 'diagonal', spacing: 4, strokeWidth: 1 },     // Medium-dense, medium
    { type: 'diagonal', spacing: 5, strokeWidth: 1 },     // Medium, medium
    { type: 'diagonal', spacing: 6, strokeWidth: 1 },     // Medium-sparse, medium
    { type: 'diagonal', spacing: 8, strokeWidth: 1 }      // Sparse, medium
  ],
  
  diagonal: [
    { type: 'diagonal', spacing: 2, strokeWidth: 0.5 },
    { type: 'diagonal', spacing: 3, strokeWidth: 0.5 },
    { type: 'diagonal', spacing: 4, strokeWidth: 0.5 },
    { type: 'diagonal', spacing: 5, strokeWidth: 0.5 },
    { type: 'diagonal', spacing: 6, strokeWidth: 0.5 },
    { type: 'diagonal', spacing: 8, strokeWidth: 0.5 },
    { type: 'diagonal', spacing: 2, strokeWidth: 1 },
    { type: 'diagonal', spacing: 3, strokeWidth: 1 },
    { type: 'diagonal', spacing: 4, strokeWidth: 1 },
    { type: 'diagonal', spacing: 5, strokeWidth: 1 },
    { type: 'diagonal', spacing: 6, strokeWidth: 1 },
    { type: 'diagonal', spacing: 8, strokeWidth: 1 }
  ],
  
  'horizontal-stripes': [
    { type: 'horizontal-stripes', spacing: 2, strokeWidth: 0.5 },
    { type: 'horizontal-stripes', spacing: 3, strokeWidth: 0.5 },
    { type: 'horizontal-stripes', spacing: 4, strokeWidth: 0.5 },
    { type: 'horizontal-stripes', spacing: 5, strokeWidth: 0.5 },
    { type: 'horizontal-stripes', spacing: 6, strokeWidth: 0.5 },
    { type: 'horizontal-stripes', spacing: 8, strokeWidth: 0.5 },
    { type: 'horizontal-stripes', spacing: 2, strokeWidth: 1 },
    { type: 'horizontal-stripes', spacing: 3, strokeWidth: 1 },
    { type: 'horizontal-stripes', spacing: 4, strokeWidth: 1 },
    { type: 'horizontal-stripes', spacing: 5, strokeWidth: 1 },
    { type: 'horizontal-stripes', spacing: 6, strokeWidth: 1 },
    { type: 'horizontal-stripes', spacing: 8, strokeWidth: 1 }
  ],
  
  'vertical-stripes': [
    { type: 'vertical-stripes', spacing: 2, strokeWidth: 0.5 },
    { type: 'vertical-stripes', spacing: 3, strokeWidth: 0.5 },
    { type: 'vertical-stripes', spacing: 4, strokeWidth: 0.5 },
    { type: 'vertical-stripes', spacing: 5, strokeWidth: 0.5 },
    { type: 'vertical-stripes', spacing: 6, strokeWidth: 0.5 },
    { type: 'vertical-stripes', spacing: 8, strokeWidth: 0.5 },
    { type: 'vertical-stripes', spacing: 2, strokeWidth: 1 },
    { type: 'vertical-stripes', spacing: 3, strokeWidth: 1 },
    { type: 'vertical-stripes', spacing: 4, strokeWidth: 1 },
    { type: 'vertical-stripes', spacing: 5, strokeWidth: 1 },
    { type: 'vertical-stripes', spacing: 6, strokeWidth: 1 },
    { type: 'vertical-stripes', spacing: 8, strokeWidth: 1 }
  ],
  
  'cross-hatch': [
    { type: 'cross-hatch', spacing: 4, strokeWidth: 0.5 },
    { type: 'cross-hatch', spacing: 5, strokeWidth: 0.5 },
    { type: 'cross-hatch', spacing: 6, strokeWidth: 0.5 },
    { type: 'cross-hatch', spacing: 7, strokeWidth: 0.5 },
    { type: 'cross-hatch', spacing: 8, strokeWidth: 0.5 },
    { type: 'cross-hatch', spacing: 10, strokeWidth: 0.5 },
    { type: 'cross-hatch', spacing: 4, strokeWidth: 1 },
    { type: 'cross-hatch', spacing: 5, strokeWidth: 1 },
    { type: 'cross-hatch', spacing: 6, strokeWidth: 1 },
    { type: 'cross-hatch', spacing: 7, strokeWidth: 1 },
    { type: 'cross-hatch', spacing: 8, strokeWidth: 1 },
    { type: 'cross-hatch', spacing: 10, strokeWidth: 1 }
  ],
  
  dots: [
    { type: 'dots', spacing: 4, strokeWidth: 1 },
    { type: 'dots', spacing: 5, strokeWidth: 1 },
    { type: 'dots', spacing: 6, strokeWidth: 1 },
    { type: 'dots', spacing: 7, strokeWidth: 1 },
    { type: 'dots', spacing: 8, strokeWidth: 1 },
    { type: 'dots', spacing: 10, strokeWidth: 1 },
    { type: 'dots', spacing: 4, strokeWidth: 1.5 },
    { type: 'dots', spacing: 5, strokeWidth: 1.5 },
    { type: 'dots', spacing: 6, strokeWidth: 1.5 },
    { type: 'dots', spacing: 7, strokeWidth: 1.5 },
    { type: 'dots', spacing: 8, strokeWidth: 1.5 },
    { type: 'dots', spacing: 10, strokeWidth: 1.5 }
  ],
  
  circles: [
    { type: 'circles', spacing: 4, strokeWidth: 0.5 },
    { type: 'circles', spacing: 5, strokeWidth: 0.5 },
    { type: 'circles', spacing: 6, strokeWidth: 0.5 },
    { type: 'circles', spacing: 7, strokeWidth: 0.5 },
    { type: 'circles', spacing: 8, strokeWidth: 0.5 },
    { type: 'circles', spacing: 10, strokeWidth: 0.5 },
    { type: 'circles', spacing: 4, strokeWidth: 1 },
    { type: 'circles', spacing: 5, strokeWidth: 1 },
    { type: 'circles', spacing: 6, strokeWidth: 1 },
    { type: 'circles', spacing: 7, strokeWidth: 1 },
    { type: 'circles', spacing: 8, strokeWidth: 1 },
    { type: 'circles', spacing: 10, strokeWidth: 1 }
  ],
  
  'hounds-tooth': [
    { type: 'hounds-tooth', spacing: 3, strokeWidth: 0.5 },
    { type: 'hounds-tooth', spacing: 4, strokeWidth: 0.5 },
    { type: 'hounds-tooth', spacing: 5, strokeWidth: 0.5 },
    { type: 'hounds-tooth', spacing: 6, strokeWidth: 0.5 },
    { type: 'hounds-tooth', spacing: 7, strokeWidth: 0.5 },
    { type: 'hounds-tooth', spacing: 8, strokeWidth: 0.5 },
    { type: 'hounds-tooth', spacing: 3, strokeWidth: 1 },
    { type: 'hounds-tooth', spacing: 4, strokeWidth: 1 },
    { type: 'hounds-tooth', spacing: 5, strokeWidth: 1 },
    { type: 'hounds-tooth', spacing: 6, strokeWidth: 1 },
    { type: 'hounds-tooth', spacing: 7, strokeWidth: 1 },
    { type: 'hounds-tooth', spacing: 8, strokeWidth: 1 }
  ]
};

/**
 * Gets a pattern configuration by index from a specific pattern type
 * @param {number} index - Index of the pattern to retrieve
 * @param {string} patternType - Type of pattern ('default', 'diagonal', 'horizontal', 'vertical', 'dots', 'grid')
 * @returns {Object} Pattern configuration
 */
export function getPatternByIndex(index, patternType = 'default') {
  const patterns = monochromePatterns[patternType] || monochromePatterns.default;
  return patterns[index % patterns.length];
}

export default monochromePatterns;
