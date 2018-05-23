function getTimeNow() {
  return moment().format('ddd MMM D h:mm:ss A')
  // return moment()
}

function updateTime() {
  $('#time').text(getTimeNow())
}

$(() => {
  setInterval(updateTime, 1000)
  
  $('.new-todo').on('keydown', (event) => {
    // "Enter" key
    if (event.keyCode === 13) {
      const text = event.target.value
      const todoItem = 
        `<li>
          <span class="toggle" />
          <label>${text}</label>
        </li>`
      // TODO: it'd be nice if this were a React component
      // TODO: maybe with a timestamp/due date?
      
      // Create a new <li> with the same text as the input
      $('.todo-list').append(todoItem)
      
      // Clear the text
      event.target.value = ''
    }
  })
  
  $('.todo-list').on('click', '.toggle', (event) => {
    // TODO: super ugly, need to fix this
    const li = $($(event.target).parent()[0])
    li.toggleClass('completed')
  })
})