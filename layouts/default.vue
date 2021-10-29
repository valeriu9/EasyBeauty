<template>
  <div>
    <client-only>
<!--   <editEmployee />-->
      <!--    <addEmployee /> -->
          <addProduct />
          <Navbar />
          <nuxt />
        </client-only>
      </div>
    </template>

    <script>
    import Navbar from '~/components/Navbar';
    import editEmployee from '~/components/editEmployee';
    import addEmployee from '~/components/addEmployee';
    import addProduct from '~/components/addProduct';

    export default {
      components: {
        Navbar,
     //   editEmployee,
     //   addEmployee,
        addProduct
      }
    };
    </script>
