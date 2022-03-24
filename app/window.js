function getTimeNow() {
  return moment().format('ddd MMM D | h:mm:ss A')
  // return moment()
}

function updateTime() {
  $('.time').text(getTimeNow())
}

$(() => {
  setInterval(updateTime, 1000)

  $('.new-todo').on('keydown', (event) => {
    const text = event.target.value

    // "Enter" key
    if (event.keyCode === 13 && text !== '') {
      const todoItem =
        `<li class="todo-item">
          <span>
            <span class="toggle" />
            <label class="label-handle">${text}</label>
          </span>
          <span class="remove" />
        </li>`

      // Create a new <li> with the same text as the input
      $('.todo-list').append(todoItem)

      // Clear the text
      event.target.value = ''
    }
  })

  // Mark a todo-item as complete
  $('.todo-list').on('click', '.toggle', (event) => {
    const li = $($(event.target).parent()[0])
    li.toggleClass('completed')
  })

  // Remove a todo-item from the list
  $('.todo-list').on('click', '.remove', (event) => {
    const li = $($(event.target).parent()[0])
    li.remove()
  })

  // Make the elements draggable
  dragula([document.querySelector('.todo-list')], {
    moves: (el, container, handle) => {
      return handle.classList.contains('label-handle');
    },
    mirrorContainer: document.querySelector('.todo-list')
  })
})