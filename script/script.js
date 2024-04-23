$(document).ready(function(){

    /* GSAP 애니메이션 모음 */
    let itemBox = document.querySelectorAll('.item-box');
    ScrollTrigger.saveStyles(itemBox);
    ScrollTrigger.matchMedia(
        {
            "(min-width: 768px)": function() 
            {
                const ani3 = gsap.timeline();
               
                
                ani3.from(itemBox[0], { y: -1000, rotation: 45 })
                    .from(itemBox[1], { y: 1000, rotation: -45 })
                    .from(itemBox[2], { y: -1000, rotation: 90 })
        
                ScrollTrigger.create({
                    animation: ani3,
                    trigger: "#sec03",
                    start: "top center",
                    end: "bottom bottom",
                    scrub: 1,
                });
            }, 
    
            "(max-width: 767px)": function()
            {
                gsap.from('#sec03', {
                    scrollTrigger : {
                        trigger : "#sec03",
                        start : "-1000 center",
                        markers: true,
                        toggleActions: "play none restart none"
                    },
                    y: 1000,
                })
            }, 
    
            "all": function()
            {
                //애니메이션1
                const ani1 = gsap.timeline();
                ani1.from("#sec01 .left", { opacity: 0, y: -500, duration: 1})
                    .from("#sec01 .right", { opacity: 0, y: 500, duration: 1} )

                ScrollTrigger.create({
                    animation: ani1,
                    trigger: "#sec01",
                    toggleActions: "play none restart none"
                });

                //애니메이션2
                const ani2 = gsap.timeline();
                ani2.from("#sec02 .lf-top", { x: -1000 })
                    .from("#sec02 .pariesFont", { x: 1000 });

                ScrollTrigger.create({
                    animation: ani2,
                    trigger: "#sec02",
                    start: "top center",
                    end: "bottom bottom",
                    scrub: 1,
                });
            }
    
    });


    /* 한 섹션씩 스크롤 */
    let $html = $("html");
    let page = 1; //현재 페이지 값
    let lastPage = $(".section").length; //마지막 페이지 값

    //스크롤 맨 위로 이동
    $html.animate({scrollTop:0},10);

    $(window).on("wheel", function(e)
    {
        //요소가 애니메이션중인지 확인. 애니메이션 중이면 함수종료
        if($html.is(":animated"))
        return;
    
        //마우스 휠이 얼마나 스크롤됐는지 확인
        if(e.originalEvent.deltaY > 0)
        {
            //만약에 현재 페이지가 마지막 페이지면 함수종료
            if(page == lastPage) return;
            //그 외에는 페이지 한개 증가
            page++;
        }
        else if(e.originalEvent.deltaY < 0)
        {
            //첫번째 페이지면 함수종료
            if(page == 1) return;
            //그 외엔 페이지 한개 감소
            page--;
        }

        //해당하는 섹션의 상단으로 이동
        let posTop = (page-1) * $(window).height();
        $html.animate({scrollTop : posTop});
    });



    // 스크롤 방지를하는 함수
    function preventScroll(e) {
        e.preventDefault();
    }

    //브라우저의 크기가 768 이상일때 실행
    if ($(window).width() >= 768)
    {
        //html 스크롤 숨기기
        $html.css('overflow','hidden');
        // 스크롤방지 이벤트 리스너 추가
        window.addEventListener("wheel", preventScroll, {passive: false});
    }

    // 뷰포트 크기가 변경될 때마다 실행될 이벤트 핸들러를 작성합니다.
    $(window).resize(function()
    {
        //스크롤 맨 위로 이동
        $html.animate({scrollTop:0},10);

        if ($(window).width() >= 768)
        {
            //html 스크롤 숨기기
            $html.css('overflow','hidden');
            // 스크롤방지 이벤트 리스너 추가
            window.addEventListener("wheel", preventScroll, {passive: false});
        }
        else
        {
            //html 스크롤 초기화    
            $html.css('overflow','visible');  
            // 스크롤 방지 이벤트 리스너 제거
            window.removeEventListener("wheel", preventScroll);
        }
    });
});

