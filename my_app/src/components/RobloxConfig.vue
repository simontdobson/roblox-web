<template>
  <div class="roblox_config">
<!--      <h4>Morning minutes limit: {{ morningMinutes }} </h4> -->
      <label for="morningMinutes">Morning Minutes: </label>
      <input type="text" v-model="morningMinutes" name="morningMinutes" id="morningMinutes" placeholder="morningMinutes" minlength="1" maxlength="3" size="3"/>
<!--      <h4>Afternoon minutes limit: {{ afternoonMinutes }} </h4> -->
      <br>
      <label for="afternoonMinutes">Afternoon Minutes: </label>
      <input type="text" v-model="afternoonMinutes" name="afternoonMinutes" id="afternoonMinutes" placeholder="Afternoon Minutes" minlength="1" maxlength="3" size="3"/>
      <br>
      <button type="button" @click='updateConfig()' class="btn">Update Config</button>
  </div>
</template>


<script>

import { getRobloxConfig } from '../services/RobloxConfig'

export default {
  name: 'RobloxConfig',
  data() {
    return {
      morningMinutes: 0,
      afternoonMinutes: 0
//      morningMinutesForm: 0,
//      afternoonMinutesForm: 0
    }
  },
  methods: {
    getRobloxLimits() {
        getRobloxConfig().then(response => {
        console.log(response);
        this.morningMinutes=parseInt(response.morningMinutes);
        this.afternoonMinutes=parseInt(response.afternoonMinutes);
//		this.morningMinutesForm=this.morningMinutes;
//		this.afternoonMinutesForm=this.afternoonMinutes;
      });
	},
    updateConfig() {
      console.log('RobloxConfig.vue updateConfig()');
      const payload= {
        morningMinutes: this.morningMinutes,
        afternoonMinutes: this.afternoonMinutes
      }
      console.log('RobloxConfig.vue ' + JSON.stringify(payload));
      this.$emit('updateConfig', payload)
      console.log('RobloxConfig.vue returned from emit');
    }
  },
  mounted() {
   this.getRobloxLimits();
  }
}
</script>