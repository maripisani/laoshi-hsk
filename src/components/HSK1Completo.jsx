import { useState } from "react";

const ink = "#0F172A"; const sand = "#FAFAF8"; const muted = "#64748B"; const bdr = "#E2E8F0";
const TC = ["#9CA3AF","#0891B2","#059669","#7C3AED","#DC2626"];

// ══════════════════════════════════════════════════════════════════════════════
// LAOSHI 老师 — HSK 1 PROGRAMA COMPLETO · Revisão Nov/2025
// 300 palavras · 12 semanas · 36 pontos gramaticais
// Fonte: GF0025-2021 / Atualização 2025-11 (vigência Jul/2026)
// ══════════════════════════════════════════════════════════════════════════════

const WEEKS = [
  {
    w:1, phase:"Início", emoji:"🎵", color:"#6366F1",
    theme:"Tons, Saudações e Números de 0 a 100",
    built:false, builtNote:"",
    stats:{words:"~20 novas (HSK 1)",newHSK2:"20",grammar:"声调 · 是 · 你好",chars:"+8 novos"},
    vocab:[
      {h:"你好",py:"nǐhǎo",pt:"olá; oi"},
      {h:"谢谢",py:"xièxie",pt:"obrigado/a"},
      {h:"再见",py:"zàijiàn",pt:"tchau, até logo"},
      {h:"对不起",py:"duìbuqǐ",pt:"desculpe-me"},
      {h:"没关系",py:"méi guānxi",pt:"não tem problema; tudo bem"},
      {h:"不客气",py:"bú kèqi",pt:"de nada; não há de quê"},
      {h:"请",py:"qǐng",pt:"por favor; convidar"},
      {h:"喂",py:"wèi",pt:"alô (ao telefone); ei"},
      {h:"一",py:"yī",pt:"um"},
      {h:"二",py:"èr",pt:"dois"},
      {h:"三",py:"sān",pt:"três"},
      {h:"四",py:"sì",pt:"quatro"},
      {h:"五",py:"wǔ",pt:"cinco"},
      {h:"六",py:"liù",pt:"seis"},
      {h:"七",py:"qī",pt:"sete"},
      {h:"八",py:"bā",pt:"oito"},
      {h:"九",py:"jiǔ",pt:"nove"},
      {h:"十",py:"shí",pt:"dez"},
      {h:"零",py:"líng",pt:"zero"},
      {h:"百",py:"bǎi",pt:"cem"}
    ],
    grammar:[
      {struct:"声调: ¯ ˊ ˇ ˋ",label:"Quatro Tons do Mandarim",color:"#6366F1",exp:"Tom 1 (alto-plano): mā. Tom 2 (subindo): má. Tom 3 (curva): mǎ. Tom 4 (caindo): mà. Neutro: ma. CRUCIAL: 买mǎi(comprar) ≠ 卖mài(vender)! Só o tom muda.",exs:[{cn:"妈妈骑马，马慢，妈妈骂马。",py:"Māma qí mǎ, mǎ màn, māma mà mǎ.",pt:"A mãe cavalga o cavalo; o cavalo é lento; a mãe reclama do cavalo."},{cn:"一 muda de tom: yī 一般 / yí个 (antes de 4.º tom) / yì杯 (antes de 1.º/2.º/3.º tom).",py:"——",pt:"Regra de tom sandhi do 一: crucial para fala natural."}]},
      {struct:"你好！/ 谢谢！/ 再见！",label:"Saudações e Fórmulas Básicas",color:"#059669",exp:"Saudações em chinês: 你好 (olá, informal), 您好 (olá, respeitoso), 谢谢 (obrigado), 再见 (tchau). Não há equivalente ao \"oi/boa tarde\" por hora do dia — use 你好 em qualquer momento.",exs:[{cn:"你好！很高兴认识你。",py:"Nǐ hǎo! Hěn gāoxìng rènshi nǐ.",pt:"Olá! Muito prazer em te conhecer."},{cn:"谢谢！—— 不客气！",py:"Xièxie! —— Bú kèqi!",pt:"Obrigado! —— De nada!"}]},
      {struct:"S + 是 + N",label:"Verbo 是 — Ser/É",color:"#DC2626",exp:"是 é o verbo \"ser\" em chinês, usado APENAS com substantivos (identidade). NUNCA use 是 antes de adjetivos: ❌我是好。Adjetivos usam 很: ✅我很好。",exs:[{cn:"我是学生。",py:"Wǒ shì xuésheng.",pt:"Sou estudante."},{cn:"她是老师吗？—— 是的，她是。",py:"Tā shì lǎoshī ma? —— Shì de, tā shì.",pt:"Ela é professora? —— Sim, é."}]}
    ],
    dialogue:[
      {sp:"A",cn:"你好！你叫什么名字？",py:"Nǐ hǎo! Nǐ jiào shénme míngzi?",pt:"Olá! Como você se chama?"},
      {sp:"B",cn:"你好！我叫玛丽。你呢？",py:"Nǐ hǎo! Wǒ jiào Mǎlì. Nǐ ne?",pt:"Olá! Me chamo Mari. E você?"},
      {sp:"A",cn:"我叫李明。很高兴认识你！",py:"Wǒ jiào Lǐ Míng. Hěn gāoxìng rènshi nǐ!",pt:"Me chamo Li Ming. Muito prazer!"},
      {sp:"B",cn:"我也很高兴认识你。你是哪国人？",py:"Wǒ yě hěn gāoxìng rènshi nǐ. Nǐ shì nǎ guó rén?",pt:"Também é um prazer. De qual país você é?"},
      {sp:"A",cn:"我是中国人，你呢？",py:"Wǒ shì Zhōngguórén, nǐ ne?",pt:"Sou chinês. E você?"},
      {sp:"B",cn:"我是巴西人。你的中文很好！",py:"Wǒ shì Bāxīrén. Nǐ de Zhōngwén hěn hǎo!",pt:"Sou brasileira. Seu chinês é muito bom!"},
      {sp:"A",cn:"谢谢！再见！",py:"Xièxie! Zàijiàn!",pt:"Obrigado! Tchau!"}
    ],
    quiz:[
      {q:"Qual é o tom de 妈 (mãe)?",opts:["Tom 1 (plano alto)","Tom 2 (subindo)","Tom 3 (curva)","Tom 4 (caindo)"],ans:0,exp:"✅ 妈 (mā) = Tom 1, plano e alto. Compara: 马 mǎ (cavalo) = Tom 3, 骂 mà (resmungar) = Tom 4. O tom muda completamente o significado!"},
      {q:"Como dizer \"prazer em te conhecer\":",opts:["认识你很高兴","很高兴你认识","很高兴认识你","你很高兴认识"],ans:2,exp:"✅ 很高兴认识你! Estrutura fixa. Note a ordem: 高兴(contente) + 认识(conhecer) + 你(você)."},
      {q:"你好 é usado:",opts:["Só pela manhã","Só com desconhecidos","A qualquer hora com qualquer pessoa","Só de manhã ou à tarde"],ans:2,exp:"✅ 你好 funciona a qualquer hora do dia, com qualquer pessoa. Diferente do português, não existe \"bom dia/boa tarde\" como saudação separada em situações informais."},
      {q:"A frase correta para \"Sou estudante\" é:",opts:["我很学生","我是学生","我有学生","学生我是"],ans:1,exp:"✅ 我是学生 — 是 = ser (para substantivos). NUNCA: 我很学生 (muito errado!). 很 é só para adjetivos."},
      {q:"一 é pronunciado como yí antes de:",opts:["Todo e qualquer tom","Tom 4 e neutro","Apenas tom 4","Apenas tom neutro"],ans:1,exp:"✅ 一 → yí (tom 2) antes de tom 4. Ex: 一个 (yí gè). Mas: 一般 (yī bān, tom 1 antes de tom 1). Sandhi tonal é fundamental!"}
    ],
  },
  {
    w:2, phase:"Família", emoji:"👨‍👩‍👧", color:"#0891B2",
    theme:"Família, Pronomes e Possessivo 的",
    built:false, builtNote:"",
    stats:{words:"~21 novas (HSK 1)",newHSK2:"22",grammar:"们 plural · 的 possessivo · 有/没有",chars:"+12 novos"},
    vocab:[
      {h:"爸爸",py:"bàba",pt:"pai"},
      {h:"妈妈",py:"māma",pt:"mãe"},
      {h:"哥哥",py:"gēge",pt:"irmão mais velho"},
      {h:"弟弟",py:"dìdi",pt:"irmão mais novo"},
      {h:"姐姐",py:"jiějie",pt:"irmã mais velha"},
      {h:"妹妹",py:"mèimei",pt:"irmã mais nova"},
      {h:"孩子",py:"háizi",pt:"criança"},
      {h:"女儿",py:"nǚ’ér",pt:"filha"},
      {h:"儿子",py:"érzi",pt:"filho"},
      {h:"家人",py:"jiārén",pt:"família (membros)"},
      {h:"朋友",py:"péngyou",pt:"amigo/a"},
      {h:"男朋友",py:"nánpéngyou",pt:"namorado"},
      {h:"女朋友",py:"nǚpéngyou",pt:"namorada"},
      {h:"老师",py:"lǎoshī",pt:"professor/a"},
      {h:"学生",py:"xuéshēng",pt:"estudante"},
      {h:"我",py:"wǒ",pt:"eu"},
      {h:"你",py:"nǐ",pt:"você"},
      {h:"他",py:"tā",pt:"ele"},
      {h:"她",py:"tā",pt:"ela"},
      {h:"它",py:"tā",pt:"ele/ela (coisa/animal)"},
      {h:"您",py:"nín",pt:"você (formal)"},
      {h:"们",py:"men",pt:"(sufixo plural para pessoas)"}
    ],
    grammar:[
      {struct:"我/你/他/她/它 + 们",label:"Pronomes e Plural com 们",color:"#6366F1",exp:"们 transforma pronome em plural: 我们(nós), 你们(vocês), 他们/她们/它们(eles/elas). Note: 您 não tem plural padrão; use 你们 para grupo.",exs:[{cn:"我们是朋友，你们呢？",py:"Wǒmen shì péngyou, nǐmen ne?",pt:"Somos amigos, e vocês?"},{cn:"他们是我的家人。",py:"Tāmen shì wǒ de jiārén.",pt:"Eles são minha família."}]},
      {struct:"N₁ + 的 + N₂",label:"Possessivo com 的",color:"#059669",exp:"的 forma o possessivo: 我的书(meu livro). Entre pronomes e família próxima, 的 pode ser omitido: 我妈妈(minha mãe) = 我的妈妈.",exs:[{cn:"这是我的书，那是你的。",py:"Zhè shì wǒ de shū, nà shì nǐ de.",pt:"Este é meu livro, aquele é seu."},{cn:"她是我妈妈。",py:"Tā shì wǒ māma.",pt:"Ela é minha mãe."}]},
      {struct:"S + 有/没有 + N",label:"Ter/Não Ter com 有",color:"#D97706",exp:"有 = ter/existir. 没有 = não ter (NUNCA \"不有\"). 有 também localiza: 里面有一本书(dentro tem um livro).",exs:[{cn:"我有一个弟弟。",py:"Wǒ yǒu yí gè dìdi.",pt:"Tenho um irmão mais novo."},{cn:"我没有朋友在这里。",py:"Wǒ méiyǒu péngyou zài zhèlǐ.",pt:"Não tenho amigos aqui."}]}
    ],
    dialogue:[
      {sp:"A",cn:"这是你的家人吗？",py:"Zhè shì nǐ de jiārén ma?",pt:"Esta é sua família?"},
      {sp:"B",cn:"是的！这是我爸爸，这是我妈妈。",py:"Shì de! Zhè shì wǒ bàba, zhè shì wǒ māma.",pt:"É! Este é meu pai, esta é minha mãe."},
      {sp:"A",cn:"你有兄弟姐妹吗？",py:"Nǐ yǒu xiōngdì jiěmèi ma?",pt:"Você tem irmãos?"},
      {sp:"B",cn:"有，我有一个弟弟和一个妹妹。",py:"Yǒu, wǒ yǒu yí gè dìdi hé yí gè mèimei.",pt:"Tenho, um irmão mais novo e uma irmã mais nova."},
      {sp:"A",cn:"你们都很漂亮！你弟弟几岁？",py:"Nǐmen dōu hěn piàoliang! Nǐ dìdi jǐ suì?",pt:"Vocês são todos bonitos! Quantos anos tem seu irmão?"},
      {sp:"B",cn:"他八岁。他是个好孩子！",py:"Tā bā suì. Tā shì gè hǎo háizi!",pt:"Ele tem oito anos. É uma boa criança!"}
    ],
    quiz:[
      {q:"Qual é o plural de 他 (ele)?",opts:["他们","他个","们他","你们"],ans:0,exp:"✅ 他们 = eles. 们 é o marcador de plural para pronomes: 我们(nós), 你们(vocês), 他们/她们(eles/elas)."},
      {q:"\"Meu livro\" em chinês é:",opts:["我是书","我书","我的书","书我的"],ans:2,exp:"✅ 我的书 — 的 forma o possessivo (como apostrofo-s em inglês). Estrutura: pronome/nome + 的 + objeto possuído."},
      {q:"\"Não tenho irmão\" em chinês:",opts:["我不有弟弟","我没有弟弟","我是没弟弟","我没弟弟有"],ans:1,exp:"✅ 我没有弟弟 — 有 (ter) sempre nega com 没, NUNCA com 不. 我不有 ❌ é impossível em chinês!"},
      {q:"们 pode ser adicionado a:",opts:["Apenas 我","Apenas pronomes pessoais","Qualquer substantivo","Qualquer pessoa e objeto"],ans:1,exp:"✅ 们 é usado com pronomes pessoais e substantivos humanos: 我们, 你们, 同学们(colegas). Não se usa com objetos ou animais."},
      {q:"\"Ela é minha mãe\" em chinês:",opts:["她是我的妈妈","我的她是妈妈","我妈妈她是","她妈妈是我"],ans:0,exp:"✅ 她是我的妈妈. Note: pode simplificar para 她是我妈妈 (sem 的 entre pronome e familiar próximo), ambas corretas."}
    ],
  },
  {
    w:3, phase:"Lugares", emoji:"🏙", color:"#059669",
    theme:"Lugares, 在 e Demonstrativos 这/那/哪",
    built:false, builtNote:"",
    stats:{words:"~23 novas (HSK 1)",newHSK2:"24",grammar:"在+lugar · 这/那/哪 · 中国/中文",chars:"+15 novos"},
    vocab:[
      {h:"家",py:"jiā",pt:"casa; família"},
      {h:"学校",py:"xuéxiào",pt:"escola"},
      {h:"饭店",py:"fàndiàn",pt:"restaurante; hotel"},
      {h:"超市",py:"chāoshì",pt:"supermercado"},
      {h:"电影院",py:"diànyǐngyuàn",pt:"cinema (lugar)"},
      {h:"医院",py:"yīyuàn",pt:"hospital"},
      {h:"公司",py:"gōngsī",pt:"empresa, companhia"},
      {h:"店",py:"diàn",pt:"loja"},
      {h:"在",py:"zài",pt:"estar em; em"},
      {h:"这",py:"zhè",pt:"este/a; isso"},
      {h:"那",py:"nà",pt:"aquele/a; então"},
      {h:"这里",py:"zhèlǐ",pt:"aqui"},
      {h:"那里",py:"nàlǐ",pt:"lá, naquele lugar"},
      {h:"这边",py:"zhèbiān",pt:"por aqui"},
      {h:"那边",py:"nàbiān",pt:"lá; por ali"},
      {h:"哪里",py:"nǎlǐ",pt:"onde"},
      {h:"哪儿",py:"nǎr",pt:"onde"},
      {h:"这个",py:"zhège",pt:"este/a"},
      {h:"那个",py:"nàge",pt:"aquele/a"},
      {h:"哪个",py:"nǎge",pt:"qual (de vários)"},
      {h:"这些",py:"zhèxiē",pt:"estes/as"},
      {h:"那些",py:"nàxiē",pt:"aqueles/as"},
      {h:"哪些",py:"nǎxiē",pt:"quais (plural)"},
      {h:"中国",py:"Zhōngguó",pt:"China"}
    ],
    grammar:[
      {struct:"在 + Lugar",label:"Estar em (Preposição 在)",color:"#7C3AED",exp:"在 = estar em (localização). 在 vem antes do lugar: 我在学校(estou na escola). Como verbo: 在 = estar. Como prep.: antes do lugar.",exs:[{cn:"我在家。你在哪里？",py:"Wǒ zài jiā. Nǐ zài nǎlǐ?",pt:"Estou em casa. Onde você está?"},{cn:"图书馆在学校旁边。",py:"Túshūguǎn zài xuéxiào pángbiān.",pt:"A biblioteca fica ao lado da escola."}]},
      {struct:"这/那/哪 + 个/些",label:"Demonstrativos",color:"#0891B2",exp:"这 = este (perto). 那 = aquele (longe). 哪 = qual? (pergunta). Seguidos de 个(sg) ou 些(pl). 这里/这儿 = aqui. 哪里/哪儿 = onde?",exs:[{cn:"这个是什么？那个是苹果。",py:"Zhège shì shénme? Nàge shì píngguǒ.",pt:"O que é este? Aquele é uma maçã."},{cn:"你家在哪里？",py:"Nǐ jiā zài nǎlǐ?",pt:"Onde é a sua casa?"}]},
      {struct:"中国 / 中文 / 汉语",label:"China, Chinês (língua)",color:"#DC2626",exp:"中国 = China. 中文 = língua chinesa (escrita/geral). 汉语 = mandarim (mais específico, enfatiza o falado). Na prática intercambiáveis na fala diária.",exs:[{cn:"我在学中文/汉语。",py:"Wǒ zài xué Zhōngwén/Hànyǔ.",pt:"Estou aprendendo chinês/mandarim."},{cn:"中国有很多学生学英语。",py:"Zhōngguó yǒu hěn duō xuésheng xué Yīngyǔ.",pt:"Na China, muitos estudantes aprendem inglês."}]}
    ],
    dialogue:[
      {sp:"A",cn:"请问，图书馆在哪里？",py:"Qǐngwèn, túshūguǎn zài nǎlǐ?",pt:"Com licença, onde fica a biblioteca?"},
      {sp:"B",cn:"在学校里面，那边就是。",py:"Zài xuéxiào lǐmiàn, nàbiān jiùshì.",pt:"É dentro da escola, é bem ali."},
      {sp:"A",cn:"谢谢！超市呢？",py:"Xièxie! Chāoshì ne?",pt:"Obrigado! E o supermercado?"},
      {sp:"B",cn:"超市在图书馆旁边。走路五分钟。",py:"Chāoshì zài túshūguǎn pángbiān. Zǒulù wǔ fēnzhōng.",pt:"O supermercado fica ao lado da biblioteca. São 5 min a pé."},
      {sp:"A",cn:"好的，谢谢你！",py:"Hǎo de, xièxie nǐ!",pt:"Ótimo, obrigado!"},
      {sp:"B",cn:"不客气！",py:"Bú kèqi!",pt:"De nada!"}
    ],
    quiz:[
      {q:"\"Onde fica a escola?\" em chinês:",opts:["学校在哪里？","哪里在学校？","在哪里学校？","学校哪里在？"],ans:0,exp:"✅ 学校在哪里？— Estrutura: sujeito (学校) + 在 + 哪里 (onde). Também aceito: 学校在哪？(informal), 学校在哪儿？(北京 dialeto)."},
      {q:"这个 vs 那个: qual a diferença?",opts:["São iguais","这个 = perto; 那个 = longe","那个 = perto; 这个 = longe","Depende do contexto"],ans:1,exp:"✅ 这(zhè) = este/isto (PERTO do falante). 那(nà) = aquele/aquilo (LONGE do falante). Igual a \"este/aquele\" em português, mas mais rigoroso em posição."},
      {q:"Como se chama a língua chinesa falada?",opts:["汉字","中文","汉语","A e B estão corretas"],ans:2,exp:"✅ 汉语 (Hànyǔ) = mandarim/idioma Han falado. 中文 = chinês (escrita/língua em geral). 汉字 = caracteres chineses (escrita). Na prática, 汉语 e 中文 são intercambiáveis."},
      {q:"\"A livraria fica ao lado do banco\" =",opts:["书店在银行旁边","旁边书店在银行","银行在书店旁边","书店旁边在银行"],ans:0,exp:"✅ 书店在银行旁边 — Estrutura: sujeito + 在 + referência + 旁边. As palavras de posição (旁边, 里面, etc.) sempre vêm DEPOIS da referência."},
      {q:"中国 significa:",opts:["China Central","O País do Centro","País Chinês","Grande China"],ans:1,exp:"✅ 中国 = País do Centro/Meio. 中 = centro/meio. 国 = país/nação. Historicamente, os chineses se viam como o centro do mundo."}
    ],
  },
  {
    w:4, phase:"Tempo", emoji:"📅", color:"#D97706",
    theme:"Calendário, Horas e Clima",
    built:false, builtNote:"",
    stats:{words:"~18 novas (HSK 1)",newHSK2:"17",grammar:"ordem do tempo · 几月几号 · 天气",chars:"+10 novos"},
    vocab:[
      {h:"今天",py:"jīntiān",pt:"hoje"},
      {h:"明天",py:"míngtiān",pt:"amanhã"},
      {h:"昨天",py:"zuótiān",pt:"ontem"},
      {h:"今年",py:"jīnnián",pt:"este ano"},
      {h:"明年",py:"míngnián",pt:"ano que vem"},
      {h:"年",py:"nián",pt:"ano"},
      {h:"月",py:"yuè",pt:"mês; lua"},
      {h:"日",py:"rì",pt:"dia; sol"},
      {h:"小时",py:"xiǎoshí",pt:"hora (duração)"},
      {h:"分钟",py:"fēnzhōng",pt:"minuto (duração)"},
      {h:"现在",py:"xiànzài",pt:"agora"},
      {h:"上",py:"shàng",pt:"cima; subir"},
      {h:"下",py:"xià",pt:"baixo; descer; próximo"},
      {h:"中午",py:"zhōngwǔ",pt:"meio-dia"},
      {h:"天气",py:"tiānqì",pt:"tempo (meteorológico)"},
      {h:"下雨",py:"xià yǔ",pt:"chover"},
      {h:"怎么样",py:"zěnmeyàng",pt:"como (está); que tal"}
    ],
    grammar:[
      {struct:"时间词 + S + VP",label:"Posição das Palavras de Tempo",color:"#6366F1",exp:"Tempo vem ANTES do verbo ou no INÍCIO da frase. NUNCA no final como em português. 今天我去(hoje eu vou) ✅ / 我去今天 ❌",exs:[{cn:"今天天气很好！我们去公园吧。",py:"Jīntiān tiānqì hěn hǎo! Wǒmen qù gōngyuán ba.",pt:"Hoje o tempo está ótimo! Vamos ao parque."},{cn:"明天你有时间吗？",py:"Míngtiān nǐ yǒu shíjiān ma?",pt:"Você tem tempo amanhã?"}]},
      {struct:"几 + 月 / 几 + 号 / 几 + 点",label:"Perguntar Data e Hora",color:"#059669",exp:"几月？= qual mês? 几号？= qual dia? 几点？= que horas? Para meses: 一月(janeiro)...十二月(dezembro). Para horas: 两点(2h), 三点半(3h30).",exs:[{cn:"今天几月几号？——  三月八号。",py:"Jīntiān jǐ yuè jǐ hào? —— Sān yuè bā hào.",pt:"Que mês e dia é hoje? —— 8 de março."},{cn:"现在几点？—— 下午两点半。",py:"Xiànzài jǐ diǎn? —— Xiàwǔ liǎng diǎn bàn.",pt:"Que horas são? —— São 14h30."}]},
      {struct:"天气 + Adj",label:"Expressões de Clima",color:"#D97706",exp:"Tempo atmosférico: 天气很好(bom tempo), 下雨(chover), 下雪(nevar). Temperatura: 热(quente), 冷(frio), 暖和(agradável). Pergunta: 今天天气怎么样？",exs:[{cn:"今天天气怎么样？—— 今天很冷，要下雨了。",py:"Jīntiān tiānqì zěnmeyàng? —— Jīntiān hěn lěng, yào xià yǔ le.",pt:"Como está o tempo hoje? —— Hoje está frio, vai chover."},{cn:"北京的冬天很冷！",py:"Běijīng de dōngtiān hěn lěng!",pt:"O inverno em Pequim é muito frio!"}]}
    ],
    dialogue:[
      {sp:"A",cn:"今天几月几号？",py:"Jīntiān jǐ yuè jǐ hào?",pt:"Que data é hoje?"},
      {sp:"B",cn:"今天是三月十五号，星期三。",py:"Jīntiān shì sān yuè shíwǔ hào, xīngqīsān.",pt:"Hoje é 15 de março, quarta-feira."},
      {sp:"A",cn:"明天天气怎么样？",py:"Míngtiān tiānqì zěnmeyàng?",pt:"Como vai estar o tempo amanhã?"},
      {sp:"B",cn:"明天会下雨，有点儿冷。你带伞吗？",py:"Míngtiān huì xià yǔ, yǒudiǎnr lěng. Nǐ dài sǎn ma?",pt:"Amanhã vai chover, um pouco frio. Você vai trazer guarda-chuva?"},
      {sp:"A",cn:"好的，我带伞。现在几点？",py:"Hǎo de, wǒ dài sǎn. Xiànzài jǐ diǎn?",pt:"Ótimo, vou trazer. Que horas são agora?"},
      {sp:"B",cn:"现在下午两点半。",py:"Xiànzài xiàwǔ liǎng diǎn bàn.",pt:"São 14h30 agora."}
    ],
    quiz:[
      {q:"As palavras de tempo em chinês ficam:",opts:["No final da frase","No início ou antes do verbo","Depois do objeto","Entre sujeito e verbo"],ans:1,exp:"✅ Tempo → antes do verbo ou no início. 今天我去(✅) / 我今天去(✅) / 我去今天(❌). Note que ambas as primeiras posições são aceitas em chinês."},
      {q:"\"Que horas são?\" em chinês:",opts:["时间是什么？","现在几点了？","今天几点？","几时点现在？"],ans:1,exp:"✅ 现在几点了？ou simplesmente 几点了？几 = quanto/qual (para números pequenos). 点 = hora. 现在 = agora."},
      {q:"\"15 de março\" em chinês:",opts:["三月五十号","三月十五号","五三月十号","十五号三月"],ans:1,exp:"✅ 三月十五号 — Ordem: mês + 月 + dia + 号. É sempre: (ano +) mês + dia, do maior para o menor. 号 = número do dia."},
      {q:"怎么样 significa:",opts:["Como se vai?","Como se faz?","Como está? / O que acha?","O que aconteceu?"],ans:2,exp:"✅ 怎么样 = como (avaliação). 你怎么样？= como vai? 这个怎么样？= o que acha deste? Diferente de 怎么 (como/por que) e 怎么了 (o que houve?)."},
      {q:"\"Vai chover amanhã\" em chinês:",opts:["明天下雨","明天将下雨去","明天天气下雨了","明天会下雨"],ans:3,exp:"✅ 明天会下雨 = vai chover amanhã. 会 indica probabilidade/futuro. 下雨 = chover (literalmente: cair chuva). Note: 明天下雨 (sem 会) também é aceito no cotidiano."}
    ],
  },
  {
    w:5, phase:"Comida", emoji:"🍜", color:"#7C3AED",
    theme:"Comer, Beber, Sabores e Classificadores",
    built:false, builtNote:"",
    stats:{words:"~20 novas (HSK 1)",newHSK2:"18",grammar:"吃/喝 · 量词 · 好+V",chars:"+12 novos"},
    vocab:[
      {h:"吃",py:"chī",pt:"comer"},
      {h:"喝",py:"hē",pt:"beber"},
      {h:"饭",py:"fàn",pt:"arroz cozido; refeição"},
      {h:"米饭",py:"mǐfàn",pt:"arroz cozido"},
      {h:"面包",py:"miànbāo",pt:"pão"},
      {h:"面条儿",py:"miàntiáor",pt:"macarrão (fideos)"},
      {h:"饺子",py:"jiǎozi",pt:"guioza"},
      {h:"包子",py:"bāozi",pt:"baozi (pãozinho recheado)"},
      {h:"菜",py:"cài",pt:"prato; legume"},
      {h:"鸡蛋",py:"jīdàn",pt:"ovo"},
      {h:"水",py:"shuǐ",pt:"água"},
      {h:"茶",py:"chá",pt:"chá"},
      {h:"牛奶",py:"niúnǎi",pt:"leite"},
      {h:"苹果",py:"píngguǒ",pt:"maçã"},
      {h:"好吃",py:"hǎochī",pt:"gostoso, delicioso"},
      {h:"好看",py:"hǎokàn",pt:"bonito/a"},
      {h:"好听",py:"hǎotīng",pt:"agradável de ouvir"},
      {h:"好玩儿",py:"hǎowánr",pt:"divertido"}
    ],
    grammar:[
      {struct:"S + 吃/喝 + O",label:"Verbos para Comer e Beber",color:"#6366F1",exp:"吃 = comer (sólidos). 喝 = beber (líquidos). 吃饭 = comer (a refeição). 喝水/茶/牛奶 = beber água/chá/leite. Compostos: 好吃(delicioso), 好喝(gostoso).",exs:[{cn:"你喜欢吃什么？—— 我喜欢吃饺子。",py:"Nǐ xǐhuan chī shénme? —— Wǒ xǐhuan chī jiǎozi.",pt:"O que você gosta de comer? —— Gosto de comer gyoza."},{cn:"这个茶好喝吗？—— 很好喝！",py:"Zhège chá hǎohē ma? —— Hěn hǎohē!",pt:"Este chá é gostoso? —— Muito!"}]},
      {struct:"Num + 量词 + N",label:"Classificadores (量词)",color:"#D97706",exp:"Entre número e substantivo, o chinês EXIGE um classificador. Os mais importantes: 个(geral), 本(livro), 杯(copo), 件(peças de roupa), 条(coisas compridas), 块(pedaços/yuan).",exs:[{cn:"我要一杯茶和两个包子。",py:"Wǒ yào yī bēi chá hé liǎng gè bāozi.",pt:"Quero uma xícara de chá e dois baozi."},{cn:"三本书和一件衬衫。",py:"Sān běn shū hé yī jiàn chènshān.",pt:"Três livros e uma camisa."}]},
      {struct:"好 + V",label:"Compostos com 好",color:"#059669",exp:"好 + verbo = \"agradável de fazer\". 好吃(gostoso), 好喝(bom de beber), 好看(bonito/bom de ver), 好听(bonito de ouvir), 好玩儿(divertido). Antonimo: 难+V (难吃=ruim de comer).",exs:[{cn:"这个苹果很好吃！",py:"Zhège píngguǒ hěn hǎochī!",pt:"Esta maçã é deliciosa!"},{cn:"这首歌好听，视频也好看。",py:"Zhè shǒu gē hǎotīng, shìpín yě hǎokàn.",pt:"Esta música é boa, e o vídeo também é bonito."}]}
    ],
    dialogue:[
      {sp:"A",cn:"你喜欢吃什么？",py:"Nǐ xǐhuan chī shénme?",pt:"O que você gosta de comer?"},
      {sp:"B",cn:"我很喜欢吃饺子和米饭。你呢？",py:"Wǒ hěn xǐhuan chī jiǎozi hé mǐfàn. Nǐ ne?",pt:"Gosto muito de gyoza e arroz. E você?"},
      {sp:"A",cn:"我喜欢吃中国菜，也喜欢喝茶。",py:"Wǒ xǐhuan chī Zhōngguó cài, yě xǐhuan hē chá.",pt:"Gosto de comida chinesa e também de beber chá."},
      {sp:"B",cn:"这里有一个很好的饭馆，饺子非常好吃！",py:"Zhèlǐ yǒu yí gè hěn hǎo de fànguǎn, jiǎozi fēicháng hǎochī!",pt:"Tem um ótimo restaurante aqui, o gyoza é delicioso!"},
      {sp:"A",cn:"好！我们现在去吃吗？",py:"Hǎo! Wǒmen xiànzài qù chī ma?",pt:"Ótimo! Vamos comer agora?"},
      {sp:"B",cn:"好的！走吧！",py:"Hǎo de! Zǒu ba!",pt:"Vamos! Bora!"}
    ],
    quiz:[
      {q:"O classificador para \"uma xícara de chá\" é:",opts:["一个茶","一杯茶","一条茶","一本茶"],ans:1,exp:"✅ 一杯茶 — 杯 = copo/xícara (recipiente). Regra: o classificador corresponde ao FORMAT do objeto. 一杯水(um copo d'água), 一个苹果(uma maçã), 一条鱼(um peixe)."},
      {q:"\"Este prato é gostoso\" em chinês:",opts:["这个菜是好吃","这个菜很好吃","这个菜好吃很","这个菜有好吃"],ans:1,exp:"✅ 这个菜很好吃 — 好吃 = gostoso (literalmente \"bom de comer\"). 很 é necessário antes de adjetivos isolados. Sem 很: implica comparação."},
      {q:"好 + V (好看/好吃/好听) significa:",opts:["Muito bom","Agradável/bom para fazer aquela ação","Fácil de fazer","Bonito"],ans:1,exp:"✅ 好+V = agradável de fazer: 好吃(gostoso de comer), 好看(bonito de ver), 好听(bonito de ouvir), 好玩儿(divertido). Antônimo: 难+V (难吃=ruim de comer, 难看=feio)."},
      {q:"Como pedir um de algo (classificador geral):",opts:["一本","一条","一个","一杯"],ans:2,exp:"✅ 个 é o classificador geral/default em chinês, usado quando não sabe qual classificador específico. Um estudante: 一个学生. Uma ideia: 一个想法. Uma pessoa: 一个人."},
      {q:"\"Eu quero três dumplings\" em chinês:",opts:["我要三个饺子","我要饺子三个","三个饺子我要","我三个饺子要"],ans:0,exp:"✅ 我要三个饺子 — Ordem: Sujeito (我) + Verbo (要) + Número + Classificador (三个) + Substantivo (饺子). No chinês, o número sempre precede o substantivo."}
    ],
  },
  {
    w:6, phase:"Compras", emoji:"🛍", color:"#DC2626",
    theme:"Dinheiro, Preços e Expressões Comerciais",
    built:false, builtNote:"",
    stats:{words:"~18 novas (HSK 1)",newHSK2:"16",grammar:"多少钱 · 怎么样 · 想+V",chars:"+10 novos"},
    vocab:[
      {h:"买",py:"mǎi",pt:"comprar"},
      {h:"卖",py:"mài",pt:"vender"},
      {h:"钱",py:"qián",pt:"dinheiro"},
      {h:"块",py:"kuài",pt:"yuan (unidade monetária)"},
      {h:"多少",py:"duōshao",pt:"quanto, quantos"},
      {h:"贵",py:"guì",pt:"caro (preço)"},
      {h:"便宜",py:"piányi",pt:"barato"},
      {h:"东西",py:"dōngxi",pt:"coisa, objeto"},
      {h:"号",py:"hào",pt:"número; data"},
      {h:"口",py:"kǒu",pt:"boca"},
      {h:"件",py:"jiàn",pt:"(classif. roupas, assuntos)"},
      {h:"个",py:"gè",pt:"(classif. geral)"},
      {h:"本",py:"běn",pt:"exemplar; tomo (medida para livros)"},
      {h:"课",py:"kè",pt:"aula, lição"},
      {h:"分",py:"fēn",pt:"minuto; centavo"},
      {h:"给",py:"gěi",pt:"dar; para"}
    ],
    grammar:[
      {struct:"多少钱？/ 这个怎么卖？",label:"Perguntar o Preço",color:"#6366F1",exp:"多少钱？= quanto custa? Para menos de 10 items: 几块钱？. 钱=dinheiro, 块=yuan(informal), 元=yuan(formal), 毛/角=0,1 yuan, 分=0,01 yuan. 一共多少钱 = quanto é no total?",exs:[{cn:"这个苹果多少钱？—— 两块五（2,5元）。",py:"Zhège píngguǒ duōshao qián? —— Liǎng kuài wǔ.",pt:"Quanto custa esta maçã? —— 2,50 yuan."},{cn:"太贵了！便宜一点儿可以吗？",py:"Tài guì le! Piányí yīdiǎnr kěyǐ ma?",pt:"É caro demais! Pode fazer mais barato?"}]},
      {struct:"这个/那个 + 怎么样",label:"Como é; O que acha de",color:"#059669",exp:"怎么样 = como está/como é (avaliação). Pode ser pergunta ou opinião. 怎么 = como (modo). 怎么了 = o que houve? Não confunda!",exs:[{cn:"这件衣服怎么样？—— 很漂亮！",py:"Zhè jiàn yīfu zěnmeyàng? —— Hěn piàoliang!",pt:"O que você acha desta roupa? —— Muito bonita!"},{cn:"你怎么了？—— 我不舒服。",py:"Nǐ zěnme le? —— Wǒ bù shūfu.",pt:"O que houve? —— Não me sinto bem."}]},
      {struct:"想 + V",label:"Querer; Pensar em + Verbo",color:"#DC2626",exp:"想 = querer (vontade) / pensar (cognitivo). 我想买 = quero comprar. 我想你 = saudade de você. 不想 = não querer. Mais suave que 要.",exs:[{cn:"我想买这个，多少钱？",py:"Wǒ xiǎng mǎi zhège, duōshao qián?",pt:"Quero comprar isso, quanto custa?"},{cn:"你想喝什么？—— 我想喝茶。",py:"Nǐ xiǎng hē shénme? —— Wǒ xiǎng hē chá.",pt:"O que você quer beber? —— Quero chá."}]}
    ],
    dialogue:[
      {sp:"A",cn:"这件衣服多少钱？",py:"Zhè jiàn yīfu duōshao qián?",pt:"Quanto custa essa roupa?"},
      {sp:"B",cn:"一百五十块。",py:"Yì bǎi wǔshí kuài.",pt:"150 yuan."},
      {sp:"A",cn:"太贵了！便宜一点儿，可以吗？",py:"Tài guì le! Piányí yīdiǎnr, kěyǐ ma?",pt:"É caro demais! Pode fazer mais barato?"},
      {sp:"B",cn:"一百二十块，这是最便宜的价格了。",py:"Yì bǎi èrshí kuài, zhè shì zuì piányí de jiàgé le.",pt:"120 yuan, este é o preço mais barato."},
      {sp:"A",cn:"好吧，我要这件。我用手机支付吗？",py:"Hǎo ba, wǒ yào zhè jiàn. Wǒ yòng shǒujī zhīfù ma?",pt:"Tudo bem, vou ficar com esta. Posso pagar pelo celular?"},
      {sp:"B",cn:"可以！谢谢您！",py:"Kěyǐ! Xièxie nín!",pt:"Sim! Obrigado!"}
    ],
    quiz:[
      {q:"\"Quanto custa?\" em chinês:",opts:["多少时间？","多少块？","多少钱？","几块钱？"],ans:2,exp:"✅ 多少钱？= quanto custa? 钱 = dinheiro. 块 = yuan informal (pode usar 几块钱 para valores pequenos). Para preços: 一百块 = 100 yuan, 八十五块五 = 85,50 yuan."},
      {q:"块 vs 元: qual a diferença?",opts:["Bloco vs círculo","块 é informal; 元 é formal para yuan","元 é informal; 块 é formal","São completamente diferentes"],ans:1,exp:"✅ 块 = yuan (fala informal). 元 = yuan (escrita formal/recibos). Na fala diária, use 块. Na escrita, use 元. Centavos: 毛(fala) = 角(escrita) = 0,1 yuan."},
      {q:"\"Muito caro, pode mais barato?\" =",opts:["太贵了，便宜一点儿可以吗？","贵太了，便宜可以一点儿吗？","太贵，一点儿便宜可以吗？","贵，便宜太一点儿吗？"],ans:0,exp:"✅ 太贵了，便宜一点儿可以吗？— Note: 太贵了 (太...了 = demais). 便宜一点儿 = um pouco mais barato. 可以吗 = pode ser?"},
      {q:"想 como \"quero comprar\" é:",opts:["我买想","我想买","买我想","想买我"],ans:1,exp:"✅ 我想买 — Estrutura: sujeito + 想 + verbo. 想 = querer (suave/desejoso). Mais urgente: 要. 我想买 (quero comprar) vs 我要买 (vou comprar/preciso comprar)."},
      {q:"Como pagar com o celular se diz:",opts:["手机支付","付钱手机","手机的支付","付手机钱"],ans:0,exp:"✅ 手机支付 = pagamento por celular (WeChat Pay / Alipay). Literalmente: 手机(celular) + 支付(pagar). Na China, isso é extremamente comum!"}
    ],
  },
  {
    w:7, phase:"Qualidade", emoji:"⭐", color:"#059669",
    theme:"Adjetivos, 很/太 e Também/Todos",
    built:false, builtNote:"",
    stats:{words:"~19 novas (HSK 1)",newHSK2:"17",grammar:"很/非常 · 太…了 · 也/都",chars:"+10 novos"},
    vocab:[
      {h:"大",py:"dà",pt:"grande"},
      {h:"小",py:"xiǎo",pt:"pequeno"},
      {h:"好",py:"hǎo",pt:"bom; bem"},
      {h:"冷",py:"lěng",pt:"frio"},
      {h:"热",py:"rè",pt:"quente"},
      {h:"多",py:"duō",pt:"muito, muitos"},
      {h:"少",py:"shǎo",pt:"pouco; menos"},
      {h:"忙",py:"máng",pt:"ocupado"},
      {h:"高兴",py:"gāoxìng",pt:"alegre, feliz"},
      {h:"漂亮",py:"piàoliang",pt:"bonito/a, lindo/a"},
      {h:"非常",py:"fēicháng",pt:"muito, extremamente"},
      {h:"很",py:"hěn",pt:"muito"},
      {h:"太",py:"tài",pt:"demais; muito (excessivo)"},
      {h:"也",py:"yě",pt:"também"},
      {h:"都",py:"dōu",pt:"todos; ambos"},
      {h:"不",py:"bù",pt:"não"},
      {h:"没有",py:"méiyǒu",pt:"não ter; não"}
    ],
    grammar:[
      {struct:"很/非常 + Adj",label:"Adjetivos com Intensificadores",color:"#6366F1",exp:"很 + adj = muito. 非常 = muitíssimo (mais forte). Sem intensificador, o adj parece comparativo: 他高 (implica \"mais alto que alguém\"). Use 很 como default.",exs:[{cn:"她很漂亮，非常聪明！",py:"Tā hěn piàoliang, fēicháng cōngmíng!",pt:"Ela é muito bonita e muitíssimo inteligente!"},{cn:"今天天气非常好，不冷也不热。",py:"Jīntiān tiānqì fēicháng hǎo, bù lěng yě bú rè.",pt:"O tempo hoje está ótimo, nem frio nem quente."}]},
      {struct:"太 + Adj + 了",label:"Excesso com 太...了",color:"#D97706",exp:"太 + adj + 了 = excessivamente / que (exclamação). Positivo na fala: 太好了(que ótimo!), 太棒了(incrível!). Negativo: 太贵了(caro demais). 了 no final é obrigatório.",exs:[{cn:"这个太贵了，我买不起。",py:"Zhège tài guì le, wǒ mǎi bù qǐ.",pt:"Isso é caro demais, não posso comprar."},{cn:"太好了！你来了！",py:"Tài hǎo le! Nǐ lái le!",pt:"Que ótimo! Você veio!"}]},
      {struct:"也/都",label:"Também / Todos",color:"#059669",exp:"也 = também (foco em 1 sujeito). 都 = todos/tudo (foco em grupo/totalidade). Posição: antes do verbo. Combinados: 也都(também todos). NUNCA no final da frase.",exs:[{cn:"我喜欢吃饺子，他也喜欢。",py:"Wǒ xǐhuan chī jiǎozi, tā yě xǐhuan.",pt:"Gosto de comer gyoza, ele também gosta."},{cn:"我们都是学生。",py:"Wǒmen dōu shì xuésheng.",pt:"Todos nós somos estudantes."}]}
    ],
    dialogue:[
      {sp:"A",cn:"你觉得中国怎么样？",py:"Nǐ juéde Zhōngguó zěnmeyàng?",pt:"O que você acha da China?"},
      {sp:"B",cn:"非常好！中国菜很好吃，人也很友好。",py:"Fēicháng hǎo! Zhōngguó cài hěn hǎochī, rén yě hěn yǒuhǎo.",pt:"Ótimo! A comida chinesa é deliciosa e as pessoas são muito simpáticas."},
      {sp:"A",cn:"中国大不大？",py:"Zhōngguó dà bú dà?",pt:"A China é grande?"},
      {sp:"B",cn:"非常大！中国很大，很漂亮，也很热闹。",py:"Fēicháng dà! Zhōngguó hěn dà, hěn piàoliang, yě hěn rènao.",pt:"Muitíssimo grande! É linda e animada também."},
      {sp:"A",cn:"你最喜欢哪个城市？",py:"Nǐ zuì xǐhuan nǎge chéngshì?",pt:"Qual cidade você mais gosta?"},
      {sp:"B",cn:"我很喜欢北京和上海，都很好看！",py:"Wǒ hěn xǐhuan Běijīng hé Shànghǎi, dōu hěn hǎokàn!",pt:"Gosto muito de Pequim e Xangai, as duas são lindas!"}
    ],
    quiz:[
      {q:"Qual a ordem CORRETA para intensificadores?",opts:["Adj + 很","很 + Adj","太 + Adj + 了","B e C corretas"],ans:3,exp:"✅ 很 + Adj (ex: 很好) E 太 + Adj + 了 (ex: 太好了). Note: 太 exige 了 no final. 很 não precisa de 了 (na maioria dos casos)."},
      {q:"A diferença entre 也 e 都:",opts:["São iguais","也 = também (um); 都 = todos/tudo","都 = também; 也 = todos","Ambos = todos"],ans:1,exp:"✅ 也 = também (foco num sujeito que TAMBÉM faz algo). 都 = todos, tudo (foco na totalidade). 我们都喜欢(todos gostamos) vs 我也喜欢(eu também gosto)."},
      {q:"\"Muito bonita\" em chinês:",opts:["非常漂亮是","非常漂亮","漂亮非常","很非常漂亮"],ans:1,exp:"✅ 非常漂亮 — Advérbio (非常) vem ANTES do adjetivo (漂亮). Intensidade: 有点儿 < 比较 < 很 < 非常 < 极了 < 太...了. Nunca combine: 很非常 ❌"},
      {q:"不 muda para bú antes de:",opts:["Todo tom 3","Todo tom 4","Todo tom 1","Nenhum tom"],ans:1,exp:"✅ 不 (bù) → bú antes de tom 4. Ex: 不要 → bú yào. 不对 → bú duì. Antes de tons 1,2,3: permanece bù. Isto é essencial para a pronúncia natural!"},
      {q:"\"Nós todos somos chineses\" =",opts:["我们也是中国人","我们都是中国人","都我们是中国人","我们是都中国人"],ans:1,exp:"✅ 我们都是中国人 — 都 vem ANTES do verbo 是. Estrutura: 我们(nós) + 都(todos) + 是(ser) + 中国人. 都 sempre fica entre sujeito e verbo."}
    ],
  },
  {
    w:8, phase:"Ações", emoji:"🎬", color:"#6366F1",
    theme:"Verbos Essenciais e Auxiliares 会/能/可以",
    built:false, builtNote:"",
    stats:{words:"~17 novas (HSK 1)",newHSK2:"19",grammar:"SVO · 吗/吧 · 会/能/可以",chars:"+10 novos"},
    vocab:[
      {h:"去",py:"qù",pt:"ir"},
      {h:"来",py:"lái",pt:"vir"},
      {h:"看",py:"kàn",pt:"ver; assistir; ler"},
      {h:"听",py:"tīng",pt:"ouvir, escutar"},
      {h:"说",py:"shuō",pt:"falar, dizer"},
      {h:"写",py:"xiě",pt:"escrever"},
      {h:"读",py:"dú",pt:"ler"},
      {h:"想",py:"xiǎng",pt:"querer; pensar"},
      {h:"开",py:"kāi",pt:"abrir; ligar; dirigir"},
      {h:"开车",py:"kāichē",pt:"dirigir (carro)"},
      {h:"坐",py:"zuò",pt:"sentar; viajar de (ônibus, metrô)"},
      {h:"能",py:"néng",pt:"poder; ser capaz"},
      {h:"可以",py:"kěyǐ",pt:"poder; pode ser; ótimo"},
      {h:"会",py:"huì",pt:"saber; poder; será que"},
      {h:"学习",py:"xuéxí",pt:"estudar, aprender"},
      {h:"工作",py:"gōngzuò",pt:"trabalhar; trabalho"},
      {h:"唱",py:"chàng",pt:"cantar"},
      {h:"看见",py:"kànjiàn",pt:"ver (com resultado)"},
      {h:"看病",py:"kànbìng",pt:"consultar o médico"}
    ],
    grammar:[
      {struct:"S + V + O",label:"Ordem SVO",color:"#7C3AED",exp:"Chinês é SVO como português. MAS: tempo e lugar vêm ANTES do verbo. E não há conjugação verbal — o verbo é invariável: 我去/你去/他去 (vou/vai/vai, todos iguais).",exs:[{cn:"我每天学习中文。",py:"Wǒ měitiān xuéxí Zhōngwén.",pt:"Estudo chinês todo dia."},{cn:"她昨天看了一个电影。",py:"Tā zuótiān kàn le yí gè diànyǐng.",pt:"Ela assistiu um filme ontem."}]},
      {struct:"V + 吗？/ V + 吧？",label:"Perguntas Sim/Não",color:"#DC2626",exp:"吗 = pergunta sim/não (espera uma resposta). 吧 = confirmação suave / sugestão (espera concordância). Ambas vão no FINAL da frase. Ordem não muda!",exs:[{cn:"你是中国人吗？—— 不是，我是巴西人。",py:"Nǐ shì Zhōngguórén ma? —— Bú shì, wǒ shì Bāxīrén.",pt:"Você é chinês? —— Não, sou brasileiro."},{cn:"我们一起去吧！—— 好的！",py:"Wǒmen yīqǐ qù ba! —— Hǎo de!",pt:"Vamos juntos! —— Ótimo!"}]},
      {struct:"会/能/可以",label:"Auxiliares de Capacidade",color:"#059669",exp:"会 = saber fazer (habilidade). 能 = conseguir (capacidade/condição). 可以 = pode (permissão). 会中文 = sabe chinês. 能来 = consegue vir. 可以进来 = pode entrar.",exs:[{cn:"你会说中文吗？—— 会一点儿。",py:"Nǐ huì shuō Zhōngwén ma? —— Huì yīdiǎnr.",pt:"Você sabe falar chinês? —— Um pouco."},{cn:"我能帮你吗？—— 当然可以！",py:"Wǒ néng bāng nǐ ma? —— Dāngrán kěyǐ!",pt:"Posso te ajudar? —— Claro!"}]}
    ],
    dialogue:[
      {sp:"A",cn:"你周末做什么？",py:"Nǐ zhōumò zuò shénme?",pt:"O que você faz no fim de semana?"},
      {sp:"B",cn:"我去看电影，也去图书馆看书。你呢？",py:"Wǒ qù kàn diànyǐng, yě qù túshūguǎn kàn shū. Nǐ ne?",pt:"Vou ao cinema e também à biblioteca. E você?"},
      {sp:"A",cn:"我喜欢听音乐和唱歌。",py:"Wǒ xǐhuan tīng yīnyuè hé chànggē.",pt:"Gosto de ouvir música e cantar."},
      {sp:"B",cn:"你唱得好吗？",py:"Nǐ chàng de hǎo ma?",pt:"Você canta bem?"},
      {sp:"A",cn:"还可以！你想一起听音乐吗？",py:"Hái kěyǐ! Nǐ xiǎng yīqǐ tīng yīnyuè ma?",pt:"Mais ou menos! Você quer ouvir música juntos?"},
      {sp:"B",cn:"好的！太好了！",py:"Hǎo de! Tài hǎo le!",pt:"Ótimo! Que bom!"}
    ],
    quiz:[
      {q:"A ordem SVO em chinês com tempo:",opts:["Tempo + S + V + O","S + V + Tempo + O","S + V + O + Tempo","O + V + S + Tempo"],ans:0,exp:"✅ Tempo + Sujeito + Verbo + Objeto. Ex: 今天我去学校 ou 我今天去学校. O tempo pode ir antes do sujeito ou depois do sujeito, mas NUNCA depois do verbo!"},
      {q:"\"Você pode entrar\" é:",opts:["你是可以进来","你进来可以","你可以进来","可以你进来"],ans:2,exp:"✅ 你可以进来 — Modais (会/能/可以/想/要) sempre ficam ENTRE sujeito e verbo principal. Estrutura: S + modal + V."},
      {q:"Qual é ERRADO?",opts:["我正在吃饭","我在吃饭呢","我吃饭正在","我在吃饭"],ans:2,exp:"✅ 我吃饭正在 ❌ — 正在 deve vir ANTES do verbo: 正在 + V. As outras três formas são todas corretas para expressar ação em andamento."},
      {q:"会 vs 能 vs 可以:",opts:["Todos iguais","会=habilidade; 能=condição; 可以=permissão","能=habilidade; 会=condição; 可以=permissão","Apenas 可以 para \"poder\""],ans:1,exp:"✅ 会(saber fazer — aprendido), 能(conseguir — condição presente), 可以(permissão/possibilidade). Ex: 我会游泳 mas 我今天不能游(condição), 这里可以游泳吗(permitido?)."},
      {q:"\"Você gosta de cantar?\" em chinês:",opts:["你唱歌喜欢吗？","你喜欢唱歌吗？","唱歌你喜欢吗？","你喜欢吗唱歌？"],ans:1,exp:"✅ 你喜欢唱歌吗？— 喜欢 (gostar) + verbo. 吗 sempre no final. A pergunta é formada apenas adicionando 吗 no final, sem mudar a ordem da frase."}
    ],
  },
  {
    w:9, phase:"Estudo", emoji:"📚", color:"#D97706",
    theme:"Escola, Aprender Chinês e Progressivo",
    built:false, builtNote:"",
    stats:{words:"~17 novas (HSK 1)",newHSK2:"12",grammar:"学/学习 · 汉字结构 · 正在",chars:"+10 novos"},
    vocab:[
      {h:"汉语",py:"Hànyǔ",pt:"língua chinesa (mandarim)"},
      {h:"汉字",py:"Hànzì",pt:"caracteres chineses"},
      {h:"中文",py:"Zhōngwén",pt:"língua/escrita chinesa"},
      {h:"国",py:"guó",pt:"país, nação"},
      {h:"同学",py:"tóngxué",pt:"colega de classe"},
      {h:"读书",py:"dúshū",pt:"estudar, ler"},
      {h:"第",py:"dì",pt:"(prefixo ordinal)"},
      {h:"电脑",py:"diànnǎo",pt:"computador"},
      {h:"手机",py:"shǒujī",pt:"celular"},
      {h:"电话",py:"diànhuà",pt:"telefone"},
      {h:"电视",py:"diànshì",pt:"televisão"},
      {h:"电影",py:"diànyǐng",pt:"filme"}
    ],
    grammar:[
      {struct:"学 + Noun/Verb",label:"Aprender (学)",color:"#6366F1",exp:"学 = aprender; estudar. 学习 = estudar (ato de estudar). 学中文 = aprender chinês. 学生 = estudante. 学校 = escola. 大学 = universidade.",exs:[{cn:"我在学校学习汉语。",py:"Wǒ zài xuéxiào xuéxí Hànyǔ.",pt:"Estou aprendendo mandarim na escola."},{cn:"她在大学学什么？—— 她学中文和历史。",py:"Tā zài dàxué xué shénme? —— Tā xué Zhōngwén hé lìshǐ.",pt:"O que ela estuda na universidade? —— Chinês e história."}]},
      {struct:"汉字 Structura",label:"Lógica dos Caracteres",color:"#D97706",exp:"Caracteres têm radicais que indicam significado. 语(idioma), 话(fala), 说(dizer) — todos têm 讠(radical da fala). 学(aprender) + 生(nascido) = 学生(estudante). 学(aprender) + 校(escola) = 学校.",exs:[{cn:"汉字很有意思！",py:"Hànzì hěn yǒu yìsi!",pt:"Os caracteres chineses são muito interessantes!"},{cn:"这个汉字怎么写？—— 这样写。",py:"Zhège Hànzì zěnme xiě? —— Zhèyàng xiě.",pt:"Como se escreve este caractere? —— Assim."}]},
      {struct:"正在 + V",label:"Progressivo — Estar Fazendo",color:"#059669",exp:"正在 + verbo = estar fazendo agora. Pode reduzir para 在 sozinho. No final: (呢) opcional. 我正在学习 = estou estudando (agora).",exs:[{cn:"你在做什么？—— 我正在学习。",py:"Nǐ zài zuò shénme? —— Wǒ zhèngzài xuéxí.",pt:"O que você está fazendo? —— Estou estudando."},{cn:"他在看电视呢。不要打扰他。",py:"Tā zài kàn diànshì ne. Bú yào dǎrǎo tā.",pt:"Ele está assistindo TV. Não o incomode."}]}
    ],
    dialogue:[
      {sp:"A",cn:"你在哪里学习中文？",py:"Nǐ zài nǎlǐ xuéxí Zhōngwén?",pt:"Onde você estuda chinês?"},
      {sp:"B",cn:"我在一所大学学习，老师很好。",py:"Wǒ zài yì suǒ dàxué xuéxí, lǎoshī hěn hǎo.",pt:"Estudo em uma universidade, o professor é ótimo."},
      {sp:"A",cn:"你学了多长时间了？",py:"Nǐ xué le duō cháng shíjiān le?",pt:"Há quanto tempo você estuda?"},
      {sp:"B",cn:"学了六个月了。中文很难，但是很有意思。",py:"Xué le liù gè yuè le. Zhōngwén hěn nán, dànshì hěn yǒu yìsi.",pt:"Há seis meses. O chinês é difícil, mas muito interessante."},
      {sp:"A",cn:"你的汉字写得怎么样？",py:"Nǐ de Hànzì xiě de zěnmeyàng?",pt:"Como estão seus caracteres?"},
      {sp:"B",cn:"还不好，但是我每天练习！",py:"Hái bù hǎo, dànshì wǒ měitiān liànxí!",pt:"Ainda não estão bons, mas pratico todo dia!"}
    ],
    quiz:[
      {q:"\"Estudo na universidade\" em chinês:",opts:["我学习在大学","我在大学学习","大学我学习在","在大学我学习"],ans:1,exp:"✅ 我在大学学习 — Lugar (在大学) vem ANTES do verbo (学习). Ordem: S + 在+lugar + V + O. Assim como tempo, lugar fica antes do verbo em chinês."},
      {q:"学习 vs 学:",opts:["São iguais","学习 = estudar (ato de estudar); 学 = aprender (habilidade)","学 = estudar; 学习 = escola","学习 é mais formal, 学 é mais coloquial"],ans:1,exp:"✅ 学 = aprender (+ objeto: 学中文). 学习 = estudar (mais formal, sem objeto necessário). Ambos corretos no cotidiano, mas 学习 pode não ter objeto diretamente."},
      {q:"\"Estou estudando agora\" é:",opts:["我学习现在","现在我学习","我正在学习","我学习在正"],ans:2,exp:"✅ 我正在学习 — 正在 + V = progressivo. Também correto: 我在学习, 我正学习. 呢 pode ser adicionado no final: 我正在学习呢."},
      {q:"Qual não é uma disciplina/matéria?",opts:["汉语","数学","朋友","历史"],ans:2,exp:"✅ 朋友 = amigo (não é matéria). 汉语(chinês/mandarim), 数学(matemática), 历史(história) são disciplinas acadêmicas."},
      {q:"\"O professor explicou o caractere\" =",opts:["老师解释汉字","汉字老师解释","老师汉字解释","解释老师汉字"],ans:0,exp:"✅ 老师解释汉字 — SVO básico. Ordem direta: Sujeito (老师) + Verbo (解释) + Objeto (汉字)."}
    ],
  },
  {
    w:10, phase:"Saúde", emoji:"💊", color:"#DC2626",
    theme:"Corpo, Saúde e Expressar Sintomas",
    built:false, builtNote:"",
    stats:{words:"~17 novas (HSK 1)",newHSK2:"4",grammar:"身体表达 · 有点儿 · 要/需要",chars:"+10 novos"},
    vocab:[
      {h:"病",py:"bìng",pt:"doença; estar doente"},
      {h:"生病",py:"shēngbìng",pt:"ficar doente"},
      {h:"觉得",py:"juéde",pt:"achar, sentir, pensar"},
      {h:"休息",py:"xiūxi",pt:"descansar"}
    ],
    grammar:[
      {struct:"身体 + 哪里 + 不舒服",label:"Expressar Sintomas",color:"#DC2626",exp:"Para falar de saúde: 哪里不舒服(onde dói), 头疼(dor de cabeça), 发烧(febre). 看病 = ir ao médico. 吃药 = tomar remédio. 生病 = estar doente.",exs:[{cn:"你哪里不舒服？—— 我头很疼，可能发烧了。",py:"Nǐ nǎlǐ bù shūfu? —— Wǒ tóu hěn téng, kěnéng fāshāo le.",pt:"Onde você está sentindo? —— Minha cabeça dói muito, acho que tenho febre."},{cn:"你应该去医院看病。",py:"Nǐ yīnggāi qù yīyuàn kànbìng.",pt:"Você deveria ir ao médico."}]},
      {struct:"有点儿 + Adj",label:"Um Pouco Negativo (有点儿)",color:"#7C3AED",exp:"有点儿 + adj = um pouco (geralmente com conotação negativa ou de problema). 有点儿疼(dói um pouco), 有点儿冷(um pouco frio demais). Diferente de 一点儿(um pouquinho, neutro).",exs:[{cn:"我今天有点儿不舒服，有点儿头疼。",py:"Wǒ jīntiān yǒudiǎnr bù shūfu, yǒudiǎnr tóu téng.",pt:"Hoje estou um pouco mal, com leve dor de cabeça."},{cn:"这个菜有点儿咸，但是很好吃。",py:"Zhège cài yǒudiǎnr xián, dànshì hěn hǎochī.",pt:"Este prato é um pouco salgado, mas muito gostoso."}]},
      {struct:"要/需要 + V",label:"Precisar / Ter que",color:"#059669",exp:"要 = querer / ter que (contexto define). 需要 = precisar (necessidade). 应该 = dever (moralmente). 必须 = ter que (obrigação). Negação: 不要(não faça), 不需要(não precisa).",exs:[{cn:"你需要吃药休息。",py:"Nǐ xūyào chī yào xiūxi.",pt:"Você precisa tomar remédio e descansar."},{cn:"明天我不要去医院，我感觉好多了。",py:"Míngtiān wǒ bú yào qù yīyuàn, wǒ gǎnjué hǎo duō le.",pt:"Amanhã não preciso ir ao médico, me sinto muito melhor."}]}
    ],
    dialogue:[
      {sp:"A",cn:"你今天不舒服吗？",py:"Nǐ jīntiān bù shūfu ma?",pt:"Você está se sentindo mal hoje?"},
      {sp:"B",cn:"是的，我头很疼，有点儿发烧。",py:"Shì de, wǒ tóu hěn téng, yǒudiǎnr fāshāo.",pt:"É, minha cabeça dói muito e tenho um pouco de febre."},
      {sp:"A",cn:"你应该去医院看病。",py:"Nǐ yīnggāi qù yīyuàn kànbìng.",pt:"Você deveria ir ao médico."},
      {sp:"B",cn:"我不想去，我吃药休息就可以了。",py:"Wǒ bù xiǎng qù, wǒ chī yào xiūxi jiù kěyǐ le.",pt:"Não quero ir, tomar remédio e descansar deve bastar."},
      {sp:"A",cn:"不行，你的脸很红，要去医院！",py:"Bùxíng, nǐ de liǎn hěn hóng, yào qù yīyuàn!",pt:"Não, seu rosto está muito vermelho, você tem que ir!"},
      {sp:"B",cn:"好吧，我去。谢谢你关心我。",py:"Hǎo ba, wǒ qù. Xièxie nǐ guānxīn wǒ.",pt:"Tudo bem, vou. Obrigado por se preocupar comigo."}
    ],
    quiz:[
      {q:"\"Minha cabeça dói\" em chinês:",opts:["我头很疼","我的头很疼","头我疼很","头疼我"],ans:0,exp:"✅ 我头很疼 ou 我的头很疼 — ambas corretas. 头 = cabeça. 疼 = doer. Com 很 para neutralizar a conotação comparativa de adjetivo isolado."},
      {q:"有点儿 vs 一点儿: qual a diferença?",opts:["São iguais","有点儿: um pouco (negativo antes adj); 一点儿: um pouco (neutro após adj)","一点儿: negativo; 有点儿: neutro","Apenas tonais"],ans:1,exp:"✅ 有点儿 + adj: sugere problema/reclamação (有点儿贵). 一点儿 + adj: neutro, geralmente em comparação (便宜一点儿). Posição é diferente!"},
      {q:"\"Você deveria ir ao médico\" =",opts:["你应该去看病","你去应该看病","应该你看病去","你看病应该去"],ans:0,exp:"✅ 你应该去看病 — 应该 = dever/deveria (moral). Como modal: S + 应该 + V. 看病 = consultar médico (literalmente: ver doença)."},
      {q:"要 em \"não precisa tomar remédio\" =",opts:["我不要吃药","我不需要吃药","要我不吃药","我吃药不要"],ans:1,exp:"✅ 我不需要吃药 — 需要 = precisar (necessidade). 不需要 = não precisa. 不要 = não quer / não faça! (imperativo). Diferença crucial: 不要 pode soar mais forte."},
      {q:"\"Meu rosto está vermelho\" em chinês:",opts:["我的脸红很","我的脸很红","脸红我的是","我很脸红"],ans:1,exp:"✅ 我的脸很红 — Estrutura normal: S(我的脸) + 很 + Adj(红). Note: 脸 = rosto/face, 红 = vermelho."}
    ],
  },
  {
    w:11, phase:"Viagem", emoji:"✈", color:"#7C3AED",
    theme:"Transporte, Direções e Clima",
    built:false, builtNote:"",
    stats:{words:"~15 novas (HSK 1)",newHSK2:"5",grammar:"坐/开/骑 · 怎么去 · 天气表达",chars:"+10 novos"},
    vocab:[
      {h:"飞机",py:"fēijī",pt:"avião"},
      {h:"火车",py:"huǒchē",pt:"trem"},
      {h:"出租车",py:"chūzūchē",pt:"táxi"},
      {h:"车",py:"chē",pt:"veículo"},
      {h:"到",py:"dào",pt:"chegar; ir até"}
    ],
    grammar:[
      {struct:"坐/开/骑 + 交通工具",label:"Meios de Transporte",color:"#6366F1",exp:"坐 = andar de (metrô/ônibus/trem). 开 = dirigir (carro). 骑 = pedalar/montar (bicicleta/cavalo). 乘 = mais formal para transporte público. 坐飞机 = de avião.",exs:[{cn:"我坐飞机去北京，坐了三个小时。",py:"Wǒ zuò fēijī qù Běijīng, zuò le sān gè xiǎoshí.",pt:"Fui de avião para Pequim, foram três horas de voo."},{cn:"他每天骑自行车去学校。",py:"Tā měitiān qí zìxíngchē qù xuéxiào.",pt:"Ele vai de bicicleta para a escola todo dia."}]},
      {struct:"怎么 + 去？",label:"Como Chegar (Direções)",color:"#D97706",exp:"怎么去？= como chegar? Resposta: 坐地铁(de metrô), 往左走(vire à esquerda), 直走(siga em frente), 到了(chegou). 从...到...(de...até...). Distância: 多远(quão longe).",exs:[{cn:"去机场怎么走？—— 坐地铁，很快。",py:"Qù jīchǎng zěnme zǒu? —— Zuò dìtiě, hěn kuài.",pt:"Como vou ao aeroporto? —— De metrô, é rápido."},{cn:"学校离这里远吗？—— 不远，走路十分钟。",py:"Xuéxiào lí zhèlǐ yuǎn ma? —— Bù yuǎn, zǒulù shí fēnzhōng.",pt:"A escola é longe daqui? —— Não, são 10 min a pé."}]},
      {struct:"下雨/刮风/下雪",label:"Fenômenos Climáticos",color:"#059669",exp:"下雨 = chover (下+雨). 刮风 = vento (刮+风). 下雪 = nevar. 晴 = ensolarado. 阴 = nublado. 天气预报 = previsão do tempo. Pergunta: 今天下雨吗？",exs:[{cn:"今天会下雨吗？—— 可能会，你带伞了吗？",py:"Jīntiān huì xià yǔ ma? —— Kěnéng huì, nǐ dài sǎn le ma?",pt:"Vai chover hoje? —— Talvez, você trouxe guarda-chuva?"},{cn:"北京的冬天经常刮风。",py:"Běijīng de dōngtiān jīngcháng guāfēng.",pt:"No inverno, Pequim é frequentemente ventosa."}]}
    ],
    dialogue:[
      {sp:"A",cn:"你怎么来学校的？",py:"Nǐ zěnme lái xuéxiào de?",pt:"Como você vem para a escola?"},
      {sp:"B",cn:"我坐地铁来，坐二十分钟。",py:"Wǒ zuò dìtiě lái, zuò èrshí fēnzhōng.",pt:"Venho de metrô, são vinte minutos."},
      {sp:"A",cn:"今天下雨，你带伞了吗？",py:"Jīntiān xià yǔ, nǐ dài sǎn le ma?",pt:"Hoje está chovendo, você trouxe guarda-chuva?"},
      {sp:"B",cn:"带了。你呢？你怎么来？",py:"Dài le. Nǐ ne? Nǐ zěnme lái?",pt:"Trouxe. E você? Como você veio?"},
      {sp:"A",cn:"我开车来，今天天气太差了。",py:"Wǒ kāichē lái, jīntiān tiānqì tài chà le.",pt:"Vim de carro, o tempo está péssimo hoje."},
      {sp:"B",cn:"是啊！北京的冬天经常下雨刮风。",py:"Shì a! Běijīng de dōngtiān jīngcháng xià yǔ guāfēng.",pt:"É! O inverno de Pequim costuma ter chuva e vento."}
    ],
    quiz:[
      {q:"\"Como vir de metrô?\" em chinês:",opts:["怎么坐地铁？","地铁怎么来？","怎么来地铁？","坐地铁怎么？"],ans:0,exp:"✅ 怎么坐地铁？ou 坐地铁怎么走？—怎么 + V = como fazer algo. 坐地铁 = ir de metrô. Ambas as versões corretas."},
      {q:"Qual verbo para ir de bicicleta?",opts:["坐自行车","开自行车","骑自行车","用自行车"],ans:2,exp:"✅ 骑 = pedalar / montar. 骑自行车(pedalar bicicleta), 骑马(montar cavalo). 坐 = sentar (metrô/ônibus/avião). 开 = dirigir (carro)."},
      {q:"\"Vai nevar amanhã\" =",opts:["明天下雪","明天会下雪","明天是下雪","A e B corretas"],ans:3,exp:"✅ 明天下雪 E 明天会下雪 são ambas corretas. 会 adiciona senso de \"provavelmente/vai\". Sem 会 é mais afirmativo, com 会 é mais provável/esperado."},
      {q:"怎么了？significa:",opts:["Como você está?","O que houve? O que aconteceu?","Como se faz?","Onde você está?"],ans:1,exp:"✅ 怎么了 = o que houve? o que aconteceu? Expressa preocupação. Diferente: 怎么样 (avaliação), 怎么 (como fazer), 为什么 (por quê)."},
      {q:"\"Pequim fica no norte da China\" =",opts:["北京在中国北方","中国北方在北京","北京北方在中国","在北京中国北方"],ans:0,exp:"✅ 北京在中国北方 — 在 + lugar. 北方 = norte/regiões do norte. 北京 = capital = norte. Compare: 上海在中国东部 (Xangai fica no leste da China)."}
    ],
  },
  {
    w:12, phase:"Revisão", emoji:"🏆", color:"#0891B2",
    theme:"Cultura Chinesa e Consolidação Final",
    built:false, builtNote:"",
    stats:{words:"~33 restantes (HSK 1)",newHSK2:"126",grammar:"复习所有语法",chars:"复习"},
    vocab:[
      {h:"爱",py:"ài",pt:"amar"},
      {h:"吧",py:"ba",pt:"(part. sugestão/confirmação)"},
      {h:"白天",py:"báitiān",pt:"durante o dia"},
      {h:"半",py:"bàn",pt:"metade"},
      {h:"杯子",py:"bēizi",pt:"copo, xícara"},
      {h:"边",py:"biān",pt:"lado, borda"},
      {h:"不要",py:"búyào",pt:"não faça; não queira"},
      {h:"穿",py:"chuān",pt:"vestir (roupa)"},
      {h:"打电话",py:"dǎ diànhuà",pt:"telefonar; ligar"},
      {h:"大家",py:"dàjiā",pt:"todos, todo mundo"},
      {h:"大学",py:"dàxué",pt:"universidade"},
      {h:"大学生",py:"dàxuéshēng",pt:"universitário/a"},
      {h:"的",py:"de",pt:"(part. possessiva/atributiva)"},
      {h:"点",py:"diǎn",pt:"ponto; hora (medida de tempo); um pouco"},
      {h:"对",py:"duì",pt:"correto; para; em relação a"},
      {h:"房间",py:"fángjiān",pt:"quarto, cômodo"},
      {h:"歌",py:"gē",pt:"música, canção"},
      {h:"狗",py:"gǒu",pt:"cachorro"},
      {h:"还",py:"hái",pt:"devolver"},
      {h:"和",py:"hé",pt:"e; com; junto"},
      {h:"后",py:"hòu",pt:"depois; atrás"},
      {h:"回",py:"huí",pt:"voltar, retornar"},
      {h:"几",py:"jǐ",pt:"quantos; alguns"},
      {h:"见",py:"jiàn",pt:"ver; encontrar"},
      {h:"叫",py:"jiào",pt:"chamar-se; chamar"},
      {h:"了",py:"le",pt:"(part. completiva/modal)"},
      {h:"里",py:"lǐ",pt:"dentro, interior"},
      {h:"两",py:"liǎng",pt:"dois (antes de med.); um par de"},
      {h:"吗",py:"ma",pt:"(part. de pergunta sim/não)"},
      {h:"猫",py:"māo",pt:"gato"},
      {h:"没事",py:"méishì",pt:"não tem nada; tudo bem"},
      {h:"名字",py:"míngzi",pt:"nome"},
      {h:"哪",py:"nǎ",pt:"qual; que"},
      {h:"那儿",py:"nàr",pt:"lá"},
      {h:"男",py:"nán",pt:"masculino; homem"},
      {h:"呢",py:"ne",pt:"(part. de pergunta/continuação)"},
      {h:"你们",py:"nǐmen",pt:"vocês"},
      {h:"女",py:"nǚ",pt:"feminino; mulher"},
      {h:"女士",py:"nǚshì",pt:"senhora"},
      {h:"起床",py:"qǐchuáng",pt:"levantar da cama"},
      {h:"千",py:"qiān",pt:"mil"},
      {h:"前",py:"qián",pt:"antes; frente"},
      {h:"请问",py:"qǐngwèn",pt:"com licença; posso perguntar?"},
      {h:"去年",py:"qùnián",pt:"ano passado"},
      {h:"人",py:"rén",pt:"pessoa, gente"},
      {h:"认识",py:"rènshi",pt:"compreensão; conhecimento; conhecer"},
      {h:"商店",py:"shāngdiàn",pt:"loja, comércio"},
      {h:"上班",py:"shàngbān",pt:"ir ao trabalho"},
      {h:"上课",py:"shàngkè",pt:"ter/ir à aula"},
      {h:"上午",py:"shàngwǔ",pt:"manhã (AM)"},
      {h:"上学",py:"shàngxué",pt:"ir à escola"},
      {h:"谁",py:"shéi",pt:"quem"},
      {h:"什么",py:"shénme",pt:"o quê; qual"},
      {h:"时候",py:"shíhou",pt:"momento, hora"},
      {h:"时间",py:"shíjiān",pt:"tempo"},
      {h:"事",py:"shì",pt:"assunto, coisa"},
      {h:"是",py:"shì",pt:"ser; estar"},
      {h:"书",py:"shū",pt:"livro"},
      {h:"书店",py:"shūdiàn",pt:"livraria"},
      {h:"水果",py:"shuǐguǒ",pt:"fruta"},
      {h:"睡",py:"shuì",pt:"dormir"},
      {h:"睡觉",py:"shuìjiào",pt:"dormir"},
      {h:"说话",py:"shuōhuà",pt:"falar, conversar"},
      {h:"岁",py:"suì",pt:"anos de idade"},
      {h:"他们",py:"tāmen",pt:"eles"},
      {h:"它们",py:"tāmen",pt:"eles/elas (coisas)"},
      {h:"她们",py:"tāmen",pt:"elas"},
      {h:"天",py:"tiān",pt:"dia; céu"},
      {h:"听见",py:"tīngjiàn",pt:"ouvir (com resultado)"},
      {h:"外",py:"wài",pt:"fora, exterior"},
      {h:"外边",py:"wàibian",pt:"lá fora"},
      {h:"玩",py:"wán",pt:"brincar; se divertir"},
      {h:"晚",py:"wǎn",pt:"tarde; noite"},
      {h:"晚饭",py:"wǎnfàn",pt:"jantar"},
      {h:"晚上",py:"wǎnshang",pt:"noite"},
      {h:"问",py:"wèn",pt:"perguntar"},
      {h:"问题",py:"wèntí",pt:"problema; questão; tema"},
      {h:"我们",py:"wǒmen",pt:"nós"},
      {h:"午饭",py:"wǔfàn",pt:"almoço"},
      {h:"喜欢",py:"xǐhuan",pt:"gostar de"},
      {h:"下班",py:"xiàbān",pt:"sair do trabalho"},
      {h:"下课",py:"xiàkè",pt:"terminar a aula"},
      {h:"下午",py:"xiàwǔ",pt:"tarde (PM)"},
      {h:"先生",py:"xiānsheng",pt:"senhor; marido"},
      {h:"小朋友",py:"xiǎopéngyǒu",pt:"criança"},
      {h:"小学",py:"xiǎoxué",pt:"escola primária"},
      {h:"小学生",py:"xiǎoxuéshēng",pt:"aluno do primário"},
      {h:"些",py:"xiē",pt:"alguns, algumas"},
      {h:"新",py:"xīn",pt:"novo"},
      {h:"星期",py:"xīngqī",pt:"semana; dia da semana"},
      {h:"星期日",py:"xīngqīrì",pt:"domingo"},
      {h:"星期天",py:"xīngqītiān",pt:"domingo"},
      {h:"学",py:"xué",pt:"aprender, estudar"},
      {h:"雪",py:"xuě",pt:"neve"},
      {h:"要",py:"yào",pt:"querer; precisar; ir (futuro)"},
      {h:"衣服",py:"yīfu",pt:"roupa"},
      {h:"医生",py:"yīshēng",pt:"médico/a"},
      {h:"一半",py:"yíbàn",pt:"metade"},
      {h:"一下",py:"yíxià",pt:"um momento; um pouco"},
      {h:"椅子",py:"yǐzi",pt:"cadeira"},
      {h:"一点儿",py:"yìdiǎnr",pt:"um pouco"},
      {h:"一些",py:"yìxiē",pt:"alguns/algumas"},
      {h:"有",py:"yǒu",pt:"ter; existir"},
      {h:"有的",py:"yǒude",pt:"alguns deles"},
      {h:"有点儿",py:"yǒudiǎnr",pt:"um pouco (ligeiramente)"},
      {h:"有些",py:"yǒuxiē",pt:"alguns, algumas"},
      {h:"雨",py:"yǔ",pt:"chuva"},
      {h:"元",py:"yuán",pt:"yuan (moeda)"},
      {h:"再",py:"zài",pt:"novamente, de novo"},
      {h:"早",py:"zǎo",pt:"cedo; bom dia"},
      {h:"早饭",py:"zǎofàn",pt:"café da manhã"},
      {h:"早上",py:"zǎoshang",pt:"manhã cedo"},
      {h:"怎么",py:"zěnme",pt:"como; de que jeito"},
      {h:"找",py:"zhǎo",pt:"procurar; encontrar"},
      {h:"这儿",py:"zhèr",pt:"aqui"},
      {h:"真",py:"zhēn",pt:"realmente; verdadeiro"},
      {h:"正在",py:"zhèngzài",pt:"estar fazendo; em andamento"},
      {h:"只",py:"zhī",pt:"apenas; só"},
      {h:"知道",py:"zhīdào",pt:"saber; conhecer"},
      {h:"中学",py:"zhōngxué",pt:"escola secundária"},
      {h:"中学生",py:"zhōngxuéshēng",pt:"aluno do ensino médio"},
      {h:"住",py:"zhù",pt:"morar; residir"},
      {h:"桌子",py:"zhuōzi",pt:"mesa"},
      {h:"字",py:"zì",pt:"caractere; letra"},
      {h:"做",py:"zuò",pt:"fazer"},
      {h:"做饭",py:"zuò fàn",pt:"cozinhar; preparar a comida"}
    ],
    grammar:[
      {struct:"中国文化",label:"Cultura e Tradições Chinesas",color:"#D97706",exp:"春节(Ano Novo Chinês), 中秋节(Festival do Meio-Outono), 端午节(Festival do Barco-dragão). Comida cultural: 饺子(gyoza/Ano Novo), 月饼(mooncake), 粽子(bolinho de arroz).",exs:[{cn:"过春节的时候，我们吃饺子。",py:"Guò Chūnjié de shíhou, wǒmen chī jiǎozi.",pt:"Na época do Ano Novo Chinês, comemos gyoza."},{cn:"中秋节快到了，你买月饼了吗？",py:"Zhōngqiūjié kuài dào le, nǐ mǎi yuèbǐng le ma?",pt:"O Festival do Meio-Outono está chegando, você já comprou mooncake?"}]},
      {struct:"复习：否定形式",label:"Revisão — Todas as Negações",color:"#6366F1",exp:"Tabela de negações: 不+V (hábito/futuro/adj), 没有+V (passado/experiência), 不+是 (não é), 没有+N (não tem), 别+V (não faça - imperativo).",exs:[{cn:"我不去，我没有时间，我也没有钱。",py:"Wǒ bù qù, wǒ méiyǒu shíjiān, wǒ yě méiyǒu qián.",pt:"Não vou, não tenho tempo, e também não tenho dinheiro."},{cn:"别说话！老师来了。",py:"Bié shuōhuà! Lǎoshī lái le.",pt:"Não fale! O professor chegou."}]},
      {struct:"疑问词 + 都/也",label:"Quantificadores Universais",color:"#DC2626",exp:"Questão + 都 = tudo/todos sem exceção. 什么都有(tem tudo). 哪里都去(vai a todos os lugares). 谁都知道(todo mundo sabe). Muito produtivo em chinês!",exs:[{cn:"我什么都想学！",py:"Wǒ shénme dōu xiǎng xué!",pt:"Quero aprender tudo!"},{cn:"这个超市什么都卖，很方便。",py:"Zhège chāoshì shénme dōu mài, hěn fāngbiàn.",pt:"Este supermercado vende tudo, é muito conveniente."}]}
    ],
    dialogue:[
      {sp:"A",cn:"你过春节吗？",py:"Nǐ guò Chūnjié ma?",pt:"Você celebra o Ano Novo Chinês?"},
      {sp:"B",cn:"过！春节是中国最重要的节日。",py:"Guò! Chūnjié shì Zhōngguó zuì zhòngyào de jiérì.",pt:"Celebro! O Ano Novo Chinês é o feriado mais importante da China."},
      {sp:"A",cn:"你们吃什么？",py:"Nǐmen chī shénme?",pt:"O que vocês comem?"},
      {sp:"B",cn:"我们北方人吃饺子，南方人吃年糕。",py:"Wǒmen běifāng rén chī jiǎozi, nánfāng rén chī niángāo.",pt:"Nós do norte comemos gyoza, o pessoal do sul come arroz glutinoso."},
      {sp:"A",cn:"太有意思了！中国文化真的很丰富。",py:"Tài yǒu yìsi le! Zhōngguó wénhuà zhēnde hěn fēngfù.",pt:"Muito interessante! A cultura chinesa é realmente rica."},
      {sp:"B",cn:"是啊！欢迎你来中国过节！",py:"Shì a! Huānyíng nǐ lái Zhōngguó guòjié!",pt:"É mesmo! Seja bem-vindo à China para celebrar!"}
    ],
    quiz:[
      {q:"复习: Qual negação é ERRADA?",opts:["我不去","我没有书","我不有书","我别去"],ans:2,exp:"✅ 我不有书 ❌ — 有 sempre nega com 没: 我没有书. 不有 é impossível! As outras: 不去(não ir), 没有书(não ter livro), 别去(não vá - imperativo) são todas corretas."},
      {q:"疑问词 + 都 = ?",opts:["Sempre negativo","Totalidade/universalidade","Apenas perguntas","Mais de dois itens"],ans:1,exp:"✅ 疑问词(什么/哪里/谁/几个) + 都 = totalidade: 什么都有(tem tudo), 哪里都去(vai a todos os lugares), 谁都知道(todo mundo sabe). Este padrão é muito comum!"},
      {q:"Como se diz \"Ano Novo Chinês\"?",opts:["中国年","新年","春节","农历节"],ans:2,exp:"✅ 春节 (Chūnjié) = Festival da Primavera = Ano Novo Lunar Chinês. 新年 = Ano Novo (ocidental ou lunar geral). 春节 é o mais específico e importante."},
      {q:"A estrutura 太...了 é usada para:",opts:["Sempre algo negativo","Excesso (positivo ou negativo)","Apenas perguntas","Pedidos educados"],ans:1,exp:"✅ 太...了 indica excesso, que pode ser positivo: 太好了(ótimo!), 太棒了(incrível!) ou negativo: 太贵了(caro demais). Contexto e tom determinam a valência."},
      {q:"\"Todo mundo gosta de comida chinesa\" =",opts:["每个人喜欢中国菜","大家都喜欢中国菜","中国菜喜欢大家","大家中国菜喜欢都"],ans:1,exp:"✅ 大家都喜欢中国菜 — 大家 = todo mundo. 都 antes do verbo para universalidade. Também correto: 每个人都喜欢(cada pessoa gosta). 大家都 é a forma mais comum."}
    ],
  }
];

