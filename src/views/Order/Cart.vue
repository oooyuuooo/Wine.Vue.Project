<script setup>
import { onMounted, ref, computed, watchEffect } from 'vue'
import { PriceFormat } from '@/views/Components/WineJS/Wine'
const memberId = ref(sessionStorage.getItem('memberId'))
const newCount = ref()
const orderList = ref([])
const totalPrice = ref(0)
const getOrder = async () => {
  try {
    const res = await fetch(`https://localhost:7200/api/Orders/GetOrder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(memberId.value)
    })
    const datas = await res.json()
    orderList.value = datas
  } catch (error) {
    console.error('Error:', error)
  }
}
const updateCount = async (productId, count) => {
  newCount.value = count
  const res = await fetch(`https://localhost:7200/api/Orders/AddOrder`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      memberId: memberId.value,
      productId: productId,
      count: newCount.value
    })
  })
  if (res.ok) {
    getOrder()
  }
}

const totalMoney = computed(() => {
  totalPrice.value = 0
  for (const item of orderList.value) {
    totalPrice.value += item.productInfo.price * item.productCount
  }
  return totalPrice.value
})

const checkout = async () => {
  const res = await fetch(`https://localhost:7200/api/Orders/OrderCheckout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      memberId: memberId.value,
      totalPrice: totalMoney.value,
      statusId: '1'
    })
  })
  if (res.ok) {
    alert('訂單已送出')
    document.location.href = '/'
  }
}

onMounted(() => {
  getOrder()
})
</script>
<template>
  <img src="/src/Picture/Grape.jpg" class="backgroundPic" alt="..." />
  <template v-if="orderList.length != 0">
    <div class="container">
      <table class="table table-hover mytable">
        <thead>
          <tr>
            <th scope="col">圖片</th>
            <th scope="col">商品名稱</th>
            <th scope="col">數量</th>
            <th scope="col">單價</th>
            <th scope="col">小計</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orderList" :key="item.id">
            <td><img :src="item.productInfo.imageLink" /></td>
            <td>{{ item.productInfo.name }}</td>
            <td>
              <div class="count">
                <button
                  class="btn minusCount"
                  @click="
                    updateCount(item.productsId, (item.productCount -= 1))
                  "
                  :disabled="item.productCount === 1"
                >
                  -
                </button>
                <h6>{{ item.productCount }}</h6>
                <button
                  class="btn addCount"
                  @click="
                    updateCount(item.productsId, (item.productCount += 1))
                  "
                >
                  +
                </button>
              </div>
            </td>
            <td>${{ PriceFormat(item.productInfo.price) }}</td>
            <td>${{ PriceFormat(item.totalMoney) }}</td>
          </tr>
          <tr>
            <td colspan="2" class="table-active">
              <div class="total">
                <span style="color: black; font-size: 30px; font-weight: bold"
                  >總金額: ${{ PriceFormat(totalMoney) }}</span
                >
              </div>
            </td>
            <td colspan="2" class="table-active">
              <div class="total">
                <button class="btn checkout" @click="checkout()">
                  送出訂單
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  <h1 v-else style="color: black">您沒有購買任何商品</h1>
</template>
<style scoped>
.checkout {
  background-color: rgb(145, 31, 39);
  color: white;
  font-size: 25px;
  font-weight: bold;
  border: 0;
  width: 150px;
  height: 80px;
}
.checkout:hover {
  background-color: #68161b;
}
.total {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
thead tr th {
  font-size: 20px;
  font-weight: bold;
  color: black;
}
tbody tr td {
  font-size: 20px;
  color: black;
}
.table {
  --bs-table-hover-bg: #931f2710;
}
.table-active {
  --bs-table-hover-bg: #931f2700;
  --bs-table-bg-state: #931f2700;
}
.container {
  position: relative;
  background-color: white;
  border-radius: 20px;
  padding: 20px 0 10px 0;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 4px 4px 8px 0px rgba(163, 135, 103, 0.534);
}
img {
  width: 180px;
  height: 180px;
}
tr {
  vertical-align: middle;
  text-align: center;
}
td .count {
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

td .count button {
  background-color: #931f27;
  color: white;
  font-size: 20px;
}

td .count h6 {
  border: none;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.backgroundPic {
  position: absolute;
  top: 0;
  height: 100vh; /* 圖片高度等於視窗高度 */
  width: 100%; /* 保持圖片寬高比 */
  opacity: 0.5;
}
</style>
