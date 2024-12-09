// JS
console.log('Mohammd faisal')


async function main() {
	let a = await fetch("http://127.0.0.1:5500/Audios/");
	let response = await a.text();
	
	console.log(response)

	
}


main();