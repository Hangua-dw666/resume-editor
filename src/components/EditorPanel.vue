<template>
  <div class="h-full overflow-y-auto bg-white rounded-lg shadow-md p-4">
    <div class="space-y-6">
      <div>
        <h3 class="font-bold text-lg mb-4 flex items-center">
          <span class="mr-2">👤</span>基本信息
        </h3>
        <div class="space-y-3">
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
          <div>
            <label class="block text-sm text-gray-600 mb-1">电话</label>
            <input
              type="text"
              :value="resume.basicInfo.phone"
              @input="updateBasicInfo({ phone: $event.target.value })"
              class="editor-input"
              placeholder="请输入电话"
            />
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">邮箱</label>
            <input
              type="text"
              :value="resume.basicInfo.email"
              @input="updateBasicInfo({ email: $event.target.value })"
              class="editor-input"
              placeholder="请输入邮箱"
            />
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">求职意向</label>
            <input
              type="text"
              :value="resume.basicInfo.intention"
              @input="updateBasicInfo({ intention: $event.target.value })"
              class="editor-input"
              placeholder="请输入求职意向"
            />
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">期望城市</label>
            <input
              type="text"
              :value="resume.basicInfo.city"
              @input="updateBasicInfo({ city: $event.target.value })"
              class="editor-input"
              placeholder="请输入期望城市"
            />
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">头像（可选）</label>
            <input
              type="text"
              :value="resume.basicInfo.avatar"
              @input="updateBasicInfo({ avatar: $event.target.value })"
              class="editor-input"
              placeholder="请输入头像URL"
            />
          </div>
        </div>
      </div>

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
              <div
                v-for="(desc, idx) in work.description"
                :key="idx"
                class="flex items-center"
              >
                <textarea
                  :value="desc"
                  @input="updateWorkDescription(work.id, idx, $event.target.value)"
                  class="editor-textarea text-sm flex-1 mr-2"
                  placeholder="职责描述"
                ></textarea>
                <button
                  @click="removeWorkDescription(work.id, idx)"
                  class="text-xs text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
              <button
                @click="addWorkDescription(work.id)"
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
              <div
                v-for="(desc, idx) in project.description"
                :key="idx"
                class="flex items-center"
              >
                <textarea
                  :value="desc"
                  @input="updateProjectDescription(project.id, idx, $event.target.value)"
                  class="editor-textarea text-sm flex-1 mr-2"
                  placeholder="项目描述"
                ></textarea>
                <button
                  @click="removeProjectDescription(project.id, idx)"
                  class="text-xs text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
              <button
                @click="addProjectDescription(project.id)"
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
import { storeToRefs } from 'pinia'
import { useResumeStore } from '../stores/resume'

const resumeStore = useResumeStore()
const { data: resume } = storeToRefs(resumeStore)

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

const updateWorkDescription = (id, idx, value) => {
  const work = resume.value.workExperience.find((w) => w.id === id)
  if (work) {
    work.description[idx] = value
    resumeStore.saveData()
  }
}

const addWorkDescription = (id) => {
  const work = resume.value.workExperience.find((w) => w.id === id)
  if (work) {
    work.description.push('新描述')
    resumeStore.saveData()
  }
}

const removeWorkDescription = (id, idx) => {
  const work = resume.value.workExperience.find((w) => w.id === id)
  if (work) {
    work.description.splice(idx, 1)
    resumeStore.saveData()
  }
}

const updateProjectDescription = (id, idx, value) => {
  const project = resume.value.projectExperience.find((p) => p.id === id)
  if (project) {
    project.description[idx] = value
    resumeStore.saveData()
  }
}

const addProjectDescription = (id) => {
  const project = resume.value.projectExperience.find((p) => p.id === id)
  if (project) {
    project.description.push('新描述')
    resumeStore.saveData()
  }
}

const removeProjectDescription = (id, idx) => {
  const project = resume.value.projectExperience.find((p) => p.id === id)
  if (project) {
    project.description.splice(idx, 1)
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