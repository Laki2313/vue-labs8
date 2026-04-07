<template>
  <form @submit.prevent="handleSubmit" class="form">
    <h2>Реєстрація</h2>

    <div>
      <label>Ім'я:</label>
      <input v-model.trim="form.name" type="text" />
      <p v-if="errors.name" class="error">{{ errors.name }}</p>
    </div>

    <div>
      <label>Email:</label>
      <input v-model.trim="form.email" type="email" />
      <p v-if="errors.email" class="error">{{ errors.email }}</p>
    </div>

    <div>
      <label>Пароль:</label>
      <input v-model="form.password" type="password" />
      <p v-if="errors.password" class="error">{{ errors.password }}</p>
    </div>

    <div>
      <label>Підтвердження пароля:</label>
      <input v-model="form.confirmPassword" type="password" />
      <p v-if="errors.confirmPassword" class="error">
        {{ errors.confirmPassword }}
      </p>
    </div>

    <div>
      <label>Вік:</label>
      <input v-model.number="form.age" type="number" />
      <p v-if="errors.age" class="error">{{ errors.age }}</p>
    </div>

    <div>
      <label>
        <input v-model="form.agree" type="checkbox" />
        Погоджуюсь з умовами
      </label>
      <p v-if="errors.agree" class="error">{{ errors.agree }}</p>
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

    const errors = reactive({})

    const validate = () => {

      Object.keys(errors).forEach(key => delete errors[key])

      if (!form.name) {
        errors.name = "Введіть ім'я"
      }

      if (!form.email) {
        errors.email = "Введіть email"
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        errors.email = "Некоректний email"
      }

      if (!form.password) {
        errors.password = "Введіть пароль"
      } else if (form.password.length < 6) {
        errors.password = "Мінімум 6 символів"
      }

      if (form.confirmPassword !== form.password) {
        errors.confirmPassword = "Паролі не співпадають"
      }

      if (!form.age) {
        errors.age = "Введіть вік"
      } else if (form.age < 16) {
        errors.age = "Мінімум 16 років"
      }

      if (!form.agree) {
        errors.agree = "Потрібно погодитись"
      }

      return Object.keys(errors).length === 0
    }

    const handleSubmit = () => {
      if (validate()) {
        console.log('Форма валідна ✅', form)
      } else {
        console.log('Є помилки ❌')
      }
    }

    return {
      form,
      errors,
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
  margin-bottom: 12px;
}

input {
  width: 100%;
  padding: 6px;
}

button {
  margin-top: 10px;
  padding: 8px 15px;
}

.error {
  color: red;
  font-size: 13px;
}
</style>