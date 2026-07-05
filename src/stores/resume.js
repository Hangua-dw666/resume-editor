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
      description: [
        '负责公司的数据分析工作，搭建数据指标体系，跟踪业务核心指标变化',
        '参与用户行为分析，优化产品功能，提升用户体验和留存率',
        '制作数据报表和可视化看板，为业务决策提供数据支持',
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
      description: [
        '设计用户增长分析框架，构建用户生命周期价值模型',
        '分析用户转化漏斗，识别流失原因，提出优化方案',
        '输出分析报告，推动产品迭代和运营策略调整',
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
        '负责校企合作洽谈，成功引入多家企业赞助校园活动',
        '组织大型校园招聘会，为同学提供就业机会',
        '协调各部门资源，确保活动顺利开展',
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
      data.value = saved
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
      description: ['职责描述1', '职责描述2'],
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
      description: ['项目描述1', '项目描述2'],
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