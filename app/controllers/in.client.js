$(document).ready(() => {
  ajaxFunctions.ajaxRequest("GET", appUrl + '/api/book', (data) => {
    data = JSON.parse(data)
    var id = data[0];
    data.shift();
    data.forEach((v) => {
      if(v.pending){
        if(v.owner.id === id){
          console.log(v)
          var block = `
            <tr>
              <td><a href="/api/addTrade?name=${v.name}" class="btn btn-success">Accept</a></td>
              <td><a href="/api/deleteTrade?name=${v.name}" class="btn btn-danger">Deny</a></td>
              <td>${v.pending.offer}</td>
              <td>${v.pending.fullname}</td>
              <td>${v.pending.city}</td>
              <td>${v.pending.state}</td>
              <td>${v.name}</td>
            </tr>
          `
          $('table').append(block)
        }
      }
    })
  })
})
