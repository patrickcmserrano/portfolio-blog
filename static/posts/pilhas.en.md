# **Stacks: A Fundamental Data Structure in Programming**

The **stack** is an essential data structure in computer science, widely used in various areas of programming. Imagine it as a tower of trays in a cafeteria: you can add or remove trays **only from the top**. This behavior illustrates the **LIFO (Last In, First Out)** principle, where the last element inserted is the first to be removed.

In this post, we explore the concept of stacks, their basic operations, a practical implementation in Java, and their various applications. If you're starting in programming or preparing for technical challenges, mastering stacks is an important step.

---

## **What is a Stack?**

A stack is a **linear** data structure where elements are organized in sequence. Its particularity is that all insertion and removal operations happen **at the same point – the top**. This characteristic facilitates data management where the processing order needs to be the reverse of the arrival order.

### **Examples of the LIFO Principle**

- **Stack of plates**: You stack new plates on top, and when you need a plate, you always take the one on top.
- **Browser history**: When clicking "back", the browser accesses the most recent page, which was the last to be loaded.

---

## **Basic Stack Operations**

To manipulate a stack, we use a standard set of operations:

| Operation                    | Description                                                                                 | Usage Example                                  | Complexity |
| --------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------- | ---------- |
| **Push**                    | Adds a new element to the top of the stack, if there's space.                             | Insert a new urgent task                       | O(1)       |
| **Pop**                     | Removes and returns the element from the top of the stack, if it's not empty.             | Execute the last added task                    | O(1)       |
| **Check if Empty**          | Checks if the stack contains no elements.                                                 | Validate if the task list is empty            | O(1)       |
| **Check if Full**           | Confirms if the stack has reached its maximum capacity (useful in fixed-size implementations). | Check if there's space for new tasks          | O(1)       |
| **Top Element (Peek)**      | Returns the top element without removing it.                                              | Check which will be the next executed task    | O(1)       |
| **Show All Elements**       | Displays all elements stored in the stack from top to bottom.                             | List all pending tasks                         | O(n)       |

Each of these operations is fundamental for efficient manipulation of data stored in the stack.

---

## **Stack Implementation in Java**

Although the Java language provides the `java.util.Stack` class, understanding the internal implementation is essential to solidify understanding of how stacks work. Below is a simple example with a fixed array that demonstrates the basic operations:

```java
class Stack {
    private int[] elements;  // Array to store elements
    private int top;         // Index of the top element of the stack
    private int capacity;    // Maximum size of the stack

    // Constructor: initializes the stack with a fixed size
    public Stack(int size) {
        this.capacity = size;
        this.elements = new int[size];
        this.top = -1; // Stack starts empty
    }

    // Checks if the stack is empty
    public boolean isEmpty() {
        return top == -1;
    }

    // Checks if the stack is full
    public boolean isFull() {
        return top >= capacity - 1;
    }

    // Push: adds an element to the top
    public void push(int value) {
        if (isFull()) {
            System.out.println("Error: Stack overflow!");
        } else {
            elements[++top] = value;
        }
    }

    // Pop: removes and returns the top element
    public int pop() {
        if (isEmpty()) {
            System.out.println("Error: Stack underflow!");
            return -1; // Sentinel value to indicate error
        } else {
            return elements[top--];
        }
    }

    // Returns the top element without removing it
    public int peek() {
        if (isEmpty()) {
            System.out.println("Error: Stack is empty!");
            return -1;
        } else {
            return elements[top];
        }
    }

    // Displays all stack elements from top to bottom
    public void display() {
        if (isEmpty()) {
            System.out.println("Stack is empty!");
        } else {
            System.out.println("Stack elements:");
            for (int i = top; i >= 0; i--) {
                System.out.print(elements[i] + " ");
            }
            System.out.println();
        }
    }
}

// Usage example
public class Main {
    public static void main(String[] args) {
        Stack stack = new Stack(5); // Creates a stack with capacity for 5 elements

        // Adds elements to the stack
        stack.push(10);
        stack.push(20);
        stack.push(30);

        // Displays the stack and the top element
        stack.display();                           // Output: 30 20 10
        System.out.println("Top: " + stack.peek()); // Output: 30

        // Removes the top element and displays the stack again
        stack.pop();
        stack.display();                           // Output: 20 10
    }
}
```

This example illustrates how the operations of pushing, popping, checking if the stack is full or empty, and displaying the top element are implemented and work in an integrated manner.

---

## **Practical Applications of Stacks**

Stacks are extremely versatile and are employed in various areas:

- **In Programming**:

  - **Browser History:** Browsers store visited pages using stacks, facilitating the "back" feature.
  - **Undo Function:** Text editors and graphic software use stacks to reverse recent actions.
  - **Compilers and Expression Evaluation:** Stacks are used to manage function calls and convert expressions from infix to postfix.
  - **Depth-First Search (DFS):** Graph algorithms use stacks to explore different paths.

- **In Daily Life**:
  - **Stack of Plates:** Only the plate on top can be removed or added.
  - **Task Management:** In certain systems, the most recent tasks are prioritized using a stack-based approach.

---

## **Why Learn About Stacks?**

Understanding stacks is crucial for any programmer because:

- They have simple logic, yet extremely powerful, for solving problems involving reverse order of data.
- They are frequently covered in technical interviews and are used in various areas of computing.
- Stack implementation helps master fundamental concepts like memory management, flow control (recursion), and data structures.

---

## **Conclusion**

Stacks, guided by the LIFO principle, are indispensable in programming. Their basic operations — push, pop, check if the stack is full or empty, view the top element, and display all elements — are simple to understand and implement, but offer powerful solutions to complex problems. Whether using the ready-made class in Java or creating your own structure, knowledge about stacks opens doors to solving numerous challenges in computing.

Try implementing a stack and integrating it into your projects. With practice and exploration, you'll discover how this structure can transform your problem-solving approach. Code, test, and keep exploring! 🚀
