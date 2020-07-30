<template>
  <div id="app">
    <properties 
      @select="handleSelect"
      :active="activeProperty"
    />  
    <offers 
      :active="activeProperty"
    />
  </div>
</template>

<script>
import Properties from './components/Properties.vue'
import Offers from './components/Offers.vue'

export default {
  name: 'App',
  components: {
    Properties,
    Offers
  },
  data() {
    return {
      activeProperty: null
    }
  },
  methods: {
    handleSelect(v) {
      if(this.activeProperty === v) {
        this.activeProperty = null
        return
      }

      this.activeProperty = v
    }
  }
}
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    max-width: 1200px;
    margin: 60px auto 0;
    padding: 0 10px;
  }

  h1.section-title {
    color: #83adca;
    text-align: center;
  }

  .checkbox-container {
        text-align: center;
    }
</style>
