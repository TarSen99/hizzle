<template>
    <div class="blocks-container">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'BlocksContainer'
}
</script>

<style lang="scss" scoped>
    .blocks-container {
        display: flex;
        flex-wrap: wrap;
        margin: 20px auto 0;
        max-width: calc(300px + 10px);
    }

    @media (min-width: 768px) { 
        .blocks-container {
            max-width: calc(600px + 20px);
        }
    }


    @media screen and (min-width: 992px) {
        .blocks-container {
            max-width: calc(900px + 30px);
        }
    }
</style>