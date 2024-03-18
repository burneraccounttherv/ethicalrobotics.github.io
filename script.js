let netScroll = 0;
let activated = false;
let bulletActivated = [false, false];
let articleActivated = [false, false];
let conclusionActivated = [false];
let articleSectionVisible = 1;

const sleep = ms => new Promise(r => setTimeout(r,ms));

function main() {
  $("body,html").css("overflow-y", "hidden");
  getNetScroll();
  scrollBehavior();
  scrollSectionAnimations();
  document.addEventListener("DOMContentLoaded", function() {
    articleFunctionality();
  });
}

function scrollSectionAnimations() {
  document.addEventListener("wheel", () => {
    loadingAnimation();
    scannableAnimation();
    articleAnimation();
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

  if(isVisible(scan_title, 50) && !bulletActivated[0]) {
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
      scannable_anim(false, document.getElementById("bad_scannable").childElementCount, 1);
      scannable_anim(true, document.getElementById("good_scannable").childElementCount, 1);
    }, 800);
    bulletActivated[1] = true;
  }
}

async function scannable_anim(good_scan, max_pts, curr_pt) {
  if(curr_pt === 1) {
    await sleep(770);
  }
  if(curr_pt <= max_pts) {
    let c_p;

    if(good_scan) {
      c_p = document.getElementById("goodbp" + curr_pt);
    }
    else {
      c_p = document.getElementById("badbp" + curr_pt);
    }

    c_p.style.marginTop = "3vh";
    c_p.style.opacity = 1;
    await sleep(150);
    return scannable_anim(good_scan, max_pts, curr_pt + 1);
  }
}

function articleAnimation() {
  const art_title = document.getElementById("article_title");
  const article_window = document.getElementById("article_window");

  if(isVisible(art_title, 50) && !articleActivated[0]) {
    art_title.style.marginTop = "3%";
    art_title.style.opacity = 1;
    articleActivated[0] = true;
  }

  if(isVisible(article_window, 50) && !articleActivated[1]) {
    getNewSection(0);
    articleActivated[1] = true;
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
    if($("#article_window:hover").length === 0) {
      const height_measure = $("#landing_page").height();
      netScroll += (event.deltaY/height_measure);
      netScroll = (netScroll < 0) ? 0 : netScroll;
      netScroll = (netScroll > $(document).height()/height_measure) ? $(document).height()/height_measure : netScroll;
      if(netScroll === 0) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    }
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
