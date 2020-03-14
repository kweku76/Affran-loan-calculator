// liste for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
  //hide results
  document.getElementById('results').style.display = 'none';

  //show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000); // using the setTimeout method to wait for 2 seconds before showing results

  e.preventDefault();

});
// Calculate Results
function calculateResults() { //pass in event parameter (e)
  console.log('calculating...');

  //UI Variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  //calculations - using formulas from web
  const principal = parseFloat(amount.value); //The parseFloat() function parses a string and returns a floating point number.
  const calculatedInterest = parseFloat(interest.value) / 100 / 12; //interest divided by 100 and then divided by 12
  const calculatedPayments = parseFloat(years.value) * 12; //valued multipled by 12 for yearly payments

  //compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) { // find if monthly value is a finite number
    monthlyPayment.value = monthly.toFixed(2); // if true then show monthly value with 2 decimal places (toFixed)
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    //show results
    document.getElementById('results').style.display = 'block';

    //hide loader
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('please check numbers');
  }


  //The isFinite() function determines whether a number is a finite, legal number.
  //This function returns false if the value is +infinity, -infinity, or NaN (Not-a-Number), otherwise it returns true.

}
//showError function
function showError(error) {

  //hide results
  document.getElementById('results').style.display = 'none';

  //hide loader
  document.getElementById('loading').style.display = 'none';

  //create a div
  const errorDiv = document.createElement('div');

  //get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading')

  // add class
  errorDiv.className = 'alert alert-danger';

  // create text node and add to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading) // insertng the errorDiv class above heading class

  setTimeout(clearError, 3000); // this is the time in miliseconds befor the error goes, using function clearError

  function clearError() { // this function removes the error div after 
    document.querySelector('.alert').remove();
  }
}