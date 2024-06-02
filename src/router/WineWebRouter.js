import Layout from '@/views/Layout/Index.vue'
import ProductView from '@/views/Product/ProductView.vue'
import ProductInfo from '@/views/Product/Components/ProductInfo.vue'
import Login from '@/views/Member/Components/Login.vue'
import Register from '@/views/Member/Components/Register.vue'
import MemberInfo from '@/views/Member/Components/MemberInfo.vue'
import Cart from '@/views/Order/Cart.vue'
const secondRouter = [
  {
    path: '',
    name: 'Products',
    component: ProductView
  },
  {
    path: `/WineInfo/:id`,
    name: 'WineInfo',
    component: ProductInfo
  },
  {
    path: `/MemberCenter`,
    name: 'MemberInfo',
    component: MemberInfo
  },
  {
    path: `/Cart`,
    name: 'Cart',
    component: Cart
  },
  {
    path: '/Products/Search',
    name: 'ProductsSearch',
    component: ProductView,
    props: (route) => ({
      searchParams: route.query
    })
  }
]
const secondChildrenRouter = secondRouter

const wineWebRouter = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: secondChildrenRouter
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  }
]

export default wineWebRouter
