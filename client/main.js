setTick(() => {
  checkValues();
});

checkValues = async () => {
  ped = GetPlayerPed(-1, false);
  if (IsPedInAnyVehicle(ped)) {
    toogleVehicleUi(true);
    await Wait(1000);
    vehicle = GetVehiclePedIsIn(ped);
    fuel = GetVehicleFuelLevel(vehicle);
    speed = GetEntitySpeed(vehicle) * 3.6;
    SendNuiMessage(
      JSON.stringify({
        type: "speed",
        value: Math.floor(speed),
      })
    );
    SendNuiMessage(
      JSON.stringify({
        type: "fuel",
        value: fuel,
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
