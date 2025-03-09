#### O que é Engenharia de Requisitos?
A engenharia de requisitos é a **base do desenvolvimento de software**. Ela define com precisão **o que deve ser construído** e as **expectativas do cliente**, garantindo que o sistema atenda às necessidades dos usuários e aos padrões de qualidade. É um processo rigoroso que resulta em um **documento de requisitos**, essencial para orientar todo o desenvolvimento.

- **Por que é importante?** Evita ambiguidades e erros custosos, alinhando o produto final ao que foi solicitado.

#### Etapas do Processo
O processo de engenharia de requisitos é **cíclico** e envolve várias fases:

- **Especificação de Requisitos de Negócios:** Identifica as necessidades gerais da organização.
- **Estudo de Viabilidade:** Avalia se o projeto é tecnicamente e economicamente possível.
- **Elicitação de Requisitos:** Levanta as necessidades dos usuários e do sistema.
- **Prototipagem:** Cria modelos para refinar os requisitos.
- **Documentação:** Registra tudo em um documento claro e detalhado.

#### Tipos de Requisitos
Os requisitos podem ser classificados em três categorias principais:

- **Requisitos de Sistema:** Focam na parte técnica, como hardware, software e infraestrutura (ex.: "O sistema deve rodar em Windows 10").
- **Requisitos de Usuário:** Refletem o que os usuários esperam, em linguagem simples (ex.: "Quero consultar meu estoque rapidamente").
- **Requisitos Funcionais e Não Funcionais:**
  - **Funcionais:** Funções específicas do sistema (ex.: "Registrar entrada de produtos").
  - **Não Funcionais:** Atributos de qualidade, como desempenho e usabilidade (ex.: "O sistema deve responder em menos de 2 segundos").

**Exemplo prático:** Em um sistema de gerenciamento de estoque:
- Funcional: "Registrar saída de produtos."
- Não funcional: "O registro deve ser feito em tempo real."

#### Elicitação de Requisitos
A elicitação é uma das etapas mais críticas, pois define **o que realmente precisa ser feito** antes de pensar em soluções tecnológicas. Não é só coletar informações, mas **descobrir necessidades implícitas** dos *stakeholders*.

- **Desafios comuns:**
  - **Divergências de visão:** Usuários e desenvolvedores podem interpretar o mesmo pedido de formas diferentes.
  - **Requisitos voláteis:** Mudanças constantes ao longo do projeto.
  - **Falta de clareza:** Clientes nem sempre sabem explicar o que querem.

- **Dica de memorização:** Pense na elicitação como "detetive de requisitos" – é preciso investigar além do óbvio!

**Exemplo:** Em um sistema de biblioteca, o cliente pede "um jeito de emprestar livros". O engenheiro descobre que isso inclui verificar disponibilidade e registrar o empréstimo – detalhes que não foram ditos inicialmente.

#### Técnicas de Elicitação
Existem várias técnicas para levantar requisitos, e a escolha depende do projeto:

- **Entrevistas:** Abertas (conversa livre) ou fechadas (perguntas diretas).
- **Storytelling:** Pedir ao usuário para contar como usa o sistema no dia a dia.
- **Role-Playing:** Simular as tarefas do usuário (ex.: acompanhar um motorista para entender um sistema de entregas).
- **Etnografia:** Observar o ambiente de trabalho em detalhes.
- **Brainstorming e Mind Mapping:** Gerar e organizar ideias em equipe.

**Exemplo prático:** Para um sistema de entregas:
- Entrevista: "Como você registra entregas hoje?"
- Storytelling: "Me conte sobre um dia comum entregando pacotes."
- Mind Mapping: Mapear ideias como "rastreamento", "confirmação" e "relatórios".

#### Casos de Uso
Os **casos de uso** são uma técnica poderosa para mostrar como os usuários interagem com o sistema. Eles ajudam a **delimitar o escopo** e podem até gerar código-fonte.

- **Componentes:**
  - **Atores:** Quem usa o sistema (ex.: cliente, bibliotecário).
  - **Casos de Uso:** Ações específicas (ex.: "solicitar empréstimo").

- **Notação:** Um diagrama simples com atores ligados a ações.

**Exemplo de sistema de biblioteca:**
- Atores: Cliente, Bibliotecário.
- Casos de uso:
  - Cliente: "Solicitar empréstimo."
  - Bibliotecário: "Registrar empréstimo."
  - Sistema: "Atualizar status do livro."
