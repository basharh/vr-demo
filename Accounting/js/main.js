
$(document).ready(function() {
  console.log("DOM is ready");

  $(".action .icon").live('click', function(e){
    $(e.target).parent().parent().remove();
    update_balance();
  });

  $("#datepicker").datepicker({
    showOn: "button",
    buttonImage: "images/calendar.gif",
    buttonImageOnly: true
  });

  $("#add_btn").click( function(){
    console.log("Add button clicked");
    clear_errors();
    var note = $("#note input").val();
    var expense = $("#expense input").val();
    var income = $("#income input").val();
    var date = $("#date input").val();

    if ( !validate("", note, expense, income, date) )
      return;
    
    append_record("", note, expense, income, date);
    clear_fields();
    update_balance();
  });

});

function append_record(id, note, expense, income, date) {

    var record = document .createElement("tr");

    var noteEl = document.createElement("td");
    noteEl.innerHTML = note;
    noteEl.className = 'note';
    var expEl = document.createElement("td");
    if ( expense != "" ) expEl.innerHTML = "$" + expense;
    expEl.className = 'expense';
    var incEl = document.createElement("td");
    if ( income != "" ) incEl.innerHTML = "$" + income;
    incEl.className = 'income';
    var dateEl = document.createElement("td");
    dateEl.innerHTML = date;
    dateEl.className = 'date';

    var actionEl = document.createElement("td");
    actionEl.innerHTML = '<div class="icon"></div>';
    actionEl.className = 'action';

    record.appendChild(noteEl);
    record.appendChild(expEl);
    record.appendChild(incEl);
    record.appendChild(dateEl);
    record.appendChild(actionEl);
    //document.getElementById("exp_table").appendChild(record);
    $("#exp_table tbody").append( $(record) );
}

function validate(id, note, expense, income, date){
  var valid = true;

  if ( $.trim(note) == "" )
  {
    add_err_msg('Please provide a note');
    $('#note input').addClass('error');
    valid = false;
  }

  expense = $.trim(expense);
  income = $.trim(income);

  if( expense == "" && income == "" )
  {
    add_err_msg('Either income or expense should be defined');
    $('#expense input').addClass('error');
    $('#income input').addClass('error');
    valid = false;
  }
  else{

    if( expense != "" && ( !isNumber(expense) || parseFloat(expense) <= 0 ) ) 
    {
      $('#expense input').addClass('error');
      add_err_msg('Expense should be a valid positive number');
      valid = false;
    }

    if ( income != "" && ( !isNumber(income) || parseFloat(income) <= 0 ) )
    {
      $('#income input').addClass('error');
      add_err_msg('Income should be a valid positive number');
      valid = false;
    }
  }


  date = $.trim(date);
  if (date == "")
  {
    add_err_msg('Date must be provided');
    $('#date input').addClass('error');
    valid = false;
  }

  return valid;
}

function clear_fields() {
  $('#input_form input[type="text"]').val('');
}

function clear_errors(){
  $('#err_msgs ol').empty();
  $('#input_form input[type="text"]').removeClass("error");
}

function add_err_msg(msg){
  $("#err_msgs ol").append( $('<li></li>').text(msg) );
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function update_balance(){

  var expense_total = 0;
  $("td.expense").each(function(){
    var html = $.trim(this.innerHTML);

    if ( html == "" )
      return;

    html = html.substring(1); 
    expense_total += parseFloat(html);
  });
  
  var income_total = 0;
  $("td.income").each(function(){
    var html = $.trim(this.innerHTML);

    if ( html == "" )
      return;

    html = html.substring(1); 
    income_total += parseFloat(html);
  });

  var total = income_total - expense_total;

  total = total.toFixed(2);

  var total_str = "";
  
  console.log('expense_total: ' + expense_total );
  console.log('income_total: ' + income_total );
  if (total < 0 )
  {
    total = Math.abs(total);
    total_str = '($' + total + ')';
  }
  else
  {
    total = Math.abs(total);
    total_str = '$' + total; 
  }

  $("#balance_box #total").text(total_str);

}
