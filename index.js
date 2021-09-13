var express = require('express');
var app = new express();
var app_port = 3000;
var request = require('request');
const authorization_key = '<get your from fortniteapi.io>';
const challenges_api_url = 'https://fortniteapi.io/v2/challenges?season=current&lang=en';

app.listen(app_port, function(req,res){

  console.log("Server running on port : " + app_port );

});

app.get('/',function(expressReq,expressRes){

  request({
      headers: {
        'Authorization': authorization_key
      },
      uri: challenges_api_url,
      method: 'GET'
    }, function (err, res, body) {
          console.log(body);
          var response = JSON.parse(body);
          // var finalOutput = `<pre>${response.bundles}</pre>`;
          var finalOutput = `<style>
          body{
                font-size: 1.3em;
          }
.styled-table {
    width: 100%;
    border-collapse: collapse;
    margin: 25px 0;
    font-family: sans-serif;
    font-size: 1.1em;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    height: 80px;
}

.styled-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
}

.styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}

.styled-table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
}

          </style>`;
          var count = 1;

          loop1:
          for(var record in response ){
            loop2:
            for( var bun in response['bundles']){



              finalOutput += `Bundle ID: ${response['bundles'][bun].id} <br /><br />
                              Bundle Name: ${response['bundles'][bun].name} <br /><br />
                              Bundle Unlock Type: ${response['bundles'][bun].unlockType} <br/><br/>`;
                loop3:
                finalOutput += `QUESTS in Bundle ::<br/><br/>`;
                for(var quest in response['bundles'][bun].quests){
                  // console.log(response['bundles'][bun].quests[quest]);
                finalOutput += `<table class="styled-table">
                                  <thead>
                                    <tr>
                                      <th style="width: 200px;text-align:center;"><strong>ID</strong></th>
                                      <th style="width: 200px;"><strong>Name</th>
                                      <th style="width: 200px;"><strong>Enabled</th>
                                      <th style="width: 200px;"><strong>Enable Date</th>
                                      <th style="width: 200px;"><strong>Progress (points)</th>
                                    </tr>
                                  </thead>`;


                  finalOutput += `<tbody><tr>
                                      <td>${response['bundles'][bun].quests[quest].id}</td>
                                      <td>${response['bundles'][bun].quests[quest].name}</td>
                                      <td>${response['bundles'][bun].quests[quest].enabled}</td>
                                      <td>${response['bundles'][bun].quests[quest].enabledDate}</td> 
                                      <td>${response['bundles'][bun].quests[quest].progressTotal}</td>
                                  </tr>
                                  </tbody>
                                  </table>`;
                    loop4:
                    for(var tCharacter in response['bundles'][bun].quests[quest].tandemCharacter){
                        loop5:
                        // for(var tCharacterImage in response['bundles'][bun].quests[quest].tandemCharacter){
                            // if(response['bundles'][bun].quests[quest].tandemCharacter[tCharacter].toast == 'undefined' 
                            //   && response['bundles'][bun].quests[quest].tandemCharacter[tCharacter].sidePanel == 'undefined'
                            //   && response['bundles'][bun].quests[quest].tandemCharacter[tCharacter].entryList == 'undefined'){
                                finalOutput += `Toast Image : <img src="${response['bundles'][bun].quests[quest].tandemCharacter[tCharacter].toast}" /><br/><br/>`;
                                finalOutput += `Side Panel : <img src="${response['bundles'][bun].quests[quest].tandemCharacter[tCharacter].sidePanel}" /><br/><br/>`;
                                finalOutput += `Entry List : <img src="${response['bundles'][bun].quests[quest].tandemCharacter[tCharacter].entryList}" /><br/><br/>`;                          

                            // }
                        // }
                    }
                  count++;
                  console.log( "++ " + count );
                  if(count > 50){
                  console.log( "++ breaking ++ " + count );
                    break loop1;
                  }
                } 
            }


          }
        expressRes.send(finalOutput);
    });  
});
