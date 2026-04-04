"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import type { PropertyContext } from "../lib/ai-types";

// 动态加载 AI 面板（避免 SSR 问题）
const AIAdvisorPanel = dynamic(() => import("../components/AIAdvisorPanel"), { ssr: false });

// ==================== 数据配置 ====================

// 丹麦主要城市/区域房价参考（2026年数据）
export const REGION_PRICES: Record<string, { 
  name: string; avgPrice: number; trend: "up" | "down" | "stable"; 
}> = {
  kobenhavn: { name: "København", avgPrice: 55000, trend: "stable" },
  frederiksberg: { name: "Frederiksberg", avgPrice: 58000, trend: "stable" },
  gentofte: { name: "Gentofte", avgPrice: 65000, trend: "stable" },
  aarhus: { name: "Aarhus", avgPrice: 32000, trend: "up" },
  odense: { name: "Odense", avgPrice: 18000, trend: "stable" },
  aalborg: { name: "Aalborg", avgPrice: 16000, trend: "up" },
  esbjerg: { name: "Esbjerg", avgPrice: 14000, trend: "down" },
  randers: { name: "Randers", avgPrice: 12000, trend: "stable" },
  kolding: { name: "Kolding", avgPrice: 18000, trend: "up" },
  horsens: { name: "Horsens", avgPrice: 15000, trend: "up" },
  vejle: { name: "Vejle", avgPrice: 17000, trend: "up" },
  roskilde: { name: "Roskilde", avgPrice: 28000, trend: "up" },
  silkeborg: { name: "Silkeborg", avgPrice: 20000, trend: "up" },
  herning: { name: "Herning", avgPrice: 14000, trend: "up" },
  holstebro: { name: "Holstebro", avgPrice: 13000, trend: "stable" },
  viborg: { name: "Viborg", avgPrice: 13000, trend: "stable" },
  fredericia: { name: "Fredericia", avgPrice: 15000, trend: "stable" },
  middelfart: { name: "Middelfart", avgPrice: 18000, trend: "up" },
  thisted: { name: "Thisted", avgPrice: 10000, trend: "stable" },
  svendborg: { name: "Svendborg", avgPrice: 14000, trend: "stable" },
  holbæk: { name: "Holbæk", avgPrice: 15000, trend: "up" },
  køge: { name: "Køge", avgPrice: 23000, trend: "up" },
  nakskov: { name: "Nakskov", avgPrice: 8000, trend: "down" },
  frederikshavn: { name: "Frederikshavn", avgPrice: 9000, trend: "down" },
};

// 中介费结构（基于真实PDF）
const AGENT_FEE_ITEMS = {
  valuation: { price: 4500 },
  budget: { price: 5000 },
  materials: { price: 5750 },
  contract: { price: 6500 },
  aftercare: { price: 10000 },
  saleswork: { price: 10000 },
  baseTotal: 41750,
};

// 营销费用（基于真实PDF）
const MARKETING_ITEMS = {
  online: { price: 5000 },
  photos: { price: 5000 },
  digital: { price: 5250 },
  social: { price: 3000 },
  marketingTotal: 18250,
};

// 第三方支出
const THIRD_PARTY_FEES = {
  ejendomsdatarapport: { price: 105 },
  edh: { price: 473 },
  edokument: { price: 509 },
  thirdPartyTotal: 1087,
};

// 其他卖房费用（基于真实PDF）
const OTHER_SELLING_COSTS = {
  halfInsurance: { price: 7500 },
  reports: { price: 12695 },
  liability: { price: 1963 },
  digitalTinglysning: { price: 6250 },
  settlement: { price: 2250 },
  bankCosts: { price: 5695 },
};

// 买房固定费用
const BUYING_FIXED_COSTS = {
  berigtigelse: { price: 5500 },
  ejerskifteforsikring: { price: 8500 },
  tilstandsrapport: { price: 8700 },
  elrapport: { price: 3000 },
  energimrkning: { price: 1200 },
};

// 太阳能板数据
const SOLAR_DATA = {
  costPerKwp: 12000,
  areaPerKwp: 7,
  annualKwhPerKwp: 1000,
  electricityPrice: 2.5,
};

// 热泵数据
const HEATPUMP_DATA = {
  air: { cost: 150000, savings: 15000 },
  ground: { cost: 250000, savings: 20000 },
  annualHeatingCost: 20000,
};

// 窗户数据
const WINDOW_DATA = {
  costPerWindow: 8000,
};

// 保暖改造数据
const INSULATION_DATA = {
  wall: { costPerSqm: 800, saving: 15 },
  attic: { costPerSqm: 400, saving: 10 },
  floor: { costPerSqm: 600, saving: 8 },
};

