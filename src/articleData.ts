// Unit 1 文章数据 - 按篇章分组，每篇包含标题和段落
export interface ArticleParagraph {
  english: string;
  chinese: string;
}

export interface ArticleSection {
  title: string;
  subtitle: string;
  paragraphs: ArticleParagraph[];
}

export const unit1Article = {
  sections: [
    {
      title: "篇章一：History, Monarchy & Cultural Legacy",
      subtitle: "历史、王权与文化遗产",
      paragraphs: [
        {
          english: `The history of human civilization is deeply shaped by the rule of the emperor and the power of the royal family, where a regent would often take the throne during a monarch's minority, upholding traditional systems of governance that have lasted for centuries. Many ancient dynasties, once prosperous and powerful, left behind magnificent palaces topped with a golden crown emblem, grand ceremony halls, and philosophical texts that still guide modern thought. The philosophy of these ancient societies often centered on the pursuit of eternal peace and harmony, with strict social hierarchy that defined every person's role in the community.`,
          chinese: `人类文明的历史，深受皇帝的统治与王室权力的深刻塑造，在君主年幼时，摄政者往往会执掌王权，维护延续了数百年的传统治理体系。许多曾经繁荣强盛的古老王朝，留下了顶部饰有金色王冠徽章的宏伟宫殿、庄严肃穆的典礼大厅，以及至今仍在指引现代思想的哲学典籍。这些古代社会的哲学，往往以追求永恒的和平与和谐为核心，辅以严格的社会等级制度，界定了社群中每个人的角色。`
        },
        {
          english: `Archaeologists today continue to excavate ancient sites across the globe, working to preserve fragile relics that would otherwise be lost to time. Their effort to uncover the past has revealed that even the most powerful empires were not immune to decline, often due to a lack of effective governance or external invasion. Nevertheless these ruins remain a testament to human ingenuity, and experts argue that protecting these sites is critical to understanding our collective history. Many nations now hold special events to celebrate their cultural heritage, with inspiring exhibitions that bring ancient history to life for modern audiences.`,
          chinese: `如今，全球的考古学家仍在不断挖掘古代遗址，致力于保护那些随时光流逝濒临消亡的脆弱文物。他们揭开历史面纱的努力向我们揭示，即便是最强大的帝国，也难逃衰落的命运，其原因往往是有效治理的缺失，或是外来的入侵。然而，这些遗址始终是人类创造力的见证，专家们主张，保护这些遗址对于理解我们的集体历史至关重要。如今，许多国家都会举办特别活动颂扬并庆祝自身的文化遗产，通过鼓舞人心的展览，为现代观众鲜活地再现古代历史。`
        }
      ]
    },
    {
      title: "篇章二：Environment, Energy & Agricultural Science",
      subtitle: "环境、能源与农业科学",
      paragraphs: [
        {
          english: `As the global population burgeon at an unprecedented rate, the agricultural sector faces mounting pressure to meet food demand while protecting the environment. Across thousands of hectare of farmland, farmers are adopting sustainable practices to boost crop yield without degrading soil health, while reducing emissions of methane from livestock, a potent greenhouse gas. The density of livestock in industrial farms has been linked to a host of environmental issues, including water pollution and soil degradation, nevertheless many nations are slow to enforce stricter regulations.`,
          chinese: `随着全球人口以前所未有的速度快速增长，农业部门在保护环境的同时满足粮食需求的压力与日俱增。在数千公顷的农田上，农民们正在采用可持续的耕作方式，在不破坏土壤健康的前提下提高作物产量，同时减少牲畜排放的强效温室气体甲烷。工业化农场的牲畜养殖密度，与水污染、土壤退化等一系列环境问题密切相关，然而许多国家在执行更严格的法规方面行动迟缓。`
        },
        {
          english: `The global energy transition is also a core topic of environmental debate, with nations split between investing in nuclear power, renewable energy, and fossil fuels. Electrical and electronic systems now power nearly every aspect of modern life, from home ventilation systems to industrial manufacturing, making the shift to clean energy more critical than ever. Oil spills from offshore drilling rig can cause catastrophic damage, as toxic chemicals seep into coastal waters, leaving a lingering odour of pollution and destroying marine ecosystems. Even small, slight changes to environmental policy can have massive long-term impacts, as seen in the recovery of forests once threatened by deforestation.`,
          chinese: `全球能源转型也是环境辩论的核心议题，各国在投资核能、可再生能源与化石燃料之间分歧显著。如今，从家用通风系统到工业制造，电气与电子系统几乎为现代生活的方方面面提供动力，这使得向清洁能源的转型变得前所未有的重要。海上钻井平台的石油泄漏会造成灾难性的破坏，有毒化学物质会渗漏到沿海水域，留下挥之不去的污染气味，摧毁海洋生态系统。即便是对环境政策做出微小的调整，也能产生巨大的长期影响，正如曾经面临砍伐威胁的森林实现了生态恢复所印证的那样。`
        }
      ]
    },
    {
      title: "篇章三：Society, Education & Human Behaviour",
      subtitle: "社会、教育与人类行为",
      paragraphs: [
        {
          english: `A fair society is built on the principles of equity and mutual respect, where every individual has access to the support they need to thrive. For young people, guidance from educators and family members is critical to their development, helping them build the skills to navigate complex social hierarchy and develop strong leadership skills. An easy-going learning environment, rather than a rigid one, has been shown to boost student attendance and engagement, while reducing the risk of chronic stress and anxiety.`,
          chinese: `一个公平的社会，建立在公平与相互尊重的原则之上，在这里，每个人都能获得成长所需的支持。对于年轻人而言，教育者与家人的指引对他们的成长至关重要，能帮助他们掌握驾驭复杂社会层级的能力，培养强大的领导能力。事实证明，相较于刻板的学习环境，随和包容的学习氛围能提升学生的出勤率与参与度，同时降低慢性压力与焦虑的风险。`
        },
        {
          english: `Modern education systems now offer a wide variety of optional courses, from intermediate language classes to advanced science programs, which enable students to explore their interests and build specialized skills. The core purpose of education is not just to impart knowledge, but to nurture critical thinking and emotional maturity, helping young people understand the social impacts of immigration and migration in an increasingly globalized world. Research has explored the complex interplay between genetic factors and environmental influences on human behaviour, showing that while biology plays a role, daily routine and social context shape most of our actions. Similarly, studies have found that strong social bonds can reduce the risk of mental health issues, even for those facing significant hardship.`,
          chinese: `如今的现代教育体系提供了丰富多样的选修课程，从中级语言班到高阶科学项目应有尽有，这使学生能够探索自身兴趣，培养专业技能。教育的核心目的，不仅是传授知识，更是培养批判性思维与情感成熟度，帮助年轻人理解在日益全球化的世界中，移民与人口迁徙带来的社会影响。相关研究探索了基因因素与环境影响对人类行为的复杂相互作用，结果表明，尽管生物学因素有一定影响，但日常惯例与社会环境塑造了我们的绝大多数行为。同样地，研究发现，即便是面对重大困境的人，牢固的社会联结也能降低其出现心理健康问题的风险。`
        }
      ]
    },
    {
      title: "篇章四：Business, Economy & Urban Development",
      subtitle: "商业、经济与城市发展",
      paragraphs: [
        {
          english: `The modern global economy is driven by the complex interplay between large consortium, small businesses, and individual consumer, whose choices shape every sector of the market. A core point of debate in economic policy is the balance between fair wage for workers and corporate profitability, with many workers arguing that their pay has not kept pace with the massive rise in living costs. Companies that fail to offer fair working conditions forfeit the trust of their employees and customers, often leading to long-term financial losses.`,
          chinese: `现代全球经济，由大型财团、中小企业与个体消费者之间复杂的相互作用所驱动，消费者的选择塑造了市场的每一个领域。经济政策辩论的一个核心要点，是工人的公平工资与企业盈利能力之间的平衡，许多工人认为，他们的薪资涨幅未能跟上生活成本的大幅上涨。未能提供公平工作条件的企业，会丧失员工与客户的信任，往往会导致长期的经济损失。`
        },
        {
          english: `The food and beverage industry is a key example of these dynamics, with brands competing to offer products that meet consumer demand for low calorie options, sustainable sourcing, and authentic flavours. Regional brands often struggle to compete with multinational corporations, nevertheless many have found success by focusing on local culture and unique product offerings. To secure a competitive edge, companies invest substantial amounts of input into research and development, rather than relying merely on marketing tactics. Many brands now use customer questionnaire to gather feedback, adjusting their products to align with consumer needs and viewpoint.`,
          chinese: `食品饮料行业是这种动态的典型例证，各大品牌竞相推出满足消费者需求的产品，包括低卡路里选项、可持续采购原料与正宗风味。区域性品牌往往难以与跨国企业竞争，然而许多品牌通过聚焦本土文化与独特的产品定位，取得了成功。为了获得竞争优势，企业会在研发中投入大量的资源投入，而非仅仅依赖营销策略。如今，许多品牌通过客户问卷收集反馈，调整产品以契合消费者的需求与观点。`
        },
        {
          english: `The rise of digital commerce has further transformed the market, with brands using unique code for online discounts, and a series of targeted marketing campaigns to reach new customers. Frequent variation in consumer trends can complicate long-term business planning, as brands must adapt quickly to shifting demand. Companies often review their sales data weekly to identify gaps in the market, and will reject any product that fails to meet quality standards. Many businesses also face criticism for the fabrication of misleading advertising claims, which regulators are working to crack down on. Even small distraction from core business goals can reduce profit margin, so leaders must stay focused on their core mission. Many companies also seek to sponsor local community events, which can boost brand loyalty and justify their investment in corporate social responsibility. Close cooperation between departments is also critical to a company's success, ensuring that every team is aligned on shared goals.`,
          chinese: `数字商务的兴起进一步改变了市场格局，品牌会使用专属代码提供线上折扣，并通过一系列精准的营销活动触达新客户。消费趋势的频繁变动会使长期商业规划复杂化，品牌必须快速适应不断变化的市场需求。企业通常会每周复盘销售数据，寻找市场空白，同时会拒收任何不符合质量标准的产品。许多企业还因捏造具有误导性的广告宣传而受到批评，监管机构正着力打击此类行为。即便是微小的干扰，让企业偏离核心商业目标，也会压缩利润空间，因此管理者必须始终聚焦核心使命。许多企业还寻求赞助当地社区活动，这能提升品牌忠诚度，也能为其在企业社会责任上的投入正名。部门之间的密切合作，对企业的成功同样至关重要，能确保所有团队都围绕共同目标协同发力。`
        }
      ]
    },
    {
      title: "篇章五：Science, Medicine & Technology",
      subtitle: "科学、医学与技术",
      paragraphs: [
        {
          english: `Modern science is built on the pursuit of exact and accurate data, with researchers working to uncover the fundamental laws that govern the natural world. In the field of medicine, physician rely on advanced technology to diagnose chronic illnesses and rare genetic conditions, developing treatments that can heal damaged tissues and improve patient outcomes. Medical research has shown that no single group is superior to another in terms of biological resilience, and that equal access to healthcare is a critical determinant of public health outcomes across the globe.`,
          chinese: `现代科学建立在对精确的、准确的数据的追求之上，研究人员致力于揭示支配自然界的基本定律。在医学领域，内科医师依靠先进技术诊断慢性疾病与罕见遗传病，开发能够治愈受损组织、改善患者预后的治疗方案。医学研究表明，在生物恢复力方面，没有任何一个群体优于另一个群体，而平等的医疗获取机会，是全球公共健康水平的关键决定因素。`
        },
        {
          english: `Ophthalmology, the study of eye health, has seen remarkable advances in recent decades, with researchers learning more about how the iris regulates light intake, and how even small damage to the eye can impact vision. The term "visual acuity" is used to denote the sharpness of a person's vision, which can be affected by a range of factors, from genetic conditions to environmental damage. Similarly, in the field of physics, researchers are exploring the limits of nuclear energy and quantum mechanics, using advanced electronic sensors to measure phenomena that are invisible to the naked eye.`,
          chinese: `近几十年来，眼健康研究领域的眼科学取得了显著进展，研究人员对虹膜如何调节光线摄入、即便是眼部的微小损伤如何影响视力，有了更深入的了解。"视敏度"这一术语，用于表示人的视觉清晰度，它会受到一系列因素的影响，从遗传性疾病到环境损伤不一而足。同样地，在物理学领域，研究人员正在探索核能与量子力学的边界，使用先进的电子传感器测量肉眼不可见的现象。`
        },
        {
          english: `The sustainable use of resource is a core focus of modern scientific research, as the entire planet faces the threat of climate change. Scientists work to develop technologies that reduce waste, improve energy efficiency, and protect fragile ecosystems, while also addressing the social factors that drive environmental harm. Physical health and environmental health are deeply interconnected, with research showing that exposure to pollution can cause a range of chronic illnesses, from respiratory disease to heart conditions. Nevertheless, advances in science and technology offer hope for a more sustainable future, as long as nations are willing to collaborate and invest in evidence-based solutions.`,
          chinese: `随着整个地球面临气候变化的威胁，资源的可持续利用成为现代科学研究的核心焦点。科学家们致力于开发减少浪费、提升能源效率、保护脆弱生态系统的技术，同时解决导致环境破坏的社会因素。身体健康与环境健康深度关联，研究表明，接触污染物会引发一系列慢性疾病，从呼吸系统疾病到心脏病均在此列。然而，只要各国愿意开展合作，投资于循证解决方案，科技的进步就能为更可持续的未来带来希望。`
        }
      ]
    },
    {
      title: "篇章六：Daily Life, Travel & Leisure",
      subtitle: "日常生活、旅行与休闲",
      paragraphs: [
        {
          english: `Daily life is filled with small, meaningful moments that shape our well-being, from sharing a home-cooked curry with friends to exploring the natural landscape of a new city. Many people rely on a van to transport camping gear for weekend trips, or take a tram to explore the city centre, stopping at a local café to read a monthly newsletter or a literary periodical. When checking into a hotel, a friendly receptionist will often provide information about local attractions, while security staff work to ensure guests feel safe during their stay.`,
          chinese: `日常生活充满了塑造我们幸福感的微小而有意义的瞬间，从和朋友分享家常咖喱饭，到探索一座新城市的自然景观，皆是如此。许多人会依靠厢式货车运输周末露营的装备，或是乘坐有轨电车探索市中心，在当地的咖啡馆驻足，阅读月度时事通讯或是文学期刊。入住酒店时，友善的接待员通常会提供当地景点的相关信息，而安保人员则会全力保障客人入住期间的安全。`
        },
        {
          english: `Travel is one of the most popular forms of leisure, with people flocking to coastal resort towns, mountain summit hiking trails, and zoological parks to see exotic animals like the crocodile. Many travellers still use traditional roll film cameras to capture their journeys, preferring the warm, authentic look of film photos over digital images. When exploring a new place, even a chink of light through an old stone wall can feel magical, and a tender conversation with a local can leave a lasting impression. To ensure a smooth trip, many travellers book accommodation in advance, and keep a clip of their passport and travel documents in a separate bag.`,
          chinese: `旅行是最受欢迎的休闲方式之一，人们纷纷涌向海滨度假胜地、通往山巅峰顶的徒步路线，以及动物学主题公园，观赏鳄鱼等异域动物。许多旅行者仍在使用传统的胶卷相机记录旅途，相较于数码照片，他们更偏爱胶片照片温暖、真实的质感。探索一个新地方时，即便是从古老石墙缝隙中透进来的一缕光，也能充满魔力，而和当地人一次温柔的交谈，也会留下长久的印象。为了确保旅途顺利，许多旅行者会提前预订住宿，并把护照与旅行证件的复印件用夹子夹好，放在单独的包里。`
        },
        {
          english: `Leisure activities also play a critical role in mental health, helping people process complex emotion and escape the stress of daily work. Many people play squash at their local sports centre, while others join a choir or take art classes to nurture their creativity. Urban development is advancing apace, with new parks and community spaces being built to give residents places to relax and connect. Even simple household tasks, like sweeping the floor with a broom or tightening the buckle on a backpack, can bring a sense of calm and routine to a busy day.`,
          chinese: `休闲活动对心理健康也起着至关重要的作用，能帮助人们梳理复杂的情绪，逃离日常工作的压力。许多人会在当地的体育中心打壁球，还有人会加入合唱团、参加艺术课程，培养自己的创造力。城市发展正飞速推进，新的公园与社区空间不断落成，为居民提供放松与社交的场所。即便是简单的家务，比如用扫帚扫地，或是拧紧背包上的搭扣，也能给忙碌的一天带来平静与秩序感。`
        },
        {
          english: `In the professional world, many people perform daily tasks from a home office, download work files, and refer to industry guidelines to complete their work. Job seekers will often prepare extensively for an interview, researching the company and practicing their answers to common questions. The extent to which remote work has become mainstream has surprised many industry experts, with many companies now offering hybrid work models. In emergency situations, such as floods or fires, local authorities will evacuate residents from at-risk areas, often building temporary embankment to hold back rising water.`,
          chinese: `在职场中，许多人在家办公完成日常工作，下载工作文件，查阅行业准则来完成工作任务。求职者通常会为面试做充分的准备，调研公司情况，练习常见问题的回答。远程办公成为主流的程度，让许多行业专家都感到意外，如今许多公司都提供混合办公模式。在洪水、火灾等紧急情况下，地方当局会将居民从危险区域疏散，通常会修建临时堤防来阻挡上涨的水位。`
        },
        {
          english: `Social dynamics also shape our daily interactions, from casual conversations with friends to formal meetings with colleagues. Many people struggle to persuade their friends to try a new activity, while others enjoy a friendly bet on the outcome of a sports game. A detective story or a true crime podcast can be a thrilling form of entertainment, while a stamp collection or a whistle from a passing train can bring back nostalgic memories. Many people occupy their free time with volunteer work, helping to address youth delinquency or support new immigrants settling into the country.`,
          chinese: `社交动态也塑造着我们的日常互动，从和朋友的闲聊，到与同事的正式会议，无一例外。许多人很难说服朋友尝试一项新活动，而另一些人则喜欢就体育赛事的结果进行友好的打赌。侦探小说或是真实罪案播客，是一种极具吸引力的娱乐方式，而邮票收藏，或是路过火车的鸣笛声，都能唤起怀旧的回忆。许多人会用空闲时间投身志愿工作，助力解决青少年不良行为问题，或是帮助新移民适应本国生活。`
        },
        {
          english: `The way we communicate is also shaped by subtle social cues, from subliminal signals in body language to the implication of a casual comment. A deliberate pause in a conversation can convey more meaning than words, while a sincere pardon can resolve a misunderstanding. In politics and diplomacy, an ambassador from one country will meet with leaders of another to build mutual trust and resolve conflicts. In competitive settings, from sports to politics, a decisive move can help a candidate defeat their opponent, while a fair competition is always the most respected. These small moments of connection and competition epitomise the full richness of human life, which can barely be captured in a single story. A surge of joy from a shared win, or the comfort of a loyal companion during hard times, are the moments that make life meaningful. Even those who are overweight or facing health challenges can find joy in these small moments, with support from friends and family. We often set a stint on our work hours to make time for these meaningful moments, ensuring that we do not let work take over our entire lives. When we congratulate a friend on their success, or help a stranger in need, we build a more compassionate and connected world.`,
          chinese: `我们的沟通方式，也受到微妙社交线索的塑造，从肢体语言中潜意识的信号，到一句随口评论背后的隐含意义，皆是如此。对话中一次刻意的停顿，能比语言传递更多的含义，而一句真诚的抱歉，请再说一遍，能化解一场误会。在政治与外交领域，一国的大使会与另一国的领导人会面，建立相互信任，解决冲突。在从体育到政治的竞技场景中，一个决定性的举动，能帮助候选人击败对手，而公平的竞争永远最受尊重。这些联结与竞技的微小瞬间，集中体现了人类生活的全部丰富性，这是一个故事几乎无法完整呈现的。共同胜利带来的喜悦翻涌，或是艰难时刻里忠诚同伴的慰藉，才是让生命有意义的瞬间。即便是超重的人、或是面临健康挑战的人，也能在亲友的支持下，从这些微小的瞬间中找到快乐。我们常常为工作时长设定限额，为这些有意义的瞬间留出时间，确保不会让工作占据我们全部的生活。当我们为朋友的成功道贺，或是向需要帮助的陌生人伸出援手时，我们就在构建一个更具同理心、联结更紧密的世界。`
        }
      ]
    }
  ] as ArticleSection[]
};

