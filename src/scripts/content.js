const observations = document.querySelectorAll('.Observation');

const toc = {};

const div = document.createElement('div');
const ol = document.createElement('ol');
const button = document.createElement('button');
const buttonTextSpan = document.createElement('span');
const buttonIconSpan = document.createElement('span');

const mkID = (suffix) => `alerts-toc-${suffix}`;

div.id = mkID`sidenav`;
ol.id = mkID`ol`;
button.id = mkID`button`;
buttonIconSpan.id = mkID`button-icon`;

buttonTextSpan.textContent = 'Table of Contents';
buttonIconSpan.innerHTML =
  '<svg class="Icon Icon--triangleDown" role="img">' +
  '<use xlink:href="#Icon--triangleDown"></use>' +
  '</svg>';

button.appendChild(buttonTextSpan);
button.appendChild(buttonIconSpan);

button.classList.add('Button', 'Button--large');

observations.forEach((obs) => {
  const { id } = obs;
  const com = obs.querySelector('.Heading-main').textContent;
  const sci = obs.querySelector('.Heading-sub--sci').textContent;
  const alpha6 = obs.querySelector('a[data-species-code]').dataset.speciesCode;

  if (!toc[alpha6]) {
    toc[alpha6] = {
      id,
      com,
      sci,
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

  a.appendChild(spanCom);
  a.appendChild(spanSci);

  li.appendChild(a);
  li.appendChild(count);

  ol.appendChild(li);
});

div.appendChild(ol);

button.addEventListener('click', (event) => {
  event.preventDefault();

  const main = document.querySelector('.Page.Page--elevation');
  const tocIsClosed = ['', '100%'].includes(div.style.right);

  div.style.right = tocIsClosed ? '75%' : '';
  main.style.left = tocIsClosed ? '25%' : '';
  button.style.left = tocIsClosed ? '25%' : '';
  buttonIconSpan.querySelector('svg').style.transform = tocIsClosed
    ? 'rotate(180deg)'
    : '';
});

document.querySelector('body').prepend(div);
document.querySelector('body').appendChild(button);
