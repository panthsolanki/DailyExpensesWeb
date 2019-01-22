import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#6483ef',
    success: '#0b33bc',
    info: '#ffaa2c',
    error: '#f83e70'
  }
})
