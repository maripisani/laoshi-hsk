import { useState } from "react";
const ink="#0F172A",sand="#FAFAF8",muted="#64748B",bdr="#E2E8F0";

const WEEKS = [
  { w:1, phase:"Fundação", emoji:"🔁", color:"#6366F1",
    theme:"Revisão HSK 4 + Introdução ao Registro Literário HSK 5",
    stats:{ words:"~20 novas HSK 5", grammar:"鉴于...· 以...为核心 · 就算/哪怕...也", chars:"+30 clássicos" },
    vocab:[
      {h:"鉴于",py:"jiànyú",pt:"em vista de/dado que (formal elevado)"},
      {h:"内涵",py:"nèihán",pt:"conteúdo/implicação/significado interno"},
      {h:"深邃",py:"shēnsuì",pt:"profundo/insondável"},
      {h:"蕴含",py:"yùnhán",pt:"conter/encerrar (significado)"},
      {h:"精髓",py:"jīngsuǐ",pt:"essência/quintessência"},
      {h:"渊博",py:"yuānbó",pt:"erudito/vasto (conhecimento)"},
      {h:"积淀",py:"jīdiàn",pt:"sedimento cultural/acumulação"},
      {h:"彰显",py:"zhāngxiǎn",pt:"evidenciar/realçar"},
      {h:"凸显",py:"tūxiǎn",pt:"destacar/ressaltar"},
      {h:"诉诸",py:"sùzhū",pt:"apelar a/recorrer a"},
      {h:"赋予",py:"fùyǔ",pt:"conferir/atribuir (sentido elevado)"},
      {h:"体悟",py:"tǐwù",pt:"compreensão experiencial/epifania"},
      {h:"超越",py:"chāoyuè",pt:"transcender/ultrapassar"},
      {h:"升华",py:"shēnghuá",pt:"sublimar/elevar"},
      {h:"层次",py:"céngcì",pt:"nível/camada/profundidade"},
      {h:"厚重",py:"hòuzhòng",pt:"substancial/denso (teor cultural)"},
      {h:"博大",py:"bódà",pt:"vasto/imenso"},
      {h:"精深",py:"jīngshēn",pt:"profundo e especializado"},
    ],
    grammar:[
      { struct:"鉴于 + 事实/情况，... (因此/故)", label:"Em Vista de / Dado Que (Formal Elevado)", color:"#6366F1",
        exp:"鉴于 é mais formal e literário que 由于. Significa 'em vista de / levando em conta / dado que'. Frequente em documentos oficiais, discursos e textos acadêmicos avançados.",
        exs:[{cn:"鉴于当前的社会形势，我们有必要对这一问题进行深入反思。",py:"Jiànyú dāngqián de shèhuì xíngshì, wǒmen yǒu bìyào duì zhè yī wèntí jìnxíng shēnrù fǎnsī.",pt:"Em vista da conjuntura social atual, é necessário que façamos uma reflexão profunda sobre esta questão."},{cn:"鉴于此，委员会决定推迟表决。",py:"Jiànyú cǐ, wěiyuánhuì juédìng tuīchí biǎojué.",pt:"Dado isso, o comitê decidiu adiar a votação."}] },
      { struct:"以 + N + 为 + 核心/中心/基础/根本", label:"Tendo X como Núcleo / Base / Essência", color:"#D97706",
        exp:"以...为核心/中心/基础 é uma estrutura formal extremamente usada em textos acadêmicos, políticos e culturais avançados. Indica o elemento central de um sistema, argumento ou visão.",
        exs:[{cn:"以人民利益为核心的执政理念，是现代政治哲学的重要命题。",py:"Yǐ rénmín lìyì wéi héxīn de zhízhèng lǐniàn, shì xiàndài zhèngzhì zhéxué de zhòngyào mìngtí.",pt:"A filosofia de governança centrada nos interesses do povo é uma importante proposição da filosofia política moderna."},{cn:"以文化交流为基础，两国建立了深厚的友谊。",py:"Yǐ wénhuà jiāoliú wéi jīchǔ, liǎng guó jiànlì le shēnhòu de yǒuyì.",pt:"Com base no intercâmbio cultural, os dois países construíram uma amizade profunda."}] },
      { struct:"就算/哪怕 + 极端假设，也 + 坚定结论", label:"Mesmo que (Hipótese Extrema — Nível HSK 5)", color:"#DC2626",
        exp:"就算 e 哪怕 = mesmo que (hipótese extrema, tom mais coloquial/emocional que 即便). 哪怕 tem tom ainda mais desafiador. Indica que a conclusão se mantém mesmo em casos extremos.",
        exs:[{cn:"哪怕路途再艰难，他也要坚持走下去。",py:"Nǎpà lùtú zài jiānnán, tā yě yào jiānchí zǒu xiàqù.",pt:"Mesmo que o caminho seja ainda mais árido, ele vai persistir e seguir em frente."},{cn:"就算付出再大的代价，我们也不能放弃这个原则。",py:"Jiùsuàn fùchū zài dà de dàijià, wǒmen yě bù néng fàngqì zhège yuánzé.",pt:"Mesmo que o custo seja muito alto, não podemos abrir mão deste princípio."}] },
    ],
    dialogue:[
      {sp:"A",cn:"你觉得学习到HSK五级之后，语言和文化的关系会变得更加复杂吗？",py:"Nǐ juéde xuéxí dào HSK wǔ jí zhīhòu, yǔyán hé wénhuà de guānxi huì biàndé gèngjiā fùzá ma?",pt:"Você acha que ao atingir o HSK 5, a relação entre língua e cultura se torna ainda mais complexa?"},
      {sp:"B",cn:"鉴于汉语本身的文化积淀极为深厚，两者的关系确实更难以分割。语言的内涵远超字面意思。",py:"Jiànyú Hànyǔ běnshēn de wénhuà jīdiàn jí wéi shēnhòu, liǎng zhě de guānxi quèshí gèng nányǐ fēngē.",pt:"Em vista do profundo sedimento cultural do próprio mandarim, a relação entre os dois é de fato ainda mais indivisível. A implicação da língua vai muito além do sentido literal."},
      {sp:"A",cn:"以文化理解为核心，就算语法已经掌握，也还有太多精髓需要体悟。",py:"Yǐ wénhuà lǐjiě wéi héxīn, jiùsuàn yǔfǎ yǐjīng zhǎngwò, yě hái yǒu tài duō jīngsuǐ xūyào tǐwù.",pt:"Tendo a compreensão cultural como núcleo, mesmo que a gramática já esteja dominada, ainda há muita essência a ser absorvida pela experiência."},
      {sp:"B",cn:"正是！这也是汉语学习的魅力所在——它让你不断超越自我，升华对世界的理解。",py:"Zhèng shì! Zhè yě shì Hànyǔ xuéxí de mèilì suǒzài — tā ràng nǐ bùduàn chāoyuè zìwǒ, shēnghuá duì shìjiè de lǐjiě.",pt:"Exatamente! É aí que está o encanto de aprender mandarim — ele faz com que você continuamente se transcenda e sublime sua compreensão do mundo."},
    ],
    quiz:[
      {q:"鉴于 é diferente de 由于 porque:",opts:["sinônimos","鉴于 é mais formal/literário e implica reflexão sobre fatos; 由于 é mais cotidiano","鉴于 é menos formal","鉴于 indica futuro; 由于 indica passado"],ans:1,exp:"✅ 鉴于 é MAIS FORMAL e literário. Literalmente 'tomando como espelho / refletindo sobre'. Frequente em documentos oficiais, discursos formais, textos jurídicos e acadêmicos avançados."},
      {q:"以...为核心 estrutura-se como:",opts:["以+verbo+为核心","以+substantivo/conceito+为+核心/中心/基础","以+adjetivo+为核心","以+frase+为核心"],ans:1,exp:"✅ 以+N+为+核心/中心/基础 = tendo N como núcleo/centro/base. 以人民为中心(centrado no povo), 以科学为基础(baseado na ciência). Estrutura formal essencial no HSK 5+!"},
      {q:"哪怕 vs 就算 — qual a diferença?",opts:["sinônimos perfeitos","哪怕 tem tom mais desafiador/emocional; 就算 é mais neutro; ambos = mesmo que","哪怕=formal; 就算=informal","哪怕=futuro; 就算=passado"],ans:1,exp:"✅ Ambos = mesmo que (hipótese extrema). 哪怕 tem tom ligeiramente mais emocional/desafiador. 就算 é um pouco mais neutro. Ambos mais coloquiais que 即便(HSK 4) e 纵使(ainda mais literário)."},
      {q:"精髓 (jīngsuǐ) significa:",opts:["conteúdo superficial","essência/quintessência (o melhor e mais profundo)","método de estudo","vocabulário básico"],ans:1,exp:"✅ 精髓 = essência/quintessência. 精=refinado/puro + 髓=tutano/medula. A parte mais refinada e fundamental de algo. 文化的精髓(essência da cultura). Sinônimos: 精华(jīnghuá), 精要(jīngyào)."},
      {q:"体悟 difere de 理解 porque:",opts:["sinônimos","体悟=compreensão experiencial/vivencial (corpo+mente); 理解=compreensão intelectual","体悟=formal; 理解=informal","体悟=negativo; 理解=positivo"],ans:1,exp:"✅ 体悟 = compreensão que vem da experiência/vivência (corpo+mente juntos). 体=corpo/experienciar + 悟=iluminar-se. 理解 é mais intelectual. 体悟 implica que você VIVENCIOU e por isso compreendeu em nível mais profundo."},
    ] },

  { w:2, phase:"Literatura", emoji:"📜", color:"#7C3AED",
    theme:"Literatura, Poesia e Expressão Literária",
    stats:{ words:"~20 novas HSK 5", grammar:"与其说A不如说B · 不妨 · 犹如/宛如/仿佛(literário)", chars:"+30 literários" },
    vocab:[
      {h:"意境",py:"yìjìng",pt:"atmosfera artística/concepção poética"},
      {h:"意象",py:"yìxiàng",pt:"imagem poética/imagética"},
      {h:"隐喻",py:"yǐnyù",pt:"metáfora"},
      {h:"比兴",py:"bǐxīng",pt:"alegorias e evocações (retórica clássica)"},
      {h:"韵律",py:"yùnlǜ",pt:"ritmo/métrica"},
      {h:"抒情",py:"shūqíng",pt:"lírico/expressar sentimentos"},
      {h:"叙事",py:"xùshì",pt:"narrativo/narração"},
      {h:"含蓄",py:"hánxù",pt:"contido/implícito/discreto"},
      {h:"流派",py:"liúpài",pt:"escola literária/corrente"},
      {h:"风格",py:"fēnggé",pt:"estilo"},
      {h:"典雅",py:"diǎnyǎ",pt:"elegante e clássico"},
      {h:"朴实",py:"pǔshí",pt:"simples e natural/sem adorno"},
      {h:"文采",py:"wéncǎi",pt:"elegância literária/brilho da escrita"},
      {h:"意蕴",py:"yìyùn",pt:"implicação artística/significado profundo"},
      {h:"神韵",py:"shényùn",pt:"encanto/graça espiritual"},
      {h:"佳作",py:"jiāzuò",pt:"obra primorosa/obra-prima"},
      {h:"经久不衰",py:"jīng jiǔ bù shuāi",pt:"perene/que não perde o valor"},
      {h:"脍炙人口",py:"kuài zhì rén kǒu",pt:"universalmente apreciado/na boca de todos"},
    ],
    grammar:[
      { struct:"与其说 A，不如说 B", label:"Melhor Dizer B do que A (Reformulação)", color:"#7C3AED",
        exp:"与其说A，不如说B = em vez de dizer A, é mais preciso/correto dizer B. Reformula ou refina uma afirmação. Diferente de 与其A不如B(ação): aqui compara AFIRMAÇÕES ou DESCRIÇÕES.",
        exs:[{cn:"这部小说与其说是爱情故事，不如说是对人性的深刻探索。",py:"Zhè bù xiǎoshuō yǔqí shuō shì àiqíng gùshi, bùrú shuō shì duì rénxìng de shēnkè tànsuǒ.",pt:"Este romance, em vez de ser descrito como história de amor, é mais precisamente uma exploração profunda da natureza humana."},{cn:"这种意境与其说是悲伤，不如说是一种深沉的怀念。",py:"Zhè zhǒng yìjìng yǔqí shuō shì bēishāng, bùrú shuō shì yī zhǒng shēnchén de huáiniàn.",pt:"Esta atmosfera, melhor do que descrevê-la como tristeza, é uma saudade profunda."}] },
      { struct:"不妨 + V (sugestão suave)", label:"Não Custa / Bem que Podia / Por que Não", color:"#059669",
        exp:"不妨 = não custa / por que não / não faz mal que. Sugestão suave sem pressão. Tom elegante: indica que algo vale a pena tentar. Mais literário que 可以/也许(talvez).",
        exs:[{cn:"读懂一首古诗，不妨先了解其创作背景。",py:"Dú dǒng yī shǒu gǔshī, bùfáng xiān liǎojiě qí chuàngzuò bèijǐng.",pt:"Para compreender um poema clássico, não custa primeiro conhecer o contexto de sua criação."},{cn:"在解读这部作品时，不妨换一个视角来思考。",py:"Zài jiědú zhè bù zuòpǐn shí, bùfáng huàn yī gè shìjiǎo lái sīkǎo.",pt:"Ao interpretar esta obra, por que não experimentar uma perspectiva diferente."}] },
      { struct:"犹如/宛如/仿佛 + 比较 (literário)", label:"Como se / Tal Como / Igualmente a (Literário)", color:"#D97706",
        exp:"犹如/宛如/仿佛 = como se / tal como / à maneira de. Figuras de comparação literária. 犹如 e 宛如 são mais poéticos que 像. 仿佛 tem nuance de 'dá a impressão de'.",
        exs:[{cn:"她的文字犹如清泉，洗涤了读者内心的尘埃。",py:"Tā de wénzì yóurú qīngquán, xǐdí le dúzhě nèixīn de chén'āi.",pt:"Suas palavras são como uma fonte cristalina, lavando a poeira do coração dos leitores."},{cn:"这首诗宛如一幅水墨画，意境深远，耐人寻味。",py:"Zhè shǒu shī wǎnrú yī fú shuǐmò huà, yìjìng shēnyuǎn, nài rén xúnwèi.",pt:"Este poema é tal como uma pintura à tinta, com atmosfera profunda e instigante."}] },
    ],
    dialogue:[
      {sp:"A",cn:"你最欣赏中国文学中的哪种表达方式？",py:"Nǐ zuì xīnshǎng Zhōngguó wénxué zhōng de nǎ zhǒng biǎodá fāngshì?",pt:"Qual forma de expressão da literatura chinesa você mais aprecia?"},
      {sp:"B",cn:"含蓄与意境的结合。与其说汉语文学直接传递情感，不如说它邀请读者去体悟言外之意。",py:"Hánxù yǔ yìjìng de jiéhé. Yǔqí shuō Hànyǔ wénxué zhíjiē chuándì qínggǎn, bùrú shuō tā yāoqǐng dúzhě qù tǐwù yánwài zhī yì.",pt:"A combinação de contenção e atmosfera poética. Em vez de dizer que a literatura em mandarim transmite emoções diretamente, é mais preciso dizer que ela convida o leitor a perceber o que vai além das palavras."},
      {sp:"A",cn:"不妨举个例子？",py:"Bùfáng jǔ gè lìzi?",pt:"Por que não dar um exemplo?"},
      {sp:"B",cn:"李白的诗犹如仰望星空——宛如无限，意蕴深邃，经久不衰。读来仿佛置身于那个脍炙人口的意境之中。",py:"Lǐ Bái de shī yóurú yǎngwàng xīngkōng — wǎnrú wúxiàn, yìyùn shēnsuì, jīng jiǔ bù shuāi.",pt:"Os poemas de Li Bai são como contemplar o céu estrelado — como o infinito, com implicações profundas e perenes. Ler é como se mergulhasse naquela atmosfera universalmente apreciada."},
    ],
    quiz:[
      {q:"与其说A不如说B — qual a função desta estrutura?",opts:["comparar ações","reformular/refinar uma descrição ou afirmação","expressar preferência de ação","contradizer"],ans:1,exp:"✅ 与其说A，不如说B = 'em vez de dizer A, é mais preciso dizer B'. Reformula uma AFIRMAÇÃO/DESCRIÇÃO (diferente de 与其A不如B que compara AÇÕES). Muito usado em análise literária e crítica!"},
      {q:"不妨 (bùfáng) tem o sentido de:",opts:["obrigação forte","proibição","sugestão suave (não custa/por que não tentar)","contradição"],ans:2,exp:"✅ 不妨 = não custa / não faz mal / por que não. Sugestão gentil, sem pressão. Tom elegante e literário. '不妨试试'(por que não tentar). Mais literário e suave que 也许(talvez) ou 可以(pode)."},
      {q:"犹如 vs 像 — qual a diferença?",opts:["sinônimos","犹如 é mais poético/literário; 像 é mais cotidiano","犹如 é negativo","像 é mais formal"],ans:1,exp:"✅ 犹如/宛如 são MAIS POÉTICOS/LITERÁRIOS que 像. Em poesia, prosa literária e linguagem elevada, usa-se 犹如/宛如/仿佛. Em conversação comum, usa-se 像(parece/como). Registros diferentes!"},
      {q:"意境 (yìjìng) é um conceito estético que refere-se a:",opts:["o significado literal das palavras","a atmosfera/concepção poética que vai além do texto (evocação)","a estrutura gramatical do poema","o biografar do autor"],ans:1,exp:"✅ 意境 = atmosfera poética/concepção artística. É o espaço evocativo criado pela arte — o que fica na mente após a leitura, além do sentido literal. Conceito central da estética chinesa clássica!"},
      {q:"脍炙人口 (kuài zhì rén kǒu) significa:",opts:["difícil de entender","universalmente apreciado/que todos amam","muito antigo","muito controverso"],ans:1,exp:"✅ 脍炙人口 = universalmente apreciado. 脍=peixe/carne cortado fino + 炙=assado + 人口=boca das pessoas. Algo tão bom quanto comida deliciosa que todos gostam. 成语 HSK 5!"},
    ] },

  { w:3, phase:"História", emoji:"🏛️", color:"#D97706",
    theme:"História, Civilização e Herança Cultural",
    stats:{ words:"~20 novas HSK 5", grammar:"自...以来 · 以...著称 · 历经...仍然/依旧", chars:"+30 históricos" },
    vocab:[
      {h:"朝代",py:"cháodài",pt:"dinastia"},
      {h:"历史典故",py:"lìshǐ diǎngù",pt:"alusão histórica"},
      {h:"文物",py:"wénwù",pt:"artefato cultural/relíquia"},
      {h:"考古",py:"kǎogǔ",pt:"arqueologia"},
      {h:"遗址",py:"yízhǐ",pt:"ruínas/sítio arqueológico"},
      {h:"文明古国",py:"wénmíng gǔguó",pt:"nação de civilização antiga"},
      {h:"历史沿革",py:"lìshǐ yángé",pt:"evolução histórica"},
      {h:"史料",py:"shǐliào",pt:"fontes históricas/registros"},
      {h:"文化底蕴",py:"wénhuà dǐyùn",pt:"profundidade cultural/substrato"},
      {h:"千古流传",py:"qiāngǔ liúchuán",pt:"transmitido pelos séculos"},
      {h:"历史积淀",py:"lìshǐ jīdiàn",pt:"acumulação histórica/sedimento"},
      {h:"文化遗产",py:"wénhuà yíchǎn",pt:"patrimônio cultural"},
      {h:"历史价值",py:"lìshǐ jiàzhí",pt:"valor histórico"},
      {h:"复兴",py:"fùxīng",pt:"renascimento/renascença"},
      {h:"传世之作",py:"chuánshì zhī zuò",pt:"obra que atravessa gerações"},
      {h:"人文精神",py:"rénwén jīngshén",pt:"espírito humanístico"},
      {h:"历史使命",py:"lìshǐ shǐmìng",pt:"missão histórica"},
      {h:"薪火相传",py:"xīn huǒ xiāng chuán",pt:"transmitir a chama de geração em geração"},
    ],
    grammar:[
      { struct:"自 + 时间/事件 + 以来，...（一直/始终/从未）", label:"Desde / A Partir de (Perspectiva Histórica)", color:"#D97706",
        exp:"自...以来 = desde X até agora. Marca o início de um período que continua até o presente. Muito formal e frequente em textos históricos. 自古以来(desde tempos antigos), 自...改革以来(desde a reforma de...).",
        exs:[{cn:"自古以来，中华文化便以包容、创新的精神著称于世。",py:"Zìgǔ yǐlái, Zhōnghuá wénhuà biàn yǐ bāoróng, chuàngxīn de jīngshén zhùchēng yú shì.",pt:"Desde tempos antigos, a cultura chinesa é conhecida no mundo pelo seu espírito de tolerância e inovação."},{cn:"自工业革命以来，人类与自然的关系发生了根本性的变化。",py:"Zì gōngyè gémìng yǐlái, rénlèi yǔ zìrán de guānxi fāshēng le gēnběn xìng de biànhuà.",pt:"Desde a Revolução Industrial, a relação entre os humanos e a natureza sofreu mudanças fundamentais."}] },
      { struct:"以 + 特征 + 著称（于世/于...领域）", label:"Ser Famoso por / Ser Conhecido por (Literário)", color:"#6366F1",
        exp:"以...著称 = ser famoso por / ser reconhecido por. Tom formal e elogioso. 以...著称于世 = ser mundialmente reconhecido por. Frequente em apresentação histórica e cultural.",
        exs:[{cn:"中国以其悠久的历史文化著称于世，留下了无数传世之作。",py:"Zhōngguó yǐ qí yōujiǔ de lìshǐ wénhuà zhùchēng yú shì, liúxià le wúshù chuánshì zhī zuò.",pt:"A China é mundialmente reconhecida por sua longa história e cultura, tendo legado inúmeras obras que atravessam gerações."},{cn:"苏州以其精美的园林艺术著称，是中国传统美学的代表。",py:"Sūzhōu yǐ qí jīngměi de yuánlín yìshù zhùchēng, shì Zhōngguó chuántǒng měixué de dàibiǎo.",pt:"Suzhou é famosa por sua arte requintada de jardins, sendo representante da estética tradicional chinesa."}] },
      { struct:"历经 + N（困难/考验/变迁）+ 仍然/依旧 + V", label:"Após Passar por X / Apesar de Tudo, Ainda", color:"#DC2626",
        exp:"历经...仍然/依旧 = após passar por (adversidades), ainda assim. Indica que algo sobreviveu ou persiste apesar de adversidades históricas. Tom heroico ou de admiração histórica.",
        exs:[{cn:"这座古城历经千年风雨，依旧保留着昔日的风貌与底蕴。",py:"Zhè zuò gǔchéng lìjīng qiānnián fēngyǔ, yījiù bǎoliú zhe xīrì de fēngmào yǔ dǐyùn.",pt:"Esta cidade antiga, após mil anos de vicissitudes, ainda preserva sua aparência e substrato do passado."},{cn:"中华文明历经沧桑，仍然薪火相传，历久弥新。",py:"Zhōnghuá wénmíng lìjīng cāngsāng, réngrán xīn huǒ xiāng chuán, lì jiǔ mí xīn.",pt:"A civilização chinesa, após inúmeras provações, ainda transmite sua chama de geração em geração, tornando-se mais rica com o tempo."}] },
    ],
    dialogue:[
      {sp:"A",cn:"中国历史这么长，你觉得哪个时代最值得深入了解？",py:"Zhōngguó lìshǐ zhème cháng, nǐ juéde nǎ gè shídài zuì zhídé shēnrù liǎojiě?",pt:"Com uma história tão longa, qual período você acha que vale mais a pena conhecer em profundidade?"},
      {sp:"B",cn:"自春秋战国以来的思想大爆发最令我着迷。那个时代以百家争鸣著称，奠定了中国文化底蕴的根基。",py:"Zì chūnqiū zhànguó yǐlái de sīxiǎng dà bàofā zuì lìng wǒ zháomí.",pt:"A grande explosão de pensamentos do Período das Primaveras e Outonos / Estados Combatentes me fascina mais. Aquela era é famosa pela efervescência de cem escolas de pensamento, que lançaram as bases do substrato cultural chinês."},
      {sp:"A",cn:"历经几千年，这些思想依旧影响着现代中国社会，真了不起。",py:"Lìjīng jǐ qiānnián, zhèxiē sīxiǎng yījiù yǐngxiǎng zhe xiàndài Zhōngguó shèhuì, zhēn liǎobuqǐ.",pt:"Após vários milênios, esses pensamentos ainda influenciam a sociedade chinesa moderna — é impressionante."},
      {sp:"B",cn:"确实。鉴于这种历史积淀，不妨以文化传承为核心来理解中国——过去与现在的关联无处不在。",py:"Quèshí. Jiànyú zhè zhǒng lìshǐ jīdiàn, bùfáng yǐ wénhuà chuánchéng wéi héxīn lái lǐjiě Zhōngguó.",pt:"De fato. Em vista desta acumulação histórica, não custa entender a China tendo a transmissão cultural como núcleo — a conexão entre passado e presente está em toda parte."},
    ],
    quiz:[
      {q:"自古以来 significa:",opts:["desde este momento","desde tempos antigos/imemoriais até agora","a partir de agora","durante a época antiga"],ans:1,exp:"✅ 自古以来 = desde tempos antigos/imemoriais (e continua até hoje). 自=desde + 古=antigo + 以来=para cá. Estrutura temporal que abrange do passado ao presente."},
      {q:"以X著称 indica:",opts:["ser criticado por X","ser famoso/reconhecido por X","aprender sobre X","superar X"],ans:1,exp:"✅ 以...著称 = ser famoso por / ser reconhecido por. 著称=notoriamente conhecido. 以...著称于世=reconhecido mundialmente. Tom elogioso formal frequente em textos histórico-culturais!"},
      {q:"历经 (lìjīng) significa:",opts:["iniciar","durante","após passar por/tendo traverssado (adversidades)","antes de"],ans:2,exp:"✅ 历经 = após passar por / tendo atravessado. 历=atravessar/experienciar + 经=passar por. Usado especialmente com adversidades ou experiências significativas: 历经风雨(após tempestades), 历经沧桑(após provações)."},
      {q:"文化底蕴 (wénhuà dǐyùn) refere-se a:",opts:["conhecimento superficial","profundidade/substrato cultural acumulado historicamente","tecnologia cultural","turismo cultural"],ans:1,exp:"✅ 文化底蕴 = profundidade/substrato cultural (acumulado ao longo de gerações). 底=fundo/profundidade + 蕴=contido/acumulado. É o que uma cultura acumula em termos de valores, tradições, arte e pensamento ao longo do tempo."},
      {q:"薪火相传 (xīn huǒ xiāng chuán) significa:",opts:["começar um incêndio","transmitir a tocha/chama de geração em geração","usar lenha para cozinhar","perder a tradição"],ans:1,exp:"✅ 薪火相传 = transmitir a tocha de geração em geração. 薪=lenha + 火=fogo + 相传=transmitir mutuamente. Metáfora do fogo que continua vivo porque cada geração passa a tocha para a próxima. 成语 HSK 5!"},
    ] },

  { w:4, phase:"Psicologia", emoji:"🧠", color:"#0891B2",
    theme:"Psicologia, Cognição e Ciência do Comportamento",
    stats:{ words:"~20 novas HSK 5", grammar:"以至于... · 凡是...都/皆 · 未必", chars:"+25 novos" },
    vocab:[
      {h:"潜意识",py:"qiányìshí",pt:"subconsciente"},
      {h:"认知偏见",py:"rènzhī piānjiàn",pt:"viés cognitivo"},
      {h:"心理机制",py:"xīnlǐ jīzhì",pt:"mecanismo psicológico"},
      {h:"情感调节",py:"qínggǎn tiáojié",pt:"regulação emocional"},
      {h:"认知失调",py:"rènzhī shītiáo",pt:"dissonância cognitiva"},
      {h:"神经可塑性",py:"shénjīng kěsùxìng",pt:"neuroplasticidade"},
      {h:"自我效能",py:"zìwǒ xiàonéng",pt:"autoeficácia"},
      {h:"心理韧性",py:"xīnlǐ rènxìng",pt:"resiliência psicológica"},
      {h:"内在动机",py:"nèizài dòngjī",pt:"motivação intrínseca"},
      {h:"元认知",py:"yuán rènzhī",pt:"metacognição"},
      {h:"思维定势",py:"sīwéi dìngshì",pt:"padrão/armadilha de pensamento"},
      {h:"情绪智力",py:"qíngxù zhìlì",pt:"inteligência emocional"},
      {h:"决策过程",py:"juécè guòchéng",pt:"processo de tomada de decisão"},
      {h:"行为经济学",py:"xíngwéi jīngjìxué",pt:"economia comportamental"},
      {h:"心流",py:"xīnliú",pt:"estado de fluxo/flow"},
      {h:"自我实现",py:"zìwǒ shíxiàn",pt:"autorrealização"},
      {h:"创伤修复",py:"chuāngshāng xiūfù",pt:"recuperação de trauma"},
      {h:"正念",py:"zhèngnian",pt:"mindfulness/atenção plena"},
    ],
    grammar:[
      { struct:"以至于 + 结果（程度夸张）", label:"A Ponto de / De Tal Forma que (Grau Extremo)", color:"#0891B2",
        exp:"以至于 = a ponto de / a tal ponto que. Indica resultado de grau extremo ou inesperado. Mais enfático que 所以. O resultado que segue 以至于 é frequentemente surpreendente ou exagerado.",
        exs:[{cn:"他长期承受压力，以至于认知功能开始受到影响。",py:"Tā cháng qī chéngshòu yālì, yǐzhìyú rènzhī gōngnéng kāishǐ shòudào yǐngxiǎng.",pt:"Ele sofreu pressão prolongada, a ponto de que suas funções cognitivas começaram a ser afetadas."},{cn:"这种认知失调让他痛苦不堪，以至于影响了正常的生活和工作。",py:"Zhè zhǒng rènzhī shītiáo ràng tā tòngkǔ bùkān, yǐzhìyú yǐngxiǎng le zhèngcháng de shēnghuó hé gōngzuò.",pt:"Essa dissonância cognitiva o torturou de tal forma que afetou sua vida e trabalho normais."}] },
      { struct:"凡是 + N/条件，都/皆 + V", label:"Todo / Qualquer / Todos que (Universalidade)", color:"#D97706",
        exp:"凡是...都/皆 = todo X que / qualquer X / todos que. Quantificador universal formal. Mais literário que 所有...都(todos...todos). 皆 é mais clássico/literário que 都.",
        exs:[{cn:"凡是经历过心理创伤的人，都需要时间和专业支持来修复。",py:"Fánshì jīnglì guò xīnlǐ chuāngshāng de rén, dōu xūyào shíjiān hé zhuānyè zhīchí lái xiūfù.",pt:"Toda pessoa que passou por trauma psicológico precisa de tempo e apoio profissional para se recuperar."},{cn:"凡是影响决策的因素，皆应纳入心理学的研究范畴。",py:"Fánshì yǐngxiǎng juécè de yīnsù, jiē yīng nàrù xīnlǐxué de yánjiū fànchóu.",pt:"Todo fator que influencia a tomada de decisão deveria ser incluído no âmbito da pesquisa psicológica."}] },
      { struct:"未必（一定/然）+ V/adj. (negação suave)", label:"Não Necessariamente / Não é Certo que", color:"#059669",
        exp:"未必 = não necessariamente / não é certo que. Negação SUAVE de uma expectativa ou crença. Mais formal e literário que 不一定. Questiona a validade de uma afirmação sem negar completamente.",
        exs:[{cn:"高智商未必等同于高情绪智力，两者是相对独立的能力。",py:"Gāo zhìshāng wèibì děngtóng yú gāo qíngxù zhìlì, liǎng zhě shì xiāngduì dúlì de nénglì.",pt:"Alto QI não é necessariamente equivalente a alta inteligência emocional — os dois são capacidades relativamente independentes."},{cn:"内在动机未必总是优于外在奖励，情境决定一切。",py:"Nèizài dòngjī wèibì zǒng shì yōuyú wàizài jiǎnglì, qíngjìng juédìng yīqiè.",pt:"Motivação intrínseca não é necessariamente sempre superior às recompensas externas — o contexto determina tudo."}] },
    ],
    dialogue:[
      {sp:"A",cn:"你认为认知偏见对我们的日常决策有多大影响？",py:"Nǐ rènwéi rènzhī piānjiàn duì wǒmen de rìcháng juécè yǒu duō dà yǐngxiǎng?",pt:"Qual você acha que é o impacto dos vieses cognitivos em nossas decisões diárias?"},
      {sp:"B",cn:"影响巨大。以至于很多时候我们以为是理性决策，实际上却受到潜意识的左右。",py:"Yǐngxiǎng jùdà. Yǐzhìyú hěn duō shíhou wǒmen yǐwéi shì lǐxìng juécè, shíjì shàng què shòudào qiányìshí de zuǒyòu.",pt:"O impacto é enorme. A tal ponto que muitas vezes acreditamos estar tomando decisões racionais, quando na verdade somos controlados pelo subconsciente."},
      {sp:"A",cn:"那么，凡是对决策有影响的心理机制，都应该被研究和了解？",py:"Nàme, fánshì duì juécè yǒu yǐngxiǎng de xīnlǐ jīzhì, dōu yīnggāi bèi yánjiū hé liǎojiě?",pt:"Então, todo mecanismo psicológico que influencia as decisões deveria ser estudado e compreendido?"},
      {sp:"B",cn:"对！虽然完全消除认知偏见未必可能，但通过元认知和正念训练，我们可以提高对自身思维定势的觉察。",py:"Duì! Suīrán wánquán xiāochú rènzhī piānjiàn wèibì kěnéng, dàn tōngguò yuán rènzhī hé zhèngnian xùnliàn, wǒmen kěyǐ tígāo duì zìshēn sīwéi dìngshì de juéchá.",pt:"Isso mesmo! Embora eliminar completamente os vieses cognitivos não seja necessariamente possível, através da metacognição e do mindfulness podemos aumentar nossa consciência sobre nossos próprios padrões de pensamento."},
    ],
    quiz:[
      {q:"以至于 indica:",opts:["causa suave","resultado de grau extremo/surpreendente","condição","contradição"],ans:1,exp:"✅ 以至于 = a ponto de / de tal forma que (resultado EXTREMO ou surpreendente). Mais enfático que 所以. O resultado que segue é frequentemente intenso ou inesperado. '压力太大，以至于崩溃' = pressão tão grande, a ponto do colapso."},
      {q:"凡是 vs 所有 — qual a diferença?",opts:["sinônimos perfeitos","凡是 é mais formal/literário e enfatiza universalidade de condição; 所有 é mais cotidiano","凡是 é parcial; 所有 é total","凡是 é negativo"],ans:1,exp:"✅ 凡是+condição+都/皆 é mais formal e literário que 所有. 凡是 enfatiza que a condição se aplica UNIVERSALMENTE a todos que se enquadram nela. 皆 é mais clássico/literário que 都."},
      {q:"未必 é diferente de 不一定 porque:",opts:["sinônimos","未必 é mais formal/literário; ambos = não necessariamente","未必 é mais negativo","不一定 é mais formal"],ans:1,exp:"✅ 未必 e 不一定 são próximos em significado (não necessariamente), mas 未必 é mais formal e literário. 未必然(não é certo que). Muito frequente em argumentação acadêmica e análise crítica."},
      {q:"认知失调 (rènzhī shītiáo) é:",opts:["inteligência emocional","neuroplasticidade","dissonância cognitiva","metacognição"],ans:2,exp:"✅ 认知失调 = dissonância cognitiva. 认知=cognição + 失调=desajuste/desequilíbrio. Estado de desconforto por ter crenças ou valores contraditórios (Festinger, 1957)."},
      {q:"心流 (xīnliú) é o conceito de:",opts:["fluxo de pensamentos negativos","estado de fluxo/flow (Csikszentmihalyi)","corrente de consciência","terapia de fluxo"],ans:1,exp:"✅ 心流 = flow/estado de fluxo. Conceito de Csikszentmihalyi: estado de imersão total e prazer na atividade. 心=mente + 流=fluir. Quando a habilidade e o desafio se equilibram perfeitamente."},
    ] },

  { w:5, phase:"Direito Adv.", emoji:"⚖️", color:"#DC2626",
    theme:"Direito Constitucional e Filosofia Jurídica Avançada",
    stats:{ words:"~18 novas HSK 5", grammar:"当...之际 · 诚如...所言 · 从根本上", chars:"+25 novos" },
    vocab:[
      {h:"宪政",py:"xiànzhèng",pt:"constitucionalismo"},
      {h:"司法独立",py:"sīfǎ dúlì",pt:"independência judicial"},
      {h:"无罪推定",py:"wúzuì tuīdìng",pt:"presunção de inocência"},
      {h:"举证责任",py:"jǔzhèng zérèn",pt:"ônus da prova"},
      {h:"正当程序",py:"zhèngdāng chéngxù",pt:"devido processo legal"},
      {h:"宪法权利",py:"xiànfǎ quánlì",pt:"direitos constitucionais"},
      {h:"法律位阶",py:"fǎlǜ wèijiē",pt:"hierarquia das normas jurídicas"},
      {h:"司法审查",py:"sīfǎ shěnchá",pt:"controle de constitucionalidade"},
      {h:"公序良俗",py:"gōng xù liáng sú",pt:"ordem pública e bons costumes"},
      {h:"比例原则",py:"bǐlì yuánzé",pt:"princípio da proporcionalidade"},
      {h:"权利救济",py:"quánlì jiùjì",pt:"remédio/reparação de direitos"},
      {h:"立法意图",py:"lìfǎ yìtú",pt:"intenção legislativa"},
      {h:"法治精神",py:"fǎzhì jīngshén",pt:"espírito do estado de direito"},
      {h:"程序正义",py:"chéngxù zhèngyì",pt:"justiça processual"},
      {h:"实体正义",py:"shítǐ zhèngyì",pt:"justiça substantiva"},
      {h:"法律渊源",py:"fǎlǜ yuānyuán",pt:"fontes do direito"},
      {h:"法律解释",py:"fǎlǜ jiěshì",pt:"interpretação jurídica"},
      {h:"违宪",py:"wéixiàn",pt:"inconstitucional"},
    ],
    grammar:[
      { struct:"当 + 时间/情境 + 之际，...", label:"No Momento de / Na Ocasião de (Literário)", color:"#DC2626",
        exp:"当...之际 = no momento em que / na ocasião de. Estrutura formal e literária para indicar momento significativo. Equivale a 'when...at the time of'. Muito usado em discursos, textos jurídicos e históricos.",
        exs:[{cn:"当宪政改革推进之际，司法独立的保障问题变得尤为重要。",py:"Dāng xiànzhèng gǎigé tuījìn zhī jì, sīfǎ dúlì de bǎozhàng wèntí biàndé yóuwéi zhòngyào.",pt:"No momento em que a reforma constitucional avança, a questão da garantia da independência judicial torna-se especialmente importante."},{cn:"当两种权利发生冲突之际，比例原则可以提供有效的裁量框架。",py:"Dāng liǎng zhǒng quánlì fāshēng chōngtū zhī jì, bǐlì yuánzé kěyǐ tígōng yǒuxiào de cáiliàng kuàngjià.",pt:"No momento em que dois direitos entram em conflito, o princípio da proporcionalidade pode fornecer uma estrutura eficaz de sopesamento."}] },
      { struct:"诚如/正如 + 人 + 所言/所指出", label:"Conforme / Tal Como X Afirmou", color:"#6366F1",
        exp:"诚如/正如...所言 = tal como X disse/afirmou. Estrutura de citação de autoridade. 诚如 é mais formal e expressa concordância genuína. 正如 é mais neutro. Frequente em argumentação jurídica e acadêmica.",
        exs:[{cn:"诚如学者所言，程序正义与实体正义同等重要，不可偏废。",py:"Chéngrú xuézhě suǒ yán, chéngxù zhèngyì yǔ shítǐ zhèngyì tóngděng zhòngyào, bùkě piān fèi.",pt:"Tal como os estudiosos afirmam, a justiça processual e a justiça substantiva são igualmente importantes e não devem ser negligenciadas."},{cn:"正如宪法所规定，公民权利受到国家的法律保护。",py:"Zhèng rú xiànfǎ suǒ guīdìng, gōngmín quánlì shòudào guójiā de fǎlǜ bǎohù.",pt:"Tal como a constituição estipula, os direitos dos cidadãos são protegidos pela lei do Estado."}] },
      { struct:"从根本上（来说/而言）+...", label:"Fundamentalmente / Em Essência", color:"#D97706",
        exp:"从根本上（来说/而言） = fundamentalmente / em essência / na raiz. Indica o nível mais fundamental ou essencial de uma questão. Tom analítico e conclusivo.",
        exs:[{cn:"司法独立，从根本上而言，是保障公民权利的最后屏障。",py:"Sīfǎ dúlì, cóng gēnběn shàng ér yán, shì bǎozhàng gōngmín quánlì de zuìhòu píngzhàng.",pt:"A independência judicial, fundamentalmente, é a última barreira de proteção dos direitos dos cidadãos."},{cn:"法律的权威，从根本上说，来自于它对正义的承诺和公众的信任。",py:"Fǎlǜ de quánwēi, cóng gēnběn shàng shuō, láizì yú tā duì zhèngyì de chéngnuò hé gōngzhòng de xìnrèn.",pt:"A autoridade da lei, fundamentalmente, provém de seu compromisso com a justiça e da confiança do público."}] },
    ],
    dialogue:[
      {sp:"A",cn:"当司法面临政治压力之际，如何维护司法独立？",py:"Dāng sīfǎ miànlín zhèngzhì yālì zhī jì, rúhé wéihù sīfǎ dúlì?",pt:"No momento em que o judiciário enfrenta pressão política, como se mantém a independência judicial?"},
      {sp:"B",cn:"诚如法学家所言，从根本上来说，司法独立需要制度保障，而非个人品格。",py:"Chéngrú fǎxuéjiā suǒ yán, cóng gēnběn shàng lái shuō, sīfǎ dúlì xūyào zhìdù bǎozhàng, ér fēi gèrén pǐngé.",pt:"Tal como os juristas afirmam, fundamentalmente, a independência judicial requer garantias institucionais, não virtude pessoal."},
      {sp:"A",cn:"宪政体制和比例原则在这方面发挥什么作用？",py:"Xiànzhèng tǐzhì hé bǐlì yuánzé zài zhè fāngmiàn fāhuī shénme zuòyòng?",pt:"Que papel desempenham o constitucionalismo e o princípio da proporcionalidade neste aspecto?"},
      {sp:"B",cn:"至关重要。当两种价值发生冲突之际，比例原则提供了理性的权衡框架。宪政则从根本上保障这种制度不被轻易颠覆。",py:"Zhì guān zhòngyào. Dāng liǎng zhǒng jiàzhí fāshēng chōngtū zhī jì, bǐlì yuánzé tígōng le lǐxìng de quánhéng kuàngjià.",pt:"Extremamente importante. No momento em que dois valores entram em conflito, o princípio da proporcionalidade fornece uma estrutura racional de sopesamento. O constitucionalismo, fundamentalmente, garante que este sistema não seja facilmente subvertido."},
    ],
    quiz:[
      {q:"当...之际 é usado para indicar:",opts:["resultado","momento significativo/importante","causa","contraste"],ans:1,exp:"✅ 当...之际 = no momento em que / na ocasião de. Estrutura literária/formal para marcar MOMENTOS IMPORTANTES ou CRUCIAIS. Mais solene que 当...的时候. Frequente em discursos, textos históricos e jurídicos."},
      {q:"诚如 vs 正如 — qual a diferença?",opts:["sinônimos","诚如 implica concordância genuína (certamente como X disse); 正如 é mais neutro","诚如 é informal","正如 é mais literário"],ans:1,exp:"✅ 诚如 = certamente/genuinamente como X afirmou (implica concordância com a afirmação citada). 正如 = tal como / assim como (mais neutro). 诚如 é ligeiramente mais elegante e marcador de concordância."},
      {q:"从根本上来说 equivale a:",opts:["superficialmente","em essência/fundamentalmente","provavelmente","ao contrário"],ans:1,exp:"✅ 从根本上来说 = fundamentalmente / em essência / na raiz. Indica que o que segue é a análise mais profunda, não superficial. Sinônimos: 说到底(no fim das contas), 归根结底(em última análise)."},
      {q:"无罪推定 (wúzuì tuīdìng) é:",opts:["culpa presumida","presunção de inocência","prova de inocência","absolvição"],ans:1,exp:"✅ 无罪推定 = presunção de inocência. 无罪=inocente + 推定=presumir/estimar. Princípio fundamental do direito penal moderno: o acusado é presumido inocente até prova em contrário."},
      {q:"比例原则 (bǐlì yuánzé) é:",opts:["princípio da igualdade","princípio da proporcionalidade","princípio da legalidade","princípio da publicidade"],ans:1,exp:"✅ 比例原则 = princípio da proporcionalidade. 比例=proporção/proporcionalidade + 原则=princípio. Quando dois direitos colidem, a restrição deve ser proporcional ao benefício obtido. Fundamental no direito constitucional moderno!"},
    ] },

  { w:6, phase:"Ética Tecnol.", emoji:"🤖", color:"#059669",
    theme:"Ética Tecnológica e Governança Digital",
    stats:{ words:"~18 novas HSK 5", grammar:"归根结底 · 言而总之 · 追根溯源", chars:"+25 novos" },
    vocab:[
      {h:"科技伦理",py:"kējì lúnlǐ",pt:"ética tecnológica"},
      {h:"算法偏见",py:"suànfǎ piānjiàn",pt:"viés algorítmico"},
      {h:"数字主权",py:"shùzì zhǔquán",pt:"soberania digital"},
      {h:"知情同意",py:"zhīqíng tóngyì",pt:"consentimento informado"},
      {h:"可解释性",py:"kě jiěshì xìng",pt:"explicabilidade (IA)"},
      {h:"价值对齐",py:"jiàzhí duìqí",pt:"alinhamento de valores"},
      {h:"预警原则",py:"yùjǐng yuánzé",pt:"princípio da precaução"},
      {h:"技术决定论",py:"jìshù juédìnglùn",pt:"determinismo tecnológico"},
      {h:"伦理设计",py:"lúnlǐ shèjì",pt:"design ético"},
      {h:"数字权利",py:"shùzì quánlì",pt:"direitos digitais"},
      {h:"人机协作",py:"rén jī xiézuò",pt:"colaboração humano-máquina"},
      {h:"自主决策",py:"zìzhǔ juécè",pt:"tomada de decisão autônoma"},
      {h:"透明度",py:"tòumíngdù",pt:"transparência"},
      {h:"可追溯性",py:"kě zhuīsù xìng",pt:"rastreabilidade"},
      {h:"人工智能治理",py:"réngōng zhìnéng zhìlǐ",pt:"governança da IA"},
      {h:"伦理框架",py:"lúnlǐ kuàngjià",pt:"framework ético"},
      {h:"社会责任",py:"shèhuì zérèn",pt:"responsabilidade social"},
      {h:"伦理审查",py:"lúnlǐ shěnchá",pt:"revisão ética"},
    ],
    grammar:[
      { struct:"归根结底，... (= 说到底)", label:"Em Última Análise / No Fundo de Tudo", color:"#059669",
        exp:"归根结底 = em última análise / no fundo de tudo / quando tudo é dito e feito. Indica a essência ou causa fundamental de algo. 归根=retornar à raiz + 结底=chegar ao fundo. Mais enfático que 总之.",
        exs:[{cn:"归根结底，算法偏见不过是人类偏见在数字世界的投影。",py:"Guī gēn jiédǐ, suànfǎ piānjiàn bùguò shì rénlèi piānjiàn zài shùzì shìjiè de tóuyǐng.",pt:"Em última análise, o viés algorítmico não é nada mais que a projeção dos preconceitos humanos no mundo digital."},{cn:"科技伦理问题，归根结底，是关于人类如何定义自身价值的问题。",py:"Kējì lúnlǐ wèntí, guī gēn jiédǐ, shì guānyú rénlèi rúhé dìngyì zìshēn jiàzhí de wèntí.",pt:"As questões de ética tecnológica, em última análise, são sobre como a humanidade define seus próprios valores."}] },
      { struct:"追根溯源，... (历史/根本分析)", label:"Rastreando à Origem / Na Origem de Tudo", color:"#6366F1",
        exp:"追根溯源 = rastreando à raiz e origem / na origem de tudo. Análise que vai à raiz histórica ou causal de um problema. Equivale a 'tracing back to the source'. Forma 4-character idiom (成语).",
        exs:[{cn:"追根溯源，当今的数字不平等与历史上的经济和教育不平等密不可分。",py:"Zhuī gēn sùyuán, dāngjīn de shùzì bù píngděng yǔ lìshǐ shàng de jīngjì hé jiàoyù bù píngděng mì bù kě fēn.",pt:"Rastreando à origem, a atual desigualdade digital é inseparável da desigualdade econômica e educacional histórica."},{cn:"追根溯源，技术治理的挑战其实是人类价值观念分歧的体现。",py:"Zhuī gēn sùyuán, jìshù zhìlǐ de tiǎozhàn qíshí shì rénlèi jiàzhí guānniàn fēnqí de tǐxiàn.",pt:"Na origem, os desafios da governança tecnológica são na verdade a manifestação das divergências nos valores humanos."}] },
      { struct:"综上所述，... (= 总结全文)", label:"Conforme Exposto Acima / Em Suma", color:"#D97706",
        exp:"综上所述 = conforme exposto/analisado acima / em suma (conclusão formal de redação). Estrutura padrão de encerramento em redações acadêmicas, relatórios e ensaios formais. 综=síntese + 上=acima + 所述=o que foi dito.",
        exs:[{cn:"综上所述，建立健全的科技伦理框架是应对人工智能挑战的根本途径。",py:"Zōng shàng suǒ shù, jiànlì jiànquán de kējì lúnlǐ kuàngjià shì yìngduì réngōng zhìnéng tiǎozhàn de gēnběn tújìng.",pt:"Conforme exposto acima, estabelecer um framework ético tecnológico sólido é o caminho fundamental para enfrentar os desafios da IA."},{cn:"综上所述，数字主权与个人数字权利的平衡，需要多方协作共同实现。",py:"Zōng shàng suǒ shù, shùzì zhǔquán yǔ gèrén shùzì quánlì de pínghéng, xūyào duō fāng xiézuò gòngtóng shíxiàn.",pt:"Conforme exposto, o equilíbrio entre soberania digital e direitos digitais individuais requer colaboração de múltiplas partes."}] },
    ],
    dialogue:[
      {sp:"A",cn:"算法偏见的根源究竟在哪里？",py:"Suànfǎ piānjiàn de gēnyuán jiùjìng zài nǎlǐ?",pt:"Afinal, onde está a raiz do viés algorítmico?"},
      {sp:"B",cn:"追根溯源，算法本身没有偏见，但训练数据反映了人类社会的历史不平等。归根结底，这是一个社会问题，而非纯技术问题。",py:"Zhuī gēn sùyuán, suànfǎ běnshēn méiyǒu piānjiàn, dàn xùnliàn shùjù fǎnyìng le rénlèi shèhuì de lìshǐ bù píngděng.",pt:"Rastreando à origem, os algoritmos em si não têm viés, mas os dados de treinamento refletem as desigualdades históricas da sociedade. Em última análise, é um problema social, não puramente tecnológico."},
      {sp:"A",cn:"那伦理审查和可解释性能解决问题吗？",py:"Nà lúnlǐ shěnchá hé kě jiěshì xìng néng jiějué wèntí ma?",pt:"Então a revisão ética e a explicabilidade podem resolver o problema?"},
      {sp:"B",cn:"可以缓解，但未必能根本解决。综上所述，鉴于问题的根源在于人类价值观，建立以价值对齐为核心的伦理框架才是长期之道。",py:"Kěyǐ huǎnjiě, dàn wèibì néng gēnběn jiějué. Zōng shàng suǒ shù, jiànyú wèntí de gēnyuán zàiyú rénlèi jiàzhíguān, jiànlì yǐ jiàzhí duìqí wéi héxīn de lúnlǐ kuàngjià cái shì chángqī zhī dào.",pt:"Pode aliviar, mas não necessariamente resolver fundamentalmente. Conforme exposto, dado que a raiz do problema está nos valores humanos, estabelecer um framework ético centrado no alinhamento de valores é o caminho de longo prazo."},
    ],
    quiz:[
      {q:"归根结底 equivale a:",opts:["superficialmente","por enquanto","em última análise/no fundo de tudo","provavelmente"],ans:2,exp:"✅ 归根结底 = em última análise / quando tudo é dito e feito. 成语. 归根=retornar à raiz + 结底=ir ao fundo. Indica a conclusão mais fundamental. Sinônimos: 说到底, 追根溯源."},
      {q:"综上所述 é usado como:",opts:["abertura de argumento","introdução de exemplo","conclusão/encerramento de análise formal","citação de fonte"],ans:2,exp:"✅ 综上所述 = conforme exposto/em suma. Estrutura PADRÃO de CONCLUSÃO em redações formais, dissertações e ensaios acadêmicos. 综=sintetizar + 上=acima + 所述=o que foi dito."},
      {q:"追根溯源 como método de análise significa:",opts:["analisar apenas o presente","rastrear à origem histórica/causal do problema","ignorar a história","criar nova teoria"],ans:1,exp:"✅ 追根溯源 = rastrear à raiz e origem. 追=seguir/rastrear + 根=raiz + 溯=remontar + 源=origem. Análise que vai à causa histórica ou fundamental. 成语 usado em análise crítica."},
      {q:"可解释性 (kě jiěshì xìng) na IA refere-se a:",opts:["complexidade","explicabilidade (capacidade de explicar as decisões da IA)","velocidade","precisão"],ans:1,exp:"✅ 可解释性 = explicabilidade (explainability). Capacidade de um sistema de IA de explicar suas decisões de forma compreensível para humanos. Conceito-chave na ética da IA e governança algorítmica."},
      {q:"价值对齐 (jiàzhí duìqí) na ética da IA significa:",opts:["alinhar preços","alinhamento de valores (sistemas de IA com valores humanos)","alinhar código","alinhar empresas"],ans:1,exp:"✅ 价值对齐 = alinhamento de valores (value alignment). Garantir que sistemas de IA atuem de acordo com valores e objetivos humanos. Um dos maiores desafios da IA segura e ética."},
    ] },

  { w:7, phase:"Artes", emoji:"🎨", color:"#7C3AED",
    theme:"Artes, Estética e Criatividade",
    stats:{ words:"~18 novas HSK 5", grammar:"莫过于 · 方能 · 臻于...境界", chars:"+25 novos" },
    vocab:[
      {h:"审美体验",py:"shěnměi tǐyàn",pt:"experiência estética"},
      {h:"艺术语言",py:"yìshù yǔyán",pt:"linguagem artística"},
      {h:"创作理念",py:"chuàngzuò lǐniàn",pt:"conceito criativo"},
      {h:"表现手法",py:"biǎoxiàn shǒufǎ",pt:"técnica expressiva/recurso artístico"},
      {h:"气韵生动",py:"qì yùn shēng dòng",pt:"vivo e cheio de espírito/vivaz (estética clássica)"},
      {h:"意蕴丰富",py:"yìyùn fēngfù",pt:"rico em implicações/significados"},
      {h:"形神兼备",py:"xíng shén jiān bèi",pt:"perfeito em forma e espírito"},
      {h:"独树一帜",py:"dú shù yī zhì",pt:"ter estilo próprio/único"},
      {h:"浑然天成",py:"hún rán tiān chéng",pt:"natural e perfeito/como obra da natureza"},
      {h:"境界",py:"jìngjiè",pt:"nível/reino artístico/spiritual"},
      {h:"格调",py:"gédiao",pt:"gosto/estilo/tonalidade"},
      {h:"品位",py:"pǐnwèi",pt:"gosto refinado/discernimento"},
      {h:"情趣",py:"qíngqù",pt:"charme/encanto/gosto pela vida"},
      {h:"审美标准",py:"shěnměi biāozhǔn",pt:"critério estético"},
      {h:"艺术价值",py:"yìshù jiàzhí",pt:"valor artístico"},
      {h:"传达情感",py:"chuándá qínggǎn",pt:"transmitir emoções"},
      {h:"引发共鸣",py:"yǐnfā gòngmíng",pt:"gerar ressonância/identificação"},
      {h:"超越时空",py:"chāoyuè shíkōng",pt:"transcender o tempo e o espaço"},
    ],
    grammar:[
      { struct:"莫过于 + N/V (superlativo elegante)", label:"Nada Supera / O Maior Prazer é / Mais que Tudo", color:"#7C3AED",
        exp:"莫过于 = nada supera / o melhor/maior é. Superlativo elegante e literário. 人生最大的乐趣莫过于... = o maior prazer da vida não supera... Mais literário que 最...的是.",
        exs:[{cn:"在欣赏艺术作品时，最深刻的体验莫过于与作品产生心灵共鸣。",py:"Zài xīnshǎng yìshù zuòpǐn shí, zuì shēnkè de tǐyàn mòguòyú yǔ zuòpǐn chǎnshēng xīnlíng gòngmíng.",pt:"Ao apreciar uma obra de arte, a experiência mais profunda não supera a ressonância espiritual com a obra."},{cn:"成就艺术家的，莫过于那种无法用言语表达的内在驱动力。",py:"Chéngjiu yìshùjiā de, mòguòyú nà zhǒng wúfǎ yòng yányǔ biǎodá de nèizài qūdòng lì.",pt:"O que forma um artista, acima de tudo, é aquela força motriz interna que não pode ser expressa em palavras."}] },
      { struct:"方能 + V (condição necessária)", label:"Só Assim se Pode / Somente Então se Consegue", color:"#D97706",
        exp:"方能 = só assim se pode / somente então se consegue. Indica que A é condição NECESSÁRIA para B. 只有A，才/方能B. Mais literário que 才能. 方=só então/apenas.",
        exs:[{cn:"只有深入了解一种文化，方能真正欣赏其艺术的精妙之处。",py:"Zhǐyǒu shēnrù liǎojiě yī zhǒng wénhuà, fāng néng zhēnzhèng xīnshǎng qí yìshù de jīngmiào zhī chù.",pt:"Só compreendendo profundamente uma cultura é que se pode verdadeiramente apreciar as sutilezas de sua arte."},{cn:"历经岁月的积淀，方能创作出触动人心的传世之作。",py:"Lìjīng suìyuè de jīdiàn, fāng néng chuàngzuò chū chùdòng rénxīn de chuánshì zhī zuò.",pt:"Somente após o acúmulo de anos de experiência é que se pode criar obras que tocam o coração e atravessam gerações."}] },
      { struct:"臻于 + 境界/完美 (alcançar nível supremo)", label:"Alcançar / Atingir (Nível Supremo)", color:"#059669",
        exp:"臻于 = alcançar / atingir (nível mais elevado). Literário e elevado. 臻于完善(atingir a perfeição), 臻于极致(atingir o sublime). Diferente de 达到(atingir, mais cotidiano).",
        exs:[{cn:"这位书法家历经数十年的修炼，其作品终于臻于化境。",py:"Zhè wèi shūfǎjiā lìjīng shùshí nián de xiūliàn, qí zuòpǐn zhōngyú zhēn yú huà jìng.",pt:"Este calígrafo, após décadas de aperfeiçoamento, finalmente alcançou o nível de transformação perfeita em suas obras."},{cn:"当技术与情感完美融合之际，艺术方能臻于至境。",py:"Dāng jìshù yǔ qínggǎn wánměi rónghé zhī jì, yìshù fāng néng zhēn yú zhì jìng.",pt:"Quando a técnica e a emoção se fundem perfeitamente, somente então a arte pode alcançar o nível supremo."}] },
    ],
    dialogue:[
      {sp:"A",cn:"你认为欣赏艺术最重要的条件是什么？",py:"Nǐ rènwéi xīnshǎng yìshù zuì zhòngyào de tiáojiàn shì shénme?",pt:"Qual você acha que é a condição mais importante para apreciar a arte?"},
      {sp:"B",cn:"最重要的莫过于开放的心态和审美敏感性。只有放下成见，方能真正感受作品的艺术语言。",py:"Zuì zhòngyào de mòguòyú kāifàng de xīntài hé shěnměi mǐngǎn xìng. Zhǐyǒu fàng xià chéngjiàn, fāng néng zhēnzhèng gǎnshòu zuòpǐn de yìshù yǔyán.",pt:"O mais importante, acima de tudo, é uma mente aberta e sensibilidade estética. Somente deixando os preconceitos de lado é que se pode verdadeiramente sentir a linguagem artística da obra."},
      {sp:"A",cn:"那技术的掌握重要吗？",py:"Nà jìshù de zhǎngwò zhòngyào ma?",pt:"E o domínio técnico é importante?"},
      {sp:"B",cn:"当然。但鉴于艺术的本质在于情感传达，技术方能是工具，不是目的。臻于最高境界的艺术，往往是技术与心灵合一、浑然天成的境界。",py:"Dāngrán. Dàn jiànyú yìshù de běnzhì zàiyú qínggǎn chuándá, jìshù fāng néng shì gōngjù, bú shì mùdì.",pt:"Claro. Mas em vista de que a essência da arte está na transmissão emocional, a técnica é apenas o meio, não o fim. A arte que atinge o nível mais elevado é frequentemente aquela em que técnica e alma se unem de forma natural e perfeita."},
    ],
    quiz:[
      {q:"莫过于 em '最大的乐趣莫过于旅行' significa:",opts:["não existe","o maior prazer não supera viajar (viajar é o maior prazer)","proibido","desnecessário"],ans:1,exp:"✅ 莫过于 = nada supera / o maior/melhor é. Superlativo ELEGANTE. '莫过于X' = nada ultrapassa X / X é o melhor/maior. Mais literário que '最...的是X'."},
      {q:"方能 (fāng néng) indica:",opts:["talvez se possa","condição necessária: somente então se pode","facilmente se pode","nunca se pode"],ans:1,exp:"✅ 方能 = somente então se pode / só assim se consegue. Indica CONDIÇÃO NECESSÁRIA. 只有A，方能B = somente fazendo A, então se consegue B. Mais literário/formal que 才能."},
      {q:"臻于 (zhēn yú) indica:",opts:["começar","alcançar nível supremo/perfeição","desistir","repetir"],ans:1,exp:"✅ 臻于 = alcançar/atingir (nível máximo/perfeição). Mais literário que 达到. 臻于完善(atingir a perfeição), 臻于化境(atingir transformação perfeita). Tom de elogio máximo."},
      {q:"气韵生动 (qì yùn shēng dòng) é um conceito que significa:",opts:["tecnicamente perfeito","vivo e cheio de espírito/energia vital (estética chinesa clássica)","esteticamente simples","artisticamente moderno"],ans:1,exp:"✅ 气韵生动 = vivo e cheio de espírito/energia vital. Critério estético clássico chinês de Xie He (謝赫, séc. V). 气韵=energia espiritual + 生动=vivo. O mais alto princípio da pintura chinesa clássica!"},
      {q:"独树一帜 (dú shù yī zhì) significa:",opts:["copiar estilo alheio","ter estilo próprio e único/se destacar de forma original","ser comum","seguir a tradição"],ans:1,exp:"✅ 独树一帜 = ter estilo próprio e único / plantar uma bandeira sozinho. 独=só + 树=erguer + 一=uma + 帜=bandeira. Criar seu próprio estilo distinto dos demais. Elogio de originalidade. 成语!"},
    ] },

  { w:8, phase:"Sociologia", emoji:"👥", color:"#DC2626",
    theme:"Sociologia, Antropologia e Comportamento Social",
    stats:{ words:"~18 novas HSK 5", grammar:"正如...所言/所示 · 有鉴于此 · 据此", chars:"+25 novos" },
    vocab:[
      {h:"社会分层",py:"shèhuì fēncéng",pt:"estratificação social"},
      {h:"社会流动",py:"shèhuì liúdòng",pt:"mobilidade social"},
      {h:"文化资本",py:"wénhuà zīběn",pt:"capital cultural (Bourdieu)"},
      {h:"社会凝聚力",py:"shèhuì níngjùlì",pt:"coesão social"},
      {h:"身份认同",py:"shēnfèn rèntóng",pt:"identidade"},
      {h:"社会规范",py:"shèhuì guīfàn",pt:"norma social"},
      {h:"偏差行为",py:"piānchā xíngwéi",pt:"comportamento desviante"},
      {h:"社会化",py:"shèhuìhuà",pt:"socialização"},
      {h:"亚文化",py:"yàwénhuà",pt:"subcultura"},
      {h:"文化融合",py:"wénhuà rónghé",pt:"fusão cultural/sincretismo"},
      {h:"涵化",py:"hánhuà",pt:"aculturação"},
      {h:"跨文化能力",py:"kuàwénhuà nénglì",pt:"competência intercultural"},
      {h:"文化冲击",py:"wénhuà chōngjī",pt:"choque cultural"},
      {h:"集体记忆",py:"jítǐ jìyì",pt:"memória coletiva"},
      {h:"符号互动",py:"fúhào hùdòng",pt:"interacionismo simbólico"},
      {h:"话语权",py:"huàyǔquán",pt:"poder de discurso/poder de fala"},
      {h:"他者化",py:"tāzhěhuà",pt:"alterização/otherização"},
      {h:"刻板印象",py:"kèbǎn yìnxiàng",pt:"estereótipo"},
    ],
    grammar:[
      { struct:"正如/诚如 + 权威/来源 + 所言/所指出/所示", label:"Tal Como / Conforme X Apontou", color:"#DC2626",
        exp:"正如/诚如...所言 = tal como X afirmou/apontou. Cita autoridade ou fonte. 正如 é neutro; 诚如 implica concordância. 所言=o que disse, 所指出=o que apontou, 所示=o que demonstrou.",
        exs:[{cn:"正如社会学家所指出的，文化资本在很大程度上决定了社会流动的可能性。",py:"Zhèng rú shèhuìxuéjiā suǒ zhǐchū de, wénhuà zīběn zài hěn dà chéngdù shàng juédìng le shèhuì liúdòng de kěnéng xìng.",pt:"Tal como os sociólogos apontaram, o capital cultural determina em grande medida as possibilidades de mobilidade social."},{cn:"诚如研究数据所示，社会凝聚力与经济平等之间存在显著正相关。",py:"Chéngrú yánjiū shùjù suǒ shì, shèhuì níngjùlì yǔ jīngjì píngděng zhījiān cúnzài xiǎnzhù zhèng xiāngguān.",pt:"Conforme os dados de pesquisa demonstram, existe uma correlação positiva significativa entre coesão social e igualdade econômica."}] },
      { struct:"有鉴于此，...", label:"Em Vista Disso / Tendo Isso em Consideração", color:"#6366F1",
        exp:"有鉴于此 = em vista disso / levando isso em consideração. Conecta análise anterior à conclusão ou proposta. Mais formal que 因此. Implica que o que segue é uma medida ou conclusão fundamentada.",
        exs:[{cn:"刻板印象根深蒂固，有鉴于此，我们有必要在教育中加强批判性思维的培养。",py:"Kèbǎn yìnxiàng gēn shēn dì gù, yǒu jiàn yú cǐ, wǒmen yǒu bìyào zài jiàoyù zhōng jiāqiáng pīpàn xìng sīwéi de péiyǎng.",pt:"Como os estereótipos estão profundamente arraigados, em vista disso, é necessário reforçar o cultivo do pensamento crítico na educação."},{cn:"文化冲击往往导致心理不适，有鉴于此，跨文化培训变得至关重要。",py:"Wénhuà chōngjī wǎngwǎng dǎozhì xīnlǐ bùshì, yǒu jiàn yú cǐ, kuàwénhuà péixùn biàndé zhì guān zhòngyào.",pt:"O choque cultural frequentemente leva ao desconforto psicológico; em vista disso, o treinamento intercultural torna-se de suma importância."}] },
      { struct:"据此，... (= 根据以上分析)", label:"Com Base Nisso / Assim Sendo", color:"#D97706",
        exp:"据此 = com base nisso / assim sendo / baseando-se no exposto. Conectivo formal que indica que a conclusão ou ação decorre da análise anterior. Mais literário que 因此/所以.",
        exs:[{cn:"研究表明社会分层对教育机会有深刻影响，据此，政策制定者应优先解决教育不平等问题。",py:"Yánjiū biǎomíng shèhuì fēncéng duì jiàoyù jīhuì yǒu shēnkè yǐngxiǎng, jù cǐ, zhèngcè zhìdìng zhě yīng yōuxiān jiějué jiàoyù bù píngděng wèntí.",pt:"A pesquisa demonstra que a estratificação social tem profundo impacto nas oportunidades educacionais; com base nisso, os formuladores de políticas devem priorizar a resolução da desigualdade educacional."},{cn:"正如历史所示，身份认同的危机往往导致社会冲突，据此，文化对话不可或缺。",py:"Zhèng rú lìshǐ suǒ shì, shēnfèn rèntóng de wēijī wǎngwǎng dǎozhì shèhuì chōngtū, jù cǐ, wénhuà duìhuà bùkě huòquē.",pt:"Tal como a história demonstra, crises de identidade frequentemente levam a conflitos sociais; com base nisso, o diálogo cultural é indispensável."}] },
    ],
    dialogue:[
      {sp:"A",cn:"文化资本的概念如何解释教育不平等？",py:"Wénhuà zīběn de gàiniàn rúhé jiěshì jiàoyù bù píngděng?",pt:"Como o conceito de capital cultural explica a desigualdade educacional?"},
      {sp:"B",cn:"正如布迪厄所指出的，文化资本包括知识、技能和教育背景，这些不均等地分布在不同社会阶层。",py:"Zhèng rú Bùdíē suǒ zhǐchū de, wénhuà zīběn bāokuò zhīshi, jìnéng hé jiàoyù bèijǐng, zhèxiē bù jūnděng de fēnbù zài bùtóng shèhuì jiēcéng.",pt:"Tal como Bourdieu apontou, o capital cultural inclui conhecimento, habilidades e formação educacional, distribuídos de forma desigual nas diferentes camadas sociais."},
      {sp:"A",cn:"这导致了刻板印象和身份认同危机吗？",py:"Zhè dǎozhì le kèbǎn yìnxiàng hé shēnfèn rèntóng wēijī ma?",pt:"Isso leva a estereótipos e crises de identidade?"},
      {sp:"B",cn:"有鉴于此，确实会。刻板印象强化了社会分层，据此，提升跨文化能力和批判性思维是打破这一循环的关键。",py:"Yǒu jiàn yú cǐ, quèshí huì. Kèbǎn yìnxiàng qiánghuà le shèhuì fēncéng, jù cǐ, tíshēng kuàwénhuà nénglì hé pīpàn xìng sīwéi shì dǎpò zhè yī xúnhuán de guānjiàn.",pt:"Em vista disso, de fato acontece. Os estereótipos reforçam a estratificação social; com base nisso, desenvolver competência intercultural e pensamento crítico é a chave para romper este ciclo."},
    ],
    quiz:[
      {q:"正如...所言/所指出 é usado para:",opts:["expressar dúvida","citar autoridade/fonte de forma formal","fazer pergunta","contradizer"],ans:1,exp:"✅ 正如/诚如...所言 = tal como X afirmou. Cita fonte ou autoridade. 所言=o que disse, 所指出=o que apontou. Estrutura padrão de CITAÇÃO em análise acadêmica formal."},
      {q:"有鉴于此 conecta:",opts:["duas causas","análise anterior → conclusão/medida decorrente","contradição","citação"],ans:1,exp:"✅ 有鉴于此 = em vista disso / levando isso em consideração. Conecta ANÁLISE → CONCLUSÃO/AÇÃO. Mais formal que 因此. Implica que a ação proposta é fundamentada na análise anterior."},
      {q:"据此 (jù cǐ) equivale a:",opts:["apesar disso","com base nisso / assim sendo","antes disso","ao contrário disso"],ans:1,exp:"✅ 据此 = com base nisso / baseando-se no exposto. 据=baseado em + 此=isso. Conectivo formal que indica que o que segue decorre logicamente do que foi dito. Mais literário que 所以."},
      {q:"文化资本 (wénhuà zīběn) é um conceito criado por:",opts:["Marx","Freud","Bourdieu (capital cultural — conhecimento, habilidades, formação)","Durkheim"],ans:2,exp:"✅ 文化资本 = capital cultural, conceito de Pierre Bourdieu. Inclui: capital incorporado(conhecimento), objetificado(bens culturais) e institucionalizado(títulos educacionais). Explica reprodução de desigualdades sociais."},
      {q:"刻板印象 (kèbǎn yìnxiàng) significa:",opts:["memória coletiva","identidade cultural","estereótipo","norma social"],ans:2,exp:"✅ 刻板印象 = estereótipo. 刻板=fixo/rígido + 印象=impressão. Uma impressão fixa e simplificada sobre um grupo. Fonte de preconceito e discriminação. Literalmente: 'impressão em bloco fixo (não flexível)'."},
    ] },

  { w:9, phase:"Economia Adv.", emoji:"💰", color:"#D97706",
    theme:"Economia Avançada e Finanças Globais",
    stats:{ words:"~18 novas HSK 5", grammar:"纵观...全局 · 况且 · 再者", chars:"+25 novos" },
    vocab:[
      {h:"宏观经济",py:"hóngguān jīngjì",pt:"macroeconomia"},
      {h:"微观经济",py:"wéiguān jīngjì",pt:"microeconomia"},
      {h:"经济周期",py:"jīngjì zhōuqī",pt:"ciclo econômico"},
      {h:"比较优势",py:"bǐjiào yōushì",pt:"vantagem comparativa (Ricardo)"},
      {h:"金融监管",py:"jīnróng jiāngguǎn",pt:"regulação financeira"},
      {h:"创新经济",py:"chuàngxīn jīngjì",pt:"economia da inovação"},
      {h:"数字货币",py:"shùzì huòbì",pt:"moeda digital"},
      {h:"碳定价",py:"tàn dìngjià",pt:"precificação de carbono"},
      {h:"绿色债券",py:"lǜsè zhàiquàn",pt:"green bonds / títulos verdes"},
      {h:"可持续金融",py:"kě chíxù jīnróng",pt:"finanças sustentáveis"},
      {h:"经济转型",py:"jīngjì zhuǎnxíng",pt:"transformação econômica"},
      {h:"高质量发展",py:"gāo zhìliàng fāzhǎn",pt:"desenvolvimento de alta qualidade"},
      {h:"产业政策",py:"chǎnyè zhèngcè",pt:"política industrial"},
      {h:"全球供应链",py:"quánqiú gōngyìng liàn",pt:"cadeia global de suprimentos"},
      {h:"经济韧性",py:"jīngjì rènxìng",pt:"resiliência econômica"},
      {h:"市场失灵",py:"shìchǎng shīlíng",pt:"falha de mercado"},
      {h:"外部效应",py:"wàibù xiàoyìng",pt:"externalidade"},
      {h:"信息不对称",py:"xìnxī bù duìchèn",pt:"assimetria de informação"},
    ],
    grammar:[
      { struct:"纵观 + 全局/历史/领域，...", label:"Examinando Como um Todo / Com Visão Panorâmica", color:"#D97706",
        exp:"纵观 = examinando de forma abrangente / com visão panorâmica / olhando para o todo. 纵观全局(visão do quadro geral), 纵观历史(examinando a história como um todo). Tom analítico e formal.",
        exs:[{cn:"纵观全球经济格局，可以发现发展中国家的增长速度普遍高于发达国家。",py:"Zòngguān quánqiú jīngjì géjú, kěyǐ fāxiàn fāzhǎn zhōng guójiā de zēngzhǎng sùdù pǔbiàn gāoyú fādá guójiā.",pt:"Examinando o panorama econômico global como um todo, pode-se observar que a taxa de crescimento dos países em desenvolvimento é geralmente superior à dos países desenvolvidos."},{cn:"纵观历史，每次重大技术革命都会带来经济格局的根本性变革。",py:"Zòngguān lìshǐ, měi cì zhòngdà jìshù gémìng dōu huì dàilái jīngjì géjú de gēnběn xìng biàngé.",pt:"Examinando a história como um todo, cada grande revolução tecnológica trouxe transformações fundamentais no panorama econômico."}] },
      { struct:"况且 + 补充论据 (= 而且/更何况)", label:"Além do Mais / Ademais / E Mais Ainda", color:"#059669",
        exp:"况且 = além do mais / ademais. Adiciona argumento suplementar que reforça a posição. Mais formal que 而且. 况且 indica que o argumento que segue é ADICIONAL ao principal (não apenas mais forte como 何况).",
        exs:[{cn:"绿色债券不仅有助于环境保护，况且还能吸引更多国际投资者。",py:"Lǜsè zhàiquàn bùjǐn yǒuzhù yú huánjìng bǎohù, kuàngqiě hái néng xīyǐn gèng duō guójì tóuzīzhě.",pt:"Os títulos verdes não só ajudam na proteção ambiental; além do mais, atraem mais investidores internacionais."},{cn:"市场失灵需要政策干预，况且信息不对称更加剧了这一问题。",py:"Shìchǎng shīlíng xūyào zhèngcè gānyù, kuàngqiě xìnxī bù duìchèn gèng jiājù le zhè yī wèntí.",pt:"A falha de mercado requer intervenção política; além do mais, a assimetria de informação agrava ainda mais este problema."}] },
      { struct:"再者，... (= 第三个论点/补充)", label:"Além Disso / Acrescentando Mais (3º Argumento)", color:"#6366F1",
        exp:"再者 = além disso (acrescentando mais um argumento). Tipicamente o TERCEIRO ou posterior ponto de um argumento. Sequência: 首先(1º)→其次/其二(2º)→再者(3º)→最后(fim).",
        exs:[{cn:"发展数字货币，一方面能提高支付效率；其次可以增强金融包容性；再者，有助于央行更好地实施货币政策。",py:"Fāzhǎn shùzì huòbì, yī fāngmiàn néng tígāo zhīfù xiàolǜ; qícì kěyǐ zēngqiáng jīnróng bāoróng xìng; zàizhě, yǒuzhù yú yāngháng gèng hǎo de shíshī huòbì zhèngcè.",pt:"Desenvolver a moeda digital, por um lado, aumenta a eficiência dos pagamentos; em segundo lugar, fortalece a inclusão financeira; além disso, ajuda o banco central a implementar melhor a política monetária."},{cn:"经济韧性重要；再者，纵观全球，具有强韧性的经济体在危机后恢复更快。",py:"Jīngjì rènxìng zhòngyào; zàizhě, zòngguān quánqiú, jùyǒu qiáng rènxìng de jīngjìtǐ zài wēijī hòu huīfù gèng kuài.",pt:"A resiliência econômica é importante; além disso, examinando globalmente, as economias com maior resiliência se recuperam mais rapidamente após crises."}] },
    ],
    dialogue:[
      {sp:"A",cn:"纵观当前全球经济，你认为最大的结构性挑战是什么？",py:"Zòngguān dāngqián quánqiú jīngjì, nǐ rènwéi zuì dà de jiégòu xìng tiǎozhàn shì shénme?",pt:"Examinando a economia global atual como um todo, qual você acha que é o maior desafio estrutural?"},
      {sp:"B",cn:"信息不对称和市场失灵是核心问题。况且，全球供应链的脆弱性使这些问题愈发凸显。",py:"Xìnxī bù duìchèn hé shìchǎng shīlíng shì héxīn wèntí. Kuàngqiě, quánqiú gōngyìng liàn de cuìruò xìng shǐ zhèxiē wèntí yùfā tūxiǎn.",pt:"A assimetria de informação e a falha de mercado são os problemas centrais. Além do mais, a fragilidade das cadeias globais de suprimento torna esses problemas ainda mais evidentes."},
      {sp:"A",cn:"再者，气候变化带来的经济风险是不是也不容忽视？",py:"Zàizhě, qìhòu biànhuà dàilái de jīngjì fēngxiǎn shì bu shì yě bùróng hūshì?",pt:"Além disso, os riscos econômicos trazidos pela mudança climática também não podem ser ignorados, certo?"},
      {sp:"B",cn:"完全正确！碳定价和可持续金融正是解决这个问题的工具。归根结底，高质量发展必须以可持续性为核心。",py:"Wánquán zhèngquè! Tàn dìngjià hé kě chíxù jīnróng zhèng shì jiějué zhège wèntí de gōngjù.",pt:"Totalmente correto! A precificação de carbono e as finanças sustentáveis são exatamente as ferramentas para resolver isso. Em última análise, o desenvolvimento de alta qualidade deve ter a sustentabilidade como núcleo."},
    ],
    quiz:[
      {q:"纵观 indica:",opts:["olhar para detalhes","visão panorâmica/examinar como um todo","olhar para o passado apenas","comparar dois elementos"],ans:1,exp:"✅ 纵观 = examinando de forma abrangente / visão panorâmica. 纵=vertical/geral + 观=observar. 纵观全局=visão do quadro geral. Tom analítico formal, frequente em macroeconomia e análise política."},
      {q:"况且 vs 何况 — qual a diferença?",opts:["sinônimos","况且=argumento adicional suplementar; 何况=argumento progressivamente mais extremo","况且=formal; 何况=informal","况且=negativo; 何况=positivo"],ans:1,exp:"✅ 况且 = além do mais (argumento SUPLEMENTAR, adiciona mais um ponto). 何况 = quanto mais (progressão INTENSIFICADORA, o caso seguinte é ainda mais extremo). Usos distintos!"},
      {q:"再者 em uma sequência argumentativa vem após:",opts:["首先(1°) e 最后(fim)","首先(1°) e 其次(2°)","就算(mesmo que) e 也(ainda)","鉴于(dado que) e 据此(com base nisso)"],ans:1,exp:"✅ Sequência: 首先(1°)→其次/其二(2°)→再者(3°)→最后(fim). 再者 é tipicamente o TERCEIRO ponto. Estrutura padrão de argumentação em múltiplos pontos em redações formais!"},
      {q:"比较优势 (bǐjiào yōushì) é o conceito de:",opts:["competição total","vantagem comparativa (teoria de David Ricardo)","monopólio","protecionismo"],ans:1,exp:"✅ 比较优势 = vantagem comparativa. Teoria de David Ricardo: cada nação deve se especializar no que produz com menor custo de oportunidade relativo, mesmo que não seja o melhor em termos absolutos. Base do livre comércio!"},
      {q:"外部效应 (wàibù xiàoyìng) significa:",opts:["efeito interno de mercado","externalidade (custo ou benefício imposto a terceiros não participantes)","efeito de exportação","influência estrangeira"],ans:1,exp:"✅ 外部效应 = externalidade. Custo ou benefício que recai sobre terceiros não participantes na transação. 负外部效应(externalidade negativa)=poluição; 正外部效应(positiva)=vacinação. Justifica intervenção do Estado!"},
    ] },

  { w:10, phase:"Intercultural", emoji:"🌐", color:"#0891B2",
    theme:"Comunicação Intercultural e Globalização",
    stats:{ words:"~18 novas HSK 5", grammar:"换言之 · 综上所述 · 一言以蔽之", chars:"+25 novos" },
    vocab:[
      {h:"文化认同",py:"wénhuà rèntóng",pt:"identidade cultural"},
      {h:"跨文化交际",py:"kuàwénhuà jiāojì",pt:"comunicação intercultural"},
      {h:"集体主义",py:"jítǐ zhǔyì",pt:"coletivismo"},
      {h:"个人主义",py:"gèrén zhǔyì",pt:"individualismo"},
      {h:"高语境文化",py:"gāo yǔjìng wénhuà",pt:"cultura de alto contexto"},
      {h:"低语境文化",py:"dī yǔjìng wénhuà",pt:"cultura de baixo contexto"},
      {h:"面子文化",py:"miànzi wénhuà",pt:"cultura do face/honra"},
      {h:"非语言沟通",py:"fēi yǔyán gōutōng",pt:"comunicação não-verbal"},
      {h:"文化偏见",py:"wénhuà piānjiàn",pt:"viés/preconceito cultural"},
      {h:"文化相对主义",py:"wénhuà xiāngduì zhǔyì",pt:"relativismo cultural"},
      {h:"文明互鉴",py:"wénmíng hùjiàn",pt:"aprendizado mútuo entre civilizações"},
      {h:"文化外交",py:"wénhuà wàijiāo",pt:"diplomacia cultural"},
      {h:"全球公民",py:"quánqiú gōngmín",pt:"cidadão global"},
      {h:"文化软实力",py:"wénhuà ruǎn shílì",pt:"poder suave cultural"},
      {h:"文化误读",py:"wénhuà wùdú",pt:"mal-leitura/má interpretação cultural"},
      {h:"跨文化理解",py:"kuàwénhuà lǐjiě",pt:"entendimento intercultural"},
      {h:"语言霸权",py:"yǔyán bàquán",pt:"hegemonia linguística"},
      {h:"本土化",py:"běntǔhuà",pt:"localização/adaptação local"},
    ],
    grammar:[
      { struct:"换言之，... (= 也就是说/即)", label:"Em Outras Palavras / Ou Seja (Formal)", color:"#0891B2",
        exp:"换言之 = em outras palavras / ou seja / por outras palavras. Reformula ou esclarece o que foi dito. 更正式 que 也就是说. Tom acadêmico e literário.",
        exs:[{cn:"跨文化沟通的核心在于换位思考，换言之，即以对方的文化视角来理解世界。",py:"Kuàwénhuà gōutōng de héxīn zàiyú huàn wèi sīkǎo, huàn yán zhī, jí yǐ duìfāng de wénhuà shìjiǎo lái lǐjiě shìjiè.",pt:"O núcleo da comunicação intercultural está em pensar no lugar do outro; em outras palavras, entender o mundo pela perspectiva cultural da outra parte."},{cn:"文化相对主义主张不以本文化标准评判他文化，换言之，接受文化的多元性与差异性。",py:"Wénhuà xiāngduì zhǔyì zhǔzhāng bù yǐ běn wénhuà biāozhǔn píngjuàn tā wénhuà, huàn yán zhī, jiēshòu wénhuà de duōyuán xìng yǔ chāyì xìng.",pt:"O relativismo cultural propõe não julgar outras culturas pelos padrões da própria cultura; em outras palavras, aceitar a diversidade e as diferenças culturais."}] },
      { struct:"综上所述，... (结论公式)", label:"Em Suma / Conforme Exposto (Encerramento Formal)", color:"#D97706",
        exp:"综上所述 = em suma / conforme o exposto / sintetizando o acima. Fórmula PADRÃO de encerramento em redações e ensaios acadêmicos formais. Deve vir antes da conclusão principal.",
        exs:[{cn:"综上所述，文化软实力与文明互鉴是促进全球和平与发展的重要路径。",py:"Zōng shàng suǒ shù, wénhuà ruǎn shílì yǔ wénmíng hùjiàn shì cùjìn quánqiú hépíng yǔ fāzhǎn de zhòngyào lùjìng.",pt:"Em suma, o poder suave cultural e o aprendizado mútuo entre civilizações são importantes caminhos para promover a paz e o desenvolvimento globais."},{cn:"综上所述，跨文化能力的培养是全球化时代不可或缺的教育目标。",py:"Zōng shàng suǒ shù, kuàwénhuà nénglì de péiyǎng shì quánqiúhuà shídài bùkě huòquē de jiàoyù mùbiāo.",pt:"Em suma, o desenvolvimento da competência intercultural é um objetivo educacional indispensável na era da globalização."}] },
      { struct:"一言以蔽之，... (= 总结精华)", label:"Em Uma Palavra / Para Resumir Tudo / Em Síntese", color:"#059669",
        exp:"一言以蔽之 = em uma palavra / para resumir em uma frase. Apresenta a essência de um argumento complexo em afirmação concisa. Mais dramático e elegante que 总结来说. Literalmente: 'uma palavra para cobrir tudo'.",
        exs:[{cn:"一言以蔽之，跨文化沟通的成功取决于尊重、理解与开放三个关键要素。",py:"Yī yán yǐ bì zhī, kuàwénhuà gōutōng de chénggōng qǔjuéyú zūnzhòng, lǐjiě yǔ kāifàng sān gè guānjiàn yāosù.",pt:"Em uma palavra, o sucesso da comunicação intercultural depende de três elementos-chave: respeito, compreensão e abertura."},{cn:"一言以蔽之，语言不仅是沟通工具，更是文化认同的载体。",py:"Yī yán yǐ bì zhī, yǔyán bùjǐn shì gōutōng gōngjù, gèng shì wénhuà rèntóng de zàitǐ.",pt:"Em uma palavra, a língua não é apenas uma ferramenta de comunicação, mas o veículo da identidade cultural."}] },
    ],
    dialogue:[
      {sp:"A",cn:"为什么有人说高语境文化和低语境文化之间沟通特别困难？",py:"Wèishénme yǒu rén shuō gāo yǔjìng wénhuà hé dī yǔjìng wénhuà zhījiān gōutōng tèbié kùnnán?",pt:"Por que alguns dizem que a comunicação entre culturas de alto e baixo contexto é especialmente difícil?"},
      {sp:"B",cn:"换言之，高语境文化（如中国、日本）更多依赖非语言信号和隐含意义，而低语境文化（如德国、美国）则倾向于直接明确的表达。",py:"Huàn yán zhī, gāo yǔjìng wénhuà gèng duō yīlài fēi yǔyán xìnhào hé yǐnhán yìyì, ér dī yǔjìng wénhuà zé qīngxiàng yú zhíjiē míngquè de biǎodá.",pt:"Em outras palavras, as culturas de alto contexto (como China e Japão) dependem mais de sinais não-verbais e significados implícitos, enquanto as de baixo contexto (como Alemanha e EUA) tendem à expressão direta e explícita."},
      {sp:"A",cn:"面子文化在其中扮演什么角色？",py:"Miànzi wénhuà zài qí zhōng bànyǎn shénme juésè?",pt:"Que papel desempenha a cultura do face nesse contexto?"},
      {sp:"B",cn:"综上所述，一言以蔽之：文化误读往往源于对面子、语境和非语言沟通的不了解。文明互鉴才是根本解决之道。",py:"Zōng shàng suǒ shù, yī yán yǐ bì zhī: wénhuà wùdú wǎngwǎng yuányú duì miànzi, yǔjìng hé fēi yǔyán gōutōng de bù liǎojiě. Wénmíng hùjiàn cái shì gēnběn jiějué zhī dào.",pt:"Em suma, numa palavra: as más interpretações culturais geralmente têm origem no desconhecimento do face, do contexto e da comunicação não-verbal. O aprendizado mútuo entre civilizações é o caminho fundamental de resolução."},
    ],
    quiz:[
      {q:"换言之 é mais parecido com:",opts:["总结来说","也就是说(em outras palavras) — mas mais formal","鉴于(dado que)","况且(além do mais)"],ans:1,exp:"✅ 换言之 ≈ 也就是说(em outras palavras), mas MAIS FORMAL e literário. 换=trocar + 言=palavras + 之=isso. Reformula ou esclarece o que foi dito de forma mais precisa ou acessível."},
      {q:"综上所述 deve aparecer em qual parte de uma redação formal?",opts:["na abertura","no meio do desenvolvimento","antes da conclusão / para iniciar o fechamento","como título"],ans:2,exp:"✅ 综上所述 é a FÓRMULA DE ENCERRAMENTO padrão em redações formais. Vem ANTES da conclusão principal para sinalizar a síntese final. Estrutura: desenvolvimento → 综上所述 → conclusão principal."},
      {q:"一言以蔽之 funciona como:",opts:["introdução de evidência","refutação","síntese dramática e concisa de toda a argumentação","citação de fonte"],ans:2,exp:"✅ 一言以蔽之 = 'cobrindo tudo em uma palavra/frase'. Apresenta a ESSÊNCIA de todo o argumento em uma afirmação concisa e impactante. Mais dramático e literário que 总结来说. Muito eficaz como conclusão!"},
      {q:"高语境文化 (gāo yǔjìng wénhuà) refere-se a:",opts:["cultura com muita tecnologia","cultura onde a comunicação depende mais de contexto implícito e não-verbal","cultura muito direta e explícita","cultura com muitos dialetos"],ans:1,exp:"✅ 高语境文化 = cultura de alto contexto (High-Context Culture, Hall 1976). Comunicação mais implícita, contextual, não-verbal. Exemplos: China, Japão, Coreia, países árabes. ↔ 低语境文化(Low-Context)=comunicação direta e explícita."},
      {q:"文化软实力 (wénhuà ruǎn shílì) é o conceito de:",opts:["poder militar cultural","poder suave cultural (influência via cultura, valores, arte)","subvencionar a cultura","proteger a cultura"],ans:1,exp:"✅ 文化软实力 = poder suave cultural. Conceito de Joseph Nye: a capacidade de influenciar outros através de atração cultural, valores e diplomacia (vs. poder duro=militar/econômico). 软实力=soft power."},
    ] },

  { w:11, phase:"成语", emoji:"📿", color:"#374151",
    theme:"成语 e Expressões Idiomáticas — Domínio HSK 5",
    stats:{ words:"20 成语 HSK 5", grammar:"Estrutura e uso de 成语 · Referências históricas · Uso moderno", chars:"成语 clássicos" },
    vocab:[
      {h:"一石二鸟",py:"yī shí èr niǎo",pt:"matar dois coelhos com uma pedrada"},
      {h:"半途而废",py:"bàntú ér fèi",pt:"desistir no meio do caminho"},
      {h:"画龙点睛",py:"huà lóng diǎn jīng",pt:"o toque final que dá vida/o acabamento"},
      {h:"守株待兔",py:"shǒu zhū dài tù",pt:"esperar sorte fácil sem trabalhar"},
      {h:"画蛇添足",py:"huà shé tiān zú",pt:"estragar adicionando o desnecessário"},
      {h:"亡羊补牢",py:"wáng yáng bǔ láo",pt:"consertar depois do estrago (melhor tarde)"},
      {h:"卧薪尝胆",py:"wò xīn cháng dǎn",pt:"suportar privações para alcançar objetivo"},
      {h:"一鸣惊人",py:"yī míng jīng rén",pt:"surpreender a todos de uma vez"},
      {h:"厚积薄发",py:"hòu jī bó fā",pt:"acumular muito e liberar no momento certo"},
      {h:"精益求精",py:"jīng yì qiú jīng",pt:"buscar a perfeição sempre"},
      {h:"推陈出新",py:"tuī chén chū xīn",pt:"criar o novo a partir do antigo"},
      {h:"举一反三",py:"jǔ yī fǎn sān",pt:"a partir de um exemplo, entender muitos"},
      {h:"融会贯通",py:"róng huì guàn tōng",pt:"integrar e dominar completamente"},
      {h:"水到渠成",py:"shuǐ dào qú chéng",pt:"o sucesso vem naturalmente com o preparo"},
      {h:"百折不挠",py:"bǎi zhé bù náo",pt:"persistir apesar de todas as dificuldades"},
      {h:"见微知著",py:"jiàn wēi zhī zhù",pt:"ver o todo pelos detalhes"},
      {h:"博采众长",py:"bó cǎi zhòng cháng",pt:"absorver o melhor de muitas fontes"},
      {h:"殊途同归",py:"shū tú tóng guī",pt:"caminhos diferentes, mesmo destino"},
      {h:"相辅相成",py:"xiāng fǔ xiāng chéng",pt:"complementar-se mutuamente"},
      {h:"势如破竹",py:"shì rú pò zhú",pt:"progredir com velocidade e força irresistíveis"},
    ],
    grammar:[
      { struct:"成语 = 4 caracteres + história + significado simbólico", label:"Estrutura e Uso dos 成语 (Idioms)", color:"#374151",
        exp:"成语(chéngyǔ) são expressões de 4 caracteres com raiz histórica ou literária. Estrutura: (1) Origem histórica(典故). (2) Sentido literal (4 caracteres). (3) Sentido simbólico/idiomático. (4) Uso moderno. Nível HSK 5+: dominar tanto o sentido quanto a origem é esperado.",
        exs:[{cn:"他不断精益求精，终于在这个领域一鸣惊人，证明了厚积薄发的价值。",py:"Tā bùduàn jīng yì qiú jīng, zhōngyú zài zhège lǐngyù yī míng jīng rén, zhèngmíng le hòu jī bó fā de jiàzhí.",pt:"Ele buscou continuamente a perfeição, e finalmente surpreendeu a todos na área, provando o valor de acumular experiência e revelar no momento certo."},{cn:"学习外语，不妨博采众长，融会贯通，水到渠成地达到流利。",py:"Xuéxí wàiyǔ, bùfáng bó cǎi zhòng cháng, róng huì guàn tōng, shuǐ dào qú chéng de dádào liúlì.",pt:"Para aprender línguas estrangeiras, não custa absorver o melhor de múltiplas fontes, integrar e dominar completamente — assim a fluência vem naturalmente com o preparo."}] },
      { struct:"成语 em contexto acadêmico / situação formal", label:"成语 no Registro Formal", color:"#6366F1",
        exp:"HSK 5 exige usar 成语 CORRETAMENTE em contextos formais. Erros comuns: ① usar 成语 negativos em contextos positivos. ② confundir 成语 similares. ③ interpretação literal em vez de simbólica. Regra: sempre aprender o CONTEXTO de uso, não apenas o significado.",
        exs:[{cn:"就业市场竞争激烈，势如破竹的技术发展更使传统行业面临巨大挑战。",py:"Jiùyè shìchǎng jìngzhēng jīliè, shì rú pò zhú de jìshù fāzhǎn gèng shǐ chuántǒng hángyè miànlín jùdà tiǎozhàn.",pt:"A competição no mercado de trabalho é acirrada, e o desenvolvimento tecnológico irresistível desafia ainda mais as indústrias tradicionais."},{cn:"科技与人文，看似殊途同归，实则相辅相成，缺一不可。",py:"Kējì yǔ rénwén, kàn sì shū tú tóng guī, shí zé xiāng fǔ xiāng chéng, quēyī bùkě.",pt:"Tecnologia e humanidades, embora aparentemente percursos diferentes para o mesmo destino, na realidade se complementam mutuamente e são indispensáveis."}] },
      { struct:"典故 (diǎngù) — Origem Histórica dos 成语", label:"Raízes Históricas: Os 10 成语 Mais Importantes", color:"#DC2626",
        exp:"每个成语都有典故: ① 一鸣惊人=rei que ficou quieto 3 anos antes de agir. ② 卧薪尝胆=Goujian endurando para vingar derrota. ③ 画龙点睛=pintor que recusou pintar olhos até o último. ④ 守株待兔=agricultor esperando coelhos colidirem. ⑤ 亡羊补牢=consertar o curral depois de perder a ovelha. Conhecer a origem aumenta muito o impacto no uso.",
        exs:[{cn:"正如'卧薪尝胆'所示，真正的成功往往需要长期的隐忍与积累。",py:"Zhèng rú 'wò xīn cháng dǎn' suǒ shì, zhēnzhèng de chénggōng wǎngwǎng xūyào cháng qī de yǐnrěn yǔ jīlěi.",pt:"Tal como '卧薪尝胆' demonstra, o sucesso verdadeiro frequentemente requer longa paciência e acumulação."},{cn:"",py:"",pt:""}] },
    ],
    dialogue:[
      {sp:"A",cn:"学习成语的时候，只背意思够吗？",py:"Xuéxí chéngyǔ de shíhou, zhǐ bèi yìsi gòu ma?",pt:"Ao aprender 成语, é suficiente memorizar apenas o significado?"},
      {sp:"B",cn:"远远不够！要真正掌握成语，必须了解其典故背景，方能在恰当的语境中使用。比如'亡羊补牢'不是批评，而是说'虽然晚了，但还来得及'。",py:"Yuǎnyuǎn bùgòu! Yào zhēnzhèng zhǎngwò chéngyǔ, bìxū liǎojiě qí diǎngù bèijǐng, fāng néng zài qiàdàng de yǔjìng zhōng shǐyòng.",pt:"Longe de ser suficiente! Para verdadeiramente dominar os 成语, é necessário conhecer o contexto histórico — somente assim se pode usar no contexto adequado. Por exemplo, '亡羊补牢' não é crítica, mas 'embora tarde, ainda dá tempo'."},
      {sp:"A",cn:"那最难用好的成语是哪些？",py:"Nà zuì nán yòng hǎo de chéngyǔ shì nǎxiē?",pt:"Quais são os 成语 mais difíceis de usar corretamente?"},
      {sp:"B",cn:"一言以蔽之：那些字面意思与实际意思差距最大的！比如'画龙点睛'不是画画，而是'o toque final que dá vida a tudo'. 博采众长来学成语，举一反三——这才是掌握之道。",py:"Yī yán yǐ bì zhī: nàxiē zìmiàn yìsi yǔ shíjì yìsi chājù zuì dà de! Bǐrú 'huà lóng diǎn jīng' bú shì huà huà, ér shì 'o toque final'.",pt:"Em uma palavra: aqueles com maior distância entre o sentido literal e o real! Por exemplo, '画龙点睛' não é sobre pintar, mas 'o toque final que dá vida a tudo'. Absorver o melhor de muitas fontes para estudar 成语, e a partir de um entender muitos — esse é o caminho do domínio."},
    ],
    quiz:[
      {q:"厚积薄发 (hòu jī bó fā) significa:",opts:["ser preguiçoso","acumular muito e revelar no momento certo","estudar pouco","fazer tudo rápido"],ans:1,exp:"✅ 厚积薄发 = acumular muito profundamente e liberar/florescer no momento certo. 厚积=acumulação profunda + 薄发=liberação suave mas impactante. Filosofia de preparação longa antes da ação. Muito usado em contextos de estudo e carreira!"},
      {q:"画龙点睛 (huà lóng diǎn jīng) significa:",opts:["pintar um dragão","estragar algo com excesso","o toque final que dá vida / o acabamento perfeito","trabalhar muito"],ans:2,exp:"✅ 画龙点睛 = o toque final que dá vida. 画龙=pintar o dragão + 点睛=tocar os olhos. Origem: pintor que pintava dragões sem olhos; ao adicionar os olhos, os dragões voavam. Significa o detalhe final que transforma tudo!"},
      {q:"亡羊补牢 (wáng yáng bǔ láo) tem sentido de:",opts:["é tarde demais, desista","consertar depois do problema (melhor tarde que nunca)","nunca conserta","preparar antes do problema"],ans:1,exp:"✅ 亡羊补牢 = consertar o curral APÓS perder a ovelha. Significado: embora a perda já tenha ocorrido, ainda vale a pena tomar medidas corretivas. Equivalente português: 'depois da tempestade, vem a bonança' / 'é melhor tarde que nunca'. Tom POSITIVO: ainda dá tempo!"},
      {q:"水到渠成 (shuǐ dào qú chéng) expressa a ideia de:",opts:["forçar as coisas","o sucesso vem naturalmente quando as condições estão prontas","trabalhar sem parar","ter azar"],ans:1,exp:"✅ 水到渠成 = quando a água chega, o canal se forma / o sucesso vem naturalmente com a preparação adequada. Filosofia taoísta: criar as condições e deixar o resultado acontecer naturalmente. Muito usado para descrever maturidade de projetos!"},
      {q:"相辅相成 (xiāng fǔ xiāng chéng) significa:",opts:["competir mutuamente","contradizer-se","complementar-se mutuamente","ser idênticos"],ans:1,exp:"✅ 相辅相成 = complementar-se mutuamente. 相=mutuamente + 辅=auxiliar + 相=mutuamente + 成=completar. Os dois elementos se apoiam e completam reciprocamente. Ex: ciência e humanidades 相辅相成."},
    ] },

  { w:12, phase:"Simulado", emoji:"🏆", color:"#059669",
    theme:"Simulado Final HSK 5 + Estratégias de Prova Avançada",
    stats:{ words:"Vocabulário de alto nível HSK 5", grammar:"Estratégias HSK 5", chars:"Revisão final" },
    vocab:[
      {h:"言简意赅",py:"yán jiǎn yì gāi",pt:"conciso mas abrangente"},
      {h:"深入浅出",py:"shēn rù qiǎn chū",pt:"explicar o profundo de forma acessível"},
      {h:"旁征博引",py:"páng zhēng bó yǐn",pt:"citar amplamente diversas fontes"},
      {h:"鞭辟入里",py:"biān pì rù lǐ",pt:"análise penetrante e incisiva"},
      {h:"入木三分",py:"rù mù sān fēn",pt:"incisivo/profundo (como tinta que penetra a madeira)"},
      {h:"高屋建瓴",py:"gāo wū jiàn líng",pt:"visão panorâmica e estratégica (do alto)"},
      {h:"提纲挈领",py:"tí gāng qiè lǐng",pt:"capturar os pontos essenciais"},
      {h:"纲举目张",py:"gāng jǔ mù zhāng",pt:"com o essencial em ordem, os detalhes seguem"},
      {h:"条分缕析",py:"tiáo fēn lǚ xī",pt:"analisar sistematicamente ponto a ponto"},
      {h:"浑然天成",py:"hún rán tiān chéng",pt:"natural e perfeito/como obra da natureza"},
      {h:"妙笔生花",py:"miào bǐ shēng huā",pt:"escrita brilhante que floresce"},
      {h:"字字珠玑",py:"zì zì zhū jī",pt:"cada palavra é uma pérola/escrita preciosa"},
      {h:"掷地有声",py:"zhì dì yǒu shēng",pt:"palavras de peso que ressoam"},
      {h:"振聋发聩",py:"zhèn lóng fā kuì",pt:"despertar os que estavam surdos/alerta"},
      {h:"力透纸背",py:"lì tòu zhǐ bèi",pt:"força que penetra o papel/escrita poderosa"},
      {h:"语重心长",py:"yǔ zhòng xīn cháng",pt:"palavras carregadas de sentido/sincero"},
      {h:"意味深长",py:"yì wèi shēn cháng",pt:"rico em implicações/significado profundo"},
      {h:"耐人寻味",py:"nài rén xúnwèi",pt:"instigante/que convida à reflexão"},
    ],
    grammar:[
      { struct:"HSK 5 — Listening & Reading Estratégias", label:"Seção de Áudio e Leitura HSK 5", color:"#059669",
        exp:"HSK 5 Listening(100Q): textos muito mais longos, velocidade próxima da nativa. ① Identifique 成语 e conectivos formais. ② Questões de inferência(推断) são majoritárias. ③ Preste atenção em tonalidade(语气): 讽刺/ironias são frequentes. Reading: ① Textos acadêmicos reais. ② Identifique 主旨(tese principal) ANTES dos detalhes. ③ Vocabulário por contexto: não memorize isolado.",
        exs:[{cn:"作者的主要观点是什么？",py:"Zuòzhě de zhǔyào guāndiǎn shì shénme?",pt:"Qual é o ponto de vista principal do autor? (pergunta mais comum no reading HSK 5)"},{cn:"",py:"",pt:""}] },
      { struct:"HSK 5 Writing — 结构与风格", label:"Escrita HSK 5: Estrutura e Estilo", color:"#6366F1",
        exp:"Redação HSK 5: ① Use 成语 estrategicamente (1-2 por parágrafo, não force). ② Estrutura: 开篇破题(abertura direta)→论点分层(argumentos em camadas)→综上所述/归根结底(conclusão). ③ Varie os conectivos: não repita 因为/所以. Use: 归根结底, 有鉴于此, 据此, 鉴于, 综上所述, 一言以蔽之. ④ Máxima eficácia: 言简意赅.",
        exs:[{cn:"综上所述，鉴于科技伦理问题的复杂性，归根结底，建立以人为本、价值对齐为核心的治理框架，方是长治久安之道。",py:"Zōng shàng suǒ shù, jiànyú kējì lúnlǐ wèntí de fùzá xìng, guī gēn jiédǐ, jiànlì yǐ rén wéi běn, jiàzhí duìqí wéi héxīn de zhìlǐ kuàngjià, fāng shì chángzhì jiǔ'ān zhī dào.",pt:"Em suma, em vista da complexidade das questões éticas tecnológicas, em última análise, estabelecer um framework centrado no ser humano e com alinhamento de valores como núcleo é o caminho para a estabilidade duradoura."},{cn:"",py:"",pt:""}] },
      { struct:"Os 5 Padrões Mais Testados no HSK 5", label:"Padrões HSK 5 na Prova", color:"#D97706",
        exp:"① 纵观...全局，...（况且/再者）→ análise panorâmica multi-argumentada. ② 自...以来，...历经...仍然/依旧 → persistência histórica. ③ 鉴于...，据此/有鉴于此，... → análise → ação. ④ 归根结底/追根溯源，...（综上所述）→ análise de causa raiz + conclusão. ⑤ 与其说A，不如说B → reformulação sofisticada. Dominar estes 5 garante excelente desempenho na escrita HSK 5!",
        exs:[{cn:"自全球化兴起以来，文化认同危机历经数十年争论，依旧是当代最紧迫的社会议题。鉴于此，有鉴于此，归根结底需要的不是文化普遍主义，而是基于文明互鉴的包容性对话。",py:"Zì quánqiúhuà xīngqǐ yǐlái, wénhuà rèntóng wēijī lìjīng shùshí nián zhēnglùn, yījiù shì dāngdài zuì jǐnpò de shèhuì yìtí.",pt:"Desde o surgimento da globalização, a crise de identidade cultural, após décadas de debate, ainda é o tema social mais urgente da atualidade. Em vista disso, em última análise, o que é necessário não é o universalismo cultural, mas um diálogo inclusivo baseado no aprendizado mútuo entre civilizações."},{cn:"",py:"",pt:""}] },
    ],
    dialogue:[
      {sp:"A",cn:"HSK五级的写作和四级最大的区别是什么？",py:"HSK wǔ jí de xiězuò hé sì jí zuì dà de qūbié shì shénme?",pt:"Qual é a maior diferença entre a escrita do HSK 5 e do HSK 4?"},
      {sp:"B",cn:"一言以蔽之：层次感和语言的精炼程度。HSK五级要求言简意赅、旁征博引，并且能灵活运用成语和高级连词，使文章入木三分。",py:"Yī yán yǐ bì zhī: céng cì gǎn hé yǔyán de jīngliàn chéngdù.",pt:"Em uma palavra: profundidade argumentativa e requinte linguístico. O HSK 5 exige concisão com profundidade, citar amplamente diversas fontes, e usar 成语 e conectivos avançados de forma flexível, fazendo a redação ser penetrante."},
      {sp:"A",cn:"那如何在短时间内提升写作的条分缕析和高屋建瓴的感觉？",py:"Nà rúhé zài duǎn shíjiān nèi tíshēng xiězuò de tiáo fēn lǚ xī hé gāo wū jiàn líng de gǎnjué?",pt:"Como desenvolver rapidamente o senso de análise sistemática e visão panorâmica na escrita?"},
      {sp:"B",cn:"多读《人民日报》社论和学术论文，追根溯源地学习其结构。归根结底，鉴于HSK五级语料极具文学性，大量接触真实语料才是根本之道。厚积薄发，水到渠成！",py:"Duō dú Rénmín Rìbào shèlùn hé xuéshù lùnwén, zhuī gēn sùyuán de xuéxí qí jiégòu.",pt:"Leia extensivamente editoriais do Diário do Povo e artigos acadêmicos, rastreando à origem a estrutura deles. Em última análise, dado que o material do HSK 5 é altamente literário, expor-se em grande quantidade a materiais autênticos é o caminho fundamental. Acumule muito e o resultado vem naturalmente!"},
    ],
    quiz:[
      {q:"'言简意赅' (yán jiǎn yì gāi) — qual seria um conselho de redação baseado neste 成语?",opts:["escreva o máximo possível","use concisão: cubra muito com poucas palavras elegantes","use palavras simples e vocabulário básico","evite 成语 na redação"],ans:1,exp:"✅ 言简意赅 = conciso mas abrangente. 言简=linguagem concisa + 意赅=significado completo. Conselho de ouro para redações: não escreva verbosamente — cada frase deve carregar peso máximo de significado!"},
      {q:"深入浅出 (shēn rù qiǎn chū) é uma habilidade que consiste em:",opts:["estudar superficialmente","explicar conceitos profundos de forma acessível e clara","estudar muito antes de escrever","usar vocabulário muito avançado"],ans:1,exp:"✅ 深入浅出 = entrar profundo e sair de forma simples. A habilidade de explicar conceitos complexos de forma clara e acessível. O maior 成语 da comunicação eficaz — a essência do bom ensino e da boa escrita!"},
      {q:"入木三分 (rù mù sān fēn) descreve:",opts:["escrever lentamente","análise ou escrita penetrante que vai ao fundo das coisas","escrita superficial","texto muito longo"],ans:1,exp:"✅ 入木三分 = penetrar três centímetros na madeira. Origem: caligrafia de Wang Xizhi (王羲之) tão poderosa que a tinta penetrava a madeira. Hoje: análise/crítica/escrita INCISIVA e PENETRANTE que vai ao cerne."},
      {q:"旁征博引 (páng zhēng bó yǐn) significa:",opts:["usar apenas uma fonte","citar amplamente de diversas fontes/referências","evitar citações","citar apenas clássicos"],ans:1,exp:"✅ 旁征博引 = citar amplamente de diversas fontes. 旁=lateral/diverso + 征=invocar + 博=amplo + 引=citar. Estilo acadêmico que demonstra vasta erudição através de múltiplas referências. Qualidade valorizada no HSK 5+!"},
      {q:"高屋建瓴 (gāo wū jiàn líng) descreve qual tipo de pensamento?",opts:["pensamento detalhista","visão panorâmica e estratégica do alto","pensamento linear","pensamento histórico"],ans:1,exp:"✅ 高屋建瓴 = visão do alto do telhado, despejando água. Pensamento panorâmico e estratégico que vê o todo antes dos detalhes. Origem: derramar água de cima — irresistível e abrangente. Descreve líderes/analistas com visão macro."},
    ] },
];

