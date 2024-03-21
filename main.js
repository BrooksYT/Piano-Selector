const Piano = document.getElementById("piano")
const octaves = 5

var Keys = []

function PlayNote(n) {
    const audio = new Audio("assets/A4.wav")
    audio.preservesPitch = false
    audio.playbackRate = 2 ** ((n - 36) / 12);
    audio.play()
}

function PlayAllNotes() {
    Keys.forEach(function(item,_){
        if (item.element.classList[0]=="selected") {
            PlayNote(item.index)
        }
    })
}

function ListenForKey(key, c, n) {
    key.addEventListener("click", function(){
        if (key.classList[0]=="selected") {
            key.classList=[c]
        } else {
            key.classList=["selected"]
        }

        PlayNote(n)
    })
}

function CreateKey(n) {
    const lookup = [1,0,1,1,0,1,0,1,1,0,1,0]
    const lookup2 = ["blackkey","whitekey"]
    const lookup3 = [0,0,-1,-1,-1,-2,-2,-3,-3,-3,-4,-4]
    const type = lookup[n%12]
    const c = lookup2[type]
    console.log(type)
    const key = document.createElement("div")
    key.id = "key"
    key.classList = [c]

    const offset = 50*lookup3[n%12]-Math.floor(n/12)*(50*5)
    if (c=="blackkey") {
        key.style.width = 24
        key.style.height = 120
        key.style.left = n*50-12+offset
        key.style.zIndex = 1
    } else {
        key.style.width = 50
        key.style.height = 180
        key.style.left = n*50+offset
        key.style.zIndex = 0
    }

    Piano.appendChild(key)
    ListenForKey(key, c, n)

    Keys.push({
        index: n,
        element: key
    })
}

for (i=0; i<12*octaves+1; i++) {
    CreateKey(i)
}