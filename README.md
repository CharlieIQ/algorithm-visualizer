# Algorithm Visualizer
*Made by [CharlieIQ](https://www.linkedin.com/in/charlie-mclaughlin-s13/)*

A React + TypeScript web app that visualizes sorting algorithms with animations, step-by-step controls, and a code editor for custom algorithms.

![Algorithm Visualizer](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/TailwindCSS-3.3-blue) ![Vite](https://img.shields.io/badge/Vite-4-green)


## Complete Algorithm Library

The site includes a wide variety of sorting algorithms, organized into categories:

- **Efficient Algorithms (O(n log n))**: Fast sorts like Quick Sort, Merge Sort, Heap Sort, and Tim Sort.
- **Simple Algorithms (O(n²))**: Classic sorts such as Bubble Sort, Selection Sort, and Insertion Sort.
- **Improved Simple Algorithms**: Enhanced versions of basics, including Shell Sort, Comb Sort, and Cocktail Sort.
- **Specialized Algorithms**: Non comparison sorts like Counting Sort, Radix Sort, and Bucket Sort for specific data types.
- **Funny Algorithms**: Algorithms that I found funny like Gnome Sort, Pancake Sort, Bogo Sort, and more.

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CharlieIQ/algorithm-visualizer.git
   cd algorithm-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5173/
   ```

## Algorithm Visualizer For Dummies

### Step 1: Understanding the Interface

When you first open the application, you'll see:
- **Header**: Title and description of the app
- **Main Panel**: Array visualization, controls, and code editor
- **Sidebar**: Algorithm selection panel

### Step 2: Generate or Edit Your Array

#### Option A: Generate Random Array
1. Click the **"Generate Random"** button in the top-right of the visualization panel
2. This creates a new array with 15 random elements (values 5-85)

#### Option B: Edit Array Values Manually
1. Look at the input fields below each bar in the visualization
2. Click on any input field and type a new number (1-100)
3. The bar will update in real-time to reflect your changes

### Step 3: Select a Sorting Algorithm

1. Look at the **Algorithm Library** panel on the right sidebar
2. **Search algorithms** using the search bar at the top
3. **Filter by category** using the filter buttons:
   - **All**: View all 12 algorithms
   - **Efficient**: O(n log n) algorithms for production use
   - **Simple**: O(n²) algorithms great for learning
   - **Improved**: Enhanced versions of simple algorithms
   - **Unusual**: Educational and interesting algorithms

4. **Click on any algorithm card** to select it - the card will highlight with a blue border

5. **Use the info and code buttons**:
   - **ℹ️ Info button**: Shows detailed explanation, complexity analysis, and when to use the algorithm
   - **View Code button**: Shows the complete JavaScript implementation

### Step 4: Learn About Algorithms

**Info Button (ℹ️)**: Click the blue info button on any algorithm to see:
- Detailed description of how the algorithm works
- Time and space complexity explanation
- Step-by-step breakdown of the algorithm's approach
- When and why you'd use this algorithm
- Quick access to try the algorithm or view its code

### Step 5: Control the Animation

#### Basic Controls
- **Play**: Start the sorting animation
- **Pause**: Stop the animation at the current step
- **Reset**: Go back to the first step of the algorithm

#### Step-by-Step Navigation
- **← Step**: Go backward one step in the algorithm
- **Step →**: Go forward one step in the algorithm

#### Speed Control
- Use the **Speed dropdown** to adjust animation timing:
  - **Slow**: 1000ms between steps
  - **Normal**: 500ms between steps  
  - **Fast**: 250ms between steps
  - **Very Fast**: 100ms between steps

### Step 6: Understanding the Visualization

#### Color Coding
- 🔵 **Blue bars**: Default/unsorted elements
- 🟡 **Yellow bars**: Elements currently being compared
- 🔴 **Red bars**: Elements being swapped
- 🟢 **Green bars**: Elements in their final sorted position

#### Step Information
- Watch the **blue information box** below the visualization
- It shows the current step number and describes what's happening
- Example: "Comparing elements at positions 2 and 3: 45 vs 23"

### Step 7: Write Custom Algorithms

1. **Scroll down** to the **Custom Algorithm** section
2. **Insert Template**: Click this button to get a basic sorting algorithm template
3. **Adjust Height**: Use the height dropdown to make the editor larger/smaller (Small, Medium, Large, Extra Large)
4. **Write Your Code**: 
   - Your function must be named `customSort`
   - It should take an array parameter: `function customSort(arr)`
   - Return the sorted array
   - Example:
     ```javascript
     function customSort(arr) {
       // Your algorithm here
       return arr.sort((a, b) => a - b);
     }
     ```
5. **Run Code**: Click the "Run Code" button to execute your algorithm
6. The visualization will update to show your sorted result

### Step 8: Learn from Preset Algorithms

1. **Select any preset algorithm** (Step 3)
2. **Click the ℹ️ info button** to learn about the algorithm in detail
3. **Click "View Code"** to see the implementation
4. **Study the code** in the modal that appears
5. **Close the modal** and try the algorithm with the controls
6. **Watch step-by-step** to understand how the code translates to visual steps

## Technologies Used

- **React 18**
- **TypeScript 5**
- **Vite**
- **Tailwind CSS 3.3**
- **Modern JavaScript**

*Build with love, Copilot, and lots of LeetCode practice*