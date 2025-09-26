# 1) Imutabilidade e Estruturas de Dados Persistentes em Clojure



### **1. Imutabilidade e Estruturas de Dados Persistentes em Clojure**### **1. Immutability and Persistent Data Structures in Clojure**



#### **Imutabilidade**#### **Immutability**

- **Definição**: No Clojure, os dados são imutáveis por padrão, significando que uma vez criado um valor, ele não pode ser alterado. Ao invés de modificar dados no local, as operações produzem novos valores, deixando o original inalterado.- **Definition**: In Clojure, data is immutable by default, meaning once a value is created, it cannot be changed. Instead of modifying data in place, operations produce new values, leaving the original unchanged.

- **Por que Imutabilidade?**- **Why Immutability?**

    - Simplifica o raciocínio sobre código (não há efeitos colaterais de mutação).    - Simplifies reasoning about code (no side effects from mutation).

    - Permite programação concorrente segura (não há condições de corrida ou necessidade de locks).    - Enables safe concurrent programming (no race conditions or locks needed).

    - Facilita a programação funcional ao encorajar funções puras.    - Facilitates functional programming by encouraging pure functions.

- **Ponto-chave**: A imutabilidade é aplicada às estruturas de dados principais do Clojure (ex.: listas, vetores, mapas, conjuntos). Variáveis (vinculadas via `def` ou `let`) também são imutáveis, a menos que gerenciadas explicitamente com construtos de estado como atoms ou refs.- **Key Point**: Immutability is enforced for Clojure’s core data structures (e.g., lists, vectors, maps, sets). Variables (bound via `def` or `let`) are also immutable unless explicitly managed with state constructs like atoms or refs.



**Exemplo**:**Example**:

```clojure```clojure

(def meu-vetor [1 2 3])(def my-vector [1 2 3])

(def novo-vetor (conj meu-vetor 4))(def new-vector (conj my-vector 4))



;; meu-vetor permanece inalterado;; my-vector remains unchanged

(println meu-vetor)   ; => [1 2 3](println my-vector)   ; => [1 2 3]

(println novo-vetor)  ; => [1 2 3 4](println new-vector)  ; => [1 2 3 4]

``````

Aqui, `conj` cria um novo vetor com `4` adicionado, enquanto `meu-vetor` permanece `[1 2 3]`.Here, `conj` creates a new vector with `4` added, while `my-vector` stays `[1 2 3]`.



#### **Estruturas de Dados Persistentes**#### **Persistent Data Structures**

- **Definição**: As estruturas de dados do Clojure são *persistentes*, significando que preservam versões anteriores de si mesmas quando modificadas, usando compartilhamento estrutural para fazer isso de forma eficiente.- **Definition**: Clojure’s data structures are *persistent*, meaning they preserve previous versions of themselves when modified, using structural sharing to do so efficiently.

- **Compartilhamento Estrutural**: Ao invés de copiar toda a estrutura de dados, as estruturas persistentes compartilham partes inalteradas entre versões, minimizando o uso de memória e melhorando a performance.- **Structural Sharing**: Instead of copying the entire data structure, persistent data structures share unchanged parts between versions, minimizing memory usage and improving performance.

- **Estruturas de Dados Principais**:- **Key Data Structures**:

    - **Listas**: Listas imutáveis ligadas individualmente (ex.: `(1 2 3)`).    - **Lists**: Singly-linked, immutable lists (e.g., `(1 2 3)`).

    - **Vetores**: Arrays imutáveis indexados (ex.: `[1 2 3]`).    - **Vectors**: Indexed, immutable arrays (e.g., `[1 2 3]`).

    - **Mapas**: Pares chave-valor imutáveis (ex.: `{:a 1 :b 2}`).    - **Maps**: Immutable key-value pairs (e.g., `{:a 1 :b 2}`).

    - **Conjuntos**: Coleções imutáveis de elementos únicos (ex.: `#{1 2 3}`).    - **Sets**: Immutable collections of unique elements (e.g., `#{1 2 3}`).

