
### **2. Functional Programming Paradigm in Clojure**

#### **What is Functional Programming?**
Functional programming (FP) is a paradigm that t#### **Review Questions**
1. What makes a function "pure" in Clojure?
2. How does `comp` differ from `partial` in function composition?
3. Write a function that takes a collection, doubles each number, filters out numbers greater than 10, and sums the result.
4. Why is lazy evaluation useful in functional programming?

#### **Answer Examples**
1. **Pure function characteristics**: A function is "pure" in Clojure if it meets two criteria: (1) it always returns the same output for the same input (deterministic), and (2) it has no side effects (doesn't modify external state, perform I/O, or cause observable changes outside the function).
   ```clojure
   ;; Pure function
   (defn add [x y]
     (+ x y))
   
   ;; Impure function (has side effect)
   (defn print-and-add [x y]
     (println "Adding numbers")  ; side effect
     (+ x y))
   ```

2. **`comp` vs `partial` differences**: `comp` creates a new function by composing multiple functions (right-to-left execution), while `partial` creates a new function by fixing some arguments of an existing function.
   ```clojure
   ;; comp - function composition
   (def square-and-inc (comp inc square))
   (square-and-inc 3) ; => 10 (square 3 = 9, then inc 9 = 10)
   
   ;; partial - partial application
   (def add-five (partial + 5))
   (add-five 3) ; => 8 (equivalent to (+ 5 3))
   ```

3. **Collection processing function**:
   ```clojure
   (defn process-collection [coll]
     (->> coll
          (map #(* % 2))          ; Double each number
          (filter #(<= % 10))     ; Keep numbers <= 10
          (reduce +)))            ; Sum the results
   
   ;; Example usage
   (process-collection [1 2 3 4 5 6]) ; => 20
   ;; Steps: [1 2 3 4 5 6] -> [2 4 6 8 10 12] -> [2 4 6 8 10] -> 30
   ```

4. **Lazy evaluation benefits**: Lazy evaluation allows you to work with potentially infinite sequences without computing all values upfront. It improves memory efficiency by only computing values when needed, enables composition of operations without intermediate collections, and allows for elegant solutions to complex problems.
   ```clojure
   ;; Infinite sequence that's only computed as needed
   (def fibonacci (map first (iterate (fn [[a b]] [b (+ a b)]) [0 1])))
   (take 10 fibonacci) ; => (0 1 1 2 3 5 8 13 21 34)
   
   ;; Lazy operations don't create intermediate collections
   (->> (range 1000000)
        (map inc)
        (filter even?)
        (take 5)) ; Only processes enough elements to get 5 results
   ``` computation as the evaluation of mathematical functions, emphasizing:
- **Pure Functions**: Functions that always produce the same output for the same input and have no side effects (e.g., no mutation, no I/O).
- **Immutability**: Data cannot be changed once created (covered in the previous section).
- **First-Class and Higher-Order Functions**: Functions are treated as values and can be passed as arguments, returned from functions, or stored in variables.
- **Referential Transparency**: Expressions can be replaced with their values without changing the program’s behavior.
- **Declarative Style**: Focus on *what* to compute rather than *how* (contrast with imperative programming’s step-by-step instructions).

Clojure is designed with FP at its core, making it a natural fit for writing concise, predictable, and maintainable code.

#### **Key Principles of FP in Clojure**

1. **Pure Functions**
    - A pure function has no side effects and depends only on its inputs.
    - Example:
      ```clojure
      (defn square [x]
        (* x x))
      (square 3) ; => 9
      ```
        - `square` is pure: it always returns the same result for the same input and doesn’t modify anything outside its scope.
    - Contrast with an impure function:
      ```clojure
      (def counter (atom 0))
      (defn increment-counter []
        (swap! counter inc))
      ```
        - `increment-counter` is impure because it modifies external state (`counter`).

2. **Immutability**
    - As discussed, Clojure’s core data structures (vectors, maps, etc.) are immutable, aligning with FP’s emphasis on avoiding mutable state.
    - Functions operate by producing new data rather than modifying existing data.
    - Example:
      ```clojure
      (defn add-item [coll item]
        (conj coll item))
      (def my-list [1 2 3])
      (add-item my-list 4) ; => [1 2 3 4]
      my-list              ; => [1 2 3] (unchanged)
      ```

3. **First-Class and Higher-Order Functions**
    - Functions are first-class citizens: they can be assigned to variables, passed as arguments, and returned from other functions.
    - Higher-order functions take functions as arguments or return them.
    - Example (Higher-Order Function):
      ```clojure
      (defn apply-twice [f x]
        (f (f x)))
      (apply-twice inc 5) ; => 7 (inc 5 = 6, inc 6 = 7)
      ```
        - `apply-twice` takes a function `f` and applies it to `x` twice.

4. **Function Composition**
    - Clojure encourages combining simple functions to build complex behavior.
    - Common tools: `comp` (composes functions), `partial` (creates partially applied functions).
    - Example:
      ```clojure
      (def square-and-inc (comp inc square))
      (square-and-inc 3) ; => 10 (square 3 = 9, inc 9 = 10)
      ```

5. **Avoiding Side Effects**
    - Clojure encourages isolating side effects (e.g., I/O, state changes) to specific parts of the program, using pure functions for most logic.
    - Managed state (via `atom`, `ref`, etc.) is used when side effects are necessary, but this is separate from FP’s core logic.

6. **Lazy Evaluation and Sequences**
    - Clojure supports lazy evaluation, computing values only when needed, which aligns with FP’s declarative nature.
    - Sequences (`seq`) are a key abstraction for working with collections lazily.
    - Example:
      ```clojure
      (defn infinite-naturals []
        (iterate inc 1))
      (take 5 (infinite-naturals)) ; => (1 2 3 4 5)
      ```
        - `iterate` generates an infinite sequence, but `take` evaluates only the first 5 elements.

#### **Core FP Tools in Clojure**
Clojure provides a rich set of functions to support FP:
- **Map, Filter, Reduce**:
    - `map`: Applies a function to each element of a collection.
      ```clojure
      (map inc [1 2 3]) ; => (2 3 4)
      ```
    - `filter`: Selects elements based on a predicate.
      ```clojure
      (filter even? [1 2 3 4]) ; => (2 4)
      ```
    - `reduce`: Combines elements using a function.
      ```clojure
      (reduce + [1 2 3 4]) ; => 10
      ```
- **Threading Macros** (`->`, `->>`):
    - Simplify function composition by threading data through a series of operations.
    - Example:
      ```clojure
      (->> [1 2 3 4]
           (map inc)
           (filter even?)) ; => (2 4)
      ```
- **Anonymous Functions**:
    - Use `fn` or shorthand `#()` for concise function definitions.
      ```clojure
      (map #(* % %) [1 2 3]) ; => (1 4 9)
      ```
- **Recursion**:
    - FP favors recursion over loops. Clojure provides `recur` for tail-call optimization and `loop` for explicit recursion.
      ```clojure
      (defn factorial [n]
        (loop [n n acc 1]
          (if (<= n 1)
            acc
            (recur (dec n) (* acc n)))))
      (factorial 5) ; => 120
      ```

#### **Benefits of FP in Clojure**
1. **Predictability**: Pure functions make code easier to reason about and test.
2. **Concurrency**: Immutability and pure functions simplify concurrent programming.
3. **Modularity**: Small, composable functions are reusable and maintainable.
4. **Expressiveness**: Declarative style with tools like `map`, `filter`, and threading macros leads to concise code.

#### **Practical Example**
Let’s process a collection of numbers using FP principles:
```clojure
(def numbers [1 2 3 4 5 6])

(defn process-numbers [coll]
  (->> coll
       (map #(* % %))           ; Square each number
       (filter even?)           ; Keep even numbers
       (reduce +)))             ; Sum the results

(process-numbers numbers) ; => 20 (2^2 + 4^2 = 4 + 16 = 20)
```
- This is pure, declarative, and composes small functions to achieve the result.

#### **Gotchas and Tips**
1. **Avoiding Impurity**: Be cautious with functions that cause side effects (e.g., `println`, `swap!`). Reserve them for specific cases.
2. **Lazy Evaluation Pitfalls**: Lazy sequences can lead to unexpected behavior if not forced (e.g., with `doall`) when side effects are involved.
3. **Performance**: Recursion is elegant but can be less efficient than imperative loops for very large datasets; use `recur` to optimize.
4. **Learning Curve**: FP requires a mindset shift from imperative programming, but Clojure’s tools make it approachable.

#### **Review Questions**
1. What makes a function “pure” in Clojure?
2. How does `comp` differ from `partial` in function composition?
3. Write a function that takes a collection, doubles each number, filters out numbers greater than 10, and sums the result.
4. Why is lazy evaluation useful in functional programming?
