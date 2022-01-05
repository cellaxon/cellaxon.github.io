<meta http-equiv=Content-Type content="text/html; charset=ks_c_5601-1987">

<head>
    <title>cellaxon</title>

    <!--------------------------------------------------------
    
       snow
       
       made by ReALwOlF
       http://cafe.naver.com/teamdaydream
       
       Last update 2007.02.23.Sat
    
    ---------------------------------------------------------->

    <!----------------------------------------------------------------
       Style
    ------------------------------------------------------------------>
    <style>
        BODY, TD, SELECT, input, textarea, DIV, form, center, option, pre, blockquote {font-family:궁서체;font-size:10pt;color:#dddddd;}
        input {font-family:Mistral AV;width:210;height:21;border:solid 0;border:solid 0;background-color:black;border-color:#000000;align:center}
        textarea {width:260;height:320;border:solid 0;background-color:black;border-color:#000000;line-height:160%;}
        
        input.inputData         { text-align:center;height:21;border:solid 1;border-color:#555555; }
        input.inputBoxInfo      { font-family:Mistral AV;width:200;height:21;border:solid 0;background-color:black;text-align:right; }
        input.checkbox          {width:15;height:15;border:solid 0;background-color:black;border-color:#000000;line-height:160%;}
        
        A:link    {color:cccccc;text-decoration:none;}
        A:visited {color:cccccc;text-decoration:none;}
        A:active  {color:cccccc;text-decoration:none;}
        A:hover   {color:aaaaaa;text-decoration:underline}

        BODY
        {
                  scrollbar-face-color: #000000;
                scrollbar-shadow-color: #000000;
             scrollbar-highlight-color: #000000;
               scrollbar-3dlight-color: #000000;
            scrollbar-darkshadow-color: #000000;
                 scrollbar-track-color: #000000;
                 scrollbar-arrow-color: #000000;
        }
        body { overflow:hidden }
        
    </style>
    
    <script language="JavaScript">
    
    
    </script>

</head>

<body bgcolor="Black" onResize="windowResize();">
    
    <p align="right">
            <font size=6>cellaxon</font><br>
            <font size=3><a href="http://cellaxon.com/" onfocus="blur();" target="_blank">cellaxon</a></font><br><br>
    </p>
    
    <div id="info" style="width:280px; height:25px; position:absolute; left:20px; top:20px; z-index:1;"></div>  
    
    <script language="JavaScript">
    
        /**********************************************************************************************
			var sc_rndNum = Math.floor(Math.random() * allSearchRank) + 1; // 초기 Random : 1 ~ 5
			
			switch (idx) {
				case 1 : return eval("(" + arrRankKAct + ")");   break;
			}
		**********************************************************************************************/
		// 환경 변수
		var rectArea = new Array(0, 0, window.innerWidth, window.innerHeight);     // 화면에 표시할 영역(left, top, width, height)
		//var rectArea = new Array(0, 0, document.body.offsetWidth, document.body.offsetHeight);     // 화면에 표시할 영역(left, top, width, height)
		var rLeft   = 0;      // rect 변수를 이해하기 쉽게 사용하기 위한 인덱스
		var rTop    = 1;
		var rWidth  = 2;
		var rHeight = 3;
		
        var callDelay = 50;     // 함수 호출 딜레이
        var moveRangeVert = 5;  // 좌우 이동
        var moveRangeHori = 2;  // 상하 이동
        var moveRangeVertRange = 5;  // 좌우 이동 범위
        var moveRangeHoriRange = 1;  // 상하 이동 범위
        var moveChangeDelay = 20;   // 여기서 정한 주기마다 바람의 방향이 바뀜(실행중에 임의로 바뀜)
        var moveChangeDelayMin = 10;
        var moveChangeDelayRange = 80;
        
        var snowSizeMin = 1;
        var snowSizeMax = 8;
        
        // 눈 데이터
        var snowMax = 100;
        var snowDivName = new Array();
        var snowX = new Array();
        var snowY = new Array();
        var snowColor = new Array();
        var snowSize = new Array();
        
        // temp 변수
        var i;
        var textSnowData;
        var textSnow;
        var colorR;
        var colorG;
        var colorB;
        var colorRGB;
        
        // 윈도우 크기 변경
        function windowResize()
        {
            //rectArea[2] = document.body.offsetWidth;     // 화면에 표시할 영역(left, top, width, height)
            //rectArea[3] = document.body.offsetHeight;
            
            rectArea[2] = window.innerWidth;     // 화면에 표시할 영역(left, top, width, height)
            rectArea[3] = window.innerHeight;
            
            // 위치 재설정(눈이 특정 높이로 몰리는 것을 막기 위함)
            for(i=0; i<snowMax; i++)
            {
                snowX[i] = rectArea[rLeft] + parseInt(Math.random() * rectArea[rWidth]);
                snowY[i] = rectArea[rTop]  + parseInt(Math.random() * rectArea[rHeight]);
            }
            
            document.getElementById("info").innerHTML = "<font face='Mistral AV'>area : " + rectArea[rLeft] + ", " + rectArea[rTop] + ", " + rectArea[rWidth] + ", " + rectArea[rHeight] + "</font>";
        }
        
        // 눈 생성
        function createSnow()
        {
            for(i=0; i<snowMax; i++)
            {
                colorR = parseInt(Math.random() * 255);
                colorG = parseInt(Math.random() * 255);
                colorB = parseInt(Math.random() * 255);
                colorRGB = colorR * 255 * 255 + colorG * 255 + colorB;
                
                snowX[i] = rectArea[rLeft] + parseInt(Math.random() * rectArea[rWidth]);
                snowY[i] = rectArea[rTop]  + parseInt(Math.random() * rectArea[rHeight]);
                snowDivName[i] = "divSnow" + i;
                snowColor[i] = "#" + colorRGB.toString(16);
                snowSize[i] = snowSizeMin + parseInt(Math.random() * (snowSizeMax - snowSizeMin));
                
                document.write("<div id='" + snowDivName[i] + "'></div>");
            }
            
            document.getElementById("info").innerHTML = "<font face='Mistral AV'>area : " + rectArea[rLeft] + ", " + rectArea[rTop] + ", " + rectArea[rWidth] + ", " + rectArea[rHeight] + "</font>";
        }
        
        // 눈내림
        function runSnow()
        {
            setTimeout("runSnow()", callDelay); // 일정 주기마다 자신을 재호출
            
            // 바람 방향성 전환
            moveChangeDelay--;
            if( moveChangeDelay < 0 )
            {
                moveChangeDelay = parseInt(Math.random() * moveChangeDelayRange) + moveChangeDelayMin;
                moveRangeVert = (Math.random() * moveRangeVertRange);
                moveRangeHori = (Math.random() * moveRangeHoriRange) - (moveRangeHoriRange / 2);
            }
            
            for(i = 0; i < snowMax; i++)
            {
                snowX[i] = snowX[i] + (Math.random() * moveRangeHori);
                snowY[i] = snowY[i] + (Math.random() * moveRangeVert) + 1;
                
                if( snowX[i] < rectArea[rLeft] ||
                    snowX[i] > rectArea[rLeft] + rectArea[rWidth] ||
                    snowY[i] > rectArea[rTop] + rectArea[rHeight] )
                {
                    snowX[i] = rectArea[rLeft] + parseInt(Math.random() * rectArea[rWidth]);
                    snowY[i] = rectArea[rTop];
                }
                
                textSnow = (
                    "<div style='width:20px; height:20px; position:absolute; left:" + snowX[i] + "px; top:" + snowY[i] + "px; z-index:1;'>" +
                    "<font face='Mistral AV' size=" + snowSize[i] + " color=" + snowColor[i] + ">★</font></div>" );
                
                document.getElementById(snowDivName[i]).innerHTML = textSnow;
            }
        }
        
        createSnow();
        runSnow();
    </script>
</body>
</html>

