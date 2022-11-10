window.addEventListener("DOMContentLoaded", function () {
    const searchParams = new URL(location).searchParams;
    const inputs = Array.from(document.querySelectorAll("input[id]"));

    inputs.forEach((input) => {
        if (searchParams.has(input.id)) {
            if (input.type == "checkbox") {
                input.checked = searchParams.get(input.id);
            } else {
                input.value = searchParams.get(input.id);
                input.blur();
            }
        }
        if (input.type == "checkbox") {
            input.addEventListener("change", function (event) {
                const newSearchParams = new URL(location).searchParams;
                if (event.target.checked) {
                    newSearchParams.set(input.id, event.target.checked);
                } else {
                    newSearchParams.delete(input.id);
                }
                history.replaceState({}, "", Array.from(newSearchParams).length ? location.pathname + "?" + newSearchParams : location.pathname);
            });
        } else {
            input.addEventListener("input", function (event) {
                const newSearchParams = new URL(location).searchParams;
                if (event.target.value) {
                    newSearchParams.set(input.id, event.target.value);
                } else {
                    newSearchParams.delete(input.id);
                }
                history.replaceState({}, "", Array.from(newSearchParams).length ? location.pathname + "?" + newSearchParams : location.pathname);
            });
        }
    });
});

var DolittleMonitor = {
    log: function () {
        var line = Array.prototype.slice
            .call(arguments)
            .map(function (argument) {
                return typeof argument === "string" ? argument : JSON.stringify(argument);
            })
            .join(" ");

        document.querySelector("#log").textContent += line + "\n";
    },

    clearLog: function () {
        document.querySelector("#log").textContent = "";
    },

    setStatus: function (status) {
        document.querySelector("#status").textContent = status;
    },

    setContent: function (newContent) {
        var content = document.querySelector("#content");
        while (content.hasChildNodes()) {
            content.removeChild(content.lastChild);
        }
        content.appendChild(newContent);
    },
};

var uuid_service_dolittle_main = "ef680200-9b35-4933-9b10-52ffa9740042";
var uuid_service_dolittle_main_characteristic_respiratory_rate_uuid = "ef680201-9b35-4933-9b10-52ffa9740042";
var uuid_service_dolittle_main_characteristic_heart_rate_uuid = "ef680202-9b35-4933-9b10-52ffa9740042";

var uuid_service_dolittle_schedule = "ef680700-9b35-4933-9b10-52ffa9740042";
var uuid_service_dolittle_schedule_characteristic_respiratory_rate_uuid = "ef680706-9b35-4933-9b10-52ffa9740042";
var uuid_service_dolittle_schedule_characteristic_heart_rate_uuid = "ef680707-9b35-4933-9b10-52ffa9740042";

var bluetooth_device;
var service_dolittle_main;
var service_dolittle_schedule;

var main_characteristic_respiratory_rate;
var main_characteristic_heart_rate;
var schedule_characteristic_respiratory_rate;
var schedule_characteristic_heart_rate;

var count_updated_main_respiratory_rate = 0;
var count_updated_main_heart_rate = 0;
var count_updated_schedule_heart_rate_db = 0;

var time_start = +new Date();

async function onScanButtonClick() {
    let options = { filters: [] };

    let filterNamePrefix = document.querySelector("#namePrefix").value;
    if (filterNamePrefix) {
        options.filters.push({ namePrefix: filterNamePrefix });
    }

    options.filters.push({ services: [uuid_service_dolittle_main, uuid_service_dolittle_schedule] });
    //options.filters.push({services: [uuid_service_dolittle_schedule]});

    bluetooth_device = null;
    try {
        log("Requesting Bluetooth Device...");
        bluetooth_device = await navigator.bluetooth.requestDevice(options);
        bluetooth_device.addEventListener("gattserverdisconnected", onDisconnected);
        connect();
    } catch (error) {
        log("Argh! " + error);
    }
}

