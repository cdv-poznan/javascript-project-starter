import $ from 'jquery';
import { v4 as uuid } from 'uuid';
import { remove } from 'lodash';

export function todoView() {
  let todosList = JSON.parse(localStorage.getItem('todos')) || [];

  function addTodo(item) {
    const todoItem = $(`<li>${item.text}</li>`);
    todoItem.addClass('list-group-item d-flex justify-content-between align-items-center').append(`<small>${item.id}</small>`);
    todoItem.append(
      $(`<button class="btn btn-danger">Delete</button>`).click(() => {
        todoItem.remove();

        // item.id usuwamy z listy todolist
        todosList = remove(todosList, (el) => el.id !== item.id);

        // zapisujemy aktualny stan listy w localStorage
        localStorage.setItem('todos', JSON.stringify(todosList));
      }),
    );
    $('#todos').append(todoItem);
  }

  todosList.forEach(addTodo);

  console.log(todosList);
  // przechwyć event wysłania formularza
  $('#todo-form').submit(($event) => {
    $event.preventDefault(); // zablokuj domyślne zachowanie przegladarki

    const text = $('#todo-text').val(); // pobierz wartość z inputa o id todo-text

    // jeśli text nie jest pusty
    if (text) {
      // stwórz obiekt todo pod zmienną todo
      const todo = { text, status: 'todo', id: uuid() };
      $('#todo-text').val(''); // wyczyść inputa z tekstem
      todosList.push(todo);
      localStorage.setItem('todos', JSON.stringify(todosList));
      addTodo(todo);
      console.log(todo);
      console.log(todosList);
      console.log(localStorage);
    }
  });
}
