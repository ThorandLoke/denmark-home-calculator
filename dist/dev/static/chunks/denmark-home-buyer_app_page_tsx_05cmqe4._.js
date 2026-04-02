(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/denmark-home-buyer/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "REGION_PRICES",
    ()=>REGION_PRICES,
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/denmark-home-buyer/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/denmark-home-buyer/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const REGION_PRICES = {
    kobenhavn: {
        name: "København",
        avgPrice: 55000,
        trend: "stable"
    },
    frederiksberg: {
        name: "Frederiksberg",
        avgPrice: 58000,
        trend: "stable"
    },
    gentofte: {
        name: "Gentofte",
        avgPrice: 65000,
        trend: "stable"
    },
    aarhus: {
        name: "Aarhus",
        avgPrice: 32000,
        trend: "up"
    },
    odense: {
        name: "Odense",
        avgPrice: 18000,
        trend: "stable"
    },
    aalborg: {
        name: "Aalborg",
        avgPrice: 16000,
        trend: "up"
    },
    esbjerg: {
        name: "Esbjerg",
        avgPrice: 14000,
        trend: "down"
    },
    randers: {
        name: "Randers",
        avgPrice: 12000,
        trend: "stable"
    },
    kolding: {
        name: "Kolding",
        avgPrice: 18000,
        trend: "up"
    },
    horsens: {
        name: "Horsens",
        avgPrice: 15000,
        trend: "up"
    },
    vejle: {
        name: "Vejle",
        avgPrice: 17000,
        trend: "up"
    },
    roskilde: {
        name: "Roskilde",
        avgPrice: 28000,
        trend: "up"
    },
    silkeborg: {
        name: "Silkeborg",
        avgPrice: 20000,
        trend: "up"
    },
    herning: {
        name: "Herning",
        avgPrice: 14000,
        trend: "up"
    },
    holstebro: {
        name: "Holstebro",
        avgPrice: 13000,
        trend: "stable"
    },
    viborg: {
        name: "Viborg",
        avgPrice: 13000,
        trend: "stable"
    },
    fredericia: {
        name: "Fredericia",
        avgPrice: 15000,
        trend: "stable"
    },
    middelfart: {
        name: "Middelfart",
        avgPrice: 18000,
        trend: "up"
    },
    thisted: {
        name: "Thisted",
        avgPrice: 10000,
        trend: "stable"
    },
    svendborg: {
        name: "Svendborg",
        avgPrice: 14000,
        trend: "stable"
    },
    holbæk: {
        name: "Holbæk",
        avgPrice: 15000,
        trend: "up"
    },
    køge: {
        name: "Køge",
        avgPrice: 23000,
        trend: "up"
    },
    nakskov: {
        name: "Nakskov",
        avgPrice: 8000,
        trend: "down"
    },
    frederikshavn: {
        name: "Frederikshavn",
        avgPrice: 9000,
        trend: "down"
    }
};
// 中介费结构（基于真实PDF）
const AGENT_FEE_ITEMS = {
    valuation: {
        price: 4500
    },
    budget: {
        price: 5000
    },
    materials: {
        price: 5750
    },
    contract: {
        price: 6500
    },
    aftercare: {
        price: 10000
    },
    saleswork: {
        price: 10000
    },
    baseTotal: 41750
};
// 营销费用（基于真实PDF）
const MARKETING_ITEMS = {
    online: {
        price: 5000
    },
    photos: {
        price: 5000
    },
    digital: {
        price: 5250
    },
    social: {
        price: 3000
    },
    marketingTotal: 18250
};
// 第三方支出
const THIRD_PARTY_FEES = {
    ejendomsdatarapport: {
        price: 105
    },
    edh: {
        price: 473
    },
    edokument: {
        price: 509
    },
    thirdPartyTotal: 1087
};
// 其他卖房费用（基于真实PDF）
const OTHER_SELLING_COSTS = {
    halfInsurance: {
        price: 7500
    },
    reports: {
        price: 12695
    },
    liability: {
        price: 1963
    },
    digitalTinglysning: {
        price: 6250
    },
    settlement: {
        price: 2250
    },
    bankCosts: {
        price: 5695
    }
};
// 买房固定费用
const BUYING_FIXED_COSTS = {
    berigtigelse: {
        price: 5500
    },
    ejerskifteforsikring: {
        price: 8500
    },
    tilstandsrapport: {
        price: 8700
    },
    elrapport: {
        price: 3000
    },
    energimrkning: {
        price: 1200
    }
};
// 太阳能板数据
const SOLAR_DATA = {
    costPerKwp: 12000,
    areaPerKwp: 7,
    annualKwhPerKwp: 1000,
    electricityPrice: 2.5
};
// 热泵数据（基于丹麦市场数据）
const HEATPUMP_DATA = {
    // 空气源热泵：初期投入低，但效率较低
    air: {
        cost: 150000,
        savings: 14000,
        efficiency: 300
    },
    // 地源热泵：初期投入高，但效率高，长期更省钱
    ground: {
        cost: 280000,
        savings: 25000,
        efficiency: 450
    },
    annualHeatingCost: 20000
};
// 窗户数据
const WINDOW_DATA = {
    costPerWindow: 8000
};
// 保暖改造数据
const INSULATION_DATA = {
    wall: {
        costPerSqm: 800,
        saving: 15
    },
    attic: {
        costPerSqm: 400,
        saving: 10
    },
    floor: {
        costPerSqm: 600,
        saving: 8
    }
};
// ==================== 翻译配置 ====================
const translations = {
    da: {
        title: "BoligBeregner Danmark",
        subtitle: "Beregn alle omkostninger ved køb, salg og renovering i Danmark",
        tabs: {
            buy: "Køb bolig",
            sell: "Sælg bolig",
            renovate: "Renovering"
        },
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
        categoryBuying: "💰 Købsomkostninger"
    },
    en: {
        title: "Denmark Home Calculator",
        subtitle: "Calculate all costs when buying/selling property in Denmark",
        tabs: {
            buy: "Buy",
            sell: "Sell",
            renovate: "Renovate"
        },
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
        categoryBuying: "💰 Buying Costs"
    },
    zh: {
        title: "丹麦房产计算器",
        subtitle: "计算在丹麦买房/卖房/改造的所有费用",
        tabs: {
            buy: "买房",
            sell: "卖房",
            renovate: "改造"
        },
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
        categoryBuying: "💰 买房费用"
    }
};
// ==================== 计算函数 ====================
function calculateSellingCosts(price) {
    const agentFee = AGENT_FEE_ITEMS.baseTotal;
    const marketingFee = MARKETING_ITEMS.marketingTotal;
    const thirdParty = THIRD_PARTY_FEES.thirdPartyTotal;
    const otherCosts = OTHER_SELLING_COSTS.halfInsurance.price + OTHER_SELLING_COSTS.reports.price + OTHER_SELLING_COSTS.liability.price + OTHER_SELLING_COSTS.digitalTinglysning.price + OTHER_SELLING_COSTS.settlement.price + OTHER_SELLING_COSTS.bankCosts.price;
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
        otherBreakdown: OTHER_SELLING_COSTS
    };
}
function calculateBuyingCosts(price) {
    const tinglysning = price * 0.006;
    const fixedCosts = Object.values(BUYING_FIXED_COSTS).reduce((sum, item)=>sum + item.price, 0);
    const total = tinglysning + fixedCosts;
    return {
        tinglysning,
        fixedCosts,
        total,
        totalWithPrice: price + total
    };
}
function calculateLoan(params) {
    const { price, downPaymentPercent, rate, years } = params;
    const loanAmount = price * (1 - downPaymentPercent / 100);
    const monthlyRate = rate / 100 / 12;
    const totalPayments = years * 12;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    const totalPaid = monthlyPayment * totalPayments;
    const totalInterest = totalPaid - loanAmount;
    return {
        loanAmount,
        monthlyPayment,
        totalInterest,
        totalPaid
    };
}
function generateAIAdvice(price, type, language) {
    const advice = [];
    if (type === "sell") {
        // 费用占比提醒
        const totalCost = calculateSellingCosts(price).total;
        const costPercent = (totalCost / price * 100).toFixed(1);
        if (language === "zh") {
            advice.push({
                type: "info",
                icon: "💡",
                text: `卖房费用约占房价的 ${costPercent}%，约 ${totalCost.toLocaleString()} kr`
            });
            advice.push({
                type: "tip",
                icon: "📸",
                text: "建议：请专业摄影师拍摄房屋照片，可提升售价5-10%"
            });
            advice.push({
                type: "warning",
                icon: "🔍",
                text: "买房者通常会在交房前要求验房，建议提前准备"
            });
            advice.push({
                type: "tip",
                icon: "🏦",
                text: "多家比较房贷利率，当前市场利率约3-4% (FlexKort)"
            });
        } else if (language === "en") {
            advice.push({
                type: "info",
                icon: "💡",
                text: `Selling costs are approximately ${costPercent}% of property price`
            });
            advice.push({
                type: "tip",
                icon: "📸",
                text: "Professional photos can increase sale price by 5-10%"
            });
            advice.push({
                type: "warning",
                icon: "🔍",
                text: "Buyers usually require inspection before closing"
            });
            advice.push({
                type: "tip",
                icon: "🏦",
                text: "Compare mortgage rates - current market ~3-4% (FlexKort)"
            });
        } else {
            advice.push({
                type: "info",
                icon: "💡",
                text: `Salgsomkostninger udgør ca. ${costPercent}% af boligprisen`
            });
            advice.push({
                type: "tip",
                icon: "📸",
                text: "Professionelle fotos kan øge salgsprisen med 5-10%"
            });
            advice.push({
                type: "warning",
                icon: "🔍",
                text: "Købere kræver typisk inspektion før overdragelse"
            });
            advice.push({
                type: "tip",
                icon: "🏦",
                text: "Sammenlign boliglånsrenter - nuværende marked ~3-4% (FlexKort)"
            });
        }
    } else {
        // 买房建议
        if (language === "zh") {
            advice.push({
                type: "tip",
                icon: "🔍",
                text: "买房前建议聘请专业验房师检查房屋状况"
            });
            advice.push({
                type: "tip",
                icon: "📋",
                text: "丹麦法律规定卖家必须提供验房报告"
            });
            advice.push({
                type: "tip",
                icon: "🏦",
                text: "多家比较房贷利率，当前市场参考利率：5年固定约3.5%，10年固定约3.8%"
            });
            advice.push({
                type: "warning",
                icon: "⚠️",
                text: "外国人购房可能需要额外准备文件和更高的首付"
            });
        } else if (language === "en") {
            advice.push({
                type: "tip",
                icon: "🔍",
                text: "Hire a professional inspector before buying"
            });
            advice.push({
                type: "tip",
                icon: "📋",
                text: "Danish law requires sellers to provide condition report"
            });
            advice.push({
                type: "tip",
                icon: "🏦",
                text: "Compare mortgage rates: 5-year fixed ~3.5%, 10-year fixed ~3.8%"
            });
            advice.push({
                type: "warning",
                icon: "⚠️",
                text: "Foreigners may need additional documentation and higher down payment"
            });
        } else {
            advice.push({
                type: "tip",
                icon: "🔍",
                text: "Få en professionel bygningsinspektør før køb"
            });
            advice.push({
                type: "tip",
                icon: "📋",
                text: "Dansk lovgivning kræver sælger tilstandsrapport"
            });
            advice.push({
                type: "tip",
                icon: "🏦",
                text: "Sammenlign boliglånsrenter: 5-års fast ~3,5%, 10-års fast ~3,8%"
            });
            advice.push({
                type: "warning",
                icon: "⚠️",
                text: "Udlændinge kan have brug for ekstra dokumentation og højere udbetaling"
            });
        }
    }
    return advice;
}
function Home() {
    _s();
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("buy");
    const [price, setPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("zh");
    // 改造相关
    const [houseSize, setHouseSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [solarKw, setSolarKw] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [heatPumpType, setHeatPumpType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("air");
    const [windowCount, setWindowCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [renovations, setRenovations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // 贷款相关
    const [showLoan, setShowLoan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [downPaymentPercent, setDownPaymentPercent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(20);
    const [loanRate, setLoanRate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(3.2);
    const [loanYears, setLoanYears] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(30);
    // 计算结果
    const sellingCosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[sellingCosts]": ()=>price ? calculateSellingCosts(parseFloat(price)) : null
    }["Home.useMemo[sellingCosts]"], [
        price
    ]);
    const buyingCosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[buyingCosts]": ()=>price ? calculateBuyingCosts(parseFloat(price)) : null
    }["Home.useMemo[buyingCosts]"], [
        price
    ]);
    const loanResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[loanResult]": ()=>price && showLoan ? calculateLoan({
                price: parseFloat(price),
                downPaymentPercent,
                rate: loanRate,
                years: loanYears
            }) : null
    }["Home.useMemo[loanResult]"], [
        price,
        downPaymentPercent,
        loanRate,
        loanYears,
        showLoan
    ]);
    const aiAdvice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[aiAdvice]": ()=>price && !showLoan ? generateAIAdvice(parseFloat(price), tab === "buy" ? "buy" : "sell", language) : []
    }["Home.useMemo[aiAdvice]"], [
        price,
        tab,
        language,
        showLoan
    ]);
    const t = translations[language];
    const formatCurrency = (amount)=>{
        return amount.toLocaleString('da-DK') + ' kr';
    };
    // 改造计算
    const solarResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[solarResult]": ()=>{
            if (!solarKw) return null;
            const kw = parseFloat(solarKw);
            const cost = kw * SOLAR_DATA.costPerKwp;
            const area = kw * SOLAR_DATA.areaPerKwp;
            const annualKwh = kw * SOLAR_DATA.annualKwhPerKwp;
            const annualSavings = annualKwh * SOLAR_DATA.electricityPrice;
            const payback = cost / annualSavings;
            return {
                cost,
                area,
                annualKwh,
                annualSavings,
                payback
            };
        }
    }["Home.useMemo[solarResult]"], [
        solarKw
    ]);
    const heatPumpResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[heatPumpResult]": ()=>{
            const data = HEATPUMP_DATA[heatPumpType];
            const savings = data.savings;
            const payback = data.cost / savings;
            return {
                ...data,
                savings,
                payback
            };
        }
    }["Home.useMemo[heatPumpResult]"], [
        heatPumpType
    ]);
    const windowResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[windowResult]": ()=>{
            if (!windowCount) return null;
            const count = parseInt(windowCount);
            const cost = count * WINDOW_DATA.costPerWindow;
            return {
                cost
            };
        }
    }["Home.useMemo[windowResult]"], [
        windowCount
    ]);
    const insulationResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[insulationResult]": ()=>{
            if (!houseSize || renovations.length === 0) return null;
            const size = parseFloat(houseSize);
            let totalCost = 0;
            let totalSavings = 0;
            renovations.forEach({
                "Home.useMemo[insulationResult]": (r)=>{
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
                }
            }["Home.useMemo[insulationResult]"]);
            const payback = totalSavings > 0 ? totalCost / totalSavings : 0;
            return {
                cost: totalCost,
                savings: totalSavings,
                payback
            };
        }
    }["Home.useMemo[insulationResult]"], [
        houseSize,
        renovations
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white shadow-sm border-b",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-4xl mx-auto px-4 py-4 flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-2xl font-bold text-gray-900",
                                    children: t.title
                                }, void 0, false, {
                                    fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                    lineNumber: 607,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600",
                                    children: t.subtitle
                                }, void 0, false, {
                                    fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                    lineNumber: 608,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/denmark-home-buyer/app/page.tsx",
                            lineNumber: 606,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                'da',
                                'en',
                                'zh'
                            ].map((lang)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setLanguage(lang),
                                    className: `px-3 py-1.5 rounded-lg font-medium text-sm transition ${language === lang ? 'bg-blue-500 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`,
                                    children: lang === 'da' ? '🇩🇰 DA' : lang === 'en' ? '🇬🇧 EN' : '🇨🇳 中文'
                                }, lang, false, {
                                    fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                    lineNumber: 614,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/denmark-home-buyer/app/page.tsx",
                            lineNumber: 612,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/denmark-home-buyer/app/page.tsx",
                    lineNumber: 605,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                lineNumber: 604,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-4xl mx-auto px-4 py-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setTab("buy"),
                                className: `flex-1 px-4 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${tab === "buy" ? "bg-green-500 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-50"}`,
                                children: [
                                    "🏠 ",
                                    t.tabs.buy
                                ]
                            }, void 0, true, {
                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                lineNumber: 635,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setTab("sell"),
                                className: `flex-1 px-4 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${tab === "sell" ? "bg-orange-500 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-50"}`,
                                children: [
                                    "🏷️ ",
                                    t.tabs.sell
                                ]
                            }, void 0, true, {
                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                lineNumber: 643,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setTab("renovate"),
                                className: `flex-1 px-4 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${tab === "renovate" ? "bg-purple-500 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-50"}`,
                                children: [
                                    "🔨 ",
                                    t.tabs.renovate
                                ]
                            }, void 0, true, {
                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                lineNumber: 651,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                        lineNumber: 634,
                        columnNumber: 9
                    }, this),
                    (tab === "buy" || tab === "sell") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl shadow-xl p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-2",
                                        children: t.priceLabel
                                    }, void 0, false, {
                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                        lineNumber: 666,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: price ? parseFloat(price).toLocaleString('da-DK') : '',
                                        onChange: (e)=>{
                                            const raw = e.target.value.replace(/\./g, '').replace(',', '.');
                                            setPrice(raw);
                                        },
                                        placeholder: "1.275.000",
                                        className: "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                                    }, void 0, false, {
                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                        lineNumber: 667,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                lineNumber: 665,
                                columnNumber: 13
                            }, this),
                            price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t pt-6",
                                children: [
                                    aiAdvice.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-bold text-purple-900 mb-3",
                                                children: [
                                                    "💡 ",
                                                    t.aiAdvice
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 686,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: aiAdvice.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `p-3 rounded-lg ${item.type === "warning" ? "bg-yellow-50 border-yellow-200" : item.type === "tip" ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"}`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-700",
                                                            children: [
                                                                item.icon,
                                                                " ",
                                                                item.text
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                            lineNumber: 690,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, i, false, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 689,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 687,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                        lineNumber: 685,
                                        columnNumber: 19
                                    }, this),
                                    tab === "buy" && buyingCosts && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold text-gray-900 mb-4",
                                                children: [
                                                    "📊 ",
                                                    t.categoryBuying
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 700,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between py-2 border-b border-gray-100",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-700",
                                                                children: t.tinglysning
                                                            }, void 0, false, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 704,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold text-gray-900",
                                                                children: formatCurrency(buyingCosts.tinglysning)
                                                            }, void 0, false, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 705,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 703,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between py-2 border-b border-gray-100",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-700",
                                                                children: t.berigtigelse
                                                            }, void 0, false, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 708,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold text-gray-900",
                                                                children: formatCurrency(BUYING_FIXED_COSTS.berigtigelse.price)
                                                            }, void 0, false, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 709,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 707,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between py-2 border-b border-gray-100",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-700",
                                                                children: t.ejerskifteforsikring
                                                            }, void 0, false, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 712,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold text-gray-900",
                                                                children: formatCurrency(BUYING_FIXED_COSTS.ejerskifteforsikring.price)
                                                            }, void 0, false, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 713,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 711,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between py-2 border-b border-gray-100",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-700",
                                                                children: t.tilstandsrapport
                                                            }, void 0, false, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 716,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold text-gray-900",
                                                                children: formatCurrency(BUYING_FIXED_COSTS.tilstandsrapport.price)
                                                            }, void 0, false, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 717,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 715,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between py-2 border-b border-gray-100",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-700",
                                                                children: t.elinstallationsrapport
                                                            }, void 0, false, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 720,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold text-gray-900",
                                                                children: formatCurrency(BUYING_FIXED_COSTS.elrapport.price)
                                                            }, void 0, false, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 721,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 719,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between py-2 border-b border-gray-100",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-700",
                                                                children: t.energimrkning
                                                            }, void 0, false, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 724,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold text-gray-900",
                                                                children: formatCurrency(BUYING_FIXED_COSTS.energimrkning.price)
                                                            }, void 0, false, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 725,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 723,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 702,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-6 pt-4 border-t-2 border-gray-200",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-center text-xl font-bold",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-900",
                                                                children: t.totalCosts
                                                            }, void 0, false, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 732,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-blue-600",
                                                                children: formatCurrency(buyingCosts.total)
                                                            }, void 0, false, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 733,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 731,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-2 flex justify-between items-center text-lg",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-600",
                                                                children: language === 'zh' ? '实际购房总价' : language === 'en' ? 'Total purchase price' : 'Faktisk købspris'
                                                            }, void 0, false, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 736,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-green-600",
                                                                children: formatCurrency(buyingCosts.totalWithPrice)
                                                            }, void 0, false, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 737,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 735,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 730,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setShowLoan(!showLoan),
                                                    className: "w-full px-4 py-3 bg-blue-50 text-blue-700 font-medium rounded-xl hover:bg-blue-100 transition border border-blue-200",
                                                    children: [
                                                        "🏦 ",
                                                        showLoan ? t.hideLoanCalc : t.showLoanCalc
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                    lineNumber: 743,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 742,
                                                columnNumber: 21
                                            }, this),
                                            showLoan && loanResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-bold text-blue-900 mb-4",
                                                        children: [
                                                            "🏦 ",
                                                            language === "da" ? "Boliglånsberegner" : language === "en" ? "Mortgage Calculator" : "房贷计算器"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 754,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid md:grid-cols-3 gap-4 mb-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                                                        children: t.downPayment
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 758,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "range",
                                                                        min: "5",
                                                                        max: "40",
                                                                        value: downPaymentPercent,
                                                                        onChange: (e)=>setDownPaymentPercent(parseInt(e.target.value)),
                                                                        className: "w-full"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 759,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-center font-bold text-blue-600",
                                                                        children: [
                                                                            downPaymentPercent,
                                                                            "% (",
                                                                            formatCurrency(parseFloat(price) * downPaymentPercent / 100),
                                                                            ")"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 760,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 757,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                                                        children: t.interestRate
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 763,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        step: "0.1",
                                                                        value: loanRate,
                                                                        onChange: (e)=>setLoanRate(parseFloat(e.target.value) || 0),
                                                                        className: "w-full px-3 py-2 border rounded-lg"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 764,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 762,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                                                        children: t.loanTerm
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 767,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                        value: loanYears,
                                                                        onChange: (e)=>setLoanYears(parseInt(e.target.value)),
                                                                        className: "w-full px-3 py-2 border rounded-lg bg-white",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: 10,
                                                                                children: [
                                                                                    "10 ",
                                                                                    language === 'zh' ? '年' : 'years'
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                                lineNumber: 769,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: 20,
                                                                                children: [
                                                                                    "20 ",
                                                                                    language === 'zh' ? '年' : 'years'
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                                lineNumber: 770,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: 30,
                                                                                children: [
                                                                                    "30 ",
                                                                                    language === 'zh' ? '年' : 'years'
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                                lineNumber: 771,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 768,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 766,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 756,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-4 bg-white rounded-lg space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            t.loanAmount,
                                                                            ":"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 777,
                                                                        columnNumber: 65
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold",
                                                                        children: formatCurrency(loanResult.loanAmount)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 777,
                                                                        columnNumber: 93
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 777,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            t.monthlyPayment,
                                                                            ":"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 778,
                                                                        columnNumber: 65
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold text-xl text-green-600",
                                                                        children: formatCurrency(loanResult.monthlyPayment)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 778,
                                                                        columnNumber: 97
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 778,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            t.totalInterest,
                                                                            ":"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 779,
                                                                        columnNumber: 65
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold text-yellow-600",
                                                                        children: formatCurrency(loanResult.totalInterest)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 779,
                                                                        columnNumber: 96
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 779,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 776,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-4 text-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=78126",
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "inline-block px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition",
                                                            children: t.compareLoan
                                                        }, void 0, false, {
                                                            fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                            lineNumber: 783,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 782,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 753,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4 p-4 bg-green-50 rounded-xl border border-green-200",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-green-700 mb-3",
                                                            children: [
                                                                "🏠 ",
                                                                t.needInsurance
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                            lineNumber: 793,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "https://www.partner-ads.com/dk/landingpage.php?id=56504&prg=9363&bannerid=92764&desturl=https://velkommen.tilmeld-haandvaerker.dk/3maaned_gratis",
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "inline-block px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition",
                                                            children: t.compareInsurance
                                                        }, void 0, false, {
                                                            fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                            lineNumber: 794,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                    lineNumber: 792,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 791,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    tab === "sell" && sellingCosts && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-semibold text-gray-900 mb-2",
                                                        children: t.categoryAgent
                                                    }, void 0, false, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 807,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-orange-50 rounded-xl p-4 space-y-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.agentValuation
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 810,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(AGENT_FEE_ITEMS.valuation.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 811,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 809,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.agentBudget
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 814,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(AGENT_FEE_ITEMS.budget.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 815,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 813,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.agentMaterials
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 818,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(AGENT_FEE_ITEMS.materials.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 819,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 817,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.agentContract
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 822,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(AGENT_FEE_ITEMS.contract.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 823,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 821,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.agentAftercare
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 826,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(AGENT_FEE_ITEMS.aftercare.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 827,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 825,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.agentSalesWork
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 830,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(AGENT_FEE_ITEMS.saleswork.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 831,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 829,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between pt-2 mt-2 border-t border-orange-200",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold text-orange-800",
                                                                        children: t.agentFee
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 834,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold text-orange-600",
                                                                        children: formatCurrency(sellingCosts.agentFee)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 835,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 833,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 808,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 806,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-semibold text-gray-900 mb-2",
                                                        children: t.categoryMarketing
                                                    }, void 0, false, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 842,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-blue-50 rounded-xl p-4 space-y-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.marketingOnline
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 845,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(MARKETING_ITEMS.online.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 846,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 844,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.marketingPhotos
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 849,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(MARKETING_ITEMS.photos.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 850,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 848,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.marketingDigital
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 853,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(MARKETING_ITEMS.digital.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 854,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 852,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.marketingSocial
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 857,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(MARKETING_ITEMS.social.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 858,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 856,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between pt-2 mt-2 border-t border-blue-200",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold text-blue-800",
                                                                        children: t.marketingFee
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 861,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold text-blue-600",
                                                                        children: formatCurrency(sellingCosts.marketingFee)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 862,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 860,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 843,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 841,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-semibold text-gray-900 mb-2",
                                                        children: t.categoryThirdParty
                                                    }, void 0, false, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 869,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-gray-50 rounded-xl p-4 space-y-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.ejendomsdatarapport
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 872,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(THIRD_PARTY_FEES.ejendomsdatarapport.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 873,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 871,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.edh
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 876,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(THIRD_PARTY_FEES.edh.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 877,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 875,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.edokument
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 880,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(THIRD_PARTY_FEES.edokument.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 881,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 879,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between pt-2 mt-2 border-t border-gray-200",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold text-gray-800",
                                                                        children: t.thirdParty
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 884,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold text-gray-600",
                                                                        children: formatCurrency(sellingCosts.thirdParty)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 885,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 883,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 870,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 868,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-semibold text-gray-900 mb-2",
                                                        children: t.categoryOther
                                                    }, void 0, false, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 892,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-purple-50 rounded-xl p-4 space-y-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.halfInsurance
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 895,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(OTHER_SELLING_COSTS.halfInsurance.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 896,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 894,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.reports
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 899,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(OTHER_SELLING_COSTS.reports.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 900,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 898,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.liability
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 903,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(OTHER_SELLING_COSTS.liability.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 904,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 902,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.digitalTinglysning
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 907,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(OTHER_SELLING_COSTS.digitalTinglysning.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 908,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 906,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.settlement
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 911,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(OTHER_SELLING_COSTS.settlement.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 912,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 910,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.bankCosts
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 915,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(OTHER_SELLING_COSTS.bankCosts.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 916,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 914,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between pt-2 mt-2 border-t border-purple-200",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold text-purple-800",
                                                                        children: t.otherCosts
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 919,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold text-purple-600",
                                                                        children: formatCurrency(sellingCosts.otherCosts)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                        lineNumber: 920,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 918,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 893,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 891,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-6 pt-4 border-t-2 border-gray-200",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-center text-xl font-bold",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-900",
                                                                children: t.totalCosts
                                                            }, void 0, false, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 928,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-blue-600",
                                                                children: formatCurrency(sellingCosts.total)
                                                            }, void 0, false, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 929,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 927,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-4 p-4 bg-green-50 rounded-xl border border-green-200",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between items-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-green-900",
                                                                    children: t.netProceeds
                                                                }, void 0, false, {
                                                                    fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                    lineNumber: 934,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-2xl font-bold text-green-600",
                                                                    children: formatCurrency(sellingCosts.netProceeds)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                    lineNumber: 935,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                            lineNumber: 933,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 932,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 926,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4 p-4 bg-orange-50 rounded-xl border border-orange-200",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-orange-700 mb-3",
                                                            children: language === 'zh' ? '📊 获取免费房产估值！' : language === 'en' ? '📊 Get a free property valuation!' : '📊 Få en gratis vurdering af din bolig!'
                                                        }, void 0, false, {
                                                            fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                            lineNumber: 943,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=71154",
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "inline-block px-6 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition",
                                                            children: language === 'zh' ? '获取估值 →' : language === 'en' ? 'Get Valuation →' : 'Få vurdering →'
                                                        }, void 0, false, {
                                                            fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                            lineNumber: 946,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                    lineNumber: 942,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 941,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                lineNumber: 681,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                        lineNumber: 663,
                        columnNumber: 11
                    }, this),
                    tab === "renovate" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-xl p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-2",
                                        children: t.houseSize
                                    }, void 0, false, {
                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                        lineNumber: 963,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        value: houseSize,
                                        onChange: (e)=>setHouseSize(e.target.value),
                                        placeholder: "150",
                                        className: "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg font-semibold"
                                    }, void 0, false, {
                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                        lineNumber: 964,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                lineNumber: 962,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-xl p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-yellow-900 mb-4",
                                        children: t.solarTitle
                                    }, void 0, false, {
                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                        lineNumber: 975,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-2",
                                                children: t.solarKw
                                            }, void 0, false, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 977,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                value: solarKw,
                                                onChange: (e)=>setSolarKw(e.target.value),
                                                placeholder: "6",
                                                className: "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            }, void 0, false, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 978,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                        lineNumber: 976,
                                        columnNumber: 15
                                    }, this),
                                    solarResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-yellow-50 rounded-xl p-4 space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            t.solarCost,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 988,
                                                        columnNumber: 57
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: formatCurrency(solarResult.cost)
                                                    }, void 0, false, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 988,
                                                        columnNumber: 84
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 988,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            t.solarArea,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 989,
                                                        columnNumber: 57
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            solarResult.area,
                                                            " m²"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 989,
                                                        columnNumber: 84
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 989,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            t.solarAnnual,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 990,
                                                        columnNumber: 57
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            solarResult.annualKwh,
                                                            " kWh"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 990,
                                                        columnNumber: 86
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 990,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            t.solarSavings,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 991,
                                                        columnNumber: 57
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-green-600 font-medium",
                                                        children: formatCurrency(solarResult.annualSavings)
                                                    }, void 0, false, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 991,
                                                        columnNumber: 87
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 991,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between pt-2 border-t border-yellow-200",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            t.solarPayback,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 992,
                                                        columnNumber: 89
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: [
                                                            solarResult.payback.toFixed(1),
                                                            " ",
                                                            t.solarYears
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 992,
                                                        columnNumber: 119
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 992,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                        lineNumber: 987,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 text-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-block px-4 py-2 bg-gray-100 text-gray-500 text-sm rounded-lg",
                                            children: [
                                                "🌞 ",
                                                language === 'zh' ? '太阳能广告商 Coming Soon' : language === 'en' ? 'Solar affiliate Coming Soon' : 'Solcelle partner Coming Soon'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                            lineNumber: 997,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                        lineNumber: 996,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                lineNumber: 974,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-xl p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-red-900 mb-4",
                                        children: t.heatPumpTitle
                                    }, void 0, false, {
                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                        lineNumber: 1005,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-2",
                                                children: t.heatPumpType
                                            }, void 0, false, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 1007,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: heatPumpType,
                                                onChange: (e)=>setHeatPumpType(e.target.value),
                                                className: "w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "air",
                                                        children: t.heatPumpAir
                                                    }, void 0, false, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 1013,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "ground",
                                                        children: t.heatPumpGround
                                                    }, void 0, false, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 1014,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 1008,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                        lineNumber: 1006,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-red-50 rounded-xl p-4 space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            t.heatPumpCost,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 1018,
                                                        columnNumber: 55
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: formatCurrency(heatPumpResult.cost)
                                                    }, void 0, false, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 1018,
                                                        columnNumber: 85
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 1018,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            t.heatPumpSavings,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 1019,
                                                        columnNumber: 55
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-green-600 font-medium",
                                                        children: formatCurrency(heatPumpResult.savings)
                                                    }, void 0, false, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 1019,
                                                        columnNumber: 88
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 1019,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between pt-2 border-t border-red-200",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            t.heatPumpPayback,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 1020,
                                                        columnNumber: 84
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: [
                                                            heatPumpResult.payback.toFixed(1),
                                                            " ",
                                                            t.solarYears
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 1020,
                                                        columnNumber: 117
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 1020,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                        lineNumber: 1017,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 text-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=82597",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "inline-block px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition",
                                            children: [
                                                "🔥 ",
                                                language === 'zh' ? '获取热泵报价 →' : language === 'en' ? 'Get Heat Pump Quotes →' : 'Få tilbud på varmepumpe →'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                            lineNumber: 1024,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                        lineNumber: 1023,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                lineNumber: 1004,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-xl p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-blue-900 mb-4",
                                        children: t.windowsTitle
                                    }, void 0, false, {
                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                        lineNumber: 1032,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-2",
                                                children: t.windowCount
                                            }, void 0, false, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 1034,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                value: windowCount,
                                                onChange: (e)=>setWindowCount(e.target.value),
                                                placeholder: "10",
                                                className: "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            }, void 0, false, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 1035,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                        lineNumber: 1033,
                                        columnNumber: 15
                                    }, this),
                                    windowResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-blue-50 rounded-xl p-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        t.windowCost,
                                                        ":"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                    lineNumber: 1045,
                                                    columnNumber: 57
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-blue-600",
                                                    children: formatCurrency(windowResult.cost)
                                                }, void 0, false, {
                                                    fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                    lineNumber: 1045,
                                                    columnNumber: 85
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                            lineNumber: 1045,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                        lineNumber: 1044,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 text-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=82598",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "inline-block px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition",
                                            children: [
                                                "🪟 ",
                                                language === 'zh' ? '获取窗户报价 →' : language === 'en' ? 'Get Window Quotes →' : 'Få tilbud på vinduer →'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                            lineNumber: 1050,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                        lineNumber: 1049,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                lineNumber: 1031,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-xl p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-green-900 mb-4",
                                        children: t.insulationTitle
                                    }, void 0, false, {
                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                        lineNumber: 1058,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-2",
                                                children: t.renovationTypes
                                            }, void 0, false, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 1060,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    'wall',
                                                    'attic',
                                                    'floor'
                                                ].map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                checked: renovations.includes(type),
                                                                onChange: (e)=>{
                                                                    if (e.target.checked) {
                                                                        setRenovations([
                                                                            ...renovations,
                                                                            type
                                                                        ]);
                                                                    } else {
                                                                        setRenovations(renovations.filter((r)=>r !== type));
                                                                    }
                                                                },
                                                                className: "w-5 h-5 text-green-600 rounded mr-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 1064,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: type === 'wall' ? t.wallInsulation : type === 'attic' ? t.atticInsulation : t.floorInsulation
                                                            }, void 0, false, {
                                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                                lineNumber: 1076,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, type, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 1063,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 1061,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                        lineNumber: 1059,
                                        columnNumber: 15
                                    }, this),
                                    insulationResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-green-50 rounded-xl p-4 space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            t.insulationCost,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 1083,
                                                        columnNumber: 57
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: formatCurrency(insulationResult.cost)
                                                    }, void 0, false, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 1083,
                                                        columnNumber: 89
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 1083,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            t.insulationSavings,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 1084,
                                                        columnNumber: 57
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-green-600 font-medium",
                                                        children: formatCurrency(insulationResult.savings)
                                                    }, void 0, false, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 1084,
                                                        columnNumber: 92
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 1084,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between pt-2 border-t border-green-200",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            t.solarPayback,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 1085,
                                                        columnNumber: 88
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: [
                                                            insulationResult.payback.toFixed(1),
                                                            " ",
                                                            t.solarYears
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                        lineNumber: 1085,
                                                        columnNumber: 118
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                                lineNumber: 1085,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                        lineNumber: 1082,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 text-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-block px-4 py-2 bg-gray-100 text-gray-500 text-sm rounded-lg",
                                            children: [
                                                "🏠 ",
                                                language === 'zh' ? '保暖改造广告商 Coming Soon' : language === 'en' ? 'Insulation affiliate Coming Soon' : 'Isolering partner Coming Soon'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                            lineNumber: 1090,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                        lineNumber: 1089,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                lineNumber: 1057,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white font-medium mb-4",
                                        children: language === 'zh' ? '需要装修或改造服务？获取多家报价比较！' : language === 'en' ? 'Need renovation services? Get quotes from multiple providers!' : 'Har du brug for renovering? Få tilbud fra flere leverandører!'
                                    }, void 0, false, {
                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                        lineNumber: 1098,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=82599",
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "inline-block px-8 py-3 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition shadow-lg",
                                        children: t.getQuotes
                                    }, void 0, false, {
                                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                        lineNumber: 1101,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                                lineNumber: 1097,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                        lineNumber: 960,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 text-center text-sm text-gray-500",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$denmark$2d$home$2d$buyer$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "© 2026 BoligBeregner Danmark | ",
                                language === 'zh' ? '数据基于真实中介合同' : language === 'en' ? 'Data based on real estate contracts' : 'Data baseret på ejendomsmæglerkontrakter'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/denmark-home-buyer/app/page.tsx",
                            lineNumber: 1115,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/denmark-home-buyer/app/page.tsx",
                        lineNumber: 1114,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/denmark-home-buyer/app/page.tsx",
                lineNumber: 631,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/denmark-home-buyer/app/page.tsx",
        lineNumber: 602,
        columnNumber: 5
    }, this);
}
_s(Home, "ztKY6n96DWwXtDO5uSjGYnfs8js=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=denmark-home-buyer_app_page_tsx_05cmqe4._.js.map