- **Operações**: Funções como `conj`, `assoc`, `dissoc`, e `update` retornam novas versões da estrutura de dados sem alterar a original.- **Operations**: Functions like `conj`, `assoc`, `dissoc`, and `update` return new versions of the data structure without altering the original.



**Como a Persistência Funciona**:**How Persistence Works**:

- Quando você "modifica" uma estrutura de dados persistente, o Clojure cria uma nova versão apenas com as partes alteradas, reutilizando (compartilhando) as partes inalteradas.- When you "modify" a persistent data structure, Clojure creates a new version with only the changed parts, while reusing (sharing) unchanged parts.

- Exemplo: Adicionar um elemento a um vetor compartilha a maioria dos nós internos entre os vetores antigo e novo, tornando as operações rápidas e eficientes em memória.- Example: Adding an element to a vector shares most of the internal nodes between the old and new vectors, making operations fast and memory-efficient.



**Exemplo**:**Example**:

```clojure```clojure

(def meu-mapa {:a 1 :b 2})(def my-map {:a 1 :b 2})

(def mapa-atualizado (assoc meu-mapa :c 3))(def updated-map (assoc my-map :c 3))



(println meu-mapa)       ; => {:a 1 :b 2}(println my-map)       ; => {:a 1 :b 2}

(println mapa-atualizado) ; => {:a 1 :b 2 :c 3}(println updated-map)  ; => {:a 1 :b 2 :c 3}

``````

- `assoc` cria um novo mapa com `:c 3` adicionado, mas `meu-mapa` permanece inalterado.- `assoc` creates a new map with `:c 3` added, but `my-map` is unchanged.

- Internamente, o novo mapa compartilha as entradas `:a` e `:b` com o original, adicionando apenas um novo nó para `:c`.- Internally, the new map shares the `:a` and `:b` entries with the original, only adding a new node for `:c`.



#### **Benefícios das Estruturas de Dados Persistentes**#### **Benefits of Persistent Data Structures**

1. **Segurança de Thread**: Como os dados são imutáveis, múltiplas threads podem acessar a mesma estrutura sem conflitos.1. **Thread Safety**: Since data is immutable, multiple threads can access the same structure without conflicts.

2. **Viagem no Tempo**: Você pode manter referências a versões antigas das estruturas de dados sem se preocupar com modificações.2. **Time Travel**: You can keep references to older versions of data structures without worrying about them being modified.

3. **Performance**: O compartilhamento estrutural garante que operações como `conj`, `assoc`, ou `pop` sejam eficientes (tipicamente O(log32 n) para vetores e mapas, onde log32 é quase constante para propósitos práticos).3. **Performance**: Structural sharing ensures operations like `conj`, `assoc`, or `pop` are efficient (typically O(log32 n) for vectors and maps, where log32 is nearly constant for practical purposes).

4. **Pureza Funcional**: Encoraja escrever funções puras que não dependem de estado mutável.4. **Functional Purity**: Encourages writing pure functions that don’t rely on mutable state.



#### **Operações Comuns**#### **Common Operations**

Aqui estão algumas funções-chave para trabalhar com estruturas de dados persistentes:Here are some key functions for working with persistent data structures:

- **Vetores**:- **Vectors**:

    - `conj`: Adiciona um elemento ao final (`(conj [1 2] 3)` → `[1 2 3]`).    - `conj`: Adds an element to the end (`(conj [1 2] 3)` → `[1 2 3]`).

    - `pop`: Remove o último elemento (`(pop [1 2 3])` → `[1 2]`).    - `pop`: Removes the last element (`(pop [1 2 3])` → `[1 2]`).

    - `nth`: Acessa um elemento por índice (`(nth [1 2 3] 1)` → `2`).    - `nth`: Accesses an element by index (`(nth [1 2 3] 1)` → `2`).

