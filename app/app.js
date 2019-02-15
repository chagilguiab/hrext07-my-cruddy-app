/*
Init app
interact with DOM
interact with localstorage

 */

$(document).ready(function(){
  var calculateRollProbability = function (numberOfDice, hitThreshold) {
    var n = numberOfDice;
    var target = hitThreshold;
    var obj = {};

    //count instances of a hit
    var hit = 0;
    for (var i = 0; i <= 6; i++) {
      if (i >= target) {
        hit += 1;
      }
    }

    //set up ratios
    var singleDieProb = hit/6;
    var singleDieMiss = 1 - singleDieProb;

    //store percentages in object
    obj['allHits'] = Math.round(Math.pow((singleDieProb), n) * 10000)/100 + '% chance of all hits';
    obj['noHits'] = Math.round(Math.pow((singleDieMiss), n) * 10000)/100 + '% chance of all misses';
    obj['atLeastOneHit'] = Math.round((1 - Math.pow((singleDieMiss), n)) * 10000)/100 + '% chance of at least one hit';


    return obj;
  }
  // this is where we jquery
  //var keyData = 'ourKey'; // going to need to make this dynamic?


  $('.btn-add').on('click', function(e){

    var keyData = $('.input-key').val();
    var valueData = $('.input-value').val();
    var stats = calculateRollProbability(keyData, valueData);
    console.log(stats);
    // write to db
    localStorage.setItem(keyData, valueData);
    // read from db
    var displayText = keyData + ' | ' + localStorage.getItem(keyData);
    // this only displays the last one? might want to switch to html
    // and append a div
    // <div class="display-data-item" data-keyValue="keyData">valueData</div>
    // if you use backticks ` you can use ${templateLiterals}
    // TODO make this vars make sense across the app
    $('.container-data').prepend('<div class="display-data-item" data-keyValue="'+ keyData +'">' +
      "Attack Value: " + keyData + " " + "Accuracy: " + valueData + "<br><br>" +stats['allHits']+"<br>"+stats['atLeastOneHit']+"<br>"+stats['noHits'] + "<br>" +
      '</div>');
    $('.input-key').val('');
    $('.input-value').val('');

    // JOHNS ORIGINAL CODE
    // console.log(e);
    // var keyData = $('.input-key').val();
    // var valueData = $('.input-value').val();
    // // write to db
    // localStorage.setItem(keyData, valueData);
    // // read from db
    // var displayText = keyData + ' | ' + localStorage.getItem(keyData);
    // // this only displays the last one? might want to switch to html
    // // and append a div
    // // <div class="display-data-item" data-keyValue="keyData">valueData</div>
    // // if you use backticks ` you can use ${templateLiterals}
    // // TODO make this vars make sense across the app
    // $('.container-data').html('<div class="display-data-item" data-keyValue="'+ keyData +'">'+valueData+'</div>');
    // $('.input-key').val('');
    // $('.input-value').val('');
  });


  // update db
    // need to expand when  more than 1 item is added

  // delete item

  // MORE OF JOHNS CODE
  // $('.container-data').on('click', '.display-data-item', function(e){
  //   console.log(e.currentTarget.dataset.keyvalue);
  //   var keyData = e.currentTarget.dataset.keyvalue;
  //   localStorage.removeItem(keyData);
  //   $('.container-data').text('');
  // });
  // delete all?
  $('.btn-clear').click(function(){
    localStorage.clear();
    $('.container-data').text('');
  });

//roll-probabality-calculator-function


});