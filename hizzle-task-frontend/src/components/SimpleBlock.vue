<template>
    <div
        @click="$emit('select')"
        :class="{
            'has-header': header, 
            'has-footer': footer,
            'active': this.active && this.active.id === this.details.id,
            'hoverable': this.hover
            }"
        class="simple-block"
    >
        <div 
            v-if="header"
            class="block-header"    
        >
            {{ details.price | formatCurrency }}
        </div>

        <div class="block-content">
            <template 
                v-for="(option, key) in fieldsContainer"
            >
                <div
                    v-if="labels[key]"
                    :key="key"
                    class="line"
                >
                    <p class="block-line-title">
                         <template 
                            v-if="typeof labels[key] === 'string'"
                        >
                            {{ labels[key] }}
                        </template>
                        <template v-else>
                            <span v-html="labels[key].label" /> 
                        </template>
                    </p>

                    <p class="block-line-value">
                        <template 
                            v-if="typeof labels[key] === 'string'"
                        >
                            {{ option }}   
                        </template>
                        <template v-else>
                            {{ option }}
                            <span v-html="labels[key].postfix" /> 
                        </template>
                    </p>
                </div>
            </template>
        </div>

        <div 
            v-if="footer"
            class="block-footer"    
        >
            by {{ details.offered_by }}
        </div>
    </div>
</template>

<script>

const DEFAULT_OPTOINS_FIELD = 'details'

export default {
    name: 'SimpleBlock',
    props: {
        active: {
            type: Object,
            default: null
        },
        optionsField: {
            type: String,
            default: null
        },
        details: {
            type: Object,
            default: () => {}
        },
        hover: {
            type: Boolean,
            default: false
        },
        header: {
            type: Boolean,
            default: false
        },
        footer: {
            type: Boolean,
            default: false
        },
        labels: {
            type: Object,
            default: () => {}
        }
    },
    filters: {
        formatCurrency(v) {
            return new Intl.NumberFormat('en-US', 
            {
                style: 'currency',
                currency: 'USD'
            }).format(v)
        }
    },
    computed: {
        fieldsContainer() {
            if(!this.optionsField) {
                return this[DEFAULT_OPTOINS_FIELD]
            }

            return this[DEFAULT_OPTOINS_FIELD][this.optionsField]
        }
    }
}
</script>

<style lang="scss" scoped>
    .simple-block {
        padding: 10px 15px;
        border-radius: 5px;
        background-color: #add8e5;
        max-width: 300px;
        overflow: hidden;
        margin: 0 5px 10px;
        width: 300px;
        transition: all 0.2s;

        &.has-header, &.has-footer {
            padding: 0;
        }

        &.active {
            background-color: #63bb96;
        }

        &.hoverable {
            cursor: pointer;
        }
    }

    .line {
        display: flex;
    }

    .block-line-title, .block-line-value {
        flex-basis: 50%;
        margin: 0;
        line-height: 26px;
    }

    .block-line-title {
        font-size: 14px;
        font-weight: 600;
    }

    .block-header, .block-footer {
        background-color: #90ee95;
        color: #0f3511;
        padding: 5px 10px;
    }

    .block-header {
        text-align: center;
        font-weight: 700;
        border-bottom: 1px solid #828282;
    }

    .block-footer {
        text-align: right;
        border-top: 1px solid #828282;
    }

    .has-header, .has-footer {
        .block-content {
            padding: 10px;
        }
    }
</style>

<style lang="scss">
    .block-line-value {
        sup {
            line-height: 0;
        }
    }

</style>