- **Mapas**:- **Maps**:

    - `assoc`: Adiciona ou atualiza um par chave-valor (`(assoc {:a 1} :b 2)` → `{:a 1 :b 2}`).    - `assoc`: Adds or updates a key-value pair (`(assoc {:a 1} :b 2)` → `{:a 1 :b 2}`).

    - `dissoc`: Remove uma chave (`(dissoc {:a 1 :b 2} :a)` → `{:b 2}`).    - `dissoc`: Removes a key (`(dissoc {:a 1 :b 2} :a)` → `{:b 2}`).

    - `update`: Atualiza um valor para uma chave usando uma função (`(update {:a 1} :a inc)` → `{:a 2}`).    - `update`: Updates a value for a key using a function (`(update {:a 1} :a inc)` → `{:a 2}`).

- **Listas**:- **Lists**:

    - `conj`: Adiciona um elemento à frente (`(conj '(1 2) 3)` → `(3 1 2)`).    - `conj`: Adds an element to the front (`(conj '(1 2) 3)` → `(3 1 2)`).

    - `rest`: Retorna todos exceto o primeiro elemento (`(rest '(1 2 3))` → `(2 3)`).    - `rest`: Returns all but the first element (`(rest '(1 2 3))` → `(2 3)`).

- **Conjuntos**:- **Sets**:

    - `conj`: Adiciona um elemento (`(conj #{1 2} 3)` → `#{1 2 3}`).    - `conj`: Adds an element (`(conj #{1 2} 3)` → `#{1 2 3}`).

    - `disj`: Remove um elemento (`(disj #{1 2 3} 2)` → `#{1 3}`).    - `disj`: Removes an element (`(disj #{1 2 3} 2)` → `#{1 3}`).



#### **Exemplo Prático**#### **Practical Example**

Vamos combinar imutabilidade e persistência em um pequeno programa:Let’s combine immutability and persistence in a small program:

```clojure```clojure

