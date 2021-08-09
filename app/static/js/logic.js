Moralis.initialize(""); // Application id from moralis.io
Moralis.serverURL = ""; //Server url from moralis.io

/* Valid values for chain in https://docs.moralis.io/moralis-server/transactions-and-balances/intro */
const  chainToQuery= ''

//dApp frontend logic
async function login(){
  document.getElementById('submit').setAttribute("disabled", null);
  document.getElementById('username').setAttribute("disabled", null);
  document.getElementById('useremail').setAttribute("disabled", null);
  Moralis.Web3.authenticate().then(function (user) {
      user.set("name",document.getElementById('username').value);
      user.set("email",document.getElementById('useremail').value);
      user.save();
      getTransactions();
  })
}

async function getTransactions(){
  const transactions = await Moralis.Web3.getTransactions({ chain: chainToQuery }).then(buildTable);
}

function buildTable(data){
  const current = ethereum.selectedAddress;
  document.getElementById("resultSpace").innerHTML =  `<table class="table table-dark table-striped" id="myTable">
                                                       </table>`;
  const table = document.getElementById('myTable');
  const rowHeader = `
                  <thead>
                      <tr>
                          <th>Type</th>
                          <th>From/To</th>
                          <th>Value</th>
                      </tr>
                  </thead>`;
  table.innerHTML += rowHeader;
  for (var i = 0; i < data.length; i++){
      let type = ""
      if (data[i].from_address == current) {
        type = "Outgoing";
        fromTo = data[i].to_address;
      }
      else {
        type = "Incoming";
        fromTo = data[i].from_address;
      }
      var row = `<tr>
                      <td>${type}</td>
                      <td>${fromTo}</td>
                      <td>${data[i].value/10**18}</td>
                </tr>`
      table.innerHTML += row
 } 
}