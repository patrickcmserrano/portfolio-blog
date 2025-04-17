# Construindo Aplicações Java Robustas: Exceções, Arquivos e Threads

Criar aplicações Java confiáveis e eficientes exige dominar ferramentas que lidam com erros, persistem dados localmente e gerenciam tarefas concorrentes. Neste terceiro e último post da série sobre fundamentos do Java, exploramos **tratamento de exceções**, **manipulação de arquivos** e **programação com threads**, com exemplos práticos e um toque de perspectiva funcional quando relevante. Se você busca desenvolver sistemas robustos, este guia é para você!

## Tratando Exceções: Lidando com Erros de Forma Segura

Exceções em Java são objetos que sinalizam condições anormais, como tentar ler um arquivo inexistente ou dividir por zero. O mecanismo de tratamento permite capturar e processar esses erros, garantindo que a aplicação permaneça estável.

### Blocos `try-catch` e `finally`

- **try**: Contém código que pode lançar exceções.
- **catch**: Trata a exceção capturada.
- **finally**: Executa sempre, ideal para liberar recursos.

Exemplo:

```java
try {
    int divisao = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Erro: " + e.getMessage());
} finally {
    System.out.println("Operação finalizada.");
}
```

Use `try-with-resources` para fechar recursos automaticamente:

```java
try (Scanner scanner = new Scanner(new File("dados.txt"))) {
    while (scanner.hasNextLine()) {
        System.out.println(scanner.nextLine());
    }
} catch (FileNotFoundException e) {
    System.out.println("Arquivo não encontrado: " + e.getMessage());
}
```

### Cláusula `throws`

Métodos podem declarar exceções com `throws`, delegando o tratamento ao chamador:

```java
public void lerArquivo(String caminho) throws IOException {
    Files.readString(Path.of(caminho));
}
```

### Tipos de Exceções

- **Throwable**: Base para:
  - **Exception**: Condições recuperáveis.
    - **RuntimeException**: Exceções não verificadas (e.g., `NullPointerException`).
  - **Error**: Erros graves (e.g., `OutOfMemoryError`).
- **Exceções Verificadas**: Subclasses de `Exception` (exceto `RuntimeException`), exigem tratamento (e.g., `IOException`).
- **Exceções Não Verificadas**: Subclasses de `RuntimeException` ou `Error`, não exigem tratamento (e.g., `ArithmeticException`).

### Exceções Personalizadas

Crie exceções específicas para erros da aplicação:

```java
public class SaldoInsuficienteException extends Exception {
    public SaldoInsuficienteException(String mensagem) {
        super(mensagem);
    }
}

public void sacar(double valor, double saldo) throws SaldoInsuficienteException {
    if (valor > saldo) {
        throw new SaldoInsuficienteException("Saldo insuficiente");
    }
}
```

### Perspectiva Funcional

A programação funcional favorece evitar exceções em favor de tipos como `Optional` para cenários previsíveis:

```java
Optional<Double> validarSaque(double valor, double saldo) {
    return valor <= saldo ? Optional.of(valor) : Optional.empty();
}
```

Isso reduz o uso de exceções para casos verdadeiramente excepcionais, aumentando a clareza.

## Manipulando Arquivos: Persistência Local

Arquivos oferecem armazenamento permanente, ao contrário da RAM volátil, sendo cruciais para configurações, logs e dados.

### Classe `File`

A classe `File` (pacote `java.io`) gerencia informações de arquivos:

```java
File arquivo = new File("dados.txt");
if (arquivo.exists()) {
    System.out.println("Tamanho: " + arquivo.length() + " bytes");
}
```

Métodos úteis: `exists()`, `isDirectory()`, `createNewFile()`, `delete()`.

### Fluxos de Dados

- **Leitura**: `InputStream` (bytes) e `Reader` (caracteres).
- **Gravação**: `OutputStream` (bytes) e `Writer` (caracteres).

Exemplo de leitura com `FileReader`:

```java
try (FileReader reader = new FileReader("dados.txt")) {
    int caractere;
    while ((caractere = reader.read()) != -1) {
        System.out.print((char) caractere);
    }
} catch (IOException e) {
    System.out.println("Erro: " + e.getMessage());
}
```

