require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/SceneLayer",
    "esri/layers/FeatureLayer",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/tasks/RouteTask",
    "esri/tasks/support/RouteParameters",
    "esri/tasks/support/FeatureSet",
    "esri/PopupTemplate",
    "esri/layers/support/Field",
    "esri/widgets/DirectLineMeasurement3D",
    "esri/widgets/AreaMeasurement3D",
    "esri/Camera"
  ], function (
    Map, 
    SceneView, 
    SceneLayer,
    FeatureLayer,
    Graphic,
    GraphicsLayer,
    RouteTask,
    RouteParameters,
    FeatureSet,
    PopupTemplate,
    Field,
    DirectLineMeasurement3D,
    AreaMeasurement3D,
    Camera) {
    //定义建筑物图片字典
    var buildingUrls={
      '地质宫':'../图片/地质宫.jpg',
      '油页岩综合楼':'../图片/油页岩综合楼.jpg',
      '水工楼':'../图片/水工楼.jpg',
      '钻采实验楼':'../图片/钻采实验楼.jpg',
      '岩化楼':'../图片/岩化楼.jpg',
      '图书馆':'../图片/图书馆.jpg',
      '食堂':'../图片/食堂.jpg',
      '学生一公寓':'../图片/学生一公寓.jpg',
      '学生二公寓':'../图片/学生二公寓.jpg',
      '学生三公寓':'../图片/学生三公寓.jpg',
      '学生四公寓':'../图片/学生四公寓.jpg',
      '学生五公寓':'../图片/学生五公寓.jpg',
      '学生六公寓':'../图片/学生六公寓.jpg',
      '学生七公寓':'../图片/学生七公寓.jpg',
      '浴池':'../图片/浴池.jpg',
      '古生物学与地层学研究中心':'../图片/古生物学.jpg',
      '体育馆':'../图片/体育馆.jpg'
    }

    // 创建地图
    var map = new Map({
      basemap: "topo"
    });

    // 创建三维场景
    var view = new SceneView({
      container: "viewDiv",
      map: map,
      camera:{
        position: [110,32,500000000],
        tilt: 0,
        heading: 0,
      }
    });
   
    var options = {
      speedFactor: 0.3, // animation is 10 times slower than default
      easing: "out-quint" // easing function to slow down when reaching the target
    };
    view.when(function(){
        view.goTo({
          position: [125.30122,43.8750,200],
          tilt: 70,
          heading: 0,
        },options).catch(function(error) {
        if (error.name != "AbortError") {
          console.error(error);
        }
      });
    })
    
    
    /*测量工具*/
    var activeWidget = null;
    // add the toolbar for the measurement widgets
    view.ui.add("topbar", "top-right");

    document
      .getElementById("distanceButton")
      .addEventListener("click", function () {
        setActiveWidget(null);
        if (!this.classList.contains("active")) {
          setActiveWidget("distance");
        } else {
          setActiveButton(null);
        }
      });

    document
      .getElementById("areaButton")
      .addEventListener("click", function () {
        setActiveWidget(null);
        if (!this.classList.contains("active")) {
          setActiveWidget("area");
        } else {
          setActiveButton(null);
        }
      });

    function setActiveWidget(type) {
      switch (type) {
        case "distance":
          activeWidget = new DirectLineMeasurement3D({
            view: view
          });

          // skip the initial 'new measurement' button
          activeWidget.viewModel.newMeasurement();

          view.ui.add(activeWidget, "top-right");
          setActiveButton(document.getElementById("distanceButton"));
          break;
        case "area":
          activeWidget = new AreaMeasurement3D({
            view: view
          });

          // skip the initial 'new measurement' button
          activeWidget.viewModel.newMeasurement();

          view.ui.add(activeWidget, "top-right");
          setActiveButton(document.getElementById("areaButton"));
          break;
        case null:
          if (activeWidget) {
            view.ui.remove(activeWidget);
            activeWidget.destroy();
            activeWidget = null;
          }
          break;
      }
    }

    function setActiveButton(selectedButton) {
      // focus the view to activate keyboard shortcuts for sketching
      view.focus();
      var elements = document.getElementsByClassName("active");
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove("active");
      }
      if (selectedButton) {
        selectedButton.classList.add("active");
      }
    }
    // 添加三维图层
    var sceneLayer = new SceneLayer({
      url:"https://trail.arcgisonline.cn/server/rest/services/Hosted/%E5%90%89%E6%9E%97%E5%A4%A7%E5%AD%A6%E6%9C%9D%E9%98%B3%E6%A0%A1%E5%8C%BA%E4%B8%89%E7%BB%B4%E6%A0%A1%E5%9B%AD/SceneServer",
      popupEnabled: true,
      outFields:["*"]
    });
    map.add(sceneLayer);
    //弹出窗口添加实景图和到这去两个功能按钮
    let BuildingPicture = {
      title: "实景图",
      id: 'BuildingPicture',
     className:"esri-icon-media"
    }
    let Navigation={
      title:"到这去",
      id:"Navigateion",
      className:"esri-icon-right-arrow-circled"
    }
    var SchoolFacilitiesAction = {
      title: "查找周边",
      id: "SchoolFacilities",
      className: "esri-icon-organization"
    }
    var currentPeopleAction={
      title: "实时人数",
      id: "currenPeople",
      className: "esri-icon-group"
    }
    view.popup.maxInlineActions=6;
    view.popup.actions.push(BuildingPicture);
    view.popup.actions.push(Navigation);
    view.popup.actions.push(currentPeopleAction);
    view.popup.actions.push(SchoolFacilitiesAction);
    
    //实景图
    function showBuildingPicture(){
      var viewDiv=document.getElementById("viewDiv");
      var buildingPictureDiv=document.createElement("div");
      buildingPictureDiv.id="buildingPictureDiv";
      var picturename_h4=document.createElement("h4");
      var buildingName=document.getElementsByClassName("esri-feature-fields__field-data")[1].lastChild.nodeValue;
      picturename_h4.innerHTML=buildingName+"实景图";//图层名称；
      var buildingUrl=buildingUrls[buildingName];
      var imgDiv=document.createElement("div");
      imgDiv.id="imgLB";
      imgDiv.style.background="url('"+buildingUrl+"') no-repeat 0px 0px ";
      imgDiv.style.backgroundPosition="50% 50%";
      imgDiv.style.backgroundSize="contain";
      buildingPictureDiv.appendChild(picturename_h4);
      buildingPictureDiv.appendChild(imgDiv);
      var fade=document.createElement("div");
      fade.className="black_overlay";
      var closeSpan=document.createElement("span");
      closeSpan.className="closeDiv";
      buildingPictureDiv.appendChild(closeSpan);
      closeSpan.onclick=function(){
          buildingPictureDiv.style.display="none";
          fade.style.display="none";
          viewDiv.removeChild(fade);
          viewDiv.removeChild(buildingPictureDiv);
      }
      buildingPictureDiv.style.display="flex";
      fade.style.display="block";
      viewDiv.appendChild(buildingPictureDiv);
      viewDiv.appendChild(fade);
    }
    
    view.popup.on("trigger-action",async function (event) {
      if (event.action.id === "BuildingPicture") {
        showBuildingPicture();
      }else if(event.action.id === "Navigateion"){
        document.getElementById("NavigationTipP").innerHTML="提示:请点击地图输入起点!"
        FuncNavigation();//打开校园导航窗口
        routeLayer.removeAll();
        if(typeof(addstop)=="undefined"){
        }else{
          addstop.remove();
        }
        FromSelect.options.length=0;
        ToSelect.options.length=0;
        ShortNavigation("Goto");
      }else if(event.action.id==="SchoolFacilities"){
        FuncFacilities();
        showSecondUl();
        var p=document.getElementById("SchoolFacility");
        p.innerHTML="查找周边"
      }else if(event.action.id==="currenPeople"){
          var buildingName=document.getElementsByClassName("esri-feature-fields__field-data")[1].lastChild.nodeValue;
          showVisitors(buildingName);
      }
    });
    function showVisitors(BuildingName) {
      var dataDiv=document.getElementById("buildingPeopleDataDiv");
      if(dataDiv==null){
        dataDiv=document.createElement("div");
        dataDiv.id="buildingPeopleDataDiv";
        dataDiv.className="dataDiv";
        FuncMoveDiv(dataDiv)
        viewDiv.appendChild(dataDiv);
        Highcharts.setOptions({
        global: {
            useUTC: false
        }
        });
        function activeLastPointToolip(chart) {
          var points = chart.series[0].points;
          chart.tooltip.refresh(points[points.length -1]);
        }     
        var chart = Highcharts.chart('buildingPeopleDataDiv', {
          chart: {
                  type: 'spline',
                  marginRight: 10,
                  events: {
                          load: function () {
                                  var series = this.series[0],
                                          chart = this;
                                  activeLastPointToolip(chart);
                                  setInterval(function () {
                                          var x = (new Date()).getTime();// 当前时间
                                          var y=randomPeople(BuildingName);
                                          series.addPoint([x, y], true, true);
                                          activeLastPointToolip(chart);
                                  }, 1000);
                          }
                  }
          },
          title: {
                  text: BuildingName+'实时人数'
          },
          xAxis: {
                  type: 'datetime',
                  tickPixelInterval: 150
          },
          yAxis: {
                  title: {
                          text: "人数(单位:人)"
                  }
          },
          tooltip: {
                  formatter: function () {
                          return '<b>' + this.series.name + '</b><br/>' +
                                  Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                                  Highcharts.numberFormat(this.y, 2);
                  }
          },
          legend: {
                  enabled: false
          },
          series: [{
                  name: BuildingName+'实时人数',
                  data: (function () {
                          // 生成随机值
                          var data = [],
                                  time = (new Date()).getTime(),
                                  i;
                          for (i = -19; i <= 0; i += 1) {
                                  data.push({
                                          x: time + i * 1000,
                                          y: randomPeople(BuildingName),
                                  });
                          }
                          return data;
                  }())
                  }]
        });
        var fade=document.createElement("div");
        fade.className="black_overlay";
        fade.style.display="block";
        fade.onclick=function(e){
          e=e?e:window.event; 
          e.cancelBubble=true;
          var left=dataDiv.offsetLeft;  
          var right=left+dataDiv.offsetWidth;
          var top=dataDiv.offsetTop;
          var bottom=top+dataDiv.offsetHeight;
          var x=e.clientX;
          var y=e.clientY;
          if(x<left||x>right||y<top||y>bottom) {
            viewDiv.removeChild(dataDiv);
            viewDiv.removeChild(fade)
            dataDiv=null;
          }
        }
        viewDiv.appendChild(fade);
        }else{
          viewDiv.removeChild(dataDiv);
          dataDiv=null;
          showVisitors(BuildingName);
        }      

  }
    
  function randomPeople(BuildingName){
    var flag=Math.round(Math.random());
    var basicPeople;
    if(BuildingName=="地质宫"){
      basicPeople=200;
    }else if(BuildingName=="油页岩综合楼"){
      basicPeople=180;
    }else if(BuildingName=="岩化楼"){
      basicPeople=50;
    }else if(BuildingName=="图书馆"){
      basicPeople=500;
    }else if(BuildingName=="食堂"){
      basicPeople=100;
    }else if(BuildingName=="钻采实验楼"){
      basicPeople=160;
    }else if(BuildingName=="水工楼"){
      basicPeople=210;
    }else if(BuildingName=="学生一公寓"){
      basicPeople=300;
    }else if(BuildingName=="学生二公寓"){
      basicPeople=280;
    }else if(BuildingName=="学生三公寓"){
      basicPeople=250;
    }else if(BuildingName=="学生四公寓"){
      basicPeople=240;
    }else if(BuildingName=="学生五公寓"){
      basicPeople=360;
    }else if(BuildingName=="学生六公寓"){
      basicPeople=160;
    }else if(BuildingName=="学生七公寓"){
      basicPeople=400;
    }else if(BuildingName=="古生物学与地层学研究中心"){
      basicPeople=40;
    }else if(BuildingName=="浴池"){
      basicPeople=35;
    }else if(BuildingName=="体育馆"){
      basicPeople=30;
    }
    var y;
    if(flag){
        y=basicPeople+Math.round(Math.random()*5);
    }else{
        y=y=basicPeople-Math.round(Math.random()*5);
    }// 随机值
    return y;
  }


    var btnNavigation=document.getElementById("btnNavigation");
    btnNavigation.onclick=function(){
      document.getElementById("NavigationTipP").innerHTML="提示:请依次点击地图输入起点和终点!"
      FuncNavigation();
      ShortNavigation("Navigation")
    };


    //最短路径
    var routeLayer=new GraphicsLayer();
    var addstop;
    map.add(routeLayer);
    var FromSelect=document.getElementById("From");
    var ToSelect=document.getElementById("To");
    function ShortNavigation(mode){
      //创建网络数据集
      var routeTask = new RouteTask({
        url:
          "http://localhost:6080/arcgis/rest/services/Route/NAServer/%E8%B7%AF%E5%BE%84"
      });
      
        // 设置路径参数
      var routeParams = new RouteParameters({
        stops: new FeatureSet(),
        outSpatialReference: {
        // autocasts as new SpatialReference()
        wkid: 102100
        }
      });
      var stopSymbol = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        style: "cross",
        size: 15,
        outline: {
          // autocasts as new SimpleLineSymbol()
          width: 4
        }
      };

      // Define the symbology used to display the route
      var routeSymbol = {
        type: "simple-line", // autocasts as SimpleLineSymbol()
        color: [0, 0, 255, 0.5],
        width: 5
      };
      
      var i=0;
      if(mode=="Goto"){//到这去模式
        var option=document.createElement("option");
        option.innerHTML=document.getElementsByClassName("esri-feature-fields__field-data")[1].lastChild.nodeValue;
        ToSelect.appendChild(option);
        var fieldname= document.getElementsByClassName("esri-feature-fields__field-header")[2].lastChild.nodeValue;
        if(fieldname=="类型"){
          view.whenLayerView(sceneLayer).then(function(layerView){
          var query=layerView.createQuery();
          var value=document.getElementsByClassName("esri-feature-fields__field-data")[1].lastChild.nodeValue;
          query.where="名称 = '"+value+"'";
          layerView.queryExtent(query).then(function(results){
              var stop=new Graphic({
                geometry:results.extent.center,
                symbol:stopSymbol
              })
              routeLayer.add(stop);
              routeParams.stops.features.push(stop);
              addstop=view.on("click", addStopGoto);
          });
         });
        }else if(fieldname=="设施类型"){
          var LayerId=document.getElementsByClassName("esri-feature-fields__field-data")[2].lastChild.nodeValue;
          var featurelayer=map.findLayerById(LayerId);
          view.whenLayerView(featurelayer).then(function(layerView){
            var query=layerView.createQuery();
            var value=document.getElementsByClassName("esri-feature-fields__field-data")[1].lastChild.nodeValue;
            query.where="名称 = '"+value+"'";
            layerView.queryExtent(query).then(function(results){
                var stop=new Graphic({
                  geometry:results.extent.center,
                  symbol:stopSymbol
                })
                routeLayer.add(stop);
                routeParams.stops.features.push(stop);
                addstop=view.on("click", addStopGoto);
            });
           });
        }
      }else if(mode=="Navigation"){//菜单栏打开
        var btnNavigationRun=document.getElementById("btnNavigationRun");
          btnNavigationRun.onclick=function(){
            btnNavigationRun.blur();
            if(i!=2){
              alert("请输入起点和终点!");

            }
            else{
              if(routeLayer.graphics.length==2){
                routeTask.solve(routeParams).then(showRoute);
              }
            }
          }
        addstop=view.on("click",addStopNavigation);
      }

      //到这去模式
      function addStopGoto(event) {
        i++;
        // Add a point at the location of the map click
        var stop = new Graphic({
        geometry: event.mapPoint,
        symbol: stopSymbol
        });
        routeLayer.add(stop);
        routeParams.stops.features.push(stop);
        if(i==1){
          var option=document.createElement("option");
          option.innerHTML=event.mapPoint.latitude.toFixed(4)+","+event.mapPoint.longitude.toFixed(4);
          FromSelect.appendChild(option);
          addstop.remove();//移除监听事件
          var btnNavigationRun=document.getElementById("btnNavigationRun");
          btnNavigationRun.onclick=function(){
            btnNavigationRun.blur();
            if(routeLayer.graphics.length==2)
            routeTask.solve(routeParams).then(showRoute);
          }
        }else{
          alert("请输入起点！")
        }
      }
      //菜单栏打开模式
      function addStopNavigation(event){
        i++;
        // Add a point at the location of the map click
        var stop = new Graphic({
        geometry: event.mapPoint,
        symbol: stopSymbol
        });
        routeLayer.add(stop);
        routeParams.stops.features.push(stop);
        if(i==1){
          var option=document.createElement("option");
          option.innerHTML=event.mapPoint.latitude.toFixed(4)+","+event.mapPoint.longitude.toFixed(4);
          FromSelect.appendChild(option);
        }else if(i==2){
          var option=document.createElement("option");
          option.innerHTML=event.mapPoint.latitude.toFixed(4)+","+event.mapPoint.longitude.toFixed(4);
          ToSelect.appendChild(option);
          addstop.remove();
        }
      }
        
      
      // Adds the solved route to the map as a graphic

      function showRoute(data) {
        var routeResult = data.routeResults[0].route;
        routeResult.symbol = routeSymbol;
        routeLayer.add(routeResult);
      }

      var btnClrearResult=document.getElementById("btnClrearResult");
      btnClrearResult.onclick=function(){
        btnClrearResult.blur();
        document.getElementById("NavigationTipP").innerHTML="提示:请依次点击地图输入起点和终点!"
        FromSelect.options.length=0;
        ToSelect.options.length=0;
        routeLayer.removeAll();
        addstop.remove();
        ShortNavigation("Navigation");
      }
      var closeDiv=document.getElementById("closeNavigationDiv");
      closeDiv.onclick=function(){
        FuncCloseDiv(NavigationDiv);
        FromSelect.options.length=0;
        ToSelect.options.length=0;
        routeLayer.removeAll();
        addstop.remove();
      }
    }

    //校园设施查询
    
    var SchoolFacilitiesLayer=new FeatureLayer({
      url:"https://trail.arcgisonline.cn/server/rest/services/Hosted/%E6%A0%A1%E5%9B%AD%E8%AE%BE%E6%96%BD%E7%82%B9/FeatureServer/0",
      visible:false,
    });
    map.add(SchoolFacilitiesLayer);
    var btnFacilities=document.getElementById("btnFacilities");
    btnFacilities.onclick=function(){
      FuncFacilities();
      showSecondUl();
      
    }

    //打开校园设施窗口
    function FuncFacilities(){
      var FacilitiesDiv=document.getElementById("FacilitiesDiv");
      FacilitiesDiv.style.display="inline-block";
      var closeDiv=document.getElementById("closeFacilitiesDiv");
      FuncMoveDiv(FacilitiesDiv);
      closeDiv.onclick=function(){
        FuncCloseDiv(FacilitiesDiv);
        for(var i=0;i<9;i++){
          var LiInnerText=FirstUl_lis[i].lastChild.nodeValue;
          if(map.findLayerById(LiInnerText)){
            map.remove(map.findLayerById(LiInnerText));
            var SecondUlId="SecondContent"+(i+1);
            var secondUl=document.getElementById(SecondUlId);
            FirstUl.removeChild(secondUl);
          }else{
            continue;
          }
          
        }
      }
    }
    //添加二级内容列表
    var FirstUl=document.getElementById("FirstUl");
    var FirstUl_lis=FirstUl.getElementsByClassName("FirstLi");
    function showSecondUl(){'use strict' 
      for(let i=1;i<10;i++){
        FirstUl_lis[i-1].onclick=function(){
          var SecondUl=document.getElementById("SecondContent"+i);
          var LiInnerText=FirstUl_lis[i-1].lastChild.nodeValue;
          if(SecondUl==undefined){
            var ul=document.createElement("ul");
            ul.id="SecondContent"+i;
            var query=SchoolFacilitiesLayer.createQuery();
            query.where="设施类型='"+LiInnerText+"'";
            SchoolFacilitiesLayer.queryFeatures(query).then(function(response){
              var FacilitiesGraphicsLayer=new GraphicsLayer();
              for(let j=0;j<response.features.length;j++){
                var feature=response.features[j];
                var li=document.createElement("li");
                li.innerHTML=feature.attributes["名称"];
                li.className=feature.attributes["设施类型"];
                feature.visible=false;
                FacilitiesGraphicsLayer.add(feature)
                ul.appendChild(li);
              } 
              var FacilitiesFeatureLayer=new FeatureLayer();
              FacilitiesFeatureLayer.id=LiInnerText;
              FacilitiesFeatureLayer.source=FacilitiesGraphicsLayer.graphics;
              //客户端创建featurelayer必须指定Fields
              const fields = [
                new Field({
                  name: "ObjectID",
                  alias: "ObjectID",
                  type: "oid"
                }), new Field({
                  name: "名称",
                  alias: "设施名称",
                  type: "string"
                }), new Field ({
                  name: "设施类型",
                  alias: "设施类型",
                  type: "string"
                })
               ];
              FacilitiesFeatureLayer.fields=fields;
              FacilitiesFeatureLayer.outFields=["*"];
              var popupTemplate = new PopupTemplate({
                title:"校园设施",
                outFields:["*"],
                content: [{
                  type: "fields",
                  fieldInfos: [{
                    fieldName: "ObjectID",
                    label: "OID",
                  },{
                    fieldName: "名称",
                    label: "设施名称",
                    isEditable:true,
                    tooltip:"",
                    visible:true,
                    format:null,
                    stringFieldOption:"text-box"
                  },{
                    fieldName: "设施类型",
                    label: "设施类型",
                    isEditable:true,
                    tooltip:"",
                    visible:true,
                    format:null,
                    stringFieldOption:"text-box"
                  }]
                }]
              });
              FacilitiesFeatureLayer.popupTemplate=popupTemplate;
              FacilitiesFeatureLayer.renderer = {
                type: "simple",  // autocasts as new SimpleRenderer()
                symbol : {
                  type: "point-3d",  // autocasts as new PointSymbol3D()
                  symbolLayers: [{
                    type: "icon",  // autocasts as new ObjectSymbol3DLayer()
                    size:20,  // diameter of the object from north to south in meters
                    resource: { primitive: "kite" },
                    material: { color:[4, 158, 247]}
                  }]
                }
              };
              map.add(FacilitiesFeatureLayer);
              FirstUl.insertBefore(ul,FirstUl_lis[i-1].nextSibling);
              var SecondUl_lis=ul.getElementsByTagName("li");
              for(let i=0;i<SecondUl_lis.length;i++){
                SecondUl_lis[i].onclick=function(){
                  var LayerId=SecondUl_lis[i].className;
                  var featurelayer=map.findLayerById(LayerId);
                  view.whenLayerView(featurelayer).then(function(layerView){
                    var query=layerView.createQuery();
                    var value=SecondUl_lis[i].lastChild.nodeValue;
                    query.where="名称 = '"+value+"'";
                    layerView.queryFeatures(query).then(function(results){
                      var feature=results.features;
                      view.popup.open({
                        location:feature[0].geometry,
                        features:feature,
                      });
                    });
                   });
                  ;
                }
              }
            });
            
            
          }else{
            FirstUl.removeChild(SecondUl);
            map.remove(map.findLayerById(LiInnerText))
          }
        }
      }
    }



});