<script setup>
import { ref, onMounted } from 'vue'
const productInfo = ref([])
const products = ref([])
const getProductInfo = async () => {
  try {
    const res = await fetch(
      `https://localhost:7200/api/Products/GetProductById?id=660`
    )
    const datas = await res.json()
    productInfo.value = datas
  } catch (error) {
    console.error('Error:', error)
  }
}
const getProducts = async () => {
  try {
    const res = await fetch(
      `https://localhost:7200/api/Products/GetAllProducts`
    )
    const datas = await res.json()
    getRandomFiveProducts(datas)
  } catch (error) {
    console.error('Error:', error)
  }
}

const getRandomFiveProducts = (data) => {
  const shuffled = data.sort(() => 0.5 - Math.random())
  const randomFive = shuffled.slice(0, 5)
  products.value = randomFive
}
onMounted(() => {
  getProductInfo()
  getProducts()
})
</script>
<template>
  <div class="slideContainer">
    <div
      id="carouselExampleAutoplaying"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item cover active">
          <img
            src="/src/Picture/Wine2_slide.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
        <div class="carousel-item cover">
          <img
            src="/src/Picture/Wine_slide.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
        <div class="carousel-item cover">
          <img
            src="/src/Picture/Wine1_slide.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
        <div class="carousel-item cover">
          <img
            src="/src/Picture/Wine5_slide.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
        <div class="carousel-item cover">
          <img
            src="/src/Picture/Wine4_slide.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <div class="mycontainer">
    <div class="product-title">
      <div class="title">
        <div class="top5">
          <span> Top 5 Products </span>
        </div>
      </div>
      <template v-for="(product, index) in products" :key="index">
        <template v-if="index % 2 == 0">
          <div class="product-info col-12">
            <div class="card-parent">
              <div class="card-container">
                <div class="card">
                  <div class="row g-0">
                    <div
                      class="col-md-6 col-xl-4 col-lg-4 col-sm-12 productImg"
                    >
                      <img
                        :src="product.imageLink"
                        :title="product.name"
                        alt=""
                        class="card-img"
                      />
                    </div>
                    <div class="col-md-6 col-xl-8 col-lg-8">
                      <div class="card-body">
                        <h3 class="card-title" style="font-weight: bold">
                          {{ product.name }}
                        </h3>
                        <p
                          class="card-text"
                          style="font-weight: bold; font-size: 20px"
                        >
                          <small class="text-body-secondary detail">
                            {{ product.origin }}&nbsp;|&nbsp;{{
                              product.category
                            }}&nbsp;|&nbsp;{{ product.year }}年&nbsp;|&nbsp;{{
                              product.capacity
                            }}&nbsp;|&nbsp;{{ product.taste }}
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
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Ad necessitatibus molestias veritatis
                              excepturi placeat aperiam soluta porro unde,
                              laborum accusantium consectetur mollitia quaerat
                              sunt ipsum ea vitae est nam inventore, neque error
                              enim possimus! Et aperiam velit sequi aliquam
                              possimus sed molestias ut accusamus itaque
                              tempora. Soluta laboriosam nam ipsum amet eum quis
                              ut voluptates dolorem doloremque voluptatum
                              praesentium quidem ex explicabo nesciunt voluptas
                              eveniet saepe non dignissimos asperiores, nisi
                              magni.
                            </p>
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
        <template v-else>
          <div class="product-info col-12">
            <div class="card-parent">
              <div class="card-container">
                <div class="card">
                  <div class="row g-0">
                    <div class="col-md-6 col-xl-8 col-lg-8">
                      <div class="card-body">
                        <h3 class="card-title" style="font-weight: bold">
                          {{ product.name }}
                        </h3>
                        <p
                          class="card-text"
                          style="font-weight: bold; font-size: 20px"
                        >
                          <small class="text-body-secondary detail">
                            {{ product.origin }}&nbsp;|&nbsp;{{
                              product.category
                            }}&nbsp;|&nbsp;{{ product.year }}年&nbsp;|&nbsp;{{
                              product.capacity
                            }}&nbsp;|&nbsp;{{ product.taste }}
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
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Ad necessitatibus molestias veritatis
                              excepturi placeat aperiam soluta porro unde,
                              laborum accusantium consectetur mollitia quaerat
                              sunt ipsum ea vitae est nam inventore, neque error
                              enim possimus! Et aperiam velit sequi aliquam
                              possimus sed molestias ut accusamus itaque
                              tempora. Soluta laboriosam nam ipsum amet eum quis
                              ut voluptates dolorem doloremque voluptatum
                              praesentium quidem ex explicabo nesciunt voluptas
                              eveniet saepe non dignissimos asperiores, nisi
                              magni.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="col-md-6 col-xl-4 col-lg-4 col-sm-12 productImg"
                    >
                      <img
                        :src="product.imageLink"
                        :title="product.name"
                        alt=""
                        class="card-img"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>
<style scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: center;
}
.top5 {
  background-color: rgba(255, 255, 255, 0.411);
  border: none;
  border-radius: 0 0 20px 20px;
  width: 500px;
  text-align: center;
  box-shadow: 8px 8px 10px rgba(68, 68, 68, 0.5);
  margin: -20px 0 10px 0;
}

.top5 span {
  font-weight: bold;
  font-size: 60px;
  color: rgb(145, 31, 39);
  font-family: Caveat;
}
.product-title {
  position: relative; /* 確保偽元素相對於父元素定位 */
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 20px;
  overflow: hidden; /* 確保內容不會超出邊界 */
  color: white; /* 讓文字顏色與背景圖片對比清晰 */
  z-index: 1; /* 確保內容在偽元素之上 */
}
.product-title::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/src/Picture/Wine_Grapes.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.5; /* 設置背景圖片的透明度 */
  z-index: -1; /* 確保偽元素在內容之下 */
  border-radius: 20px; /* 確保邊角與父元素一致 */
  object-fit: cover;
}
.row {
  justify-content: space-evenly;
}
.slideContainer {
  width: 100%;
  margin-top: -20px;
}
.slideContainer img {
  width: 100%;
  height: 50vh;
  object-fit: cover; /* 圖片會被壓縮或拉伸以適應容器 */
}
.mycontainer {
  margin: 50px 50px 0 50px;
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
  width: 300px;
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
</style>
