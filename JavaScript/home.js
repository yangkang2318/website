var viewDiv=document.getElementById("viewDiv");
var btnHideMenu=document.getElementById("btnHideMenu");//隐藏菜单按钮
var btnShowMenu=document.getElementById("btnShowMenu");//显示菜单按钮
var menu=document.getElementById("menudown");//菜单栏
btnShowMenu.onclick=FuncShowMenu;
//显示菜单
function FuncShowMenu(){
    btnShowMenu.blur();
    menu.id="menuactive"
    btnShowMenu.style.display="none";
}
btnHideMenu.onclick=FuncHideMenu;
 //隐藏菜单
function FuncHideMenu(){
    btnHideMenu.blur();
    menu.id="menudown";
    btnShowMenu.style.display="block"
}; 
//校园导航窗口
//btnNavigation.onclick=FuncNavigation;

function FuncNavigation(){
    btnNavigation.blur();
    var NavigationDiv=document.getElementById("NavigationDiv");
    NavigationDiv.style.display="flex";
    FuncMoveDiv(NavigationDiv);
    
};
//关闭窗口
function FuncCloseDiv(div){
    div.style.display="none"
}
//移动窗口
function FuncMoveDiv(div){
    var x = 0;
    var y = 0;
    var l = 0;
    var t = 0;
    var isDown = false;
    //鼠标按下事件
    div.onmousedown = function(e) {
        //获取x坐标和y坐标
        x = e.clientX;
        y = e.clientY;

        //获取左部和顶部的偏移量
        l = div.offsetLeft;
        t = div.offsetTop;
        //开关打开
        isDown = true;
        //设置样式  
        div.style.cursor = 'move';
    }
    //鼠标移动
    window.onmousemove = function(e) {
        if (isDown == false) {
            return;
        }
        //获取x和y
        var nx = e.clientX;
        var ny = e.clientY;
        //计算移动后的左偏移量和顶部的偏移量
        var nl = nx - (x - l);
        var nt = ny - (y - t);

        div.style.left = nl + 'px';
        div.style.top = nt + 'px';
    }
    //鼠标抬起事件
    div.onmouseup = function() {
        //开关关闭
        isDown = false;
        div.style.cursor = 'default';
    }
}

var btnSchool=document.getElementById("btnSchool");
var SchoolDiv=document.getElementById("SchoolDiv");
var video;
var fade;
btnSchool.onclick=function(event){
    event=event?event:window.event;
    event.cancelBubble=true;
    if(SchoolDiv!=null){

    }else{
        SchoolDiv=document.createElement("div");
        SchoolDiv.id="SchoolDiv";
        FuncMoveDiv(SchoolDiv);
        var headerDiv=document.createElement("div");
        headerDiv.id="headerDiv";
        var Img=document.createElement("img");
        Img.id="SchoolLogo";
        Img.src="../图片/logo.jpg";
        var headerText=document.createElement("p");
        headerText.id="headerText";
        headerText.innerHTML="吉   大   简   介";
        headerDiv.appendChild(headerText);
        headerDiv.appendChild(Img);   
        var Contentdiv=document.createElement("div");
        Contentdiv.id="ContentDiv";
        var ContentP=document.createElement("p");
        ContentP.innerHTML="吉林大学是教育部直属的全国重点综合性大学，坐落在吉林省长春市。学校始建于1946年，1960年被列为国家重点大学，1984年成为首批建立研究生院的22所大学之一，1995年首批通过国家教委“211工程”审批，2001年被列入“985工程”国家重点建设的大学，2004年被批准为中央直接管理的学校，2017年入选国家一流大学建设高校。2000年，原吉林大学、吉林工业大学、白求恩医科大学、长春科技大学、长春邮电学院合并组建新吉林大学。2004年，原中国人民解放军军需大学转隶并入。学校学科门类齐全，下设52个学院，涵盖哲学、经济学、法学、教育学等12大学科门类..."
        var a=document.createElement("a");
        a.href="https://www.jlu.edu.cn/xxgk/jdjj.htm";
        a.innerHTML="[详细]";
        a.target="_blank";
        a.title="更多简介";
        ContentP.appendChild(a);
        Contentdiv.appendChild(ContentP);
        var BtnsDiv=document.createElement("div");
        BtnsDiv.id="ButtonDiv";
        var span1=document.createElement("span");
        span1.id="HomeSpan";
        span1.className="span";
        span1.onclick=function(){
            window.open("https://www.jlu.edu.cn/");
        }
        var i1=document.createElement("i");
        i1.className="icono-home";
        span1.appendChild(i1);
        BtnsDiv.appendChild(span1);
        var span2=document.createElement("span");
        span2.id="MusicSpan";
        span2.className="span";
        
        span2.onclick=function(){
            if(document.getElementById("music")){
                viewDiv.removeChild(document.getElementById("music"))
            }else{
                var music=document.createElement("audio");
                music.id="music";
                music.src="../媒体/华语群星 - 吉林大学校歌.mp3";
                viewDiv.appendChild(music);
                music.controls = true 

            }                
        }
        var i2=document.createElement("i");
        i2.className="icono-music";
        span2.appendChild(i2);
        BtnsDiv.appendChild(span2);
        var span3=document.createElement("span");
        span3.id="VideoSpan";
        span3.className="span";
        span3.onclick=function(){
            if(document.getElementById("video")){
                viewDiv.removeChild(document.getElementById("video"))
            }else{
                video=document.createElement("video");
                video.id="video";
                video.src="../媒体/梦舞吉大.mp4";
                viewDiv.appendChild(video);
                video.controls = true;
                fade=document.createElement("div");
                fade.className="black_overlay";
                fade.style.display="block";
                fade.onclick=function(e){
                    e=e?e:window.event;
                    e.cancelBubble=true;
                    var left=video.offsetLeft;
                    var right=left+video.offsetWidth;
                    var top=video.offsetTop;
                    var bottom=top+video.offsetHeight;
                    var x=e.clientX;
                    var y=e.clientY;
                    if(x<left||x>right||y<top||y>bottom) {
                        viewDiv.removeChild(video);
                        viewDiv.removeChild(fade)
                        video=null;
                    }
                }
                viewDiv.appendChild(fade);
                viewDiv.appendChild(video);
            }                
        }
        var i3=document.createElement("i");
        i3.className="icono-video";
        span3.appendChild(i3);
        BtnsDiv.appendChild(span3);
        SchoolDiv.appendChild(BtnsDiv);
        SchoolDiv.appendChild(Contentdiv);
        SchoolDiv.appendChild(headerDiv);
        viewDiv.appendChild(SchoolDiv);
    }
}


var dataDiv=document.getElementById("buildingPeopleDataDiv")
window.onclick=function(e){
    if(SchoolDiv!=null&&video==null){
        var left=SchoolDiv.offsetLeft;
        var right=left+SchoolDiv.offsetWidth;
        var top=SchoolDiv.offsetTop;
        var bottom=top+SchoolDiv.offsetHeight;
        var x=e.clientX;
        var y=e.clientY;
		if(x<left||x>right||y<top||y>bottom) {
            viewDiv.removeChild(SchoolDiv);
            SchoolDiv=null;
		}
    }
}

var btnSchoolVr=document.getElementById("btnSchoolVr");
btnSchoolVr.onclick=function(){
    window.open("http://localhost:8001/")
}