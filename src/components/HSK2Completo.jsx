import { useState } from "react";

const ink = "#0F172A"; const sand = "#FAFAF8"; const muted = "#64748B"; const bdr = "#E2E8F0";
const TC = ["#9CA3AF","#0891B2","#059669","#7C3AED","#DC2626"];

// ═══════════════════════════════════════════════════════════════════════
// DADOS COMPLETOS — 12 SEMANAS
// ═══════════════════════════════════════════════════════════════════════
const WEEKS = [
  // ── SEMANA 1 ──────────────────────────────────────────────────────
  { w:1, phase:"Fundação", emoji:"🔁", color:"#6366F1",
    theme:"HSK 1 Revisão — Saudações, Família e Verbos Essenciais",
    built:true, builtNote:"Aulas detalhadas (D1–D7) já disponíveis nos arquivos individuais da Semana 1.",
    stats:{ words:"~200 revisadas (HSK 1)", newHSK2:"0", grammar:"SVO · 是/有 · 不/没 · 吗", chars:"100 revisados" },
    vocab:[
      {h:"你好",py:"nǐ hǎo",pt:"Olá"},{h:"谢谢",py:"xièxie",pt:"Obrigado/a"},{h:"再见",py:"zàijiàn",pt:"Tchau"},
      {h:"爸爸",py:"bàba",pt:"Pai"},{h:"妈妈",py:"māma",pt:"Mãe"},{h:"哥哥",py:"gēge",pt:"Irmão mais velho"},
      {h:"今天",py:"jīntiān",pt:"Hoje"},{h:"明天",py:"míngtiān",pt:"Amanhã"},{h:"昨天",py:"zuótiān",pt:"Ontem"},
      {h:"吃",py:"chī",pt:"Comer"},{h:"喝",py:"hē",pt:"Beber"},{h:"看",py:"kàn",pt:"Ver/Ler"},
      {h:"去",py:"qù",pt:"Ir"},{h:"来",py:"lái",pt:"Vir"},{h:"是",py:"shì",pt:"Ser"},
      {h:"有",py:"yǒu",pt:"Ter"},{h:"不",py:"bù",pt:"Não"},{h:"没有",py:"méiyǒu",pt:"Não ter"},
      {h:"在",py:"zài",pt:"Estar em"},{h:"想",py:"xiǎng",pt:"Querer/Pensar"},
    ],
    grammar:[
      { struct:"S + 是 + N", label:"Verbo Ser", color:"#6366F1",
        exp:"是 é o verbo 'ser' para identidade. NUNCA use 是 antes de adjetivos (我是好 ❌ → 我很好 ✅).",
        exs:[{cn:"我是学生。",py:"Wǒ shì xuésheng.",pt:"Sou estudante."},{cn:"她是老师。",py:"Tā shì lǎoshī.",pt:"Ela é professora."}] },
      { struct:"S + 不/没 + V", label:"Negação", color:"#DC2626",
        exp:"不 nega verbos/adj. habituais. 没 nega 有 e ações passadas. 不 vira bú antes de 4.º tom.",
        exs:[{cn:"我不去。",py:"Wǒ bù qù.",pt:"Não vou."},{cn:"我没有时间。",py:"Wǒ méiyǒu shíjiān.",pt:"Não tenho tempo."}] },
      { struct:"S + V + O + 吗？", label:"Pergunta Sim/Não", color:"#059669",
        exp:"Adicione 吗 no FINAL de qualquer afirmação para virar pergunta — sem inversão!",
        exs:[{cn:"你是学生吗？",py:"Nǐ shì xuésheng ma?",pt:"Você é estudante?"},{cn:"你喝茶吗？",py:"Nǐ hē chá ma?",pt:"Você bebe chá?"}] },
    ],
    dialogue:[
      {sp:"A",cn:"你好！你叫什么名字？",py:"Nǐ hǎo! Nǐ jiào shénme míngzi?",pt:"Olá! Como você se chama?"},
      {sp:"B",cn:"我叫玛丽亚。你是学生吗？",py:"Wǒ jiào Mǎlìyà. Nǐ shì xuésheng ma?",pt:"Me chamo Maria. Você é estudante?"},
      {sp:"A",cn:"是，我是学生。你呢？",py:"Shì, wǒ shì xuésheng. Nǐ ne?",pt:"Sim, sou. E você?"},
      {sp:"B",cn:"我不是学生，我是老师。很高兴认识你！",py:"Wǒ bú shì xuésheng, wǒ shì lǎoshī. Hěn gāoxìng rènshi nǐ!",pt:"Não sou estudante, sou professora. Muito prazer!"},
    ],
    quiz:[
      {q:"Como dizer 'Estou bem' (não 'sou bom')?",opts:["我是好。","我很好。","我有好。","我好是。"],ans:1,exp:"✅ 我很好 — adjetivos NUNCA usam 是. Usam 很 como reforço."},
      {q:"Negação de 我有书 (Tenho livros)?",opts:["我不有书。","我没有书。","我有不书。","我不书。"],ans:1,exp:"✅ 我没有书 — 有 só nega com 没, nunca com 不!"},
      {q:"'你喝茶吗？' é:",opts:["Você gosta de chá?","Você bebe chá?","Você tem chá?","Você quer chá?"],ans:1,exp:"✅ 喝=beber. 吗 no final transforma qualquer frase em pergunta sim/não."},
      {q:"Uma 吗 vai:",opts:["No início","Depois do sujeito","No final da frase","Antes do verbo"],ans:2,exp:"✅ 吗 vai sempre no FINAL. Não há inversão de ordem em perguntas sim/não!"},
      {q:"一个 deve ser pronunciado:",opts:["yī gè","yí gè","yì gè","yǐ gè"],ans:1,exp:"✅ yí gè — 一 muda para 2.º tom antes do 4.º tom de 个. Regra fundamental!"},
    ],
  },

  // ── SEMANA 2 ──────────────────────────────────────────────────────
  { w:2, phase:"Fundação", emoji:"👨‍⚕️", color:"#059669",
    theme:"Profissões, Relações Sociais e Gramática 了/过/比",
    built:true, builtNote:"Aula completa (D8–D14) disponível no arquivo hsk2_semana2.jsx.",
    stats:{ words:"~40 novas (HSK 2)", newHSK2:"40", grammar:"了(le) · 过(guò) · 比(bǐ)", chars:"+20 novos" },
    vocab:[
      {h:"工程师",py:"gōngchéngshī",pt:"engenheiro/a"},{h:"护士",py:"hùshi",pt:"enfermeiro/a"},{h:"律师",py:"lǜshī",pt:"advogado/a"},
      {h:"工作",py:"gōngzuò",pt:"trabalhar"},{h:"上班",py:"shàngbān",pt:"ir ao trabalho"},{h:"下班",py:"xiàbān",pt:"sair do trabalho"},
      {h:"公司",py:"gōngsī",pt:"empresa"},{h:"同事",py:"tóngshì",pt:"colega de trabalho"},{h:"认识",py:"rènshi",pt:"conhecer (pessoa)"},
      {h:"经常",py:"jīngcháng",pt:"frequentemente"},{h:"已经",py:"yǐjīng",pt:"já (concluído)"},{h:"一起",py:"yīqǐ",pt:"juntos"},
      {h:"当然",py:"dāngrán",pt:"claro/naturalmente"},{h:"忙",py:"máng",pt:"ocupado/a"},{h:"累",py:"lèi",pt:"cansado/a"},
      {h:"高兴",py:"gāoxìng",pt:"alegre/feliz"},{h:"关系",py:"guānxi",pt:"relação/conexão"},{h:"其实",py:"qíshí",pt:"na verdade"},
      {h:"突然",py:"tūrán",pt:"de repente"},{h:"一定",py:"yīdìng",pt:"certamente"},
    ],
    grammar:[
      { struct:"V + 了 + O", label:"了 Completivo", color:"#059669",
        exp:"了 após verbo = ação concluída. No final da frase = mudança de estado. Negação com 没 (NUNCA 不!).",
        exs:[{cn:"我吃了饭。",py:"Wǒ chī le fàn.",pt:"Já comi."},{cn:"他来了！",py:"Tā lái le!",pt:"Ele chegou!"}] },
      { struct:"V + 过 + O", label:"过 Experiencial", color:"#6366F1",
        exp:"过 = experiência de vida ('já fiz X em algum momento'). Negação: 没+V+过.",
        exs:[{cn:"我去过中国。",py:"Wǒ qù guò Zhōngguó.",pt:"Já fui à China."},{cn:"你吃过日本菜吗？",py:"Nǐ chī guò Rìběn cài ma?",pt:"Já comeu comida japonesa?"}] },
      { struct:"A + 比 + B + adj.", label:"比 Comparativo", color:"#D97706",
        exp:"比 = 'mais...que'. NUNCA use 很 com 比! Negação: A 没有 B + adj.",
        exs:[{cn:"她比我高。",py:"Tā bǐ wǒ gāo.",pt:"Ela é mais alta que eu."},{cn:"今天比昨天冷多了。",py:"Jīntiān bǐ zuótiān lěng duō le.",pt:"Hoje está muito mais frio que ontem."}] },
    ],
    dialogue:[
      {sp:"A",cn:"你下班了吗？今天忙吗？",py:"Nǐ xiàbān le ma? Jīntiān máng ma?",pt:"Você já saiu? Hoje foi movimentado?"},
      {sp:"B",cn:"刚下班。今天比昨天忙多了！",py:"Gāng xiàbān. Jīntiān bǐ zuótiān máng duō le!",pt:"Acabei de sair! Hoje foi muito mais corrido que ontem!"},
      {sp:"A",cn:"你已经吃饭了吗？",py:"Nǐ yǐjīng chī fàn le ma?",pt:"Você já comeu?"},
      {sp:"B",cn:"还没，我经常忘记吃午饭。今天我们一起去吧！",py:"Hái méi, wǒ jīngcháng wàng jì chī wǔfàn. Jīntiān wǒmen yīqǐ qù ba!",pt:"Ainda não — esqueço de almoçar com frequência. Vamos juntos hoje!"},
    ],
    quiz:[
      {q:"'我去过北京' vs '我去了北京' — qual a diferença?",opts:["Não há","过=experiência de vida; 了=ação específica concluída","过=passado recente; 了=passado distante","过=informal; 了=formal"],ans:1,exp:"✅ 过 foca em EXPERIÊNCIA ACUMULADA (já estive lá em algum momento). 了 marca uma ação específica concluída."},
      {q:"Como negar '我有时间' corretamente?",opts:["我不有时间。","我没时间。","我没有时间。","我不时间。"],ans:2,exp:"✅ 我没有时间 — 有 é o ÚNICO verbo negado com 没. Nunca 不有!"},
      {q:"Qual usa 比 corretamente?",opts:["她比我很高。","她比我高很多。","她很比我高。","比她我高。"],ans:1,exp:"✅ 她比我高很多 — A+比+B+adj+intensificador. NUNCA 很 antes do adj com 比!"},
      {q:"O que significa 当然?",opts:["de repente","certamente","claro/naturalmente","frequentemente"],ans:2,exp:"✅ 当然 dāngrán = claro/naturalmente. 突然=de repente, 一定=certamente, 经常=frequentemente."},
      {q:"'不去' deve ser pronunciado:",opts:["bù qù","bú qù","bǔ qù","bù qu"],ans:1,exp:"✅ bú qù — 不 muda para 2.º tom antes de 去 (4.º tom). Regra: 不 + 4.º tom = bú."},
    ],
  },

  // ── SEMANA 3 ──────────────────────────────────────────────────────
  { w:3, phase:"Espaço", emoji:"🗺️", color:"#D97706",
    theme:"Lugares, Direções e Meios de Transporte",
    built:true, builtNote:"Aula completa (D15–D21) disponível no arquivo hsk2_semana3.jsx.",
    stats:{ words:"~55 novas (HSK 2)", newHSK2:"55", grammar:"往/朝 · 从...到 · 在+位置 · 越来越", chars:"+20 novos" },
    vocab:[
      {h:"地铁",py:"dìtiě",pt:"metrô"},{h:"公共汽车",py:"gōnggòng qìchē",pt:"ônibus"},{h:"出租车",py:"chūzū chē",pt:"táxi"},
      {h:"超市",py:"chāoshì",pt:"supermercado"},{h:"银行",py:"yínháng",pt:"banco"},{h:"药店",py:"yàodiàn",pt:"farmácia"},
      {h:"左边",py:"zuǒbiān",pt:"lado esquerdo"},{h:"右边",py:"yòubiān",pt:"lado direito"},{h:"前面",py:"qiánmiàn",pt:"na frente"},
      {h:"后面",py:"hòumiàn",pt:"atrás"},{h:"旁边",py:"pángbiān",pt:"ao lado"},{h:"对面",py:"duìmiàn",pt:"em frente"},
      {h:"附近",py:"fùjìn",pt:"nas proximidades"},{h:"直走",py:"zhí zǒu",pt:"ir em frente"},{h:"拐弯",py:"guǎiwān",pt:"virar"},
      {h:"堵车",py:"dǔchē",pt:"congestionamento"},{h:"大概",py:"dàgài",pt:"aproximadamente"},{h:"经过",py:"jīngguò",pt:"passar por"},
      {h:"到达",py:"dàodá",pt:"chegar a"},{h:"路口",py:"lùkǒu",pt:"cruzamento"},
    ],
    grammar:[
      { struct:"往/朝 + 方向 + 走", label:"Direção de Movimento", color:"#D97706",
        exp:"往/朝 = em direção a. 往 foca na direção (左/右/前). 朝 foca no destino. 一直走=siga em frente.",
        exs:[{cn:"往左走，在路口往右拐。",py:"Wǎng zuǒ zǒu, zài lùkǒu wǎng yòu guǎi.",pt:"Vá à esquerda, no cruzamento vire à direita."},{cn:"一直走就到了。",py:"Yīzhí zǒu jiù dào le.",pt:"Siga em frente e já chegou."}] },
      { struct:"从 + A + 到 + B + 要 + 时间", label:"Percurso De...Até...", color:"#6366F1",
        exp:"从+A+到+B define percurso. Adicione meio de transporte e duração com 要.",
        exs:[{cn:"从这里到银行怎么走？",py:"Cóng zhèlǐ dào yínháng zěnme zǒu?",pt:"Como ir daqui até o banco?"},{cn:"从家到公司开车要30分钟。",py:"Cóng jiā dào gōngsī kāichē yào sānshí fēnzhōng.",pt:"De casa à empresa são 30 min de carro."}] },
      { struct:"越来越 + adj. + 了", label:"Cada Vez Mais", color:"#7C3AED",
        exp:"越来越 = crescimento progressivo ('cada vez mais'). Nunca use 很/非常 com 越来越!",
        exs:[{cn:"我的汉语越来越好了！",py:"Wǒ de Hànyǔ yuèláiyuè hǎo le!",pt:"Meu mandarim está cada vez melhor!"},{cn:"路越来越堵了。",py:"Lù yuèláiyuè dǔ le.",pt:"O trânsito está cada vez pior."}] },
    ],
    dialogue:[
      {sp:"A",cn:"请问，附近有地铁站吗？",py:"Qǐng wèn, fùjìn yǒu dìtiě zhàn ma?",pt:"Com licença, tem metrô perto daqui?"},
      {sp:"B",cn:"有！从这里往前走，大概五分钟，在路口往左拐。",py:"Yǒu! Cóng zhèlǐ wǎng qián zǒu, dàgài wǔ fēnzhōng, zài lùkǒu wǎng zuǒ guǎi.",pt:"Tem! Vá em frente uns 5 min, no cruzamento vire à esquerda."},
      {sp:"A",cn:"地铁站在哪儿？",py:"Dìtiě zhàn zài nǎr?",pt:"Onde fica a estação?"},
      {sp:"B",cn:"就在超市旁边，越来越近了！",py:"Jiù zài chāoshì pángbiān, yuèláiyuè jìn le!",pt:"Fica ao lado do supermercado — está ficando cada vez mais perto!"},
    ],
    quiz:[
      {q:"'银行在超市对面' — o banco está:",opts:["ao lado do supermercado","atrás do supermercado","em frente ao supermercado","dentro do supermercado"],ans:2,exp:"✅ 对面 = do outro lado / em frente. Par oposto: 旁边(ao lado), 后面(atrás), 里面(dentro)."},
      {q:"Como perguntar 'Quanto tempo leva de carro daqui até o aeroporto'?",opts:["从机场到这里开车多久？","从这里到机场开车要多久？","从这里开车机场多久？","这里到机场车多久？"],ans:1,exp:"✅ 从这里到机场开车要多久？ — 从+A+到+B+交通+要多久. A ordem é sempre: de onde → até onde → como → quanto tempo."},
      {q:"Qual usa 越来越 CORRETAMENTE?",opts:["越来越很好。","天气越来越冷了。","越来越非常忙。","他越来越更快。"],ans:1,exp:"✅ 天气越来越冷了 — 越来越+adj.+了. Nunca use 很/非常/更 junto com 越来越!"},
      {q:"Como dizer 'Vire à direita no cruzamento'?",opts:["右边路口走。","在路口往右拐。","路口右转。","到路口右走。"],ans:1,exp:"✅ 在路口往右拐 — 在+lugar+往+方向+拐. Estrutura: contexto(在) + direção(往右) + ação(拐)."},
      {q:"O que significa '直走'?",opts:["virar à esquerda","parar","ir em frente/reto","dar meia-volta"],ans:2,exp:"✅ 直走 zhí zǒu = ir em frente/reto. 直=reto/direto + 走=andar. A instrução mais comum ao dar direções!"},
    ],
  },

  // ── SEMANA 4 ──────────────────────────────────────────────────────
  { w:4, phase:"Natureza", emoji:"🌦️", color:"#0891B2",
    theme:"Clima, Estações do Ano e Conectivos Lógicos",
    stats:{ words:"~60 novas (HSK 2)", newHSK2:"60", grammar:"不但...而且 · 虽然...但是 · 因为...所以 · 有点儿", chars:"+25 novos" },
    vocab:[
      {h:"天气",py:"tiānqì",pt:"tempo/clima"},{h:"晴天",py:"qíngtiān",pt:"dia ensolarado"},{h:"阴天",py:"yīntiān",pt:"dia nublado"},
      {h:"下雨",py:"xià yǔ",pt:"chover"},{h:"下雪",py:"xià xuě",pt:"nevar"},{h:"刮风",py:"guā fēng",pt:"ventar"},
      {h:"打雷",py:"dǎ léi",pt:"trovejar"},{h:"温度",py:"wēndù",pt:"temperatura"},{h:"天气预报",py:"tiānqì yùbào",pt:"previsão do tempo"},
      {h:"春天",py:"chūntiān",pt:"primavera"},{h:"夏天",py:"xiàtiān",pt:"verão"},{h:"秋天",py:"qiūtiān",pt:"outono"},
      {h:"冬天",py:"dōngtiān",pt:"inverno"},{h:"暖和",py:"nuǎnhuo",pt:"morno/agradável"},{h:"凉快",py:"liángkuai",pt:"fresco (agradável)"},
      {h:"不但",py:"búdàn",pt:"não só"},{h:"而且",py:"érqiě",pt:"mas também"},{h:"虽然",py:"suīrán",pt:"embora"},
      {h:"因为",py:"yīnwèi",pt:"porque"},{h:"所以",py:"suǒyǐ",pt:"portanto/por isso"},
      {h:"如果",py:"rúguǒ",pt:"se/caso"},{h:"就",py:"jiù",pt:"então/logo"},{h:"比较",py:"bǐjiào",pt:"comparativamente"},
      {h:"有点儿",py:"yǒudiǎnr",pt:"um pouco (negativo)"},{h:"季节",py:"jìjié",pt:"estação do ano"},
    ],
    grammar:[
      { struct:"不但...而且... (búdàn...érqiě...)", label:"Não Só...Mas Também", color:"#0891B2",
        exp:"Conecta duas qualidades positivas do MESMO sujeito. Equivale a 'não só...mas também/além disso'.",
        exs:[{cn:"今天不但冷，而且还下雨了。",py:"Jīntiān búdàn lěng, érqiě hái xià yǔ le.",pt:"Hoje não só está frio, mas também está chovendo."},{cn:"她不但漂亮，而且很聪明。",py:"Tā búdàn piàoliang, érqiě hěn cōngming.",pt:"Ela não só é bonita, mas também é muito inteligente."}] },
      { struct:"虽然...但是/可是... (suīrán...dànshì...)", label:"Embora...Mesmo Assim", color:"#7C3AED",
        exp:"Contraste: embora A seja verdade, B também é verdade. Diferente do português, 虽然 e 但是 raramente são omitidos juntos.",
        exs:[{cn:"虽然下雨，但是我很高兴。",py:"Suīrán xià yǔ, dànshì wǒ hěn gāoxìng.",pt:"Embora esteja chovendo, estou feliz."},{cn:"虽然工作很累，但是我喜欢。",py:"Suīrán gōngzuò hěn lèi, dànshì wǒ xǐhuan.",pt:"Embora o trabalho seja cansativo, eu gosto."}] },
      { struct:"因为...所以... (yīnwèi...suǒyǐ...)", label:"Porque...Por Isso", color:"#059669",
        exp:"Causa e efeito. Ambos os conectivos são geralmente usados juntos — diferente do português onde um dos dois é omitido.",
        exs:[{cn:"因为天气太冷，所以我不出去。",py:"Yīnwèi tiānqì tài lěng, suǒyǐ wǒ bù chūqù.",pt:"Porque está muito frio, por isso não saio."},{cn:"因为我很忙，所以没有时间学习。",py:"Yīnwèi wǒ hěn máng, suǒyǐ méiyǒu shíjiān xuéxí.",pt:"Porque estou ocupado, por isso não tenho tempo para estudar."}] },
      { struct:"有点儿 + adj. (negativo)", label:"Um Pouco (Com Sentido Negativo)", color:"#DC2626",
        exp:"有点儿 expressa 'um pouco' com sentido de DESCONFORTO ou algo indesejado. Não use com adjetivos positivos! (有点儿高兴 ❌ → 比较高兴 ✅)",
        exs:[{cn:"今天有点儿热，不舒服。",py:"Jīntiān yǒudiǎnr rè, bù shūfu.",pt:"Hoje está um pouco quente, desconfortável."},{cn:"这道题有点儿难。",py:"Zhè dào tí yǒudiǎnr nán.",pt:"Esta questão é um pouco difícil."}] },
    ],
    dialogue:[
      {sp:"A",cn:"今天天气怎么样？",py:"Jīntiān tiānqì zěnmeyàng?",pt:"Como está o tempo hoje?"},
      {sp:"B",cn:"有点儿冷，虽然是晴天，但是风很大。",py:"Yǒudiǎnr lěng, suīrán shì qíngtiān, dànshì fēng hěn dà.",pt:"Está um pouco frio — embora seja dia de sol, o vento está muito forte."},
      {sp:"A",cn:"天气预报说明天会下雪，你喜欢冬天吗？",py:"Tiānqì yùbào shuō míngtiān huì xià xuě. Nǐ xǐhuan dōngtiān ma?",pt:"A previsão diz que nevará amanhã. Você gosta do inverno?"},
      {sp:"B",cn:"不但喜欢冬天，而且特别喜欢下雪！因为很漂亮，所以我很开心。",py:"Búdàn xǐhuan dōngtiān, érqiě tèbié xǐhuan xià xuě! Yīnwèi hěn piàoliang, suǒyǐ wǒ hěn kāixīn.",pt:"Não só gosto do inverno, mas adoro neve! Porque é lindo, por isso estou muito feliz."},
    ],
    quiz:[
      {q:"'不但...而且' conecta:",opts:["causa e efeito","contraste","duas qualidades do mesmo sujeito","condição e resultado"],ans:2,exp:"✅ 不但...而且 = não só X mas também Y — MESMA direção, ambas positivas/negativas. Ex: 不但冷而且下雨(não só frio mas também chovendo)."},
      {q:"Qual frase usa 因为...所以 CORRETAMENTE?",opts:["所以我忙，因为没时间。","因为下雨，所以我不去。","我因为去，所以下雨。","所以因为忙不去。"],ans:1,exp:"✅ 因为下雨，所以我不去 — CAUSA(因为) vem PRIMEIRO, EFEITO(所以) vem DEPOIS. Ordem fixa!"},
      {q:"有点儿热 implica:",opts:["está muito quente","está agradavelmente quente","está um pouco quente (desconforto)","não faz calor"],ans:2,exp:"✅ 有点儿 tem sentido negativo/de desconforto. 今天有点儿热=hoje está um pouco quente (incomoda). Para positivo use 比较 ou 有些."},
      {q:"'虽然下雨，___我出去了。'",opts:["因为","所以","但是","不但"],ans:2,exp:"✅ 虽然...但是 = embora...mesmo assim. Estrutura de CONTRASTE: situação adversa + reação surpreendente."},
      {q:"Qual das quatro estações é 秋天?",opts:["Primavera","Verão","Outono","Inverno"],ans:2,exp:"✅ 秋天 qiūtiān = Outono! 春(primavera)→夏(verão)→秋(outono)→冬(inverno). Dica: 秋 tem o radical 禾(grãos) — época da colheita!"},
    ],
  },

  // ── SEMANA 5 ──────────────────────────────────────────────────────
  { w:5, phase:"Cotidiano", emoji:"🛒", color:"#DC2626",
    theme:"Compras, Dinheiro e Alimentação",
    stats:{ words:"~65 novas (HSK 2)", newHSK2:"65", grammar:"再/又 · 快/就要...了 · 一...就... · 多+V", chars:"+25 novos" },
    vocab:[
      {h:"价格",py:"jiàgé",pt:"preço"},{h:"打折",py:"dǎzhé",pt:"desconto"},{h:"便宜",py:"piányí",pt:"barato"},
      {h:"贵",py:"guì",pt:"caro"},{h:"付钱",py:"fù qián",pt:"pagar"},{h:"找零",py:"zhǎo líng",pt:"dar o troco"},
      {h:"收据",py:"shōujù",pt:"recibo"},{h:"钱包",py:"qiánbāo",pt:"carteira"},{h:"刷卡",py:"shuā kǎ",pt:"pagar com cartão"},
      {h:"米饭",py:"mǐfàn",pt:"arroz cozido"},{h:"面条",py:"miàntiáo",pt:"macarrão"},{h:"包子",py:"bāozi",pt:"pãozinho recheado"},
      {h:"饺子",py:"jiǎozi",pt:"bolinho/guioza"},{h:"汤",py:"tāng",pt:"sopa"},{h:"菜单",py:"càidān",pt:"cardápio"},
      {h:"点菜",py:"diǎn cài",pt:"pedir comida"},{h:"服务员",py:"fúwùyuán",pt:"garçom/atendente"},{h:"买单",py:"mǎidān",pt:"pedir a conta"},
      {h:"蔬菜",py:"shūcài",pt:"legumes/verduras"},{h:"水果",py:"shuǐguǒ",pt:"frutas"},
      {h:"饮料",py:"yǐnliào",pt:"bebida"},{h:"啤酒",py:"píjiǔ",pt:"cerveja"},{h:"果汁",py:"guǒzhī",pt:"suco de fruta"},
      {h:"再",py:"zài",pt:"de novo (futuro)"},{h:"又",py:"yòu",pt:"de novo (passado)"},
    ],
    grammar:[
      { struct:"再 (zài) vs 又 (yòu)", label:"De Novo: Futuro vs Passado", color:"#DC2626",
        exp:"再 = vou fazer de novo (futuro/intenção). 又 = fiz de novo (passado/já aconteceu). Confundi-los é erro clássico!",
        exs:[{cn:"我想再去一次。",py:"Wǒ xiǎng zài qù yī cì.",pt:"Quero ir mais uma vez (futuro)."},{cn:"他又来晚了！",py:"Tā yòu lái wǎn le!",pt:"Ele chegou tarde de novo! (já aconteceu)"}] },
      { struct:"快/就要 + V + 了", label:"Iminência — Vai Acontecer Logo", color:"#6366F1",
        exp:"快...了 / 就要...了 = algo vai acontecer em breve. 快 é mais imediato. 就要 pode ter marcador de tempo.",
        exs:[{cn:"快下课了！",py:"Kuài xià kè le!",pt:"A aula vai acabar em breve!"},{cn:"我们就要到了。",py:"Wǒmen jiù yào dào le.",pt:"Vamos chegar em breve."}] },
      { struct:"一 + V + 就 + V", label:"Assim Que / Logo Que", color:"#059669",
        exp:"一...就 = assim que A acontece, B acontece imediatamente. Sequência instantânea causa→efeito.",
        exs:[{cn:"我一下班就去超市。",py:"Wǒ yī xiàbān jiù qù chāoshì.",pt:"Assim que sair do trabalho vou ao supermercado."},{cn:"他一看见我就笑了。",py:"Tā yī kàn jiàn wǒ jiù xiào le.",pt:"Assim que me viu, sorriu."}] },
    ],
    dialogue:[
      {sp:"A",cn:"这件衣服多少钱？",py:"Zhè jiàn yīfu duōshao qián?",pt:"Quanto custa esta roupa?"},
      {sp:"B",cn:"三百块，现在打折，便宜一半！",py:"Sān bǎi kuài, xiànzài dǎzhé, piányí yī bàn!",pt:"Trezentos yuan, mas com desconto está na metade do preço!"},
      {sp:"A",cn:"有点儿贵，能不能再便宜一点儿？",py:"Yǒudiǎnr guì, néng bu néng zài piányí yīdiǎnr?",pt:"Está um pouco caro — pode ser um pouquinho mais barato?"},
      {sp:"B",cn:"好吧，两百五十。我们快关门了，今天最后一件！",py:"Hǎo ba, liǎng bǎi wǔshí. Wǒmen kuài guānmén le, jīntiān zuìhòu yī jiàn!",pt:"Ok, duzentos e cinquenta. Vamos fechar em breve — último do dia!"},
    ],
    quiz:[
      {q:"'我想再去一次' usa 再 porque:",opts:["já fui antes","quero ir no futuro","nunca fui","não quero ir"],ans:1,exp:"✅ 再 = repetição FUTURA (intenção). 又 = repetição PASSADA (já aconteceu). 我想再去 = quero ir (de novo no futuro)."},
      {q:"'快下课了' significa:",opts:["A aula acabou","A aula vai acabar em breve","A aula ainda não começou","Que aula longa!"],ans:1,exp:"✅ 快...了 = vai acontecer em breve. 下课=terminar a aula. 快下课了=a aula vai terminar logo!"},
      {q:"Como pedir a conta no restaurante?",opts:["点菜！","买单！","打折！","付钱！"],ans:1,exp:"✅ 买单 mǎidān = pedir a conta / pagar. 点菜=pedir comida, 打折=desconto, 付钱=pagar."},
      {q:"'一下班就回家' significa:",opts:["Depois de sair, volta para casa mais tarde","Assim que sai do trabalho, vai para casa imediatamente","Às vezes volta para casa após o trabalho","Vai para casa antes de sair do trabalho"],ans:1,exp:"✅ 一...就 = assim que A, imediatamente B. 一下班就回家=assim que sai do trabalho, volta imediatamente para casa!"},
      {q:"'又' vs '再' — qual usar em '他___迟到了！'?",opts:["再","又","都","也"],ans:1,exp:"✅ 他又迟到了 — 又 porque já aconteceu (chegou tarde DE NOVO). Se fosse no futuro: 他明天会再迟到。"},
    ],
  },

  // ── SEMANA 6 ──────────────────────────────────────────────────────
  { w:6, phase:"Saúde", emoji:"🏥", color:"#7C3AED",
    theme:"Corpo Humano, Saúde e Bem-estar",
    stats:{ words:"~65 novas (HSK 2)", newHSK2:"65", grammar:"得(de) grau · 太...了 · 应该/必须 · 好+V", chars:"+25 novos" },
    vocab:[
      {h:"头",py:"tóu",pt:"cabeça"},{h:"眼睛",py:"yǎnjing",pt:"olhos"},{h:"耳朵",py:"ěrduǒ",pt:"orelhas"},
      {h:"鼻子",py:"bízi",pt:"nariz"},{h:"嘴",py:"zuǐ",pt:"boca"},{h:"脖子",py:"bózi",pt:"pescoço"},
      {h:"手",py:"shǒu",pt:"mão"},{h:"脚",py:"jiǎo",pt:"pé"},{h:"腿",py:"tuǐ",pt:"perna"},
      {h:"肚子",py:"dùzi",pt:"barriga"},{h:"背",py:"bèi",pt:"costas"},{h:"心脏",py:"xīnzàng",pt:"coração"},
      {h:"生病",py:"shēng bìng",pt:"ficar doente"},{h:"发烧",py:"fāshāo",pt:"ter febre"},{h:"头痛",py:"tóutòng",pt:"dor de cabeça"},
      {h:"咳嗽",py:"késou",pt:"tossir"},{h:"感冒",py:"gǎnmào",pt:"gripe/resfriado"},{h:"肚子疼",py:"dùzi téng",pt:"dor de barriga"},
      {h:"药",py:"yào",pt:"remédio"},{h:"打针",py:"dǎ zhēn",pt:"tomar injeção"},
      {h:"挂号",py:"guàhào",pt:"se registrar (hospital)"},{h:"急诊",py:"jízhěn",pt:"pronto-socorro"},{h:"健康",py:"jiànkāng",pt:"saúde/saudável"},
      {h:"休息",py:"xiūxi",pt:"descansar"},{h:"锻炼",py:"duànliàn",pt:"exercitar-se"},
    ],
    grammar:[
      { struct:"V + 得 + adj./adv.", label:"得 — Complemento de Grau", color:"#7C3AED",
        exp:"V+得+avaliação descreve COMO bem/mal a ação é feita. Para negar ou perguntar: V+得+不/怎么+adj.",
        exs:[{cn:"她说得很好。",py:"Tā shuō de hěn hǎo.",pt:"Ela fala muito bem."},{cn:"你写得怎么样？",py:"Nǐ xiě de zěnmeyàng?",pt:"Como está sua escrita?"}] },
      { struct:"太 + adj. + 了！", label:"Demais / Excessivo", color:"#DC2626",
        exp:"太...了 = demais / muito além do esperado. Pode ser positivo (太好了!) ou negativo (太贵了!).",
        exs:[{cn:"这个药太苦了！",py:"Zhège yào tài kǔ le!",pt:"Este remédio é amargo demais!"},{cn:"太好了，你好多了！",py:"Tài hǎo le, nǐ hǎo duō le!",pt:"Que ótimo, você melhorou muito!"}] },
      { struct:"应该/必须 + V", label:"Dever / Ser Obrigado", color:"#059669",
        exp:"应该 = deveria (conselho/moral). 必须 = deve (obrigação/necessidade). 必须 é mais forte e urgente.",
        exs:[{cn:"你应该多休息。",py:"Nǐ yīnggāi duō xiūxi.",pt:"Você deveria descansar mais."},{cn:"发烧必须去看医生。",py:"Fāshāo bìxū qù kàn yīshēng.",pt:"Com febre é obrigado a ver um médico."}] },
    ],
    dialogue:[
      {sp:"A",cn:"你怎么了？看起来不舒服。",py:"Nǐ zěnme le? Kàn qǐlái bù shūfu.",pt:"O que houve? Parece que você não está bem."},
      {sp:"B",cn:"我头痛，而且有点儿发烧，可能是感冒了。",py:"Wǒ tóutòng, érqiě yǒudiǎnr fāshāo, kěnéng shì gǎnmào le.",pt:"Estou com dor de cabeça e um pouco de febre — provavelmente gripei."},
      {sp:"A",cn:"你应该去看医生！不能一直工作，必须休息。",py:"Nǐ yīnggāi qù kàn yīshēng! Bù néng yīzhí gōngzuò, bìxū xiūxi.",pt:"Você deveria ir ao médico! Não pode ficar trabalhando — tem que descansar."},
      {sp:"B",cn:"好吧，我今天说得太对了，我一直工作得太累了。",py:"Hǎo ba, nǐ jīntiān shuō de tài duì le, wǒ yīzhí gōngzuò de tài lèi le.",pt:"Ok, você está completamente certo hoje — tenho trabalhado de forma excessiva."},
    ],
    quiz:[
      {q:"'她唱得很好' significa:",opts:["Ela gosta muito de cantar","Ela canta muito bem","Ela aprendeu a cantar","Ela cantou antes"],ans:1,exp:"✅ V+得+好 = faz X muito bem. 唱=cantar, 得=marcador de grau, 很好=muito bem. O 得 liga o verbo à avaliação do desempenho."},
      {q:"Qual é a diferença entre 应该 e 必须?",opts:["Não há diferença","应该=deveria(conselho); 必须=deve(obrigação forte)","应该=formal; 必须=informal","应该=passado; 必须=futuro"],ans:1,exp:"✅ 应该=deveria (moral/conselho). 必须=deve/tem que (obrigação/necessidade). 必须 é mais forte e urgente!"},
      {q:"太好了 expressa:",opts:["que ruim!","que ótimo! / incrível!","regular","um pouco bom"],ans:1,exp:"✅ 太...了 pode ser positivo ou negativo. 太好了=que ótimo! 太贵了=caro demais! Depende do adjetivo!"},
      {q:"Como dizer 'Tenho febre' em mandarim?",opts:["我有发烧。","我发烧了。","我是发烧。","我发烧有。"],ans:1,exp:"✅ 我发烧了 — 发烧 é um verbo composto (lit: desenvolver calor). O 了 indica mudança de estado: não tinha febre, agora tem."},
      {q:"'锻炼' significa:",opts:["descansar","exercitar-se","tomar remédio","ficar doente"],ans:1,exp:"✅ 锻炼 duànliàn = exercitar-se/fazer exercício. 锻=forjar, 炼=purificar/treinar. Forjar e purificar o corpo = exercitar!"},
    ],
  },

  // ── SEMANA 7 ──────────────────────────────────────────────────────
  { w:7, phase:"Lazer", emoji:"🎭", color:"#059669",
    theme:"Hobbies, Esportes e Entretenimento",
    stats:{ words:"~65 novas (HSK 2)", newHSK2:"65", grammar:"只有...才 · 只要...就 · 除了...以外 · 先...再...", chars:"+25 novos" },
    vocab:[
      {h:"踢足球",py:"tī zúqiú",pt:"jogar futebol"},{h:"打篮球",py:"dǎ lánqiú",pt:"jogar basquete"},{h:"游泳",py:"yóuyǒng",pt:"nadar"},
      {h:"跑步",py:"pǎobù",pt:"correr"},{h:"打羽毛球",py:"dǎ yǔmáoqiú",pt:"jogar badminton"},{h:"爬山",py:"pá shān",pt:"escalar/caminhar em montanha"},
      {h:"骑自行车",py:"qí zìxíngchē",pt:"andar de bicicleta"},{h:"唱歌",py:"chàng gē",pt:"cantar"},{h:"跳舞",py:"tiào wǔ",pt:"dançar"},
      {h:"画画",py:"huà huà",pt:"desenhar/pintar"},{h:"弹钢琴",py:"tán gāngqín",pt:"tocar piano"},{h:"写书法",py:"xiě shūfǎ",pt:"praticar caligrafia chinesa"},
      {h:"看电影",py:"kàn diànyǐng",pt:"assistir filme"},{h:"看表演",py:"kàn biǎoyǎn",pt:"assistir apresentação"},{h:"读书",py:"dú shū",pt:"ler livros"},
      {h:"运动",py:"yùndòng",pt:"fazer esporte/exercício"},{h:"爱好",py:"àihào",pt:"hobby/passatempo"},{h:"兴趣",py:"xìngqù",pt:"interesse"},
      {h:"比赛",py:"bǐsài",pt:"competição/jogo"},{h:"赢",py:"yíng",pt:"vencer/ganhar"},
      {h:"输",py:"shū",pt:"perder"},{h:"练习",py:"liànxí",pt:"praticar"},{h:"参加",py:"cānjia",pt:"participar"},
      {h:"只有",py:"zhǐyǒu",pt:"somente/apenas (condição)"},{h:"才",py:"cái",pt:"só então/apenas"},
    ],
    grammar:[
      { struct:"只有 + condição + 才 + resultado", label:"Só Se...É Que / Apenas Assim", color:"#059669",
        exp:"Indica que o resultado SÓ acontece se a condição for cumprida. Equivale a 'somente se A, então B'.",
        exs:[{cn:"只有多练习，才能说好汉语。",py:"Zhǐyǒu duō liànxí, cái néng shuō hǎo Hànyǔ.",pt:"Somente praticando muito é que se consegue falar mandarim bem."},{cn:"只有你来，我才高兴。",py:"Zhǐyǒu nǐ lái, wǒ cái gāoxìng.",pt:"Somente se você vier é que vou ficar feliz."}] },
      { struct:"只要 + condição + 就 + resultado", label:"Desde Que / Contanto Que", color:"#D97706",
        exp:"条件比 只有 menos restrita: apenas precisas cumprir A para obter B. 'Contanto que A, B acontece'.",
        exs:[{cn:"只要你努力，就一定能成功。",py:"Zhǐyào nǐ nǔlì, jiù yīdìng néng chénggōng.",pt:"Contanto que você se esforce, com certeza terá sucesso."},{cn:"只要天不下雨，我们就去爬山。",py:"Zhǐyào tiān bù xià yǔ, wǒmen jiù qù pá shān.",pt:"Desde que não chova, vamos caminhar na montanha."}] },
      { struct:"除了 + A + 以外，还/也 + B", label:"Além de A, Também B", color:"#6366F1",
        exp:"除了...以外 = além de/exceto. Com 还/也 = inclusivo (além disso). Com 都不/没 = exclusivo (exceto).",
        exs:[{cn:"他除了踢足球，还喜欢游泳。",py:"Tā chúle tī zúqiú, hái xǐhuan yóuyǒng.",pt:"Além de jogar futebol, ele também gosta de nadar."},{cn:"除了我以外，大家都来了。",py:"Chúle wǒ yǐwài, dàjiā dōu lái le.",pt:"Exceto eu, todo mundo veio."}] },
    ],
    dialogue:[
      {sp:"A",cn:"你平时有什么爱好？",py:"Nǐ píngshí yǒu shénme àihào?",pt:"Quais são seus hobbies?"},
      {sp:"B",cn:"我除了喜欢踢足球，还经常去爬山。你呢？",py:"Wǒ chúle xǐhuan tī zúqiú, hái jīngcháng qù pá shān. Nǐ ne?",pt:"Além de gostar de futebol, costumo também caminhar em montanhas. E você?"},
      {sp:"A",cn:"我喜欢唱歌和看电影。只要有时间，我就去KTV！",py:"Wǒ xǐhuan chàng gē hé kàn diànyǐng. Zhǐyào yǒu shíjiān, wǒ jiù qù KTV!",pt:"Gosto de cantar e assistir filmes. Contanto que tenha tempo, vou ao karaokê!"},
      {sp:"B",cn:"只有多练习才能唱好，我们一起去吧！",py:"Zhǐyǒu duō liànxí cái néng chàng hǎo, wǒmen yīqǐ qù ba!",pt:"Somente praticando muito é que se canta bem — vamos juntos!"},
    ],
    quiz:[
      {q:"'只有努力才能成功' — qual a estrutura correta?",opts:["只有A就B","只有A才B","只要A才B","只有A也B"],ans:1,exp:"✅ 只有+condição+才+resultado. 只有=somente se, 才=então (resultado necessário). A condição é INDISPENSÁVEL."},
      {q:"Qual é a diferença entre 只有 e 只要?",opts:["Não há diferença","只有=condição única e essencial; 只要=condição suficiente","只有=formal; 只要=informal","只有=positivo; 只要=negativo"],ans:1,exp:"✅ 只有...才 = condição ÚNICA/ESSENCIAL (somente assim). 只要...就 = condição SUFICIENTE (contanto que). 只要 é mais permissivo!"},
      {q:"'除了足球，他___喜欢游泳' — que palavra usar?",opts:["也/还","就","才","不"],ans:0,exp:"✅ 除了A以外，还/也+B = além de A, também B (inclusivo). 他除了足球，还喜欢游泳 = além de futebol, também gosta de nadar."},
      {q:"'踢' é o classificador de ação para:",opts:["basquete","futebol/chute","badminton","natação"],ans:1,exp:"✅ 踢 tī = chutar/jogar com o pé. 踢足球=jogar futebol. 打 dǎ é para esportes de raquete/mão: 打篮球, 打羽毛球, 打乒乓球."},
      {q:"'只要天不下雨，___去爬山。'",opts:["才","就","但是","虽然"],ans:1,exp:"✅ 只要...就... = desde que...então. 只要天不下雨，就去爬山=desde que não chova, vai caminhar. 就 marca o resultado da condição!"},
    ],
  },

  // ── SEMANA 8 ──────────────────────────────────────────────────────
  { w:8, phase:"Comunicação", emoji:"💼", color:"#D97706",
    theme:"Trabalho, Estudo, Tecnologia e Comunicação",
    stats:{ words:"~65 novas (HSK 2)", newHSK2:"65", grammar:"正在...呢 · 刚/刚才 · 一边...一边 · 先...再...最后", chars:"+25 novos" },
    vocab:[
      {h:"会议",py:"huìyì",pt:"reunião/conferência"},{h:"报告",py:"bàogào",pt:"relatório/apresentação"},{h:"计划",py:"jìhuà",pt:"plano/planejar"},
      {h:"完成",py:"wánchéng",pt:"concluir/completar"},{h:"解决",py:"jiějué",pt:"resolver"},{h:"问题",py:"wèntí",pt:"problema/questão"},
      {h:"成绩",py:"chéngjì",pt:"resultado/nota"},{h:"考试",py:"kǎoshì",pt:"exame/prova"},{h:"复习",py:"fùxí",pt:"revisar/estudar para prova"},
      {h:"预习",py:"yùxí",pt:"preparar antecipadamente"},{h:"作业",py:"zuòyè",pt:"dever de casa/tarefa"},{h:"笔记",py:"bǐjì",pt:"anotações/caderno"},
      {h:"手机",py:"shǒujī",pt:"celular"},{h:"电脑",py:"diànnǎo",pt:"computador"},{h:"网络",py:"wǎngluò",pt:"internet/rede"},
      {h:"发邮件",py:"fā yóujiàn",pt:"enviar e-mail"},{h:"发消息",py:"fā xiāoxi",pt:"enviar mensagem"},{h:"视频",py:"shìpín",pt:"vídeo/videochamada"},
      {h:"下载",py:"xiàzài",pt:"baixar/download"},{h:"上传",py:"shàngchuán",pt:"upload"},
      {h:"刚才",py:"gāngcái",pt:"há pouco/agora mesmo"},{h:"马上",py:"mǎshàng",pt:"imediatamente"},{h:"终于",py:"zhōngyú",pt:"finalmente"},
      {h:"一边",py:"yībiān",pt:"ao mesmo tempo (primeiro lado)"},{h:"努力",py:"nǔlì",pt:"esforçar-se/diligente"},
    ],
    grammar:[
      { struct:"正在 + V + 呢", label:"Progressivo Enfático", color:"#D97706",
        exp:"正在...呢 reforça a ação em andamento AGORA. 正在 é mais enfático que 在. 呢 no final é opcional mas comum.",
        exs:[{cn:"我正在开会呢，等一下！",py:"Wǒ zhèngzài kāi huì ne, děng yīxià!",pt:"Estou em reunião agora, espere um momento!"},{cn:"她正在复习，不能出去。",py:"Tā zhèngzài fùxí, bù néng chūqù.",pt:"Ela está revisando — não pode sair."}] },
      { struct:"刚/刚才 + V + 了", label:"Acabou de Fazer / Há Pouco", color:"#6366F1",
        exp:"刚 = acabou de (ação muito recente). 刚才 = há pouco (específico, geralmente passado sem 了).",
        exs:[{cn:"我刚发完邮件。",py:"Wǒ gāng fā wán yóujiàn.",pt:"Acabei de enviar o e-mail."},{cn:"刚才老师打电话来了。",py:"Gāngcái lǎoshī dǎ diànhuà lái le.",pt:"Há pouco o professor telefonou."}] },
      { struct:"一边 + V + 一边 + V", label:"Fazer Duas Coisas Simultaneamente", color:"#DC2626",
        exp:"一边...一边 = fazer A e B ao mesmo tempo. Ambas as ações acontecem juntas e continuamente.",
        exs:[{cn:"他喜欢一边听音乐一边学习。",py:"Tā xǐhuan yībiān tīng yīnyuè yībiān xuéxí.",pt:"Ele gosta de estudar ouvindo música ao mesmo tempo."},{cn:"我一边吃饭一边看手机。",py:"Wǒ yībiān chī fàn yībiān kàn shǒujī.",pt:"Como enquanto fico no celular."}] },
    ],
    dialogue:[
      {sp:"A",cn:"你在做什么？可以出来吗？",py:"Nǐ zài zuò shénme? Kěyǐ chūlái ma?",pt:"O que você está fazendo? Pode sair?"},
      {sp:"B",cn:"我正在写报告呢！刚才开了两个小时的会，马上还要开一个。",py:"Wǒ zhèngzài xiě bàogào ne! Gāngcái kāi le liǎng gè xiǎoshí de huì, mǎshàng hái yào kāi yī gè.",pt:"Estou escrevendo um relatório! Acabei de ter uma reunião de 2 horas e logo terei mais uma."},
      {sp:"A",cn:"你经常一边工作一边学习，不累吗？",py:"Nǐ jīngcháng yībiān gōngzuò yībiān xuéxí, bù lèi ma?",pt:"Você frequentemente trabalha e estuda ao mesmo tempo — não fica cansado?"},
      {sp:"B",cn:"累！只有努力才能成功嘛。终于，考试快到了！",py:"Lèi! Zhǐyǒu nǔlì cái néng chénggōng ma. Zhōngyú, kǎoshì kuài dào le!",pt:"Fico! Mas só esforçando é que se tem sucesso! Finalmente, a prova está chegando!"},
    ],
    quiz:[
      {q:"'我正在开会呢' indica que a reunião:",opts:["já terminou","está acontecendo agora","vai acontecer","aconteceu ontem"],ans:1,exp:"✅ 正在...呢 = aspecto progressivo enfático. A reunião está acontecendo AGORA MESMO. 正在 reforça a continuidade da ação."},
      {q:"Qual a diferença entre 刚 e 刚才?",opts:["Não há diferença","刚=acabou de (adj. à frente do V); 刚才=há pouco (específico, adv. de tempo)","刚=formal; 刚才=informal","刚=positivo; 刚才=negativo"],ans:1,exp:"✅ 刚 precede imediatamente o verbo (我刚来). 刚才 é mais específico, refere-se a um momento concreto (刚才你在哪儿?=onde você estava há pouco?)."},
      {q:"'一边听音乐一边学习' significa:",opts:["Primeiro ouve música, depois estuda","Escuta música e depois vai estudar","Ouve música e estuda ao mesmo tempo","Prefere música a estudar"],ans:2,exp:"✅ 一边...一边 = SIMULTANEAMENTE. As duas ações acontecem ao MESMO TEMPO, não em sequência!"},
      {q:"'终于到了！' O que 终于 significa aqui?",opts:["de repente","imediatamente","infelizmente","finalmente"],ans:3,exp:"✅ 终于 zhōngyú = finalmente (depois de longa espera). 终=fim + 于=em. No 'fim', chegou! Carrega sentido de alívio."},
      {q:"Como se diz 'revisar para a prova'?",opts:["预习","练习","学习","复习"],ans:3,exp:"✅ 复习 fùxí = revisar (o que já foi ensinado). 预习=estudar antecipadamente, 练习=praticar, 学习=estudar em geral."},
    ],
  },

  // ── SEMANA 9 ──────────────────────────────────────────────────────
  { w:9, phase:"Emoções", emoji:"💭", color:"#DC2626",
    theme:"Emoções, Personalidade e Situações Sociais",
    stats:{ words:"~65 novas (HSK 2)", newHSK2:"65", grammar:"让/叫/请 causativo · 被 passivo · 觉得/认为/以为", chars:"+25 novos" },
    vocab:[
      {h:"高兴",py:"gāoxìng",pt:"alegre/feliz"},{h:"难过",py:"nánguò",pt:"triste/angustiado"},{h:"伤心",py:"shāngxīn",pt:"magoado/com o coração partido"},
      {h:"生气",py:"shēngqì",pt:"com raiva/irritado"},{h:"害怕",py:"hàipà",pt:"com medo"},{h:"担心",py:"dānxīn",pt:"preocupado"},
      {h:"紧张",py:"jǐnzhāng",pt:"nervoso/tenso"},{h:"兴奋",py:"xīngfèn",pt:"animado/empolgado"},{h:"感动",py:"gǎndòng",pt:"emocionado/tocado"},
      {h:"失望",py:"shīwàng",pt:"decepcionado"},{h:"满意",py:"mǎnyì",pt:"satisfeito"},{h:"后悔",py:"hòuhuǐ",pt:"arrependido"},
      {h:"帮助",py:"bāngzhù",pt:"ajudar"},{h:"请求",py:"qǐngqiú",pt:"pedir/solicitar"},{h:"借",py:"jiè",pt:"emprestar/pedir emprestado"},
      {h:"还",py:"huán",pt:"devolver"},{h:"送",py:"sòng",pt:"dar de presente/levar"},{h:"接",py:"jiē",pt:"buscar/receber/atender"},
      {h:"觉得",py:"juéde",pt:"achar/sentir que"},{h:"认为",py:"rènwéi",pt:"considerar/opinar"},
      {h:"以为",py:"yǐwéi",pt:"acreditar erroneamente"},{h:"被",py:"bèi",pt:"ser (passiva)"},{h:"让",py:"ràng",pt:"deixar/fazer alguém fazer"},
      {h:"叫",py:"jiào",pt:"mandar/chamar"},{h:"性格",py:"xìnggé",pt:"personalidade/caráter"},
    ],
    grammar:[
      { struct:"让/叫/请 + pessoa + V", label:"Causativo — Fazer Alguém Fazer", color:"#DC2626",
        exp:"让=deixar/fazer (permissão/pedido). 叫=mandar (ordem). 请=pedir (educado). Todos têm estrutura: sujeito + 让/叫/请 + pessoa + verbo.",
        exs:[{cn:"老师让我回答这个问题。",py:"Lǎoshī ràng wǒ huídá zhège wèntí.",pt:"O professor me pediu para responder esta pergunta."},{cn:"妈妈叫我马上回家。",py:"Māma jiào wǒ mǎshàng huí jiā.",pt:"A mãe mandou eu voltar para casa imediatamente."}] },
      { struct:"被 + agente + V", label:"Voz Passiva com 被", color:"#7C3AED",
        exp:"被 marca que o sujeito SOFREU a ação (passivo). Geralmente implica resultado negativo ou inesperado. O agente pode ser omitido.",
        exs:[{cn:"我的手机被偷了！",py:"Wǒ de shǒujī bèi tōu le!",pt:"Meu celular foi roubado!"},{cn:"这个问题被他解决了。",py:"Zhège wèntí bèi tā jiějué le.",pt:"Este problema foi resolvido por ele."}] },
      { struct:"觉得/认为/以为 + 子句", label:"Verbos de Pensamento/Opinião", color:"#059669",
        exp:"觉得=achar/sentir (subjetivo, emotional). 认为=considerar/opinar (objetivo, racional). 以为=acreditar erroneamente (você estava errado!).",
        exs:[{cn:"我觉得这个电影很好看。",py:"Wǒ juéde zhège diànyǐng hěn hǎokàn.",pt:"Acho que este filme é muito bom."},{cn:"我以为他不来，没想到他来了！",py:"Wǒ yǐwéi tā bù lái, méi xiǎngdào tā lái le!",pt:"Achei (erroneamente) que ele não viria — que surpresa, ele veio!"}] },
    ],
    dialogue:[
      {sp:"A",cn:"你怎么了？看起来很难过。",py:"Nǐ zěnme le? Kàn qǐlái hěn nánguò.",pt:"O que houve? Parece que você está triste."},
      {sp:"B",cn:"我以为考试很容易，没想到很难，我很失望。",py:"Wǒ yǐwéi kǎoshì hěn róngyì, méi xiǎngdào hěn nán, wǒ hěn shīwàng.",pt:"Achei que a prova seria fácil, mas foi difícil — estou muito decepcionado."},
      {sp:"A",cn:"我觉得你不用担心，老师让你再考一次。",py:"Wǒ juéde nǐ bú yòng dānxīn, lǎoshī ràng nǐ zài kǎo yī cì.",pt:"Acho que não precisa se preocupar — o professor vai deixar você fazer de novo."},
      {sp:"B",cn:"真的吗？太感动了！我一定会努力，不让老师失望！",py:"Zhēn de ma? Tài gǎndòng le! Wǒ yīdìng huì nǔlì, bú ràng lǎoshī shīwàng!",pt:"Sério? Estou tão emocionado! Vou me esforçar e não decepcionar o professor!"},
    ],
    quiz:[
      {q:"'我以为他来了' implica que:",opts:["ele veio","ele não veio (eu me enganei)","ele vai vir","eu não sei se ele veio"],ans:1,exp:"✅ 以为 = acreditar erroneamente. A frase implica que VOCÊ ESTAVA ERRADO: achou que ele tinha vindo, mas não veio. Diferente de 认为(opinião racional) e 觉得(sentimento subjetivo)!"},
      {q:"'我的手机被偷了！' significa:",opts:["Meu celular roubou algo","Roubei um celular","Meu celular foi roubado","Alguém vai roubar meu celular"],ans:2,exp:"✅ SUJEITO + 被 + agente + V = passiva. 我的手机=meu celular(sujeito), 被(passiva), 偷了=foi roubado. 被 frequentemente indica resultado negativo/inesperado!"},
      {q:"Qual a diferença entre 觉得 e 认为?",opts:["Não há diferença","觉得=sentimento/impressão subjetiva; 认为=opinião/julgamento objetivo","觉得=formal; 认为=informal","觉得=passado; 认为=futuro"],ans:1,exp:"✅ 觉得 é mais emocional/subjetivo (sinto/acho). 认为 é mais racional/objetivo (considero/opino). 我觉得好吃 vs 我认为这个政策不好."},
      {q:"'让我试试！' significa:",opts:["Me deixa tentar!","Já tentei!","Não vou tentar.","Quem vai tentar?"],ans:0,exp:"✅ 让+eu+试试 = me deixa tentar! 让=deixar/fazer alguém fazer. 试试=tentar (reduplificação = tentativa informal/casual)."},
      {q:"'感动' significa:",opts:["com medo","animado","emocionado/tocado","decepcionado"],ans:2,exp:"✅ 感动 gǎndòng = emocionado/tocado (por algo bonito ou gratificante). 害怕=com medo, 兴奋=animado, 失望=decepcionado."},
    ],
  },

  // ── SEMANA 10 ──────────────────────────────────────────────────────
  { w:10, phase:"Viagem", emoji:"✈️", color:"#6366F1",
    theme:"Viagem, Cultura e Planos Futuros",
    stats:{ words:"~60 novas (HSK 2)", newHSK2:"60", grammar:"打算/准备+V · 不是...而是 · 先...再...最后 · 越...越...", chars:"+20 novos" },
    vocab:[
      {h:"旅行",py:"lǚxíng",pt:"viajar/viagem"},{h:"旅游",py:"lǚyóu",pt:"turismo/fazer turismo"},{h:"景点",py:"jǐngdiǎn",pt:"ponto turístico"},
      {h:"导游",py:"dǎoyóu",pt:"guia turístico"},{h:"行李",py:"xínglǐ",pt:"bagagem"},{h:"护照",py:"hùzhào",pt:"passaporte"},
      {h:"签证",py:"qiānzhèng",pt:"visto"},{h:"订票",py:"dìng piào",pt:"comprar/reservar passagem"},{h:"宾馆",py:"bīnguǎn",pt:"hotel"},
      {h:"预订",py:"yùdìng",pt:"fazer reserva"},{h:"入住",py:"rùzhù",pt:"fazer check-in"},{h:"退房",py:"tuì fáng",pt:"fazer check-out"},
      {h:"打算",py:"dǎsuàn",pt:"planejar/ter intenção"},{h:"准备",py:"zhǔnbèi",pt:"preparar/se preparar"},{h:"希望",py:"xīwàng",pt:"esperar/desejar"},
      {h:"梦想",py:"mèngxiǎng",pt:"sonho/sonhar"},{h:"将来",py:"jiānglái",pt:"no futuro"},{h:"打算",py:"dǎsuàn",pt:"planejar"},
      {h:"文化",py:"wénhuà",pt:"cultura"},{h:"历史",py:"lìshǐ",pt:"história"},
      {h:"传统",py:"chuántǒng",pt:"tradição"},{h:"现代",py:"xiàndài",pt:"moderno/contemporâneo"},{h:"风景",py:"fēngjǐng",pt:"paisagem/cenário"},
      {h:"不是",py:"bú shì",pt:"não é (contrastivo)"},{h:"而是",py:"ér shì",pt:"mas sim/e sim"},
    ],
    grammar:[
      { struct:"打算/准备/计划 + V", label:"Intenção e Planos Futuros", color:"#6366F1",
        exp:"打算=ter intenção de (menos formal). 准备=se preparar para/planejar. 计划=planejar (mais formal). Todos seguem de V diretamente.",
        exs:[{cn:"我打算明年去中国旅行。",py:"Wǒ dǎsuàn míngnián qù Zhōngguó lǚxíng.",pt:"Planejo viajar para a China no próximo ano."},{cn:"我们准备下个月结婚。",py:"Wǒmen zhǔnbèi xià gè yuè jiéhūn.",pt:"Vamos nos casar no próximo mês."}] },
      { struct:"不是 + A + 而是 + B", label:"Não É A, Mas Sim B", color:"#DC2626",
        exp:"Corrige ou contrasta: o que parece ser A na verdade é B. Equivale a 'não é X e sim Y'. Muito usado para esclarecer mal-entendidos.",
        exs:[{cn:"我不是在休息，而是在思考。",py:"Wǒ bú shì zài xiūxi, ér shì zài sīkǎo.",pt:"Não estou descansando, e sim pensando."},{cn:"这不是问题，而是机会。",py:"Zhè bú shì wèntí, ér shì jīhuì.",pt:"Isso não é um problema, e sim uma oportunidade."}] },
      { struct:"越 + A + 越 + B", label:"Quanto Mais A, Mais B", color:"#059669",
        exp:"越...越 = relação proporcional entre dois elementos. Diferente de 越来越 (que descreve mudança progressiva), 越...越 conecta DUAS variáveis.",
        exs:[{cn:"汉语越学越有趣。",py:"Hànyǔ yuè xué yuè yǒuqù.",pt:"Quanto mais se estuda mandarim, mais interessante fica."},{cn:"天气越冷，我越不想出门。",py:"Tiānqì yuè lěng, wǒ yuè bù xiǎng chūmén.",pt:"Quanto mais frio, menos quero sair."}] },
    ],
    dialogue:[
      {sp:"A",cn:"你将来有什么梦想？",py:"Nǐ jiānglái yǒu shénme mèngxiǎng?",pt:"Quais são seus sonhos para o futuro?"},
      {sp:"B",cn:"我打算学好汉语，然后去中国工作。中文越学越有趣！",py:"Wǒ dǎsuàn xué hǎo Hànyǔ, ránhòu qù Zhōngguó gōngzuò. Zhōngwén yuè xué yuè yǒuqù!",pt:"Planejo aprender bem o mandarim e depois trabalhar na China. Quanto mais estudo, mais interessante fica!"},
      {sp:"A",cn:"我以为你不喜欢中国文化，原来不是这样！",py:"Wǒ yǐwéi nǐ bù xǐhuan Zhōngguó wénhuà, yuánlái bú shì zhèyàng!",pt:"Achei que você não gostava da cultura chinesa — afinal não é assim!"},
      {sp:"B",cn:"不是不喜欢，而是以前不了解！准备明年去北京旅游。",py:"Bú shì bù xǐhuan, ér shì yǐqián bù liǎojiě! Zhǔnbèi míngnián qù Běijīng lǚyóu.",pt:"Não é que não gostava — é que antes não conhecia! Estou me preparando para viajar a Pequim no próximo ano."},
    ],
    quiz:[
      {q:"'越学越有趣' — qual é a relação entre as duas ações?",opts:["Contraste","Causa e efeito","Proporcional (quanto mais A, mais B)","Sequência temporal"],ans:2,exp:"✅ 越...越 = proporcional: quanto mais se aprende (越学), mais interessante fica (越有趣). As duas variáveis crescem juntas!"},
      {q:"'不是休息，而是在思考' — o que isso indica?",opts:["Ele está descansando","Ele está pensando (correção do que parecia)","Ele vai descansar depois","Não sabe o que está fazendo"],ans:1,exp:"✅ 不是A而是B = corrige ou contrasta. O que PARECIA ser A (descanso) na verdade É B (pensar). Esclarecer mal-entendidos!"},
      {q:"Qual a diferença entre 打算 e 准备?",opts:["Não há diferença","打算=intenção/plano mental; 准备=se preparar/ação de preparação","打算=formal; 准备=informal","打算=futuro próximo; 准备=futuro distante"],ans:1,exp:"✅ 打算 é mais mental/intenção. 准备 inclui ação de preparação. 我打算去=planejo ir. 我准备好了=estou preparado. Sobreposição existe, mas a ênfase difere!"},
      {q:"O que significa 导游?",opts:["turista","passaporte","guia turístico","ponto turístico"],ans:2,exp:"✅ 导游 dǎoyóu = guia turístico. 导=guiar/conduzir + 游=turismo/passeio. A pessoa que guia o passeio!"},
      {q:"Como dizer 'Vou viajar para a França no próximo ano'?",opts:["我将来去法国旅行。","我打算明年去法国旅行。","我以为去法国旅行。","我越来越去法国旅行。"],ans:1,exp:"✅ 我打算明年去法国旅行 — 打算+V para intenção futura, 明年=próximo ano. 将来 é mais vago (no futuro). Para plano específico, use 打算/准备 + tempo específico."},
    ],
  },

  // ── SEMANA 11 ──────────────────────────────────────────────────────
  { w:11, phase:"Revisão", emoji:"🔍", color:"#374151",
    theme:"Revisão Intensiva — Vocabulário, Gramática e Simulados Parciais",
    stats:{ words:"Consolidação total", newHSK2:"0 novas", grammar:"Revisão dos 41 pontos HSK 2", chars:"Treino dos 300 caracteres" },
    vocab:[
      {h:"复习",py:"fùxí",pt:"revisar"},{h:"总结",py:"zǒngjié",pt:"resumir/concluir"},{h:"重要",py:"zhòngyào",pt:"importante"},
      {h:"仔细",py:"zǐxì",pt:"cuidadoso/atento"},{h:"认真",py:"rènzhēn",pt:"sério/dedicado"},{h:"努力",py:"nǔlì",pt:"esforçado"},
      {h:"一定",py:"yīdìng",pt:"com certeza"},{h:"肯定",py:"kěndìng",pt:"certamente/confirmar"},{h:"可能",py:"kěnéng",pt:"possivelmente"},
      {h:"也许",py:"yěxǔ",pt:"talvez"},{h:"差不多",py:"chàbuduō",pt:"quase/mais ou menos"},{h:"完全",py:"wánquán",pt:"completamente"},
      {h:"一般",py:"yībān",pt:"em geral/comum"},{h:"特别",py:"tèbié",pt:"especialmente/em particular"},{h:"尤其",py:"yóuqí",pt:"especialmente/sobretudo"},
      {h:"另外",py:"lìngwài",pt:"além disso/por outro lado"},{h:"而且",py:"érqiě",pt:"além disso/e ainda"},{h:"总是",py:"zǒngshì",pt:"sempre"},
      {h:"从来",py:"cónglái",pt:"nunca(+不)/sempre"},{h:"偶尔",py:"ǒu'ěr",pt:"ocasionalmente/às vezes"},
    ],
    grammar:[
      { struct:"Revisão: 连接词 — Conectivos Lógicos", label:"Todos os Conectivos HSK 2", color:"#374151",
        exp:"虽然...但是(embora) · 不但...而且(não só...mas) · 因为...所以(porque...por isso) · 如果...就(se...então) · 只有...才(somente...então) · 只要...就(desde que...então) · 既然...就(já que...então) · 除了...以外(além de/exceto)",
        exs:[{cn:"既然你来了，就多待一会儿吧。",py:"Jìrán nǐ lái le, jiù duō dāi yīhuìr ba.",pt:"Já que você veio, fique um pouco mais então."},{cn:"除了天气不好以外，一切都很完美。",py:"Chúle tiānqì bù hǎo yǐwài, yīqiè dōu hěn wánměi.",pt:"Exceto pelo mau tempo, tudo foi perfeito."}] },
      { struct:"Revisão: 助词 — Partículas Aspectuais", label:"了 · 过 · 着 · 呢", color:"#6366F1",
        exp:"了(conclusão/mudança) · 过(experiência) · 着(estado contínuo: 开着灯=luz acesa) · 呢(pergunta suave/progressivo enfático)",
        exs:[{cn:"门开着呢，进来吧！",py:"Mén kāi zhe ne, jìnlái ba!",pt:"A porta está aberta — entre!"},{cn:"你在哪儿呢？",py:"Nǐ zài nǎr ne?",pt:"Onde você está? (pergunta suave, com 呢)"}] },
      { struct:"Revisão: 补语 — Complementos", label:"结果/程度/方向/趋向", color:"#DC2626",
        exp:"结果补语(V+好/完/到/见): 我做完了。 · 程度补语(V+得): 她说得很好。 · 趋向补语(进来/出去/上去): 请进来。",
        exs:[{cn:"作业做完了吗？",py:"Zuòyè zuò wán le ma?",pt:"Já terminou o dever? (结果补语=完)"},{cn:"请把书拿过来。",py:"Qǐng bǎ shū ná guòlái.",pt:"Por favor traga o livro. (趋向补语=过来)"}] },
    ],
    dialogue:[
      {sp:"A",cn:"你准备好考试了吗？",py:"Nǐ zhǔnbèi hǎo kǎoshì le ma?",pt:"Você está preparado para a prova?"},
      {sp:"B",cn:"差不多了，但是有些语法我还是不太确定。",py:"Chàbuduō le, dànshì yǒuxiē yǔfǎ wǒ hái shì bú tài quèdìng.",pt:"Mais ou menos — mas ainda não tenho tanta certeza sobre algumas regras gramaticais."},
      {sp:"A",cn:"只要你认真复习，一定能考好！虽然难，但是你努力学了这么久。",py:"Zhǐyào nǐ rènzhēn fùxí, yīdìng néng kǎo hǎo! Suīrán nán, dànshì nǐ nǔlì xué le zhème jiǔ.",pt:"Desde que revises com seriedade, vai passar! Embora seja difícil, você estudou muito por tanto tempo."},
      {sp:"B",cn:"谢谢！既然准备了这么久，就一定要成功！",py:"Xièxie! Jìrán zhǔnbèi le zhème jiǔ, jiù yīdìng yào chénggōng!",pt:"Obrigado! Já que me preparei por tanto tempo, com certeza vou ter sucesso!"},
    ],
    quiz:[
      {q:"'既然你来了，就多待一会儿' — 既然...就 indica:",opts:["condição futura","contraste","já que (aceitar um fato e tirar conclusão)","sequência temporal"],ans:2,exp:"✅ 既然...就 = já que (aceitar fato real) → então (conclusão lógica). Diferente de 如果(hipótese) porque 既然 aceita algo que JÁ É VERDADE."},
      {q:"'门开着' — qual partícula indica estado contínuo?",opts:["了","过","着","呢"],ans:2,exp:"✅ 着 zhe indica estado contínuo resultante de uma ação: 开着(está aberto), 坐着(está sentado), 穿着(está vestindo). Um estado que persiste!"},
      {q:"'作业做完了' — 完 é qual tipo de complemento?",opts:["程度补语","结果补语","趋向补语","时间补语"],ans:1,exp:"✅ 结果补语 (complemento de resultado): 做完=terminou de fazer. 完=resultado de conclusão total. Outros: 做好(fez bem), 做到(chegou a fazer), 看见(viu/conseguiu ver)."},
      {q:"Qual conectivo equivale a 'já que' (aceitando um fato)?",opts:["如果","只要","既然","虽然"],ans:2,exp:"✅ 既然 jìrán = já que (fato aceito). 如果=se(hipótese), 只要=desde que(condição suficiente), 虽然=embora(contraste)."},
      {q:"'从来不' significa:",opts:["às vezes não","frequentemente não","nunca (em toda a vida)","raramente"],ans:2,exp:"✅ 从来+不/没 = nunca (com referência a toda a experiência passada). 我从来不喝酒=nunca bebi álcool na vida. 偶尔=às vezes/ocasionalmente."},
    ],
  },

  // ── SEMANA 12 ──────────────────────────────────────────────────────
  { w:12, phase:"Simulado", emoji:"🏆", color:"#059669",
    theme:"Simulado Final HSK 2 + Estratégias de Prova",
    stats:{ words:"Simulado integrado", newHSK2:"0", grammar:"Revisão focada nos erros", chars:"Simulado de escrita" },
    vocab:[
      {h:"加油",py:"jiāyóu",pt:"vai com tudo! (encorajamento)"},{h:"成功",py:"chénggōng",pt:"sucesso/ter sucesso"},
      {h:"失败",py:"shībài",pt:"fracasso/falhar"},{h:"进步",py:"jìnbù",pt:"progresso/avançar"},{h:"提高",py:"tígāo",pt:"melhorar/elevar"},
      {h:"水平",py:"shuǐpíng",pt:"nível/habilidade"},{h:"能力",py:"nénglì",pt:"capacidade/habilidade"},{h:"机会",py:"jīhuì",pt:"oportunidade"},
      {h:"经验",py:"jīngyàn",pt:"experiência"},{h:"结果",py:"jiéguǒ",pt:"resultado"},{h:"通过",py:"tōngguò",pt:"passar/ser aprovado"},
      {h:"合格",py:"hégé",pt:"qualificado/aprovado"},{h:"证书",py:"zhèngshū",pt:"certificado"},{h:"合格",py:"hégé",pt:"estar aprovado"},
      {h:"放松",py:"fàngsōng",pt:"relaxar"},{h:"自信",py:"zìxìn",pt:"confiante/autoconfiança"},{h:"紧张",py:"jǐnzhāng",pt:"nervoso"},
      {h:"认真",py:"rènzhēn",pt:"sério/cuidadoso"},{h:"仔细",py:"zǐxì",pt:"atento/cuidadoso"},{h:"检查",py:"jiǎnchá",pt:"verificar/checar"},
    ],
    grammar:[
      { struct:"Estratégias HSK 2 — Listening (听力)", label:"Seção de Áudio", color:"#059669",
        exp:"O Listening tem 35 questões (Nível 2). Dicas: ① Leia as opções ANTES de ouvir. ② Preste atenção em 什么时候/哪里/谁/为什么. ③ A resposta raramente repete as palavras exatas do áudio — procure sinônimos. ④ Se errar, siga em frente!",
        exs:[{cn:"他们在哪里说话？",py:"Tā men zài nǎlǐ shuōhuà?",pt:"Onde eles estão conversando? (tipo comum de questão)"},{cn:"他为什么没去？",py:"Tā wèishénme méi qù?",pt:"Por que ele não foi? (questão causal frequente)"}] },
      { struct:"Estratégias HSK 2 — Reading (阅读)", label:"Seção de Leitura", color:"#6366F1",
        exp:"O Reading tem 25 questões. Dicas: ① Para completar frases, identifique o PADRÃO gramatical necessário. ② Para ordenar frases, procure palavras de sequência: 先/然后/最后/后来. ③ Leia o contexto antes de escolher.",
        exs:[{cn:"先___, 然后___, 最后___。",py:"Xiān___, ránhòu___, zuìhòu___.",pt:"Primeiro___, depois___, por fim___. (sequência comum nas questões)"},{cn:"虽然___，但是___。",py:"Suīrán___, dànshì___.",pt:"Embora___, mesmo assim___. (conectivo em questões de completar)"}] },
      { struct:"Revisão Final: Os 10 Erros Mais Comuns", label:"Evite Estes Erros", color:"#DC2626",
        exp:"① 我是好 ❌ → 我很好. ② 不有 ❌ → 没有. ③ 他去了北京过 ❌ → 他去过北京. ④ 越来越很好 ❌ → 越来越好. ⑤ 比我很高 ❌ → 比我高. ⑥ 她学习在图书馆 ❌ → 她在图书馆学习. ⑦ 二个 ❌ → 两个. ⑧ 往左走在路口 ❌ → 在路口往左走. ⑨ 有点儿开心 ❌ → 比较开心. ⑩ 我今天学习汉语下午 ❌ → 我今天下午学习汉语.",
        exs:[{cn:"✅ 今天她在家做作业。",py:"Jīntiān tā zài jiā zuò zuòyè.",pt:"Hoje ela faz o dever em casa. (tempo+sujeito+在+lugar+V+O)"},{cn:"✅ 她说得比我好多了。",py:"Tā shuō de bǐ wǒ hǎo duō le.",pt:"Ela fala muito melhor do que eu. (V+得+比+B+adj+intensificador)"}] },
    ],
    dialogue:[
      {sp:"A",cn:"考试快到了，你紧张吗？",py:"Kǎoshì kuài dào le, nǐ jǐnzhāng ma?",pt:"A prova está chegando, você está nervoso?"},
      {sp:"B",cn:"有一点儿，但是我已经准备好了。这十二周学了很多！",py:"Yǒu yīdiǎnr, dànshì wǒ yǐjīng zhǔnbèi hǎo le. Zhè shí'èr zhōu xué le hěn duō!",pt:"Um pouquinho — mas já estou preparado. Aprendi muito nestas doze semanas!"},
      {sp:"A",cn:"只要你认真做，一定能通过！考试以后，我们一起庆祝！",py:"Zhǐyào nǐ rènzhēn zuò, yīdìng néng tōngguò! Kǎoshì yǐhòu, wǒmen yīqǐ qìngzhù!",pt:"Desde que você faça com atenção, vai passar com certeza! Após a prova, comemoramos juntos!"},
      {sp:"B",cn:"好！我越来越有信心了。加油！",py:"Hǎo! Wǒ yuèláiyuè yǒu xìnxīn le. Jiāyóu!",pt:"Ótimo! Estou ficando cada vez mais confiante. Vai com tudo!"},
    ],
    quiz:[
      {q:"No HSK 2 Reading, ao completar '虽然天气很冷，___我出门了', qual palavra usar?",opts:["因为","所以","但是","如果"],ans:2,exp:"✅ 虽然...但是 = embora...mesmo assim. 虽然(embora) na primeira cláusula → 但是(mas) na segunda. Pares de conectivos são sempre testados no HSK!"},
      {q:"Qual das frases está 100% correta?",opts:["我在家学习今天。","今天我在家学习。","我今天学习在家。","在家我今天学习。"],ans:1,exp:"✅ 今天我在家学习 — TEMPO (今天) + SUJEITO (我) + 在+lugar (在家) + VERBO (学习). Esta é a ordem padrão da frase HSK 2!"},
      {q:"'她的汉语水平越来越高了' — 水平 significa:",opts:["temperatura","nível/habilidade","altura","velocidade"],ans:1,exp:"✅ 水平 shuǐpíng = nível/padrão de habilidade. 水=água(=horizontal), 平=plano. Origem: o nível da água é sempre horizontal = padrão/referência!"},
      {q:"Para 'não tenho certeza' (possibilidade) usa-se:",opts:["一定","肯定","可能","必须"],ans:2,exp:"✅ 可能 kěnéng = possivelmente/talvez. 一定/肯定=com certeza, 必须=obrigado a. 也许 yěxǔ é sinônimo de 可能 mas mais literário."},
      {q:"加油！Qual a tradução mais próxima?",opts:["Boa sorte!","Vai com tudo! / Força!","Cuidado!","Ótimo!"],ans:1,exp:"✅ 加油 jiāyóu = literalmente 'adicione combustível' → Vai com tudo! / Força! É o encorajamento mais universal do mandarim — você ouve em competições, exames, no dia a dia!"},
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════
// COMPONENTE
// ═══════════════════════════════════════════════════════════════════════
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
