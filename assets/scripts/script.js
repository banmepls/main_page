let toggle = true;
let toggleImg1 = true;
let toggleImg2 = true;

const globalNavDiv = document.getElementById("globalNavDiv");
const globalNavMenu = document.getElementById("globalNavMenuIcon");
const designHead = document.getElementsByClassName("design_head")[0];
const sectionImage = document.getElementsByClassName("section_image")[0];
const sectionImage2 = document.getElementsByClassName("section_image")[1];

function globalNavMenuIcon(x) {
  x.classList.toggle("change");

  if (toggle) {
    $(globalNavDiv).animate({height:window.innerHeight}, 600);
  }
  else {
    $(globalNavDiv).animate({height:'0'}, 300);
  }

  toggle = !toggle;
}

function openDesign(Img) {
  if (Img == 1) {
    const designImage1 = document.getElementById("design_img1");

    if (toggleImg1) {
      $(designImage1).animate({height:window.innerHeight}, 600);
    }
    else {
      $(designImage1).animate({height:'0'}, 300);
    }

    toggleImg1 = !toggleImg1;
  }

  if (Img == 2) {
    const designImage2 = document.getElementById("design_img2");

    if (toggleImg2) {
      $(designImage2).animate({height:window.innerHeight}, 600);
    }
    else {
      $(designImage2).animate({height:'0'}, 300);
    }

    toggleImg2 = !toggleImg2;
  }
}

window.onscroll = () => {
  if (globalNavMenu.style.display != 'none') {
    if (sectionImage) {
      let pos = window.scrollY;

      if (window.getComputedStyle(sectionImage).width == "1200px") {
        sectionImage.style.left = `${-pos}px`;
      }

      if (window.getComputedStyle(sectionImage2).width == "1200px") {
        sectionImage2.style.left = `${pos - 2000}px`;
      }
    }
    else {
      if (window.scrollY >= 400) {
        designHead.style.display = "none";
      }
      else {
        designHead.style.display = "flex";
      }
    }
  }
}
