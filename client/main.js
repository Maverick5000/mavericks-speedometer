setTick(() => {
  setImmediate(() => {
    checkValues();
  });
});

checkValues = () => {
  ped = GetPlayerPed(-1, false);
  if (IsPedInAnyVehicle(ped)) {
    toogleVehicleUi(true);
    vehicle = GetVehiclePedIsIn(ped);
    fuel = GetVehicleFuelLevel(vehicle);
    speed = GetEntitySpeed(vehicle)
    vehicleMax = GetVehicleEstimatedMaxSpeed(vehicle);
    percent = (speed * 100) / ((0.20 * vehicleMax) + vehicleMax)
    speedKm = speed * 3.6;
    SendNuiMessage(
      JSON.stringify({
        type: "speed",
        value: Math.floor(speedKm),
        percent: percent < 101 ? percent : 100
      })
    );
    SendNuiMessage(
      JSON.stringify({
        type: "fuel",
        value: Math.trunc(fuel),
      })
    );
  } else {
    toogleVehicleUi(false);
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

on("nui:on", async () => {
  toogleVehicleUi(true);
});

RegisterCommand(
  "on",
  (source, args, raw) => {
    setImmediate(() => {
      emit("nui:on");
    });
  },
  false
);

on("nui:off", () => {
  toogleVehicleUi(false);
});

RegisterCommand(
  "off",
  (source, args, raw) => {
    setImmediate(() => {
      emit("nui:off");
    });
  },
  false
);
