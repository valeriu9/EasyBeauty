<template>
  <div>
    <client-only>
<!--   <editEmployee />-->
      <addEmployee />
      <Navbar />
      <nuxt />
    </client-only>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar';
import editEmployee from '~/components/editEmployee';
import addEmployee from '~/components/addEmployee';

export default {
  components: {
    Navbar,
 //   editEmployee,
    addEmployee
  }
};
</script>
