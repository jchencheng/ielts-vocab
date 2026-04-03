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

// Unit 1 - Chapter-1 自然地理 - Part 1
export const unit1Article = {
  sections: [
    {
      title: "Theme 1: The Earth's Structure and Geological Foundations",
      subtitle: "地球的结构与地质基础",
      paragraphs: [
        {
          english: `Our planet is a complex system comprising the atmosphere, the water-rich hydrosphere, and the solid lithosphere. Deep beneath the surface lies the dense core, surrounded by the semi-liquid mantle, which is encased by the rigid crust. The air we breathe contains vital oxygen, while various chemical reactions produce hydrogen, every kind of oxide, and greenhouse gases like carbon dioxide. The geological makeup is fascinating. From a tiny pebble to vast reserves of precious ore, the earth is rich in every mineral. Rocks vary greatly, including metamorphic marble, crystalline quartz, and hard granite. Certain minerals even act as a natural magnet. However, the earth is restless. Under extreme thermodynamic pressure, a volcano may violently erupt, releasing molten magma. Similarly, shifting plates cause an earthquake, generating immense seismic waves.`,
          chinese: `我们的星球是一个复杂的系统，由大气层、富含水的水圈和坚固的岩石圈组成。在地表深处是致密的地核，周围环绕着半流体的地幔，而包裹地幔的则是坚硬的地壳。我们呼吸的空气含有至关重要的氧气，同时各种化学反应会产生氢气、各种氧化物以及如二氧化碳等温室气体。这里的地质构成令人着迷。从微小的鹅卵石到大量珍贵的矿石储量，地球富含各种矿物质。岩石的种类差异很大，包括变质的大理石、结晶的石英和坚硬的花岗岩。某些矿物甚至具有天然磁铁的作用。然而，地球也是躁动不安的。在极端的极大热力学压力下，火山可能会剧烈喷发，释放出熔化的岩浆。同样地，板块的移动会引发地震，产生巨大的地震波。`
        }
      ]
    },
    {
      title: "Theme 2: Geographical Coordinates and Diverse Landforms",
      subtitle: "地理坐标与多样的地貌",
      paragraphs: [
        {
          english: `To navigate our vast globe, scientists use an imaginary grid of longitude and latitude. The Earth rotates on its axis, divided into the Northern and Southern hemisphere by the equator. At extreme ends lie the North pole and South Pole, regions known for their harsh polar environments. Here, the arctic and Antarctic regions are covered in ice. Looking toward the horizon, one can observe diverse terrain. The Earth's landscape varies significantly by altitude. Across every major continent—from Eurasia to the remote islands of Oceania—and projecting from the mainland to any coastal peninsula, nature's variety is astounding. You might find a hidden cave carved into a towering cliff, or a massive glacier slowly carving valleys. Low-lying areas feature muddy swamp environments, a fertile river delta, or a vast, flat plain. In contrast, high elevations form a majestic plateau, while arid regions may unexpectedly conceal a lush oasis.`,
          chinese: `为了在广阔的地球上导航，科学家们使用经度和纬度构成的假想网格。地球绕着它的轴旋转，被赤道分为北半球和南半球。在最两端是北极和南极，这些地区以其严酷的极地环境而闻名。在这里，北极和南极地区都被冰雪覆盖。眺望地平线，人们可以观察到多样的地形。地球的地貌因海拔高度的不同而差异显著。跨越每个主要大陆——从欧亚大陆到大洋洲的偏远岛屿——从本土延伸到任何沿海的半岛，大自然的多样性令人惊叹。你可能会发现雕刻在巍峨悬崖上的隐秘洞穴，或者是正在缓慢侵蚀山谷的巨大冰川。低洼地区具有泥泞的沼泽环境、肥沃的河流三角洲或广阔平坦的平原。相比之下，高海拔地区则形成了雄伟的高原，而干旱地区可能会出人意料地隐藏着郁郁葱葱的绿洲。`
        }
      ]
    },
    {
      title: "Theme 3: Marine Environments and Water Bodies",
      subtitle: "海洋环境与水文特征",
      paragraphs: [
        {
          english: `The Earth is largely covered by vast bodies of water, from the enclosed Mediterranean Sea to the expansive Atlantic and the relatively pacific expanses of the largest ocean. These marine ecosystems are critical for life, while maritime navigation remains essential for global trade. Coastlines are highly varied; a sheltered gulf might feature a sandy beach, whereas another stretch of the coast or shore could be heavily stony. The rhythm of the sea is governed by the shifting tide and the steady, underlying current. Inland, water begins its journey at a mountain source, flowing into a small brook and then widening into a flowing stream. The physical features of these waterways differ greatly. Some areas are broad and shallow, with only superficial depths, spreading across a flat and smooth basin. Others force water through a rough, narrow gorge, flanked by vertical, steep rock walls that run parallel to the river's flow.`,
          chinese: `地球的大部分被广阔的水体覆盖，从封闭的地中海到宽广的大西洋，再到最大洋（太平洋）中相对平静的广阔海域。这些海洋生态系统对生命至关重要，而海上航行对全球贸易依然不可或缺。海岸线的变化多端；一个受保护的海湾可能拥有沙质的海滩，而另一段海岸或滨水区则可能布满岩石（多石的）。海洋的节律受不断变化的潮汐和稳定、潜在的水流控制。在内陆，水从山上的源头开始它的旅程，流入小溪，然后变宽成流动的河流。这些水道的物理特征差异巨大。有些区域宽阔而浅，深度仅仅是表层的，蔓延在平坦且光滑的盆地上。另一些则迫使水流穿过粗糙、狭窄的峡谷，峡谷两侧是垂直、陡峭的岩壁，与水流方向平行。`
        }
      ]
    },
    {
      title: "Theme 4: Meteorology, Climate, and Environmental Disasters",
      subtitle: "气象、气候与环境灾难",
      paragraphs: [
        {
          english: `In the study of meteorology, there is a clear distinction between daily weather and long-term climate. Some regions enjoy a mild or moderate climate, requiring minimal artificial heating because the sun naturally manages to warm the earth via thermal radiation. The tropics are typically humid and moist, while a desert is incredibly arid. Even in relatively temperate zones, winter mornings can be damp with thick mist, soon followed by severe frost, a snowy landscape, or unexpected hail.`,
          chinese: `在气象学的研究中，日常的天气和长期的气候之间有着明确的区别。一些地区享有温和或适度的气候，需要的人工供暖极少，因为太阳自然能通过热辐射使地球变暖。热带地区通常湿热且潮湿，而沙漠则极其干燥。即使在相对温和的地带，冬日的早晨也可能湿气沉沉，伴有浓雾，紧随其后的可能是严重的霜冻、白雪皑皑的风景或突如其来的冰雹。`
        },
        {
          english: `However, extreme conditions often result in a major disaster, which is far more serious than a minor mishap. The greenhouse effect is a widely studied phenomenon that has caused global environments to deteriorate and naturally protective ecosystems to degrade. Unchecked industrial activities produce toxic smog and harmful chemical fume emissions, which only aggravate these issues. We must urgently upgrade our sustainable practices before we permanently jeopardise or endanger life on Earth. Events like the El Nino are highly destructive. A seemingly gentle breeze can quickly become a strong gust or a heavy gale. During the rainy monsoon season, a violent hurricane in the Atlantic, a swirling tornado in North America, or a fierce typhoon in Asia can bring catastrophic consequences. Such storms bring severe flooding, turning rivers into a raging torrent that can rapidly erode the soil. Alternatively, a lack of rain causes a deadly drought. Other forms of a natural calamity include an underwater earthquake triggering a massive tsunami, or heavy snowfalls causing a deadly mountain avalanche.`,
          chinese: `然而，极端条件往往会导致重大的灾难，这比小灾难（小事故）严重得多。温室效应是一个被广泛研究的现象，它已导致全球环境恶化，使天然具有保护作用的生态系统退化（降解）。不受控制的工业活动产生有毒的雾霾和有害的化学烟雾排放，这只会加剧这些问题。我们必须紧急改善我们的可持续发展措施，以免永久地危及或危害地球上的生命。像厄尔尼诺这样的现象是极具破坏性的。看似温和的微风可能迅速演变成一阵狂风或大风。在多雨的季风季节，大西洋中狂暴的飓风、北美旋转的龙卷风或亚洲猛烈的台风都可能带来灾难性的后果。这样的风暴会带来严重的洪水泛滥，使河流变成肆虐的洪流，能迅速侵蚀土壤。另一方面，缺乏降雨会导致致命的干旱。自然灾难的其他形式还包括海底地震引发巨大的海啸，或是大雪引发致命的高山雪崩。`
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
      subtitle: "商业、心理学与社会",
      paragraphs: [
        {
          english: `In the business world, a successful company must constantly evolve to maintain its competitive edge. Many firms invest heavily in research and development to innovate their products. The psychology of consumer behavior plays a crucial role in marketing strategies. Understanding why people make certain purchasing decisions can help companies tailor their approach. Social trends also influence business operations, as companies must adapt to changing cultural norms and values.`,
          chinese: `在商业世界中，一家成功的公司必须不断进化以保持其竞争优势。许多公司在研发上投入巨资以创新其产品。消费者行为心理学在营销策略中起着至关重要的作用。理解人们做出某些购买决策的原因可以帮助公司调整其方法。社会趋势也会影响商业运营，因为公司必须适应不断变化的文化规范和价值观。`
        },
        {
          english: `The relationship between employers and employees has evolved significantly over time. Modern workplaces emphasize work-life balance and mental health support. Remote work has become increasingly common, requiring new management approaches. Team collaboration tools have become essential for maintaining productivity across distributed teams. Companies that prioritize employee well-being often see higher retention rates and better overall performance.`,
          chinese: `雇主与雇员之间的关系随着时间的推移发生了显著变化。现代工作场所强调工作与生活平衡以及心理健康支持。远程工作变得越来越普遍，需要新的管理方法。团队协作工具对于维持分布式团队的生产力变得至关重要。优先考虑员工福祉的公司通常会看到更高的留任率和更好的整体绩效。`
        }
      ]
    }
  ] as ArticleSection[]
};

// Unit 3 文章数据
export const unit3Article = {
  sections: [
    {
      title: "篇章一：Technology & Innovation",
      subtitle: "技术与创新",
      paragraphs: [
        {
          english: `The rapid advancement of technology has transformed every aspect of modern life. From smartphones to artificial intelligence, innovations continue to reshape how we work, communicate, and live. The digital revolution has created new opportunities while also presenting unique challenges. Data privacy and cybersecurity have become critical concerns in our increasingly connected world.`,
          chinese: `技术的快速发展改变了现代生活的方方面面。从智能手机到人工智能，创新不断重塑我们的工作、交流和生活方式。数字革命创造了新的机会，同时也带来了独特的挑战。数据隐私和网络安全在我们日益互联的世界中已成为关键问题。`
        },
        {
          english: `Emerging technologies such as blockchain, quantum computing, and renewable energy solutions are pushing the boundaries of what's possible. These innovations promise to address some of humanity's most pressing challenges, from climate change to healthcare accessibility. However, they also raise important ethical questions that society must address.`,
          chinese: `区块链、量子计算和可再生能源解决方案等新兴技术正在突破可能性的边界。这些创新有望解决人类一些最紧迫的挑战，从气候变化到医疗保健的可及性。然而，它们也提出了社会必须解决的重要伦理问题。`
        }
      ]
    }
  ] as ArticleSection[]
};
