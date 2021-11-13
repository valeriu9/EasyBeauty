<template>
  <div>
    <client-only>
      <AddEmployee />
      <AddProduct />
      <Navbar />
      <nuxt />
    </client-only>
  </div>
</template>

<script>

export default {
  components: {
    Navbar: () => import('~/components/Navbar'),
    AddEmployee: () => import('~/components/AddEmployee'),
    AddProduct: () => import('~/components/AddProduct'),
  }
}
</script>
