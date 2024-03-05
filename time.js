const submitUrl = "https://contactus-service-node.onrender.com/jcsoni/api/v1/contact-us";
const getDataUrl = "https://contactus-service-node.onrender.com/jcsoni/api/v1/get/all";
//const submitUrl = "http://localhost:5050/jcsoni/api/v1/contact-us";
//const getDataUrl = "http://localhost:5050/jcsoni/api/v1/get/all";

function pad(number) {
    if (number == 0) return 12;
    return (number < 10 ? '0' : '') + number;
}


function generateTimeRadios() {
    var timeRadiosDiv = document.getElementById("timestamps");
    for (var hour = 11; hour <= 19; hour++) {
        var timeString = pad(hour % 12) + ":00" + (hour < 12 ? "AM" : "PM");
        var epochValue = (hour * 60 + 0) * 60;
        var radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "timestamp";
        radio.value = timeString;
        radio.id = "timeRadio" + epochValue;
        var label = document.createElement("label");
        label.htmlFor = "timeRadio" + epochValue;
        label.appendChild(document.createTextNode(timeString));
        const wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.append(radio, label);
        timeRadiosDiv.appendChild(wrapper);
    }
}

window.onload = generateTimeRadios;

document.getElementById("whatsappButton").addEventListener("click", function () {
    var phoneNumber = '+12244154678';
    var whatsappLink = 'https://wa.me/' + phoneNumber;
    window.open(whatsappLink, '_blank');
});

function toggleClassName() {
    successModal.classList.toggle("hide");
    successModal.classList.toggle("show");
}

async function submitRequest(formData) {
    try {
        const response = await fetch(submitUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        // fetch(submitUrl, { method: "POST", body: JSON.stringify(formData) })
        const data = await response.json();
        // alert("Your seat reserved successfully. Please call Meet Soni on WhatsApp for full address." +  
        // "Note: you can find his number bottom of the page.");

        Swal.fire({
            title: "Reserved Successfully ",
            html: "Please call Meet Soni on WhatsApp for full address. <br> Note: you can find his number bottom of the page.",
            confirmButtonText: "<b> Ok <b>",
            confirmButtonColor: '#EEC568',
        });
    }
    catch (error) {
        alert("oops! Something went wrong, Please try again");
    }
    finally {
        submitButton.disabled = false;
    }
}

function onSubmitForm(event) {
    submitButton.disabled = true;
    event.preventDefault();
    const form = event.target;
    const formData = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        mobileNumber: Number(form.phoneNumber.value),
        streetName: form.streetName.value,
        city: form.city.value,
        zipcode: form.zipcode.value,
        date: form.date.value,
        time: form.timestamp.value
    };
    submitRequest(formData);
}


async function getAllData() {
    try {
        const response = await fetch(getDataUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "page": 1,
                "limit": 100000
            })
        });
        const data = await response.json();
        console.log(".........", data.docs)
        for (var i = 0, row; row = data.docs.length; i++) {
        }
    }
    catch (error) {
        alert("oops! Something went wrong, Please try again");
    }
}

document.getElementById("form").addEventListener("submit", onSubmitForm);

var table = document.getElementById("mytab1");


getAllData();