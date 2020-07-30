<template>
    <section>
      <h1 class="section-title">
        Offers
      </h1>
        
        <div class="settings">
            <div class="checkbox-container">
                <input
                    v-model="overFourKk"
                    id="over-400k-checkbox"
                    type="checkbox"
                >
                <label 
                    for="over-400k-checkbox"
                >
                    Over 400k
                </label>
            </div>

            <div class="order-by-container">
                <span>
                    Order By
                </span>

                <select 
                    v-model="sortValue"
                >
                    <option :value="null" disabled>
                        Select
                    </option>

                    <option 
                        v-for="option in sortOptions"
                        :key="option"
                        :value="option" 
                    >
                        {{ option }}
                    </option>
                </select>
            </div>
        </div>
        

        <blocks-container>
            <simple-block 
                v-for="offer in currOffers"
                :key="offer.id"
                :details="offer"
                :labels="labels"
                optionsField="property"
                header
                footer
            />
        </blocks-container>

    </section>
</template>

<script>
import SimpleBlock from './SimpleBlock.vue'
import BlocksContainer from './BlocksContainer.vue'
import { LABELS } from './../helpers/constants'
import { checkEqual } from './../helpers'
import { getOffers } from './../services/api'

const SORT_OPTIONS = [
    'Price',
    'Rooms',
    'Area'
]

const PRICE_KEY = 'Price'
const ROOMS_KEY = 'Rooms'

const DEFAULT_SORT_VALUE = 'Price'

const SHOULD_BE_EQUAL_BY = ['price', 'area', 'bedrooms']

export default {
    name: 'Offers',
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
            offers: [],
            labels: LABELS,
            overFourKk: false,
            sortOptions: SORT_OPTIONS,
            sortValue: DEFAULT_SORT_VALUE
        }
    },
    mounted() {
        getOffers()
        .then(res => {
            this.offers = res.data
            this.sort()
        })
    },
    computed: {
        currOffers() {
            let res = []

            if(this.overFourKk && this.active) {
                res = this.offers.filter(offer => {
                    return offer.price > 400000
                }).filter(offer => {
                    return checkEqual(SHOULD_BE_EQUAL_BY, offer.property, this.active)
                })
            } else if (this.overFourKk) {
                res = this.offers.filter(offer => {
                    return offer.price > 400000
                })
            } else if (this.active) {
                res = this.offers.filter(offer => {
                    return checkEqual(SHOULD_BE_EQUAL_BY, offer.property, this.active)
                })
            } else {
                res = this.offers
            }

            return res
        }
    },
    watch: {
        sortValue: {
            handler() {
                this.sort()
            }
        }
    },
    methods: {
        sort() {
            this.offers.sort((a, b) => {
                if(!this.sortValue) {
                    0
                }

                let aValue;
                let bValue;

                if(this.sortValue === PRICE_KEY) {
                    aValue = a && a.price
                    bValue = b && b.price
                } else if (this.sortValue === ROOMS_KEY) {
                    aValue = a && a.property && a.property.bedrooms
                    bValue = b && b.property && b.property.bedrooms
                } else {
                    aValue = a && a.property && a.property[this.sortValue.toLowerCase()]
                    bValue = b && b.property && b.property[this.sortValue.toLowerCase()]
                }

                return aValue - bValue
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .checkbox-container {
        text-align: center;
    }

    .settings {
        display: flex;
        justify-content: center;
    }

    .order-by-container {
        margin-left: 20px;
    }
</style>