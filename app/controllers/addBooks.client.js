$(document).ready(() => {
  $('#click').click(() => {
    var title = $('#title').val()

    var updateData = 'name=' + title
    ajaxFunctions.ajaxRequest('POST', appUrl + '/api/book?' + updateData, (data) => {
      data = JSON.parse(data)
      if(data.success){
        $('h3').css('color', 'green')
        $('h3').text('success')
      }else{
        $('h3').css('color', 'red')
        $('h3').text('error')
      }
    })
  })
})
