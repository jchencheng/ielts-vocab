import { UserData, Unit, TestResult, TestProgress } from './types';
import { unit1Article, unit2Article } from './articleData';

const STORAGE_KEY = 'ielts-pwa-data';

// 从 IELTS Word List.txt 解析的数据
const defaultUnits: Unit[] = [
  {
    "id": "unit-1",
    "name": "Unit 1: Word Lists 1 & 2",
    "words": [
      {
        "id": "word-1-15",
        "english": "electronic*",
        "phonetic": "[‚ɪlek'trɒnɪk]",
        "partOfSpeech": "a.",
        "chinese": "电子的",
        "example": ""
      },
      {
        "id": "word-2-36",
        "english": "cooperation*",
        "phonetic": "/kəuˏɔpəˈreɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "合作，协作；配合",
        "example": ""
      },
      {
        "id": "word-2-61",
        "english": "delinquency*",
        "phonetic": "/dɪˈlɪŋkwənsɪ/",
        "partOfSpeech": "n.",
        "chinese": "失职；行为不良",
        "example": ""
      },
      {
        "id": "word-2-50",
        "english": "crocodile",
        "phonetic": "/ˈkrɔkədaɪl/",
        "partOfSpeech": "n.",
        "chinese": "鳄鱼；鳄鱼皮",
        "example": ""
      },
      {
        "id": "word-2-75",
        "english": "similarly",
        "phonetic": "['sɪmələlɪ]",
        "partOfSpeech": "ad.",
        "chinese": "同样地，类似地",
        "example": ""
      },
      {
        "id": "word-2-30",
        "english": "physical*",
        "phonetic": "/ˈfɪzɪkl/",
        "partOfSpeech": "a.",
        "chinese": "身体的，肉体的；物理的，物理学的；物质的，有形的； n. 体检",
        "example": ""
      },
      {
        "id": "word-2-7",
        "english": "item*",
        "phonetic": "/ˈaɪtəm/",
        "partOfSpeech": "n.",
        "chinese": "条款，项目； （新闻等）一则",
        "example": ""
      },
      {
        "id": "word-2-1",
        "english": "regional*",
        "phonetic": "['rɪːdʒənl]",
        "partOfSpeech": "a.",
        "chinese": "局部范围的；地方（性）的，区域性的；全地区的，整个地区的",
        "example": ""
      },
      {
        "id": "word-2-42",
        "english": "ceremony",
        "phonetic": "/ˈserɪmənɪ/",
        "partOfSpeech": "n.",
        "chinese": "典礼；仪式",
        "example": ""
      },
      {
        "id": "word-2-45",
        "english": "chink*",
        "phonetic": "/tʃɪnk/",
        "partOfSpeech": "n.",
        "chinese": "裂缝，裂口；一缕光；叮当声 v. （使）发出叮当声",
        "example": ""
      },
      {
        "id": "word-2-55",
        "english": "superior",
        "phonetic": "/suːˈpɪərɪə(r);",
        "partOfSpeech": "",
        "chinese": "sjuː-/ a. 上级的，（在职位、地位等方面）较高的；优越的，优于……的，较……多的；优良的，卓越的；有优越感的，高傲的 n. 上级，长官",
        "example": ""
      },
      {
        "id": "word-2-64",
        "english": "broom",
        "phonetic": "/bruːm/",
        "partOfSpeech": "n.",
        "chinese": "扫帚",
        "example": ""
      },
      {
        "id": "word-2-37",
        "english": "zoological*",
        "phonetic": "[‚zəʊə'lɑdʒɪkl]",
        "partOfSpeech": "a.",
        "chinese": "动物学的",
        "example": ""
      },
      {
        "id": "word-1-44",
        "english": "companion",
        "phonetic": "/kəmˈpænɪən/",
        "partOfSpeech": "n.",
        "chinese": "共事者；同伴",
        "example": ""
      },
      {
        "id": "word-2-18",
        "english": "tram*",
        "phonetic": "/træm/",
        "partOfSpeech": "n.",
        "chinese": "有轨电车，电车轨道 v. 乘电车",
        "example": ""
      },
      {
        "id": "word-2-70",
        "english": "viewpoint",
        "phonetic": "[ˈvjuːpɔɪnt]",
        "partOfSpeech": "n.",
        "chinese": "观点，看法",
        "example": ""
      },
      {
        "id": "word-2-66",
        "english": "sponsor*",
        "phonetic": "/ˈspɔnsə(r)/",
        "partOfSpeech": "n.",
        "chinese": "发起者，赞助人，主办者；主顾 vt. 发起，主办；赞助，资助；惠顾",
        "example": ""
      },
      {
        "id": "word-2-2",
        "english": "secure*",
        "phonetic": "/sɪˈkjuə(r)/",
        "partOfSpeech": "v.",
        "chinese": "得到某物，获得；防护，保卫 a. 安全的；可靠的，放心的",
        "example": ""
      },
      {
        "id": "word-2-63",
        "english": "implication",
        "phonetic": "/ˏɪmplɪˈkeɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "含意；暗示，暗指；卷入，牵连",
        "example": ""
      },
      {
        "id": "word-1-23",
        "english": "chamber*",
        "phonetic": "/ˈtʃeɪmbə(r)/",
        "partOfSpeech": "n.",
        "chinese": "室；洞穴；（枪）膛",
        "example": ""
      },
      {
        "id": "word-1-4",
        "english": "lack*",
        "phonetic": "/læk/",
        "partOfSpeech": "n./vt.",
        "chinese": "缺乏，不足，没有",
        "example": ""
      },
      {
        "id": "word-1-28",
        "english": "immigration*",
        "phonetic": "[‚ɪmɪ'greɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "外来的移民；移居",
        "example": ""
      },
      {
        "id": "word-2-51",
        "english": "summit",
        "phonetic": "/ˈsʌmɪt/",
        "partOfSpeech": "n.",
        "chinese": "（山等的）最高点，峰顶",
        "example": ""
      },
      {
        "id": "word-1-35",
        "english": "leadership*",
        "phonetic": "[ˈli:dəʃɪp]",
        "partOfSpeech": "n.",
        "chinese": "领导，领导层；领导能力",
        "example": ""
      },
      {
        "id": "word-2-41",
        "english": "occupy",
        "phonetic": "/ˈɔkjupaɪ/",
        "partOfSpeech": "vt.",
        "chinese": "占用，占领；（使）忙碌于；（使）从事",
        "example": ""
      },
      {
        "id": "word-2-38",
        "english": "stamp",
        "phonetic": "/stæmp/",
        "partOfSpeech": "v.",
        "chinese": "跺（脚），重踏；在……上盖（字样或图案等）；重步走 n. 邮票，印花；印，图章；标志，印记；跺脚，顿足",
        "example": ""
      },
      {
        "id": "word-1-32",
        "english": "physician",
        "phonetic": "/fɪˈzɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "内科医生，医师",
        "example": ""
      },
      {
        "id": "word-1-1",
        "english": "emperor",
        "phonetic": "/ˈempərə(r)/",
        "partOfSpeech": "n.",
        "chinese": "皇帝；君主",
        "example": ""
      },
      {
        "id": "word-2-72",
        "english": "nurture",
        "phonetic": "/ˈnɜːtʃə(r)/",
        "partOfSpeech": "vt.",
        "chinese": "培养；滋养 n. 营养品",
        "example": ""
      },
      {
        "id": "word-1-11",
        "english": "hierarchy",
        "phonetic": "/ˈhaɪərɑːkɪ/",
        "partOfSpeech": "n.",
        "chinese": "领导层；层次，等级",
        "example": ""
      },
      {
        "id": "word-1-19",
        "english": "consortium*",
        "phonetic": "/kənˈsɔːtɪəm/",
        "partOfSpeech": "n.",
        "chinese": "集团；财团；社团，协会",
        "example": ""
      },
      {
        "id": "word-1-12",
        "english": "guidance*",
        "phonetic": "/ˈgaɪdns/",
        "partOfSpeech": "n.",
        "chinese": "指引，指导",
        "example": ""
      },
      {
        "id": "word-1-22",
        "english": "subliminal",
        "phonetic": "/ˏsʌbˈlɪmɪnl/",
        "partOfSpeech": "a.",
        "chinese": "下意识的，潜意识的",
        "example": ""
      },
      {
        "id": "word-1-33",
        "english": "equal",
        "phonetic": "/ˈiːkwəl/",
        "partOfSpeech": "a.",
        "chinese": "相等的 vt. 比得上",
        "example": ""
      },
      {
        "id": "word-1-16",
        "english": "philosophy",
        "phonetic": "/fɪˈlɔsəfɪ/",
        "partOfSpeech": "n.",
        "chinese": "哲学；哲理",
        "example": ""
      },
      {
        "id": "word-1-5",
        "english": "pardon*",
        "phonetic": "/ˈpɑːdn/",
        "partOfSpeech": "",
        "chinese": "excl.（用于请求别人重复某事）什么，请再说一遍 n./vt. 原谅，宽恕；赦免",
        "example": ""
      },
      {
        "id": "word-2-6",
        "english": "seek",
        "phonetic": "/siːk/",
        "partOfSpeech": "v.",
        "chinese": "寻找；探索；追求",
        "example": ""
      },
      {
        "id": "word-1-20",
        "english": "buckle",
        "phonetic": "/ˈbʌkl/",
        "partOfSpeech": "n.",
        "chinese": "皮带扣环 v. 扣紧；（使）变形；弯曲",
        "example": ""
      },
      {
        "id": "word-1-3",
        "english": "traditional*",
        "phonetic": "[trəˈdɪʃənl]",
        "partOfSpeech": "a.",
        "chinese": "传统的，惯例的；口传的，传说的",
        "example": ""
      },
      {
        "id": "word-2-4",
        "english": "reject",
        "phonetic": "/rɪˈdʒekt/",
        "partOfSpeech": "vt.",
        "chinese": "拒绝 /ˈriːdʒekt/ n. 被拒货品，不合格品",
        "example": ""
      },
      {
        "id": "word-2-65",
        "english": "opponent*",
        "phonetic": "/əˈpəunənt/",
        "partOfSpeech": "n.",
        "chinese": "敌手，对手；反对者 a. 对立的，对抗的",
        "example": ""
      },
      {
        "id": "word-1-7",
        "english": "burgeon*",
        "phonetic": "/ˈbɜːdʒən/",
        "partOfSpeech": "vi.",
        "chinese": "迅速成长；发展",
        "example": ""
      },
      {
        "id": "word-2-60",
        "english": "ambassador*",
        "phonetic": "/æmˈbsədə(r)/",
        "partOfSpeech": "n.",
        "chinese": "大使，使节",
        "example": ""
      },
      {
        "id": "word-2-47",
        "english": "resource*",
        "phonetic": "/rɪˈsɔːs;",
        "partOfSpeech": "",
        "chinese": "rɪˈzɔːs/ n. [pl.] 资源，财力；应付办法，谋略；应变之才",
        "example": ""
      },
      {
        "id": "word-1-30",
        "english": "bet*",
        "phonetic": "/bet/",
        "partOfSpeech": "v.",
        "chinese": "赌，打赌 n. 打赌，赌注",
        "example": ""
      },
      {
        "id": "word-2-12",
        "english": "fabrication*",
        "phonetic": "[‚fæbrɪ'keɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "捏造，伪造；制作；构成",
        "example": ""
      },
      {
        "id": "word-1-13",
        "english": "easy-going*",
        "phonetic": "/ˈiːziˏgəuɪŋ/",
        "partOfSpeech": "a.",
        "chinese": "脾气随和的，心平气和的；随便的",
        "example": ""
      },
      {
        "id": "word-1-36",
        "english": "equity*",
        "phonetic": "/ˈekwətɪ/",
        "partOfSpeech": "n.",
        "chinese": "公平，公正",
        "example": ""
      },
      {
        "id": "word-1-29",
        "english": "natural*",
        "phonetic": "/ˈnætʃrəl/",
        "partOfSpeech": "a.",
        "chinese": "正常的，普通的，自然的；自然界的，天然的；天赋的，固有的",
        "example": ""
      },
      {
        "id": "word-2-74",
        "english": "genetic*",
        "phonetic": "/dʒɪˈnetɪk/",
        "partOfSpeech": "a.",
        "chinese": "遗传的 n. [-s] 遗传学",
        "example": ""
      },
      {
        "id": "word-2-8",
        "english": "crown*",
        "phonetic": "/kraun/",
        "partOfSpeech": "n.",
        "chinese": "王冠；花冠；齿冠",
        "example": ""
      },
      {
        "id": "word-1-2",
        "english": "exact*",
        "phonetic": "/ɪgˈzækt/",
        "partOfSpeech": "a.",
        "chinese": "精确的；准确的",
        "example": ""
      },
      {
        "id": "word-1-14",
        "english": "electrical*",
        "phonetic": "/ɪˈlektrɪkl/",
        "partOfSpeech": "a.",
        "chinese": "电的，电学的，有关电的",
        "example": ""
      },
      {
        "id": "word-2-35",
        "english": "overweight*",
        "phonetic": "/ˏəuvəˈweɪt/",
        "partOfSpeech": "a.",
        "chinese": "超重的，过重的 n. 超重，过重 vt. 使负担过重",
        "example": ""
      },
      {
        "id": "word-2-40",
        "english": "detective",
        "phonetic": "/dɪˈtektɪv/",
        "partOfSpeech": "n.",
        "chinese": "侦探 a. 侦探的",
        "example": ""
      },
      {
        "id": "word-2-39",
        "english": "whistle",
        "phonetic": "/ˈwɪsl/",
        "partOfSpeech": "v.",
        "chinese": "吹口哨 n. 口哨；呼啸而过",
        "example": ""
      },
      {
        "id": "word-1-9",
        "english": "barely*",
        "phonetic": "[ˈbeəli]",
        "partOfSpeech": "ad.",
        "chinese": "仅仅，几乎不；赤裸裸地，无遮蔽地",
        "example": ""
      },
      {
        "id": "word-1-38",
        "english": "nuclear*",
        "phonetic": "/ˈnjuːklɪə(r)/",
        "partOfSpeech": "a.",
        "chinese": "核能的，原子能的",
        "example": ""
      },
      {
        "id": "word-2-69",
        "english": "questionnaire*",
        "phonetic": "/ˏkwestʃəˈneə(r)/",
        "partOfSpeech": "n.",
        "chinese": "问卷，调查表",
        "example": ""
      },
      {
        "id": "word-1-37",
        "english": "excavate*",
        "phonetic": "/ˈekskəveɪt/",
        "partOfSpeech": "vt.",
        "chinese": "挖掘，开凿",
        "example": ""
      },
      {
        "id": "word-2-23",
        "english": "extent*",
        "phonetic": "/ɪkˈstent/",
        "partOfSpeech": "n.",
        "chinese": "范围；面积；广度，长度；程度",
        "example": ""
      },
      {
        "id": "word-2-25",
        "english": "stint",
        "phonetic": "/stɪnt/",
        "partOfSpeech": "n.",
        "chinese": "定量；限额",
        "example": ""
      },
      {
        "id": "word-1-34",
        "english": "resort*",
        "phonetic": "/rɪˈzɔːt/",
        "partOfSpeech": "n.",
        "chinese": "求助；诉诸；胜地 vi. 求助；诉诸",
        "example": ""
      },
      {
        "id": "word-1-25",
        "english": "prosperous*",
        "phonetic": "/ˈprɔspərəs/",
        "partOfSpeech": "a.",
        "chinese": "繁荣的，兴旺的；成功的",
        "example": ""
      },
      {
        "id": "word-2-44",
        "english": "denote*",
        "phonetic": "/dɪˈnəut/",
        "partOfSpeech": "v.",
        "chinese": "表示，指示；意味着",
        "example": ""
      },
      {
        "id": "word-2-26",
        "english": "embankment*",
        "phonetic": "/ɪmˈbæŋkmənt/",
        "partOfSpeech": "n.",
        "chinese": "筑堤；堤岸，路基",
        "example": ""
      },
      {
        "id": "word-1-21",
        "english": "curry",
        "phonetic": "/ˈkʌrɪ/",
        "partOfSpeech": "n.",
        "chinese": "咖喱，咖喱饭菜 vt. 把（肉、蔬菜等）做成咖喱食品；梳刷（马毛等）",
        "example": ""
      },
      {
        "id": "word-2-20",
        "english": "download*",
        "phonetic": "/ˏdaunˈləud/",
        "partOfSpeech": "v.",
        "chinese": "下载",
        "example": ""
      },
      {
        "id": "word-1-17",
        "english": "chronic",
        "phonetic": "/ˈkrɔnɪk/",
        "partOfSpeech": "a.",
        "chinese": "（疾病）慢性的；积习难改的",
        "example": ""
      },
      {
        "id": "word-1-31",
        "english": "consumer",
        "phonetic": "/kənˈsjuːmə(r)/",
        "partOfSpeech": "n.",
        "chinese": "消费者；用户",
        "example": ""
      },
      {
        "id": "word-1-6",
        "english": "regent",
        "phonetic": "/ˈriːdʒənt/",
        "partOfSpeech": "n.",
        "chinese": "摄政者（代国王统治者）",
        "example": ""
      },
      {
        "id": "word-1-18",
        "english": "desirable",
        "phonetic": "/dɪˈzaɪərəbl/",
        "partOfSpeech": "a.",
        "chinese": "值得拥有的；合意的；可取的，有利的",
        "example": ""
      },
      {
        "id": "word-1-24",
        "english": "frequent*",
        "phonetic": "/ˈfriːkwənt/",
        "partOfSpeech": "a.",
        "chinese": "频繁的，常见的，常用的",
        "example": ""
      },
      {
        "id": "word-2-13",
        "english": "series*",
        "phonetic": "/ˈsɪəriːz/",
        "partOfSpeech": "n.",
        "chinese": "一系列，连续；丛书",
        "example": ""
      },
      {
        "id": "word-1-26",
        "english": "purpose*",
        "phonetic": "/ˈpɜːpəs/",
        "partOfSpeech": "n.",
        "chinese": "目的，意图；用途，效果 v. 打算，企图，决心",
        "example": ""
      },
      {
        "id": "word-1-61",
        "english": "enable*",
        "phonetic": "/ɪˈneɪbl/",
        "partOfSpeech": "vt.",
        "chinese": "使能够，使成为可能",
        "example": ""
      },
      {
        "id": "word-2-28",
        "english": "federation",
        "phonetic": "[‚fedə'reɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "联邦；同盟",
        "example": ""
      },
      {
        "id": "word-2-52",
        "english": "ensure",
        "phonetic": "/ɪnˈʃɔː(r)/",
        "partOfSpeech": "vt.",
        "chinese": "确保，保证；担保；赋予",
        "example": ""
      },
      {
        "id": "word-2-71",
        "english": "routine*",
        "phonetic": "/ruːˈtiːn/",
        "partOfSpeech": "n.",
        "chinese": "例行公事；惯例 a. 例行的；常规的",
        "example": ""
      },
      {
        "id": "word-2-29",
        "english": "surge*",
        "phonetic": "/sɜːdʒ/",
        "partOfSpeech": "v.",
        "chinese": "（人群等）蜂拥而出；波动，涌动 n. （感情等的）洋溢；猛增",
        "example": ""
      },
      {
        "id": "word-1-10",
        "english": "methane*",
        "phonetic": "/ˈmiːθeɪn/",
        "partOfSpeech": "n.",
        "chinese": "甲烷，沼气",
        "example": ""
      },
      {
        "id": "word-2-48",
        "english": "entire*",
        "phonetic": "/ɪnˈtaɪə(r)/",
        "partOfSpeech": "a.",
        "chinese": "全部的，整个的",
        "example": ""
      },
      {
        "id": "word-1-8",
        "english": "argue*",
        "phonetic": "/ˈɑːgjuː/",
        "partOfSpeech": "v.",
        "chinese": "争论；说服",
        "example": ""
      },
      {
        "id": "word-1-27",
        "english": "variety*",
        "phonetic": "/vəˈraɪətɪ/",
        "partOfSpeech": "n.",
        "chinese": "品种，种类；变化，多样化",
        "example": ""
      },
      {
        "id": "word-2-21",
        "english": "refer*",
        "phonetic": "/rɪˈfɜː(r)/",
        "partOfSpeech": "v.",
        "chinese": "参考，查阅，查询；提到，谈及；引用；提交，上呈",
        "example": ""
      },
      {
        "id": "word-2-49",
        "english": "epitomise*",
        "phonetic": "[ɪˈpɪtəmaɪz]",
        "partOfSpeech": "vt.",
        "chinese": "集中体现；概括",
        "example": ""
      },
      {
        "id": "word-2-59",
        "english": "seep",
        "phonetic": "/siːp/",
        "partOfSpeech": "vi.",
        "chinese": "漏出，渗漏",
        "example": ""
      },
      {
        "id": "word-1-39",
        "english": "mutual",
        "phonetic": "/ˈmjuːtʃuəl/",
        "partOfSpeech": "a.",
        "chinese": "相互的；共同的",
        "example": ""
      },
      {
        "id": "word-2-19",
        "english": "maturity*",
        "phonetic": "[mə'tʃʊərətɪ]",
        "partOfSpeech": "n.",
        "chinese": "成熟；完善，完备，准备就绪；到期（应付款）",
        "example": ""
      },
      {
        "id": "word-2-3",
        "english": "preserve",
        "phonetic": "/prɪˈzɜːv/",
        "partOfSpeech": "vt.",
        "chinese": "保护；维持；保存，保藏；腌渍",
        "example": ""
      },
      {
        "id": "word-1-40",
        "english": "hectare*",
        "phonetic": "/ˈhekteə(r)/",
        "partOfSpeech": "n.",
        "chinese": "公顷",
        "example": ""
      },
      {
        "id": "word-1-74",
        "english": "apace*",
        "phonetic": "/əˈpeɪs/",
        "partOfSpeech": "ad.",
        "chinese": "快速地，急速地",
        "example": ""
      },
      {
        "id": "word-1-46",
        "english": "input*",
        "phonetic": "/ˈɪnput/",
        "partOfSpeech": "n.",
        "chinese": "投入，输入；输入的数据 vt. 把……输入计算机",
        "example": ""
      },
      {
        "id": "word-2-16",
        "english": "distraction*",
        "phonetic": "/dɪˈstrækʃn/",
        "partOfSpeech": "n.",
        "chinese": "分散注意力的事；使人分心的事；娱乐，消遣",
        "example": ""
      },
      {
        "id": "word-2-10",
        "english": "point*",
        "phonetic": "/pɔɪnt/",
        "partOfSpeech": "n.",
        "chinese": "尖，尖端；点，小数点；条款，细目；分数，得分；要点，论点，观点 v. 指，指向；表明；瞄准",
        "example": ""
      },
      {
        "id": "word-2-14",
        "english": "variation*",
        "phonetic": "/ˏveərɪˈeɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "变化，变动；变种；变异；变更；变奏",
        "example": ""
      },
      {
        "id": "word-1-59",
        "english": "attendance*",
        "phonetic": "/əˈtendəns/",
        "partOfSpeech": "n.",
        "chinese": "到场，出席；出勤；伺候，照料",
        "example": ""
      },
      {
        "id": "word-2-46",
        "english": "iris*",
        "phonetic": "/ˈaɪərɪs/",
        "partOfSpeech": "n.",
        "chinese": "（pl. irises或irides）虹；（眼球的）虹膜",
        "example": ""
      },
      {
        "id": "word-1-52",
        "english": "ventilation",
        "phonetic": "[ˌventɪ'leɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "空气流通；通风设备，通风方法",
        "example": ""
      },
      {
        "id": "word-1-63",
        "english": "heal",
        "phonetic": "/hiːl/",
        "partOfSpeech": "v.",
        "chinese": "治愈，康复；调停",
        "example": ""
      },
      {
        "id": "word-2-58",
        "english": "perform*",
        "phonetic": "/pəˈfɔːm/",
        "partOfSpeech": "v.",
        "chinese": "履行，执行，完成；表演，演出；（机器）运作",
        "example": ""
      },
      {
        "id": "word-1-60",
        "english": "optional*",
        "phonetic": "[ˈɒpʃənl]",
        "partOfSpeech": "a.",
        "chinese": "可选择的，非强制的，随意的",
        "example": ""
      },
      {
        "id": "word-1-53",
        "english": "intermediate*",
        "phonetic": "/ˏɪntəˈmiːdɪət/",
        "partOfSpeech": "a.",
        "chinese": "中间的，中级的",
        "example": ""
      },
      {
        "id": "word-2-33",
        "english": "persuade*",
        "phonetic": "/pəˈsweɪd/",
        "partOfSpeech": "v.",
        "chinese": "说服，劝说；使相信",
        "example": ""
      },
      {
        "id": "word-2-67",
        "english": "decisive",
        "phonetic": "/dɪˈsaɪsɪv/",
        "partOfSpeech": "a.",
        "chinese": "决定性的；果断的",
        "example": ""
      },
      {
        "id": "word-1-41",
        "english": "density",
        "phonetic": "/ˈdensətɪ/",
        "partOfSpeech": "n.",
        "chinese": "密集；浓度，密度",
        "example": ""
      },
      {
        "id": "word-2-32",
        "english": "score*",
        "phonetic": "/skɔː(r)/",
        "partOfSpeech": "v.",
        "chinese": "得分，记分；给（试卷等）打分，给……评分；刻痕于，画线于；获胜，成功 n. 得分，分数；乐谱；抓痕，划痕；二十",
        "example": ""
      },
      {
        "id": "word-1-49",
        "english": "forfeit*",
        "phonetic": "/ˈfɔːfɪt/",
        "partOfSpeech": "v.",
        "chinese": "（因犯规等而）丧失，失去 n. 罚款；代价",
        "example": ""
      },
      {
        "id": "word-2-5",
        "english": "code",
        "phonetic": "/kəud/",
        "partOfSpeech": "n.",
        "chinese": "密码；代码 vt. 把……编码",
        "example": ""
      },
      {
        "id": "word-1-51",
        "english": "van",
        "phonetic": "/væn/",
        "partOfSpeech": "n.",
        "chinese": "运货车",
        "example": ""
      },
      {
        "id": "word-1-48",
        "english": "impart",
        "phonetic": "/ɪmˈpɑːt/",
        "partOfSpeech": "vt.",
        "chinese": "给予，赋予；传授；告知，透露",
        "example": ""
      },
      {
        "id": "word-2-54",
        "english": "accurate",
        "phonetic": "/ˈækjərət/",
        "partOfSpeech": "a.",
        "chinese": "正确无误的；精确的",
        "example": ""
      },
      {
        "id": "word-2-53",
        "english": "odour",
        "phonetic": "/ˈəudə(r)/",
        "partOfSpeech": "n.",
        "chinese": "气味",
        "example": ""
      },
      {
        "id": "word-1-66",
        "english": "landscape",
        "phonetic": "/ˈlændskeɪp/",
        "partOfSpeech": "n.",
        "chinese": "风景 vt. 对……作景观美化，美化（自然环境等）",
        "example": ""
      },
      {
        "id": "word-1-76",
        "english": "fair*",
        "phonetic": "/feə(r)/",
        "partOfSpeech": "a./ad.",
        "chinese": "公平的/地",
        "example": ""
      },
      {
        "id": "word-1-47",
        "english": "merely*",
        "phonetic": "[ˈmiəli]",
        "partOfSpeech": "ad.",
        "chinese": "仅仅，只不过",
        "example": ""
      },
      {
        "id": "word-2-9",
        "english": "effort*",
        "phonetic": "/ˈefət/",
        "partOfSpeech": "n.",
        "chinese": "努力，艰难的尝试；成就",
        "example": ""
      },
      {
        "id": "word-1-42",
        "english": "massive",
        "phonetic": "/ˈmæsɪv/",
        "partOfSpeech": "a.",
        "chinese": "大而重的，厚实的，粗大的；大量的，大规模的",
        "example": ""
      },
      {
        "id": "word-1-67",
        "english": "emotion*",
        "phonetic": "/ɪˈməuʃn/",
        "partOfSpeech": "n.",
        "chinese": "感情；情绪",
        "example": ""
      },
      {
        "id": "word-1-68",
        "english": "commonwealth",
        "phonetic": "/ˈkɔmənwelθ/",
        "partOfSpeech": "n.",
        "chinese": "[the",
        "example": "C-] 英联邦；联合体"
      },
      {
        "id": "word-2-31",
        "english": "justify",
        "phonetic": "/ˈdʒʌstɪfaɪ/",
        "partOfSpeech": "v.",
        "chinese": "证明……为正当的；为……辩护",
        "example": ""
      },
      {
        "id": "word-1-62",
        "english": "departmental*",
        "phonetic": "[‚diːpɑːt'mentl]",
        "partOfSpeech": "a.",
        "chinese": "部门的",
        "example": ""
      },
      {
        "id": "word-2-57",
        "english": "willing",
        "phonetic": "/ˈwɪlɪŋ/",
        "partOfSpeech": "a.",
        "chinese": "愿意的，乐意的",
        "example": ""
      },
      {
        "id": "word-2-73",
        "english": "slight*",
        "phonetic": "/slaɪt/",
        "partOfSpeech": "a.",
        "chinese": "轻微的，不足道的；纤细的，瘦弱的 vt./n. 轻视，藐视，轻蔑",
        "example": ""
      },
      {
        "id": "word-1-56",
        "english": "nevertheless",
        "phonetic": "/ˏnevəðəˈles/",
        "partOfSpeech": "ad.",
        "chinese": "仍然；然而 conj. 然而，不过",
        "example": ""
      },
      {
        "id": "word-2-11",
        "english": "review*",
        "phonetic": "/rɪˈvjuː/",
        "partOfSpeech": "vt.",
        "chinese": "回顾；自习；评论 n. 回顾；评论",
        "example": ""
      },
      {
        "id": "word-1-55",
        "english": "invasion*",
        "phonetic": "/ɪnˈveɪʒn/",
        "partOfSpeech": "n.",
        "chinese": "入侵，侵略",
        "example": ""
      },
      {
        "id": "word-1-58",
        "english": "inspiring*",
        "phonetic": "[ɪn'spaɪərɪŋ]",
        "partOfSpeech": "a.",
        "chinese": "鼓舞（或激励）人心的；启发灵感的",
        "example": ""
      },
      {
        "id": "word-2-17",
        "english": "complicate*",
        "phonetic": "/ˈkɔmplɪkeɪt/",
        "partOfSpeech": "vt.",
        "chinese": "使变复杂",
        "example": ""
      },
      {
        "id": "word-1-43",
        "english": "congratulate",
        "phonetic": "/kənˈgrætʃuleɪt/",
        "partOfSpeech": "vt.",
        "chinese": "祝贺",
        "example": ""
      },
      {
        "id": "word-1-54",
        "english": "eternal",
        "phonetic": "/ɪˈtɜːnl/",
        "partOfSpeech": "a.",
        "chinese": "永恒的",
        "example": ""
      },
      {
        "id": "word-1-65",
        "english": "wage",
        "phonetic": "/weɪdʒ/",
        "partOfSpeech": "n.",
        "chinese": "工资；[常 pl.] 报酬",
        "example": ""
      },
      {
        "id": "word-1-64",
        "english": "dismantle*",
        "phonetic": "/dɪsˈmæntl/",
        "partOfSpeech": "vt.",
        "chinese": "拆除；废除，取消",
        "example": ""
      },
      {
        "id": "word-1-45",
        "english": "rig",
        "phonetic": "/rɪg/",
        "partOfSpeech": "vt.",
        "chinese": "操纵，垄断 n. 船桅（或船帆等）的装置；成套器械",
        "example": ""
      },
      {
        "id": "word-2-34",
        "english": "migration*",
        "phonetic": "[maɪ'greɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "迁徙，移居，移民",
        "example": ""
      },
      {
        "id": "word-2-62",
        "english": "deliberate",
        "phonetic": "/dɪˈlɪbərət/",
        "partOfSpeech": "a.",
        "chinese": "故意的；深思熟虑的；从容不迫的 /dɪˈlɪbəreɪt/ v. 深思熟虑；审议",
        "example": ""
      },
      {
        "id": "word-2-68",
        "english": "substantial*",
        "phonetic": "/səbˈstænʃl/",
        "partOfSpeech": "a.",
        "chinese": "可观的，大量的；坚固的，结实的；实质的；大体上的",
        "example": ""
      },
      {
        "id": "word-1-73",
        "english": "clip",
        "phonetic": "/klɪp/",
        "partOfSpeech": "n.",
        "chinese": "（弹簧）夹子，回形针，别针；弹夹；修剪；剪报，电影（或电视）片断 v.（夹子、回形针等）夹住，扣住；剪，修剪",
        "example": ""
      },
      {
        "id": "word-1-72",
        "english": "security*",
        "phonetic": "/sɪˈkjuərətɪ/",
        "partOfSpeech": "n.",
        "chinese": "安全，保障；抵押品；[pl.]证券",
        "example": ""
      },
      {
        "id": "word-2-56",
        "english": "tender",
        "phonetic": "/ˈtendə(r)/",
        "partOfSpeech": "a.",
        "chinese": "嫩的；脆弱的；温柔的",
        "example": ""
      },
      {
        "id": "word-2-22",
        "english": "interview*",
        "phonetic": "/ˈɪntəvjuː/",
        "partOfSpeech": "v./n.",
        "chinese": "接见，会见；采访；面试",
        "example": ""
      },
      {
        "id": "word-1-50",
        "english": "calorie",
        "phonetic": "/ˈkælərɪ/",
        "partOfSpeech": "n.",
        "chinese": "卡（路里）， 大卡（食物的热量）",
        "example": ""
      },
      {
        "id": "word-1-57",
        "english": "celebrate*",
        "phonetic": "/ˈselɪbreɪt/",
        "partOfSpeech": "v.",
        "chinese": "赞扬，歌颂；庆祝",
        "example": ""
      },
      {
        "id": "word-1-70",
        "english": "periodical*",
        "phonetic": "[‚pɪərɪ'ɑdɪkl]",
        "partOfSpeech": "n.",
        "chinese": "期刊，杂志 a. 周期的，定期的",
        "example": ""
      },
      {
        "id": "word-2-15",
        "english": "margin*",
        "phonetic": "/ˈmɑːdʒɪn/",
        "partOfSpeech": "n.",
        "chinese": "差额，差距；页边空白；边缘；余地；幅度 v. 加旁注于；加边于",
        "example": ""
      },
      {
        "id": "word-1-71",
        "english": "receptionist*",
        "phonetic": "[rɪ'sepʃənɪst]",
        "partOfSpeech": "n.",
        "chinese": "接待员",
        "example": ""
      },
      {
        "id": "word-2-43",
        "english": "diagnose",
        "phonetic": "/ˈdaɪəgnəuz/",
        "partOfSpeech": "v.",
        "chinese": "诊断；判断",
        "example": ""
      },
      {
        "id": "word-1-75",
        "english": "yield",
        "phonetic": "/jiːld/",
        "partOfSpeech": "n.",
        "chinese": "产量 v. 出产；放弃",
        "example": ""
      },
      {
        "id": "word-1-69",
        "english": "newsletter*",
        "phonetic": "['njuːzletə]",
        "partOfSpeech": "n.",
        "chinese": "时事通讯，业务通讯",
        "example": ""
      },
      {
        "id": "word-2-24",
        "english": "evacuate",
        "phonetic": "/ɪˈvækjueɪt/",
        "partOfSpeech": "v.",
        "chinese": "疏散；撤离",
        "example": ""
      },
      {
        "id": "word-2-27",
        "english": "squash",
        "phonetic": "/skwɔʃ/",
        "partOfSpeech": "n.",
        "chinese": "软式墙网球，壁球 v. 压碎，挤压；挤进，塞入；镇住，镇压；制止",
        "example": ""
      }
    ],
    "article": "In the field of Technological Innovation, researchers have been studying various phenomena to understand their implications. The concept of electronic* has been widely discussed in recent studies. The concept of cooperation* has been widely discussed in recent studies. The concept of delinquency* has been widely discussed in recent studies. The concept of crocodile has been widely discussed in recent studies. The concept of similarly has been widely discussed in recent studies. The concept of physical* has been widely discussed in recent studies. The concept of item* has been widely discussed in recent studies. The concept of regional* has been widely discussed in recent studies. The concept of ceremony has been widely discussed in recent studies. The concept of chink* has been widely discussed in recent studies. Researchers have found that these factors play a significant role in shaping our understanding of the subject. Further studies are needed to explore the full implications of these findings."
  },
  {
    "id": "unit-2",
    "name": "Unit 2: Word Lists 3 & 4",
    "words": [
      {
        "id": "word-3-7",
        "english": "deduce",
        "phonetic": "/dɪˈdjuːs/",
        "partOfSpeech": "v.",
        "chinese": "演绎，推断",
        "example": ""
      },
      {
        "id": "word-3-1",
        "english": "leak*",
        "phonetic": "/liːk/",
        "partOfSpeech": "n.",
        "chinese": "漏洞；泄露 v. （使）漏，（使）渗出",
        "example": ""
      },
      {
        "id": "word-4-9",
        "english": "administrator*",
        "phonetic": "/ədˈmɪnɪstreɪtə(r)/",
        "partOfSpeech": "n.",
        "chinese": "管理者，管理人员；行政人员",
        "example": ""
      },
      {
        "id": "word-4-23",
        "english": "invest*",
        "phonetic": "/ɪnˈvest/",
        "partOfSpeech": "v.",
        "chinese": "投资；投入（时间、精力等）；授予，赋予",
        "example": ""
      },
      {
        "id": "word-3-17",
        "english": "submarine",
        "phonetic": "/ˏsʌbməˈriːn;",
        "partOfSpeech": "",
        "chinese": "ˈsʌbməriːn/ n. 潜水艇 a. 水底的，海底的",
        "example": ""
      },
      {
        "id": "word-4-8",
        "english": "consignment*",
        "phonetic": "[kən'saɪnmənt]",
        "partOfSpeech": "n.",
        "chinese": "交付，委托；投递，发送；所托运的货物",
        "example": ""
      },
      {
        "id": "word-3-39",
        "english": "check-up*",
        "phonetic": "['tʃekʌp]",
        "partOfSpeech": "n.",
        "chinese": "检查",
        "example": ""
      },
      {
        "id": "word-4-22",
        "english": "equator",
        "phonetic": "/ɪˈkweɪtə(r)/",
        "partOfSpeech": "n.",
        "chinese": "（地球）赤道",
        "example": ""
      },
      {
        "id": "word-3-24",
        "english": "instrument",
        "phonetic": "/ˋɪnstrəmənt/",
        "partOfSpeech": "n.",
        "chinese": "仪器；手段；工具；乐器",
        "example": ""
      },
      {
        "id": "word-3-61",
        "english": "standard*",
        "phonetic": "/ˈstændəd/",
        "partOfSpeech": "n.",
        "chinese": "标准 a. 标准的",
        "example": ""
      },
      {
        "id": "word-4-20",
        "english": "fauna*",
        "phonetic": "/ˈfɔːnə/",
        "partOfSpeech": "n.",
        "chinese": "（某地区或某时期的）所有动物",
        "example": ""
      },
      {
        "id": "word-3-71",
        "english": "luggage*",
        "phonetic": "/ˈlʌgɪdʒ/",
        "partOfSpeech": "n.",
        "chinese": "行李",
        "example": ""
      },
      {
        "id": "word-3-45",
        "english": "reasonable*",
        "phonetic": "/ˈriːznəbl/",
        "partOfSpeech": "a.",
        "chinese": "合理的，有道理的；通情达理的；适度的",
        "example": ""
      },
      {
        "id": "word-3-35",
        "english": "unique*",
        "phonetic": "/juːˈniːk/",
        "partOfSpeech": "a.",
        "chinese": "唯一的，独一无二的；极不寻常的，极好的",
        "example": ""
      },
      {
        "id": "word-3-64",
        "english": "workaholic*",
        "phonetic": "/ˏwɜːkəˈhɔlɪk/",
        "partOfSpeech": "n.",
        "chinese": "工作狂",
        "example": ""
      },
      {
        "id": "word-4-7",
        "english": "bother*",
        "phonetic": "/ˈbɔðə(r)/",
        "partOfSpeech": "v.",
        "chinese": "打扰，烦扰；烦恼，操心 n. 麻烦，烦扰",
        "example": ""
      },
      {
        "id": "word-4-62",
        "english": "exile*",
        "phonetic": "/ˈeksaɪl/",
        "partOfSpeech": "vt.",
        "chinese": "放逐，流放，使流亡 n. 流放，流亡；被流放者，背井离乡者，流犯",
        "example": ""
      },
      {
        "id": "word-3-27",
        "english": "irritation*",
        "phonetic": "[‚ɪrɪ'teɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "激怒，恼怒；刺激物，恼人的事",
        "example": ""
      },
      {
        "id": "word-3-16",
        "english": "voluntary*",
        "phonetic": "/ˈvɔləntrɪ/",
        "partOfSpeech": "a.",
        "chinese": "自愿的，志愿的",
        "example": ""
      },
      {
        "id": "word-4-40",
        "english": "discretion",
        "phonetic": "/dɪˈskreʃn/",
        "partOfSpeech": "n.",
        "chinese": "判断力；谨慎，审慎；明智",
        "example": ""
      },
      {
        "id": "word-4-73",
        "english": "entertain*",
        "phonetic": "/ˏentəˈteɪn/",
        "partOfSpeech": "v.",
        "chinese": "（使）欢乐，（使）娱乐；招待",
        "example": ""
      },
      {
        "id": "word-3-74",
        "english": "internal",
        "phonetic": "/ɪnˈtɜːnl/",
        "partOfSpeech": "a.",
        "chinese": "内部的，国内的",
        "example": ""
      },
      {
        "id": "word-3-36",
        "english": "crossword*",
        "phonetic": "/ˈkrɔswɜːd/",
        "partOfSpeech": "n.",
        "chinese": "纵横填字游戏",
        "example": ""
      },
      {
        "id": "word-4-31",
        "english": "ultimate*",
        "phonetic": "/ˈʌltɪmət/",
        "partOfSpeech": "a.",
        "chinese": "最后的，最终的；根本的 n. 最好（或先进、伟大等）的事物，极品，精华",
        "example": ""
      },
      {
        "id": "word-3-44",
        "english": "include*",
        "phonetic": "/ɪnˈkluːd/",
        "partOfSpeech": "v.",
        "chinese": "包括，包含；计入",
        "example": ""
      },
      {
        "id": "word-4-25",
        "english": "dedicate",
        "phonetic": "/ˈdedɪkeɪt/",
        "partOfSpeech": "vt.",
        "chinese": "献（身）；（在著作等上）题献词",
        "example": ""
      },
      {
        "id": "word-3-46",
        "english": "abode*",
        "phonetic": "/əˈbəud/",
        "partOfSpeech": "n.",
        "chinese": "房屋，家，住所",
        "example": ""
      },
      {
        "id": "word-4-47",
        "english": "refrigerator*",
        "phonetic": "[rɪ'frɪdʒəreɪtə(r)]",
        "partOfSpeech": "n.",
        "chinese": "冰箱；冷藏库",
        "example": ""
      },
      {
        "id": "word-4-19",
        "english": "brass*",
        "phonetic": "/brɑːs/",
        "partOfSpeech": "n.",
        "chinese": "黄铜；黄铜器；铜管乐器",
        "example": ""
      },
      {
        "id": "word-4-60",
        "english": "gloss*",
        "phonetic": "/glɔs/",
        "partOfSpeech": "n.",
        "chinese": "光泽，色泽；虚假的外表，假象；注解，解释 v. 使具有光泽；掩饰；曲解；作注释；发光，发亮",
        "example": ""
      },
      {
        "id": "word-4-43",
        "english": "dorm",
        "phonetic": "/dɔːm/",
        "partOfSpeech": "n.",
        "chinese": "宿舍",
        "example": ""
      },
      {
        "id": "word-4-74",
        "english": "withstand",
        "phonetic": "/wɪðˈstænd;",
        "partOfSpeech": "",
        "chinese": "wɪθˈs-/ vt. 抵挡；经受住",
        "example": ""
      },
      {
        "id": "word-4-36",
        "english": "device*",
        "phonetic": "/dɪˈvaɪs/",
        "partOfSpeech": "n.",
        "chinese": "装置，设备，仪表；方法；设计；手段；策略",
        "example": ""
      },
      {
        "id": "word-4-48",
        "english": "minimise",
        "phonetic": "/ˈmɪnɪmaɪz/",
        "partOfSpeech": "vt.",
        "chinese": "使减到最低限度；最小化",
        "example": ""
      },
      {
        "id": "word-4-55",
        "english": "forecast*",
        "phonetic": "/ˈfɔːkɑːst/",
        "partOfSpeech": "n./vt.",
        "chinese": "预报；预测；预想",
        "example": ""
      },
      {
        "id": "word-3-43",
        "english": "transcript*",
        "phonetic": "['trænskrɪpt]",
        "partOfSpeech": "n.",
        "chinese": "抄本，副本；文字记录",
        "example": ""
      },
      {
        "id": "word-3-77",
        "english": "illusion",
        "phonetic": "/ɪˈluːʒn/",
        "partOfSpeech": "n.",
        "chinese": "幻想中的事物，错误的观念；错觉，幻觉，假象",
        "example": ""
      },
      {
        "id": "word-3-13",
        "english": "respondent*",
        "phonetic": "/rɪˈspɔndənt/",
        "partOfSpeech": "n.",
        "chinese": "回答者，响应者；调查对象；被告",
        "example": ""
      },
      {
        "id": "word-4-45",
        "english": "striking",
        "phonetic": "/ˈstraɪkɪŋ/",
        "partOfSpeech": "a.",
        "chinese": "显著的，惹人注目的",
        "example": ""
      },
      {
        "id": "word-3-25",
        "english": "simplify",
        "phonetic": "/ˈsɪmplɪfaɪ/",
        "partOfSpeech": "vt.",
        "chinese": "使简化",
        "example": ""
      },
      {
        "id": "word-3-2",
        "english": "literature",
        "phonetic": "/ˈlɪtrətʃə(r)/",
        "partOfSpeech": "n.",
        "chinese": "文学（作品）；文献",
        "example": ""
      },
      {
        "id": "word-3-8",
        "english": "doctorate*",
        "phonetic": "['dɒktərɪt]",
        "partOfSpeech": "n.",
        "chinese": "博士学位",
        "example": ""
      },
      {
        "id": "word-4-16",
        "english": "humble*",
        "phonetic": "/ˈhʌmbl/",
        "partOfSpeech": "a.",
        "chinese": "谦逊的，谦虚的；地位（或身份）低下的，卑贱的；简陋的，低劣的 vt. 使谦恭；使卑下；贬低",
        "example": ""
      },
      {
        "id": "word-4-50",
        "english": "profit*",
        "phonetic": "/ˈprɔfɪt/",
        "partOfSpeech": "n.",
        "chinese": "利润；益处 v. 有利于；获益",
        "example": ""
      },
      {
        "id": "word-3-28",
        "english": "expense*",
        "phonetic": "/ɪkˈspens/",
        "partOfSpeech": "n.",
        "chinese": "花费，开支；消费，消耗；代价，损失",
        "example": ""
      },
      {
        "id": "word-3-76",
        "english": "cruise",
        "phonetic": "/kruːz/",
        "partOfSpeech": "v.",
        "chinese": "航游，巡航；（出租车、船等）缓慢巡行 n. 旅游，游戈",
        "example": ""
      },
      {
        "id": "word-3-48",
        "english": "emergency*",
        "phonetic": "/ɪˈmɜːdʒənsɪ/",
        "partOfSpeech": "n.",
        "chinese": "紧急情况，突发事件",
        "example": ""
      },
      {
        "id": "word-3-42",
        "english": "reservation*",
        "phonetic": "/ˏrezəˈveɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "保留意见，存疑；预定，预订",
        "example": ""
      },
      {
        "id": "word-3-55",
        "english": "ambiguous",
        "phonetic": "/æmˈbɪgjuəs/",
        "partOfSpeech": "a.",
        "chinese": "含糊其辞的； 不明确的，模棱两可的",
        "example": ""
      },
      {
        "id": "word-4-33",
        "english": "flap",
        "phonetic": "/flæp/",
        "partOfSpeech": "v.",
        "chinese": "拍打；（翅膀）拍动 n. 薄片；封盖；振动；激动",
        "example": ""
      },
      {
        "id": "word-4-61",
        "english": "committee*",
        "phonetic": "/kəˈmɪtɪ/",
        "partOfSpeech": "n.",
        "chinese": "委员会，全体委员",
        "example": ""
      },
      {
        "id": "word-4-53",
        "english": "leopard*",
        "phonetic": "/ˈlepəd/",
        "partOfSpeech": "n.",
        "chinese": "豹，美洲豹",
        "example": ""
      },
      {
        "id": "word-3-30",
        "english": "originate*",
        "phonetic": "/əˈrɪdʒɪneɪt/",
        "partOfSpeech": "v.",
        "chinese": "起源，发生；首创，创造",
        "example": ""
      },
      {
        "id": "word-3-38",
        "english": "disagree*",
        "phonetic": "/ˏdɪsəˈgriː/",
        "partOfSpeech": "v.",
        "chinese": "不同意；不一致",
        "example": ""
      },
      {
        "id": "word-3-68",
        "english": "feather",
        "phonetic": "/ˈfeðə(r)/",
        "partOfSpeech": "n.",
        "chinese": "羽毛，翎毛",
        "example": ""
      },
      {
        "id": "word-3-14",
        "english": "surroundings*",
        "phonetic": "[səˈraʊndɪŋz]",
        "partOfSpeech": "n.",
        "chinese": "周围的事物，环境",
        "example": ""
      },
      {
        "id": "word-4-54",
        "english": "mastery*",
        "phonetic": "/ˈmɑːstərɪ/",
        "partOfSpeech": "n.",
        "chinese": "精通，熟练；控制",
        "example": ""
      },
      {
        "id": "word-4-58",
        "english": "comparative*",
        "phonetic": "/kəmˈpærətɪv/",
        "partOfSpeech": "a.",
        "chinese": "比较的；相当的",
        "example": ""
      },
      {
        "id": "word-4-26",
        "english": "astrology",
        "phonetic": "/əˈstrɔlədʒɪ/",
        "partOfSpeech": "n.",
        "chinese": "占星学；占星术",
        "example": ""
      },
      {
        "id": "word-3-9",
        "english": "absolute*",
        "phonetic": "/ˈæbsəluːt/",
        "partOfSpeech": "a.",
        "chinese": "完全的，绝对的，纯粹的",
        "example": ""
      },
      {
        "id": "word-3-12",
        "english": "slender*",
        "phonetic": "/ˈslendə(r)/",
        "partOfSpeech": "a.",
        "chinese": "修长的，细长的，苗条的；微小的，微薄的",
        "example": ""
      },
      {
        "id": "word-3-15",
        "english": "couple*",
        "phonetic": "/ˈkʌpl/",
        "partOfSpeech": "n.",
        "chinese": "（一）对，（一）双；夫妇； v. 连接，联合，结合；结婚",
        "example": ""
      },
      {
        "id": "word-3-58",
        "english": "mechanism",
        "phonetic": "/ˈmekənɪzəm/",
        "partOfSpeech": "n.",
        "chinese": "机械装置；机制，机理；办法",
        "example": ""
      },
      {
        "id": "word-3-34",
        "english": "cosset*",
        "phonetic": "/ˈkɔsɪt/",
        "partOfSpeech": "vt.",
        "chinese": "宠爱，溺爱 n. 宠儿",
        "example": ""
      },
      {
        "id": "word-3-26",
        "english": "compulsory",
        "phonetic": "/kəmˈpʌlsərɪ/",
        "partOfSpeech": "a.",
        "chinese": "义务的；必须做的；强制性的；（课程）必修的",
        "example": ""
      },
      {
        "id": "word-4-18",
        "english": "counter*",
        "phonetic": "/ˈkauntə(r)/",
        "partOfSpeech": "n.",
        "chinese": "柜台 ad. 相反",
        "example": ""
      },
      {
        "id": "word-3-11",
        "english": "internship*",
        "phonetic": "['ɪntɜːnʃɪp]",
        "partOfSpeech": "n.",
        "chinese": "实习身份；实习医师",
        "example": ""
      },
      {
        "id": "word-4-52",
        "english": "ignorant",
        "phonetic": "/ˈɪgnərənt/",
        "partOfSpeech": "a.",
        "chinese": "无知的；愚昧的",
        "example": ""
      },
      {
        "id": "word-4-14",
        "english": "concept*",
        "phonetic": "/ˈkɔnsept/",
        "partOfSpeech": "n.",
        "chinese": "概念，观念；设想",
        "example": ""
      },
      {
        "id": "word-4-76",
        "english": "comb*",
        "phonetic": "/kəum/",
        "partOfSpeech": "n.",
        "chinese": "梳子；蜂巢；（鸡等的）肉冠，冠状物 v. 梳理；搜寻，彻底搜查",
        "example": ""
      },
      {
        "id": "word-4-2",
        "english": "vertebrate*",
        "phonetic": "[ˈvɜ:tɪbrət]",
        "partOfSpeech": "n.",
        "chinese": "脊柱动物 a. 有脊柱的",
        "example": ""
      },
      {
        "id": "word-4-67",
        "english": "preparation",
        "phonetic": "/ˏprepəˈreɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "准备（工作），预备；制剂",
        "example": ""
      },
      {
        "id": "word-4-29",
        "english": "ambition*",
        "phonetic": "/æmˈbɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "雄心，抱负；野心",
        "example": ""
      },
      {
        "id": "word-3-75",
        "english": "ion*",
        "phonetic": "/ˈaɪən/",
        "partOfSpeech": "n.",
        "chinese": "离子",
        "example": ""
      },
      {
        "id": "word-3-21",
        "english": "tablet",
        "phonetic": "/ˈtæblɪt/",
        "partOfSpeech": "n.",
        "chinese": "药片",
        "example": ""
      },
      {
        "id": "word-3-60",
        "english": "furniture",
        "phonetic": "/ˈfɜːnɪtʃə(r)/",
        "partOfSpeech": "n.",
        "chinese": "家具",
        "example": ""
      },
      {
        "id": "word-4-1",
        "english": "incredible",
        "phonetic": "/ɪnˈkredəbl/",
        "partOfSpeech": "a.",
        "chinese": "不可信的；难以置信的",
        "example": ""
      },
      {
        "id": "word-4-38",
        "english": "mould*",
        "phonetic": "/məuld/",
        "partOfSpeech": "n.",
        "chinese": "霉，霉菌；模型，铸模；（人的）性格，气质 v. 用模子制作，浇铸；使形成，把……塑造成",
        "example": ""
      },
      {
        "id": "word-3-5",
        "english": "spring*",
        "phonetic": "/sprɪŋ/",
        "partOfSpeech": "n.",
        "chinese": "春天，春季；弹簧，发条；弹性，弹力；（源）泉；跳跃 v. 跳跃；涌现，突然出现；突然提出（或说出）",
        "example": ""
      },
      {
        "id": "word-3-18",
        "english": "commercial*",
        "phonetic": "/kəˈmɜːʃl/",
        "partOfSpeech": "a.",
        "chinese": "商业的，商品化的，贸易的 n. 商业广告",
        "example": ""
      },
      {
        "id": "word-3-31",
        "english": "induce*",
        "phonetic": "/ɪnˈdjuːs/",
        "partOfSpeech": "vt.",
        "chinese": "引诱，劝使；引起，导致；感应",
        "example": ""
      },
      {
        "id": "word-3-33",
        "english": "disharmony",
        "phonetic": "/dɪsˈhɑːmənɪ/",
        "partOfSpeech": "n.",
        "chinese": "不一致；不和谐",
        "example": ""
      },
      {
        "id": "word-3-41",
        "english": "inclusive*",
        "phonetic": "/ɪnˈkluːsɪv/",
        "partOfSpeech": "a.",
        "chinese": "包括一切费用在内的；所有数目（或首尾日期）包括在内的；包容广阔的",
        "example": ""
      },
      {
        "id": "word-3-10",
        "english": "theoretical*",
        "phonetic": "/ˏθɪəˈretɪkl/",
        "partOfSpeech": "a.",
        "chinese": "理论（上）的",
        "example": ""
      },
      {
        "id": "word-3-29",
        "english": "muddle*",
        "phonetic": "/ˈmʌdl/",
        "partOfSpeech": "n.",
        "chinese": "一团糟，凌乱，混乱；（头脑）糊涂，困惑 vt. 将……弄成一团糟；使困惑，使糊涂；混淆",
        "example": ""
      },
      {
        "id": "word-3-37",
        "english": "atomic",
        "phonetic": "/əˈtɔmɪk/",
        "partOfSpeech": "a.",
        "chinese": "原子（能）的",
        "example": ""
      },
      {
        "id": "word-4-71",
        "english": "outward",
        "phonetic": "/ˈautwəd/",
        "partOfSpeech": "a.",
        "chinese": "外面的；外表的，表面的",
        "example": ""
      },
      {
        "id": "word-3-69",
        "english": "pronounceable",
        "phonetic": "[prə'naʊnsəbl]",
        "partOfSpeech": "a.",
        "chinese": "（指声音）发得出的；（指词）可发音的",
        "example": ""
      },
      {
        "id": "word-3-40",
        "english": "silt*",
        "phonetic": "/sɪlt/",
        "partOfSpeech": "n.",
        "chinese": "淤泥 v. （用淤泥）阻塞",
        "example": ""
      },
      {
        "id": "word-3-50",
        "english": "leisure*",
        "phonetic": "/ˈleʒə(r)/",
        "partOfSpeech": "n.",
        "chinese": "空闲时间；悠闲",
        "example": ""
      },
      {
        "id": "word-4-13",
        "english": "intersection",
        "phonetic": "[‚ɪntə(r)'sekʃn]",
        "partOfSpeech": "n.",
        "chinese": "道路交叉口，十字路口",
        "example": ""
      },
      {
        "id": "word-3-6",
        "english": "biological",
        "phonetic": "/ˏbaɪəˈlɔdʒɪkl/",
        "partOfSpeech": "a.",
        "chinese": "生物的；生物学的，有关生物学的",
        "example": ""
      },
      {
        "id": "word-4-66",
        "english": "resign",
        "phonetic": "/rɪˈzaɪn/",
        "partOfSpeech": "v.",
        "chinese": "辞职；辞去；放弃",
        "example": ""
      },
      {
        "id": "word-3-23",
        "english": "fold",
        "phonetic": "/fəuld/",
        "partOfSpeech": "v.",
        "chinese": "折叠 n. 皱；折",
        "example": ""
      },
      {
        "id": "word-3-32",
        "english": "exchange",
        "phonetic": "/ɪksˈtʃeɪndʒ/",
        "partOfSpeech": "v.",
        "chinese": "交换，调换；交易；兑换；交流；谈话，争论 n. 交换，调换；交易（所）；兑换（率）；交流",
        "example": ""
      },
      {
        "id": "word-4-46",
        "english": "pirate",
        "phonetic": "/ˈpaɪərət/",
        "partOfSpeech": "n.",
        "chinese": "侵犯版权者；海盗 vt. 盗用，盗版",
        "example": ""
      },
      {
        "id": "word-3-3",
        "english": "suffer*",
        "phonetic": "/ˈsʌfə(r)/",
        "partOfSpeech": "v.",
        "chinese": "遭受，忍受；忍耐；容许；患病；受损失",
        "example": ""
      },
      {
        "id": "word-4-5",
        "english": "outpost",
        "phonetic": "/ˈautpəust/",
        "partOfSpeech": "n.",
        "chinese": "前哨（站）；偏远村落",
        "example": ""
      },
      {
        "id": "word-3-20",
        "english": "lavatory",
        "phonetic": "/ˈlævətrɪ/",
        "partOfSpeech": "n.",
        "chinese": "盥洗室，厕所",
        "example": ""
      },
      {
        "id": "word-3-19",
        "english": "notion",
        "phonetic": "/ˈnəuʃn/",
        "partOfSpeech": "n.",
        "chinese": "概念，观念；想法",
        "example": ""
      },
      {
        "id": "word-4-32",
        "english": "counsellor*",
        "phonetic": "/ˈkaunsələ(r)/",
        "partOfSpeech": "n.",
        "chinese": "顾问，辅导顾问",
        "example": ""
      },
      {
        "id": "word-4-63",
        "english": "representative*",
        "phonetic": "/ˏreprɪˈzentətɪv/",
        "partOfSpeech": "n.",
        "chinese": "代表，代理人 a. 典型的，有代表性的",
        "example": ""
      },
      {
        "id": "word-3-4",
        "english": "impede*",
        "phonetic": "/ɪmˈpiːd/",
        "partOfSpeech": "vt.",
        "chinese": "阻碍，妨碍",
        "example": ""
      },
      {
        "id": "word-3-66",
        "english": "erosion",
        "phonetic": "[ɪ'rəʊʒn]",
        "partOfSpeech": "n.",
        "chinese": "腐蚀；磨损",
        "example": ""
      },
      {
        "id": "word-3-73",
        "english": "bulb*",
        "phonetic": "/bʌlb/",
        "partOfSpeech": "n.",
        "chinese": "灯泡",
        "example": ""
      },
      {
        "id": "word-4-44",
        "english": "substitute",
        "phonetic": "/ˈsʌbstɪtjuːt/",
        "partOfSpeech": "v.",
        "chinese": "代替，替换 n. 代替者，代替物，代用品",
        "example": ""
      },
      {
        "id": "word-3-56",
        "english": "represent*",
        "phonetic": "/ˏreprɪˈzent/",
        "partOfSpeech": "vt.",
        "chinese": "代表；表示；表现",
        "example": ""
      },
      {
        "id": "word-3-63",
        "english": "strengthen",
        "phonetic": "['strŋθn]",
        "partOfSpeech": "vt.",
        "chinese": "加强，巩固",
        "example": ""
      },
      {
        "id": "word-3-53",
        "english": "tune",
        "phonetic": "/tjuːn/",
        "partOfSpeech": "vt.",
        "chinese": "调音；调节，调整 n. 调子；和谐",
        "example": ""
      },
      {
        "id": "word-3-57",
        "english": "vanish*",
        "phonetic": "/ˈvænɪʃ/",
        "partOfSpeech": "vi.",
        "chinese": "突然消失； 不复存在，消逝",
        "example": ""
      },
      {
        "id": "word-4-65",
        "english": "finance*",
        "phonetic": "/ˈfaɪnæns/",
        "partOfSpeech": "vt.",
        "chinese": "为……提供资金 n. 财政，金融； [常pl.] 财务情况",
        "example": ""
      },
      {
        "id": "word-3-54",
        "english": "strike",
        "phonetic": "/straɪk/",
        "partOfSpeech": "v.",
        "chinese": "打；折磨 n. 罢工",
        "example": ""
      },
      {
        "id": "word-4-64",
        "english": "reverse*",
        "phonetic": "/rɪˈvɜːs/",
        "partOfSpeech": "n.",
        "chinese": "相反，颠倒；背面，后面 a. 相反的；倒转的，颠倒的 v. 颠倒，（使）倒退",
        "example": ""
      },
      {
        "id": "word-3-72",
        "english": "hose*",
        "phonetic": "/həuz/",
        "partOfSpeech": "n.",
        "chinese": "软管 vt. 用软管淋",
        "example": ""
      },
      {
        "id": "word-4-3",
        "english": "industrious",
        "phonetic": "/ɪnˈdʌstrɪəs/",
        "partOfSpeech": "a.",
        "chinese": "勤奋的，勤勉的，勤劳的",
        "example": ""
      },
      {
        "id": "word-3-52",
        "english": "counterpart*",
        "phonetic": "/ˈkauntəpɑːt/",
        "partOfSpeech": "n.",
        "chinese": "与对方地位相当的人；配对物；副本",
        "example": ""
      },
      {
        "id": "word-3-67",
        "english": "exclusively",
        "phonetic": "[ɪk'skluːsɪvlɪ]",
        "partOfSpeech": "ad.",
        "chinese": "专有地，专门地",
        "example": ""
      },
      {
        "id": "word-3-51",
        "english": "overlap",
        "phonetic": "/ˏəuvəˈlæp/",
        "partOfSpeech": "v.",
        "chinese": "（使）部分重叠，交叠",
        "example": ""
      },
      {
        "id": "word-4-39",
        "english": "potential*",
        "phonetic": "/pəˈtenʃl/",
        "partOfSpeech": "a.",
        "chinese": "潜在的；可能的 n. 潜力，潜能",
        "example": ""
      },
      {
        "id": "word-4-30",
        "english": "range*",
        "phonetic": "/reɪndʒ/",
        "partOfSpeech": "n.",
        "chinese": "范围，领域；系列；（山）脉；射程 v.（在一定范围内）变化，变动；排列",
        "example": ""
      },
      {
        "id": "word-3-70",
        "english": "bare*",
        "phonetic": "/beə(r)/",
        "partOfSpeech": "a.",
        "chinese": "赤裸的，光秃的",
        "example": ""
      },
      {
        "id": "word-4-34",
        "english": "wastage*",
        "phonetic": "/ˈweɪstɪdʒ/",
        "partOfSpeech": "n.",
        "chinese": "消耗量；损耗；（雇员的）减员",
        "example": ""
      },
      {
        "id": "word-4-51",
        "english": "decrepit*",
        "phonetic": "/dɪˈkrepɪt/",
        "partOfSpeech": "a.",
        "chinese": "破旧的；衰老的",
        "example": ""
      },
      {
        "id": "word-3-47",
        "english": "gadget*",
        "phonetic": "/ˈgædʒɪt/",
        "partOfSpeech": "n.",
        "chinese": "小巧的器械，精巧的装置；小玩意",
        "example": ""
      },
      {
        "id": "word-4-4",
        "english": "intestine",
        "phonetic": "/ɪnˈtestɪn/",
        "partOfSpeech": "n.",
        "chinese": "[解]肠",
        "example": ""
      },
      {
        "id": "word-4-24",
        "english": "essay",
        "phonetic": "/ˈeseɪ/",
        "partOfSpeech": "n.",
        "chinese": "（作为课程作业的）短文、文章；评论文",
        "example": ""
      },
      {
        "id": "word-4-21",
        "english": "expel",
        "phonetic": "/ɪkˈspel/",
        "partOfSpeech": "vt.",
        "chinese": "把……开除；驱逐",
        "example": ""
      },
      {
        "id": "word-3-65",
        "english": "unaware*",
        "phonetic": "/ˏʌnəˈweə(r)/",
        "partOfSpeech": "a.",
        "chinese": "未意识到的",
        "example": ""
      },
      {
        "id": "word-3-62",
        "english": "typical*",
        "phonetic": "/ˈtɪpɪkl/",
        "partOfSpeech": "a.",
        "chinese": "典型的",
        "example": ""
      },
      {
        "id": "word-3-78",
        "english": "shave",
        "phonetic": "/ʃeɪv/",
        "partOfSpeech": "n./v.",
        "chinese": "修面",
        "example": ""
      },
      {
        "id": "word-3-49",
        "english": "legacy*",
        "phonetic": "/ˈlegəsɪ/",
        "partOfSpeech": "n.",
        "chinese": "遗产，遗赠",
        "example": ""
      },
      {
        "id": "word-4-59",
        "english": "recruit*",
        "phonetic": "/rɪˈkruːt/",
        "partOfSpeech": "v.",
        "chinese": "招募（新兵），招收（新成员）；复原，恢复；补充 n. 新兵，新成员，新会员",
        "example": ""
      },
      {
        "id": "word-3-59",
        "english": "dispute*",
        "phonetic": "/dɪˈspjuːt/",
        "partOfSpeech": "n.",
        "chinese": "争论，争端，争吵 v. 对……表示异议；争论，争吵",
        "example": ""
      },
      {
        "id": "word-4-75",
        "english": "anthropologist*",
        "phonetic": "[‚ænθrə'pɒlədʒɪst]",
        "partOfSpeech": "n.",
        "chinese": "人类学家",
        "example": ""
      },
      {
        "id": "word-4-27",
        "english": "attain",
        "phonetic": "/əˈteɪn/",
        "partOfSpeech": "vt.",
        "chinese": "达到；获得；完成",
        "example": ""
      },
      {
        "id": "word-4-11",
        "english": "organic*",
        "phonetic": "/ɔːˈgænɪk/",
        "partOfSpeech": "a.",
        "chinese": "器官的；有机的；有机体的；组织的",
        "example": ""
      },
      {
        "id": "word-4-6",
        "english": "general*",
        "phonetic": "/ˈdʒenrəl/",
        "partOfSpeech": "a.",
        "chinese": "一般的，普通的；全体的，普遍的；大体的，概括的；首席的 n. 将军",
        "example": ""
      },
      {
        "id": "word-4-72",
        "english": "consequently*",
        "phonetic": "[ˈkɔnsikwəntli]",
        "partOfSpeech": "ad.",
        "chinese": "因此，因而",
        "example": ""
      },
      {
        "id": "word-4-70",
        "english": "judgment",
        "phonetic": "['dʒʌdʒmənt]",
        "partOfSpeech": "n.",
        "chinese": "意见；审判；判断（力）",
        "example": ""
      },
      {
        "id": "word-4-15",
        "english": "cardiovascular*",
        "phonetic": "[ˌkɑ:diəʊˈvæskjələ(r)]",
        "partOfSpeech": "a.",
        "chinese": "心血管的",
        "example": ""
      },
      {
        "id": "word-4-69",
        "english": "thrive*",
        "phonetic": "/θraɪv/",
        "partOfSpeech": "vi.",
        "chinese": "兴旺，繁荣",
        "example": ""
      },
      {
        "id": "word-4-57",
        "english": "quote*",
        "phonetic": "/kwəut/",
        "partOfSpeech": "n.",
        "chinese": "引文，引语；估价，报价； [pl.] 引号 v. 引用，引述，引证；提出，提供；报价",
        "example": ""
      },
      {
        "id": "word-4-56",
        "english": "precision*",
        "phonetic": "/prɪˈsɪʒn/",
        "partOfSpeech": "n.",
        "chinese": "准确，精确；精确度",
        "example": ""
      },
      {
        "id": "word-4-12",
        "english": "trapeze*",
        "phonetic": "/trəˈpiːz/",
        "partOfSpeech": "n.",
        "chinese": "高空秋千；吊架",
        "example": ""
      },
      {
        "id": "word-4-42",
        "english": "brief",
        "phonetic": "/briːf/",
        "partOfSpeech": "a.",
        "chinese": "短时间的，短暂的；简短的，简洁的 n. 概要，摘要 vt. 向……介绍基本情况，为……提供资讯",
        "example": ""
      },
      {
        "id": "word-4-41",
        "english": "ambitious*",
        "phonetic": "/æmˈbɪʃəs/",
        "partOfSpeech": "a.",
        "chinese": "有抱负的，有雄心的，有野心的",
        "example": ""
      },
      {
        "id": "word-4-17",
        "english": "lecture*",
        "phonetic": "/ˈlektʃə(r)/",
        "partOfSpeech": "n.",
        "chinese": "演讲，讲课",
        "example": ""
      },
      {
        "id": "word-4-35",
        "english": "earthquake",
        "phonetic": "/ˈɜːθkweɪk/",
        "partOfSpeech": "n.",
        "chinese": "地震",
        "example": ""
      },
      {
        "id": "word-4-28",
        "english": "divisional*",
        "phonetic": "/dɪ'vɪʒənl/",
        "partOfSpeech": "a.",
        "chinese": "部门的",
        "example": ""
      },
      {
        "id": "word-4-37",
        "english": "regulate",
        "phonetic": "/ˈregjuleɪt/",
        "partOfSpeech": "v.",
        "chinese": "管制，控制；调节，校准；调整",
        "example": ""
      },
      {
        "id": "word-4-10",
        "english": "convention*",
        "phonetic": "/kənˈvenʃn/",
        "partOfSpeech": "n.",
        "chinese": "大会，会议；惯例，常规，习俗；公约，协定",
        "example": ""
      },
      {
        "id": "word-4-49",
        "english": "imaginative",
        "phonetic": "[ɪ'mædʒɪnətɪv]",
        "partOfSpeech": "a.",
        "chinese": "富有想象力的；创新的",
        "example": ""
      },
      {
        "id": "word-4-68",
        "english": "eyesight",
        "phonetic": "[ˈaɪsaɪt]",
        "partOfSpeech": "n.",
        "chinese": "视力",
        "example": ""
      },
      {
        "id": "word-4-77",
        "english": "suitably*",
        "phonetic": "[ˈsu:təbli]",
        "partOfSpeech": "ad.",
        "chinese": "合适地，适宜地，相称地",
        "example": ""
      },
      {
        "id": "word-3-22",
        "english": "actual*",
        "phonetic": "/ˈæktʃuəl/",
        "partOfSpeech": "a.",
        "chinese": "实际的；真实的",
        "example": ""
      }
    ],
    "article": unit2Article
  },
  {
    "id": "unit-3",
    "name": "Unit 3: Word Lists 5 & 6",
    "words": [
      {
        "id": "word-5-11",
        "english": "migratory*",
        "phonetic": "/'maɪgrətrɪ/",
        "partOfSpeech": "a.",
        "chinese": "迁徙的，迁居的；流动的，游牧的",
        "example": ""
      },
      {
        "id": "word-6-2",
        "english": "appropriate*",
        "phonetic": "/əˈprəuprɪət/",
        "partOfSpeech": "a.",
        "chinese": "适当的 /əˈprəuprɪeɪt/ vt. 占有，挪用；拨出（款项）",
        "example": ""
      },
      {
        "id": "word-6-9",
        "english": "purchase*",
        "phonetic": "/ˈpɜːtʃəs/",
        "partOfSpeech": "vt.",
        "chinese": "买，购买 n. 购买的物品",
        "example": ""
      },
      {
        "id": "word-6-29",
        "english": "approximately*",
        "phonetic": "[əˈprɒksɪmətli]",
        "partOfSpeech": "ad.",
        "chinese": "近似，大约",
        "example": ""
      },
      {
        "id": "word-5-44",
        "english": "transfer*",
        "phonetic": "/trænsˈfɜː(r)/",
        "partOfSpeech": "v.",
        "chinese": "搬，转移；调动，转学；转让，过户；转车，换乘 /ˈtrænsfɜː(r)/ n. 转移；调动；转车，换乘",
        "example": ""
      },
      {
        "id": "word-6-66",
        "english": "naked",
        "phonetic": "/ˈneɪkɪd/",
        "partOfSpeech": "a.",
        "chinese": "裸体的，无遮蔽的",
        "example": ""
      },
      {
        "id": "word-5-43",
        "english": "concern*",
        "phonetic": "/kənˈsɜːn/",
        "partOfSpeech": "vt.",
        "chinese": "涉及；使关心；让（人）担忧 n. 关心；关注",
        "example": ""
      },
      {
        "id": "word-5-29",
        "english": "lever",
        "phonetic": "/ˈliːvə(r)/",
        "partOfSpeech": "vt.",
        "chinese": "（用杠杆）撬动 n. 杠杆；施压手段",
        "example": ""
      },
      {
        "id": "word-6-48",
        "english": "concentrate*",
        "phonetic": "/ˈkɔnsntreɪt/",
        "partOfSpeech": "v.",
        "chinese": "全神贯注，全力以赴；集中，聚焦；浓缩 n. 浓缩物，浓缩液",
        "example": ""
      },
      {
        "id": "word-6-39",
        "english": "soluble",
        "phonetic": "/ˈsɔljubl/",
        "partOfSpeech": "a.",
        "chinese": "可溶的；可解决的",
        "example": ""
      },
      {
        "id": "word-6-22",
        "english": "benefit*",
        "phonetic": "/ˈbenɪfɪt/",
        "partOfSpeech": "v.",
        "chinese": "使受益；有益于，得益于 n. 益处，好处；恩惠；救济金，保险金，津贴",
        "example": ""
      },
      {
        "id": "word-5-18",
        "english": "shareholder",
        "phonetic": "[ˈʃeəhəʊldə(r)]",
        "partOfSpeech": "n.",
        "chinese": "股票持有人；股东",
        "example": ""
      },
      {
        "id": "word-6-40",
        "english": "administration*",
        "phonetic": "/ədˏmɪnɪˈstreɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "管理（部门）；行政（机关）",
        "example": ""
      },
      {
        "id": "word-5-49",
        "english": "former*",
        "phonetic": "/ˈfɔːmə(r)/",
        "partOfSpeech": "a.",
        "chinese": "以前的 n. 前者",
        "example": ""
      },
      {
        "id": "word-5-51",
        "english": "sore",
        "phonetic": "/sɔː(r)/",
        "partOfSpeech": "a.",
        "chinese": "痛的；恼火的；剧烈的 n. 疮",
        "example": ""
      },
      {
        "id": "word-5-10",
        "english": "specialist*",
        "phonetic": "/'speʃəlɪst/",
        "partOfSpeech": "n.",
        "chinese": "专家；专科医生",
        "example": ""
      },
      {
        "id": "word-6-24",
        "english": "distribution*",
        "phonetic": "[ˌdɪstrɪ'bju:ʃn]",
        "partOfSpeech": "n.",
        "chinese": "分发，分配；配给物；散布，分布",
        "example": ""
      },
      {
        "id": "word-6-56",
        "english": "enhance",
        "phonetic": "/ɪnˈhɑːns/",
        "partOfSpeech": "vt.",
        "chinese": "提高，增强；增进",
        "example": ""
      },
      {
        "id": "word-6-41",
        "english": "environment*",
        "phonetic": "/ɪnˈvaɪərənmənt/",
        "partOfSpeech": "n.",
        "chinese": "周围状况；环境",
        "example": ""
      },
      {
        "id": "word-6-55",
        "english": "elastic",
        "phonetic": "/ɪˈlæstɪk/",
        "partOfSpeech": "a.",
        "chinese": "有弹性的；灵活的 n. 松紧带",
        "example": ""
      },
      {
        "id": "word-5-59",
        "english": "economical",
        "phonetic": "/ˏiːkəˈnɔmɪkl/",
        "partOfSpeech": "a.",
        "chinese": "节约的；经济的",
        "example": ""
      },
      {
        "id": "word-5-21",
        "english": "credit*",
        "phonetic": "/ˈkredɪt/",
        "partOfSpeech": "vt.",
        "chinese": "记入贷方；把……归于 n. 信用贷款，赊欠；信任，相信；贷方；荣誉，名望；光荣，功劳；学分",
        "example": ""
      },
      {
        "id": "word-6-5",
        "english": "literacy*",
        "phonetic": "/ˈlɪtərəsɪ/",
        "partOfSpeech": "n.",
        "chinese": "有文化；有教养；读写能力",
        "example": ""
      },
      {
        "id": "word-5-27",
        "english": "world-wide",
        "phonetic": "['wɜ:ldw'aɪd]",
        "partOfSpeech": "a./ad.",
        "chinese": "遍及全球的/地",
        "example": ""
      },
      {
        "id": "word-6-7",
        "english": "luxury*",
        "phonetic": "/ˈlʌkʃərɪ/",
        "partOfSpeech": "n.",
        "chinese": "豪华（品）；奢侈（品） a. 奢华的",
        "example": ""
      },
      {
        "id": "word-6-16",
        "english": "shutter*",
        "phonetic": "/ˈʃʌtə(r)/",
        "partOfSpeech": "n.",
        "chinese": "百叶窗；（照相机的）快门",
        "example": ""
      },
      {
        "id": "word-6-4",
        "english": "depict",
        "phonetic": "/dɪˈpɪkt/",
        "partOfSpeech": "vt.",
        "chinese": "描绘，描述",
        "example": ""
      },
      {
        "id": "word-6-54",
        "english": "turret",
        "phonetic": "/ˈtʌrɪt/",
        "partOfSpeech": "n.",
        "chinese": "塔楼，角楼",
        "example": ""
      },
      {
        "id": "word-5-60",
        "english": "fate*",
        "phonetic": "/feɪt/",
        "partOfSpeech": "n.",
        "chinese": "命运，天数",
        "example": ""
      },
      {
        "id": "word-6-46",
        "english": "specific",
        "phonetic": "/spəˈsɪfɪk/",
        "partOfSpeech": "a.",
        "chinese": "特定的；明确的",
        "example": ""
      },
      {
        "id": "word-5-9",
        "english": "repaint*",
        "phonetic": "[ri:'peɪnt]",
        "partOfSpeech": "v.",
        "chinese": "重新油漆，重画",
        "example": ""
      },
      {
        "id": "word-5-2",
        "english": "privilege",
        "phonetic": "/ˈprɪvəlɪdʒ/",
        "partOfSpeech": "n.",
        "chinese": "特权，优惠，特许 vt. 给予特权，特别优待",
        "example": ""
      },
      {
        "id": "word-5-25",
        "english": "explosive*",
        "phonetic": "/ɪkˈspləusɪv/",
        "partOfSpeech": "n.",
        "chinese": "爆炸物，炸药 a. 爆炸的，爆发的；使人冲动的",
        "example": ""
      },
      {
        "id": "word-6-17",
        "english": "demolish*",
        "phonetic": "/dɪˈmɔlɪʃ/",
        "partOfSpeech": "vt.",
        "chinese": "破坏；拆除；驳倒（论点等），推翻",
        "example": ""
      },
      {
        "id": "word-5-6",
        "english": "expand*",
        "phonetic": "/ɪkˈspænd/",
        "partOfSpeech": "v.",
        "chinese": "（使）膨胀，（使）扩张；张开，展开；详述",
        "example": ""
      },
      {
        "id": "word-5-48",
        "english": "hide",
        "phonetic": "/haɪd/",
        "partOfSpeech": "v.",
        "chinese": "（躲）藏 n. 皮革，兽皮",
        "example": ""
      },
      {
        "id": "word-5-71",
        "english": "disappointing*",
        "phonetic": "[ˌdɪsəˈpɔɪntɪŋ]",
        "partOfSpeech": "a.",
        "chinese": "令人失望的",
        "example": ""
      },
      {
        "id": "word-6-10",
        "english": "constant*",
        "phonetic": "/ˈkɔnstənt/",
        "partOfSpeech": "a.",
        "chinese": "经常的，不断的；坚定的，永恒的，忠实的；持续的，不变的 n. 常数，恒量",
        "example": ""
      },
      {
        "id": "word-6-13",
        "english": "subscription*",
        "phonetic": "[səbˈskrɪpʃn]",
        "partOfSpeech": "n.",
        "chinese": "订阅，订购；订阅费，订购款；捐赠，捐助；签字，签署",
        "example": ""
      },
      {
        "id": "word-5-33",
        "english": "truant*",
        "phonetic": "/ˈtruːənt/",
        "partOfSpeech": "vi.",
        "chinese": "逃避责任；旷课 n. 逃学者；逃避者",
        "example": ""
      },
      {
        "id": "word-5-17",
        "english": "rear*",
        "phonetic": "/rɪə(r)/",
        "partOfSpeech": "a.",
        "chinese": "后方的，后部的；背后的 n. 后部，尾部 v. 饲养，抚养；种植",
        "example": ""
      },
      {
        "id": "word-5-46",
        "english": "evaporate*",
        "phonetic": "/ɪˈvæpəreɪt/",
        "partOfSpeech": "v.",
        "chinese": "（使）蒸发；消失；不复存在",
        "example": ""
      },
      {
        "id": "word-5-8",
        "english": "intern*",
        "phonetic": "/ɪnˈtɜːn/",
        "partOfSpeech": "vt.",
        "chinese": "拘禁，软禁 /ˈɪntɜːn/ n. 实习生",
        "example": ""
      },
      {
        "id": "word-5-47",
        "english": "destiny",
        "phonetic": "/ˈdestɪnɪ/",
        "partOfSpeech": "n.",
        "chinese": "命运，定数",
        "example": ""
      },
      {
        "id": "word-6-20",
        "english": "circulation",
        "phonetic": "/ˏsɜːkjuˈleɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "（体液的）循环，（水、空气等的）流通；流传，传播；发行，发行量",
        "example": ""
      },
      {
        "id": "word-5-36",
        "english": "tenant*",
        "phonetic": "/ˈtenənt/",
        "partOfSpeech": "n.",
        "chinese": "承租人；房客；佃户",
        "example": ""
      },
      {
        "id": "word-6-64",
        "english": "mainly*",
        "phonetic": "[ˈmeɪnli]",
        "partOfSpeech": "ad.",
        "chinese": "大体上，主要地",
        "example": ""
      },
      {
        "id": "word-6-23",
        "english": "decay*",
        "phonetic": "/dɪˈkeɪ/",
        "partOfSpeech": "n.",
        "chinese": "腐烂，腐朽；衰败（或衰退）状态 v. 腐烂，腐朽；衰败，衰退",
        "example": ""
      },
      {
        "id": "word-6-69",
        "english": "coordinator*",
        "phonetic": "[kəʊ'ɔ:dɪneɪtə]",
        "partOfSpeech": "n.",
        "chinese": "协调者",
        "example": ""
      },
      {
        "id": "word-6-50",
        "english": "antidote*",
        "phonetic": "/ˈæntɪdəut/",
        "partOfSpeech": "n.",
        "chinese": "解毒药；矫正方法",
        "example": ""
      },
      {
        "id": "word-6-51",
        "english": "discover*",
        "phonetic": "/dɪsˈkʌvə(r)/",
        "partOfSpeech": "vt.",
        "chinese": "发现，找到；发觉",
        "example": ""
      },
      {
        "id": "word-5-20",
        "english": "alight*",
        "phonetic": "/əˈlaɪt/",
        "partOfSpeech": "a.",
        "chinese": "点着的 vi. 降落，飞落；从（公共汽车等）下来",
        "example": ""
      },
      {
        "id": "word-5-72",
        "english": "delta",
        "phonetic": "/ˈdeltə/",
        "partOfSpeech": "n.",
        "chinese": "三角洲；希腊字母表的第四个字母",
        "example": ""
      },
      {
        "id": "word-5-52",
        "english": "virtually",
        "phonetic": "[ˈvɜ:tʃuəli]",
        "partOfSpeech": "ad.",
        "chinese": "几乎，差不多；实际上，事实上",
        "example": ""
      },
      {
        "id": "word-5-15",
        "english": "widespread",
        "phonetic": "[ˈwaɪdspred]",
        "partOfSpeech": "a.",
        "chinese": "分布广的；普遍的",
        "example": ""
      },
      {
        "id": "word-5-16",
        "english": "hazard",
        "phonetic": "/ˈhæzəd/",
        "partOfSpeech": "n.",
        "chinese": "危险，冒险 v. 尝试着做（或提出）；冒……风险",
        "example": ""
      },
      {
        "id": "word-5-34",
        "english": "scandal*",
        "phonetic": "/ˈskændl/",
        "partOfSpeech": "n.",
        "chinese": "丑事，丑闻；恶意诽谤；流言飞语；反感，愤慨",
        "example": ""
      },
      {
        "id": "word-6-28",
        "english": "stuffy*",
        "phonetic": "/ˈstʌfɪ/",
        "partOfSpeech": "a.",
        "chinese": "不透气的，（空气）不新鲜的，不通风的；乏味的",
        "example": ""
      },
      {
        "id": "word-6-65",
        "english": "property",
        "phonetic": "/ˈprɔpətɪ/",
        "partOfSpeech": "n.",
        "chinese": "财产，所有物；性质，特性；房产，地产",
        "example": ""
      },
      {
        "id": "word-6-21",
        "english": "tradition*",
        "phonetic": "/trəˈdɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "传统；惯例",
        "example": ""
      },
      {
        "id": "word-5-40",
        "english": "immigrant",
        "phonetic": "[ˈɪmɪgrənt]",
        "partOfSpeech": "n.",
        "chinese": "移民；侨民",
        "example": ""
      },
      {
        "id": "word-5-1",
        "english": "pulley",
        "phonetic": "/ˈpulɪ/",
        "partOfSpeech": "n.",
        "chinese": "滑轮；滑车",
        "example": ""
      },
      {
        "id": "word-5-74",
        "english": "compliment*",
        "phonetic": "/ˈkɔmplɪmənt/",
        "partOfSpeech": "n.",
        "chinese": "赞美； [pl.] 问候，祝贺",
        "example": ""
      },
      {
        "id": "word-6-25",
        "english": "defect",
        "phonetic": "/ˈdiːfekt/",
        "partOfSpeech": "n.",
        "chinese": "缺点，不足之处 /dɪˈfekt/ vi. 叛变",
        "example": ""
      },
      {
        "id": "word-6-68",
        "english": "lens*",
        "phonetic": "/lenz/",
        "partOfSpeech": "n.",
        "chinese": "透镜；镜片；镜头",
        "example": ""
      },
      {
        "id": "word-5-7",
        "english": "trap*",
        "phonetic": "/træp/",
        "partOfSpeech": "n.",
        "chinese": "陷阱，圈套，诡计 vt. 诱捕，诱骗，使中圈套；使陷入困境，使受限制",
        "example": ""
      },
      {
        "id": "word-6-35",
        "english": "cooperative*",
        "phonetic": "/kəuˈɔpərətɪv/",
        "partOfSpeech": "a.",
        "chinese": "合作的，协作的 n. 合作社",
        "example": ""
      },
      {
        "id": "word-5-12",
        "english": "nutrition*",
        "phonetic": "/njuˈtrɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "营养；营养学",
        "example": ""
      },
      {
        "id": "word-5-57",
        "english": "slum*",
        "phonetic": "/slʌm/",
        "partOfSpeech": "n.",
        "chinese": "贫民窟，贫民区",
        "example": ""
      },
      {
        "id": "word-5-45",
        "english": "exotic",
        "phonetic": "/ɪgˈzɔtɪk/",
        "partOfSpeech": "a.",
        "chinese": "外来的；奇异的；醒目的，吸引人的",
        "example": ""
      },
      {
        "id": "word-5-54",
        "english": "windscreen",
        "phonetic": "[ˈwɪndskri:n]",
        "partOfSpeech": "n.",
        "chinese": "挡风玻璃；风档",
        "example": ""
      },
      {
        "id": "word-5-3",
        "english": "infrastructure*",
        "phonetic": "['ɪnfrəstrʌktʃə(r)]",
        "partOfSpeech": "n.",
        "chinese": "基础结构，基础设施",
        "example": ""
      },
      {
        "id": "word-5-39",
        "english": "bolster*",
        "phonetic": "/ˈbəulstə(r)/",
        "partOfSpeech": "vt.",
        "chinese": "支持，支撑；改善 n. 垫子",
        "example": ""
      },
      {
        "id": "word-6-38",
        "english": "except*",
        "phonetic": "/ɪkˈsept/",
        "partOfSpeech": "vt.",
        "chinese": "将……除外 prep. 除……外",
        "example": ""
      },
      {
        "id": "word-5-13",
        "english": "inlet",
        "phonetic": "/ˈɪnlet/",
        "partOfSpeech": "n.",
        "chinese": "入口；进（水）口，水湾",
        "example": ""
      },
      {
        "id": "word-5-5",
        "english": "qualification*",
        "phonetic": "/ˏkwɔlɪfɪˈkeɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "资格，合格；技能；限定，条件；合格证",
        "example": ""
      },
      {
        "id": "word-6-26",
        "english": "oppose",
        "phonetic": "/əˈpəuz/",
        "partOfSpeech": "v.",
        "chinese": "反对、反抗",
        "example": ""
      },
      {
        "id": "word-6-18",
        "english": "durable",
        "phonetic": "/ˈdjuərəbl/",
        "partOfSpeech": "n.",
        "chinese": "耐用品 a. 耐久的；耐用的",
        "example": ""
      },
      {
        "id": "word-5-55",
        "english": "decent",
        "phonetic": "/ˈdiːsnt/",
        "partOfSpeech": "a.",
        "chinese": "大方的，体面的，像样的；正派的，合乎礼仪的",
        "example": ""
      },
      {
        "id": "word-5-30",
        "english": "ethical*",
        "phonetic": "[ˈeθɪkl]",
        "partOfSpeech": "a.",
        "chinese": "（有关）道德的；伦理的",
        "example": ""
      },
      {
        "id": "word-6-8",
        "english": "souvenir",
        "phonetic": "/ˏsuːvəˈnɪə(r)/",
        "partOfSpeech": "n.",
        "chinese": "纪念品，纪念物",
        "example": ""
      },
      {
        "id": "word-5-61",
        "english": "medication*",
        "phonetic": "[ˌmedɪˈkeɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "药；药物",
        "example": ""
      },
      {
        "id": "word-5-35",
        "english": "latent*",
        "phonetic": "/ˈleɪtnt/",
        "partOfSpeech": "a.",
        "chinese": "潜在的，潜伏的，不易察觉的",
        "example": ""
      },
      {
        "id": "word-5-42",
        "english": "ecosystem*",
        "phonetic": "/ˈiːkəusɪstəm/",
        "partOfSpeech": "n.",
        "chinese": "生态系统",
        "example": ""
      },
      {
        "id": "word-6-30",
        "english": "excusable*",
        "phonetic": "[ɪkˈskju:zəbl]",
        "partOfSpeech": "a.",
        "chinese": "可原谅的；可谅解的；可容许的",
        "example": ""
      },
      {
        "id": "word-5-28",
        "english": "grope",
        "phonetic": "/grəup/",
        "partOfSpeech": "v.",
        "chinese": "（暗中）摸索",
        "example": ""
      },
      {
        "id": "word-5-41",
        "english": "sequence*",
        "phonetic": "/ˈsiːkwəns/",
        "partOfSpeech": "n.",
        "chinese": "一系列，一连串；顺序，次序",
        "example": ""
      },
      {
        "id": "word-6-3",
        "english": "annual*",
        "phonetic": "/ˈænjuəl/",
        "partOfSpeech": "a.",
        "chinese": "每年的，年度的 n. 年刊，年鉴；一年生植物",
        "example": ""
      },
      {
        "id": "word-5-70",
        "english": "stable*",
        "phonetic": "/ˈsteɪbl/",
        "partOfSpeech": "a.",
        "chinese": "稳定的，稳固的，安定的；沉稳的，持重的 n. 马厩",
        "example": ""
      },
      {
        "id": "word-5-66",
        "english": "shade",
        "phonetic": "/ʃeɪd/",
        "partOfSpeech": "n.",
        "chinese": "阴凉处；（灯）罩；暗部；色度；细微差别 vt. 遮蔽，遮光；把……涂暗",
        "example": ""
      },
      {
        "id": "word-5-62",
        "english": "target*",
        "phonetic": "/ˈtɑːgɪt/",
        "partOfSpeech": "n.",
        "chinese": "目标；对象，靶子 vt. 对准，面向",
        "example": ""
      },
      {
        "id": "word-6-11",
        "english": "dormancy*",
        "phonetic": "['dɔ:mənsɪ]",
        "partOfSpeech": "n.",
        "chinese": "休眠；催眠状态；冬眠；隐匿",
        "example": ""
      },
      {
        "id": "word-5-65",
        "english": "fossil",
        "phonetic": "/ˈfɔsl/",
        "partOfSpeech": "n.",
        "chinese": "化石；老顽固",
        "example": ""
      },
      {
        "id": "word-6-49",
        "english": "conflict*",
        "phonetic": "/ˈkɔnflɪkt/",
        "partOfSpeech": "n.",
        "chinese": "冲突 /kənˈflikt/ vi. 冲突，抵触",
        "example": ""
      },
      {
        "id": "word-5-26",
        "english": "inherent",
        "phonetic": "/ɪnˈhɪərənt/",
        "partOfSpeech": "a.",
        "chinese": "内在的；生来就有的",
        "example": ""
      },
      {
        "id": "word-6-53",
        "english": "continent",
        "phonetic": "/ˈkɔntɪnənt/",
        "partOfSpeech": "n.",
        "chinese": "大陆，陆地；洲",
        "example": ""
      },
      {
        "id": "word-6-34",
        "english": "atmospheric*",
        "phonetic": "/ˏætməsˈferɪk/",
        "partOfSpeech": "a.",
        "chinese": "大气的，空气的；大气层的；大气所引起的",
        "example": ""
      },
      {
        "id": "word-5-23",
        "english": "desert*",
        "phonetic": "/ˈdezət/",
        "partOfSpeech": "n.",
        "chinese": "沙漠；荒地 a. 沙漠的；荒凉的 /dɪˈzɜːt/ v. 舍弃",
        "example": ""
      },
      {
        "id": "word-5-38",
        "english": "campfire",
        "phonetic": "[ˈkæmpfaɪə(r)]]",
        "partOfSpeech": "n.",
        "chinese": "营火",
        "example": ""
      },
      {
        "id": "word-6-1",
        "english": "heritage",
        "phonetic": "/ˈherɪtɪdʒ/",
        "partOfSpeech": "n.",
        "chinese": "遗产；传统",
        "example": ""
      },
      {
        "id": "word-6-62",
        "english": "alcohol",
        "phonetic": "/ˈælkəhɔl/",
        "partOfSpeech": "n.",
        "chinese": "含酒精饮料，酒；酒精",
        "example": ""
      },
      {
        "id": "word-6-70",
        "english": "nourish",
        "phonetic": "/ˈnʌrɪʃ/",
        "partOfSpeech": "vt.",
        "chinese": "养育，滋养；培养（情绪、观点等）",
        "example": ""
      },
      {
        "id": "word-5-68",
        "english": "wean*",
        "phonetic": "/wiːn/",
        "partOfSpeech": "vt.",
        "chinese": "（使）断奶，（使）戒掉",
        "example": ""
      },
      {
        "id": "word-6-47",
        "english": "objective*",
        "phonetic": "/əbˈdʒektɪv/",
        "partOfSpeech": "n.",
        "chinese": "目标，目的 a. 客观的",
        "example": ""
      },
      {
        "id": "word-6-33",
        "english": "energetic*",
        "phonetic": "[ˌenəˈdʒetɪk]",
        "partOfSpeech": "a.",
        "chinese": "有力的，精力旺盛的；积极的",
        "example": ""
      },
      {
        "id": "word-5-56",
        "english": "alluvial*",
        "phonetic": "/əˈluːvɪəl/",
        "partOfSpeech": "a.",
        "chinese": "[地] 冲积的，淤积的 n. 冲积土（或层、矿床），淤积土",
        "example": ""
      },
      {
        "id": "word-5-32",
        "english": "vacant*",
        "phonetic": "/ˈveɪkənt/",
        "partOfSpeech": "a.",
        "chinese": "未占用的，空的",
        "example": ""
      },
      {
        "id": "word-5-67",
        "english": "headmaster*",
        "phonetic": "[ˌhedˈmɑ:stə(r)]",
        "partOfSpeech": "n.",
        "chinese": "（中小学）校长",
        "example": ""
      },
      {
        "id": "word-6-60",
        "english": "mishandle*",
        "phonetic": "/ˏmɪsˈhændl/",
        "partOfSpeech": "vt.",
        "chinese": "粗暴地对待；错误地处理，胡乱操作",
        "example": ""
      },
      {
        "id": "word-5-19",
        "english": "bid",
        "phonetic": "/bɪd/",
        "partOfSpeech": "n./v.",
        "chinese": "出价；投标",
        "example": ""
      },
      {
        "id": "word-6-36",
        "english": "corrode*",
        "phonetic": "/kəˈrəud/",
        "partOfSpeech": "v.",
        "chinese": "腐蚀；侵蚀",
        "example": ""
      },
      {
        "id": "word-5-69",
        "english": "comprise",
        "phonetic": "/kəmˈpraɪz/",
        "partOfSpeech": "vt.",
        "chinese": "包含；由……组成",
        "example": ""
      },
      {
        "id": "word-5-63",
        "english": "independent*",
        "phonetic": "/ˏɪndɪˈpendənt/",
        "partOfSpeech": "a.",
        "chinese": "独立的，自主的，不受约束的 n. 中立派，无党派议员",
        "example": ""
      },
      {
        "id": "word-5-53",
        "english": "tangibly*",
        "phonetic": "['tændʒəblɪ]",
        "partOfSpeech": "ad.",
        "chinese": "可触摸地；可感知地；有形地",
        "example": ""
      },
      {
        "id": "word-6-42",
        "english": "license",
        "phonetic": "/ˈlaɪsns/",
        "partOfSpeech": "n.",
        "chinese": "许可（证），执照 vt. 批准，准许",
        "example": ""
      },
      {
        "id": "word-6-19",
        "english": "cope*",
        "phonetic": "/kəup/",
        "partOfSpeech": "vi.",
        "chinese": "（成功地）应付；（妥善地）处理",
        "example": ""
      },
      {
        "id": "word-5-58",
        "english": "distill",
        "phonetic": "[dɪs'tɪl]",
        "partOfSpeech": "vt.",
        "chinese": "（使）蒸馏，提取",
        "example": ""
      },
      {
        "id": "word-5-14",
        "english": "censor*",
        "phonetic": "/ˈsensə(r)/",
        "partOfSpeech": "vt.",
        "chinese": "审查，检查（书报） n. 检查员",
        "example": ""
      },
      {
        "id": "word-5-4",
        "english": "allocate",
        "phonetic": "/ˈæləkeɪt/",
        "partOfSpeech": "vt.",
        "chinese": "分配；分派",
        "example": ""
      },
      {
        "id": "word-5-31",
        "english": "improvement*",
        "phonetic": "[ɪm'pru:vmənt]",
        "partOfSpeech": "n.",
        "chinese": "改进，进步；改进措施；改进处",
        "example": ""
      },
      {
        "id": "word-6-57",
        "english": "demonstration*",
        "phonetic": "/ˏdemənˈstreɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "论证，证明；示范；显示，表露；示威游行",
        "example": ""
      },
      {
        "id": "word-5-73",
        "english": "urban",
        "phonetic": "/ˈɜːbən/",
        "partOfSpeech": "a.",
        "chinese": "都市的；住在都市的",
        "example": ""
      },
      {
        "id": "word-5-37",
        "english": "psychiatric*",
        "phonetic": "[ˌsaɪkiˈætrɪk]",
        "partOfSpeech": "a.",
        "chinese": "精神病的；治疗精神病的",
        "example": ""
      },
      {
        "id": "word-5-22",
        "english": "shrewd",
        "phonetic": "/ʃruːd/",
        "partOfSpeech": "a.",
        "chinese": "机灵的；精明的",
        "example": ""
      },
      {
        "id": "word-5-75",
        "english": "execution",
        "phonetic": "/ˏeksɪˈkjuːʃn/",
        "partOfSpeech": "n.",
        "chinese": "执行，实施；处决",
        "example": ""
      },
      {
        "id": "word-6-43",
        "english": "underline*",
        "phonetic": "/ˏʌndəˈlaɪn/",
        "partOfSpeech": "vt.",
        "chinese": "画线于……之下；强调",
        "example": ""
      },
      {
        "id": "word-6-12",
        "english": "particular*",
        "phonetic": "/pəˈtɪkjulə(r)/",
        "partOfSpeech": "a.",
        "chinese": "特殊的，特别的；特定的，个别的；详细的 n. 详情，细目，细节",
        "example": ""
      },
      {
        "id": "word-5-64",
        "english": "radius*",
        "phonetic": "/ˈreɪdɪəs/",
        "partOfSpeech": "n.",
        "chinese": "半径；周围，范围",
        "example": ""
      },
      {
        "id": "word-6-37",
        "english": "honour",
        "phonetic": "/ˈɔnə(r)/",
        "partOfSpeech": "n.",
        "chinese": "光荣；尊敬 vt. 向……示敬意；信守，执行（承诺）",
        "example": ""
      },
      {
        "id": "word-6-14",
        "english": "pitch*",
        "phonetic": "/pɪtʃ/",
        "partOfSpeech": "v.",
        "chinese": "投掷；颠簸；为……定音高 n. 沥青；场地；程度；最高点；音高",
        "example": ""
      },
      {
        "id": "word-5-24",
        "english": "conclude*",
        "phonetic": "/kənˈkluːd/",
        "partOfSpeech": "v.",
        "chinese": "推断出；作结论",
        "example": ""
      },
      {
        "id": "word-6-45",
        "english": "major*",
        "phonetic": "/ˈmeɪdʒə(r)/",
        "partOfSpeech": "a.",
        "chinese": "主要的 n. 专业（学生） vi. 主修，专攻",
        "example": ""
      },
      {
        "id": "word-6-61",
        "english": "discovery",
        "phonetic": "/dɪˈskʌvərɪ/",
        "partOfSpeech": "n.",
        "chinese": "发现",
        "example": ""
      },
      {
        "id": "word-6-27",
        "english": "statistics*",
        "phonetic": "/stəˈtɪstɪks/",
        "partOfSpeech": "n.",
        "chinese": "统计数字，统计资料；统计学",
        "example": ""
      },
      {
        "id": "word-6-15",
        "english": "entitle",
        "phonetic": "/ɪnˈtaɪtl/",
        "partOfSpeech": "vt.",
        "chinese": "给……权利（或资格）；给（书、文章等）题名；给……以称号",
        "example": ""
      },
      {
        "id": "word-6-58",
        "english": "interrupt*",
        "phonetic": "/ˏɪntəˈrʌpt/",
        "partOfSpeech": "v.",
        "chinese": "中断，中止；阻碍；打断，打扰",
        "example": ""
      },
      {
        "id": "word-6-63",
        "english": "suppression*",
        "phonetic": "[səˈpreʃn]",
        "partOfSpeech": "n.",
        "chinese": "镇压，压制，抑制；扑灭",
        "example": ""
      },
      {
        "id": "word-6-73",
        "english": "crack",
        "phonetic": "/kræk/",
        "partOfSpeech": "n.",
        "chinese": "裂缝，缝隙；爆裂声 v. （使）破裂；（使）发出爆裂声；重击；崩溃，瓦解",
        "example": ""
      },
      {
        "id": "word-6-32",
        "english": "ornament*",
        "phonetic": "/ˈɔːnəmənt/",
        "partOfSpeech": "n.",
        "chinese": "装饰；装饰物 vt. 装饰，修饰，美化",
        "example": ""
      },
      {
        "id": "word-6-6",
        "english": "calculate",
        "phonetic": "/ˈkælkjuleɪt/",
        "partOfSpeech": "v.",
        "chinese": "计算，推算；估计，推测；计划，打算",
        "example": ""
      },
      {
        "id": "word-6-71",
        "english": "crisp",
        "phonetic": "/krɪsp/",
        "partOfSpeech": "a.",
        "chinese": "脆的；利落的 n. [pl.] 油炸土豆片",
        "example": ""
      },
      {
        "id": "word-6-72",
        "english": "guilty*",
        "phonetic": "['ɡɪltɪ]",
        "partOfSpeech": "a.",
        "chinese": "内疚的；有罪的",
        "example": ""
      },
      {
        "id": "word-6-52",
        "english": "necessarily*",
        "phonetic": "/ˈnesəsərəlɪ;",
        "partOfSpeech": "",
        "chinese": "ˏnesəˈserəl/ ad. 必要地；必然地",
        "example": ""
      },
      {
        "id": "word-6-59",
        "english": "redundant*",
        "phonetic": "/rɪˈdʌndənt/",
        "partOfSpeech": "a.",
        "chinese": "（因人员过剩而）被解雇的；多余的，过剩的；累赘的，冗长的",
        "example": ""
      },
      {
        "id": "word-6-67",
        "english": "feature*",
        "phonetic": "/ˈfiːtʃə(r)/",
        "partOfSpeech": "n.",
        "chinese": "特征，特色； [pl.] 面貌，相貌；特定，专题节目；故事片 v. 以……为特色；由……主演；占重要地位",
        "example": ""
      },
      {
        "id": "word-6-44",
        "english": "activate*",
        "phonetic": "/ˈæktɪveɪt/",
        "partOfSpeech": "vt.",
        "chinese": "激活；使活动，使活化",
        "example": ""
      },
      {
        "id": "word-5-50",
        "english": "awful*",
        "phonetic": "/ˈɔːfl/",
        "partOfSpeech": "a.",
        "chinese": "糟糕的",
        "example": ""
      },
      {
        "id": "word-6-31",
        "english": "propose*",
        "phonetic": "/prəˈpəuz/",
        "partOfSpeech": "v.",
        "chinese": "提议，建议；提名，推荐；打算；（向某人）求婚",
        "example": ""
      }
    ],
    "article": "In the field of Technological Innovation, researchers have been studying various phenomena to understand their implications. The concept of migratory* has been widely discussed in recent studies. The concept of appropriate* has been widely discussed in recent studies. The concept of purchase* has been widely discussed in recent studies. The concept of approximately* has been widely discussed in recent studies. The concept of transfer* has been widely discussed in recent studies. The concept of naked has been widely discussed in recent studies. The concept of concern* has been widely discussed in recent studies. The concept of lever has been widely discussed in recent studies. The concept of concentrate* has been widely discussed in recent studies. The concept of soluble has been widely discussed in recent studies. Researchers have found that these factors play a significant role in shaping our understanding of the subject. Further studies are needed to explore the full implications of these findings."
  },
  {
    "id": "unit-4",
    "name": "Unit 4: Word Lists 7 & 8",
    "words": [
      {
        "id": "word-8-42",
        "english": "graphic",
        "phonetic": "/ˈgræfɪk/",
        "partOfSpeech": "a.",
        "chinese": "文学的；生动的，形象的；绘画的，图表的",
        "example": ""
      },
      {
        "id": "word-8-60",
        "english": "staff",
        "phonetic": "/stɑːf/",
        "partOfSpeech": "n.",
        "chinese": "全体职工，工作人员；棒；（军队的）全体参谋人员 vt. 为……配备人员；任职于",
        "example": ""
      },
      {
        "id": "word-8-71",
        "english": "throughout*",
        "phonetic": "/θruːˈaut/",
        "partOfSpeech": "prep.",
        "chinese": "lad. 各处；遍及；在整个……期间",
        "example": ""
      },
      {
        "id": "word-7-35",
        "english": "rumour",
        "phonetic": "/ˈruːmə(r)/",
        "partOfSpeech": "n.",
        "chinese": "谣传，谣言",
        "example": ""
      },
      {
        "id": "word-8-62",
        "english": "apt",
        "phonetic": "/æpt/",
        "partOfSpeech": "a.",
        "chinese": "易于……的；适宜的；敏捷的",
        "example": ""
      },
      {
        "id": "word-7-40",
        "english": "intention",
        "phonetic": "/ɪnˈtenʃn/",
        "partOfSpeech": "n.",
        "chinese": "意图，目的",
        "example": ""
      },
      {
        "id": "word-7-31",
        "english": "postcode*",
        "phonetic": "[ˈpəʊstkəʊd]",
        "partOfSpeech": "n.",
        "chinese": "邮政编码",
        "example": ""
      },
      {
        "id": "word-7-6",
        "english": "insulation*",
        "phonetic": "[ˌɪnsjuˈleɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "隔绝，隔绝状态；绝缘（材料），隔热，隔音",
        "example": ""
      },
      {
        "id": "word-7-8",
        "english": "undermine*",
        "phonetic": "/ˏʌndəˈmaɪn/",
        "partOfSpeech": "vt.",
        "chinese": "削弱；破坏",
        "example": ""
      },
      {
        "id": "word-8-73",
        "english": "criticise",
        "phonetic": "/ˈkrɪtɪsaɪz/",
        "partOfSpeech": "v.",
        "chinese": "批评，非难，责备；评论",
        "example": ""
      },
      {
        "id": "word-7-58",
        "english": "verdict*",
        "phonetic": "/ˈvɜːdɪkt/",
        "partOfSpeech": "n.",
        "chinese": "裁定；定论；判断；意见",
        "example": ""
      },
      {
        "id": "word-8-66",
        "english": "invisible",
        "phonetic": "/ɪnˈvɪzəbl/",
        "partOfSpeech": "a.",
        "chinese": "看不见的，无形的",
        "example": ""
      },
      {
        "id": "word-7-63",
        "english": "unyielding*",
        "phonetic": "/ʌnˈjiːldɪŋ/",
        "partOfSpeech": "a.",
        "chinese": "顽强的；坚硬的；不能弯曲的，坚固的",
        "example": ""
      },
      {
        "id": "word-8-74",
        "english": "beyond*",
        "phonetic": "/bɪˈjɔnd/",
        "partOfSpeech": "prep.",
        "chinese": "在……较远的一边；超出；除……之外",
        "example": ""
      },
      {
        "id": "word-7-59",
        "english": "refresher*",
        "phonetic": "[rɪ'freʃə]",
        "partOfSpeech": "n.",
        "chinese": "提神物；帮助记忆的东西或人；补习课程",
        "example": ""
      },
      {
        "id": "word-8-72",
        "english": "smart*",
        "phonetic": "/smɑːt/",
        "partOfSpeech": "a.",
        "chinese": "漂亮的，时髦的；高明的",
        "example": ""
      },
      {
        "id": "word-8-47",
        "english": "arrogance",
        "phonetic": "[ˈærəgəns]",
        "partOfSpeech": "n.",
        "chinese": "傲慢，自大",
        "example": ""
      },
      {
        "id": "word-7-52",
        "english": "administrative*",
        "phonetic": "/ədˈmɪnɪstrətɪv/",
        "partOfSpeech": "a.",
        "chinese": "管理的，行政的",
        "example": ""
      },
      {
        "id": "word-7-12",
        "english": "laundry*",
        "phonetic": "/ˈlɔːndrɪ/",
        "partOfSpeech": "n.",
        "chinese": "洗衣房；待洗衣服",
        "example": ""
      },
      {
        "id": "word-8-55",
        "english": "composition*",
        "phonetic": "/ˏkɔmpəˈzɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "作品；写作，作曲；结构，组成，成分",
        "example": ""
      },
      {
        "id": "word-8-20",
        "english": "ozone",
        "phonetic": "",
        "partOfSpeech": "",
        "chinese": "layer [ˈəuzəun ˈleiə] n.臭氧层",
        "example": ""
      },
      {
        "id": "word-7-23",
        "english": "depression*",
        "phonetic": "/dɪˈpreʃn/",
        "partOfSpeech": "n.",
        "chinese": "忧愁，消沉；低气压，低压；不景气，萧条（期）",
        "example": ""
      },
      {
        "id": "word-8-26",
        "english": "reorient*",
        "phonetic": "[ˌri:'ɔ:rɪent]",
        "partOfSpeech": "vt.",
        "chinese": "重新定位方位；重新定位；使适应",
        "example": ""
      },
      {
        "id": "word-8-24",
        "english": "deem",
        "phonetic": "/diːm/",
        "partOfSpeech": "vt.",
        "chinese": "认为",
        "example": ""
      },
      {
        "id": "word-8-15",
        "english": "furnish*",
        "phonetic": "/ˈfɜːnɪʃ/",
        "partOfSpeech": "vt.",
        "chinese": "布置，为……配置家具；供应，提供；装备",
        "example": ""
      },
      {
        "id": "word-7-9",
        "english": "eliminate",
        "phonetic": "/ɪˈlɪmɪneɪt/",
        "partOfSpeech": "vt.",
        "chinese": "消灭，消除；淘汰",
        "example": ""
      },
      {
        "id": "word-8-27",
        "english": "reckon*",
        "phonetic": "/ˈrekən/",
        "partOfSpeech": "v.",
        "chinese": "认为，估计；测算，测量；料想，指望",
        "example": ""
      },
      {
        "id": "word-7-68",
        "english": "compare*",
        "phonetic": "/kəmˈpeə(r)/",
        "partOfSpeech": "v.",
        "chinese": "比较；对比",
        "example": ""
      },
      {
        "id": "word-8-48",
        "english": "era*",
        "phonetic": "/ˈɪərə/",
        "partOfSpeech": "n.",
        "chinese": "纪元；时代",
        "example": ""
      },
      {
        "id": "word-7-41",
        "english": "demonstrate*",
        "phonetic": "/ˈdemənstreɪt/",
        "partOfSpeech": "v.",
        "chinese": "认证，证实；演示，说明；举行示威游行（或集会）",
        "example": ""
      },
      {
        "id": "word-7-66",
        "english": "client*",
        "phonetic": "/ˈklaɪənt/",
        "partOfSpeech": "n.",
        "chinese": "委托人；顾客，客户",
        "example": ""
      },
      {
        "id": "word-8-6",
        "english": "sector",
        "phonetic": "/ˈsektə(r)/",
        "partOfSpeech": "n.",
        "chinese": "部分，部门；防御地段，防区；扇形",
        "example": ""
      },
      {
        "id": "word-7-16",
        "english": "fuel",
        "phonetic": "/ˈfjuːəl/",
        "partOfSpeech": "n.",
        "chinese": "燃料 v. 给……加燃料",
        "example": ""
      },
      {
        "id": "word-8-19",
        "english": "boot*",
        "phonetic": "/buːt/",
        "partOfSpeech": "n.",
        "chinese": "（长筒）靴子；（汽车后部的）行李箱； [the ~] 解雇",
        "example": ""
      },
      {
        "id": "word-8-1",
        "english": "formulate",
        "phonetic": "/ˈfɔːmjuleɪt/",
        "partOfSpeech": "vt.",
        "chinese": "系统阐述，明确表达；构想出（计划、方法等），规划（制度等）",
        "example": ""
      },
      {
        "id": "word-8-18",
        "english": "alignment",
        "phonetic": "[əˈlaɪnmənt]",
        "partOfSpeech": "n.",
        "chinese": "排成直线；联盟",
        "example": ""
      },
      {
        "id": "word-8-41",
        "english": "slippery",
        "phonetic": "/ˈslɪpərɪ/",
        "partOfSpeech": "a.",
        "chinese": "滑的，滑溜的；油滑的，狡猾的；棘手的",
        "example": ""
      },
      {
        "id": "word-7-54",
        "english": "resistant*",
        "phonetic": "/rɪˈzɪstənt/",
        "partOfSpeech": "a.",
        "chinese": "抵抗的，有抵抗力的",
        "example": ""
      },
      {
        "id": "word-7-33",
        "english": "basis*",
        "phonetic": "/ˈbeɪsɪs/",
        "partOfSpeech": "n.",
        "chinese": "基础；根据；原则",
        "example": ""
      },
      {
        "id": "word-7-4",
        "english": "gravel",
        "phonetic": "/ˈgrævl/",
        "partOfSpeech": "n.",
        "chinese": "沙砾，砾石",
        "example": ""
      },
      {
        "id": "word-7-13",
        "english": "apparently*",
        "phonetic": "[əˈpærəntli]",
        "partOfSpeech": "ad.",
        "chinese": "显然；看来，似乎",
        "example": ""
      },
      {
        "id": "word-7-71",
        "english": "deputy",
        "phonetic": "/ˈdepjutɪ/",
        "partOfSpeech": "n.",
        "chinese": "代理人；代表",
        "example": ""
      },
      {
        "id": "word-7-25",
        "english": "attention*",
        "phonetic": "/əˈtenʃn/",
        "partOfSpeech": "n.",
        "chinese": "注意（力），留心；立正",
        "example": ""
      },
      {
        "id": "word-7-22",
        "english": "probation*",
        "phonetic": "/prəˈbeɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "缓刑（制）；（对人的）试用；试用期",
        "example": ""
      },
      {
        "id": "word-7-44",
        "english": "slim",
        "phonetic": "/slɪm/",
        "partOfSpeech": "a.",
        "chinese": "苗条的；薄的 vi. 变苗条",
        "example": ""
      },
      {
        "id": "word-8-65",
        "english": "spasm",
        "phonetic": "/ˋspæzəm/",
        "partOfSpeech": "n.",
        "chinese": "痉挛；抽搐；（活动、情感等的）突发、阵发",
        "example": ""
      },
      {
        "id": "word-7-17",
        "english": "operational",
        "phonetic": "[ˌɒpəˈreɪʃənl]",
        "partOfSpeech": "a.",
        "chinese": "运转的；操作的；运营的，业务的",
        "example": ""
      },
      {
        "id": "word-7-30",
        "english": "response*",
        "phonetic": "/rɪˈspɔns/",
        "partOfSpeech": "n.",
        "chinese": "回答，答复；反应，响应",
        "example": ""
      },
      {
        "id": "word-8-70",
        "english": "dynamic*",
        "phonetic": "/daɪˈnæmɪk/",
        "partOfSpeech": "a.",
        "chinese": "动力的；活跃的，充满活力的，精力充沛的",
        "example": ""
      },
      {
        "id": "word-8-67",
        "english": "devote*",
        "phonetic": "/dɪˈvəut/",
        "partOfSpeech": "vt.",
        "chinese": "将……奉献给；致力（于）",
        "example": ""
      },
      {
        "id": "word-7-24",
        "english": "proximity*",
        "phonetic": "/prɔkˈsɪmətɪ/",
        "partOfSpeech": "n.",
        "chinese": "接近，邻近；亲近",
        "example": ""
      },
      {
        "id": "word-7-7",
        "english": "hesitation*",
        "phonetic": "[ˌhezɪ'teɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "犹豫，踌躇",
        "example": ""
      },
      {
        "id": "word-7-11",
        "english": "exclude",
        "phonetic": "/ɪkˈskluːd/",
        "partOfSpeech": "vt.",
        "chinese": "把……排斥在外；将（某物）排除，不包括",
        "example": ""
      },
      {
        "id": "word-8-32",
        "english": "restriction*",
        "phonetic": "[rɪ'strɪkʃn]",
        "partOfSpeech": "n.",
        "chinese": "限制，约束",
        "example": ""
      },
      {
        "id": "word-7-61",
        "english": "misjudge*",
        "phonetic": "/ˏmɪsˈdʒʌdʒ/",
        "partOfSpeech": "vt.",
        "chinese": "判断错误",
        "example": ""
      },
      {
        "id": "word-7-53",
        "english": "frustrating*",
        "phonetic": "[frʌˈstreɪtɪŋ]",
        "partOfSpeech": "a.",
        "chinese": "令人泄气的，使人沮丧的",
        "example": ""
      },
      {
        "id": "word-7-75",
        "english": "marketplace*",
        "phonetic": "[ˈmɑ:kɪtpleɪs]",
        "partOfSpeech": "n.",
        "chinese": "市场，集市",
        "example": ""
      },
      {
        "id": "word-7-70",
        "english": "cassette",
        "phonetic": "/kəˈset/",
        "partOfSpeech": "n.",
        "chinese": "盒式录音（或录像）带",
        "example": ""
      },
      {
        "id": "word-7-49",
        "english": "avail",
        "phonetic": "/əˈveɪl/",
        "partOfSpeech": "vt.",
        "chinese": "有帮助，有益，有用 n. 效用；利益",
        "example": ""
      },
      {
        "id": "word-8-59",
        "english": "damp",
        "phonetic": "/dæmp/",
        "partOfSpeech": "a.",
        "chinese": "潮湿的 n. 潮湿，湿气 vt. 使潮湿；减弱，抑制；（使）沮丧",
        "example": ""
      },
      {
        "id": "word-8-57",
        "english": "hurdle*",
        "phonetic": "/ˈhɜːdl/",
        "partOfSpeech": "n.",
        "chinese": "障碍；跳栏 v. 越过障碍",
        "example": ""
      },
      {
        "id": "word-8-75",
        "english": "hinterland*",
        "phonetic": "/ˈhɪntəlænd/",
        "partOfSpeech": "n.",
        "chinese": "内地，腹地，内陆",
        "example": ""
      },
      {
        "id": "word-8-45",
        "english": "distinguish",
        "phonetic": "/dɪˈstɪŋgwɪʃ/",
        "partOfSpeech": "v.",
        "chinese": "区别，辨别；辨认出；使杰出",
        "example": ""
      },
      {
        "id": "word-7-50",
        "english": "dioxide*",
        "phonetic": "/daɪˈɔksaɪd/",
        "partOfSpeech": "n.",
        "chinese": "二氧化物",
        "example": ""
      },
      {
        "id": "word-7-10",
        "english": "volcano*",
        "phonetic": "/vɔlˈkeɪnəu/",
        "partOfSpeech": "n.",
        "chinese": "火山",
        "example": ""
      },
      {
        "id": "word-7-15",
        "english": "stimulate",
        "phonetic": "/ˈstɪmjuleɪt/",
        "partOfSpeech": "vt.",
        "chinese": "刺激；使兴奋；激发，激励",
        "example": ""
      },
      {
        "id": "word-8-46",
        "english": "blanket*",
        "phonetic": "/ˈblæŋkɪt/",
        "partOfSpeech": "n.",
        "chinese": "毯子；厚的覆盖物",
        "example": ""
      },
      {
        "id": "word-8-56",
        "english": "architecture*",
        "phonetic": "/ˈɑːkɪtektʃə(r)/",
        "partOfSpeech": "n.",
        "chinese": "建筑学；建筑设计，建筑风格 [计] 体系结构",
        "example": ""
      },
      {
        "id": "word-8-14",
        "english": "condition*",
        "phonetic": "/kənˈdɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "状况，状态； [pl.] 环境，形势；条件，前提 vt. 训练；使适应，使习惯于；对……有重要影响",
        "example": ""
      },
      {
        "id": "word-7-76",
        "english": "acute",
        "phonetic": "/əˈkjuːt/",
        "partOfSpeech": "a.",
        "chinese": "灵敏的；剧烈的，猛烈的",
        "example": ""
      },
      {
        "id": "word-7-28",
        "english": "carry*",
        "phonetic": "/ˈkærɪ/",
        "partOfSpeech": "v.",
        "chinese": "运送，搬运；传送，传播 n. 运载；射程",
        "example": ""
      },
      {
        "id": "word-8-7",
        "english": "creep*",
        "phonetic": "/kriːp/",
        "partOfSpeech": "vi.",
        "chinese": "悄悄移动；缓慢进行；爬行",
        "example": ""
      },
      {
        "id": "word-7-29",
        "english": "devastate*",
        "phonetic": "/ˈdevəsteɪt/",
        "partOfSpeech": "vt.",
        "chinese": "破坏，毁坏；使震惊，使极为悲痛",
        "example": ""
      },
      {
        "id": "word-8-38",
        "english": "celebrity*",
        "phonetic": "/sɪˈlebrətɪ/",
        "partOfSpeech": "n.",
        "chinese": "名声；知名人士",
        "example": ""
      },
      {
        "id": "word-8-17",
        "english": "incoming*",
        "phonetic": "/ˈɪnkʌmɪŋ/",
        "partOfSpeech": "a.",
        "chinese": "进来的 n. [pl.] 收入",
        "example": ""
      },
      {
        "id": "word-7-1",
        "english": "flourish*",
        "phonetic": "/ˈflʌrɪʃ/",
        "partOfSpeech": "v.",
        "chinese": "繁荣；茂盛；兴旺；健康幸福 n. （为引起注意的）夸张动作；修饰",
        "example": ""
      },
      {
        "id": "word-8-51",
        "english": "provided*",
        "phonetic": "/prəˈvaɪdɪd/",
        "partOfSpeech": "conj.",
        "chinese": "倘若，只要，假如",
        "example": ""
      },
      {
        "id": "word-8-16",
        "english": "stabilise",
        "phonetic": "{ˈsteɪbəlaɪz}",
        "partOfSpeech": "v.",
        "chinese": "（使）稳定，（使）稳固",
        "example": ""
      },
      {
        "id": "word-8-49",
        "english": "stimulus",
        "phonetic": "/ˈstɪmjuləs/",
        "partOfSpeech": "n.",
        "chinese": "刺激（物），促进（因素）",
        "example": ""
      },
      {
        "id": "word-7-14",
        "english": "gelatin",
        "phonetic": "['dʒelətɪn]",
        "partOfSpeech": "n.",
        "chinese": "明胶",
        "example": ""
      },
      {
        "id": "word-7-19",
        "english": "distribute",
        "phonetic": "/dɪˈstrɪbjuːt/",
        "partOfSpeech": "vt.",
        "chinese": "分发，分配，分送；散布，分布；分类，分区",
        "example": ""
      },
      {
        "id": "word-8-2",
        "english": "collate*",
        "phonetic": "/kəˈleɪt/",
        "partOfSpeech": "vt.",
        "chinese": "对照；核对；整理（文件、书页等）",
        "example": ""
      },
      {
        "id": "word-7-73",
        "english": "bind",
        "phonetic": "[baɪnd]",
        "partOfSpeech": "v.",
        "chinese": "捆绑，系；约束；凝结",
        "example": ""
      },
      {
        "id": "word-7-43",
        "english": "illuminate",
        "phonetic": "/ɪˈluːmɪneɪt/",
        "partOfSpeech": "vt.",
        "chinese": "照亮；阐明，解释；启发",
        "example": ""
      },
      {
        "id": "word-8-34",
        "english": "priority",
        "phonetic": "/praɪˈɔrətɪ/",
        "partOfSpeech": "n.",
        "chinese": "优先（权），重点；优先考虑的事",
        "example": ""
      },
      {
        "id": "word-7-2",
        "english": "reserve*",
        "phonetic": "/rɪˈzɜːv/",
        "partOfSpeech": "vt.",
        "chinese": "预订，预约；保留；储备 n. 储备（量）；自然保护区",
        "example": ""
      },
      {
        "id": "word-7-18",
        "english": "image",
        "phonetic": "/ˈɪmɪdʒ/",
        "partOfSpeech": "n.",
        "chinese": "形象；印象；图像",
        "example": ""
      },
      {
        "id": "word-8-43",
        "english": "examine*",
        "phonetic": "/ɪgˈzæmɪn/",
        "partOfSpeech": "vt.",
        "chinese": "检查；调查，研究；测验",
        "example": ""
      },
      {
        "id": "word-8-29",
        "english": "reference*",
        "phonetic": "/ˈrefərəns/",
        "partOfSpeech": "n.",
        "chinese": "参考，参考书目；提及，涉及；证明书（或人）；介绍（人）",
        "example": ""
      },
      {
        "id": "word-7-21",
        "english": "empirical*",
        "phonetic": "/ɪmˈpɪrɪkl/",
        "partOfSpeech": "a.",
        "chinese": "经验主义的，以经验为依据的",
        "example": ""
      },
      {
        "id": "word-8-30",
        "english": "sledge*",
        "phonetic": "/sledʒ/",
        "partOfSpeech": "n.",
        "chinese": "雪橇 vi. 乘雪橇",
        "example": ""
      },
      {
        "id": "word-8-5",
        "english": "ability*",
        "phonetic": "/əˈbɪlətɪ/",
        "partOfSpeech": "n.",
        "chinese": "能力；本领；才能",
        "example": ""
      },
      {
        "id": "word-7-42",
        "english": "agenda*",
        "phonetic": "/əˈdʒendə/",
        "partOfSpeech": "n.",
        "chinese": "议程；议程表",
        "example": ""
      },
      {
        "id": "word-8-39",
        "english": "significance*",
        "phonetic": "/sɪgˈnɪfɪkəns/",
        "partOfSpeech": "n.",
        "chinese": "重要性，意义",
        "example": ""
      },
      {
        "id": "word-8-54",
        "english": "depend*",
        "phonetic": "/dɪˈpend/",
        "partOfSpeech": "vi.",
        "chinese": "依靠，依赖；信赖，相信；决定于，视……而定",
        "example": ""
      },
      {
        "id": "word-7-26",
        "english": "factual*",
        "phonetic": "/ˈfæktʃuəl/",
        "partOfSpeech": "a.",
        "chinese": "事实的；真实的，确凿的",
        "example": ""
      },
      {
        "id": "word-7-36",
        "english": "endeavour*",
        "phonetic": "/ɪnˈdevə(r)/",
        "partOfSpeech": "n./vi.",
        "chinese": "努力，尽力；尝试",
        "example": ""
      },
      {
        "id": "word-8-3",
        "english": "infer",
        "phonetic": "/ɪnˈfɜː(r)/",
        "partOfSpeech": "v.",
        "chinese": "推断，猜想",
        "example": ""
      },
      {
        "id": "word-7-38",
        "english": "payment*",
        "phonetic": "/ˈpeɪmənt/",
        "partOfSpeech": "n.",
        "chinese": "支付；支付的款项",
        "example": ""
      },
      {
        "id": "word-8-11",
        "english": "consensus*",
        "phonetic": "/kənˈsensəs/",
        "partOfSpeech": "n.",
        "chinese": "共识；（意见）一致",
        "example": ""
      },
      {
        "id": "word-7-47",
        "english": "rank",
        "phonetic": "/ræŋk/",
        "partOfSpeech": "v.",
        "chinese": "排列；分等 n. 等级；军衔",
        "example": ""
      },
      {
        "id": "word-8-36",
        "english": "habitat*",
        "phonetic": "/ˈhæbɪtæt/",
        "partOfSpeech": "n.",
        "chinese": "栖息地，住处",
        "example": ""
      },
      {
        "id": "word-8-40",
        "english": "magnetic",
        "phonetic": "/mægˈnetɪk/",
        "partOfSpeech": "a.",
        "chinese": "磁的，有磁性的；有吸引力的",
        "example": ""
      },
      {
        "id": "word-8-63",
        "english": "homogeneous",
        "phonetic": "/ˏhɔməˈdʒiːnɪəs/",
        "partOfSpeech": "a.",
        "chinese": "同种类的，由相同（或同类型）事物（或人）组成的",
        "example": ""
      },
      {
        "id": "word-8-31",
        "english": "exaggerate*",
        "phonetic": "/ɪgˈzædʒəreɪt/",
        "partOfSpeech": "v.",
        "chinese": "夸大，夸张",
        "example": ""
      },
      {
        "id": "word-7-72",
        "english": "fraud*",
        "phonetic": "/frɔːd/",
        "partOfSpeech": "n.",
        "chinese": "诈骗罪；骗子；伪产品，冒牌货",
        "example": ""
      },
      {
        "id": "word-7-56",
        "english": "impressive*",
        "phonetic": "/ɪmˈpresɪv/",
        "partOfSpeech": "a.",
        "chinese": "给人深刻印象的，令人敬佩的",
        "example": ""
      },
      {
        "id": "word-7-60",
        "english": "blaze",
        "phonetic": "/bleɪz/",
        "partOfSpeech": "v.",
        "chinese": "熊熊燃烧；发（强）光；迸发 n. 火焰",
        "example": ""
      },
      {
        "id": "word-7-34",
        "english": "tropical*",
        "phonetic": "[ˈtrɒpɪkl]",
        "partOfSpeech": "a.",
        "chinese": "热带的；炎热的",
        "example": ""
      },
      {
        "id": "word-8-4",
        "english": "fiction*",
        "phonetic": "/ˈfɪkʃn/",
        "partOfSpeech": "n.",
        "chinese": "小说",
        "example": ""
      },
      {
        "id": "word-8-10",
        "english": "trimester*",
        "phonetic": "[traɪˈmestə(r)]",
        "partOfSpeech": "n.",
        "chinese": "三月期；学期",
        "example": ""
      },
      {
        "id": "word-8-33",
        "english": "abandon",
        "phonetic": "/əˈbændən/",
        "partOfSpeech": "vt.",
        "chinese": "放弃，遗弃",
        "example": ""
      },
      {
        "id": "word-7-27",
        "english": "acclaim*",
        "phonetic": "/əˈkleɪm/",
        "partOfSpeech": "vt.",
        "chinese": "向……欢呼，为……喝彩 n. 称赞；欢迎",
        "example": ""
      },
      {
        "id": "word-7-48",
        "english": "dimension",
        "phonetic": "/daɪˈmenʃn;",
        "partOfSpeech": "",
        "chinese": "dɪˈmenʃn/ n. 尺寸，（长、宽、厚、深）度；方面、特点；维、元； [pl.] 面积",
        "example": ""
      },
      {
        "id": "word-8-44",
        "english": "opportunity",
        "phonetic": "/ˏɔpəˈtjuːnətɪ/",
        "partOfSpeech": "n.",
        "chinese": "机会，时机",
        "example": ""
      },
      {
        "id": "word-8-35",
        "english": "terrify*",
        "phonetic": "/ˈterɪfaɪ/",
        "partOfSpeech": "vt.",
        "chinese": "使恐怖，使惊吓",
        "example": ""
      },
      {
        "id": "word-7-39",
        "english": "superb",
        "phonetic": "/suːˈpɜːb;",
        "partOfSpeech": "",
        "chinese": "sjuːˈpɜːb/ a. 极好的；高质量的",
        "example": ""
      },
      {
        "id": "word-7-57",
        "english": "analysis*",
        "phonetic": "/əˈnæləsɪs/",
        "partOfSpeech": "n.",
        "chinese": "分析，分解",
        "example": ""
      },
      {
        "id": "word-8-69",
        "english": "terrace",
        "phonetic": "/ˈterəs/",
        "partOfSpeech": "n.",
        "chinese": "一层梯田；一排并列的房子；阳台",
        "example": ""
      },
      {
        "id": "word-8-12",
        "english": "redevelopment*",
        "phonetic": "[ˌri:dɪ'veləpmənt]",
        "partOfSpeech": "n.",
        "chinese": "重新规划；重新建设",
        "example": ""
      },
      {
        "id": "word-8-23",
        "english": "definite*",
        "phonetic": "/ˈdefɪnət/",
        "partOfSpeech": "a.",
        "chinese": "明确的，肯定的；清楚的",
        "example": ""
      },
      {
        "id": "word-7-51",
        "english": "block",
        "phonetic": "/blɔk/",
        "partOfSpeech": "n.",
        "chinese": "一排房屋，街区；阻塞；大块木料（或石料、金属） vt. 阻塞，拦阻；封锁",
        "example": ""
      },
      {
        "id": "word-7-69",
        "english": "transparent",
        "phonetic": "/trænsˈprənt/",
        "partOfSpeech": "a.",
        "chinese": "透明的；清澈的；明显的；易懂的",
        "example": ""
      },
      {
        "id": "word-7-64",
        "english": "exterior",
        "phonetic": "/ɪkˈstɪərɪə(r)/",
        "partOfSpeech": "a.",
        "chinese": "外部的，外表的 n. 外部，外表",
        "example": ""
      },
      {
        "id": "word-7-37",
        "english": "address*",
        "phonetic": "/əˈdres/",
        "partOfSpeech": "vt.",
        "chinese": "致函，写姓名地址；向……讲话，演说；处理，对付 n. 地址；致词",
        "example": ""
      },
      {
        "id": "word-7-46",
        "english": "optimism",
        "phonetic": "/ˈɔptɪmɪzəm/",
        "partOfSpeech": "n.",
        "chinese": "乐观，乐观主义",
        "example": ""
      },
      {
        "id": "word-7-20",
        "english": "intend",
        "phonetic": "/ɪnˈtend/",
        "partOfSpeech": "v.",
        "chinese": "想要，打算",
        "example": ""
      },
      {
        "id": "word-7-3",
        "english": "dimensional",
        "phonetic": "[dɪ'menʃənəl]",
        "partOfSpeech": "a.",
        "chinese": "……度空间的，……维的",
        "example": ""
      },
      {
        "id": "word-7-32",
        "english": "dull*",
        "phonetic": "/dʌl/",
        "partOfSpeech": "a.",
        "chinese": "乏味的；阴沉的",
        "example": ""
      },
      {
        "id": "word-8-37",
        "english": "encourage*",
        "phonetic": "/ɪnˈkʌrɪdʒ/",
        "partOfSpeech": "v.",
        "chinese": "鼓励；促进，激发",
        "example": ""
      },
      {
        "id": "word-7-62",
        "english": "pregnant",
        "phonetic": "/ˈpregnənt/",
        "partOfSpeech": "a.",
        "chinese": "怀孕的，妊娠的；充满的",
        "example": ""
      },
      {
        "id": "word-8-58",
        "english": "teamwork*",
        "phonetic": "[ˈti:mwɜ:k]",
        "partOfSpeech": "n.",
        "chinese": "协力合作，团队合作；配合",
        "example": ""
      },
      {
        "id": "word-7-65",
        "english": "approve*",
        "phonetic": "/əˈpruːv/",
        "partOfSpeech": "v.",
        "chinese": "赞成；批准，同意",
        "example": ""
      },
      {
        "id": "word-8-8",
        "english": "casual*",
        "phonetic": "/ˈkæʒuəl/",
        "partOfSpeech": "a.",
        "chinese": "偶然的，碰巧的，不经意的；临时的，非正式的",
        "example": ""
      },
      {
        "id": "word-8-68",
        "english": "illustrate",
        "phonetic": "/ˈɪləstreɪt/",
        "partOfSpeech": "v.",
        "chinese": "（用图等）说明，举例说明，阐明；给……作插图说明",
        "example": ""
      },
      {
        "id": "word-8-50",
        "english": "roam*",
        "phonetic": "/rəum/",
        "partOfSpeech": "v.",
        "chinese": "随便走，漫游；徜徉；漫谈某事 n. 漫步；徘徊",
        "example": ""
      },
      {
        "id": "word-7-77",
        "english": "ripe",
        "phonetic": "/raɪp/",
        "partOfSpeech": "a.",
        "chinese": "（水果或庄稼）成熟的；时机成熟的",
        "example": ""
      },
      {
        "id": "word-8-64",
        "english": "conserve",
        "phonetic": "/kənˈsɜːv/",
        "partOfSpeech": "vt.",
        "chinese": "保护；保存，储存；节约",
        "example": ""
      },
      {
        "id": "word-8-61",
        "english": "symbol*",
        "phonetic": "/ˈsɪmbl/",
        "partOfSpeech": "n.",
        "chinese": "象征；符号",
        "example": ""
      },
      {
        "id": "word-8-25",
        "english": "narrator*",
        "phonetic": "[nəˈreɪtə(r)]",
        "partOfSpeech": "n.",
        "chinese": "讲述者，叙述者",
        "example": ""
      },
      {
        "id": "word-8-52",
        "english": "comparison*",
        "phonetic": "/kəmˈpærɪsn/",
        "partOfSpeech": "n.",
        "chinese": "比较，对比，对照；比喻，比拟",
        "example": ""
      },
      {
        "id": "word-7-67",
        "english": "vernacular*",
        "phonetic": "/vəˈnækjulə(r)/",
        "partOfSpeech": "n.",
        "chinese": "本国话；方言；土语；（建筑的）民间风格 a. 本国语的",
        "example": ""
      },
      {
        "id": "word-7-74",
        "english": "fragrance",
        "phonetic": "/ˈfreɪgrəns/",
        "partOfSpeech": "n.",
        "chinese": "芳香，香味；香水",
        "example": ""
      },
      {
        "id": "word-8-9",
        "english": "interpretation*",
        "phonetic": "[ɪnˌtɜ:prɪˈteɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "口译；解释，诠释；（表演、演奏的）艺术处理",
        "example": ""
      },
      {
        "id": "word-7-78",
        "english": "vet",
        "phonetic": "/vet/",
        "partOfSpeech": "vt.",
        "chinese": "审查，仔细检查 n. 兽医",
        "example": ""
      },
      {
        "id": "word-7-45",
        "english": "warrant",
        "phonetic": "/ˈwɔrənt/",
        "partOfSpeech": "v.",
        "chinese": "保证；证明……正当 n. 授权；许可证",
        "example": ""
      },
      {
        "id": "word-7-55",
        "english": "overdue*",
        "phonetic": "/ˏəuvəˈdjuː/",
        "partOfSpeech": "a.",
        "chinese": "过期未付的；逾期的；过度的，过火的；迟到的，延误的",
        "example": ""
      },
      {
        "id": "word-8-13",
        "english": "auditorium*",
        "phonetic": "/ˏɔːdɪˈtɔːrɪəm/",
        "partOfSpeech": "n.",
        "chinese": "礼堂；观众席",
        "example": ""
      },
      {
        "id": "word-8-28",
        "english": "tutorial*",
        "phonetic": "[tju:ˈtɔ:riəl]",
        "partOfSpeech": "n.",
        "chinese": "大学导师的辅导课；指南 a. 家庭教师的，辅导教师的，大学导师的；辅导的，指导的",
        "example": ""
      },
      {
        "id": "word-8-53",
        "english": "publicity*",
        "phonetic": "/pʌbˈlɪsətɪ/",
        "partOfSpeech": "n.",
        "chinese": "宣传，宣扬；公众的注意，名声",
        "example": ""
      },
      {
        "id": "word-8-22",
        "english": "booming*",
        "phonetic": "['bu:mɪŋ]",
        "partOfSpeech": "a.",
        "chinese": "发展迅速的；激增的",
        "example": ""
      },
      {
        "id": "word-8-21",
        "english": "acid*",
        "phonetic": "/ˈæsɪd/",
        "partOfSpeech": "n.",
        "chinese": "酸 a. 酸的；尖刻的",
        "example": ""
      },
      {
        "id": "word-7-5",
        "english": "advertisement*",
        "phonetic": "[ədˈvɜ:tɪsmənt]",
        "partOfSpeech": "n.",
        "chinese": "广告，公告；广告活动，宣传",
        "example": ""
      }
    ],
    "article": "In the field of Cultural Exchange, researchers have been studying various phenomena to understand their implications. The concept of graphic has been widely discussed in recent studies. The concept of staff has been widely discussed in recent studies. The concept of throughout* has been widely discussed in recent studies. The concept of rumour has been widely discussed in recent studies. The concept of apt has been widely discussed in recent studies. The concept of intention has been widely discussed in recent studies. The concept of postcode* has been widely discussed in recent studies. The concept of insulation* has been widely discussed in recent studies. The concept of undermine* has been widely discussed in recent studies. The concept of criticise has been widely discussed in recent studies. Researchers have found that these factors play a significant role in shaping our understanding of the subject. Further studies are needed to explore the full implications of these findings."
  },
  {
    "id": "unit-5",
    "name": "Unit 5: Word Lists 9 & 10",
    "words": [
      {
        "id": "word-10-35",
        "english": "detect*",
        "phonetic": "/dɪˈtekt/",
        "partOfSpeech": "vt.",
        "chinese": "发现，察觉；侦查，探测",
        "example": ""
      },
      {
        "id": "word-10-65",
        "english": "sophisticated",
        "phonetic": "/səˈfɪstɪkeɪtɪd/",
        "partOfSpeech": "a.",
        "chinese": "老于世故的，老练的；精密的，尖端的，先进的；复杂的；高雅的，有教养的",
        "example": ""
      },
      {
        "id": "word-10-46",
        "english": "abundance*",
        "phonetic": "/əˈbʌndəns/",
        "partOfSpeech": "n.",
        "chinese": "大量，丰富，充足，充裕",
        "example": ""
      },
      {
        "id": "word-9-51",
        "english": "pledge*",
        "phonetic": "/pledʒ/",
        "partOfSpeech": "v.",
        "chinese": "正式承诺；发誓，保证；抵押，典当 n. 誓约，保证；抵押",
        "example": ""
      },
      {
        "id": "word-10-2",
        "english": "aesthetic",
        "phonetic": "/iːsˈθetɪk/",
        "partOfSpeech": "a.",
        "chinese": "美学的；审美的",
        "example": ""
      },
      {
        "id": "word-9-47",
        "english": "procedure",
        "phonetic": "/prəˈsiːdʒə(r)/",
        "partOfSpeech": "n.",
        "chinese": "程序，手续；过程",
        "example": ""
      },
      {
        "id": "word-10-3",
        "english": "screen*",
        "phonetic": "/skriːn/",
        "partOfSpeech": "n.",
        "chinese": "屏幕，银幕；遮蔽；屏风，帘；筛子 vt. 掩蔽，遮蔽；包庇；筛选；放映（电影），播放（电视节目）",
        "example": ""
      },
      {
        "id": "word-10-62",
        "english": "athlete",
        "phonetic": "/ˈæθliːt/",
        "partOfSpeech": "n.",
        "chinese": "运动员；体育家",
        "example": ""
      },
      {
        "id": "word-10-17",
        "english": "destruction*",
        "phonetic": "/dɪˈstrʌkʃn/",
        "partOfSpeech": "n.",
        "chinese": "破坏，毁灭，摧毁",
        "example": ""
      },
      {
        "id": "word-10-64",
        "english": "swap*",
        "phonetic": "/swɔp/",
        "partOfSpeech": "v./n.",
        "chinese": "交换",
        "example": ""
      },
      {
        "id": "word-10-61",
        "english": "asset",
        "phonetic": "/ˈæset/",
        "partOfSpeech": "n.",
        "chinese": "财产；优点",
        "example": ""
      },
      {
        "id": "word-10-53",
        "english": "deprive",
        "phonetic": "/dɪˈpraɪv/",
        "partOfSpeech": "vt.",
        "chinese": "剥夺；使丧失",
        "example": ""
      },
      {
        "id": "word-9-65",
        "english": "limited*",
        "phonetic": "['lɪmɪtɪd]",
        "partOfSpeech": "a.",
        "chinese": "有限的",
        "example": ""
      },
      {
        "id": "word-10-29",
        "english": "humanity",
        "phonetic": "/hjuːˈmænətɪ/",
        "partOfSpeech": "n.",
        "chinese": "人类，人；人性；人道，仁慈； [pl.] 人文学科",
        "example": ""
      },
      {
        "id": "word-9-67",
        "english": "private*",
        "phonetic": "/ˈpraɪvɪt/",
        "partOfSpeech": "a.",
        "chinese": "私人的；私下的；私立的",
        "example": ""
      },
      {
        "id": "word-9-64",
        "english": "elbow",
        "phonetic": "/ˈelbəu/",
        "partOfSpeech": "n.",
        "chinese": "肘；（衣服的）肘部",
        "example": ""
      },
      {
        "id": "word-9-69",
        "english": "soak",
        "phonetic": "/səuk/",
        "partOfSpeech": "v.",
        "chinese": "浸泡",
        "example": ""
      },
      {
        "id": "word-9-49",
        "english": "plagiarism*",
        "phonetic": "[ˈpleɪdʒərɪzəm]",
        "partOfSpeech": "n.",
        "chinese": "（文学、学说等的）剽窃，抄袭；剽窃物",
        "example": ""
      },
      {
        "id": "word-9-71",
        "english": "greasy*",
        "phonetic": "/ˈgriːsɪ/",
        "partOfSpeech": "a.",
        "chinese": "多脂的；油滑的",
        "example": ""
      },
      {
        "id": "word-9-72",
        "english": "boast*",
        "phonetic": "/bəust/",
        "partOfSpeech": "n./v.",
        "chinese": "自夸；夸耀",
        "example": ""
      },
      {
        "id": "word-10-36",
        "english": "detour",
        "phonetic": "/ˈdiːtuə(r)/",
        "partOfSpeech": "n.",
        "chinese": "弯路，便道 v. 迂回，绕道",
        "example": ""
      },
      {
        "id": "word-10-57",
        "english": "contract*",
        "phonetic": "/ˈkɔntrækt/",
        "partOfSpeech": "n.",
        "chinese": "契约，合同 /kənˈtrækt/ v. 缩小；签约",
        "example": ""
      },
      {
        "id": "word-10-69",
        "english": "restrict*",
        "phonetic": "/rɪˈstrɪkt/",
        "partOfSpeech": "vt.",
        "chinese": "限制，约束",
        "example": ""
      },
      {
        "id": "word-10-33",
        "english": "junction",
        "phonetic": "/ˈdʒʌŋkʃn/",
        "partOfSpeech": "n.",
        "chinese": "连接；联结点；交叉路口",
        "example": ""
      },
      {
        "id": "word-9-54",
        "english": "deny*",
        "phonetic": "/dɪˈnaɪ/",
        "partOfSpeech": "v.",
        "chinese": "否认，否定；拒绝",
        "example": ""
      },
      {
        "id": "word-9-52",
        "english": "effective*",
        "phonetic": "/ɪˈfektɪv/",
        "partOfSpeech": "a.",
        "chinese": "有效的，生效的；给人深刻印象的，显著的",
        "example": ""
      },
      {
        "id": "word-10-72",
        "english": "harsh",
        "phonetic": "/hɑːʃ/",
        "partOfSpeech": "a.",
        "chinese": "严厉的，严酷的；粗糙的，毛糙的；刻薄的；（天气或生活环境）恶劣的；刺耳的，刺目的",
        "example": ""
      },
      {
        "id": "word-9-55",
        "english": "union*",
        "phonetic": "/ˈjuːnɪən/",
        "partOfSpeech": "n.",
        "chinese": "协会，工会，同盟；联合，合并",
        "example": ""
      },
      {
        "id": "word-10-45",
        "english": "extendable*",
        "phonetic": "[ɪkˈstendəbl]",
        "partOfSpeech": "a.",
        "chinese": "可延伸的，可展开的，可扩张的",
        "example": ""
      },
      {
        "id": "word-10-63",
        "english": "clarity",
        "phonetic": "/ˈklærətɪ/",
        "partOfSpeech": "n.",
        "chinese": "清楚",
        "example": ""
      },
      {
        "id": "word-10-44",
        "english": "cosmic*",
        "phonetic": "/ˈkɔzmɪk/",
        "partOfSpeech": "a.",
        "chinese": "宇宙的",
        "example": ""
      },
      {
        "id": "word-9-45",
        "english": "calf",
        "phonetic": "/kɑːf/",
        "partOfSpeech": "n.",
        "chinese": "牛犊；崽，幼兽",
        "example": ""
      },
      {
        "id": "word-9-40",
        "english": "breeze",
        "phonetic": "/briːz/",
        "partOfSpeech": "n.",
        "chinese": "微风，和风",
        "example": ""
      },
      {
        "id": "word-10-67",
        "english": "machinery*",
        "phonetic": "[məˈʃi:nəri]",
        "partOfSpeech": "n.",
        "chinese": "<总称> 机械；机构",
        "example": ""
      },
      {
        "id": "word-9-73",
        "english": "swift",
        "phonetic": "/swɪft/",
        "partOfSpeech": "a.",
        "chinese": "快的；敏捷的，迅速的",
        "example": ""
      },
      {
        "id": "word-10-11",
        "english": "fund",
        "phonetic": "/fʌnd/",
        "partOfSpeech": "n.",
        "chinese": "基金，专款；储备，蕴藏； [pl.] 存款，资金 vt. 为……提供资金，给……拨款",
        "example": ""
      },
      {
        "id": "word-10-56",
        "english": "preference",
        "phonetic": "/ˈprefrəns/",
        "partOfSpeech": "n.",
        "chinese": "喜爱；偏爱的事物（或人）；优先",
        "example": ""
      },
      {
        "id": "word-9-61",
        "english": "direction",
        "phonetic": "/dɪˈrekʃn,",
        "partOfSpeech": "",
        "chinese": "daɪ-/ n. 方向；趋势，动向； [pl.] 用法说明；指导",
        "example": ""
      },
      {
        "id": "word-10-4",
        "english": "absent*",
        "phonetic": "/ˈæbsənt/",
        "partOfSpeech": "a.",
        "chinese": "不在场的；心不在焉的",
        "example": ""
      },
      {
        "id": "word-9-50",
        "english": "gallop*",
        "phonetic": "/ˈgæləp/",
        "partOfSpeech": "v./n.",
        "chinese": "奔驰，飞跑，飞驰",
        "example": ""
      },
      {
        "id": "word-9-24",
        "english": "mattress*",
        "phonetic": "/ˈmætrɪs/",
        "partOfSpeech": "n.",
        "chinese": "床垫",
        "example": ""
      },
      {
        "id": "word-10-60",
        "english": "female",
        "phonetic": "/ˈfiːmeɪl/",
        "partOfSpeech": "a.",
        "chinese": "女（性）的；雌的 n. 女子",
        "example": ""
      },
      {
        "id": "word-10-27",
        "english": "graph*",
        "phonetic": "/grɑːf/",
        "partOfSpeech": "n.",
        "chinese": "图，图表，曲线图",
        "example": ""
      },
      {
        "id": "word-9-1",
        "english": "fumes*",
        "phonetic": "[fju:mz]",
        "partOfSpeech": "n.",
        "chinese": "烟，气，汽",
        "example": ""
      },
      {
        "id": "word-10-50",
        "english": "permanent*",
        "phonetic": "/ˈpɜːmənənt/",
        "partOfSpeech": "a.",
        "chinese": "永久的，持久的",
        "example": ""
      },
      {
        "id": "word-10-21",
        "english": "forth*",
        "phonetic": "/fɔːθ/",
        "partOfSpeech": "ad.",
        "chinese": "离去，外出；向前；向某处",
        "example": ""
      },
      {
        "id": "word-9-33",
        "english": "practically",
        "phonetic": "[ˈpræktɪkli]",
        "partOfSpeech": "ad.",
        "chinese": "几乎，简直；实际上",
        "example": ""
      },
      {
        "id": "word-9-26",
        "english": "intervene",
        "phonetic": "/ˏɪntəˈviːn/",
        "partOfSpeech": "vi.",
        "chinese": "干涉，干扰；介于其间",
        "example": ""
      },
      {
        "id": "word-10-68",
        "english": "intimate",
        "phonetic": "/ˈɪntɪmət/",
        "partOfSpeech": "a.",
        "chinese": "亲密的，密切的；私人的，个人的；小圈子内的 n. 至交，密友 /ˈɪntɪmeɪt/ vt. 暗示，提示，透露",
        "example": ""
      },
      {
        "id": "word-10-32",
        "english": "mechanical*",
        "phonetic": "/mɪˈkænɪkl/",
        "partOfSpeech": "a.",
        "chinese": "机械的，机械制造的；呆板的；习惯性的；体力的",
        "example": ""
      },
      {
        "id": "word-9-8",
        "english": "pesticide*",
        "phonetic": "/ˈpestɪsaɪd/",
        "partOfSpeech": "n.",
        "chinese": "杀虫剂，农药",
        "example": ""
      },
      {
        "id": "word-10-43",
        "english": "visa*",
        "phonetic": "/ˈviːzə/",
        "partOfSpeech": "n.",
        "chinese": "签证",
        "example": ""
      },
      {
        "id": "word-9-59",
        "english": "notify",
        "phonetic": "/ˈnəutɪfaɪ/",
        "partOfSpeech": "vt.",
        "chinese": "通知，报告",
        "example": ""
      },
      {
        "id": "word-9-14",
        "english": "insight",
        "phonetic": "/ˈɪnsaɪt/",
        "partOfSpeech": "n.",
        "chinese": "洞察力，深刻的了解；顿悟",
        "example": ""
      },
      {
        "id": "word-9-28",
        "english": "bump*",
        "phonetic": "/bʌmp/",
        "partOfSpeech": "v.",
        "chinese": "碰，撞；颠簸着前进 n. 碰撞；隆起物",
        "example": ""
      },
      {
        "id": "word-10-16",
        "english": "arrangement*",
        "phonetic": "/əˈreɪndʒmənt/",
        "partOfSpeech": "n.",
        "chinese": "安排； [常pl.] 准备工作",
        "example": ""
      },
      {
        "id": "word-9-11",
        "english": "homesick*",
        "phonetic": "[ˈhəʊmsɪk]",
        "partOfSpeech": "a.",
        "chinese": "想家的，思乡的",
        "example": ""
      },
      {
        "id": "word-9-42",
        "english": "magnify",
        "phonetic": "/ˈmægnɪfaɪ/",
        "partOfSpeech": "vt.",
        "chinese": "放大，扩大",
        "example": ""
      },
      {
        "id": "word-9-12",
        "english": "compassionate*",
        "phonetic": "[kəm'pæʃənət]",
        "partOfSpeech": "a.",
        "chinese": "有同情心的，表示怜悯的",
        "example": ""
      },
      {
        "id": "word-10-70",
        "english": "waist*",
        "phonetic": "/weɪst/",
        "partOfSpeech": "n.",
        "chinese": "腰，腰部",
        "example": ""
      },
      {
        "id": "word-10-15",
        "english": "schedule*",
        "phonetic": "/ˈʃedjuːl/",
        "partOfSpeech": "vt.",
        "chinese": "安排；列入，收进（清单等） n. 时刻表；清单",
        "example": ""
      },
      {
        "id": "word-10-34",
        "english": "siesta*",
        "phonetic": "/sɪˈestə/",
        "partOfSpeech": "n.",
        "chinese": "午睡，午休",
        "example": ""
      },
      {
        "id": "word-10-23",
        "english": "forgo*",
        "phonetic": "/fɔːˈgəu/",
        "partOfSpeech": "vt.",
        "chinese": "放弃，抛弃；作罢",
        "example": ""
      },
      {
        "id": "word-10-59",
        "english": "automatically",
        "phonetic": "[ˌɔ:tə'mætɪklɪ]",
        "partOfSpeech": "ad.",
        "chinese": "自动地；无意识地",
        "example": ""
      },
      {
        "id": "word-10-42",
        "english": "diploma",
        "phonetic": "/dɪˈpləumə/",
        "partOfSpeech": "n.",
        "chinese": "毕业文凭（或证书）；资格证书",
        "example": ""
      },
      {
        "id": "word-10-5",
        "english": "scrape",
        "phonetic": "/skreɪp/",
        "partOfSpeech": "v./n.",
        "chinese": "刮，擦",
        "example": ""
      },
      {
        "id": "word-10-28",
        "english": "offset",
        "phonetic": "/ˈɔfset/",
        "partOfSpeech": "vt.",
        "chinese": "抵消，补偿，弥补",
        "example": ""
      },
      {
        "id": "word-10-6",
        "english": "promotion*",
        "phonetic": "/prəˈməuʃn/",
        "partOfSpeech": "n.",
        "chinese": "提升，晋级；促进，增进；发起，发扬；宣传，推销",
        "example": ""
      },
      {
        "id": "word-9-34",
        "english": "acrobat*",
        "phonetic": "/ˈækrəbæt/",
        "partOfSpeech": "n.",
        "chinese": "特技演员；杂技演员",
        "example": ""
      },
      {
        "id": "word-9-27",
        "english": "promote*",
        "phonetic": "/prəˈməut/",
        "partOfSpeech": "vt.",
        "chinese": "促进；提升；促销",
        "example": ""
      },
      {
        "id": "word-9-60",
        "english": "splendid",
        "phonetic": "/ˈsplendɪd/",
        "partOfSpeech": "a.",
        "chinese": "壮观的，壮丽的，极好的；堂皇的，豪华的；灿烂的，辉煌的",
        "example": ""
      },
      {
        "id": "word-9-43",
        "english": "hive*",
        "phonetic": "/haɪv/",
        "partOfSpeech": "n.",
        "chinese": "蜂房，蜂箱；蜂房内的蜂群；闹市，忙碌之地 v. （使）入蜂箱；群居",
        "example": ""
      },
      {
        "id": "word-9-2",
        "english": "positive*",
        "phonetic": "/ˈpɔzətɪv/",
        "partOfSpeech": "a.",
        "chinese": "明确的；肯定的；积极的",
        "example": ""
      },
      {
        "id": "word-9-66",
        "english": "vessel*",
        "phonetic": "/ˈvesl/",
        "partOfSpeech": "n.",
        "chinese": "<总称>船只；容器；血管",
        "example": ""
      },
      {
        "id": "word-9-6",
        "english": "hockey",
        "phonetic": "/ˈhɔkɪ/",
        "partOfSpeech": "n.",
        "chinese": "曲棍球；冰球",
        "example": ""
      },
      {
        "id": "word-10-31",
        "english": "stripe*",
        "phonetic": "/straɪp/",
        "partOfSpeech": "n.",
        "chinese": "条纹",
        "example": ""
      },
      {
        "id": "word-9-37",
        "english": "limp*",
        "phonetic": "/lɪmp/",
        "partOfSpeech": "a.",
        "chinese": "软的；无力的",
        "example": ""
      },
      {
        "id": "word-10-30",
        "english": "intact",
        "phonetic": "/ɪnˈtækt/",
        "partOfSpeech": "a.",
        "chinese": "完整无缺的；完好无损的",
        "example": ""
      },
      {
        "id": "word-10-20",
        "english": "proportion",
        "phonetic": "/prəˈpɔːʃn/",
        "partOfSpeech": "n.",
        "chinese": "比例；部分；相称",
        "example": ""
      },
      {
        "id": "word-10-19",
        "english": "assume*",
        "phonetic": "/əˈsjuːm/",
        "partOfSpeech": "vt.",
        "chinese": "假定，设想；承担（责任），就（职）",
        "example": ""
      },
      {
        "id": "word-9-19",
        "english": "concentration",
        "phonetic": "/ˏkɔnsnˈtreɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "集中；专心，专注；浓缩，浓度",
        "example": ""
      },
      {
        "id": "word-10-13",
        "english": "manufacturer",
        "phonetic": "[ˌmænjuˈfæktʃərə(r)]",
        "partOfSpeech": "n.",
        "chinese": "制造商，制造厂，生产者",
        "example": ""
      },
      {
        "id": "word-10-41",
        "english": "justice",
        "phonetic": "/ˈdʒʌstɪs/",
        "partOfSpeech": "n.",
        "chinese": "正义，公正；司法",
        "example": ""
      },
      {
        "id": "word-9-35",
        "english": "revenue*",
        "phonetic": "/ˈrevənjuː/",
        "partOfSpeech": "n.",
        "chinese": "（尤指大宗的）收入；税收",
        "example": ""
      },
      {
        "id": "word-10-25",
        "english": "conversation*",
        "phonetic": "/ˏkɔnvəˈseɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "会话，谈话",
        "example": ""
      },
      {
        "id": "word-9-23",
        "english": "document*",
        "phonetic": "/ˈdɔkjumənt/",
        "partOfSpeech": "n.",
        "chinese": "公文，文件，证件 vt. 用文件（或文献等）证明；记载",
        "example": ""
      },
      {
        "id": "word-10-7",
        "english": "recreation*",
        "phonetic": "/ˏrekrɪˈeɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "娱乐，消遣",
        "example": ""
      },
      {
        "id": "word-10-71",
        "english": "calibre*",
        "phonetic": "/ˈkælɪbə(r)/",
        "partOfSpeech": "n.",
        "chinese": "质量，才干，能力；口径",
        "example": ""
      },
      {
        "id": "word-9-25",
        "english": "hostile*",
        "phonetic": "/ˈhɔstaɪl/",
        "partOfSpeech": "a.",
        "chinese": "敌方的；不友善的；不利的",
        "example": ""
      },
      {
        "id": "word-10-55",
        "english": "dividend",
        "phonetic": "/ˈdɪvɪdend/",
        "partOfSpeech": "n.",
        "chinese": "红利，股息；回报，效益；被除数",
        "example": ""
      },
      {
        "id": "word-10-8",
        "english": "specialise*",
        "phonetic": "/ˈspeʃəlaɪz/",
        "partOfSpeech": "v.",
        "chinese": "专门研究，专攻；专用于，使适应特殊目的",
        "example": ""
      },
      {
        "id": "word-10-26",
        "english": "recommendation*",
        "phonetic": "[ˌrekəmenˈdeɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "推荐，推荐信；劝告，建议",
        "example": ""
      },
      {
        "id": "word-9-16",
        "english": "glide",
        "phonetic": "/glaɪd/",
        "partOfSpeech": "vi./n.",
        "chinese": "滑行，滑翔",
        "example": ""
      },
      {
        "id": "word-10-22",
        "english": "referee*",
        "phonetic": "/ˏrefəˈriː/",
        "partOfSpeech": "v.",
        "chinese": "裁判；仲裁，调停 n. 裁判（员）；仲裁人，调停人；证明人，介绍人",
        "example": ""
      },
      {
        "id": "word-10-9",
        "english": "magnificent*",
        "phonetic": "/mægˈnɪfɪsnt/",
        "partOfSpeech": "a.",
        "chinese": "壮丽的，宏伟的，华丽的；高尚的",
        "example": ""
      },
      {
        "id": "word-10-73",
        "english": "parliament",
        "phonetic": "/ˈpɑːləmənt/",
        "partOfSpeech": "n.",
        "chinese": "议会，国会",
        "example": ""
      },
      {
        "id": "word-9-18",
        "english": "belief",
        "phonetic": "/bɪˈliːf/",
        "partOfSpeech": "n.",
        "chinese": "信仰，信条；相信",
        "example": ""
      },
      {
        "id": "word-10-49",
        "english": "equip*",
        "phonetic": "/ɪˈkwɪp/",
        "partOfSpeech": "vt.",
        "chinese": "装备，配备；使有能力，使有准备",
        "example": ""
      },
      {
        "id": "word-10-18",
        "english": "extinguisher",
        "phonetic": "[ɪkˈstɪŋgwɪʃə]",
        "partOfSpeech": "n.",
        "chinese": "灭火器；灭火者",
        "example": ""
      },
      {
        "id": "word-9-22",
        "english": "status",
        "phonetic": "/ˈsteɪtəs/",
        "partOfSpeech": "n.",
        "chinese": "地位；身份；状况",
        "example": ""
      },
      {
        "id": "word-9-3",
        "english": "assistant*",
        "phonetic": "[əˈsɪstənt]",
        "partOfSpeech": "a.",
        "chinese": "助理的；副的 n. 助理",
        "example": ""
      },
      {
        "id": "word-9-15",
        "english": "resist*",
        "phonetic": "/rɪˈzɪst/",
        "partOfSpeech": "v.",
        "chinese": "抵抗；抗（病等）；耐（热等）",
        "example": ""
      },
      {
        "id": "word-10-47",
        "english": "supervisor*",
        "phonetic": "[ˈsu:pəvaɪzə(r)]",
        "partOfSpeech": "n.",
        "chinese": "监督人，管理人，指导者；主管",
        "example": ""
      },
      {
        "id": "word-10-51",
        "english": "embed*",
        "phonetic": "/ɪmˈbed/",
        "partOfSpeech": "vt.",
        "chinese": "把……嵌入（或埋入、插入），扎牢；使深留脑中",
        "example": ""
      },
      {
        "id": "word-10-10",
        "english": "spasmodic",
        "phonetic": "/spæzˈmɔdɪk/",
        "partOfSpeech": "a.",
        "chinese": "痉挛的；间歇性的",
        "example": ""
      },
      {
        "id": "word-9-32",
        "english": "commit*",
        "phonetic": "/kəˈmɪt/",
        "partOfSpeech": "v.",
        "chinese": "把……交托给，提交；犯（错误），干（坏事）",
        "example": ""
      },
      {
        "id": "word-10-52",
        "english": "orientation*",
        "phonetic": "[ˌɔ:riənˈteɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "定位；方向，方位；情况介绍；培训，训练",
        "example": ""
      },
      {
        "id": "word-9-48",
        "english": "assemble*",
        "phonetic": "/əˈsembl/",
        "partOfSpeech": "v.",
        "chinese": "集合；装配",
        "example": ""
      },
      {
        "id": "word-9-56",
        "english": "responsibility*",
        "phonetic": "/rɪˏspɔnsəˈbɪlətɪ/",
        "partOfSpeech": "n.",
        "chinese": "责任，责任心；职责，任务",
        "example": ""
      },
      {
        "id": "word-10-75",
        "english": "remind*",
        "phonetic": "/rɪˈmaɪnd/",
        "partOfSpeech": "vt.",
        "chinese": "提醒，使想起；使发生联想",
        "example": ""
      },
      {
        "id": "word-9-68",
        "english": "stereo",
        "phonetic": "/ˈsterɪəu/",
        "partOfSpeech": "a.",
        "chinese": "立体声的 n. 立体声（装置）",
        "example": ""
      },
      {
        "id": "word-10-66",
        "english": "bulk*",
        "phonetic": "/bʌlk/",
        "partOfSpeech": "n.",
        "chinese": "大量；大批",
        "example": ""
      },
      {
        "id": "word-9-17",
        "english": "casualty",
        "phonetic": "/ˈkæʒuəltɪ/",
        "partOfSpeech": "n.",
        "chinese": "伤亡（人员），伤亡者；损失的东西；伤亡事故",
        "example": ""
      },
      {
        "id": "word-9-4",
        "english": "cannon*",
        "phonetic": "/ˈkænən/",
        "partOfSpeech": "n.",
        "chinese": "加农炮，大炮",
        "example": ""
      },
      {
        "id": "word-10-40",
        "english": "replace*",
        "phonetic": "/rɪˈpleɪs/",
        "partOfSpeech": "vt.",
        "chinese": "代替；更换；把……放回原处",
        "example": ""
      },
      {
        "id": "word-9-10",
        "english": "refundable*",
        "phonetic": "[rɪ'fʌndəbl]",
        "partOfSpeech": "a.",
        "chinese": "可退还的，可归还的，可偿还的",
        "example": ""
      },
      {
        "id": "word-9-63",
        "english": "witness",
        "phonetic": "/ˈwɪtnɪs/",
        "partOfSpeech": "n.",
        "chinese": "证据；目击者 v. 目击；为……作证",
        "example": ""
      },
      {
        "id": "word-9-20",
        "english": "tug",
        "phonetic": "/tʌg/",
        "partOfSpeech": "v.",
        "chinese": "用力拖（或拉）",
        "example": ""
      },
      {
        "id": "word-9-7",
        "english": "liberty*",
        "phonetic": "/ˈlɪbətɪ/",
        "partOfSpeech": "n.",
        "chinese": "自由，自由权；许可，准许 [常pl.] 过于随便，放肆",
        "example": ""
      },
      {
        "id": "word-10-24",
        "english": "assistantship*",
        "phonetic": "[əˈsɪstəntʃɪp]",
        "partOfSpeech": "n.",
        "chinese": "（给研究生的）半工半读助学金，（大学）研究生助教奖学金",
        "example": ""
      },
      {
        "id": "word-9-29",
        "english": "reunion*",
        "phonetic": "/ˏriːˈjuːnɪən/",
        "partOfSpeech": "n.",
        "chinese": "重聚，团聚；（久别后的）聚会，联谊活动",
        "example": ""
      },
      {
        "id": "word-10-48",
        "english": "jumble*",
        "phonetic": "/ˈdʒʌmbl/",
        "partOfSpeech": "n.",
        "chinese": "混杂，掺杂；供义卖的旧杂货 vt. 混杂，掺杂",
        "example": ""
      },
      {
        "id": "word-9-30",
        "english": "digestive*",
        "phonetic": "/dɪˈdʒestɪv/",
        "partOfSpeech": "a.",
        "chinese": "消化的；和消化有关的",
        "example": ""
      },
      {
        "id": "word-10-37",
        "english": "staircase",
        "phonetic": "[ˈsteəkeɪs]",
        "partOfSpeech": "n.",
        "chinese": "楼梯",
        "example": ""
      },
      {
        "id": "word-9-58",
        "english": "handy*",
        "phonetic": "/ˈhændɪ/",
        "partOfSpeech": "a.",
        "chinese": "方便的；手边的；手巧的",
        "example": ""
      },
      {
        "id": "word-10-38",
        "english": "arthritis*",
        "phonetic": "/ɑːˈθraɪtɪs/",
        "partOfSpeech": "n.",
        "chinese": "关节炎",
        "example": ""
      },
      {
        "id": "word-9-13",
        "english": "orientate*",
        "phonetic": "/ˈɔːrɪənteɪt/",
        "partOfSpeech": "vt.",
        "chinese": "使适应，使熟悉情况（或环境等）；给……定位，给……定向；使朝向；转至特定方向；适应（=orient）",
        "example": ""
      },
      {
        "id": "word-10-12",
        "english": "perceive",
        "phonetic": "/pəˈsiːv/",
        "partOfSpeech": "vt.",
        "chinese": "感知，察觉；认识到，理解",
        "example": ""
      },
      {
        "id": "word-10-58",
        "english": "uneasy",
        "phonetic": "/ʌnˈiːzɪ/",
        "partOfSpeech": "a.",
        "chinese": "心神不安的；担心的",
        "example": ""
      },
      {
        "id": "word-10-54",
        "english": "amaze",
        "phonetic": "/əˈmeɪz/",
        "partOfSpeech": "vt.",
        "chinese": "使惊奇，使惊愕",
        "example": ""
      },
      {
        "id": "word-10-74",
        "english": "flight",
        "phonetic": "/flaɪt/",
        "partOfSpeech": "n.",
        "chinese": "航班",
        "example": ""
      },
      {
        "id": "word-10-39",
        "english": "barrier*",
        "phonetic": "/ˈbærɪə(r)/",
        "partOfSpeech": "n.",
        "chinese": "栅栏；关卡，检票口；障碍，隔阂；屏障",
        "example": ""
      },
      {
        "id": "word-10-14",
        "english": "specification",
        "phonetic": "/ˏspesɪfɪˈkeɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "[常pl.] 规格，规范；明确说明；（产品等的）说明书",
        "example": ""
      },
      {
        "id": "word-9-57",
        "english": "conform",
        "phonetic": "/kənˈfɔːm/",
        "partOfSpeech": "vi.",
        "chinese": "遵守，服从；适应，顺应；相一致，相符合",
        "example": ""
      },
      {
        "id": "word-9-36",
        "english": "nickel",
        "phonetic": "/ˈnɪkl/",
        "partOfSpeech": "n.",
        "chinese": "镍；（美国或加拿大的）五分镍币",
        "example": ""
      },
      {
        "id": "word-9-46",
        "english": "foremost",
        "phonetic": "/ˈfɔːməust/",
        "partOfSpeech": "a.",
        "chinese": "最好的；最重要的",
        "example": ""
      },
      {
        "id": "word-9-53",
        "english": "appreciate*",
        "phonetic": "/əˈpriːʃɪeɪt/",
        "partOfSpeech": "v.",
        "chinese": "赏识，鉴赏；感激；涨价，增值",
        "example": ""
      },
      {
        "id": "word-9-39",
        "english": "irregularity*",
        "phonetic": "[ɪˌregjəˈlærəti]",
        "partOfSpeech": "n.",
        "chinese": "不规则，无规律",
        "example": ""
      },
      {
        "id": "word-9-38",
        "english": "spit",
        "phonetic": "/spɪt/",
        "partOfSpeech": "v.",
        "chinese": "吐唾沫（或痰）；喷出 n. 唾液，唾沫",
        "example": ""
      },
      {
        "id": "word-9-44",
        "english": "oxide",
        "phonetic": "/ˈɔksaɪd/",
        "partOfSpeech": "n.",
        "chinese": "氧化物",
        "example": ""
      },
      {
        "id": "word-9-70",
        "english": "stout*",
        "phonetic": "/staut/",
        "partOfSpeech": "a.",
        "chinese": "发胖的，肥胖的，强壮的；结实的，牢固的；顽强的，坚毅的",
        "example": ""
      },
      {
        "id": "word-9-31",
        "english": "homestay*",
        "phonetic": "['həʊmsteɪ]",
        "partOfSpeech": "n.",
        "chinese": "在当地居民家居住的时期",
        "example": ""
      },
      {
        "id": "word-10-1",
        "english": "ignorance",
        "phonetic": "/ˈɪgnərəns/",
        "partOfSpeech": "n.",
        "chinese": "无知，愚昧；不知道",
        "example": ""
      },
      {
        "id": "word-9-9",
        "english": "poll*",
        "phonetic": "/pəul/",
        "partOfSpeech": "n.",
        "chinese": "民意测验；政治选举，大选 v. 对……进行民意测验；获得……选票",
        "example": ""
      },
      {
        "id": "word-9-5",
        "english": "obligation",
        "phonetic": "/ˏɔblɪˈgeɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "义务，职责，责任",
        "example": ""
      },
      {
        "id": "word-9-41",
        "english": "avenue",
        "phonetic": "/ˈævənjuː/",
        "partOfSpeech": "n.",
        "chinese": "林荫道，大街；方法，途径",
        "example": ""
      },
      {
        "id": "word-9-21",
        "english": "proceed*",
        "phonetic": "/prəˈsiːd/",
        "partOfSpeech": "vi.",
        "chinese": "进行；前进；继续",
        "example": ""
      },
      {
        "id": "word-9-62",
        "english": "execute",
        "phonetic": "/ˈeksɪkjuːt/",
        "partOfSpeech": "vt.",
        "chinese": "将……处死；实施，执行",
        "example": ""
      }
    ],
    "article": "In the field of Scientific Discovery, researchers have been studying various phenomena to understand their implications. The concept of detect* has been widely discussed in recent studies. The concept of sophisticated has been widely discussed in recent studies. The concept of abundance* has been widely discussed in recent studies. The concept of pledge* has been widely discussed in recent studies. The concept of aesthetic has been widely discussed in recent studies. The concept of procedure has been widely discussed in recent studies. The concept of screen* has been widely discussed in recent studies. The concept of athlete has been widely discussed in recent studies. The concept of destruction* has been widely discussed in recent studies. The concept of swap* has been widely discussed in recent studies. Researchers have found that these factors play a significant role in shaping our understanding of the subject. Further studies are needed to explore the full implications of these findings."
  },
  {
    "id": "unit-6",
    "name": "Unit 6: Word Lists 11 & 12",
    "words": [
      {
        "id": "word-12-37",
        "english": "combine*",
        "phonetic": "/kəmˈbaɪn/",
        "partOfSpeech": "v.",
        "chinese": "联合，结合",
        "example": ""
      },
      {
        "id": "word-11-11",
        "english": "specialty",
        "phonetic": "[ˈspeʃəlti]",
        "partOfSpeech": "n.",
        "chinese": "特产；特长",
        "example": ""
      },
      {
        "id": "word-11-10",
        "english": "enforce",
        "phonetic": "/ɪnˈfɔːs/",
        "partOfSpeech": "vt.",
        "chinese": "实施，执行；强制，迫使",
        "example": ""
      },
      {
        "id": "word-11-35",
        "english": "shorthand",
        "phonetic": "[ˈʃɔ:thænd]",
        "partOfSpeech": "n.",
        "chinese": "速记法；速记",
        "example": ""
      },
      {
        "id": "word-11-17",
        "english": "retailer*",
        "phonetic": "[ˈri:teɪlə(r)]",
        "partOfSpeech": "n.",
        "chinese": "零售商人；复述者，传播者",
        "example": ""
      },
      {
        "id": "word-11-9",
        "english": "coverage",
        "phonetic": "/ˈkʌvərɪdʒ/",
        "partOfSpeech": "n.",
        "chinese": "新闻报道；覆盖范围",
        "example": ""
      },
      {
        "id": "word-11-16",
        "english": "indifferent*",
        "phonetic": "/ɪnˈdɪfrənt/",
        "partOfSpeech": "a.",
        "chinese": "冷漠的，不关心的",
        "example": ""
      },
      {
        "id": "word-11-15",
        "english": "realistic*",
        "phonetic": "[ˌri:əˈlɪstɪk]",
        "partOfSpeech": "a.",
        "chinese": "现实（主义的），实际的；恰如其分的；逼真的",
        "example": ""
      },
      {
        "id": "word-11-19",
        "english": "brand",
        "phonetic": "/brnd/",
        "partOfSpeech": "n.",
        "chinese": "商标；品牌 vt. 铭刻，打烙印于；丑化",
        "example": ""
      },
      {
        "id": "word-11-12",
        "english": "intrinsic*",
        "phonetic": "/ɪnˈtrɪnsɪk/",
        "partOfSpeech": "a.",
        "chinese": "固有的，内在的；本质的",
        "example": ""
      },
      {
        "id": "word-11-37",
        "english": "rude",
        "phonetic": "/ruːd/",
        "partOfSpeech": "a.",
        "chinese": "粗鲁的；粗糙的",
        "example": ""
      },
      {
        "id": "word-11-8",
        "english": "headquarters*",
        "phonetic": "[ˈhedˈkwɔ:təz]",
        "partOfSpeech": "n.",
        "chinese": "总部，总公司；大本营；司令部",
        "example": ""
      },
      {
        "id": "word-11-22",
        "english": "mention*",
        "phonetic": "/ˈmenʃn/",
        "partOfSpeech": "n./v.",
        "chinese": "提及，说起",
        "example": ""
      },
      {
        "id": "word-11-7",
        "english": "predict*",
        "phonetic": "/prɪˈdɪkt/",
        "partOfSpeech": "v.",
        "chinese": "预言；预告",
        "example": ""
      },
      {
        "id": "word-11-6",
        "english": "graduate*",
        "phonetic": "/ˈgrædʒuət/",
        "partOfSpeech": "n.",
        "chinese": "（尤指大学）毕业生；研究生 /ˈgrædʒueɪt/ v. （使）毕业；获得学位",
        "example": ""
      },
      {
        "id": "word-11-34",
        "english": "anecdotal*",
        "phonetic": "[ˌænɪkˈdəʊtl]",
        "partOfSpeech": "a.",
        "chinese": "轶话的，轶闻趣事的",
        "example": ""
      },
      {
        "id": "word-11-61",
        "english": "insufficient*",
        "phonetic": "/ˏɪnsəˈfɪʃnt/",
        "partOfSpeech": "a.",
        "chinese": "不足的，不够的",
        "example": ""
      },
      {
        "id": "word-11-20",
        "english": "accompany",
        "phonetic": "/əˈkʌmpənɪ/",
        "partOfSpeech": "vt.",
        "chinese": "陪伴；伴随，与……同时发生；伴奏",
        "example": ""
      },
      {
        "id": "word-11-68",
        "english": "entertainment*",
        "phonetic": "[ˌentəˈteɪnmənt]",
        "partOfSpeech": "n.",
        "chinese": "招待，款待；娱乐（业）；供消遣的事物",
        "example": ""
      },
      {
        "id": "word-11-32",
        "english": "submit*",
        "phonetic": "/səbˈmɪt/",
        "partOfSpeech": "v.",
        "chinese": "屈从；提交",
        "example": ""
      },
      {
        "id": "word-11-36",
        "english": "exceptional",
        "phonetic": "/ɪkˈsepʃənl/",
        "partOfSpeech": "a.",
        "chinese": "例外的；异常的",
        "example": ""
      },
      {
        "id": "word-12-41",
        "english": "occasion*",
        "phonetic": "/əˈkeɪʒn/",
        "partOfSpeech": "n.",
        "chinese": "时刻，时候；场合；重大（或特殊）活动，盛会；时机，机会；起因，理由 vt. 引起，惹起",
        "example": ""
      },
      {
        "id": "word-12-68",
        "english": "complain*",
        "phonetic": "/kəmˈpleɪn/",
        "partOfSpeech": "v.",
        "chinese": "抱怨；投诉",
        "example": ""
      },
      {
        "id": "word-12-31",
        "english": "rectangular",
        "phonetic": "[rek'tæŋɡjələ(r)]",
        "partOfSpeech": "a.",
        "chinese": "长方形的，矩形的",
        "example": ""
      },
      {
        "id": "word-12-25",
        "english": "horrify*",
        "phonetic": "/ˈhɔrɪfaɪ/",
        "partOfSpeech": "vt.",
        "chinese": "使恐惧，使惊骇；使震惊；使感到厌恶",
        "example": ""
      },
      {
        "id": "word-11-66",
        "english": "correspondence*",
        "phonetic": "[ˌkɒrəˈspɒndəns]",
        "partOfSpeech": "n.",
        "chinese": "通信，信件；符合，一致；对应",
        "example": ""
      },
      {
        "id": "word-12-44",
        "english": "recover*",
        "phonetic": "/rɪˈkʌvə(r)/",
        "partOfSpeech": "v.",
        "chinese": "重新获得，重新得到；使复原，使康复；收回，换回",
        "example": ""
      },
      {
        "id": "word-11-5",
        "english": "suitcase",
        "phonetic": "[ˈsu:tkeɪs]",
        "partOfSpeech": "n.",
        "chinese": "手提箱；衣箱",
        "example": ""
      },
      {
        "id": "word-11-45",
        "english": "stake*",
        "phonetic": "/steɪk/",
        "partOfSpeech": "n.",
        "chinese": "桩；火刑柱；利害关系；股份；赌金 vt. 以……打赌；拿……冒险",
        "example": ""
      },
      {
        "id": "word-12-4",
        "english": "flexibility",
        "phonetic": "[ˌfleksə'bɪlətɪ]",
        "partOfSpeech": "n.",
        "chinese": "柔韧，有弹性；柔顺，温顺；灵活性；适应性",
        "example": ""
      },
      {
        "id": "word-11-30",
        "english": "tribute*",
        "phonetic": "/ˈtrɪbjuːt/",
        "partOfSpeech": "n.",
        "chinese": "贡品；颂词，称赞；（表示敬意的）礼物",
        "example": ""
      },
      {
        "id": "word-12-66",
        "english": "currency",
        "phonetic": "/ˈkʌrənsɪ/",
        "partOfSpeech": "n.",
        "chinese": "货币；通用，流行",
        "example": ""
      },
      {
        "id": "word-12-59",
        "english": "attribute",
        "phonetic": "/",
        "partOfSpeech": "",
        "chinese": "əˈtrɪbjuːt/ vt. 把……归于 /ˈætrɪbjuːt/ n. 属性；品质",
        "example": ""
      },
      {
        "id": "word-12-20",
        "english": "tropospheric*",
        "phonetic": "[trɒpəʊ'sferɪk]",
        "partOfSpeech": "a.",
        "chinese": "对流层的",
        "example": ""
      },
      {
        "id": "word-12-72",
        "english": "tramp*",
        "phonetic": "/træmp/",
        "partOfSpeech": "v.",
        "chinese": "跋涉；踩踏 n. 长途跋涉",
        "example": ""
      },
      {
        "id": "word-11-33",
        "english": "archive*",
        "phonetic": "[ˈɑ:kaɪv]",
        "partOfSpeech": "n.",
        "chinese": "档案；档案室 vt. 存档",
        "example": ""
      },
      {
        "id": "word-11-18",
        "english": "turnover",
        "phonetic": "[ˈtɜ:nəʊvə(r)]",
        "partOfSpeech": "n.",
        "chinese": "营业额；人事变动率；货物周转率",
        "example": ""
      },
      {
        "id": "word-11-13",
        "english": "medical*",
        "phonetic": "/ˈmedɪkl/",
        "partOfSpeech": "a.",
        "chinese": "医学的，医疗的；内科的",
        "example": ""
      },
      {
        "id": "word-11-21",
        "english": "cheat*",
        "phonetic": "/tʃiːt/",
        "partOfSpeech": "v.",
        "chinese": "欺骗；作弊 n. 欺骗；骗子",
        "example": ""
      },
      {
        "id": "word-11-52",
        "english": "contribute",
        "phonetic": "/kənˈtrɪbjuːt/; {ˈkɒntrɪbjuːt}",
        "partOfSpeech": "v.",
        "chinese": "捐赠，捐助；起作用，影响",
        "example": ""
      },
      {
        "id": "word-12-3",
        "english": "declaration",
        "phonetic": "/ˏdekləˈreɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "宣布；宣言，声明（书）",
        "example": ""
      },
      {
        "id": "word-11-23",
        "english": "level*",
        "phonetic": "/ˈlevl/",
        "partOfSpeech": "n.",
        "chinese": "水平面，水平线；高度，水平；等级 a. 平的、水平的；同高度的，同等程度的；平稳的；冷静的 v. （使）变平坦",
        "example": ""
      },
      {
        "id": "word-11-55",
        "english": "exacerbate*",
        "phonetic": "/ɪgˈzæsəbeɪt/",
        "partOfSpeech": "vt.",
        "chinese": "恶化，加剧",
        "example": ""
      },
      {
        "id": "word-12-18",
        "english": "clay*",
        "phonetic": "/kleɪ/",
        "partOfSpeech": "n.",
        "chinese": "泥土，黏土",
        "example": ""
      },
      {
        "id": "word-12-53",
        "english": "mercury",
        "phonetic": "/ˈmɜːkjurɪ/",
        "partOfSpeech": "n.",
        "chinese": "水银",
        "example": ""
      },
      {
        "id": "word-12-47",
        "english": "critical*",
        "phonetic": "/ˈkrɪtɪkl/",
        "partOfSpeech": "a.",
        "chinese": "批评的，评论的；危急的，紧要的；临界的；挑剔的",
        "example": ""
      },
      {
        "id": "word-12-74",
        "english": "inflation",
        "phonetic": "[ɪn'fleɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "通货膨胀",
        "example": ""
      },
      {
        "id": "word-11-39",
        "english": "bookrest*",
        "phonetic": "['bʊkrest]",
        "partOfSpeech": "n.",
        "chinese": "阅书架",
        "example": ""
      },
      {
        "id": "word-12-17",
        "english": "identical*",
        "phonetic": "/aɪˈdentɪkl/",
        "partOfSpeech": "a.",
        "chinese": "完全相同的，同一的",
        "example": ""
      },
      {
        "id": "word-11-44",
        "english": "thereby*",
        "phonetic": "/ˏðeəˈbaɪ/",
        "partOfSpeech": "ad.",
        "chinese": "因此，从而",
        "example": ""
      },
      {
        "id": "word-12-7",
        "english": "loyalty*",
        "phonetic": "/ˈlɔɪəlt/",
        "partOfSpeech": "n.",
        "chinese": "忠诚，忠心",
        "example": ""
      },
      {
        "id": "word-12-23",
        "english": "surround",
        "phonetic": "/səˈraund/",
        "partOfSpeech": "vt.",
        "chinese": "围绕；包围",
        "example": ""
      },
      {
        "id": "word-11-58",
        "english": "cork",
        "phonetic": "/kɔːk/",
        "partOfSpeech": "n.",
        "chinese": "软木塞 vt. 用软木塞塞住",
        "example": ""
      },
      {
        "id": "word-11-40",
        "english": "primitive",
        "phonetic": "/ˈprɪmɪtɪv/",
        "partOfSpeech": "a.",
        "chinese": "原始的，上古的；简单的，粗糙的 n. 原始人；原始事物",
        "example": ""
      },
      {
        "id": "word-12-56",
        "english": "accessible",
        "phonetic": "/əkˈsesəbl/",
        "partOfSpeech": "a.",
        "chinese": "能接近的；易达到的",
        "example": ""
      },
      {
        "id": "word-12-8",
        "english": "conditioner*",
        "phonetic": "[kənˈdɪʃənə(r)]",
        "partOfSpeech": "n.",
        "chinese": "护发素，护发剂；调节物；调节器，调节装置",
        "example": ""
      },
      {
        "id": "word-12-30",
        "english": "memorandum",
        "phonetic": "/ˏmeməˈrændəm/",
        "partOfSpeech": "n.",
        "chinese": "备忘录，摘要",
        "example": ""
      },
      {
        "id": "word-12-24",
        "english": "impression*",
        "phonetic": "/ɪmˈpreʃn/",
        "partOfSpeech": "n.",
        "chinese": "印象，感想；印记，压痕",
        "example": ""
      },
      {
        "id": "word-11-49",
        "english": "slat",
        "phonetic": "/slæt/",
        "partOfSpeech": "n.",
        "chinese": "板条，狭板 vt. 用板条制作",
        "example": ""
      },
      {
        "id": "word-12-10",
        "english": "controversy*",
        "phonetic": "/ˈkɔntrəvɜːsɪ/",
        "partOfSpeech": "n.",
        "chinese": "争论，辩论，论战",
        "example": ""
      },
      {
        "id": "word-12-55",
        "english": "expire*",
        "phonetic": "/ɪkˈspaɪə(r)/",
        "partOfSpeech": "v.",
        "chinese": "期满；终止",
        "example": ""
      },
      {
        "id": "word-12-14",
        "english": "scrap*",
        "phonetic": "/skræp/",
        "partOfSpeech": "n.",
        "chinese": "碎屑 vt. 废弃；抛弃",
        "example": ""
      },
      {
        "id": "word-12-33",
        "english": "standpoint",
        "phonetic": "/ˈstændpɔɪnt/",
        "partOfSpeech": "n.",
        "chinese": "立场；观点",
        "example": ""
      },
      {
        "id": "word-12-58",
        "english": "backbone*",
        "phonetic": "[ˈbækbəʊn]",
        "partOfSpeech": "n.",
        "chinese": "脊椎；骨干；支柱",
        "example": ""
      },
      {
        "id": "word-12-2",
        "english": "instruct",
        "phonetic": "/ɪnˈstrʌkt/",
        "partOfSpeech": "vt.",
        "chinese": "教导；指示，命令",
        "example": ""
      },
      {
        "id": "word-12-63",
        "english": "proposal",
        "phonetic": "/prəˈpəuzl/",
        "partOfSpeech": "n.",
        "chinese": "提议，建议；求婚",
        "example": ""
      },
      {
        "id": "word-11-47",
        "english": "aerobics",
        "phonetic": "/eəˈrəubɪks/",
        "partOfSpeech": "n.",
        "chinese": "有氧运动",
        "example": ""
      },
      {
        "id": "word-12-22",
        "english": "earthwork*",
        "phonetic": "[ˈə:θwə:k]",
        "partOfSpeech": "n.",
        "chinese": "土方（工程）",
        "example": ""
      },
      {
        "id": "word-12-5",
        "english": "native*",
        "phonetic": "/ˈneɪtɪv/",
        "partOfSpeech": "a.",
        "chinese": "当地（人）的 n. 本地人，本国人",
        "example": ""
      },
      {
        "id": "word-12-54",
        "english": "trinket*",
        "phonetic": "/ˈtrɪŋkɪt/",
        "partOfSpeech": "n.",
        "chinese": "小装饰品；不值钱的珠宝",
        "example": ""
      },
      {
        "id": "word-12-65",
        "english": "fatal*",
        "phonetic": "/ˈfeɪtl/",
        "partOfSpeech": "a.",
        "chinese": "致命的；重大的；命中注定的；灾难性的",
        "example": ""
      },
      {
        "id": "word-12-15",
        "english": "anxious*",
        "phonetic": "/ˈæŋkʃəs/",
        "partOfSpeech": "a.",
        "chinese": "渴望的；忧虑的",
        "example": ""
      },
      {
        "id": "word-11-31",
        "english": "sanitary*",
        "phonetic": "/ˈsænɪtrɪ/",
        "partOfSpeech": "a.",
        "chinese": "清洁的；保健的，卫生的 n. （有卫生设备的）公共厕所",
        "example": ""
      },
      {
        "id": "word-11-24",
        "english": "lateral*",
        "phonetic": "/ˈlætərəl/",
        "partOfSpeech": "a.",
        "chinese": "侧面的，旁边的",
        "example": ""
      },
      {
        "id": "word-12-60",
        "english": "magnitude",
        "phonetic": "/ˈmægnɪtjuːd/",
        "partOfSpeech": "n.",
        "chinese": "广大，巨大；重要，重要性；星体的亮度",
        "example": ""
      },
      {
        "id": "word-11-72",
        "english": "larva*",
        "phonetic": "/ˈlɑːvə/",
        "partOfSpeech": "n.",
        "chinese": "[pl. larvae] 幼虫，幼体",
        "example": ""
      },
      {
        "id": "word-12-50",
        "english": "remove*",
        "phonetic": "/rɪˈmuːv/",
        "partOfSpeech": "vt.",
        "chinese": "排除，消除；搬迁，移动；开除，解除 n. 距离，间距",
        "example": ""
      },
      {
        "id": "word-12-71",
        "english": "disrupt",
        "phonetic": "/dɪsˈrʌpt/",
        "partOfSpeech": "vt.",
        "chinese": "使中断；扰乱",
        "example": ""
      },
      {
        "id": "word-11-41",
        "english": "craft*",
        "phonetic": "/krɑːft/",
        "partOfSpeech": "n.",
        "chinese": "工艺，手艺；船；航空器",
        "example": ""
      },
      {
        "id": "word-12-1",
        "english": "ensue",
        "phonetic": "/ɪnˈsjuː/",
        "partOfSpeech": "vi.",
        "chinese": "继而发生；接着发生",
        "example": ""
      },
      {
        "id": "word-11-53",
        "english": "imagination",
        "phonetic": "/ɪˏmædʒɪˈneɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "想象（力）；想象出来的事物",
        "example": ""
      },
      {
        "id": "word-11-4",
        "english": "declare",
        "phonetic": "/dɪˈkleə(r)/",
        "partOfSpeech": "v.",
        "chinese": "正式宣布；声明；断言",
        "example": ""
      },
      {
        "id": "word-11-75",
        "english": "occasional",
        "phonetic": "/əˈkeɪʒənl/",
        "partOfSpeech": "a.",
        "chinese": "偶尔的，间或发生的",
        "example": ""
      },
      {
        "id": "word-11-29",
        "english": "export*",
        "phonetic": "/ɪkˈspɔːt;/",
        "partOfSpeech": "v.",
        "chinese": "出口；输出，传播 /ˈekspɔːt/ n. 出口；输出；出口商品",
        "example": ""
      },
      {
        "id": "word-12-13",
        "english": "sensation",
        "phonetic": "/senˈseɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "（感官的）感觉能力；感觉，知觉；轰动，引起轰动的事件（或人物）",
        "example": ""
      },
      {
        "id": "word-11-76",
        "english": "crater",
        "phonetic": "/ˈkreɪtə(r)/",
        "partOfSpeech": "n.",
        "chinese": "火山口；坑",
        "example": ""
      },
      {
        "id": "word-11-60",
        "english": "buffalo*",
        "phonetic": "/ˈbʌfələu/",
        "partOfSpeech": "n.",
        "chinese": "水牛；（北美）野牛",
        "example": ""
      },
      {
        "id": "word-11-51",
        "english": "cinematography",
        "phonetic": "[ˌsɪnəməˈtɒgrəfi]",
        "partOfSpeech": "n.",
        "chinese": "电影摄影术",
        "example": ""
      },
      {
        "id": "word-11-27",
        "english": "snack",
        "phonetic": "/snæk/",
        "partOfSpeech": "n.",
        "chinese": "快餐，小吃；点心",
        "example": ""
      },
      {
        "id": "word-12-48",
        "english": "vocational*",
        "phonetic": "[vəʊˈkeɪʃənl]",
        "partOfSpeech": "a.",
        "chinese": "职业的，业务的",
        "example": ""
      },
      {
        "id": "word-12-40",
        "english": "signature",
        "phonetic": "/ˈsɪgnətʃə(r)/",
        "partOfSpeech": "n.",
        "chinese": "签名，签字；签署",
        "example": ""
      },
      {
        "id": "word-12-36",
        "english": "clutch",
        "phonetic": "/klʌtʃ/",
        "partOfSpeech": "n.",
        "chinese": "离合器； [常 pl.] 控制 v. 企图抓；抓紧",
        "example": ""
      },
      {
        "id": "word-12-21",
        "english": "attraction",
        "phonetic": "/əˈtrækʃn/",
        "partOfSpeech": "n.",
        "chinese": "爱慕，吸引；吸引力；具有吸引力的事（或人）",
        "example": ""
      },
      {
        "id": "word-12-32",
        "english": "kidney",
        "phonetic": "/ˈkɪdnɪ/",
        "partOfSpeech": "n.",
        "chinese": "肾，肾脏",
        "example": ""
      },
      {
        "id": "word-12-39",
        "english": "asthma*",
        "phonetic": "/ˈæsmə/",
        "partOfSpeech": "n.",
        "chinese": "哮喘症",
        "example": ""
      },
      {
        "id": "word-11-26",
        "english": "flash",
        "phonetic": "/flæʃ/",
        "partOfSpeech": "v.",
        "chinese": "闪光，闪耀 n. 闪烁；闪光灯",
        "example": ""
      },
      {
        "id": "word-11-3",
        "english": "dweller*",
        "phonetic": "[ˈdwelə(r)]",
        "partOfSpeech": "n.",
        "chinese": "居住者，居民",
        "example": ""
      },
      {
        "id": "word-12-45",
        "english": "moderation*",
        "phonetic": "/ˏmɔdəˈreɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "温和，中庸；适度，合理",
        "example": ""
      },
      {
        "id": "word-12-42",
        "english": "mineral",
        "phonetic": "/ˈmɪnərəl/",
        "partOfSpeech": "n.",
        "chinese": "矿物，矿石",
        "example": ""
      },
      {
        "id": "word-12-43",
        "english": "invaluable",
        "phonetic": "/ɪnˈvæljuəbl/",
        "partOfSpeech": "a.",
        "chinese": "无价的",
        "example": ""
      },
      {
        "id": "word-12-67",
        "english": "disapprove*",
        "phonetic": "/ˏdɪsəˈpruːv/",
        "partOfSpeech": "v.",
        "chinese": "不赞成，反对",
        "example": ""
      },
      {
        "id": "word-11-2",
        "english": "cell*",
        "phonetic": "/sel/",
        "partOfSpeech": "n.",
        "chinese": "细胞；小房间；电池",
        "example": ""
      },
      {
        "id": "word-11-74",
        "english": "offspring",
        "phonetic": "/ˈɔfsprɪŋ/",
        "partOfSpeech": "n.",
        "chinese": "子女，后代；产物",
        "example": ""
      },
      {
        "id": "word-12-61",
        "english": "compatible",
        "phonetic": "/kəmˈpætəbl/",
        "partOfSpeech": "a.",
        "chinese": "兼容的；合得来的",
        "example": ""
      },
      {
        "id": "word-12-51",
        "english": "coffer",
        "phonetic": "/ˈkɔfə(r)/",
        "partOfSpeech": "n.",
        "chinese": "保险箱",
        "example": ""
      },
      {
        "id": "word-12-6",
        "english": "significant*",
        "phonetic": "/sɪgˈnɪfɪkənt/",
        "partOfSpeech": "a.",
        "chinese": "有意义的；重大的，重要的",
        "example": ""
      },
      {
        "id": "word-11-43",
        "english": "goggles*",
        "phonetic": "/ˈgɔglz/",
        "partOfSpeech": "n.",
        "chinese": "护目镜；风镜；游泳镜",
        "example": ""
      },
      {
        "id": "word-12-9",
        "english": "reduce*",
        "phonetic": "/rɪˈdjuːs/",
        "partOfSpeech": "v.",
        "chinese": "减少，缩小；简化",
        "example": ""
      },
      {
        "id": "word-12-38",
        "english": "chart*",
        "phonetic": "/tʃɑːt/",
        "partOfSpeech": "n.",
        "chinese": "图，图表；海图 vt. 记录；用图表表示；制图",
        "example": ""
      },
      {
        "id": "word-11-38",
        "english": "resume",
        "phonetic": "/rɪˈzjuːm/",
        "partOfSpeech": "v.",
        "chinese": "（中断后）重新开始，继续恢复",
        "example": ""
      },
      {
        "id": "word-11-14",
        "english": "stick*",
        "phonetic": "/stɪk/",
        "partOfSpeech": "v.",
        "chinese": "刺，戳；黏贴，黏住；卡住，陷住",
        "example": ""
      },
      {
        "id": "word-11-67",
        "english": "allocation*",
        "phonetic": "[ˌæləˈkeɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "配给，分配，安置；配给量",
        "example": ""
      },
      {
        "id": "word-12-34",
        "english": "curative*",
        "phonetic": "/ˈkjuərətɪv/",
        "partOfSpeech": "a.",
        "chinese": "有疗效的；医疗的",
        "example": ""
      },
      {
        "id": "word-11-65",
        "english": "confuse*",
        "phonetic": "/kənˈfjuːz/",
        "partOfSpeech": "vt.",
        "chinese": "使混乱，混淆；使迷惑，使糊涂",
        "example": ""
      },
      {
        "id": "word-12-29",
        "english": "onwards*",
        "phonetic": "[ˈɔnwədz]",
        "partOfSpeech": "ad.",
        "chinese": "向前地，前进地",
        "example": ""
      },
      {
        "id": "word-12-16",
        "english": "recipient",
        "phonetic": "/rɪˈsɪpɪənt/",
        "partOfSpeech": "n.",
        "chinese": "接受者",
        "example": ""
      },
      {
        "id": "word-11-1",
        "english": "aquarium*",
        "phonetic": "[əˈkweəriəm]",
        "partOfSpeech": "n.",
        "chinese": "养鱼池；玻璃缸；水族馆",
        "example": ""
      },
      {
        "id": "word-12-57",
        "english": "turbine*",
        "phonetic": "/ˈtɜːbaɪn/",
        "partOfSpeech": "n.",
        "chinese": "涡轮机，汽轮机",
        "example": ""
      },
      {
        "id": "word-12-27",
        "english": "compact*",
        "phonetic": "/kəmˈpækt/",
        "partOfSpeech": "a.",
        "chinese": "紧密的，结实的；简明的；紧凑的 vt. 使紧凑，压缩",
        "example": ""
      },
      {
        "id": "word-11-25",
        "english": "dense",
        "phonetic": "/dens/",
        "partOfSpeech": "a.",
        "chinese": "密集的；浓厚的",
        "example": ""
      },
      {
        "id": "word-12-49",
        "english": "summary*",
        "phonetic": "/ˈsʌmərɪ/",
        "partOfSpeech": "n.",
        "chinese": "摘要，概要 a. 概括的，简略的",
        "example": ""
      },
      {
        "id": "word-11-63",
        "english": "humid*",
        "phonetic": "/ˈhjuːmɪd/",
        "partOfSpeech": "a.",
        "chinese": "湿的，潮湿的，湿润的，多潮气的",
        "example": ""
      },
      {
        "id": "word-12-35",
        "english": "predominantly",
        "phonetic": "[prɪˈdɒmɪnəntli]",
        "partOfSpeech": "ad.",
        "chinese": "主要地；重要地；显著地",
        "example": ""
      },
      {
        "id": "word-11-50",
        "english": "legal*",
        "phonetic": "/ˈliːgl/",
        "partOfSpeech": "a.",
        "chinese": "法律的；合法的",
        "example": ""
      },
      {
        "id": "word-11-71",
        "english": "reward",
        "phonetic": "/rɪˈwɔːd/",
        "partOfSpeech": "n.",
        "chinese": "奖赏；报酬 vt. 酬谢；奖励",
        "example": ""
      },
      {
        "id": "word-11-70",
        "english": "decoration*",
        "phonetic": "/ˏdekəˈreɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "装饰，装潢；装饰品",
        "example": ""
      },
      {
        "id": "word-12-12",
        "english": "dwell",
        "phonetic": "/dwel/",
        "partOfSpeech": "vi.",
        "chinese": "居住；栖身",
        "example": ""
      },
      {
        "id": "word-12-52",
        "english": "bound*",
        "phonetic": "/baund/",
        "partOfSpeech": "a.",
        "chinese": "负有义务的；一定的，必然的",
        "example": ""
      },
      {
        "id": "word-12-28",
        "english": "enquire*",
        "phonetic": "[ɪnˈkwaɪə(r)]",
        "partOfSpeech": "v.",
        "chinese": "打听，询问；查问，调查",
        "example": ""
      },
      {
        "id": "word-11-56",
        "english": "intrusion*",
        "phonetic": "/ɪnˈtruːʒn/",
        "partOfSpeech": "n.",
        "chinese": "闯入；打搅；侵扰",
        "example": ""
      },
      {
        "id": "word-11-42",
        "english": "hire",
        "phonetic": "/ˈhaɪə(r)/",
        "partOfSpeech": "v./n.",
        "chinese": "租用；雇用",
        "example": ""
      },
      {
        "id": "word-12-70",
        "english": "audacious*",
        "phonetic": "/ɔːˈdeɪʃəs/",
        "partOfSpeech": "a.",
        "chinese": "大胆的；有冒险精神的；鲁莽的；厚颜无耻的",
        "example": ""
      },
      {
        "id": "word-11-64",
        "english": "relation*",
        "phonetic": "/rɪˈleɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "关系，联系；亲属，亲戚",
        "example": ""
      },
      {
        "id": "word-12-62",
        "english": "entrepreneur",
        "phonetic": "/ˏɔntrəprəˈnɜː(r)/",
        "partOfSpeech": "n.",
        "chinese": "企业家；承包人",
        "example": ""
      },
      {
        "id": "word-12-46",
        "english": "documentation*",
        "phonetic": "[ˌdɒkjumenˈteɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "文件证据，文献资料，文件",
        "example": ""
      },
      {
        "id": "word-12-26",
        "english": "introduction*",
        "phonetic": "/ˏɪntrəˈdʌkʃn/",
        "partOfSpeech": "n.",
        "chinese": "介绍；传入，引进；导言，绪论",
        "example": ""
      },
      {
        "id": "word-11-48",
        "english": "shrub",
        "phonetic": "/ʃrʌb/",
        "partOfSpeech": "n.",
        "chinese": "灌木",
        "example": ""
      },
      {
        "id": "word-12-69",
        "english": "fact",
        "phonetic": "",
        "partOfSpeech": "sheet",
        "chinese": "[fækt ʃi:t] n. （尤指英国广播或电视节目中有关讨论题目的）资料页",
        "example": ""
      },
      {
        "id": "word-11-28",
        "english": "marvellous*",
        "phonetic": "[ˈmɑ:vələs]",
        "partOfSpeech": "n.",
        "chinese": "令人惊奇的；奇特的，非凡的；奇迹般的，不可思议的；绝妙的",
        "example": ""
      },
      {
        "id": "word-11-46",
        "english": "barge*",
        "phonetic": "/bɑːdʒ/",
        "partOfSpeech": "n.",
        "chinese": "驳船 v. 猛撞；闯",
        "example": ""
      },
      {
        "id": "word-12-73",
        "english": "pest*",
        "phonetic": "/pest/",
        "partOfSpeech": "n.",
        "chinese": "害虫",
        "example": ""
      },
      {
        "id": "word-12-11",
        "english": "service*",
        "phonetic": "/ˈsɜːvɪs/",
        "partOfSpeech": "n.",
        "chinese": "服务，帮助；公共设施，公用事业；维修，保养；行政部门，服务机构 vt. 维修，保养",
        "example": ""
      },
      {
        "id": "word-12-19",
        "english": "rival",
        "phonetic": "/ˈraɪvl/",
        "partOfSpeech": "n.",
        "chinese": "竞争者，竞争对手；可与匹敌的人（或物） a. 竞争的，对抗的 vt. 与……竞争；与……匹敌，比得上；竞争，对抗",
        "example": ""
      },
      {
        "id": "word-11-62",
        "english": "grocery*",
        "phonetic": "['ɡrəʊsərɪ]",
        "partOfSpeech": "n.",
        "chinese": "杂货店；食品，杂货",
        "example": ""
      },
      {
        "id": "word-11-73",
        "english": "semester*",
        "phonetic": "/sɪˈmestə(r)/",
        "partOfSpeech": "n.",
        "chinese": "学期",
        "example": ""
      },
      {
        "id": "word-11-69",
        "english": "conquer*",
        "phonetic": "/ˈkɔŋkə(r)/",
        "partOfSpeech": "vt.",
        "chinese": "征服，战胜，占领；克服，破除（坏习惯等）",
        "example": ""
      },
      {
        "id": "word-11-57",
        "english": "cancel*",
        "phonetic": "/ˈkænsl/",
        "partOfSpeech": "v.",
        "chinese": "取消，废除；抵消，对消；删去，划掉",
        "example": ""
      },
      {
        "id": "word-11-59",
        "english": "data*",
        "phonetic": "/ˈdeɪtə/",
        "partOfSpeech": "n.",
        "chinese": "数据；资料",
        "example": ""
      },
      {
        "id": "word-12-64",
        "english": "coach*",
        "phonetic": "/kəutʃ/",
        "partOfSpeech": "n.",
        "chinese": "教练；指导；长途汽车 vt. 训练；辅导",
        "example": ""
      },
      {
        "id": "word-11-54",
        "english": "bronchitis*",
        "phonetic": "/brɔŋˈkaɪtɪs/",
        "partOfSpeech": "n.",
        "chinese": "[医] 支气管炎",
        "example": ""
      }
    ],
    "article": "In the field of Cultural Exchange, researchers have been studying various phenomena to understand their implications. The concept of combine* has been widely discussed in recent studies. The concept of specialty has been widely discussed in recent studies. The concept of enforce has been widely discussed in recent studies. The concept of shorthand has been widely discussed in recent studies. The concept of retailer* has been widely discussed in recent studies. The concept of coverage has been widely discussed in recent studies. The concept of indifferent* has been widely discussed in recent studies. The concept of realistic* has been widely discussed in recent studies. The concept of brand has been widely discussed in recent studies. The concept of intrinsic* has been widely discussed in recent studies. Researchers have found that these factors play a significant role in shaping our understanding of the subject. Further studies are needed to explore the full implications of these findings."
  },
  {
    "id": "unit-7",
    "name": "Unit 7: Word Lists 13 & 14",
    "words": [
      {
        "id": "word-13-3",
        "english": "given*",
        "phonetic": "/ˈgɪvn/",
        "partOfSpeech": "a.",
        "chinese": "规定的，特定的；假设的",
        "example": ""
      },
      {
        "id": "word-13-4",
        "english": "advanced*",
        "phonetic": "[ədˈvɑ:nst]",
        "partOfSpeech": "a.",
        "chinese": "先进的",
        "example": ""
      },
      {
        "id": "word-13-38",
        "english": "practical*",
        "phonetic": "/ˈprktɪkl/",
        "partOfSpeech": "a.",
        "chinese": "实际的，实用的；实践的，应用的",
        "example": ""
      },
      {
        "id": "word-13-26",
        "english": "insecure*",
        "phonetic": "/ˏɪnsɪˈkjuə(r)/",
        "partOfSpeech": "a.",
        "chinese": "不安全的，不可靠的",
        "example": ""
      },
      {
        "id": "word-13-30",
        "english": "cultivate",
        "phonetic": "/ˈkʌltɪveɪt/",
        "partOfSpeech": "vt.",
        "chinese": "种植；培养",
        "example": ""
      },
      {
        "id": "word-13-9",
        "english": "costume",
        "phonetic": "/ˈkɔstjuːm/",
        "partOfSpeech": "n.",
        "chinese": "戏装；（特定场合穿的）成套服装",
        "example": ""
      },
      {
        "id": "word-14-6",
        "english": "coupon",
        "phonetic": "/ˈkuːpɔn/",
        "partOfSpeech": "n.",
        "chinese": "优惠券；票证；配给券；参赛表，订货单",
        "example": ""
      },
      {
        "id": "word-13-10",
        "english": "scare",
        "phonetic": "/ˈskeə(r)/",
        "partOfSpeech": "n.",
        "chinese": "惊恐，恐慌 v. 吓，使害怕；受惊吓，感到害怕",
        "example": ""
      },
      {
        "id": "word-14-64",
        "english": "account*",
        "phonetic": "/əˈkaunt/",
        "partOfSpeech": "v.",
        "chinese": "说明，解释；（在数量、比例方面）占；导致 n. 账，账户；叙述，说明",
        "example": ""
      },
      {
        "id": "word-14-7",
        "english": "tome*",
        "phonetic": "/təum/",
        "partOfSpeech": "n.",
        "chinese": "册，大部头书；（有学术价值的）巨著",
        "example": ""
      },
      {
        "id": "word-14-13",
        "english": "wonder*",
        "phonetic": "/ˈwʌndə(r)/",
        "partOfSpeech": "v.",
        "chinese": "诧异，奇怪；纳闷，想知道 n. 惊奇，惊异；奇迹，奇事",
        "example": ""
      },
      {
        "id": "word-13-8",
        "english": "bunch",
        "phonetic": "/bʌntʃ/",
        "partOfSpeech": "n.",
        "chinese": "群，伙；束，串，捆 v. 集中，挤在一起；使成一束（或一群等）",
        "example": ""
      },
      {
        "id": "word-14-1",
        "english": "divide*",
        "phonetic": "/dɪˈvaɪd/",
        "partOfSpeech": "v.",
        "chinese": "分开，分隔；分配，分享；除（以） n. 分歧，差异；分界线，分水岭",
        "example": ""
      },
      {
        "id": "word-13-6",
        "english": "crank*",
        "phonetic": "/kræŋk/",
        "partOfSpeech": "n.",
        "chinese": "曲柄，曲轴 vt. 用曲柄转动某物",
        "example": ""
      },
      {
        "id": "word-14-69",
        "english": "gland",
        "phonetic": "/glænd/",
        "partOfSpeech": "n.",
        "chinese": "腺",
        "example": ""
      },
      {
        "id": "word-13-7",
        "english": "lexicographer*",
        "phonetic": "[ˌleksɪˈkɒgrəfə(r)]",
        "partOfSpeech": "n.",
        "chinese": "词典编纂者",
        "example": ""
      },
      {
        "id": "word-14-5",
        "english": "refusal",
        "phonetic": "/rɪˈfjuːzl/",
        "partOfSpeech": "n.",
        "chinese": "拒绝",
        "example": ""
      },
      {
        "id": "word-13-42",
        "english": "cautious",
        "phonetic": "/ˈkɔːʃəs/",
        "partOfSpeech": "a.",
        "chinese": "十分小心的，谨慎的",
        "example": ""
      },
      {
        "id": "word-14-59",
        "english": "surgeon*",
        "phonetic": "/ˈsɜːdʒən/",
        "partOfSpeech": "n.",
        "chinese": "外科医生",
        "example": ""
      },
      {
        "id": "word-13-45",
        "english": "darkroom",
        "phonetic": "[ˈdɑ:kru:m]",
        "partOfSpeech": "n.",
        "chinese": "暗室",
        "example": ""
      },
      {
        "id": "word-14-71",
        "english": "shortage*",
        "phonetic": "/ˈʃɔːtɪdʒ/",
        "partOfSpeech": "n.",
        "chinese": "不足，缺少",
        "example": ""
      },
      {
        "id": "word-14-43",
        "english": "population*",
        "phonetic": "/ˏpɔpjuˈleɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "人口",
        "example": ""
      },
      {
        "id": "word-13-52",
        "english": "feeble",
        "phonetic": "/ˈfiːbl/",
        "partOfSpeech": "a.",
        "chinese": "虚弱的；无效的",
        "example": ""
      },
      {
        "id": "word-13-22",
        "english": "request*",
        "phonetic": "/rɪˈkwest/",
        "partOfSpeech": "n./vt.",
        "chinese": "要求；请求",
        "example": ""
      },
      {
        "id": "word-14-62",
        "english": "thunder",
        "phonetic": "/ˈθʌndə(r)/",
        "partOfSpeech": "n.",
        "chinese": "雷；雷声 v. 打雷；轰隆响",
        "example": ""
      },
      {
        "id": "word-13-34",
        "english": "outcome",
        "phonetic": "/ˈautkʌm/",
        "partOfSpeech": "n.",
        "chinese": "结果，成果；后果；结局；出口，输出量",
        "example": ""
      },
      {
        "id": "word-14-3",
        "english": "cloakroom",
        "phonetic": "/ˈkləukrum/",
        "partOfSpeech": "n.",
        "chinese": "衣帽间； <英> 洗手间",
        "example": ""
      },
      {
        "id": "word-14-17",
        "english": "shilling*",
        "phonetic": "/ˈʃɪlɪŋ/",
        "partOfSpeech": "n.",
        "chinese": "先令",
        "example": ""
      },
      {
        "id": "word-13-20",
        "english": "bring",
        "phonetic": "",
        "partOfSpeech": "",
        "chinese": "out [briŋ aut] 出版；激起；鼓励",
        "example": ""
      },
      {
        "id": "word-14-45",
        "english": "catalogue*",
        "phonetic": "/ˈkætəlɔg/",
        "partOfSpeech": "n.",
        "chinese": "目录；系列 vt. 编目录；记载",
        "example": ""
      },
      {
        "id": "word-13-28",
        "english": "inspiration",
        "phonetic": "/ˏɪnspəˈreɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "启示，灵感；鼓舞人心的人（或事），激励",
        "example": ""
      },
      {
        "id": "word-13-69",
        "english": "bump",
        "phonetic": "",
        "partOfSpeech": "",
        "chinese": "into [bʌmp ˈɪntuː] 不期而遇，邂逅",
        "example": ""
      },
      {
        "id": "word-13-43",
        "english": "pattern",
        "phonetic": "/ˈpætn/",
        "partOfSpeech": "n.",
        "chinese": "样式；模式 vt. 构成图案；使形成，促成",
        "example": ""
      },
      {
        "id": "word-13-74",
        "english": "ambulance",
        "phonetic": "/ˈæmbjuləns/",
        "partOfSpeech": "n.",
        "chinese": "救护车；野战医院",
        "example": ""
      },
      {
        "id": "word-13-72",
        "english": "extremely*",
        "phonetic": "[ɪkˈstri:mli]",
        "partOfSpeech": "ad.",
        "chinese": "极端地；非常地",
        "example": ""
      },
      {
        "id": "word-14-16",
        "english": "expectancy*",
        "phonetic": "[ɪk'spektənsɪ]",
        "partOfSpeech": "n.",
        "chinese": "期待，期望；预期数额（如寿命等）",
        "example": ""
      },
      {
        "id": "word-14-42",
        "english": "overhead*",
        "phonetic": "/ˈəuvəhed/",
        "partOfSpeech": "a.",
        "chinese": "在头顶上的；高架的 n. 天花板；企业管理费用 /ˏəuvəˈhed/ ad. 在空中，在头顶上，在高处",
        "example": ""
      },
      {
        "id": "word-14-39",
        "english": "appointment*",
        "phonetic": "/əˈpɔɪntmənt/",
        "partOfSpeech": "n.",
        "chinese": "约会",
        "example": ""
      },
      {
        "id": "word-13-62",
        "english": "conquest*",
        "phonetic": "/ˈkɔŋkwest/",
        "partOfSpeech": "n.",
        "chinese": "征服；战利品",
        "example": ""
      },
      {
        "id": "word-14-24",
        "english": "personal*",
        "phonetic": "/ˈpɜːsənl/",
        "partOfSpeech": "a.",
        "chinese": "个人的，私人的；亲自的，本人的；身体的，人身的",
        "example": ""
      },
      {
        "id": "word-13-73",
        "english": "rot",
        "phonetic": "/rɔt/",
        "partOfSpeech": "n.",
        "chinese": "腐烂 v. （使）腐烂",
        "example": ""
      },
      {
        "id": "word-14-14",
        "english": "scholarship*",
        "phonetic": "/ˈskɔləʃɪp/",
        "partOfSpeech": "n.",
        "chinese": "奖学金；学问，学识",
        "example": ""
      },
      {
        "id": "word-13-48",
        "english": "contempt",
        "phonetic": "/kənˈtempt/",
        "partOfSpeech": "n.",
        "chinese": "轻视，鄙视，不尊重；蔑视",
        "example": ""
      },
      {
        "id": "word-13-58",
        "english": "fertilise*",
        "phonetic": "/ˈfɜːtəlaɪz/",
        "partOfSpeech": "vt.",
        "chinese": "使肥沃，使多产；施肥于；使受精",
        "example": ""
      },
      {
        "id": "word-13-61",
        "english": "attractive*",
        "phonetic": "/əˈtræktɪv/",
        "partOfSpeech": "a.",
        "chinese": "吸引的，有吸引力的；引起注意的",
        "example": ""
      },
      {
        "id": "word-14-23",
        "english": "observation*",
        "phonetic": "/ˏɔbzəˈveɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "观察，观测；监视；评述，评论",
        "example": ""
      },
      {
        "id": "word-14-20",
        "english": "convenient*",
        "phonetic": "/kənˈviːnɪənt/",
        "partOfSpeech": "a.",
        "chinese": "方便的，便利的；适宜的",
        "example": ""
      },
      {
        "id": "word-14-44",
        "english": "prey*",
        "phonetic": "/preɪ/",
        "partOfSpeech": "n.",
        "chinese": "猎物，捕获物；牺牲品，战利品 vi. 捕食；折磨，使烦恼；掠夺",
        "example": ""
      },
      {
        "id": "word-14-27",
        "english": "advisable*",
        "phonetic": "/ədˈvaɪzəbl/",
        "partOfSpeech": "n.",
        "chinese": "可取的，适当的；明智的",
        "example": ""
      },
      {
        "id": "word-14-54",
        "english": "hesitate",
        "phonetic": "/ˈhezɪteɪt/",
        "partOfSpeech": "vi.",
        "chinese": "犹豫；不情愿",
        "example": ""
      },
      {
        "id": "word-14-61",
        "english": "battery",
        "phonetic": "/ˈbætərɪ/",
        "partOfSpeech": "n.",
        "chinese": "电池（组），蓄电池（组）",
        "example": ""
      },
      {
        "id": "word-13-56",
        "english": "pulverise",
        "phonetic": "/ˈpʌlvəraɪz/",
        "partOfSpeech": "vt.",
        "chinese": "碾磨成粉，粉碎",
        "example": ""
      },
      {
        "id": "word-14-65",
        "english": "booklet",
        "phonetic": "/ˈbuklɪt/",
        "partOfSpeech": "n.",
        "chinese": "小册子",
        "example": ""
      },
      {
        "id": "word-14-28",
        "english": "bankrupt",
        "phonetic": "/ˈbæŋkrʌpt/",
        "partOfSpeech": "a.",
        "chinese": "破产的",
        "example": ""
      },
      {
        "id": "word-14-38",
        "english": "typhoon*",
        "phonetic": "/taɪˈfuːn/",
        "partOfSpeech": "n.",
        "chinese": "台风",
        "example": ""
      },
      {
        "id": "word-13-17",
        "english": "valuable*",
        "phonetic": "/ˈvæljuəbl/",
        "partOfSpeech": "a.",
        "chinese": "贵重的，有价值的 n. 贵重物品，财宝",
        "example": ""
      },
      {
        "id": "word-13-5",
        "english": "milestone",
        "phonetic": "['maɪlstəʊn]",
        "partOfSpeech": "n.",
        "chinese": "里程碑；转折点",
        "example": ""
      },
      {
        "id": "word-13-24",
        "english": "treatment*",
        "phonetic": "/ˈtriːtmənt/",
        "partOfSpeech": "n.",
        "chinese": "治疗；对待",
        "example": ""
      },
      {
        "id": "word-14-68",
        "english": "shrink*",
        "phonetic": "/ʃrɪŋk/",
        "partOfSpeech": "v.",
        "chinese": "（使）收缩；萎缩",
        "example": ""
      },
      {
        "id": "word-13-64",
        "english": "snap*",
        "phonetic": "/snæp/",
        "partOfSpeech": "v.",
        "chinese": "咔嚓折断，啪地绷断；（啪的一声）打开（或关上）；咬；厉声说话，怒声责斥 n. 咔嚓声 a. 突然的，匆忙的",
        "example": ""
      },
      {
        "id": "word-14-49",
        "english": "volt",
        "phonetic": "/vəult/",
        "partOfSpeech": "n.",
        "chinese": "伏特",
        "example": ""
      },
      {
        "id": "word-14-2",
        "english": "gross",
        "phonetic": "/grəus/",
        "partOfSpeech": "a.",
        "chinese": "总的，毛的",
        "example": ""
      },
      {
        "id": "word-14-51",
        "english": "screw",
        "phonetic": "/skruː/",
        "partOfSpeech": "v.",
        "chinese": "用螺钉固定 n. 螺丝（钉）",
        "example": ""
      },
      {
        "id": "word-14-8",
        "english": "toxin*",
        "phonetic": "/ˈtɔksɪn/",
        "partOfSpeech": "n.",
        "chinese": "毒素，毒质",
        "example": ""
      },
      {
        "id": "word-13-71",
        "english": "register",
        "phonetic": "/ˈredʒɪstə(r)/",
        "partOfSpeech": "n.",
        "chinese": "注册，登记；登记表 v. 注册，登记",
        "example": ""
      },
      {
        "id": "word-14-72",
        "english": "accreditation*",
        "phonetic": "[əˌkredɪˈteɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "证明合格，鉴定合格",
        "example": ""
      },
      {
        "id": "word-13-47",
        "english": "overwhelm",
        "phonetic": "/ˏəuvəˈwelm/",
        "partOfSpeech": "vt.",
        "chinese": "征服；淹没",
        "example": ""
      },
      {
        "id": "word-13-50",
        "english": "badge",
        "phonetic": "/bædʒ/",
        "partOfSpeech": "n.",
        "chinese": "徽章；标记；象征",
        "example": ""
      },
      {
        "id": "word-13-41",
        "english": "subsidiary",
        "phonetic": "/səbˈsɪdɪərɪ/",
        "partOfSpeech": "n.",
        "chinese": "子公司；附属机构；支流 a. 次要的；辅助的，附设的",
        "example": ""
      },
      {
        "id": "word-13-44",
        "english": "terrain",
        "phonetic": "/təˈreɪn/",
        "partOfSpeech": "n.",
        "chinese": "地形，地势",
        "example": ""
      },
      {
        "id": "word-13-67",
        "english": "nominal*",
        "phonetic": "/ˈnɔmɪnl/",
        "partOfSpeech": "a.",
        "chinese": "名义上的；（金额、租金等）微不足道的",
        "example": ""
      },
      {
        "id": "word-13-33",
        "english": "spot",
        "phonetic": "/spɔt/",
        "partOfSpeech": "vt.",
        "chinese": "认出，发现；看见，注意到 n. 地点，处所；斑点，污点；少量",
        "example": ""
      },
      {
        "id": "word-14-70",
        "english": "curriculum",
        "phonetic": "/kəˈrɪkjuləm/",
        "partOfSpeech": "n.",
        "chinese": "课程，（学校等的）全部课程",
        "example": ""
      },
      {
        "id": "word-13-40",
        "english": "disposal*",
        "phonetic": "/dɪˈspəuzl/",
        "partOfSpeech": "n.",
        "chinese": "处理，处置；布置，安排",
        "example": ""
      },
      {
        "id": "word-14-36",
        "english": "format*",
        "phonetic": "/ˈfɔːmt/",
        "partOfSpeech": "vt.",
        "chinese": "使格式化 n. 安排，计划；版式；格式",
        "example": ""
      },
      {
        "id": "word-13-49",
        "english": "recognize",
        "phonetic": "/ˈrekəgnaɪz/",
        "partOfSpeech": "vt.",
        "chinese": "认出；承认，认可",
        "example": ""
      },
      {
        "id": "word-14-58",
        "english": "impossible*",
        "phonetic": "/ɪmˈpɔsəbl/",
        "partOfSpeech": "a.",
        "chinese": "不可能的，办不到的",
        "example": ""
      },
      {
        "id": "word-13-66",
        "english": "identifiable*",
        "phonetic": "[aɪˌdentɪˈfaɪəbl]",
        "partOfSpeech": "a.",
        "chinese": "可辨认的，可识别的；可确定的，可证明是同一的",
        "example": ""
      },
      {
        "id": "word-13-15",
        "english": "vulnerable*",
        "phonetic": "/ˈvʌlnərəbl/",
        "partOfSpeech": "a.",
        "chinese": "易受攻击的，易受伤的",
        "example": ""
      },
      {
        "id": "word-13-70",
        "english": "graphology",
        "phonetic": "/græˈfɔlədʒɪ/",
        "partOfSpeech": "n.",
        "chinese": "笔迹学，笔相学",
        "example": ""
      },
      {
        "id": "word-13-31",
        "english": "campaign*",
        "phonetic": "/kæmˈpeɪn/",
        "partOfSpeech": "vi.",
        "chinese": "参加活动；作战 n. 战役；活动",
        "example": ""
      },
      {
        "id": "word-13-18",
        "english": "presumably*",
        "phonetic": "[prɪˈzju:məbli]",
        "partOfSpeech": "ad.",
        "chinese": "推测起来，大概",
        "example": ""
      },
      {
        "id": "word-14-46",
        "english": "prerequisite*",
        "phonetic": "[ˌpri:'rekwəzɪt]",
        "partOfSpeech": "n.",
        "chinese": "先决条件，前提；必备条件 a. 必备的",
        "example": ""
      },
      {
        "id": "word-13-14",
        "english": "freight",
        "phonetic": "/freɪt/",
        "partOfSpeech": "n.",
        "chinese": "货物 vt. 运送（货物）；货运",
        "example": ""
      },
      {
        "id": "word-14-12",
        "english": "polish*",
        "phonetic": "/ˈpɔlɪʃ/",
        "partOfSpeech": "v.",
        "chinese": "磨光，擦亮；使优美，润饰 n. 擦光剂，上光蜡",
        "example": ""
      },
      {
        "id": "word-13-27",
        "english": "linen",
        "phonetic": "/ˈlɪnɪn/",
        "partOfSpeech": "n.",
        "chinese": "亚麻织品；亚麻布",
        "example": ""
      },
      {
        "id": "word-13-37",
        "english": "sharpen*",
        "phonetic": "['ʃɑ:pən]",
        "partOfSpeech": "v.",
        "chinese": "削尖，磨快；使敏锐，使敏捷",
        "example": ""
      },
      {
        "id": "word-14-33",
        "english": "splint*",
        "phonetic": "/splɪnt/",
        "partOfSpeech": "n.",
        "chinese": "细木梗；[医] （用于固定受伤肢体的）夹板 vt. 用夹板夹",
        "example": ""
      },
      {
        "id": "word-13-54",
        "english": "fibre",
        "phonetic": "/ˈfaɪbə(r)/",
        "partOfSpeech": "n.",
        "chinese": "纤维",
        "example": ""
      },
      {
        "id": "word-13-23",
        "english": "dash",
        "phonetic": "/dæʃ/",
        "partOfSpeech": "v.",
        "chinese": "飞奔，猛冲；猛掷；使破灭，使沮丧 n. 飞奔，猛冲；破折号；精力，干劲",
        "example": ""
      },
      {
        "id": "word-13-32",
        "english": "disorder*",
        "phonetic": "/dɪsˈɔːdə(r)/",
        "partOfSpeech": "n.",
        "chinese": "混乱；失调，紊乱，疾病",
        "example": ""
      },
      {
        "id": "word-14-67",
        "english": "venture",
        "phonetic": "/ˈventʃə(r)/",
        "partOfSpeech": "v.",
        "chinese": "敢于去；拿……冒险，冒……的险 n. 风险投资，（商业等的）风险项目",
        "example": ""
      },
      {
        "id": "word-13-60",
        "english": "debt*",
        "phonetic": "/det/",
        "partOfSpeech": "n.",
        "chinese": "债，债务",
        "example": ""
      },
      {
        "id": "word-14-32",
        "english": "tragic",
        "phonetic": "/ˈtrædʒɪk/",
        "partOfSpeech": "a.",
        "chinese": "悲惨的；悲剧（性）的",
        "example": ""
      },
      {
        "id": "word-13-59",
        "english": "ration*",
        "phonetic": "/ˈræʃn/",
        "partOfSpeech": "n.",
        "chinese": "配给量，定量；给养，口粮 vt. 配给，定量供应",
        "example": ""
      },
      {
        "id": "word-14-31",
        "english": "fantasy",
        "phonetic": "/ˈfæntəsɪ/",
        "partOfSpeech": "n.",
        "chinese": "想像",
        "example": ""
      },
      {
        "id": "word-13-2",
        "english": "amount*",
        "phonetic": "/əˈmaunt/",
        "partOfSpeech": "n.",
        "chinese": "总额 vi. 合计",
        "example": ""
      },
      {
        "id": "word-13-35",
        "english": "aggravate*",
        "phonetic": "/ˈægrəveɪt/",
        "partOfSpeech": "vt.",
        "chinese": "恶化，加重，加剧",
        "example": ""
      },
      {
        "id": "word-13-39",
        "english": "pliable*",
        "phonetic": "/ˈplaɪəbl/",
        "partOfSpeech": "a.",
        "chinese": "（指人或思想）容易受影响的；顺从的；易弯的，柔韧的",
        "example": ""
      },
      {
        "id": "word-14-60",
        "english": "promise*",
        "phonetic": "/ˈprɔmɪs/",
        "partOfSpeech": "n./v.",
        "chinese": "允诺，保证；预兆，预示",
        "example": ""
      },
      {
        "id": "word-14-29",
        "english": "deplete*",
        "phonetic": "/dɪˈpliːt/",
        "partOfSpeech": "vt.",
        "chinese": "倒空；（使）枯竭；消耗",
        "example": ""
      },
      {
        "id": "word-14-18",
        "english": "blueprint*",
        "phonetic": "/ˈbluːprɪnt/",
        "partOfSpeech": "n.",
        "chinese": "蓝图；方案",
        "example": ""
      },
      {
        "id": "word-14-52",
        "english": "enlighten",
        "phonetic": "/ɪnˈlaɪtn/",
        "partOfSpeech": "vt.",
        "chinese": "启发；开导；阐明",
        "example": ""
      },
      {
        "id": "word-13-19",
        "english": "sanctuary*",
        "phonetic": "/ˈsæŋktʃuərɪ/",
        "partOfSpeech": "n.",
        "chinese": "圣堂，圣殿，圣坛；圣地；庇护所，避难所；禁猎区，动物保护区",
        "example": ""
      },
      {
        "id": "word-13-55",
        "english": "suburb",
        "phonetic": "/ˈsʌbɜːb/",
        "partOfSpeech": "n.",
        "chinese": "郊区",
        "example": ""
      },
      {
        "id": "word-14-30",
        "english": "influence*",
        "phonetic": "/ˈɪnfluəns/",
        "partOfSpeech": "vt.",
        "chinese": "影响 n. 影响力；产生影响力的人",
        "example": ""
      },
      {
        "id": "word-14-73",
        "english": "clerk",
        "phonetic": "/klɑːk/",
        "partOfSpeech": "n.",
        "chinese": "办事员；职员",
        "example": ""
      },
      {
        "id": "word-14-26",
        "english": "requirement*",
        "phonetic": "[rɪ'kwaɪəmənt]",
        "partOfSpeech": "n.",
        "chinese": "需要，需求，要求；需要的东西；必要条件",
        "example": ""
      },
      {
        "id": "word-14-34",
        "english": "foam",
        "phonetic": "/fəum/",
        "partOfSpeech": "n.",
        "chinese": "泡沫；泡沫材料 vi. 起泡沫",
        "example": ""
      },
      {
        "id": "word-13-12",
        "english": "juvenile",
        "phonetic": "/ˈdʒuːvənaɪl/",
        "partOfSpeech": "a.",
        "chinese": "少年的，少年特有的；幼稚的，不成熟的 n. 未成年人，少年",
        "example": ""
      },
      {
        "id": "word-13-25",
        "english": "coarse*",
        "phonetic": "/kɔːs/",
        "partOfSpeech": "a.",
        "chinese": "粗的；粗糙的；粗劣的",
        "example": ""
      },
      {
        "id": "word-14-40",
        "english": "slope",
        "phonetic": "/sləup/",
        "partOfSpeech": "n.",
        "chinese": "斜坡；倾斜 vi 倾斜",
        "example": ""
      },
      {
        "id": "word-13-46",
        "english": "kneel",
        "phonetic": "/niːl/",
        "partOfSpeech": "vi.",
        "chinese": "跪",
        "example": ""
      },
      {
        "id": "word-13-1",
        "english": "statement*",
        "phonetic": "[ˈsteɪtmənt]",
        "partOfSpeech": "n.",
        "chinese": "陈述；声明；报表",
        "example": ""
      },
      {
        "id": "word-14-57",
        "english": "background*",
        "phonetic": "/ˈbækgraund/",
        "partOfSpeech": "n.",
        "chinese": "背景；经历；后台；不重要或不引人注目的地方",
        "example": ""
      },
      {
        "id": "word-14-66",
        "english": "layout",
        "phonetic": "[ˈleɪaʊt]",
        "partOfSpeech": "n.",
        "chinese": "布局，安排，设计",
        "example": ""
      },
      {
        "id": "word-13-11",
        "english": "manipulate",
        "phonetic": "/məˈnɪpjuleɪt/",
        "partOfSpeech": "vt.",
        "chinese": "应付，处理；操纵，控制；影响",
        "example": ""
      },
      {
        "id": "word-13-36",
        "english": "deception*",
        "phonetic": "/dɪˈsepʃn/",
        "partOfSpeech": "n.",
        "chinese": "欺骗；诡计",
        "example": ""
      },
      {
        "id": "word-14-56",
        "english": "topsoil*",
        "phonetic": "[ˈtɒpsɔɪl]",
        "partOfSpeech": "n.",
        "chinese": "表层土",
        "example": ""
      },
      {
        "id": "word-14-35",
        "english": "occupation",
        "phonetic": "/ˏɔkjuˈpeɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "占领；职业；消遣",
        "example": ""
      },
      {
        "id": "word-13-29",
        "english": "generous",
        "phonetic": "/ˈdʒenərəs/",
        "partOfSpeech": "a.",
        "chinese": "慷慨的；大量的",
        "example": ""
      },
      {
        "id": "word-13-53",
        "english": "virtue*",
        "phonetic": "/ˈvɜːtʃuː/",
        "partOfSpeech": "n.",
        "chinese": "美德；优点",
        "example": ""
      },
      {
        "id": "word-14-22",
        "english": "attentive*",
        "phonetic": "/əˈtentɪv/",
        "partOfSpeech": "a.",
        "chinese": "注意的，专心的；关心的，体贴的；留意的",
        "example": ""
      },
      {
        "id": "word-14-10",
        "english": "ridiculous",
        "phonetic": "/rɪˈdɪkjuləs/",
        "partOfSpeech": "a.",
        "chinese": "荒谬的；可笑的",
        "example": ""
      },
      {
        "id": "word-13-63",
        "english": "sophisticate*",
        "phonetic": "[sə'fɪstɪkeɪt]",
        "partOfSpeech": "n.",
        "chinese": "久经世故的人；精通者",
        "example": ""
      },
      {
        "id": "word-13-76",
        "english": "continuous",
        "phonetic": "/kənˈtɪnjuəs/",
        "partOfSpeech": "a.",
        "chinese": "连续的，不断的",
        "example": ""
      },
      {
        "id": "word-13-13",
        "english": "phenomenon*",
        "phonetic": "/fəˈnɔmɪnən/",
        "partOfSpeech": "n.",
        "chinese": "现象，迹象；非凡的人（或事物）",
        "example": ""
      },
      {
        "id": "word-13-21",
        "english": "arithmetic*",
        "phonetic": "/əˈrɪθmətɪk/",
        "partOfSpeech": "n.",
        "chinese": "算术",
        "example": ""
      },
      {
        "id": "word-14-15",
        "english": "familiarise*",
        "phonetic": "/fəˈmɪlɪəraɪz/",
        "partOfSpeech": "vt.",
        "chinese": "使熟悉，使通晓；使家喻户晓",
        "example": ""
      },
      {
        "id": "word-14-11",
        "english": "chip*",
        "phonetic": "/tʃɪp/",
        "partOfSpeech": "n.",
        "chinese": "碎片；芯片；瑕疵 v. 削（或凿）下（屑片或碎片）",
        "example": ""
      },
      {
        "id": "word-13-57",
        "english": "inductive",
        "phonetic": "",
        "partOfSpeech": "",
        "chinese": "reasoning [inˈdʌktiv ˈri:zənɪŋ] 归纳；推理",
        "example": ""
      },
      {
        "id": "word-13-16",
        "english": "steam*",
        "phonetic": "/stiːm/",
        "partOfSpeech": "n.",
        "chinese": "（蒸）汽，汽雾 v. 发出蒸汽；（火车、轮船）行驶；用蒸汽开动",
        "example": ""
      },
      {
        "id": "word-13-65",
        "english": "express*",
        "phonetic": "/ɪkˈspres/",
        "partOfSpeech": "vt.",
        "chinese": "表达，表示 a. 特快的，快速的；明确的 n. 快车，快运，快递",
        "example": ""
      },
      {
        "id": "word-13-68",
        "english": "acquire*",
        "phonetic": "/əˈkwaɪə(r)/",
        "partOfSpeech": "vt.",
        "chinese": "取得，获得",
        "example": ""
      },
      {
        "id": "word-13-75",
        "english": "miserable",
        "phonetic": "/ˈmɪzrəbl/",
        "partOfSpeech": "a.",
        "chinese": "悲惨的，痛苦的；令人难受的",
        "example": ""
      },
      {
        "id": "word-14-9",
        "english": "simultaneously*",
        "phonetic": "[ˌsɪməl'teɪnɪəslɪ]",
        "partOfSpeech": "ad.",
        "chinese": "同时地",
        "example": ""
      },
      {
        "id": "word-14-48",
        "english": "suggest*",
        "phonetic": "/səˈdʒest/",
        "partOfSpeech": "v.",
        "chinese": "建议，提出；暗示",
        "example": ""
      },
      {
        "id": "word-14-25",
        "english": "vitality*",
        "phonetic": "/vaɪˈtælətɪ/",
        "partOfSpeech": "n.",
        "chinese": "生命力，活力",
        "example": ""
      },
      {
        "id": "word-14-37",
        "english": "bachelor",
        "phonetic": "/ˈbætʃələ(r)/",
        "partOfSpeech": "n.",
        "chinese": "学士；单身汉",
        "example": ""
      },
      {
        "id": "word-14-4",
        "english": "short-term*",
        "phonetic": "[ʃɔ:t",
        "partOfSpeech": "",
        "chinese": "tɜ:m] a. 短期的",
        "example": ""
      },
      {
        "id": "word-14-41",
        "english": "complex*",
        "phonetic": "/ˈkɔmpleks/",
        "partOfSpeech": "n.",
        "chinese": "综合体，集合体；建筑群；情结 a. 合成的，综合的；复杂的，难懂的",
        "example": ""
      },
      {
        "id": "word-14-50",
        "english": "weed",
        "phonetic": "/wiːd/",
        "partOfSpeech": "n.",
        "chinese": "杂草",
        "example": ""
      },
      {
        "id": "word-14-19",
        "english": "interplay*",
        "phonetic": "/ˈɪntəpleɪ/",
        "partOfSpeech": "vi./n.",
        "chinese": "相互作用，相互影响",
        "example": ""
      },
      {
        "id": "word-14-63",
        "english": "delicate",
        "phonetic": "/ˈdelɪkət/",
        "partOfSpeech": "a.",
        "chinese": "纤细的；精巧的；微妙的",
        "example": ""
      },
      {
        "id": "word-14-53",
        "english": "textile*",
        "phonetic": "/ˈtekstaɪl/",
        "partOfSpeech": "n.",
        "chinese": "纺织品",
        "example": ""
      },
      {
        "id": "word-14-55",
        "english": "tutor*",
        "phonetic": "/ˈtjuːtə(r)/",
        "partOfSpeech": "v.",
        "chinese": "（给……）当家庭教师 n. 导师；家庭教师",
        "example": ""
      },
      {
        "id": "word-14-21",
        "english": "genuine*",
        "phonetic": "/ˈdʒenjuɪn/",
        "partOfSpeech": "a.",
        "chinese": "真正的；真实的",
        "example": ""
      },
      {
        "id": "word-14-47",
        "english": "assessment*",
        "phonetic": "[əˈsesmənt]",
        "partOfSpeech": "n.",
        "chinese": "判定，评定；核定的付款额；看法，评价",
        "example": ""
      },
      {
        "id": "word-13-51",
        "english": "economic*",
        "phonetic": "/ˏiːkəˈnɔmɪk/",
        "partOfSpeech": "a.",
        "chinese": "经济的；经济上的，经济学的",
        "example": ""
      }
    ],
    "article": "In the field of Educational Research, researchers have been studying various phenomena to understand their implications. The concept of given* has been widely discussed in recent studies. The concept of advanced* has been widely discussed in recent studies. The concept of practical* has been widely discussed in recent studies. The concept of insecure* has been widely discussed in recent studies. The concept of cultivate has been widely discussed in recent studies. The concept of costume has been widely discussed in recent studies. The concept of coupon has been widely discussed in recent studies. The concept of scare has been widely discussed in recent studies. The concept of account* has been widely discussed in recent studies. The concept of tome* has been widely discussed in recent studies. Researchers have found that these factors play a significant role in shaping our understanding of the subject. Further studies are needed to explore the full implications of these findings."
  },
  {
    "id": "unit-8",
    "name": "Unit 8: Word Lists 15 & 16",
    "words": [
      {
        "id": "word-15-61",
        "english": "manual*",
        "phonetic": "/ˋmænjʊəl/",
        "partOfSpeech": "n.",
        "chinese": "手册，指南 a. 手的，手工的，体力的",
        "example": ""
      },
      {
        "id": "word-16-13",
        "english": "simulate",
        "phonetic": "/ˈsɪmjuleɪt/",
        "partOfSpeech": "vt.",
        "chinese": "模仿，模拟；假装，伪装；扮演",
        "example": ""
      },
      {
        "id": "word-15-7",
        "english": "historic*",
        "phonetic": "/hɪˈstɔrɪk/",
        "partOfSpeech": "a.",
        "chinese": "有历史意义的；历史的，历史性的",
        "example": ""
      },
      {
        "id": "word-15-32",
        "english": "refund",
        "phonetic": "/ˈriːfʌnd/",
        "partOfSpeech": "n.",
        "chinese": "退款 /riːˈfʌnd/ vt. 退还（钱款），偿付",
        "example": ""
      },
      {
        "id": "word-15-22",
        "english": "favour",
        "phonetic": "/ˈfeɪvə(r)/",
        "partOfSpeech": "n.",
        "chinese": "帮忙；偏爱；赞同；恩惠 vt. 赞同；较喜欢，偏袒；有利于",
        "example": ""
      },
      {
        "id": "word-15-12",
        "english": "suspend*",
        "phonetic": "/səˈspend/",
        "partOfSpeech": "vt.",
        "chinese": "吊，悬挂；推迟；暂停，中止",
        "example": ""
      },
      {
        "id": "word-15-38",
        "english": "prevail",
        "phonetic": "/prɪˈveɪl/",
        "partOfSpeech": "vi.",
        "chinese": "流行，盛行；占优势，战胜",
        "example": ""
      },
      {
        "id": "word-15-2",
        "english": "flip",
        "phonetic": "/flɪp/",
        "partOfSpeech": "v.",
        "chinese": "轻抛；轻弹",
        "example": ""
      },
      {
        "id": "word-15-21",
        "english": "jealous",
        "phonetic": "/ˈdʒeləs/",
        "partOfSpeech": "a.",
        "chinese": "嫉妒的；猜疑的",
        "example": ""
      },
      {
        "id": "word-15-36",
        "english": "scatter",
        "phonetic": "/ˈskætə(r)/",
        "partOfSpeech": "v.",
        "chinese": "（使人或动物）散开，驱散；撒；撒播",
        "example": ""
      },
      {
        "id": "word-15-14",
        "english": "untrustworthy*",
        "phonetic": "[ʌnˈtrʌstwɜ:ði]",
        "partOfSpeech": "a.",
        "chinese": "不值得信任的，靠不住的",
        "example": ""
      },
      {
        "id": "word-15-30",
        "english": "defence*",
        "phonetic": "/dɪˈfens/",
        "partOfSpeech": "n.",
        "chinese": "防御，保护；辩护；答辩； [pl.] 防务工事",
        "example": ""
      },
      {
        "id": "word-16-41",
        "english": "retail*",
        "phonetic": "/ˈriːteɪl/",
        "partOfSpeech": "n.",
        "chinese": "零售 v. 零售，以……价格销售",
        "example": ""
      },
      {
        "id": "word-16-3",
        "english": "overwork",
        "phonetic": "/ˏəuvəˈwɜːk/",
        "partOfSpeech": "v.",
        "chinese": "使劳累过分；对……使用过度；滥用（词等） n. 过重的工作；工作过度",
        "example": ""
      },
      {
        "id": "word-16-70",
        "english": "foetus*",
        "phonetic": "/ˈfiːtəs/",
        "partOfSpeech": "n.",
        "chinese": "胎儿；胚胎",
        "example": ""
      },
      {
        "id": "word-15-15",
        "english": "prospective",
        "phonetic": "/prəˈspektɪv/",
        "partOfSpeech": "a.",
        "chinese": "预期的；未来的；可能的",
        "example": ""
      },
      {
        "id": "word-16-45",
        "english": "twofold*",
        "phonetic": "[ˈtu:fəʊld]",
        "partOfSpeech": "a.",
        "chinese": "两位的，双重的；两部分的 ad. 两倍地，双重地",
        "example": ""
      },
      {
        "id": "word-15-13",
        "english": "explorer*",
        "phonetic": "[ɪkˈsplɔ:rə(r)]",
        "partOfSpeech": "n.",
        "chinese": "勘探者，探险者",
        "example": ""
      },
      {
        "id": "word-16-56",
        "english": "spade",
        "phonetic": "/speɪd/",
        "partOfSpeech": "n.",
        "chinese": "铁锹",
        "example": ""
      },
      {
        "id": "word-16-44",
        "english": "transaction*",
        "phonetic": "/trænˈzækʃn/",
        "partOfSpeech": "n.",
        "chinese": "办理；处理；交易，业务； [pl.] 会报，学报",
        "example": ""
      },
      {
        "id": "word-16-71",
        "english": "merge",
        "phonetic": "/mɜːdʒ/",
        "partOfSpeech": "v.",
        "chinese": "（使）结合",
        "example": ""
      },
      {
        "id": "word-15-31",
        "english": "volume*",
        "phonetic": "/ˈvɔljuːm/",
        "partOfSpeech": "n.",
        "chinese": "卷，册；体积；音量",
        "example": ""
      },
      {
        "id": "word-15-3",
        "english": "comment*",
        "phonetic": "/ˈkɔment/",
        "partOfSpeech": "n.",
        "chinese": "注释，评论，意见 v. 注释，评论",
        "example": ""
      },
      {
        "id": "word-15-10",
        "english": "internist*",
        "phonetic": "[ɪnˈtɜ:nɪst]",
        "partOfSpeech": "n.",
        "chinese": "内科医生",
        "example": ""
      },
      {
        "id": "word-15-9",
        "english": "president*",
        "phonetic": "/ˈprezɪdənt/",
        "partOfSpeech": "n.",
        "chinese": "总统，校长，会长，（大会）主席",
        "example": ""
      },
      {
        "id": "word-15-11",
        "english": "reception*",
        "phonetic": "/rɪˈsepʃn/",
        "partOfSpeech": "n.",
        "chinese": "接收，接受；接待，招待会；接收效果",
        "example": ""
      },
      {
        "id": "word-15-5",
        "english": "flame*",
        "phonetic": "/fleɪm/",
        "partOfSpeech": "n.",
        "chinese": "火焰；强烈的感情 v. 发火焰，燃烧",
        "example": ""
      },
      {
        "id": "word-16-60",
        "english": "tunnel*",
        "phonetic": "/ˈtʌnl/",
        "partOfSpeech": "n.",
        "chinese": "隧道；地道 v. 挖（地道），开（隧道）",
        "example": ""
      },
      {
        "id": "word-16-58",
        "english": "aspect*",
        "phonetic": "/ˈæspekt/",
        "partOfSpeech": "n.",
        "chinese": "方面；（建筑物的）朝向，方向；外貌，外观样子",
        "example": ""
      },
      {
        "id": "word-15-39",
        "english": "glossary*",
        "phonetic": "/ˈglɔsərɪ/",
        "partOfSpeech": "n.",
        "chinese": "词汇表；术语表",
        "example": ""
      },
      {
        "id": "word-15-35",
        "english": "internationalist*",
        "phonetic": "[ˌɪntəˈnæʃnəlɪst]",
        "partOfSpeech": "n.",
        "chinese": "国际主义者 a. 国际主义者的",
        "example": ""
      },
      {
        "id": "word-15-16",
        "english": "percentage*",
        "phonetic": "/pəˈsentɪdʒ/",
        "partOfSpeech": "n.",
        "chinese": "百分比，百分率",
        "example": ""
      },
      {
        "id": "word-15-1",
        "english": "attach",
        "phonetic": "/əˈtætʃ/",
        "partOfSpeech": "v.",
        "chinese": "系，贴；认为有重要性（或意义，价值等）；使附属，附加",
        "example": ""
      },
      {
        "id": "word-16-52",
        "english": "fashion*",
        "phonetic": "/ˈfæʃn/",
        "partOfSpeech": "n.",
        "chinese": "方式；流行款式；时装",
        "example": ""
      },
      {
        "id": "word-15-18",
        "english": "stammer*",
        "phonetic": "/ˈstæmə(r)/",
        "partOfSpeech": "n.",
        "chinese": "结巴，口吃 v. 口吃",
        "example": ""
      },
      {
        "id": "word-16-73",
        "english": "label*",
        "phonetic": "/ˈleɪbl/",
        "partOfSpeech": "vt.",
        "chinese": "贴标签于 n. 标签，标记；称号；绰号，外号",
        "example": ""
      },
      {
        "id": "word-15-8",
        "english": "provision*",
        "phonetic": "/prəˈvɪʒn/",
        "partOfSpeech": "n.",
        "chinese": "供应，（一批）供应品；准备，预备；条款，规定；给养，口粮",
        "example": ""
      },
      {
        "id": "word-16-69",
        "english": "vice",
        "phonetic": "",
        "partOfSpeech": "versa",
        "chinese": "/ˏvaɪsɪ ˈvɜːsə/ 反之亦然",
        "example": ""
      },
      {
        "id": "word-15-26",
        "english": "gender*",
        "phonetic": "/ˈdʒendə(r)/",
        "partOfSpeech": "n.",
        "chinese": "性别；（语法中的）性",
        "example": ""
      },
      {
        "id": "word-16-61",
        "english": "contrast",
        "phonetic": "/ˈkɔntrɑːst/",
        "partOfSpeech": "n.",
        "chinese": "对比；对照 /kənˈtrɑːst/ v. 对比；对照；形成对比",
        "example": ""
      },
      {
        "id": "word-16-38",
        "english": "otherwise*",
        "phonetic": "/ˈʌðəwaɪz/",
        "partOfSpeech": "ad.",
        "chinese": "另样，用别的方法；在其他方面 conj. 要不然，否则",
        "example": ""
      },
      {
        "id": "word-16-54",
        "english": "splash",
        "phonetic": "/splæʃ/",
        "partOfSpeech": "v.",
        "chinese": "溅；泼",
        "example": ""
      },
      {
        "id": "word-15-58",
        "english": "bent*",
        "phonetic": "/bent/",
        "partOfSpeech": "a.",
        "chinese": "被弄弯的，弯曲的 n. 爱好，天赋",
        "example": ""
      },
      {
        "id": "word-15-24",
        "english": "uphill",
        "phonetic": "/ˏʌpˈhɪl/",
        "partOfSpeech": "ad.",
        "chinese": "向上，往上；上坡；艰难地",
        "example": ""
      },
      {
        "id": "word-16-75",
        "english": "interrelationship*",
        "phonetic": "[ˌɪntərɪˈleɪʃnʃɪp]",
        "partOfSpeech": "n.",
        "chinese": "相互关联，相互影响",
        "example": ""
      },
      {
        "id": "word-15-27",
        "english": "consecutive*",
        "phonetic": "/kənˈsekjutɪv/",
        "partOfSpeech": "a.",
        "chinese": "连续不断的，连贯的",
        "example": ""
      },
      {
        "id": "word-16-37",
        "english": "optical*",
        "phonetic": "/ˈɔptɪkl/",
        "partOfSpeech": "a.",
        "chinese": "视力的；光学的",
        "example": ""
      },
      {
        "id": "word-16-55",
        "english": "beforehand",
        "phonetic": "/bɪˈfɔːhænd/",
        "partOfSpeech": "ad.",
        "chinese": "预先，事先",
        "example": ""
      },
      {
        "id": "word-16-31",
        "english": "reinforce",
        "phonetic": "/ˏriːɪnˈfɔːs/",
        "partOfSpeech": "vt.",
        "chinese": "加强；增援",
        "example": ""
      },
      {
        "id": "word-15-33",
        "english": "regardless*",
        "phonetic": "[rɪˈgɑ:dləs]",
        "partOfSpeech": "ad.",
        "chinese": "不顾后果地；无论如何",
        "example": ""
      },
      {
        "id": "word-15-23",
        "english": "fickle*",
        "phonetic": "/ˈfɪkl/",
        "partOfSpeech": "a.",
        "chinese": "易变的，无常的",
        "example": ""
      },
      {
        "id": "word-16-14",
        "english": "scratch*",
        "phonetic": "/skrætʃ/",
        "partOfSpeech": "n.",
        "chinese": "划伤，抓痕 v. 抓，掻；划破，划损",
        "example": ""
      },
      {
        "id": "word-16-33",
        "english": "donation",
        "phonetic": "[dəʊˈneɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "捐款；捐赠",
        "example": ""
      },
      {
        "id": "word-16-68",
        "english": "summarise",
        "phonetic": "['sʌməraɪz]",
        "partOfSpeech": "v.",
        "chinese": "总结，概括",
        "example": ""
      },
      {
        "id": "word-16-27",
        "english": "immediately*",
        "phonetic": "[ɪˈmi:diətli]",
        "partOfSpeech": "ad.",
        "chinese": "立即，马上；紧接地；直接地",
        "example": ""
      },
      {
        "id": "word-16-63",
        "english": "parcel",
        "phonetic": "/ˈpɑːsl/",
        "partOfSpeech": "n.",
        "chinese": "包裹",
        "example": ""
      },
      {
        "id": "word-15-19",
        "english": "hawk",
        "phonetic": "/hɔːk/",
        "partOfSpeech": "n.",
        "chinese": "鹰，隼",
        "example": ""
      },
      {
        "id": "word-16-74",
        "english": "guarantee*",
        "phonetic": "/ˏgærənˈtiː/",
        "partOfSpeech": "v.",
        "chinese": "保证；允诺 n. 保证；担保物",
        "example": ""
      },
      {
        "id": "word-15-67",
        "english": "grove*",
        "phonetic": "/grəuv/",
        "partOfSpeech": "n.",
        "chinese": "树丛，小树丛",
        "example": ""
      },
      {
        "id": "word-15-20",
        "english": "swamp",
        "phonetic": "/swɔmp/",
        "partOfSpeech": "vt.",
        "chinese": "淹没；使应接不暇 n. 沼泽",
        "example": ""
      },
      {
        "id": "word-15-70",
        "english": "torrent",
        "phonetic": "/ˈtɔrənt/",
        "partOfSpeech": "n.",
        "chinese": "洪流；爆发；（讲话等的）连发",
        "example": ""
      },
      {
        "id": "word-15-54",
        "english": "relief",
        "phonetic": "/rɪˈliːf/",
        "partOfSpeech": "n.",
        "chinese": "（痛苦等）减轻，解除；援救，救济；安慰；缓和剂",
        "example": ""
      },
      {
        "id": "word-16-25",
        "english": "parallel",
        "phonetic": "/ˈpærəlel/",
        "partOfSpeech": "n.",
        "chinese": "可相比拟的事物（或人），相似处；纬线 a. 平行的；类似的，相对应的；并行的 vt. 与……相似；比得上",
        "example": ""
      },
      {
        "id": "word-15-49",
        "english": "route*",
        "phonetic": "/ruːt;",
        "partOfSpeech": "",
        "chinese": "raut/ n. 路线；路程",
        "example": ""
      },
      {
        "id": "word-16-16",
        "english": "assist*",
        "phonetic": "/əˈsɪst/",
        "partOfSpeech": "v.",
        "chinese": "帮助，援助，协助",
        "example": ""
      },
      {
        "id": "word-16-49",
        "english": "delay*",
        "phonetic": "/dɪˈleɪ/",
        "partOfSpeech": "n./v.",
        "chinese": "耽搁，延迟，延期，迟滞",
        "example": ""
      },
      {
        "id": "word-16-4",
        "english": "parental",
        "phonetic": "[pəˈrentl]",
        "partOfSpeech": "a.",
        "chinese": "父的；母的；父母（般）的",
        "example": ""
      },
      {
        "id": "word-15-59",
        "english": "dormitory*",
        "phonetic": "/ˈdɔːmɪtrɪ/",
        "partOfSpeech": "n.",
        "chinese": "（集体）宿舍",
        "example": ""
      },
      {
        "id": "word-15-76",
        "english": "microcosm*",
        "phonetic": "/ˈmaɪkrəukɔzəm/",
        "partOfSpeech": "n.",
        "chinese": "微观世界；缩影",
        "example": ""
      },
      {
        "id": "word-15-52",
        "english": "sensational*",
        "phonetic": "[senˈseɪʃənl]",
        "partOfSpeech": "a.",
        "chinese": "轰动性的，引起哗然的；耸人听闻的；极好的；绝妙的",
        "example": ""
      },
      {
        "id": "word-15-17",
        "english": "clue",
        "phonetic": "/kluː/",
        "partOfSpeech": "n.",
        "chinese": "线索；提示",
        "example": ""
      },
      {
        "id": "word-16-29",
        "english": "serial",
        "phonetic": "/ˈsɪərɪəl/",
        "partOfSpeech": "n.",
        "chinese": "连续剧 a. 连续的；顺序排列的",
        "example": ""
      },
      {
        "id": "word-16-40",
        "english": "however*",
        "phonetic": "/hauˈevə(r)/",
        "partOfSpeech": "conj.",
        "chinese": "不管用什么方法，然而 ad. 无论如何，不管怎样；可是；仍然",
        "example": ""
      },
      {
        "id": "word-16-23",
        "english": "tend*",
        "phonetic": "/tend/",
        "partOfSpeech": "v.",
        "chinese": "倾向于，趋于；照料；招待",
        "example": ""
      },
      {
        "id": "word-15-34",
        "english": "emboss",
        "phonetic": "/ɪmˈbɔs/",
        "partOfSpeech": "vt.",
        "chinese": "使……凸出；压花（纹）",
        "example": ""
      },
      {
        "id": "word-15-69",
        "english": "detach",
        "phonetic": "/dɪˈtætʃ/",
        "partOfSpeech": "v.",
        "chinese": "分开，分离；分遣",
        "example": ""
      },
      {
        "id": "word-15-6",
        "english": "foresee",
        "phonetic": "/fɔːˈsiː/",
        "partOfSpeech": "vt.",
        "chinese": "预见，预知",
        "example": ""
      },
      {
        "id": "word-16-8",
        "english": "menace*",
        "phonetic": "/ˈmenəs/",
        "partOfSpeech": "n.",
        "chinese": "威胁；危险的人（或物） vt. 威胁到，危及",
        "example": ""
      },
      {
        "id": "word-16-26",
        "english": "compel*",
        "phonetic": "/kəmˈpel/",
        "partOfSpeech": "vt.",
        "chinese": "强迫",
        "example": ""
      },
      {
        "id": "word-16-5",
        "english": "sediment",
        "phonetic": "/ˈsedɪmənt/",
        "partOfSpeech": "n.",
        "chinese": "沉淀物；沉积物（如沙、砾、石、泥等）",
        "example": ""
      },
      {
        "id": "word-15-57",
        "english": "harness*",
        "phonetic": "/ˈhɑːnɪs/",
        "partOfSpeech": "vt.",
        "chinese": "控制，利用；上马具 n. 马具",
        "example": ""
      },
      {
        "id": "word-16-65",
        "english": "stem*",
        "phonetic": "/stem/",
        "partOfSpeech": "n.",
        "chinese": "茎；（树）干；词干 vt. 止住，抑止，堵住，阻止",
        "example": ""
      },
      {
        "id": "word-15-43",
        "english": "amass",
        "phonetic": "/əˈmæs/",
        "partOfSpeech": "vt.",
        "chinese": "积聚",
        "example": ""
      },
      {
        "id": "word-16-51",
        "english": "germ",
        "phonetic": "/dʒɜːm/",
        "partOfSpeech": "n.",
        "chinese": "微生物，细菌；起源，萌芽",
        "example": ""
      },
      {
        "id": "word-15-56",
        "english": "pretension*",
        "phonetic": "/prɪˈtenʃn/",
        "partOfSpeech": "n.",
        "chinese": "声称，自命；自负，自命不凡",
        "example": ""
      },
      {
        "id": "word-15-64",
        "english": "scheme",
        "phonetic": "/skiːm/",
        "partOfSpeech": "n.",
        "chinese": "计划，方案；体系，体制；阴谋 v. 计划，策划；密谋",
        "example": ""
      },
      {
        "id": "word-15-28",
        "english": "diversion*",
        "phonetic": "/daɪˈvɜːʃn/",
        "partOfSpeech": "n.",
        "chinese": "转向，转移，转换；转移视线的事物；娱乐",
        "example": ""
      },
      {
        "id": "word-16-72",
        "english": "aware*",
        "phonetic": "/əˈweə(r)/",
        "partOfSpeech": "a.",
        "chinese": "知道的；意识到的",
        "example": ""
      },
      {
        "id": "word-16-67",
        "english": "sincere",
        "phonetic": "/sɪnˈsɪə(r)/",
        "partOfSpeech": "a.",
        "chinese": "真挚的，诚挚的，真诚的，诚恳的",
        "example": ""
      },
      {
        "id": "word-15-42",
        "english": "goodwill*",
        "phonetic": "/ˏgudˈwɪl/",
        "partOfSpeech": "n.",
        "chinese": "友好，善意；信誉",
        "example": ""
      },
      {
        "id": "word-16-2",
        "english": "catastrophe",
        "phonetic": "/kəˈtæstrəfɪ/",
        "partOfSpeech": "n.",
        "chinese": "大灾难",
        "example": ""
      },
      {
        "id": "word-16-28",
        "english": "institute",
        "phonetic": "/ˈɪnstɪtjuːt/",
        "partOfSpeech": "n.",
        "chinese": "研究所，学院 vt. 建立，设立",
        "example": ""
      },
      {
        "id": "word-16-15",
        "english": "flexitime*",
        "phonetic": "/ˈfleksɪtaɪm/",
        "partOfSpeech": "n.",
        "chinese": "弹性工作制",
        "example": ""
      },
      {
        "id": "word-16-6",
        "english": "various*",
        "phonetic": "/ˈveərɪəs/",
        "partOfSpeech": "a.",
        "chinese": "各种各样的；不同的；多方面的",
        "example": ""
      },
      {
        "id": "word-15-68",
        "english": "materialistic*",
        "phonetic": "[məˌtɪəriəˈlɪstɪk]",
        "partOfSpeech": "a.",
        "chinese": "唯物主义的；物质享乐主义的，贪图享乐的",
        "example": ""
      },
      {
        "id": "word-16-35",
        "english": "jungle",
        "phonetic": "/ˈdʒʌŋgl/",
        "partOfSpeech": "n.",
        "chinese": "丛林",
        "example": ""
      },
      {
        "id": "word-16-50",
        "english": "congress*",
        "phonetic": "['kɒŋɡres]",
        "partOfSpeech": "n.",
        "chinese": "（代表）大会；（美国等国的）国会，议会",
        "example": ""
      },
      {
        "id": "word-15-47",
        "english": "mansion",
        "phonetic": "/ˋmænʃən/",
        "partOfSpeech": "n.",
        "chinese": "大厦；（豪华的）宅邸",
        "example": ""
      },
      {
        "id": "word-15-65",
        "english": "addition*",
        "phonetic": "/əˈdɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "加，增加（物）",
        "example": ""
      },
      {
        "id": "word-15-4",
        "english": "emphasize",
        "phonetic": "['emfəsaɪz]",
        "partOfSpeech": "vt.",
        "chinese": "强调，着重",
        "example": ""
      },
      {
        "id": "word-16-12",
        "english": "position*",
        "phonetic": "/pəˈzɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "位置，方位；职位，职务；姿势，姿态；见解，立场 vt. 安放，安置",
        "example": ""
      },
      {
        "id": "word-16-22",
        "english": "veil*",
        "phonetic": "/veɪl/",
        "partOfSpeech": "n.",
        "chinese": "面纱；遮蔽物 vt. 蒙着面纱；掩饰",
        "example": ""
      },
      {
        "id": "word-16-46",
        "english": "solution*",
        "phonetic": "/səˈluːʃn/",
        "partOfSpeech": "n.",
        "chinese": "解答，解决办法；溶解，溶液",
        "example": ""
      },
      {
        "id": "word-16-62",
        "english": "effect*",
        "phonetic": "/ɪˈfekt/",
        "partOfSpeech": "n.",
        "chinese": "作用，影响；结果；效果 vt. 使产生，招致；实现",
        "example": ""
      },
      {
        "id": "word-15-66",
        "english": "sensory*",
        "phonetic": "[ˈsensəri]",
        "partOfSpeech": "a.",
        "chinese": "感觉的，感官的",
        "example": ""
      },
      {
        "id": "word-15-37",
        "english": "appetite",
        "phonetic": "/ˈæpɪtaɪt/",
        "partOfSpeech": "n.",
        "chinese": "食欲，胃口；欲望",
        "example": ""
      },
      {
        "id": "word-16-64",
        "english": "distance",
        "phonetic": "/ˈdɪstəns/",
        "partOfSpeech": "n.",
        "chinese": "距离；远方；一长段时间",
        "example": ""
      },
      {
        "id": "word-16-24",
        "english": "removal",
        "phonetic": "[rɪ'mu:vl]",
        "partOfSpeech": "n.",
        "chinese": "除去；免职；搬迁",
        "example": ""
      },
      {
        "id": "word-16-9",
        "english": "contain*",
        "phonetic": "/kənˈteɪn/",
        "partOfSpeech": "vt.",
        "chinese": "包含，容纳，装有；控制，阻止，遏制",
        "example": ""
      },
      {
        "id": "word-15-46",
        "english": "grip",
        "phonetic": "/grɪp/",
        "partOfSpeech": "v.",
        "chinese": "握紧，抓牢；吸引住……的注意力（或想象力等） n. 紧握，抓牢；掌握，控制",
        "example": ""
      },
      {
        "id": "word-16-76",
        "english": "stationery",
        "phonetic": "[ˈsteɪʃənri]",
        "partOfSpeech": "n.",
        "chinese": "文具",
        "example": ""
      },
      {
        "id": "word-15-75",
        "english": "agriculture",
        "phonetic": "/ˈægrɪkʌltʃə(r)/",
        "partOfSpeech": "n.",
        "chinese": "农业；农学",
        "example": ""
      },
      {
        "id": "word-15-25",
        "english": "succeed",
        "phonetic": "/səkˈsiːd/",
        "partOfSpeech": "v.",
        "chinese": "成功；接着发生",
        "example": ""
      },
      {
        "id": "word-16-10",
        "english": "fasten*",
        "phonetic": "/ˈfɑːsn/",
        "partOfSpeech": "v.",
        "chinese": "扎牢，扣住",
        "example": ""
      },
      {
        "id": "word-15-51",
        "english": "opposite*",
        "phonetic": "/ˈɔpəzɪt/",
        "partOfSpeech": "prep.",
        "chinese": "在……对面 a. 对面的，对立的；相反的，相对的 n. 对立面，对立物",
        "example": ""
      },
      {
        "id": "word-15-48",
        "english": "galaxy",
        "phonetic": "/ˈgæləksɪ/",
        "partOfSpeech": "n.",
        "chinese": "[the",
        "example": "G-] 银河；星系；群英"
      },
      {
        "id": "word-15-55",
        "english": "cultivation*",
        "phonetic": "[ˌkʌltɪˈveɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "耕种，耕作；培养，教育",
        "example": ""
      },
      {
        "id": "word-16-32",
        "english": "commitment",
        "phonetic": "[kə'mɪtmənt]",
        "partOfSpeech": "n.",
        "chinese": "委托；许诺；承担义务",
        "example": ""
      },
      {
        "id": "word-15-73",
        "english": "inspect",
        "phonetic": "/ɪnˈspekt/",
        "partOfSpeech": "vt.",
        "chinese": "检查，检阅",
        "example": ""
      },
      {
        "id": "word-15-29",
        "english": "donate*",
        "phonetic": "/dəuˈneɪt/",
        "partOfSpeech": "vt.",
        "chinese": "捐赠，赠送",
        "example": ""
      },
      {
        "id": "word-16-17",
        "english": "mammal*",
        "phonetic": "/ˈmæml/",
        "partOfSpeech": "n.",
        "chinese": "哺乳动物",
        "example": ""
      },
      {
        "id": "word-16-18",
        "english": "illegal*",
        "phonetic": "/ɪˈliːgl/",
        "partOfSpeech": "a.",
        "chinese": "不合法的，违法的",
        "example": ""
      },
      {
        "id": "word-16-77",
        "english": "limestone*",
        "phonetic": "['laɪmstəʊn]",
        "partOfSpeech": "n.",
        "chinese": "石灰石，石灰岩",
        "example": ""
      },
      {
        "id": "word-16-57",
        "english": "filter*",
        "phonetic": "/ˈfɪltə(r)/",
        "partOfSpeech": "n.",
        "chinese": "过滤器 v. 过滤；（消息等）走漏",
        "example": ""
      },
      {
        "id": "word-15-50",
        "english": "deficiency",
        "phonetic": "/dɪˈfɪʃnsɪ/",
        "partOfSpeech": "n.",
        "chinese": "缺乏，不足",
        "example": ""
      },
      {
        "id": "word-16-39",
        "english": "possession*",
        "phonetic": "/pəˈzeʃn/",
        "partOfSpeech": "n.",
        "chinese": "持有，拥有；所有权；所有物，财产，财富；领土",
        "example": ""
      },
      {
        "id": "word-15-41",
        "english": "sulphuric",
        "phonetic": "",
        "partOfSpeech": "",
        "chinese": "acid [sʌlˌfjʊərɪk ˈæsɪd] 硫酸",
        "example": ""
      },
      {
        "id": "word-16-7",
        "english": "resit*",
        "phonetic": "/ˏriːˈsɪt/",
        "partOfSpeech": "v./n.",
        "chinese": "重修，补考",
        "example": ""
      },
      {
        "id": "word-16-1",
        "english": "surgery",
        "phonetic": "/ˈsɜːdʒərɪ/",
        "partOfSpeech": "n.",
        "chinese": "外科学；外科手术；手术室，诊疗室",
        "example": ""
      },
      {
        "id": "word-16-21",
        "english": "artificial*",
        "phonetic": "/ˏɑːtɪˈfɪʃl/",
        "partOfSpeech": "a.",
        "chinese": "人工的，人造的；假的，矫揉造作的；模拟的",
        "example": ""
      },
      {
        "id": "word-15-72",
        "english": "thirsty",
        "phonetic": "['θɜ:stɪ]",
        "partOfSpeech": "a.",
        "chinese": "口渴的；饥渴的",
        "example": ""
      },
      {
        "id": "word-16-43",
        "english": "morality*",
        "phonetic": "/məˈrælətɪ/",
        "partOfSpeech": "n.",
        "chinese": "道德，美德",
        "example": ""
      },
      {
        "id": "word-16-20",
        "english": "sinew*",
        "phonetic": "/ˈsɪnjuː/",
        "partOfSpeech": "n.",
        "chinese": "肌腱；力量的来源",
        "example": ""
      },
      {
        "id": "word-16-48",
        "english": "remark*",
        "phonetic": "/rɪˈmɑːk/",
        "partOfSpeech": "v.",
        "chinese": "评论，谈论；注意到，察觉 n. 评语，评论；注释",
        "example": ""
      },
      {
        "id": "word-16-11",
        "english": "establish*",
        "phonetic": "/ɪˈstæblɪʃ/",
        "partOfSpeech": "vt.",
        "chinese": "建立；确立；安置，使安居",
        "example": ""
      },
      {
        "id": "word-16-36",
        "english": "overdraft*",
        "phonetic": "/ˈəuvədrɑːft/",
        "partOfSpeech": "n.",
        "chinese": "透支；透支额",
        "example": ""
      },
      {
        "id": "word-15-74",
        "english": "seam",
        "phonetic": "/siːm/",
        "partOfSpeech": "n.",
        "chinese": "缝，接缝；煤层",
        "example": ""
      },
      {
        "id": "word-16-47",
        "english": "embassy*",
        "phonetic": "/ˈembəsɪ/",
        "partOfSpeech": "n.",
        "chinese": "大使馆；大使馆全体官员",
        "example": ""
      },
      {
        "id": "word-15-63",
        "english": "burglar",
        "phonetic": "/ˈbɜːglə(r)/",
        "partOfSpeech": "n.",
        "chinese": "窃贼",
        "example": ""
      },
      {
        "id": "word-16-19",
        "english": "ultimately",
        "phonetic": "[ˈʌltɪmətli]",
        "partOfSpeech": "ad.",
        "chinese": "最终地",
        "example": ""
      },
      {
        "id": "word-16-30",
        "english": "oversee*",
        "phonetic": "/ˏəuvəˈsiː/",
        "partOfSpeech": "vt.",
        "chinese": "监督，监视（某人或某物）；俯瞰，眺望",
        "example": ""
      },
      {
        "id": "word-15-40",
        "english": "consolidation*",
        "phonetic": "[kənˌsɒlɪ'deɪʃən]",
        "partOfSpeech": "n.",
        "chinese": "合并；巩固",
        "example": ""
      },
      {
        "id": "word-15-44",
        "english": "federal",
        "phonetic": "/ˈfedərəl/",
        "partOfSpeech": "a.",
        "chinese": "联邦的，联盟的",
        "example": ""
      },
      {
        "id": "word-16-66",
        "english": "normal*",
        "phonetic": "/ˈnɔːml/",
        "partOfSpeech": "a.",
        "chinese": "正常的，平常的；标准的，规范的，正规的",
        "example": ""
      },
      {
        "id": "word-15-60",
        "english": "stitch*",
        "phonetic": "/stɪtʃ/",
        "partOfSpeech": "vt.",
        "chinese": "缝，缝合 n. 一针，针脚",
        "example": ""
      },
      {
        "id": "word-16-34",
        "english": "curious*",
        "phonetic": "/ˈkjuərɪəs/",
        "partOfSpeech": "a.",
        "chinese": "好奇的；奇怪的",
        "example": ""
      },
      {
        "id": "word-15-45",
        "english": "consideration*",
        "phonetic": "/kənˏsɪdəˈreɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "考虑；思考；体谅",
        "example": ""
      },
      {
        "id": "word-15-62",
        "english": "mite*",
        "phonetic": "/maɪt/",
        "partOfSpeech": "n.",
        "chinese": "极小量；螨虫",
        "example": ""
      },
      {
        "id": "word-15-53",
        "english": "participation*",
        "phonetic": "[pɑ:ˌtɪsɪˈpeɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "分享；参与",
        "example": ""
      },
      {
        "id": "word-16-42",
        "english": "cultural*",
        "phonetic": "/ˈkʌltʃərəl/",
        "partOfSpeech": "a.",
        "chinese": "文化的，人文的",
        "example": ""
      },
      {
        "id": "word-16-53",
        "english": "carousel*",
        "phonetic": "/ˏkærəˈsel/",
        "partOfSpeech": "n.",
        "chinese": "行李式传送带",
        "example": ""
      },
      {
        "id": "word-16-59",
        "english": "objection",
        "phonetic": "/əbˈdʒekʃn/",
        "partOfSpeech": "n.",
        "chinese": "反对；反对的理由",
        "example": ""
      },
      {
        "id": "word-15-71",
        "english": "clarify",
        "phonetic": "/ˈklærɪfaɪ/",
        "partOfSpeech": "vt.",
        "chinese": "澄清；阐明",
        "example": ""
      }
    ],
    "article": "In the field of Technological Innovation, researchers have been studying various phenomena to understand their implications. The concept of manual* has been widely discussed in recent studies. The concept of simulate has been widely discussed in recent studies. The concept of historic* has been widely discussed in recent studies. The concept of refund has been widely discussed in recent studies. The concept of favour has been widely discussed in recent studies. The concept of suspend* has been widely discussed in recent studies. The concept of prevail has been widely discussed in recent studies. The concept of flip has been widely discussed in recent studies. The concept of jealous has been widely discussed in recent studies. The concept of scatter has been widely discussed in recent studies. Researchers have found that these factors play a significant role in shaping our understanding of the subject. Further studies are needed to explore the full implications of these findings."
  },
  {
    "id": "unit-9",
    "name": "Unit 9: Word Lists 17 & 18",
    "words": [
      {
        "id": "word-17-48",
        "english": "dissolve",
        "phonetic": "/dɪˈzɔlv/",
        "partOfSpeech": "v.",
        "chinese": "溶解；解散；结束",
        "example": ""
      },
      {
        "id": "word-17-67",
        "english": "propel",
        "phonetic": "/prəˈpel/",
        "partOfSpeech": "vt.",
        "chinese": "推进，推动；驱使",
        "example": ""
      },
      {
        "id": "word-17-50",
        "english": "deploy*",
        "phonetic": "/dɪˈplɔɪ/",
        "partOfSpeech": "vt.",
        "chinese": "部署；使用，运用",
        "example": ""
      },
      {
        "id": "word-18-1",
        "english": "glacial*",
        "phonetic": "/ˈgleɪsɪəl/",
        "partOfSpeech": "a.",
        "chinese": "冰期的；冰川的；寒冷的，冰冷的；冷若冰霜的",
        "example": ""
      },
      {
        "id": "word-17-17",
        "english": "advice*",
        "phonetic": "/ədˈvaɪs/",
        "partOfSpeech": "n.",
        "chinese": "劝告，忠告；建议，（医生等的）意见",
        "example": ""
      },
      {
        "id": "word-17-25",
        "english": "optometrist",
        "phonetic": "[ɒpˈtɒmətrɪst]",
        "partOfSpeech": "n.",
        "chinese": "验光师，视力测定者",
        "example": ""
      },
      {
        "id": "word-18-9",
        "english": "confront*",
        "phonetic": "/kənˈfrʌnt/",
        "partOfSpeech": "vt.",
        "chinese": "遭遇；面对，正视",
        "example": ""
      },
      {
        "id": "word-18-29",
        "english": "troupe*",
        "phonetic": "/truːp/",
        "partOfSpeech": "n.",
        "chinese": "（演出的）班子，团，队；（尤指）马戏团，芭蕾舞团",
        "example": ""
      },
      {
        "id": "word-17-57",
        "english": "occasionally",
        "phonetic": "[əˈkeɪʒnəli]",
        "partOfSpeech": "ad.",
        "chinese": "有时候，偶尔",
        "example": ""
      },
      {
        "id": "word-17-62",
        "english": "scale",
        "phonetic": "/skeɪl/",
        "partOfSpeech": "n.",
        "chinese": "规模，大小； [pl.] 天平，磅秤；刻度，标度；（鱼等的）鳞；（音乐）音阶；等级，级别；比例（尺） vt. 攀登，爬越",
        "example": ""
      },
      {
        "id": "word-17-69",
        "english": "overseas*",
        "phonetic": "/ˏəuvəˈsiːz/",
        "partOfSpeech": "a.",
        "chinese": "在海外的 ad. 在海外",
        "example": ""
      },
      {
        "id": "word-17-47",
        "english": "despite*",
        "phonetic": "/dɪˈspaɪt/",
        "partOfSpeech": "prep.",
        "chinese": "不管，尽管",
        "example": ""
      },
      {
        "id": "word-18-31",
        "english": "discerning*",
        "phonetic": "[dɪˈsɜ:nɪŋ]",
        "partOfSpeech": "a.",
        "chinese": "有识别力的，眼光敏锐的",
        "example": ""
      },
      {
        "id": "word-18-7",
        "english": "convince*",
        "phonetic": "/kənˈvɪns/",
        "partOfSpeech": "vt.",
        "chinese": "（使）确信；说服",
        "example": ""
      },
      {
        "id": "word-17-1",
        "english": "impulse",
        "phonetic": "/ˈɪmpʌls/",
        "partOfSpeech": "n.",
        "chinese": "冲动，突如其来的念头；刺激，驱使；脉冲",
        "example": ""
      },
      {
        "id": "word-18-20",
        "english": "acrobatic*",
        "phonetic": "[ˌækrəˈbætɪk]",
        "partOfSpeech": "a.",
        "chinese": "杂技的；杂技般的；杂技演员",
        "example": ""
      },
      {
        "id": "word-17-52",
        "english": "branch*",
        "phonetic": "/brɑːntʃ/",
        "partOfSpeech": "n.",
        "chinese": "树枝；分部，分科",
        "example": ""
      },
      {
        "id": "word-18-25",
        "english": "at",
        "phonetic": "",
        "partOfSpeech": "",
        "chinese": "random [æt ˈrændəm] 随便地，任意地",
        "example": ""
      },
      {
        "id": "word-17-20",
        "english": "course*",
        "phonetic": "/kɔːs/",
        "partOfSpeech": "n.",
        "chinese": "过程，进程；路线，方针；跑道；课程 v. 追猎；运行；流动",
        "example": ""
      },
      {
        "id": "word-18-45",
        "english": "succession",
        "phonetic": "/səkˈseʃn/",
        "partOfSpeech": "n.",
        "chinese": "连续；接替，继承",
        "example": ""
      },
      {
        "id": "word-18-66",
        "english": "frock*",
        "phonetic": "/frɔk/",
        "partOfSpeech": "n.",
        "chinese": "上衣；连衣裙",
        "example": ""
      },
      {
        "id": "word-17-63",
        "english": "constantly",
        "phonetic": "[ˈkɒnstəntli]",
        "partOfSpeech": "ad.",
        "chinese": "经常；不断地",
        "example": ""
      },
      {
        "id": "word-18-42",
        "english": "material*",
        "phonetic": "/məˈtɪərɪəl/",
        "partOfSpeech": "n.",
        "chinese": "材料；素材 a. 物质的；重要的",
        "example": ""
      },
      {
        "id": "word-17-16",
        "english": "introduce*",
        "phonetic": "/ˏɪntrəˈdjuːs/",
        "partOfSpeech": "vt.",
        "chinese": "介绍；传入，引进；提出；采用，推行",
        "example": ""
      },
      {
        "id": "word-17-42",
        "english": "evidence*",
        "phonetic": "/ˈevɪdəns/",
        "partOfSpeech": "n.",
        "chinese": "根据，证据 ；形迹，迹象",
        "example": ""
      },
      {
        "id": "word-17-27",
        "english": "particle",
        "phonetic": "/ˈpɑːtɪkl/",
        "partOfSpeech": "n.",
        "chinese": "极少量；微粒",
        "example": ""
      },
      {
        "id": "word-18-17",
        "english": "confirmation*",
        "phonetic": "/ˏkɔnfəˈmeɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "证实，确认；批准",
        "example": ""
      },
      {
        "id": "word-17-36",
        "english": "systematic*",
        "phonetic": "[ˌsɪstəˈmætɪk]",
        "partOfSpeech": "a.",
        "chinese": "系统的，体系的",
        "example": ""
      },
      {
        "id": "word-18-49",
        "english": "chill*",
        "phonetic": "/tʃɪl/",
        "partOfSpeech": "v.",
        "chinese": "（使）变冷，冷藏 n. 寒意；寒战；寒心 a. 寒冷的；扫兴的",
        "example": ""
      },
      {
        "id": "word-18-10",
        "english": "exhibition",
        "phonetic": "/ˏeksɪˈbɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "展览（会）；陈列，展览",
        "example": ""
      },
      {
        "id": "word-17-54",
        "english": "vertical",
        "phonetic": "/ˈvɜːtɪkl/",
        "partOfSpeech": "a.",
        "chinese": "垂直的；竖式的 n. 垂直线",
        "example": ""
      },
      {
        "id": "word-18-53",
        "english": "crime*",
        "phonetic": "/kraɪm/",
        "partOfSpeech": "n.",
        "chinese": "罪行；犯罪",
        "example": ""
      },
      {
        "id": "word-17-41",
        "english": "scarce",
        "phonetic": "/skeəs/",
        "partOfSpeech": "a.",
        "chinese": "缺乏的，不足的；稀少的，罕见的",
        "example": ""
      },
      {
        "id": "word-17-7",
        "english": "attract*",
        "phonetic": "/əˈtrækt/",
        "partOfSpeech": "vt.",
        "chinese": "吸引，招引，引诱，引起（注意等）",
        "example": ""
      },
      {
        "id": "word-18-72",
        "english": "consolation*",
        "phonetic": "/ˏkɔnsəˈleɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "安慰；慰问",
        "example": ""
      },
      {
        "id": "word-17-18",
        "english": "attitude*",
        "phonetic": "/ˈætɪtjuːd/",
        "partOfSpeech": "n.",
        "chinese": "态度，看法；姿势",
        "example": ""
      },
      {
        "id": "word-17-44",
        "english": "waterproof",
        "phonetic": "['wɔ:təpru:f]",
        "partOfSpeech": "a.",
        "chinese": "不透水的；防水的",
        "example": ""
      },
      {
        "id": "word-18-48",
        "english": "sympathy",
        "phonetic": "/ˈsɪmpəθɪ/",
        "partOfSpeech": "n.",
        "chinese": "同情；赞同，支持",
        "example": ""
      },
      {
        "id": "word-17-40",
        "english": "depress*",
        "phonetic": "/dɪˈpres/",
        "partOfSpeech": "vt.",
        "chinese": "使沮丧；使不景气；降低，减少",
        "example": ""
      },
      {
        "id": "word-18-22",
        "english": "balcony",
        "phonetic": "/ˈbælkənɪ/",
        "partOfSpeech": "n.",
        "chinese": "阳台；楼座",
        "example": ""
      },
      {
        "id": "word-17-45",
        "english": "exclusive",
        "phonetic": "/ɪkˈskluːsɪv/",
        "partOfSpeech": "a.",
        "chinese": "奢华的；独有的；排他的 n. 独家新闻",
        "example": ""
      },
      {
        "id": "word-18-52",
        "english": "fierce*",
        "phonetic": "/fɪəs/",
        "partOfSpeech": "a.",
        "chinese": "凶猛的；强烈的",
        "example": ""
      },
      {
        "id": "word-18-14",
        "english": "overlapping*",
        "phonetic": "[əʊvə'læpɪŋ]",
        "partOfSpeech": "a.",
        "chinese": "重叠的；共通的",
        "example": ""
      },
      {
        "id": "word-17-65",
        "english": "adhere*",
        "phonetic": "/ədˈhɪə(r)/",
        "partOfSpeech": "vi.",
        "chinese": "黏附；遵守；坚持",
        "example": ""
      },
      {
        "id": "word-17-13",
        "english": "affect*",
        "phonetic": "/əˈfekt/",
        "partOfSpeech": "v.",
        "chinese": "影响；感染",
        "example": ""
      },
      {
        "id": "word-18-57",
        "english": "emission*",
        "phonetic": "/ɪˈmɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "（光、热等的）散发；散发物",
        "example": ""
      },
      {
        "id": "word-17-12",
        "english": "conceive",
        "phonetic": "/kənˈsiːv/",
        "partOfSpeech": "v.",
        "chinese": "（构）想出，构想，设想；怀孕",
        "example": ""
      },
      {
        "id": "word-18-71",
        "english": "facility",
        "phonetic": "/fəˈsɪlətɪ/",
        "partOfSpeech": "n.",
        "chinese": "[pl.] 设备，设施；便利条件",
        "example": ""
      },
      {
        "id": "word-18-54",
        "english": "constitute",
        "phonetic": "/ˈkɔnstɪtjuːt/",
        "partOfSpeech": "v.",
        "chinese": "组成；构成；设立，成立",
        "example": ""
      },
      {
        "id": "word-18-59",
        "english": "bistro*",
        "phonetic": "/ˈbiːstrəu/",
        "partOfSpeech": "n.",
        "chinese": "小酒馆；小餐馆",
        "example": ""
      },
      {
        "id": "word-17-26",
        "english": "degrade",
        "phonetic": "/dɪˈgreɪd/",
        "partOfSpeech": "v.",
        "chinese": "（使）降级；（使）堕落；（使）降解；（使）退化",
        "example": ""
      },
      {
        "id": "word-17-35",
        "english": "recreational*",
        "phonetic": "[ˌrekriˈeɪʃənl]",
        "partOfSpeech": "a.",
        "chinese": "消遣的，娱乐的；游戏的",
        "example": ""
      },
      {
        "id": "word-17-24",
        "english": "resident",
        "phonetic": "/ˈrezɪdənt/",
        "partOfSpeech": "n.",
        "chinese": "居民，住户 a. 常驻的，居住的",
        "example": ""
      },
      {
        "id": "word-17-23",
        "english": "pedal",
        "phonetic": "/ˈpedl/",
        "partOfSpeech": "v.",
        "chinese": "骑车；踩踏板 n. 踏板",
        "example": ""
      },
      {
        "id": "word-18-6",
        "english": "brochure*",
        "phonetic": "[ˈbrəʊʃə(r)]",
        "partOfSpeech": "n.",
        "chinese": "小册子；说明书",
        "example": ""
      },
      {
        "id": "word-18-46",
        "english": "sift*",
        "phonetic": "/sɪft/",
        "partOfSpeech": "v.",
        "chinese": "细查；筛；过滤",
        "example": ""
      },
      {
        "id": "word-17-33",
        "english": "chaos*",
        "phonetic": "/ˈkeɪɔs/",
        "partOfSpeech": "n.",
        "chinese": "混乱",
        "example": ""
      },
      {
        "id": "word-17-66",
        "english": "extracurricular*",
        "phonetic": "[ˌekstrəkə'rɪkjʊlə]",
        "partOfSpeech": "a.",
        "chinese": "课外的",
        "example": ""
      },
      {
        "id": "word-17-39",
        "english": "seal*",
        "phonetic": "/siːl/",
        "partOfSpeech": "vt.",
        "chinese": "封，密封 n. 封铅，封条；印，图章；海豹",
        "example": ""
      },
      {
        "id": "word-17-58",
        "english": "harridan*",
        "phonetic": "/ˈhærɪdən/",
        "partOfSpeech": "n.",
        "chinese": "凶恶的老妇；老巫婆",
        "example": ""
      },
      {
        "id": "word-18-19",
        "english": "embezzlement*",
        "phonetic": "[ɪm'bezlmənt]",
        "partOfSpeech": "n.",
        "chinese": "贪污，盗用",
        "example": ""
      },
      {
        "id": "word-18-24",
        "english": "well-being",
        "phonetic": "[wel",
        "partOfSpeech": "",
        "chinese": "'bi:ɪŋ] n. 安宁；福利",
        "example": ""
      },
      {
        "id": "word-17-43",
        "english": "besides*",
        "phonetic": "/bɪˈsaɪdz/",
        "partOfSpeech": "prep.",
        "chinese": "除……之外 ad. 而且",
        "example": ""
      },
      {
        "id": "word-17-55",
        "english": "herbivore*",
        "phonetic": "/ˈhɜːbɪvɔː(r)/",
        "partOfSpeech": "n.",
        "chinese": "食草动物",
        "example": ""
      },
      {
        "id": "word-17-61",
        "english": "section*",
        "phonetic": "/ˈsekʃn/",
        "partOfSpeech": "n.",
        "chinese": "部分；部门；截面",
        "example": ""
      },
      {
        "id": "word-18-67",
        "english": "epidemic*",
        "phonetic": "/ˏepɪˈdemɪk/",
        "partOfSpeech": "a.",
        "chinese": "流行性的 n. 流行病",
        "example": ""
      },
      {
        "id": "word-18-58",
        "english": "procession",
        "phonetic": "/prəˈseʃn/",
        "partOfSpeech": "n.",
        "chinese": "队伍，行列",
        "example": ""
      },
      {
        "id": "word-18-62",
        "english": "workforce",
        "phonetic": "[ˈwɜ:kˌfɔ:s]",
        "partOfSpeech": "n.",
        "chinese": "受雇的或现有的工作人员总数；劳动人口",
        "example": ""
      },
      {
        "id": "word-17-59",
        "english": "accommodation*",
        "phonetic": "/əˏkɔməˈdeɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "住处，膳宿；适应，调节",
        "example": ""
      },
      {
        "id": "word-17-21",
        "english": "match*",
        "phonetic": "/mætʃ/",
        "partOfSpeech": "n.",
        "chinese": "火柴；比赛，竞赛；对手，敌手 v. 匹配，相称",
        "example": ""
      },
      {
        "id": "word-17-28",
        "english": "downpour*",
        "phonetic": "/ˈdaunpɔː(r)/",
        "partOfSpeech": "n.",
        "chinese": "暴雨",
        "example": ""
      },
      {
        "id": "word-17-19",
        "english": "deliver*",
        "phonetic": "/dɪˈlɪvə(r)/",
        "partOfSpeech": "v.",
        "chinese": "交付，递送；发表，表达；释放；接生",
        "example": ""
      },
      {
        "id": "word-18-41",
        "english": "barbecue*",
        "phonetic": "/ˈbɑːbɪkjuː/",
        "partOfSpeech": "n.",
        "chinese": "金属烤肉架；烧烤野餐",
        "example": ""
      },
      {
        "id": "word-18-44",
        "english": "gullibly*",
        "phonetic": "{'gʌləblɪ}",
        "partOfSpeech": "ad.",
        "chinese": "轻信地，易受欺骗地",
        "example": ""
      },
      {
        "id": "word-17-72",
        "english": "mechanic",
        "phonetic": "/mɪˈkænɪk/",
        "partOfSpeech": "n.",
        "chinese": "机修工； [-s] 力学，机械学",
        "example": ""
      },
      {
        "id": "word-18-18",
        "english": "unquote*",
        "phonetic": "/ʌnˈkwəut/",
        "partOfSpeech": "v.",
        "chinese": "结束引语",
        "example": ""
      },
      {
        "id": "word-17-51",
        "english": "original*",
        "phonetic": "/əˈrɪdʒənl/",
        "partOfSpeech": "a.",
        "chinese": "最初的，原始的；新颖的，有独创性的 n. 原物，原作",
        "example": ""
      },
      {
        "id": "word-17-70",
        "english": "industrialise*",
        "phonetic": "[ɪn'dʌstrɪəlaɪz]",
        "partOfSpeech": "v.",
        "chinese": "（使）工业化",
        "example": ""
      },
      {
        "id": "word-17-5",
        "english": "check*",
        "phonetic": "/tʃek/",
        "partOfSpeech": "v.",
        "chinese": "检查，核对；阻止，制止 n. 检查，核对；制止，抵制；支票，帐单",
        "example": ""
      },
      {
        "id": "word-17-29",
        "english": "telescope*",
        "phonetic": "/ˈtelɪskəup/",
        "partOfSpeech": "n.",
        "chinese": "望远镜",
        "example": ""
      },
      {
        "id": "word-18-15",
        "english": "poultry*",
        "phonetic": "/ˈpəultrɪ/",
        "partOfSpeech": "n.",
        "chinese": "家禽；禽肉",
        "example": ""
      },
      {
        "id": "word-18-32",
        "english": "niggle*",
        "phonetic": "/ˈnɪgl/",
        "partOfSpeech": "v.",
        "chinese": "拘泥小节；挑剔，吹毛求疵；为小事操心；不断地烦扰",
        "example": ""
      },
      {
        "id": "word-18-36",
        "english": "continental*",
        "phonetic": "[ˌkɒntɪ'nentl]",
        "partOfSpeech": "a.",
        "chinese": "欧洲大陆的；大陆性的 n. 欧洲大陆人",
        "example": ""
      },
      {
        "id": "word-18-65",
        "english": "violent*",
        "phonetic": "/ˈvaɪələnt/",
        "partOfSpeech": "a.",
        "chinese": "暴力的；带有强烈感情的；猛烈的",
        "example": ""
      },
      {
        "id": "word-18-64",
        "english": "sociology*",
        "phonetic": "/ˏsəusɪˈɔlədʒɪ/",
        "partOfSpeech": "n.",
        "chinese": "社会学",
        "example": ""
      },
      {
        "id": "word-17-73",
        "english": "fracture",
        "phonetic": "/ˈfræktʃə(r)/",
        "partOfSpeech": "n.",
        "chinese": "断裂，折断；骨折 v. （使）断裂",
        "example": ""
      },
      {
        "id": "word-17-46",
        "english": "majority*",
        "phonetic": "/məˈdʒɔrətɪ/",
        "partOfSpeech": "n.",
        "chinese": "多数，大多数",
        "example": ""
      },
      {
        "id": "word-18-51",
        "english": "exposure*",
        "phonetic": "/ɪkˈspəuʒə(r)/",
        "partOfSpeech": "n.",
        "chinese": "暴露；显露；接触；曝光",
        "example": ""
      },
      {
        "id": "word-17-38",
        "english": "detract*",
        "phonetic": "/dɪˈtrækt/",
        "partOfSpeech": "v.",
        "chinese": "去掉，减损",
        "example": ""
      },
      {
        "id": "word-17-8",
        "english": "describe*",
        "phonetic": "/dɪˈskraɪb/",
        "partOfSpeech": "vt.",
        "chinese": "描述，描写，形容",
        "example": ""
      },
      {
        "id": "word-17-4",
        "english": "appear*",
        "phonetic": "/əˈpɪə(r)/",
        "partOfSpeech": "v.",
        "chinese": "出现，显露，公开露面；出场，问世；仿佛，似乎",
        "example": ""
      },
      {
        "id": "word-18-27",
        "english": "settle*",
        "phonetic": "/ˈsetl/",
        "partOfSpeech": "v.",
        "chinese": "定居，安家；解决，调停；安排，安放；支付，结算；安置于；（鸟等）飞落，停留，栖息",
        "example": ""
      },
      {
        "id": "word-17-3",
        "english": "incapacitate*",
        "phonetic": "/ˏɪnkəˈpæsɪteɪt/",
        "partOfSpeech": "vt.",
        "chinese": "使无能力；使伤残；使不适合；使无资格",
        "example": ""
      },
      {
        "id": "word-18-34",
        "english": "liaise*",
        "phonetic": "/lɪˈeɪz/",
        "partOfSpeech": "vi.",
        "chinese": "做联络人；联络，联系",
        "example": ""
      },
      {
        "id": "word-17-32",
        "english": "registration*",
        "phonetic": "/ˏredʒɪˈstreɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "登记，注册；（邮件等的）挂号；登记或注册的项目",
        "example": ""
      },
      {
        "id": "word-17-11",
        "english": "blend*",
        "phonetic": "/blend/",
        "partOfSpeech": "v.",
        "chinese": "（使）混合，（使）混杂 n. 混合物；混合，交融",
        "example": ""
      },
      {
        "id": "word-18-2",
        "english": "badminton",
        "phonetic": "/ˈbædmɪntən/",
        "partOfSpeech": "n.",
        "chinese": "羽毛球",
        "example": ""
      },
      {
        "id": "word-17-49",
        "english": "release*",
        "phonetic": "/rɪˈliːs/",
        "partOfSpeech": "vt.",
        "chinese": "释放，解放；发表，发行 n. 释放；发表，发布；排放，泄露",
        "example": ""
      },
      {
        "id": "word-18-12",
        "english": "oak",
        "phonetic": "/əuk/",
        "partOfSpeech": "n.",
        "chinese": "橡树，橡木",
        "example": ""
      },
      {
        "id": "word-18-28",
        "english": "fallow*",
        "phonetic": "/ˈfæləu/",
        "partOfSpeech": "a.",
        "chinese": "（土地）休耕的；休闲的",
        "example": ""
      },
      {
        "id": "word-17-56",
        "english": "flat*",
        "phonetic": "/flæt/",
        "partOfSpeech": "a.",
        "chinese": "平的；（价格）固定的 n. 单元住宅",
        "example": ""
      },
      {
        "id": "word-17-10",
        "english": "agency*",
        "phonetic": "/ˈeɪdʒənsɪ/",
        "partOfSpeech": "n.",
        "chinese": "机构；代理，代办",
        "example": ""
      },
      {
        "id": "word-17-6",
        "english": "collect*",
        "phonetic": "/kəˈlekt/",
        "partOfSpeech": "v.",
        "chinese": "收集，搜集；领取，接走；收（税等）；聚焦；积累",
        "example": ""
      },
      {
        "id": "word-18-16",
        "english": "pregnancy*",
        "phonetic": "['preɡnənsɪ]",
        "partOfSpeech": "n.",
        "chinese": "怀孕；怀孕期",
        "example": ""
      },
      {
        "id": "word-17-60",
        "english": "static",
        "phonetic": "/ˈstætɪk/",
        "partOfSpeech": "n.",
        "chinese": "静电；[-s] 静力学 a. 静止的，静态的；呆板的",
        "example": ""
      },
      {
        "id": "word-17-15",
        "english": "extend*",
        "phonetic": "/ɪkˈstend/",
        "partOfSpeech": "v.",
        "chinese": "延长；扩大",
        "example": ""
      },
      {
        "id": "word-18-69",
        "english": "statue",
        "phonetic": "/ˈstætʃuː/",
        "partOfSpeech": "n.",
        "chinese": "塑像",
        "example": ""
      },
      {
        "id": "word-18-61",
        "english": "pearl",
        "phonetic": "/pɜːl/",
        "partOfSpeech": "n.",
        "chinese": "珍珠",
        "example": ""
      },
      {
        "id": "word-17-53",
        "english": "chancellor*",
        "phonetic": "/ˈtʃɑːnsələ(r)/",
        "partOfSpeech": "n.",
        "chinese": "大臣；总理；首席法官；大学校长",
        "example": ""
      },
      {
        "id": "word-18-40",
        "english": "glamor",
        "phonetic": "['glæmə]",
        "partOfSpeech": "n.",
        "chinese": "魅力；诱惑力",
        "example": ""
      },
      {
        "id": "word-17-30",
        "english": "transport",
        "phonetic": "/ˈtrænspɔːt/",
        "partOfSpeech": "n.",
        "chinese": "运输，运送；运输系统，运载工具 /trænˈspɔːt/ vt. 运输，运送，搬运",
        "example": ""
      },
      {
        "id": "word-17-2",
        "english": "wax",
        "phonetic": "/wæks/",
        "partOfSpeech": "n.",
        "chinese": "蜡；蜂蜡 v. 给……上蜡，给……打蜡；（月亮）渐圆，渐满",
        "example": ""
      },
      {
        "id": "word-17-34",
        "english": "gorge*",
        "phonetic": "/gɔːdʒ/",
        "partOfSpeech": "v.",
        "chinese": "狼吞虎咽，塞饱 n. 山峡，峡谷",
        "example": ""
      },
      {
        "id": "word-17-22",
        "english": "employ*",
        "phonetic": "/ɪmˈplɔɪ/",
        "partOfSpeech": "n./vt.",
        "chinese": "雇用；用，使用",
        "example": ""
      },
      {
        "id": "word-18-47",
        "english": "spark",
        "phonetic": "/spɑːk/",
        "partOfSpeech": "n.",
        "chinese": "火花",
        "example": ""
      },
      {
        "id": "word-17-64",
        "english": "ailment*",
        "phonetic": "/ˈeɪlmənt/",
        "partOfSpeech": "n.",
        "chinese": "（不严重的）疾病",
        "example": ""
      },
      {
        "id": "word-17-37",
        "english": "subtropical*",
        "phonetic": "/ˏsʌbˈtrɔpɪkl/",
        "partOfSpeech": "a.",
        "chinese": "亚热带的",
        "example": ""
      },
      {
        "id": "word-17-9",
        "english": "chunk",
        "phonetic": "/tʃʌŋk/",
        "partOfSpeech": "n.",
        "chinese": "大块；相当大的部分（或数量）",
        "example": ""
      },
      {
        "id": "word-18-33",
        "english": "prospectus*",
        "phonetic": "/prəˈspektəs/",
        "partOfSpeech": "n.",
        "chinese": "内容说明书，简章，简介",
        "example": ""
      },
      {
        "id": "word-18-55",
        "english": "deceive",
        "phonetic": "/dɪˈsiːv/",
        "partOfSpeech": "v.",
        "chinese": "欺骗，蒙骗",
        "example": ""
      },
      {
        "id": "word-18-56",
        "english": "haul",
        "phonetic": "/hɔːl/",
        "partOfSpeech": "vt.",
        "chinese": "用力拖；搬运",
        "example": ""
      },
      {
        "id": "word-18-63",
        "english": "surpass*",
        "phonetic": "/səˈpɑːs/",
        "partOfSpeech": "v.",
        "chinese": "超过，超越，优于，胜过；超过……的界限，非……所能办到（或理解）",
        "example": ""
      },
      {
        "id": "word-18-13",
        "english": "additional*",
        "phonetic": "[əˈdɪʃənl]",
        "partOfSpeech": "a.",
        "chinese": "附加的；追加的",
        "example": ""
      },
      {
        "id": "word-18-39",
        "english": "premium*",
        "phonetic": "/ˈpriːmɪəm/",
        "partOfSpeech": "a.",
        "chinese": "高级的，优质的；售价高的 n. （投保人向保险公司支付的）保险金；额外费用，加付款；奖品，赠品；额外津贴",
        "example": ""
      },
      {
        "id": "word-17-14",
        "english": "frustrate",
        "phonetic": "/frʌˈstreɪt/",
        "partOfSpeech": "vt.",
        "chinese": "使沮丧；挫败",
        "example": ""
      },
      {
        "id": "word-18-3",
        "english": "dock",
        "phonetic": "/dɔk/",
        "partOfSpeech": "v.",
        "chinese": "（使）靠码头 n. 码头",
        "example": ""
      },
      {
        "id": "word-17-71",
        "english": "empire*",
        "phonetic": "/ˈempaɪə(r)/",
        "partOfSpeech": "n.",
        "chinese": "帝国",
        "example": ""
      },
      {
        "id": "word-18-43",
        "english": "adapt*",
        "phonetic": "/əˈdæpt/",
        "partOfSpeech": "v.",
        "chinese": "使适合；改编；适应",
        "example": ""
      },
      {
        "id": "word-18-4",
        "english": "argument*",
        "phonetic": "/ˈɑːgjumənt/",
        "partOfSpeech": "n.",
        "chinese": "争吵，争论；观点，论据；说理，论证",
        "example": ""
      },
      {
        "id": "word-18-50",
        "english": "multinational*",
        "phonetic": "/ˏmʌltɪˈnæʃnəl/",
        "partOfSpeech": "a.",
        "chinese": "多国的，多民族的；跨国公司的 n. 跨国公司",
        "example": ""
      },
      {
        "id": "word-17-31",
        "english": "prepare*",
        "phonetic": "/prɪˈpeə(r)/",
        "partOfSpeech": "v.",
        "chinese": "准备，预备",
        "example": ""
      },
      {
        "id": "word-18-60",
        "english": "crash",
        "phonetic": "/kræʃ/",
        "partOfSpeech": "v.",
        "chinese": "碰撞；冲，闯；倒下，坠落；发出撞击（或爆裂）声；垮台，破产 n. 碰撞；坠落，坠毁；破裂声，撞击声 a. 速成的",
        "example": ""
      },
      {
        "id": "word-18-70",
        "english": "appliance",
        "phonetic": "/əˈplaɪəns/",
        "partOfSpeech": "n.",
        "chinese": "用具，器具",
        "example": ""
      },
      {
        "id": "word-18-38",
        "english": "artery",
        "phonetic": "/ˈɑːtərɪ/",
        "partOfSpeech": "n.",
        "chinese": "动脉；干线，要道",
        "example": ""
      },
      {
        "id": "word-18-23",
        "english": "postgraduate",
        "phonetic": "/ˏpəustˈgrædʒuət/",
        "partOfSpeech": "n.",
        "chinese": "研究生",
        "example": ""
      },
      {
        "id": "word-18-5",
        "english": "chase*",
        "phonetic": "/tʃeɪs/",
        "partOfSpeech": "v.",
        "chinese": "追捕；追求；雕镂",
        "example": ""
      },
      {
        "id": "word-18-35",
        "english": "excavation*",
        "phonetic": "[ˌekskəˈveɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "挖掘，发掘；出土文物",
        "example": ""
      },
      {
        "id": "word-18-11",
        "english": "whereas",
        "phonetic": "/ˏweərˈæz/",
        "partOfSpeech": "conj.",
        "chinese": "然而，但是",
        "example": ""
      },
      {
        "id": "word-18-26",
        "english": "prime*",
        "phonetic": "/praɪm/",
        "partOfSpeech": "a.",
        "chinese": "首要的；最好的",
        "example": ""
      },
      {
        "id": "word-18-8",
        "english": "teem*",
        "phonetic": "/tiːm/",
        "partOfSpeech": "vi.",
        "chinese": "倾泻；充满，遍布",
        "example": ""
      },
      {
        "id": "word-18-37",
        "english": "modernism*",
        "phonetic": "/ˈmɔdənɪzəm/",
        "partOfSpeech": "n.",
        "chinese": "现代主义",
        "example": ""
      },
      {
        "id": "word-18-21",
        "english": "numerous",
        "phonetic": "/ˈnjuːmərəs/",
        "partOfSpeech": "a.",
        "chinese": "众多的",
        "example": ""
      },
      {
        "id": "word-18-30",
        "english": "premise*",
        "phonetic": "/ˈpremɪs/",
        "partOfSpeech": "n.",
        "chinese": "前提，假设； [pl.] （企业、机构等使用的）房屋和地基，经营场址",
        "example": ""
      },
      {
        "id": "word-17-68",
        "english": "posture",
        "phonetic": "/ˈpɔstʃə(r)/",
        "partOfSpeech": "n.",
        "chinese": "姿势；心情；态度",
        "example": ""
      },
      {
        "id": "word-18-68",
        "english": "grab",
        "phonetic": "/græb/",
        "partOfSpeech": "v./n.",
        "chinese": "抓，夺",
        "example": ""
      }
    ],
    "article": "In the field of Cultural Exchange, researchers have been studying various phenomena to understand their implications. The concept of dissolve has been widely discussed in recent studies. The concept of propel has been widely discussed in recent studies. The concept of deploy* has been widely discussed in recent studies. The concept of glacial* has been widely discussed in recent studies. The concept of advice* has been widely discussed in recent studies. The concept of optometrist has been widely discussed in recent studies. The concept of confront* has been widely discussed in recent studies. The concept of troupe* has been widely discussed in recent studies. The concept of occasionally has been widely discussed in recent studies. The concept of scale has been widely discussed in recent studies. Researchers have found that these factors play a significant role in shaping our understanding of the subject. Further studies are needed to explore the full implications of these findings."
  },
  {
    "id": "unit-10",
    "name": "Unit 10: Word Lists 19 & 20",
    "words": [
      {
        "id": "word-20-17",
        "english": "underlying*",
        "phonetic": "[ˌʌndəˈlaɪɪŋ]",
        "partOfSpeech": "a.",
        "chinese": "表面下的，下层的，在下面的；根本的；潜在的，隐含的",
        "example": ""
      },
      {
        "id": "word-19-5",
        "english": "sundial",
        "phonetic": "[ˈsʌndaɪəl]",
        "partOfSpeech": "n.",
        "chinese": "（通过太阳知道时间的）日规；日晷（仪）",
        "example": ""
      },
      {
        "id": "word-19-62",
        "english": "greatly*",
        "phonetic": "[ˈgreɪtli]",
        "partOfSpeech": "ad.",
        "chinese": "非常；很；极大地",
        "example": ""
      },
      {
        "id": "word-19-30",
        "english": "volunteer*",
        "phonetic": "/ˏvɔlənˈtɪə(r)/",
        "partOfSpeech": "v.",
        "chinese": "自愿做，无偿做 a. 志愿的，义务的，无偿的 n. 志愿的",
        "example": ""
      },
      {
        "id": "word-19-50",
        "english": "meadow",
        "phonetic": "/ˈmedəu/",
        "partOfSpeech": "n.",
        "chinese": "草地",
        "example": ""
      },
      {
        "id": "word-19-58",
        "english": "presence*",
        "phonetic": "/ˈprezns/",
        "partOfSpeech": "n.",
        "chinese": "出席；存在；仪态",
        "example": ""
      },
      {
        "id": "word-19-3",
        "english": "dissatisfied*",
        "phonetic": "/dɪˈsætɪsfaɪd/",
        "partOfSpeech": "a.",
        "chinese": "不满意的，不满足的",
        "example": ""
      },
      {
        "id": "word-19-14",
        "english": "disrespectful*",
        "phonetic": "[ˌdɪsrɪ'spektfl]",
        "partOfSpeech": "a.",
        "chinese": "失礼的，无礼的",
        "example": ""
      },
      {
        "id": "word-19-7",
        "english": "utilise*",
        "phonetic": "/ˈjuːtəlaɪz/",
        "partOfSpeech": "vt.",
        "chinese": "利用，运用",
        "example": ""
      },
      {
        "id": "word-19-11",
        "english": "displace",
        "phonetic": "/dɪsˈpleɪs/",
        "partOfSpeech": "vt.",
        "chinese": "取代；迫使（人们）离开家园；撤职，使失业",
        "example": ""
      },
      {
        "id": "word-19-75",
        "english": "encase",
        "phonetic": "/ɪnˈkeɪs/",
        "partOfSpeech": "vt.",
        "chinese": "装入，包住",
        "example": ""
      },
      {
        "id": "word-20-56",
        "english": "hatch",
        "phonetic": "/hætʃ/",
        "partOfSpeech": "v.",
        "chinese": "孵出，孵化；策划 n. （门、地板或天花板上的）开口；（飞机等的）舱门",
        "example": ""
      },
      {
        "id": "word-20-39",
        "english": "crush*",
        "phonetic": "/krʌʃ/",
        "partOfSpeech": "vt.",
        "chinese": "碾碎；压服，压垮；镇压，制服；压碎，压坏",
        "example": ""
      },
      {
        "id": "word-20-60",
        "english": "fruitful",
        "phonetic": "/ˈfruːtfl/",
        "partOfSpeech": "a.",
        "chinese": "多产的，富饶的；富有成效的",
        "example": ""
      },
      {
        "id": "word-19-66",
        "english": "photography",
        "phonetic": "[fəˈtɒgrəfi]",
        "partOfSpeech": "n.",
        "chinese": "摄影术，摄影",
        "example": ""
      },
      {
        "id": "word-20-44",
        "english": "sleek*",
        "phonetic": "/sliːk/",
        "partOfSpeech": "a.",
        "chinese": "（毛发等）光滑而有光泽的；时髦的；豪华的 vt. 使（毛发等）光滑发亮",
        "example": ""
      },
      {
        "id": "word-20-65",
        "english": "spoil*",
        "phonetic": "/spɔɪl/",
        "partOfSpeech": "v.",
        "chinese": "损坏，破坏，糟蹋；宠坏，溺爱；（食物）变质 n. [pl.] 战利品，掠夺物，赃物",
        "example": ""
      },
      {
        "id": "word-19-60",
        "english": "blast*",
        "phonetic": "/blɑːst/",
        "partOfSpeech": "v.",
        "chinese": "爆破，炸毁 n. 一阵（大风）；冲击",
        "example": ""
      },
      {
        "id": "word-19-42",
        "english": "reluctant*",
        "phonetic": "/rɪˈlʌktənt/",
        "partOfSpeech": "a.",
        "chinese": "不情愿的，勉强的；难得到的，难处理的",
        "example": ""
      },
      {
        "id": "word-19-43",
        "english": "regularity*",
        "phonetic": "[ˌregjuˈlærəti]",
        "partOfSpeech": "n.",
        "chinese": "规律性，规则性；整齐，匀称",
        "example": ""
      },
      {
        "id": "word-20-49",
        "english": "derelict*",
        "phonetic": "/ˈderəlɪkt/",
        "partOfSpeech": "a.",
        "chinese": "被抛弃的；衰退的，破败的 n. 遗弃物；无家可归者，社会弃儿",
        "example": ""
      },
      {
        "id": "word-20-72",
        "english": "architect",
        "phonetic": "/ˈɑːkɪtekt/",
        "partOfSpeech": "n.",
        "chinese": "建筑师，设计师；创造者",
        "example": ""
      },
      {
        "id": "word-20-61",
        "english": "stationary",
        "phonetic": "/ˈsteɪʃənrɪ/",
        "partOfSpeech": "a.",
        "chinese": "静止的，不动的，固定的；稳定的",
        "example": ""
      },
      {
        "id": "word-20-74",
        "english": "tremendous",
        "phonetic": "/trɪˈmendəs/",
        "partOfSpeech": "a.",
        "chinese": "极大的，巨大的；非常的，惊人的",
        "example": ""
      },
      {
        "id": "word-20-38",
        "english": "goal*",
        "phonetic": "/gəul/",
        "partOfSpeech": "n.",
        "chinese": "球门；射门，进球得分；目标",
        "example": ""
      },
      {
        "id": "word-19-69",
        "english": "maintenance*",
        "phonetic": "/ˈmeɪntənəns/",
        "partOfSpeech": "n.",
        "chinese": "维持；保养；抚养费",
        "example": ""
      },
      {
        "id": "word-20-8",
        "english": "salinity*",
        "phonetic": "[sə'lɪnətɪ]",
        "partOfSpeech": "n.",
        "chinese": "盐分，盐度",
        "example": ""
      },
      {
        "id": "word-20-51",
        "english": "ornamental*",
        "phonetic": "[ˌɔ:nəˈmentl]",
        "partOfSpeech": "a.",
        "chinese": "装饰性的，装饰的",
        "example": ""
      },
      {
        "id": "word-19-18",
        "english": "recreate*",
        "phonetic": "[ˌri:krɪ'eɪt]",
        "partOfSpeech": "vt.",
        "chinese": "再现，再创造",
        "example": ""
      },
      {
        "id": "word-19-17",
        "english": "commentary*",
        "phonetic": "/ˈkɔməntrɪ/",
        "partOfSpeech": "n.",
        "chinese": "（尤指电台或电视台所作的）实况报道，现场解说；注释，解释；批评；评价",
        "example": ""
      },
      {
        "id": "word-20-42",
        "english": "thigh",
        "phonetic": "/θaɪ/",
        "partOfSpeech": "n.",
        "chinese": "大腿",
        "example": ""
      },
      {
        "id": "word-20-19",
        "english": "opulent*",
        "phonetic": "/ˈɔpjulənt/",
        "partOfSpeech": "a.",
        "chinese": "豪华的，华丽的，富裕的；丰富的，丰饶的",
        "example": ""
      },
      {
        "id": "word-20-24",
        "english": "govern",
        "phonetic": "/ˈgʌvn/",
        "partOfSpeech": "v.",
        "chinese": "统治，管理；控制，支配",
        "example": ""
      },
      {
        "id": "word-20-28",
        "english": "belt*",
        "phonetic": "/belt/",
        "partOfSpeech": "n.",
        "chinese": "腰带；地带",
        "example": ""
      },
      {
        "id": "word-19-70",
        "english": "spouse*",
        "phonetic": "/spauz/",
        "partOfSpeech": "n.",
        "chinese": "配偶",
        "example": ""
      },
      {
        "id": "word-20-13",
        "english": "bore*",
        "phonetic": "/bɔː(r)/",
        "partOfSpeech": "v.",
        "chinese": "使厌烦；钻孔 n. 令人讨厌的人（或事）",
        "example": ""
      },
      {
        "id": "word-20-40",
        "english": "stream*",
        "phonetic": "/striːm/",
        "partOfSpeech": "n.",
        "chinese": "溪流；一股 v. 流出",
        "example": ""
      },
      {
        "id": "word-19-52",
        "english": "structure*",
        "phonetic": "/ˈstrʌktʃə(r)/",
        "partOfSpeech": "n.",
        "chinese": "结构；构造；建筑物 vt. 系统安排；精心组织",
        "example": ""
      },
      {
        "id": "word-20-33",
        "english": "vacation",
        "phonetic": "/vəˈkeɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "假期；休假",
        "example": ""
      },
      {
        "id": "word-19-16",
        "english": "arcade*",
        "phonetic": "/ɑːˈkeɪd/",
        "partOfSpeech": "n.",
        "chinese": "拱廊，有拱廊的街道",
        "example": ""
      },
      {
        "id": "word-19-41",
        "english": "relevance*",
        "phonetic": "['reləvəns]",
        "partOfSpeech": "n.",
        "chinese": "中肯，适当；相关性",
        "example": ""
      },
      {
        "id": "word-20-18",
        "english": "dispiriting*",
        "phonetic": "[dɪˈspɪrɪtɪŋ]",
        "partOfSpeech": "a.",
        "chinese": "令人沮丧的，使人气馁的",
        "example": ""
      },
      {
        "id": "word-19-20",
        "english": "territory*",
        "phonetic": "/ˈterətrɪ/",
        "partOfSpeech": "n.",
        "chinese": "领土，版图；领域，范围",
        "example": ""
      },
      {
        "id": "word-20-41",
        "english": "urgent",
        "phonetic": "/ˈɜːdʒənt/",
        "partOfSpeech": "a.",
        "chinese": "紧急的，紧迫的；催促的，急切的",
        "example": ""
      },
      {
        "id": "word-20-11",
        "english": "previous*",
        "phonetic": "/ˈpriːvɪəs/",
        "partOfSpeech": "a.",
        "chinese": "以前的，在……之前的；早先的，稍前的",
        "example": ""
      },
      {
        "id": "word-19-53",
        "english": "quantity",
        "phonetic": "/ˈkwɔntətɪ/",
        "partOfSpeech": "n.",
        "chinese": "数量，数目；量；众多，大宗",
        "example": ""
      },
      {
        "id": "word-19-26",
        "english": "shatter",
        "phonetic": "/ˈʃætə(r)/",
        "partOfSpeech": "v.",
        "chinese": "（使）破碎，碎裂；给予极大打击",
        "example": ""
      },
      {
        "id": "word-20-7",
        "english": "profile*",
        "phonetic": "/ˈprəufaɪl/",
        "partOfSpeech": "n.",
        "chinese": "面部的侧影，侧面轮廓；传略，人物简介 vt. 扼要介绍；写传略（或简介）",
        "example": ""
      },
      {
        "id": "word-19-23",
        "english": "calendar*",
        "phonetic": "/ˈkælɪndə(r)/",
        "partOfSpeech": "n.",
        "chinese": "日历；月历；日程表",
        "example": ""
      },
      {
        "id": "word-20-63",
        "english": "crawl*",
        "phonetic": "/krɔːl/",
        "partOfSpeech": "vi.",
        "chinese": "爬，爬行；缓慢进行 n. 缓慢（或费力）的进行；自由泳",
        "example": ""
      },
      {
        "id": "word-19-59",
        "english": "develop*",
        "phonetic": "/dɪˈveləp/",
        "partOfSpeech": "v.",
        "chinese": "发展；生长，形成；开发",
        "example": ""
      },
      {
        "id": "word-20-6",
        "english": "robotic*",
        "phonetic": "[rəʊ'bɒtɪk]",
        "partOfSpeech": "a.",
        "chinese": "机器人的；像机器人的，呆板面机械的",
        "example": ""
      },
      {
        "id": "word-19-65",
        "english": "constitution*",
        "phonetic": "/ˏkɔnstɪˈtjuːʃn/",
        "partOfSpeech": "n.",
        "chinese": "宪法，章程；体质，体格；组成，形成",
        "example": ""
      },
      {
        "id": "word-20-26",
        "english": "charter",
        "phonetic": "/tʃɑːtə(r)/",
        "partOfSpeech": "n.",
        "chinese": "纲领，宣言；宪章；包租 vt. 包租（飞机，船等）；特许设立，给……发许可证，给予特权",
        "example": ""
      },
      {
        "id": "word-20-50",
        "english": "synchronise*",
        "phonetic": "/ˈsɪŋkrənaɪz/",
        "partOfSpeech": "v.",
        "chinese": "（使）同步发生，同速进行",
        "example": ""
      },
      {
        "id": "word-19-33",
        "english": "assignment*",
        "phonetic": "[əˈsaɪnmənt]",
        "partOfSpeech": "n.",
        "chinese": "任务，工作",
        "example": ""
      },
      {
        "id": "word-19-9",
        "english": "overrate*",
        "phonetic": "/ˏəuvəˈreɪt/",
        "partOfSpeech": "vt.",
        "chinese": "对……评价过高，高估",
        "example": ""
      },
      {
        "id": "word-19-6",
        "english": "toxic",
        "phonetic": "/ˈtɔksɪk/",
        "partOfSpeech": "a.",
        "chinese": "有毒的；中毒的",
        "example": ""
      },
      {
        "id": "word-20-67",
        "english": "camper*",
        "phonetic": "[ˈkæmpə(r)]",
        "partOfSpeech": "n.",
        "chinese": "露营者，宿营者",
        "example": ""
      },
      {
        "id": "word-20-34",
        "english": "skyscraper*",
        "phonetic": "['skaɪskreɪpə(r)]",
        "partOfSpeech": "n.",
        "chinese": "摩天楼",
        "example": ""
      },
      {
        "id": "word-20-52",
        "english": "estuary*",
        "phonetic": "/ˈestʃuərɪ/",
        "partOfSpeech": "n.",
        "chinese": "（江河入海口的）河口，河口湾",
        "example": ""
      },
      {
        "id": "word-20-15",
        "english": "county*",
        "phonetic": "/ˈkauntɪ/",
        "partOfSpeech": "n.",
        "chinese": "郡，县",
        "example": ""
      },
      {
        "id": "word-20-35",
        "english": "draft*",
        "phonetic": "/drɑːft/",
        "partOfSpeech": "n.",
        "chinese": "草稿，草案；汇票；征兵，服役；通风，气流 vt. 起草，草拟；选派，抽调；征募，征召……入伍",
        "example": ""
      },
      {
        "id": "word-20-31",
        "english": "diversify*",
        "phonetic": "/daɪˈvɜːsɪfaɪ/",
        "partOfSpeech": "v.",
        "chinese": "（使）多样化",
        "example": ""
      },
      {
        "id": "word-19-28",
        "english": "discount*",
        "phonetic": "/ˈdɪskaunt/",
        "partOfSpeech": "n.",
        "chinese": "（价格、债款等）折扣 /dɪsˈkaunt/ vt. 给……打折；漠视，低估",
        "example": ""
      },
      {
        "id": "word-20-29",
        "english": "relay",
        "phonetic": "/ˈriːleɪ/",
        "partOfSpeech": "n.",
        "chinese": "接力赛；中继设备 /ˈriːleɪ; rɪˈleɪ/ vt. 传送；转播",
        "example": ""
      },
      {
        "id": "word-19-56",
        "english": "acknowledge",
        "phonetic": "/əkˈnɔlɪdʒ/",
        "partOfSpeech": "v.",
        "chinese": "承认，确认；致意；感谢",
        "example": ""
      },
      {
        "id": "word-19-32",
        "english": "pension",
        "phonetic": "/ˈpenʃn/",
        "partOfSpeech": "n.",
        "chinese": "养老金，抚恤金；年金",
        "example": ""
      },
      {
        "id": "word-19-29",
        "english": "tough*",
        "phonetic": "/tʌf/",
        "partOfSpeech": "a.",
        "chinese": "难对付的；健壮的；（肉等食物）老的",
        "example": ""
      },
      {
        "id": "word-19-46",
        "english": "trek*",
        "phonetic": "/trek/",
        "partOfSpeech": "vi./n.",
        "chinese": "牛拉车；艰苦跋涉",
        "example": ""
      },
      {
        "id": "word-19-68",
        "english": "advocate",
        "phonetic": "/ˈædvəkeɪt/",
        "partOfSpeech": "vt.",
        "chinese": "拥护，支持；提倡 /ˈædvəkət/ n. 拥护者，支持者；提倡者",
        "example": ""
      },
      {
        "id": "word-20-71",
        "english": "patent",
        "phonetic": "/ˈpætnt;",
        "partOfSpeech": "",
        "chinese": "ˈpeɪtnt/ vt. 取得专利权 n. 专利（权） /ˈpeɪtnt/ a. 显而易见的；有专利的，受专利保护的",
        "example": ""
      },
      {
        "id": "word-20-54",
        "english": "cascade*",
        "phonetic": "/kæˈskeɪd/",
        "partOfSpeech": "n.",
        "chinese": "小瀑布",
        "example": ""
      },
      {
        "id": "word-19-48",
        "english": "itinerary",
        "phonetic": "/aɪˈtɪnərərɪ/",
        "partOfSpeech": "n.",
        "chinese": "行程表；旅行路线，旅行计划",
        "example": ""
      },
      {
        "id": "word-19-57",
        "english": "liquor",
        "phonetic": "/ˈlɪkə(r)/",
        "partOfSpeech": "v.",
        "chinese": "烈性酒；含酒精饮料",
        "example": ""
      },
      {
        "id": "word-20-21",
        "english": "dispense*",
        "phonetic": "/dɪˈspens/",
        "partOfSpeech": "vt.",
        "chinese": "分发，分配；提供",
        "example": ""
      },
      {
        "id": "word-20-20",
        "english": "plush*",
        "phonetic": "/plʌʃ/",
        "partOfSpeech": "a.",
        "chinese": "豪华的，舒适的 n. 长毛绒",
        "example": ""
      },
      {
        "id": "word-19-39",
        "english": "terminal",
        "phonetic": "/ˈtɜːmɪnl/",
        "partOfSpeech": "n.",
        "chinese": "终点，终端；终点站，航站楼 a. 末端的",
        "example": ""
      },
      {
        "id": "word-19-45",
        "english": "predominant*",
        "phonetic": "/prɪˈdɔmɪnənt/",
        "partOfSpeech": "a.",
        "chinese": "卓越的，突出的；支配的，主要的，盛行的",
        "example": ""
      },
      {
        "id": "word-20-22",
        "english": "behalf",
        "phonetic": "/bɪˈhɑːf/",
        "partOfSpeech": "n.",
        "chinese": "利益；代表",
        "example": ""
      },
      {
        "id": "word-19-27",
        "english": "truce",
        "phonetic": "/truːs/",
        "partOfSpeech": "n.",
        "chinese": "休战（协定）",
        "example": ""
      },
      {
        "id": "word-20-57",
        "english": "commence*",
        "phonetic": "/kəˈmens/",
        "partOfSpeech": "v.",
        "chinese": "开始，着手",
        "example": ""
      },
      {
        "id": "word-19-63",
        "english": "sporadically*",
        "phonetic": "[spə'rædɪklɪ]",
        "partOfSpeech": "ad.",
        "chinese": "偶发地；零星地",
        "example": ""
      },
      {
        "id": "word-20-23",
        "english": "initial",
        "phonetic": "/ɪˈnɪʃl/",
        "partOfSpeech": "a.",
        "chinese": "最初的，开始的；词首的 n. 词首大写字母",
        "example": ""
      },
      {
        "id": "word-20-5",
        "english": "culminate*",
        "phonetic": "/ˈkʌlmɪneɪt/",
        "partOfSpeech": "vi.",
        "chinese": "（以某种结果）告终；（在某一点）结束",
        "example": ""
      },
      {
        "id": "word-20-70",
        "english": "motivate",
        "phonetic": "/ˈməutɪveɪt/",
        "partOfSpeech": "vt.",
        "chinese": "使有动机；激励，激发",
        "example": ""
      },
      {
        "id": "word-19-55",
        "english": "intensive",
        "phonetic": "/ɪnˈtensɪv/",
        "partOfSpeech": "a.",
        "chinese": "加强的；密集的",
        "example": ""
      },
      {
        "id": "word-19-21",
        "english": "prohibit*",
        "phonetic": "/prəˈhɪbɪt/",
        "partOfSpeech": "v.",
        "chinese": "禁止，阻止",
        "example": ""
      },
      {
        "id": "word-20-9",
        "english": "aggravation",
        "phonetic": "[ˌæɡrə'veɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "加重；恶化；愤怒，恼怒",
        "example": ""
      },
      {
        "id": "word-19-22",
        "english": "shipment",
        "phonetic": "[ˈʃɪpmənt]",
        "partOfSpeech": "n.",
        "chinese": "装运，运输；装载（或运输）的货物，装货量",
        "example": ""
      },
      {
        "id": "word-19-36",
        "english": "microbiology*",
        "phonetic": "[ˌmaɪkrəʊbaɪˈɒlədʒi]",
        "partOfSpeech": "n.",
        "chinese": "微生物学",
        "example": ""
      },
      {
        "id": "word-19-25",
        "english": "slip*",
        "phonetic": "/slɪp/",
        "partOfSpeech": "v.",
        "chinese": "滑到，失足；减退；摆脱，闪开；塞入 n. 差错，疏漏；滑到；纸片",
        "example": ""
      },
      {
        "id": "word-19-38",
        "english": "hallowed",
        "phonetic": "[ˈhæləʊd]",
        "partOfSpeech": "a.",
        "chinese": "受崇敬的；神圣（化）的",
        "example": ""
      },
      {
        "id": "word-19-4",
        "english": "simultaneous",
        "phonetic": "/ˏsɪmlˈteɪnɪəs/",
        "partOfSpeech": "a.",
        "chinese": "同时的，同时发生的，同时存在的；同步的",
        "example": ""
      },
      {
        "id": "word-19-8",
        "english": "conformity*",
        "phonetic": "[kən'fɔ:mɪtɪ]",
        "partOfSpeech": "n.",
        "chinese": "符合，一致",
        "example": ""
      },
      {
        "id": "word-20-12",
        "english": "spice",
        "phonetic": "/spaɪs/",
        "partOfSpeech": "n.",
        "chinese": "香料，调味品 vt. 使增添趣味；往……加香料",
        "example": ""
      },
      {
        "id": "word-20-58",
        "english": "initiative",
        "phonetic": "/ɪˈnɪʃətɪv/",
        "partOfSpeech": "n.",
        "chinese": "倡议，新方案；主动性，积极性；主动权",
        "example": ""
      },
      {
        "id": "word-20-73",
        "english": "symptom",
        "phonetic": "/ˈsɪmptəm/",
        "partOfSpeech": "n.",
        "chinese": "症状；征候，征兆",
        "example": ""
      },
      {
        "id": "word-20-30",
        "english": "crockery",
        "phonetic": "/ˈkrɔkərɪ/",
        "partOfSpeech": "n.",
        "chinese": "陶器；瓦器",
        "example": ""
      },
      {
        "id": "word-20-4",
        "english": "retain*",
        "phonetic": "/rɪˈteɪn/",
        "partOfSpeech": "vt.",
        "chinese": "保留；保持",
        "example": ""
      },
      {
        "id": "word-20-69",
        "english": "rim",
        "phonetic": "/rɪm/",
        "partOfSpeech": "n.",
        "chinese": "（圆形物体的）边，缘",
        "example": ""
      },
      {
        "id": "word-19-31",
        "english": "eruption",
        "phonetic": "[ɪ'rʌpʃn]",
        "partOfSpeech": "n.",
        "chinese": "（火山、战争等）爆发；（疾病）发作",
        "example": ""
      },
      {
        "id": "word-19-15",
        "english": "invade*",
        "phonetic": "/ɪnˈveɪd/",
        "partOfSpeech": "v.",
        "chinese": "侵犯，侵入，侵略，侵袭",
        "example": ""
      },
      {
        "id": "word-19-37",
        "english": "stainless",
        "phonetic": "['steɪnlɪs]",
        "partOfSpeech": "a.",
        "chinese": "不锈的；无污点的，无瑕疵的",
        "example": ""
      },
      {
        "id": "word-20-3",
        "english": "preface",
        "phonetic": "/ˈprefɪs/",
        "partOfSpeech": "n.",
        "chinese": "序言，引言 vt. 为……写序言；以……为开端",
        "example": ""
      },
      {
        "id": "word-19-2",
        "english": "assumption",
        "phonetic": "/əˈsʌmpʃn/",
        "partOfSpeech": "n.",
        "chinese": "假定，假设；担任，承担",
        "example": ""
      },
      {
        "id": "word-20-59",
        "english": "track*",
        "phonetic": "/træk/",
        "partOfSpeech": "n.",
        "chinese": "小路；跑道 v. 跟踪，追踪",
        "example": ""
      },
      {
        "id": "word-19-10",
        "english": "dormant",
        "phonetic": "/ˈdɔːmənt/",
        "partOfSpeech": "a.",
        "chinese": "休眠的；静止的；隐匿的",
        "example": ""
      },
      {
        "id": "word-20-16",
        "english": "betray*",
        "phonetic": "/bɪˈtreɪ/",
        "partOfSpeech": "vt.",
        "chinese": "出卖，泄露（秘密等）；辜负；流露情感",
        "example": ""
      },
      {
        "id": "word-20-68",
        "english": "attend*",
        "phonetic": "/əˈtend/",
        "partOfSpeech": "v.",
        "chinese": "出席，参加；随同，陪同；专心，注意",
        "example": ""
      },
      {
        "id": "word-20-2",
        "english": "skim",
        "phonetic": "/skɪm/",
        "partOfSpeech": "v.",
        "chinese": "撇去；掠过，擦过；浏览，略读",
        "example": ""
      },
      {
        "id": "word-19-34",
        "english": "assign*",
        "phonetic": "/əˈsaɪn/",
        "partOfSpeech": "vt.",
        "chinese": "指派，分配；指定",
        "example": ""
      },
      {
        "id": "word-19-19",
        "english": "mock*",
        "phonetic": "/mɔk/",
        "partOfSpeech": "a.",
        "chinese": "假的；模拟的 n. 嘲弄；模仿，仿制品 v. 嘲笑，嘲弄",
        "example": ""
      },
      {
        "id": "word-19-73",
        "english": "incendiary*",
        "phonetic": "/ɪnˈsendɪərɪ/",
        "partOfSpeech": "a.",
        "chinese": "放火的，能引起燃烧的；煽动性的",
        "example": ""
      },
      {
        "id": "word-20-25",
        "english": "mingle",
        "phonetic": "/ˈmɪŋgl/",
        "partOfSpeech": "v.",
        "chinese": "（使）混合，（使）联结；相往来；混杂其中",
        "example": ""
      },
      {
        "id": "word-19-1",
        "english": "texture",
        "phonetic": "/ˈtekstʃə(r)/",
        "partOfSpeech": "n.",
        "chinese": "质地，纹理；口感",
        "example": ""
      },
      {
        "id": "word-20-66",
        "english": "flask",
        "phonetic": "/flɑːsk/",
        "partOfSpeech": "n.",
        "chinese": "长颈瓶；烧瓶",
        "example": ""
      },
      {
        "id": "word-19-35",
        "english": "concert",
        "phonetic": "/ˈkɔnsət/",
        "partOfSpeech": "n.",
        "chinese": "音乐会，演奏会",
        "example": ""
      },
      {
        "id": "word-20-10",
        "english": "incident",
        "phonetic": "/ˈɪnsɪdənt/",
        "partOfSpeech": "n.",
        "chinese": "发生的事；事件，事变",
        "example": ""
      },
      {
        "id": "word-19-13",
        "english": "engrave*",
        "phonetic": "/ɪnˈgreɪv/",
        "partOfSpeech": "vt.",
        "chinese": "（在……上）雕刻；（使）铭记",
        "example": ""
      },
      {
        "id": "word-19-24",
        "english": "magic",
        "phonetic": "/ˈmædʒɪk/",
        "partOfSpeech": "n.",
        "chinese": "魔法，法术；魅力，魔力 a. 有魔力的，神奇的",
        "example": ""
      },
      {
        "id": "word-20-37",
        "english": "promising",
        "phonetic": "['prɒmɪsɪŋ]",
        "partOfSpeech": "a.",
        "chinese": "有希望的；有前途的",
        "example": ""
      },
      {
        "id": "word-19-71",
        "english": "furnace",
        "phonetic": "/ˈfɜːnɪs/",
        "partOfSpeech": "n.",
        "chinese": "熔炉",
        "example": ""
      },
      {
        "id": "word-19-54",
        "english": "integral",
        "phonetic": "/ˈɪntɪgrəl/",
        "partOfSpeech": "a.",
        "chinese": "不可或缺的，构成整体所必需的；完整的，完备的",
        "example": ""
      },
      {
        "id": "word-20-14",
        "english": "lull",
        "phonetic": "/lʌl/",
        "partOfSpeech": "n.",
        "chinese": "间歇，暂停；平静期",
        "example": ""
      },
      {
        "id": "word-19-74",
        "english": "expansion",
        "phonetic": "/ɪkˈspænʃn/",
        "partOfSpeech": "n.",
        "chinese": "扩大，扩张",
        "example": ""
      },
      {
        "id": "word-20-47",
        "english": "veterinarian*",
        "phonetic": "[ˌvetərɪˈneəriən]",
        "partOfSpeech": "n.",
        "chinese": "兽医",
        "example": ""
      },
      {
        "id": "word-19-64",
        "english": "imitate",
        "phonetic": "/ˈɪmɪteɪt/",
        "partOfSpeech": "vt.",
        "chinese": "模仿，模拟；仿效",
        "example": ""
      },
      {
        "id": "word-19-47",
        "english": "daunt*",
        "phonetic": "/dɔːnt/",
        "partOfSpeech": "vt.",
        "chinese": "使气馁，使胆怯",
        "example": ""
      },
      {
        "id": "word-20-27",
        "english": "formidable*",
        "phonetic": "/ˈfɔːmɪdəbl/",
        "partOfSpeech": "a.",
        "chinese": "可怕的；难以应付的，难以克服的",
        "example": ""
      },
      {
        "id": "word-20-1",
        "english": "postpone",
        "phonetic": "/pəˈspəun/",
        "partOfSpeech": "v.",
        "chinese": "延迟，延期",
        "example": ""
      },
      {
        "id": "word-19-40",
        "english": "climate*",
        "phonetic": "/ˈklaɪmɪt/",
        "partOfSpeech": "n.",
        "chinese": "气候；风气，思潮",
        "example": ""
      },
      {
        "id": "word-19-61",
        "english": "pudding",
        "phonetic": "/ˈpudɪŋ/",
        "partOfSpeech": "n.",
        "chinese": "布丁",
        "example": ""
      },
      {
        "id": "word-19-72",
        "english": "expedition",
        "phonetic": "/ˏekspɪˈdɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "远征，探险，考察；（短途的）旅行，出行；远征队，探险队，考察队",
        "example": ""
      },
      {
        "id": "word-19-76",
        "english": "invalid",
        "phonetic": "/ɪnˈvælɪd/",
        "partOfSpeech": "a.",
        "chinese": "（指法律上）无效的，作废的；无可靠根据的，站不住脚的；有病的，伤残的 /ˈɪnvəlɪd/ n. （需要有人照顾的）病弱者，残疾者",
        "example": ""
      },
      {
        "id": "word-20-55",
        "english": "irritate*",
        "phonetic": "/ˈɪrɪteɪt/",
        "partOfSpeech": "vt.",
        "chinese": "使烦躁；使疼痛；刺激",
        "example": ""
      },
      {
        "id": "word-19-44",
        "english": "laterality*",
        "phonetic": "[ˌlætə'rælɪtɪ]",
        "partOfSpeech": "n.",
        "chinese": "对一侧面的偏重，偏向一侧状态",
        "example": ""
      },
      {
        "id": "word-20-62",
        "english": "superficial",
        "phonetic": "/ˏsuːpəˈfɪʃl/",
        "partOfSpeech": "a.",
        "chinese": "表面的；肤浅的",
        "example": ""
      },
      {
        "id": "word-20-32",
        "english": "threshold",
        "phonetic": "/ˈθreʃhəuld/",
        "partOfSpeech": "n.",
        "chinese": "入门，门槛；界限；开端，起点",
        "example": ""
      },
      {
        "id": "word-19-51",
        "english": "forthcoming",
        "phonetic": "/ˏfɔːθˈkʌmɪŋ/",
        "partOfSpeech": "a.",
        "chinese": "即将到来的",
        "example": ""
      },
      {
        "id": "word-20-45",
        "english": "entrust*",
        "phonetic": "/ɪnˈtrʌst/",
        "partOfSpeech": "vt.",
        "chinese": "委托，交付，托付",
        "example": ""
      },
      {
        "id": "word-20-53",
        "english": "leaflet",
        "phonetic": "/ˈliːflɪt/",
        "partOfSpeech": "n.",
        "chinese": "传单，散页印刷品；小册子 v. 散发传单（或小册子）",
        "example": ""
      },
      {
        "id": "word-20-36",
        "english": "deter*",
        "phonetic": "/dɪˈtɜː(r)/",
        "partOfSpeech": "v.",
        "chinese": "威慑，吓住，（使）断念",
        "example": ""
      },
      {
        "id": "word-20-64",
        "english": "rotate",
        "phonetic": "/rəuˈteɪt/",
        "partOfSpeech": "v.",
        "chinese": "（使）旋转，转动；轮流，轮换",
        "example": ""
      },
      {
        "id": "word-19-49",
        "english": "acclimatise*",
        "phonetic": "/əˈklaɪmətaɪz/",
        "partOfSpeech": "v.",
        "chinese": "（使……）服水土；（使……）适应新环境",
        "example": ""
      },
      {
        "id": "word-20-43",
        "english": "maximise*",
        "phonetic": "/ˈmæksɪmaɪz/",
        "partOfSpeech": "vt.",
        "chinese": "使增加到最大限度，最佳化；充分利用",
        "example": ""
      },
      {
        "id": "word-19-77",
        "english": "unbiased*",
        "phonetic": "[ʌnˈbaɪəst]",
        "partOfSpeech": "a.",
        "chinese": "公正的，没有偏见的",
        "example": ""
      },
      {
        "id": "word-20-48",
        "english": "demolition*",
        "phonetic": "[ˌdemə'lɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "拆除；破坏，毁坏",
        "example": ""
      },
      {
        "id": "word-19-12",
        "english": "embrace",
        "phonetic": "/ɪmˈbreɪs/",
        "partOfSpeech": "v./n.",
        "chinese": "拥抱；包括；欣然接受",
        "example": ""
      },
      {
        "id": "word-19-67",
        "english": "modem*",
        "phonetic": "/ˈməudem/",
        "partOfSpeech": "n.",
        "chinese": "调制解调器",
        "example": ""
      },
      {
        "id": "word-20-46",
        "english": "pamper*",
        "phonetic": "/ˈpæmpə(r)/",
        "partOfSpeech": "vt.",
        "chinese": "纵容，娇惯；精心护理",
        "example": ""
      }
    ],
    "article": "In the field of Educational Research, researchers have been studying various phenomena to understand their implications. The concept of underlying* has been widely discussed in recent studies. The concept of sundial has been widely discussed in recent studies. The concept of greatly* has been widely discussed in recent studies. The concept of volunteer* has been widely discussed in recent studies. The concept of meadow has been widely discussed in recent studies. The concept of presence* has been widely discussed in recent studies. The concept of dissatisfied* has been widely discussed in recent studies. The concept of disrespectful* has been widely discussed in recent studies. The concept of utilise* has been widely discussed in recent studies. The concept of displace has been widely discussed in recent studies. Researchers have found that these factors play a significant role in shaping our understanding of the subject. Further studies are needed to explore the full implications of these findings."
  },
  {
    "id": "unit-11",
    "name": "Unit 11: Word Lists 21 & 22",
    "words": [
      {
        "id": "word-22-56",
        "english": "democratic*",
        "phonetic": "/ˏdeməˈkrætɪk/",
        "partOfSpeech": "a.",
        "chinese": "民主的，有民主精神的",
        "example": ""
      },
      {
        "id": "word-21-51",
        "english": "geometry",
        "phonetic": "/dʒɪˈɔmətrɪ/",
        "partOfSpeech": "n.",
        "chinese": "几何；几何学",
        "example": ""
      },
      {
        "id": "word-21-49",
        "english": "swallow",
        "phonetic": "/ˈswɔləu/",
        "partOfSpeech": "v.",
        "chinese": "吞咽；忍受 n. 燕子",
        "example": ""
      },
      {
        "id": "word-21-42",
        "english": "commission",
        "phonetic": "/kəˈmɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "委托；佣金 v. 授权，委托",
        "example": ""
      },
      {
        "id": "word-21-56",
        "english": "correspond*",
        "phonetic": "/ˏkɔrɪˈspɔnd/",
        "partOfSpeech": "vi.",
        "chinese": "相一致，符合；通信；相当于，相应",
        "example": ""
      },
      {
        "id": "word-21-8",
        "english": "misconception",
        "phonetic": "[ˌmɪskənˈsepʃn]",
        "partOfSpeech": "n.",
        "chinese": "误解，错误想法",
        "example": ""
      },
      {
        "id": "word-21-7",
        "english": "spoilage*",
        "phonetic": "[ˈspɔɪlɪdʒ]",
        "partOfSpeech": "n.",
        "chinese": "变质；损坏",
        "example": ""
      },
      {
        "id": "word-21-4",
        "english": "envisage",
        "phonetic": "/ɪnˈvɪzɪdʒ/",
        "partOfSpeech": "vt.",
        "chinese": "展望，想象；面对",
        "example": ""
      },
      {
        "id": "word-21-15",
        "english": "immense*",
        "phonetic": "/ɪˈmens/",
        "partOfSpeech": "a.",
        "chinese": "巨大的，广大的",
        "example": ""
      },
      {
        "id": "word-22-5",
        "english": "plastic*",
        "phonetic": "/ˈplæstɪk/",
        "partOfSpeech": "a.",
        "chinese": "塑料（制）的",
        "example": ""
      },
      {
        "id": "word-22-24",
        "english": "speculation",
        "phonetic": "/ˏspekjuˈleɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "推测，思索；投机活动，投机买卖",
        "example": ""
      },
      {
        "id": "word-21-63",
        "english": "survive*",
        "phonetic": "/səˈvaɪv/",
        "partOfSpeech": "v.",
        "chinese": "活下来；幸免于；比……活得长，比……长命",
        "example": ""
      },
      {
        "id": "word-21-30",
        "english": "insist*",
        "phonetic": "/ɪnˈsɪst/",
        "partOfSpeech": "v.",
        "chinese": "坚持，坚决认为；一定要",
        "example": ""
      },
      {
        "id": "word-22-7",
        "english": "supervise",
        "phonetic": "/ˈsuːpəvaɪz/",
        "partOfSpeech": "vt.",
        "chinese": "监督，管理；指导",
        "example": ""
      },
      {
        "id": "word-22-28",
        "english": "metaphorical",
        "phonetic": "[ˌmetəˈfɒrɪkl]",
        "partOfSpeech": "a.",
        "chinese": "隐喻的",
        "example": ""
      },
      {
        "id": "word-22-18",
        "english": "stereoscopic",
        "phonetic": "[ˌsteriəˈskɒpɪk]",
        "partOfSpeech": "a.",
        "chinese": "有立体视觉的；有立体效果的",
        "example": ""
      },
      {
        "id": "word-21-50",
        "english": "hasty",
        "phonetic": "/ˈheɪstɪ/",
        "partOfSpeech": "a.",
        "chinese": "草率的，匆忙的",
        "example": ""
      },
      {
        "id": "word-21-20",
        "english": "thesis*",
        "phonetic": "/ˈθiːsɪs/",
        "partOfSpeech": "n.",
        "chinese": "论文",
        "example": ""
      },
      {
        "id": "word-21-38",
        "english": "incompatible",
        "phonetic": "/ˏɪŋkəmˈpætəbl/",
        "partOfSpeech": "a.",
        "chinese": "不兼容的，不能和谐共存的，不协调的，合不来的",
        "example": ""
      },
      {
        "id": "word-21-23",
        "english": "flicker",
        "phonetic": "/ˈflɪkə(r)/",
        "partOfSpeech": "n./vi.",
        "chinese": "闪烁；一闪而过",
        "example": ""
      },
      {
        "id": "word-22-47",
        "english": "discriminate",
        "phonetic": "/dɪˈskrɪmɪneɪt/",
        "partOfSpeech": "v.",
        "chinese": "区别；歧视",
        "example": ""
      },
      {
        "id": "word-22-23",
        "english": "monotonous",
        "phonetic": "/məˈnɔtənəs/",
        "partOfSpeech": "a.",
        "chinese": "单调的，无聊的",
        "example": ""
      },
      {
        "id": "word-21-75",
        "english": "historian",
        "phonetic": "/hɪˈstɔːrɪən/",
        "partOfSpeech": "n.",
        "chinese": "历史学家，历史学工作者",
        "example": ""
      },
      {
        "id": "word-22-11",
        "english": "sole",
        "phonetic": "/səul/",
        "partOfSpeech": "a.",
        "chinese": "唯一的，独有的 n. 鞋底，袜底；脚底",
        "example": ""
      },
      {
        "id": "word-21-52",
        "english": "stuff",
        "phonetic": "/stʌf/",
        "partOfSpeech": "n.",
        "chinese": "原料，材料 vt. 填进；让……吃饱",
        "example": ""
      },
      {
        "id": "word-21-28",
        "english": "mess",
        "phonetic": "/mes/",
        "partOfSpeech": "n.",
        "chinese": "凌乱 v. 弄糟，搞乱",
        "example": ""
      },
      {
        "id": "word-22-36",
        "english": "expose*",
        "phonetic": "/ɪkˈspəuz/",
        "partOfSpeech": "vt.",
        "chinese": "使暴露，揭露",
        "example": ""
      },
      {
        "id": "word-21-13",
        "english": "robust",
        "phonetic": "/rəuˈbʌst/",
        "partOfSpeech": "a.",
        "chinese": "健壮的，强壮的；坚定的",
        "example": ""
      },
      {
        "id": "word-22-35",
        "english": "and",
        "phonetic": "",
        "partOfSpeech": "",
        "chinese": "so forth* 等等",
        "example": ""
      },
      {
        "id": "word-22-29",
        "english": "interpret",
        "phonetic": "/ɪnˈtɜːprɪt/",
        "partOfSpeech": "v.",
        "chinese": "解释，说明；口译，翻译",
        "example": ""
      },
      {
        "id": "word-21-71",
        "english": "brew*",
        "phonetic": "/bruː/",
        "partOfSpeech": "v.",
        "chinese": "酿造；冲泡；酝酿",
        "example": ""
      },
      {
        "id": "word-22-12",
        "english": "decade*",
        "phonetic": "/ˈdekeɪd/",
        "partOfSpeech": "n.",
        "chinese": "十年，十年期",
        "example": ""
      },
      {
        "id": "word-21-41",
        "english": "terrestrial",
        "phonetic": "/təˈrestrɪəl/",
        "partOfSpeech": "a.",
        "chinese": "陆地的，陆生的，陆栖的；地球的",
        "example": ""
      },
      {
        "id": "word-21-34",
        "english": "indigenous",
        "phonetic": "/ɪnˈdɪdʒɪnəs/",
        "partOfSpeech": "a.",
        "chinese": "土产的，本地的，本土的",
        "example": ""
      },
      {
        "id": "word-21-53",
        "english": "landward*",
        "phonetic": "[ˈlændwəd]",
        "partOfSpeech": "a./ad.",
        "chinese": "向陆的/地，近陆的/地",
        "example": ""
      },
      {
        "id": "word-22-40",
        "english": "abstraction",
        "phonetic": "[æbˈstrækʃn]",
        "partOfSpeech": "n.",
        "chinese": "抽象",
        "example": ""
      },
      {
        "id": "word-22-25",
        "english": "resemble",
        "phonetic": "/rɪˈzembl/",
        "partOfSpeech": "vt.",
        "chinese": "与……相似，像",
        "example": ""
      },
      {
        "id": "word-21-1",
        "english": "in",
        "phonetic": "",
        "partOfSpeech": "",
        "chinese": "accordance with* 按照，依据",
        "example": ""
      },
      {
        "id": "word-22-64",
        "english": "gravity",
        "phonetic": "/ˈgrævətɪ/",
        "partOfSpeech": "n.",
        "chinese": "重力",
        "example": ""
      },
      {
        "id": "word-22-65",
        "english": "cap*",
        "phonetic": "/kæp/",
        "partOfSpeech": "vt.",
        "chinese": "盖在……上面 n. 帽子",
        "example": ""
      },
      {
        "id": "word-22-37",
        "english": "sponge",
        "phonetic": "/spʌndʒ/",
        "partOfSpeech": "n.",
        "chinese": "海绵 v. 用湿海绵（或布）擦，揩",
        "example": ""
      },
      {
        "id": "word-21-22",
        "english": "sceptical*",
        "phonetic": "[ˈskeptɪkl]",
        "partOfSpeech": "a.",
        "chinese": "怀疑的，猜疑的",
        "example": ""
      },
      {
        "id": "word-21-60",
        "english": "comedy*",
        "phonetic": "/ˈkɔmədɪ/",
        "partOfSpeech": "n.",
        "chinese": "喜剧；喜剧性（事件）",
        "example": ""
      },
      {
        "id": "word-21-26",
        "english": "primary",
        "phonetic": "/ˈpraɪmərɪ/",
        "partOfSpeech": "a.",
        "chinese": "最初的，初级的；首要的，基本的",
        "example": ""
      },
      {
        "id": "word-22-69",
        "english": "inclination",
        "phonetic": "/ˏɪŋklɪˈneɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "爱好；趋势；倾斜",
        "example": ""
      },
      {
        "id": "word-21-24",
        "english": "cord*",
        "phonetic": "/kɔːd/",
        "partOfSpeech": "n.",
        "chinese": "线；带",
        "example": ""
      },
      {
        "id": "word-21-6",
        "english": "glutamate*",
        "phonetic": "['glu:təˌmeɪt]",
        "partOfSpeech": "n.",
        "chinese": "谷氨酸；谷酸盐",
        "example": ""
      },
      {
        "id": "word-22-49",
        "english": "authority*",
        "phonetic": "/ɔːˈθɔrətɪ/",
        "partOfSpeech": "n.",
        "chinese": "权力，管辖权； [pl.] 官方，当局；权威，专家",
        "example": ""
      },
      {
        "id": "word-21-76",
        "english": "fancy",
        "phonetic": "/ˈfænsɪ/",
        "partOfSpeech": "a.",
        "chinese": "别致的 vt. 想象 n. 想象力",
        "example": ""
      },
      {
        "id": "word-22-21",
        "english": "turbid",
        "phonetic": "/ˈtɜːbɪd/",
        "partOfSpeech": "a.",
        "chinese": "混浊的；紊乱的",
        "example": ""
      },
      {
        "id": "word-22-53",
        "english": "circus*",
        "phonetic": "/ˈsɜːkəs/",
        "partOfSpeech": "n.",
        "chinese": "马戏团；环形广场",
        "example": ""
      },
      {
        "id": "word-21-3",
        "english": "welfare",
        "phonetic": "/ˈwelfeə(r)/",
        "partOfSpeech": "n.",
        "chinese": "福利",
        "example": ""
      },
      {
        "id": "word-21-72",
        "english": "sacrifice",
        "phonetic": "/ˈsækrɪfaɪs/",
        "partOfSpeech": "n.",
        "chinese": "牺牲，牺牲品；献祭，供奉；祭品，供物 v. 牺牲，献祭",
        "example": ""
      },
      {
        "id": "word-22-3",
        "english": "clumsy",
        "phonetic": "/ˈklʌmzɪ/",
        "partOfSpeech": "a.",
        "chinese": "笨拙的；不得体的",
        "example": ""
      },
      {
        "id": "word-21-25",
        "english": "lower*",
        "phonetic": "/ˈləuə(r)/",
        "partOfSpeech": "a.",
        "chinese": "较低的；下面的 v. 降低，减少",
        "example": ""
      },
      {
        "id": "word-21-29",
        "english": "design",
        "phonetic": "/dɪˈzaɪn/",
        "partOfSpeech": "n.",
        "chinese": "设计，构想；图样，图案；企图，图谋 v. 设计；谋划，构思",
        "example": ""
      },
      {
        "id": "word-21-37",
        "english": "personalize",
        "phonetic": "/ˈpɜːsənəlaɪz/",
        "partOfSpeech": "vt.",
        "chinese": "使成为私人的；在（物品）上标出主人姓名（或记号）；个人化",
        "example": ""
      },
      {
        "id": "word-21-27",
        "english": "coincide",
        "phonetic": "/ˏkəuɪnˈsaɪd/",
        "partOfSpeech": "vi.",
        "chinese": "同时发生；一致",
        "example": ""
      },
      {
        "id": "word-22-68",
        "english": "separate",
        "phonetic": "/ˈsepəreɪt/",
        "partOfSpeech": "v.",
        "chinese": "使分离，使分开；划分，区分；分离，分开；分居 /ˈseprət/ a. 分离的，分开的；不同的，特别的",
        "example": ""
      },
      {
        "id": "word-22-63",
        "english": "bizarre",
        "phonetic": "/bɪˈzɑː(r)/",
        "partOfSpeech": "a.",
        "chinese": "奇形怪状的；怪诞的",
        "example": ""
      },
      {
        "id": "word-21-39",
        "english": "predominate",
        "phonetic": "/prɪˈdɔmɪneɪt/",
        "partOfSpeech": "vi.",
        "chinese": "统治，支配；（数量、力量上）占优势",
        "example": ""
      },
      {
        "id": "word-21-19",
        "english": "intense",
        "phonetic": "/ɪnˈtens/",
        "partOfSpeech": "a.",
        "chinese": "强烈的，剧烈的；紧张的；热情的，热切的",
        "example": ""
      },
      {
        "id": "word-21-11",
        "english": "modification",
        "phonetic": "[ˌmɒdɪfɪˈkeɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "修改，改正",
        "example": ""
      },
      {
        "id": "word-21-5",
        "english": "binoculars*",
        "phonetic": "/bɪˈnɔkjuləz/",
        "partOfSpeech": "n.",
        "chinese": "双筒望远镜",
        "example": ""
      },
      {
        "id": "word-21-47",
        "english": "curly",
        "phonetic": "['kɜ:lɪ]",
        "partOfSpeech": "a.",
        "chinese": "卷曲的，波浪式的",
        "example": ""
      },
      {
        "id": "word-22-34",
        "english": "distort",
        "phonetic": "/dɪˈstɔːt/",
        "partOfSpeech": "vt.",
        "chinese": "扭曲；曲解；变形",
        "example": ""
      },
      {
        "id": "word-21-16",
        "english": "pull",
        "phonetic": "",
        "partOfSpeech": "",
        "chinese": "up stakes* 离开，搬家",
        "example": ""
      },
      {
        "id": "word-22-59",
        "english": "cucumber",
        "phonetic": "/ˈkjuːkʌmbə(r)/",
        "partOfSpeech": "n.",
        "chinese": "黄瓜",
        "example": ""
      },
      {
        "id": "word-22-66",
        "english": "external*",
        "phonetic": "/ɪkˈstɜːnl/",
        "partOfSpeech": "a.",
        "chinese": "外面的，表面的",
        "example": ""
      },
      {
        "id": "word-21-46",
        "english": "finite",
        "phonetic": "/ˈfaɪnaɪt/",
        "partOfSpeech": "a.",
        "chinese": "有限的；限定的",
        "example": ""
      },
      {
        "id": "word-22-9",
        "english": "curiosity",
        "phonetic": "/ˏkjuərɪˈɔsətɪ/",
        "partOfSpeech": "n.",
        "chinese": "好奇，好奇心；稀奇或罕见的事物或人，古玩",
        "example": ""
      },
      {
        "id": "word-22-39",
        "english": "reliable*",
        "phonetic": "/rɪˈlaɪəbl/",
        "partOfSpeech": "a.",
        "chinese": "可靠的，可依赖的",
        "example": ""
      },
      {
        "id": "word-21-12",
        "english": "erroneous",
        "phonetic": "/ɪˈrəunɪəs/",
        "partOfSpeech": "a.",
        "chinese": "错误的，不正确的",
        "example": ""
      },
      {
        "id": "word-21-2",
        "english": "destination",
        "phonetic": "/ˏdestɪˈneɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "目的地，终点；目标",
        "example": ""
      },
      {
        "id": "word-22-42",
        "english": "announce*",
        "phonetic": "/əˈnauns/",
        "partOfSpeech": "vt.",
        "chinese": "宣布；声称",
        "example": ""
      },
      {
        "id": "word-21-66",
        "english": "dome",
        "phonetic": "/dəum/",
        "partOfSpeech": "n.",
        "chinese": "圆屋顶；穹顶",
        "example": ""
      },
      {
        "id": "word-22-67",
        "english": "absurd",
        "phonetic": "/əbˈsɜːd/",
        "partOfSpeech": "a.",
        "chinese": "荒谬的，荒唐的",
        "example": ""
      },
      {
        "id": "word-22-1",
        "english": "aspiration",
        "phonetic": "/ˏæspəˈreɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "强烈的愿望；志向",
        "example": ""
      },
      {
        "id": "word-21-10",
        "english": "conceptual",
        "phonetic": "[kənˈseptʃuəl]",
        "partOfSpeech": "a.",
        "chinese": "观念的，概念的",
        "example": ""
      },
      {
        "id": "word-21-14",
        "english": "get",
        "phonetic": "",
        "partOfSpeech": "",
        "chinese": "off track* 离题，偏离目标",
        "example": ""
      },
      {
        "id": "word-21-55",
        "english": "subordinate",
        "phonetic": "/səˈbɔːdɪnət/",
        "partOfSpeech": "n.",
        "chinese": "下属 a. 下级的；次要的 vt. 使处于次要地位，把……列在下级；使服从",
        "example": ""
      },
      {
        "id": "word-22-17",
        "english": "ritual",
        "phonetic": "/ˈrɪtʃuəl/",
        "partOfSpeech": "n.",
        "chinese": "典礼，（宗教等的）仪式；例行公事，老规矩 a. 作为仪式一部分的，仪式的；例行的",
        "example": ""
      },
      {
        "id": "word-21-44",
        "english": "compensation",
        "phonetic": "/ˏkɔmpenˈseɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "补偿，赔偿；赔偿物；赔偿金",
        "example": ""
      },
      {
        "id": "word-21-21",
        "english": "withdraw",
        "phonetic": "/wɪðˈdrɔː/",
        "partOfSpeech": "v.",
        "chinese": "收回；撤退；缩回，退出；提取（钱）",
        "example": ""
      },
      {
        "id": "word-22-54",
        "english": "comet",
        "phonetic": "/ˈkɔmɪt/",
        "partOfSpeech": "n.",
        "chinese": "彗星",
        "example": ""
      },
      {
        "id": "word-21-17",
        "english": "baron",
        "phonetic": "/ˈbærən/",
        "partOfSpeech": "n.",
        "chinese": "贵族；男爵",
        "example": ""
      },
      {
        "id": "word-21-31",
        "english": "crew",
        "phonetic": "/kruː/",
        "partOfSpeech": "n.",
        "chinese": "全体船员；工作人员；队，组",
        "example": ""
      },
      {
        "id": "word-22-2",
        "english": "considerable",
        "phonetic": "/kənˈsɪdərəbl/",
        "partOfSpeech": "a.",
        "chinese": "相当大（或多）的，可观的；值得考虑的，重要的",
        "example": ""
      },
      {
        "id": "word-22-48",
        "english": "destructive*",
        "phonetic": "/dɪˈstrʌktɪv/",
        "partOfSpeech": "a.",
        "chinese": "破坏（性）的",
        "example": ""
      },
      {
        "id": "word-22-38",
        "english": "audition",
        "phonetic": "/ɔːˈdɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "试演；试听，试音",
        "example": ""
      },
      {
        "id": "word-22-13",
        "english": "survey*",
        "phonetic": "/ˈsɜːveɪ/",
        "partOfSpeech": "n.",
        "chinese": "调查，勘察；测量，勘测；审视 /səˈveɪ/ vt. 调查，检视（建筑物等）；测量，勘测；俯瞰，眺望",
        "example": ""
      },
      {
        "id": "word-22-10",
        "english": "residential",
        "phonetic": "/ˏrezɪˈdenʃl/",
        "partOfSpeech": "a.",
        "chinese": "居住的，住宅的；寄宿的",
        "example": ""
      },
      {
        "id": "word-22-15",
        "english": "rudimentary",
        "phonetic": "[ˌru:dɪˈmentri]",
        "partOfSpeech": "a.",
        "chinese": "基本的，初步的；未充分发展的，发育不成熟的；退化的",
        "example": ""
      },
      {
        "id": "word-21-70",
        "english": "consist*",
        "phonetic": "/kənˈsɪst/",
        "partOfSpeech": "vi.",
        "chinese": "由……组成，由……构成；在于，存在于",
        "example": ""
      },
      {
        "id": "word-22-6",
        "english": "fascinate",
        "phonetic": "/ˈfæsɪneɪt/",
        "partOfSpeech": "v.",
        "chinese": "强烈地吸引，使着迷",
        "example": ""
      },
      {
        "id": "word-21-40",
        "english": "complexity",
        "phonetic": "[kəm'pleksətɪ]",
        "partOfSpeech": "n.",
        "chinese": "复杂，复杂性；复杂的事物",
        "example": ""
      },
      {
        "id": "word-22-46",
        "english": "assistance",
        "phonetic": "[əˈsɪstəns]",
        "partOfSpeech": "n.",
        "chinese": "协助，援助",
        "example": ""
      },
      {
        "id": "word-21-32",
        "english": "exhaustion",
        "phonetic": "/ɪgˈzɔːstʃən/",
        "partOfSpeech": "n.",
        "chinese": "精疲力竭；耗尽",
        "example": ""
      },
      {
        "id": "word-22-41",
        "english": "mount",
        "phonetic": "/maunt/",
        "partOfSpeech": "n.",
        "chinese": "山，山峰；支架，底座 v. 登上；骑上；发起；镶嵌",
        "example": ""
      },
      {
        "id": "word-21-59",
        "english": "charity",
        "phonetic": "/ˈtʃærətɪ/",
        "partOfSpeech": "n.",
        "chinese": "慈善；施舍；慈善机构",
        "example": ""
      },
      {
        "id": "word-22-58",
        "english": "faculty",
        "phonetic": "/ˈfækltɪ/",
        "partOfSpeech": "n.",
        "chinese": "才能；学院，系；（学院或系的）全体教学人员",
        "example": ""
      },
      {
        "id": "word-22-50",
        "english": "mild*",
        "phonetic": "/maɪld/",
        "partOfSpeech": "a.",
        "chinese": "温柔的；温和的；轻微的",
        "example": ""
      },
      {
        "id": "word-22-60",
        "english": "institution",
        "phonetic": "/ˏɪnstɪˈtjuːʃn/",
        "partOfSpeech": "n.",
        "chinese": "（行业）协会；机构；制度；习俗；团体；设立，制定",
        "example": ""
      },
      {
        "id": "word-21-67",
        "english": "formal",
        "phonetic": "/ˈfɔːml/",
        "partOfSpeech": "a.",
        "chinese": "正式的；正规的",
        "example": ""
      },
      {
        "id": "word-21-74",
        "english": "intelligent*",
        "phonetic": "[ɪnˈtelɪdʒənt]",
        "partOfSpeech": "a.",
        "chinese": "聪明的，理智的",
        "example": ""
      },
      {
        "id": "word-22-57",
        "english": "install*",
        "phonetic": "/ɪnˈstɔːl/",
        "partOfSpeech": "vt.",
        "chinese": "安顿，安置；安装，设置；正式任命，使正式就职",
        "example": ""
      },
      {
        "id": "word-22-30",
        "english": "perimeter",
        "phonetic": "/pəˈrɪmɪtə(r)/",
        "partOfSpeech": "n.",
        "chinese": "周长；周边",
        "example": ""
      },
      {
        "id": "word-21-45",
        "english": "issue*",
        "phonetic": "/ˈɪʃuː/",
        "partOfSpeech": "n.",
        "chinese": "问题，争论点；发行；（报刊的）一期；分发，流出 vt. 颁布；发行；流出；分发，发给",
        "example": ""
      },
      {
        "id": "word-21-18",
        "english": "independence*",
        "phonetic": "/ˏɪndɪˈpendəns/",
        "partOfSpeech": "n.",
        "chinese": "独立，自主",
        "example": ""
      },
      {
        "id": "word-22-22",
        "english": "repertoire",
        "phonetic": "/ˈrepətwɑː(r)/",
        "partOfSpeech": "n.",
        "chinese": "（剧团等）常备剧目；（剧团、演员等的）全部节目",
        "example": ""
      },
      {
        "id": "word-22-14",
        "english": "fitting",
        "phonetic": "/ˈfɪtɪŋ/",
        "partOfSpeech": "n.",
        "chinese": "试穿；装置 a. 适合的",
        "example": ""
      },
      {
        "id": "word-22-20",
        "english": "preliminary",
        "phonetic": "/prɪˈlɪmɪnərɪ/",
        "partOfSpeech": "a.",
        "chinese": "开端的，预备的，初步的 n. [常pl.] 初步做法，起始行为",
        "example": ""
      },
      {
        "id": "word-22-31",
        "english": "jerk",
        "phonetic": "/dʒɜːk/",
        "partOfSpeech": "v.",
        "chinese": "使猝然一动；猛拉 n. 急推，急扭；抽搐",
        "example": ""
      },
      {
        "id": "word-21-9",
        "english": "vegetation",
        "phonetic": "/ˏvedʒɪˈteɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "植物，草木",
        "example": ""
      },
      {
        "id": "word-22-8",
        "english": "evaluate",
        "phonetic": "/ɪˈvæljueɪt/",
        "partOfSpeech": "vt.",
        "chinese": "评价，估价",
        "example": ""
      },
      {
        "id": "word-22-32",
        "english": "visual",
        "phonetic": "/ˈvɪʒuəl/",
        "partOfSpeech": "a.",
        "chinese": "视觉的，用于视觉的",
        "example": ""
      },
      {
        "id": "word-22-55",
        "english": "grin",
        "phonetic": "/grɪn/",
        "partOfSpeech": "v./n.",
        "chinese": "咧嘴笑",
        "example": ""
      },
      {
        "id": "word-21-36",
        "english": "sympathetic",
        "phonetic": "/ˏsɪmpəˈθetɪk/",
        "partOfSpeech": "a.",
        "chinese": "同情的，体谅的；赞同的，支持的；和谐的",
        "example": ""
      },
      {
        "id": "word-22-4",
        "english": "gleam",
        "phonetic": "/gliːm/",
        "partOfSpeech": "vi.",
        "chinese": "闪烁；流露 n. 闪光",
        "example": ""
      },
      {
        "id": "word-22-19",
        "english": "interface",
        "phonetic": "/ˈɪntəfeɪs/",
        "partOfSpeech": "n.",
        "chinese": "界面；接口；接合点",
        "example": ""
      },
      {
        "id": "word-21-35",
        "english": "consistent",
        "phonetic": "/kənˈsɪstənt/",
        "partOfSpeech": "a.",
        "chinese": "一致的，协调的；相符的，相容的",
        "example": ""
      },
      {
        "id": "word-21-54",
        "english": "vigorous",
        "phonetic": "[ˈvɪgərəs]",
        "partOfSpeech": "a.",
        "chinese": "朝气蓬勃的；有力的",
        "example": ""
      },
      {
        "id": "word-22-44",
        "english": "horror",
        "phonetic": "/ˈhɔrə(r)/",
        "partOfSpeech": "n.",
        "chinese": "害怕，恐怖",
        "example": ""
      },
      {
        "id": "word-22-45",
        "english": "collapse*",
        "phonetic": "/kəˈlæps/",
        "partOfSpeech": "v./n.",
        "chinese": "坍塌，崩溃；晕倒",
        "example": ""
      },
      {
        "id": "word-22-27",
        "english": "rendition",
        "phonetic": "/renˈdɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "表演，扮演，演唱；翻译；视觉再现",
        "example": ""
      },
      {
        "id": "word-21-43",
        "english": "beware",
        "phonetic": "/bɪˈweə(r)/",
        "partOfSpeech": "v.",
        "chinese": "谨防，当心",
        "example": ""
      },
      {
        "id": "word-21-65",
        "english": "apparatus",
        "phonetic": "/ˏæpəˈreɪtəs/",
        "partOfSpeech": "n.",
        "chinese": "器械，器具，仪器；机构，组织",
        "example": ""
      },
      {
        "id": "word-21-61",
        "english": "gorgeous*",
        "phonetic": "/ˈgɔːdʒəs/",
        "partOfSpeech": "a.",
        "chinese": "华丽的；极好的",
        "example": ""
      },
      {
        "id": "word-21-69",
        "english": "extension*",
        "phonetic": "/ɪkˈstenʃn/",
        "partOfSpeech": "n.",
        "chinese": "伸展；延长部分；电话分机",
        "example": ""
      },
      {
        "id": "word-21-58",
        "english": "adjacent",
        "phonetic": "/əˈdʒeɪsnt/",
        "partOfSpeech": "a.",
        "chinese": "邻近的，毗连的",
        "example": ""
      },
      {
        "id": "word-22-51",
        "english": "capacity*",
        "phonetic": "/kəˈpæsətɪ/",
        "partOfSpeech": "n.",
        "chinese": "容量，容积；能量，能力",
        "example": ""
      },
      {
        "id": "word-21-64",
        "english": "grim",
        "phonetic": "/grɪm/",
        "partOfSpeech": "a.",
        "chinese": "严厉的；可怕的；讨厌的",
        "example": ""
      },
      {
        "id": "word-22-62",
        "english": "probability*",
        "phonetic": "/ˏprɔbəˈbɪlətɪ/",
        "partOfSpeech": "n.",
        "chinese": "可能性；概率",
        "example": ""
      },
      {
        "id": "word-21-57",
        "english": "farewell",
        "phonetic": "/ˏfeəˈwel/",
        "partOfSpeech": "n.",
        "chinese": "告别；欢送会",
        "example": ""
      },
      {
        "id": "word-22-26",
        "english": "perspective",
        "phonetic": "/pəˈspektɪv/",
        "partOfSpeech": "n.",
        "chinese": "（判断事物的）角度，方法；透视法",
        "example": ""
      },
      {
        "id": "word-21-48",
        "english": "wildlife",
        "phonetic": "[ˈwaɪldlaɪf]",
        "partOfSpeech": "n.",
        "chinese": "野生生物",
        "example": ""
      },
      {
        "id": "word-22-33",
        "english": "doctoral",
        "phonetic": "[ˈdɒktərəl]",
        "partOfSpeech": "a.",
        "chinese": "博士的",
        "example": ""
      },
      {
        "id": "word-21-73",
        "english": "degenerate",
        "phonetic": "/dɪˈdʒenəreɪt/",
        "partOfSpeech": "vi.",
        "chinese": "退化 /dɪˈdʒenərət/ a. 退化的",
        "example": ""
      },
      {
        "id": "word-22-52",
        "english": "latitude",
        "phonetic": "/ˈlætɪtjuːd/",
        "partOfSpeech": "n.",
        "chinese": "纬度； [pl.] 纬度地区；（言行等的）自由",
        "example": ""
      },
      {
        "id": "word-21-68",
        "english": "explore",
        "phonetic": "/ɪkˈsplɔː(r)/",
        "partOfSpeech": "v.",
        "chinese": "探险，探索；仔细检查，探究",
        "example": ""
      },
      {
        "id": "word-21-62",
        "english": "recommend",
        "phonetic": "/ˏrekəˈmend/",
        "partOfSpeech": "vt.",
        "chinese": "推荐；劝告；使受欢迎",
        "example": ""
      },
      {
        "id": "word-21-33",
        "english": "geographical",
        "phonetic": "[ˌdʒi:ə'ɡræfɪkl]",
        "partOfSpeech": "a.",
        "chinese": "地理学的；地理的",
        "example": ""
      },
      {
        "id": "word-22-61",
        "english": "Kung",
        "phonetic": "",
        "partOfSpeech": "Fu",
        "chinese": "/ˏkʌŋ ˈfu/ n. 功夫",
        "example": ""
      },
      {
        "id": "word-22-16",
        "english": "courtship",
        "phonetic": "/ˈkɔːt-ʃɪp/",
        "partOfSpeech": "n.",
        "chinese": "求爱或追求；求爱期，追求期",
        "example": ""
      },
      {
        "id": "word-22-43",
        "english": "headline",
        "phonetic": "[ˈhedlaɪn]",
        "partOfSpeech": "n.",
        "chinese": "大字标题； [常pl.] 头版头条新闻",
        "example": ""
      }
    ],
    "article": "In the field of Economic Development, researchers have been studying various phenomena to understand their implications. The concept of democratic* has been widely discussed in recent studies. The concept of geometry has been widely discussed in recent studies. The concept of swallow has been widely discussed in recent studies. The concept of commission has been widely discussed in recent studies. The concept of correspond* has been widely discussed in recent studies. The concept of misconception has been widely discussed in recent studies. The concept of spoilage* has been widely discussed in recent studies. The concept of envisage has been widely discussed in recent studies. The concept of immense* has been widely discussed in recent studies. The concept of plastic* has been widely discussed in recent studies. Researchers have found that these factors play a significant role in shaping our understanding of the subject. Further studies are needed to explore the full implications of these findings."
  },
  {
    "id": "unit-12",
    "name": "Unit 12: Word Lists 23 & 24",
    "words": [
      {
        "id": "word-24-20",
        "english": "tease",
        "phonetic": "/tiːz/",
        "partOfSpeech": "v.",
        "chinese": "逗乐，奚乐，戏弄；强求 n. 挪揄，戏弄，取笑；逗弄者，取笑者",
        "example": ""
      },
      {
        "id": "word-24-2",
        "english": "landfill*",
        "phonetic": "['lændfɪl",
        "partOfSpeech": "n.",
        "chinese": "垃圾堆；垃圾填筑地，废渣埋填地",
        "example": ""
      },
      {
        "id": "word-23-60",
        "english": "stale",
        "phonetic": "/steɪl/",
        "partOfSpeech": "a.",
        "chinese": "不新鲜的；陈腐的",
        "example": ""
      },
      {
        "id": "word-24-3",
        "english": "cast",
        "phonetic": "/kɑːst/",
        "partOfSpeech": "v.",
        "chinese": "投射（光、视线等）；把……加于；投，扔；丢弃，剔除；脱落，蜕（皮）；浇铸，铸造 n. 演员表，全体演员；石膏绷带；铸模，铸件；外貌，特征",
        "example": ""
      },
      {
        "id": "word-24-19",
        "english": "engross",
        "phonetic": "/ɪnˈgrəus/",
        "partOfSpeech": "vt.",
        "chinese": "使全神贯注，占去（某人的）全部注意力和时间",
        "example": ""
      },
      {
        "id": "word-24-43",
        "english": "spectator",
        "phonetic": "/spekˈteɪtə(r)/",
        "partOfSpeech": "n.",
        "chinese": "观众；旁观者",
        "example": ""
      },
      {
        "id": "word-24-52",
        "english": "shift*",
        "phonetic": "/ʃɪft/",
        "partOfSpeech": "v.",
        "chinese": "移动，转移；改变，转变 n. 转换，转变；轮（或换）班",
        "example": ""
      },
      {
        "id": "word-24-38",
        "english": "meteorology*",
        "phonetic": "/ˏmiːtɪəˈrɔlədʒɪ/",
        "partOfSpeech": "n.",
        "chinese": "气象学",
        "example": ""
      },
      {
        "id": "word-24-13",
        "english": "preventative",
        "phonetic": "[prɪ'ventətɪv]",
        "partOfSpeech": "a.",
        "chinese": "预防性的",
        "example": ""
      },
      {
        "id": "word-24-65",
        "english": "dose*",
        "phonetic": "/dəus/",
        "partOfSpeech": "n.",
        "chinese": "剂量，一剂",
        "example": ""
      },
      {
        "id": "word-23-59",
        "english": "aluminium",
        "phonetic": "/ˏæljəˋmɪnɪəm/",
        "partOfSpeech": "n.",
        "chinese": "铝",
        "example": ""
      },
      {
        "id": "word-24-18",
        "english": "prowess",
        "phonetic": "/ˈprauɪs/",
        "partOfSpeech": "n.",
        "chinese": "杰出的才能，高超的技艺，专长，造诣",
        "example": ""
      },
      {
        "id": "word-24-55",
        "english": "derive*",
        "phonetic": "/dɪˈraɪv/",
        "partOfSpeech": "v.",
        "chinese": "取得；起源",
        "example": ""
      },
      {
        "id": "word-23-22",
        "english": "foster",
        "phonetic": "/ˈfɔstə(r)/",
        "partOfSpeech": "v.",
        "chinese": "培养，培育（某物）；鼓励，促进；领养 a. 收养",
        "example": ""
      },
      {
        "id": "word-23-34",
        "english": "nightmare",
        "phonetic": "[ˈnaɪtmeə(r)]",
        "partOfSpeech": "n.",
        "chinese": "噩梦；可怕的事物",
        "example": ""
      },
      {
        "id": "word-23-5",
        "english": "grand*",
        "phonetic": "/grænd/",
        "partOfSpeech": "a.",
        "chinese": "宏伟的；大的",
        "example": ""
      },
      {
        "id": "word-23-40",
        "english": "underneath",
        "phonetic": "/ˏʌndəˈniːθ/",
        "partOfSpeech": "ad.",
        "chinese": "在下面 prep. 在……下面 n. 下部",
        "example": ""
      },
      {
        "id": "word-23-39",
        "english": "investigate",
        "phonetic": "/ɪnˈvestɪgeɪt/",
        "partOfSpeech": "v.",
        "chinese": "调查",
        "example": ""
      },
      {
        "id": "word-24-5",
        "english": "uniform*",
        "phonetic": "/ˈjuːnɪfɔːm/",
        "partOfSpeech": "n.",
        "chinese": "制服 a. 相同的；一致的",
        "example": ""
      },
      {
        "id": "word-23-56",
        "english": "digest",
        "phonetic": "/daɪˈdʒest/",
        "partOfSpeech": "v.",
        "chinese": "消化；领会 /ˈdaɪdʒest/ n. 文摘",
        "example": ""
      },
      {
        "id": "word-24-42",
        "english": "pore",
        "phonetic": "",
        "partOfSpeech": "",
        "chinese": "over [pɔ: ˈəuvə] 仔细阅读",
        "example": ""
      },
      {
        "id": "word-24-57",
        "english": "minimal",
        "phonetic": "/ˈmɪnɪməl/",
        "partOfSpeech": "a.",
        "chinese": "最小的，最低限度的",
        "example": ""
      },
      {
        "id": "word-23-44",
        "english": "strand",
        "phonetic": "/strænd/",
        "partOfSpeech": "n.",
        "chinese": "股，缕；部分，方面",
        "example": ""
      },
      {
        "id": "word-23-62",
        "english": "impair",
        "phonetic": "/ɪmˈpeə(r)/",
        "partOfSpeech": "vt.",
        "chinese": "损害；削弱",
        "example": ""
      },
      {
        "id": "word-23-41",
        "english": "division",
        "phonetic": "/dɪˈvɪʒn/",
        "partOfSpeech": "n.",
        "chinese": "分开，分隔；分配；分歧；除（法）；部门，科，司",
        "example": ""
      },
      {
        "id": "word-23-20",
        "english": "perception",
        "phonetic": "/pəˈsepʃn/",
        "partOfSpeech": "n.",
        "chinese": "看法；感觉；洞察力",
        "example": ""
      },
      {
        "id": "word-23-67",
        "english": "layer",
        "phonetic": "/ˈleɪə(r)/",
        "partOfSpeech": "n.",
        "chinese": "层，层次",
        "example": ""
      },
      {
        "id": "word-23-31",
        "english": "popularity",
        "phonetic": "/ˏpɔpjuˈlærətɪ/",
        "partOfSpeech": "n.",
        "chinese": "普及，流行",
        "example": ""
      },
      {
        "id": "word-23-64",
        "english": "adolescent",
        "phonetic": "[ˌædəˈlesnt]",
        "partOfSpeech": "n.",
        "chinese": "青少年 a. 青春期的；青少年的",
        "example": ""
      },
      {
        "id": "word-23-10",
        "english": "frame",
        "phonetic": "/freɪm/",
        "partOfSpeech": "n.",
        "chinese": "框架 vt. 给……镶框",
        "example": ""
      },
      {
        "id": "word-24-64",
        "english": "enclose",
        "phonetic": "/ɪnˈkləuz/",
        "partOfSpeech": "vt.",
        "chinese": "围住；附上；把……装入信封",
        "example": ""
      },
      {
        "id": "word-23-6",
        "english": "acumen",
        "phonetic": "/ˈækjumen/",
        "partOfSpeech": "n.",
        "chinese": "敏锐；精明",
        "example": ""
      },
      {
        "id": "word-24-17",
        "english": "hiccup",
        "phonetic": "/ˈhɪkʌp/",
        "partOfSpeech": "n.",
        "chinese": "嗝，呃逆；暂时（或小的）困难（或挫折） vi. 打嗝",
        "example": ""
      },
      {
        "id": "word-23-68",
        "english": "cable*",
        "phonetic": "/ˈkeɪbl/",
        "partOfSpeech": "n.",
        "chinese": "缆绳；电缆；电报 v. （给……）发电报",
        "example": ""
      },
      {
        "id": "word-24-54",
        "english": "monitor",
        "phonetic": "/ˈmɔnɪtə(r)/",
        "partOfSpeech": "n.",
        "chinese": "班长；监视器 vt. 监视；监测",
        "example": ""
      },
      {
        "id": "word-24-33",
        "english": "fraction",
        "phonetic": "/ˈfrækʃn/",
        "partOfSpeech": "n.",
        "chinese": "小部分，片断",
        "example": ""
      },
      {
        "id": "word-24-15",
        "english": "adjunct",
        "phonetic": "/ˈædʒʌŋkt/",
        "partOfSpeech": "n.",
        "chinese": "附属物，附件；附加语，修饰语",
        "example": ""
      },
      {
        "id": "word-23-13",
        "english": "ascribe",
        "phonetic": "/əˈskraɪb/",
        "partOfSpeech": "vt.",
        "chinese": "把……归因于",
        "example": ""
      },
      {
        "id": "word-23-26",
        "english": "inevitable",
        "phonetic": "/ɪnˈevɪtəbl/",
        "partOfSpeech": "a.",
        "chinese": "不可避免的，必然（发生）的",
        "example": ""
      },
      {
        "id": "word-24-40",
        "english": "weapon",
        "phonetic": "/ˈwepən/",
        "partOfSpeech": "n.",
        "chinese": "武器，兵器",
        "example": ""
      },
      {
        "id": "word-24-58",
        "english": "sketch",
        "phonetic": "/sketʃ/",
        "partOfSpeech": "v.",
        "chinese": "画素描；概述 n. 素描；速写",
        "example": ""
      },
      {
        "id": "word-23-21",
        "english": "prediction",
        "phonetic": "[prɪˈdɪkʃn]",
        "partOfSpeech": "n.",
        "chinese": "预言，预料，预报",
        "example": ""
      },
      {
        "id": "word-24-4",
        "english": "curtain*",
        "phonetic": "/ˈkɜːtn/",
        "partOfSpeech": "n.",
        "chinese": "窗帘，门帘",
        "example": ""
      },
      {
        "id": "word-24-32",
        "english": "in",
        "phonetic": "",
        "partOfSpeech": "",
        "chinese": "favour of 赞同，支持",
        "example": ""
      },
      {
        "id": "word-24-11",
        "english": "exodus",
        "phonetic": "/ˈeksədəs/",
        "partOfSpeech": "n.",
        "chinese": "大批离去，成群外出",
        "example": ""
      },
      {
        "id": "word-23-50",
        "english": "whaling*",
        "phonetic": "['weɪlɪŋ]",
        "partOfSpeech": "n.",
        "chinese": "捕鲸",
        "example": ""
      },
      {
        "id": "word-24-8",
        "english": "disillusion",
        "phonetic": "/ˏdɪsɪˈluːʒn/",
        "partOfSpeech": "vt.",
        "chinese": "使醒悟",
        "example": ""
      },
      {
        "id": "word-24-1",
        "english": "judicious*",
        "phonetic": "/dʒuːˈdɪʃəs/",
        "partOfSpeech": "a.",
        "chinese": "明智的；有见识的",
        "example": ""
      },
      {
        "id": "word-24-45",
        "english": "dreadful",
        "phonetic": "/ˈdredfl/",
        "partOfSpeech": "a.",
        "chinese": "可怕的；令人不快的",
        "example": ""
      },
      {
        "id": "word-23-3",
        "english": "tranquility*",
        "phonetic": "[træŋ'kwɪlɪtɪ]",
        "partOfSpeech": "n.",
        "chinese": "宁静，安静",
        "example": ""
      },
      {
        "id": "word-24-9",
        "english": "clientele",
        "phonetic": "/ˏkliːənˈtel/",
        "partOfSpeech": "n.",
        "chinese": "（医生、律师等的）顾客，主顾，客户",
        "example": ""
      },
      {
        "id": "word-23-25",
        "english": "revival",
        "phonetic": "/rɪˈvaɪvl/",
        "partOfSpeech": "n.",
        "chinese": "（健康、力量或知觉的）恢复，复原；苏醒，复活；复兴；重新使用；重新流行",
        "example": ""
      },
      {
        "id": "word-24-51",
        "english": "alert",
        "phonetic": "/əˈlɜːt/",
        "partOfSpeech": "a.",
        "chinese": "警惕的 n. 警戒；警报 vt. 警告",
        "example": ""
      },
      {
        "id": "word-24-70",
        "english": "overcome*",
        "phonetic": "/ˏəuvəˈkʌm/",
        "partOfSpeech": "vt.",
        "chinese": "战胜，克服；（感情等）压倒",
        "example": ""
      },
      {
        "id": "word-24-59",
        "english": "lag*",
        "phonetic": "/læg/",
        "partOfSpeech": "v.",
        "chinese": "走得慢；落后 n. （时间上的）间隔；滞后",
        "example": ""
      },
      {
        "id": "word-24-62",
        "english": "offend",
        "phonetic": "/əˈfend/",
        "partOfSpeech": "v.",
        "chinese": "冒犯；使厌恶；违犯",
        "example": ""
      },
      {
        "id": "word-23-30",
        "english": "orthodox",
        "phonetic": "/ˈɔːθədɔks/",
        "partOfSpeech": "a.",
        "chinese": "正统的，传统的",
        "example": ""
      },
      {
        "id": "word-23-33",
        "english": "reliance",
        "phonetic": "/rɪˈlaɪəns/",
        "partOfSpeech": "n.",
        "chinese": "依靠，依赖",
        "example": ""
      },
      {
        "id": "word-24-56",
        "english": "desire*",
        "phonetic": "/dɪˈzaɪə(r)/",
        "partOfSpeech": "v./n.",
        "chinese": "想望，期望；要求",
        "example": ""
      },
      {
        "id": "word-24-60",
        "english": "trigger*",
        "phonetic": "/ˈtrɪgə(r)/",
        "partOfSpeech": "vt.",
        "chinese": "引发，导致 n. 扳机",
        "example": ""
      },
      {
        "id": "word-23-17",
        "english": "literate",
        "phonetic": "/ˈlɪtərət/",
        "partOfSpeech": "a.",
        "chinese": "有读写能力的；有文化的；博学的",
        "example": ""
      },
      {
        "id": "word-24-41",
        "english": "authorise",
        "phonetic": "/ˈɔːθəraɪz/",
        "partOfSpeech": "vt.",
        "chinese": "批准，认可；授权",
        "example": ""
      },
      {
        "id": "word-23-2",
        "english": "conviction*",
        "phonetic": "/kənˈvɪkʃn/",
        "partOfSpeech": "n.",
        "chinese": "定罪；坚信，确信",
        "example": ""
      },
      {
        "id": "word-24-68",
        "english": "compress",
        "phonetic": "/kəmˈpres/",
        "partOfSpeech": "v.",
        "chinese": "压紧；压缩 /ˈkɔmpres/ n. 敷布，压布",
        "example": ""
      },
      {
        "id": "word-24-50",
        "english": "contrary",
        "phonetic": "/ˈkɔntrərɪ/",
        "partOfSpeech": "a.",
        "chinese": "相反的 n. 相反",
        "example": ""
      },
      {
        "id": "word-23-61",
        "english": "tan",
        "phonetic": "/tæn/",
        "partOfSpeech": "n.",
        "chinese": "棕褐色；晒黑 v. （使）晒成棕褐色，晒黑；硝（皮）",
        "example": ""
      },
      {
        "id": "word-24-37",
        "english": "merchandising",
        "phonetic": "[ˈmɜ:tʃəndaɪzɪŋ]",
        "partOfSpeech": "n.",
        "chinese": "销售规划",
        "example": ""
      },
      {
        "id": "word-24-39",
        "english": "dealer",
        "phonetic": "/ˈdiːlə(r)/",
        "partOfSpeech": "n.",
        "chinese": "商人，经销商",
        "example": ""
      },
      {
        "id": "word-24-23",
        "english": "socialise",
        "phonetic": "/ˈsəuʃəlaɪz/",
        "partOfSpeech": "v.",
        "chinese": "（同他人）来往，交往，交际；使（某人）适应社会生活",
        "example": ""
      },
      {
        "id": "word-23-29",
        "english": "loath",
        "phonetic": "/ləuθ/",
        "partOfSpeech": "a.",
        "chinese": "不情愿的，勉强的",
        "example": ""
      },
      {
        "id": "word-23-38",
        "english": "decompose*",
        "phonetic": "/ˏdiːkəmˈpəuz/",
        "partOfSpeech": "v.",
        "chinese": "（使）分解，（使）腐烂",
        "example": ""
      },
      {
        "id": "word-24-27",
        "english": "regarding",
        "phonetic": "[rɪˈgɑ:dɪŋ]",
        "partOfSpeech": "prep.",
        "chinese": "关于",
        "example": ""
      },
      {
        "id": "word-23-43",
        "english": "ancient",
        "phonetic": "/ˈeɪnʃənt/",
        "partOfSpeech": "a.",
        "chinese": "古老的；年老的",
        "example": ""
      },
      {
        "id": "word-23-37",
        "english": "divine*",
        "phonetic": "/dɪˈvaɪn/",
        "partOfSpeech": "a.",
        "chinese": "神的；神授的，天赐的",
        "example": ""
      },
      {
        "id": "word-23-11",
        "english": "installment",
        "phonetic": "[ɪn'stɔ:lmənt]",
        "partOfSpeech": "n.",
        "chinese": "分期付款；（连载或连播的）一集",
        "example": ""
      },
      {
        "id": "word-24-6",
        "english": "quartz",
        "phonetic": "/kwɔːts/",
        "partOfSpeech": "n.",
        "chinese": "石英",
        "example": ""
      },
      {
        "id": "word-23-69",
        "english": "wedge*",
        "phonetic": "/wedʒ/",
        "partOfSpeech": "n.",
        "chinese": "楔子，楔形 vt. 楔入",
        "example": ""
      },
      {
        "id": "word-24-14",
        "english": "complementary",
        "phonetic": "[ˌkɒmplɪˈmentri]",
        "partOfSpeech": "a.",
        "chinese": "互补的；补充的，补足的",
        "example": ""
      },
      {
        "id": "word-24-16",
        "english": "simplistic",
        "phonetic": "/sɪmˈplɪstɪk/",
        "partOfSpeech": "a.",
        "chinese": "过分单纯化的，过分简单化的",
        "example": ""
      },
      {
        "id": "word-24-61",
        "english": "supplement",
        "phonetic": "/ˈsʌplɪment/",
        "partOfSpeech": "vt.",
        "chinese": "补充，增补 /ˈsʌplɪmənt/ n. 增补（物），补充（物）；补遗；增刊；附录",
        "example": ""
      },
      {
        "id": "word-24-21",
        "english": "exuberant",
        "phonetic": "/ɪgˈzjuːbərənt/",
        "partOfSpeech": "a.",
        "chinese": "繁茂的，丰富的；非凡的；华而不实的",
        "example": ""
      },
      {
        "id": "word-23-27",
        "english": "disenchantment",
        "phonetic": "[ˌdɪsɪn'tʃɑ:ntmənt]",
        "partOfSpeech": "n.",
        "chinese": "失望，不抱幻想",
        "example": ""
      },
      {
        "id": "word-23-4",
        "english": "facilitate",
        "phonetic": "/fəˈsɪlɪteɪt/",
        "partOfSpeech": "vt.",
        "chinese": "使便利，使容易；推动，帮助",
        "example": ""
      },
      {
        "id": "word-23-46",
        "english": "motive",
        "phonetic": "/ˈməutɪv/",
        "partOfSpeech": "n.",
        "chinese": "动机，目的",
        "example": ""
      },
      {
        "id": "word-23-7",
        "english": "dissertation",
        "phonetic": "/ˏdɪsəˈteɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "专题论文",
        "example": ""
      },
      {
        "id": "word-23-66",
        "english": "guinea",
        "phonetic": "/ˈgɪnɪ/",
        "partOfSpeech": "n.",
        "chinese": "几尼（英国的旧货币单位，现值1.05镑）",
        "example": ""
      },
      {
        "id": "word-23-23",
        "english": "ancestral",
        "phonetic": "[æn'sestrəl]",
        "partOfSpeech": "a.",
        "chinese": "祖先的；祖传的",
        "example": ""
      },
      {
        "id": "word-24-24",
        "english": "optimum",
        "phonetic": "/ˈɔptɪməm/",
        "partOfSpeech": "a.",
        "chinese": "最好的；最有利的",
        "example": ""
      },
      {
        "id": "word-23-47",
        "english": "furious",
        "phonetic": "/ˈfjuərɪəs/",
        "partOfSpeech": "a.",
        "chinese": "狂怒的；激烈的",
        "example": ""
      },
      {
        "id": "word-23-32",
        "english": "amplify",
        "phonetic": "/ˈæmplɪfaɪ/",
        "partOfSpeech": "v.",
        "chinese": "详述；放大（声音等）",
        "example": ""
      },
      {
        "id": "word-24-10",
        "english": "holistic",
        "phonetic": "[həʊˈlɪstɪk]",
        "partOfSpeech": "a.",
        "chinese": "整体的，全面的；功能整体性的",
        "example": ""
      },
      {
        "id": "word-24-47",
        "english": "shuttle",
        "phonetic": "/ˈʃʌtl/",
        "partOfSpeech": "n.",
        "chinese": "航天飞机",
        "example": ""
      },
      {
        "id": "word-23-36",
        "english": "conscious",
        "phonetic": "/ˈkɔnʃəs/",
        "partOfSpeech": "a.",
        "chinese": "自觉的；意识到的；神志清醒的",
        "example": ""
      },
      {
        "id": "word-23-35",
        "english": "leap*",
        "phonetic": "/liːp/",
        "partOfSpeech": "n.",
        "chinese": "跳跃；激增 v. 跳；冲",
        "example": ""
      },
      {
        "id": "word-24-67",
        "english": "on",
        "phonetic": "",
        "partOfSpeech": "",
        "chinese": "the horizon 即将发生的",
        "example": ""
      },
      {
        "id": "word-24-63",
        "english": "vivid*",
        "phonetic": "/ˈvɪvɪd/",
        "partOfSpeech": "a.",
        "chinese": "鲜艳的；生动的",
        "example": ""
      },
      {
        "id": "word-24-31",
        "english": "secondary",
        "phonetic": "/ˈsekəndrɪ/",
        "partOfSpeech": "a.",
        "chinese": "次要的，二级的；（教育、学校等）中等的；辅助的、从属的",
        "example": ""
      },
      {
        "id": "word-24-34",
        "english": "dictation",
        "phonetic": "/dɪkˈteɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "听写",
        "example": ""
      },
      {
        "id": "word-24-44",
        "english": "compatriot*",
        "phonetic": "/kəmˈpætrɪət/",
        "partOfSpeech": "n.",
        "chinese": "同胞；同国人",
        "example": ""
      },
      {
        "id": "word-24-12",
        "english": "concur",
        "phonetic": "/kənˈkɜː(r)/",
        "partOfSpeech": "v.",
        "chinese": "同时发生；意见相同，一致",
        "example": ""
      },
      {
        "id": "word-23-51",
        "english": "exhilaration",
        "phonetic": "[ɪɡˌzɪlə'reɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "高兴；兴奋",
        "example": ""
      },
      {
        "id": "word-23-8",
        "english": "heap*",
        "phonetic": "/hiːp/",
        "partOfSpeech": "n.",
        "chinese": "（一）堆；大量 vt. （使）成堆",
        "example": ""
      },
      {
        "id": "word-24-46",
        "english": "laboratory",
        "phonetic": "/ləˈbɔrətrɪ/",
        "partOfSpeech": "n.",
        "chinese": "实验室，研究室",
        "example": ""
      },
      {
        "id": "word-23-1",
        "english": "pressure*",
        "phonetic": "/ˈpreʃə(r)/",
        "partOfSpeech": "n.",
        "chinese": "压力，压强；强制，压迫 vt. 对……施加压力（或影响）；迫使，说服",
        "example": ""
      },
      {
        "id": "word-23-48",
        "english": "alternative*",
        "phonetic": "/ɔːlˈtɜːnətɪv/",
        "partOfSpeech": "a.",
        "chinese": "可供替代的；非传统的，另类的 n. 可供选择的事物",
        "example": ""
      },
      {
        "id": "word-23-14",
        "english": "abstract",
        "phonetic": "/ˈæbstrækt/",
        "partOfSpeech": "a.",
        "chinese": "抽象的；抽象派的 n. 摘要，梗概；抽象 /əbˈstrækt/ vt. 摘要，提炼；抽象化",
        "example": ""
      },
      {
        "id": "word-24-22",
        "english": "cavort",
        "phonetic": "/kəˈvɔːt/",
        "partOfSpeech": "v.",
        "chinese": "欢跃，跳跃；嬉戏",
        "example": ""
      },
      {
        "id": "word-23-9",
        "english": "blame*",
        "phonetic": "/bleɪm/",
        "partOfSpeech": "vt.",
        "chinese": "责怪，责备",
        "example": ""
      },
      {
        "id": "word-24-29",
        "english": "creative*",
        "phonetic": "/kriːˈeɪtɪv/",
        "partOfSpeech": "a.",
        "chinese": "创造性的；创作的",
        "example": ""
      },
      {
        "id": "word-23-58",
        "english": "extraordinary*",
        "phonetic": "/ɪkˈstrɔːdnrɪ/",
        "partOfSpeech": "a.",
        "chinese": "不同寻常的，非常的",
        "example": ""
      },
      {
        "id": "word-23-24",
        "english": "rekindle",
        "phonetic": "/ˏriːˈkɪndl/",
        "partOfSpeech": "vt.",
        "chinese": "重新点燃；使复苏",
        "example": ""
      },
      {
        "id": "word-24-30",
        "english": "consultant*",
        "phonetic": "/kənˈsʌltənt/",
        "partOfSpeech": "n.",
        "chinese": "顾问；专科医生",
        "example": ""
      },
      {
        "id": "word-23-15",
        "english": "disruption",
        "phonetic": "[dɪs'rʌpʃn]",
        "partOfSpeech": "n.",
        "chinese": "动乱；打乱；破坏",
        "example": ""
      },
      {
        "id": "word-23-65",
        "english": "associate*",
        "phonetic": "/əˈsəuʃɪeɪt/",
        "partOfSpeech": "v.",
        "chinese": "使联合；使有联系；交往 /əˈsəuʃɪət/ n. 伙伴；同事 a. 副的；联合的，合伙的",
        "example": ""
      },
      {
        "id": "word-23-53",
        "english": "migrate*",
        "phonetic": "/maɪˈgreɪt/",
        "partOfSpeech": "v.",
        "chinese": "（候鸟等）迁徙；移居",
        "example": ""
      },
      {
        "id": "word-23-45",
        "english": "specimen",
        "phonetic": "/ˈspesɪmən/",
        "partOfSpeech": "n.",
        "chinese": "范例，样品；样本，标本",
        "example": ""
      },
      {
        "id": "word-24-28",
        "english": "contact*",
        "phonetic": "/ˈkɔntækt/",
        "partOfSpeech": "n.",
        "chinese": "接触；联系 vt. 与……取得联系，联络",
        "example": ""
      },
      {
        "id": "word-23-12",
        "english": "symbolism",
        "phonetic": "[ˈsɪmbəlɪzəm]",
        "partOfSpeech": "n.",
        "chinese": "符号的使用；（尤指文艺中的）象征主义，象征手法",
        "example": ""
      },
      {
        "id": "word-24-48",
        "english": "entail",
        "phonetic": "/ɪnˈteɪl/",
        "partOfSpeech": "vt.",
        "chinese": "牵涉；需要",
        "example": ""
      },
      {
        "id": "word-24-7",
        "english": "longitudinal*",
        "phonetic": "[lɔndʒiˈtju:dinl]",
        "partOfSpeech": "a.",
        "chinese": "经度的，经线的；纵的；长度的",
        "example": ""
      },
      {
        "id": "word-24-36",
        "english": "populate*",
        "phonetic": "/ˈpɔpjuleɪt/",
        "partOfSpeech": "vt.",
        "chinese": "（大批地）居住于，生活于",
        "example": ""
      },
      {
        "id": "word-24-35",
        "english": "engage*",
        "phonetic": "/ɪnˈgeɪdʒ/",
        "partOfSpeech": "v.",
        "chinese": "吸引（某人的注意力等）；占用（某人的时间）；使从事于，使忙于；雇用，聘用；与（某人）交战；（指机器零件等）啮合，衔接",
        "example": ""
      },
      {
        "id": "word-23-49",
        "english": "access*",
        "phonetic": "/ˈækses/",
        "partOfSpeech": "vt.",
        "chinese": "进入；使用 n. 通道，入径；机会；权利",
        "example": ""
      },
      {
        "id": "word-23-42",
        "english": "gamble",
        "phonetic": "/ˈgæmbl/",
        "partOfSpeech": "v.",
        "chinese": "赌博，打赌；投机；冒险",
        "example": ""
      },
      {
        "id": "word-23-16",
        "english": "self-esteem",
        "phonetic": "/ˏself",
        "partOfSpeech": "",
        "chinese": "ɪˈstiːm/ n. 自尊；自负",
        "example": ""
      },
      {
        "id": "word-24-26",
        "english": "fitness",
        "phonetic": "[ˈfɪtnəs]",
        "partOfSpeech": "n.",
        "chinese": "健康；适合（某事物）",
        "example": ""
      },
      {
        "id": "word-23-18",
        "english": "extinction",
        "phonetic": "/ɪkˈstɪŋkʃn/",
        "partOfSpeech": "n.",
        "chinese": "灭绝，绝种；熄灭",
        "example": ""
      },
      {
        "id": "word-24-49",
        "english": "alchemist*",
        "phonetic": "[ˈælkəmɪst]",
        "partOfSpeech": "n.",
        "chinese": "炼金术士",
        "example": ""
      },
      {
        "id": "word-23-19",
        "english": "endanger",
        "phonetic": "/ɪnˈdeɪndʒə(r)/",
        "partOfSpeech": "vt.",
        "chinese": "危及，危害",
        "example": ""
      },
      {
        "id": "word-23-54",
        "english": "barrel*",
        "phonetic": "/ˈbærəl/",
        "partOfSpeech": "n.",
        "chinese": "桶，圆筒",
        "example": ""
      },
      {
        "id": "word-24-53",
        "english": "mere",
        "phonetic": "/mɪə(r)/",
        "partOfSpeech": "a.",
        "chinese": "仅仅的；纯粹的",
        "example": ""
      },
      {
        "id": "word-24-69",
        "english": "interest*",
        "phonetic": "/ˈɪntrəst/",
        "partOfSpeech": "n.",
        "chinese": "兴趣；利息；利益 vt. 使感兴趣",
        "example": ""
      },
      {
        "id": "word-23-52",
        "english": "inland",
        "phonetic": "{ˈɪnlænd}",
        "partOfSpeech": "a.",
        "chinese": "内陆的 /ˏɪnˈlænd/ ad. 向内地（或内陆）",
        "example": ""
      },
      {
        "id": "word-23-63",
        "english": "inescapable",
        "phonetic": "[ˌɪnɪˈskeɪpəbl]",
        "partOfSpeech": "a.",
        "chinese": "不可逃避的；难免的",
        "example": ""
      },
      {
        "id": "word-23-57",
        "english": "decipher",
        "phonetic": "/dɪˈsaɪfə(r)/",
        "partOfSpeech": "vt.",
        "chinese": "破译；解释",
        "example": ""
      },
      {
        "id": "word-24-66",
        "english": "supply*",
        "phonetic": "/səˈplaɪ/",
        "partOfSpeech": "n.",
        "chinese": "供给，供应（量）；[常 pl.] 存货，必需品 vt. 供给，供应；满足（需要），弥补（不足）",
        "example": ""
      },
      {
        "id": "word-24-71",
        "english": "achievement*",
        "phonetic": "[əˈtʃi:vmənt]",
        "partOfSpeech": "n.",
        "chinese": "成就，成绩；达到，完成，实现",
        "example": ""
      },
      {
        "id": "word-23-55",
        "english": "claim*",
        "phonetic": "/kleɪm/",
        "partOfSpeech": "v.",
        "chinese": "要求；声称，主张；索赔 n. 要求；主张，断言；索赔",
        "example": ""
      },
      {
        "id": "word-24-25",
        "english": "molecule*",
        "phonetic": "/ˈmɔlɪkjuːl/",
        "partOfSpeech": "n.",
        "chinese": "分子",
        "example": ""
      },
      {
        "id": "word-23-28",
        "english": "acupuncture",
        "phonetic": "/ˈækjupʌŋktʃə(r)/",
        "partOfSpeech": "n.",
        "chinese": "针刺疗法，针灸",
        "example": ""
      }
    ],
    "article": "In the field of Scientific Discovery, researchers have been studying various phenomena to understand their implications. The concept of tease has been widely discussed in recent studies. The concept of landfill* has been widely discussed in recent studies. The concept of stale has been widely discussed in recent studies. The concept of cast has been widely discussed in recent studies. The concept of engross has been widely discussed in recent studies. The concept of spectator has been widely discussed in recent studies. The concept of shift* has been widely discussed in recent studies. The concept of meteorology* has been widely discussed in recent studies. The concept of preventative has been widely discussed in recent studies. The concept of dose* has been widely discussed in recent studies. Researchers have found that these factors play a significant role in shaping our understanding of the subject. Further studies are needed to explore the full implications of these findings."
  },
  {
    "id": "unit-13",
    "name": "Unit 13: Word Lists 25 & 26",
    "words": [
      {
        "id": "word-25-47",
        "english": "discredit*",
        "phonetic": "/dɪsˈkredɪt/",
        "partOfSpeech": "vt.",
        "chinese": "使怀疑；使丧失信誉，使丢脸",
        "example": ""
      },
      {
        "id": "word-25-62",
        "english": "abolish",
        "phonetic": "/əˈbɔlɪʃ/",
        "partOfSpeech": "vt.",
        "chinese": "废止，废除",
        "example": ""
      },
      {
        "id": "word-25-44",
        "english": "conduct*",
        "phonetic": "/ˈkɔndʌkt/",
        "partOfSpeech": "n.",
        "chinese": "举止；指导；管理 /kənˈdʌkt/ v. 指导；管理，实施；指挥",
        "example": ""
      },
      {
        "id": "word-25-68",
        "english": "accountant",
        "phonetic": "/əˈkauntənt/",
        "partOfSpeech": "n.",
        "chinese": "会计师",
        "example": ""
      },
      {
        "id": "word-25-16",
        "english": "context",
        "phonetic": "/ˈkɔntekst/",
        "partOfSpeech": "n.",
        "chinese": "上下文；背景；环境",
        "example": ""
      },
      {
        "id": "word-25-39",
        "english": "cherry*",
        "phonetic": "/ˈtʃerɪ/",
        "partOfSpeech": "n.",
        "chinese": "樱桃（树）",
        "example": ""
      },
      {
        "id": "word-26-51",
        "english": "gigantic",
        "phonetic": "/dʒaɪˈgæntɪk/",
        "partOfSpeech": "a.",
        "chinese": "巨大的，庞大的",
        "example": ""
      },
      {
        "id": "word-26-30",
        "english": "up-to-date",
        "phonetic": "/ˏʌp",
        "partOfSpeech": "",
        "chinese": "tə ˈdeɪt/ a. 直到最近的；现代的",
        "example": ""
      },
      {
        "id": "word-26-4",
        "english": "litter",
        "phonetic": "/ˈlɪtə(r)/",
        "partOfSpeech": "v.",
        "chinese": "使乱七八糟；乱扔 n. 废弃物，垃圾；一窝幼崽",
        "example": ""
      },
      {
        "id": "word-25-20",
        "english": "exploitative",
        "phonetic": "[ɪkˈsplɔɪtətɪv]",
        "partOfSpeech": "a.",
        "chinese": "开发的，利用的；剥削的",
        "example": ""
      },
      {
        "id": "word-25-6",
        "english": "distinct",
        "phonetic": "/dɪˈstɪŋkt/",
        "partOfSpeech": "a.",
        "chinese": "清楚的，明显的；有区别的，不同的",
        "example": ""
      },
      {
        "id": "word-25-17",
        "english": "entrepreneurial",
        "phonetic": "[ˌɒntrəprə'nɜ:rɪəl]",
        "partOfSpeech": "a.",
        "chinese": "创业的",
        "example": ""
      },
      {
        "id": "word-25-5",
        "english": "split",
        "phonetic": "/splɪt/",
        "partOfSpeech": "v.",
        "chinese": "（使）分裂，分享；（被）撕裂，裂开；劈开；分担，分享 n. 裂口；分化，分裂",
        "example": ""
      },
      {
        "id": "word-25-71",
        "english": "gang",
        "phonetic": "/gæŋ/",
        "partOfSpeech": "n.",
        "chinese": "一帮 v. 结成一伙",
        "example": ""
      },
      {
        "id": "word-25-12",
        "english": "advantageous",
        "phonetic": "[ˌædvənˈteɪdʒəs]",
        "partOfSpeech": "a.",
        "chinese": "有利的",
        "example": ""
      },
      {
        "id": "word-26-35",
        "english": "hassle*",
        "phonetic": "/ˈhæsl/",
        "partOfSpeech": "n.",
        "chinese": "困难，麻烦；分歧，争论",
        "example": ""
      },
      {
        "id": "word-26-9",
        "english": "fluency",
        "phonetic": "[ˈflu:ənsi]",
        "partOfSpeech": "n.",
        "chinese": "流利，流畅；通顺",
        "example": ""
      },
      {
        "id": "word-25-10",
        "english": "linger*",
        "phonetic": "/ˈlɪŋgə(r)/",
        "partOfSpeech": "vi.",
        "chinese": "继续逗留；缓慢消失",
        "example": ""
      },
      {
        "id": "word-25-4",
        "english": "congested*",
        "phonetic": "/kənˈdʒestɪd/",
        "partOfSpeech": "a.",
        "chinese": "拥挤不堪的；充塞的",
        "example": ""
      },
      {
        "id": "word-26-16",
        "english": "recourse",
        "phonetic": "/rɪˈkɔːs/",
        "partOfSpeech": "n.",
        "chinese": "依靠；求助，求援",
        "example": ""
      },
      {
        "id": "word-25-33",
        "english": "assimilate",
        "phonetic": "/əˈsɪməleɪt/",
        "partOfSpeech": "v.",
        "chinese": "吸收；使同化",
        "example": ""
      },
      {
        "id": "word-25-3",
        "english": "arable*",
        "phonetic": "/ˈærəbl/",
        "partOfSpeech": "a.",
        "chinese": "可耕作的 n. 耕地",
        "example": ""
      },
      {
        "id": "word-26-31",
        "english": "bury*",
        "phonetic": "/ˈberɪ/",
        "partOfSpeech": "vt.",
        "chinese": "埋葬；埋藏，掩藏",
        "example": ""
      },
      {
        "id": "word-25-61",
        "english": "sensitive*",
        "phonetic": "/ˈsensətɪv/",
        "partOfSpeech": "a.",
        "chinese": "敏感的，灵敏的；神经过敏的，容易生气的；易受伤害的",
        "example": ""
      },
      {
        "id": "word-25-63",
        "english": "conception",
        "phonetic": "/kənˈsepʃn/",
        "partOfSpeech": "n.",
        "chinese": "观念；概念",
        "example": ""
      },
      {
        "id": "word-25-67",
        "english": "qualitative",
        "phonetic": "/ˈkwɔlɪtətɪv/",
        "partOfSpeech": "a.",
        "chinese": "性质的，质量的；定性的",
        "example": ""
      },
      {
        "id": "word-26-33",
        "english": "bold",
        "phonetic": "/bəuld/",
        "partOfSpeech": "a.",
        "chinese": "粗（字）体的；大胆的，鲁莽的，勇敢的；醒目的",
        "example": ""
      },
      {
        "id": "word-25-40",
        "english": "contingency*",
        "phonetic": "/kənˈtɪndʒənsɪ/",
        "partOfSpeech": "n.",
        "chinese": "偶然性，可能性；意外事件；附带事件",
        "example": ""
      },
      {
        "id": "word-26-10",
        "english": "transcription",
        "phonetic": "[trænˈskrɪpʃn]",
        "partOfSpeech": "n.",
        "chinese": "抄写，誊写；抄本，誊本；书面标注的事物；（乐曲的）改编",
        "example": ""
      },
      {
        "id": "word-25-28",
        "english": "extrusion",
        "phonetic": "[ɪk'stru:ʒn]",
        "partOfSpeech": "n.",
        "chinese": "挤出，推出，挤压",
        "example": ""
      },
      {
        "id": "word-26-12",
        "english": "elicitation",
        "phonetic": "[ɪˌlɪsɪ'teɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "引出，诱出",
        "example": ""
      },
      {
        "id": "word-25-18",
        "english": "dearth",
        "phonetic": "/dɜːθ/",
        "partOfSpeech": "n.",
        "chinese": "缺乏，短缺",
        "example": ""
      },
      {
        "id": "word-25-53",
        "english": "undetected*",
        "phonetic": "[ˌʌndɪˈtektɪd]",
        "partOfSpeech": "a.",
        "chinese": "未被发现的",
        "example": ""
      },
      {
        "id": "word-26-19",
        "english": "emeritus",
        "phonetic": "/ɪˈmerɪtəs/",
        "partOfSpeech": "a.",
        "chinese": "保留头衔而退休的，荣誉退休的",
        "example": ""
      },
      {
        "id": "word-26-13",
        "english": "informant",
        "phonetic": "[ɪnˈfɔ:mənt]",
        "partOfSpeech": "n.",
        "chinese": "提供消息或情报的人，线人；提供资料的人",
        "example": ""
      },
      {
        "id": "word-26-7",
        "english": "breakdown",
        "phonetic": "/ˈbreɪkdaun/",
        "partOfSpeech": "n.",
        "chinese": "垮台，倒塌，破裂；（健康、精神等）衰竭，衰弱；（机器等的）损坏，故障；分类",
        "example": ""
      },
      {
        "id": "word-25-34",
        "english": "harbour",
        "phonetic": "/ˈhɑːbə(r)/",
        "partOfSpeech": "n.",
        "chinese": "港湾 v. 停泊；隐匿",
        "example": ""
      },
      {
        "id": "word-25-8",
        "english": "cruel*",
        "phonetic": "['kru:əl]",
        "partOfSpeech": "a.",
        "chinese": "残忍的，残暴的",
        "example": ""
      },
      {
        "id": "word-26-6",
        "english": "location",
        "phonetic": "/ləuˈkeɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "位置，场所；（电影的）外景拍摄地",
        "example": ""
      },
      {
        "id": "word-25-26",
        "english": "brittle",
        "phonetic": "/ˈbrɪtl/",
        "partOfSpeech": "a.",
        "chinese": "易碎的，易损坏的；靠不住的；冷淡的，不友好的；（声音）尖利的",
        "example": ""
      },
      {
        "id": "word-26-44",
        "english": "acquaintance",
        "phonetic": "/əˈkweɪntəns/",
        "partOfSpeech": "n.",
        "chinese": "熟人；认识，了解",
        "example": ""
      },
      {
        "id": "word-26-18",
        "english": "utterance",
        "phonetic": "[ˈʌtərəns]",
        "partOfSpeech": "n.",
        "chinese": "用言语表达，讲话；话语，言语，言论",
        "example": ""
      },
      {
        "id": "word-26-20",
        "english": "bilingual",
        "phonetic": "/ˏbaɪˈlɪŋgwəl/",
        "partOfSpeech": "a.",
        "chinese": "（说）两种语言的",
        "example": ""
      },
      {
        "id": "word-26-15",
        "english": "generative",
        "phonetic": "/ˈdʒenərətɪv/",
        "partOfSpeech": "a.",
        "chinese": "生殖的，生产的；有生产能力的",
        "example": ""
      },
      {
        "id": "word-26-29",
        "english": "elite*",
        "phonetic": "/eɪˈliːt/",
        "partOfSpeech": "n.",
        "chinese": "精英，中坚 a. 卓越的，精锐的",
        "example": ""
      },
      {
        "id": "word-26-21",
        "english": "substitution",
        "phonetic": "[ˌsʌbstɪ'tju:ʃn]",
        "partOfSpeech": "n.",
        "chinese": "代替，置换；代入法",
        "example": ""
      },
      {
        "id": "word-26-57",
        "english": "bilateral*",
        "phonetic": "/ˏbaɪˈlætərəl/",
        "partOfSpeech": "a.",
        "chinese": "双边的；双方的",
        "example": ""
      },
      {
        "id": "word-26-68",
        "english": "compose",
        "phonetic": "/kəmˈpəuz/",
        "partOfSpeech": "v.",
        "chinese": "组成，构成；写，创作（乐曲等）；使安定",
        "example": ""
      },
      {
        "id": "word-25-23",
        "english": "plateau",
        "phonetic": "/ˈplætəu/",
        "partOfSpeech": "n.",
        "chinese": "高原；（上升后的）稳定时期（或状态）",
        "example": ""
      },
      {
        "id": "word-26-46",
        "english": "guideline*",
        "phonetic": "[ˈgaɪdlaɪn]",
        "partOfSpeech": "n.",
        "chinese": "[常pl.] 指导方针；准则，行动纲领",
        "example": ""
      },
      {
        "id": "word-26-5",
        "english": "manor",
        "phonetic": "/ˈmnə(r)/",
        "partOfSpeech": "n.",
        "chinese": "领地，庄园",
        "example": ""
      },
      {
        "id": "word-26-43",
        "english": "application*",
        "phonetic": "/ˏæplɪˈkeɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "请求，申请（书，表）；应用，运用；施用，敷用",
        "example": ""
      },
      {
        "id": "word-25-69",
        "english": "plaster",
        "phonetic": "/ˈplɑːstə(r)/",
        "partOfSpeech": "n.",
        "chinese": "灰泥，石膏；膏药",
        "example": ""
      },
      {
        "id": "word-26-53",
        "english": "grieve",
        "phonetic": "/griːv/",
        "partOfSpeech": "v.",
        "chinese": "（使）伤心",
        "example": ""
      },
      {
        "id": "word-25-38",
        "english": "voyage",
        "phonetic": "/ˈvɔɪɪdʒ/",
        "partOfSpeech": "n./v.",
        "chinese": "旅行，航行，飞行",
        "example": ""
      },
      {
        "id": "word-26-32",
        "english": "moderate",
        "phonetic": "/ˈmɔdərət/",
        "partOfSpeech": "a.",
        "chinese": "温和的；适度的 /ˈmɔdəreɪt/ v. （使）减轻，缓和；使适中",
        "example": ""
      },
      {
        "id": "word-26-26",
        "english": "duplicate",
        "phonetic": "/ˈdjuːplɪkeɪt/",
        "partOfSpeech": "vt.",
        "chinese": "复制，复写；重复 /ˈdjuːplɪkət/ a. 完全相同的；副本的 n. 复制品",
        "example": ""
      },
      {
        "id": "word-26-58",
        "english": "clinic",
        "phonetic": "/ˈklɪnɪk/",
        "partOfSpeech": "n.",
        "chinese": "门诊部，诊所",
        "example": ""
      },
      {
        "id": "word-26-47",
        "english": "hemisphere",
        "phonetic": "/ˈhemɪsfɪə(r)/",
        "partOfSpeech": "n.",
        "chinese": "（地球的）半球；大脑半球",
        "example": ""
      },
      {
        "id": "word-26-28",
        "english": "adaptation",
        "phonetic": "[ˌædæpˈteɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "适应；改编；改制物",
        "example": ""
      },
      {
        "id": "word-25-9",
        "english": "Nordic",
        "phonetic": "/ˈnɔːdɪk/",
        "partOfSpeech": "a.",
        "chinese": "北欧人的；北欧国家的",
        "example": ""
      },
      {
        "id": "word-26-64",
        "english": "compete*",
        "phonetic": "/kəmˈpiːt/",
        "partOfSpeech": "vi.",
        "chinese": "竞争；比赛",
        "example": ""
      },
      {
        "id": "word-26-17",
        "english": "scrupulous",
        "phonetic": "/ˈskruːpjuləs/",
        "partOfSpeech": "a.",
        "chinese": "多顾虑的，谨慎的（尤指道德方面）；一丝不苟的，严谨的",
        "example": ""
      },
      {
        "id": "word-25-65",
        "english": "bubble",
        "phonetic": "/ˈbʌbl/",
        "partOfSpeech": "vi.",
        "chinese": "冒泡，起泡；发出冒泡的声音 n. 泡，泡沫；气泡；幻想的计划",
        "example": ""
      },
      {
        "id": "word-26-71",
        "english": "bounce",
        "phonetic": "/ˈbauns/",
        "partOfSpeech": "v.",
        "chinese": "弹起，反弹；（使）上下晃动 n. 弹跳；反弹力；活力，精力",
        "example": ""
      },
      {
        "id": "word-26-61",
        "english": "vast*",
        "phonetic": "/vɑːst/",
        "partOfSpeech": "a.",
        "chinese": "巨大的；大量的",
        "example": ""
      },
      {
        "id": "word-25-14",
        "english": "predatory",
        "phonetic": "/ˈpredətrɪ/",
        "partOfSpeech": "a.",
        "chinese": "食肉的；掠夺的",
        "example": ""
      },
      {
        "id": "word-26-11",
        "english": "introspection",
        "phonetic": "[ˌɪntrəˈspekʃn]",
        "partOfSpeech": "n.",
        "chinese": "内省，反省",
        "example": ""
      },
      {
        "id": "word-25-46",
        "english": "attack*",
        "phonetic": "/əˈtæk/",
        "partOfSpeech": "n./v.",
        "chinese": "进攻；抨击；（疾病等）突然发作",
        "example": ""
      },
      {
        "id": "word-25-57",
        "english": "dominate",
        "phonetic": "/ˈdɔmɪneɪt/",
        "partOfSpeech": "v.",
        "chinese": "支配，统治；耸立于",
        "example": ""
      },
      {
        "id": "word-26-59",
        "english": "memorable*",
        "phonetic": "/ˈmemərəbl/",
        "partOfSpeech": "a.",
        "chinese": "容易记住的；难忘的",
        "example": ""
      },
      {
        "id": "word-26-36",
        "english": "addict",
        "phonetic": "/ˈædɪkt/",
        "partOfSpeech": "n.",
        "chinese": "吸毒成瘾的人，有瘾的人，对……入迷的人",
        "example": ""
      },
      {
        "id": "word-26-48",
        "english": "civil",
        "phonetic": "/ˈsɪvl/",
        "partOfSpeech": "a.",
        "chinese": "国民的；民用的；政府的",
        "example": ""
      },
      {
        "id": "word-25-36",
        "english": "inhale*",
        "phonetic": "/ɪnˈheɪl/",
        "partOfSpeech": "v.",
        "chinese": "吸（烟），吸气",
        "example": ""
      },
      {
        "id": "word-26-42",
        "english": "highland",
        "phonetic": "['haɪlənd]",
        "partOfSpeech": "n.",
        "chinese": "高地，高原",
        "example": ""
      },
      {
        "id": "word-25-70",
        "english": "storey",
        "phonetic": "/ˈstɔːrɪ/",
        "partOfSpeech": "n.",
        "chinese": "楼层",
        "example": ""
      },
      {
        "id": "word-25-60",
        "english": "improve*",
        "phonetic": "/ɪmˈpruːv/",
        "partOfSpeech": "v.",
        "chinese": "改善，改进",
        "example": ""
      },
      {
        "id": "word-25-54",
        "english": "shaft*",
        "phonetic": "/ʃɑːft/",
        "partOfSpeech": "n.",
        "chinese": "轴，柄，杆；矛柄，把柄；（光的）束，光线；竖井，（电梯的）升降井",
        "example": ""
      },
      {
        "id": "word-25-66",
        "english": "sample*",
        "phonetic": "/ˈsɑːmpl/",
        "partOfSpeech": "n.",
        "chinese": "样品，样本 vt. 从……抽样，采样；品尝",
        "example": ""
      },
      {
        "id": "word-25-19",
        "english": "adventurous",
        "phonetic": "[ədˈventʃərəs]",
        "partOfSpeech": "a.",
        "chinese": "喜欢冒险的，敢做敢为的；充满危险和刺激的，惊险的",
        "example": ""
      },
      {
        "id": "word-25-64",
        "english": "encounter*",
        "phonetic": "/ɪnˈkauntə(r)/",
        "partOfSpeech": "vt./n.",
        "chinese": "遭遇，遇到",
        "example": ""
      },
      {
        "id": "word-26-1",
        "english": "enterprise*",
        "phonetic": "/ˈentəpraɪz/",
        "partOfSpeech": "n.",
        "chinese": "企业，公司；事业",
        "example": ""
      },
      {
        "id": "word-25-51",
        "english": "operate",
        "phonetic": "/ˈɔpəreɪt/",
        "partOfSpeech": "v.",
        "chinese": "运转；动手术；起作用；操作；经营",
        "example": ""
      },
      {
        "id": "word-26-14",
        "english": "ambiguity",
        "phonetic": "/ˏæmbɪˈgjuːətɪ/",
        "partOfSpeech": "n.",
        "chinese": "模棱两可；不明确",
        "example": ""
      },
      {
        "id": "word-26-41",
        "english": "artefact*",
        "phonetic": "[ˈɑ:tɪfækt]",
        "partOfSpeech": "n.",
        "chinese": "人工制品，手工艺品",
        "example": ""
      },
      {
        "id": "word-26-49",
        "english": "viable*",
        "phonetic": "/ˈvaɪəbl/",
        "partOfSpeech": "a.",
        "chinese": "可行的，可实施的； [生] 能自行生长发育的",
        "example": ""
      },
      {
        "id": "word-25-45",
        "english": "mate*",
        "phonetic": "/meɪt/",
        "partOfSpeech": "v.",
        "chinese": "交配，配种 n. 配偶；伙伴；（商船上的）大副",
        "example": ""
      },
      {
        "id": "word-26-40",
        "english": "intent",
        "phonetic": "/ɪnˈtent/",
        "partOfSpeech": "n.",
        "chinese": "意图，意向，目的 a. 专心的，专注的；急切的",
        "example": ""
      },
      {
        "id": "word-25-31",
        "english": "geological",
        "phonetic": "[ˌdʒi:ə'lɒdʒɪkl]",
        "partOfSpeech": "a.",
        "chinese": "地质的，地质学的",
        "example": ""
      },
      {
        "id": "word-25-59",
        "english": "load",
        "phonetic": "/ləud/",
        "partOfSpeech": "v.",
        "chinese": "装载；装（胶卷、弹药等） n. 负荷；装载",
        "example": ""
      },
      {
        "id": "word-25-35",
        "english": "hybrid*",
        "phonetic": "/ˈhaɪbrɪd/",
        "partOfSpeech": "n.",
        "chinese": "杂交生成的生物体，杂交植物（或动物）；杂种，混血儿；混合物，合成物 a. 杂交产生的；混合的，合成的",
        "example": ""
      },
      {
        "id": "word-26-3",
        "english": "string",
        "phonetic": "/strɪŋ/",
        "partOfSpeech": "n.",
        "chinese": "线；弦；细绳；一串 vt. （用绳等）缚；扎；挂；（用线）串起；使排成一列",
        "example": ""
      },
      {
        "id": "word-26-27",
        "english": "mushroom",
        "phonetic": "/ˈmʌʃrum/",
        "partOfSpeech": "vi.",
        "chinese": "迅速成长（或发展） n. 蘑菇",
        "example": ""
      },
      {
        "id": "word-25-27",
        "english": "collision",
        "phonetic": "/kəˈlɪʒn/",
        "partOfSpeech": "n.",
        "chinese": "碰撞；冲突，抵触",
        "example": ""
      },
      {
        "id": "word-25-41",
        "english": "for",
        "phonetic": "",
        "partOfSpeech": "",
        "chinese": "the sake of 为了",
        "example": ""
      },
      {
        "id": "word-25-43",
        "english": "stance*",
        "phonetic": "/stæns/",
        "partOfSpeech": "n.",
        "chinese": "姿势；观点，立场",
        "example": ""
      },
      {
        "id": "word-26-50",
        "english": "cameral",
        "phonetic": "['kæmərəl]",
        "partOfSpeech": "a.",
        "chinese": "（立法机关）院的",
        "example": ""
      },
      {
        "id": "word-26-45",
        "english": "challenge*",
        "phonetic": "/ˈtʃælɪndʒ/",
        "partOfSpeech": "n.",
        "chinese": "挑战；质疑；艰巨任务，难题 vt. 挑战；质疑",
        "example": ""
      },
      {
        "id": "word-26-69",
        "english": "alley*",
        "phonetic": "/ˈælɪ/",
        "partOfSpeech": "n.",
        "chinese": "小巷；胡同",
        "example": ""
      },
      {
        "id": "word-26-25",
        "english": "hurl",
        "phonetic": "/hɜːl/",
        "partOfSpeech": "vt.",
        "chinese": "猛投，猛摔；大声叫骂",
        "example": ""
      },
      {
        "id": "word-26-72",
        "english": "platform",
        "phonetic": "/ˈplætfɔːm/",
        "partOfSpeech": "n.",
        "chinese": "平台，站台；纲领",
        "example": ""
      },
      {
        "id": "word-26-23",
        "english": "foreseeable",
        "phonetic": "[fɔ:ˈsi:əbl]",
        "partOfSpeech": "a.",
        "chinese": "可预知的，能预测的",
        "example": ""
      },
      {
        "id": "word-26-56",
        "english": "suicidal*",
        "phonetic": "[ˌsu:ɪˈsaɪdl]",
        "partOfSpeech": "a.",
        "chinese": "自杀（性）的；有自杀倾向的",
        "example": ""
      },
      {
        "id": "word-26-39",
        "english": "signpost*",
        "phonetic": "[ˈsaɪnpəʊst]",
        "partOfSpeech": "vt.",
        "chinese": "在……设置路标 n. 路标",
        "example": ""
      },
      {
        "id": "word-25-15",
        "english": "converse",
        "phonetic": "/ˈkɔnvɜːs/",
        "partOfSpeech": "vi.",
        "chinese": "谈话，会谈 /kənˈvɜːs/ a. 逆向的 n. 相反的事物；反面",
        "example": ""
      },
      {
        "id": "word-26-60",
        "english": "dazzle",
        "phonetic": "/ˈdæzl/",
        "partOfSpeech": "v.",
        "chinese": "使目眩；使倾倒 n. 耀眼眩目；令人眼花缭乱的东西",
        "example": ""
      },
      {
        "id": "word-26-34",
        "english": "award*",
        "phonetic": "/əˈwɔːd/",
        "partOfSpeech": "n.",
        "chinese": "奖；评判；授予 vt. 授予；给予",
        "example": ""
      },
      {
        "id": "word-26-65",
        "english": "prescription",
        "phonetic": "/prɪˈskrɪpʃn/",
        "partOfSpeech": "n.",
        "chinese": "处方，药方；开处方，开药方",
        "example": ""
      },
      {
        "id": "word-25-22",
        "english": "convection",
        "phonetic": "/kənˈvekʃn/",
        "partOfSpeech": "n.",
        "chinese": "传送；对流",
        "example": ""
      },
      {
        "id": "word-25-50",
        "english": "anticipate*",
        "phonetic": "/ænˈtɪsɪpeɪt/",
        "partOfSpeech": "v.",
        "chinese": "预期，预料，期望；先于……行动",
        "example": ""
      },
      {
        "id": "word-26-22",
        "english": "mundane",
        "phonetic": "/mʌnˈdeɪn/",
        "partOfSpeech": "a.",
        "chinese": "世界的；世俗的，现世的；平淡的",
        "example": ""
      },
      {
        "id": "word-26-66",
        "english": "crude",
        "phonetic": "/kruːd/",
        "partOfSpeech": "a.",
        "chinese": "天然的；粗糙的；粗俗的",
        "example": ""
      },
      {
        "id": "word-25-30",
        "english": "predictable",
        "phonetic": "[prɪˈdɪktəbl]",
        "partOfSpeech": "a.",
        "chinese": "可预言的，可预报的；按老一套办事的，墨守成规的",
        "example": ""
      },
      {
        "id": "word-26-37",
        "english": "restrain",
        "phonetic": "/rɪˈstreɪn/",
        "partOfSpeech": "vt.",
        "chinese": "阻止；抑制",
        "example": ""
      },
      {
        "id": "word-25-21",
        "english": "impoverish",
        "phonetic": "/ɪmˈpɔvərɪʃ/",
        "partOfSpeech": "vt.",
        "chinese": "使贫困；使枯竭，使贫瘠",
        "example": ""
      },
      {
        "id": "word-25-11",
        "english": "womb*",
        "phonetic": "/wuːm/",
        "partOfSpeech": "n.",
        "chinese": "子宫；发源地",
        "example": ""
      },
      {
        "id": "word-26-70",
        "english": "dolphin",
        "phonetic": "/ˈdɔlfɪn/",
        "partOfSpeech": "n.",
        "chinese": "海豚",
        "example": ""
      },
      {
        "id": "word-26-24",
        "english": "invoke",
        "phonetic": "/ɪnˈvəuk/",
        "partOfSpeech": "vt.",
        "chinese": "恳求，祈求；援用，援引；使用，应用",
        "example": ""
      },
      {
        "id": "word-26-62",
        "english": "underground*",
        "phonetic": "/ˈʌndəgraund/",
        "partOfSpeech": "a.",
        "chinese": "地下的 n. 地铁 /ˏʌndəˈgraund/ ad. 在地（面）下",
        "example": ""
      },
      {
        "id": "word-25-49",
        "english": "mass",
        "phonetic": "/mæs/",
        "partOfSpeech": "a.",
        "chinese": "大量的 n. 团，众多；[植] 质量； [pl.] 群众，民众 v. 聚焦",
        "example": ""
      },
      {
        "id": "word-26-67",
        "english": "vary",
        "phonetic": "/ˈveərɪ/",
        "partOfSpeech": "v.",
        "chinese": "改变；（使）多样化；变化；不同",
        "example": ""
      },
      {
        "id": "word-26-63",
        "english": "scholar*",
        "phonetic": "/ˈskɔlə(r)/",
        "partOfSpeech": "n.",
        "chinese": "学者；奖学金获得者",
        "example": ""
      },
      {
        "id": "word-25-48",
        "english": "flora*",
        "phonetic": "/ˈflɔːrə/",
        "partOfSpeech": "n.",
        "chinese": "（某地区或时期的）一切植物，植物群",
        "example": ""
      },
      {
        "id": "word-26-8",
        "english": "irresistible",
        "phonetic": "/ˏɪrɪˈzɪstəbl/",
        "partOfSpeech": "a.",
        "chinese": "无法抵抗的，不能压制的；不能自己的",
        "example": ""
      },
      {
        "id": "word-25-32",
        "english": "halve*",
        "phonetic": "/hɑːv/",
        "partOfSpeech": "v.",
        "chinese": "二等分，减半",
        "example": ""
      },
      {
        "id": "word-25-24",
        "english": "crust",
        "phonetic": "/krʌst/",
        "partOfSpeech": "n.",
        "chinese": "硬层，硬表面，地壳；（一片）面包皮",
        "example": ""
      },
      {
        "id": "word-25-25",
        "english": "overlie",
        "phonetic": "[ˌəʊvə'laɪ]",
        "partOfSpeech": "v.",
        "chinese": "躺在……上面；置于……上面",
        "example": ""
      },
      {
        "id": "word-25-37",
        "english": "decibel*",
        "phonetic": "/ˈdesɪbel/",
        "partOfSpeech": "n.",
        "chinese": "分贝",
        "example": ""
      },
      {
        "id": "word-26-52",
        "english": "venue",
        "phonetic": "/ˈvenjuː/",
        "partOfSpeech": "n.",
        "chinese": "（聚焦、审判、比赛等的）地点",
        "example": ""
      },
      {
        "id": "word-25-2",
        "english": "cease*",
        "phonetic": "/siːs/",
        "partOfSpeech": "v.",
        "chinese": "停止，终止",
        "example": ""
      },
      {
        "id": "word-25-13",
        "english": "manoeuvre",
        "phonetic": "/məˈnuːvə(r)/",
        "partOfSpeech": "n.",
        "chinese": "移动；策略，手段 v. 移动，转动；操纵，控制",
        "example": ""
      },
      {
        "id": "word-25-42",
        "english": "relieve",
        "phonetic": "/rɪˈliːv/",
        "partOfSpeech": "vt.",
        "chinese": "救济；缓解",
        "example": ""
      },
      {
        "id": "word-26-54",
        "english": "studio",
        "phonetic": "/ˈstjuːdɪəu/",
        "partOfSpeech": "n.",
        "chinese": "工作室；摄影室；练习室",
        "example": ""
      },
      {
        "id": "word-25-7",
        "english": "negotiate",
        "phonetic": "/nɪˈgəuʃɪeɪt/",
        "partOfSpeech": "v.",
        "chinese": "洽谈，协商；商定，达成；顺利通过",
        "example": ""
      },
      {
        "id": "word-26-38",
        "english": "reproduce*",
        "phonetic": "/ˏriːprəˈdjuːs/",
        "partOfSpeech": "v.",
        "chinese": "繁殖，生育；复制，仿造，翻版；再现，使……在脑海中重现",
        "example": ""
      },
      {
        "id": "word-25-1",
        "english": "dusk",
        "phonetic": "/dʌsk/",
        "partOfSpeech": "n.",
        "chinese": "薄暮，黄昏",
        "example": ""
      },
      {
        "id": "word-25-58",
        "english": "instrumental",
        "phonetic": "/ˏɪnstruˈmentl/",
        "partOfSpeech": "a.",
        "chinese": "有帮助的，起作用的；用乐器演奏的",
        "example": ""
      },
      {
        "id": "word-25-55",
        "english": "channel*",
        "phonetic": "/ˈtʃænl/",
        "partOfSpeech": "n.",
        "chinese": "频道； [常pl.] 渠道，途径；沟渠；海峡，水道；航道",
        "example": ""
      },
      {
        "id": "word-26-55",
        "english": "inhabitant",
        "phonetic": "[ɪnˈhæbɪtənt]",
        "partOfSpeech": "n.",
        "chinese": "居民，住户，居住者；栖息的动物",
        "example": ""
      },
      {
        "id": "word-25-52",
        "english": "bypass",
        "phonetic": "/ˈbaɪpɑːs/",
        "partOfSpeech": "n.",
        "chinese": "（绕过市镇的）旁道 vt. 绕过",
        "example": ""
      },
      {
        "id": "word-25-29",
        "english": "pumice",
        "phonetic": "/ˈpʌmɪs/",
        "partOfSpeech": "n.",
        "chinese": "浮石，浮岩 vt. 用浮岩磨",
        "example": ""
      },
      {
        "id": "word-25-56",
        "english": "determine*",
        "phonetic": "/dɪˈtɜːmɪn/",
        "partOfSpeech": "v.",
        "chinese": "确定；决定；（使）下决心",
        "example": ""
      },
      {
        "id": "word-26-2",
        "english": "verify*",
        "phonetic": "/ˈverɪfaɪ/",
        "partOfSpeech": "vt.",
        "chinese": "证明；证实",
        "example": ""
      }
    ],
    "article": "In the field of Economic Development, researchers have been studying various phenomena to understand their implications. The concept of discredit* has been widely discussed in recent studies. The concept of abolish has been widely discussed in recent studies. The concept of conduct* has been widely discussed in recent studies. The concept of accountant has been widely discussed in recent studies. The concept of context has been widely discussed in recent studies. The concept of cherry* has been widely discussed in recent studies. The concept of gigantic has been widely discussed in recent studies. The concept of up-to-date has been widely discussed in recent studies. The concept of litter has been widely discussed in recent studies. The concept of exploitative has been widely discussed in recent studies. Researchers have found that these factors play a significant role in shaping our understanding of the subject. Further studies are needed to explore the full implications of these findings."
  },
  {
    "id": "unit-14",
    "name": "Unit 14: Word Lists 27 & 28",
    "words": [
      {
        "id": "word-28-63",
        "english": "extra*",
        "phonetic": "/ˈekstrə/",
        "partOfSpeech": "a.",
        "chinese": "额外的；特别的 ad. 额外地，另外；特别地",
        "example": ""
      },
      {
        "id": "word-27-21",
        "english": "cuisine",
        "phonetic": "/kwɪˈziːn/",
        "partOfSpeech": "n.",
        "chinese": "烹饪；烹调法，烹调风格；菜肴",
        "example": ""
      },
      {
        "id": "word-27-14",
        "english": "apportion",
        "phonetic": "/əˈpɔːʃn/",
        "partOfSpeech": "vt.",
        "chinese": "分派，（按比例或计划）分配",
        "example": ""
      },
      {
        "id": "word-27-37",
        "english": "perpetual",
        "phonetic": "/pəˈpetʃuəl/",
        "partOfSpeech": "a.",
        "chinese": "连续不断的；长期的；永久的",
        "example": ""
      },
      {
        "id": "word-27-24",
        "english": "unparalleled",
        "phonetic": "/ʌnˈpærəleld/",
        "partOfSpeech": "a.",
        "chinese": "无双的，无比的，空前的",
        "example": ""
      },
      {
        "id": "word-27-69",
        "english": "loop*",
        "phonetic": "/luːp/",
        "partOfSpeech": "n.",
        "chinese": "圈环；环状物；环路；循环 v. （使）成环，（使）成圈；成环形运动",
        "example": ""
      },
      {
        "id": "word-27-4",
        "english": "identify*",
        "phonetic": "/aɪˈdentɪfaɪ/",
        "partOfSpeech": "v.",
        "chinese": "认出，识别；辨别；查明；确定；视……（与……）为同一事物",
        "example": ""
      },
      {
        "id": "word-27-38",
        "english": "contradict",
        "phonetic": "/ˏkɔntrəˈdɪkt/",
        "partOfSpeech": "v.",
        "chinese": "反驳，驳斥；与……发生矛盾；相抵触",
        "example": ""
      },
      {
        "id": "word-27-58",
        "english": "essential",
        "phonetic": "/ɪˈsenʃl/",
        "partOfSpeech": "a.",
        "chinese": "本质的，基本的；必要的，必不可少的；极其重要的 n. 要素；实质，本质；要点",
        "example": ""
      },
      {
        "id": "word-27-16",
        "english": "exhaustible",
        "phonetic": "[ɪg'zɔ:stəbl]",
        "partOfSpeech": "a.",
        "chinese": "可耗尽的，会枯竭的",
        "example": ""
      },
      {
        "id": "word-27-68",
        "english": "inference",
        "phonetic": "[ˈɪnfərəns]",
        "partOfSpeech": "n.",
        "chinese": "推论；推断",
        "example": ""
      },
      {
        "id": "word-28-49",
        "english": "mountainous*",
        "phonetic": "[ˈmaʊntənəs]",
        "partOfSpeech": "a.",
        "chinese": "多山的",
        "example": ""
      },
      {
        "id": "word-28-46",
        "english": "uncertainty*",
        "phonetic": "[ʌn'sɜ:tntɪ]",
        "partOfSpeech": "n.",
        "chinese": "犹豫，迟疑；不确定；无把握",
        "example": ""
      },
      {
        "id": "word-27-36",
        "english": "dissemination*",
        "phonetic": "[dɪˌsemɪ'neɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "散布，传播",
        "example": ""
      },
      {
        "id": "word-28-71",
        "english": "spiritual",
        "phonetic": "/ˈspɪrɪtʃuəl/",
        "partOfSpeech": "a.",
        "chinese": "精神的；心灵的；宗教的",
        "example": ""
      },
      {
        "id": "word-27-64",
        "english": "slurry*",
        "phonetic": "/ˈslʌrɪ/",
        "partOfSpeech": "n.",
        "chinese": "泥浆",
        "example": ""
      },
      {
        "id": "word-27-9",
        "english": "painstaking",
        "phonetic": "[ˈpeɪnzteɪkɪŋ]",
        "partOfSpeech": "a.",
        "chinese": "需细心的，辛苦的，煞费苦心的；勤勉的；刻苦的 n. 辛苦；勤勉；刻苦",
        "example": ""
      },
      {
        "id": "word-28-70",
        "english": "microprocessor*",
        "phonetic": "[ˌmaɪkrəʊˈprəʊsesə(r)]",
        "partOfSpeech": "n.",
        "chinese": "微处理器",
        "example": ""
      },
      {
        "id": "word-28-38",
        "english": "post-mortem",
        "phonetic": "/ˏpəust",
        "partOfSpeech": "",
        "chinese": "ˈmɔːtəm/ a. 事后的 n. 检尸，尸体解剖；事后反思（或剖析）",
        "example": ""
      },
      {
        "id": "word-28-65",
        "english": "analyse*",
        "phonetic": "/ˈænəlaɪz/",
        "partOfSpeech": "vt.",
        "chinese": "分析；分解",
        "example": ""
      },
      {
        "id": "word-28-57",
        "english": "bulletin*",
        "phonetic": "/ˈbulətɪn/",
        "partOfSpeech": "n.",
        "chinese": "（报纸、电台等的）新闻简报；公告；学报；期刊（尤指机关刊物）",
        "example": ""
      },
      {
        "id": "word-27-33",
        "english": "spite",
        "phonetic": "/spaɪt/",
        "partOfSpeech": "n.",
        "chinese": "恶意，怨恨",
        "example": ""
      },
      {
        "id": "word-27-48",
        "english": "wire*",
        "phonetic": "/ˈwaɪə(r)/",
        "partOfSpeech": "n.",
        "chinese": "金属丝；电线",
        "example": ""
      },
      {
        "id": "word-27-13",
        "english": "outlook",
        "phonetic": "/ˈautluk/",
        "partOfSpeech": "n.",
        "chinese": "观点，见解；展望，前景",
        "example": ""
      },
      {
        "id": "word-28-37",
        "english": "facade*",
        "phonetic": "/fəˈsɑːd/",
        "partOfSpeech": "n.",
        "chinese": "正面；（虚伪的）外表",
        "example": ""
      },
      {
        "id": "word-28-69",
        "english": "breakthrough",
        "phonetic": "[ˈbreɪkθru:]",
        "partOfSpeech": "n.",
        "chinese": "突破；重大进展",
        "example": ""
      },
      {
        "id": "word-28-60",
        "english": "subscribe*",
        "phonetic": "/səbˈskraɪb/",
        "partOfSpeech": "v.",
        "chinese": "订阅，订购；申请，预订",
        "example": ""
      },
      {
        "id": "word-28-15",
        "english": "scamper",
        "phonetic": "/ˈskæmpə(r)/",
        "partOfSpeech": "vi.",
        "chinese": "奔跑，快跑",
        "example": ""
      },
      {
        "id": "word-27-34",
        "english": "passport*",
        "phonetic": "/ˈpɑːspɔːt/",
        "partOfSpeech": "n.",
        "chinese": "护照；途径，路子，手段",
        "example": ""
      },
      {
        "id": "word-27-75",
        "english": "enquiry",
        "phonetic": "[ɪn'kwaɪərɪ]",
        "partOfSpeech": "n.",
        "chinese": "询问；调查；探索",
        "example": ""
      },
      {
        "id": "word-27-7",
        "english": "excitement*",
        "phonetic": "/ɪkˈsaɪtmənt/",
        "partOfSpeech": "n.",
        "chinese": "激动；兴奋；令人兴奋的事",
        "example": ""
      },
      {
        "id": "word-28-29",
        "english": "banner*",
        "phonetic": "/ˈbænə(r)/",
        "partOfSpeech": "n.",
        "chinese": "横幅；旗帜",
        "example": ""
      },
      {
        "id": "word-27-3",
        "english": "characteristic*",
        "phonetic": "/ˏkærəktəˈrɪstɪk/",
        "partOfSpeech": "n.",
        "chinese": "特性；特征 a. 特有的；典型的",
        "example": ""
      },
      {
        "id": "word-28-22",
        "english": "barrage",
        "phonetic": "/ˈbærɑːʒ/",
        "partOfSpeech": "n.",
        "chinese": "弹幕射击；火力网",
        "example": ""
      },
      {
        "id": "word-27-15",
        "english": "finitude",
        "phonetic": "['faɪnɪtju:d]",
        "partOfSpeech": "n.",
        "chinese": "有限；限定，界限",
        "example": ""
      },
      {
        "id": "word-28-62",
        "english": "invoice*",
        "phonetic": "/ˈɪnvɔɪs/",
        "partOfSpeech": "n.",
        "chinese": "发票 vt. 给……开发票",
        "example": ""
      },
      {
        "id": "word-28-7",
        "english": "animate",
        "phonetic": "/ˈænɪmət/",
        "partOfSpeech": "a.",
        "chinese": "活的，有生命的 /ˈænɪmeɪt/ vt. 赋予生命；使生机勃勃",
        "example": ""
      },
      {
        "id": "word-28-73",
        "english": "generalise",
        "phonetic": "/ˈdʒenrəlaɪz/",
        "partOfSpeech": "v.",
        "chinese": "概括；推广",
        "example": ""
      },
      {
        "id": "word-27-72",
        "english": "aptitude*",
        "phonetic": "/ˈæptɪtjuːd/",
        "partOfSpeech": "n.",
        "chinese": "天资，天赋，天生的才能",
        "example": ""
      },
      {
        "id": "word-28-52",
        "english": "dramatic*",
        "phonetic": "/drəˈmætɪk/",
        "partOfSpeech": "a.",
        "chinese": "引人注目的；戏剧性的；激动人心的；戏剧的",
        "example": ""
      },
      {
        "id": "word-27-59",
        "english": "urge",
        "phonetic": "/ɜːdʒ/",
        "partOfSpeech": "v.",
        "chinese": "敦促，力劝；鼓励；竭力主张",
        "example": ""
      },
      {
        "id": "word-27-12",
        "english": "coherent",
        "phonetic": "[kəʊ'hɪərənt]",
        "partOfSpeech": "a.",
        "chinese": "条理清楚的，连贯的；一致的，协调的",
        "example": ""
      },
      {
        "id": "word-28-54",
        "english": "solve*",
        "phonetic": "/sɔlv/",
        "partOfSpeech": "vt.",
        "chinese": "解答；解决",
        "example": ""
      },
      {
        "id": "word-27-63",
        "english": "apply*",
        "phonetic": "/əˈplaɪ/",
        "partOfSpeech": "v.",
        "chinese": "申请；应用，使用；涉及",
        "example": ""
      },
      {
        "id": "word-27-17",
        "english": "revelation",
        "phonetic": "/ˏrevəˈleɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "被揭示的真相，（惊人的）新发现；揭示，显示；泄露",
        "example": ""
      },
      {
        "id": "word-27-40",
        "english": "column",
        "phonetic": "/ˈkɔləm/",
        "partOfSpeech": "n.",
        "chinese": "柱；柱状物；专栏（文章），栏目",
        "example": ""
      },
      {
        "id": "word-27-10",
        "english": "pursuit",
        "phonetic": "/pəˈsjuːt/",
        "partOfSpeech": "n.",
        "chinese": "追求，寻求； [常pl.] 花时间和精力等做的事；消遣，爱好",
        "example": ""
      },
      {
        "id": "word-27-2",
        "english": "appoint",
        "phonetic": "/əˈpɔɪnt/",
        "partOfSpeech": "vt.",
        "chinese": "任命，委任；指定（时间、地点等）",
        "example": ""
      },
      {
        "id": "word-28-28",
        "english": "astronaut*",
        "phonetic": "/ˈæstrənɔːt/",
        "partOfSpeech": "n.",
        "chinese": "宇航员",
        "example": ""
      },
      {
        "id": "word-28-56",
        "english": "glimpse",
        "phonetic": "/glɪmps/",
        "partOfSpeech": "vt.",
        "chinese": "瞥见 n. 一瞥，一看",
        "example": ""
      },
      {
        "id": "word-28-24",
        "english": "transition",
        "phonetic": "/trænˈzɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "过渡，过渡时期；转变，转换，变革",
        "example": ""
      },
      {
        "id": "word-28-44",
        "english": "statistically*",
        "phonetic": "[stə'tɪstɪklɪ]",
        "partOfSpeech": "ad.",
        "chinese": "统计上地",
        "example": ""
      },
      {
        "id": "word-27-25",
        "english": "opulence",
        "phonetic": "['ɒpjələns]",
        "partOfSpeech": "n.",
        "chinese": "财富，富裕；丰富，富饶",
        "example": ""
      },
      {
        "id": "word-27-44",
        "english": "flexible",
        "phonetic": "/ˈfleksəbl/",
        "partOfSpeech": "a.",
        "chinese": "易弯曲的；柔韧的；灵活的",
        "example": ""
      },
      {
        "id": "word-28-19",
        "english": "regurgitate",
        "phonetic": "/rɪˈgɜːdʒɪteɪt/",
        "partOfSpeech": "vt.",
        "chinese": "涌回，流回；[动] （使）反胃，将（咽下的食物）返回到口中，反刍",
        "example": ""
      },
      {
        "id": "word-27-66",
        "english": "attempt*",
        "phonetic": "/əˈtempt/",
        "partOfSpeech": "n./v.",
        "chinese": "尝试，试图；努力",
        "example": ""
      },
      {
        "id": "word-27-22",
        "english": "reputable",
        "phonetic": "/ˈrepjutəbl/",
        "partOfSpeech": "a.",
        "chinese": "名声好的，高尚的；受尊敬的；值得信赖的",
        "example": ""
      },
      {
        "id": "word-27-61",
        "english": "cereal",
        "phonetic": "/ˈsɪərɪəl/",
        "partOfSpeech": "n.",
        "chinese": "谷类植物；谷物；谷类食物",
        "example": ""
      },
      {
        "id": "word-28-66",
        "english": "acoustic",
        "phonetic": "/əˈkuːstɪk/",
        "partOfSpeech": "a.",
        "chinese": "原声的；声音（学）的；听觉的",
        "example": ""
      },
      {
        "id": "word-28-8",
        "english": "accountancy",
        "phonetic": "[əˈkaʊntənsi]",
        "partOfSpeech": "n.",
        "chinese": "会计工作，会计职业",
        "example": ""
      },
      {
        "id": "word-27-32",
        "english": "mysterious*",
        "phonetic": "/mɪˈstɪərɪəs/",
        "partOfSpeech": "a.",
        "chinese": "神秘的，诡秘的",
        "example": ""
      },
      {
        "id": "word-28-31",
        "english": "technique",
        "phonetic": "/tekˈniːk/",
        "partOfSpeech": "n.",
        "chinese": "技巧，技艺；技术，技能",
        "example": ""
      },
      {
        "id": "word-28-5",
        "english": "skull",
        "phonetic": "/skʌl/",
        "partOfSpeech": "n.",
        "chinese": "颅骨；脑袋",
        "example": ""
      },
      {
        "id": "word-28-1",
        "english": "lawsuit",
        "phonetic": "[ˈlɔ:su:t]",
        "partOfSpeech": "n.",
        "chinese": "诉讼，起诉",
        "example": ""
      },
      {
        "id": "word-28-72",
        "english": "concrete*",
        "phonetic": "/ˈkɔŋkriːt/",
        "partOfSpeech": "a.",
        "chinese": "混凝土制的；确实的，具体的；有形的，实在的 n. 混凝土",
        "example": ""
      },
      {
        "id": "word-28-33",
        "english": "petrol",
        "phonetic": "/ˈpetrəl/",
        "partOfSpeech": "n.",
        "chinese": "汽油",
        "example": ""
      },
      {
        "id": "word-28-67",
        "english": "stall",
        "phonetic": "/stɔːl/",
        "partOfSpeech": "n.",
        "chinese": "货摊；小隔间",
        "example": ""
      },
      {
        "id": "word-27-55",
        "english": "conceal",
        "phonetic": "/kənˈsiːl/",
        "partOfSpeech": "vt.",
        "chinese": "隐藏；隐瞒；掩盖",
        "example": ""
      },
      {
        "id": "word-27-67",
        "english": "jaw*",
        "phonetic": "/dʒɔː/",
        "partOfSpeech": "n.",
        "chinese": "颌",
        "example": ""
      },
      {
        "id": "word-27-47",
        "english": "racket",
        "phonetic": "/ˈrækɪt/",
        "partOfSpeech": "n.",
        "chinese": "（网球、羽毛球等的）球拍",
        "example": ""
      },
      {
        "id": "word-28-55",
        "english": "blade*",
        "phonetic": "/bleɪd/",
        "partOfSpeech": "n.",
        "chinese": "刀片；桨叶；（草的）叶片",
        "example": ""
      },
      {
        "id": "word-28-30",
        "english": "ounce",
        "phonetic": "/auns/",
        "partOfSpeech": "n.",
        "chinese": "盎司",
        "example": ""
      },
      {
        "id": "word-28-14",
        "english": "receipt",
        "phonetic": "/rɪˈsiːt/",
        "partOfSpeech": "n.",
        "chinese": "收到，接到；发票，收据； [pl.] 收入，进款",
        "example": ""
      },
      {
        "id": "word-28-18",
        "english": "scout",
        "phonetic": "/ˈskaut/",
        "partOfSpeech": "n.",
        "chinese": "侦察员（或机、舰）；童子军 v. 侦察；寻找；搜索",
        "example": ""
      },
      {
        "id": "word-28-42",
        "english": "stockpile*",
        "phonetic": "['stɒkpaɪl]",
        "partOfSpeech": "n.",
        "chinese": "囤聚的物资 vt. 大量贮备",
        "example": ""
      },
      {
        "id": "word-28-68",
        "english": "cover",
        "phonetic": "/ˈkʌvə(r)/",
        "partOfSpeech": "vt.",
        "chinese": "盖，覆盖；包含，包括；走过（一段路）；适用于；报道，采访；给……上保险，足够支付；用枪掩护 n. 盖子，套子；封面；掩蔽（物），掩护（物）",
        "example": ""
      },
      {
        "id": "word-28-34",
        "english": "squeeze",
        "phonetic": "/skwiːz/",
        "partOfSpeech": "v.",
        "chinese": "压榨，榨取；捏，挤压；挤入，挤过；向……勒索 n. 挤压，捏；紧缺，拮据，经济困难；减少，削减",
        "example": ""
      },
      {
        "id": "word-27-62",
        "english": "existence*",
        "phonetic": "[ɪɡ'zɪstəns]",
        "partOfSpeech": "n.",
        "chinese": "存在；生活（方式）",
        "example": ""
      },
      {
        "id": "word-27-20",
        "english": "indispensable",
        "phonetic": "/ˏɪndɪˈspensəbl/",
        "partOfSpeech": "a.",
        "chinese": "必不可少的，必需的",
        "example": ""
      },
      {
        "id": "word-28-21",
        "english": "ejection",
        "phonetic": "[ɪ'dʒekʃn]",
        "partOfSpeech": "n.",
        "chinese": "喷出；排出物",
        "example": ""
      },
      {
        "id": "word-27-71",
        "english": "linguistic*",
        "phonetic": "/lɪŋˈgwɪstɪk/",
        "partOfSpeech": "a.",
        "chinese": "语言的；语言学的",
        "example": ""
      },
      {
        "id": "word-27-60",
        "english": "feasible",
        "phonetic": "/ˈfiːzəbl/",
        "partOfSpeech": "a.",
        "chinese": "可行的，可能的；可做的，可实行的",
        "example": ""
      },
      {
        "id": "word-28-16",
        "english": "spiral",
        "phonetic": "/ˈspaɪərəl/",
        "partOfSpeech": "a.",
        "chinese": "螺旋形的，盘旋的 v. 盘旋上升（或下降）",
        "example": ""
      },
      {
        "id": "word-28-43",
        "english": "indicate*",
        "phonetic": "/ˈɪndɪkeɪt/",
        "partOfSpeech": "v.",
        "chinese": "标示，表示，表明；象征；暗示，示意",
        "example": ""
      },
      {
        "id": "word-27-52",
        "english": "adopt*",
        "phonetic": "/əˈdɔpt/",
        "partOfSpeech": "v.",
        "chinese": "采用，采取，采纳；收养，领养；正式通过，批准",
        "example": ""
      },
      {
        "id": "word-27-56",
        "english": "compromise",
        "phonetic": "/ˈkɔmprəmaɪz/",
        "partOfSpeech": "n.",
        "chinese": "妥协，折中办法 v. 妥协，放弃（原则、理想等）；危及",
        "example": ""
      },
      {
        "id": "word-27-18",
        "english": "resistance",
        "phonetic": "/rɪˈzɪstəns/",
        "partOfSpeech": "n.",
        "chinese": "反抗，抵制；抵抗力，抵抗性；阻力；电阻",
        "example": ""
      },
      {
        "id": "word-28-64",
        "english": "transmute*",
        "phonetic": "/trænzˈmjuːt/; {trænsˈmjuːt}",
        "partOfSpeech": "v.",
        "chinese": "改变；（使）变化，变形，变质",
        "example": ""
      },
      {
        "id": "word-28-26",
        "english": "ingredient",
        "phonetic": "/ɪnˈgriːdɪənt/",
        "partOfSpeech": "n.",
        "chinese": "（混合物的）组成部分，成分；（烹调的）原料；（构成）要素，因素",
        "example": ""
      },
      {
        "id": "word-27-26",
        "english": "supersede",
        "phonetic": "/ˏsuːpəˈsiːd/",
        "partOfSpeech": "vt.",
        "chinese": "代替，取代",
        "example": ""
      },
      {
        "id": "word-27-11",
        "english": "humanistic",
        "phonetic": "[ˌhju:mə'nɪstɪk]",
        "partOfSpeech": "a.",
        "chinese": "人文主义的，人性的",
        "example": ""
      },
      {
        "id": "word-27-5",
        "english": "altitude",
        "phonetic": "/ˈæltɪtjuːd/",
        "partOfSpeech": "n.",
        "chinese": "海拔，高度； [pl.] 高地，高处",
        "example": ""
      },
      {
        "id": "word-27-1",
        "english": "atmosphere*",
        "phonetic": "/ˈætməsfɪə(r)/",
        "partOfSpeech": "n.",
        "chinese": "大气；气氛；环境",
        "example": ""
      },
      {
        "id": "word-27-8",
        "english": "contradiction",
        "phonetic": "[ˌkɒntrəˈdɪkʃn]",
        "partOfSpeech": "n.",
        "chinese": "矛盾，不一致；否认，反驳",
        "example": ""
      },
      {
        "id": "word-28-4",
        "english": "universe",
        "phonetic": "/ˈjuːnɪvɜːs/",
        "partOfSpeech": "n.",
        "chinese": "宇宙，天地万物；世界；领域",
        "example": ""
      },
      {
        "id": "word-28-58",
        "english": "annoy",
        "phonetic": "/əˈnɔɪ/",
        "partOfSpeech": "vt.",
        "chinese": "使烦恼；打搅",
        "example": ""
      },
      {
        "id": "word-27-23",
        "english": "overshadow",
        "phonetic": "/ˏəuvəˈʃædəu/",
        "partOfSpeech": "vt.",
        "chinese": "给……蒙上阴影；使扫兴；使黯然失色",
        "example": ""
      },
      {
        "id": "word-28-48",
        "english": "ultraclean*",
        "phonetic": "['ʌltrəkli:n]",
        "partOfSpeech": "a.",
        "chinese": "超净的，特净的",
        "example": ""
      },
      {
        "id": "word-27-29",
        "english": "poisonous*",
        "phonetic": "[ˈpɔɪzənəs]",
        "partOfSpeech": "a.",
        "chinese": "有毒的，有害的；恶毒的，邪恶的",
        "example": ""
      },
      {
        "id": "word-28-27",
        "english": "friction",
        "phonetic": "/ˈfrɪkʃn/",
        "partOfSpeech": "n.",
        "chinese": "摩擦（力）；矛盾，冲突",
        "example": ""
      },
      {
        "id": "word-27-41",
        "english": "source",
        "phonetic": "/sɔːs/",
        "partOfSpeech": "n.",
        "chinese": "来源，出处；（河的）源头，发源地；根源，起源",
        "example": ""
      },
      {
        "id": "word-28-13",
        "english": "audit",
        "phonetic": "/ˈɔːdɪt/",
        "partOfSpeech": "vt.",
        "chinese": "审计，查账；旁听 n. 审计，查账",
        "example": ""
      },
      {
        "id": "word-28-36",
        "english": "arboreal",
        "phonetic": "/ɑːˈbɔːrɪəl/",
        "partOfSpeech": "a.",
        "chinese": "树木的；栖于树木的",
        "example": ""
      },
      {
        "id": "word-27-30",
        "english": "strip",
        "phonetic": "/strɪp/",
        "partOfSpeech": "v.",
        "chinese": "剥夺；夺去，使空无一物；拆卸，拆开 n. 带状物；条纹；狭长地带，带状水域",
        "example": ""
      },
      {
        "id": "word-27-6",
        "english": "possess",
        "phonetic": "/pəˈzes/",
        "partOfSpeech": "vt.",
        "chinese": "具有；拥有",
        "example": ""
      },
      {
        "id": "word-27-73",
        "english": "lava*",
        "phonetic": "/ˈlɑːvə/",
        "partOfSpeech": "n.",
        "chinese": "岩浆，熔岩",
        "example": ""
      },
      {
        "id": "word-28-3",
        "english": "prescribe",
        "phonetic": "/prɪˈskraɪb/",
        "partOfSpeech": "v.",
        "chinese": "开处方，开药；规定，指示",
        "example": ""
      },
      {
        "id": "word-28-17",
        "english": "encode",
        "phonetic": "/ɪnˈkəud/",
        "partOfSpeech": "vt.",
        "chinese": "把（电文等）译成电码（或密码），把……编码",
        "example": ""
      },
      {
        "id": "word-27-27",
        "english": "exploitation",
        "phonetic": "[ˌeksplɔɪˈteɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "开采，开发；剥削，榨取；自私的利用",
        "example": ""
      },
      {
        "id": "word-27-74",
        "english": "premier",
        "phonetic": "/ˈpremɪə(r)/",
        "partOfSpeech": "n.",
        "chinese": "总理；首相 a. 首要的，第一位的；最著名的",
        "example": ""
      },
      {
        "id": "word-27-51",
        "english": "aeronautics*",
        "phonetic": "/ˏeərəˈnɔːtɪks/",
        "partOfSpeech": "n.",
        "chinese": "航空学",
        "example": ""
      },
      {
        "id": "word-28-6",
        "english": "domination",
        "phonetic": "[ˌdɒmɪ'neɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "控制，统治，支配",
        "example": ""
      },
      {
        "id": "word-28-11",
        "english": "solicitor",
        "phonetic": "/səˈlɪsɪtə(r)/",
        "partOfSpeech": "n.",
        "chinese": "（城镇的）法务官；初级律师，事务律师",
        "example": ""
      },
      {
        "id": "word-28-39",
        "english": "disillusionment*",
        "phonetic": "[ˌdɪsɪˈlu:ʒnmənt]",
        "partOfSpeech": "n.",
        "chinese": "幻灭；觉醒，醒悟",
        "example": ""
      },
      {
        "id": "word-28-2",
        "english": "pack*",
        "phonetic": "/pæk/",
        "partOfSpeech": "v.",
        "chinese": "（把……）打包，收拾（行李）；包装，包裹；塞满 n. 包",
        "example": ""
      },
      {
        "id": "word-27-65",
        "english": "admission",
        "phonetic": "/ədˈmɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "允许进入，加入权，进入权；招供，招认；入场券",
        "example": ""
      },
      {
        "id": "word-27-45",
        "english": "penalty",
        "phonetic": "/ˈpenltɪ/",
        "partOfSpeech": "n.",
        "chinese": "惩罚；罚金",
        "example": ""
      },
      {
        "id": "word-27-28",
        "english": "passionate",
        "phonetic": "/ˈpæʃənət/",
        "partOfSpeech": "a.",
        "chinese": "充满激情的，热切的，狂热的",
        "example": ""
      },
      {
        "id": "word-28-47",
        "english": "hypothesis",
        "phonetic": "/haɪˈpɔθəsɪs/",
        "partOfSpeech": "n.",
        "chinese": "假设，假定；假说；猜想",
        "example": ""
      },
      {
        "id": "word-28-20",
        "english": "propellant",
        "phonetic": "[prəˈpelənt]",
        "partOfSpeech": "n.",
        "chinese": "喷射剂；推进物，推进剂",
        "example": ""
      },
      {
        "id": "word-28-35",
        "english": "sorrow",
        "phonetic": "/ˈsɔrəu/",
        "partOfSpeech": "n.",
        "chinese": "悲哀；伤心事",
        "example": ""
      },
      {
        "id": "word-28-32",
        "english": "stack",
        "phonetic": "/stæk/",
        "partOfSpeech": "n.",
        "chinese": "整齐的一叠（或一堆） v. 把……叠成堆，堆放于；堆积，堆起",
        "example": ""
      },
      {
        "id": "word-27-49",
        "english": "capsule",
        "phonetic": "/ˈkæpsjuːl/",
        "partOfSpeech": "n.",
        "chinese": "胶囊；航天舱，太空舱",
        "example": ""
      },
      {
        "id": "word-28-53",
        "english": "amorphous*",
        "phonetic": "/əˈmɔːfəs/",
        "partOfSpeech": "a.",
        "chinese": "无固定形状的；无组织的",
        "example": ""
      },
      {
        "id": "word-27-50",
        "english": "canteen",
        "phonetic": "/kænˈtiːn/",
        "partOfSpeech": "n.",
        "chinese": "餐厅，食堂",
        "example": ""
      },
      {
        "id": "word-27-57",
        "english": "haphazard*",
        "phonetic": "/hæpˈhæzəd/",
        "partOfSpeech": "a.",
        "chinese": "无秩序的，无计划的，组织混乱的",
        "example": ""
      },
      {
        "id": "word-28-41",
        "english": "blunt",
        "phonetic": "/blʌnt/",
        "partOfSpeech": "a.",
        "chinese": "钝的；率直的 vt. 把……弄钝；使减弱",
        "example": ""
      },
      {
        "id": "word-28-10",
        "english": "payable",
        "phonetic": "[ˈpeɪəbl]",
        "partOfSpeech": "a.",
        "chinese": "可支付的；应支付的",
        "example": ""
      },
      {
        "id": "word-27-19",
        "english": "attainable",
        "phonetic": "[əˈteɪnəbl]",
        "partOfSpeech": "a.",
        "chinese": "可获得的，可达到的，可实现的",
        "example": ""
      },
      {
        "id": "word-27-43",
        "english": "lobby",
        "phonetic": "/ˈlɔbɪ/",
        "partOfSpeech": "v.",
        "chinese": "游说 n. 大厅；游说团",
        "example": ""
      },
      {
        "id": "word-27-31",
        "english": "exhaust*",
        "phonetic": "/ɪgˈzɔːst/",
        "partOfSpeech": "v.",
        "chinese": "使非常疲倦，使疲惫不堪；用尽，耗尽 n. （机器排出的）废气，蒸汽",
        "example": ""
      },
      {
        "id": "word-28-25",
        "english": "realm",
        "phonetic": "/relm/",
        "partOfSpeech": "n.",
        "chinese": "界，领域，范围；王国，国度",
        "example": ""
      },
      {
        "id": "word-27-54",
        "english": "bit*",
        "phonetic": "/bɪt/",
        "partOfSpeech": "n.",
        "chinese": "少许；小片；小块",
        "example": ""
      },
      {
        "id": "word-27-39",
        "english": "organize",
        "phonetic": "/ˈɔːgənaɪz/",
        "partOfSpeech": "v.",
        "chinese": "组织，使有条理；成立",
        "example": ""
      },
      {
        "id": "word-28-9",
        "english": "availability",
        "phonetic": "[əˌveɪlə'bɪlətɪ]",
        "partOfSpeech": "n.",
        "chinese": "可利用性，可得性；利用的可能性；可利用的人或物",
        "example": ""
      },
      {
        "id": "word-28-59",
        "english": "chapel",
        "phonetic": "/ˈtʃæpl/",
        "partOfSpeech": "n.",
        "chinese": "小教堂；祈祷室",
        "example": ""
      },
      {
        "id": "word-27-46",
        "english": "comply",
        "phonetic": "/kəmˈplaɪ/",
        "partOfSpeech": "vi.",
        "chinese": "遵从；服从",
        "example": ""
      },
      {
        "id": "word-27-53",
        "english": "lease",
        "phonetic": "/liːs/",
        "partOfSpeech": "n.",
        "chinese": "租约 vt. 出租，租用",
        "example": ""
      },
      {
        "id": "word-28-12",
        "english": "departure",
        "phonetic": "/dɪˈpɑːtʃə(r)/",
        "partOfSpeech": "n.",
        "chinese": "离开，出发；背离，违反",
        "example": ""
      },
      {
        "id": "word-28-50",
        "english": "trim",
        "phonetic": "/trɪm/",
        "partOfSpeech": "vt./n.",
        "chinese": "修剪；整理 a. 苗条的，修长的；整齐的，整洁的",
        "example": ""
      },
      {
        "id": "word-27-70",
        "english": "subtract",
        "phonetic": "/səbˈtrækt/",
        "partOfSpeech": "vt.",
        "chinese": "减去；去掉",
        "example": ""
      },
      {
        "id": "word-28-61",
        "english": "foil",
        "phonetic": "/fɔɪl/",
        "partOfSpeech": "n.",
        "chinese": "箔；箔纸",
        "example": ""
      },
      {
        "id": "word-28-51",
        "english": "steady",
        "phonetic": "/ˈstedɪ/",
        "partOfSpeech": "a.",
        "chinese": "稳步的；稳定的 v. （使）稳定，（使）平稳；（使）镇定",
        "example": ""
      },
      {
        "id": "word-28-45",
        "english": "switch*",
        "phonetic": "/swɪtʃ/",
        "partOfSpeech": "n.",
        "chinese": "开关；转换 v. （使）改变，转变；转换；对调",
        "example": ""
      },
      {
        "id": "word-27-35",
        "english": "divert",
        "phonetic": "/daɪˈvɜːt/",
        "partOfSpeech": "vt.",
        "chinese": "使绕道，转移；娱乐，供消遣",
        "example": ""
      },
      {
        "id": "word-27-42",
        "english": "cater",
        "phonetic": "/ˈkeɪtə(r)/",
        "partOfSpeech": "v.",
        "chinese": "提供饮食；迎合，满足需要（或欲望）",
        "example": ""
      },
      {
        "id": "word-28-40",
        "english": "subject*",
        "phonetic": "/ˈsʌbdʒɪkt/",
        "partOfSpeech": "n.",
        "chinese": "题目；学科；主语 /səbˈdʒekt/ a. 受……支配的，取决于……的；易遭受……的",
        "example": ""
      },
      {
        "id": "word-28-23",
        "english": "intrigue",
        "phonetic": "/ɪnˈtriːg/",
        "partOfSpeech": "v.",
        "chinese": "密谋，施诡计；引起极大兴趣，迷住 /ˈɪntriːg/ n. 阴谋，诡计；密谋",
        "example": ""
      }
    ],
    "article": "In the field of Technological Innovation, researchers have been studying various phenomena to understand their implications. The concept of extra* has been widely discussed in recent studies. The concept of cuisine has been widely discussed in recent studies. The concept of apportion has been widely discussed in recent studies. The concept of perpetual has been widely discussed in recent studies. The concept of unparalleled has been widely discussed in recent studies. The concept of loop* has been widely discussed in recent studies. The concept of identify* has been widely discussed in recent studies. The concept of contradict has been widely discussed in recent studies. The concept of essential has been widely discussed in recent studies. The concept of exhaustible has been widely discussed in recent studies. Researchers have found that these factors play a significant role in shaping our understanding of the subject. Further studies are needed to explore the full implications of these findings."
  },
  {
    "id": "unit-15",
    "name": "Unit 15: Word Lists 29 & 30",
    "words": [
      {
        "id": "word-30-22",
        "english": "rehabilitate",
        "phonetic": "/ˏriːəˈbɪlɪteɪt/",
        "partOfSpeech": "vt.",
        "chinese": "改造（罪犯等），使恢复正常生活；使恢复原状，修复；复职；恢复……的名誉",
        "example": ""
      },
      {
        "id": "word-30-19",
        "english": "supervision",
        "phonetic": "{ˌsu:pə'vɪʒn}; [ˌsju:pə'vɪʒn]",
        "partOfSpeech": "n.",
        "chinese": "监督，管理；指导",
        "example": ""
      },
      {
        "id": "word-30-18",
        "english": "proclaim",
        "phonetic": "/prəˈkleɪm/",
        "partOfSpeech": "v.",
        "chinese": "宣告，宣布，声明；显示",
        "example": ""
      },
      {
        "id": "word-30-58",
        "english": "height*",
        "phonetic": "/haɪt/",
        "partOfSpeech": "n.",
        "chinese": "海拔；身高",
        "example": ""
      },
      {
        "id": "word-30-8",
        "english": "legislation",
        "phonetic": "[ˌledʒɪsˈleɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "法律，法规；立法",
        "example": ""
      },
      {
        "id": "word-30-3",
        "english": "highway",
        "phonetic": "/ˈhaɪweɪ/",
        "partOfSpeech": "n.",
        "chinese": "公路",
        "example": ""
      },
      {
        "id": "word-30-26",
        "english": "temporary",
        "phonetic": "/ˈtemprərɪ/",
        "partOfSpeech": "a.",
        "chinese": "临时的，暂时的",
        "example": ""
      },
      {
        "id": "word-30-13",
        "english": "particulate",
        "phonetic": "[pɑ:ˈtɪkjələt]",
        "partOfSpeech": "a.",
        "chinese": "粒子状的，微粒的，颗粒的 n. 粒子，微粒状物质",
        "example": ""
      },
      {
        "id": "word-30-2",
        "english": "fade",
        "phonetic": "/feɪd/",
        "partOfSpeech": "v.",
        "chinese": "（使）变淡，变暗；褪色；凋谢；逐渐消失",
        "example": ""
      },
      {
        "id": "word-30-16",
        "english": "allergic",
        "phonetic": "[əˈlɜ:dʒɪk]",
        "partOfSpeech": "n.",
        "chinese": "过敏的，（对……）变态反应的，变应性的",
        "example": ""
      },
      {
        "id": "word-30-1",
        "english": "disintegrate",
        "phonetic": "/dɪsˈɪntɪgreɪt/",
        "partOfSpeech": "v.",
        "chinese": "（使）碎裂，瓦解，解体",
        "example": ""
      },
      {
        "id": "word-29-75",
        "english": "launch",
        "phonetic": "/lɔːntʃ/",
        "partOfSpeech": "vt.",
        "chinese": "将……投放市场；开始从事，发动，发起；发射 n. 发射；（产品）上市",
        "example": ""
      },
      {
        "id": "word-30-51",
        "english": "reunite*",
        "phonetic": "/ˏriːjuːˈnaɪt/",
        "partOfSpeech": "v.",
        "chinese": "（使）结合；（使）重聚",
        "example": ""
      },
      {
        "id": "word-30-32",
        "english": "productive",
        "phonetic": "/prəˈdʌktɪv/",
        "partOfSpeech": "a.",
        "chinese": "生产性的；多产的；富有成效的",
        "example": ""
      },
      {
        "id": "word-30-31",
        "english": "figure*",
        "phonetic": "/ˈfɪgə(r)/",
        "partOfSpeech": "n.",
        "chinese": "数字；人物；体态，体形；轮廓；（插）图，图表；雕像，塑像 v. 是重要部分；认为；计算，估计",
        "example": ""
      },
      {
        "id": "word-30-15",
        "english": "megacity",
        "phonetic": "['megəˌsɪtɪ]",
        "partOfSpeech": "n.",
        "chinese": "（人口超过1000万的）大城市",
        "example": ""
      },
      {
        "id": "word-30-4",
        "english": "concede",
        "phonetic": "/kənˈsiːd/",
        "partOfSpeech": "v.",
        "chinese": "（不情愿地）承认；让步",
        "example": ""
      },
      {
        "id": "word-29-61",
        "english": "upset",
        "phonetic": "[ʌpˈset]",
        "partOfSpeech": "vt.",
        "chinese": "使苦恼；搅乱；推翻，颠倒 /ˏʌpˈset/ a. 心烦的；（肠胃等）不适的",
        "example": ""
      },
      {
        "id": "word-29-67",
        "english": "burst",
        "phonetic": "/bɜːst/",
        "partOfSpeech": "v.",
        "chinese": "（使）爆炸；突然发作；破裂 n. 爆炸",
        "example": ""
      },
      {
        "id": "word-30-44",
        "english": "horizon*",
        "phonetic": "/həˈraɪzn/",
        "partOfSpeech": "n.",
        "chinese": "地平线；范围；眼界",
        "example": ""
      },
      {
        "id": "word-29-66",
        "english": "blonde",
        "phonetic": "[blɒnd]",
        "partOfSpeech": "a.",
        "chinese": "（人）白肤金发碧眼的 n. 白肤金发碧眼的女人",
        "example": ""
      },
      {
        "id": "word-29-16",
        "english": "heighten",
        "phonetic": "/ˈhaɪtn/",
        "partOfSpeech": "v.",
        "chinese": "（使）增强，（使）加剧",
        "example": ""
      },
      {
        "id": "word-29-49",
        "english": "cricket*",
        "phonetic": "/ˈkrɪkɪt/",
        "partOfSpeech": "n.",
        "chinese": "板球；蟋蟀",
        "example": ""
      },
      {
        "id": "word-30-37",
        "english": "multiple",
        "phonetic": "/ˈmʌltɪpl/",
        "partOfSpeech": "a.",
        "chinese": "多重的；多样的 n. 倍数",
        "example": ""
      },
      {
        "id": "word-29-8",
        "english": "exploratory",
        "phonetic": "[eksˈplɔ:rətɵrɪ]",
        "partOfSpeech": "a.",
        "chinese": "探测的；勘探的；探索的",
        "example": ""
      },
      {
        "id": "word-30-38",
        "english": "adventure",
        "phonetic": "/ədˈventʃə(r)/",
        "partOfSpeech": "n.",
        "chinese": "冒险，冒险活动；异乎寻常的经历，奇遇",
        "example": ""
      },
      {
        "id": "word-29-51",
        "english": "creation*",
        "phonetic": "/kriːˈeɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "创造；作品",
        "example": ""
      },
      {
        "id": "word-29-1",
        "english": "remarkable*",
        "phonetic": "[rɪˈmɑ:kəbl]",
        "partOfSpeech": "a.",
        "chinese": "引人注目的，显著的，值得注意的；异常的，非凡的",
        "example": ""
      },
      {
        "id": "word-30-7",
        "english": "irritable",
        "phonetic": "/ˈɪrɪtəbl/",
        "partOfSpeech": "a.",
        "chinese": "急躁的，易怒的，易受刺激的；过敏的",
        "example": ""
      },
      {
        "id": "word-30-24",
        "english": "afield",
        "phonetic": "/əˈfiːld/",
        "partOfSpeech": "ad.",
        "chinese": "在野外，在田中；在战场上；背井离乡地；到远方，在远处",
        "example": ""
      },
      {
        "id": "word-30-53",
        "english": "clench*",
        "phonetic": "/klentʃ/",
        "partOfSpeech": "v.",
        "chinese": "握紧；咬紧（牙关等）；牢牢抓住",
        "example": ""
      },
      {
        "id": "word-29-36",
        "english": "minimum",
        "phonetic": "/ˈmɪnɪməm/",
        "partOfSpeech": "n.",
        "chinese": "最小值，最低限度 a. 最低的，最小的",
        "example": ""
      },
      {
        "id": "word-30-46",
        "english": "centigrade",
        "phonetic": "/ˈsentɪgreɪd/",
        "partOfSpeech": "a.",
        "chinese": "百分度的；摄氏度的",
        "example": ""
      },
      {
        "id": "word-29-33",
        "english": "currently",
        "phonetic": "[ˈkʌrəntli]",
        "partOfSpeech": "ad.",
        "chinese": "当前，现时，目前",
        "example": ""
      },
      {
        "id": "word-30-39",
        "english": "zone",
        "phonetic": "/zəun/",
        "partOfSpeech": "n.",
        "chinese": "地区，地带；区域",
        "example": ""
      },
      {
        "id": "word-30-12",
        "english": "congestion",
        "phonetic": "/kənˈdʒestʃən/",
        "partOfSpeech": "n.",
        "chinese": "拥挤，充塞；充血",
        "example": ""
      },
      {
        "id": "word-30-6",
        "english": "complaint*",
        "phonetic": "/kəmˈpleɪnt/",
        "partOfSpeech": "n.",
        "chinese": "抱怨；投诉；控告；（尤指不严重、常影响身体某部位的）疾病",
        "example": ""
      },
      {
        "id": "word-29-32",
        "english": "romance",
        "phonetic": "/rəuˈmæns/",
        "partOfSpeech": "n.",
        "chinese": "恋爱；浪漫爱情；爱情小说，传奇故事",
        "example": ""
      },
      {
        "id": "word-30-47",
        "english": "courageous*",
        "phonetic": "[kə'reɪdʒəs]",
        "partOfSpeech": "a.",
        "chinese": "勇敢的，有胆量的",
        "example": ""
      },
      {
        "id": "word-30-69",
        "english": "technical",
        "phonetic": "/ˈteknɪkl/",
        "partOfSpeech": "a.",
        "chinese": "技术的，工艺的",
        "example": ""
      },
      {
        "id": "word-29-72",
        "english": "behave",
        "phonetic": "/bɪˈheɪv/",
        "partOfSpeech": "v.",
        "chinese": "表现；（机器等）运转；（事物）起作用；表现得体；使检点",
        "example": ""
      },
      {
        "id": "word-30-62",
        "english": "continually",
        "phonetic": "[kən'tɪnjʊəlɪ]",
        "partOfSpeech": "ad.",
        "chinese": "连续地，持续地",
        "example": ""
      },
      {
        "id": "word-29-62",
        "english": "appeal*",
        "phonetic": "/əˈpiːl/",
        "partOfSpeech": "vi.",
        "chinese": "呼吁；起诉，上诉；吸引 n. 上诉，申诉；呼吁；感染力，吸引力",
        "example": ""
      },
      {
        "id": "word-29-60",
        "english": "naive",
        "phonetic": "/naɪˈiːv/",
        "partOfSpeech": "a.",
        "chinese": "幼稚的，天真的，不成熟的",
        "example": ""
      },
      {
        "id": "word-29-2",
        "english": "clot*",
        "phonetic": "/klɔt/",
        "partOfSpeech": "n.",
        "chinese": "（血液）凝块 v. 凝结成块",
        "example": ""
      },
      {
        "id": "word-29-58",
        "english": "groan",
        "phonetic": "/grəun/",
        "partOfSpeech": "vi.",
        "chinese": "呻吟；叹息 n. 呻吟声，叹息声",
        "example": ""
      },
      {
        "id": "word-29-64",
        "english": "caution",
        "phonetic": "/ˈkɔːʃn/",
        "partOfSpeech": "n.",
        "chinese": "谨慎，小心 v. 提醒，警告",
        "example": ""
      },
      {
        "id": "word-29-59",
        "english": "diminish*",
        "phonetic": "/dɪˈmɪnɪʃ/",
        "partOfSpeech": "v.",
        "chinese": "减少；降低；贬低，轻视",
        "example": ""
      },
      {
        "id": "word-29-52",
        "english": "corporate*",
        "phonetic": "/ˈkɔːpərət/",
        "partOfSpeech": "a.",
        "chinese": "团体的，共同的；法人的，公司的",
        "example": ""
      },
      {
        "id": "word-29-35",
        "english": "persist",
        "phonetic": "/pəˈsɪst/",
        "partOfSpeech": "vi.",
        "chinese": "坚持；维持，保持，持续",
        "example": ""
      },
      {
        "id": "word-29-12",
        "english": "patriotic",
        "phonetic": "[ˌpætriˈɔtik]",
        "partOfSpeech": "a.",
        "chinese": "爱国的，有爱国心的；显示出爱国精神的",
        "example": ""
      },
      {
        "id": "word-29-3",
        "english": "prior",
        "phonetic": "/ˈpraɪə(r)/",
        "partOfSpeech": "a.",
        "chinese": "在前的，优先的",
        "example": ""
      },
      {
        "id": "word-29-54",
        "english": "synthesis",
        "phonetic": "/ˈsɪnθəsɪs/",
        "partOfSpeech": "n.",
        "chinese": "综合，合成；综合体",
        "example": ""
      },
      {
        "id": "word-29-40",
        "english": "subtle",
        "phonetic": "/ˈsʌtl/",
        "partOfSpeech": "a.",
        "chinese": "细微的，微妙的，难以捉摸的；隐约的；精巧的，巧妙的；诡秘的，狡诈的",
        "example": ""
      },
      {
        "id": "word-29-30",
        "english": "revolution*",
        "phonetic": "/ˏrevəˈluːʃn/",
        "partOfSpeech": "n.",
        "chinese": "革命；巨变，大变革",
        "example": ""
      },
      {
        "id": "word-30-54",
        "english": "corpus*",
        "phonetic": "/ˈkɔːpəs/",
        "partOfSpeech": "n.",
        "chinese": "文集，文献，汇编；语料库",
        "example": ""
      },
      {
        "id": "word-29-14",
        "english": "formality",
        "phonetic": "/fɔːˈmælətɪ/",
        "partOfSpeech": "n.",
        "chinese": "认真遵循规范、礼节等；例行公事；正式手续",
        "example": ""
      },
      {
        "id": "word-29-57",
        "english": "pepper",
        "phonetic": "/ˈpepə(r)/",
        "partOfSpeech": "n.",
        "chinese": "胡椒（粉） vt. 在……上撒（胡椒粉等）",
        "example": ""
      },
      {
        "id": "word-29-38",
        "english": "stash*",
        "phonetic": "/stæʃ/",
        "partOfSpeech": "vt.",
        "chinese": "藏匿；贮藏",
        "example": ""
      },
      {
        "id": "word-29-45",
        "english": "illustration",
        "phonetic": "[ˌɪləˈstreɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "说明；实例；图解，插图",
        "example": ""
      },
      {
        "id": "word-30-33",
        "english": "respond*",
        "phonetic": "/rɪˈspɔnd/",
        "partOfSpeech": "vi.",
        "chinese": "回答，答复；响应；作出反应",
        "example": ""
      },
      {
        "id": "word-30-9",
        "english": "bouncing",
        "phonetic": "[ˈbaʊnsɪŋ]",
        "partOfSpeech": "a.",
        "chinese": "健壮的，茁壮的",
        "example": ""
      },
      {
        "id": "word-29-4",
        "english": "integrate*",
        "phonetic": "/ˈɪntɪgreɪt/",
        "partOfSpeech": "v.",
        "chinese": "（使）合并，（使）成为一体",
        "example": ""
      },
      {
        "id": "word-30-59",
        "english": "escalator*",
        "phonetic": "/ˈeskəleɪtə(r)/",
        "partOfSpeech": "n.",
        "chinese": "<美> 自动扶梯",
        "example": ""
      },
      {
        "id": "word-29-29",
        "english": "thermal",
        "phonetic": "/ˈθɜːml/",
        "partOfSpeech": "a.",
        "chinese": "热的，热量的 n. 热气流",
        "example": ""
      },
      {
        "id": "word-30-68",
        "english": "incentive",
        "phonetic": "/ɪnˈsentɪv/",
        "partOfSpeech": "n.",
        "chinese": "刺激；激励",
        "example": ""
      },
      {
        "id": "word-29-23",
        "english": "consequential",
        "phonetic": "/ˏkɔnsɪˈkwenʃl/",
        "partOfSpeech": "a.",
        "chinese": "结果的，随之发生的",
        "example": ""
      },
      {
        "id": "word-29-74",
        "english": "dredge*",
        "phonetic": "/dredʒ/",
        "partOfSpeech": "v.",
        "chinese": "挖掘；疏浚；挖出，吸出；重提（不愉快或令人难堪的）旧事",
        "example": ""
      },
      {
        "id": "word-29-43",
        "english": "loose",
        "phonetic": "/luːs/",
        "partOfSpeech": "a.",
        "chinese": "松的；散漫的；不精确的",
        "example": ""
      },
      {
        "id": "word-30-70",
        "english": "chorus",
        "phonetic": "/ˈkɔːrəs/",
        "partOfSpeech": "n.",
        "chinese": "合唱，合唱曲；合唱队；副歌，叠句；齐声，齐声说的话（或发出的喊声） v. 齐声说",
        "example": ""
      },
      {
        "id": "word-30-60",
        "english": "nasty*",
        "phonetic": "/ˈnɑːstɪ/",
        "partOfSpeech": "a.",
        "chinese": "令人讨厌的；不友好的，恶意的，下流的；恶劣的",
        "example": ""
      },
      {
        "id": "word-30-55",
        "english": "alarm*",
        "phonetic": "/əˈlɑːm/",
        "partOfSpeech": "n.",
        "chinese": "惊恐，恐慌；报警器；闹钟；警报 vt. 使惊恐；使担心",
        "example": ""
      },
      {
        "id": "word-30-35",
        "english": "smell*",
        "phonetic": "/smel/",
        "partOfSpeech": "v.",
        "chinese": "散发（或有）……的气味；闻到，嗅到",
        "example": ""
      },
      {
        "id": "word-30-20",
        "english": "comparable",
        "phonetic": "/ˈkɔmpərəbl/",
        "partOfSpeech": "a.",
        "chinese": "可比较的，类似的；比得上的",
        "example": ""
      },
      {
        "id": "word-30-49",
        "english": "preferable",
        "phonetic": "[ˈprefrəbl]",
        "partOfSpeech": "a.",
        "chinese": "更可取的，更好的，更合意的",
        "example": ""
      },
      {
        "id": "word-29-26",
        "english": "murky",
        "phonetic": "[ˈmɜ:ki:]",
        "partOfSpeech": "a.",
        "chinese": "浑浊的；黑暗的；朦胧的；隐晦的",
        "example": ""
      },
      {
        "id": "word-30-42",
        "english": "slouch",
        "phonetic": "/slautʃ/",
        "partOfSpeech": "v.",
        "chinese": "懒散地站（或坐、走）；低头垂肩地站（或坐、走）",
        "example": ""
      },
      {
        "id": "word-29-20",
        "english": "ingenuity",
        "phonetic": "[ˌɪndʒə'nju:ətɪ]",
        "partOfSpeech": "n.",
        "chinese": "心灵手巧，足智多谋；巧妙，精巧",
        "example": ""
      },
      {
        "id": "word-29-5",
        "english": "exemplify",
        "phonetic": "/ɪgˈzemplɪfaɪ/",
        "partOfSpeech": "vt.",
        "chinese": "作为……的典型；例证，举例说明",
        "example": ""
      },
      {
        "id": "word-30-27",
        "english": "spill*",
        "phonetic": "/spɪl/",
        "partOfSpeech": "v.",
        "chinese": "（使）溢出；涌出",
        "example": ""
      },
      {
        "id": "word-29-56",
        "english": "decapitate*",
        "phonetic": "/dɪˈkæpɪteɪt/",
        "partOfSpeech": "vt.",
        "chinese": "斩首",
        "example": ""
      },
      {
        "id": "word-30-40",
        "english": "diagram",
        "phonetic": "/ˈdaɪəgræm/",
        "partOfSpeech": "n.",
        "chinese": "图解，图表",
        "example": ""
      },
      {
        "id": "word-29-53",
        "english": "swell",
        "phonetic": "/swel/",
        "partOfSpeech": "v.",
        "chinese": "膨胀；增长，增强",
        "example": ""
      },
      {
        "id": "word-30-5",
        "english": "chef",
        "phonetic": "/ʃef/",
        "partOfSpeech": "n.",
        "chinese": "厨师长，厨师",
        "example": ""
      },
      {
        "id": "word-30-57",
        "english": "conjunction",
        "phonetic": "/kənˈdʒʌŋkʃn/",
        "partOfSpeech": "n.",
        "chinese": "连接；连词",
        "example": ""
      },
      {
        "id": "word-29-48",
        "english": "generic",
        "phonetic": "/dʒɪˈnerɪk/",
        "partOfSpeech": "a.",
        "chinese": "一般的，普通的，通用的；种的，属的",
        "example": ""
      },
      {
        "id": "word-29-24",
        "english": "scour",
        "phonetic": "/ˈskauə(r)/",
        "partOfSpeech": "vt.",
        "chinese": "四处搜寻，细查；擦洗，擦亮；冲刷出，冲刷成",
        "example": ""
      },
      {
        "id": "word-30-52",
        "english": "minority*",
        "phonetic": "/maɪˈnɔrətɪ/",
        "partOfSpeech": "n.",
        "chinese": "少数；少数民族",
        "example": ""
      },
      {
        "id": "word-30-45",
        "english": "trick*",
        "phonetic": "/trɪk/",
        "partOfSpeech": "n.",
        "chinese": "诡计，花招 vt. 欺诈，哄骗",
        "example": ""
      },
      {
        "id": "word-29-68",
        "english": "ecology",
        "phonetic": "/iːˈkɔlədʒɪ/",
        "partOfSpeech": "n.",
        "chinese": "生态，生态学；生态环境",
        "example": ""
      },
      {
        "id": "word-29-21",
        "english": "simplicity",
        "phonetic": "/sɪmˈplɪsətɪ/",
        "partOfSpeech": "n.",
        "chinese": "简单（性），简易；朴素；直率，单纯",
        "example": ""
      },
      {
        "id": "word-29-17",
        "english": "assimilation",
        "phonetic": "[əˌsɪməˈleɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "吸收；（被）吸收和同化的过程",
        "example": ""
      },
      {
        "id": "word-29-10",
        "english": "nutrient",
        "phonetic": "/ˈnjuːtrɪənt/",
        "partOfSpeech": "n.",
        "chinese": "滋养物，营养品",
        "example": ""
      },
      {
        "id": "word-30-23",
        "english": "picturesque",
        "phonetic": "/ˏpɪktʃəˈresk/",
        "partOfSpeech": "a.",
        "chinese": "美丽如画的；（语言）生动的",
        "example": ""
      },
      {
        "id": "word-30-41",
        "english": "raw",
        "phonetic": "",
        "partOfSpeech": "",
        "chinese": "material [rɔ: məˈtiəriəl] n. 原材料",
        "example": ""
      },
      {
        "id": "word-29-50",
        "english": "exhale*",
        "phonetic": "/eksˈheɪl/",
        "partOfSpeech": "v.",
        "chinese": "呼出（气）；散发（气味、蒸气等）",
        "example": ""
      },
      {
        "id": "word-30-34",
        "english": "approval",
        "phonetic": "/əˈpruːvl/",
        "partOfSpeech": "n.",
        "chinese": "赞成，同意；正式批准",
        "example": ""
      },
      {
        "id": "word-30-11",
        "english": "innovative",
        "phonetic": "['ɪnəveɪtɪv]",
        "partOfSpeech": "a.",
        "chinese": "革新的，创新的，新颖的；富有革新精神的",
        "example": ""
      },
      {
        "id": "word-29-15",
        "english": "perquisite",
        "phonetic": "/ˈpɜːkwɪzɪt/",
        "partOfSpeech": "n.",
        "chinese": "利益；特权",
        "example": ""
      },
      {
        "id": "word-30-25",
        "english": "form*",
        "phonetic": "/fɔːm/",
        "partOfSpeech": "n.",
        "chinese": "形式；外形；表格 v. （使）形成，（使）出现",
        "example": ""
      },
      {
        "id": "word-29-18",
        "english": "necessity",
        "phonetic": "/nɪˈsesətɪ/",
        "partOfSpeech": "n.",
        "chinese": "必然，必要；必需品；必要性",
        "example": ""
      },
      {
        "id": "word-30-17",
        "english": "populace",
        "phonetic": "/ˈpɔpjuləs/",
        "partOfSpeech": "n.",
        "chinese": "（一个国家或地区的）人口，全体居民；平民，大众",
        "example": ""
      },
      {
        "id": "word-30-63",
        "english": "adequate*",
        "phonetic": "/ˈædɪkwət/",
        "partOfSpeech": "a.",
        "chinese": "充足的；合适的，合格的",
        "example": ""
      },
      {
        "id": "word-30-14",
        "english": "pollutant",
        "phonetic": "[pəˈlu:tənt]",
        "partOfSpeech": "n.",
        "chinese": "污染物质（尤指排入水中和空气中的有害化学物质），有害物质",
        "example": ""
      },
      {
        "id": "word-29-39",
        "english": "species*",
        "phonetic": "/ˈspiːʃiːz/",
        "partOfSpeech": "n.",
        "chinese": "种，物种",
        "example": ""
      },
      {
        "id": "word-29-65",
        "english": "average*",
        "phonetic": "/ˈævərɪdʒ/",
        "partOfSpeech": "n.",
        "chinese": "平均（数） a. 平均的；平常的，普通的 v. 平均达到；平均为",
        "example": ""
      },
      {
        "id": "word-30-48",
        "english": "academic",
        "phonetic": "/ˏækəˈdemɪk/",
        "partOfSpeech": "a.",
        "chinese": "学院的；学术的；不切实际的 n. 学者；大学教师",
        "example": ""
      },
      {
        "id": "word-30-21",
        "english": "habitual",
        "phonetic": "/həˈbɪtʃuəl/",
        "partOfSpeech": "a.",
        "chinese": "惯常的，通常的",
        "example": ""
      },
      {
        "id": "word-29-11",
        "english": "plough",
        "phonetic": "/plau/",
        "partOfSpeech": "n.",
        "chinese": "犁 v. 耕地；开（路）；破（浪）",
        "example": ""
      },
      {
        "id": "word-30-10",
        "english": "sizeable",
        "phonetic": "[ˈsaɪzəbl]",
        "partOfSpeech": "a.",
        "chinese": "相当大的",
        "example": ""
      },
      {
        "id": "word-29-7",
        "english": "formulation",
        "phonetic": "[ˌfɔ:mjʊ'leɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "公式化，格式化；确切的表达",
        "example": ""
      },
      {
        "id": "word-29-37",
        "english": "output*",
        "phonetic": "/ˈautput/",
        "partOfSpeech": "n.",
        "chinese": "产量；输出量；输出功率 vt. 输出",
        "example": ""
      },
      {
        "id": "word-29-6",
        "english": "herdsman*",
        "phonetic": "['hɜ:dzmən]",
        "partOfSpeech": "n.",
        "chinese": "牧人",
        "example": ""
      },
      {
        "id": "word-30-30",
        "english": "define",
        "phonetic": "/dɪˈfaɪn/",
        "partOfSpeech": "vt.",
        "chinese": "下定义；限定",
        "example": ""
      },
      {
        "id": "word-29-9",
        "english": "pasture",
        "phonetic": "/ˈpɑːstʃə(r)/",
        "partOfSpeech": "n.",
        "chinese": "牧场，草原 vt. 放牧",
        "example": ""
      },
      {
        "id": "word-29-55",
        "english": "excreta*",
        "phonetic": "/ɪkˈskriːtə/",
        "partOfSpeech": "n.",
        "chinese": "排泄物",
        "example": ""
      },
      {
        "id": "word-30-50",
        "english": "biometrics*",
        "phonetic": "[ˌbaɪəʊ'metrɪks]",
        "partOfSpeech": "n.",
        "chinese": "生物测定学",
        "example": ""
      },
      {
        "id": "word-29-25",
        "english": "seasonal",
        "phonetic": "/ˈsiːzənl/",
        "partOfSpeech": "a.",
        "chinese": "季节性的，随季节而变化的；节令性的",
        "example": ""
      },
      {
        "id": "word-30-36",
        "english": "flaw",
        "phonetic": "/flɔː/",
        "partOfSpeech": "n.",
        "chinese": "缺点；瑕疵",
        "example": ""
      },
      {
        "id": "word-30-43",
        "english": "bloom*",
        "phonetic": "/bluːm/",
        "partOfSpeech": "n.",
        "chinese": "花；开花（期）；青春焕发（的时期） v. （使）开花",
        "example": ""
      },
      {
        "id": "word-29-69",
        "english": "profession",
        "phonetic": "/prəˈfeʃn/",
        "partOfSpeech": "n.",
        "chinese": "行业，职业；宣称，表白",
        "example": ""
      },
      {
        "id": "word-29-46",
        "english": "slice",
        "phonetic": "/slaɪs/",
        "partOfSpeech": "v.",
        "chinese": "把……切成片，削 n. 薄片，切片；份，部分",
        "example": ""
      },
      {
        "id": "word-29-44",
        "english": "available*",
        "phonetic": "/əˈveɪləbl/",
        "partOfSpeech": "a.",
        "chinese": "可获得的，可得到的；可用的；有空的",
        "example": ""
      },
      {
        "id": "word-30-56",
        "english": "beam*",
        "phonetic": "/biːm/",
        "partOfSpeech": "n.",
        "chinese": "（光线等的）束；梁；笑容，喜色 v. 面露喜色；发射电波，播送",
        "example": ""
      },
      {
        "id": "word-29-47",
        "english": "waterfront*",
        "phonetic": "[ˈwɔ:təfrʌnt]",
        "partOfSpeech": "n.",
        "chinese": "滨水路，滨水区，码头区",
        "example": ""
      },
      {
        "id": "word-30-29",
        "english": "lead*",
        "phonetic": "/liːd/",
        "partOfSpeech": "v.",
        "chinese": "指引；领导；致使 /led/ n. 铅",
        "example": ""
      },
      {
        "id": "word-29-31",
        "english": "ID",
        "phonetic": "",
        "partOfSpeech": "",
        "chinese": "card 身份证（= identity card）",
        "example": ""
      },
      {
        "id": "word-30-61",
        "english": "monster",
        "phonetic": "/ˈmɔnstə(r)/",
        "partOfSpeech": "n.",
        "chinese": "怪物；巨人，庞然大物",
        "example": ""
      },
      {
        "id": "word-30-64",
        "english": "hike",
        "phonetic": "/haɪk/",
        "partOfSpeech": "v.",
        "chinese": "徒步旅行；提高（价格等） n. 远足，徒步旅行；猛增",
        "example": ""
      },
      {
        "id": "word-29-22",
        "english": "luxuriant",
        "phonetic": "/lʌgˈʒuərɪənt/",
        "partOfSpeech": "a.",
        "chinese": "繁茂的；肥沃的；丰富的",
        "example": ""
      },
      {
        "id": "word-29-13",
        "english": "scrub",
        "phonetic": "/skrʌb/",
        "partOfSpeech": "v.",
        "chinese": "用力擦洗，把……擦净；取消（计划等） n. 矮树丛，灌木丛",
        "example": ""
      },
      {
        "id": "word-29-70",
        "english": "transit*",
        "phonetic": "/ˈtrænsɪt;",
        "partOfSpeech": "",
        "chinese": "ˈtrænzɪt/ n. 运输，运载 v. 通过，经过；中转",
        "example": ""
      },
      {
        "id": "word-29-73",
        "english": "devastating*",
        "phonetic": "[ˈdevəsteɪtɪŋ]",
        "partOfSpeech": "a.",
        "chinese": "毁灭性的；强有力的",
        "example": ""
      },
      {
        "id": "word-29-42",
        "english": "select",
        "phonetic": "/sɪˈlekt/",
        "partOfSpeech": "v.",
        "chinese": "选择，挑选 a. 精选的，优等的",
        "example": ""
      },
      {
        "id": "word-30-28",
        "english": "mediocre*",
        "phonetic": "/ˏmiːdɪˈəukə(r)/",
        "partOfSpeech": "a.",
        "chinese": "平庸的，平凡的",
        "example": ""
      },
      {
        "id": "word-29-71",
        "english": "medieval",
        "phonetic": "/ˏmedɪˈiːvl/",
        "partOfSpeech": "a.",
        "chinese": "中世纪的；中古（时代）的",
        "example": ""
      },
      {
        "id": "word-30-66",
        "english": "organ*",
        "phonetic": "/ˈɔːgən/",
        "partOfSpeech": "n.",
        "chinese": "器官；（官方的）机构",
        "example": ""
      },
      {
        "id": "word-30-65",
        "english": "grateful",
        "phonetic": "/ˈgreɪtfl/",
        "partOfSpeech": "a.",
        "chinese": "感激的，感谢的",
        "example": ""
      },
      {
        "id": "word-29-63",
        "english": "consumption",
        "phonetic": "/kənˈsʌmpʃn/",
        "partOfSpeech": "n.",
        "chinese": "消耗（量）；消费（量）",
        "example": ""
      },
      {
        "id": "word-29-41",
        "english": "competent",
        "phonetic": "/ˈkɔmpɪtənt/",
        "partOfSpeech": "a.",
        "chinese": "有能力的；能胜任的",
        "example": ""
      },
      {
        "id": "word-29-27",
        "english": "melatonin*",
        "phonetic": "[ˌmelə'təʊnɪn]",
        "partOfSpeech": "n.",
        "chinese": "褪黑激素",
        "example": ""
      },
      {
        "id": "word-29-34",
        "english": "inferential*",
        "phonetic": "[ˌɪnfə'renʃəl]",
        "partOfSpeech": "a.",
        "chinese": "可推断的，推理的",
        "example": ""
      },
      {
        "id": "word-29-28",
        "english": "cue",
        "phonetic": "/kjuː/",
        "partOfSpeech": "n.",
        "chinese": "暗示，提示",
        "example": ""
      },
      {
        "id": "word-29-19",
        "english": "disposable",
        "phonetic": "/dɪˈspəuzəbl/",
        "partOfSpeech": "a.",
        "chinese": "一次性的；可动用的",
        "example": ""
      },
      {
        "id": "word-30-67",
        "english": "rely",
        "phonetic": "/rɪˈlaɪ/",
        "partOfSpeech": "vi.",
        "chinese": "依靠；依赖",
        "example": ""
      }
    ],
    "article": "In the field of Economic Development, researchers have been studying various phenomena to understand their implications. The concept of rehabilitate has been widely discussed in recent studies. The concept of supervision has been widely discussed in recent studies. The concept of proclaim has been widely discussed in recent studies. The concept of height* has been widely discussed in recent studies. The concept of legislation has been widely discussed in recent studies. The concept of highway has been widely discussed in recent studies. The concept of temporary has been widely discussed in recent studies. The concept of particulate has been widely discussed in recent studies. The concept of fade has been widely discussed in recent studies. The concept of allergic has been widely discussed in recent studies. Researchers have found that these factors play a significant role in shaping our understanding of the subject. Further studies are needed to explore the full implications of these findings."
  },
  {
    "id": "unit-16",
    "name": "Unit 16: Word Lists 31 & 32",
    "words": [
      {
        "id": "word-32-4",
        "english": "hinge*",
        "phonetic": "/hɪndʒ/",
        "partOfSpeech": "n.",
        "chinese": "合叶；铰链 v. 依……而定",
        "example": ""
      },
      {
        "id": "word-32-16",
        "english": "meagre",
        "phonetic": "/ˈmiːgə(r)/",
        "partOfSpeech": "a.",
        "chinese": "少量的，粗劣的",
        "example": ""
      },
      {
        "id": "word-31-10",
        "english": "dispersal",
        "phonetic": "[disˈpə:səl]",
        "partOfSpeech": "n.",
        "chinese": "散布，分散；消散，疏散",
        "example": ""
      },
      {
        "id": "word-31-68",
        "english": "inventory",
        "phonetic": "/ˈɪnvəntrɪ/",
        "partOfSpeech": "n.",
        "chinese": "目录；存货",
        "example": ""
      },
      {
        "id": "word-31-57",
        "english": "enthusiastic",
        "phonetic": "[ɪnˌθju:ziˈæstɪk]",
        "partOfSpeech": "a.",
        "chinese": "热情的；热心的",
        "example": ""
      },
      {
        "id": "word-31-65",
        "english": "administer*",
        "phonetic": "/ədˈmɪnɪstə(r)/",
        "partOfSpeech": "v.",
        "chinese": "掌管；给予",
        "example": ""
      },
      {
        "id": "word-32-3",
        "english": "confirm*",
        "phonetic": "/kənˈfɜːm/",
        "partOfSpeech": "vt.",
        "chinese": "证实，确定；肯定；批准，使有效",
        "example": ""
      },
      {
        "id": "word-31-25",
        "english": "capsize",
        "phonetic": "/kæpˈsaɪz/",
        "partOfSpeech": "v.",
        "chinese": "（使船）翻，倾履",
        "example": ""
      },
      {
        "id": "word-31-67",
        "english": "intensify",
        "phonetic": "[ɪn'tensɪfaɪ]",
        "partOfSpeech": "vt.",
        "chinese": "使增强；使加剧",
        "example": ""
      },
      {
        "id": "word-32-45",
        "english": "reputation*",
        "phonetic": "/ˏrepjuˈteɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "名誉，名声",
        "example": ""
      },
      {
        "id": "word-31-38",
        "english": "overall*",
        "phonetic": "/ˏəuvərˈɔːl/",
        "partOfSpeech": "a.",
        "chinese": "全面的；全部的",
        "example": ""
      },
      {
        "id": "word-31-60",
        "english": "database",
        "phonetic": "['deɪtəbeɪs]",
        "partOfSpeech": "n.",
        "chinese": "数据库",
        "example": ""
      },
      {
        "id": "word-31-32",
        "english": "management*",
        "phonetic": "/ˈmænɪdʒmənt/",
        "partOfSpeech": "n.",
        "chinese": "管理（部门、人员）；处理",
        "example": ""
      },
      {
        "id": "word-32-48",
        "english": "dizzy",
        "phonetic": "/ˈdɪzɪ/",
        "partOfSpeech": "a.",
        "chinese": "头晕目眩的，眩晕的；（使）人头晕的",
        "example": ""
      },
      {
        "id": "word-31-9",
        "english": "sustainable",
        "phonetic": "[səˈsteɪnəbl]",
        "partOfSpeech": "a.",
        "chinese": "可以忍受的；足以支撑的；养得起的",
        "example": ""
      },
      {
        "id": "word-31-39",
        "english": "granite*",
        "phonetic": "/ˈgrænɪt/",
        "partOfSpeech": "n.",
        "chinese": "花岗岩，花岗石",
        "example": ""
      },
      {
        "id": "word-32-33",
        "english": "apart",
        "phonetic": "/əˈpɑːt/",
        "partOfSpeech": "ad.",
        "chinese": "相间隔；分离；除去 a. 分离的",
        "example": ""
      },
      {
        "id": "word-31-52",
        "english": "poison*",
        "phonetic": "/ˈpɔɪzn/",
        "partOfSpeech": "n.",
        "chinese": "毒，毒药 vt. 毒害",
        "example": ""
      },
      {
        "id": "word-32-34",
        "english": "mainstream*",
        "phonetic": "['meɪnstri:m]",
        "partOfSpeech": "n.",
        "chinese": "主要倾向，主要趋势，主流；主流派爵士乐（介乎传统与现代之间者） a. 主流的",
        "example": ""
      },
      {
        "id": "word-32-56",
        "english": "droplet",
        "phonetic": "[ˈdrɒplət]",
        "partOfSpeech": "n.",
        "chinese": "小滴",
        "example": ""
      },
      {
        "id": "word-32-13",
        "english": "extol*",
        "phonetic": "/ɪkˈstəul/",
        "partOfSpeech": "vt.",
        "chinese": "赞颂，赞美，颂扬",
        "example": ""
      },
      {
        "id": "word-31-48",
        "english": "trend",
        "phonetic": "/trend/",
        "partOfSpeech": "n.",
        "chinese": "倾向；趋势；流行，时尚 vi. 伸向；倾向",
        "example": ""
      },
      {
        "id": "word-31-37",
        "english": "mantle",
        "phonetic": "/ˈmntl/",
        "partOfSpeech": "n.",
        "chinese": "披风，斗篷；覆盖物；（煤气灯）纱罩；[解] 外层；包膜；外表；（水库的）槽； [地] 地幔 vt. 用斗篷盖；覆盖",
        "example": ""
      },
      {
        "id": "word-31-14",
        "english": "obsession",
        "phonetic": "[əb'seʃn]",
        "partOfSpeech": "n.",
        "chinese": "牵挂，惦念；迷住，困扰；萦绕于心的事物或人；固执的念头",
        "example": ""
      },
      {
        "id": "word-32-19",
        "english": "autonomy",
        "phonetic": "[ɔ:ˈtɒnəmi]",
        "partOfSpeech": "n.",
        "chinese": "自治，自治权；人身自由，自主权",
        "example": ""
      },
      {
        "id": "word-31-49",
        "english": "extreme",
        "phonetic": "/ɪkˈstriːm/",
        "partOfSpeech": "a.",
        "chinese": "极度的；最后的 n. 极端，过分",
        "example": ""
      },
      {
        "id": "word-32-2",
        "english": "dairy",
        "phonetic": "/ˈdeərɪ/",
        "partOfSpeech": "n.",
        "chinese": "奶制品；乳品店 a. 乳制品的",
        "example": ""
      },
      {
        "id": "word-31-75",
        "english": "faith",
        "phonetic": "/feɪθ/",
        "partOfSpeech": "n.",
        "chinese": "信任，信用；信仰，信条",
        "example": ""
      },
      {
        "id": "word-31-35",
        "english": "emerge",
        "phonetic": "/ɪˈmɜːdʒ/",
        "partOfSpeech": "vi.",
        "chinese": "出现；显露，（事实等）暴露",
        "example": ""
      },
      {
        "id": "word-32-43",
        "english": "controversial",
        "phonetic": "/ˏkɔntrəˈvɜːʃl/",
        "partOfSpeech": "a.",
        "chinese": "争论的",
        "example": ""
      },
      {
        "id": "word-31-42",
        "english": "community",
        "phonetic": "/kəˈmjuːnətɪ/",
        "partOfSpeech": "n.",
        "chinese": "社会；社区；团体；（动植物的）群落；共同体",
        "example": ""
      },
      {
        "id": "word-31-34",
        "english": "strategy",
        "phonetic": "/ˈstrætədʒɪ/",
        "partOfSpeech": "n.",
        "chinese": "战略，策略",
        "example": ""
      },
      {
        "id": "word-31-45",
        "english": "spectrum",
        "phonetic": "/ˈspektrəm/",
        "partOfSpeech": "n.",
        "chinese": "谱，光谱，频谱；范围，幅度",
        "example": ""
      },
      {
        "id": "word-32-21",
        "english": "onslaught",
        "phonetic": "/ˈɔnslɔːt/",
        "partOfSpeech": "n.",
        "chinese": "猛攻，猛袭",
        "example": ""
      },
      {
        "id": "word-31-30",
        "english": "admit*",
        "phonetic": "/ədˈmɪt/",
        "partOfSpeech": "v.",
        "chinese": "承认；准许……进入；准许……加入",
        "example": ""
      },
      {
        "id": "word-32-59",
        "english": "conference",
        "phonetic": "/ˈkɔnfərəns/",
        "partOfSpeech": "n.",
        "chinese": "（正式）会议",
        "example": ""
      },
      {
        "id": "word-31-26",
        "english": "project*",
        "phonetic": "/ˈprɔdʒekt/",
        "partOfSpeech": "n.",
        "chinese": "计划，方案；课题，项目；工程 /prəˈdʒekt/ v. 放映；投射，发射；（使）突出，（使）伸出；设计，规划",
        "example": ""
      },
      {
        "id": "word-32-66",
        "english": "aggressiveness*",
        "phonetic": "[ə'ɡresɪvnəs]",
        "partOfSpeech": "n.",
        "chinese": "侵略；争斗；攻击",
        "example": ""
      },
      {
        "id": "word-32-6",
        "english": "subsidise*",
        "phonetic": "{'sʌbsɪdaɪz}",
        "partOfSpeech": "vt.",
        "chinese": "津贴，资助",
        "example": ""
      },
      {
        "id": "word-31-23",
        "english": "swivel",
        "phonetic": "/ˈswɪvl/",
        "partOfSpeech": "v.",
        "chinese": "旋转 n. 转环，转节",
        "example": ""
      },
      {
        "id": "word-32-9",
        "english": "conversion",
        "phonetic": "/kənˈvɜːʃn/",
        "partOfSpeech": "n.",
        "chinese": "转化；转变，变换；兑换；改变信仰，皈依",
        "example": ""
      },
      {
        "id": "word-31-16",
        "english": "ethereal",
        "phonetic": "/ɪˈθɪərɪəl/",
        "partOfSpeech": "a.",
        "chinese": "太空的；轻巧的",
        "example": ""
      },
      {
        "id": "word-32-23",
        "english": "correlation",
        "phonetic": "[ˌkɒrəˈleɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "相互关系，相关（性）",
        "example": ""
      },
      {
        "id": "word-31-33",
        "english": "enrolment",
        "phonetic": "[ɪnˈrəʊlmənt]",
        "partOfSpeech": "n.",
        "chinese": "登记（人数），注册（人数）；入学，入伍；登记簿，名册",
        "example": ""
      },
      {
        "id": "word-31-51",
        "english": "military",
        "phonetic": "/ˈmɪlɪtrɪ/",
        "partOfSpeech": "a.",
        "chinese": "军事的 n. [the ~] 军队",
        "example": ""
      },
      {
        "id": "word-32-54",
        "english": "mall",
        "phonetic": "/mɔːl/",
        "partOfSpeech": "n.",
        "chinese": "购物中心",
        "example": ""
      },
      {
        "id": "word-32-47",
        "english": "excursion",
        "phonetic": "/ɪkˈskɜːʃn/",
        "partOfSpeech": "n.",
        "chinese": "远足，短途旅游；[物] 偏移，漂移",
        "example": ""
      },
      {
        "id": "word-31-50",
        "english": "skip",
        "phonetic": "/skɪp/",
        "partOfSpeech": "v.",
        "chinese": "跳，蹦；漏过；逃学",
        "example": ""
      },
      {
        "id": "word-32-64",
        "english": "interval",
        "phonetic": "/ˈɪntəvl/",
        "partOfSpeech": "n.",
        "chinese": "间隔，幕间休息；间距",
        "example": ""
      },
      {
        "id": "word-32-26",
        "english": "incongruous",
        "phonetic": "/ɪnˈkɔŋgruəs/",
        "partOfSpeech": "a.",
        "chinese": "不协调的，不一致的；不适宜的",
        "example": ""
      },
      {
        "id": "word-32-35",
        "english": "flush",
        "phonetic": "/flʌʃ/",
        "partOfSpeech": "v.",
        "chinese": "冲洗，清除；（使）发红；（使）脸红；奔流 n. 脸红，红光 a. 齐平的，同高的",
        "example": ""
      },
      {
        "id": "word-31-64",
        "english": "focus*",
        "phonetic": "/ˈfəukəs/",
        "partOfSpeech": "v.",
        "chinese": "（使）聚焦，（使）集中 n. 焦点，焦距；（注意力、活动等的）中心",
        "example": ""
      },
      {
        "id": "word-32-70",
        "english": "wrinkle",
        "phonetic": "/ˈrɪŋkl/",
        "partOfSpeech": "n.",
        "chinese": "皱纹 v. （使）起皱纹",
        "example": ""
      },
      {
        "id": "word-31-44",
        "english": "cite*",
        "phonetic": "/saɪt/",
        "partOfSpeech": "vt.",
        "chinese": "引用；引证",
        "example": ""
      },
      {
        "id": "word-32-31",
        "english": "suffice",
        "phonetic": "/səˈfaɪs/",
        "partOfSpeech": "v.",
        "chinese": "（使）满足，（使）满意；足够",
        "example": ""
      },
      {
        "id": "word-31-76",
        "english": "cafeteria",
        "phonetic": "/ˏkæfəˈtɪərɪə/",
        "partOfSpeech": "n.",
        "chinese": "自助餐馆；自助食堂",
        "example": ""
      },
      {
        "id": "word-31-66",
        "english": "ash",
        "phonetic": "[æʃ]",
        "partOfSpeech": "n.",
        "chinese": "灰；灰烬； [pl.] 骨灰，遗骸",
        "example": ""
      },
      {
        "id": "word-32-67",
        "english": "category",
        "phonetic": "/ˈkætəgərɪ/",
        "partOfSpeech": "n.",
        "chinese": "种类；类别；范畴",
        "example": ""
      },
      {
        "id": "word-32-63",
        "english": "calcium",
        "phonetic": "/ˈkælsɪəm/",
        "partOfSpeech": "n.",
        "chinese": "钙",
        "example": ""
      },
      {
        "id": "word-31-22",
        "english": "prototype",
        "phonetic": "/ˈprəutətaɪp/",
        "partOfSpeech": "n.",
        "chinese": "原型，蓝本",
        "example": ""
      },
      {
        "id": "word-32-42",
        "english": "aeroplane",
        "phonetic": "/ˈeərəpleɪn/",
        "partOfSpeech": "n.",
        "chinese": "飞机",
        "example": ""
      },
      {
        "id": "word-31-36",
        "english": "submerge",
        "phonetic": "/səbˈmɜːdʒ/",
        "partOfSpeech": "v.",
        "chinese": "浸没；潜入水中",
        "example": ""
      },
      {
        "id": "word-32-44",
        "english": "wagon*",
        "phonetic": "/ˈwægən/",
        "partOfSpeech": "n.",
        "chinese": "四轮马车；大篷车",
        "example": ""
      },
      {
        "id": "word-31-19",
        "english": "nutritional",
        "phonetic": "[njʊ'trɪʃənl]",
        "partOfSpeech": "a.",
        "chinese": "营养的，滋养的；营养物的，食物的",
        "example": ""
      },
      {
        "id": "word-31-73",
        "english": "profitable",
        "phonetic": "/ˈprɔfɪtəbl/",
        "partOfSpeech": "a.",
        "chinese": "有利可图的，赚钱的；有益的",
        "example": ""
      },
      {
        "id": "word-31-72",
        "english": "aeration*",
        "phonetic": "[eə'reɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "通风",
        "example": ""
      },
      {
        "id": "word-32-11",
        "english": "thrill",
        "phonetic": "/θrɪl/",
        "partOfSpeech": "v.",
        "chinese": "（使）非常激动；（使）发抖",
        "example": ""
      },
      {
        "id": "word-32-1",
        "english": "involve*",
        "phonetic": "/ɪnˈvɔlv/",
        "partOfSpeech": "vt.",
        "chinese": "使卷入，使参与；牵涉，陷入，连累；包含，含有",
        "example": ""
      },
      {
        "id": "word-32-49",
        "english": "immune",
        "phonetic": "/ɪˈmjuːn/",
        "partOfSpeech": "a.",
        "chinese": "免疫的，有免疫力的；有抵抗力的；不受影响的；免除的，免除惩罚的，豁免的",
        "example": ""
      },
      {
        "id": "word-32-25",
        "english": "simulation",
        "phonetic": "[ˌsɪmjuˈleɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "假装；模拟",
        "example": ""
      },
      {
        "id": "word-31-27",
        "english": "drum*",
        "phonetic": "/drʌm/",
        "partOfSpeech": "n.",
        "chinese": "鼓，鼓状物",
        "example": ""
      },
      {
        "id": "word-31-5",
        "english": "rural*",
        "phonetic": "/ˈruərəl/",
        "partOfSpeech": "a.",
        "chinese": "农村的，乡村的",
        "example": ""
      },
      {
        "id": "word-31-4",
        "english": "bullet*",
        "phonetic": "/ˈbulɪt/",
        "partOfSpeech": "n.",
        "chinese": "枪弹，子弹",
        "example": ""
      },
      {
        "id": "word-31-6",
        "english": "enclosure",
        "phonetic": "/ɪnˈkləuʒə(r)/",
        "partOfSpeech": "n.",
        "chinese": "四周有篱笆（或围墙等）的场地，围场；（信中的）附件",
        "example": ""
      },
      {
        "id": "word-32-39",
        "english": "demand*",
        "phonetic": "/dɪˈmɑːnd/",
        "partOfSpeech": "n.",
        "chinese": "要求；需求（量） v. 需求；需要；询问",
        "example": ""
      },
      {
        "id": "word-31-11",
        "english": "fabulous",
        "phonetic": "/ˈfæbjuləs/",
        "partOfSpeech": "a.",
        "chinese": "寓言式的；极为巨大的；极好的",
        "example": ""
      },
      {
        "id": "word-32-38",
        "english": "inject",
        "phonetic": "/ɪnˈdʒekt/",
        "partOfSpeech": "vt.",
        "chinese": "注射；注入，灌输",
        "example": ""
      },
      {
        "id": "word-31-15",
        "english": "fraught",
        "phonetic": "/frɔːt/",
        "partOfSpeech": "a.",
        "chinese": "充满……的；担心的，烦恼的",
        "example": ""
      },
      {
        "id": "word-31-8",
        "english": "revegetate",
        "phonetic": "[ri:'vedʒɪteɪt]",
        "partOfSpeech": "v.",
        "chinese": "再生长，再植",
        "example": ""
      },
      {
        "id": "word-32-7",
        "english": "stain",
        "phonetic": "/steɪn/",
        "partOfSpeech": "vt.",
        "chinese": "染污；给……着色 n. 污点",
        "example": ""
      },
      {
        "id": "word-32-20",
        "english": "credibility",
        "phonetic": "[ˌkredəˈbɪləti]",
        "partOfSpeech": "n.",
        "chinese": "可信性，可靠性",
        "example": ""
      },
      {
        "id": "word-32-50",
        "english": "carve",
        "phonetic": "/kɑːv/",
        "partOfSpeech": "v.",
        "chinese": "切；雕刻",
        "example": ""
      },
      {
        "id": "word-31-40",
        "english": "approximate",
        "phonetic": "/əˈprɔksɪmət/",
        "partOfSpeech": "a.",
        "chinese": "近似的 /əˈprɔksɪmeɪt/ vt. 近似",
        "example": ""
      },
      {
        "id": "word-31-41",
        "english": "gallery",
        "phonetic": "/ˈgælərɪ/",
        "partOfSpeech": "n.",
        "chinese": "美术馆",
        "example": ""
      },
      {
        "id": "word-32-27",
        "english": "remuneration",
        "phonetic": "[rɪˌmju:nəˈreɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "报酬",
        "example": ""
      },
      {
        "id": "word-32-41",
        "english": "grid*",
        "phonetic": "/grɪd/",
        "partOfSpeech": "n.",
        "chinese": "格子，栅格；地图上的坐标方向；输电网，煤气输送网",
        "example": ""
      },
      {
        "id": "word-31-12",
        "english": "retailing",
        "phonetic": "[ˈri:teɪlɪŋ]",
        "partOfSpeech": "n.",
        "chinese": "零售业",
        "example": ""
      },
      {
        "id": "word-31-3",
        "english": "accomplish",
        "phonetic": "/əˈkʌmplɪʃ/",
        "partOfSpeech": "vt.",
        "chinese": "达到（目的），完成（任务），实现（计划、诺言等）",
        "example": ""
      },
      {
        "id": "word-31-69",
        "english": "event*",
        "phonetic": "/ɪˈvent/",
        "partOfSpeech": "n.",
        "chinese": "事件；比赛项目",
        "example": ""
      },
      {
        "id": "word-31-31",
        "english": "bacterial",
        "phonetic": "[bæk'tɪərɪəl]",
        "partOfSpeech": "a.",
        "chinese": "细菌的；由细菌引起的",
        "example": ""
      },
      {
        "id": "word-32-61",
        "english": "cube",
        "phonetic": "/kjuːb/",
        "partOfSpeech": "n.",
        "chinese": "立方形；立方",
        "example": ""
      },
      {
        "id": "word-31-13",
        "english": "rental",
        "phonetic": "[ˈrentl]",
        "partOfSpeech": "n.",
        "chinese": "租金额；出租，租赁 a. 租用的；出租（业）的",
        "example": ""
      },
      {
        "id": "word-31-20",
        "english": "velocity",
        "phonetic": "/vɪˈlɔsətɪ/",
        "partOfSpeech": "n.",
        "chinese": "速度，速率；迅速，快速",
        "example": ""
      },
      {
        "id": "word-32-28",
        "english": "intermix",
        "phonetic": "/ˏɪntəˈmɪks/",
        "partOfSpeech": "v.",
        "chinese": "混入，混杂",
        "example": ""
      },
      {
        "id": "word-31-24",
        "english": "replicate",
        "phonetic": "['replɪkeɪt]",
        "partOfSpeech": "vt.",
        "chinese": "重复，复现或复制；再制造；再生",
        "example": ""
      },
      {
        "id": "word-31-7",
        "english": "discontinue",
        "phonetic": "/ˏdɪskənˈtɪnjuː/",
        "partOfSpeech": "v.",
        "chinese": "停止；中断；不连续",
        "example": ""
      },
      {
        "id": "word-31-61",
        "english": "maximum*",
        "phonetic": "/ˈmæksɪməm/",
        "partOfSpeech": "n.",
        "chinese": "最大量，极限 a. 最大的，最高的",
        "example": ""
      },
      {
        "id": "word-32-17",
        "english": "precipitation",
        "phonetic": "/prɪˏsɪpɪˈteɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "降雨（量），降水（量）；仓促，急躁； [化]沉淀作用",
        "example": ""
      },
      {
        "id": "word-32-65",
        "english": "advent*",
        "phonetic": "/ˈædvənt/",
        "partOfSpeech": "n.",
        "chinese": "到来；出现",
        "example": ""
      },
      {
        "id": "word-31-58",
        "english": "alter",
        "phonetic": "/ˈɔːltə(r)/",
        "partOfSpeech": "vt.",
        "chinese": "改变；变动",
        "example": ""
      },
      {
        "id": "word-32-71",
        "english": "huddle",
        "phonetic": "/ˈhʌdl/",
        "partOfSpeech": "vi.",
        "chinese": "聚焦在一起 n. 杂乱的一堆；拥挤",
        "example": ""
      },
      {
        "id": "word-32-72",
        "english": "clash*",
        "phonetic": "/klæʃ/",
        "partOfSpeech": "v.",
        "chinese": "发生冲突；不协调；砰地相撞，发出刺耳的撞击声 n. 冲突；不协调；（金属等的）刺耳的撞击声",
        "example": ""
      },
      {
        "id": "word-31-2",
        "english": "hitherto",
        "phonetic": "/ˏhɪðəˈtuː/",
        "partOfSpeech": "ad.",
        "chinese": "到目前为止，迄今",
        "example": ""
      },
      {
        "id": "word-31-21",
        "english": "unveil",
        "phonetic": "/ˏʌnˈveɪl/",
        "partOfSpeech": "v.",
        "chinese": "揭去面纱或覆盖物；揭幕；首次公开、揭露或展示（某事物）",
        "example": ""
      },
      {
        "id": "word-32-8",
        "english": "unload*",
        "phonetic": "/ˏʌnˈləud/",
        "partOfSpeech": "v.",
        "chinese": "从……卸下货物；摆脱",
        "example": ""
      },
      {
        "id": "word-32-52",
        "english": "geology",
        "phonetic": "/dʒɪˈɔlədʒɪ/",
        "partOfSpeech": "n.",
        "chinese": "地质学；地质概况",
        "example": ""
      },
      {
        "id": "word-31-1",
        "english": "scent",
        "phonetic": "/sent/",
        "partOfSpeech": "n.",
        "chinese": "香味；气味 vt. 嗅到；察觉",
        "example": ""
      },
      {
        "id": "word-32-55",
        "english": "vital*",
        "phonetic": "/ˈvaɪtl/",
        "partOfSpeech": "a.",
        "chinese": "生死攸关的；极其重要的；有生命力的",
        "example": ""
      },
      {
        "id": "word-31-54",
        "english": "symphony",
        "phonetic": "/ˈsɪmfənɪ/",
        "partOfSpeech": "n.",
        "chinese": "交响乐",
        "example": ""
      },
      {
        "id": "word-32-15",
        "english": "obstacle",
        "phonetic": "/ˈɔbstəkl/",
        "partOfSpeech": "n.",
        "chinese": "障碍，妨碍物，干扰",
        "example": ""
      },
      {
        "id": "word-31-28",
        "english": "thorny",
        "phonetic": "['θɔ:nɪ]",
        "partOfSpeech": "a.",
        "chinese": "多刺的；痛苦的，棘手的",
        "example": ""
      },
      {
        "id": "word-31-53",
        "english": "vested*",
        "phonetic": "['vestɪd]",
        "partOfSpeech": "a.",
        "chinese": "法律规定的；既定的",
        "example": ""
      },
      {
        "id": "word-31-74",
        "english": "virus",
        "phonetic": "/ˈvaɪərəs/",
        "partOfSpeech": "n.",
        "chinese": "病毒",
        "example": ""
      },
      {
        "id": "word-31-59",
        "english": "disqualify*",
        "phonetic": "/dɪsˈkwɔlɪfaɪ/",
        "partOfSpeech": "vt.",
        "chinese": "使丧失资格",
        "example": ""
      },
      {
        "id": "word-31-63",
        "english": "undergraduate*",
        "phonetic": "/ˏʌndəˈgrædʒuət/",
        "partOfSpeech": "n.",
        "chinese": "大学本科生，大学生，大学肄业生",
        "example": ""
      },
      {
        "id": "word-31-56",
        "english": "classify",
        "phonetic": "/ˈklæsɪfaɪ/",
        "partOfSpeech": "vt.",
        "chinese": "把……归类，把……分级",
        "example": ""
      },
      {
        "id": "word-31-71",
        "english": "stage*",
        "phonetic": "/steɪdʒ/",
        "partOfSpeech": "n.",
        "chinese": "舞台；戏剧；阶段",
        "example": ""
      },
      {
        "id": "word-32-22",
        "english": "curtail",
        "phonetic": "/kɜːˈteɪl/",
        "partOfSpeech": "vt.",
        "chinese": "缩短，消减；剥夺",
        "example": ""
      },
      {
        "id": "word-31-43",
        "english": "swing*",
        "phonetic": "/swɪŋ/",
        "partOfSpeech": "v.",
        "chinese": "摇摆；（使）突然转向 n. 摇摆；秋千",
        "example": ""
      },
      {
        "id": "word-32-37",
        "english": "odd",
        "phonetic": "/ɔd/",
        "partOfSpeech": "a.",
        "chinese": "奇特的；临时的；奇数的",
        "example": ""
      },
      {
        "id": "word-31-18",
        "english": "underpin",
        "phonetic": "/ˏʌndəˈpɪn/",
        "partOfSpeech": "vt.",
        "chinese": "加固……的基础；加强，巩固",
        "example": ""
      },
      {
        "id": "word-31-17",
        "english": "unobtrusive",
        "phonetic": "/ˏʌnəbˈtruːsɪv/",
        "partOfSpeech": "a.",
        "chinese": "不显著的，不引人注目的；不张扬的",
        "example": ""
      },
      {
        "id": "word-31-47",
        "english": "identity*",
        "phonetic": "/aɪˈdentətɪ/",
        "partOfSpeech": "n.",
        "chinese": "身份；特性；同一性",
        "example": ""
      },
      {
        "id": "word-31-62",
        "english": "delivery",
        "phonetic": "/dɪˈlɪvərɪ/",
        "partOfSpeech": "n.",
        "chinese": "投递，交付；分娩",
        "example": ""
      },
      {
        "id": "word-32-51",
        "english": "canoe*",
        "phonetic": "/kəˈnuː/",
        "partOfSpeech": "n.",
        "chinese": "独木舟",
        "example": ""
      },
      {
        "id": "word-31-55",
        "english": "locate*",
        "phonetic": "/ləuˈkeɪt/",
        "partOfSpeech": "vt.",
        "chinese": "找到；位于；使坐落于；把……设置在",
        "example": ""
      },
      {
        "id": "word-31-46",
        "english": "drawback",
        "phonetic": "/ˈdrɔːbæk/",
        "partOfSpeech": "n.",
        "chinese": "缺点；不利条件",
        "example": ""
      },
      {
        "id": "word-32-12",
        "english": "trial*",
        "phonetic": "/ˈtraɪəl/",
        "partOfSpeech": "n.",
        "chinese": "审讯；试验 a. 试验性的",
        "example": ""
      },
      {
        "id": "word-31-70",
        "english": "crucial",
        "phonetic": "/ˈkruːʃl/",
        "partOfSpeech": "a.",
        "chinese": "决定性的；至关重要的",
        "example": ""
      },
      {
        "id": "word-32-30",
        "english": "hypnotic",
        "phonetic": "[hɪpˈnɒtɪk]",
        "partOfSpeech": "a.",
        "chinese": "催眠的 n. 催眠药",
        "example": ""
      },
      {
        "id": "word-32-40",
        "english": "unsatisfactory*",
        "phonetic": "[ˌʌnˌsætɪsˈfæktəri]",
        "partOfSpeech": "a.",
        "chinese": "不能令人满意的",
        "example": ""
      },
      {
        "id": "word-32-5",
        "english": "hurricane",
        "phonetic": "/ˈhʌrɪkən/",
        "partOfSpeech": "n.",
        "chinese": "飓风",
        "example": ""
      },
      {
        "id": "word-32-62",
        "english": "construct*",
        "phonetic": "/kənˈstrʌkt/",
        "partOfSpeech": "vt.",
        "chinese": "建造；构思，构筑；创立 {ˈkɒnstrʌkt} n. 构想，观念",
        "example": ""
      },
      {
        "id": "word-32-32",
        "english": "technician",
        "phonetic": "/tekˈnɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "技术员，技师",
        "example": ""
      },
      {
        "id": "word-32-53",
        "english": "directory",
        "phonetic": "[dəˈrektəri]",
        "partOfSpeech": "n.",
        "chinese": "人名地址录；（电话）号码簿",
        "example": ""
      },
      {
        "id": "word-32-46",
        "english": "tag",
        "phonetic": "/tæg/",
        "partOfSpeech": "n.",
        "chinese": "标签；附加语 v. 跟随；给……加标签；添加",
        "example": ""
      },
      {
        "id": "word-32-60",
        "english": "cholesterol",
        "phonetic": "/kəˈlestərɔl/",
        "partOfSpeech": "n.",
        "chinese": "胆固醇",
        "example": ""
      },
      {
        "id": "word-32-57",
        "english": "reveal*",
        "phonetic": "/rɪˈviːl/",
        "partOfSpeech": "vt.",
        "chinese": "揭露；泄露；展现",
        "example": ""
      },
      {
        "id": "word-32-36",
        "english": "stir",
        "phonetic": "/stɜː(r)/",
        "partOfSpeech": "v./n.",
        "chinese": "搅动；摇动；激动",
        "example": ""
      },
      {
        "id": "word-32-29",
        "english": "paramount",
        "phonetic": "/ˈpærəmaunt/",
        "partOfSpeech": "a.",
        "chinese": "最重要的，决定性的 n. 最高统治者",
        "example": ""
      },
      {
        "id": "word-32-69",
        "english": "confusion",
        "phonetic": "/kənˈfjuːʒn/",
        "partOfSpeech": "n.",
        "chinese": "困惑，糊涂；混淆；混乱，杂乱，无秩序状态，骚乱",
        "example": ""
      },
      {
        "id": "word-32-24",
        "english": "afflicting",
        "phonetic": "[ə'flɪktɪŋ]",
        "partOfSpeech": "a.",
        "chinese": "痛苦的",
        "example": ""
      },
      {
        "id": "word-32-10",
        "english": "irrelevant*",
        "phonetic": "/ɪˈreləvənt/",
        "partOfSpeech": "a.",
        "chinese": "不相关的；离题的",
        "example": ""
      },
      {
        "id": "word-32-18",
        "english": "precarious",
        "phonetic": "/prɪˈkeərɪəs/",
        "partOfSpeech": "a.",
        "chinese": "不安全的，充满危险的；不牢靠的，不稳固的",
        "example": ""
      },
      {
        "id": "word-32-14",
        "english": "albeit",
        "phonetic": "/ˏɔːlˈbiːɪt/",
        "partOfSpeech": "conj.",
        "chinese": "虽然，尽管",
        "example": ""
      },
      {
        "id": "word-32-58",
        "english": "visible*",
        "phonetic": "/ˈvɪzəbl/",
        "partOfSpeech": "a.",
        "chinese": "可见的，看得见的；有形的；明显的，显而易见的",
        "example": ""
      },
      {
        "id": "word-32-68",
        "english": "fault",
        "phonetic": "/fɔːlt/",
        "partOfSpeech": "n.",
        "chinese": "缺点，瑕疵，毛病",
        "example": ""
      },
      {
        "id": "word-31-29",
        "english": "eligible",
        "phonetic": "/ˈelɪdʒəbl/",
        "partOfSpeech": "a.",
        "chinese": "符合条件的；合适的",
        "example": ""
      }
    ],
    "article": "In the field of Scientific Discovery, researchers have been studying various phenomena to understand their implications. The concept of hinge* has been widely discussed in recent studies. The concept of meagre has been widely discussed in recent studies. The concept of dispersal has been widely discussed in recent studies. The concept of inventory has been widely discussed in recent studies. The concept of enthusiastic has been widely discussed in recent studies. The concept of administer* has been widely discussed in recent studies. The concept of confirm* has been widely discussed in recent studies. The concept of capsize has been widely discussed in recent studies. The concept of intensify has been widely discussed in recent studies. The concept of reputation* has been widely discussed in recent studies. Researchers have found that these factors play a significant role in shaping our understanding of the subject. Further studies are needed to explore the full implications of these findings."
  },
  {
    "id": "unit-17",
    "name": "Unit 17: Word Lists 33 & 34",
    "words": [
      {
        "id": "word-33-61",
        "english": "probable*",
        "phonetic": "/ˈprɔbəbl/",
        "partOfSpeech": "a.",
        "chinese": "很可能的，大概的",
        "example": ""
      },
      {
        "id": "word-33-50",
        "english": "stock",
        "phonetic": "/stɔk/",
        "partOfSpeech": "n.",
        "chinese": "储备品；股票； <总称> 家畜 v. 储备 a. 常备的",
        "example": ""
      },
      {
        "id": "word-34-41",
        "english": "strain",
        "phonetic": "/streɪn/",
        "partOfSpeech": "v./n.",
        "chinese": "拉紧，绷紧；扭伤，拉伤；（使）过劳，（使）极度紧张",
        "example": ""
      },
      {
        "id": "word-33-73",
        "english": "briefly*",
        "phonetic": "[ˈbri:fli]",
        "partOfSpeech": "ad.",
        "chinese": "暂时地；简要地",
        "example": ""
      },
      {
        "id": "word-34-1",
        "english": "mixture",
        "phonetic": "/ˈmɪkstʃə(r)/",
        "partOfSpeech": "n.",
        "chinese": "混合（物）",
        "example": ""
      },
      {
        "id": "word-33-47",
        "english": "exhibit*",
        "phonetic": "/ɪgˈzɪbɪt/",
        "partOfSpeech": "n.",
        "chinese": "展览品 v. 陈列，展览；显示",
        "example": ""
      },
      {
        "id": "word-33-70",
        "english": "stab",
        "phonetic": "[stæb]",
        "partOfSpeech": "v.",
        "chinese": "刺，戳",
        "example": ""
      },
      {
        "id": "word-33-20",
        "english": "memorise",
        "phonetic": "/ˈmeməraɪz/",
        "partOfSpeech": "vt.",
        "chinese": "记住，熟记",
        "example": ""
      },
      {
        "id": "word-33-14",
        "english": "character*",
        "phonetic": "/ˈkærəktə(r)/",
        "partOfSpeech": "n.",
        "chinese": "性格，品质；性质，特性；人物，角色；（书写或印刷）符号，（汉）字",
        "example": ""
      },
      {
        "id": "word-33-38",
        "english": "frustration",
        "phonetic": "[frʌ'streɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "沮丧，不满",
        "example": ""
      },
      {
        "id": "word-33-49",
        "english": "shelter*",
        "phonetic": "/ˈʃeltə(r)/",
        "partOfSpeech": "n.",
        "chinese": "掩蔽（处），隐蔽（处）；住所；保护 v. 掩蔽；躲避",
        "example": ""
      },
      {
        "id": "word-33-31",
        "english": "maternal",
        "phonetic": "/məˈtɜːnl/",
        "partOfSpeech": "a.",
        "chinese": "母亲的；母系的",
        "example": ""
      },
      {
        "id": "word-33-21",
        "english": "retrenchment",
        "phonetic": "[rɪ'trentʃmənt]",
        "partOfSpeech": "n.",
        "chinese": "节省；削减",
        "example": ""
      },
      {
        "id": "word-33-36",
        "english": "disseminate",
        "phonetic": "/dɪˈsemɪneɪt/",
        "partOfSpeech": "v.",
        "chinese": "散布，传播",
        "example": ""
      },
      {
        "id": "word-33-9",
        "english": "decrease*",
        "phonetic": "/dɪˈkriːs/",
        "partOfSpeech": "v.",
        "chinese": "减少，减小 /ˈdiːkriːs/ n. 减少；减少量",
        "example": ""
      },
      {
        "id": "word-33-57",
        "english": "burrow*",
        "phonetic": "/ˈbʌrəu/",
        "partOfSpeech": "v.",
        "chinese": "挖掘，钻进；翻寻 n. 地洞",
        "example": ""
      },
      {
        "id": "word-33-8",
        "english": "livestock",
        "phonetic": "/ˈlaɪvstɔk/",
        "partOfSpeech": "n.",
        "chinese": "<总称> 家畜，牲畜",
        "example": ""
      },
      {
        "id": "word-33-44",
        "english": "Cantonese*",
        "phonetic": "/ˏkæntəˈniːz/",
        "partOfSpeech": "n./a.",
        "chinese": "广东人（的）；广东话（的）",
        "example": ""
      },
      {
        "id": "word-33-35",
        "english": "taunt",
        "phonetic": "/tɔːnt/",
        "partOfSpeech": "vt.",
        "chinese": "嘲笑，讥笑 n. [常pl.] 嘲弄的言语，讥讽",
        "example": ""
      },
      {
        "id": "word-33-71",
        "english": "fingerprint",
        "phonetic": "['fɪŋɡəprɪnt]",
        "partOfSpeech": "n.",
        "chinese": "指纹，手印",
        "example": ""
      },
      {
        "id": "word-33-75",
        "english": "commodity*",
        "phonetic": "/kəˈmɔdətɪ/",
        "partOfSpeech": "n.",
        "chinese": "商品，货物；日用品",
        "example": ""
      },
      {
        "id": "word-33-62",
        "english": "fortnight",
        "phonetic": "/ˈfɔːtnaɪt/",
        "partOfSpeech": "n.",
        "chinese": "两星期，十四天",
        "example": ""
      },
      {
        "id": "word-33-24",
        "english": "intervention",
        "phonetic": "[ˌɪntə'venʃn]",
        "partOfSpeech": "n.",
        "chinese": "干涉，干预，介入",
        "example": ""
      },
      {
        "id": "word-33-37",
        "english": "sanction",
        "phonetic": "/ˈsæŋkʃn/",
        "partOfSpeech": "v.",
        "chinese": "批准，认可 n. 批准，认可；约束因素，约束力；[常pl.] 国际制裁",
        "example": ""
      },
      {
        "id": "word-33-58",
        "english": "equivalent",
        "phonetic": "/ɪˈkwɪvələnt/",
        "partOfSpeech": "a.",
        "chinese": "相等的，等量的 n. 相等物，等价物",
        "example": ""
      },
      {
        "id": "word-33-23",
        "english": "reinforcement",
        "phonetic": "[ˌri:ɪn'fɔ:smənt]",
        "partOfSpeech": "n.",
        "chinese": "增援，加强，加固",
        "example": ""
      },
      {
        "id": "word-33-69",
        "english": "colony*",
        "phonetic": "/ˈkɔlənɪ/",
        "partOfSpeech": "n.",
        "chinese": "殖民地；（动植物的）群体",
        "example": ""
      },
      {
        "id": "word-33-11",
        "english": "weigh",
        "phonetic": "/weɪ/",
        "partOfSpeech": "v.",
        "chinese": "称重；认真考虑，权衡",
        "example": ""
      },
      {
        "id": "word-33-10",
        "english": "moral",
        "phonetic": "/ˈmɔrəl/",
        "partOfSpeech": "a.",
        "chinese": "道德的，伦理的 n. [pl.] 品行，道德；寓意，教训",
        "example": ""
      },
      {
        "id": "word-33-19",
        "english": "manipulative",
        "phonetic": "[mə'nɪpjələtɪv]",
        "partOfSpeech": "a.",
        "chinese": "操纵别人的；老于世故的",
        "example": ""
      },
      {
        "id": "word-33-28",
        "english": "extravagance",
        "phonetic": "[ɪkˈstrævəgəns]",
        "partOfSpeech": "n.",
        "chinese": "奢侈，挥霍；放肆的言行",
        "example": ""
      },
      {
        "id": "word-33-54",
        "english": "hollow",
        "phonetic": "/ˈhɔləu/",
        "partOfSpeech": "a.",
        "chinese": "空的，空洞的；（声音）沉闷的；虚伪的，空虚的 v. 挖空，凿空",
        "example": ""
      },
      {
        "id": "word-34-51",
        "english": "element*",
        "phonetic": "/ˈelɪmənt/",
        "partOfSpeech": "n.",
        "chinese": "要素；元素； [the -s] 基本原理",
        "example": ""
      },
      {
        "id": "word-34-43",
        "english": "leukaemia*",
        "phonetic": "/luːˈkiːmɪə/",
        "partOfSpeech": "n.",
        "chinese": "白血病",
        "example": ""
      },
      {
        "id": "word-34-45",
        "english": "centennial",
        "phonetic": "/senˈtenɪəl/",
        "partOfSpeech": "n.",
        "chinese": "百年纪念 a. 一百年的",
        "example": ""
      },
      {
        "id": "word-34-72",
        "english": "apparent*",
        "phonetic": "/əˈpærənt/",
        "partOfSpeech": "a.",
        "chinese": "显然的；表面上的",
        "example": ""
      },
      {
        "id": "word-34-54",
        "english": "muscle",
        "phonetic": "/ˈmʌsl/",
        "partOfSpeech": "n.",
        "chinese": "肌肉；体力；力量，实力",
        "example": ""
      },
      {
        "id": "word-34-44",
        "english": "terminology*",
        "phonetic": "/ˏtɜːmɪˈnɔlədʒɪ/",
        "partOfSpeech": "n.",
        "chinese": "（某学科的）专门用语；术语",
        "example": ""
      },
      {
        "id": "word-33-41",
        "english": "condense*",
        "phonetic": "/kənˈdens/",
        "partOfSpeech": "v.",
        "chinese": "（使）压缩，精简；（使）凝结",
        "example": ""
      },
      {
        "id": "word-33-17",
        "english": "earthworm",
        "phonetic": "[ˈɜ:θˌwɜ:m]",
        "partOfSpeech": "n.",
        "chinese": "蚯蚓；小人",
        "example": ""
      },
      {
        "id": "word-34-39",
        "english": "venomous",
        "phonetic": "[ˈvenəməs]",
        "partOfSpeech": "a.",
        "chinese": "有毒的；分泌毒液的；恶意的，狠毒的",
        "example": ""
      },
      {
        "id": "word-33-72",
        "english": "enthusiasm",
        "phonetic": "/ɪnˈθjuːzɪæzəm/",
        "partOfSpeech": "n.",
        "chinese": "热情，热心，积极性；热衷的事物",
        "example": ""
      },
      {
        "id": "word-34-4",
        "english": "assess*",
        "phonetic": "/əˈses/",
        "partOfSpeech": "vt.",
        "chinese": "评定；估价",
        "example": ""
      },
      {
        "id": "word-34-46",
        "english": "Mediterranean*",
        "phonetic": "/ˏmedɪtəˈreɪnɪən/",
        "partOfSpeech": "a.",
        "chinese": "地中海（式）的 n. 地中海",
        "example": ""
      },
      {
        "id": "word-33-64",
        "english": "flavour",
        "phonetic": "/ˈfleɪvə(r)/",
        "partOfSpeech": "n.",
        "chinese": "风味，滋味 vt. 给……调味",
        "example": ""
      },
      {
        "id": "word-34-65",
        "english": "remote*",
        "phonetic": "/rɪˈməut/",
        "partOfSpeech": "a.",
        "chinese": "远的，长久的；遥远的，偏僻的；远程的；关系疏远的，脱离的；绝少的，微乎其微的；孤高的，冷淡的",
        "example": ""
      },
      {
        "id": "word-33-56",
        "english": "bark*",
        "phonetic": "/bɑːk/",
        "partOfSpeech": "vi.",
        "chinese": "吠叫 n. 犬吠声；树皮",
        "example": ""
      },
      {
        "id": "word-34-3",
        "english": "lane*",
        "phonetic": "/leɪn/",
        "partOfSpeech": "n.",
        "chinese": "小巷；行车道",
        "example": ""
      },
      {
        "id": "word-33-29",
        "english": "victimise",
        "phonetic": "/ˈvɪktɪmaɪz/",
        "partOfSpeech": "v.",
        "chinese": "（使）受害，迫害",
        "example": ""
      },
      {
        "id": "word-34-17",
        "english": "reptile",
        "phonetic": "/ˈreptaɪl/",
        "partOfSpeech": "n.",
        "chinese": "爬行动物，爬虫类；卑鄙的人",
        "example": ""
      },
      {
        "id": "word-33-74",
        "english": "flint*",
        "phonetic": "/flɪnt/",
        "partOfSpeech": "n.",
        "chinese": "火石，打火石",
        "example": ""
      },
      {
        "id": "word-33-52",
        "english": "career*",
        "phonetic": "/kəˈrɪə(r)/",
        "partOfSpeech": "n.",
        "chinese": "生涯；经历；职业",
        "example": ""
      },
      {
        "id": "word-33-7",
        "english": "absorb*",
        "phonetic": "/əbˈsɔːb/",
        "partOfSpeech": "v.",
        "chinese": "吸收；吸引……的注意，使全神贯注；把……并入，同化",
        "example": ""
      },
      {
        "id": "word-34-36",
        "english": "subsequent*",
        "phonetic": "/ˈsʌbsɪkwənt/",
        "partOfSpeech": "a.",
        "chinese": "继……之后的，随后的",
        "example": ""
      },
      {
        "id": "word-34-5",
        "english": "inductive*",
        "phonetic": "/ɪnˈdʌktɪv/",
        "partOfSpeech": "a.",
        "chinese": "诱导的，归纳的",
        "example": ""
      },
      {
        "id": "word-34-11",
        "english": "intake",
        "phonetic": "/ˈɪnteɪk/",
        "partOfSpeech": "n.",
        "chinese": "吸入，纳入；进气口，入口",
        "example": ""
      },
      {
        "id": "word-34-33",
        "english": "innovation",
        "phonetic": "[ˌɪnəˈveɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "革新，创新",
        "example": ""
      },
      {
        "id": "word-34-56",
        "english": "metaphor*",
        "phonetic": "/ˈmetəfə(r)/",
        "partOfSpeech": "n.",
        "chinese": "隐喻，暗喻",
        "example": ""
      },
      {
        "id": "word-34-9",
        "english": "unwrap",
        "phonetic": "[ʌnˈræp]",
        "partOfSpeech": "vt.",
        "chinese": "打开，解开；除去包装",
        "example": ""
      },
      {
        "id": "word-34-50",
        "english": "fulfil*",
        "phonetic": "/fulˈfɪl/",
        "partOfSpeech": "vt.",
        "chinese": "实现，完成；满足",
        "example": ""
      },
      {
        "id": "word-33-39",
        "english": "invert*",
        "phonetic": "/ɪnˈvɜːt/",
        "partOfSpeech": "vt.",
        "chinese": "（使）倒转，（使）颠倒",
        "example": ""
      },
      {
        "id": "word-33-6",
        "english": "astound",
        "phonetic": "/əˈstaund/",
        "partOfSpeech": "v.",
        "chinese": "（使）震惊",
        "example": ""
      },
      {
        "id": "word-34-70",
        "english": "owl",
        "phonetic": "/aul/",
        "partOfSpeech": "n.",
        "chinese": "猫头鹰",
        "example": ""
      },
      {
        "id": "word-33-5",
        "english": "cohesion*",
        "phonetic": "/kəuˈhiːʒn/",
        "partOfSpeech": "v.",
        "chinese": "结合，团结；凝聚力",
        "example": ""
      },
      {
        "id": "word-33-43",
        "english": "gather*",
        "phonetic": "/ˈgæðə(r)/",
        "partOfSpeech": "v.",
        "chinese": "聚焦，集合，聚拢；收集，采集；逐渐增加；猜想，推测",
        "example": ""
      },
      {
        "id": "word-34-69",
        "english": "bucket",
        "phonetic": "/ˈbʌkɪt/",
        "partOfSpeech": "n.",
        "chinese": "水桶",
        "example": ""
      },
      {
        "id": "word-34-12",
        "english": "penetration",
        "phonetic": "/ˏpenɪˈtreɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "进入，穿过；洞察力，领悟力",
        "example": ""
      },
      {
        "id": "word-33-42",
        "english": "unfortunately*",
        "phonetic": "[ʌnˈfɔ:tʃənətli]",
        "partOfSpeech": "ad.",
        "chinese": "不幸地",
        "example": ""
      },
      {
        "id": "word-34-15",
        "english": "triumphant",
        "phonetic": "[traɪˈʌmfənt]",
        "partOfSpeech": "a.",
        "chinese": "得胜的；得意洋洋的；狂欢的",
        "example": ""
      },
      {
        "id": "word-34-55",
        "english": "function",
        "phonetic": "/ˈfʌŋkʃn/",
        "partOfSpeech": "vi.",
        "chinese": "运行，起作用 n. 功能；职责，作用；函数",
        "example": ""
      },
      {
        "id": "word-33-25",
        "english": "infirmity",
        "phonetic": "[ɪn'fɜ:mətɪ]",
        "partOfSpeech": "n.",
        "chinese": "虚弱，衰弱",
        "example": ""
      },
      {
        "id": "word-33-15",
        "english": "arrange*",
        "phonetic": "/əˈreɪndʒ/",
        "partOfSpeech": "v.",
        "chinese": "安排；排列",
        "example": ""
      },
      {
        "id": "word-34-53",
        "english": "orchestra",
        "phonetic": "/ˈɔːkɪstrə/",
        "partOfSpeech": "n.",
        "chinese": "管弦乐队",
        "example": ""
      },
      {
        "id": "word-33-22",
        "english": "motivational",
        "phonetic": "[ˌməʊtɪ'veɪʃənl]",
        "partOfSpeech": "a.",
        "chinese": "动机的，有关动机的",
        "example": ""
      },
      {
        "id": "word-33-66",
        "english": "lethal*",
        "phonetic": "/ˈliːθl/",
        "partOfSpeech": "a.",
        "chinese": "致命的，破坏性的，毁灭性的；有害的",
        "example": ""
      },
      {
        "id": "word-33-27",
        "english": "escalate",
        "phonetic": "/ˈeskəleɪt/",
        "partOfSpeech": "v.",
        "chinese": "（使）逐步增长或发展，（使）逐步升级",
        "example": ""
      },
      {
        "id": "word-34-2",
        "english": "tendency*",
        "phonetic": "['tendənsɪ]",
        "partOfSpeech": "n.",
        "chinese": "倾向，趋向",
        "example": ""
      },
      {
        "id": "word-33-16",
        "english": "conservation*",
        "phonetic": "/ˏkɔnsəˈveɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "保存；保护",
        "example": ""
      },
      {
        "id": "word-33-4",
        "english": "exceed",
        "phonetic": "/ɪkˈsiːd/",
        "partOfSpeech": "v.",
        "chinese": "超过，胜过",
        "example": ""
      },
      {
        "id": "word-33-51",
        "english": "devise*",
        "phonetic": "/dɪˈvaɪz/",
        "partOfSpeech": "vt.",
        "chinese": "设计，发明",
        "example": ""
      },
      {
        "id": "word-34-62",
        "english": "complete*",
        "phonetic": "/kəmˈpliːt/",
        "partOfSpeech": "a.",
        "chinese": "彻底的；完成的；绝对的 vt. 完成；结束",
        "example": ""
      },
      {
        "id": "word-33-48",
        "english": "irrevocable*",
        "phonetic": "/ɪˈrevəkəbl/",
        "partOfSpeech": "a.",
        "chinese": "无法取消的，不能改变的",
        "example": ""
      },
      {
        "id": "word-33-53",
        "english": "humidity",
        "phonetic": "[hju:ˈmɪdəti]",
        "partOfSpeech": "n.",
        "chinese": "湿度；潮湿",
        "example": ""
      },
      {
        "id": "word-33-46",
        "english": "utility*",
        "phonetic": "/juːˈtɪlətɪ/",
        "partOfSpeech": "n.",
        "chinese": "功用，效用； [常pl.] 公用事业",
        "example": ""
      },
      {
        "id": "word-34-66",
        "english": "stove",
        "phonetic": "/stəuv/",
        "partOfSpeech": "n.",
        "chinese": "炉",
        "example": ""
      },
      {
        "id": "word-33-40",
        "english": "recipe",
        "phonetic": "/ˈresəpɪ/",
        "partOfSpeech": "n.",
        "chinese": "食谱；方法，秘诀，秘方",
        "example": ""
      },
      {
        "id": "word-34-8",
        "english": "negative*",
        "phonetic": "/ˈnegətɪv/",
        "partOfSpeech": "a.",
        "chinese": "否定的，反面的；消极的；负的，阴性的 n. 负数；（照相的）底片",
        "example": ""
      },
      {
        "id": "word-34-68",
        "english": "dismiss*",
        "phonetic": "/dɪsˈmɪs/",
        "partOfSpeech": "v.",
        "chinese": "解雇，解散；驳回，不受理",
        "example": ""
      },
      {
        "id": "word-33-55",
        "english": "statistic",
        "phonetic": "[stəˈtɪstɪk]",
        "partOfSpeech": "n.",
        "chinese": "统计数值；统计学",
        "example": ""
      },
      {
        "id": "word-34-31",
        "english": "complicated",
        "phonetic": "['kɒmplɪkeɪtɪd]",
        "partOfSpeech": "a.",
        "chinese": "复杂的；难懂的",
        "example": ""
      },
      {
        "id": "word-34-47",
        "english": "outdo*",
        "phonetic": "/ˏautˈduː/",
        "partOfSpeech": "vt.",
        "chinese": "超越，胜过",
        "example": ""
      },
      {
        "id": "word-34-6",
        "english": "session",
        "phonetic": "/ˈseʃn/",
        "partOfSpeech": "n.",
        "chinese": "一场，一节；会议；集会",
        "example": ""
      },
      {
        "id": "word-33-12",
        "english": "ceramic",
        "phonetic": "[səˈræmɪk]",
        "partOfSpeech": "a.",
        "chinese": "陶器的 n. [pl.] 陶瓷器",
        "example": ""
      },
      {
        "id": "word-34-21",
        "english": "precedent",
        "phonetic": "/ˈpresɪdənt/",
        "partOfSpeech": "n.",
        "chinese": "先例，范例；惯例",
        "example": ""
      },
      {
        "id": "word-34-57",
        "english": "delegate",
        "phonetic": "/ˈdelɪgət/",
        "partOfSpeech": "n.",
        "chinese": "代表，代表团成员 /ˈdelɪgeɪt/ vt. 委派……为代表；授（权）给……，把……委托给……",
        "example": ""
      },
      {
        "id": "word-34-35",
        "english": "feedback*",
        "phonetic": "/ˈfiːdbæk/",
        "partOfSpeech": "n.",
        "chinese": "反馈；反馈信息",
        "example": ""
      },
      {
        "id": "word-34-22",
        "english": "obscurity",
        "phonetic": "[əb'skjʊərətɪ]",
        "partOfSpeech": "n.",
        "chinese": "模糊；费解；不出名",
        "example": ""
      },
      {
        "id": "word-34-10",
        "english": "punctual",
        "phonetic": "/ˈpʌŋktʃuəl/",
        "partOfSpeech": "a.",
        "chinese": "守时的；准时的",
        "example": ""
      },
      {
        "id": "word-34-64",
        "english": "generate",
        "phonetic": "/ˈdʒenəreɪt/",
        "partOfSpeech": "vt.",
        "chinese": "发生，生产（光、热、电等）；引起，导致",
        "example": ""
      },
      {
        "id": "word-34-59",
        "english": "radiate",
        "phonetic": "/ˈreɪdɪeɪt/",
        "partOfSpeech": "v.",
        "chinese": "发光；发热；辐射",
        "example": ""
      },
      {
        "id": "word-34-16",
        "english": "plagiarise",
        "phonetic": "/ˈpleɪdʒəraɪz/",
        "partOfSpeech": "v.",
        "chinese": "剽窃，抄袭",
        "example": ""
      },
      {
        "id": "word-34-49",
        "english": "consequent",
        "phonetic": "/ˈkɔnsɪkwənt/",
        "partOfSpeech": "a.",
        "chinese": "作为结果的；随之发生的",
        "example": ""
      },
      {
        "id": "word-34-19",
        "english": "patronage",
        "phonetic": "/ˈpætrənɪdʒ/",
        "partOfSpeech": "n.",
        "chinese": "赞助；支持；光顾；任免权",
        "example": ""
      },
      {
        "id": "word-33-63",
        "english": "treadmill*",
        "phonetic": "[ˈtredmɪl]",
        "partOfSpeech": "n.",
        "chinese": "（人或畜力的）踏车；累人的活；单调的例行工作，乏味繁重的工作",
        "example": ""
      },
      {
        "id": "word-33-3",
        "english": "imitation",
        "phonetic": "/ˏɪmɪˈteɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "模仿；仿造；仿制品，假货，赝品",
        "example": ""
      },
      {
        "id": "word-34-23",
        "english": "ascertain",
        "phonetic": "/ˏæsəˈteɪn/",
        "partOfSpeech": "vt.",
        "chinese": "弄清，查明；确定",
        "example": ""
      },
      {
        "id": "word-33-65",
        "english": "asymmetry*",
        "phonetic": "[ˌeɪ'sɪmətrɪ]",
        "partOfSpeech": "n.",
        "chinese": "不对称",
        "example": ""
      },
      {
        "id": "word-34-25",
        "english": "legitimacy",
        "phonetic": "[lɪ'dʒɪtɪməsɪ]",
        "partOfSpeech": "n.",
        "chinese": "合法性；正统性",
        "example": ""
      },
      {
        "id": "word-34-13",
        "english": "municipal",
        "phonetic": "/mjuːˈnɪsɪpl/",
        "partOfSpeech": "a.",
        "chinese": "市的，市政的；地区的；内政的",
        "example": ""
      },
      {
        "id": "word-34-58",
        "english": "fragile",
        "phonetic": "/ˈfrædʒaɪl/",
        "partOfSpeech": "a.",
        "chinese": "脆弱的；虚弱的；易碎的；易受伤害的",
        "example": ""
      },
      {
        "id": "word-33-33",
        "english": "recalcitrant",
        "phonetic": "/rɪˈkælsɪtrənt/",
        "partOfSpeech": "a.",
        "chinese": "顽抗的，反抗的",
        "example": ""
      },
      {
        "id": "word-34-42",
        "english": "champion*",
        "phonetic": "/ˈtʃæmpɪən/",
        "partOfSpeech": "n.",
        "chinese": "冠军",
        "example": ""
      },
      {
        "id": "word-33-34",
        "english": "mortality",
        "phonetic": "/mɔːˈtælətɪ/",
        "partOfSpeech": "n.",
        "chinese": "死亡率",
        "example": ""
      },
      {
        "id": "word-33-45",
        "english": "advertise*",
        "phonetic": "/ˈædvətaɪz/",
        "partOfSpeech": "vt.",
        "chinese": "为……做广告；宣传；（在报刊、电视、广播中）公告，公布",
        "example": ""
      },
      {
        "id": "word-34-38",
        "english": "council*",
        "phonetic": "/ˈkaunsl/",
        "partOfSpeech": "n.",
        "chinese": "理事会，委员会",
        "example": ""
      },
      {
        "id": "word-33-60",
        "english": "bibliography",
        "phonetic": "/ˏbɪblɪˈɔgrəfɪ/",
        "partOfSpeech": "n.",
        "chinese": "参考书目；书目；文献学",
        "example": ""
      },
      {
        "id": "word-34-34",
        "english": "glitter",
        "phonetic": "/ˈglɪtə(r)/",
        "partOfSpeech": "n./vi.",
        "chinese": "闪光",
        "example": ""
      },
      {
        "id": "word-34-63",
        "english": "kit",
        "phonetic": "/kɪt/",
        "partOfSpeech": "n.",
        "chinese": "成套工具 v. 装备",
        "example": ""
      },
      {
        "id": "word-34-37",
        "english": "shark",
        "phonetic": "/ʃɑːk/",
        "partOfSpeech": "n.",
        "chinese": "鲨鱼；诈骗者",
        "example": ""
      },
      {
        "id": "word-34-28",
        "english": "malevolent",
        "phonetic": "/məˈlevələnt/",
        "partOfSpeech": "a.",
        "chinese": "有恶意的；恶毒的",
        "example": ""
      },
      {
        "id": "word-34-74",
        "english": "stretch",
        "phonetic": "/stretʃ/",
        "partOfSpeech": "v.",
        "chinese": "伸展；延伸，延续，拉长；使倾注全力，使紧张 n. 一段（时间、路径）；伸展，延伸，延续",
        "example": ""
      },
      {
        "id": "word-34-29",
        "english": "downsize*",
        "phonetic": "['daʊnsaɪz]",
        "partOfSpeech": "v.",
        "chinese": "缩小，紧缩",
        "example": ""
      },
      {
        "id": "word-33-30",
        "english": "evaluation",
        "phonetic": "[ɪˌvæljʊ'eɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "估价，评价",
        "example": ""
      },
      {
        "id": "word-33-59",
        "english": "fatigue",
        "phonetic": "/fəˈtiːg/",
        "partOfSpeech": "n.",
        "chinese": "疲劳，劳累 v. （使）疲劳",
        "example": ""
      },
      {
        "id": "word-34-27",
        "english": "benevolent",
        "phonetic": "/bɪˈnevələnt/",
        "partOfSpeech": "a.",
        "chinese": "善心的，仁心的",
        "example": ""
      },
      {
        "id": "word-34-73",
        "english": "succumb*",
        "phonetic": "/səˈkʌm/",
        "partOfSpeech": "vi.",
        "chinese": "屈服，屈从；（因……）死亡",
        "example": ""
      },
      {
        "id": "word-34-18",
        "english": "circumscribe",
        "phonetic": "/ˈsɜːkəmskraɪb/",
        "partOfSpeech": "vt.",
        "chinese": "在……周围画线；限制",
        "example": ""
      },
      {
        "id": "word-34-26",
        "english": "discrepancy",
        "phonetic": "/dɪˈskrepənsɪ/",
        "partOfSpeech": "n.",
        "chinese": "不同；矛盾",
        "example": ""
      },
      {
        "id": "word-34-30",
        "english": "lunar",
        "phonetic": "/ˈluːnə(r)/",
        "partOfSpeech": "a.",
        "chinese": "月的；月亮的",
        "example": ""
      },
      {
        "id": "word-34-71",
        "english": "absenteeism*",
        "phonetic": "[ˌæbsənˈti:ɪzəm]",
        "partOfSpeech": "n.",
        "chinese": "旷课；旷工",
        "example": ""
      },
      {
        "id": "word-33-2",
        "english": "booth",
        "phonetic": "/buːð/",
        "partOfSpeech": "n.",
        "chinese": "（隔开的）小房间；公用电话亭；售货棚",
        "example": ""
      },
      {
        "id": "word-33-1",
        "english": "marble",
        "phonetic": "/ˈmɑːbl/",
        "partOfSpeech": "n.",
        "chinese": "大理石；弹子； [pl.] 弹子游戏",
        "example": ""
      },
      {
        "id": "word-34-48",
        "english": "discipline*",
        "phonetic": "/ˈdɪsɪplɪn/",
        "partOfSpeech": "vt.",
        "chinese": "训练，训导 n. 学科；纪律；处分",
        "example": ""
      },
      {
        "id": "word-34-20",
        "english": "analogy",
        "phonetic": "/əˈnælədʒɪ/",
        "partOfSpeech": "n.",
        "chinese": "类推；类比",
        "example": ""
      },
      {
        "id": "word-34-32",
        "english": "handle",
        "phonetic": "/ˈhændl/",
        "partOfSpeech": "v.",
        "chinese": "处理；操作，操纵；触，抚摸 n. 手柄，把手",
        "example": ""
      },
      {
        "id": "word-33-18",
        "english": "entice",
        "phonetic": "/ɪnˈtaɪs/",
        "partOfSpeech": "v.",
        "chinese": "怂恿，引诱",
        "example": ""
      },
      {
        "id": "word-34-40",
        "english": "intellectual",
        "phonetic": "/ˏɪntɪˈlektʃuəl/",
        "partOfSpeech": "n.",
        "chinese": "知识分子 a. 智力的；理智的",
        "example": ""
      },
      {
        "id": "word-33-68",
        "english": "bungalow*",
        "phonetic": "/ˈbʌŋgələu/",
        "partOfSpeech": "n.",
        "chinese": "（带走廊的）平房",
        "example": ""
      },
      {
        "id": "word-34-7",
        "english": "constrain",
        "phonetic": "/kənˈstreɪn/",
        "partOfSpeech": "vt.",
        "chinese": "迫使；约束",
        "example": ""
      },
      {
        "id": "word-34-14",
        "english": "deficit",
        "phonetic": "/ˈdefɪsɪt/",
        "partOfSpeech": "n.",
        "chinese": "不足额，赤字",
        "example": ""
      },
      {
        "id": "word-34-60",
        "english": "situated*",
        "phonetic": "[ˈsɪtʃueɪtɪd]",
        "partOfSpeech": "a.",
        "chinese": "位于……的；处于……境地的",
        "example": ""
      },
      {
        "id": "word-34-52",
        "english": "segment*",
        "phonetic": "/ˈsegmənt/",
        "partOfSpeech": "n.",
        "chinese": "片段；部分；节；线段；（橘子等的）瓣",
        "example": ""
      },
      {
        "id": "word-34-61",
        "english": "invader*",
        "phonetic": "[ɪn'veɪdə(r)]",
        "partOfSpeech": "n.",
        "chinese": "入侵者",
        "example": ""
      },
      {
        "id": "word-34-67",
        "english": "avoid*",
        "phonetic": "/əˈvɔɪd/",
        "partOfSpeech": "vt.",
        "chinese": "避免；躲开",
        "example": ""
      },
      {
        "id": "word-34-24",
        "english": "esteem",
        "phonetic": "/ɪˈstiːm/",
        "partOfSpeech": "n./vt.",
        "chinese": "尊重；尊敬",
        "example": ""
      },
      {
        "id": "word-33-67",
        "english": "stare",
        "phonetic": "/steə(r)/",
        "partOfSpeech": "n./vi.",
        "chinese": "盯",
        "example": ""
      },
      {
        "id": "word-33-26",
        "english": "glossy",
        "phonetic": "['ɡlɒsɪ]",
        "partOfSpeech": "a.",
        "chinese": "有光泽的，光滑的",
        "example": ""
      },
      {
        "id": "word-33-32",
        "english": "crusade",
        "phonetic": "/kruːˈseɪd/",
        "partOfSpeech": "n.",
        "chinese": "十字军（远征）；斗争，运动 v. 加入十字军，投身正义运动",
        "example": ""
      },
      {
        "id": "word-33-13",
        "english": "acquisition",
        "phonetic": "/ˏækwɪˈzɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "取得；获得物",
        "example": ""
      }
    ],
    "article": "In the field of Environmental Science, researchers have been studying various phenomena to understand their implications. The concept of probable* has been widely discussed in recent studies. The concept of stock has been widely discussed in recent studies. The concept of strain has been widely discussed in recent studies. The concept of briefly* has been widely discussed in recent studies. The concept of mixture has been widely discussed in recent studies. The concept of exhibit* has been widely discussed in recent studies. The concept of stab has been widely discussed in recent studies. The concept of memorise has been widely discussed in recent studies. The concept of character* has been widely discussed in recent studies. The concept of frustration has been widely discussed in recent studies. Researchers have found that these factors play a significant role in shaping our understanding of the subject. Further studies are needed to explore the full implications of these findings."
  },
  {
    "id": "unit-18",
    "name": "Unit 18: Word Lists 35 & 36",
    "words": [
      {
        "id": "word-36-15",
        "english": "prominence",
        "phonetic": "[ˈprɒmɪnəns]",
        "partOfSpeech": "n.",
        "chinese": "突出，显著；卓越；重要",
        "example": ""
      },
      {
        "id": "word-35-63",
        "english": "link*",
        "phonetic": "/lɪŋk/",
        "partOfSpeech": "n.",
        "chinese": "环节；联系，纽带 v. 连接，联系",
        "example": ""
      },
      {
        "id": "word-35-36",
        "english": "sip",
        "phonetic": "/sɪp/",
        "partOfSpeech": "v.",
        "chinese": "小口地喝；吸吮",
        "example": ""
      },
      {
        "id": "word-35-38",
        "english": "pathology*",
        "phonetic": "/pəˈθɔlədʒɪ/",
        "partOfSpeech": "n.",
        "chinese": "病理学；病变",
        "example": ""
      },
      {
        "id": "word-36-42",
        "english": "efficiency",
        "phonetic": "[ɪ'fɪʃnsɪ]",
        "partOfSpeech": "n.",
        "chinese": "效率；功效，效能",
        "example": ""
      },
      {
        "id": "word-36-35",
        "english": "sufficient*",
        "phonetic": "/səˈfɪʃnt/",
        "partOfSpeech": "a.",
        "chinese": "足够的，充分的",
        "example": ""
      },
      {
        "id": "word-35-57",
        "english": "threaten",
        "phonetic": "/θretn/",
        "partOfSpeech": "v.",
        "chinese": "威胁，恐吓；预示（危险）快要来临；是……的征兆，可能发生",
        "example": ""
      },
      {
        "id": "word-36-24",
        "english": "encapsulate",
        "phonetic": "/ɪnˈkæpsjuleɪt/",
        "partOfSpeech": "vt.",
        "chinese": "装入胶囊；压缩；总结，概述",
        "example": ""
      },
      {
        "id": "word-35-74",
        "english": "array*",
        "phonetic": "/əˈreɪ/",
        "partOfSpeech": "n.",
        "chinese": "陈列；大批 vt. 部署",
        "example": ""
      },
      {
        "id": "word-35-12",
        "english": "dwindle",
        "phonetic": "/ˈdwɪndl/",
        "partOfSpeech": "v.",
        "chinese": "（使）变小，（使）缩小",
        "example": ""
      },
      {
        "id": "word-36-47",
        "english": "fare*",
        "phonetic": "/feə(r)/",
        "partOfSpeech": "n.",
        "chinese": "费，票价 vi. 进展",
        "example": ""
      },
      {
        "id": "word-35-43",
        "english": "vision*",
        "phonetic": "/ˈvɪʒn/",
        "partOfSpeech": "n.",
        "chinese": "想象力；视力，视觉；梦幻，幻觉",
        "example": ""
      },
      {
        "id": "word-36-40",
        "english": "pilot*",
        "phonetic": "/ˈpaɪlət/",
        "partOfSpeech": "n.",
        "chinese": "飞行员，引航员 vt. 驾驶，为……引航",
        "example": ""
      },
      {
        "id": "word-35-46",
        "english": "surveillance",
        "phonetic": "/sɜːˈveɪləns/",
        "partOfSpeech": "n.",
        "chinese": "监视，盯梢",
        "example": ""
      },
      {
        "id": "word-35-11",
        "english": "pragmatic",
        "phonetic": "/prægˈmætɪk/",
        "partOfSpeech": "a.",
        "chinese": "务实的；实事求是的；实用主义观点的",
        "example": ""
      },
      {
        "id": "word-35-56",
        "english": "moist",
        "phonetic": "/mɔɪst/",
        "partOfSpeech": "a.",
        "chinese": "湿润的，潮湿的",
        "example": ""
      },
      {
        "id": "word-36-76",
        "english": "evolve*",
        "phonetic": "/ɪˈvɔlv/",
        "partOfSpeech": "v.",
        "chinese": "（使）逐渐形成；（使）演变，（使）进化",
        "example": ""
      },
      {
        "id": "word-35-16",
        "english": "malleable",
        "phonetic": "/ˈmælɪəbl/",
        "partOfSpeech": "a.",
        "chinese": "可塑的；易改变的",
        "example": ""
      },
      {
        "id": "word-36-62",
        "english": "dubious",
        "phonetic": "/ˈdjuːbɪəs/",
        "partOfSpeech": "a.",
        "chinese": "怀疑的；靠不住的，不确定的",
        "example": ""
      },
      {
        "id": "word-36-72",
        "english": "joint",
        "phonetic": "/dʒɔɪnt/",
        "partOfSpeech": "n.",
        "chinese": "接头；关节 a. 连接的；联合的",
        "example": ""
      },
      {
        "id": "word-35-17",
        "english": "renaissance",
        "phonetic": "/rɪˈneɪsns/",
        "partOfSpeech": "n.",
        "chinese": "[the",
        "example": "R-] （欧洲14至16世纪的）文艺复兴，文艺复兴时期；（文学、艺术等的）复兴、新生"
      },
      {
        "id": "word-35-53",
        "english": "clockwise",
        "phonetic": "[ˈklɒkwaɪz]",
        "partOfSpeech": "a./ad.",
        "chinese": "顺时针方向的/地",
        "example": ""
      },
      {
        "id": "word-36-1",
        "english": "notorious",
        "phonetic": "/nəuˈtɔːrɪəs/",
        "partOfSpeech": "a.",
        "chinese": "著名的，众所周知的；声名狼藉的",
        "example": ""
      },
      {
        "id": "word-35-66",
        "english": "option",
        "phonetic": "/ˈɔpʃn/",
        "partOfSpeech": "n.",
        "chinese": "选择（权）；（供）选择的物（或人）；选课",
        "example": ""
      },
      {
        "id": "word-36-57",
        "english": "rigorous",
        "phonetic": "[ˈrɪgərəs]",
        "partOfSpeech": "a.",
        "chinese": "严密的；严格的，严厉的；严酷的",
        "example": ""
      },
      {
        "id": "word-35-65",
        "english": "unemployment",
        "phonetic": "/ˏʌnɪmˈplɔɪmənt/",
        "partOfSpeech": "n.",
        "chinese": "失业；失业人数",
        "example": ""
      },
      {
        "id": "word-35-29",
        "english": "incur*",
        "phonetic": "/ɪnˈkɜː(r)/",
        "partOfSpeech": "vt.",
        "chinese": "招致，遭受",
        "example": ""
      },
      {
        "id": "word-36-8",
        "english": "worthy",
        "phonetic": "/ˈwɜːðɪ/",
        "partOfSpeech": "a.",
        "chinese": "有价值的；值得的",
        "example": ""
      },
      {
        "id": "word-35-39",
        "english": "setting*",
        "phonetic": "/ˈsetɪŋ/",
        "partOfSpeech": "n.",
        "chinese": "环境；背景；安置",
        "example": ""
      },
      {
        "id": "word-36-41",
        "english": "advance",
        "phonetic": "/ədˈvɑːns/",
        "partOfSpeech": "a.",
        "chinese": "预先的；先行的 v. 前进，向前移动；取得进展；预付 n. 前进，前移；增长，提高；预付（款等）",
        "example": ""
      },
      {
        "id": "word-35-6",
        "english": "transient",
        "phonetic": "/ˈtrænzɪənt/",
        "partOfSpeech": "a.",
        "chinese": "短暂的，转瞬即逝的 n. 在某地短暂停留或工作的人",
        "example": ""
      },
      {
        "id": "word-35-5",
        "english": "elucidate",
        "phonetic": "/ɪˈluːsɪdeɪt/",
        "partOfSpeech": "vt.",
        "chinese": "阐明，使……清楚",
        "example": ""
      },
      {
        "id": "word-35-71",
        "english": "mental*",
        "phonetic": "/ˈmentl/",
        "partOfSpeech": "a.",
        "chinese": "心理的，精神的；智力的",
        "example": ""
      },
      {
        "id": "word-35-35",
        "english": "chain",
        "phonetic": "/tʃeɪn/",
        "partOfSpeech": "n.",
        "chinese": "链，链条；一连串，一系列； [pl.] 枷锁，镣铐；联号，连锁店 vt. 用链条拴住",
        "example": ""
      },
      {
        "id": "word-35-75",
        "english": "remain*",
        "phonetic": "/rɪˈmeɪn/",
        "partOfSpeech": "v.",
        "chinese": "保持；仍旧是；剩下 n. [pl.] 残余；遗迹；残骸，遗体",
        "example": ""
      },
      {
        "id": "word-35-18",
        "english": "incongruity",
        "phonetic": "[ˌɪnkɒn'ɡru:ətɪ]",
        "partOfSpeech": "n.",
        "chinese": "不和谐，不相称；不协调或不一致的事物",
        "example": ""
      },
      {
        "id": "word-36-20",
        "english": "configuration",
        "phonetic": "/kənˏfɪgəˈreɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "结构，配置；轮廓，外形",
        "example": ""
      },
      {
        "id": "word-36-30",
        "english": "germinate",
        "phonetic": "/ˈdʒɜːmɪneɪt/",
        "partOfSpeech": "v.",
        "chinese": "（使）发芽，（使）生长；发展",
        "example": ""
      },
      {
        "id": "word-36-63",
        "english": "boulder*",
        "phonetic": "/ˈbəuldə(r)/",
        "partOfSpeech": "n.",
        "chinese": "大石头；鹅卵石",
        "example": ""
      },
      {
        "id": "word-35-73",
        "english": "origin*",
        "phonetic": "/ˈɔrɪdʒɪn/",
        "partOfSpeech": "n.",
        "chinese": "起源；[常pl.] 出身",
        "example": ""
      },
      {
        "id": "word-36-10",
        "english": "chief",
        "phonetic": "/tʃiːf/",
        "partOfSpeech": "a.",
        "chinese": "主要的；为首的",
        "example": ""
      },
      {
        "id": "word-35-30",
        "english": "missile*",
        "phonetic": "/ˈmɪsaɪl/",
        "partOfSpeech": "n.",
        "chinese": "发射物；导弹，飞弹",
        "example": ""
      },
      {
        "id": "word-35-19",
        "english": "instinctual",
        "phonetic": "[ɪn'stɪŋktʃʊəl]",
        "partOfSpeech": "a.",
        "chinese": "本能的",
        "example": ""
      },
      {
        "id": "word-36-11",
        "english": "remedy",
        "phonetic": "/ˈremədɪ/",
        "partOfSpeech": "n.",
        "chinese": "药品；治疗法；补救 vt. 治疗；补救",
        "example": ""
      },
      {
        "id": "word-36-17",
        "english": "inaugurate",
        "phonetic": "/ɪˈnɔːgjureɪt/",
        "partOfSpeech": "vt.",
        "chinese": "开始，开创；为……举行就职典礼；为……举行开幕式；为……举行落成仪式",
        "example": ""
      },
      {
        "id": "word-36-38",
        "english": "dominant",
        "phonetic": "/ˈdɔmɪnənt/",
        "partOfSpeech": "a.",
        "chinese": "占优势的；统治的；居高临下的",
        "example": ""
      },
      {
        "id": "word-36-48",
        "english": "foundation*",
        "phonetic": "/faunˈdeɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "基础；地基；创立",
        "example": ""
      },
      {
        "id": "word-35-4",
        "english": "plausible",
        "phonetic": "/ˈplɔːzəbl/",
        "partOfSpeech": "a.",
        "chinese": "似有道理的，貌似真实的；嘴巧的",
        "example": ""
      },
      {
        "id": "word-35-61",
        "english": "compile",
        "phonetic": "/kəmˈpaɪl/",
        "partOfSpeech": "vt.",
        "chinese": "汇编；编纂",
        "example": ""
      },
      {
        "id": "word-35-77",
        "english": "journal*",
        "phonetic": "/ˈdʒɜːnl/",
        "partOfSpeech": "ｎ.",
        "chinese": "杂志；日报；日志",
        "example": ""
      },
      {
        "id": "word-35-28",
        "english": "smooth*",
        "phonetic": "/smuːð/",
        "partOfSpeech": "a.",
        "chinese": "顺利的；流畅的；协调的",
        "example": ""
      },
      {
        "id": "word-35-40",
        "english": "mood*",
        "phonetic": "/muːd/",
        "partOfSpeech": "n.",
        "chinese": "心情，情绪",
        "example": ""
      },
      {
        "id": "word-36-33",
        "english": "disorientate",
        "phonetic": "/dɪsˈɔːrɪənteɪt/",
        "partOfSpeech": "vt.",
        "chinese": "使失去方向感；使迷茫，使不知所措（= disorient）",
        "example": ""
      },
      {
        "id": "word-36-66",
        "english": "camel*",
        "phonetic": "/ˈkæml/",
        "partOfSpeech": "n.",
        "chinese": "骆驼",
        "example": ""
      },
      {
        "id": "word-35-49",
        "english": "translate*",
        "phonetic": "[træns'leɪt]",
        "partOfSpeech": "v.",
        "chinese": "翻译",
        "example": ""
      },
      {
        "id": "word-35-45",
        "english": "organism",
        "phonetic": "/ˈɔːgənɪzəm/",
        "partOfSpeech": "n.",
        "chinese": "生物；有机体",
        "example": ""
      },
      {
        "id": "word-36-49",
        "english": "principal",
        "phonetic": "/ˈprɪnsəpl/",
        "partOfSpeech": "a.",
        "chinese": "主要的 n. 校长；资本；主角",
        "example": ""
      },
      {
        "id": "word-36-5",
        "english": "tab",
        "phonetic": "/tæb/",
        "partOfSpeech": "n.",
        "chinese": "标签",
        "example": ""
      },
      {
        "id": "word-35-41",
        "english": "extinct*",
        "phonetic": "/ɪkˈstɪŋkt/",
        "partOfSpeech": "a.",
        "chinese": "灭绝的；废弃的",
        "example": ""
      },
      {
        "id": "word-36-26",
        "english": "repatriate",
        "phonetic": "/riːˈpætrɪeɪt/",
        "partOfSpeech": "v.",
        "chinese": "把（某人）遣返回国；归国",
        "example": ""
      },
      {
        "id": "word-35-3",
        "english": "veterinary*",
        "phonetic": "/ˈvetrɪnrɪ/",
        "partOfSpeech": "a.",
        "chinese": "兽医的",
        "example": ""
      },
      {
        "id": "word-36-74",
        "english": "meanwhile",
        "phonetic": "/ˈmiːnwaɪl/",
        "partOfSpeech": "ad.",
        "chinese": "与此同时",
        "example": ""
      },
      {
        "id": "word-35-42",
        "english": "aridity",
        "phonetic": "[ə'rɪdətɪ]",
        "partOfSpeech": "n.",
        "chinese": "干旱；乏味",
        "example": ""
      },
      {
        "id": "word-35-22",
        "english": "treatise",
        "phonetic": "/ˈtriːtɪz/",
        "partOfSpeech": "n.",
        "chinese": "论文；专著",
        "example": ""
      },
      {
        "id": "word-36-27",
        "english": "tensile",
        "phonetic": "/ˈtensaɪl/",
        "partOfSpeech": "a.",
        "chinese": "拉力的，张力的；可延展的，可伸长的",
        "example": ""
      },
      {
        "id": "word-36-9",
        "english": "irrigation",
        "phonetic": "[ˌɪrɪ'ɡeɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "灌溉；冲洗",
        "example": ""
      },
      {
        "id": "word-36-58",
        "english": "fragment",
        "phonetic": "/ˈfrægmənt/",
        "partOfSpeech": "n.",
        "chinese": "碎片，小部分，片断 /frægˈment/ v. 分裂；破碎",
        "example": ""
      },
      {
        "id": "word-36-7",
        "english": "miracle",
        "phonetic": "/ˈmɪrəkl/",
        "partOfSpeech": "n.",
        "chinese": "奇迹；奇事",
        "example": ""
      },
      {
        "id": "word-35-31",
        "english": "compulsively*",
        "phonetic": "[kəm'pʌlsɪvlɪ]",
        "partOfSpeech": "ad.",
        "chinese": "强制地；禁不住地",
        "example": ""
      },
      {
        "id": "word-35-51",
        "english": "breakwater*",
        "phonetic": "/ˈbreɪkwɔːtə(r)/",
        "partOfSpeech": "n.",
        "chinese": "防浪堤",
        "example": ""
      },
      {
        "id": "word-35-15",
        "english": "impetus",
        "phonetic": "/ˈɪmpɪtəs/",
        "partOfSpeech": "n.",
        "chinese": "推动，促进，刺激；推动力",
        "example": ""
      },
      {
        "id": "word-35-27",
        "english": "stress*",
        "phonetic": "/stres/",
        "partOfSpeech": "n.",
        "chinese": "压力；重音；强调，重点，着重 vt. 强调；重读",
        "example": ""
      },
      {
        "id": "word-35-24",
        "english": "smother*",
        "phonetic": "/ˈsmʌðə(r)/",
        "partOfSpeech": "v.",
        "chinese": "厚厚的覆盖；（使）窒息；把（火）闷熄",
        "example": ""
      },
      {
        "id": "word-36-4",
        "english": "enrich",
        "phonetic": "/ɪnˈrɪtʃ/",
        "partOfSpeech": "vt.",
        "chinese": "充实，使丰富；使富裕",
        "example": ""
      },
      {
        "id": "word-35-2",
        "english": "combustion*",
        "phonetic": "/kəmˈbʌstʃən/",
        "partOfSpeech": "n.",
        "chinese": "燃烧；燃烧过程",
        "example": ""
      },
      {
        "id": "word-36-13",
        "english": "thoughtful",
        "phonetic": "[ˈθɔ:tfl]",
        "partOfSpeech": "a.",
        "chinese": "沉思的；体贴的",
        "example": ""
      },
      {
        "id": "word-36-14",
        "english": "brunt*",
        "phonetic": "/brʌnt/",
        "partOfSpeech": "n.",
        "chinese": "冲击；冲力",
        "example": ""
      },
      {
        "id": "word-36-56",
        "english": "sculpture",
        "phonetic": "/ˈskʌlptʃə(r)/",
        "partOfSpeech": "n.",
        "chinese": "雕塑品",
        "example": ""
      },
      {
        "id": "word-35-48",
        "english": "vague",
        "phonetic": "/veɪg/",
        "partOfSpeech": "a.",
        "chinese": "模糊的；含糊的",
        "example": ""
      },
      {
        "id": "word-36-44",
        "english": "credible",
        "phonetic": "/ˈkredəbl/",
        "partOfSpeech": "a.",
        "chinese": "可信的，可靠的",
        "example": ""
      },
      {
        "id": "word-35-26",
        "english": "spine",
        "phonetic": "/spaɪn/",
        "partOfSpeech": "n.",
        "chinese": "脊椎，脊柱；（动植物的）刺，刺毛；书脊；<喻> 中心",
        "example": ""
      },
      {
        "id": "word-35-69",
        "english": "instinct",
        "phonetic": "/ˈɪnstɪŋkt/",
        "partOfSpeech": "n.",
        "chinese": "本能，直觉；天性",
        "example": ""
      },
      {
        "id": "word-35-32",
        "english": "wrap",
        "phonetic": "/ræp/",
        "partOfSpeech": "v.",
        "chinese": "裹；包；缠绕",
        "example": ""
      },
      {
        "id": "word-35-50",
        "english": "poverty",
        "phonetic": "/ˈpɔvətɪ/",
        "partOfSpeech": "n.",
        "chinese": "贫穷",
        "example": ""
      },
      {
        "id": "word-36-73",
        "english": "spray*",
        "phonetic": "/spreɪ/",
        "partOfSpeech": "n.",
        "chinese": "浪花；喷雾；飞沫 v. 喷射；（使）溅洒",
        "example": ""
      },
      {
        "id": "word-35-25",
        "english": "excess*",
        "phonetic": "/ɪkˈses/",
        "partOfSpeech": "n.",
        "chinese": "超越；过量 /ˈekses/ a. 过量的，额外的",
        "example": ""
      },
      {
        "id": "word-36-67",
        "english": "shell",
        "phonetic": "/ʃel/",
        "partOfSpeech": "n.",
        "chinese": "壳；炮弹 v. 给……去壳；炮击",
        "example": ""
      },
      {
        "id": "word-36-59",
        "english": "audio",
        "phonetic": "[ˈɔ:diəʊ]",
        "partOfSpeech": "a.",
        "chinese": "听觉的；声音的",
        "example": ""
      },
      {
        "id": "word-35-44",
        "english": "sausage",
        "phonetic": "/ˈsɔsɪdʒ/",
        "partOfSpeech": "n.",
        "chinese": "香肠",
        "example": ""
      },
      {
        "id": "word-35-37",
        "english": "tedious",
        "phonetic": "/ˈtiːdɪəs/",
        "partOfSpeech": "a.",
        "chinese": "冗长乏味的，单调的",
        "example": ""
      },
      {
        "id": "word-35-1",
        "english": "minister*",
        "phonetic": "/ˈmɪnɪstə(r)/",
        "partOfSpeech": "n.",
        "chinese": "部长；外交使节；牧师",
        "example": ""
      },
      {
        "id": "word-35-10",
        "english": "climatic",
        "phonetic": "[klaɪˈmætɪk]",
        "partOfSpeech": "a.",
        "chinese": "气候（上）的",
        "example": ""
      },
      {
        "id": "word-36-34",
        "english": "slumber",
        "phonetic": "/ˈslʌmbə(r)/",
        "partOfSpeech": "v.",
        "chinese": "睡眠（尤指睡得安稳而舒服），安睡 n. [常pl.] 睡眠，安睡",
        "example": ""
      },
      {
        "id": "word-36-75",
        "english": "force*",
        "phonetic": "/fɔːs/",
        "partOfSpeech": "vt.",
        "chinese": "强迫 n. [pl.] 军队；力气；影响力",
        "example": ""
      },
      {
        "id": "word-36-60",
        "english": "landmark*",
        "phonetic": "[ˈlændmɑ:k]",
        "partOfSpeech": "n.",
        "chinese": "路标，地标；里程碑",
        "example": ""
      },
      {
        "id": "word-35-13",
        "english": "disdain",
        "phonetic": "/dɪsˈdeɪn/",
        "partOfSpeech": "v./n.",
        "chinese": "鄙视，蔑视",
        "example": ""
      },
      {
        "id": "word-36-53",
        "english": "aisle",
        "phonetic": "/aɪl/",
        "partOfSpeech": "n.",
        "chinese": "走廊，通道；（教堂的）侧廊",
        "example": ""
      },
      {
        "id": "word-36-19",
        "english": "perpetuate",
        "phonetic": "/pəˈpetʃueɪt/",
        "partOfSpeech": "vt.",
        "chinese": "使永存；使持续",
        "example": ""
      },
      {
        "id": "word-35-34",
        "english": "limitation*",
        "phonetic": "/ˏlɪmɪˈteɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "限制；局限",
        "example": ""
      },
      {
        "id": "word-36-36",
        "english": "antiquity*",
        "phonetic": "/ænˈtɪkwətɪ/",
        "partOfSpeech": "n.",
        "chinese": "古，古老；古代；古人；古迹，古物",
        "example": ""
      },
      {
        "id": "word-36-29",
        "english": "propagate",
        "phonetic": "/ˈprɔpəgeɪt/",
        "partOfSpeech": "v.",
        "chinese": "繁殖，增殖；传播，宣传，使普及",
        "example": ""
      },
      {
        "id": "word-35-8",
        "english": "distortion",
        "phonetic": "[dɪ'stɔ:ʃn]",
        "partOfSpeech": "n.",
        "chinese": "扭曲，变形；曲解，歪曲",
        "example": ""
      },
      {
        "id": "word-36-45",
        "english": "elaborate",
        "phonetic": "/ɪˈlæbərət/",
        "partOfSpeech": "a.",
        "chinese": "详尽的；复杂的；精心制作的 /ɪˈlæbəreɪt/ v. 详述；详细制定",
        "example": ""
      },
      {
        "id": "word-36-65",
        "english": "batch",
        "phonetic": "/bætʃ/",
        "partOfSpeech": "n.",
        "chinese": "一批，一组，一群；一批生产量",
        "example": ""
      },
      {
        "id": "word-36-69",
        "english": "subsidy",
        "phonetic": "/ˈsʌbsɪdɪ/",
        "partOfSpeech": "n.",
        "chinese": "津贴，补助金",
        "example": ""
      },
      {
        "id": "word-36-55",
        "english": "scan*",
        "phonetic": "/skæn/",
        "partOfSpeech": "v.",
        "chinese": "扫描；浏览 n. 扫描",
        "example": ""
      },
      {
        "id": "word-36-31",
        "english": "unbeatable",
        "phonetic": "/ˏʌnˈbiːtəbl/",
        "partOfSpeech": "a.",
        "chinese": "无敌的，不可战胜的",
        "example": ""
      },
      {
        "id": "word-36-3",
        "english": "valid",
        "phonetic": "/ˈvælɪd/",
        "partOfSpeech": "a.",
        "chinese": "有效的，具有法律效力的；正当的；有根据的，有理的",
        "example": ""
      },
      {
        "id": "word-35-67",
        "english": "bay",
        "phonetic": "/beɪ/",
        "partOfSpeech": "n.",
        "chinese": "海湾",
        "example": ""
      },
      {
        "id": "word-35-14",
        "english": "constituent",
        "phonetic": "/kənˈstɪtjuənt/",
        "partOfSpeech": "n.",
        "chinese": "成分，要素；选区内的选民 a. 组成的；有宪法制定或修改权的",
        "example": ""
      },
      {
        "id": "word-35-70",
        "english": "marsh",
        "phonetic": "/mɑːʃ/",
        "partOfSpeech": "n.",
        "chinese": "沼泽；湿地",
        "example": ""
      },
      {
        "id": "word-35-47",
        "english": "senior",
        "phonetic": "/ˈsiːnɪə(r)/",
        "partOfSpeech": "a.",
        "chinese": "资格较老的；年长的 n. 较年长者；（中学或大学的）毕业班学生",
        "example": ""
      },
      {
        "id": "word-36-2",
        "english": "cash",
        "phonetic": "/kæʃ/",
        "partOfSpeech": "n.",
        "chinese": "现金，现款 vt. 把……兑现",
        "example": ""
      },
      {
        "id": "word-36-51",
        "english": "comparatively*",
        "phonetic": "[kəmˈpærətɪvli]",
        "partOfSpeech": "ad.",
        "chinese": "相对地；比较地",
        "example": ""
      },
      {
        "id": "word-36-28",
        "english": "solidify",
        "phonetic": "/səˈlɪdɪfaɪ/",
        "partOfSpeech": "v.",
        "chinese": "巩固，确保；凝固，（使）固化；团结",
        "example": ""
      },
      {
        "id": "word-36-70",
        "english": "contrived*",
        "phonetic": "[kənˈtraɪvd]",
        "partOfSpeech": "a.",
        "chinese": "不自然的；人为的",
        "example": ""
      },
      {
        "id": "word-36-50",
        "english": "collection*",
        "phonetic": "/kəˈlekʃn/",
        "partOfSpeech": "n.",
        "chinese": "收集，积聚；收藏（品）",
        "example": ""
      },
      {
        "id": "word-36-16",
        "english": "compass",
        "phonetic": "/ˈkʌmpəs/",
        "partOfSpeech": "n.",
        "chinese": "罗盘，罗盘仪；界限，范围； [pl.] 圆规",
        "example": ""
      },
      {
        "id": "word-35-52",
        "english": "modify",
        "phonetic": "/ˈmɔdɪfaɪ/",
        "partOfSpeech": "vt.",
        "chinese": "更改，修改；（语法上）修改",
        "example": ""
      },
      {
        "id": "word-36-18",
        "english": "suppress",
        "phonetic": "/səˈpres/",
        "partOfSpeech": "vt.",
        "chinese": "压制，镇压；禁止发表；查禁；抑制（感情等），忍住；阻止……的生长（或发展）",
        "example": ""
      },
      {
        "id": "word-35-21",
        "english": "scuffle",
        "phonetic": "/ˈskʌfl/",
        "partOfSpeech": "n./vi.",
        "chinese": "扭打，混战",
        "example": ""
      },
      {
        "id": "word-35-7",
        "english": "sanitation",
        "phonetic": "/ˏsænɪˈteɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "（公共）卫生，卫生设施",
        "example": ""
      },
      {
        "id": "word-36-32",
        "english": "accredit",
        "phonetic": "/əˈkredɪt/",
        "partOfSpeech": "vt.",
        "chinese": "信任，相信，委任，授权；把……归于",
        "example": ""
      },
      {
        "id": "word-35-72",
        "english": "hospitality",
        "phonetic": "/ˏhɔspɪˈtælətɪ/",
        "partOfSpeech": "n.",
        "chinese": "（对客人的）友好款待，好客；盛情；招待礼节",
        "example": ""
      },
      {
        "id": "word-36-21",
        "english": "replenish",
        "phonetic": "/rɪˈplenɪʃ/",
        "partOfSpeech": "vt.",
        "chinese": "再斟（或装）满；添加，补充",
        "example": ""
      },
      {
        "id": "word-36-68",
        "english": "triangle",
        "phonetic": "/ˈtraɪæŋgl/",
        "partOfSpeech": "n.",
        "chinese": "三角（形）",
        "example": ""
      },
      {
        "id": "word-35-33",
        "english": "confine",
        "phonetic": "/kənˈfaɪn/",
        "partOfSpeech": "vt.",
        "chinese": "限制，仅限于；管制，禁闭 n. [pl.] 界限，范围",
        "example": ""
      },
      {
        "id": "word-35-55",
        "english": "highlight",
        "phonetic": "/ˈhaɪlaɪt/",
        "partOfSpeech": "vt.",
        "chinese": "强调，突出；以强烈光线照射；集中注意力于 n. 最精彩的部分，最重要的事件",
        "example": ""
      },
      {
        "id": "word-35-76",
        "english": "comprehension*",
        "phonetic": "/ˏkɔmprɪˈhenʃn/",
        "partOfSpeech": "n.",
        "chinese": "理解；理解力",
        "example": ""
      },
      {
        "id": "word-35-20",
        "english": "pedigree",
        "phonetic": "/ˈpedɪgriː/",
        "partOfSpeech": "n.",
        "chinese": "家谱；门第；血统",
        "example": ""
      },
      {
        "id": "word-35-9",
        "english": "altruistic",
        "phonetic": "[ˌæltrʊ'ɪstɪk]",
        "partOfSpeech": "a.",
        "chinese": "无私的，为他人着想的",
        "example": ""
      },
      {
        "id": "word-36-46",
        "english": "consult",
        "phonetic": "/kənˈsʌlt/",
        "partOfSpeech": "v.",
        "chinese": "请教；查阅；商议",
        "example": ""
      },
      {
        "id": "word-36-61",
        "english": "biography",
        "phonetic": "/baɪˈɔgrəfɪ/",
        "partOfSpeech": "n.",
        "chinese": "传记",
        "example": ""
      },
      {
        "id": "word-35-54",
        "english": "isolate*",
        "phonetic": "/ˈaɪsəleɪt/",
        "partOfSpeech": "vt.",
        "chinese": "使陆离，使孤立",
        "example": ""
      },
      {
        "id": "word-36-23",
        "english": "camouflage",
        "phonetic": "/ˈkæməflɑːʒ/",
        "partOfSpeech": "v./n.",
        "chinese": "掩饰，伪装",
        "example": ""
      },
      {
        "id": "word-35-60",
        "english": "detail",
        "phonetic": "/ˈdiːteɪl/",
        "partOfSpeech": "n.",
        "chinese": "细节，详情；枝节，琐事 vt. 详述，详细说明",
        "example": ""
      },
      {
        "id": "word-36-12",
        "english": "accelerate",
        "phonetic": "/əkˈseləreɪt/",
        "partOfSpeech": "v.",
        "chinese": "加速；促进",
        "example": ""
      },
      {
        "id": "word-35-58",
        "english": "underling*",
        "phonetic": "/ˈʌndəlɪŋ/",
        "partOfSpeech": "n.",
        "chinese": "职位低的人，下属",
        "example": ""
      },
      {
        "id": "word-35-59",
        "english": "medium",
        "phonetic": "/ˈmiːdɪəm/",
        "partOfSpeech": "n.",
        "chinese": "媒质，媒介；工具，手段；（细菌等的）生存环境 a. 中等的；平均的",
        "example": ""
      },
      {
        "id": "word-35-62",
        "english": "induction*",
        "phonetic": "/ɪnˈdʌkʃn/",
        "partOfSpeech": "n.",
        "chinese": "就职；归纳；感应",
        "example": ""
      },
      {
        "id": "word-36-6",
        "english": "equation",
        "phonetic": "/ɪˈkweɪʒn/",
        "partOfSpeech": "n.",
        "chinese": "方程式，等式；平衡；等同，相等",
        "example": ""
      },
      {
        "id": "word-36-22",
        "english": "encompass",
        "phonetic": "/ɪnˈkʌmpəs/",
        "partOfSpeech": "vt.",
        "chinese": "包含；包围；环绕",
        "example": ""
      },
      {
        "id": "word-36-25",
        "english": "reinvigorate",
        "phonetic": "[ˌri:ɪn'vɪɡəreɪt]",
        "partOfSpeech": "vt.",
        "chinese": "使重新振作；使恢复活力",
        "example": ""
      },
      {
        "id": "word-35-68",
        "english": "slogan",
        "phonetic": "/ˈsləugən/",
        "partOfSpeech": "n.",
        "chinese": "标语，口号",
        "example": ""
      },
      {
        "id": "word-36-37",
        "english": "pretend",
        "phonetic": "/prɪˈtend/",
        "partOfSpeech": "v.",
        "chinese": "装作，假装",
        "example": ""
      },
      {
        "id": "word-36-39",
        "english": "privacy",
        "phonetic": "/ˈprɪvəsɪ/",
        "partOfSpeech": "n.",
        "chinese": "隐私，私事；隐私权",
        "example": ""
      },
      {
        "id": "word-36-64",
        "english": "drill",
        "phonetic": "/drɪl/",
        "partOfSpeech": "v./n.",
        "chinese": "钻；训练",
        "example": ""
      },
      {
        "id": "word-36-43",
        "english": "drainage",
        "phonetic": "/ˈdreɪnɪdʒ/",
        "partOfSpeech": "n.",
        "chinese": "排水（系统）",
        "example": ""
      },
      {
        "id": "word-36-52",
        "english": "victim*",
        "phonetic": "/ˈvɪktɪm/",
        "partOfSpeech": "n.",
        "chinese": "牺牲者；受害者",
        "example": ""
      },
      {
        "id": "word-36-71",
        "english": "multiply",
        "phonetic": "/ˈmʌltɪplaɪ/",
        "partOfSpeech": "v.",
        "chinese": "（使）增加，（使）繁殖；乘",
        "example": ""
      },
      {
        "id": "word-36-54",
        "english": "lime*",
        "phonetic": "/laɪm/",
        "partOfSpeech": "n.",
        "chinese": "石灰",
        "example": ""
      },
      {
        "id": "word-35-64",
        "english": "foreland*",
        "phonetic": "/ˈfɔːlənd/",
        "partOfSpeech": "n.",
        "chinese": "前沿地；岬角",
        "example": ""
      },
      {
        "id": "word-35-23",
        "english": "hypothetical",
        "phonetic": "[ˌhaɪpəˈθetɪkl]",
        "partOfSpeech": "a.",
        "chinese": "假设的，假定的；爱猜想的",
        "example": ""
      }
    ],
    "article": "In the field of Health and Medicine, researchers have been studying various phenomena to understand their implications. The concept of prominence has been widely discussed in recent studies. The concept of link* has been widely discussed in recent studies. The concept of sip has been widely discussed in recent studies. The concept of pathology* has been widely discussed in recent studies. The concept of efficiency has been widely discussed in recent studies. The concept of sufficient* has been widely discussed in recent studies. The concept of threaten has been widely discussed in recent studies. The concept of encapsulate has been widely discussed in recent studies. The concept of array* has been widely discussed in recent studies. The concept of dwindle has been widely discussed in recent studies. Researchers have found that these factors play a significant role in shaping our understanding of the subject. Further studies are needed to explore the full implications of these findings."
  },
  {
    "id": "unit-19",
    "name": "Unit 19: Word Lists 37 & 38",
    "words": [
      {
        "id": "word-38-19",
        "english": "trench",
        "phonetic": "/trentʃ/",
        "partOfSpeech": "n.",
        "chinese": "沟，壕沟 v. 挖沟",
        "example": ""
      },
      {
        "id": "word-38-52",
        "english": "personality*",
        "phonetic": "/ˏpɜːsəˈnælətɪ/",
        "partOfSpeech": "n.",
        "chinese": "人格；个性；名人，人物",
        "example": ""
      },
      {
        "id": "word-37-55",
        "english": "hostility*",
        "phonetic": "/hɔˈstɪlətɪ/",
        "partOfSpeech": "n.",
        "chinese": "敌意，敌对，对抗；抵制，反对，否决； [pl.] 交战，战争",
        "example": ""
      },
      {
        "id": "word-37-4",
        "english": "insignificant*",
        "phonetic": "/ˏɪnsɪgˈnɪfɪkənt/",
        "partOfSpeech": "a.",
        "chinese": "无关紧要的，无意义的",
        "example": ""
      },
      {
        "id": "word-37-12",
        "english": "anecdote",
        "phonetic": "/ˈænɪkdəut/",
        "partOfSpeech": "n.",
        "chinese": "短故事；趣闻，轶事",
        "example": ""
      },
      {
        "id": "word-38-25",
        "english": "disruptive",
        "phonetic": "[dɪsˈrʌptɪv]",
        "partOfSpeech": "a.",
        "chinese": "制造混乱的；分裂性的；破坏性的",
        "example": ""
      },
      {
        "id": "word-38-4",
        "english": "grassy*",
        "phonetic": "['ɡrɑ:sɪ]",
        "partOfSpeech": "a.",
        "chinese": "草绿色的；似草的",
        "example": ""
      },
      {
        "id": "word-38-17",
        "english": "reclaim",
        "phonetic": "/rɪˈkleɪm/",
        "partOfSpeech": "vt.",
        "chinese": "纠正；要求归还，收回；开垦（土地）",
        "example": ""
      },
      {
        "id": "word-38-34",
        "english": "literal",
        "phonetic": "/ˈlɪtərəl/",
        "partOfSpeech": "a.",
        "chinese": "照字面的；逐字的",
        "example": ""
      },
      {
        "id": "word-38-6",
        "english": "fertile",
        "phonetic": "/ˈfɜːtaɪl/",
        "partOfSpeech": "a.",
        "chinese": "肥沃的，多产的，富饶的；能繁殖的",
        "example": ""
      },
      {
        "id": "word-37-9",
        "english": "solemn",
        "phonetic": "/ˈsɔləm/",
        "partOfSpeech": "a.",
        "chinese": "庄严的，隆重的；严肃的，认真的",
        "example": ""
      },
      {
        "id": "word-37-11",
        "english": "forum",
        "phonetic": "/ˈfɔːrəm/",
        "partOfSpeech": "n.",
        "chinese": "论坛；讨论会",
        "example": ""
      },
      {
        "id": "word-38-28",
        "english": "disempower",
        "phonetic": "[dɪsɪm'paʊər]",
        "partOfSpeech": "vt.",
        "chinese": "使失去权力或影响",
        "example": ""
      },
      {
        "id": "word-37-25",
        "english": "studious",
        "phonetic": "/ˈstjuːdɪəs/",
        "partOfSpeech": "a.",
        "chinese": "好学的，学习勤勉的；专心的；谨慎的，认真的，仔细的",
        "example": ""
      },
      {
        "id": "word-38-37",
        "english": "bureau",
        "phonetic": "/ˈbjuərəu/",
        "partOfSpeech": "n.",
        "chinese": "办公室；机构；局；处；所",
        "example": ""
      },
      {
        "id": "word-38-21",
        "english": "urbanization",
        "phonetic": "[ˌɜ:bənaɪ'zeɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "城市化，都市化",
        "example": ""
      },
      {
        "id": "word-37-27",
        "english": "inventive",
        "phonetic": "[ɪnˈventɪv]",
        "partOfSpeech": "a.",
        "chinese": "发明的，创造的；善于发明创造的",
        "example": ""
      },
      {
        "id": "word-38-5",
        "english": "glorious",
        "phonetic": "/ˈglɔːrɪəs/",
        "partOfSpeech": "a.",
        "chinese": "光荣的；壮丽的",
        "example": ""
      },
      {
        "id": "word-38-15",
        "english": "caustic",
        "phonetic": "/ˈkɔːstɪk/",
        "partOfSpeech": "n.",
        "chinese": "腐蚀剂 a. 腐蚀性的；（指评论）讽刺的，挖苦的",
        "example": ""
      },
      {
        "id": "word-38-16",
        "english": "detergent",
        "phonetic": "/dɪˈtɜːdʒənt/",
        "partOfSpeech": "a.",
        "chinese": "净化的，清洁的 n. 清洁剂",
        "example": ""
      },
      {
        "id": "word-38-27",
        "english": "momentum",
        "phonetic": "/məˈmentəm/",
        "partOfSpeech": "n.",
        "chinese": "动力，冲力，势头；动量",
        "example": ""
      },
      {
        "id": "word-37-26",
        "english": "vibrant",
        "phonetic": "/ˈvaɪbrənt/",
        "partOfSpeech": "a.",
        "chinese": "振动的；活泼的，充满生气的；兴奋的",
        "example": ""
      },
      {
        "id": "word-37-18",
        "english": "pollinate",
        "phonetic": "/ˈpɔləneɪt/",
        "partOfSpeech": "vt.",
        "chinese": "[植] 给……授粉",
        "example": ""
      },
      {
        "id": "word-37-33",
        "english": "partial",
        "phonetic": "/ˈpɑːʃl/",
        "partOfSpeech": "a.",
        "chinese": "部分的，不完全的；偏爱的，癖好的；偏向一方的，偏心的",
        "example": ""
      },
      {
        "id": "word-37-69",
        "english": "marker",
        "phonetic": "['mɑ:kə(r)]",
        "partOfSpeech": "n.",
        "chinese": "标记，标志",
        "example": ""
      },
      {
        "id": "word-38-30",
        "english": "authenticate",
        "phonetic": "[ɔ:ˈθentɪkeɪt]",
        "partOfSpeech": "vt.",
        "chinese": "鉴别，证明",
        "example": ""
      },
      {
        "id": "word-37-10",
        "english": "outsell",
        "phonetic": "/ˏautˈsel/",
        "partOfSpeech": "vt.",
        "chinese": "卖得比……多",
        "example": ""
      },
      {
        "id": "word-38-23",
        "english": "permeate",
        "phonetic": "/ˈpɜːmɪeɪt/",
        "partOfSpeech": "v.",
        "chinese": "扩散，弥漫；渗透，渗入",
        "example": ""
      },
      {
        "id": "word-38-33",
        "english": "chemical",
        "phonetic": "/ˈkemɪkl/",
        "partOfSpeech": "a.",
        "chinese": "化学的 n. 化学制品",
        "example": ""
      },
      {
        "id": "word-37-13",
        "english": "conversely",
        "phonetic": "[ˈkɒnvɜ:sli]",
        "partOfSpeech": "ad.",
        "chinese": "相反地，颠倒地",
        "example": ""
      },
      {
        "id": "word-37-46",
        "english": "bamboo",
        "phonetic": "/bæmˈbuː/",
        "partOfSpeech": "n.",
        "chinese": "竹子",
        "example": ""
      },
      {
        "id": "word-38-20",
        "english": "holistically",
        "phonetic": "{həʊ'lɪstɪklɪ}",
        "partOfSpeech": "ad.",
        "chinese": "整体地，全盘地",
        "example": ""
      },
      {
        "id": "word-37-47",
        "english": "shore",
        "phonetic": "/ʃɔː(r)/",
        "partOfSpeech": "n.",
        "chinese": "滨，岸，海滩",
        "example": ""
      },
      {
        "id": "word-37-57",
        "english": "grind",
        "phonetic": "/graɪnd/",
        "partOfSpeech": "n.",
        "chinese": "<口> 苦差事 v. 磨（碎），碾；折磨",
        "example": ""
      },
      {
        "id": "word-38-22",
        "english": "insularity",
        "phonetic": "[ˌɪnsjʊ'lærətɪ]",
        "partOfSpeech": "n.",
        "chinese": "岛国（状态）；与外界隔绝的生活状况；（思想、观点等的）褊狭",
        "example": ""
      },
      {
        "id": "word-37-54",
        "english": "version*",
        "phonetic": "/ˈvɜːʃn/",
        "partOfSpeech": "n.",
        "chinese": "样式；型号；种类；说法；版本；译本",
        "example": ""
      },
      {
        "id": "word-38-26",
        "english": "clinical",
        "phonetic": "/ˈklɪnɪkl/",
        "partOfSpeech": "a.",
        "chinese": "临床的；冷静客观的；简朴的，不装饰的",
        "example": ""
      },
      {
        "id": "word-38-3",
        "english": "disturb*",
        "phonetic": "/dɪˈstɜːb/",
        "partOfSpeech": "v.",
        "chinese": "扰乱；弄乱，打乱；打扰，使烦恼",
        "example": ""
      },
      {
        "id": "word-38-2",
        "english": "panic*",
        "phonetic": "/ˈpænɪk/",
        "partOfSpeech": "a.",
        "chinese": "恐慌的 n. 恐慌，惊惶 v. （使）惊惶失措",
        "example": ""
      },
      {
        "id": "word-37-1",
        "english": "chew*",
        "phonetic": "/tʃuː/",
        "partOfSpeech": "v.",
        "chinese": "咀嚼；回味；熟思",
        "example": ""
      },
      {
        "id": "word-38-62",
        "english": "charcoal*",
        "phonetic": "/ˈtʃɑːkəul/",
        "partOfSpeech": "n.",
        "chinese": "炭，木炭",
        "example": ""
      },
      {
        "id": "word-38-66",
        "english": "contemplate",
        "phonetic": "/ˈkɔntempleɪt/",
        "partOfSpeech": "v.",
        "chinese": "思量，深思；注视，凝视；打算，预期",
        "example": ""
      },
      {
        "id": "word-37-49",
        "english": "impress*",
        "phonetic": "/ɪmˈpres/",
        "partOfSpeech": "vt.",
        "chinese": "给……留下深刻印象，使铭记；印，压印 n. 印记",
        "example": ""
      },
      {
        "id": "word-37-34",
        "english": "portable",
        "phonetic": "/ˈpɔːtəbl/",
        "partOfSpeech": "a.",
        "chinese": "便于携带的；手提式的",
        "example": ""
      },
      {
        "id": "word-37-61",
        "english": "extract*",
        "phonetic": "/ˈekstrækt/",
        "partOfSpeech": "n.",
        "chinese": "摘录，选段；提出物，精，汁 /ɪkˈstrækt/ vt. 取出；提取",
        "example": ""
      },
      {
        "id": "word-37-8",
        "english": "rigid",
        "phonetic": "/ˈrɪdʒɪd/",
        "partOfSpeech": "a.",
        "chinese": "严格的，死板的；刚硬的，僵硬的",
        "example": ""
      },
      {
        "id": "word-38-48",
        "english": "transform*",
        "phonetic": "/trænsˈfɔːm/",
        "partOfSpeech": "v.",
        "chinese": "使改观，改革，改善；变换，把……转换成",
        "example": ""
      },
      {
        "id": "word-37-42",
        "english": "motion",
        "phonetic": "/ˈməuʃn/",
        "partOfSpeech": "n.",
        "chinese": "运动；手势 v. （向……）打手势",
        "example": ""
      },
      {
        "id": "word-38-31",
        "english": "anatomy*",
        "phonetic": "/əˈnætəmɪ/",
        "partOfSpeech": "n.",
        "chinese": "解剖（学）；解剖结构",
        "example": ""
      },
      {
        "id": "word-37-2",
        "english": "speculate",
        "phonetic": "/ˈspekjuleɪt/",
        "partOfSpeech": "v.",
        "chinese": "推测；投机",
        "example": ""
      },
      {
        "id": "word-38-59",
        "english": "brilliant",
        "phonetic": "/ˈbrɪlɪənt/",
        "partOfSpeech": "a.",
        "chinese": "光辉灿烂的；卓越的，有才华的",
        "example": ""
      },
      {
        "id": "word-37-58",
        "english": "optimistic",
        "phonetic": "[ˌɒptɪˈmɪstɪk]",
        "partOfSpeech": "a.",
        "chinese": "乐观的，乐观主义的",
        "example": ""
      },
      {
        "id": "word-37-63",
        "english": "bar*",
        "phonetic": "/bɑː(r)/",
        "partOfSpeech": "n.",
        "chinese": "酒吧；栅栏；棒，条状物 vt. 闩（门、窗等）；阻拦",
        "example": ""
      },
      {
        "id": "word-37-30",
        "english": "notoriety",
        "phonetic": "[ˌnəʊtəˈraɪəti]",
        "partOfSpeech": "n.",
        "chinese": "声名狼藉，臭名昭著",
        "example": ""
      },
      {
        "id": "word-37-43",
        "english": "understanding",
        "phonetic": "/ˏʌndəˈstændɪŋ/",
        "partOfSpeech": "n.",
        "chinese": "理解；谅解 a. 体谅的；宽容的",
        "example": ""
      },
      {
        "id": "word-37-50",
        "english": "maintain*",
        "phonetic": "/meɪnˈteɪn/",
        "partOfSpeech": "vt.",
        "chinese": "维持，保持；维修，保养；坚持，主张；赡养，负担",
        "example": ""
      },
      {
        "id": "word-37-75",
        "english": "mandarin*",
        "phonetic": "/ˈmændərɪn/",
        "partOfSpeech": "n.",
        "chinese": "橘子；达官贵人，官僚； [M-] 普通话",
        "example": ""
      },
      {
        "id": "word-37-24",
        "english": "provenance",
        "phonetic": "/ˈprɔvənəns/",
        "partOfSpeech": "n.",
        "chinese": "出处，起源",
        "example": ""
      },
      {
        "id": "word-38-75",
        "english": "deviance*",
        "phonetic": "['di:vɪəns]",
        "partOfSpeech": "n.",
        "chinese": "异常；偏常行为",
        "example": ""
      },
      {
        "id": "word-37-68",
        "english": "quiver",
        "phonetic": "/ˈkwɪvə(r)/",
        "partOfSpeech": "v.",
        "chinese": "颤抖，抖动",
        "example": ""
      },
      {
        "id": "word-38-1",
        "english": "probe",
        "phonetic": "/prəub/",
        "partOfSpeech": "v.",
        "chinese": "探索，查究；（用探针或探测器等）探查，探测 n. 探针；探测器，探测飞船；探索，调查",
        "example": ""
      },
      {
        "id": "word-38-54",
        "english": "host*",
        "phonetic": "/həust/",
        "partOfSpeech": "n.",
        "chinese": "主人；东道主；主办方；大量，许多 v. 主办；招待",
        "example": ""
      },
      {
        "id": "word-37-60",
        "english": "ignore*",
        "phonetic": "/ɪgˈnɔː(r)/",
        "partOfSpeech": "vt.",
        "chinese": "不顾，不理，忽视",
        "example": ""
      },
      {
        "id": "word-38-8",
        "english": "undisguised*",
        "phonetic": "[ˌʌndɪsˈgaɪzd]",
        "partOfSpeech": "a.",
        "chinese": "无伪装的；坦率的",
        "example": ""
      },
      {
        "id": "word-37-48",
        "english": "insurance",
        "phonetic": "[ɪnˈʃʊərəns]",
        "partOfSpeech": "n.",
        "chinese": "保险；保险费；保险业",
        "example": ""
      },
      {
        "id": "word-38-57",
        "english": "expectation",
        "phonetic": "/ˏekspekˈteɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "期待，预期； [pl.] 前程，成功的前景",
        "example": ""
      },
      {
        "id": "word-38-10",
        "english": "fulfillment",
        "phonetic": "[fʊl'fɪlmənt]",
        "partOfSpeech": "n.",
        "chinese": "履行；实现",
        "example": ""
      },
      {
        "id": "word-38-61",
        "english": "seminar*",
        "phonetic": "/ˈsemɪnɑː(r)/",
        "partOfSpeech": "n.",
        "chinese": "（大学的）研究班，研讨会",
        "example": ""
      },
      {
        "id": "word-37-65",
        "english": "abound*",
        "phonetic": "/əˈbaund/",
        "partOfSpeech": "vi.",
        "chinese": "富于；充满",
        "example": ""
      },
      {
        "id": "word-38-56",
        "english": "abate",
        "phonetic": "/əˈbeɪt/",
        "partOfSpeech": "v.",
        "chinese": "减轻；降价",
        "example": ""
      },
      {
        "id": "word-38-36",
        "english": "glue",
        "phonetic": "/gluː/",
        "partOfSpeech": "n.",
        "chinese": "胶水 vt. 胶合，张贴",
        "example": ""
      },
      {
        "id": "word-38-65",
        "english": "track",
        "phonetic": "",
        "partOfSpeech": "",
        "chinese": "and field* 田径",
        "example": ""
      },
      {
        "id": "word-37-74",
        "english": "obtain",
        "phonetic": "/əbˈteɪn/",
        "partOfSpeech": "v.",
        "chinese": "获得，得到；通用，流行",
        "example": ""
      },
      {
        "id": "word-37-21",
        "english": "recapture",
        "phonetic": "/ˏriːˈkæptʃə(r)/",
        "partOfSpeech": "vt.",
        "chinese": "重获，收复",
        "example": ""
      },
      {
        "id": "word-37-5",
        "english": "revise*",
        "phonetic": "/rɪˈvaɪz/",
        "partOfSpeech": "v.",
        "chinese": "修订；复习",
        "example": ""
      },
      {
        "id": "word-38-71",
        "english": "convenience",
        "phonetic": "/kənˈviːnɪəns/",
        "partOfSpeech": "n.",
        "chinese": "方便；便利设施",
        "example": ""
      },
      {
        "id": "word-38-32",
        "english": "confidence",
        "phonetic": "/ˈkɔnfɪdəns/",
        "partOfSpeech": "n.",
        "chinese": "信任；信心",
        "example": ""
      },
      {
        "id": "word-37-40",
        "english": "cosmopolitan*",
        "phonetic": "/ˏkɔzməˈpɔlɪtən/",
        "partOfSpeech": "a.",
        "chinese": "世界性的，全球的 n. 世界主义者；四海为家者",
        "example": ""
      },
      {
        "id": "word-38-7",
        "english": "amateur",
        "phonetic": "/ˈæmətə(r)/",
        "partOfSpeech": "n.",
        "chinese": "外行；业余爱好者 a. 业余的",
        "example": ""
      },
      {
        "id": "word-38-70",
        "english": "clamp",
        "phonetic": "/klæmp/",
        "partOfSpeech": "v.",
        "chinese": "（用夹具等）夹紧 n. 夹钳",
        "example": ""
      },
      {
        "id": "word-38-35",
        "english": "comprehensive*",
        "phonetic": "/ˏkɔmprɪˈhensɪv/",
        "partOfSpeech": "a.",
        "chinese": "全面的，广泛的；综合的；包容的",
        "example": ""
      },
      {
        "id": "word-38-51",
        "english": "centrifugal",
        "phonetic": "",
        "partOfSpeech": "force",
        "chinese": "[senˈtrɪfjəgəl fɔ:s] n. 离心力",
        "example": ""
      },
      {
        "id": "word-38-55",
        "english": "feminism*",
        "phonetic": "/ˈfemɪnɪzəm/",
        "partOfSpeech": "n.",
        "chinese": "男女平等主义；女权主义；女权运动",
        "example": ""
      },
      {
        "id": "word-37-52",
        "english": "exist*",
        "phonetic": "/ɪgˈzɪst/",
        "partOfSpeech": "vi.",
        "chinese": "存在；生存",
        "example": ""
      },
      {
        "id": "word-37-38",
        "english": "debate",
        "phonetic": "/dɪˈbeɪt/",
        "partOfSpeech": "n./v.",
        "chinese": "争论，辩论",
        "example": ""
      },
      {
        "id": "word-37-29",
        "english": "managerial",
        "phonetic": "[ˌmænəˈdʒɪəriəl]",
        "partOfSpeech": "a.",
        "chinese": "经理的；管理的，经营的",
        "example": ""
      },
      {
        "id": "word-38-46",
        "english": "viscous",
        "phonetic": "/ˈvɪskəs/",
        "partOfSpeech": "a.",
        "chinese": "黏滞的，黏性的",
        "example": ""
      },
      {
        "id": "word-38-11",
        "english": "aspire",
        "phonetic": "/əˈspaɪə(r)/",
        "partOfSpeech": "v.",
        "chinese": "向往，渴望，追求；有志于，有抱负",
        "example": ""
      },
      {
        "id": "word-37-16",
        "english": "geometric",
        "phonetic": "[ˌdʒi:əˈmetrɪk]",
        "partOfSpeech": "n.",
        "chinese": "几何的，几何学的",
        "example": ""
      },
      {
        "id": "word-38-60",
        "english": "hall*",
        "phonetic": "/hɔːl/",
        "partOfSpeech": "n.",
        "chinese": "门厅；礼堂",
        "example": ""
      },
      {
        "id": "word-37-7",
        "english": "professional*",
        "phonetic": "/prəˈfeʃənl/",
        "partOfSpeech": "a.",
        "chinese": "职业的；专业的 n. 自由职业者；专业人员",
        "example": ""
      },
      {
        "id": "word-38-67",
        "english": "budget*",
        "phonetic": "/ˈbʌdʒɪt/",
        "partOfSpeech": "n.",
        "chinese": "预算，预算经费 v. 做预算",
        "example": ""
      },
      {
        "id": "word-37-59",
        "english": "tense",
        "phonetic": "/tens/",
        "partOfSpeech": "a.",
        "chinese": "拉紧的 v. （使）拉紧",
        "example": ""
      },
      {
        "id": "word-38-44",
        "english": "conventional*",
        "phonetic": "/kənˈvenʃənl/",
        "partOfSpeech": "a.",
        "chinese": "普通的，习惯的；常规的，因循守旧的，传统的",
        "example": ""
      },
      {
        "id": "word-37-28",
        "english": "protrude",
        "phonetic": "/prəˈtruːd/",
        "partOfSpeech": "v.",
        "chinese": "（使）伸出；（使）突出",
        "example": ""
      },
      {
        "id": "word-37-39",
        "english": "freefone",
        "phonetic": "{ˈfriːfəun}",
        "partOfSpeech": "n.",
        "chinese": "免费电话",
        "example": ""
      },
      {
        "id": "word-37-66",
        "english": "subjective",
        "phonetic": "/səbˈdʒektɪv/",
        "partOfSpeech": "a.",
        "chinese": "主观（上）的",
        "example": ""
      },
      {
        "id": "word-37-31",
        "english": "opaque",
        "phonetic": "/əuˈpeɪk/",
        "partOfSpeech": "a.",
        "chinese": "不透明的；晦涩的，难懂的",
        "example": ""
      },
      {
        "id": "word-38-38",
        "english": "marsupial*",
        "phonetic": "/mɑːˈsuːpɪəl/",
        "partOfSpeech": "n./a.",
        "chinese": "有袋动物（的）",
        "example": ""
      },
      {
        "id": "word-38-58",
        "english": "excessive",
        "phonetic": "[ɪkˈsesɪv]",
        "partOfSpeech": "a.",
        "chinese": "过多的，极度的，过分的",
        "example": ""
      },
      {
        "id": "word-37-56",
        "english": "appearance*",
        "phonetic": "/əˈpɪərəns/",
        "partOfSpeech": "n.",
        "chinese": "出现；外观",
        "example": ""
      },
      {
        "id": "word-38-64",
        "english": "foul*",
        "phonetic": "/faul/",
        "partOfSpeech": "a.",
        "chinese": "发臭的；肮脏的；邪恶的 n. 犯规",
        "example": ""
      },
      {
        "id": "word-37-19",
        "english": "objectify",
        "phonetic": "[əb'dʒektɪfaɪ]",
        "partOfSpeech": "vt.",
        "chinese": "使客观化；使具体化；物化",
        "example": ""
      },
      {
        "id": "word-38-72",
        "english": "fountain",
        "phonetic": "/ˈfauntɪn/",
        "partOfSpeech": "n.",
        "chinese": "喷泉",
        "example": ""
      },
      {
        "id": "word-38-68",
        "english": "flee",
        "phonetic": "/fliː/",
        "partOfSpeech": "v.",
        "chinese": "逃走；逃避",
        "example": ""
      },
      {
        "id": "word-38-39",
        "english": "commencement",
        "phonetic": "[kəˈmensmənt]",
        "partOfSpeech": "n.",
        "chinese": "开始，开端；毕业典礼",
        "example": ""
      },
      {
        "id": "word-38-24",
        "english": "repack",
        "phonetic": "[re'pæk]",
        "partOfSpeech": "vt.",
        "chinese": "重新包装；重新填塞；再装配；拆修",
        "example": ""
      },
      {
        "id": "word-37-15",
        "english": "paralysis",
        "phonetic": "/pəˈræləsɪs/",
        "partOfSpeech": "n.",
        "chinese": "瘫痪，麻痹，中风",
        "example": ""
      },
      {
        "id": "word-37-23",
        "english": "anticipation",
        "phonetic": "/ænˏtɪsɪˈpeɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "预料",
        "example": ""
      },
      {
        "id": "word-37-72",
        "english": "classification",
        "phonetic": "/ˏklæsɪfɪˈkeɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "分类；级别",
        "example": ""
      },
      {
        "id": "word-37-41",
        "english": "helix*",
        "phonetic": "/ˈhiːlɪks/",
        "partOfSpeech": "n.",
        "chinese": "螺旋（形），螺旋结构",
        "example": ""
      },
      {
        "id": "word-37-70",
        "english": "district",
        "phonetic": "/ˈdɪstrɪkt/",
        "partOfSpeech": "n.",
        "chinese": "区，地区",
        "example": ""
      },
      {
        "id": "word-37-45",
        "english": "temper*",
        "phonetic": "/ˈtempə(r)/",
        "partOfSpeech": "n.",
        "chinese": "情绪 vt. 使缓和",
        "example": ""
      },
      {
        "id": "word-38-41",
        "english": "brood",
        "phonetic": "/bruːd/",
        "partOfSpeech": "v.",
        "chinese": "深思；孵蛋 n. （雏鸡等）一窝",
        "example": ""
      },
      {
        "id": "word-38-73",
        "english": "migrant",
        "phonetic": "[ˈmaɪgrənt]",
        "partOfSpeech": "n.",
        "chinese": "移居者，移民；迁移动物，候鸟",
        "example": ""
      },
      {
        "id": "word-38-13",
        "english": "miscellaneous",
        "phonetic": "/ˏmɪsəˈleɪnɪəs/",
        "partOfSpeech": "a.",
        "chinese": "各种各样的；混杂的",
        "example": ""
      },
      {
        "id": "word-38-12",
        "english": "recession",
        "phonetic": "/rɪˈseʃn/",
        "partOfSpeech": "n.",
        "chinese": "（经济的）衰退，衰退时期；撤回，退回",
        "example": ""
      },
      {
        "id": "word-37-32",
        "english": "ape*",
        "phonetic": "/eɪp/",
        "partOfSpeech": "n.",
        "chinese": "猿 vt. 模仿",
        "example": ""
      },
      {
        "id": "word-38-45",
        "english": "productivity",
        "phonetic": "/ˏprɔdʌkˈtɪvətɪ/",
        "partOfSpeech": "n.",
        "chinese": "生产力；生产率",
        "example": ""
      },
      {
        "id": "word-38-43",
        "english": "prominent",
        "phonetic": "/ˈprɔmɪnənt/",
        "partOfSpeech": "a.",
        "chinese": "突出的；著名的；显著的",
        "example": ""
      },
      {
        "id": "word-38-9",
        "english": "sliver*",
        "phonetic": "/ˈslɪvə(r)/",
        "partOfSpeech": "n.",
        "chinese": "银；银器",
        "example": ""
      },
      {
        "id": "word-37-37",
        "english": "dialect",
        "phonetic": "/ˈdaɪəlekt/",
        "partOfSpeech": "n.",
        "chinese": "方言，土语",
        "example": ""
      },
      {
        "id": "word-37-73",
        "english": "pollution*",
        "phonetic": "[pəˈlu:ʃn]",
        "partOfSpeech": "n.",
        "chinese": "污染，污染物；玷污",
        "example": ""
      },
      {
        "id": "word-38-40",
        "english": "observe",
        "phonetic": "/əbˈzɜːv/",
        "partOfSpeech": "v.",
        "chinese": "察觉；观察；遵守",
        "example": ""
      },
      {
        "id": "word-38-42",
        "english": "interdependent*",
        "phonetic": "/ˏɪntədɪˈpendənt/",
        "partOfSpeech": "a.",
        "chinese": "互相依赖的，互助的",
        "example": ""
      },
      {
        "id": "word-37-44",
        "english": "circumstance*",
        "phonetic": "/ˈsɜːkəmstəns/",
        "partOfSpeech": "n.",
        "chinese": "环境； [pl.] 境况，情况",
        "example": ""
      },
      {
        "id": "word-38-49",
        "english": "strategist",
        "phonetic": "[ˈstrætədʒɪst]",
        "partOfSpeech": "n.",
        "chinese": "战略家",
        "example": ""
      },
      {
        "id": "word-37-6",
        "english": "deposit",
        "phonetic": "/dɪˈpɔzɪt/",
        "partOfSpeech": "v.",
        "chinese": "存放；储蓄；使沉淀；付（保证金） n. 存款；保证金，押金；沉积物",
        "example": ""
      },
      {
        "id": "word-37-3",
        "english": "bulge",
        "phonetic": "/bʌldʒ/",
        "partOfSpeech": "n./v.",
        "chinese": "膨胀；凸出；塞满",
        "example": ""
      },
      {
        "id": "word-38-18",
        "english": "deflect",
        "phonetic": "/dɪˈflekt/",
        "partOfSpeech": "v.",
        "chinese": "（使）偏斜，（使）转向",
        "example": ""
      },
      {
        "id": "word-37-35",
        "english": "depart*",
        "phonetic": "/dɪˈpɑːt/",
        "partOfSpeech": "vi.",
        "chinese": "离开，起程",
        "example": ""
      },
      {
        "id": "word-37-14",
        "english": "prefabricate",
        "phonetic": "/ˏpriːˈfæbrɪkeɪt/",
        "partOfSpeech": "vt.",
        "chinese": "预制构件（用以组装建筑物、船舶等）",
        "example": ""
      },
      {
        "id": "word-38-47",
        "english": "murder",
        "phonetic": "/ˈmɜːdə(r)/",
        "partOfSpeech": "n./v.",
        "chinese": "谋杀，凶杀",
        "example": ""
      },
      {
        "id": "word-37-67",
        "english": "particularly*",
        "phonetic": "[pəˈtikjuləli]",
        "partOfSpeech": "ad.",
        "chinese": "特别，尤其",
        "example": ""
      },
      {
        "id": "word-38-29",
        "english": "depletion",
        "phonetic": "[dɪ'pli:ʃn]",
        "partOfSpeech": "n.",
        "chinese": "消减，消耗",
        "example": ""
      },
      {
        "id": "word-37-64",
        "english": "externally",
        "phonetic": "[ɪk'stɜ:nəlɪ]",
        "partOfSpeech": "ad.",
        "chinese": "外表上，外形上",
        "example": ""
      },
      {
        "id": "word-37-51",
        "english": "meaningful*",
        "phonetic": "['mi:nɪŋfl]",
        "partOfSpeech": "a.",
        "chinese": "有目的的；有意义的",
        "example": ""
      },
      {
        "id": "word-37-20",
        "english": "presuppose",
        "phonetic": "/ˏpriːsəˈpəuz/",
        "partOfSpeech": "vt.",
        "chinese": "预先假定……属实；认为，假设；以……为先决条件，以……为前提",
        "example": ""
      },
      {
        "id": "word-37-22",
        "english": "contrive",
        "phonetic": "/kənˈtraɪv/",
        "partOfSpeech": "v.",
        "chinese": "计划，图谋；设计；发明",
        "example": ""
      },
      {
        "id": "word-38-69",
        "english": "worthwhile",
        "phonetic": "[ˌwɜ:θˈwaɪl]",
        "partOfSpeech": "a.",
        "chinese": "值得花费时间（或金钱）的，值得做的",
        "example": ""
      },
      {
        "id": "word-38-63",
        "english": "navigable*",
        "phonetic": "/ˈnævɪgəbl/",
        "partOfSpeech": "a.",
        "chinese": "可通航的；适于航行的",
        "example": ""
      },
      {
        "id": "word-38-50",
        "english": "indulge",
        "phonetic": "/ɪnˈdʌldʒ/",
        "partOfSpeech": "v.",
        "chinese": "沉溺于，纵情于；满足（欲望、兴趣等）；放纵，听任",
        "example": ""
      },
      {
        "id": "word-38-14",
        "english": "utilization",
        "phonetic": "[ˌju:təlaɪ'zeɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "利用",
        "example": ""
      },
      {
        "id": "word-37-36",
        "english": "gauge",
        "phonetic": "/geɪdʒ/",
        "partOfSpeech": "n.",
        "chinese": "测量仪表；规格，标准；计量器 vt. 测量，度量",
        "example": ""
      },
      {
        "id": "word-37-53",
        "english": "jostle*",
        "phonetic": "/ˈdʒɔsl/",
        "partOfSpeech": "v.",
        "chinese": "推挤；挤开通路",
        "example": ""
      },
      {
        "id": "word-38-74",
        "english": "specify",
        "phonetic": "/ˈspesɪfaɪ/",
        "partOfSpeech": "v.",
        "chinese": "指定；详细说明",
        "example": ""
      },
      {
        "id": "word-37-71",
        "english": "MasterCard*",
        "phonetic": "{ˈmɑːstə(r)kɑːd}",
        "partOfSpeech": "n.",
        "chinese": "万事达信用卡",
        "example": ""
      },
      {
        "id": "word-37-17",
        "english": "floral",
        "phonetic": "/ˈflɔːrəl/",
        "partOfSpeech": "a.",
        "chinese": "花的，像花的；绘有花的，饰以花的；植物群的",
        "example": ""
      },
      {
        "id": "word-37-62",
        "english": "therefore*",
        "phonetic": "/ˈðeəfɔː(r)/",
        "partOfSpeech": "ad.",
        "chinese": "因此，所以",
        "example": ""
      },
      {
        "id": "word-38-53",
        "english": "definition",
        "phonetic": "/ˏdefɪˈnɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "定义，释义；清晰（度）",
        "example": ""
      }
    ],
    "article": "In the field of Economic Development, researchers have been studying various phenomena to understand their implications. The concept of trench has been widely discussed in recent studies. The concept of personality* has been widely discussed in recent studies. The concept of hostility* has been widely discussed in recent studies. The concept of insignificant* has been widely discussed in recent studies. The concept of anecdote has been widely discussed in recent studies. The concept of disruptive has been widely discussed in recent studies. The concept of grassy* has been widely discussed in recent studies. The concept of reclaim has been widely discussed in recent studies. The concept of literal has been widely discussed in recent studies. The concept of fertile has been widely discussed in recent studies. Researchers have found that these factors play a significant role in shaping our understanding of the subject. Further studies are needed to explore the full implications of these findings."
  },
  {
    "id": "unit-20",
    "name": "Unit 20: Word Lists 39 & 40",
    "words": [
      {
        "id": "word-39-67",
        "english": "large-scale*",
        "phonetic": "[lɑ:dʒ",
        "partOfSpeech": "",
        "chinese": "skeɪl] a. 大规模的，大范围的",
        "example": ""
      },
      {
        "id": "word-39-44",
        "english": "sucker",
        "phonetic": "/ˈsʌkə(r)/",
        "partOfSpeech": "n.",
        "chinese": "吸盘；吸根，根出条",
        "example": ""
      },
      {
        "id": "word-39-1",
        "english": "estimate*",
        "phonetic": "/ˈestɪmeɪt/",
        "partOfSpeech": "v.",
        "chinese": "估计，估量；估价；评价 /ˈestɪmət/ n. 估计，估量；估价；评价",
        "example": ""
      },
      {
        "id": "word-39-14",
        "english": "eject",
        "phonetic": "/ɪˈdʒekt/",
        "partOfSpeech": "v.",
        "chinese": "弹出；喷出；驱逐，逐出",
        "example": ""
      },
      {
        "id": "word-39-52",
        "english": "exploit*",
        "phonetic": "/ɪkˈsplɔɪt/",
        "partOfSpeech": "vt.",
        "chinese": "剥削；开发，开拓；利用 /ˈeksplɔɪt/ n. 英勇行为；业绩，功绩",
        "example": ""
      },
      {
        "id": "word-39-5",
        "english": "censure*",
        "phonetic": "/ˈsenʃə(r)/",
        "partOfSpeech": "vt./n.",
        "chinese": "指责，谴责，责难",
        "example": ""
      },
      {
        "id": "word-39-57",
        "english": "competition*",
        "phonetic": "/ˏkɔmpəˈtɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "竞争；比赛",
        "example": ""
      },
      {
        "id": "word-39-48",
        "english": "applaud",
        "phonetic": "/əˈplɔːd/",
        "partOfSpeech": "v.",
        "chinese": "（向……）鼓掌，喝彩；称赞",
        "example": ""
      },
      {
        "id": "word-39-8",
        "english": "metro*",
        "phonetic": "/ˈmetrəu/",
        "partOfSpeech": "n.",
        "chinese": "地下铁路",
        "example": ""
      },
      {
        "id": "word-40-8",
        "english": "counterproductive",
        "phonetic": "[ˌkaʊntəprəˈdʌktɪv]",
        "partOfSpeech": "a.",
        "chinese": "产生相反效果的，适得其反的",
        "example": ""
      },
      {
        "id": "word-39-27",
        "english": "obstruct",
        "phonetic": "/əbˈstrʌkt/",
        "partOfSpeech": "v.",
        "chinese": "妨碍，阻止；阻塞；截断",
        "example": ""
      },
      {
        "id": "word-39-32",
        "english": "reiterate",
        "phonetic": "/riːˈɪtəreɪt/",
        "partOfSpeech": "vt.",
        "chinese": "重复，反复；反复地说，重申",
        "example": ""
      },
      {
        "id": "word-40-71",
        "english": "upper*",
        "phonetic": "/ˈʌpə(r)/",
        "partOfSpeech": "a.",
        "chinese": "上面的；地位较高的",
        "example": ""
      },
      {
        "id": "word-40-62",
        "english": "cylinder",
        "phonetic": "/ˈsɪlɪndə(r)/",
        "partOfSpeech": "n.",
        "chinese": "圆柱体；圆筒；汽缸",
        "example": ""
      },
      {
        "id": "word-39-63",
        "english": "interact",
        "phonetic": "/ˏɪntərˈækt/",
        "partOfSpeech": "vt.",
        "chinese": "相互作用；相互影响",
        "example": ""
      },
      {
        "id": "word-39-65",
        "english": "trivial*",
        "phonetic": "/ˈtrɪvɪəl/",
        "partOfSpeech": "a.",
        "chinese": "无价值的，琐屑的；平庸的，普通的",
        "example": ""
      },
      {
        "id": "word-39-17",
        "english": "inheritance",
        "phonetic": "[ɪn'herɪtəns]",
        "partOfSpeech": "n.",
        "chinese": "遗传；继承，继承物；遗产，遗赠",
        "example": ""
      },
      {
        "id": "word-40-41",
        "english": "participant*",
        "phonetic": "[pɑ:ˈtɪsɪpənt]",
        "partOfSpeech": "n.",
        "chinese": "参加者，参与者",
        "example": ""
      },
      {
        "id": "word-40-50",
        "english": "weakness*",
        "phonetic": "[ˈwi:knəs]",
        "partOfSpeech": "n.",
        "chinese": "虚弱；缺点；偏好，嗜好",
        "example": ""
      },
      {
        "id": "word-40-43",
        "english": "distract",
        "phonetic": "/dɪˈstrækt/",
        "partOfSpeech": "vt.",
        "chinese": "转移（注意力）；使分心",
        "example": ""
      },
      {
        "id": "word-39-71",
        "english": "bargain",
        "phonetic": "/ˈbɑːgɪn/",
        "partOfSpeech": "vi.",
        "chinese": "讨价还价 n. 协议；交易；便宜货",
        "example": ""
      },
      {
        "id": "word-39-37",
        "english": "board*",
        "phonetic": "/bɔːd/",
        "partOfSpeech": "n.",
        "chinese": "板；委员会",
        "example": ""
      },
      {
        "id": "word-40-32",
        "english": "sympathise",
        "phonetic": "['sɪmpəθaɪz]",
        "partOfSpeech": "vi.",
        "chinese": "同情；赞同",
        "example": ""
      },
      {
        "id": "word-39-76",
        "english": "liver",
        "phonetic": "/ˈlɪvə(r)/",
        "partOfSpeech": "n.",
        "chinese": "生活者，居住者；肝脏",
        "example": ""
      },
      {
        "id": "word-39-21",
        "english": "periphery",
        "phonetic": "/pəˈrɪfərɪ/",
        "partOfSpeech": "n.",
        "chinese": "不重要的部分；外围",
        "example": ""
      },
      {
        "id": "word-39-16",
        "english": "autoimmune",
        "phonetic": "[ˌɔ:təʊɪˈmju:n]",
        "partOfSpeech": "a.",
        "chinese": "自身免疫的",
        "example": ""
      },
      {
        "id": "word-39-3",
        "english": "livelihood*",
        "phonetic": "/ˈlaɪvlɪhud/",
        "partOfSpeech": "n.",
        "chinese": "生活，生计",
        "example": ""
      },
      {
        "id": "word-39-4",
        "english": "manufacture",
        "phonetic": "[ˌmænjʊ'fæktʃə(r)]",
        "partOfSpeech": "vt.",
        "chinese": "大量制造，成批生产 n. 大量制造；工业品",
        "example": ""
      },
      {
        "id": "word-39-72",
        "english": "infection",
        "phonetic": "/ɪnˈfekʃn/",
        "partOfSpeech": "n.",
        "chinese": "传染，感染，侵染，传播；传染病",
        "example": ""
      },
      {
        "id": "word-40-66",
        "english": "refreshment",
        "phonetic": "/rɪˈfreʃmənt/",
        "partOfSpeech": "n.",
        "chinese": "（精力的）恢复； [pl.] 茶点，点心，饮料",
        "example": ""
      },
      {
        "id": "word-40-67",
        "english": "deteriorate*",
        "phonetic": "/dɪˈtɪərɪəreɪt/",
        "partOfSpeech": "v.",
        "chinese": "变坏，恶化；退化",
        "example": ""
      },
      {
        "id": "word-39-41",
        "english": "rent*",
        "phonetic": "/rent/",
        "partOfSpeech": "v.",
        "chinese": "租借；出租 n. 租金",
        "example": ""
      },
      {
        "id": "word-40-6",
        "english": "spectacular",
        "phonetic": "/spekˈtækjulə(r)/",
        "partOfSpeech": "a.",
        "chinese": "壮观的；令人惊叹的 n. 壮观的场面；精彩的表演",
        "example": ""
      },
      {
        "id": "word-39-31",
        "english": "monumental",
        "phonetic": "/ˏmɔnjuˈmentl/",
        "partOfSpeech": "a.",
        "chinese": "纪念碑的，纪念物的；不朽的，有重大意义的",
        "example": ""
      },
      {
        "id": "word-40-75",
        "english": "duration",
        "phonetic": "/djuˈreɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "持续，持续的时间，期间",
        "example": ""
      },
      {
        "id": "word-40-73",
        "english": "emphasis",
        "phonetic": "/ˈemfəsɪs/",
        "partOfSpeech": "n.",
        "chinese": "强调；重要性",
        "example": ""
      },
      {
        "id": "word-40-54",
        "english": "vacancy",
        "phonetic": "/ˈveɪkənsɪ/",
        "partOfSpeech": "n.",
        "chinese": "空位，空房间；（职位的）空缺，空职；无主意，空虚，茫然若失",
        "example": ""
      },
      {
        "id": "word-40-12",
        "english": "emulate",
        "phonetic": "/ˈemjuleɪt/",
        "partOfSpeech": "vt.",
        "chinese": "与……竞争，赶上；仿真，模仿",
        "example": ""
      },
      {
        "id": "word-39-9",
        "english": "enroll*",
        "phonetic": "[ɪn'rəʊl]",
        "partOfSpeech": "v.",
        "chinese": "入学，登记；加入；招收",
        "example": ""
      },
      {
        "id": "word-40-55",
        "english": "locality",
        "phonetic": "/ləuˈkælətɪ/",
        "partOfSpeech": "n.",
        "chinese": "位置；地区",
        "example": ""
      },
      {
        "id": "word-39-46",
        "english": "scope*",
        "phonetic": "/skəup/",
        "partOfSpeech": "n.",
        "chinese": "眼界，见识；（活动、影响等的）范围；（发挥能力等的）余地，机会",
        "example": ""
      },
      {
        "id": "word-40-45",
        "english": "skew*",
        "phonetic": "/skjuː/",
        "partOfSpeech": "vt.",
        "chinese": "使偏；曲解 a. 歪斜的",
        "example": ""
      },
      {
        "id": "word-39-68",
        "english": "region*",
        "phonetic": "/ˈriːdʒən/",
        "partOfSpeech": "n.",
        "chinese": "地区；范围",
        "example": ""
      },
      {
        "id": "word-39-66",
        "english": "exorbitant",
        "phonetic": "/ɪgˈzɔːbɪtənt/",
        "partOfSpeech": "a.",
        "chinese": "过分的，不合理的",
        "example": ""
      },
      {
        "id": "word-40-18",
        "english": "tackle",
        "phonetic": "/ˈtækl/",
        "partOfSpeech": "v.",
        "chinese": "对付，处理；向某人提起（问题或困难情况）；（足球等比赛中）抢截，抢球",
        "example": ""
      },
      {
        "id": "word-39-49",
        "english": "appraisal",
        "phonetic": "[əˈpreɪzl]",
        "partOfSpeech": "n.",
        "chinese": "评估，评价",
        "example": ""
      },
      {
        "id": "word-39-43",
        "english": "crescent*",
        "phonetic": "/ˈkresnt/",
        "partOfSpeech": "n.",
        "chinese": "新月，月牙；新月形（物） a. 新月形的",
        "example": ""
      },
      {
        "id": "word-39-73",
        "english": "conservative",
        "phonetic": "/kənˈsɜːvətɪv/",
        "partOfSpeech": "a.",
        "chinese": "保守的；传统的；守旧的 n. 保守的人",
        "example": ""
      },
      {
        "id": "word-40-16",
        "english": "collateral",
        "phonetic": "/kəˈlætərəl/",
        "partOfSpeech": "a.",
        "chinese": "并行的；间接的，附带的",
        "example": ""
      },
      {
        "id": "word-39-13",
        "english": "deserve*",
        "phonetic": "/dɪˈzɜːv/",
        "partOfSpeech": "v.",
        "chinese": "应得；值得",
        "example": ""
      },
      {
        "id": "word-40-30",
        "english": "stroke",
        "phonetic": "/strəuk/",
        "partOfSpeech": "n.",
        "chinese": "击，打；（病）突然发作，中风；（体育中的）击球；笔触，一笔；（游泳或划船的）划，划法；一击；报时的钟声；抚摸 vt. 抚摸",
        "example": ""
      },
      {
        "id": "word-39-47",
        "english": "cooperate",
        "phonetic": "/kəuˈɔpəreɪt/",
        "partOfSpeech": "vi.",
        "chinese": "合作，协作",
        "example": ""
      },
      {
        "id": "word-39-2",
        "english": "tick",
        "phonetic": "",
        "partOfSpeech": "",
        "chinese": "off [tik ɔf] 用记号勾出，给……打核对号",
        "example": ""
      },
      {
        "id": "word-40-52",
        "english": "compound*",
        "phonetic": "/kəmˈpaund/",
        "partOfSpeech": "vt.",
        "chinese": "使恶化，加重；使化合，使合成 /ˈkɔmpaund/ n. 化合物，复合物；（有围墙或篱笆等的）楼群，大院 a. 复合的，化合的；综合的",
        "example": ""
      },
      {
        "id": "word-39-36",
        "english": "distinctive*",
        "phonetic": "/dɪˈstɪŋktɪv/",
        "partOfSpeech": "a.",
        "chinese": "出众的；有特色的",
        "example": ""
      },
      {
        "id": "word-40-69",
        "english": "meantime",
        "phonetic": "/ˈmiːntaɪm/",
        "partOfSpeech": "n.",
        "chinese": "其时 ad. 同时，当时",
        "example": ""
      },
      {
        "id": "word-39-28",
        "english": "prohibitive",
        "phonetic": "/prəˈhɪbətɪv/",
        "partOfSpeech": "a.",
        "chinese": "禁止的，抑制的；令人望而却步的",
        "example": ""
      },
      {
        "id": "word-40-9",
        "english": "variant",
        "phonetic": "/ˈveərɪənt/",
        "partOfSpeech": "a.",
        "chinese": "不同的 n. 变量；变体",
        "example": ""
      },
      {
        "id": "word-40-25",
        "english": "exhaustive",
        "phonetic": "/ɪgˈzɔːstɪv/",
        "partOfSpeech": "a.",
        "chinese": "包揽无遗的，彻底的，详尽的",
        "example": ""
      },
      {
        "id": "word-39-55",
        "english": "counsel",
        "phonetic": "/ˈkaunsl/",
        "partOfSpeech": "n.",
        "chinese": "律师，法律顾问；建议，忠告 v. 商议，劝告",
        "example": ""
      },
      {
        "id": "word-40-57",
        "english": "accuracy",
        "phonetic": "/ˈækjərəsɪ/",
        "partOfSpeech": "n.",
        "chinese": "准确（性），精确（性）",
        "example": ""
      },
      {
        "id": "word-39-20",
        "english": "dizziness",
        "phonetic": "['dɪzɪnəs]",
        "partOfSpeech": "n.",
        "chinese": "头昏眼花，眩晕",
        "example": ""
      },
      {
        "id": "word-40-48",
        "english": "astray",
        "phonetic": "/əˈstreɪ/",
        "partOfSpeech": "ad.",
        "chinese": "迷路地；误入歧途地",
        "example": ""
      },
      {
        "id": "word-39-74",
        "english": "spin*",
        "phonetic": "/spɪn/",
        "partOfSpeech": "v.",
        "chinese": "（使）旋转 n. 旋转",
        "example": ""
      },
      {
        "id": "word-40-38",
        "english": "edible",
        "phonetic": "[ˈedəbl]",
        "partOfSpeech": "a.",
        "chinese": "可食用的",
        "example": ""
      },
      {
        "id": "word-40-59",
        "english": "afford*",
        "phonetic": "/əˈfɔːd/",
        "partOfSpeech": "v.",
        "chinese": "负担得起",
        "example": ""
      },
      {
        "id": "word-40-53",
        "english": "span",
        "phonetic": "/spæn/",
        "partOfSpeech": "n.",
        "chinese": "跨距；一段时间 v. 横跨；持续",
        "example": ""
      },
      {
        "id": "word-40-24",
        "english": "domesticate",
        "phonetic": "/dəˈmestɪkeɪt/",
        "partOfSpeech": "vt.",
        "chinese": "驯养，教化；使喜爱家居生活",
        "example": ""
      },
      {
        "id": "word-40-76",
        "english": "primarily",
        "phonetic": "[praɪˈmerəli]",
        "partOfSpeech": "ad.",
        "chinese": "首先；主要地，首要地",
        "example": ""
      },
      {
        "id": "word-40-14",
        "english": "topple",
        "phonetic": "/ˈtɔpl/",
        "partOfSpeech": "v.",
        "chinese": "倒塌，倒下；打倒，推翻",
        "example": ""
      },
      {
        "id": "word-39-15",
        "english": "verification",
        "phonetic": "[ˌverɪfɪ'keɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "确认",
        "example": ""
      },
      {
        "id": "word-39-39",
        "english": "prevalent",
        "phonetic": "/ˈprevələnt/",
        "partOfSpeech": "a.",
        "chinese": "流行的，普遍的",
        "example": ""
      },
      {
        "id": "word-40-49",
        "english": "theory*",
        "phonetic": "/ˈθɪərɪ/",
        "partOfSpeech": "n.",
        "chinese": "理论，原理；学说；意见，看法",
        "example": ""
      },
      {
        "id": "word-39-64",
        "english": "starchy*",
        "phonetic": "['stɑ:tʃɪ]",
        "partOfSpeech": "a.",
        "chinese": "含淀粉的",
        "example": ""
      },
      {
        "id": "word-40-31",
        "english": "solar",
        "phonetic": "/ˈsəulə(r)/",
        "partOfSpeech": "a.",
        "chinese": "太阳的；（利用）太阳能的",
        "example": ""
      },
      {
        "id": "word-40-61",
        "english": "connect*",
        "phonetic": "/kəˈnekt/",
        "partOfSpeech": "v.",
        "chinese": "连接，衔接；联合，关联；由……联想到；给……接通电话",
        "example": ""
      },
      {
        "id": "word-40-20",
        "english": "supplementary",
        "phonetic": "/ˏsʌplɪˈmentrɪ/",
        "partOfSpeech": "a.",
        "chinese": "增补的，补充的",
        "example": ""
      },
      {
        "id": "word-39-10",
        "english": "civilization",
        "phonetic": "/ˏsɪvəlaɪˈzeɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "文明（社会），文化",
        "example": ""
      },
      {
        "id": "word-39-59",
        "english": "critic",
        "phonetic": "/ˈkrɪtɪk/",
        "partOfSpeech": "n.",
        "chinese": "批评家；爱挑剔的人",
        "example": ""
      },
      {
        "id": "word-39-50",
        "english": "allowance",
        "phonetic": "/əˈlauəns/",
        "partOfSpeech": "n.",
        "chinese": "津贴；允许，容忍",
        "example": ""
      },
      {
        "id": "word-39-53",
        "english": "domestic",
        "phonetic": "/dəˈmestɪk/",
        "partOfSpeech": "a.",
        "chinese": "本国的；家庭的；驯养的",
        "example": ""
      },
      {
        "id": "word-40-77",
        "english": "due*",
        "phonetic": "/djuː/",
        "partOfSpeech": "a.",
        "chinese": "到期的，预期的；应有的，应得的；正当的",
        "example": ""
      },
      {
        "id": "word-40-64",
        "english": "participate*",
        "phonetic": "/pɑːˈtɪsɪpeɪt/",
        "partOfSpeech": "vi.",
        "chinese": "参加，参与",
        "example": ""
      },
      {
        "id": "word-39-22",
        "english": "credential",
        "phonetic": "[krəˈdenʃl]",
        "partOfSpeech": "n.",
        "chinese": "证明书；（学历、资历）资格证书；证件",
        "example": ""
      },
      {
        "id": "word-40-63",
        "english": "disadvantage",
        "phonetic": "/ˏdɪsədˈvɑːntɪdʒ/",
        "partOfSpeech": "n.",
        "chinese": "缺点，不利",
        "example": ""
      },
      {
        "id": "word-39-6",
        "english": "voltage",
        "phonetic": "[ˈvəʊltɪdʒ]",
        "partOfSpeech": "n.",
        "chinese": "电压",
        "example": ""
      },
      {
        "id": "word-40-35",
        "english": "diversity*",
        "phonetic": "/daɪˈvɜːsətɪ/",
        "partOfSpeech": "n.",
        "chinese": "多样性；差异",
        "example": ""
      },
      {
        "id": "word-40-36",
        "english": "decline*",
        "phonetic": "/dɪˈklaɪn/",
        "partOfSpeech": "n./v.",
        "chinese": "下降，减少；衰退，衰落",
        "example": ""
      },
      {
        "id": "word-39-18",
        "english": "relentless",
        "phonetic": "[rɪˈlentləs]",
        "partOfSpeech": "a.",
        "chinese": "无情的，残酷的",
        "example": ""
      },
      {
        "id": "word-39-12",
        "english": "embark",
        "phonetic": "/ɪmˈbɑːk/",
        "partOfSpeech": "v.",
        "chinese": "（使）上船或飞机；（使）从事",
        "example": ""
      },
      {
        "id": "word-40-1",
        "english": "create*",
        "phonetic": "/kriːˈeɪt/",
        "partOfSpeech": "vt.",
        "chinese": "创造，创作；产生",
        "example": ""
      },
      {
        "id": "word-40-26",
        "english": "calibrate",
        "phonetic": "/ˈkælɪbreɪt/",
        "partOfSpeech": "vt.",
        "chinese": "标定，划分；校准刻度",
        "example": ""
      },
      {
        "id": "word-39-69",
        "english": "alternate",
        "phonetic": "/ˈɔːltəneɪt/",
        "partOfSpeech": "v.",
        "chinese": "（使）轮流，（使）交替 /ɔːlˈtɜːnət/ a. 轮流的；间隔的；交替的",
        "example": ""
      },
      {
        "id": "word-40-27",
        "english": "descend",
        "phonetic": "/dɪˈsend/",
        "partOfSpeech": "v.",
        "chinese": "下来，下降；遗传",
        "example": ""
      },
      {
        "id": "word-39-33",
        "english": "jeopardise",
        "phonetic": "/ˈdʒepədaɪz/",
        "partOfSpeech": "vt.",
        "chinese": "危害，使受危困",
        "example": ""
      },
      {
        "id": "word-39-42",
        "english": "eminent*",
        "phonetic": "/ˈemɪnənt/",
        "partOfSpeech": "a.",
        "chinese": "杰出的，显赫的",
        "example": ""
      },
      {
        "id": "word-40-15",
        "english": "resilience",
        "phonetic": "[rɪˈzɪliəns]",
        "partOfSpeech": "n.",
        "chinese": "弹性，弹力；复原力；适应性；（指人）乐观的性情",
        "example": ""
      },
      {
        "id": "word-39-19",
        "english": "requisite",
        "phonetic": "/ˈrekwɪzɪt/",
        "partOfSpeech": "a.",
        "chinese": "（情况）需要的；（成功）必要的 n. 必需品；要素",
        "example": ""
      },
      {
        "id": "word-39-24",
        "english": "reel",
        "phonetic": "/riːl/",
        "partOfSpeech": "n.",
        "chinese": "卷轴，卷筒，卷盘，线轴 v. 摇摇晃晃地移动，蹒跚；眩晕，发昏；卷，绕",
        "example": ""
      },
      {
        "id": "word-39-35",
        "english": "elusive",
        "phonetic": "/ɪˈluːsɪv/",
        "partOfSpeech": "a.",
        "chinese": "难懂的，难捉摸的；易忘的",
        "example": ""
      },
      {
        "id": "word-39-60",
        "english": "extensive",
        "phonetic": "/ɪkˈstensɪv/",
        "partOfSpeech": "a.",
        "chinese": "广大的，广阔的；广泛的",
        "example": ""
      },
      {
        "id": "word-39-77",
        "english": "inflammable*",
        "phonetic": "/ɪnˈflæməbl/",
        "partOfSpeech": "a.",
        "chinese": "易燃的；易怒的",
        "example": ""
      },
      {
        "id": "word-40-11",
        "english": "autocratic",
        "phonetic": "[ˌɔ:tə'krætɪk]",
        "partOfSpeech": "a.",
        "chinese": "独裁的，专制的",
        "example": ""
      },
      {
        "id": "word-39-25",
        "english": "churn",
        "phonetic": "/tʃɜːn/",
        "partOfSpeech": "n.",
        "chinese": "（制作黄油用的）搅乳器； v. 用搅乳器搅拌；剧烈搅动；猛烈翻滚；反胃，恶心",
        "example": ""
      },
      {
        "id": "word-40-51",
        "english": "portion",
        "phonetic": "/ˈpɔːʃn/",
        "partOfSpeech": "n.",
        "chinese": "部分；一份 vt. 划分，分配",
        "example": ""
      },
      {
        "id": "word-40-37",
        "english": "crisis*",
        "phonetic": "/ˈkraɪsɪs/",
        "partOfSpeech": "n.",
        "chinese": "危机；紧要关头，关键阶段",
        "example": ""
      },
      {
        "id": "word-40-28",
        "english": "frontier",
        "phonetic": "/ˈfrʌntɪə(r)/",
        "partOfSpeech": "n.",
        "chinese": "边境，边界；开发地区的边缘地带； [常pl.] 前沿，新领域",
        "example": ""
      },
      {
        "id": "word-40-44",
        "english": "frown*",
        "phonetic": "/fraun/",
        "partOfSpeech": "vi.",
        "chinese": "（表示愤怒或烦心而）皱眉",
        "example": ""
      },
      {
        "id": "word-39-80",
        "english": "swear",
        "phonetic": "/sweə(r)/",
        "partOfSpeech": "v.",
        "chinese": "宣（誓）；诅咒",
        "example": ""
      },
      {
        "id": "word-39-7",
        "english": "logic",
        "phonetic": "/ˈlɔdʒɪk/",
        "partOfSpeech": "n.",
        "chinese": "逻辑；逻辑学",
        "example": ""
      },
      {
        "id": "word-39-56",
        "english": "sticky",
        "phonetic": "/ˈstɪkɪ/",
        "partOfSpeech": "a.",
        "chinese": "黏性的；（天气）湿热的",
        "example": ""
      },
      {
        "id": "word-40-40",
        "english": "decouple*",
        "phonetic": "[di:'kʌpl]",
        "partOfSpeech": "v.",
        "chinese": "减弱，减少",
        "example": ""
      },
      {
        "id": "word-39-79",
        "english": "surf",
        "phonetic": "/sɜːf/",
        "partOfSpeech": "v.",
        "chinese": "冲浪",
        "example": ""
      },
      {
        "id": "word-40-58",
        "english": "tolerate",
        "phonetic": "/ˈtɔləreɪt/",
        "partOfSpeech": "vt.",
        "chinese": "容忍，宽容；容许，承认",
        "example": ""
      },
      {
        "id": "word-40-23",
        "english": "repel",
        "phonetic": "/rɪˈpel/",
        "partOfSpeech": "vt.",
        "chinese": "击退，驱逐；抵制，拒绝；使反感，使厌恶",
        "example": ""
      },
      {
        "id": "word-39-62",
        "english": "imagine*",
        "phonetic": "/ɪˈmædʒɪn/",
        "partOfSpeech": "v.",
        "chinese": "想象；猜想",
        "example": ""
      },
      {
        "id": "word-39-23",
        "english": "facsimile",
        "phonetic": "/fækˈsɪməlɪ/",
        "partOfSpeech": "n.",
        "chinese": "复制品；副本",
        "example": ""
      },
      {
        "id": "word-39-75",
        "english": "personnel",
        "phonetic": "/ˏpɜːsəˈnel/",
        "partOfSpeech": "n.",
        "chinese": "全体人员，员工",
        "example": ""
      },
      {
        "id": "word-40-33",
        "english": "fusion*",
        "phonetic": "/ˈfjuːʒn/",
        "partOfSpeech": "n.",
        "chinese": "熔化，熔合；聚变",
        "example": ""
      },
      {
        "id": "word-40-13",
        "english": "disastrous",
        "phonetic": "[dɪˈzɑ:strəs]",
        "partOfSpeech": "a.",
        "chinese": "损失惨重的，灾难性的；极坏的",
        "example": ""
      },
      {
        "id": "word-39-54",
        "english": "unexpected",
        "phonetic": "/ʌnɪkˈspektɪd/",
        "partOfSpeech": "a.",
        "chinese": "想不到的，意外的",
        "example": ""
      },
      {
        "id": "word-39-26",
        "english": "nocturnal",
        "phonetic": "/nɔkˈtɜːnl/",
        "partOfSpeech": "a.",
        "chinese": "夜晚的；夜晚发生的；夜晚活动的",
        "example": ""
      },
      {
        "id": "word-39-78",
        "english": "disfigure*",
        "phonetic": "/dɪsˈfɪgə(r)/",
        "partOfSpeech": "vt.",
        "chinese": "使毁容，使变丑",
        "example": ""
      },
      {
        "id": "word-39-11",
        "english": "compendium*",
        "phonetic": "/kəmˈpendɪəm/",
        "partOfSpeech": "n.",
        "chinese": "简要，概略",
        "example": ""
      },
      {
        "id": "word-39-58",
        "english": "responsible*",
        "phonetic": "/rɪˈspɔnsəbl/",
        "partOfSpeech": "a.",
        "chinese": "有责任感的；可靠的",
        "example": ""
      },
      {
        "id": "word-39-61",
        "english": "corridor",
        "phonetic": "/ˈkɔrɪdɔː(r)/",
        "partOfSpeech": "n.",
        "chinese": "过道，走廊",
        "example": ""
      },
      {
        "id": "word-39-29",
        "english": "navigation",
        "phonetic": "[ˌnævɪˈgeɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "航空，航海，航行；导航，领航",
        "example": ""
      },
      {
        "id": "word-39-51",
        "english": "heir",
        "phonetic": "/eə(r)/",
        "partOfSpeech": "n.",
        "chinese": "继承人",
        "example": ""
      },
      {
        "id": "word-40-17",
        "english": "colossal",
        "phonetic": "/kəˈlɔsl/",
        "partOfSpeech": "a.",
        "chinese": "巨大的，庞大的",
        "example": ""
      },
      {
        "id": "word-40-39",
        "english": "collaboration",
        "phonetic": "[kəˌlæbəˈreɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "合作，协作；勾结，通敌",
        "example": ""
      },
      {
        "id": "word-40-70",
        "english": "townscape*",
        "phonetic": "[ˈtaʊnskeɪp]",
        "partOfSpeech": "n.",
        "chinese": "市镇风光",
        "example": ""
      },
      {
        "id": "word-40-56",
        "english": "circle*",
        "phonetic": "/ˈsɜːkl/",
        "partOfSpeech": "n.",
        "chinese": "圆；圈，环状物；圈子，阶层；周期，循环 v. 圈出；盘旋，环绕……移动",
        "example": ""
      },
      {
        "id": "word-39-34",
        "english": "peripheral",
        "phonetic": "[pəˈrɪfərəl]",
        "partOfSpeech": "a.",
        "chinese": "外围的；次要的，附带的 n. 外围设备",
        "example": ""
      },
      {
        "id": "word-39-38",
        "english": "decompression",
        "phonetic": "[ˌdi:kəmˈpreʃn]",
        "partOfSpeech": "n.",
        "chinese": "减压；减压室",
        "example": ""
      },
      {
        "id": "word-40-65",
        "english": "principle",
        "phonetic": "/ˈprɪnsəpl/",
        "partOfSpeech": "n.",
        "chinese": "原则，原理；规范，准则；基本信念，信条",
        "example": ""
      },
      {
        "id": "word-39-30",
        "english": "entwine",
        "phonetic": "/ɪnˈtwaɪn/",
        "partOfSpeech": "vt.",
        "chinese": "使缠住，使盘绕",
        "example": ""
      },
      {
        "id": "word-39-45",
        "english": "calm",
        "phonetic": "/kɑːm/",
        "partOfSpeech": "a.",
        "chinese": "镇静的；平静的 v. （使）平静，（使）镇静",
        "example": ""
      },
      {
        "id": "word-39-70",
        "english": "steer",
        "phonetic": "/stɪə(r)/",
        "partOfSpeech": "v.",
        "chinese": "引导；驾驶",
        "example": ""
      },
      {
        "id": "word-40-46",
        "english": "glove*",
        "phonetic": "/glʌv/",
        "partOfSpeech": "n.",
        "chinese": "手套",
        "example": ""
      },
      {
        "id": "word-40-42",
        "english": "weaken*",
        "phonetic": "['wi:kən]",
        "partOfSpeech": "v.",
        "chinese": "（使）变弱，（使）减弱",
        "example": ""
      },
      {
        "id": "word-40-22",
        "english": "cognition",
        "phonetic": "/kɔgˈnɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "感知，认知；认识力",
        "example": ""
      },
      {
        "id": "word-40-60",
        "english": "excellent*",
        "phonetic": "/ˈeksələnt/",
        "partOfSpeech": "a.",
        "chinese": "极好的；杰出的",
        "example": ""
      },
      {
        "id": "word-40-34",
        "english": "slash",
        "phonetic": "/slæʃ/",
        "partOfSpeech": "n.",
        "chinese": "砍痕，伤痕；斜线号 v. 砍；大幅度消减",
        "example": ""
      },
      {
        "id": "word-40-10",
        "english": "healing",
        "phonetic": "['hi:lɪŋ]",
        "partOfSpeech": "n.",
        "chinese": "康复，复原 a. 有治疗作用的",
        "example": ""
      },
      {
        "id": "word-40-7",
        "english": "enormous*",
        "phonetic": "/ɪˈnɔːməs/",
        "partOfSpeech": "a.",
        "chinese": "巨大的，庞大的，极大的",
        "example": ""
      },
      {
        "id": "word-40-2",
        "english": "mime*",
        "phonetic": "/maɪm/",
        "partOfSpeech": "v.",
        "chinese": "模拟，模仿 n. 哑剧表演；哑剧演员",
        "example": ""
      },
      {
        "id": "word-40-5",
        "english": "explode",
        "phonetic": "/ɪkˈspləud/",
        "partOfSpeech": "v.",
        "chinese": "（使）爆炸；爆发；激增",
        "example": ""
      },
      {
        "id": "word-40-4",
        "english": "likelihood",
        "phonetic": "[ˈlaɪklihʊd]",
        "partOfSpeech": "n.",
        "chinese": "可能；可能性",
        "example": ""
      },
      {
        "id": "word-40-68",
        "english": "scorching",
        "phonetic": "[ˈskɔ:tʃɪŋ]",
        "partOfSpeech": "a.",
        "chinese": "酷热的；激烈的",
        "example": ""
      },
      {
        "id": "word-40-29",
        "english": "fascinating",
        "phonetic": "[ˈfæsɪneɪtɪŋ]",
        "partOfSpeech": "a.",
        "chinese": "迷人的",
        "example": ""
      },
      {
        "id": "word-40-21",
        "english": "scrutiny",
        "phonetic": "/ˈskruːtɪnɪ/",
        "partOfSpeech": "n.",
        "chinese": "详细检查，细看；监视",
        "example": ""
      },
      {
        "id": "word-39-40",
        "english": "twist*",
        "phonetic": "/twɪst/",
        "partOfSpeech": "v.",
        "chinese": "缠绕；捻；扭曲，弯曲 n. 弯曲",
        "example": ""
      },
      {
        "id": "word-40-3",
        "english": "impose",
        "phonetic": "/ɪmˈpəuz/",
        "partOfSpeech": "v.",
        "chinese": "把……强加于；征（税等）；处以（罚款、监禁等）",
        "example": ""
      },
      {
        "id": "word-40-47",
        "english": "beehive*",
        "phonetic": "[ˈbi:haɪv]",
        "partOfSpeech": "n.",
        "chinese": "蜂窝；蜂箱",
        "example": ""
      },
      {
        "id": "word-40-19",
        "english": "coordinate",
        "phonetic": "[kəʊ'ɔ:dɪneɪt]",
        "partOfSpeech": "v.",
        "chinese": "调整，协调 {kəuˈɔːdɪnət} n. 同等者，同等物 a. 同等的，并列的",
        "example": ""
      },
      {
        "id": "word-40-74",
        "english": "approach*",
        "phonetic": "/əˈprəutʃ/",
        "partOfSpeech": "v.",
        "chinese": "靠近，接近；来临 n. 靠近，接近；方法，途径",
        "example": ""
      },
      {
        "id": "word-40-72",
        "english": "innocent",
        "phonetic": "/ˈɪnəsnt/",
        "partOfSpeech": "a.",
        "chinese": "清白的；无害的；天真的",
        "example": ""
      }
    ],
    "article": "In the field of Health and Medicine, researchers have been studying various phenomena to understand their implications. The concept of large-scale* has been widely discussed in recent studies. The concept of sucker has been widely discussed in recent studies. The concept of estimate* has been widely discussed in recent studies. The concept of eject has been widely discussed in recent studies. The concept of exploit* has been widely discussed in recent studies. The concept of censure* has been widely discussed in recent studies. The concept of competition* has been widely discussed in recent studies. The concept of applaud has been widely discussed in recent studies. The concept of metro* has been widely discussed in recent studies. The concept of counterproductive has been widely discussed in recent studies. Researchers have found that these factors play a significant role in shaping our understanding of the subject. Further studies are needed to explore the full implications of these findings."
  },
  {
    "id": "unit-21",
    "name": "Unit 21: Word Lists 41 & 42",
    "words": [
      {
        "id": "word-42-39",
        "english": "magma",
        "phonetic": "/ˈmægmə/",
        "partOfSpeech": "n.",
        "chinese": "岩浆",
        "example": ""
      },
      {
        "id": "word-42-32",
        "english": "adverse",
        "phonetic": "/ˈædvɜːs/",
        "partOfSpeech": "a.",
        "chinese": "不利的，有害的",
        "example": ""
      },
      {
        "id": "word-42-45",
        "english": "fieldwork*",
        "phonetic": "[ˈfi:ldwɜ:k]",
        "partOfSpeech": "n.",
        "chinese": "实地调查，野外考察",
        "example": ""
      },
      {
        "id": "word-42-14",
        "english": "demerit*",
        "phonetic": "/diːˈmerɪt/",
        "partOfSpeech": "n.",
        "chinese": "过失；缺点，短处",
        "example": ""
      },
      {
        "id": "word-42-38",
        "english": "petroleum",
        "phonetic": "/pəˈtrəulɪəm/",
        "partOfSpeech": "n.",
        "chinese": "石油",
        "example": ""
      },
      {
        "id": "word-42-33",
        "english": "finale*",
        "phonetic": "/fɪˈnɑːlɪ/",
        "partOfSpeech": "n.",
        "chinese": "（音乐的）终曲；终场",
        "example": ""
      },
      {
        "id": "word-42-44",
        "english": "component*",
        "phonetic": "/kəmˈpəunənt/",
        "partOfSpeech": "n.",
        "chinese": "成分；零部件 a. 构成的，组成的",
        "example": ""
      },
      {
        "id": "word-42-28",
        "english": "noticeable*",
        "phonetic": "[ˈnəʊtɪsəbl]",
        "partOfSpeech": "a.",
        "chinese": "显而易见的；明显的",
        "example": ""
      },
      {
        "id": "word-42-37",
        "english": "corps*",
        "phonetic": "/kɔː(r)/",
        "partOfSpeech": "n.",
        "chinese": "部队；军团",
        "example": ""
      },
      {
        "id": "word-42-36",
        "english": "module",
        "phonetic": "/ˈmɔdjuːl/",
        "partOfSpeech": "n.",
        "chinese": "模块；模式；（航空器中的）舱；组件；单元",
        "example": ""
      },
      {
        "id": "word-42-71",
        "english": "sinister*",
        "phonetic": "/ˈsɪnɪstə(r)/",
        "partOfSpeech": "a.",
        "chinese": "不吉祥的，凶兆的；险恶的，邪恶的",
        "example": ""
      },
      {
        "id": "word-42-58",
        "english": "violence",
        "phonetic": "[ˈvaɪələns]",
        "partOfSpeech": "n.",
        "chinese": "暴力行为；激烈，猛烈",
        "example": ""
      },
      {
        "id": "word-42-19",
        "english": "fluctuation*",
        "phonetic": "[ˌflʌktʃʊ'eɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "波动，起伏；动摇",
        "example": ""
      },
      {
        "id": "word-42-62",
        "english": "scream*",
        "phonetic": "/skriːm/",
        "partOfSpeech": "v.",
        "chinese": "尖叫 n. 尖叫声",
        "example": ""
      },
      {
        "id": "word-42-53",
        "english": "implement",
        "phonetic": "/ˈɪmplɪment/",
        "partOfSpeech": "vt.",
        "chinese": "使生效，实施；贯彻，执行 /ˈɪmplɪmənt/ n. 工具",
        "example": ""
      },
      {
        "id": "word-42-70",
        "english": "hum",
        "phonetic": "/hʌm/",
        "partOfSpeech": "n.",
        "chinese": "嗡嗡声，嘈杂声 vi. 哼曲子；发嗡嗡声",
        "example": ""
      },
      {
        "id": "word-42-18",
        "english": "expiry*",
        "phonetic": "/ɪkˈspaɪərɪ/",
        "partOfSpeech": "n.",
        "chinese": "满期，终结",
        "example": ""
      },
      {
        "id": "word-42-7",
        "english": "militant*",
        "phonetic": "/ˈmɪlɪtənt/",
        "partOfSpeech": "a.",
        "chinese": "好战的，好斗的；激进的 n. 好斗的人，激进分子",
        "example": ""
      },
      {
        "id": "word-42-48",
        "english": "strap*",
        "phonetic": "/stræp/",
        "partOfSpeech": "n.",
        "chinese": "带子 vt. 捆扎；（用绷带）包扎",
        "example": ""
      },
      {
        "id": "word-42-51",
        "english": "intensity",
        "phonetic": "[ɪn'tensətɪ]",
        "partOfSpeech": "n.",
        "chinese": "强烈，剧烈；强度",
        "example": ""
      },
      {
        "id": "word-42-55",
        "english": "cervical*",
        "phonetic": "[ˈsɜ:vɪkl]",
        "partOfSpeech": "a.",
        "chinese": "子宫颈；颈部的",
        "example": ""
      },
      {
        "id": "word-42-1",
        "english": "incorporate",
        "phonetic": "/ɪnˈkɔːpəreɪt/",
        "partOfSpeech": "vt.",
        "chinese": "把……合并，纳入；包含，吸收",
        "example": ""
      },
      {
        "id": "word-42-26",
        "english": "marginally*",
        "phonetic": "[ˈmɑ:dʒɪnəli]",
        "partOfSpeech": "ad.",
        "chinese": "稍微，些微",
        "example": ""
      },
      {
        "id": "word-41-21",
        "english": "addiction*",
        "phonetic": "[əˈdɪkʃn]",
        "partOfSpeech": "n.",
        "chinese": "瘾；沉溺",
        "example": ""
      },
      {
        "id": "word-42-65",
        "english": "analogous*",
        "phonetic": "/əˈnæləgəs/",
        "partOfSpeech": "a.",
        "chinese": "类似的",
        "example": ""
      },
      {
        "id": "word-41-12",
        "english": "deterioration",
        "phonetic": "[dɪˌtɪərɪə'reɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "恶化；堕落",
        "example": ""
      },
      {
        "id": "word-41-1",
        "english": "keen",
        "phonetic": "/kiːn/",
        "partOfSpeech": "a.",
        "chinese": "热衷的，热心的，渴望的；敏锐的，敏捷的；激烈的，紧张的；锋利的",
        "example": ""
      },
      {
        "id": "word-41-19",
        "english": "certify",
        "phonetic": "/ˈsɜːtɪfaɪ/",
        "partOfSpeech": "vt.",
        "chinese": "证明，保证",
        "example": ""
      },
      {
        "id": "word-41-10",
        "english": "unconcerned*",
        "phonetic": "/ˏʌnkənˈsɜːnd/",
        "partOfSpeech": "a.",
        "chinese": "漠不关心的；不烦恼的",
        "example": ""
      },
      {
        "id": "word-42-29",
        "english": "optic*",
        "phonetic": "/ˈɔptɪk/",
        "partOfSpeech": "a.",
        "chinese": "眼的，视觉的；光学的 n. 光学仪器",
        "example": ""
      },
      {
        "id": "word-41-22",
        "english": "allege*",
        "phonetic": "/əˈledʒ/",
        "partOfSpeech": "vt.",
        "chinese": "断言，宣称",
        "example": ""
      },
      {
        "id": "word-41-45",
        "english": "band*",
        "phonetic": "/bænd/",
        "partOfSpeech": "n.",
        "chinese": "乐队；群，伙；带，箍；条纹；波段，频带 vt. 用带绑扎",
        "example": ""
      },
      {
        "id": "word-41-27",
        "english": "baffle*",
        "phonetic": "/ˈbæfl/",
        "partOfSpeech": "vt.",
        "chinese": "使困惑，难倒 n. 挡板，隔板",
        "example": ""
      },
      {
        "id": "word-42-72",
        "english": "refinement",
        "phonetic": "/rɪˈfaɪnmənt/",
        "partOfSpeech": "n.",
        "chinese": "精巧的附件，精制的改良品；精炼；文雅",
        "example": ""
      },
      {
        "id": "word-41-67",
        "english": "undoubtedly",
        "phonetic": "[ʌn'daʊtɪdlɪ]",
        "partOfSpeech": "ad.",
        "chinese": "毋庸置疑地，确凿地",
        "example": ""
      },
      {
        "id": "word-41-16",
        "english": "cumulative",
        "phonetic": "['kju:mjələtɪv]",
        "partOfSpeech": "a.",
        "chinese": "积累的，渐增的",
        "example": ""
      },
      {
        "id": "word-42-31",
        "english": "long-term*",
        "phonetic": "[lɒŋ",
        "partOfSpeech": "",
        "chinese": "tɜ:m] a. 长期的",
        "example": ""
      },
      {
        "id": "word-42-20",
        "english": "frequency*",
        "phonetic": "/ˈfriːkwənsɪ/",
        "partOfSpeech": "n.",
        "chinese": "频繁；频率",
        "example": ""
      },
      {
        "id": "word-41-11",
        "english": "suspect",
        "phonetic": "/səˈspekt/",
        "partOfSpeech": "v.",
        "chinese": "猜想，怀疑",
        "example": ""
      },
      {
        "id": "word-42-54",
        "english": "isle",
        "phonetic": "/aɪl/",
        "partOfSpeech": "n.",
        "chinese": "小岛，岛",
        "example": ""
      },
      {
        "id": "word-41-49",
        "english": "predispose*",
        "phonetic": "/ˏpriːdɪˈspəuz/",
        "partOfSpeech": "v.",
        "chinese": "事先（在某方面）影响某人；偏爱；（使）易受感染（或患病）",
        "example": ""
      },
      {
        "id": "word-41-72",
        "english": "identification",
        "phonetic": "[aɪˌdentɪfɪˈkeɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "身份证明；识别，鉴定",
        "example": ""
      },
      {
        "id": "word-41-53",
        "english": "occur",
        "phonetic": "/əˈkɜː(r)/",
        "partOfSpeech": "vi.",
        "chinese": "发生；存在",
        "example": ""
      },
      {
        "id": "word-42-59",
        "english": "revolve",
        "phonetic": "/rɪˈvɔlv/",
        "partOfSpeech": "v.",
        "chinese": "（使）旋转",
        "example": ""
      },
      {
        "id": "word-42-60",
        "english": "vegetarian",
        "phonetic": "[ˌvedʒə'teərɪən]",
        "partOfSpeech": "n.",
        "chinese": "素食者 a. 素食者的",
        "example": ""
      },
      {
        "id": "word-41-2",
        "english": "worm",
        "phonetic": "/wɜːm/",
        "partOfSpeech": "n.",
        "chinese": "虫，蠕虫；蜗杆，螺纹",
        "example": ""
      },
      {
        "id": "word-41-24",
        "english": "ascend*",
        "phonetic": "/əˈsend/",
        "partOfSpeech": "v.",
        "chinese": "攀登；上升，升高",
        "example": ""
      },
      {
        "id": "word-41-3",
        "english": "stiff",
        "phonetic": "/stɪf/",
        "partOfSpeech": "a.",
        "chinese": "硬的，僵硬的 ad. 极其，非常",
        "example": ""
      },
      {
        "id": "word-41-55",
        "english": "stark*",
        "phonetic": "/stɑːk/",
        "partOfSpeech": "a.",
        "chinese": "光秃秃的，赤裸的；荒凉的；完全的",
        "example": ""
      },
      {
        "id": "word-41-38",
        "english": "bin*",
        "phonetic": "/bɪn/",
        "partOfSpeech": "n.",
        "chinese": "大箱子；仓",
        "example": ""
      },
      {
        "id": "word-42-56",
        "english": "plot",
        "phonetic": "/plɔt/",
        "partOfSpeech": "n.",
        "chinese": "情节；阴谋；小块土地",
        "example": ""
      },
      {
        "id": "word-41-33",
        "english": "impact*",
        "phonetic": "/ˈɪmpækt/",
        "partOfSpeech": "n.",
        "chinese": "影响，作用；冲击",
        "example": ""
      },
      {
        "id": "word-42-5",
        "english": "frank",
        "phonetic": "/fræŋk/",
        "partOfSpeech": "a.",
        "chinese": "坦白的，直率的",
        "example": ""
      },
      {
        "id": "word-42-21",
        "english": "hamlet*",
        "phonetic": "/ˈhæmlɪt/",
        "partOfSpeech": "n.",
        "chinese": "小村庄",
        "example": ""
      },
      {
        "id": "word-42-66",
        "english": "cookery*",
        "phonetic": "/ˈkukərɪ/",
        "partOfSpeech": "n.",
        "chinese": "烹调法",
        "example": ""
      },
      {
        "id": "word-41-42",
        "english": "desperate*",
        "phonetic": "/ˈdespərət/",
        "partOfSpeech": "a.",
        "chinese": "绝望的；拼命的，不顾一切的；极度渴望的；危急的",
        "example": ""
      },
      {
        "id": "word-41-44",
        "english": "gear",
        "phonetic": "/gɪə(r)/",
        "partOfSpeech": "n.",
        "chinese": "齿轮，传动装置，（排）挡；（从事某项活动所需的）用具、设备、衣服等 vt. 调节，调整，使适应",
        "example": ""
      },
      {
        "id": "word-42-40",
        "english": "stylish*",
        "phonetic": "[ˈstaɪlɪʃ]",
        "partOfSpeech": "a.",
        "chinese": "时髦的；漂亮的",
        "example": ""
      },
      {
        "id": "word-41-15",
        "english": "transcend",
        "phonetic": "/trænˈsend/",
        "partOfSpeech": "vt.",
        "chinese": "超越，胜过，优于",
        "example": ""
      },
      {
        "id": "word-41-56",
        "english": "inform*",
        "phonetic": "/ɪnˈfɔːm/",
        "partOfSpeech": "v.",
        "chinese": "通知；向……报告",
        "example": ""
      },
      {
        "id": "word-41-46",
        "english": "breed",
        "phonetic": "/briːd/",
        "partOfSpeech": "v.",
        "chinese": "饲养，养殖，繁殖；养育，培育；酿成，招致 n. 种，品种",
        "example": ""
      },
      {
        "id": "word-41-13",
        "english": "triple",
        "phonetic": "/ˈtrɪpl/",
        "partOfSpeech": "a.",
        "chinese": "三部分的；三倍的 v. （使）增至三倍",
        "example": ""
      },
      {
        "id": "word-41-50",
        "english": "display*",
        "phonetic": "/dɪˈspleɪ/",
        "partOfSpeech": "vt./n.",
        "chinese": "陈列，展览；显示，表现",
        "example": ""
      },
      {
        "id": "word-42-11",
        "english": "conduce*",
        "phonetic": "/kənˈdjuːs/",
        "partOfSpeech": "v.",
        "chinese": "有益于，有助于；导致",
        "example": ""
      },
      {
        "id": "word-42-42",
        "english": "debris",
        "phonetic": "/ˈdeɪbriː/",
        "partOfSpeech": "n.",
        "chinese": "碎屑，残骸；[地质] 岩屑",
        "example": ""
      },
      {
        "id": "word-42-43",
        "english": "irony*",
        "phonetic": "/ˈaɪərənɪ/",
        "partOfSpeech": "n.",
        "chinese": "反话，讽刺；出人意料的事情",
        "example": ""
      },
      {
        "id": "word-42-52",
        "english": "notable*",
        "phonetic": "/ˈnəutəbl/",
        "partOfSpeech": "a.",
        "chinese": "值得注意的；显著的，杰出的，显赫的 n. 名人，要人",
        "example": ""
      },
      {
        "id": "word-41-4",
        "english": "timber",
        "phonetic": "/ˈtɪmbə(r)/",
        "partOfSpeech": "n.",
        "chinese": "木材，木料；栋木，大梁",
        "example": ""
      },
      {
        "id": "word-42-24",
        "english": "keystone*",
        "phonetic": "['ki:stəʊn]",
        "partOfSpeech": "n.",
        "chinese": "拱顶石；（计划，论据等的）基础，主旨",
        "example": ""
      },
      {
        "id": "word-41-76",
        "english": "fake",
        "phonetic": "/feɪk/",
        "partOfSpeech": "a.",
        "chinese": "假的 n. 假货；骗子 v. 伪装",
        "example": ""
      },
      {
        "id": "word-41-5",
        "english": "profound",
        "phonetic": "/prəˈfaund/",
        "partOfSpeech": "a.",
        "chinese": "深切的，深远的；知识渊博的，见解深刻的，深奥的",
        "example": ""
      },
      {
        "id": "word-41-39",
        "english": "evoke",
        "phonetic": "/ɪˈvəuk/",
        "partOfSpeech": "vt.",
        "chinese": "唤起",
        "example": ""
      },
      {
        "id": "word-42-57",
        "english": "acquaint",
        "phonetic": "/əˈkweɪnt/",
        "partOfSpeech": "vt.",
        "chinese": "（使）认识；（使）熟悉",
        "example": ""
      },
      {
        "id": "word-42-50",
        "english": "conclusion*",
        "phonetic": "/kənˈkluːʒn/",
        "partOfSpeech": "n.",
        "chinese": "结论，推论；结束，结尾；[法] 缔结，认定",
        "example": ""
      },
      {
        "id": "word-41-37",
        "english": "subsoil*",
        "phonetic": "/ˈsʌbsɔɪl/",
        "partOfSpeech": "n.",
        "chinese": "底土，下层土",
        "example": ""
      },
      {
        "id": "word-42-34",
        "english": "astonish",
        "phonetic": "/əˈstɔnɪʃ/",
        "partOfSpeech": "vt.",
        "chinese": "使惊讶，使吃惊",
        "example": ""
      },
      {
        "id": "word-41-36",
        "english": "defeat*",
        "phonetic": "/dɪˈfiːt/",
        "partOfSpeech": "n./vt.",
        "chinese": "击败；挫败；战败",
        "example": ""
      },
      {
        "id": "word-42-68",
        "english": "aggressive*",
        "phonetic": "/əˈgresɪv/",
        "partOfSpeech": "a.",
        "chinese": "侵犯的，侵略的；挑衅的；有进取心的，有冲劲的",
        "example": ""
      },
      {
        "id": "word-41-68",
        "english": "avalanche",
        "phonetic": "/ˈævəlɑːnʃ/",
        "partOfSpeech": "n./v.",
        "chinese": "雪崩",
        "example": ""
      },
      {
        "id": "word-42-49",
        "english": "fundamental",
        "phonetic": "/ˏfʌndəˈmentl/",
        "partOfSpeech": "a.",
        "chinese": "基础的，基本的 n. [pl.] 基本原理",
        "example": ""
      },
      {
        "id": "word-41-14",
        "english": "condemn",
        "phonetic": "/kənˈdem/",
        "partOfSpeech": "vt.",
        "chinese": "声讨，极力谴责；给……判刑",
        "example": ""
      },
      {
        "id": "word-41-52",
        "english": "enlarge",
        "phonetic": "/ɪnˈlɑːdʒ/",
        "partOfSpeech": "v.",
        "chinese": "扩大，放大，扩充",
        "example": ""
      },
      {
        "id": "word-42-67",
        "english": "high-tech*",
        "phonetic": "[haɪ",
        "partOfSpeech": "",
        "chinese": "tek] n. 高科技",
        "example": ""
      },
      {
        "id": "word-41-40",
        "english": "flutter",
        "phonetic": "/ˈflʌtə(r)/",
        "partOfSpeech": "v.",
        "chinese": "振（翅），拍打（翅膀）；飘动，晃动；（快速而不规则地）跳动",
        "example": ""
      },
      {
        "id": "word-41-18",
        "english": "adobe",
        "phonetic": "/əˈdəubɪ/",
        "partOfSpeech": "n.",
        "chinese": "土坯，泥砖",
        "example": ""
      },
      {
        "id": "word-41-62",
        "english": "evolution",
        "phonetic": "/ˏiːvəˈluːʃn/",
        "partOfSpeech": "n.",
        "chinese": "进展；进化",
        "example": ""
      },
      {
        "id": "word-41-31",
        "english": "celestial*",
        "phonetic": "[səˈlestiəl]",
        "partOfSpeech": "a.",
        "chinese": "天体的，天上的",
        "example": ""
      },
      {
        "id": "word-41-59",
        "english": "deadline*",
        "phonetic": "/ˈdedlaɪn/",
        "partOfSpeech": "n.",
        "chinese": "最后期限",
        "example": ""
      },
      {
        "id": "word-42-41",
        "english": "dump*",
        "phonetic": "/dʌmp/",
        "partOfSpeech": "vt.",
        "chinese": "倾卸，倾倒 n. 垃圾场",
        "example": ""
      },
      {
        "id": "word-42-64",
        "english": "interior*",
        "phonetic": "/ɪnˈtɪərɪə(r)/",
        "partOfSpeech": "a.",
        "chinese": "内部的，里面的 n. 内部；内地",
        "example": ""
      },
      {
        "id": "word-41-34",
        "english": "renew*",
        "phonetic": "/rɪˈnjuː/",
        "partOfSpeech": "v.",
        "chinese": "重新开始；恢复；更换，更新；续借",
        "example": ""
      },
      {
        "id": "word-41-51",
        "english": "retire*",
        "phonetic": "/rɪˈtaɪə(r)/",
        "partOfSpeech": "v.",
        "chinese": "退休；引退，退隐，撤退",
        "example": ""
      },
      {
        "id": "word-42-30",
        "english": "outweigh*",
        "phonetic": "/ˏautˈweɪ/",
        "partOfSpeech": "vt.",
        "chinese": "比……重；（在重要性、影响上）比……更重要；胜过，强于",
        "example": ""
      },
      {
        "id": "word-41-29",
        "english": "biodiversity",
        "phonetic": "[ˌbaɪəʊdaɪˈvɜ:səti]",
        "partOfSpeech": "n.",
        "chinese": "生物多样性",
        "example": ""
      },
      {
        "id": "word-42-46",
        "english": "contaminate",
        "phonetic": "/kənˈtæmɪneɪt/",
        "partOfSpeech": "vt.",
        "chinese": "污染",
        "example": ""
      },
      {
        "id": "word-42-10",
        "english": "dystrophy*",
        "phonetic": "/ˈdɪstrəfɪ/",
        "partOfSpeech": "n.",
        "chinese": "营养障碍；营养不良",
        "example": ""
      },
      {
        "id": "word-41-64",
        "english": "beverage*",
        "phonetic": "/ˈbevərɪdʒ/",
        "partOfSpeech": "n.",
        "chinese": "饮料",
        "example": ""
      },
      {
        "id": "word-41-60",
        "english": "limb",
        "phonetic": "/lɪm/",
        "partOfSpeech": "n.",
        "chinese": "肢，臂；树枝",
        "example": ""
      },
      {
        "id": "word-41-6",
        "english": "journalist",
        "phonetic": "[ˈdʒɜ:nəlɪst]",
        "partOfSpeech": "n.",
        "chinese": "新闻工作者，新闻记者",
        "example": ""
      },
      {
        "id": "word-42-3",
        "english": "convey*",
        "phonetic": "/kənˈveɪ/",
        "partOfSpeech": "vt.",
        "chinese": "传送，运送；表达，传递",
        "example": ""
      },
      {
        "id": "word-41-7",
        "english": "permission*",
        "phonetic": "/pəˈmɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "允许，准许",
        "example": ""
      },
      {
        "id": "word-41-54",
        "english": "relate",
        "phonetic": "/rɪˈleɪt/",
        "partOfSpeech": "v.",
        "chinese": "有关联；讲述，叙述",
        "example": ""
      },
      {
        "id": "word-41-28",
        "english": "bewilder*",
        "phonetic": "/bɪˈwɪldə(r)/",
        "partOfSpeech": "vt.",
        "chinese": "使迷惑，使昏乱",
        "example": ""
      },
      {
        "id": "word-41-47",
        "english": "intelligible",
        "phonetic": "/ɪnˈtelɪdʒəbl/",
        "partOfSpeech": "a.",
        "chinese": "可理解的，明白易懂的，清楚的",
        "example": ""
      },
      {
        "id": "word-41-41",
        "english": "front-line*",
        "phonetic": "[f'rʌntl'aɪn]",
        "partOfSpeech": "a.",
        "chinese": "前线的；第一线的",
        "example": ""
      },
      {
        "id": "word-42-69",
        "english": "process*",
        "phonetic": "/ˈprəuses/",
        "partOfSpeech": "n.",
        "chinese": "过程；步骤，程序 vt. 加工；处理；办理",
        "example": ""
      },
      {
        "id": "word-41-17",
        "english": "horizontal",
        "phonetic": "/ˏhɔrɪˈzɔntl/",
        "partOfSpeech": "a.",
        "chinese": "地平线的，水平的",
        "example": ""
      },
      {
        "id": "word-41-32",
        "english": "combination*",
        "phonetic": "/ˏkɔmbɪˈneɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "结合（体），联合（体）；化合",
        "example": ""
      },
      {
        "id": "word-41-75",
        "english": "abuse*",
        "phonetic": "/əˈbjuːs/",
        "partOfSpeech": "n.",
        "chinese": "滥用，妄用；虐待，伤害；辱骂，毁谤 /əˈbjuːz/ v. 滥用，妄用；虐待，伤害；辱骂，毁谤",
        "example": ""
      },
      {
        "id": "word-41-23",
        "english": "amphibious*",
        "phonetic": "/æmˈfɪbɪəs/",
        "partOfSpeech": "a.",
        "chinese": "两栖的；水陆两用的",
        "example": ""
      },
      {
        "id": "word-41-30",
        "english": "bud*",
        "phonetic": "/bʌd/",
        "partOfSpeech": "n.",
        "chinese": "花蕾；叶芽 v. 发芽，萌芽",
        "example": ""
      },
      {
        "id": "word-41-43",
        "english": "wheelchair",
        "phonetic": "[ˈwi:ltʃeə(r)]",
        "partOfSpeech": "n.",
        "chinese": "（病人等用的）轮椅",
        "example": ""
      },
      {
        "id": "word-41-69",
        "english": "alienation*",
        "phonetic": "[ˌeɪlɪə'neɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "疏远；离间",
        "example": ""
      },
      {
        "id": "word-42-63",
        "english": "steep*",
        "phonetic": "/stiːp/",
        "partOfSpeech": "a.",
        "chinese": "陡峭的；（价格等）过高的；急剧的",
        "example": ""
      },
      {
        "id": "word-42-35",
        "english": "charge*",
        "phonetic": "/tʃɑːdʒ/",
        "partOfSpeech": "n.",
        "chinese": "价钱，费用；管理；照管；掌管；控告，指控；电荷，电量 v. 索取（金额），要价；控告，指控；委以；指示；（使）充电",
        "example": ""
      },
      {
        "id": "word-41-26",
        "english": "assure*",
        "phonetic": "[əˈʃʊə(r)]",
        "partOfSpeech": "vt.",
        "chinese": "使确信，使确保；保证，向……保证",
        "example": ""
      },
      {
        "id": "word-42-23",
        "english": "inadequate*",
        "phonetic": "/ɪnˈædɪkwət/",
        "partOfSpeech": "a.",
        "chinese": "不充分的；不适当的",
        "example": ""
      },
      {
        "id": "word-41-8",
        "english": "labour*",
        "phonetic": "/ˈleɪbə(r)/",
        "partOfSpeech": "n.",
        "chinese": "劳动；劳动力，工人 v. 劳动；努力",
        "example": ""
      },
      {
        "id": "word-42-47",
        "english": "applicant",
        "phonetic": "/ˈæplɪkənt/",
        "partOfSpeech": "n.",
        "chinese": "申请人",
        "example": ""
      },
      {
        "id": "word-41-74",
        "english": "classical*",
        "phonetic": "/ˈklæsɪkl/",
        "partOfSpeech": "a.",
        "chinese": "古典的；传统的；经典的",
        "example": ""
      },
      {
        "id": "word-41-20",
        "english": "arousal",
        "phonetic": "[ə'raʊzl]",
        "partOfSpeech": "n.",
        "chinese": "唤起，激起",
        "example": ""
      },
      {
        "id": "word-41-61",
        "english": "sphere*",
        "phonetic": "/sfɪə(r)/",
        "partOfSpeech": "n.",
        "chinese": "球（体）；范围，领域",
        "example": ""
      },
      {
        "id": "word-41-71",
        "english": "transmit*",
        "phonetic": "[træns'mɪt]",
        "partOfSpeech": "v.",
        "chinese": "传送；传染；发射",
        "example": ""
      },
      {
        "id": "word-41-73",
        "english": "wander",
        "phonetic": "/ˈwɔndə(r)/",
        "partOfSpeech": "v.",
        "chinese": "徘徊，闲逛，漫步；偏离正道；走神，（神情）恍惚",
        "example": ""
      },
      {
        "id": "word-42-61",
        "english": "ratio",
        "phonetic": "/ˈreɪʃɪəu/",
        "partOfSpeech": "n.",
        "chinese": "比，比率",
        "example": ""
      },
      {
        "id": "word-42-2",
        "english": "trace",
        "phonetic": "/treɪs/",
        "partOfSpeech": "vt.",
        "chinese": "追踪，追查；追溯；描摹，标出 n. 痕迹；微量",
        "example": ""
      },
      {
        "id": "word-41-57",
        "english": "halt*",
        "phonetic": "/hɔːlt/",
        "partOfSpeech": "v.",
        "chinese": "暂停；踌躇；停住 n. 暂停",
        "example": ""
      },
      {
        "id": "word-41-35",
        "english": "bow*",
        "phonetic": "/bau/",
        "partOfSpeech": "v.",
        "chinese": "低下（头）；弯腰，鞠躬 /bəu/ n. 弓",
        "example": ""
      },
      {
        "id": "word-41-58",
        "english": "nerve",
        "phonetic": "/nɜːv/",
        "partOfSpeech": "n.",
        "chinese": "神经；勇敢",
        "example": ""
      },
      {
        "id": "word-41-9",
        "english": "quota",
        "phonetic": "/ˈkwəutə/",
        "partOfSpeech": "n.",
        "chinese": "定额，限额，配额",
        "example": ""
      },
      {
        "id": "word-42-13",
        "english": "contaminate*",
        "phonetic": "/kənˈtæmɪneɪt/",
        "partOfSpeech": "n.",
        "chinese": "致污物，污染物",
        "example": ""
      },
      {
        "id": "word-41-65",
        "english": "influenza*",
        "phonetic": "/ˏɪnfluˈenzə/",
        "partOfSpeech": "n.",
        "chinese": "流行性感冒",
        "example": ""
      },
      {
        "id": "word-42-27",
        "english": "moderately*",
        "phonetic": "[ˈmɒdərətli]",
        "partOfSpeech": "ad.",
        "chinese": "适度地，不过分地，有节制地",
        "example": ""
      },
      {
        "id": "word-41-70",
        "english": "accumulate",
        "phonetic": "[əˈkju:mjəleɪt]",
        "partOfSpeech": "v.",
        "chinese": "积累；堆积",
        "example": ""
      },
      {
        "id": "word-42-17",
        "english": "enjoyable*",
        "phonetic": "[ɪnˈdʒɔɪəbl]",
        "partOfSpeech": "a.",
        "chinese": "令人愉快的，使人快乐的",
        "example": ""
      },
      {
        "id": "word-42-25",
        "english": "manifest*",
        "phonetic": "/ˈmænɪfest/",
        "partOfSpeech": "a.",
        "chinese": "明显的 vt. 表明，显示 n. 货物清单",
        "example": ""
      },
      {
        "id": "word-42-15",
        "english": "denomination*",
        "phonetic": "/dɪˏnɔmɪˈneɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "命名；（货币等的）单位；宗教派别",
        "example": ""
      },
      {
        "id": "word-41-25",
        "english": "assert*",
        "phonetic": "/əˈsɜːt/",
        "partOfSpeech": "v.",
        "chinese": "断言，声称；坚持",
        "example": ""
      },
      {
        "id": "word-42-4",
        "english": "boundary",
        "phonetic": "/ˈbaundrɪ/",
        "partOfSpeech": "n.",
        "chinese": "分界线；边界",
        "example": ""
      },
      {
        "id": "word-42-12",
        "english": "consulate*",
        "phonetic": "[ˈkɒnsjələt]",
        "partOfSpeech": "n.",
        "chinese": "领事馆；领事职位，领事任期",
        "example": ""
      },
      {
        "id": "word-42-16",
        "english": "disturbance*",
        "phonetic": "/dɪˈstɜːbəns/",
        "partOfSpeech": "n.",
        "chinese": "扰乱，打扰；骚乱，混乱；心神不安，烦恼",
        "example": ""
      },
      {
        "id": "word-41-48",
        "english": "essence",
        "phonetic": "/ˈesns/",
        "partOfSpeech": "n.",
        "chinese": "本质；精髓",
        "example": ""
      },
      {
        "id": "word-41-63",
        "english": "suitable",
        "phonetic": "/ˈsuːtəbl/",
        "partOfSpeech": "a.",
        "chinese": "适当的，相配的；合适的，适宜的",
        "example": ""
      },
      {
        "id": "word-42-22",
        "english": "hence*",
        "phonetic": "/hens/",
        "partOfSpeech": "ad.",
        "chinese": "因此，所以；今后，从此",
        "example": ""
      },
      {
        "id": "word-42-9",
        "english": "refresh",
        "phonetic": "/rɪˈfreʃ/",
        "partOfSpeech": "v.",
        "chinese": "（使）复原，更新；（使）精神振作，（使）精力恢复",
        "example": ""
      },
      {
        "id": "word-41-66",
        "english": "criminal",
        "phonetic": "[ˈkrɪmɪnl]",
        "partOfSpeech": "a.",
        "chinese": "犯罪的；刑事的 n. 罪犯",
        "example": ""
      },
      {
        "id": "word-42-6",
        "english": "bonus",
        "phonetic": "/ˈbəunəs/",
        "partOfSpeech": "n.",
        "chinese": "资金，红利；好处",
        "example": ""
      },
      {
        "id": "word-42-8",
        "english": "starve*",
        "phonetic": "/stɑːv/",
        "partOfSpeech": "v.",
        "chinese": "（使）挨饿；（使）饿死",
        "example": ""
      }
    ],
    "article": "In the field of Social Issues, researchers have been studying various phenomena to understand their implications. The concept of magma has been widely discussed in recent studies. The concept of adverse has been widely discussed in recent studies. The concept of fieldwork* has been widely discussed in recent studies. The concept of demerit* has been widely discussed in recent studies. The concept of petroleum has been widely discussed in recent studies. The concept of finale* has been widely discussed in recent studies. The concept of component* has been widely discussed in recent studies. The concept of noticeable* has been widely discussed in recent studies. The concept of corps* has been widely discussed in recent studies. The concept of module has been widely discussed in recent studies. Researchers have found that these factors play a significant role in shaping our understanding of the subject. Further studies are needed to explore the full implications of these findings."
  },
  {
    "id": "unit-22",
    "name": "Unit 22: Word Lists 43 & 44",
    "words": [
      {
        "id": "word-43-23",
        "english": "slide*",
        "phonetic": "/slaɪd/",
        "partOfSpeech": "v.",
        "chinese": "滑动，下滑；（使）悄悄地移动 n. 滑动，下滑；滑坡，滑道，滑面；幻灯片；（土、泥等的）突然崩落",
        "example": ""
      },
      {
        "id": "word-44-7",
        "english": "convert",
        "phonetic": "/kənˈvɜːt/",
        "partOfSpeech": "v.",
        "chinese": "（使）改变信仰，皈依；（使）转变，（使）转化；改装",
        "example": ""
      },
      {
        "id": "word-43-70",
        "english": "proof*",
        "phonetic": "/pruːf/",
        "partOfSpeech": "n.",
        "chinese": "证据，证明；校样，样张 a. 能防……的，耐……的",
        "example": ""
      },
      {
        "id": "word-43-7",
        "english": "compensate",
        "phonetic": "/ˈkɔmpenseɪt/",
        "partOfSpeech": "v.",
        "chinese": "补偿，赔偿；弥补",
        "example": ""
      },
      {
        "id": "word-43-37",
        "english": "unconquerable*",
        "phonetic": "[ʌnˈkɒŋkərəbl]",
        "partOfSpeech": "a.",
        "chinese": "不可征服的",
        "example": ""
      },
      {
        "id": "word-43-4",
        "english": "photocopy*",
        "phonetic": "/ˈfəutəukɔpɪ/",
        "partOfSpeech": "v.",
        "chinese": "影印，复印 n. 影印本，复印本",
        "example": ""
      },
      {
        "id": "word-43-1",
        "english": "solidarity",
        "phonetic": "/ˏsɔlɪˈdærətɪ/",
        "partOfSpeech": "n.",
        "chinese": "团结，一致",
        "example": ""
      },
      {
        "id": "word-43-13",
        "english": "pathway*",
        "phonetic": "[ˈpɑ:θweɪ]",
        "partOfSpeech": "n.",
        "chinese": "路径，途径",
        "example": ""
      },
      {
        "id": "word-43-2",
        "english": "outline",
        "phonetic": "/ˈautlaɪn/",
        "partOfSpeech": "n.",
        "chinese": "提纲；梗概；轮廓；草图 vt. 概述；列提纲",
        "example": ""
      },
      {
        "id": "word-43-30",
        "english": "understandable*",
        "phonetic": "[ˌʌndəˈstændəbl]",
        "partOfSpeech": "a.",
        "chinese": "可以理解的，能懂的；可同情的",
        "example": ""
      },
      {
        "id": "word-43-6",
        "english": "dean",
        "phonetic": "/diːn/",
        "partOfSpeech": "n.",
        "chinese": "（基督教的）教长；（大学的）院长、系主任",
        "example": ""
      },
      {
        "id": "word-43-48",
        "english": "equipment",
        "phonetic": "[ɪˈkwɪpmənt]",
        "partOfSpeech": "n.",
        "chinese": "设备，装备",
        "example": ""
      },
      {
        "id": "word-43-18",
        "english": "renewal*",
        "phonetic": "[rɪˈnju:əl]",
        "partOfSpeech": "n.",
        "chinese": "更新，恢复；重新开始；重建；复兴；续期；重申",
        "example": ""
      },
      {
        "id": "word-43-15",
        "english": "recognition*",
        "phonetic": "/ˏrekəgˈnɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "识别；认出；承认，确认，认可；赏识，表彰",
        "example": ""
      },
      {
        "id": "word-43-46",
        "english": "pamphlet",
        "phonetic": "[ˈpæmflət]",
        "partOfSpeech": "n.",
        "chinese": "小册子",
        "example": ""
      },
      {
        "id": "word-43-73",
        "english": "maritime",
        "phonetic": "/ˈmærɪtaɪm/",
        "partOfSpeech": "n.",
        "chinese": "海的，海事的；海运的",
        "example": ""
      },
      {
        "id": "word-43-19",
        "english": "requisition*",
        "phonetic": "/ˏrekwɪˈzɪʃn/",
        "partOfSpeech": "n./vt.",
        "chinese": "正式要求；征用",
        "example": ""
      },
      {
        "id": "word-43-11",
        "english": "overestimate*",
        "phonetic": "/ˏəuvərˈestɪmeɪt/",
        "partOfSpeech": "vt.",
        "chinese": "对……估计过高 {ˏəuvərˈestɪmət} n. 过高的估计",
        "example": ""
      },
      {
        "id": "word-43-76",
        "english": "concession",
        "phonetic": "/kənˈseʃn/",
        "partOfSpeech": "n.",
        "chinese": "让步，迁就；特许权；承认，认可",
        "example": ""
      },
      {
        "id": "word-43-36",
        "english": "captive*",
        "phonetic": "/ˈkæptɪv/",
        "partOfSpeech": "a.",
        "chinese": "被抓住的，被捕获的；受控制的；受垄断的 n. 被抓住的人或动物",
        "example": ""
      },
      {
        "id": "word-43-22",
        "english": "sack*",
        "phonetic": "/sæk/",
        "partOfSpeech": "n.",
        "chinese": "麻袋，粗布袋；解雇；劫掠 vt. 解雇；劫掠",
        "example": ""
      },
      {
        "id": "word-43-43",
        "english": "mission",
        "phonetic": "/ˈmɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "使命，任务；代表团，使团；传教，布道",
        "example": ""
      },
      {
        "id": "word-43-42",
        "english": "residence",
        "phonetic": "/ˈrezɪdəns/",
        "partOfSpeech": "n.",
        "chinese": "住宅，住处；居住",
        "example": ""
      },
      {
        "id": "word-43-59",
        "english": "performance*",
        "phonetic": "/pəˈfɔːməns/",
        "partOfSpeech": "n.",
        "chinese": "演出，表演；履行，执行；功能，性能表现",
        "example": ""
      },
      {
        "id": "word-43-61",
        "english": "insulate",
        "phonetic": "/ˈɪnsjuleɪt/",
        "partOfSpeech": "vt.",
        "chinese": "使绝缘，使隔热，使隔音；隔离；使隔绝（以免受到影响）",
        "example": ""
      },
      {
        "id": "word-43-41",
        "english": "presentation*",
        "phonetic": "/ˏpreznˈteɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "赠送；赠品，礼物；授予，提供；显示；引荐，介绍；报告；表演，上演",
        "example": ""
      },
      {
        "id": "word-43-39",
        "english": "neutral",
        "phonetic": "/ˈnjuːtrəl/",
        "partOfSpeech": "a.",
        "chinese": "中立的；无明显特性的",
        "example": ""
      },
      {
        "id": "word-44-43",
        "english": "tube*",
        "phonetic": "/tjuːb/",
        "partOfSpeech": "n.",
        "chinese": "管道，试管；<英> 地铁",
        "example": ""
      },
      {
        "id": "word-43-60",
        "english": "handicapped",
        "phonetic": "[ˈhændikæpt]",
        "partOfSpeech": "a.",
        "chinese": "残废的，有生理缺陷的",
        "example": ""
      },
      {
        "id": "word-43-14",
        "english": "perplex*",
        "phonetic": "/pəˈpleks/",
        "partOfSpeech": "vt.",
        "chinese": "使困惑；使复杂化",
        "example": ""
      },
      {
        "id": "word-44-17",
        "english": "leather",
        "phonetic": "/ˈleðə(r)/",
        "partOfSpeech": "n.",
        "chinese": "皮革，皮革制品",
        "example": ""
      },
      {
        "id": "word-44-31",
        "english": "hospitable*",
        "phonetic": "/hɔˈspɪtəbl/",
        "partOfSpeech": "a.",
        "chinese": "好客的，殷勤的，热情友好的；（气候、环境）宜人的；（对新思想等）易接受的，开通的",
        "example": ""
      },
      {
        "id": "word-43-9",
        "english": "tanker",
        "phonetic": "[ˈtæŋkə(r)]",
        "partOfSpeech": "n.",
        "chinese": "油轮；油罐车；加油飞机",
        "example": ""
      },
      {
        "id": "word-44-41",
        "english": "continuity",
        "phonetic": "/ˏkɔntɪˈnjuːətɪ/",
        "partOfSpeech": "n.",
        "chinese": "连续（性）；持续（性）",
        "example": ""
      },
      {
        "id": "word-43-12",
        "english": "overview*",
        "phonetic": "/ˈəuvəvjuː/",
        "partOfSpeech": "n.",
        "chinese": "综览，概述",
        "example": ""
      },
      {
        "id": "word-44-25",
        "english": "dot*",
        "phonetic": "/dɔt/",
        "partOfSpeech": "n.",
        "chinese": "点，小圆点 v. 打点于；散布于，点缀",
        "example": ""
      },
      {
        "id": "word-43-64",
        "english": "decorate*",
        "phonetic": "/ˈdekəreɪt/",
        "partOfSpeech": "v.",
        "chinese": "装饰，装潢，布置；授勋",
        "example": ""
      },
      {
        "id": "word-44-59",
        "english": "repay",
        "phonetic": "/rɪˈpeɪ/",
        "partOfSpeech": "v.",
        "chinese": "归还（款项）；报答",
        "example": ""
      },
      {
        "id": "word-43-63",
        "english": "detrimental*",
        "phonetic": "[ˌdetrɪˈmentl]",
        "partOfSpeech": "a.",
        "chinese": "不利的，有害的",
        "example": ""
      },
      {
        "id": "word-44-76",
        "english": "neglect",
        "phonetic": "/nɪˈglekt/",
        "partOfSpeech": "n./vt.",
        "chinese": "忽视；疏忽；遗漏",
        "example": ""
      },
      {
        "id": "word-44-11",
        "english": "tariff",
        "phonetic": "/ˈtærɪf/",
        "partOfSpeech": "n.",
        "chinese": "关税，税率；（旅馆、饭店等的）价目表",
        "example": ""
      },
      {
        "id": "word-43-3",
        "english": "blank*",
        "phonetic": "/blæŋk/",
        "partOfSpeech": "a.",
        "chinese": "空白的",
        "example": ""
      },
      {
        "id": "word-43-51",
        "english": "spacecraft",
        "phonetic": "[ˈspeɪskrɑ:ft]",
        "partOfSpeech": "n.",
        "chinese": "航天器，宇宙飞船",
        "example": ""
      },
      {
        "id": "word-44-8",
        "english": "grasp",
        "phonetic": "/grɑːsp/",
        "partOfSpeech": "vt.",
        "chinese": "抓紧；掌握，全面理解 n. 抓住；支配；理解",
        "example": ""
      },
      {
        "id": "word-44-37",
        "english": "substance*",
        "phonetic": "/ˈsʌbstəns/",
        "partOfSpeech": "n.",
        "chinese": "物质；实质",
        "example": ""
      },
      {
        "id": "word-43-16",
        "english": "reconstruction*",
        "phonetic": "[ˌri:kən'strʌkʃn]",
        "partOfSpeech": "n.",
        "chinese": "重建；再现",
        "example": ""
      },
      {
        "id": "word-44-52",
        "english": "rectangle*",
        "phonetic": "/ˈrektæŋgl/",
        "partOfSpeech": "n.",
        "chinese": "长方形，矩形",
        "example": ""
      },
      {
        "id": "word-43-21",
        "english": "resolve*",
        "phonetic": "/rɪˈzɔlv/",
        "partOfSpeech": "v.",
        "chinese": "解决，解答；决定，决意；分解，分析 n. 决心，决意",
        "example": ""
      },
      {
        "id": "word-43-38",
        "english": "respect*",
        "phonetic": "/rɪˈspekt/",
        "partOfSpeech": "vt.",
        "chinese": "尊敬 n. 尊敬；方面",
        "example": ""
      },
      {
        "id": "word-43-40",
        "english": "campus*",
        "phonetic": "/ˈkæmpəs/",
        "partOfSpeech": "n.",
        "chinese": "校园",
        "example": ""
      },
      {
        "id": "word-44-29",
        "english": "hang*",
        "phonetic": "/hæŋ/",
        "partOfSpeech": "v.",
        "chinese": "悬挂，吊，垂下；吊死，绞死",
        "example": ""
      },
      {
        "id": "word-43-45",
        "english": "emit*",
        "phonetic": "/ɪˈmɪt/",
        "partOfSpeech": "vt.",
        "chinese": "发出（光、热、声音等），射出，散发，排放",
        "example": ""
      },
      {
        "id": "word-44-36",
        "english": "hostel*",
        "phonetic": "/ˈhɔstl/",
        "partOfSpeech": "n.",
        "chinese": "（青年）招待所；学生宿舍",
        "example": ""
      },
      {
        "id": "word-44-51",
        "english": "punch*",
        "phonetic": "/pʌntʃ/",
        "partOfSpeech": "v.",
        "chinese": "穿孔，打孔；重击，猛击 n. 猛击；冲床；穿孔机；力量；效力",
        "example": ""
      },
      {
        "id": "word-44-50",
        "english": "pedestrian*",
        "phonetic": "[pəˈdestriən]",
        "partOfSpeech": "n.",
        "chinese": "行人 a. 徒步的；缺乏想象力的",
        "example": ""
      },
      {
        "id": "word-44-38",
        "english": "refectory*",
        "phonetic": "/rɪˈfektrɪ/",
        "partOfSpeech": "n.",
        "chinese": "（学院）餐厅，食堂",
        "example": ""
      },
      {
        "id": "word-44-10",
        "english": "object*",
        "phonetic": "/ˈɔbdʒɪkt/",
        "partOfSpeech": "n.",
        "chinese": "物体；对象；目标；宾语 /əbˈdʒekt/ v. 反对，不赞成",
        "example": ""
      },
      {
        "id": "word-44-49",
        "english": "introvert*",
        "phonetic": "/ˈɪntrəvɜːt/",
        "partOfSpeech": "n.",
        "chinese": "性格内向的人",
        "example": ""
      },
      {
        "id": "word-44-23",
        "english": "autobiography*",
        "phonetic": "/ˏɔːtəbaɪˈɔgrəfɪ/",
        "partOfSpeech": "n.",
        "chinese": "自传",
        "example": ""
      },
      {
        "id": "word-44-24",
        "english": "browse*",
        "phonetic": "/brauz/",
        "partOfSpeech": "v.",
        "chinese": "吃嫩叶或草；浏览 n. 嫩叶，嫩芽；吃草；浏览",
        "example": ""
      },
      {
        "id": "word-44-40",
        "english": "contemporary",
        "phonetic": "{kənˈtempərərɪ}",
        "partOfSpeech": "a.",
        "chinese": "当代的；同时代的 n. 同代人",
        "example": ""
      },
      {
        "id": "word-43-34",
        "english": "plus",
        "phonetic": "/plʌs/",
        "partOfSpeech": "prep.",
        "chinese": "加上；和，以及 n. 加号；正号 a. 比所示数量多的",
        "example": ""
      },
      {
        "id": "word-43-29",
        "english": "underestimate*",
        "phonetic": "/ˏʌndərˈestɪmeɪt/",
        "partOfSpeech": "vt.",
        "chinese": "低估 /ˏʌndərˈestɪmət/ n. 低估",
        "example": ""
      },
      {
        "id": "word-44-58",
        "english": "random",
        "phonetic": "/ˈrændəm/",
        "partOfSpeech": "a.",
        "chinese": "任意的，随机的，随意的 n. 随机，随意",
        "example": ""
      },
      {
        "id": "word-44-27",
        "english": "extrovert*",
        "phonetic": "/ˈekstrəvɜːt/",
        "partOfSpeech": "n.",
        "chinese": "性格外向的人；爱交际的人",
        "example": ""
      },
      {
        "id": "word-43-27",
        "english": "transportation*",
        "phonetic": "[ˌtrænspɔ:ˈteɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "运输，运输系统，运输工具",
        "example": ""
      },
      {
        "id": "word-44-68",
        "english": "helicopter*",
        "phonetic": "/ˈhelɪkɔptə(r)/",
        "partOfSpeech": "n.",
        "chinese": "直升飞机",
        "example": ""
      },
      {
        "id": "word-44-48",
        "english": "inspire*",
        "phonetic": "/ɪnˈspaɪə(r)/",
        "partOfSpeech": "vt.",
        "chinese": "鼓舞，激起；给……以灵感",
        "example": ""
      },
      {
        "id": "word-44-14",
        "english": "connection",
        "phonetic": "/kəˈnekʃn/",
        "partOfSpeech": "n.",
        "chinese": "连接；关系",
        "example": ""
      },
      {
        "id": "word-43-26",
        "english": "tickle*",
        "phonetic": "/ˈtɪkl/",
        "partOfSpeech": "v.",
        "chinese": "（使）发痒；使高兴，逗乐 n. 痒",
        "example": ""
      },
      {
        "id": "word-44-33",
        "english": "influential*",
        "phonetic": "/ˏɪnfluˈenʃl/",
        "partOfSpeech": "a.",
        "chinese": "有影响力的；有权势的",
        "example": ""
      },
      {
        "id": "word-43-17",
        "english": "render*",
        "phonetic": "/ˈrendə(r)/",
        "partOfSpeech": "vt.",
        "chinese": "使得，致使；给予，以……回报；提供；呈报，递交；表达；表演；翻译",
        "example": ""
      },
      {
        "id": "word-44-20",
        "english": "wretch*",
        "phonetic": "/retʃ/",
        "partOfSpeech": "n.",
        "chinese": "不幸的人",
        "example": ""
      },
      {
        "id": "word-43-10",
        "english": "capture*",
        "phonetic": "/ˈkæptʃə(r)/",
        "partOfSpeech": "vt.",
        "chinese": "捕获，俘获；夺取或赢得 n. 捕获；战利品",
        "example": ""
      },
      {
        "id": "word-44-35",
        "english": "inscribe*",
        "phonetic": "/ɪnˈskraɪb/",
        "partOfSpeech": "v.",
        "chinese": "（在某物上）写、题、铭刻；牢记，铭记",
        "example": ""
      },
      {
        "id": "word-43-8",
        "english": "chest*",
        "phonetic": "/tʃest/",
        "partOfSpeech": "n.",
        "chinese": "胸；金库，资金",
        "example": ""
      },
      {
        "id": "word-44-3",
        "english": "relevant*",
        "phonetic": "/ˈreləvənt/",
        "partOfSpeech": "a.",
        "chinese": "有关的，相应的；适当的，中肯的；有重大意义的",
        "example": ""
      },
      {
        "id": "word-44-16",
        "english": "unprejudiced*",
        "phonetic": "[ʌnˈpredʒədɪst]",
        "partOfSpeech": "a.",
        "chinese": "无偏见的；公正的",
        "example": ""
      },
      {
        "id": "word-43-62",
        "english": "household",
        "phonetic": "/ˈhaushəuld/",
        "partOfSpeech": "n.",
        "chinese": "家庭，户，全家人 a. 家庭的，家用的，普通的；家喻户晓的",
        "example": ""
      },
      {
        "id": "word-44-21",
        "english": "acceptable*",
        "phonetic": "/əkˈseptəbl/",
        "partOfSpeech": "a.",
        "chinese": "可接受的",
        "example": ""
      },
      {
        "id": "word-43-20",
        "english": "reserved*",
        "phonetic": "/rɪˈzɜːvd/",
        "partOfSpeech": "a.",
        "chinese": "说话不多的，内向的；有所保留的，预订的",
        "example": ""
      },
      {
        "id": "word-44-1",
        "english": "whisper",
        "phonetic": "/ˈwɪspə(r)/",
        "partOfSpeech": "n./v.",
        "chinese": "低语",
        "example": ""
      },
      {
        "id": "word-44-53",
        "english": "relative*",
        "phonetic": "/ˈrelətɪv/",
        "partOfSpeech": "a.",
        "chinese": "相对的；比较的；有关的，相关的 n. 亲属，亲戚",
        "example": ""
      },
      {
        "id": "word-44-77",
        "english": "drought*",
        "phonetic": "/draut/",
        "partOfSpeech": "n.",
        "chinese": "干旱，旱灾",
        "example": ""
      },
      {
        "id": "word-43-35",
        "english": "recycle*",
        "phonetic": "/ˏriːˈsaɪkl/",
        "partOfSpeech": "v.",
        "chinese": "回收利用",
        "example": ""
      },
      {
        "id": "word-44-18",
        "english": "unregistered*",
        "phonetic": "['ʌn'redʒɪstəd]",
        "partOfSpeech": "a.",
        "chinese": "未注册的",
        "example": ""
      },
      {
        "id": "word-44-6",
        "english": "disregard",
        "phonetic": "/ˏdɪsrɪˈgɑːd/",
        "partOfSpeech": "vt.",
        "chinese": "不理会，漠视 n. 忽视，漠视",
        "example": ""
      },
      {
        "id": "word-43-67",
        "english": "interfere*",
        "phonetic": "/ˏɪntəˈfɪə(r)/",
        "partOfSpeech": "vi.",
        "chinese": "干涉，干扰，妨碍",
        "example": ""
      },
      {
        "id": "word-44-63",
        "english": "humour",
        "phonetic": "/ˈhjuːmə(r)/",
        "partOfSpeech": "n.",
        "chinese": "幽默，幽默感",
        "example": ""
      },
      {
        "id": "word-44-66",
        "english": "handout",
        "phonetic": "[ˈhændaʊt]",
        "partOfSpeech": "n.",
        "chinese": "传单，分发的印刷品；救济品",
        "example": ""
      },
      {
        "id": "word-44-80",
        "english": "indication",
        "phonetic": "[ˌɪndɪˈkeɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "指示，象征",
        "example": ""
      },
      {
        "id": "word-44-69",
        "english": "sprawl*",
        "phonetic": "/sprɔːl/",
        "partOfSpeech": "n.",
        "chinese": "四肢伸开的姿势或动作；（城市的）无计划发展 v. 伸开四肢坐、卧或倒下；杂乱无序地延伸",
        "example": ""
      },
      {
        "id": "word-44-61",
        "english": "firm*",
        "phonetic": "/fɜːm/",
        "partOfSpeech": "n.",
        "chinese": "公司 a. 坚实的，稳固的，坚定的",
        "example": ""
      },
      {
        "id": "word-44-60",
        "english": "vacuum",
        "phonetic": "/ˈvækjuəm/",
        "partOfSpeech": "n.",
        "chinese": "真空； [pl.] 真空吸尘器 v. 用吸尘器清扫",
        "example": ""
      },
      {
        "id": "word-44-47",
        "english": "vibrate",
        "phonetic": "/vaɪˈbreɪt/",
        "partOfSpeech": "v.",
        "chinese": "（使）颤动",
        "example": ""
      },
      {
        "id": "word-43-5",
        "english": "accessory*",
        "phonetic": "/əkˈsesərɪ/",
        "partOfSpeech": "n.",
        "chinese": "附件，零件； [常pl.] （尤指女性的）服装搭配物，装饰品；[律] 同谋，帮凶",
        "example": ""
      },
      {
        "id": "word-44-46",
        "english": "damage*",
        "phonetic": "/ˈdæmɪdʒ/",
        "partOfSpeech": "n.",
        "chinese": "损害；[pl.] 损害赔偿（金） vt. 损害",
        "example": ""
      },
      {
        "id": "word-44-72",
        "english": "ideal",
        "phonetic": "/aɪˈdɪəl/",
        "partOfSpeech": "a.",
        "chinese": "理想的，完美的；理想主义的；空想的；唯心的 n. 理想；理想的东西（或人）",
        "example": ""
      },
      {
        "id": "word-44-67",
        "english": "endure",
        "phonetic": "/ɪnˈdjuə(r)/",
        "partOfSpeech": "v.",
        "chinese": "忍受；持久，持续",
        "example": ""
      },
      {
        "id": "word-44-22",
        "english": "antique*",
        "phonetic": "/ænˈtiːk/",
        "partOfSpeech": "a.",
        "chinese": "古时的，古老的 n. 古物，古董",
        "example": ""
      },
      {
        "id": "word-44-42",
        "english": "advantage*",
        "phonetic": "/ədˈvɑːntɪdʒ/",
        "partOfSpeech": "n.",
        "chinese": "优点；优势",
        "example": ""
      },
      {
        "id": "word-44-4",
        "english": "unrealistic*",
        "phonetic": "[ˌʌnrɪəˈlɪstɪk]",
        "partOfSpeech": "a.",
        "chinese": "不现实的，不切实际的",
        "example": ""
      },
      {
        "id": "word-43-33",
        "english": "undertake",
        "phonetic": "/ˏʌndəˈteɪk/",
        "partOfSpeech": "v.",
        "chinese": "承担（某事物），负起（某事物的）责任；同意或答应做某事",
        "example": ""
      },
      {
        "id": "word-44-78",
        "english": "hug",
        "phonetic": "/hʌg/",
        "partOfSpeech": "n./v.",
        "chinese": "（热烈的/地）拥抱",
        "example": ""
      },
      {
        "id": "word-44-5",
        "english": "enfranchise*",
        "phonetic": "/ɪnˈfræntʃaɪz/",
        "partOfSpeech": "vt.",
        "chinese": "给予……政治权利（尤指选举权）；解放（奴隶）",
        "example": ""
      },
      {
        "id": "word-43-25",
        "english": "surface*",
        "phonetic": "/ˈsɜːfɪs/",
        "partOfSpeech": "n.",
        "chinese": "表面；外表，外观 v. 浮出水面；浮现，显露；在……上加表面",
        "example": ""
      },
      {
        "id": "word-44-9",
        "english": "wealthy*",
        "phonetic": "['welθɪ]",
        "partOfSpeech": "a.",
        "chinese": "富的，富裕的；充裕的",
        "example": ""
      },
      {
        "id": "word-43-52",
        "english": "consequence*",
        "phonetic": "/ˈkɔnsɪkwəns/",
        "partOfSpeech": "n.",
        "chinese": "[常pl.] 结果，影响；重要意义",
        "example": ""
      },
      {
        "id": "word-44-32",
        "english": "inflate*",
        "phonetic": "/ɪnˈfleɪt/",
        "partOfSpeech": "v.",
        "chinese": "使充气，使膨胀；使得意，使骄傲；抬高（物价），使（通货）膨胀",
        "example": ""
      },
      {
        "id": "word-44-15",
        "english": "airtight*",
        "phonetic": "[ˈeətaɪt]",
        "partOfSpeech": "a.",
        "chinese": "密闭的；无懈可击的",
        "example": ""
      },
      {
        "id": "word-43-44",
        "english": "content*",
        "phonetic": "/ˈkɔntent/",
        "partOfSpeech": "n.",
        "chinese": "内容；满意 /kənˈtent/ vt. 使满意 a. 满意的",
        "example": ""
      },
      {
        "id": "word-43-54",
        "english": "current*",
        "phonetic": "/ˈkʌrənt/",
        "partOfSpeech": "a.",
        "chinese": "流通的；流动的；现行的，当前的 n. （水、气等的）流动；电流；潮流",
        "example": ""
      },
      {
        "id": "word-44-19",
        "english": "versus*",
        "phonetic": "/ˈvɜːsəs/",
        "partOfSpeech": "prep.",
        "chinese": "与……相对，对抗",
        "example": ""
      },
      {
        "id": "word-44-28",
        "english": "favourite*",
        "phonetic": "/ˈfeɪvərɪt/",
        "partOfSpeech": "a.",
        "chinese": "特别喜欢的，宠爱的 n. 特别喜欢的人或物；亲信",
        "example": ""
      },
      {
        "id": "word-44-56",
        "english": "religion",
        "phonetic": "/rɪˈlɪdʒən/",
        "partOfSpeech": "n.",
        "chinese": "宗教；宗教信仰",
        "example": ""
      },
      {
        "id": "word-44-2",
        "english": "grant*",
        "phonetic": "/græɑːnt/",
        "partOfSpeech": "n.",
        "chinese": "授予物；补助金，助学金，津贴；授权 v. 同意，承认；给予，授予",
        "example": ""
      },
      {
        "id": "word-43-32",
        "english": "differ",
        "phonetic": "/ˈdɪfə(r)/",
        "partOfSpeech": "vi.",
        "chinese": "不同，相异；（在意见方面）发生分歧",
        "example": ""
      },
      {
        "id": "word-44-71",
        "english": "knob",
        "phonetic": "/nɔb/",
        "partOfSpeech": "n.",
        "chinese": "球形把手；（机器等）旋钮",
        "example": ""
      },
      {
        "id": "word-44-81",
        "english": "insert",
        "phonetic": "/ɪnˈsɜːt/",
        "partOfSpeech": "v.",
        "chinese": "插入，嵌入",
        "example": ""
      },
      {
        "id": "word-43-24",
        "english": "slump*",
        "phonetic": "/slʌmp/",
        "partOfSpeech": "vi.",
        "chinese": "大幅度下降，暴跌；突然倒下，猛然落下 n. 萧条期；低潮状态",
        "example": ""
      },
      {
        "id": "word-44-12",
        "english": "defendant",
        "phonetic": "/dɪˈfendənt/",
        "partOfSpeech": "n.",
        "chinese": "被告 a. 处于被告地位的；为自己辩护的",
        "example": ""
      },
      {
        "id": "word-43-65",
        "english": "nationality",
        "phonetic": "/ˏnæʃəˈnælətɪ/",
        "partOfSpeech": "n.",
        "chinese": "国籍；民族",
        "example": ""
      },
      {
        "id": "word-43-28",
        "english": "unanimous*",
        "phonetic": "/juːˈnænɪməs/",
        "partOfSpeech": "a.",
        "chinese": "一致同意的；一致通过的",
        "example": ""
      },
      {
        "id": "word-44-44",
        "english": "beneficial",
        "phonetic": "/ˏbenɪˈfɪʃl/",
        "partOfSpeech": "a.",
        "chinese": "有利的，有益的",
        "example": ""
      },
      {
        "id": "word-43-56",
        "english": "elevate",
        "phonetic": "/ˈelɪveɪt/",
        "partOfSpeech": "vt.",
        "chinese": "提升……的职位；举起；使更有修养",
        "example": ""
      },
      {
        "id": "word-43-49",
        "english": "hamster*",
        "phonetic": "/ˈhæmstə(r)/",
        "partOfSpeech": "n.",
        "chinese": "仓鼠",
        "example": ""
      },
      {
        "id": "word-44-39",
        "english": "fuse",
        "phonetic": "/fjuːz/",
        "partOfSpeech": "n.",
        "chinese": "保险丝 v. 因保险丝烧断而断电；熔合；熔化",
        "example": ""
      },
      {
        "id": "word-43-57",
        "english": "loan*",
        "phonetic": "/ləun/",
        "partOfSpeech": "n./vt.",
        "chinese": "贷款，借",
        "example": ""
      },
      {
        "id": "word-43-50",
        "english": "sensible*",
        "phonetic": "/ˈsensəbl/",
        "partOfSpeech": "a.",
        "chinese": "明智的；合情理的；能觉察到的",
        "example": ""
      },
      {
        "id": "word-44-30",
        "english": "harmony*",
        "phonetic": "/ˈhɑːmənɪ/",
        "partOfSpeech": "n.",
        "chinese": "相符，一致；和谐，融洽；[音] 和声",
        "example": ""
      },
      {
        "id": "word-43-31",
        "english": "transcribe*",
        "phonetic": "/trænˈskraɪb/",
        "partOfSpeech": "vt.",
        "chinese": "抄写，誊写；打印；转录",
        "example": ""
      },
      {
        "id": "word-44-34",
        "english": "insane*",
        "phonetic": "/ɪnˈseɪn/",
        "partOfSpeech": "a.",
        "chinese": "蠢极的，荒唐的；（患）精神病的，精神失常的，疯狂的",
        "example": ""
      },
      {
        "id": "word-44-26",
        "english": "emotional*",
        "phonetic": "[ɪˈməʊʃənl]",
        "partOfSpeech": "a.",
        "chinese": "感情（上）的，情绪（上）的；引起情感的，表示情感的；情绪激动的，易动感情的",
        "example": ""
      },
      {
        "id": "word-43-68",
        "english": "signal",
        "phonetic": "/ˈsɪgnəl/",
        "partOfSpeech": "n.",
        "chinese": "信号；暗号；标志 v.（向……）发信号；标志着",
        "example": ""
      },
      {
        "id": "word-44-45",
        "english": "inhibit",
        "phonetic": "/ɪnˈhɪbɪt/",
        "partOfSpeech": "v.",
        "chinese": "抑制，约束；起抑制作用",
        "example": ""
      },
      {
        "id": "word-43-75",
        "english": "therapy",
        "phonetic": "/ˈθerəpɪ/",
        "partOfSpeech": "n.",
        "chinese": "治疗，疗法",
        "example": ""
      },
      {
        "id": "word-43-55",
        "english": "inversion*",
        "phonetic": "/ɪnˈvɜːʃn/",
        "partOfSpeech": "n.",
        "chinese": "倒置，颠倒",
        "example": ""
      },
      {
        "id": "word-43-74",
        "english": "formula*",
        "phonetic": "/ˈfɔːmjulə/",
        "partOfSpeech": "n.",
        "chinese": "公式；配方；准则",
        "example": ""
      },
      {
        "id": "word-44-13",
        "english": "bankruptcy",
        "phonetic": "[ˈbæŋkrʌptsi]",
        "partOfSpeech": "n.",
        "chinese": "破产；彻底失败",
        "example": ""
      },
      {
        "id": "word-43-66",
        "english": "fleet*",
        "phonetic": "/fliːt/",
        "partOfSpeech": "n.",
        "chinese": "舰队，船队 a. 快速的，敏捷的 v. 疾驰，飞逝，掠过",
        "example": ""
      },
      {
        "id": "word-44-75",
        "english": "fluctuate",
        "phonetic": "/ˈflʌktʃueɪt/",
        "partOfSpeech": "v.",
        "chinese": "（使）涨落，（使）起伏；（使）变化",
        "example": ""
      },
      {
        "id": "word-43-47",
        "english": "assurance",
        "phonetic": "[əˈʃʊərəns]",
        "partOfSpeech": "n.",
        "chinese": "信心；保证；保险",
        "example": ""
      },
      {
        "id": "word-44-62",
        "english": "digital",
        "phonetic": "[ˈdɪdʒɪtl]",
        "partOfSpeech": "a.",
        "chinese": "数码的，数字的",
        "example": ""
      },
      {
        "id": "word-44-57",
        "english": "demographic",
        "phonetic": "[ˌdemə'ɡræfɪk]",
        "partOfSpeech": "a.",
        "chinese": "人口统计学的；人口的",
        "example": ""
      },
      {
        "id": "word-43-69",
        "english": "rescue*",
        "phonetic": "/ˈreskjuː/",
        "partOfSpeech": "n./vt.",
        "chinese": "营救，救援",
        "example": ""
      },
      {
        "id": "word-44-74",
        "english": "midst",
        "phonetic": "/mɪdst/",
        "partOfSpeech": "n.",
        "chinese": "中间",
        "example": ""
      },
      {
        "id": "word-43-72",
        "english": "log",
        "phonetic": "/lɔg/",
        "partOfSpeech": "n.",
        "chinese": "原木；航海或飞行日志 vt. 记录",
        "example": ""
      },
      {
        "id": "word-43-53",
        "english": "efficient*",
        "phonetic": "/ɪˈfɪʃnt/",
        "partOfSpeech": "a.",
        "chinese": "有效的，效率高的；有能力的，能胜任的",
        "example": ""
      },
      {
        "id": "word-44-64",
        "english": "global*",
        "phonetic": "/ˈgləubl/",
        "partOfSpeech": "a.",
        "chinese": "全球的，全世界的；整体的，全面的",
        "example": ""
      },
      {
        "id": "word-44-79",
        "english": "variability*",
        "phonetic": "[ˌveəriəˈbɪləti]",
        "partOfSpeech": "n.",
        "chinese": "可变性，易变性",
        "example": ""
      },
      {
        "id": "word-44-70",
        "english": "crowded*",
        "phonetic": "[ˈkraʊdɪd]",
        "partOfSpeech": "a.",
        "chinese": "拥挤的；塞满的",
        "example": ""
      },
      {
        "id": "word-43-71",
        "english": "afflict*",
        "phonetic": "/əˈflɪkt/",
        "partOfSpeech": "vt.",
        "chinese": "使苦恼；折磨",
        "example": ""
      },
      {
        "id": "word-44-73",
        "english": "in",
        "phonetic": "",
        "partOfSpeech": "",
        "chinese": "comparison with 与……比较起来",
        "example": ""
      },
      {
        "id": "word-43-58",
        "english": "capable",
        "phonetic": "/ˈkeɪpəbl/",
        "partOfSpeech": "a.",
        "chinese": "有能力的；能够的",
        "example": ""
      },
      {
        "id": "word-44-55",
        "english": "spacious*",
        "phonetic": "/ˈspeɪʃəs/",
        "partOfSpeech": "a.",
        "chinese": "宽广的，宽敞的",
        "example": ""
      },
      {
        "id": "word-44-65",
        "english": "cluster*",
        "phonetic": "/ˈklʌstə(r)/",
        "partOfSpeech": "n.",
        "chinese": "串，束，群 v. 成群；群集",
        "example": ""
      },
      {
        "id": "word-44-54",
        "english": "sociable*",
        "phonetic": "/ˈsəuʃəbl/",
        "partOfSpeech": "a.",
        "chinese": "友善的，友好的；好交际的，合群的",
        "example": ""
      }
    ],
    "article": "In the field of Educational Research, researchers have been studying various phenomena to understand their implications. The concept of slide* has been widely discussed in recent studies. The concept of convert has been widely discussed in recent studies. The concept of proof* has been widely discussed in recent studies. The concept of compensate has been widely discussed in recent studies. The concept of unconquerable* has been widely discussed in recent studies. The concept of photocopy* has been widely discussed in recent studies. The concept of solidarity has been widely discussed in recent studies. The concept of pathway* has been widely discussed in recent studies. The concept of outline has been widely discussed in recent studies. The concept of understandable* has been widely discussed in recent studies. Researchers have found that these factors play a significant role in shaping our understanding of the subject. Further studies are needed to explore the full implications of these findings."
  },
  {
    "id": "unit-23",
    "name": "Unit 23: Word Lists 45 & 46",
    "words": [
      {
        "id": "word-46-12",
        "english": "abide",
        "phonetic": "/əˈbaɪd/",
        "partOfSpeech": "v.",
        "chinese": "停留，逗留；容忍，忍受",
        "example": ""
      },
      {
        "id": "word-45-1",
        "english": "in",
        "phonetic": "",
        "partOfSpeech": "",
        "chinese": "addition to* 除……之外",
        "example": ""
      },
      {
        "id": "word-45-61",
        "english": "border*",
        "phonetic": "/ˈbɔːdə(r)/",
        "partOfSpeech": "n.",
        "chinese": "边缘；边界 v. 与……接壤；接近，毗邻",
        "example": ""
      },
      {
        "id": "word-45-23",
        "english": "herbal",
        "phonetic": "[ˈhɜ:bəl]",
        "partOfSpeech": "a.",
        "chinese": "草本植物的；药草（制）的 n. 草本植物志；药草书",
        "example": ""
      },
      {
        "id": "word-45-40",
        "english": "ministry",
        "phonetic": "/ˈmɪnɪstrɪ/",
        "partOfSpeech": "n.",
        "chinese": "（政府的）部",
        "example": ""
      },
      {
        "id": "word-45-68",
        "english": "embryo*",
        "phonetic": "/ˈembrɪəu/",
        "partOfSpeech": "n.",
        "chinese": "胚，胚胎；事物的萌芽期",
        "example": ""
      },
      {
        "id": "word-45-48",
        "english": "estate",
        "phonetic": "/ɪˈsteɪt/",
        "partOfSpeech": "n.",
        "chinese": "个人财产，（尤指）遗产；土地，地产，（尤指）庄园",
        "example": ""
      },
      {
        "id": "word-45-53",
        "english": "shrug",
        "phonetic": "/ʃrʌg/",
        "partOfSpeech": "n./v.",
        "chinese": "耸肩",
        "example": ""
      },
      {
        "id": "word-45-58",
        "english": "tenable*",
        "phonetic": "/ˈtenəbl/",
        "partOfSpeech": "a.",
        "chinese": "站得住脚的；可防守的",
        "example": ""
      },
      {
        "id": "word-45-2",
        "english": "certificate*",
        "phonetic": "/səˈtɪfɪkət/",
        "partOfSpeech": "n.",
        "chinese": "证书，执照",
        "example": ""
      },
      {
        "id": "word-45-71",
        "english": "mature",
        "phonetic": "/məˈtjuə(r)/",
        "partOfSpeech": "a.",
        "chinese": "成熟的；深思熟虑的 v. （使）成熟",
        "example": ""
      },
      {
        "id": "word-46-8",
        "english": "orbit",
        "phonetic": "/ˈɔːbɪt/",
        "partOfSpeech": "n.",
        "chinese": "轨道；影响范围，势力范围 v. 沿轨道运行；围绕……运动",
        "example": ""
      },
      {
        "id": "word-45-22",
        "english": "facial",
        "phonetic": "/ˈfeɪʃl/",
        "partOfSpeech": "a.",
        "chinese": "面部的；面部用的",
        "example": ""
      },
      {
        "id": "word-45-62",
        "english": "dispenser*",
        "phonetic": "[dɪˈspensə(r)]",
        "partOfSpeech": "n.",
        "chinese": "药剂师，配药师；分配者，施予者；自动售货机",
        "example": ""
      },
      {
        "id": "word-45-16",
        "english": "vomit",
        "phonetic": "/ˈvɔmɪt/",
        "partOfSpeech": "n.",
        "chinese": "呕吐，呕吐物；催吐剂 v. 呕吐，恶心；喷出",
        "example": ""
      },
      {
        "id": "word-45-15",
        "english": "trustworthy",
        "phonetic": "[ˈtrʌstwɜ:ði]",
        "partOfSpeech": "a.",
        "chinese": "值得信赖的，可靠的",
        "example": ""
      },
      {
        "id": "word-46-27",
        "english": "diverse",
        "phonetic": "/daɪˈvɜːs/",
        "partOfSpeech": "a.",
        "chinese": "不同的，多样的",
        "example": ""
      },
      {
        "id": "word-46-17",
        "english": "fantastic",
        "phonetic": "/fænˈtæstɪk/",
        "partOfSpeech": "a.",
        "chinese": "极好的；荒诞的，奇异的；不切实际的",
        "example": ""
      },
      {
        "id": "word-46-36",
        "english": "stringent",
        "phonetic": "/ˈstrɪndʒənt/",
        "partOfSpeech": "a.",
        "chinese": "（法律、规则等）严格的，苛刻的；（财政状况）紧缩的，短缺的，银根紧的；迫切的",
        "example": ""
      },
      {
        "id": "word-46-2",
        "english": "popularize",
        "phonetic": "['pɒpjələraɪz]",
        "partOfSpeech": "vt.",
        "chinese": "宣扬，宣传，推广；使普及，使通俗化",
        "example": ""
      },
      {
        "id": "word-45-72",
        "english": "discard*",
        "phonetic": "/dɪˈskɑːd/",
        "partOfSpeech": "vt.",
        "chinese": "丢弃，遗弃",
        "example": ""
      },
      {
        "id": "word-45-20",
        "english": "commerce",
        "phonetic": "/ˈkɔmɜːs/",
        "partOfSpeech": "n.",
        "chinese": "贸易，商业；交往，交流",
        "example": ""
      },
      {
        "id": "word-46-20",
        "english": "tilt",
        "phonetic": "/tɪlt/",
        "partOfSpeech": "v.",
        "chinese": "（使）倾斜，倾侧；（使）倾向于，偏向 n. 倾斜，倾侧",
        "example": ""
      },
      {
        "id": "word-45-33",
        "english": "almond*",
        "phonetic": "/ˈɑːmənd/",
        "partOfSpeech": "n.",
        "chinese": "杏树；杏仁",
        "example": ""
      },
      {
        "id": "word-46-25",
        "english": "ruthless",
        "phonetic": "[ˈru:θləs]",
        "partOfSpeech": "a.",
        "chinese": "无情的，冷酷的，残忍的",
        "example": ""
      },
      {
        "id": "word-46-43",
        "english": "doom",
        "phonetic": "/duːm/",
        "partOfSpeech": "vt.",
        "chinese": "注定……失败（或遭殃、死亡等），使……在劫难逃 n. 毁灭；厄运，劫数",
        "example": ""
      },
      {
        "id": "word-46-35",
        "english": "corrupt",
        "phonetic": "/kəˈrʌpt/",
        "partOfSpeech": "v.",
        "chinese": "腐化，腐蚀；使堕落；破坏，损坏；（计算机文件等）出错 a. 堕落的，腐化的；腐败的，贪污的",
        "example": ""
      },
      {
        "id": "word-46-38",
        "english": "hinder",
        "phonetic": "/ˈhɪndə(r)/",
        "partOfSpeech": "vt.",
        "chinese": "阻碍，妨碍",
        "example": ""
      },
      {
        "id": "word-45-39",
        "english": "owe*",
        "phonetic": "/əu/",
        "partOfSpeech": "vt.",
        "chinese": "欠；把……归功于",
        "example": ""
      },
      {
        "id": "word-45-63",
        "english": "receiver",
        "phonetic": "/rɪˈsiːvə(r)/",
        "partOfSpeech": "n.",
        "chinese": "（电话）听筒；接收器",
        "example": ""
      },
      {
        "id": "word-46-32",
        "english": "grimy",
        "phonetic": "['ɡraɪmɪ]",
        "partOfSpeech": "a.",
        "chinese": "积满污垢的，肮脏的",
        "example": ""
      },
      {
        "id": "word-45-46",
        "english": "naturally*",
        "phonetic": "/ˈnætʃrəlɪ/",
        "partOfSpeech": "ad.",
        "chinese": "当然，自然；天生地",
        "example": ""
      },
      {
        "id": "word-46-22",
        "english": "offensive",
        "phonetic": "/əˈfensɪv/",
        "partOfSpeech": "a.",
        "chinese": "冒犯的；使人不快的；无礼的；攻击性的，进攻性的 n. 进攻，攻击；攻势",
        "example": ""
      },
      {
        "id": "word-45-3",
        "english": "severe*",
        "phonetic": "/sɪˈvɪə(r)/",
        "partOfSpeech": "a.",
        "chinese": "严重的；严厉的；剧烈的",
        "example": ""
      },
      {
        "id": "word-45-56",
        "english": "aerospace",
        "phonetic": "/ˈeərəuspeɪs/",
        "partOfSpeech": "n.",
        "chinese": "宇宙空间；航空航天技术",
        "example": ""
      },
      {
        "id": "word-46-39",
        "english": "impoverished",
        "phonetic": "[ɪmˈpɒvərɪʃt]",
        "partOfSpeech": "a.",
        "chinese": "穷困的，赤贫的；贫乏的，贫瘠的；枯竭的",
        "example": ""
      },
      {
        "id": "word-46-34",
        "english": "ulterior",
        "phonetic": "/ʌlˈtɪərɪə(r)/",
        "partOfSpeech": "a.",
        "chinese": "较远的；不可告人的，隐秘的，秘密的",
        "example": ""
      },
      {
        "id": "word-46-28",
        "english": "extinguish*",
        "phonetic": "/ɪkˈstɪŋgwɪʃ/",
        "partOfSpeech": "vt.",
        "chinese": "熄灭，扑灭；消灭，使破灭",
        "example": ""
      },
      {
        "id": "word-46-18",
        "english": "abhorrent",
        "phonetic": "[əbˈhɒrənt]",
        "partOfSpeech": "a.",
        "chinese": "可恶的，可恨的",
        "example": ""
      },
      {
        "id": "word-45-18",
        "english": "adolescence",
        "phonetic": "/ˏædəˈlesns/",
        "partOfSpeech": "n.",
        "chinese": "青春，青春期",
        "example": ""
      },
      {
        "id": "word-45-41",
        "english": "laser",
        "phonetic": "/ˈleɪzə(r)/",
        "partOfSpeech": "n.",
        "chinese": "激光",
        "example": ""
      },
      {
        "id": "word-45-52",
        "english": "melt",
        "phonetic": "/melt/",
        "partOfSpeech": "v.",
        "chinese": "（使）融化；（使）消散",
        "example": ""
      },
      {
        "id": "word-45-74",
        "english": "roast",
        "phonetic": "/rəust/",
        "partOfSpeech": "a.",
        "chinese": "烤过的 n. 烤肉 v. 烤，炙",
        "example": ""
      },
      {
        "id": "word-46-4",
        "english": "ferry",
        "phonetic": "/ˈferɪ/",
        "partOfSpeech": "n.",
        "chinese": "渡船；摆渡 v. 渡运",
        "example": ""
      },
      {
        "id": "word-46-26",
        "english": "jargon",
        "phonetic": "/ˈdʒɑːgən/",
        "partOfSpeech": "n.",
        "chinese": "行话，行业术语；黑话",
        "example": ""
      },
      {
        "id": "word-46-11",
        "english": "catastrophic",
        "phonetic": "[ˌkætə'strɒfɪk]",
        "partOfSpeech": "a.",
        "chinese": "悲惨的；灾难性的",
        "example": ""
      },
      {
        "id": "word-45-59",
        "english": "sustain*",
        "phonetic": "/səˈsteɪn/",
        "partOfSpeech": "v.",
        "chinese": "支撑，撑住，承受住；维持，保持；经受，遭受，忍耐",
        "example": ""
      },
      {
        "id": "word-45-28",
        "english": "longitude",
        "phonetic": "/ˈlɔndʒɪtjuːd/",
        "partOfSpeech": "n.",
        "chinese": "经度，经线",
        "example": ""
      },
      {
        "id": "word-46-41",
        "english": "inundate",
        "phonetic": "/ˈɪnʌndeɪt/",
        "partOfSpeech": "vt.",
        "chinese": "淹没，泛滥的；使不胜负荷，使应接不暇",
        "example": ""
      },
      {
        "id": "word-46-40",
        "english": "shallow",
        "phonetic": "/ˈʃæləu/",
        "partOfSpeech": "a.",
        "chinese": "浅的；肤浅的，浅薄的",
        "example": ""
      },
      {
        "id": "word-45-65",
        "english": "bureaucracy",
        "phonetic": "/bjuəˈrɔkrəsɪ/",
        "partOfSpeech": "n.",
        "chinese": "官僚主义；官僚机构",
        "example": ""
      },
      {
        "id": "word-45-45",
        "english": "beneath*",
        "phonetic": "/bɪˈniːθ/",
        "partOfSpeech": "prep./ad.",
        "chinese": "在下方",
        "example": ""
      },
      {
        "id": "word-45-34",
        "english": "feed",
        "phonetic": "/fiːd/",
        "partOfSpeech": "v.",
        "chinese": "喂养，为……提供食物；吃，以……为食 n. 饲料",
        "example": ""
      },
      {
        "id": "word-45-44",
        "english": "tempt*",
        "phonetic": "/tempt/",
        "partOfSpeech": "vt.",
        "chinese": "引诱；吸引",
        "example": ""
      },
      {
        "id": "word-46-24",
        "english": "begrimed",
        "phonetic": "[bɪ'graɪmd]",
        "partOfSpeech": "a.",
        "chinese": "污秽的",
        "example": ""
      },
      {
        "id": "word-46-14",
        "english": "oxygen*",
        "phonetic": "/ˈɔksɪdʒən/",
        "partOfSpeech": "n.",
        "chinese": "氧，氧气",
        "example": ""
      },
      {
        "id": "word-45-31",
        "english": "seclude",
        "phonetic": "/sɪˈkluːd/",
        "partOfSpeech": "vt.",
        "chinese": "使隔离，使孤立",
        "example": ""
      },
      {
        "id": "word-46-31",
        "english": "biased",
        "phonetic": "[ˈbaɪəst]",
        "partOfSpeech": "a.",
        "chinese": "有偏见的；片面的",
        "example": ""
      },
      {
        "id": "word-45-21",
        "english": "condensation",
        "phonetic": "/ˏkɔndenˈseɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "浓缩，凝结",
        "example": ""
      },
      {
        "id": "word-46-21",
        "english": "mosquito",
        "phonetic": "/məsˈkiːtəu/",
        "partOfSpeech": "n.",
        "chinese": "蚊子",
        "example": ""
      },
      {
        "id": "word-45-19",
        "english": "captivity",
        "phonetic": "[kæpˈtɪvəti]",
        "partOfSpeech": "n.",
        "chinese": "囚禁，拘留",
        "example": ""
      },
      {
        "id": "word-45-67",
        "english": "endorse*",
        "phonetic": "/ɪnˈdɔːs/",
        "partOfSpeech": "vt.",
        "chinese": "支持，赞同",
        "example": ""
      },
      {
        "id": "word-45-73",
        "english": "membership",
        "phonetic": "[ˈmembəʃɪp]",
        "partOfSpeech": "n.",
        "chinese": "会员身份；全体会员",
        "example": ""
      },
      {
        "id": "word-46-10",
        "english": "slothful",
        "phonetic": "[ˈsləuθfəl]",
        "partOfSpeech": "a.",
        "chinese": "怠惰的，懒惰的；迟钝的",
        "example": ""
      },
      {
        "id": "word-46-1",
        "english": "computerize",
        "phonetic": "[kəm'pju:təraɪz]",
        "partOfSpeech": "vt.",
        "chinese": "使计算机化；用计算机做；用计算机储存（信息）",
        "example": ""
      },
      {
        "id": "word-45-47",
        "english": "microscope",
        "phonetic": "/ˈmaɪkrəskəup/",
        "partOfSpeech": "n.",
        "chinese": "显微镜",
        "example": ""
      },
      {
        "id": "word-45-29",
        "english": "procrastinate",
        "phonetic": "/prəuˈkræstɪneɪt/",
        "partOfSpeech": "v.",
        "chinese": "耽搁，拖延",
        "example": ""
      },
      {
        "id": "word-45-4",
        "english": "diameter",
        "phonetic": "/daɪˈæmɪtə(r)/",
        "partOfSpeech": "n.",
        "chinese": "直径",
        "example": ""
      },
      {
        "id": "word-45-5",
        "english": "gesture*",
        "phonetic": "/ˈdʒestʃə(r)/",
        "partOfSpeech": "n.",
        "chinese": "姿势，姿态；手势 v. 做手势",
        "example": ""
      },
      {
        "id": "word-46-7",
        "english": "storyline",
        "phonetic": "[ˈstɔ:rilaɪn]",
        "partOfSpeech": "n.",
        "chinese": "故事情节",
        "example": ""
      },
      {
        "id": "word-46-42",
        "english": "erode",
        "phonetic": "/ɪˈrəud/",
        "partOfSpeech": "v.",
        "chinese": "侵蚀，腐蚀；削弱，损害",
        "example": ""
      },
      {
        "id": "word-46-3",
        "english": "devalue",
        "phonetic": "/ˏdiːˈvæljuː/",
        "partOfSpeech": "v.",
        "chinese": "使（货币）贬值；贬低",
        "example": ""
      },
      {
        "id": "word-46-6",
        "english": "bully",
        "phonetic": "/ˈbulɪ/",
        "partOfSpeech": "n.",
        "chinese": "恃强凌弱者 vt. 恐吓；胁迫，欺负",
        "example": ""
      },
      {
        "id": "word-45-27",
        "english": "initiate",
        "phonetic": "/ɪˈnɪʃɪeɪt/",
        "partOfSpeech": "vt.",
        "chinese": "开始，创造，发起；接纳（成员），让……加入 /ɪˈnɪʃɪət/ n. （新）加入组织者",
        "example": ""
      },
      {
        "id": "word-45-66",
        "english": "construction",
        "phonetic": "/kənˈstrʌkʃn/",
        "partOfSpeech": "n.",
        "chinese": "建造；建筑物；构造",
        "example": ""
      },
      {
        "id": "word-46-5",
        "english": "iron*",
        "phonetic": "/ˈaɪən/",
        "partOfSpeech": "n.",
        "chinese": "铁；烙铁，熨斗 v. （用熨斗）熨，烫平",
        "example": ""
      },
      {
        "id": "word-45-42",
        "english": "individual",
        "phonetic": "/ˏɪndɪˈvɪdʒuəl/",
        "partOfSpeech": "a.",
        "chinese": "个别的，单独的；独特的 n. 个人，个体",
        "example": ""
      },
      {
        "id": "word-45-64",
        "english": "monopoly",
        "phonetic": "/məˈnɔpəlɪ/",
        "partOfSpeech": "n.",
        "chinese": "垄断，专卖；垄断商品，专卖商品",
        "example": ""
      },
      {
        "id": "word-46-9",
        "english": "combat",
        "phonetic": "/ˈkɔmbæt/",
        "partOfSpeech": "n.",
        "chinese": "战斗，搏斗 vt. 战斗，与……搏斗；防止",
        "example": ""
      },
      {
        "id": "word-46-23",
        "english": "extravagant",
        "phonetic": "/ɪkˈstrævəgənt/",
        "partOfSpeech": "a.",
        "chinese": "奢侈的，铺张的；（言行等）无节制的，过分的，放肆的",
        "example": ""
      },
      {
        "id": "word-46-37",
        "english": "novice",
        "phonetic": "/ˈnɔvɪs/",
        "partOfSpeech": "n.",
        "chinese": "生手，新手；初学者；新信徒，初学修士（或修女）",
        "example": ""
      },
      {
        "id": "word-45-50",
        "english": "briefcase",
        "phonetic": "/ˈbriːfkeɪs/",
        "partOfSpeech": "n.",
        "chinese": "公文包",
        "example": ""
      },
      {
        "id": "word-46-44",
        "english": "alienate",
        "phonetic": "/ˈeɪlɪəneɪt/",
        "partOfSpeech": "vt.",
        "chinese": "使疏远，使不友好；转让，让渡（财产等）",
        "example": ""
      },
      {
        "id": "word-45-60",
        "english": "straw*",
        "phonetic": "/strɔː/",
        "partOfSpeech": "n.",
        "chinese": "稻草；吸管",
        "example": ""
      },
      {
        "id": "word-45-43",
        "english": "association*",
        "phonetic": "/əˏsəusɪˈeɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "协会",
        "example": ""
      },
      {
        "id": "word-45-51",
        "english": "candidate*",
        "phonetic": "/ˈkændɪdət/",
        "partOfSpeech": "n.",
        "chinese": "候选人，候补者；申请求职者；报考者",
        "example": ""
      },
      {
        "id": "word-46-55",
        "english": "enslave",
        "phonetic": "/ɪnˈsleɪv/",
        "partOfSpeech": "vt.",
        "chinese": "奴役，征服，使受控制",
        "example": ""
      },
      {
        "id": "word-45-25",
        "english": "imprecise",
        "phonetic": "/ˏɪmprɪˈsaɪs/",
        "partOfSpeech": "a.",
        "chinese": "不精确的，不严密的",
        "example": ""
      },
      {
        "id": "word-46-75",
        "english": "kindergarten",
        "phonetic": "/ˈkɪndəgɑːtn/",
        "partOfSpeech": "n.",
        "chinese": "幼儿园",
        "example": ""
      },
      {
        "id": "word-45-70",
        "english": "intelligence*",
        "phonetic": "/ɪnˈtelɪdʒəns/",
        "partOfSpeech": "n.",
        "chinese": "智力，理解力；情报",
        "example": ""
      },
      {
        "id": "word-46-30",
        "english": "neoclassical",
        "phonetic": "/ˏniːəuˈklæsɪkl/",
        "partOfSpeech": "a.",
        "chinese": "新古典主义的",
        "example": ""
      },
      {
        "id": "word-46-58",
        "english": "diesel",
        "phonetic": "/ˈdiːzl/",
        "partOfSpeech": "n.",
        "chinese": "柴油；柴油机；柴油车",
        "example": ""
      },
      {
        "id": "word-46-69",
        "english": "seduce",
        "phonetic": "/sɪˈdjuːs/",
        "partOfSpeech": "vt.",
        "chinese": "勾引，引诱；诱使，唆使",
        "example": ""
      },
      {
        "id": "word-45-55",
        "english": "relax*",
        "phonetic": "[rɪ'læks]",
        "partOfSpeech": "v.",
        "chinese": "（使）放松",
        "example": ""
      },
      {
        "id": "word-46-65",
        "english": "irrational",
        "phonetic": "/ɪˈræʃənl/",
        "partOfSpeech": "a.",
        "chinese": "不合理的，不合逻辑的，荒谬的 n. 无理数",
        "example": ""
      },
      {
        "id": "word-45-54",
        "english": "frightened*",
        "phonetic": "[ˈfraɪtnd]",
        "partOfSpeech": "a.",
        "chinese": "受惊的；受恐吓的",
        "example": ""
      },
      {
        "id": "word-46-15",
        "english": "pervasive",
        "phonetic": "/pəˈveɪsɪv/",
        "partOfSpeech": "a.",
        "chinese": "遍布的，弥漫的",
        "example": ""
      },
      {
        "id": "word-46-19",
        "english": "inflict",
        "phonetic": "/ɪnˈflɪkt/",
        "partOfSpeech": "vt.",
        "chinese": "把……强加给，使遭受，使承受",
        "example": ""
      },
      {
        "id": "word-45-69",
        "english": "silicon",
        "phonetic": "/ˈsɪlɪkən/",
        "partOfSpeech": "n.",
        "chinese": "硅",
        "example": ""
      },
      {
        "id": "word-45-49",
        "english": "discourage",
        "phonetic": "/dɪˈskʌrɪdʒ/",
        "partOfSpeech": "vt.",
        "chinese": "使泄气，使灰心；阻止，劝阻",
        "example": ""
      },
      {
        "id": "word-46-70",
        "english": "relocate",
        "phonetic": "/ˏriːləuˈkeɪt/",
        "partOfSpeech": "v.",
        "chinese": "重新安置，（使）搬迁，迁移",
        "example": ""
      },
      {
        "id": "word-46-56",
        "english": "timid",
        "phonetic": "/ˈtɪmɪd/",
        "partOfSpeech": "a.",
        "chinese": "胆小的；羞怯的",
        "example": ""
      },
      {
        "id": "word-46-16",
        "english": "encroach",
        "phonetic": "/ɪnˈkrəutʃ/",
        "partOfSpeech": "vi.",
        "chinese": "侵入，侵占，侵犯；侵蚀，蚕食（土地）",
        "example": ""
      },
      {
        "id": "word-46-45",
        "english": "brazen",
        "phonetic": "/ˈbreɪzn/",
        "partOfSpeech": "a.",
        "chinese": "黄铜制的，黄铜色的；厚颜无耻的",
        "example": ""
      },
      {
        "id": "word-45-12",
        "english": "fairly*",
        "phonetic": "/feəlɪ/",
        "partOfSpeech": "ad.",
        "chinese": "相当地；公平地；简直，完全地",
        "example": ""
      },
      {
        "id": "word-46-77",
        "english": "processor",
        "phonetic": "[ˈprəʊsesə(r)]",
        "partOfSpeech": "n.",
        "chinese": "加工机；加工工人；处理器",
        "example": ""
      },
      {
        "id": "word-46-48",
        "english": "outlaw",
        "phonetic": "/ˈautlɔː/",
        "partOfSpeech": "n.",
        "chinese": "亡命之徒，逃犯，被剥夺法律权益者 vt. 宣布……为非法，使……成为非法",
        "example": ""
      },
      {
        "id": "word-46-46",
        "english": "tortoise",
        "phonetic": "/ˈtɔːtəs/",
        "partOfSpeech": "n.",
        "chinese": "龟，陆龟；行动迟缓的人",
        "example": ""
      },
      {
        "id": "word-46-29",
        "english": "estrange",
        "phonetic": "/ɪˈstreɪndʒ/",
        "partOfSpeech": "vt.",
        "chinese": "使疏远，使分离",
        "example": ""
      },
      {
        "id": "word-45-13",
        "english": "precise",
        "phonetic": "/prɪˈsaɪs/",
        "partOfSpeech": "a.",
        "chinese": "精确的，准确的；严谨的",
        "example": ""
      },
      {
        "id": "word-45-38",
        "english": "tap",
        "phonetic": "/tæp/",
        "partOfSpeech": "v.",
        "chinese": "轻拍；利用，开发",
        "example": ""
      },
      {
        "id": "word-46-13",
        "english": "allure",
        "phonetic": "/əˈluə(r)/",
        "partOfSpeech": "n./v.",
        "chinese": "诱惑，吸引",
        "example": ""
      },
      {
        "id": "word-46-57",
        "english": "vile",
        "phonetic": "/vaɪl/",
        "partOfSpeech": "a.",
        "chinese": "糟糕透顶的，可恶的；恶劣的，卑鄙的",
        "example": ""
      },
      {
        "id": "word-46-68",
        "english": "disable*",
        "phonetic": "/dɪsˈeɪbl/",
        "partOfSpeech": "vt.",
        "chinese": "使丧失能力，使伤残；使不能正常运转，使无效",
        "example": ""
      },
      {
        "id": "word-46-72",
        "english": "legitimate",
        "phonetic": "/lɪˈdʒɪtɪmət/",
        "partOfSpeech": "a.",
        "chinese": "合法的，法定的；正当的，合情合理的 {lɪˈdʒɪtɪmeɪt} vt. 使合法",
        "example": ""
      },
      {
        "id": "word-46-66",
        "english": "verbal",
        "phonetic": "/ˈvɜːbl/",
        "partOfSpeech": "a.",
        "chinese": "口头的；言辞的，文字的，词语的；动词的",
        "example": ""
      },
      {
        "id": "word-46-62",
        "english": "inhumane",
        "phonetic": "/ˏɪnhjuːˈmeɪn/",
        "partOfSpeech": "a.",
        "chinese": "不近人情的，残忍的，不人道的",
        "example": ""
      },
      {
        "id": "word-45-6",
        "english": "disclose",
        "phonetic": "/dɪsˈkləuz/",
        "partOfSpeech": "vt.",
        "chinese": "揭露；透露；公开",
        "example": ""
      },
      {
        "id": "word-46-76",
        "english": "molten",
        "phonetic": "/ˈməultən/",
        "partOfSpeech": "a.",
        "chinese": "熔化的",
        "example": ""
      },
      {
        "id": "word-46-80",
        "english": "assault",
        "phonetic": "/əˈsɔːlt/",
        "partOfSpeech": "n.",
        "chinese": "（武力或口头上的）攻击，袭击；侵犯人身罪；冲击；抨击 vt. 攻击，袭击；使难受",
        "example": ""
      },
      {
        "id": "word-46-53",
        "english": "renewable",
        "phonetic": "[rɪˈnju:əbl]",
        "partOfSpeech": "a.",
        "chinese": "可更新的，可再生的，可恢复的；可延长有效期的，可续期的",
        "example": ""
      },
      {
        "id": "word-46-50",
        "english": "antiquated",
        "phonetic": "/ˈæntɪkweɪtɪd/",
        "partOfSpeech": "a.",
        "chinese": "陈旧的，过时的；废弃的",
        "example": ""
      },
      {
        "id": "word-46-60",
        "english": "torment",
        "phonetic": "/ˈtɔːment/",
        "partOfSpeech": "n.",
        "chinese": "痛苦，折磨；令人痛苦的东西 /tɔːˈment/ vt. 折磨，使痛苦，烦扰；纠缠；戏弄，捉弄",
        "example": ""
      },
      {
        "id": "word-45-26",
        "english": "inactive",
        "phonetic": "/ɪnˈæktɪv/",
        "partOfSpeech": "a.",
        "chinese": "不活动的；懒散的",
        "example": ""
      },
      {
        "id": "word-45-7",
        "english": "sheer*",
        "phonetic": "/ʃɪə(r)/",
        "partOfSpeech": "a.",
        "chinese": "十足的；纯粹的；陡峭的",
        "example": ""
      },
      {
        "id": "word-46-67",
        "english": "saline",
        "phonetic": "/ˈseɪlaɪn/",
        "partOfSpeech": "a.",
        "chinese": "含盐的，咸的 n. [医] 盐水",
        "example": ""
      },
      {
        "id": "word-45-35",
        "english": "scenery*",
        "phonetic": "/ˈsiːnərɪ/",
        "partOfSpeech": "n.",
        "chinese": "舞台布景；风景，景色",
        "example": ""
      },
      {
        "id": "word-46-61",
        "english": "revive",
        "phonetic": "/rɪˈvaɪv/",
        "partOfSpeech": "v.",
        "chinese": "（使）苏醒，复活；重新使用",
        "example": ""
      },
      {
        "id": "word-46-74",
        "english": "water-borne",
        "phonetic": "{'wɔ:təbɔ:n}",
        "partOfSpeech": "a.",
        "chinese": "水运的，水传播的，饮水传染的",
        "example": ""
      },
      {
        "id": "word-45-11",
        "english": "require*",
        "phonetic": "/rɪˈkwaɪə(r)/",
        "partOfSpeech": "vt.",
        "chinese": "需要；命令；规定，要求",
        "example": ""
      },
      {
        "id": "word-45-36",
        "english": "stagnate*",
        "phonetic": "/stægˈneɪt/",
        "partOfSpeech": "v.",
        "chinese": "（使）停滞；不发展",
        "example": ""
      },
      {
        "id": "word-46-64",
        "english": "diverge",
        "phonetic": "/daɪˈvɜːdʒ/",
        "partOfSpeech": "vi.",
        "chinese": "（道路，线条等）分开，岔开；（意见、观点等）分歧，相异；偏离，违背",
        "example": ""
      },
      {
        "id": "word-45-8",
        "english": "successive",
        "phonetic": "/səkˈsesɪv/",
        "partOfSpeech": "a.",
        "chinese": "连续的",
        "example": ""
      },
      {
        "id": "word-46-71",
        "english": "angle",
        "phonetic": "/ˈæŋgl/",
        "partOfSpeech": "n.",
        "chinese": "角；角度；观点，立场 v. 移向；使成角度移动；从（某角度）报道",
        "example": ""
      },
      {
        "id": "word-46-59",
        "english": "guzzle",
        "phonetic": "/ˈgʌzl/",
        "partOfSpeech": "v.",
        "chinese": "狂饮，暴饮；大量消耗",
        "example": ""
      },
      {
        "id": "word-45-32",
        "english": "ongoing*",
        "phonetic": "/ˈɔngəuɪŋ/",
        "partOfSpeech": "a.",
        "chinese": "进行中的 n. 前进，发展",
        "example": ""
      },
      {
        "id": "word-46-47",
        "english": "commiserate",
        "phonetic": "/kəˈmɪzəreɪt/",
        "partOfSpeech": "vi.",
        "chinese": "同情，怜悯",
        "example": ""
      },
      {
        "id": "word-46-51",
        "english": "coral",
        "phonetic": "/ˈkɔrəl/",
        "partOfSpeech": "n.",
        "chinese": "珊瑚；珊瑚虫 a. 珊瑚色的，红色的",
        "example": ""
      },
      {
        "id": "word-45-14",
        "english": "colour-blind*",
        "phonetic": "['kʌlə(r)",
        "partOfSpeech": "",
        "chinese": "blaɪnd] a. 色盲的",
        "example": ""
      },
      {
        "id": "word-46-49",
        "english": "pavement",
        "phonetic": "/ˈpeɪvmənt/",
        "partOfSpeech": "n.",
        "chinese": "人行道；地面，路面",
        "example": ""
      },
      {
        "id": "word-45-37",
        "english": "ozone",
        "phonetic": "/ˈəuzəun/",
        "partOfSpeech": "n.",
        "chinese": "臭氧",
        "example": ""
      },
      {
        "id": "word-46-33",
        "english": "enhancer",
        "phonetic": "[ɪnˈhɑ:nsə(r)]",
        "partOfSpeech": "n.",
        "chinese": "增强剂；放大器",
        "example": ""
      },
      {
        "id": "word-46-52",
        "english": "incinerate",
        "phonetic": "/ɪnˈsɪnəreɪt/",
        "partOfSpeech": "vt.",
        "chinese": "焚化，焚毁，把……烧成灰烬",
        "example": ""
      },
      {
        "id": "word-46-79",
        "english": "trivialize",
        "phonetic": "['trɪvɪəlaɪz]",
        "partOfSpeech": "vt.",
        "chinese": "使显得不重要，轻视，淡化",
        "example": ""
      },
      {
        "id": "word-45-17",
        "english": "wrestle",
        "phonetic": "/ˈresl/",
        "partOfSpeech": "v.",
        "chinese": "摔跤；全力对付；用力移动",
        "example": ""
      },
      {
        "id": "word-45-10",
        "english": "adjust*",
        "phonetic": "/əˈdʒʌst/",
        "partOfSpeech": "v.",
        "chinese": "校准；调节；使……适应",
        "example": ""
      },
      {
        "id": "word-45-24",
        "english": "hover",
        "phonetic": "/ˈhɔvə(r)/",
        "partOfSpeech": "v.",
        "chinese": "（鸟等）翱翔，盘旋；逗留在近旁，徘徊；彷徨，犹豫",
        "example": ""
      },
      {
        "id": "word-46-54",
        "english": "shin",
        "phonetic": "/ʃɪn/",
        "partOfSpeech": "n.",
        "chinese": "胫，胫部，胫骨 v. （手脚并用沿某物）爬",
        "example": ""
      },
      {
        "id": "word-46-73",
        "english": "sedentary",
        "phonetic": "/ˈsedntrɪ/",
        "partOfSpeech": "a.",
        "chinese": "（工作、活动等）需要久坐的；（人）惯于久坐不动的；（人或动物）定居的，不迁徙的；沉积的",
        "example": ""
      },
      {
        "id": "word-46-78",
        "english": "saturate",
        "phonetic": "/ˈsætʃəreɪt/",
        "partOfSpeech": "vt.",
        "chinese": "使湿透，浸透；使充满，使饱和",
        "example": ""
      },
      {
        "id": "word-45-9",
        "english": "balance*",
        "phonetic": "/ˈbæləns/",
        "partOfSpeech": "n.",
        "chinese": "平衡；余额 vt. 平衡",
        "example": ""
      },
      {
        "id": "word-45-30",
        "english": "rarity",
        "phonetic": "/ˈreərətɪ/",
        "partOfSpeech": "n.",
        "chinese": "稀有；稀有的事物",
        "example": ""
      },
      {
        "id": "word-46-63",
        "english": "imperil",
        "phonetic": "/ɪmˈperəl/",
        "partOfSpeech": "vt.",
        "chinese": "使陷于危险，危及",
        "example": ""
      },
      {
        "id": "word-45-57",
        "english": "suppose*",
        "phonetic": "/səˈpəuz/",
        "partOfSpeech": "v.",
        "chinese": "假想，假定，猜想，推测；[用于祈使句] 假定，让；[常用于被动语态] 期望做（某事），认为应该做（某事）",
        "example": ""
      }
    ],
    "article": "In the field of Scientific Discovery, researchers have been studying various phenomena to understand their implications. The concept of abide has been widely discussed in recent studies. The concept of in has been widely discussed in recent studies. The concept of border* has been widely discussed in recent studies. The concept of herbal has been widely discussed in recent studies. The concept of ministry has been widely discussed in recent studies. The concept of embryo* has been widely discussed in recent studies. The concept of estate has been widely discussed in recent studies. The concept of shrug has been widely discussed in recent studies. The concept of tenable* has been widely discussed in recent studies. The concept of certificate* has been widely discussed in recent studies. Researchers have found that these factors play a significant role in shaping our understanding of the subject. Further studies are needed to explore the full implications of these findings."
  },
  {
    "id": "unit-24",
    "name": "Unit 24: Word Lists 47 & 48",
    "words": [
      {
        "id": "word-47-65",
        "english": "mentor",
        "phonetic": "/ˈmentɔː(r)/",
        "partOfSpeech": "n.",
        "chinese": "导师；顾问，指导者",
        "example": ""
      },
      {
        "id": "word-47-6",
        "english": "heartless",
        "phonetic": "['hɑ:tləs]",
        "partOfSpeech": "a.",
        "chinese": "无情的，狠心的；无生气的，没精打采的",
        "example": ""
      },
      {
        "id": "word-47-23",
        "english": "gene",
        "phonetic": "/dʒiːn/",
        "partOfSpeech": "n.",
        "chinese": "基因",
        "example": ""
      },
      {
        "id": "word-47-16",
        "english": "perpetrate",
        "phonetic": "['pɜ:pətreɪt]",
        "partOfSpeech": "vt.",
        "chinese": "做（坏事），犯（罪）",
        "example": ""
      },
      {
        "id": "word-47-21",
        "english": "despoil",
        "phonetic": "/dɪˈspɔɪl/",
        "partOfSpeech": "vt.",
        "chinese": "抢夺，掠夺；蹂躏，破坏",
        "example": ""
      },
      {
        "id": "word-48-23",
        "english": "precede",
        "phonetic": "/prɪˈsiːd/",
        "partOfSpeech": "v.",
        "chinese": "领先，先于",
        "example": ""
      },
      {
        "id": "word-48-75",
        "english": "prevalence",
        "phonetic": "['prevələns]",
        "partOfSpeech": "n.",
        "chinese": "普及，流行，盛行",
        "example": ""
      },
      {
        "id": "word-47-4",
        "english": "purify",
        "phonetic": "/ˈpjuərɪfaɪ/",
        "partOfSpeech": "vt.",
        "chinese": "使洁净，使纯洁，净化；提纯，精炼",
        "example": ""
      },
      {
        "id": "word-48-65",
        "english": "disobey",
        "phonetic": "/ˏdɪsəˈbeɪ/",
        "partOfSpeech": "v.",
        "chinese": "不服从，违抗",
        "example": ""
      },
      {
        "id": "word-48-58",
        "english": "embody",
        "phonetic": "/ɪmˈbɔdɪ/",
        "partOfSpeech": "vt.",
        "chinese": "（作品等）表达，体现；具体表现，使具体化；包括，包含",
        "example": ""
      },
      {
        "id": "word-48-46",
        "english": "refrain",
        "phonetic": "/rɪˈfreɪn/",
        "partOfSpeech": "v.",
        "chinese": "抑制，克制 n. 反复句，（诗歌的）叠句；副歌；经常重复的评价",
        "example": ""
      },
      {
        "id": "word-48-54",
        "english": "hazardous",
        "phonetic": "['hæzədəs]",
        "partOfSpeech": "a.",
        "chinese": "危险的，冒险的；有害的",
        "example": ""
      },
      {
        "id": "word-48-60",
        "english": "moribund",
        "phonetic": "/ˈmɔrɪbʌnd/",
        "partOfSpeech": "a.",
        "chinese": "垂死的，即将灭亡的；即将结束的",
        "example": ""
      },
      {
        "id": "word-47-25",
        "english": "boost",
        "phonetic": "/buːst/",
        "partOfSpeech": "vt.",
        "chinese": "使增长，使兴旺；鼓励，促进；为……作宣传，宣扬 n. 增加，提高；帮助，激励",
        "example": ""
      },
      {
        "id": "word-48-48",
        "english": "accustom",
        "phonetic": "/əˈkʌstəm/",
        "partOfSpeech": "vt.",
        "chinese": "使习惯于",
        "example": ""
      },
      {
        "id": "word-47-2",
        "english": "authentic",
        "phonetic": "/ɔːˈθentɪk/",
        "partOfSpeech": "a.",
        "chinese": "真品的，真迹的；真正的，真实的，逼真的",
        "example": ""
      },
      {
        "id": "word-47-32",
        "english": "trunk",
        "phonetic": "/trʌŋk/",
        "partOfSpeech": "n.",
        "chinese": "树干，躯干；大箱子；象鼻",
        "example": ""
      },
      {
        "id": "word-47-24",
        "english": "lax",
        "phonetic": "/læks/",
        "partOfSpeech": "a.",
        "chinese": "懒散的；松弛的，不严格的，马虎的",
        "example": ""
      },
      {
        "id": "word-48-71",
        "english": "curb",
        "phonetic": "/kɜːb/",
        "partOfSpeech": "vt.",
        "chinese": "控制，抑制，约束 n. 路缘，（街道的）镶边石；马勒；起限制作用的事物",
        "example": ""
      },
      {
        "id": "word-47-26",
        "english": "smear",
        "phonetic": "/smɪə(r)/",
        "partOfSpeech": "v.",
        "chinese": "胡乱涂抹；弄脏，弄污；诽谤，诋毁；变得模糊不清，把（图画等）弄得模糊不清 n. 污迹，污渍；（显微镜的）涂片；诽谤，诋毁",
        "example": ""
      },
      {
        "id": "word-47-18",
        "english": "gorilla",
        "phonetic": "/gəˈrɪlə/",
        "partOfSpeech": "n.",
        "chinese": "大猩猩",
        "example": ""
      },
      {
        "id": "word-48-32",
        "english": "upgrade",
        "phonetic": "/ˏʌpˈgreɪd/",
        "partOfSpeech": "n.",
        "chinese": "向上的斜坡；增加，改善 vt. 使（机器等）升级，提高，改进；提拔，提升；改善",
        "example": ""
      },
      {
        "id": "word-47-28",
        "english": "synthetic",
        "phonetic": "[sɪnˈθetɪk]",
        "partOfSpeech": "a.",
        "chinese": "人造的；合成的，综合的 n. 合成物；合成纤维（织物）",
        "example": ""
      },
      {
        "id": "word-48-69",
        "english": "pretentious",
        "phonetic": "/prɪˈtenʃəs/",
        "partOfSpeech": "a.",
        "chinese": "自命不凡的，自负的；炫耀的；做作的",
        "example": ""
      },
      {
        "id": "word-48-29",
        "english": "brutal",
        "phonetic": "/ˈbruːtl/",
        "partOfSpeech": "a.",
        "chinese": "野兽般的，残忍的；无情的，冷酷的",
        "example": ""
      },
      {
        "id": "word-47-3",
        "english": "righteous",
        "phonetic": "/ˈraɪtʃəs/",
        "partOfSpeech": "a.",
        "chinese": "正义的，正直的；公正的；正当的",
        "example": ""
      },
      {
        "id": "word-47-12",
        "english": "spur",
        "phonetic": "/spɜː(r)/",
        "partOfSpeech": "n.",
        "chinese": "刺激（物）；激励；靴刺，马刺 vt. 刺激，激励，鞭策；（用马刺）策马加速",
        "example": ""
      },
      {
        "id": "word-47-29",
        "english": "enact",
        "phonetic": "/ɪˈnækt/",
        "partOfSpeech": "v.",
        "chinese": "通过（法律）；扮演（角色）",
        "example": ""
      },
      {
        "id": "word-47-30",
        "english": "resent",
        "phonetic": "/rɪˈzent/",
        "partOfSpeech": "v.",
        "chinese": "愤恨；对……表示愤恨，感到气愤",
        "example": ""
      },
      {
        "id": "word-48-4",
        "english": "millennium",
        "phonetic": "/mɪˈlenɪəm/",
        "partOfSpeech": "n.",
        "chinese": "一千年，千禧年；（未来的）太平盛世",
        "example": ""
      },
      {
        "id": "word-48-67",
        "english": "versatile",
        "phonetic": "/ˈvɜːsətaɪl/",
        "partOfSpeech": "a.",
        "chinese": "多才多艺的，多面手的；多用途的，通用的",
        "example": ""
      },
      {
        "id": "word-48-24",
        "english": "alleviate",
        "phonetic": "/əˈliːvɪeɪt/",
        "partOfSpeech": "vt.",
        "chinese": "减轻，缓解，缓和",
        "example": ""
      },
      {
        "id": "word-48-37",
        "english": "pour*",
        "phonetic": "/pɔː(r)/",
        "partOfSpeech": "v.",
        "chinese": "灌，倒；倾泻，涌流；喷发；不断涌现",
        "example": ""
      },
      {
        "id": "word-47-31",
        "english": "affluent",
        "phonetic": "/ˈæfluənt/",
        "partOfSpeech": "a.",
        "chinese": "丰富的，富裕的",
        "example": ""
      },
      {
        "id": "word-47-38",
        "english": "futile",
        "phonetic": "/ˈfjuːtaɪl/",
        "partOfSpeech": "a.",
        "chinese": "无效的，无用的，无意义的；（人）没出息的；琐细的",
        "example": ""
      },
      {
        "id": "word-48-34",
        "english": "legislative",
        "phonetic": "[ˈledʒɪslətɪv]",
        "partOfSpeech": "a.",
        "chinese": "立法的，有立法权的；根据法规执行的；立法机关的 n. 立法机关",
        "example": ""
      },
      {
        "id": "word-47-40",
        "english": "vulgar",
        "phonetic": "/ˈvʌlgə(r)/",
        "partOfSpeech": "a.",
        "chinese": "庸俗的，粗俗的，下流的，缺乏教养的；大众的，通俗的",
        "example": ""
      },
      {
        "id": "word-48-12",
        "english": "inviolable",
        "phonetic": "/ɪnˈvaɪələbl/",
        "partOfSpeech": "a.",
        "chinese": "不可侵犯的，不容亵渎的，不容破坏的",
        "example": ""
      },
      {
        "id": "word-48-36",
        "english": "sentient",
        "phonetic": "/ˈsenʃnt/; [ˈsentiənt]",
        "partOfSpeech": "a.",
        "chinese": "有感觉能力的，有知觉力的；知悉的",
        "example": ""
      },
      {
        "id": "word-47-33",
        "english": "coexist",
        "phonetic": "/ˏkəuɪgˈzɪst/",
        "partOfSpeech": "vi.",
        "chinese": "共存",
        "example": ""
      },
      {
        "id": "word-48-30",
        "english": "avenge",
        "phonetic": "/əˈvendʒ/",
        "partOfSpeech": "vt.",
        "chinese": "报仇，复仇，向（某人）报仇",
        "example": ""
      },
      {
        "id": "word-48-77",
        "english": "ecliptic",
        "phonetic": "[ɪ'klɪptɪk]",
        "partOfSpeech": "n.",
        "chinese": "[天] 黄道 a. 黄道的，日（或月）食的",
        "example": ""
      },
      {
        "id": "word-48-33",
        "english": "commute",
        "phonetic": "/kəˈmjuːt/",
        "partOfSpeech": "v.",
        "chinese": "（乘公共汽车等）上下班往返，经常往返；交换，抵偿；减刑 n. 上下班路程",
        "example": ""
      },
      {
        "id": "word-47-7",
        "english": "instil",
        "phonetic": "/ɪnˈstɪl/",
        "partOfSpeech": "vt.",
        "chinese": "滴注；逐渐灌输；逐步培养（感受、思想等）",
        "example": ""
      },
      {
        "id": "word-48-52",
        "english": "pump",
        "phonetic": "/pʌmp/",
        "partOfSpeech": "v.",
        "chinese": "用泵抽（水）；涌出，奔流 n. 泵，抽水机",
        "example": ""
      },
      {
        "id": "word-48-20",
        "english": "augment",
        "phonetic": "/ɔːgˈment/",
        "partOfSpeech": "vt.",
        "chinese": "增加，提高，扩大",
        "example": ""
      },
      {
        "id": "word-47-34",
        "english": "aviation",
        "phonetic": "/ˏeɪvɪˈəɪʃn/",
        "partOfSpeech": "n.",
        "chinese": "航空，飞行；航空制造业",
        "example": ""
      },
      {
        "id": "word-48-59",
        "english": "reciprocate",
        "phonetic": "/rɪˈsɪprəkeɪt/",
        "partOfSpeech": "v.",
        "chinese": "回报，回应；报答",
        "example": ""
      },
      {
        "id": "word-47-5",
        "english": "gregarious",
        "phonetic": "/grɪˈgeərɪəs/",
        "partOfSpeech": "a.",
        "chinese": "群居的；合群的；爱交际的",
        "example": ""
      },
      {
        "id": "word-48-62",
        "english": "modish",
        "phonetic": "/ˈməudɪʃ/",
        "partOfSpeech": "a.",
        "chinese": "流行的，时髦的",
        "example": ""
      },
      {
        "id": "word-47-17",
        "english": "prosper",
        "phonetic": "/ˈprɔspə(r)/",
        "partOfSpeech": "vi.",
        "chinese": "繁荣，兴旺；成功",
        "example": ""
      },
      {
        "id": "word-48-38",
        "english": "hook*",
        "phonetic": "/huk/",
        "partOfSpeech": "n.",
        "chinese": "钩，吊钩，钩状物 v. （使）钩住，挂住；钓（鱼）",
        "example": ""
      },
      {
        "id": "word-48-80",
        "english": "diffuse",
        "phonetic": "/dɪˈfjuːz/",
        "partOfSpeech": "v.",
        "chinese": "散布，传播；（光等）漫射；（使气体或液体）扩散，弥漫 /dɪˈfjuːs/ a. 扩散的，漫射的；（文章等）冗长的，难解的",
        "example": ""
      },
      {
        "id": "word-48-21",
        "english": "agile",
        "phonetic": "/ˈædʒaɪl/",
        "partOfSpeech": "a.",
        "chinese": "敏捷的，灵活的，机敏的",
        "example": ""
      },
      {
        "id": "word-47-20",
        "english": "anchor",
        "phonetic": "/ˈæŋkə(r)/",
        "partOfSpeech": "n.",
        "chinese": "锚；给人安全感的人（或物）；精神支柱；顶梁柱 v. 抛锚；使固定，系牢；使基于；主持（电视节目等）",
        "example": ""
      },
      {
        "id": "word-47-36",
        "english": "prolonged",
        "phonetic": "[prəˈlɒŋd]",
        "partOfSpeech": "a.",
        "chinese": "持久的，长期的",
        "example": ""
      },
      {
        "id": "word-47-57",
        "english": "spare*",
        "phonetic": "/speə(r)/",
        "partOfSpeech": "a.",
        "chinese": "闲置的；备用的，外加的；空闲的 v. 省出，抽出（时间等）；饶恕，赦免；免去；不吝惜（时间、金钱等） n. 备用品；[pl.] 配件",
        "example": ""
      },
      {
        "id": "word-48-43",
        "english": "glacier",
        "phonetic": "/ˈglæsɪə(r)/",
        "partOfSpeech": "n.",
        "chinese": "冰川，冰河",
        "example": ""
      },
      {
        "id": "word-47-77",
        "english": "predator",
        "phonetic": "/ˈpredətə(r)/",
        "partOfSpeech": "n.",
        "chinese": "捕食性动物；食肉动物；奴役他人者（尤指在财务或性关系上面）；剥削者，掠夺者",
        "example": ""
      },
      {
        "id": "word-47-8",
        "english": "infringe",
        "phonetic": "/ɪnˈfrɪndʒ/",
        "partOfSpeech": "v.",
        "chinese": "侵犯，侵害；违背，触犯（法规）；干涉，干扰",
        "example": ""
      },
      {
        "id": "word-48-22",
        "english": "tribal",
        "phonetic": "/ˈtraɪbl/",
        "partOfSpeech": "a.",
        "chinese": "部落的，部族的；集团意识强的",
        "example": ""
      },
      {
        "id": "word-47-37",
        "english": "crushing",
        "phonetic": "[ˈkrʌʃɪŋ]",
        "partOfSpeech": "a.",
        "chinese": "惨重的，毁灭性的；压倒的，决定性的",
        "example": ""
      },
      {
        "id": "word-48-44",
        "english": "hereditary",
        "phonetic": "/hɪˈredɪtrɪ/",
        "partOfSpeech": "a.",
        "chinese": "（尤指疾病）遗传的，遗传性的；可继承的，世袭的",
        "example": ""
      },
      {
        "id": "word-48-45",
        "english": "discharge",
        "phonetic": "/ˈdɪstʃɑːdʒ/",
        "partOfSpeech": "n.",
        "chinese": "排出（物）；获准离开，免职；履行，执行；（债务的）清偿 /dɪsˈtʃɑːdʒ/ v. 解雇；释放；排出，放出；放（电）；完成，履行",
        "example": ""
      },
      {
        "id": "word-47-69",
        "english": "axle",
        "phonetic": "/ˈæksl/",
        "partOfSpeech": "n.",
        "chinese": "车轴，轮轴",
        "example": ""
      },
      {
        "id": "word-48-78",
        "english": "vicious",
        "phonetic": "/ˈvɪʃəs/",
        "partOfSpeech": "a.",
        "chinese": "罪恶的，邪恶的；残酷的；残忍的；凶猛的；恶性的",
        "example": ""
      },
      {
        "id": "word-47-76",
        "english": "eco-friendly",
        "phonetic": "{ˌiːkəuˈfrendlɪ}",
        "partOfSpeech": "a.",
        "chinese": "环保的",
        "example": ""
      },
      {
        "id": "word-47-66",
        "english": "pad",
        "phonetic": "/pæd/",
        "partOfSpeech": "n.",
        "chinese": "软垫；便笺本 v. （用软材料）堵塞；蹑手蹑脚地走",
        "example": ""
      },
      {
        "id": "word-47-27",
        "english": "lenient",
        "phonetic": "/ˈliːnɪənt/",
        "partOfSpeech": "a.",
        "chinese": "（执法时）宽大的，宽容的；厚道的，仁慈的",
        "example": ""
      },
      {
        "id": "word-47-15",
        "english": "retaliate",
        "phonetic": "/rɪˈtælɪeɪt/",
        "partOfSpeech": "vi.",
        "chinese": "报复，反击；复仇",
        "example": ""
      },
      {
        "id": "word-48-72",
        "english": "elaboration",
        "phonetic": "[ɪˌlæbə'reɪʃn]",
        "partOfSpeech": "n.",
        "chinese": "精心之作；详尽阐述",
        "example": ""
      },
      {
        "id": "word-47-67",
        "english": "unblemished",
        "phonetic": "[ʌnˈblemɪʃt]",
        "partOfSpeech": "a.",
        "chinese": "无瑕疵的，完好的",
        "example": ""
      },
      {
        "id": "word-47-39",
        "english": "edify",
        "phonetic": "/ˈedɪfaɪ/",
        "partOfSpeech": "v.",
        "chinese": "陶冶，教化；启发，启迪",
        "example": ""
      },
      {
        "id": "word-48-70",
        "english": "enlist",
        "phonetic": "/ɪnˈlɪst/",
        "partOfSpeech": "v.",
        "chinese": "征募；从军，参军；谋取（帮助，支持等）",
        "example": ""
      },
      {
        "id": "word-47-22",
        "english": "discourteous",
        "phonetic": "/dɪsˈkɜːtɪəs/",
        "partOfSpeech": "a.",
        "chinese": "无礼的，粗鲁的",
        "example": ""
      },
      {
        "id": "word-47-35",
        "english": "rampant",
        "phonetic": "/ˈræmpənt/",
        "partOfSpeech": "a.",
        "chinese": "（犯罪、疾病等）猖獗的，肆虐的，泛滥的；（植物）蔓生的，疯长的",
        "example": ""
      },
      {
        "id": "word-47-13",
        "english": "barbaric",
        "phonetic": "/bɑːˈbærɪk/",
        "partOfSpeech": "a.",
        "chinese": "野蛮的，粗鲁的；残暴的，残忍的；原始部落的",
        "example": ""
      },
      {
        "id": "word-48-6",
        "english": "antiseptic",
        "phonetic": "/ˏæntɪˈseptɪk/",
        "partOfSpeech": "a.",
        "chinese": "防腐的，抗菌的 n. 防腐剂，抗菌剂",
        "example": ""
      },
      {
        "id": "word-48-19",
        "english": "malt",
        "phonetic": "/mɔːlt/",
        "partOfSpeech": "n.",
        "chinese": "麦芽；麦芽酒 v. 把……制成麦芽；（谷物）变成麦芽",
        "example": ""
      },
      {
        "id": "word-48-35",
        "english": "differentiate",
        "phonetic": "/ˏdɪfəˈrenʃɪeɪt/",
        "partOfSpeech": "v.",
        "chinese": "区分，区别；差别对待，区别对待",
        "example": ""
      },
      {
        "id": "word-48-18",
        "english": "bead",
        "phonetic": "/biːd/",
        "partOfSpeech": "n.",
        "chinese": "珠子；（水、血、汗的）小滴",
        "example": ""
      },
      {
        "id": "word-48-7",
        "english": "indolent",
        "phonetic": "/ˈɪndələnt/",
        "partOfSpeech": "a.",
        "chinese": "懒惰的，倦怠的；不活跃的，无行动的",
        "example": ""
      },
      {
        "id": "word-48-26",
        "english": "overexploit",
        "phonetic": "[ˏəʊvərɪkˈsplɔɪt]",
        "partOfSpeech": "vt.",
        "chinese": "过度开采",
        "example": ""
      },
      {
        "id": "word-47-48",
        "english": "solar-powered",
        "phonetic": "['səʊlə",
        "partOfSpeech": "",
        "chinese": "paʊəd] a. 由太阳能驱动的",
        "example": ""
      },
      {
        "id": "word-48-68",
        "english": "grudge",
        "phonetic": "/grʌdʒ/",
        "partOfSpeech": "n.",
        "chinese": "不满，积怨，怀恨 v. 勉强做；不情愿地给，吝惜",
        "example": ""
      },
      {
        "id": "word-48-51",
        "english": "insidious",
        "phonetic": "/ɪnˈsɪdɪəs/",
        "partOfSpeech": "a.",
        "chinese": "潜伏的，隐伏的",
        "example": ""
      },
      {
        "id": "word-47-1",
        "english": "obscene",
        "phonetic": "/əbˈsiːn/",
        "partOfSpeech": "a.",
        "chinese": "淫秽的，猥亵的，下流的；可憎的，可恶的；（数量）大得惊人的，骇人听闻的",
        "example": ""
      },
      {
        "id": "word-48-28",
        "english": "inculcate",
        "phonetic": "/ˈɪnkʌlkeɪt/",
        "partOfSpeech": "vt.",
        "chinese": "谆谆教诲，反复灌输",
        "example": ""
      },
      {
        "id": "word-47-11",
        "english": "algebra",
        "phonetic": "/ˈældʒɪbrə/",
        "partOfSpeech": "n.",
        "chinese": "代数",
        "example": ""
      },
      {
        "id": "word-48-3",
        "english": "trespass",
        "phonetic": "/ˈtrespəs/",
        "partOfSpeech": "vi.",
        "chinese": "侵犯（某人的财产）；擅闯（某人的领地）；利用（某物）；冒犯，触犯",
        "example": ""
      },
      {
        "id": "word-47-64",
        "english": "slacken",
        "phonetic": "/ˈslækən/",
        "partOfSpeech": "v.",
        "chinese": "（使）松弛，放松；放慢；萧条",
        "example": ""
      },
      {
        "id": "word-48-10",
        "english": "dupe",
        "phonetic": "/djuːp/",
        "partOfSpeech": "n.",
        "chinese": "上当者，受骗者 vt. 欺骗，愚弄",
        "example": ""
      },
      {
        "id": "word-48-56",
        "english": "tillable",
        "phonetic": "['tɪləbl]",
        "partOfSpeech": "a.",
        "chinese": "适宜耕种的，可耕种的",
        "example": ""
      },
      {
        "id": "word-48-76",
        "english": "bleak",
        "phonetic": "/bliːk/",
        "partOfSpeech": "a.",
        "chinese": "寒冷的，阴沉的，阴郁的，暗淡的；没有希望的，不乐观的；荒凉的；索然无味的",
        "example": ""
      },
      {
        "id": "word-48-9",
        "english": "nutritious",
        "phonetic": "[njuˈtrɪʃəs]",
        "partOfSpeech": "a.",
        "chinese": "有营养的，营养丰富的",
        "example": ""
      },
      {
        "id": "word-48-61",
        "english": "isolated",
        "phonetic": "['aɪsəleɪtɪd]",
        "partOfSpeech": "a.",
        "chinese": "隔离的，分离的；与世隔绝的，偏僻的；孤立的，孤独的；个别的",
        "example": ""
      },
      {
        "id": "word-47-10",
        "english": "transplant",
        "phonetic": "/trænsˈplɑːnt/",
        "partOfSpeech": "vt.",
        "chinese": "移栽，移种（植物等）；移植（器官等）；使迁移，使移居 /ˈtrænsplɑːnt/ n. （器官等的）移植",
        "example": ""
      },
      {
        "id": "word-48-79",
        "english": "begrudge",
        "phonetic": "/bɪˈgrʌdʒ/",
        "partOfSpeech": "vt.",
        "chinese": "对……感到不满；嫉妒；勉强做，不乐意地做",
        "example": ""
      },
      {
        "id": "word-48-27",
        "english": "grill*",
        "phonetic": "/grɪl/",
        "partOfSpeech": "vt.",
        "chinese": "烧烤；拷问，盘问 n. 烤架",
        "example": ""
      },
      {
        "id": "word-48-5",
        "english": "susceptible",
        "phonetic": "/səˈseptəbl/",
        "partOfSpeech": "a.",
        "chinese": "易受影响的，易受伤害的；易受感染的；（人）敏感的，易动感情的；能经受……的，容许……的",
        "example": ""
      },
      {
        "id": "word-48-11",
        "english": "overfill*",
        "phonetic": "['əʊvə'fɪl]",
        "partOfSpeech": "v.",
        "chinese": "装得太多，装到满溢",
        "example": ""
      },
      {
        "id": "word-47-47",
        "english": "crystallize",
        "phonetic": "[ˈkrɪstəlaɪz]",
        "partOfSpeech": "v.",
        "chinese": "（使）结晶；（使）变明确",
        "example": ""
      },
      {
        "id": "word-48-31",
        "english": "invasive",
        "phonetic": "/ɪnˈveɪsɪv/",
        "partOfSpeech": "a.",
        "chinese": "侵略的，入侵的；（疾病等）侵袭的，扩散的；切入的，开刀的",
        "example": ""
      },
      {
        "id": "word-48-49",
        "english": "inalienable",
        "phonetic": "/ɪnˈeɪlɪənəbl/",
        "partOfSpeech": "a.",
        "chinese": "不可剥夺的，不可分割的",
        "example": ""
      },
      {
        "id": "word-48-41",
        "english": "infiltrate",
        "phonetic": "/ˈɪnfɪltreɪt/",
        "partOfSpeech": "v.",
        "chinese": "（使）悄悄进入，潜入；渗入，渗透",
        "example": ""
      },
      {
        "id": "word-48-1",
        "english": "telegraph",
        "phonetic": "/ˈtelɪgrɑːf/",
        "partOfSpeech": "n.",
        "chinese": "电报机；电报 v. 打电报，发电报；（无意中）泄露，流露",
        "example": ""
      },
      {
        "id": "word-48-47",
        "english": "supportive*",
        "phonetic": "[səˈpɔ:tɪv]",
        "partOfSpeech": "a.",
        "chinese": "支持的，支援的；赞助的；鼓励的；同情的",
        "example": ""
      },
      {
        "id": "word-47-9",
        "english": "comic*",
        "phonetic": "/ˈkɔmɪk/",
        "partOfSpeech": "a.",
        "chinese": "可笑的，滑稽的；喜剧的 n. 喜剧演员",
        "example": ""
      },
      {
        "id": "word-47-54",
        "english": "faulty",
        "phonetic": "['fɔ:ltɪ]",
        "partOfSpeech": "a.",
        "chinese": "有错误的，有缺点的；不完美的",
        "example": ""
      },
      {
        "id": "word-47-14",
        "english": "delinquent",
        "phonetic": "/dɪˈlɪŋkwənt/",
        "partOfSpeech": "a.",
        "chinese": "失职的；违法的；拖欠的 n. 违法者，罪犯（尤指少年犯）",
        "example": ""
      },
      {
        "id": "word-47-45",
        "english": "stipulate",
        "phonetic": "/ˈstɪpjuleɪt/",
        "partOfSpeech": "v.",
        "chinese": "规定，明确要求；（作为条件）讲定，约定",
        "example": ""
      },
      {
        "id": "word-47-19",
        "english": "sluttish",
        "phonetic": "{ˈslʌtɪʃ}",
        "partOfSpeech": "a.",
        "chinese": "懒惰的，邋遢的；放荡的",
        "example": ""
      },
      {
        "id": "word-47-41",
        "english": "core",
        "phonetic": "/kɔː(r)/",
        "partOfSpeech": "n.",
        "chinese": "果心，果核；（物体的）中心部分；核心、要点，精髓 vt. 去掉核",
        "example": ""
      },
      {
        "id": "word-48-16",
        "english": "virtuous",
        "phonetic": "['vɜ:tʃʊəs]",
        "partOfSpeech": "ad.",
        "chinese": "有道德的，品性好的，品德高的；自命清高的；贞洁的",
        "example": ""
      },
      {
        "id": "word-47-68",
        "english": "lounge",
        "phonetic": "/laundʒ/",
        "partOfSpeech": "vi.",
        "chinese": "懒洋洋地站（或坐、躺） n. 等候室；休息室",
        "example": ""
      },
      {
        "id": "word-47-46",
        "english": "legitimize",
        "phonetic": "[lɪ'dʒɪtəmaɪz]",
        "partOfSpeech": "vt.",
        "chinese": "使合法；赋予合法权利",
        "example": ""
      },
      {
        "id": "word-48-42",
        "english": "violate",
        "phonetic": "/ˈvaɪəleɪt/",
        "partOfSpeech": "vt.",
        "chinese": "违反，违犯，违背；亵渎，侵犯，干扰",
        "example": ""
      },
      {
        "id": "word-48-64",
        "english": "pine",
        "phonetic": "/paɪn/",
        "partOfSpeech": "v.",
        "chinese": "难过，悲伤 n. 松树，松木",
        "example": ""
      },
      {
        "id": "word-48-66",
        "english": "moss",
        "phonetic": "/mɔs/",
        "partOfSpeech": "n.",
        "chinese": "苔藓",
        "example": ""
      },
      {
        "id": "word-47-73",
        "english": "corporal",
        "phonetic": "/ˈkɔːpərəl/",
        "partOfSpeech": "a.",
        "chinese": "肉体的，身体的 n. （陆军或空军）下士",
        "example": ""
      },
      {
        "id": "word-48-74",
        "english": "magnet",
        "phonetic": "/ˈmægnɪt/",
        "partOfSpeech": "n.",
        "chinese": "磁铁，磁石；磁体；有吸引力的人或物",
        "example": ""
      },
      {
        "id": "word-48-14",
        "english": "slander",
        "phonetic": "/ˈslɑːndə(r)/",
        "partOfSpeech": "n.",
        "chinese": "诋毁，中伤，诽谤（罪） vt. 诋毁，诽谤",
        "example": ""
      },
      {
        "id": "word-48-53",
        "english": "astronomy",
        "phonetic": "/əˈstrɔnəmɪ/",
        "partOfSpeech": "n.",
        "chinese": "天文学",
        "example": ""
      },
      {
        "id": "word-48-17",
        "english": "superstitious",
        "phonetic": "[ˌsu:pəˈstɪʃəs]",
        "partOfSpeech": "a.",
        "chinese": "迷信的；根据迷信的，由迷信引起的；受迷信思想支配的",
        "example": ""
      },
      {
        "id": "word-47-71",
        "english": "hamper",
        "phonetic": "/ˈhæmpə(r)/",
        "partOfSpeech": "vt.",
        "chinese": "妨碍，阻挠 n. 有盖的大篮子；盒装食物",
        "example": ""
      },
      {
        "id": "word-48-50",
        "english": "savour",
        "phonetic": "/ˈseɪvə(r)/",
        "partOfSpeech": "vt.",
        "chinese": "品尝，品味；欣赏；体会，体味 n. 味道，风味；情趣，吸引力",
        "example": ""
      },
      {
        "id": "word-48-8",
        "english": "thrifty",
        "phonetic": "[ˈθrɪfti]",
        "partOfSpeech": "a.",
        "chinese": "节俭的，节约的",
        "example": ""
      },
      {
        "id": "word-47-62",
        "english": "eccentric",
        "phonetic": "/ɪkˈsentrɪk/",
        "partOfSpeech": "a.",
        "chinese": "古怪的，反常的 n. 古怪的人",
        "example": ""
      },
      {
        "id": "word-48-13",
        "english": "penalize",
        "phonetic": "/ˈpiːnəlaɪz/",
        "partOfSpeech": "vt.",
        "chinese": "惩罚，处罚；判罚；使处于不利地位",
        "example": ""
      },
      {
        "id": "word-48-57",
        "english": "overgraze",
        "phonetic": "[ˌəʊvə'ɡreɪz]",
        "partOfSpeech": "v.",
        "chinese": "过度放牧",
        "example": ""
      },
      {
        "id": "word-48-63",
        "english": "maltreat",
        "phonetic": "/ˏmælˈtriːt/",
        "partOfSpeech": "vt.",
        "chinese": "虐待",
        "example": ""
      },
      {
        "id": "word-48-55",
        "english": "segregate",
        "phonetic": "/ˈsegrɪgeɪt/",
        "partOfSpeech": "vt.",
        "chinese": "隔离，（使）分开",
        "example": ""
      },
      {
        "id": "word-47-42",
        "english": "inborn",
        "phonetic": "/ˏɪnˈbɔːn/",
        "partOfSpeech": "a.",
        "chinese": "天生的，先天的，天赋的",
        "example": ""
      },
      {
        "id": "word-47-75",
        "english": "criterion",
        "phonetic": "/kraɪˈtɪərɪən/",
        "partOfSpeech": "n.",
        "chinese": "标准，准则",
        "example": ""
      },
      {
        "id": "word-47-59",
        "english": "semantic",
        "phonetic": "/sɪˈmæntɪk/",
        "partOfSpeech": "a.",
        "chinese": "语义的",
        "example": ""
      },
      {
        "id": "word-48-25",
        "english": "antibiotic",
        "phonetic": "/ˏæntɪbaɪˈɔtɪk/",
        "partOfSpeech": "n.",
        "chinese": "抗生素，抗菌素 a. 抗菌的",
        "example": ""
      },
      {
        "id": "word-48-39",
        "english": "tighten",
        "phonetic": "['taɪtn]",
        "partOfSpeech": "v.",
        "chinese": "（使）变紧；使更加严格，加强",
        "example": ""
      },
      {
        "id": "word-47-44",
        "english": "ecological",
        "phonetic": "[ˌi:kəˈlɒdʒɪkl]",
        "partOfSpeech": "a.",
        "chinese": "生态学的，生态的",
        "example": ""
      },
      {
        "id": "word-47-63",
        "english": "inferior",
        "phonetic": "/ɪnˈfɪərɪə(r)/",
        "partOfSpeech": "a.",
        "chinese": "较差的，次的，低劣的；级别低的，较低的 n. 下级；下属，晚辈",
        "example": ""
      },
      {
        "id": "word-47-58",
        "english": "nursery*",
        "phonetic": "/ˈnɜːsərɪ/",
        "partOfSpeech": "a.",
        "chinese": "幼儿教育的 n. 托儿所；苗圃",
        "example": ""
      },
      {
        "id": "word-48-73",
        "english": "snobbish",
        "phonetic": "[ˈsnɒbɪʃ]",
        "partOfSpeech": "a.",
        "chinese": "势利的，谄上欺下的；自命不凡的",
        "example": ""
      },
      {
        "id": "word-47-55",
        "english": "enigma",
        "phonetic": "/ɪˈnɪgmə/",
        "partOfSpeech": "n.",
        "chinese": "迷，迷一样的人或事",
        "example": ""
      },
      {
        "id": "word-48-15",
        "english": "restore",
        "phonetic": "/rɪˈstɔː(r)/",
        "partOfSpeech": "vt.",
        "chinese": "恢复，使复位；修复，整修，重建；归还，交还",
        "example": ""
      },
      {
        "id": "word-48-40",
        "english": "humane",
        "phonetic": "/hjuːˈmeɪn/",
        "partOfSpeech": "a.",
        "chinese": "善良的，人道的，仁慈的，慈悲的；（指学科）促进文明或教化的，人文的",
        "example": ""
      },
      {
        "id": "word-47-51",
        "english": "unsanitary",
        "phonetic": "[ʌnˈsænətri]",
        "partOfSpeech": "a.",
        "chinese": "不卫生的（= insanitary）",
        "example": ""
      },
      {
        "id": "word-47-43",
        "english": "habitable",
        "phonetic": "/ˈhæbɪtəbl/",
        "partOfSpeech": "a.",
        "chinese": "适于居住的，可居住的",
        "example": ""
      },
      {
        "id": "word-47-72",
        "english": "disparage",
        "phonetic": "/dɪˈspærɪdʒ/",
        "partOfSpeech": "vt.",
        "chinese": "贬抑，贬低；轻蔑，轻视",
        "example": ""
      },
      {
        "id": "word-47-50",
        "english": "roller",
        "phonetic": "/ˈrəulə(r)/",
        "partOfSpeech": "n.",
        "chinese": "滚筒；滚轴",
        "example": ""
      },
      {
        "id": "word-47-49",
        "english": "cosy",
        "phonetic": "/ˋkəuzɪ/",
        "partOfSpeech": "a.",
        "chinese": "舒适的，安逸的",
        "example": ""
      },
      {
        "id": "word-47-52",
        "english": "condone",
        "phonetic": "/kənˈdəun/",
        "partOfSpeech": "v.",
        "chinese": "宽恕，赦免；纵容，容忍",
        "example": ""
      },
      {
        "id": "word-47-61",
        "english": "conductive",
        "phonetic": "[kənˈdʌktɪv]",
        "partOfSpeech": "a.",
        "chinese": "能传导电（或热）的，导电（或热）的",
        "example": ""
      },
      {
        "id": "word-48-2",
        "english": "episodic",
        "phonetic": "[ˌepɪˈsɒdɪk]",
        "partOfSpeech": "a.",
        "chinese": "偶然发生的，不定期的；由许多片段组成的，松散的",
        "example": ""
      },
      {
        "id": "word-47-70",
        "english": "dietary",
        "phonetic": "['daɪətərɪ]",
        "partOfSpeech": "a.",
        "chinese": "饮食的",
        "example": ""
      },
      {
        "id": "word-47-56",
        "english": "gill",
        "phonetic": "/gɪl/",
        "partOfSpeech": "n.",
        "chinese": "鳃",
        "example": ""
      },
      {
        "id": "word-47-53",
        "english": "bereave",
        "phonetic": "/bɪˈriːv/",
        "partOfSpeech": "vt.",
        "chinese": "使丧失，剥夺",
        "example": ""
      },
      {
        "id": "word-47-60",
        "english": "barren",
        "phonetic": "/ˈbærən/",
        "partOfSpeech": "a.",
        "chinese": "（土地等）贫瘠的，荒芜的；不结果实的，不育的；无益的，无效果的",
        "example": ""
      },
      {
        "id": "word-47-74",
        "english": "libel",
        "phonetic": "/ˈlaɪbl/",
        "partOfSpeech": "n.",
        "chinese": "（文字）诽谤，中伤；诽谤性文字 vt. 诽谤，中伤，诬蔑",
        "example": ""
      }
    ],
    "article": "In the field of Environmental Science, researchers have been studying various phenomena to understand their implications. The concept of mentor has been widely discussed in recent studies. The concept of heartless has been widely discussed in recent studies. The concept of gene has been widely discussed in recent studies. The concept of perpetrate has been widely discussed in recent studies. The concept of despoil has been widely discussed in recent studies. The concept of precede has been widely discussed in recent studies. The concept of prevalence has been widely discussed in recent studies. The concept of purify has been widely discussed in recent studies. The concept of disobey has been widely discussed in recent studies. The concept of embody has been widely discussed in recent studies. Researchers have found that these factors play a significant role in shaping our understanding of the subject. Further studies are needed to explore the full implications of these findings."
  },
  {
    "id": "unit-test",
    "name": "Unit Test: 5 Words",
    "words": [
      {
        "id": "test-word-1",
        "english": "apple",
        "phonetic": "/ˈæpl/",
        "partOfSpeech": "n.",
        "chinese": "苹果",
        "example": "I eat an apple every day."
      },
      {
        "id": "test-word-2",
        "english": "banana",
        "phonetic": "/bəˈnɑːnə/",
        "partOfSpeech": "n.",
        "chinese": "香蕉",
        "example": "Bananas are rich in potassium."
      },
      {
        "id": "test-word-3",
        "english": "cherry",
        "phonetic": "/ˈtʃeri/",
        "partOfSpeech": "n.",
        "chinese": "樱桃",
        "example": "Cherries are delicious."
      },
      {
        "id": "test-word-4",
        "english": "date",
        "phonetic": "/deɪt/",
        "partOfSpeech": "n.",
        "chinese": "枣",
        "example": "Dates are sweet."
      },
      {
        "id": "test-word-5",
        "english": "elderberry",
        "phonetic": "/ˈeldəberi/",
        "partOfSpeech": "n.",
        "chinese": "接骨木浆果",
        "example": "Elderberries are used in jams."
      }
    ],
    "article": "I went to the fruit market and bought some apple, banana, cherry, date, and elderberry. They were all fresh and delicious. The apple was crisp, the banana was ripe, the cherry was sweet, the date was soft, and the elderberry was tart. I enjoyed eating them all."
  }
];

// 初始化数据
export const initializeData = (): UserData => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      // 兼容处理：将字符串格式的article转换为Article对象格式
      parsedData.units = parsedData.units.map((unit: any) => {
        if (typeof unit.article === 'string') {
          const englishText = unit.article;
          // 生成简单的中文翻译（这里使用占位符，实际应该使用真实翻译）
          const chineseText = generateChineseTranslation(englishText);
          unit.article = {
            english: englishText,
            chinese: chineseText
          };
        }
        return unit;
      });
      return parsedData;
    } catch (error) {
      console.error('Failed to parse stored data:', error);
    }
  }
  
  // 处理默认单元数据
  const processedUnits = defaultUnits.map((unit, index) => {
    // 第一个单元使用unit1.md的文章内容
    if (index === 0) {
      return {
        ...unit,
        article: unit1Article
      };
    }
    // 第二个单元使用unit2.md的文章内容
    if (index === 1) {
      return {
        ...unit,
        article: unit2Article
      };
    }
    // 其他单元使用自动生成的翻译
    if (typeof unit.article === 'string') {
      const englishText = unit.article;
      const chineseText = generateChineseTranslation(englishText);
      return {
        ...unit,
        article: {
          english: englishText,
          chinese: chineseText
        }
      };
    }
    return unit;
  });
  
  const initialData: UserData = {
    units: processedUnits,
    testResults: [],
    testProgress: [],
    currentUnitId: 'unit-1'
  };
  
  saveData(initialData);
  return initialData;
};

// 生成中文翻译的辅助函数
const generateChineseTranslation = (englishText: string): string => {
  // 这里是一个简单的示例翻译逻辑
  // 实际应用中，应该使用真实的翻译数据
  const translations: { [key: string]: string } = {
    'Technological Innovation': '技术创新',
    'Cultural Exchange': '文化交流',
    'Scientific Discovery': '科学发现',
    'Educational Research': '教育研究',
    'Economic Development': '经济发展',
    'Environmental Science': '环境科学',
    'Health and Medicine': '健康与医学',
    'researchers have been studying various phenomena to understand their implications': '研究人员一直在研究各种现象以了解其影响',
    'has been widely discussed in recent studies': '在近期的研究中被广泛讨论',
    'Researchers have found that these factors play a significant role in shaping our understanding of the subject': '研究人员发现这些因素在塑造我们对该主题的理解方面发挥着重要作用',
    'Further studies are needed to explore the full implications of these findings': '需要进一步研究以探索这些发现的全部含义',
    'The concept of': '...的概念',
    'In the field of': '在...领域',
  };
  
  let chineseText = englishText;
  
  // 替换已知短语
  Object.entries(translations).forEach(([english, chinese]) => {
    chineseText = chineseText.replace(new RegExp(english, 'g'), chinese);
  });
  
  // 如果文本没有被翻译（还是英文），返回一个默认的中文提示
  if (chineseText === englishText) {
    return '【中文翻译】' + englishText;
  }
  
  return chineseText;
};

// 保存数据
export const saveData = (data: UserData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// 获取数据
export const getData = (): UserData => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      // 兼容处理：将字符串格式的article转换为Article对象格式
      let needsUpdate = false;
      parsedData.units = parsedData.units.map((unit: any, index: number) => {
        // 第一个单元总是使用unit1Article
        if (index === 0) {
          // 检查是否需要更新（如果当前不是unit1Article的新格式，即sections格式）
          const isSectionsFormat = typeof unit.article === 'object' && 
                                   unit.article !== null && 
                                   'sections' in unit.article && 
                                   Array.isArray(unit.article.sections);
          if (typeof unit.article === 'string' || !isSectionsFormat) {
            needsUpdate = true;
            unit.article = unit1Article;
          }
          return unit;
        }
        // 第二个单元总是使用unit2Article
        if (index === 1) {
          // 检查是否需要更新（如果当前不是unit2Article的新格式，即sections格式）
          const isSectionsFormat = typeof unit.article === 'object' && 
                                   unit.article !== null && 
                                   'sections' in unit.article && 
                                   Array.isArray(unit.article.sections);
          if (typeof unit.article === 'string' || !isSectionsFormat) {
            needsUpdate = true;
            unit.article = unit2Article;
          }
          return unit;
        }
        if (typeof unit.article === 'string') {
          needsUpdate = true;
          const englishText = unit.article;
          const chineseText = generateChineseTranslation(englishText);
          unit.article = {
            english: englishText,
            chinese: chineseText
          };
        }
        return unit;
      });
      // 如果有数据被转换，保存更新后的数据
      if (needsUpdate) {
        saveData(parsedData);
      }
      return parsedData;
    } catch (error) {
      console.error('Failed to parse stored data:', error);
    }
  }
  return initializeData();
};

// 保存测试结果
export const saveTestResult = (unitId: string, score: number, total: number): void => {
  const data = getData();
  const testResult: TestResult = {
    unitId,
    score,
    total,
    date: new Date().toISOString()
  };
  data.testResults.push(testResult);
  saveData(data);
};

// 获取单元的最高分数
export const getHighestScore = (unitId: string): number => {
  const data = getData();
  const unitResults = data.testResults.filter(result => result.unitId === unitId);
  if (unitResults.length === 0) return 0;
  return Math.max(...unitResults.map(result => result.score));
};

// 获取单元的测试次数
export const getTestCount = (unitId: string): number => {
  const data = getData();
  return data.testResults.filter(result => result.unitId === unitId).length;
};

// 更新当前单元
export const setCurrentUnit = (unitId: string): void => {
  const data = getData();
  data.currentUnitId = unitId;
  saveData(data);
};

// 保存测试进度
export const saveTestProgress = (progress: TestProgress): void => {
  const data = getData();
  if (!data.testProgress) {
    data.testProgress = [];
  }
  const existingIndex = data.testProgress.findIndex(p => p.unitId === progress.unitId);
  if (existingIndex >= 0) {
    data.testProgress[existingIndex] = progress;
  } else {
    data.testProgress.push(progress);
  }
  saveData(data);
};

// 获取测试进度
export const getTestProgress = (unitId: string): TestProgress | null => {
  const data = getData();
  if (!data.testProgress) {
    return null;
  }
  return data.testProgress.find(p => p.unitId === unitId) || null;
};

// 清除测试进度
export const clearTestProgress = (unitId: string): void => {
  const data = getData();
  if (data.testProgress) {
    data.testProgress = data.testProgress.filter(p => p.unitId !== unitId);
    saveData(data);
  }
};

// 保存学习进度
export const saveLearningProgress = (progress: { unitId: string; unitName: string; activeTab: string; sectionIndex?: number; paragraphIndex?: number }): void => {
  const data = getData();
  data.lastLearningProgress = {
    ...progress,
    lastLearningTime: new Date().toISOString()
  };
  saveData(data);
};

// 获取学习进度
export const getLearningProgress = () => {
  const data = getData();
  return data.lastLearningProgress;
};

// 清除学习进度
export const clearLearningProgress = (): void => {
  const data = getData();
  delete data.lastLearningProgress;
  saveData(data);
};

// 保存单词的"太简单"标记状态
export const saveWordTooEasyStatus = (unitId: string, wordId: string, isTooEasy: boolean): void => {
  const data = getData();
  const unit = data.units.find(u => u.id === unitId);
  if (unit) {
    const word = unit.words.find(w => w.id === wordId);
    if (word) {
      word.isTooEasy = isTooEasy;
      saveData(data);
    }
  }
};

// 获取单元中标记为太简单的单词ID列表
export const getTooEasyWordIds = (unitId: string): string[] => {
  const data = getData();
  const unit = data.units.find(u => u.id === unitId);
  if (unit) {
    return unit.words.filter(w => w.isTooEasy).map(w => w.id);
  }
  return [];
};

// 获取单元中需要学习的单词（排除太简单的）
export const getStudyWords = (unitId: string) => {
  const data = getData();
  const unit = data.units.find(u => u.id === unitId);
  if (unit) {
    return unit.words.filter(w => !w.isTooEasy);
  }
  return [];
};

// 保存段落阅读进度
export const saveParagraphReadStatus = (unitId: string, sectionIndex: number, paragraphIndex: number, isRead: boolean): void => {
  const data = getData();
  if (!data.articleReadingProgress) {
    data.articleReadingProgress = [];
  }
  
  let unitProgress = data.articleReadingProgress.find(p => p.unitId === unitId);
  if (!unitProgress) {
    unitProgress = {
      unitId,
      readParagraphs: [],
      lastReadTime: new Date().toISOString()
    };
    data.articleReadingProgress.push(unitProgress);
  }
  
  const existingIndex = unitProgress.readParagraphs.findIndex(
    p => p.sectionIndex === sectionIndex && p.paragraphIndex === paragraphIndex
  );
  
  if (isRead) {
    // 标记为已读
    if (existingIndex >= 0) {
      unitProgress.readParagraphs[existingIndex].isRead = true;
      unitProgress.readParagraphs[existingIndex].readTime = new Date().toISOString();
    } else {
      unitProgress.readParagraphs.push({
        sectionIndex,
        paragraphIndex,
        isRead: true,
        readTime: new Date().toISOString()
      });
    }
  } else {
    // 取消已读标记
    if (existingIndex >= 0) {
      unitProgress.readParagraphs.splice(existingIndex, 1);
    }
  }
  
  unitProgress.lastReadTime = new Date().toISOString();
  saveData(data);
};

// 获取单元的文章阅读进度
export const getArticleReadingProgress = (unitId: string) => {
  const data = getData();
  return data.articleReadingProgress?.find(p => p.unitId === unitId);
};

// 获取已读段落数量
export const getReadParagraphCount = (unitId: string): number => {
  const progress = getArticleReadingProgress(unitId);
  return progress?.readParagraphs.filter(p => p.isRead).length || 0;
};

// 检查段落是否已读
export const isParagraphRead = (unitId: string, sectionIndex: number, paragraphIndex: number): boolean => {
  const progress = getArticleReadingProgress(unitId);
  if (!progress) return false;
  return progress.readParagraphs.some(
    p => p.sectionIndex === sectionIndex && p.paragraphIndex === paragraphIndex && p.isRead
  );
};

// 获取总体学习进度
export const getOverallProgress = () => {
  const data = getData();
  
  let totalWords = 0;
  let studiedWords = 0;  // 标记为太简单的单词
  let totalParagraphs = 0;
  let readParagraphs = 0;
  let completedTests = 0;
  let totalUnits = data.units.length;
  
  data.units.forEach(unit => {
    // 统计单词
    totalWords += unit.words.length;
    studiedWords += unit.words.filter(w => w.isTooEasy).length;
    
    // 统计文章段落
    let unitParagraphs = 0;
    if (typeof unit.article === 'string') {
      unitParagraphs = 1;
    } else if ('sections' in unit.article && Array.isArray((unit.article as any).sections)) {
      const secs = (unit.article as any).sections;
      unitParagraphs = secs.reduce((sum: number, s: any) => sum + s.paragraphs.length, 0);
    } else if ('paragraphs' in unit.article && Array.isArray((unit.article as any).paragraphs)) {
      unitParagraphs = (unit.article as any).paragraphs.length;
    } else {
      unitParagraphs = 1;
    }
    totalParagraphs += unitParagraphs;
    
    // 统计已读段落
    const readingProgress = data.articleReadingProgress?.find(p => p.unitId === unit.id);
    if (readingProgress) {
      readParagraphs += readingProgress.readParagraphs.filter(p => p.isRead).length;
    }
    
    // 统计完成的测试（有测试记录且分数>0）
    const unitTests = data.testResults.filter(r => r.unitId === unit.id);
    if (unitTests.length > 0) {
      completedTests++;
    }
  });
  
  return {
    totalUnits,
    totalWords,
    studiedWords,
    wordsProgress: totalWords > 0 ? (studiedWords / totalWords) * 100 : 0,
    totalParagraphs,
    readParagraphs,
    readingProgress: totalParagraphs > 0 ? (readParagraphs / totalParagraphs) * 100 : 0,
    completedTests,
    testProgress: totalUnits > 0 ? (completedTests / totalUnits) * 100 : 0,
    overallProgress: (totalWords + totalParagraphs + totalUnits) > 0 
      ? ((studiedWords + readParagraphs + completedTests) / (totalWords + totalParagraphs + totalUnits)) * 100 
      : 0
  };
};
