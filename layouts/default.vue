<template>
  <div>
    <client-only>
      <editEmployee />
      <Navbar />

      <nuxt />
    </client-only>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar';
import editEmployee from '~/components/editEmployee';

export default {
  components: {
    Navbar,
    editEmployee
  }
};
</script>
