import { useState } from "react";
const ink="#0F172A",sand="#FAFAF8",muted="#64748B",bdr="#E2E8F0";

const WEEKS = [
  { w:1, phase:"Fundação", emoji:"🔁", color:"#6366F1",
    theme:"Revisão HSK 3 + Introdução ao Registro Formal Escrito",
    stats:{ words:"~30 novas HSK 4", grammar:"使得 · 从...来看 · 在...的基础上", chars:"+30 novos" },
    vocab:[
      {h:"使得",py:"shǐdé",pt:"fazer com que/causar (formal)"},
      {h:"基础",py:"jīchǔ",pt:"base/fundação"},
      {h:"角度",py:"jiǎodù",pt:"ângulo/perspectiva"},
      {h:"层面",py:"céngmiàn",pt:"nível/camada/dimensão"},
      {h:"领域",py:"lǐngyù",pt:"campo/área/domínio"},
      {h:"方面",py:"fāngmiàn",pt:"aspecto/dimensão"},
      {h:"程度",py:"chéngdù",pt:"grau/nível/extensão"},
      {h:"范围",py:"fànwéi",pt:"âmbito/escopo"},
      {h:"背景",py:"bèijǐng",pt:"contexto/histórico"},
      {h:"前提",py:"qiántí",pt:"premissa/pré-condição"},
      {h:"条件",py:"tiáojiàn",pt:"condição/requisito"},
      {h:"阶段",py:"jiēduàn",pt:"fase/etapa"},
      {h:"过程",py:"guòchéng",pt:"processo/percurso"},
      {h:"结构",py:"jiégòu",pt:"estrutura/composição"},
      {h:"体系",py:"tǐxì",pt:"sistema/corpo (de conhecimento)"},
      {h:"框架",py:"kuàngjià",pt:"framework/estrutura"},
      {h:"机制",py:"jīzhì",pt:"mecanismo/sistema"},
      {h:"模式",py:"móshì",pt:"modo/padrão/modelo"},
      {h:"规律",py:"guīlǜ",pt:"lei/padrão regular"},
      {h:"现象",py:"xiànxiàng",pt:"fenômeno"},
      {h:"本质",py:"běnzhì",pt:"essência/natureza fundamental"},
      {h:"特征",py:"tèzhēng",pt:"característica/traço"},
      {h:"属性",py:"shǔxìng",pt:"atributo/propriedade"},
      {h:"功能",py:"gōngnéng",pt:"função/papel"},
      {h:"作用",py:"zuòyòng",pt:"função/efeito/papel"},
    ],
    grammar:[
      { struct:"使得 + 主语 + adj./V", label:"Causativo Formal Avançado", color:"#6366F1",
        exp:"使得 é o causativo mais formal de todos. Mais empregado em escrita acadêmica e jornalística do que 让/使. Enfatiza fortemente a relação causa→resultado transformador.",
        exs:[{cn:"技术的进步使得信息传播速度大幅提升。",py:"Jìshù de jìnbù shǐdé xìnxī chuánbō sùdù dàfú tíshēng.",pt:"O avanço tecnológico fez com que a velocidade de disseminação de informações aumentasse substancialmente."},{cn:"经济危机使得大量工厂关闭。",py:"Jīngjì wēijī shǐdé dàliàng gōngchǎng guānbì.",pt:"A crise econômica levou ao fechamento de inúmeras fábricas."}] },
      { struct:"从 + 角度/层面/方面 + 来看", label:"Do Ponto de Vista de / Sob a Perspectiva de", color:"#059669",
        exp:"Estrutura formal de análise perspectivada. 从...来看 = do ponto de vista de X. 从...角度看 = sob o ângulo de X. Essencial para redações e análises acadêmicas.",
        exs:[{cn:"从经济层面来看，这项政策带来了显著成效。",py:"Cóng jīngjì céngmiàn lái kàn, zhè xiàng zhèngcè dàilái le xiǎnzhù chéngxiào.",pt:"Do ponto de vista econômico, esta política trouxe resultados notáveis."},{cn:"从教育的角度来看，文化多样性是一种资源。",py:"Cóng jiàoyù de jiǎodù lái kàn, wénhuà duōyàngxìng shì yī zhǒng zīyuán.",pt:"Sob o ângulo educacional, a diversidade cultural é um recurso."}] },
      { struct:"在 + 名词 + 的基础上", label:"Com Base em / Fundamentado em", color:"#D97706",
        exp:"在...的基础上 = partindo de / com base em. Indica que uma ação ou desenvolvimento se fundamenta em X como alicerce. Muito frequente em textos científicos e acadêmicos.",
        exs:[{cn:"在前人研究的基础上，他们提出了新的理论框架。",py:"Zài qiánrén yánjiū de jīchǔ shàng, tāmen tíchū le xīn de lǐlùn kuàngjià.",pt:"Com base nas pesquisas anteriores, eles propuseram um novo framework teórico."},{cn:"在充分讨论的基础上，委员会做出了最终决定。",py:"Zài chōngfèn tǎolùn de jīchǔ shàng, wěiyuánhuì zuòchū le zuìzhōng juédìng.",pt:"Com base em ampla discussão, o comitê tomou a decisão final."}] },
    ],
    dialogue:[
      {sp:"A",cn:"你觉得从哪个角度来看待这个社会问题比较合适？",py:"Nǐ juéde cóng nǎge jiǎodù lái kàndài zhège shèhuì wèntí bǐjiào héshì?",pt:"Qual perspectiva você acha mais adequada para encarar este problema social?"},
      {sp:"B",cn:"从经济层面来看，它的根源在于资源分配不均；但从社会层面来看，教育机会才是关键。",py:"Cóng jīngjì céngmiàn lái kàn, tā de gēnyuán zàiyú zīyuán fēnpèi bù jūn; dàn cóng shèhuì céngmiàn lái kàn, jiàoyù jīhuì cái shì guānjiàn.",pt:"Do ângulo econômico, a raiz está na distribuição desigual de recursos; mas do ângulo social, as oportunidades educacionais são a chave."},
      {sp:"A",cn:"同意。在现有制度的基础上进行改革，会比推翻重建更可行。",py:"Tóngyì. Zài xiànyǒu zhìdù de jīchǔ shàng jìnxíng gǎigé, huì bǐ tuīfān chóngjiàn gèng kěxíng.",pt:"Concordo. Reformar com base no sistema existente é mais viável do que demolir e reconstruir."},
      {sp:"B",cn:"正是。使得系统性变革成功的，往往是渐进式的改良，而非激进的革命。",py:"Zhèng shì. Shǐdé xìtǒng xìng biàngé chénggōng de, wǎngwǎng shì jiànjìn shì de gǎiliáng, ér fēi jījìn de gémìng.",pt:"Exatamente. O que faz mudanças sistêmicas bem-sucedidas são as reformas graduais, não as revoluções radicais."},
    ],
    quiz:[
      {q:"使得 difere de 让 porque:",opts:["são sinônimos perfeitos","使得 é mais formal/literário e destaca resultado transformador; 让 é mais cotidiano","使得 indica permissão; 让 indica obrigação","使得 é negativo; 让 é positivo"],ans:1,exp:"✅ 使得 é causativo FORMAL (escrita acadêmica/jornalística). 让 é causativo COTIDIANO. Ambos indicam causa→resultado, mas o registro é diferente."},
      {q:"'从经济层面来看' significa:",opts:["a economia está em colapso","do ponto de vista econômico","por causa da economia","comparando com a economia"],ans:1,exp:"✅ 从+X+来看 = do ponto de vista de X. 层面(céngmiàn)=camada/nível. 从经济层面来看=sob a perspectiva econômica/do ângulo da economia."},
      {q:"在现有基础上 significa:",opts:["criar algo completamente novo","com base no que já existe","destruir o existente","sem fundamento"],ans:1,exp:"✅ 在...的基础上 = com base em / partindo de. 现有=existente. 在现有基础上=partindo do que já existe/com base no atual."},
      {q:"领域 (lǐngyù) significa:",opts:["liderança","campo/área/domínio","legislação","região"],ans:1,exp:"✅ 领域 = campo/área/domínio (de conhecimento ou atividade). 领=liderar/território + 域=domínio. Muito usado: 科技领域(campo da tecnologia), 教育领域(campo da educação)."},
      {q:"过程 (guòchéng) vs 结果 (jiéguǒ) — qual a diferença?",opts:["sinônimos","过程=processo/percurso; 结果=resultado/conclusão","过程=início; 结果=fim do início","过程=negativo; 结果=positivo"],ans:1,exp:"✅ 过程(processo/percurso) ↔ 结果(resultado/consequência). 重视过程(valorizar o processo) vs 重视结果(valorizar o resultado). Par clássico em discussões filosóficas e educacionais!"},
    ] },

  { w:2, phase:"Política", emoji:"🏛️", color:"#DC2626",
    theme:"Política, Governo e Relações Internacionais",
    stats:{ words:"~25 novas HSK 4", grammar:"据...来看 · 以...为例 · 就...而言", chars:"+25 novos" },
    vocab:[
      {h:"政府",py:"zhèngfǔ",pt:"governo"},
      {h:"民主",py:"mínzhǔ",pt:"democracia/democrático"},
      {h:"宪法",py:"xiànfǎ",pt:"constituição"},
      {h:"议会",py:"yìhuì",pt:"parlamento/assembleia"},
      {h:"选举",py:"xuǎnjǔ",pt:"eleição/eleger"},
      {h:"外交",py:"wàijiāo",pt:"diplomacia"},
      {h:"主权",py:"zhǔquán",pt:"soberania"},
      {h:"制度",py:"zhìdù",pt:"sistema/instituição"},
      {h:"体制",py:"tǐzhì",pt:"regime/sistema (político)"},
      {h:"政党",py:"zhèngdǎng",pt:"partido político"},
      {h:"执政",py:"zhízhèng",pt:"governar/estar no poder"},
      {h:"治理",py:"zhìlǐ",pt:"governança/administrar"},
      {h:"监督",py:"jiāndū",pt:"supervisionar/fiscalizar"},
      {h:"腐败",py:"fǔbài",pt:"corrupção/corromper"},
      {h:"透明度",py:"tòumíngdù",pt:"transparência"},
      {h:"国际关系",py:"guójì guānxi",pt:"relações internacionais"},
      {h:"外交政策",py:"wàijiāo zhèngcè",pt:"política externa"},
      {h:"多边主义",py:"duōbiān zhǔyì",pt:"multilateralismo"},
      {h:"利益",py:"lìyì",pt:"interesse/benefício"},
      {h:"立场",py:"lìchǎng",pt:"posição/stance"},
      {h:"谈判",py:"tánpàn",pt:"negociar/negociação"},
      {h:"协议",py:"xiéyì",pt:"acordo/protocolo"},
      {h:"制裁",py:"zhìcái",pt:"sanção/sancionar"},
      {h:"冲突",py:"chōngtū",pt:"conflito"},
      {h:"合作",py:"hézuò",pt:"cooperação/cooperar"},
    ],
    grammar:[
      { struct:"据 + 来源/消息 + (来看/报道)", label:"Segundo / De Acordo com (Formal)", color:"#DC2626",
        exp:"据 = segundo / de acordo com. Cita fontes ou informações. 据报道(segundo relatado), 据统计(segundo estatísticas), 据悉(segundo se sabe). Mais formal que 根据.",
        exs:[{cn:"据报道，两国已就边界问题达成初步协议。",py:"Jù bàodào, liǎng guó yǐ jiù biānjiè wèntí dáchéng chūbù xiéyì.",pt:"Segundo reportado, os dois países já chegaram a um acordo preliminar sobre questões fronteiriças."},{cn:"据统计，全球有超过八十个民主国家。",py:"Jù tǒngjì, quánqiú yǒu chāoguò bāshí gè mínzhǔ guójiā.",pt:"De acordo com estatísticas, há mais de oitenta países democráticos no mundo."}] },
      { struct:"以 + 例子/情况 + 为例", label:"Tomando X como Exemplo", color:"#059669",
        exp:"以...为例 = tomando X como exemplo. Estrutura de exemplificação formal. Equivale a 'por exemplo X' ou 'tome-se X como caso'. 以A为例，B... = tomando A como exemplo, B...",
        exs:[{cn:"以欧盟为例，多边合作可以有效解决跨国问题。",py:"Yǐ Ōuméng wéi lì, duōbiān hézuò kěyǐ yǒuxiào jiějué kuàguó wèntí.",pt:"Tomando a UE como exemplo, a cooperação multilateral pode resolver efetivamente questões transnacionais."},{cn:"以腐败为例，透明度是最有效的预防手段。",py:"Yǐ fǔbài wéi lì, tòumíngdù shì zuì yǒuxiào de yùfáng shǒuduàn.",pt:"Tomando a corrupção como exemplo, a transparência é o meio preventivo mais eficaz."}] },
      { struct:"就 + 话题 + 而言", label:"No que Diz Respeito a / Em Termos de", color:"#D97706",
        exp:"就...而言 = no que diz respeito a X / em termos de X. Delimita o escopo da afirmação. Muito usado em análises acadêmicas. Equivalente formal de '就...来说'.",
        exs:[{cn:"就外交政策而言，该国一贯坚持不干涉内政原则。",py:"Jiù wàijiāo zhèngcè ér yán, gāiguó yīguàn jiānchí bù gānshe nèizhèng yuánzé.",pt:"No que diz respeito à política externa, o país sempre manteve o princípio de não intervenção."},{cn:"就民主制度而言，选举的公正性至关重要。",py:"Jiù mínzhǔ zhìdù ér yán, xuǎnjǔ de gōngzhèng xìng zhì guān zhòngyào.",pt:"Em termos de sistema democrático, a imparcialidade das eleições é de suma importância."}] },
    ],
    dialogue:[
      {sp:"A",cn:"就国际关系而言，多边主义和单边主义哪种更有效？",py:"Jiù guójì guānxi ér yán, duōbiān zhǔyì hé dānbiān zhǔyì nǎ zhǒng gèng yǒuxiào?",pt:"Em termos de relações internacionais, o multilateralismo ou o unilateralismo é mais eficaz?"},
      {sp:"B",cn:"据历史经验来看，多边合作往往产生更可持续的解决方案。以联合国为例，它使得国际争端有了正式的解决平台。",py:"Jù lìshǐ jīngyàn lái kàn, duōbiān hézuò wǎngwǎng chǎnshēng gèng kě chíxù de jiějué fāng'àn.",pt:"Segundo a experiência histórica, a cooperação multilateral costuma gerar soluções mais sustentáveis. Tomando a ONU como exemplo, ela criou uma plataforma formal para resolver disputas."},
      {sp:"A",cn:"但腐败和透明度问题使得很多国际机构的公信力下降。",py:"Dàn fǔbài hé tòumíngdù wèntí shǐdé hěn duō guójì jīgòu de gōngxìnlì xiàjiàng.",pt:"Mas os problemas de corrupção e transparência fizeram com que a credibilidade de muitas instituições internacionais caísse."},
      {sp:"B",cn:"正是。在现有体制的基础上加强监督机制，才是改善治理的根本路径。",py:"Zhèng shì. Zài xiànyǒu tǐzhì de jīchǔ shàng jiāqiáng jiāndū jīzhì, cái shì gǎishàn zhìlǐ de gēnběn lùjìng.",pt:"Exatamente. Com base no sistema existente, fortalecer os mecanismos de supervisão é o caminho fundamental para melhorar a governança."},
    ],
    quiz:[
      {q:"据报道 equivale a:",opts:["de acordo com rumores","segundo o reportado (citação de fonte)","segundo minha opinião","de acordo com a lei"],ans:1,exp:"✅ 据报道 = segundo reportado/de acordo com relatórios. 据+fonte indica CITAÇÃO DE FONTE. 据统计=segundo estatísticas, 据悉=segundo se sabe, 据消息=segundo informações."},
      {q:"以欧盟为例 significa:",opts:["excluindo a UE","tomando a UE como exemplo","comparando com a UE","em vez da UE"],ans:1,exp:"✅ 以+X+为例 = tomando X como exemplo. Estrutura de EXEMPLIFICAÇÃO formal. 'Com o caso da UE como exemplo...' — essencial em redações HSK 4+!"},
      {q:"就外交政策而言 indica:",opts:["criticando a política externa","mudando a política externa","delimitando o escopo: no que tange à política externa","aprovando a política externa"],ans:2,exp:"✅ 就...而言 = no que diz respeito a / em termos de. Delimita o ESCOPO da afirmação. Muito usado em análises acadêmicas e formais."},
      {q:"腐败 (fǔbài) significa:",opts:["transparência","corrupção","democracia","constituição"],ans:1,exp:"✅ 腐败 fǔbài = corrupção. 腐=apodrecer + 败=fracasso/deterioração. O 'apodrecimento' moral do sistema. Oposto: 廉洁 liánjié (integridade/honestidade)!"},
      {q:"谈判 difere de 协议 porque:",opts:["são sinônimos","谈判=processo de negociação; 协议=resultado/acordo","谈判=acordo formal; 协议=discussão informal","谈判=unilateral; 协议=multilateral"],ans:1,exp:"✅ 谈判(processo)→协议(resultado). 谈=falar + 判=julgar = negociar. 协=harmonizar + 议=discussão = acordo. A negociação RESULTA em um acordo!"},
    ] },

  { w:3, phase:"Economia", emoji:"💹", color:"#D97706",
    theme:"Economia, Finanças e Desenvolvimento",
    stats:{ words:"~25 novas HSK 4", grammar:"无非是 · 倒(contrastivo) · 反之", chars:"+25 novos" },
    vocab:[
      {h:"市场经济",py:"shìchǎng jīngjì",pt:"economia de mercado"},
      {h:"贸易",py:"màoyì",pt:"comércio/negócio internacional"},
      {h:"通货膨胀",py:"tōnghuò péngzhàng",pt:"inflação"},
      {h:"通货紧缩",py:"tōnghuò jǐnsuō",pt:"deflação"},
      {h:"股票",py:"gǔpiào",pt:"ações/títulos da bolsa"},
      {h:"投资",py:"tóuzī",pt:"investimento/investir"},
      {h:"利润",py:"lìrùn",pt:"lucro"},
      {h:"成本",py:"chéngběn",pt:"custo"},
      {h:"竞争力",py:"jìngzhēnglì",pt:"competitividade"},
      {h:"生产力",py:"shēngchǎnlì",pt:"produtividade"},
      {h:"国内生产总值",py:"guónèi shēngchǎn zǒngzhí",pt:"PIB"},
      {h:"贫富差距",py:"pínfù chājù",pt:"diferença entre ricos e pobres"},
      {h:"可持续发展",py:"kě chíxù fāzhǎn",pt:"desenvolvimento sustentável"},
      {h:"劳动力",py:"láodònglì",pt:"mão de obra/força de trabalho"},
      {h:"就业率",py:"jiùyèlǜ",pt:"taxa de emprego"},
      {h:"货币",py:"huòbì",pt:"moeda/divisa"},
      {h:"财政政策",py:"cáizhèng zhèngcè",pt:"política fiscal"},
      {h:"金融危机",py:"jīnróng wēijī",pt:"crise financeira"},
      {h:"经济增长",py:"jīngjì zēngzhǎng",pt:"crescimento econômico"},
      {h:"数字经济",py:"shùzì jīngjì",pt:"economia digital"},
      {h:"新兴市场",py:"xīnxīng shìchǎng",pt:"mercados emergentes"},
      {h:"供应链",py:"gōngyìng liàn",pt:"cadeia de suprimentos"},
      {h:"企业",py:"qǐyè",pt:"empresa/corporação"},
      {h:"资本",py:"zīběn",pt:"capital (financeiro)"},
      {h:"创业",py:"chuàngyè",pt:"empreender/start-up"},
    ],
    grammar:[
      { struct:"无非是/不过是 + N/V", label:"Nada Mais que / Apenas / Somente", color:"#D97706",
        exp:"无非是/不过是 = nada mais que / apenas / somente (diminui ou simplifica algo). Indica que algo é menos complicado ou importante do que parece. Tom de relativização.",
        exs:[{cn:"经济危机无非是市场过热后的自我调节。",py:"Jīngjì wēijī wúfēi shì shìchǎng guòrè hòu de zìwǒ tiáojié.",pt:"A crise econômica não é nada mais que uma autorregulação após o superaquecimento do mercado."},{cn:"贫富差距不过是体制性问题的外在表现。",py:"Pínfù chājù bùguò shì tǐzhì xìng wèntí de wàizài biǎoxiàn.",pt:"A desigualdade econômica não é mais do que a manifestação externa de problemas sistêmicos."}] },
      { struct:"倒 + 相反/意外结果", label:"倒 — Inversão/Ao Contrário (Contrastivo)", color:"#6366F1",
        exp:"倒 indica que o resultado é o oposto do esperado ou cria contraste irônico. Equivale a 'ao contrário / pelo contrário / inesperadamente'. Muito frequente em argumentação.",
        exs:[{cn:"政府想刺激消费，经济倒陷入了通货膨胀。",py:"Zhèngfǔ xiǎng cìjī xiāofèi, jīngjì dào xiànrù le tōnghuò péngzhàng.",pt:"O governo queria estimular o consumo, mas ao contrário, a economia entrou em inflação."},{cn:"降低成本的措施倒影响了产品质量。",py:"Jiàngdī chéngběn de cuòshī dào yǐngxiǎng le chǎnpǐn zhìliàng.",pt:"As medidas de redução de custo acabaram, pelo contrário, afetando a qualidade do produto."}] },
      { struct:"反之/相反/反而 (contraste/inversão)", label:"Ao Contrário / Por Outro Lado", color:"#DC2626",
        exp:"反之 = ao contrário / inversamente (muito formal). 反而 = pelo contrário / paradoxalmente. 相反 = pelo contrário / oposto. Expressam inversão de expectativa ou posição.",
        exs:[{cn:"经济开放往往促进发展；反之，闭关锁国则导致落后。",py:"Jīngjì kāifàng wǎngwǎng cùjìn fāzhǎn; fǎn zhī, bìguān suǒguó zé dǎozhì luòhòu.",pt:"A abertura econômica tende a promover o desenvolvimento; ao contrário, o isolamento leva ao atraso."},{cn:"降息后，消费者反而更加谨慎，不愿消费。",py:"Jiàng xī hòu, xiāofèizhě fǎn'ér gèngjiā jǐnshèn, bù yuàn xiāofèi.",pt:"Após a redução dos juros, os consumidores, paradoxalmente, ficaram ainda mais cautelosos."}] },
    ],
    dialogue:[
      {sp:"A",cn:"就当前经济形势而言，通货膨胀的根本原因是什么？",py:"Jiù dāngqián jīngjì xíngshì ér yán, tōnghuò péngzhàng de gēnběn yuányīn shì shénme?",pt:"Em termos da conjuntura econômica atual, qual é a causa fundamental da inflação?"},
      {sp:"B",cn:"无非是供需失衡和货币超发。在全球供应链中断的基础上，能源价格飙升更是雪上加霜。",py:"Wúfēi shì gōng xū shī héng hé huòbì chāo fā. Zài quánqiú gōngyìng liàn zhōngduàn de jīchǔ shàng, néngyuán jiàgé biāoshēng gèng shì xuě shàng jiā shuāng.",pt:"Nada mais que desequilíbrio entre oferta e demanda e excesso monetário. Com base na ruptura das cadeias globais de suprimento, a disparada dos preços de energia piorou ainda mais."},
      {sp:"A",cn:"政府降息想刺激投资，倒可能加剧通货膨胀，对吗？",py:"Zhèngfǔ jiàng xī xiǎng cìjī tóuzī, dào kěnéng jiājù tōnghuò péngzhàng, duì ma?",pt:"O governo reduz juros querendo estimular o investimento, mas pode, ao contrário, agravar a inflação, certo?"},
      {sp:"B",cn:"正是！据经济学家分析，财政政策和货币政策需要协调配合，反之则可能两败俱伤。",py:"Zhèng shì! Jù jīngjìxuéjiā fēnxī, cáizhèng zhèngcè hé huòbì zhèngcè xūyào xiétiáo pèihé, fǎn zhī zé kěnéng liǎng bài jù shāng.",pt:"Exatamente! Segundo análises de economistas, política fiscal e monetária precisam ser coordenadas; caso contrário, ambas podem ser prejudicadas."},
    ],
    quiz:[
      {q:"无非是 equivale a:",opts:["especialmente/em particular","nada mais que/apenas","ao contrário","segundo"],ans:1,exp:"✅ 无非是 = nada mais que / apenas. Relativiza ou simplifica: 这不过是个误解(isso não é mais do que um mal-entendido). Não tem conotação negativa — apenas reduz a complexidade percebida."},
      {q:"倒 em '他想节约，倒花了更多' indica:",opts:["intenção","resultado esperado","resultado paradoxalmente oposto ao esperado","causa"],ans:2,exp:"✅ 倒 = resultado CONTRÁRIO ao esperado (paradoxo/ironia). Queria economizar mas ao contrário gastou mais. É o marcador de INVERSÃO de expectativa."},
      {q:"反之 (fǎnzhī) equivale a:",opts:["portanto","ao contrário/inversamente","além disso","a menos que"],ans:1,exp:"✅ 反之 = ao contrário/inversamente (muito formal). 反=oposto + 之=isso. Se A é verdade, 反之=o oposto também é. Frequente em análises e ensaios acadêmicos."},
      {q:"通货膨胀 (tōnghuò péngzhàng) significa:",opts:["deflação","crescimento econômico","inflação","recessão"],ans:2,exp:"✅ 通货膨胀 = inflação. 通货=moeda em circulação + 膨胀=expandir/inflar. O oposto é 通货紧缩(deflação). Pronúncia: tōng-huò-péng-zhàng!"},
      {q:"竞争力 é formada por:",opts:["竞争(competição)+力(força) = competitividade","竞(competir)+争(lutar)+力(poder) = poder de luta","只(só)+争(lutar)+力(força)","競(apenas)+争+力"],ans:0,exp:"✅ 竞争力 = 竞争(competição)+力(força/capacidade) = competitividade. Outros compostos com 力: 生产力(produtividade), 劳动力(força de trabalho), 创造力(criatividade)."},
    ] },

  { w:4, phase:"Filosofia", emoji:"🤔", color:"#7C3AED",
    theme:"Filosofia, Ética e Pensamento Crítico Avançado",
    stats:{ words:"~25 novas HSK 4", grammar:"即便/即使...也 · 何况 · 毕竟", chars:"+25 novos" },
    vocab:[
      {h:"意识形态",py:"yìshí xíngtài",pt:"ideologia"},
      {h:"世界观",py:"shìjièguān",pt:"cosmovisão/visão de mundo"},
      {h:"方法论",py:"fāngfǎlùn",pt:"metodologia"},
      {h:"认识论",py:"rènshílùn",pt:"epistemologia"},
      {h:"本体论",py:"běntǐlùn",pt:"ontologia"},
      {h:"辩证法",py:"biànzhèngfǎ",pt:"dialética"},
      {h:"批判性思维",py:"pīpàn xìng sīwéi",pt:"pensamento crítico"},
      {h:"逻辑推理",py:"luójí tuīlǐ",pt:"raciocínio lógico"},
      {h:"演绎法",py:"yǎnyìfǎ",pt:"método dedutivo"},
      {h:"归纳法",py:"guīnàfǎ",pt:"método indutivo"},
      {h:"前后矛盾",py:"qiánhòu máodùn",pt:"autocontraditório"},
      {h:"元认知",py:"yuán rènzhī",pt:"metacognição"},
      {h:"存在主义",py:"cúnzài zhǔyì",pt:"existencialismo"},
      {h:"实用主义",py:"shíyòng zhǔyì",pt:"pragmatismo"},
      {h:"相对主义",py:"xiāngduì zhǔyì",pt:"relativismo"},
      {h:"绝对",py:"juéduì",pt:"absoluto"},
      {h:"相对",py:"xiāngduì",pt:"relativo"},
      {h:"主观",py:"zhǔguān",pt:"subjetivo"},
      {h:"客观",py:"kèguān",pt:"objetivo"},
      {h:"理性",py:"lǐxìng",pt:"racionalidade/razão"},
      {h:"感性",py:"gǎnxìng",pt:"emocionalidade/emoção"},
      {h:"价值判断",py:"jiàzhí pànduàn",pt:"julgamento de valor"},
      {h:"事实陈述",py:"shìshí chénshù",pt:"declaração factual"},
      {h:"批判",py:"pīpàn",pt:"criticar/crítica"},
      {h:"论证",py:"lùnzhèng",pt:"argumentação/argumentar"},
    ],
    grammar:[
      { struct:"即便/即使 + 假设 + ，也 + 结论", label:"Mesmo Que / Ainda que (Hipótese Extrema)", color:"#7C3AED",
        exp:"即便/即使...也 = mesmo que / ainda que. Indica que B permanece verdadeiro MESMO NO CASO EXTREMO de A. Mais enfático que 虽然...但是(concede fato real). Aqui A é HIPOTÉTICO.",
        exs:[{cn:"即便逻辑推理再完美，也需要基于真实的前提。",py:"Jíbiàn luójí tuīlǐ zài wánměi, yě xūyào jīyú zhēnshí de qiántí.",pt:"Mesmo que o raciocínio lógico seja perfeito, ainda é necessário que se baseie em premissas verdadeiras."},{cn:"即使相对主义是正确的，价值判断也是不可避免的。",py:"Jíshǐ xiāngduì zhǔyì shì zhèngquè de, jiàzhí pànduàn yě shì bù kě bìmiǎn de.",pt:"Mesmo que o relativismo esteja correto, os julgamentos de valor são inevitáveis."}] },
      { struct:"何况 + 递进/更强论据", label:"Quanto Mais / E Mais Ainda (Progressão)", color:"#D97706",
        exp:"何况 = quanto mais / muito menos / e ainda mais. Adiciona argumento progressivamente mais forte. A→况B = se A já é assim, quanto mais B (que é ainda mais extremo).",
        exs:[{cn:"普通人难以理解高深的哲学，何况是小孩子。",py:"Pǔtōng rén nányǐ lǐjiě gāoshēn de zhéxué, hékuàng shì xiǎo háizi.",pt:"As pessoas comuns já acham difícil entender filosofia profunda — quanto mais as crianças."},{cn:"主观判断很容易出错，何况是带有偏见的判断。",py:"Zhǔguān pànduàn hěn róngyì chūcuò, hékuàng shì dàiyǒu piānjiàn de pànduàn.",pt:"Julgamentos subjetivos já erram facilmente — quanto mais os julgamentos com preconceito."}] },
      { struct:"毕竟 + 客观事实/理由", label:"Afinal de Contas / No Fim das Contas", color:"#059669",
        exp:"毕竟 = afinal de contas / no fim das contas / é que. Indica a razão fundamental ou fato inegável por trás de algo. Tom de explicação definitiva ou aceitação de realidade.",
        exs:[{cn:"人类毕竟是理性与感性并存的动物。",py:"Rénlèi bìjìng shì lǐxìng yǔ gǎnxìng bìngcún de dòngwù.",pt:"Afinal de contas, os seres humanos são animais nos quais racionalidade e emoção coexistem."},{cn:"批判性思维毕竟需要大量的练习才能掌握。",py:"Pīpàn xìng sīwéi bìjìng xūyào dàliàng de liànxí cái néng zhǎngwò.",pt:"No fim das contas, o pensamento crítico requer muita prática para ser dominado."}] },
    ],
    dialogue:[
      {sp:"A",cn:"你觉得逻辑推理能解决所有哲学问题吗？",py:"Nǐ juéde luójí tuīlǐ néng jiějué suǒyǒu zhéxué wèntí ma?",pt:"Você acha que o raciocínio lógico pode resolver todos os problemas filosóficos?"},
      {sp:"B",cn:"即便逻辑完全正确，也无法解决价值判断的问题。毕竟，'什么是善'不是一个逻辑问题，而是伦理问题。",py:"Jíbiàn luójí wánquán zhèngquè, yě wúfǎ jiějué jiàzhí pànduàn de wèntí.",pt:"Mesmo que a lógica seja completamente correta, não consegue resolver questões de julgamento de valor. Afinal, 'o que é o bem' não é uma questão lógica, mas ética."},
      {sp:"A",cn:"那相对主义难道是答案？如果一切都相对，连批判都失去意义了，何况是辩证法。",py:"Nà xiāngduì zhǔyì nándào shì dá'àn? Rúguǒ yīqiè dōu xiāngduì, lián pīpàn dōu shīqù yìyì le, hékuàng shì biànzhèngfǎ.",pt:"Então o relativismo é a resposta? Se tudo é relativo, até a crítica perde sentido — quanto mais a dialética."},
      {sp:"B",cn:"从辩证法的角度来看，绝对与相对并非对立。无非是同一事物的两个层面，在不同的基础上呈现不同的形态。",py:"Cóng biànzhèngfǎ de jiǎodù lái kàn, juéduì yǔ xiāngduì bìngfēi duìlì.",pt:"Do ponto de vista da dialética, absoluto e relativo não são opostos. Nada mais que dois aspectos da mesma coisa, manifestando formas diferentes em bases diferentes."},
    ],
    quiz:[
      {q:"即便/即使...也 difere de 虽然...但是 porque:",opts:["são sinônimos","即便...也 é sobre hipótese (mesmo que); 虽然...但是 concede fato real","即便 é mais informal","虽然 é mais enfático"],ans:1,exp:"✅ 即便/即使...也 = HIPÓTESE extrema (mesmo que X fosse verdade). 虽然...但是 = CONCESSÃO de fato real (embora X seja verdade). A diferença é real vs hipotético!"},
      {q:"何况 usa-se para:",opts:["contradizer","adicionar argumento progressivamente mais extremo","concluir","exemplificar"],ans:1,exp:"✅ 何况 = progressão argumentativa. 'Se A já é X, quanto mais B (ainda mais extremo)'. A→何况B significa que B representa caso ainda mais forte que A."},
      {q:"毕竟 equivale a:",opts:["portanto","embora","afinal de contas/é que (fato fundamental)","ao contrário"],ans:2,exp:"✅ 毕竟 = afinal de contas / é que. Traz razão fundamental ou realidade inegável. 人毕竟是人(afinal, pessoas são pessoas). Tom de aceitação de verdade irrefutável."},
      {q:"演绎法 e 归纳法 são:",opts:["sinônimos","dedução (geral→específico) e indução (específico→geral)","crítica e avaliação","subjetivo e objetivo"],ans:1,exp:"✅ 演绎法(método dedutivo)=do geral ao específico. 归纳法(método indutivo)=do específico ao geral. Ex: 演绎:Todo humano é mortal → Sócrates é humano → Sócrates é mortal."},
      {q:"辩证法 (biànzhèngfǎ) é:",opts:["lógica formal","dialética (ver contradições e síntese)","pragmatismo","relativismo"],ans:1,exp:"✅ 辩证法 = dialética. Método que vê contradições(矛盾)e sua resolução/síntese(统一). Central na filosofia marxista e na filosofia clássica chinesa (阴阳辩证)."},
    ] },

  { w:5, phase:"Direito", emoji:"⚖️", color:"#DC2626",
    theme:"Direito, Justiça e Ordenamento Social",
    stats:{ words:"~25 novas HSK 4", grammar:"依据/根据...规定 · 在...框架下 · 依法", chars:"+25 novos" },
    vocab:[
      {h:"法律体系",py:"fǎlǜ tǐxì",pt:"sistema jurídico"},
      {h:"法制",py:"fǎzhì",pt:"rule of law/legalidade"},
      {h:"诉讼",py:"sùsòng",pt:"litígio/processo judicial"},
      {h:"仲裁",py:"zhòngcái",pt:"arbitragem"},
      {h:"判决",py:"pànjué",pt:"veredicto/sentença"},
      {h:"赔偿",py:"péicháng",pt:"indenização/compensação"},
      {h:"违法",py:"wéifǎ",pt:"ilegal/infringir a lei"},
      {h:"合法",py:"héfǎ",pt:"legal/legítimo"},
      {h:"执法",py:"zhífǎ",pt:"aplicar a lei/execução legal"},
      {h:"司法",py:"sīfǎ",pt:"judiciário"},
      {h:"立法",py:"lìfǎ",pt:"legislar/legislação"},
      {h:"律师",py:"lǜshī",pt:"advogado/a"},
      {h:"检察院",py:"jiǎncháyuàn",pt:"ministério público"},
      {h:"法院",py:"fǎyuàn",pt:"tribunal/corte"},
      {h:"无罪",py:"wúzuì",pt:"inocente/absolvido"},
      {h:"有罪",py:"yǒuzuì",pt:"culpado/condenado"},
      {h:"人权",py:"rénquán",pt:"direitos humanos"},
      {h:"公民权利",py:"gōngmín quánlì",pt:"direitos civis"},
      {h:"隐私权",py:"yǐnsīquán",pt:"direito à privacidade"},
      {h:"知识产权",py:"zhīshí chǎnquán",pt:"propriedade intelectual"},
      {h:"合同",py:"hétong",pt:"contrato"},
      {h:"条款",py:"tiáokuǎn",pt:"cláusula/disposição"},
      {h:"义务",py:"yìwù",pt:"obrigação/dever legal"},
      {h:"责任",py:"zérèn",pt:"responsabilidade"},
      {h:"平等保护",py:"píngděng bǎohù",pt:"proteção igualitária"},
    ],
    grammar:[
      { struct:"依据/根据 + 法律/规定 + ，...", label:"Segundo / Em Conformidade com (Legalmente)", color:"#DC2626",
        exp:"依据/根据 em contexto legal = conforme / em conformidade com. 依据法律规定(conforme a lei), 根据宪法(segundo a constituição). Mais formal que 按照 em contextos jurídicos.",
        exs:[{cn:"依据宪法规定，公民享有言论自由的权利。",py:"Yīju xiànfǎ guīdìng, gōngmín xiǎngyǒu yánlùn zìyóu de quánlì.",pt:"Conforme a constituição, os cidadãos têm o direito à liberdade de expressão."},{cn:"根据合同条款，违约方须赔偿对方损失。",py:"Gēnjù hétong tiáokuǎn, wéiyuē fāng xū péicháng duìfāng sǔnshī.",pt:"De acordo com as cláusulas contratuais, a parte inadimplente deve indenizar os prejuízos da outra."}] },
      { struct:"在 + 制度/规范 + 框架下/体系内", label:"No âmbito de / Dentro do Quadro de", color:"#6366F1",
        exp:"在...框架下/体系内 = no âmbito de / dentro da estrutura de. Indica que algo opera dentro de um sistema ou conjunto de regras. Formal e muito usado em textos jurídicos e políticos.",
        exs:[{cn:"在现行法律框架下，知识产权受到明确保护。",py:"Zài xiànxíng fǎlǜ kuàngjià xià, zhīshí chǎnquán shòudào míngquè bǎohù.",pt:"No âmbito do quadro legal vigente, a propriedade intelectual recebe proteção clara."},{cn:"在国际法律体系内，人权保护具有普遍意义。",py:"Zài guójì fǎlǜ tǐxì nèi, rénquán bǎohù jùyǒu pǔbiàn yìyì.",pt:"Dentro do sistema jurídico internacional, a proteção dos direitos humanos tem significado universal."}] },
      { struct:"依法 + V (ação legal)", label:"Legalmente / Em Conformidade com a Lei", color:"#059669",
        exp:"依法 = legalmente / conforme a lei / de acordo com a lei (advérbio). Precede o verbo para indicar que a ação tem fundamento legal. 依法处理(tratar conforme a lei), 依法保护(proteger legalmente).",
        exs:[{cn:"违法行为将依法受到相应处罚。",py:"Wéifǎ xíngwéi jiāng yīfǎ shòudào xiāngyìng chǔfá.",pt:"Atos ilegais serão punidos conforme a lei."},{cn:"公民的合法权益受到国家依法保护。",py:"Gōngmín de héfǎ quányì shòudào guójiā yīfǎ bǎohù.",pt:"Os direitos e interesses legítimos dos cidadãos são protegidos pelo Estado conforme a lei."}] },
    ],
    dialogue:[
      {sp:"A",cn:"在现行法律框架下，知识产权侵权案件越来越多，这说明了什么？",py:"Zài xiànxíng fǎlǜ kuàngjià xià, zhīshí chǎnquán qīnquán ànjìan yuèláiyuè duō, zhè shuōmíng le shénme?",pt:"No âmbito do quadro legal vigente, casos de violação de propriedade intelectual são cada vez mais frequentes — o que isso indica?"},
      {sp:"B",cn:"从法制层面来看，无非是执法力度不足和公民法律意识薄弱两个原因。",py:"Cóng fǎzhì céngmiàn lái kàn, wúfēi shì zhífǎ lìdù bùzú hé gōngmín fǎlǜ yìshí bówò liǎng gè yuányīn.",pt:"Do ponto de vista do estado de direito, nada mais que dois motivos: insuficiência na aplicação da lei e fraca consciência jurídica dos cidadãos."},
      {sp:"A",cn:"即便法律框架完善，依法执法的能力也需要加强。何况是数字经济下的知识产权保护。",py:"Jíbiàn fǎlǜ kuàngjià wánshàn, yīfǎ zhífǎ de nénglì yě xūyào jiāqiáng.",pt:"Mesmo que o quadro legal seja perfeito, a capacidade de aplicar a lei ainda precisa ser reforçada. Quanto mais a proteção de propriedade intelectual na economia digital."},
      {sp:"B",cn:"毕竟，技术发展比立法速度更快，依据现行法律规定处理新型案件面临很大挑战。",py:"Bìjìng, jìshù fāzhǎn bǐ lìfǎ sùdù gèng kuài.",pt:"Afinal de contas, o desenvolvimento tecnológico é mais rápido que a legislação, e tratar novos tipos de casos conforme a lei vigente representa grande desafio."},
    ],
    quiz:[
      {q:"依据宪法 equivale a:",opts:["contra a constituição","segundo/conforme a constituição","além da constituição","apesar da constituição"],ans:1,exp:"✅ 依据+法律/文件 = conforme / em conformidade com. 依据宪法=conforme a constituição. Formal em contextos legais. Sinônimos: 根据, 按照 (diferentes nuances de formalidade)."},
      {q:"在法律框架下 indica que algo:",opts:["viola a lei","opera dentro do sistema jurídico","está acima da lei","ignora a lei"],ans:1,exp:"✅ 在...框架下 = dentro da estrutura/âmbito de. 在法律框架下=no âmbito da estrutura legal. Indica conformidade com o sistema estabelecido."},
      {q:"依法 (yīfǎ) como advérbio significa:",opts:["ilegalmente","como opcional","conforme/legalmente","historicamente"],ans:2,exp:"✅ 依法 = conforme a lei / legalmente. 依=conforme + 法=lei. 依法处理(tratar legalmente), 依法保护(proteger legalmente). Comum em comunicados oficiais e textos jurídicos."},
      {q:"仲裁 (zhòngcái) difere de 诉讼 porque:",opts:["são sinônimos","仲裁=arbitragem (extrajudicial); 诉讼=litígio (judicial)","仲裁=criminal; 诉讼=civil","仲裁=internacional; 诉讼=doméstico"],ans:1,exp:"✅ 仲裁=arbitragem (resolução alternativa de disputas, fora do tribunal). 诉讼=litígio/processo judicial (dentro do sistema de tribunais). Distinção fundamental no direito!"},
      {q:"违法 vs 合法:",opts:["sinônimos","违法=ilegal (infringir a lei); 合法=legal (em conformidade com a lei)","违法=criminal; 合法=civil","违法=intencional; 合法=acidental"],ans:1,exp:"✅ 违法(wéifǎ)=ilegal. 合法(héfǎ)=legal. 违=infringir + 法=lei. 合=estar em conformidade + 法=lei. Par oposto fundamental no vocabulário jurídico!"},
    ] },

  { w:6, phase:"Ciência", emoji:"🔬", color:"#059669",
    theme:"Ciência, Pesquisa e Metodologia Científica",
    stats:{ words:"~25 novas HSK 4", grammar:"实验/数据表明 · 结果显示 · 经...证明", chars:"+25 novos" },
    vocab:[
      {h:"假设",py:"jiǎshè",pt:"hipótese/supor"},
      {h:"实验",py:"shíyàn",pt:"experimento/experimentar"},
      {h:"数据分析",py:"shùjù fēnxī",pt:"análise de dados"},
      {h:"论证",py:"lùnzhèng",pt:"argumentação/provar"},
      {h:"样本",py:"yàngběn",pt:"amostra"},
      {h:"变量",py:"biànliàng",pt:"variável"},
      {h:"控制变量",py:"kòngzhì biànliàng",pt:"controle de variáveis"},
      {h:"理论框架",py:"lǐlùn kuàngjià",pt:"framework teórico"},
      {h:"研究方法",py:"yánjiū fāngfǎ",pt:"metodologia de pesquisa"},
      {h:"文献综述",py:"wénxiàn zōngshù",pt:"revisão bibliográfica"},
      {h:"实证研究",py:"shízhèng yánjiū",pt:"pesquisa empírica"},
      {h:"定量研究",py:"dìngliàng yánjiū",pt:"pesquisa quantitativa"},
      {h:"定性研究",py:"dìngxìng yánjiū",pt:"pesquisa qualitativa"},
      {h:"对照组",py:"duìzhào zǔ",pt:"grupo de controle"},
      {h:"结论",py:"jiélùn",pt:"conclusão"},
      {h:"发现",py:"fāxiàn",pt:"descoberta/descobrir"},
      {h:"成果",py:"chéngguǒ",pt:"resultado/conquista (pesquisa)"},
      {h:"创新",py:"chuàngxīn",pt:"inovação"},
      {h:"突破",py:"tūpò",pt:"avanço/breakthrough"},
      {h:"专利",py:"zhuānlì",pt:"patente"},
      {h:"前沿",py:"qiányán",pt:"fronteira/estado da arte"},
      {h:"跨学科",py:"kuà xuékē",pt:"interdisciplinar"},
      {h:"基因",py:"jīyīn",pt:"gene"},
      {h:"纳米技术",py:"nàmǐ jìshù",pt:"nanotecnologia"},
      {h:"量子计算",py:"liàngzǐ jìsuàn",pt:"computação quântica"},
    ],
    grammar:[
      { struct:"实验/研究/数据 + 表明/证明/显示 + 结论", label:"Evidência Científica — Indicar/Provar/Mostrar", color:"#059669",
        exp:"表明(indicar/revelar), 证明(provar), 显示(mostrar/evidenciar). Estruturas de apresentação de evidência científica. Sujeito é sempre a fonte de evidência (experimento, dados, pesquisa).",
        exs:[{cn:"实验数据表明，新疫苗的有效率超过百分之九十。",py:"Shíyàn shùjù biǎomíng, xīn yìmiáo de yǒuxiào lǜ chāoguò bǎifēnzhī jiǔshí.",pt:"Os dados experimentais indicam que a eficácia da nova vacina supera 90%."},{cn:"研究结果显示，睡眠不足对认知能力有显著影响。",py:"Yánjiū jiéguǒ xiǎnshì, shuìmián bùzú duì rènzhī nénglì yǒu xiǎnzhù yǐngxiǎng.",pt:"Os resultados da pesquisa evidenciam que a privação de sono tem impacto significativo nas capacidades cognitivas."}] },
      { struct:"经 + 研究/实验/证明 + 证实", label:"Após Ser Comprovado por / Verificado por", color:"#6366F1",
        exp:"经...证实/验证/确认 = após ser verificado/comprovado por X. 经 aqui significa 'após passar por' (processo). Estrutura passiva de validação científica muito formal.",
        exs:[{cn:"经多项独立研究证实，这一假设具有科学依据。",py:"Jīng duō xiàng dúlì yánjiū zhèngshí, zhè yī jiǎshè jùyǒu kēxué yījù.",pt:"Após ser confirmada por múltiplas pesquisas independentes, esta hipótese tem base científica."},{cn:"经专利认定，该技术属于完全创新的发明。",py:"Jīng zhuānlì rèndìng, gāi jìshù shǔyú wánquán chuàngxīn de fāmíng.",pt:"Após reconhecimento por patente, esta tecnologia constitui uma invenção completamente inovadora."}] },
      { struct:"在...领域/方面 + 取得 + 突破/成果", label:"Alcançar Avanços / Conquistas em", color:"#D97706",
        exp:"在...领域取得突破/进展 = alcançar avanços/progressos no campo de X. Estrutura padrão para descrever conquistas científicas ou acadêmicas.",
        exs:[{cn:"中国在量子计算领域取得了重大突破。",py:"Zhōngguó zài liàngzǐ jìsuàn lǐngyù qǔdé le zhòngdà tūpò.",pt:"A China alcançou avanços significativos no campo da computação quântica."},{cn:"在基因编辑方面，跨学科合作促进了多项成果。",py:"Zài jīyīn biānjí fāngmiàn, kuà xuékē hézuò cùjìn le duō xiàng chéngguǒ.",pt:"No âmbito da edição genética, a colaboração interdisciplinar impulsionou várias conquistas."}] },
    ],
    dialogue:[
      {sp:"A",cn:"你的研究假设是什么？数据表明了什么？",py:"Nǐ de yánjiū jiǎshè shì shénme? Shùjù biǎomíng le shénme?",pt:"Qual é a sua hipótese de pesquisa? O que os dados indicam?"},
      {sp:"B",cn:"我的假设是：在定量研究的基础上，我们能预测用户行为模式。数据分析结果显示，假设基本成立。",py:"Wǒ de jiǎshè shì: zài dìngliàng yánjiū de jīchǔ shàng, wǒmen néng yùcè yònghù xíngwéi móshì.",pt:"Minha hipótese é: com base em pesquisa quantitativa, podemos prever padrões de comportamento dos usuários. Os resultados mostram que a hipótese basicamente se confirma."},
      {sp:"A",cn:"经多项实验证实之后，你打算申请专利吗？",py:"Jīng duō xiàng shíyàn zhèngshí zhīhòu, nǐ dǎsuàn shēnqǐng zhuānlì ma?",pt:"Após ser confirmado por múltiplos experimentos, você planeja solicitar uma patente?"},
      {sp:"B",cn:"是的。我们已经在这个前沿领域取得了重大突破。即便还需要更多验证，这个成果已经具备申请条件了。",py:"Shì de. Wǒmen yǐjīng zài zhège qiányán lǐngyù qǔdé le zhòngdà tūpò.",pt:"Sim. Já alcançamos um avanço significativo neste campo de fronteira. Mesmo que ainda precise de mais verificação, este resultado já reúne condições para solicitar."},
    ],
    quiz:[
      {q:"表明 difere de 证明 porque:",opts:["são sinônimos","表明=indicar/revelar (menos definitivo); 证明=provar (conclusivo)","表明=científico; 证明=filosófico","表明=positivo; 证明=negativo"],ans:1,exp:"✅ 表明=indicar/revelar (sugere evidência). 证明=provar (conclusão mais definitiva). 数据表明(dados sugerem) vs 实验证明(experimento prova). Nuance importante em escrita científica!"},
      {q:"经多项研究证实 significa:",opts:["depois de muitas pesquisas discordarem","após ser confirmado por múltiplas pesquisas","antes de qualquer pesquisa","independentemente das pesquisas"],ans:1,exp:"✅ 经+fonte+证实 = após ser verificado/confirmado por X. 经=após passar por (processo). 经多项研究证实=após ser confirmado por múltiplas pesquisas. Estrutura passiva de validação!"},
      {q:"假设 (jiǎshè) em contexto científico é:",opts:["conclusão","teoria confirmada","hipótese","metodologia"],ans:2,exp:"✅ 假设 = hipótese (proposição a ser testada). 假=suposto + 设=estabelecer. No método científico: 假设→实验→数据分析→结论. A hipótese PRECEDE os experimentos!"},
      {q:"定量研究 vs 定性研究:",opts:["sinônimos","定量=quantitativa (números/dados); 定性=qualitativa (palavras/significados)","定量=teórica; 定性=aplicada","定量=nova; 定性=antiga"],ans:1,exp:"✅ 定量研究(quantitativa)=mede quantidades, usa estatística. 定性研究(qualitativa)=analisa qualidades, usa entrevistas/observação. Cada uma adequada para diferentes tipos de perguntas!"},
      {q:"在量子计算领域取得突破 significa:",opts:["falhar na computação quântica","alcançar avanços no campo da computação quântica","começar a estudar computação quântica","abandonar a computação quântica"],ans:1,exp:"✅ 在...领域取得突破 = alcançar avanços no campo de X. 突破=breakthrough/avanço. 取得=obter/alcançar. Estrutura padrão para descrever conquistas científicas!"},
    ] },

  { w:7, phase:"Ambiente", emoji:"🌏", color:"#059691",
    theme:"Meio Ambiente, Sustentabilidade e Política Global",
    stats:{ words:"~25 novas HSK 4", grammar:"随之 · 进而 · 从而 (cadeia causal formal)", chars:"+25 novos" },
    vocab:[
      {h:"碳中和",py:"tàn zhōnghé",pt:"neutralidade carbônica/net zero"},
      {h:"碳排放",py:"tàn páifàng",pt:"emissão de carbono"},
      {h:"可再生能源",py:"kě zàishēng néngyuán",pt:"energia renovável"},
      {h:"生物多样性",py:"shēngwù duōyàngxìng",pt:"biodiversidade"},
      {h:"生态系统",py:"shēngtài xìtǒng",pt:"ecossistema"},
      {h:"气候变化",py:"qìhòu biànhuà",pt:"mudança climática"},
      {h:"温室气体",py:"wēnshì qìtǐ",pt:"gás de efeito estufa"},
      {h:"全球变暖",py:"quánqiú biànnuǎn",pt:"aquecimento global"},
      {h:"海平面上升",py:"hǎipíngmiàn shàngshēng",pt:"elevação do nível do mar"},
      {h:"极端天气",py:"jíduān tiānqì",pt:"fenômenos climáticos extremos"},
      {h:"可持续性",py:"kě chíxù xìng",pt:"sustentabilidade"},
      {h:"绿色经济",py:"lǜsè jīngjì",pt:"economia verde"},
      {h:"碳税",py:"tàn shuì",pt:"taxação de carbono"},
      {h:"生态足迹",py:"shēngtài zújì",pt:"pegada ecológica"},
      {h:"物种灭绝",py:"wùzhǒng mièjué",pt:"extinção de espécies"},
      {h:"荒漠化",py:"huāngmòhuà",pt:"desertificação"},
      {h:"水资源",py:"shuǐ zīyuán",pt:"recursos hídricos"},
      {h:"清洁能源",py:"qīngjié néngyuán",pt:"energia limpa"},
      {h:"循环经济",py:"xúnhuán jīngjì",pt:"economia circular"},
      {h:"环境政策",py:"huánjìng zhèngcè",pt:"política ambiental"},
      {h:"国际条约",py:"guójì tiáoyuē",pt:"tratado internacional"},
      {h:"巴黎协定",py:"Bālí xiédìng",pt:"Acordo de Paris"},
      {h:"绿色技术",py:"lǜsè jìshù",pt:"tecnologia verde"},
      {h:"减排目标",py:"jiǎn pái mùbiāo",pt:"metas de redução de emissões"},
      {h:"气候难民",py:"qìhòu nànmín",pt:"refugiados climáticos"},
    ],
    grammar:[
      { struct:"A，随之/随即 B (consequência imediata)", label:"Com Isso / Imediatamente Após / Na Sequência", color:"#059691",
        exp:"随之 = com isso / na sequência. Indica que B ocorre imediatamente após A, como consequência ou acompanhamento. 随之而来(que vem com isso). Formal e muito usado em análises ambientais.",
        exs:[{cn:"全球温度持续升高，随之而来的是极端天气事件的增加。",py:"Quánqiú wēndù chíxù shēnggāo, suízhī ér lái de shì jíduān tiānqì shìjiàn de zēngjiā.",pt:"A temperatura global continua subindo — com isso vem o aumento de fenômenos climáticos extremos."},{cn:"温室气体排放增加，随之导致海平面加速上升。",py:"Wēnshì qìtǐ páifàng zēngjiā, suízhī dǎozhì hǎipíngmiàn jiāsù shàngshēng.",pt:"O aumento das emissões de gases de efeito estufa resultou, na sequência, na aceleração da elevação do nível do mar."}] },
      { struct:"进而 + 深化/扩展 + 结果", label:"Ademais / E Ainda Mais / Aprofundando Ainda", color:"#6366F1",
        exp:"进而 = ademais / e ainda mais (progressão de aprofundamento). A→进而B: após A, avança-se ainda mais para B (resultado mais profundo). Indica progressão de consequências.",
        exs:[{cn:"气候变化导致极端天气增多，进而引发更严重的经济损失。",py:"Qìhòu biànhuà dǎozhì jíduān tiānqì zēng duō, jìn'ér yǐnfā gèng yánzhòng de jīngjì sǔnshī.",pt:"A mudança climática causou mais fenômenos extremos e, ademais, provocou perdas econômicas ainda mais graves."},{cn:"生物多样性减少会破坏生态系统，进而威胁人类食物安全。",py:"Shēngwù duōyàngxìng jiǎnshǎo huì pòhuài shēngtài xìtǒng, jìn'ér wēixié rénlèi shíwù ānquán.",pt:"A redução da biodiversidade destrói ecossistemas e, aprofundando ainda mais, ameaça a segurança alimentar humana."}] },
      { struct:"从而 + 结果/目的", label:"Assim / Dessa Forma / Consequentemente", color:"#D97706",
        exp:"从而 = assim / dessa forma / consequentemente. Indica que B é o resultado ou objetivo decorrente de A. Similar a 因此, mas mais enfatiza a sequência lógica e intencional.",
        exs:[{cn:"各国采用清洁能源，从而减少温室气体排放。",py:"Gèguó cǎiyòng qīngjié néngyuán, cóng'ér jiǎnshǎo wēnshì qìtǐ páifàng.",pt:"Os países adotam energias limpas, assim reduzindo as emissões de gases de efeito estufa."},{cn:"推广循环经济，从而降低生态足迹，实现可持续发展。",py:"Tuīguǎng xúnhuán jīngjì, cóng'ér jiàngdī shēngtài zújì, shíxiàn kě chíxù fāzhǎn.",pt:"Promover a economia circular, assim reduzindo a pegada ecológica e alcançando o desenvolvimento sustentável."}] },
    ],
    dialogue:[
      {sp:"A",cn:"气候变化导致海平面上升，随之而来的问题是什么？",py:"Qìhòu biànhuà dǎozhì hǎipíngmiàn shàngshēng, suízhī ér lái de wèntí shì shénme?",pt:"A mudança climática provoca elevação do nível do mar — que problemas vêm com isso?"},
      {sp:"B",cn:"沿海城市将被淹没，进而产生大量气候难民，从而引发更深层的社会危机。",py:"Yánhǎi chéngshì jiāng bèi yānmò, jìn'ér chǎnshēng dàliàng qìhòu nànmín.",pt:"Cidades costeiras serão inundadas, e ademais serão gerados grandes números de refugiados climáticos, assim desencadeando crises sociais mais profundas."},
      {sp:"A",cn:"据科学数据表明，如果不减少碳排放，全球变暖将难以控制。",py:"Jù kēxué shùjù biǎomíng, rúguǒ bù jiǎnshǎo tàn páifàng, quánqiú biànnuǎn jiāng nányǐ kòngzhì.",pt:"Segundo dados científicos, se não reduzirmos as emissões de carbono, o aquecimento global será difícil de controlar."},
      {sp:"B",cn:"正是！在巴黎协定框架下，各国需制定明确的减排目标，从而共同实现碳中和。",py:"Zhèng shì! Zài Bālí xiédìng kuàngjià xià, gèguó xū zhìdìng míngquè de jiǎn pái mùbiāo.",pt:"Exatamente! No âmbito do Acordo de Paris, os países precisam estabelecer metas claras de redução, assim alcançando conjuntamente a neutralidade carbônica."},
    ],
    quiz:[
      {q:"随之而来 significa:",opts:["antes disso","que vem com isso/na sequência (consequência imediata)","ao contrário disso","independentemente disso"],ans:1,exp:"✅ 随之而来 = que vem com isso / na sequência. 随=acompanhar + 之=isso + 而来=que vem. Indica consequência imediata e acompanhamento. 随之而来的是X=X é o que vem com isso."},
      {q:"进而 indica:",opts:["contradição","aprofundamento progressivo de consequências","causa inicial","conclusão final"],ans:1,exp:"✅ 进而 = e ainda mais / aprofundando ainda / adentrando mais. Indica progressão para consequência MAIS PROFUNDA ou MAIS EXTREMA. A→进而B: B é o desdobramento ainda mais significativo de A."},
      {q:"从而 é mais parecido com:",opts:["embora","ao contrário","assim/dessa forma/consequentemente","a menos que"],ans:2,exp:"✅ 从而 ≈ 因此(portanto) ≈ 从而(assim/dessa forma). Indica que B decorre de A de forma lógica e proposital. 从 enfatiza a ORIGEM e 而 a continuidade lógica."},
      {q:"碳中和 (tàn zhōnghé) significa:",opts:["eliminação total de carbono","neutralidade carbônica (emissões=absorção)","taxação de carbono","ciclo do carbono"],ans:1,exp:"✅ 碳中和 = neutralidade carbônica (carbon neutrality / net zero). 碳=carbono + 中和=neutralizar/equilibrar. As emissões de CO₂ são compensadas pela absorção equivalente."},
      {q:"可再生能源 significa:",opts:["energia nuclear","energia fóssil","energia renovável","energia cara"],ans:2,exp:"✅ 可再生能源 = energia renovável. 可=pode + 再生=regenerar-se + 能源=energia. Energia que pode ser regenerada naturalmente: solar(太阳能), eólica(风能), hídrica(水能), etc."},
    ] },

  { w:8, phase:"Mídia", emoji:"📡", color:"#6366F1",
    theme:"Mídia, Comunicação e Era da Informação",
    stats:{ words:"~25 novas HSK 4", grammar:"据...报道 · 有关...的 · 引发/引起+反响", chars:"+25 novos" },
    vocab:[
      {h:"舆论",py:"yúlùn",pt:"opinião pública"},
      {h:"媒体",py:"méitǐ",pt:"mídia"},
      {h:"新闻自由",py:"xīnwén zìyóu",pt:"liberdade de imprensa"},
      {h:"信息传播",py:"xìnxī chuánbō",pt:"disseminação de informação"},
      {h:"社交媒体",py:"shèjiāo méitǐ",pt:"mídias sociais"},
      {h:"算法",py:"suànfǎ",pt:"algoritmo"},
      {h:"信息茧房",py:"xìnxī jiǎnfáng",pt:"câmara de eco/bolha informacional"},
      {h:"虚假信息",py:"xūjiǎ xìnxī",pt:"desinformação/fake news"},
      {h:"数字鸿沟",py:"shùzì hónggōu",pt:"divisão digital"},
      {h:"媒体素养",py:"méitǐ sùyǎng",pt:"letramento midiático"},
      {h:"新闻报道",py:"xīnwén bàodào",pt:"cobertura jornalística"},
      {h:"报道",py:"bàodào",pt:"reportar/reportagem"},
      {h:"评论",py:"pínglùn",pt:"comentário/análise"},
      {h:"舆情",py:"yúqíng",pt:"sentimento público/tendência de opinião"},
      {h:"议题设置",py:"yìtí shèzhì",pt:"agenda-setting"},
      {h:"信息过载",py:"xìnxī guòzài",pt:"sobrecarga informacional"},
      {h:"隐私保护",py:"yǐnsī bǎohù",pt:"proteção de privacidade"},
      {h:"网络暴力",py:"wǎngluò bàolì",pt:"violência digital/cyberbullying"},
      {h:"言论自由",py:"yánlùn zìyóu",pt:"liberdade de expressão"},
      {h:"审查",py:"shěnchá",pt:"censura/auditar"},
      {h:"独立媒体",py:"dúlì méitǐ",pt:"mídia independente"},
      {h:"可信度",py:"kěxìndù",pt:"credibilidade"},
      {h:"影响力",py:"yǐngxiǎnglì",pt:"influência/alcance"},
      {h:"流量",py:"liúliàng",pt:"tráfego/audiência"},
      {h:"传播速度",py:"chuánbō sùdù",pt:"velocidade de disseminação"},
    ],
    grammar:[
      { struct:"据 + 媒体/报道/消息 + 报道/称", label:"Segundo Reportado Por / De Acordo com (Mídia)", color:"#6366F1",
        exp:"据媒体报道(segundo reportado pela mídia), 据悉(segundo se sabe), 据称(segundo afirmado). Estruturas de atribuição a fontes jornalísticas. Frequentíssimas em reportagens.",
        exs:[{cn:"据媒体报道，该社交平台已删除数百万条虚假信息。",py:"Jù méitǐ bàodào, gāi shèjiāo píngtái yǐ shānchú shùbǎi wàn tiáo xūjiǎ xìnxī.",pt:"Segundo reportado pela mídia, a plataforma social já removeu centenas de milhões de itens de desinformação."},{cn:"据悉，相关部门正在调查此次网络暴力事件。",py:"Jù xī, xiāngguān bùmén zhèngzài diàochá cǐcì wǎngluò bàolì shìjiàn.",pt:"Segundo se sabe, os departamentos competentes estão investigando este caso de violência digital."}] },
      { struct:"有关 + 话题 + 的 + 讨论/争议/报道", label:"Relacionado a / A Respeito de / Sobre (Formal)", color:"#D97706",
        exp:"有关...的 = relacionado a / referente a / sobre. Mais formal que 关于. Frequente em textos jornalísticos. 有关X的讨论(discussão a respeito de X), 有关X的报道(reportagem sobre X).",
        exs:[{cn:"有关新闻自由的讨论在国际社会引发了广泛关注。",py:"Yǒuguān xīnwén zìyóu de tǎolùn zài guójì shèhuì yǐnfā le guǎngfàn guānzhù.",pt:"A discussão relacionada à liberdade de imprensa gerou ampla atenção na comunidade internacional."},{cn:"有关虚假信息的传播，各国监管机构纷纷采取行动。",py:"Yǒuguān xūjiǎ xìnxī de chuánbō, gèguó jiānguǎn jīgòu fēnfēn cǎiqǔ xíngdòng.",pt:"Sobre a disseminação de desinformação, os reguladores de vários países tomaram medidas sucessivamente."}] },
      { struct:"引发/引起 + 广泛 + 反响/关注/争议", label:"Gerar / Provocar (Reação ou Atenção Ampla)", color:"#DC2626",
        exp:"引发/引起 = gerar/desencadear/provocar. 引发广泛关注(gerar ampla atenção), 引起争议(gerar controvérsia), 引发反响(gerar repercussão). Muito usadas em textos jornalísticos.",
        exs:[{cn:"这篇报道引发了社会各界的广泛讨论和争议。",py:"Zhè piān bàodào yǐnfā le shèhuì gèjiè de guǎngfàn tǎolùn hé zhēngyì.",pt:"Esta reportagem gerou ampla discussão e controvérsia em todos os setores da sociedade."},{cn:"算法对言论的审查引起了新闻自由倡导者的强烈反响。",py:"Suànfǎ duì yánlùn de shěnchá yǐnqǐ le xīnwén zìyóu chàngdǎo zhě de qiángliè fǎnxiǎng.",pt:"A censura algorítmica do discurso provocou forte reação entre os defensores da liberdade de imprensa."}] },
    ],
    dialogue:[
      {sp:"A",cn:"据媒体报道，信息茧房正在加剧社会极化，你怎么看？",py:"Jù méitǐ bàodào, xìnxī jiǎnfáng zhèngzài jiājù shèhuì jíhuà, nǐ zěnme kàn?",pt:"Segundo relatórios midiáticos, as bolhas informacionais estão agravando a polarização social — o que você acha?"},
      {sp:"B",cn:"有关这个问题的研究表明，算法确实在推送用户已有偏好的内容，从而强化了信息茧房。",py:"Yǒuguān zhège wèntí de yánjiū biǎomíng, suànfǎ quèshí zài tuīsòng yònghù yǐyǒu piānhào de nèiróng.",pt:"Pesquisas sobre esta questão indicam que os algoritmos de fato recomendam conteúdo alinhado com preferências existentes, assim reforçando as bolhas."},
      {sp:"A",cn:"这引发了广泛的关于媒体素养的讨论。倒是有些机构已经开始推广相关教育了。",py:"Zhè yǐnfā le guǎngfàn de guānyú méitǐ sùyǎng de tǎolùn.",pt:"Isso gerou ampla discussão sobre letramento midiático. Aliás, algumas instituições já começaram a promover educação a respeito."},
      {sp:"B",cn:"在信息过载的时代，媒体素养无非是让公众具备辨别信息可信度的基本能力，这至关重要。",py:"Zài xìnxī guòzài de shídài, méitǐ sùyǎng wúfēi shì ràng gōngzhòng jùbèi biànbié xìnxī kěxìndù de jīběn nénglì.",pt:"Na era da sobrecarga informacional, o letramento midiático nada mais é do que dotar o público da capacidade básica de avaliar a credibilidade das informações — isso é crucial."},
    ],
    quiz:[
      {q:"据媒体报道 é usado para:",opts:["expressar opinião pessoal","citar fonte jornalística/atribuir informação à mídia","fazer perguntas","contrariar algo"],ans:1,exp:"✅ 据+fonte+报道 = segundo X reportou / conforme reportado por X. Estrutura de CITAÇÃO DE FONTE jornalística. Equivale a 'according to media reports' em inglês."},
      {q:"有关 vs 关于 — qual a diferença?",opts:["sinônimos","有关 é mais formal/jornalístico; 关于 é mais versátil e conversacional","有关 é negativo","关于 não pode começar frases"],ans:1,exp:"✅ 有关 e 关于 são próximos, mas 有关...的+N é mais formal e jornalístico. 关于 é mais versátil. 有关X的报道(reportagem sobre X) é muito mais natural do que 关于X的报道 em textos formais."},
      {q:"引发广泛关注 significa:",opts:["receber críticas","gerar ampla atenção/repercussão","ser ignorado","ser censurado"],ans:1,exp:"✅ 引发广泛关注 = gerar ampla atenção. 引发=desencadear/gerar + 广泛=amplo/extenso + 关注=atenção. Frase-padrão em jornalismo para descrever repercussão."},
      {q:"信息茧房 (xìnxī jiǎnfáng) significa:",opts:["arquivo digital","câmara de eco/bolha informacional","censura","notícia falsa"],ans:1,exp:"✅ 信息茧房 = câmara de eco / bolha de filtro. 信息=informação + 茧=casulo + 房=quarto. 'Quarto-casulo de informação' — onde as pessoas só consomem informações que reforçam suas crenças. Conceito chave da era digital!"},
      {q:"媒体素养 (méitǐ sùyǎng) significa:",opts:["jornalismo profissional","censura midiática","letramento midiático/capacidade de avaliar mídias","audiência de mídia"],ans:2,exp:"✅ 媒体素养 = letramento midiático (media literacy). 媒体=mídia + 素养=cultura/competência. A capacidade de compreender, analisar criticamente e usar a mídia de forma responsável."},
    ] },

  { w:9, phase:"Acadêmico", emoji:"🎓", color:"#D97706",
    theme:"Escrita Acadêmica, Argumentação e Ensino Superior",
    stats:{ words:"~25 novas HSK 4", grammar:"所谓 · 可谓 · 堪称/被誉为", chars:"+25 novos" },
    vocab:[
      {h:"论文",py:"lùnwén",pt:"dissertação/artigo acadêmico"},
      {h:"课题",py:"kètí",pt:"tema/tópico de pesquisa"},
      {h:"文献",py:"wénxiàn",pt:"literatura/documentação"},
      {h:"引用",py:"yǐnyòng",pt:"citação/citar"},
      {h:"学科",py:"xuékē",pt:"disciplina acadêmica"},
      {h:"专业",py:"zhuānyè",pt:"especialidade/curso"},
      {h:"研究生",py:"yánjiūshēng",pt:"pós-graduando"},
      {h:"博士",py:"bóshì",pt:"doutor/PhD"},
      {h:"导师",py:"dǎoshī",pt:"orientador/mentor"},
      {h:"答辩",py:"dábìan",pt:"defesa (de dissertação)"},
      {h:"学位",py:"xuéwèi",pt:"grau acadêmico"},
      {h:"学术界",py:"xuéshùjiè",pt:"mundo acadêmico"},
      {h:"同行评审",py:"tóngháng píngshěn",pt:"revisão por pares"},
      {h:"学术诚信",py:"xuéshù chéngxìn",pt:"integridade acadêmica"},
      {h:"剽窃",py:"piāoqiè",pt:"plágio"},
      {h:"摘要",py:"zhāiyào",pt:"resumo/abstract"},
      {h:"参考文献",py:"cānkǎo wénxiàn",pt:"referências bibliográficas"},
      {h:"论点",py:"lùndiǎn",pt:"argumento/tese"},
      {h:"论据",py:"lùnjù",pt:"evidência/fundamentação"},
      {h:"反驳",py:"fǎnbó",pt:"refutar/contradizer"},
      {h:"综合分析",py:"zōnghé fēnxī",pt:"análise integrada"},
      {h:"批判性阅读",py:"pīpàn xìng yuèdú",pt:"leitura crítica"},
      {h:"知识体系",py:"zhīshi tǐxì",pt:"corpo de conhecimento"},
      {h:"核心论点",py:"héxīn lùndiǎn",pt:"argumento central/tese principal"},
      {h:"实证依据",py:"shízhèng yījù",pt:"evidência empírica"},
    ],
    grammar:[
      { struct:"所谓 + 概念/词语，(就)是指...", label:"O Chamado / A Chamada (Definição Formal)", color:"#D97706",
        exp:"所谓 = o chamado / o assim chamado / o que se chama de. Introduz definição formal ou esclarece um conceito técnico. 所谓X，是指/就是Y(o que se chama X é Y).",
        exs:[{cn:"所谓批判性思维，是指对信息进行系统性评估和分析的能力。",py:"Suǒwèi pīpàn xìng sīwéi, shì zhǐ duì xìnxī jìnxíng xìtǒng xìng pínggū hé fēnxī de nénglì.",pt:"O chamado pensamento crítico refere-se à capacidade de avaliação e análise sistemática de informações."},{cn:"所谓学术诚信，就是在研究过程中遵守诚实和道德准则。",py:"Suǒwèi xuéshù chéngxìn, jiù shì zài yánjiū guòchéng zhōng zūnshǒu chéngshí hé dàodé zhǔnzé.",pt:"A chamada integridade acadêmica é a observância de normas de honestidade e ética no processo de pesquisa."}] },
      { struct:"可谓 + 高度评价/概isa adequada", label:"Pode-se Dizer que é / Pode-se Afirmar", color:"#6366F1",
        exp:"可谓 = pode-se dizer que é / pode-se afirmar que X é Y. Tom de avaliação enfática ou elogiosa. 可谓是...了(pode-se mesmo dizer que é...). Literário e formal.",
        exs:[{cn:"这篇论文的论证严密，逻辑清晰，可谓是本领域的代表性研究。",py:"Zhè piān lùnwén de lùnzhèng yánmì, luójí qīngxī, kě wèi shì běn lǐngyù de dàibiǎo xìng yánjiū.",pt:"Esta dissertação tem argumentação rigorosa e lógica clara — pode-se dizer que é um estudo representativo do campo."},{cn:"他对文献的梳理工作可谓一丝不苟，值得称赞。",py:"Tā duì wénxiàn de shūlǐ gōngzuò kě wèi yīsī bùgǒu, zhídé chēngzàn.",pt:"O trabalho de organização bibliográfica que ele fez pode-se dizer que foi meticuloso — digno de reconhecimento."}] },
      { struct:"堪称/被誉为 + 最高评价", label:"Ser Considerado o Melhor / Ser Aclamado Como", color:"#DC2626",
        exp:"堪称 = ser digno de ser chamado de / ser considerado. 被誉为 = ser aclamado/reconhecido como. Ambas indicam avaliação superlativa. 堪称是+sujeito+最/第一...",
        exs:[{cn:"这位学者的研究成果堪称学界里程碑式的贡献。",py:"Zhè wèi xuézhě de yánjiū chéngguǒ kān chēng xuéjiè lǐchéngbēi shì de gòngxiàn.",pt:"Os resultados de pesquisa deste acadêmico são dignos de ser considerados uma contribuição de marco para a área."},{cn:"该大学的博士培养项目被誉为全球最优质的项目之一。",py:"Gāi dàxué de bóshì péiyǎng xiàngmù bèi yù wéi quánqiú zuì yōuzhì de xiàngmù zhī yī.",pt:"O programa de formação de doutores desta universidade é aclamado como um dos de maior qualidade do mundo."}] },
    ],
    dialogue:[
      {sp:"A",cn:"你的论文答辩什么时候？核心论点是什么？",py:"Nǐ de lùnwén dábìan shénme shíhou? Héxīn lùndiǎn shì shénme?",pt:"Quando é a defesa da sua dissertação? Qual é o argumento central?"},
      {sp:"B",cn:"下周五。所谓我的核心论点，是指在批判性阅读的基础上，学生的学术诚信素养会显著提高。",py:"Xià zhōu wǔ. Suǒwèi wǒ de héxīn lùndiǎn, shì zhǐ zài pīpàn xìng yuèdú de jīchǔ shàng, xuésheng de xuéshù chéngxìn sùyǎng huì xiǎnzhù tígāo.",pt:"Na sexta-feira da próxima semana. O meu argumento central é: com base na leitura crítica, as competências de integridade acadêmica dos estudantes melhoram significativamente."},
      {sp:"A",cn:"你的实证依据充分吗？同行评审有什么反馈？",py:"Nǐ de shízhèng yījù chōngfèn ma? Tóngháng píngshěn yǒu shénme fǎnkuì?",pt:"Você tem evidências empíricas suficientes? O que a revisão por pares comentou?"},
      {sp:"B",cn:"评审认为本研究可谓是该领域的重要参考。导师说，在现有文献基础上，我的研究填补了实证空白，堪称一项有价值的贡献。",py:"Píngshen rènwéi běn yánjiū kě wèi shì gāi lǐngyù de zhòngyào cānkǎo.",pt:"Os revisores consideram que esta pesquisa pode-se dizer que é uma referência importante na área. Meu orientador disse que, com base na literatura existente, preenche uma lacuna empírica — digno de ser considerado uma contribuição valiosa."},
    ],
    quiz:[
      {q:"所谓 é usado para:",opts:["criticar algo","introduzir definição formal de um conceito","expressar dúvida","indicar contraste"],ans:1,exp:"✅ 所谓 = o chamado / o que se chama de. Introduz definição técnica ou esclarecimento de conceito. 所谓X，是指Y = 'o que chamamos de X é Y'. Tom formal e analítico."},
      {q:"可谓 indica:",opts:["incerteza/talvez","avaliação enfática/elogiosa (pode-se dizer que é)","obrigação","concessão"],ans:1,exp:"✅ 可谓 = pode-se dizer que é (avaliação ênfaticamente positiva). Tom literário e formal de reconhecimento ou caracterização. 可谓是...=pode-se mesmo afirmar que é..."},
      {q:"堪称 vs 被誉为:",opts:["sinônimos","堪称=digno de ser chamado(ativo); 被誉为=aclamado/reconhecido como(passivo)","堪称=negativo; 被誉为=positivo","堪称=formal; 被誉为=informal"],ans:1,exp:"✅ 堪称=digno de ser chamado de (ativo - o sujeito MERECE ser chamado assim). 被誉为=ser aclamado/reconhecido como (passivo - outros assim o chamam). Ambas são altamente elogiosas!"},
      {q:"同行评审 (tóngháng píngshěn) é:",opts:["palestra acadêmica","revisão por pares (peer review)","orientação de dissertação","comitê de aprovação"],ans:1,exp:"✅ 同行评审 = revisão por pares (peer review). 同行=pares/colegas da mesma área + 评审=avaliação/revisão. Processo fundamental da publicação científica para garantir qualidade."},
      {q:"剽窃 (piāoqiè) significa:",opts:["publicação","plágio","citação","referência"],ans:1,exp:"✅ 剽窃 = plágio. 剽=saquear/roubar + 窃=roubar. Apresentar o trabalho intelectual de outrem como próprio. Viola a 学术诚信(integridade acadêmica) e é punível!"},
    ] },

  { w:10, phase:"Retórica", emoji:"🗣️", color:"#7C3AED",
    theme:"Argumentação Formal, Retórica e Pensamento Avançado",
    stats:{ words:"~25 novas HSK 4", grammar:"不仅...甚至/乃至 · 固然...但是 · 诚然...然而", chars:"+25 novos" },
    vocab:[
      {h:"论述",py:"lùnshù",pt:"dissertação/expor argumentação"},
      {h:"阐述",py:"chǎnshù",pt:"explicar/expor detalhadamente"},
      {h:"阐明",py:"chǎnmíng",pt:"esclarecer/tornar claro"},
      {h:"论及",py:"lùnjí",pt:"abordar/tratar de (tema)"},
      {h:"指出",py:"zhǐchū",pt:"apontar/indicar"},
      {h:"强调",py:"qiángdiào",pt:"enfatizar/destacar"},
      {h:"归纳",py:"guīnà",pt:"sintetizar/induzir"},
      {h:"演绎",py:"yǎnyì",pt:"deduzir/desenvolver"},
      {h:"辩论",py:"biànlùn",pt:"debater/debate"},
      {h:"反驳",py:"fǎnbó",pt:"refutar/contradizer"},
      {h:"佐证",py:"zuǒzhèng",pt:"corroborar/evidência suplementar"},
      {h:"例证",py:"lìzhèng",pt:"exemplificação/caso ilustrativo"},
      {h:"权衡",py:"quánhéng",pt:"ponderar/sopesar"},
      {h:"取舍",py:"qǔshě",pt:"escolher entre opções/trade-off"},
      {h:"立论",py:"lìlùn",pt:"estabelecer tese/argumentar"},
      {h:"驳论",py:"bólùn",pt:"refutar tese oposta"},
      {h:"让步",py:"ràngbù",pt:"concessão argumentativa"},
      {h:"修辞",py:"xiūcí",pt:"retórica"},
      {h:"类比",py:"lèibǐ",pt:"analogia"},
      {h:"隐喻",py:"yǐnyù",pt:"metáfora"},
      {h:"悖论",py:"bèilùn",pt:"paradoxo"},
      {h:"逻辑谬误",py:"luójí miùwù",pt:"falácia lógica"},
      {h:"论证力度",py:"lùnzhèng lìdù",pt:"força argumentativa"},
      {h:"批判性",py:"pīpàn xìng",pt:"caráter crítico"},
      {h:"辩证",py:"biànzhèng",pt:"dialético"},
    ],
    grammar:[
      { struct:"不仅...而且...甚至/乃至...", label:"Não Apenas...Mas...Até Mesmo (Progressão Máxima)", color:"#7C3AED",
        exp:"Progressão tripartida de intensidade crescente: 不仅(não só)A → 而且(mas também)B → 甚至/乃至(até mesmo)C. C é o ponto mais extremo ou surpreendente. 乃至 é ainda mais formal que 甚至.",
        exs:[{cn:"这种逻辑谬误不仅影响辩论质量，而且损害学术公信力，乃至引发对整个领域的质疑。",py:"Zhè zhǒng luójí miùwù bùjǐn yǐngxiǎng biànlùn zhìliàng, érqiě sǔnhài xuéshù gōngxìnlì, nǎizhì yǐnfā duì zhěnggè lǐngyù de zhíyí.",pt:"Esta falácia lógica não só afeta a qualidade do debate, mas também prejudica a credibilidade acadêmica, chegando até a gerar questionamentos sobre todo o campo."},{cn:"有力的论证不仅需要清晰的论点，而且需要充足的佐证，甚至需要对反驳意见的有效回应。",py:"Yǒulì de lùnzhèng bùjǐn xūyào qīngxī de lùndiǎn, érqiě xūyào chōngzú de zuǒzhèng, shènzhì xūyào duì fǎnbó yìjiàn de yǒuxiào huíyìng.",pt:"Uma argumentação eficaz não só precisa de pontos claros, mas também de evidências suficientes, e até mesmo de respostas efetivas às refutações."}] },
      { struct:"固然 + A (concessão)，但是/然而 + B (posição real)", label:"Embora Reconheçamos A / É Verdade que A, Mas B", color:"#D97706",
        exp:"固然 = é verdade que / embora reconheçamos que. Concessão mais formal e sofisticada que 虽然. 固然A,但是B = é verdade que A, mas B (B é o ponto mais importante do argumento).",
        exs:[{cn:"固然修辞手法能增强文章的感染力，但是逻辑论证才是学术写作的根基。",py:"Gùrán xiūcí shǒufǎ néng zēngqiáng wénzhāng de gǎnrǎnlì, dànshì luójí lùnzhèng cái shì xuéshù xiězuò de gēnjī.",pt:"Embora reconheçamos que recursos retóricos podem fortalecer o impacto do texto, a argumentação lógica é a base da escrita acadêmica."},{cn:"固然批评现有观点容易，但是提出具有建设性的替代方案才更有价值。",py:"Gùrán pīpíng xiànyǒu guāndiǎn róngyì, dànshì tíchū jùyǒu jiànshè xìng de tìdài fāng'àn cái gèng yǒu jiàzhí.",pt:"Embora seja fácil criticar as posições existentes, propor alternativas construtivas é muito mais valioso."}] },
      { struct:"诚然 + A (concessão)，然而/但 + B (contra-argumento)", label:"Certamente A é Verdade, Contudo B (Sofisticado)", color:"#059669",
        exp:"诚然 = certamente é verdade que / é inegável que. Concessão mais elegante e formal que 固然 ou 虽然. Indica que o autor reconhece generosamente o ponto antes de apresentar sua posição contrária.",
        exs:[{cn:"诚然，类比是一种有效的论证工具，然而过度使用隐喻可能导致论述的精确性下降。",py:"Chéngrán, lèibǐ shì yī zhǒng yǒuxiào de lùnzhèng gōngjù, rán'ér guòdù shǐyòng yǐnyù kěnéng dǎozhì lùnshù de jīngquè xìng xiàjiàng.",pt:"Certamente a analogia é uma ferramenta argumentativa eficaz; contudo, o uso excessivo de metáforas pode reduzir a precisão da argumentação."},{cn:"诚然争取让步是辩论的策略，然而核心论点的坚守才是最终的目标。",py:"Chéngrán zhēngqǔ ràngbù shì biànlùn de cèlüè, rán'ér héxīn lùndiǎn de jiānshǒu cái shì zuìzhōng de mùbiāo.",pt:"Certamente buscar concessões é uma estratégia no debate; contudo, defender o argumento central é o objetivo final."}] },
    ],
    dialogue:[
      {sp:"A",cn:"你认为辩论中的让步策略有什么风险？",py:"Nǐ rènwéi biànlùn zhōng de ràngbù cèlüè yǒu shénme fēngxiǎn?",pt:"Que riscos você vê na estratégia de concessão no debate?"},
      {sp:"B",cn:"诚然，适当让步能显示开放思维，然而过多让步不仅削弱自身论点，甚至可能导致立论根基动摇。",py:"Chéngrán, shìdàng ràngbù néng xiǎnshì kāifàng sīwéi, rán'ér guò duō ràngbù bùjǐn xuēruò zìshēn lùndiǎn, shènzhì kěnéng dǎozhì lìlùn gēnjī dòngyáo.",pt:"Certamente concessões moderadas demonstram abertura intelectual; contudo, concessões excessivas não só enfraquecem o próprio argumento, mas podem até abalar a fundação da tese."},
      {sp:"A",cn:"固然反驳对手很重要，但是佐证自己的核心论点才更关键，对吗？",py:"Gùrán fǎnbó duìshǒu hěn zhòngyào, dànshì zuǒzhèng zìjǐ de héxīn lùndiǎn cái gèng guānjiàn, duì ma?",pt:"Embora refutar o adversário seja importante, é ainda mais essencial corroborar o próprio argumento central, certo?"},
      {sp:"B",cn:"正是！所谓论证力度，无非是论点、论据、论证三者的有机统一。一篇优秀的论述可谓是逻辑与修辞的完美结合。",py:"Zhèng shì! Suǒwèi lùnzhèng lìdù, wúfēi shì lùndiǎn, lùnjù, lùnzhèng sān zhě de yǒujī tǒngyī.",pt:"Exatamente! A chamada força argumentativa não é nada mais que a unidade orgânica de tese, evidências e argumentação. Uma dissertação excelente pode-se dizer que é a combinação perfeita de lógica e retórica."},
    ],
    quiz:[
      {q:"A estrutura 不仅...而且...甚至 progride em:",opts:["intensidade decrescente","ordem aleatória","intensidade crescente (cada elemento mais extremo)","alternância"],ans:2,exp:"✅ 不仅(não só)A → 而且(mas também)B → 甚至(até mesmo)C. Progressão CRESCENTE: C é ainda mais extremo que B, que já é mais que A. 乃至 é ainda mais formal e extremo que 甚至!"},
      {q:"固然 vs 诚然— qual a diferença?",opts:["sinônimos perfeitos","固然=embora reconheçamos(neutro); 诚然=certamente é verdade(mais elegante, generoso)","固然=formal; 诚然=informal","固然=escrita; 诚然=fala"],ans:1,exp:"✅ Ambos são formas sofisticadas de concessão, mais formais que 虽然. 诚然 é ligeiramente mais elegante e generoso — reconhece claramente o ponto do oponente antes de contra-argumentar. 固然 é mais neutro."},
      {q:"悖论 (bèilùn) significa:",opts:["argumento central","falácia lógica","paradoxo","analogia"],ans:2,exp:"✅ 悖论 = paradoxo. 悖=contraditório + 论=afirmação. Uma afirmação que contradiz a si mesma ou leva a conclusão contraditória. Ex: 'Este enunciado é falso' = 说谎者悖论(paradoxo do mentiroso)!"},
      {q:"逻辑谬误 (luójí miùwù) é:",opts:["argumento válido","falácia lógica/erro de raciocínio","retórica","paradoxo"],ans:1,exp:"✅ 逻辑谬误 = falácia lógica. 逻辑=lógica + 谬误=erro/equívoco. Um erro no raciocínio que invalida um argumento. Tipos: ad hominem, strawman(稻草人谬误), slippery slope(滑坡谬误), etc."},
      {q:"类比 (lèibǐ) é uma figura retórica que:",opts:["contradiz","compara dois elementos para explicar um a partir do outro (analogia)","exagera","questiona"],ans:1,exp:"✅ 类比 = analogia. 类=similar/categoria + 比=comparar. Comparar algo desconhecido com algo conhecido para facilitar a compreensão. 'A vida é como uma viagem' = analogia clássica!"},
    ] },

  { w:11, phase:"Revisão", emoji:"🔍", color:"#374151",
    theme:"Revisão Intensiva — Gramática e Vocabulário Formal HSK 4",
    stats:{ words:"Consolidação HSK 4", grammar:"Grande revisão de todos os padrões formais", chars:"Consolidação total" },
    vocab:[
      {h:"总体而言",py:"zǒngtǐ ér yán",pt:"em linhas gerais/no geral"},
      {h:"具体来说",py:"jùtǐ lái shuō",pt:"especificamente falando"},
      {h:"综合分析",py:"zōnghé fēnxī",pt:"análise integrada"},
      {h:"深入研究",py:"shēnrù yánjiū",pt:"pesquisa aprofundada"},
      {h:"客观评估",py:"kèguān pínggū",pt:"avaliação objetiva"},
      {h:"合理预期",py:"hélǐ yùqī",pt:"expectativa razoável"},
      {h:"有效措施",py:"yǒuxiào cuòshī",pt:"medidas efetivas"},
      {h:"关键因素",py:"guānjiàn yīnsù",pt:"fator-chave"},
      {h:"重要前提",py:"zhòngyào qiántí",pt:"premissa importante"},
      {h:"本质区别",py:"běnzhì qūbié",pt:"diferença essencial"},
      {h:"内在逻辑",py:"nèizài luójí",pt:"lógica intrínseca"},
      {h:"外在表现",py:"wàizài biǎoxiàn",pt:"manifestação externa"},
      {h:"核心问题",py:"héxīn wèntí",pt:"problema central"},
      {h:"根本原因",py:"gēnběn yuányīn",pt:"causa fundamental"},
      {h:"深远影响",py:"shēnyuǎn yǐngxiǎng",pt:"impacto profundo/duradouro"},
      {h:"系统分析",py:"xìtǒng fēnxī",pt:"análise sistêmica"},
      {h:"批判反思",py:"pīpàn fǎnsī",pt:"reflexão crítica"},
      {h:"理性判断",py:"lǐxìng pànduàn",pt:"julgamento racional"},
      {h:"客观标准",py:"kèguān biāozhǔn",pt:"critério objetivo"},
      {h:"整体视角",py:"zhěngtǐ shìjiǎo",pt:"perspectiva holística"},
      {h:"动态变化",py:"dòngtài biànhuà",pt:"mudança dinâmica"},
      {h:"复杂性",py:"fùzá xìng",pt:"complexidade"},
      {h:"相互作用",py:"xiānghù zuòyòng",pt:"interação mútua"},
      {h:"协同效应",py:"xiétóng xiàoyìng",pt:"efeito sinérgico"},
      {h:"价值取向",py:"jiàzhí qǔxiàng",pt:"orientação de valores"},
    ],
    grammar:[
      { struct:"HSK 4 大总结 — Conectivos Formais", label:"Revisão: Conectivos Formais HSK 4", color:"#374151",
        exp:"使得(causativo formal) · 从...来看(perspectiva) · 在...基础上(com base em) · 据...报道(segundo) · 以...为例(tomando como exemplo) · 就...而言(no que tange a) · 无非是(nada mais que) · 倒(ao contrário) · 即便...也(mesmo que) · 何况(quanto mais) · 毕竟(afinal de contas) · 随之(na sequência) · 进而(e ainda mais) · 从而(dessa forma) · 所谓(o chamado) · 可谓(pode-se dizer) · 固然...但是(embora... mas) · 诚然...然而(certamente... contudo)",
        exs:[{cn:"固然社会变革充满挑战，然而毕竟是历史进步的必然趋势。",py:"Gùrán shèhuì biàngé chōngmǎn tiǎozhàn, rán'ér bìjìng shì lìshǐ jìnbù de bìrán qūshì.",pt:"Embora a transformação social seja repleta de desafios, afinal de contas é a tendência inevitável do progresso histórico."},{cn:"",py:"",pt:""}] },
      { struct:"Revisão: Estruturas de Análise Formal", label:"Análise, Evidência e Argumentação", color:"#6366F1",
        exp:"从...角度/层面/方面来看 · 在...基础上 · 实验/数据表明 · 经...证实 · 在...领域取得突破 · 有关...的 · 据媒体报道 · 引发广泛关注 · 所谓...是指 · 可谓是 · 堪称/被誉为 · 不仅...甚至/乃至 · 诚然...然而",
        exs:[{cn:"从跨学科的角度来看，所谓'协同效应'，是指不同领域的相互作用使得整体效果大于各部分之和。",py:"Cóng kuà xuékē de jiǎodù lái kàn, suǒwèi 'xiétóng xiàoyìng', shì zhǐ bùtóng lǐngyù de xiānghù zuòyòng shǐdé zhěngtǐ xiàoguǒ dàyú gè bùfèn zhī hé.",pt:"Do ponto de vista interdisciplinar, o chamado 'efeito sinérgico' refere-se ao fato de que a interação entre diferentes campos faz com que o efeito total seja maior que a soma das partes."},{cn:"",py:"",pt:""}] },
      { struct:"Os 10 Erros Mais Comuns no HSK 4", label:"Erros a Evitar", color:"#DC2626",
        exp:"① 使得+adj.负 不自然 → 使得+情况+变化 ✅ · ② 固然 vs 虽然 (固然 mais formal/literário!) · ③ 进而 ≠ 从而(进而=aprofunda; 从而=decorre) · ④ 据报道 não é opinião pessoal · ⑤ 何况 precisa de base comparativa · ⑥ 毕竟 não é 最终(final) · ⑦ 所谓 não é pejorativo por si só · ⑧ 无非是 relativiza, não nega · ⑨ 诚然 → 然而 (par obrigatório) · ⑩ 乃至 é mais extremo que 甚至",
        exs:[{cn:"✅ 诚然有其复杂性，然而从系统分析的角度来看，核心逻辑是清晰的。",py:"Chéngrán yǒu qí fùzá xìng, rán'ér cóng xìtǒng fēnxī de jiǎodù lái kàn, héxīn luójí shì qīngxī de.",pt:"Certamente tem sua complexidade; contudo, do ponto de vista da análise sistêmica, a lógica central é clara."},{cn:"",py:"",pt:""}] },
    ],
    dialogue:[
      {sp:"A",cn:"你对HSK四级考试有什么策略？",py:"Nǐ duì HSK sì jí kǎoshì yǒu shénme cèlüè?",pt:"Qual é a sua estratégia para o HSK 4?"},
      {sp:"B",cn:"从写作层面来看，掌握固然/诚然...然而这类让步结构是关键，毕竟HSK四级写作要求论证严密。",py:"Cóng xiězuò céngmiàn lái kàn, zhǎngwò gùrán/chéngrán...rán'ér zhè lèi ràngbù jiégòu shì guānjiàn.",pt:"Do ponto de vista da escrita, dominar estruturas de concessão como 固然/诚然...然而 é fundamental — afinal de contas, a redação do HSK 4 exige argumentação rigorosa."},
      {sp:"A",cn:"阅读部分呢？有关正式文本的理解有什么技巧？",py:"Yuèdú bùfen ne? Yǒuguān zhèngshì wénběn de lǐjiě yǒu shénme jìqiǎo?",pt:"E a parte de leitura? Qual técnica para compreender textos formais?"},
      {sp:"B",cn:"所谓正式文本阅读的核心技巧，无非是识别论点结构和关键连词。不仅要理解字面意思，而且要把握逻辑关系，乃至理解作者的修辞策略。",py:"Suǒwèi zhèngshì wénběn yuèdú de héxīn jìqiǎo, wúfēi shì shíbié lùndiǎn jiégòu hé guānjiàn liáncí.",pt:"A chamada técnica central para leitura de texto formal nada mais é que identificar a estrutura argumentativa e os conectivos-chave. Não só entender o sentido literal, mas também compreender as relações lógicas — até mesmo a estratégia retórica do autor."},
    ],
    quiz:[
      {q:"Qual conectivo é tipicamente MAIS FORMAL entre as opções?",opts:["但是","虽然","诚然...然而","如果...就"],ans:2,exp:"✅ 诚然...然而 é o par de concessão MAIS FORMAL e literário. 但是(mas) e 虽然(embora) são mais comuns. Hierarquia: 但是<虽然...但是<固然...但是<诚然...然而 (crescente formalidade)."},
      {q:"'进而' vs '从而' — qual a diferença principal?",opts:["sinônimos","进而=aprofunda/avança para consequência mais profunda; 从而=resultado/objetivo que decorre","进而=formal; 从而=informal","进而=negativo; 从而=positivo"],ans:1,exp:"✅ 进而=e ainda mais / aprofundando (progressão para nível mais profundo). 从而=dessa forma/consequentemente (resultado que decorre). A→进而B: B é desdobramento mais sério. A→从而B: B é resultado ou propósito de A."},
      {q:"Qual estrutura é usada para CITAR FONTE formal?",opts:["固然...","所谓...","据...报道/来看","无非是..."],ans:2,exp:"✅ 据+fonte+报道/来看 = segundo X / de acordo com X (citação de fonte). 据报道, 据悉, 据统计, 据专家分析 — estruturas de atribuição a fontes."},
      {q:"'使得' é diferente de '让' porque:",opts:["são sinônimos","使得 é mais formal e enfatiza transformação de resultado; 让 é cotidiano","使得 indica permissão; 让 indica resultado","使得 é para pessoas; 让 é para coisas"],ans:1,exp:"✅ 使得 é FORMAL/LITERÁRIO e enfatiza fortemente o resultado transformador. 让 é cotidiano. Em HSK 4+, use 使得 em redações formais; 让 em diálogos e escrita casual."},
      {q:"何况 é usado após:",opts:["contradição","exemplo mais fraco (para apresentar caso ainda mais extremo)","citação de fonte","definição de conceito"],ans:1,exp:"✅ 何况 vem após caso já difícil para apresentar caso AINDA MAIS difícil. 'Se A já é assim, quanto mais B'. B representa o caso mais extremo na progressão argumentativa."},
    ] },

  { w:12, phase:"Simulado", emoji:"🏆", color:"#059669",
    theme:"Simulado Final HSK 4 + Estratégias Avançadas de Prova",
    stats:{ words:"Vocabulário de exame avançado", grammar:"Estratégias HSK 4", chars:"Simulado final" },
    vocab:[
      {h:"值得深思",py:"zhídé shēnsī",pt:"digno de reflexão profunda"},
      {h:"不容忽视",py:"bùróng hūshì",pt:"não pode ser ignorado"},
      {h:"至关重要",py:"zhì guān zhòngyào",pt:"de suma importância"},
      {h:"毋庸置疑",py:"wú yōng zhìyí",pt:"indubitavelmente"},
      {h:"首当其冲",py:"shǒu dāng qí chōng",pt:"ser o primeiro a ser afetado"},
      {h:"举足轻重",py:"jǔ zú qīng zhòng",pt:"de peso/importância decisiva"},
      {h:"与此同时",py:"yǔ cǐ tóngshí",pt:"ao mesmo tempo/simultaneamente"},
      {h:"反之亦然",py:"fǎn zhī yì rán",pt:"o contrário também é verdadeiro"},
      {h:"有据可查",py:"yǒu jù kě chá",pt:"verificável/com evidências consultáveis"},
      {h:"适得其反",py:"shì dé qí fǎn",pt:"produzir efeito contrário"},
      {h:"循序渐进",py:"xún xù jiàn jìn",pt:"gradual e progressivo"},
      {h:"触类旁通",py:"chù lèi páng tōng",pt:"compreender por analogia"},
      {h:"融会贯通",py:"róng huì guàn tōng",pt:"integrar e dominar completamente"},
      {h:"相辅相成",py:"xiāng fǔ xiāng chéng",pt:"complementar-se mutuamente"},
      {h:"层出不穷",py:"céng chū bù qióng",pt:"surgir continuamente"},
      {h:"因势利导",py:"yīn shì lì dǎo",pt:"aproveitar o momento/guiar conforme a situação"},
      {h:"与时俱进",py:"yǔ shí jù jìn",pt:"acompanhar a evolução dos tempos"},
      {h:"开拓创新",py:"kāituò chuàngxīn",pt:"explorar e inovar"},
      {h:"与众不同",py:"yǔ zhòng bù tóng",pt:"diferente dos demais/único"},
      {h:"高瞻远瞩",py:"gāo zhān yuǎn zhǔ",pt:"visão panorâmica/pensar à frente"},
      {h:"客观公正",py:"kèguān gōngzhèng",pt:"objetivo e imparcial"},
      {h:"辩证统一",py:"biànzhèng tǒngyī",pt:"unidade dialética"},
      {h:"有的放矢",py:"yǒu de fàng shǐ",pt:"ação direcionada/focada no alvo"},
      {h:"实事求是",py:"shí shì qiú shì",pt:"buscar a verdade dos fatos"},
      {h:"与日俱增",py:"yǔ rì jù zēng",pt:"crescer dia a dia"},
    ],
    grammar:[
      { struct:"HSK 4 Listening — Estratégias", label:"Seção de Áudio HSK 4", color:"#059669",
        exp:"HSK 4 Listening: 45 questões, textos mais longos. ① Pré-leitura das opções é essencial. ② Atenção aos conectivos: 固然/诚然(concessão)→posição real vem depois. ③ 倒/反而=resultado inesperado. ④ Questões de atitude: 说话人认为...? — busque tom e marcadores avaliativos. ⑤ Velocidade é maior que HSK 3 — treine com materiais autênticos.",
        exs:[{cn:"说话人对这种做法的态度如何？",py:"Shuōhuàrén duì zhè zhǒng zuòfǎ de tàidu rúhé?",pt:"Qual é a atitude do falante em relação a esta abordagem? (pergunta típica de listening HSK 4)"},{cn:"",py:"",pt:""}] },
      { struct:"HSK 4 Reading & Writing — Estratégias", label:"Leitura e Escrita HSK 4", color:"#6366F1",
        exp:"Reading(35Q): ① Textos longos — leia primeiro as perguntas, depois o texto. ② Inferência semântica: identifique conectivos formais para mapear estrutura. ③ Busque a 中心论点(tese central). Writing: ① Use estrutura padrão: 引入话题→论述→结论. ② Conectivos obrigatórios: 固然/诚然...然而, 不仅...甚至. ③ Evite repetição excessiva do mesmo conector.",
        exs:[{cn:"综合以上分析，可以得出结论：...",py:"Zōnghé yǐshàng fēnxī, kěyǐ dé chū jiélùn...",pt:"Integrando as análises acima, pode-se chegar à conclusão que... (frase de fechamento padrão)"},{cn:"",py:"",pt:""}] },
      { struct:"Os 5 Padrões de Escrita Mais Testados", label:"Padrões HSK 4 na Prova de Escrita", color:"#D97706",
        exp:"① 诚然...然而(concessão sofisticada). ② 从...角度来看...使得...(perspectiva + resultado). ③ 据...数据表明，不仅...而且...甚至(evidência + progressão). ④ 所谓X，是指Y；无非是...(definição + relativização). ⑤ 在...基础上，随之...进而...从而(fundação + cadeia causal).",
        exs:[{cn:"诚然科技发展带来便利，然而其对社会关系的影响不容忽视。据研究数据表明，在数字化基础上建立的关系网络，不仅改变了沟通方式，甚至重新定义了社区的概念。",py:"Chéngrán kējì fāzhǎn dài lái biànlì, rán'ér qí duì shèhuì guānxi de yǐngxiǎng bùróng hūshì.",pt:"Certamente o desenvolvimento tecnológico trouxe comodidade; contudo, seu impacto nas relações sociais não pode ser ignorado. Segundo dados de pesquisa, as redes de relacionamento construídas com base na digitalização não apenas transformaram os modos de comunicação, como redefiniu até o próprio conceito de comunidade."},{cn:"",py:"",pt:""}] },
    ],
    dialogue:[
      {sp:"A",cn:"HSK四级的写作要怎么组织结构？",py:"HSK sì jí de xiězuò yào zěnme zǔzhī jiégòu?",pt:"Como organizar a estrutura de redação no HSK 4?"},
      {sp:"B",cn:"诚然开头很重要，然而论证的层次感才是得分关键。所谓层次感，是指从表层现象到深层原因的递进分析。",py:"Chéngrán kāitóu hěn zhòngyào, rán'ér lùnzhèng de céng cì gǎn cái shì dé fēn guānjiàn.",pt:"Certamente a abertura é importante; contudo, a profundidade argumentativa é a chave da pontuação. A chamada profundidade é a análise progressiva desde o fenômeno superficial até as causas mais profundas."},
      {sp:"A",cn:"有什么固定的表达方式值得重点掌握？",py:"Yǒu shénme gùdìng de biǎodá fāngshì zhídé zhòngdiǎn zhǎngwò?",pt:"Há expressões fixas que vale especialmente dominar?"},
      {sp:"B",cn:"综合来看，不仅要掌握让步结构，而且要熟练运用据...表明、从...来看、在...基础上等分析框架，乃至整合使用这些结构，才能写出高分作文。实事求是地说，多写多练是唯一的捷径。",py:"Zōnghé lái kàn, bùjǐn yào zhǎngwò ràngbù jiégòu, érqiě yào shúliàn yùnyòng jù...biǎomíng, cóng...lái kàn, zài...jīchǔ shàng děng fēnxī kuàngjià, nǎizhì zhěnghé shǐyòng zhèxiē jiégòu.",pt:"Analisando integradamente, não só é preciso dominar estruturas de concessão, mas também usar fluentemente frameworks analíticos como 据...表明, 从...来看, 在...基础上 — e até integrar todos esses elementos — para escrever com alta pontuação. Sendo honesto, escrever e praticar muito é o único atalho."},
    ],
    quiz:[
      {q:"'适得其反' (shì dé qí fǎn) significa:",opts:["alcançar o objetivo","produzir exatamente o efeito contrário ao desejado","fazer gradualmente","ser imparcial"],ans:1,exp:"✅ 适得其反 = produzir efeito contrário (= backfire). 适=exatamente + 得=obter + 其=seu + 反=oposto. 'Obter exatamente o oposto do que se queria'. Expressão idiomática HSK 4!"},
      {q:"'毋庸置疑' (wú yōng zhìyí) equivale a:",opts:["talvez","indubitavelmente/sem dúvida alguma","provavelmente","segundo afirmado"],ans:1,exp:"✅ 毋庸置疑 = indubitavelmente. 毋庸=desnecessário + 置疑=questionar. 'Desnecessário questionar' = indubitável. Similar a 毫无疑问 mas mais literário. Muito usado em afirmações conclusivas."},
      {q:"'与时俱进' (yǔ shí jù jìn) significa:",opts:["ir devagar","resistir à mudança","acompanhar a evolução dos tempos","agir impulsivamente"],ans:2,exp:"✅ 与时俱进 = acompanhar a evolução dos tempos. 与=com + 时=tempo + 俱=juntos + 进=avançar. Avançar junto com o tempo. Expressão idiomática (成语) muito comum no discurso político e educacional chinês!"},
      {q:"Na estrutura de redação HSK 4, 诚然...然而 vem em qual momento?",opts:["na conclusão","no desenvolvimento como estrutura de concessão sofisticada","no título","nas referências"],ans:1,exp:"✅ 诚然...然而 é uma estrutura de CONCESSÃO usada no desenvolvimento da redação. Reconhece o ponto do lado oposto (诚然) antes de apresentar o contra-argumento principal (然而). Demonstra sofisticação argumentativa!"},
      {q:"'实事求是' (shí shì qiú shì) no contexto de estudo significa:",opts:["estudar vagarosamente","buscar a verdade dos fatos / ser pragmático e realista","estudar só teoria","ignorar a prática"],ans:1,exp:"✅ 实事求是 = buscar a verdade dos fatos / ser pragmático. 实事=fatos reais + 求=buscar + 是=verdade. Princípio fundamental do pensamento marxista chinês: partir dos fatos reais. No estudo: ser honesto sobre o próprio nível e praticar o que é necessário!"},
    ] },
];

