<template>
  <div>
    <h1>Editing a ToDo</h1>

    <div v-for="item in todo" :key="item._id">
      Author:
      <h4 style="border: 1px solid black; background-color: cadetblue">
        {{ item.author }}
      </h4>
      Todo Item:
      <p style="border: 1px solid black; background-color: cadetblue">
        {{ item.todo }}
      </p>

      <hr />
      <input type="text" placeholder="Author a" v-model="item.author" />
      <!-- <span> Edit: {{ item.author }} </span> -->
      <br />
      <input type="text" placeholder="Todo a" v-model="item.todo" />
      <!-- <span> Edit: {{ item.todo }} </span> -->
      <br />
      <button @click="editTodo()">Update Item</button>
      <hr />
    </div>
  </div>
</template>

<script>
import todocrud from "../modules/todocrud";

export default {
  setup() {
    const { editTodo, state, GetSpecificTodo, todo, todoId } = todocrud();

    GetSpecificTodo();

    return {
      todo,
      todoId,
      editTodo,
      state,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>