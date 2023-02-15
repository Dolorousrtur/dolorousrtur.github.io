const m_slider = document.querySelector('#model_scroll');


let m_isDown = false;
let m_startX;
let m_scrollLeft;

m_slider.addEventListener('mousedown', (e) => {
  m_isDown = true;
  m_slider.classList.add('active');
  m_startX = e.pageX - m_slider.offsetLeft;
  m_scrollLeft = m_slider.scrollLeft;
});

m_slider.addEventListener('mouseleave', () => {
  m_isDown = false;
  m_slider.classList.remove('active');
});

m_slider.addEventListener('mouseup', () => {
  m_isDown = false;
  m_slider.classList.remove('active');
});

m_slider.addEventListener('mousemove', (e) => {
  if(!m_isDown) return;
  e.preventDefault();
  const x = e.pageX - m_slider.offsetLeft;
  const walk = (x - m_startX) * 3; //scroll-fast
  m_slider.scrollLeft = m_scrollLeft - walk;
});


const c_slider = document.querySelector('#cloth_scroll');


let c_isDown = false;
let c_startX;
let c_scrollLeft;

c_slider.addEventListener('mousedown', (e) => {
  c_isDown = true;
  c_slider.classList.add('active');
  c_startX = e.pageX - c_slider.offsetLeft;
  c_scrollLeft = c_slider.scrollLeft;
});

c_slider.addEventListener('mouseleave', () => {
  c_isDown = false;
  c_slider.classList.remove('active');
});

c_slider.addEventListener('mouseup', () => {
  c_isDown = false;
  c_slider.classList.remove('active');
});

c_slider.addEventListener('mousemove', (e) => {
  if(!c_isDown) return;
  e.preventDefault();
  const x = e.pageX - c_slider.offsetLeft;
  const walk = (x - c_startX) * 3; //scroll-fast
  c_slider.scrollLeft = c_scrollLeft - walk;
});
