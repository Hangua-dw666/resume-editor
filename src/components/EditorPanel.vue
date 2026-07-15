<template>
  <div class="h-full overflow-y-auto bg-white rounded-lg shadow-md p-4">
    <div class="space-y-6">
      <div>
        <h3 class="font-bold text-lg mb-4 flex items-center">
          <span class="mr-2">👤</span>基本信息
        </h3>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <div
              class="w-14 h-18 border border-gray-300 rounded flex items-center justify-center bg-gray-50 overflow-hidden flex-shrink-0"
              style="height: 72px;"
            >
              <img
                v-if="resume.basicInfo.avatar"
                :src="resume.basicInfo.avatar"
                alt="头像"
                class="w-full h-full object-cover"
              />
              <span v-else class="text-gray-400 text-xs">照片</span>
            </div>
            <button
              @click="showAvatarUpload = true"
              class="text-xs bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
            >
              上传头像
            </button>
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">姓名</label>
            <input
              type="text"
              :value="resume.basicInfo.name"
              @input="updateBasicInfo({ name: $event.target.value })"
              class="editor-input"
              placeholder="请输入姓名"
            />
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-sm text-gray-600 mb-1">电话</label>
              <input
                type="text"
                :value="resume.basicInfo.phone"
                @input="updateBasicInfo({ phone: $event.target.value })"
                class="editor-input"
                placeholder="电话"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">邮箱</label>
              <input
                type="text"
                :value="resume.basicInfo.email"
                @input="updateBasicInfo({ email: $event.target.value })"
                class="editor-input"
                placeholder="邮箱"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-sm text-gray-600 mb-1">求职意向</label>
              <input
                type="text"
                :value="resume.basicInfo.intention"
                @input="updateBasicInfo({ intention: $event.target.value })"
                class="editor-input"
                placeholder="求职意向"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">期望城市</label>
              <input
                type="text"
                :value="resume.basicInfo.city"
                @input="updateBasicInfo({ city: $event.target.value })"
                class="editor-input"
                placeholder="期望城市"
              />
            </div>
          </div>
          <p class="text-xs text-gray-400">
            提示：预览顶部将以 "电话 | 邮箱 | 求职意向 | 期望城市" 形式紧凑展示
          </p>
        </div>
      </div>

      <AvatarUpload
        :show="showAvatarUpload"
        :current-avatar="resume.basicInfo.avatar"
        @close="showAvatarUpload = false"
        @confirm="handleAvatarConfirm"
      />

      <div>
        <h3 class="font-bold text-lg mb-4 flex items-center justify-between">
          <span class="mr-2">💼</span>专业技能
          <button
            @click="addSkillCategory"
            class="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            + 添加分类
          </button>
        </h3>
        <div class="space-y-4">
          <div v-for="(skill, catIdx) in resume.skills" :key="catIdx" class="border border-gray-200 rounded p-3">
            <div class="flex justify-between items-center mb-2">
              <input
                type="text"
                :value="skill.category"
                @input="updateSkillCategory(catIdx, $event.target.value)"
                class="editor-input text-sm font-semibold"
                placeholder="技能分类"
              />
              <button
                v-if="resume.skills.length > 1"
                @click="removeSkillCategory(catIdx)"
                class="text-xs text-red-500 hover:text-red-700"
              >
                删除
              </button>
            </div>
            <div class="space-y-2">
              <div
                v-for="(item, itemIdx) in skill.items"
                :key="itemIdx"
                class="flex items-center"
              >
                <input
                  type="text"
                  :value="item"
                  @input="updateSkillItem(catIdx, itemIdx, $event.target.value)"
                  class="editor-input text-sm flex-1 mr-2"
                  placeholder="技能名称"
                />
                <button
                  @click="removeSkillItem(catIdx, itemIdx)"
                  class="text-xs text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
              <button
                @click="addSkillItem(catIdx)"
                class="text-xs text-blue-500 hover:text-blue-700"
              >
                + 添加技能
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 class="font-bold text-lg mb-4 flex items-center justify-between">
          <span class="mr-2">💼</span>工作/实习经历
          <button
            @click="addWorkExperience"
            class="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            + 添加经历
          </button>
        </h3>
        <div class="space-y-4">
          <div v-for="work in resume.workExperience" :key="work.id" class="border border-gray-200 rounded p-3">
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs text-gray-500">经历 #{{ resume.workExperience.indexOf(work) + 1 }}</span>
              <button
                @click="removeWorkExperience(work.id)"
                class="text-xs text-red-500 hover:text-red-700"
              >
                删除
              </button>
            </div>
            <div class="grid grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                :value="work.company"
                @input="updateWorkExperience(work.id, { company: $event.target.value })"
                class="editor-input text-sm"
                placeholder="公司名称"
              />
              <input
                type="text"
                :value="work.position"
                @input="updateWorkExperience(work.id, { position: $event.target.value })"
                class="editor-input text-sm"
                placeholder="职位"
              />
              <input
                type="text"
                :value="work.startDate"
                @input="updateWorkExperience(work.id, { startDate: $event.target.value })"
                class="editor-input text-sm"
                placeholder="开始日期"
              />
              <input
                type="text"
                :value="work.endDate"
                @input="updateWorkExperience(work.id, { endDate: $event.target.value })"
                class="editor-input text-sm"
                placeholder="结束日期"
              />
            </div>
            <div class="space-y-2">
              <div class="mb-2">
                <label class="block text-xs text-gray-500 mb-1">项目描述（一段话，不分点）</label>
                <textarea
                  :value="work.summary"
                  @input="updateWorkExperience(work.id, { summary: $event.target.value })"
                  class="editor-textarea text-sm"
                  placeholder="用一段话描述项目/岗位整体情况"
                  rows="2"
                ></textarea>
              </div>
              <label class="block text-xs text-gray-500">项目职责（分点，支持 **加粗**）</label>
              <p class="text-xs text-gray-400">提示：用 **文字** 可给子任务标题加粗，如 **数据搭建**：负责...</p>
              <div
                v-for="(resp, idx) in work.responsibilities"
                :key="idx"
                class="flex items-center"
              >
                <textarea
                  :value="resp"
                  @input="updateWorkResponsibility(work.id, idx, $event.target.value)"
                  class="editor-textarea text-sm flex-1 mr-2"
                  placeholder="职责描述"
                ></textarea>
                <button
                  @click="removeWorkResponsibility(work.id, idx)"
                  class="text-xs text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
              <button
                @click="addWorkResponsibility(work.id)"
                class="text-xs text-blue-500 hover:text-blue-700"
              >
                + 添加职责
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 class="font-bold text-lg mb-4 flex items-center justify-between">
          <span class="mr-2">🚀</span>项目经验
          <button
            @click="addProjectExperience"
            class="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            + 添加项目
          </button>
        </h3>
        <div class="space-y-4">
          <div v-for="project in resume.projectExperience" :key="project.id" class="border border-gray-200 rounded p-3">
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs text-gray-500">项目 #{{ resume.projectExperience.indexOf(project) + 1 }}</span>
              <button
                @click="removeProjectExperience(project.id)"
                class="text-xs text-red-500 hover:text-red-700"
              >
                删除
              </button>
            </div>
            <div class="grid grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                :value="project.name"
                @input="updateProjectExperience(project.id, { name: $event.target.value })"
                class="editor-input text-sm"
                placeholder="项目名称"
              />
              <input
                type="text"
                :value="project.role"
                @input="updateProjectExperience(project.id, { role: $event.target.value })"
                class="editor-input text-sm"
                placeholder="角色"
              />
              <input
                type="text"
                :value="project.startDate"
                @input="updateProjectExperience(project.id, { startDate: $event.target.value })"
                class="editor-input text-sm"
                placeholder="开始日期"
              />
              <input
                type="text"
                :value="project.endDate"
                @input="updateProjectExperience(project.id, { endDate: $event.target.value })"
                class="editor-input text-sm"
                placeholder="结束日期"
              />
            </div>
            <div class="space-y-2">
              <div class="mb-2">
                <label class="block text-xs text-gray-500 mb-1">项目描述（一段话，不分点）</label>
                <textarea
                  :value="project.summary"
                  @input="updateProjectExperience(project.id, { summary: $event.target.value })"
                  class="editor-textarea text-sm"
                  placeholder="用一段话描述项目整体情况"
                  rows="2"
                ></textarea>
              </div>
              <label class="block text-xs text-gray-500">项目职责（分点，支持 **加粗**）</label>
              <p class="text-xs text-gray-400">提示：用 **文字** 可给子任务标题加粗，如 **模型设计**：基于...</p>
              <div
                v-for="(resp, idx) in project.responsibilities"
                :key="idx"
                class="flex items-center"
              >
                <textarea
                  :value="resp"
                  @input="updateProjectResponsibility(project.id, idx, $event.target.value)"
                  class="editor-textarea text-sm flex-1 mr-2"
                  placeholder="职责描述"
                ></textarea>
                <button
                  @click="removeProjectResponsibility(project.id, idx)"
                  class="text-xs text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
              <button
                @click="addProjectResponsibility(project.id)"
                class="text-xs text-blue-500 hover:text-blue-700"
              >
                + 添加职责
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 class="font-bold text-lg mb-4 flex items-center justify-between">
          <span class="mr-2">🎓</span>校园经历
          <button
            @click="addCampusExperience"
            class="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            + 添加经历
          </button>
        </h3>
        <div class="space-y-4">
          <div v-for="campus in resume.campusExperience" :key="campus.id" class="border border-gray-200 rounded p-3">
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs text-gray-500">经历 #{{ resume.campusExperience.indexOf(campus) + 1 }}</span>
              <button
                @click="removeCampusExperience(campus.id)"
                class="text-xs text-red-500 hover:text-red-700"
              >
                删除
              </button>
            </div>
            <div class="grid grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                :value="campus.organization"
                @input="updateCampusExperience(campus.id, { organization: $event.target.value })"
                class="editor-input text-sm"
                placeholder="组织名称"
              />
              <input
                type="text"
                :value="campus.position"
                @input="updateCampusExperience(campus.id, { position: $event.target.value })"
                class="editor-input text-sm"
                placeholder="职位"
              />
              <input
                type="text"
                :value="campus.startDate"
                @input="updateCampusExperience(campus.id, { startDate: $event.target.value })"
                class="editor-input text-sm"
                placeholder="开始日期"
              />
              <input
                type="text"
                :value="campus.endDate"
                @input="updateCampusExperience(campus.id, { endDate: $event.target.value })"
                class="editor-input text-sm"
                placeholder="结束日期"
              />
            </div>
            <div class="space-y-2">
              <div
                v-for="(desc, idx) in campus.description"
                :key="idx"
                class="flex items-center"
              >
                <textarea
                  :value="desc"
                  @input="updateCampusDescription(campus.id, idx, $event.target.value)"
                  class="editor-textarea text-sm flex-1 mr-2"
                  placeholder="经历描述"
                ></textarea>
                <button
                  @click="removeCampusDescription(campus.id, idx)"
                  class="text-xs text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
              <button
                @click="addCampusDescription(campus.id)"
                class="text-xs text-blue-500 hover:text-blue-700"
              >
                + 添加描述
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 class="font-bold text-lg mb-4 flex items-center justify-between">
          <span class="mr-2">🎓</span>教育经历
          <button
            @click="addEducation"
            class="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            + 添加教育
          </button>
        </h3>
        <div class="space-y-4">
          <div v-for="edu in resume.education" :key="edu.id" class="border border-gray-200 rounded p-3">
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs text-gray-500">教育 #{{ resume.education.indexOf(edu) + 1 }}</span>
              <button
                @click="removeEducation(edu.id)"
                class="text-xs text-red-500 hover:text-red-700"
              >
                删除
              </button>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <input
                type="text"
                :value="edu.school"
                @input="updateEducation(edu.id, { school: $event.target.value })"
                class="editor-input text-sm"
                placeholder="学校名称"
              />
              <input
                type="text"
                :value="edu.major"
                @input="updateEducation(edu.id, { major: $event.target.value })"
                class="editor-input text-sm"
                placeholder="专业"
              />
              <input
                type="text"
                :value="edu.degree"
                @input="updateEducation(edu.id, { degree: $event.target.value })"
                class="editor-input text-sm"
                placeholder="学历"
              />
              <input
                type="text"
                :value="edu.startDate"
                @input="updateEducation(edu.id, { startDate: $event.target.value })"
                class="editor-input text-sm"
                placeholder="入学日期"
              />
              <input
                type="text"
                :value="edu.endDate"
                @input="updateEducation(edu.id, { endDate: $event.target.value })"
                class="editor-input text-sm"
                placeholder="毕业日期"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <button
          @click="resetToDefault"
          class="w-full text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200"
        >
          重置为默认模板
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useResumeStore } from '../stores/resume'
import AvatarUpload from './AvatarUpload.vue'