// ==================== 计算函数 ====================

function calculateSellingCosts(price: number) {
  const agentFee = AGENT_FEE_ITEMS.baseTotal;
  const marketingFee = MARKETING_ITEMS.marketingTotal;
  const thirdParty = THIRD_PARTY_FEES.thirdPartyTotal;
  const otherCosts = OTHER_SELLING_COSTS.halfInsurance.price + 
                     OTHER_SELLING_COSTS.reports.price + 
                     OTHER_SELLING_COSTS.liability.price + 
                     OTHER_SELLING_COSTS.digitalTinglysning.price + 
                     OTHER_SELLING_COSTS.settlement.price + 
                     OTHER_SELLING_COSTS.bankCosts.price;
  
  const total = agentFee + marketingFee + thirdParty + otherCosts;
  
  return { agentFee, marketingFee, thirdParty, otherCosts, total, netProceeds: price - total };
}

function calculateBuyingCosts(price: number) {
  const tinglysning = price * 0.006;
  const fixedCosts = Object.values(BUYING_FIXED_COSTS).reduce((sum, item) => sum + item.price, 0);
  const total = tinglysning + fixedCosts;
  return { tinglysning, fixedCosts, total, totalWithPrice: price + total };
}

function calculateLoan(params: { price: number; downPaymentPercent: number; rate: number; years: number }) {
  const { price, downPaymentPercent, rate, years } = params;
  const loanAmount = price * (1 - downPaymentPercent / 100);
  const monthlyRate = rate / 100 / 12;
  const totalPayments = years * 12;
  
  if (monthlyRate === 0) {
    return { loanAmount, monthlyPayment: loanAmount / totalPayments, totalInterest: 0, totalPayment: loanAmount };
  }
  
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                        (Math.pow(1 + monthlyRate, totalPayments) - 1);
  const totalPayment = monthlyPayment * totalPayments;
  const totalInterest = totalPayment - loanAmount;
  
  return { loanAmount, monthlyPayment, totalInterest, totalPayment };
}

function generateAIAdvice(price: number, type: "buy" | "sell", lang: "da" | "en" | "zh") {
  const advice: Array<{ icon: string; text: string; type: "tip" | "warning" | "info" }> = [];
  
  if (type === "sell") {
    const costs = calculateSellingCosts(price);
    const costPercent = (costs.total / price) * 100;
    
    if (costPercent > 3) {
      advice.push({
        icon: "💡",
        text: lang === "da" ? `Salgomkostninger udgør ${costPercent.toFixed(1)}% af prisen. Overvej energiforbedringer før salg!` :
              lang === "en" ? `Selling costs are ${costPercent.toFixed(1)}% of price. Consider energy improvements before selling!` :
              `卖房费用占房价的${costPercent.toFixed(1)}%。考虑在卖房前进行能源改造！`,
        type: "tip",
      });
    }
    
    advice.push({
      icon: "📸",
      text: lang === "da" ? "Professionelle boligfotos kan øge salgspris med op til 2%." :
            lang === "en" ? "Professional property photos can increase sale price by up to 2%." :
            "专业房产照片可将售价提高高达2%。",
      type: "info",
    });
  }
  
  if (type === "buy") {
    advice.push({
      icon: "🔍",
      text: lang === "da" ? "Få altid en tilstandsrapport før køb!" :
            lang === "en" ? "Always get a condition report before buying!" :
            "购买前一定要获取房屋状况报告！",
      type: "warning",
    });
    
    advice.push({
      icon: "🏦",
      text: lang === "da" ? "Sammenlign boliglån fra mindst 3 banker." :
            lang === "en" ? "Compare mortgages from at least 3 banks." :
            "至少比较3家银行的房贷。",
      type: "tip",
    });
  }
  
  return advice;
}

// ==================== 主组件 ====================

