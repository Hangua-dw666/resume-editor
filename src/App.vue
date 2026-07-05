<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-sm px-6 py-4">
      <div class="flex justify-between items-center">
        <h1 class="text-xl font-bold text-gray-800">📄 简历编辑器</h1>
        <div class="flex items-center space-x-4">
          <button
            @click="resetToDefault"
            class="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            重置模板
          </button>
          <button
            @click="exportPDF"
            class="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 flex items-center"
          >
            <span class="mr-2">📥</span>导出PDF
          </button>
        </div>
      </div>
    </header>

    <main class="flex h-[calc(100vh-65px)]">
      <aside class="w-96 border-r border-gray-200 bg-gray-50 overflow-hidden">
        <EditorPanel />
      </aside>

      <section class="flex-1 overflow-auto bg-gray-300 p-8">
        <div class="flex justify-center">
          <ResumePreview />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useResumeStore } from './stores/resume'
import { exportToPDF } from './utils/pdf'
import EditorPanel from './components/EditorPanel.vue'
import ResumePreview from './components/ResumePreview.vue'

const resumeStore = useResumeStore()

onMounted(() => {
  resumeStore.loadData()
})

const exportPDF = () => {
  exportToPDF('resume-preview')
}

const resetToDefault = () => {
  if (confirm('确定要重置为默认模板吗？当前内容将被覆盖。')) {
    resumeStore.resetToDefault()
  }
}
</script>