async function connect() {
    log("Connecting to Bluetooth Device...");
    service_dolittle_main = await bluetooth_device.gatt.connect().then((server) => {
        log("Getting Service...");
        return server.getPrimaryService(uuid_service_dolittle_main);
    });

    service_dolittle_schedule = await bluetooth_device.gatt.connect().then((server) => {
        log("Getting Service...");
        return server.getPrimaryService(uuid_service_dolittle_schedule);
    });
    log("> Bluetooth Device connected");

    count_updated_main_respiratory_rate = 0;
    count_updated_main_heart_rate = 0;
    count_updated_schedule_heart_rate_db = 0;

    time_start = +new Date();

    await stop_all_notifications();
    await start_all_notifications();
}

function onDisconnectButtonClick() {
    if (!bluetooth_device) {
        return;
    }
    log("Disconnecting from Bluetooth Device...");
    if (bluetooth_device.gatt.connected) {
        bluetooth_device.gatt.disconnect();
    } else {
        log("> Bluetooth Device is already disconnected");
    }
}

function onDisconnected(event) {
    // Object event.target is Bluetooth Device getting disconnected.
    log("> Bluetooth Device disconnected");
}

function start_all_notifications() {
    if (!bluetooth_device) {
        return;
    }

    service_dolittle_main
        .getCharacteristic(uuid_service_dolittle_main_characteristic_respiratory_rate_uuid)
        .then((characteristic) => {
            main_characteristic_respiratory_rate = characteristic;
            return main_characteristic_respiratory_rate.startNotifications().then((_) => {
                log("> Main / Respiratory rate notifications started");
                main_characteristic_respiratory_rate.addEventListener("characteristicvaluechanged", handle_main_respiratory_rate_notifications);
            });
        })
        .catch((error) => {
            log("Argh! " + error);
        });

    service_dolittle_main
        .getCharacteristic(uuid_service_dolittle_main_characteristic_heart_rate_uuid)
        .then((characteristic) => {
            main_characteristic_heart_rate = characteristic;
            return main_characteristic_heart_rate.startNotifications().then((_) => {
                log("> Main / Heart rate notifications started");
                main_characteristic_heart_rate.addEventListener("characteristicvaluechanged", handle_main_heart_rate_notifications);
            });
        })
        .catch((error) => {
            log("Argh! " + error);
        });

    service_dolittle_schedule
        .getCharacteristic(uuid_service_dolittle_schedule_characteristic_respiratory_rate_uuid)
        .then((characteristic) => {
            schedule_characteristic_respiratory_rate = characteristic;
            return schedule_characteristic_respiratory_rate.startNotifications().then((_) => {
                log("> Schedule / Respiratory rate notifications started");
                schedule_characteristic_respiratory_rate.addEventListener("characteristicvaluechanged", handle_schedule_respiratory_rate_notifications);
            });
        })
        .catch((error) => {
            log("Argh! " + error);
        });

    service_dolittle_schedule
        .getCharacteristic(uuid_service_dolittle_schedule_characteristic_heart_rate_uuid)
        .then((characteristic) => {
            schedule_characteristic_heart_rate = characteristic;
            return schedule_characteristic_heart_rate.startNotifications().then((_) => {
                log("> Schedule / Heart rate notifications started");
                schedule_characteristic_heart_rate.addEventListener("characteristicvaluechanged", handle_schedule_heart_rate_notifications);
            });
        })
        .catch((error) => {
            log("Argh! " + error);
        });
}

