<template>
  <footer class="footer footer-black footer-white">
    <div class="container-fluid">
      <div class="row">
        <nav class="footer-nav">

        </nav>
        <div class="credits ml-auto">
          <div class="copyright">
            &copy; Coded with
            <i class="fa fa-heart heart"></i> by
            <a href="#" target="_blank" rel="noopener">{{ $env === 'shop2pay' ? 'shop2pay' : $env }}</a>.
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
    name: 'main-footer'
  }
</script>
<style>
</style>
