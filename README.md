Finanças do Casal
Juntos, mais longe.

Uma plataforma gratuita e de código aberto criada para ajudar casais a cuidarem melhor do próprio dinheiro. A ideia é simples: reunir em um só lugar tudo o que envolve a vida financeira a dois — rendas, despesas, investimentos, economias e planos para o futuro.
Sobre o projeto
Organizar as finanças já pode ser complicado individualmente. Quando duas pessoas compartilham planos, despesas e responsabilidades, surgem ainda mais coisas para conciliar. Cada um tem sua renda, seus compromissos e suas prioridades, e nem sempre é fácil visualizar como tudo se encaixa.

O Finanças do Casal surgiu justamente dessa necessidade: criar um espaço onde duas pessoas possam acompanhar a própria situação financeira, entender para onde o dinheiro está indo e planejar o futuro com mais clareza.

Mais do que registrar entradas e saídas, a proposta é tornar as conversas sobre dinheiro mais simples e ajudar o casal a transformar sonhos em objetivos possíveis.

É um projeto pessoal, gratuito e open source, desenvolvido inicialmente para atender à realidade de duas pessoas, mas com possibilidades de expansão no futuro.
Como funciona
A plataforma funciona como um organizador financeiro. Tudo é registrado manualmente pelo usuário, que pode acompanhar os resultados e entender melhor como está utilizando o próprio dinheiro.

Ela não funciona como um banco digital e não realiza operações financeiras. Na prática:
- Não realiza pagamentos nem movimenta dinheiro.
- Não possui conexão com bancos ou corretoras.
- Não consulta cotações nem calcula rendimentos automaticamente.
- Todos os valores, aplicações e movimentações são informados manualmente.
A renda cadastrada representa o valor disponível para o planejamento financeiro daquele mês, e não um saldo bancário real.
O que você pode fazer com a plataforma
- Acompanhar a situação financeira: visualizar rapidamente quanto entrou, quanto foi gasto, quanto está investido e quanto foi guardado. Também é possível consultar gráficos e comparar os resultados com meses anteriores.
- Organizar o orçamento a dois: cadastrar a renda de cada pessoa, definir quanto será destinado a cada finalidade e estabelecer limites de gastos por categoria, com alertas quando esses limites forem ultrapassados.
- Dividir despesas de maneira justa: organizar contas compartilhadas com divisão igualitária, proporcional à renda ou personalizada. A plataforma também permite acompanhar quem realizou cada pagamento e quem precisa acertar sua parte.
- Registrar todas as movimentações: acompanhar receitas, despesas, investimentos, valores guardados e transferências. Os registros podem ser filtrados por período, categoria, responsável e tipo, incluindo despesas recorrentes e parceladas.
- Acompanhar os investimentos: cadastrar aplicações manualmente, registrar aportes, visualizar o patrimônio acumulado e acompanhar sua distribuição entre modalidades e pessoas, além da evolução ao longo do tempo.
- Planejar objetivos e sonhos: criar metas como comprar uma moto, conquistar a casa própria, viajar ou organizar um casamento. Cada objetivo conta com acompanhamento de progresso e histórico de contribuições. Também é possível organizar uma lista de desejos e planejar o mês seguinte antes de assumir novos compromissos.
- Entender a evolução financeira: consultar históricos mensais e anuais, visualizar a distribuição dos gastos, acompanhar investimentos e economias e comparar diferentes períodos para entender o que melhorou e o que ainda precisa de atenção.
Algumas regras importantes
Para manter os registros organizados e evitar inconsistências, a plataforma segue algumas regras:
- Todos os valores são armazenados em centavos inteiros e apresentados em Real (R$), reduzindo problemas de arredondamento.
- O que foi planejado e o que realmente aconteceu são tratados separadamente. Uma meta ou um desejo não vira uma movimentação financeira até que seja registrado ou confirmado.
- Transferências entre contas ou categorias próprias não são consideradas receitas ou despesas.
- Um investimento não pode ser contabilizado duas vezes como saída de dinheiro.
- O saldo pode ficar negativo caso as despesas ultrapassem a renda disponível.
- A mudança de mês não apaga os registros anteriores. Todo o histórico permanece disponível para consulta.
Privacidade e armazenamento dos dados
A plataforma foi pensada para funcionar sem depender de servidores ou bancos de dados externos.

Todos os dados ficam armazenados localmente no navegador do aparelho utilizado, por meio do LocalStorage. Isso significa que suas informações não são enviadas para servidores nem compartilhadas com o repositório do projeto.

Como consequência, os dados não são sincronizados automaticamente entre diferentes aparelhos.

Para facilitar a transferência e a segurança das informações, a área de Configurações oferece:
- Exportação de um backup completo em JSON.
- Importação de backups em outros aparelhos.
- Exportação das movimentações financeiras em CSV.
É recomendável manter backups atualizados para evitar a perda dos registros.
Tecnologias utilizadas
O projeto foi desenvolvido utilizando tecnologias voltadas à construção de interfaces modernas e aplicações web:
- React
- JavaScript
- Vite
- Tailwind CSS
- Recharts
- Lucide React
- date-fns
- LocalStorage
A aplicação é estática e compatível com o GitHub Pages.
Como executar o projeto
Para executar a plataforma localmente, é necessário ter o Node.js 20 LTS instalado (também funciona com versões 18 ou superiores).

Após clonar o repositório, execute os seguintes comandos:
npm install      # instala as dependências
npm run dev      # inicia o ambiente de desenvolvimento
npm test         # executa os testes dos cálculos financeiros
npm run build    # gera a versão de produção em dist/
npm run preview  # permite visualizar a versão de produção


Após iniciar o ambiente de desenvolvimento, a aplicação estará disponível em:

http://localhost:5173
Publicação no GitHub Pages
A publicação pode ser feita diretamente pelo GitHub, utilizando o GitHub Actions.
1. Envie os arquivos do projeto para a branch main do repositório.
2. Acesse Settings → Pages e selecione GitHub Actions como fonte de publicação.
3. A cada atualização enviada para a branch main, o workflow .github/workflows/deploy.yml executará os testes, criará a versão de produção e publicará a aplicação.
4. Após a conclusão, o endereço de acesso estará disponível em Settings → Pages.
O que vem pela frente
O projeto ainda tem espaço para crescer. Uma das próximas melhorias planejadas é a criação de uma página exclusiva para Reserva Financeira, permitindo acompanhar depósitos, retiradas e o percentual alcançado em relação à meta estabelecida.

Atualmente, os valores guardados são registrados como movimentações do tipo "Guardado". A nova área permitirá visualizar essa reserva de maneira mais organizada e independente.

Outras ideias, sugestões e melhorias também são bem-vindas.
Como contribuir
O projeto está aberto a quem quiser participar de sua evolução. Se você encontrou algum problema, tem uma sugestão ou gostaria de propor uma melhoria, pode abrir uma issue para discutir a ideia ou enviar um pull request com sua contribuição.

Toda colaboração é bem-vinda!
Licença
Este projeto é distribuído sob a licença MIT. Para mais informações sobre permissões e condições de uso, consulte o arquivo LICENSE.