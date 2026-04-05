<template>
  <div class="catalog">
    <h1>Книжний каталог</h1>

    <div class="products">
      <div v-for="product in products" :key="product.id" class="card">
        <h3>{{ product.title }}</h3>
        <p>{{ product.category }}</p>

        <router-link :to="`/catalog/${product.id}`">
          Детальніше →
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const products = [
      { id: 1, title: 'Місячні хроніки', category: 'Наукова фантастика' },
      { id: 2, title: 'Король шрамів', category: 'Фентезі' },
      { id: 3, title: '39 ключів', category: 'Пригоди' },
      { id: 4, title: 'Сяйво', category: 'Фантастика жахів' },
      { id: 5, title: 'Дівчина онлайн', category: 'Любовний роман' }
    ]

    return { products }
  }
}
</script>

<style>
.catalog {
  padding: 20px;
}

.products {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.card {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 10px;
  width: 180px;
  background: #f9f9f9;
}

.card a {
  color: #42b983;
  text-decoration: none;
}
</style>