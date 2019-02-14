$(document).ready(onready);

function onready() {
    $('#submitButton').on('click', submintButton);
    $('#tableDisplayResturant').on('click','.deleteButton', deleteButton);
    $('#tableDisplayResturant').on('click','.saveButton', saveButton);
    //decendent selector.
    updateTableDisplay();
}

function saveButton(){
    //console.log('Save button was hit');
    //console.log($(this).data().id);
    $.ajax({
        method: "PUT",
        url: '/restaurant/' + $(this).data().id,

    }).then(updateTableDisplay)
}

//ajax delete
function deleteButton(){
    //data() is a part of jquery so its a method(funciton)
    //console.log($(this).data().id);
    $.ajax({
        method: "DELETE",
        url: '/restaurant/' + $(this).data().id
        // this is how jquery dose it
    }).then(updateTableDisplay)
}//end delte

//ajax/Http - crud - sql
// POST     Create insert
// GET       read  select
//Put       UPdate update
//Delete    delete delete

function submintButton(){
    let ratingr = $('#ratingNumber').val();
    let namer = $('#nameRestaurant').val();
    let typer = $('#typeRestaurant').val();
    $.ajax({
        method: 'POST',
        url: '/restaurant',
        data: {
            name: namer,
            rating: ratingr,
            type: typer
        }
    }).then(updateTableDisplay)
}

function updateTableDisplay(){
    $('#tableDisplayResturant').empty();
    $.ajax({
        method: 'GET',
        url: '/restaurant'
    }).then(function (response) {
        for (let i = 0; i<response.length; i++){
            // for each 
            // response.forEach(function(resturante))
            //replaces line 47.
            //will have to rename rsponse to resturante.
            $('#tableDisplayResturant').append(`
            <tr class = "tdrow">
                <td>${response[i].name}</td>
                <td>${response[i].type}</td>
                <td>${response[i].rating}</td>
                <td><button class="saveButton" data-id = "${response[i].id}">Save</button></td>
                <td><button class="deleteButton" data-id = "${response[i].id}">Delete</button></td>
            </tr>
            `)
        } 
        $('#ratingNumber').val('');
    $('#nameRestaurant').val('');
    $('#typeRestaurant').val('');   
    })
}