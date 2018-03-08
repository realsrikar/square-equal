const runner = document.querySelector('.runner')
container = document.querySelector('.container')

let containerText = '',
  timeTaken,
  fake = 'These passed but were fake:\n',
  fakeInitLen = fake.length
  correct = 'These were correct:\n',
  correctInitLen = correct.length
  iteration = 0

function runMain() {
  iteration++
  containerText += `<h5>No. ${iteration}</h5>`

  const ifChecked = [],
    digits = 9,
    max = 1000,
    extensiveObj = {}

  let repeat = {},
    cur,
    numbers = [],
    sum


    for (let i = 0; i < digits; i++) {
      put()
    }

  function put() {
    cur = Math.round(Math.random() * max - 1) + 1;
    if (!repeat[cur]) {
      repeat[cur] = !0;
      numbers.push(cur)
    } else {
      put()
    }
  }
  numbers = numbers.map(sq => Math.pow(sq, 2))
  numbersStr = numbers.toString()
  containerText += `<h1> ${numbersStr.replace(/,/gi, ', ')} </h2>`
  getHash(numbersStr)

  function getHash(text) {
    const NumbersSHA = new jsSHA("SHA-512", "TEXT")
    NumbersSHA.update(text)
    const hash = NumbersSHA.getHash("HEX")
    containerText += `<h2> ${hash} </h>`
  }

  function checkTheSides() {
    function checkInRows(i) {
      ifChecked.push(numbers[i] + numbers[i + 1] + numbers[i + 2])
    }
    for (let i = 0; i < 3; i++) {
      checkInRows(i * 3)
    }

    function checkInCols(i) {
      ifChecked.push(numbers[i] + numbers[i + 3] + numbers[i + 6])
    }
    for (let i = 0; i < 3; i++) {
      checkInCols(i)
    }

    function checkInDia() {
      ifChecked.push(numbers[0] + numbers[4] + numbers[8])
      ifChecked.push(numbers[2] + numbers[4] + numbers[6])
    }
    checkInDia()
  }
  checkTheSides()
  checkIfEqual()

  function checkIfEqual() {
    sum = ifChecked.reduce((a, b) => a + b, 0)

    if (sum === (ifChecked[0] * ifChecked.length)) {
      extensive()
    } else {
      containerText += `<h5 class="text-danger mb-5">false</h5>`
    }
  }

  function extensive() {
    ifChecked.forEach((current, i, main) => current * main.length === sum ? extensiveObj['0'] = true : extensiveObj['1'] = false)

    if (extensiveObj['1'] === false) {
      fake += `No. ${iteration}\n`
      containerText += '<h5 class="text-info mb-5">passed.. but failed</h5>'
    } else {
      correct += `No. ${iteration}\n`
      containerText += '<h5 class="text-success mb-5">true</h5>'
    }

  }

}

runner.addEventListener('click', runFor)


function runFor() {
  timeTaken = Date.now()
  containerText = ''
  for (let i = 0; i < 50; i++) {
    runMain()
  }

  container.innerHTML += containerText;
  document.body.classList.remove('d-flex', 'init')
  document.querySelector('.btn').classList.add('d-block')
  document.querySelector('.btn').innerHTML = 'Process 100 Arrays (Again!)'
  timeTaken = Date.now() - timeTaken
  document.querySelector('.time-taken').innerHTML = `${timeTaken}ms (${timeTaken / 1000}s)`
  fake.length == fakeInitLen ? '' : alert(fake)
  correct.length == correctInitLen ? '' : alert(correct)
}
