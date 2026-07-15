<template>
  <div
    id="resume-preview"
    class="a4-paper font-resume"
    :data-name="resume.basicInfo.name"
  >
    <!-- 顶部信息区：紧凑单行，姓名与头像对齐 -->
    <div class="header-section">
      <div class="flex items-center justify-between">
        <div class="flex-1 min-w-0">
          <h1 class="name-text">{{ resume.basicInfo.name }}</h1>
          <p class="info-inline">
            <span>{{ resume.basicInfo.phone }}</span>
            <span class="sep">|</span>
            <span>{{ resume.basicInfo.email }}</span>
            <span class="sep">|</span>
            <span>{{ resume.basicInfo.intention }}</span>
            <span class="sep">|</span>
            <span>{{ resume.basicInfo.city }}</span>
          </p>
        </div>
        <div class="avatar-box">
          <img v-if="resume.basicInfo.avatar" :src="resume.basicInfo.avatar" alt="头像" />
          <span v-else class="avatar-placeholder">照片</span>
        </div>
      </div>
    </div>

    <!-- 专业技能 -->
    <section v-if="resume.skills && resume.skills.length > 0" class="resume-section">
      <h2 class="section-title">专业技能</h2>
      <div class="skills-block">
        <div v-for="(skill, idx) in resume.skills" :key="idx" class="skill-line">
          <span class="skill-category">{{ skill.category }}：</span>
          <span class="skill-items">{{ skill.items.join('、') }}</span>
        </div>
      </div>
    </section>

    <!-- 工作/实习经历 -->
    <section v-if="resume.workExperience && resume.workExperience.length > 0" class="resume-section">
      <h2 class="section-title">工作/实习经历</h2>
      <div class="exp-block">
        <div v-for="work in resume.workExperience" :key="work.id" class="exp-item">
          <div class="exp-header">
            <div class="exp-title-group">
              <span class="exp-org">{{ work.company }}</span>
              <span class="exp-role">{{ work.position }}</span>
            </div>
            <span class="exp-date">{{ work.startDate }} - {{ work.endDate }}</span>
          </div>
          <p v-if="work.summary" class="exp-summary">{{ work.summary }}</p>
          <ul v-if="work.responsibilities && work.responsibilities.length" class="exp-desc-list">
            <li v-for="(resp, idx) in work.responsibilities" :key="idx">
              <span v-html="formatDesc(resp)"></span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 项目经验 -->
    <section v-if="resume.projectExperience && resume.projectExperience.length > 0" class="resume-section">
      <h2 class="section-title">项目经验</h2>
      <div class="exp-block">
        <div v-for="project in resume.projectExperience" :key="project.id" class="exp-item">
          <div class="exp-header">
            <div class="exp-title-group">
              <span class="exp-org">{{ project.name }}</span>
              <span class="exp-role">{{ project.role }}</span>
            </div>
            <span class="exp-date">{{ project.startDate }} - {{ project.endDate }}</span>
          </div>
          <p v-if="project.summary" class="exp-summary">{{ project.summary }}</p>
          <ul v-if="project.responsibilities && project.responsibilities.length" class="exp-desc-list">
            <li v-for="(resp, idx) in project.responsibilities" :key="idx">
              <span v-html="formatDesc(resp)"></span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 校园经历 -->
    <section v-if="resume.campusExperience && resume.campusExperience.length > 0" class="resume-section">
      <h2 class="section-title">校园经历</h2>
      <div class="exp-block">
        <div v-for="campus in resume.campusExperience" :key="campus.id" class="exp-item">
          <div class="exp-header">
            <div class="exp-title-group">
              <span class="exp-org">{{ campus.organization }}</span>
              <span class="exp-role">{{ campus.position }}</span>
            </div>
            <span class="exp-date">{{ campus.startDate }} - {{ campus.endDate }}</span>
          </div>
          <ul class="exp-desc-list">
            <li v-for="(desc, idx) in campus.description" :key="idx">
              <span v-html="formatDesc(desc)"></span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 教育经历 -->
    <section v-if="resume.education && resume.education.length > 0" class="resume-section">
      <h2 class="section-title">教育经历</h2>
      <div class="edu-block">
        <div v-for="edu in resume.education" :key="edu.id" class="edu-item">
          <div class="exp-header">
            <div class="exp-title-group">
              <span class="exp-org">{{ edu.school }}</span>
              <span class="exp-role">{{ edu.major }} · {{ edu.degree }}</span>
            </div>
            <span class="exp-date">{{ edu.startDate }} - {{ edu.endDate }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useResumeStore } from '../stores/resume'

const resumeStore = useResumeStore()
const { data: resume } = storeToRefs(resumeStore)

// 转义 HTML 特殊字符，防止 XSS
const escapeHtml = (str) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

// 格式化描述文本：支持 **小标题** 加粗语法
const formatDesc = (desc) => {
  const escaped = escapeHtml(desc)
  return escaped.replace(/\*\*(.+?)\*\*/g, '<strong class="sub-title">$1</strong>')
}
</script>

<style scoped>
.a4-paper {
  font-size: 14px;
  line-height: 1.6;
  color: #000;
}

/* 顶部信息区 - 无横线 */
.header-section {
  margin-bottom: 14px;
}

.name-text {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 4px;
  line-height: 1.2;
}

.info-inline {
  font-size: 12px;
  color: #333;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.info-inline .sep {
  color: #999;
  margin: 0 2px;
}

.avatar-box {
  width: 60px;
  height: 80px;
  flex-shrink: 0;
  margin-left: 16px;
  overflow: hidden;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.avatar-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  font-size: 11px;
  color: #999;
}

/* 板块通用 */
.resume-section {
  margin-bottom: 12px;
}

.resume-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 15px;
  font-weight: 700;
  padding-left: 0;
  margin-bottom: 8px;
  line-height: 1.3;
}

/* 技能 */
.skills-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.skill-line {
  font-size: 13px;
  line-height: 1.6;
}

.skill-category {
  font-weight: 600;
}

.skill-items {
  color: #333;
}

/* 经历块 */
.exp-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.exp-item {
  font-size: 13px;
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 3px;
}

.exp-title-group {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.exp-org {
  font-weight: 700;
  font-size: 14px;
}

.exp-role {
  color: #444;
  font-size: 13px;
}

.exp-date {
  color: #666;
  font-size: 12px;
  flex-shrink: 0;
}

.exp-summary {
  font-size: 13px;
  line-height: 1.65;
  color: #333;
  margin: 2px 0 4px 0;
}

.exp-desc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.exp-desc-list li {
  position: relative;
  padding-left: 14px;
  line-height: 1.65;
  color: #333;
  font-size: 13px;
  margin-bottom: 2px;
}

.exp-desc-list li::before {
  content: '·';
  position: absolute;
  left: 4px;
  top: 0;
  font-weight: bold;
  color: #000;
}

/* 子任务小标题加粗 */
:deep(.sub-title) {
  font-weight: 700;
  color: #000;
}

/* 教育 */
.edu-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.edu-item {
  font-size: 13px;
}
</style>