 
var op = "";
var num1 = "";
var flag = true; //flag at the start
 
$(document).ready(function() {
	$("#display1").val('0');
	$("#display2").val('0');
	flag = true;
});

$("button").click(function(){
	
	let value = $(this).val() + "";
	let d1;
	let d2;
	
	if(flag){
		d1 = "";
		d2 = "";
	}
	else{
		d1 = $("#display1").val();
		d2 = $("#display2").val();
	}
	
	console.log(/[\.]/g.test(d1));
	
	// equal case
	if (!(flag) && value.includes("=") && !(/[-+÷^x]$/.test(d1)) && !(op == "÷" && d1 == "0")){
			let result = operation(num1, Number(d1), op) + "";
			
			
			$("#display1").val(result);
			
			flag = true;
			let u = $("#display2").val().length + (result + "").length;
			if (u >= 30){
				$("#display2").val(d2 + "=");
			}
		else{
			$("#display2").val(d2 + "=" + result);
		}
		
	}
	
	// a digit pressed
	else if (/\d/.test(value) && d1.length <= 13 && d2.length <= 28) {
		if (flag){
			clear();
			flag = false;
		}
		
		if (/^[-+÷^x]/.test(d1)) {
			if (value === "00") {
				value = "0";
			}
			$("#display1").val(value);
			$("#display2").val(d2 + value);
		}
		else if (d1 !== "0") {
			$("#display1").val(d1 + value);
			$("#display2").val(d2 + value);
		}	
		else if (d1 === "0" && !(value.includes("0"))){
			$("#display1").val(value);
			$("#display2").val(d2.substring(0,d2.length - 1) + value);
		}
	}
	
	// console.log((/[\.]/.test(d1)));
	// decimal 
	else if (value === '.') {
		if (!(/[\.]/g.test(d1))){ 
		let a;
		if (flag){
			flag = false;
			clear();
			a = "0."
		}
		
		
		
		if (/^[-+÷^x]/.test(d1)) { //if there's any digits in display 1
			a = "0."
		}
		else { 
			a = ".";
		}	
		$("#display1").val(d1 + a);
		$("#display2").val(d2 + a);
		
		}
	
		
	}
	
	//operator pressed
	else if (!flag && $(this).hasClass('op') && !(op == "÷" && d1 == "0") && d2.length <= 27 ){
		if(op === '') { //if there is no previous op no calc required
			op = value;
			$("#display2").val(d2 + value);
			num1 = Number(d1); //set num1
			$("#display1").val(value); // clear display 1
		}
		else {
			if (!(/[-+÷x^]$/.test(d2))){ //if last entry wasn't an op
				num1 = operation(num1, Number($("#display1").val()),op); // calculate for previous op
				$("#display2").val(d2 + value); //update
				op = value; //set new OP
				$("#display1").val(value);
			}
			else{
				$("#display1").val(value);
				$("#display2").val(d2.substring(0,d2.length - 1) + value); //update
				op = value;
			}
		}
		
	}
	//dell
	else if (value.includes("del")){
		if (d1.length > 0 && d1 != "0"){ 
			$("#display1").val(d1.substring(0,d1.length - 1));
			$("#display2").val(d2.substring(0,d2.length - 1));
		}
		if (flag) {
			clear();
		}
	}
	//AC
	else if (value.includes("AC")){
		clear();
	}
	
	
	
 });

function clear(){
	num1 = 0;
	op = "";
	$("#display1").val('0');
	$("#display2").val('0');
	flag = true;
}

 function operation(n1, n2, oper){
		if (oper == "+") {
			return n1 + n2; 
		 }
		 else if (oper == "-") {
			 return n1 - n2; 
		 }
		 else if (oper == "x") {
			 return n1 * n2; 
		 }
		 else if (oper == "^"){
			 return Math.pow(n1, n2); 
		 }
	 	 else if (oper == "÷"){
			 if (n2 != 0){
				 return n1 / n2;
			 }
		 }	
	 	else {
			return n1;
		}
 }

function turncat(){
	
}