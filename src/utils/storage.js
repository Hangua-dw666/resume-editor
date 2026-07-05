const STORAGE_KEY = 'resume_editor_data'

export const saveResume = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return true
  } catch (e) {
    console.error('保存简历数据失败:', e)
    return false
  }
}

export const loadResume = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : null
  } catch (e) {
    console.error('加载简历数据失败:', e)
    return null
  }
}

export const clearResume = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (e) {
    console.error('清除简历数据失败:', e)
    return false
  }
}