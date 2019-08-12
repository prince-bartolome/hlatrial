// Validations

$.validator.addMethod("ffnumber", function (value, element) {
    return this.optional(element) || /^0(4){1}[0-9]{8}$/.test(value);
}, 'Please enter a phone number');

$.validator.addMethod("address", function (value, element) {
    return this.optional(element) || /^(.+),[\s]*(.+),[\s]*(\d{4})$/.test(value);
}, "Please select your suburb from the drop down list after typing in your postcode.");

$.validator.addMethod("emailss", function (value, element) {
    return this.optional(element) || /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
}, "Please enter a valid email address.");

var errorMsg,
    dynaEMsg = function () {
        return errorMsg;
    }

$.validator.addMethod("ffname", function (value, element) {
    errorMsg = 'Please enter full name';
    var result = true,
        elemval = $.trim(value),
        fullname_test = elemval.split(' '),
        patt = new RegExp(/^[a-zA-Z-' ]+$/),
        firstname = '',
        lastname = '',
        placeholder = $(element).attr('data-placeholder');

    if (fullname_test.length < 2) {
        errorMsg = 'Please enter your first name and last name';
        result = false;
    } else {
        lastname = fullname_test[fullname_test.length - 1];
        for (var i = 0; i < fullname_test.length - 1; i++) {
            if (i > 0) {
                firstname += ' ';
            }
            firstname += fullname_test[i];
        }
        if (firstname.length < 2 || lastname.length < 2) {
            errorMsg = 'Name under 2 characters'
            result = false;
        } else if (firstname == lastname) {
            errorMsg = 'Firstname and lastname identical';
            result = false;
        } else if (!patt.test(elemval)) {
            errorMsg = 'Please enter only alphabets';
            result = false
        }
    }

    return result;

}, dynaEMsg);

$(document).ready(function () {

    $('a[href="#"]').click(function (e) {
        e.preventDefault();
    });

    $('.btnContainer').hide();

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

        sessionStorage.removeItem('noDebt');
        sessionStorage.removeItem('hasPartner');

    });

    $('#step7 [data-button-next]').on('click', function (e) {
        var hasPartner;
        if ($(this).attr('id') === 'radpartnery') {
            hasPartner = true;
        } else {
            hasPartner = false;
        }
        sessionStorage.setItem('hasPartner', hasPartner);
    });
    $('#step12 [data-button-next]').on('click', function (e) {
        var noDebt;

        if ($(this).attr('id') === 'hasDebt') {
            noDebt = true;
        } else {
            noDebt = false
        }
        sessionStorage.setItem('noDebt', noDebt);
    });

    $('[data-button-next]').click(function (e) {
        e.preventDefault();
        var currentStep = window.location.hash;
        var increment = parseInt(currentStep.replace('#step', '')) + 1;
        var nextStep = '#step' + increment;
        var form = $("#theForm");
        var hasPartner = sessionStorage.getItem('hasPartner');
        form.validate({
            rules: {
                usdollar: {
                    required: true,
                    minlength: 7,
                },
                verNum: {
                    digits: true,
                    maxlength: 1,
                    required: true,
                },
                fname: {
                    required: true,
                    ffname: true,
                },
                femail: {
                    required: true,
                    emailss: true,
                },
                fnumber: {
                    required: true,
                    ffnumber: true,
                    maxlength: 10,
                },
                radchoices: {
                    required: true,
                },
                location: {
                    required: true,
                    address: true,
                }
            },
            messages: {
                location: {
                    required: "Please select your suburb from the drop down list after typing in your postcode.",
                },
            }
        });

        if (form.valid() == true) {

            var hasNoDebt = sessionStorage.getItem('noDebt');

            $(currentStep).hide();

            if (hasPartner !== 'true' || hasNoDebt !== 'true') {

                var isNotPartner = $(currentStep).next('.bySteps').attr('data-hide-partner');
                var noDebt = $(currentStep).next('.bySteps').attr('data-hide-debt');

                if (isNotPartner === 'true' && hasPartner !== 'true') {
                    nextStep = '#step' + (parseInt($(currentStep).next('.bySteps').attr('id').replace('step', '')) + 1);
                }

                if (noDebt === 'true') {

                    if (hasPartner === 'true') {
                        nextStep = '#step' + (parseInt($(currentStep).next('.bySteps').attr('id').replace('step', '')) + 1);

                    } else if (hasNoDebt === 'false') {
                        nextStep = '#step' + (parseInt($(currentStep).next('.bySteps').attr('id').replace('step', '')) + 2);
                    }

                }

                $(nextStep).show();
                window.location.hash = nextStep;
                updateProgressBar(true, increment - 1);

            } else {

                $(nextStep).show();
                window.location.hash = nextStep;
                updateProgressBar(true, increment - 1);

            }
        }

        if (location.hash) {
            setTimeout(function () {
                window.scrollTo(0, 0);
            }, 1);
        }

    });


    $('[data-btn-sub]').on('click', function (e) {
        e.preventDefault();
        var form = $("#theForms");
        form.validate({
            rules: {
                fnumber: {
                    required: true,
                    ffnumber: true,
                    maxlength: 10,
                }
            }
        });
        if (form.valid() == true) {
            $('.modal').hide();
            $('body').removeClass('modBody');
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
        var hasPartner = sessionStorage.getItem('hasPartner');
        var hasNoDebt = sessionStorage.getItem('noDebt');
        $(currentStep).hide();

        if (hasPartner !== 'true' || hasNoDebt !== ' true') {

            var isNotPartner = $(currentStep).prev('.bySteps').attr('data-hide-partner');
            var noDebt = $(currentStep).prev('.bySteps').attr('data-hide-debt');

            if (isNotPartner === 'true') {
                prevStep = '#step' + (parseInt($(currentStep).next('.bySteps').attr('id').replace('step', '')) - 3);
            }
            if (noDebt === 'true') {
                if (hasPartner) {
                    prevStep = '#step' + (parseInt($(currentStep).next('.bySteps').attr('id').replace('step', '')) - 3);
                } else {
                    prevStep = '#step' + (parseInt($(currentStep).next('.bySteps').attr('id').replace('step', '')) - 4);
                }
            }

            $(prevStep).show();
            window.location.hash = prevStep;
            updateProgressBar(false, decrement);

        } else {

            $(prevStep).show();
            window.location.hash = prevStep;
            updateProgressBar(false, decrement);

        }

        var oneInputBox = function (elem) {

            var input_index = parseInt(elem.attr('id').split('isms')[1]) + 1,
                input_next = $('#isms' + input_index),
                input_val = elem.val();

            if (input_val.length > 1)
                elem.val(input_val.slice(0, 1))
            if (input_val.length >= 1 && input_index <= 4)
                input_next.focus();

        }

        $('.oneInput').keydown(function (event) {

            oneInputBox($(this));
            var input_index = parseInt($(this).attr('id').split('isms')[1]) - 1,
                key = event.keyCode || event.charCode;

            if ((key == 8 || key == 46) && input_index !== 0) {
                $(this).val('');
                $('#isms' + input_index).focus();
            }

            if (key === 13) {
                $(this).parents('form').find('button').click();
            }

        });

        $('.oneInput').keyup(function () {
            oneInputBox($(this));
        });

        $('.oneInput').focus(function () {
            $(this).val('');
        });

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
        }

        if (window.location.hash === '#step15' || window.location.hash === '#step17') {
            $('.btnContainer').hide();
        } else {
            if (window.location.hash === '#step16') {
                $('.btnContainer').show();
            }
        }

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
        $(this).siblings('div').slideToggle();
    });

    $('.resendBtn').click(function (e) {
        e.preventDefault();
        $('.modal').show();
        $('body').addClass('modBody');

    });

    $('.btnClose').click(function (e) {
        e.preventDefault();
        $('.modal').hide();
        $('body').removeClass('modBody');
    });


});

/* Autocomplete Search Bar */
var dataArr = [];
$.ajax({
    url: "//cdn.alternativemedia.com.au/geodata.json",
    success: data => {
        $.each(data, function (name, val) {
            val[2] = val[2].length < 4 ? '0' + val[2] : val[2];
            dataArr.push("" + val.join(', '));
        });
    }
});

$('#suggestion,#suggestion02').autocomplete({
    source: dataArr
});


$('input.money').keyup(function (event) {
    if (event.which >= 37 && event.which <= 40) return;
    $(this).val(function (index, value) {
        return value
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });
});