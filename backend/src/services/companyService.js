const { Op } = require('sequelize');
const Company = require('../models/Company');

// Seed initial data
async function seedInitialData() {
  const companies = [
    { name: '比亚迪', jobPageUrl: 'https://job.byd.com/', industry: '新能源汽车' },
    { name: '理想汽车', jobPageUrl: 'https://www.lixiang.com/employ.html', industry: '新能源汽车' },
    { name: '蔚来', jobPageUrl: 'https://www.nio.cn/careers', industry: '新能源汽车' },
    { name: '小鹏汽车', jobPageUrl: 'https://www.xiaopeng.com/join.html', industry: '新能源汽车' },
    { name: '长安汽车', jobPageUrl: 'https://changan.zhiye.com/', industry: '新能源汽车' },
    { name: '宁德时代', jobPageUrl: 'https://www.catl.com/careers/', industry: '电池' },
    { name: '亿纬锂能', jobPageUrl: 'https://www.evebattery.com/join-us', industry: '电池' },
    { name: '国轩高科', jobPageUrl: 'https://gotion.zhiye.com/', industry: '电池' },
    { name: '国家能源投资集团', jobPageUrl: 'http://zhaopin.chnenergy.com.cn', industry: '综合能源' },
    { name: '中国石油天然气集团', jobPageUrl: 'https://zhaopin.cnpc.com.cn/web/recruitInfolist.html', industry: '石油天然气/新能源' },
    { name: '中国航天科技集团', jobPageUrl: 'http://www.spacechina.com/n25/index.html', industry: '航天/新能源' },
    { name: '中国石化', jobPageUrl: 'https://job.sinopec.com/', industry: '石化/新能源' },
    { name: '软通动力', jobPageUrl: 'https://www.isoftstone.com/joinus/', industry: '数字能源服务' },
    { name: '特变电工', jobPageUrl: 'https://www.tbea.com/tbea/recruit.html', industry: '能源' },
    { name: '东方电气', jobPageUrl: 'https://www.dongfang.com/hr/index.html', industry: '能源' },
    { name: '中国三峡新能源', jobPageUrl: 'https://www.ctgne.com/', industry: '新能源' },
    { name: '中国华能集团', jobPageUrl: 'http://www.chng.com.cn/', industry: '电力/能源' },
    { name: '中国五矿', jobPageUrl: 'http://www.minmetals.com/', industry: '矿业/金属/新能源材料' },
    { name: '吉利汽车', jobPageUrl: 'https://hr.geely.com/', industry: '新能源汽车' },
    { name: '中核集团', jobPageUrl: 'http://www.cnnc.com.cn/', industry: '核能/新能源' },
    { name: '清安储能技术（重庆）有限公司', jobPageUrl: 'https://www.qaes.com.cn/', industry: '储能' },
    { name: '上能电气股份有限公司', jobPageUrl: 'https://www.si-neng.com/', industry: '光伏/储能' },
    { name: '四川蜀能电力产业发展有限公司', jobPageUrl: 'https://www.scsn.com.cn/', industry: '电力' },
    { name: '中国大唐集团有限公司', jobPageUrl: 'https://www.china-cdt.com/', industry: '综合能源' },
    { name: '北汽新能源 (极狐)', jobPageUrl: 'https://www.bjev.com.cn/', industry: '合资新能源汽车' },
    { name: '庆铃集团', jobPageUrl: 'https://www.qingling.com.cn/', industry: '合资商用车/新能源' },
    { name: '时代一汽', jobPageUrl: 'https://www.catl.com/', industry: '合资电池' },
    { name: 'ATL新能源', jobPageUrl: 'https://www.atlbattery.com/', industry: '电池' },
    { name: '首航新能源', jobPageUrl: 'https://www.sofarsolar.com/', industry: '光伏/储能' },
    { name: '一道新能', jobPageUrl: 'https://www.das-solar.com/', industry: '光伏' }
  ];

  // First, clear all existing data to ensure the database matches the current list
  await Company.destroy({ truncate: true });
  console.log('All existing company data cleared.');

  for (const companyData of companies) {
    await Company.upsert(companyData, { where: { name: companyData.name } });
  }
  console.log('Initial company data seeded.');
}

async function getAllCompanies({ keyword }) {
  const queryOptions = {
    order: [['name', 'ASC']]
  };

  if (keyword) {
    queryOptions.where = {
      name: {
        [Op.like]: `%${keyword}%`
      }
    };
  }

  return await Company.findAll(queryOptions);
}

module.exports = { getAllCompanies, seedInitialData };
