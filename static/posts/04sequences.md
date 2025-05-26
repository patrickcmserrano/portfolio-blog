### **4. Sequences and Collections in Clojure**

#### **Overview**
In Clojure, **collections** are data structures like lists, vectors, maps, and sets, while **sequences** are an abstraction for iterating over collections (and other data sources) in a uniform way. Sequences are central to Clojure’s functional programming model, enabling powerful, lazy, and consistent manipulation of data.

#### **Collections**
Collections are the concrete data structures that store data in Clojure. All are **immutable** and **persistent** (as discussed in concept 1). The main types are:
1. **Lists**: Ordered, singly-linked lists, ideal for sequential access. Syntax: `(1 2 3)`.
   - `conj` adds to the front: `(conj '(1 2) 3)` → `(3 1 2)`.
2. **Vectors**: Ordered, indexed arrays, ideal for random access. Syntax: `[1 2 3]`.
   - `conj` adds to the end: `(conj [1 2] 3)` → `[1 2 3]`.
3. **Maps**: Key-value pairs, ideal for associative data. Syntax: `{:a 1 :b 2}`.
   - `assoc` adds/updates pairs: `(assoc {:a 1} :b 2)` → `{:a 1 :b 2}`.
4. **Sets**: Unordered collections of unique elements. Syntax: `#{1 2 3}`.
   - `conj` adds elements: `(conj #{1 2} 3)` → `#{1 2 3}`.

**Key Point**: All collections are immutable and persistent, supporting structural sharing for efficient operations.

#### **Sequences**
- **Definition**: A sequence is a logical view of a collection (or other data source) as an ordered series of elements. It’s an abstraction, not a concrete data structure, defined by the `ISeq` interface.
- **Key Characteristics**:
  - **Lazy**: Sequences compute elements only when needed, enabling efficient processing of large or infinite data.
  - **Uniform**: Most Clojure collections can be treated as sequences using `seq`.
  - **Immutable**: Operations on sequences produce new sequences, preserving the original data.
- **Creating Sequences**:
  - Use `seq` on a collection: `(seq [1 2 3])` → `(1 2 3)`.
  - Functions like `range`, `repeat`, or `iterate` create sequences:
    ```clojure
    (take 5 (range))     ; => (0 1 2 3 4)
    (take 3 (repeat 1))  ; => (1 1 1)
    (take 4 (iterate inc 1)) ; => (1 2 3 4)
    ```
- **Empty Collections**: `(seq [])` or `(seq nil)` returns `nil`, which is used in conditionals to check for emptiness.

#### **Working with Sequences**
Clojure’s sequence abstraction provides a consistent API for processing collections (and other sequential data like streams or strings). Key sequence functions include:
1. **Core Operations**:
   - `first`: Gets the first element: `(first [1 2 3])` → `1`.
   - `rest`: Returns all but the first element as a sequence: `(rest [1 2 3])` → `(2 3)`.
   - `cons`: Constructs a new sequence by prepending an element: `(cons 0 [1 2 3])` → `(0 1 2 3)`.

2. **Functional Operations** (from FP paradigm):
   - `map`: Applies a function to each element: `(map inc [1 2 3])` → `(2 3 4)`.
   - `filter`: Selects elements based on a predicate: `(filter even? [1 2 3 4])` → `(2 4)`.
   - `reduce`: Combines elements: `(reduce + [1 2 3])` → `6`.
   - `take`, `drop`: Take or skip n elements: `(take 2 [1 2 3])` → `(1 2)`.

3. **Lazy Evaluation**:
   - Many sequence functions are lazy, computing values only when consumed (e.g., by `doall`, `dorun`, or printing).
   - Example:
     ```clojure
     (defn infinite-squares []
       (map #(* % %) (iterate inc 1)))
     (take 3 (infinite-squares)) ; => (1 4 9)
     ```
     - Only the first three squares are computed due to `take`.

4. **Sequence-Friendly Collections**:
   - All Clojure collections support `seq` to produce a sequence:
     ```clojure
     (seq {:a 1 :b 2}) ; => ([:a 1] [:b 2]) (sequence of key-value pairs)
     (seq #{1 2 3})    ; => (1 2 3) (order not guaranteed)
     ```

