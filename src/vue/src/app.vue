<template>
    <div id='counter'>
        Counter: {{ counter }}
    </div>
    <!-- <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
    </ul>
    <router-view/> -->
</template>


<script>
    module.exports = {
        data: function d() {
            return {
                counter: 0,
            }
        },

        mounted: function m() {
            setInterval(() => {
            this.counter++
            }, 1000)
        }

    }
</script>