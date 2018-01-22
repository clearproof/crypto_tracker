<template>
    <b-navbar toggleable="md" type="light" variant="light">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand to="/home">
           <img src="../assets/logo.png" class="d-inline-block align-center"  alt="BV">
            Crypo-tracker
        </b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">
            <!-- Left aligned nav items -->
            <b-navbar-nav>
                <b-nav-item href="#">Learn</b-nav-item>
                <b-nav-item href="#" disabled>Mine</b-nav-item>
                <b-nav-item to="/donate">Donate</b-nav-item>
                <b-nav-item to="/about-us">About us</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <b-nav-text>Current currency :</b-nav-text>
                <b-nav-item-dropdown :text=currency right>
                    <b-dropdown-item href="#" v-on:click="setCurrency('EUR')">EUR</b-dropdown-item>
                    <b-dropdown-item href="#" v-on:click="setCurrency('USD')">USD</b-dropdown-item>
                </b-nav-item-dropdown>

            </b-navbar-nav>
        </b-collapse>
    </b-navbar>

</template>
<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    computed: mapGetters({
      'currency' : 'getCurrency'
    }),
    methods: mapActions(['setCurrency']),

  };
</script>