function stop_all_notifications() {
    if (main_characteristic_respiratory_rate) {
        main_characteristic_respiratory_rate
            .stopNotifications()
            .then((_) => {
                log("> Main / Respiratory rate notifications stopped");
                main_characteristic_respiratory_rate.removeEventListener("characteristicvaluechanged", handle_main_respiratory_rate_notifications);
            })
            .catch((error) => {
                log("Argh! " + error);
            });
    }

    if (main_characteristic_heart_rate) {
        main_characteristic_heart_rate
            .stopNotifications()
            .then((_) => {
                log("> Main / Heart rate notifications stopped");
                main_characteristic_heart_rate.removeEventListener("characteristicvaluechanged", handle_main_heart_rate_notifications);
            })
            .catch((error) => {
                log("Argh! " + error);
            });
    }

    if (schedule_characteristic_respiratory_rate) {
        schedule_characteristic_respiratory_rate
            .stopNotifications()
            .then((_) => {
                log("> Schedule / Respiratory rate notifications stopped");
                schedule_characteristic_respiratory_rate.removeEventListener("characteristicvaluechanged", handle_schedule_respiratory_rate_notifications);
            })
            .catch((error) => {
                log("Argh! " + error);
            });
    }

    if (schedule_characteristic_heart_rate) {
        schedule_characteristic_heart_rate
            .stopNotifications()
            .then((_) => {
                log("> Schedule / Heart rate notifications stopped");
                schedule_characteristic_heart_rate.removeEventListener("characteristicvaluechanged", handle_schedule_heart_rate_notifications);
            })
            .catch((error) => {
                log("Argh! " + error);
            });
    }
}

function check_show_notification_on_log_area() {
    return document.querySelector("#flag_show_notification_on_log_area").checked;
}

function handle_main_respiratory_rate_notifications(event) {
    let value = event.target.value;

    let value_respiratory_rate = value.getInt32(0, true);

    add_main_respiratory_rate(value_respiratory_rate);

    if (check_show_notification_on_log_area()) {
        log("> Main / Respiratory rate: " + value_respiratory_rate);
    }
}

function handle_main_heart_rate_notifications(event) {
    let value = event.target.value;

    let value_heart_rate = value.getInt32(0, true);

    add_main_heart_rate(value_heart_rate);

    if (check_show_notification_on_log_area()) {
        log("> Main / Heart rate: " + value_heart_rate);
    }
}

function handle_schedule_respiratory_rate_notifications(event) {
    let value = event.target.value;

    let value_respiratory_rate = value.getUint32(0, true);

    if (check_show_notification_on_log_area()) {
        log("> Schedule / Respiratory rate: " + value_respiratory_rate);
    }
}

function handle_schedule_heart_rate_notifications(event) {
    let value = event.target.value;

    let value_heart_rate = value.getUint32(0, true);
    let value_heart_rate_db = value.getInt32(4, true);

    add_schedule_heart_rate_db(value_heart_rate_db);

    if (check_show_notification_on_log_area()) {
        log("> Schedule / Heart rate: " + value_heart_rate + " / dB: " + value_heart_rate_db);
    }
}

function handleNotifications(event) {
    let value = event.target.value;

    let a = [];
    // Convert raw data bytes to hex values just for the sake of showing something.
    // In the "real" world, you'd use data.getUint8, data.getUint16 or even
    // TextDecoder to process raw data bytes.
    for (let i = 0; i < value.byteLength; i++) {
        a.push("0x" + ("00" + value.getUint8(i).toString(16)).slice(-2));
    }

    log("> " + a.join(" "));
}

function get_length_of_chart() {
    let length_of_chart = parseInt(document.querySelector("#length_of_chart").value);
    length_of_chart = length_of_chart || 120;
    return length_of_chart;
}

function add_main_respiratory_rate(value) {
    let data = chart_respiratory_rate.data;
    if (data.datasets.length > 0) {
        while (data.datasets[0].data.length >= get_length_of_chart()) {
            data.datasets[0].data.shift();
            data.labels.shift();
        }

        count_updated_main_respiratory_rate++;
        //data.labels.push(count_updated_main_respiratory_rate.toString());
        let time_now = +new Date();
        let time_delta = (time_now - time_start) / 1000.0;
        data.labels.push(time_delta.toString());
        data.datasets[0].data.push(value);

        chart_respiratory_rate.update();
    }
}

