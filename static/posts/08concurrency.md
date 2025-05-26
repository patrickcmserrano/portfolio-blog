### **8. Concurrency Primitives in Clojure**

#### **Overview**
Clojure is designed for concurrency, providing tools to manage shared, mutable state in a controlled way while preserving immutability for most data. Its concurrency primitives—**atoms**, **refs**, **agents**, and **vars**—address different use cases, ensuring thread safety and simplifying concurrent programming. These primitives work seamlessly with Clojure’s immutable data structures.

#### **Why Concurrency Primitives?**
- Clojure’s immutable data structures eliminate many concurrency issues (e.g., race conditions from mutation).
- However, programs often need mutable state (e.g., counters, shared resources). Concurrency primitives provide controlled ways to manage this state safely.
- Each primitive has a specific model for handling updates and coordination.

#### **1. Atoms**
- **Purpose**: Manage **independent, synchronous** state updates with atomic operations.
- **Model**: Atoms provide a single, mutable reference to an immutable value, updated atomically using compare-and-swap (CAS).
- **Key Functions**:
  - `atom`: Creates an atom with an initial value.
  - `deref` or `@`: Reads the current value.
  - `swap!`: Updates the value by applying a function.
  - `reset!`: Sets a new value directly.
- **Use Case**: Single, shared state that doesn’t require coordination with other state (e.g., a counter).

**Example**:
```clojure
(def counter (atom 0))
(swap! counter inc) ; => 1
(swap! counter inc) ; => 2
@counter            ; => 2
(reset! counter 0)  ; => 0
```
- **Breakdown**:
  - `swap!` applies `inc` atomically, ensuring thread safety.
  - If multiple threads call `swap!`, CAS retries if conflicts occur, ensuring no updates are lost.

**Concurrency Behavior**:
- **Synchronous**: `swap!` blocks until the update completes.
- **Retry-Based**: If a conflict occurs, `swap!` retries the update function with the latest value.
- **Non-Coordinated**: Atoms don’t coordinate with other atoms.

#### **2. Refs**
- **Purpose**: Manage **coordinated, synchronous** state updates across multiple references.
- **Model**: Refs use **Software Transactional Memory (STM)**, allowing multiple refs to be updated atomically within a transaction, like a database transaction.
- **Key Functions**:
  - `ref`: Creates a ref with an initial value.
  - `deref` or `@`: Reads the current value.
  - `alter`: Updates a ref’s value within a transaction.
  - `ref-set`: Sets a new value within a transaction.
  - `dosync`: Wraps a transaction to ensure atomic updates.
- **Use Case**: Multiple pieces of state that must change together (e.g., transferring money between accounts).

**Example**:
```clojure
(def account1 (ref 100))
(def account2 (ref 50))

(defn transfer [amount from to]
  (dosync
   (alter from - amount)
   (alter to + amount)))

(transfer 20 account1 account2)
[@account1 @account2] ; => [80 70]
```
- **Breakdown**:
  - `dosync` ensures both `alter` calls happen atomically.
  - If a conflict occurs, the transaction retries, ensuring consistency.

**Concurrency Behavior**:
- **Synchronous**: Updates block until the transaction completes.
- **Coordinated**: Ensures all refs in a `dosync` block update together or not at all.
- **Retry-Based**: STM retries transactions on conflicts, using the latest ref values.

#### **3. Agents**
- **Purpose**: Manage **independent, asynchronous** state updates.
- **Model**: Agents hold a value and process updates asynchronously via a thread pool, ideal for tasks that don’t need immediate results.
- **Key Functions**:
  - `agent`: Creates an agent with an initial value.
  - `deref` or `@`: Reads the current value (may not reflect pending updates).
  - `send`: Queues an update function to run asynchronously.
  - `send-off`: Like `send`, but for potentially blocking operations.
  - `await`: Blocks until all actions on an agent complete.
- **Use Case**: Background tasks or state updates where immediate consistency isn’t critical (e.g., logging, batch processing).

