import { supabase } from './supabase'

let snippets = [];
let usedSnippets = new Set();

export async function loadSnippets() {
  const { data, error } = await supabase
    .from('snippets')
    .select('*')
  
  if (error) {
    console.error('Error loading snippets:', error);
    return;
  }
  
  snippets = data;
}

export function getRandomSnippet() {
  if (usedSnippets.size === snippets.length) {
    usedSnippets.clear();
  }

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * snippets.length);
  } while (usedSnippets.has(randomIndex));

  usedSnippets.add(randomIndex);
  return snippets[randomIndex];
}

function normalizeComplexity(complexity) {
  return complexity.toLowerCase().replace(/\s+/g, '').replace(/^o\(|\)$/g, '').replace(/logn/g, 'log(n)');
}

export function checkAnswer(snippet, timeComplexity, spaceComplexity) {
  const normalizedTime = normalizeComplexity(timeComplexity);
  const normalizedSpace = normalizeComplexity(spaceComplexity);
  const correctTime = normalizeComplexity(snippet.time_complexity);
  const correctSpace = normalizeComplexity(snippet.space_complexity);

  return normalizedTime === correctTime && normalizedSpace === correctSpace;
}

export function resetUsedSnippets() {
  usedSnippets.clear();
}


// const snippets = [
    //     {
    //       code: `def linear_search(arr, target):
    //     for i in range(len(arr)):
    //         if arr[i] == target:
    //             return i
    //     return -1`,
    //       timeComplexity: 'O(n)',
    //       spaceComplexity: 'O(1)'
    //     },
    //     {
    //       code: `def binary_search(arr, target):
    //     left = 0
    //     right = len(arr) - 1
    //     while left <= right:
    //         mid = (left + right) // 2
    //         if arr[mid] == target:
    //             return mid
    //         if arr[mid] < target:
    //             left = mid + 1
    //         else:
    //             right = mid - 1
    //     return -1`,
    //       timeComplexity: 'O(log n)',
    //       spaceComplexity: 'O(1)'
    //     },
    //     {
    //       code: `def bubble_sort(arr):
    //     n = len(arr)
    //     for i in range(n):
    //         for j in range(0, n - i - 1):
    //             if arr[j] > arr[j + 1]:
    //                 arr[j], arr[j + 1] = arr[j + 1], arr[j]
    //     return arr`,
    //       timeComplexity: 'O(n^2)',
    //       spaceComplexity: 'O(1)'
    //     },
    //     {
    //       code: `def fibonacci(n):
    //     if n <= 1:
    //         return n
    //     return fibonacci(n - 1) + fibonacci(n - 2)`,
    //       timeComplexity: 'O(2^n)',
    //       spaceComplexity: 'O(n)'
    //     },
    //     {
    //       code: `def merge_sort(arr):
    //     if len(arr) <= 1:
    //         return arr
    //     mid = len(arr) // 2
    //     left = merge_sort(arr[:mid])
    //     right = merge_sort(arr[mid:])
    //     return merge(left, right)
    
    // def merge(left, right):
    //     result = []
    //     left_index, right_index = 0, 0
    //     while left_index < len(left) and right_index < len(right):
    //         if left[left_index] < right[right_index]:
    //             result.append(left[left_index])
    //             left_index += 1
    //         else:
    //             result.append(right[right_index])
    //             right_index += 1
    //     result.extend(left[left_index:])
    //     result.extend(right[right_index:])
    //     return result`,
    //       timeComplexity: 'O(n log n)',
    //       spaceComplexity: 'O(n)'
    //     },
    //     {
    //       code: `def two_sum(nums, target):
    //     num_map = {}
    //     for i, num in enumerate(nums):
    //         complement = target - num
    //         if complement in num_map:
    //             return [num_map[complement], i]
    //         num_map[num] = i
    //     return []`,
    //       timeComplexity: 'O(n)',
    //       spaceComplexity: 'O(n)'
    //     },
    //     {
    //       code: `def quick_sort(arr):
    //     if len(arr) <= 1:
    //         return arr
    //     pivot = arr[-1]
    //     left = [x for x in arr[:-1] if x < pivot]
    //     right = [x for x in arr[:-1] if x >= pivot]
    //     return quick_sort(left) + [pivot] + quick_sort(right)`,
    //       timeComplexity: 'O(n log n)',
    //       spaceComplexity: 'O(log n)'
    //     },
    //     {
    //       code: `def counting_sort(arr, max_val):
    //     count = [0] * (max_val + 1)
    //     for num in arr:
    //         count[num] += 1
    //     sorted_arr = []
    //     for i in range(max_val + 1):
    //         sorted_arr.extend([i] * count[i])
    //     return sorted_arr`,
    //       timeComplexity: 'O(n + k)',
    //       spaceComplexity: 'O(k)'
    //     }
    //   ];
    