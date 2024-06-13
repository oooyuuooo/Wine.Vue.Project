<script setup>
import { ref, onMounted } from 'vue'
import { PriceFormat } from '@/views/Components/WineJS/Wine'
const productInfo = ref([])
const count = ref(1)
const memberId = ref(sessionStorage.getItem('memberId'))
const getProductInfo = async () => {
  try {
    const res = await fetch(
      `https://localhost:7200/api/Products/GetProductById?id=${
        document.location.pathname.split('/')[2]
      }`
    )
    const datas = await res.json()
    productInfo.value = datas
  } catch (error) {
    console.error('Error:', error)
  }
}

const addToCart = async () => {
  if (memberId.value !== null) {
    const res = await fetch(`https://localhost:7200/api/Orders/AddOrder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        memberId: memberId.value,
        productId: productInfo.value.id,
        count: count.value
      })
    })
    if (res.ok) {
      alert('成功加入購物車')
    }
  } else {
    alert('您尚未登入，即將跳轉至登入頁面')
    document.location.href = `/Login`
  }
}

onMounted(() => {
  getProductInfo()
})
</script>
<template>
  <img src="/src/Picture/Wine_Grapes.jpg" class="backgroundPic" alt="..." />
  <div class="container">
    <div class="product-info">
      <div class="card-parent">
        <div class="card-container">
          <div class="card">
            <div class="row g-0">
              <div class="col-md-6 col-xl-4 col-lg-4 col-sm-12 productImg">
                <img
                  :src="productInfo.imageLink"
                  :title="productInfo.name"
                  alt=""
                  class="card-img"
                />
              </div>
              <div class="col-md-6 col-xl-8 col-lg-8">
                <div class="card-body">
                  <h3 class="card-title" style="font-weight: bold">
                    {{ productInfo.name }}
                  </h3>
                  <p
                    class="card-text"
                    style="font-weight: bold; font-size: 20px"
                  >
                    <small class="text-body-secondary detail">
                      {{ productInfo.origin }}&nbsp;|&nbsp;{{
                        productInfo.category
                      }}&nbsp;|&nbsp;{{ productInfo.year }}年&nbsp;|&nbsp;{{
                        productInfo.capacity
                      }}&nbsp;|&nbsp;{{ productInfo.taste }}
                    </small>
                  </p>
                  <span class="separator-line"></span>
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                  >
                    <div class="product-description">
                      <p
                        class="card-text"
                        style="text-align: left; font-size: 20px"
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ad necessitatibus molestias veritatis excepturi placeat
                        aperiam soluta porro unde, laborum accusantium
                        consectetur mollitia quaerat sunt ipsum ea vitae est nam
                        inventore, neque error enim possimus! Et aperiam velit
                        sequi aliquam possimus sed molestias ut accusamus itaque
                        tempora. Soluta laboriosam nam ipsum amet eum quis ut
                        voluptates dolorem doloremque voluptatum praesentium
                        quidem ex explicabo nesciunt voluptas eveniet saepe non
                        dignissimos asperiores, nisi magni.
                      </p>
                    </div>
                  </div>
                  <h5 style="margin-top: 20px">
                    ${{ PriceFormat(productInfo.price) }}
                  </h5>
                  <span>數量</span>
                  <div class="buying">
                    <button
                      class="btn minusCount"
                      @click="count--"
                      :disabled="count === 1"
                    >
                      -
                    </button>
                    <h6>{{ count }}</h6>
                    <button class="btn addCount" @click="count++">+</button>
                    <button
                      class="btn addCart"
                      style="margin-left: 20px"
                      @click="addToCart()"
                    >
                      加入購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
.container {
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-parent {
  margin: 30px 20px;
}
.card {
  border: none;
  padding: 20px;
  box-shadow: 4px 4px 8px 0px rgba(163, 135, 103, 0.534);
}
.card-container {
  height: 100%;
}
.productImg {
  display: flex;
  align-items: center;
  justify-content: center;
}
.separator-line {
  width: 100%;
  height: 2px;
  background-color: rgb(204, 204, 204);
  margin: 10px 0;
}
.card-body {
  display: flex;
  flex-direction: column;
}
.detail {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}
.product-description {
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 4px 8px 0px rgba(163, 135, 103, 0.534);
  border-radius: 5px;
  padding: 20px;
}
.buying {
  display: flex;
  align-items: baseline;
  justify-content: start;
}
.buying .btn {
  background-color: #931f27;
  color: white;
  font-size: 20px;
}
.buying h6 {
  border: none;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
