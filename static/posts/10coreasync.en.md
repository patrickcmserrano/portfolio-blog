# 10coreasync (English)


### **Core.async in Clojure**

#### **Overview**
`core.async` is a Clojure library for asynchronous programming, enabling non-blocking, event-driven workflows. It provides a model based on **channels** and **go blocks**, inspired by Go’s concurrency model, to handle tasks like concurrent data processing, event handling, or parallel computations without relying on threads directly.

- **Purpose**: Simplify concurrent and asynchronous programming by abstracting thread management and providing a high-level API.
- **Key Idea**: Use channels for communication between independent processes, and `go` blocks for lightweight, asynchronous execution.

#### **Key Components**

1. **Channels**
   - **Definition**: Channels are queues for passing data between processes. They act like pipes where values are put and taken asynchronously.
   - **Key Functions**:
     - `(chan)`: Creates a channel (optionally with a buffer size or transducer).
     - `(>! ch val)`: Puts a value onto a channel (blocks in regular threads).
     - `(<!! ch)`: Takes a value from a channel (blocks in regular threads).
     - `(close! ch)`: Closes a channel, preventing further puts.
   - **Buffers**:
     - Fixed buffer: `(chan 10)` holds up to 10 values.
     - Dropping buffer: `(chan (dropping-buffer 10))` discards new values if full.
     - Sliding buffer: `(chan (sliding-buffer 10))` discards oldest values if full.
   - **Example**:
     ```clojure
     (require '[clojure.core.async :as async])
     (def ch (async/chan 2))
     (async/>!! ch 1) ; Put 1
     (async/>!! ch 2) ; Put 2
     (async/<!! ch)   ; => 1 (takes first value)
     (async/<!! ch)   ; => 2
     ```

2. **Go Blocks**
   - **Definition**: Lightweight, asynchronous blocks that run on a fixed thread pool, using **parking** instead of blocking to manage suspension.
   - **Syntax**: `(go & body)` creates an asynchronous process.
   - **Key Operations**:
     - `(>! ch val)`: Puts a value (parks in `go` block).
     - `(<!)`: Takes a value (parks in `go` block).
   - **Example**:
     ```clojure
     (def ch (async/chan))
     (async/go (println "Got:" (async/<! ch))) ; Waits for a value
     (async/>!! ch "Hello") ; Prints "Got: Hello"
     ```
     - The `go` block parks when waiting for a value, freeing the thread for other tasks.

3. **Alts and Selectors**
   - **Definition**: `alts!` and `alt!` allow choosing from multiple channel operations (like `select` in other languages).
   - **Key Functions**:
     - `(alts! [[ch1 val1] [ch2 val2] ...])`: Tries multiple put/take operations, returning the first that succeeds.
     - `(alt! :priority true ...)`: Similar, but used in `go` blocks with priority option.
   - **Example**:
     ```clojure
     (def ch1 (async/chan))
     (def ch2 (async/chan))
     (async/go
       (let [[value ch] (async/alts! [[ch1] [ch2]])]
         (println "Received" value "from" ch)))
     (async/>!! ch2 "from ch2") ; Prints "Received from ch2 from ..."
     ```

4. **Timeouts**
   - Use `(timeout ms)` to create a channel that closes after a specified time.
   - **Example**:
     ```clojure
     (async/go
       (async/<! (async/timeout 1000))
       (println "1 second passed"))
     ```

#### **Key Features**
1. **Asynchronous Execution**:
   - `go` blocks create lightweight “processes” that don’t tie up threads, allowing thousands of concurrent tasks.
2. **Decoupled Communication**:
   - Channels decouple producers and consumers, enabling flexible workflows.
3. **Composability**:
   - Use transducers with channels for transformation (e.g., `(chan 1 (map inc))`).
4. **Non-Blocking**:
   - `go` blocks use parking, making them efficient for I/O-bound tasks.

#### **Benefits**
1. **Simplified Concurrency**: Avoids low-level thread management and locks.
2. **Scalability**: Handles many concurrent tasks with a small thread pool.
3. **Flexibility**: Channels support diverse patterns (e.g., pub/sub, pipelines).
4. **Functional Style**: Integrates with Clojure’s immutable data and functional programming.

#### **Practical Example**
Let’s create a pipeline to process numbers asynchronously:
```clojure
(require '[clojure.core.async :as async])

(defn process-numbers []
  (let [in (async/chan 10)
        out (async/chan 10 (map #(* % %)))] ; Square numbers
    ;; Producer: put numbers into in
    (async/go
      (doseq [x [1 2 3 4 5]]
        (async/>! in x))
      (async/close! in))
    ;; Consumer: transfer from in to out
    (async/go-loop []
      (if-let [val (async/<! in)]
        (do (async/>! out val)
            (recur))
        (async/close! out)))
    ;; Collect results
    (async/<!! (async/into [] out))))

(process-numbers) ; => [1 4 9 16 25]
```
- **Breakdown**:
  - `in` channel accepts numbers.
  - `out` channel applies a transducer to square numbers.
  - `go-loop` transfers values asynchronously.
  - `into` collects results into a vector.

#### **Gotchas and Tips**
1. **Blocking vs. Parking**:
   - Use `>!!`/`<!!` in regular threads (blocking).
   - Use `>!`/`<!` in `go` blocks (parking).
   - Mixing them incorrectly causes errors (e.g., using `<!` outside `go`).
2. **Channel Buffers**:
   - Unbuffered channels (`(chan)`) block until a receiver is ready.
   - Use buffers for decoupling or handling bursts of data.
3. **Resource Management**:
   - Close channels with `close!` when done to prevent leaks.
   - Avoid holding onto channel references unnecessarily.
4. **Debugging**:
   - Use `(async/poll! ch)` to check for values without blocking.
   - Log inside `go` blocks to trace execution.

#### **Review Questions**
1. How do channels differ from atoms or refs in handling concurrency?
2. What’s the role of `go` blocks in `core.async`?
3. Write a `core.async` pipeline that filters even numbers and doubles them.
4. Why is parking more efficient than blocking in `go` blocks?

#### **Example Exercise**
Solution to question 3 (pipeline for even numbers, doubled):
```clojure
(defn even-double-pipeline [numbers]
  (let [in (async/chan)
        out (async/chan 10 (comp (filter even?) (map #(* 2 %))))]
    (async/go
      (doseq [x numbers]
        (async/>! in x))
      (async/close! in))
    (async/go-loop []
      (if-let [val (async/<! in)]
        (do (async/>! out val)
            (recur))
        (async/close! out)))
    (async/<!! (async/into [] out))))

(even-double-pipeline [1 2 3 4 5]) ; => [4 8]
```
- **Breakdown**:
  - Filters even numbers and doubles them using a transducer.
  - Processes numbers asynchronously and collects results.

