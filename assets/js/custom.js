$(document).ready(function () {





    $('a[href="#"]').click(function (e) {
        e.preventDefault();
    });

    $('.btnContainer').hide();

    //    $('[data-next]').on('click', function (e) {
    $('[data-next]').click(function (e) {
        e.preventDefault();

        $('.stepArea').show();

        var id = window.location.hash;
        var step = $(this).attr('href');
        var increment = (parseInt(step[step.length - 1]) + 1);
        var nextStep = '#step' + increment;

        $(step).hide();
        $(nextStep).show();
        $('.btnContainer').show();
        window.location.hash = nextStep;
        updateProgressBar(true, 1);

        if (location.hash) {
            setTimeout(function () {
                window.scrollTo(0, 0);
            }, 1);
        }

    });

    document.getElementById("myLink").onclick = function () {
        // do things, and then
        return false;
    };

    //    $('[data-button-next]').on('click', function (e) {
    $('[data-button-next]').click(function (e) {
        e.preventDefault();
        var currentStep = window.location.hash;
        var increment = parseInt(currentStep.replace('#step', '')) + 1;
        var nextStep = '#step' + increment;
        var form = $("#theForm");

        form.validate({
            rules: {
                usdollar: {
                    required: true,
                    minlength: 6,
                },
                radchoices: {
                    required: true,
                },
                location: {
                    required: true,
                }
            },
            messages: {
                location: {
                    required: "Please select your suburb from the drop down list after typing in your postcode.",
                },
            }
        });

        if (form.valid() == true) {

            $(currentStep).hide();
            $(nextStep).show();
            window.location.hash = nextStep;
            updateProgressBar(true, increment - 1);

        }

        if (location.hash) {
            setTimeout(function () {
                window.scrollTo(0, 0);
            }, 1);
        }

    });

    //    $('[data-btn-sub]').on('click', function (event) {
    $('[data-btn-sub]').click(function (e) {
        e.preventDefault();

        var form = $("#theForm");

        form.validate({
            rules: {

                pnumbers: {
                    required: true
                },
            },
            messages: {
                location: {
                    required: "Please select your suburb from the drop down list after typing in your postcode.",
                },
            }
        });

        if (form.valid() == true) {
            $('.modal').hide();
        }

        if (location.hash) {
            setTimeout(function () {
                window.scrollTo(0, 0);
            }, 1);
        }

    });

    $('[data-button-prev]').on('click', function (e) {
        e.preventDefault();

        var currentStep = window.location.hash;
        var decrement = parseInt(currentStep.replace('#step', '')) - 1;
        var prevStep = '#step' + decrement;

        $(currentStep).hide();
        $(prevStep).show();
        window.location.hash = prevStep;
        updateProgressBar(false, decrement);

        if (location.hash) {
            setTimeout(function () {
                window.scrollTo(0, 0);
            }, 1);
        }
    });

    function updateProgressBar(toIncrement, step) {
        var progressBar = $('.progress-bar');
        var progress = 100 / 16;
        var totalProgress = step * progress;

        if (window.location.hash === '#step16') {
            progressBar.css('width', '93.75');
            $('.modal').show();
            $('.stepHero h2:contains("Congratulations, looks like you qualify for some great home loan deals.")').text("Now check your phone.");
            $('.stepHero div p').hide();
            $('.stepHero h2').removeClass('pShow').css('text-align', 'left');
            $('.stepHero').removeClass('pShow2');

        } else if (window.location.hash === '#step17') {
            progressBar.css('width', '100');
            $('.modal').hide();
            $('.stepHero h2:contains("Now check your phone.")').text("Thank you...");
            $('.stepHero div p:contains("Before we can provide your personalised borrowing power report, well need to grab few more details.")').text("Thanks for leaving those details - we may give you a quick ring to ask a few extra questions to provide you with other home loan options that may be relevant to you.");
            $('.stepHero div p').show().addClass('pShows');
            $('.stepHero h2').addClass('pShow');
            $('.stepHero').addClass('pShow2');
            $('.steps').addClass('pShow3');

        } else if (window.location.hash === '#step15') {
            progressBar.css('width', '100');
            $('.modal').hide();
            $('.stepHero h2:contains("Let’s start by calculating how much you need to borrow.")').text("Congratulations, looks like you qualify for some great home loan deals.");
            $('.stepHero div').append("<p>Before we can provide your personalised borrowing power report, well need to grab few more details.</p>");
            $('.stepHero div p').addClass('pShows');
            $('.stepHero h2').addClass('pShow');
            $('.stepHero').addClass('pShow2');
        } else if (window.location.hash === '#step3') {
            $('.stepHero h2:contains("Ok, you want to buy a home or move – that’s exciting.")').text("Let’s start by calculating how much you need to borrow.");
        }

        if (window.location.hash === '#step15' || window.location.hash === '#step17') {
            $('.btnContainer').hide();
        } else {
            if (window.location.hash === '#step16') {
                $('.btnContainer').show();
            }
        }

        console.log(step, progress, totalProgress, (totalProgress - progress));

        if (toIncrement) {
            progressBar.css('width', (totalProgress) + '%');
        } else {
            if (window.location.hash === '#step1') {
                progressBar.css('width', '0');
                $('.stepArea').hide();
                $('.btnContainer').hide();
            } else {
                progressBar.css('width', (totalProgress - progress) + '%');
            }
        }
    }


    $('.pTitle').on("click", function () {
        $(this).siblings('div').animate({
            'height': 'toggle'
        }, 'slow', 'swing');
    });

});


/* Autocomplete Search Bar */
$('#suggestion').autocomplete({
    source: function (request, response) {

        var data = {
            "success": true,
            "data": [{
                "suburb": "Darwin",
                "state": "NT",
                "postcode": 800,
}, {
                "suburb": "Alawa",
                "state": "NT",
                "postcode": 810,
}, {
                "suburb": "Brinkin",
                "state": "NT",
                "postcode": 810,
}, {
                "suburb": "Casuarina",
                "state": "NT",
                "postcode": 810,
}, {
                "suburb": "Coconut Grove",
                "state": "NT",
                "postcode": 810,
}],
            "additional_data": {
                "pagination": {
                    "start": 0,
                    "limit": 5,
                    "more_items_in_collection": true,
                    "next_start": 5
                }
            }
        };

        var datamap = data.data.map(function (i) {
            return {
                label: i.suburb + ' ' + i.state + ' ' + i.postcode,
                value: i.suburb + ' ' + i.state + ' ' + i.postcode,
                desc: i.suburb
            }
        });

        var key = request.term;

        datamap = datamap.filter(function (i) {
            return i.label.toLowerCase().indexOf(key.toLowerCase()) >= 0;
        });

        response(datamap);
    },
    minLength: 1,
    delay: 100
});