function getTimeNow() {
  // return moment().format()
  return moment()
}

function updateTime() {
  $('#time').text(getTimeNow())
}

$(() => {
  setInterval(updateTime, 1000)
})