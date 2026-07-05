<template>
  <div
    id="resume-preview"
    class="a4-paper font-resume"
    :data-name="resume.basicInfo.name"
  >
    <div class="flex justify-between items-start mb-6">
      <div>
        <h1 class="text-2xl font-bold mb-2">{{ resume.basicInfo.name }}</h1>
        <div class="text-sm space-y-1">
          <p>📱 {{ resume.basicInfo.phone }}</p>
          <p>📧 {{ resume.basicInfo.email }}</p>
          <p>🎯 求职意向：{{ resume.basicInfo.intention }}</p>
          <p>📍 期望城市：{{ resume.basicInfo.city }}</p>
        </div>
      </div>
      <div v-if="resume.basicInfo.avatar" class="w-20 h-20 rounded-full overflow-hidden">
        <img :src="resume.basicInfo.avatar" alt="头像" class="w-full h-full object-cover" />
      </div>
      <div v-else class="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
        <span class="text-3xl">👤</span>
      </div>
    </div>

    <div v-if="resume.skills && resume.skills.length > 0" class="mb-6">
      <h2 class="section-title">专业技能</h2>
      <div class="space-y-3">
        <div v-for="(skill, idx) in resume.skills" :key="idx">
          <p class="font-semibold text-sm">{{ skill.category }}：</p>
          <p class="text-sm text-gray-700 leading-relaxed">
            {{ skill.items.join('、') }}
          </p>
        </div>
      </div>
    </div>

    <div v-if="resume.workExperience && resume.workExperience.length > 0" class="mb-6">
      <h2 class="section-title">工作/实习经历</h2>
      <div class="space-y-4">
        <div v-for="work in resume.workExperience" :key="work.id">
          <div class="flex justify-between items-center mb-2">
            <div>
              <span class="font-semibold">{{ work.company }}</span>
              <span class="ml-3">{{ work.position }}</span>
            </div>
            <span class="text-sm text-gray-600">{{ work.startDate }} - {{ work.endDate }}</span>
          </div>
          <ul class="space-y-1">
            <li
              v-for="(desc, idx) in work.description"
              :key="idx"
              class="text-sm text-gray-700 leading-relaxed"
            >
              • {{ desc }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="resume.projectExperience && resume.projectExperience.length > 0" class="mb-6">
      <h2 class="section-title">项目经验</h2>
      <div class="space-y-4">
        <div v-for="project in resume.projectExperience" :key="project.id">
          <div class="flex justify-between items-center mb-2">
            <div>
              <span class="font-semibold">{{ project.name }}</span>
              <span class="ml-3">{{ project.role }}</span>
            </div>
            <span class="text-sm text-gray-600">{{ project.startDate }} - {{ project.endDate }}</span>
          </div>
          <ul class="space-y-1">
            <li
              v-for="(desc, idx) in project.description"
              :key="idx"
              class="text-sm text-gray-700 leading-relaxed"
            >
              • {{ desc }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="resume.campusExperience && resume.campusExperience.length > 0" class="mb-6">
      <h2 class="section-title">校园经历</h2>
      <div class="space-y-4">
        <div v-for="campus in resume.campusExperience" :key="campus.id">
          <div class="flex justify-between items-center mb-2">
            <div>
              <span class="font-semibold">{{ campus.organization }}</span>
              <span class="ml-3">{{ campus.position }}</span>
            </div>
            <span class="text-sm text-gray-600">{{ campus.startDate }} - {{ campus.endDate }}</span>
          </div>
          <ul class="space-y-1">
            <li
              v-for="(desc, idx) in campus.description"
              :key="idx"
              class="text-sm text-gray-700 leading-relaxed"
            >
              • {{ desc }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="resume.education && resume.education.length > 0">
      <h2 class="section-title">教育经历</h2>
      <div class="space-y-3">
        <div v-for="edu in resume.education" :key="edu.id" class="flex justify-between items-center">
          <div>
            <span class="font-semibold">{{ edu.school }}</span>
            <span class="ml-3">{{ edu.major }}</span>
            <span v-if="edu.degree" class="ml-2">{{ edu.degree }}</span>
          </div>
          <span class="text-sm text-gray-600">{{ edu.startDate }} - {{ edu.endDate }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useResumeStore } from '../stores/resume'

const resumeStore = useResumeStore()
const { data: resume } = storeToRefs(resumeStore)
</script>