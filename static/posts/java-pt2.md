# Gerenciando Dados em Java: Strings, Collections e JDBC

Manipular dados é o núcleo de qualquer aplicação, e o Java oferece ferramentas robustas para processar, organizar e persistir informações. Minha jornada com Clojure, uma linguagem funcional que roda na JVM, moldou minha preferência por código expressivo e imutável, influenciando até mesmo como abordo o paradigma orientado a objetos do Java. Neste segundo post da série sobre fundamentos do Java, vamos explorar a manipulação de **Strings**, o poderoso **framework de Collections** e a conexão com bancos de dados via **JDBC**. Com exemplos práticos e um toque de pensamento funcional, este guia é para quem quer dominar a gestão de dados em Java!

## Trabalhando com Strings: Imutabilidade e Eficiência

A classe `String` é essencial no Java, representando sequências de caracteres. Sua **imutabilidade** é um recurso chave: após criada, uma string não pode ser alterada. Operações como concatenação geram novos objetos, o que pode impactar a performance em loops intensivos:

```java
String mensagem = "Olá";
mensagem = mensagem + ", mundo!"; // Cria um novo objeto String
```

Para manipulações frequentes, use `StringBuilder` (não thread-safe, mais rápido) ou `StringBuffer` (thread-safe, mais lento). Veja um exemplo com `StringBuilder`:

```java
StringBuilder sb = new StringBuilder("Olá");
sb.append(", mundo!");
System.out.println(sb.toString()); // "Olá, mundo!"
```

### Métodos Úteis da Classe `String`

- `charAt(int index)`: Retorna o caractere em uma posição.
- `concat(String s)`: Junta strings (ou use `+`).
- `substring(int begin, int end)`: Extrai uma parte.
- `toLowerCase()` / `toUpperCase()`: Altera caixa.
- `trim()`: Remove espaços em branco.
- `contains(String s)`: Verifica substrings.
- `equals(Object o)`: Compara conteúdo (evite `==`, que compara referências).
- `equalsIgnoreCase(String s)`: Compara ignorando maiúsculas/minúsculas.

Exemplo prático:

```java
String texto = "  Java é incrível!  ";
System.out.println(texto.trim().toUpperCase()); // "JAVA É INCRÍVEL!"
System.out.println(texto.contains("Java")); // true
```

### Insight Funcional

A imutabilidade de `String` ressoa com os princípios de Clojure, evitando efeitos colaterais indesejados. Para operações intensivas, `StringBuilder` atua como uma estrutura mutável temporária, mas prefiro retornar resultados imutáveis sempre que possível, mantendo o código previsível.

## Explorando Collections: Organizando Dados com Flexibilidade

O **Java Collections Framework** é uma biblioteca poderosa para gerenciar grupos de objetos, oferecendo interfaces como `List`, `Set`, `Map` e suas implementações otimizadas.

### Principais Interfaces e Implementações

- **List**: Coleção ordenada que permite duplicatas.

  - `ArrayList`: Usa um array dinâmico, ideal para acesso rápido.
  - `LinkedList`: Lista duplamente encadeada, eficiente para inserções/remoções.
  - `Vector`: Thread-safe, mas menos usado hoje.

  Exemplo com `ArrayList`:

  ```java
  List<String> nomes = new ArrayList<>();
  nomes.add("Alice");
  nomes.add("Bob");
  System.out.println(nomes.get(0)); // "Alice"
  ```

- **Set**: Coleção sem duplicatas.

  - `HashSet`: Não ordenado, usa hash para unicidade.
  - `LinkedHashSet`: Preserva ordem de inserção.
  - `TreeSet`: Ordena elementos (naturalmente ou via `Comparator`).

  Exemplo com `TreeSet`:

  ```java
  Set<Integer> numeros = new TreeSet<>();
  numeros.add(5);
  numeros.add(2);
  System.out.println(numeros); // [2, 5]
  ```

- **Map**: Armazena pares chave-valor, sem chaves duplicadas.

  - `HashMap`: Não ordenado, permite `null`.
  - `LinkedHashMap`: Mantém ordem de inserção.
  - `TreeMap`: Ordena chaves.

  Exemplo com `HashMap`:

  ```java
  Map<String, Integer> idades = new HashMap<>();
  idades.put("Alice", 25);
  idades.put("Bob", 30);
  System.out.println(idades.get("Alice")); // 25
  ```