// 为了保持向后兼容，提供paragraphs数组
export const unit1ArticleLegacy = {
  paragraphs: unit1Article.sections.flatMap(s => s.paragraphs)
};

// Unit 2 文章数据 - 按篇章分组，每篇包含标题和段落
export const unit2Article = {
  sections: [
    {
      title: "篇章一：Environmental Science & Marine Biology",
      subtitle: "自然环境与海洋生物",
      paragraphs: [
        {
          english: `The actual biological diversity of our planet is astonishing, particularly in submarine environments. Near the equator, ecosystems thrive, but they often suffer from human impact. At the intersection of different ocean currents, the local fauna tends to overlap. Scientists can deduce the health of these areas by studying an organic mechanism within a specific marine vertebrate, examining its intestine for toxins. A leak of chemicals from a deep-sea spring can release a harmful ion into the water.`,
          chinese: `地球上实际的生物多样性令人惊叹，特别是在水底的环境中。在赤道附近，生态系统繁荣发展，但它们经常遭受人类活动的影响。在不同洋流的"十字路口"（交汇处），当地的动物往往会部分重叠。科学家可以通过研究特定海洋脊柱动物体内的有机机制，检查其肠道中的毒素，来推断这些地区的健康状况。深海泉水的化学物质泄露会将有害离子释放到水中。`
        },
        {
          english: `Coastal erosion leaves the rocks bare and covered in silt. Researchers use a long hose to clear the debris. To survive the absolute darkness and an occasional earthquake, creatures develop a striking outward appearance, such as a leopard pattern or a slender body resembling a feather. These animals demonstrate an incredible ability to withstand their harsh surroundings. By giving the ocean a regular check-up, experts can forecast environmental changes with great precision. This is a typical example of the general range of a habitat's potential.`,
          chinese: `海岸的腐蚀使岩石变得光秃并覆盖着淤泥。研究人员使用长软管来清理碎屑。为了在绝对的黑暗和偶尔的地震中生存，生物进化出了显著的表面外观，比如豹纹或像羽毛一样修长的身体。这些动物展示了抵挡恶劣环境的难以置信的能力。通过对海洋进行定期的检查，专家可以非常精确地预测环境变化。这是栖息地普遍潜能范围的一个典型例子。`
        }
      ]
    },
    {
      title: "篇章二：Business, Psychology & Society",
      subtitle: "现代商业、职场与社会",
      paragraphs: [
        {
          english: `In today's commercial world, securing an internship is almost compulsory for young graduates. However, a recent survey revealed that a respondent often feels treated as a mere substitute. The pursuit of profit sometimes comes at the expense of employee well-being. This lack of clear exchange between staff and an administrator can impede progress and create disharmony.`,
          chinese: `在当今的商业世界中，获得实习身份对年轻毕业生来说几乎是强制性的。然而，最近的一项调查显示，调查对象经常感到自己只是被当作代替者。对利润的追求有时是以牺牲员工福祉为代价的。员工与管理人员之间缺乏清晰的交流会阻碍进展并造成不和谐。`
        },
        {
          english: `When colleagues disagree, it is essential to foster an inclusive environment. If workers have a reservation, a reasonable manager should address it rather than letting it escalate into a dispute or even a strike. To strengthen the team, the standard approach is not to rely exclusively on a workaholic culture. While industrious employees are valued, internal stress is a problem that should bother every leader.`,
          chinese: `当同事们不同意（产生分歧）时，营造一个包容广阔的环境至关重要。如果员工有保留意见，合理的管理者应该解决它，而不是让它升级为争端甚至罢工。为了巩固团队，标准的做法是不应专门依赖工作狂文化。虽然勤奋的员工很有价值，但内部压力是一个应该烦扰每位领导者的问题。`
        },
        {
          english: `A divisional head might manage a massive consignment in a way that runs counter to traditional convention. This unique concept often requires the company to invest in a counsellor to help staff achieve their ultimate ambition. To minimise wastage, leaders must regulate resources with careful discretion.`,
          chinese: `部门主管可能会以一种与传统惯例相反的方式来管理一大批托运的货物。这种独一无二的概念通常需要公司投资聘请顾问，以帮助员工实现他们最终的雄心。为了使损耗降到最低，领导者必须谨慎地控制资源。`
        },
        {
          english: `After a brief preparation, an ambitious committee might recruit a new representative or their overseas counterpart. If the finance department's comparative data shows losses, the CEO may need to reverse earlier decisions or ultimately resign. Consequently, sound judgment is crucial, and managers cannot remain ignorant or unaware of purely theoretical risks, ignoring voluntary feedback.`,
          chinese: `经过简短的准备后，一个有野心的委员会可能会招募一名新代表或其海外地位相当的人。如果财政部门的比较数据显示亏损，首席执行官可能需要撤销（颠倒）早先的决定，或者最终辞职。因此，良好的判断力至关重要，管理者不能对纯理论的风险保持无知或未意识到，也不能无视自愿的反馈。`
        }
      ]
    },
    {
      title: "篇章三：Literature, History & Daily Life",
      subtitle: "文学、历史与日常生活",
      paragraphs: [
        {
          english: `When studying the legacy of human culture, an anthropologist might read ancient literature or examine a historical transcript. Achieving a doctorate requires one to dedicate years to writing a detailed essay. Some ancient practices, like astrology, may seem like an illusion to us now, but they used to represent early attempts to understand the universe.`,
          chinese: `在研究人类文化的遗产时，人类学家可能会阅读古代文献或检查历史文字记录。要在该领域获得博士学位，需要献身数年撰写详细的评论文。一些古老的实践，如占星学，现在对我们来说似乎是一种错觉，但它们曾经代表了人类理解宇宙的早期尝试。`
        },
        {
          english: `Historically, life was far from the cosset we experience today. A humble abode lacked modern furniture or a refrigerator. To attain a comfortable life, a couple had to mould their environment using a rudimentary instrument made of brass. They didn't have a modern gadget or a light bulb to simplify their tasks. A pirate operating from a remote outpost faced even harsher conditions.`,
          chinese: `在历史上，生活远非我们今天所体验的溺爱。简陋的住所缺乏现代家具或冰箱。为了获得舒适的生活，夫妇俩必须使用由黄铜制成的粗糙工具来塑造他们的环境。他们没有现代的小玩意或灯泡来简化任务。在偏远村落（前哨）活动的海盗面临着更加严酷的条件。`
        },
        {
          english: `Today, we include many conveniences in our routines. During our leisure, we might entertain ourselves with a crossword, watch a performer on a trapeze, or take a luxurious cruise. We might tune a radio or use a medical device and a tablet to manage cardiovascular health. Everyday habits, like using a comb, needing to shave, or visiting a lavatory, are straightforward. However, packing luggage can still induce a state of muddle and irritation, especially if an emergency forces us to fold clothes quickly. To minimise stress, we must prepare suitably.`,
          chinese: `今天，我们的日常生活中包含许多便利设施。在空闲时间，我们可能会通过玩纵横填字游戏、观看高空秋千上的表演者或参加豪华的航游来使自己娱乐。我们可能会调节收音机，或使用医疗装置和药片来管理心血管健康。日常习惯，如使用梳子、需要修面或去盥洗室，都非常简单。然而，为旅行打包行李仍然会引起一团糟和恼怒的状态，特别是如果突发事件迫使我们迅速折叠衣服。为了将压力减到最低限度，我们必须合适地进行准备。`
        },
        {
          english: `Some historical ideas are ambiguous and their true meanings vanish over time. A scholar might quote a text, but if the words are not pronounceable, it creates a barrier. The notion of the atomic age didn't originate in a student dorm but through imaginative scientific mastery. Sometimes, old ideas are deemed decrepit and academics expel or exile them from modern thought, removing the gloss of the past. Yet, whether attending a lecture or watching a bird flap its wings, the incredible world never ceases to amaze, even if it strains our eyesight to take it all in.`,
          chinese: `一些历史观念是模棱两可的，它们的真正含义随着时间突然消失。学者可能会引用一段文本，但如果这些词不可发音，就会产生障碍。原子时代的观念并非起源于学生宿舍，而是通过富有想象力的科学精通。有时，旧思想被认为是破旧的，学者们将它们从现代思想中驱逐或流放，剥去了过去的假象。然而，无论是听演讲还是观察鸟儿拍打翅膀，这个难以置信的世界永远令人惊叹，即使它使我们的视力紧张以至于难以看清一切。`
        }
      ]
    }
  ] as ArticleSection[]
};

// 为了保持向后兼容，提供paragraphs数组
export const unit2ArticleLegacy = {
  paragraphs: unit2Article.sections.flatMap(s => s.paragraphs)
};
