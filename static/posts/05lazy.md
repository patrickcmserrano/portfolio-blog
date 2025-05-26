### **5. Lazy Evaluation in Clojure**

#### **What is Lazy Evaluation?**
- **Definition**: Lazy evaluation is a strategy where expressions are not evaluated until their results are needed. In Clojure, this applies to **sequences**, allowing computations to be deferred and performed incrementally, which is especially useful for large or infinite data sets.
- **Key Idea**: Lazy evaluation enables efficient processing by computing only the elements required, avoiding unnecessary work and memory usage.

#### **How Lazy Evaluation Works in Clojure**
- Clojure’s **sequences** (introduced in the previous section) are inherently lazy when produced by functions like `range`, `iterate`, `map`, `filter`, or `repeat`.
- A lazy sequence is a promise to compute elements, but actual computation happens only when the sequence is **realized** (e.g., by accessing elements, printing, or forcing evaluation).
- Realization typically occurs when:
  - Elements are consumed (e.g., by `first`, `take`, or printing).
  - The sequence is forced with `doall` (fully realizes) or `dorun` (realizes without retaining results).

**Example**:
```clojure
(def lazy-nums (map inc (range))) ; Infinite sequence, not evaluated yet
(take 5 lazy-nums) ; => (1 2 3 4 5) (only 5 elements computed)
```

#### **Key Lazy Sequence Functions**
Clojure provides many functions that produce or work with lazy sequences:
1. **Producers**:
   - `range`: Generates numbers: `(range)` → infinite sequence `(0 1 2 ...)`.
   - `iterate`: Applies a function repeatedly: `(iterate inc 1)` → `(1 2 3 ...)`.
   - `repeat`: Repeats a value: `(repeat 1)` → `(1 1 1 ...)`.
   - `cycle`: Cycles a collection: `(cycle [1 2 3])` → `(1 2 3 1 2 3 ...)`.
2. **Transformers**:
   - `map`: Applies a function lazily: `(map inc [1 2 3])` → lazy `(2 3 4)`.
   - `filter`: Filters elements lazily: `(filter even? [1 2 3 4])` → lazy `(2 4)`.
3. **Consumers**:
   - `take`: Takes n elements: `(take 3 (range))` → `(0 1 2)`.
   - `drop`: Skips n elements: `(drop 2 (range))` → `(2 3 4 ...)`.
   - `take-while`, `drop-while`: Operate based on a predicate.
4. **Forcing Evaluation**:
   - `doall`: Fully realizes a sequence, storing results in memory.
   - `dorun`: Realizes a sequence but discards results (useful for side effects).
   ```clojure
   (defn print-and-return [x] (println x) x)
   (def lazy-seq (map print-and-return [1 2 3])) ; Nothing printed
   (doall lazy-seq) ; Prints 1, 2, 3; returns (1 2 3)
   ```

#### **Benefits of Lazy Evaluation**
1. **Efficiency**: Only compute what’s needed, saving CPU and memory.
   - Example: Processing the first 10 elements of an infinite sequence doesn’t compute the rest.
2. **Infinite Sequences**: Work with infinite data structures safely.
   ```clojure
   (take 5 (iterate #(* % %) 2)) ; => (2 4 16 256 65536)
   ```
3. **Composability**: Chain operations (e.g., `map`, `filter`) without evaluating until necessary.
4. **Memory Management**: Lazy sequences generate elements on demand, reducing memory usage for large data.

#### **Practical Example**
Let’s create a lazy sequence to find the first 5 even squares:
```clojure
(defn even-squares []
  (->> (iterate inc 1)
       (map #(* % %))         ; Square each number
       (filter even?)         ; Keep even squares
       (take 5)))             ; Take first 5

(even-squares) ; => (4 16 36 64 100)
```
- **Breakdown**:
  - `(iterate inc 1)`: Infinite sequence `(1 2 3 4 5 ...)`.
  - `map #(* % %)`: Lazily squares to `(1 4 9 16 25 ...)`.
  - `filter even?`: Lazily filters to `(4 16 36 64 100 ...)`.
  - `take 5`: Realizes only the first 5 elements.
- Only the necessary computations are performed, and the infinite sequence doesn’t cause issues.

#### **Gotchas and Tips**
1. **Side Effects in Lazy Sequences**:
   - Avoid side effects (e.g., `println`) in lazy sequences, as evaluation timing is unpredictable.
   - If needed, use `doall` or `dorun` to force evaluation.
   ```clojure
   (def lazy-print (map #(do (println %) %) [1 2 3]))
   (first lazy-print) ; Prints 1, returns 1
   (doall lazy-print) ; Prints 1, 2, 3; returns (1 2 3)
   ```
2. **Memory Leaks**:
   - Holding onto the head of a lazy sequence prevents garbage collection. Avoid retaining references to large sequences.
   - Example: `(def x (range 1e9))` keeps all elements in memory if `x` is used later.
3. **Forcing Evaluation**:
   - Use `doall` for small sequences you need in memory.
   - Use `dorun` for side effects without storing results.
4. **Debugging**:
   - Lazy sequences can make debugging tricky, as errors may appear only when realized. Test with small data or force evaluation early.

#### **Performance Considerations**
- Lazy evaluation reduces unnecessary computation but adds overhead for managing laziness.
- For small datasets, strict evaluation (e.g., using vectors directly) may be faster.
- Use laziness for large or infinite datasets, or when chaining multiple transformations.

#### **Review Questions**
1. What is lazy evaluation, and how does it differ from eager evaluation?
2. How can you create an infinite sequence in Clojure, and how do you safely work with it?
3. Write a function that lazily generates the first 3 Fibonacci numbers greater than 10.
4. Why might side effects in a lazy sequence cause problems?

#### **Example Exercise**
Here’s a solution to question 3 (Fibonacci numbers > 10):
```clojure
(defn fib-seq []
  ((fn fib-gen [a b]
     (lazy-seq (cons a (fib-gen b (+ a b)))))
   0 1))

(defn first-three-fibs-over-10 []
  (take 3 (filter #(> % 10) (fib-seq))))

(first-three-fibs-over-10) ; => (13 21 34)
```
- `fib-seq` generates an infinite Fibonacci sequence lazily.
- `filter` keeps numbers > 10, and `take` limits to 3 elements.
