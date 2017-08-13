$(document).ready(() => {
  ajaxFunctions.ajaxRequest("GET", appUrl + '/api/book', (data) => {
    data = JSON.parse(data)
    var id = data[0];
    data.shift();
    data.forEach((v) => {
      if(v.pending){

        if(v.pending.id === id){
          console.log(v.name)
          var block = `
            <tr>
              <td>${v.name}</td>
              <td>${v.owner.fullname}</td>
              <td>${v.owner.city}</td>
              <td>${v.owner.state}</td>
            </tr>
          `
          $('table').append(block)
        }
      }
    })
  })
})
