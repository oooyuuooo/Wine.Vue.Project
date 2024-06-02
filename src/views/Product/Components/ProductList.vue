<script setup>
import { ref, onMounted } from 'vue'
import { PriceFormat } from '@/views/Components/WineJS/Wine'
const products = ref([])

const search = ref([
  {
    Name: '',
    Year: '',
    Category: '',
    Origin: '',
    Capacity: '',
    Taste: ''
  }
])
const getProducts = async () => {
  const searchParams = new URLSearchParams({
    Name: search.value[0].Name,
    Year: search.value[0].Year,
    Category: search.value[0].Category,
    Origin: search.value[0].Origin,
    Capacity: search.value[0].Capacity,
    Taste: search.value[0].Taste
  })
  try {
    const res = await fetch(
      `https://localhost:7200/api/Products/SearchProducts?${searchParams.toString()}`
    )
    const datas = await res.json()
    products.value = datas
    console.log(datas)
  } catch (error) {
    console.error('Error:', error)
  }
}

const getProductInfo = (id) => {
  console.log(id)
  document.location.href = `/WineInfo/${id}`
}
onMounted(() => {
  getProducts()
})
</script>
<template>
  <div class="product-list row">
    <template v-for="product in products">
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
.product-list {
  margin: 30px 20px;
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
