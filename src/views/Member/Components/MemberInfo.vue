<script setup>
import { ref, onMounted, watchEffect, computed } from 'vue'
import { formatDate } from '@/views/Components/WineJS/Wine'
const memberInfo = ref([])
const memberId = ref(sessionStorage.getItem('memberId'))
const edit = ref(false)
const getMemberInfo = async (member) => {
  try {
    const res = await fetch(
      `https://localhost:7200/api/Members/GetMemberInfoById`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member)
      }
    )
    const datas = await res.json()
    memberInfo.value = datas
  } catch (error) {
    console.error('Error:', error)
  }
}
const formattedDate = computed({
  get() {
    return memberInfo.value.dateOfBirth
      ? memberInfo.value.dateOfBirth.split('T')[0]
      : ''
  },
  set(value) {
    memberInfo.value.dateOfBirth = value ? `${value}T00:00:00` : ''
  }
})

const formattedDatePlaceholder = computed(() => {
  return formattedDate.value || '選擇日期'
})
const save = async (memberInfo) => {
  try {
    const res = await fetch(`https://localhost:7200/api/Members/Update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(memberInfo)
    })
    if (res.ok) {
      alert('修改成功')
      edit.value = !edit.value
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
onMounted(() => {
  if (memberId.value != 0 && memberId.value != null) {
    getMemberInfo(memberId.value)
  }
})
</script>
<template>
  <div class="mycontainer">
    <img src="/src/Picture/Wine_welcome.jpg" class="backgroundPic" alt="..." />
    <div class="memberInfo-container">
      <div class="memberInfo">
        <div class="left-side">
          <div class="left-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="250"
              height="250"
              fill="currentColor"
              class="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
            <h4 style="font-weight: bold; margin-top: 10px">
              {{ memberInfo.name }}
            </h4>
            <h4 style="font-weight: bold">
              {{ memberInfo.account }}
            </h4>
          </div>
        </div>
        <div class="right-side">
          <div class="right-info">
            <h2 style="font-weight: bold">會員資料</h2>
            <template v-if="edit">
              <form>
                <input type="email" v-model="memberInfo.email" />
                <input type="text" v-model="memberInfo.phone" />
                <input
                  type="date"
                  v-model="formattedDate"
                  :placeholder="formattedDatePlaceholder"
                />
              </form>
              <button class="btn edit" @click="save(memberInfo)">
                確認修改
              </button>
            </template>
            <template v-else>
              <form>
                <h4>信箱: {{ memberInfo.email }}</h4>
                <h4>電話: {{ memberInfo.phone }}</h4>
                <h4>生日: {{ formatDate(memberInfo.dateOfBirth) }}</h4>
              </form>
              <button class="btn edit" @click="edit = !edit">
                編輯個人資料
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.backgroundPic {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover; /* 背景圖片按比例填充視窗 */
  background-position: center;
  opacity: 0.5;
  z-index: -1; /* 確保背景圖片在所有內容之後 */
}
.mycontainer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: -20px 0 -100px 0;
}
.memberInfo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 25px;
}
.memberInfo {
  position: relative;
  width: 1200px;
  height: 600px;
  background-color: #f6dcbf;
  border-radius: 50px;
  box-shadow: 5px 5px 8px 0px rgba(82, 68, 51, 0.616);
}
.left-side {
  position: absolute;
  left: 0;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.left-info {
  position: absolute;
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #68161b;
  text-align: center;
}
.right-info form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  width: 100%;
}
.right-info h4,
.right-info input {
  background-color: #ffffff9a;
  border: none;
  margin: 10px 0;
  padding: 15px 15px;
  font-size: 27px;
  border-radius: 10px;
  width: 100%;
  outline: none;
  color: #931f27;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.right-side {
  position: relative;
  left: 50%;
  width: 50%;
  height: 100%;
  border-radius: 150px 50px 50px 100px;
  background-color: #931f27;
  background: linear-gradient(to right, #68161b, #931f27);
  display: flex;
  align-items: center;
  justify-content: center;
}
.right-info {
  position: absolute;
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #fff;
  text-align: center;
  top: 0;
}
.right-info .btn {
  border: 2px solid #fff;
  margin-top: 20px;
}
.right-info .btn:hover {
  background-color: #fff;
  color: #931f27;
  font-weight: bold;
  transition: 0.5s;
}
.formbtn,
.edit {
  background-color: #931f27;
  color: white;
  font-weight: bold;
  margin-top: 10px;
  padding: 10px 30px;
}
.formbtn:hover,
.edit:hover {
  background-color: #68161b;
  color: #fff;
  font-weight: bold;
}
</style>
