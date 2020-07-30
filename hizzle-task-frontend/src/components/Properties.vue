<template>
    <section>
      <h1 class="section-title">
        Properties
      </h1>

      <div class="checkbox-container">
          <input
            v-model="apartmentsOnly"
            id="apartments-checkbox"
            type="checkbox"
           >
          <label 
            for="apartments-checkbox"
          >
              View apartments only
          </label>
      </div>
        
        <blocks-container>
            <simple-block 
                @select="$emit('select', property)"
                :active="active"
                v-for="property in currProperties"
                :key="property.id"
                :details="property"
                :labels="labels"
                hover
            />
        </blocks-container>

    </section>
</template>

<script>
import SimpleBlock from './SimpleBlock.vue'
import BlocksContainer from './BlocksContainer.vue'
import { LABELS } from './../helpers/constants'
import { getProperties } from './../services/api'

const APARTMENTS_VALUE = 'apartment'

export default {
    name: 'Properties',
    components: {
        SimpleBlock,
        BlocksContainer
    },
    props: {
        active: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            properties: [],
            labels: LABELS,
            apartmentsOnly: false
        }
    },
    computed: {
        currProperties() {
            if(this.apartmentsOnly) {
                return this.properties.filter(prop => {
                    return prop.kind && prop.kind.toLowerCase() === APARTMENTS_VALUE
                })
            }
            
            return this.properties
        }
    },
    mounted() {
        getProperties()
        .then(res => {
            this.properties = res.data
        })
    }
}
</script>
