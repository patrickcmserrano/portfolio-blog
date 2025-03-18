# **Pilhas: Uma Estrutura de Dados Fundamental na Programação**

A **pilha** é uma estrutura de dados essencial na ciência da computação, amplamente aplicada em diversas áreas da programação. Pense em uma pilha como uma torre de bandejas em uma lanchonete: você só pode adicionar ou remover bandejas pelo topo. Esse comportamento é regido pelo princípio **LIFO (Last In, First Out)**, ou **UEPS (Último a Entrar, Primeiro a Sair)**, o que significa que o último elemento inserido é o primeiro a ser retirado.

Neste post, vamos explorar o que é uma pilha, suas operações básicas, como implementá-la em Java e suas aplicações práticas. Se você está começando na programação ou se preparando para desafios técnicos, entender pilhas é um passo fundamental.

---

## **O que é uma Pilha?**

Uma pilha é uma estrutura de dados **linear**, ou seja, os elementos são organizados em sequência. No entanto, ela tem uma característica especial: todas as operações de inserção e remoção acontecem exclusivamente no **topo**. Isso restringe o acesso aos elementos, tornando o LIFO seu mecanismo central.

### **Exemplo do Princípio LIFO**
- **Pilha de pratos**: Você empilha pratos novos no topo e, ao precisar de um, pega o último colocado.
- **Histórico de navegação**: Em um navegador, ao clicar em "voltar", você retorna à página mais recente visitada.

Essa lógica torna as pilhas perfeitas para situações onde a ordem inversa de inserção é importante.

---

## **Operações Básicas de uma Pilha**

As pilhas possuem um conjunto de operações fundamentais que permitem manipulá-las de forma eficiente. Veja cada uma delas:

### **1. Empilhar (Push)**
- **Descrição**: Adiciona um novo elemento ao topo da pilha.
- **Exemplo**: Inserir uma nova tarefa urgente em uma lista.
- **Complexidade**: O(1) – tempo constante.

### **2. Desempilhar (Pop)**
- **Descrição**: Remove o elemento do topo da pilha.
- **Exemplo**: Executar a última tarefa adicionada.
- **Complexidade**: O(1).
- **Nota**: Só pode ser feita se a pilha não estiver vazia, ou ocorrerá um erro.

### **3. Verificar se a Pilha Está Vazia (IsEmpty)**
- **Descrição**: Confirma se a pilha não contém elementos.
- **Exemplo**: Checar se há tarefas pendentes.
- **Complexidade**: O(1).

### **4. Verificar se a Pilha Está Cheia (IsFull)**
- **Descrição**: Verifica se a pilha atingiu sua capacidade máxima (em implementações com tamanho fixo).
- **Exemplo**: Confirmar se há espaço para mais tarefas.
- **Complexidade**: O(1).

### **5. Visualizar o Elemento do Topo (Peek)**
- **Descrição**: Retorna o elemento no topo sem removê-lo.
- **Exemplo**: Consultar a próxima tarefa sem executá-la.
- **Complexidade**: O(1).

### **6. Mostrar Todos os Elementos**
- **Descrição**: Exibe todos os elementos da pilha, geralmente do topo à base.
- **Exemplo**: Listar todas as tarefas em aberto.
- **Complexidade**: O(n) – depende do número de elementos.

---

## **Implementação de Pilhas em Java**

Em Java, você pode usar a classe pronta `java.util.Stack`, que oferece métodos como `push()` (empilhar), `pop()` (desempilhar) e `peek()` (visualizar o topo). Porém, para compreender o funcionamento interno, é valioso criar sua própria implementação. Vamos fazer isso com um exemplo simples usando um array.

### **Exemplo de Código em Java**

Aqui está uma implementação básica de uma pilha:

```java
class Pilha {
    private int[] elementos;  // Array para armazenar os elementos
    private int topo;         // Índice do topo da pilha
    private int capacidade;   // Tamanho máximo da pilha

    // Construtor: inicializa a pilha com um tamanho máximo
    public Pilha(int tamanho) {
        this.capacidade = tamanho;
        this.elementos = new int[tamanho];
        this.topo = -1; // Pilha vazia
    }

    // Verifica se a pilha está vazia
    public boolean pilhaVazia() {
        return topo == -1;
    }

    // Verifica se a pilha está cheia
    public boolean pilhaCheia() {
        return topo == capacidade - 1;
    }

    // Adiciona um elemento ao topo
    public void empilhar(int valor) {
        if (pilhaCheia()) {
            System.out.println("Erro: Pilha cheia!");
        } else {
            elementos[++topo] = valor;
        }
    }

    // Remove e retorna o elemento do topo
    public int desempilhar() {
        if (pilhaVazia()) {
            System.out.println("Erro: Pilha vazia!");
            return -1; // Valor sentinela
        } else {
            return elementos[topo--];
        }
    }

    // Retorna o elemento do topo sem removê-lo
    public int elementoTopo() {
        if (pilhaVazia()) {
            System.out.println("Erro: Pilha vazia!");
            return -1;
        } else {
            return elementos[topo];
        }
    }

    // Exibe todos os elementos da pilha
    public void mostrarPilha() {
        if (pilhaVazia()) {
            System.out.println("Pilha vazia!");
        } else {
            for (int i = topo; i >= 0; i--) {
                System.out.print(elementos[i] + " ");
            }
            System.out.println();
        }
    }
}

// Exemplo de uso
public class Main {
    public static void main(String[] args) {
        Pilha pilha = new Pilha(5); // Cria uma pilha com capacidade 5
        pilha.empilhar(10);
        pilha.empilhar(20);
        pilha.empilhar(30);
        pilha.mostrarPilha();          // Saída: 30 20 10
        System.out.println("Topo: " + pilha.elementoTopo()); // Saída: 30
        pilha.desempilhar();           // Remove o 30
        pilha.mostrarPilha();          // Saída: 20 10
    }
}
```

Essa implementação usa um array fixo, mas você pode adaptá-la para uma versão dinâmica com listas ligadas, se precisar de flexibilidade no tamanho.

---

## **Aplicações Práticas das Pilhas**

As pilhas são extremamente úteis em várias situações da computação e até no cotidiano. Confira alguns exemplos:

### **Na Programação**
- **Histórico de Navegação**: Navegadores armazenam as páginas visitadas em uma pilha, permitindo voltar à página anterior.
- **Função "Desfazer"**: Editores de texto usam pilhas para reverter ações recentes.
- **Compiladores**: Avaliam expressões matemáticas (ex.: conversão de infixa para pós-fixa) e gerenciam chamadas de função.
- **Busca em Profundidade (DFS)**: Algoritmos em grafos utilizam pilhas para explorar caminhos.

### **No Dia a Dia**
- **Pilha de Pratos**: Só o prato do topo pode ser retirado ou adicionado.
- **Fila de Tarefas**: Tarefas recentes são priorizadas em alguns sistemas.

---

## **Por que Aprender Pilhas?**

Compreender as pilhas é crucial para qualquer programador, pois elas são simples, mas poderosas. Elas aparecem em problemas reais e são frequentemente cobradas em entrevistas técnicas. Dominar suas operações e implementações ajuda a resolver desafios como:
- Verificar balanceamento de parênteses em uma expressão.
- Inverter a ordem de elementos em uma sequência.
- Gerenciar recursão em algoritmos.

---

## **Conclusão**

As pilhas, com seu princípio LIFO, são uma ferramenta indispensável na programação. Suas operações básicas — empilhar, desempilhar, verificar o estado e visualizar o topo — são fáceis de entender e implementar, mas abrem portas para soluções elegantes em problemas complexos. Em Java, você pode usar a biblioteca pronta ou criar sua própria implementação para aprofundar seu conhecimento.

Agora que você conhece os fundamentos, experimente implementar uma pilha e aplicá-la em um projeto pessoal. Com prática, você verá como essa estrutura simples pode transformar a forma como você resolve problemas. Programe, teste e aprenda — o próximo passo é com você! 🚀