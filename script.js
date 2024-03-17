let netScroll = 0;
let activated = false;
let bulletActivated = [false, false];
let articleActivated = [false];
let conclusionActivated = [false];

const sleep = ms => new Promise(r => setTimeout(r,ms));

function main() {
  $("body,html").css("overflow-y", "hidden");
  getNetScroll();
  scrollBehavior();
  scrollSectionAnimations();
}

function scrollSectionAnimations() {
  document.addEventListener("wheel", () => {
    loadingAnimation();
    scannableAnimation();
    articleAnimation();
    conclusionAnimation();
  });
}

function isVisible(el, percentVisible) {
  let
    rect = el.getBoundingClientRect(),
    windowHeight = (window.innerHeight || document.documentElement.clientHeight);

  return !(
    Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100)) < percentVisible ||
    Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
  )
};

async function scannableAnimation() {
  const scan_title = document.getElementById("scannable_title");
  const good_info = document.getElementById("good_info");
  const good_title = document.getElementById("good");
  const bad_info = document.getElementById("bad_info");
  const bad_title = document.getElementById("bad");

  if(isVisible(scan_title, 10) && !bulletActivated[0]) {
    scan_title.style.marginTop = "2%";
    scan_title.style.opacity = 1;
    bulletActivated[0] = true;
  }

  if(isVisible(good_info, 50) && !bulletActivated[1]) {
    good_info.style.width = "45vw";
    good_info.style.opacity = 1;
    bad_info.style.width = "45vw";
    bad_info.style.opacity = 1;
    await setTimeout(function() {
      good_title.style.opacity = 1;
      good_title.style.marginLeft = 0;
      bad_title.style.opacity = 1;
      bad_title.style.marginLeft = 0;
    }, 800);
    await setTimeout(function() {
      scannable_anim(false, 2, 1);
    }, 1600);
    bulletActivated[1] = true;
  }
}

function scannable_anim(good_scan, max_pts, curr_pt) {
  if(curr_pt <= max_pts) {
    const c_p = (good_scan) ? document.querySelector("#good_scan li:nth-child(" + curr_pt + ")") :
                              document.querySelector("#bad_scan li:nth-child(" + curr_pt + ")"); 
  }
}

function articleAnimation() {
  const art_title = document.getElementById("article_title");

  if(isVisible(art_title, 10) && !articleActivated[0]) {
    art_title.style.marginTop = "3%";
    art_title.style.opacity = 1;
    articleActivated[0] = true;
  }
}

function conclusionAnimation() {
  const conc_title = document.getElementById("conc_title");

  if(isVisible(conc_title, 10) && !conclusionActivated[0]) {
    conc_title.style.marginTop = "3%";
    conc_title.style.opacity = 1;
    conclusionActivated[0] = true;
  }
}

function loadingAnimation() {
  if(netScroll > 1.1 && !activated) {
    animateVideos();
    activated = true;
  }
}

function animateVideos() {
  document.querySelectorAll(".stat_vid").forEach((el) => {
    el.muted = true;
    el.play();
  });
}

function getNetScroll() {
  document.addEventListener("wheel", function(event) {
    const height_measure = $("#landing_page").height();
    netScroll += (event.deltaY/height_measure);
    netScroll = (netScroll < 0) ? 0 : netScroll;
    netScroll = (netScroll > $(document).height()/height_measure) ? $(document).height()/height_measure : netScroll;
  });
}

function scrollBehavior() {
  document.addEventListener("wheel", function() {
    const height_limit = $("#landing_page").height();
    if(netScroll <= 1) {
      document.querySelector("html").style.overflowY = "hidden";
      const opacityReduction = netScroll;
      document.querySelector("#landing_page0").style.opacity = (1-opacityReduction < 0.075) ? 0 : 1-opacityReduction;
    }
    else {
      document.querySelector("html").style.overflowY = "auto";
    }
  });
}

window.onbeforeunload = function() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant",
  });
}
$(document).ready(main());
