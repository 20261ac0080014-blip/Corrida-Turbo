export type TopicCategory = 'Lógica' | 'HTML' | 'CSS' | 'JavaScript';

export interface QuizQuestion {
  id: number;
  category: TopicCategory;
  question: string;
  codeSnippet?: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export const POINTS_PER_QUESTION = 100;

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'Lógica',
    question: 'Em programação, para que serve uma variável?',
    options: [
      'Para estilizar as cores de uma página na internet',
      'Para armazenar um valor na memória que pode ser usado e alterado no código',
      'Para repetir um bloco de instruções automaticamente para sempre',
      'Para desligar o computador quando ocorre um erro',
    ],
    correctIndex: 1,
    explanation:
      'Uma variável funciona como uma caixa identificada na memória: ela guarda dados (como números, textos ou booleanos) para serem usados ao longo do programa.',
  },
  {
    id: 2,
    category: 'Lógica',
    question: 'Qual será o valor final exibido pela lógica abaixo?',
    codeSnippet: `nota = 7\nse (nota >= 6) entao\n  resultado = "Aprovado"\nsenao\n  resultado = "Em recuperação"`,
    options: [
      '"Em recuperação"',
      '7',
      '"Aprovado"',
      'Nenhuma das alternativas',
    ],
    correctIndex: 2,
    explanation:
      'Como nota vale 7 e 7 é maior ou igual a 6, a condição é verdadeira e o programa executa o bloco do "entao", definindo resultado como "Aprovado".',
  },
  {
    id: 3,
    category: 'Lógica',
    question:
      'Qual estrutura de controle usamos quando precisamos repetir uma tarefa várias vezes enquanto uma condição for verdadeira?',
    options: [
      'Laço de repetição (loop), como for ou while',
      'Variável constante',
      'Comentário de código',
      'Operador de soma',
    ],
    correctIndex: 0,
    explanation:
      'Laços de repetição (como for e while) permitem executar um mesmo bloco de código várias vezes sem precisar reescrevê-lo manualmente.',
  },
  {
    id: 4,
    category: 'HTML',
    question: 'Qual é o papel principal do HTML na criação de um site?',
    options: [
      'Definir animações, fontes e cores visuais',
      'Conectar o site diretamente ao banco de dados',
      'Estruturar o conteúdo e o significado dos elementos da página',
      'Executar cálculos matemáticos complexos no servidor',
    ],
    correctIndex: 2,
    explanation:
      'HTML (HyperText Markup Language) define a estrutura e a semântica da página: títulos, parágrafos, imagens, botões, links e seções.',
  },
  {
    id: 5,
    category: 'HTML',
    question: 'Qual tag HTML é usada para criar um link clicável que leva para outra página?',
    codeSnippet: `<___ href="https://exemplo.com">Visitar site</___>`,
    options: ['<link>', '<a>', '<href>', '<p>'],
    correctIndex: 1,
    explanation:
      'A tag <a> (âncora) cria links clicáveis usando o atributo href para indicar o endereço de destino.',
  },
  {
    id: 6,
    category: 'CSS',
    question: 'No CSS, o que a regra abaixo faz em um elemento?',
    codeSnippet: `.cartao {\n  background-color: #fdf2f8;\n  color: #6d28d9;\n}`,
    options: [
      'Deixa o fundo rosa claro e a cor do texto violeta',
      'Aumenta a largura da borda e oculta o texto',
      'Centraliza o texto e muda o tamanho da fonte',
      'Deixa o fundo violeta e a cor do texto rosa claro',
    ],
    correctIndex: 0,
    explanation:
      'A propriedade background-color define a cor de fundo (#fdf2f8, rosa bem claro) e color define a cor do texto (#6d28d9, violeta).',
  },
  {
    id: 7,
    category: 'CSS',
    question:
      'Qual propriedade CSS ativa o layout flexível para alinhar elementos filhos facilmente em linha ou coluna?',
    options: [
      'position: fixed;',
      'display: flex;',
      'text-align: center;',
      'overflow: hidden;',
    ],
    correctIndex: 1,
    explanation:
      'O display: flex transforma o contêiner em um Flex Container, facilitando o alinhamento e a distribuição de espaço entre os itens internos.',
  },
  {
    id: 8,
    category: 'JavaScript',
    question: 'Em JavaScript, qual é a diferença principal entre let e const?',
    options: [
      'let só guarda números e const só guarda textos',
      'const permite reatribuir o valor, e let não permite',
      'let permite alterar o valor depois; const impede reatribuir a variável',
      'Não existe diferença prática entre elas',
    ],
    correctIndex: 2,
    explanation:
      'Variáveis declaradas com let podem receber novos valores depois. Já const cria uma referência constante que não pode ser reatribuída.',
  },
  {
    id: 9,
    category: 'JavaScript',
    question: 'O que será impresso no console ao executar o código JavaScript abaixo?',
    codeSnippet: `const frutas = ["Maçã", "Uva", "Banana"];\nconsole.log(frutas[1]);`,
    options: ['"Maçã"', '"Uva"', '"Banana"', 'undefined'],
    correctIndex: 1,
    explanation:
      'Em JavaScript, os índices de um array começam em 0. Portanto, frutas[0] é "Maçã" e frutas[1] é "Uva".',
  },
  {
    id: 10,
    category: 'JavaScript',
    question: 'Qual é o resultado da expressão JavaScript abaixo?',
    codeSnippet: `const a = 10;\nconst b = "10";\nconsole.log(a === b);`,
    options: ['true', '"1010"', 'false', 'Erro de sintaxe'],
    correctIndex: 2,
    explanation:
      'O operador === compara tanto o valor quanto o tipo do dado. Como 10 é number e "10" é string, os tipos são diferentes e o resultado é false.',
  },
];
