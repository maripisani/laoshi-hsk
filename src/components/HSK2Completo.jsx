import { useState } from "react";

const ink = "#0F172A"; const sand = "#FAFAF8"; const muted = "#64748B"; const bdr = "#E2E8F0";
const TC = ["#9CA3AF","#0891B2","#059669","#7C3AED","#DC2626"];

// ══════════════════════════════════════════════════════════════════════════════
// LAOSHI 老师 — HSK 2 PROGRAMA COMPLETO · Revisão Nov/2025
// 200 palavras novas · 12 semanas · 36 pontos gramaticais
// Fonte: GF0025-2021 / Atualização 2025-11 (vigência Jul/2026)
// ══════════════════════════════════════════════════════════════════════════════

const WEEKS = [
  {
    w:1, phase:"Funda\u00e7\u00e3o", emoji:"\ud83c\udf31", color:"#6366F1",
    theme:"Revisão HSK 1 — Saudações, Negação e Passado",
    built:false, builtNote:"",
    stats:{words:"~80 revisadas (HSK 1)",newHSK2:"0",grammar:"是/有 · 没/不 · 过",chars:"revisão"},
    vocab:[
      
    ],
    grammar:[
      {struct:"S + 是 + N / S + 很 + Adj",label:"Ser vs. Adjetivo",color:"#6366F1",exp:"是 = identidade (sou estudante). Adjetivos NUNCA usam 是 — usam 很 como ligação. Regra: 我是学生 ✅ / 我是高 ❌ / 我很高 ✅.",exs:[{cn:"她是老师，很忙。",py:"Tā shì lǎoshī, hěn máng.",pt:"Ela é professora e está muito ocupada."},{cn:"今天天气很好。",py:"Jīntiān tiānqì hěn hǎo.",pt:"O tempo hoje está muito bom."}]},
      {struct:"S + 没有 + N / S + 没 + V",label:"Negação com 没",color:"#DC2626",exp:"没 nega 有 e ações passadas/concluídas. 不 nega hábitos, vontade e futuro. NUNCA: 不有 ❌.",exs:[{cn:"我没有时间，不去了。",py:"Wǒ méiyǒu shíjiān, bù qù le.",pt:"Não tenho tempo, não vou mais."},{cn:"他没来，也没打电话。",py:"Tā méi lái, yě méi dǎ diànhuà.",pt:"Ele não veio nem ligou."}]},
      {struct:"V + 过 + O",label:"过 Experiencial",color:"#059669",exp:"过 após verbo = \"já fiz X na vida\". Negação: 没 + V + 过 (NUNCA 不+过 para experiência).",exs:[{cn:"你去过北京吗？",py:"Nǐ qù guò Běijīng ma?",pt:"Você já foi a Pequim?"},{cn:"我没吃过日本菜。",py:"Wǒ méi chī guò Rìběn cài.",pt:"Nunca comi comida japonesa."}]}
    ],
    dialogue:[
      {sp:"A",cn:"你好久不见！最近怎么样？",py:"Nǐ hǎo jiǔ bú jiàn! Zuìjìn zěnmeyàng?",pt:"Há tanto tempo! Como você está ultimamente?"},
      {sp:"B",cn:"还不错！你呢？工作忙吗？",py:"Hái búcuò! Nǐ ne? Gōngzuò máng ma?",pt:"Está bem! E você? O trabalho está corrido?"},
      {sp:"A",cn:"最近挺忙的，但没有上个月那么忙。你去过上海吗？",py:"Zuìjìn tǐng máng de, dàn méiyǒu shàng gè yuè nàme máng. Nǐ qù guò Shànghǎi ma?",pt:"Ultimamente está bem corrido, mas não tanto quanto o mês passado. Você já foi a Xangai?"},
      {sp:"B",cn:"去过！非常漂亮。你有时间的话，一定要去看看。",py:"Qù guò! Fēicháng piàoliang. Nǐ yǒu shíjiān de huà, yīdìng yào qù kàn kàn.",pt:"Já! É lindo. Se tiver tempo, deve ir lá ver."},
      {sp:"A",cn:"好的！我没去过，想去。什么时候有空一起去？",py:"Hǎo de! Wǒ méi qù guò, xiǎng qù. Shénme shíhou yǒu kòng yīqǐ qù?",pt:"Ótimo! Nunca fui, quero ir. Quando você tem tempo de irmos juntos?"},
      {sp:"B",cn:"下个月吧，我已经订好酒店了！",py:"Xià gè yuè ba, wǒ yǐjīng dìng hǎo jiǔdiàn le!",pt:"No mês que vem! Já reservei o hotel!"}
    ],
    quiz:[
      {q:"Como dizer \"Ela é professora e está bem ocupada\"?",opts:["她很老师，很忙。","她是老师，很忙。","她是老师，是忙。","她很老师，是忙。"],ans:1,exp:"✅ 她是老师，很忙 — 是 para identidade (老师 = substantivo), 很 antes de adjetivo (忙). Nunca 是+adj ou 很+substantivo!"},
      {q:"Qual frase usa 没有 corretamente?",opts:["我没有去。","我没有吃过。","我没有书。","A e C estão corretas."],ans:3,exp:"✅ A, B e C são todas corretas! 没有+V (não foi/não comeu), 没有+N (não tem livro). Apenas 没有去 (A) não precisa do 有 — pode ser só 没去."},
      {q:"过 indica:",opts:["Ação futura","Ação em andamento","Experiência de vida","Ação habitual"],ans:2,exp:"✅ 过 = experiência de vida (\"já fiz X em algum momento da vida\"). 正在 = em andamento. 经常 = habitual. 要 = futuro."},
      {q:"Qual é o uso ERRADO?",opts:["我去过中国。","我没去过中国。","我不去过中国。","她吃过日本菜。"],ans:2,exp:"✅ 我不去过中国 ❌ — 过 experiencial nega com 没, NUNCA com 不. A forma correta é: 我没去过中国."},
      {q:"完整: 你汉语说___很好！",opts:["得","的","了","着"],ans:0,exp:"✅ 说得很好 — 得 conecta o verbo ao complemento de grau. Estrutura: V + 得 + Adj. Diferente de 的 (possessivo) e 了 (completivo)."}
    ],
  },
  {
    w:2, phase:"Movimentos", emoji:"\ud83d\udeb6", color:"#0891B2",
    theme:"Verbos Direcionais — Entrar, Sair, Subir, Descer e Andar",
    built:false, builtNote:"",
    stats:{words:"18 novas (HSK 2)",newHSK2:"18",grammar:"V+来/去 · 走/跑/飞 · 起来 resultativo",chars:"+10 novos"},
    vocab:[
      {h:"出",py:"chū",pt:"sair"},
      {h:"出来",py:"chūlái",pt:"sair (para cá)"},
      {h:"出去",py:"chūqù",pt:"sair (para lá)"},
      {h:"出门",py:"chūmén",pt:"sair de casa"},
      {h:"进",py:"jìn",pt:"entrar"},
      {h:"进来",py:"jìnlái",pt:"entrar (para cá)"},
      {h:"进去",py:"jìnqù",pt:"entrar (para lá)"},
      {h:"上来",py:"shànglái",pt:"subir (para cá)"},
      {h:"上去",py:"shàngqù",pt:"subir (para lá)"},
      {h:"下来",py:"xiàlái",pt:"descer (para cá)"},
      {h:"下去",py:"xiàqù",pt:"descer (para lá)"},
      {h:"过来",py:"guòlái",pt:"vir (para cá)"},
      {h:"过去",py:"guòqù",pt:"passar; o passado"},
      {h:"起来",py:"qǐlái",pt:"levantar; erguer"},
      {h:"回来",py:"huílái",pt:"voltar (para cá)"},
      {h:"回去",py:"huíqù",pt:"voltar (para lá)"},
      {h:"走",py:"zǒu",pt:"andar; ir embora"},
      {h:"走路",py:"zǒulù",pt:"andar a pé"}
    ],
    grammar:[
      {struct:"V + 来/去",label:"Complemento Direcional Simples",color:"#7C3AED",exp:"来 = movimento em direção ao falante. 去 = movimento afastando-se. 进来/进去 = entrar (cá/lá). 出来/出去 = sair (cá/lá).",exs:[{cn:"快进来！外面很冷。",py:"Kuài jìn lái! Wàimiàn hěn lěng.",pt:"Entre rápido! Lá fora está frio."},{cn:"他出去了，一会儿回来。",py:"Tā chū qù le, yíhuìr huí lái.",pt:"Ele saiu, volta daqui a pouco."}]},
      {struct:"走 vs 跑 vs 飞",label:"Verbos de Movimento",color:"#0891B2",exp:"走 = andar (a pé, neutro). 走路 = andar (ênfase no ato). 跑/跑步 = correr. 飞 = voar. Lembre: 走 também = \"ir embora\".",exs:[{cn:"我们走路去，不打车。",py:"Wǒmen zǒulù qù, bù dǎchē.",pt:"Vamos a pé, não pego táxi."},{cn:"他跑步跑得很快。",py:"Tā pǎobù pǎo de hěn kuài.",pt:"Ele corre muito rápido."}]},
      {struct:"起来 (sentido figurado)",label:"起来 Resultativo Metafórico",color:"#D97706",exp:"起来 após verbo pode indicar início ou resultado: 想起来 = lembrar, 看起来 = parecer, 高兴起来 = começar a ficar feliz.",exs:[{cn:"我想起来了！他叫李明。",py:"Wǒ xiǎng qǐlái le! Tā jiào Lǐ Míng.",pt:"Me lembrei! O nome dele é Li Ming."},{cn:"听到音乐，她高兴起来了。",py:"Tīng dào yīnyuè, tā gāoxìng qǐlái le.",pt:"Ao ouvir a música, ela ficou feliz."}]}
    ],
    dialogue:[
      {sp:"A",cn:"你出去了吗？我刚才进来没看到你。",py:"Nǐ chū qù le ma? Wǒ gāngcái jìnlái méi kàndào nǐ.",pt:"Você saiu? Quando entrei não vi você."},
      {sp:"B",cn:"对，我出去走了一圈儿，刚回来。",py:"Duì, wǒ chū qù zǒu le yī quānr, gāng huí lái.",pt:"É, saí para dar uma volta e acabei de voltar."},
      {sp:"A",cn:"起来活动活动是好的。你跑步了吗？",py:"Qǐlái huódòng huódòng shì hǎo de. Nǐ pǎobù le ma?",pt:"Levantar e se mexer é bom. Você correu?"},
      {sp:"B",cn:"没有，只是走路。跑步我还不太会。",py:"Méiyǒu, zhǐshì zǒulù. Pǎobù wǒ hái bú tài huì.",pt:"Não, só caminhei. Ainda não sei correr muito bem."},
      {sp:"A",cn:"我们一起学吧！下午出去跑一会儿。",py:"Wǒmen yīqǐ xué ba! Xiàwǔ chū qù pǎo yīhuìr.",pt:"Vamos aprender juntos! À tarde saímos para correr um pouco."},
      {sp:"B",cn:"好！我先回去换衣服，一会儿下来。",py:"Hǎo! Wǒ xiān huí qù huàn yīfu, yīhuìr xià lái.",pt:"Ótimo! Primeiro subo para trocar de roupa e desço daqui a pouco."}
    ],
    quiz:[
      {q:"进来 significa:",opts:["Entrar (indo para longe)","Entrar (vindo para cá)","Sair para cá","Voltar"],ans:1,exp:"✅ 进来 = entrar (vindo em direção ao falante). 进去 = entrar (indo para longe do falante). 出来 = sair para cá."},
      {q:"Qual verbo usar para movimento a pé tranquilo?",opts:["跑","飞","走","起来"],ans:2,exp:"✅ 走 = andar, caminhar (neutro). 跑 = correr. 飞 = voar. 起来 = levantar/começar a."},
      {q:"Complete: 快______！火车要开了！",opts:["上去","上来","下来","出去"],ans:1,exp:"✅ 快上来！= Sobe rápido! (vindo para cá, onde está o falante). 上去 seria \"sobe\" indo para longe. O contexto (火车 = trem, você está no trem) pede 上来."},
      {q:"\"Me lembrei!\" em chinês é:",opts:["我想起来了！","我走起来了！","我飞起来了！","我回来了！"],ans:0,exp:"✅ 想起来了 = lembrei (起来 indica resultado cognitivo positivo). 走起来 = começar a andar. 飞起来 = começar a voar."},
      {q:"走路 ≠ 走, porque:",opts:["走路 = correr; 走 = andar","走路 enfatiza o ato de caminhar; 走 pode = ir embora","走 = voar; 走路 = nadar","Não há diferença"],ans:1,exp:"✅ 走路 enfatiza o ato de caminhar a pé (走路去 = ir a pé). 走 sozinho pode significar \"ir embora/partir\" além de caminhar."}
    ],
  },
  {
    w:3, phase:"Cidades", emoji:"\ud83d\ude87", color:"#059669",
    theme:"Lugares, Transporte, Bebidas e Exterior",
    built:false, builtNote:"",
    stats:{words:"18 novas (HSK 2)",newHSK2:"18",grammar:"从...到 · 坐+transporte · 往+direção",chars:"+12 novos"},
    vocab:[
      {h:"地铁",py:"dìtiě",pt:"metrô"},
      {h:"车站",py:"chēzhàn",pt:"ponto/estação de transporte"},
      {h:"机场",py:"jīchǎng",pt:"aeroporto"},
      {h:"公交车",py:"gōngjiāochē",pt:"ônibus (público)"},
      {h:"酒店",py:"jiǔdiàn",pt:"hotel"},
      {h:"饭馆",py:"fànguǎn",pt:"restaurante (informal)"},
      {h:"商场",py:"shāngchǎng",pt:"shopping; galeria"},
      {h:"洗手间",py:"xǐshǒujiān",pt:"banheiro (lavabo)"},
      {h:"楼",py:"lóu",pt:"andar; prédio"},
      {h:"路",py:"lù",pt:"caminho, estrada"},
      {h:"路上",py:"lùshang",pt:"no caminho"},
      {h:"从",py:"cóng",pt:"de; desde"},
      {h:"往",py:"wǎng",pt:"ir em direção a; para"},
      {h:"红茶",py:"hóngchá",pt:"chá preto"},
      {h:"绿茶",py:"lǜchá",pt:"chá verde"},
      {h:"奶茶",py:"nǎichá",pt:"milk tea; chá com leite"},
      {h:"咖啡",py:"kāfēi",pt:"café (bebida)"},
      {h:"外国",py:"wàiguó",pt:"país estrangeiro"}
    ],
    grammar:[
      {struct:"从 A 到 B + V",label:"De A até B",color:"#6366F1",exp:"Padrão completo para trajetórias. 从 = desde/de (ponto inicial). 到 = até (destino). O verbo vem depois.",exs:[{cn:"从这里到机场要多长时间？",py:"Cóng zhèlǐ dào jīchǎng yào duō cháng shíjiān?",pt:"De aqui até o aeroporto, quanto tempo leva?"},{cn:"从北京到上海可以坐火车。",py:"Cóng Běijīng dào Shànghǎi kěyǐ zuò huǒchē.",pt:"De Pequim a Xangai dá para ir de trem."}]},
      {struct:"坐/乘 + transporte",label:"Meio de Transporte",color:"#059669",exp:"坐 = sentar / usar (transporte de massa). 乘 = mais formal. 打车 = pegar táxi (colloquial). 骑 = andar de bicicleta.",exs:[{cn:"你怎么来的？坐地铁来的。",py:"Nǐ zěnme lái de? Zuò dìtiě lái de.",pt:"Como você veio? De metrô."},{cn:"我每天坐公交车上班。",py:"Wǒ měitiān zuò gōngjiāochē shàngbān.",pt:"Pego ônibus para o trabalho todo dia."}]},
      {struct:"往 + direção + V",label:"往 Direcional",color:"#DC2626",exp:"往 = em direção a (indica rumo, não destino fixo). Use antes do verbo. Não confunda com 去 (que indica destino).",exs:[{cn:"往左走，就到了。",py:"Wǎng zuǒ zǒu, jiù dào le.",pt:"Vire à esquerda e chegou."},{cn:"这条路往前走是地铁站。",py:"Zhè tiáo lù wǎng qián zǒu shì dìtiě zhàn.",pt:"Seguindo essa rua em frente fica a estação de metrô."}]}
    ],
    dialogue:[
      {sp:"A",cn:"请问，从这里到地铁站怎么走？",py:"Qǐngwèn, cóng zhèlǐ dào dìtiě zhàn zěnme zǒu?",pt:"Com licença, como chego à estação de metrô daqui?"},
      {sp:"B",cn:"往前走，然后往右转，走五分钟就到了。",py:"Wǎng qián zǒu, ránhòu wǎng yòu zhuǎn, zǒu wǔ fēnzhōng jiù dào le.",pt:"Siga em frente, depois vire à direita, são cinco minutos a pé."},
      {sp:"A",cn:"坐地铁去机场，多长时间？",py:"Zuò dìtiě qù jīchǎng, duō cháng shíjiān?",pt:"De metrô ao aeroporto, quanto tempo leva?"},
      {sp:"B",cn:"大概四十分钟。你要出国吗？",py:"Dàgài sìshí fēnzhōng. Nǐ yào chū guó ma?",pt:"Mais ou menos quarenta minutos. Você vai viajar para o exterior?"},
      {sp:"A",cn:"是的，去巴西。机票已经买好了。",py:"Shì de, qù Bāxī. Jīpiào yǐjīng mǎi hǎo le.",pt:"É, vou ao Brasil. A passagem já está comprada."},
      {sp:"B",cn:"太好了！记得买回来的机票。一路平安！",py:"Tài hǎo le! Jìde mǎi huí lái de jīpiào. Yī lù píng ān!",pt:"Que ótimo! Lembre de comprar a passagem de volta. Boa viagem!"}
    ],
    quiz:[
      {q:"Complete: ___这里___地铁站要走五分钟。",opts:["往...往","从...到","到...从","在...在"],ans:1,exp:"✅ 从...到 = de...até (trajetória). 从这里到地铁站 = daqui até a estação de metrô."},
      {q:"Qual preposição de transporte faz mais sentido em: ___公交车去？",opts:["往","从","坐","在"],ans:2,exp:"✅ 坐公交车 = de ônibus / andar de ônibus. 坐 é o verbo/preposição padrão para transporte de massa."},
      {q:"往 indica:",opts:["Destino fixo","Rumo/direção","Origem","Duração"],ans:1,exp:"✅ 往 = em direção a (rumo, não necessariamente destino final). 往左走 = vá na direção da esquerda. Destino fixo = 去/到."},
      {q:"\"Me diga onde fica o banheiro\" = ?",opts:["告诉我洗手间在哪里。","告诉洗手间在我哪里。","我告诉洗手间哪里。","洗手间告诉我在哪里。"],ans:0,exp:"✅ 告诉 + pessoa + conteúdo. Estrutura: 告诉我 (me diga) + 洗手间在哪里 (onde fica o banheiro). Ordem S-V-O mantida."},
      {q:"Qual NÃO é lugar?",opts:["饭馆","商场","往","地铁"],ans:2,exp:"✅ 往 é preposição direcional, não lugar. 饭馆 = restaurante, 商场 = shopping, 地铁 = metrô."}
    ],
  },
  {
    w:4, phase:"Espa\u00e7o", emoji:"\ud83d\udccd", color:"#7C3AED",
    theme:"Posição Espacial — Dentro, Fora, Cima, Baixo e Lados",
    built:false, builtNote:"",
    stats:{words:"16 novas (HSK 2)",newHSK2:"16",grammar:"在+posição · 左/右边 · 这/那边",chars:"+10 novos"},
    vocab:[
      {h:"里面",py:"lǐmiàn",pt:"dentro (de)"},
      {h:"外面",py:"wàimiàn",pt:"lá fora; exterior"},
      {h:"前面",py:"qiánmiàn",pt:"na frente; adiante"},
      {h:"后面",py:"hòumiàn",pt:"atrás; fundo"},
      {h:"上面",py:"shàngmiàn",pt:"em cima; sobre"},
      {h:"下面",py:"xiàmiàn",pt:"embaixo; abaixo"},
      {h:"旁边",py:"pángbiān",pt:"ao lado; perto"},
      {h:"左",py:"zuǒ",pt:"esquerda"},
      {h:"右",py:"yòu",pt:"direita"},
      {h:"左边",py:"zuǒbian",pt:"lado esquerdo"},
      {h:"右边",py:"yòubian",pt:"lado direito"},
      {h:"门",py:"mén",pt:"porta; portão"},
      {h:"门口",py:"ménkǒu",pt:"entrada; portão"},
      {h:"床",py:"chuáng",pt:"cama"},
      {h:"间",py:"jiān",pt:"(classif. cômodos)"},
      {h:"位",py:"wèi",pt:"(classif. pessoas - respeitoso)"}
    ],
    grammar:[
      {struct:"在 + lugar + 里/外/上/下/前/后/旁边",label:"Preposição de Posição",color:"#6366F1",exp:"Palavras de posição (位置词) sempre vêm APÓS o substantivo de referência. 书在桌子上 ✅ / 书在上桌子 ❌",exs:[{cn:"书包在椅子旁边。",py:"Shūbāo zài yǐzi pángbiān.",pt:"A mochila está ao lado da cadeira."},{cn:"门口有一个人在等你。",py:"Ménkǒu yǒu yí gè rén zài děng nǐ.",pt:"Tem alguém na entrada te esperando."}]},
      {struct:"左边 / 右边 / 前面 / 后面",label:"Referências de Direção",color:"#059669",exp:"As direções em chinês são relativas ao falante (não ao objeto). 左边 = do lado esquerdo (de quem olha).",exs:[{cn:"银行在超市的右边。",py:"Yínháng zài chāoshì de yòubian.",pt:"O banco fica à direita do supermercado."},{cn:"我坐在老师前面。",py:"Wǒ zuò zài lǎoshī qiánmiàn.",pt:"Fico sentado na frente do professor."}]},
      {struct:"这/那 + 边/里/儿",label:"Demonstrativos de Posição",color:"#D97706",exp:"这边/这里/这儿 = aqui/este lado. 那边/那里/那儿 = ali/aquele lado. 哪里/哪儿 = onde? No norte da China, 儿化 é muito comum.",exs:[{cn:"请坐，就坐那边吧。",py:"Qǐng zuò, jiù zuò nàbiān ba.",pt:"Por favor sente-se, sente ali."},{cn:"厕所在哪儿？在里面。",py:"Cèsuǒ zài nǎr? Zài lǐmiàn.",pt:"Onde fica o banheiro? É lá dentro."}]}
    ],
    dialogue:[
      {sp:"A",cn:"你的书包放在哪里了？",py:"Nǐ de shūbāo fàng zài nǎlǐ le?",pt:"Onde você colocou sua mochila?"},
      {sp:"B",cn:"在床旁边的椅子上。对了，我的手表呢？",py:"Zài chuáng pángbiān de yǐzi shàng. Duì le, wǒ de shǒubiǎo ne?",pt:"Na cadeira ao lado da cama. Aliás, e meu relógio?"},
      {sp:"A",cn:"在里面，书包里面。左边的口袋。",py:"Zài lǐmiàn, shūbāo lǐmiàn. Zuǒbiān de kǒudài.",pt:"Está dentro da mochila. No bolso do lado esquerdo."},
      {sp:"B",cn:"找到了！谢谢。门口那边有什么？",py:"Zhǎodào le! Xièxie. Ménkǒu nàbiān yǒu shénme?",pt:"Achei! Obrigado. O que tem ali na entrada?"},
      {sp:"A",cn:"是我买的东西，放在外面吧，进来的时候带进来。",py:"Shì wǒ mǎi de dōngxi, fàng zài wàimiàn ba, jìn lái de shíhou dài jìn lái.",pt:"São compras minhas, deixa lá fora, traz para dentro quando entrar."}
    ],
    quiz:[
      {q:"\"A mochila está em cima da mesa\" =",opts:["书包在桌子的上面。","书包在上面桌子。","书包上面在桌子。","书包桌子在上面。"],ans:0,exp:"✅ 书包在桌子的上面 — palavras de posição SEMPRE vêm DEPOIS do substantivo de referência (桌子 + 的 + 上面). Nunca antes!"},
      {q:"Complete: 厕所在___。",opts:["上里面","里面","里上","面里"],ans:1,exp:"✅ 里面 = dentro (de). Palavras de posição são compostas: 里+面, 上+面, 下+面, 前+面, 后+面. 里面 é a mais comum para \"dentro\"."},
      {q:"O que significa 旁边？",opts:["Embaixo","Em cima","Ao lado","Na frente"],ans:2,exp:"✅ 旁边 = ao lado de; perto. 上面 = em cima. 下面 = embaixo. 前面 = na frente."},
      {q:"Meu quarto fica à esquerda do banheiro:",opts:["我的房间在洗手间左边。","我的房间在左边洗手间。","洗手间我的房间在左边。","左边在我的房间洗手间。"],ans:0,exp:"✅ Estrutura: sujeito + 在 + referência + palavra de posição. 我的房间在洗手间左边 = meu quarto está no lado esquerdo do banheiro."},
      {q:"这边 e 那边 são:",opts:["Verbos de direção","Expressões de posição demonstrativa","Classificadores","Advérbios de tempo"],ans:1,exp:"✅ 这边/这里/这儿 = aqui, este lado. 那边/那里/那儿 = ali, aquele lado. São pronomes demonstrativos de lugar."}
    ],
  },
  {
    w:5, phase:"Compara\u00e7\u00e3o", emoji:"\u2696\ufe0f", color:"#D97706",
    theme:"比, 最 e Negação Comparativa",
    built:false, builtNote:"",
    stats:{words:"17 novas (HSK 2)",newHSK2:"17",grammar:"比+adj · 最+adj · 没有...那么",chars:"+12 novos"},
    vocab:[
      {h:"比",py:"bǐ",pt:"comparar; do que (comparação)"},
      {h:"最",py:"zuì",pt:"o mais; super"},
      {h:"快",py:"kuài",pt:"rápido"},
      {h:"慢",py:"màn",pt:"devagar; lento"},
      {h:"高",py:"gāo",pt:"alto"},
      {h:"长",py:"cháng",pt:"crescer; desenvolver"},
      {h:"远",py:"yuǎn",pt:"longe; distante"},
      {h:"近",py:"jìn",pt:"perto; próximo"},
      {h:"不错",py:"búcuò",pt:"não está mal; bom"},
      {h:"坏",py:"huài",pt:"ruim; estragado"},
      {h:"就",py:"jiù",pt:"então; logo; apenas"},
      {h:"那么",py:"nàme",pt:"então; assim"},
      {h:"那样",py:"nàyàng",pt:"desse jeito; assim"},
      {h:"这么",py:"zhème",pt:"assim; tão"},
      {h:"这样",py:"zhèyàng",pt:"desse jeito; assim"},
      {h:"快乐",py:"kuàilè",pt:"feliz"},
      {h:"累",py:"lèi",pt:"cansado"}
    ],
    grammar:[
      {struct:"A + 比 + B + Adj",label:"Estrutura Comparativa 比",color:"#7C3AED",exp:"NUNCA use 很 com 比! ❌ 他比我很高。 ✅ 他比我高/高多了/高一点儿. Negação: A 没有 B + adj (= A não é tão...quanto B).",exs:[{cn:"今天比昨天热多了。",py:"Jīntiān bǐ zuótiān rè duō le.",pt:"Hoje está muito mais quente que ontem."},{cn:"这个不错，但那个比这个更好。",py:"Zhège búcuò, dàn nàge bǐ zhège gèng hǎo.",pt:"Este está bom, mas aquele é melhor."}]},
      {struct:"最 + Adj",label:"Superlativo",color:"#DC2626",exp:"最 = o mais. Vem antes do adjetivo. Não precisa de 了 (ao contrário de 太). 最快 = o mais rápido.",exs:[{cn:"这是世界上最长的桥。",py:"Zhè shì shìjiè shàng zuì cháng de qiáo.",pt:"Esta é a ponte mais longa do mundo."},{cn:"她跑得最快，比我们都快。",py:"Tā pǎo de zuì kuài, bǐ wǒmen dōu kuài.",pt:"Ela corre mais rápido que todos nós."}]},
      {struct:"A + 没有 + B + Adj",label:"Negação de Comparação",color:"#0891B2",exp:"A 没有 B + adj = A não é tão...quanto B. Oposto de 比. Muito natural em fala: 没有你那么高 = não sou tão alto quanto você.",exs:[{cn:"今天没有昨天那么冷。",py:"Jīntiān méiyǒu zuótiān nàme lěng.",pt:"Hoje não está tão frio quanto ontem."},{cn:"这里没有上海那么远。",py:"Zhèlǐ méiyǒu Shànghǎi nàme yuǎn.",pt:"Daqui não é tão longe quanto Xangai."}]}
    ],
    dialogue:[
      {sp:"A",cn:"这两家饭馆，你觉得哪个比较好？",py:"Zhè liǎng jiā fànguǎn, nǐ juéde nǎge bǐjiào hǎo?",pt:"Desses dois restaurantes, qual você acha melhor?"},
      {sp:"B",cn:"左边那家比右边那家好多了，而且便宜。",py:"Zuǒbiān nà jiā bǐ yòubiān nà jiā hǎo duō le, érqiě piányí.",pt:"O da esquerda é muito melhor que o da direita, e ainda é mais barato."},
      {sp:"A",cn:"但是右边那家离我们最近。",py:"Dànshì yòubiān nà jiā lí wǒmen zuì jìn.",pt:"Mas o da direita é o mais perto de nós."},
      {sp:"B",cn:"没有我家附近那家近。那家最好，最快，也不贵。",py:"Méiyǒu wǒ jiā fùjìn nà jiā jìn. Nà jiā zuì hǎo, zuì kuài, yě bú guì.",pt:"Não é tão perto quanto o que fica perto da minha casa. Aquele é o melhor, mais rápido e não é caro."},
      {sp:"A",cn:"好，那就去你家附近那家！",py:"Hǎo, nà jiù qù nǐ jiā fùjìn nà jiā!",pt:"Ótimo, então vamos ao que fica perto da sua casa!"}
    ],
    quiz:[
      {q:"\"Hoje está muito mais quente que ontem\" =",opts:["今天比昨天很热。","今天比昨天热多了。","今天比昨天最热。","今天比昨天热很。"],ans:1,exp:"✅ 热多了 = muito mais quente. NUNCA: 比...很... ❌. Opções: 比+adj (simplesmente mais), 比+adj+多了 (muito mais), 比+adj+一点儿 (um pouquinho mais)."},
      {q:"Qual é o superlativo de 快？",opts:["很快","比快","最快","太快了"],ans:2,exp:"✅ 最快 = o mais rápido (superlativo). 很快 = muito rápido. 太快了 = rápido demais. 比快 não existe."},
      {q:"\"Xangai não é tão longe quanto Pequim\" =",opts:["上海没有北京那么远。","上海比北京远。","上海没有远北京。","上海最远。"],ans:0,exp:"✅ A没有B那么/这么+adj = A não é tão...quanto B. Formato de negação da comparação: 没有...那么."},
      {q:"Complete: 他跑得___快，真厉害！",opts:["很","比","最","没有"],ans:0,exp:"✅ 很快 após complemento de grau (得). Estrutura: 跑得很快. Não é comparação aqui (sem 比), então 很 é o intensificador correto."},
      {q:"就 neste contexto: \"那就去吧！\" significa:",opts:["Só; apenas","Então; nesse caso","Logo; em seguida","E também"],ans:1,exp:"✅ 就 = então; nesse caso (resolve/concorda). 你说去，那就去吧 = Se você diz para ir, então vamos. É um conector decisivo de consequência."}
    ],
  },
  {
    w:6, phase:"Tempo", emoji:"\u23f0", color:"#0891B2",
    theme:"Frequência, Iminência e Aspecto Contínuo 着",
    built:false, builtNote:"",
    stats:{words:"16 novas (HSK 2)",newHSK2:"16",grammar:"V+着 · 快要...了 · 经常/有时",chars:"+10 novos"},
    vocab:[
      {h:"经常",py:"jīngcháng",pt:"frequentemente; habitualmente"},
      {h:"已经",py:"yǐjīng",pt:"já (completo)"},
      {h:"正",py:"zhèng",pt:"exatamente; justamente"},
      {h:"有时",py:"yǒushí",pt:"às vezes"},
      {h:"一会儿",py:"yíhuìr",pt:"um momento; daqui a pouco"},
      {h:"快要",py:"kuàiyào",pt:"quase; em breve vai"},
      {h:"周",py:"zhōu",pt:"semana; circunferência"},
      {h:"次",py:"cì",pt:"vez (classif. ocasiões)"},
      {h:"时",py:"shí",pt:"momento; hora"},
      {h:"着",py:"zhe",pt:"(part. de ação contínua)"},
      {h:"开始",py:"kāishǐ",pt:"começar; início"},
      {h:"完",py:"wán",pt:"terminar; acabar"},
      {h:"生日",py:"shēngrì",pt:"aniversário"},
      {h:"出国",py:"chūguó",pt:"ir ao exterior"},
      {h:"过年",py:"guònián",pt:"celebrar o Ano Novo Chinês"},
      {h:"开学",py:"kāixué",pt:"início do semestre"}
    ],
    grammar:[
      {struct:"V + 着",label:"Aspecto Contínuo (着)",color:"#6366F1",exp:"着 (zhe) indica ação ou estado contínuo. Diferente do progressivo 在+V: 着 = estado resultante, não ação em andamento.",exs:[{cn:"门开着，请进来。",py:"Mén kāi zhe, qǐng jìn lái.",pt:"A porta está aberta, pode entrar."},{cn:"她笑着说了再见。",py:"Tā xiào zhe shuō le zàijiàn.",pt:"Ela disse tchau sorrindo."}]},
      {struct:"快要 / 要...了",label:"Iminência",color:"#059669",exp:"Indica que algo está para acontecer. 快要 = quase. 要...了 = vai...em breve. 都要...了 = já vai. Sempre com 了 no final.",exs:[{cn:"火车快要开了，快上来！",py:"Huǒchē kuàiyào kāi le, kuài shànglái!",pt:"O trem vai sair, sobe logo!"},{cn:"他要回国了，我们去送送他。",py:"Tā yào huí guó le, wǒmen qù sòng song tā.",pt:"Ele vai voltar ao país, vamos despedir."}]},
      {struct:"经常 / 有时 / 从来不",label:"Frequência",color:"#D97706",exp:"总是 (sempre) > 经常 (frequentemente) > 有时 (às vezes) > 很少 (raramente) > 从来不 (nunca). Posição: antes do verbo.",exs:[{cn:"我经常喝绿茶，有时喝咖啡。",py:"Wǒ jīngcháng hē lǜchá, yǒushí hē kāfēi.",pt:"Costumo beber chá verde, às vezes café."},{cn:"他从来不迟到。",py:"Tā cónglái bù chídào.",pt:"Ele nunca se atrasa."}]}
    ],
    dialogue:[
      {sp:"A",cn:"你经常几点起床？",py:"Nǐ jīngcháng jǐ diǎn qǐchuáng?",pt:"Que horas você costuma acordar?"},
      {sp:"B",cn:"我经常七点起来，但今天有点儿晚，快要八点了。",py:"Wǒ jīngcháng qī diǎn qǐlái, dàn jīntiān yǒudiǎnr wǎn, kuàiyào bā diǎn le.",pt:"Costumo acordar às sete, mas hoje foi um pouco tarde, já quase oito."},
      {sp:"A",cn:"已经开始上课了！你快点儿来。",py:"Yǐjīng kāishǐ shàngkè le! Nǐ kuài diǎnr lái.",pt:"A aula já começou! Venha rápido."},
      {sp:"B",cn:"好的，我正在出门。着呢！今天又迟到了。",py:"Hǎo de, wǒ zhèngzài chūmén. Zhe ne! Jīntiān yòu chídào le.",pt:"Já estou saindo. Hoje me atrasei de novo."},
      {sp:"A",cn:"下次早点儿睡，这周你已经迟到两次了。",py:"Xià cì zǎo diǎnr shuì, zhè zhōu nǐ yǐjīng chídào liǎng cì le.",pt:"Da próxima vez durma mais cedo, essa semana você já se atrasou duas vezes."}
    ],
    quiz:[
      {q:"\"A porta está aberta\" (estado) =",opts:["门开了。","门在开。","门开着。","门要开了。"],ans:2,exp:"✅ 门开着 = a porta está aberta (estado contínuo). 着 = estado resultante. 门开了 = a porta foi aberta (ação completada). 门要开了 = a porta vai abrir."},
      {q:"快要...了 indica:",opts:["Ação habitual","Ação em andamento agora","Algo prestes a acontecer","Experiência de vida"],ans:2,exp:"✅ 快要...了 = iminência (vai acontecer logo). 快要下雨了 = vai chover logo. Sempre com 了 no final."},
      {q:"Qual frase usa corretamente 经常？",opts:["我经常了去跑步。","我经常去跑步。","经常我去跑步。","我去经常跑步。"],ans:1,exp:"✅ 经常 vai antes do verbo (não depois): 我经常去跑步. Advérbios de frequência ficam antes do verbo em chinês."},
      {q:"\"Já começou!\" =",opts:["已经开始了！","开始已经了！","了已经开始！","开始了已经！"],ans:0,exp:"✅ 已经 + verbo + 了. Estrutura: sujeito + 已经 + V + 了. A combinação já经...了 = já (aconteceu/mudou)."},
      {q:"正 nesta frase: \"我正在看书\" significa:",opts:["Exatamente/justamente","Está (em andamento)","Já","Logo"],ans:1,exp:"✅ 正在 = estar fazendo agora (progressivo). 正 + 在 + V. Só 在 também funciona. 正 sem 在 pode = exatamente/justamente."}
    ],
  },
  {
    w:7, phase:"Sa\u00fade", emoji:"\ud83d\udc8a", color:"#DC2626",
    theme:"Corpo, Saúde, Grau com 得 e Intensidade",
    built:false, builtNote:"",
    stats:{words:"15 novas (HSK 2)",newHSK2:"15",grammar:"V+得+adj · 有点儿 · 太...了",chars:"+10 novos"},
    vocab:[
      {h:"身体",py:"shēntǐ",pt:"corpo; saúde"},
      {h:"头",py:"tóu",pt:"cabeça"},
      {h:"手",py:"shǒu",pt:"mão"},
      {h:"眼睛",py:"yǎnjing",pt:"olhos"},
      {h:"疼",py:"téng",pt:"doer; dor"},
      {h:"药",py:"yào",pt:"remédio; medicamento"},
      {h:"舒服",py:"shūfu",pt:"confortável; bem"},
      {h:"药店",py:"yàodiàn",pt:"farmácia"},
      {h:"告诉",py:"gàosu",pt:"contar para; informar"},
      {h:"帮",py:"bāng",pt:"ajudar"},
      {h:"帮忙",py:"bāngmáng",pt:"ajudar, dar uma mão"},
      {h:"笑",py:"xiào",pt:"rir; sorrir"},
      {h:"错",py:"cuò",pt:"errado; errar"},
      {h:"高中",py:"gāozhōng",pt:"ensino médio"},
      {h:"懂",py:"dǒng",pt:"entender"}
    ],
    grammar:[
      {struct:"V + 得 + Adj",label:"Complemento de Grau (得)",color:"#DC2626",exp:"Indica como bem/intensamente algo é feito. 得 separa verbo do complemento. Se houver objeto, o verbo se repete: 他中文说得很好 ✅.",exs:[{cn:"她唱歌唱得很好听。",py:"Tā chànggē chàng de hěn hǎotīng.",pt:"Ela canta muito bem."},{cn:"你汉语说得不错！",py:"Nǐ Hànyǔ shuō de búcuò!",pt:"Você fala chinês muito bem!"}]},
      {struct:"有点儿 + Adj",label:"Leve Intensidade Negativa",color:"#7C3AED",exp:"有点儿 = um pouco (geralmente com conotação negativa ou de reclamação). 一点儿 = um pouco (neutro, após comparação). Diferença crucial!",exs:[{cn:"今天有点儿冷，你穿多点儿吧。",py:"Jīntiān yǒudiǎnr lěng, nǐ chuān duō diǎnr ba.",pt:"Hoje está um pouco frio, vista mais."},{cn:"这个药有点儿苦，但是很有用。",py:"Zhège yào yǒudiǎnr kǔ, dànshì hěn yǒuyòng.",pt:"Este remédio é um pouco amargo, mas eficaz."}]},
      {struct:"太 + Adj + 了",label:"Excesso (太...了)",color:"#059669",exp:"太 + adj + 了 = excessivamente (às vezes positivo na fala cotidiana: 太好了！= Que ótimo!). Sem 了 também é possível em contexto comparativo.",exs:[{cn:"头太疼了，我需要吃药。",py:"Tóu tài téng le, wǒ xūyào chī yào.",pt:"Minha cabeça dói demais, preciso tomar remédio."},{cn:"太棒了！你的汉语太好了！",py:"Tài bàng le! Nǐ de Hànyǔ tài hǎo le!",pt:"Incrível! Seu chinês é excelente!"}]}
    ],
    dialogue:[
      {sp:"A",cn:"你哪里不舒服？",py:"Nǐ nǎlǐ bù shūfu?",pt:"O que você está sentindo?"},
      {sp:"B",cn:"头很疼，身体也有点儿不舒服。",py:"Tóu hěn téng, shēntǐ yě yǒudiǎnr bù shūfu.",pt:"Minha cabeça dói muito, o corpo também está meio mal."},
      {sp:"A",cn:"告诉你，不要一直看手机。眼睛也会疼的。",py:"Gàosu nǐ, bù yào yīzhí kàn shǒujī. Yǎnjing yě huì téng de.",pt:"Deixa eu te dizer, não fique olhando para o celular. Os olhos também podem doer."},
      {sp:"B",cn:"你说得对。我需要买一点儿药。药店在哪儿？",py:"Nǐ shuō de duì. Wǒ xūyào mǎi yīdiǎnr yào. Yàodiàn zài nǎr?",pt:"Você tem razão. Preciso comprar remédio. Onde fica a farmácia?"},
      {sp:"A",cn:"就在前面，走路五分钟。帮你买吧！",py:"Jiù zài qiánmiàn, zǒulù wǔ fēnzhōng. Bāng nǐ mǎi ba!",pt:"É bem em frente, cinco minutos a pé. Vou buscar para você!"},
      {sp:"B",cn:"太感谢了，你真好！",py:"Tài gǎnxiè le, nǐ zhēn hǎo!",pt:"Muito obrigado, você é muito legal!"}
    ],
    quiz:[
      {q:"\"Ela canta muito bem\" com complemento de grau:",opts:["她唱歌很好听。","她唱歌唱得很好听。","她得唱歌很好听。","她唱歌好听得。"],ans:1,exp:"✅ Quando há objeto (歌), o verbo se repete: 唱歌+唱+得+很好听. Estrutura: V+O + V+得+adj. Se sem objeto: 她唱得很好听."},
      {q:"\"Minha cabeça dói um pouco\" =",opts:["我头太疼。","我头很疼。","我头有点儿疼。","我头疼得很。"],ans:2,exp:"✅ 有点儿 = um pouco (geralmente conotação negativa/reclamação). 有点儿疼 = dói um pouco. 太疼 = dói demais. 很疼 = dói muito."},
      {q:"Qual é a diferença principal entre 有点儿 e 一点儿？",opts:["Não há diferença","有点儿 vem antes do adj (geralmente neg.); 一点儿 vem depois do adj (comparação)","一点儿 vem antes; 有点儿 depois","Ambos só após verbo"],ans:1,exp:"✅ 有点儿 + adj (conotação negativa, antes do adj). 比...一点儿 (um pouquinho mais, após adj na comparação). Exemplos: 有点儿贵 vs. 便宜一点儿."},
      {q:"太棒了 (tài bàng le) expressa:",opts:["Crítica: é bom demais","Entusiasmo: que incrível!","Dúvida","Surpresa negativa"],ans:1,exp:"✅ 太...了 em linguagem cotidiana pode ser positivo: 太好了 = Que ótimo! 太棒了 = Que incrível! Só é negativo quando o contexto indica excesso real."},
      {q:"\"Preciso tomar remédio\" =",opts:["我需要吃药。","我需要买药。","我需要喝药。","A e C estão certas."],ans:3,exp:"✅ 吃药 (comer remédio) E 喝药 (beber remédio) são ambas corretas em mandarim! Tabletes = 吃药, líquidos = 喝药. Então A e C estão corretas."}
    ],
  },
  {
    w:8, phase:"Compras", emoji:"\ud83d\udecd", color:"#059669",
    theme:"Objetos, Cores, Preços e Classificadores",
    built:false, builtNote:"",
    stats:{words:"18 novas (HSK 2)",newHSK2:"18",grammar:"一共 · 量词(条/张/本) · 送 vs 给",chars:"+12 novos"},
    vocab:[
      {h:"包",py:"bāo",pt:"embrulhar; bolsa; pacote"},
      {h:"本子",py:"běnzi",pt:"caderno"},
      {h:"笔",py:"bǐ",pt:"caneta; lápis"},
      {h:"手表",py:"shǒubiǎo",pt:"relógio de pulso"},
      {h:"裤子",py:"kùzi",pt:"calça"},
      {h:"书包",py:"shūbāo",pt:"mochila; pasta"},
      {h:"颜色",py:"yánsè",pt:"cor"},
      {h:"白色",py:"báisè",pt:"branco"},
      {h:"红色",py:"hóngsè",pt:"vermelho"},
      {h:"黑色",py:"hēisè",pt:"preto"},
      {h:"绿色",py:"lǜsè",pt:"verde"},
      {h:"票",py:"piào",pt:"bilhete; ingresso"},
      {h:"门票",py:"ménpiào",pt:"ingresso"},
      {h:"机票",py:"jīpiào",pt:"passagem aérea"},
      {h:"万",py:"wàn",pt:"dez mil"},
      {h:"条",py:"tiáo",pt:"(classif. coisas longas; peças)"},
      {h:"拿",py:"ná",pt:"pegar; segurar"},
      {h:"送",py:"sòng",pt:"enviar; presentear; levar"}
    ],
    grammar:[
      {struct:"一共 + 多少 钱？",label:"Perguntar Preço Total",color:"#6366F1",exp:"Perguntas de preço: 多少钱？(quanto custa?), 一共多少钱？(quanto é o total?). Números grandes: 十万 = cem mil.",exs:[{cn:"这条裤子多少钱？一共两百元。",py:"Zhè tiáo kùzi duōshao qián? Yígòng liǎng bǎi yuán.",pt:"Quanto custa essa calça? São duzentos yuan no total."},{cn:"一共三张票，一万块。",py:"Yígòng sān zhāng piào, yī wàn kuài.",pt:"São três ingressos no total, dez mil yuan."}]},
      {struct:"量词 (Classificadores)",label:"Classificadores Nominais",color:"#059669",exp:"条 = coisas longas e flexíveis (calça, rua, rio). 张 = coisas planas (papel, bilhete, foto). 本 = livros. 块 = peças/yuan. Lembre: 一条裤子 / 一张票.",exs:[{cn:"我买了三条裤子和两本书。",py:"Wǒ mǎi le sān tiáo kùzi hé liǎng běn shū.",pt:"Comprei três calças e dois livros."},{cn:"给我一张机票，谢谢。",py:"Gěi wǒ yī zhāng jīpiào, xièxie.",pt:"Me dê uma passagem aérea, obrigado."}]},
      {struct:"送 vs 给",label:"Dar/Presentear vs. Dar",color:"#D97706",exp:"送 = dar de presente/enviar/acompanhar. 给 = dar (transferência). 送给 = dar de presente para. 送人 = acompanhar alguém.",exs:[{cn:"这是我送你的生日礼物。",py:"Zhè shì wǒ sòng nǐ de shēngrì lǐwù.",pt:"Este é o presente de aniversário que te dou."},{cn:"我去机场送她。",py:"Wǒ qù jīchǎng sòng tā.",pt:"Vou ao aeroporto me despedir dela."}]}
    ],
    dialogue:[
      {sp:"A",cn:"我想买一条裤子，有黑色的吗？",py:"Wǒ xiǎng mǎi yī tiáo kùzi, yǒu hēisè de ma?",pt:"Quero comprar uma calça, tem na cor preta?"},
      {sp:"B",cn:"有，黑色、白色和红色都有。",py:"Yǒu, hēisè, báisè hé hóngsè dōu yǒu.",pt:"Tem, tem preta, branca e vermelha."},
      {sp:"A",cn:"这条黑色的多少钱？",py:"Zhè tiáo hēisè de duōshao qián?",pt:"Quanto custa essa preta?"},
      {sp:"B",cn:"两百八十元。那条绿色的也很好看，更便宜。",py:"Liǎng bǎi bāshí yuán. Nà tiáo lǜsè de yě hěn hǎokàn, gèng piányí.",pt:"Duzentos e oitenta yuan. Aquela verde também é bonita e mais barata."},
      {sp:"A",cn:"我要黑色的，送给我妈妈当生日礼物。一共多少钱？",py:"Wǒ yào hēisè de, sòng gěi wǒ māma dāng shēngrì lǐwù. Yígòng duōshao qián?",pt:"Quero a preta, é um presente de aniversário para minha mãe. Quanto é no total?"},
      {sp:"B",cn:"一共两百八十元，谢谢您！",py:"Yígòng liǎng bǎi bāshí yuán, xièxie nín!",pt:"No total são duzentos e oitenta yuan, obrigado!"}
    ],
    quiz:[
      {q:"\"Ao todo são trezentos yuan\" =",opts:["一共三百元。","总共三百元。","三百元一共。","A e B estão certas."],ans:3,exp:"✅ 一共 e 总共 são sinônimos para \"ao todo/no total\". Ambas corretas. Estrutura: 一共 + número + 元/块."},
      {q:"Qual classificador para \"uma calça\"?",opts:["一本裤子","一张裤子","一条裤子","一块裤子"],ans:2,exp:"✅ 条 = classificador para coisas longas e flexíveis (裤子 calça, 鱼 peixe, 路 rua). 本 = livros. 张 = coisas planas. 块 = pedaços/yuan."},
      {q:"\"Vou dar de presente para minha mãe\" =",opts:["我给我妈妈送一个礼物。","我送给我妈妈一个礼物。","我妈妈送给我一个礼物。","送给我妈妈我一个礼物。"],ans:1,exp:"✅ 送给 + pessoa + coisa. 我送给我妈妈一个礼物 = Vou dar um presente para minha mãe. Note: não confunda com 我给我妈妈送 (também correto)."},
      {q:"万 (wàn) equivale a:",opts:["Mil","Cem mil","Dez mil","Um milhão"],ans:2,exp:"✅ 万 = dez mil (10.000). Sistema numérico chinês: 百=100, 千=1.000, 万=10.000, 亿=100.000.000. Exemplo: 三万 = 30.000."},
      {q:"Complete: 她______她妈妈去机场了。",opts:["送","拿","找","开"],ans:0,exp:"✅ 送 = acompanhar (para se despedir). 送她妈妈去机场 = acompanhar/levar sua mãe ao aeroporto. 拿 = pegar/segurar. 找 = procurar."}
    ],
  },
  {
    w:9, phase:"Lazer", emoji:"\u26bd", color:"#6366F1",
    theme:"Esportes, Hobbies e Internet",
    built:false, builtNote:"",
    stats:{words:"15 novas (HSK 2)",newHSK2:"15",grammar:"会/能/可以 · 打/踢 esportes · 喜欢+V",chars:"+10 novos"},
    vocab:[
      {h:"跑",py:"pǎo",pt:"correr"},
      {h:"跑步",py:"pǎobù",pt:"correr; jogging"},
      {h:"游",py:"yóu",pt:"nadar; viajar"},
      {h:"游泳",py:"yóuyǒng",pt:"nadar"},
      {h:"踢",py:"tī",pt:"chutar"},
      {h:"球",py:"qiú",pt:"bola"},
      {h:"足球",py:"zúqiú",pt:"futebol"},
      {h:"篮球",py:"lánqiú",pt:"basquete"},
      {h:"跳舞",py:"tiàowǔ",pt:"dançar"},
      {h:"旅游",py:"lǚyóu",pt:"viajar; turismo"},
      {h:"运动",py:"yùndòng",pt:"exercício; esporte"},
      {h:"爱好",py:"àihào",pt:"hobby, interesse"},
      {h:"上网",py:"shàngwǎng",pt:"usar a internet"},
      {h:"网上",py:"wǎngshang",pt:"online; na internet"},
      {h:"动",py:"dòng",pt:"mover-se"}
    ],
    grammar:[
      {struct:"会 vs 能 vs 可以",label:"Auxiliares de Capacidade/Permissão",color:"#6366F1",exp:"会 = saber fazer (habilidade adquirida). 能 = conseguir (capacidade/condição). 可以 = ter permissão / É possível.",exs:[{cn:"我会游泳，但今天不能游。",py:"Wǒ huì yóuyǒng, dàn jīntiān bù néng yóu.",pt:"Sei nadar, mas hoje não consigo."},{cn:"这里可以踢足球吗？",py:"Zhèlǐ kěyǐ tī zúqiú ma?",pt:"É permitido jogar futebol aqui?"}]},
      {struct:"打 + esporte vs 踢 + esporte",label:"Verbos de Esporte",color:"#059669",exp:"打 = esportes com as mãos ou implemento (篮球/羽毛球/排球/乒乓球). 踢 = esportes com o pé (足球). 游 = nadar. 跑 = correr.",exs:[{cn:"他会打篮球，也喜欢踢足球。",py:"Tā huì dǎ lánqiú, yě xǐhuan tī zúqiú.",pt:"Ele joga basquete e também gosta de futebol."},{cn:"你有什么爱好？我喜欢游泳和跳舞。",py:"Nǐ yǒu shénme àihào? Wǒ xǐhuan yóuyǒng hé tiàowǔ.",pt:"Quais são seus hobbies? Gosto de nadar e dançar."}]},
      {struct:"喜欢 + V/N",label:"Gostar de (Preferências)",color:"#DC2626",exp:"喜欢 + verbo (gostar de fazer) ou + substantivo (gostar de algo). Para intensidade: 非常喜欢 / 很喜欢 / 有点儿喜欢 / 不太喜欢.",exs:[{cn:"我很喜欢在网上看电影。",py:"Wǒ hěn xǐhuan zài wǎngshang kàn diànyǐng.",pt:"Gosto muito de assistir filmes online."},{cn:"她不太喜欢运动，但喜欢旅游。",py:"Tā bú tài xǐhuan yùndòng, dàn xǐhuan lǚyóu.",pt:"Ela não gosta muito de esporte, mas adora viajar."}]}
    ],
    dialogue:[
      {sp:"A",cn:"周末你有什么爱好？",py:"Zhōumò nǐ yǒu shénme àihào?",pt:"O que você gosta de fazer no fim de semana?"},
      {sp:"B",cn:"我喜欢踢足球，也经常去游泳。你呢？",py:"Wǒ xǐhuan tī zúqiú, yě jīngcháng qù yóuyǒng. Nǐ ne?",pt:"Gosto de jogar futebol e costumo ir nadar. E você?"},
      {sp:"A",cn:"我在学跳舞，还喜欢上网看视频。",py:"Wǒ zài xué tiàowǔ, hái xǐhuan shàngwǎng kàn shìpín.",pt:"Estou aprendendo a dançar, também gosto de assistir vídeos online."},
      {sp:"B",cn:"跳舞很好！我不会，但是想学。",py:"Tiàowǔ hěn hǎo! Wǒ bú huì, dànshì xiǎng xué.",pt:"Dançar é ótimo! Não sei, mas quero aprender."},
      {sp:"A",cn:"我可以教你！你踢足球踢得好吗？",py:"Wǒ kěyǐ jiāo nǐ! Nǐ tī zúqiú tī de hǎo ma?",pt:"Posso te ensinar! Você joga futebol bem?"},
      {sp:"B",cn:"不太好，但是我跑得很快！",py:"Bú tài hǎo, dànshì wǒ pǎo de hěn kuài!",pt:"Não muito, mas corro muito rápido!"}
    ],
    quiz:[
      {q:"\"Sei jogar basquete\" (habilidade aprendida) =",opts:["我能打篮球。","我可以打篮球。","我会打篮球。","我打篮球。"],ans:2,exp:"✅ 会 = habilidade aprendida (sei como fazer). 能 = conseguir (condição/capacidade física). 可以 = permissão. 会打篮球 = sei jogar basquete."},
      {q:"Qual verbo para \"jogar futebol\"?",opts:["打足球","踢足球","游足球","跳足球"],ans:1,exp:"✅ 踢 = chutar, usado para esportes de pé (足球). 打 = bater/usar as mãos/implemento (篮球, 羽毛球, 乒乓球). 游 = nadar. 跳 = pular."},
      {q:"\"Ele nada muito bem\" com complemento de grau:",opts:["他游泳游得很好。","他游泳得很好。","他很好游泳。","他游泳很好。"],ans:0,exp:"✅ 游泳+游+得+很好. Com objeto (泳 implícito no composto), repete-se o verbo antes do 得. Também aceito: 他游得很好."},
      {q:"Qual a diferença entre 上网 e 网上？",opts:["São sinônimos","上网 = usar a internet (verbo); 网上 = online (locativo)","网上 = verbo; 上网 = lugar","Não há diferença prática"],ans:1,exp:"✅ 上网 = usar/acessar a internet (ação). 网上 = na internet, online (localização). 上网看视频 = assistir vídeos online. 在网上找 = procurar na internet."},
      {q:"\"Não gosto muito de esporte\" =",opts:["我很不喜欢运动。","我不喜欢很运动。","我不太喜欢运动。","我从来不喜欢运动。"],ans:2,exp:"✅ 不太 = não muito (moderado). 很不 = muito não (mais enfático). 从来不 = nunca. 不太喜欢 é a expressão mais natural para \"não gosto muito\"."}
    ],
  },
  {
    w:10, phase:"Fam\u00edlia", emoji:"\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67", color:"#D97706",
    theme:"Família Ampliada, Identidade e Infância",
    built:false, builtNote:"",
    stats:{words:"17 novas (HSK 2)",newHSK2:"17",grammar:"已经...了 · 从小/小时候 · 姓 vs 叫",chars:"+10 novos"},
    vocab:[
      {h:"奶奶",py:"nǎinai",pt:"avó (paterna)"},
      {h:"爷爷",py:"yéye",pt:"avô (paterno)"},
      {h:"妻子",py:"qīzi",pt:"esposa"},
      {h:"丈夫",py:"zhàngfu",pt:"marido"},
      {h:"男孩儿",py:"nánháir",pt:"menino"},
      {h:"女孩儿",py:"nǚháir",pt:"menina"},
      {h:"小孩儿",py:"xiǎoháir",pt:"criança"},
      {h:"小时候",py:"xiǎoshíhou",pt:"quando criança; infância"},
      {h:"从小",py:"cóngxiǎo",pt:"desde pequeno"},
      {h:"个子",py:"gèzi",pt:"estatura"},
      {h:"名",py:"míng",pt:"nome; famoso"},
      {h:"姓",py:"xìng",pt:"sobrenome; ter sobrenome"},
      {h:"姓名",py:"xìngmíng",pt:"nome completo"},
      {h:"鸟",py:"niǎo",pt:"pássaro"},
      {h:"肉",py:"ròu",pt:"carne"},
      {h:"鱼",py:"yú",pt:"peixe"},
      {h:"飞",py:"fēi",pt:"voar"}
    ],
    grammar:[
      {struct:"已经 + Adj/V + 了",label:"Mudança de Estado (了 Sentencial)",color:"#7C3AED",exp:"了 no final da frase = nova situação ou mudança. 已经...了 = já (com mudança implícita). Diferente do 了 completivo após verbo.",exs:[{cn:"奶奶已经八十岁了！",py:"Nǎinai yǐjīng bāshí suì le!",pt:"Minha avó já tem oitenta anos!"},{cn:"你的孩子已经这么大了！",py:"Nǐ de háizi yǐjīng zhème dà le!",pt:"Seu filho já ficou tão grande assim!"}]},
      {struct:"从小 / 小时候",label:"Tempo na Infância",color:"#059669",exp:"从小 = desde pequeno (advérbio, antes do verbo). 小时候 = quando era criança (expressão de tempo, pode vir antes ou depois de sujeito).",exs:[{cn:"她从小就会说英语。",py:"Tā cóngxiǎo jiù huì shuō Yīngyǔ.",pt:"Ela fala inglês desde criança."},{cn:"小时候，爷爷经常带我去公园。",py:"Xiǎoshíhou, yéye jīngcháng dài wǒ qù gōngyuán.",pt:"Quando criança, meu avô me levava ao parque frequentemente."}]},
      {struct:"姓 vs 叫",label:"Nome vs. Sobrenome",color:"#D97706",exp:"姓 = ter o sobrenome X (não usar 是!). 叫 = chamar-se X (nome completo ou apelido). Formal: 您贵姓？(Qual é o seu sobrenome ilustre?)",exs:[{cn:"您贵姓？我姓李，叫李明。",py:"Nín guì xìng? Wǒ xìng Lǐ, jiào Lǐ Míng.",pt:"Como se chama? Me chamo Li, Li Ming."},{cn:"他姓张，大家叫他小张。",py:"Tā xìng Zhāng, dàjiā jiào tā Xiǎo Zhāng.",pt:"O sobrenome dele é Zhang, todo mundo o chama de Xiao Zhang."}]}
    ],
    dialogue:[
      {sp:"A",cn:"你家有几口人？",py:"Nǐ jiā yǒu jǐ kǒu rén?",pt:"Quantas pessoas tem na sua família?"},
      {sp:"B",cn:"六口人：爷爷、奶奶、爸爸、妈妈、我和我妻子。",py:"Liù kǒu rén: yéye, nǎinai, bàba, māma, wǒ hé wǒ qīzi.",pt:"Seis: meu avô, avó, pai, mãe, eu e minha esposa."},
      {sp:"A",cn:"你们住在一起吗？",py:"Nǐmen zhù zài yīqǐ ma?",pt:"Vocês moram juntos?"},
      {sp:"B",cn:"爷爷奶奶住在旁边那栋楼，我们经常一起吃饭。",py:"Yéye nǎinai zhù zài pángbiān nà dòng lóu, wǒmen jīngcháng yīqǐ chīfàn.",pt:"Meus avós moram no prédio ao lado, jantamos juntos frequentemente."},
      {sp:"A",cn:"真好！你小时候和他们住在一起吗？",py:"Zhēn hǎo! Nǐ xiǎoshíhou hé tāmen zhù zài yīqǐ ma?",pt:"Que bom! Na infância você morava com eles?"},
      {sp:"B",cn:"是的，我从小就和爷爷奶奶住在一起，他们教了我很多。",py:"Shì de, wǒ cóngxiǎo jiù hé yéye nǎinai zhù zài yīqǐ, tāmen jiāo le wǒ hěn duō.",pt:"É, desde pequeno morei com meus avós, eles me ensinaram muito."}
    ],
    quiz:[
      {q:"\"Minha avó já tem oitenta anos\" =",opts:["我奶奶八十岁。","我奶奶已经八十岁了。","我奶奶是八十岁。","我奶奶很八十岁。"],ans:1,exp:"✅ 已经...了 = já (com mudança de estado). Para idades: N + 岁 (sem 是). 了 indica que atingiu esse estágio. 我奶奶八十岁 também é correto mas sem a nuance \"já\"."},
      {q:"\"Qual é seu sobrenome?\" (formal) =",opts:["你叫什么名字？","您贵姓？","你姓什么名字？","您的姓是什么？"],ans:1,exp:"✅ 您贵姓？= Qual é o seu sobrenome ilustre? (forma respeitosa). 你叫什么名字 = Como você se chama? (nome completo/informal)."},
      {q:"\"Desde criança ela sabe falar inglês\" =",opts:["小时候她会说英语。","她从小就会说英语。","她会从小说英语。","从小她就英语说。"],ans:1,exp:"✅ 从小 + 就 + verbo = desde pequeno/infância já... O 就 enfatiza que a habilidade está lá desde então. Ambas as posições de 从小 (antes do sujeito ou depois) são possíveis."},
      {q:"O classificador para contar pessoas respeitosamente é:",opts:["个","名","位","口"],ans:2,exp:"✅ 位 = classificador de cortesia para pessoas (三位客人 = três convidados). 名 = contagem neutra (三名学生). 个 = genérico. 口 = membros da família."},
      {q:"Complete: 你___什么？我___王，叫王芳。",opts:["叫/叫","姓/姓","叫/姓","姓/叫"],ans:2,exp:"✅ 你叫什么 = como você se chama? 我姓王，叫王芳 = meu sobrenome é Wang, meu nome é Wang Fang. 姓 para sobrenome, 叫 para nome completo."}
    ],
  },
  {
    w:11, phase:"Estudo", emoji:"\ud83d\udcda", color:"#7C3AED",
    theme:"Aprender, Ensinar, Resultados e Obrigação",
    built:false, builtNote:"",
    stats:{words:"16 novas (HSK 2)",newHSK2:"16",grammar:"教 causativo · V+错/完 · 得(děi)",chars:"+10 novos"},
    vocab:[
      {h:"词",py:"cí",pt:"palavra; léxico"},
      {h:"教",py:"jiāo",pt:"ensinar"},
      {h:"教室",py:"jiàoshì",pt:"sala de aula"},
      {h:"考",py:"kǎo",pt:"fazer prova; examinar"},
      {h:"考试",py:"kǎoshì",pt:"prova; fazer prova"},
      {h:"介绍",py:"jièshào",pt:"apresentar; introduzir"},
      {h:"题",py:"tí",pt:"questão; problema"},
      {h:"得",py:"de",pt:"conseguir; ganhar"},
      {h:"地",py:"de",pt:"terra; chão"},
      {h:"记得",py:"jìde",pt:"lembrar"},
      {h:"忘",py:"wàng",pt:"esquecer"},
      {h:"洗",py:"xǐ",pt:"lavar"},
      {h:"打",py:"dǎ",pt:"bater; ligar (telefone); jogar"},
      {h:"打车",py:"dǎchē",pt:"pegar táxi"},
      {h:"打开",py:"dǎkāi",pt:"abrir; ligar"},
      {h:"班",py:"bān",pt:"turma; período"}
    ],
    grammar:[
      {struct:"教 + Pessoa + V / 学 + V",label:"Ensinar e Aprender",color:"#6366F1",exp:"教 = ensinar (quem ensina → para quem → o quê). 学 = aprender. 教室 = sala de aula. 考试 = fazer prova. Ordem: 教我中文 (me ensina chinês).",exs:[{cn:"老师教我们写汉字。",py:"Lǎoshī jiāo wǒmen xiě Hànzì.",pt:"O professor nos ensina a escrever caracteres."},{cn:"她正在学做饭。",py:"Tā zhèngzài xué zuò fàn.",pt:"Ela está aprendendo a cozinhar."}]},
      {struct:"V + 错/对/完/到",label:"Complemento Resultativo",color:"#DC2626",exp:"Indica resultado do verbo. 错 = errou. 对 = acertou. 完 = terminou. 到 = chegou a/conseguiu. Negativar: 没 + V + 结果.",exs:[{cn:"我写错了，请给我一支新笔。",py:"Wǒ xiě cuò le, qǐng gěi wǒ yī zhī xīn bǐ.",pt:"Escrevi errado, me dê uma caneta nova."},{cn:"作业做完了吗？还没做完。",py:"Zuòyè zuò wán le ma? Hái méi zuò wán.",pt:"Terminou o dever de casa? Ainda não."}]},
      {struct:"得 (děi) vs 要 vs 需要",label:"Obrigação e Necessidade",color:"#059669",exp:"得 (děi) = ter que (necessidade prática). 要 = querer/ter que. 需要 = precisar (necessidade). 必须 = dever (mais formal/obrigatório).",exs:[{cn:"明天考试，我得复习。",py:"Míngtiān kǎoshì, wǒ děi fùxí.",pt:"Amanhã tem prova, tenho que estudar."},{cn:"你需要带什么？带笔和本子就行了。",py:"Nǐ xūyào dài shénme? Dài bǐ hé běnzi jiù xíng le.",pt:"O que você precisa trazer? Só caneta e caderno."}]}
    ],
    dialogue:[
      {sp:"A",cn:"老师教的内容你都懂了吗？",py:"Lǎoshī jiāo de nèiróng nǐ dōu dǒng le ma?",pt:"Você entendeu tudo que o professor ensinou?"},
      {sp:"B",cn:"大部分懂了，但有几个词还没记住。",py:"Dà bùfen dǒng le, dàn yǒu jǐ gè cí hái méi jì zhù.",pt:"A maior parte sim, mas ainda não memorizei algumas palavras."},
      {sp:"A",cn:"你汉字写得怎么样？",py:"Nǐ Hànzì xiě de zěnmeyàng?",pt:"Como estão os seus caracteres?"},
      {sp:"B",cn:"写得不太好，经常写错。你呢？",py:"Xiě de bú tài hǎo, jīngcháng xiě cuò. Nǐ ne?",pt:"Não muito bem, frequentemente erro. E você?"},
      {sp:"A",cn:"我每天练习，所以写得好了很多。你得每天打开书练习。",py:"Wǒ měitiān liànxí, suǒyǐ xiě de hǎo le hěn duō. Nǐ děi měitiān dǎkāi shū liànxí.",pt:"Pratico todo dia, então melhorei bastante. Você tem que abrir o livro e praticar todo dia."},
      {sp:"B",cn:"你说得对，我明天开始认真学！",py:"Nǐ shuō de duì, wǒ míngtiān kāishǐ rènzhēn xué!",pt:"Você tem razão, começo a estudar sério amanhã!"}
    ],
    quiz:[
      {q:"\"Me ensine a escrever caracteres\" =",opts:["学我写汉字。","告诉我写汉字。","教我写汉字。","让我写汉字。"],ans:2,exp:"✅ 教 + pessoa + verbo = ensinar alguém a fazer algo. 教我写汉字 = me ensina a escrever caracteres. 学 = aprender (sujeito aprende, não ensina)."},
      {q:"Complemento resultativo: \"escrevi errado\" =",opts:["我写了错。","我错写了。","我写错了。","我写得错。"],ans:2,exp:"✅ V + 错 = resultado negativo (errou). 写错了 = escrevi errado. Note: com complemento resultativo usa-se 了 (completivo), NÃO 得 (que é de grau)."},
      {q:"\"Não terminei o dever\" =",opts:["我没有写完作业。","我不写完作业。","我写了不完作业。","我没写作业完。"],ans:0,exp:"✅ 没 + V + 结果 (negação de resultado). 没有写完 = não terminou de escrever. Também aceito: 还没写完 (ainda não terminou)."},
      {q:"得 (děi) vs 要: qual a diferença em \"tenho que estudar\"?",opts:["Não há diferença","我得复习 = necessidade prática; 我要复习 = intenção/plano","我要复习 = mais urgente","得 é mais formal"],ans:1,exp:"✅ 得 (děi) = necessidade prática/situacional. 要 = intenção ou necessidade geral. 我得复习 (a situação me obriga) vs. 我要复习 (pretendo/planejo estudar)."},
      {q:"O que 打开 significa?",opts:["Fechar","Abrir / Ligar (app, luz, etc.)","Sair","Entrar"],ans:1,exp:"✅ 打开 = abrir / ligar (algo fechado). 打开书 = abrir o livro. 打开手机 = ligar o celular. Oposto: 关上 = fechar."}
    ],
  },
  {
    w:12, phase:"Revis\u00e3o", emoji:"\ud83c\udfc6", color:"#DC2626",
    theme:"Conectivos Complexos, Causativo 让 e Consolidação Final",
    built:false, builtNote:"",
    stats:{words:"32 novas (HSK 2)",newHSK2:"32",grammar:"虽然/因为...所以 · 让 causativo · 复习 aspectos",chars:"+15 novos"},
    vocab:[
      {h:"啊",py:"a",pt:"(part. exclamativa)"},
      {h:"别",py:"bié",pt:"não (imperativo); outro"},
      {h:"不好意思",py:"bù hǎoyìsi",pt:"com licença; ficar sem jeito"},
      {h:"但",py:"dàn",pt:"mas, porém"},
      {h:"但是",py:"dànshì",pt:"mas, porém"},
      {h:"等",py:"děng",pt:"esperar; etcétera"},
      {h:"点",py:"diǎn",pt:"ponto; hora (medida de tempo); um pouco"},
      {h:"跟",py:"gēn",pt:"com; seguir"},
      {h:"过",py:"guò",pt:"passar; (indica experiência)"},
      {h:"还是",py:"háishi",pt:"ou; ainda"},
      {h:"花",py:"huā",pt:"flor; gastar"},
      {h:"画",py:"huà",pt:"desenhar; pintar"},
      {h:"可能",py:"kěnéng",pt:"possível; talvez"},
      {h:"离",py:"lí",pt:"distanciar-se de"},
      {h:"没意思",py:"méi yìsi",pt:"sem graça; entediante"},
      {h:"每",py:"měi",pt:"cada; todo(s)"},
      {h:"面",py:"miàn",pt:"rosto; macarrão; farinha"},
      {h:"晴",py:"qíng",pt:"ensolarado; bom tempo"},
      {h:"让",py:"ràng",pt:"deixar; fazer (causativo)"},
      {h:"事情",py:"shìqing",pt:"assunto; coisa"},
      {h:"虽然",py:"suīrán",pt:"embora; apesar de"},
      {h:"所以",py:"suǒyǐ",pt:"por isso; portanto"},
      {h:"为什么",py:"wèi shénme",pt:"por quê; por qual razão"},
      {h:"希望",py:"xīwàng",pt:"esperar; esperança"},
      {h:"一起",py:"yìqǐ",pt:"juntos"},
      {h:"意思",py:"yìsi",pt:"significado; sentido"},
      {h:"阴",py:"yīn",pt:"nublado; sombra"},
      {h:"因为",py:"yīnwèi",pt:"porque; por causa de"},
      {h:"有意思",py:"yǒu yìsi",pt:"interessante; divertido"},
      {h:"站",py:"zhàn",pt:"estação; parada; ficar em pé"},
      {h:"准备",py:"zhǔnbèi",pt:"preparar; se preparar"},
      {h:"自己",py:"zìjǐ",pt:"si mesmo; próprio"}
    ],
    grammar:[
      {struct:"虽然...但是... / 因为...所以...",label:"Conectivos Complexos",color:"#6366F1",exp:"虽然...但是... = embora...mas... (adversativo). 因为...所以... = porque...por isso... (causal). NUNCA misture: ❌虽然...所以 / ❌因为...但是.",exs:[{cn:"虽然很累，但是我还是去跑步了。",py:"Suīrán hěn lèi, dànshì wǒ háishi qù pǎobù le.",pt:"Embora estivesse cansado, ainda assim fui correr."},{cn:"因为下雨，所以我没出门。",py:"Yīnwèi xià yǔ, suǒyǐ wǒ méi chūmén.",pt:"Por causa da chuva, não saí de casa."}]},
      {struct:"让 (causativo) / 叫 (causativo)",label:"Verbos Causativos",color:"#D97706",exp:"让 + pessoa + verbo = mandar/deixar alguém fazer algo. 叫 = similar (mais informal). 别让我等！= Não me faça esperar!",exs:[{cn:"妈妈让我早点儿回家。",py:"Māma ràng wǒ zǎo diǎnr huí jiā.",pt:"Minha mãe me mandou voltar cedo para casa."},{cn:"别让孩子一个人在外面等。",py:"Bié ràng háizi yí gè rén zài wàimiàn děng.",pt:"Não deixe a criança esperando sozinha lá fora."}]},
      {struct:"复习：了 / 过 / 着 / 得",label:"Os Quatro Marcadores Aspectuais",color:"#DC2626",exp:"了 = completivo. 过 = experiência de vida. 着 = estado contínuo. 得 = complemento de grau. Tabela mnemônica: 动作+了, 经历+过, 状态+着, 程度+得.",exs:[{cn:"他学过中文，现在说得很好，一直在用。",py:"Tā xué guò Zhōngwén, xiànzài shuō de hěn hǎo, yīzhí zài yòng.",pt:"Ele estudou chinês, hoje fala muito bem e continua usando."},{cn:"门开着，里面坐着一个老师。",py:"Mén kāi zhe, lǐmiàn zuò zhe yí gè lǎoshī.",pt:"A porta está aberta, um professor está sentado lá dentro."}]}
    ],
    dialogue:[
      {sp:"A",cn:"虽然今天很累，但是我还是要跑步。",py:"Suīrán jīntiān hěn lèi, dànshì wǒ háishi yào pǎobù.",pt:"Embora esteja cansado hoje, ainda assim vou correr."},
      {sp:"B",cn:"你怎么这么自律？让我也跟着去吧！",py:"Nǐ zěnme zhème zìlǜ? Ràng wǒ yě gēnzhe qù ba!",pt:"Como você é tão disciplinado? Me deixa ir junto também!"},
      {sp:"A",cn:"好！因为下周有比赛，所以得认真练习。",py:"Hǎo! Yīnwèi xià zhōu yǒu bǐsài, suǒyǐ děi rènzhēn liànxí.",pt:"Ótimo! Porque semana que vem tem uma competição, então tenho que praticar sério."},
      {sp:"B",cn:"原来如此！那你已经准备好了吗？",py:"Yuánlái rúcǐ! Nà nǐ yǐjīng zhǔnbèi hǎo le ma?",pt:"Ah entendo! Então você já está preparado?"},
      {sp:"A",cn:"差不多了。别忘了带水，等我一下，我去换鞋子。",py:"Chàbuduō le. Bié wàng le dài shuǐ, děng wǒ yīxià, wǒ qù huàn xiézi.",pt:"Mais ou menos. Não esqueça de trazer água, espera um segundo, vou trocar o sapato."},
      {sp:"B",cn:"好，但是快点儿！你刚才说要跑的。",py:"Hǎo, dànshì kuài diǎnr! Nǐ gāngcái shuō yào pǎo de.",pt:"Tudo bem, mas rápido! Você acabou de dizer que ia correr."}
    ],
    quiz:[
      {q:"虽然...但是 vs 因为...所以: como escolher?",opts:["São intercambiáveis","虽然...但是 = concessão (embora...mas); 因为...所以 = causa-efeito","因为...但是 = mais comum","虽然...所以 é mais formal"],ans:1,exp:"✅ Nunca misture: ❌虽然下雨，所以... ❌因为下雨，但是... As conjunções são pares fixos. 虽然...但是 (concessão) / 因为...所以 (causa-consequência)."},
      {q:"\"Minha mãe me mandou voltar cedo\" =",opts:["妈妈让我早点儿回家。","妈妈叫回家我早点儿。","我让妈妈早点儿回家。","妈妈我早点儿让回家。"],ans:0,exp:"✅ 让 + pessoa + verbo = mandar/deixar fazer. 妈妈让我... = minha mãe me mandou... Ordem: causador (妈妈) + 让 + receptor (我) + verbo (回家)."},
      {q:"Qual aspecto está em \"他学过中文\"?",opts:["了 completivo","过 experiencial","着 contínuo","Nenhum"],ans:1,exp:"✅ 过 = experiência de vida (já estudou chinês em algum momento). Diferente de 了 (completou o estudo) e 着 (está estudando continuamente)."},
      {q:"\"Não esqueça de trazer água\" =",opts:["别忘了带水。","不要忘记了水带。","忘了不别带水。","别带忘了水。"],ans:0,exp:"✅ 别 + V = não faça (imperativo). 别忘了 = não esqueça. Estrutura: 别+忘了+带+水. 别 é imperativo negativo mais suave que 不要."},
      {q:"O que significa 准备好了？",opts:["Está se preparando","Ainda não está pronto","Já está pronto/preparado","Vai se preparar"],ans:2,exp:"✅ 准备好了 = já está pronto/preparado (complemento resultativo 好 = ficou bom/pronto + 了 = estado atual). Diferente de 在准备 (está se preparando, em andamento)."}
    ],
  }
];

export default function HSK2Completo() {
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
