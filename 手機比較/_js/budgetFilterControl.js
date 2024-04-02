$(document).ready(function() {
    let isEnter = 0;
    let budgetValue;
    let phoneImg = "";
    let phoneName = "";
    let phonePrice = "";
    let $cardStructure = '';

    $("#budget_btn").click(function() {
        isEnter = 0;
        $("#adv_filter_reset").fadeOut("fast");

        budgetValue = parseInt($("#budgetEnter").val());
        
        // 用預算來篩選手機
        if( budgetValue == "" ) {
            alert("請輸入預算");
        } else if (budgetValue == 0 ) {
            alert("預算不可等於零");
        } else {
            isEnter += 1;

            $("#phoneOverview").empty();

            while (budgetList.length) {
                budgetList.pop();
            }

            while (budgetList_temp.length) {
                budgetList_temp.pop();
            }
            
            // Filtering Apple product
            for(var i=0; i<phoneDetail.length; i++) {
                if(phoneDetail[i].price <= budgetValue && phoneDetail[i].price != 0) {
                    phoneImg = phoneDetail[i].img;
                    phoneName = phoneDetail[i].name;
                    phonePrice = phoneDetail[i].price;
                    $cardStructure = '<div class="card"><img src="' + phoneImg + '"><div class="phoneInfo"><p class="model-name">' + phoneName + '</p><p class="phone-price">NT$ ' + phonePrice + '</p></div><div class="moreInfo">詳細規格</div></div>';
                    $("#phoneOverview").append($cardStructure);
                    budgetList.push(phoneDetail[i]);
                } else {
                    continue;
                }
            }

            // 如果 budgetList_temp 沒內容才 push，否則輸入一次以上的預算會有資料重複問題
            if (budgetList_temp.length == 0) {
                for (var i = 0; i<budgetList.length; i++) {
                    budgetList_temp.push(budgetList[i]);
                }
            }
        }
    });

    $(document).on('click', '.moreInfo', function(){
        $("html").css("overflow", "hidden");
        $("#phoneContent").fadeIn("fast");

        var index = $(".moreInfo").index(this);
        var $phoneImg = budgetList[index].img;
        $("#phoneImg img").attr("src", $phoneImg);
        $(".brand span").text(budgetList[index].brand);
        $(".model span").text(budgetList[index].name);
        $(".os span").text(budgetList[index].os);
        $(".processor span").text(budgetList[index].processor);
        $(".ram span").text(budgetList[index].ram);
        $(".rom span").text(budgetList[index].rom);
        $(".display span").text(budgetList[index].display);
        $(".disp_tech span").text(budgetList[index].disp_tech);
        $(".refresh_rate span").text(budgetList[index].refresh_rate);
        $(".wide span").text(budgetList[index].wide);
        $(".ultrawide span").text(budgetList[index].ultrawide);
        $(".front_camera span").text(budgetList[index].front_camera);
        $(".weight span").text(budgetList[index].weight);
        $(".battery span").text(budgetList[index].battery);
        $(".charging_watt span").text(budgetList[index].charging_watt);

        if(budgetList[index].ultrawide == "none") {
            var $noUltrawide = "<p>超廣角鏡頭：無</p>";
            $(".ultrawide p").html($noUltrawide);
        } else {
            $(".ultrawide span").text(budgetList[index].ultrawide);
        }

        if(budgetList[index].telephoto == "none") {
            var $noTelephoto = "<p>望遠鏡頭：無</p>";
            $(".telephoto p").html($noTelephoto);
        } else {
            $(".telephoto span").text(budgetList[index].telephoto);
        }

        var oisSupportLength = budgetList[index].ois.length;
        var $oisSupportList = "";
        for (var i = 0; i < oisSupportLength; i++) {
            if (budgetList[index].ois == "none") {
                var $noOIS = "<p>防手震：無</p>";
                $(".ois p").html($noOIS);
            }
            $oisSupportList += budgetList[index].ois[i];
            if (i != (oisSupportLength - 1)) {
                $oisSupportList += "、";
            } else {
                continue;
            }
        }
        $(".ois span").text($oisSupportList);

        var bandSupportLength = budgetList[index].band_support.length;
        var $bandSupportList = "";
        for (var i=0; i<bandSupportLength; i++) {
            $bandSupportList += budgetList[index].band_support[i];
            if(i != (bandSupportLength-1) ) {
                $bandSupportList += "、";
            } else {
                continue;
            }
        }
        $(".band_support span").text($bandSupportList);

        if(budgetList[index].waterproof == "none") {
            var $noWaterproof = "<p>防水：有</p>";
            $(".waterproof p").html($noWaterproof);
        } else {
            $(".waterproof span").text(budgetList[index].waterproof);
        }

        var $size = budgetList[index].height + " * " + budgetList[index].weight + " * " + budgetList[index].depth;
        $(".size span").text($size);
    });

    $("#close").click(function() {
        // Allow to scroll page
        $("html").css("overflow", "visible");
        $("#phoneContent").fadeOut("fast");
    });

    $("#advance_filter").click(function() {
        $("#adv_filter_panel").fadeToggle("fast");
    });

    $("#adv_filter_btn").click(function() {
        $("#phoneOverview").empty();

        if(budgetList_temp.length != 0 && isEnter) {
            $("#adv_filter_reset").fadeIn("fast");
        }

        var demandType = $("[name=demandCheck]:radio:checked").attr("id");

        while(budgetList.length) {
            budgetList.pop();
        }

        for(var i = 0; i < budgetList_temp.length; i++) {
            for(var j = 0; j < budgetList_temp[i].type.length; j++) {
                if (budgetList_temp[i].type[j] == demandType) {
                    phoneImg = budgetList_temp[i].img;
                    phoneName = budgetList_temp[i].name;
                    phonePrice = budgetList_temp[i].price;
                    $cardStructure = '<div class="card"><img src="' + phoneImg + '"><div class="phoneInfo"><p class="model-name">' + phoneName + '</p><p class="phone-price">NT$ ' + phonePrice + '</p></div><div class="moreInfo">詳細規格</div></div>';
                    $("#phoneOverview").append($cardStructure);
                    budgetList.push(budgetList_temp[i]);
                }
            }
        }
    });

    $("#adv_filter_reset").click(function() {
        $("#phoneOverview").empty();

        while(budgetList.length) {
            budgetList.pop();
        }

        for(var i = 0; i < budgetList_temp.length; i++) {
            budgetList.push(budgetList_temp[i]);
        }

        for (var i = 0; i<budgetList.length; i++) {
            phoneImg = budgetList[i].img;
            phoneName = budgetList[i].name;
            phonePrice = budgetList[i].price;
            $cardStructure = '<div class="card"><img src="' + phoneImg + '"><div class="phoneInfo"><p class="model-name">' + phoneName + '</p><p class="phone-price">NT$ ' + phonePrice + '</p></div><div class="moreInfo">詳細規格</div></div>';
            $("#phoneOverview").append($cardStructure);
        }

        $(this).fadeOut("fast");
    });
});