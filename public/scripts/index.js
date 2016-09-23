

$(document).ready(function() {
    $("#button1").click(function () {
        $("html,body").animate({
            scrollTop: $("#firstf").offset().top
        }, 'slow');
    });
});
