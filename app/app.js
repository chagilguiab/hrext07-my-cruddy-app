/*
Init app
interact with DOM
interact with localstorage

 */

$(document).ready(function(){


  var factorial = function (n) {
    if (n <= 1) {
      return 1;
    } else {
      return n * factorial(n-1);
    }
  }

  var binomProb = function (attempts, success, prob, probNot) {
    return (factorial(attempts)/(factorial(success) * factorial(attempts-success))) * Math.pow(prob, success) * Math.pow(probNot, (attempts-success));
  }

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
    if (n === 1) {
      obj['allHits'] = Math.round(Math.pow((singleDieProb), n) * 10000)/100 //+ '% chance of hitting';
      obj['noHits'] = Math.round(Math.pow((singleDieMiss), n) * 10000)/100 //+ '% chance of missing';

    } else if (n === 3) {
      obj['allHits'] = Math.round(Math.pow((singleDieProb), n) * 10000)/100 //+ '% chance of hitting';
      obj['noHits'] = Math.round(Math.pow((singleDieMiss), n) * 10000)/100 //+ '% chance of missing';
      obj['atLeastOneHit'] = Math.round((1 - Math.pow((singleDieMiss), n))*10000)/100
      obj['atLeastTwoHits'] = Math.round((binomProb(3, 2, singleDieProb, singleDieMiss) + Math.pow((singleDieProb), n)) * 10000)/100

    } else if (n === 4) {
      obj['allHits'] = Math.round(Math.pow((singleDieProb), n) * 10000)/100 //+ '% chance of hitting';
      obj['noHits'] = Math.round(Math.pow((singleDieMiss), n) * 10000)/100 //+ '% chance of missing';
      obj['atLeastOneHit'] = Math.round((1 - Math.pow((singleDieMiss), n))*10000)/100
      obj['atLeastTwoHits'] = obj['allHits'] + Math.round(Math.pow(singleDieProb, 2) * 10000)/100 + Math.round(binomProb(4, 3, singleDieProb, singleDieProb) * 10000)/100
      obj['atLeastThreeHits'] = Math.round((Math.pow(singleDieProb, n) + binomProb(4, 3, singleDieProb, singleDieMiss)) * 10000)/100

    } else if (n === 5) {
      obj['allHits'] = Math.round(Math.pow((singleDieProb), n) * 10000)/100 //+ '% chance of hitting';
      obj['noHits'] = Math.round(Math.pow((singleDieMiss), n) * 10000)/100 //+ '% chance of missing';
      obj['atLeastOneHit'] = Math.round((1 - Math.pow((singleDieMiss), n))*10000)/100
      obj['atLeastTwoHits'] = Math.round((Math.pow(singleDieProb, n) + binomProb(5, 2, singleDieProb, singleDieMiss) + binomProb(5, 3, singleDieProb, singleDieMiss) + binomProb(5,4, singleDieProb, singleDieMiss))*10000)/100;
      obj['atLeastThreeHits'] = Math.round((Math.pow(singleDieProb, n)  + binomProb(5, 3, singleDieProb, singleDieMiss) + binomProb(5, 4, singleDieProb, singleDieMiss)) * 10000)/100
      obj['atLeastFourHits'] = Math.round((Math.pow(singleDieProb, n) + binomProb(5, 4, singleDieProb, singleDieMiss))*10000)/100

    } else {
      obj['allHits'] = Math.round(Math.pow((singleDieProb), n) * 10000)/100 //+ '% chance of all hits';
      obj['noHits'] = Math.round(Math.pow((singleDieMiss), n) * 10000)/100 //+ '% chance of all misses';
      obj['atLeastOneHit'] = Math.round((1 - Math.pow((singleDieMiss), n)) * 10000)/100 //+ '% chance of at least one hit';
    }

    return obj;
  }
  // this is where we jquery
  //var keyData = 'ourKey'; // going to need to make this dynamic?


  $('.btn-add').on('click', function(e){

    var weaponName = $('.input-name').val();
    var keyData = $('.input-key').val();
    var valueData = $('.input-value').val();
    var stats = calculateRollProbability(Number(keyData), Number(valueData));
    console.log(stats)
    // write to db
    localStorage.setItem(keyData, valueData);
    // read from db
    var displayText = keyData + ' | ' + localStorage.getItem(keyData);
    // this only displays the last one? might want to switch to html
    // and append a div
    // <div class="display-data-item" data-keyValue="keyData">valueData</div>
    // if you use backticks ` you can use ${templateLiterals}
    // TODO make this vars make sense across the app

    if (Number(keyData) === 1) {
      $('.container-data').prepend('<div class="display-data-item" data-keyValue="'+ keyData +'"><h4>' + weaponName + '</h4>' +
      "Attack Value: " + keyData + " " + " Accuracy: " + valueData + "<br><br>" +stats['allHits']+"% chance of hitting<br><br>"+stats['noHits'] + "% chance of missing<br>" +
      '</div>');

    } else if (Number(keyData) === 2) {
      $('.container-data').prepend('<div class="display-data-item" data-keyValue="'+ keyData +'"><h4>' + weaponName + '</h4>' +
      "Attack Value: " + keyData + " " + " Accuracy: " + valueData + "<br><br>" +stats['atLeastOneHit']+"% chance of at least one hit<br>" + stats['allHits']+"% chance of two hits<br><br>"+stats['noHits'] + "% chance of all misses<br>" +
      '</div>');
    }

    else if (Number(keyData) === 3) {
      $('.container-data').prepend('<div class="display-data-item" data-keyValue="'+ keyData +'"><h4>' + weaponName + '</h4>' +
      "Attack Value: " + keyData + " " + " Accuracy: " + valueData + "<br><br>" + stats['atLeastOneHit']+"% chance of at least one hit<br>" + stats['atLeastTwoHits'] + "% chance of at least two hits<br>"+stats['allHits']+"% chance of all hits<br><br>"+stats['noHits'] + "% chance of all misses<br>"  +
      '</div>');
    }

    else if (Number(keyData) === 4) {
      $('.container-data').prepend('<div class="display-data-item" data-keyValue="'+ keyData +'"><h4>' + weaponName + '</h4>' +
      "Attack Value: " + keyData + " " + " Accuracy: " + valueData + "<br><br>" + stats['atLeastOneHit']+"% chance of at least one hit<br>" + stats['atLeastTwoHits'] + "% chance of at least two hits<br>"+ stats['atLeastThreeHits'] + "% chance of at least three hits<br>"+stats['allHits']+"% chance of all hits<br><br>"+stats['noHits'] + "% chance of all misses<br>"  +
      '</div>');

    }
    else if (Number(keyData) === 5) {
      $('.container-data').prepend('<div class="display-data-item" data-keyValue="'+ keyData +'"><h4>' + weaponName + '</h4>' +
      "Attack Value: " + keyData + " " + " Accuracy: " + valueData + "<br><br>" + stats['atLeastOneHit']+"% chance of at least one hit<br>" + stats['atLeastTwoHits'] + "% chance of at least two hits<br>"+ stats['atLeastThreeHits'] + "% chance of at least three hits<br>"+ + stats['atLeastFourHits'] + "% chance of at least four hits<br>" +stats['allHits']+"% chance of all hits<br><br>"+stats['noHits'] + "% chance of all misses<br>"  +
      '</div>');
    } else {

      $('.container-data').prepend('<div class="display-data-item" data-keyValue="'+ keyData +'"><h4>' + weaponName + '</h4>' +
      "Attack Value: " + keyData + " " + " Accuracy: " + valueData + "<br><br>" +stats['allHits']+"% chance of all hits<br>"+stats['atLeastOneHit']+"% chance of at least one hit<br><br>"+stats['noHits'] + "% chance of all misses<br>" +
      '</div>');
    }

    $('.input-name').val('');
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
  // // delete all?
  $('.btn-clear').click(function(){
    localStorage.clear();
    $('.container-data').text('');
  });

//roll-probabality-calculator-function


});