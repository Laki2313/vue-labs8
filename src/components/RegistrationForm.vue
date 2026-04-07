<template>
  <form @submit.prevent="handleSubmit" class="form">
    <h2>Реєстрація</h2>

    <input v-model.trim="form.name" placeholder="Ім'я" />
    <p v-if="errors.name" class="error">{{ errors.name }}</p>

    <input v-model.trim="form.email" placeholder="Email" />
    <p v-if="errors.email" class="error">{{ errors.email }}</p>

    <input type="password" v-model="form.password" placeholder="Пароль" />
    <p v-if="errors.password" class="error">{{ errors.password }}</p>

    <input type="password" v-model="form.confirmPassword" placeholder="Підтвердіть пароль" />
    <p v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</p>

    <input type="number" v-model.number="form.age" placeholder="Вік" />
    <p v-if="errors.age" class="error">{{ errors.age }}</p>

    <label>
      <input type="checkbox" v-model="form.agree" />
      Погоджуюсь з умовами
    </label>
    <p v-if="errors.agree" class="error">{{ errors.agree }}</p>

    <button :disabled="isSubmitting">
      {{ isSubmitting ? 'Відправка...' : 'Зареєструватись' }}
    </button>

    <p v-if="success" class="success">✅ Успішна реєстрація!</p>
  </form>
</template>

<script>
import { reactive, ref, watch } from 'vue'

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
    const isSubmitting = ref(false)
    const success = ref(false)

    const validate = () => {
      Object.keys(errors).forEach(key => delete errors[key])

      if (!form.name) errors.name = "Ім'я обов'язкове"

      if (!form.email) {
        errors.email = "Email обов'язковий"
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        errors.email = "Невірний формат email"
      }

      if (!form.password) {
        errors.password = "Пароль обов'язковий"
      } else if (form.password.length < 6) {
        errors.password = "Мінімум 6 символів"
      }

      if (form.confirmPassword !== form.password) {
        errors.confirmPassword = "Паролі не співпадають"
      }

      if (!form.age || form.age < 16) {
        errors.age = "Мінімальний вік 16"
      }

      if (!form.agree) {
        errors.agree = "Потрібно погодитись"
      }

      return Object.keys(errors).length === 0
    }

    const handleSubmit = () => {
      success.value = false

      if (!validate()) return

      isSubmitting.value = true

      setTimeout(() => {
        isSubmitting.value = false
        success.value = true


        Object.assign(form, {
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          age: null,
          agree: false
        })
      }, 1500)
    }

    watch(form, (newVal) => {
      for (let key in newVal) {
        if (newVal[key]) {
          delete errors[key]
        }
      }
    }, { deep: true })

    return {
      form,
      errors,
      handleSubmit,
      isSubmitting,
      success
    }
  }
}
</script>

<style>
.form {
  max-width: 400px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 8px;
}

button {
  padding: 10px;
  background: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  background: gray;
}

.error {
  color: red;
  font-size: 12px;
}

.success {
  color: green;
  margin-top: 10px;
}
</style>