export default function HSK1Completo() {
  const [week,    setWeek]    = useState(4);
  const [tab,     setTab]     = useState("vocab");
  const [showPy,  setShowPy]  = useState(true);
  const [openG,   setOpenG]   = useState(0);
  const [dlPy,    setDlPy]    = useState(true);
  const [answers, setAnswers] = useState({});
  const [revealed,setRevealed]= useState({});
  const [linePy,  setLinePy]  = useState({});

  const w = WEEKS.find(x => x.x === week) || WEEKS[week - 1];
  const dc = w.color;

  const correct  = Object.entries(answers).filter(([i,a]) => a === w.quiz[+i].ans).length;
  const answered = Object.keys(answers).length;

  const resetQuiz = () => { setAnswers({}); setRevealed({}); };

  const phaseOrder = [...new Set(WEEKS.map(x=>x.phase))];
  const phaseColor = { "Fundação":"#6366F1","Espaço":"#D97706","Natureza":"#0891B2","Cotidiano":"#DC2626","Saúde":"#7C3AED","Lazer":"#059669","Comunicação":"#D97706","Emoções":"#DC2626","Viagem":"#6366F1","Revisão":"#374151","Simulado":"#059669" };

  return (
    <div style={{ fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
                  background:sand, minHeight:"100vh", paddingBottom:"48px" }}>

      {/* HEADER */}
      <div style={{ background:ink, color:"white", padding:"24px 20px 20px" }}>
        <div style={{ maxWidth:"900px", margin:"0 auto" }}>
          <div style={{ display:"flex", gap:"8px", marginBottom:"10px", flexWrap:"wrap" }}>
            <span style={{ background:"#6366F1", borderRadius:"6px", padding:"3px 12px", fontSize:"12px", fontWeight:"700" }}>
              🇨🇳 Novo HSK 2 · Programa Completo
            </span>
            <span style={{ background:"rgba(255,255,255,0.12)", borderRadius:"6px", padding:"3px 12px", fontSize:"12px", fontWeight:"600" }}>
              12 Semanas · ~772 Palavras · 41 Pontos Gramaticais
            </span>
          </div>
          <h1 style={{ margin:"0 0 14px", fontSize:"clamp(18px,3.5vw,28px)", fontWeight:"900" }}>
            老师 · Cronograma HSK 2 — Todas as 12 Semanas
          </h1>

          {/* Week selector — phases */}
          <div style={{ display:"flex", gap:"4px", overflowX:"auto", paddingBottom:"4px" }}>
            {WEEKS.map(wx => (
              <button key={wx.w} onClick={()=>{setWeek(wx.w);setTab("vocab");resetQuiz();setLinePy({});}}
                style={{ padding:"7px 12px", borderRadius:"10px", border:"2px solid",
                         borderColor: week===wx.w ? "white" : "rgba(255,255,255,0.2)",
                         background: week===wx.w ? "white" : "transparent",
                         color: week===wx.w ? ink : "rgba(255,255,255,0.8)",
                         fontWeight:"800", fontSize:"12px", cursor:"pointer",
                         whiteSpace:"nowrap", transition:"all 0.15s", flexShrink:0,
                         display:"flex", flexDirection:"column", alignItems:"center", gap:"2px" }}>
                <span style={{ fontSize:"16px" }}>{wx.emoji}</span>
                <span>S{wx.w}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:"900px", margin:"0 auto", padding:"0 16px" }}>

        {/* Week header */}
        <div style={{ background:"white", borderRadius:"14px", padding:"16px 20px",
                      margin:"16px 0 4px", border:`1px solid ${bdr}`,
                      boxShadow:"0 2px 8px rgba(15,23,42,0.06)",
                      borderLeft:`5px solid ${dc}` }}>
          <div style={{ display:"flex", alignItems:"flex-start", gap:"14px", flexWrap:"wrap" }}>
            <div style={{ width:"48px", height:"48px", borderRadius:"12px", background:dc,
                          color:"white", display:"flex", flexDirection:"column",
                          alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <span style={{ fontSize:"10px", fontWeight:"700", opacity:0.8 }}>SEM</span>
              <span style={{ fontSize:"20px", fontWeight:"900", lineHeight:1 }}>{w.w}</span>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", gap:"8px", alignItems:"center", marginBottom:"3px", flexWrap:"wrap" }}>
                <span style={{ fontWeight:"900", color:ink, fontSize:"16px" }}>{w.theme}</span>
                <span style={{ fontSize:"11px", fontWeight:"700", color:dc,
                               background:`${dc}12`, padding:"2px 8px", borderRadius:"10px" }}>
                  {w.phase}
                </span>
              </div>
              <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
                {[["📖",w.stats.words],["🆕",w.stats.newHSK2+" novas"],["📐",w.stats.grammar],["✍️",w.stats.chars]].map(([e,v])=>(
                  <span key={v} style={{ fontSize:"12px", color:muted }}>{e} {v}</span>
                ))}
              </div>
            </div>
          </div>
          {w.built && (
            <div style={{ marginTop:"10px", padding:"8px 12px", background:"#EEF2FF",
                          border:"1px solid #C7D2FE", borderRadius:"8px",
                          fontSize:"12px", color:"#3730A3", fontWeight:"600" }}>
              📁 {w.builtNote}
            </div>
          )}
        </div>

        {/* Tab selector */}
        <div style={{ display:"flex", gap:"6px", padding:"10px 0 4px", overflowX:"auto" }}>
          {[["vocab","📚 Vocab"],["grammar","📐 Gramática"],["dialogue","💬 Diálogo"],["quiz","✏️ Quiz (5Q)"]].map(([id,lbl])=>(
            <button key={id} onClick={()=>setTab(id)} style={{
              padding:"8px 16px", borderRadius:"9px", border:"2px solid",
              borderColor:tab===id?dc:bdr, background:tab===id?dc:"white",
              color:tab===id?"white":muted, fontWeight:"700", fontSize:"13px",
              cursor:"pointer", whiteSpace:"nowrap", transition:"all 0.15s", flexShrink:0 }}>
              {lbl}
            </button>
          ))}
        </div>

        {/* ── VOCABULÁRIO */}
        {tab==="vocab" && (
          <div style={{ paddingTop:"16px" }}>
            <div style={{ display:"flex", gap:"8px", marginBottom:"14px", flexWrap:"wrap", alignItems:"center" }}>
              <button onClick={()=>setShowPy(v=>!v)} style={{
                padding:"6px 12px", borderRadius:"8px",
                border:`2px solid ${showPy?"#D97706":bdr}`,
                background:showPy?"#FFFBEB":"white", color:showPy?"#92400E":muted,
                fontWeight:"700", fontSize:"12px", cursor:"pointer" }}>
                {showPy?"🙈 Modo Desafio":"👁 Mostrar Pinyin"}
              </button>
              <span style={{ fontSize:"13px", color:muted }}>{w.vocab.length} palavras</span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:"10px" }}>
              {w.vocab.map((wd,i)=>(
                <div key={i} style={{ background:"white", borderRadius:"12px", padding:"12px 10px",
                                       textAlign:"center", boxShadow:"0 2px 8px rgba(15,23,42,0.07)",
                                       border:`1px solid ${bdr}` }}>
                  <div style={{ fontSize:"26px", fontWeight:"900", color:dc,
                                fontFamily:"'Noto Sans SC','PingFang SC',sans-serif",
                                marginBottom:"5px" }}>{wd.h}</div>
                  {showPy && <>
                    <div style={{ fontSize:"13px", fontWeight:"700", color:"#6366F1", marginBottom:"2px" }}>{wd.py}</div>
                    <div style={{ fontSize:"12px", color:muted }}>{wd.pt}</div>
                  </>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── GRAMÁTICA */}
        {tab==="grammar" && (
          <div style={{ paddingTop:"16px" }}>
            {w.grammar.map((g,i)=>(
              <div key={i} style={{ background:"white", borderRadius:"14px", overflow:"hidden",
                                     boxShadow:"0 2px 12px rgba(15,23,42,0.07)",
                                     border:`1px solid ${bdr}`, marginBottom:"12px" }}>
                <button onClick={()=>setOpenG(openG===i?-1:i)} style={{
                  width:"100%", padding:"16px 20px", background:"none", border:"none",
                  cursor:"pointer", display:"flex", alignItems:"center", gap:"12px", textAlign:"left" }}>
                  <div style={{ width:"4px", alignSelf:"stretch", borderRadius:"2px", background:g.color, flexShrink:0 }}/>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:"11px", fontWeight:"700", color:g.color,
                                  textTransform:"uppercase", letterSpacing:"1px", marginBottom:"2px" }}>{g.label}</div>
                    <div style={{ fontFamily:"monospace", fontWeight:"800", color:ink, fontSize:"14px" }}>{g.struct}</div>
                  </div>
                  <span style={{ color:muted, fontSize:"16px", transition:"transform 0.2s",
                                 transform:openG===i?"rotate(180deg)":"none" }}>▾</span>
                </button>
                {openG===i && (
                  <div style={{ padding:"0 20px 18px", borderTop:`1px solid ${bdr}` }}>
                    <div style={{ background:`${g.color}08`, border:`1px solid ${g.color}20`,
                                  borderRadius:"10px", padding:"12px 14px", margin:"12px 0",
                                  fontSize:"13px", color:"#334155", lineHeight:"1.7" }}>{g.exp}</div>
                    {g.exs.map((ex,ei)=>(
                      <div key={ei} style={{ borderLeft:`3px solid ${g.color}`, paddingLeft:"14px", marginBottom:"12px" }}>
                        <div style={{ fontSize:"18px", fontWeight:"700", color:ink,
                                      fontFamily:"'Noto Sans SC','PingFang SC',sans-serif",
                                      marginBottom:"3px" }}>{ex.cn}</div>
                        <div style={{ fontSize:"12px", color:"#6366F1", fontWeight:"600", marginBottom:"2px" }}>{ex.py}</div>
                        <div style={{ fontSize:"12px", color:muted }}>{ex.pt}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── DIÁLOGO */}
        {tab==="dialogue" && (
          <div style={{ paddingTop:"16px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"12px", flexWrap:"wrap", gap:"8px" }}>
              <p style={{ color:muted, fontSize:"13px", margin:0 }}>Leia em voz alta! Identifique as estruturas gramaticais da semana.</p>
              <button onClick={()=>setDlPy(v=>!v)} style={{
                padding:"6px 12px", borderRadius:"8px", border:`2px solid ${dlPy?"#D97706":bdr}`,
                background:dlPy?"#FFFBEB":"white", color:dlPy?"#92400E":muted,
                fontWeight:"700", fontSize:"12px", cursor:"pointer" }}>
                {dlPy?"🙈 Sem Pinyin":"👁 Pinyin"}
              </button>
            </div>
            <div style={{ background:"white", borderRadius:"14px", overflow:"hidden",
                          boxShadow:"0 2px 12px rgba(15,23,42,0.07)", border:`1px solid ${bdr}` }}>
              <div style={{ background:dc, color:"white", padding:"12px 18px" }}>
                <div style={{ fontWeight:"800", fontSize:"15px" }}>💬 Diálogo — Semana {w.w}</div>
              </div>
              {w.dialogue.map((line,i)=>{
                const isA=line.sp==="A";
                return (
                  <div key={i} style={{ display:"flex", flexDirection:isA?"row":"row-reverse",
                                         gap:"10px", padding:"12px 16px",
                                         borderBottom:i<w.dialogue.length-1?`1px solid ${bdr}`:"none",
                                         background:i%2===0?"white":"#FAFAF8", alignItems:"flex-start" }}>
                    <div style={{ width:"28px", height:"28px", borderRadius:"50%",
                                  background:isA?dc:"#94A3B8", color:"white",
                                  display:"flex", alignItems:"center", justifyContent:"center",
                                  fontWeight:"800", fontSize:"12px", flexShrink:0 }}>{line.sp}</div>
                    <div style={{ flex:1, textAlign:isA?"left":"right" }}>
                      <div style={{ fontSize:"17px", fontWeight:"700", color:ink,
                                    fontFamily:"'Noto Sans SC','PingFang SC',sans-serif",
                                    marginBottom:"3px", lineHeight:"1.5" }}>{line.cn}</div>
                      {dlPy&&<div style={{ fontSize:"12px", color:"#6366F1", fontWeight:"600", marginBottom:"2px" }}>{line.py}</div>}
                      <div style={{ fontSize:"12px", color:muted }}>{line.pt}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── QUIZ */}
        {tab==="quiz" && (
          <div style={{ paddingTop:"16px" }}>
            {answered===w.quiz.length && (
              <div style={{ background:correct>=4?"#ECFDF5":"#FFFBEB",
                            border:`2px solid ${correct>=4?"#059669":"#D97706"}`,
                            borderRadius:"12px", padding:"18px", marginBottom:"18px", textAlign:"center" }}>
                <div style={{ fontSize:"32px", marginBottom:"6px" }}>{correct===5?"🏆":correct>=3?"🎉":"💪"}</div>
                <div style={{ fontWeight:"800", fontSize:"20px",
                              color:correct>=4?"#065F46":"#92400E" }}>{correct}/5 corretas</div>
                <div style={{ fontSize:"13px", color:muted, marginTop:"4px" }}>
                  {correct===5?"Perfeito! Semana "+w.w+" dominada!":
                   correct>=3?"Bom! Revise os pontos que errou.":"Releia a gramática e tente novamente."}
                </div>
                <button onClick={resetQuiz} style={{ marginTop:"10px", padding:"7px 18px",
                  borderRadius:"8px", background:ink, color:"white", border:"none",
                  fontWeight:"700", fontSize:"13px", cursor:"pointer" }}>🔄 Tentar novamente</button>
              </div>
            )}
            {w.quiz.map((q,i)=>{
              const sel=answers[i]; const rev=revealed[i];
              return (
                <div key={i} style={{ background:"white", borderRadius:"12px", padding:"16px",
                                       border:`1px solid ${bdr}`, marginBottom:"10px",
                                       boxShadow:"0 2px 8px rgba(15,23,42,0.06)" }}>
                  <div style={{ display:"flex", gap:"10px", marginBottom:"12px" }}>
                    <div style={{ width:"24px", height:"24px", borderRadius:"7px", background:ink,
                                  color:"white", display:"flex", alignItems:"center",
                                  justifyContent:"center", fontWeight:"800", fontSize:"12px", flexShrink:0 }}>{i+1}</div>
                    <div style={{ fontSize:"14px", fontWeight:"700", color:ink, lineHeight:"1.5" }}>{q.q}</div>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:"7px", marginBottom:"10px" }}>
                    {q.opts.map((opt,j)=>{
                      const chosen=sel===j, right=j===q.ans;
                      let bg="white",bc=bdr,col="#374151";
                      if(chosen||rev){if(right){bg="#ECFDF5";bc="#059669";col="#065F46";}
                        else if(chosen){bg="#FEF2F2";bc="#DC2626";col="#991B1B";}}
                      return (
                        <button key={j} onClick={()=>{
                          if(sel===undefined){setAnswers(a=>({...a,[i]:j}));setRevealed(r=>({...r,[i]:true}));}
                        }} style={{ padding:"9px 12px", borderRadius:"8px", border:`2px solid ${bc}`,
                                   background:bg, color:col, textAlign:"left",
                                   fontWeight:(chosen||(rev&&right))?"700":"500",
                                   fontSize:"13px", cursor:sel===undefined?"pointer":"default",
                                   display:"flex", alignItems:"center", gap:"8px", transition:"all 0.15s",
                                   fontFamily:opt.match(/[\u4e00-\u9fff]/)?"'Noto Sans SC',sans-serif,inherit":"inherit" }}>
                          <span style={{ width:"19px", height:"19px", borderRadius:"50%",
                                         border:`2px solid ${bc}`, display:"flex", alignItems:"center",
                                         justifyContent:"center", fontSize:"10px", fontWeight:"800", flexShrink:0,
                                         background:(right&&rev)?"#059669":(chosen&&!right)?"#DC2626":"transparent",
                                         color:(right&&rev)||(chosen&&!right)?"white":col }}>
                            {rev?(right?"✓":chosen?"✗":String.fromCharCode(65+j)):String.fromCharCode(65+j)}
                          </span>{opt}
                        </button>
                      );
                    })}
                  </div>
                  {rev&&<div style={{ background:sel===q.ans?"#ECFDF5":"#FFFBEB",
                                      border:`1px solid ${sel===q.ans?"#6EE7B7":"#FDE68A"}`,
                                      borderRadius:"8px", padding:"8px 10px",
                                      fontSize:"12px", color:sel===q.ans?"#065F46":"#92400E",
                                      lineHeight:"1.6" }}>{q.exp}</div>}
                </div>
              );
            })}
            {answered<w.quiz.length&&<div style={{ textAlign:"center",color:muted,fontSize:"12px",padding:"6px" }}>
              {answered}/{w.quiz.length} respondidas
            </div>}
          </div>
        )}

        {/* Navigation */}
        <div style={{ background:"white", border:`1px solid ${bdr}`, borderRadius:"12px",
                      padding:"12px 18px", marginTop:"20px",
                      display:"flex", justifyContent:"space-between", alignItems:"center", gap:"10px" }}>
          <button onClick={()=>{if(week>1){setWeek(w=>w-1);setTab("vocab");resetQuiz();}}}
            style={{ padding:"8px 16px", borderRadius:"9px", border:`2px solid ${bdr}`,
                     background:"white", color:muted, fontWeight:"700", fontSize:"13px",
                     cursor:"pointer", opacity:week===1?0.3:1 }}>← Semana anterior</button>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:"13px", fontWeight:"800", color:ink }}>Semana {week} / 12</div>
            <div style={{ fontSize:"11px", color:muted }}>{w.phase} · {w.emoji}</div>
          </div>
          <button onClick={()=>{if(week<12){setWeek(w=>w+1);setTab("vocab");resetQuiz();}}}
            style={{ padding:"8px 16px", borderRadius:"9px", border:`2px solid ${dc}`,
                     background:dc, color:"white", fontWeight:"700", fontSize:"13px",
                     cursor:"pointer", opacity:week===12?0.3:1 }}>Próxima semana →</button>
        </div>

        {/* Final banner */}
        {week===12 && (
          <div style={{ background:ink, color:"white", borderRadius:"14px",
                        padding:"24px", marginTop:"16px", textAlign:"center" }}>
            <div style={{ fontSize:"40px", marginBottom:"10px" }}>🏆</div>
            <div style={{ fontWeight:"900", fontSize:"20px", marginBottom:"8px" }}>HSK 2 — Programa Completo!</div>
            <div style={{ opacity:0.75, fontSize:"14px", lineHeight:"1.8", marginBottom:"12px" }}>
              12 semanas · ~772 palavras · 41 pontos gramaticais · 300 caracteres<br/>
              Você percorreu todo o caminho do HSK 2. 你真棒！Nǐ zhēn bàng!
            </div>
            <div style={{ fontSize:"22px", fontWeight:"900", color:"#FCD34D" }}>
              加油！ 你一定能通过！💪
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
