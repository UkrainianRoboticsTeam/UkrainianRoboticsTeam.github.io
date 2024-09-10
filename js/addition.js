// Initialize the rotation angle
let angle = 0;

/**
 * Rotates the spinner element by 45 degrees on the Y-axis.
 * @param {boolean} sign - Determines the direction of the rotation.
 *                        - If `true`, rotates counterclockwise (negative direction).
 *                        - If `false` or omitted, rotate clockwise (positive direction).
 */
function galleryspin(sign) {
  // Select the spinner element by its ID
  let spinner = document.querySelector("#spinner");

  // Adjust the angle based on the direction
  if (sign) {
    angle -= 45;  // Counterclockwise rotation
  } else {
    angle += 45;  // Clockwise rotation
  }

  // Apply the rotation using CSS transform with vendor prefixes
  spinner.style.transform = "rotateY(" + angle + "deg)";
  spinner.style.webkitTransform = "rotateY(" + angle + "deg)"; // For older Safari versions
  spinner.style.mozTransform = "rotateY(" + angle + "deg)";    // For older Firefox versions
}
