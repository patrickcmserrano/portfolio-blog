# 06macros (English)


### **6. Macros in Clojure**

#### **What are Macros?**
- **Definition**: Macros are a way to extend Clojure’s syntax by transforming code before it’s evaluated. They allow you to write code that generates code, leveraging Clojure’s **homoiconicity** (code as data, thanks to S-expressions).
- **Key Idea**: Unlike functions, which operate on values at runtime, macros operate on code at **compile time**, transforming S-expressions into new S-expressions that are then evaluated.
- **Purpose**: Macros enable custom control structures, domain-specific languages, and concise abstractions that would be cumbersome or impossible with functions alone.

#### **How Macros Work**
- Macros are defined using `defmacro`, which takes a name, arguments, and a body that produces an S-expression.
- When a macro is called, its arguments are passed **unevaluated**, and the macro’s body transforms them into new code, which is then evaluated.
- **Homoiconicity**: Since Clojure code is written as S-expressions (lists, symbols, etc.), macros can manipulate code as data using the same syntax as regular data manipulation.

**Basic Syntax**:
```clojure
(defmacro macro-name [args]
  `(transformed-code ~args))
```
- The backtick (`) is **syntax quote**, which quotes an S-expression to treat it as data, preventing evaluation.
- The tilde (`~`) **unquotes** parts of the quoted expression, inserting argument values.
- The result of a macro is an S-expression that Clojure evaluates.

#### **Simple Macro Example**
Let’s create a macro that inverts an `if` condition:
```clojure
(defmacro unless [test then else]
  `(if (not ~test) ~then ~else))

(unless (> 3 5) "yes" "no") ; => "yes"
```
- **Breakdown**:
  - The macro takes `test`, `then`, and `else` as unevaluated arguments.
  - It generates `(if (not test) then else)` by transforming the input.
  - `(unless (> 3 5) "yes" "no")` expands to `(if (not (> 3 5)) "yes" "no")`, which evaluates to `"yes"`.

#### **Key Features of Macros**
1. **Compile-Time Transformation**:
   - Macros run before code is executed, allowing you to rewrite expressions.
   - Example: The `->` threading macro transforms nested expressions into a chain:
     ```clojure
     (macroexpand '(-> x (inc) (* 2))) ; => (* (inc x) 2)
     ```
2. **Quoting and Unquoting**:
   - **Syntax Quote (`)**: Prevents evaluation and qualifies symbols (e.g., `clojure.core/+`).
   - **Unquote (~)**: Inserts evaluated values into the quoted form.
   - **Unquote-Splicing (~@)**: Splices a sequence into the output.
     ```clojure
     (defmacro example [coll]
       `(list ~@coll))
     (example [1 2 3]) ; => (1 2 3)
     (macroexpand '(example [1 2 3])) ; => (clojure.core/list 1 2 3)
     ```
3. **Code as Data**: Macros manipulate S-expressions (lists, symbols, etc.), making it easy to generate code programmatically.

#### **Common Use Cases**
1. **Custom Control Structures**:
   - Macros like `when`, `cond`, or `unless` create new control flows.
   - Example: Clojure’s `when` macro:
     ```clojure
     (defmacro when [test & body]
       `(if ~test (do ~@body)))
     (when (> 3 2) (println "True") :ok) ; => Prints "True", returns :ok
     ```
2. **Syntactic Sugar**:
   - Macros like `->` and `->>` simplify code by transforming complex expressions.
   - Example: `->>` threads the result through a series of functions:
     ```clojure
     (->> [1 2 3] (map inc) (filter even?)) ; => (2 4)
     ```
3. **Domain-Specific Languages (DSLs)**:
   - Macros can define custom syntax for specific domains (e.g., HTML generation, query languages).
4. **Performance Optimization**:
   - Macros can inline code or eliminate runtime overhead.
   - Example: A macro to inline a computation:
     ```clojure
     (defmacro square [x]
       `(* ~x ~x))
     (square 3) ; Expands to (* 3 3), evaluates to 9
     ```

#### **Debugging Macros**
- Use `macroexpand` or `macroexpand-1` to see what a macro expands to:
  ```clojure
  (macroexpand-1 '(unless (> 3 5) "yes" "no"))
  ; => (if (not (> 3 5)) "yes" "no")
  ```
- `macroexpand` fully expands nested macros, while `macroexpand-1` expands one level.

#### **Benefits of Macros**
1. **Expressiveness**: Create new syntax or control structures tailored to your needs.
2. **Abstraction**: Hide complex logic behind simple interfaces.
3. **Compile-Time Computation**: Optimize code by performing work at compile time.
4. **Homoiconicity**: Manipulate code as data using familiar Clojure data structures.

#### **Gotchas and Tips**
1. **Use Macros Sparingly**:
   - Macros are powerful but can make code harder to understand. Use functions unless you need compile-time transformation.
   - Rule: If a function can do it, prefer a function.
2. **Hygiene**:
   - Syntax quote (`) automatically qualifies symbols to avoid capturing unintended variables.
   - Use **gensym** for temporary symbols to avoid conflicts:
     ```clojure
     (defmacro safe-let [bindings & body]
       (let [sym (gensym)]
         `(let [~sym 42 ~@bindings] ~@body)))
     ```
3. **Debugging Complexity**:
   - Macros can obscure errors because they transform code. Always test macro expansions with `macroexpand`.
4. **Avoid Side Effects**:
   - Macros should generate code, not perform runtime side effects (e.g., don’t include `println` in a macro body).

#### **Practical Example**
Let’s create a macro that simplifies logging with a timestamp:
```clojure
(defmacro log [message]
  `(println (str "[" (System/currentTimeMillis) "] " ~message)))

(log "Starting process") ; => [1697051234567] Starting process
```
- **Breakdown**:
  - The macro generates a `println` call with a timestamp prepended.
  - `(macroexpand-1 '(log "Starting process"))` → `(println (str "[" (System/currentTimeMillis) "] " "Starting process"))`.

#### **Review Questions**
1. How does a macro differ from a function in Clojure?
2. What role does homoiconicity play in making macros possible?
3. Write a macro that takes a number and generates code to add it to itself.
4. Why should you use `macroexpand` when debugging a macro?

#### **Example Exercise**
Solution to question 3 (macro to add a number to itself):
```clojure
(defmacro double-it [n]
  `(+ ~n ~n))

(double-it 5) ; => 10
(macroexpand-1 '(double-it 5)) ; => (+ 5 5)
```

