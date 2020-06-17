function startTask(){
      var val=$("#kValId").val();
      if(!val||val.indexOf("请输入百度文库的网页地址")>-1){
          alert("请输入百度文库的网页地址");
        return false;
      }
      if(val.indexOf("baidu")<=0){

        alert("暂不支持该文档的网页导出！");
        return false;
      }
      if(val.indexOf("baiduvvv")>0){
	  val=val.replace("baiduvvv","baidu");
      //  alert("输入框里文档网址不应该加vvv哦，在浏览器地址栏里才需要加vvv！");
       // return false;
      }

   hasDowned=false;
      checkCount=0;
      networkErrorCount=0;
      $("#downing").show();
      $("#subbtn").attr("disabled",true);
      $("#subbtn").text("下载中");
      $("#kValId").attr("disabled",true);

      $("#downingInfo").text("开始进行导出转换任务，请等待！").css("color","red");
      $("#bar").css("width","0%").css("background","#95CA0D");

      $("#searchDivId").addClass("filtergray");
      $("#subbtn").css("cursor","default");
      $('input:radio[name="downType"]').attr("disabled",true);

	  reputFromUrlForComment();
      /*
      window.setTimeout(function (){
            $("#subbtn").text("下载");
          $("#subbtn").attr("disabled",false);
      },10000);
      */
      val =encodeURIComponent(val);
     // var t=$("#t").val();
       // var sign=$("#sign").val();
	  var t=$("input[name='t']").val();
      var sign=$("input[name='sign']").val();
      var type=$('input:radio[name="downType"]:checked').val();

      var dsUrl=preDir+"ds.php?url="+val+"&type="+type+"&t="+t+"&sign="+sign;
      var cparam="url="+val+"&type="+type+"&t="+t+"&sign="+sign+"&c="+devId;

      dsErrorCount=0;
      ds(dsUrl,cparam);


  }

  function ds(dsUrl,cparam){
      dsErrorCount++;

      $.ajax({
            type: "GET",
          //  async: false,
            dataType: "json",
            url: dsUrl,
            success: function (result) {
                if(result){
                    if(result.code==1){
                      server=result.s;
                      preurl=server+"/wkc.php?"+cparam+"&f="+result.f+"&h="+result.h;
                      runStart(preurl);
                      return;
                    }else if(result.code==-2){
                      error3Down(result.msg);
                      return;
                    }


                }
                error2Down();

            },
            error: function (e) {
              console.log("error",e)
              if(dsErrorCount>3){
                   networkErrorDown();
              }else{
                   ds(dsUrl,cparam);
              }

            }
        });

    }



    function runStart(preurl){

    $.ajax({
          type: "GET",
        //  async: false,
          url: preurl+"&btype=start",
          dataType: "jsonp",
          jsonp: "callback",
          jsonpCallback:"callback2",
          success: function (result) {
              if(result){
                  if(result.code==1){ // start
                    taskId=result.id;
                    uuid=result.uuid;
                    timer=setInterval(runProgress,1000*2);

                    return;
                  }else if(result.code==2){ // success
                      doDown();
                      return;
                  }else if(result.code==-1){ // fail
          var msg=result.msg;
                     if(msg){
                        error3Down(msg);
                    }else{
                        errorDown();
                    }
                        return;
                  }

              }
              error2Down();

          },
          error: function (e) {
              networkErrorDown();
          }
      });

  }