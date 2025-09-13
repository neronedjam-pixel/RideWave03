const quicksort = require('./quicksort');

// Test cases
console.log('Testing quicksort implementation:\n');

// Test 1: Regular array
const test1 = [3, 6, 8, 10, 1, 2, 1];
console.log('Test 1 - Unsorted:', test1);
console.log('Test 1 - Sorted:', quicksort(test1));
console.log('Test 1 - Passed:', JSON.stringify(quicksort(test1)) === JSON.stringify([1, 1, 2, 3, 6, 8, 10]));
console.log('');

// Test 2: Empty array
const test2 = [];
console.log('Test 2 - Unsorted:', test2);
console.log('Test 2 - Sorted:', quicksort(test2));
console.log('Test 2 - Passed:', JSON.stringify(quicksort(test2)) === JSON.stringify([]));
console.log('');

// Test 3: Single element
const test3 = [5];
console.log('Test 3 - Unsorted:', test3);
console.log('Test 3 - Sorted:', quicksort(test3));
console.log('Test 3 - Passed:', JSON.stringify(quicksort(test3)) === JSON.stringify([5]));
console.log('');

// Test 4: Already sorted
const test4 = [1, 2, 3, 4, 5];
console.log('Test 4 - Unsorted:', test4);
console.log('Test 4 - Sorted:', quicksort(test4));
console.log('Test 4 - Passed:', JSON.stringify(quicksort(test4)) === JSON.stringify([1, 2, 3, 4, 5]));
console.log('');

// Test 5: Reverse sorted
const test5 = [5, 4, 3, 2, 1];
console.log('Test 5 - Unsorted:', test5);
console.log('Test 5 - Sorted:', quicksort(test5));
console.log('Test 5 - Passed:', JSON.stringify(quicksort(test5)) === JSON.stringify([1, 2, 3, 4, 5]));
console.log('');

// Test 6: Array with duplicates
const test6 = [4, 2, 7, 2, 1, 4, 9];
console.log('Test 6 - Unsorted:', test6);
console.log('Test 6 - Sorted:', quicksort(test6));
console.log('Test 6 - Passed:', JSON.stringify(quicksort(test6)) === JSON.stringify([1, 2, 2, 4, 4, 7, 9]));