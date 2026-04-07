<template>
  <form @submit.prevent="handleSubmit" class="form">
    <h2>Реєстрація</h2>

    <div>
      <label>Ім'я:</label>
      <input v-model.trim="form.name" type="text" />
    </div>

    <div>
      <label>Email:</label>
      <input v-model.trim="form.email" type="email" />
    </div>

    <div>
      <label>Пароль:</label>
      <input v-model="form.password" type="password" />
    </div>

    <div>
      <label>Підтвердження пароля:</label>
      <input v-model="form.confirmPassword" type="password" />
    </div>

    <div>
      <label>Вік:</label>
      <input v-model.number="form.age" type="number" />
    </div>

    <div>
      <label>
        <input v-model="form.agree" type="checkbox" />
        Погоджуюсь з умовами
      </label>
    </div>

    <button type="submit">Зареєструватися</button>
  </form>
</template>

<script>
import { reactive } from 'vue'

export default {
  setup() {
    const form = reactive({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: null,
      agree: false
    })

    const handleSubmit = () => {
      console.log(form)
    }

    return {
      form,
      handleSubmit
    }
  }
}
</script>

<style>
.form {
  max-width: 400px;
  margin: 30px auto;
  padding: 20px;
  border: 1px solid #ccc;
}

.form div {
  margin-bottom: 10px;
}

input {
  width: 100%;
  padding: 5px;
}

button {
  margin-top: 10px;
  padding: 8px 15px;
}
</style>