export type Option = { label: string; values: string[] };
export type Product = { id: string; slug: string; name: string; category: string; description: string; image: string; kind: string; options: Option[]; featured: boolean; availability: 'demonstracao'; pricingMode: 'quote'; keywords: string[] };
export const slugify = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const categories = [
 {slug:'gravacao-a-laser',name:'Gravação a Laser',short:'Gravação a laser',kind:'wood',description:'Detalhes que tornam cada peça única. Conte sua ideia e consulte a viabilidade do projeto.'},
 {slug:'cartoes-e-impressos',name:'Cartões e Impressos',short:'Cartões de visita',kind:'cards',description:'Sua marca presente em cada encontro, divulgação e oportunidade.'},
 {slug:'adesivos-e-rotulos',name:'Adesivos, Etiquetas e Rótulos',short:'Adesivos e rótulos',kind:'stickers',description:'Pequenos detalhes, grandes possibilidades para destacar a sua marca.'},
 {slug:'papelaria',name:'Papelaria Personalizada',short:'Papelaria',kind:'notebook',description:'Uma identidade consistente em todos os detalhes do seu negócio.'},
 {slug:'embalagens',name:'Embalagens e Sacolas',short:'Embalagens',kind:'bag',description:'A experiência com a sua marca começa antes de abrir a embalagem.'},
 {slug:'brindes',name:'Brindes Personalizados',short:'Brindes',kind:'mug',description:'Produtos úteis que aproximam pessoas e marcas.'},
 {slug:'comunicacao-visual',name:'Comunicação Visual',short:'Banners e placas',kind:'banner',description:'Dê visibilidade à sua mensagem em ambientes, eventos e pontos de venda.'},
 {slug:'editoriais',name:'Catálogos e Materiais Editoriais',short:'Catálogos',kind:'notebook',description:'Organize suas ideias em materiais que merecem ser folheados.'},
 {slug:'acabamentos',name:'Acabamentos Especiais',short:'Acabamentos',kind:'cards',description:'Explore possibilidades de acabamento para valorizar seu projeto, sob avaliação.'}
];
const names: string[][] = [
 ['Gravação a Laser Personalizada','Gravação a Laser em Madeira','Gravação em Metal','Placa em Acrílico','Chaveiro Personalizado'],
 ['Cartão de Visita Personalizado','Flyer Personalizado','Folder Personalizado','Convite Personalizado','Marcador de Página'],
 ['Adesivo em Vinil','Adesivo Redondo','Rótulo Personalizado','Cartela de Adesivos','Etiqueta com Corte Especial'],
 ['Bloco de Notas','Envelope Personalizado','Pasta Personalizada','Papel Timbrado','Agenda Personalizada'],
 ['Sacola de Papel','Caixa Personalizada','Embalagem para Delivery','Tag Personalizada','Cinta para Embalagem'],
 ['Caneca Personalizada','Garrafa Personalizada','Caneta Personalizada','Kit Corporativo','Copo Personalizado'],
 ['Banner Personalizado','Placa de Sinalização','Display de Mesa','Adesivo de Vitrine','Faixa Personalizada'],
 ['Catálogo de Produtos','Revista Personalizada','Apostila Personalizada','Manual Institucional'],
 ['Cartão com Laminação Fosca','Convite com Hot Stamping','Tag com Verniz Localizado']
];
const options: Record<string, Option[]> = {
 wood:[{label:'Tipo de produto',values:['Objeto próprio','Brinde','Placa','Projeto especial']},{label:'Material',values:['Madeira — sob avaliação','Metal — sob avaliação','Acrílico — sob avaliação','Outro material — sob consulta']}],
 cards:[{label:'Material',values:['Couché 300g','Couché 250g','Papel offset']},{label:'Impressão',values:['Frente e verso','Somente frente']},{label:'Acabamento',values:['Fosco','Brilho','Sem laminação']},{label:'Medidas',values:['9 × 5 cm','10 × 15 cm','Medida personalizada']}],
 stickers:[{label:'Material',values:['Vinil Fosco','Vinil Branco','Vinil Transparente','Papel Adesivo']},{label:'Formato',values:['Redondo','Quadrado','Retangular','Corte Especial']},{label:'Medidas',values:['3 × 3 cm','5 × 5 cm','7 × 7 cm','10 × 10 cm','Medida personalizada']},{label:'Acabamento',values:['Fosco','Brilho']}],
 notebook:[{label:'Material',values:['Papel offset','Couché','A definir com a equipe']},{label:'Medidas',values:['A4','A5','Medida personalizada']},{label:'Impressão',values:['Colorida','Preto e branco']}],
 bag:[{label:'Material',values:['Papel kraft','Papel branco','A definir com a equipe']},{label:'Medidas',values:['Pequena','Média','Grande','Medida personalizada']},{label:'Impressão',values:['Uma cor','Colorida']}],
 mug:[{label:'Material',values:['A definir com a equipe']},{label:'Personalização',values:['Logotipo','Nome ou frase','Arte personalizada']},{label:'Cor',values:['Branco','Preto','Outra cor sob consulta']}],
 banner:[{label:'Material',values:['Lona — sob consulta','Adesivo — sob consulta','Placa — sob consulta']},{label:'Medidas',values:['60 × 90 cm','80 × 120 cm','Medida personalizada']},{label:'Acabamento',values:['A definir com a equipe']}]
};
export const products: Product[] = categories.flatMap((c, ci)=>names[ci].map((name,i)=>({id:slugify(name),slug:slugify(name),name,category:c.slug,description:c.description,image:`/images/${c.kind}.webp`,kind:c.kind,options:options[c.kind],featured:i===0,availability:'demonstracao',pricingMode:'quote',keywords:[name,c.name,c.short,c.kind]})));
export const findProduct = (slug:string)=>products.find(p=>p.slug===slug);
export function searchProducts(query:string) { const words=slugify(query).split('-').filter(Boolean); return products.filter(p=>words.every(w=>slugify(p.keywords.join(' ')).includes(w))).sort((a,b)=>Number(slugify(b.name).includes(slugify(query)))-Number(slugify(a.name).includes(slugify(query)))); }
export const faq = [
 ['Como faço um orçamento?','Escolha um produto, personalize os detalhes e adicione ao carrinho. Depois, revise a mensagem e converse com a equipe pelo WhatsApp para consultar valores e condições.'],
 ['Posso enviar minha própria arte?','Sim. Você pode informar que já possui a arte ao configurar seu produto. O arquivo será enviado durante o atendimento, para avaliação da equipe.'],
 ['Como funciona a gravação a laser?','Conte qual objeto deseja personalizar, seu material, medidas e a área de gravação. A equipe avaliará a viabilidade técnica e o acabamento indicado antes de confirmar a produção.'],
 ['Existe quantidade mínima?','A quantidade mínima depende do produto e do projeto. Informe a quantidade desejada e consulte a equipe.'],
 ['Posso solicitar um produto personalizado?','Sim. Descreva sua ideia no campo de observações ou solicite um orçamento de projeto especial.'],
 ['Como acompanho minha solicitação?','Neste protótipo, os rascunhos ficam salvos neste navegador em Minhas solicitações. O atendimento e a confirmação devem ser acompanhados diretamente com a equipe.'],
 ['Quais são as formas de pagamento?','As formas de pagamento, os prazos e as condições serão informados pela equipe no orçamento.']
];