Gravação com `FileWriter`:

```java
try (FileWriter writer = new FileWriter("saida.txt")) {
    writer.write("Olá, Java!");
} catch (IOException e) {
    System.out.println("Erro: " + e.getMessage());
}
```

### Arquivos de Propriedades

A classe `Properties` gerencia pares chave-valor:

```java
Properties props = new Properties();
try (FileReader reader = new FileReader("config.properties")) {
    props.load(reader);
    String valor = props.getProperty("tema", "escuro");
    System.out.println("Tema: " + valor);
} catch (IOException e) {
    System.out.println("Erro: " + e.getMessage());
}
```

### Serialização

A interface `Serializable` permite salvar objetos como fluxos de bytes:

```java
public class Configuracao implements Serializable {
    private String usuario;
    private transient String senha; // Não serializada

    public Configuracao(String usuario, String senha) {
        this.usuario = usuario;
        this.senha = senha;
    }
}

try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("config.ser"))) {
    out.writeObject(new Configuracao("admin", "123"));
} catch (IOException e) {
    System.out.println("Erro: " + e.getMessage());
}
```

### Perspectiva Funcional

A programação funcional sugere minimizar mutações. Ao ler arquivos, trato dados como fluxos imutáveis com `Files.readAllLines()` e `Stream`:

```java
try {
    Files.readAllLines(Path.of("dados.txt"))
         .stream()
         .filter(linha -> !linha.isEmpty())
         .forEach(System.out::println);
} catch (IOException e) {
    System.out.println("Erro: " + e.getMessage());
}
```

## Programação com Threads: Concorrência Eficiente

Threads permitem executar múltiplas tarefas simultaneamente, otimizando o uso da CPU e a responsividade.

### Criando Threads

- **Runnable**:

```java
class Tarefa implements Runnable {
    public void run() {
        System.out.println("Tarefa executando em: " + Thread.currentThread().getName());
    }
}
Thread t = new Thread(new Tarefa());
t.start();
```

- **Thread**:

```java
class MinhaThread extends Thread {
    public void run() {
        System.out.println("Thread rodando!");
    }
}
MinhaThread t = new MinhaThread();
t.start();
```

### Ciclo de Vida

- **New**: Criada, mas não iniciada.
- **Runnable**: Pronta para execução.
- **Running**: Executando.
- **Blocked**: Aguardando (e.g., I/O, `join()`).
- **Dead**: Finalizada.

### Métodos Chave

- `start()`: Inicia a thread.
- `sleep(long millis)`: Pausa a execução.
- `join()`: Aguarda a thread terminar.
- `interrupt()`: Sinaliza interrupção.

Exemplo com `join()`:

```java
Thread t1 = new Thread(() -> System.out.println("Tarefa 1"));
Thread t2 = new Thread(() -> System.out.println("Tarefa 2"));
t1.start();
try {
    t1.join(); // Aguarda t1 terminar
} catch (InterruptedException e) {
    System.out.println("Erro: " + e.getMessage());
}
t2.start();
```

### Perspectiva Funcional

Threads introduzem estado compartilhado, que a programação funcional evita. Prefiro estruturas imutáveis e passo dados via cópias:

```java
List<String> dados = List.of("A", "B", "C"); // Imutável
Runnable tarefa = () -> dados.forEach(System.out::println);
new Thread(tarefa).start();
```

Para concorrência complexa, uso `ExecutorService` com `Stream` paralelo, mantendo um estilo declarativo.

## Conclusão: Pratique para Dominar

Exceções, arquivos e threads são pilares para aplicações Java robustas. A perspectiva funcional, com ênfase em imutabilidade e expressividade, aprimora a clareza e segurança do código. Para consolidar o aprendizado, experimente:

- Criar uma exceção personalizada para validar entradas.
- Desenvolver um programa que lê/escreve arquivos de propriedades.
- Implementar threads para processar tarefas paralelas.

Erros são professores valiosos — explore-os! Confira a [documentação oficial do Java](https://docs.oracle.com/en/java/) e experimente bibliotecas como Vavr para um toque funcional. Esta série termina aqui, mas sua jornada com Java está apenas começando. Codifique com entusiasmo!