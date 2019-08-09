//    $.validator.addMethod("ffname", function(value, element) {
//  return this.optional(element) || /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value);
//}, 'Please enter a valid name');

$.validator.addMethod("ffnumber", function (value, element) {
    return this.optional(element) || /^0(4){1}[0-9]{8}$/.test(value);
}, 'Please enter a phone number');

$.validator.addMethod("numbs", function (value, element) {
    return this.optional(element) || /^0(4){1}[0-9]{8}$/.test(value);
}, 'Please enter a phone number');

$.validator.addMethod("address", function (value, element) {
    return this.optional(element) || /^(.+),[\s]*(.+),[\s]*(\d{4})$/.test(value);
}, "Please select your suburb from the drop down list after typing in your postcode.");

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

        //        sessionStorage.removeItem('hasDebt');
        //        sessionStorage.removeItem('hasPartner');

    });



    //    $('[data-button-next]').on('click', function (e) {
    $('[data-button-next]').click(function (e) {
        e.preventDefault();
        var currentStep = window.location.hash;
        var increment = parseInt(currentStep.replace('#step', '')) + 1;
        var nextStep = '#step' + increment;
        var form = $("#theForm");
        var hasPartner = sessionStorage.getItem('hasPartner');
        console.log(nextStep);
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
                fnumber: {
                    required: true,
                    ffnumber: true,
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

            //            if ( $('#step' + (currentStep + 1)).attr('data-hide-partner') && !hasPartner  ) {
            //
            //                nextStep = '#step' + (increment + 1);
            //                console.log('without partner: ', nextStep);
            //                $(currentStep).hide();
            //                $(nextStep).show();
            //                window.location.hash = nextStep;
            //                updateProgressBar(true, increment - 1);
            //                
            //            } else {
            //                $(currentStep).hide();
            //                $(nextStep).show();
            //                window.location.hash = nextStep;
            //                updateProgressBar(true, increment - 1);
            //            }
            //             $(currentStep).hide();
            //            if ( !hasPartner ){
            //                if (typeof $('#step' + (increment+1)).data('hide-partner') !== undefined  ) {
            //                        nextStep = '#' + $('#step' + (increment+1)).next().attr('id');
            //                     $(nextStep).show();
            //                    window.location.hash = nextStep;
            //                    updateProgressBar(true, increment - 1);
            //                    } else {
            //                          $(nextStep).show();
            //                    window.location.hash = nextStep;
            //                    updateProgressBar(true, increment - 1);
            //                    }
            //            } else {
            //                  $(nextStep).show();
            //                    window.location.hash = nextStep;
            //                    updateProgressBar(true, increment - 1);
            //            }



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




    //    $('#step7 [data-button-next]').on('click', function(e) {
    //        var hasPartner;
    //        if ( $(this).attr('id') === 'radpartnery' ) {
    //            hasPartner = true;
    //        }        
    //        sessionStorage.setItem('hasPartner', hasPartner);
    //    });
    //    
    //     $('#step12 [data-button-next]').on('click', function(e) {
    //        var hasDebt;
    //         
    //        if ( $(this).attr('id') === 'hasDebt' ) {
    //            hasPartner = true;
    //        }
    //        sessionStorage.setItem('hasDebt', hasPartner);
    //    });


    var onelength = function (elem) {

        var input_index = parseInt(elem.attr('id').split('inputsms')[1]) + 1,
            input_next = $('#inputsms' + input_index),
            input_val = elem.val();

        if (input_val.length > 1)
            elem.val(input_val.slice(0, 1))

        if (input_val.length >= 1 && input_index <= 4)
            input_next.focus();

    }

    $('.oneleng').keydown(function (event) {
        onelength($(this));

        var input_index = parseInt($(this).attr('id').split('inputsms')[1]) - 1,
            key = event.keyCode || event.charCode;

        if ((key == 8 || key == 46) && input_index !== 0) {
            $(this).val('');
            $('#inputsms' + input_index).focus();
        }

        if (key === 13) {
            $(this).parents('form').find('button').click();
        }
    });

    $('.oneleng').keyup(function () {
        onelength($(this));
    });

    $('.oneleng').focus(function () {
        $(this).val('');
    });

    //    $('[data-btn-sub]').on('click', function (event) {
    $('[data-btn-sub]').click(function (e) {
        e.preventDefault();

        var form = $("#theForm");

        form.validate({
            rules: {

                pnumbers: {
                    required: true,
                    numbs: true,
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
        //        var hasPartner = sessionStorage.getItem('hasPartner');
        //        var hasDebt = sessionStorage.getItem('hasDebt');
        //        var noPartnerSteps = $('[data-hide-partner]').length;
        //        var noDebtSteps = $('[data-hide-partner]').length;
        var progressBar = $('.progress-bar');
        //        var numSteps = 16;
        //        if (!hasPartner) {
        //            numSteps - noPartnerSteps;
        //        } else if (!hasDebt) {
        //               numSteps - noDebtSteps;     
        //        }
        var progress = 100 / 16;
        var totalProgress = step * progress;

        if (window.location.hash === '#step16') {
            progressBar.css('width', '93.75');
            //            $('.modal').show();
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



    $('.resendBtn').click(function (e) {
        e.preventDefault();
        $('.modal').show();
    });

    $('.btnClose').click(function (e) {
        e.preventDefault();
        $('.modal').hide();
    });


});


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


/* Autocomplete Search Bar */
$('#suggestion').autocomplete({
    source: dataArr
});


//$.getJSON("//cdn.alternativemedia.com.au/geodata.json", function(d) {
//		$.each(d, function(name, val) {
//			val[2] = val[2].length < 4 ? '0' + val[2] : val[2];
//			arr.push("" + val.join(', '));
//		});
//		$('#suggestion').autoComplete({
//			minChars: 1,
//			source: function(term, suggest) {
//				term = term.toLowerCase();
//				var choices = arr;
//				var matches = [];
//				for (var i = 0; i < choices.length; i++) {
//					if (choices[i].toLowerCase().indexOf(term) > -1)
//						matches.push(choices[i]);
//				}
//				suggest(matches);
//			},
//			onSelect: function(e, term, item) {
//				$(this).focus();
//				$('.autocomplete-suggestions').hide();
//
//			},
//			cache: false
//		});
//	});

$('input.money').keyup(function (event) {

    // skip for arrow keys
    if (event.which >= 37 && event.which <= 40) return;

    // format number
    $(this).val(function (index, value) {
        return value
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });
});