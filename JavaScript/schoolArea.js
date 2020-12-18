/*校区简介 */
var viewDiv=document.getElementById("viewDiv");
var btnSchoolArea=document.getElementById("btnSchoolArea");
btnSchoolArea.onclick=function(){
    FuncSchoolArea();
}
var txtIntroTitleArray=new Array();
txtIntroTitleArray=[
    "地球探测科学与技术学院",
    "仪器与电气工程学院",
    "地球科学学院",
    "建设工程学院",
    "新能源与环境学院"
];
var pictureSrc=new Array();
pictureSrc=[
    "../图片/地探学院.jpg",
    "../图片/仪电学院.jpg",
    "../图片/地科学院.jpg",
    "../图片/建设工程学院.jpg",
    "../图片/新能源与环境学院.jpg"
]
var txtIntroductionArray=new Array();
txtIntroductionArray=[
"吉林大学地球探测科学与技术学院成立于1997年，原为长春科技大学地球探测与信息技术学院，由当时的长春地质学院地球物理系(1952)、地球化学系(1995)和遥感地质教研室(1978)共同组建，测绘工程系(1996)于1999年并入学院，2001年底学院更名为吉林大学地球探测科学与技术学院。学院目前下设4个教学系：地球物理系、地球化学系、测绘工程系、遥感与地理信息系统系；3个院管研究所：地球物理研究所、地球化学研究所和地学信息系统研究所；2008年起，学院代管吉林大学综合矿产信息预测研究所。...",
"吉林大学仪器科学与电气工程学院成立于2005年，其前身是原长春地质学院仪器系。在学校党委的正确领导下，经过几代前辈教师及仪电人的辛勤工作和共同努力，学院在人才培养、科学研究、社会服务和文化传承等方面取得了一系列具有显示度的成果。已成为我国培养仪器科学与技术、电气工程领域高级专门人才的重要基地，累计已培养各类高级专门人才逾万人。学院涵盖仪器科学与技术、控制科学与工程和电气工程3个一级学科，拥有测试计量技术及仪器（省重点学科）等二级学科博士学位授权点，...",
"吉林大学地球科学学院，前身是1952年东北地质学院建院之初所设三个系之一的地质矿产勘查系，第一任系主任为世界著名古生物学家、中国科学院院士（学部委员）俞建章教授。1951年，我国著名地质学家李四光、喻德渊、俞建章、马振图教授等创建了新中国第一所地质学校—东北地质专科学校。1952年，东北地质专科学校与山东大学地质矿物学系及东北工学院地质学系和物理系部分合并，成立东北地质学院，并设立地质矿产勘查系，1957年更名为长春地质勘探学院地质矿产勘查系,...",
"建设工程学院成立于2001年5月，是由原长春科技大学环境与建设工程学院的工程地质专业、土木工程专业和工程技术学院的勘察工程专业组建而成，其发展历史可追溯到1952年。建国之初，百业待兴，根据国家发展战略布局对高级专门人才的需求，在原长春地质学院设立了水文地质及工程地质专业和探矿工程专业。二十世纪九十年代，开设土木工程专业。2012年教育部颁布新版专业目录，将工程地质专业和勘察工程专业更名为地质工程专业。...",
"在2000年吉林大学合校之时，经过学科专业的整合调整，2001年由原长春科技大学的水文地质、环境工程专业与原吉林大学环境科学与工程系合并组建了吉林大学环境与资源学院，是吉林大学“211”工程、“985”工程和“双一流”建设学院之一。学院现有地下水科学与工程、环境科学、环境工程三个系，涉及3个一级学科：地质资源与地质工程是国家重点学科、水利工程、环境科学与工程是吉林省优势特色重点学科。吉林大学环境与资源学院在国内水资源、环境、地下新能源领域具有一定影响的教学与科研单位。..."
]
var linkductionArray=new Array();
var linkductionArray=[
    "http://gest.jlu.edu.cn/info/1019/2202.htm",
    "http://ciee.jlu.edu.cn/xygk1/xyjj.htm",
    "http://geo.jlu.edu.cn/xygk/xyjs.htm",
    "http://const.jlu.edu.cn/xygk/xyjj.htm",
    "http://cer.jlu.edu.cn/xygk/xyjj.htm"
]

var linkArray=new Array();
linkArray=[
    "http://gest.jlu.edu.cn/",
    "http://ciee.jlu.edu.cn/",
    "http://geo.jlu.edu.cn/",
    "http://const.jlu.edu.cn/",
    "http://cer.jlu.edu.cn/",
    
]

