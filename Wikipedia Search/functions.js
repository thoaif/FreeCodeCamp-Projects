var urlArray = [];
var entries = 0;

$( document ).ready(function() {
    populate(); 
});

$(function() {
  $("#cont").click(function() {
    $('#search').removeClass('animate-search2');
    $('#icon').removeClass('animate-icon2');
    $('#icon').addClass('animate-icon');
    $('#search').addClass('animate-search');
    $('#cont').removeClass('animate-move-cont-back');
    $('#cont').addClass('animate-move-cont');
  });

  $("#cont").focusout(function(){
    $('#icon').removeClass('animate-icon');
    $('#search').removeClass('animate-search');
    $('#search').addClass('animate-search2');
    $('#cont').removeClass('animate-move-cont');
    $('#cont').addClass('animate-move-cont-back');
  });

  $(".results").on("click", "div", function() {
    var ind = $(this).index();
    window.location.href = urlArray[ind];
  });

  $(".nice-button").click(function() {
    window.location.href = "https://en.wikipedia.org/wiki/Special:Random";
  });


  $('#search').on('keyup', function(event) {    
      var value = $('#search').val();  
      if (event.keyCode == 13 && value.length !== 0) { 
          $("#box").addClass('animate-move-search-up');
          remCl();
          setTimeout(function(){
            searchWikipedia(value);  
          }, 50+50*entries);
  }});


});






function remCl(){
  $('.result').addClass('animate-itemsgoout');
  $('.result').removeClass('animate-itemscomein');
  $('.details').html('<br>');
  $('h3').html('<br>');
}

// create 10 divs for results
function populate(){
  for (var i = 0; i < 10; i++){ 
      var classes = "result well hidden del" + i;
      var id = "div" + i;
      $("<div>", {
          'class': classes,
           'id' : id
      }).appendTo('#results');  
    
  }
}
    
function searchWikipedia(value){ 
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&datatype=json&limit=10&callback=?&search=" + value;
  urlArray = [];
  $.getJSON( url, function( data ) {
    entries = data[1].length;
    console.log("len: " + entries);
    for (var i = 0; i < entries; i++){ 
      console.log("i:" + i + " data[1][i]:" + data[1][i] + " data[3][i]:" + data[3][i]);
      var divId = "#div"+i;
      $(divId).empty();
      var txt = '<h3>' + data[1][i] + '</h3><p class="details">' + data[2][i] + '</p>';
      $(divId).append(txt);
      $(divId).removeClass('hidden');
      $(divId).addClass('animate-itemscomein');
      $(divId).removeClass('animate-itemsgoout');
      urlArray.push(data[3][i]);
    }
  });

  // hide the rest 
  for (var i = entries; i < 10; i++){ 
    var divId = "#div"+i;
    $(divId).addClass('hidden');
  }
}
  
  
  
  
  
  
 