const ped = GetPlayerPed(-1, false);
let vehicle = null;

setTick(async () => {
  if (IsPedInAnyVehicle(ped)) {
    vehicle = GetVehiclePedIsIn(ped);
    vehicleMax = GetVehicleEstimatedMaxSpeed(vehicle);
    toogleVehicleUi(true);
  } else {
    toogleVehicleUi(false);
  }
  await Wait(1000);
});

setTick(() => {
  if (IsPedInAnyVehicle(ped)) {
    sendValues();
  }
});

sendValues = () => {
  if (vehicle) {
    fuel = GetVehicleFuelLevel(vehicle);
    speed = GetEntitySpeed(vehicle)
    percent = (speed * 100) / ((0.20 * vehicleMax) + vehicleMax)
    speedKm = speed * 3.6;

    SendNuiMessage(
      JSON.stringify({
        type: "speed",
        speed: Math.floor(speedKm),
        percent: percent < 101 ? percent : 100,
        fuel: Math.trunc(fuel)
      })
    );
  }
};

toogleVehicleUi = (bool) => {
  SendNuiMessage(
    JSON.stringify({
      type: "ui",
      display: bool,
    })
  );
};
