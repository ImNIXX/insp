$(document).ready(function(){
	$("#nav-toggle").click(function(){
		if($(window).width() >= 1200){
			if($("#nav-toggle").text() == 'Collapse'){
				$("#nav-container").css("width","7%");
				$("#nav-container").css("transition" , "0.5s");
				$(".main-content-nav-list-icons").toggle();
				$("ul.main-content-nav-list li .main-content-nav-list-anchor-text").toggle();
				$("#nav-toggle").text(">");

				$("#main-container").css("width","87%");
				$("#main-container").css("transition" , "0.5s");
			}
			else{
				$("#nav-container").css("width","18%");
				$("#nav-container").css("transition" , "0.5s");
				$(".main-content-nav-list-icons").toggle();
				$("ul.main-content-nav-list li .main-content-nav-list-anchor-text").toggle();
				$("#nav-toggle").text("Collapse");

				$("#main-container").css("width","76%");
				$("#main-container").css("transition" , "0.5s");
			}
		}
		else{
			if($("#nav-toggle").text() == 'Collapse'){
				$("#nav-container").css("width","9%");
				$("#nav-container").css("transition" , "0.5s");
				$(".main-content-nav-list-icons").toggle();
				$("ul.main-content-nav-list li .main-content-nav-list-anchor-text").toggle();
				$("#nav-toggle").text(">");

				$("#main-container").css("width","87%");
				$("#main-container").css("transition" , "0.5s");
			}
			else{
				$("#nav-container").css("width","18%");
				$("#nav-container").css("transition" , "0.5s");
				$(".main-content-nav-list-icons").toggle();
				$("ul.main-content-nav-list li .main-content-nav-list-anchor-text").toggle();
				$("#nav-toggle").text("Collapse");

				$("#main-container").css("width","76%");
				$("#main-container").css("transition" , "0.5s");
			}
		}
	});
});

$('body').on('click','.safe-tab-btn',function(){
	var class_name = $(this).data('name');
	$('.common_tab').addClass('dis_none');
	$('.'+class_name).removeClass('dis_none');
})

// SIGNUP FORM

$('#sign_up_form').validate({
    rules: {
        name:{
            required: true,
        },
        username:{
            required: true,
        },
        email:{
            required: true,
            email: true,
        },
        password:{
            required: true,
            minlength: 8,
        },
        cpassword:{
            equalTo: "#reg_pass",
        },
        zipcode:{
            required: true,
        },
    },
    focusInvalid: false,
    invalidHandler: function(form, validator) {
        if (!validator.numberOfInvalids())
            return;
        $('html, body').animate({
            scrollTop: $(validator.errorList[0].element).offset().top
        }, 1000);
    },
    submitHandler: function(form){
        var username = $('input[name="username"]').val();
        var url_ = $('input[name="username"]').data('url');
        var csrfmiddlewaretoken = $('input[name="csrfmiddlewaretoken"]').val();
        $.ajax({
            type: 'POST',
            url: url_,
            data: {username:username, csrfmiddlewaretoken:csrfmiddlewaretoken},
            success: function(response){
                if(response == 'exist'){
                    $('.username_exist').remove();
                    $('#reg_username').after('<p class="error username_exist">Username already exist</p>')
                    $('html, body').animate({
                        scrollTop: $('.username_exist').offset().top - 50
                    }, 1000);
                }else if(response == 'not exist'){
                    form.submit();
                }
            }
        })
    },
})

// LOGIN FORM

$('#login_form').validate({
    rules: {
        username:{
            required: true,
        },
        password:{
            required: true,
        },
    },
    submitHandler: function(form){
        form.submit();
    },
})


// INSPECTION DATA INSERTION AND VALIDATIONS

