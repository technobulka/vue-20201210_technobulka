<template>
  <form class="form" @submit.prevent="submit">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input type="email" class="form-control" v-model="email" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Имя</label>
      <div class="input-group">
        <input type="text" class="form-control" v-model="fullname" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input type="password" class="form-control" v-model="password" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Повтор пароля</label>
      <div class="input-group">
        <input type="password" class="form-control" v-model="password_repeat" />
      </div>
    </div>
    <div class="form-group">
      <label class="checkbox">
        <input type="checkbox" v-model="agreement" />
        Я согласен с условиями
        <span></span>
      </label>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary">
        Зарегистрироваться
      </button>
    </div>
    <div class="form__append">
      Уже есть аккаунт?
      <router-link :to="{ name: 'login' }" class="link">Войдите</router-link>
    </div>
  </form>
</template>

<script>
import { register } from '../data';

export default {
  name: 'RegisterPage',

  data() {
    return {
      email: null,
      fullname: null,
      password: null,
      password_repeat: null,
      agreement: null,
    };
  },

  methods: {
    submit() {
      if (!this.email) {
        alert('Требуется ввести Email');
        return;
      }

      if (!this.fullname) {
        alert('Требуется ввести полное имя');
        return;
      }

      if (!this.password) {
        alert('Требуется ввести пароль');
        return;
      }

      if (this.password !== this.password_repeat) {
        alert('Пароли не совпадают');
        return;
      }

      if (!this.agreement) {
        alert('Требуется согласиться с условиями');
        return;
      }

      register(this.email, this.fullname, this.password).then((res) => {
        if (res.statusCode === 422) {
          alert(res.message);
          return;
        }

        alert(res.id);
      });
    },
  },
};
</script>

<style scoped></style>
