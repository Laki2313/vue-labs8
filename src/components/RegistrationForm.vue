<template>
  <form @submit.prevent="handleSubmit" class="form">
    <h2>Реєстрація</h2>

    <input v-model.trim="form.name" placeholder="Ім'я" />
    <Transition name="fade">
      <p v-if="errors.name" class="error">{{ errors.name }}</p>
    </Transition>

    <input v-model.trim="form.email" placeholder="Email" />
    <Transition name="fade">
      <p v-if="errors.email" class="error">{{ errors.email }}</p>
    </Transition>

    <input type="password" v-model="form.password" placeholder="Пароль" />
    <Transition name="fade">
      <p v-if="errors.password" class="error">{{ errors.password }}</p>
    </Transition>

    <input type="password" v-model="form.confirmPassword" placeholder="Підтвердіть пароль" />
    <Transition name="fade">
      <p v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</p>
    </Transition>

    <input type="number" v-model.number="form.age" placeholder="Вік" />
    <Transition name="fade">
      <p v-if="errors.age" class="error">{{ errors.age }}</p>
    </Transition>

    <label class="checkbox">
      <input type="checkbox" v-model="form.agree" />
      Погоджуюсь з умовами
    </label>
    <Transition name="fade">
      <p v-if="errors.agree" class="error">{{ errors.agree }}</p>
    </Transition>

    <button :disabled="isSubmitting">
      {{ isSubmitting ? 'Відправка...' : 'Зареєструватись' }}
    </button>

    <Transition name="fade">
      <p v-if="success" class="success">
        ✅ Успішна реєстрація!
      </p>
    </Transition>
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

      if (!form.name) {
        errors.name = "Ім'я обов'язкове"
      }

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
  padding: 20px;
  border-radius: 12px;
  background: #f9f9f9;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

input {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
}

button {
  padding: 10px;
  border: none;
  border-radius: 6px;
  background: #42b983;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #369870;
}

button:disabled {
  background: gray;
  cursor: not-allowed;
}

.error {
  color: red;
  font-size: 12px;
}

.success {
  color: green;
  margin-top: 10px;
  font-weight: bold;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>