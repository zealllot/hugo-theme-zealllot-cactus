var os = function() {
    var ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian;
    return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid : isAndroid,
        isPc : isPc
    };
}();
if(os.isPc){

    //是否显示导航栏
    var showNavBar = true;
    //是否展开导航栏
    var expandNavBar = true;

    $(document).ready(function(){
        var h1s = $("article").find("h1");
        var h2s = $("article").find("h2");
        var h3s = $("article").find("h3");
        var h4s = $("article").find("h4");
        var h5s = $("article").find("h5");
        var h6s = $("article").find("h6");

        var headCounts = [h1s.length, h2s.length, h3s.length, h4s.length, h5s.length, h6s.length];
        var hasH = false
        for(var i = 0; i < headCounts.length; i++){
            if(headCounts[i] > 0){
                hasH=true
            }
        }
        if(!hasH){
            return;
        }

        $("body").prepend('<div class="BlogAnchor">' +
            '<span style="color:red;position:absolute;top:-6px;left:0px;cursor:pointer;" onclick="$(\'.BlogAnchor\').hide();">×</span>' +
            '<p>' +
            '<b id="AnchorContentToggle" title="收起" style="cursor:pointer;">目录▲</b>' +
            '</p>' +
            '<div class="AnchorContent" id="AnchorContent"> </div>' +
            '</div>' );

        var h1Index = 0;
        var h2Index = 0;
        var h3Index = 0;
        var h4Index = 0;
        var h5Index = 0;
        var h6Index = 0;

        $("body").find("h1,h2,h3,h4,h5,h6").each(function(i,item){
            var id = '';
            var tag = $(item).get(0).tagName.toLowerCase();
            var className = '';

            if (tag=="h1"){
                h2Index=0
                h3Index=0
                h4Index=0
                h5Index=0
                h6Index=0
                id=++h1Index+"_"+h2Index+"_"+h3Index+"_"+h4Index+"_"+h5Index+"_"+h6Index
                className = 'item_h1';
            }
            if (tag=="h2"){
                h3Index=0
                h4Index=0
                h5Index=0
                h6Index=0
                id=h1Index+"_"+ ++h2Index+"_" +h3Index+"_"+h4Index+"_"+h5Index+"_"+h6Index
                className = 'item_h2';
            }
            if (tag=="h3"){
                h4Index=0
                h5Index=0
                h6Index=0
                id=h1Index+"_"+h2Index+"_"+ ++h3Index+"_"+h4Index+"_"+h5Index+"_"+h6Index
                className = 'item_h3';
            }
            if (tag=="h4"){
                h5Index=0
                h6Index=0
                id=h1Index+"_"+h2Index+"_"+h3Index+"_"+ ++h4Index+"_"+h5Index+"_"+h6Index
                className = 'item_h4';
            }
            if (tag=="h5"){
                h6Index=0
                id=h1Index+"_"+h2Index+"_"+h3Index+"_"+h4Index+"_"+ ++h5Index+"_"+h6Index
                className = 'item_h5';
            }
            if (tag=="h6"){
                id=h1Index+"_"+h2Index+"_"+h3Index+"_"+h4Index+"_"+h5Index+"_"+ ++h6Index
                className = 'item_h6';
            }
            $(item).attr("id",id);
            $(item).addClass("wow_head");
            $("#AnchorContent").css('max-height', $(window).height()*0.7);
            $("#AnchorContent").append('<li><a class="nav_item '+className+' anchor-link" onclick="return false;" href="#" link="#'+id+'">'+$(this).text()+'</a></li>');
        });

        $("#AnchorContentToggle").click(function(){
            var text = $(this).html();
            if(text=="目录▲"){
                $(this).html("目录▼");
                $(this).attr({"title":"展开"});
            }else{
                $(this).html("目录▲");
                $(this).attr({"title":"收起"});
            }
            $("#AnchorContent").toggle();
        });
        $(".anchor-link").click(function(){
            $("html,body").animate({scrollTop: $($(this).attr("link")).offset().top}, 500);
        });

        var headerNavs = $(".BlogAnchor li .nav_item");
        var headerTops = [];
        $(".wow_head").each(function(i, n){
            headerTops.push($(n).offset().top);
        });
        $(window).scroll(function(){
            var scrollTop = $(window).scrollTop();
            $.each(headerTops, function(i, n){
                var distance = n - scrollTop;
                if(distance >= 0){
                    $(".BlogAnchor li .nav_item.current").removeClass('current');
                    $(headerNavs[i]).addClass('current');
                    return false;
                }
            });
        });

        if(!showNavBar){
            $('.BlogAnchor').hide();
        }
        if(!expandNavBar){
            $(this).html("目录▼");
            $(this).attr({"title":"展开"});
            $("#AnchorContent").hide();
        }
    });
}