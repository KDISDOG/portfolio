$(document).ready(function () {
    var compare;
    var start = false;
    // 動態產生手機 Card
    for(var i=0; i<phoneDetail.length; i++) {
        phoneBrand = phoneDetail[i].brand;
        phoneImg = phoneDetail[i].img;
        phoneName = phoneDetail[i].name;
        phonePrice = phoneDetail[i].price;
        
        if (phonePrice != 0) {
            $cardStructure = '<div class="card ' + phoneBrand + '"><img src="' + phoneImg + '"><div class="phoneInfo"><p class="model-name">' + phoneName + '</p><p class="phone-price">NT$ ' + phonePrice + '</p></div><div class="moreInfo">詳細規格</div></div>';
        } else {
            $cardStructure = '<div class="card ' + phoneBrand + '"><img src="' + phoneImg + '"><div class="phoneInfo"><p class="model-name">' + phoneName + '</p><p class="phone-price">即將上市</p></div><div class="moreInfo">詳細規格</div></div>';
        }
        
        $("#phoneOverview").append($cardStructure);
    }

    $("#All").click(function () {
        $(".card").show();
    });

    $("#apple").click(function () {
        $(".card").hide();
        $(".Apple").show();
    });

    $("#asus").click(function () {
        $(".card").hide();
        $(".ASUS").show();
    });

    $("#google").click(function () {
        $(".card").hide();
        $(".Google").show();
    });

    $("#htc").click(function () {
        $(".card").hide();
        $(".HTC").show();
    });

    $("#oppo").click(function () {
        $(".card").hide();
        $(".OPPO").show();
    });

    $("#samsung").click(function () {
        $(".card").hide();
        $(".Samsung").show();
    });

    $("#sony").click(function () {
        $(".card").hide();
        $(".Sony").show();
    });
    
    $(".moreInfo").click(function () {
        // Not allow to scroll page
        $("html").css("overflow", "hidden");
        $("#phoneContent").fadeIn("fast");
        
        $("#btn").show();
        $(".original").show();
        $(".compare").hide();

        var index = $(".moreInfo").index(this);
        var $phoneImg = phoneDetail[index].img;
        $("#phoneImg img").attr("src", $phoneImg);
        $(".brand span").text(phoneDetail[index].brand);
        $(".model span").text(phoneDetail[index].name);
        $(".os span").text(phoneDetail[index].os);
        $(".processor span").text(phoneDetail[index].processor);
        $(".ram span").text(phoneDetail[index].ram);
        $(".rom span").text(phoneDetail[index].rom);
        $(".display span").text(phoneDetail[index].display);
        $(".disp_tech span").text(phoneDetail[index].disp_tech);
        $(".refresh_rate span").text(phoneDetail[index].refresh_rate);
        $(".wide span").text(phoneDetail[index].wide);
        $(".front_camera span").text(phoneDetail[index].front_camera);
        $(".weight span").text(phoneDetail[index].weight);
        $(".battery span").text(phoneDetail[index].battery);
        $(".charging_watt span").text(phoneDetail[index].charging_watt);

        if(phoneDetail[index].ultrawide == "none") {
            var $noUltrawide = "<p>超廣角鏡頭：無</p>";
            $(".ultrawide p").html($noUltrawide);
        } else {
            $(".ultrawide span").text(phoneDetail[index].ultrawide);
        }

        if(phoneDetail[index].telephoto == "none") {
            var $noTelephoto = "<p>望遠鏡頭：無</p>";
            $(".telephoto p").html($noTelephoto);
        } else {
            var $Telephoto_orig = "<p>望遠鏡頭：<span></span> 萬畫素</p>";
            $(".telephoto p").html($Telephoto_orig);
            $(".telephoto span").text(phoneDetail[index].telephoto);
        }

        var oisSupportLength = phoneDetail[index].ois.length;
        var $oisSupportList = "";
        if (phoneDetail[index].ois == "none") {
            var $noOIS = "<p>防手震：無</p>";
            $(".ois p").html($noOIS);
        } else {
            var $OIS_orig = "<p>防手震：<span></span></p>";
            $(".ois p").html($OIS_orig);
            for (var i = 0; i < oisSupportLength; i++) {
                $oisSupportList += phoneDetail[index].ois[i];
                if (i != (oisSupportLength - 1)) {
                    $oisSupportList += "、";
                } else {
                    continue;
                }
            }
            $(".ois span").text($oisSupportList);
        }
        

        var bandSupportLength = phoneDetail[index].band_support.length;
        var $bandSupportList = "";
        for (var i=0; i<bandSupportLength; i++) {
            $bandSupportList += phoneDetail[index].band_support[i];
            if(i != (bandSupportLength-1) ) {
                $bandSupportList += "、";
            } else {
                continue;
            }
        }
        $(".band_support span").text($bandSupportList);

        if(phoneDetail[index].waterproof == "none") {
            var $noWaterproof = "<p>防水：無</p>";
            $(".waterproof p").html($noWaterproof);
        } else {
            var $Waterproof_orig = "<p>防水：<span></span></p>";
            $(".waterproof p").html($Waterproof_orig);
            $(".waterproof span").text(phoneDetail[index].waterproof);
        }

        var $size = phoneDetail[index].height + " * " + phoneDetail[index].weight + " * " + phoneDetail[index].depth;
        $(".size span").text($size);

        $("#btncompare").click(function () {
            $("html").css("overflow", "visible");
            compare = index;
            start = true;
            console.log(start);
            console.log(compare);
            $("#phoneContent").fadeOut("fast");
            $(".moreInfo").text("+比較");
        });

        if (start == true) {
            $("html").css("overflow", "hidden");
            $("#phoneContent").fadeIn("fast");
            $(".original").show();
            $("#btn").hide();
            $(".compare").show();
            var $cphoneImg = phoneDetail[compare].img;
            $("#cphoneImg img").attr("src", $cphoneImg);
            $(".cbrand span").text(phoneDetail[compare].brand);
            $(".cmodel span").text(phoneDetail[compare].name);
            $(".cos span").text(phoneDetail[compare].os);
            $(".cprocessor span").text(phoneDetail[compare].processor);
            $(".cram span").text(phoneDetail[compare].ram);
            $(".crom span").text(phoneDetail[compare].rom);
            $(".cdisplay span").text(phoneDetail[compare].display);
            $(".cdisp_tech span").text(phoneDetail[compare].disp_tech);
            $(".crefresh_rate span").text(phoneDetail[compare].refresh_rate);
            $(".cwide span").text(phoneDetail[compare].wide);
            $(".cfront_camera span").text(phoneDetail[compare].front_camera);
            $(".cweight span").text(phoneDetail[compare].weight);
            $(".cbattery span").text(phoneDetail[compare].battery);
            $(".ccharging_watt span").text(phoneDetail[compare].charging_watt);
            
            if(phoneDetail[compare].ultrawide == "none") {
                var $noUltrawide = "<p>超廣角鏡頭：無</p>";
                $(".cultrawide p").html($noUltrawide);
            } else {
                var $Ultrawide_orig = "<p>超廣角鏡頭：<span></span> 萬畫素</p>";
                $(".cultrawide p").html($Ultrawide_orig);
                $(".cultrawide span").text(phoneDetail[compare].ultrawide);
            }

            if (phoneDetail[compare].telephoto == "none") {
                var $noTelephoto = "<p>望遠鏡頭：無</p>";
                $(".ctelephoto p").html($noTelephoto);
            } else {
                $(".ctelephoto span").text(phoneDetail[compare].telephoto);
            }

            var oisSupportLength = phoneDetail[compare].ois.length;
            var $oisSupportList = "";
            for (var i = 0; i < oisSupportLength; i++) {
                if (phoneDetail[compare].ois == "none") {
                    var $noOIS = "<p>防手震：無</p>";
                    $(".cois p").html($noOIS);
                }
                $oisSupportList += phoneDetail[compare].ois[i];
                if (i != (oisSupportLength - 1)) {
                    $oisSupportList += "、";
                } else {
                    continue;
                }
            }
            $(".cois span").text($oisSupportList);

            var bandSupportLength = phoneDetail[compare].band_support.length;
            var $bandSupportList = "";
            for (var i = 0; i < bandSupportLength; i++) {
                $bandSupportList += phoneDetail[compare].band_support[i];
                if (i != (bandSupportLength - 1)) {
                    $bandSupportList += "、";
                } else {
                    continue;
                }
            }
            $(".cband_support span").text($bandSupportList);

            if(phoneDetail[compare].waterproof == "none") {
                var $noWaterproof = "<p>防水：無</p>";
                $(".cwaterproof p").html($noWaterproof);
            } else {
                var $Waterproof_orig = "<p>防水：<span></span></p>";
                $(".cwaterproof p").html($Waterproof_orig);
                $(".cwaterproof span").text(phoneDetail[compare].waterproof);
            }

            var $size = phoneDetail[compare].height + " * " + phoneDetail[compare].weight + " * " + phoneDetail[compare].depth;
            $(".csize span").text($size);
            start = false;
        }
    });

    $("#close").click(function () {
        // Allow to scroll page
        $("html").css("overflow", "visible");
        $("#phoneContent").fadeOut("fast");
        $(".moreInfo").text("詳細規格");
    });
});