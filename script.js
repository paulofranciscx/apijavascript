document.querySelector('.busca').addEventListener('submit', async (event) => {

    // impede a ação padrão do formulário que será recarregar a página
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if (input !== '') {
        showWarning('Carregando...')

        let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&units=metric&lang=pt_br&appid=02b633bd8413d1c8b0c96de323b60e89`);

        let json = await results.json();

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg

            });
        } else {
            showWarning('Cidade não encontrada')
        }

        //console.log(encodeURI(input))
    }


})

function showInfo(json) {
    // Retirando a mensagem da tela antes de exibir os resultados
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`
    document.querySelector('.temp img').setAttribute('src',`https://openweathermap.org/img/wn/${json.tempIcon}.png`)
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`

    //alterando o display do elemento .aviso para que ele seja exibido na tela
    document.querySelector('.resultado').style.display = 'block';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;

}

function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}