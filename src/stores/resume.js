import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loadResume, saveResume } from '../utils/storage'

const defaultResume = {
  id: 'default',
  template: 'default',
  basicInfo: {
    name: '张三',
    phone: '13100000000',
    email: 'zhangsan00000000@163.com',
    avatar: '',
    intention: '数据分析师、数据运营',
    city: '上海',
  },
  skills: [
    {
      category: '数据分析',
      items: ['数据分析', '量化分析', '数据可视化', '统计分析', '回归分析', '时间序列分析'],
    },
    {
      category: '技术工具',
      items: ['Excel', 'SQL', 'Python', 'R', 'Tableau', 'Power BI'],
    },
  ],
  workExperience: [
    {
      id: '1',
      company: 'XX公司',
      position: '数据分析',
      startDate: '2024年03月',
      endDate: '至今',
      summary: '负责公司核心业务数据分析工作，搭建数据指标体系与可视化看板，为管理层提供数据决策支持。',
      responsibilities: [
        '**指标体系搭建**：负责公司核心业务的数据指标体系搭建，梳理 30+ 关键业务指标，建立日/周/月报自动化推送机制，将数据产出效率提升 60%',
        '**用户行为分析**：主导用户行为分析项目，通过漏斗分析与留存模型定位流失节点，输出优化方案推动产品迭代，使新用户次日留存率提升 12%',
        '**可视化看板**：搭建业务可视化看板（Tableau / Power BI），覆盖 5 大业务线，为管理层提供实时数据决策支持，累计支持 20+ 次关键业务评审',
      ],
    },
    {
      id: '2',
      company: 'YY科技',
      position: '数据分析实习生',
      startDate: '2023年06月',
      endDate: '2023年09月',
      summary: '协助完成电商大促活动数据分析与用户分群建模，为运营团队提供数据支撑。',
      responsibilities: [
        '**活动复盘**：协助完成电商大促活动复盘分析，清洗并分析 50w+ 用户行为数据，输出活动效果评估报告',
        '**数据建模**：使用 SQL 提取业务数据，配合 Python 完成用户分群建模，为精细化运营提供数据支撑',
      ],
    },
  ],
  projectExperience: [
    {
      id: '1',
      name: '用户增长分析项目',
      startDate: '2023年02月',
      endDate: '2023年06月',
      role: '数据分析师',
      summary: '面向用户增长的数据分析项目，构建增长分析框架与用户价值模型，驱动产品与运营策略优化。',
      responsibilities: [
        '**框架设计**：设计用户增长分析框架，构建 AARRR 模型与用户生命周期价值（LTV）模型，量化各阶段转化效率',
        '**漏斗分析**：分析用户转化漏斗，识别关键流失节点，结合 RFM 模型对用户分群，提出针对性召回策略',
        '**成果输出**：输出 5 份深度分析报告，推动 8 项产品与运营策略调整，项目期间 DAU 提升 15%',
      ],
    },
    {
      id: '2',
      name: '电商销售预测模型',
      startDate: '2022年09月',
      endDate: '2022年12月',
      role: '项目负责人',
      summary: '基于历史销售数据搭建时间序列预测模型，为采购与库存团队提供自动化决策支持工具。',
      responsibilities: [
        '**模型搭建**：基于历史销售数据，使用 Python（pandas / scikit-learn）搭建时间序列预测模型，预测准确率达 92%',
        '**算法对比**：对比 ARIMA、Prophet、XGBoost 三种算法表现，最终选择 XGBoost 并优化特征工程，MAE 降低 18%',
        '**工程落地**：将模型封装为自动化预测工具，为采购与库存团队提供决策支持，库存周转率提升 10%',
      ],
    },
  ],
  campusExperience: [
    {
      id: '1',
      organization: '校学生会',
      position: '外联部副部长',
      startDate: '2022年09月',
      endDate: '2023年06月',
      description: [
        '负责校企合作洽谈，成功引入 6 家企业赞助校园活动，累计赞助金额 3 万余元',
        '组织大型校园招聘会，邀请 30+ 企业参会，为同学提供 200+ 就业岗位机会',
      ],
    },
  ],
  education: [
    {
      id: '1',
      school: 'XX大学',
      major: '统计学',
      degree: '本科',
      startDate: '2020年09月',
      endDate: '2024年06月',
    },
  ],
}

