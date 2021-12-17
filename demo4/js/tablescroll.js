setInterval(timerFn, 1000);
function timerFn() {
    var scrollHeight = $(".tableData").find("tr").outerHeight();
    $(".tableData").animate({
            marginTop: -scrollHeight,
        },
        100,
        function () {
            $(this)
                .css({
                    marginTop: "0px",
                })
                .find("tr:first")
                .appendTo(this);
        }
    );
};