$('#inspection_form').validate({
    rules: {
        inspection_title:{
            required: true,
        },
        facility:{
            required: true,
        },
        stakeholders:{
            required: true,
        },
        inspection_type:{
            required: true,
        },
        location:{
            required: true,
        },
        category:{
            required: true,
        },
        operating_area:{
            required: true,
        },
        supervisor:{
            required: true,
        },
    },
    focusInvalid: false,
    invalidHandler: function(form, validator) {
        if (!validator.numberOfInvalids())
            return;
        $('html, body').animate({
            scrollTop: $(validator.errorList[0].element).offset().top
        }, 1000);

    },
    submitHandler: function(form){
        var ins_insert_url = $('#inspection_form').data('url');
        var csrfmiddlewaretoken =  $('#inspection_form input[name="csrfmiddlewaretoken"]').val();
        var inspection_title = $('#inspection_form input[name="inspection_title"]').val();
        var facility = $('#inspection_form select[name="facility"]').val();
        var stakeholders = $('#inspection_form input[name="stakeholders"]').val();
        var inspection_type = $('#inspection_form select[name="inspection_type"]').val();
        var location = $('#inspection_form input[name="location"]').val();
        var category = $('#inspection_form select[name="category"]').val();
        var operating_area = $('#inspection_form input[name="operating_area"]').val();
        var supervisor = $('#inspection_form select[name="supervisor"]').val();
        $.ajax({
            type: 'POST',
            url: ins_insert_url,
            data: {inspection_title:inspection_title,facility:facility,stakeholders:stakeholders,inspection_type:inspection_type,location:location,category:category,operating_area:operating_area,supervisor:supervisor ,csrfmiddlewaretoken:csrfmiddlewaretoken},
            success: function(response){
                if(response){
                    $('.inspection_submit').after('<p class="text-success w-100 inspection-success">Inspection added successfully</p>');
                    setTimeout(function(){
                        $('.inspection-success').fadeOut('slow',function(){
                            $(this).remove();
                        });
                    }, 10000)
                    var draft_id = response.inspection_type;
                    var inspection_id = response.id;
                    var insp_id = (inspection_id*9304);
                    var new_date = $.datepicker.formatDate('dd-M-yy', new Date(response.date));
                    $('#ins_draft_tbl').append('<tr class="ins_draft_'+insp_id+'"><td>'+new_date+'</td><td><a class="ins_draft_title">'+response.inspection_name+'</a></td><td class="draft_name"></td></tr>').after('<tr><td colspan="3" class="p-0"><div style="display:none" class="add-inspection upd_ins_'+insp_id+'"></div></td></tr>');
                    var ins_action_length = $('#ins_action_tbl tr').length + 1;
                    $('#ins_action_tbl').append('<tr class="ins_action_'+insp_id+'"><td>'+ins_action_length+' </td><td>'+response.inspection_name+'</td><td class="draft_name"></td><td></td><td></td><td><i class="fa fa-trash ins_delete"></i></td><td>Not Approved</td></tr>');
                    $('#ins_report_tbl').append('<tr class="ins_report_'+insp_id+'"><td>'+response.inspection_name+'</td><td>'+new_date+'</td><td>'+response.location+'</td><td class="draft_name"></td><td>Click Here</td></tr>');
                    var draft_url = 'asd';
                    $.ajax({
                        type: 'POST',
                        url : 'inspection-draft/',
                        data: {draft_id:draft_id, csrfmiddlewaretoken:csrfmiddlewaretoken},
                        success: function(response){
                            if(response){
                                $('.modal-body').prepend(response.draft_html);
                                $('.draft-save-btn').attr('data-id',insp_id);
                                $('.draft-save-btn').attr('data-name',response.draft_slug);
                                $('.draft-save-btn').attr('data-draftname',response.draft_name);
                                $('#exampleModalCenter').css('display','block');
                                $('#exampleModalCenter').addClass('show');
                            }
                        }
                    })
                }else{
                    $('.inspection_submit').after('<p class="text-danger w-100 inspection-error">Error while inserting the Inspection</p>');
                    setTimeout(function(){
                        $('.inspection-error').fadeOut('slow',function(){
                            $(this).remove();
                        });
                    }, 10000)
                }
            }
        })
    }
})

// DRAFT SAVE

$('body').on('click','.draft-save-btn',function(){
    $("input").each(function(){
        $(this).attr("value", $(this).val());
	    var $input = $( this );
	    if($input.prop("checked"))
	    {
	    	this.setAttribute("checked", "checked");
	    }
	});
	$("textarea").each(function(){
		$(this).text($(this).val());
	});
	var draft_html = $('.modal-body').html();
	var inspection_id = $(this).data('id');
	var inspection_type = $(this).data('name');
	var draftname = $(this).data('draftname');
	var csrfmiddlewaretoken =  $('input[name="csrfmiddlewaretoken"]').val();
	$.ajax({
	    type: 'POST',
	    url: 'insert-draft/',
	    data: {inspection_id:inspection_id, draft_html:draft_html, csrfmiddlewaretoken:csrfmiddlewaretoken, inspection_type: inspection_type, draftname: draftname},
	    success: function(response){
	        if(response){
	            $('#exampleModalCenter').css('display','none');
                $('#exampleModalCenter').removeClass('show');
                alert('draft added successfully');
                $('.modal-body').html('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary draft-save-btn" data-id="">Save changes</button>');
                $('#ins_draft_tbl .ins_draft_'+inspection_id+' .draft_name').append(draftname);
                $('#ins_action_tbl .ins_action_'+inspection_id+' .draft_name').append(draftname);
                $('#ins_report_tbl .ins_report_'+inspection_id+' .draft_name').append(draftname);
	        }
	    }
	})
})

// UPDATE INSPECTION FORM

