<template>
  <div>
    <img src="/images/dao.png" />
    <flash-messages />
    <slot />
  </div>
</template>

<script>
import FlashMessages from "@/Shared/FlashMessages";

export default {
  components: {
    FlashMessages,
  },
  props: {
    logo: { 
      type: String,
      default: null
    }
  }
};
</script>
