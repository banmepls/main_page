let toggle = true;
const globalNavDiv = document.getElementById("globalNavDiv");
const sectionImage = document.getElementsByClassName("section_image")[0];

function globalNavMenuIcon(x) {
  x.classList.toggle("change");
  if (toggle) {
    $(globalNavDiv).animate({height:'1500'}, 600);
  }
  else {
    $(globalNavDiv).animate({height:'0'}, 300);
  }
  toggle = !toggle;
}

window.onscroll = () => {
  let pos = window.scrollY;
  if (window.getComputedStyle(sectionImage).height == "800px") {
    sectionImage.style.left = `${-pos}px`;
  }
}
