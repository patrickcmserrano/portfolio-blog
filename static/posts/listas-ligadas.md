### Resumo do Comportamento de Listas Ligadas

Uma **lista ligada** é uma estrutura de dados linear que organiza elementos (nós) de forma dinâmica. Cada nó contém um dado e uma referência para o próximo nó, formando uma cadeia. Diferente de vetores, ela não exige alocação prévia de memória, pois esta é alocada conforme os elementos são inseridos, evitando desperdício.

#### Comportamento Principal
- **Dinâmica**: Cresce ou diminui com inserções e remoções, sem realocar toda a estrutura.
- **Flexibilidade**: Permite adicionar ou remover elementos no início, meio ou final sem reorganização completa.
- **Eficiência**: Operações como inserção e remoção no início têm tempo constante O(1), ao contrário de arrays, onde podem ser O(n).

#### Operações Típicas
- **Inserir**: No início, meio ou final.
- **Remover**: Em qualquer posição.
- **Verificar**: Se está vazia.
- **Acessar**: Primeiro ou último elemento (sem remover).
- **Contar**: Número de nós.
- **Buscar**: Verifica se um elemento existe.
- **Mostrar**: Exibe todos os elementos.
- **Destruir**: Remove tudo.

#### Vantagens
- **Uso eficiente de memória**: Aloca apenas o necessário.
- **Ideal para**: Tamanhos imprevisíveis ou operações frequentes de inserção/remoção (ex.: filas de banco).

Em resumo, a lista ligada é **versátil e eficiente** para gerenciar dados que mudam constantemente, otimizando memória e operações.