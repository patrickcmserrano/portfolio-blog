# 07MultimethodsProtocols (English)

### **7. Multimethods and Protocols in Clojure**

#### **Overview**
Clojure provides two powerful mechanisms for polymorphism—**multimethods** and **protocols**—allowing you to define behavior that varies based on types, values, or custom criteria. These tools enable flexible, extensible dispatch, complementing Clojure’s functional programming paradigm.

- **Multimethods**: Allow dispatching based on arbitrary criteria (not just type), defined at runtime.
- **Protocols**: Provide type-based polymorphism, similar to interfaces in other languages, optimized for performance and integration with Java.

Both leverage Clojure’s dynamic nature, making it easy to extend behavior without modifying existing code.

#### **Multimethods**
- **Definition**: Multimethods are a form of dynamic dispatch where the function to call is chosen based on a **dispatch function** applied to the arguments.
- **Key Components**:
  - **Dispatch Function**: Computes a value (dispatch value) from the arguments to determine which method to invoke.
  - **Method Definitions**: Map dispatch values to specific implementations.
- **Syntax**:
  ```clojure
  (defmulti name dispatch-fn)
  (defmethod name dispatch-value [args] body)
  ```

**Example**:
Let’s create a multimethod to calculate the area of shapes based on their type:
```clojure
(defmulti area :shape) ; Dispatch on :shape keyword

(defmethod area :circle [{:keys [radius]}]
  (* Math/PI radius radius))

(defmethod area :rectangle [{:keys [width height]}]
  (* width height))

(defmethod area :default [shape]
  (throw (IllegalArgumentException. (str "Unknown shape: " shape))))

(area {:shape :circle :radius 2})     ; => 12.566370614359172
(area {:shape :rectangle :width 3 :height 4}) ; => 12
(area {:shape :triangle})             ; => Throws exception
```
- **Breakdown**:
  - `defmulti area :shape`: Defines a multimethod that dispatches on the `:shape` keyword of the input map.
  - `defmethod` defines implementations for `:circle`, `:rectangle`, and a `:default` case.
  - The dispatch function `:shape` extracts the value of the `:shape` key to select the method.

**Features**:
1. **Flexible Dispatch**: Dispatch on any function of the arguments (e.g., value, type, or computed property).
   ```clojure
   (defmulti greet (fn [person] (:role person)))
   (defmethod greet :admin [person] (str "Welcome, admin " (:name person)))
   (defmethod greet :user [person] (str "Hello, " (:name person)))
   (greet {:name "Alice" :role :admin}) ; => "Welcome, admin Alice"
   ```
2. **Hierarchy Support**: Multimethods can use Clojure’s hierarchy system (`derive`, `make-hierarchy`) for dispatch based on relationships.
   ```clojure
   (derive ::square ::rectangle)
   (defmethod area ::square [{:keys [side]}]
     (* side side))
   (area {:shape ::square :side 3}) ; => 9
   ```
3. **Extensibility**: New methods can be added without changing existing code, even in different namespaces.

#### **Protocols**
- **Definition**: Protocols define a set of functions (like an interface) that can be implemented for different types, providing type-based polymorphism. They are optimized for performance and integrate well with Java interop.
- **Key Components**:
  - **Protocol Definition**: Specifies function signatures.
  - **Implementations**: Provided for specific types using `extend-protocol` or `deftype`/`defrecord`.
- **Syntax**:
  ```clojure
  (defprotocol ProtocolName
    (method-name [arg1] "Docstring"))
  (extend-protocol ProtocolName
    Type
    (method-name [arg1] implementation))
  ```

**Example**:
Define a protocol for shapes with an `area` method:
```clojure
(defprotocol Shape
  (area [this] "Calculate the area of the shape"))

(defrecord Circle [radius]
  Shape
  (area [this] (* Math/PI radius radius)))

(defrecord Rectangle [width height]
  Shape
  (area [this] (* width height)))

(let [c (->Circle 2)
      r (->Rectangle 3 4)]
  [(area c) (area r)]) ; => [12.566370614359172 12]
```
- **Breakdown**:
  - `defprotocol Shape`: Defines the `area` method signature.
  - `defrecord` creates types (`Circle`, `Rectangle`) that implement the `Shape` protocol.
  - Calling `(area c)` dispatches to the appropriate implementation based on the type.