function add_main_heart_rate(value) {
    let data = chart_heart_rate.data;

    if (data.datasets.length > 0) {
        while (data.datasets[0].data.length >= get_length_of_chart()) {
            data.datasets[0].data.shift();
            data.labels.shift();
        }

        count_updated_main_heart_rate++;
        //data.labels.push(count_updated_main_heart_rate.toString());
        let time_now = +new Date();
        let time_delta = (time_now - time_start) / 1000.0;
        data.labels.push(time_delta.toString());
        data.datasets[0].data.push(value);

        chart_heart_rate.update();
    }
}

function add_schedule_heart_rate_db(value) {
    let data = chart_heart_rate_db.data;

    if (data.datasets.length > 0) {
        while (data.datasets[0].data.length >= get_length_of_chart()) {
            data.datasets[0].data.shift();
            data.labels.shift();
        }

        count_updated_schedule_heart_rate_db++;
        //data.labels.push(count_updated_schedule_heart_rate_db.toString());
        let time_now = +new Date();
        let time_delta = (time_now - time_start) / 1000.0;
        data.labels.push(time_delta.toString());
        data.datasets[0].data.push(value);

        chart_heart_rate_db.update();
    }
}

function scan() {
    event.stopPropagation();
    event.preventDefault();

    if (isWebBluetoothEnabled()) {
        DolittleMonitor.clearLog();
        onScanButtonClick();
    }
}

//document.querySelector("#disconnect").addEventListener("click", function (event) {
function disconnect() {
    event.stopPropagation();
    event.preventDefault();

    if (isWebBluetoothEnabled()) {
        onDisconnectButtonClick();
    }
}

//document.querySelector("#start").addEventListener("click", function (event) {
function start() {
    event.stopPropagation();
    event.preventDefault();

    if (isWebBluetoothEnabled()) {
        start_all_notifications();
    }
}

//document.querySelector("#stop").addEventListener("click", function (event) {
function stop() {
    event.stopPropagation();
    event.preventDefault();

    if (isWebBluetoothEnabled()) {
        stop_all_notifications();
    }
}

log = DolittleMonitor.log;

function isWebBluetoothEnabled() {
    if (navigator.bluetooth) {
        return true;
    } else {
        DolittleMonitor.setStatus("Web Bluetooth API is not available.\n" + 'Please make sure the "Experimental Web Platform features" flag is enabled.');
        return false;
    }
}

/* jshint ignore:start */
(function (i, s, o, g, r, a, m) {
    i["GoogleAnalyticsObject"] = r;
    (i[r] =
        i[r] ||
        function () {
            (i[r].q = i[r].q || []).push(arguments);
        }),
        (i[r].l = 1 * new Date());
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
})(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga");
ga("create", "UA-53563471-1", "auto");
ga("send", "pageview");
/* jshint ignore:end */

var context = document.getElementById("chart_respiratory_rate").getContext("2d");
var chart_respiratory_rate = new Chart(context, {
    type: "line", // 차트의 형태
    data: {
        labels: [],
        datasets: [
            {
                label: "Respiratory rate",
                data: [],
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
            },
        ],
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Respiratory rate",
            },
        },
    },
});
var context = document.getElementById("chart_heart_rate").getContext("2d");
var chart_heart_rate = new Chart(context, {
    type: "line", // 차트의 형태
    data: {
        labels: [],
        datasets: [
            {
                label: "Heart rate",
                data: [],
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
            },
        ],
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Heart rate",
            },
        },
    },
});
var context = document.getElementById("chart_heart_rate_db").getContext("2d");
var chart_heart_rate_db = new Chart(context, {
    type: "line", // 차트의 형태
    data: {
        labels: [],
        datasets: [
            {
                label: "Heart rate dB",
                data: [],
                borderColor: "rgba(153, 102, 255, 1)",
                backgroundColor: "rgba(153, 102, 255, 0.2)",
            },
        ],
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Heart rate dB",
            },
        },
    },
});