$('body').on('click','#update_insp_form button',function(){
    $('#update_insp_form').validate({
        rules: {
            inspection_title:{
                required: true,
            },
            facility:{
                required: true,
            },
            stakeholders:{
                required: true,
            },
            inspection_type:{
                required: true,
            },
            location:{
                required: true,
            },
            category:{
                required: true,
            },
            operating_area:{
                required: true,
            },
            supervisor:{
                required: true,
            },
        },
        submitHandler: function(form){
            var insp_data =  $('#update_insp_form').serialize();
            var csrfmiddlewaretoken =  $('input[name="csrfmiddlewaretoken"]').val();
            var inspection_id = $('#update_insp_form').data('id');
            var inspection_title = $('#update_insp_form input[name="inspection_title"]').val();
            var facility = $('#update_insp_form select[name="facility"]').val();
            var stakeholders = $('#update_insp_form input[name="stakeholders"]').val();
            var inspection_type = $('#update_insp_form select[name="inspection_type"]').val();
            var location = $('#update_insp_form input[name="location"]').val();
            var category = $('#update_insp_form select[name="category"]').val();
            var operating_area = $('#update_insp_form input[name="operating_area"]').val();
            var supervisor = $('#update_insp_form select[name="supervisor"]').val();
            $.ajax({
                type: 'POST',
                url: 'update-inspection/',
                data: {inspection_id:inspection_id,inspection_title:inspection_title,facility:facility,stakeholders:stakeholders,inspection_type:inspection_type,location:location,category:category,operating_area:operating_area,supervisor:supervisor ,csrfmiddlewaretoken:csrfmiddlewaretoken},
                context: this,
                success: function(response){
                    if(response != ''){
                        var insp_id = response.id*9304;
                        $('.ins_draft_'+insp_id).find('.ins_draft_title').html(response.inspection_title);
                        $('.ins_action_'+insp_id).find('.insp_title').html(response.inspection_title);
                        $('.ins_report_'+insp_id).find('.insp_title').html(response.inspection_title);
                        $('.ins_report_'+insp_id).find('.insp_location').html(response.location);
                        if(response.insp_type_status == 1){
                            $.ajax({
                                type: 'POST',
                                url: 'inspection-draft/',
                                data: {draft_id:response.inspection_type, csrfmiddlewaretoken:csrfmiddlewaretoken},
                                success: function(response){
                                    if(response){
                                        $('.modal-body').prepend(response.draft_html);
                                        $('.draft-save-btn').attr('data-id',insp_id);
                                        $('.draft-save-btn').attr('data-name',response.draft_slug);
                                        $('.draft-save-btn').attr('data-draftname',response.draft_name);
                                        $('#exampleModalCenter').css('display','block');
                                        $('#exampleModalCenter').addClass('show');
                                    }
                                }
                            })
                        }
                    }
                }
            })
        }
    });
})


$('body').on('click','.ins_draft_title',function(){
    var ins_html = $('.inspection-add-block').html();
    var txt = $(this).parent().parent().attr('class');
    var numb = txt.match(/\d/g);
    insp_id = numb.join("");
    var csrfmiddlewaretoken =  $('input[name="csrfmiddlewaretoken"]').val();
    $.ajax({
        type: 'POST',
        url: 'get-inspection/',
        data: {csrfmiddlewaretoken: csrfmiddlewaretoken, inspection_id: insp_id},
        context: this,
        success: function(response){
            if(response){
                $('.add-inspection').html('');
                response = Object.entries(response);
                var this_response = response;
                var upd_ins_path_
                $('.upd_ins_'+insp_id).html(ins_html);
                $('.upd_ins_'+insp_id+' label.error').remove();
                $('.upd_ins_'+insp_id).find(':submit').html('Update');
                $('.upd_ins_'+insp_id).find(':reset').remove();
                $('.upd_ins_'+insp_id).find('#inspection_form').attr({'id':'update_insp_form', 'data-id': insp_id});
                var supervisor_html = $('.upd_ins_'+insp_id).find('select.supervisor').html();
                $('.upd_ins_'+insp_id).find('.inspection_submit').prev().html('<label>Select Supervisor</label><select name="supervisor" class="supervisor">'+supervisor_html+'</select>');
                $('.supervisor').select2();
                $.each(response, function(index){
                    var this_ = $(this);
                    $('.upd_ins_'+insp_id).find('input[name="'+this_[0]+'"], select[name="'+this_[0]+'"]').val(this_[1]);
                });
                $('.upd_ins_'+insp_id).find('select[name="category"]').attr('disabled','disabled');
                $('.upd_ins_'+insp_id).find('h2').html('Update Inspection');
                $('.add-inspection').slideUp();
                if($('.upd_ins_'+insp_id).css('display') == 'block'){
                }else{
                    $('.upd_ins_'+insp_id).slideDown();
                }
            }
        }
    });
});


// DELETE INSPECTION

$('body').on('click','.ins_delete',function(){
    var insp_id = $(this).parent().parent().attr('class');
    var numb = insp_id.match(/\d/g);
    insp_id = numb.join("");
    var csrfmiddlewaretoken =  $('input[name="csrfmiddlewaretoken"]').val();
    if(confirm('Are you sure')){
        $.ajax({
            type: 'POST',
            url: 'del-insp/',
            data: {csrfmiddlewaretoken: csrfmiddlewaretoken, inspection_id: insp_id},
            context: this,
            success: function(response){
                if(response == 1){
                    $('.ins_action_'+insp_id).remove();
                    $('.ins_draft_'+insp_id).next().remove();
                    $('.ins_draft_'+insp_id).remove();
                    $('.ins_report_'+insp_id).remove();
                }
            }
        })
    }
})


// SELECT OPTION

$('.supervisor').select2({
    placeholder: "Select Supervisor",
    allowClear: true
})