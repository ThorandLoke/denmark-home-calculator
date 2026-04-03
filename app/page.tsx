"use client";

import { useState, useMemo } from "react";

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

// 热泵数据（基于丹麦市场数据）
const HEATPUMP_DATA = {
  // 空气源热泵：初期投入低，但效率较低
  air: { cost: 150000, savings: 14000, efficiency: 300 },
  // 地源热泵：初期投入高，但效率高，长期更省钱
  ground: { cost: 280000, savings: 25000, efficiency: 450 },
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

// ==================== 翻译配置 ====================

const translations = {
  da: {
    title: "BoligBeregner Danmark",
    subtitle: "Beregn alle omkostninger ved køb, salg og renovering i Danmark",
    tabs: { buy: "Køb bolig", sell: "Sælg bolig", renovate: "Renovering", market: "Boligmarked", analyze: "Analyser tilbud" },
    priceLabel: "Boligpris (DKK)",
    calculate: "Beregn omkostninger",
    totalCosts: "Samlede omkostninger",
    netProceeds: "Netto provenu",
    
    // 买房费用项
    tinglysning: "Tinglysningsafgift (0,6%)",
    berigtigelse: "Berigtigelseshonorar",
    ejerskifteforsikring: "Ejerskifteforsikring",
    tilstandsrapport: "Tilstandsrapport",
    elinstallationsrapport: "Elinstallationsrapport",
    energimrkning: "Energimærkning",
    
    // 卖房费用项 - 中介费
    agentFee: "Mæglerhonorar (inkl. moms)",
    agentValuation: "  - Vurdering og prisansættelse",
    agentBudget: "  - Salgsbudget",
    agentMaterials: "  - Salgsmateriale",
    agentContract: "  - Købsaftale",
    agentAftercare: "  - Efternøgle",
    agentSalesWork: "  - Salgsarbejde",
    
    // 卖房费用项 - 营销费
    marketingFee: "Markedsføringsomkostninger",
    marketingOnline: "  - Netannonce",
    marketingPhotos: "  - Fotosuite",
    marketingDigital: "  - Digital markedsføring",
    marketingSocial: "  - Sociale medier",
    
    // 卖房费用项 - 第三方
    thirdParty: "Tredjepartsudlæg",
    ejendomsdatarapport: "  - Ejendomsdatarapport",
    edh: "  - EDH dokument",
    edokument: "  - E-dokumentation",
    
    // 卖房费用项 - 其他
    otherCosts: "Øvrige omkostninger",
    halfInsurance: "  - Halv ejerskifteforsikring",
    reports: "  - Tilstands- og elrapport",
    liability: "  - Sælgeransvarsforsikring",
    digitalTinglysning: "  - Digital tinglysning",
    settlement: "  - Aflæsning og afslutning",
    bankCosts: "  - Bankgebyrer",
    
    needLoan: "Har du brug for et boliglån?",
    compareLoan: "Sammenlign boliglån →",
    needInsurance: "Har du brug for forsikring?",
    compareInsurance: "Sammenlign forsikring →",
    
    // 改造相关
    houseSize: "Boligareal (m²)",
    solarTitle: "☀️ Solceller / Solenergi",
    solarKw: "Ønsket effekt (kW)",
    solarCost: "Anlægspris",
    solarArea: "Nødvendig tagareal",
    solarAnnual: "Årlig produktion",
    solarSavings: "Årlig besparelse",
    solarPayback: "Tilbagebetaling",
    solarYears: "år",
    heatPumpTitle: "🌡️ Varmepumpe",
    heatPumpType: "Varmepumpetype",
    heatPumpAir: "Luft-til-vand (anbefalet)",
    heatPumpGround: "Jordvarme",
    heatPumpCost: "Anlægspris",
    heatPumpNewCost: "Ny årlig varmeregning",
    heatPumpSavings: "Årlig besparelse",
    heatPumpPayback: "Tilbagebetaling",
    windowsTitle: "🪟 Vinduer & Døre",
    windowCount: "Antal vinduer",
    windowCost: "Samlet pris",
    insulationTitle: "🏠 Isolering",
    renovationTypes: "Vælg forbedringer",
    wallInsulation: "Vægisolering",
    atticInsulation: "Loftsisolering",
    floorInsulation: "Gulvisolering",
    insulationCost: "Samlet pris",
    insulationSavings: "Årlig besparelse",
    getQuotes: "Få tilbud fra leverandører →",
    
    // 房贷计算器
    showLoanCalc: "Vis boliglånsberegner",
    hideLoanCalc: "Skjul boliglånsberegner",
    downPayment: "Udbetaling",
    interestRate: "Rente (%)",
    loanTerm: "Låneperiode",
    monthlyPayment: "Månedlig ydelse",
    totalInterest: "Samlet rente",
    loanAmount: "Lånebeløb",
    aiAdvice: "💡 Anbefalinger",
    
    // 费用类别标题
    categoryAgent: "🏷️ Mæglerhonorar",
    categoryMarketing: "📢 Markedsføring",
    categoryThirdParty: "📋 Tredjepartsudlæg",
    categoryOther: "🔧 Øvrige",
    categoryBuying: "💰 Købsomkostninger",
  },
  en: {
    title: "Denmark Home Calculator",
    subtitle: "Calculate all costs when buying/selling property in Denmark",
    tabs: { buy: "Buy", sell: "Sell", renovate: "Renovate", market: "Property Market", analyze: "Analyze Quote" },
    priceLabel: "Property price (DKK)",
    calculate: "Calculate costs",
    totalCosts: "Total costs",
    netProceeds: "Net proceeds",
    
    // Buying costs
    tinglysning: "Land registry fee (0.6%)",
    berigtigelse: "Legal fees",
    ejerskifteforsikring: "Property transfer insurance",
    tilstandsrapport: "Building condition report",
    elinstallationsrapport: "Electrical inspection report",
    energimrkning: "Energy label",
    
    // Selling costs - Agent
    agentFee: "Real estate agent fee (incl. VAT)",
    agentValuation: "  - Valuation and pricing",
    agentBudget: "  - Sales budget",
    agentMaterials: "  - Sales materials",
    agentContract: "  - Purchase agreement",
    agentAftercare: "  - Aftercare",
    agentSalesWork: "  - Sales work",
    
    // Selling costs - Marketing
    marketingFee: "Marketing costs",
    marketingOnline: "  - Online advertising",
    marketingPhotos: "  - Photo package",
    marketingDigital: "  - Digital marketing",
    marketingSocial: "  - Social media ads",
    
    // Selling costs - Third party
    thirdParty: "Third-party expenses",
    ejendomsdatarapport: "  - Property data report",
    edh: "  - EDH document",
    edokument: "  - E-documentation",
    
    // Selling costs - Other
    otherCosts: "Other costs",
    halfInsurance: "  - Half property insurance",
    reports: "  - Condition & electrical reports",
    liability: "  - Seller liability insurance",
    digitalTinglysning: "  - Digital registration",
    settlement: "  - Meter reading & settlement",
    bankCosts: "  - Bank fees",
    
    needLoan: "Need a mortgage?",
    compareLoan: "Compare mortgages →",
    needInsurance: "Need insurance?",
    compareInsurance: "Compare insurance →",
    
    // Renovation
    houseSize: "House area (m²)",
    solarTitle: "☀️ Solar Panels",
    solarKw: "Desired capacity (kW)",
    solarCost: "System cost",
    solarArea: "Required roof area",
    solarAnnual: "Annual production",
    solarSavings: "Annual savings",
    solarPayback: "Payback period",
    solarYears: "years",
    heatPumpTitle: "🌡️ Heat Pump",
    heatPumpType: "Heat pump type",
    heatPumpAir: "Air-to-water (recommended)",
    heatPumpGround: "Ground source",
    heatPumpCost: "System cost",
    heatPumpNewCost: "New annual heating cost",
    heatPumpSavings: "Annual savings",
    heatPumpPayback: "Payback period",
    windowsTitle: "🪟 Windows & Doors",
    windowCount: "Number of windows",
    windowCost: "Total cost",
    insulationTitle: "🏠 Insulation",
    renovationTypes: "Select improvements",
    wallInsulation: "Wall insulation",
    atticInsulation: "Attic insulation",
    floorInsulation: "Floor insulation",
    insulationCost: "Total cost",
    insulationSavings: "Annual savings",
    getQuotes: "Get quotes from suppliers →",
    
    // Mortgage calculator
    showLoanCalc: "Show mortgage calculator",
    hideLoanCalc: "Hide mortgage calculator",
    downPayment: "Down payment",
    interestRate: "Interest rate (%)",
    loanTerm: "Loan term",
    monthlyPayment: "Monthly payment",
    totalInterest: "Total interest",
    loanAmount: "Loan amount",
    aiAdvice: "💡 Recommendations",
    
    // Category titles
    categoryAgent: "🏷️ Agent Fee",
    categoryMarketing: "📢 Marketing",
    categoryThirdParty: "📋 Third Party",
    categoryOther: "🔧 Other Costs",
    categoryBuying: "💰 Buying Costs",
  },
  zh: {
    title: "丹麦房产计算器",
    subtitle: "计算在丹麦买房/卖房/改造的所有费用",
    tabs: { buy: "买房", sell: "卖房", renovate: "改造", market: "房价市场", analyze: "报价分析" },
    priceLabel: "房产价格 (丹麦克朗)",
    calculate: "计算费用",
    totalCosts: "总费用",
    netProceeds: "净收益",
    
    // 买房费用
    tinglysning: "登记费 (0.6%)",
    berigtigelse: "律师费/公证费",
    ejerskifteforsikring: "产权保险",
    tilstandsrapport: "房屋状况报告",
    elinstallationsrapport: "电力检查报告",
    energimrkning: "能源标识",
    
    // 卖房费用 - 中介费
    agentFee: "中介费（含增值税）",
    agentValuation: "  - 估值和定价",
    agentBudget: "  - 销售预算",
    agentMaterials: "  - 销售资料",
    agentContract: "  - 起草购买协议",
    agentAftercare: "  - 售后服务",
    agentSalesWork: "  - 销售工作",
    
    // 卖房费用 - 营销费
    marketingFee: "营销费用",
    marketingOnline: "  - 网上广告",
    marketingPhotos: "  - 照片套餐",
    marketingDigital: "  - 数字营销",
    marketingSocial: "  - 社交媒体广告",
    
    // 卖房费用 - 第三方
    thirdParty: "第三方支出",
    ejendomsdatarapport: "  - 房产数据报告",
    edh: "  - EDH文档",
    edokument: "  - 电子文档",
    
    // 卖房费用 - 其他
    otherCosts: "其他费用",
    halfInsurance: "  - 半份产权保险",
    reports: "  - 验房+电力报告",
    liability: "  - 卖家责任险",
    digitalTinglysning: "  - 数字产权证",
    settlement: "  - 结算/读表",
    bankCosts: "  - 银行费用",
    
    needLoan: "需要房贷吗？",
    compareLoan: "比较房贷 →",
    needInsurance: "需要保险吗？",
    compareInsurance: "比较保险 →",
    
    // 改造相关
    houseSize: "房屋面积 (平方米)",
    solarTitle: "☀️ 太阳能板",
    solarKw: "期望功率 (kW)",
    solarCost: "系统价格",
    solarArea: "所需屋顶面积",
    solarAnnual: "年发电量",
    solarSavings: "年节省",
    solarPayback: "回收期",
    solarYears: "年",
    heatPumpTitle: "🌡️ 热泵",
    heatPumpType: "热泵类型",
    heatPumpAir: "空气源热泵 (推荐)",
    heatPumpGround: "地源热泵",
    heatPumpCost: "系统价格",
    heatPumpNewCost: "新年取暖费",
    heatPumpSavings: "年节省",
    heatPumpPayback: "回收期",
    windowsTitle: "🪟 窗户与门",
    windowCount: "窗户数量",
    windowCost: "总价",
    insulationTitle: "🏠 保暖改造",
    renovationTypes: "选择改造项目",
    wallInsulation: "墙体保温",
    atticInsulation: "阁楼保温",
    floorInsulation: "地板保温",
    insulationCost: "总价",
    insulationSavings: "年节省",
    getQuotes: "获取报价 →",
    
    // 房贷计算器
    showLoanCalc: "显示房贷计算器",
    hideLoanCalc: "隐藏房贷计算器",
    downPayment: "首付",
    interestRate: "利率 (%)",
    loanTerm: "贷款期限",
    monthlyPayment: "月供",
    totalInterest: "总利息",
    loanAmount: "贷款金额",
    aiAdvice: "💡 智能建议",
    
    // 费用类别标题
    categoryAgent: "🏷️ 中介费",
    categoryMarketing: "📢 营销费",
    categoryThirdParty: "📋 第三方",
    categoryOther: "🔧 其他费用",
    categoryBuying: "💰 买房费用",
  },
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

  return { 
    agentFee, 
    marketingFee, 
    thirdParty, 
    otherCosts, 
    total, 
    netProceeds: price - total,
    // 分项详情
    agentBreakdown: AGENT_FEE_ITEMS,
    marketingBreakdown: MARKETING_ITEMS,
    thirdPartyBreakdown: THIRD_PARTY_FEES,
    otherBreakdown: OTHER_SELLING_COSTS,
  };
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

  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                         (Math.pow(1 + monthlyRate, totalPayments) - 1);
  const totalPaid = monthlyPayment * totalPayments;
  const totalInterest = totalPaid - loanAmount;

  return { loanAmount, monthlyPayment, totalInterest, totalPaid };
}

function generateAIAdvice(price: number, type: "buy" | "sell", language: string) {
  const advice = [];
  
  if (type === "sell") {
    // 费用占比提醒
    const totalCost = calculateSellingCosts(price).total;
    const costPercent = ((totalCost / price) * 100).toFixed(1);
    if (language === "zh") {
      advice.push({ type: "info", icon: "💡", text: `卖房费用约占房价的 ${costPercent}%，约 ${totalCost.toLocaleString()} kr` });
      advice.push({ type: "tip", icon: "📸", text: "建议：请专业摄影师拍摄房屋照片，可提升售价5-10%" });
      advice.push({ type: "warning", icon: "🔍", text: "买房者通常会在交房前要求验房，建议提前准备" });
      advice.push({ type: "tip", icon: "🏦", text: "多家比较房贷利率，当前市场利率约3-4% (FlexKort)" });
    } else if (language === "en") {
      advice.push({ type: "info", icon: "💡", text: `Selling costs are approximately ${costPercent}% of property price` });
      advice.push({ type: "tip", icon: "📸", text: "Professional photos can increase sale price by 5-10%" });
      advice.push({ type: "warning", icon: "🔍", text: "Buyers usually require inspection before closing" });
      advice.push({ type: "tip", icon: "🏦", text: "Compare mortgage rates - current market ~3-4% (FlexKort)" });
    } else {
      advice.push({ type: "info", icon: "💡", text: `Salgsomkostninger udgør ca. ${costPercent}% af boligprisen` });
      advice.push({ type: "tip", icon: "📸", text: "Professionelle fotos kan øge salgsprisen med 5-10%" });
      advice.push({ type: "warning", icon: "🔍", text: "Købere kræver typisk inspektion før overdragelse" });
      advice.push({ type: "tip", icon: "🏦", text: "Sammenlign boliglånsrenter - nuværende marked ~3-4% (FlexKort)" });
    }
  } else {
    // 买房建议
    if (language === "zh") {
      advice.push({ type: "tip", icon: "🔍", text: "买房前建议聘请专业验房师检查房屋状况" });
      advice.push({ type: "tip", icon: "📋", text: "丹麦法律规定卖家必须提供验房报告" });
      advice.push({ type: "tip", icon: "🏦", text: "多家比较房贷利率，当前市场参考利率：5年固定约3.5%，10年固定约3.8%" });
      advice.push({ type: "warning", icon: "⚠️", text: "外国人购房可能需要额外准备文件和更高的首付" });
    } else if (language === "en") {
      advice.push({ type: "tip", icon: "🔍", text: "Hire a professional inspector before buying" });
      advice.push({ type: "tip", icon: "📋", text: "Danish law requires sellers to provide condition report" });
      advice.push({ type: "tip", icon: "🏦", text: "Compare mortgage rates: 5-year fixed ~3.5%, 10-year fixed ~3.8%" });
      advice.push({ type: "warning", icon: "⚠️", text: "Foreigners may need additional documentation and higher down payment" });
    } else {
      advice.push({ type: "tip", icon: "🔍", text: "Få en professionel bygningsinspektør før køb" });
      advice.push({ type: "tip", icon: "📋", text: "Dansk lovgivning kræver sælger tilstandsrapport" });
      advice.push({ type: "tip", icon: "🏦", text: "Sammenlign boliglånsrenter: 5-års fast ~3,5%, 10-års fast ~3,8%" });
      advice.push({ type: "warning", icon: "⚠️", text: "Udlændinge kan have brug for ekstra dokumentation og højere udbetaling" });
    }
  }
  
  return advice;
}

// ==================== 主组件 ====================

export default function Home() {
  const [tab, setTab] = useState<"buy" | "sell" | "renovate" | "market" | "analyze">("buy");
  const [price, setPrice] = useState<string>("");
  const [language, setLanguage] = useState<"da" | "en" | "zh">("zh");

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

  // 房价市场模块
  const [marketCity, setMarketCity] = useState<string>("kobenhavn");
  const [marketMortgage, setMarketMortgage] = useState<string>("");

  // 报价分析模块
  const [analyzeType, setAnalyzeType] = useState<"buy" | "sell">("buy");
  const [quoteText, setQuoteText] = useState<string>("");
  const [quoteAnalysis, setQuoteAnalysis] = useState<null | {
    items: { name: string; quoted: number; marketMin: number; marketMax: number; negotiable: boolean; tip: string }[];
    totalQuoted: number; totalMin: number; saving: number;
  }>(null);
  const [analyzeLoading, setAnalyzeLoading] = useState(false);

  // 计算结果
  const sellingCosts = useMemo(() => price ? calculateSellingCosts(parseFloat(price)) : null, [price]);
  const buyingCosts = useMemo(() => price ? calculateBuyingCosts(parseFloat(price)) : null, [price]);
  const loanResult = useMemo(() => price && showLoan ? calculateLoan({
    price: parseFloat(price), downPaymentPercent, rate: loanRate, years: loanYears
  }) : null, [price, downPaymentPercent, loanRate, loanYears, showLoan]);
  const aiAdvice = useMemo(() => price && !showLoan ? generateAIAdvice(parseFloat(price), tab === "buy" ? "buy" : "sell", language) : [], [price, tab, language, showLoan]);

  const t = translations[language];

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('da-DK') + ' kr';
  };

  // 改造计算
  const solarResult = useMemo(() => {
    if (!solarKw) return null;
    const kw = parseFloat(solarKw);
    const cost = kw * SOLAR_DATA.costPerKwp;
    const area = kw * SOLAR_DATA.areaPerKwp;
    const annualKwh = kw * SOLAR_DATA.annualKwhPerKwp;
    const annualSavings = annualKwh * SOLAR_DATA.electricityPrice;
    const payback = cost / annualSavings;
    return { cost, area, annualKwh, annualSavings, payback };
  }, [solarKw]);

  const heatPumpResult = useMemo(() => {
    const data = HEATPUMP_DATA[heatPumpType];
    const savings = data.savings;
    const payback = data.cost / savings;
    return { ...data, savings, payback };
  }, [heatPumpType]);

  const windowResult = useMemo(() => {
    if (!windowCount) return null;
    const count = parseInt(windowCount);
    const cost = count * WINDOW_DATA.costPerWindow;
    return { cost };
  }, [windowCount]);

  const insulationResult = useMemo(() => {
    if (!houseSize || renovations.length === 0) return null;
    const size = parseFloat(houseSize);
    let totalCost = 0;
    let totalSavings = 0;
    
    renovations.forEach(r => {
      if (r === 'wall') {
        totalCost += size * 0.4 * INSULATION_DATA.wall.costPerSqm;
        totalSavings += size * 0.4 * INSULATION_DATA.wall.saving;
      } else if (r === 'attic') {
        totalCost += size * 0.3 * INSULATION_DATA.attic.costPerSqm;
        totalSavings += size * 0.3 * INSULATION_DATA.attic.saving;
      } else if (r === 'floor') {
        totalCost += size * 0.3 * INSULATION_DATA.floor.costPerSqm;
        totalSavings += size * 0.3 * INSULATION_DATA.floor.saving;
      }
    });
    
    const payback = totalSavings > 0 ? totalCost / totalSavings : 0;
    return { cost: totalCost, savings: totalSavings, payback };
  }, [houseSize, renovations]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
            <p className="text-sm text-gray-600">{t.subtitle}</p>
          </div>
          
          {/* Language Switcher */}
          <div className="flex gap-2">
            {(['da', 'en', 'zh'] as const).map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1.5 rounded-lg font-medium text-sm transition ${
                  language === lang 
                    ? 'bg-blue-500 text-white shadow' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {lang === 'da' ? '🇩🇰 DA' : lang === 'en' ? '🇬🇧 EN' : '🇨🇳 中文'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 flex-wrap">
          <button 
            onClick={() => setTab("buy")} 
            className={`flex-1 min-w-[100px] px-4 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
              tab === "buy" ? "bg-green-500 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            🏠 {t.tabs.buy}
          </button>
          <button 
            onClick={() => setTab("sell")} 
            className={`flex-1 min-w-[100px] px-4 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
              tab === "sell" ? "bg-orange-500 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            🏷️ {t.tabs.sell}
          </button>
          <button 
            onClick={() => setTab("renovate")} 
            className={`flex-1 min-w-[100px] px-4 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
              tab === "renovate" ? "bg-purple-500 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            🔨 {t.tabs.renovate}
          </button>
          <button 
            onClick={() => setTab("market")} 
            className={`flex-1 min-w-[100px] px-4 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
              tab === "market" ? "bg-blue-600 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            📊 {t.tabs.market}
          </button>
          <button 
            onClick={() => setTab("analyze")} 
            className={`flex-1 min-w-[100px] px-4 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
              tab === "analyze" ? "bg-red-500 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            🔍 {t.tabs.analyze}
          </button>
        </div>

        {/* ========== BUY / SELL TAB ========== */}
        {(tab === "buy" || tab === "sell") && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            {/* Input Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.priceLabel}</label>
              <input
                type="text" 
                value={price ? parseFloat(price).toLocaleString('da-DK') : ''} 
                onChange={(e) => {
                  const raw = e.target.value.replace(/\./g, '').replace(',', '.');
                  setPrice(raw);
                }}
                placeholder="1.275.000"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
              />
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

                {/* ========== BUYING COSTS ========== */}
                {tab === "buy" && buyingCosts && (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 {t.categoryBuying}</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-700">{t.tinglysning}</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(buyingCosts.tinglysning)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-700">{t.berigtigelse}</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(BUYING_FIXED_COSTS.berigtigelse.price)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-700">{t.ejerskifteforsikring}</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(BUYING_FIXED_COSTS.ejerskifteforsikring.price)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-700">{t.tilstandsrapport}</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(BUYING_FIXED_COSTS.tilstandsrapport.price)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-700">{t.elinstallationsrapport}</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(BUYING_FIXED_COSTS.elrapport.price)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-700">{t.energimrkning}</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(BUYING_FIXED_COSTS.energimrkning.price)}</span>
                      </div>
                    </div>

                    {/* Total for Buying */}
                    <div className="mt-6 pt-4 border-t-2 border-gray-200">
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span className="text-gray-900">{t.totalCosts}</span>
                        <span className="text-blue-600">{formatCurrency(buyingCosts.total)}</span>
                      </div>
                      <div className="mt-2 flex justify-between items-center text-lg">
                        <span className="text-gray-600">{language === 'zh' ? '实际购房总价' : language === 'en' ? 'Total purchase price' : 'Faktisk købspris'}</span>
                        <span className="font-bold text-green-600">{formatCurrency(buyingCosts.totalWithPrice)}</span>
                      </div>
                    </div>

                    {/* Mortgage Calculator Toggle */}
                    <div className="mt-4">
                      <button
                        onClick={() => setShowLoan(!showLoan)}
                        className="w-full px-4 py-3 bg-blue-50 text-blue-700 font-medium rounded-xl hover:bg-blue-100 transition border border-blue-200"
                      >
                        🏦 {showLoan ? t.hideLoanCalc : t.showLoanCalc}
                      </button>
                    </div>

                    {/* Mortgage Calculator */}
                    {showLoan && loanResult && (
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
                              <option value={10}>10 {language === 'zh' ? '年' : 'years'}</option>
                              <option value={20}>20 {language === 'zh' ? '年' : 'years'}</option>
                              <option value={30}>30 {language === 'zh' ? '年' : 'years'}</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-white rounded-lg space-y-2">
                          <div className="flex justify-between"><span>{t.loanAmount}:</span><span className="font-bold">{formatCurrency(loanResult.loanAmount)}</span></div>
                          <div className="flex justify-between"><span>{t.monthlyPayment}:</span><span className="font-bold text-xl text-green-600">{formatCurrency(loanResult.monthlyPayment)}</span></div>
                          <div className="flex justify-between"><span>{t.totalInterest}:</span><span className="font-bold text-yellow-600">{formatCurrency(loanResult.totalInterest)}</span></div>
                        </div>
                        
                        <div className="mt-4 text-center">
                          <a href="https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=78126" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition">
                            {t.compareLoan}
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Insurance Link */}
                    <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="text-center">
                        <p className="text-sm text-green-700 mb-3">🏠 {t.needInsurance}</p>
                        <a href="https://www.partner-ads.com/dk/landingpage.php?id=56504&prg=9363&bannerid=92764&desturl=https://velkommen.tilmeld-haandvaerker.dk/3maaned_gratis" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition">
                          {t.compareInsurance}
                        </a>
                      </div>
                    </div>
                  </>
                )}

                {/* ========== SELLING COSTS ========== */}
                {tab === "sell" && sellingCosts && (
                  <>
                    {/* 中介费 */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.categoryAgent}</h3>
                      <div className="bg-orange-50 rounded-xl p-4 space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-700">{t.agentValuation}</span>
                          <span className="font-medium">{formatCurrency(AGENT_FEE_ITEMS.valuation.price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">{t.agentBudget}</span>
                          <span className="font-medium">{formatCurrency(AGENT_FEE_ITEMS.budget.price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">{t.agentMaterials}</span>
                          <span className="font-medium">{formatCurrency(AGENT_FEE_ITEMS.materials.price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">{t.agentContract}</span>
                          <span className="font-medium">{formatCurrency(AGENT_FEE_ITEMS.contract.price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">{t.agentAftercare}</span>
                          <span className="font-medium">{formatCurrency(AGENT_FEE_ITEMS.aftercare.price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">{t.agentSalesWork}</span>
                          <span className="font-medium">{formatCurrency(AGENT_FEE_ITEMS.saleswork.price)}</span>
                        </div>
                        <div className="flex justify-between pt-2 mt-2 border-t border-orange-200">
                          <span className="font-semibold text-orange-800">{t.agentFee}</span>
                          <span className="font-bold text-orange-600">{formatCurrency(sellingCosts.agentFee)}</span>
                        </div>
                      </div>
                    </div>

                    {/* 营销费 */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.categoryMarketing}</h3>
                      <div className="bg-blue-50 rounded-xl p-4 space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-700">{t.marketingOnline}</span>
                          <span className="font-medium">{formatCurrency(MARKETING_ITEMS.online.price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">{t.marketingPhotos}</span>
                          <span className="font-medium">{formatCurrency(MARKETING_ITEMS.photos.price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">{t.marketingDigital}</span>
                          <span className="font-medium">{formatCurrency(MARKETING_ITEMS.digital.price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">{t.marketingSocial}</span>
                          <span className="font-medium">{formatCurrency(MARKETING_ITEMS.social.price)}</span>
                        </div>
                        <div className="flex justify-between pt-2 mt-2 border-t border-blue-200">
                          <span className="font-semibold text-blue-800">{t.marketingFee}</span>
                          <span className="font-bold text-blue-600">{formatCurrency(sellingCosts.marketingFee)}</span>
                        </div>
                      </div>
                    </div>

                    {/* 第三方费用 */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.categoryThirdParty}</h3>
                      <div className="bg-gray-50 rounded-xl p-4 space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-700">{t.ejendomsdatarapport}</span>
                          <span className="font-medium">{formatCurrency(THIRD_PARTY_FEES.ejendomsdatarapport.price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">{t.edh}</span>
                          <span className="font-medium">{formatCurrency(THIRD_PARTY_FEES.edh.price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">{t.edokument}</span>
                          <span className="font-medium">{formatCurrency(THIRD_PARTY_FEES.edokument.price)}</span>
                        </div>
                        <div className="flex justify-between pt-2 mt-2 border-t border-gray-200">
                          <span className="font-semibold text-gray-800">{t.thirdParty}</span>
                          <span className="font-bold text-gray-600">{formatCurrency(sellingCosts.thirdParty)}</span>
                        </div>
                      </div>
                    </div>

                    {/* 其他费用 */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.categoryOther}</h3>
                      <div className="bg-purple-50 rounded-xl p-4 space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-700">{t.halfInsurance}</span>
                          <span className="font-medium">{formatCurrency(OTHER_SELLING_COSTS.halfInsurance.price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">{t.reports}</span>
                          <span className="font-medium">{formatCurrency(OTHER_SELLING_COSTS.reports.price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">{t.liability}</span>
                          <span className="font-medium">{formatCurrency(OTHER_SELLING_COSTS.liability.price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">{t.digitalTinglysning}</span>
                          <span className="font-medium">{formatCurrency(OTHER_SELLING_COSTS.digitalTinglysning.price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">{t.settlement}</span>
                          <span className="font-medium">{formatCurrency(OTHER_SELLING_COSTS.settlement.price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">{t.bankCosts}</span>
                          <span className="font-medium">{formatCurrency(OTHER_SELLING_COSTS.bankCosts.price)}</span>
                        </div>
                        <div className="flex justify-between pt-2 mt-2 border-t border-purple-200">
                          <span className="font-semibold text-purple-800">{t.otherCosts}</span>
                          <span className="font-bold text-purple-600">{formatCurrency(sellingCosts.otherCosts)}</span>
                        </div>
                      </div>
                    </div>

                    {/* 总计 */}
                    <div className="mt-6 pt-4 border-t-2 border-gray-200">
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span className="text-gray-900">{t.totalCosts}</span>
                        <span className="text-blue-600">{formatCurrency(sellingCosts.total)}</span>
                      </div>
                      
                      <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-green-900">{t.netProceeds}</span>
                          <span className="text-2xl font-bold text-green-600">{formatCurrency(sellingCosts.netProceeds)}</span>
                        </div>
                      </div>
                    </div>

                    {/* 房产估值链接 */}
                    <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
                      <div className="text-center">
                        <p className="text-sm text-orange-700 mb-3">
                          {language === 'zh' ? '📊 获取免费房产估值！' : language === 'en' ? '📊 Get a free property valuation!' : '📊 Få en gratis vurdering af din bolig!'}
                        </p>
                        <a href="https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=71154" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition">
                          {language === 'zh' ? '获取估值 →' : language === 'en' ? 'Get Valuation →' : 'Få vurdering →'}
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* ========== RENOVATE TAB ========== */}
        {tab === "renovate" && (
          <div className="space-y-6">
            {/* House Size Input */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.houseSize}</label>
              <input
                type="number" 
                value={houseSize} 
                onChange={(e) => setHouseSize(e.target.value)}
                placeholder="150"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg font-semibold"
              />
            </div>

            {/* Solar Calculator */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-4">{t.solarTitle}</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.solarKw}</label>
                <input
                  type="number" 
                  value={solarKw} 
                  onChange={(e) => setSolarKw(e.target.value)}
                  placeholder="6"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              {solarResult && (
                <div className="bg-yellow-50 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between"><span>{t.solarCost}:</span><span className="font-bold">{formatCurrency(solarResult.cost)}</span></div>
                  <div className="flex justify-between"><span>{t.solarArea}:</span><span>{solarResult.area} m²</span></div>
                  <div className="flex justify-between"><span>{t.solarAnnual}:</span><span>{solarResult.annualKwh} kWh</span></div>
                  <div className="flex justify-between"><span>{t.solarSavings}:</span><span className="text-green-600 font-medium">{formatCurrency(solarResult.annualSavings)}</span></div>
                  <div className="flex justify-between pt-2 border-t border-yellow-200"><span>{t.solarPayback}:</span><span className="font-bold">{solarResult.payback.toFixed(1)} {t.solarYears}</span></div>
                </div>
              )}
              {/* Solar Affiliate Link */}
              <div className="mt-4 text-center">
                <span className="inline-block px-4 py-2 bg-gray-100 text-gray-500 text-sm rounded-lg">
                  🌞 {language === 'zh' ? '太阳能广告商 Coming Soon' : language === 'en' ? 'Solar affiliate Coming Soon' : 'Solcelle partner Coming Soon'}
                </span>
              </div>
            </div>

            {/* Heat Pump Calculator */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-4">{t.heatPumpTitle}</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.heatPumpType}</label>
                <select 
                  value={heatPumpType} 
                  onChange={(e) => setHeatPumpType(e.target.value as "air" | "ground")}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white"
                >
                  <option value="air">{t.heatPumpAir}</option>
                  <option value="ground">{t.heatPumpGround}</option>
                </select>
              </div>
              <div className="bg-red-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between"><span>{t.heatPumpCost}:</span><span className="font-bold">{formatCurrency(heatPumpResult.cost)}</span></div>
                <div className="flex justify-between"><span>{t.heatPumpSavings}:</span><span className="text-green-600 font-medium">{formatCurrency(heatPumpResult.savings)}</span></div>
                <div className="flex justify-between pt-2 border-t border-red-200"><span>{t.heatPumpPayback}:</span><span className="font-bold">{heatPumpResult.payback.toFixed(1)} {t.solarYears}</span></div>
              </div>
              {/* Heat Pump Affiliate Link */}
              <div className="mt-4 text-center">
                <a href="https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=82597" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition">
                  🔥 {language === 'zh' ? '获取热泵报价 →' : language === 'en' ? 'Get Heat Pump Quotes →' : 'Få tilbud på varmepumpe →'}
                </a>
              </div>
            </div>

            {/* Windows Calculator */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">{t.windowsTitle}</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.windowCount}</label>
                <input
                  type="number" 
                  value={windowCount} 
                  onChange={(e) => setWindowCount(e.target.value)}
                  placeholder="10"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {windowResult && (
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex justify-between"><span>{t.windowCost}:</span><span className="font-bold text-blue-600">{formatCurrency(windowResult.cost)}</span></div>
                </div>
              )}
              {/* Windows Affiliate Link */}
              <div className="mt-4 text-center">
                <a href="https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=82598" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition">
                  🪟 {language === 'zh' ? '获取窗户报价 →' : language === 'en' ? 'Get Window Quotes →' : 'Få tilbud på vinduer →'}
                </a>
              </div>
            </div>

            {/* Insulation Calculator */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">{t.insulationTitle}</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.renovationTypes}</label>
                <div className="space-y-2">
                  {(['wall', 'attic', 'floor'] as const).map(type => (
                    <label key={type} className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <input
                        type="checkbox"
                        checked={renovations.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setRenovations([...renovations, type]);
                          } else {
                            setRenovations(renovations.filter(r => r !== type));
                          }
                        }}
                        className="w-5 h-5 text-green-600 rounded mr-3"
                      />
                      <span>{type === 'wall' ? t.wallInsulation : type === 'attic' ? t.atticInsulation : t.floorInsulation}</span>
                    </label>
                  ))}
                </div>
              </div>
              {insulationResult && (
                <div className="bg-green-50 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between"><span>{t.insulationCost}:</span><span className="font-bold">{formatCurrency(insulationResult.cost)}</span></div>
                  <div className="flex justify-between"><span>{t.insulationSavings}:</span><span className="text-green-600 font-medium">{formatCurrency(insulationResult.savings)}</span></div>
                  <div className="flex justify-between pt-2 border-t border-green-200"><span>{t.solarPayback}:</span><span className="font-bold">{insulationResult.payback.toFixed(1)} {t.solarYears}</span></div>
                </div>
              )}
              {/* Insulation Affiliate Link */}
              <div className="mt-4 text-center">
                <span className="inline-block px-4 py-2 bg-gray-100 text-gray-500 text-sm rounded-lg">
                  🏠 {language === 'zh' ? '保暖改造广告商 Coming Soon' : language === 'en' ? 'Insulation affiliate Coming Soon' : 'Isolering partner Coming Soon'}
                </span>
              </div>
            </div>

            {/* General Renovation Affiliate */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-center">
              <p className="text-white font-medium mb-4">
                {language === 'zh' ? '需要装修或改造服务？获取多家报价比较！' : language === 'en' ? 'Need renovation services? Get quotes from multiple providers!' : 'Har du brug for renovering? Få tilbud fra flere leverandører!'}
              </p>
              <a 
                href="https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=82599" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition shadow-lg"
              >
                {t.getQuotes}
              </a>
            </div>
          </div>
        )}

        {/* ========== MARKET TAB ========== */}
        {tab === "market" && (
          <div className="space-y-6">
            {/* 城市选择 */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                📊 {language === 'zh' ? '丹麦房价市场' : language === 'en' ? 'Danish Property Market' : 'Dansk Boligmarked'}
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                {language === 'zh' ? '选择城市查看平均房价、市场趋势和周边设施' : language === 'en' ? 'Select a city to see average prices, market trends and nearby amenities' : 'Vælg en by for at se gennemsnitspriser, markedstendenser og nærliggende faciliteter'}
              </p>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'zh' ? '选择城市/地区' : language === 'en' ? 'Select City / Region' : 'Vælg by / region'}
              </label>
              <select
                value={marketCity}
                onChange={(e) => setMarketCity(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none"
              >
                {Object.entries(REGION_PRICES).map(([key, val]) => (
                  <option key={key} value={key}>{val.name}</option>
                ))}
              </select>
            </div>

            {/* 价格信息卡片 */}
            {(() => {
              const city = REGION_PRICES[marketCity];
              const avgTotal = city.avgPrice * 120; // 120m² 典型丹麦住宅
              return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-2xl p-5 text-center">
                    <div className="text-3xl mb-2">🏠</div>
                    <div className="text-sm text-gray-500 mb-1">
                      {language === 'zh' ? '平均单价' : language === 'en' ? 'Avg. price/m²' : 'Gns. pris/m²'}
                    </div>
                    <div className="text-2xl font-bold text-blue-700">
                      {city.avgPrice.toLocaleString('da-DK')} kr/m²
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-2xl p-5 text-center">
                    <div className="text-3xl mb-2">📐</div>
                    <div className="text-sm text-gray-500 mb-1">
                      {language === 'zh' ? '典型120m²总价' : language === 'en' ? 'Typical 120m² total' : 'Typisk 120m² samlet'}
                    </div>
                    <div className="text-2xl font-bold text-green-700">
                      {avgTotal.toLocaleString('da-DK')} kr
                    </div>
                  </div>
                  <div className={`rounded-2xl p-5 text-center ${city.trend === 'up' ? 'bg-red-50' : city.trend === 'down' ? 'bg-yellow-50' : 'bg-gray-50'}`}>
                    <div className="text-3xl mb-2">
                      {city.trend === 'up' ? '📈' : city.trend === 'down' ? '📉' : '➡️'}
                    </div>
                    <div className="text-sm text-gray-500 mb-1">
                      {language === 'zh' ? '市场趋势' : language === 'en' ? 'Market trend' : 'Markedstrend'}
                    </div>
                    <div className={`text-xl font-bold ${city.trend === 'up' ? 'text-red-600' : city.trend === 'down' ? 'text-yellow-600' : 'text-gray-600'}`}>
                      {city.trend === 'up'
                        ? (language === 'zh' ? '↑ 上涨中' : language === 'en' ? '↑ Rising' : '↑ Stigende')
                        : city.trend === 'down'
                        ? (language === 'zh' ? '↓ 下跌中' : language === 'en' ? '↓ Falling' : '↓ Faldende')
                        : (language === 'zh' ? '→ 平稳' : language === 'en' ? '→ Stable' : '→ Stabil')}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* 房贷估算 */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                🏦 {language === 'zh' ? '快速房贷估算' : language === 'en' ? 'Quick Mortgage Estimate' : 'Hurtig boliglånberegning'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '意向房价 (kr)' : language === 'en' ? 'Target price (kr)' : 'Ønsket boligpris (kr)'}
                  </label>
                  <input
                    type="text"
                    value={marketMortgage ? parseFloat(marketMortgage).toLocaleString('da-DK') : ''}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\./g, '').replace(',', '.');
                      setMarketMortgage(raw);
                    }}
                    placeholder="2.500.000"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
                {marketMortgage && parseFloat(marketMortgage) > 0 && (() => {
                  const p = parseFloat(marketMortgage);
                  const loan = p * 0.8;
                  const monthlyRate = 3.2 / 100 / 12;
                  const n = 30 * 12;
                  const monthly = loan * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
                  return (
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="text-sm text-gray-500">
                        {language === 'zh' ? '月供估算（80%贷款，3.2%利率，30年）' : language === 'en' ? 'Est. monthly payment (80% LTV, 3.2%, 30yr)' : 'Est. månedlig ydelse (80% LTV, 3,2%, 30 år)'}
                      </div>
                      <div className="text-2xl font-bold text-blue-700 mt-1">
                        ~{Math.round(monthly).toLocaleString('da-DK')} kr/{language === 'zh' ? '月' : 'md.'}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        {language === 'zh' ? `贷款金额: ${loan.toLocaleString('da-DK')} kr` : `Loan: ${loan.toLocaleString('da-DK')} kr`}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* 周边环境 */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                🗺️ {language === 'zh' ? '周边生活环境' : language === 'en' ? 'Nearby Amenities' : 'Nærliggende faciliteter'}
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                {language === 'zh' ? `${REGION_PRICES[marketCity].name} 典型居住环境` : language === 'en' ? `Typical living environment in ${REGION_PRICES[marketCity].name}` : `Typisk bomiljø i ${REGION_PRICES[marketCity].name}`}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { icon: '🏫', label: language === 'zh' ? '学校' : language === 'en' ? 'Schools' : 'Skoler', value: language === 'zh' ? '步行10分钟内' : '10 min walk' },
                  { icon: '🏥', label: language === 'zh' ? '医院/诊所' : language === 'en' ? 'Hospital/Clinic' : 'Hospital/Klinik', value: language === 'zh' ? '大城市覆盖好' : 'Good in big cities' },
                  { icon: '🚌', label: language === 'zh' ? '公共交通' : language === 'en' ? 'Public Transport' : 'Offentlig transport', value: marketCity === 'kobenhavn' || marketCity === 'frederiksberg' ? 'Metro + Bus' : 'Bus' },
                  { icon: '🛒', label: language === 'zh' ? '超市' : language === 'en' ? 'Supermarket' : 'Supermarked', value: 'Netto, Rema, Føtex' },
                  { icon: '💪', label: language === 'zh' ? '健身房' : language === 'en' ? 'Gym' : 'Fitnesscenter', value: 'SATS, Fitness World' },
                  { icon: '🛍️', label: language === 'zh' ? '购物商圈' : language === 'en' ? 'Shopping' : 'Shopping', value: marketCity === 'kobenhavn' ? 'Strøget, Field\'s' : language === 'zh' ? '本地购物中心' : 'Local mall' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="font-medium text-gray-700 text-sm">{item.label}</div>
                      <div className="text-gray-500 text-xs">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-xl text-center">
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(REGION_PRICES[marketCity].name + ', Danmark')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium hover:underline text-sm"
                >
                  🗺️ {language === 'zh' ? `在 Google Maps 查看 ${REGION_PRICES[marketCity].name}` : language === 'en' ? `View ${REGION_PRICES[marketCity].name} on Google Maps` : `Se ${REGION_PRICES[marketCity].name} på Google Maps`}
                </a>
              </div>
            </div>

            {/* 贷款比较广告 */}
            <div className="text-center">
              <a href="https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=78126" target="_blank" rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                🏦 {language === 'zh' ? '比较最低利率房贷 →' : language === 'en' ? 'Compare mortgage rates →' : 'Sammenlign boliglånsrenter →'}
              </a>
            </div>
          </div>
        )}

        {/* ========== ANALYZE TAB ========== */}
        {tab === "analyze" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                🔍 {language === 'zh' ? '中介报价分析' : language === 'en' ? 'Agent Quote Analyzer' : 'Analyser mæglertilbud'}
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                {language === 'zh'
                  ? '粘贴或输入你从中介拿到的报价内容，我们帮你找出哪些费用可以议价，以及市场最低价参考。'
                  : language === 'en'
                  ? 'Paste or type the quote from your agent. We\'ll identify which fees are negotiable and show market benchmarks.'
                  : 'Indsæt eller skriv tilbuddet fra din mægler. Vi identificerer, hvilke gebyrer der kan forhandles.'}
              </p>

              {/* 买/卖切换 */}
              <div className="flex gap-3 mb-5">
                <button onClick={() => setAnalyzeType("buy")} className={`flex-1 py-2 rounded-xl font-semibold transition ${analyzeType === 'buy' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                  🏠 {language === 'zh' ? '买房报价' : language === 'en' ? 'Buyer Quote' : 'Købers tilbud'}
                </button>
                <button onClick={() => setAnalyzeType("sell")} className={`flex-1 py-2 rounded-xl font-semibold transition ${analyzeType === 'sell' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                  🏷️ {language === 'zh' ? '卖房报价' : language === 'en' ? 'Seller Quote' : 'Sælgers tilbud'}
                </button>
              </div>

              {/* 文本输入 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'zh' ? '粘贴报价内容（支持任意格式）' : language === 'en' ? 'Paste your quote (any format)' : 'Indsæt dit tilbud (ethvert format)'}
                </label>
                <textarea
                  value={quoteText}
                  onChange={(e) => setQuoteText(e.target.value)}
                  rows={6}
                  placeholder={language === 'zh'
                    ? '例如：\n中介费: 80,000 kr\n营销费: 25,000 kr\n能源报告: 6,000 kr\n律师费: 12,000 kr'
                    : language === 'en'
                    ? 'e.g.:\nAgent fee: 80,000 kr\nMarketing: 25,000 kr\nEnergy report: 6,000 kr'
                    : 'f.eks.:\nMæglerhonorar: 80.000 kr\nMarkedsføring: 25.000 kr\nEnergirapport: 6.000 kr'}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none text-sm font-mono"
                />
                <p className="text-xs text-gray-400 mt-1">
                  💡 {language === 'zh' ? '也可以直接输入费用名称和金额，或从PDF中复制粘贴文本' : language === 'en' ? 'You can also type fee names and amounts, or copy-paste text from a PDF' : 'Du kan også skrive gebyrnavne og beløb, eller kopiere tekst fra en PDF'}
                </p>
              </div>

              <button
                onClick={() => {
                  if (!quoteText.trim()) return;
                  setAnalyzeLoading(true);
                  // 本地分析逻辑：解析数字+关键词
                  setTimeout(() => {
                    const lines = quoteText.split('\n').filter(l => l.trim());
                    const BENCHMARKS = analyzeType === 'buy' ? [
                      { keywords: ['berigtigelse', '律师', 'advokathonorar', 'lawyer', 'legal'], name: language === 'zh' ? '律师费' : language === 'en' ? 'Legal fee' : 'Berigtigelse', min: 4000, max: 8000, negotiable: true, tip: language === 'zh' ? '可议价，市场价 4,000–8,000 kr' : 'Negotiable, market: 4,000–8,000 kr' },
                      { keywords: ['ejerskifteforsikring', '换手', '保险', 'insurance'], name: language === 'zh' ? '换手保险' : language === 'en' ? 'Transfer insurance' : 'Ejerskifteforsikring', min: 7000, max: 11000, negotiable: false, tip: language === 'zh' ? '通常固定，保护买方权益' : 'Usually fixed, protects buyer' },
                      { keywords: ['tilstandsrapport', '房屋状况', 'condition report'], name: language === 'zh' ? '房屋状况报告' : language === 'en' ? 'Condition report' : 'Tilstandsrapport', min: 6000, max: 10000, negotiable: true, tip: language === 'zh' ? '可自选验房师，价格差异大' : 'Can choose your own inspector' },
                      { keywords: ['elinstallationsrapport', '电气', 'electrical'], name: language === 'zh' ? '电气报告' : language === 'en' ? 'Electrical report' : 'Elinstallationsrapport', min: 2500, max: 4000, negotiable: true, tip: language === 'zh' ? '可自选，通常2,500–4,000 kr' : 'Can self-source, 2,500–4,000 kr' },
                    ] : [
                      { keywords: ['mæglerhonorar', 'salær', '中介', 'agent fee', 'commission'], name: language === 'zh' ? '中介佣金' : language === 'en' ? 'Agent commission' : 'Mæglerhonorar', min: 35000, max: 55000, negotiable: true, tip: language === 'zh' ? '强烈建议议价！市场价 35,000–55,000 kr' : 'Strongly negotiable! Market: 35,000–55,000 kr' },
                      { keywords: ['markedsføring', '营销', 'marketing'], name: language === 'zh' ? '营销费用' : language === 'en' ? 'Marketing' : 'Markedsføring', min: 12000, max: 18000, negotiable: true, tip: language === 'zh' ? '可压缩，问清具体包含什么' : 'Negotiable, ask for itemized list' },
                      { keywords: ['energimærkning', '能源', 'energy'], name: language === 'zh' ? '能源标签' : language === 'en' ? 'Energy label' : 'Energimærkning', min: 3000, max: 6000, negotiable: true, tip: language === 'zh' ? '可自行委托，市场价 3,000–6,000 kr' : 'Can self-commission, 3,000–6,000 kr' },
                      { keywords: ['settlement', 'opgørelse', '结算', '律师'], name: language === 'zh' ? '结算费' : language === 'en' ? 'Settlement fee' : 'Opgørelseshonorar', min: 1500, max: 3000, negotiable: true, tip: language === 'zh' ? '通常可争取减免' : 'Often negotiable or waivable' },
                    ];

                    const results: typeof quoteAnalysis = { items: [], totalQuoted: 0, totalMin: 0, saving: 0 };
                    let totalQuoted = 0;
                    let totalMin = 0;

                    // 提取金额
                    lines.forEach(line => {
                      const amountMatch = line.match(/[\d.,]+\s*(kr|dkk|kroner)?/i);
                      if (!amountMatch) return;
                      const rawNum = amountMatch[0].replace(/\./g, '').replace(',', '.').replace(/[^\d.]/g, '');
                      const amount = parseFloat(rawNum);
                      if (!amount || amount < 500) return;

                      const lineLower = line.toLowerCase();
                      const bench = BENCHMARKS.find(b => b.keywords.some(k => lineLower.includes(k)));
                      if (bench) {
                        results!.items.push({ name: bench.name, quoted: amount, marketMin: bench.min, marketMax: bench.max, negotiable: bench.negotiable, tip: bench.tip });
                        totalQuoted += amount;
                        totalMin += bench.min;
                      } else if (amount > 1000) {
                        // 未识别费用
                        results!.items.push({ name: line.split(':')[0].trim().slice(0, 30), quoted: amount, marketMin: Math.round(amount * 0.7), marketMax: amount, negotiable: true, tip: language === 'zh' ? '建议询问费用明细' : 'Ask for itemized breakdown' });
                        totalQuoted += amount;
                        totalMin += Math.round(amount * 0.7);
                      }
                    });

                    results!.totalQuoted = totalQuoted;
                    results!.totalMin = totalMin;
                    results!.saving = totalQuoted - totalMin;
                    setQuoteAnalysis(results);
                    setAnalyzeLoading(false);
                  }, 800);
                }}
                disabled={!quoteText.trim() || analyzeLoading}
                className="w-full py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {analyzeLoading
                  ? (language === 'zh' ? '分析中...' : language === 'en' ? 'Analyzing...' : 'Analyserer...')
                  : `🔍 ${language === 'zh' ? '开始分析报价' : language === 'en' ? 'Analyze Quote' : 'Analyser tilbud'}`}
              </button>
            </div>

            {/* 分析结果 */}
            {quoteAnalysis && quoteAnalysis.items.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {language === 'zh' ? '📋 分析结果' : language === 'en' ? '📋 Analysis Result' : '📋 Analyseresultat'}
                </h3>
                <p className="text-sm text-gray-400 mb-5">
                  {language === 'zh' ? `识别到 ${quoteAnalysis.items.length} 项费用` : language === 'en' ? `Identified ${quoteAnalysis.items.length} fee items` : `Identificeret ${quoteAnalysis.items.length} gebyrelementer`}
                  {analyzeType === 'buy'
                    ? (language === 'zh' ? '（买房报价）' : ' (buyer quote)')
                    : (language === 'zh' ? '（卖房报价）' : ' (seller quote)')}
                </p>

                <div className="space-y-3 mb-6">
                  {quoteAnalysis.items.map((item, i) => (
                    <div key={i} className={`rounded-xl p-4 ${item.negotiable ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'}`}>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-semibold text-gray-800">{item.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.negotiable ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-600'}`}>
                          {item.negotiable ? (language === 'zh' ? '⚡ 可议价' : '⚡ Negotiable') : (language === 'zh' ? '固定' : 'Fixed')}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-500">{language === 'zh' ? '报价' : 'Quoted'}: <span className="font-bold text-gray-800">{item.quoted.toLocaleString('da-DK')} kr</span></span>
                        <span className="text-green-600">{language === 'zh' ? '市场参考' : 'Market'}: {item.marketMin.toLocaleString('da-DK')}–{item.marketMax.toLocaleString('da-DK')} kr</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">💡 {item.tip}</p>
                    </div>
                  ))}
                </div>

                {/* 汇总 */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-5 text-white">
                  <div className="flex justify-between mb-2">
                    <span>{language === 'zh' ? '报价总计' : language === 'en' ? 'Total quoted' : 'Samlet tilbud'}</span>
                    <span className="font-bold">{quoteAnalysis.totalQuoted.toLocaleString('da-DK')} kr</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>{language === 'zh' ? '市场最低参考' : language === 'en' ? 'Market minimum' : 'Markedets minimum'}</span>
                    <span className="font-bold">{quoteAnalysis.totalMin.toLocaleString('da-DK')} kr</span>
                  </div>
                  <div className="border-t border-white/30 pt-2 flex justify-between text-lg">
                    <span className="font-bold">{language === 'zh' ? '🎉 潜在可省' : language === 'en' ? '🎉 Potential savings' : '🎉 Potentielle besparelser'}</span>
                    <span className="font-bold text-yellow-200">{quoteAnalysis.saving.toLocaleString('da-DK')} kr</span>
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-3 text-center">
                  {language === 'zh' ? '* 以上为参考价格，实际议价空间取决于市场和中介。建议多方比较。' : '* Reference prices only. Actual negotiation depends on market and agent. Always compare multiple quotes.'}
                </p>
              </div>
            )}

            {quoteAnalysis && quoteAnalysis.items.length === 0 && (
              <div className="bg-yellow-50 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">🤔</div>
                <p className="text-gray-600">
                  {language === 'zh' ? '未能识别到具体费用项目。请尝试输入包含金额的费用列表，例如：\n中介费: 80,000 kr' : 'Could not identify fee items. Try entering fee names with amounts, e.g.:\nAgent fee: 80,000 kr'}
                </p>
              </div>
            )}

            {/* 估价广告 */}
            <div className="text-center">
              <a href="https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=71154" target="_blank" rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition">
                🏠 {language === 'zh' ? '获取免费房产估价 →' : language === 'en' ? 'Get free property valuation →' : 'Få gratis boligvurdering →'}
              </a>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2026 BoligBeregner Danmark | {language === 'zh' ? '数据基于真实中介合同' : language === 'en' ? 'Data based on real estate contracts' : 'Data baseret på ejendomsmæglerkontrakter'}</p>
        </div>
      </div>
    </div>
  );
}
