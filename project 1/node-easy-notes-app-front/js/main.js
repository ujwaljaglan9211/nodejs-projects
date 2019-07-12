$(document).ready(() => {
    $('#showUsers').show();
    $('#create-user').hide();
    $('#getAllUsers').click(() => {
        $('#create-user').hide();
        $('#showUsers').show();
        $.ajax({
            url: 'http://localhost:3000/users/',
            type: 'GET',
            dataType: 'json',

            success: (data) => {
                var user_table_body = '';
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    if (item.status === false) {
                        var status_now = 'Inactive';
                    } else {
                        var status_now = 'Active';
                    }
                    date = new Date(item.dateOfBirth);
                    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ];
                    var monthName = monthNames[date.getMonth() + 1];
                    userDateOfBirth = date.getDate() + ' ' + monthName + ',' + date.getFullYear(); //prints expected format.
                    user_table_body += `<tr id="${item._id}">
                            <td>${item.firstName} ${item.lastName}</td>
                            <td>${item.email}</td>
                            <td>${item.phone}</td>            
                            <td>${userDateOfBirth}</td>
                            <td>${item.address}</td>           
                            <td>${status_now}</td>
                          </tr>`
                }
                $("#user_info_body").empty().append(user_table_body);
            }
        });
    });

    $('#createUser').click(() => {
        $('#showUsers').hide();
        $('#create-user').show();
        $('#delete-user').hide();
        // Attach a submit handler to the form
        $("#createUserForm").submit(function(event) {

            // Stop form from submitting normally
            event.preventDefault();
            var createUserFormData = $("#createUserForm").serializeArray();
            var createUserFormDataArray = {};
            for (var i = 0; i < createUserFormData.length - 1; i++) {
                createUserFormDataArray[createUserFormData[i].name] = createUserFormData[i].value;
            }

            $.ajax({
                url: 'http://localhost:3000/users/',
                type: 'POST',
                dataType: 'json',
                data: createUserFormDataArray,
                success: (data) => {
                    $(' #responseMessage').html('User added successfully..!!');
                    $(' #responseMessage').css({
                        "color": "#008000"
                    });
                    setTimeout(fade_out, 3000);

                    function fade_out() {
                        $("#responseMessage").empty();
                        $.ajax({
                            url: 'http://localhost:3000/users/',
                            type: 'GET',
                            dataType: 'json',

                            success: (data) => {
                                var user_table_body = '';
                                for (var i = 0; i < data.length; i++) {
                                    var item = data[i];
                                    if (item.status === false) {
                                        var status_now = 'Inactive';
                                    } else {
                                        var status_now = 'Active';
                                    }
                                    date = new Date(item.dateOfBirth);
                                    const monthNames = ["January", "February", "March", "April", "May", "June",
                                        "July", "August", "September", "October", "November", "December"
                                    ];
                                    var monthName = monthNames[date.getMonth() + 1];
                                    userDateOfBirth = date.getDate() + ' ' + monthName + ',' + date.getFullYear(); //prints expected format.
                                    user_table_body += `<tr id="${item._id}">
                                                <td>${item.firstName} ${item.lastName}</td>
                                                <td>${item.email}</td>
                                                <td>${item.phone}</td>            
                                                <td>${userDateOfBirth}</td>
                                                <td>${item.address}</td>           
                                                <td>${status_now}</td>
                                              </tr>`
                                }
                                $("#user_info_body").empty().append(user_table_body);
                            }
                        });
                        $('#showUsers').show();
                        $('#create-user').hide();
                    }
                    $('#createUserForm').each(function() {
                        this.reset();
                    });
                }
            });
        });
    });
});

