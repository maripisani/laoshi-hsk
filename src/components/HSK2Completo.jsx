import { useState } from "react";

const ink = "#0F172A"; const sand = "#FAFAF8"; const muted = "#64748B"; const bdr = "#E2E8F0";
const TC = ["#9CA3AF","#0891B2","#059669","#7C3AED","#DC2626"];

// ══════════════════════════════════════════════════════════════════════════════
// LAOSHI 老师 — HSK 2 PROGRAMA COMPLETO · Revisão v3
// 200 entradas · 12 lições · 36 pontos gramaticais · 60 questões
// Fonte: GF0025-2021 / Atualização 2025-11 (vigência Jul/2026)
// ══════════════════════════════════════════════════════════════════════════════

const WEEKS = [
  {
    w:1, phase:"Social", emoji:"🤝", color:"#6366F1",
    theme:"Apresentar-se, Nomes e Fórmulas de Cortesia",
    built:false, builtNote:"",
    stats:{words:"16 novas (HSK 2)",newHSK2:"16",grammar:"认识/介绍 · 让 causativo · 跟…一起",chars:"+25 novos"},
    vocab:[
      {h:"不好意思",py:"bù hǎoyìsi",pt:"com licença; ficar sem jeito"},
      {h:"没意思",py:"méi yìsi",pt:"sem graça; entediante"},
      {h:"有意思",py:"yǒu yìsi",pt:"interessante; divertido"},
      {h:"意思",py:"yìsi",pt:"significado; sentido"},
      {h:"告诉",py:"gàosu",pt:"contar para; informar"},
      {h:"介绍",py:"jièshào",pt:"apresentar; introduzir"},
      {h:"姓",py:"xìng",pt:"sobrenome; ter sobrenome"},
      {h:"姓名",py:"xìngmíng",pt:"nome completo"},
      {h:"名",py:"míng",pt:"nome; famoso"},
      {h:"让",py:"ràng",pt:"deixar; fazer (causativo)"},
      {h:"跟",py:"gēn",pt:"com; seguir"},
      {h:"等",py:"děng",pt:"esperar; etcétera"},
      {h:"别",py:"bié",pt:"não (imperativo); outro"},
      {h:"画",py:"huà",pt:"desenhar; pintar"},
      {h:"离",py:"lí",pt:"distanciar-se de"},
      {h:"事情",py:"shìqing",pt:"assunto; coisa"}
    ],
    grammar:[
      {struct:"认识 / 知道",label:"Conhecer Pessoa vs. Saber Fato",color:"#6366F1",exp:"认识 = conhecer alguém ou reconhecer um caractere (contato direto). 知道 = saber uma informação. ❌我知道他，我们是朋友。 ✅我认识他。 Para caracteres: 这个字我不认识 (não reconheço).",exs:[{cn:"我认识他，但是不知道他的电话。",py:"Wǒ rènshi tā, dànshì bù zhīdào tā de diànhuà.",pt:"Eu o conheço, mas não sei o telefone dele."},{cn:"这个字我不认识，你能教我吗？",py:"Zhège zì wǒ bú rènshi, nǐ néng jiāo wǒ ma?",pt:"Não reconheço este caractere, pode me ensinar?"},{cn:"你知道洗手间在哪儿吗？",py:"Nǐ zhīdào xǐshǒujiān zài nǎr ma?",pt:"Você sabe onde fica o banheiro?"}]},
      {struct:"S + 让 + 人 + V",label:"Causativo com 让",color:"#0891B2",exp:"让 + pessoa + verbo = fazer/deixar alguém fazer algo. A pessoa vem SEMPRE entre 让 e o verbo. Negação: 别让 / 不让. É o padrão para pedidos, permissões e ordens no dia a dia.",exs:[{cn:"妈妈让我早点儿回家。",py:"Māma ràng wǒ zǎo diǎnr huí jiā.",pt:"Minha mãe mandou eu voltar cedo para casa."},{cn:"不好意思，让你等了这么久。",py:"Bù hǎoyìsi, ràng nǐ děng le zhème jiǔ.",pt:"Desculpe por ter feito você esperar tanto."},{cn:"别让孩子一个人出门。",py:"Bié ràng háizi yí gè rén chūmén.",pt:"Não deixe a criança sair sozinha."}]},
      {struct:"S + 跟 + 人 + 一起 + V",label:"Fazer Junto com Alguém",color:"#059669",exp:"跟 introduz o acompanhante e vem ANTES do verbo, nunca depois. 跟…一起 = junto com. 跟 também significa \"seguir\". ❌我去跟他一起。 ✅我跟他一起去。",exs:[{cn:"我跟朋友一起去饭馆吃饭。",py:"Wǒ gēn péngyou yìqǐ qù fànguǎn chīfàn.",pt:"Vou ao restaurante comer com um amigo."},{cn:"你跟谁一起来的？",py:"Nǐ gēn shéi yìqǐ lái de?",pt:"Com quem você veio?"},{cn:"请跟我来，我给你介绍一下。",py:"Qǐng gēn wǒ lái, wǒ gěi nǐ jièshào yíxià.",pt:"Venha comigo, vou fazer uma apresentação."}]}
    ],
    dialogue:[
      {sp:"A",cn:"你好！我叫玛丽，很高兴认识你。",py:"Nǐ hǎo! Wǒ jiào Mǎlì, hěn gāoxìng rènshi nǐ.",pt:"Olá! Me chamo Mari, muito prazer em conhecê-lo."},
      {sp:"B",cn:"你好！我姓王，叫王明。",py:"Nǐ hǎo! Wǒ xìng Wáng, jiào Wáng Míng.",pt:"Olá! Meu sobrenome é Wang, me chamo Wang Ming."},
      {sp:"A",cn:"不好意思，让你等了很久吧？",py:"Bù hǎoyìsi, ràng nǐ děng le hěn jiǔ ba?",pt:"Desculpe, fiz você esperar muito, não é?"},
      {sp:"B",cn:"没关系，我也刚到。我跟朋友一起来的。",py:"Méi guānxi, wǒ yě gāng dào. Wǒ gēn péngyou yìqǐ lái de.",pt:"Sem problema, também acabei de chegar. Vim com um amigo."},
      {sp:"A",cn:"那你给我介绍一下吧！",py:"Nà nǐ gěi wǒ jièshào yíxià ba!",pt:"Então me apresente a ele!"},
      {sp:"B",cn:"好啊，他就在外面，我让他进来。",py:"Hǎo a, tā jiù zài wàimiàn, wǒ ràng tā jìnlái.",pt:"Claro, ele está lá fora, vou pedir que entre."}
    ],
    quiz:[
      {q:"\"Eu o conheço, mas não sei o telefone dele\" usa:",opts:["知道…知道","认识…知道","知道…认识","认识…认识"],ans:1,exp:"✅ 认识他(conhecer pessoa) + 不知道电话(saber informação). 认识 é contato direto; 知道 é informação."},
      {q:"Onde vai a pessoa na estrutura com 让?",opts:["Depois do verbo","Entre 让 e o verbo","No fim da frase","Antes de 让"],ans:1,exp:"✅ 妈妈让我回家 — a pessoa fica sempre entre 让 e o verbo que ela vai executar."},
      {q:"\"Vou com um amigo\" =",opts:["我去跟朋友一起。","我跟朋友一起去。","我一起跟朋友去。","跟我朋友去一起。"],ans:1,exp:"✅ 跟…一起 vem ANTES do verbo. Em chinês, o acompanhante nunca aparece depois da ação."},
      {q:"不好意思 é usado para:",opts:["Agradecer","Pedir desculpa leve / constrangimento","Elogiar","Despedir-se"],ans:1,exp:"✅ 不好意思 é uma desculpa branda ou sinal de constrangimento — mais leve que 对不起, que marca falta séria."},
      {q:"\"Meu sobrenome é Wang\" =",opts:["我是姓王。","我姓王。","我叫姓王。","我的姓王。"],ans:1,exp:"✅ 我姓王 — 姓 já É o verbo, então não leva 是. ❌我是姓王 é agramatical."}
    ],
  },
  {
    w:2, phase:"Movimento", emoji:"🚶", color:"#0891B2",
    theme:"Verbos Direcionais — Entrar, Sair, Subir, Descer",
    built:false, builtNote:"",
    stats:{words:"18 novas (HSK 2)",newHSK2:"18",grammar:"V + 来/去 · 进出上下 · 起来 figurado",chars:"+25 novos"},
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
      {struct:"V + 来 / 去",label:"Direcional Simples",color:"#6366F1",exp:"来 = movimento em direção ao falante. 去 = afastando-se dele. A escolha depende de ONDE o falante está: quem está dentro diz 进来; quem está fora diz 进去. É o eixo de todo o sistema direcional.",exs:[{cn:"快进来！外面很冷。",py:"Kuài jìnlái! Wàimiàn hěn lěng.",pt:"Entre rápido! Está frio lá fora."},{cn:"他出去了，一会儿就回来。",py:"Tā chūqù le, yíhuìr jiù huílái.",pt:"Ele saiu, volta daqui a pouco."},{cn:"你上来吧，我在楼上等你。",py:"Nǐ shànglái ba, wǒ zài lóushàng děng nǐ.",pt:"Suba, estou te esperando lá em cima."}]},
      {struct:"进/出/上/下 + 来/去",label:"Os Oito Direcionais",color:"#0891B2",exp:"Combine a direção (进entrar 出sair 上subir 下descer 回voltar 过atravessar) com a perspectiva (来cá 去lá). Resultado: 进来/进去, 出来/出去, 上来/上去, 下来/下去, 回来/回去, 过来/过去.",exs:[{cn:"请下来一下，有人找你。",py:"Qǐng xiàlái yíxià, yǒu rén zhǎo nǐ.",pt:"Desça um instante, alguém procura por você."},{cn:"他回去拿书包了。",py:"Tā huíqù ná shūbāo le.",pt:"Ele voltou para pegar a mochila."},{cn:"你过来看看这个。",py:"Nǐ guòlái kànkan zhège.",pt:"Venha cá ver isto."}]},
      {struct:"想/看/站 + 起来",label:"起来 em Sentido Figurado",color:"#059669",exp:"Além de \"levantar\", 起来 marca início ou percepção: 想起来(lembrar-se), 看起来(parecer), 说起来(por falar nisso). Este uso abstrato é muito mais frequente na fala que o literal.",exs:[{cn:"我想起来了！他叫李明。",py:"Wǒ xiǎng qǐlái le! Tā jiào Lǐ Míng.",pt:"Me lembrei! O nome dele é Li Ming."},{cn:"你看起来有点儿累。",py:"Nǐ kàn qǐlái yǒudiǎnr lèi.",pt:"Você parece um pouco cansado."},{cn:"听到这个消息，大家都笑起来了。",py:"Tīngdào zhège xiāoxi, dàjiā dōu xiào qǐlái le.",pt:"Ao ouvir a notícia, todos começaram a rir."}]}
    ],
    dialogue:[
      {sp:"A",cn:"你出去了吗？我刚才进来没看见你。",py:"Nǐ chūqù le ma? Wǒ gāngcái jìnlái méi kànjiàn nǐ.",pt:"Você saiu? Quando entrei não te vi."},
      {sp:"B",cn:"对，我出门走了走，刚回来。",py:"Duì, wǒ chūmén zǒu le zǒu, gāng huílái.",pt:"Sim, saí para caminhar um pouco e acabei de voltar."},
      {sp:"A",cn:"你看起来很累。",py:"Nǐ kàn qǐlái hěn lèi.",pt:"Você parece cansado."},
      {sp:"B",cn:"走了一个小时，从公园回来的。",py:"Zǒu le yí gè xiǎoshí, cóng gōngyuán huílái de.",pt:"Andei uma hora, voltei do parque."},
      {sp:"A",cn:"那快上来休息吧，我在楼上等你。",py:"Nà kuài shànglái xiūxi ba, wǒ zài lóushàng děng nǐ.",pt:"Então suba para descansar, estou te esperando lá em cima."},
      {sp:"B",cn:"好，我先下去拿一下书包，马上过来。",py:"Hǎo, wǒ xiān xiàqù ná yíxià shūbāo, mǎshàng guòlái.",pt:"Certo, primeiro desço para pegar a mochila e já subo."}
    ],
    quiz:[
      {q:"Quem está DENTRO da casa diz, para chamar alguém:",opts:["进去","进来","出来","上去"],ans:1,exp:"✅ 进来 — 来 marca movimento em direção ao falante. Quem está fora diria 进去."},
      {q:"回去 significa:",opts:["Voltar para cá","Voltar para lá (longe do falante)","Sair","Entrar"],ans:1,exp:"✅ 回(voltar) + 去(afastando-se). 回来 seria voltar para onde o falante está."},
      {q:"想起来了 significa:",opts:["Comecei a pensar","Me lembrei","Levantei","Quero levantar"],ans:1,exp:"✅ 起来 aqui é figurado: marca a emergência de uma lembrança. Uso muito mais comum que o literal."},
      {q:"看起来 significa:",opts:["Olhar para cima","Parecer","Começar a ver","Terminar de ver"],ans:1,exp:"✅ 你看起来很累 = você parece cansado. 起来 expressa impressão a partir da aparência."},
      {q:"Qual está ERRADA?",opts:["他出去了。","他进来了。","他来出了。","他回来了。"],ans:2,exp:"✅ ❌他来出了 — a ordem é sempre DIREÇÃO + 来/去, nunca invertida."}
    ],
  },
  {
    w:3, phase:"Cidade", emoji:"🚇", color:"#059669",
    theme:"Transporte, Lugares e Trajetos",
    built:false, builtNote:"",
    stats:{words:"17 novas (HSK 2)",newHSK2:"17",grammar:"从…到… · 坐+transporte · 往+direção",chars:"+25 novos"},
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
      {h:"打车",py:"dǎchē",pt:"pegar táxi"},
      {h:"站",py:"zhàn",pt:"estação; parada; ficar em pé"},
      {h:"外国",py:"wàiguó",pt:"país estrangeiro"},
      {h:"出国",py:"chūguó",pt:"ir ao exterior"}
    ],
    grammar:[
      {struct:"从 A 到 B",label:"De A até B",color:"#6366F1",exp:"从 marca o ponto de partida e 到 o destino. Ambos vêm ANTES do verbo. Serve para lugar e para tempo: 从八点到十点. ❌我走从家到学校。 ✅我从家到学校走路。",exs:[{cn:"从这里到机场要多长时间？",py:"Cóng zhèlǐ dào jīchǎng yào duō cháng shíjiān?",pt:"Quanto tempo leva daqui até o aeroporto?"},{cn:"我从早上八点工作到下午五点。",py:"Wǒ cóng zǎoshang bā diǎn gōngzuò dào xiàwǔ wǔ diǎn.",pt:"Trabalho das oito da manhã às cinco da tarde."},{cn:"从酒店到商场走路十分钟。",py:"Cóng jiǔdiàn dào shāngchǎng zǒulù shí fēnzhōng.",pt:"Do hotel ao shopping são dez minutos a pé."}]},
      {struct:"坐 / 打 + 交通工具",label:"Meios de Transporte",color:"#0891B2",exp:"坐 = usar transporte onde se senta (地铁, 公交车, 飞机). 打车 = pegar táxi (verbo separável: 打了一辆车). 走路 = a pé. O meio de transporte vem antes do verbo principal.",exs:[{cn:"我每天坐公交车上班。",py:"Wǒ měitiān zuò gōngjiāochē shàngbān.",pt:"Vou de ônibus para o trabalho todo dia."},{cn:"时间来不及了，我们打车去吧。",py:"Shíjiān láibují le, wǒmen dǎchē qù ba.",pt:"Não vai dar tempo, vamos de táxi."},{cn:"你是坐地铁来的还是走路来的？",py:"Nǐ shì zuò dìtiě lái de háishi zǒulù lái de?",pt:"Você veio de metrô ou a pé?"}]},
      {struct:"往 + 方向 + V",label:"Rumo com 往",color:"#059669",exp:"往 indica a direção do movimento, não o destino final: 往前走(siga em frente), 往左拐(vire à esquerda). Sempre antes do verbo. Para destino, use 到 ou 去.",exs:[{cn:"往前走，车站就在右边。",py:"Wǎng qián zǒu, chēzhàn jiù zài yòubian.",pt:"Siga em frente, a estação fica à direita."},{cn:"从这个路口往左走五分钟。",py:"Cóng zhège lùkǒu wǎng zuǒ zǒu wǔ fēnzhōng.",pt:"Deste cruzamento, cinco minutos à esquerda."},{cn:"这条路往哪边走？",py:"Zhè tiáo lù wǎng nǎ biān zǒu?",pt:"Para que lado vai esta rua?"}]}
    ],
    dialogue:[
      {sp:"A",cn:"请问，从这里到机场怎么走？",py:"Qǐngwèn, cóng zhèlǐ dào jīchǎng zěnme zǒu?",pt:"Com licença, como vou daqui ao aeroporto?"},
      {sp:"B",cn:"往前走，车站就在右边，坐地铁最快。",py:"Wǎng qián zǒu, chēzhàn jiù zài yòubian, zuò dìtiě zuì kuài.",pt:"Siga em frente, a estação fica à direita; de metrô é o mais rápido."},
      {sp:"A",cn:"要多长时间？",py:"Yào duō cháng shíjiān?",pt:"Quanto tempo leva?"},
      {sp:"B",cn:"大概四十分钟。时间来不及就打车吧。",py:"Dàgài sìshí fēnzhōng. Shíjiān láibují jiù dǎchē ba.",pt:"Uns quarenta minutos. Se não der tempo, pegue um táxi."},
      {sp:"A",cn:"我要出国，机票已经买好了。",py:"Wǒ yào chūguó, jīpiào yǐjīng mǎi hǎo le.",pt:"Vou para o exterior, já comprei a passagem."},
      {sp:"B",cn:"那祝你一路平安！",py:"Nà zhù nǐ yí lù píng ān!",pt:"Então boa viagem!"}
    ],
    quiz:[
      {q:"\"Daqui até o aeroporto\" =",opts:["从这里到机场","到这里从机场","这里从机场到","从到这里机场"],ans:0,exp:"✅ 从(partida) + 到(destino), ambos antes do verbo."},
      {q:"打车 significa:",opts:["Bater no carro","Pegar táxi","Dirigir","Consertar carro"],ans:1,exp:"✅ 打车 = pegar táxi. É verbo separável: 打了一辆车."},
      {q:"\"Siga em frente\" =",opts:["走往前","往前走","前往走","走前往"],ans:1,exp:"✅ 往 + direção + verbo. A preposição sempre antecede o verbo de movimento."},
      {q:"往 difere de 到 porque:",opts:["往 = rumo; 到 = destino alcançado","São iguais","到 é informal","往 vai depois do verbo"],ans:0,exp:"✅ 往前走 indica a direção seguida; 到机场 indica o ponto de chegada."},
      {q:"Qual NÃO é meio de transporte?",opts:["地铁","公交车","洗手间","飞机"],ans:2,exp:"✅ 洗手间 = banheiro. Os demais são metrô, ônibus e avião."}
    ],
  },
  {
    w:4, phase:"Espaço", emoji:"📍", color:"#7C3AED",
    theme:"Posição, Lados e Classificadores de Lugar",
    built:false, builtNote:"",
    stats:{words:"17 novas (HSK 2)",newHSK2:"17",grammar:"方位词 · 在+lugar · 量词 间/位",chars:"+25 novos"},
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
      {h:"间",py:"jiān",pt:"(classif. cômodos)"},
      {h:"位",py:"wèi",pt:"(classif. pessoas - respeitoso)"},
      {h:"床",py:"chuáng",pt:"cama"},
      {h:"面",py:"miàn",pt:"rosto; macarrão; farinha"}
    ],
    grammar:[
      {struct:"N + 里面/外面/上面/下面",label:"Palavras de Posição",color:"#6366F1",exp:"O locativo vem SEMPRE depois do substantivo de referência: 书包里面, 桌子上面. Em português é o inverso (\"dentro da mochila\"). ❌在里面书包。 ✅在书包里面。",exs:[{cn:"我的手表在书包里面。",py:"Wǒ de shǒubiǎo zài shūbāo lǐmiàn.",pt:"Meu relógio está dentro da mochila."},{cn:"门口外面有人在等你。",py:"Ménkǒu wàimiàn yǒu rén zài děng nǐ.",pt:"Tem alguém esperando por você lá fora."},{cn:"床下面有一双鞋。",py:"Chuáng xiàmiàn yǒu yì shuāng xié.",pt:"Tem um par de sapatos embaixo da cama."}]},
      {struct:"S + 在 + 地点 + V",label:"Lugar Antes do Verbo",color:"#0891B2",exp:"Diferente do português, a expressão de lugar precede o verbo: 我在教室学习. ❌我学习在教室。 Como verbo pleno, porém, 在 fica sozinho: 我在教室(estou na sala).",exs:[{cn:"我在教室里等你。",py:"Wǒ zài jiàoshì lǐ děng nǐ.",pt:"Espero você na sala de aula."},{cn:"他在旁边的饭馆吃饭。",py:"Tā zài pángbiān de fànguǎn chīfàn.",pt:"Ele está comendo no restaurante ao lado."},{cn:"孩子们在外面跑来跑去。",py:"Háizimen zài wàimiàn pǎo lái pǎo qù.",pt:"As crianças correm de um lado para o outro lá fora."}]},
      {struct:"量词: 间 / 位 / 条",label:"Classificadores Específicos",color:"#059669",exp:"间 conta cômodos (一间教室). 位 conta pessoas com respeito (三位老师) — nunca use 位 para si mesmo. 条 conta coisas longas e flexíveis (一条路, 一条裤子, 一条鱼).",exs:[{cn:"这里有三间教室和一间洗手间。",py:"Zhèlǐ yǒu sān jiān jiàoshì hé yì jiān xǐshǒujiān.",pt:"Aqui há três salas de aula e um banheiro."},{cn:"今天来了两位老师。",py:"Jīntiān lái le liǎng wèi lǎoshī.",pt:"Hoje vieram dois professores."},{cn:"我买了一条裤子。",py:"Wǒ mǎi le yì tiáo kùzi.",pt:"Comprei uma calça."}]}
    ],
    dialogue:[
      {sp:"A",cn:"我的手表你看见了吗？",py:"Wǒ de shǒubiǎo nǐ kànjiàn le ma?",pt:"Você viu meu relógio?"},
      {sp:"B",cn:"在书包里面吧，我刚才放进去了。",py:"Zài shūbāo lǐmiàn ba, wǒ gāngcái fàng jìnqù le.",pt:"Deve estar dentro da mochila, acabei de guardar."},
      {sp:"A",cn:"找到了！书包在床下面。",py:"Zhǎodào le! Shūbāo zài chuáng xiàmiàn.",pt:"Achei! A mochila estava embaixo da cama."},
      {sp:"B",cn:"门口外面还有两位老师在等你。",py:"Ménkǒu wàimiàn hái yǒu liǎng wèi lǎoshī zài děng nǐ.",pt:"Ainda tem dois professores esperando por você na entrada."},
      {sp:"A",cn:"是在哪间教室？",py:"Shì zài nǎ jiān jiàoshì?",pt:"Em qual sala de aula?"},
      {sp:"B",cn:"就在洗手间旁边那间。",py:"Jiù zài xǐshǒujiān pángbiān nà jiān.",pt:"Naquela ao lado do banheiro."}
    ],
    quiz:[
      {q:"\"O relógio está dentro da mochila\" =",opts:["手表在里面书包。","手表在书包里面。","手表里面在书包。","书包在手表里面。"],ans:1,exp:"✅ O locativo vem DEPOIS da referência: 书包里面. Em português é o inverso."},
      {q:"\"Espero você na sala de aula\" =",opts:["我等你在教室。","我在教室等你。","我等在教室你。","在我教室等你。"],ans:1,exp:"✅ Lugar antes do verbo — regra estrutural do chinês, oposta à do português."},
      {q:"O classificador para salas/cômodos é:",opts:["条","位","间","张"],ans:2,exp:"✅ 间 conta cômodos: 一间教室, 三间房子."},
      {q:"位 é usado para:",opts:["Objetos planos","Pessoas, com respeito","Livros","Roupas"],ans:1,exp:"✅ 两位老师 — 位 é o classificador respeitoso. Não se usa para si mesmo."},
      {q:"Qual usa 条 corretamente?",opts:["一条老师","一条裤子","一条书","一条教室"],ans:1,exp:"✅ 条 serve para objetos longos e flexíveis: 裤子, 路, 鱼."}
    ],
  },
  {
    w:5, phase:"Comparação", emoji:"⚖️", color:"#D97706",
    theme:"比, 最 e Graus de Qualidade",
    built:false, builtNote:"",
    stats:{words:"16 novas (HSK 2)",newHSK2:"16",grammar:"A 比 B + adj · 最 · A 没有 B 那么",chars:"+25 novos"},
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
      {h:"错",py:"cuò",pt:"errado; errar"},
      {h:"就",py:"jiù",pt:"então; logo; apenas"},
      {h:"那么",py:"nàme",pt:"então; assim"},
      {h:"那样",py:"nàyàng",pt:"desse jeito; assim"},
      {h:"这么",py:"zhème",pt:"assim; tão"},
      {h:"这样",py:"zhèyàng",pt:"desse jeito; assim"}
    ],
    grammar:[
      {struct:"A + 比 + B + Adj",label:"Comparação com 比",color:"#6366F1",exp:"A regra que mais derruba alunos: NUNCA use 很 no 比句. ❌今天比昨天很热。 ✅今天比昨天热 / 热多了 / 热一点儿. Para intensificar, use 更/还 antes ou 多了/一点儿 depois.",exs:[{cn:"今天比昨天热多了。",py:"Jīntiān bǐ zuótiān rè duō le.",pt:"Hoje está muito mais quente que ontem."},{cn:"这个包比那个贵一点儿。",py:"Zhège bāo bǐ nàge guì yìdiǎnr.",pt:"Esta bolsa é um pouco mais cara que aquela."},{cn:"他跑得比我快。",py:"Tā pǎo de bǐ wǒ kuài.",pt:"Ele corre mais rápido que eu."}]},
      {struct:"最 + Adj",label:"Superlativo com 最",color:"#0891B2",exp:"最 = o mais (superlativo absoluto). Vem antes do adjetivo ou verbo de sentimento: 最好, 最喜欢. Não precisa de 很 nem de 了. Frequente com 中/里面: 我们中最高的.",exs:[{cn:"这是我最喜欢的运动。",py:"Zhè shì wǒ zuì xǐhuan de yùndòng.",pt:"Este é meu esporte favorito."},{cn:"他是我们班里跑得最快的。",py:"Tā shì wǒmen bān lǐ pǎo de zuì kuài de.",pt:"Ele é o que corre mais rápido da nossa turma."},{cn:"这条路最近，走这边吧。",py:"Zhè tiáo lù zuì jìn, zǒu zhèbiān ba.",pt:"Este caminho é o mais curto, vamos por aqui."}]},
      {struct:"A + 没有 + B + (那么) + Adj",label:"Negar a Comparação",color:"#059669",exp:"A negação de 比 NÃO é 不比 (que soa como refutação), e sim A 没有 B + adj = A não é tão…quanto B. O 那么/这么 é opcional mas muito natural na fala.",exs:[{cn:"今天没有昨天那么冷。",py:"Jīntiān méiyǒu zuótiān nàme lěng.",pt:"Hoje não está tão frio quanto ontem."},{cn:"这个饭馆没有那个好。",py:"Zhège fànguǎn méiyǒu nàge hǎo.",pt:"Este restaurante não é tão bom quanto aquele."},{cn:"我的汉语没有他那么好。",py:"Wǒ de Hànyǔ méiyǒu tā nàme hǎo.",pt:"Meu chinês não é tão bom quanto o dele."}]}
    ],
    dialogue:[
      {sp:"A",cn:"这两个饭馆，你觉得哪个好？",py:"Zhè liǎng gè fànguǎn, nǐ juéde nǎge hǎo?",pt:"Destes dois restaurantes, qual você acha melhor?"},
      {sp:"B",cn:"左边那个比右边的好多了。",py:"Zuǒbian nàge bǐ yòubian de hǎo duō le.",pt:"O da esquerda é bem melhor que o da direita."},
      {sp:"A",cn:"可是右边那个最近。",py:"Kěshì yòubian nàge zuì jìn.",pt:"Mas o da direita é o mais perto."},
      {sp:"B",cn:"近是近，可是没有左边那个好吃。",py:"Jìn shì jìn, kěshì méiyǒu zuǒbian nàge hǎochī.",pt:"Perto ele é, mas não é tão gostoso quanto o da esquerda."},
      {sp:"A",cn:"那走过去要多久？",py:"Nà zǒu guòqù yào duō jiǔ?",pt:"Então quanto tempo leva a pé?"},
      {sp:"B",cn:"慢慢走十分钟，不算远。",py:"Mànmàn zǒu shí fēnzhōng, bú suàn yuǎn.",pt:"Devagar, dez minutos; não é longe."}
    ],
    quiz:[
      {q:"Qual está ERRADA?",opts:["今天比昨天热。","今天比昨天很热。","今天比昨天热多了。","今天比昨天更热。"],ans:1,exp:"✅ ❌比…很… — o erro mais frequente do nível. Use 更/还 antes ou 多了/一点儿 depois."},
      {q:"\"Não está tão frio quanto ontem\" =",opts:["今天不比昨天冷。","今天没有昨天那么冷。","今天比昨天不冷。","今天很不比昨天冷。"],ans:1,exp:"✅ A 没有 B 那么 + adj é a negação padrão da comparação."},
      {q:"最 significa:",opts:["Muito","O mais (superlativo)","Um pouco","Menos"],ans:1,exp:"✅ 最好, 最快, 最喜欢 — grau máximo absoluto, sem precisar de 很."},
      {q:"\"Um pouco mais caro\" =",opts:["一点儿贵","贵一点儿","很贵一点儿","有点儿贵一点儿"],ans:1,exp:"✅ Na comparação, 一点儿 vem DEPOIS do adjetivo: 贵一点儿."},
      {q:"Complete: 他跑得___我快。",opts:["很","比","最","没有"],ans:1,exp:"✅ 他跑得比我快 — o 比 pode aparecer dentro do complemento de grau."}
    ],
  },
  {
    w:6, phase:"Aspecto", emoji:"⏳", color:"#DC2626",
    theme:"Tempo, Frequência e as Partículas 了/过/着",
    built:false, builtNote:"",
    stats:{words:"16 novas (HSK 2)",newHSK2:"16",grammar:"了 · 过 experiencial · 着 · 快要…了",chars:"+25 novos"},
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
      {h:"每",py:"měi",pt:"cada; todo(s)"},
      {h:"过",py:"guò",pt:"passar; atravessar; celebrar — verbo"},
      {h:"过",py:"guo",pt:"partícula de experiência (já fez alguma vez)"},
      {h:"一起",py:"yìqǐ",pt:"juntos"}
    ],
    grammar:[
      {struct:"V + 了 / 句尾 + 了",label:"As Duas Faces de 了",color:"#6366F1",exp:"了 após o verbo = ação concluída (我吃了饭). 了 no fim da frase = mudança de estado (下雨了 = começou a chover). Negação com 没, e o 了 DESAPARECE: ❌我没吃了饭。 ✅我没吃饭。",exs:[{cn:"我已经买了机票。",py:"Wǒ yǐjīng mǎi le jīpiào.",pt:"Já comprei a passagem aérea."},{cn:"外面下雨了，带伞吧。",py:"Wàimiàn xià yǔ le, dài sǎn ba.",pt:"Começou a chover lá fora, leve guarda-chuva."},{cn:"他还没来，我们再等一会儿。",py:"Tā hái méi lái, wǒmen zài děng yíhuìr.",pt:"Ele ainda não veio, vamos esperar mais um pouco."}]},
      {struct:"V + 过 (guo)",label:"Experiência de Vida",color:"#0891B2",exp:"过 átono = \"já fiz isso alguma vez na vida\". Negação: 没 + V + 过. Cuidado: 过 também existe como VERBO tônico guò (passar, atravessar, celebrar) — 过年, 过来. Mesma grafia, funções distintas.",exs:[{cn:"我去过中国两次。",py:"Wǒ qù guo Zhōngguó liǎng cì.",pt:"Já estive na China duas vezes."},{cn:"你吃过北京烤鸭吗？——还没吃过。",py:"Nǐ chī guo Běijīng kǎoyā ma? —— Hái méi chī guo.",pt:"Já comeu pato de Pequim? —— Ainda não."},{cn:"我们在中国过过年，很热闹。",py:"Wǒmen zài Zhōngguó guò guo nián, hěn rènao.",pt:"Já passamos o Ano Novo na China, foi muito animado."}]},
      {struct:"V + 着 / 快要 … 了",label:"Estado Contínuo e Iminência",color:"#059669",exp:"着 marca estado persistente: 门开着(a porta está aberta) — diferente de 在+V (ação em curso). 快要…了 indica algo prestes a acontecer, sempre com 了 no fim.",exs:[{cn:"门开着呢，你进来吧。",py:"Mén kāi zhe ne, nǐ jìnlái ba.",pt:"A porta está aberta, pode entrar."},{cn:"他笑着说：“不客气。”",py:"Tā xiào zhe shuō: \"Bú kèqi.\"",pt:"Ele disse sorrindo: \"De nada\"."},{cn:"快要上课了，我们进教室吧。",py:"Kuàiyào shàngkè le, wǒmen jìn jiàoshì ba.",pt:"A aula vai começar, vamos entrar na sala."}]}
    ],
    dialogue:[
      {sp:"A",cn:"你吃了吗？",py:"Nǐ chī le ma?",pt:"Você já comeu?"},
      {sp:"B",cn:"还没有，我经常忘记吃午饭。",py:"Hái méiyǒu, wǒ jīngcháng wàngjì chī wǔfàn.",pt:"Ainda não, esqueço de almoçar com frequência."},
      {sp:"A",cn:"你吃过这家的饺子吗？",py:"Nǐ chī guo zhè jiā de jiǎozi ma?",pt:"Já comeu o guioza daqui?"},
      {sp:"B",cn:"没吃过。好吃吗？",py:"Méi chī guo. Hǎochī ma?",pt:"Nunca comi. É bom?"},
      {sp:"A",cn:"非常好吃！门开着，我们进去吧。",py:"Fēicháng hǎochī! Mén kāi zhe, wǒmen jìnqù ba.",pt:"Muito bom! A porta está aberta, vamos entrar."},
      {sp:"B",cn:"好，快要一点了，我已经很饿了。",py:"Hǎo, kuàiyào yì diǎn le, wǒ yǐjīng hěn è le.",pt:"Vamos, já é quase uma hora e estou com muita fome."}
    ],
    quiz:[
      {q:"了 no FIM da frase indica:",opts:["Ação concluída","Mudança de estado","Experiência","Estado contínuo"],ans:1,exp:"✅ 下雨了 = começou a chover (situação nova). Após o verbo, 了 marca conclusão: 我吃了饭."},
      {q:"Negação de 我吃了饭 é:",opts:["我没吃了饭。","我没吃饭。","我不吃了饭。","我吃没了饭。"],ans:1,exp:"✅ Ao negar com 没, o 了 DESAPARECE. Manter os dois é agramatical."},
      {q:"过 (guo) átono indica:",opts:["Ação em curso","Experiência de vida","Futuro","Obrigação"],ans:1,exp:"✅ 我去过中国 = já estive na China. Negação: 没去过."},
      {q:"门开着 significa:",opts:["A porta abriu","A porta está aberta","A porta vai abrir","A porta já abriu antes"],ans:1,exp:"✅ 着 marca estado persistente. 门开了 seria o evento de abrir."},
      {q:"过年 usa qual 过?",opts:["过 guo (partícula)","过 guò (verbo)","Nenhum","Os dois"],ans:1,exp:"✅ 过年 usa 过 guò tônico, verbo pleno = passar/celebrar. Diferente do 过 guo átono de experiência."}
    ],
  },
  {
    w:7, phase:"Bem-estar", emoji:"💊", color:"#059669",
    theme:"Corpo, Saúde e o Complemento de Grau 得",
    built:false, builtNote:"",
    stats:{words:"16 novas (HSK 2)",newHSK2:"16",grammar:"V + 得 + adj · 有点儿 · 太…了",chars:"+25 novos"},
    vocab:[
      {h:"身体",py:"shēntǐ",pt:"corpo; saúde"},
      {h:"头",py:"tóu",pt:"cabeça"},
      {h:"手",py:"shǒu",pt:"mão"},
      {h:"眼睛",py:"yǎnjing",pt:"olhos"},
      {h:"疼",py:"téng",pt:"doer; dor"},
      {h:"药",py:"yào",pt:"remédio; medicamento"},
      {h:"药店",py:"yàodiàn",pt:"farmácia"},
      {h:"舒服",py:"shūfu",pt:"confortável; bem"},
      {h:"累",py:"lèi",pt:"cansado"},
      {h:"快乐",py:"kuàilè",pt:"feliz"},
      {h:"笑",py:"xiào",pt:"rir; sorrir"},
      {h:"帮",py:"bāng",pt:"ajudar"},
      {h:"帮忙",py:"bāngmáng",pt:"ajudar, dar uma mão"},
      {h:"希望",py:"xīwàng",pt:"esperar; esperança"},
      {h:"晴",py:"qíng",pt:"ensolarado; bom tempo"},
      {h:"阴",py:"yīn",pt:"nublado; sombra"}
    ],
    grammar:[
      {struct:"V + 得 + Adj",label:"Complemento de Grau",color:"#6366F1",exp:"得 avalia COMO a ação é feita: 跑得很快. Havendo objeto, o verbo se repete: 他说汉语说得很好. Negação DEPOIS de 得: 说得不好 (não ❌不说得好).",exs:[{cn:"你汉语说得很不错！",py:"Nǐ Hànyǔ shuō de hěn búcuò!",pt:"Você fala chinês muito bem!"},{cn:"他昨天睡得不太好。",py:"Tā zuótiān shuì de bú tài hǎo.",pt:"Ele não dormiu muito bem ontem."},{cn:"这个孩子跑得真快。",py:"Zhège háizi pǎo de zhēn kuài.",pt:"Esta criança corre muito rápido."}]},
      {struct:"有点儿 + Adj",label:"Leve Incômodo",color:"#0891B2",exp:"有点儿 vem ANTES do adjetivo e carrega tom de queixa: 有点儿贵(caro demais para meu gosto). Já 一点儿 vem DEPOIS e é neutro: 便宜一点儿(um pouco mais barato). Posição e valência diferem.",exs:[{cn:"我今天有点儿累，想早点儿休息。",py:"Wǒ jīntiān yǒudiǎnr lèi, xiǎng zǎo diǎnr xiūxi.",pt:"Hoje estou meio cansado, quero descansar cedo."},{cn:"这件裤子有点儿贵，便宜一点儿行吗？",py:"Zhè jiàn kùzi yǒudiǎnr guì, piányí yìdiǎnr xíng ma?",pt:"Esta calça está meio cara, pode fazer um pouco mais barato?"},{cn:"我头有点儿疼，想去药店买药。",py:"Wǒ tóu yǒudiǎnr téng, xiǎng qù yàodiàn mǎi yào.",pt:"Minha cabeça dói um pouco, quero ir à farmácia."}]},
      {struct:"太 + Adj + 了",label:"Excesso e Exclamação",color:"#059669",exp:"太…了 marca excesso, mas na fala cotidiana vira exclamação positiva: 太好了！(que ótimo!), 太快乐了！O 了 final é praticamente obrigatório. O contexto define se é elogio ou reclamação.",exs:[{cn:"太好了！你终于来了！",py:"Tài hǎo le! Nǐ zhōngyú lái le!",pt:"Que ótimo! Você finalmente chegou!"},{cn:"这个包太贵了，我买不起。",py:"Zhège bāo tài guì le, wǒ mǎi bu qǐ.",pt:"Esta bolsa é cara demais, não posso comprar."},{cn:"今天太累了，我想休息。",py:"Jīntiān tài lèi le, wǒ xiǎng xiūxi.",pt:"Hoje estou cansadíssimo, quero descansar."}]}
    ],
    dialogue:[
      {sp:"A",cn:"你今天看起来有点儿累。",py:"Nǐ jīntiān kàn qǐlái yǒudiǎnr lèi.",pt:"Hoje você parece um pouco cansado."},
      {sp:"B",cn:"是啊，头有点儿疼，昨天睡得不太好。",py:"Shì a, tóu yǒudiǎnr téng, zuótiān shuì de bú tài hǎo.",pt:"Pois é, minha cabeça dói um pouco, dormi mal ontem."},
      {sp:"A",cn:"眼睛也红红的，别看手机了。",py:"Yǎnjing yě hóng hóng de, bié kàn shǒujī le.",pt:"Seus olhos estão vermelhos também, pare de olhar o celular."},
      {sp:"B",cn:"你说得对。药店远吗？",py:"Nǐ shuō de duì. Yàodiàn yuǎn ma?",pt:"Você tem razão. A farmácia é longe?"},
      {sp:"A",cn:"不远，就在前面。我帮你去买药吧。",py:"Bù yuǎn, jiù zài qiánmiàn. Wǒ bāng nǐ qù mǎi yào ba.",pt:"Não, é logo ali. Vou comprar o remédio para você."},
      {sp:"B",cn:"太好了，谢谢你的帮忙！",py:"Tài hǎo le, xièxie nǐ de bāngmáng!",pt:"Que ótimo, obrigado pela ajuda!"}
    ],
    quiz:[
      {q:"\"Ele fala chinês muito bem\" =",opts:["他说汉语得很好。","他汉语说得很好。","他得说汉语很好。","他很好说得汉语。"],ans:1,exp:"✅ Com objeto, o verbo se repete antes de 得: 说汉语说得很好 ou 汉语说得很好."},
      {q:"A negação do complemento de grau fica:",opts:["Antes do verbo","Depois de 得","Antes de 得","No fim da frase"],ans:1,exp:"✅ 说得不好 — a negação incide sobre o complemento, não sobre o verbo."},
      {q:"有点儿 vs 一点儿:",opts:["São iguais","有点儿 antes do adj (queixa); 一点儿 depois (neutro)","一点儿 antes; 有点儿 depois","Ambos vão depois"],ans:1,exp:"✅ 有点儿贵(caro demais) vs 便宜一点儿(um pouco mais barato). Posição e tom diferem."},
      {q:"太好了！expressa:",opts:["Reclamação","Entusiasmo","Dúvida","Recusa"],ans:1,exp:"✅ Apesar de 太 significar \"excesso\", na fala 太好了/太棒了 são exclamações positivas."},
      {q:"Qual está ERRADA?",opts:["我有点儿累。","这个有点儿贵。","便宜一点儿。","我一点儿累。"],ans:3,exp:"✅ ❌我一点儿累 — antes do adjetivo, o correto é 有点儿累."}
    ],
  },
  {
    w:8, phase:"Compras", emoji:"🛍", color:"#6366F1",
    theme:"Objetos, Cores, Preços e Classificadores",
    built:false, builtNote:"",
    stats:{words:"18 novas (HSK 2)",newHSK2:"18",grammar:"量词 条/张 · 多少钱 · 送 vs 给",chars:"+25 novos"},
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
      {struct:"数 + 量词 + 名",label:"Classificadores Obrigatórios",color:"#6366F1",exp:"Entre número e substantivo o classificador é obrigatório. 条(longos e flexíveis: 裤子, 路, 鱼), 张(planos: 票, 照片), 本(livros), 个(genérico). ❌两裤子。 ✅两条裤子。",exs:[{cn:"我买了两条裤子和三张票。",py:"Wǒ mǎi le liǎng tiáo kùzi hé sān zhāng piào.",pt:"Comprei duas calças e três ingressos."},{cn:"请给我一张机票。",py:"Qǐng gěi wǒ yì zhāng jīpiào.",pt:"Me dê uma passagem aérea, por favor."},{cn:"桌子上有一个本子和两支笔。",py:"Zhuōzi shàng yǒu yí gè běnzi hé liǎng zhī bǐ.",pt:"Sobre a mesa há um caderno e duas canetas."}]},
      {struct:"多少钱？/ 一共",label:"Perguntar Preço",color:"#0891B2",exp:"多少钱？= quanto custa. 一共多少钱？= quanto é no total. Unidades: 块(fala) = 元(escrita); 毛 = 角 = 0,1. Números grandes: 万 = 10.000 — atenção, não existe \"cem mil\" como palavra única.",exs:[{cn:"这条裤子多少钱？——两百块。",py:"Zhè tiáo kùzi duōshao qián? —— Liǎng bǎi kuài.",pt:"Quanto custa esta calça? —— Duzentos yuan."},{cn:"一共多少钱？——一共三百五。",py:"Yígòng duōshao qián? —— Yígòng sān bǎi wǔ.",pt:"Quanto é no total? —— Trezentos e cinquenta."},{cn:"这个手表要一万块。",py:"Zhège shǒubiǎo yào yí wàn kuài.",pt:"Este relógio custa dez mil yuan."}]},
      {struct:"送 vs 给",label:"Presentear vs. Entregar",color:"#059669",exp:"给 = dar/entregar (transferência neutra). 送 = presentear, ou acompanhar alguém até algum lugar (送你回家). 送给 combina os dois: presentear a alguém.",exs:[{cn:"我送给妈妈一条围巾。",py:"Wǒ sòng gěi māma yì tiáo wéijīn.",pt:"Dei um cachecol de presente para minha mãe."},{cn:"请给我一杯咖啡。",py:"Qǐng gěi wǒ yì bēi kāfēi.",pt:"Me traga um café, por favor."},{cn:"我去机场送朋友。",py:"Wǒ qù jīchǎng sòng péngyou.",pt:"Vou ao aeroporto me despedir de um amigo."}]}
    ],
    dialogue:[
      {sp:"A",cn:"我想买一条裤子，有黑色的吗？",py:"Wǒ xiǎng mǎi yì tiáo kùzi, yǒu hēisè de ma?",pt:"Quero comprar uma calça, tem preta?"},
      {sp:"B",cn:"有，白色、红色、绿色都有。",py:"Yǒu, báisè, hóngsè, lǜsè dōu yǒu.",pt:"Temos preta, branca, vermelha e verde."},
      {sp:"A",cn:"这条多少钱？",py:"Zhè tiáo duōshao qián?",pt:"Quanto custa esta?"},
      {sp:"B",cn:"两百八十块。这个颜色最好看。",py:"Liǎng bǎi bāshí kuài. Zhège yánsè zuì hǎokàn.",pt:"Duzentos e oitenta. Esta cor é a mais bonita."},
      {sp:"A",cn:"我要黑色的，送给妈妈。一共多少钱？",py:"Wǒ yào hēisè de, sòng gěi māma. Yígòng duōshao qián?",pt:"Quero a preta, é presente para minha mãe. Quanto é no total?"},
      {sp:"B",cn:"一共两百八十块，请拿好。",py:"Yígòng liǎng bǎi bāshí kuài, qǐng ná hǎo.",pt:"Duzentos e oitenta no total, aqui está."}
    ],
    quiz:[
      {q:"\"Duas calças\" =",opts:["两裤子","两条裤子","两张裤子","两本裤子"],ans:1,exp:"✅ 条 para objetos longos e flexíveis. O classificador é obrigatório entre número e substantivo."},
      {q:"O classificador para ingressos e fotos é:",opts:["条","张","本","间"],ans:1,exp:"✅ 张 conta objetos planos: 票, 照片, 纸, 桌子."},
      {q:"万 equivale a:",opts:["Mil","Dez mil","Cem mil","Um milhão"],ans:1,exp:"✅ 万 = 10.000. 一万块 = dez mil yuan."},
      {q:"\"Dei um presente para minha mãe\" =",opts:["我给妈妈送一个礼物。","我送给妈妈一个礼物。","我妈妈送给一个礼物。","A e B estão corretas."],ans:3,exp:"✅ 送给妈妈 e 给妈妈送 são ambas naturais. O que importa é que o destinatário venha antes do objeto."},
      {q:"送 difere de 给 porque:",opts:["送 = presentear ou acompanhar; 给 = entregar","给 é mais formal","São idênticos","送 só se usa com dinheiro"],ans:0,exp:"✅ 送朋友去机场 = acompanhar ao aeroporto. 给我一杯水 = me dê um copo d'água."}
    ],
  },
  {
    w:9, phase:"Lazer", emoji:"⚽", color:"#0891B2",
    theme:"Esportes, Hobbies e Internet",
    built:false, builtNote:"",
    stats:{words:"16 novas (HSK 2)",newHSK2:"16",grammar:"会/能/可以 · 打/踢 · 喜欢 + V",chars:"+25 novos"},
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
      {h:"动",py:"dòng",pt:"mover-se"},
      {h:"飞",py:"fēi",pt:"voar"}
    ],
    grammar:[
      {struct:"会 / 能 / 可以",label:"Três Modais de Capacidade",color:"#6366F1",exp:"会 = saber fazer (habilidade aprendida). 能 = conseguir agora (condição física ou circunstancial). 可以 = ter permissão. 我会游泳，但今天不能游 — sei nadar, mas hoje não posso.",exs:[{cn:"我会游泳，但是今天不能游。",py:"Wǒ huì yóuyǒng, dànshì jīntiān bù néng yóu.",pt:"Sei nadar, mas hoje não posso."},{cn:"这里可以踢足球吗？",py:"Zhèlǐ kěyǐ tī zúqiú ma?",pt:"É permitido jogar futebol aqui?"},{cn:"他会跳舞，跳得很好。",py:"Tā huì tiàowǔ, tiào de hěn hǎo.",pt:"Ele sabe dançar, e dança muito bem."}]},
      {struct:"打 / 踢 / 游 + 运动",label:"Verbos de Esporte",color:"#0891B2",exp:"O verbo muda conforme a parte do corpo: 打(mãos) para 篮球; 踢(pés) para 足球; 游 para 泳; 跑 para 步. Errar o verbo é um dos deslizes mais notados por falantes nativos.",exs:[{cn:"他喜欢打篮球，我喜欢踢足球。",py:"Tā xǐhuan dǎ lánqiú, wǒ xǐhuan tī zúqiú.",pt:"Ele gosta de jogar basquete, eu de futebol."},{cn:"我每天早上跑步半个小时。",py:"Wǒ měitiān zǎoshang pǎobù bàn gè xiǎoshí.",pt:"Corro meia hora toda manhã."},{cn:"周末我们去游泳吧。",py:"Zhōumò wǒmen qù yóuyǒng ba.",pt:"No fim de semana vamos nadar."}]},
      {struct:"喜欢 + V / N",label:"Gostar de Fazer",color:"#059669",exp:"喜欢 aceita verbo ou substantivo diretamente, sem preposição. Graus: 非常喜欢 > 很喜欢 > 比较喜欢 > 不太喜欢 > 不喜欢. Note que 不太喜欢 é mais educado que 不喜欢.",exs:[{cn:"我很喜欢在网上看电影。",py:"Wǒ hěn xǐhuan zài wǎngshang kàn diànyǐng.",pt:"Gosto muito de ver filmes na internet."},{cn:"她不太喜欢运动，但喜欢旅游。",py:"Tā bú tài xǐhuan yùndòng, dàn xǐhuan lǚyóu.",pt:"Ela não gosta muito de esporte, mas adora viajar."},{cn:"你有什么爱好？",py:"Nǐ yǒu shénme àihào?",pt:"Quais são seus hobbies?"}]}
    ],
    dialogue:[
      {sp:"A",cn:"你周末有什么爱好？",py:"Nǐ zhōumò yǒu shénme àihào?",pt:"Quais são seus hobbies no fim de semana?"},
      {sp:"B",cn:"我喜欢踢足球，也经常去游泳。",py:"Wǒ xǐhuan tī zúqiú, yě jīngcháng qù yóuyǒng.",pt:"Gosto de jogar futebol e costumo ir nadar."},
      {sp:"A",cn:"我会打篮球，但是不会游泳。",py:"Wǒ huì dǎ lánqiú, dànshì bú huì yóuyǒng.",pt:"Sei jogar basquete, mas não sei nadar."},
      {sp:"B",cn:"我可以教你！你跑得快吗？",py:"Wǒ kěyǐ jiāo nǐ! Nǐ pǎo de kuài ma?",pt:"Posso te ensinar! Você corre rápido?"},
      {sp:"A",cn:"跑得还可以。我每天早上跑步。",py:"Pǎo de hái kěyǐ. Wǒ měitiān zǎoshang pǎobù.",pt:"Corro razoavelmente. Corro toda manhã."},
      {sp:"B",cn:"那太好了，明天我们一起去运动吧！",py:"Nà tài hǎo le, míngtiān wǒmen yìqǐ qù yùndòng ba!",pt:"Que ótimo, amanhã vamos nos exercitar juntos!"}
    ],
    quiz:[
      {q:"\"Sei nadar, mas hoje não posso\" =",opts:["我能游泳，但今天不会游。","我会游泳，但今天不能游。","我可以游泳，但今天不会游。","我会游泳，但今天不可以游。"],ans:1,exp:"✅ 会 = habilidade adquirida; 能 = condição do momento. A troca inverte o sentido."},
      {q:"O verbo para futebol é:",opts:["打","踢","游","跑"],ans:1,exp:"✅ 踢足球 — 踢 é chutar (pés). 打 serve para esportes de mão: 打篮球."},
      {q:"可以 expressa principalmente:",opts:["Habilidade","Permissão","Obrigação","Vontade"],ans:1,exp:"✅ 这里可以踢足球吗？= é permitido? Para habilidade use 会; para condição, 能."},
      {q:"\"Ela não gosta muito de esporte\" =",opts:["她很不喜欢运动。","她不太喜欢运动。","她不喜欢很运动。","她太不喜欢运动。"],ans:1,exp:"✅ 不太喜欢 = não gosta muito (educado). 很不喜欢 é bem mais forte."},
      {q:"上网 vs 网上:",opts:["上网 = ação (acessar); 网上 = lugar (online)","São iguais","网上 é verbo","上网 é substantivo"],ans:0,exp:"✅ 上网看电影(acessar para ver) vs 在网上买(comprar online)."}
    ],
  },
  {
    w:10, phase:"Família", emoji:"👨‍👩‍👧", color:"#D97706",
    theme:"Parentesco, Identidade e Infância",
    built:false, builtNote:"",
    stats:{words:"16 novas (HSK 2)",newHSK2:"16",grammar:"已经…了 · 从小/小时候 · 姓 vs 叫",chars:"+25 novos"},
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
      {h:"自己",py:"zìjǐ",pt:"si mesmo; próprio"},
      {h:"鸟",py:"niǎo",pt:"pássaro"},
      {h:"鱼",py:"yú",pt:"peixe"},
      {h:"肉",py:"ròu",pt:"carne"},
      {h:"花",py:"huā",pt:"gastar (dinheiro/tempo) — verbo"},
      {h:"花",py:"huā",pt:"flor — substantivo"}
    ],
    grammar:[
      {struct:"已经 … 了",label:"Mudança já Ocorrida",color:"#6366F1",exp:"已经 + V/Adj + 了 = já (com ênfase na mudança de estado). O 了 final é parte da estrutura e raramente cai. Negação: 还没 (ainda não), nunca ❌不已经.",exs:[{cn:"奶奶已经八十岁了。",py:"Nǎinai yǐjīng bāshí suì le.",pt:"Minha avó já tem oitenta anos."},{cn:"你的孩子已经这么高了！",py:"Nǐ de háizi yǐjīng zhème gāo le!",pt:"Seu filho já está tão alto!"},{cn:"他已经回去了，你晚了一步。",py:"Tā yǐjīng huíqù le, nǐ wǎn le yí bù.",pt:"Ele já voltou, você chegou tarde."}]},
      {struct:"从小 / 小时候",label:"Falar da Infância",color:"#0891B2",exp:"从小 é advérbio e vai antes do verbo, geralmente com 就: 我从小就喜欢. 小时候 é expressão de tempo e abre a frase: 小时候，我住在农村. Não são intercambiáveis.",exs:[{cn:"她从小就会说两种语言。",py:"Tā cóngxiǎo jiù huì shuō liǎng zhǒng yǔyán.",pt:"Ela fala duas línguas desde pequena."},{cn:"小时候，爷爷经常带我去公园。",py:"Xiǎoshíhou, yéye jīngcháng dài wǒ qù gōngyuán.",pt:"Na infância, meu avô me levava sempre ao parque."},{cn:"我从小个子就不高。",py:"Wǒ cóngxiǎo gèzi jiù bù gāo.",pt:"Desde pequeno eu não fui alto."}]},
      {struct:"姓 vs 叫",label:"Sobrenome vs. Nome",color:"#059669",exp:"姓 é VERBO: 我姓王 (não ❌我是姓王). 叫 apresenta o nome completo ou apelido: 我叫王芳. Pergunta formal: 您贵姓？— e a resposta nunca inclui o nome completo, só o sobrenome.",exs:[{cn:"您贵姓？——我姓李，叫李明。",py:"Nín guì xìng? —— Wǒ xìng Lǐ, jiào Lǐ Míng.",pt:"Qual seu sobrenome? —— Meu sobrenome é Li, me chamo Li Ming."},{cn:"他姓张，大家都叫他小张。",py:"Tā xìng Zhāng, dàjiā dōu jiào tā Xiǎo Zhāng.",pt:"O sobrenome dele é Zhang, todos o chamam de Xiao Zhang."},{cn:"请写一下你的姓名。",py:"Qǐng xiě yíxià nǐ de xìngmíng.",pt:"Escreva seu nome completo, por favor."}]}
    ],
    dialogue:[
      {sp:"A",cn:"你家有几口人？",py:"Nǐ jiā yǒu jǐ kǒu rén?",pt:"Quantas pessoas há na sua família?"},
      {sp:"B",cn:"六口：爷爷、奶奶、爸爸、妈妈、我和妻子。",py:"Liù kǒu: yéye, nǎinai, bàba, māma, wǒ hé qīzi.",pt:"Seis: avô, avó, pai, mãe, eu e minha esposa."},
      {sp:"A",cn:"爷爷奶奶多大年纪了？",py:"Yéye nǎinai duō dà niánjì le?",pt:"Que idade têm seus avós?"},
      {sp:"B",cn:"奶奶已经八十岁了，身体还很好。",py:"Nǎinai yǐjīng bāshí suì le, shēntǐ hái hěn hǎo.",pt:"Minha avó já tem oitenta anos e ainda está bem de saúde."},
      {sp:"A",cn:"你小时候跟他们一起住吗？",py:"Nǐ xiǎoshíhou gēn tāmen yìqǐ zhù ma?",pt:"Na infância você morava com eles?"},
      {sp:"B",cn:"对，我从小就跟爷爷奶奶一起住。",py:"Duì, wǒ cóngxiǎo jiù gēn yéye nǎinai yìqǐ zhù.",pt:"Sim, desde pequeno morei com meus avós."}
    ],
    quiz:[
      {q:"\"Minha avó já tem 80 anos\" =",opts:["奶奶已经八十岁了。","奶奶八十岁已经。","已经奶奶八十岁。","奶奶是已经八十岁。"],ans:0,exp:"✅ 已经 + idade + 了. Idade não leva 是: ❌她是八十岁."},
      {q:"从小 fica:",opts:["Depois do verbo","Antes do verbo, geralmente com 就","No fim da frase","Depois do objeto"],ans:1,exp:"✅ 她从小就会说 — 从小 é advérbio e pede 就 com frequência."},
      {q:"小时候 é:",opts:["Advérbio antes do verbo","Expressão de tempo que abre a frase","Classificador","Verbo"],ans:1,exp:"✅ 小时候，我住在农村 — funciona como expressão temporal, não como advérbio."},
      {q:"\"Qual seu sobrenome?\" (formal) =",opts:["你叫什么名字？","您贵姓？","你的姓名是什么？","你姓名叫什么？"],ans:1,exp:"✅ 您贵姓？— fórmula respeitosa. A resposta dá só o sobrenome: 我姓李."},
      {q:"Qual está ERRADA?",opts:["我姓王。","我叫王明。","我是姓王。","我的姓名是王明。"],ans:2,exp:"✅ ❌我是姓王 — 姓 já é verbo e dispensa 是."}
    ],
  },
  {
    w:11, phase:"Estudo", emoji:"📚", color:"#7C3AED",
    theme:"Aprender, Ensinar e Complementos de Resultado",
    built:false, builtNote:"",
    stats:{words:"17 novas (HSK 2)",newHSK2:"17",grammar:"教 + 人 + V · V+错/完/开 · 得(děi)",chars:"+25 novos"},
    vocab:[
      {h:"词",py:"cí",pt:"palavra; léxico"},
      {h:"教",py:"jiāo",pt:"ensinar"},
      {h:"教室",py:"jiàoshì",pt:"sala de aula"},
      {h:"考",py:"kǎo",pt:"fazer prova; examinar"},
      {h:"考试",py:"kǎoshì",pt:"prova; fazer prova"},
      {h:"题",py:"tí",pt:"questão; problema"},
      {h:"得",py:"de",pt:"conseguir; ganhar"},
      {h:"地",py:"de",pt:"terra; chão"},
      {h:"记得",py:"jìde",pt:"lembrar"},
      {h:"忘",py:"wàng",pt:"esquecer"},
      {h:"洗",py:"xǐ",pt:"lavar"},
      {h:"打",py:"dǎ",pt:"bater; ligar (telefone); jogar"},
      {h:"打开",py:"dǎkāi",pt:"abrir; ligar"},
      {h:"班",py:"bān",pt:"turma; período"},
      {h:"高中",py:"gāozhōng",pt:"ensino médio"},
      {h:"开学",py:"kāixué",pt:"início do semestre"},
      {h:"懂",py:"dǒng",pt:"entender"}
    ],
    grammar:[
      {struct:"教 + 人 + V/N",label:"Ensinar Alguém Algo",color:"#6366F1",exp:"教 leva dois objetos: primeiro a pessoa, depois o conteúdo. 教我汉语 / 教我们写字. A pessoa NUNCA vem depois do conteúdo. ❌教汉语我。",exs:[{cn:"老师教我们写汉字。",py:"Lǎoshī jiāo wǒmen xiě Hànzì.",pt:"O professor nos ensina a escrever caracteres."},{cn:"你能教我这个词的意思吗？",py:"Nǐ néng jiāo wǒ zhège cí de yìsi ma?",pt:"Pode me ensinar o sentido desta palavra?"},{cn:"他在教室里教学生们唱歌。",py:"Tā zài jiàoshì lǐ jiāo xuéshengmen chànggē.",pt:"Ele ensina os alunos a cantar na sala de aula."}]},
      {struct:"V + 错 / 完 / 开",label:"Complemento de Resultado",color:"#0891B2",exp:"O complemento indica o desfecho da ação: 错(errado), 完(terminado), 开(aberto), 到(alcançado). Negação com 没, não 不: 没写完 (não terminei de escrever).",exs:[{cn:"我写错了一个字，请再给我一张纸。",py:"Wǒ xiě cuò le yí gè zì, qǐng zài gěi wǒ yì zhāng zhǐ.",pt:"Escrevi um caractere errado, me dê outra folha."},{cn:"作业还没做完呢。",py:"Zuòyè hái méi zuò wán ne.",pt:"Ainda não terminei o dever."},{cn:"请打开书，看第十课。",py:"Qǐng dǎkāi shū, kàn dì-shí kè.",pt:"Abram o livro na lição dez."}]},
      {struct:"得 (děi) + V",label:"Ter Que",color:"#059669",exp:"得 lido děi = ter que (necessidade prática). Cuidado com a leitura: 得 de é partícula de grau; 得 dé é obter. Negação de 得(děi) é 不用, não ❌不得.",exs:[{cn:"明天有考试，我得复习。",py:"Míngtiān yǒu kǎoshì, wǒ děi fùxí.",pt:"Amanhã tem prova, tenho que revisar."},{cn:"你得记得带书包。",py:"Nǐ děi jìde dài shūbāo.",pt:"Você tem que lembrar de levar a mochila."},{cn:"不用洗，这件还很干净。",py:"Bú yòng xǐ, zhè jiàn hái hěn gānjìng.",pt:"Não precisa lavar, esta ainda está limpa."}]}
    ],
    dialogue:[
      {sp:"A",cn:"老师教的你都懂了吗？",py:"Lǎoshī jiāo de nǐ dōu dǒng le ma?",pt:"Você entendeu tudo que o professor ensinou?"},
      {sp:"B",cn:"大部分懂了，可是有几个词我忘了。",py:"Dà bùfen dǒng le, kěshì yǒu jǐ gè cí wǒ wàng le.",pt:"A maior parte sim, mas esqueci algumas palavras."},
      {sp:"A",cn:"你的汉字写得怎么样？",py:"Nǐ de Hànzì xiě de zěnmeyàng?",pt:"Como está sua escrita de caracteres?"},
      {sp:"B",cn:"写得不太好，经常写错。",py:"Xiě de bú tài hǎo, jīngcháng xiě cuò.",pt:"Não muito boa, erro com frequência."},
      {sp:"A",cn:"明天有考试，你得早点儿复习。",py:"Míngtiān yǒu kǎoshì, nǐ děi zǎo diǎnr fùxí.",pt:"Amanhã tem prova, você tem que revisar cedo."},
      {sp:"B",cn:"我知道，我现在就打开书看第十课。",py:"Wǒ zhīdào, wǒ xiànzài jiù dǎkāi shū kàn dì-shí kè.",pt:"Eu sei, já vou abrir o livro na lição dez."}
    ],
    quiz:[
      {q:"\"Me ensine a escrever\" =",opts:["教写我。","教我写。","写教我。","我教写。"],ans:1,exp:"✅ 教 + pessoa + conteúdo. A pessoa vem sempre primeiro."},
      {q:"\"Escrevi errado\" =",opts:["我错写了。","我写错了。","我写了错。","我不写对。"],ans:1,exp:"✅ V + 错 = complemento de resultado. Sempre depois do verbo."},
      {q:"Negação de 写完 é:",opts:["不写完","没写完","写不完了","别写完"],ans:1,exp:"✅ 没写完 — complementos de resultado negam com 没. (写不完 existe, mas significa \"não dá para terminar\".)"},
      {q:"得 lido děi significa:",opts:["Obter","Partícula de grau","Ter que","Chegar"],ans:2,exp:"✅ 我得复习 = tenho que revisar. Mesma grafia de 得(de) partícula e 得(dé) obter — três leituras."},
      {q:"A negação de 得 (děi) é:",opts:["不得","不用","没得","别得"],ans:1,exp:"✅ 不用 = não precisa. ❌不得 não é usado nesse sentido."}
    ],
  },
  {
    w:12, phase:"Conectivos", emoji:"🏆", color:"#DC2626",
    theme:"Orações Complexas e Revisão Final",
    built:false, builtNote:"",
    stats:{words:"17 novas (HSK 2)",newHSK2:"17",grammar:"虽然…但是 · 因为…所以 · 复习",chars:"+25 novos"},
    vocab:[
      {h:"虽然",py:"suīrán",pt:"embora; apesar de"},
      {h:"但",py:"dàn",pt:"mas, porém"},
      {h:"但是",py:"dànshì",pt:"mas, porém"},
      {h:"因为",py:"yīnwèi",pt:"porque; por causa de"},
      {h:"所以",py:"suǒyǐ",pt:"por isso; portanto"},
      {h:"还是",py:"háishi",pt:"ou; ainda"},
      {h:"啊",py:"a",pt:"ah! (exclamação)"},
      {h:"点",py:"diǎn",pt:"ponto; hora (medida de tempo); um pouco"},
      {h:"可能",py:"kěnéng",pt:"possível; talvez"},
      {h:"准备",py:"zhǔnbèi",pt:"preparar; se preparar"},
      {h:"为什么",py:"wèi shénme",pt:"por quê; por qual razão"},
      {h:"生日",py:"shēngrì",pt:"aniversário"},
      {h:"过年",py:"guònián",pt:"celebrar o Ano Novo Chinês"},
      {h:"红茶",py:"hóngchá",pt:"chá preto"},
      {h:"绿茶",py:"lǜchá",pt:"chá verde"},
      {h:"奶茶",py:"nǎichá",pt:"milk tea; chá com leite"},
      {h:"咖啡",py:"kāfēi",pt:"café (bebida)"}
    ],
    grammar:[
      {struct:"虽然 … 但是 …",label:"Concessiva",color:"#6366F1",exp:"Par FIXO: 虽然 pede 但是/可是. Diferente do português, as duas conjunções aparecem juntas — não se omite uma delas. ❌虽然很累，我去了。 ✅虽然很累，但是我去了。",exs:[{cn:"虽然有点儿累，但是我还是去跑步了。",py:"Suīrán yǒudiǎnr lèi, dànshì wǒ háishi qù pǎobù le.",pt:"Embora estivesse cansado, ainda assim fui correr."},{cn:"虽然这个包很贵，但是很好看。",py:"Suīrán zhège bāo hěn guì, dànshì hěn hǎokàn.",pt:"Embora esta bolsa seja cara, é muito bonita."},{cn:"虽然他是外国人，但是汉语说得很好。",py:"Suīrán tā shì wàiguórén, dànshì Hànyǔ shuō de hěn hǎo.",pt:"Embora seja estrangeiro, ele fala chinês muito bem."}]},
      {struct:"因为 … 所以 …",label:"Causal",color:"#0891B2",exp:"Outro par fixo: 因为(porque) + 所以(por isso). Nunca misture os pares: ❌因为…但是 / ❌虽然…所以. A causa vem primeiro, o efeito depois.",exs:[{cn:"因为下雨，所以我没出门。",py:"Yīnwèi xià yǔ, suǒyǐ wǒ méi chūmén.",pt:"Por causa da chuva, não saí de casa."},{cn:"因为快要考试了，所以他每天学习到很晚。",py:"Yīnwèi kuàiyào kǎoshì le, suǒyǐ tā měitiān xuéxí dào hěn wǎn.",pt:"Como a prova está chegando, ele estuda até tarde todo dia."},{cn:"你为什么没来？——因为身体不舒服。",py:"Nǐ wèi shénme méi lái? —— Yīnwèi shēntǐ bù shūfu.",pt:"Por que você não veio? —— Porque não estava bem."}]},
      {struct:"了 / 过 / 着 — 对比",label:"Revisão dos Três Aspectos",color:"#059669",exp:"A tabela decisiva do HSK 2: 了 = ação concluída ou mudança. 过 = experiência de vida. 着 = estado persistente. Um mesmo verbo muda de sentido conforme a partícula.",exs:[{cn:"他来了。（chegou） / 他来过。（já veio antes）",py:"Tā lái le. / Tā lái guo.",pt:"Ele chegou. / Ele já veio aqui antes."},{cn:"门开了。（abriu） / 门开着。（está aberta）",py:"Mén kāi le. / Mén kāi zhe.",pt:"A porta abriu. / A porta está aberta."},{cn:"我在中国过过年，现在已经回来了。",py:"Wǒ zài Zhōngguó guò guo nián, xiànzài yǐjīng huílái le.",pt:"Já passei o Ano Novo na China, e agora já voltei."}]}
    ],
    dialogue:[
      {sp:"A",cn:"虽然今天很累，但是我还是想去跑步。",py:"Suīrán jīntiān hěn lèi, dànshì wǒ háishi xiǎng qù pǎobù.",pt:"Embora esteja cansado hoje, ainda quero correr."},
      {sp:"B",cn:"为什么这么努力？",py:"Wèi shénme zhème nǔlì?",pt:"Por que tanto esforço?"},
      {sp:"A",cn:"因为下个月有比赛，所以我得每天准备。",py:"Yīnwèi xià gè yuè yǒu bǐsài, suǒyǐ wǒ děi měitiān zhǔnbèi.",pt:"Porque no mês que vem tem uma competição, então preciso treinar todo dia."},
      {sp:"B",cn:"你参加过这样的比赛吗？",py:"Nǐ cānjiā guo zhèyàng de bǐsài ma?",pt:"Você já participou de uma competição assim?"},
      {sp:"A",cn:"参加过一次，那次跑得还不错。",py:"Cānjiā guo yí cì, nà cì pǎo de hái búcuò.",pt:"Já participei uma vez, e fui bem."},
      {sp:"B",cn:"那我跟你一起去，外面还下着雨呢，带伞吧！",py:"Nà wǒ gēn nǐ yìqǐ qù, wàimiàn hái xià zhe yǔ ne, dài sǎn ba!",pt:"Então vou com você; ainda está chovendo lá fora, leve guarda-chuva!"}
    ],
    quiz:[
      {q:"虽然 exige o par:",opts:["所以","但是/可是","因为","而且"],ans:1,exp:"✅ 虽然…但是… é par fixo. Diferente do português, as duas conjunções aparecem juntas."},
      {q:"Qual combinação está ERRADA?",opts:["因为…所以","虽然…但是","因为…但是","虽然…可是"],ans:2,exp:"✅ ❌因为…但是 — cada conjunção tem parceiro fixo. Misturar é o erro clássico."},
      {q:"他来了 vs 他来过:",opts:["Iguais","来了 = chegou; 来过 = já veio antes","来过 = vai vir","来了 = experiência"],ans:1,exp:"✅ 了 marca conclusão/mudança; 过 marca experiência de vida."},
      {q:"门开了 vs 门开着:",opts:["开了 = evento de abrir; 开着 = estado aberto","Iguais","开着 = vai abrir","开了 = está aberta"],ans:0,exp:"✅ 了 marca o acontecimento; 着 descreve o estado que permanece."},
      {q:"\"Porque choveu, não saí\" =",opts:["虽然下雨，所以我没出门。","因为下雨，所以我没出门。","因为下雨，但是我没出门。","所以下雨，因为我没出门。"],ans:1,exp:"✅ 因为(causa) + 所以(efeito), nessa ordem."}
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

  const w = WEEKS.find(x => x.w === week) || WEEKS[week - 1];
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
              12 lições · 200 palavras · 36 pontos gramaticais
            </span>
          </div>
          <h1 style={{ margin:"0 0 14px", fontSize:"clamp(18px,3.5vw,28px)", fontWeight:"900" }}>
            老师 · HSK 2 em 12 lições
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
                <span style={{ maxWidth:"92px", overflow:"hidden", textOverflow:"ellipsis" }}>{wx.phase}</span>
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
              <span style={{ fontSize:"10px", fontWeight:"700", opacity:0.8 }}>LIÇÃO</span>
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
              <p style={{ color:muted, fontSize:"13px", margin:0 }}>Leia em voz alta! Identifique as estruturas gramaticais da lição.</p>
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
                <div style={{ fontWeight:"800", fontSize:"15px" }}>💬 Diálogo — {w.phase}</div>
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
                  {correct===5?"Perfeito! Lição de "+w.phase+" dominada!":
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
                     cursor:"pointer", opacity:week===1?0.3:1 }}>← Lição anterior</button>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:"13px", fontWeight:"800", color:ink }}>{"Lição "+week+" de "+12+" · "+w.phase}</div>
            <div style={{ fontSize:"11px", color:muted }}>{w.phase} · {w.emoji}</div>
          </div>
          <button onClick={()=>{if(week<12){setWeek(w=>w+1);setTab("vocab");resetQuiz();}}}
            style={{ padding:"8px 16px", borderRadius:"9px", border:`2px solid ${dc}`,
                     background:dc, color:"white", fontWeight:"700", fontSize:"13px",
                     cursor:"pointer", opacity:week===12?0.3:1 }}>Próxima lição →</button>
        </div>

        {/* Final banner */}
        {week===12 && (
          <div style={{ background:ink, color:"white", borderRadius:"14px",
                        padding:"24px", marginTop:"16px", textAlign:"center" }}>
            <div style={{ fontSize:"40px", marginBottom:"10px" }}>🏆</div>
            <div style={{ fontWeight:"900", fontSize:"20px", marginBottom:"8px" }}>HSK 2 — Programa Completo!</div>
            <div style={{ opacity:0.75, fontSize:"14px", lineHeight:"1.8", marginBottom:"12px" }}>
              12 lições · 200 palavras · 36 pontos gramaticais<br/>
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
