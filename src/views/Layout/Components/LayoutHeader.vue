<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { useSearchParams } from '@/views/Components/WineJS/Wine'
const { searchParams } = useSearchParams()
const memberId = ref()
const testes = ref([])
const origins = ref([])
const capacitys = ref([])
const categorys = ref([])
const products = ref([])

const logout = () => {
  sessionStorage.removeItem('memberId')
  document.location.href = '/'
}

const getInfo = async () => {
  try {
    const tasterRes = await fetch(
      'https://localhost:7200/api/Products/GetTaste'
    )
    const tasterDatas = await tasterRes.json()
    const originRes = await fetch(
      'https://localhost:7200/api/Products/GetOrigin'
    )
    const originDatas = await originRes.json()
    const capacityRes = await fetch(
      'https://localhost:7200/api/Products/GetCapacity'
    )
    const capacityDatas = await capacityRes.json()
    const categoryRes = await fetch(
      'https://localhost:7200/api/Products/GetCategory'
    )
    const categoryDatas = await categoryRes.json()
    testes.value = tasterDatas
    origins.value = originDatas
    capacitys.value = capacityDatas
    categorys.value = categoryDatas
  } catch (error) {
    console.error('Error:', error)
  }
}
const getProducts = async () => {
  const search = new URLSearchParams({
    Category: searchParams.value.Category || '',
    Origin: searchParams.value.Origin || '',
    Capacity: searchParams.value.Capacity || '',
    Taste: searchParams.value.Taste || ''
  })
  document.location.href = `/Products/Search?${search.toString()}`
}
const search = (type, parmars) => {
  if (type === 1) {
    searchParams.value.Category = parmars.toString()
    getProducts()
  }
  if (type === 2) {
    searchParams.value.Origin = parmars.toString()
    getProducts()
  }
  if (type === 3) {
    searchParams.value.Taste = parmars.toString()
    getProducts()
  }
  if (type === 4) {
    searchParams.value.Capacity = parmars.toString()
    getProducts()
  }
}
onMounted(() => {
  memberId.value = sessionStorage.getItem('memberId')
  getInfo()
})
watchEffect(() => {})
</script>
<template>
  <nav class="navbar navbar-expand-lg header sticky-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Yu's Wine Shop</a>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">產品總覽</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              種類
            </a>
            <ul class="dropdown-menu">
              <template v-for="category in categorys">
                <li>
                  <button
                    class="dropdown-item"
                    @click="search(1, category.category)"
                  >
                    {{ category.category }}
                  </button>
                </li>
              </template>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              產地
            </a>
            <ul class="dropdown-menu">
              <template v-for="origin in origins">
                <li>
                  <button
                    class="dropdown-item"
                    @click="search(2, origin.origin)"
                  >
                    {{ origin.origin }}
                  </button>
                </li>
              </template>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              口感
            </a>
            <ul class="dropdown-menu">
              <template v-for="taste in testes">
                <li>
                  <button class="dropdown-item" @click="search(3, taste.taste)">
                    {{ taste.taste }}
                  </button>
                </li>
              </template>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              容量
            </a>
            <ul class="dropdown-menu">
              <template v-for="capacity in capacitys">
                <li>
                  <button
                    class="dropdown-item"
                    @click="search(4, capacity.capacity)"
                  >
                    {{ capacity.capacity }}
                  </button>
                </li>
              </template>
            </ul>
          </li>
        </ul>
      </div>
      <template v-if="memberId != null">
        <button class="btn cart" @click="$router.push('/cart')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-bag-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z"
            />
          </svg>
        </button>
        <div class="dropdown">
          <button
            class="btn member"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
              />
            </svg>
          </button>
          <div class="memberDropdown">
            <ul class="dropdown-menu">
              <li>
                <button
                  class="dropdown-item"
                  @click="$router.push('/memberCenter')"
                >
                  <span style="font-weight: bold">會員中心</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
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
                </button>
              </li>
              <li>
                <button class="dropdown-item" @click="logout()">
                  <span style="font-weight: bold">登出</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-arrow-bar-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8m-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </template>
      <button class="btn member" v-else @click="$router.push('/login')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          class="bi bi-person-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
          />
        </svg>
      </button>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>
</template>
<style scoped>
.navbar {
  background-color: rgb(246, 220, 191);
  box-shadow: 0px 0px 8px 3px rgba(163, 135, 103, 0.534);
  margin-bottom: 50px;
}
.btn {
  border: none;
}
.btn:hover,
.btn.show:hover {
  color: #911f27;
}
.nav-link:hover {
  background-color: rgb(145, 31, 39);
  color: white;
  transform: scale(1.05);
  transition: 0.3s;
  border-radius: 5px;
  font-weight: bold;
}
a:hover {
  background-color: #ffffff00;
  color: rgb(145, 31, 39);
}
.navbar-toggler {
  border: none;
}
.navbar-toggler:focus {
  box-shadow: 0px 0px 0px 0rem rgba(145, 31, 39, 0.25);
}
.navbar-toggler:hover {
  box-shadow: 4px 4px 8px 0rem rgba(145, 31, 39, 0.25);
}
.btn.show {
  color: black;
}
.memberDropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 200px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 4px 4px 8px 0rem rgba(145, 31, 39, 0.25);
}
.container-fluid {
  margin: 0 10px;
}
.dropdown-item {
  display: flex;
  align-items: center;
  justify-content: space-between;  
}

.dropdown-item:hover {
  background-color:  rgb(145, 31, 39);
  color:white;
  font-weight: bold;
  transform: scale(1.05);
  transition: 0.3s;
  border-radius: 10px;
}

.dropdown-menu{
  box-shadow: 4px 4px 8px 0rem rgba(141, 126, 108, 0.25);
}
.nav-item a {
  font-size: 20px;
  font-weight: bold;
}
</style>