const resumeStore = useResumeStore()
const { data: resume } = storeToRefs(resumeStore)

const showAvatarUpload = ref(false)

const handleAvatarConfirm = (avatarData) => {
  updateBasicInfo({ avatar: avatarData })
}

const {
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
} = resumeStore

const updateWorkResponsibility = (id, idx, value) => {
  const work = resume.value.workExperience.find((w) => w.id === id)
  if (work) {
    work.responsibilities[idx] = value
    resumeStore.saveData()
  }
}

const addWorkResponsibility = (id) => {
  const work = resume.value.workExperience.find((w) => w.id === id)
  if (work) {
    work.responsibilities.push('新职责')
    resumeStore.saveData()
  }
}

const removeWorkResponsibility = (id, idx) => {
  const work = resume.value.workExperience.find((w) => w.id === id)
  if (work) {
    work.responsibilities.splice(idx, 1)
    resumeStore.saveData()
  }
}

const updateProjectResponsibility = (id, idx, value) => {
  const project = resume.value.projectExperience.find((p) => p.id === id)
  if (project) {
    project.responsibilities[idx] = value
    resumeStore.saveData()
  }
}

const addProjectResponsibility = (id) => {
  const project = resume.value.projectExperience.find((p) => p.id === id)
  if (project) {
    project.responsibilities.push('新职责')
    resumeStore.saveData()
  }
}

const removeProjectResponsibility = (id, idx) => {
  const project = resume.value.projectExperience.find((p) => p.id === id)
  if (project) {
    project.responsibilities.splice(idx, 1)
    resumeStore.saveData()
  }
}

const updateCampusDescription = (id, idx, value) => {
  const campus = resume.value.campusExperience.find((c) => c.id === id)
  if (campus) {
    campus.description[idx] = value
    resumeStore.saveData()
  }
}

const addCampusDescription = (id) => {
  const campus = resume.value.campusExperience.find((c) => c.id === id)
  if (campus) {
    campus.description.push('新描述')
    resumeStore.saveData()
  }
}

const removeCampusDescription = (id, idx) => {
  const campus = resume.value.campusExperience.find((c) => c.id === id)
  if (campus) {
    campus.description.splice(idx, 1)
    resumeStore.saveData()
  }
}
</script>