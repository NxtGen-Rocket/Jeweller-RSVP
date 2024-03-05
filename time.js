const submitUrl = "https://contactus-service-node.onrender.com/jcsoni/api/v1/contact-us";
//const submitUrl = "http://localhost:5050/jcsoni/api/v1/contact-us";
//const getDataUrl = "http://localhost:5050/jcsoni/api/v1/get/all";
const submitButton = document.getElementById("submit-btn");
const form = document.getElementById("form");

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
    var phoneNumber = '+14075178694';
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
        if (response.status < 200 || response.status > 300)
            throw new Error("Something went wrong")
        Swal.fire({
            title: "Reserved Successfully ",
            html: "Please call Meet Soni on WhatsApp for full address. <br> Note: you can find his number bottom of the page.",
            confirmButtonText: "<b> Ok <b>",
            confirmButtonColor: '#EEC568',
        }).then(result => {
            if (result.isConfirmed) {
                form.reset();
            }
        })
    }
    catch (error) {
        alert("oops! Something went wrong, Please try again");
    }
    finally {
        submitButton.disabled = false;
    }
}

function onSubmitForm(event) {
    event.preventDefault();
    submitButton.disabled = true;
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


form.addEventListener("submit", onSubmitForm);
