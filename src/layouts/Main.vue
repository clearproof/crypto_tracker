<template>
    <div>
        <HeaderLayout></HeaderLayout>
        <b-container fluid>
            <template v-if="$route.matched.length">
                <router-view></router-view>
            </template>
        </b-container>
    </div>
</template>

<script>
import HeaderLayout from './Header.vue';

export default {
  components: {
    HeaderLayout,
  },
};
</script>