var txtTelephoneArray=new Array()
var txtAddressArray=new Array()
txtTelephoneArray=[
    "0431-88502426", 
    "0431-88502382",
    "0431-88502278",
    "0431-88502606",
    "0431-88502595",
]
txtAddressArray=[
    "吉林省长春市西民主大街938号",
    "吉林省长春市西民主大街938号",
    "吉林省长春市建设街2199号",
    "吉林省长春市西民主大街938号",
    "吉林省长春市解放大路2519号",
]

function FuncSchoolArea(){
    var SchoolAreaDiv=document.getElementById("SchoolAreaDiv");
    SchoolAreaDiv.style.display="inline-block";
    var closeDiv=document.getElementById("closeSchoolAreaDiv");
    FuncMoveDiv(SchoolAreaDiv);
    closeDiv.onclick=function(){
      FuncCloseDiv(SchoolAreaDiv);
      if(document.getElementById("SchoolDiv")!=null){
        viewDiv.removeChild (document.getElementById("SchoolDiv"));
      }
      
    }
    var AcademicUl=document.getElementById("AcademicUl");
    var lis=AcademicUl.getElementsByTagName("li");
    for(let i=0;i<lis.length;i++){'use strict' 
        
        lis[i].onclick=function(){
            openAcademicDiv(i);
        }
    }
}


function openAcademicDiv(i) {
    var SchoolAreaDiv=document.getElementById("SchoolDiv");
    var Img=document.getElementById("AcademicLogo");
    var headerText=document.getElementById("AcademiciheaderText");
    var ContentP=document.getElementById("AcdemicContent");
    var a=document.getElementById("link");
    var b=document.getElementById("href");
    var txtPhonelabel=document.getElementById("phone");
    var txtAddresslabel=document.getElementById("address");
    if(SchoolAreaDiv==null){
        SchoolAreaDiv=document.createElement("div");
        SchoolAreaDiv.id="SchoolDiv";
        FuncMoveDiv(SchoolAreaDiv);
        var headerDiv=document.createElement("div");
        headerDiv.id="headerDiv";
        Img=document.createElement("img");
        Img.id="AcademicLogo";
        Img.src=pictureSrc[i];
        headerText=document.createElement("p");
        headerText.id="AcademiciheaderText";
        headerText.innerHTML=txtIntroTitleArray[i];
        headerDiv.appendChild(headerText);
        headerDiv.appendChild(Img);   
        var Contentdiv=document.createElement("div");
        Contentdiv.id="ContentDiv";
        ContentP=document.createElement("p");
        ContentP.id="AcdemicContent";
        ContentP.innerHTML=txtIntroductionArray[i];
        a=document.createElement("a");
        a.id="link";
        a.href=linkductionArray[i];
        a.innerHTML="[详细]";
        a.target="_blank";
        a.title="更多简介";
        ContentP.appendChild(a);
        Contentdiv.appendChild(ContentP);
        var informationDiv=document.createElement("div");
        informationDiv.id="informationDiv";
        b=document.createElement("a");
        b.id="href";
        b.href=linkArray[i];
        b.innerHTML="学院官网";
        b.target="_blank";
        b.title="学院官网";
        txtAddresslabel=document.createElement("label");
        txtAddresslabel.id="address";
        txtAddresslabel.innerHTML="学院地址："+txtAddressArray[i];
        txtPhonelabel=document.createElement("label");
        txtPhonelabel.id="phone";
        txtPhonelabel.innerHTML="学院电话："+txtTelephoneArray[i];
        informationDiv.appendChild(txtAddresslabel);
        informationDiv.appendChild(txtPhonelabel);
        informationDiv.insertBefore(b,txtAddresslabel);
        SchoolAreaDiv.appendChild(informationDiv);
        SchoolAreaDiv.appendChild(Contentdiv);
        SchoolAreaDiv.appendChild(headerDiv);
        viewDiv.appendChild(SchoolAreaDiv);
        
    }else{
        Img.src=pictureSrc[i];
        headerText.innerHTML=txtIntroTitleArray[i];
        ContentP.innerHTML=txtIntroductionArray[i];
        a.href=linkductionArray[i];
        ContentP.appendChild(a);
        b.href=linkArray[i];
        txtAddresslabel.innerHTML="学院地址："+txtAddressArray[i];
        txtPhonelabel.innerHTML="学院电话："+txtTelephoneArray[i];
    }
}