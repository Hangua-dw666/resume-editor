<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-header">
        <h3>上传头像</h3>
        <button class="close-btn" @click="close">×</button>
      </div>
      <div class="modal-body">
        <div class="upload-area" @click="triggerFileInput">
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="file-input"
            @change="handleFileChange"
          />
          <div v-if="preview" class="preview-box">
            <img :src="preview" alt="预览" />
          </div>
          <div v-else class="upload-placeholder">
            <span class="upload-icon">📷</span>
            <p>点击选择照片</p>
            <p class="upload-tip">建议尺寸：150×200px，大小不超过 10MB</p>
          </div>
        </div>
        <div v-if="errorMessage" class="error-msg">{{ errorMessage }}</div>
      </div>
      <div class="modal-footer">
        <button v-if="currentAvatar" class="btn-remove" @click="removeAvatar">
          移除头像
        </button>
        <button class="btn-cancel" @click="close">取消</button>
        <button class="btn-confirm" :disabled="!preview" @click="confirm">
          确认
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: { type: Boolean, default: false },
  currentAvatar: { type: String, default: '' },
})

const emit = defineEmits(['close', 'confirm'])

const fileInput = ref(null)
const preview = ref('')
const errorMessage = ref('')

watch(
  () => props.show,
  (val) => {
    if (val) {
      preview.value = props.currentAvatar || ''
      errorMessage.value = ''
    }
  }
)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return

  errorMessage.value = ''

  // 类型校验
  if (!file.type.startsWith('image/')) {
    errorMessage.value = '请选择图片文件'
    return
  }

  // 大小校验（10MB）
  if (file.size > 10 * 1024 * 1024) {
    errorMessage.value = '图片大小不能超过 10MB'
    return
  }

  // 读取为 base64
  const reader = new FileReader()
  reader.onload = (ev) => {
    preview.value = ev.target.result
  }
  reader.readAsDataURL(file)
}

const removeAvatar = () => {
  preview.value = ''
  emit('confirm', '')
  close()
}

const confirm = () => {
  emit('confirm', preview.value)
  close()
}

const close = () => {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-content {
  background: #fff;
  border-radius: 8px;
  width: 360px;
  max-width: 90vw;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 22px;
  line-height: 1;
  color: #999;
  cursor: pointer;
  padding: 0;
}

.close-btn:hover {
  color: #333;
}

.modal-body {
  padding: 18px;
}

.upload-area {
  border: 2px dashed #ddd;
  border-radius: 6px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s;
}

.upload-area:hover {
  border-color: #2563eb;
}

.file-input {
  display: none;
}

.preview-box {
  display: flex;
  justify-content: center;
}

.preview-box img {
  width: 120px;
  height: 160px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #eee;
}

.upload-placeholder {
  color: #999;
}

.upload-icon {
  font-size: 32px;
  display: block;
  margin-bottom: 8px;
}

.upload-placeholder p {
  margin: 4px 0;
  font-size: 13px;
}

.upload-tip {
  font-size: 11px !important;
  color: #bbb;
}

.error-msg {
  margin-top: 10px;
  color: #dc2626;
  font-size: 12px;
  text-align: center;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 18px;
  border-top: 1px solid #eee;
}

.btn-remove {
  margin-right: auto;
  background: none;
  border: none;
  color: #dc2626;
  font-size: 13px;
  cursor: pointer;
  padding: 6px 10px;
}

.btn-remove:hover {
  text-decoration: underline;
}

.btn-cancel,
.btn-confirm {
  padding: 6px 14px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  border: 1px solid #ddd;
}

.btn-cancel {
  background: #f5f5f5;
  color: #666;
}

.btn-cancel:hover {
  background: #eee;
}

.btn-confirm {
  background: #2563eb;
  color: #fff;
  border-color: #2563eb;
}

.btn-confirm:disabled {
  background: #93c5fd;
  border-color: #93c5fd;
  cursor: not-allowed;
}
</style>