/**
 * Quicksort implementation in JavaScript
 * 
 * @param {number[]} array - Array of numbers to sort
 * @returns {number[]} - Sorted array in ascending order
 */
function quicksort(array) {
  // Base case: arrays with 0 or 1 element are already sorted
  if (array.length <= 1) {
    return array;
  }
  
  // Choose pivot (middle element)
  const pivotIndex = Math.floor(array.length / 2);
  const pivot = array[pivotIndex];
  
  // Partition array into elements less than, equal to, and greater than pivot
  const less = [];
  const equal = [];
  const greater = [];
  
  for (let i = 0; i < array.length; i++) {
    if (array[i] < pivot) {
      less.push(array[i]);
    } else if (array[i] > pivot) {
      greater.push(array[i]);
    } else {
      equal.push(array[i]);
    }
  }
  
  // Recursively sort less and greater arrays, then concatenate results
  return [...quicksort(less), ...equal, ...quicksort(greater)];
}

// Example usage:
// const unsortedArray = [3, 6, 8, 10, 1, 2, 1];
// const sortedArray = quicksort(unsortedArray);
// console.log(sortedArray); // [1, 1, 2, 3, 6, 8, 10]

// Export for use in other modules
module.exports = quicksort;