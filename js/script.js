const btn = document.getElementById('btn');
const input = document.getElementById('input');
const errorMsg = document.getElementById('errorMsg');
const gallery = document.getElementById('gallery');


async function getPhoto() {
    const inpuValue = input.value;
    if(inpuValue > 10 || inpuValue < 1){
        errorMsg.style.display = "block";
        errorMsg.innerText = 'Number should be between 0 and 11'
        return;
    }

    let imgs = "";

    try {
        btn.style.display = "none";
        const loading = `<img src="loader.svg">`
        gallery.innerHTML = loading;
        await fetch(`https://api.unsplash.com/photos?per_page=${inpuValue}&page=${Math.round(Math.random() * 1000)}&client_id=0Et94YXukgmvGuSg0kogufVtioym8vQAzrsgoAZA_HA`)
        .then((response) => 
        response.json().then((data) =>{
            if(data){
                data.forEach((pic) => {
                    imgs += `<img src="${pic.urls.small} alt="Image" />`;
                    gallery.style.display= "block";
                    gallery.innerHTML = imgs;
                });
            }
            btn.style.display = 'block';
        })
        );
        errorMsg.style.display = "none";

    } catch (error) {
        errorMsg.style.display = 'block';
        errorMsg.innerText = 'An error happend!';
    }



}

btn.addEventListener('click', getPhoto);
