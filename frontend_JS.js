/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction_hotels() {
    document.getElementById("myDropdown_hotels").classList.toggle("show");
}
function myFunction_flights() {
    document.getElementById("myDropdown_flights").classList.toggle("show");
}
function myFunction_cruises() {
    document.getElementById("myDropdown_cruises").classList.toggle("show");
}
function myFunction_cars() {
    document.getElementById("myDropdown_cars").classList.toggle("show");
}
function myFunction_packages() {
    document.getElementById("myDropdown_packages").classList.toggle("show");
}
function myFunction_login() {
    document.getElementById("myDropdown_login").classList.toggle("show");
}


/*login enlarge toggle*/
function myFunction_enlarge(){
    ("button").click(function(){
        (this).next().toggleClass("big")
    })
})

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}