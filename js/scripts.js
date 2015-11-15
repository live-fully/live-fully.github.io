$(document).ready(function() {
    if ($("#homepage").length > 0) {
        $(".concierge-2").hide();
    }
    $(".concierge").click(function () {
        $(".concierge").fadeOut();
        $(".conciege-title").fadeOut();
        $(".concierge-2").delay(500).fadeIn();
    })

    $(".back-button").click(function () {
        $(".concierge-2").fadeOut();

        $(".concierge").delay(500).fadeIn();
        $(".conciege-title").delay(500).fadeIn();
    })
})
