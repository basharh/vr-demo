
$(document).ready(function() {
  //console.log("DOM is ready");

  restore_records();
  update_balance();

  $(".action .icon").live('click', function(e){
    var tr = $(e.target).parent().parent();
    var id = tr.children('.id').first().text();
    tr.remove();
    delete_record(id);
    update_balance();
  });

  $("#datepicker").datepicker({
    showOn: "button",
    buttonImage: "images/calendar.gif",
    buttonImageOnly: true
  });

  $("#add_btn").click( function(){
    //console.log("Add button clicked");
    clear_errors();
    var note = $("#note input").val();
    var expense = $("#expense input").val();
    var income = $("#income input").val();
    var date = $("#date input").val();

    if ( !validate(note, expense, income, date) )
      return;
    
    var id = get_new_id();
    append_record(id, note, expense, income, date);
    store_record(id, note, expense, income, date);

    clear_fields();
    update_balance();
  });

  $("#clear_btn").click( function(){
    try {
      if ( !( 'localStorage' in window && window['localStorage'] !== null ) )
      {
        return false;
      }
    } catch (e) {
      return false;
    }

    localStorage.clear();

    $('#exp_table tr').each( function(){
      if ( $(this).hasClass('header') )
        return;

      $(this).remove();
    });

    update_balance();
  });

});

function append_record(id, note, expense, income, date) {

  if ( id === false )
    id = "";

  var record = document .createElement("tr");

  var idEl = document.createElement("td");
  idEl.innerHTML = id;
  idEl.className = 'id';
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

  record.appendChild(idEl);
  record.appendChild(noteEl);
  record.appendChild(expEl);
  record.appendChild(incEl);
  record.appendChild(dateEl);
  record.appendChild(actionEl);
  //document.getElementById("exp_table").appendChild(record);
  $("#exp_table tbody").append( $(record) );
}

function validate(note, expense, income, date){
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
  else{
    if ( /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date) === false )
    {
      add_err_msg('Invalid date format');
      $('#date input').addClass('error');
      valid = false;
    }
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
  
  //console.log('expense_total: ' + expense_total );
  //console.log('income_total: ' + income_total );
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

function get_new_id(){

  try {
    if ( !( 'localStorage' in window && window['localStorage'] !== null ) )
    {
      return false;
    }
  } catch (e) {
    return false;
  }

  /* 
   * Check to see if localstorage has a max_key:
   * if yes:
   *  retrieve max_key, increment it and return it.
   * if no:
   *  assign max_key to 0, and return 0;
   */

  var max_key = localStorage.getItem('max_key');
  var max_key_int = 0;

  if ( max_key != null && max_key != undefined )
  {
    /* Retrieve, increment, store, return */
    max_key_int = parseInt( max_key );
    max_key_int++; 
  }

  localStorage["max_key"] = max_key_int;
  return max_key_int;
}

function store_record(id, note, expense, income, date){

  /* If localStorage is not supported, short circuit all the storage 
   * methods */

  try {
    if ( !( 'localStorage' in window && window['localStorage'] !== null ) )
    {
      return false;
    }
  } catch (e) {
    return false;
  }

  var data = new Array();

  var arr_str = localStorage["data"];
  if ( !( arr_str == null || arr_str == undefined ) )
  {
    //console.log('current arr_str: ' + arr_str );
    var data = arr_str.split(',');
  }

  var record = new Array( id, note, expense, income, date );

  data.push( id );

  localStorage.setItem(id, record);
  localStorage['data'] = data;
}

function delete_record(id)
{
  try {
    if ( !( 'localStorage' in window && window['localStorage'] !== null ) )
    {
      return false;
    }
  } catch (e) {
    return false;
  }
  
  var data_str = localStorage.getItem('data');

  if ( data_str == null || data_str == undefined )
    return false;

  var data = data_str.split(',');

  for ( var i = 0; i < data.length; i++)
  {
    if ( data[i] == id )
    {
      data.splice( i, 1 );
      localStorage.removeItem( id );
    }
  }

  if ( data.length == 0 )
    localStorage.removeItem('data');
  else
    localStorage.setItem('data', data);
}

function restore_records()
{
  try {
    if ( !( 'localStorage' in window && window['localStorage'] !== null ) )
      return false;
  } catch (e) {
    //console.log('Local storage is not supported in your browser!');
    return false;
  }

  var data_str = localStorage.getItem('data');

  if ( data_str == null || data_str == undefined )
    return false;

  //console.log( data_str );
  var data = data_str.split(',');

  for ( var i = 0; i < data.length; i++ ){
    var record_str = localStorage.getItem(data[i]);
    var record = record_str.split(',');
    append_record( record[0], record[1], record[2], record[3], record[4]);
  }
}
