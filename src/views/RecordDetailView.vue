<template>
  <div>
    <p>記録の詳細</p>
    <p>
      {{ $route.params.date }}
    </p>
    <p>
      {{ $route.params.weight }}
    </p>
    <p>
      {{ $route.params.id }}
    </p>
  </div>
</template>

<script>
  export default {
    name: 'RecordDetailScreen',
  }
</script>
