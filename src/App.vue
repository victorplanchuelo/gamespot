<template>
  <div>
    <comp-header />
    <div>Content</div>
    <comp-footer />
  </div>
</template>

<script>
import compHeader from './components/Header-Footer/Header';
import compFooter from './components/Header-Footer/Footer';

export default {
  components: {
    compHeader,
    compFooter
  }
}
</script>

<style>
  @import './assets/style.css';
</style>