export const useResumeStore = defineStore('resume', () => {
  const data = ref(defaultResume)

  const loadData = () => {
    const saved = loadResume()
    if (saved) {
      // 数据迁移：将旧的 description 结构迁移为 summary + responsibilities
      if (saved.workExperience) {
        saved.workExperience.forEach((w) => {
          if (w.description && !w.responsibilities) {
            w.responsibilities = w.description
            w.summary = ''
            delete w.description
          }
          if (!w.responsibilities) w.responsibilities = []
          if (!w.summary) w.summary = ''
        })
      }
      if (saved.projectExperience) {
        saved.projectExperience.forEach((p) => {
          if (p.description && !p.responsibilities) {
            p.responsibilities = p.description
            p.summary = ''
            delete p.description
          }
          if (!p.responsibilities) p.responsibilities = []
          if (!p.summary) p.summary = ''
        })
      }
      data.value = saved
      saveData()
    }
  }

  const saveData = () => {
    saveResume(data.value)
  }

  const updateBasicInfo = (info) => {
    data.value.basicInfo = { ...data.value.basicInfo, ...info }
    saveData()
  }

  const addSkillCategory = () => {
    data.value.skills.push({ category: '新分类', items: ['技能1', '技能2'] })
    saveData()
  }

  const updateSkillCategory = (index, category) => {
    data.value.skills[index].category = category
    saveData()
  }

  const addSkillItem = (categoryIndex) => {
    data.value.skills[categoryIndex].items.push('新技能')
    saveData()
  }

  const updateSkillItem = (categoryIndex, itemIndex, value) => {
    data.value.skills[categoryIndex].items[itemIndex] = value
    saveData()
  }

  const removeSkillItem = (categoryIndex, itemIndex) => {
    data.value.skills[categoryIndex].items.splice(itemIndex, 1)
    saveData()
  }

  const removeSkillCategory = (index) => {
    data.value.skills.splice(index, 1)
    saveData()
  }

  const addWorkExperience = () => {
    data.value.workExperience.push({
      id: Date.now().toString(),
      company: '公司名称',
      position: '职位',
      startDate: '开始日期',
      endDate: '结束日期',
      summary: '项目/岗位描述',
      responsibilities: ['职责描述1', '职责描述2'],
    })
    saveData()
  }

  const updateWorkExperience = (id, updates) => {
    const index = data.value.workExperience.findIndex((w) => w.id === id)
    if (index !== -1) {
      data.value.workExperience[index] = { ...data.value.workExperience[index], ...updates }
      saveData()
    }
  }

  const removeWorkExperience = (id) => {
    data.value.workExperience = data.value.workExperience.filter((w) => w.id !== id)
    saveData()
  }

  const addProjectExperience = () => {
    data.value.projectExperience.push({
      id: Date.now().toString(),
      name: '项目名称',
      startDate: '开始日期',
      endDate: '结束日期',
      role: '角色',
      summary: '项目描述',
      responsibilities: ['职责描述1', '职责描述2'],
    })
    saveData()
  }

  const updateProjectExperience = (id, updates) => {
    const index = data.value.projectExperience.findIndex((p) => p.id === id)
    if (index !== -1) {
      data.value.projectExperience[index] = { ...data.value.projectExperience[index], ...updates }
      saveData()
    }
  }

  const removeProjectExperience = (id) => {
    data.value.projectExperience = data.value.projectExperience.filter((p) => p.id !== id)
    saveData()
  }

  const addCampusExperience = () => {
    data.value.campusExperience.push({
      id: Date.now().toString(),
      organization: '组织名称',
      position: '职位',
      startDate: '开始日期',
      endDate: '结束日期',
      description: ['经历描述1', '经历描述2'],
    })
    saveData()
  }

  const updateCampusExperience = (id, updates) => {
    const index = data.value.campusExperience.findIndex((c) => c.id === id)
    if (index !== -1) {
      data.value.campusExperience[index] = { ...data.value.campusExperience[index], ...updates }
      saveData()
    }
  }

  const removeCampusExperience = (id) => {
    data.value.campusExperience = data.value.campusExperience.filter((c) => c.id !== id)
    saveData()
  }

  const addEducation = () => {
    data.value.education.push({
      id: Date.now().toString(),
      school: '学校名称',
      major: '专业',
      degree: '学历',
      startDate: '入学日期',
      endDate: '毕业日期',
    })
    saveData()
  }

  const updateEducation = (id, updates) => {
    const index = data.value.education.findIndex((e) => e.id === id)
    if (index !== -1) {
      data.value.education[index] = { ...data.value.education[index], ...updates }
      saveData()
    }
  }

  const removeEducation = (id) => {
    data.value.education = data.value.education.filter((e) => e.id !== id)
    saveData()
  }

  const resetToDefault = () => {
    data.value = JSON.parse(JSON.stringify(defaultResume))
    saveData()
  }

  return {
    data,
    loadData,
    saveData,
    updateBasicInfo,
    addSkillCategory,
    updateSkillCategory,
    addSkillItem,
    updateSkillItem,
    removeSkillItem,
    removeSkillCategory,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    addProjectExperience,
    updateProjectExperience,
    removeProjectExperience,
    addCampusExperience,
    updateCampusExperience,
    removeCampusExperience,
    addEducation,
    updateEducation,
    removeEducation,
    resetToDefault,
  }
})