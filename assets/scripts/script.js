let toggle = true;
const globalNavDiv = document.getElementById("globalNavDiv");
const sectionHead = document.getElementsByClassName("section_head")[0];
const sectionImage = document.getElementsByClassName("section_image")[0];

function globalNavMenuIcon(x) {
  x.classList.toggle("change");
  globalNavDiv.style.display = toggle ? 'block' : 'none';
  toggle = !toggle;
}

window.onscroll = () => {
  let pos = window.scrollY;
  if (window.getComputedStyle(sectionImage).height == "800px") {
    sectionImage.style.left = `${-pos}px`;
  }
}