export default function HSK4Completo() {
  const [week,     setWeek]   = useState(1);
  const [tab,      setTab]    = useState("vocab");
  const [showPy,   setShowPy] = useState(true);
  const [openG,    setOpenG]  = useState(0);
  const [dlPy,     setDlPy]   = useState(true);
  const [answers,  setAnswers]= useState({});
  const [revealed, setRevealed]=useState({});

  const w  = WEEKS[week-1];
  const dc = w.color;
  const correct  = Object.entries(answers).filter(([i,a])=>a===w.quiz[+i].ans).length;
  const answered = Object.keys(answers).length;
  const resetQuiz = ()=>{setAnswers({});setRevealed({});};

  return (
    <div style={{ fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", background:"#FAFAF8", minHeight:"100vh", paddingBottom:"48px" }}>
      <div style={{ background:"linear-gradient(135deg,#1e1b4b,#4338CA,#7C3AED)", color:"white", padding:"24px 20px 20px" }}>
        <div style={{ maxWidth:"900px", margin:"0 auto" }}>
          <div style={{ display:"flex", gap:"8px", marginBottom:"10px", flexWrap:"wrap" }}>
            <span style={{ background:"#7C3AED", borderRadius:"6px", padding:"3px 12px", fontSize:"12px", fontWeight:"700" }}>🇨🇳 Novo HSK 4 · Programa Completo</span>
            <span style={{ background:"rgba(255,255,255,0.12)", borderRadius:"6px", padding:"3px 12px", fontSize:"12px", fontWeight:"600" }}>12 Semanas · ~1.000 novas palavras · Registro Formal</span>
          </div>
          <h1 style={{ margin:"0 0 14px", fontSize:"clamp(18px,3.5vw,26px)", fontWeight:"900" }}>老师 · HSK 4 — Todas as 12 Semanas</h1>
          <div style={{ display:"flex", gap:"4px", overflowX:"auto", paddingBottom:"4px" }}>
            {WEEKS.map(wx=>(
              <button key={wx.w} onClick={()=>{setWeek(wx.w);setTab("vocab");resetQuiz();}}
                style={{ padding:"7px 12px", borderRadius:"10px", border:"2px solid", borderColor:week===wx.w?"white":"rgba(255,255,255,0.2)", background:week===wx.w?"white":"transparent", color:week===wx.w?"#1e1b4b":"rgba(255,255,255,0.8)", fontWeight:"800", fontSize:"11px", cursor:"pointer", whiteSpace:"nowrap", transition:"all 0.15s", flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center", gap:"2px" }}>
                <span style={{ fontSize:"14px" }}>{wx.emoji}</span>
                <span>S{wx.w}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth:"900px", margin:"0 auto", padding:"0 16px" }}>
        <div style={{ background:"white", borderRadius:"14px", padding:"14px 18px", margin:"14px 0 4px", border:"1px solid #E2E8F0", boxShadow:"0 2px 8px rgba(15,23,42,0.06)", borderLeft:`5px solid ${dc}` }}>
          <div style={{ display:"flex", alignItems:"flex-start", gap:"12px", flexWrap:"wrap" }}>
            <div style={{ width:"46px", height:"46px", borderRadius:"12px", background:dc, color:"white", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <span style={{ fontSize:"10px", fontWeight:"700", opacity:0.8 }}>SEM</span>
              <span style={{ fontSize:"20px", fontWeight:"900", lineHeight:1 }}>{w.w}</span>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", gap:"8px", alignItems:"center", marginBottom:"3px", flexWrap:"wrap" }}>
                <span style={{ fontWeight:"900", color:"#0F172A", fontSize:"15px" }}>{w.theme}</span>
                <span style={{ fontSize:"11px", fontWeight:"700", color:dc, background:`${dc}12`, padding:"2px 8px", borderRadius:"10px" }}>{w.phase}</span>
              </div>
              <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
                {[["📖",w.stats.words],["📐",w.stats.grammar],["✍️",w.stats.chars]].map(([e,v])=>(
                  <span key={v} style={{ fontSize:"11px", color:"#64748B" }}>{e} {v}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ display:"flex", gap:"6px", padding:"8px 0 4px", overflowX:"auto" }}>
          {[["vocab","📚 Vocab"],["grammar","📐 Gramática"],["dialogue","💬 Diálogo"],["quiz","✏️ Quiz"]].map(([id,lbl])=>(
            <button key={id} onClick={()=>setTab(id)} style={{ padding:"8px 16px", borderRadius:"9px", border:"2px solid", borderColor:tab===id?dc:"#E2E8F0", background:tab===id?dc:"white", color:tab===id?"white":"#64748B", fontWeight:"700", fontSize:"13px", cursor:"pointer", whiteSpace:"nowrap", transition:"all 0.15s", flexShrink:0 }}>{lbl}</button>
          ))}
        </div>
        {tab==="vocab"&&(
          <div style={{ paddingTop:"14px" }}>
            <div style={{ display:"flex", gap:"8px", marginBottom:"12px" }}>
              <button onClick={()=>setShowPy(v=>!v)} style={{ padding:"6px 12px", borderRadius:"8px", border:`2px solid ${showPy?"#D97706":"#E2E8F0"}`, background:showPy?"#FFFBEB":"white", color:showPy?"#92400E":"#64748B", fontWeight:"700", fontSize:"12px", cursor:"pointer" }}>{showPy?"🙈 Modo Desafio":"👁 Pinyin"}</button>
              <span style={{ fontSize:"12px", color:"#64748B", alignSelf:"center" }}>{w.vocab.length} palavras</span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(148px,1fr))", gap:"9px" }}>
              {w.vocab.map((wd,i)=>(
                <div key={i} style={{ background:"white", borderRadius:"11px", padding:"10px 8px", textAlign:"center", boxShadow:"0 2px 8px rgba(15,23,42,0.07)", border:"1px solid #E2E8F0", borderTop:`3px solid ${dc}` }}>
                  <div style={{ fontSize:"18px", fontWeight:"900", color:dc, fontFamily:"'Noto Sans SC','PingFang SC',sans-serif", marginBottom:"4px" }}>{wd.h}</div>
                  {showPy&&<div style={{ fontSize:"12px", fontWeight:"700", color:"#6366F1", marginBottom:"2px" }}>{wd.py}</div>}
                  <div style={{ fontSize:"11px", color:"#64748B", lineHeight:"1.4" }}>{wd.pt}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="grammar"&&(
          <div style={{ paddingTop:"14px" }}>
            {w.grammar.map((g,i)=>(
              <div key={i} style={{ background:"white", borderRadius:"14px", overflow:"hidden", boxShadow:"0 2px 12px rgba(15,23,42,0.07)", border:"1px solid #E2E8F0", marginBottom:"10px" }}>
                <button onClick={()=>setOpenG(openG===i?-1:i)} style={{ width:"100%", padding:"14px 18px", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:"12px", textAlign:"left" }}>
                  <div style={{ width:"4px", alignSelf:"stretch", borderRadius:"2px", background:g.color, flexShrink:0 }}/>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:"11px", fontWeight:"700", color:g.color, textTransform:"uppercase", letterSpacing:"1px", marginBottom:"2px" }}>{g.label}</div>
                    <div style={{ fontFamily:"monospace", fontWeight:"800", color:"#0F172A", fontSize:"13px", lineHeight:"1.4" }}>{g.struct}</div>
                  </div>
                  <span style={{ color:"#64748B", fontSize:"16px", transition:"transform 0.2s", transform:openG===i?"rotate(180deg)":"none" }}>▾</span>
                </button>
                {openG===i&&(
                  <div style={{ padding:"0 18px 16px", borderTop:"1px solid #E2E8F0" }}>
                    <div style={{ background:`${g.color}08`, border:`1px solid ${g.color}20`, borderRadius:"10px", padding:"12px 14px", margin:"10px 0", fontSize:"13px", color:"#334155", lineHeight:"1.7" }}>{g.exp}</div>
                    {g.exs.filter(e=>e.cn).map((ex,ei)=>(
                      <div key={ei} style={{ borderLeft:`3px solid ${g.color}`, paddingLeft:"12px", marginBottom:"10px" }}>
                        <div style={{ fontSize:"17px", fontWeight:"700", color:"#0F172A", fontFamily:"'Noto Sans SC',sans-serif", marginBottom:"3px" }}>{ex.cn}</div>
                        <div style={{ fontSize:"12px", color:"#6366F1", fontWeight:"600", marginBottom:"2px" }}>{ex.py}</div>
                        <div style={{ fontSize:"12px", color:"#64748B" }}>{ex.pt}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {tab==="dialogue"&&(
          <div style={{ paddingTop:"14px" }}>
            <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:"10px" }}>
              <button onClick={()=>setDlPy(v=>!v)} style={{ padding:"5px 10px", borderRadius:"7px", border:`2px solid ${dlPy?"#D97706":"#E2E8F0"}`, background:dlPy?"#FFFBEB":"white", color:dlPy?"#92400E":"#64748B", fontWeight:"700", fontSize:"12px", cursor:"pointer" }}>{dlPy?"🙈":"👁"} Pinyin</button>
            </div>
            <div style={{ background:"white", borderRadius:"14px", overflow:"hidden", boxShadow:"0 2px 12px rgba(15,23,42,0.07)", border:"1px solid #E2E8F0" }}>
              <div style={{ background:dc, color:"white", padding:"12px 16px" }}>
                <div style={{ fontWeight:"800", fontSize:"14px" }}>💬 Diálogo — Semana {w.w} · {w.emoji} {w.phase}</div>
              </div>
              {w.dialogue.map((line,i)=>{
                const isA=line.sp==="A";
                return (
                  <div key={i} style={{ display:"flex", flexDirection:isA?"row":"row-reverse", gap:"10px", padding:"12px 14px", borderBottom:i<w.dialogue.length-1?"1px solid #E2E8F0":"none", background:i%2===0?"white":"#FAFAF8", alignItems:"flex-start" }}>
                    <div style={{ width:"26px", height:"26px", borderRadius:"50%", background:isA?dc:"#94A3B8", color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"800", fontSize:"11px", flexShrink:0 }}>{line.sp}</div>
                    <div style={{ flex:1, textAlign:isA?"left":"right" }}>
                      <div style={{ fontSize:"16px", fontWeight:"700", color:"#0F172A", fontFamily:"'Noto Sans SC',sans-serif", marginBottom:"3px", lineHeight:"1.5" }}>{line.cn}</div>
                      {dlPy&&<div style={{ fontSize:"12px", color:"#6366F1", fontWeight:"600", marginBottom:"2px" }}>{line.py}</div>}
                      <div style={{ fontSize:"12px", color:"#64748B" }}>{line.pt}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {tab==="quiz"&&(
          <div style={{ paddingTop:"14px" }}>
            {answered===w.quiz.length&&(
              <div style={{ background:correct>=4?"#ECFDF5":"#FFFBEB", border:`2px solid ${correct>=4?"#059669":"#D97706"}`, borderRadius:"12px", padding:"16px", marginBottom:"14px", textAlign:"center" }}>
                <div style={{ fontSize:"30px", marginBottom:"6px" }}>{correct===5?"🏆":correct>=3?"🎉":"💪"}</div>
                <div style={{ fontWeight:"800", fontSize:"18px", color:correct>=4?"#065F46":"#92400E" }}>{correct}/5</div>
                <button onClick={resetQuiz} style={{ marginTop:"10px", padding:"6px 16px", borderRadius:"8px", background:"#0F172A", color:"white", border:"none", fontWeight:"700", fontSize:"12px", cursor:"pointer" }}>🔄 Tentar novamente</button>
              </div>
            )}
            {w.quiz.map((q,i)=>{
              const sel=answers[i],rev=revealed[i];
              return (
                <div key={i} style={{ background:"white", borderRadius:"12px", padding:"14px", border:"1px solid #E2E8F0", marginBottom:"10px", boxShadow:"0 2px 8px rgba(15,23,42,0.06)" }}>
                  <div style={{ display:"flex", gap:"8px", marginBottom:"10px" }}>
                    <div style={{ width:"22px", height:"22px", borderRadius:"6px", background:"#0F172A", color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"800", fontSize:"11px", flexShrink:0 }}>{i+1}</div>
                    <div style={{ fontSize:"13px", fontWeight:"700", color:"#0F172A", lineHeight:"1.5" }}>{q.q}</div>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:"6px", marginBottom:"10px" }}>
                    {q.opts.map((opt,j)=>{
                      const chosen=sel===j,right=j===q.ans;
                      let bg="white",bc="#E2E8F0",col="#374151";
                      if(chosen||rev){if(right){bg="#ECFDF5";bc="#059669";col="#065F46";}else if(chosen){bg="#FEF2F2";bc="#DC2626";col="#991B1B";}}
                      return <button key={j} onClick={()=>{if(sel===undefined){setAnswers(a=>({...a,[i]:j}));setRevealed(r=>({...r,[i]:true}));}}} style={{ padding:"8px 11px", borderRadius:"8px", border:`2px solid ${bc}`, background:bg, color:col, textAlign:"left", fontWeight:(chosen||(rev&&right))?"700":"500", fontSize:"12px", cursor:sel===undefined?"pointer":"default", display:"flex", alignItems:"center", gap:"8px", transition:"all 0.15s" }}>
                        <span style={{ width:"18px", height:"18px", borderRadius:"50%", border:`2px solid ${bc}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"10px", fontWeight:"800", flexShrink:0, background:(right&&rev)?"#059669":(chosen&&!right)?"#DC2626":"transparent", color:(right&&rev)||(chosen&&!right)?"white":col }}>
                          {rev?(right?"✓":chosen?"✗":String.fromCharCode(65+j)):String.fromCharCode(65+j)}
                        </span>{opt}
                      </button>;
                    })}
                  </div>
                  {rev&&<div style={{ background:sel===q.ans?"#ECFDF5":"#FFFBEB", border:`1px solid ${sel===q.ans?"#6EE7B7":"#FDE68A"}`, borderRadius:"8px", padding:"8px 10px", fontSize:"12px", color:sel===q.ans?"#065F46":"#92400E", lineHeight:"1.6" }}>{q.exp}</div>}
                </div>
              );
            })}
            {answered<w.quiz.length&&<div style={{ textAlign:"center", color:"#64748B", fontSize:"12px", padding:"6px" }}>{answered}/{w.quiz.length} respondidas</div>}
          </div>
        )}
        <div style={{ background:"white", border:"1px solid #E2E8F0", borderRadius:"12px", padding:"12px 16px", marginTop:"16px", display:"flex", justifyContent:"space-between", alignItems:"center", gap:"10px" }}>
          <button onClick={()=>{if(week>1){setWeek(w=>w-1);setTab("vocab");resetQuiz();}}} style={{ padding:"7px 14px", borderRadius:"9px", border:"2px solid #E2E8F0", background:"white", color:"#64748B", fontWeight:"700", fontSize:"12px", cursor:"pointer", opacity:week===1?0.3:1 }}>← Anterior</button>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:"13px", fontWeight:"800", color:"#0F172A" }}>Semana {week} / 12</div>
            <div style={{ fontSize:"11px", color:"#64748B" }}>{w.phase} · {w.emoji}</div>
          </div>
          <button onClick={()=>{if(week<12){setWeek(w=>w+1);setTab("vocab");resetQuiz();}}} style={{ padding:"7px 14px", borderRadius:"9px", border:`2px solid ${dc}`, background:dc, color:"white", fontWeight:"700", fontSize:"12px", cursor:"pointer", opacity:week===12?0.3:1 }}>Próxima →</button>
        </div>
        {week===12&&(
          <div style={{ background:"linear-gradient(135deg,#1e1b4b,#4338CA,#7C3AED)", color:"white", borderRadius:"14px", padding:"24px", marginTop:"14px", textAlign:"center" }}>
            <div style={{ fontSize:"40px", marginBottom:"10px" }}>🏆</div>
            <div style={{ fontWeight:"900", fontSize:"20px", marginBottom:"8px" }}>HSK 4 — 完成！Wánchéng!</div>
            <div style={{ opacity:0.8, fontSize:"14px", lineHeight:"1.8", marginBottom:"12px" }}>12 semanas · ~1.000 novas palavras · Registro formal avançado<br/>你的汉语越来越好了！Nǐ de Hànyǔ yuèláiyuè hǎo le!</div>
            <div style={{ fontSize:"20px", fontWeight:"900", color:"#FCD34D" }}>恭喜！继续向HSK 5迈进！💪</div>
          </div>
        )}
      </div>
    </div>
  );
}
