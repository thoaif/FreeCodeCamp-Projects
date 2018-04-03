var mins = 0;
var sec = 0;
var hrs = 0;
// var count = 0;
var timerid;
var reset;
var timeout = 1000; //change for debugging purposes

$(document).ready(function(){
  resetclock();
});

$(function(){ 
  $("#btn2").click(function(){
    if (reset){
      reset = false;
      if ($("#btn1").text() == "work"){
        startwork();
      }
      else{
        startbreak();
      }
      
    }
    else{ 
      if ($("#btn2").text() == "pause"){
        stoptimer();
        $("#btn2").text("start");  
      }
      else{
        timerid = setInterval(timeer, timeout);
        $("#btn2").text("pause");
      }
    }
  });
});


$(function(){ 
  $('#vibrate').click(function(){
      vibrate();
  });
});

$(function(){ 
    
  $(".adjust").click(function(){
    let v = $(this).attr('id');
    let br = $('#text-break').val();
    let ses = $('#text-session').val();
    switch(v){
      case "sub-break":
        if(br != 0){ 
          br--
          $('#text-break').val(br);
          
        }
        break;
      case "add-break":
        br++;
        $('#text-break').val(br);
        break;
      case "sub-session":
        if(ses != 0){ 
          ses--
          $('#text-session').val(ses);
          
        }
        break;
      case "add-session":
        ses++;
        $('#text-session').val(ses);
        break;  
    }
  });
});


$(function(){ 

  $("#btn1").click(function(){
    if (true){
      reset = false;
    }

    if ($('#btn1').text() == 'work'){      
      startwork();      
    }
    else{ 
      startbreak();
    }
  });
});


function startbreak(){
  $('#btn1').text('work');
  $("#btn2").text("pause");
  updateBreak();
  updateTime();
  stoptimer();
  timerid = setInterval(timeer, timeout);

}

function updateBreak(){
  mins = $("#text-break").val() % 60;
  sec = 0;
  hrs = ($("#text-break").val() - mins) / 60;
}


function startwork(){
  $('#btn1').text('break');
  $("#btn2").text("pause");
  updateSession();
  updateTime();
  stoptimer();
  timerid = setInterval(timeer, timeout);
}

function stoptimer(){
  if(timerid) {clearInterval(timerid); timerid="";}
}

function updateSession(){
  mins = $("#text-session").val() % 60;
  hrs = ($("#text-session").val() - mins) / 60;
  sec = 0;
}

// clearInterval(timer);



function timeer(){
  if (sec == 0){
    sec = 59;
    mins--;
  }
  else {
    sec--;
  }
  
  if (mins == -1){
    mins = 59;
    if (hrs == 0){
        stoptimer();
        reset = true;
        $("#btn2").text("start");
        if ($('#btn1').text() == 'break'){
          // startbreak();
          updateBreak();
          
        }
        else{
          // startwork();
          updateSession();
        }
        
        
        
        vibrate();
    }
    else{
      hrs--;
    }
  }
  else if (mins == 0 && sec < 10){
    $('.inner').removeClass('animate-vibrate');
  }
  updateTime();
  
}

function vibrate(){
  $('.inner').addClass('animate-vibrate');
  setTimeout(function(){
    $('.inner').removeClass('animate-vibrate');
  }, 600);
}

function updateTime(){
  
  $('#text').text((hrs < 10? "0" + hrs : hrs ) + ":" + (mins < 10? "0" + mins : mins ) + ":" + (sec < 10? "0" + sec : sec ));
}

$(function(){
  $("#stop").click(function(){
    resetclock();
  });
});

function resetclock(){
  reset = true;
  stoptimer();
  updateSession();
  updateTime();
  $("#btn2").text('start');
  $("#btn1").text('work');
}