export default function HSK5Completo() {
  const [week, setWeek] = useState(1);
  const [tab, setTab] = useState("vocab");
  const [showPy, setShowPy] = useState(true);
  const [openG, setOpenG] = useState(0);
  const [dlPy, setDlPy] = useState(true);
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const w = WEEKS[week-1], dc = w.color;
  const correct = Object.entries(answers).filter(([i,a])=>a===w.quiz[+i].ans).length;
  const answered = Object.keys(answers).length;
  const resetQuiz = ()=>{setAnswers({});setRevealed({});};

  return (
    <div style={{fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",background:sand,minHeight:"100vh",paddingBottom:"48px"}}>
      <div style={{background:"linear-gradient(135deg,#1e1b4b,#7C3AED,#a855f7)",color:"white",padding:"24px 20px 20px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <div style={{display:"flex",gap:"8px",marginBottom:"10px",flexWrap:"wrap"}}>
            <span style={{background:"#7C3AED",borderRadius:"6px",padding:"3px 12px",fontSize:"12px",fontWeight:"700"}}>🇨🇳 HSK 5 · Programa Completo</span>
            <span style={{background:"rgba(255,255,255,0.12)",borderRadius:"6px",padding:"3px 12px",fontSize:"12px",fontWeight:"600"}}>12 Semanas · ~1.071 novas palavras · Nível Literário-Acadêmico</span>
          </div>
          <h1 style={{margin:"0 0 14px",fontSize:"clamp(18px,3.5vw,26px)",fontWeight:"900"}}>老师 · HSK 5 — Todas as 12 Semanas</h1>
          <div style={{display:"flex",gap:"4px",overflowX:"auto",paddingBottom:"4px"}}>
            {WEEKS.map(wx=>(
              <button key={wx.w} onClick={()=>{setWeek(wx.w);setTab("vocab");resetQuiz();}}
                style={{padding:"7px 12px",borderRadius:"10px",border:"2px solid",borderColor:week===wx.w?"white":"rgba(255,255,255,0.2)",background:week===wx.w?"white":"transparent",color:week===wx.w?"#1e1b4b":"rgba(255,255,255,0.8)",fontWeight:"800",fontSize:"11px",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:"2px"}}>
                <span style={{fontSize:"14px"}}>{wx.emoji}</span>
                <span>S{wx.w}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{maxWidth:"900px",margin:"0 auto",padding:"0 16px"}}>
        <div style={{background:"white",borderRadius:"14px",padding:"14px 18px",margin:"14px 0 4px",border:"1px solid #E2E8F0",boxShadow:"0 2px 8px rgba(15,23,42,0.06)",borderLeft:`5px solid ${dc}`}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:"12px",flexWrap:"wrap"}}>
            <div style={{width:"46px",height:"46px",borderRadius:"12px",background:dc,color:"white",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <span style={{fontSize:"10px",fontWeight:"700",opacity:0.8}}>SEM</span>
              <span style={{fontSize:"20px",fontWeight:"900",lineHeight:1}}>{w.w}</span>
            </div>
            <div style={{flex:1}}>
              <div style={{display:"flex",gap:"8px",alignItems:"center",marginBottom:"3px",flexWrap:"wrap"}}>
                <span style={{fontWeight:"900",color:ink,fontSize:"15px"}}>{w.theme}</span>
                <span style={{fontSize:"11px",fontWeight:"700",color:dc,background:`${dc}12`,padding:"2px 8px",borderRadius:"10px"}}>{w.phase}</span>
              </div>
              <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
                {[["📖",w.stats.words],["📐",w.stats.grammar],["✍️",w.stats.chars]].map(([e,v])=>(
                  <span key={v} style={{fontSize:"11px",color:muted}}>{e} {v}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:"6px",padding:"8px 0 4px",overflowX:"auto"}}>
          {[["vocab","📚 Vocab"],["grammar","📐 Gramática"],["dialogue","💬 Diálogo"],["quiz","✏️ Quiz"]].map(([id,lbl])=>(
            <button key={id} onClick={()=>setTab(id)} style={{padding:"8px 16px",borderRadius:"9px",border:"2px solid",borderColor:tab===id?dc:bdr,background:tab===id?dc:"white",color:tab===id?"white":muted,fontWeight:"700",fontSize:"13px",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>{lbl}</button>
          ))}
        </div>
        {tab==="vocab"&&(
          <div style={{paddingTop:"14px"}}>
            <div style={{display:"flex",gap:"8px",marginBottom:"12px"}}>
              <button onClick={()=>setShowPy(v=>!v)} style={{padding:"6px 12px",borderRadius:"8px",border:`2px solid ${showPy?"#D97706":bdr}`,background:showPy?"#FFFBEB":"white",color:showPy?"#92400E":muted,fontWeight:"700",fontSize:"12px",cursor:"pointer"}}>{showPy?"🙈 Desafio":"👁 Pinyin"}</button>
              <span style={{fontSize:"12px",color:muted,alignSelf:"center"}}>{w.vocab.length} palavras</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(148px,1fr))",gap:"9px"}}>
              {w.vocab.map((wd,i)=>(
                <div key={i} style={{background:"white",borderRadius:"11px",padding:"10px 8px",textAlign:"center",boxShadow:"0 2px 8px rgba(15,23,42,0.07)",border:"1px solid #E2E8F0",borderTop:`3px solid ${dc}`}}>
                  <div style={{fontSize:"16px",fontWeight:"900",color:dc,fontFamily:"'Noto Sans SC','PingFang SC',sans-serif",marginBottom:"4px"}}>{wd.h}</div>
                  {showPy&&<div style={{fontSize:"11px",fontWeight:"700",color:"#6366F1",marginBottom:"2px"}}>{wd.py}</div>}
                  <div style={{fontSize:"11px",color:muted,lineHeight:"1.4"}}>{wd.pt}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="grammar"&&(
          <div style={{paddingTop:"14px"}}>
            {w.grammar.map((g,i)=>(
              <div key={i} style={{background:"white",borderRadius:"14px",overflow:"hidden",boxShadow:"0 2px 12px rgba(15,23,42,0.07)",border:"1px solid #E2E8F0",marginBottom:"10px"}}>
                <button onClick={()=>setOpenG(openG===i?-1:i)} style={{width:"100%",padding:"14px 18px",background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:"12px",textAlign:"left"}}>
                  <div style={{width:"4px",alignSelf:"stretch",borderRadius:"2px",background:g.color,flexShrink:0}}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:"11px",fontWeight:"700",color:g.color,textTransform:"uppercase",letterSpacing:"1px",marginBottom:"2px"}}>{g.label}</div>
                    <div style={{fontFamily:"monospace",fontWeight:"800",color:ink,fontSize:"13px",lineHeight:"1.4"}}>{g.struct}</div>
                  </div>
                  <span style={{color:muted,fontSize:"16px",transform:openG===i?"rotate(180deg)":"none"}}>▾</span>
                </button>
                {openG===i&&(
                  <div style={{padding:"0 18px 16px",borderTop:"1px solid #E2E8F0"}}>
                    <div style={{background:`${g.color}08`,border:`1px solid ${g.color}20`,borderRadius:"10px",padding:"12px 14px",margin:"10px 0",fontSize:"13px",color:"#334155",lineHeight:"1.7"}}>{g.exp}</div>
                    {g.exs.filter(e=>e.cn).map((ex,ei)=>(
                      <div key={ei} style={{borderLeft:`3px solid ${g.color}`,paddingLeft:"12px",marginBottom:"10px"}}>
                        <div style={{fontSize:"16px",fontWeight:"700",color:ink,fontFamily:"'Noto Sans SC',sans-serif",marginBottom:"3px"}}>{ex.cn}</div>
                        <div style={{fontSize:"12px",color:"#6366F1",fontWeight:"600",marginBottom:"2px"}}>{ex.py}</div>
                        <div style={{fontSize:"12px",color:muted}}>{ex.pt}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {tab==="dialogue"&&(
          <div style={{paddingTop:"14px"}}>
            <div style={{display:"flex",justifyContent:"flex-end",marginBottom:"10px"}}>
              <button onClick={()=>setDlPy(v=>!v)} style={{padding:"5px 10px",borderRadius:"7px",border:`2px solid ${dlPy?"#D97706":bdr}`,background:dlPy?"#FFFBEB":"white",color:dlPy?"#92400E":muted,fontWeight:"700",fontSize:"12px",cursor:"pointer"}}>{dlPy?"🙈":"👁"} Pinyin</button>
            </div>
            <div style={{background:"white",borderRadius:"14px",overflow:"hidden",boxShadow:"0 2px 12px rgba(15,23,42,0.07)",border:"1px solid #E2E8F0"}}>
              <div style={{background:dc,color:"white",padding:"12px 16px"}}><div style={{fontWeight:"800",fontSize:"14px"}}>💬 Diálogo — Semana {w.w} · {w.emoji} {w.phase}</div></div>
              {w.dialogue.map((line,i)=>{
                const isA=line.sp==="A";
                return (
                  <div key={i} style={{display:"flex",flexDirection:isA?"row":"row-reverse",gap:"10px",padding:"12px 14px",borderBottom:i<w.dialogue.length-1?"1px solid #E2E8F0":"none",background:i%2===0?"white":"#FAFAF8",alignItems:"flex-start"}}>
                    <div style={{width:"26px",height:"26px",borderRadius:"50%",background:isA?dc:"#94A3B8",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"800",fontSize:"11px",flexShrink:0}}>{line.sp}</div>
                    <div style={{flex:1,textAlign:isA?"left":"right"}}>
                      <div style={{fontSize:"15px",fontWeight:"700",color:ink,fontFamily:"'Noto Sans SC',sans-serif",marginBottom:"3px",lineHeight:"1.5"}}>{line.cn}</div>
                      {dlPy&&<div style={{fontSize:"12px",color:"#6366F1",fontWeight:"600",marginBottom:"2px"}}>{line.py}</div>}
                      <div style={{fontSize:"12px",color:muted}}>{line.pt}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {tab==="quiz"&&(
          <div style={{paddingTop:"14px"}}>
            {answered===w.quiz.length&&(
              <div style={{background:correct>=4?"#ECFDF5":"#FFFBEB",border:`2px solid ${correct>=4?"#059669":"#D97706"}`,borderRadius:"12px",padding:"16px",marginBottom:"14px",textAlign:"center"}}>
                <div style={{fontSize:"30px",marginBottom:"6px"}}>{correct===5?"🏆":correct>=3?"🎉":"💪"}</div>
                <div style={{fontWeight:"800",fontSize:"18px",color:correct>=4?"#065F46":"#92400E"}}>{correct}/5</div>
                <button onClick={resetQuiz} style={{marginTop:"10px",padding:"6px 16px",borderRadius:"8px",background:ink,color:"white",border:"none",fontWeight:"700",fontSize:"12px",cursor:"pointer"}}>🔄 Tentar novamente</button>
              </div>
            )}
            {w.quiz.map((q,i)=>{
              const sel=answers[i],rev=revealed[i];
              return (
                <div key={i} style={{background:"white",borderRadius:"12px",padding:"14px",border:"1px solid #E2E8F0",marginBottom:"10px",boxShadow:"0 2px 8px rgba(15,23,42,0.06)"}}>
                  <div style={{display:"flex",gap:"8px",marginBottom:"10px"}}>
                    <div style={{width:"22px",height:"22px",borderRadius:"6px",background:ink,color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"800",fontSize:"11px",flexShrink:0}}>{i+1}</div>
                    <div style={{fontSize:"13px",fontWeight:"700",color:ink,lineHeight:"1.5"}}>{q.q}</div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:"6px",marginBottom:"10px"}}>
                    {q.opts.map((opt,j)=>{
                      const chosen=sel===j,right=j===q.ans;
                      let bg="white",bc=bdr,col="#374151";
                      if(chosen||rev){if(right){bg="#ECFDF5";bc="#059669";col="#065F46";}else if(chosen){bg="#FEF2F2";bc="#DC2626";col="#991B1B";}}
                      return <button key={j} onClick={()=>{if(sel===undefined){setAnswers(a=>({...a,[i]:j}));setRevealed(r=>({...r,[i]:true}));}}} style={{padding:"8px 11px",borderRadius:"8px",border:`2px solid ${bc}`,background:bg,color:col,textAlign:"left",fontWeight:(chosen||(rev&&right))?"700":"500",fontSize:"12px",cursor:sel===undefined?"pointer":"default",display:"flex",alignItems:"center",gap:"8px"}}>
                        <span style={{width:"18px",height:"18px",borderRadius:"50%",border:`2px solid ${bc}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px",fontWeight:"800",flexShrink:0,background:(right&&rev)?"#059669":(chosen&&!right)?"#DC2626":"transparent",color:(right&&rev)||(chosen&&!right)?"white":col}}>
                          {rev?(right?"✓":chosen?"✗":String.fromCharCode(65+j)):String.fromCharCode(65+j)}
                        </span>{opt}
                      </button>;
                    })}
                  </div>
                  {rev&&<div style={{background:sel===q.ans?"#ECFDF5":"#FFFBEB",border:`1px solid ${sel===q.ans?"#6EE7B7":"#FDE68A"}`,borderRadius:"8px",padding:"8px 10px",fontSize:"12px",color:sel===q.ans?"#065F46":"#92400E",lineHeight:"1.6"}}>{q.exp}</div>}
                </div>
              );
            })}
            {answered<w.quiz.length&&<div style={{textAlign:"center",color:muted,fontSize:"12px",padding:"6px"}}>{answered}/{w.quiz.length} respondidas</div>}
          </div>
        )}
        <div style={{background:"white",border:"1px solid #E2E8F0",borderRadius:"12px",padding:"12px 16px",marginTop:"16px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"10px"}}>
          <button onClick={()=>{if(week>1){setWeek(w=>w-1);setTab("vocab");resetQuiz();}}} style={{padding:"7px 14px",borderRadius:"9px",border:"2px solid #E2E8F0",background:"white",color:muted,fontWeight:"700",fontSize:"12px",cursor:"pointer",opacity:week===1?0.3:1}}>← Anterior</button>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:"13px",fontWeight:"800",color:ink}}>Semana {week} / 12</div>
            <div style={{fontSize:"11px",color:muted}}>{w.phase} · {w.emoji}</div>
          </div>
          <button onClick={()=>{if(week<12){setWeek(w=>w+1);setTab("vocab");resetQuiz();}}} style={{padding:"7px 14px",borderRadius:"9px",border:`2px solid ${dc}`,background:dc,color:"white",fontWeight:"700",fontSize:"12px",cursor:"pointer",opacity:week===12?0.3:1}}>Próxima →</button>
        </div>
        {week===12&&(
          <div style={{background:"linear-gradient(135deg,#1e1b4b,#7C3AED,#a855f7)",color:"white",borderRadius:"14px",padding:"24px",marginTop:"14px",textAlign:"center"}}>
            <div style={{fontSize:"40px",marginBottom:"10px"}}>🏆</div>
            <div style={{fontWeight:"900",fontSize:"20px",marginBottom:"8px"}}>HSK 5 — 恭喜完成！</div>
            <div style={{opacity:0.8,fontSize:"14px",lineHeight:"1.8",marginBottom:"12px"}}>
              12 semanas · ~1.071 novas palavras · Nível literário-acadêmico<br/>
              博学多才，继续前行！Bó xué duō cái, jìxù qián xíng!
            </div>
            <div style={{fontSize:"20px",fontWeight:"900",color:"#FCD34D"}}>迈向HSK 6，登峰造极！💪</div>
          </div>
        )}
      </div>
    </div>
  );
}
