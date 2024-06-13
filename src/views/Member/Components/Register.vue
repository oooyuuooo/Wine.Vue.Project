<script setup>
import { ref } from 'vue'
const memberInfo = ref({
  name: '',
  email: '',
  phone: '',
  dateofbirth: '',
  confirmpassword: '',
  account: '',
  password: ''
})
const memberInfoCheck = (memberInfo) => {
  if (memberInfo.password != memberInfo.confirmpassword) {
    alert('密碼不相符')
  } else if (
    memberInfo.name == '' ||
    memberInfo.email == '' ||
    memberInfo.phone == '' ||
    memberInfo.dateofbirth == '' ||
    memberInfo.confirmpassword == '' ||
    memberInfo.account == '' ||
    memberInfo.password == ''
  ) {
    alert('請輸入完整資料')
  } else {
    memberRegister(memberInfo)
  }
}
const memberRegister = async (memberInfo) => {
  try {
    const res = await fetch('https://localhost:7200/api/Members/Register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: memberInfo.name,
        email: memberInfo.email,
        phone: memberInfo.phone,
        dateofbirth: memberInfo.dateofbirth,
        confirmpassword: memberInfo.confirmpassword,
        account: memberInfo.account,
        password: memberInfo.password
      })
    })
    const datas = await res.json()
    if (datas != 0) {
      // 登入成功2秒後自動跳轉
      setTimeout(() => {
        document.location.href = '/login'
      }, 2000)
    } else {
      alert('註冊失敗')
      document.location.href = `/Register`
    }
  } catch (err) {
    alert('註冊失敗')
  }
}
const login = () => {
  document.location.href = `/login`
}
</script>
<template>
  <div class="mycontainer">
    <img src="/src/Picture/Wine_welcome.jpg" class="backgroundPic" alt="..." />
    <div class="register-container">
      <div class="register">
        <div class="left-side">
          <div class="left-info">
            <h2 style="font-weight: bold">註冊會員</h2>
            <form>
              <input
                type="text"
                placeholder="帳號"
                v-model="memberInfo.account"
              />
              <input
                type="password"
                placeholder="密碼"
                v-model="memberInfo.password"
              />
              <input
                type="password"
                placeholder="確認密碼"
                v-model="memberInfo.confirmpassword"
              />
              <input type="text" placeholder="姓名" v-model="memberInfo.name" />
              <input
                type="email"
                placeholder="信箱"
                v-model="memberInfo.email"
              />
              <input
                type="text"
                placeholder="電話"
                v-model="memberInfo.phone"
              />
              <input
                type="date"
                placeholder="生日"
                v-model="memberInfo.dateofbirth"
              />
            </form>
            <button class="btn formbtn" @click="memberInfoCheck(memberInfo)">
              確認
            </button>
          </div>
        </div>
        <div class="right-side">
          <div class="right-info">
            <h2 style="font-weight: bold">歡迎來到</h2>
            <h3 style="font-weight: bold; font-family: Caveat; font-size: 50px">
              YU's Wine Shop
            </h3>
            <span style="font-size: 18px; font-weight: bold"
              >已經有帳號了?</span
            >
            <button class="btn btn-outline-light" @click="login()">登入</button>
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
}
.register-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 25px;
}
.register {
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
.left-info form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  width: 100%;
}
.left-info input {
  background-color: #ffffff9a;
  border: none;
  margin: 5px 0;
  padding: 5px 10px;
  font-size: 20px;
  border-radius: 10px;
  width: 100%;
  outline: none;
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
.formbtn {
  background-color: #931f27;
  color: white;
  font-weight: bold;
  margin-top: 10px;
  padding: 10px 30px;
}
.formbtn:hover {
  background-color: #68161b;
  color: #fff;
  font-weight: bold;
}
</style>
