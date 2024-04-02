$(document).ready(function() {

    // 方法：
    // 1. 比對資料檔內 "price" 的數字是否小於預算
    // 2. 如果是，將手機資訊寫進 card 內
    // 3. append 到某一個 $變數 裡面
    // 4. 接著比對下一個
    // 5. 循環...

    $("#budget_btn").click(function() {

        let budget = $("#budgetEnter").val();
        let phoneImg = "";
        let phoneName = "";
        let phonePrice = "";
        let $cardStructure = '';
        
        // 用預算來篩選手機
        if( budget == "" ) {
            alert("請輸入預算");
        } else if (budget <= 0 ) {
            alert("預算不可等於零");
        } else {
            $("#phoneOverview").empty();

            while (budgetList.length) {
                budgetList.pop();
            }
            
            // Filtering Apple product
            for(var i=0; i<phoneDetail.length; i++) {
                if(phoneDetail[i].price <= budget ) {
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

            for (var i = 0; i<budgetList.length; i++) {
                budgetList_temp.push(budgetList[i]);
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
        $(".waterproof span").text(budgetList[index].waterproof);

        if(budgetList[index].telephoto == "none") {
            var $noTelephoto = "<p>望遠鏡頭：無</p>";
            $(".telephoto p").html($noTelephoto);
        } else {
            $(".telephoto span").text(budgetList[index].telephoto);
        }

        var oisSupportLength = budgetList[index].ois.length;
        var $oisSupportList = "";
        for (var i=0; i<oisSupportLength; i++) {
            $oisSupportList += budgetList[index].ois[i];
            if(i != (oisSupportLength-1) ) {
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
});