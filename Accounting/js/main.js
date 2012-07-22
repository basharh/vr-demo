
$(document).ready(function() {
  console.log("DOM is ready");

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
  });

});

function append_record(id, note, expense, income, date) {

    var record = document .createElement("tr");

    var noteEl = document.createElement("td");
    noteEl.innerHTML = note;
    noteEl.className = 'note';
    var expEl = document.createElement("td");
    expEl.innerHTML = expense;
    noteEl.className = 'expense';
    var incEl = document.createElement("td");
    incEl.innerHTML = income;
    noteEl.className = 'income';
    var dateEl = document.createElement("td");
    dateEl.innerHTML = date;
    noteEl.className = 'date';

    var actionEl = document.createElement("td");
    actionEl.innerHTML = '<div class="icon"></div>';
    actionEl.className = 'action';

    record.appendChild(noteEl);
    record.appendChild(expEl);
    record.appendChild(incEl);
    record.appendChild(dateEl);
    record.appendChild(actionEl);
    document.getElementById("exp_table").appendChild(record);
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

    if( expense != "" && !isNumber(expense)) 
    {
      $('#expense input').addClass('error');
      add_err_msg('Expense should be a valid number');
      valid = false;
    }

    if ( income != "" &&   !isNumber(income) )
    {
      $('#income input').addClass('error');
      add_err_msg('Income should be a valid number');
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

function delete_record(){

}
