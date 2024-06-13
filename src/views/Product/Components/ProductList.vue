<script setup>
import { ref, onMounted } from 'vue'
import { PriceFormat, useSearchParams } from '@/views/Components/WineJS/Wine'
const { searchParams } = useSearchParams()
const products = ref([])
const getUrl = ref('')

const getUrlParams = () => {
  getUrl.value = window.location.href

  //從 URL 中提取查詢字串
  const url = new URL(getUrl.value)
  const queryParams = new URLSearchParams(url.search)

  //解析和解碼查詢字串
  searchParams.value = {
    Name: decodeURIComponent(queryParams.get('Name') || ''),
    Year: decodeURIComponent(queryParams.get('Year') || ''),
    Category: decodeURIComponent(queryParams.get('Category') || ''),
    Origin: decodeURIComponent(queryParams.get('Origin') || ''),
    Capacity: decodeURIComponent(queryParams.get('Capacity') || ''),
    Taste: decodeURIComponent(queryParams.get('Taste') || '')
  }
}

const getProducts = async () => {
  getUrlParams()
  const search = new URLSearchParams({
    Name: searchParams.value.Name,
    Year: searchParams.value.Year,
    Category: searchParams.value.Category,
    Origin: searchParams.value.Origin,
    Capacity: searchParams.value.Capacity,
    Taste: searchParams.value.Taste
  })
  try {
    const res = await fetch(
      `https://localhost:7200/api/Products/SearchProducts?${search.toString()}`
    )
    const datas = await res.json()
    products.value = datas
  } catch (error) {
    console.error('Error:', error)
  }
}

const getProductInfo = (id) => {
  document.location.href = `/WineInfo/${id}`
}

onMounted(() => {
  getProducts()
})
</script>
<template>
  <img src="/src/Picture/Wine_slide.jpg" class="backgroundPic" alt="..." />
  <div class="product-list row">
    <template v-if="products.length === 0">
      <div class="col-12 text-center" style="margin-top: 100px; color: #000">
        <h1>商品還未上架</h1>
        <h2>
          敬請期待 &nbsp;
          <i
            class="fa-solid fa-heart fa-beat"
            style="color: rgb(145, 31, 39)"
          ></i>
        </h2>
      </div>
    </template>
    <template v-else v-for="product in products">
      <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 card-parent">
        <div class="card-container" @click="getProductInfo(product.id)">
          <div class="productImg">
            <img
              :src="product.imageLink"
              :title="product.name"
              alt=""
              class="card-img-top"
            />
          </div>
          <div class="card">
            <div class="card-body">
              <h6 style="font-weight: bold">
                {{ product.origin }} {{ product.category }}
              </h6>
              <span class="separator-line"></span>
              <p class="card-text">{{ product.name }}</p>
              <p class="card-text" style="margin-top: -10px">
                價格: ${{ PriceFormat(product.price) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
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
.product-list {
  margin: 30px 20px;
  z-index: 1; /* 確保內容在背景圖片之上 */
}
.productImg {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: -50px;
  z-index: 1;
  position: relative;
}

img {
  width: 55%;
}

.card-parent {
  display: flex;
  flex-direction: column;
}

.card-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-container:hover {
  cursor: pointer;
  transform: scale(1.05);
  transition: 0.3s;
}

.card {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  border: none;
  box-shadow: 4px 4px 8px 0px rgba(163, 135, 103, 0.534);
}

.card-body {
  flex: 1;
  padding-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.separator-line {
  width: 100%;
  height: 2px;
  background-color: #ccc;
  margin: 10px 0;
}

.card-text {
  text-align: center;
  font-size: 18px;
}

@media (min-width: 1200px) {
  .col-xl-3 {
    display: flex;
    flex-direction: column;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .col-lg-4 {
    display: flex;
    flex-direction: column;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .col-md-6 {
    display: flex;
    flex-direction: column;
  }
}

@media (max-width: 767px) {
  .col-sm-12 {
    display: flex;
    flex-direction: column;
  }
}
</style>
