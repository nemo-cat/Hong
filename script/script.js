$(document).ready(function(){



    const ani1 = gsap.timeline();
    ani1.from("#sec01 .left", { opacity: 0, y: -500, duration: 1})
        .from("#sec01 .right", { opacity: 0, y: 500, duration: 1} )

    ScrollTrigger.create({
        animation: ani1, // Timeline을 사용하여 ScrollTrigger를 생성
        trigger: "#sec01",
        toggleActions: "play none restart none" // toggleActions를 여기서 설정
    });



    const ani2 = gsap.timeline();
    ani2.from("#sec02 .lf-top", { x: -1000 })
        .from("#sec02 .pariesFont", { x: 1000 });


    ScrollTrigger.create({
        animation: ani2,
        trigger: "#sec02",
        start: "top center", // 애니메이션 시작 시점 수정
        end: "bottom bottom", // 애니메이션 종료 시점 수정
        scrub: 1,
    });


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
                if(page == lastPage)
                return;
                //그 외에는 페이지 한개 증가
                page++;
                }
                else if(e.originalEvent.deltaY < 0)
                {
                    //첫번째 페이지면 함수종료
                    if(page == 1)
                    return;
                    //그 외엔 페이지 한개 감소
                    page--;
                }

                //해당하는 섹션의 상단으로 이동
                let posTop = (page-1) * $(window).height();
                $html.animate({scrollTop : posTop});
            
        });


    //브라우저 크기가 768px이상이면 sec03 애니메이션 실행
    function animation03(){
        const ani3 = gsap.timeline();
        let itemBox = document.querySelectorAll('.item-box');
        
        ani3.from(itemBox[0], { y: -1000, rotation: 45 })
            .from(itemBox[1], { y: 1000, rotation: -45 }, 1)
            .from(itemBox[2], { y: -1000, rotation: 90 }, 1)

        ScrollTrigger.create({
            animation: ani3,
            trigger: "#sec03",
        /*     start: "top center",
            end: "bottom bottom",
            ease: "none",
            scrub: 1,
            markers: true,
            id: "sec3", */
        });
 
        /* gsap.from(itemBox[0], { y: -1000, rotation: 45 })
        gsap.from(itemBox[0], { y: -1000, rotation: 45 })
        gsap.from(itemBox[0], { y: -1000, rotation: 45 }) */
    }

    if ($(window).width() >= 768) {
        animation03();

        //스크롤 방지
         window.addEventListener("wheel", function(e){
            e.preventDefault();
        });
    }

    // 뷰포트 크기가 변경될 때마다 실행될 이벤트 핸들러를 작성합니다.
    $(window).resize(function() {
        if ($(window).width() >= 768)
        {
            animation03();

        }
    });
});

