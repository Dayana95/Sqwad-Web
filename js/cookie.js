function popbox3() {
    $('#welcome').toggle();
}



$(function() {

    function GetCookie(name) {
        var arg=name+"=";
        var alen=arg.length;
        var clen=document.cookie.length;
        var i=0;

        while (i<clen) {
            var j=i+alen;
                if (document.cookie.substring(i,j)==arg)
                    return "true";
                i=document.cookie.indexOf(" ",i)+1;
                if (i==0) 
                    break;
        }

        return null;
    }


    var visit=GetCookie("HERO");

    if (visit==null){
        popbox3();
    }
    var expire=new Date();
    expire=new Date(expire.getTime()+7776000000);
    document.cookie="HERO=true; expires="+expire;


    setTimeout(function() {
    $('#root').fadeOut('fast');
}, 10000);
});