### Iteradores e Utilitários

- **`Iterator`**: Percorre coleções (`hasNext()`, `next()`).
- **`ListIterator`**: Extende `Iterator` para listas, permitindo navegação bidirecional.
- **`Comparator`**: Define ordens personalizadas.
- **`Collections`**: Oferece métodos como `sort()`, `reverse()`, `shuffle()`.

Exemplo de ordenação:

```java
List<String> nomes = new ArrayList<>(Arrays.asList("Bob", "Alice"));
Collections.sort(nomes);
System.out.println(nomes); // [Alice, Bob]
```

### Insight Funcional

Em Clojure, trabalho com coleções imutáveis e funções como `map` e `filter`. No Java, uso a API `Stream` para um estilo semelhante:

```java
List<String> nomes = Arrays.asList("Alice", "Bob", "Ana");
List<String> filtrados = nomes.stream()
                             .filter(n -> n.startsWith("A"))
                             .collect(Collectors.toList());
System.out.println(filtrados); // [Alice, Ana]
```

Isso torna o código mais declarativo e reduz mutações, alinhando-se aos princípios funcionais.

## Conectando a Bancos de Dados com JDBC

Para persistir dados, o Java oferece o **JDBC (Java Database Connectivity)**, uma API que conecta a linguagem a bancos de dados relacionais (como MySQL, PostgreSQL) e NoSQL, de forma independente do fornecedor.

### Bancos de Dados

- **Relacionais**: Organizam dados em tabelas com chaves primárias, usando SQL (e.g., MySQL, PostgreSQL).
- **NoSQL**: Flexíveis, com modelos como chave-valor (Redis) ou documentos (MongoDB).

### Configurando e Usando JDBC

1. **Importe pacotes**: `import java.sql.*;`.
2. **Registre o driver**: Use `Class.forName("com.mysql.cj.jdbc.Driver")` para MySQL, por exemplo.
3. **Conecte**: Formule a URL (e.g., `jdbc:mysql://localhost:3306/meu_banco`) e use `DriverManager.getConnection(url, usuario, senha)`.
4. **Execute comandos**:
   - `Statement`: Para SQL simples.
   - `PreparedStatement`: Para consultas parametrizadas, mais seguras.
   - `ResultSet`: Recupera resultados.

Exemplo de consulta com `PreparedStatement`:

```java
try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/meu_banco", "user", "pass");
     PreparedStatement stmt = conn.prepareStatement("SELECT nome FROM usuarios WHERE idade > ?")) {
    stmt.setInt(1, 18);
    ResultSet rs = stmt.executeQuery();
    while (rs.next()) {
        System.out.println(rs.getString("nome"));
    }
} catch (SQLException e) {
    e.printStackTrace();
}
```

### Fechando Conexões

Use blocos `try-with-resources` para fechar `Connection`, `Statement` e `ResultSet` automaticamente, garantindo liberação de recursos.

### Insight Funcional

Em Clojure, trato dados como fluxos imutáveis. No JDBC, aplico `Stream` para processar `ResultSet`:

```java
List<String> nomes = new ArrayList<>();
try (ResultSet rs = stmt.executeQuery()) {
    Stream.generate(() -> {
        try {
            return rs.next() ? rs.getString("nome") : null;
        } catch (SQLException e) {
            return null;
        }
    })
    .takeWhile(Objects::nonNull)
    .forEach(nomes::add);
}
```

Isso reduz mutações e melhora a legibilidade, inspirado por pipelines funcionais.

## Conclusão: Pratique para Dominar

Strings, Collections e JDBC formam o alicerce para gerenciar dados em Java. Minha experiência com Clojure me levou a buscar imutabilidade e expressividade, usando `StringBuilder` para eficiência, `Stream` para coleções e pipelines para consultas. Para consolidar o aprendizado, experimente:

- Criar um validador de strings com `trim()` e `contains()`.
- Organizar dados em um `HashMap` ou `TreeSet`.
- Conectar a um banco MySQL e consultar dados com `PreparedStatement`.

Erros são oportunidades de aprendizado — explore-os! Confira a [documentação do Java Collections Framework](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/package-summary.html) e experimente bibliotecas como Vavr para um toque funcional. No próximo post, abordaremos exceções, arquivos e threads para aplicações robustas. Até lá, mergulhe no código com curiosidade!
