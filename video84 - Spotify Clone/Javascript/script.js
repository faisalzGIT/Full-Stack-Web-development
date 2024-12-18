// JS

let currentSong = new Audio();

function formatSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60); // Truncate decimals
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

async function getsongs() {	
	let a = await fetch("http://127.0.0.1:5500/Audios/");
	let response = await a.text();

	let div = document.createElement("div")
	div.innerHTML = response;

	let as = div.getElementsByTagName("a");

	let songs = [];
	console.log('i wannna say Alhamdulillah');

	for (let index = 0; index < as.length; index++) {
		const element = as[index];
		if(element.href.endsWith(".mp3")){
			songs.push(element.href.split("/Audios/")[1])
		}
	}
	return songs;
}

//playMusic ka function
const playMusic = (track, pause=false)=>{ 
	currentSong.src = "/Audios/" + track;
	if(!pause){
		currentSong.play();
		play.src = "/assets/images/pause.svg";
	}

	document.querySelector(".songinfo").innerHTML = track.replaceAll(".mp3","").replaceAll("-"," ");
	document.querySelector(".songtime").innerHTML = "00:00";
}

async function main() {

	// get the list o f all audios 
	let songs = await getsongs(); 
	// console.log(songs);
	playMusic(songs[0], true);

	let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];

	//show all the songs in  the playlist
	for (const song of songs) {
		songUL.innerHTML = songUL.innerHTML + `<li>
			<div class="info">
				<div>${song.replaceAll("-"," ").replace(".mp3","")}</div>
				<div>Song Artist</div>
			</div>
			<div class="playnow">
				<span>PLAY NOW</span>
				<img src="/assets/images/play.svg" alt="playnowkisvg">
			</div>
		</li>`
	}   

	// attach an event listener to each song
	Array.from(	document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
		e.addEventListener('click',element=>{
			// console.log(e.querySelector(".info").firstElementChild.innerHTML);
			playMusic(e.querySelector(".info").firstElementChild.innerHTML.replaceAll(" ","-") + ".mp3")
		})
	})

	// attach an EventListener to previous, play, next
	play.addEventListener("click",()=>{
		if(currentSong.paused){
			currentSong.play();
			play.src = "/assets/images/pause.svg"
		} else{
			currentSong.pause();
			play.src = "/assets/images/play.svg"
		}
	})

	// listen for time update event
	currentSong.addEventListener("timeupdate",()=>{
		// console.log(currentSong.currentTime, currentSong.duration);
		document.querySelector(".songtime").innerHTML = `${formatSeconds(currentSong.currentTime)}/ ${formatSeconds(currentSong.duration)}`
		document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100 + "%";
	})


	//add event listener for seekbar
	document.querySelector(".seekbar").addEventListener("click", (e)=>{
		// console.log(e.target.getBoundingClientRect().width,e.offsetX);
		let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
		document.querySelector(".circle").style.left = percent + "%";
		currentSong.currentTime = (currentSong.duration*percent)/100;	
	})
} 

main();   
   