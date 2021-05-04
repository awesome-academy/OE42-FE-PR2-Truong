import React from "react";
import "./style.sass";
import moment from "moment";

function Schedule({ name, schedules }) {
  return (
    <article className="schedule-component-container">
      <section className="cinema-name">{name}</section>
      <section className="schedule-bound">
        {schedules.length &&
          schedules.map((schedule) => (
            <time key={schedule.id} className="schedule-item">
              {moment(schedule.date).format("HH:mm")}
            </time>
          ))}
      </section>
    </article>
  );
}

export default Schedule;
