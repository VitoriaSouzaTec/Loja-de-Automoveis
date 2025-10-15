

Catalogo de Automóveis 🏍️
Um Catálogo de Concessionária Moderno em React/TypeScript
Este projeto é um frontend moderno e interativo desenvolvido para funcionar como um catálogo digital ou site de concessionária de veículos, utilizando as melhores práticas do ecossistema React.

 Funcionalidades
O sistema foi desenhado para oferecer uma experiência completa de navegação e prospecção, simulando a visita a uma concessionária online:
Catálogo Completo: Navegue por uma vasta coleção de veículos, incluindo carros e motos.
Seção de Promoções: Área dedicada para destacar ofertas especiais e oportunidades imperdíveis.
Painel de Administração (UI/UX): Estrutura de interface já implementada para gerenciar o estoque, embora a integração de backend (API) ainda esteja pendente.
Jornada de Compra Simplificada: O usuário pode manifestar seu interesse em um veículo específico e finalizar a "compra" digitalmente.
Contato Direto com o Vendedor: O fluxo de finalização da compra coleta dados essenciais (nome, telefone e forma de interesse no pagamento) e direciona o cliente diretamente para o WhatsApp da concessionária, facilitando a conversão e o atendimento personalizado.

🛠️ Tecnologias Utilizadas
Este projeto foi construído com ferramentas de ponta para garantir desempenho, escalabilidade e manutenibilidade:
React: Biblioteca JavaScript para a construção da interface do usuário.
TypeScript: Adiciona tipagem estática ao JavaScript, tornando o código mais robusto e fácil de escalar.
Lucide Icons: Um conjunto de ícones simples, consistentes e de código aberto, utilizados para melhorar a usabilidade e a estética da aplicação.
Desenvolvimento Frontend: Focado na criação de uma interface de usuário rica e responsiva.

🚀 Começando
Siga as instruções abaixo para configurar e executar o projeto em sua máquina local.
Pré-requisitos
Certifique-se de ter o Node.js e o npm (ou yarn) instalados.

Instalação
Clone o repositório:

Bash

git clone https://github.com/VitoriaSouzaTec/Loja-de-Automoveis
cd loja-de-carros
Instale as dependências:

Bash

npm install
# ou
yarn install
Execução
Inicie o servidor de desenvolvimento:

Bash

npm run dev
# ou
yarn dev
O projeto será aberto em http://localhost:8080 (ou a porta configurada no seu ambiente).

💬 Finalização da Compra e Contato
A característica mais inovadora do nosso catálogo é a forma como ele conecta o cliente ao vendedor.
Ao clicar no botão de finalização da compra, o usuário preenche um formulário com:
Seu Nome

Telefone (para contato via WhatsApp)

Forma de Pagamento de Interesse:

Financiamento

À Vista

Consórcio

Após o envio, um link é gerado para o WhatsApp da loja, enviando uma mensagem pré-formatada com as informações do veículo e o interesse do cliente.
