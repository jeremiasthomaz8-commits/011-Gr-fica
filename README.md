# Gráfica 011

Protótipo interativo em Next.js App Router, React e TypeScript, exportado estaticamente para apresentação privada. Interface PT-BR, família Isidora Sans fornecida pelo cliente, cores #FE1300 / #070102 / #FEFDFE.

## Executar

```sh
npm install
npm run dev
npm test
npm run build
```

O build gera `out/`, com uma página HTML para cada rota. Hospedagem deve resolver `/rota/` para `/rota/index.html`. O servidor de desenvolvimento usa a porta 3000.

## Experiência entregue

- Homepage com carrossel controlável, navegação por categoria, vitrines, seção de laser, processo, atendimento empresarial e FAQ.
- 42 produtos demonstrativos em nove categorias, gerados a partir de dados reutilizáveis.
- Busca por nome, categoria e palavras-chave, sem diferenciação de acentos e caixa; sugestões e resultados.
- Catálogo com filtros, ordenação e carregamento progressivo.
- Configuração, quantidade, observações, orientação sobre arte e galeria ampliada.
- Configurador de laser com objeto, material, dimensões e área, descrição da gravação.
- Carrinho persistente, edição e remoção; favoritos; mensagem individual ou múltipla.
- Validação de cadastro, entrada e perfil **explicitamente demonstrativos**. Senhas não são armazenadas.
- Rascunhos locais, separados de pedidos e mensagens enviadas.
- Telas institucionais, orientações de arte, privacidade e termos demonstrativos.

## Informações ainda necessárias para operação

1. Logo oficial. A identificação textual no protótipo não é uma reprodução nem uma proposta de logo.
2. Número oficial: configure `WHATSAPP_BUSINESS_NUMBER` em `.env.local` no formato internacional 55 + DDD + número; execute um novo build. Sem número válido, a interface permite copiar/salvar o rascunho e explica a pendência.
3. Catálogo, materiais, combinações, preços e políticas confirmados. Todas as opções atuais são exemplos para avaliação.
4. Contato, horários, localização e documentos legais aprovados.
5. Provedor de autenticação, Google OAuth e backend com políticas por usuário. Não há conta autenticada, sincronização entre dispositivos ou armazenamento de arte nesta versão.

## Arquitetura

`src/lib/catalog.ts` é a fonte única do catálogo. `quote.ts` valida configurações e compõe mensagens; `store.tsx` fornece o adaptador local versionado. Separar esse adaptador em repositórios autenticados permite trocar a persistência sem alterar a linguagem visual. Rotas de produto/categoria têm geração estática. A interface nunca afirma que abrir o WhatsApp significa enviar a mensagem ou confirmar uma compra.

`database/schema.sql` prepara as entidades de catálogo, opções, carrinhos, favoritos, solicitações e anexos. Não foi aplicado a banco algum. A função de identidade precisa ser ligada a uma sessão verificada pelo servidor; o navegador não deve receber acesso SQL. Administração, armazenamento privado, verificação de arquivos, limites de requisição e autenticação devem ser implementados antes da produção.

As imagens originais e seus prompts estão em `ASSETS.md`. Fotos são exemplos, não registros do portfólio real. As referências Printi e FuturaIM foram usadas somente para hierarquia de catálogo e navegação.
