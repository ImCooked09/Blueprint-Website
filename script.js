function Locoscroll(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

function cursorEffect(){
    // <-----MOUSE CURSOR (PLAY REEL)------->

var page1Content = document.querySelector(".page-1-content")
var cursor = document.querySelector(".cursor")

// <==== mouse not smooth======>

// page1Content.addEventListener("mousemove",function(ahh){
// cursor.style.left = ahh.x+"px"
// cursor.style.top = ahh.y+"px"
  
// })

// <==== mouse smooth======>
 page1Content.addEventListener("mousemove",function(ahh){
gsap.to(cursor,{
    x:ahh.x,
    y:ahh.y
})
 })

//  <=====mouse enter leave property====>
    page1Content.addEventListener("mouseenter",function(){
gsap.to(cursor,{
    scale:1,
    opacity:1
})
    })

    page1Content.addEventListener("mouseleave",function(){
        gsap.to(cursor,{
            scale:0,
            opacity:0
        })
            })
}

function slider(){
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        autoplay: {
            delay: 5500,
            disableOnInteraction: true,
          },
        
      });
}

function loader(){
    var tl = gsap.timeline()

tl.from(".loader h3",{
    x:40,
    opacity:0,
    duration:1,
    stagger:0.1
})
tl.to(".loader h3",{
    opacity:0,
    x:-40,
    duration:1,
    stagger:0.1
})
tl.to(".loader",{
    opacity:0
})
tl.from(".page-1-content h1 span",{
    y:100,
    opacity:0,
    stagger:0.1,
    duration:0.5,
    delay:-0.5
})

tl.to(".loader",{
   display:"none"
})

}

function footer(){
    gsap.from(
        ".header > div, .main-title > div, .divider, .hero-image, .hero-title > div, .btns> div, .hero-copy > div",
        2,
        {
          y: "200",
          opacity: 0,
          ease: Expo.easeInOut,
          delay: 1,
          stagger: 0.08,
        }
      );
    
      gsap.from(".arrow-img img", 1, {
        scale: 0,
        ease: Elastic.easeOut,
        delay: 4,
      });
}

function menu(){
    var menu = document.querySelector("nav h4")
    var full = document.querySelector("#full-src")
    var navimg = document.querySelector("nav img")
    var flag = 0
    menu.addEventListener("click", function () {
        if (flag == 0) {
            full.style.top = 0
            navimg.style.opacity = 0
            flag = 1
        } else {
            full.style.top = "-100%"
            navimg.style.opacity = 1
            flag = 0
        }
    })
}


Locoscroll()
cursorEffect()
slider()
loader()
footer()
menu()







