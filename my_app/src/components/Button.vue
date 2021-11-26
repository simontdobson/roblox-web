
<template>

<button @click="onClick" class="Button">

  <slot>Lock Screen</slot>

</button>

</template>


<script>

export default {

  props: {

    onClick: {

      type: Function,

      required: true

    }

  }

}

</script>