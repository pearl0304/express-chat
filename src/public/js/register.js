

$(function(){checkSignForm()})

function checkSignForm(){
    $("#signUpform").on("submit",function(){

        const user_id = $("input[name=user_id]").val().length
        const user_nick = $("input[name=user_nick]").val().length
        const user_pw = $("input[name=user_pw]").val().length
        
        if(user_id == 0){
            alert('Please enter ID you want to use')
            return false
        } 
        if(user_nick == 0){
            alert('Please enter Nickname you want to use')
            return false
        } 
        if(user_pw == 0){
            alert('Please enter Password you want to use')
            return false
        } 
    })
}

