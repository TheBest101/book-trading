$(document).ready(() => {
  ajaxFunctions.ajaxRequest("GET", appUrl + '/api/book', (data) => {
    data = JSON.parse(data)
    console.log(data)
    var into = 0
    var outto = 0
    var id = data[0];
    data.shift();
    data.forEach((v) => {

      if(!v.pending){
        var block = `
          <tr>
            <td><button onclick="trade('${v.name}','${v.owner.id}')" class="btn-success btn">${v.name}</button></td>
            <td>${v.owner.fullname}</td>
            <td>${v.owner.city}</td>
            <td>${v.owner.state}</td>
          </tr>
        `
        $('table').append(block)
      }else{
        console.log(v.owner.id)
        console.log(v.pending.id)
        console.log(1)
        console.log(id)
        if(v.owner.id === id){
          into++
        }
        if(v.pending.id == id){
          outto++
        }
      }
    })
    $('#in').text(into)
    $('#out').text(outto)
  })
})
function trade(title, id) {
  $('#trade').text('')
  var offer = 'N/A'
  var html = `
    <h3>Offer for ${title}</h3>
    <div class="form-group">
      <label>Title</label>
      <input type="text" class="form-control" id="offer">
      <a class="btn btn-success" href="${appUrl}/api/trade?offer=${offer}&title=${title}&id=${id}" id="submit">submit</a>
    </div>
  `
  $('#trade').append(html)
  $('#offer').keypress(() => {
    var offer = $('#offer').val()
    console.log(offer)
    $("#submit").attr("href", `${appUrl}/api/trade?offer=${offer}&title=${title}&id=${id}`)
  })
}
