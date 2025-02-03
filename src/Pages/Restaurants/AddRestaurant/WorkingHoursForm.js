import React, { useEffect, useState } from "react";
function timeConvert(time24) {
  // Split the time into hours and minutes
  let [hours, minutes] = time24.split(":").map(Number);

  // Determine AM or PM
  let period = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour format to 12-hour format
  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12; // Midnight case
  }

  // Format the time and return it
  return `${hours}:${minutes < 10 ? "0" + minutes : minutes}${period}`;
}
function WorkingHoursForm({ setWorkingHrs, working_hours }) {
  const [hours, setHours] = useState({
    monday_open: "12:00",
    monday_close: "22:00",
    tuesday_open: "12:00",
    tuesday_close: "22:00",
    wednesday_open: "12:00",
    wednesday_close: "22:00",
    thursday_open: "12:00",
    thursday_close: "22:00",
    friday_open: "12:00",
    friday_close: "23:00",
    saturday_open: "11:00",
    saturday_close: "23:00",
    sunday_open: "11:00",
    sunday_close: "23:00",
  });

  const [closedDays, setClosedDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHours((prevHours) => ({
      ...prevHours,
      [name]: value,
    }));
  };

  const handleToggleClosed = (day) => {
    setClosedDays((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };
  useEffect(() => {
    setWorkingHrs({
      Monday: closedDays.monday
        ? "Closed"
        : `${timeConvert(hours.monday_open)}-${timeConvert(
            hours.monday_close
          )}`,
      Tuesday: closedDays.tuesday
        ? "Closed"
        : `${timeConvert(hours.tuesday_open)}-${timeConvert(
            hours.tuesday_close
          )}`,
      Wednesday: closedDays.wednesday
        ? "Closed"
        : `${timeConvert(hours.wednesday_open)}-${timeConvert(
            hours.wednesday_close
          )}`,
      Thursday: closedDays.thursday
        ? "Closed"
        : `${timeConvert(hours.thursday_open)}-${timeConvert(
            hours.thursday_close
          )}`,
      Friday: closedDays.friday
        ? "Closed"
        : `${timeConvert(hours.friday_open)}-${timeConvert(
            hours.friday_close
          )}`,
      Saturday: closedDays.saturday
        ? "Closed"
        : `${timeConvert(hours.saturday_open)}-${timeConvert(
            hours.saturday_close
          )}`,
      Sunday: closedDays.sunday
        ? "Closed"
        : `${timeConvert(hours.sunday_open)}-${timeConvert(
            hours.sunday_close
          )}`,
    });
  }, [hours, closedDays]);

  return (
    <div className="container ">
      {[
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ].map((day) => (
        <div className="row mb-3" key={day}>
          <label className="col-sm-2 col-form-label">
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </label>
          <div className="col-sm-4">
            {!closedDays[day] ? (
              <input
                type="time"
                className="form-control"
                name={`${day}_open`}
                value={hours[`${day}_open`]}
                onChange={handleChange}
              />
            ) : (
              <span className="text-muted small">Closed</span>
            )}
          </div>
          <div className="col-sm-4">
            {!closedDays[day] ? (
              <input
                type="time"
                className="form-control"
                name={`${day}_close`}
                value={hours[`${day}_close`]}
                onChange={handleChange}
              />
            ) : (
              <span className="text-muted small">Closed</span>
            )}
          </div>
          <div className="col-sm-2">
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => handleToggleClosed(day)}
            >
              {closedDays[day] ? "Open" : "Closed"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WorkingHoursForm;
