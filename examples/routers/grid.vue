<style>
  .view {
    height: 100px;
    width: 100px;
    background: yellow;
  }
</style>
<template>
    <div>
      <Row>
        <Col span="12">col-12</Col>
        <Col span="12">col-12</Col>
      </Row>
      <br>
      <Row>
          <Col span="8">col-8</Col>
          <Col span="8">col-8</Col>
          <Col span="8">col-8</Col>
      </Row>
      <br>
      <Row>
          <Col span="6">col-6</Col>
          <Col span="6">col-6</Col>
          <Col span="6">col-6</Col>
          <Col span="6">col-6</Col>
      </Row>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        n: 2
      }
    },
    methods: {
      add () {
        this.n++;
      }
    }
  }
</script>
