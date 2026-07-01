// Day-71

// Date: 09/06/2026
// Task: Started the task of restaurant service provider project like petpooja for both backend and frontend.
// - Search and know about quickchart website api endpoint to generate Qr code and get it as base64 data.
// - Know about imgbb to host an image using that base64 data
// - As not knowing about anything, first planned about the web flow with pages as landing, customer, restaurant, /manage(admin).
// - Design Schema for total about 6to7 collection for the system architecture.
// - Defined end-to-end flow for the user/restaurant.
// - Defined rules where to apply and for whom with also defined ui for what to show which.
// - Written prompt with full explaination about this all and with folder structure to build it with ai.



// _________________________________________________________

// fetch from api

const api = async () => {
    const result = await fetch("https://quickchart.io/qr?text=http://localhost:3000/browse&format=base64");


    console.log(result);

    let data = await (await result.blob()).text();
    console.log(data);

    const sendingBody = new FormData();
    sendingBody.append("image",data);


    const upload = await fetch("https://api.imgbb.com/1/upload?key=662fcbd87af43fae54af8663b38516f2",{
        method: 'POST',
        body: sendingBody
    })

    const final = await upload.json();

    console.log(final.data.url);
    console.log(final.data.delete_url);

    // to delete follow code below
    // const deletion = await fetch(final.data.delete_url, {
    //     method:"POST"
    // })
}

// api();