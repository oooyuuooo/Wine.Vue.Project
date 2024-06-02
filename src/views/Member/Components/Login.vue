<script setup>
import { ref } from 'vue'
const account = ref('')
const password = ref('')
const memberlogin = async (account, password) => {
  try {
    const res = await fetch('https://localhost:7200/api/Members/Login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        account: account,
        password: password
      })
    })
    const datas = await res.json()
    if (datas != 0) {
      // 登入成功2秒後自動跳轉
      sessionStorage.setItem('memberId', datas)
      document.location.href = '/'
    } else {
      sessionStorage.removeItem('memberId')
      alert('登入失敗')
    }
  } catch (err) {
    alert('登入失敗')
  }
}
const register = () => {
  document.location.href = `/Register`
}
</script>
<template>
  <div class="login-container">
    <div class="login">
      <div class="left-side">
        <div class="left-info">
          <h2 style="font-weight: bold">會員登入</h2>
          <form>
            <input type="text" placeholder="帳號" v-model="account" />
            <input type="password" placeholder="密碼" v-model="password" />
          </form>
          <button class="btn formbtn" @click="memberlogin(account, password)">
            確認
          </button>
          <p>
            <a href="/" class="" style="font-size: small">忘記密碼</a>
            <br />
            <a href="/" class="" style="font-size: small">回首頁</a>
          </p>
        </div>
      </div>
      <div class="right-side">
        <div class="right-info">
          <h2 style="font-weight: bold">歡迎來到</h2>
          <h3 style="font-weight: bold; font-family: Caveat; font-size: 50px">
            YU's Wine Shop
          </h3>
          <span style="font-size: 18px; font-weight: bold">還沒有帳號嗎?</span>
          <button class="btn btn-outline-light" @click="register()">
            註冊帳號
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 25px;
}
.login {
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
  margin: 10px 0;
  padding: 15px 15px;
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
  margin: 10px 0;
  padding: 10px 30px;
}
.formbtn:hover {
  background-color: #68161b;
  color: #fff;
  font-weight: bold;
}
</style>
