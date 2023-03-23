const pictureSize = (blockSelector) => {
  const blocks = document.querySelectorAll(blockSelector);

  const showImg = (block) => {
    const img = block.querySelector("img");
    //somethink.png => somethink-1.png
    img.src = img.src.slice(0, -4) + "-1.png";

    block.querySelectorAll("p:not(.sizes-hit)").forEach((p) => {
      p.style.display = "none";
    });
  };

  const hideImg = (block) => {
    const img = block.querySelector("img");
    //somethink-1.png => somethink.png
    img.src = img.src.slice(0, -6) + ".png";

    block.querySelectorAll("p").forEach((p) => {
      p.style.display = "block";
    });
  };

  blocks.forEach((block) => {
    block.addEventListener("mouseover", () => {
      showImg(block);
    });
  });

  blocks.forEach((block) => {
    block.addEventListener("mouseout", () => {
      hideImg(block);
    });
  });
};

export default pictureSize;
