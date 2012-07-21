
$(document).ready(function() {
  console.log("DOM is ready");

  $("#datepicker").datepicker({
    showOn: "button",
    buttonImage: "images/calendar.gif",
    buttonImageOnly: true
  });

});
