$(function(){
    validation()
    checkSignForm()
})

function validation(){
    const pattern_spc = /[~!@#$%^&*()+|<>?:{}]/; 
    const pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    $("input[name=user_id]").keyup(()=>{
        const user_id = $("input[name=user_id]").val()
        if(pattern_spc.test(user_id)){alert('Special characters cannot be used'); return false}
        if(pattern_kor.test(user_id)){alert('Please enter your ID in English'); return false}
    })
}

function checkSignForm(){
    $("#signUpform").on("submit",function(){

        const user_id = $("input[name=user_id]").val()
        const user_nick = $("input[name=user_nick]").val()
        const user_pw = $("input[name=user_pw]").val()

        if(user_id == ''){
            alert('Please enter ID you want to use')
            return false
        } 
        if(user_nick == ''){
            alert('Please enter Nickname you want to use')
            return false
        } 

        if(user_pw == ''){
            alert('Please enter Password you want to use')
            return false
        } 
    })
}
    