**Features**:
1. **Type-Based Dispatch**: Protocols dispatch on the type of the first argument (like Java interfaces).
2. **Performance**: Protocols are faster than multimethods because dispatch is resolved at compile time using type information.
3. **Java Interop**: Protocols can extend Java classes or interfaces.
   ```clojure
   (extend-protocol Shape
     java.util.Map
     (area [m] (* (:width m) (:height m))))
   (area {:width 3 :height 4}) ; => 12
   ```
4. **Extensibility**: New types can implement the protocol without modifying existing code.

#### **Multimethods vs. Protocols**
| Feature                | Multimethods                       | Protocols                          |
|------------------------|------------------------------------|------------------------------------|
| **Dispatch**           | Arbitrary function of arguments    | Type of first argument             |
| **Performance**        | Slower (runtime dispatch)         | Faster (compile-time dispatch)     |
| **Flexibility**        | Highly flexible (any criteria)     | Type-based, less flexible          |
| **Use Case**           | Custom dispatch logic             | Interface-like polymorphism        |
| **Java Interop**       | Limited                           | Strong (extends Java types)        |

**When to Use**:
- **Multimethods**: When dispatch depends on values, multiple arguments, or complex logic (e.g., dispatching on a `:type` keyword or computed value).
- **Protocols**: When you need type-based polymorphism, performance, or Java interop (e.g., defining behaviors for custom types or Java classes).

#### **Benefits**
1. **Polymorphism**: Both provide flexible ways to handle different types or values without conditionals.
2. **Extensibility**: Add new behaviors without modifying existing code (open-closed principle).
3. **Modularity**: Separate dispatch logic from implementation, improving maintainability.
4. **Integration**: Protocols enable seamless Java interop, while multimethods offer unique flexibility.

#### **Practical Example**
Let’s combine multimethods and protocols for a shape-processing system:
```clojure
(defprotocol Printable
  (describe [this] "Describe the shape"))

(defmulti calculate :operation) ; Dispatch on :operation

(defmethod calculate :area [{:keys [shape]}]
  (area shape)) ; Uses protocol

(defmethod calculate :describe [{:keys [shape]}]
  (describe shape))

(extend-protocol Printable
  Circle
  (describe [this] (str "Circle with radius " (:radius this)))
  Rectangle
  (describe [this] (str "Rectangle with width " (:width this) " and height " (:height this))))

(let [circle (->Circle 2)
      rect (->Rectangle 3 4)]
  [(calculate {:operation :area :shape circle})     ; => 12.566370614359172
   (calculate {:operation :describe :shape rect})]) ; => "Rectangle with width 3 and height 4"
```
- **Breakdown**:
  - Protocol `Printable` defines `describe` for types.
  - Multimethod `calculate` dispatches on `:operation`, delegating to the protocol where needed.

#### **Gotchas and Tips**
1. **Multimethod Overhead**: Multimethods are slower due to runtime dispatch. Use protocols for performance-critical code.
2. **Namespace Conflicts**: Multimethods and protocols are namespaced. Be cautious when extending in different namespaces.
3. **Default Cases**: Multimethods support `:default`, but protocols require explicit extension for each type.
4. **Debugging**: Use `prefer-method` for multimethod conflicts and check protocol implementations with `extends?`.
   ```clojure
   (extends? Shape Circle) ; => true
   ```

#### **Review Questions**
1. How does a multimethod’s dispatch function differ from a protocol’s dispatch mechanism?
2. When would you choose a protocol over a multimethod?
3. Write a multimethod that dispatches on the `:type` of a map and handles `:square` and `:triangle` cases.
4. How can protocols be used to extend Java classes?

#### **Example Exercise**
Solution to question 3 (multimethod for shapes):
```clojure
(defmulti shape-area :type)

(defmethod shape-area :square [{:keys [side]}]
  (* side side))

(defmethod shape-area :triangle [{:keys [base height]}]
  (/ (* base height) 2))

(shape-area {:type :square :side 4})      ; => 16
(shape-area {:type :triangle :base 3 :height 4}) ; => 6
```

