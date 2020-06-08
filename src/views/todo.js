import $ from 'jquery';
import { v4 as uuid } from 'uuid';
import { remove } from 'lodash';

export function todoView() {
  localStorage.getItem('todos');

  let todosList = JSON.parse(localStorage.getItem('todos')) || [];

  function addTodo(item) {
    const todoItem = $(
      `<li><input type="text" value="${item.text}" id="elem${item.id}" disabled="disabled" /><div class="fill"></div></li>`,
    );
    todoItem.addClass('list-group-item d-flex justify-content-between align-items-center');
    todoItem.append($(`<div class="btn btn-outline btn-edit">Edytuj</div>`));
    todoItem.append($(`<div class="btn btn-danger btn-delete">Usuń</div>`));

    todoItem.find('.btn-edit').click(() => {
      const itemInput = document.querySelector('#elem' + item.id);

      itemInput.removeAttribute('disabled');
      todoItem.find('.btn-edit').html('Edycja...').removeClass('btn-outline').addClass('btn-info');
    });

    todoItem.find('.btn-delete').click(() => {
      const confQuestion = window.confirm('Czy jesteś pewien?');

      if (confQuestion === true) {
        todoItem.remove();

        // usuwamy item.id z listy todosList
        todosList = remove(todosList, (el) => el.id !== item.id);

        // nadpisujemy aktualny stan listy w localStorage
        localStorage.setItem('todos', JSON.stringify(todosList));
      }
    });

    todoItem.find('input').change(() => {
      const itemInput = document.querySelector('#elem' + item.id);
      itemInput.setAttribute('disabled', 'disabled');
      todoItem.find('.btn-edit').html('Edytuj').removeClass('btn-info').addClass('btn-outline');

      // usuwamy item.id z listy todosList
      todosList = remove(todosList, (el) => el.id !== item.id);

      // dodajemy zaktualizowaną wersję
      const text = itemInput.value;
      if (text) {
        const todo = { text, status: 'todo', id: item.id };
        todosList.push(todo);
        localStorage.setItem('todos', JSON.stringify(todosList));
      }
    });

    localStorage.setItem(item.text, item.id);
    $('#todos').append(todoItem);
  }

  todosList.forEach(addTodo);

  $('#todo-form').submit(($event) => {
    $event.preventDefault();

    const text = $('#todo-text').val();
    if (text) {
      const todo = { text, status: 'todo', id: uuid() };
      $('#todo-text').val('');
      todosList.push(todo);
      localStorage.setItem('todos', JSON.stringify(todosList));
      addTodo(todo);
    }
  });
}
