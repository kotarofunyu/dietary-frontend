<template>
  <div>
    マイページ
    <div>
      {{ this.users }}
      <ul>
        <li v-for="(value, key) in users" :key="key">
          <dl>
            <dt>user name</dt>
            <dd>{{ value.name }}</dd>
          </dl>
          <dl>
            <dt>email</dt>
            <dd>{{ value.email }}</dd>
          </dl>
          <dl>
            <dt>sign up date</dt>
            <dd>{{ value.created_at }}</dd>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      users: []
    }
  },
  mounted () {
    this.axios.get('http://localhost:3000/users').then((response) => {
      this.users = response.data
    }).catch(() => {
      alert('エラー')
    })
  }
}
</script>

<style>

</style>