#### **Collections vs. Sequences**
- **Collections**: Concrete, in-memory data structures (e.g., `[1 2 3]`, `{:a 1}`).
- **Sequences**: Abstract, potentially lazy views of data, often created from collections or other sources.
- **Conversion**: Use `seq` to get a sequence from a collection; use `vec`, `set`, or `list` to create collections from sequences.
  ```clojure
  (vec (map inc [1 2 3])) ; => [2 3 4]
  (set (filter even? [1 2 3 4])) ; => #{2 4}
  ```

#### **Benefits of Sequences and Collections**
1. **Uniformity**: The sequence abstraction lets you use the same functions (`map`, `filter`, etc.) across all collections, strings, or even custom data sources.
2. **Laziness**: Lazy sequences enable efficient processing of large or infinite data sets.
3. **Immutability**: Both collections and sequences are immutable, aligning with functional programming.
4. **Flexibility**: Collections provide specialized structures (e.g., vectors for indexing, maps for lookups), while sequences offer a general-purpose iteration model.

#### **Practical Example**
Let’s process a collection of maps using sequences:
```clojure
(def users [{:name "Alice" :age 30}
            {:name "Bob" :age 25}
            {:name "Charlie" :age 35}])

(defn process-users [users]
  (->> users
       (filter #(< (:age %) 35))        ; Keep users under 35
       (map :name)                      ; Extract names
       (map clojure.string/upper-case))) ; Convert to uppercase

(process-users users) ; => ("ALICE" "BOB")
```
- **Breakdown**:
  - `filter` uses a predicate to select users.
  - `map :name` treats the keyword `:name` as a function to extract values.
  - `map clojure.string/upper-case` applies string transformation.
  - The `->>` macro threads the sequence through each operation.

#### **Gotchas and Tips**
1. **Choosing Collections**:
   - Use **vectors** for indexed access or stack-like operations.
   - Use **lists** for sequential processing or when macros require them.
   - Use **maps** for key-value lookups, **sets** for unique elements.
2. **Laziness Pitfalls**: Lazy sequences don’t evaluate until forced. Avoid side effects in lazy operations unless you force evaluation (e.g., with `doall`).
   ```clojure
   (defn print-and-return [x] (println x) x)
   (def lazy-seq (map print-and-return [1 2 3])) ; Nothing printed yet
   (doall lazy-seq) ; => Prints 1, 2, 3; returns (1 2 3)
   ```
3. **Empty Sequences**: Use `(seq coll)` to check for emptiness, as it returns `nil` for empty collections, which is falsy.
   ```clojure
   (if (seq []) "empty" "non-empty") ; => "empty"
   ```
4. **Performance**: Lazy sequences are powerful but can add overhead. Use collections directly for small, in-memory data.

#### **Review Questions**
1. What’s the difference between a collection and a sequence in Clojure?
2. How does lazy evaluation improve efficiency in sequence operations?
3. Write a function that takes a vector of numbers, filters out odd numbers, squares the rest, and returns a set.
4. Why is the sequence abstraction useful when working with different collection types?

#### **Review Question Answers**
1. **Collections vs. Sequences**: Collections are concrete, in-memory data structures (like vectors `[1 2 3]`, lists `'(1 2 3)`, maps `{:a 1}`, and sets `#{1 2 3}`) that store data. Sequences are an abstraction for iterating over collections in a uniform way - they provide a logical view of data as an ordered series of elements. Collections are the actual data containers, while sequences are the interface for processing that data consistently across different collection types.

2. **Lazy Evaluation Efficiency**: Lazy evaluation improves efficiency by computing elements only when they are actually needed (consumed). This allows you to work with potentially infinite data structures without running out of memory, process large datasets without loading everything into memory at once, and chain multiple operations together where only the final required elements are computed. For example, `(take 3 (map #(* % %) (range)))` only computes the first 3 squares instead of trying to square all infinite numbers.

3. **Function Example**:
   ```clojure
   (defn process-numbers [numbers]
     (->> numbers
          (filter even?)        ; Keep only even numbers
          (map #(* % %))       ; Square each number
          set))                ; Return as a set
   
   ; Usage: (process-numbers [1 2 3 4 5 6]) => #{4 16 36}
   ```

4. **Sequence Abstraction Benefits**: The sequence abstraction is useful because it provides a uniform API that works across all collection types and other sequential data sources. You can use the same functions (`map`, `filter`, `reduce`, etc.) whether you're working with vectors, lists, maps, sets, strings, or even custom data sources. This uniformity makes code more consistent, reusable, and easier to reason about, while also enabling powerful composition of operations through function chaining.
