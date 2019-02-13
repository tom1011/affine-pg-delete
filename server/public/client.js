$(document).ready(onready);

function onready() {
    $('#submitButton').on('click', submintButton);
    $('#tableDisplayResturant').on('click','.deleteButton', deleteButton);
    updateTableDisplay();
}

function deleteButton(){
    $(this).closest('tr').fadeOut();
}

function submintButton(){
    let namer = $('#nameRestaurant').val();
    let typer = $('#typeRestaurant').val();
    $.ajax({
        method: 'POST',
        url: '/restaurant',
        data: {
            name: namer,

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
            $('#tableDisplayResturant').append(`
            <tr class = "tdrow">
                <td>${response[i].name}</td>
                <td>${response[i].type}</td>
                <td><button class="deleteButton" >Delete</button></td>
            </tr>
            `)
        }    
    })
}