<template>
  <div class="details">
    <h1>Деталі товару</h1>

    <p><strong>ID:</strong> {{ id }}</p>

    <p v-if="product">
      <strong>Назва:</strong> {{ product.title }} <br />
      <strong>Категорія:</strong> {{ product.category }}
    </p>

    <p v-else>Товар не знайдено</p>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const id = route.params.id

    const products = [
      { id: 1, title: 'Місячні хроніки', category: 'Наукова фантастика' },
      { id: 2, title: 'Король шрамів', category: 'Фентезі' },
      { id: 3, title: '39 ключів', category: 'Пригоди' },
      { id: 4, title: 'Сяйво', category: 'Фантастика жахів' },
      { id: 5, title: 'Дівчина онлайн', category: 'Любовний роман' }
    ]

    const product = products.find(p => p.id === id)

    return { id, product }
  }
}
</script>

<style>
.details {
  padding: 20px;
}
</style>