<template>
  <div class="roblox_status">
    <h3 v-if="running">Roblox Running</h3>
	<h3 v-else>Roblox Not Running</h3>
  </div>
</template>
<script>

export default {
  name: 'RobloxStatus',
  props: {
    running: Boolean
  }
}
</script>