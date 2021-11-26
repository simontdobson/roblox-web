<template>
  <div class="hello">
    <Header />
    <div class="container mrgnbtm">
          <div class="row">
<!--            <div class="col-md-8"> -->
<!--                <CreateUser @createUser="userCreate($event)" /> -->
<!--            </div> -->
<!--            <div class="col-md-4"> -->
<!--                <DisplayBoard :numberOfUsers="numberOfUsers" @getRobloxSummary="getRobloxSummary()" /> -->
<!--            </div> -->
          </div>
    </div>
    <div class="row mrgnbtm run-status">
      <RobloxStatus :running="running"/>
    </div>
    <div class="row mrgnbtm roblox-config">
      <RobloxConfig :morningMinutes="morningMinutesLimit" :afternoonMinutes="afternoonMinutesLimit" @updateConfig="updateConfig" />
    </div>
    <div class="row mrgnbtm">
        <Sessions v-if="sessions.length > 0" :sessions="sessions" />
    </div>
    <div class="row mrgnbtm v-button">
        <v-button :onClick="screenLock"/> 
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import Sessions from './Sessions.vue'
import Button from './Button.vue'
import RobloxStatus from './RobloxStatus.vue'
import RobloxConfig from './RobloxConfig.vue'

import { getRobloxSummary } from '../services/UserService'
import { getRobloxConfig } from '../services/RobloxConfig'
import { getRobloxStatus } from '../services/RobloxStatus'
import { updateConfig } from '../services/RobloxConfig'
import { lockScreen } from '../services/ScreenLock'

export default {
  name: 'Dashboard',
  components: {
    Header,
    'v-button' : Button,
    Sessions,
    RobloxStatus,
    RobloxConfig
  },
  data() {
      return {
          sessions: [],
          numberOfSessions: 0,
          running : false,
          morningMinutesLimit : 0,
          afternoonMinutesLimit : 0
      }
  },
  methods: {
    getRobloxSummary() {
      getRobloxSummary().then(response => {
        console.log(response)
        this.sessions = response
        this.numberOfSessions = this.sessions.length
      })
    },   
    screenLock() {
      lockScreen()

    },
	getRobloxConfig() {
        getRobloxConfig().then(response => {
        console.log(response);
        this.morningMinutesLimit=parseInt(response.morningMinutes);
        this.afternoonMinutesLimit=parseInt(response.afternoonMinutes);
	//	RobloxConfig.setConfig(response.morningMinutes,response.afternoonMinutes);
      });
	},
	getRobloxStatus() {
        getRobloxStatus().then(response => {
        console.log(response);
		this.running = response.running
      });
	},
	updateConfig(ev) {
       updateConfig(ev).then(response => {
       console.log(response);
       });
	}
  },
  mounted () {
    this.getRobloxSummary();
//	this.getRobloxConfig();
	this.getRobloxStatus();
  }

}
</script>