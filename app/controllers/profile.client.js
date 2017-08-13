$(document).ready(() => {
  $('#click').click(() => {
    var fullname = $('#fullname').val()
    var state = $('#state').val()
    var city = $('#city').val()

    var updateData = 'fullname=' + fullname + '&state=' + state+ '&city=' + city
    ajaxFunctions.ajaxRequest('POST', appUrl + '/api/user?' + updateData, (data) => {
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