$(document).ready(function() {
    $(document).on("click", ".table-hover tbody tr", function() {
        
        $('#delete-user').show();
        //some think
        var bid = this.id; // table row ID 
        $.ajax({
            url: 'http://localhost:3000/users/' + bid,
            type: 'GET',
            dataType: 'json',

            success: (data) => {
                $('#showUsers').hide();
                $('#create-user').show();
                $('#firstName').val(data.firstName);
                $('#lastName').val(data.lastName);
                $('#email').val(data.email);
                $('#phone').val(data.phone);
                date = new Date(data.dateOfBirth);
                const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];
                var monthName = monthNames[date.getMonth() + 1];
                userDateOfBirth = date.getDate() + ' ' + monthName + ',' + date.getFullYear(); //prints expected format.
                $('#dateOfBirth').val(userDateOfBirth);
                $('#address').val(data.address);
                var userUpdateId = data._id;

                //delete user 
                $("#deleteUserForm").submit(function(event) {
                    // Stop form from submitting normally
                    event.preventDefault();
                    $.ajax({
                        url: 'http://localhost:3000/users/' + userUpdateId,
                        type: 'DELETE',
                        dataType: 'json',
                        success: (data) => {
                            $(' #responseMessage').html('User deleted successfully..!!');
                            $(' #responseMessage').css({
                                "color": "#008000"
                            });
                            setTimeout(fade_out, 3000);

                            function fade_out() {
                                $("#responseMessage").empty();
                                $.ajax({
                                    url: 'http://localhost:3000/users/',
                                    type: 'GET',
                                    dataType: 'json',

                                    success: (data) => {
                                        var user_table_body = '';
                                        for (var i = 0; i < data.length; i++) {
                                            var item = data[i];
                                            if (item.status === false) {
                                                var status_now = 'Inactive';
                                            } else {
                                                var status_now = 'Active';
                                            }
                                            date = new Date(item.dateOfBirth);
                                            const monthNames = ["January", "February", "March", "April", "May", "June",
                                                "July", "August", "September", "October", "November", "December"
                                            ];
                                            var monthName = monthNames[date.getMonth() + 1];
                                            userDateOfBirth = date.getDate() + ' ' + monthName + ',' + date.getFullYear(); //prints expected format.
                                            user_table_body += `<tr id="${item._id}">
                                                <td>${item.firstName} ${item.lastName}</td>
                                                <td>${item.email}</td>
                                                <td>${item.phone}</td>            
                                                <td>${userDateOfBirth}</td>
                                                <td>${item.address}</td>           
                                                <td>${status_now}</td>
                                              </tr>`
                                        }
                                        $("#user_info_body").empty().append(user_table_body);
                                    }
                                });
                                $('#showUsers').show();
                                $('#create-user').hide();
                            }
                            $('#createUserForm').each(function() {
                                this.reset();
                            });
                        }
                    });
                });


                //update user
                $("#createUserForm").submit(function(event) {

                    // Stop form from submitting normally
                    event.preventDefault();
                    var createUserFormData = $("#createUserForm").serializeArray();
                    var createUserFormDataArray = {};
                    for (var i = 0; i < createUserFormData.length - 1; i++) {
                        createUserFormDataArray[createUserFormData[i].name] = createUserFormData[i].value;
                    }

                    $.ajax({
                        url: 'http://localhost:3000/users/' + userUpdateId,
                        type: 'PUT',
                        dataType: 'json',
                        data: createUserFormDataArray,
                        success: (data) => {
                            $(' #responseMessage').html('User updated successfully..!!');
                            $(' #responseMessage').css({
                                "color": "#008000"
                            });
                            setTimeout(fade_out, 3000);

                            function fade_out() {
                                $("#responseMessage").empty();
                                $.ajax({
                                    url: 'http://localhost:3000/users/',
                                    type: 'GET',
                                    dataType: 'json',

                                    success: (data) => {
                                        var user_table_body = '';
                                        for (var i = 0; i < data.length; i++) {
                                            var item = data[i];
                                            if (item.status === false) {
                                                var status_now = 'Inactive';
                                            } else {
                                                var status_now = 'Active';
                                            }
                                            date = new Date(item.dateOfBirth);
                                            const monthNames = ["January", "February", "March", "April", "May", "June",
                                                "July", "August", "September", "October", "November", "December"
                                            ];
                                            var monthName = monthNames[date.getMonth() + 1];
                                            userDateOfBirth = date.getDate() + ' ' + monthName + ',' + date.getFullYear(); //prints expected format.
                                            user_table_body += `<tr id="${item._id}">
                                                <td>${item.firstName} ${item.lastName}</td>
                                                <td>${item.email}</td>
                                                <td>${item.phone}</td>            
                                                <td>${userDateOfBirth}</td>
                                                <td>${item.address}</td>           
                                                <td>${status_now}</td>
                                              </tr>`
                                        }
                                        $("#user_info_body").empty().append(user_table_body);
                                    }
                                });
                                $('#showUsers').show();
                                $('#create-user').hide();
                            }
                            $('#createUserForm').each(function() {
                                this.reset();
                            });
                        }
                    });
                });
            }
        });
    });
});