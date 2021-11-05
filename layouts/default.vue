<template>
  <div>
    <client-only>
      <EditEmployee />
      <addEmployee />
      <AddProduct />
      <Navbar />
      <nuxt />
    </client-only>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import EditEmployee from '@/components/EditEmployee'
import AddEmployee from '@/components/AddEmployee'
import AddProduct from '@/components/AddProduct'

export default {
  components: {
    Navbar,
    EditEmployee,
    AddEmployee,
    AddProduct
  }
}
</script>