(def usuario {:nome "Alice" :idade 30 :habilidades #{:clojure :java}})(def user {:name "Alice" :age 30 :skills #{:clojure :java}})

(def usuario-atualizado(def updated-user

  (-> usuario  (-> user

      (assoc :idade 31)                        ; Atualiza idade      (assoc :age 31)                   ; Update age

      (update :habilidades conj :python)))     ; Adiciona habilidade      (update :skills conj :python)))   ; Add skill



(println usuario)           ; => {:nome "Alice" :idade 30 :habilidades #{:java :clojure}}(println user)         ; => {:name "Alice" :age 30 :skills #{:java :clojure}}

(println usuario-atualizado) ; => {:nome "Alice" :idade 31 :habilidades #{:python :java :clojure}}(println updated-user) ; => {:name "Alice" :age 31 :skills #{:python :java :clojure}}

``````

- A macro `->` passa `usuario` por uma série de transformações, cada uma produzindo um novo mapa.- The `->` macro threads `user` through a series of transformations, each producing a new map.

- O `usuario` original permanece inalterado, e `usuario-atualizado` compartilha a maior parte de sua estrutura com `usuario`.- The original `user` remains unchanged, and `updated-user` shares most of its structure with `user`.



#### **Pegadinhas e Dicas**#### **Gotchas and Tips**

1. **Imutabilidade vs. Estado**: Embora as estruturas de dados sejam imutáveis, o Clojure oferece ferramentas como `atom`, `ref`, e `agent` para estado mutável gerenciado quando necessário (podemos explorar estes em conceitos posteriores).1. **Immutability vs. State**: While data structures are immutable, Clojure provides tools like `atom`, `ref`, and `agent` for managed mutable state when needed (we can explore these in later concepts).

2. **Performance**: Estruturas de dados persistentes são altamente otimizadas, mas operações como atualizações profundas em grandes estruturas aninhadas podem ser mais lentas que alternativas mutáveis em alguns casos.2. **Performance**: Persistent data structures are highly optimized, but operations like deep updates in large nested structures can be slower than mutable alternatives in some cases.

3. **Igualdade**: Estruturas imutáveis suportam igualdade estrutural (`=`), então `(= [1 2 3] [1 2 3])` é `true`, independente de serem o mesmo objeto.3. **Equality**: Immutable structures support structural equality (`=`), so `(= [1 2 3] [1 2 3])` is `true`, regardless of whether they’re the same object.



#### **Questões de Revisão**#### **Review Questions**

1. O que acontece com a estrutura de dados original quando você usa `conj` ou `assoc`?1. What happens to the original data structure when you use `conj` or `assoc`?

2. Como o compartilhamento estrutural melhora a performance em estruturas de dados persistentes?2. How does structural sharing improve performance in persistent data structures?

3. Escreva um trecho para criar um vetor `[1 2 3]`, adicione `4` a ele, e verifique que o original não mudou.3. Write a snippet to create a vector `[1 2 3]`, add `4` to it, and verify the original is unchanged.

4. Por que a imutabilidade é benéfica em um programa concorrente?4. Why is immutability beneficial in a concurrent program?



#### **Respostas das Questões de Revisão**#### **Review Question Answers**

1. **A estrutura de dados original permanece inalterada**: Quando você usa `conj` ou `assoc`, a estrutura de dados original nunca é modificada. Essas funções retornam uma nova versão da estrutura com as mudanças aplicadas, enquanto a original permanece exatamente igual.1. **Original data structure remains unchanged**: When you use `conj` or `assoc`, the original data structure is never modified. These functions return a new version of the data structure with the changes applied, while the original stays exactly the same.

   ```clojure   ```clojure

   (def mapa-original {:a 1 :b 2})   (def original-map {:a 1 :b 2})

   (def novo-mapa (assoc mapa-original :c 3))   (def new-map (assoc original-map :c 3))

   ;; mapa-original ainda é {:a 1 :b 2}   ;; original-map is still {:a 1 :b 2}

   ;; novo-mapa é {:a 1 :b 2 :c 3}   ;; new-map is {:a 1 :b 2 :c 3}

   ```   ```



2. **Compartilhamento estrutural otimiza memória e performance**: Ao invés de copiar toda a estrutura de dados, o Clojure reutiliza partes inalteradas entre as versões antiga e nova. Isso significa que operações são tipicamente O(log32 n), que é quase tempo constante para propósitos práticos, e o uso de memória é minimizado já que a maior parte da estrutura é compartilhada.2. **Structural sharing optimizes memory and performance**: Instead of copying the entire data structure, Clojure reuses unchanged parts between the old and new versions. This means operations are typically O(log32 n), which is nearly constant time for practical purposes, and memory usage is minimized since most of the structure is shared.



3. **Exemplo de criação de vetor e verificação**:3. **Vector creation and verification example**:

   ```clojure   ```clojure

   (def vetor-original [1 2 3])   (def original-vector [1 2 3])

   (def novo-vetor (conj vetor-original 4))   (def new-vector (conj original-vector 4))

      

   (println "Original:" vetor-original)  ; => [1 2 3]   (println "Original:" original-vector)  ; => [1 2 3]

   (println "Novo:" novo-vetor)         ; => [1 2 3 4]   (println "New:" new-vector)           ; => [1 2 3 4]

   (println "Inalterado?" (= vetor-original [1 2 3])) ; => true   (println "Unchanged?" (= original-vector [1 2 3])) ; => true

   ```   ```



4. **Benefícios da imutabilidade em programas concorrentes**: Como dados imutáveis não podem ser alterados, múltiplas threads podem ler com segurança a mesma estrutura de dados sem qualquer risco de condições de corrida, corrupção de dados ou necessidade de locks. Isso elimina classes inteiras de bugs de concorrência e torna a programação paralela muito mais segura e fácil de entender.4. **Immutability benefits in concurrent programs**: Since immutable data cannot be changed, multiple threads can safely read the same data structure without any risk of race conditions, data corruption, or the need for locks. This eliminates entire classes of concurrency bugs and makes parallel programming much safer and easier to reason about.

