
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