export default function Home() {
  const [tab, setTab] = useState<"buy" | "sell" | "renovate">("buy");
  const [price, setPrice] = useState<string>("");
  const [userType, setUserType] = useState<"danish" | "foreign">("danish");
  const [transactionType, setTransactionType] = useState<"buy" | "sell">("buy");
  const [language, setLanguage] = useState<"da" | "en" | "zh">("da");
  
  // AI 增强：区域选择
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  // 改造相关
  const [houseSize, setHouseSize] = useState<string>("");
  const [solarKw, setSolarKw] = useState<string>("");
  const [heatPumpType, setHeatPumpType] = useState<"air" | "ground">("air");
  const [windowCount, setWindowCount] = useState<string>("");
  const [renovations, setRenovations] = useState<string[]>([]);
  
  // 贷款相关
  const [showLoan, setShowLoan] = useState(false);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanRate, setLoanRate] = useState(3.2);
  const [loanYears, setLoanYears] = useState(30);
  
  // 计算结果
  const sellingCosts = useMemo(() => price ? calculateSellingCosts(parseFloat(price)) : null, [price]);
  const buyingCosts = useMemo(() => price ? calculateBuyingCosts(parseFloat(price)) : null, [price]);
  const loanResult = useMemo(() => price && showLoan ? calculateLoan({ 
    price: parseFloat(price), downPaymentPercent, rate: loanRate, years: loanYears 
  }) : null, [price, downPaymentPercent, loanRate, loanYears, showLoan]);
  const aiAdvice = useMemo(() => price && !showLoan ? generateAIAdvice(parseFloat(price), tab === "buy" ? "buy" : "sell", language) : [], [price, tab, language, showLoan]);

  // AI 上下文对象
  const aiCtx = useMemo((): PropertyContext => ({
    price: parseFloat(price) || 0,
    region: selectedRegion || undefined,
    size: parseFloat(houseSize) || undefined,
    transactionType: transactionType,
    downPaymentPercent,
    loanRate,
    loanYears,
    renovations,
    lang: language,
  }), [price, selectedRegion, houseSize, transactionType, downPaymentPercent, loanRate, loanYears, renovations, language]);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("da-DK", {
      style: "currency", currency: "DKK",
      minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(amount);
  };

  const t = {
    da: {
      title: "BoligBeregner Danmark",
      subtitle: "Beregn alle omkostninger ved køb/salg/renovering af bolig i Danmark",
      tabs: { buy: "Køb bolig", sell: "Sælg bolig", renovate: "Renovering" },
      priceLabel: "Boligens pris (kr.)",
      userTypeLabel: "Brugertype",
      danish: "Dansk statsborger", foreign: "Udlænding",
      transactionLabel: "Transaktionstype",
      buy: "Køb af bolig", sell: "Salg af bolig",
      calculate: "Beregn omkostninger",
      totalCosts: "Samlede omkostninger",
      price: "Kontantpris", netProceeds: "Netto provenu",
      tinglysning: "Tinglysning af skøde (0.6%)",
      agentFee: "Ejendomsmægler salær",
      moms: "Moms (25%)",
      berigtigelse: "Berigtigelse / Advokat",
      ejerskifteforsikring: "Ejerskifteforsikring",
      tilstandsrapport: "Tilstandsrapport",
      elinstallationsrapport: "Elinstallationsrapport",
      needLoan: "Har du brug for boliglån?",
      compareLoan: "Sammenlign boliglån →",
      needInsurance: "Har du brug for forsikring?",
      compareInsurance: "Sammenlign forsikring →",
      houseSize: "Boligareal (m²)",
      solarTitle: "Solceller / Solenergi",
      solarKw: "Ønsket effekt (kW)",
      solarCost: "Anlægspris",
      solarArea: "Nødvendig tagareal",
      solarAnnual: "Årlig produktion",
      solarSavings: "Årlig besparelse",
      solarPayback: "Tilbagebetaling",
      solarYears: "år",
      heatPumpTitle: "Varmepumpe",
      heatPumpType: "Varmepumpetype",
      heatPumpAir: "Luft-til-vand (anbefalet)",
      heatPumpGround: "Jordvarme",
      heatPumpCost: "Anlægspris",
      heatPumpNewCost: "Ny årlig varmeregning",
      heatPumpSavings: "Årlig besparelse",
      heatPumpPayback: "Tilbagebetaling",
      pelletStoveTitle: "Pillefyr / Masseovn",
      pelletStoveDesc: "Alternative opvarmningsløsninger til traditionelle varmepumper.",
      windowsTitle: "Vinduer & Døre",
      windowCount: "Antal vinduer",
      windowCost: "Samlet pris",
      insulationTitle: "Isolering",
      renovationTypes: "Vælg forbedringer",
      wallInsulation: "Vægisolering",
      atticInsulation: "Loftsisolering",
      floorInsulation: "Gulvisolering",
      insulationCost: "Samlet pris",
      insulationSavings: "Årlig besparelse",
      getQuotes: "Få tilbud fra leverandører →",
      // 新增
      showLoanCalc: "Vis boliglånsberegner",
      hideLoanCalc: "Skjul boliglånsberegner",
      downPayment: "Udbetaling",
      interestRate: "Rente (%)",
      loanTerm: "Låneperiode",
      monthlyPayment: "Månedlig ydelse",
      totalInterest: "Samlet rente",
      loanAmount: "Lånebeløb",
      agentSection: "Mæglerhonorar",
      marketingSection: "Markedsføring",
      thirdPartySection: "Tredjepartsydelser",
      otherSection: "Øvrige omkostninger",
      aiAdvice: "💡 Anbefalinger",
    },
    en: {
      title: "Denmark Home Calculator",
      subtitle: "Calculate all costs when buying/selling property in Denmark",
      tabs: { buy: "Buy", sell: "Sell", renovate: "Renovate" },
      priceLabel: "Property price (DKK)",
      userTypeLabel: "User type",
      danish: "Danish citizen", foreign: "Foreigner",
      transactionLabel: "Transaction type",
      buy: "Buy property", sell: "Sell property",
      calculate: "Calculate costs",
      totalCosts: "Total costs",
      price: "Cash price", netProceeds: "Net proceeds",
      tinglysning: "Land registry fee (0.6%)",
      agentFee: "Real estate agent fee",
      moms: "VAT (25%)",
      berigtigelse: "Legal fees",
      ejerskifteforsikring: "Property transfer insurance",
      tilstandsrapport: "Building condition report",
      elinstallationsrapport: "Electrical inspection report",
      needLoan: "Need a mortgage?",
      compareLoan: "Compare mortgages →",
      needInsurance: "Need insurance?",
      compareInsurance: "Compare insurance →",
      houseSize: "House area (m²)",
      solarTitle: "Solar Panels",
      solarKw: "Desired capacity (kW)",
      solarCost: "System cost",
      solarArea: "Required roof area",
      solarAnnual: "Annual production",
      solarSavings: "Annual savings",
      solarPayback: "Payback period",
      solarYears: "years",
      heatPumpTitle: "Heat Pump",
      heatPumpType: "Heat pump type",
      heatPumpAir: "Air-to-water (recommended)",
      heatPumpGround: "Ground source",
      heatPumpCost: "System cost",
      heatPumpNewCost: "New annual heating cost",
      heatPumpSavings: "Annual savings",
      heatPumpPayback: "Payback period",
      pelletStoveTitle: "Pellet Stove / Masonry Heater",
      pelletStoveDesc: "Alternative heating solutions to traditional heat pumps.",
      windowsTitle: "Windows & Doors",
      windowCount: "Number of windows",
      windowCost: "Total cost",
      insulationTitle: "Insulation",
      renovationTypes: "Select improvements",
      wallInsulation: "Wall insulation",
      atticInsulation: "Attic insulation",
      floorInsulation: "Floor insulation",
      insulationCost: "Total cost",
      insulationSavings: "Annual savings",
      getQuotes: "Get quotes from suppliers →",
      showLoanCalc: "Show mortgage calculator",
      hideLoanCalc: "Hide mortgage calculator",
      downPayment: "Down payment",
      interestRate: "Interest rate (%)",
      loanTerm: "Loan term",
      monthlyPayment: "Monthly payment",
      totalInterest: "Total interest",
      loanAmount: "Loan amount",
      agentSection: "Agent Fee",
      marketingSection: "Marketing",
      thirdPartySection: "Third-party services",
      otherSection: "Other costs",
      aiAdvice: "💡 Recommendations",
    },
    zh: {
      title: "丹麦房产计算器",
      subtitle: "计算在丹麦买房/卖房/改造的所有费用",
      tabs: { buy: "买房", sell: "卖房", renovate: "改造" },
      priceLabel: "房产价格 (丹麦克朗)",
      userTypeLabel: "用户类型",
      danish: "丹麦公民", foreign: "外国人",
      transactionLabel: "交易类型",
      buy: "购买房产", sell: "出售房产",
      calculate: "计算费用",
      totalCosts: "总费用",
      price: "现金价格", netProceeds: "净收益",
      tinglysning: "登记费 (0.6%)",
      agentFee: "房产中介费",
      moms: "增值税 (25%)",
      berigtigelse: "律师费/公证费",
      ejerskifteforsikring: "产权保险",
      tilstandsrapport: "房屋状况报告",
      elinstallationsrapport: "电力检查报告",
      needLoan: "需要房贷吗？",
      compareLoan: "比较房贷 →",
      needInsurance: "需要保险吗？",
      compareInsurance: "比较保险 →",
      houseSize: "房屋面积 (平方米)",
      solarTitle: "太阳能板",
      solarKw: "期望功率 (kW)",
      solarCost: "系统价格",
      solarArea: "所需屋顶面积",
      solarAnnual: "年发电量",
      solarSavings: "年节省",
      solarPayback: "回收期",
      solarYears: "年",
      heatPumpTitle: "热泵",
      heatPumpType: "热泵类型",
      heatPumpAir: "空气源热泵 (推荐)",
      heatPumpGround: "地源热泵",
      heatPumpCost: "系统价格",
      heatPumpNewCost: "新年取暖费",
      heatPumpSavings: "年节省",
      heatPumpPayback: "回收期",
      pelletStoveTitle: "颗粒炉 / 壁炉",
      pelletStoveDesc: "传统热泵的替代供暖方案。",
      windowsTitle: "窗户与门",
      windowCount: "窗户数量",
      windowCost: "总价",
      insulationTitle: "保暖改造",
      renovationTypes: "选择改造项目",
      wallInsulation: "墙体保温",
      atticInsulation: "阁楼保温",
      floorInsulation: "地面保温",
      insulationCost: "总费用",
      insulationSavings: "年节省",
      getQuotes: "获取供应商报价 →",
      showLoanCalc: "显示房贷计算器",
      hideLoanCalc: "隐藏房贷计算器",
      downPayment: "首付",
      interestRate: "利率 (%)",
      loanTerm: "贷款期限",
      monthlyPayment: "月供",
      totalInterest: "总利息",
      loanAmount: "贷款金额",
      agentSection: "中介费",
      marketingSection: "营销费用",
      thirdPartySection: "第三方服务",
      otherSection: "其他费用",
      aiAdvice: "💡 建议",
    },
  }[language];

  const toggleRenovation = (type: string) => {
    if (renovations.includes(type)) {
      setRenovations(renovations.filter(r => r !== type));
    } else {
      setRenovations([...renovations, type]);
    }
  };

  // 太阳能计算
  const solarCalc = useMemo(() => {
    const kw = parseFloat(solarKw) || 0;
    if (!kw) return null;
    const systemCost = kw * SOLAR_DATA.costPerKwp;
    const annualProduction = kw * SOLAR_DATA.annualKwhPerKwp;
    const annualSavings = annualProduction * SOLAR_DATA.electricityPrice;
    const paybackYears = systemCost / annualSavings;
    return { cost: systemCost, area: kw * SOLAR_DATA.areaPerKwp, annualProduction, annualSavings, paybackYears };
  }, [solarKw]);

  // 热泵计算
  const heatPumpCalc = useMemo(() => {
    const data = heatPumpType === "air" ? HEATPUMP_DATA.air : HEATPUMP_DATA.ground;
    const annualSavings = HEATPUMP_DATA.annualHeatingCost - data.savings;
    const payback = data.cost / annualSavings;
    return { cost: data.cost, annualSavings, annualCost: data.savings, paybackYears: payback };
  }, [heatPumpType]);

  // 窗户计算
  const windowCalc = useMemo(() => {
    const count = parseFloat(windowCount) || 0;
    return { cost: count * WINDOW_DATA.costPerWindow, count };
  }, [windowCount]);

  // 保暖计算
  const insulationCalc = useMemo(() => {
    const size = parseFloat(houseSize) || 0;
    if (!size) return null;
    const wallArea = size * 0.8;
    const atticArea = size * 0.9;
    const floorArea = size * 0.85;
    
    let totalCost = 0, totalSavings = 0;
    if (renovations.includes("wall")) { totalCost += wallArea * INSULATION_DATA.wall.costPerSqm; totalSavings += (wallArea / 10) * INSULATION_DATA.wall.saving * 1000; }
    if (renovations.includes("attic")) { totalCost += atticArea * INSULATION_DATA.attic.costPerSqm; totalSavings += (atticArea / 10) * INSULATION_DATA.attic.saving * 1000; }
    if (renovations.includes("floor")) { totalCost += floorArea * INSULATION_DATA.floor.costPerSqm; totalSavings += (floorArea / 10) * INSULATION_DATA.floor.saving * 1000; }
    
    return { totalCost, totalSavings };
  }, [houseSize, renovations]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-900">🏠 {t.title}</h1>
          <div className="flex gap-2">
            {(["da", "en", "zh"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1 rounded text-sm font-medium transition ${
                  language === lang ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {lang === "da" ? "DA" : lang === "en" ? "EN" : "中文"}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h2>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab("buy")} className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${tab === "buy" ? "bg-green-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50 border"}`}>
            🏠 {t.tabs.buy}
          </button>
          <button onClick={() => setTab("sell")} className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${tab === "sell" ? "bg-orange-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50 border"}`}>
            🏷️ {t.tabs.sell}
          </button>
          <button onClick={() => setTab("renovate")} className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${tab === "renovate" ? "bg-purple-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50 border"}`}>
            🔨 {t.tabs.renovate}
          </button>
        </div>

        {/* ========== BUY / SELL TAB ========== */}
        {(tab === "buy" || tab === "sell") && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* Buy/Sell Toggle */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.transactionLabel}</label>
              <div className="flex gap-2">
                <button onClick={() => setTransactionType("buy")} className={`flex-1 px-4 py-3 rounded-lg border-2 font-medium transition ${transactionType === "buy" ? "border-green-600 bg-green-50 text-green-700" : "border-gray-200 hover:border-gray-300"}`}>
                  🛒 {t.buy}
                </button>
                <button onClick={() => setTransactionType("sell")} className={`flex-1 px-4 py-3 rounded-lg border-2 font-medium transition ${transactionType === "sell" ? "border-orange-600 bg-orange-50 text-orange-700" : "border-gray-200 hover:border-gray-300"}`}>
                  🏷️ {t.sell}
                </button>
              </div>
            </div>

            {/* Input Section */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.priceLabel}</label>
                <input
                  type="number" value={price} onChange={(e) => setPrice(e.target.value)}
                  placeholder="1.275.000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.userTypeLabel}</label>
                <div className="flex gap-2">
                  <button onClick={() => setUserType("danish")} className={`flex-1 px-4 py-3 rounded-lg border-2 font-medium transition ${userType === "danish" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-300"}`}>
                    {t.danish}
                  </button>
                  <button onClick={() => setUserType("foreign")} className={`flex-1 px-4 py-3 rounded-lg border-2 font-medium transition ${userType === "foreign" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-300"}`}>
                    {t.foreign}
                  </button>
                </div>
              </div>
            </div>

            {/* AI 增强输入：区域 + 面积 */}
            <div className="grid md:grid-cols-2 gap-4 mb-6 p-4 bg-purple-50 rounded-xl border border-purple-100">
              <div>
                <label className="block text-xs font-medium text-purple-700 mb-1.5">
                  🤖 {language === "zh" ? "区域（AI 分析用）" : language === "en" ? "Region (for AI analysis)" : "Område (til AI-analyse)"}
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-3 py-2 border border-purple-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-400 bg-white"
                >
                  <option value="">{language === "zh" ? "选择区域（可选）" : language === "en" ? "Select region (optional)" : "Vælg område (valgfrit)"}</option>
                  {Object.entries(REGION_PRICES).map(([key, val]) => (
                    <option key={key} value={key}>{val.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-purple-700 mb-1.5">
                  🤖 {language === "zh" ? "面积 m²（AI 分析用）" : language === "en" ? "Size m² (for AI analysis)" : "Areal m² (til AI-analyse)"}
                </label>
                <input
                  type="number"
                  value={houseSize}
                  onChange={(e) => setHouseSize(e.target.value)}
                  placeholder="120"
                  className="w-full px-3 py-2 border border-purple-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>

            {/* Results */}
            {price && (
              <div className="border-t pt-6">
                {/* AI Advice */}
                {aiAdvice.length > 0 && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
                    <h3 className="font-bold text-purple-900 mb-3">💡 {t.aiAdvice}</h3>
                    <div className="space-y-2">
                      {aiAdvice.map((item, i) => (
                        <div key={i} className={`p-3 rounded-lg ${item.type === "warning" ? "bg-yellow-50 border-yellow-200" : item.type === "tip" ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"}`}>
                          <p className="text-sm text-gray-700">{item.icon} {item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 {t.totalCosts}</h3>
                
                <div className="space-y-3">
                  {transactionType === "buy" && buyingCosts ? (
                    <>
                      <CostRow label={t.tinglysning} amount={buyingCosts.tinglysning} />
                      <CostRow label={t.agentFee} amount={0} />
                      <CostRow label={t.moms} amount={0} />
                      <CostRow label={t.berigtigelse} amount={BUYING_FIXED_COSTS.berigtigelse.price} />
                      <CostRow label={t.ejerskifteforsikring} amount={BUYING_FIXED_COSTS.ejerskifteforsikring.price} />
                      <CostRow label={t.tilstandsrapport} amount={BUYING_FIXED_COSTS.tilstandsrapport.price} />
                      <CostRow label={t.elinstallationsrapport} amount={BUYING_FIXED_COSTS.elrapport.price} />
                    </>
                  ) : transactionType === "sell" && sellingCosts ? (
                    <>
                      <CostRow label={t.agentFee} amount={sellingCosts.agentFee} />
                      <CostRow label={t.moms} amount={0} />
                      <CostRow label={t.ejerskifteforsikring} amount={OTHER_SELLING_COSTS.halfInsurance.price} />
                      <CostRow label={t.tilstandsrapport} amount={OTHER_SELLING_COSTS.reports.price} />
                      <CostRow label={t.berigtigelse} amount={0} />
                    </>
                  ) : null}
                </div>

                {/* Total */}
                <div className="mt-6 pt-4 border-t-2 border-gray-200">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-gray-900">{t.totalCosts}</span>
                    <span className="text-blue-600">{formatCurrency(transactionType === "buy" ? buyingCosts?.total || 0 : sellingCosts?.total || 0)}</span>
                  </div>
                  
                  {transactionType === "sell" && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-green-900">{t.netProceeds}</span>
                        <span className="text-2xl font-bold text-green-600">{formatCurrency(sellingCosts?.netProceeds || 0)}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Affiliate Links for Selling */}
                {transactionType === "sell" && price && (
                  <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-center">
                      <p className="text-sm text-orange-700 mb-3">📊 Få en gratis vurdering af din bolig!</p>
                      <a href="https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=71154" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition">
                        Få vurdering →
                      </a>
                    </div>
                  </div>
                )}

                {/* Mortgage Calculator Toggle */}
                {transactionType === "buy" && price && (
                  <div className="mt-4">
                    <button
                      onClick={() => setShowLoan(!showLoan)}
                      className="w-full px-4 py-3 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition border border-blue-200"
                    >
                      🏦 {showLoan ? t.hideLoanCalc : t.showLoanCalc}
                    </button>
                  </div>
                )}

                {/* Mortgage Calculator */}
                {transactionType === "buy" && price && showLoan && loanResult && (
                  <div className="mt-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <h4 className="font-bold text-blue-900 mb-4">🏦 {language === "da" ? "Boliglånsberegner" : language === "en" ? "Mortgage Calculator" : "房贷计算器"}</h4>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t.downPayment}</label>
                        <input type="range" min="5" max="40" value={downPaymentPercent} onChange={(e) => setDownPaymentPercent(parseInt(e.target.value))} className="w-full" />
                        <div className="text-center font-bold text-blue-600">{downPaymentPercent}% ({formatCurrency(parseFloat(price) * downPaymentPercent / 100)})</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t.interestRate}</label>
                        <input type="number" step="0.1" value={loanRate} onChange={(e) => setLoanRate(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t.loanTerm}</label>
                        <select value={loanYears} onChange={(e) => setLoanYears(parseInt(e.target.value))} className="w-full px-3 py-2 border rounded-lg bg-white">
                          <option value={10}>10 år</option>
                          <option value={20}>20 år</option>
                          <option value={30}>30 år</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white rounded-lg space-y-2">
                      <div className="flex justify-between"><span>{t.loanAmount}:</span><span className="font-bold">{formatCurrency(loanResult.loanAmount)}</span></div>
                      <div className="flex justify-between"><span>{t.monthlyPayment}:</span><span className="font-bold text-xl text-green-600">{formatCurrency(loanResult.monthlyPayment)}</span></div>
                      <div className="flex justify-between"><span>{t.totalInterest}:</span><span className="font-bold text-yellow-600">{formatCurrency(loanResult.totalInterest)}</span></div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <a href="https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=78126" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                        {t.compareLoan}
                      </a>
                    </div>
                  </div>
                )}

                {/* Affiliate Link - Buying */}
                {transactionType === "buy" && price && (
                  <div className="mt-4 space-y-3">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-center">
                        <p className="text-sm text-green-700 mb-3">🛡️ {t.needInsurance}</p>
                        <a href="https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=60068" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition">
                          {t.compareInsurance}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ========== AI 智能顾问面板（Buy/Sell/Renovate 通用）========== */}
        <AIAdvisorPanel ctx={aiCtx} lang={language} />

        {/* ========== RENOVATE TAB ========== */}
        {tab === "renovate" && (
          <div className="space-y-6">
            {/* Solar Panel */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🔆 {t.solarTitle}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.solarKw}</label>
                  <input type="number" value={solarKw} onChange={(e) => setSolarKw(e.target.value)} placeholder="6" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  <p className="text-xs text-gray-500 mt-1">{language === "zh" ? "建议：每100平米约6kW" : "Recommendation: ~6kW per 100m²"}</p>
                </div>
                {solarCalc && (
                  <div className="bg-yellow-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between"><span className="text-gray-600">{t.solarCost}:</span><span className="font-bold">{formatCurrency(solarCalc.cost)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">{t.solarArea}:</span><span className="font-bold">{solarCalc.area} m²</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">{t.solarAnnual}:</span><span className="font-bold">{solarCalc.annualProduction} kWh</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">{t.solarSavings}:</span><span className="font-bold text-green-600">{formatCurrency(solarCalc.annualSavings)}</span></div>
                    <div className="flex justify-between border-t pt-2"><span className="text-gray-600">{t.solarPayback}:</span><span className="font-bold text-purple-600">{solarCalc.paybackYears} {t.solarYears}</span></div>
                  </div>
                )}
              </div>
              {solarCalc && (
                <div className="mt-4 p-3 bg-purple-50 rounded-lg text-center">
                  <a href="https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=59457" target="_blank" rel="noopener noreferrer" className="text-purple-700 font-medium hover:underline">{t.getQuotes}</a>
                </div>
              )}
            </div>

            {/* Heat Pump */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🌡️ {t.heatPumpTitle}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.heatPumpType}</label>
                  <div className="space-y-2">
                    <button onClick={() => setHeatPumpType("air")} className={`w-full px-4 py-3 rounded-lg border-2 font-medium transition ${heatPumpType === "air" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200"}`}>{t.heatPumpAir}</button>
                    <button onClick={() => setHeatPumpType("ground")} className={`w-full px-4 py-3 rounded-lg border-2 font-medium transition ${heatPumpType === "ground" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200"}`}>{t.heatPumpGround}</button>
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between"><span className="text-gray-600">{t.heatPumpCost}:</span><span className="font-bold">{formatCurrency(heatPumpCalc.cost)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">{t.heatPumpNewCost}:</span><span className="font-bold">{formatCurrency(heatPumpCalc.annualCost)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">{t.heatPumpSavings}:</span><span className="font-bold text-green-600">{formatCurrency(heatPumpCalc.annualSavings)}</span></div>
                  <div className="flex justify-between border-t pt-2"><span className="text-gray-600">{t.heatPumpPayback}:</span><span className="font-bold text-purple-600">{heatPumpCalc.paybackYears.toFixed(1)} {t.solarYears}</span></div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
                <a href="https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=99217" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-medium hover:underline">{t.getQuotes}</a>
              </div>
            </div>

            {/* Windows */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🪟 {t.windowsTitle}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.windowCount}</label>
                  <input type="number" value={windowCount} onChange={(e) => setWindowCount(e.target.value)} placeholder="10" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                {windowCalc && (
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex justify-between"><span className="text-gray-600">{t.windowCost}:</span><span className="font-bold text-2xl">{formatCurrency(windowCalc.cost)}</span></div>
                  </div>
                )}
              </div>
              {windowCalc && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg text-center">
                  <a href="https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=109565" target="_blank" rel="noopener noreferrer" className="text-gray-700 font-medium hover:underline">{t.getQuotes}</a>
                </div>
              )}
            </div>

            {/* Insulation */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🏠 {t.insulationTitle}</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.houseSize}</label>
                <input type="number" value={houseSize} onChange={(e) => setHouseSize(e.target.value)} placeholder="150" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.renovationTypes}</label>
                <div className="flex gap-2 flex-wrap">
                  <button onClick={() => toggleRenovation("wall")} className={`px-4 py-2 rounded-lg border-2 font-medium transition ${renovations.includes("wall") ? "border-purple-600 bg-purple-50 text-purple-700" : "border-gray-200"}`}>🧱 {t.wallInsulation}</button>
                  <button onClick={() => toggleRenovation("attic")} className={`px-4 py-2 rounded-lg border-2 font-medium transition ${renovations.includes("attic") ? "border-purple-600 bg-purple-50 text-purple-700" : "border-gray-200"}`}>📐 {t.atticInsulation}</button>
                  <button onClick={() => toggleRenovation("floor")} className={`px-4 py-2 rounded-lg border-2 font-medium transition ${renovations.includes("floor") ? "border-purple-600 bg-purple-50 text-purple-700" : "border-gray-200"}`}>🏠 {t.floorInsulation}</button>
                </div>
              </div>
              {insulationCalc && renovations.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between"><span className="text-gray-600">{t.insulationCost}:</span><span className="font-bold text-2xl">{formatCurrency(insulationCalc.totalCost)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">{t.insulationSavings}:</span><span className="font-bold text-green-600">{formatCurrency(insulationCalc.totalSavings)}</span></div>
                </div>
              )}
              {renovations.length > 0 && (
                <div className="mt-4 p-3 bg-orange-50 rounded-lg text-center">
                  <a href="https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=105348" target="_blank" rel="noopener noreferrer" className="text-orange-700 font-medium hover:underline">{t.getQuotes}</a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Baseret på reelle priser fra danske leverandører 2026</p>
          <p className="mt-1">© 2026 BoligBeregner Danmark</p>
        </footer>
      </div>
    </main>
  );
}

// CostRow component
function CostRow({ label, amount }: { label: string; amount: number }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("da-DK", {
      style: "currency", currency: "DKK",
      minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex justify-between items-center py-2">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-gray-900">{formatCurrency(amount)}</span>
    </div>
  );
}
