const observations = document.querySelectorAll('.Observation');

const toc = {};

const div = document.createElement('div');
const ol = document.createElement('ol');
const button = document.createElement('button');
const buttonTextSpan = document.createElement('span');
const buttonIconSpan = document.createElement('span');

const mkID = (suffix) => `alerts-toc-${suffix}`;

function scrollToObs(click) {
  click.preventDefault();
  const id = click.currentTarget.getAttribute('href');

  document.querySelector(id).scrollIntoView({
    scrollIntoViewOptions: {
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    },
  });
}

div.id = mkID`sidenav`;
ol.id = mkID`ol`;
button.id = mkID`button`;
buttonIconSpan.id = mkID`button-icon`;

buttonTextSpan.textContent = 'Table of Contents';
buttonIconSpan.innerHTML =
  '<svg class="Icon Icon--triangleDown" role="img">' +
  '<use xlink:href="#Icon--triangleDown"></use>' +
  '</svg>';

button.append(buttonTextSpan, buttonIconSpan);

button.classList.add('Button', 'Button--large');

observations.forEach((obs) => {
  const alpha6 = obs.querySelector('a[data-species-code]').dataset.speciesCode;

  if (!toc[alpha6]) {
    toc[alpha6] = {
      id: obs.id,
      com: obs.querySelector('.Heading-main').textContent,
      sci: obs.querySelector('.Heading-sub--sci').textContent,
      alpha6,
      count: 0,
    };
  }

  toc[alpha6].count += 1;
});

Object.entries(toc).forEach(([alpha6, data]) => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  const spanCom = document.createElement('span');
  const spanSci = document.createElement('span');
  const count = document.createElement('span');

  li.dataset.sid = alpha6;

  spanCom.classList.add(mkID`com`, 'Heading-main');
  spanSci.classList.add(mkID`sci`, 'Heading-sub', 'Heading-sub--sci');
  li.classList.add('Heading', 'Heading--h5');
  count.classList.add(mkID`count`);

  a.setAttribute('href', `#${data.id}`);
  spanCom.textContent = data.com;
  spanSci.textContent = data.sci;
  count.textContent = data.count;

  a.addEventListener('click', scrollToObs);
  a.append(spanCom, spanSci);
  li.append(a, count);
  ol.append(li);
});

div.append(ol);

button.addEventListener('click', (event) => {
  event.preventDefault();

  const main = document.querySelector('.Page.Page--elevation');
  const svg = buttonIconSpan.querySelector('svg');
  const tocIsClosed = ['', '100%'].includes(div.style.right);

  div.style.right = tocIsClosed ? '75%' : '';
  main.style.left = tocIsClosed ? '25%' : '';
  button.style.left = tocIsClosed ? 'calc(25% + 2px)' : '';
  svg.style.transform = tocIsClosed ? 'rotate(180deg)' : '';
});

document.querySelector('body').append(div, button);
