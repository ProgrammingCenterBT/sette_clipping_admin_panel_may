
    var accord = document.getElementsByClassName("accordion-btn");
    var i;

    for (i = 0; i < accord.length; i++) {
        accord[i].onclick = function() {
            this.classList.toggle("active");
            this.nextElementSibling.classList.toggle("show");
        }
    }


  
