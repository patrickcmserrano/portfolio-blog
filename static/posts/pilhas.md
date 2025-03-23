# **Pilhas: Uma Estrutura de Dados Fundamental na Programação**

A **pilha** é uma estrutura de dados essencial na ciência da computação, amplamente utilizada em diversas áreas da programação. Imagine-a como uma torre de bandejas em uma lanchonete: você pode adicionar ou remover bandejas **apenas pelo topo**. Esse comportamento ilustra o princípio **LIFO (Last In, First Out)** — ou **UEPS (Último a Entrar, Primeiro a Sair)** — em que o último elemento inserido é o primeiro a ser removido.

Neste post, exploramos o conceito de pilhas, suas operações básicas, uma implementação prática em Java e suas diversas aplicações. Se você está iniciando na programação ou se preparando para desafios técnicos, dominar as pilhas é um passo importante.

---

## **O que é uma Pilha?**

Uma pilha é uma estrutura de dados **linear**, onde os elementos são organizados em sequência. Sua particularidade é que todas as operações de inserção e remoção acontecem **no mesmo ponto – o topo**. Essa característica facilita a gestão de dados cuja ordem de processamento precisa ser o inverso da ordem de chegada.

### **Exemplos do Princípio LIFO**

- **Pilha de pratos**: Você empilha pratos novos em cima, e quando precisa de um prato, sempre retira o que está no topo.
- **Histórico de navegação**: Ao clicar em "voltar", o navegador acessa a página mais recente, que foi a última a ser carregada.

---

## **Operações Básicas de uma Pilha**

Para manipular uma pilha, usamos um conjunto padrão de operações:

| Operação                | Descrição                                                                              | Exemplo de Uso                        | Complexidade |
|-------------------------|----------------------------------------------------------------------------------------|---------------------------------------|--------------|
| **Empilhar (Push)**     | Adiciona um novo elemento ao topo da pilha, se houver espaço.                          | Inserir uma nova tarefa urgente       | O(1)         |
| **Desempilhar (Pop)**   | Remove e retorna o elemento do topo da pilha, se esta não estiver vazia.                | Executar a última tarefa adicionada     | O(1)         |
| **Verificar se Vazia**  | Checa se a pilha não contém elementos.                                                  | Validar se a lista de tarefas está vazia      | O(1)         |
| **Verificar se Cheia**  | Confirma se a pilha atingiu sua capacidade máxima (útil em implementações com tamanho fixo). | Verificar se há espaço para novas tarefas | O(1)         |
| **Elemento do Topo (Peek)** | Retorna o elemento do topo sem removê-lo.                                            | Consultar qual será a próxima tarefa executada | O(1)         |
| **Mostrar Todos os Elementos** | Exibe todos os elementos armazenados na pilha do topo à base.                   | Listar todas as tarefas pendentes         | O(n)         |

Cada uma dessas operações é fundamental para manipulação eficiente dos dados armazenados na pilha.

---

## **Implementação de Pilhas em Java**

Embora a linguagem Java forneça a classe `java.util.Stack`, compreender a implementação interna é essencial para solidificar o entendimento do funcionamento das pilhas. Abaixo, um exemplo simples com um array fixo, que demonstra as operações básicas:

```java
class Pilha {
    private int[] elementos;  // Array para armazenar os elementos
    private int topo;         // Índice do elemento do topo da pilha
    private int capacidade;   // Tamanho máximo da pilha

    // Construtor: inicializa a pilha com um tamanho fixo
    public Pilha(int tamanho) {
        this.capacidade = tamanho;
        this.elementos = new int[tamanho];
        this.topo = -1; // Pilha começa vazia
    }

    // Verifica se a pilha está vazia
    public boolean pilhaVazia() {
        return topo == -1;
    }

    // Verifica se a pilha está cheia
    public boolean pilhaCheia() {
        return topo >= capacidade - 1;
    }

    // Empilha: adiciona um elemento no topo
    public void empilhar(int valor) {
        if (pilhaCheia()) {
            System.out.println("Erro: Pilha cheia!");
        } else {
            elementos[++topo] = valor;
        }
    }

    // Desempilha: remove e retorna o elemento do topo
    public int desempilhar() {
        if (pilhaVazia()) {
            System.out.println("Erro: Pilha vazia!");
            return -1; // Valor sentinela para indicar erro
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

    // Exibe todos os elementos da pilha do topo à base
    public void mostrarPilha() {
        if (pilhaVazia()) {
            System.out.println("Pilha vazia!");
        } else {
            System.out.println("Elementos na pilha:");
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
        Pilha pilha = new Pilha(5); // Cria uma pilha com capacidade para 5 elementos

        // Adiciona elementos à pilha
        pilha.empilhar(10);
        pilha.empilhar(20);
        pilha.empilhar(30);

        // Exibe a pilha e o elemento do topo
        pilha.mostrarPilha();                  // Saída: 30 20 10
        System.out.println("Topo: " + pilha.elementoTopo()); // Saída: 30

        // Remove o elemento do topo e exibe a pilha novamente
        pilha.desempilhar();
        pilha.mostrarPilha();                  // Saída: 20 10
    }
}
```

Este exemplo ilustra como as operações de empilhar, desempilhar, verificar se a pilha está cheia ou vazia e exibir o elemento do topo são implementadas e funcionam de maneira integrada.

---

## **Aplicações Práticas das Pilhas**

As pilhas são extremamente versáteis e são empregadas em diversas áreas:

- **Na Programação**:
  - **Histórico de Navegação:** Navegadores armazenam as páginas visitadas usando pilhas, facilitando o recurso de "voltar".
  - **Função Undone:** Editores de texto e softwares gráficos utilizam pilhas para reverter ações recentes.
  - **Compiladores e Avaliação de Expressões:** Pilhas são usadas para gerenciar chamadas de função e converter expressões de infixa para pós-fixa.
  - **Busca em Profundidade (DFS):** Algoritmos de grafos usam pilhas para explorar diferentes caminhos.

- **No Cotidiano**:
  - **Pilha de Pratos:** Apenas o prato no topo pode ser retirado ou adicionado.
  - **Gerenciamento de Tarefas:** Em determinados sistemas, as tarefas mais recentes são priorizadas usando uma abordagem baseada em pilha.

---

## **Por que Aprender sobre Pilhas?**

Entender pilhas é crucial para qualquer programador, pois:

- Elas possuem uma lógica simples, porém extremamente poderosa, para resolver problemas que envolvem a ordem inversa dos dados.
- São frequentemente cobradas em entrevistas técnicas e são usadas em diversas áreas da computação.
- A implementação de pilhas auxilia o domínio de conceitos fundamentais como gerenciamento de memória, controle de fluxo (recursão) e estruturas de dados.

---

## **Conclusão**

As pilhas, guiadas pelo princípio LIFO, são indispensáveis na programação. Suas operações básicas — empilhar, desempilhar, verificar se a pilha está cheia ou vazia, visualizar o elemento do topo e exibir todos os elementos — são simples de entender e implementar, mas oferecem poderosas soluções para problemas complexos. Seja utilizando a classe pronta em Java ou criando sua própria estrutura, o conhecimento sobre pilhas abre portas para resolver inúmeros desafios na computação.

Experimente implementar uma pilha e integrá-la em seus projetos. Com prática e exploração, você descobrirá como essa estrutura pode transformar a abordagem de resolução de problemas. Programe, teste, e continue explorando! 🚀
