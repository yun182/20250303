let input;
let slider;
let button;
let dropdown;
let iframe;
let isJumping = false;
let offsets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.position(10, 10); // 設定文字框的位置
  input.value('淡江大學'); // 設定文字框的預設文字
  input.size(200, 50); // 設定文字框的寬度
  
  slider = createSlider(28, 50, 32); // 創建滑桿，範圍從28到50，初始值為32
  slider.position(input.x + input.width + 20, 25); // 設定滑桿的位置
  
  button = createButton('跳動文字');
  button.position(slider.x + slider.width + 10, 10); // 設定按鈕的位置
  button.size(100, 50); // 設定按鈕的大小
  button.mousePressed(toggleJumping); // 設定按鈕的點擊事件
  
  dropdown = createSelect();
  dropdown.position(button.x + button.width + 10, 10); // 設定下拉式選單的位置
  dropdown.size(200, 50); // 設定下拉式選單的大小
  dropdown.option('淡江教科');
  dropdown.option('淡江筆記');
  dropdown.option('淡江大學');
  dropdown.changed(goToWeek); // 設定選單變更事件
  
  iframe = createElement('iframe');
  iframe.position(100, 100); // 設定 iframe 的位置
  iframe.size(windowWidth - 200, windowHeight - 200); // 設定 iframe 的大小
  
  for (let i = 0; i < 100; i++) {
    offsets.push(random(0, 1000));
  }
}

function draw() {
  background(0); // 設定背景為黑色
  fill(255); // 設定文字顏色為白色
  let textValue = input.value(); // 獲取文字框內的文字
  let textSizeValue = slider.value(); // 獲取滑桿的值
  textAlign(CENTER, CENTER);
  textSize(textSizeValue); // 設定文字大小
  
  let x = 0;
  let y = 0;
  let lineHeight = textAscent() + textDescent();
  let spaceWidth = textWidth(' ');
  
  let index = 0;
  while (y < height) {
    let lineText = '';
    while (x < width) {
      lineText += textValue + ' ';
      x += textWidth(textValue + ' ');
    }
    if (isJumping) {
      for (let i = 0; i < lineText.length; i++) {
        let char = lineText.charAt(i);
        let offset = sin(millis() / 100 + offsets[index]) * 10;
        let charX = x + (i - lineText.length / 2) * textWidth(char);
        let charY = y + offset;
        if (charY < 0) charY = 0;
        if (charY > height) charY = height;
        text(char, charX, charY);
        index++;
      }
    } else {
      text(lineText, width / 2, y);
    }
    x = 0;
    y += lineHeight;
  }
}

function toggleJumping() {
  isJumping = !isJumping;
}

function goToWeek() {
  let week = dropdown.value();
  if (week === '淡江教科') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  } else if (week === '淡江筆記') {
    iframe.attribute('src', 'https://hackmd.io/@D3mx6dr9R3SRevjHAg9MDA/rJzXcKMs1l');
  } else if (week === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw/');
  }
}