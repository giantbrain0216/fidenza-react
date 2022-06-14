export const createSliderGroup = (p5, slidersParams) => {
    //TODO: Labels
    let y = 20;
    const x = 20;
    let sliders = [];
  
    for (const sliderParams of slidersParams) {
      let slider = p5.createSlider(sliderParams.min, sliderParams.max, sliderParams.value)
      slider.position(x, y);
      sliders.push(slider);
      y += 30;
    }
  
    return [...sliders];
}