**Example**:
```clojure
(def log-agent (agent []))
(send log-agent conj "Log message")
@log-agent ; => ["Log message"] (after processing)
```
- **Breakdown**:
  - `send` queues `conj` to run asynchronously, appending to the agent’s vector.
  - The update happens in a separate thread, and `@log-agent` may show the old value until the update completes.

**Concurrency Behavior**:
- **Asynchronous**: Updates are queued and processed later.
- **Non-Coordinated**: Agents operate independently, without coordination.
- **Error Handling**: Agents can enter an error state; use `agent-error` and `restart-agent` to handle.

#### **4. Vars**
- **Purpose**: Manage **thread-local or global** state, primarily for dynamic scoping or configuration.
- **Model**: Vars are mutable bindings that can be dynamically rebound per thread or globally.
- **Key Functions**:
  - `def`: Creates a var (global by default).
  - `alter-var-root`: Changes a var’s global value.
  - `binding`: Creates thread-local bindings for a var.
- **Use Case**: Dynamic configuration or temporary state changes (e.g., redirecting output).

**Example**:
```clojure
(def ^:dynamic *my-var* 42)
(binding [*my-var* 100]
  (println *my-var*)) ; => 100 (thread-local)
(println *my-var*)    ; => 42 (global value unchanged)
```
- **Breakdown**:
  - `^:dynamic` marks the var as dynamic, allowing thread-local rebinding.
  - `binding` creates a temporary, thread-local value.

**Concurrency Behavior**:
- **Thread-Local**: `binding` ensures changes are isolated to the current thread.
- **Global**: `alter-var-root` changes the var globally, used sparingly.

#### **Choosing the Right Primitive**
| Primitive | Update Style | Coordination | Use Case |
|-----------|--------------|--------------|----------|
| **Atom**  | Synchronous  | None         | Independent state (e.g., counter) |
| **Ref**   | Synchronous  | Coordinated  | Multiple state changes (e.g., transactions) |
| **Agent** | Asynchronous | None         | Background tasks (e.g., logging) |
| **Var**   | Synchronous  | Thread-local | Dynamic scoping, configuration |

#### **Benefits**
1. **Thread Safety**: All primitives ensure safe concurrent access without manual locking.
2. **Immutability Integration**: Primitives work with immutable data, preserving functional purity.
3. **Flexibility**: Different models (synchronous, asynchronous, coordinated) fit various needs.
4. **Simplicity**: STM and CAS abstract away low-level concurrency complexities.

#### **Practical Example**
Simulate a bank with multiple accounts using refs:
```clojure
(def accounts (ref {:alice 1000 :bob 500}))

(defn transfer-money [from to amount]
  (dosync
   (let [current @accounts]
     (when (< (get current from 0) amount)
       (throw (IllegalStateException. "Insufficient funds")))
     (alter accounts update from - amount)
     (alter accounts update to + amount))))

(transfer-money :alice :bob 200)
@accounts ; => {:alice 800, :bob 700}
```
- **Breakdown**:
  - `dosync` ensures atomic updates to the `accounts` map.
  - `alter` and `update` modify the map immutably within the transaction.

#### **Gotchas and Tips**
1. **Atoms vs. Refs**:
   - Use atoms for single, independent state.
   - Use refs when multiple states must change together.
2. **Agents and Asynchrony**:
   - Be cautious with `send` for blocking operations; use `send-off` instead.
   - Check `agent-error` if updates fail.
3. **STM Retries**:
   - Refs may retry transactions, so keep `dosync` blocks small and pure.
4. **Vars and Dynamic Scope**:
   - Avoid overusing dynamic vars; prefer configuration via functions or atoms.

#### **Review Questions**
1. How do atoms and refs differ in handling concurrency?
2. When would you use an agent instead of an atom?
3. Write a program using an atom to track the number of times a function is called.
4. Why is STM useful for refs but not needed for atoms?

#### **Example Exercise**
Solution to question 3 (tracking function calls with an atom):
```clojure
(def call-count (atom 0))

(defn tracked-fn [x]
  (swap! call-count inc)
  (* x x))

(tracked-fn 5) ; => 25
@call-count    ; => 1
(tracked-fn 3) ; => 9
@call-count    ; => 2
```
