function startOver(){
	document.loan_form.loan_amt.value="";
	document.loan_form.months.value="";
	document.loan_form.rate.value="";
	document.loan_form.extra.value="0";
	
	document.getElementById("loan_info").innerHTML="";
	document.getElementById("table").innerHTML="";
}

function validate () {
	var loan_amt = document.loan_form.loan_amt.value;
	var months = document.loan_form.months.value;
	var rate = document.loan_form.rate.value;
	var extra = document.loan_form.extra.value;
	

	
	if (loan_amt <=0 || isNaN(Number(loan_amt)) ){
		alert ("Please enter a valid loan amount.");
		document.loan_form.loan_amt.value="";
	}
	
	else if (months <=0 || parseInt(months) !=months){
		alert("Please enter a valid number of months.");
		document.loan_form.months.value="";
	}
	
	else if (rate <=0 || isNaN(Number(rate)) ) {
		alert("Please enter a valid interest rate.");
		document.loan_form.rate.value="";
	}
	
	else if (extra < 0 || isNaN(Number(extra)) ) {
		alert ("Please enter a valid extra payment.");
		document.loan_form.extra.value="0";
	}
	
	else {
		
		calculate(parseFloat(loan_amt), parseInt(months), parseFloat(rate), parseFloat(extra));
	}
}


function calculate (loan_amt, months, rate, extra) {
	
	i = rate/100;
	
	var monthly_payment = loan_amt*(i/12)*Math.pow((1+i/12), months) / (Math.pow((1+i/12), months) - 1);
	
	var info = "";
	
	info += "<table width='250'>";
	info += "<tr><td>Loan Amount:</td>";
	info += "<td align='right'>"+loan_amt+"</td></tr>";
	
	info += "<tr><td>Num of Months:</td>";
	info += "<td align='right'>"+months+"</td></tr>";
	
	info += "<tr><td>Interest Rate:</td>";
	info += "<td align='right'>"+rate+"</td></tr>";
	
	info += "<tr><td>Monthly Payment:</td>";
	info += "<td align='right'>"+round(monthly_payment,2)+"</td></tr>";
	
	info += "<tr><td>Extra:</td>";
	info += "<td align='right'>"+extra+"</td></tr>";
	
	info += "<tr><td>Total Payment:</td>";
	info += "<td align='right'>"+round(monthly_payment+extra,2)+"</td></tr>";
	
	info += "</table>";
	
	document.getElementById("loan_info").innerHTML = info;  // info is a string containing all the html code
	
	//************************************************************************************************************
	
	var table = "";
	
	table += "<table cellpadding = '15' border='1'>";
	
	table += "<tr>";
		table += "<td width='30'>0</td>";
		table += "<td width='60'>&nbsp;</td>";
		table += "<td width='60'>&nbsp;</td>";
		table += "<td width='60'>&nbsp;</td>";
		table += "<td width='85'>&nbsp;</td>";
		table += "<td width='70'>"+round(loan_amt,2)+";</td>";
	table += "</tr>"; 
	
	var current_balance = loan_amt;
	var payment_counter = 1;
	var total_interest = 0;
	
	monthly_payment = monthly_payment + extra;
	
	while (current_balance > 0) {
		//create rows
		towards_interest = (i/12)*current_balance; // calculates portionof monthly payment.
		
		if (monthly_payment > current_balance) {
			monthly_payment = current_balance + towards_interest;
		}
		
		towards_balance = monthly_payment - towards_interest;
		total_interest = total_interest + total_interest;
		current_balance = current_balance - towards_balance;
		
		// display rows
		
		table += "<tr>";
			table += "<td>"+payment_counter+"</td>";
			table += "<td>"+round(monthly_payment,2)+"</td>";
			table += "<td>"+round(towards_balance,2)+"</td>";
			table += "<td>"+round(towards_interest,2)+"</td>";
			table += "<td>"+round(total_interest,2)+"</td>";
			table += "<td>"+round(current_balance,2)+"</td>";
		
		table += "</tr>";
		
		
		payment_counter++;
	}
	
	
	
	table += "</table>";
	
	document.getElementById("table").innerHTML = table;
	
}
	
	
	
	/*document.getElementById."loan_info".innerHTML = info // info is a string 
	
	var info ="";
	
	info += "<table width='250'>";
	info += "<tr><td>Loan Amount:</td>";
	info += "<td align='right'>"+loan_amt+"</td></tr>";
	
	info += "<tr><td>Num of Months:</td>";
	info += "<td align='right'>"+months+"</td></tr>";
	
	info += "<tr><td>Interest Rate:</td>";
	info += "<td align='right'>"+rate+"</td></tr>";
	
	info += "<tr><td>Monthly Payment:</td>";
	info += "<td align='right'>"+round(monthly_payment,2)+"</td></tr>";
	
	info += "<tr><td>Extra:</td>";
	info += "<td align='right'>"+extra+"</td></tr>";
	
	info += "<tr><td>Total Payment:</td>";
	info += "<td align='right'>"+round(monthly_payment+extra,2)+"</td></tr>";
	
	info += "</table>";
	
	//document.getElementById.("loan_info").innerHTML = info;  info is a string 
}

	*/

function round (num, dec) {
	
	return (Math.round(num*Math.pow(10,dec))/ Math.pow(10, dec)).toFixed(dec);
}